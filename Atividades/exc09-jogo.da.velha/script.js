import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // Ignora se a casa já está preenchida ou se o jogo acabou
    if (squares[i] || calculateWinner(squares)) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Vencedor: " + winner;
  } else if (squares.every(Boolean)) {
    status = "Empate!";
  } else {
    status = "Próximo a jogar: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div>
        <div className="status">{status}</div>
        {[0, 3, 6].map((start) => (
          <div className="board-row" key={start}>
            {[0, 1, 2].map((offset) => {
              const i = start + offset;
              return (
                <Square
                  key={i}
                  value={squares[i]}
                  onSquareClick={() => handleClick(i)}
                />
              );
            })}
          </div>
        ))}
        <button className="reset" onClick={reset}>Reiniciar</button>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Board />);
