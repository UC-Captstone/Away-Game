"""add is_read to direct_messages

Revision ID: e3f4a5b6c7d8
Revises: c2d3e4f5a6b7
Create Date: 2026-03-23

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'e3f4a5b6c7d8'
down_revision: Union[str, Sequence[str], None] = 'c2d3e4f5a6b7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'direct_messages',
        sa.Column('is_read', sa.Boolean(), nullable=False, server_default=sa.text('false')),
    )


def downgrade() -> None:
    op.drop_column('direct_messages', 'is_read')
