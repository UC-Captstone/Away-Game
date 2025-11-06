import os
from sqlalchemy import create_engine, text

url = os.getenv("DATABASE_URL")
if not url:
    raise RuntimeError("DATABASE_URL not found in environment")

print(f"Testing connection to: {url}")
engine = create_engine(url)

try:
    with engine.connect() as conn:
        version = conn.execute(text("SELECT version();")).scalar_one()
        print("connected")
        print("Postgres version:", version)
except Exception as e:
    print(f"Connection failed: {e}")