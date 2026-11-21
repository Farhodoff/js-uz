import { useState, useCallback, useRef, useEffect } from 'react';

// The actual code execution and AST parsing is now inside the Web Worker.
// We only need to manage the worker communication here.

export function useCodeRunner(activeLesson, currentExerciseIndex, onSuccess) {
  const [output, setOutput] = useState('');
  const workerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Eski run'ning timeout'ini bekor qilish — yangi natijani nobut qilmasin
  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Initialize worker if not already running
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('../../../workers/codeRunner.worker.js', import.meta.url), { type: 'module' });
    }
    return () => {
      // Cleanup worker on unmount
      clearTimeoutRef();
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [clearTimeoutRef]);

  const runCode = useCallback((code) => {
    // Oldingi timeout va worker tozalanadi — eskisi yangi natijani almashtirib yubormasin
    clearTimeoutRef();
    setOutput('Kompilyatsiya qilinmoqda...');

    // Recreate worker to ensure a clean state
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    workerRef.current = new Worker(new URL('../../../workers/codeRunner.worker.js', import.meta.url), { type: 'module' });

    workerRef.current.onmessage = (e) => {
      clearTimeoutRef();
      const { type, output: workerOutput, error, isCorrect } = e.data;

      if (type === 'SUCCESS') {
        setOutput(workerOutput);
        if (isCorrect && onSuccess) onSuccess();
      } else if (type === 'ERROR') {
        setOutput(error);
      }
    };

    workerRef.current.onerror = (e) => {
      clearTimeoutRef();
      setOutput(`❌ Worker xatosi: ${e.message}`);
    };

    // Kill worker if it takes more than 5 seconds (prevents infinite loop freezing the worker forever)
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
        setOutput('❌ Kod ishlashi juda uzoq vaqt oldi (Timeout - ehtimol cheksiz sikl).');
      }
    }, 5000);

    const currentExercise = activeLesson?.exercises?.[currentExerciseIndex];
    const testCode = currentExercise?.test || 'return null;';

    workerRef.current.postMessage({
      type: 'RUN_CODE',
      code: code,
      language: currentExercise?.language || activeLesson?.language || 'javascript',
      testCode: testCode,
      dbSetup: currentExercise?.dbSetup || activeLesson?.dbSetup || null
    });
  }, [activeLesson, currentExerciseIndex, onSuccess, clearTimeoutRef]);

  const resetOutput = useCallback(() => {
    clearTimeoutRef();
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = new Worker(new URL('../../../workers/codeRunner.worker.js', import.meta.url), { type: 'module' });
    }
    setOutput('');
  }, [clearTimeoutRef]);

  return { output, runCode, resetOutput };
}
