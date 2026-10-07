import { describe, it, expect } from "vitest";
import { curriculum } from "./curriculum.js";

// SQL yo'nalishi: curriculum id bilan fayl id bir xil bo'lishi shart.
// Farq bo'lsa progress kalitlari va URL'lar ajralib ketadi.
describe("SQL id mosligi (curriculum vs fayl)", () => {
  it("har bir SQL darsning fayl id si curriculum id bilan bir xil", async () => {
    for (const l of curriculum.sql.lessons) {
      const data = await l.load();
      expect(data.id, "sql/" + l.id + " fayl id mos emas: " + data.id).toBe(l.id);
    }
  });
});
