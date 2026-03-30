'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="text-8xl mb-6">😤</div>
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-caveat)' }}>
          תרגיל האוף
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          תרגיל צוותי שעוזר לצוות המורים לתת מילים לתסכולים,
          <br />
          למיין אותם ולמצוא דרכים לפעולה
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Link
            href="/login"
            className="bg-[#6c5ce7] text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-[#5b4bd5] transition-colors shadow-lg hover:shadow-xl"
          >
            כניסה למנהלים
          </Link>

          <div className="flex items-center gap-3 mt-4">
            <div className="h-px bg-gray-300 w-16" />
            <span className="text-gray-400 text-sm">או</span>
            <div className="h-px bg-gray-300 w-16" />
          </div>

          <p className="text-gray-500 text-sm">
            קיבלת קישור מהמנהל/ת? פשוט פתח/י אותו בנייד
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 flex gap-6"
      >
        {['#FFF9C4', '#FFCCBC', '#C8E6C9'].map((color, i) => (
          <div
            key={i}
            className="sticky-note w-28 h-28 flex items-center justify-center text-2xl"
            style={{
              backgroundColor: color,
              transform: `rotate(${(i - 1) * 5}deg)`,
              fontFamily: 'var(--font-caveat)',
            }}
          >
            {['אוף!', 'אוף...', 'אוף!!'][i]}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
