import { transform } from 'sucrase';
import alasql from 'alasql';
import { injectLoopGuard } from '../utils/loopGuard';

// Worker modul muhiti: `require`/`import` uchun eng ko'p ishlatiladigan
// modullarning yengil nusxalari. Asosiysi — darslar ishga tushsin,
// testlar esa kod matnini tekshira olsin.
function createMockModules() {
  const noop = () => {};
  const react = {
    useState: (initial) => [
      typeof initial === 'function' ? initial() : initial,
      noop,
    ],
    useEffect: noop,
    useLayoutEffect: noop,
    useRef: (initial) => ({ current: initial }),
    useCallback: (fn) => fn,
    useMemo: (fn) => (typeof fn === 'function' ? fn() : fn),
    useReducer: (reducer, initial) => [initial, noop],
    useContext: () => ({}),
    createContext: () => ({ Provider: noop, Consumer: noop }),
    createElement: () => null,
    cloneElement: (el) => el,
    Fragment: 'Fragment',
    StrictMode: 'StrictMode',
    Component: class Component {},
    PureComponent: class PureComponent {},
  };
  react.default = react;

  const expressApp = () => {
    const app = () => app;
    app.get = app.post = app.put = app.delete = app.use = app.listen = app;
    app.listen = (port, cb) => { if (typeof cb === 'function') cb(); return app; };
    return app;
  };
  const express = () => expressApp();
  express.json = () => noop;
  express.urlencoded = () => noop;
  express.static = () => noop;
  express.Router = () => expressApp();
  express.default = express;

  const fs = {
    readFileSync: () => '',
    writeFileSync: noop,
    existsSync: () => false,
    mkdirSync: noop,
    readdirSync: () => [],
    unlinkSync: noop,
  };

  const http = {
    createServer: () => ({
      listen: (port, cb) => { if (typeof cb === 'function') cb(); return { close: noop }; },
      on: noop,
    }),
  };

  const path = {
    join: (...parts) => parts.filter(Boolean).join('/'),
    dirname: (p) => String(p).split('/').slice(0, -1).join('/') || '.',
    extname: (p) => (String(p).match(/\.[^.]+$/) || [''])[0],
  };

  const modules = {
    react,
    'react-dom': { render: noop, unmountComponentAtNode: noop, default: react },
    'react-dom/client': { createRoot: () => ({ render: noop }), default: {} },
    fs,
    http,
    https: { createServer: () => ({ listen: noop }) },
    path,
    os: { platform: () => 'browser', homedir: () => '/' },
    express,
    axios: { get: async () => ({ data: null }), post: async () => ({ data: null }) },
    lodash: { default: {} },
  };

  return (name) => {
    const clean = String(name).replace(/^node:/, '');
    if (modules[clean]) return modules[clean];
    throw new Error(`Modul topilmadi (worker muhiti): ${name}`);
  };
}

