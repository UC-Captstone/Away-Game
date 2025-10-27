from __future__ import annotations
from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class LeagueBase(BaseModel):
    sport_code: str
    league_code: str
    league_name: str
    espn_league_id: Optional[int] = None

class LeagueCreate(LeagueBase):
    pass


class LeagueUpdate(BaseModel):
    sport_code: Optional[str] = None
    league_code: Optional[str] = None
    league_name: Optional[str] = None
    espn_league_id: Optional[int] = None


class LeagueRead(LeagueBase):
    league_id: UUID

    class Config:
        from_attributes = True
