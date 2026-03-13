"""add friends and direct messages tables

Revision ID: a2f3b4c5d6e7
Revises: 99eb9250f885
Create Date: 2026-03-10 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'a2f3b4c5d6e7'
down_revision: Union[str, Sequence[str], None] = '99eb9250f885'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create friend_requests, friendships, and direct_messages tables."""

    # ------------------------------------------------------------------
    # friend_requests
    # ------------------------------------------------------------------
    op.create_table(
        'friend_requests',
        sa.Column('request_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('sender_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('receiver_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('status', sa.String(), server_default='pending', nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['sender_id'], ['users.user_id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['receiver_id'], ['users.user_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('request_id'),
        sa.UniqueConstraint('sender_id', 'receiver_id', name='uq_friend_request_pair'),
    )

    # ------------------------------------------------------------------
    # friendships
    # ------------------------------------------------------------------
    op.create_table(
        'friendships',
        sa.Column('friendship_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id_1', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id_2', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id_1'], ['users.user_id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id_2'], ['users.user_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('friendship_id'),
        sa.UniqueConstraint('user_id_1', 'user_id_2', name='uq_friendship_pair'),
    )

    # ------------------------------------------------------------------
    # direct_messages
    # ------------------------------------------------------------------
    op.create_table(
        'direct_messages',
        sa.Column('message_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('sender_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('receiver_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('message_text', sa.String(), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), server_default='false', nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['sender_id'], ['users.user_id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['receiver_id'], ['users.user_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('message_id'),
    )
    op.create_index(
        'ix_direct_messages_sender_receiver',
        'direct_messages',
        ['sender_id', 'receiver_id'],
        unique=False,
    )
    op.create_index(
        'ix_direct_messages_receiver_sender',
        'direct_messages',
        ['receiver_id', 'sender_id'],
        unique=False,
    )


def downgrade() -> None:
    """Drop direct_messages, friendships, and friend_requests tables."""
    op.drop_index('ix_direct_messages_receiver_sender', table_name='direct_messages')
    op.drop_index('ix_direct_messages_sender_receiver', table_name='direct_messages')
    op.drop_table('direct_messages')
    op.drop_table('friendships')
    op.drop_table('friend_requests')
