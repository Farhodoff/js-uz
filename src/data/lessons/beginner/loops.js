export const loops = {
  id: "b3",
  title: "Looplar (Takrorlanuvchilar)",
  theory: `## For Loop
Ma'lum bir amalni bir necha bor takrorlash uchun ishlatiladi.

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

## While Loop
Shart to'g'ri bo'lguncha ishlaydi.

\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\``,
  task: `// 1. For loop yordamida 1 dan 10 gacha bo'lgan sonlarni chiqaring.
// 2. 1 dan 100 gacha bo'lgan sonlar yig'indisini hisoblang.

let sum = 0;
// ...`,
  hint: `for (let i = 1; i <= 10; i++) {
  console.log(i);
}

let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);`
};
