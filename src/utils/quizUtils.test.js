import { describe, it, expect } from 'vitest';
import { resolveCorrectIndex } from './quizUtils.js';

describe('resolveCorrectIndex', () => {
  it('number correctAnswer ni indeks sifatida qaytaradi', () => {
    expect(resolveCorrectIndex({ options: ['a', 'b', 'c'], correctAnswer: 1 })).toBe(1);
  });

  it('correctAnswerIndex ni qo\'llaydi', () => {
    expect(resolveCorrectIndex({ options: ['a', 'b'], correctAnswerIndex: 0 })).toBe(0);
  });

  it('answer maydonini qo\'llaydi', () => {
    expect(resolveCorrectIndex({ options: ['a', 'b'], answer: 1 })).toBe(1);
  });

  it('answerIndex maydonini qo\'llaydi', () => {
    expect(resolveCorrectIndex({ options: ['a', 'b'], answerIndex: 0 })).toBe(0);
  });

  it('string javobni options ichidan topadi', () => {
    expect(
      resolveCorrectIndex({ options: ['ES5 (2009)', 'ES6 (2015)'], correctAnswer: 'ES6 (2015)' })
    ).toBe(1);
  });

  it('topilmagan string javob uchun -1 qaytaradi', () => {
    expect(resolveCorrectIndex({ options: ['a', 'b'], correctAnswer: 'c' })).toBe(-1);
  });

  it('oraliqdan tashqaridagi indeks uchun -1 qaytaradi', () => {
    expect(resolveCorrectIndex({ options: ['a'], correctAnswer: 5 })).toBe(-1);
  });

  it('javob bo\'lmasa -1 qaytaradi', () => {
    expect(resolveCorrectIndex({ options: ['a'] })).toBe(-1);
    expect(resolveCorrectIndex(null)).toBe(-1);
  });
});
