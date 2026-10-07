export const elseIfLesson = {
  id: "elseIfLesson",
  title: "else if (Ketma-ket shartlar)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, svetofor oldidasiz. Uchta rang bor:
- Yashil bo'lsa — yuring.
- Sariq bo'lsa — tayyorlaning.
- Qizil bo'lsa — to'xtang.

Ikkita yo'l yetmaydi. Uchta holat bor. Har biriga alohida javob kerak.

Dasturlashda \`else if\` xuddi shu ikkinchi, uchinchi belgi. Birinchi shart yolg'on bo'lsa, keyingi shart tekshiriladi.

else if — oldingi shart bajarilmaganda, yangi shart tekshiradigan qo'shimcha yo'ldir.

---

## 2. Nega kerak?

Baholash qoidasi bor: 90 dan yuqori — "A'lo", 70 dan yuqori — "Yaxshi", qolganlari — "Qoniqarsiz". Uchta holat.

Muammo shunda: \`if/else\` da faqat ikkita yo'l bor. Uchinchi holat sig'maydi. Yechim — \`else if\`:

\`\`\`javascript
let ball = 85;
if (ball > 90) {
  console.log("A'lo!");
} else if (ball > 70) {
  console.log("Yaxshi!");
} else {
  console.log("Qoniqarsiz!");
}
\`\`\`

Ball 85. Birinchi shart yolg'on. Ikkinchi shart rost. "Yaxshi!" chiqadi.

---

## 3. Birinchi misol

Bu kod ikkinchi yo'l ishlashini ko'rsatadi.

\`\`\`javascript
let ball = 85; // Ball
if (ball > 90) { // Birinchi savol
  console.log("A'lo!");
} else if (ball > 70) { // Ikkinchi savol
  console.log("Yaxshi!");
} else { // Qolgan holatlar
  console.log("Qoniqarsiz!");
}
\`\`\`

\`\`\`text
// Natija: Yaxshi!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let ball = 85;\` — ball saqlandi.
- \`if (ball > 90) {\` — birinchi savol. \`85 > 90\` yolg'on. Birinchi blok tashlandi.
- \`else if (ball > 70) {\` — ikkinchi savol. \`85 > 70\` rost. Shu blokka kirildi.
- \`console.log("Yaxshi!");\` — ikkinchi xabar chiqadi.
- \`else {\` bloki bu safar tashlab ketildi.

---

## 5. Qadamma-qadam (trace)

Kompyuter shartlarni ketma-ket tekshiradi. Birinchisi rost bo'lishi bilan to'xtaydi:

| Qadam | Kod qatori | Tekshiruv | Natija |
|---|---|---|---|
| 1 | \`let ball = 85;\` | — | \`ball\` 85 bo'ldi |
| 2 | \`if (ball > 90) {\` | 85 > 90? Yo'q | Birinchi blok tashlandi |
| 3 | \`else if (ball > 70) {\` | 85 > 70? Ha | Ikkinchi blokka kirildi |
| 4 | \`console.log(...);\` | — | "Yaxshi!" chiqdi |

Qolgan bloklar tekshirilmaydi. Har doim faqat bitta blok ishlaydi.

---

## 6. Yana bitta misol

Bu kod birinchi yo'l ishlashini ko'rsatadi.

\`\`\`javascript
let ball = 95; // Ball yuqori
if (ball > 90) { // Birinchi savol
  console.log("A'lo!");
} else if (ball > 70) { // Ikkinchi savol
  console.log("Yaxshi!");
} else { // Qolgan holatlar
  console.log("Qoniqarsiz!");
}
\`\`\`

\`\`\`text
// Natija: A'lo!
\`\`\`

Qator-baqator tahlil:
- \`ball > 90\` — rost. Birinchi blok darhol ishladi.
- Qolgan \`else if\` va \`else\` bloklari tekshirilmasdan tashlab ketildi.

---

## 7. Ko'p uchraydigan xatolar

### 1. else if ni yolg'iz yozish
❌ Xato kod:
\`\`\`javascript
let a = 1;
else if (a > 0) {
  console.log("Musbat!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token 'else'\` xatoligi yuz beradi. \`else if\` ham yolg'iz yasholmaydi. Oldida har doim \`if\` bloki bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
let a = 1;
if (a > 0) {
  console.log("Musbat!");
} else if (a < 0) {
  console.log("Manfiy!");
}
\`\`\`

### 2. elseif ni qo'shib yozish
❌ Xato kod:
\`\`\`javascript
let a = 1;
if (a > 0) {
  console.log("Musbat!");
} elseif (a < 0) {
  console.log("Manfiy!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '{'\` xatoligi yuz beradi. \`elseif\` degan so'z yo'q. Ikkita alohida so'z yoziladi: \`else if\`.
✅ To'g'ri variant:
\`\`\`javascript
let a = 1;
if (a > 0) {
  console.log("Musbat!");
} else if (a < 0) {
  console.log("Manfiy!");
}
\`\`\`

### 3. Bir nechta blok ishlaydi deb o'ylash
❌ Xato tushuncha: ball 95 bo'lganda "A'lo!" ham, "Yaxshi!" ham chiqadi deb o'ylash.
Nima bo'ladi: faqat "A'lo!" chiqadi. Birinchi rost shart topilishi bilan qolganlari tekshirilmaydi.
✅ To'g'ri variant:
\`\`\`javascript
let ball = 95;
if (ball > 90) {
  console.log("A'lo!"); // Faqat shu chiqadi
} else if (ball > 70) {
  console.log("Yaxshi!"); // Bu ishlamaydi
}
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`ball\` ga \`85\` bering. Uch yo'lli tekshiruv yozing: \`> 90\` bo'lsa \`"A'lo!"\`, \`> 70\` bo'lsa \`"Yaxshi!"\`, aks holda \`"Past!"\` chiqsin.

### 2-mashq (O'rtacha)
\`temp\` ga \`30\` bering. \`> 35\` bo'lsa \`"Issiq!"\`, \`> 20\` bo'lsa \`"Iliq!"\`, aks holda \`"Sovuq!"\` chiqsin.

### 3-mashq (Chegara holat)
\`n\` ga \`0\` bering. \`> 0\` bo'lsa \`"Musbat!"\`, \`0\` ga teng bo'lsa (\`n === 0\`) \`"Nol!"\`, aks holda \`"Manfiy!"\` chiqsin.

### Javoblar:
1.
\`\`\`javascript
let ball = 85;
if (ball > 90) {
  console.log("A'lo!");
} else if (ball > 70) {
  console.log("Yaxshi!");
} else {
  console.log("Past!");
}
\`\`\`
2.
\`\`\`javascript
let temp = 30;
if (temp > 35) {
  console.log("Issiq!");
} else if (temp > 20) {
  console.log("Iliq!");
} else {
  console.log("Sovuq!");
}
\`\`\`
3.
\`\`\`javascript
let n = 0;
if (n > 0) {
  console.log("Musbat!");
} else if (n === 0) {
  console.log("Nol!");
} else {
  console.log("Manfiy!");
}
\`\`\`

---

## 9. Xulosa

1. \`else if\` — birinchi shart yolg'on bo'lganda tekshiriladigan qo'shimcha yo'l.
2. \`else if\` yolg'iz yozilmaydi. Oldida \`if\` bo'lishi shart. Ikkita so'z ajratib yoziladi.
3. Har doim faqat bitta blok ishlaydi — birinchi rost topilgan zahoti qolganlari tashlanadi.

Keyingi darsda: ko'p yo'lli tanlov — \`switch\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Baho aniqlash",
      instruction: "`ball` ga `85` bering. `> 90` bo'lsa `\"A'lo!\"`, `> 70` bo'lsa `\"Yaxshi!\"`, aks holda `\"Past!\"` chiqsin.",
      startingCode: "let ball = 85;\n// if / else if / else yozing\n",
      hint: "if (ball > 90) {\n  console.log(\"A'lo!\");\n} else if (ball > 70) {\n  console.log(\"Yaxshi!\");\n} else {\n  console.log(\"Past!\");\n}",
      test: "if (!code.includes('if') || !code.includes('else if') || !code.includes('else')) return 'if, else if va else ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Yaxshi'))) return null;\nreturn 'Yaxshi xabari chiqmadi';"
    },
    {
      id: 2,
      title: "Harorat holati",
      instruction: "`temp` ga `30` bering. `> 35` bo'lsa `\"Issiq!\"`, `> 20` bo'lsa `\"Iliq!\"`, aks holda `\"Sovuq!\"` chiqsin.",
      startingCode: "let temp = 30;\n// if / else if / else yozing\n",
      hint: "if (temp > 35) {\n  console.log(\"Issiq!\");\n} else if (temp > 20) {\n  console.log(\"Iliq!\");\n} else {\n  console.log(\"Sovuq!\");\n}",
      test: "if (!code.includes('else if')) return 'else if ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Iliq'))) return null;\nreturn 'Iliq xabari chiqmadi';"
    },
    {
      id: 3,
      title: "Birinchi yo'l",
      instruction: "`ball` ga `95` bering. Birinchi xabar chiqsin (`\"A'lo!\"`).",
      startingCode: "let ball = 95;\n// if / else if / else yozing\n",
      hint: "if (ball > 90) {\n  console.log(\"A'lo!\");\n} else if (ball > 70) {\n  console.log(\"Yaxshi!\");\n} else {\n  console.log(\"Past!\");\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'Faqat BITTA xabar chiqishi kerak';\nif (out[0].includes(\"A'lo\")) return null;\nreturn 'A\\'lo xabari chiqmadi';"
    },
    {
      id: 4,
      title: "Oxirgi yo'l",
      instruction: "`ball` ga `50` bering. Oxirgi xabar chiqsin (`\"Past!\"`).",
      startingCode: "let ball = 50;\n// if / else if / else yozing\n",
      hint: "if (ball > 90) {\n  console.log(\"A'lo!\");\n} else if (ball > 70) {\n  console.log(\"Yaxshi!\");\n} else {\n  console.log(\"Past!\");\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Past'))) return null;\nreturn 'Past xabari chiqmadi';"
    },
    {
      id: 5,
      title: "Yolg'iz else if ni tuzatish",
      instruction: "`else if` yolg'iz qolgan. Oldiga `if (a > 0)` qo'shing (`a = 1` berilgan). `\"Musbat!\"` chiqsin.",
      startingCode: "let a = 1;\nelse if (a > 0) {\n  console.log(\"Musbat!\");\n}\n",
      hint: "if (a > 0) {\n  console.log(\"Musbat!\");\n}",
      test: "if (!code.includes('if (a > 0)')) return 'oldiga if qoshishingiz kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Musbat'))) return null;\nreturn 'Musbat xabari chiqmadi';"
    },
    {
      id: 6,
      title: "elseif ni tuzatish",
      instruction: "`elseif` ni `else if` ga ajrating (`a = -5` berilgan, ikkinchi xabar chiqsin).",
      startingCode: "let a = -5;\nif (a > 0) {\n  console.log(\"Musbat!\");\n} elseif (a < 0) {\n  console.log(\"Manfiy!\");\n}\n",
      hint: "} else if (a < 0) {",
      test: "if (code.includes('elseif')) return 'elseif ni else if deb ajrating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Manfiy'))) return null;\nreturn 'Manfiy xabari chiqmadi';"
    },
    {
      id: 7,
      title: "Nol holati",
      instruction: "`n` ga `0` bering. `> 0` bo'lsa `\"Musbat!\"`, `=== 0` bo'lsa `\"Nol!\"`, aks holda `\"Manfiy!\"` chiqsin.",
      startingCode: "let n = 0;\n// if / else if / else yozing\n",
      hint: "if (n > 0) {\n  console.log(\"Musbat!\");\n} else if (n === 0) {\n  console.log(\"Nol!\");\n} else {\n  console.log(\"Manfiy!\");\n}",
      test: "if (!code.includes('else if')) return 'else if ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Nol'))) return null;\nreturn 'Nol xabari chiqmadi';"
    },
    {
      id: 8,
      title: "Manfiy holat (chegara)",
      instruction: "`n` ga `-3` bering. Uchinchi xabar chiqsin (`\"Manfiy!\"`).",
      startingCode: "let n = -3;\n// if / else if / else yozing\n",
      hint: "if (n > 0) {\n  console.log(\"Musbat!\");\n} else if (n === 0) {\n  console.log(\"Nol!\");\n} else {\n  console.log(\"Manfiy!\");\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Manfiy'))) return null;\nreturn 'Manfiy xabari chiqmadi';"
    },
    {
      id: 9,
      title: "Yosh toifasi (chegara)",
      instruction: "`age = 10` berilgan. `>= 18` bo'lsa `\"Katta!\"`, `>= 7` bo'lsa `\"Bola!\"`, aks holda `\"Chaqaloq!\"` chiqsin.",
      startingCode: "let age = 10;\n// if / else if / else yozing\n",
      hint: "if (age >= 18) {\n  console.log(\"Katta!\");\n} else if (age >= 7) {\n  console.log(\"Bola!\");\n} else {\n  console.log(\"Chaqaloq!\");\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Bola'))) return null;\nreturn 'Bola xabari chiqmadi';"
    },
    {
      id: 10,
      title: "Bitta blok qoidasi (chegara)",
      instruction: "`ball = 95` berilgan. Uch yo'l yozing. Faqat BITTA xabar chiqishini isbotlang (`\"A'lo!\"`).",
      startingCode: "let ball = 95;\n// if / else if / else yozing\n",
      hint: "if (ball > 90) {\n  console.log(\"A'lo!\");\n} else if (ball > 70) {\n  console.log(\"Yaxshi!\");\n} else {\n  console.log(\"Past!\");\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'Faqat BITTA xabar chiqishi kerak';\nif (out[0].includes(\"A'lo\")) return null;\nreturn 'A\\'lo xabari chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let ball = 85; if (ball > 90) { console.log(\"A\"); } else if (ball > 70) { console.log(\"B\"); } else { console.log(\"C\"); }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "C",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Birinchi yolg'on, ikkinchi rost. B chiqadi."
    },
    {
      id: 2,
      question: "`let ball = 95; if (ball > 90) { console.log(\"A\"); } else if (ball > 70) { console.log(\"B\"); } else { console.log(\"C\"); }` nima chiqaradi?",
      options: [
        "B",
        "A",
        "A va B",
        "C"
      ],
      correctAnswer: 1,
      explanation: "Birinchi rost bo'lishi bilan qolganlari tekshirilmaydi."
    },
    {
      id: 3,
      question: "`let ball = 50; if (ball > 90) { console.log(\"A\"); } else if (ball > 70) { console.log(\"B\"); } else { console.log(\"C\"); }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "C",
        "Hech narsa"
      ],
      correctAnswer: 2,
      explanation: "Ikkalasi ham yolg'on, oxirgi blok ishlaydi."
    },
    {
      id: 4,
      question: "`else if` yolg'iz yozilsa nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Ogohlantirish beradi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "else if ham yolg'iz yasholmaydi. Oldida if shart."
    },
    {
      id: 5,
      question: "`} elseif (a < 0) {` yozilsa nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Ogohlantirish beradi",
        "Shart tekshiriladi"
      ],
      correctAnswer: 1,
      explanation: "elseif degan so'z yo'q. else if ajratib yoziladi."
    },
    {
      id: 6,
      question: "Nechta blok ishlaydi?",
      options: [
        "Hammasi",
        "Faqat bittasi",
        "Ikkita",
        "Hech biri"
      ],
      correctAnswer: 1,
      explanation: "Birinchi rost topilishi bilan qolganlari tashlanadi."
    },
    {
      id: 7,
      question: "`let temp = 30; if (temp > 35) { console.log(\"A\"); } else if (temp > 20) { console.log(\"B\"); } else { console.log(\"C\"); }` nima chiqaradi?",
      options: [
        "A",
        "C",
        "B",
        "Xatolik"
      ],
      correctAnswer: 2,
      explanation: "30 > 35 yolg'on, 30 > 20 rost. B chiqadi."
    },
    {
      id: 8,
      question: "`let n = 0; if (n > 0) { console.log(\"A\"); } else if (n === 0) { console.log(\"B\"); } else { console.log(\"C\"); }` nima chiqaradi?",
      options: [
        "A",
        "C",
        "B",
        "Hech narsa"
      ],
      correctAnswer: 2,
      explanation: "Birinchi yolg'on, ikkinchi rost (0 === 0). B chiqadi."
    },
    {
      id: 9,
      question: "`let n = -3; if (n > 0) { console.log(\"A\"); } else if (n === 0) { console.log(\"B\"); } else { console.log(\"C\"); }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "C",
        "Xatolik"
      ],
      correctAnswer: 2,
      explanation: "Ikkalasi ham yolg'on, oxirgi C chiqadi."
    },
    {
      id: 10,
      question: "else if dagi if nimani bildiradi?",
      options: [
        "Yangi mustaqil shart",
        "Oldingi shart takrori",
        "Xatolik",
        "Takrorlash"
      ],
      correctAnswer: 0,
      explanation: "else if — yangi shartli qo'shimcha yo'l."
    },
    {
      id: 11,
      question: "`let age = 10; if (age >= 18) { console.log(\"A\"); } else if (age >= 7) { console.log(\"B\"); } else { console.log(\"C\"); }` nima chiqaradi?",
      options: [
        "A",
        "C",
        "B",
        "10"
      ],
      correctAnswer: 2,
      explanation: "10 >= 18 yolg'on, 10 >= 7 rost. B chiqadi."
    },
    {
      id: 12,
      question: "else if yozuvida nechta so'z bor?",
      options: [
        "Bitta (elseif)",
        "Ikkita (else if)",
        "Uchta",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Ikkita alohida so'z: else if."
    }
  ]
};
