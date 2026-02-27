from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from models.user import User


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, user_id: UUID) -> Optional[User]:
        res = await self.db.execute(select(User).where(User.user_id == user_id))
        return res.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        res = await self.db.execute(select(User).where(User.email == email))
        return res.scalar_one_or_none()

    async def get_by_username(self, username: str) -> Optional[User]:
        res = await self.db.execute(select(User).where(User.username == username))
        return res.scalar_one_or_none()
    
    async def get_by_clerk_id(self, clerk_id: str) -> Optional[User]:
        res = await self.db.execute(select(User).where(User.clerk_id == clerk_id))
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[User]:
        res = await self.db.execute(
            select(User).order_by(User.created_at.desc()).limit(limit).offset(offset)
        )
        return res.scalars().all()

    async def add(self, user: User) -> User:
        self.db.add(user)
        await self.db.flush()
        return user

    async def update_fields(
        self,
        user_id: UUID,
        *,
        clerk_id: Optional[str] = None,
        username: Optional[str] = None,
        email: Optional[str] = None,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        profile_picture_url: Optional[str] = None,
        is_verified: Optional[bool] = None,
        pending_verification: Optional[bool] = None,
    ) -> Optional[User]:
        values = {k: v for k, v in {
            "clerk_id": clerk_id,
            "username": username,
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "profile_picture_url": profile_picture_url,
            "is_verified": is_verified,
            "pending_verificaiton": pending_verification

        }.items() if v is not None}
        if not values:
            return await self.get(user_id)
        await self.db.execute(update(User).where(User.user_id == user_id).values(**values))
        return await self.get(user_id)

    async def remove(self, user_id: UUID) -> int:
        res = await self.db.execute(delete(User).where(User.user_id == user_id))
        return res.rowcount or 0

    async def get_or_create_by_clerk_id(
        self,
        *,
        clerk_id: str,
        email: str,
        username: str,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        role: str = "user",
    ) -> tuple[User, bool]:
        user = await self.get_by_clerk_id(clerk_id)
        if user:
            return (user, False)

        user = User(
            clerk_id=clerk_id,
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            profile_picture_url=None,
            is_verified=False,
            pending_verification=False,
            role=role,
        )
        await self.add(user)
        await self.db.flush()
        await self.db.refresh(user)
        return (user, True)


async def create_user_service(user_data, db: AsyncSession) -> User:
    repo = UserRepository(db)

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