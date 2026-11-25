import { describe, it, expect } from 'vitest';
import { calculateStreak } from './streakCalculator';

describe('Streak Calculator', () => {
  it('returns 0 for empty activity dates', () => {
    expect(calculateStreak([])).toBe(0);
    expect(calculateStreak(null)).toBe(0);
  });

  it('recognizes today active streak', () => {
    const today = new Date().toISOString();
    expect(calculateStreak([today])).toBe(1);
  });
});
