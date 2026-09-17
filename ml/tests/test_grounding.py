import pytest

from app.schemas.materials import LectureMaterials
from app.services.grounding import GroundingError, validate_grounding


def materials(evidence: str, source: str = "Фрагмент 1") -> LectureMaterials:
    citation = {"source": source, "evidence": evidence}
    return LectureMaterials.model_validate(
        {
            "summary": [{"title": "Тема", "text": "Объяснение", **citation}],
            "keyPoints": [{"id": 1, "text": "Тезис", **citation}],
            "quiz": [{"id": 1, "question": "Вопрос?", "options": ["Да", "Нет"], "correctIndex": 0, "explanation": "Ответ", **citation}],
            "flashcards": [{"id": 1, "front": "Термин", "back": "Ответ", **citation}],
        }
    )


def test_grounding_accepts_exact_evidence() -> None:
    validate_grounding(materials("модель находит закономерности"), ["Алгоритм обучается, а модель находит закономерности в данных."])


def test_grounding_rejects_invented_evidence() -> None:
    with pytest.raises(GroundingError):
        validate_grounding(materials("этого в лекции не было"), ["Модель находит закономерности в данных."])
