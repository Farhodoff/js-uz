export const loops = {
  id: "b14",
  title: "Sikllar: for, while, do-while",
  theory: `## 1. KIRISH
Tasavvur qiling, sizga 100 marta "Salom" deb yozish topshirildi. Har safar o'zingiz yozib chiqmaysiz-ku? Sikllar (loops) - bu ma'lum bir amalni bir necha marta takrorlash uchun ishlatiladigan mexanizm.

## 2. TUSHUNCHA

### Sodda ta'rif
Sikl - bu berilgan shart to'g'ri (true) bo'lguncha kodni qayta-qayta ishga tushirishdir.

### Real hayot o'xshashlik
Siklni **stadion atrofida yugurishga** o'xshatish mumkin. Shart: "10 ta aylana urguncha yugur". Har aylanada siz bitta sanaysiz.

### Sintaksis
\`\`\`javascript
// for sikli
for (boshlang'ich; shart; qadam) {
  // kod
}

// while sikli
while (shart) {
  // kod
}
\`\`\`

---

## 3. KOD MISOLLARI

### Misol 1 — 1 dan 5 gacha sanash
**Maqsad:** Eng ko'p ishlatiladigan \`for\` siklini ko'rsatish.
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log("Sanoq:", i);
}
// → 1, 2, 3, 4, 5
\`\`\`

### Misol 2 — Massivni aylanib chiqish
**Maqsad:** Ro'yxatdagi elementlarni birma-bir chiqarish.
\`\`\`javascript
const mevalar = ["Olma", "Banan", "Gilos"];
for (let i = 0; i < mevalar.length; i++) {
  console.log("Meva:", mevalar[i]);
}
\`\`\`

---

## 4. VIZUAL TUSHUNTIRISH
### Sikl oqimi (Flowchart)
\`\`\`mermaid
graph TD
    A[Sikl Boshi] --> B{Shart To'grimi?}
    B -- Ha --> C[Kod Blokini bajar]
    C --> D[Qadamni oshir]
    D --> B
    B -- Yo'q --> E[Sikl Tugashi]
\`\`\`

---

## 5. UMUMIY XATOLAR
### ❌ Cheksiz sikl (Infinite loop)
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  // i++ unutilgan! Sikl hech qachon tugamaydi va kompyuter qotadi.
}
\`\`\`

---

## 6. MINI LOYIHA: "Yulduzchalar generatori"
**Vazifa:** Berilgan son marta yulduzchalar chiqaring.

\`\`\`javascript
let n = 5;
let natija = "";
for (let i = 0; i < n; i++) {
  natija += "*";
}
console.log(natija); // → *****
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "for mashqi",
      instruction: "0 dan 4 gacha bo'lgan sonlarni consolega chiqaring.",
      startingCode: "for (let i = 0; i < 5; i++) {\n  // Kodni yozing\n}",
      hint: "console.log(i);",
      test: "if (logs.length === 5 && logs[0] === '0') return null; return '0 dan 4 gacha sonlar chiqishi kerak';"
    }
  ]
};
