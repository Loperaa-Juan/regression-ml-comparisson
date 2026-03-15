# 🎓 Student Performance Prediction — ML Regression Comparison

A machine learning project that **compares multiple regression approaches** (Neural Networks, Voting Regressor, Bagging Regressor) for predicting student academic performance. Includes Jupyter notebooks for exploratory analysis and model training, plus a **FastAPI REST API** and a **React frontend** to serve predictions in real time.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Models](#models)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)

---

## Overview

The goal of this project is to predict a student's **Performance Index** based on study habits and background features. Three distinct regression strategies are trained, evaluated, and compared:

| Model | Format | Library |
|---|---|---|
| **Neural Network** | ONNX | TensorFlow (Keras) → ONNX Runtime |
| **Voting Regressor** | Pickle | scikit-learn |
| **Bagging Regressor** | Pickle | scikit-learn |

All models are served through a unified FastAPI application, allowing consumers to call any model via a simple HTTP POST request.

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                      Client                            │
│              (curl / Postman / Frontend)                │
└──────────────────────┬─────────────────────────────────┘
                       │  HTTP POST (JSON)
                       ▼
┌────────────────────────────────────────────────────────┐
│                  FastAPI Application                   │
│                     (main.py)                          │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  POST /predict/NeuralNetwork                     │  │
│  │  POST /predict/voting                            │  │
│  │  POST /predict/bagging                           │  │
│  └──────────────────────┬───────────────────────────┘  │
│                         │                              │
│  ┌──────────────────────▼───────────────────────────┐  │
│  │              Services Layer                      │  │
│  │  ┌─────────────────┐  ┌───────────────────────┐  │  │
│  │  │ neural_network  │  │ assembly_algorithms   │  │  │
│  │  │ (ONNX Runtime)  │  │ (scikit-learn pkl)    │  │  │
│  │  └────────┬────────┘  └───────────┬───────────┘  │  │
│  │           │                       │              │  │
│  │  ┌────────▼────────┐  ┌───────────▼───────────┐  │  │
│  │  │ nn_model.onnx   │  │ voting_regressor.pkl  │  │  │
│  │  │                 │  │ bagging_regressor.pkl  │  │  │
│  │  └─────────────────┘  └───────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

**Data flow:** Client sends student features as JSON → FastAPI validates input with Pydantic models → the appropriate service loads the pre-trained model and returns a prediction.

---

## Project Structure

```
primer_taller_IA2/
├── Student_Performance.csv          # Raw dataset
├── README.md
├── notebooks/
│   ├── Neural_Networks.ipynb        # Neural network training & export to ONNX
│   ├── assembly_algorithms.ipynb    # Voting & Bagging regressor training
│   └── genetic_algorithm.ipynb      # Genetic algorithm experiments
├── api/
│   ├── main.py                      # FastAPI app & endpoint definitions
│   ├── models.py                    # Pydantic request schemas
│   ├── requirements.txt             # Python dependencies
│   ├── Dockerfile                   # Dockerfile for FastAPI app
│   └── services/
│       ├── neural_network.py        # ONNX inference service
│       ├── assembly_algorithms.py   # Ensemble model inference service
│       ├── genetic_algorithm.py     # Genetic algorithm inference service
│       └── models/
│           ├── nn_model.onnx                         # Trained neural network
│           ├── voting_regressor_trained-0.1.0.pkl     # Trained voting ensemble
│           └── bagging_regressor_trained-0.1.0.pkl    # Trained bagging ensemble
|
├── frontend/
│   ├── nginx/ 
│   │   └── nginx.conf # Nginx configuration for frontend
│   ├── src/
│   │   ├── assets/
│   │   │   └── vite.svg
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.css
│   │   │   ├── ResultCard.jsx
│   │   │   ├── ResultCard.css
│   │   │   ├── PredictionForm.jsx
│   │   │   └── PredictionForm.css
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   │   └── vite.svg
│   ├── Dockerfile # Dockerfile for frontend
│   ├── package.json
│   └── vite.config.js
|
├── docker-compose.yml # Docker Compose for frontend and backend
```

---

## Dataset

**File:** `Student_Performance.csv`

| Feature | Type | Description |
|---|---|---|
| `Hours Studied` | float | Weekly hours dedicated to studying |
| `Previous Scores` | float | Scores from prior assessments |
| `Extracurricular Activities` | str | Whether the student participates (`Yes`/`No`) |
| `Sleep Hours` | float | Average daily sleep hours |
| `Sample Question Papers Practiced` | float | Number of practice papers completed |
| **`Performance Index`** | **float** | **Target variable** — academic score to predict |

---

## Models

### 1. Neural Network (`nn_model.onnx`)
- Trained in `notebooks/Neural_Networks.ipynb`.
- Exported to **ONNX** format for fast, framework-agnostic inference via `onnxruntime`.
- Accepts a raw feature vector as input.

### 2. Voting Regressor (`voting_regressor_trained-0.1.0.pkl`)
- Trained in `notebooks/assembly_algorithms.ipynb`.
- A **scikit-learn `VotingRegressor`** that combines multiple base estimators and averages their predictions.

### 3. Bagging Regressor (`bagging_regressor_trained-0.1.0.pkl`)
- Trained in `notebooks/assembly_algorithms.ipynb`.
- A **scikit-learn `BaggingRegressor`** that trains multiple instances on random subsets and aggregates results.

## 4. Genetic Algorithm
- Trained in `notebooks/genetic_algorithm.ipynb`.
- A **from scratch** implementation of a genetic algorithm to find the best coefficients for a linear regression model.

---

## Setup

### Prerequisites

- **Python 3.10+**
- **pip**

### Step 1 — Clone the repository

```bash
git clone https://github.com/Loperaa-Juan/regression-ml-comparisson.git
cd regression-ml-comparisson
```

### Step 2 — Create a virtual environment

```bash
# Windows
python -m venv api/.venv
api\.venv\Scripts\activate

# macOS / Linux
python3 -m venv api/.venv
source api/.venv/bin/activate
```

### Step 3 — Install dependencies

```bash
pip install -r api/requirements.txt
```

### Step 4 — Run the API server

```bash
fastapi dev api/main.py
```

> The server starts at **http://127.0.0.1:8000**. Interactive API docs are available at **http://127.0.0.1:8000/docs**.

### Step 5 — Run the frontend server

```bash
cd frontend
npm install
npm run dev
```

> The frontend server starts at **http://localhost:5173**.

---

## Docker Execution (Optional)

All the application can be run using Docker. You need to have Docker installed on your machine.

```bash
docker compose build
docker compose up -d
```

Remember to stop the containers when you are done.

```bash
docker compose down
```

---
## API Endpoints

### `GET /`

Health check.

```json
{ "health_check": "OK" }
```

---

### `POST /predict/NeuralNetwork`

Predict using the neural network. Send a raw feature vector.

**Request body:**
```json
{
  "features": [7.0, 99.0, 9.0, 1.0]
}
```

**Response:**
```json
{
  "prediction": [[91.23]]
}
```

---

### `POST /predict/voting`

Predict using the Voting Regressor ensemble.

**Request body:**
```json
{
  "hours_studied": 7.0,
  "previous_scores": 99.0,
  "sleep_hours": 9.0,
  "sample_question_papers": 1.0
}
```

**Response:**
```json
{
  "prediction": [90.85]
}
```

---

### `POST /predict/bagging`

Predict using the Bagging Regressor ensemble.

**Request body:**
```json
{
  "hours_studied": 7.0,
  "previous_scores": 99.0,
  "sleep_hours": 9.0,
  "sample_question_papers": 1.0
}
```

**Response:**
```json
{
  "prediction": [89.76]
}
```
