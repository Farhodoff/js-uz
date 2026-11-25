import { describe, it, expect } from 'vitest';
import { computeModuleProgress, isModuleMastered } from './progressStats';

describe('Module Progress Stats', () => {
  it('computes rounded percentage safely', () => {
    expect(computeModuleProgress(10, ['l1', 'l2'])).toBe(20);
    expect(computeModuleProgress(3, ['l1'])).toBe(33);
    expect(computeModuleProgress(0, [])).toBe(0);
  });

  it('determines 100% mastery', () => {
    expect(isModuleMastered(2, ['l1', 'l2'])).toBe(true);
    expect(isModuleMastered(2, ['l1'])).toBe(false);
  });
});
