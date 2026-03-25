"""alerts schema update: add severity, expires_at, is_active; remove game_date; create acknowledgments table

Revision ID: f7a8b9c0d1e2
Revises: e1a2b3c4d5f6
Create Date: 2026-03-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


revision: str = 'f7a8b9c0d1e2'
down_revision: Union[str, Sequence[str], None] = 'e1a2b3c4d5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_index('ix_alerts_game_date', table_name='safety_alerts')
    op.drop_column('safety_alerts', 'game_date')

    op.add_column('safety_alerts', sa.Column('title', sa.String(), nullable=False, server_default=''))
    op.alter_column('safety_alerts', 'title', server_default=None)
    op.add_column('safety_alerts', sa.Column('source', sa.String(10), server_default='admin', nullable=False))
    op.add_column('safety_alerts', sa.Column('severity', sa.String(10), server_default='low', nullable=False))
    op.add_column('safety_alerts', sa.Column('expires_at', sa.DateTime(), nullable=True))
    op.add_column('safety_alerts', sa.Column('is_active', sa.Boolean(), server_default='true', nullable=False))

    op.create_index('ix_alerts_game_id', 'safety_alerts', ['game_id'])
    op.create_check_constraint('chk_alert_severity', 'safety_alerts', "severity IN ('low', 'medium', 'high')")
    op.create_check_constraint('chk_alert_source', 'safety_alerts', "source IN ('admin', 'user')")

    op.create_table(
        'user_alert_acknowledgments',
        sa.Column('user_id', UUID(as_uuid=True), sa.ForeignKey('users.user_id', ondelete='CASCADE'), primary_key=True),
        sa.Column('alert_id', UUID(as_uuid=True), sa.ForeignKey('safety_alerts.alert_id', ondelete='CASCADE'), primary_key=True),
        sa.Column('acknowledged_at', sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )



def downgrade() -> None:
    op.drop_table('user_alert_acknowledgments')

    op.drop_constraint('chk_alert_source', 'safety_alerts', type_='check')
    op.drop_constraint('chk_alert_severity', 'safety_alerts', type_='check')
    op.drop_index('ix_alerts_game_id', table_name='safety_alerts')
    op.drop_column('safety_alerts', 'is_active')
    op.drop_column('safety_alerts', 'expires_at')
    op.drop_column('safety_alerts', 'severity')
    op.drop_column('safety_alerts', 'source')
    op.drop_column('safety_alerts', 'title')

    op.add_column('safety_alerts', sa.Column('game_date', sa.DateTime(), nullable=True))
    op.create_index('ix_alerts_game_date', 'safety_alerts', ['game_date'])
