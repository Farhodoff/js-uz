export const arrowBasics = {
  id: "arrowBasics",
  title: "Arrow Funksiya: () => {}",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, ikkita yo'l yozuvi bor. Biri uzun: "Toshkent shahriga borish uchun shu yo'ldan yuring". Ikkinchisi qisqa: "Toshkent →". Ikkalasi ham bir joyga olib boradi. Qisqasi tez o'qiladi.

Dasturlashda ham funksiyani ikki xil yozish mumkin. Uzuni — \`function\`. Qisqasi — arrow (o'q) funksiya.

Arrow funksiya — \`=>\` (tenglik va katta belgisi) orqali yoziladigan qisqa funksiya ko'rinishidir.

---

## 2. Nega kerak?

Oddiy funksiya besh qatorda yoziladi:

\`\`\`javascript
function qosh(a, b) {
  return a + b;
}
\`\`\`

Lekin ish juda oddiy: ikkita sonni qo'shish. Besh qator ortiqcha.

Muammo shunda: kichik ishlar uchun yozuv uzun. Yechim — arrow. Bir qatorda ham e'lon, ham natija:

\`\`\`javascript
const qosh = (a, b) => a + b;
\`\`\`

Qisqa. O'qilishi oson. Natija avtomatik qaytariladi.

---

## 3. Birinchi misol

Bu kod arrow funksiyani e'lon qiladi va chaqiradi.

\`\`\`javascript
const qosh = (a, b) => a + b; // Qisqa funksiya
console.log(qosh(2, 3)); // 5 chiqadi
\`\`\`

\`\`\`text
// Natija: 5
\`\`\`

---

## 4. Qator-baqator tahlil

- \`const qosh = ...;\` — funksiya o'zgaruvchiga saqlanadi. Shuning uchun \`const\` ishlatiladi.
- \`(a, b)\` — parametrlar. Oddiy funksiyadagi kabi.
- \`=>\` — o'q belgisi. " Mana natija" degani. \`function\` va \`return\` so'zlari tushib qolgan.
- \`a + b\` — natija. Avtomatik qaytariladi. \`return\` yozish shart emas.
- \`qosh(2, 3)\` — chaqiruv bir xil. Natija \`5\` chiqadi.

---

## 5. Qadamma-qadam (trace)

Qiymat qanday o'tadi:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`const qosh = (a, b) => a + b;\` | E'lon | Saqlandi |
| 2 | \`qosh(2, 3);\` | Chaqiruv | a = 2, b = 3 bo'ldi |
| 3 | \`a + b\` | Hisoblash | 5 qaytarildi |
| 4 | \`console.log(...);\` | — | 5 chiqdi |

---

## 6. Yana bitta misol

Bu kod matn qaytaradigan arrow funksiyani ko'rsatadi.

\`\`\`javascript
const salom = (ism) => "Salom!"; // Bitta parametr
console.log(salom("Ali")); // Salom! chiqadi
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

Qator-baqator tahlil:
- \`(ism)\` — bitta parametr. Qavs shart.
- \`"Salom!"\` — natija. Avtomatik qaytarildi.
- \`salom("Ali")\` — chaqiruv bir xil. Parametr ishlatilmasa ham bo'ladi.

---

## 7. Ko'p uchraydigan xatolar

### 1. O'q belgisini unutish
❌ Xato kod:
\`\`\`javascript
const qosh = (a, b) a + b;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'a'\` xatoligi yuz beradi. Parametr bilan natija orasida har doim \`=>\` bo'ladi.
✅ To'g'ri variant:
\`\`\`javascript
const qosh = (a, b) => a + b;
\`\`\`

### 2. Ikki uslubni aralashtirish
❌ Xato kod:
\`\`\`javascript
function qosh() => 5;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '=>'\` xatoligi yuz beradi. Ikkita uslub aralashtirilmaydi. Yoki \`function\`, yoki arrow. Bittasini tanlash kerak.
✅ To'g'ri variant:
\`\`\`javascript
const qosh = () => 5;
console.log(qosh()); // 5 chiqadi
\`\`\`

### 3. return izlash
❌ Xato tushuncha: arrow funksiyada ham \`return\` yozish shart deb o'ylash.
Nima bo'ladi: xato emas. Lekin qisqa yozuvda \`return\` ortiqcha. Natija avtomatik qaytariladi.
✅ To'g'ri variant:
\`\`\`javascript
const qosh = (a, b) => a + b; // return siz
console.log(qosh(2, 3)); // 5 chiqadi
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`qosh(a, b)\` arrow funksiyasini e'lon qiling (\`a + b\` qaytarsin). \`qosh(2, 3)\` ni chiqaring.

### 2-mashq (O'rtacha)
\`salom(ism)\` arrow funksiyasini e'lon qiling (\`"Salom!"\` qaytarsin). \`salom("Ali")\` ni chiqaring.

### 3-mashq (Chegara holat)
Parametrsiz arrow funksiya yozing: \`const besh = () => 5;\`. Uni chaqirib chiqaring.

### Javoblar:
1.
\`\`\`javascript
const qosh = (a, b) => a + b;
console.log(qosh(2, 3));
\`\`\`
2.
\`\`\`javascript
const salom = (ism) => "Salom!";
console.log(salom("Ali"));
\`\`\`
3.
\`\`\`javascript
const besh = () => 5;
console.log(besh());
\`\`\`

---

## 9. Xulosa

1. Arrow funksiya — \`=>\` bilan yoziladigan qisqa funksiya. \`function\` va \`return\` tushib qoladi.
2. Natija avtomatik qaytariladi. Chaqiruv bir xil: \`qosh(2, 3)\`.
3. Ikkita uslub aralashtirilmaydi. Yoki to'liq, yoki arrow.

Keyingi darsda: o'zgaruvchilar qayerda ko'rinishi (scope) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi arrow",
      instruction: "`qosh(a, b)` arrow funksiyasini e'lon qiling (`a + b` qaytarsin). `qosh(2, 3)` ni chiqaring.",
      startingCode: "// const qosh = ... arrow yozing va chiqaring\n",
      hint: "const qosh = (a, b) => a + b;\nconsole.log(qosh(2, 3));",
      test: "if (!code.includes('=>')) return '=> belgisi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "Matn qaytarish",
      instruction: "`salom(ism)` arrow funksiyasini e'lon qiling (`\"Salom!\"` qaytarsin). `salom(\"Ali\")` ni chiqaring.",
      startingCode: "// arrow yozing va chiqaring\n",
      hint: "const salom = (ism) => \"Salom!\";\nconsole.log(salom(\"Ali\"));",
      test: "if (!code.includes('=>')) return '=> belgisi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom xabari chiqmadi';"
    },
    {
      id: 3,
      title: "O'q belgisini qo'shish",
      instruction: "`const qosh = (a, b) a + b;` dagi xatoni tuzating. `qosh(2, 3)` ni chiqaring (`5` chiqsin).",
      startingCode: "const qosh = (a, b) a + b;\nconsole.log(qosh(2, 3));\n",
      hint: "(a, b) => a + b",
      test: "if (!code.includes('=>')) return '=> belgisini qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "Aralash uslubni tuzatish",
      instruction: "`function qosh() => 5;` dagi xatoni tuzating. Bitta uslubda yozing.",
      startingCode: "function qosh() => 5;\nconsole.log(qosh());\n",
      hint: "const qosh = () => 5;",
      test: "if (code.includes('function qosh')) return 'function yoki arrow — bittasini tanlang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "Ayirish arrow",
      instruction: "`ayir(a, b)` arrow funksiyasini e'lon qiling (`a - b` qaytarsin). `ayir(10, 4)` ni chiqaring.",
      startingCode: "// arrow yozing va chiqaring\n",
      hint: "const ayir = (a, b) => a - b;\nconsole.log(ayir(10, 4));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '6')) return null;\nreturn '6 konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "Parametrsiz arrow (chegara)",
      instruction: "`besh` arrow funksiyasini e'lon qiling (`5` qaytarsin, parametr yo'q). Chaqirib chiqaring.",
      startingCode: "// besh ni e'lon qiling va chiqaring\n",
      hint: "const besh = () => 5;\nconsole.log(besh());",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '5')) return null;\nreturn '5 konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Ikki marta chaqirish (chegara)",
      instruction: "`salom` arrow funksiyasini e'lon qiling. Ikki marta chaqiring (ikkalsi ham chiqsin).",
      startingCode: "const salom = (ism) => ism;\n// Ikki marta chaqiring\n",
      hint: "console.log(salom(\"Ali\"));\nconsole.log(salom(\"Vali\"));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'Ali,Vali') return null;\nreturn 'Ali va Vali chiqishi kerak';"
    },
    {
      id: 8,
      title: "Mantiqiy qaytarish (chegara)",
      instruction: "`katta(n)` arrow funksiyasini e'lon qiling (`n > 10` qaytarsin). `katta(15)` ni chiqaring (`true` chiqsin).",
      startingCode: "// katta(n) ni e'lon qiling va chiqaring\n",
      hint: "const katta = (n) => n > 10;\nconsole.log(katta(15));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Tenglik qaytarish (chegara)",
      instruction: "`teng(a, b)` arrow funksiyasini e'lon qiling (`a === b` qaytarsin). `teng(5, 5)` ni chiqaring.",
      startingCode: "// teng(a, b) ni e'lon qiling va chiqaring\n",
      hint: "const teng = (a, b) => a === b;\nconsole.log(teng(5, 5));",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === true)) return null;\nreturn 'true konsolga chiqmadi';"
    },
    {
      id: 10,
      title: "Blokli arrow (chegara)",
      instruction: "`yig` arrow funksiyasini blok bilan yozing (`{ return a + b; }`). `yig(3, 4)` ni chiqaring (`7` chiqsin).",
      startingCode: "// Blokli arrow yozing va chiqaring\n",
      hint: "const yig = (a, b) => {\n  return a + b;\n};\nconsole.log(yig(3, 4));",
      test: "if (!code.includes('return')) return 'Blok ichida return yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '7')) return null;\nreturn '7 konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`const qosh = (a, b) => a + b; console.log(qosh(2, 3));` nima chiqaradi?",
      options: [
        "undefined",
        "5",
        "Xatolik",
        "a + b"
      ],
      correctAnswer: 1,
      explanation: "Natija avtomatik qaytariladi: 5."
    },
    {
      id: 2,
      question: "Arrow funksiyada return yozilmasa nima bo'ladi?",
      options: [
        "Xatolik beradi",
        "Natija avtomatik qaytariladi",
        "undefined qaytaradi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Qisqa yozuvda natija o'zi qaytariladi."
    },
    {
      id: 3,
      question: "`const qosh = (a, b) a + b;` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "undefined qaytaradi",
        "Ogohlantirish beradi"
      ],
      correctAnswer: 1,
      explanation: "=> belgisi shart. Bo'lmasa yozuv buziladi."
    },
    {
      id: 4,
      question: "`function qosh() => 5;` qatorida nima bo'ladi?",
      options: [
        "5 qaytaradi",
        "SyntaxError beradi",
        "undefined qaytaradi",
        "Ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Ikkita uslub aralashtirilmaydi."
    },
    {
      id: 5,
      question: "`const salom = (ism) => \"Salom!\"; console.log(salom(\"Ali\"));` nima chiqaradi?",
      options: [
        "Ali",
        "Salom!",
        "undefined",
        "ism"
      ],
      correctAnswer: 1,
      explanation: "Tayyor matn qaytarildi."
    },
    {
      id: 6,
      question: "`const besh = () => 5; console.log(besh());` nima chiqaradi?",
      options: [
        "Parametr yo'q deb xato beradi",
        "5",
        "undefined",
        "besh"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh qavs — parametrsiz funksiya. Natija 5."
    },
    {
      id: 7,
      question: "Arrow funksiya nimaga saqlanadi?",
      options: [
        "let ga har doim",
        "const ga (odatda)",
        "Hech qayerga",
        "Faqat var ga"
      ],
      correctAnswer: 1,
      explanation: "Funksiya o'zgarmaydi. Shuning uchun const ishlatiladi."
    },
    {
      id: 8,
      question: "`const katta = (n) => n > 10; console.log(katta(15));` nima chiqaradi?",
      options: [
        "15",
        "true",
        "false",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "15 > 10 true. Natija qaytarildi."
    },
    {
      id: 9,
      question: "`const teng = (a, b) => a === b; console.log(teng(5, 5));` nima chiqaradi?",
      options: [
        "5",
        "true",
        "false",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "5 === 5 true. Natija qaytarildi."
    },
    {
      id: 10,
      question: "`const yig = (a, b) => { return a + b; }; console.log(yig(3, 4));` nima chiqaradi?",
      options: [
        "7",
        "undefined",
        "Xatolik",
        "3, 4"
      ],
      correctAnswer: 0,
      explanation: "Blokli yozuvda return yoziladi. Natija 7."
    },
    {
      id: 11,
      question: "Qaysi yozuv arrow funksiya?",
      options: [
        "function qosh(a, b) { return a + b; }",
        "const qosh = (a, b) => a + b;",
        "qosh(a, b) = a + b;",
        "arrow qosh(a, b);"
      ],
      correctAnswer: 1,
      explanation: "Arrow belgisi => bilan yoziladi."
    },
    {
      id: 12,
      question: "`const salom = (ism) => ism; console.log(salom(\"Ali\")); console.log(salom(\"Vali\"));` nima chiqaradi?",
      options: [
        "Faqat Ali",
        "Ali, Vali",
        "Faqat Vali",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Har chaqiruvda yangi argument keladi."
    }
  ]
};
