# app/schemas/event.py
from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .venue import VenueRead
from .game import GameRead


class EventBase(BaseModel):
    creator_user_id: UUID
    event_type_id: UUID
    game_id: Optional[UUID] = None
    venue_id: Optional[UUID] = None
    title: str
    description: Optional[str] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    event_type_id: Optional[UUID] = None
    game_id: Optional[UUID] = None
    venue_id: Optional[UUID] = None
    title: Optional[str] = None
    description: Optional[str] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class EventRead(EventBase):
    event_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None
    game: Optional[GameRead] = None
    venue: Optional[VenueRead] = None

    class Config:
        from_attributes = True
