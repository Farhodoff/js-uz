export const continueLesson = {
  id: "continueLesson",
  title: "continue (Aylanishni o'tkazib yuborish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, navbatda turibsiz. Oldingizda uch kishi bor. Birinchi o'tadi. Ikkinchi hujjati yo'q — uni chetga o'tkazib, uchinchini oldinga chorlaysiz. Navbat to'xtamaydi. Faqat bitta odam o'tkazib yuboriladi.

Dasturlashda \`continue\` (davom etish) xuddi shu nazoratchi. Joriy aylanishni tashlab, keyingi aylanishga o'tadi.

continue — siklning joriy qadamini to'xtatib, keyingi qadamga o'tkazadigan operatordir.

---

## 2. Nega kerak?

Ro'yxat bor: 1 dan 5 gacha sonlar. Lekin 3 raqami chiqmasligi kerak. \`break\` bilan bo'lmaydi — u butun siklni to'xtatadi. 4 va 5 ham chiqmay qoladi.

Muammo shunda: bitta qadamni tashlash kerak, siklni emas. Yechim — \`continue\`:

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
\`\`\`

Natija: \`1\`, \`2\`, \`4\`, \`5\`. Faqat \`3\` tashlab ketildi. Qolgani chiqdi.

---

## 3. Birinchi misol

Bu kod bitta qiymatni tashlab, qolganini chiqaradi.

\`\`\`javascript
for (let i = 1; i <= 4; i++) { // 4 gacha mo'ljallangan
  if (i === 2) { // 2 topildimi?
    continue; // Shu qadam tashlanadi
  }
  console.log(i); // Qolganlari chiqadi
}
\`\`\`

\`\`\`text
// Natija:
1
3
4
\`\`\`

---

## 4. Qator-baqator tahlil

- \`for (let i = 1; i <= 4; i++) {\` — sikl boshlandi.
- \`if (i === 2) {\` — har aylanishda savol beriladi.
- \`continue;\` — javob rost bo'lganda shu qadam tashlanadi. Keyingi qatorlar shu aylanishda ishlamaydi.
- \`console.log(i);\` — tashlanmagan qadamlar chiqadi: \`1\`, \`3\`, \`4\`.

---

## 5. Qadamma-qadam (trace)

Har aylanishda nima bo'ladi:

| Qadam | i | Shart (i === 2) | Natija |
|---|---|---|---|
| 1 | 1 | Yo'q | 1 chiqdi |
| 2 | 2 | Ha | Tashlandi, hech narsa chiqmadi |
| 3 | 3 | Yo'q | 3 chiqdi |
| 4 | 4 | Yo'q | 4 chiqdi |
| 5 | 5 | Shart yolg'on (5 <= 4 emas) | Sikl to'xtadi |

---

## 6. Yana bitta misol

Bu kod ikkita qiymatni tashlab ketadi.

\`\`\`javascript
for (let i = 1; i <= 5; i++) { // 5 gacha mo'ljallangan
  if (i === 2) { // 2 topildimi?
    continue; // Tashlanadi
  }
  if (i === 4) { // 4 topildimi?
    continue; // Tashlanadi
  }
  console.log(i); // Qolganlari chiqadi
}
\`\`\`

\`\`\`text
// Natija:
1
3
5
\`\`\`

Qator-baqator tahlil:
- \`i\` 2 bo'lganda birinchi \`continue\` ishladi. \`2\` chiqmadi.
- \`i\` 4 bo'lganda ikkinchi \`continue\` ishladi. \`4\` chiqmadi.
- Qolgan \`1\`, \`3\`, \`5\` chiqdi. Sikl oxirigacha bordi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Sikldan tashqarida yozish
❌ Xato kod:
\`\`\`javascript
continue;
\`\`\`
Nima bo'ladi: \`SyntaxError: Illegal continue statement: no surrounding iteration statement\` xatoligi yuz beradi. \`continue\` faqat sikl ichida yashaydi.
✅ To'g'ri variant:
\`\`\`javascript
for (let i = 1; i <= 4; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}
\`\`\`

### 2. Noto'g'ri yozish
❌ Xato kod:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  contnue;
  console.log(i);
}
\`\`\`
Nima bo'ladi: \`ReferenceError: contnue is not defined\` xatoligi yuz beradi. \`contnue\` degan so'z yo'q. Faqat aniq \`continue\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  continue;
  console.log(i);
}
\`\`\`

### 3. continue dan keyingi qatorga ishonish
❌ Xato tushuncha:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  continue;
  console.log(i);
}
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin hech narsa chiqmaydi! \`continue\` dan keyingi qator shu aylanishda hech qachon ishlamaydi. Boshqaruv darhol keyingi qadamga o'tadi.
✅ To'g'ri tushuncha: \`continue\` dan keyingi kod — shu aylanish uchun o'lik kod. Kerakli ish \`continue\` dan OLDIN yoziladi.

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`1\` dan \`4\` gacha sikl yozing. \`2\` ni tashlab keting (\`1\`, \`3\`, \`4\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`1\` dan \`5\` gacha sikl yozing. \`3\` ni tashlab keting (\`1\`, \`2\`, \`4\`, \`5\` chiqishi kerak).

### 3-mashq (Chegara holat)
\`0\` dan \`6\` gacha juft sonlarni tashlab keting. Faqat toqlar chiqsin (\`1\`, \`3\`, \`5\`).

### Javoblar:
1.
\`\`\`javascript
for (let i = 1; i <= 4; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}
\`\`\`
2.
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
\`\`\`
3.
\`\`\`javascript
for (let i = 0; i <= 6; i++) {
  if (i === 0) {
    continue;
  }
  if (i === 2) {
    continue;
  }
  if (i === 4) {
    continue;
  }
  if (i === 6) {
    continue;
  }
  console.log(i);
}
\`\`\`

---

## 9. Xulosa

1. \`continue\` — joriy qadamni tashlab, keyingi qadamga o'tadi. Sikl to'xtamaydi.
2. \`continue\` faqat sikl ichida yoziladi. Tashqarida xato beradi.
3. \`continue\` dan keyingi qator shu aylanishda ishlamaydi.

Keyingi darsda: qayta ishlatiladigan kod bo'lagi — funksiyalar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "2 ni tashlash",
      instruction: "`1` dan `4` gacha sikl yozing. `2` ni `continue` bilan tashlang (`1`, `3`, `4` chiqishi kerak).",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 1; i <= 4; i++) {\n  if (i === 2) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "if (!code.includes('continue')) return 'continue operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,3,4') return null;\nreturn '1, 3, 4 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "3 ni tashlash",
      instruction: "`1` dan `5` gacha sikl yozing. `3` ni tashlang (`1`, `2`, `4`, `5` chiqishi kerak).",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 1; i <= 5; i++) {\n  if (i === 3) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "if (!code.includes('continue')) return 'continue operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,4,5') return null;\nreturn '1, 2, 4, 5 chiqishi kerak';"
    },
    {
      id: 3,
      title: "Tashqaridagi continue ni tuzatish",
      instruction: "`continue;` yolg'iz qolgan. Uni `for` ichiga oling (`0`, `1`, `2` chiqishi kerak emas — hech narsa chiqmasin, lekin xato ham bermasin).",
      startingCode: "continue;\n",
      hint: "for (let i = 0; i < 3; i++) {\n  continue;\n}",
      test: "if (!code.includes('for') || !code.includes('continue')) return 'for ichiga continue yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'Hech narsa chiqmasligi kerak';"
    },
    {
      id: 4,
      title: "contnue ni tuzatish",
      instruction: "`contnue` ni `continue` ga tuzating (`0`, `1`, `2` chiqishi kerak emas — hech narsa chiqmasin).",
      startingCode: "for (let i = 0; i < 3; i++) {\n  contnue;\n  console.log(i);\n}\n",
      hint: "continue;",
      test: "if (code.includes('contnue')) return 'contnue ni continue deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'Hech narsa chiqmasligi kerak (continue dan keyingi qator ishlamaydi)';"
    },
    {
      id: 5,
      title: "Ikkita tashlash",
      instruction: "`1` dan `5` gacha siklda `2` va `4` ni tashlang (`1`, `3`, `5` chiqishi kerak).",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 1; i <= 5; i++) {\n  if (i === 2) {\n    continue;\n  }\n  if (i === 4) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,3,5') return null;\nreturn '1, 3, 5 chiqishi kerak';"
    },
    {
      id: 6,
      title: "Toq sonlar (chegara)",
      instruction: "`0` dan `6` gacha siklda juftlarni tashlang. Faqat `1`, `3`, `5` chiqsin.",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 0; i <= 6; i++) {\n  if (i === 0) {\n    continue;\n  }\n  if (i === 2) {\n    continue;\n  }\n  if (i === 4) {\n    continue;\n  }\n  if (i === 6) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,3,5') return null;\nreturn '1, 3, 5 chiqishi kerak (juftlar tashlansin)';"
    },
    {
      id: 7,
      title: "5 ni tashlash (chegara)",
      instruction: "`1` dan `6` gacha siklda `5` ni tashlang (`1`, `2`, `3`, `4`, `6` chiqishi kerak).",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 1; i <= 6; i++) {\n  if (i === 5) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3,4,6') return null;\nreturn '1, 2, 3, 4, 6 chiqishi kerak';"
    },
    {
      id: 8,
      title: "Boshini tashlash (chegara)",
      instruction: "`0` dan `3` gacha siklda `0` ni tashlang (`1`, `2`, `3` chiqishi kerak).",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 0; i <= 3; i++) {\n  if (i === 0) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn '1, 2, 3 chiqishi kerak';"
    },
    {
      id: 9,
      title: "Oxirini tashlash (chegara)",
      instruction: "`1` dan `4` gacha siklda `4` ni tashlang (`1`, `2`, `3` chiqishi kerak).",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 1; i <= 4; i++) {\n  if (i === 4) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn '1, 2, 3 chiqishi kerak';"
    },
    {
      id: 10,
      title: "Hammasi tashlansa (chegara)",
      instruction: "`1` dan `3` gacha siklda HAMMANI tashlang (har birida `continue`). Hech narsa chiqmasligi kerak.",
      startingCode: "// for, if va continue yozing\n",
      hint: "for (let i = 1; i <= 3; i++) {\n  if (i === 1) {\n    continue;\n  }\n  if (i === 2) {\n    continue;\n  }\n  if (i === 3) {\n    continue;\n  }\n  console.log(i);\n}",
      test: "if (!code.includes('continue')) return 'continue ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'Hech narsa chiqmasligi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`for (let i = 1; i <= 4; i++) { if (i === 2) { continue; } console.log(i); }` nima chiqaradi?",
      options: [
        "1, 2, 3, 4",
        "1, 3, 4",
        "2",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "2 topilganda shu qadam tashlanadi. Qolgani chiqadi."
    },
    {
      id: 2,
      question: "continue nimani qiladi?",
      options: [
        "Siklni to'xtatadi",
        "Joriy qadamni tashlab, keyingisiga o'tadi",
        "Boshiga qaytaradi",
        "Hech narsa qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "continue faqat bitta qadamni o'tkazib yuboradi. Sikl davom etadi."
    },
    {
      id: 3,
      question: "`continue;` yolg'iz yozilsa nima bo'ladi?",
      options: [
        "Hech narsa bo'lmaydi",
        "SyntaxError beradi",
        "Dastur to'xtaydi",
        "true qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "continue faqat sikl ichida yashaydi."
    },
    {
      id: 4,
      question: "`for (let i = 0; i < 3; i++) { contnue; console.log(i); }` nima qiladi?",
      options: [
        "0, 1, 2 chiqaradi",
        "ReferenceError beradi",
        "Hech narsa chiqarmaydi",
        "Cheksiz ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "contnue degan so'z yo'q. Faqat aniq continue yoziladi."
    },
    {
      id: 5,
      question: "`for (let i = 0; i < 3; i++) { continue; console.log(i); }` nima chiqaradi?",
      options: [
        "0, 1, 2",
        "Hech narsa",
        "Xatolik",
        "3"
      ],
      correctAnswer: 1,
      explanation: "continue dan keyingi qator hech qachon ishlamaydi."
    },
    {
      id: 6,
      question: "`for (let i = 1; i <= 5; i++) { if (i === 3) { continue; } console.log(i); }` nima chiqaradi?",
      options: [
        "1, 2, 3, 4, 5",
        "1, 2, 4, 5",
        "3",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Faqat 3 tashlanadi. Qolgani chiqadi."
    },
    {
      id: 7,
      question: "continue bilan break farqi nima?",
      options: [
        "Farqi yo'q",
        "continue qadamni, break siklni to'xtatadi",
        "break qadamni, continue siklni to'xtatadi",
        "Ikkalasi ham to'xtatadi"
      ],
      correctAnswer: 1,
      explanation: "continue — bitta qadam o'tkaziladi. break — butun sikl to'xtaydi."
    },
    {
      id: 8,
      question: "`for (let i = 0; i <= 6; i++) { if (i === 0) { continue; } if (i === 2) { continue; } if (i === 4) { continue; } if (i === 6) { continue; } console.log(i); }` nima chiqaradi?",
      options: [
        "0, 2, 4, 6",
        "1, 3, 5",
        "0, 1, 2, 3, 4, 5, 6",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Juftlar tashlanadi. Faqat toqlar chiqadi."
    },
    {
      id: 9,
      question: "`for (let i = 1; i <= 4; i++) { if (i === 4) { continue; } console.log(i); }` nima chiqaradi?",
      options: [
        "1, 2, 3, 4",
        "1, 2, 3",
        "4",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Oxirgi qadam tashlanadi. 1, 2, 3 chiqadi."
    },
    {
      id: 10,
      question: "`for (let i = 0; i <= 3; i++) { if (i === 0) { continue; } console.log(i); }` nima chiqaradi?",
      options: [
        "0, 1, 2, 3",
        "1, 2, 3",
        "0",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Birinchi qadam tashlanadi. 1, 2, 3 chiqadi."
    },
    {
      id: 11,
      question: "continue dan keyingi qator qachon ishlaydi?",
      options: [
        "Har doim",
        "Hech qachon (shu aylanishda)",
        "Oxirgi aylanishda",
        "Birinchi aylanishda"
      ],
      correctAnswer: 1,
      explanation: "Boshqaruv darhol keyingi qadamga o'tadi. Keyingi qator o'tkaziladi."
    },
    {
      id: 12,
      question: "Qaysi biri to'g'ri continue?",
      options: [
        "contnue",
        "continue",
        "countinue",
        "continune"
      ],
      correctAnswer: 1,
      explanation: "Faqat aniq continue. Harf xatosi ReferenceError beradi."
    }
  ]
};
