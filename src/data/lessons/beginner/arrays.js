export const arrays = {
  id: "b3", title: "Massivlar",
  theory: `## Massivlar (Arrays)

Massiv — bir necha qiymatni saqlash uchun.

\`\`\`js
let mevalar = ["olma", "nok", "banan"];
\`\`\`

**Asosiy metodlar:**
- \`push()\` — oxiriga qo'shish
- \`pop()\` — oxiridan o'chirish
- \`length\` — uzunlik
- \`indexOf()\` — indeksini topish
- \`map()\`, \`filter()\`, \`forEach()\``,
  task: "// 3-topshiriq: 5 ta shahar nomini massivga saqlang\n// map() yordamida har birini katta harfga o'tkazing\n\nlet shaharlar = [];\n\nconsole.log(shaharlar.map(s => s.toUpperCase()));",
  hint: "let shaharlar = ['Toshkent','Samarqand','Buxoro','Namangan','Andijon']; console.log(shaharlar.map(s => s.toUpperCase()));"
};
