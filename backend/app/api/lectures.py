from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.api.auth import current_user
from app.schemas.lecture import LectureProcessRequest, StudyProgressRequest
from app.services.lecture_store import lecture_store
from app.services.ml_client import process_lecture
from app.services.progress_store import progress_store


router = APIRouter(prefix="/lectures", tags=["lectures"])


async def owned_lecture(lecture_id: str, user_id: str) -> dict:
    lecture = await lecture_store.get(lecture_id, user_id)
    if not lecture:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Лекция не найдена")
    return lecture


@router.get("")
async def list_lectures(user: Annotated[dict, Depends(current_user)]) -> dict:
    return {"lectures": await lecture_store.list(user["id"])}


@router.get("/{lecture_id}")
async def get_lecture(lecture_id: str, user: Annotated[dict, Depends(current_user)]) -> dict:
    return await owned_lecture(lecture_id, user["id"])


@router.post("/{lecture_id}/process")
async def create_materials(
    lecture_id: str,
    payload: LectureProcessRequest,
    user: Annotated[dict, Depends(current_user)],
) -> dict:
    lecture = await lecture_store.upsert_processing(lecture_id, user["id"], payload.title, payload.text)
    if not lecture:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Идентификатор лекции уже используется")
    try:
        materials = await process_lecture(payload)
        await lecture_store.complete(lecture_id, user["id"], materials)
        return materials
    except HTTPException as error:
        await lecture_store.fail(lecture_id, user["id"], str(error.detail))
        raise


@router.delete("/{lecture_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lecture(lecture_id: str, user: Annotated[dict, Depends(current_user)]) -> Response:
    await owned_lecture(lecture_id, user["id"])
    await lecture_store.delete(lecture_id, user["id"])
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/{lecture_id}/progress")
async def get_progress(lecture_id: str, user: Annotated[dict, Depends(current_user)]) -> dict:
    await owned_lecture(lecture_id, user["id"])
    return await progress_store.get(lecture_id, user["id"])


@router.put("/{lecture_id}/progress")
async def save_progress(
    lecture_id: str,
    payload: StudyProgressRequest,
    user: Annotated[dict, Depends(current_user)],
) -> dict:
    await owned_lecture(lecture_id, user["id"])
    return await progress_store.save(lecture_id, user["id"], payload.model_dump())
