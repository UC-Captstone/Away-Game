"""
Event-chat routes
=================

Polling design
--------------
This backend uses REST polling (not WebSockets) because Azure Functions do not
support persistent connections.  The client-side contract is:

1. **Initial load**
   GET /api/event-chats/event/{event_id}?limit=50
   └─ Returns `{ messages: [...], nextCursor: "<ISO-8601 timestamp>" }`
      Messages are ordered oldest-first (ready to render top-to-bottom).
      When `nextCursor` is null the event has no messages yet.

2. **Polling for new messages**
   GET /api/event-chats/event/{event_id}?since={nextCursor}&limit=50
   └─ Returns the same shape.  When `messages` is empty the client is
      already up-to-date; keep polling with the same cursor.
      When messages arrive, append them to the chat list and update the
      cursor to the `nextCursor` from the new response.

Recommended polling cadence
---------------------------
- Poll every **3–4 seconds** while the event page is visible.
- Pause polling when `document.visibilityState === 'hidden'` (tab in background)
  to avoid unnecessary cold-starts on the function app.
- The `since` filter is cheap (indexed column) so short poll intervals are fine.

Authentication
--------------
- Reading messages  : no auth required (public feed).
- Sending a message : Bearer JWT required  — user_id is taken from the token,
  NOT from the request body, so callers cannot spoof another user's identity.
- Deleting a message: Bearer JWT required  — only the message's author may
  delete it; attempting to delete another user's message returns 403.
"""

from datetime import datetime, timezone
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user
from db.session import get_session
from models.event_chat import EventChat
from models.user import User
from repositories.event_chat_repo import (
    add_new_chat_service,
    get_chat_by_id_service,
    list_for_event_service,
    remove_chat_service,
)
from schemas.event_chat import EventChatCreate, EventChatPage, EventChatRead

router = APIRouter(prefix="/event-chats", tags=["event-chats"])


# ---------------------------------------------------------------------------
# GET  /event/{event_id}   — initial load and polling
# ---------------------------------------------------------------------------
@router.get("/event/{event_id}", response_model=EventChatPage)
async def list_event_chats(
    event_id: UUID,
    limit: int = Query(default=50, ge=1, le=200),
    since: Optional[str] = Query(
        default=None,
        description=(
            "ISO-8601 timestamp cursor returned as `nextCursor` from a previous "
            "response.  When supplied only messages *after* this timestamp are "
            "returned (poll mode).  Omit for the initial page load."
        ),
    ),
    db: AsyncSession = Depends(get_session),
) -> EventChatPage:
    since_dt: datetime | None = None
    if since is not None:
        try:
            # Accept both Z-suffix and +00:00 offset forms.
            since_dt = datetime.fromisoformat(since.replace("Z", "+00:00"))
            # Normalise to naive UTC for comparison against DB values.
            if since_dt.tzinfo is not None:
                since_dt = since_dt.astimezone(timezone.utc).replace(tzinfo=None)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="`since` must be a valid ISO-8601 datetime string",
            )

    messages = await list_for_event_service(
        event_id=event_id, limit=limit, db=db, since=since_dt
    )

    # Build the cursor from the last (most-recent) message in the result.
    # The frontend passes this back verbatim as `?since=` on the next poll.
    next_cursor: str | None = None
    if messages:
        ts = messages[-1].timestamp
        # Always emit a UTC ISO string so the client has a consistent format.
        if ts.tzinfo is None:
            ts = ts.replace(tzinfo=timezone.utc)
        next_cursor = ts.isoformat()

    return EventChatPage(messages=list(messages), next_cursor=next_cursor)


# ---------------------------------------------------------------------------
# POST  /   — send a new message (auth required)
# ---------------------------------------------------------------------------
@router.post("/", response_model=EventChatRead, status_code=status.HTTP_201_CREATED)
async def add_event_chat(
    chat_data: EventChatCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> EventChatRead:
    chat = EventChat(
        event_id=chat_data.event_id,
        user_id=current_user.user_id,   # always from JWT — never trusted from body
        message_text=chat_data.message_text,
    )
    return await add_new_chat_service(chat=chat, db=db)


# ---------------------------------------------------------------------------
# DELETE  /{message_id}   — remove own message (auth required)
# ---------------------------------------------------------------------------
@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event_chat(
    message_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> None:
    await remove_chat_service(
        message_id=message_id,
        requesting_user_id=current_user.user_id,
        db=db,
    )


# ---------------------------------------------------------------------------
# GET  /{message_id}   — fetch a single message by id
# ---------------------------------------------------------------------------
@router.get("/{message_id}", response_model=Optional[EventChatRead])
async def get_event_chat(
    message_id: UUID,
    db: AsyncSession = Depends(get_session),
) -> EventChatRead | None:
    return await get_chat_by_id_service(message_id=message_id, db=db)
