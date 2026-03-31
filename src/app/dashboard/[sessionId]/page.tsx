'use client';

export const dynamic = 'force-dynamic';

import { use } from 'react';
import { useSessionById } from '@/hooks/useSession';
import { useRealtimeNotes } from '@/hooks/useRealtimeNotes';
import { useNotes } from '@/hooks/useNotes';
import BinDashboard from '@/components/dashboard/BinDashboard';
import SettingsMenu from '@/components/dashboard/SettingsMenu';
import Link from 'next/link';

export default function SessionDashboardPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const { session, loading: sessionLoading } = useSessionById(sessionId);
  const { notes, loading: notesLoading } = useRealtimeNotes(sessionId);
  const { deleteAllNotes } = useNotes(sessionId);

  if (sessionLoading || notesLoading) {
    return <div className="text-center py-12 text-gray-500">טוען...</div>;
  }

  if (!session) {
    return <div className="text-center py-12 text-gray-500">סשן לא נמצא</div>;
  }

  const shareLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}/s/${session.shortCode}`
      : `/s/${session.shortCode}`;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600 mb-1 block">
            ← חזרה לרשימה
          </Link>
          <h1 className="text-2xl font-bold">{session.title}</h1>
          <p className="text-gray-500">{session.schoolName}</p>
          <p className="text-sm text-gray-400 mt-2 max-w-lg leading-relaxed">
            כעת ניתן לשתף את המסך עם הצוות ולדון יחד במעגלי ההשפעה שלנו. לחיצה על הפתק שמעניין אותנו מאפשרת העברה שלו לסל אחר או הסרה שלו.
          </p>
        </div>
        <SettingsMenu shareLink={shareLink} onDeleteAll={deleteAllNotes} />
      </div>

      <BinDashboard notes={notes} sessionId={sessionId} />
    </div>
  );
}
