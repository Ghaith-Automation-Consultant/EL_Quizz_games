from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
import json
import random
import asyncio
import models
import schemas
import database
import auth
import websocket_manager
import online_room_manager

router = APIRouter(tags=["multiplayer"])

# --------------------------------------------------
# Online Showdown (WebSocket Multiplayer Rooms)
# --------------------------------------------------

def fetch_online_question(db: Session, selected_subcats: List[str], used_ids: List[int]) -> Optional[dict]:
    query = db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    )
    
    all_qs = query.all()
    filtered = []
    for q in all_qs:
        subcat_key = f"{q.category}:{q.subcategory or 'General'}"
        if not selected_subcats or subcat_key in selected_subcats:
            filtered.append(q)
            
    fresh = [q for q in filtered if q.id not in used_ids]
    if not fresh:
        fresh = filtered if filtered else all_qs
        
    if not fresh:
        return None
        
    selected_q = random.choice(fresh)
    
    q_trans = {}
    for t in selected_q.translations:
        q_trans[t.language] = t.text
        
    ans_list = []
    for ans in selected_q.answers:
        ans_trans = {}
        for t in ans.translations:
            ans_trans[t.language] = t.text
        ans_list.append({
            "is_correct": ans.is_correct,
            "points": ans.points,
            "translations": ans_trans
        })
        
    return {
        "id": selected_q.id,
        "category": selected_q.category,
        "subcategory": selected_q.subcategory,
        "translations": q_trans,
        "answers": ans_list
    }

def serialize_game_state_for_player(room: online_room_manager.OnlineRoom, player_name: str) -> dict:
    is_val = (player_name == room.validator_name)
    is_ref = (player_name in room.players and room.players[player_name].role == "referee")
    
    # Answers revealed to validator/referee during game, or to everyone in intro, standings, podium, or when turn is over.
    reveal_answers = is_val or is_ref or (room.state in ("INTRO", "STANDINGS", "PODIUM", "TURN_OVER"))
    
    serialized_answers = []
    for ans in room.shuffled_answers:
        if reveal_answers:
            serialized_answers.append({
                "is_correct": ans["is_correct"],
                "points": ans["points"],
                "translations": ans["translations"]
            })
        else:
            serialized_answers.append({
                "is_correct": ans["is_correct"],
                "points": ans["points"]
            })
            
    return {
        "type": "game_state_update",
        "state": room.state,
        "current_round": room.current_round,
        "current_team_index": room.current_team_index,
        "teams_list": room.teams_list,
        "active_question": {
            "category": room.active_question["category"],
            "subcategory": room.active_question["subcategory"],
            "translations": room.active_question["translations"]
        } if room.active_question else None,
        "answers": serialized_answers,
        "guessed_answer_ids": room.guessed_answer_ids,
        "wrong_guesses_count": room.wrong_guesses_count,
        "points_gained_this_turn": room.points_gained_this_turn,
        "timer_val": room.timer_val,
        "validator_name": room.validator_name,
        "is_validator": is_val,
        "hostName": room.config["hostName"],
        "maxRounds": int(room.config["rounds"])
    }

async def broadcast_game_state(room: online_room_manager.OnlineRoom):
    for name, p in list(room.players.items()):
        try:
            payload = serialize_game_state_for_player(room, name)
            await p.ws.send_text(json.dumps(payload))
        except Exception:
            room.remove_player(name)

def update_validator_for_turn(room: online_room_manager.OnlineRoom):
    if room.config["hostRole"] == "referee":
        room.validator_name = room.config["hostName"]
    else:
        num_teams = len(room.teams_list)
        if num_teams > 0:
            val_team_idx = (room.current_team_index + 1) % num_teams
            val_players = [name for name, p in room.players.items() if p.team_index == val_team_idx]
            if val_players:
                room.validator_name = val_players[0]
            else:
                room.validator_name = room.config["hostName"]
        else:
            room.validator_name = room.config["hostName"]

