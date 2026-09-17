from pydantic import BaseModel, ConfigDict, Field


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid", populate_by_name=True)


class LectureRequest(StrictModel):
    title: str = Field(default="Лекция", max_length=160)
    text: str = Field(min_length=200, max_length=120_000)


class SummarySection(StrictModel):
    title: str
    text: str
    source: str
    evidence: str


class KeyPoint(StrictModel):
    id: int
    text: str
    source: str
    evidence: str


class QuizQuestion(StrictModel):
    id: int
    question: str
    options: list[str]
    correct_index: int = Field(alias="correctIndex")
    explanation: str
    source: str
    evidence: str


class Flashcard(StrictModel):
    id: int
    front: str
    back: str
    source: str
    evidence: str


class LectureMaterials(StrictModel):
    summary: list[SummarySection]
    key_points: list[KeyPoint] = Field(alias="keyPoints")
    quiz: list[QuizQuestion]
    flashcards: list[Flashcard]
