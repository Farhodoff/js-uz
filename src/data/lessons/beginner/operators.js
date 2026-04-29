export const operators = {
  id: "b2",
  title: "Operatorlar va Shartlar",
  theory: `## Operatorlar
Operatorlar yordamida qiymatlar ustida amal bajariladi.

- \`+\` qo'shadi
- \`-\` ayiradi
- \`*\` ko'paytiradi
- \`/\` bo'ladi
- \`%\` qoldiqni qaytaradi
- \`**\` darajaga oshiradi

## Shartlar
\`if / else\` dasturga qaror qabul qildirish uchun ishlatiladi.

\`\`\`javascript
const yosh = 19;

if (yosh >= 18) {
  console.log("Ruxsat beriladi");
} else {
  console.log("Ruxsat berilmaydi");
}
\`\`\`

## Ternary operator
Qisqa yozuv: \`shart ? to'g'ri : noto'g'ri\`.

## Quiz
1. \`%\` operatori nima qiladi?
2. \`===\` nima uchun \`==\` dan afzal?
3. Ternary operator qachon qulay?`,
  task: `// 1. Ikkita sonning ko'paytmasini hisoblang.
// 2. Juft/toq tekshiruvini yozing.
// 3. Ball 50 dan katta bo'lsa "O'tdi", aks holda "Yiqildi" chiqaring.

let x = 10;
let y = 5;
// Davom ettiring`,
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
