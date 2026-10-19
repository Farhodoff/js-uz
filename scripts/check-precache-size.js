import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  evaluatePrecacheBudget,
  formatBytes,
  parsePrecacheManifest,
  summarizePrecache,
} from '../src/config/pwaPrecache.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const swPath = path.join(distDir, 'sw.js');

if (!fs.existsSync(swPath)) {
  console.error(`Service worker topilmadi: ${swPath}. Avval "npm run build" ni ishga tushiring.`);
  process.exit(1);
}

const source = fs.readFileSync(swPath, 'utf8');
const entries = parsePrecacheManifest(source);

if (entries.length === 0) {
  console.error('Precache manifest topilmadi yoki bo\'sh.');
  process.exit(1);
}

const uniqueEntries = Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());

const report = summarizePrecache(uniqueEntries, (url) => {
  const relativePath = decodeURIComponent(url.split('?')[0]).replace(/^\/+/, '');
  const filePath = path.join(distDir, relativePath);
  if (!fs.existsSync(filePath)) return undefined;
  return fs.statSync(filePath).size;
});

const budget = evaluatePrecacheBudget(report.totalBytes);

console.log(`Precache: ${report.count} ta fayl, ${formatBytes(report.totalBytes)}`);
console.log(`Budjet:   ${formatBytes(budget.budget)} (${budget.percent}% ishlatilgan)`);

if (report.missing.length > 0) {
  console.error(`Manifestda mavjud bo'lmagan fayllar: ${report.missing.join(', ')}`);
  process.exit(1);
}

if (!budget.ok) {
  console.error(
    `Precache hajmi budjetdan oshdi: ${formatBytes(report.totalBytes)} > ${formatBytes(budget.budget)}`
  );
  process.exit(1);
}

console.log('Precache hajmi budjet ichida.');
