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
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from auth import get_current_user
from core.content_filter import clean_message
from db.session import get_session
from models.event import Event
from models.event_chat import EventChat
from models.game import Game
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
    resolved_event_id = chat_data.event_id

    # If a game_id was supplied, use find-or-create to ensure a real events row
    # exists. This handles the case where the client has a synthetic UUID
    # (uuid5 of game_id) that was never inserted into the events table.
    if chat_data.game_id is not None:
        find_stmt = (
            select(Event)
            .where(Event.game_id == chat_data.game_id, Event.event_type_id == "GAME")
            .limit(1)
        )
        result = await db.execute(find_stmt)
        existing = result.scalar_one_or_none()

        if existing is not None:
            resolved_event_id = existing.event_id
        else:
            # Fetch the game to build the stub event.
            game_result = await db.execute(
                select(Game)
                .where(Game.game_id == chat_data.game_id)
                .options(
                    joinedload(Game.home_team),
                    joinedload(Game.away_team),
                    joinedload(Game.venue),
                )
            )
            game = game_result.unique().scalar_one_or_none()
            if game is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Game {chat_data.game_id} not found",
                )

            home_name = (
                (game.home_team.display_name or game.home_team.team_name)
                if game.home_team else "Home"
            )
            away_name = (
                (game.away_team.display_name or game.away_team.team_name)
                if game.away_team else "Away"
            )

            # Ensure the GAME event-type row exists (idempotent upsert).
            await db.execute(
                text(
                    "INSERT INTO event_types (code, type_name) "
                    "VALUES ('GAME', 'Game Channel') "
                    "ON CONFLICT (code) DO NOTHING"
                )
            )
            new_event = Event(
                creator_user_id=current_user.user_id,
                event_type_id="GAME",
                game_id=chat_data.game_id,
                venue_id=game.venue_id,
                title=f"{away_name} @ {home_name}",
                game_date=game.date_time.replace(tzinfo=None) if game.date_time else None,
                latitude=game.venue.latitude if game.venue else None,
                longitude=game.venue.longitude if game.venue else None,
            )
            db.add(new_event)
            try:
                await db.flush()
                resolved_event_id = new_event.event_id
            except Exception:
                await db.rollback()
                # Race — another request created it first; re-fetch.
                result = await db.execute(find_stmt)
                existing = result.scalar_one_or_none()
                if existing is None:
                    raise
                resolved_event_id = existing.event_id

    chat = EventChat(
        event_id=resolved_event_id,
        user_id=current_user.user_id,
        message_text=clean_message(chat_data.message_text),
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
