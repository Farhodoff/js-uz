import { transform } from 'sucrase';
import alasql from 'alasql';
import { parse } from 'acorn';
import { generate } from 'astring';
import { simple } from 'acorn-walk';

function injectLoopGuard(code) {
  try {
    const ast = parse(code, { ecmaVersion: 2024, sourceType: 'module' });
    let loopId = 0;
    
    const wrapWithBlock = (node) => {
      if (node.type !== 'BlockStatement') {
        return {
          type: 'BlockStatement',
          body: [node]
        };
      }
      return node;
    };

    const injectGuard = (node) => {
      loopId++;
      node.body = wrapWithBlock(node.body);
      node.body.body.unshift({
        type: 'ExpressionStatement',
        expression: {
          type: 'UpdateExpression',
          operator: '++',
          prefix: false,
          argument: {
            type: 'MemberExpression',
            object: { type: 'Identifier', name: '__loop_guards' },
            property: { type: 'Literal', value: loopId },
            computed: true
          }
        }
      });
      node.body.body.unshift({
        type: 'IfStatement',
        test: {
          type: 'BinaryExpression',
          operator: '>',
          left: {
            type: 'MemberExpression',
            object: { type: 'Identifier', name: '__loop_guards' },
            property: { type: 'Literal', value: loopId },
            computed: true
          },
          right: { type: 'Literal', value: 10000 }
        },
        consequent: {
          type: 'BlockStatement',
          body: [{
            type: 'ThrowStatement',
            argument: {
              type: 'NewExpression',
              callee: { type: 'Identifier', name: 'Error' },
              arguments: [{ type: 'Literal', value: 'Potensial cheksiz sikl aniqlandi (10000 marta aylandi)' }]
            }
          }]
        }
      });
    };

    simple(ast, {
      WhileStatement: injectGuard,
      ForStatement: injectGuard,
      DoWhileStatement: injectGuard,
      ForInStatement: injectGuard,
      ForOfStatement: injectGuard,
    });

    return generate(ast);
  } catch (e) {
    return code; // Fallback to raw code if parser fails
  }
}

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
        const result = alasql(code);
        
        let outputText = logs.length ? logs.join('\\n') + '\\n\\n' : '';
        if (Array.isArray(result) && result.length > 0) {
          outputText += JSON.stringify(result, null, 2);
        } else if (result) {
          outputText += JSON.stringify(result);
        } else {
          outputText += '✅ So\\\'rov muvaffaqiyatli bajarildi (natjja bo\\\'sh)';
        }

        self.postMessage({ type: 'SUCCESS', output: outputText, isCorrect: true });
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
