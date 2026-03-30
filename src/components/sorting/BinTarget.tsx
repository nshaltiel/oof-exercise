'use client';

import { motion } from 'framer-motion';
import { BinType, BIN_CONFIG } from '@/types/bin';
import { forwardRef, useState, useImperativeHandle } from 'react';
import BinIllustration from '@/components/ui/BinIllustration';

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

    return (
      <motion.div
        ref={setElement}
        whileHover={{ scale: 1.08, rotate: [-1, 1, -1, 0] }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        animate={bouncing ? { y: [0, -12, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="cursor-pointer flex flex-col items-center gap-1 relative"
      >
        {/* Count badge */}
        {count > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg z-10"
            style={{ backgroundColor: config.color }}
          >
            {count}
          </motion.div>
        )}

        {/* Illustrated bin */}
        <BinIllustration type={binType} size={80} fillLevel={fillLevel} />

        {/* Label */}
        <span
          className="text-xs font-bold text-center max-w-[100px] leading-tight mt-1"
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
