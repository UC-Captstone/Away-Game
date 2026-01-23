"""fix game and venue models

Revision ID: 625bffb85c37
Revises: 6326b40725aa
Create Date: 2026-01-22 21:12:23.925137

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa



revision: str = '625bffb85c37'
down_revision: Union[str, Sequence[str], None] = '6326b40725aa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('venues', 'timezone',
               existing_type=sa.VARCHAR(),
               nullable=True)


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column('venues', 'timezone',
               existing_type=sa.VARCHAR(),
               nullable=False)
