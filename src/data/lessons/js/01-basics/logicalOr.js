export const logicalOr = {
  id: "logicalOr",
  title: "Mantiqiy YOKI (||)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, muzeyga kirmoqchisiz. Eshikda shart yozilgan:
- Talabalik guvohnomasi bo'lsa kiradi.
- YOKI nafaqa daftarchasi bo'lsa kiradi.

Bittasi bo'lsa yetadi. Ikkalasi ham bo'lmasa — kirmaydi. "YOKI" degani — bittasi yetadi.

Dasturlashda \`||\` (mantiqiy YOKI) xuddi shu eshik nazoratchisiga o'xshaydi. Tomonlardan bittasi ham \`true\` bo'lsa, natija \`true\` bo'ladi.

---

## 2. Nega kerak?

O'yinda bonus bor. Qoida: ball 100 dan katta YOKI maxsus kalit topilgan bo'lsa, bonus beriladi. Bitta shartning o'zi yetadi.

Muammo shunda: ikkita savoldan bittasi to'g'ri bo'lsa ham, javob "ha" bo'lishi kerak. Yechim — \`||\`:

\`\`\`javascript
let ball = 120;
let hasKey = false;
console.log(ball > 100 || hasKey);
\`\`\`

Birinchi shart \`true\`. Shuning uchun natija \`true\`. Bonus beriladi.

---

## 3. Birinchi misol

Bu kod bittasi to'g'ri bo'lgan holatni \`||\` bilan birlashtiradi.

\`\`\`javascript
let hasCard = true; // Guvohnoma bor
let hasBook = false; // Daftarcha yo'q
console.log(hasCard || hasBook); // true chiqadi
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let hasCard = true;\` — birinchi shart tayyor: guvohnoma bor.
- \`let hasBook = false;\` — ikkinchi shart tayyor emas: daftarcha yo'q.
- \`hasCard || hasBook\` — savol: "bittasi ham to'g'rimi?" Ha, birinchisi to'g'ri. Natija \`true\`.

---

## 5. Yana bitta misol

Bu kod ikkalasi ham noto'g'ri bo'lgan holatni ko'rsatadi.

\`\`\`javascript
let hasCard = false; // Guvohnoma yo'q
let hasBook = false; // Daftarcha yo'q
console.log(hasCard || hasBook); // false chiqadi
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

Qator-baqator tahlil:
- Birinchi shart \`false\`. Ikkinchi shart \`false\`.
- \`||\` qoidasi: bittasi ham \`true\` bo'lmasa, natija \`false\`.
- To'rt holatdan uchtasi \`true\` beradi: \`true || true\`, \`true || false\`, \`false || true\`. Faqat \`false || false\` — \`false\`.

---

## 5.1. Taqqoslash bilan birga

\`||\` ko'pincha taqqoslash natijalarini birlashtiradi:

\`\`\`javascript
let age = 10;
console.log(age < 12 || age > 65); // true chiqadi
\`\`\`

\`\`\`text
// Natija: true
\`\`\`

Qator-baqator tahlil:
- \`age < 12\` — \`true\`. \`age > 65\` — \`false\`.
- \`true || false\` — bittasi to'g'ri. Natija \`true\`.

---

## 6. Ko'p uchraydigan xatolar

### 1. Bitta | yozish
❌ Xato kod:
\`\`\`javascript
let r = true | false;
console.log(r);
\`\`\`
Nima bo'ladi: \`true\` emas, \`1\` chiqadi! Bitta \`|\` — mantiqiy operator emas. U boshqa hisob (bitli amal) bajaradi va son qaytaradi.
✅ To'g'ri variant:
\`\`\`javascript
let r = true || false; // true chiqadi
console.log(r);
\`\`\`

### 2. Oddiy so'z bilan yozish
❌ Xato kod:
\`\`\`javascript
let r = true or false;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'or'\` xatoligi yuz beradi. JavaScript inglizcha so'zlarni tushunmaydi. Faqat \`||\` belgisi ishlaydi.
✅ To'g'ri variant:
\`\`\`javascript
let r = true || false;
console.log(r); // true chiqadi
\`\`\`

### 3. Ikkalasi false da true kutish
❌ Xato tushuncha: \`false || false\` ham \`true\` beradi deb o'ylash.
Nima bo'ladi: konsolga \`false\` chiqadi. \`||\` da kamida bitta \`true\` bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
console.log(false || false); // false chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`hasCard\` (\`true\`) va \`hasBook\` (\`false\`) yarating. \`||\` bilan birlashtirib chiqaring (\`true\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`age\` ga \`10\` bering. \`age < 12 || age > 65\` ni chiqaring (\`true\` chiqishi kerak).

### 3-mashq (Chegara holat)
Uchta shartni birlashtiring: \`false || false || true\`. Natija \`true\` bo'lishini tasdiqlang.

### Javoblar:
1.
\`\`\`javascript
let hasCard = true;
let hasBook = false;
console.log(hasCard || hasBook);
\`\`\`
2.
\`\`\`javascript
let age = 10;
console.log(age < 12 || age > 65);
\`\`\`
3.
\`\`\`javascript
console.log(false || false || true);
\`\`\`

---

## 8. Xulosa

1. \`||\` — mantiqiy YOKI. Bittasi ham \`true\` bo'lsa, natija \`true\`.
2. Faqat \`false || false\` — \`false\` beradi.
3. Bitta \`|\` boshqa operator (son qaytaradi). Har doim ikkita \`||\` yoziladi.

Keyingi darsda: mantiqiy EMAS (!) operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Bittasi true",
      instruction: "`hasCard` (`true`) va `hasBook` (`false`) yarating. `||` bilan chiqaring (`true` chiqishi kerak).",
      startingCode: "// hasCard va hasBook ni yarating va || bilan chiqaring\n",
      hint: "let hasCard = true;\nlet hasBook = false;\nconsole.log(hasCard || hasBook);",
      test: "if (!code.includes('||')) return '|| operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Ikkalasi false",
      instruction: "`a = false`, `b = false` berilgan. `a || b` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "let a = false;\nlet b = false;\n// a || b ni chiqaring\n",
      hint: "console.log(a || b);",
      test: "if (!code.includes('||')) return '|| operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Taqqoslashlarni birlashtirish",
      instruction: "`age = 10` berilgan. `age < 12 || age > 65` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "let age = 10;\n// age < 12 || age > 65 ni chiqaring\n",
      hint: "console.log(age < 12 || age > 65);",
      test: "if (!code.includes('||')) return '|| operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Bitta | xatosini tuzatish",
      instruction: "`true | false` o'rniga `||` yozing: `true` (mantiqiy) chiqsin, `1` (son) emas.",
      startingCode: "console.log(true | false);\n",
      hint: "console.log(true || false);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true (boolean) konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "or so'zini tuzatish",
      instruction: "`true or false` xato bermoqda. `||` bilan tuzating.",
      startingCode: "console.log(true or false);\n",
      hint: "console.log(true || false);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Bonus sharti",
      instruction: "`ball = 120`, `hasKey = false` berilgan. `ball > 100 || hasKey` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "let ball = 120;\nlet hasKey = false;\n// ball > 100 || hasKey ni chiqaring\n",
      hint: "console.log(ball > 100 || hasKey);",
      test: "if (!code.includes('||')) return '|| operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Ikkalasi ham true",
      instruction: "`a = true`, `b = true` berilgan. `a || b` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "let a = true;\nlet b = true;\n// a || b ni chiqaring\n",
      hint: "console.log(a || b);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Uchta shart",
      instruction: "`false || false || true` ni chiqaring (`true` chiqishi kerak).",
      startingCode: "// false || false || true ni chiqaring\n",
      hint: "console.log(false || false || true);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "To'rt holat jadvali (chegara)",
      instruction: "To'rttala holatni chiqaring: `true || true`, `true || false`, `false || true`, `false || false` (`true`, `true`, `true`, `false`).",
      startingCode: "// Tortala holatni chiqaring\n",
      hint: "console.log(true || true);\nconsole.log(true || false);\nconsole.log(false || true);\nconsole.log(false || false);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 4) return 'Tortala holat chiqishi kerak';\nif (out[0][0] !== true || out[1][0] !== true || out[2][0] !== true || out[3][0] !== false) return 'true, true, true, false chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "Hech biri to'g'ri emas (chegara)",
      instruction: "`a = false`, `b = false`, `c = false` berilgan. `a || b || c` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "let a = false;\nlet b = false;\nlet c = false;\n// a || b || c ni chiqaring\n",
      hint: "console.log(a || b || c);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(true || false);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "1",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Bittasi true bo'lsa yetadi: natija true."
    },
    {
      id: 2,
      question: "`console.log(false || false);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "0",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Hech biri true emas. Natija false."
    },
    {
      id: 3,
      question: "`console.log(true | false);` nima chiqaradi?",
      options: [
        "true",
        "1",
        "false",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Bitta | mantiqiy operator emas. U son qaytaradi: 1."
    },
    {
      id: 4,
      question: "`let r = true or false;` qatorida nima bo'ladi?",
      options: [
        "true bo'ladi",
        "SyntaxError beradi",
        "false bo'ladi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript inglizcha so'zlarni tushunmaydi. Faqat || ishlaydi."
    },
    {
      id: 5,
      question: "`let age = 10; console.log(age < 12 || age > 65);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "10",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Birinchi true, ikkinchi false: true || false = true."
    },
    {
      id: 6,
      question: "Qachon || false beradi?",
      options: [
        "Bittasi true bo'lsa",
        "Hammasi false bo'lsa",
        "Bittasi false bo'lsa",
        "Hech qachon"
      ],
      correctAnswer: 1,
      explanation: "|| faqat hamma tomoni false bo'lganda false beradi."
    },
    {
      id: 7,
      question: "`console.log(false || true);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "Xatolik",
        "1"
      ],
      correctAnswer: 1,
      explanation: "Ikkinchi tomoni true — natija true."
    },
    {
      id: 8,
      question: "`let ball = 120; let hasKey = false; console.log(ball > 100 || hasKey);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "120",
        "false"
      ],
      correctAnswer: 1,
      explanation: "Birinchi true: true || false = true."
    },
    {
      id: 9,
      question: "`console.log(false || false || true);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Oxirgi true butun zanjirni qutqaradi."
    },
    {
      id: 10,
      question: "`console.log(true || true);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "2",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi ham true: natija true."
    },
    {
      id: 11,
      question: "Mantiqiy YOKI belgisi qaysi?",
      options: [
        "|",
        "||",
        "or",
        "++"
      ],
      correctAnswer: 1,
      explanation: "Faqat ikkita || mantiqiy YOKI. Bitta | boshqa operator."
    },
    {
      id: 12,
      question: "`console.log(false || false || false);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "0",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Hech biri true emas: natija false."
    }
  ]
};
