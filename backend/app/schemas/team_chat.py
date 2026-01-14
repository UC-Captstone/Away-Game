from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class TeamChatBase(BaseModel):
    team_id: int
    user_id: UUID
    message_text: str


class TeamChatCreate(TeamChatBase):
    pass


class TeamChatUpdate(BaseModel):
    message_text: str


class TeamChatRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    
    chat_id: UUID
    team_id: int
    team_logo_url: Optional[str] = None
    user_id: UUID
    user_name: str
    user_avatar_url: Optional[str] = None
    message_content: str
    timestamp: datetime
