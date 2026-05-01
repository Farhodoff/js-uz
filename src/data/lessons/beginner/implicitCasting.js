export const implicitCasting = {
  id: "b19",
  title: "Implicit Type Casting (Avtomatik o'zgarishlar)",
  theory: `## 1. KIRISH
**Implicit Type Casting** (yoki **Coercion**) – JavaScriptning o‘zining operatorlar va kontekstga qarab, qiymatlarni bir turdan boshqasiga **avtomatik** o‘zgartirishi. Bu dasturchi aralashuvisiz sodir bo‘ladi.

Explicit Casting dan farqi – bu yerda **siz hech qanday funksiya (\`Number()\`, \`String()\` va h.k.) chaqirmaysiz**, JavaScript o‘zi kerakli deb hisoblagan joyda o‘zgartiradi.

---

## 2. STRING GA AVTOMATIK O'ZGARISH
\`+\` operatori, agar operandlardan **birortasi string** bo‘lsa, ikkinchisini ham stringga o‘giradi va **konkatenatsiya** qiladi.

\`\`\`javascript
console.log("10" + 5);     // "105"
console.log(1 + 2 + "3");  // "33" (1+2=3, 3+"3"="33")
\`\`\`

**Qoida:** Agar \`+\` ning **istalgan** tomonida string bo‘lsa – natija string.

---

## 3. NUMBER GA AVTOMATIK O'ZGARISH
\`-\`, \`*\`, \`/\`, \`%\` operatorlari (qo‘shishdan tashqari) operandlarni **avtomatik number** ga o‘giradi.

\`\`\`javascript
console.log("10" - 5);     // 5
console.log("10" * "2");   // 20
console.log("10" - true);  // 9 (true → 1)
console.log(+"10");        // 10 (Unary plus)
\`\`\`

---

## 4. TAQQOSLASHDA COERCION (\`==\` vs \`===\`)
- \`==\` (Abstract equality) – tiplarni solishtirishdan oldin **avtomatik o‘zgartiradi**.
- \`===\` (Strict equality) – hech qanday conversion qilmaydi.

\`\`\`javascript
console.log(5 == "5");       // true
console.log(null == undefined); // true (Maxsus qoida)
console.log([] == 0);        // true ([] → "" → 0)
\`\`\`

---

## 5. INTERVYU SAVOLLARI (Junior & Middle)

### Nazariy (Junior)
1. **Implicit casting nima?** - JSning kontekstga qarab qiymatlarni avtomatik o'zgartirishi.
2. **Nima uchun \`[] == ![]\` true?** - \`![]\` false bo'ladi. \`[]\` bo'sh stringga (""), u esa 0 ga aylanadi. \`0 == 0\` natija true.

### Amaliy (Middle) ⭐
**Savol:** \`console.log(1 < 2 < 3)\` va \`console.log(3 > 2 > 1)\` natijasi nima?
**Javob:** Birinchisi \`true\`, ikkinchisi \`false\`.
Tushuntirish: \`3 > 2\` true (1) beradi. Keyin \`1 > 1\` tekshiriladi va false chiqadi.
`,
  exercises: [
    {
      id: 1,
      title: "Coercion jumboqlari",
      instruction: "Quyidagi ifodalarni consolega chiqaring va natijani ko'ring: '5' + 3, '5' - 3, true + true",
      startingCode: "// Natijalarni ko'ring\nconsole.log('5' + 3);\nconsole.log('5' - 3);\nconsole.log(true + true);",
      hint: "+ matnga, - songa aylantiradi. true = 1.",
      test: "if (logs.includes('53') && logs.includes('2') && logs.includes('2')) return null; return 'Barcha natijalar to\\'g\\'ri chiqishi kerak';"
    },
    {
      id: 2,
      title: "Abstract Equality",
      instruction: "Bo'sh massiv [] ni 0 bilan '==' orqali solishtiring va natijani ko'ring.",
      startingCode: "// [] == 0\n",
      hint: "console.log([] == 0);",
      test: "if (logs.includes('true')) return null; return 'true chiqishi kerak';"
    },
    {
      id: 3,
      title: "Short-circuit evaluation",
      instruction: "'&&' va '||' operatorlarini ishlating. 1 && 0 nima beradi? 0 || 'default' nima beradi?",
      startingCode: "console.log(1 && 0);\nconsole.log(0 || 'default');",
      hint: "&& birinchi falsy-ni, || birinchi truthy-ni qaytaradi.",
      test: "if (logs.includes('0') && logs.includes('default')) return null; return 'Natijalar noto\\'g\\'ri';"
    }
  ]
};
