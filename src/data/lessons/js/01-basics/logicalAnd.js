export const logicalAnd = {
  id: "logicalAnd",
  title: "Mantiqiy VA (&&)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, kinoteatrga kirmoqchisiz. Eshikda ikkita shart yozilgan:
- Chipta bo'lishi kerak.
- Yosh 12 dan katta bo'lishi kerak.

Faqat bittasi bo'lsa, kirmaysiz. Ikkalasi ham bo'lsagina kirasiz. "VA" degani — ikkalasi ham shart.

Dasturlashda \`&&\` (mantiqiy VA) xuddi shu eshik nazoratchisiga o'xshaydi. Ikkala tomoni ham \`true\` bo'lsagina, natija \`true\` bo'ladi.

---

## 2. Nega kerak?

O'yinda sovrin bor. Qoida: ball 100 dan katta VA jonlar 0 dan ko'p bo'lishi kerak. Bitta shartning o'zi yetmaydi.

Muammo shunda: ikkita savolni bitta javobda birlashtirish kerak. Yechim — \`&&\`:

\`\`\`javascript
let ball = 120;
let jon = 3;
console.log(ball > 100 && jon > 0);
\`\`\`

Ikkalasi ham \`true\`. Shuning uchun natija \`true\`. Sovrin beriladi.

---

## 3. Birinchi misol

Bu kod ikkita to'g'ri shartni \`&&\` bilan birlashtiradi.

\`\`\`javascript
let hasTicket = true; // Chipta bor
let isOld = true; // Yoshi to'g'ri keladi
console.log(hasTicket && isOld); // true chiqadi
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let hasTicket = true;\` — birinchi shart tayyor: chipta bor.
- \`let isOld = true;\` — ikkinchi shart tayyor: yosh to'g'ri.
- \`hasTicket && isOld\` — savol: "ikkilasi ham to'g'rimi?" Ha va ha. Natija \`true\`.

---

## 5. Yana bitta misol

Bu kod bittasi noto'g'ri bo'lgan holatni ko'rsatadi.

\`\`\`javascript
let hasTicket = true; // Chipta bor
let isOld = false; // Yoshi to'g'ri kelmaydi
console.log(hasTicket && isOld); // false chiqadi
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

Qator-baqator tahlil:
- Birinchi shart \`true\`. Ikkinchi shart \`false\`.
- \`&&\` qoidasi qattiq: bittasi ham \`false\` bo'lsa, natija \`false\`.
- To'rt holatdan faqat bittasi \`true\` beradi: \`true && true\`. Qolgan uchtasi (\`true && false\`, \`false && true\`, \`false && false\`) — \`false\`.

---

## 5.1. Taqqoslash bilan birga

\`&&\` ko'pincha taqqoslash natijalarini birlashtiradi:

\`\`\`javascript
let age = 20;
console.log(age > 12 && age < 65); // true chiqadi
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

Qator-baqator tahlil:
- \`age > 12\` — \`true\`. \`age < 65\` — \`true\`.
- \`true && true\` — ikkalasi ham to'g'ri. Natija \`true\`.

---

## 6. Ko'p uchraydigan xatolar

### 1. Bitta & yozish
❌ Xato kod:
\`\`\`javascript
let r = true & true;
console.log(r);
\`\`\`
Nima bo'ladi: \`true\` emas, \`1\` chiqadi! Bitta \`&\` — mantiqiy operator emas. U boshqa hisob (bitli amal) bajaradi va son qaytaradi.
✅ To'g'ri variant:
\`\`\`javascript
let r = true && true; // true chiqadi
console.log(r);
\`\`\`

### 2. Oddiy so'z bilan yozish
❌ Xato kod:
\`\`\`javascript
let r = true and true;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'and'\` xatoligi yuz beradi. JavaScript inglizcha so'zlarni tushunmaydi. Faqat \`&&\` belgisi ishlaydi.
✅ To'g'ri variant:
\`\`\`javascript
let r = true && true;
console.log(r); // true chiqadi
\`\`\`

### 3. Bitta true ni yetarli deb o'ylash
❌ Xato tushuncha: \`true && false\` ham \`true\` beradi deb o'ylash.
Nima bo'ladi: konsolga \`false\` chiqadi. \`&&\` da bitta \`false\` butun natijani yiqitadi.
✅ To'g'ri variant:
\`\`\`javascript
console.log(true && true); // true chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`hasTicket\` (\`true\`) va \`isOld\` (\`true\`) yarating. \`&&\` bilan birlashtirib chiqaring (\`true\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`age\` ga \`20\` bering. \`age > 12 && age < 65\` ni chiqaring (\`true\` chiqishi kerak).

### 3-mashq (Chegara holat)
Uchta shartni birlashtiring: \`true && true && false\`. Natija \`false\` bo'lishini tasdiqlang.

### Javoblar:
1.
\`\`\`javascript
let hasTicket = true;
let isOld = true;
console.log(hasTicket && isOld);
\`\`\`
2.
\`\`\`javascript
let age = 20;
console.log(age > 12 && age < 65);
\`\`\`
3.
\`\`\`javascript
console.log(true && true && false);
\`\`\`

---

## 8. Xulosa

1. \`&&\` — mantiqiy VA. Ikkalasi ham \`true\` bo'lsagina natija \`true\`.
2. Bitta \`false\` yetadi — natija darhol \`false\` bo'ladi.
3. Bitta \`&\` boshqa operator (son qaytaradi). Har doim ikkita \`&&\` yoziladi.

Keyingi darsda: mantiqiy YOKI (||) operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Ikkita true",
      instruction: "`hasTicket` (`true`) va `isOld` (`true`) yarating. `&&` bilan chiqaring (`true` chiqishi kerak).",
      startingCode: "// hasTicket va isOld ni yarating va && bilan chiqaring\n",
      hint: "let hasTicket = true;\nlet isOld = true;\nconsole.log(hasTicket && isOld);",
      test: "if (!code.includes('&&')) return '&& operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Bitta false",
      instruction: "`a = true`, `b = false` berilgan. `a && b` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "let a = true;\nlet b = false;\n// a && b ni chiqaring\n",
      hint: "console.log(a && b);",
      test: "if (!code.includes('&&')) return '&& operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Taqqoslashlarni birlashtirish",
      instruction: "`age = 20` berilgan. `age > 12 && age < 65` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "let age = 20;\n// age > 12 && age < 65 ni chiqaring\n",
      hint: "console.log(age > 12 && age < 65);",
      test: "if (!code.includes('&&')) return '&& operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Bitta & xatosini tuzatish",
      instruction: "`true & true` o'rniga `&&` yozing: `true` (mantiqiy) chiqsin, `1` (son) emas.",
      startingCode: "console.log(true & true);\n",
      hint: "console.log(true && true);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true (boolean) konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "and so'zini tuzatish",
      instruction: "`true and true` xato bermoqda. `&&` bilan tuzating.",
      startingCode: "console.log(true and true);\n",
      hint: "console.log(true && true);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Tengliklarni birlashtirish",
      instruction: "`x = 5` berilgan. `x === 5 && x > 3` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "let x = 5;\n// x === 5 && x > 3 ni chiqaring\n",
      hint: "console.log(x === 5 && x > 3);",
      test: "if (!code.includes('&&') || !code.includes('===')) return '=== va && ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Ball va jon (chegara)",
      instruction: "`ball = 120`, `jon = 0` berilgan. `ball > 100 && jon > 0` ni chiqaring (`false` — jon tugagan).",
      startingCode: "let ball = 120;\nlet jon = 0;\n// ball > 100 && jon > 0 ni chiqaring\n",
      hint: "console.log(ball > 100 && jon > 0);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Uchta shart",
      instruction: "`true && true && false` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "// true && true && false ni chiqaring\n",
      hint: "console.log(true && true && false);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "To'rt holat jadvali (chegara)",
      instruction: "To'rttala holatni chiqaring: `true && true`, `true && false`, `false && true`, `false && false` (`true`, `false`, `false`, `false`).",
      startingCode: "// Tortala holatni chiqaring\n",
      hint: "console.log(true && true);\nconsole.log(true && false);\nconsole.log(false && true);\nconsole.log(false && false);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 4) return 'Tortala holat chiqishi kerak';\nif (out[0][0] !== true || out[1][0] !== false || out[2][0] !== false || out[3][0] !== false) return 'true, false, false, false chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "O'zgaruvchilar zanjiri (chegara)",
      instruction: "`a = true`, `b = true`, `c = false` berilgan. `a && b && c` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "let a = true;\nlet b = true;\nlet c = false;\n// a && b && c ni chiqaring\n",
      hint: "console.log(a && b && c);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(true && true);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "1",
        "Xatolik"
      ],
      correctAnswer: 0,
      explanation: "Ikkalasi ham true, shuning uchun natija true."
    },
    {
      id: 2,
      question: "`console.log(true && false);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "1",
        "0"
      ],
      correctAnswer: 1,
      explanation: "Bitta false butun natijani yiqitadi."
    },
    {
      id: 3,
      question: "`console.log(false && false);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi ham false. Natija false."
    },
    {
      id: 4,
      question: "`console.log(true & true);` nima chiqaradi?",
      options: [
        "true",
        "1",
        "false",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Bitta & mantiqiy operator emas. U son qaytaradi: 1."
    },
    {
      id: 5,
      question: "`let r = true and true;` qatorida nima bo'ladi?",
      options: [
        "true bo'ladi",
        "SyntaxError beradi",
        "false bo'ladi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript inglizcha so'zlarni tushunmaydi. Faqat && ishlaydi."
    },
    {
      id: 6,
      question: "`let age = 20; console.log(age > 12 && age < 65);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "20",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Ikkala taqqoslash ham true: true && true = true."
    },
    {
      id: 7,
      question: "Qachon && true beradi?",
      options: [
        "Bittasi true bo'lsa",
        "Ikkalasi ham true bo'lsa",
        "Bittasi false bo'lsa",
        "Har doim"
      ],
      correctAnswer: 1,
      explanation: "&& qattiq: faqat true && true true beradi."
    },
    {
      id: 8,
      question: "`console.log(false && true);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "1"
      ],
      correctAnswer: 1,
      explanation: "Birinchi tomoni false — natija darhol false."
    },
    {
      id: 9,
      question: "`let ball = 120; let jon = 0; console.log(ball > 100 && jon > 0);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "120",
        "0"
      ],
      correctAnswer: 1,
      explanation: "Birinchi true, ikkinchi false. Natija false."
    },
    {
      id: 10,
      question: "`console.log(true && true && false);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Oxirgi false butun zanjirni yiqitadi."
    },
    {
      id: 11,
      question: "`let x = 5; console.log(x === 5 && x > 3);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi ham true: true && true = true."
    },
    {
      id: 12,
      question: "Mantiqiy VA belgisi qaysi?",
      options: [
        "&",
        "&&",
        "and",
        "++"
      ],
      correctAnswer: 1,
      explanation: "Faqat ikkita && mantiqiy VA. Bitta & boshqa operator."
    }
  ]
};
