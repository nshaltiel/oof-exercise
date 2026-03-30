'use client';

import { motion } from 'framer-motion';

interface SortProgressProps {
  current: number;
  total: number;
  streak: number;
}

export default function SortProgress({ current, total, streak }: SortProgressProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">
          {current} / {total} פתקים מויינו
        </span>
        {streak >= 3 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-sm flex items-center gap-1"
          >
            🔥 {streak} ברצף!
          </motion.span>
        )}
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#6c5ce7] rounded-full progress-glow"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
