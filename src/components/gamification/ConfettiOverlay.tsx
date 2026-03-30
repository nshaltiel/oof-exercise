'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#e74c3c', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#e91e63'];

interface Piece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

export default function ConfettiOverlay({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    const newPieces: Piece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.5,
      size: Math.random() * 8 + 4,
    }));
    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 3500);
    return () => clearTimeout(timer);
  }, [active]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute confetti-piece"
          style={{
            left: `${piece.x}%`,
            top: '-10px',
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`,
            backgroundColor: piece.color,
            borderRadius: '2px',
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
