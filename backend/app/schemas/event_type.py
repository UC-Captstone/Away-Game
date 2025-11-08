from __future__ import annotations
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class EventTypeBase(BaseModel):
    code: str
    type_name: str

class EventTypeCreate(EventTypeBase):
    pass

class EventTypeUpdate(BaseModel):
    type_name: Optional[str] = None

class EventTypeRead(EventTypeBase):
    class Config:
        from_attributes = True
