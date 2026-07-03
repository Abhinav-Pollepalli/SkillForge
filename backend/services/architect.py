from pathlib import Path

from backend.llm.base import BaseLLM

from backend.schemas.planner import PlannerOutput
from backend.schemas.critic import CriticOutput
from backend.schemas.curriculum import CurriculumOutput


class ArchitectService:
    """
    Builds the final curriculum blueprint.
    """

    def __init__(
        self,
        llm: BaseLLM
    ):
        self.llm = llm

    def build(
        self,
        planner_output: PlannerOutput,
        critic_output: CriticOutput,
    ) -> CurriculumOutput:

        prompt = self._build_prompt(
            planner_output,
            critic_output,
        )

        response = self.llm.generate(
            prompt
        )

        return CurriculumOutput.model_validate(
            response
        )

    def _build_prompt(
        self,
        planner_output: PlannerOutput,
        critic_output: CriticOutput,
    ) -> str:

        prompt_path = Path(
            "backend/prompts/architect.txt"
        )

        template = prompt_path.read_text()

        return template.format(
            planner_output=planner_output.model_dump_json(
                indent=2
            ),
            critic_output=critic_output.model_dump_json(
                indent=2
            ),
        )