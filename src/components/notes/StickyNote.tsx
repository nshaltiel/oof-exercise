'use client';

import { motion } from 'framer-motion';
import { getRandomRotation } from '@/lib/constants';
import { useMemo } from 'react';

interface StickyNoteProps {
  text: string;
  color: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StickyNote({ text, color, onClick, size = 'md', className = '' }: StickyNoteProps) {
  const rotation = useMemo(() => getRandomRotation(), []);

  const sizeClasses = {
    sm: 'w-32 h-32 text-sm p-3',
    md: 'w-40 h-40 text-base p-4',
    lg: 'w-48 h-48 text-lg p-5',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`sticky-note ${sizeClasses[size]} cursor-pointer flex items-center justify-center text-center ${className}`}
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        fontFamily: 'var(--font-caveat)',
      }}
      onClick={onClick}
    >
      <span className="text-gray-800 leading-tight break-words overflow-hidden">{text}</span>
    </motion.div>
  );
}
