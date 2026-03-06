from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .venue import VenueRead
from .game import GameRead


class SafetyAlertBase(BaseModel):
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
    alert_type_id: str
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    severity: str = "low"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    expires_at: Optional[datetime] = None


class SafetyAlertUpdate(BaseModel):
    alert_type_id: Optional[str] = None
    game_id: Optional[int] = None
    venue_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    severity: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    expires_at: Optional[datetime] = None
    is_active: Optional[bool] = None


class SafetyAlertRead(SafetyAlertBase):
    alert_id: UUID
    is_active: bool
    created_at: datetime
    game: Optional[GameRead] = None
    venue: Optional[VenueRead] = None

    class Config:
        from_attributes = True
