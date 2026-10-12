/**
 * Monaco AMD loader (vs/loader.js) global `window.define` va `define.amd` ni o'rnatadi.
 * Bu boshqa UMD kutubxonalar bilan to'qnashuv keltirib chiqarishi va
 * "Can only have one anonymous define call per script file" xatosiga sabab bo'lishi mumkin.
 *
 * Ushbu himoya funksiyasi:
 * 1. define.amd ni yashiradi (UMD kutubxonalar AMD muhit deb o'ylab xato chaqirmasligi uchun).
 * 2. Anonim define chaqiruvlarini Monaco loaderiga o'tkazmay, xavfsiz boshqaradi.
 * 3. Monaco'ning o'zining 'vs/...' nomli modullari normal ishlashini ta'minlaydi.
 *
 * Lokal bundle rejimida loader.js yuklanmaydi, shuning uchun bu himoya
 * zaxira chora sifatida saqlanadi (CDN fallback yoki tashqi skriptlar uchun).
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
        // loader.js define.amd ni qayta o'rnatishiga yo'l qoymaslik
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

// Global define himoyasini ishga tushirish (brauzerda)
setupMonacoAmdProtection();
