export const returnLesson = {
  id: "returnLesson",
  title: "return (Qiymat Qaytarish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, do'konda kofe buyurtma qildingiz. Sotuvchi ichkariga kirib, bir stakan ko'tarib chiqadi. Siz pul to'ladingiz (kirdingiz). U natija ko'tardi (chiqdi).

Dasturlashda funksiyaga qiymat kiradi (argument). Funksiyadan natija chiqadi. Chiqaradigan so'z — \`return\` (qaytarish).

return — funksiya ichida hisoblangan natijani tashqariga uzatadigan operatordir.

---

## 2. Nega kerak?

Ikkita sonni qo'shish kerak. Natija keyin yana ishlatiladi:

\`\`\`javascript
function qosh(a, b) {
  console.log(a + b);
}
qosh(2, 3);
\`\`\`

Konsolga \`5\` chiqadi. Lekin natija ichida qolib ketdi. Tashqarida \`5\` yo'q. Uni boshqa hisobda ishlatib bo'lmaydi.

Muammo shunda: natija funksiya ichida qamalib qoladi. Yechim — \`return\`:

\`\`\`javascript
function qosh(a, b) {
  return a + b;
}
let natija = qosh(2, 3);
console.log(natija);
\`\`\`

Endi \`5\` tashqarida. Uni saqlash, chiqarish va qayta ishlatish mumkin.

---

## 3. Birinchi misol

Bu kod yig'indini qaytaradi va tashqarida chiqaradi.

\`\`\`javascript
function qosh(a, b) { // Ikkita parametr
  return a + b; // Natija qaytariladi
}
let natija = qosh(2, 3); // 5 saqlanadi
console.log(natija); // 5 chiqadi
\`\`\`

\`\`\`text
// Natija: 5
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function qosh(a, b) {\` — funksiya e'lon qilindi. Ikkita parametr bor.
- \`return a + b;\` — yig'indi hisoblandi. Natija funksiyadan tashqariga uzatildi.
- \`let natija = qosh(2, 3);\` — chaqiruv bajarildi. Qaytgan \`5\` natijaga yozildi.
- \`console.log(natija);\` — saqlangan \`5\` chiqadi.

---

## 5. Qadamma-qadam (trace)

Qiymat qanday chiqadi:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`function qosh(a, b) {\` ... \`}\` | E'lon | Saqlandi |
| 2 | \`qosh(2, 3);\` | Chaqiruv | a = 2, b = 3 bo'ldi |
| 3 | \`return a + b;\` | Hisoblash | 5 qaytarildi |
| 4 | \`let natija = ...;\` | Saqlash | natija 5 bo'ldi |
| 5 | \`console.log(natija);\` | — | 5 chiqdi |

---

## 6. Yana bitta misol

Bu kod matn qaytaradigan funksiyani ko'rsatadi.

\`\`\`javascript
function salom(ism) { // Bitta parametr
  return "Salom!"; // Matn qaytariladi
}
let xabar = salom("Ali"); // Natija saqlanadi
console.log(xabar); // Salom! chiqadi
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

Qator-baqator tahlil:
- \`return "Salom!";\` — tayyor matn qaytarildi.
- \`let xabar = salom("Ali");\` — qaytgan matn saqlandi.
- Natija konsolga chiqdi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Noto'g'ri yozish
❌ Xato kod:
\`\`\`javascript
function qosh(a, b) {
  retrun a + b;
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'a'\` xatoligi yuz beradi. \`retrun\` degan so'z yo'q. Faqat aniq \`return\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
function qosh(a, b) {
  return a + b;
}
\`\`\`

### 2. return ni unutish
❌ Xato kod:
\`\`\`javascript
function qosh(a, b) {
  let s = a + b;
}
let natija = qosh(2, 3);
console.log(natija);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin \`undefined\` chiqadi. Sababi: funksiya hech narsa qaytarmadi. Ichida hisoblangan \`s\` tashqariga chiqmagan.
✅ To'g'ri variant:
\`\`\`javascript
function qosh(a, b) {
  return a + b;
}
let natija = qosh(2, 3);
console.log(natija); // 5 chiqadi
\`\`\`

### 3. return dan keyinga ishonish
❌ Xato tushuncha:
\`\`\`javascript
function qosh(a, b) {
  return a + b;
  console.log("Ko'rinmaydi!");
}
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin "Ko'rinmaydi!" hech qachon chiqmaydi! \`return\` funksiyani yakunlaydi. Undan keyingi qatorlar ishlamaydi.
✅ To'g'ri tushuncha: chiqarish kerak bo'lgan narsa \`return\` dan OLDIN yoziladi. Yoki qaytgan qiymat tashqarida chiqariladi.

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`qosh(a, b)\` funksiyasini e'lon qiling (ichida \`return a + b;\` bo'lsin). \`qosh(2, 3)\` ni \`natija\` ga saqlang va chiqaring.

### 2-mashq (O'rtacha)
\`salom(ism)\` funksiyasini e'lon qiling (\`return "Salom!";\` bo'lsin). \`salom("Ali")\` ni \`xabar\` ga saqlang va chiqaring.

### 3-mashq (Chegara holat)
\`return\` siz funksiya yozing. Natija \`undefined\` chiqishini tasdiqlang (bu xato emas).

### Javoblar:
1.
\`\`\`javascript
function qosh(a, b) {
  return a + b;
}
let natija = qosh(2, 3);
console.log(natija);
\`\`\`
2.
\`\`\`javascript
function salom(ism) {
  return "Salom!";
}
let xabar = salom("Ali");
console.log(xabar);
\`\`\`
3.
\`\`\`javascript
function qosh(a, b) {
  let s = a + b;
}
let natija = qosh(2, 3);
console.log(natija); // undefined chiqadi
\`\`\`

---

## 9. Xulosa

1. \`return\` — funksiya natijasini tashqariga uzatadi.
2. Qaytgan qiymat saqlanishi kerak (\`let natija = ...\`). Bo'lmasa, yo'qoladi.
3. \`return\` siz funksiya \`undefined\` qaytaradi. Undan keyingi qatorlar ishlamaydi.

Keyingi darsda: qisqa yoziladigan arrow funksiyalar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Yig'indini qaytarish",
      instruction: "`qosh(a, b)` ni e'lon qiling (`return a + b;` bilan). `qosh(2, 3)` ni `natija` ga saqlang va chiqaring.",
      startingCode: "// qosh(a, b) ni e'lon qiling, chaqiring va chiqaring\n",
      hint: "function qosh(a, b) {\n  return a + b;\n}\nlet natija = qosh(2, 3);\nconsole.log(natija);",
      test: "if (!code.includes('return')) return 'return operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Matn qaytarish",
      instruction: "`salom(ism)` ni e'lon qiling (`return \"Salom!\";` bilan). `salom(\"Ali\")` ni `xabar` ga saqlang va chiqaring.",
      startingCode: "// salom(ism) ni e'lon qiling, chaqiring va chiqaring\n",
      hint: "function salom(ism) {\n  return \"Salom!\";\n}\nlet xabar = salom(\"Ali\");\nconsole.log(xabar);",
      test: "if (!code.includes('return')) return 'return ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom xabari chiqmadi';"
    },
    {
      id: 3,
      title: "retrun ni tuzatish",
      instruction: "`retrun` ni `return` ga tuzating (`qosh(2, 3)` chaqiruvi bor). `5` chiqsin.",
      startingCode: "function qosh(a, b) {\n  retrun a + b;\n}\nlet natija = qosh(2, 3);\nconsole.log(natija);\n",
      hint: "return a + b;",
      test: "if (code.includes('retrun')) return 'retrun ni return deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "return qo'shish",
      instruction: "Funksiya hech narsa qaytarmayapti. `return a + b;` qo'shing (`5` chiqsin).",
      startingCode: "function qosh(a, b) {\n  let s = a + b;\n}\nlet natija = qosh(2, 3);\nconsole.log(natija);\n",
      hint: "return a + b;",
      test: "if (!code.includes('return')) return 'return qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Ayirmani qaytarish",
      instruction: "`ayir(a, b)` ni e'lon qiling (`return a - b;` bilan). `ayir(10, 4)` ni saqlang va chiqaring (`6` chiqsin).",
      startingCode: "// ayir(a, b) ni e'lon qiling, chaqiring va chiqaring\n",
      hint: "function ayir(a, b) {\n  return a - b;\n}\nlet natija = ayir(10, 4);\nconsole.log(natija);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '6')) return null;\nreturn '6 konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Ko'paytmani qaytarish (chegara)",
      instruction: "`kopay(a, b)` ni e'lon qiling (`return a * b;` bilan). `kopay(6, 7)` ni chiqaring (`42` chiqsin).",
      startingCode: "// kopay(a, b) ni e'lon qiling, chaqiring va chiqaring\n",
      hint: "function kopay(a, b) {\n  return a * b;\n}\nconsole.log(kopay(6, 7));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '42')) return null;\nreturn '42 konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Qaytganini qayta ishlatish (chegara)",
      instruction: "`qosh(2, 3)` natijasini `natija` ga saqlang. Keyin `natija + 10` ni chiqaring (`15` chiqishi kerak).",
      startingCode: "function qosh(a, b) {\n  return a + b;\n}\n// natija ga saqlang, keyin + 10 ni chiqaring\n",
      hint: "let natija = qosh(2, 3);\nconsole.log(natija + 10);",
      test: "if (!code.includes('qosh(2, 3)')) return 'qosh(2, 3) ni chaqiring';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '15')) return null;\nreturn '15 konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Bo'sh qaytarish (chegara)",
      instruction: "`qosh(a, b)` ni `return` siz yozing. `qosh(2, 3)` ni chiqaring (`undefined` chiqadi — bu xato emas).",
      startingCode: "// return siz funksiya yozing va chiqaring\n",
      hint: "function qosh(a, b) {\n  let s = a + b;\n}\nconsole.log(qosh(2, 3));",
      test: "if (code.includes('return')) return 'Bu mashqda return yozmang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'undefined')) return null;\nreturn 'undefined konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Ikki funksiya zanjiri (chegara)",
      instruction: "`ikki(n)` ni e'lon qiling (`return n + n;` bilan). `ikki(21)` ni chiqaring (`42` chiqishi kerak).",
      startingCode: "// ikki(n) ni e'lon qiling, chaqiring va chiqaring\n",
      hint: "function ikki(n) {\n  return n + n;\n}\nconsole.log(ikki(21));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '42')) return null;\nreturn '42 konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Nom qaytarish (chegara)",
      instruction: "`kim(ism)` ni e'lon qiling (`return ism;` bilan). `kim(\"Ali\")` ni chiqaring.",
      startingCode: "// kim(ism) ni e'lon qiling, chaqiring va chiqaring\n",
      hint: "function kim(ism) {\n  return ism;\n}\nconsole.log(kim(\"Ali\"));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali'))) return null;\nreturn 'Ali chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`function qosh(a, b) { return a + b; } let natija = qosh(2, 3); console.log(natija);` nima chiqaradi?",
      options: [
        "undefined",
        "5",
        "Xatolik",
        "a + b"
      ],
      correctAnswer: 1,
      explanation: "return 5 ni uzatadi. natija ga 5 yoziladi."
    },
    {
      id: 2,
      question: "return nimani qiladi?",
      options: [
        "Funksiyani e'lon qiladi",
        "Natijani tashqariga uzatadi",
        "Konsolga chiqaradi",
        "Hech narsa qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "return — ichkaridan tashqariga ko'prik."
    },
    {
      id: 3,
      question: "`function qosh(a, b) { retrun a + b; }` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "undefined qaytaradi",
        "0 qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "retrun degan so'z yo'q. Faqat aniq return yoziladi."
    },
    {
      id: 4,
      question: "`function qosh(a, b) { let s = a + b; } let natija = qosh(2, 3); console.log(natija);` nima chiqaradi?",
      options: [
        "5",
        "undefined",
        "Xatolik",
        "s"
      ],
      correctAnswer: 1,
      explanation: "return yo'q. Funksiya hech narsa uzatmaydi: undefined."
    },
    {
      id: 5,
      question: "`function qosh(a, b) { return a + b; console.log(\"X\"); } console.log(qosh(1, 2));` nima chiqaradi?",
      options: [
        "3 va X",
        "Faqat 3",
        "Faqat X",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "return dan keyingi qator hech qachon ishlamaydi."
    },
    {
      id: 6,
      question: "`function ayir(a, b) { return a - b; } console.log(ayir(10, 4));` nima chiqaradi?",
      options: [
        "14",
        "6",
        "undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "10 - 4 = 6 qaytariladi va chiqariladi."
    },
    {
      id: 7,
      question: "Qaytgan qiymat saqlanmasa nima bo'ladi?",
      options: [
        "Xatolik beradi",
        "Yo'qoladi",
        "Avtomatik saqlanadi",
        "Konsolga chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Saqlanmagan natija yo'qoladi. let bilan ushlash kerak."
    },
    {
      id: 8,
      question: "`function salom(ism) { return \"Salom!\"; } console.log(salom(\"Ali\"));` nima chiqaradi?",
      options: [
        "Ali",
        "Salom!",
        "undefined",
        "ism"
      ],
      correctAnswer: 1,
      explanation: "Funksiya tayyor matn qaytaradi."
    },
    {
      id: 9,
      question: "`function qosh(a, b) { return a + b; } let natija = qosh(2, 3); console.log(natija + 10);` nima chiqaradi?",
      options: [
        "5",
        "15",
        "undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "natija 5 bo'ladi. 5 + 10 = 15."
    },
    {
      id: 10,
      question: "`function kim(ism) { return ism; } console.log(kim(\"Ali\"));` nima chiqaradi?",
      options: [
        "ism",
        "Ali",
        "undefined",
        "true"
      ],
      correctAnswer: 1,
      explanation: "Parametr qaytarildi: Ali."
    },
    {
      id: 11,
      question: "return qayerda yoziladi?",
      options: [
        "Funksiyadan tashqarida",
        "Funksiya ichida",
        "Fayl boshida",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "return faqat funksiya ichida ma'noga ega."
    },
    {
      id: 12,
      question: "`function ikki(n) { return n + n; } console.log(ikki(21));` nima chiqaradi?",
      options: [
        "21",
        "42",
        "n + n",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "21 + 21 = 42 qaytariladi."
    }
  ]
};
