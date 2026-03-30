'use client';

import { Note } from '@/types/note';
import { BinType, BIN_CONFIG, BIN_ORDER } from '@/types/bin';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BinDashboardProps {
  notes: Note[];
  sessionId: string;
}

export default function BinDashboard({ notes, sessionId }: BinDashboardProps) {
  const getNotesByBin = (bin: BinType) => notes.filter((n) => n.bin === bin);
  const unsorted = notes.filter((n) => n.bin === null);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex gap-4 text-center">
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold">{notes.length}</div>
          <div className="text-sm text-gray-500">סה&quot;כ פתקים</div>
        </div>
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold">{notes.length - unsorted.length}</div>
          <div className="text-sm text-gray-500">מויינו</div>
        </div>
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
          <div className="text-2xl font-bold">{unsorted.length}</div>
          <div className="text-sm text-gray-500">ממתינים</div>
        </div>
      </div>

      {/* Bins */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BIN_ORDER.map((bin) => {
          const config = BIN_CONFIG[bin];
          const binNotes = getNotesByBin(bin);

          return (
            <Link key={bin} href={`/dashboard/${sessionId}/bin/${bin}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-5 shadow-sm border-2 cursor-pointer transition-colors hover:shadow-md"
                style={{ borderColor: config.color }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{config.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{config.label}</h3>
                    <span className="text-sm text-gray-500">{binNotes.length} פתקים</span>
                  </div>
                </div>

                {/* Preview of first 3 notes */}
                <div className="space-y-2">
                  {binNotes.slice(0, 3).map((note) => (
                    <div
                      key={note.id}
                      className="text-sm p-2 rounded-lg"
                      style={{
                        backgroundColor: config.bgColor,
                        fontFamily: 'var(--font-caveat)',
                      }}
                    >
                      {note.text}
                    </div>
                  ))}
                  {binNotes.length > 3 && (
                    <p className="text-xs text-gray-400 text-center">
                      +{binNotes.length - 3} נוספים
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
