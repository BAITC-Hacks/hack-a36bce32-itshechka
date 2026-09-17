import asyncio
from datetime import UTC, datetime
from uuid import uuid4

from app.core.security import hash_password
from app.services.user_store import user_store


DEMO_USER = {
    "name": "Demo Student",
    "email": "demo@lectora.kz",
    "password": "Demo1234!",
}


async def seed() -> None:
    await user_store.upsert(
        {
            "id": str(uuid4()),
            "name": DEMO_USER["name"],
            "email": DEMO_USER["email"],
            "password_hash": hash_password(DEMO_USER["password"]),
            "created_at": datetime.now(UTC).isoformat(),
        }
    )
    print("Demo user created or refreshed")
    print(f"Email: {DEMO_USER['email']}")
    print(f"Password: {DEMO_USER['password']}")


if __name__ == "__main__":
    asyncio.run(seed())
