'use client';

import { motion } from 'framer-motion';

export default function DonePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-center"
      >
        <div className="text-8xl mb-6">💜</div>
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-caveat)' }}>
          תודה רבה!
        </h1>
        <p className="text-xl text-gray-600 mb-4">הקול שלך חשוב ונשמע</p>
        <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
          לפעמים רק לתת שם לתסכול כבר עוזר.
          <br />
          התשובות שלך יעזרו לנו להשתפר ולהתקדם יחד.
        </p>

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mt-12 text-4xl"
        >
          🌟
        </motion.div>
      </motion.div>
    </div>
  );
}
