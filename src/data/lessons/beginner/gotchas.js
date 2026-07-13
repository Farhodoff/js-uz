export const jsGotchas = {
  id: "jsGotchas",
  title: "JavaScript Gotchas (Tuzoqlar)",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy

JavaScript is a language created in just 10 days. Because of this rapid development and its requirement to be backward-compatible with the early web, it has some quirks or "gotchas". 

**Real-world Analogy:**
Imagine you are at a grocery store and you try to add an apple and a receipt together. In most languages, the store clerk would stop you and say "Error: You can't add food and paper". But JavaScript is the overly helpful clerk. It says, "Sure! I'll just turn this apple into a string 'apple' and paste the receipt next to it!" This is called **Type Coercion**. JavaScript tries its best to keep your code running by converting types automatically, even if it leads to unexpected results.

---

## 2. 🔬 Deep Dive (Under the hood, memory, V8 engine, performance)

### Type Coercion and The ToPrimitive Algorithm
When you try to use operators on different types (like \`[] + {}\`), the JavaScript engine (like V8) invokes abstract operations: \`ToPrimitive\`, \`ToString\`, or \`ToNumber\`.
- \`[]\` calls \`[].toString()\`, resulting in an empty string \`""\`.
- \`{}\` calls \`({}).toString()\`, resulting in \`"[object Object]"\`.
- Therefore, \`[] + {}\` evaluates to \`"" + "[object Object]"\` = \`"[object Object]"\`.

### The IEEE-754 Floating Point Standard
Why does \`0.1 + 0.2 === 0.3\` evaluate to \`false\`? 
JavaScript numbers are stored as 64-bit floating-point numbers following the IEEE-754 standard. Because fractions like 0.1 cannot be represented precisely in binary (just like 1/3 cannot be represented perfectly in decimal), the calculation results in \`0.30000000000000004\`. 
**Performance tip:** In financial applications, work in integers (e.g., cents) to avoid floating-point errors.

### The typeof null Bug
In the first implementation of JavaScript (in 32-bit systems), values were represented as a type tag and a value. The type tag for objects was \`0\`. \`null\` was represented as the NULL pointer (\`0x00\`). Because the type tag for \`null\` was \`0\`, \`typeof null\` incorrectly returned \`"object"\`. This is a historical bug in the language that cannot be fixed without breaking existing code.

---

## 3. ⚠️ Edge Cases and Senior Interview Questions

### Edge Cases
1. **NaN is a Number:** \`typeof NaN === 'number'\`. Also, \`NaN !== NaN\`. Always use \`Number.isNaN()\` to check for NaN.
2. **Relational vs Equality operators with null:** 
   - \`null > 0\` is \`false\`
   - \`null == 0\` is \`false\` (null is only loosely equal to undefined)
   - \`null >= 0\` is \`true\` (Relational operators convert null to 0)
3. **Automatic Semicolon Insertion (ASI):** If you return an object and place the \`{\` on the next line, JS will insert a \`;\` after \`return\`, resulting in \`undefined\`.

### Senior Interview Questions
1. **Q: How does \`3 > 2 > 1\` evaluate?**
   * **A:** It evaluates left-to-right. \`3 > 2\` is \`true\`. Then \`true > 1\`. \`true\` is coerced to \`1\`. \`1 > 1\` is \`false\`.
2. **Q: What is a sparse array?**
   * **A:** Creating an array with \`Array(3)\` creates an array of length 3 but with empty slots, not \`undefined\`. Array methods like \`.map()\` or \`.forEach()\` will skip these empty slots entirely.
3. **Q: What is the difference between \`==\`, \`===\`, and \`Object.is()\`?**
   * **A:** \`==\` does type coercion. \`===\` checks value and type. \`Object.is()\` is exactly like \`===\` except it correctly handles \`NaN\` (\`Object.is(NaN, NaN)\` is true) and distinguishes between \`-0\` and \`+0\`.

---

## 4. 📊 Flow of Type Coercion

\`\`\`mermaid
graph TD
    A[JS Engine encounters value] --> B{Is it a Primitive?}
    B -- Yes --> C[Use as is]
    B -- No --> D[Call ToPrimitive]
    D --> E{Does it have valueOf?}
    E -- Yes --> F[Return valueOf result if primitive]
    E -- No --> G[Call toString]
    F --> H{Still an object?}
    H -- Yes --> G
    H -- No --> I[Use result]
    G --> I
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Fix Floating Point Math",
      instruction: "Write a function `safeAdd(a, b)` that adds two floats safely by returning their sum rounded to 12 decimal places using `Number((a + b).toFixed(12))`.",
      startingCode: "function safeAdd(a, b) {\n  \n}",
      hint: "Use .toFixed(12) and convert it back to a Number.",
      test: "const fn = new Function(code + '; return safeAdd;')(); if(fn(0.1, 0.2)!==0.3) return 'Error: 0.1 + 0.2 should be exactly 0.3'; return null;"
    },
    {
      id: 2,
      title: "Proper NaN Check",
      instruction: "Write a function `isReallyNaN(val)` that returns true ONLY if val is strictly `NaN`. Do not use the global `isNaN()` because it converts strings.",
      startingCode: "function isReallyNaN(val) {\n  \n}",
      hint: "Use Number.isNaN(val) or check if val !== val.",
      test: "const fn = new Function(code + '; return isReallyNaN;')(); if(fn(NaN)!==true || fn('abc')!==false) return 'Error'; return null;"
    },
    {
      id: 3,
      title: "Fix the ASI bug",
      instruction: "The following code has an ASI (Automatic Semicolon Insertion) bug. Fix it so the function returns the object `{ id: 1 }`.",
      startingCode: "function getObject() {\n  return \n  {\n    id: 1\n  };\n}",
      hint: "Move the opening brace `{` to the same line as the `return` keyword.",
      test: "const fn = new Function(code + '; return getObject;')(); const res=fn(); if(!res || res.id!==1) return 'Error: Still returning undefined'; return null;"
    },
    {
      id: 4,
      title: "Check for Real Object",
      instruction: "Write a function `isRealObject(val)` that returns true if `val` is an object, but make sure to handle the `typeof null` bug (it should return false for null).",
      startingCode: "function isRealObject(val) {\n  \n}",
      hint: "Check if val is not null AND typeof is 'object'.",
      test: "const fn = new Function(code + '; return isRealObject;')(); if(fn(null)!==false || fn({})!==true) return 'Error'; return null;"
    },
    {
      id: 5,
      title: "Understand Array Coercion",
      instruction: "Write a function `arrayPlusArray()` that returns the literal result of `[] + []` in JS.",
      startingCode: "function arrayPlusArray() {\n  \n}",
      hint: "Just return [] + []",
      test: "const fn = new Function(code + '; return arrayPlusArray;')(); if(fn()!=='') return 'Error'; return null;"
    },
    {
      id: 6,
      title: "Understand null relational operators",
      instruction: "Write a function `nullRelational()` that returns an array with the results of: `[null > 0, null >= 0, null == 0]`.",
      startingCode: "function nullRelational() {\n  \n}",
      hint: "Return [null > 0, null >= 0, null == 0];",
      test: "const fn = new Function(code + '; return nullRelational;')(); const r=fn(); if(r[0]!==false||r[1]!==true||r[2]!==false) return 'Error'; return null;"
    },
    {
      id: 7,
      title: "Chained Relational Operators",
      instruction: "Write a function `chainedCompare()` that evaluates and returns `3 > 2 > 1`.",
      startingCode: "function chainedCompare() {\n  \n}",
      hint: "Just return 3 > 2 > 1;",
      test: "const fn = new Function(code + '; return chainedCompare;')(); if(fn()!==false) return 'Error'; return null;"
    },
    {
      id: 8,
      title: "Fix Sparse Array",
      instruction: "Write a function `createFilledArray()` that creates an array of length 3 using `Array(3)` and fills it with `0` so that methods like `.map()` will work on it.",
      startingCode: "function createFilledArray() {\n  \n}",
      hint: "Use Array(3).fill(0);",
      test: "const fn = new Function(code + '; return createFilledArray;')(); const arr=fn(); if(arr.length!==3 || arr[0]!==0) return 'Error'; return null;"
    },
    {
      id: 9,
      title: "Strict Equality vs Loose Equality",
      instruction: "Write a function `isStrictlyEqual(a, b)` that returns true if `a` and `b` are exactly the same type and value. Do NOT use `==`.",
      startingCode: "function isStrictlyEqual(a, b) {\n  \n}",
      hint: "Use ===.",
      test: "const fn = new Function(code + '; return isStrictlyEqual;')(); if(fn(0, '0')!==false || fn(1,1)!==true) return 'Error'; return null;"
    },
    {
      id: 10,
      title: "Using Object.is()",
      instruction: "Write a function `checkSame(a, b)` that uses `Object.is()` to check if a and b are identical.",
      startingCode: "function checkSame(a, b) {\n  \n}",
      hint: "return Object.is(a, b);",
      test: "const fn = new Function(code + '; return checkSame;')(); if(fn(NaN, NaN)!==true || fn(0, -0)!==false) return 'Error'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Why does 0.1 + 0.2 not equal 0.3 in JavaScript?",
      options: [
        "Because of the IEEE-754 standard for floating-point arithmetic",
        "It's a bug in the V8 engine",
        "Because strings are automatically converted to numbers",
        "0.1 and 0.2 are treated as integers"
      ],
      correctAnswer: 0,
      explanation: "JavaScript uses the IEEE-754 standard, which cannot precisely represent decimal fractions in binary form."
    },
    {
      id: 2,
      question: "What does typeof null return?",
      options: ["'null'", "'undefined'", "'object'", "Error"],
      correctAnswer: 2,
      explanation: "Due to a historical bug in the first version of JavaScript, typeof null returns 'object'."
    },
    {
      id: 3,
      question: "What is the result of NaN === NaN?",
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: 1,
      explanation: "NaN is the only value in JavaScript that is not equal to itself."
    },
    {
      id: 4,
      question: "What is the result of [] + []?",
      options: ["[]", "''", "'[object Object]'", "undefined"],
      correctAnswer: 1,
      explanation: "Both empty arrays are coerced to empty strings, and string concatenation results in an empty string ''."
    },
    {
      id: 5,
      question: "What is the result of [] + {}?",
      options: ["'['", "''", "'[object Object]'", "TypeError"],
      correctAnswer: 2,
      explanation: "The empty object is coerced to its string representation '[object Object]'."
    },
    {
      id: 6,
      question: "What is true about null == 0 and null >= 0?",
      options: [
        "Both are true",
        "null == 0 is false, null >= 0 is true",
        "Both are false",
        "null == 0 is true, null >= 0 is false"
      ],
      correctAnswer: 1,
      explanation: "Relational operators (>=) convert null to 0, so 0 >= 0 is true. Equality operator (==) does not coerce null to a number."
    },
    {
      id: 7,
      question: "How does 3 > 2 > 1 evaluate?",
      options: ["true", "false", "SyntaxError", "undefined"],
      correctAnswer: 1,
      explanation: "Evaluates left to right: (3 > 2) is true. Then true > 1 becomes 1 > 1, which is false."
    },
    {
      id: 8,
      question: "What does ASI stand for?",
      options: [
        "Advanced Semicolon Insertion",
        "Automatic Semicolon Insertion",
        "Asynchronous Semicolon Interface",
        "Array System Index"
      ],
      correctAnswer: 1,
      explanation: "Automatic Semicolon Insertion is a feature where the JS engine automatically inserts semicolons where it thinks they are missing."
    },
    {
      id: 9,
      question: "What is a difference between === and Object.is()?",
      options: [
        "There is no difference",
        "Object.is() treats NaN as equal to NaN",
        "=== does type coercion, Object.is() does not",
        "Object.is() only works on objects"
      ],
      correctAnswer: 1,
      explanation: "Object.is(NaN, NaN) returns true, whereas NaN === NaN returns false."
    },
    {
      id: 10,
      question: "Why does [1, 2, 3].map() work, but Array(3).map() does not execute the callback?",
      options: [
        "Array(3) creates an array with empty slots (sparse array)",
        "Array(3) is not a valid syntax",
        "Map only works on objects",
        "The elements are null"
      ],
      correctAnswer: 0,
      explanation: "Array(3) creates an array with a length of 3 but empty slots. Array methods like map skip empty slots."
    },
    {
      id: 11,
      question: "What is the best way to handle currency/money in JavaScript?",
      options: [
        "Store as floats",
        "Store as strings",
        "Store as integers (e.g., in cents)",
        "Store as hexadecimal"
      ],
      correctAnswer: 2,
      explanation: "To avoid floating-point math issues (like 0.1+0.2=0.300...4), convert currency to integers (e.g. cents)."
    },
    {
      id: 12,
      question: "Which type conversion algorithm is used when doing [] + {}?",
      options: [
        "ToPrimitive",
        "ToBoolean",
        "ToInt32",
        "ToNumber"
      ],
      correctAnswer: 0,
      explanation: "The engine uses the ToPrimitive abstract operation to convert objects to primitives before concatenation."
    }
  ]
};
