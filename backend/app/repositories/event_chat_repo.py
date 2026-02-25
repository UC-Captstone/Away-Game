from collections.abc import Sequence
from datetime import datetime
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from models.event_chat import EventChat


async def list_for_event_service(
    event_id: UUID,
    limit: int,
    db: AsyncSession,
    since: datetime | None = None,
) -> Sequence[EventChat]:
    """
    Fetch messages for an event.

    When `since` is None  — initial load
      Returns the `limit` most-recent messages ordered oldest-first so the
      frontend can render them top-to-bottom without reversing.

    When `since` is set  — poll for new messages
      Returns only messages whose timestamp is *strictly after* `since`,
      ordered oldest-first so the frontend can append them in order.
      Typically returns an empty list when the client is up-to-date.
    """
    q = (
        select(EventChat)
        .where(EventChat.event_id == event_id)
        .options(selectinload(EventChat.user))
    )

    if since is not None:
        # Poll mode: only messages newer than the cursor the client already has.
        q = q.where(EventChat.timestamp > since)
        q = q.order_by(EventChat.timestamp.asc()).limit(limit)
    else:
        # Initial load: grab the N most-recent rows then reverse in Python so
        # the response is chronological (oldest first) ready for rendering.
        q = q.order_by(EventChat.timestamp.desc()).limit(limit)

    res = await db.execute(q)
    rows = list(res.scalars().all())

    if since is None:
        # Reverse so oldest message is index 0 (chronological order for display).
        rows.reverse()

    return rows


async def add_new_chat_service(chat: EventChat, db: AsyncSession) -> EventChat:
    db.add(chat)
    await db.commit()
    # Refresh only the user relationship — avoids reloading the whole object.
    await db.refresh(chat, ["user"])
    return chat


async def remove_chat_service(
    message_id: UUID,
    requesting_user_id: UUID,
    db: AsyncSession,
) -> None:
    """
    Delete a message.  Raises 404 if the message doesn’t exist and 403 if
    the requesting user is not the author.
    """
    res = await db.execute(
        select(EventChat).where(EventChat.message_id == message_id)
    )
    msg = res.scalar_one_or_none()
    if msg is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message {message_id} not found",
        )
    if msg.user_id != requesting_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own messages",
        )
    await db.execute(delete(EventChat).where(EventChat.message_id == message_id))
    await db.commit()


async def get_chat_by_id_service(message_id: UUID, db: AsyncSession) -> EventChat | None:
    res = await db.execute(
        select(EventChat)
        .where(EventChat.message_id == message_id)
        .options(selectinload(EventChat.user))
    )
    return res.scalar_one_or_none()
