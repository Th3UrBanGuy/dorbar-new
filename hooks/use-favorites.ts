"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing favourites in localStorage.
 * @param storageKey - unique key like "quran-favorites" or "hadith-favorites"
 */
export function useFavorites(storageKey: string) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setLoaded(true);
  }, [storageKey]);

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(storageKey, JSON.stringify(favorites));
    }
  }, [favorites, storageKey, loaded]);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return { favorites, toggle, isFavorite, loaded };
}
