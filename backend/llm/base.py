class BaseLLM:

    def generate(
        self,
        prompt: str
    ) -> dict:
        raise NotImplementedError