export const arrays = {
  id: "b5",
  title: "Massivlar (Arrays)",
  theory: `## 1. MASSIVLAR NIMA?
Massiv — bu ma'lumotlarni tartiblangan ro'yxat ko'rinishida saqlash uchun mo'ljallangan "maxsus obyekt". Tasavvur qiling, bozordagi xaridlar ro'yxati yoki sinfdagi o'quvchilar ismlari — bularning hammasi massivdir.

### Sintaksis
\`\`\`javascript
const mevalar = ["Olma", "Banan", "Gilos"];
console.log(mevalar[0]); // → "Olma" (sanoq 0 dan boshlanadi)
\`\`\`

---

## 2. ASOSIY METODLAR
Massivlar bilan ishlash uchun JavaScriptda juda ko'p tayyor metodlar bor:

- **push:** Oxiriga element qo'shadi.
- **pop:** Oxirgi elementni olib tashlaydi.
- **unshift:** Boshiga element qo'shadi.
- **shift:** Birinchi elementni olib tashlaydi.

\`\`\`mermaid
graph LR
    A[Massiv] -- push --> B[Oxiriga qo'shish]
    A -- pop --> C[Oxiridan olish]
    A -- unshift --> D[Boshiga qo'shish]
    A -- shift --> E[Boshidan olish]
\`\`\`

---

## 3. MASSIVNI AYLANIB CHIQISH
Eng zamonaviy usul — bu \`forEach\` yoki \`map\` metodlari.

\`\`\`javascript
const sonlar = [10, 20, 30];
sonlar.forEach(son => {
  console.log("Son:", son);
});
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior)

1. **Massiv indeksi nechanchidan boshlanadi?**
   *Javob:* 0 dan.

2. **push() va unshift() farqi nima?**
   *Javob:* \`push\` oxiriga, \`unshift\` boshiga element qo'shadi.

3. **Massiv uzunligini qanday bilish mumkin?**
   *Javob:* \`.length\` xususiyati orqali.`,
  exercises: [
    {
      id: 1,
      title: "Massiv yaratish",
      instruction: "3 ta shahar nomidan iborat 'shaharlar' massivini yarating va uni konsolga chiqaring.",
      startingCode: "// Shaharlar massivini yarating\n",
      hint: 'const shaharlar = ["Toshkent", "Samarqand", "Buxoro"]; console.log(shaharlar);',
      test: "if (Array.isArray(JSON.parse(logs[0].replace(/'/g, '\"')))) return null; return 'Massivni konsolga chiqaring';"
    },
    {
      id: 2,
      title: "Element qo'shish",
      instruction: "Berilgan 'colors' massiviga 'yellow' rangini oxiridan qo'shing.",
      startingCode: "const colors = ['red', 'green'];\n// Bu yerda push ishlating\n\nconsole.log(colors);",
      hint: "colors.push('yellow');",
      test: "if (logs[0].includes('yellow')) return null; return 'yellow qo\\'shilmagan';"
    }
  ]
};