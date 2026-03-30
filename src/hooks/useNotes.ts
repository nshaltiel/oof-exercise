'use client';

import { useState, useCallback } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Note } from '@/types/note';
import { BinType } from '@/types/bin';

export function useNotes(sessionId: string) {
  const [loading, setLoading] = useState(false);

  const addNote = useCallback(
    async (text: string, teacherToken: string) => {
      if (!sessionId || !text.trim()) return;
      await addDoc(collection(db, 'sessions', sessionId, 'notes'), {
        text: text.trim(),
        teacherToken,
        bin: null,
        sortedAt: null,
        createdAt: serverTimestamp(),
      });
    },
    [sessionId]
  );

  const getTeacherNotes = useCallback(
    async (teacherToken: string): Promise<Note[]> => {
      if (!sessionId || !teacherToken) return [];
      setLoading(true);
      const q = query(
        collection(db, 'sessions', sessionId, 'notes'),
        where('teacherToken', '==', teacherToken),
        orderBy('createdAt', 'asc')
      );
      const snapshot = await getDocs(q);
      const notes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
      setLoading(false);
      return notes;
    },
    [sessionId]
  );

  const getAllNotes = useCallback(async (): Promise<Note[]> => {
    if (!sessionId) return [];
    setLoading(true);
    const q = query(collection(db, 'sessions', sessionId, 'notes'), orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);
    const notes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
    setLoading(false);
    return notes;
  }, [sessionId]);

  const sortNote = useCallback(
    async (noteId: string, bin: BinType) => {
      if (!sessionId) return;
      await updateDoc(doc(db, 'sessions', sessionId, 'notes', noteId), {
        bin,
        sortedAt: serverTimestamp(),
      });
    },
    [sessionId]
  );

  const moveNote = useCallback(
    async (noteId: string, bin: BinType) => {
      if (!sessionId) return;
      await updateDoc(doc(db, 'sessions', sessionId, 'notes', noteId), {
        bin,
        sortedAt: serverTimestamp(),
      });
    },
    [sessionId]
  );

  const deleteNote = useCallback(
    async (noteId: string) => {
      if (!sessionId) return;
      await deleteDoc(doc(db, 'sessions', sessionId, 'notes', noteId));
    },
    [sessionId]
  );

  const deleteAllNotes = useCallback(async () => {
    if (!sessionId) return;
    const snapshot = await getDocs(collection(db, 'sessions', sessionId, 'notes'));
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }, [sessionId]);

  return { addNote, getTeacherNotes, getAllNotes, sortNote, moveNote, deleteNote, deleteAllNotes, loading };
}
