from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME, version="0.1.0")

@app.get("/")
async def root():
    return {"message": "Backend is running successfully"}