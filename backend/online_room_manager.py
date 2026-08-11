import json
import asyncio
import random
from typing import Dict, List, Optional
from fastapi import WebSocket
from sqlalchemy.orm import Session, joinedload
import models
from database import SessionLocal

class OnlinePlayer:
    def __init__(self, name: str, ws: WebSocket):
        self.name = name
        self.ws = ws
        self.team_index: Optional[int] = None # None means unassigned/spectator
        self.role: str = "spectator" # player, referee, spectator

class OnlineRoom:
    def __init__(self, room_code: str):
        self.room_code = room_code
        self.players: Dict[str, OnlinePlayer] = {} # name -> OnlinePlayer
        self.state = "LOBBY" # LOBBY, TEAMS, INTRO, ROUND, STANDINGS, PODIUM
        self.config = {
            "rounds": 2,
            "teamsCount": 2,
            "selectedSubcategories": [], # list of "Category:Subcategory"
            "hostRole": "referee", # referee or player
            "hostName": ""
        }
        self.current_round = 1
        self.current_team_index = 0
        self.teams_list: List[dict] = [] # list of {"name": str, "icon": str, "score": 0, "roundScoresHistory": []}
        self.active_question = None
        self.guessed_answer_ids = []
        self.wrong_guesses_count = 0
        self.points_gained_this_turn = 0
        self.timer_val = 60
        self.timer_task: Optional[asyncio.Task] = None
        self.shuffled_answers = []
        self.language = "ar"
        self.validator_name = ""

    def add_player(self, name: str, ws: WebSocket) -> OnlinePlayer:
        if name in self.players:
            # Reconnect session
            self.players[name].ws = ws
        else:
            self.players[name] = OnlinePlayer(name, ws)
            if not self.config["hostName"]:
                self.config["hostName"] = name
                self.players[name].role = "referee" # Host defaults to referee
        return self.players[name]

    def remove_player(self, name: str):
        if name in self.players:
            del self.players[name]

    async def broadcast(self, message: dict):
        dead_players = []
        for name, p in list(self.players.items()):
            try:
                await p.ws.send_text(json.dumps(message))
            except Exception:
                dead_players.append(name)
        for name in dead_players:
            self.remove_player(name)

    def serialize_lobby_state(self) -> dict:
        return {
            "type": "lobby_update",
            "room_code": self.room_code,
            "hostName": self.config["hostName"],
            "state": self.state,
            "config": self.config,
            "players": [
                {
                    "name": name,
                    "team_index": p.team_index,
                    "role": p.role
                }
                for name, p in self.players.items()
            ]
        }

    async def broadcast_lobby(self):
        await self.broadcast(self.serialize_lobby_state())

    def start_server_timer(self):
        if self.timer_task:
            self.timer_task.cancel()
        self.timer_val = 60
        self.timer_task = asyncio.create_task(self._timer_loop())

    async def _timer_loop(self):
        try:
            while self.timer_val > 0:
                await asyncio.sleep(1)
                self.timer_val -= 1
                await self.broadcast({
                    "type": "timer_tick",
                    "val": self.timer_val
                })
            # Time runs out
            await self.broadcast({
                "type": "timer_expired"
            })
        except asyncio.CancelledError:
            pass

    def stop_server_timer(self):
        if self.timer_task:
            self.timer_task.cancel()
            self.timer_task = None

class OnlineRoomManager:
    def __init__(self):
        self.rooms: Dict[str, OnlineRoom] = {}

    def create_room(self) -> str:
        # Generates a random 4-letter room code
        while True:
            code = "".join(random.choices("ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789", k=4))
            if code not in self.rooms:
                break
        self.rooms[code] = OnlineRoom(code)
        return code

    def get_room(self, code: str) -> Optional[OnlineRoom]:
        return self.rooms.get(code.upper().strip())

    def remove_room(self, code: str):
        code = code.upper().strip()
        if code in self.rooms:
            room = self.rooms[code]
            room.stop_server_timer()
            del self.rooms[code]

manager = OnlineRoomManager()
