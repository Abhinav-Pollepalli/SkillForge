import json
from google import genai
from backend.llm.base import BaseLLM
import time
import logging
logger = logging.getLogger(__name__)


class GeminiLLM(BaseLLM):
    """
    Gemini implementation of the LLM interface.
    """

    def __init__(self,api_key: str,model: str = "gemini-3.1-flash-lite",):
        self.client = genai.Client(
            api_key=api_key
        )

        self.model = model

    def generate(self,prompt: str) -> dict:

        max_attempts = 3

        max_conn_attempts = 10
        attempt = 1

        while attempt <= max_conn_attempts:
            logger.info("Gemini connection attempt %s", attempt)
            try:
                response = (
                    self.client.models.generate_content(
                        model=self.model,
                        contents=prompt,
                    )
                )
                break
            except Exception as e:
                logger.exception("Gemini request failed")

                if "429" in str(e):
                    raise

                time.sleep(min(2 ** attempt, 30))
                attempt += 1
                

        if attempt > max_conn_attempts:
            raise ValueError(
                "Failed to obtain response from Gemini."
            )
        

        for attempt in range(max_attempts):

            try:
                return json.loads(
                    response.text
                )
            
            except json.JSONDecodeError:

                logger.warning(
                    "JSON parsing failed. Retry %s/%s",
                    attempt + 1,
                    max_attempts,
                )

                time.sleep(1)
                response = (
                    self.client.models.generate_content(
                        model=self.model,
                        contents=prompt,
                    )
                )

        raise ValueError(
            "Failed to obtain valid JSON from Gemini."
        )