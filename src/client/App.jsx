import { useEffect, useState } from "react";

function App() {
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSentence() {
      try {
        const response = await fetch("/api/sentences", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`The sentence service returned ${response.status}.`);
        }

        const fetchedSentences = await response.json();
        if (!Array.isArray(fetchedSentences) || fetchedSentences.length === 0) {
          throw new Error("No sentences are available right now.");
        }

        const shuffledSentences = [...fetchedSentences];
        for (let index = shuffledSentences.length - 1; index > 0; index -= 1) {
          const randomIndex = Math.floor(Math.random() * (index + 1));
          [shuffledSentences[index], shuffledSentences[randomIndex]] = [
            shuffledSentences[randomIndex],
            shuffledSentences[index],
          ];
        }
        setSentences(shuffledSentences);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load a sentence.");
        }
      }
    }

    loadSentence();
    return () => controller.abort();
  }, []);

  const sentence = sentences[currentIndex];

  function showNextSentence() {
    setCurrentIndex((index) => (index + 1) % sentences.length);
    setShowTranslation(false);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Lingua home">
          <span className="brand-mark" aria-hidden="true">
            T.
          </span>
          <span>Trotinetk@</span>
        </a>
        <span className="topbar-note">Йотова, Гюров и аз!</span>
        <button className="menu-button" type="button" aria-label="Open menu">
          <span />
          <span />
        </button>
      </header>

      <section className="lesson" aria-labelledby="lesson-title">
        <div className="sentence-card">
          <div className="card-decoration" aria-hidden="true">“</div>
          {sentence && (
            <div className="sentence-meta">
              <span
                className={`sentence-level sentence-level-${sentence.level || "easy"}`}
                aria-label={`Sentence level: ${sentence.level || "easy"}`}
              >
                Level: {sentence.level || "Easy"}
              </span>
            </div>
          )}
          <h1 id="lesson-title">
            {sentence ? sentence.text : error || "A new sentence is on its way…"}
          </h1>
          {sentence && showTranslation && (
            <p className="sentence-translation" lang="bg" aria-live="polite">
              {sentence.i18_bg}
            </p>
          )}
          <div className="sentence-actions">
            <button
              className="action-button check-button"
              type="button"
              disabled={!sentence}
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

      <footer className="page-footer">
        <span>Made for curious minds.</span>
        <span className="footer-ornament" aria-hidden="true">✳</span>
        <span>Est. for your next chapter</span>
      </footer>
    </main>
  );
}

export default App;
