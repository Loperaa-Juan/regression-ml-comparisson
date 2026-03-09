import './ResultCard.css';

export default function ResultCard({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <section className="result-section">
        <div className="result-card result-card--error">
          <div className="result-card__header">
            <span className="result-card__icon">⚠️</span>
            <h3 className="result-card__title">Prediction Failed</h3>
          </div>
          <div className="result-card__error">
            <p className="result-card__error-msg">{result.error}</p>
            <p className="result-card__error-hint">
              Make sure the API server is running
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="result-section">
      <div className="result-card result-card--success">
        <div className="result-card__header">
          <span className="result-card__icon">🎯</span>
          <h3 className="result-card__title">Performance Index</h3>
        </div>

        <div className="result-card__score">
          <div className="result-card__score-number">{result.prediction}</div>
          <p className="result-card__score-label">Predicted Score</p>
        </div>

        <div className="result-card__model">
          <span className="result-card__model-badge">{result.model}</span>
        </div>

        {result.inputs && (
          <div className="result-card__summary">
            <div className="result-card__summary-item">
              <span className="result-card__summary-label">Hours Studied</span>
              <span className="result-card__summary-value">
                {result.inputs.hours_studied}
              </span>
            </div>
            <div className="result-card__summary-item">
              <span className="result-card__summary-label">Previous Scores</span>
              <span className="result-card__summary-value">
                {result.inputs.previous_scores}
              </span>
            </div>
            <div className="result-card__summary-item">
              <span className="result-card__summary-label">Sleep Hours</span>
              <span className="result-card__summary-value">
                {result.inputs.sleep_hours}
              </span>
            </div>
            <div className="result-card__summary-item">
              <span className="result-card__summary-label">Papers Practiced</span>
              <span className="result-card__summary-value">
                {result.inputs.sample_question_papers}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
