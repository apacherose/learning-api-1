import { useState } from "react";
import sentenceData from "./sentences.json";
import shuffleItems from "./shuffleItems.js";

function SentencesView() {
  const [sentences] = useState(() => shuffleItems(sentenceData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const sentence = sentences[currentIndex];

  function showNextSentence() {
    setCurrentIndex((index) => (index + 1) % sentences.length);
    setShowTranslation(false);
  }

  return (
    <section className="lesson" aria-labelledby="lesson-title">
      <div className="sentence-card">
        <div className="card-decoration" aria-hidden="true">“</div>
        <div className="sentence-meta">
          <span
            className={`sentence-level sentence-level-${sentence.level || "easy"}`}
            aria-label={`Sentence level: ${sentence.level || "easy"}`}
          >
            Level: {sentence.level || "Easy"}
          </span>
        </div>
        <h1 id="lesson-title">{sentence.text}</h1>
        {showTranslation && (
          <p className="sentence-translation" lang="bg" aria-live="polite">
            {sentence.i18_bg}
          </p>
        )}
        <div className="sentence-actions">
          <button
            className="action-button check-button"
            type="button"
            onClick={() => setShowTranslation(true)}
          >
            Check!
          </button>
          <button
            className="action-button next-button"
            type="button"
            disabled={sentences.length < 2}
            onClick={showNextSentence}
          >
            Next one!
          </button>
        </div>
      </div>
    </section>
  );
}

export default SentencesView;
