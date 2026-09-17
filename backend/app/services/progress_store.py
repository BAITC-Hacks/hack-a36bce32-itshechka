import asyncio
import json
from datetime import UTC, datetime
from typing import Any

from app.core.database import database


class ProgressStore:
    async def get(self, lecture_id: str, user_id: str) -> dict[str, Any]:
        row = await asyncio.to_thread(
            database.fetch_one,
            "SELECT * FROM study_progress WHERE lecture_id = ? AND user_id = ?",
            (lecture_id, user_id),
        )
        if not row:
            return {"quizAnswers": {}, "quizCompleted": False, "difficultCards": []}
        return {
            "quizAnswers": json.loads(row["quiz_answers_json"]),
            "quizCompleted": bool(row["quiz_completed"]),
            "difficultCards": json.loads(row["difficult_cards_json"]),
        }

    async def save(self, lecture_id: str, user_id: str, progress: dict[str, Any]) -> dict[str, Any]:
        await asyncio.to_thread(
            database.execute,
            """
            INSERT INTO study_progress
                (lecture_id, user_id, quiz_answers_json, quiz_completed, difficult_cards_json, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(lecture_id, user_id) DO UPDATE SET
                quiz_answers_json = excluded.quiz_answers_json,
                quiz_completed = excluded.quiz_completed,
                difficult_cards_json = excluded.difficult_cards_json,
                updated_at = excluded.updated_at
            """,
            (
                lecture_id,
                user_id,
                json.dumps(progress["quizAnswers"]),
                int(progress["quizCompleted"]),
                json.dumps(progress["difficultCards"]),
                datetime.now(UTC).isoformat(),
            ),
        )
        return progress


progress_store = ProgressStore()
