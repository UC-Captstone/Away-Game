"""
Shared helper for the "game channel" find-or-create pattern.

Both the ``/events/game-channel/{game_id}`` endpoint and the
``/event-chats/`` POST handler need to resolve (or create) the canonical
Events-table row that represents a game's chat channel.  This module
centralises that logic so the two routes stay in sync.
"""

from __future__ import annotations

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from fastapi import HTTPException

from models.event import Event
from models.game import Game
from models.user import User


async def get_or_create_game_channel_event(
    game_id: int,
    current_user: User,
    db: AsyncSession,
) -> Event:
    """
    Return the existing ``Event`` row for *game_id* with ``event_type_id='GAME'``,
    or create one if it doesn't exist yet.

    All relevant relationships (venue, event_type, game → teams/league) are
    eagerly loaded so callers can serialise the result without extra queries.

    Raises ``HTTPException(404)`` if *game_id* does not exist in the games table.
    """
    find_stmt = (
        select(Event)
        .where(Event.game_id == game_id, Event.event_type_id == "GAME")
        .options(
            joinedload(Event.venue),
            joinedload(Event.event_type),
            joinedload(Event.game).joinedload(Game.home_team),
            joinedload(Event.game).joinedload(Game.away_team),
            joinedload(Event.game).joinedload(Game.league),
        )
        .limit(1)
    )

    result = await db.execute(find_stmt)
    event = result.unique().scalar_one_or_none()
    if event is not None:
        return event

    # Event doesn't exist yet — fetch the game to build a stub.
    game_result = await db.execute(
        select(Game)
        .where(Game.game_id == game_id)
        .options(
            joinedload(Game.home_team),
            joinedload(Game.away_team),
            joinedload(Game.league),
            joinedload(Game.venue),
        )
    )
    game = game_result.unique().scalar_one_or_none()
    if game is None:
        raise HTTPException(status_code=404, detail=f"Game {game_id} not found")

    home_name = (
        (game.home_team.display_name or game.home_team.team_name)
        if game.home_team else "Home"
    )
    away_name = (
        (game.away_team.display_name or game.away_team.team_name)
        if game.away_team else "Away"
    )

    # Ensure the GAME event-type row exists (idempotent upsert).
    await db.execute(
        text(
            "INSERT INTO event_types (code, type_name) "
            "VALUES ('GAME', 'Game Channel') "
            "ON CONFLICT (code) DO NOTHING"
        )
    )

    new_event = Event(
        creator_user_id=current_user.user_id,
        event_type_id="GAME",
        game_id=game_id,
        venue_id=game.venue_id,
        title=f"{away_name} @ {home_name}",
        game_date=game.date_time.replace(tzinfo=None) if game.date_time else None,
        latitude=game.venue.latitude if game.venue else None,
        longitude=game.venue.longitude if game.venue else None,
    )
    db.add(new_event)
    try:
        await db.flush()
        await db.commit()
    except Exception:
        await db.rollback()
        # Race condition: another request created it — just re-fetch.
        result = await db.execute(find_stmt)
        event = result.unique().scalar_one_or_none()
        if event is not None:
            return event
        raise

    # Re-fetch with all relationships loaded for correct serialisation.
    result = await db.execute(find_stmt)
    return result.unique().scalar_one()
