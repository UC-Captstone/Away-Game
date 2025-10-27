from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .venue import VenueRead
from .game import GameRead


class SafetyAlertBase(BaseModel):
    reporter_user_id: UUID
    alert_type_id: UUID
    game_id: Optional[UUID] = None
    venue_id: Optional[UUID] = None
    description: Optional[str] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class SafetyAlertCreate(SafetyAlertBase):
    pass


class SafetyAlertUpdate(BaseModel):
    alert_type_id: Optional[UUID] = None
    game_id: Optional[UUID] = None
    venue_id: Optional[UUID] = None
    description: Optional[str] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class SafetyAlertRead(SafetyAlertBase):
    alert_id: UUID
    created_at: datetime
    game: Optional[GameRead] = None
    venue: Optional[VenueRead] = None

    class Config:
        from_attributes = True
