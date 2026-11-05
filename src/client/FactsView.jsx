import { useState } from "react";
import factData from "./facts.json";
import shuffleItems from "./shuffleItems.js";

function FactsView() {
  const [facts] = useState(() => shuffleItems(factData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const fact = facts[currentIndex];

  function showNextFact() {
    setCurrentIndex((index) => (index + 1) % facts.length);
    setShowExplanation(false);
  }

  return (
    <section className="lesson" aria-labelledby="lesson-title">
      <div className="sentence-card">
        <div className="card-decoration" aria-hidden="true">“</div>
        <h1 id="lesson-title">{fact.question}</h1>
        {showExplanation && (
          <p className="sentence-translation" aria-live="polite">
            {fact.explanation}
          </p>
        )}
        <div className="sentence-actions">
          <button
            className="action-button check-button"
            type="button"
            onClick={() => setShowExplanation(true)}
          >
            Answer
          </button>
          <button
            className="action-button next-button"
            type="button"
            disabled={facts.length < 2}
            onClick={showNextFact}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default FactsView;
