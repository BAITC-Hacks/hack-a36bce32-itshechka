import re

from app.schemas.materials import LectureMaterials


class GroundingError(ValueError):
    pass


def normalize(text: str) -> str:
    return re.sub(r"[^\w]+", " ", text.lower(), flags=re.UNICODE).strip()


def referenced_items(materials: LectureMaterials) -> list:
    return [*materials.summary, *materials.key_points, *materials.quiz, *materials.flashcards]


def validate_grounding(materials: LectureMaterials, fragments: list[str]) -> None:
    errors: list[str] = []
    for item in referenced_items(materials):
        match = re.fullmatch(r"Фрагмент\s+(\d+)", item.source.strip(), flags=re.IGNORECASE)
        if not match:
            errors.append(f"Некорректная ссылка: {item.source}")
            continue
        fragment_index = int(match.group(1)) - 1
        if fragment_index < 0 or fragment_index >= len(fragments):
            errors.append(f"Несуществующая ссылка: {item.source}")
            continue
        evidence = normalize(item.evidence)
        fragment = normalize(fragments[fragment_index])
        if len(evidence.split()) < 3 or evidence not in fragment:
            errors.append(f"Цитата не найдена в {item.source}: {item.evidence[:60]}")

    if errors:
        raise GroundingError("; ".join(errors[:5]))
