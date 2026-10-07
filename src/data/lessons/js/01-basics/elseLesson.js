export const elseLesson = {
  id: "elseLesson",
  title: "else (Aks holda)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, yana chorrahadasiz. Belgida ikki yo'l yozilgan:
- Yomg'ir yog'ayotgan bo'lsa — chapga.
- AKS HOLDA — to'g'ri.

Birinchi yo'l yopiq bo'lsa, ikkinchisi ochiq. Har doim bittasi ishlaydi. Sukunat yo'q.

Dasturlashda \`else\` (aks holda) xuddi shu ikkinchi yo'l. \`if\` sharti yolg'on bo'lsa, \`else\` bloki ishlaydi.

else — if sharti bajarilmaganda ishga tushadigan muqobil kod blokidir.

---

## 2. Nega kerak?

O'yinda sovg'a qoidasi bor: ball yetgan oladi. Lekin ball yetmaganlar nima ko'radi? Hech narsa. Ular chalkashadi: "dastur buzildimi?"

Muammo shunda: har ikkala holatda ham javob bo'lishi kerak. Yechim — \`else\`:

\`\`\`javascript
let ball = 60;
if (ball > 100) {
  console.log("Sovg'a sizniki!");
} else {
  console.log("Ball yetmadi!");
}
\`\`\`

Ball kam. Shuning uchun ikkinchi xabar chiqadi. Foydalanuvchi nima bo'lganini tushunadi.

---

## 3. Birinchi misol

Bu kod sovuq bo'lmaganda nima chiqishini ko'rsatadi.

\`\`\`javascript
let isCold = false; // Tashqarida sovuq emas
if (isCold) { // Savol: sovuqmi?
  console.log("Kurtka kiying!");
} else { // Aks holda:
  console.log("Kurtka kerak emas!");
}
\`\`\`

\`\`\`text
// Natija: Kurtka kerak emas!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let isCold = false;\` — holat saqlandi: sovuq emas.
- \`if (isCold) {\` — savol berildi. Javob \`false\`.
- Birinchi blok tashlab ketildi. U faqat \`true\` da ishlaydi.
- \`else {\` — "aks holda" bloki boshlandi. Birinchi savol yolg'on bo'lgani uchun shu blok ishlaydi.
- \`console.log("Kurtka kerak emas!");\` — ikkinchi xabar chiqadi.

---

## 5. Qadamma-qadam (trace)

Kompyuter qatorlarni qanday bosib o'tadi (\`isCold\` false bo'lganda):

| Qadam | Kod qatori | Tekshiruv | Natija |
|---|---|---|---|
| 1 | \`let isCold = false;\` | — | \`isCold\` false bo'ldi |
| 2 | \`if (isCold) {\` | \`isCold\` true mi? Yo'q | Birinchi blok tashlandi |
| 3 | \`else {\` | Avvalgisi yolg'on | Ikkinchi blokka kirildi |
| 4 | \`console.log(...);\` | — | "Kurtka kerak emas!" chiqdi |

Agar \`isCold\` true bo'lsa, 2-qadamda birinchi blok ishlaydi. 3-4-qadamlar tashlab ketiladi.

---

## 6. Yana bitta misol

Bu kod ball yetganda birinchi xabar chiqishini ko'rsatadi.

\`\`\`javascript
let ball = 120; // Ball yetgan
if (ball > 100) { // Savol: yuzdan kattami?
  console.log("Sovg'a sizniki!");
} else { // Aks holda:
  console.log("Ball yetmadi!");
}
\`\`\`

\`\`\`text
// Natija: Sovg'a sizniki!
\`\`\`

Qator-baqator tahlil:
- \`ball > 100\` — taqqoslash. Natijasi \`true\`.
- Javob rost bo'lgani uchun birinchi blok ishladi.
- \`else\` bloki bu safar tashlab ketildi.

---

## 7. Ko'p uchraydigan xatolar

### 1. else ni yolg'iz yozish
❌ Xato kod:
\`\`\`javascript
else {
  console.log("Salom!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token 'else'\` xatoligi yuz beradi. \`else\` yolg'iz yasholmaydi. Oldida har doim \`if\` bloki bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
let isCold = false;
if (isCold) {
  console.log("Kurtka!");
} else {
  console.log("Salom!");
}
\`\`\`

### 2. else ni xato yozish
❌ Xato kod:
\`\`\`javascript
let isCold = true;
if (isCold) {
  console.log("Kurtka!");
} eles {
  console.log("Salom!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '{'\` xatoligi yuz beradi. \`eles\` degan so'z yo'q. Faqat aniq \`else\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
let isCold = true;
if (isCold) {
  console.log("Kurtka!");
} else {
  console.log("Salom!");
}
\`\`\`

### 3. else ga shart yozish
❌ Xato kod:
\`\`\`javascript
let isCold = true;
if (isCold) {
  console.log("Kurtka!");
} else (isCold) {
  console.log("Salom!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError\` xatoligi yuz beradi. \`else\` yoniga shart yozilmaydi. U shartsiz — "qolgan barcha holatlar" degani. (Shartli ikkinchi yo'l keyingi darsda.)
✅ To'g'ri variant:
\`\`\`javascript
let isCold = true;
if (isCold) {
  console.log("Kurtka!");
} else {
  console.log("Salom!");
}
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`isCold\` ga \`false\` bering. \`if/else\` yozing: rost bo'lsa \`"Kurtka!"\`, aks holda \`"Salomat!"\` chiqsin.

### 2-mashq (O'rtacha)
\`ball\` ga \`60\` bering. \`ball > 100\` rost bo'lsa \`"Sovg'a!"\`, aks holda \`"Ball yetmadi!"\` chiqsin.

### 3-mashq (Chegara holat)
\`age\` ga \`20\` bering. \`age >= 18\` rost bo'lsa \`"Kattalar!"\`, aks holda \`"Bolalar!"\` chiqsin.

### Javoblar:
1.
\`\`\`javascript
let isCold = false;
if (isCold) {
  console.log("Kurtka!");
} else {
  console.log("Salomat!");
}
\`\`\`
2.
\`\`\`javascript
let ball = 60;
if (ball > 100) {
  console.log("Sovg'a!");
} else {
  console.log("Ball yetmadi!");
}
\`\`\`
3.
\`\`\`javascript
let age = 20;
if (age >= 18) {
  console.log("Kattalar!");
} else {
  console.log("Bolalar!");
}
\`\`\`

---

## 9. Xulosa

1. \`else\` — if sharti yolg'on bo'lganda ishlaydigan ikkinchi blok.
2. \`else\` yolg'iz yozilmaydi. Oldida \`if\` bloki bo'lishi shart.
3. \`else\` yoniga shart yozilmaydi. U "qolgan barcha holatlar" degani.

Keyingi darsda: shartli ikkinchi yo'l — \`else if\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Sovuq emas",
      instruction: "`isCold` ga `false` bering. `if/else` yozing: rost bo'lsa `\"Kurtka!\"`, aks holda `\"Salomat!\"` chiqsin.",
      startingCode: "let isCold = false;\n// if/else yozing\n",
      hint: "if (isCold) {\n  console.log(\"Kurtka!\");\n} else {\n  console.log(\"Salomat!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else')) return 'if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salomat'))) return null;\nreturn 'Salomat xabari chiqmadi';"
    },
    {
      id: 2,
      title: "Ball yetmadi",
      instruction: "`ball` ga `60` bering. `ball > 100` rost bo'lsa `\"Sovg'a!\"`, aks holda `\"Yetmadi!\"` chiqsin.",
      startingCode: "let ball = 60;\n// if/else yozing\n",
      hint: "if (ball > 100) {\n  console.log(\"Sovg'a!\");\n} else {\n  console.log(\"Yetmadi!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else')) return 'if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Yetmadi'))) return null;\nreturn 'Yetmadi xabari chiqmadi';"
    },
    {
      id: 3,
      title: "Ball yetdi",
      instruction: "`ball` ga `150` bering. Birinchi xabar chiqsin (`\"Sovg'a!\"`).",
      startingCode: "let ball = 150;\n// if/else yozing\n",
      hint: "if (ball > 100) {\n  console.log(\"Sovg'a!\");\n} else {\n  console.log(\"Yetmadi!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else')) return 'if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Sovg'a\"))) return null;\nreturn 'Sovg\\'a xabari chiqmadi';"
    },
    {
      id: 4,
      title: "Yolg'iz else ni tuzatish",
      instruction: "`else` yolg'iz qolgan. Oldiga `if (isCold)` qo'shing (`isCold = false` berilgan). `\"Salomat!\"` chiqsin.",
      startingCode: "let isCold = false;\nelse {\n  console.log(\"Salomat!\");\n}\n",
      hint: "if (isCold) {\n  console.log(\"Kurtka!\");\n} else {\n  console.log(\"Salomat!\");\n}",
      test: "if (!code.includes('if')) return 'oldiga if qoshishingiz kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salomat'))) return null;\nreturn 'Salomat xabari chiqmadi';"
    },
    {
      id: 5,
      title: "eles ni tuzatish",
      instruction: "`eles` ni `else` ga tuzating (`isCold = true` berilgan). `\"Kurtka!\"` chiqsin.",
      startingCode: "let isCold = true;\nif (isCold) {\n  console.log(\"Kurtka!\");\n} eles {\n  console.log(\"Salomat!\");\n}\n",
      hint: "} else {",
      test: "if (code.includes('eles')) return 'eles ni else deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Kurtka'))) return null;\nreturn 'Kurtka xabari chiqmadi';"
    },
    {
      id: 6,
      title: "Shartli else ni tuzatish",
      instruction: "`else (isCold)` dagi shartni olib tashlang. `\"Kurtka!\"` chiqsin (`isCold = true`).",
      startingCode: "let isCold = true;\nif (isCold) {\n  console.log(\"Kurtka!\");\n} else (isCold) {\n  console.log(\"Salomat!\");\n}\n",
      hint: "} else {",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Kurtka'))) return null;\nreturn 'Kurtka xabari chiqmadi';"
    },
    {
      id: 7,
      title: "Yosh tekshiruvi",
      instruction: "`age = 20` berilgan. `age >= 18` rost bo'lsa `\"Kattalar!\"`, aks holda `\"Bolalar!\"` chiqsin.",
      startingCode: "let age = 20;\n// if/else yozing\n",
      hint: "if (age >= 18) {\n  console.log(\"Kattalar!\");\n} else {\n  console.log(\"Bolalar!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else')) return 'if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Kattalar'))) return null;\nreturn 'Kattalar xabari chiqmadi';"
    },
    {
      id: 8,
      title: "Yosh yetmadi (chegara)",
      instruction: "`age = 15` berilgan. Birinchi emas, ikkinchi xabar chiqsin (`\"Bolalar!\"`).",
      startingCode: "let age = 15;\n// if/else yozing\n",
      hint: "if (age >= 18) {\n  console.log(\"Kattalar!\");\n} else {\n  console.log(\"Bolalar!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else')) return 'if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Bolalar'))) return null;\nreturn 'Bolalar xabari chiqmadi';"
    },
    {
      id: 9,
      title: "Tenglik sharti (chegara)",
      instruction: "`x = 5` berilgan. `x === 5` rost bo'lsa `\"Teng!\"`, aks holda `\"Teng emas!\"` chiqsin.",
      startingCode: "let x = 5;\n// if/else yozing\n",
      hint: "if (x === 5) {\n  console.log(\"Teng!\");\n} else {\n  console.log(\"Teng emas!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else')) return 'if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Teng!'))) return null;\nreturn 'Teng xabari chiqmadi';"
    },
    {
      id: 10,
      title: "Faqat bitta chiqadi (chegara)",
      instruction: "`isRain = true` berilgan. Ikkala xabardan faqat bittasi chiqishini isbotlang: `\"Soyabon!\"` chiqsin, `\"Quyosh!\"` chiqmasin.",
      startingCode: "let isRain = true;\n// if/else yozing\n",
      hint: "if (isRain) {\n  console.log(\"Soyabon!\");\n} else {\n  console.log(\"Quyosh!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else')) return 'if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'Faqat BITTA xabar chiqishi kerak';\nif (out[0].includes('Soyabon')) return null;\nreturn 'Soyabon xabari chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let isCold = false; if (isCold) { console.log(\"A\"); } else { console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "Hech narsa",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Shart yolg'on, shuning uchun else bloki ishlaydi."
    },
    {
      id: 2,
      question: "`let isCold = true; if (isCold) { console.log(\"A\"); } else { console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "B",
        "A",
        "A va B",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Shart rost, birinchi blok ishlaydi. else tashlab ketiladi."
    },
    {
      id: 3,
      question: "`else { console.log(\"Hi\"); }` yolg'iz yozilsa nima bo'ladi?",
      options: [
        "Hi chiqadi",
        "SyntaxError beradi",
        "Hech narsa chiqmaydi",
        "true chiqadi"
      ],
      correctAnswer: 1,
      explanation: "else yolg'iz yasholmaydi. Oldida if bo'lishi shart."
    },
    {
      id: 4,
      question: "`} eles {` yozilsa nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Ogohlantirish beradi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "eles degan so'z yo'q. Faqat aniq else yoziladi."
    },
    {
      id: 5,
      question: "`} else (isCold) {` yozilsa nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Ogohlantirish beradi",
        "Shart tekshiriladi"
      ],
      correctAnswer: 1,
      explanation: "else yoniga shart yozilmaydi. U shartsiz blok."
    },
    {
      id: 6,
      question: "`let ball = 60; if (ball > 100) { console.log(\"A\"); } else { console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "A va B",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "60 > 100 false, shuning uchun else bloki ishlaydi."
    },
    {
      id: 7,
      question: "if/else juftligida nechta blok ishlaydi?",
      options: [
        "Ikkalasi ham",
        "Faqat bittasi",
        "Hech biri",
        "Uchtasi"
      ],
      correctAnswer: 1,
      explanation: "Har doim bittasi: rost bo'lsa birinchi, yolg'on bo'lsa ikkinchi."
    },
    {
      id: 8,
      question: "`let age = 20; if (age >= 18) { console.log(\"A\"); } else { console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "B",
        "A",
        "A va B",
        "20"
      ],
      correctAnswer: 1,
      explanation: "20 >= 18 true, birinchi blok ishlaydi."
    },
    {
      id: 9,
      question: "`let age = 15; if (age >= 18) { console.log(\"A\"); } else { console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "15",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "15 >= 18 false, ikkinchi blok ishlaydi."
    },
    {
      id: 10,
      question: "else bloki qachon tashlab ketiladi?",
      options: [
        "if sharti rost bo'lganda",
        "if sharti yolg'on bo'lganda",
        "Har doim",
        "Hech qachon"
      ],
      correctAnswer: 0,
      explanation: "Rost bo'lsa birinchi blok ishlaydi, else kerak emas."
    },
    {
      id: 11,
      question: "`let x = 5; if (x === 5) { console.log(\"A\"); } else { console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "B",
        "A",
        "5",
        "true"
      ],
      correctAnswer: 1,
      explanation: "x === 5 true, birinchi blok ishlaydi."
    },
    {
      id: 12,
      question: "else nimani bildiradi?",
      options: [
        "Yangi shart",
        "Aks holda (qolgan barcha holatlar)",
        "Xatolik",
        "Takrorlash"
      ],
      correctAnswer: 1,
      explanation: "else — shart bajarilmaganda ishlaydigan muqobil blok."
    }
  ]
};
