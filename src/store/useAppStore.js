import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Global UI State
      sidebarOpen: true,
      setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),

      // Progress State
      completed: {},
      xp: 0,
      level: 1,

      markComplete: (key, rewardXp = 10) => set((state) => {
        if (state.completed[key]) return state; // Already completed, no double XP

        const newXp = state.xp + rewardXp;
        // Basic leveling formula: Every 100 XP is a new level
        const newLevel = Math.floor(newXp / 100) + 1;

        return {
          completed: { ...state.completed, [key]: true },
          xp: newXp,
          level: newLevel
        };
      }),
      isComplete: (key) => !!get().completed[key],
      getStats: (lessons = []) => {
        const state = get();
        const done = lessons.filter(l => state.completed[l.id]).length;
        return { 
          done, 
          total: lessons.length, 
          percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0 
        };
      },
      totalCompleted: () => {
        return Object.keys(get().completed).filter(k => !k.includes('_')).length;
      }
    }),
    {
      name: 'js-academy-progress-store',
      partialize: (state) => ({ 
        completed: state.completed,
        xp: state.xp,
        level: state.level
      }),
    }
  )
);
