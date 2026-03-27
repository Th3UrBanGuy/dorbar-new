"use client";

import { useState, useEffect, useRef, useCallback, ReactNode } from "react";

interface LazyListProps<T> {
  items: T[];
  initialCount?: number;
  batchSize?: number;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  className?: string;
}

/**
 * Generic progressive lazy-loading list component.
 * Renders `initialCount` items immediately, then loads `batchSize` more
 * each time the user scrolls near the bottom (IntersectionObserver).
 */
export function LazyList<T>({
  items,
  initialCount = 10,
  batchSize = 8,
  renderItem,
  keyExtractor,
  className = "",
}: LazyListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, items.length));
  }, [batchSize, items.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" } // Start loading 400px before visible
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Reset count when items change (e.g. different surah)
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [items, initialCount]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className={className}>
      {visibleItems.map((item, index) => (
        <div key={keyExtractor(item)}>{renderItem(item, index)}</div>
      ))}

      {/* Sentinel element for IntersectionObserver */}
      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
          <span className="ml-3 text-sm text-slate-400 font-medium">
            Loading more... ({visibleCount}/{items.length})
          </span>
        </div>
      )}
    </div>
  );
}