@router.post("/api/online/create")
def create_online_room():
    room_code = online_room_manager.manager.create_room()
    return {"room_code": room_code}

@router.websocket("/ws/online/{room_code}/{player_name}")
async def online_websocket_endpoint(websocket: WebSocket, room_code: str, player_name: str, db: Session = Depends(database.get_db)):
    await websocket.accept()
    room_code = room_code.upper().strip()
    
    room = online_room_manager.manager.get_room(room_code)
    if not room:
        await websocket.send_text(json.dumps({"type": "error", "message": "Room not found"}))
        await websocket.close()
        return

    # Add player to the room
    player = room.add_player(player_name, websocket)
    
    # If game already started, send current game state to reconnected player
    if room.state != "LOBBY":
        await websocket.send_text(json.dumps(serialize_game_state_for_player(room, player_name)))
    else:
        await room.broadcast_lobby()

    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            msg_type = msg.get("type")

            if msg_type == "update_config":
                if player_name == room.config["hostName"] and room.state == "LOBBY":
                    room.config.update(msg.get("config", {}))
                    # Sync host role
                    if room.config["hostRole"] == "referee":
                        room.players[player_name].role = "referee"
                        room.players[player_name].team_index = None
                    else:
                        room.players[player_name].role = "player"
                        room.players[player_name].team_index = 0
                    await room.broadcast_lobby()

            elif msg_type == "assign_teams":
                if player_name == room.config["hostName"] and room.state == "LOBBY":
                    assignments = msg.get("assignments", {})
                    for name, team_idx in assignments.items():
                        if name in room.players:
                            if team_idx == "referee":
                                room.players[name].role = "referee"
                                room.players[name].team_index = None
                            elif team_idx == "spectator" or team_idx is None:
                                room.players[name].role = "spectator"
                                room.players[name].team_index = None
                            else:
                                room.players[name].role = "player"
                                room.players[name].team_index = int(team_idx)
                    await room.broadcast_lobby()

            elif msg_type == "start_game":
                if player_name == room.config["hostName"] and room.state == "LOBBY":
                    # Initialize teams list
                    teams_count = int(room.config["teamsCount"])
                    default_icons = ["🥖", "🌶️", "🫒", "🏺", "🌸"]
                    room.teams_list = []
                    for i in range(teams_count):
                        icon = default_icons[i % len(default_icons)]
                        room.teams_list.append({
                            "name": f"Team {i+1}",
                            "icon": icon,
                            "score": 0,
                            "roundScoresHistory": []
                        })
                    
                    room.current_round = 1
                    room.current_team_index = 0
                    room.state = "INTRO"
                    
                    # Fetch first question
                    q = fetch_online_question(db, room.config["selectedSubcategories"], [])
                    if q:
                        room.active_question = q
                        room.shuffled_answers = list(q["answers"])
                        random.shuffle(room.shuffled_answers)
                    
                    update_validator_for_turn(room)
                    await broadcast_game_state(room)

            elif msg_type == "start_turn":
                if player_name == room.validator_name and room.state == "INTRO":
                    room.state = "ROUND"
                    room.guessed_answer_ids = []
                    room.wrong_guesses_count = 0
                    room.points_gained_this_turn = 0
                    room.start_server_timer()
                    await broadcast_game_state(room)

            elif msg_type == "reveal_card":
                if player_name == room.validator_name and room.state == "ROUND":
                    idx = int(msg.get("index"))
                    if 0 <= idx < len(room.shuffled_answers):
                        ans = room.shuffled_answers[idx]
                        if idx in room.guessed_answer_ids:
                            # Toggle off correct
                            room.guessed_answer_ids.remove(idx)
                            room.points_gained_this_turn = max(0, room.points_gained_this_turn - ans["points"])
                        else:
                            if ans["is_correct"]:
                                room.guessed_answer_ids.append(idx)
                                room.points_gained_this_turn += ans["points"]
                            else:
                                # Trap selected!
                                room.wrong_guesses_count += 1
                                room.points_gained_this_turn = max(0, room.points_gained_this_turn - 5)
                                # Send shake to shake player boards
                                await room.broadcast({"type": "shake_board"})
                        
                        await broadcast_game_state(room)

            elif msg_type == "revert_trap":
                # Decrement wrong guess and refund penalty
                if player_name == room.validator_name and room.state == "ROUND":
                    if room.wrong_guesses_count > 0:
                        room.wrong_guesses_count -= 1
                        room.points_gained_this_turn += 5
                        await broadcast_game_state(room)

            elif msg_type == "over":
                if player_name == room.validator_name and room.state in ("ROUND", "INTRO"):
                    room.stop_server_timer()
                    room.state = "TURN_OVER"
                    
                    # Commit scores
                    active_team = room.teams_list[room.current_team_index]
                    active_team["score"] += room.points_gained_this_turn
                    active_team["roundScoresHistory"].append(room.points_gained_this_turn)
                    
                    await broadcast_game_state(room)

            elif msg_type == "next_step":
                if (player_name == room.config["hostName"] or player_name == room.validator_name) and room.state == "TURN_OVER":
                    # Check turn rotation
                    room.current_team_index += 1
                    if room.current_team_index >= len(room.teams_list):
                        room.current_team_index = 0
                        room.current_round += 1
                        
                        if room.current_round > int(room.config["rounds"]):
                            room.state = "PODIUM"
                        else:
                            room.state = "STANDINGS"
                    else:
                        room.state = "INTRO"
                        q = fetch_online_question(db, room.config["selectedSubcategories"], [])
                        if q:
                            room.active_question = q
                            room.shuffled_answers = list(q["answers"])
                            random.shuffle(room.shuffled_answers)
                            
                    update_validator_for_turn(room)
                    await broadcast_game_state(room)

            elif msg_type == "continue_from_standings":
                if player_name == room.config["hostName"] and room.state == "STANDINGS":
                    room.state = "INTRO"
                    q = fetch_online_question(db, room.config["selectedSubcategories"], [])
                    if q:
                        room.active_question = q
                        room.shuffled_answers = list(q["answers"])
                        random.shuffle(room.shuffled_answers)
                    update_validator_for_turn(room)
                    await broadcast_game_state(room)

            elif msg_type == "restart_game":
                if player_name == room.config["hostName"] and room.state in ("PODIUM", "STANDINGS"):
                    room.state = "LOBBY"
                    room.teams_list = []
                    room.active_question = None
                    room.guessed_answer_ids = []
                    room.wrong_guesses_count = 0
                    room.stop_server_timer()
                    await room.broadcast_lobby()

    except WebSocketDisconnect:
        room.remove_player(player_name)
        if len(room.players) == 0:
            online_room_manager.manager.remove_room(room_code)
        else:
            await room.broadcast_lobby()

