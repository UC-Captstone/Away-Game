"""merge e1a2b3c4d5f6 and a2f3b4c5d6e7 heads

Revision ID: b1c2d3e4f5a6
Revises: e1a2b3c4d5f6, a2f3b4c5d6e7
Create Date: 2026-03-10 00:01:00.000000

"""
from typing import Sequence, Union

# revision identifiers, used by Alembic.
revision: str = 'b1c2d3e4f5a6'
down_revision: Union[str, Sequence[str], None] = ('e1a2b3c4d5f6', 'a2f3b4c5d6e7')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
