import asyncio
import json
import os
from pathlib import Path
from typing import Any

from app.core.config import USER_DATA_FILE


class UserStore:
    def __init__(self, data_file: Path | None = None) -> None:
        self.data_file = data_file or USER_DATA_FILE
        self._lock = asyncio.Lock()

    async def _read(self) -> list[dict[str, Any]]:
        try:
            return json.loads(await asyncio.to_thread(self.data_file.read_text, encoding="utf-8"))
        except FileNotFoundError:
            return []

    async def _write(self, users: list[dict[str, Any]]) -> None:
        await asyncio.to_thread(self.data_file.parent.mkdir, parents=True, exist_ok=True)
        temporary_file = self.data_file.with_suffix(".tmp")
        content = json.dumps(users, ensure_ascii=False, indent=2)
        await asyncio.to_thread(temporary_file.write_text, content, encoding="utf-8")
        await asyncio.to_thread(os.replace, temporary_file, self.data_file)

    async def find_by_email(self, email: str) -> dict[str, Any] | None:
        users = await self._read()
        return next((user for user in users if user["email"] == email), None)

    async def find_by_id(self, user_id: str) -> dict[str, Any] | None:
        users = await self._read()
        return next((user for user in users if user["id"] == user_id), None)

    async def create(self, user: dict[str, Any]) -> dict[str, Any] | None:
        async with self._lock:
            users = await self._read()
            if any(item["email"] == user["email"] for item in users):
                return None
            users.append(user)
            await self._write(users)
            return user


user_store = UserStore()

