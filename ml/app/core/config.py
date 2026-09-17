import os
from pathlib import Path

from dotenv import load_dotenv


ML_DIR = Path(__file__).resolve().parents[2]
load_dotenv(ML_DIR / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
GROQ_TIMEOUT_SECONDS = float(os.getenv("GROQ_TIMEOUT_SECONDS", "90"))

