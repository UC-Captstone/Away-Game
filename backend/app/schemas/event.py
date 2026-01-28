# app/schemas/event.py
from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field
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

class Location(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    lat: float
    lng: float

class EventRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    
    event_id: UUID
    event_type: EventTypeEnum
    event_name: str
    date_time: datetime
    location: Location
    venue_name: str
    image_url: Optional[str] = None
    team_logos: Optional[TeamLogos] = None
    league: Optional[LeagueEnum] = None
    is_user_created: Optional[bool] = None
    is_saved: bool = False
    
    game: Optional[GameRead] = Field(None, exclude=True)
    venue: Optional[VenueRead] = Field(None, exclude=True)
