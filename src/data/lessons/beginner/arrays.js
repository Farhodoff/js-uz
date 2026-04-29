export const arrays = {
  id: "b5",
  title: "Massivlar (Arrays)",
  theory: `## Massivlar
Bir nechta qiymatni bitta o'zgaruvchida saqlash usuli.

**Asosiy metodlar:**
- \`push(item)\`: Oxiriga element qo'shadi.
- \`pop()\`: Oxirgi elementni o'chiradi.
- \`unshift(item)\`: Boshiga element qo'shadi.
- \`shift()\`: Birinchi elementni o'chiradi.

**Transformatsiya:**
- \`map()\`: Har bir elementni o'zgartirib yangi massiv qaytaradi.
- \`filter()\`: Shartga mos elementlarni saralab oladi.
- \`reduce()\`: Massivni bitta qiymatga keltiradi (masalan, yig'indi).
- \`forEach()\`: Har bir element uchun funksiya bajaradi.`,
  task: `// 1. 5 ta meva nomidan iborat massiv yarating.
// 2. 'map' yordamida mevalarning har biriga " mevasi" so'zini qo'shing.
// 3. 'filter' yordamida harf soni 5 dan ko'p bo'lgan mevalarni ajratib oling.

let mevalar = [];
// ...`,
  hint: `let mevalar = ["olma", "banan", "shaftoli", "anor", "uzum"];
let yangiMevalar = mevalar.map(m => m + " mevasi");
let saralangan = mevalar.filter(m => m.length > 5);`
};
