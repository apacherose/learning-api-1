import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import FactsView from "./FactsView.jsx";
import SentencesView from "./SentencesView.jsx";

function App() {
  const { pathname } = useLocation();
  const isFactsView = pathname === "/facts";

  return (
    <main className="page-shell">
      <header className="topbar">
        <NavLink className="brand" to="/sentences" aria-label="Lingua home">
          <span className="brand-mark" aria-hidden="true">
            T.
          </span>
          <span>Trotinetk@</span>
        </NavLink>
        <span className="topbar-note">Йотова, Гюров и аз!</span>
        <NavLink
          className="view-button"
          to={isFactsView ? "/sentences" : "/facts"}
        >
          {isFactsView ? "Sentences" : "Facts"}
        </NavLink>
        <button className="menu-button" type="button" aria-label="Open menu">
          <span />
          <span />
        </button>
      </header>

      <Routes>
        <Route path="/sentences" element={<SentencesView />} />
        <Route path="/facts" element={<FactsView />} />
        <Route path="*" element={<Navigate to="/sentences" replace />} />
      </Routes>

      <footer className="page-footer">
        <span>Made for curious minds.</span>
        <span className="footer-ornament" aria-hidden="true">✳</span>
        <span>Est. for your next chapter</span>
      </footer>
    </main>
  );
}

export default App;
