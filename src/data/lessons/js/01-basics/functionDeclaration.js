export const functionDeclaration = {
  id: "functionDeclaration",
  title: "Funksiyani E'lon Qilish va Chaqirish",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, oshxonada retsept daftari bor. "Mastava" sahifasini ochasiz. Retsept o'zi ovqat pishirmaydi. Uni o'qib, qadamma-qadam bajarsangiz — ovqat tayyor bo'ladi.

Dasturlashda funksiya (function) xuddi shu retsept sahifasi. Bir marta yoziladi. Kerak bo'lganda chaqiriladi. Har chaqirilganda ichidagi kod ishlaydi.

Funksiya — nom berilgan, qayta chaqirib ishlatiladigan kod blokidir.

---

## 2. Nega kerak?

Mehmonlarga uch marta salom berish kerak. Funksiyasiz uch marta yoziladi:

\`\`\`javascript
console.log("Salom!");
console.log("Salom!");
console.log("Salom!");
\`\`\`

Ishlaydi. Lekin har safar takrorlanadi. Matn o'zgarsa, uch joyni tuzatish kerak.

Muammo shunda: bir ishni ko'p joyda takrorlash kerak. Yechim — funksiya. Bir marta yoziladi. Uch marta chaqiriladi:

\`\`\`javascript
function salom() {
  console.log("Salom!");
}
salom();
salom();
salom();
\`\`\`

Matn o'zgarsa, bitta joy tuzatiladi.

---

## 3. Birinchi misol

Bu kod bitta funksiyani e'lon qiladi va bir marta chaqiradi.

\`\`\`javascript
function salom() { // Funksiya e'lon qilindi
  console.log("Salom!"); // Ichidagi ish
}
salom(); // Funksiya chaqirildi
\`\`\`

\`\`\`text
// Natija: Salom!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function salom() {\` — e'lon. \`function\` so'zi "yangi retsept ochilmoqda" degani. \`salom\` — retsept nomi. Bo'sh qavs — hozircha qo'shimcha yo'q.
- \`console.log("Salom!");\` — funksiya ichidagi ish. E'lon paytida ishlamaydi. Faqat saqlanadi.
- \`}\` — e'lon tugadi.
- \`salom();\` — chaqiruv. Nomdan keyingi qavs "bajar!" degani. Endi ichidagi kod ishladi.

---

## 5. Qadamma-qadam (trace)

Kompyuter qanday harakat qiladi:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`function salom() {\` ... \`}\` | E'lon | Saqlandi, ishlamadi |
| 2 | \`salom();\` | Chaqiruv | Blok ichiga kirildi |
| 3 | \`console.log("Salom!");\` | — | Salom! chiqdi |

E'lon — saqlash. Chaqiruv — bajarish. Ikkisi har xil ish.

---

## 6. Yana bitta misol

Bu kod bitta funksiyani ikki marta chaqiradi.

\`\`\`javascript
function olqish() { // Funksiya e'lon qilindi
  console.log("Barakalla!"); // Ichidagi ish
}
olqish(); // Birinchi chaqiruv
olqish(); // Ikkinchi chaqiruv
\`\`\`

\`\`\`text
// Natija:
Barakalla!
Barakalla!
\`\`\`

Qator-baqator tahlil:
- Funksiya bir marta e'lon qilindi.
- Ikki marta chaqirildi. Har chaqiruvda ichidagi kod qayta ishladi.
- Natija ikki marta chiqdi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`javascript
function salom {
  console.log("Salom!");
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '{'\` xatoligi yuz beradi. Nomdan keyin har doim qavs bo'ladi: \`salom()\`. Hozircha bo'sh, lekin shart.
✅ To'g'ri variant:
\`\`\`javascript
function salom() {
  console.log("Salom!");
}
\`\`\`

### 2. E'lon qilmasdan chaqirish
❌ Xato kod:
\`\`\`javascript
salom();
\`\`\`
Nima bo'ladi: \`ReferenceError: salom is not defined\` xatoligi yuz beradi. Chaqirishdan oldin e'lon bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
function salom() {
  console.log("Salom!");
}
salom();
\`\`\`

### 3. Chaqirmasdan qoldirish
❌ Xato kod:
\`\`\`javascript
function salom() {
  console.log("Salom!");
}
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin hech narsa chiqmaydi! E'lon — faqat saqlash. Chaqiruv bo'lmasa, kod uxlab yotadi.
✅ To'g'ri variant:
\`\`\`javascript
function salom() {
  console.log("Salom!");
}
salom(); // Chaqiruv shart
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`salom\` funksiyasini e'lon qiling. Ichida \`"Salom!"\` chiqsin. Bir marta chaqiring.

### 2-mashq (O'rtacha)
\`olqish\` funksiyasini e'lon qiling. Ichida \`"Barakalla!"\` chiqsin. Ikki marta chaqiring.

### 3-mashq (Chegara holat)
Funksiyani e'lon qiling, lekin chaqirmang. Hech narsa chiqmasligini tasdiqlang (bo'sh natija ham to'g'ri javob).

### Javoblar:
1.
\`\`\`javascript
function salom() {
  console.log("Salom!");
}
salom();
\`\`\`
2.
\`\`\`javascript
function olqish() {
  console.log("Barakalla!");
}
olqish();
olqish();
\`\`\`
3.
\`\`\`javascript
function jim() {
  console.log("Hech narsa!");
}
\`\`\`

---

## 9. Xulosa

1. Funksiya — nomlangan kod bloki. \`function\` bilan e'lon qilinadi.
2. E'lon — saqlash. Chaqiruv (\`salom();\`) — bajarish.
3. Bir marta yoziladi, ko'p marta chaqiriladi.

Keyingi darsda: funksiyaga tashqaridan qiymat berish (parametrlar) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi funksiya",
      instruction: "`salom` funksiyasini e'lon qiling (ichida `\"Salom!\"` chiqsin). Bir marta chaqiring.",
      startingCode: "// salom funksiyasini e'lon qiling va chaqiring\n",
      hint: "function salom() {\n  console.log(\"Salom!\");\n}\nsalom();",
      test: "if (!code.includes('function salom')) return 'function salom deb elon qiling';\nif (!code.includes('salom()')) return 'salom() deb chaqiring';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom xabari chiqmadi';"
    },
    {
      id: 2,
      title: "Ikki marta chaqirish",
      instruction: "`olqish` funksiyasini e'lon qiling (ichida `\"Barakalla!\"` chiqsin). Ikki marta chaqiring.",
      startingCode: "// olqish funksiyasini e'lon qiling va ikki marta chaqiring\n",
      hint: "function olqish() {\n  console.log(\"Barakalla!\");\n}\nolqish();\nolqish();",
      test: "if (!code.includes('function olqish')) return 'function olqish deb elon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikki marta chiqishi kerak';\nif (out.every(m => m.includes('Barakalla'))) return null;\nreturn 'Barakalla ikki marta chiqmadi';"
    },
    {
      id: 3,
      title: "Qavs xatosini tuzatish",
      instruction: "`function salom {` dagi qavs xatosini tuzating. `\"Salom!\"` chiqsin.",
      startingCode: "function salom {\n  console.log(\"Salom!\");\n}\nsalom();\n",
      hint: "function salom() {",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom xabari chiqmadi';"
    },
    {
      id: 4,
      title: "Chaqiruv qo'shish",
      instruction: "Funksiya e'lon qilingan, lekin chaqirilmagan. `xabar();` qatorini qo'shing.",
      startingCode: "function xabar() {\n  console.log(\"Eshitdingizmi?\");\n}\n",
      hint: "xabar();",
      test: "if (!code.includes('xabar()')) return 'xabar() deb chaqiring';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Eshitdingizmi'))) return null;\nreturn 'Xabar chiqmadi';"
    },
    {
      id: 5,
      title: "E'lonni to'ldirish",
      instruction: "`salom();` chaqiruvi bor, lekin e'loni yo'q. `function salom()` e'lonini qo'shing (`\"Salom!\"` chiqsin).",
      startingCode: "salom();\n",
      hint: "function salom() {\n  console.log(\"Salom!\");\n}\nsalom();",
      test: "if (!code.includes('function salom')) return 'function salom deb elon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Salom'))) return null;\nreturn 'Salom xabari chiqmadi';"
    },
    {
      id: 6,
      title: "Uch marta chaqirish (chegara)",
      instruction: "`count` funksiyasini e'lon qiling (ichida `\"Bir!\"` chiqsin). Uch marta chaqiring.",
      startingCode: "// count funksiyasini e'lon qiling va uch marta chaqiring\n",
      hint: "function count() {\n  console.log(\"Bir!\");\n}\ncount();\ncount();\ncount();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 3) return 'Uch marta chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "Ikkita funksiya (chegara)",
      instruction: "`erta` (`\"Ertalab!\"`) va `kech` (`\"Kechqurun!\"`) funksiyalarini e'lon qiling. Ikkalasini bittadan chaqiring.",
      startingCode: "// erta va kech funksiyalarini e'lon qiling va chaqiring\n",
      hint: "function erta() {\n  console.log(\"Ertalab!\");\n}\nfunction kech() {\n  console.log(\"Kechqurun!\");\n}\nerta();\nkech();",
      test: "if (!code.includes('function erta') || !code.includes('function kech')) return 'Ikkala funksiyani elon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'Ertalab!,Kechqurun!') return null;\nreturn 'Ertalab! va Kechqurun! chiqishi kerak';"
    },
    {
      id: 8,
      title: "Chaqirilmagan funksiya (chegara)",
      instruction: "`jim` funksiyasini e'lon qiling, lekin chaqirmang. Hech narsa chiqmasligi kerak.",
      startingCode: "// jim funksiyasini e'lon qiling (chaqirmang)\n",
      hint: "function jim() {\n  console.log(\"Hech narsa!\");\n}",
      test: "if (!code.includes('function jim')) return 'function jim deb elon qiling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'Chaqirilmagan funksiya hech narsa chiqarmasligi kerak';"
    },
    {
      id: 9,
      title: "Sikl ichida chaqirish (chegara)",
      instruction: "`salom` funksiyasini e'lon qiling. `for` bilan uch marta chaqiring (`\"Salom!\"` uch marta chiqsin).",
      startingCode: "function salom() {\n  console.log(\"Salom!\");\n}\n// for bilan uch marta chaqiring\n",
      hint: "for (let i = 0; i < 3; i++) {\n  salom();\n}",
      test: "if (!code.includes('for') || !code.includes('salom()')) return 'for va salom() ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 3) return 'Uch marta chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "Shart bilan chaqirish (chegara)",
      instruction: "`isDay = true` berilgan. Rost bo'lsa `kunduz()` chaqiring (`\"Kunduz!\"` chiqsin).",
      startingCode: "function kunduz() {\n  console.log(\"Kunduz!\");\n}\nlet isDay = true;\n// if bilan chaqiring\n",
      hint: "if (isDay) {\n  kunduz();\n}",
      test: "if (!code.includes('if') || !code.includes('kunduz()')) return 'if va kunduz() ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Kunduz'))) return null;\nreturn 'Kunduz xabari chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`function salom() { console.log(\"Salom!\"); } salom();` nima chiqaradi?",
      options: [
        "Hech narsa",
        "Salom!",
        "salom",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "E'lon saqlaydi, chaqiruv bajaradi. Natija chiqadi."
    },
    {
      id: 2,
      question: "E'lon bilan chaqiruv farqi nima?",
      options: [
        "Farqi yo'q",
        "E'lon saqlaydi, chaqiruv bajaradi",
        "Chaqiruv saqlaydi, e'lon bajaradi",
        "Ikkalasi ham saqlaydi"
      ],
      correctAnswer: 1,
      explanation: "function — retseptni yozish. salom() — retsept bo'yicha pishirish."
    },
    {
      id: 3,
      question: "`function salom { console.log(\"Salom!\"); }` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Hech narsa chiqmaydi",
        "Ogohlantirish beradi"
      ],
      correctAnswer: 1,
      explanation: "Nomdan keyin qavs shart: salom()."
    },
    {
      id: 4,
      question: "`salom();` yolg'iz (e'lonsiz) yozilsa nima bo'ladi?",
      options: [
        "Hech narsa chiqmaydi",
        "ReferenceError beradi",
        "Bo'sh qator chiqadi",
        "true qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Chaqirishdan oldin e'lon bo'lishi shart."
    },
    {
      id: 5,
      question: "Funksiya e'lon qilinib, chaqirilmasa nima bo'ladi?",
      options: [
        "Xatolik beradi",
        "Hech narsa chiqmaydi",
        "Bir marta ishlaydi",
        "Ogohlantirish beradi"
      ],
      correctAnswer: 1,
      explanation: "E'lon — faqat saqlash. Chaqiruv bo'lmasa, kod uxlaydi."
    },
    {
      id: 6,
      question: "`function olqish() { console.log(\"A!\"); } olqish(); olqish();` nima chiqaradi?",
      options: [
        "A! (bir marta)",
        "A! A! (ikki marta)",
        "Hech narsa",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Har chaqiruvda ichidagi kod qayta ishlaydi."
    },
    {
      id: 7,
      question: "Chaqiruv belgisi qaysi?",
      options: [
        "{}",
        "()",
        "[]",
        ";;"
      ],
      correctAnswer: 1,
      explanation: "Nomdan keyingi qavs 'bajar!' degani."
    },
    {
      id: 8,
      question: "`function erta() { console.log(\"A\"); } function kech() { console.log(\"B\"); } erta(); kech();` nima chiqaradi?",
      options: [
        "A",
        "B",
        "A, B",
        "Hech narsa"
      ],
      correctAnswer: 2,
      explanation: "Har biri o'z navbatida chaqirildi."
    },
    {
      id: 9,
      question: "`function jim() { console.log(\"X\"); }` (chaqiruvsiz) nima chiqaradi?",
      options: [
        "X",
        "Hech narsa",
        "jim",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Chaqiruv yo'q — bajarish yo'q."
    },
    {
      id: 10,
      question: "`function salom() { console.log(\"S\"); } for (let i = 0; i < 3; i++) { salom(); }` nima chiqaradi?",
      options: [
        "S (bir marta)",
        "S, S, S (uch marta)",
        "Hech narsa",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Sikl uch marta chaqiradi. Har safar ichidagi kod ishlaydi."
    },
    {
      id: 11,
      question: "Funksiya nima uchun kerak?",
      options: [
        "Kod uzayishi uchun",
        "Bir ishni ko'p joyda takrorlash uchun",
        "Xatolar uchun",
        "Hech narsa uchun"
      ],
      correctAnswer: 1,
      explanation: "Bir marta yoziladi, ko'p marta chaqiriladi."
    },
    {
      id: 12,
      question: "`function kunduz() { console.log(\"K\"); } let isDay = true; if (isDay) { kunduz(); }` nima chiqaradi?",
      options: [
        "Hech narsa",
        "K",
        "true",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Shart rost, chaqiruv ishladi."
    }
  ]
};
