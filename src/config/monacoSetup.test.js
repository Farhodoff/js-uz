import { describe, it, expect, vi } from 'vitest';
import { setupMonacoAmdProtection } from './monacoSetup.js';

describe('monacoSetup AMD protection', () => {
  it('should protect against "Can only have one anonymous define call per script file" errors', () => {
    const fakeGlobal = {};

    setupMonacoAmdProtection(fakeGlobal);

    // Simulate Monaco vs/loader.js assigning window.define
    let currentAnonymous = null;
    const rawMonacoDefine = vi.fn((id, deps, factory) => {
      if (typeof id !== 'string') {
        if (currentAnonymous !== null) {
          throw new Error('Can only have one anonymous define call per script file');
        }
        currentAnonymous = factory || deps || id;
      }
    });
    rawMonacoDefine.amd = { jQuery: true };

    fakeGlobal.define = rawMonacoDefine;

    // define.amd should be undefined to prevent UMD libraries from thinking an AMD loader is present
    expect(fakeGlobal.define.amd).toBeUndefined();

    // Named define (Monaco internal module) should be forwarded to raw Monaco loader
    const monacoModuleFactory = vi.fn();
    fakeGlobal.define('vs/editor/editor.main', ['exports'], monacoModuleFactory);
    expect(rawMonacoDefine).toHaveBeenCalledWith(
      'vs/editor/editor.main',
      ['exports'],
      monacoModuleFactory
    );

    // Multiple anonymous defines (e.g. from bundled UMD libraries like Mermaid or Cytoscape)
    // should NOT throw and should not call rawMonacoDefine's anonymous branch
    const factory1 = vi.fn(() => ({ mod: 1 }));
    const factory2 = vi.fn(() => ({ mod: 2 }));

    expect(() => {
      fakeGlobal.define([], factory1);
      fakeGlobal.define([], factory2);
      fakeGlobal.define(factory1);
    }).not.toThrow();

    expect(factory1).toHaveBeenCalled();
    expect(factory2).toHaveBeenCalled();
  });
});
