from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, CheckConstraint, Index, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db.base import Base

class Favorite(Base):
    __tablename__ = "favorites"

    favorite_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )

    event_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("events.event_id", ondelete="CASCADE")
    )
    game_id: Mapped[int | None] = mapped_column(
        ForeignKey("games.game_id", ondelete="CASCADE")
    )

    date_time: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="favorites")
    event = relationship("Event")
    game = relationship("Game")

    __table_args__ = (
        CheckConstraint(
            "(event_id IS NOT NULL AND game_id IS NULL) OR (event_id IS NULL AND game_id IS NOT NULL)",
            name="ck_favorites_event_xor_game",
        ),
        Index(
            "uq_fav_event_per_user",
            "user_id", "event_id",
            unique=True,
            postgresql_where=text("event_id IS NOT NULL"),
        ),
        Index(
            "uq_fav_game_per_user",
            "user_id", "game_id",
            unique=True,
            postgresql_where=text("game_id IS NOT NULL"),
        ),
    )
