from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base

class TeamChat(Base):
    __tablename__ = "team_chats"

    message_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    team_id: Mapped[int] = mapped_column(
        ForeignKey("teams.team_id"), nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )

    message_text: Mapped[str]
    timestamp: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    team = relationship("Team", back_populates="chats")
    user = relationship("User", back_populates="team_chats")

    __table_args__ = (
        Index("ix_team_chats_team_timestamp", "team_id", "timestamp"),
    )
