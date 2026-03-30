# app/schemas/event.py
from __future__ import annotations
from uuid import UUID
from datetime import date, datetime, time
from typing import Optional
from schemas.common import Location
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from pydantic.alias_generators import to_camel
from .venue import VenueRead
from .game import GameRead
from .types import EventTypeEnum
from .league import LeagueEnum


class EventBase(BaseModel):
    creator_user_id: UUID
    event_type_id: str
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    picture_url: Optional[str] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    event_type_id: Optional[str] = None
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    picture_url: Optional[str] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class TeamLogos(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    home: Optional[str] = None
    away: Optional[str] = None

class EventRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    
    event_id: UUID
    game_id: Optional[int] = None
    event_type: EventTypeEnum
    event_name: str
    date_time: datetime
    location: Optional[Location] = None
    venue_name: str
    image_url: Optional[str] = None
    team_logos: Optional[TeamLogos] = None
    league: Optional[LeagueEnum] = None
    is_user_created: Optional[bool] = None
    is_saved: bool = False
    
    game: Optional[GameRead] = Field(None, exclude=True)
    venue: Optional[VenueRead] = Field(None, exclude=True)


class EventSearchFilters(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    keyword: str = ""
    leagues: list[LeagueEnum] = Field(default_factory=list)
    team_ids: list[int] = Field(default_factory=list)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    location_query: str = ""
    saved_only: bool = False
    event_types: list[EventTypeEnum] = Field(default_factory=list)

    @field_validator("start_date", "end_date", mode="before")
    @classmethod
    def _empty_string_to_none(cls, value):
        if value == "":
            return None
        return value

    @model_validator(mode="after")
    def _validate_date_range(self) -> "EventSearchFilters":
        if self.start_date and self.end_date:
            start_dt = datetime.combine(self.start_date, time.min)
            end_dt = datetime.combine(self.end_date, time.max)
            if start_dt > end_dt:
                raise ValueError("startDate must be less than or equal to endDate")
        return self
