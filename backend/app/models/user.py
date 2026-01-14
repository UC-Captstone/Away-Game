from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy.dialects.postgresql import UUID, CITEXT
from sqlalchemy import UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db.base import Base


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    clerk_id: Mapped[str | None] = mapped_column(unique=True)
    username: Mapped[str] = mapped_column(CITEXT, nullable=False, unique=True)
    email: Mapped[str] = mapped_column(CITEXT, nullable=False, unique=True)
    first_name: Mapped[str | None]
    last_name: Mapped[str | None]

    profile_picture_url: Mapped[str | None]
    is_verified: Mapped[bool] = mapped_column(default=False, nullable=False)
    pending_verification: Mapped[bool] = mapped_column(default=False, nullable=False)

    enable_nearby_event_notifications: Mapped[bool] = mapped_column(default=False, nullable=False)
    enable_favorite_team_notifications: Mapped[bool] = mapped_column(default=False, nullable=False)
    enable_safety_alert_notifications: Mapped[bool] = mapped_column(default=False, nullable=False)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=func.now())

    events = relationship("Event", back_populates="creator", cascade="all, delete-orphan")
    safety_alerts = relationship("SafetyAlert", back_populates="reporter", cascade="all, delete-orphan")
    team_chats = relationship("TeamChat", back_populates="user", cascade="all, delete-orphan")
    favorites = relationship("Favorite", back_populates="user", cascade="all, delete-orphan")
    user_favorite_teams = relationship("UserFavoriteTeams", back_populates="user", cascade="all, delete-orphan")
