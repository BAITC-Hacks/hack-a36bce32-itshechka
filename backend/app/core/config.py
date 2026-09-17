import os
from pathlib import Path

from dotenv import load_dotenv


BACKEND_DIR = Path(__file__).resolve().parents[2]
PROJECT_DIR = BACKEND_DIR.parent
load_dotenv(PROJECT_DIR / ".env")

API_PREFIX = "/api"
CLIENT_ORIGIN = os.getenv("CLIENT_ORIGIN", "http://localhost:3000")
JWT_SECRET = os.getenv("JWT_SECRET", "local-development-secret-change-me-32-chars")
JWT_ALGORITHM = "HS256"
JWT_EXPIRES_MINUTES = int(os.getenv("JWT_EXPIRES_MINUTES", "10080"))
_database_value = os.getenv("DATABASE_PATH")
DATABASE_PATH = Path(_database_value) if _database_value else BACKEND_DIR / "data" / "app.db"
if not DATABASE_PATH.is_absolute():
    DATABASE_PATH = PROJECT_DIR / DATABASE_PATH
ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8001")
