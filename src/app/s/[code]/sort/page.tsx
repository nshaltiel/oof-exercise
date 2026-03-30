'use client';

export const dynamic = 'force-dynamic';

import { use, useState, useEffect, useCallback } from 'react';
import { useSessionByCode } from '@/hooks/useSession';
import { useTeacherToken } from '@/hooks/useTeacherToken';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/note';
import NoteSorter from '@/components/sorting/NoteSorter';
import CompletionScreen from '@/components/gamification/CompletionScreen';
import { useSoundEffect } from '@/hooks/useSound';
import { useRouter } from 'next/navigation';

export default function SortPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const { session } = useSessionByCode(code);
  const teacherToken = useTeacherToken();
  const { getTeacherNotes, sortNote } = useNotes(session?.id || '');
  const { play } = useSoundEffect();
  const [notes, setNotes] = useState<Note[]>([]);
  const [completed, setCompleted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const loadNotes = useCallback(async () => {
    if (session?.id && teacherToken) {
      const data = await getTeacherNotes(teacherToken);
      setNotes(data);
      setLoaded(true);
    }
  }, [session?.id, teacherToken, getTeacherNotes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleSort = async (noteId: string, bin: import('@/types/bin').BinType) => {
    await sortNote(noteId, bin);
    setNotes((prev) => prev.map((n) => (n.id === noteId ? { ...n, bin } : n)));
  };

  const handleComplete = useCallback(() => {
    setCompleted(true);
    play('/sounds/tada.mp3');
  }, [play]);

  if (!session || !loaded) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">טוען...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-4xl mb-4">📝</div>
        <p className="text-xl text-gray-500 mb-4">אין פתקים למיון</p>
        <button
          onClick={() => router.push(`/s/${code}/write`)}
          className="text-[#6c5ce7] underline"
        >
          חזרה לכתיבה
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CompletionScreen
          totalNotes={notes.length}
          onContinue={() => router.push(`/s/${code}/done`)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-caveat)' }}>
          זמן למיין! 🗑️
        </h1>
        <p className="text-sm text-gray-400 mt-1">לחצ/י על הסל המתאים לכל פתק</p>

        {/* Mute button */}
        <button
          onClick={() => {/* toggle handled by useSoundEffect */}}
          className="mt-2 text-xs text-gray-400 hover:text-gray-600"
        >
          🔊
        </button>
      </div>

      <NoteSorter
        notes={notes}
        onSort={handleSort}
        onComplete={handleComplete}
        playSound={play}
      />
    </div>
  );
}
