export const loops = {
  id: "b3",
  title: "Looplar (Takrorlanuvchilar)",
  theory: `## Looplar
Looplar bir xil ishni ko'p marta takrorlash uchun ishlatiladi.

## For loop
Takrorlash soni oldindan ma'lum bo'lsa ishlatiladi.

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

## While loop
Shart to'g'ri bo'lib turguncha ishlaydi.

\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\`

## Quiz
1. \`for\` qachon qulay?
2. \`while\` qachon ishlatiladi?
3. \`break\` va \`continue\` farqi nima?`,
  task: `// 1. 1 dan 10 gacha bo'lgan sonlarni chiqaring.
// 2. 1 dan 100 gacha bo'lgan sonlar yig'indisini hisoblang.
// 3. Faqat juft sonlarni alohida chiqarib ko'ring.

let sum = 0;
// Davom ettiring`,
  hint: `for (let i = 1; i <= 10; i++) {
  console.log(i);
}

let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);

for (let i = 1; i <= 20; i++) {
  if (i % 2 === 0) console.log(i);
}`
};
