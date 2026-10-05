import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [count, setCount] = useState(0);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [random, setRandom] = useState(null);
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(false);
  const [message, setMessage] = useState("");

  function generate() {
    const low = Number(min), high = Number(max);
    if (!Number.isFinite(low) || !Number.isFinite(high) || low > high) {
      setMessage("Enter a valid minimum and maximum.");
      return;
    }
    const value = Math.floor(Math.random() * (high - low + 1)) + low;
    setRandom(value);
    setHistory((h) => [value, ...h].slice(0, 8));
    setMessage("");
  }

  async function copyNumber() {
    if (random === null) return;
    try {
      await navigator.clipboard.writeText(String(random));
      setMessage("Copied!");
      setTimeout(() => setMessage(""), 1000);
    } catch {
      setMessage("Copy is not available.");
    }
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="header">
        <div>
          <p className="eyebrow">React Utility Dashboard</p>
          <h1>Counter & Random Number Generator</h1>
          <p className="subtitle">Simple, fast and responsive.</p>
        </div>
        <button className="theme" onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      <section className="grid">
        <article className="card">
          <div className="card-title">
            <h2>Counter</h2><span>Live</span>
          </div>
          <div className="number">{count}</div>
          <div className="buttons">
            <button className="minus" onClick={() => setCount(c => c - 1)}>−</button>
            <button className="reset" onClick={() => setCount(0)}>Reset</button>
            <button className="plus" onClick={() => setCount(c => c + 1)}>+</button>
          </div>
          <div className="quick">
            <button onClick={() => setCount(c => c + 5)}>+5</button>
            <button onClick={() => setCount(c => c + 10)}>+10</button>
            <button onClick={() => setCount(c => Math.max(0, c - 5))}>−5</button>
          </div>
        </article>

        <article className="card">
          <div className="card-title">
            <h2>Random Number</h2><span>Generator</span>
          </div>
          <div className="range">
            <label>Minimum<input type="number" value={min} onChange={e => setMin(e.target.value)} /></label>
            <label>Maximum<input type="number" value={max} onChange={e => setMax(e.target.value)} /></label>
          </div>
          <div className="random">{random ?? "—"}</div>
          <div className="buttons">
            <button className="generate" onClick={generate}>Generate Number</button>
            <button className="copy" onClick={copyNumber} disabled={random === null}>Copy</button>
          </div>
          {message && <p className="message">{message}</p>}
        </article>
      </section>

      <section className="card history">
        <div className="history-head">
          <div><p className="eyebrow">Recent Results</p><h2>Random Number History</h2></div>
          <button className="reset" onClick={() => setHistory([])}>Clear</button>
        </div>
        {history.length === 0 ? (
          <div className="empty">Generate a number to see it here.</div>
        ) : (
          <div className="history-list">
            {history.map((n, i) => <div className="history-item" key={i}><span>#{i + 1}</span><b>{n}</b></div>)}
          </div>
        )}
      </section>

      <footer>React + Vite • Mobile • Tablet • Desktop • TV</footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
