from __future__ import annotations
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    clerk_id: Optional[str] = None
    profile_picture_url: Optional[str] = None


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    profile_picture_url: Optional[str] = None
    is_verified: Optional[bool] = None


class UserRead(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr
    profile_picture_url: Optional[str] = None
    is_verified: bool

    class Config:
        from_attributes = True
