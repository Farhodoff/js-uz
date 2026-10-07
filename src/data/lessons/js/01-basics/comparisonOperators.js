export const comparisonOperators = {
  id: "comparisonOperators",
  title: "Taqqoslash Operatorlari (>, <, >=, <=)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, attraksion kirish joyidasiz. Nazoratchi bo'yingizni o'lchaydi: "120 dan balandmi?" Javob faqat ikki xil: Ha yoki Yo'q.

Dasturlashda ham ikki sonni solishtirish kerak bo'ladi. Natija har doim mantiqiy qiymat: \`true\` (ha) yoki \`false\` (yo'q).

Taqqoslash operatorlari (\`>\`, \`<\`, \`>=\`, \`<=\`) — ikki qiymatni solishtirib, \`true\` yoki \`false\` qaytaradigan belgilardir.

---

## 2. Nega kerak?

O'yinda qoida bor: 12 yoshdan kattalar kiradi. Dastur yoshni tekshirishi kerak:

\`\`\`javascript
let age = 14;
console.log(age > 12);
\`\`\`

Konsolga \`true\` chiqsa — kiradi. \`false\` chiqsa — kirmaydi.

Muammo shunda: solishtirmasdan turib, dastur qaror qabul qilolmaydi. Yechim — taqqoslash operatorlari. Ular savol beradi, JavaScript javob qaytaradi.

---

## 3. Birinchi misol

Bu kod yosh chegarasini tekshiradi va natijani konsolga chiqaradi.

\`\`\`javascript
let age = 14; // Foydalanuvchi yoshi
console.log(age > 12); // true chiqadi
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let age = 14;\` — \`age\` ga \`14\` soni berildi.
- \`age > 12\` — savol: "14 o'n ikkidan kattami?" Javob ha. Shuning uchun natija \`true\`.
- \`console.log(age > 12);\` — savolning javobi (\`true\`) konsolga chiqadi.

---

## 5. Yana bitta misol

Bu kod uchta turli taqqoslashni yonma-yon ko'rsatadi.

\`\`\`javascript
let score = 90; // Ball
console.log(score < 100); // true chiqadi
console.log(score >= 90); // true chiqadi
console.log(score <= 80); // false chiqadi
\`\`\`

\`\`\`text
// Natija:
true
true
false
\`\`\`

Qator-baqator tahlil:
- \`score < 100\` — "90 yuzdan kichikmi?" Ha. Natija \`true\`.
- \`score >= 90\` — "90 to'qsondan katta yoki tengmi?" Teng. Natija \`true\`.
- \`score <= 80\` — "90 saksondan kichik yoki tengmi?" Yo'q. Natija \`false\`.

---

## 5.1. Tenglik chizig'i qoidasi

\`>=\` va \`<=\` belgilarida ikkinchi chiziq "tenglik" degani. Chegaraning o'zi ham hisobga kiradi:

\`\`\`javascript
console.log(10 >= 10); // true chiqadi
console.log(10 > 10); // false chiqadi
\`\`\`

\`\`\`text
// Natija:
true
false
\`\`\`

Qator-baqator tahlil:
- \`10 >= 10\` — "katta YOKI teng". Tenglik bor. Natija \`true\`.
- \`10 > 10\` — "faqat katta". Tenglik yo'q. Natija \`false\`.

---

## 6. Ko'p uchraydigan xatolar

### 1. Belgilarni teskari yozish
❌ Xato kod:
\`\`\`javascript
let r = 5 =< 10;
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid left-hand side in assignment\` xatoligi yuz beradi. Katta-kichik belgisi har doim BIRINCHI, tenglik chizig'i KEYIN keladi: \`>=\`, \`<=\`.
✅ To'g'ri variant:
\`\`\`javascript
let r = 5 <= 10; // true bo'ladi
console.log(r);
\`\`\`

### 2. Natijani son deb o'ylash
❌ Xato tushuncha:
\`\`\`javascript
let r = 8 > 5; // r ga 8 yoki 5 yoziladi deb o'ylash
\`\`\`
Nima bo'ladi: \`r\` ga son yozilmaydi. Taqqoslash natijasi har doim mantiqiy qiymat. \`r\` ga \`true\` yoziladi.
✅ To'g'ri tushuncha:
\`\`\`javascript
let r = 8 > 5;
console.log(r); // true chiqadi
console.log(typeof r); // boolean chiqadi
\`\`\`

### 3. Chegarani unutish
❌ Xato tushuncha: \`10 > 10\` ham \`true\` beradi deb o'ylash.
Nima bo'ladi: konsolga \`false\` chiqadi. \`>\` faqat "katta" degani. Tenglik kirmaydi. Tenglik kerak bo'lsa, \`>=\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
console.log(10 >= 10); // true chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`age\` ga \`20\` bering. \`age > 18\` ni konsolga chiqaring (\`true\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`temp\` ga \`36\` bering. Ikkita tekshiruv chiqaring: \`temp < 40\` (\`true\`) va \`temp >= 37\` (\`false\`).

### 3-mashq (Chegara holat)
\`score\` ga \`90\` bering. \`score >= 90\` ni chiqaring. Tenglik chizig'i ishlashi uchun natija \`true\` bo'lishi kerak.

### Javoblar:
1.
\`\`\`javascript
let age = 20;
console.log(age > 18);
\`\`\`
2.
\`\`\`javascript
let temp = 36;
console.log(temp < 40);
console.log(temp >= 37);
\`\`\`
3.
\`\`\`javascript
let score = 90;
console.log(score >= 90);
\`\`\`

---

## 8. Xulosa

1. \`>\` (katta), \`<\` (kichik), \`>=\` (katta yoki teng), \`<=\` (kichik yoki teng) — solishtirish belgilari.
2. Natija har doim \`true\` yoki \`false\` bo'ladi. Son chiqmaydi.
3. Tenglik chizig'i (\`=\`) har doim oxirida keladi: \`>=\`, \`<=\`.

Keyingi darsda: tenglikni tekshiradigan \`==\` va \`===\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Kattalikni tekshirish",
      instruction: "`age` ga `20` bering. `age > 18` ni konsolga chiqaring (`true` chiqishi kerak).",
      startingCode: "let age = 20;\n// age > 18 ni chiqaring\n",
      hint: "console.log(age > 18);",
      test: "if (!code.includes('>')) return '> operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Kichiklikni tekshirish",
      instruction: "`temp` ga `36` bering. `temp < 40` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "let temp = 36;\n// temp < 40 ni chiqaring\n",
      hint: "console.log(temp < 40);",
      test: "if (!code.includes('<')) return '< operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Tenglik chizig'i",
      instruction: "`score` ga `90` bering. `score >= 90` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "let score = 90;\n// score >= 90 ni chiqaring\n",
      hint: "console.log(score >= 90);",
      test: "if (!code.includes('>=')) return '>= operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "False natija",
      instruction: "`score` ga `70` bering. `score <= 60` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "let score = 70;\n// score <= 60 ni chiqaring\n",
      hint: "console.log(score <= 60);",
      test: "if (!code.includes('<=')) return '<= operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Teskari belgi xatosini tuzatish",
      instruction: "`let r = 5 =< 10;` xato bermoqda. Belgilarni to'g'ri tartibda yozing: `true` chiqsin.",
      startingCode: "let r = 5 =< 10;\nconsole.log(r);\n",
      hint: "let r = 5 <= 10;",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Natija turini isbotlash",
      instruction: "`r = 8 > 5` berilgan. Avval `r` ni, keyin `typeof r` ni chiqaring (`true` va `boolean`).",
      startingCode: "let r = 8 > 5;\n// r ni va typeof r ni chiqaring\n",
      hint: "console.log(r);\nconsole.log(typeof r);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkita qiymat chiqaring';\nif (out[0].trim() !== 'true' || out[1].trim() !== 'boolean') return 'true va boolean chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "Chegara farqi",
      instruction: "`10 > 10` va `10 >= 10` ni ikkita qatorda chiqaring (`false` va `true`).",
      startingCode: "// 10 > 10 va 10 >= 10 ni chiqaring\n",
      hint: "console.log(10 > 10);\nconsole.log(10 >= 10);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkita qiymat chiqaring';\nif (out[0][0] !== false || out[1][0] !== true) return 'false va true chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "Yosh chegarasi",
      instruction: "`age = 16` berilgan. `age >= 18` ni chiqaring (`false` chiqishi kerak — 16 kichik).",
      startingCode: "let age = 16;\n// age >= 18 ni chiqaring\n",
      hint: "console.log(age >= 18);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Uchta solishtirish (chegara)",
      instruction: "`n = 50` berilgan. `n > 100`, `n < 100`, `n <= 50` ni chiqaring (`false`, `true`, `true`).",
      startingCode: "let n = 50;\n// Uchala solishtirishni chiqaring\n",
      hint: "console.log(n > 100);\nconsole.log(n < 100);\nconsole.log(n <= 50);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 3) return 'Uchala qiymat chiqishi kerak';\nif (out[0][0] !== false || out[1][0] !== true || out[2][0] !== true) return 'false, true, true chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "O'zgaruvchilar orasida (chegara)",
      instruction: "`a = 7`, `b = 7` berilgan. `a >= b` va `a > b` ni chiqaring (`true` va `false`).",
      startingCode: "let a = 7;\nlet b = 7;\n// a >= b va a > b ni chiqaring\n",
      hint: "console.log(a >= b);\nconsole.log(a > b);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkita qiymat chiqaring';\nif (out[0][0] !== true || out[1][0] !== false) return 'true va false chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(14 > 12);` nima chiqaradi?",
      options: [
        "14",
        "true",
        "12",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "> katta degani: 14 o'n ikkidan katta, shuning uchun true."
    },
    {
      id: 2,
      question: "Taqqoslash natijasi har doim qanday bo'ladi?",
      options: [
        "Son",
        "true yoki false",
        "Matn",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Taqqoslash savol beradi, javob har doim mantiqiy qiymat."
    },
    {
      id: 3,
      question: "`console.log(90 <= 80);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "90",
        "80"
      ],
      correctAnswer: 1,
      explanation: "90 saksondan kichik ham, teng ham emas. Javob false."
    },
    {
      id: 4,
      question: "`console.log(10 >= 10);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "10",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: ">= da tenglik bor. 10 teng 10, shuning uchun true."
    },
    {
      id: 5,
      question: "`console.log(10 > 10);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "10",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "> faqat katta degani. Tenglik kirmaydi, shuning uchun false."
    },
    {
      id: 6,
      question: "`let r = 5 =< 10;` qatorida nima bo'ladi?",
      options: [
        "true bo'ladi",
        "SyntaxError beradi",
        "false bo'ladi",
        "5 bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Belgi tartibi xato. To'g'risi: 5 <= 10."
    },
    {
      id: 7,
      question: "`let r = 8 > 5;` da `r` ning qiymati nima?",
      options: [
        "8",
        "true",
        "5",
        "Son emas"
      ],
      correctAnswer: 1,
      explanation: "Taqqoslash natijasi saqlanadi: 8 > 5 true, shuning uchun r true."
    },
    {
      id: 8,
      question: "Qaysi belgi 'kichik yoki teng' degani?",
      options: [
        "=>",
        "=<",
        "<=",
        "<"
      ],
      correctAnswer: 2,
      explanation: "<= kichik yoki teng. Tenglik chizig'i oxirida keladi."
    },
    {
      id: 9,
      question: "`console.log(36 < 40);` nima chiqaradi?",
      options: [
        "36",
        "true",
        "false",
        "40"
      ],
      correctAnswer: 1,
      explanation: "36 qirqdan kichik, shuning uchun true."
    },
    {
      id: 10,
      question: "`console.log(36 >= 37);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "36",
        "37"
      ],
      correctAnswer: 1,
      explanation: "36 na katta 37 dan, na teng. Javob false."
    },
    {
      id: 11,
      question: "`let a = 7; let b = 7; console.log(a > b);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "7",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "7 o'ziga teng, lekin katta emas. Javob false."
    },
    {
      id: 12,
      question: "Chegarani ham qo'shish uchun qaysi belgi kerak?",
      options: [
        ">",
        "<",
        ">=",
        "="
      ],
      correctAnswer: 2,
      explanation: ">= katta YOKI teng degani. Bitta = esa o'zlashtirish belgisi."
    }
  ]
};
