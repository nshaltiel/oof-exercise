'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Note } from '@/types/note';

export function useRealtimeNotes(sessionId: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const q = query(
      collection(db, 'sessions', sessionId, 'notes'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
      setNotes(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [sessionId]);

  return { notes, loading };
}
