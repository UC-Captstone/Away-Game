from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class FavoriteBase(BaseModel):
    user_id: UUID
    event_id: Optional[UUID] = None
    game_id: Optional[UUID] = None

class FavoriteCreate(FavoriteBase):
    pass

class FavoriteRead(FavoriteBase):
    favorite_id: UUID
    date_time: datetime

    class Config:
        from_attributes = True
