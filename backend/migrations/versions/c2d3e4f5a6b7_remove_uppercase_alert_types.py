"""remove uppercase alert_type entries, reassigning any alerts that reference them

Revision ID: c2d3e4f5a6b7
Revises: b1c2d3e4f5a6
Create Date: 2026-03-11

"""
from typing import Sequence, Union

from alembic import op

revision: str = 'c2d3e4f5a6b7'
down_revision: Union[str, Sequence[str], None] = 'b1c2d3e4f5a6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

REPLACEMENTS = {
    'TRAFFIC': 'traffic',
    'SECURITY': 'security',
    'WEATHER': 'weather',  
}

FALLBACK_CODES = ['PARKING', 'CROWD']


def upgrade() -> None:
    for old_code, new_code in REPLACEMENTS.items():
        op.execute(
            f"UPDATE safety_alerts SET alert_type_id = '{new_code}' WHERE alert_type_id = '{old_code}'"
        )

    for old_code in FALLBACK_CODES:
        op.execute(
            f"UPDATE safety_alerts SET alert_type_id = 'other' WHERE alert_type_id = '{old_code}'"
        )

    all_uppercase = list(REPLACEMENTS.keys()) + FALLBACK_CODES
    codes_list = ', '.join(f"'{c}'" for c in all_uppercase)
    op.execute(f"DELETE FROM alert_types WHERE code IN ({codes_list})")


def downgrade() -> None:
    op.execute(
        "INSERT INTO alert_types (code, type_name) VALUES "
        "('TRAFFIC', 'Traffic Congestion'), "
        "('PARKING', 'Parking Full'), "
        "('SECURITY', 'Security Incident'), "
        "('WEATHER', 'Weather Alert'), "
        "('CROWD', 'Crowd Control') "
        "ON CONFLICT (code) DO NOTHING"
    )
