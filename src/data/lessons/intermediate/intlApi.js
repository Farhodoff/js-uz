export const intlApi = {
  id: "intlApi",
  title: "Internationalization (Intl) API",
  language: "javascript",
  theory: `## Part 1: Beginner Analogy

**Intl (Internationalization) API** is a built-in object in JavaScript that provides language sensitive string comparison, number formatting, and date and time formatting.

### Real-world Analogy
Imagine you are an international tour guide. 
Old way (using libraries like moment.js): You carry a huge, heavy dictionary for every language in the world in your backpack. It's slow and exhausting.
New way (Intl API): You have an earpiece connected to an instant translator that already knows all the languages and rules without carrying extra weight. The browser already has all the cultural rules (CLDR) built-in, so you just tell it what language you want to speak.

\\\`\\\`\\\`javascript
// Old way: importing a heavy library
// import moment from 'moment';

// New way: Built-in Intl API
const formatter = new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS' });
console.log(formatter.format(1200000)); // "1 200 000,00 UZS"
\\\`\\\`\\\`

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

### Under the Hood
The Intl API relies on the **CLDR** (Common Locale Data Repository). This data is integrated directly into the browser (or Node.js environment), meaning you don't need to ship large localization files over the network.

### V8 Engine & Performance
When you call \\\`new Intl.NumberFormat()\\\`, V8 has to parse the locale string, fetch the locale data from ICU (International Components for Unicode), and set up the formatting rules. This initialization is an expensive operation.

**Performance Tip:** Always cache (memoize) your Intl formatter instances instead of creating them inside a loop.

\\\`\\\`\\\`javascript
// ❌ BAD: Creating instance inside a loop
const prices = [100, 200, 300];
prices.forEach(price => {
  console.log(new Intl.NumberFormat('en-US').format(price));
});

// ✅ GOOD: Caching the instance
const formatter = new Intl.NumberFormat('en-US');
prices.forEach(price => {
  console.log(formatter.format(price));
});
\\\`\\\`\\\`

## Part 3: Edge Cases and Senior Interview Questions

### Edge Cases
1. **Invalid Locales:** If you provide an invalid locale, it falls back to the default locale unless it's a completely malformed string, which throws a \\\`RangeError\\\`.
2. **Missing Currency Code:** If you set \\\`style: 'currency'\\\`, you MUST provide a \\\`currency\\\` option, otherwise a \\\`TypeError\\\` is thrown.

### Senior Interview Questions
**Q: How does Intl API handle Server-Side Rendering (SSR) hydration mismatches?**
A: A hydration mismatch occurs when the server uses one locale (e.g., UTC server time or en-US) to format dates/numbers, and the client browser uses another (e.g., uz-UZ). To fix this, always format based on a fixed locale on the server and update it on the client after the first render, or only format on the client side.

**Q: What is the purpose of \\\`formatToParts()\\\`?**
A: It returns an array of objects representing the formatted string in parts. This is highly useful for applying custom styling to different parts of the formatted value (e.g., making the currency symbol bold while keeping the number normal).

## Mermaid Diagram

\\\`\\\`\\\`mermaid
graph TD;
    A[JavaScript Code] -->|new Intl.DateTimeFormat| B(V8 Engine / ICU);
    B -->|Fetches locale rules| C[(CLDR Database)];
    C --> B;
    B -->|Returns formatted string| D[User Interface];
    D -->|Hydration Mismatch Risk| E[Server vs Client Locale];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Basic Number Formatting",
      instruction: "Write a function 'formatNumber(num)' that formats a given number using 'uz-UZ' locale.",
      startingCode: "function formatNumber(num) {\n  \n}",
      hint: "Use new Intl.NumberFormat('uz-UZ').format(num);",
      test: "const fn = new Function(code + '; return formatNumber;')(); if (fn(1000).replace(/\\s/g, '') === '1000') return null; return 'Incorrect formatting';"
    },
    {
      id: 2,
      title: "Currency Formatting",
      instruction: "Write a function 'formatCurrency(amount)' that formats a number as US Dollars ('USD') in the 'en-US' locale.",
      startingCode: "function formatCurrency(amount) {\n  \n}",
      hint: "Use { style: 'currency', currency: 'USD' } as options.",
      test: "const fn = new Function(code + '; return formatCurrency;')(); if (fn(100) === '$100.00') return null; return 'Incorrect currency format';"
    },
    {
      id: 3,
      title: "Date Formatting",
      instruction: "Write a function 'formatDate(date)' that formats a Date object to 'en-GB' locale with 'short' dateStyle.",
      startingCode: "function formatDate(date) {\n  \n}",
      hint: "Use new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).",
      test: "const fn = new Function(code + '; return formatDate;')(); if (fn(new Date('2023-01-01')).includes('/')) return null; return 'Incorrect date format';"
    },
    {
      id: 4,
      title: "Relative Time Format",
      instruction: "Write a function 'formatRelative(days)' that takes a number of days (negative for past) and formats it using 'uz-UZ' locale with 'auto' numeric option.",
      startingCode: "function formatRelative(days) {\n  \n}",
      hint: "Use new Intl.RelativeTimeFormat('uz-UZ', { numeric: 'auto' }).format(days, 'day');",
      test: "const fn = new Function(code + '; return formatRelative;')(); if (fn(-1) === 'kecha') return null; return 'Incorrect relative time';"
    },
    {
      id: 5,
      title: "List Formatting",
      instruction: "Write a function 'formatList(list)' that takes an array of strings and formats it using 'en-US' locale with 'conjunction' type.",
      startingCode: "function formatList(list) {\n  \n}",
      hint: "Use new Intl.ListFormat('en-US', { type: 'conjunction' }).format(list);",
      test: "const fn = new Function(code + '; return formatList;')(); if (fn(['A', 'B', 'C']).includes('and')) return null; return 'Incorrect list formatting';"
    },
    {
      id: 6,
      title: "Percentage Formatting",
      instruction: "Write a function 'formatPercent(num)' that formats a decimal (e.g. 0.5) to a percentage (e.g. 50%) using 'uz-UZ' locale.",
      startingCode: "function formatPercent(num) {\n  \n}",
      hint: "Use { style: 'percent' } in Intl.NumberFormat.",
      test: "const fn = new Function(code + '; return formatPercent;')(); if (fn(0.5).includes('50%')) return null; return 'Incorrect percent format';"
    },
    {
      id: 7,
      title: "Unit Formatting",
      instruction: "Write a function 'formatUnit(val)' that formats a number as 'kilometer' using 'en-US' locale.",
      startingCode: "function formatUnit(val) {\n  \n}",
      hint: "Use { style: 'unit', unit: 'kilometer' }.",
      test: "const fn = new Function(code + '; return formatUnit;')(); if (fn(5).includes('km')) return null; return 'Incorrect unit formatting';"
    },
    {
      id: 8,
      title: "Format to Parts",
      instruction: "Write a function 'getParts(amount)' that returns the formatted parts of amount in 'USD' currency ('en-US' locale).",
      startingCode: "function getParts(amount) {\n  \n}",
      hint: "Use new Intl.NumberFormat(...).formatToParts(amount);",
      test: "const fn = new Function(code + '; return getParts;')(); const res = fn(100); if (Array.isArray(res) && res[0].type === 'currency') return null; return 'Did not return parts array';"
    },
    {
      id: 9,
      title: "Weekday Name",
      instruction: "Write a function 'getWeekday(date)' that returns the 'long' weekday name for a Date in 'uz-UZ' locale.",
      startingCode: "function getWeekday(date) {\n  \n}",
      hint: "Use { weekday: 'long' } in Intl.DateTimeFormat.",
      test: "const fn = new Function(code + '; return getWeekday;')(); if (typeof fn(new Date()) === 'string') return null; return 'Incorrect weekday format';"
    },
    {
      id: 10,
      title: "Collator String Comparison",
      instruction: "Write a function 'compareStrings(a, b)' that compares two strings using 'uz-UZ' locale collator.",
      startingCode: "function compareStrings(a, b) {\n  \n}",
      hint: "Use new Intl.Collator('uz-UZ').compare(a, b);",
      test: "const fn = new Function(code + '; return compareStrings;')(); if (typeof fn('a', 'b') === 'number') return null; return 'Incorrect collator comparison';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "What does Intl API stand for?",
      options: [
        "Internalization API",
        "Internationalization API",
        "Interlink API",
        "Interpolation API"
      ],
      correctAnswer: 1,
      explanation: "Intl stands for Internationalization."
    },
    {
      id: 2,
      question: "Which database does the Intl API use under the hood?",
      options: [
        "SQL",
        "MongoDB",
        "CLDR",
        "JSON"
      ],
      correctAnswer: 2,
      explanation: "It uses the Common Locale Data Repository (CLDR)."
    },
    {
      id: 3,
      question: "Why should you cache an Intl formatter instance?",
      options: [
        "To save memory space",
        "Because creating it is a CPU-intensive operation",
        "To avoid network latency",
        "Because it is required by syntax"
      ],
      correctAnswer: 1,
      explanation: "Creating a new Intl formatter parses locale rules and is an expensive operation."
    },
    {
      id: 4,
      question: "Which object formats relative time (e.g., '2 days ago')?",
      options: [
        "Intl.DateTimeFormat",
        "Intl.RelativeTimeFormat",
        "Intl.TimeFormat",
        "Intl.Duration"
      ],
      correctAnswer: 1,
      explanation: "Intl.RelativeTimeFormat formats relative times."
    },
    {
      id: 5,
      question: "What happens if you provide an invalid currency code to Intl.NumberFormat?",
      options: [
        "It throws a RangeError",
        "It defaults to USD",
        "It ignores the currency style",
        "It returns null"
      ],
      correctAnswer: 0,
      explanation: "An invalid currency code throws a RangeError."
    },
    {
      id: 6,
      question: "What method allows you to get an array of formatted string parts?",
      options: [
        "format()",
        "formatToParts()",
        "split()",
        "parse()"
      ],
      correctAnswer: 1,
      explanation: "formatToParts() returns an array of objects representing the formatted string in parts."
    },
    {
      id: 7,
      question: "Which object is used for language-sensitive string comparison?",
      options: [
        "Intl.StringFormat",
        "Intl.Compare",
        "Intl.Collator",
        "String.prototype.localeCompare"
      ],
      correctAnswer: 2,
      explanation: "Intl.Collator enables language-sensitive string comparison."
    },
    {
      id: 8,
      question: "What does Intl.ListFormat do?",
      options: [
        "Sorts an array of strings",
        "Formats an array of strings with conjunctions/disjunctions",
        "Formats lists in HTML",
        "Filters unique list items"
      ],
      correctAnswer: 1,
      explanation: "It formats arrays into strings with locale-aware conjunctions like 'and' or 'or'."
    },
    {
      id: 9,
      question: "How do you detect the user's preferred locale?",
      options: [
        "window.locale",
        "navigator.language",
        "document.lang",
        "Intl.locale()"
      ],
      correctAnswer: 1,
      explanation: "navigator.language returns the user's preferred browser language."
    },
    {
      id: 10,
      question: "What issue arises when server and client locales differ in SSR?",
      options: [
        "SyntaxError",
        "Network Timeout",
        "Hydration Mismatch",
        "Memory Leak"
      ],
      correctAnswer: 2,
      explanation: "A Hydration Mismatch occurs when the HTML generated by the server differs from the client due to different locales."
    },
    {
      id: 11,
      question: "Which option is required when style is set to 'currency' in NumberFormat?",
      options: [
        "locale",
        "currency",
        "currencyDisplay",
        "maximumFractionDigits"
      ],
      correctAnswer: 1,
      explanation: "The 'currency' option must be provided when style is 'currency'."
    },
    {
      id: 12,
      question: "Which constructor formats dates and times?",
      options: [
        "Intl.DateTimeFormat",
        "Intl.DateFormat",
        "Intl.TimeFormat",
        "Intl.Calendar"
      ],
      correctAnswer: 0,
      explanation: "Intl.DateTimeFormat is used for formatting dates and times."
    }
  ]
};
