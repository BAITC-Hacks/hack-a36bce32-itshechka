from datetime import UTC, datetime
from typing import Annotated
from uuid import uuid4

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)
from app.schemas.auth import AuthResponse, LoginRequest, ProfileResponse, RegisterRequest, UserResponse
from app.services.user_store import user_store


router = APIRouter(prefix="/auth", tags=["auth"])
bearer = HTTPBearer(auto_error=False)


def public_user(user: dict) -> UserResponse:
    return UserResponse(id=user["id"], name=user["name"], email=user["email"])


async def current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)],
) -> dict:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Требуется авторизация")

    try:
        payload = decode_access_token(credentials.credentials)
    except jwt.PyJWTError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Сессия истекла или недействительна",
        ) from error

    user = await user_store.find_by_id(payload.get("sub", ""))
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Пользователь не найден")
    return user


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterRequest) -> AuthResponse:
    if await user_store.find_by_email(str(payload.email)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь уже существует")

    user = await user_store.create(
        {
            "id": str(uuid4()),
            "name": payload.name,
            "email": str(payload.email),
            "password_hash": hash_password(payload.password),
            "created_at": datetime.now(UTC).isoformat(),
        }
    )
    if user is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Пользователь уже существует")

    return AuthResponse(token=create_access_token(user["id"], user["email"]), user=public_user(user))


@router.post("/login", response_model=AuthResponse)
async def login(payload: LoginRequest) -> AuthResponse:
    user = await user_store.find_by_email(str(payload.email))
    if user is None or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный email или пароль")

    return AuthResponse(token=create_access_token(user["id"], user["email"]), user=public_user(user))


@router.get("/me", response_model=ProfileResponse)
async def me(user: Annotated[dict, Depends(current_user)]) -> ProfileResponse:
    return ProfileResponse(user=public_user(user))

