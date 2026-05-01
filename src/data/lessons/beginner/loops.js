export const loops = {
  id: "b14",
  title: "Sikllar: for, while",
  theory: `## 1. KIRISH
Dasturlashda eng ko'p bajariladigan ish — bu takrorlash. Masalan, 1000 ta mahsulot ro'yxatini chiqarish yoki 1 dan 100 gacha sonlarni qo'shib chiqish. Buning uchun biz **Sikllar (Loops)** dan foydalanamiz.

## 2. TUSHUNCHA

### for sikli
Eng ko'p ishlatiladigan sikl. U uchta qismdan iborat:
1. **Boshlanish:** O'zgaruvchi yaratish (\`let i = 0\`).
2. **Shart:** Sikl qachongacha davom etishi (\`i < 10\`).
3. **Qadam:** Har safar o'zgaruvchini yangilash (\`i++\`).

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log("Qadam:", i);
}
\`\`\`

### while sikli
Bu sikl shart to'g'ri bo'lguncha ishlayveradi. Qadamni blok ichida o'zingiz yozishingiz kerak.
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\`

---

## 3. VIZUAL TUSHUNTIRISH
### Sikl qanday aylanadi?
\`\`\`mermaid
graph TD
    A[Sikl Boshi] --> B{Shart: i < 5?}
    B -- Ha --> C[Kod Blokini bajar]
    C --> D[i ni 1 ga oshir]
    D --> B
    B -- Yo'q --> E[Sikl Tugashi]
\`\`\`

---

## 4. INTERVYU SAVOLLARI (Junior)

1. **for va while farqi nima?**
   *Javob:* \`for\` da takrorlanishlar soni aniq bo'lganda ishlatish qulay. \`while\` esa shartga ko'ra qachon to'xtashini bilmaganimizda ishlatiladi.

2. **Cheksiz sikl (Infinite loop) nima?**
   *Javob:* Agar sikl sharti hech qachon \`false\` bo'lmasa, dastur to'xtovsiz ishlayveradi va brauzerni qotirib qo'yadi.

3. **break va continue farqi nima?**
   *Javob:* \`break\` — siklni butunlay to'xtatadi. \`continue\` — hozirgi qadamni tashlab ketib, keyingisiga o'tadi.

---

## 5. MINI LOYIHA: "1 dan N gacha yig'indi"
**Vazifa:** Foydalanuvchi bergan songacha bo'lgan barcha sonlar yig'indisini hisoblash.

\`\`\`javascript
let n = 10;
let sum = 0;
for (let i = 1; i <= n; i++) {
  sum += i;
}
console.log("Yig'indi:", sum); // → 55
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1 dan 100 gacha yig'indi",
      instruction: "for sikli yordamida 1 dan 100 gacha bo'lgan barcha sonlar yig'indisini hisoblang va konsolga chiqaring.",
      startingCode: "let sum = 0;\n// Bu yerda for siklini yozing\n\nconsole.log(sum);",
      hint: "for (let i = 1; i <= 100; i++) { sum += i; }",
      test: "if (logs.includes('5050')) return null; return 'Natija 5050 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Juft sonlar",
      instruction: "while sikli yordamida 2 dan 10 gacha bo'lgan faqat juft sonlarni chiqaring.",
      startingCode: "let i = 2;\nwhile (i <= 10) {\n  // Bu yerda i ni chiqaring va 2 taga oshiring\n}",
      hint: "console.log(i); i += 2;",
      test: "if (logs.includes('2') && logs.includes('10') && logs.length === 5) return null; return 'Faqat 2, 4, 6, 8, 10 chiqishi kerak';"
    }
  ]
};
