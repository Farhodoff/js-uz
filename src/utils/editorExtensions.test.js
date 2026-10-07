import { describe, it, expect } from 'vitest';
import { validateUzbekJavaScript } from './editorExtensions.js';

describe('validateUzbekJavaScript', () => {
  it("bo'sh kod uchun diagnostika yo'q", () => {
    expect(validateUzbekJavaScript('')).toEqual([]);
    expect(validateUzbekJavaScript('   ')).toEqual([]);
  });

  it('toza kod uchun diagnostika yo\'q', () => {
    expect(validateUzbekJavaScript('let a = 1; console.log(a);')).toEqual([]);
  });

  it('const ni qayta o\'zlashtirish error beradi', () => {
    const res = validateUzbekJavaScript('const x = 1; x = 2;');
    expect(res.some((d) => d.severity === 'error' && d.message.includes('const'))).toBe(true);
  });

  it('const ga ++ error beradi', () => {
    const res = validateUzbekJavaScript('const x = 1; x++;');
    expect(res.some((d) => d.severity === 'error')).toBe(true);
  });

  it('if sharti ichidagi = warning beradi', () => {
    const res = validateUzbekJavaScript('let a = 1; let b = 2; if (a = b) {}');
    expect(res.some((d) => d.severity === 'warning' && d.message.includes('if/while'))).toBe(true);
  });

  it('NaN taqqoslash warning beradi', () => {
    const res = validateUzbekJavaScript('let x = 1; if (x === NaN) {}');
    expect(res.some((d) => d.severity === 'warning' && d.message.includes('NaN'))).toBe(true);
  });

  it('e\'lon qilinmagan o\'zgaruvchi warning beradi', () => {
    const res = validateUzbekJavaScript('console.log(qwerty123);');
    expect(res.some((d) => d.severity === 'warning' && d.message.includes('qwerty123'))).toBe(true);
  });

  it('sintaktik xato error beradi', () => {
    const res = validateUzbekJavaScript('const x = ;');
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].severity).toBe('error');
  });

  it('diagnostikada Monaco pozitsiyalari bor', () => {
    const res = validateUzbekJavaScript('const x = 1; x = 2;');
    expect(res[0].startLineNumber).toBe(1);
    expect(res[0].startColumn).toBeGreaterThanOrEqual(1);
  });
});
