from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    project_name: str = "Away-Game"
    app_env: str = "dev"

    database_url: str
    database_url_async: str

    secret_key: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
