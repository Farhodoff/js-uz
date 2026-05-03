export const equalityAlgorithms = {
  id: "equality-algorithms",
  title: "Tenglik Operatorlari (Equality)",
  theory: `## 1. LOOSE EQUALITY (==) — YUMSHOQ TENGLIK
\`==\` operatori solishtirishdan oldin operandlarning **tiplarini avtomatik o‘zgartiradi** (type coercion). Qiymatlar bir xil bo‘lsa \`true\` qaytaradi.

JavaScriptda ikkita qiymatni solishtirish uchun bir nechta usul bor. Eng ko'p ishlatiladiganlari \`==\` (yumshoq tenglik) va \`===\` (qat'iy tenglik).

## 1. NEGA kerak?
Agar biz foydalanuvchi kiritgan raqamni (\`"10"\`) bizdagi raqam (\`10\`) bilan solishtirmoqchi bo'lsak, JS ularni qanday tushunishini bilishimiz kerak. Noto'g'ri solishtirish dasturda kutilmagan xatolarga sabab bo'ladi.

## 2. SODDALIK (Analogiya)
- **== (Yumshoq):** Bu xuddi **egizaklarga** o'xshaydi. Kiyimi har xil bo'lsa ham (turi har xil), yuzi bir xil bo'lsa "ha, bular bir xil" deydi.
- **=== (Qat'iy):** Bu esa **pasport tekshiruvi** kabi. Ham yuzi, ham kiyimi (turi) aynan bir xil bo'lishi shart.

## 3. STRUKTURA

### A. Yumshoq tenglik (==)
Solishtirishdan oldin turlarni bir xil qilishga harakat qiladi (Coercion):
\`\`\`javascript
5 == "5"; // true (matnni songa aylantirdi)
1 == true; // true (trueni 1 ga aylantirdi)
0 == false; // true
\`\`\`

### B. Qat'iy tenglik (===)
Hech narsani o'zgartirmaydi. Agar turlari har xil bo'lsa — darhol \`false\`:
\`\`\`javascript
5 === "5"; // false (chunki biri son, biri matn)
1 === true; // false
\`\`\`

### C. Object.is() – Eng aniq usul
Ba'zi g'alati holatlar (\`NaN\` kabi) uchun ishlatiladi:
\`\`\`javascript
NaN === NaN; // false (JSdagi g'alati qoida)
Object.is(NaN, NaN); // true (mana bu to'g'ri!)
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **== ishlatish:** Ko'p hollarda \`==\` kutilmagan natija beradi. Shuning uchun professional dasturchilar har doim \`===\` ishlatishni maslahat berishadi.
2. **NaN bilan solishtirish:** \`if (x === NaN)\` hech qachon ishlamaydi. Buning o'rniga \`isNaN(x)\` ishlatish kerak.

## 6. SAVOLLAR (12 ta)
1. \`==\` va \`===\` farqi nimada?
2. Coercion (avtomatik tur o'zgarishi) qaysi tenglikda sodir bo'ladi?
3. Nima uchun \`5 === "5"\` false qaytaradi?
4. \`null == undefined\` natijasi nima?
5. \`null === undefined\` natijasi nima?
6. \`NaN == NaN\` natijasi nima bo'ladi?
7. \`Object.is()\` nima uchun kerak?
8. \`0 == ""\` (bo'sh matn) natijasi nima?
9. \`0 === ""\` natijasi nima?
10. Nima uchun har doim \`===\` ishlatish tavsiya etiladi?
11. \`false == "0"\` natijasi nima?
12. Massivlarni \`===\` bilan solishtirsa bo'ladimi? (Diqqat: Reference!)`,
  exercises: [
    {
      id: 1,
      title: "Tenglikni tekshiring",
      instruction: "100 sonini '100' matni bilan qat'iy tenglik (===) orqali solishtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = 100 === '100';",
      test: "if (res === false) return null; return 'Solishtirish noto\\'g\\'ri!';"
    }
  ]
};
