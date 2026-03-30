'use client';

import { Note } from '@/types/note';
import { BinType, BIN_CONFIG, BIN_ORDER } from '@/types/bin';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BinIllustration from '@/components/ui/BinIllustration';

interface BinDashboardProps {
  notes: Note[];
  sessionId: string;
}

function getFillLevel(count: number): 'empty' | 'half' | 'full' {
  if (count === 0) return 'empty';
  if (count <= 5) return 'half';
  return 'full';
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BIN_ORDER.map((bin, index) => {
          const config = BIN_CONFIG[bin];
          const binNotes = getNotesByBin(bin);
          const fillLevel = getFillLevel(binNotes.length);

          return (
            <Link key={bin} href={`/dashboard/${sessionId}/bin/${bin}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-white rounded-3xl p-6 shadow-md cursor-pointer transition-all hover:shadow-xl relative overflow-hidden"
                style={{
                  borderBottom: `4px solid ${config.color}`,
                }}
              >
                {/* Background decoration */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
                  style={{ backgroundColor: config.color, transform: 'translate(30%, -30%)' }}
                />

                {/* Header with illustration */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <BinIllustration type={bin} size={60} fillLevel={fillLevel} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{config.label}</h3>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: config.color }}
                    >
                      {binNotes.length}
                    </span>
                    <span className="text-sm text-gray-400 mr-1">פתקים</span>
                  </div>
                </div>

                {/* Preview of notes as sticky notes */}
                <div className="space-y-2">
                  {binNotes.slice(0, 3).map((note, i) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="text-sm p-3 rounded-lg shadow-sm relative"
                      style={{
                        backgroundColor: config.bgColor,
                        fontFamily: 'var(--font-caveat)',
                        fontSize: '1rem',
                        transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (0.5 + i * 0.3)}deg)`,
                        borderRight: `3px solid ${config.color}`,
                      }}
                    >
                      {note.text}
                    </motion.div>
                  ))}
                  {binNotes.length > 3 && (
                    <p className="text-xs text-gray-400 text-center pt-1">
                      +{binNotes.length - 3} נוספים
                    </p>
                  )}
                  {binNotes.length === 0 && (
                    <p className="text-sm text-gray-300 text-center py-4">
                      הסל ריק
                    </p>
                  )}
                </div>

                {/* "Open" hint */}
                <div className="text-center mt-4">
                  <span className="text-xs text-gray-300">לחץ לצפייה מלאה</span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
