from pydantic import BaseModel, Field

from backend.schemas.planner import Module


class CriticOutput(BaseModel):
    modules: list[Module] = Field(
        min_length=1,
        max_length=10
    )

    critic_notes: list[str] = Field(
        min_length=1
    )