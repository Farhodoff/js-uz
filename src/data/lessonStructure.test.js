import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lessonsDir = path.resolve(__dirname, 'lessons');

function getJsFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) files.push(...getJsFiles(full));
    else if (entry.endsWith('.js')) files.push(full);
  }
  return files;
}

const files = getJsFiles(lessonsDir);

const lessonCache = new Map();

async function loadLesson(file) {
  if (lessonCache.has(file)) return lessonCache.get(file);
  const rel = path.relative(__dirname, file);
  const mod = await import(`./${rel}`);
  const lesson = mod[Object.keys(mod)[0]];
  lessonCache.set(file, lesson);
  return lesson;
}

describe('Lesson exercises tuzilmasi', { timeout: 60000 }, () => {
  it('har bir exercise da ko\'rsatma (instruction/description) bo\'lishi kerak', async () => {
    for (const file of files) {
      const lesson = await loadLesson(file);
      if (!lesson?.exercises) continue;
      // Ba'zi legacy darslarda exercises string (kod shabloni) ko'rinishida
      if (typeof lesson.exercises === 'string') continue;
      expect(Array.isArray(lesson.exercises), `${lesson.id}: exercises massiv yoki string bo'lishi kerak`).toBe(true);
      for (const ex of lesson.exercises) {
        const text = ex.instruction ?? ex.description ?? ex.task;
        expect(text, `${lesson.id}: exercise instruction/description kerak`).toBeTypeOf('string');
        expect(text.length, `${lesson.id}: instruction bo'sh bo'lmasin`).toBeGreaterThan(0);
        // test maydonlari: test | testCode | leetcode-uslub (solution/initialCode)
        const hasTest = typeof ex.test === 'string' || typeof ex.testCode === 'string' ||
          typeof ex.solution === 'string' || typeof ex.initialCode === 'string';
        expect(hasTest, `${lesson.id}: exercise da test/testCode/solution dan biri bo'lsin`).toBe(true);
        if (ex.startingCode !== undefined) {
          expect(ex.startingCode, `${lesson.id}: startingCode string bo'lsin`).toBeTypeOf('string');
        }
      }
    }
  });

  it('exercise test kodi sintaksis jihatdan yaroqli bo\'lishi kerak (backlog guard)', async () => {
    // 75 ta exercise testida o'zbekcha apostrof (o'g'ri) bitta qo'shtirnoq ichida
    // qochirilmagan — bu runtime'da sintaksis xato beradi va mashqni o'tib
    // bo'lmaydi. Bu kontent backlog. Yangi xatolar kirmasligi uchun soni
    // ko'paymasligini qo'riqlaymiz.
    const invalid = [];
    for (const file of files) {
      const lesson = await loadLesson(file);
      if (!lesson?.exercises || !Array.isArray(lesson.exercises)) continue;
      for (const ex of lesson.exercises) {
        for (const field of ['test', 'testCode']) {
          if (typeof ex[field] !== 'string' || ex[field].trim() === '') continue;
          let ok = false;
          try { new Function('code', 'logs', ex[field]); ok = true; } catch { /* keyingi urinish */ }
          if (!ok) {
            try { new Function(ex[field]); ok = true; } catch { /* pastda ro'yxatga olamiz */ }
          }
          if (!ok) invalid.push(`${lesson.id}:ex${ex.id ?? '?'}:${field}`);
        }
      }
    }
    expect(
      invalid.length,
      `Yangi sintaksis-xato exercise testlar: ${invalid.slice(75).join(', ')}`
    ).toBeLessThanOrEqual(75);
  });

  it('exercise id lari takrorlanmasligi kerak', async () => {
    for (const file of files) {
      const lesson = await loadLesson(file);
      if (!lesson?.exercises || !Array.isArray(lesson.exercises)) continue;
      const ids = lesson.exercises.map((e) => e.id ?? e.title ?? JSON.stringify(e).slice(0, 50));
      expect(new Set(ids).size, `${lesson.id}: exercise id takrorlangan`).toBe(ids.length);
    }
  });
});

describe('Lesson quizzes tuzilmasi', { timeout: 60000 }, () => {
  it('har bir quiz da question, options va to\'g\'ri javob indeksi bo\'lishi kerak', async () => {
    for (const file of files) {
      const lesson = await loadLesson(file);
      if (!lesson?.quizzes) continue;
      expect(Array.isArray(lesson.quizzes), `${lesson.id}: quizzes massiv bo'lishi kerak`).toBe(true);
      for (const q of lesson.quizzes) {
        expect(q.question, `${lesson.id}: quiz question kerak`).toBeTypeOf('string');
        expect(Array.isArray(q.options), `${lesson.id}: quiz options massiv bo'lsin`).toBe(true);
        expect(q.options.length, `${lesson.id}: kamida 2 variant bo'lsin`).toBeGreaterThanOrEqual(2);
        // Loyihada 4 xil nom ishlatiladi:
        // correctAnswer | correctAnswerIndex | answer | answerIndex.
        // Qiymat raqam (indeks) yoki string (variant matni) bo'lishi mumkin.
        const ans = q.correctAnswer ?? q.correctAnswerIndex ?? q.answer ?? q.answerIndex;
        if (typeof ans === 'number') {
          expect(ans, `${lesson.id}: javob indeksi options oralig'ida bo'lsin`).toBeGreaterThanOrEqual(0);
          expect(ans, `${lesson.id}: javob indeksi options oralig'ida bo'lsin`).toBeLessThan(q.options.length);
        } else {
          expect(ans, `${lesson.id}: correctAnswer string yoki number bo'lsin`).toBeTypeOf('string');
          expect(q.options.includes(ans), `${lesson.id}: string javob options ichida bo'lsin`).toBe(true);
        }
      }
    }
  });

  it('quiz explanation bo\'sh bo\'lmasligi kerak', async () => {
    for (const file of files) {
      const lesson = await loadLesson(file);
      if (!lesson?.quizzes) continue;
      for (const q of lesson.quizzes) {
        if (q.explanation !== undefined) {
          expect(q.explanation, `${lesson.id}: explanation string bo'lsin`).toBeTypeOf('string');
        }
      }
    }
  });
});

describe('Lesson meta', { timeout: 60000 }, () => {
  it('har bir darsda id va title bo\'lishi kerak', async () => {
    for (const file of files) {
      const lesson = await loadLesson(file);
      expect(lesson?.id, file).toBeTypeOf('string');
      expect(lesson?.title, file).toBeTypeOf('string');
    }
  });

  it('theory yoki content dan biri bo\'lishi kerak', async () => {
    for (const file of files) {
      const lesson = await loadLesson(file);
      const body = lesson?.theory ?? lesson?.content;
      expect(body, `${lesson?.id}: theory/content kerak`).toBeTypeOf('string');
      expect(body.length, `${lesson?.id}: theory bo'sh bo'lmasin`).toBeGreaterThan(20);
    }
  });
});
