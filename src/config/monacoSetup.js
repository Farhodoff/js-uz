import { loader } from '@monaco-editor/react';

// Ishchi tasdiqlangan versiya (loader 1.7.0 standart CDN versiyasi).
// Yangilashdan oldin PracticeTab + Playground'da tekshiring.
export const MONACO_VERSION = '0.55.1';

/**
 * Monaco AMD loader (vs/loader.js) global `window.define` va `define.amd` ni o'rnatadi.
 * Bu boshqa UMD kutubxonalar (Mermaid diagrammalari, Cytoscape, Dayjs, Sucrase, Alasql) bilan to'qnashuv
 * keltirib chiqaradi va "Can only have one anonymous define call per script file" xatosiga sabab bo'ladi.
 * 
 * Ushbu himoya funksiyasi:
 * 1. define.amd ni yashiradi (UMD kutubxonalar AMD muhit deb o'ylab xato chaqirmasligi uchun).
 * 2. Anonim define chaqiruvlarini Monaco loaderiga o'tkazmay, xavfsiz boshqaradi.
 * 3. Monaco'ning o'zining 'vs/...' nomli modullari normal ishlashini ta'minlaydi.
 */
export function setupMonacoAmdProtection(globalTarget = typeof window !== 'undefined' ? window : null) {
  if (!globalTarget) return;

  const wrapDefine = (rawDefine) => {
    if (typeof rawDefine !== 'function') return rawDefine;
    if (rawDefine.__isMonacoProtected) return rawDefine;

    const safeDefine = function (id, deps, factory) {
      // Monaco barcha o'z modullarini har doim string ID bilan chaqiradi (masalan, 'vs/editor/editor.main')
      if (typeof id === 'string') {
        return rawDefine(id, deps, factory);
      }

      // Tashqi UMD kutubxonalardan kelgan anonim define chaqiruvlari:
      // Monaco loaderiga o'tkazilmaydi, aks holda "Can only have one anonymous define call" xatosi yuz beradi.
      const actualFactory =
        typeof id === 'function' ? id : typeof deps === 'function' ? deps : factory;
      if (typeof actualFactory === 'function') {
        try {
          return actualFactory();
        } catch {
          // xatoni e'tiborsiz qoldirish
        }
      }
    };

    safeDefine.__isMonacoProtected = true;

    // UMD skriptlar `if (typeof define === "function" && define.amd)` tekshiradi.
    // .amd ni undefined qilib yashirsak, UMD skriptlar define() ni chaqirmaydi va
    // o'zining ESM/CJS/global eksporti orqali to'g'ri ishlaydi.
    Object.defineProperty(safeDefine, 'amd', {
      configurable: true,
      enumerable: false,
      get() {
        return undefined;
      },
      set() {
        // loader.js define.amd ni qayta o'rnatishiga yo'l qo'ymaslik
      },
    });

    return safeDefine;
  };

  let monacoDefine = wrapDefine(globalTarget.define);

  try {
    Object.defineProperty(globalTarget, 'define', {
      configurable: true,
      enumerable: true,
      get() {
        return monacoDefine;
      },
      set(newDefine) {
        monacoDefine = wrapDefine(newDefine);
      },
    });
  } catch {
    if (globalTarget.define) {
      globalTarget.define = wrapDefine(globalTarget.define);
    }
  }
}

// Global define himoyasini ishga tushirish
setupMonacoAmdProtection();

loader.config({
  paths: {
    vs: `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min/vs`,
  },
});

// Monaco yuklangach, window.monaco mavjudligini kafolatlash
if (typeof window !== 'undefined') {
  loader.init().then((monaco) => {
    if (monaco && !window.monaco) {
      window.monaco = monaco;
    }
  }).catch(() => {
    // Editor komponenti yuklanish xatolarini o'zi ushlaydi
  });
}
