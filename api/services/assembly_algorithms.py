import pickle

from pathlib import Path

import pandas as pd

BASE_DIR = Path(__file__).resolve(strict=True).parent

with open(f"{BASE_DIR}/models/voting_regressor_trained-0.1.0.pkl", "rb") as f:
    voting_model = pickle.load(f)

with open(f"{BASE_DIR}/models/bagging_regressor_trained-0.1.0.pkl", "rb") as f:
    bagging_model = pickle.load(f)


def voting_predict(data: pd.DataFrame):
    return voting_model.predict(data)


def bagging_predict(data: pd.DataFrame):
    return bagging_model.predict(data)