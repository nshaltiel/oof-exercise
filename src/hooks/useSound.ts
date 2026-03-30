'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

const MUTE_KEY = 'oof_muted';

export function useSoundEffect() {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(localStorage.getItem(MUTE_KEY) === 'true');
  }, []);

  const play = useCallback(
    (src: string) => {
      if (muted) return;
      if (!audioCache.current[src]) {
        audioCache.current[src] = new Audio(src);
      }
      const audio = audioCache.current[src];
      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
    [muted]
  );

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(MUTE_KEY, String(next));
      return next;
    });
  }, []);

  return { play, muted, toggleMute };
}
