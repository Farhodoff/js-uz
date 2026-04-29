export const arrays = {
  id: "b5",
  title: "Massivlar (Arrays)",
  theory: `## Massivlar
Massiv bir nechta qiymatni tartibli saqlaydi. Ro'yxatlar, mahsulotlar va vazifalar ko'pincha massiv shaklida bo'ladi.

## Asosiy metodlar
- \`push()\` - oxiriga qo'shadi
- \`pop()\` - oxiridan oladi
- \`unshift()\` - boshiga qo'shadi
- \`shift()\` - boshidan oladi

## O'zgartirish va filtrlash
- \`map()\` - yangi massiv qaytaradi
- \`filter()\` - shartga mos elementlarni qoldiradi
- \`reduce()\` - bitta natijaga yig'adi

\`\`\`javascript
const sonlar = [1, 2, 3, 4];
const kvadratlar = sonlar.map((son) => son * son);
const juftlar = sonlar.filter((son) => son % 2 === 0);
\`\`\`

## Quiz
1. \`map\` nima qaytaradi?
2. \`filter\` qachon ishlatiladi?
3. Nima uchun massivlar loyihada muhim?`,
  task: `// 1. 5 ta meva nomidan iborat massiv yarating.
// 2. Har biriga " mevasi" qo'shib yangi massiv oling.
// 3. Harf soni 5 dan katta bo'lgan mevalarni ajrating.

let mevalar = [];
// Davom ettiring`,
  hint: `let mevalar = ["olma", "banan", "shaftoli", "anor", "uzum"];
let yangiMevalar = mevalar.map((m) => m + " mevasi");
let saralangan = mevalar.filter((m) => m.length > 5);
console.log(yangiMevalar);
console.log(saralangan);`
};