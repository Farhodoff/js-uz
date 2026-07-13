export const operators = {
  id: 'operators',
  title: 'JavaScript Operators',
  theory: `
# JavaScript Operators: From Beginner to Expert

## Part 1: Beginner Analogy
Imagine you're cooking in a kitchen. You have ingredients (values) and you need to process them. 
Operators are like your kitchen tools—knives, blenders, and stoves—that help you transform or combine ingredients.

- **Arithmetic Operators** (+, -, *, /) are like basic cooking actions: adding sugar, slicing an apple into pieces.
- **Assignment Operators** (=, +=, -=) are like putting food into a specific container.
- **Comparison Operators** (==, ===, !=, >, <) are like checking if your food is cooked enough (is temperature > 100?).
- **Logical Operators** (&&, ||, !) are like following recipes conditionally (if we have eggs AND flour, we can bake).

Here is a simple example:
\\\`javascript
let apples = 5;
let oranges = 3;
let totalFruits = apples + oranges; // Using the '+' operator
\\\`

## Part 2: Deep Dive (Under the Hood, Memory, V8 Engine, Performance)

### How Operators Work in Memory and V8
When V8 executes an operation like \\\`a + b\\\`, it doesn't just blindly add them. V8 heavily optimizes operations using Inline Caches (ICs).
If you consistently use the \\\`+\\\` operator on two integers (Smi - Small Integer in V8), V8 compiles a highly optimized machine code path.

However, if you suddenly use \\\`+\\\` on strings or mixed types, V8 has to "deoptimize" (bailout), falling back to slower, generic addition functions. This is because JavaScript allows dynamic typing, and the \\\`+\\\` operator is overloaded for both numeric addition and string concatenation.

### Type Coercion (The ECMAScript Spec)
When evaluating an expression with mixed types, JS performs abstract operations like \\\`ToPrimitive\\\`, \\\`ToNumber\\\`, or \\\`ToString\\\`.
- \\\`"5" + 3\\\` -> String concatenation triggers. \\\`3\\\` becomes \\\`"3"\\\`. Result: \\\`"53"\\\`.
- \\\`"5" - 3\\\` -> The minus operator only works for numbers. \\\`"5"\\\` becomes \\\`5\\\`. Result: \\\`2\\\`.

## Part 3: Edge Cases and Senior Interview Questions

### Interview Questions
**1. What is the difference between \\\`==\\\` and \\\`===\\\` under the hood?**
- \\\`===\\\` (Strict Equality) checks type first. If types differ, it returns false. If types are the same, it compares values.
- \\\`==\\\` (Loose Equality) triggers the \\\`Abstract Equality Comparison\\\` algorithm. If types differ, it attempts type coercion before comparing values.

**2. Why does \\\`0.1 + 0.2 === 0.3\\\` evaluate to false?**
JavaScript numbers are represented as IEEE 754 double-precision 64-bit floating-point format. Some decimals cannot be represented exactly in binary, leading to precision loss.

**3. What is the output of \\\`NaN === NaN\\\`?**
\\\`false\\\`. By IEEE 754 specification, NaN is not equal to anything, including itself. Use \\\`Number.isNaN()\\\` to check for NaN.

**4. What does the expression \\\`[] + {}\\\` and \\\`{} + []\\\` evaluate to?**
- \\\`[] + {}\\\` results in \\\`"[object Object]"\\\` (empty array coerces to "", empty object coerces to "[object Object]").
- \\\`{} + []\\\` can sometimes be interpreted as an empty code block followed by \\\`+[]\\\`, which evaluates to \\\`0\\\` in some older consoles, but generally in modern environments it evaluates to \\\`"[object Object]"\\\`.

### Mermaid Diagram: V8 Engine Operator Optimization

\\\`mermaid
graph TD
    A[Expression: a + b] --> B{Are both types Smi?}
    B -- Yes --> C[Optimized Machine Code]
    C --> D[Fast Execution]
    B -- No --> E{Are they strings?}
    E -- Yes --> F[String Concatenation Path]
    E -- No --> G[Generic Path / Coercion]
    G --> H[Deoptimization / Slower Execution]
\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Basic Arithmetic",
      description: "Create a variable `total` that adds 15 and 25.",
      starterCode: "let total = ;",
      solution: "let total = 15 + 25;"
    },
    {
      id: 2,
      title: "String Concatenation",
      description: "Concatenate 'Hello' and 'World' with a space in between and assign it to `greeting`.",
      starterCode: "let greeting = ;",
      solution: "let greeting = 'Hello' + ' ' + 'World';"
    },
    {
      id: 3,
      title: "Modulo Operator",
      description: "Find the remainder of 10 divided by 3 and assign it to `remainder`.",
      starterCode: "let remainder = ;",
      solution: "let remainder = 10 % 3;"
    },
    {
      id: 4,
      title: "Exponentiation",
      description: "Calculate 2 to the power of 5 using the exponentiation operator and assign to `power`.",
      starterCode: "let power = ;",
      solution: "let power = 2 ** 5;"
    },
    {
      id: 5,
      title: "Increment Operator",
      description: "Increment the variable `counter` by 1 using the increment operator.",
      starterCode: "let counter = 5;\n// Your code here",
      solution: "let counter = 5;\ncounter++;"
    },
    {
      id: 6,
      title: "Compound Assignment",
      description: "Add 10 to `score` using the `+=` operator.",
      starterCode: "let score = 50;\n// Your code here",
      solution: "let score = 50;\nscore += 10;"
    },
    {
      id: 7,
      title: "Strict Equality",
      description: "Check if `a` and `b` are strictly equal and assign the result to `isEqual`.",
      starterCode: "let a = 10;\nlet b = '10';\nlet isEqual = ;",
      solution: "let a = 10;\nlet b = '10';\nlet isEqual = a === b;"
    },
    {
      id: 8,
      title: "Logical AND",
      description: "Assign `true` to `canDrive` if `age` is greater than or equal to 18 AND `hasLicense` is true.",
      starterCode: "let age = 20;\nlet hasLicense = true;\nlet canDrive = ;",
      solution: "let age = 20;\nlet hasLicense = true;\nlet canDrive = age >= 18 && hasLicense;"
    },
    {
      id: 9,
      title: "Ternary Operator",
      description: "Use the ternary operator to assign 'Adult' to `status` if `age >= 18`, otherwise assign 'Minor'.",
      starterCode: "let age = 16;\nlet status = ;",
      solution: "let age = 16;\nlet status = age >= 18 ? 'Adult' : 'Minor';"
    },
    {
      id: 10,
      title: "Nullish Coalescing",
      description: "Assign `user.name` to `displayName`. If `user.name` is null or undefined, use 'Anonymous'. Use `??` operator.",
      starterCode: "let user = { name: null };\nlet displayName = ;",
      solution: "let user = { name: null };\nlet displayName = user.name ?? 'Anonymous';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "What is the result of `5 + '5'` in JavaScript?",
      options: ["10", "'55'", "NaN", "Error"],
      correctAnswer: "'55'",
      explanation: "When using the `+` operator with a string, JavaScript coerces the number into a string and concatenates them."
    },
    {
      id: 2,
      question: "What is the result of `'5' - 3`?",
      options: ["2", "'53'", "'2'", "NaN"],
      correctAnswer: "2",
      explanation: "The `-` operator only works for numbers, so JavaScript converts the string '5' to a number before subtracting."
    },
    {
      id: 3,
      question: "Which operator checks for both value and type equality?",
      options: ["==", "===", "=", "!=="],
      correctAnswer: "===",
      explanation: "The strict equality operator `===` checks both the value and the type of the operands."
    },
    {
      id: 4,
      question: "What does `typeof NaN` return?",
      options: ["'number'", "'NaN'", "'undefined'", "'object'"],
      correctAnswer: "'number'",
      explanation: "In JavaScript, NaN (Not-a-Number) is classified as a numeric type."
    },
    {
      id: 5,
      question: "What is the result of `0.1 + 0.2 === 0.3`?",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: "false",
      explanation: "Due to floating-point precision issues in IEEE 754, `0.1 + 0.2` evaluates to `0.30000000000000004`."
    },
    {
      id: 6,
      question: "What does the nullish coalescing operator `??` check for?",
      options: ["Only null", "null or undefined", "Any falsy value", "Only undefined"],
      correctAnswer: "null or undefined",
      explanation: "The `??` operator returns its right-hand operand when its left-hand operand is null or undefined."
    },
    {
      id: 7,
      question: "What is the result of `false || 'hello'`?",
      options: ["false", "true", "'hello'", "undefined"],
      correctAnswer: "'hello'",
      explanation: "The `||` operator returns the first truthy value. Since false is falsy, it returns 'hello'."
    },
    {
      id: 8,
      question: "What does `++x` do compared to `x++`?",
      options: [
        "No difference",
        "`++x` increments before returning the value, `x++` increments after.",
        "`x++` increments before returning the value, `++x` increments after.",
        "`++x` adds 2 to the value."
      ],
      correctAnswer: "`++x` increments before returning the value, `x++` increments after.",
      explanation: "`++x` is pre-increment, `x++` is post-increment."
    },
    {
      id: 9,
      question: "What does `[] == ![]` evaluate to?",
      options: ["true", "false", "TypeError", "NaN"],
      correctAnswer: "true",
      explanation: "`![]` evaluates to `false`. Then `[] == false` converts both sides to numbers (`0 == 0`), which is `true`."
    },
    {
      id: 10,
      question: "What does the `**` operator do?",
      options: ["Multiplication", "Exponentiation", "Bitwise XOR", "Logical AND"],
      correctAnswer: "Exponentiation",
      explanation: "The `**` operator raises the first operand to the power of the second operand (e.g., `2 ** 3 = 8`)."
    },
    {
      id: 11,
      question: "Which of the following has the highest operator precedence?",
      options: ["Addition (+)", "Multiplication (*)", "Assignment (=)", "Grouping ()"],
      correctAnswer: "Grouping ()",
      explanation: "Parentheses `()` always have the highest precedence in JavaScript, forcing whatever is inside to evaluate first."
    },
    {
      id: 12,
      question: "What will `typeof null` return?",
      options: ["'null'", "'object'", "'undefined'", "'boolean'"],
      correctAnswer: "'object'",
      explanation: "This is a well-known bug in JavaScript from its early days, where `typeof null` returns 'object'."
    }
  ]
};
