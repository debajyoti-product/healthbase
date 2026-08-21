import { useState, useEffect } from 'react';

// Simple global state for unlocked insights
// Resets on page reload
const unlockedInsights = new Set<string>();
const listeners = new Set<() => void>();

export const unlockInsight = (id: string) => {
  unlockedInsights.add(id);
  listeners.forEach(l => l());
};

export const isInsightUnlocked = (id: string) => {
  return unlockedInsights.has(id);
};

export const useUnlockedStatus = (id: string, initialLocked: boolean) => {
  // If it's initially locked according to data, but we unlocked it globally, return true.
  // Otherwise return false.
  // We use the initial data locked state to know if it requires unlocking at all.
  const [unlocked, setUnlocked] = useState(!initialLocked || isInsightUnlocked(id));

  useEffect(() => {
    const listener = () => setUnlocked(!initialLocked || isInsightUnlocked(id));
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, [id, initialLocked]);

  return unlocked;
};
