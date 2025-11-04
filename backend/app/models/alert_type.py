from __future__ import annotations
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base


class AlertType(Base):
    __tablename__ = "alert_types"

    alert_type_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type_name: Mapped[str]
    code: Mapped[str | None]

    __table_args__ = (
        UniqueConstraint("type_name", name="uq_alert_types_name"),
        UniqueConstraint("code", name="uq_alert_types_code"),
    )
