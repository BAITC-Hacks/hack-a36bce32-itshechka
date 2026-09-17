from fastapi import APIRouter, HTTPException, status

from app.schemas.materials import LectureMaterials, LectureRequest
from app.services.generator import generate_materials


router = APIRouter(tags=["generation"])


@router.post("/generate", response_model=LectureMaterials, response_model_by_alias=True)
async def generate(payload: LectureRequest) -> LectureMaterials:
    try:
        return await generate_materials(payload)
    except RuntimeError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Модель не смогла сформировать материалы. Повторите попытку.",
        ) from error

