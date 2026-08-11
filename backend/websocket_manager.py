import json
import asyncio
import random
import os
from typing import Dict, List, Set, Optional
from fastapi import WebSocket
from sqlalchemy.orm import Session, joinedload
import models
from database import SessionLocal

FIBONACCI_STEPS = [1, 2, 3, 5, 8]

def get_previous_fibonacci(val: int) -> int:
    if val <= 1:
        return 1
    try:
        idx = FIBONACCI_STEPS.index(val)
        return FIBONACCI_STEPS[idx - 1]
    except ValueError:
        return max(1, val - 1)

def get_next_fibonacci(val: int) -> int:
    if val >= 8:
        return 8
    try:
        idx = FIBONACCI_STEPS.index(val)
        return FIBONACCI_STEPS[idx + 1]
    except ValueError:
        return min(8, val + 1)

def get_translated_question_text(q: models.Question, lang: str) -> str:
    # Check translations list
    for tr in q.translations:
        if tr.language == lang:
            return tr.text
    return q.text # Fallback to default (Arabic)

def get_translated_answer_text(ans: models.Answer, lang: str) -> str:
    # Check translations list
    for tr in ans.translations:
        if tr.language == lang:
            return tr.text
    return ans.text # Fallback to default (Arabic)

class Player:
    def __init__(self, websocket: WebSocket, user):
        self.websocket = websocket
        self.user_id = user.id
        self.username = user.username
        self.is_premium = user.is_premium
        self.level = user.level
        self.score = 0
        self.momentum = 1.0  # 1.0 = normal, < 1.0 = trailing, > 1.0 = leading
        self.last_answer_correct = False
        self.consecutive_correct = 0
        self.preferred_language = user.preferred_language
        
        # Extract custom interests and disinterests
        self.interests = set(user.interests or [])
        self.disinterests = set(user.disinterests or [])
        
        # Merge chosen persona's interests and disinterests if exists
        if user.persona:
            if user.persona.interests:
                self.interests.update(user.persona.interests)
            if user.persona.disinterests:
                self.disinterests.update(user.persona.disinterests)

