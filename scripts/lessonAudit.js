#!/usr/bin/env node
// lessonAudit.cjs — barcha darslarni rule.txt standarti bo'yicha tekshiruvchi audit.
// Ishga tushirish: node scripts/lessonAudit.cjs [bo'lim-idi]
import * as acorn from "acorn";
import { curriculum, SECTIONS } from "../src/data/curriculum.js";

const TEMPLATE_MARKERS = [
  "Bu nima", "Nega kerak", "Birinchi misol", "Qator-baqator",
  "xatolar", "Tekshiruv", "Xulosa"
];
const MIN_TEMPLATE = 6;
const MIN_EXERCISES = 10;
const MIN_QUIZZES = 12;
const MIN_THEORY = 3500;

function extractCodeBlocks(md) {
  const blocks = [];
  const re = /```javascript\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    // Xatolar bo'limidagi bloklar (oldinda ❌) qasddan yaroqsiz — tekshirmaymiz
    const ctx = md.slice(Math.max(0, m.index - 250), m.index);
    const intentionalError = ctx.includes(String.fromCharCode(10060)) || ctx.includes('Xatoni topish') || ctx.includes('SyntaxError');
    if (!intentionalError) blocks.push(m[1]);
  }
  return blocks;
}

function checkBlockSyntax(code) {
  // Acorn bilan sintaksis tekshiruvi — xavfsiz va tez (ijro emas).
  try {
    acorn.parse(code, { ecmaVersion: "latest", sourceType: "module" });
    return null;
  } catch (e) {
    return e.message;
  }
}

async function auditLesson(lesson) {
  const fails = [];
  const body = lesson.theory ?? lesson.content ?? "";
  const lower = body.toLowerCase();
  const hits = TEMPLATE_MARKERS.filter((t) => lower.includes(t.toLowerCase())).length;
  if (hits < MIN_TEMPLATE) fails.push("shablon " + hits + "/" + TEMPLATE_MARKERS.length);
  const ex = Array.isArray(lesson.exercises) ? lesson.exercises : [];
  if (ex.length < MIN_EXERCISES) {
    fails.push("mashq " + ex.length + "/" + MIN_EXERCISES);
  } else {
    const bad = ex.filter((e) => {
      const inst = e.instruction ?? e.description ?? e.task;
      const hasTest = typeof e.test === "string" || typeof e.testCode === "string" ||
        typeof e.solution === "string" || typeof e.initialCode === "string";
      return !inst || !hasTest;
    });
    if (bad.length) fails.push(bad.length + " ta mashqda instruction/test yetishmaydi");
  }
  const qz = Array.isArray(lesson.quizzes) ? lesson.quizzes : [];
  if (qz.length < MIN_QUIZZES) {
    fails.push("savol " + qz.length + "/" + MIN_QUIZZES);
  } else {
    const noExp = qz.filter((q2) => !q2.explanation || !String(q2.explanation).trim()).length;
    if (noExp) fails.push(noExp + " ta savolda explanation yo'q");
  }
  if (body.length < MIN_THEORY) fails.push("nazariya " + body.length + "/" + MIN_THEORY);
  const blocks = extractCodeBlocks(body);
  const codeFails = [];
  for (const b of blocks) {
    const err = checkBlockSyntax(b);
    if (err) codeFails.push(err);
  }
  if (codeFails.length) fails.push(codeFails.length + " ta kod bloki xato: " + codeFails[0].slice(0, 60));
  return fails;
}

const onlySection = process.argv[2];
const sections = onlySection ? [onlySection] : SECTIONS;
let totalPass = 0, totalFail = 0;
for (const key of sections) {
  if (!curriculum[key]) { console.error("Bunday bo'lim yo'q: " + key); process.exit(2); }
  const pass = [], fail = [];
  for (const l of curriculum[key].lessons) {
    const lesson = await l.load();
    const fails = await auditLesson(lesson);
    if (fails.length) fail.push({ id: l.id, fails }); else pass.push(l.id);
  }
  totalPass += pass.length; totalFail += fail.length;
  const mark = fail.length === 0 ? "PASS" : "FAIL";
  console.log(mark + "  " + key.padEnd(14) + " " + pass.length + "/" + (pass.length + fail.length));
  for (const f of fail.slice(0, 8)) console.log("      - " + f.id + ": " + f.fails.join("; "));
  if (fail.length > 8) console.log("      ... va yana " + (fail.length - 8) + " ta");
}
console.log("---");
console.log("JAMI: " + totalPass + " PASS / " + (totalPass + totalFail) + " dars");
process.exit(totalFail > 0 ? 1 : 0);
