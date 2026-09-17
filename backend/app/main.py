from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.core.config import API_PREFIX, CLIENT_ORIGIN


app = FastAPI(title="HackAlem AI API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(f"{API_PREFIX}/health", tags=["system"])
async def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth_router, prefix=API_PREFIX)

