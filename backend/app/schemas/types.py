from __future__ import annotations
from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class EventTypeCreate(BaseModel):
    type_name: str
    code: Optional[str] = None


class EventTypeRead(BaseModel):
    event_type_id: UUID
    type_name: str
    code: Optional[str] = None

    class Config:
        from_attributes = True


class AlertTypeCreate(BaseModel):
    type_name: str
    code: Optional[str] = None


class AlertTypeRead(BaseModel):
    alert_type_id: UUID
    type_name: str
    code: Optional[str] = None

    class Config:
        from_attributes = True
