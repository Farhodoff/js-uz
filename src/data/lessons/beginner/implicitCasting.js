export const implicitCasting = {
  id: "implicit-casting",
  title: "Avtomatik turni o'zgartirish (Coercion)",
  level: "Beginner",
  description: "JavaScriptning o'zi (sizdan so'ramasdan) turlarni qanday o'zgartirishi haqida jumboqlar.",
  theory: `
# Coercion – Bu nima va nima uchun kerak?

**Implicit Coercion** (Avtomatik o'zgartirish) — bu JavaScriptning operatorlar (masalan, \`+\`, \`-\`) ishlatilganda ma'lumot turlarini o'zi xohlagandek o'zgartirib yuborishidir.

## 1. NEGA kerak?
Aslida bu tilning "qulayligi" uchun qilingan, lekin ko'pincha dasturchilar boshini og'ritadi. JS harakat qiladi-ki, qanday bo'lmasin amallarni bajarishga (xato bermasdan).

## 2. SODDALIK (Analogiya)
Buni **moslashuvchan sim (adapter)** deb tasavvur qiling. Sizda uch burchakli rozetka bor, lekin sim ikki burchakli. JS o'zi simni biroz bukab, "amallab" rozetkaga tiqib yuboradi.

## 3. STRUKTURA (Asosiy qoidalar)

### A. Qo'shish operatori (+) – Matnga moyil
Agar amalda bitta bo'lsa ham **matn (string)** qatnashsa, JS hammasini matnga aylantiradi:
\`\`\`javascript
"5" + 2; // "52"
1 + 1 + "2"; // "22" (oldin 1+1=2 bo'ladi, keyin "22" bo'ladi)
\`\`\`

### B. Boshqa arifmetik amallar (-, *, /) – Songa moyil
Bu operatorlar faqat sonlar bilan ishlaydi, shuning uchun JS matnlarni ham songa aylantiradi:
\`\`\`javascript
"10" - 5; // 5
"5" * "2"; // 10
\`\`\`

### C. Mantiqiy qiymatlar (Boolean)
\`true\` son sifatida \`1\` ga, \`false\` esa \`0\` ga teng bo'ladi:
\`\`\`javascript
true + 1; // 2
false * 10; // 0
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
console.log("20" / 2); // 10
console.log("5" + "5" - 5); // 50 (Chunki "5" + "5" = "55", keyin 55 - 5 = 50)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **== va === farqi:** \`==\` (double equals) avtomatik turni o'zgartiradi (\`5 == "5"\` is true). \`===\` esa o'zgartirmaydi (\`5 === "5"\` is false). Doim \`===\` ishlating!
2. **Bo'sh massivlar:** \`[] + []\` natijasi bo'sh matn \`""\` bo'ladi. Bu ko'pchilikni hayron qoldiradi.

## 6. SAVOLLAR (12 ta)
1. Coercion (Avtomatik o'zgartirish) nima?
2. Nima uchun "10" + 2 natijasi "102" chiqadi?
3. Nima uchun "10" - 2 natijasi 8 chiqadi?
4. \`true + true\` natijasi nima bo'ladi?
5. \`[] == 0\` natijasi nima bo'ladi?
6. \`!!""\` (ikki marta inkor) nima qaytaradi?
7. \`"5" * "5"\` natijasi nima?
8. Nima uchun JSda \`===\` ishlatish tavsiya etiladi?
9. \`null + 5\` natijasi nima bo'ladi?
10. \`undefined + 5\` natijasi nima bo'ladi? (Diqqat: NaN)
11. \`1 < 2 < 3\` natijasi nima?
12. \`3 > 2 > 1\` natijasi nima? (Mantiqan o'ylab ko'ring)`,
  exercises: [
    {
      id: 1,
      title: "Coercion sinovi",
      instruction: "Konsolga '5' + 5 va '5' - 5 natijalarini chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log('5' + 5); console.log('5' - 5);",
      test: "if (logs.includes('55') && logs.includes(0)) return null; return 'Natija noto\\'g\\'ri!';"
    }
  ]
};
