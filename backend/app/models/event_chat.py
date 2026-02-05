from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base

class EventChat(Base):
    __tablename__ = "event_chats"

    message_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    event_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("events.event_id"), nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )

    message_text: Mapped[str]
    timestamp: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    event = relationship("Event", back_populates="chats")
    user = relationship("User", back_populates="event_chats")

    __table_args__ = (
        Index("ix_event_chats_event_timestamp", "event_id", "timestamp"),
    )
