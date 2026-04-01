from __future__ import annotations
from uuid import UUID
from datetime import datetime, timezone
from typing import Optional
from enum import Enum

from pydantic import BaseModel, ConfigDict, field_serializer, model_validator
from pydantic.alias_generators import to_camel
from .common import Location


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
    game_name: Optional[str] = None

    @model_validator(mode='before')
    @classmethod
    def _derive_game_name(cls, data: object) -> object:
        if hasattr(data, 'game') and data.game is not None:
            game = data.game
            try:
                away = game.away_team.display_name if game.away_team else '?'
                home = game.home_team.display_name if game.home_team else '?'
                object.__setattr__(data, 'game_name', f'{away} @ {home}')
            except Exception:
                pass
        return data

    @field_serializer('created_at')
    def serialize_created_at(self, v: datetime) -> str:
        if v.tzinfo is None:
            v = v.replace(tzinfo=timezone.utc)
        return v.isoformat()

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
