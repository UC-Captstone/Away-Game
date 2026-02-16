from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, computed_field
from pydantic.alias_generators import to_camel

class EventChatBase(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    event_id: UUID
    user_id: UUID
    message_text: str

class EventChatCreate(EventChatBase):
    pass

class EventChatUpdate(BaseModel):
    message_text: str

class EventChatRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
    
    message_id: UUID
    event_id: UUID
    user_id: UUID
    message_text: str
    timestamp: datetime
    
    # Computed fields from user relationship
    @computed_field
    @property
    def user_name(self) -> Optional[str]:
        if hasattr(self, 'user') and self.user:
            return self.user.username
        return None
    
    @computed_field
    @property
    def user_avatar_url(self) -> Optional[str]:
        if hasattr(self, 'user') and self.user:
            return self.user.profile_picture_url
        return None

class EventChatDelete(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    message_id: UUID