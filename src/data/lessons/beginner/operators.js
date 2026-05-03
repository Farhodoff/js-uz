export const operators = {
  id: "operators",
  title: "Operatorlar: Taqqoslash va Mantiqiy",
  theory: `## 1. KIRISH
Dasturlashda qaror qabul qilish uchun bizga operatorlar kerak. Masalan, foydalanuvchi kiritgan parol to'g'rimi? Yoki foydalanuvchining balansi xarid uchun yetarlimi? Bularning hammasi taqqoslash operatorlari orqali amalga oshiriladi.

Dasturlashda ma'lumotlar ustida ish bajarish uchun **Operatorlar** kerak. Ular xuddi matematikadagi ishoralarga o'xshaydi.

## 1. NEGA kerak?
Hech bir dastur hisob-kitobsiz yoki solishtirishlarsiz ishlamaydi. Masalan, "Agar puli 100 dan ko'p bo'lsa" degan shartni yozish uchun bizga \`>\` operatori kerak bo'ladi.

## 2. SODDALIK (Analogiya)
Operatorlarni **asboblar qutisi** deb tasavvur qiling. Bolg'a (qo'shish) bilan biror narsani ulaymiz, arra (ayirish) bilan kesamiz, tarozi (solishtirish) bilan qaysi biri og'irligini aniqlaymiz.

## 3. STRUKTURA (Asosiy operatorlar)

### A. Arifmetik operatorlar
\`\`\`javascript
5 + 2; // 7 (qo'shish)
5 - 2; // 3 (ayirish)
5 * 2; // 10 (ko'paytirish)
5 / 2; // 2.5 (bo'lish)
5 % 2; // 1 (qoldiqni olish)
5 ** 2; // 25 (darajaga ko'tarish)
\`\`\`

### B. Solishtirish operatorlari
Bular doim \`true\` yoki \`false\` qaytaradi:
\`\`\`javascript
5 > 2;  // true
5 < 2;  // false
5 >= 5; // true
5 === 5; // true (qat'iy teng)
5 !== 3; // true (teng emas)
\`\`\`

### C. Mantiqiy operatorlar
Bir nechta shartni birlashtirish uchun:
- **&& (VA):** Ikkala tomon ham \`true\` bo'lishi shart.
- **|| (YOKI):** Bitta tomon \`true\` bo'lsa yetarli.
- **! (EMAS):** Qiymatni teskarisiga o'zgartiradi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let pul = 100;
let narx = 80;
let ochiq = true;

let sotibOladi = (pul >= narx) && ochiq;
console.log(sotibOladi); // true
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **= va === farqi:** \`=\` — qiymat berish uchun, \`===\` — solishtirish uchun!
2. **Qoldiq operatori (%):** Ko'pchilik buni foiz bilan adashtiradi. \`5 % 2\` — bu 5 ni 2 ga bo'lgandagi qoldiq (\`1\`) degani.

## 6. SAVOLLAR (12 ta)
1. Operator nima?
2. Arifmetik operatorlarni sanab bering.
3. \`%\` operatori nima vazifani bajaradi?
4. Solishtirish operatorlari natijasi qanday ma'lumot turida bo'ladi?
5. \`==\` va \`===\` farqi nima?
6. \`&&\` (VA) operatori qachon \`true\` qaytaradi?
7. \`||\` (YOKI) operatori qachon \`true\` qaytaradi?
8. \`!\` operatori nima qiladi?
9. \`5 ** 3\` natijasi nima bo'ladi?
10. \`"5" + 5\` natijasi nima?
11. \`"5" - 5\` natijasi nima?
12. Increment (\`++\`) va Decrement (\`--\`) nima?`,
  exercises: [
    {
      id: 1,
      title: "Matematik mashq",
      instruction: "10 ni 3 ga bo'lgandagi qoldiqni toping va 'rem' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet rem = ",
      hint: "let rem = 10 % 3;",
      test: "if (rem === 1) return null; return 'Qoldiq noto\\'g\\'ri topildi!';"
    }
  ]
};
