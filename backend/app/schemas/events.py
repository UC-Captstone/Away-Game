from __future__ import annotations
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel
from app.schemas.common import LocationPoint


class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    event_type_id: UUID
    game_date: Optional[datetime] = None
    game_id: Optional[UUID] = None
    location: Optional[LocationPoint] = None


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    event_type_id: Optional[UUID] = None
    game_date: Optional[datetime] = None
    game_id: Optional[UUID] = None
    location: Optional[LocationPoint] = None


class EventRead(BaseModel):
    event_id: UUID
    title: str
    description: Optional[str] = None
    event_type_id: UUID
    game_date: Optional[datetime] = None
    game_id: Optional[UUID] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
