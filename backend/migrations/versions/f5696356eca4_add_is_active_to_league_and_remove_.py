"""add is active to league and remove sport code

Revision ID: f5696356eca4
Revises: 99eb9250f885
Create Date: 2026-02-12 19:42:11.390193

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f5696356eca4'
down_revision: Union[str, Sequence[str], None] = '99eb9250f885'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('leagues', 'sport_code', new_column_name='espn_sport')
    op.add_column('leagues', sa.Column('espn_league', sa.String(), nullable=True))
    op.add_column('leagues', sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.text('false')))
    op.drop_constraint('leagues_espn_league_id_key', 'leagues', type_='unique')
    op.drop_column('leagues', 'espn_league_id')


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column('leagues', sa.Column('espn_league_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_unique_constraint('leagues_espn_league_id_key', 'leagues', ['espn_league_id'])
    op.drop_column('leagues', 'is_active')
    op.drop_column('leagues', 'espn_league')
    op.alter_column('leagues', 'espn_sport', new_column_name='sport_code')
