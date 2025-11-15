from __future__ import annotations
from pydantic import BaseModel
from typing import Optional

class LeagueBase(BaseModel):
    league_code: str
    sport_code: str
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
    class Config:
        from_attributes = True
