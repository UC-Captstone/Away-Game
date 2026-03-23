from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from enum import Enum

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from .common import Location
from .venue import VenueRead
from .game import GameRead


class SafetyAlertBase(BaseModel):
    reporter_user_id: UUID
    alert_type_id: str
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    description: Optional[str] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class SafetyAlertCreate(SafetyAlertBase):
    pass


class SafetyAlertUpdate(BaseModel):
    alert_type_id: Optional[str] = None
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
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


class SafetyAlertSeverity(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class SafetyAlertFeedRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    alert_id: UUID

    reporter_user_id: Optional[UUID] = None
    alert_type_id: Optional[str] = None
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: Optional[datetime] = None

    severity: SafetyAlertSeverity
    title: str
    description: str
    date_time: datetime
    location: Location
