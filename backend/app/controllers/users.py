from typing import Optional
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.repositories.user_repo import UserRepository


async def create_user_service(user_data, db: AsyncSession) -> User:
    repo = UserRepository(db)

    # check uniqueness
    if await repo.get_by_email(user_data.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already in use")
    if await repo.get_by_username(user_data.username):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already in use")

    user = User(
        username=user_data.username,
        email=user_data.email,
        first_name=getattr(user_data, "first_name", None),
        last_name=getattr(user_data, "last_name", None),
        profile_picture_url=getattr(user_data, "profile_picture_url", None),
        is_verified=getattr(user_data, "is_verified", False),
        pending_verification=getattr(user_data, "pending_verification", False),
    )

    await repo.add(user)
    await db.commit()
    await db.refresh(user)

    return user


async def list_users_service(limit: int, offset: int, db: AsyncSession):
    repo = UserRepository(db)
    return await repo.list(limit=limit, offset=offset)


async def get_user_service(user_id: UUID, db: AsyncSession) -> User:
    repo = UserRepository(db)
    user = await repo.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found")
    return user


async def get_user_by_username_service(username: str, db: AsyncSession) -> User:
    repo = UserRepository(db)
    user = await repo.get_by_username(username)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with username {username} not found")
    return user


async def get_user_by_email_service(email: str, db: AsyncSession) -> User:
    repo = UserRepository(db)
    user = await repo.get_by_email(email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with email {email} not found")
    return user


async def update_user_service(user_id: UUID, user_data, db: AsyncSession) -> User:
    repo = UserRepository(db)

    updated = await repo.update_fields(
        user_id,
        username=getattr(user_data, "username", None),
        first_name=getattr(user_data, "first_name", None),
        last_name=getattr(user_data, "last_name", None),
        email=getattr(user_data, "email", None),
        profile_picture_url=getattr(user_data, "profile_picture_url", None),
        is_verified=getattr(user_data, "is_verified", None),
        pending_verification=getattr(user_data, "pending_verification", None),
    )

    await db.commit()
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found")
    return updated


async def delete_user_service(user_id: UUID, db: AsyncSession):
    repo = UserRepository(db)
    removed = await repo.remove(user_id)
    if not removed:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {user_id} not found")
    await db.commit()
    return None
