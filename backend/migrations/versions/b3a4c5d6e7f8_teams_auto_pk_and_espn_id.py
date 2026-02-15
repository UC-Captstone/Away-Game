"""teams auto pk and espn_id

Revision ID: b3a4c5d6e7f8
Revises: f5696356eca4
Create Date: 2026-02-12 22:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b3a4c5d6e7f8'
down_revision: Union[str, Sequence[str], None] = 'f5696356eca4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("TRUNCATE TABLE favorites, event_chats, safety_alerts, events, team_chats, user_favorite_teams, games, teams CASCADE")

    op.drop_constraint('games_home_team_id_fkey', 'games', type_='foreignkey')
    op.drop_constraint('games_away_team_id_fkey', 'games', type_='foreignkey')
    op.drop_constraint('user_favorite_teams_team_id_fkey', 'user_favorite_teams', type_='foreignkey')
    op.drop_constraint('team_chats_team_id_fkey', 'team_chats', type_='foreignkey')
    op.drop_constraint('uq_teams_league_location_name', 'teams', type_='unique')
    op.drop_column('teams', 'sport_league')
    op.drop_column('teams', 'sport_conference')
    op.drop_column('teams', 'sport_division')
    op.drop_column('venues', 'display_name')
    op.drop_column('venues', 'timezone')
    op.drop_column('venues', 'capacity')
    op.drop_constraint('uq_venues_name_location', 'venues', type_='unique')

    op.add_column('teams', sa.Column('espn_team_id', sa.Integer(), nullable=False))

    op.execute("ALTER TABLE teams DROP CONSTRAINT teams_pkey")
    op.execute("CREATE SEQUENCE IF NOT EXISTS teams_team_id_seq OWNED BY teams.team_id")
    op.execute("ALTER TABLE teams ALTER COLUMN team_id SET DEFAULT nextval('teams_team_id_seq')")
    op.execute("SELECT setval('teams_team_id_seq', COALESCE((SELECT MAX(team_id) FROM teams), 0) + 1)")
    op.execute("ALTER TABLE teams ADD PRIMARY KEY (team_id)")

    op.create_unique_constraint('uq_teams_espn_id_league', 'teams', ['espn_team_id', 'league_id'])

    op.create_foreign_key('games_home_team_id_fkey', 'games', 'teams', ['home_team_id'], ['team_id'])
    op.create_foreign_key('games_away_team_id_fkey', 'games', 'teams', ['away_team_id'], ['team_id'])
    op.create_foreign_key('user_favorite_teams_team_id_fkey', 'user_favorite_teams', 'teams', ['team_id'], ['team_id'])
    op.create_foreign_key('team_chats_team_id_fkey', 'team_chats', 'teams', ['team_id'], ['team_id'])


def downgrade() -> None:
    op.execute("TRUNCATE TABLE favorites, event_chats, safety_alerts, events, team_chats, user_favorite_teams, games, teams CASCADE")

    op.drop_constraint('games_home_team_id_fkey', 'games', type_='foreignkey')
    op.drop_constraint('games_away_team_id_fkey', 'games', type_='foreignkey')
    op.drop_constraint('user_favorite_teams_team_id_fkey', 'user_favorite_teams', type_='foreignkey')
    op.drop_constraint('team_chats_team_id_fkey', 'team_chats', type_='foreignkey')

    op.drop_constraint('uq_teams_espn_id_league', 'teams', type_='unique')

    op.drop_column('teams', 'espn_team_id')

    op.execute("ALTER TABLE teams ALTER COLUMN team_id DROP DEFAULT")
    op.execute("DROP SEQUENCE IF EXISTS teams_team_id_seq")

    op.add_column('teams', sa.Column('sport_league', sa.String(length=50), nullable=True))
    op.add_column('teams', sa.Column('sport_conference', sa.String(length=50), nullable=True))
    op.add_column('teams', sa.Column('sport_division', sa.String(length=50), nullable=True))

    op.add_column('venues', sa.Column('display_name', sa.String(), nullable=True))
    op.add_column('venues', sa.Column('timezone', sa.String(), nullable=True))
    op.add_column('venues', sa.Column('capacity', sa.Integer(), nullable=True))
    op.create_unique_constraint('uq_venues_name_location', 'venues', ['name', 'city', 'state_region', 'country'])

    op.create_unique_constraint('uq_teams_league_location_name', 'teams', ['league_id', 'home_location', 'team_name'])

    op.create_foreign_key('games_home_team_id_fkey', 'games', 'teams', ['home_team_id'], ['team_id'])
    op.create_foreign_key('games_away_team_id_fkey', 'games', 'teams', ['away_team_id'], ['team_id'])
    op.create_foreign_key('user_favorite_teams_team_id_fkey', 'user_favorite_teams', 'teams', ['team_id'], ['team_id'])
    op.create_foreign_key('team_chats_team_id_fkey', 'team_chats', 'teams', ['team_id'], ['team_id'])
