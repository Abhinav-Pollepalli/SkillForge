

from pathlib import Path

from backend.llm.base import BaseLLM
from backend.schemas.planner import PlannerOutput


class PlannerService:
    
    def __init__(self,llm: BaseLLM):
        self.llm = llm

    def generate(self, topic: str, experience_level: str) -> PlannerOutput:

        prompt = self._build_prompt(
            topic,
            experience_level
        )

        response = self.llm.generate(
            prompt
        )

        return PlannerOutput.model_validate(
            response
        )

    def _build_prompt(
        self,
        topic: str,
        experience_level: str
    ) -> str:

        prompt_path = Path(
            "backend/prompts/planner.txt"
        )

        template = prompt_path.read_text()

        return template.format(
            topic=topic,    
            experience_level=experience_level
        )