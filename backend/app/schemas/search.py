from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class SearchTypeEnum(str, Enum):
    TEAM = "Team"
    GAME = "Game"
    EVENT = "Event"
    CITY = "City"

class TeamLogos(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    home: Optional[str] = None
    away: Optional[str] = None

class SearchResult(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    id: str # team_id, game_id, event_id, etc.
    type: SearchTypeEnum
    title: str # Name of the team, game, event, etc.
    image_url: Optional[str] = None
    team_logos: Optional[TeamLogos] = None
    metadata: Optional[dict] = None  # Additional metadata (league, date, location, etc.)