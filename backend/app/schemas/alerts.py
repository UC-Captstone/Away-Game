
from __future__ import annotations
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel
from app.schemas.common import LocationPoint


class AlertCreate(BaseModel):
    alert_type_id: UUID
    description: Optional[str] = None
    game_id: Optional[UUID] = None
    game_date: Optional[datetime] = None
    location: Optional[LocationPoint] = None


class AlertUpdate(BaseModel):
    alert_type_id: Optional[UUID] = None
    description: Optional[str] = None
    game_id: Optional[UUID] = None
    game_date: Optional[datetime] = None
    location: Optional[LocationPoint] = None


class AlertRead(BaseModel):
    alert_id: UUID
    alert_type_id: UUID
    description: Optional[str] = None
    game_id: Optional[UUID] = None
    game_date: Optional[datetime] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True
