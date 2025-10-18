from __future__ import annotations
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base


class EventType(Base):
    __tablename__ = "event_types"

    event_type_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type_name: Mapped[str] = mapped_column(unique=True, nullable=False)
    code: Mapped[str | None] = mapped_column(unique=True)


class AlertType(Base):
    __tablename__ = "alert_types"

    alert_type_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type_name: Mapped[str] = mapped_column(unique=True, nullable=False)
    code: Mapped[str | None] = mapped_column(unique=True)
