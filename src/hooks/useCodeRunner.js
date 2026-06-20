import { useState, useCallback, useRef, useEffect } from 'react';

// The actual code execution and AST parsing is now inside the Web Worker.
// We only need to manage the worker communication here.

export function useCodeRunner(activeLesson, currentExerciseIndex, onSuccess) {
  const [output, setOutput] = useState('');
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize worker if not already running
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('../workers/codeRunner.worker.js', import.meta.url), { type: 'module' });
    }
    return () => {
      // Cleanup worker on unmount
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const runCode = useCallback((code) => {
    setOutput('Kompilyatsiya qilinmoqda...');

    // Recreate worker to ensure a clean state
    if (workerRef.current) {
      workerRef.current.terminate();
    }
    workerRef.current = new Worker(new URL('../workers/codeRunner.worker.js', import.meta.url), { type: 'module' });

    workerRef.current.onmessage = (e) => {
      const { type, output: workerOutput, error, isCorrect } = e.data;
      
      if (type === 'SUCCESS') {
        setOutput(workerOutput);
        if (isCorrect && onSuccess) onSuccess();
      } else if (type === 'ERROR') {
        setOutput(error);
      }
    };

    workerRef.current.onerror = (e) => {
      setOutput(`❌ Worker xatosi: ${e.message}`);
    };

    // Kill worker if it takes more than 5 seconds (prevents infinite loop freezing the worker forever)
    const timeout = setTimeout(() => {
      if (workerRef.current) {
        workerRef.current.terminate();
        setOutput('❌ Kod ishlashi juda uzoq vaqt oldi (Timeout - ehtimol cheksiz sikl).');
      }
    }, 5000);

    const currentExercise = activeLesson?.exercises?.[currentExerciseIndex];
    const testCode = currentExercise?.test || 'return null;';

    workerRef.current.postMessage({
      type: 'RUN_CODE',
      code: code,
      language: activeLesson?.language || 'javascript',
      testCode: testCode
    });

    const originalOnMessage = workerRef.current.onmessage;
    workerRef.current.onmessage = (e) => {
      clearTimeout(timeout);
      originalOnMessage(e);
    };
    
    const originalOnError = workerRef.current.onerror;
    workerRef.current.onerror = (e) => {
      clearTimeout(timeout);
      originalOnError(e);
    };

  }, [activeLesson, currentExerciseIndex, onSuccess]);

  const resetOutput = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = new Worker(new URL('../workers/codeRunner.worker.js', import.meta.url), { type: 'module' });
    }
    setOutput('');
  }, []);

  return { output, runCode, resetOutput };
}
