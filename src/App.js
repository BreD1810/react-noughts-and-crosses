import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    for (let i = 0; i <= 9; i++) {
      if (squares[i] === null) {
        return null;
      }
    }

    return "No one!";
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {[...Array(3).keys()].map((rowIndex) => (
        <div key={"row" + rowIndex} className="board-row">
          {[...Array(3).keys()].map((squareIndex) => (
            <Square key={"square" + (3*rowIndex)+(squareIndex)} value={squares[(3*rowIndex)+(squareIndex)]} onSquareClick={() => handleClick((3*rowIndex)+(squareIndex))} />
          ))}
        </div>
      ))}
      <button style={{marginTop: '10px'}} onClick={() => restartGame()}>Restart Game</button>
    </>
  )
}
