import GameBoard from "./Components/GameBoard";
import Player from "./Components/Player";
import "./styles.css";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[gameTurns.length - 1].player === "X") {
    currentPlayer = "O";
  }

  console.log(gameTurns.length);
  return currentPlayer;
}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winer;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winer = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        ...prevTurns,
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ];

      return updatedTurns;
    });
  }

  return (
    <div className="App">
      <Player
        initialName="Player 1"
        symbol="X"
        isActive={activePlayer === "X"}
      />
      <Player
        initialName="Player 2"
        symbol="0"
        isActive={activePlayer === "O"}
      />
      <p>------------------------------------------</p>
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      <p>------------------------------------------</p>
      <h2>{winer && <p>{winer} is winner</p>}</h2>
    </div>
  );
}
