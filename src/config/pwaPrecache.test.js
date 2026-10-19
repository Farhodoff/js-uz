import { describe, it, expect } from 'vitest';
import {
  PRECACHE_BUDGET_BYTES,
  evaluatePrecacheBudget,
  findPrecacheManifest,
  formatBytes,
  parsePrecacheManifest,
  summarizePrecache,
} from './pwaPrecache.js';

const sampleServiceWorker = `
const manifest = [
  { revision: "abc", url: "index.html" },
  { revision: null, url: "assets/app.js" },
  { revision: "def", url: "offline.html" },
];
precacheAndRoute(manifest);
`;

describe('parsePrecacheManifest', () => {
  it('service worker ichidan precache manifestni ajratib oladi', () => {
    expect(parsePrecacheManifest(sampleServiceWorker)).toEqual([
      { revision: 'abc', url: 'index.html' },
      { revision: null, url: 'assets/app.js' },
      { revision: 'def', url: 'offline.html' },
    ]);
  });

  it('eng katta manifest massivini tanlaydi', () => {
    const source = `
      const other = [{ revision: "x", url: "a.js" }];
      const manifest = [
        { revision: "1", url: "index.html" },
        { revision: "2", url: "app.js" },
      ];
    `;
    expect(parsePrecacheManifest(source)).toHaveLength(2);
  });

  it('string kalitli va spread elementli manifestlarni o\'qiydi', () => {
    const source = `
      const manifest = [
        { "revision": "1", "url": "quoted.js" },
        { ...extra, revision: "2", url: "spread.js" },
      ];
    `;
    expect(parsePrecacheManifest(source)).toEqual([
      { revision: '1', url: 'quoted.js' },
      { revision: '2', url: 'spread.js' },
    ]);
  });

  it('manifest bo\'lmasa bo\'sh massiv qaytaradi', () => {
    expect(parsePrecacheManifest('const x = [1, 2, 3];')).toEqual([]);
    expect(parsePrecacheManifest('')).toEqual([]);
  });

  it('noto\'g\'ri AST uchun ham bo\'sh massiv qaytaradi', () => {
    expect(findPrecacheManifest({ type: 'Program', body: [] })).toEqual([]);
  });
});

describe('summarizePrecache', () => {
  const entries = [
    { url: 'index.html', revision: '1' },
    { url: 'app.js', revision: '2' },
    { url: 'missing.js', revision: '3' },
  ];

  it('mavjud fayllar hajmini yig\'adi va yo\'qlarini qayd etadi', () => {
    const sizes = { 'index.html': 100, 'app.js': 200 };
    expect(summarizePrecache(entries, (url) => sizes[url])).toEqual({
      count: 3,
      totalBytes: 300,
      missing: ['missing.js'],
    });
  });

  it('size resolver berilmasa barcha fayllar missing bo\'ladi', () => {
    expect(summarizePrecache(entries)).toEqual({
      count: 3,
      totalBytes: 0,
      missing: ['index.html', 'app.js', 'missing.js'],
    });
  });

  it('noto\'g\'ri size qiymatlarini hisobga olmaydi', () => {
    const result = summarizePrecache(entries, (url) => (url === 'index.html' ? NaN : 50));
    expect(result.totalBytes).toBe(100);
    expect(result.missing).toEqual(['index.html']);
  });
});

describe('evaluatePrecacheBudget', () => {
  it('budjet ichidagi hajmni ok deb baholaydi', () => {
    expect(evaluatePrecacheBudget(1000, 2000)).toEqual({
      ok: true,
      totalBytes: 1000,
      budget: 2000,
      percent: 50,
    });
  });

  it('budjetdan oshgan hajmni ok false qiladi', () => {
    expect(evaluatePrecacheBudget(2500, 2000)).toMatchObject({ ok: false, percent: 125 });
  });

  it('noto\'g\'ri budjet uchun standart qiymatni ishlatadi', () => {
    expect(evaluatePrecacheBudget(100, 0).budget).toBe(PRECACHE_BUDGET_BYTES);
    expect(evaluatePrecacheBudget(100, -5).budget).toBe(PRECACHE_BUDGET_BYTES);
  });
});

describe('formatBytes', () => {
  it('bayt, KiB va MiB formatlarini chiqaradi', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(500)).toBe('500 B');
    expect(formatBytes(2048)).toBe('2.0 KiB');
    expect(formatBytes(2 * 1024 * 1024)).toBe('2.00 MiB');
  });

  it('noto\'g\'ri qiymatlar uchun 0 B qaytaradi', () => {
    expect(formatBytes(NaN)).toBe('0 B');
    expect(formatBytes(-10)).toBe('0 B');
  });
});
