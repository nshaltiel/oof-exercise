'use client';

import { useCallback, useRef, useEffect, useState } from 'react';

const MUTE_KEY = 'oof_muted';
const SOUND_FILES = [
  '/sounds/crumple.mp3',
  '/sounds/swoosh.mp3',
  '/sounds/thud.mp3',
  '/sounds/pop.mp3',
  '/sounds/tada.mp3',
];

export function useSoundEffect() {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  const [muted, setMuted] = useState(false);
  const unlockedRef = useRef(false);

  useEffect(() => {
    setMuted(localStorage.getItem(MUTE_KEY) === 'true');

    // Pre-load all audio files so they're ready to play
    SOUND_FILES.forEach((src) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.load();
      audioCache.current[src] = audio;
    });
  }, []);

  // Unlock audio context on first user interaction (required for iOS)
  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      Object.values(audioCache.current).forEach((audio) => {
        audio.play().then(() => audio.pause()).catch(() => {});
        audio.currentTime = 0;
      });
    };
    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    return () => {
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };
  }, []);

  const play = useCallback(
    (src: string) => {
      if (muted) return;
      const audio = audioCache.current[src] || new Audio(src);
      if (!audioCache.current[src]) {
        audioCache.current[src] = audio;
      }
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
