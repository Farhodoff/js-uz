import { useState, useCallback, useRef } from 'react';

export function injectLoopGuard(code) {
  let loopId = 0;
  return code
    .replace(/(for|while)\s*\(([^)]*)\)\s*\{/g, (match, type, cond) => {
      loopId++;
      return `${type}(${cond}){ if(++__loop_guards[${loopId}] > 2000) throw new Error("Cheksiz sikl aniqlandi!"); `;
    })
    .replace(/do\s*\{/g, () => {
      loopId++;
      return `do { if(++__loop_guards[loopId] > 2000) throw new Error("Cheksiz sikl aniqlandi!"); `;
    });
}

export function useCodeRunner() {
  const [output, setOutput] = useState('');
  const origConsole = useRef({ log: console.log, error: console.error });

  const runCode = useCallback((code, activeLesson, currentExerciseIndex, onSuccess) => {
    const logs = [];
    const origLog = origConsole.current.log;
    const origError = origConsole.current.error;

    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    console.error = (...args) => {
      logs.push('❌ ' + args.map(a => String(a)).join(' '));
    };

    try {
      const currentExercise = activeLesson?.exercises?.[currentExerciseIndex];
      const testCode = currentExercise?.test || 'return null;';

      const combinedCode = `
        "use strict";
        const __loop_guards = new Proxy({}, {
          get: (target, name) => target[name] || 0
        });
        try {
          // Foydalanuvchi kodi (loop guard bilan)
          ${injectLoopGuard(code)}
          
          // Testni ishga tushirish (IIFE ichida)
          return (function(code, logs) {
            ${testCode}
          })(arguments[0], arguments[1]);
        } catch (e) {
          return "Runtime Error: " + e.message;
        }
      `;

      const runner = new Function('code', 'logs', combinedCode);
      const errorMsg = runner(code, logs);

      let validationResult = '✅ Kod muvaffaqiyatli ishladi';
      let isCorrect = true;

      if (errorMsg) {
        validationResult = '❌ ' + errorMsg;
        isCorrect = false;
      }

      const outputText = logs.length
        ? logs.join('\n') + '\n\n' + validationResult
        : validationResult;

      setOutput(outputText);

      if (isCorrect && onSuccess) {
        onSuccess();
      }
    } catch (e) {
      setOutput('❌ Sintaksis xatosi: ' + e.message);
    } finally {
      console.log = origLog;
      console.error = origError;
    }
  }, []);

  const resetOutput = useCallback(() => setOutput(''), []);

  return { output, runCode, resetOutput };
}
