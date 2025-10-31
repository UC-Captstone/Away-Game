from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User


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
        username: Optional[str] = None,
        email: Optional[str] = None,
        profile_picture_url: Optional[str] = None,
        is_verified: Optional[bool] = None,
    ) -> Optional[User]:
        values = {k: v for k, v in {
            "username": username,
            "email": email,
            "profile_picture_url": profile_picture_url,
            "is_verified": is_verified,
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
        username: str
    ) -> tuple[User, bool]:
        user = await self.get_by_clerk_id(clerk_id)

        if user:
            return (user, False)
        
        user = User(
            clerk_id=clerk_id,
            email=email,
            username=username,
            profile_picture_url=None,
            is_verified=False
        )
        await self.add(user)
        await self.db.flush()
        await self.db.refresh(user)
        return (user, True)