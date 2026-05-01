import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'js-academy-progress';

export function useProgress() {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch (e) {
      console.warn('Progress saqlashda xato:', e);
    }
  }, [completed]);

  const markComplete = useCallback((key) => {
    setCompleted(prev => ({ ...prev, [key]: true }));
  }, []);

  const isComplete = useCallback((key) => {
    return !!completed[key];
  }, [completed]);

  const getStats = useCallback((lessons) => {
    const done = lessons.filter(l => completed[l.id]).length;
    return { done, total: lessons.length, percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0 };
  }, [completed]);

  const totalCompleted = Object.keys(completed).filter(k => !k.includes('_')).length;

  return { completed, markComplete, isComplete, getStats, totalCompleted };
}
