import asyncio
import json
from datetime import UTC, datetime
from typing import Any

from app.core.database import database


def serialize_lecture(row: dict[str, Any], include_text: bool = True) -> dict[str, Any]:
    lecture = {
        "id": row["id"],
        "title": row["title"],
        "status": row["status"],
        "wordCount": row["word_count"],
        "createdAt": row["created_at"],
        "error": row["error"],
    }
    if include_text:
        lecture["text"] = row["text"]
    lecture["materials"] = json.loads(row["materials_json"]) if row["materials_json"] else None
    return lecture


class LectureStore:
    async def upsert_processing(self, lecture_id: str, user_id: str, title: str, text: str) -> dict[str, Any] | None:
        created_at = datetime.now(UTC).isoformat()
        word_count = len(text.split())
        await asyncio.to_thread(
            database.execute,
            """
            INSERT INTO lectures (id, user_id, title, text, status, word_count, created_at)
            VALUES (?, ?, ?, ?, 'processing', ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                title = excluded.title,
                text = excluded.text,
                status = 'processing',
                word_count = excluded.word_count,
                error = NULL
            WHERE lectures.user_id = excluded.user_id
            """,
            (lecture_id, user_id, title, text, word_count, created_at),
        )
        return await self.get(lecture_id, user_id)

    async def complete(self, lecture_id: str, user_id: str, materials: dict) -> None:
        await asyncio.to_thread(
            database.execute,
            "UPDATE lectures SET status = 'completed', materials_json = ?, error = NULL WHERE id = ? AND user_id = ?",
            (json.dumps(materials, ensure_ascii=False), lecture_id, user_id),
        )

    async def fail(self, lecture_id: str, user_id: str, error: str) -> None:
        await asyncio.to_thread(
            database.execute,
            "UPDATE lectures SET status = 'failed', error = ? WHERE id = ? AND user_id = ?",
            (error, lecture_id, user_id),
        )

    async def get(self, lecture_id: str, user_id: str) -> dict[str, Any] | None:
        row = await asyncio.to_thread(
            database.fetch_one,
            "SELECT * FROM lectures WHERE id = ? AND user_id = ?",
            (lecture_id, user_id),
        )
        return serialize_lecture(row) if row else None

    async def list(self, user_id: str) -> list[dict[str, Any]]:
        rows = await asyncio.to_thread(
            database.fetch_all,
            "SELECT * FROM lectures WHERE user_id = ? ORDER BY created_at DESC",
            (user_id,),
        )
        return [serialize_lecture(row) for row in rows]

    async def delete(self, lecture_id: str, user_id: str) -> None:
        await asyncio.to_thread(
            database.execute,
            "DELETE FROM lectures WHERE id = ? AND user_id = ?",
            (lecture_id, user_id),
        )


lecture_store = LectureStore()
