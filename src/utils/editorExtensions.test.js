import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  validateUzbekJavaScript,
  registerUzbekMonacoHover,
  registerUzbekMonacoCompletion,
  updateUzbekMonacoMarkers,
  registerUzbekMonacoDiagnostics,
  registerUzbekMonacoProviders,
} from './editorExtensions.js';

function createMonaco() {
  const providers = {};
  const monaco = {
    Range: class Range {
      constructor(startLineNumber, startColumn, endLineNumber, endColumn) {
        Object.assign(this, { startLineNumber, startColumn, endLineNumber, endColumn });
      }
    },
    languages: {
      CompletionItemKind: {
        Function: 3,
        Variable: 6,
        Property: 10,
        Keyword: 14,
        Constant: 21,
      },
      registerHoverProvider: vi.fn((language, provider) => {
        providers[`hover:${language}`] = provider;
        return { dispose: vi.fn() };
      }),
      registerCompletionItemProvider: vi.fn((language, provider) => {
        providers[`completion:${language}`] = provider;
        return { dispose: vi.fn() };
      }),
    },
    MarkerSeverity: { Error: 8, Warning: 4 },
    editor: { setModelMarkers: vi.fn() },
  };
  return { monaco, providers };
}

afterEach(() => {
  vi.useRealTimers();
});

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

describe('registerUzbekMonacoHover', () => {
  it("kalit so'z uchun o'zbekcha izoh qaytaradi", () => {
    const { monaco, providers } = createMonaco();
    registerUzbekMonacoHover(monaco);
    const model = {
      getWordAtPosition: vi.fn(() => ({ word: 'const', startColumn: 1, endColumn: 6 })),
      getLineContent: vi.fn(() => 'const x = 1;'),
    };

    const result = providers['hover:javascript'].provideHover(model, { lineNumber: 1, column: 1 });

    expect(result.contents[0].value).toContain('O\'zbekcha izoh');
    expect(result.contents[1].value).toContain('O\'zgarmas');
    expect(result.range).toBeInstanceOf(monaco.Range);
  });

  it("metod uchun obyektga xos izoh qaytaradi", () => {
    const { monaco, providers } = createMonaco();
    registerUzbekMonacoHover(monaco);
    const model = {
      getWordAtPosition: vi.fn(() => ({ word: 'log', startColumn: 9, endColumn: 12 })),
      getLineContent: vi.fn(() => 'console.log(a);'),
    };

    const result = providers['hover:typescript'].provideHover(model, { lineNumber: 1, column: 9 });

    expect(result.contents[1].value).toContain('Konsolga');
  });

  it("so'z yoki lug'at yozuvi topilmasa null qaytaradi", () => {
    const { monaco, providers } = createMonaco();
    registerUzbekMonacoHover(monaco);
    const provider = providers['hover:javascript'];

    expect(provider.provideHover({ getWordAtPosition: () => null }, { lineNumber: 1, column: 1 })).toBeNull();
    expect(
      provider.provideHover(
        {
          getWordAtPosition: () => ({ word: 'nomalum', startColumn: 1, endColumn: 9 }),
          getLineContent: () => 'nomalum',
        },
        { lineNumber: 1, column: 1 }
      )
    ).toBeNull();
  });

  it("disposer ikkala til providerini ham tozalaydi", () => {
    const { monaco } = createMonaco();
    const dispose = registerUzbekMonacoHover(monaco);

    dispose();

    expect(monaco.languages.registerHoverProvider).toHaveBeenCalledWith('javascript', expect.any(Object));
    expect(monaco.languages.registerHoverProvider).toHaveBeenCalledWith('typescript', expect.any(Object));
  });
});

describe('registerUzbekMonacoCompletion', () => {
  it("global va keyword takliflarini qaytaradi", () => {
    const { monaco, providers } = createMonaco();
    registerUzbekMonacoCompletion(monaco);
    const model = {
      getWordAtPosition: vi.fn(() => null),
      getLineContent: vi.fn(() => 'con'),
    };

    const result = providers['completion:javascript'].provideCompletionItems(model, { lineNumber: 1, column: 4 });

    expect(result.suggestions.some((item) => item.label === 'const')).toBe(true);
    expect(result.suggestions.some((item) => item.label === 'console')).toBe(true);
    expect(providers['completion:javascript'].triggerCharacters).toEqual(['.']);
  });

  it("ma'lum obyekt metodlarini taklif qiladi", () => {
    const { monaco, providers } = createMonaco();
    registerUzbekMonacoCompletion(monaco);
    const model = {
      getWordAtPosition: vi.fn(() => ({ word: '', startColumn: 9, endColumn: 9 })),
      getLineContent: vi.fn(() => 'console.'),
    };

    const result = providers['completion:typescript'].provideCompletionItems(model, { lineNumber: 1, column: 9 });

    expect(result.suggestions.some((item) => item.label === 'log')).toBe(true);
    expect(result.suggestions[0].range.startColumn).toBe(9);
  });

  it("noma'lum obyekt uchun umumiy metodlarni taklif qiladi", () => {
    const { monaco, providers } = createMonaco();
    registerUzbekMonacoCompletion(monaco);
    const model = {
      getWordAtPosition: vi.fn(() => ({ word: '', startColumn: 5, endColumn: 5 })),
      getLineContent: vi.fn(() => 'arr.'),
    };

    const result = providers['completion:javascript'].provideCompletionItems(model, { lineNumber: 1, column: 5 });

    expect(result.suggestions.some((item) => item.label === 'push')).toBe(true);
  });

  it("disposer ikkala til providerini ham tozalaydi", () => {
    const { monaco } = createMonaco();
    const dispose = registerUzbekMonacoCompletion(monaco);

    dispose();

    expect(monaco.languages.registerCompletionItemProvider).toHaveBeenCalledWith('javascript', expect.any(Object));
    expect(monaco.languages.registerCompletionItemProvider).toHaveBeenCalledWith('typescript', expect.any(Object));
  });
});

