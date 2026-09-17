from pathlib import Path

from fastapi.testclient import TestClient

from app.api import lectures as lectures_api
from app.core.database import database
from app.main import app


client = TestClient(app)


def test_authorized_user_can_request_materials(monkeypatch, tmp_path: Path) -> None:
    database.path = tmp_path / "app.db"
    credentials = {
        "name": "Lecture Student",
        "email": "lecture@example.com",
        "password": "password123",
    }
    registration = client.post("/api/auth/register", json=credentials)
    token = registration.json()["token"]
    expected = {"summary": [], "keyPoints": [], "quiz": [], "flashcards": []}

    async def fake_process(payload):
        assert payload.title == "Тестовая лекция"
        assert len(payload.text) >= 200
        return expected

    monkeypatch.setattr(lectures_api, "process_lecture", fake_process)
    response = client.post(
        "/api/lectures/lecture-1/process",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Тестовая лекция", "text": "Содержание лекции. " * 20},
    )

    assert response.status_code == 200
    assert response.json() == expected

    history = client.get("/api/lectures", headers={"Authorization": f"Bearer {token}"})
    assert history.status_code == 200
    assert history.json()["lectures"][0]["status"] == "completed"

    progress = {"quizAnswers": {"1": 2}, "quizCompleted": True, "difficultCards": [3]}
    saved = client.put(
        "/api/lectures/lecture-1/progress",
        headers={"Authorization": f"Bearer {token}"},
        json=progress,
    )
    assert saved.status_code == 200
    assert saved.json() == progress
