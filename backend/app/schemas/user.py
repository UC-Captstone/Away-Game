from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional, List
from schemas.event import EventRead
from schemas.team import TeamRead
from schemas.team_chat import TeamChatRead
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class UserBase(BaseModel):
    username: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture_url: Optional[str] = None
    is_verified: bool = False
    pending_verification: bool = False


class UserCreate(BaseModel):
    username: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture_url: Optional[str] = None


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture_url: Optional[str] = None
    is_verified: Optional[bool] = None
    pending_verification: Optional[bool] = None


class UserRead(UserBase):
    user_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class HeaderInfo(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    profile_picture_url: Optional[str] = None
    username: str
    display_name: str  # Combined first_name + last_name
    is_verified: bool
    favorite_teams: List[TeamRead] = []


class AccountSettings(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    first_name: str
    last_name: str
    email: str
    applied_for_verification: bool
    enable_nearby_event_notifications: bool = False
    enable_favorite_team_notifications: bool = False
    enable_safety_alert_notifications: bool = False


class UserProfile(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    header_info: HeaderInfo
    account_settings: AccountSettings
    saved_events: List[EventRead] = []
    my_events: List[EventRead] = []
    my_chats: List[TeamChatRead] = []
