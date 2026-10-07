export const equalityAlgorithms = {
  id: "equalityAlgorithms",
  title: "== va === (Tenglik va Qat'iy Tenglik)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, aeroportda pasport tekshirilmoqda. Ikki xil tekshiruv bor:
- Birinchi xodim faqat ismga qaraydi: "Ism bir xilmi?" Ha bo'lsa — o'tkazadi.
- Ikkinchi xodim qattiqroq: "Ism ham, familiya ham, tug'ilgan yil ham bir xilmi?" Hammasi mos kelsa — o'tkazadi.

JavaScript'da ham tenglikni ikki xil tekshirish bor:
- \`==\` — yumshoq tekshiruv. Qiymatlar teng bo'lsa bo'ldi. Turiga qaramaydi.
- \`===\` — qat'iy tekshiruv. Qiymat ham, tur ham bir xil bo'lishi shart.

---

## 2. Nega kerak?

Parol tekshirilmoqda. Saqlangan parol — \`1234\` (son). Foydalanuvchi kiritdi — \`"1234"\` (matn).

Agar yumshoq tekshiruv ishlatilsa:

\`\`\`javascript
console.log(1234 == "1234");
\`\`\`

Natija \`true\`. Dastur "teng" deydi. Lekin turlar har xil: biri son, biri matn.

Muammo shunda: ba'zan tur farqi muhim. Yechim — qat'iy tekshiruv:

\`\`\`javascript
console.log(1234 === "1234");
\`\`\`

Natija \`false\`. Dastur "tur har xil" deydi. Aniq javob kerak bo'lganda \`===\` ishlatiladi.

---

## 3. Birinchi misol

Bu kod bir xil sonlarni ikki xil tekshiruv bilan solishtiradi.

\`\`\`javascript
console.log(5 === 5); // true chiqadi
console.log(5 === "5"); // false chiqadi
\`\`\`

\`\`\`text
// Natija:
true
false
\`\`\`

---

## 4. Qator-baqator tahlil

- \`5 === 5\` — ikkalasi ham son, ikkalasi ham \`5\`. Qiymat bir xil, tur bir xil. Natija \`true\`.
- \`// true chiqadi\` — izoh. Qator natijasini oldindan aytadi.
- \`5 === "5"\` — qiymat o'xshaydi (\`5\`). Lekin biri son, biri matn. Tur har xil. Natija \`false\`.

---

## 5. Yana bitta misol

Bu kod yumshoq tekshiruvni ko'rsatadi. Tur farqi e'tiborga olinmaydi.

\`\`\`javascript
console.log(5 == 5); // true chiqadi
console.log(5 == "5"); // true chiqadi
\`\`\`

\`\`\`text
// Natija:
true
true
\`\`\`

Qator-baqator tahlil:
- \`5 == 5\` — ikkalasi son. Natija \`true\`.
- \`5 == "5"\` — biri son, biri matn. Lekin \`==\` solishtirishdan oldin turlarni bir xil qiladi. Matn songa aylanadi. Keyin \`5\` bilan \`5\` solishtiriladi. Natija \`true\`.
- Farq shunda: \`===\` turlarni o'zgartirmaydi, \`==\` o'zgartiradi.

---

## 5.1. NaN ning g'alati holati

Bitta noodatiy holat bor. Uni yodlab qo'ying:

\`\`\`javascript
console.log(NaN === NaN); // false chiqadi
\`\`\`

\`\`\`text
// Natija: false
\`\`\`

Qator-baqator tahlil:
- \`NaN\` maxsus belgi. U hech narsaga teng emas. Hatto o'ziga ham teng emas.
- Bu qoida. Sababini hozir tushuntirish shart emas. Faqat natijani biling: har doim \`false\`.

---

## 6. Ko'p uchraydigan xatolar

### 1. Bitta = bilan solishtirish
❌ Xato kod:
\`\`\`javascript
let r = 5 = 5;
\`\`\`
Nima bo'ladi: \`SyntaxError: Invalid left-hand side in assignment\` xatoligi yuz beradi. Bitta \`=\` — o'zlashtirish belgisi. Solishtirish uchun kamida ikkita tenglik kerak: \`==\` yoki \`===\`.
✅ To'g'ri variant:
\`\`\`javascript
let r = 5 === 5; // true bo'ladi
console.log(r);
\`\`\`

### 2. Matn parolni == bilan tekshirish
❌ Xato kod:
\`\`\`javascript
let saved = 1234;
let typed = "1234";
console.log(saved == typed); // true chiqadi
\`\`\`
Nima bo'ladi: dastur "teng" deydi. Lekin turlar har xil. Agar aniqlik kerak bo'lsa, bu xato javob.
✅ To'g'ri variant:
\`\`\`javascript
let saved = 1234;
let typed = "1234";
console.log(saved === typed); // false chiqadi
\`\`\`

### 3. === da turlarni unutish
❌ Xato tushuncha: \`"5" === 5\` ham \`true\` beradi deb o'ylash.
Nima bo'ladi: konsolga \`false\` chiqadi. \`===\` da qiymat o'xshashligi yetmaydi. Tur ham bir xil bo'lishi shart: son bilan son, matn bilan matn.
✅ To'g'ri variant:
\`\`\`javascript
console.log("5" === "5"); // true chiqadi
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`5 === 5\` ni konsolga chiqaring (\`true\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`5 === "5"\` va \`5 == "5"\` ni ikkita qatorda chiqaring. Natijalar \`false\` va \`true\` bo'lishi kerak.

### 3-mashq (Chegara holat)
\`NaN === NaN\` ni konsolga chiqaring. Natija \`false\` bo'lishini tasdiqlang.

### Javoblar:
1.
\`\`\`javascript
console.log(5 === 5);
\`\`\`
2.
\`\`\`javascript
console.log(5 === "5");
console.log(5 == "5");
\`\`\`
3.
\`\`\`javascript
console.log(NaN === NaN);
\`\`\`

---

## 8. Xulosa

1. \`===\` — qat'iy tenglik. Qiymat ham, tur ham bir xil bo'lishi kerak.
2. \`==\` — yumshoq tenglik. Solishtirishdan oldin turlarni bir xil qiladi.
3. Aniq javob kerak bo'lganda har doim \`===\` ishlatiladi.

Keyingi darsda: mantiqiy VA (&&) operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Qat'iy tenglik",
      instruction: "`5 === 5` ni konsolga chiqaring (`true` chiqishi kerak).",
      startingCode: "// 5 === 5 ni chiqaring\n",
      hint: "console.log(5 === 5);",
      test: "if (!code.includes('===')) return '=== operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Tur farqi",
      instruction: "`5 === \"5\"` ni konsolga chiqaring (`false` chiqishi kerak — tur har xil).",
      startingCode: "// 5 === \"5\" ni chiqaring\n",
      hint: "console.log(5 === \"5\");",
      test: "if (!code.includes('===')) return '=== operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "Yumshoq tenglik",
      instruction: "`5 == \"5\"` ni konsolga chiqaring (`true` chiqishi kerak — tur tenglashtiriladi).",
      startingCode: "// 5 == \"5\" ni chiqaring\n",
      hint: "console.log(5 == \"5\");",
      test: "if (!code.includes('==') || code.includes('===')) return '== operatori ishlating (=== emas)';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Ikkalasini yonma-yon",
      instruction: "`5 === \"5\"` va `5 == \"5\"` ni ikkita qatorda chiqaring (`false` va `true`).",
      startingCode: "// Ikkala solishtirishni chiqaring\n",
      hint: "console.log(5 === \"5\");\nconsole.log(5 == \"5\");",
      test: "if (!code.includes('===') || !code.includes('==')) return '=== va == ikkalasi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkita qiymat chiqaring';\nif (out[0][0] !== false || out[1][0] !== true) return 'false va true chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "Bitta tenglik xatosini tuzatish",
      instruction: "`let r = 5 = 5;` xato bermoqda. `===` bilan tuzating: `true` chiqsin.",
      startingCode: "let r = 5 = 5;\nconsole.log(r);\n",
      hint: "let r = 5 === 5;",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Parol tekshiruvi",
      instruction: "`saved = 1234`, `typed = \"1234\"` berilgan. Qat'iy solishtiring: `false` chiqishi kerak.",
      startingCode: "let saved = 1234;\nlet typed = \"1234\";\n// Qatiy solishtirib chiqaring\n",
      hint: "console.log(saved === typed);",
      test: "if (!code.includes('===')) return '=== bilan solishtiring';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Matnlar tengligi",
      instruction: "`\"Ali\" === \"Ali\"` ni chiqaring (`true` — ikkalasi ham matn, ikkalasi ham bir xil).",
      startingCode: "// \"Ali\" === \"Ali\" ni chiqaring\n",
      hint: "console.log(\"Ali\" === \"Ali\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Sonlar tengsizligi",
      instruction: "`10 === 20` ni chiqaring (`false` chiqishi kerak).",
      startingCode: "// 10 === 20 ni chiqaring\n",
      hint: "console.log(10 === 20);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Mantiqiy tenglik (chegara)",
      instruction: "`true === true` va `true === false` ni chiqaring (`true` va `false`).",
      startingCode: "// Ikkala solishtirishni chiqaring\n",
      hint: "console.log(true === true);\nconsole.log(true === false);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkita qiymat chiqaring';\nif (out[0][0] !== true || out[1][0] !== false) return 'true va false chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "NaN tengligi (chegara)",
      instruction: "`NaN === NaN` ni chiqaring. Natija `false` bo'ladi — NaN o'ziga ham teng emas.",
      startingCode: "// NaN === NaN ni chiqaring\n",
      hint: "console.log(NaN === NaN);",
      test: "if (!code.includes('NaN')) return 'NaN ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`console.log(5 === 5);` nima chiqaradi?",
      options: [
        "5",
        "true",
        "false",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Qiymat ham, tur ham bir xil: qat'iy tenglik true."
    },
    {
      id: 2,
      question: "`console.log(5 === \"5\");` nima chiqaradi?",
      options: [
        "true",
        "false",
        "5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Qiymat o'xshaydi, lekin tur har xil (son va matn). === false beradi."
    },
    {
      id: 3,
      question: "`console.log(5 == \"5\");` nima chiqaradi?",
      options: [
        "false",
        "true",
        "5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "== turlarni tenglashtiradi, keyin solishtiradi. Natija true."
    },
    {
      id: 4,
      question: "Qachon === ishlatiladi?",
      options: [
        "Har doim = o'rniga",
        "Aniq javob kerak bo'lganda (tur ham tekshirilsin)",
        "Faqat matnlarda",
        "Hech qachon"
      ],
      correctAnswer: 1,
      explanation: "=== tur farqini ham ushlaydi. Aniq solishtirish uchun eng yaxshi tanlov."
    },
    {
      id: 5,
      question: "`let r = 5 = 5;` qatorida nima bo'ladi?",
      options: [
        "true bo'ladi",
        "SyntaxError beradi",
        "false bo'ladi",
        "5 bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Bitta = o'zlashtirish belgisi. Solishtirish uchun == yoki === kerak."
    },
    {
      id: 6,
      question: "`console.log(\"Ali\" === \"Ali\");` nima chiqaradi?",
      options: [
        "false",
        "true",
        "Ali",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi ham matn, ikkalasi ham bir xil: true."
    },
    {
      id: 7,
      question: "`console.log(10 === 20);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "10",
        "20"
      ],
      correctAnswer: 1,
      explanation: "Qiymatlar har xil: false."
    },
    {
      id: 8,
      question: "Parol `1234` (son) va kiritilgan `\"1234\"` (matn) — `===` nima beradi?",
      options: [
        "true",
        "false",
        "Xatolik",
        "1234"
      ],
      correctAnswer: 1,
      explanation: "Tur har xil bo'lgani uchun qat'iy tenglik false beradi."
    },
    {
      id: 9,
      question: "`console.log(true === false);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "1",
        "0"
      ],
      correctAnswer: 1,
      explanation: "true bilan false bir xil emas: false."
    },
    {
      id: 10,
      question: "`console.log(NaN === NaN);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "NaN",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "NaN maxsus belgi: u hech narsaga, hatto o'ziga ham teng emas."
    },
    {
      id: 11,
      question: "== bilan === ning asosiy farqi nima?",
      options: [
        "Farqi yo'q",
        "== turlarni tenglashtiradi, === tenglashtirmaydi",
        "=== sekinroq ishlaydi",
        "== faqat sonlarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "== avval turlarni bir xil qiladi. === hech narsani o'zgartirmaydi."
    },
    {
      id: 12,
      question: "`console.log(5 == 5);` nima chiqaradi?",
      options: [
        "false",
        "true",
        "5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Ikkalasi ham son va teng: true."
    }
  ]
};
