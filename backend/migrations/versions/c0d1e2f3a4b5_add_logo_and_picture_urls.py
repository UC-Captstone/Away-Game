from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'c0d1e2f3a4b5'
down_revision: Union[str, Sequence[str], None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('teams', sa.Column('logo_url', sa.String(length=512), nullable=True))
    op.add_column('events', sa.Column('picture_url', sa.String(length=512), nullable=True))


def downgrade() -> None:
    op.drop_column('events', 'picture_url')
    op.drop_column('teams', 'logo_url')
