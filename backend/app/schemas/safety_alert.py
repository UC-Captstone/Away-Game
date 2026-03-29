from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from enum import Enum

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
from .common import Location
from .game import GameRead
from .venue import VenueRead


class SafetyAlertBase(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    reporter_user_id: UUID
    alert_type_id: str
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    source: str = "admin"
    severity: str = "low"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    expires_at: Optional[datetime] = None


class SafetyAlertCreate(SafetyAlertBase):
    pass


class SafetyAlertCreateRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    alert_type_id: str
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    severity: str = "low"
    is_official: bool = False
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    expires_at: Optional[datetime] = None


class SafetyAlertUpdate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    alert_type_id: Optional[str] = None
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    is_official: Optional[bool] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    expires_at: Optional[datetime] = None
    is_active: Optional[bool] = None


class SafetyAlertRead(SafetyAlertBase):
    alert_id: UUID
    is_active: bool
    is_official: bool
    created_at: datetime
    game: Optional[GameRead] = None
    venue: Optional[VenueRead] = None

    class Config:
        from_attributes = True


SafetyAlertRead.model_rebuild()


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
