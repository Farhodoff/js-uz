export const arrowFunctions = {
  id: "m3",
  title: "Arrow functions & Callbacks",
  theory: `## Arrow Functions
Funksiyalarni qisqaroq yozish usuli.

\`\`\`javascript
const salom = () => "Salom";
const sum = (a, b) => a + b;
\`\`\`

## Callback Functions
Boshqa funksiyaga argument sifatida beriladigan funksiya.

\`\`\`javascript
function bajar(callback) {
  console.log("Boshlandi...");
  callback();
}

bajar(() => console.log("Tugadi!"));
\`\`\``,
  task: `// 1. Arrow function yordamida berilgan sonning kubini hisoblang.
// 2. 'numbers' massividagi har bir sonni 2 ga ko'paytirib yangi massiv yarating (map + arrow function).

const numbers = [1, 2, 3, 4, 5];
// ...`,
  hint: `const kub = n => n ** 3;
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`
};
