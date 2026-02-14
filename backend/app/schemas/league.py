from __future__ import annotations
from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel
from typing import Optional
from enum import Enum


class LeagueEnum(str, Enum):
    NBA = "NBA"
    NFL = "NFL"
    MLB = "MLB"
    NHL = "NHL"
    MLS = "MLS"


# Map league enum to ESPN IDs
LEAGUE_ESPN_ID_MAP = {
    LeagueEnum.NBA: 1,
    LeagueEnum.NFL: 28,
    LeagueEnum.MLB: 2,
    LeagueEnum.NHL: 3,
    LeagueEnum.MLS: 4,
}


class LeagueBase(BaseModel):
    league_code: str
    league_name: str
    espn_sport: Optional[str] = None
    espn_league: Optional[str] = None
    is_active: bool = True


class LeagueCreate(LeagueBase):
    pass


class LeagueUpdate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    league_name: Optional[str] = None
    espn_sport: Optional[str] = None
    espn_league: Optional[str] = None
    is_active: Optional[bool] = None


class LeagueRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    
    league_code: str
    league_name: str
    espn_sport: Optional[str] = None
    espn_league: Optional[str] = None
    is_active: bool