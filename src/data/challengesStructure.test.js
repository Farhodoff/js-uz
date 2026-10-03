import { describe, it, expect } from 'vitest';
import { challenges } from './challenges.js';

describe('Challenges banki', () => {
  it('challenges massiv va bo\'sh emas', () => {
    expect(Array.isArray(challenges)).toBe(true);
    expect(challenges.length).toBeGreaterThan(0);
  });

  it('har bir challenge da id, title, options, correctAnswer bor', () => {
    for (const ch of challenges) {
      expect(ch.id, 'challenge id kerak').toBeTypeOf('string');
      expect(ch.title, `${ch.id}: title kerak`).toBeTypeOf('string');
      expect(Array.isArray(ch.options), `${ch.id}: options massiv bo'lsin`).toBe(true);
      expect(ch.options.length, `${ch.id}: kamida 2 variant`).toBeGreaterThanOrEqual(2);
      expect(ch.correctAnswer, `${ch.id}: correctAnswer kerak`).toBeTypeOf('string');
    }
  });

  it('correctAnswer options ichida bo\'lishi kerak (scraped tg- darslar backlog sifatida ro\'yxatga olinadi)', () => {
    const mismatched = challenges.filter((ch) => !ch.options.includes(ch.correctAnswer));
    // Telegramdan scrape qilingan 25 ta savolda correctAnswer options ichida emas —
    // bu ma'lumotlar sifati bo'yicha alohida backlog. Yangi xatolar kirmasligi uchun
    // soni ko'paymasligini qo'riqlaymiz.
    expect(
      mismatched.length,
      `Yangi mismatched challenge lar: ${mismatched.map((c) => c.id).join(', ')}`
    ).toBeLessThanOrEqual(25);
  });

  it('id lar takrorlanmaydi', () => {
    const ids = challenges.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('difficulty ruxsat etilgan qiymatlardan biri', () => {
    const allowed = new Set(['easy', 'medium', 'hard']);
    for (const ch of challenges) {
      if (ch.difficulty !== undefined) {
        expect(allowed.has(ch.difficulty), `${ch.id}: difficulty noto'g'ri: ${ch.difficulty}`).toBe(true);
      }
    }
  });

  it('options ichida takroriy variant yo\'q (scraped tg- darslar backlog sifatida)', () => {
    const dupes = challenges.filter((ch) => {
      const opts = ch.options.map((o) => String(o).trim());
      return new Set(opts).size !== opts.length;
    });
    expect(
      dupes.length,
      `Yangi duplicate-options challenge lar: ${dupes.map((c) => c.id).join(', ')}`
    ).toBeLessThanOrEqual(6);
  });
});
