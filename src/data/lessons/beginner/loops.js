export const loops = {
  id: "loops",
  title: "Looplar va Iteratsiyalar",
  theory: `## 1. LOOPLAR NIMA?
Looplar (sikllar) — bir xil kodni ma'lum bir shart asosida qayta-qayta bajarish uchun ishlatiladi. JavaScriptda 5 xil asosiy loop turi mavjud.

**Loops** (Sikllar) — bu bir xil kod bo'lagini ma'lum bir shart asosida qayta-qayta bajarish usulidir.

## 1. NEGA kerak?
Tasavvur qiling, sizga konsolga 100 marta "Salom" deb yozish kerak. Buni qo'lda yozish juda uzoq vaqt oladi. Sikllar yordamida buni 3 qator kod bilan hal qilish mumkin. Shuningdek, minglab foydalanuvchilar ro'yxati bilan ishlashda ham sikllar ajralmas yordamchidir.

## 2. SODDALIK (Analogiya)
Buni **stadionda yugurishga** o'xshatish mumkin:
- **Sikl boshlanishi:** Siz start chizig'idasiz (i = 0).
- **Shart:** 10 ta aylana yugurishingiz kerak (i < 10).
- **Qadam:** Har bir aylana oxirida bittaga oshirasiz (i++).
- **Sikl tugashi:** 10 ta aylana bitgach, to'xtaysiz.

## 3. STRUKTURA

### A. for sikli (Eng ko'p ishlatiladigani)
Takrorlanish soni aniq bo'lganda:
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i + "-aylana");
}
\`\`\`

### B. while sikli
Shart to'g'ri bo'lguncha ishlaydi:
\`\`\`javascript
let count = 1;
while (count <= 5) {
  console.log(count);
  count++;
}
\`\`\`

### C. for...of (Qiymatlar uchun)
Massiv elementlarini aylanish uchun eng qulay usul. U elementning **qiymatini** beradi:
\`\`\`javascript
const mevalar = ["Olma", "Banan", "Uzum"];
for (let meva of mevalar) {
  console.log(meva); // "Olma", "Banan"...
}
\`\`\`

### D. for...in (Kalitlar/Indekslar uchun)
Obyekt xususiyatlarini yoki massiv **indekslarini** aylanish uchun ishlatiladi:
\`\`\`javascript
const user = {ism: "Ali", yosh: 25};
for (let kalit in user) {
  console.log(kalit + ": " + user[kalit]); // ism: Ali...
}
\`\`\`

> **MUHIM FARQI:** \`for...of\` — **O**bject (massiv) ichidagi **qiymatlarni** (values) oladi. \`for...in\` — **I**ndex (yoki kalit) larni oladi. Massivlarda doim \`for...of\` ishlatish tavsiya etiladi!

## 4. AMALIYOT (Mashq)
1 dan 10 gacha bo'lgan faqat juft sonlarni chiqarish:
\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Cheksiz sikl (Infinite Loop):** Agar shartni doim \`true\` qilib qo'ysangiz yoki sanoqni oshirishni (\`i++\`) unutsangiz, dastur qotib qoladi.
2. **Indeks xatosi:** 0 dan boshlashni unutib, 1 dan boshlash (massivlar bilan ishlaganda).

## 6. SAVOLLAR (12 ta)
1. Sikl (Loop) nima?
2. JavaScriptda qaysi sikl turlari bor?
3. \`for\` siklining 3 ta qismi nima vazifani bajaradi?
4. \`while\` va \`do...while\` farqi nimada?
5. \`for...of\` nima uchun ishlatiladi?
6. Cheksiz sikl nima va u qanday hosil bo'ladi?
7. \`i++\` yozishni unutsak nima bo'ladi?
8. \`for\` siklida \`let\` o'rniga \`const\` ishlatsa bo'ladimi? (Nima uchun?)
9. Sikl ichida \`if\` shartini ishlatsa bo'ladimi?
10. Massiv elementlarini aylanish uchun eng qulay sikl qaysi?
11. Obyekt kalitlarini aylanish uchun qaysi sikl ishlatiladi (\`for...in\`)?
12. 10 dan 1 gacha teskari sanaydigan sikl qanday yoziladi?`,
  exercises: [
    {
      id: 1,
      title: "Takrorlash mashqi",
      instruction: "for sikli yordamida 1 dan 5 gacha bo'lgan sonlarni chiqaring (console.log ishlatib).",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 5; i++) { console.log(i); }",
      test: "if (logs.length >= 5 && logs.includes('1') && logs.includes('5')) return null; return '1 dan 5 gacha sonlar chiqishi kerak!';"
    },
    {
      id: 2,
      title: "Juft sonlar",
      instruction: "for sikli yordamida 1 dan 10 gacha bo'lgan faqat juft sonlarni chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "for (let i = 2; i <= 10; i += 2) { console.log(i); }",
      test: "if (logs.includes('2') && logs.includes('10') && !logs.includes('1')) return null; return 'Faqat juft sonlar chiqishi kerak!';"
    },
    {
      id: 3,
      title: "Yig'indi",
      instruction: "1 dan 100 gacha bo'lgan barcha sonlar yig'indisini hisoblang va konsolga chiqaring.",
      startingCode: "let sum = 0;\n// Bu yerga yozing\n",
      hint: "for (let i = 1; i <= 100; i++) { sum += i; } console.log(sum);",
      test: "if (logs.includes('5050')) return null; return 'Yig\\'indi 5050 chiqishi kerak!';"
    }
  ]
};
