from __future__ import annotations
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class UserFavoriteTeamsBase(BaseModel):
    user_id: UUID
    team_id: UUID

class UserFavoriteTeamsCreate(UserFavoriteTeamsBase):
    pass

class UserFavoriteTeamsRead(UserFavoriteTeamsBase):
    created_at: datetime

    class Config:
        from_attributes = True
