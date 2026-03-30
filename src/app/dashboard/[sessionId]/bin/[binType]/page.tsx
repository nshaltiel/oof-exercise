'use client';

export const dynamic = 'force-dynamic';

import { use } from 'react';
import { useSessionById } from '@/hooks/useSession';
import { useRealtimeNotes } from '@/hooks/useRealtimeNotes';
import { useNotes } from '@/hooks/useNotes';
import { BinType } from '@/types/bin';
import BinDetailView from '@/components/dashboard/BinDetailView';
import PdfExportButton from '@/components/dashboard/PdfExportButton';
import Link from 'next/link';

export default function BinPage({
  params,
}: {
  params: Promise<{ sessionId: string; binType: string }>;
}) {
  const { sessionId, binType } = use(params);
  const { session } = useSessionById(sessionId);
  const { notes } = useRealtimeNotes(sessionId);
  const { moveNote, deleteNote } = useNotes(sessionId);

  const binNotes = notes.filter((n) => n.bin === binType);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`/dashboard/${sessionId}`}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          ← חזרה לדשבורד
        </Link>
        {session && (
          <PdfExportButton
            notes={binNotes}
            binType={binType as BinType}
            sessionTitle={session.title}
            schoolName={session.schoolName}
          />
        )}
      </div>

      <BinDetailView
        notes={binNotes}
        binType={binType as BinType}
        onMoveNote={moveNote}
        onDeleteNote={deleteNote}
      />
    </div>
  );
}
