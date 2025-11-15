from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from app.db.session import get_session
from app.schemas.user import UserCreate, UserRead, UserUpdate
from app.controllers.users import (
    create_user_service,
    list_users_service,
    get_user_service,
    get_user_by_username_service,
    get_user_by_email_service,
    update_user_service,
    delete_user_service,
)

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate, db: AsyncSession = Depends(get_session)):
    return await create_user_service(user_data, db)


@router.get("/", response_model=List[UserRead])
async def list_users(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session),
):
    return await list_users_service(limit=limit, offset=offset, db=db)


@router.get("/{user_id}", response_model=UserRead)
async def get_user(user_id: UUID, db: AsyncSession = Depends(get_session)):
    return await get_user_service(user_id=user_id, db=db)


@router.get("/username/{username}", response_model=UserRead)
async def get_user_by_username(username: str, db: AsyncSession = Depends(get_session)):
    return await get_user_by_username_service(username=username, db=db)


@router.get("/email/{email}", response_model=UserRead)
async def get_user_by_email(email: str, db: AsyncSession = Depends(get_session)):
    return await get_user_by_email_service(email=email, db=db)


@router.patch("/{user_id}", response_model=UserRead)
async def update_user(user_id: UUID, user_data: UserUpdate, db: AsyncSession = Depends(get_session)):
    return await update_user_service(user_id=user_id, user_data=user_data, db=db)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: UUID, db: AsyncSession = Depends(get_session)):
    await delete_user_service(user_id=user_id, db=db)
    return None