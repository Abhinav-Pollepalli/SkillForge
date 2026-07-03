from pathlib import Path

from backend.llm.base import BaseLLM
import json

from backend.schemas.planner import PlannerOutput
from backend.schemas.critic import CriticOutput


class CriticService:
    """
    Reviews and improves the curriculum roadmap.
    """

    def __init__(
        self,
        llm: BaseLLM
    ):
        self.llm = llm

    def review(
        self,
        planner_output: PlannerOutput
    ) -> CriticOutput:

        prompt = self._build_prompt(
            planner_output
        )

        response = self.llm.generate(
            prompt
        )



        response = self.llm.generate(
            prompt
        )


        return CriticOutput.model_validate(
            response
        )

    def _build_prompt(
        self,
        planner_output: PlannerOutput
    ) -> str:

        prompt_path = Path(
            "backend/prompts/critic.txt"
        )

        template = prompt_path.read_text()

        return template.format(
            roadmap=planner_output.model_dump_json(
                indent=2
            )
        )