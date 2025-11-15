from __future__ import annotations
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from .league import LeagueRead

class TeamBase(BaseModel):
    league_id: str
    sport_league: str
    sport_conference: Optional[str] = None
    sport_division: Optional[str] = None
    home_location: str
    team_name: str
    display_name: str
    home_venue_id: Optional[int] = None


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    league_id: Optional[str] = None
    sport_league: Optional[str] = None
    sport_conference: Optional[str] = None
    sport_division: Optional[str] = None
    home_location: Optional[str] = None
    team_name: Optional[str] = None
    display_name: Optional[str] = None
    home_venue_id: Optional[int] = None

class TeamRead(TeamBase):
    team_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    league: Optional[LeagueRead] = None

    class Config:
        from_attributes = True
