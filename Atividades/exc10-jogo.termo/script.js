import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Letter({ letter, status }) {
  const colors = {
    correct: "#538d4e",
    present: "#b59f3b",
    absent:  "#3a3a3c",
    empty:   "transparent"
  };
  return (
    <div style={{
      width: 62, height: 62,
      border: "2px solid #565758",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 32,
      fontWeight: "bold",
      color: status !== "empty" ? "#fff" : "#fff",
      background: colors[status] || "transparent",
      textTransform: "uppercase"
    }}>
      {letter}
    </div>
  );
}

function Row({ guess, evaluation, wordLength }) {
  const cells = Array(wordLength).fill(null);
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {cells.map((_, i) => (
        <Letter
          key={i}
          letter={guess ? guess[i] || "" : ""}
          status={evaluation ? evaluation[i] : "empty"}
        />
      ))}
    </div>
  );
}

function evaluateGuess(guess, secret) {
  const result = Array(secret.length).fill("absent");
  const secretArr = secret.split("");
  const guessArr  = guess.split("");

  // primeiro passo: letras corretas
  guessArr.forEach((l, i) => {
    if (l === secretArr[i]) {
      result[i] = "correct";
      secretArr[i] = null;
      guessArr[i]  = null;
    }
  });

  // segundo passo: letras presentes
  guessArr.forEach((l, i) => {
    if (!l) return;
    const idx = secretArr.indexOf(l);
    if (idx !== -1) {
      result[i] = "present";
      secretArr[idx] = null;
    }
  });

  return result;
}

const WORD = "REACT";
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = WORD.length;

function Game() {
  const [guesses, setGuesses]     = useState([]);
  const [evals, setEvals]         = useState([]);
  const [current, setCurrent]     = useState("");
  const [gameOver, setGameOver]   = useState(false);
  const [message, setMessage]     = useState("");

  function handleKey(e) {
    if (gameOver) return;
    const key = e.key.toUpperCase();

    if (key === "ENTER") {
      if (current.length !== WORD_LENGTH) {
        setMessage("Palavra muito curta!");
        return;
      }
      const evaluation = evaluateGuess(current, WORD);
      const newGuesses = [...guesses, current];
      const newEvals   = [...evals, evaluation];
      setGuesses(newGuesses);
      setEvals(newEvals);
      setCurrent("");

      if (current === WORD) {
        setMessage("🎉 Parabéns! Você acertou!");
        setGameOver(true);
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setMessage("😢 Fim de jogo! A palavra era: " + WORD);
        setGameOver(true);
      } else {
        setMessage("");
      }
    } else if (key === "BACKSPACE") {
      setCurrent(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
      setCurrent(prev => prev + key);
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, guesses, gameOver]);

  const rows = Array(MAX_ATTEMPTS).fill(null);

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", background: "#121213",
      minHeight: "100vh", paddingTop: 40,
      fontFamily: "sans-serif", color: "#fff"
    }}>
      <h1 style={{ fontSize: 32, letterSpacing: 4, marginBottom: 20 }}>
        TERMO
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {rows.map((_, i) => (
          <Row
            key={i}
            guess={i < guesses.length ? guesses[i] : i === guesses.length ? current : ""}
            evaluation={evals[i] || null}
            wordLength={WORD_LENGTH}
          />
        ))}
      </div>
      {message && (
        <p style={{ marginTop: 20, fontSize: 16 }}>{message}</p>
      )}
      {gameOver && (
        <button
          onClick={() => { setGuesses([]); setEvals([]); setCurrent(""); setGameOver(false); setMessage(""); }}
          style={{ marginTop: 16, padding: "10px 24px", cursor: "pointer", fontSize: 15 }}
        >
          Jogar novamente
        </button>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Game />);