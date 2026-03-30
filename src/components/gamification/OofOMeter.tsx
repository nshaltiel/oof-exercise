'use client';

import { motion } from 'framer-motion';

interface OofOMeterProps {
  count: number;
}

const LEVELS = [
  { min: 0, label: 'מתחילים', emoji: '😊' },
  { min: 3, label: 'מתחממים', emoji: '😤' },
  { min: 6, label: 'ברצינות', emoji: '🔥' },
  { min: 10, label: 'מצב אוף מלא!', emoji: '🌋' },
];

export default function OofOMeter({ count }: OofOMeterProps) {
  const level = [...LEVELS].reverse().find((l) => count >= l.min) || LEVELS[0];
  const progress = Math.min((count / 12) * 100, 100);

  return (
    <div className="flex items-center gap-3 w-full max-w-md mx-auto mb-4">
      <motion.span
        key={level.emoji}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className="text-2xl"
      >
        {level.emoji}
      </motion.span>
      <div className="flex-1">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{level.label}</span>
          <span>{count} אופים</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #f39c12, #e74c3c)`,
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
