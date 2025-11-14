from __future__ import annotations
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .venue import VenueRead
from .team import TeamRead
from .league import LeagueRead


class GameBase(BaseModel):
    league_id: str
    home_team_id: int
    away_team_id: int
    venue_id: Optional[int] = None
    date_time: datetime

class GameCreate(GameBase):
    pass

class GameUpdate(BaseModel):
    league_id: Optional[str] = None
    home_team_id: Optional[int] = None
    away_team_id: Optional[int] = None
    venue_id: Optional[int] = None
    date_time: Optional[datetime] = None

class GameRead(GameBase):
    game_id: int
    created_at: datetime
    league: Optional[LeagueRead] = None
    home_team: Optional[TeamRead] = None
    away_team: Optional[TeamRead] = None
    venue: Optional[VenueRead] = None

    class Config:
        from_attributes = True
