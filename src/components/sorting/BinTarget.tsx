'use client';

import { motion } from 'framer-motion';
import { BinType, BIN_CONFIG } from '@/types/bin';
import { forwardRef, useState, useImperativeHandle } from 'react';

interface BinTargetProps {
  binType: BinType;
  count: number;
  onClick: () => void;
  fillLevel: 'empty' | 'half' | 'full';
}

export interface BinTargetRef {
  bounce: () => void;
  getElement: () => HTMLDivElement | null;
}

const BinTarget = forwardRef<BinTargetRef, BinTargetProps>(
  ({ binType, count, onClick, fillLevel }, ref) => {
    const config = BIN_CONFIG[binType];
    const [bouncing, setBouncing] = useState(false);
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      bounce: () => {
        setBouncing(true);
        setTimeout(() => setBouncing(false), 300);
      },
      getElement: () => element,
    }));

    const fillHeight = fillLevel === 'empty' ? '0%' : fillLevel === 'half' ? '50%' : '85%';

    return (
      <motion.div
        ref={setElement}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`bin-container cursor-pointer flex flex-col items-center gap-2 ${bouncing ? 'bin-bounce' : ''}`}
      >
        <div
          className="relative w-24 h-28 rounded-b-2xl border-4 overflow-hidden"
          style={{ borderColor: config.color }}
        >
          {/* Fill level */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-b-lg opacity-30"
            style={{ backgroundColor: config.color }}
            animate={{ height: fillHeight }}
            transition={{ duration: 0.5 }}
          />
          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            {config.icon}
          </div>
          {/* Count badge */}
          {count > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: config.color }}
            >
              {count}
            </motion.div>
          )}
        </div>
        <span
          className="text-xs font-medium text-center max-w-[100px] leading-tight"
          style={{ color: config.color }}
        >
          {config.label}
        </span>
      </motion.div>
    );
  }
);

BinTarget.displayName = 'BinTarget';

export default BinTarget;
