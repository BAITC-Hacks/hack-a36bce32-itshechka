from pathlib import Path

from fastapi.testclient import TestClient

from app.main import app
from app.services.user_store import user_store


client = TestClient(app)


def test_auth_flow(tmp_path: Path) -> None:
    user_store.data_file = tmp_path / "users.json"
    credentials = {
        "name": "Demo Student",
        "email": "demo@example.com",
        "password": "password123",
    }

    registration = client.post("/api/auth/register", json=credentials)
    assert registration.status_code == 201
    assert registration.json()["user"]["email"] == credentials["email"]

    login = client.post("/api/auth/login", json=credentials)
    assert login.status_code == 200
    token = login.json()["token"]

    profile = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert profile.status_code == 200
    assert profile.json()["user"]["name"] == credentials["name"]


def test_health() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

