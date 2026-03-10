"""seed alert_types table with default values

Revision ID: a9b0c1d2e3f4
Revises: f7a8b9c0d1e2
Create Date: 2026-03-07

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'a9b0c1d2e3f4'
down_revision: Union[str, Sequence[str], None] = 'f7a8b9c0d1e2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

ALERT_TYPES = [
    ('safety', 'Safety'),
    ('traffic', 'Traffic'),
    ('weather', 'Weather'),
    ('medical', 'Medical'),
    ('security', 'Security'),
    ('other', 'Other'),
]


def upgrade() -> None:
    # INSERT ... ON CONFLICT DO NOTHING so this is safe to run even if
    # some alert types were manually seeded already.
    op.execute(
        sa.text(
            "INSERT INTO alert_types (code, type_name) VALUES "
            + ", ".join(f"('{code}', '{name}')" for code, name in ALERT_TYPES)
            + " ON CONFLICT (code) DO NOTHING"
        )
    )


def downgrade() -> None:
    op.execute(
        "DELETE FROM alert_types WHERE code IN ('safety', 'traffic', 'weather', 'medical', 'security', 'other')"
    )
