'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TOKEN_KEY = 'oof_teacher_token';

export function useTeacherToken(): string {
  const [token, setToken] = useState('');

  useEffect(() => {
    let stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      stored = uuidv4();
      localStorage.setItem(TOKEN_KEY, stored);
    }
    setToken(stored);
  }, []);

  return token;
}
