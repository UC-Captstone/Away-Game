from __future__ import annotations
from uuid import UUID
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, field_serializer
from pydantic.alias_generators import to_camel


class DirectMessageCreate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    receiver_id: UUID
    message_text: str = Field(..., min_length=1, max_length=2000)


class DirectMessageUpdate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    message_text: str = Field(..., min_length=1, max_length=2000)


class DirectMessageRead(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    message_id: UUID
    sender_id: UUID
    receiver_id: UUID
    message_text: str
    is_deleted: bool
    is_read: bool = False
    created_at: datetime
    updated_at: Optional[datetime] = None

    sender_username: Optional[str] = None
    sender_avatar_url: Optional[str] = None

    @field_serializer("created_at", "updated_at")
    def _serialize_dt(self, v: datetime | None) -> str | None:
        if v is None:
            return None
        if v.tzinfo is None:
            v = v.replace(tzinfo=timezone.utc)
        return v.isoformat()

    @classmethod
    def from_orm_with_sender(cls, obj) -> "DirectMessageRead":
        return cls(
            message_id=obj.message_id,
            sender_id=obj.sender_id,
            receiver_id=obj.receiver_id,
            message_text=obj.message_text,
            is_deleted=obj.is_deleted,
            is_read=getattr(obj, "is_read", False),
            created_at=obj.created_at,
            updated_at=obj.updated_at,
            sender_username=obj.sender.username if obj.sender else None,
            sender_avatar_url=obj.sender.profile_picture_url if obj.sender else None,
        )
