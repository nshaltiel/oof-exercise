'use client';

import { use } from 'react';
import { useSessionByCode } from '@/hooks/useSession';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TeacherEntryPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const { session, loading } = useSessionByCode(code);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">טוען...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold mb-2">לא מצאנו את התרגיל</h1>
        <p className="text-gray-500">בדוק/י שהקישור תקין ונסה/י שוב</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <div className="text-7xl mb-6">😤</div>
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-caveat)' }}>
          תרגיל האוף
        </h1>
        <p className="text-xl text-gray-600 mb-2">{session.title}</p>
        <p className="text-gray-400 mb-8">{session.schoolName}</p>

        <p className="text-gray-500 mb-6 leading-relaxed">
          כתבו את כל הדברים שגורמים לכם להגיד &quot;אוף&quot; -
          <br />
          כל אוף על פתק אחד.
          <br />
          <span className="text-sm">הכל אנונימי לחלוטין 🤫</span>
        </p>

        <Link
          href={`/s/${code}/write`}
          className="inline-block bg-[#6c5ce7] text-white px-10 py-4 rounded-2xl text-xl font-medium hover:bg-[#5b4bd5] transition-colors shadow-lg"
        >
          יאללה, מתחילים! ✏️
        </Link>
      </motion.div>
    </div>
  );
}
