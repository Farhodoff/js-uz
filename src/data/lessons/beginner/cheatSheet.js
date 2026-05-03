export const cheatSheet = {
  id: "cheat-sheet",
  title: "⚡ JS Cheat Sheet (Tezkor ma'lumotnoma)",
  theory: `## JavaScript Tezkor Ma'lumotnoma

Bu sahifa sizga darslar davomida o'rgangan eng muhim narsalarni eslatib turish uchun yaratildi.

## 1. O'zgaruvchilar
- \`let x = 10;\` — o'zgaradigan qiymat.
- \`const y = 20;\` — o'zgarmas qiymat.
- \`var z = 30;\` — eski usul (ishlatmang).

## 2. Ma'lumot turlari
- **String:** \`"Matn"\`
- **Number:** \`123\`
- **Boolean:** \`true / false\`
- **Null:** \`null\` (bo'sh)
- **Undefined:** \`undefined\` (noma'lum)

## 3. Shartli operatorlar
\`\`\`javascript
if (shart) {
  // bajariladi
} else {
  // aks holda
}

// Ternary:
let res = (yosh >= 18) ? "Katta" : "Kichik";
\`\`\`

## 4. Sikllar (Loops)
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

for (let item of massiv) {
  console.log(item);
}
\`\`\`

## 5. Funksiyalar
\`\`\`javascript
function salom(ism) {
  return "Salom " + ism;
}

const salomArrow = (ism) => "Salom " + ism;
\`\`\`

## 6. Obyektlar va Massivlar
\`\`\`javascript
const user = { name: "Ali", age: 25 }; // Obyekt
const mevalar = ["Olma", "Banan"]; // Massiv
\`\`\`

## 7. SAVOLLAR (12 ta)
1. \`let\` va \`const\` farqi nima?
2. JavaScriptda nechta primitiv tur bor?
3. \`==\` va \`===\` farqi nima?
4. \`if\` ichida \`0\` bo'lsa nima bo'ladi?
5. \`for\` loop qachon to'xtaydi?
6. Arrow funksiya nima?
7. \`typeof null\` natijasi nima?
8. \`typeof NaN\` natijasi nima?
9. Massivning 1-elementi indeksi necha?
10. Obyekt xususiyatini qanday o'qiymiz?
11. \`break\` nima ish qiladi?
12. \`continue\` nima ish qiladi?`,
  exercises: [
    {
      id: 1,
      title: "Tezkor sinov",
      instruction: "Konstanta 'PI' yarating (3.14) va konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const PI = 3.14; console.log(PI);",
      test: "if (logs.includes(3.14)) return null; return 'PI chiqmagan!';"
    }
  ]
};
