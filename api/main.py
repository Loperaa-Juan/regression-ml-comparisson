import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import AssembleInput, NeuralNetwork
from services.assembly_algorithms import bagging_predict, voting_predict
from services.genetic_algorithm import gen_alg
from services.neural_network import nn_predict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

@app.post('/predict/GeneticAlgorithm')
def genetic_algorithm(data: NeuralNetwork):
    prediction = gen_alg(data)
    return {"prediction": prediction.tolist()}