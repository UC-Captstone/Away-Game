from __future__ import annotations
from uuid import UUID
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field, model_validator
from pydantic.alias_generators import to_camel


class EventChatCreate(BaseModel):
    """
    Used when a client posts a new message.
    user_id is intentionally absent — it is injected server-side from the
    authenticated JWT so callers cannot spoof another user's identity.
    """
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    event_id: UUID
    message_text: str = Field(..., min_length=1, max_length=1000)


class EventChatUpdate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    message_text: str = Field(..., min_length=1, max_length=1000)


class EventChatRead(BaseModel):
    """
    Serialised chat message sent back to the client.
    user_name / user_avatar_url are resolved from the eagerly-loaded
    SQLAlchemy `user` relationship via the model_validator below so they
    always reflect the current display name and avatar without an extra
    round-trip.
    """
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

    message_id: UUID
    event_id: UUID
    user_id: UUID
    message_text: str
    timestamp: datetime
    user_name: Optional[str] = None
    user_avatar_url: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def _extract_user_fields(cls, v: object) -> object:
        """
        When Pydantic receives a SQLAlchemy ORM object (from_attributes=True)
        the `user` relationship is already loaded by the repo queries, but
        it is not a declared Pydantic field so Pydantic ignores it.  Pull the
        display values out here before field validation runs.
        """
        if not isinstance(v, dict) and hasattr(v, "user"):
            user = v.user  # already eagerly loaded via selectinload
            return {
                "message_id": v.message_id,
                "event_id": v.event_id,
                "user_id": v.user_id,
                "message_text": v.message_text,
                "timestamp": v.timestamp,
                "user_name": user.username if user else None,
                "user_avatar_url": user.profile_picture_url if user else None,
            }
        return v


class EventChatPage(BaseModel):
    """
    Paginated / polled response envelope for event chat messages.

    Polling pattern
    ---------------
    1. Initial load  — GET /event-chats/event/{id}?limit=50
       Returns the most-recent 50 messages (newest last) and a `nextCursor`
       equal to the ISO-8601 timestamp of the latest message.

    2. Subsequent polls — GET /event-chats/event/{id}?since={nextCursor}&limit=50
       Returns only messages that arrived *after* the cursor.  When the list
       is empty the client is fully up-to-date; keep the same cursor for the
       next poll.  When messages are returned, update the cursor to
       `nextCursor` from the new response.

    Recommended polling interval: 3–5 seconds while the user has the event
    page open; pause polling when the tab is hidden
    (document.visibilityState === 'hidden') to reduce cold-start pressure on
    the function app.
    """
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    messages: List[EventChatRead]
    # ISO-8601 timestamp string of the most-recent message in this response.
    # Pass this back as `?since=` on the next poll to receive only new messages.
    next_cursor: Optional[str] = None