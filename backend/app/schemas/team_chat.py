from __future__ import annotations
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class TeamChatBase(BaseModel):
    team_id: int
    user_id: UUID
    message_text: str


class TeamChatCreate(TeamChatBase):
    pass


class TeamChatUpdate(BaseModel):
    message_text: str


class TeamChatRead(TeamChatBase):
    message_id: UUID
    timestamp: datetime

    class Config:
        from_attributes = True
