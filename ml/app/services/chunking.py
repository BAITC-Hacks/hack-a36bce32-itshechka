import re


def split_into_fragments(text: str, target_size: int = 1400) -> list[str]:
    normalized = re.sub(r"[ \t]+", " ", text).strip()
    paragraphs = [part.strip() for part in re.split(r"\n{2,}", normalized) if part.strip()]
    if len(paragraphs) == 1:
        paragraphs = [part.strip() for part in re.split(r"(?<=[.!?])\s+", normalized) if part.strip()]

    fragments: list[str] = []
    current: list[str] = []
    current_length = 0

    for paragraph in paragraphs:
        if current and current_length + len(paragraph) + 1 > target_size:
            fragments.append(" ".join(current))
            current = []
            current_length = 0
        current.append(paragraph)
        current_length += len(paragraph) + 1

    if current:
        fragments.append(" ".join(current))
    return fragments


def format_fragments(text: str) -> str:
    return "\n\n".join(
        f"[Фрагмент {index}]\n{fragment}"
        for index, fragment in enumerate(split_into_fragments(text), start=1)
    )

