from collections.abc import Sequence
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import and_, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from models.friend_request import FriendRequest
from models.friendship import Friendship
from models.user import User


# ---------------------------------------------------------------------------
# User Search
# ---------------------------------------------------------------------------

async def search_users_by_username(
    query: str,
    current_user_id: UUID,
    db: AsyncSession,
    limit: int = 10,
) -> Sequence[User]:
    """Search for users by username prefix/substring, excluding the current user."""
    result = await db.execute(
        select(User)
        .where(
            User.username.ilike(f"%{query}%"),
            User.user_id != current_user_id,
        )
        .order_by(User.username)
        .limit(limit)
    )
    return result.scalars().all()


# ---------------------------------------------------------------------------
# Friend Requests
# ---------------------------------------------------------------------------

async def send_friend_request(
    sender_id: UUID,
    receiver_id: UUID,
    db: AsyncSession,
) -> FriendRequest:
    if sender_id == receiver_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot send a friend request to yourself",
        )

    # Make sure receiver exists
    res = await db.execute(select(User).where(User.user_id == receiver_id))
    if res.scalar_one_or_none() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Check that they are not already friends
    uid1, uid2 = (min(sender_id, receiver_id), max(sender_id, receiver_id))
    existing_friendship = await db.execute(
        select(Friendship).where(
            Friendship.user_id_1 == uid1,
            Friendship.user_id_2 == uid2,
        )
    )
    if existing_friendship.scalar_one_or_none() is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You are already friends with this user",
        )

    # Check for an existing request from sender to receiver (any status)
    existing_req_result = await db.execute(
        select(FriendRequest).where(
            or_(
                and_(
                    FriendRequest.sender_id == sender_id,
                    FriendRequest.receiver_id == receiver_id,
                ),
                and_(
                    FriendRequest.sender_id == receiver_id,
                    FriendRequest.receiver_id == sender_id,
                ),
            ),
        )
    )
    existing_req = existing_req_result.scalar_one_or_none()
    if existing_req is not None:
        if existing_req.status == "pending":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A pending friend request already exists between these users",
            )
        # A rejected request exists — reuse the row by updating it back to pending
        existing_req.status = "pending"
        existing_req.sender_id = sender_id
        existing_req.receiver_id = receiver_id
        await db.commit()
        await db.refresh(existing_req, ["sender", "receiver"])
        return existing_req

    req = FriendRequest(sender_id=sender_id, receiver_id=receiver_id, status="pending")
    db.add(req)
    await db.commit()
    await db.refresh(req, ["sender", "receiver"])
    return req


async def get_received_requests(
    user_id: UUID,
    db: AsyncSession,
) -> Sequence[FriendRequest]:
    res = await db.execute(
        select(FriendRequest)
        .where(FriendRequest.receiver_id == user_id, FriendRequest.status == "pending")
        .options(selectinload(FriendRequest.sender), selectinload(FriendRequest.receiver))
        .order_by(FriendRequest.created_at.desc())
    )
    return res.scalars().all()


async def get_sent_requests(
    user_id: UUID,
    db: AsyncSession,
) -> Sequence[FriendRequest]:
    res = await db.execute(
        select(FriendRequest)
        .where(FriendRequest.sender_id == user_id, FriendRequest.status == "pending")
        .options(selectinload(FriendRequest.sender), selectinload(FriendRequest.receiver))
        .order_by(FriendRequest.created_at.desc())
    )
    return res.scalars().all()


async def _get_request_or_404(request_id: UUID, db: AsyncSession) -> FriendRequest:
    res = await db.execute(
        select(FriendRequest)
        .where(FriendRequest.request_id == request_id)
        .options(selectinload(FriendRequest.sender), selectinload(FriendRequest.receiver))
    )
    req = res.scalar_one_or_none()
    if req is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Friend request not found")
    return req


async def accept_friend_request(
    request_id: UUID,
    current_user_id: UUID,
    db: AsyncSession,
) -> FriendRequest:
    req = await _get_request_or_404(request_id, db)

    if req.receiver_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the receiver can accept a friend request",
        )
    if req.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Friend request is already {req.status}",
        )

    req.status = "accepted"

    uid1 = min(req.sender_id, req.receiver_id)
    uid2 = max(req.sender_id, req.receiver_id)
    friendship = Friendship(user_id_1=uid1, user_id_2=uid2)
    db.add(friendship)

    await db.commit()
    await db.refresh(req, ["sender", "receiver"])
    return req


async def reject_friend_request(
    request_id: UUID,
    current_user_id: UUID,
    db: AsyncSession,
) -> FriendRequest:
    req = await _get_request_or_404(request_id, db)

    if req.receiver_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the receiver can reject a friend request",
        )
    if req.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Friend request is already {req.status}",
        )

    req.status = "rejected"
    await db.commit()
    await db.refresh(req, ["sender", "receiver"])
    return req


# ---------------------------------------------------------------------------
# Friendships
# ---------------------------------------------------------------------------

async def list_friends(user_id: UUID, db: AsyncSession) -> list[dict]:
    """Return a list of dicts with friend info for the given user."""
    res = await db.execute(
        select(Friendship)
        .where(or_(Friendship.user_id_1 == user_id, Friendship.user_id_2 == user_id))
        .options(selectinload(Friendship.user1), selectinload(Friendship.user2))
        .order_by(Friendship.created_at.desc())
    )
    friendships = res.scalars().all()

    result = []
    for f in friendships:
        friend_user = f.user2 if f.user_id_1 == user_id else f.user1
        result.append(
            {
                "friendship_id": f.friendship_id,
                "friend_user_id": friend_user.user_id,
                "friend_username": friend_user.username,
                "friend_avatar_url": friend_user.profile_picture_url,
                "created_at": f.created_at,
            }
        )
    return result


async def remove_friend(
    current_user_id: UUID,
    friend_user_id: UUID,
    db: AsyncSession,
) -> None:
    uid1 = min(current_user_id, friend_user_id)
    uid2 = max(current_user_id, friend_user_id)

    res = await db.execute(
        select(Friendship).where(
            Friendship.user_id_1 == uid1,
            Friendship.user_id_2 == uid2,
        )
    )
    friendship = res.scalar_one_or_none()
    if friendship is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Friendship not found",
        )

    await db.delete(friendship)
    await db.commit()
