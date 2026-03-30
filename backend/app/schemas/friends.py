from __future__ import annotations
from uuid import UUID
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, ConfigDict, field_serializer
from pydantic.alias_generators import to_camel


class FriendRequestCreate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    receiver_id: UUID


class FriendRequestRead(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    request_id: UUID
    sender_id: UUID
    receiver_id: UUID
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    # Resolved from eager-loaded relationships
    sender_username: Optional[str] = None
    sender_avatar_url: Optional[str] = None
    receiver_username: Optional[str] = None
    receiver_avatar_url: Optional[str] = None

    @field_serializer("created_at", "updated_at")
    def _serialize_dt(self, v: datetime | None) -> str | None:
        if v is None:
            return None
        if v.tzinfo is None:
            v = v.replace(tzinfo=timezone.utc)
        return v.isoformat()

    @classmethod
    def from_orm_with_users(cls, obj) -> "FriendRequestRead":
        return cls(
            request_id=obj.request_id,
            sender_id=obj.sender_id,
            receiver_id=obj.receiver_id,
            status=obj.status,
            created_at=obj.created_at,
            updated_at=obj.updated_at,
            sender_username=obj.sender.username if obj.sender else None,
            sender_avatar_url=obj.sender.profile_picture_url if obj.sender else None,
            receiver_username=obj.receiver.username if obj.receiver else None,
            receiver_avatar_url=obj.receiver.profile_picture_url if obj.receiver else None,
        )


class UserSearchResult(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    user_id: UUID
    username: str
    avatar_url: Optional[str] = None


class FriendshipRead(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    friendship_id: UUID
    friend_user_id: UUID
    friend_username: str
    friend_avatar_url: Optional[str] = None
    created_at: datetime

    @field_serializer("created_at")
    def _serialize_dt(self, v: datetime) -> str:
        if v.tzinfo is None:
            v = v.replace(tzinfo=timezone.utc)
        return v.isoformat()
