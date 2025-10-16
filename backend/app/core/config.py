from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str
    ENVIRONMENT: str
    DATABASE_URL: str
    SECRET_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()