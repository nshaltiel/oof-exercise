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
      try {
        await addDoc(collection(db, 'sessions', sessionId, 'notes'), {
          text: text.trim(),
          teacherToken,
          bin: null,
          sortedAt: null,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error('Error adding note:', err);
      }
    },
    [sessionId]
  );

  const getTeacherNotes = useCallback(
    async (teacherToken: string): Promise<Note[]> => {
      if (!sessionId || !teacherToken) return [];
      setLoading(true);
      try {
        const q = query(
          collection(db, 'sessions', sessionId, 'notes'),
          where('teacherToken', '==', teacherToken),
          orderBy('createdAt', 'asc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
      } catch (err) {
        console.error('Error fetching teacher notes:', err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [sessionId]
  );

  const getAllNotes = useCallback(async (): Promise<Note[]> => {
    if (!sessionId) return [];
    setLoading(true);
    try {
      const q = query(collection(db, 'sessions', sessionId, 'notes'), orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
    } catch (err) {
      console.error('Error fetching all notes:', err);
      return [];
    } finally {
      setLoading(false);
    }
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
