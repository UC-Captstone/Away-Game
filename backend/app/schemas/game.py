from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .venue import VenueRead
from .team import TeamRead
from .league import LeagueRead


class GameBase(BaseModel):
    league_id: UUID
    home_team_id: UUID
    away_team_id: UUID
    venue_id: Optional[UUID] = None
    date_time: datetime

class GameCreate(GameBase):
    pass

class GameUpdate(BaseModel):
    league_id: Optional[UUID] = None
    home_team_id: Optional[UUID] = None
    away_team_id: Optional[UUID] = None
    venue_id: Optional[UUID] = None
    date_time: Optional[datetime] = None

class GameRead(GameBase):
    game_id: UUID
    created_at: datetime
    league: LeagueRead
    home_team: TeamRead
    away_team: TeamRead
    venue: Optional[VenueRead] = None

    class Config:
        from_attributes = True
