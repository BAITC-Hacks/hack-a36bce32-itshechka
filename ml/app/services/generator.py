import asyncio
import json

from groq import Groq

from app.core.config import GROQ_API_KEY, GROQ_MODEL, GROQ_TIMEOUT_SECONDS
from app.schemas.materials import LectureMaterials, LectureRequest
from app.services.chunking import split_into_fragments
from app.services.grounding import GroundingError, validate_grounding


SYSTEM_PROMPT = """Ты создаёшь учебные материалы строго по предоставленной лекции.
Запрещено добавлять факты из общих знаний, догадки или сведения, которых нет во входном тексте.
Каждый элемент результата должен содержать source в формате «Фрагмент N» и evidence — короткую ДОСЛОВНУЮ цитату из этого фрагмента.
В тесте должен быть ровно один правильный вариант, а explanation должен объяснять ответ только по лекции.
Карточки должны охватывать разные ключевые темы. Пиши ясно и кратко на языке исходной лекции.
Если информации недостаточно, создай меньше элементов, но не выдумывай содержание."""


def _call_model(client: Groq, payload: LectureRequest, fragments: list[str], feedback: str = "") -> LectureMaterials:
    schema = LectureMaterials.model_json_schema(by_alias=True)
    formatted_fragments = "\n\n".join(
        f"[Фрагмент {index}]\n{fragment}" for index, fragment in enumerate(fragments, start=1)
    )
    completion = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": (
                    f"Название лекции: {payload.title}\n\n"
                    "Создай конспект, основные тезисы, 5–10 тестовых вопросов и 8–15 карточек. "
                    "Используй только пронумерованные фрагменты ниже. Для каждого элемента скопируй evidence "
                    "дословно из указанного source, не перефразируя цитату.\n"
                    f"{feedback}\n\n{formatted_fragments}"
                ),
            },
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "lecture_materials",
                "strict": True,
                "schema": schema,
            },
        },
    )
    content = completion.choices[0].message.content
    if not content:
        raise RuntimeError("Groq вернул пустой ответ")
    return LectureMaterials.model_validate(json.loads(content))


def _generate_sync(payload: LectureRequest) -> LectureMaterials:
    if not GROQ_API_KEY:
        raise RuntimeError("GROQ_API_KEY не настроен в ml/.env")

    client = Groq(api_key=GROQ_API_KEY, timeout=GROQ_TIMEOUT_SECONDS)
    fragments = split_into_fragments(payload.text)
    feedback = ""
    for _attempt in range(2):
        materials = _call_model(client, payload, fragments, feedback)
        try:
            validate_grounding(materials, fragments)
            return materials
        except GroundingError as error:
            feedback = f"Предыдущая попытка не прошла проверку цитат: {error}. Исправь все source и evidence."
    raise RuntimeError("Материалы не прошли проверку достоверности по исходной лекции")


async def generate_materials(payload: LectureRequest) -> LectureMaterials:
    return await asyncio.to_thread(_generate_sync, payload)
