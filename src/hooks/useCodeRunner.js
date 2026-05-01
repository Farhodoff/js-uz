import { useState, useCallback, useRef } from 'react';

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
      const result = new Function(code)();

      let validationResult = '✅ Kod muvaffaqiyatli ishladi';
      let isCorrect = true;

      const currentExercise = activeLesson?.exercises?.[currentExerciseIndex];
      if (currentExercise?.test) {
        try {
          const testFn = new Function('code', 'logs', 'result', currentExercise.test);
          const errorMsg = testFn(code, logs, result);
          if (errorMsg) {
            validationResult = '❌ ' + errorMsg;
            isCorrect = false;
          }
        } catch (testError) {
          origError('Test error:', testError.message);
        }
      }

      const outputText = logs.length
        ? logs.join('\n') + '\n\n' + validationResult
        : validationResult;

      setOutput(outputText);

      if (isCorrect && onSuccess) {
        onSuccess();
      }
    } catch (e) {
      setOutput('❌ Xato: ' + e.message);
    } finally {
      console.log = origLog;
      console.error = origError;
    }
  }, []);

  const resetOutput = useCallback(() => setOutput(''), []);

  return { output, runCode, resetOutput };
}
