from pydantic import BaseModel, Field


class CurriculumModule(BaseModel):
    """
    Final curriculum module shown to users.
    """

    title: str

    topics: list[str] = Field(
        min_length=1,
        max_length=5
    )

    objectives: list[str] = Field(
        min_length=1,
        max_length=3
    )

    exercises: list[str] = Field(
        min_length=3
    )

    projects: list[str] = Field(
        min_length=3
    )

    estimated_hours: int = Field(
        gt=0
    )


class CurriculumOutput(BaseModel):
    """
    Final curriculum blueprint produced
    by the Architect stage.
    """

    modules: list[CurriculumModule] = Field(
        min_length=1,
        max_length=10
    )