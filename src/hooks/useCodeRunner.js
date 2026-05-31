import { useState, useCallback, useRef } from 'react';
import { transform } from 'sucrase';
import alasql from 'alasql';

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

export function preprocessCodeForTests(rawCode) {
  if (typeof rawCode !== 'string') return '';
  // 1. Remove comments
  let cleaned = rawCode.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  // 2. Replace multiple whitespaces/newlines with a single space
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  // 3. Normalize quotes (replace double quotes and backticks with single quotes)
  cleaned = cleaned.replace(/["`]/g, "'");
  // 4. Normalize spaces around equals sign
  cleaned = cleaned.replace(/\s*=\s*/g, ' = ');
  // 5. Normalize spaces around commas
  cleaned = cleaned.replace(/\s*,\s*/g, ', ');
  // 6. Normalize spaces around math operators (+, -, *, /)
  cleaned = cleaned.replace(/\s*\+\s*/g, ' + ')
                   .replace(/\s*-\s*/g, ' - ')
                   .replace(/\s*\*\s*/g, ' * ')
                   .replace(/\s*\/\s*/g, ' / ');
  // Reduce multiple spaces that might have been introduced
  cleaned = cleaned.replace(/ +/g, ' ');
  return cleaned;
}

function setupMockDatabase() {
  const db = new alasql.Database();
  
  // Create tables
  db.exec("CREATE TABLE users (id INT, name STRING, age INT, city STRING, role STRING)");
  db.exec(`INSERT INTO users VALUES 
    (1, 'Ali', 25, 'Toshkent', 'Admin'), 
    (2, 'Vali', 30, 'Samarqand', 'User'), 
    (3, 'Sardor', 22, 'Toshkent', 'User'),
    (4, 'Madina', 28, 'Buxoro', 'Manager'),
    (5, 'Dilshod', 35, 'Toshkent', 'User')
  `);
  
  db.exec("CREATE TABLE orders (id INT, user_id INT, product STRING, amount DECIMAL, order_date STRING)");
  db.exec(`INSERT INTO orders VALUES 
    (101, 1, 'Laptop', 1200.50, '2026-05-01'),
    (102, 2, 'Phone', 800.00, '2026-05-02'),
    (103, 1, 'Mouse', 25.00, '2026-05-03'),
    (104, 3, 'Keyboard', 45.00, '2026-05-04'),
    (105, 4, 'Monitor', 300.00, '2026-05-05'),
    (106, 2, 'Charger', 15.00, '2026-05-06')
  `);
  
  db.exec("CREATE TABLE products (id INT, name STRING, category STRING, price DECIMAL, stock INT)");
  db.exec(`INSERT INTO products VALUES 
    (1, 'Laptop', 'Electronics', 1200.00, 10),
    (2, 'Phone', 'Electronics', 800.00, 25),
    (3, 'Desk', 'Furniture', 150.00, 5),
    (4, 'Chair', 'Furniture', 155.00, 15),
    (5, 'Mouse', 'Electronics', 25.00, 50)
  `);

  return db;
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

    // SQL Runner
    if (activeLesson?.language === 'sql') {
      try {
        const db = setupMockDatabase();
        const query = code.trim();
        const result = db.exec(query);

        // Format SQL result as log
        logs.push(JSON.stringify(result, null, 2));

        const currentExercise = activeLesson?.exercises?.[currentExerciseIndex];
        const testCode = currentExercise?.test || 'return null;';

        const tester = new Function('result', 'db', 'logs', `
          try {
            ${testCode}
          } catch(e) {
            return "Test Error: " + e.message;
          }
        `);
        const errorMsg = tester(result, db, logs);

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
        setOutput('❌ SQL Xatosi: ' + e.message);
      } finally {
        console.log = origLog;
        console.error = origError;
      }
      return;
    }

    // JavaScript / TypeScript Runner
    try {
      let codeToRun = code;

      // Transpile TypeScript to JavaScript
      if (activeLesson?.language === 'typescript') {
        const transpiled = transform(code, {
          transforms: ['typescript']
        });
        codeToRun = transpiled.code;
      }

      const currentExercise = activeLesson?.exercises?.[currentExerciseIndex];
      const testCode = currentExercise?.test || 'return null;';

      const combinedCode = `
        "use strict";
        const __loop_guards = new Proxy({}, {
          get: (target, name) => target[name] || 0
        });
        try {
          // Foydalanuvchi kodi (loop guard bilan)
          ${injectLoopGuard(codeToRun)}
          
          // Testni ishga tushirish (IIFE ichida)
          return (function(code, logs) {
            ${testCode}
          })(arguments[0], arguments[1]);
        } catch (e) {
          return "Runtime Error: " + e.message;
        }
      `;

      const runner = new Function('code', 'logs', combinedCode);
      const preprocessedCode = preprocessCodeForTests(codeToRun);
      const errorMsg = runner(preprocessedCode, logs);

      const handleResult = (err) => {
        let validationResult = '✅ Kod muvaffaqiyatli ishladi';
        let isCorrect = true;

        if (err) {
          validationResult = '❌ ' + err;
          isCorrect = false;
        }

        const outputText = logs.length
          ? logs.join('\n') + '\n\n' + validationResult
          : validationResult;

        setOutput(outputText);

        if (isCorrect && onSuccess) {
          onSuccess();
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
