from __future__ import annotations
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class AlertTypeBase(BaseModel):
    code: str
    type_name: str


class AlertTypeCreate(AlertTypeBase):
    pass


class AlertTypeUpdate(BaseModel):
    type_name: Optional[str] = None


class AlertTypeRead(AlertTypeBase):
    class Config:
        from_attributes = True
