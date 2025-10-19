from __future__ import annotations
from typing import Optional
from uuid import UUID
from pydantic import BaseModel
from datetime import datetime
from .league import LeagueRead

class TeamBase(BaseModel):
    league_id: UUID
    sport_league: str
    sport_conference: Optional[str] = None
    sport_division: Optional[str] = None
    home_location: str
    team_name: str
    display_name: str
    home_venue_id: Optional[UUID] = None
    espn_team_id: Optional[int] = None


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    league_id: Optional[UUID] = None
    sport_league: Optional[str] = None
    sport_conference: Optional[str] = None
    sport_division: Optional[str] = None
    home_location: Optional[str] = None
    team_name: Optional[str] = None
    display_name: Optional[str] = None
    home_venue_id: Optional[UUID] = None
    espn_team_id: Optional[int] = None

class TeamRead(TeamBase):
    team_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    league: LeagueRead

    class Config:
        from_attributes = True
