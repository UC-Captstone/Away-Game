# Away-Game

Full-stack Angular/FastAPI web app for traveling sports fans. Integrates ESPN API for game data, safety alerts, and fan meetups. Dockerized with PostgreSQL backend and Clerk auth.

### Prerequisites

- Python 3.11+
- PostgreSQL 16
- Node.js 18+
- Azure account

## Tech Stack

### Frontend
- **Framework**: Angular 20
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **Maps**: Leaflet + OpenStreetMap tiles
- **Auth**: Clerk (UI/SDK)
- **State/Async**: RxJS
- **Testing**: Karma/Jasmine
- **Build**: Node.js/npm

### Backend
- **Framework**: FastAPI (ASGI)
- **Language**: Python 3.11+
- **ORM**: SQLAlchemy 2.0 (async)
- **Database Driver**: AsyncPG (PostgreSQL)
- **Validation**: Pydantic v2
- **Auth**: JWT (HS256)
- **Migrations**: Alembic
- **Hosting**: Azure Functions (Python)

### External APIs & Services
- **Auth**: Clerk
- **Maps**: OpenStreetMap (tiles), Leaflet (rendering)
- **Venues**: Foursquare Places API
- **City Search**: Geoapify Address Autocomplete API
- **Geolocation**: Browser Geolocation API + IP-based fallback
- **Game Data**: ESPN (game data)

### DevOps & Infrastructure
- **Containers**: Docker + Docker Compose
- **CI/CD**: GitHub Actions (Azure deployment)
- **Database**: PostgreSQL 16
- **Migrations**: Alembic
- **Environment**: `.env` + `load_env.sh`
- **CORS**: Configured middleware

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

   # Auth (Clerk + Internal JWT)
   JWT_SECRET_KEY=your-secret-key-here

   # External APIs
   FOURSQUARE_API_KEY=your-foursquare-key
   GEOAPIFY_API_KEY=your-geoapify-key
   ```

   Load env vars for local testing:
   ```bash
   cd Away-Game/backend
   . ./load_env.sh
   ```

5. **Start the FastAPI server (must be in backend directory)**
   ```bash
   # Development mode with auto-reload
   python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

   # Production mode
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

6. **Access the API**
   - **API Documentation (Swagger)**: http://localhost:8000/docs
   - **OpenAPI Schema**: http://localhost:8000/openapi.json

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd Away-Game/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Clerk**
   - Add Clerk publishable key to your environment configuration

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - http://localhost:4200

## Map & Location Features

### User Location
- **Browser Geolocation**: Prompts user for permission on home page load
- **Caching**: Location stored in `sessionStorage` to avoid repeated prompts
- **Fallback**: IP-based geolocation via backend endpoint if browser permission denied
- **Default**: Falls back to Cincinnati, OH if all methods fail

### Mini-Map (Home Page)
- **Library**: Leaflet with OpenStreetMap tiles
- **Center**: User's current location
- **Markers**: Shows 2-3 nearby events within 50-mile radius
- **Features**: Interactive pan/zoom, "You are here" marker

### Full Map Page (Planned)
- **Venue Overlays**: Foursquare Places API for restaurants, bars, etc.
- **Event Markers**: All nearby games and fan meetups
- **City Search**: Geoapify autocomplete for manual location input
- **Filters**: Event types, distance radius, venue categories

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

## Project Structure

```
Away-Game/
├── backend/
│   ├── app/
│   │   ├── core/          # Configuration & middleware
│   │   ├── db/            # Database session setup
│   │   ├── models/        # SQLAlchemy ORM models
│   │   ├── schemas/       # Pydantic schemas (DTOs)
│   │   ├── repositories/  # Data access layer
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Business logic
│   │   ├── auth.py        # JWT utilities
│   │   └── main.py        # FastAPI app
│   ├── migrations/        # Alembic migrations
│   ├── requirements.txt
│   └── alembic.ini
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Guards, interceptors
│   │   │   ├── shared/    # Services, models, components
│   │   │   └── features/  # Feature modules (auth, home, etc.)
│   │   └── assets/        # Static files (Leaflet markers, etc.)
│   ├── angular.json
│   └── package.json
└── docker-compose.yml     # PostgreSQL container
```

## Development

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

The project follows:
- Repository pattern for data access
- Pydantic for request/response validation
- Type hints throughout
- Async/await for all database operations
- RxJS best practices (observables, operators)
- Angular standalone components