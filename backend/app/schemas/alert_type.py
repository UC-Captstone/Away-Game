from __future__ import annotations
from uuid import UUID
from typing import Optional
from pydantic import BaseModel


class AlertTypeBase(BaseModel):
    type_name: str
    code: Optional[str] = None


class AlertTypeCreate(AlertTypeBase):
    pass


class AlertTypeUpdate(BaseModel):
    type_name: Optional[str] = None
    code: Optional[str] = None


class AlertTypeRead(AlertTypeBase):
    alert_type_id: UUID

    class Config:
        from_attributes = True
