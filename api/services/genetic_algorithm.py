import numpy as np

from models import NeuralNetwork


def gen_alg(data: NeuralNetwork):
    X = np.array([data.features], dtype=np.float32)
    gen = [ 2.27884826,  0.8265534 , -0.92109432, -0.79460366, -1.16898315]
    prediction = X @ gen
    return  prediction