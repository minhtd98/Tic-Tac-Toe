export default function GameBoard({ onSelectSquare, board }) {
  return (
    <div
      id="game-board"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
      }}
    >
      {board.flatMap((row, rowIndex) =>
        row.map((playerSymbol, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onSelectSquare(rowIndex, colIndex)}
            disabled={playerSymbol !== null}
            style={{ width: "50%", height: "100px" }}
          >
            {playerSymbol}
          </button>
        ))
      )}
    </div>
  );
}
