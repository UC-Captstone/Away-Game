# Database Migrations

This directory contains Alembic migrations for the Away-Game database schema.

## Overview

We use Alembic for database migrations with the following setup:
- **Database**: PostgreSQL 16
- **ORM**: SQLAlchemy 2.0 (async)
- **Driver**: AsyncPG
- **Configuration**: `alembic.ini` in the backend directory

## Prerequisites

1. **Database Connection**: Ensure your PostgreSQL database is running and accessible
2. **Environment Variables**: Set up your `.env` file with database credentials:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/awaygame
   DATABASE_URL_ASYNC=postgresql+asyncpg://username:password@localhost:5432/awaygame
   ```

## Common Migration Commands

All commands should be run from the `backend` directory:

### Apply Migrations

```bash
# Apply all pending migrations to the latest version
alembic upgrade head

# Apply migrations up to a specific revision
alembic upgrade <revision_id>

# Apply one migration forward
alembic upgrade +1
```

### Rollback Migrations

```bash
# Rollback one migration
alembic downgrade -1

# Rollback to a specific revision
alembic downgrade <revision_id>

# Rollback all migrations
alembic downgrade base
```

### Create New Migrations

```bash
# Auto-generate a migration from model changes
alembic revision --autogenerate -m "description of changes"

# Create an empty migration file (for manual edits)
alembic revision -m "description of changes"
```

**Important**: Always review auto-generated migrations before applying them!

### View Migration History

```bash
# Show current revision
alembic current

# Show migration history
alembic history

# Show all revisions with details
alembic history --verbose
```

## Creating a New Migration

### Step 1: Update Your Models

Make changes to your SQLAlchemy models in `backend/app/models/`:

```python
# Example: Adding a new field to User model
class User(Base):
    __tablename__ = "users"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    username: Mapped[str] = mapped_column(CITEXT, nullable=False, unique=True)
    # New field
    bio: Mapped[str | None] = mapped_column(String(500))
```

### Step 2: Generate Migration

```bash
cd backend
alembic revision --autogenerate -m "add bio field to users table"
```

This creates a new migration file in `backend/migrations/versions/`.

### Step 3: Review the Migration

Open the generated file in `backend/migrations/versions/<revision>_add_bio_field_to_users_table.py`:

```python
def upgrade() -> None:
    # Check that the auto-generated changes are correct
    op.add_column('users', sa.Column('bio', sa.String(length=500), nullable=True))

def downgrade() -> None:
    # Verify the rollback logic
    op.drop_column('users', 'bio')
```

### Step 4: Apply the Migration

```bash
alembic upgrade head
```

### Step 5: Update Pydantic Schemas

Don't forget to update your Pydantic schemas in `backend/app/schemas/` to match:

```python
class UserBase(BaseModel):
    username: str
    email: str
    bio: Optional[str] = None  # Add new field
```

### Adding a New Table

```bash
# 1. Create the model in app/models/
# 2. Import it in app/db/base.py (if using base import pattern)
# 3. Generate migration
alembic revision --autogenerate -m "add events table"
# 4. Review and apply
alembic upgrade head
```

### Renaming a Column

Alembic cannot auto-detect renames. You'll need to manually edit:

```python
def upgrade() -> None:
    op.alter_column('users', 'old_name', new_column_name='new_name')

def downgrade() -> None:
    op.alter_column('users', 'new_name', new_column_name='old_name')
```

### Data Migrations

For migrating data, create a manual migration:

```python
from alembic import op
import sqlalchemy as sa

def upgrade() -> None:
    # Example: Populate a new field based on existing data
    connection = op.get_bind()
    connection.execute(
        sa.text("UPDATE users SET bio = 'Default bio' WHERE bio IS NULL")
    )

def downgrade() -> None:
    # Usually no-op for data migrations
    pass
```

## Troubleshooting

### "Target database is not up to date"

```bash
# Check current version
alembic current

# See pending migrations
alembic history

# Apply pending migrations
alembic upgrade head
```

### "Can't locate revision identified by..."

Your migration history is out of sync. Check:
1. Are all migration files present in `migrations/versions/`?
2. Is your `alembic_version` table correct?
3. Did someone delete a migration file?

### Migration Conflicts

If multiple developers create migrations simultaneously:
1. Pull latest migrations from git
2. Use `alembic merge` to create a merge migration
3. Apply the merge migration

```bash
alembic merge -m "merge heads" <revision1> <revision2>
alembic upgrade head
```

### "Database is not empty" Error

When running `upgrade head` on an existing database:
1. Check if tables already exist
2. Consider using `stamp` to mark the database as up-to-date:
   ```bash
   alembic stamp head
   ```
3. Or start fresh by dropping all tables (⚠️ **destructive**):
   ```bash
   alembic downgrade base
   alembic upgrade head
   ```

### Deployment Steps

```bash
# 1. Pull latest code
git pull origin main

# 2. Check migration status
alembic current
alembic history

# 3. Backup database (example with pg_dump)
pg_dump -U username -h hostname awaygame > backup_$(date +%Y%m%d_%H%M%S).sql

# 4. Apply migrations
alembic upgrade head

# 5. Verify application works

# 6. If issues occur, rollback
alembic downgrade -1
```


## Getting Help

- **Alembic Documentation**: https://alembic.sqlalchemy.org/
- **SQLAlchemy 2.0 Docs**: https://docs.sqlalchemy.org/en/20/
- **Project Issues**: Check existing migrations in `versions/` for examples

## Migration Files

All migration files are located in `backend/migrations/versions/`. Each file contains:
- `revision`: Unique identifier for this migration
- `down_revision`: Previous migration in the chain
- `upgrade()`: Function to apply the migration
- `downgrade()`: Function to rollback the migration
