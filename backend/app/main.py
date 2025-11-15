from fastapi import FastAPI
from app.db.session import init_db
from app.routes import games, users, teams, user_favorite_teams, favorites

app = FastAPI(title="Away-Game API")

app.include_router(games.router)
app.include_router(users.router)
app.include_router(teams.router)
app.include_router(user_favorite_teams.router)
app.include_router(favorites.router)

@app.on_event("startup")
async def _startup() -> None:
    await init_db()
    print("Database initialized.")