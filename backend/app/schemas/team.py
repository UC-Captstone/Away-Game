from __future__ import annotations
from typing import Optional
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from .league import LeagueRead
from pydantic.alias_generators import to_camel

class TeamBase(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    league_id: str
    sport_league: str
    sport_conference: Optional[str] = None
    sport_division: Optional[str] = None
    home_location: str
    team_name: str
    display_name: str
    home_venue_id: Optional[int] = None
    logo_url: Optional[str] = None


class TeamCreate(TeamBase):
    pass


class TeamUpdate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    league_id: Optional[str] = None
    sport_league: Optional[str] = None
    sport_conference: Optional[str] = None
    sport_division: Optional[str] = None
    home_location: Optional[str] = None
    team_name: Optional[str] = None
    display_name: Optional[str] = None
    home_venue_id: Optional[int] = None
    logo_url: Optional[str] = None


class TeamRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    
    team_id: int
    league: Optional[LeagueRead] = None
    sport_conference: Optional[str] = None
    sport_division: Optional[str] = None
    home_location: str
    team_name: str
    display_name: str
    logo_url: str

