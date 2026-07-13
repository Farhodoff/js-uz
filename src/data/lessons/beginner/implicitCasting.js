export const implicitCasting = {
  id: "implicitCasting",
  title: "Implicit Casting (Type Coercion)",
  theory: `
## Part 1: Beginner Analogy
Imagine you are at a coffee shop and you hand the cashier a dollar bill (a Number) and a coupon that says "Free Coffee" (a String). You didn't give them exactly two pieces of the same currency, but the cashier automatically understands, combines them, and gives you your coffee. 

In JavaScript, when you perform operations on different data types (like adding a string and a number), the language tries to be helpful and automatically converts (or "coerces") one type into another so the operation can be completed. This automatic conversion is called **Implicit Casting** or **Type Coercion**.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)
When JavaScript encounters an operation with mismatched types, it doesn't just guess; the V8 engine strictly follows the ECMAScript specification for type conversion. 

Under the hood, the engine calls abstract operations like \\\`ToPrimitive\\\`, \\\`ToString\\\`, or \\\`ToNumber\\\`. For example, when evaluating \\\`"5" + 1\\\`:
1. The engine observes the \\\`+\\\` operator.
2. It checks the types of both operands. Since one operand (\\\`"5"\\\`) is a String, it decides to perform concatenation.
3. It calls the abstract operation \\\`ToString(1)\\\` on the number, which returns \\\`"1"\\\`.
4. It concatenates \\\`"5"\\\` and \\\`"1"\\\`, allocating a new string \\\`"51"\\\` in memory.

**Performance Impact:**
While type coercion seems convenient, it comes with a hidden performance cost. V8 optimizes code execution using Inline Caches (ICs). If your function consistently receives numbers, V8 optimizes it for numbers (keeping it on the "fast path"). However, if you start passing strings, the operation becomes polymorphic. This forces V8 to perform runtime type checking and conversion, which can eventually lead to deoptimization and slower execution.

## Part 3: Edge Cases and Senior Interview Questions
JavaScript's coercion rules can lead to infamous edge cases. Understanding these is critical for senior-level interviews.

1. **The \\\`+\\\` vs \\\`-\\\` operators:**
   The \\\`+\\\` operator favors strings (concatenation), while the \\\`-\\\` operator favors numbers (mathematical subtraction).
   
   \\\`\\\`\\\`js
   "5" + 3; // "53"
   "5" - 3; // 2
   "10" * "2"; // 20
   \\\`\\\`\\\`

2. **Abstract Equality (\\\`==\\\`) vs Strict Equality (\\\`===\\\`):**
   The \\\`==\\\` operator allows type coercion before comparing, which can yield unexpected results.
   
   \\\`\\\`\\\`js
   false == 0; // true
   "" == 0; // true
   [] == 0; // true
   null == undefined; // true
   null == 0; // false
   \\\`\\\`\\\`

3. **Complex Object Coercion:**
   When objects or arrays are coerced to primitives, arrays typically join their elements, while objects return \\\`"[object Object]"\\\`.
   
   \\\`\\\`\\\`js
   [] + []; // ""
   [] + {}; // "[object Object]"
   {} + []; // 0 (in some REPLs, treated as an empty block + empty array)
   \\\`\\\`\\\`

## Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD
    A[Expression: "5" + 1] --> B{Is either operand a string?}
    B -- Yes --> C[Call ToString on 1]
    C --> D[Result: "51" String]
    
    E[Expression: "5" - 1] --> F{Does operator require numbers?}
    F -- Yes --> G[Call ToNumber on "5"]
    G --> H[Result: 4 Number]
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: 1,
      title: "String + Number",
      description: "What is the result of '2' + 2?",
      code: "const result = '2' + 2;",
      expected: "22"
    },
    {
      id: 2,
      title: "String - Number",
      description: "What is the result of '5' - 3?",
      code: "const result = '5' - 3;",
      expected: 2
    },
    {
      id: 3,
      title: "Boolean + Number",
      description: "What is the result of true + 1?",
      code: "const result = true + 1;",
      expected: 2
    },
    {
      id: 4,
      title: "Array + Array",
      description: "What is the result of [] + []? (Answer with empty string)",
      code: "const result = [] + [];",
      expected: ""
    },
    {
      id: 5,
      title: "Null + Number",
      description: "What is the result of null + 5?",
      code: "const result = null + 5;",
      expected: 5
    },
    {
      id: 6,
      title: "Boolean to Number",
      description: "What is the result of Number(false)?",
      code: "const result = Number(false);",
      expected: 0
    },
    {
      id: 7,
      title: "String Multiplication",
      description: "What is the result of '10' * '2'?",
      code: "const result = '10' * '2';",
      expected: 20
    },
    {
      id: 8,
      title: "Array to Number",
      description: "What is the result of Number([])?",
      code: "const result = Number([]);",
      expected: 0
    },
    {
      id: 9,
      title: "Empty String Coercion",
      description: "What is the result of '' == false? (true/false)",
      code: "const result = '' == false;",
      expected: true
    },
    {
      id: 10,
      title: "Object + Array",
      description: "What is the result of [] + {}?",
      code: "const result = [] + {};",
      expected: "[object Object]"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "What does implicit casting (type coercion) mean in JavaScript?",
      options: [
        "Manual type conversion using functions like Number()",
        "Automatic type conversion by the JavaScript engine",
        "An error thrown when types don't match"
      ],
      answer: 1
    },
    {
      id: 2,
      question: "What is the result of the expression '10' + 5?",
      options: [
        "15",
        "'105'",
        "NaN"
      ],
      answer: 1
    },
    {
      id: 3,
      question: "What is the result of the expression '10' - 5?",
      options: [
        "15",
        "'105'",
        "5"
      ],
      answer: 2
    },
    {
      id: 4,
      question: "Which operator strongly favors string concatenation when one operand is a string?",
      options: [
        "-",
        "+",
        "*"
      ],
      answer: 1
    },
    {
      id: 5,
      question: "What does the expression true + true evaluate to?",
      options: [
        "true",
        "2",
        "NaN"
      ],
      answer: 1
    },
    {
      id: 6,
      question: "How does the V8 engine handle type coercion under the hood?",
      options: [
        "It guesses the type based on variable names",
        "It uses abstract operations like ToPrimitive and ToString",
        "It throws a warning to the console"
      ],
      answer: 1
    },
    {
      id: 7,
      question: "Why can implicit type casting cause performance issues?",
      options: [
        "It takes up too much stack memory",
        "It prevents inline caches from staying on the fast path, causing deoptimization",
        "It stops the garbage collector"
      ],
      answer: 1
    },
    {
      id: 8,
      question: "What is the numeric value of null when coerced?",
      options: [
        "0",
        "1",
        "NaN"
      ],
      answer: 0
    },
    {
      id: 9,
      question: "What is the numeric value of undefined when coerced?",
      options: [
        "0",
        "1",
        "NaN"
      ],
      answer: 2
    },
    {
      id: 10,
      question: "What does the expression [] == 0 evaluate to?",
      options: [
        "true",
        "false",
        "TypeError"
      ],
      answer: 0
    },
    {
      id: 11,
      question: "What does the expression null == undefined evaluate to?",
      options: [
        "true",
        "false",
        "NaN"
      ],
      answer: 0
    },
    {
      id: 12,
      question: "What does an empty array [] coerce to when converted to a string?",
      options: [
        "'0'",
        "'[object Array]'",
        "'' (an empty string)"
      ],
      answer: 2
    }
  ]
};
