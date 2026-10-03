import { describe, it, expect } from 'vitest';
import { injectLoopGuard, LOOP_LIMIT, LOOP_GUARD_ERROR } from './loopGuard.js';

function runGuarded(code) {
  const guarded = injectLoopGuard(code);
  const combined = `
    "use strict";
    const __loop_guards = new Proxy({}, { get: (t, n) => t[n] || 0 });
    try {
      ${guarded}
      return "OK";
    } catch (e) {
      return "Runtime Error: " + e.message;
    }
  `;
  return { result: new Function(combined)(), guarded };
}

describe('loopGuard', () => {
  it('LOOP_LIMIT 10000 ga teng', () => {
    expect(LOOP_LIMIT).toBe(10000);
  });

  it('for sikliga guard qo\'yadi', () => {
    const guarded = injectLoopGuard('for (let i = 0; i < 5; i++) { console.log(i); }');
    expect(guarded).toContain('__loop_guards');
  });

  it('while sikliga guard qo\'yadi', () => {
    const guarded = injectLoopGuard('while(true) { break; }');
    expect(guarded).toContain('__loop_guards');
  });

  it('do...while sikliga guard qo\'yadi', () => {
    const guarded = injectLoopGuard('let i = 0; do { i++; } while (i < 3);');
    expect(guarded).toContain('__loop_guards');
  });

  it('for...of sikliga guard qo\'yadi', () => {
    const guarded = injectLoopGuard('for (const x of [1,2,3]) { console.log(x); }');
    expect(guarded).toContain('__loop_guards');
  });

  it('for...in sikliga guard qo\'yadi', () => {
    const guarded = injectLoopGuard('for (const k in {a:1}) { console.log(k); }');
    expect(guarded).toContain('__loop_guards');
  });

  it('siklsiz kodga guard qo\'ymaydi', () => {
    const code = 'const x = 5; console.log(x);';
    const guarded = injectLoopGuard(code);
    expect(guarded).not.toContain('__loop_guards');
  });

  it('oddiy sikl xatosiz ishlaydi', () => {
    const { result } = runGuarded('let s = 0; for (let i = 0; i < 10; i++) { s += i; }');
    expect(result).toBe('OK');
  });

  it('cheksiz while siklini to\'xtatadi', () => {
    const { result } = runGuarded('while(true) {}');
    expect(result).toBe(`Runtime Error: ${LOOP_GUARD_ERROR}`);
  });

  it('cheksiz for siklini to\'xtatadi', () => {
    const { result } = runGuarded('for (;;) {}');
    expect(result).toBe(`Runtime Error: ${LOOP_GUARD_ERROR}`);
  });

  it('ichma-ich sikllar har biri alohida guard oladi', () => {
    const guarded = injectLoopGuard('for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) {} }');
    // Kamida 2 ta alohida guard yozuvi bo'lishi kerak
    const matches = guarded.match(/__loop_guards/g) || [];
    expect(matches.length).toBeGreaterThanOrEqual(4);
  });

  it('blok-siz sikl tanasini blokga o\'raydi', () => {
    const guarded = injectLoopGuard('for (let i = 0; i < 3; i++) console.log(i);');
    expect(guarded).toContain('__loop_guards');
    const { result } = runGuarded('let s = 0; for (let i = 0; i < 3; i++) s++;');
    expect(result).toBe('OK');
  });

  it('sintaksis xatoli kodda asl kodni qaytaradi (crash bo\'lmaydi)', () => {
    const bad = 'for (let i = 0; i < ; i++) {{{';
    expect(() => injectLoopGuard(bad)).not.toThrow();
    expect(injectLoopGuard(bad)).toBe(bad);
  });
});
