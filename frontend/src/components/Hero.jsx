import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__badge">
        <span className="hero__badge-emoji">🎓</span>
        Machine Learning Predictions
      </div>
      <h1 className="hero__title">
        Predict Your{' '}
        <span className="hero__title-accent">Academic Performance</span>
      </h1>
      <p className="hero__subtitle">
        Leverage three powerful ML models — Neural Network, Voting Regressor, and Bagging Regressor — 
        to forecast your performance index based on study habits.
      </p>
    </section>
  );
}
