# app/main.py
from fastapi import FastAPI
from app.db.session import init_db

app = FastAPI(title="Away-Game API")

@app.on_event("startup")
async def _startup() -> None:
    await init_db()
    print("Database initialized.")