# --------------------------------------------------
# Legacy Matchmaking WebSocket Protocol
# --------------------------------------------------

@router.websocket("/ws/game")
async def game_websocket(websocket: WebSocket, token: str = None, db: Session = Depends(database.get_db)):
    # 1. Accept Connection
    await websocket.accept()
    
    # 2. Authenticate User (via query token)
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
        
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username = payload.get("sub")
        user = db.query(models.User).options(joinedload(models.User.persona)).filter(models.User.username == username).first()
        if not user:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    player = websocket_manager.Player(
        websocket=websocket,
        user=user
    )
    
    active_room: websocket_manager.GameRoom = None

    try:
        while True:
            # Wait for incoming messages
            data = await websocket.receive_text()
            message = json.loads(data)
            msg_type = message.get("type")

            if msg_type == "join_lobby":
                room_code = message.get("room_code")
                is_quick_match = message.get("quick_match", False)

                if is_quick_match:
                    # Quick match logic: group by language/region
                    queue_key = f"{user.preferred_language}_{user.country}"
                    if queue_key not in websocket_manager.manager.quick_match_queues:
                        websocket_manager.manager.quick_match_queues[queue_key] = set()
                    
                    # Create or find a matching room that's public and has space
                    found_room = None
                    for r in websocket_manager.manager.active_rooms.values():
                        if not r.is_private and r.state == "LOBBY" and len(r.players) < 8:
                            found_room = r
                            break
                    
                    if not found_room:
                        found_room = websocket_manager.manager.create_room(is_private=False)
                    
                    active_room = found_room
                    active_room.add_player(player)
                    
                    await active_room.broadcast({
                        "type": "lobby_update",
                        "room_code": active_room.room_code,
                        "players": [{"user_id": p.user_id, "username": p.username, "is_premium": p.is_premium} for p in active_room.players]
                    })

                    # If 2 or more players join in quick match, start countdown immediately
                    if len(active_room.players) >= 2 and active_room.state == "LOBBY":
                        asyncio.create_task(websocket_manager.run_game_loop(active_room.room_code))

                elif room_code:
                    # Join private room
                    room = websocket_manager.manager.get_room(room_code)
                    if not room:
                        await websocket.send_text(json.dumps({"type": "error", "message": "Room not found"}))
                        continue
                    if room.state != "LOBBY":
                        await websocket.send_text(json.dumps({"type": "error", "message": "Match already in progress"}))
                        continue
                    if len(room.players) >= 8:
                        await websocket.send_text(json.dumps({"type": "error", "message": "Room full"}))
                        continue
                    
                    active_room = room
                    active_room.add_player(player)
                    
                    await active_room.broadcast({
                        "type": "lobby_update",
                        "room_code": active_room.room_code,
                        "players": [{"user_id": p.user_id, "username": p.username, "is_premium": p.is_premium} for p in active_room.players]
                    })
                else:
                    # Create private room
                    active_room = websocket_manager.manager.create_room(is_private=True)
                    active_room.add_player(player)
                    await websocket.send_text(json.dumps({
                        "type": "lobby_created",
                        "room_code": active_room.room_code,
                        "players": [{"user_id": player.user_id, "username": player.username, "is_premium": player.is_premium}]
                    }))

            elif msg_type == "start_game":
                if active_room and active_room.get_host().user_id == player.user_id and active_room.state == "LOBBY":
                    if len(active_room.players) >= 1:  # allow 1 player start for testing/solo devs
                        asyncio.create_task(websocket_manager.run_game_loop(active_room.room_code))
                    else:
                        await websocket.send_text(json.dumps({"type": "error", "message": "Need at least 2 players to start"}))

            elif msg_type == "submit_answer":
                if active_room and active_room.state == "QUESTION":
                    answer_id = message.get("answer_id")
                    time_ms = message.get("time_ms", 5000.0)
                    if answer_id is not None:
                        feedback = active_room.handle_submit_answer(
                            player_id=player.user_id,
                            answer_id=int(answer_id),
                            time_ms=float(time_ms)
                        )
                        if feedback:
                            await websocket.send_text(json.dumps({
                                "type": "guess_feedback",
                                **feedback
                            }))
                            # Broadcast round score updates to other players
                            if feedback.get("status") in ("correct", "incorrect"):
                                await active_room.broadcast({
                                    "type": "round_score_update",
                                    "username": player.username,
                                    "status": feedback["status"],
                                    "total_score": player.score
                                })

    except WebSocketDisconnect:
        if active_room:
            active_room.remove_player(player.user_id)
            if len(active_room.players) == 0:
                websocket_manager.manager.remove_room(active_room.room_code)
            else:
                await active_room.broadcast({
                    "type": "lobby_update",
                    "room_code": active_room.room_code,
                    "players": [{"user_id": p.user_id, "username": p.username, "is_premium": p.is_premium} for p in active_room.players]
                })
