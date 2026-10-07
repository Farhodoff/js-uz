import { transform } from 'sucrase';
import alasql from 'alasql';
import { injectLoopGuard } from '../utils/loopGuard';

function preprocessCodeForTests(codeStr) {
  return codeStr
    .replace(/const\s+/g, 'var ')
    .replace(/let\s+/g, 'var ');
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
        const result = alasql(code);

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

    let codeToRun = code;
    if (language === 'typescript') {
      const transpiled = transform(code, { transforms: ['typescript'] });
      codeToRun = transpiled.code;
    }

    const combinedCode = `
      "use strict";
      const __loop_guards = new Proxy({}, {
        get: (target, name) => target[name] || 0
      });
      try {
        ${injectLoopGuard(codeToRun)}
        
        return (function(code, logs) {
          ${testCode || 'return null;'}
        })(arguments[0], arguments[1]);
      } catch (e) {
        return "Runtime Error: " + e.message;
      }
    `;

    const runner = new Function('code', 'logs', combinedCode);
    const preprocessedCode = preprocessCodeForTests(codeToRun);
    
    // Evaluate synchronous logic
    const errorMsg = runner(preprocessedCode, logs);

    const handleResult = (err) => {
      let validationResult = '✅ Kod muvaffaqiyatli ishladi';
      let isCorrect = true;

      if (err) {
        validationResult = '❌ ' + err;
        isCorrect = false;
      }

      const outputText = logs.length
        ? logs.join('\\n') + '\\n\\n' + validationResult
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
