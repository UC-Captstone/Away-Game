"""merge migration heads

Revision ID: 8c50e6f3b8d4
Revises: 625bffb85c37, c0d1e2f3a4b5
Create Date: 2026-02-03 18:21:53.147001

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c50e6f3b8d4'
down_revision: Union[str, Sequence[str], None] = ('625bffb85c37', 'c0d1e2f3a4b5')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
