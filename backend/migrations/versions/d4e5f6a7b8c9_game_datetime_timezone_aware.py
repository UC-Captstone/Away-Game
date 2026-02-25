"""make game date_time and created_at timezone aware

Revision ID: d4e5f6a7b8c9
Revises: b3a4c5d6e7f8
Create Date: 2026-02-23 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'd4e5f6a7b8c9'
down_revision: Union[str, Sequence[str], None] = 'b3a4c5d6e7f8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('games', 'date_time',
               existing_type=sa.DateTime(),
               type_=sa.DateTime(timezone=True),
               existing_nullable=False,
               postgresql_using="date_time AT TIME ZONE 'UTC'")
    op.alter_column('games', 'created_at',
               existing_type=sa.DateTime(),
               type_=sa.DateTime(timezone=True),
               existing_nullable=False,
               postgresql_using="created_at AT TIME ZONE 'UTC'")


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column('games', 'date_time',
               existing_type=sa.DateTime(timezone=True),
               type_=sa.DateTime(),
               existing_nullable=False)
    op.alter_column('games', 'created_at',
               existing_type=sa.DateTime(timezone=True),
               type_=sa.DateTime(),
               existing_nullable=False)
