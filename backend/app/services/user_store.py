import asyncio
from typing import Any

from app.core.database import database


class UserStore:
    async def find_by_email(self, email: str) -> dict[str, Any] | None:
        return await asyncio.to_thread(database.fetch_one, "SELECT * FROM users WHERE email = ?", (email,))

    async def find_by_id(self, user_id: str) -> dict[str, Any] | None:
        return await asyncio.to_thread(database.fetch_one, "SELECT * FROM users WHERE id = ?", (user_id,))

    async def create(self, user: dict[str, Any]) -> dict[str, Any] | None:
        if await self.find_by_email(user["email"]):
            return None
        try:
            await asyncio.to_thread(
                database.execute,
                "INSERT INTO users (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)",
                (user["id"], user["name"], user["email"], user["password_hash"], user["created_at"]),
            )
        except Exception:
            return None
        return user

    async def upsert(self, user: dict[str, Any]) -> dict[str, Any]:
        await asyncio.to_thread(
            database.execute,
            """
            INSERT INTO users (id, name, email, password_hash, created_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(email) DO UPDATE SET
                name = excluded.name,
                password_hash = excluded.password_hash
            """,
            (user["id"], user["name"], user["email"], user["password_hash"], user["created_at"]),
        )
        return user


user_store = UserStore()
