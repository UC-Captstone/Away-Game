from __future__ import annotations
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel


class GameCreate(BaseModel):
    espn_sport_id: int
    espn_league_id: int
    espn_team_id: int
    date_time: datetime


class GameUpdate(BaseModel):
    espn_sport_id: int
    espn_league_id: int
    espn_team_id: int
    date_time: datetime


class GameRead(BaseModel):
    game_id: UUID
    espn_sport_id: int
    espn_league_id: int
    espn_team_id: int
    date_time: datetime

    class Config:
        from_attributes = True
