export const variables = {
  id: "b1",
  title: "O'zgaruvchilar va Ma'lumot turlari",
  theory: `## O'zgaruvchilar
O'zgaruvchi - qiymat saqlaydigan konteyner. Loyihada foydalanuvchi nomi, narx, status yoki sozlama kabi ma'lumotlar o'zgaruvchida saqlanadi.

- \`let\` - keyin qiymati o'zgarishi mumkin.
- \`const\` - qayta tayinlanmaydi.

## Ma'lumot turlari
Asosiy turlar:
1. \`string\` - matn
2. \`number\` - son
3. \`boolean\` - true/false
4. \`undefined\` - qiymat berilmagan
5. \`null\` - ataylab bo'sh
6. \`object\` - murakkab tuzilma

## Misol
\`\`\`javascript
let ism = "Ali";
const yosh = 21;
let faol = true;

console.log(typeof ism);
console.log(typeof yosh);
console.log(typeof faol);
\`\`\`

## Quiz
1. \`let\` va \`const\` farqi nima?
2. \`undefined\` qachon chiqadi?
3. \`typeof null\` nima uchun \`object\` qaytaradi?`,
  task: `// 1. name, age va isStudent o'zgaruvchilarini yarating.
// 2. Har birining turini console.log bilan chiqaring.
// 3. Sevimli 3 ta narsangizdan const massiv yarating.

// Kodingizni shu yerga yozing`,
  hint: `let name = "Ali";
let age = 25;
let isStudent = true;
const favorites = ["JavaScript", "kitob", "futbol"];

console.log(typeof name);
console.log(typeof age);
console.log(typeof isStudent);
console.log(favorites);`
};
