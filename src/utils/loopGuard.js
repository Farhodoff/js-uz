import { parse } from 'acorn';
import { generate } from 'astring';
import { simple } from 'acorn-walk';

export const LOOP_LIMIT = 10000;
export const LOOP_GUARD_ERROR = 'Potensial cheksiz sikl aniqlandi (10000 marta aylandi)';

export function injectLoopGuard(code) {
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
          right: { type: 'Literal', value: LOOP_LIMIT }
        },
        consequent: {
          type: 'BlockStatement',
          body: [{
            type: 'ThrowStatement',
            argument: {
              type: 'NewExpression',
              callee: { type: 'Identifier', name: 'Error' },
              arguments: [{ type: 'Literal', value: LOOP_GUARD_ERROR }]
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
