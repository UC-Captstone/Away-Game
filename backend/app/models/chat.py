from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy import Index, func, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from db.base import Base


class TeamChat(Base):
    __tablename__ = "team_chats"

    message_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    espn_sport_id: Mapped[int]
    espn_league_id: Mapped[int]
    espn_team_id: Mapped[int]

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    message_text: Mapped[str]
    timestamp: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    __table_args__ = (
        Index("ix_team_chats_team_ts", "espn_sport_id", "espn_league_id", "espn_team_id", "timestamp"),
    )
