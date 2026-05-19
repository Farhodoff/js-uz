import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lessonsDir = path.resolve(__dirname, "lessons");

function getJsFiles(dir) {
  let files = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files = files.concat(getJsFiles(filePath));
    } else if (file.endsWith(".js")) {
      files.push(filePath);
    }
  });
  return files;
}

describe("All Lesson Files Validation", () => {
  const files = getJsFiles(lessonsDir);
  files.forEach((file) => {
    const relativePath = path.relative(__dirname, file);
    it(`should load ${relativePath} successfully and have correct structure`, async () => {
      const module = await import(`./${relativePath}`);
      const exportKey = Object.keys(module)[0];
      const lesson = module[exportKey];
      expect(lesson).toBeDefined();
      expect(lesson.id).toBeTypeOf("string");
      expect(lesson.title).toBeTypeOf("string");
      expect(lesson.theory).toBeTypeOf("string");
    });
  });
});
