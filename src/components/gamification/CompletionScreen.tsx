'use client';

import { motion } from 'framer-motion';
import ConfettiOverlay from './ConfettiOverlay';

interface CompletionScreenProps {
  totalNotes: number;
  onContinue?: () => void;
}

export default function CompletionScreen({ totalNotes, onContinue }: CompletionScreenProps) {
  return (
    <>
      <ConfettiOverlay active={true} />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-center py-12 px-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-caveat)' }}>
          סיימת! תודה שהשתתפת
        </h2>
        <p className="text-gray-600 text-lg mb-2">
          מיינת {totalNotes} פתקים בהצלחה
        </p>
        <p className="text-gray-500 text-base mb-8 max-w-sm mx-auto">
          לפעמים רק לתת שם לתסכול כבר עוזר.
          <br />
          הקול שלך נשמע 💜
        </p>
        {onContinue && (
          <button
            onClick={onContinue}
            className="bg-[#6c5ce7] text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-[#5b4bd5] transition-colors"
          >
            סיום
          </button>
        )}
      </motion.div>
    </>
  );
}
