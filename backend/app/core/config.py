from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "Photonica bez prostoev"
    environment: str = "development"
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5433/photonica"
    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 14
    cors_origins: list[str] = ["http://localhost:5175", "http://127.0.0.1:5175"]
    upload_dir: str = "./uploads"
    max_upload_size_mb: int = 20


settings = Settings()