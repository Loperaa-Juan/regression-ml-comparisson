import pandas as pd
from fastapi import FastAPI

from models import AssembleInput, NeuralNetwork
from services.assembly_algorithms import bagging_predict, voting_predict
from services.neural_network import nn_predict

app = FastAPI()


@app.get("/")
def home():
    return {"health_check": "OK"}


@app.post("/predict/NeuralNetwork")
def neural_network(data: NeuralNetwork):
    prediction = nn_predict(data)
    return {"prediction": prediction.tolist()}


@app.post("/predict/voting")
def voting(data: AssembleInput):
    prediction = voting_predict(pd.DataFrame([data.model_dump()]))
    return {"prediction": prediction.tolist()}


@app.post("/predict/bagging")
def bagging(data: AssembleInput):
    prediction = bagging_predict(pd.DataFrame([data.model_dump()]))
    return {"prediction": prediction.tolist()}
