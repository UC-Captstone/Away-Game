from __future__ import annotations
import uuid
from datetime import datetime

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Index, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base


class FriendRequest(Base):
    __tablename__ = "friend_requests"

    request_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    sender_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    receiver_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )

    # status: 'pending' | 'accepted' | 'rejected'
    status: Mapped[str] = mapped_column(default="pending", server_default="pending", nullable=False)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=func.now())

    sender = relationship("User", foreign_keys=[sender_id])
    receiver = relationship("User", foreign_keys=[receiver_id])

    __table_args__ = (
        # Only one pending request per (sender_id, receiver_id) pair is allowed.
        # Scoped to 'pending' so that re-sending after rejection/acceptance is possible.
        Index(
            "uq_friend_request_pair_pending",
            "sender_id",
            "receiver_id",
            unique=True,
            postgresql_where=sa.text("status = 'pending'"),
        ),
    )
