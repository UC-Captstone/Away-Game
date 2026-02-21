
from collections.abc import Sequence
from uuid import UUID
from datetime import datetime
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete, select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status

from models.event_chat import EventChat

async def list_for_event_service(event_id: UUID, limit: int, offset: int, db: AsyncSession) -> Sequence[EventChat]:
    res = await db.execute(
        select(EventChat)
        .where(EventChat.event_id == event_id)
        .options(selectinload(EventChat.user))
        .order_by(EventChat.timestamp.desc())
        .limit(limit)
        .offset(offset)
    )
    return res.scalars().all()

async def add_new_chat_service(chat: EventChat, db: AsyncSession) -> EventChat:
    db.add(chat)
    await db.commit()
    await db.refresh(chat, ["user"])
    return chat

async def remove_chat_service(message_id: UUID, db: AsyncSession) -> None:
    res = await db.execute(delete(EventChat).where(EventChat.message_id == message_id))
    await db.commit()
    if res.rowcount == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message with id {message_id} not found"
        )
    return None

async def get_chat_by_id_service(message_id: UUID, db: AsyncSession) -> EventChat | None:
    res = await db.execute(
        select(EventChat)
        .where(EventChat.message_id == message_id)
        .options(selectinload(EventChat.user))
    )
    return res.scalar_one_or_none()

async def list_messages_since_service(
    event_id: UUID,
    since: datetime,
    limit: int,
    db: AsyncSession
) -> Sequence[EventChat]:
    """Get messages for an event created after a specific timestamp."""
    # Convert timezone-aware datetime to naive (database stores naive datetimes)
    if since.tzinfo is not None:
        since = since.replace(tzinfo=None)
    
    res = await db.execute(
        select(EventChat)
        .where(EventChat.event_id == event_id)
        .where(EventChat.timestamp > since)
        .options(selectinload(EventChat.user))
        .order_by(EventChat.timestamp.asc())
        .limit(limit)
    )
    return res.scalars().all()

async def get_messages_paginated(
    event_id: UUID,
    before: Optional[datetime],
    limit: int,
    db: AsyncSession
) -> Sequence[EventChat]:
    """Get messages before a timestamp (for loading older messages)."""
    query = (
        select(EventChat)
        .where(EventChat.event_id == event_id)
        .options(selectinload(EventChat.user))
    )
    
    if before:
        # Convert timezone-aware datetime to naive (database stores naive datetimes)
        if before.tzinfo is not None:
            before = before.replace(tzinfo=None)
        query = query.where(EventChat.timestamp < before)
    
    query = query.order_by(EventChat.timestamp.desc()).limit(limit)
    
    res = await db.execute(query)
    messages = list(res.scalars().all())
    messages.reverse()  # Return in ascending order
    return messages