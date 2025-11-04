from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    clerk_id: Optional[str] = None
    username: str
    email: str
    profile_picture_url: Optional[str] = None
    is_verified: bool = False

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    profile_picture_url: Optional[str] = None
    is_verified: Optional[bool] = None

class UserRead(UserBase):
    user_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
