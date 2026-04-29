export const modulesLesson = {
  id: "a6",
  title: "Modullar (Import/Export)",
  theory: `## Modullar nima?
Kodni bir nechta fayllarga bo'lib yozish usuli.

**Export:**
\`\`\`javascript
// math.js
export const sum = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }
\`\`\`

**Import:**
\`\`\`javascript
// main.js
import multiply, { sum } from './math.js';
\`\`\``,
  task: `// 1. 'math.js' faylidan 'PI' o'zgaruvchisini export qiling.
// 2. 'main.js' faylida uni import qilib ishlating.
// (Bu topshiriq nazariy, kodingizni namunaviy yozing)

// export ...
// import ...`,
  hint: `// math.js
export const PI = 3.14;

// main.js
import { PI } from './math.js';
console.log(PI);`
};
