from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional, List

from sqlalchemy import func
from sqlalchemy.dialects.postgresql import UUID, CITEXT
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    clerk_id: Mapped[Optional[str]] = mapped_column(unique=True)

    username: Mapped[str] = mapped_column(CITEXT(), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(CITEXT(), unique=True, nullable=False)
    profile_picture_url: Mapped[Optional[str]]

    is_verified: Mapped[bool] = mapped_column(default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[Optional[datetime]] = mapped_column(onupdate=func.now())

    events: Mapped[List["Event"]] = relationship(back_populates="creator", cascade="all, delete-orphan")
