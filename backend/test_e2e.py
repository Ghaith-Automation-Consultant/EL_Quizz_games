import subprocess
import time
import os
import sys
import asyncio
import json
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Import websockets
try:
    import websockets
except ImportError:
    subprocess.run([sys.executable, "-m", "pip", "install", "websockets"])
    import websockets

PORT = 8081
BASE_URL = f"http://localhost:{PORT}"
WS_URL = f"ws://localhost:{PORT}/ws/game"

def run_rest_request(url, data=None, token=None, method="POST"):
    req = urllib.request.Request(url, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
        
    jsondata = json.dumps(data).encode("utf-8") if data else None
    
    try:
        with urllib.request.urlopen(req, data=jsondata) as response:
            res_body = response.read().decode("utf-8")
            return json.loads(res_body), response.status
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
        print(e.read().decode("utf-8"))
        raise e

async def simulate_player(token, username, is_host=False):
    uri = f"{WS_URL}?token={token}"
    async with websockets.connect(uri) as websocket:
        print(f"[{username}] Connected to WebSocket")
        
        join_msg = {
            "type": "join_lobby",
            "quick_match": True
        }
        await websocket.send(json.dumps(join_msg))
        print(f"[{username}] Sent join_lobby (quick_match)")

        room_code = None
        game_started = False
        
        try:
            while True:
                msg_str = await websocket.recv()
                msg = json.loads(msg_str)
                m_type = msg.get("type")
                
                # Check for other message types to reduce print noise if needed
                if m_type not in ("timer_tick",):
                    print(f"[{username}] Received: {m_type}")

                if m_type == "lobby_created" or m_type == "lobby_update":
                    room_code = msg.get("room_code")
                    players = msg.get("players")
                    print(f"[{username}] Room Code: {room_code}, Players: {len(players)}")
                    
                    if is_host and len(players) >= 2 and not game_started:
                        game_started = True
                        await asyncio.sleep(2)
                        print(f"[{username}] Sending start_game")
                        await websocket.send(json.dumps({"type": "start_game"}))

                elif m_type == "game_starting":
                    print(f"[{username}] Game is starting!")

                elif m_type == "new_question":
                    q_idx = msg.get("question_index")
                    q_text = msg.get("question", {}).get("text")
                    options = msg.get("question", {}).get("options", [])
                    print(f"[{username}] Question {q_idx}: {q_text} (received {len(options)} options)")
                    
                    # Submit multiple guesses one by one to simulate multi-answer mechanics
                    # We submit the first 3 options sequentially with a brief delay
                    for i in range(min(3, len(options))):
                        await asyncio.sleep(0.5)
                        ans_msg = {
                            "type": "submit_answer",
                            "answer_id": options[i]["id"],
                            "time_ms": 1000.0 * (i + 1)
                        }
                        await websocket.send(json.dumps(ans_msg))
                        print(f"[{username}] Submitted guess for answer_id: {options[i]['id']} ({options[i]['text']})")

                elif m_type == "guess_feedback":
                    status = msg.get("status")
                    ans_id = msg.get("answer_id")
                    text = msg.get("text")
                    if status == "correct":
                        pts = msg.get("points_gained")
                        print(f"[{username}] Guess CORRECT for answer_id {ans_id} ({text})! Gained {pts} pts. Current score: {msg.get('total_score')}")
                    elif status == "incorrect":
                        lost = msg.get("points_lost")
                        print(f"[{username}] Guess INCORRECT for answer_id {ans_id} ({text})! Lost {lost} pts. Current score: {msg.get('total_score')}")
                    elif status == "already_guessed":
                        print(f"[{username}] Guess ALREADY GUESSED for answer_id {ans_id}")

                elif m_type == "round_score_update":
                    user = msg.get("username")
                    status = msg.get("status")
                    print(f"[{username}] Notification: {user} made a {status} guess. Total score: {msg.get('total_score')}")

                elif m_type == "answer_reveal":
                    answers = msg.get("answers", [])
                    print(f"[{username}] Answer reveal received. Total options: {len(answers)}")
                    wrong_opt = next((a for a in answers if not a["is_correct"]), None)
                    if wrong_opt:
                        print(f"[{username}] Wrong/trick answer was: {wrong_opt['text']}")

                elif m_type == "scoreboard_update":
                    standings = msg.get("standings")
                    print(f"[{username}] Scoreboard: {standings}")

                elif m_type == "game_over":
                    results = msg.get("results")
                    print(f"[{username}] Game Over! Results: {results}")
                    break
        except Exception as e:
            print(f"[{username}] Error: {str(e)}")
            raise e

async def run_websocket_tests(token1, token2):
    await asyncio.gather(
        simulate_player(token1, "player_host", is_host=True),
        simulate_player(token2, "player_guest", is_host=False)
    )

def main():
    print("Starting FastAPI Uvicorn server in background...")
    env = os.environ.copy()
    env["TESTING"] = "True"
    backend_dir = r"d:\2_PROJECTS\DEV PROJECTS\EL QUIZZ\backend"
    
    log_file = open(os.path.join(backend_dir, "uvicorn.log"), "w")
    server_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--port", str(PORT)],
        cwd=backend_dir,
        env=env,
        stdout=log_file,
        stderr=log_file,
        text=True
    )
    
    time.sleep(3)
    
    if server_process.poll() is not None:
        print("Server failed to start immediately.")
        log_file.close()
        with open(os.path.join(backend_dir, "uvicorn.log"), "r") as f:
            print(f.read())
        sys.exit(1)

    print("FastAPI server started successfully. Running REST and WebSocket tests...")
    
    success = False
    try:
        timestamp = int(time.time())
        u1_name = f"user_host_{timestamp}"
        u2_name = f"user_guest_{timestamp}"
        
        print("\n--- Testing REST API Registration ---")
        user1, code1 = run_rest_request(
            f"{BASE_URL}/api/auth/register",
            {
                "username": u1_name,
                "email": f"{u1_name}@example.com",
                "password": "testpassword123",
                "country": "Tunisia",
                "preferred_language": "ar",
                "persona_id": 1 # diaspora: relates to Food, Slang, Culture, Geography, History
            }
        )
        print(f"User 1 registered: {user1['username']} (ID: {user1['id']})")
        
        user2, code2 = run_rest_request(
            f"{BASE_URL}/api/auth/register",
            {
                "username": u2_name,
                "email": f"{u2_name}@example.com",
                "password": "testpassword123",
                "country": "Tunisia",
                "preferred_language": "ar",
                "persona_id": 2 # student: relates to History, Geography, Science
            }
        )
        print(f"User 2 registered: {user2['username']} (ID: {user2['id']})")

        print("\n--- Testing REST API Login ---")
        token1_data, _ = run_rest_request(
            f"{BASE_URL}/api/auth/login",
            {"username": u1_name, "password": "testpassword123"}
        )
        token2_data, _ = run_rest_request(
            f"{BASE_URL}/api/auth/login",
            {"username": u2_name, "password": "testpassword123"}
        )
        
        token1 = token1_data["access_token"]
        token2 = token2_data["access_token"]
        print("Obtained tokens successfully.")

        print("\n--- Testing Profile & Stats Endpoints ---")
        profile1, _ = run_rest_request(f"{BASE_URL}/api/profile", method="GET", token=token1)
        stats1, _ = run_rest_request(f"{BASE_URL}/api/profile/stats", method="GET", token=token1)
        print(f"Profile 1 username: {profile1['username']}")
        print(f"Stats 1 games played: {stats1['games_played']}")

        print("\n--- Testing Question Suggestion Endpoint ---")
        suggested_q, _ = run_rest_request(
            f"{BASE_URL}/api/questions/suggest",
            {
                "text": "ما هو الكسكسي؟",
                "category": "Food",
                "region": "Tunisia",
                "language": "ar",
                "difficulty": 1,
                "answers": [
                    {"text": "أكلة تونسية شهيرة", "is_correct": True, "points": 10},
                    {"text": "مشروب ساخن", "is_correct": False, "points": 0},
                    {"text": "نوع من الحلويات", "is_correct": True, "points": 20},
                    {"text": "طعام تقليدي للمناسبات", "is_correct": True, "points": 15},
                    {"text": "وجبة مغذية من السميد", "is_correct": True, "points": 12},
                    {"text": "طبق يطبخ على البخار", "is_correct": True, "points": 18},
                    {"text": "كسكسي بالعصبان أو اللحم", "is_correct": True, "points": 25},
                    {"text": "أكلة مغاربية معروفة", "is_correct": True, "points": 11},
                    {"text": "طبق رئيسي في الغداء", "is_correct": True, "points": 14},
                    {"text": "كسكسي بالمسفوف الحلو", "is_correct": True, "points": 30}
                ]
            },
            token=token1
        )
        print(f"Suggested Question ID: {suggested_q['id']} - Approved status: {suggested_q['is_approved']}")

        print("\n--- Testing Real-Time Multiplayer WebSockets Match ---")
        asyncio.run(run_websocket_tests(token1, token2))
        
        print("\n--- Verification: Checking updated stats ---")
        updated_stats1, _ = run_rest_request(f"{BASE_URL}/api/profile/stats", method="GET", token=token1)
        print(f"Updated Stats 1: Games Played = {updated_stats1['games_played']}, Games Won = {updated_stats1['games_won']}")
        
        if updated_stats1['games_played'] > 0:
            print("\nSUCCESS: E2E Test completed and DB states were updated successfully!")
            success = True
        else:
            print("\nFAILURE: Game finished but statistics were not updated.")

    except Exception as e:
        print(f"\nTEST EXCEPTION: {str(e)}")
    finally:
        print("Stopping FastAPI server...")
        server_process.terminate()
        try:
            server_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server_process.kill()
        log_file.close()
            
    if success:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
