// JS darslaridagi ```javascript kod bloklarini Node'da ishga tushirib,
// kutilmagan xatolarni topadi. Ataylab xato berishi aytilgan bloklar
// (❌ / "Xato kod") alohida ro'yxatga olinadi va ulardan xato KUTILADI.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { injectLoopGuard } from '../src/utils/loopGuard.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lessonsDir = path.join(root, 'src/data/lessons/js');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.js')) out.push(full);
  }
  return out;
}

// Markdown'dan ```javascript bloklarini ajratadi (```js ham qabul qilinadi)
function extractBlocks(md) {
  const blocks = [];
  const re = /```(?:javascript|js)\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    const before = md.slice(0, m.index);
    // Blokdan oldingi 200 belgi ichida ataylab xato e'loni bormi?
    const intent = before.slice(-200);
    const expectedError = /❌|Xato kod|xato kod|Nima bo'ladi/i.test(intent);
    blocks.push({ code: m[1], expectedError, line: before.split('\n').length });
  }
  return blocks;
}

function runCode(code) {
  const logs = [];
  const fakeConsole = {
    log: (...a) => logs.push(a.map(String).join(' ')),
    error: (...a) => logs.push(a.map(String).join(' ')),
    warn: (...a) => logs.push(a.map(String).join(' ')),
    info: (...a) => logs.push(a.map(String).join(' ')),
  };
  try {
    // Cheksiz sikldan himoya: loopGuard inject qilinadi
    const guarded = injectLoopGuard(code);
    // eslint-disable-next-line no-new-func
    const fn = new Function(
      'console',
      `"use strict";\nconst __loop_guards = new Proxy({}, { get: (t, n) => t[n] || 0 });\n${guarded}`
    );
    fn(fakeConsole);
    return { ok: true, logs };
  } catch (err) {
    return { ok: false, error: err.constructor.name + ': ' + err.message, logs };
  }
}

const files = walk(lessonsDir);
const problems = [];
let total = 0;
let expectedErrorBlocks = 0;

for (const file of files) {
  const rel = path.relative(root, file);
  const mod = await import(pathToFileURL(file).href);
  const lesson = mod[Object.keys(mod)[0]];
  const body = lesson?.theory ?? lesson?.content ?? '';
  if (typeof body !== 'string') continue;

  const blocks = extractBlocks(body);
  for (const b of blocks) {
    total++;
    if (b.expectedError) {
      expectedErrorBlocks++;
      // Ataylab xato beradigan blok: xato BERISHI shart
      const res = runCode(b.code);
      if (res.ok) {
        problems.push(`${rel}:${b.line} [KUTILGAN XATO YO'Q] blok xato bermadi`);
      }
      continue;
    }
    const res = runCode(b.code);
    if (!res.ok) {
      problems.push(`${rel}:${b.line} [XATO] ${res.error}`);
    }
  }
}

console.log(`Fayllar: ${files.length}, bloklar: ${total} (ataylab xato: ${expectedErrorBlocks})`);
console.log(`Muammo: ${problems.length}`);
for (const p of problems) console.log('  - ' + p);
