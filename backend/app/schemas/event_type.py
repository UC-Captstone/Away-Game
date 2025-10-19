from __future__ import annotations
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class EventTypeBase(BaseModel):
    type_name: str
    code: Optional[str] = None

class EventTypeCreate(EventTypeBase):
    pass

class EventTypeUpdate(BaseModel):
    type_name: Optional[str] = None
    code: Optional[str] = None

class EventTypeRead(EventTypeBase):
    event_type_id: UUID

    class Config:
        from_attributes = True
