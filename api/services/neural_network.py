import numpy as np
import onnxruntime as ort

from pathlib import Path

from models import NeuralNetwork
BASE_DIR = Path(__file__).resolve(strict=True).parent

session = ort.InferenceSession(f'{BASE_DIR}/models/nn_model.onnx')

input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name


def nn_predict(data: NeuralNetwork):
    X = np.array([data.features], dtype=np.float32)

    prediction = session.run([output_name], {input_name: X})[0]
    return prediction
