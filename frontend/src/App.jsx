import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import './App.css';

export default function App() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    // Scroll to result
    setTimeout(() => {
      document.querySelector('.result-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
        <PredictionForm onResult={handleResult} />
        <ResultCard result={result} />
      </main>
      <footer className="app__footer">
        <p className="app__footer-text">
          Built with <span>React</span> + <span>FastAPI</span> — ML Regression Comparison
        </p>
        <div className="app__footer-models">
          <span className="app__footer-model-tag">Neural Network</span>
          <span className="app__footer-model-tag">Voting Regressor</span>
          <span className="app__footer-model-tag">Bagging Regressor</span>
        </div>
      </footer>
    </div>
  );
}
