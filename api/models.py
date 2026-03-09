from pydantic import BaseModel


class NeuralNetwork(BaseModel):
    features: list[float]


class AssembleInput(BaseModel):
    hours_studied: float
    previous_scores: float
    extracurricular_activities: float
    sleep_hours: float
    sample_question_papers: float