class GameRoom:
    def __init__(self, room_code: str, is_private: bool = True):
        self.room_code = room_code
        self.is_private = is_private
        self.players: List[Player] = []
        self.state = "LOBBY"  # LOBBY, STARTING, QUESTION, REVEAL, SCOREBOARD, GAMEOVER
        self.questions: List[models.Question] = []
        self.current_question_index = 0
        self.guessed_answers: Dict[int, Set[int]] = {}  # user_id -> set of answer_ids guessed
        self.round_guesses: Dict[int, List[dict]] = {}    # user_id -> list of round guesses
        self.answers_received: Dict[int, dict] = {}       # Kept for E2E count sync compatibility if needed
        self.round_questions_count = 5
        self.total_rounds = 5
        self.timer_seconds = 10
        self.timer_task: Optional[asyncio.Task] = None
        self.language = "ar" # Default to Arabic

    def add_player(self, player: Player):
        if len(self.players) == 0:
            self.language = player.preferred_language
        self.players.append(player)

    def remove_player(self, player_id: int):
        self.players = [p for p in self.players if p.user_id != player_id]

    def get_host(self) -> Optional[Player]:
        return self.players[0] if self.players else None

    async def broadcast(self, message: dict):
        dead_players = []
        for player in self.players:
            try:
                await player.websocket.send_text(json.dumps(message))
            except Exception:
                dead_players.append(player.user_id)
        for pid in dead_players:
            self.remove_player(pid)

    def handle_submit_answer(self, player_id: int, answer_id: int, time_ms: float):
        if self.state != "QUESTION":
            return None
            
        player = next((p for p in self.players if p.user_id == player_id), None)
        if not player:
            return None
            
        current_q = self.questions[self.current_question_index]
        ans_obj = next((a for a in current_q.answers if a.id == answer_id), None)
        if not ans_obj:
            return None
            
        if player_id not in self.guessed_answers:
            self.guessed_answers[player_id] = set()
        if player_id not in self.round_guesses:
            self.round_guesses[player_id] = []
            
        if ans_obj.is_correct:
            if answer_id in self.guessed_answers[player_id]:
                return {"status": "already_guessed", "answer_id": answer_id}
                
            self.guessed_answers[player_id].add(answer_id)
            
            # Check relates / disrelates
            relates = current_q.category in player.interests
            disrelates = current_q.category in player.disinterests
            
            difficulty = ans_obj.points # stores 1, 2, 3, 5, 8
            if relates:
                effective_difficulty = max(get_previous_fibonacci(difficulty), 1)
            elif disrelates:
                effective_difficulty = min(get_next_fibonacci(difficulty), 8)
            else:
                effective_difficulty = difficulty
                
            points_gained = int(round(effective_difficulty * player.momentum))
            player.score += points_gained
            player.consecutive_correct += 1
            player.last_answer_correct = True
            
            self.round_guesses[player_id].append({
                "answer_id": answer_id,
                "text": get_translated_answer_text(ans_obj, player.preferred_language),
                "is_correct": True,
                "points_gained": points_gained
            })
            
            return {
                "status": "correct",
                "answer_id": answer_id,
                "text": get_translated_answer_text(ans_obj, player.preferred_language),
                "points_gained": points_gained,
                "total_score": player.score,
                "momentum": player.momentum
            }
        else:
            player.consecutive_correct = 0
            player.last_answer_correct = False
            
            points_lost = 5
            player.score = max(0, player.score - points_lost)
            
            self.round_guesses[player_id].append({
                "answer_id": answer_id,
                "text": get_translated_answer_text(ans_obj, player.preferred_language),
                "is_correct": False,
                "points_lost": points_lost
            })
            
            return {
                "status": "incorrect",
                "answer_id": answer_id,
                "text": get_translated_answer_text(ans_obj, player.preferred_language),
                "points_lost": points_lost,
                "total_score": player.score,
                "momentum": player.momentum
            }

class ConnectionManager:
    def __init__(self):
        self.active_rooms: Dict[str, GameRoom] = {}
        self.quick_match_queues: Dict[str, Set[int]] = {}  # "lang_region" -> set(user_id)
        self.quick_match_players: Dict[int, Player] = {}

    def create_room(self, is_private: bool = True) -> GameRoom:
        while True:
            code = "".join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", k=6))
            if code not in self.active_rooms:
                room = GameRoom(room_code=code, is_private=is_private)
                self.active_rooms[code] = room
                return room

    def get_room(self, code: str) -> Optional[GameRoom]:
        return self.active_rooms.get(code.upper())

    def remove_room(self, code: str):
        if code in self.active_rooms:
            del self.active_rooms[code]

manager = ConnectionManager()

# Helper: Fetch adaptive difficulty question based on momentum
def fetch_question_for_player(db: Session, room: GameRoom, player: Player) -> models.Question:
    # Basic adaptive difficulty:
    # If player is leading (momentum > 1.0), query harder questions (difficulty 4-5)
    # If player is trailing (momentum < 1.0), query easier questions (difficulty 1-2)
    # Otherwise standard difficulty (difficulty 2-3)
    target_difficulty = 3
    if player.momentum > 1.2:
        target_difficulty = 4
    elif player.momentum < 0.8:
        target_difficulty = 2

    # Query from db
    query = db.query(models.Question).options(
        joinedload(models.Question.answers).joinedload(models.Answer.translations),
        joinedload(models.Question.translations),
        joinedload(models.Question.category_rel),
        joinedload(models.Question.subcategory_rel)
    ).filter(
        models.Question.difficulty == target_difficulty,
        models.Question.is_approved == True
    )
    # Apply category filters if room has options
    questions = query.all()
    if not questions:
        # Fallback to any approved question
        questions = db.query(models.Question).options(
            joinedload(models.Question.answers).joinedload(models.Answer.translations),
            joinedload(models.Question.translations),
            joinedload(models.Question.category_rel),
            joinedload(models.Question.subcategory_rel)
        ).filter(models.Question.is_approved == True).all()
    
    return random.choice(questions) if questions else None

