
import React from 'react';
import type { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  const textColor = value === 'X' ? 'text-sky-400' : 'text-rose-400';
  const winningBg = isWinning ? 'bg-emerald-500/30' : 'bg-slate-800';

  return (
    <button
      className={`flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 text-6xl font-bold rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 ${winningBg}`}
      onClick={onClick}
      aria-label={`Square ${value || 'empty'}`}
    >
      <span className={`${textColor} transition-colors duration-300`}>{value}</span>
    </button>
  );
};

export default Square;
