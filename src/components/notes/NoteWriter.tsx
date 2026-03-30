'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NoteWriterProps {
  onAdd: (text: string) => void;
  disabled?: boolean;
}

export default function NoteWriter({ onAdd, disabled }: NoteWriterProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !disabled) {
      onAdd(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#FFF9C4] sticky-note p-6"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="מה גורם לך להגיד אוף?..."
          disabled={disabled}
          className="w-full h-32 bg-transparent border-none outline-none resize-none text-xl text-gray-800 placeholder-gray-400"
          style={{ fontFamily: 'var(--font-caveat)' }}
        />
      </motion.div>

      <AnimatePresence>
        {text.trim() && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="mt-4 text-center"
          >
            <button
              onClick={handleSubmit}
              disabled={disabled}
              className="bg-[#6c5ce7] text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-[#5b4bd5] transition-colors shadow-lg disabled:opacity-50"
            >
              הוסף אוף! 😤
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
