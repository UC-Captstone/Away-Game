from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from uuid import UUID

from models.favorite import Favorite
from models.user import User
from models.event import Event
from repositories.favorite_repo import FavoriteRepository


async def get_saved_events_service(
    user_id: UUID,
    limit: int,
    offset: int,
    db: AsyncSession
) -> List[Event]:
    """
    Get all saved events for a user.

    Returns the full Event objects that the user has favorited.
    """
    user_result = await db.execute(select(User).where(User.user_id == user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    stmt = (
        select(Event)
        .join(Favorite, Favorite.event_id == Event.event_id)
        .where(Favorite.user_id == user_id)
        .where(Favorite.event_id.isnot(None))
        .options(
            selectinload(Event.game),
            selectinload(Event.venue)
        )
        .order_by(Favorite.date_time.desc())
        .limit(limit)
        .offset(offset)
    )

    result = await db.execute(stmt)
    events = result.scalars().all()

    return events


async def delete_saved_event_service(
    user_id: UUID,
    event_id: UUID,
    db: AsyncSession
) -> List[Event]:
    """
    Delete a saved event for a user and return the updated list of saved events.
    """
    stmt = select(Favorite).where(
        (Favorite.user_id == user_id) & (Favorite.event_id == event_id)
    )
    result = await db.execute(stmt)
    favorite = result.scalar_one_or_none()

    if not favorite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event {event_id} is not in user's saved events"
        )

    repo = FavoriteRepository(db)
    await repo.remove(favorite.favorite_id)
    await db.commit()

    updated_stmt = (
        select(Event)
        .join(Favorite, Favorite.event_id == Event.event_id)
        .where(Favorite.user_id == user_id)
        .where(Favorite.event_id.isnot(None))
        .options(
            selectinload(Event.game),
            selectinload(Event.venue)
        )
        .order_by(Favorite.date_time.desc())
    )

    updated_result = await db.execute(updated_stmt)
    updated_events = updated_result.scalars().all()

    return updated_events


async def add_saved_event_service(
    user_id: UUID,
    event_id: UUID,
    db: AsyncSession
) -> Event:
    """
    Add an event to a user's saved events.
    """
    user_result = await db.execute(select(User).where(User.user_id == user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found"
        )

    event_stmt = select(Event).where(Event.event_id == event_id).options(
        selectinload(Event.game),
        selectinload(Event.venue)
    )
    event_result = await db.execute(event_stmt)
    event = event_result.scalar_one_or_none()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event with id {event_id} not found"
        )

    existing_stmt = select(Favorite).where(
        (Favorite.user_id == user_id) & (Favorite.event_id == event_id)
    )
    existing_result = await db.execute(existing_stmt)
    existing = existing_result.scalar_one_or_none()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Event {event_id} is already in user's saved events"
        )

    repo = FavoriteRepository(db)
    favorite = Favorite(user_id=user_id, event_id=event_id, game_id=None)
    await repo.add(favorite)
    await db.commit()

    return event