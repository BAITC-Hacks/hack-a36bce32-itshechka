from app.schemas.materials import LectureMaterials
from app.services.chunking import format_fragments, split_into_fragments


def test_long_text_is_split_into_numbered_fragments() -> None:
    text = "Первое предложение. " * 160
    fragments = split_into_fragments(text, target_size=300)
    formatted = format_fragments(text)

    assert len(fragments) > 1
    assert "[Фрагмент 1]" in formatted
    assert f"[Фрагмент {len(split_into_fragments(text))}]" in formatted


def test_material_schema_uses_frontend_field_names() -> None:
    schema = LectureMaterials.model_json_schema(by_alias=True)
    properties = schema["properties"]

    assert "keyPoints" in properties
    quiz_reference = schema["$defs"]["QuizQuestion"]["properties"]
    assert "correctIndex" in quiz_reference

