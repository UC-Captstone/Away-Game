from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user
from db.session import get_session
from models.user import User
from repositories.friends_repo import (
    accept_friend_request,
    get_received_requests,
    get_sent_requests,
    list_friends,
    reject_friend_request,
    remove_friend,
    send_friend_request,
)
from schemas.friends import FriendRequestCreate, FriendRequestRead, FriendshipRead

router = APIRouter(prefix="/friends", tags=["friends"])


# ---------------------------------------------------------------------------
# Friend requests
# ---------------------------------------------------------------------------

@router.post(
    "/requests",
    response_model=FriendRequestRead,
    status_code=status.HTTP_201_CREATED,
)
async def send_request(
    body: FriendRequestCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> FriendRequestRead:
    req = await send_friend_request(
        sender_id=current_user.user_id,
        receiver_id=body.receiver_id,
        db=db,
    )
    return FriendRequestRead.from_orm_with_users(req)


@router.get("/requests/received", response_model=List[FriendRequestRead])
async def list_received_requests(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> List[FriendRequestRead]:
    requests = await get_received_requests(user_id=current_user.user_id, db=db)
    return [FriendRequestRead.from_orm_with_users(r) for r in requests]


@router.get("/requests/sent", response_model=List[FriendRequestRead])
async def list_sent_requests(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> List[FriendRequestRead]:
    requests = await get_sent_requests(user_id=current_user.user_id, db=db)
    return [FriendRequestRead.from_orm_with_users(r) for r in requests]


@router.patch("/requests/{request_id}/accept", response_model=FriendRequestRead)
async def accept_request(
    request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> FriendRequestRead:
    req = await accept_friend_request(
        request_id=request_id,
        current_user_id=current_user.user_id,
        db=db,
    )
    return FriendRequestRead.from_orm_with_users(req)


@router.patch("/requests/{request_id}/reject", response_model=FriendRequestRead)
async def reject_request(
    request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> FriendRequestRead:
    req = await reject_friend_request(
        request_id=request_id,
        current_user_id=current_user.user_id,
        db=db,
    )
    return FriendRequestRead.from_orm_with_users(req)


# ---------------------------------------------------------------------------
# Friendships
# ---------------------------------------------------------------------------

@router.get("", response_model=List[FriendshipRead])
async def get_friends(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> List[FriendshipRead]:
    friends = await list_friends(user_id=current_user.user_id, db=db)
    return [FriendshipRead(**f) for f in friends]


@router.delete("/{friend_user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_friend(
    friend_user_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> None:
    await remove_friend(
        current_user_id=current_user.user_id,
        friend_user_id=friend_user_id,
        db=db,
    )
