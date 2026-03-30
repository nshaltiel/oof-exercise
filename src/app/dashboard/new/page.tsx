'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useCreateSession } from '@/hooks/useSession';
import { motion } from 'framer-motion';

export default function NewSessionPage() {
  const { user } = useAuth();
  const { createSession, creating } = useCreateSession();
  const router = useRouter();
  const [schoolName, setSchoolName] = useState('');
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    if (!user || !schoolName.trim() || !title.trim()) return;

    const result = await createSession(
      user.uid,
      user.email || '',
      schoolName.trim(),
      title.trim()
    );

    router.push(`/dashboard/${result.id}`);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-lg mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">תרגיל אוף חדש</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שם בית הספר</label>
          <input
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder='לדוגמה: בי"ס הראל'
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">כותרת התרגיל</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="לדוגמה: מפגש צוות מרץ 2026"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] outline-none transition-colors"
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={creating || !schoolName.trim() || !title.trim()}
          className="w-full bg-[#6c5ce7] text-white py-4 rounded-xl text-lg font-medium hover:bg-[#5b4bd5] transition-colors disabled:opacity-50 shadow-lg"
        >
          {creating ? 'יוצר...' : 'צור תרגיל 🎯'}
        </button>
      </div>
    </motion.div>
  );
}
