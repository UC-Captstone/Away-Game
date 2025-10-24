from __future__ import annotations
from typing import Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class VenueBase(BaseModel):
    name: str
    display_name: str
    city: Optional[str] = None
    state_region: Optional[str] = None
    country: Optional[str] = None
    timezone: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    capacity: Optional[int] = None
    is_indoor: Optional[bool] = None
    espn_venue_id: Optional[int] = None


class VenueCreate(VenueBase):
    pass


class VenueUpdate(BaseModel):
    name: Optional[str] = None
    display_name: Optional[str] = None
    city: Optional[str] = None
    state_region: Optional[str] = None
    country: Optional[str] = None
    timezone: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    capacity: Optional[int] = None
    is_indoor: Optional[bool] = None
    espn_venue_id: Optional[int] = None


class VenueRead(VenueBase):
    venue_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
