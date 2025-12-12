from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = '6326b40725aa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('enable_nearby_event_notifications', sa.Boolean(), nullable=False, server_default='false'))
    op.add_column('users', sa.Column('enable_favorite_team_notifications', sa.Boolean(), nullable=False, server_default='false'))
    op.add_column('users', sa.Column('enable_safety_alert_notifications', sa.Boolean(), nullable=False, server_default='false'))


def downgrade() -> None:
    op.drop_column('users', 'enable_safety_alert_notifications')
    op.drop_column('users', 'enable_favorite_team_notifications')
    op.drop_column('users', 'enable_nearby_event_notifications')
