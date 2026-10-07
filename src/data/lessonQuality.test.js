import { describe, it, expect } from "vitest";
import { curriculum, SECTIONS } from "./curriculum.js";
import { reworkedLessons } from "./reworkedLessons.js";
import * as acorn from "acorn";

// Qayta ishlangan darslar rule.txt standartini to'liq qonqilishi shart.
// Bu guard regressiyani oldini oladi: qayta ishlangan dars sifati pasaymasin.
const TEMPLATE_MARKERS = [
  "Bu nima", "Nega kerak", "Birinchi misol", "Qator-baqator",
  "xatolar", "Tekshiruv", "Xulosa"
];

async function findLesson(id) {
  for (const key of SECTIONS) {
    for (const l of curriculum[key].lessons) {
      if (l.id === id) return { section: key, entry: l, lesson: await l.load() };
    }
  }
  return null;
}

describe("Qayta ishlangan darslar sifati (rule.txt guard)", () => {
  it("reworkedLessons dagi har bir dars curriculum da mavjud", async () => {
    for (const id of reworkedLessons) {
      const found = await findLesson(id);
      expect(found, "reworkedLessons da mavjud bo'lmagan dars: " + id).not.toBeNull();
    }
  });

  it("har bir qayta ishlangan dars to'liq standartga javob beradi", async () => {
    for (const id of reworkedLessons) {
      const found = await findLesson(id);
      if (!found) continue;
      const lesson = found.lesson;
      const body = lesson.theory ?? lesson.content ?? "";
      const label = id + " (" + found.section + ")";

      // 1. Shablon bo'limlari (kamida 7/7)
      const lower = body.toLowerCase();
      const hits = TEMPLATE_MARKERS.filter((t) => lower.includes(t.toLowerCase())).length;
      expect(hits, label + ": rule.txt shablon bo'limlari yetarli emas").toBeGreaterThanOrEqual(7);

      // 2. Nazariya uzunligi
      expect(body.length, label + ": nazariya qisqa").toBeGreaterThanOrEqual(3500);

      // 3. Mashqlar >= 10, har birida instruction + test
      const ex = Array.isArray(lesson.exercises) ? lesson.exercises : [];
      expect(ex.length, label + ": mashqlar < 10").toBeGreaterThanOrEqual(10);
      for (const e of ex) {
        const inst = e.instruction ?? e.description ?? e.task;
        expect(typeof inst, label + ": mashq instruction kerak").toBe("string");
        const hasTest = typeof e.test === "string" || typeof e.testCode === "string" ||
          typeof e.solution === "string" || typeof e.initialCode === "string";
        expect(hasTest, label + ": mashqda test/solution kerak").toBe(true);
      }

      // 4. Savollar >= 12, har birida explanation
      const qz = Array.isArray(lesson.quizzes) ? lesson.quizzes : [];
      expect(qz.length, label + ": savollar < 12").toBeGreaterThanOrEqual(12);
      for (const q of qz) {
        expect(typeof q.question, label + ": quiz question kerak").toBe("string");
        expect(q.explanation && String(q.explanation).trim().length, label + ": explanation kerak").toBeGreaterThan(0);
      }

      // 5. Nazariyadagi kod bloklari sintaksis jihatdan yaroqli
      const re = /```javascript\n([\s\S]*?)```/g;
      let m;
      const syntaxErrors = [];
      while ((m = re.exec(body)) !== null) {
        // Xatolar bo'limidagi bloklar (oldinda ❌) qasddan yaroqsiz yoziladi — tekshirmaymiz
        const ctx = body.slice(Math.max(0, m.index - 250), m.index);
        if (ctx.includes(String.fromCharCode(10060)) || ctx.includes('Xatoni topish') || ctx.includes('SyntaxError')) continue;
        try {
          acorn.parse(m[1], { ecmaVersion: "latest", sourceType: "module" });
        } catch (e) {
          syntaxErrors.push(e.message);
        }
      }
      expect(syntaxErrors, label + ": kod bloklari xato: " + syntaxErrors.join("; ")).toEqual([]);
    }
  });
});
