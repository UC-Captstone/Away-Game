# Away-Game

Full-stack Angular/FastAPI web app for traveling sports fans. Integrates ESPN API for game data, safety alerts, and fan meetups. Dockerized with PostgreSQL backend and Clerk auth.

### Prerequisites

- Python 3.11+
- PostgreSQL 16
- Node.js 18+
- Azure account (for cloud deployment)
- Azure Functions Core Tools v4 (for local backend runtime)

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
- **Geolocation**: Browser Geolocation API + IP-based fallback
- **Game Data**: ESPN (game data)

### DevOps & Infrastructure
- **Containers**: Docker + Docker Compose
- **CI/CD**: GitHub Actions (Azure deployment)
- **Database**: PostgreSQL 16
- **Migrations**: Alembic
- **Environment**: `.env`/`local.settings.json` + `load_env.sh`
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
   pip install -r app/requirements.txt
   ```

4. **Configure environment variables**

   We use Clerk for identity and issue our own internal JWT after sync. Configure the following env vars.

   Where to put `.env` (pick one):
   - Recommended: keep `.env` at the repo root and load it via the helper script.
   - Or: place a `.env` inside `backend/` and load it explicitly.

   Example `.env` contents:
   ```env
   # Project
   PROJECT_NAME=Away-Game
   APP_ENV=dev

   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/awaygame
   DATABASE_URL_ASYNC=postgresql+asyncpg://username:password@localhost:5432/awaygame

   # Auth (Clerk + Internal JWT)
   CLERK_SECRET_KEY=your-clerk-secret-key
   CLERK_DOMAIN=your-clerk-domain
   JWT_SECRET_KEY=your-secret-key-here

   # External APIs
   FOURSQUARE_API_KEY=your-foursquare-key

   # Nightly ESPN scraper config (JSON string)
   LEAGUES_CONFIG=[{"league_code":"NFL","espn_sport":"football","espn_league":"nfl","league_name":"National Football League","is_active":true}]
   ```

   Load env vars for local testing:
   ```bash
   cd Away-Game/backend
   . ./load_env.sh ../.env
   ```

5. **Start the backend (Azure Functions host)**
   ```bash
   cd app
   func start
   ```

   Optional: run FastAPI directly (outside Functions host):
   ```bash
   cd backend/app
   python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

6. **Access the API**
   - **Functions host**: http://localhost:7071
   - **App routes base**: http://localhost:7071/api
   - **Swagger UI (when running `uvicorn`)**: http://localhost:8000/docs
   - **OpenAPI Schema (when running `uvicorn`)**: http://localhost:8000/openapi.json

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
- **Filters**: Event types, distance radius, venue categories

## Auth Flow

- Users sign in/up via Clerk UI (Angular).
- Frontend calls `POST /api/auth/sync` with the Clerk session token.
- Backend verifies Clerk JWT, syncs user (create/update), then issues an internal JWT (HS256) and returns `{ token, user }`.
- Frontend stores the internal JWT in `localStorage` and automatically sends `Authorization: Bearer <token>` on subsequent API calls via an HTTP interceptor.

Notes:
- Local dev works without extra setup (a dev default exists) but you should set `JWT_SECRET_KEY` in `.env`.
- In Azure, store secrets in Key Vault or App Settings and map to the env names above.

## Chat, Community & Notifications

### Event Chat
- **Event Chat Panel**: Event-based live chat is available on event/game experiences.
- **Near-real-time updates**: Uses REST polling on a short interval while the tab is visible.
- **Message actions**: Authenticated users can post and delete their own messages.
- **Safety filtering**: Chat text is passed through backend content filtering before persistence.
- **Social shortcut**: Clicking another user's avatar in event chat opens a friend-request flow.

### Community (Friends + Direct Messages)
- **Community workspace**: Dedicated page for friend management and one-on-one DMs.
- **Friend system**: Search users, send requests, accept/reject incoming requests, and remove friends.
- **Direct messages**: Private conversation threads with periodic refresh and soft-delete support.
- **Responsive UX**: Desktop shows friend list + chat side-by-side; mobile shifts to a focused single-pane view.

### Notifications
- **Unified bell menu**: Navbar bell combines unacknowledged safety alerts and new DM notifications.
- **DM notification model**: Tracks latest incoming message per friend and compares against per-user local seen timestamps.
- **Alert acknowledgement (official)**: Official alerts remain until explicitly acknowledged.
- **Alert acknowledgement (community/non-official)**: Non-official alerts are auto-acknowledged when the dropdown closes.
- **Quick actions**: "View messages" jumps to Community, and "Alert history" opens the alerts view.

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
│   │   ├── auth.py        # JWT utilities
│   │   ├── main.py        # FastAPI app
│   │   ├── function_app.py# Azure Functions entrypoint
│   │   └── scheduled/     # Nightly ESPN tasks
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

Use the interactive Swagger UI at http://localhost:8000/docs (when running `uvicorn`) to test endpoints.

Or use curl:
```bash
# List games
curl http://localhost:8000/api/games/

# Get games for a team
curl http://localhost:8000/api/games/team/6
```

### Code Quality

The project follows:
- Repository pattern for data access
- Pydantic for request/response validation
- Type hints throughout
- Async/await for all database operations
- RxJS best practices (observables, operators)
- Angular standalone components