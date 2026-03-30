'use client';

import { motion, AnimatePresence } from 'framer-motion';
import StickyNote from './StickyNote';
import { Note } from '@/types/note';
import { STICKY_NOTE_COLORS } from '@/lib/constants';

interface NoteStackProps {
  notes: Note[];
  onNoteClick?: (note: Note) => void;
}

export default function NoteStack({ notes, onNoteClick }: NoteStackProps) {
  if (notes.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <AnimatePresence>
        {notes.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <StickyNote
              text={note.text}
              color={STICKY_NOTE_COLORS[i % STICKY_NOTE_COLORS.length]}
              size="sm"
              onClick={() => onNoteClick?.(note)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
