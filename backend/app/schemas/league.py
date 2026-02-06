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


class LeagueBase(BaseModel):
    league_code: str
    espn_sport: str
    espn_league: Optional[str] = None
    league_name: str


class LeagueCreate(LeagueBase):
    pass


class LeagueUpdate(BaseModel):
    espn_sport: Optional[str] = None
    espn_league: Optional[str] = None
    league_code: Optional[str] = None
    league_name: Optional[str] = None


class LeagueRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    league_code: str = Field(alias="leagueCode", serialization_alias="leagueCode")
    league_name: str = Field(alias="leagueName", serialization_alias="leagueName")

    @classmethod
    def from_db_model(cls, league) -> "LeagueRead":
        return cls(
            league_code=league.league_code,
            league_name=league.league_name
        )
