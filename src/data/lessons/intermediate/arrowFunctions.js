export const arrowFunctions = {
  id: "m3",
  title: "Arrow functions & Callbacks",
  theory: `## Arrow Functions
Arrow function - funksiyani qisqaroq yozish usuli. U ayniqsa kichik bir qatorli amallar va callbacklarda qulay.

\`\`\`javascript
const salom = () => "Salom";
const sum = (a, b) => a + b;
\`\`\`

## Callback Functions
Callback - boshqa funksiyaga argument sifatida beriladigan funksiya.

\`\`\`javascript
function bajar(callback) {
  console.log("Boshlandi...");
  callback();
}

bajar(() => console.log("Tugadi!"));
\`\`\`

## Qachon ehtiyot bo'lish kerak?
- Arrow function o'zining alohida `this` kontekstini yaratmaydi.
- Katta blokli mantiqda oddiy function ba'zan o'qilishi osonroq bo'ladi.
- `map`, `filter`, `setTimeout` kabi joylarda arrow function juda qulay.

## Quiz
1. Arrow function nima uchun qisqa?
2. Callback nima?
3. Qachon oddiy function afzal bo'lishi mumkin?`,
  task: `// 1. Arrow function yordamida berilgan sonning kubini hisoblang.
// 2. 'numbers' massividagi har bir sonni 2 ga ko'paytirib yangi massiv yarating.

const numbers = [1, 2, 3, 4, 5];
// ...`,
  hint: `const kub = (n) => n ** 3;
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled);`
};
