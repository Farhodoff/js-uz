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

describe("Loop Guard & Code Runner Safety", () => {
  it("should inject loop guards into for/while loops", async () => {
    const { injectLoopGuard } = await import("../hooks/useCodeRunner.js");
    const code = "while(true) { console.log(1); }";
    const guarded = injectLoopGuard(code);
    expect(guarded).toContain("__loop_guards");
    expect(guarded).toContain("Cheksiz sikl aniqlandi");
  });

  it("should prevent infinite loops from running indefinitely", async () => {
    const { injectLoopGuard } = await import("../hooks/useCodeRunner.js");
    const infiniteLoopCode = `
      let x = 0;
      while(x < 10) {
        // x never increments, creating an infinite loop
      }
    `;
    const testCode = "return null;";
    const guardedCode = injectLoopGuard(infiniteLoopCode);
    
    const combinedCode = `
      "use strict";
      const __loop_guards = new Proxy({}, {
        get: (target, name) => target[name] || 0
      });
      try {
        ${guardedCode}
        return (function(code, logs) {
          ${testCode}
        })("", []);
      } catch (e) {
        return "Runtime Error: " + e.message;
      }
    `;

    const runner = new Function(combinedCode);
    const result = runner();
    expect(result).toBe("Runtime Error: Cheksiz sikl aniqlandi!");
  });
});

