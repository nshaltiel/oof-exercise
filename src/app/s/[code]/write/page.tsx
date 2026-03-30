'use client';

import { use, useState, useEffect, useCallback } from 'react';
import { useSessionByCode } from '@/hooks/useSession';
import { useTeacherToken } from '@/hooks/useTeacherToken';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/note';
import NoteWriter from '@/components/notes/NoteWriter';
import NoteStack from '@/components/notes/NoteStack';
import OofOMeter from '@/components/gamification/OofOMeter';
import ConfettiOverlay from '@/components/gamification/ConfettiOverlay';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WritePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const { session } = useSessionByCode(code);
  const teacherToken = useTeacherToken();
  const { addNote, getTeacherNotes } = useNotes(session?.id || '');
  const [notes, setNotes] = useState<Note[]>([]);
  const [showMilestone, setShowMilestone] = useState(false);
  const router = useRouter();

  const loadNotes = useCallback(async () => {
    if (session?.id && teacherToken) {
      const data = await getTeacherNotes(teacherToken);
      setNotes(data);
    }
  }, [session?.id, teacherToken, getTeacherNotes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleAdd = async (text: string) => {
    if (!session?.id || !teacherToken) return;
    await addNote(text, teacherToken);
    await loadNotes();

    // Check milestones
    const newCount = notes.length + 1;
    if (newCount === 5 || newCount === 10 || newCount === 15) {
      setShowMilestone(true);
      setTimeout(() => setShowMilestone(false), 3000);
    }
  };

  const handleFinishWriting = () => {
    router.push(`/s/${code}/sort`);
  };

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">טוען...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <ConfettiOverlay active={showMilestone} />

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-caveat)' }}>
          מה גורם לך להגיד אוף? 😤
        </h1>
        <p className="text-sm text-gray-400 mt-1">כל אוף על פתק נפרד</p>
      </div>

      <OofOMeter count={notes.length} />

      <NoteWriter onAdd={handleAdd} />

      <NoteStack notes={notes} />

      {notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <button
            onClick={handleFinishWriting}
            className="bg-[#27ae60] text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-[#219a52] transition-colors shadow-lg"
          >
            סיימתי לכתוב, עוברים למיון 🗑️
          </button>
        </motion.div>
      )}

      {/* Milestone messages */}
      {showMilestone && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-4 z-40"
        >
          <p className="text-lg font-bold text-center">
            {notes.length + 1 === 5 && '!יופי, ממשיכים 💪'}
            {notes.length + 1 === 10 && '!כל הכבוד, 10 אופים 🔥'}
            {notes.length + 1 === 15 && '!וואו, מצב אוף מלא 🌋'}
          </p>
        </motion.div>
      )}
    </div>
  );
}
