'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Session } from '@/types/session';
import { generateShortCode } from '@/lib/shortCode';

export function useSessions(principalUid: string | undefined) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!principalUid) {
      setLoading(false);
      return;
    }

    async function fetchSessions() {
      try {
        const q = query(
          collection(db, 'sessions'),
          where('principalUid', '==', principalUid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Session));
        setSessions(data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, [principalUid]);

  return { sessions, loading };
}

export function useCreateSession() {
  const [creating, setCreating] = useState(false);

  const createSession = useCallback(
    async (principalUid: string, principalEmail: string, schoolName: string, title: string) => {
      setCreating(true);
      const shortCode = generateShortCode();
      const docRef = await addDoc(collection(db, 'sessions'), {
        principalUid,
        principalEmail,
        schoolName,
        title,
        shortCode,
        status: 'writing',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setCreating(false);
      return { id: docRef.id, shortCode };
    },
    []
  );

  return { createSession, creating };
}

export function useSessionByCode(code: string) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    async function fetchSession() {
      try {
        const q = query(collection(db, 'sessions'), where('shortCode', '==', code.toUpperCase()));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const d = snapshot.docs[0];
          setSession({ id: d.id, ...d.data() } as Session);
        }
      } catch (err) {
        console.error('Error fetching session by code:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [code]);

  return { session, loading };
}

export function useSessionById(sessionId: string) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    async function fetchSession() {
      try {
        const docSnap = await getDoc(doc(db, 'sessions', sessionId));
        if (docSnap.exists()) {
          setSession({ id: docSnap.id, ...docSnap.data() } as Session);
        }
      } catch (err) {
        console.error('Error fetching session by ID:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId]);

  return { session, loading };
}

export async function updateSessionStatus(sessionId: string, status: Session['status']) {
  await updateDoc(doc(db, 'sessions', sessionId), {
    status,
    updatedAt: serverTimestamp(),
  });
}
