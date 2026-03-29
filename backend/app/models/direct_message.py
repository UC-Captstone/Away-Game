from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Boolean, ForeignKey, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class DirectMessage(Base):
    __tablename__ = "direct_messages"

    message_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    sender_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    receiver_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )

    message_text: Mapped[str] = mapped_column(nullable=False)
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false", nullable=False)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=func.now())

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_direct_messages")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_direct_messages")

    __table_args__ = (
        # Speeds up conversation queries (fetch all messages between two users)
        Index("ix_direct_messages_sender_receiver", "sender_id", "receiver_id"),
        Index("ix_direct_messages_receiver_sender", "receiver_id", "sender_id"),
    )
