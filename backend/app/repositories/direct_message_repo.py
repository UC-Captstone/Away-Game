from collections.abc import Sequence
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import and_, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from models.direct_message import DirectMessage
from models.friendship import Friendship


async def _assert_friends(sender_id: UUID, receiver_id: UUID, db: AsyncSession) -> None:
    """Raise 403 if the two users are not friends."""
    uid1 = min(sender_id, receiver_id)
    uid2 = max(sender_id, receiver_id)
    res = await db.execute(
        select(Friendship).where(
            Friendship.user_id_1 == uid1,
            Friendship.user_id_2 == uid2,
        )
    )
    if res.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only message users who are your friends",
        )


async def send_direct_message(
    sender_id: UUID,
    receiver_id: UUID,
    message_text: str,
    db: AsyncSession,
) -> DirectMessage:
    if sender_id == receiver_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot send a message to yourself",
        )

    await _assert_friends(sender_id, receiver_id, db)

    msg = DirectMessage(
        sender_id=sender_id,
        receiver_id=receiver_id,
        message_text=message_text,
    )
    db.add(msg)
    await db.commit()
    await db.refresh(msg, ["sender", "receiver"])
    return msg


async def get_conversation(
    current_user_id: UUID,
    other_user_id: UUID,
    limit: int,
    db: AsyncSession,
) -> Sequence[DirectMessage]:
    """Return up to `limit` most-recent messages between the two users, oldest-first."""
    await _assert_friends(current_user_id, other_user_id, db)

    res = await db.execute(
        select(DirectMessage)
        .where(
            or_(
                and_(
                    DirectMessage.sender_id == current_user_id,
                    DirectMessage.receiver_id == other_user_id,
                ),
                and_(
                    DirectMessage.sender_id == other_user_id,
                    DirectMessage.receiver_id == current_user_id,
                ),
            )
        )
        .options(selectinload(DirectMessage.sender))
        .order_by(DirectMessage.created_at.desc())
        .limit(limit)
    )
    rows = list(res.scalars().all())
    rows.reverse()  # Return chronological order (oldest first)
    return rows


async def update_direct_message(
    message_id: UUID,
    new_text: str,
    current_user_id: UUID,
    db: AsyncSession,
) -> DirectMessage:
    res = await db.execute(
        select(DirectMessage)
        .where(DirectMessage.message_id == message_id)
        .options(selectinload(DirectMessage.sender))
    )
    msg = res.scalar_one_or_none()
    if msg is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    if msg.sender_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only edit your own messages",
        )
    if msg.is_deleted:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Cannot edit a deleted message",
        )

    msg.message_text = new_text
    await db.commit()
    await db.refresh(msg, ["sender"])
    return msg


async def delete_direct_message(
    message_id: UUID,
    current_user_id: UUID,
    db: AsyncSession,
) -> None:
    res = await db.execute(
        select(DirectMessage).where(DirectMessage.message_id == message_id)
    )
    msg = res.scalar_one_or_none()
    if msg is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    if msg.sender_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own messages",
        )

    # Soft-delete so the conversation history shows "[message deleted]" placeholders
    msg.is_deleted = True
    msg.message_text = ""
    await db.commit()
