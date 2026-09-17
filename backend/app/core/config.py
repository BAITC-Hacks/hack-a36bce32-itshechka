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
USER_DATA_FILE = Path(os.getenv("USER_DATA_FILE", BACKEND_DIR / "data" / "users.json"))
