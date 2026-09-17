from pydantic import BaseModel, ConfigDict, Field


class LectureProcessRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(default="Лекция", max_length=160)
    text: str = Field(min_length=200, max_length=120_000)


class StudyProgressRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    quizAnswers: dict[str, int] = Field(default_factory=dict)
    quizCompleted: bool = False
    difficultCards: list[int] = Field(default_factory=list)
