# Away-Game

Full-stack Angular/FastAPI web app for traveling sports fans. Integrates ESPN and Google Maps APIs for game data, safety alerts, and fan meetups. Dockerized with PostgreSQL backend and Clerk auth.

### Prerequisites

- Python 3.11+
- PostgreSQL 16
- Node.js 18+
- Azure account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Away-Game.git
   cd Away-Game/backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**

   We use Clerk for identity and issue our own internal JWT after sync. Configure the following env vars.

   Where to put `.env` (pick one):
   - Recommended: keep `.env` at the repo root and load it via the helper script: `cd backend && . ./load_env.sh ../.env`
   - Or: place a `.env` inside `backend/` so FastAPI auto-loads it.

   Example `.env` contents:
   ```env
   # Project
   PROJECT_NAME=Away-Game
   APP_ENV=dev

   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/awaygame
   DATABASE_URL_ASYNC=postgresql+asyncpg://username:password@localhost:5432/awaygame
   ```

   I wrote a script to load env vars for local testing. It can be ran by using

   ```bash
   cd Away-Game/backend
   . ./load_env.sh
   ```

5. **Start the FastAPI server / MUST BE IN THE BACKEND DIRECTORY**
   ```bash
   # Development mode with auto-reload
   python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

   # Production mode
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

8. **Access the API**
   - **API Documentation (Swagger)**: http://localhost:8000/docs
   - **OpenAPI Schema**: http://localhost:8000/openapi.json

9. **Start the Front End**

## Auth Flow

- Users sign in/up via Clerk UI (Angular).
- Frontend calls `POST /auth/sync` with the Clerk session token.
- Backend verifies Clerk JWT, syncs user (create/update), then issues an internal JWT (HS256) and returns `{ token, user }`.
- Frontend stores the internal JWT in `localStorage` and automatically sends `Authorization: Bearer <token>` on subsequent API calls via an HTTP interceptor.

Notes:
- Local dev works without extra setup (a dev default exists) but you should set `JWT_SECRET_KEY` in `.env`.
- In Azure, store secrets in Key Vault or App Settings and map to the env names above.

##  Database

This project uses PostgreSQL 16 with async SQLAlchemy 2.0 and Alembic for migrations.

### Database Architecture
- **ORM**: SQLAlchemy 2.0 (async)
- **Migrations**: Alembic
- **Driver**: AsyncPG
- **Models**: Located in `backend/app/models/`
- **Schemas**: Pydantic models in `backend/app/schemas/`


## 🏗️ Project Structure

```
Away-Game/
├── backend/
│   ├── app/
│   │   ├── core/          # Configuration
│   │   ├── db/            # Database session setup
│   │   ├── models/        # SQLAlchemy ORM models
│   │   ├── schemas/       # Pydantic schemas (DTOs)
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # API endpoints
│   │   └── main.py        # FastAPI app
│   ├── migrations/        # Alembic migrations
│   ├── requirements.txt
│   └── alembic.ini
├── frontend/              # Angular application
└── docker-compose.yml     # PostgreSQL container
```

## 🛠️ Development

### Testing the API

Use the interactive Swagger UI at http://localhost:8000/docs to test endpoints.

Or use curl:
```bash
# List games
curl http://localhost:8000/games/

# Get games for a team
curl http://localhost:8000/games/team/6

# Create a user
curl -X POST http://localhost:8000/users/ \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com"}'
```

### Code Quality

All schemas have been validated to match database models. The project follows:
- Repository pattern for data access
- Pydantic for request/response validation
- Type hints throughout
- Async/await for all database operations
