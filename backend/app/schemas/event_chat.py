from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, computed_field, model_validator
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
    user_name: Optional[str] = None
    user_avatar_url: Optional[str] = None
    
    @model_validator(mode='before')
    @classmethod
    def extract_user_info(cls, data):
        """Extract user information from the relationship if present."""
        if isinstance(data, dict):
            return data
        
        # If it's an ORM object, extract user info from relationship
        if hasattr(data, 'user') and data.user:
            # Create a dict with the data
            result = {
                'message_id': data.message_id,
                'event_id': data.event_id,
                'user_id': data.user_id,
                'message_text': data.message_text,
                'timestamp': data.timestamp,
                'user_name': data.user.username if data.user else None,
                'user_avatar_url': data.user.profile_picture_url if data.user else None,
            }
            return result
        
        return data

class EventChatDelete(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    message_id: UUID

class EventChatPaginatedResponse(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    messages: List[EventChatRead]
    has_more: bool
    oldest_timestamp: Optional[datetime]

class TypingStatusResponse(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    typing_users: List[str]