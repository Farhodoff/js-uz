export const typeCasting = {
  id: "typeCasting",
  title: "Type Casting in JavaScript",
  description: "Learn how JavaScript converts values from one type to another, both explicitly and implicitly.",
  theory: `
# Part 1: Beginner Analogy
Imagine you have a piece of paper with the number "5" written on it. To a computer, that's just a drawing of a number (a String). If you want to do math with it, you have to read the paper and hold the idea of the number 5 in your head (a Number). This process of converting data from one form (String) to another (Number) is called **Type Casting** (or Type Conversion). In JavaScript, this happens all the time, either manually (you explicitly tell JavaScript to do it) or automatically (JavaScript tries to be helpful and guesses what you want).

# Part 2: Deep Dive
Under the hood, JavaScript engines like V8 try to optimize type conversions. When you perform operations with mismatched types, the engine does "Implicit Type Coercion." This means it automatically converts types during execution, which can be slow and lead to unexpected bugs.

For example, when you do \\\`"5" - 2\\\`, V8 converts the string "5" to a number. But when you do \\\`"5" + 2\\\`, it converts the number 2 to a string and concatenates them to "52". To avoid performance hits and bugs, it is best practice to use "Explicit Type Casting" using functions like \\\`Number()\\\`, \\\`String()\\\`, and \\\`Boolean()\\\`.

# Part 3: Edge Cases and Senior Interview Questions
Interviewers love asking about JavaScript's quirky coercion rules.

Here are common edge cases:
- \\\`Number(null)\\\` is \\\`0\\\`, but \\\`Number(undefined)\\\` is \\\`NaN\\\`.
- \\\`Boolean("false")\\\` is \\\`true\\\` (because it's a non-empty string).
- \\\`[] == ![]\\\` evaluates to \\\`true\\\` because of complex coercion rules.
- \\\`"b" + "a" + + "a" + "a"\\\` evaluates to \\\`"baNaNa"\\\`.

**Mermaid Diagram:**
\\\`\\\`\\\`mermaid
graph TD;
  A[Original Value] --> B{Operation type};
  B -->|Math operations - * /| C[Convert to Number];
  B -->|Addition + with string| D[Convert to String];
  C --> E[Execution];
  D --> E;
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: 1,
      title: "Explicit Number Conversion",
      description: "Convert the string '42' into a number using the explicit Number() function.",
      code: "const str = '42';\n// Write your code below\nlet num = Number(str);",
      solution: "let num = Number(str);"
    },
    {
      id: 2,
      title: "Explicit String Conversion",
      description: "Convert the number 100 into a string using the String() function.",
      code: "const num = 100;\n// Write your code below\nlet str = String(num);",
      solution: "let str = String(num);"
    },
    {
      id: 3,
      title: "Explicit Boolean Conversion",
      description: "Convert the number 1 into a boolean using the Boolean() function.",
      code: "const num = 1;\n// Write your code below\nlet bool = Boolean(num);",
      solution: "let bool = Boolean(num);"
    },
    {
      id: 4,
      title: "Implicit Subtraction Coercion",
      description: "Observe implicit coercion. Create a variable 'result' that stores the value of '10' - 2.",
      code: "// Write your code below\nlet result = '10' - 2;",
      solution: "let result = '10' - 2;"
    },
    {
      id: 5,
      title: "Implicit Addition Coercion",
      description: "Create a variable 'result' that stores the value of '10' + 2. Notice how it concatenates instead of adding.",
      code: "// Write your code below\nlet result = '10' + 2;",
      solution: "let result = '10' + 2;"
    },
    {
      id: 6,
      title: "Parse Integer",
      description: "Use parseInt() to extract the integer value from the string '20px'.",
      code: "const str = '20px';\n// Write your code below\nlet parsed = parseInt(str);",
      solution: "let parsed = parseInt(str);"
    },
    {
      id: 7,
      title: "Parse Float",
      description: "Use parseFloat() to extract the floating-point value from the string '3.14rem'.",
      code: "const str = '3.14rem';\n// Write your code below\nlet parsed = parseFloat(str);",
      solution: "let parsed = parseFloat(str);"
    },
    {
      id: 8,
      title: "Null Coercion",
      description: "Convert null to a number using Number() and store it in 'nullNum'.",
      code: "// Write your code below\nlet nullNum = Number(null);",
      solution: "let nullNum = Number(null);"
    },
    {
      id: 9,
      title: "Undefined Coercion",
      description: "Convert undefined to a number using Number() and store it in 'undefNum'.",
      code: "// Write your code below\nlet undefNum = Number(undefined);",
      solution: "let undefNum = Number(undefined);"
    },
    {
      id: 10,
      title: "Boolean of Empty String",
      description: "Convert an empty string '' to a boolean using Boolean().",
      code: "// Write your code below\nlet boolEmpty = Boolean('');",
      solution: "let boolEmpty = Boolean('');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "What is the result of `Number('5')`?",
      options: ["5", "'5'", "NaN", "TypeError"],
      answer: "5"
    },
    {
      id: 2,
      question: "What is the result of `String(10)`?",
      options: ["10", "'10'", "NaN", "undefined"],
      answer: "'10'"
    },
    {
      id: 3,
      question: "What is the result of `Boolean(0)`?",
      options: ["true", "false", "NaN", "0"],
      answer: "false"
    },
    {
      id: 4,
      question: "What does `'5' - 1` evaluate to in JavaScript?",
      options: ["4", "'51'", "NaN", "TypeError"],
      answer: "4"
    },
    {
      id: 5,
      question: "What does `'5' + 1` evaluate to in JavaScript?",
      options: ["6", "'51'", "NaN", "TypeError"],
      answer: "'51'"
    },
    {
      id: 6,
      question: "What is the output of `parseInt('10px')`?",
      options: ["10", "NaN", "'10px'", "TypeError"],
      answer: "10"
    },
    {
      id: 7,
      question: "What does `Number(null)` return?",
      options: ["0", "NaN", "null", "undefined"],
      answer: "0"
    },
    {
      id: 8,
      question: "What does `Number(undefined)` return?",
      options: ["0", "NaN", "undefined", "TypeError"],
      answer: "NaN"
    },
    {
      id: 9,
      question: "What does `Boolean('')` evaluate to?",
      options: ["true", "false", "NaN", "undefined"],
      answer: "false"
    },
    {
      id: 10,
      question: "What does `Boolean('false')` evaluate to?",
      options: ["true", "false", "NaN", "TypeError"],
      answer: "true"
    },
    {
      id: 11,
      question: "Why does `[] == ![]` evaluate to true?",
      options: [
        "Because arrays are falsy",
        "Because of complex coercion rules converting both sides to numbers",
        "Because they are the same reference",
        "It evaluates to false"
      ],
      answer: "Because of complex coercion rules converting both sides to numbers"
    },
    {
      id: 12,
      question: "What does `+'a'` evaluate to?",
      options: ["NaN", "'a'", "0", "TypeError"],
      answer: "NaN"
    }
  ]
};
