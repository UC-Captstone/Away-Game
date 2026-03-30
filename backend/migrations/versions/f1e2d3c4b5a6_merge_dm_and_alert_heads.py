"""merge dm and alerts heads

Revision ID: f1e2d3c4b5a6
Revises: e3f4a5b6c7d8, a2f3b4c5d6e7
Create Date: 2026-03-23

"""
from typing import Sequence, Union


# revision identifiers, used by Alembic.
revision: str = 'f1e2d3c4b5a6'
down_revision: Union[str, Sequence[str], None] = ('e3f4a5b6c7d8', 'a2f3b4c5d6e7')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