describe('updateUzbekMonacoMarkers', () => {
  it('JS model uchun error va warning markerlarini yozadi', () => {
    const { monaco } = createMonaco();
    const model = {
      isDisposed: () => false,
      getLanguageId: () => 'javascript',
      getValue: () => 'const x = 1; x = 2;',
    };

    updateUzbekMonacoMarkers(monaco, model);

    expect(monaco.editor.setModelMarkers).toHaveBeenCalledWith(
      model,
      'uzbek-lint',
      expect.arrayContaining([expect.objectContaining({ severity: 8, source: 'uzbek-lint' })])
    );
  });

  it("model yo'q, dispose qilingan yoki boshqa til bo'lsa hech narsa qilmaydi", () => {
    const { monaco } = createMonaco();

    updateUzbekMonacoMarkers(monaco, null);
    updateUzbekMonacoMarkers(monaco, { isDisposed: () => true });
    updateUzbekMonacoMarkers(monaco, {
      isDisposed: () => false,
      getLanguageId: () => 'python',
    });

    expect(monaco.editor.setModelMarkers).not.toHaveBeenCalled();
  });
});

describe('registerUzbekMonacoDiagnostics', () => {
  it('boshlang\'ich tekshiruvni bajaradi va debounce bilan yangilaydi', () => {
    vi.useFakeTimers();
    const { monaco } = createMonaco();
    let changeHandler;
    const model = {
      isDisposed: () => false,
      getLanguageId: () => 'javascript',
      getValue: () => 'const x = 1; x = 2;',
    };
    const editor = {
      getModel: vi.fn(() => model),
      onDidChangeModelContent: vi.fn((handler) => {
        changeHandler = handler;
        return { dispose: vi.fn() };
      }),
    };

    const dispose = registerUzbekMonacoDiagnostics(monaco, editor, 100);
    expect(monaco.editor.setModelMarkers).toHaveBeenCalledTimes(1);

    changeHandler();
    vi.advanceTimersByTime(100);
    expect(monaco.editor.setModelMarkers).toHaveBeenCalledTimes(2);

    dispose();
    expect(editor.onDidChangeModelContent).toHaveBeenCalledTimes(1);
  });

  it("dispose qilinganda markerni tozalaydi", () => {
    const { monaco } = createMonaco();
    const model = {
      isDisposed: () => false,
      getLanguageId: () => 'javascript',
      getValue: () => 'let a = 1;',
    };
    const editor = {
      getModel: vi.fn(() => model),
      onDidChangeModelContent: vi.fn(() => ({ dispose: vi.fn() })),
    };

    const dispose = registerUzbekMonacoDiagnostics(monaco, editor);
    dispose();

    expect(monaco.editor.setModelMarkers).toHaveBeenLastCalledWith(model, 'uzbek-lint', []);
  });
});

describe('registerUzbekMonacoProviders', () => {
  it('editor bilan barcha providerlarni ro\'yxatdan o\'tkazadi va tozalaydi', () => {
    const { monaco } = createMonaco();
    const editor = {
      getModel: vi.fn(() => null),
      onDidChangeModelContent: vi.fn(() => ({ dispose: vi.fn() })),
    };

    const dispose = registerUzbekMonacoProviders(monaco, editor);

    expect(monaco.languages.registerHoverProvider).toHaveBeenCalledTimes(2);
    expect(monaco.languages.registerCompletionItemProvider).toHaveBeenCalledTimes(2);
    expect(() => dispose()).not.toThrow();
  });

  it('editor berilmasa diagnostika providerini qo\'shmaydi', () => {
    const { monaco } = createMonaco();

    const dispose = registerUzbekMonacoProviders(monaco);

    expect(monaco.languages.registerHoverProvider).toHaveBeenCalledTimes(2);
    expect(monaco.languages.registerCompletionItemProvider).toHaveBeenCalledTimes(2);
    expect(() => dispose()).not.toThrow();
  });
});
