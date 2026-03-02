import { useState } from 'react';
import './PredictionForm.css';

const MODELS = [
  { id: 'neural', label: 'Neural Network', endpoint: '/predict/NeuralNetwork' },
  { id: 'voting', label: 'Voting', endpoint: '/predict/voting' },
  { id: 'bagging', label: 'Bagging', endpoint: '/predict/bagging' },
];

const FIELDS = [
  {
    name: 'hours_studied',
    label: 'Hours Studied',
    icon: '📚',
    placeholder: 'e.g. 7',
    hint: 'Weekly hours dedicated to studying',
    min: 0,
    max: 168,
  },
  {
    name: 'previous_scores',
    label: 'Previous Scores',
    icon: '📊',
    placeholder: 'e.g. 85',
    hint: 'Scores from prior assessments (0–100)',
    min: 0,
    max: 100,
  },
  {
    name: 'sleep_hours',
    label: 'Sleep Hours',
    icon: '😴',
    placeholder: 'e.g. 8',
    hint: 'Average daily sleep hours',
    min: 0,
    max: 24,
  },
  {
    name: 'sample_question_papers',
    label: 'Sample Papers Practiced',
    icon: '📝',
    placeholder: 'e.g. 5',
    hint: 'Number of practice papers completed',
    min: 0,
    max: 100,
  },
];

const API_BASE = 'http://127.0.0.1:8000';

export default function PredictionForm({ onResult }) {
  const [selectedModel, setSelectedModel] = useState('neural');
  const [values, setValues] = useState({
    hours_studied: '',
    previous_scores: '',
    sleep_hours: '',
    sample_question_papers: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    FIELDS.forEach((field) => {
      const val = values[field.name];
      if (val === '' || val === null || val === undefined) {
        newErrors[field.name] = 'This field is required';
      } else {
        const num = parseFloat(val);
        if (isNaN(num)) {
          newErrors[field.name] = 'Must be a valid number';
        } else if (num < field.min) {
          newErrors[field.name] = `Minimum value is ${field.min}`;
        } else if (num > field.max) {
          newErrors[field.name] = `Maximum value is ${field.max}`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const model = MODELS.find((m) => m.id === selectedModel);

    try {
      const numericValues = {
        hours_studied: parseFloat(values.hours_studied),
        previous_scores: parseFloat(values.previous_scores),
        sleep_hours: parseFloat(values.sleep_hours),
        sample_question_papers: parseFloat(values.sample_question_papers),
      };

      let body;
      if (selectedModel === 'neural') {
        body = {
          features: [
            numericValues.hours_studied,
            numericValues.previous_scores,
            numericValues.sleep_hours,
            numericValues.sample_question_papers,
          ],
        };
      } else {
        body = numericValues;
      }

      const res = await fetch(`${API_BASE}${model.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      let prediction;
      if (selectedModel === 'neural') {
        prediction =
          Array.isArray(data.prediction[0])
            ? data.prediction[0][0]
            : data.prediction[0];
      } else {
        prediction = data.prediction[0];
      }

      onResult({
        prediction: parseFloat(prediction).toFixed(2),
        model: model.label,
        inputs: { ...numericValues },
      });
    } catch (err) {
      onResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-section">
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-card__header">
          <h2 className="form-card__title">Enter Student Data</h2>
          <p className="form-card__desc">
            Fill in the fields below and select a model
          </p>
        </div>

        {/* Model Selector */}
        <div className="model-selector" role="tablist">
          {MODELS.map((model) => (
            <button
              key={model.id}
              type="button"
              role="tab"
              aria-selected={selectedModel === model.id}
              className={`model-selector__btn ${
                selectedModel === model.id ? 'model-selector__btn--active' : ''
              }`}
              onClick={() => setSelectedModel(model.id)}
            >
              {model.label}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="form-fields">
          {FIELDS.map((field) => (
            <div className="form-group" key={field.name}>
              <label className="form-group__label" htmlFor={field.name}>
                <span className="form-group__label-icon">{field.icon}</span>
                {field.label}
              </label>
              <div className="form-group__input-wrapper">
                <input
                  id={field.name}
                  type="number"
                  className={`form-group__input ${
                    errors[field.name] ? 'form-group__input--error' : ''
                  }`}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  min={field.min}
                  max={field.max}
                  step="any"
                  disabled={loading}
                />
              </div>
              {errors[field.name] ? (
                <span className="form-group__error">⚠ {errors[field.name]}</span>
              ) : (
                <span className="form-group__hint">{field.hint}</span>
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="form-submit">
          <button
            type="submit"
            className="form-submit__btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="form-submit__spinner" />
                Predicting...
              </>
            ) : (
              'Get Prediction'
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
