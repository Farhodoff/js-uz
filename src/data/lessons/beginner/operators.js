export const operators = {
  id: "b2",
  title: "Operatorlar va Shartlar",
  theory: `## Arifmetik Operatorlar
\`+\`, \`-\`, \`*\`, \`/\`, \`%\` (qoldiq), \`**\` (daraja).

## Shartli Operatorlar (if/else)
Dasturda qaror qabul qilish uchun ishlatiladi.

\`\`\`javascript
if (yosh >= 18) {
  console.log("Ruxsat");
} else {
  console.log("Taqiq");
}
\`\`\`

## Ternary Operator
Qisqacha if/else:
\`shart ? to'g'ri : noto'g'ri;\``,
  task: `// 1. Ikkita sonning ko'paytmasini hisoblang.
// 2. 'if/else' yordamida berilgan son juft yoki toqligini aniqlang.
// 3. Ternary operator yordamida ball 50 dan katta bo'lsa "O'tdi", aks holda "Yiqildi" deb chiqaring.

let x = 10;
let y = 5;
// ...`,
  hint: `let x = 10;
let y = 5;
console.log(x * y);

let son = 4;
if (son % 2 === 0) {
  console.log("Juft");
} else {
  console.log("Toq");
}

let ball = 60;
console.log(ball > 50 ? "O'tdi" : "Yiqildi");`
};
