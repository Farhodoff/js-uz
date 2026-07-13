export const ifElseLesson = {
  id: 'if-else',
  title: 'If/Else Statements',
  theory: `
# If/Else Statements

## Part 1: Beginner Analogy
Imagine you are at a train station. You have a ticket for the express train. When you arrive at the platform, you check the sign: **If** the train is the express, you board it. **Else**, you wait for the next one. 

In programming, an \\\`if/else\\\` statement works exactly like that decision. It allows your code to make choices based on certain conditions (like checking the train sign).

\\\`\\\`\\\`javascript
let train = "express";

if (train === "express") {
  console.log("Board the train!");
} else {
  console.log("Wait for the next one.");
}
\\\`\\\`\\\`

## Part 2: Deep Dive (Under the Hood, Memory, V8 Engine, Performance)
Under the hood, the V8 engine (the JavaScript engine in Chrome and Node.js) treats conditional statements as branch instructions. During execution, the JIT (Just-In-Time) compiler uses a technique called **branch prediction**. 

When a loop contains an \\\`if/else\\\` statement, the CPU attempts to predict which branch will be taken to pre-load instructions. If the prediction is correct, execution is blazingly fast. If it's wrong (a branch misprediction), the CPU has to flush its pipeline, causing a slight performance hit. For performance-critical code, predictable conditions (like always true or always false) execute faster than random ones.

Memory-wise, \\\`if/else\\\` statements themselves don't consume heap memory; they are evaluated down to bytecode operations like \\\`JumpIfFalse\\\` and \\\`Jump\\\`.

## Part 3: Edge Cases and Senior Interview Questions
**1. Truthy and Falsy Values:**
JavaScript evaluates the condition based on truthiness. Falsy values are \\\`false\\\`, \\\`0\\\`, \\\`-0\\\`, \\\`0n\\\`, \\\`""\\\`, \\\`null\\\`, \\\`undefined\\\`, and \\\`NaN\\\`. Everything else is truthy.

**2. The Dangling Else Problem:**
If you omit curly braces, an \\\`else\\\` binds to the closest preceding \\\`if\\\`. This can lead to bugs.
\\\`\\\`\\\`javascript
// Bad practice:
if (true) 
  if (false) console.log("A"); 
else console.log("B"); // This else belongs to the second if!
\\\`\\\`\\\`

**3. Short-circuiting vs If/Else:**
Sometimes, logical OR (\\\`||\\\`) or AND (\\\`&&\\\`) are used as shorthand for \\\`if/else\\\`, but they behave differently with truthy/falsy values compared to the nullish coalescing operator (\\\`??\\\`).

### Flowchart of If/Else Execution
\\\`\\\`\\\`mermaid
graph TD
    A[Start] --> B{Condition is True?}
    B -- Yes --> C[Execute If Block]
    B -- No --> D[Execute Else Block]
    C --> E[Continue Execution]
    D --> E
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: 'Basic If Else',
      description: 'Write a function that checks if `age` is 18 or older. If so, return "Adult", otherwise return "Minor".',
      initialCode: 'function checkAge(age) {\n  // your code here\n}',
      solution: 'function checkAge(age) {\n  if (age >= 18) {\n    return "Adult";\n  } else {\n    return "Minor";\n  }\n}',
      testCases: []
    },
    {
      id: 2,
      title: 'Even or Odd',
      description: 'Write a function that returns true if `num` is even, and false if it is odd.',
      initialCode: 'function isEven(num) {\n  // your code here\n}',
      solution: 'function isEven(num) {\n  if (num % 2 === 0) {\n    return true;\n  } else {\n    return false;\n  }\n}',
      testCases: []
    },
    {
      id: 3,
      title: 'Discount Calculator',
      description: 'If `price` is greater than 100, return the price with a 10% discount. Otherwise, return the original price.',
      initialCode: 'function getDiscount(price) {\n  // your code here\n}',
      solution: 'function getDiscount(price) {\n  if (price > 100) {\n    return price * 0.9;\n  } else {\n    return price;\n  }\n}',
      testCases: []
    },
    {
      id: 4,
      title: 'Password Checker',
      description: 'If `password` is exactly "secret123", return "Access Granted". Otherwise return "Access Denied".',
      initialCode: 'function checkPassword(password) {\n  // your code here\n}',
      solution: 'function checkPassword(password) {\n  if (password === "secret123") {\n    return "Access Granted";\n  } else {\n    return "Access Denied";\n  }\n}',
      testCases: []
    },
    {
      id: 5,
      title: 'Temperature Categorizer',
      description: 'If `temp` < 0 return "Freezing". Else if `temp` < 20 return "Cold". Else return "Warm".',
      initialCode: 'function categorizeTemp(temp) {\n  // your code here\n}',
      solution: 'function categorizeTemp(temp) {\n  if (temp < 0) {\n    return "Freezing";\n  } else if (temp < 20) {\n    return "Cold";\n  } else {\n    return "Warm";\n  }\n}',
      testCases: []
    },
    {
      id: 6,
      title: 'FizzBuzz Logic',
      description: 'If `num` is divisible by 3 and 5, return "FizzBuzz". Else if divisible by 3, return "Fizz". Else if divisible by 5, return "Buzz". Else return `num`.',
      initialCode: 'function fizzBuzzSingle(num) {\n  // your code here\n}',
      solution: 'function fizzBuzzSingle(num) {\n  if (num % 15 === 0) {\n    return "FizzBuzz";\n  } else if (num % 3 === 0) {\n    return "Fizz";\n  } else if (num % 5 === 0) {\n    return "Buzz";\n  } else {\n    return num;\n  }\n}',
      testCases: []
    },
    {
      id: 7,
      title: 'Email Validator',
      description: 'Check if `email` string contains the "@" character. If it does, return "Valid", else "Invalid".',
      initialCode: 'function validateEmail(email) {\n  // your code here\n}',
      solution: 'function validateEmail(email) {\n  if (email.includes("@")) {\n    return "Valid";\n  } else {\n    return "Invalid";\n  }\n}',
      testCases: []
    },
    {
      id: 8,
      title: 'Grade Calculator',
      description: 'Return "A" for score >= 90, "B" for score >= 80, "C" for score >= 70, otherwise "F".',
      initialCode: 'function getGrade(score) {\n  // your code here\n}',
      solution: 'function getGrade(score) {\n  if (score >= 90) {\n    return "A";\n  } else if (score >= 80) {\n    return "B";\n  } else if (score >= 70) {\n    return "C";\n  } else {\n    return "F";\n  }\n}',
      testCases: []
    },
    {
      id: 9,
      title: 'Voting Eligibility',
      description: 'Return true if `isCitizen` is true AND `age` is >= 18. Otherwise return false.',
      initialCode: 'function canVote(isCitizen, age) {\n  // your code here\n}',
      solution: 'function canVote(isCitizen, age) {\n  if (isCitizen && age >= 18) {\n    return true;\n  } else {\n    return false;\n  }\n}',
      testCases: []
    },
    {
      id: 10,
      title: 'Time of Day Greeting',
      description: 'If `hour` < 12 return "Morning". Else if `hour` < 18 return "Afternoon". Else return "Evening".',
      initialCode: 'function greeting(hour) {\n  // your code here\n}',
      solution: 'function greeting(hour) {\n  if (hour < 12) {\n    return "Morning";\n  } else if (hour < 18) {\n    return "Afternoon";\n  } else {\n    return "Evening";\n  }\n}',
      testCases: []
    }
  ],
  quizzes: [
    {
      id: 1,
      question: 'What does `if ("0")` evaluate to?',
      options: ['True (truthy)', 'False (falsy)', 'Syntax Error', 'Undefined'],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Which keyword is used to specify a new condition if the first condition is false?',
      options: ['else', 'else if', 'elseif', 'then'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Is `NaN` considered a truthy or falsy value in JavaScript?',
      options: ['Truthy', 'Falsy', 'Depends on the context', 'Neither'],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'What happens if you omit curly braces `{}` in an `if` statement?',
      options: ['It throws an error', 'Only the next single statement is conditionally executed', 'The entire script stops', 'All subsequent statements are executed conditionally'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Can an `if` statement exist without an `else` block?',
      options: ['No, an else is strictly required', 'Yes, else blocks are optional', 'Yes, but only in strict mode', 'No, unless you use a switch statement instead'],
      correctAnswer: 1
    },
    {
      id: 6,
      question: 'What does "branch prediction" refer to in JavaScript engines like V8?',
      options: ['The CPU guessing which path an if/else will take to optimize execution', 'A method of writing nested ifs', 'Allocating memory for variables', 'The garbage collector cleaning up unused code blocks'],
      correctAnswer: 0
    },
    {
      id: 7,
      question: 'What is the boolean evaluation of `null` inside an `if` condition?',
      options: ['Truthy', 'Falsy', 'Error', 'Nullish'],
      correctAnswer: 1
    },
    {
      id: 8,
      question: 'In an `if/else if/else` chain, what is the maximum number of blocks that can execute?',
      options: ['Zero', 'One', 'Two', 'Unlimited'],
      correctAnswer: 1
    },
    {
      id: 9,
      question: 'Which of these is a common operator used as a shorthand for simple `if/else` logic?',
      options: ['Ternary Operator (? :)', 'Nullish Coalescing (??)', 'Typeof', 'Spread (...)'],
      correctAnswer: 0
    },
    {
      id: 10,
      question: 'What will be outputted by `let x = 5; if (x = 10) console.log(x);`?',
      options: ['5', '10', 'false', 'SyntaxError'],
      correctAnswer: 1
    },
    {
      id: 11,
      question: 'Are empty arrays `[]` considered truthy or falsy in JavaScript?',
      options: ['Falsy', 'Truthy', 'Neither', 'NaN'],
      correctAnswer: 1
    },
    {
      id: 12,
      question: 'What does an `if` condition fundamentally evaluate?',
      options: ['The memory size of the variable', 'Whether an expression resolves to a truthy or falsy value', 'If the variable is a string', 'If a function returns undefined'],
      correctAnswer: 1
    }
  ]
};
