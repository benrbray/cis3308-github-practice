import { useState } from 'react';
import './App.css'
import * as Helper from './helper';

Helper.myFunction();

const calculateWinner = (squares: string[]): string|null => {
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
  return null;
}

const boardIsFull = (squares: string[]): boolean => {
  for(let i = 0; i < squares.length; i++) {
    if(squares[i] == "") {
      return false;
    }
  }
  return true;
}


export const Square = (
  props: {
    value: string,
    onButtonClick: () => void
  }
) => {
  return <button className="square" onClick={props.onButtonClick}>
    {props.value}
  </button>;
}

export const App = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(""))
  const winner = calculateWinner(board);
  const full = boardIsFull(board);

  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  // show a message
  let message: string;
  if(full && winner == null) {
    message = "Draw!";
  } else if(winner == null) {
    message = `Player ${xIsNext ? "X" : "O"} Turn`;
  } else {
    message = `The winner is Player ${winner}`;
  }

  // IMMUTABLE UPDATE
  const handleClick = (idx: number) => {
    // ignore clicks on squares that already have a value
    if(board[idx] != "") { return; }
    // ignore clicks if the game is over
    if(winner != null) { return; }

    // create a new board with the value changed at idx
    const updatedBoard = board.slice();

    if(xIsNext) {
      updatedBoard[idx] = "X";
    } else {
      updatedBoard[idx] = "O";
    }

    // detect a winner
    let w = calculateWinner(updatedBoard);
    console.log("WINNER:", w);
    if(w == "X") {
      setXScore(xScore + 1);
    } else if(w == "O") {
      setOScore(oScore + 1);
    }

    // alternate player turns by flipping the xIsNext boolean state variable
    setXIsNext(!xIsNext);
    
    // update the game board
    setBoard(updatedBoard);
  }

  const handleReset = () => {
    const emptyBoard = Array(9).fill("");
    setBoard(emptyBoard);
    setXIsNext(true);
  }

  const handleScoreReset = () => {
    setXScore(0);
    setOScore(0);
  }

  return <div>
    <div className="scoreboard">
      X = {xScore}, O = {oScore}
    </div>
    <div className="controls">
      <button onClick={handleReset}>Reset Board</button>
      <button onClick={handleScoreReset}>Reset Score</button>
    </div>
    <div className="message">
      {message}
    </div>
    <div className="board-row">
      <Square value={board[0]} onButtonClick={() => handleClick(0)} />
      <Square value={board[1]} onButtonClick={() => handleClick(1)} />
      <Square value={board[2]} onButtonClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={board[3]} onButtonClick={() => handleClick(3)} />
      <Square value={board[4]} onButtonClick={() => handleClick(4)} />
      <Square value={board[5]} onButtonClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={board[6]} onButtonClick={() => handleClick(6)} />
      <Square value={board[7]} onButtonClick={() => handleClick(7)} />
      <Square value={board[8]} onButtonClick={() => handleClick(8)} />
    </div>
  </div>
}