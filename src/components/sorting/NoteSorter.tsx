'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Note } from '@/types/note';
import { BinType, BIN_ORDER } from '@/types/bin';
import { STICKY_NOTE_COLORS } from '@/lib/constants';
import BinTarget, { BinTargetRef } from './BinTarget';
import SortProgress from './SortProgress';

interface NoteSorterProps {
  notes: Note[];
  onSort: (noteId: string, bin: BinType) => Promise<void>;
  onComplete: () => void;
  playSound: (src: string) => void;
}

type Phase = 'showing' | 'crumpling' | 'throwing' | 'landing';

export default function NoteSorter({ notes, onSort, onComplete, playSound }: NoteSorterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('showing');
  const [targetBin, setTargetBin] = useState<BinType | null>(null);
  const [throwTarget, setThrowTarget] = useState({ x: 0, y: 0 });
  const [sortedCounts, setSortedCounts] = useState<Record<BinType, number>>({
    cant_do: 0,
    need_help: 0,
    can_change: 0,
  });
  const [streak, setStreak] = useState(0);

  const binRefs = useRef<Record<BinType, BinTargetRef | null>>({
    cant_do: null,
    need_help: null,
    can_change: null,
  });
  const noteRef = useRef<HTMLDivElement>(null);

  const unsortedNotes = notes.filter((n) => n.bin === null);
  const currentNote = unsortedNotes[currentIndex] || null;
  const totalUnsorted = unsortedNotes.length;
  const totalSorted = notes.length - totalUnsorted;

  useEffect(() => {
    if (unsortedNotes.length === 0 && notes.length > 0 && phase === 'showing') {
      onComplete();
    }
  }, [unsortedNotes.length, notes.length, phase, onComplete]);

  const getFillLevel = (count: number): 'empty' | 'half' | 'full' => {
    if (count === 0) return 'empty';
    if (count < 5) return 'half';
    return 'full';
  };

  const handleBinClick = useCallback(
    async (bin: BinType) => {
      if (!currentNote || phase !== 'showing') return;

      const binEl = binRefs.current[bin]?.getElement();
      const noteEl = noteRef.current;
      if (!binEl || !noteEl) return;

      setTargetBin(bin);

      // Calculate throw target position
      const binRect = binEl.getBoundingClientRect();
      const noteRect = noteEl.getBoundingClientRect();
      const deltaX = binRect.left + binRect.width / 2 - (noteRect.left + noteRect.width / 2);
      const deltaY = binRect.top + binRect.height / 2 - (noteRect.top + noteRect.height / 2);
      setThrowTarget({ x: deltaX, y: deltaY });

      // Phase 1: Crumple
      setPhase('crumpling');
      playSound('/sounds/crumple.mp3');

      await new Promise((r) => setTimeout(r, 300));

      // Phase 2: Throw
      setPhase('throwing');
      playSound('/sounds/swoosh.mp3');

      await new Promise((r) => setTimeout(r, 500));

      // Phase 3: Land
      setPhase('landing');
      playSound('/sounds/thud.mp3');
      binRefs.current[bin]?.bounce();

      setSortedCounts((prev) => ({ ...prev, [bin]: prev[bin] + 1 }));
      setStreak((prev) => prev + 1);

      await onSort(currentNote.id, bin);

      await new Promise((r) => setTimeout(r, 200));

      // Reset for next note
      setPhase('showing');
      setTargetBin(null);
      setCurrentIndex(0);
    },
    [currentNote, phase, onSort, playSound]
  );

  if (!currentNote) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-xl text-gray-600">כל הפתקים מויינו!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 px-4">
      <SortProgress current={totalSorted} total={notes.length} streak={streak} />

      {/* Current note */}
      <div className="relative" ref={noteRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNote.id}
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={
              phase === 'showing'
                ? { scale: 1, opacity: 1, rotate: 0 }
                : phase === 'crumpling'
                ? {} // CSS animation handles this
                : phase === 'throwing'
                ? {
                    x: throwTarget.x,
                    y: throwTarget.y,
                    scale: 0.2,
                    rotate: 540,
                    opacity: 0.8,
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={
              phase === 'throwing'
                ? { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
                : { type: 'spring', stiffness: 300, damping: 20 }
            }
            className={`sticky-note w-56 h-56 flex items-center justify-center text-center p-6 ${
              phase === 'crumpling' ? 'crumpling' : ''
            }`}
            style={{
              backgroundColor: STICKY_NOTE_COLORS[currentIndex % STICKY_NOTE_COLORS.length],
              fontFamily: 'var(--font-caveat)',
            }}
          >
            <span className="text-2xl text-gray-800 leading-relaxed">{currentNote.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Instruction */}
      <p className="text-gray-500 text-sm">לחצ/י על הסל המתאים כדי לזרוק את הפתק</p>

      {/* Bins */}
      <div className="flex justify-center gap-6">
        {BIN_ORDER.map((bin) => (
          <BinTarget
            key={bin}
            ref={(el) => {
              binRefs.current[bin] = el;
            }}
            binType={bin}
            count={sortedCounts[bin]}
            fillLevel={getFillLevel(sortedCounts[bin])}
            onClick={() => handleBinClick(bin)}
          />
        ))}
      </div>
    </div>
  );
}