async def run_game_loop(room_code: str):
    room = manager.get_room(room_code)
    if not room or len(room.players) == 0:
        return
    if room.state != "LOBBY":
        return

    db = SessionLocal()
    is_testing = os.getenv("TESTING") == "True"
    q_limit = 2 if is_testing else 25
    sleep_starting = 1 if is_testing else 5
    sleep_reveal = 1 if is_testing else 4
    sleep_scoreboard = 1 if is_testing else 3

    try:
        # 1. Fetch questions with eager-loaded answers
        all_questions = db.query(models.Question).options(
            joinedload(models.Question.answers).joinedload(models.Answer.translations),
            joinedload(models.Question.translations),
            joinedload(models.Question.category_rel),
            joinedload(models.Question.subcategory_rel)
        ).filter(models.Question.is_approved == True).all()
        
        random.shuffle(all_questions)
        room.questions = all_questions[:q_limit]
        if not room.questions:
            # Fallback mock questions
            room.questions = []
            for i in range(q_limit):
                q = models.Question(
                    id=9999 + i,
                    category_id=1,
                    difficulty=3,
                    region="Tunisia",
                    is_approved=True
                )
                q.translations = [
                    models.QuestionText(id=q.id, language="ar", text=f"Sample Tunisia Question {i}?"),
                    models.QuestionText(id=q.id, language="tn", text=f"Sample Tunisia Question {i}?"),
                    models.QuestionText(id=q.id, language="fr", text=f"Sample Tunisia Question FR {i}?"),
                    models.QuestionText(id=q.id, language="en", text=f"Sample Tunisia Question EN {i}?")
                ]
                q.answers = []
                for j in range(9):
                    ans = models.Answer(id=99990 + i*10 + j, is_correct=True, points=1)
                    ans.translations = [
                        models.AnswerText(id=ans.id, language="ar", text=f"Correct Answer {j}"),
                        models.AnswerText(id=ans.id, language="tn", text=f"Correct Answer {j}"),
                        models.AnswerText(id=ans.id, language="fr", text=f"Correct Answer FR {j}"),
                        models.AnswerText(id=ans.id, language="en", text=f"Correct Answer EN {j}")
                    ]
                    q.answers.append(ans)
                
                ans_w = models.Answer(id=99990 + i*10 + 9, is_correct=False, points=0)
                ans_w.translations = [
                    models.AnswerText(id=ans_w.id, language="ar", text="Wrong plausible distractor"),
                    models.AnswerText(id=ans_w.id, language="tn", text="Wrong plausible distractor"),
                    models.AnswerText(id=ans_w.id, language="fr", text="Wrong distractor FR"),
                    models.AnswerText(id=ans_w.id, language="en", text="Wrong distractor EN")
                ]
                q.answers.append(ans_w)
                room.questions.append(q)

        room.state = "STARTING"
        await room.broadcast({"type": "game_starting", "message": f"Match starts in {sleep_starting} seconds..."})
        await asyncio.sleep(sleep_starting)

        for q_idx in range(len(room.questions)):
            if not manager.get_room(room_code) or len(room.players) == 0:
                break
            
            room.current_question_index = q_idx
            room.state = "QUESTION"
            room.guessed_answers = { p.user_id: set() for p in room.players }
            room.round_guesses = { p.user_id: [] for p in room.players }
            current_q = room.questions[q_idx]

            # Broadcast new question (hiding points and is_correct flags)
            lang = room.language
            q_text_val = get_translated_question_text(current_q, lang)
            options = [
                {"id": ans.id, "text": get_translated_answer_text(ans, lang)} 
                for ans in current_q.answers
            ]
            random.shuffle(options)

            await room.broadcast({
                "type": "new_question",
                "question_index": q_idx + 1,
                "total_questions": len(room.questions),
                "question": {
                    "text": q_text_val,
                    "options": options,
                    "category": current_q.category,
                    "difficulty": current_q.difficulty
                },
                "timer": room.timer_seconds
            })

            # Start 10s countdown
            # Break early if all players have guessed all 9 correct answers
            for sec in range(room.timer_seconds, -1, -1):
                all_done = True
                for p in room.players:
                    guesses = room.guessed_answers.get(p.user_id, set())
                    if len(guesses) < 9:
                        all_done = False
                        break
                if all_done:
                    break
                await room.broadcast({"type": "timer_tick", "seconds_remaining": sec})
                await asyncio.sleep(1)

            # Round Reveal
            room.state = "REVEAL"
            
            round_results = []
            for player in room.players:
                guesses = room.round_guesses.get(player.user_id, [])
                correct_count = len([g for g in guesses if g["is_correct"]])
                wrong_count = len([g for g in guesses if not g["is_correct"]])
                
                # Momentum scaling:
                if correct_count >= 3:
                    player.momentum = min(player.momentum + 0.1, 1.5)
                elif wrong_count > 0 or correct_count == 0:
                    player.momentum = max(player.momentum - 0.1, 0.7)
                    
                points_gained_total = sum(g.get("points_gained", 0) for g in guesses) - sum(g.get("points_lost", 0) for g in guesses)
                
                round_results.append({
                    "user_id": player.user_id,
                    "username": player.username,
                    "correct_count": correct_count,
                    "wrong_count": wrong_count,
                    "points_gained": points_gained_total,
                    "total_score": player.score,
                    "momentum": player.momentum,
                    "guesses": guesses
                })

            all_answers = [{"id": ans.id, "text": ans.text, "is_correct": ans.is_correct, "points": ans.points} for ans in current_q.answers]
            await room.broadcast({
                "type": "answer_reveal",
                "answers": all_answers,
                "results": round_results
            })
            await asyncio.sleep(sleep_reveal)

            # Round standings / scoreboard
            room.state = "SCOREBOARD"
            standings = sorted([
                {"user_id": p.user_id, "username": p.username, "score": p.score, "level": p.level}
                for p in room.players
            ], key=lambda x: x["score"], reverse=True)
            
            await room.broadcast({
                "type": "scoreboard_update",
                "standings": standings
            })
            await asyncio.sleep(sleep_scoreboard)

        # Game Over
        room.state = "GAMEOVER"
        # Calculate final stats, database write, XP progression
        final_standings = sorted(room.players, key=lambda x: x.score, reverse=True)
        winner = final_standings[0] if final_standings else None
        
        final_results = []
        for i, player in enumerate(final_standings):
            # XP calculation:
            # Base XP: 50
            # Place bonus: 1st (+100 XP), 2nd (+50 XP), 3rd (+30 XP)
            # Score bonus: score / 10 XP
            place_bonus = 100 if i == 0 else (50 if i == 1 else (30 if i == 2 else 0))
            xp_earned = 50 + place_bonus + int(player.score / 10)
            
            # Write to database (User Stats & Levels)
            db_user = db.query(models.User).filter(models.User.id == player.user_id).first()
            if db_user:
                db_user.xp += xp_earned
                # Simple level up: every 500 XP is a level
                new_level = 1 + int(db_user.xp / 500)
                level_up = new_level > db_user.level
                db_user.level = new_level
                
                # Update User Stats
                db_stats = db.query(models.UserStats).filter(models.UserStats.user_id == player.user_id).first()
                if not db_stats:
                    db_stats = models.UserStats(user_id=player.user_id)
                    db.add(db_stats)
                db_stats.games_played += 1
                if i == 0:
                    db_stats.games_won += 1
                db_stats.total_points += player.score
                db_stats.win_rate = db_stats.games_won / db_stats.games_played
                db.commit()
            
            final_results.append({
                "user_id": player.user_id,
                "username": player.username,
                "final_score": player.score,
                "xp_earned": xp_earned,
                "new_level": db_user.level if db_user else player.level,
                "level_up": level_up if db_user else False,
                "place": i + 1
            })
            
        await room.broadcast({
            "type": "game_over",
            "results": final_results
        })
        manager.remove_room(room_code)
    finally:
        db.close()
