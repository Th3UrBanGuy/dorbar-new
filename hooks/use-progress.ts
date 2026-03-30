"use client";

import { useState, useEffect } from "react";

export type LastRead = {
  id: string; // e.g., '1' for Al-Fatihah or 'bukhari'
  name: string; // e.g., 'Al-Fatihah' or 'Sahih Bukhari'
  subInfo: string; // e.g., 'Ayah No. 1' or 'Book of Revelation'
  url: string; // e.g., '/quran/1#ayah-1'
};

interface ProgressState {
  quranXP: number;
  hadithXP: number;
  lastReadQuran: LastRead | null;
  lastReadHadith: LastRead | null;
}

const DEFAULT_STATE: ProgressState = {
  quranXP: 0,
  hadithXP: 0,
  lastReadQuran: {
    id: "1",
    name: "Al-Fatihah",
    subInfo: "Ayah No. 1",
    url: "/quran/1",
  },
  lastReadHadith: {
    id: "bukhari",
    name: "Sahih Bukhari",
    subInfo: "Hadith 1",
    url: "/hadith/bukhari",
  },
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dorbar_progress");
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newState: ProgressState) => {
    setProgress(newState);
    localStorage.setItem("dorbar_progress", JSON.stringify(newState));
  };

  const addQuranXP = (amount: number) => {
    saveProgress({ ...progress, quranXP: progress.quranXP + amount });
  };

  const addHadithXP = (amount: number) => {
    saveProgress({ ...progress, hadithXP: progress.hadithXP + amount });
  };

  const updateLastReadQuran = (read: LastRead) => {
    saveProgress({ ...progress, lastReadQuran: read });
  };

  const updateLastReadHadith = (read: LastRead) => {
    saveProgress({ ...progress, lastReadHadith: read });
  };

  // Gamification Math: Level = floor(sqrt(XP / 100)) + 1
  const quranLevel = Math.floor(Math.sqrt(progress.quranXP / 100)) + 1;
  const hadithLevel = Math.floor(Math.sqrt(progress.hadithXP / 100)) + 1;

  const quranNextLevelXP = Math.pow(quranLevel, 2) * 100;
  const hadithNextLevelXP = Math.pow(hadithLevel, 2) * 100;

  return {
    isLoaded,
    progress,
    quranLevel,
    hadithLevel,
    quranNextLevelXP,
    hadithNextLevelXP,
    addQuranXP,
    addHadithXP,
    updateLastReadQuran,
    updateLastReadHadith,
  };
}
