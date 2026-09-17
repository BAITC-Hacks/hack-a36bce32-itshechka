import httpx
from fastapi import HTTPException, status

from app.core.config import ML_SERVICE_URL
from app.schemas.lecture import LectureProcessRequest


async def process_lecture(payload: LectureProcessRequest) -> dict:
    try:
        async with httpx.AsyncClient(base_url=ML_SERVICE_URL, timeout=100) as client:
            response = await client.post("/generate", json=payload.model_dump())
    except httpx.RequestError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Сервис генерации временно недоступен",
        ) from error

    if response.is_error:
        try:
            detail = response.json().get("detail")
        except ValueError:
            detail = None
        raise HTTPException(
            status_code=response.status_code,
            detail=detail or "Не удалось обработать лекцию",
        )
    return response.json()

