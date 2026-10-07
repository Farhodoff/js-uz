export const operators = {
  id: "operators",
  title: "Arifmetik Operatorlar (+, -, *, /, %, **)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, qo'lingizda oddiy kalkulyator bor. Unda raqamlardan tashqari maxsus tugmalar bor: \`+\` (qo'shish), \`-\` (ayirish), \`×\` (ko'paytirish), \`÷\` (bo'lish). Tugmani bossangiz, kalkulyator hisoblab beradi.

Dasturlashda ham sonlar bilan hisoblash uchun maxsus belgilar bor. Faqat ko'paytirish \`*\` (yulduzcha), bo'lish \`/\` (qiya chiziq) bilan yoziladi.

Arifmetik operatorlar — sonlar ustida matematik amallar (qo'shish, ayirish, ko'paytirish, bo'lish) bajaradigan belgilardir.

---

## 2. Nega kerak?

Do'konda xarid qildingiz: 3 ta non (har biri 5000) va 2 ta sut (har biri 8000). Jami summani qo'lda hisoblash mumkin. Lekin dasturda narxlar o'zgarib turadi. Har safar qo'lda hisoblab bo'lmaydi.

Muammo shunda: sonlar ustida hisob-kitob kodning o'zida bajarilishi kerak. Yechim — arifmetik operatorlar:

\`\`\`javascript
let total = 3 * 5000 + 2 * 8000; // Jami summa
console.log(total);
\`\`\`

Bitta qatorda butun hisob tayyor.

---

## 3. Birinchi misol

Bu kod ikkita sonni qo'shadi va natijani konsolga chiqaradi.

\`\`\`javascript
let total = 10 + 5; // Qo'shish: 15 bo'ladi
console.log(total); // 15 chiqadi
\`\`\`

\`\`\`text
// Natija: 15
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let total = 10 + 5;\` — \`+\` operatori o'ng va chap tarafdagi sonlarni qo'shdi. Natija (\`15\`) \`total\` ga saqlandi.
- \`// Qo'shish: 15 bo'ladi\` — izoh. Qator nima hisoblashini tushuntiradi.
- \`console.log(total);\` — konsolga \`15\` chiqadi.

---

## 5. Yana bitta misol

Bu kod ko'paytirish va bo'lish amallarini bajaradi.

\`\`\`javascript
let price = 6 * 7; // Ko'paytirish: 42 bo'ladi
let part = 20 / 4; // Bo'lish: 5 bo'ladi
console.log(price); // 42 chiqadi
console.log(part); // 5 chiqadi
\`\`\`

\`\`\`text
// Natija:
42
5
\`\`\`

Qator-baqator tahlil:
- \`6 * 7\` — yulduzcha (\`*\`) ko'paytirish belgisi. Natija \`42\`.
- \`20 / 4\` — qiya chiziq (\`/\`) bo'lish belgisi. Natija \`5\`.
- Ayirish ham shu naqshda: \`10 - 4\` yozilsa, natija \`6\` bo'ladi.

---

## 5.1. Qoldiq va daraja

Ikkita qo'shimcha operator bor. Ular kamroq ishlatiladi, lekin kerak bo'ladi.

\`\`\`javascript
let left = 10 % 3; // Qoldiq: 1 bo'ladi
let power = 2 ** 3; // Daraja: 8 bo'ladi
console.log(left); // 1 chiqadi
console.log(power); // 8 chiqadi
\`\`\`

\`\`\`text
// Natija:
1
8
\`\`\`

Qator-baqator tahlil:
- \`10 % 3\` — foiz belgisi (\`%\`) qoldiqni hisoblaydi. \`10\` ni \`3\` ga bo'lganda \`1\` ortib qoladi.
- \`2 ** 3\` — ikkita yulduzcha (\`**\`) darajaga ko'taradi. \`2 * 2 * 2 = 8\`.

---

## 6. Ko'p uchraydigan xatolar

### 1. Ko'paytirish uchun x harfini ishlatish
❌ Xato kod:
\`\`\`javascript
let area = 5 x 10;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'x'\` xatoligi yuz beradi. Matematikadagi \`×\` yoki \`x\` harfi JavaScript'da ishlamaydi. Faqat yulduzcha (\`*\`) ishlatiladi.
✅ To'g'ri variant:
\`\`\`javascript
let area = 5 * 10; // 50 bo'ladi
console.log(area);
\`\`\`

### 2. Matn bilan sonni qo'shib yuborish
❌ Xato kod:
\`\`\`javascript
let total = "10" + 5;
console.log(total);
\`\`\`
Nima bo'ladi: \`15\` emas, \`"105"\` matni chiqadi. Sababi: \`+\` ning bir tomoni matn bo'lsa, JavaScript qo'shmaydi — yonma-yon ulaydi.
✅ To'g'ri variant:
\`\`\`javascript
let total = Number("10") + 5; // Avval songa aylantiriladi
console.log(total); // 15 chiqadi
\`\`\`

### 3. Bo'linmani butun son deb o'ylash
❌ Xato tushuncha:
\`\`\`javascript
let part = 7 / 2; // 3 chiqadi deb o'ylash
\`\`\`
Nima bo'ladi: konsolga \`3\` emas, \`3.5\` chiqadi. JavaScript bo'linmani yaxlitlamaydi. Qoldiq tashlab ketilmaydi.
✅ To'g'ri tushuncha:
\`\`\`javascript
let part = 7 / 2;
console.log(part); // 3.5 chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`apples\` ga \`12\`, \`oranges\` ga \`8\` bering. Yig'indini \`totalFruits\` ga saqlang va chiqaring.

### 2-mashq (O'rtacha)
\`width\` (\`5\`) va \`height\` (\`4\`) yarating. Ko'paytmani \`area\` ga saqlang va chiqaring.

### 3-mashq (Chegara holat)
\`17\` ni \`5\` ga bo'lgandagi qoldiqni hisoblang. \`remainder\` ga saqlang va chiqaring (\`2\` chiqishi kerak).

### Javoblar:
1.
\`\`\`javascript
let apples = 12;
let oranges = 8;
let totalFruits = apples + oranges;
console.log(totalFruits);
\`\`\`
2.
\`\`\`javascript
let width = 5;
let height = 4;
let area = width * height;
console.log(area);
\`\`\`
3.
\`\`\`javascript
let remainder = 17 % 5;
console.log(remainder);
\`\`\`

---

## 8. Xulosa

1. Asosiy operatorlar: \`+\` (qo'shish), \`-\` (ayirish), \`*\` (ko'paytirish), \`/\` (bo'lish).
2. \`%\` qoldiqni hisoblaydi, \`**\` darajaga ko'taradi.
3. \`+\` ning bir tomoni matn bo'lsa, qo'shish emas — ulash sodir bo'ladi.

Keyingi darsda: qiymatni qisqa yozish operatorlari (\`+=\`, \`-=\` va boshqalar) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Yig'indini hisoblash",
      instruction: "`apples` (`12`) va `oranges` (`8`) yarating. Yig'indini `totalFruits` ga saqlang va `console.log(totalFruits);` orqali chiqaring.",
      startingCode: "let apples = 12;\nlet oranges = 8;\n// totalFruits ga yig'indini saqlang va chiqaring\n",
      hint: "let totalFruits = apples + oranges;\nconsole.log(totalFruits);",
      test: "if (!code.includes('+')) return '+ operatori ishlatilmadi';\nif (!code.includes('totalFruits')) return 'totalFruits topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '20')) return null;\nreturn '20 soni konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Ayirmani hisoblash",
      instruction: "`a = 10`, `b = 4` berilgan. Ayirmani `diff` ga saqlang va chiqaring (`6` chiqishi kerak).",
      startingCode: "let a = 10;\nlet b = 4;\n// diff ga ayirmani saqlang va chiqaring\n",
      hint: "let diff = a - b;\nconsole.log(diff);",
      test: "if (!code.includes('-')) return '- operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '6')) return null;\nreturn '6 soni konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Ko'paytmani hisoblash",
      instruction: "`width` (`5`) va `height` (`4`) yarating. Ko'paytmani `area` ga saqlang va chiqaring (`20` chiqishi kerak).",
      startingCode: "let width = 5;\nlet height = 4;\n// area ga ko'paytmani saqlang va chiqaring\n",
      hint: "let area = width * height;\nconsole.log(area);",
      test: "if (!code.includes('*')) return '* operatori ishlatilmadi';\nif (!code.includes('area')) return 'area topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '20')) return null;\nreturn '20 soni konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Bo'linmani hisoblash",
      instruction: "`total = 20`, `parts = 4` berilgan. Bo'linmani `share` ga saqlang va chiqaring (`5` chiqishi kerak).",
      startingCode: "let total = 20;\nlet parts = 4;\n// share ga bo'linmani saqlang va chiqaring\n",
      hint: "let share = total / parts;\nconsole.log(share);",
      test: "if (!code.includes('/')) return '/ operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 soni konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Qoldiqni topish",
      instruction: "`17 % 5` ni hisoblab, `remainder` ga saqlang va chiqaring (`2` chiqishi kerak).",
      startingCode: "// remainder ga 17 % 5 ni saqlang va chiqaring\n",
      hint: "let remainder = 17 % 5;\nconsole.log(remainder);",
      test: "if (!code.includes('%')) return '% operatori ishlatilmadi';\nif (!code.includes('remainder')) return 'remainder topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2')) return null;\nreturn '2 konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Darajani hisoblash",
      instruction: "`2 ** 4` ni hisoblab, `power` ga saqlang va chiqaring (`16` chiqishi kerak).",
      startingCode: "// power ga 2 ** 4 ni saqlang va chiqaring\n",
      hint: "let power = 2 ** 4;\nconsole.log(power);",
      test: "if (!code.includes('**')) return '** operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '16')) return null;\nreturn '16 konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "x harf xatosini tuzatish",
      instruction: "`let area = 5 x 10;` xato bermoqda. `*` bilan tuzating: `50` chiqsin.",
      startingCode: "let area = 5 x 10;\nconsole.log(area);\n",
      hint: "x o'rniga * yozing.",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '50')) return null;\nreturn '50 konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Matn tuzog'ini tuzatish",
      instruction: "`let total = \"10\" + 5;` natijasi `\"105\"` bo'lmoqda. `Number()` bilan tuzating: `15` chiqsin.",
      startingCode: "let total = \"10\" + 5;\nconsole.log(total);\n",
      hint: "let total = Number(\"10\") + 5;",
      test: "if (!code.includes('Number(')) return 'Number() bilan songa aylantiring';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '15')) return null;\nreturn '15 konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Kasr bo'linma (chegara)",
      instruction: "`7 / 2` ni hisoblab, `half` ga saqlang va chiqaring. Esda tuting: natija `3` emas, `3.5` bo'ladi.",
      startingCode: "// half ga 7 / 2 ni saqlang va chiqaring\n",
      hint: "let half = 7 / 2;\nconsole.log(half);",
      test: "if (!code.includes('/')) return '/ operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '3.5')) return null;\nreturn '3.5 konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Aralash hisob (chegara)",
      instruction: "`a = 10`, `b = 3`, `c = 2` berilgan. `a + b * c` ni hisoblab, `res` ga saqlang va chiqaring (`16` chiqishi kerak: avval ko'paytirish bajariladi).",
      startingCode: "let a = 10;\nlet b = 3;\nlet c = 2;\n// res ga a + b * c ni saqlang va chiqaring\n",
      hint: "let res = a + b * c;\nconsole.log(res);",
      test: "if (!code.includes('+') || !code.includes('*')) return '+ va * operatorlari kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '16')) return null;\nreturn '16 konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(10 + 5);` nima chiqaradi?",
      options: [
        "105",
        "15",
        "10",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "+ operatori ikkita sonni qo'shadi: 10 + 5 = 15."
    },
    {
      id: 2,
      question: "Ko'paytirish belgisi qaysi?",
      options: [
        "x",
        "*",
        "×",
        "#"
      ],
      correctAnswer: 1,
      explanation: "JavaScript'da ko'paytirish faqat yulduzcha (*) bilan yoziladi."
    },
    {
      id: 3,
      question: "`console.log(20 / 4);` nima chiqaradi?",
      options: [
        "24",
        "16",
        "5",
        "4"
      ],
      correctAnswer: 2,
      explanation: "/ belgisi bo'lish amalidir: 20 / 4 = 5."
    },
    {
      id: 4,
      question: "`%` operatori nima qiladi?",
      options: [
        "Foizni hisoblaydi",
        "Bo'linmaning qoldig'ini topadi",
        "Sonni 100 ga ko'paytiradi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "% (modulus) bo'linmaning qoldig'ini hisoblaydi. Masalan: 10 % 3 = 1."
    },
    {
      id: 5,
      question: "`console.log(2 ** 3);` nima chiqaradi?",
      options: [
        "6",
        "8",
        "5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "** darajaga ko'taradi: 2 * 2 * 2 = 8."
    },
    {
      id: 6,
      question: "`let area = 5 x 10;` qatorida nima bo'ladi?",
      options: [
        "50 chiqadi",
        "SyntaxError: Unexpected identifier 'x'",
        "510 chiqadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "x harfi operator emas. Ko'paytirish faqat * bilan yoziladi."
    },
    {
      id: 7,
      question: "`console.log(\"10\" + 5);` nima chiqaradi?",
      options: [
        "15",
        "\"105\" (matn)",
        "105 (son)",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "+ ning bir tomoni matn bo'lsa, ulash sodir bo'ladi: \"10\" + 5 = \"105\"."
    },
    {
      id: 8,
      question: "`console.log(7 / 2);` nima chiqaradi?",
      options: [
        "3",
        "3.5",
        "4",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "JavaScript bo'linmani yaxlitlamaydi: 7 / 2 = 3.5."
    },
    {
      id: 9,
      question: "`console.log(10 - 4);` nima chiqaradi?",
      options: [
        "14",
        "6",
        "104",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "- operatori ayirish amalidir: 10 - 4 = 6."
    },
    {
      id: 10,
      question: "`console.log(17 % 5);` nima chiqaradi?",
      options: [
        "3",
        "2",
        "3.4",
        "12"
      ],
      correctAnswer: 1,
      explanation: "17 ni 5 ga bo'lganda 2 ortib qoladi: 17 % 5 = 2."
    },
    {
      id: 11,
      question: "Sonni matndan ajratib olish uchun avval nima qilish kerak?",
      options: [
        "Hech narsa, to'g'ridan-to'g'ri qo'shish",
        "Number() bilan songa aylantirish",
        "Qo'shtirnoq qo'shish",
        "Bo'sh joy qoldirish"
      ],
      correctAnswer: 1,
      explanation: "\"10\" + 5 = \"105\" bo'ladi. Avval Number(\"10\") bilan songa aylantirish kerak."
    },
    {
      id: 12,
      question: "`let r = 2 ** 4; console.log(r);` nima chiqaradi?",
      options: [
        "8",
        "16",
        "6",
        "24"
      ],
      correctAnswer: 1,
      explanation: "2 ** 4 = 2 * 2 * 2 * 2 = 16."
    }
  ]
};
