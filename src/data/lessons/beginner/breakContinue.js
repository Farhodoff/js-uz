export const breakContinue = {
  id: "break-continue",
  title: "Break va Continue",
  level: "Beginner",
  description: "Sikl oqimini nazorat qilish: to'xtatish yoki ma'lum bir qadamni sakrab o'tish.",
  theory: `
# Break va Continue – Bu nima va nima uchun kerak?

Sikllar bilan ishlaganda ba'zida bizga siklni muddatidan oldin to'xtatish yoki ma'lum bir qadamni (iteratsiyani) tashlab o'tib ketish kerak bo'ladi. Buning uchun **break** va **continue** ishlatiladi.

## 1. NEGA kerak?
- **Break:** Tasavvur qiling, sizga 1000 ta mahsulot ichidan bittasini topish kerak. Uni 10-chi o'rinda topdingiz. Qolgan 990 tasini tekshirib o'tirish vaqtni yo'qotishdir. \`break\` orqali qidiruvni darhol to'xtatamiz.
- **Continue:** Masalan, 1 dan 10 gacha sonlarni chiqaryapsiz, lekin faqat toq sonlar kerak. Juft son kelganda uni "tashlab o'tib ketish" uchun \`continue\` kerak.

## 2. SODDALIK (Analogiya)
- **Break:** Bu xuddi **favqulodda tormozga** o'xshaydi. Poezd manziligacha bormay, o'rtada to'xtaydi.
- **Continue:** Bu esa **navbatdan sakrab o'tish** kabi. Siz navbatdasiz, lekin bitta odamni (shartga mosini) o'tkazib yuborib, o'zingiz keyingi odam bilan gaplashishda davom etasiz.

## 3. STRUKTURA

### A. Break (Sikldan chiqish)
\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // 5 ga yetganda butunlay to'xtaydi
  }
  console.log(i); // 1, 2, 3, 4
}
\`\`\`

### B. Continue (Qadamdan sakrash)
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // 3 ni tashlab o'tib ketadi
  }
  console.log(i); // 1, 2, 4, 5
}
\`\`\`

## 4. AMALIYOT (Mashq)
Ismlar massividan "Ali"ni qidirish:
\`\`\`javascript
let ismlar = ["Vali", "G'ani", "Ali", "Hasan"];
for (let ism of ismlar) {
  if (ism === "Ali") {
    console.log("Ali topildi!");
    break;
  }
  console.log("Tekshirildi: " + ism);
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **switch ichida continue:** \`continue\` faqat sikllarda ishlaydi, \`switch\` ichida ishlamaydi.
2. **Infinite Loop (while bilan):** \`while\` siklida \`continue\` ishlatganda ehtiyot bo'ling! Agar sanoqni (\`i++\`) \`continue\`dan keyin qo'ysangiz, u hech qachon ishlamaydi va sikl cheksiz bo'lib qoladi.

## 6. SAVOLLAR (12 ta)
1. \`break\` va \`continue\` farqi nimada?
2. Siklni butunlay to'xtatish uchun qaysi biri ishlatiladi?
3. Faqat bitta qadamni o'tkazib yuborish uchun-chi?
4. \`break\` ishlatilgandan keyin sikldan keyingi kodlar ishlaydimi?
5. \`continue\` ishlatilganda keyingi iteratsiyaga o'tiladimi?
6. Qidiruv algoritmlarida qaysi biri ko'p ishlatiladi?
7. \`if\` shartisiz \`break\` ishlatsa nima bo'ladi?
8. \`while\` siklida \`continue\` ishlatishdagi asosiy xavf nima?
9. Nested (ichma-ich) sikllarda \`break\` qaysi siklni to'xtatadi?
10. Labels (yorliqlar) nima va \`break\` bilan qanday ishlatiladi?
11. \`break\`ni \`switch\`dan tashqarida ishlatish mumkinmi?
12. O'quvchi uchun \`break\` tushunarliroqmi yoki \`if...else\`?`,
  exercises: [
    {
      id: 1,
      title: "Break sinovi",
      instruction: "0 dan 10 gacha sonlarni chiqaring, lekin 7 ga yetganda to'xtating.",
      startingCode: "for (let i = 0; i <= 10; i++) {\n  // Bu yerda\n  console.log(i);\n}",
      hint: "if (i === 7) break;",
      test: "if (logs.includes(6) && !logs.includes(7)) return null; return '7 da to\\'xtamadi!';"
    }
  ]
};
