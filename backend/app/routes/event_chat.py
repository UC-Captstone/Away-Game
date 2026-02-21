from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional, Dict, Set
from uuid import UUID
from datetime import datetime

from db.session import get_session
from schemas.event_chat import EventChatRead, EventChatCreate, EventChatPaginatedResponse, TypingStatusResponse
from models.event_chat import EventChat
from controllers.event_chat import (
    list_for_event_service,
    add_new_chat_service,
    remove_chat_service,
    get_chat_by_id_service,
    list_messages_since_service,
    get_messages_paginated
)

router = APIRouter(prefix="/event-chats", tags=["event-chats"])

# Store active typers per event (in-memory, consider Redis for production)
typing_users: Dict[str, Set[str]] = {}

@router.get("/event/{event_id}", response_model=List[EventChatRead])
async def list_event_chats(
    event_id: UUID,
    since_timestamp: Optional[datetime] = Query(None, description="Only return messages after this timestamp"),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session),
):
    if since_timestamp:
        return await list_messages_since_service(
            event_id=event_id,
            since=since_timestamp,
            limit=limit,
            db=db
        )
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

@router.post("/event/{event_id}/typing", response_model=TypingStatusResponse)
async def set_typing_status(
    event_id: UUID,
    user_id: UUID,
    is_typing: bool = True,
):
    """Update typing status for a user in an event."""
    event_key = str(event_id)
    user_key = str(user_id)
    
    if event_key not in typing_users:
        typing_users[event_key] = set()
    
    if is_typing:
        typing_users[event_key].add(user_key)
    else:
        typing_users[event_key].discard(user_key)
    
    return {"typing_users": list(typing_users[event_key])}

@router.get("/event/{event_id}/typing", response_model=TypingStatusResponse)
async def get_typing_users(event_id: UUID):
    """Get list of currently typing users."""
    event_key = str(event_id)
    return {"typing_users": list(typing_users.get(event_key, set()))}

@router.get("/event/{event_id}/paginated", response_model=EventChatPaginatedResponse)
async def list_event_chats_paginated(
    event_id: UUID,
    before_timestamp: Optional[datetime] = Query(None, description="Load messages before this time"),
    limit: int = Query(default=50, ge=1, le=100),
    db: AsyncSession = Depends(get_session),
):
    """Get paginated messages for infinite scroll."""
    messages = await get_messages_paginated(
        event_id=event_id,
        before=before_timestamp,
        limit=limit,
        db=db
    )
    
    has_more = len(messages) == limit
    
    return EventChatPaginatedResponse(
        messages=messages,
        has_more=has_more,
        oldest_timestamp=messages[-1].timestamp if messages else None
    )
