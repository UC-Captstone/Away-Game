"""replace full unique constraint on friend_requests with partial unique index

Revision ID: c3d4e5f6a7b8
Revises: b1c2d3e4f5a6
Create Date: 2026-03-11 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c3d4e5f6a7b8'
down_revision: Union[str, Sequence[str], None] = 'b1c2d3e4f5a6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Replace the full uq_friend_request_pair unique constraint with a partial
    unique index that only covers rows where status = 'pending'.  This allows
    a sender to re-send a friend request after a previous one has been
    rejected or accepted without hitting a constraint violation.
    """
    op.drop_constraint('uq_friend_request_pair', 'friend_requests', type_='unique')
    op.create_index(
        'uq_friend_request_pair_pending',
        'friend_requests',
        ['sender_id', 'receiver_id'],
        unique=True,
        postgresql_where=sa.text("status = 'pending'"),
    )


def downgrade() -> None:
    """Revert to the original full unique constraint on (sender_id, receiver_id)."""
    op.drop_index('uq_friend_request_pair_pending', table_name='friend_requests')
    op.create_unique_constraint(
        'uq_friend_request_pair',
        'friend_requests',
        ['sender_id', 'receiver_id'],
    )
