export const typeConversionLesson = {
  id: 'type-conversion',
  title: 'Type Conversion in JavaScript',
  description: 'Learn how JavaScript handles type conversion implicitly and explicitly, with a deep dive into engine mechanics and edge cases.',
  theory: `
## Part 1: Beginner Analogy
Imagine you speak English and your friend speaks Spanish. If you try to communicate directly, there might be confusion. You need a translator to bridge the gap. In JavaScript, data types are like different languages. When you try to combine different types, like a Number and a String (for example adding \\\`5\\\` and \\\`" apples"\\\`), JavaScript acts as an automatic translator to make them understand each other. This automatic translation by JavaScript is called **Implicit Type Conversion** (or Type Coercion). If you manually translate the values yourself using tools like \\\`Number()\\\`, \\\`String()\\\`, or \\\`Boolean()\\\`, it is called **Explicit Type Conversion**. Explicit conversion is like hiring a professional translator to ensure there are no misunderstandings.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)
Under the hood, JavaScript engines like V8 handle type conversion using abstract operations defined in the ECMAScript specification, such as \\\`ToPrimitive\\\`, \\\`ToString\\\`, and \\\`ToNumber\\\`. 

When an object needs to be converted to a primitive value, JavaScript calls the internal \\\`[[DefaultValue]]\\\` method. It attempts to invoke the \\\`valueOf()\\\` and \\\`toString()\\\` methods on the object depending on the preferred type hint (Number or String).

From a memory perspective, creating new primitive values during coercion takes a minimal toll, but in performance-critical loops, implicit coercion can be detrimental. Implicit coercion defeats engine optimizations (like inline caches in V8) because the engine has to handle polymorphic operations (multiple types) instead of monomorphic ones (a single consistent type). This forces the engine to de-optimize the code. Therefore, explicit coercion is always safer, more predictable, and generally better for performance in hot code paths.

## Part 3: Edge Cases and Senior Interview Questions
Type coercion produces some of the most famous edge cases in JavaScript, which are common in senior developer interviews:
- \\\`[] + []\\\` evaluates to \\\`""\\\` (empty string) because both arrays are coerced to empty strings.
- \\\`[] + {}\\\` evaluates to \\\`"[object Object]"\\\` because the empty array becomes \\\`""\\\` and the object becomes \\\`"[object Object]"\\\`.
- \\\`true + true\\\` evaluates to \\\`2\\\` because booleans are coerced to \\\`1\\\` and \\\`0\\\`.
- \\\`"5" - 1\\\` evaluates to \\\`4\\\` (string coerced to number for subtraction), but \\\`"5" + 1\\\` evaluates to \\\`"51"\\\` (number coerced to string for concatenation).
- \\\`!!""\\\` evaluates to \\\`false\\\` because an empty string is a falsy value.

### Mermaid Diagram

\\\`\\\`\\\`mermaid
graph TD;
    A[Value needs conversion] --> B{Is it Explicit or Implicit?};
    B -->|Explicit| C[Developer uses String, Number, Boolean];
    B -->|Implicit| D[JS Engine Coerces];
    D --> E[Abstract Operations];
    E --> F[ToPrimitive];
    E --> G[ToNumber];
    E --> H[ToString];
    F --> I[Calls valueOf and toString];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: 'Explicit String Conversion',
      description: 'Convert the number 123 to a string using explicit conversion.',
      code: 'const num = 123;\n// Convert num to a string explicitly\nconst str = ',
      solution: 'const num = 123;\nconst str = String(num);'
    },
    {
      id: 2,
      title: 'Explicit Number Conversion',
      description: 'Convert the string "456" to a number using explicit conversion.',
      code: 'const str = "456";\n// Convert str to a number explicitly\nconst num = ',
      solution: 'const str = "456";\nconst num = Number(str);'
    },
    {
      id: 3,
      title: 'Explicit Boolean Conversion',
      description: 'Convert the number 0 to a boolean using explicit conversion.',
      code: 'const num = 0;\n// Convert num to a boolean explicitly\nconst bool = ',
      solution: 'const num = 0;\nconst bool = Boolean(num);'
    },
    {
      id: 4,
      title: 'Implicit String Coercion',
      description: 'Use the `+` operator to implicitly convert the number 5 into the string "5".',
      code: 'const num = 5;\n// Implicitly convert using +\nconst str = num + ',
      solution: 'const num = 5;\nconst str = num + "";'
    },
    {
      id: 5,
      title: 'Implicit Number Coercion',
      description: 'Use the unary `+` operator to implicitly convert the string "10" to a number.',
      code: 'const str = "10";\n// Implicitly convert using unary +\nconst num = ',
      solution: 'const str = "10";\nconst num = +str;'
    },
    {
      id: 6,
      title: 'Implicit Boolean Coercion',
      description: 'Use the logical NOT operator `!` twice to implicitly convert `"hello"` to a boolean.',
      code: 'const str = "hello";\n// Implicitly convert using !!\nconst bool = ',
      solution: 'const str = "hello";\nconst bool = !!str;'
    },
    {
      id: 7,
      title: 'Subtraction Coercion',
      description: 'Subtract the string "5" from the number 10. Observe how JS coerces the string to a number.',
      code: 'const result = 10 - ',
      solution: 'const result = 10 - "5";'
    },
    {
      id: 8,
      title: 'Addition Coercion',
      description: 'Add the number 5 and the string "5" together.',
      code: 'const result = 5 + ',
      solution: 'const result = 5 + "5";'
    },
    {
      id: 9,
      title: 'Falsy Values explicitly',
      description: 'Convert `null` to a boolean explicitly.',
      code: 'const val = null;\n// Convert val to a boolean\nconst bool = ',
      solution: 'const val = null;\nconst bool = Boolean(val);'
    },
    {
      id: 10,
      title: 'Object to Primitive',
      description: 'Convert an empty array `[]` to a string explicitly.',
      code: 'const arr = [];\n// Convert arr to a string\nconst str = ',
      solution: 'const arr = [];\nconst str = String(arr);'
    }
  ],
  quizzes: [
    {
      id: 1,
      question: 'What is the output of `String(123)`?',
      options: ['"123"', '123', 'NaN', 'undefined'],
      answer: '"123"'
    },
    {
      id: 2,
      question: 'What is the output of `Number("123a")`?',
      options: ['123', 'NaN', '"123a"', 'Error'],
      answer: 'NaN'
    },
    {
      id: 3,
      question: 'What is the output of `Boolean(0)`?',
      options: ['true', 'false', '0', 'NaN'],
      answer: 'false'
    },
    {
      id: 4,
      question: 'What is the output of `5 + "5"`?',
      options: ['10', '"55"', 'NaN', 'Error'],
      answer: '"55"'
    },
    {
      id: 5,
      question: 'What is the output of `"10" - 5`?',
      options: ['5', '"105"', 'NaN', 'Error'],
      answer: '5'
    },
    {
      id: 6,
      question: 'What is the output of `[] + []`?',
      options: ['"[]"', '""', '0', 'NaN'],
      answer: '""'
    },
    {
      id: 7,
      question: 'What is the output of `!!""`?',
      options: ['true', 'false', '""', 'NaN'],
      answer: 'false'
    },
    {
      id: 8,
      question: 'What is the output of `+"10"`?',
      options: ['"10"', '10', 'NaN', 'Error'],
      answer: '10'
    },
    {
      id: 9,
      question: 'What is the output of `[] + {}`?',
      options: ['"[object Object]"', '""', '0', 'NaN'],
      answer: '"[object Object]"'
    },
    {
      id: 10,
      question: 'What is the output of `true + true`?',
      options: ['true', 'false', '2', '1'],
      answer: '2'
    },
    {
      id: 11,
      question: 'What is the result of `Number(null)`?',
      options: ['0', 'NaN', 'null', '1'],
      answer: '0'
    },
    {
      id: 12,
      question: 'What is the result of `Number(undefined)`?',
      options: ['0', 'NaN', 'undefined', '1'],
      answer: 'NaN'
    }
  ]
};
