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


class LeagueRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    
    league_id: int = Field(alias="leagueId", serialization_alias="leagueId")  # ESPN league ID
    league_name: str = Field(alias="leagueName", serialization_alias="leagueName")  # League enum value
    
    @classmethod
    def from_db_model(cls, league) -> "LeagueRead":
        return cls(
            league_id=league.espn_league_id or 0,
            league_name=league.league_name
        )
