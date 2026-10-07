export const parametersLesson = {
  id: "parametersLesson",
  title: "Parametr va Argument",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, oshxonada retsept bor: "Palov". Lekin har safar har xil go'sht solasiz: bugun mol, ertaga tovuq. Retsept bir xil. Faqat kiruvchi mahsulot o'zgaradi.

Dasturlashda funksiya ham shunday. Ichidagi kod bir xil. Lekin har chaqiruvda boshqa qiymat beriladi.

Parametr — e'lon paytida qavs ichiga yoziladigan nom (qabul qiluvchi). Argument — chaqiruv paytida beriladigan haqiqiy qiymat (yuboruvchi).

---

## 2. Nega kerak?

Uch kishiga salom berish kerak: Ali, Vali, Guli. Parametrsiz uchta funksiya yoziladi:

\`\`\`javascript
function salomAli() {
  console.log("Salom, Ali!");
}
function salomVali() {
  console.log("Salom, Vali!");
}
function salomGuli() {
  console.log("Salom, Guli!");
}
\`\`\`

Uch nusxa. Faqat ism farq qiladi.

Muammo shunda: bir xil ishni har xil qiymat bilan takrorlash kerak. Yechim — parametr. Bitta funksiya. Har safar boshqa argument:

\`\`\`javascript
function salom(ism) {
  console.log("Salom!");
  console.log(ism);
}
salom("Ali");
salom("Vali");
\`\`\`

---

## 3. Birinchi misol

Bu kod bitta parametrli funksiyani e'lon qiladi va chaqiradi.

\`\`\`javascript
function salom(ism) { // ism — parametr
  console.log(ism); // Berilgan qiymat chiqadi
}
salom("Ali"); // "Ali" — argument
\`\`\`

\`\`\`text
// Natija: Ali
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function salom(ism) {\` — e'lon. Qavs ichidagi \`ism\` — parametr. Bo'sh o'rin. Hali qiymat yo'q.
- \`console.log(ism);\` — funksiya ichida parametr oddiy o'zgaruvchidek ishlatiladi.
- \`salom("Ali");\` — chaqiruv. Qavs ichidagi \`"Ali"\` — argument. Haqiqiy qiymat.
- Chaqiruvda argument parametr o'rniga o'tiradi. Natijada \`Ali\` chiqadi.

---

## 5. Qadamma-qadam (trace)

Qiymat qanday uzatiladi:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`function salom(ism) {\` ... \`}\` | E'lon | Saqlandi, \`ism\` bo'sh |
| 2 | \`salom("Ali");\` | Chaqiruv | \`"Ali"\` ismga o'tdi |
| 3 | \`console.log(ism);\` | — | Ali chiqdi |

---

## 6. Yana bitta misol

Bu kod ikkita parametrli funksiyani ko'rsatadi.

\`\`\`javascript
function tanish(ism, yosh) { // Ikkita parametr
  console.log(ism); // Birinchi qiymat chiqadi
  console.log(yosh); // Ikkinchi qiymat chiqadi
}
tanish("Ali", 20); // Ikkita argument
\`\`\`

\`\`\`text
// Natija:
Ali
20
\`\`\`

Qator-baqator tahlil:
- \`(ism, yosh)\` — ikkita parametr. Vergul bilan ajratiladi. Tartib muhim.
- \`("Ali", 20)\` — ikkita argument. Birinchi birinchi o'ringa, ikkinchi ikkinchi o'ringa o'tadi.
- Natijada \`Ali\` va \`20\` chiqadi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Parametrga let yozish
❌ Xato kod:
\`\`\`javascript
function salom(let ism) {
  console.log(ism);
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'ism'\` xatoligi yuz beradi. Parametr o'zgaruvchi emas. \`let\` yozilmaydi. Faqat nom yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
function salom(ism) {
  console.log(ism);
}
\`\`\`

### 2. Argument bermaslik
❌ Xato kod:
\`\`\`javascript
function salom(ism) {
  console.log(ism);
}
salom();
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin \`undefined\` chiqadi. Sababi: parametrga hech narsa kelmadi. Bo'sh o'rin bo'shligicha qoldi.
✅ To'g'ri variant:
\`\`\`javascript
function salom(ism) {
  console.log(ism);
}
salom("Ali"); // Argument beriladi
\`\`\`

### 3. Tartibni aralashtirish
❌ Xato kod:
\`\`\`javascript
function tanish(ism, yosh) {
  console.log(ism);
  console.log(yosh);
}
tanish(20, "Ali");
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin \`20\` va \`Ali\` chiqadi. Teskari. Sababi: argumentlar tartib bo'yicha o'tadi. Birinchi — birinchi o'ringa.
✅ To'g'ri variant:
\`\`\`javascript
function tanish(ism, yosh) {
  console.log(ism);
  console.log(yosh);
}
tanish("Ali", 20); // Tartib to'g'ri
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`salom(ism)\` funksiyasini e'lon qiling (ichida \`ism\` chiqsin). \`"Ali"\` bilan chaqiring.

### 2-mashq (O'rtacha)
\`tanish(ism, yosh)\` funksiyasini e'lon qiling (ikkalsini chiqarsin). \`"Ali"\`, \`20\` bilan chaqiring.

### 3-mashq (Chegara holat)
Argument bermasdan chaqiring: \`salom()\`. \`undefined\` chiqishini tasdiqlang (bu xato emas).

### Javoblar:
1.
\`\`\`javascript
function salom(ism) {
  console.log(ism);
}
salom("Ali");
\`\`\`
2.
\`\`\`javascript
function tanish(ism, yosh) {
  console.log(ism);
  console.log(yosh);
}
tanish("Ali", 20);
\`\`\`
3.
\`\`\`javascript
function salom(ism) {
  console.log(ism);
}
salom(); // undefined chiqadi
\`\`\`

---

## 9. Xulosa

1. Parametr — e'londagi nom. Argument — chaqiruvdagi qiymat.
2. Argument parametr o'rniga tartib bo'yicha o'tadi.
3. Argument berilmasa, parametr \`undefined\` bo'lib qoladi.

Keyingi darsda: funksiyadan qiymat qaytaradigan \`return\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Bitta parametr",
      instruction: "`salom(ism)` funksiyasini e'lon qiling (ichida `ism` chiqsin). `\"Ali\"` bilan chaqiring.",
      startingCode: "// salom(ism) ni e'lon qiling va chaqiring\n",
      hint: "function salom(ism) {\n  console.log(ism);\n}\nsalom(\"Ali\");",
      test: "if (!code.includes('function salom')) return 'funksiyani elon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali'))) return null;\nreturn 'Ali chiqmadi';"
    },
    {
      id: 2,
      title: "Boshqa argument",
      instruction: "`salom(ism)` funksiyasini e'lon qiling. `\"Vali\"` bilan chaqiring.",
      startingCode: "// salom(ism) ni e'lon qiling va Vali bilan chaqiring\n",
      hint: "function salom(ism) {\n  console.log(ism);\n}\nsalom(\"Vali\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Vali'))) return null;\nreturn 'Vali chiqmadi';"
    },
    {
      id: 3,
      title: "Ikkita parametr",
      instruction: "`tanish(ism, yosh)` ni e'lon qiling (ikkalsini chiqarsin). `\"Ali\"`, `20` bilan chaqiring.",
      startingCode: "// tanish(ism, yosh) ni e'lon qiling va chaqiring\n",
      hint: "function tanish(ism, yosh) {\n  console.log(ism);\n  console.log(yosh);\n}\ntanish(\"Ali\", 20);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'Ali,20') return null;\nreturn 'Ali va 20 chiqishi kerak';"
    },
    {
      id: 4,
      title: "let xatosini tuzatish",
      instruction: "`function salom(let ism)` dagi `let` ni olib tashlang. `\"Ali\"` bilan chaqiring.",
      startingCode: "function salom(let ism) {\n  console.log(ism);\n}\nsalom(\"Ali\");\n",
      hint: "function salom(ism) {",
      test: "if (code.includes('let ism')) return 'parametrda let yozilmaydi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali'))) return null;\nreturn 'Ali chiqmadi';"
    },
    {
      id: 5,
      title: "Argument qo'shish",
      instruction: "`salom();` bo'sh chaqirilmoqda. `\"Ali\"` argumentini qo'shing.",
      startingCode: "function salom(ism) {\n  console.log(ism);\n}\nsalom();\n",
      hint: "salom(\"Ali\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Ali'))) return null;\nreturn 'Ali chiqmadi';"
    },
    {
      id: 6,
      title: "Tartibni tuzatish (chegara)",
      instruction: "`tanish(20, \"Ali\")` teskari yozilgan. To'g'rilang: `Ali` va `20` chiqsin.",
      startingCode: "function tanish(ism, yosh) {\n  console.log(ism);\n  console.log(yosh);\n}\ntanish(20, \"Ali\");\n",
      hint: "tanish(\"Ali\", 20);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'Ali,20') return null;\nreturn 'Ali va 20 (shu tartibda) chiqishi kerak';"
    },
    {
      id: 7,
      title: "Son argument (chegara)",
      instruction: "`yosh(qiymat)` funksiyasini e'lon qiling (ichida `qiymat` chiqsin). `25` bilan chaqiring.",
      startingCode: "// yosh(qiymat) ni e'lon qiling va 25 bilan chaqiring\n",
      hint: "function yosh(qiymat) {\n  console.log(qiymat);\n}\nyosh(25);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '25')) return null;\nreturn '25 chiqmadi';"
    },
    {
      id: 8,
      title: "Mantiqiy argument (chegara)",
      instruction: "`holat(qiymat)` ni e'lon qiling. `true` bilan chaqiring.",
      startingCode: "// holat(qiymat) ni e'lon qiling va true bilan chaqiring\n",
      hint: "function holat(qiymat) {\n  console.log(qiymat);\n}\nholat(true);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'true')) return null;\nreturn 'true chiqmadi';"
    },
    {
      id: 9,
      title: "Uchta parametr (chegara)",
      instruction: "`info(a, b, c)` ni e'lon qiling (uchalasini chiqarsin). `\"X\"`, `\"Y\"`, `\"Z\"` bilan chaqiring.",
      startingCode: "// info(a, b, c) ni e'lon qiling va chaqiring\n",
      hint: "function info(a, b, c) {\n  console.log(a);\n  console.log(b);\n  console.log(c);\n}\ninfo(\"X\", \"Y\", \"Z\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'X,Y,Z') return null;\nreturn 'X, Y, Z chiqishi kerak';"
    },
    {
      id: 10,
      title: "Ikki marta turli argument (chegara)",
      instruction: "`salom(ism)` ni e'lon qiling. Avval `\"Ali\"`, keyin `\"Vali\"` bilan chaqiring (ikkalsi ham chiqsin).",
      startingCode: "function salom(ism) {\n  console.log(ism);\n}\n// Ikki marta chaqiring\n",
      hint: "salom(\"Ali\");\nsalom(\"Vali\");",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'Ali,Vali') return null;\nreturn 'Ali va Vali chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`function salom(ism) { console.log(ism); } salom(\"Ali\");` nima chiqaradi?",
      options: [
        "ism",
        "Ali",
        "undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Argument parametr o'rniga o'tadi: ism Ali bo'ladi."
    },
    {
      id: 2,
      question: "Parametr bilan argument farqi nima?",
      options: [
        "Farqi yo'q",
        "Parametr e'londagi nom, argument chaqiruvdagi qiymat",
        "Argument e'londagi nom, parametr chaqiruvdagi qiymat",
        "Ikkalasi ham qiymat"
      ],
      correctAnswer: 1,
      explanation: "Parametr — bo'sh o'rin. Argument — haqiqiy qiymat."
    },
    {
      id: 3,
      question: "`function salom(ism) { console.log(ism); } salom();` nima chiqaradi?",
      options: [
        "Xatolik",
        "undefined",
        "Bo'sh qator",
        "ism"
      ],
      correctAnswer: 1,
      explanation: "Argument kelmagan. Parametr bo'sh qolgan: undefined."
    },
    {
      id: 4,
      question: "`function salom(let ism) { ... }` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Ogohlantirish beradi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Parametrda let yozilmaydi. Faqat nom yoziladi."
    },
    {
      id: 5,
      question: "`function tanish(ism, yosh) { console.log(ism); console.log(yosh); } tanish(\"Ali\", 20);` nima chiqaradi?",
      options: [
        "20, Ali",
        "Ali, 20",
        "Xatolik",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Tartib bo'yicha o'tadi: birinchi birinchi o'ringa."
    },
    {
      id: 6,
      question: "`function tanish(ism, yosh) { console.log(ism); console.log(yosh); } tanish(20, \"Ali\");` nima chiqaradi?",
      options: [
        "Ali, 20",
        "20, Ali",
        "Xatolik",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "Tartib teskari berilgan: birinchi 20 chiqadi."
    },
    {
      id: 7,
      question: "Argument qayerda yoziladi?",
      options: [
        "E'londa",
        "Chaqiruvda",
        "Ikkalasida ham",
        "Hech qayerda"
      ],
      correctAnswer: 1,
      explanation: "Haqiqiy qiymat chaqiruv paytida beriladi."
    },
    {
      id: 8,
      question: "`function yosh(qiymat) { console.log(qiymat); } yosh(25);` nima chiqaradi?",
      options: [
        "qiymat",
        "25",
        "undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "25 qiymat o'rniga o'tadi."
    },
    {
      id: 9,
      question: "`function info(a, b, c) { console.log(a); console.log(b); console.log(c); } info(\"X\", \"Y\", \"Z\");` nima chiqaradi?",
      options: [
        "X, Y",
        "X, Y, Z",
        "Z, Y, X",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Uchala argument o'z o'rniga o'tadi."
    },
    {
      id: 10,
      question: "`function salom(ism) { console.log(ism); } salom(\"Ali\"); salom(\"Vali\");` nima chiqaradi?",
      options: [
        "Faqat Ali",
        "Ali, Vali",
        "Faqat Vali",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Har chaqiruvda yangi argument keladi."
    },
    {
      id: 11,
      question: "Parametr ichida nima turadi (e'lon paytida)?",
      options: [
        "Haqiqiy qiymat",
        "Bo'sh o'rin (nom)",
        "Natija",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "E'londa faqat nom bo'ladi. Qiymat keyin keladi."
    },
    {
      id: 12,
      question: "`function holat(qiymat) { console.log(qiymat); } holat(true);` nima chiqaradi?",
      options: [
        "qiymat",
        "true",
        "undefined",
        "1"
      ],
      correctAnswer: 1,
      explanation: "true argument sifatida o'tadi."
    }
  ]
};
