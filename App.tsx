
import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import type { SquareValue, Player } from './types';

const calculateWinner = (squares: SquareValue[]): { winner: Player; line: number[] } | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as Player, line: lines[i] };
    }
  }
  return null;
};

const App: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const isDraw = !winner && squares.every(Boolean);

  const handleClick = useCallback((i: number) => {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }, [squares, isXNext, winner]);

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const getStatusMessage = () => {
    if (winner) {
      return (
        <>
          Winner: <span className={winner === 'X' ? 'text-sky-400' : 'text-rose-400'}>{winner}</span>
        </>
      );
    }
    if (isDraw) {
      return "It's a Draw!";
    }
    return (
      <>
        Next player: <span className={isXNext ? 'text-sky-400' : 'text-rose-400'}>{isXNext ? 'X' : 'O'}</span>
      </>
    );
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 font-mono">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-rose-500">
          Tic Tac Toe
        </h1>
        <div className="w-full text-center text-2xl font-semibold h-8 mb-2">
          {getStatusMessage()}
        </div>
        <Board
          squares={squares}
          onClick={handleClick}
          winningLine={winnerInfo?.line ?? null}
        />
        {(winner || isDraw) && (
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-75"
          >
            Play Again
          </button>
        )}
      </div>
    </main>
  );
};

export default App;
