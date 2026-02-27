"""add_role_to_users

Revision ID: e1a2b3c4d5f6
Revises: d4e5f6a7b8c9
Create Date: 2026-02-24

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'e1a2b3c4d5f6'
down_revision: Union[str, Sequence[str], None] = 'd4e5f6a7b8c9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('role', sa.String(), server_default='user', nullable=False))


def downgrade() -> None:
    op.drop_column('users', 'role')