self.onmessage = async (e) => {
  const { type, code, language, testCode } = e.data;
  
  if (type !== 'RUN_CODE') return;

  let logs = [];
  const origLog = console.log;
  const origError = console.error;

  console.log = (...args) => {
    logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
  };
  console.error = (...args) => {
    logs.push('[Error] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
  };

  try {
    if (language === 'sql') {
      try {
        // Har bir ishga tushirishda toza baza: avval setup, keyin o'quvchi so'rovi
        const setup = e.data.dbSetup;
        if (setup) {
          const setupStmts = String(setup).split(';').map(s => s.trim()).filter(Boolean);
          for (const stmt of setupStmts) alasql(stmt);
        }
        // O'quvchi kodi ham bir nechta operator bo'lishi mumkin — ketma-ket
        // bajarib, test va ko'rsatish uchun OXIRGI natija olinadi.
        // (String ichida nuqta-vergul bo'lmasligi kerak.)
        const codeStmts = String(code).split(';').map(s => s.trim()).filter(Boolean);
        let result = null;
        for (const stmt of codeStmts) result = alasql(stmt);

        // Mashq testi code (so'rov matni) va result (qatorlar) bilan ishlaydi:
        // null/undefined = o'tdi, string = xato xabari
        let testError = null;
        if (testCode && testCode !== 'return null;') {
          try {
            const check = new Function('code', 'result', testCode);
            testError = check(code, Array.isArray(result) ? result : []);
          } catch (err) {
            testError = 'Test xatosi: ' + err.message;
          }
        }
        
        let outputText = '';
        if (Array.isArray(result) && result.length > 0) {
          outputText += JSON.stringify(result, null, 2);
        } else if (result) {
          outputText += JSON.stringify(result);
        } else {
          outputText += "✅ So'rov muvaffaqiyatli bajarildi (natija bo'sh)";
        }

        if (testError) {
          self.postMessage({ type: 'ERROR', error: outputText + '\n\n❌ ' + testError, isCorrect: false });
        } else {
          self.postMessage({ type: 'SUCCESS', output: outputText + "\n\n✅ So'rov to'g'ri bajarildi", isCorrect: true });
        }
      } catch (err) {
        self.postMessage({ type: 'ERROR', error: '❌ SQL Xatosi: ' + err.message });
      }
      return;
    }

    // ESM/JSX/TS kodini ishga tushirish uchun qayta yozish:
    // - jsx      → React.createElement (React amaliyotlari)
    // - imports  → require(...) (ESM import → modul chaqiruvi)
    // - typescript → interface/type annotations olib tashlanadi
    // Sucrase faqat mos keladigan sintaksisni o'zgartiradi, qolganini tegmaydi.
    let codeToRun = code;
    try {
      const transforms = ['jsx', 'imports'];
      if (language === 'typescript') transforms.push('typescript');
      codeToRun = transform(code, { transforms }).code;
    } catch {
      codeToRun = code; // Sintaksis xatosi testga to'g'ridan-to'g'ri uzatiladi
    }

    // Workerda modul muhiti yo'q — eng ko'p ishlatiladigan modullarni
    // mock qilamiz. `import React from 'react'` va `require('fs')`
    // shu bilan ishga tushadi (React amaliyotlari va Node darslari uchun).
    const __mockModules = createMockModules();

    const combinedCode = `
      "use strict";
      const __loop_guards = new Proxy({}, {
        get: (target, name) => target[name] || 0
      });
      try {
        ${injectLoopGuard(codeToRun)}
        
        return (function(code, rawCode, logs) {
          ${testCode || 'return null;'}
        })(arguments[0], arguments[1], arguments[2]);
      } catch (e) {
        return "Runtime Error: " + e.message;
      }
    `;

    // code      — ishga tushirish uchun: TS'da transpile qilingan, JS'da xom
    // rawCode   — foydalanuvchi yozgan asl xom kod (TS'da interface/type saqlanadi,
    //             shuning uchun `rawCode.includes('interface Car')` testlari to'g'ri ishlaydi)
    // Eski preprocessCodeForTests (const→var) olib tashlandi: u `code` ni
    // buzgani uchun `code.includes('const ...')` testlari doimo yiqilardi.
    const moduleMock = { exports: {} };

    // Kod ishga tushirilganda combinedCode sintaksis buzilishi mumkin
    // (masalan, tsconfig JSON yozuvchi mashq). Bunday holatda test
    // kodisiz ishga tushiriladi — testlar ko'pincha faqat `code` matnini
    // tekshiradi va bu yo'lda ham to'g'ri javob topiladi.
    const runnerParams = ['code', 'rawCode', 'logs', 'require', 'module', 'exports'];
    let runner;
    try {
      runner = new Function(...runnerParams, combinedCode);
    } catch {
      const testOnly = `
        return (function(code, rawCode, logs, require, module, exports) {
          ${testCode || 'return null;'}
        })(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
      `;
      runner = new Function(...runnerParams, testOnly);
    }

    // `code` parametri (test uchun):
    // - TypeScript'da transpiled — `new Function(code + ...)` testlari ishga tushsin
    // - JS/React'da xom — `code.includes('<h1')` kabi matn testlari JSX/ESM
    //   transformidan keyin buzilmasin
    const testInput = language === 'typescript' ? codeToRun : code;
    const errorMsg = runner(testInput, code, logs, __mockModules, moduleMock, moduleMock.exports);

    const handleResult = (err) => {
      let validationResult = '✅ Kod muvaffaqiyatli ishladi';
      let isCorrect = true;

      // Test boolean qaytargan bo'lsa (misol: `return code.includes('x')`):
      // true = talab bajarildi, false = bajarilmadi.
      // Eskida `true` xato xabari sifatida ko'rsatilgandi — to'g'ri javob
      // "❌ false" berardi, bo'sh kod esa avtomatik o'tardi.
      let failure = err;
      if (typeof failure === 'boolean') {
        failure = failure ? null : 'Kod talablarga javob bermadi.';
      }

      if (failure) {
        validationResult = '❌ ' + failure;
        isCorrect = false;
      }

      const outputText = logs.length
        ? logs.join('\n') + '\n\n' + validationResult
        : validationResult;

      if (isCorrect) {
        self.postMessage({ type: 'SUCCESS', output: outputText, isCorrect: true });
      } else {
        self.postMessage({ type: 'ERROR', error: outputText, isCorrect: false });
      }
    };

    if (errorMsg && typeof errorMsg.then === 'function') {
      errorMsg.then(
        (resolvedMsg) => handleResult(resolvedMsg),
        (err) => handleResult(err ? (err.message || err) : 'Xatolik yuz berdi')
      );
    } else {
      handleResult(errorMsg);
    }
  } catch (err) {
    self.postMessage({ type: 'ERROR', error: '❌ Sintaksis xatosi: ' + err.message, isCorrect: false });
  } finally {
    console.log = origLog;
    console.error = origError;
  }
};
