from fastapi import FastAPI

from app.api.generate import router as generate_router
from app.core.config import GROQ_API_KEY, GROQ_MODEL


app = FastAPI(title="HackAlem AI ML service", version="0.1.0")


@app.get("/health", tags=["system"])
async def health() -> dict[str, str | bool]:
    return {"status": "ok", "provider": "groq", "model": GROQ_MODEL, "configured": bool(GROQ_API_KEY)}


app.include_router(generate_router)

