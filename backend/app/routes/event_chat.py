from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID

from db.session import get_session
from schemas.event_chat import EventChatRead, EventChatCreate
from models.event_chat import EventChat
from controllers.event_chat import (
    list_for_event_service,
    add_new_chat_service,
    remove_chat_service,
    get_chat_by_id_service
)

router = APIRouter(prefix="/event-chats", tags=["event-chats"])

@router.get("/event/{event_id}", response_model=List[EventChatRead])
async def list_event_chats(
    event_id: UUID,
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session),
):
    return await list_for_event_service(event_id=event_id, limit=limit, offset=offset, db=db)

@router.post("/", response_model=EventChatRead, status_code=status.HTTP_201_CREATED)
async def add_event_chat(
    chat_data: EventChatCreate,
    db: AsyncSession = Depends(get_session),
):
    chat = EventChat(**chat_data.model_dump())
    return await add_new_chat_service(chat=chat, db=db)

@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event_chat(
    message_id: UUID,
    db: AsyncSession = Depends(get_session),
):
    await remove_chat_service(message_id=message_id, db=db)
    return None

@router.get("/{message_id}", response_model=Optional[EventChatRead])
async def get_event_chat(
    message_id: UUID,
    db: AsyncSession = Depends(get_session),
):
    return await get_chat_by_id_service(message_id=message_id, db=db)
