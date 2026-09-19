import { describe, it, expect } from "vitest";
import { curriculum, SECTIONS } from "./curriculum.js";
import { reactCurriculum, REACT_SECTIONS } from "./reactCurriculum.js";

describe("Curriculum Integrity", () => {
  it("SECTIONS faqat mavjud bo'limlarga ishora qiladi", () => {
    SECTIONS.forEach(key => {
      expect(curriculum[key], `curriculum.${key} mavjud bo'lishi kerak`).toBeDefined();
      expect(curriculum[key].lessons.length, `${key} bo'sh bo'lmasligi kerak`).toBeGreaterThan(0);
    });
    REACT_SECTIONS.forEach(key => {
      expect(reactCurriculum[key], `reactCurriculum.${key} mavjud bo'lishi kerak`).toBeDefined();
    });
  });

  it("dars id'lari har bir bo'lim ichida noyob", () => {
    const seen = new Set();
    SECTIONS.forEach(key => {
      curriculum[key].lessons.forEach(l => {
        expect(seen.has(l.id), `Takror id: ${l.id} (${key})`).toBe(false);
        seen.add(l.id);
      });
    });
  });

  it("har bir darsning load() funksiyasi haqiqiy lesson qaytaradi", async () => {
    for (const key of SECTIONS) {
      for (const lesson of curriculum[key].lessons) {
        const data = await lesson.load();
        expect(data, `${key}/${lesson.id} load() natija qaytarishi kerak`).toBeDefined();
        expect(data.title, `${key}/${lesson.id} title ga ega bo'lishi kerak`).toBeTypeOf("string");
      }
    }
    for (const key of REACT_SECTIONS) {
      for (const lesson of reactCurriculum[key].lessons) {
        const data = lesson.load ? await lesson.load() : lesson;
        expect(data, `react/${key}/${lesson.id} load() natija qaytarishi kerak`).toBeDefined();
      }
    }
  }, 120000);
});
