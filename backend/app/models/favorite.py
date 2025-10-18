from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import ForeignKey, CheckConstraint, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class UserFavoriteTeams(Base):
    __tablename__ = "user_favorite_teams"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), primary_key=True
    )
    espn_sport_id: Mapped[int] = mapped_column(primary_key=True)
    espn_league_id: Mapped[int] = mapped_column(primary_key=True)
    espn_team_id: Mapped[int] = mapped_column(primary_key=True)

    created_at: Mapped[datetime]


class Favorite(Base):
    __tablename__ = "favorites"

    favorite_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )


    event_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("events.event_id", ondelete="CASCADE")
    )
    game_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("games.game_id", ondelete="CASCADE")
    )

    date_time: Mapped[datetime]

    __table_args__ = (

        CheckConstraint(
            "(event_id IS NOT NULL AND game_id IS NULL) OR (event_id IS NULL AND game_id IS NOT NULL)",
            name="ck_favorites_event_xor_game",
        ),

        Index(
            "uq_fav_event_per_user",
            "user_id", "event_id",
            unique=True,
            postgresql_where="event_id IS NOT NULL",
        ),
        Index(
            "uq_fav_game_per_user",
            "user_id", "game_id",
            unique=True,
            postgresql_where="game_id IS NOT NULL",
        ),
    )
