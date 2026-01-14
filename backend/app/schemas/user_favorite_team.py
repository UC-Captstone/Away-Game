from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class UserFavoriteTeamsBase(BaseModel):
    user_id: UUID
    team_id: int


class UserFavoriteTeamsCreate(UserFavoriteTeamsBase):
    pass


class UserFavoriteTeamsRead(UserFavoriteTeamsBase):
    created_at: datetime

    class Config:
        from_attributes = True


class FavoriteTeamsUpdate(BaseModel):
    """Request payload to bulk update a user's favorite teams.
    Accepts camelCase (teamIds) from frontend while keeping snake_case internally.
    """
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    team_ids: List[int]
