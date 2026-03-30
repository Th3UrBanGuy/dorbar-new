"use client";

import { useState, useCallback, useEffect } from 'react';
import { QARIS } from '@/lib/qaris';

export function useAudioCache(ayahGlobalNumbers: number[]) {
  const [selectedQari, setSelectedQari] = useState(QARIS[0].id);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferred-qari');
    if (saved && QARIS.some(q => q.id === saved)) {
      setSelectedQari(saved);
    }
  }, []);

  // Whenever Qari or Ayahs change, check cache
  useEffect(() => {
    if (ayahGlobalNumbers.length > 0) {
      checkCacheStatus(selectedQari);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQari, ayahGlobalNumbers.join(',')]);

  const changeQari = (id: string) => {
    setSelectedQari(id);
    localStorage.setItem('preferred-qari', id);
  };

  const getAudioUrl = (qariId: string, ayahNum: number) => {
    const qari = QARIS.find(q => q.id === qariId) || QARIS[0];
    return `https://cdn.islamic.network/quran/audio/${qari.bitrate}/${qariId}/${ayahNum}.mp3`;
  };

  const checkCacheStatus = async (qariId: string) => {
    try {
      const cache = await caches.open('dorbar-quran-audio');
      let count = 0;
      for (const num of ayahGlobalNumbers) {
        const url = getAudioUrl(qariId, num);
        const match = await cache.match(url);
        if (match) count++;
      }
      setDownloadedCount(count);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadAll = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const cache = await caches.open('dorbar-quran-audio');
      let count = downloadedCount;
      
      // Batch download to avoid blocking browser
      const batchSize = 3;
      for (let i = 0; i < ayahGlobalNumbers.length; i += batchSize) {
        const batch = ayahGlobalNumbers.slice(i, i + batchSize);
        await Promise.all(batch.map(async (num) => {
          const url = getAudioUrl(selectedQari, num);
          const exists = await cache.match(url);
          if (!exists) {
            try {
              const res = await fetch(url);
              if (res.ok) {
                await cache.put(url, res);
                count++;
                setDownloadedCount(count);
              }
            } catch (e) { console.error("Failed to fetch", url); }
          }
        }));
      }
    } catch (err) {
      console.error("Cache error", err);
    } finally {
      setIsDownloading(false);
      checkCacheStatus(selectedQari);
    }
  };

  const removeDownload = async () => {
    try {
      const cache = await caches.open('dorbar-quran-audio');
      for (const num of ayahGlobalNumbers) {
        const url = getAudioUrl(selectedQari, num);
        await cache.delete(url);
      }
      setDownloadedCount(0);
    } catch (e) {}
  };

  const getPlayableUrl = async (ayahNum: number) => {
    const url = getAudioUrl(selectedQari, ayahNum);
    try {
      const cache = await caches.open('dorbar-quran-audio');
      const match = await cache.match(url);
      if (match) {
        const blob = await match.blob();
        return URL.createObjectURL(blob);
      }
    } catch (e) {}
    return url; // Stream fallback if not cached
  };

  return {
    selectedQari,
    changeQari,
    downloadedCount,
    totalCount: ayahGlobalNumbers.length,
    isFullyDownloaded: downloadedCount === ayahGlobalNumbers.length,
    isDownloading,
    downloadAll,
    removeDownload,
    getPlayableUrl
  };
}
