'use client';

import { useState } from 'react';
import { Note } from '@/types/note';
import { BinType, BIN_CONFIG, BIN_ORDER } from '@/types/bin';
import { motion, AnimatePresence } from 'framer-motion';
import { STICKY_NOTE_COLORS } from '@/lib/constants';

interface BinDetailViewProps {
  notes: Note[];
  binType: BinType;
  onMoveNote: (noteId: string, newBin: BinType) => Promise<void>;
  onDeleteNote: (noteId: string) => Promise<void>;
}

export default function BinDetailView({ notes, binType, onMoveNote, onDeleteNote }: BinDetailViewProps) {
  const config = BIN_CONFIG[binType];
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  const otherBins = BIN_ORDER.filter((b) => b !== binType);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{config.icon}</span>
        <div>
          <h2 className="text-2xl font-bold">{config.label}</h2>
          <p className="text-gray-500">{notes.length} פתקים</p>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              layout
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border"
              style={{ borderColor: config.bgColor }}
            >
              <div
                className="p-4 cursor-pointer flex items-start gap-3"
                onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
              >
                <div
                  className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: STICKY_NOTE_COLORS[i % STICKY_NOTE_COLORS.length] }}
                />
                <p
                  className="flex-1 text-lg"
                  style={{ fontFamily: 'var(--font-caveat)' }}
                >
                  {note.text}
                </p>
                <span className="text-gray-400 text-sm">
                  {expandedNote === note.id ? '▲' : '▼'}
                </span>
              </div>

              <AnimatePresence>
                {expandedNote === note.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 border-t flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500 ml-2">העבר ל:</span>
                      {otherBins.map((bin) => (
                        <button
                          key={bin}
                          onClick={() => onMoveNote(note.id, bin)}
                          className="text-sm px-3 py-1 rounded-full border hover:bg-gray-50 transition-colors"
                          style={{ borderColor: BIN_CONFIG[bin].color, color: BIN_CONFIG[bin].color }}
                        >
                          {BIN_CONFIG[bin].icon} {BIN_CONFIG[bin].label}
                        </button>
                      ))}
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="text-sm px-3 py-1 rounded-full border border-red-300 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        🗑️ מחק
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {notes.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">{config.icon}</div>
            <p>אין עדיין פתקים בסל הזה</p>
          </div>
        )}
      </div>
    </div>
  );
}
