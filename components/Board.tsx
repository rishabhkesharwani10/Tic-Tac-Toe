
import React from 'react';
import type { SquareValue } from '../types';
import Square from './Square';

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => {
    const isWinning = winningLine?.includes(i) ?? false;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900/50 rounded-xl shadow-2xl">
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
