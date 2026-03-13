from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user
from core.content_filter import clean_message
from db.session import get_session
from models.user import User
from repositories.direct_message_repo import (
    delete_direct_message,
    get_conversation,
    send_direct_message,
    update_direct_message,
)
from schemas.direct_message import DirectMessageCreate, DirectMessageRead, DirectMessageUpdate

router = APIRouter(prefix="/direct-messages", tags=["direct-messages"])


@router.post("", response_model=DirectMessageRead, status_code=status.HTTP_201_CREATED)
async def send_message(
    body: DirectMessageCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> DirectMessageRead:
    cleaned = clean_message(body.message_text)
    msg = await send_direct_message(
        sender_id=current_user.user_id,
        receiver_id=body.receiver_id,
        message_text=cleaned,
        db=db,
    )
    return DirectMessageRead.from_orm_with_sender(msg)


@router.get("/{other_user_id}", response_model=List[DirectMessageRead])
async def get_messages(
    other_user_id: UUID,
    limit: int = Query(default=50, ge=1, le=200),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> List[DirectMessageRead]:
    messages = await get_conversation(
        current_user_id=current_user.user_id,
        other_user_id=other_user_id,
        limit=limit,
        db=db,
    )
    return [DirectMessageRead.from_orm_with_sender(m) for m in messages]


@router.patch("/{message_id}", response_model=DirectMessageRead)
async def update_message(
    message_id: UUID,
    body: DirectMessageUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> DirectMessageRead:
    cleaned = clean_message(body.message_text)
    msg = await update_direct_message(
        message_id=message_id,
        new_text=cleaned,
        current_user_id=current_user.user_id,
        db=db,
    )
    return DirectMessageRead.from_orm_with_sender(msg)


@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message(
    message_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> None:
    await delete_direct_message(
        message_id=message_id,
        current_user_id=current_user.user_id,
        db=db,
    )
