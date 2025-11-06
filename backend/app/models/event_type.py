from __future__ import annotations
from sqlalchemy import String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class EventType(Base):
    __tablename__ = "event_types"

    code: Mapped[str] = mapped_column(String(20), primary_key=True)
    type_name: Mapped[str]

    __table_args__ = (
        UniqueConstraint("type_name", name="uq_event_types_name"),
    )
