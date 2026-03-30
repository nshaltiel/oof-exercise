'use client';

export const dynamic = 'force-dynamic';

import { useAuth } from '@/hooks/useAuth';
import { useSessions } from '@/hooks/useSession';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useAuth();
  const { sessions, loading, error } = useSessions(user?.uid);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-4 border-[#6c5ce7] border-t-transparent rounded-full"
        />
        <span className="text-gray-400 text-sm">טוען סשנים...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">😵</div>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#6c5ce7] text-white px-6 py-2 rounded-xl hover:bg-[#5b4bd5]"
        >
          נסה שוב
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">הסשנים שלי</h1>
        <Link
          href="/dashboard/new"
          className="bg-[#6c5ce7] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5b4bd5] transition-colors shadow-lg"
        >
          + תרגיל חדש
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl text-gray-500 mb-2">עדיין אין תרגילים</h2>
          <p className="text-gray-400">צור/צרי תרגיל אוף חדש כדי להתחיל</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((session, i) => (
            <Link key={session.id} href={`/dashboard/${session.id}`}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{session.title}</h3>
                    <p className="text-gray-500 text-sm">{session.schoolName}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      session.status === 'writing'
                        ? 'bg-blue-100 text-blue-600'
                        : session.status === 'sorting'
                        ? 'bg-yellow-100 text-yellow-600'
                        : session.status === 'review'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {session.status === 'writing'
                      ? 'כתיבה'
                      : session.status === 'sorting'
                      ? 'מיון'
                      : session.status === 'review'
                      ? 'סקירה'
                      : 'סגור'}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                  <span>קוד: {session.shortCode}</span>
                  <span>•</span>
                  <span>
                    {session.createdAt?.toDate
                      ? session.createdAt.toDate().toLocaleDateString('he-IL')
                      : ''}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
