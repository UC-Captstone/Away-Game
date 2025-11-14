from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from app.db.session import get_session
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.user import UserCreate, UserRead, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_session)
):
    repo = UserRepository(db)

    existing_username = await repo.get_by_username(user_data.username)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Username '{user_data.username}' is already taken"
        )

    existing_email = await repo.get_by_email(user_data.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{user_data.email}' is already registered"
        )

    new_user = User(**user_data.model_dump())
    created_user = await repo.add(new_user)
    await db.commit()
    await db.refresh(created_user)

    return created_user


@router.get("/", response_model=List[UserRead])
async def list_users(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session)
):
    repo = UserRepository(db)
    users = await repo.list(limit=limit, offset=offset)
    return users


@router.get("/{user_id}", response_model=UserRead)
async def get_user(
    user_id: UUID,
    db: AsyncSession = Depends(get_session)
):
    repo = UserRepository(db)
    user = await repo.get(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    return user


@router.get("/username/{username}", response_model=UserRead)
async def get_user_by_username(
    username: str,
    db: AsyncSession = Depends(get_session)
):
    repo = UserRepository(db)
    user = await repo.get_by_username(username)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with username '{username}' not found"
        )

    return user


@router.get("/email/{email}", response_model=UserRead)
async def get_user_by_email(
    email: str,
    db: AsyncSession = Depends(get_session)
):
    repo = UserRepository(db)
    user = await repo.get_by_email(email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with email '{email}' not found"
        )

    return user


@router.patch("/{user_id}", response_model=UserRead)
async def update_user(
    user_id: UUID,
    user_data: UserUpdate,
    db: AsyncSession = Depends(get_session)
):
    repo = UserRepository(db)

    existing_user = await repo.get(user_id)
    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    if user_data.username and user_data.username != existing_user.username:
        username_taken = await repo.get_by_username(user_data.username)
        if username_taken:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Username '{user_data.username}' is already taken"
            )

    if user_data.email and user_data.email != existing_user.email:
        email_taken = await repo.get_by_email(user_data.email)
        if email_taken:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Email '{user_data.email}' is already registered"
            )

    update_data = user_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(existing_user, field, value)

    await db.commit()
    await db.refresh(existing_user)

    return existing_user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: UUID,
    db: AsyncSession = Depends(get_session)
):
    repo = UserRepository(db)

    user = await repo.get(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    await repo.remove(user_id)
    await db.commit()

    return None
