import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './useAppStore.js';

describe('useAppStore', () => {
  beforeEach(() => {
    // Har bir testdan oldin store'ni tozalash
    useAppStore.setState({
      activeTrack: 'js',
      sidebarOpen: true,
      isSearchOpen: false,
      isSettingsOpen: false,
      completed: {},
      bookmarks: [],
      xp: 0,
      level: 1,
    });
  });

  describe('UI state', () => {
    it('activeTrack boshlang\'ich qiymati js bo\'lishi kerak', () => {
      expect(useAppStore.getState().activeTrack).toBe('js');
    });

    it('setActiveTrack trackni almashtiradi', () => {
      useAppStore.getState().setActiveTrack('react');
      expect(useAppStore.getState().activeTrack).toBe('react');
    });

    it('setSidebarOpen sidebar holatini o\'zgartiradi', () => {
      useAppStore.getState().setSidebarOpen(false);
      expect(useAppStore.getState().sidebarOpen).toBe(false);
      useAppStore.getState().setSidebarOpen(true);
      expect(useAppStore.getState().sidebarOpen).toBe(true);
    });

    it('setSearchOpen qidiruv oynasini boshqaradi', () => {
      useAppStore.getState().setSearchOpen(true);
      expect(useAppStore.getState().isSearchOpen).toBe(true);
    });

    it('setSettingsOpen sozlamalar oynasini boshqaradi', () => {
      useAppStore.getState().setSettingsOpen(true);
      expect(useAppStore.getState().isSettingsOpen).toBe(true);
    });
  });

  describe('bookmarks', () => {
    it('toggleBookmark bookmark qo\'shadi va olib tashlaydi', () => {
      const { toggleBookmark } = useAppStore.getState();
      toggleBookmark('lesson-1');
      expect(useAppStore.getState().bookmarks).toContain('lesson-1');

      useAppStore.getState().toggleBookmark('lesson-1');
      expect(useAppStore.getState().bookmarks).not.toContain('lesson-1');
    });

    it('bir nechta bookmark saqlanadi', () => {
      useAppStore.getState().toggleBookmark('a');
      useAppStore.getState().toggleBookmark('b');
      expect(useAppStore.getState().bookmarks).toEqual(['a', 'b']);
    });
  });

  describe('progress & XP', () => {
    it('markComplete darsni bajarilgan deb belgilaydi va XP beradi', () => {
      useAppStore.getState().markComplete('lesson-1', 10);
      expect(useAppStore.getState().isComplete('lesson-1')).toBe(true);
      expect(useAppStore.getState().xp).toBe(10);
    });

    it('ikki marta markComplete XP ni ikki marta bermaydi', () => {
      useAppStore.getState().markComplete('lesson-1', 10);
      useAppStore.getState().markComplete('lesson-1', 10);
      expect(useAppStore.getState().xp).toBe(10);
    });

    it('100 XP da level oshadi', () => {
      useAppStore.getState().markComplete('l1', 60);
      useAppStore.getState().markComplete('l2', 50);
      expect(useAppStore.getState().xp).toBe(110);
      expect(useAppStore.getState().level).toBe(2);
    });

    it('isComplete bajarilmagan dars uchun false qaytaradi', () => {
      expect(useAppStore.getState().isComplete('mavjud-emas')).toBe(false);
    });
  });

  describe('getStats & totalCompleted', () => {
    it('getStats to\'g\'ri foiz hisoblaydi', () => {
      const lessons = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
      useAppStore.getState().markComplete('a');
      useAppStore.getState().markComplete('b');
      const stats = useAppStore.getState().getStats(lessons);
      expect(stats.done).toBe(2);
      expect(stats.total).toBe(4);
      expect(stats.percent).toBe(50);
    });

    it('getStats bo\'sh ro\'yxat uchun 0 qaytaradi', () => {
      const stats = useAppStore.getState().getStats([]);
      expect(stats).toEqual({ done: 0, total: 0, percent: 0 });
    });

    it('totalCompleted faqat dars id larini sanaydi (quiz/exercise kalitlarsiz)', () => {
      useAppStore.getState().markComplete('lesson-1');
      useAppStore.getState().markComplete('lesson-1_0');
      useAppStore.getState().markComplete('lesson-1_quiz_0');
      // '_' belgisi bor kalitlar exercise/quiz progress — ular sanalmasligi kerak
      expect(useAppStore.getState().totalCompleted()).toBe(1);
    });
  });
});
