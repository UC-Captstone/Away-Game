from __future__ import annotations
from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, model_validator


class FavoriteCreate(BaseModel):
    """
    Create a favorite for either an in-app event or a game.
    """
    event_id: Optional[UUID] = None
    game_id: Optional[UUID] = None
    date_time: datetime

    @model_validator(mode="after")
    def _xor_target(self) -> "FavoriteCreate":
        if bool(self.event_id) == bool(self.game_id):
            raise ValueError("Provide exactly one of event_id or game_id")
        return self


class FavoriteUpdate(BaseModel):

    event_id: Optional[UUID] = None
    game_id: Optional[UUID] = None
    date_time: Optional[datetime] = None

    @model_validator(mode="after")
    def _xor_target(self) -> "FavoriteUpdate":
        # Cant update both I think? I dont know I've been drinking. Sorry.
        if self.event_id is not None and self.game_id is not None:
            raise ValueError("Provide only one of event_id or game_id")
        return self


class FavoriteRead(BaseModel):
    favorite_id: UUID
    event_id: Optional[UUID] = None
    game_id: Optional[UUID] = None
    date_time: datetime

    class Config:
        from_attributes = True
