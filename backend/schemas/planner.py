from pydantic import BaseModel, Field



class Module(BaseModel):
 
    title: str = Field(
        min_length=1,
        max_length=100
    )

    topics: list[str] = Field(
        min_length=1,
        max_length=5
    )


class PlannerOutput(BaseModel):
 

    modules: list[Module] = Field(
        min_length=1,
        max_length=10
    )