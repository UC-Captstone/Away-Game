from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    project_name: str = "Away-Game"
    app_env: str = "dev"

    database_url: str
    database_url_async: str

    clerk_secret_key: str
    clerk_domain: str

    class Config:
        env_file = ".env"

settings = Settings()
