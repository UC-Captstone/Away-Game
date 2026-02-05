
from collections.abc import Sequence
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete, select
from sqlalchemy.orm import selectinload

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

async def remove_chat_service(message_id: UUID, db: AsyncSession) -> int:
    res = await db.execute(delete(EventChat).where(EventChat.message_id == message_id))
    await db.commit()
    return res.rowcount or 0

async def get_chat_by_id_service(message_id: UUID, db: AsyncSession) -> EventChat | None:
    res = await db.execute(
        select(EventChat)
        .where(EventChat.message_id == message_id)
        .options(selectinload(EventChat.user))
    )
    return res.scalar_one_or_none()