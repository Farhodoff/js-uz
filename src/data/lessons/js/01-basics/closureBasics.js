export const closureBasics = {
  id: "closureBasics",
  title: "Closure (Yopilish / Eslab Qolish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, sumkangizda kundalik daftar bor. Daftar ichida kechagi yozuvlar saqlanadi. Sumkani yopsangiz ham, yozuvlar o'chmaydi. Ertaga ochsangiz — kechagi yozuvlar joyida.

Dasturlashda closure (yopilish) xuddi shu sumka. Ichki funksiya tashqi o'zgaruvchini "eslab qoladi". Tashqi funksiya tugagandan keyin ham qiymat o'chmaydi.

Closure — tashqi o'zgaruvchini eslab qolgan ichki funksiyadir.

---

## 2. Nega kerak?

Hisoblagich kerak: har chaqiruvda 1 taga oshsin. Oddiy o'zgaruvchi bilan bo'lmaydi:

\`\`\`javascript
let son = 0;
function qadam() {
  son++;
  console.log(son);
}
qadam();
qadam();
\`\`\`

Ishlaydi: \`1\`, \`2\` chiqadi. Lekin \`son\` tashqarida, ochiq yotibdi. Har kim o'zgartirishi mumkin.

Muammo shunda: hisobni himoyalash kerak. Tashqaridan ko'rinmasin, lekin esda qolsin. Yechim — closure:

\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
let birinchi = hisoblagich();
birinchi();
birinchi();
\`\`\`

Natija bir xil: \`1\`, \`2\`. Lekin \`son\` endi ichkarida. Tashqaridan tegib bo'lmaydi.

---

## 3. Birinchi misol

Bu kod eslab qoladigan hisoblagich yasaydi.

\`\`\`javascript
function hisoblagich() { // Tashqi funksiya
  let son = 0; // Ichki xotira
  function qadam() { // Ichki funksiya
    son++; // Xotirani oshiradi
    console.log(son); // Chiqaradi
  }
  return qadam; // Ichki funksiya uzatiladi
}
let birinchi = hisoblagich(); // Tayyor hisoblagich olindi
birinchi(); // 1 chiqadi
birinchi(); // 2 chiqadi
\`\`\`

\`\`\`text
// Natija:
1
2
\`\`\`

---

## 4. Qator-baqator tahlil

- \`function hisoblagich() {\` — tashqi funksiya. U "zavod". Hisoblagich yasaydi.
- \`let son = 0;\` — ichki xotira. Tashqaridan ko'rinmaydi.
- \`function qadam() {\` — ichki funksiya. Xotirani ishlatadi.
- \`return qadam;\` — ichki funksiya tashqariga uzatildi. Xotirasi bilan birga.
- \`let birinchi = hisoblagich();\` — tayyor hisoblagich olindi.
- \`birinchi();\` — har chaqiruvda \`son\` esda qoladi. Birinchi marta \`1\`, ikkinchi marta \`2\`.

---

## 5. Qadamma-qadam (trace)

Xotira qanday saqlanadi:

| Qadam | Kod qatori | Xotira (son) | Natija |
|---|---|---|---|
| 1 | \`let birinchi = hisoblagich();\` | 0 yaratildi | Tayyor |
| 2 | \`birinchi();\` | 0 + 1 = 1 | 1 chiqdi |
| 3 | \`birinchi();\` | 1 + 1 = 2 | 2 chiqdi |

Tashqi funksiya 1-qadamdayoq tugagan. Lekin xotira o'chmagan. Ichki funksiya uni eslab qolgan.

---

## 6. Yana bitta misol

Bu kod ikkita mustaqil hisoblagich yasaydi.

\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
let birinchi = hisoblagich(); // Birinchi xotira
let ikkinchi = hisoblagich(); // Ikkinchi xotira
birinchi(); // 1 chiqadi
birinchi(); // 2 chiqadi
ikkinchi(); // 1 chiqadi
\`\`\`

\`\`\`text
// Natija:
1
2
1
\`\`\`

Qator-baqator tahlil:
- Har chaqiruv yangi xotira ochadi. \`birinchi\` bilan \`ikkinchi\` alohida.
- \`birinchi()\` ikki marta chaqirildi: \`1\` va \`2\` chiqdi.
- \`ikkinchi()\` birinchi marta chaqirildi: o'z xotirasi \`0\` dan boshlangan. \`1\` chiqdi.

---

## 7. Ko'p uchraydigan xatolar

### 1. return ni unutish
❌ Xato kod:
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
}
let birinchi = hisoblagich();
birinchi();
\`\`\`
Nima bo'ladi: \`TypeError: birinchi is not a function\` xatoligi yuz beradi. Ichki funksiya uzatilmagan. \`birinchi\` ga hech narsa (\`undefined\`) yozilgan. Uni chaqirib bo'lmaydi.
✅ To'g'ri variant:
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam; // Uzatish shart
}
let birinchi = hisoblagich();
birinchi();
\`\`\`

### 2. Tashqaridan xotiraga tegish
❌ Xato kod:
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
  }
  return qadam;
}
let birinchi = hisoblagich();
birinchi();
console.log(son);
\`\`\`
Nima bo'ladi: \`ReferenceError: son is not defined\` xatoligi yuz beradi. Xotira himoyalangan. Unga faqat ichki funksiya orqali tegiladi.
✅ To'g'ri variant:
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
let birinchi = hisoblagich();
birinchi(); // Faqat shu yo'l bilan
\`\`\`

### 3. Ichki nomni tashqarida chaqirish
❌ Xato kod:
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
qadam();
\`\`\`
Nima bo'ladi: \`ReferenceError: qadam is not defined\` xatoligi yuz beradi. Ichki nom tashqarida ko'rinmaydi. Faqat uzatilgan nom (\`birinchi\`) orqali chaqiriladi.
✅ To'g'ri variant:
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
let birinchi = hisoblagich();
birinchi();
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
Hisoblagich yasang. Ikki marta chaqiring (\`1\` va \`2\` chiqishi kerak).

### 2-mashq (O'rtacha)
Hisoblagichni uch marta chaqiring (\`1\`, \`2\`, \`3\` chiqishi kerak).

### 3-mashq (Chegara holat)
Ikkita mustaqil hisoblagich yasang. Birinchisini ikki marta, ikkinchisini bir marta chaqiring (\`1\`, \`2\`, \`1\` chiqishi kerak).

### Javoblar:
1.
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
let birinchi = hisoblagich();
birinchi();
birinchi();
\`\`\`
2.
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
let birinchi = hisoblagich();
birinchi();
birinchi();
birinchi();
\`\`\`
3.
\`\`\`javascript
function hisoblagich() {
  let son = 0;
  function qadam() {
    son++;
    console.log(son);
  }
  return qadam;
}
let birinchi = hisoblagich();
let ikkinchi = hisoblagich();
birinchi();
birinchi();
ikkinchi();
\`\`\`

---

## 9. Xulosa

1. Closure — tashqi o'zgaruvchini eslab qolgan ichki funksiya.
2. Xotira himoyalangan: unga faqat ichki funksiya orqali tegiladi.
3. Har chaqiruv yangi xotira ochadi. Hisoblagichlar bir-biriga aralashmaydi.

Keyingi darsda: bir nechta qiymatni saqlaydigan massivlar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi hisoblagich",
      instruction: "Hisoblagich yasang (`son = 0`, `qadam` ichida oshirib chiqarsin, `return qadam;` bo'lsin). Ikki marta chaqiring (`1` va `2` chiqishi kerak).",
      startingCode: "// hisoblagich() ni yozing va ikki marta chaqiring\n",
      hint: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n  return qadam;\n}\nlet birinchi = hisoblagich();\nbirinchi();\nbirinchi();",
      test: "if (!code.includes('return qadam')) return 'return qadam yozilishi kerak';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2') return null;\nreturn '1 va 2 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "Uch marta chaqirish",
      instruction: "Hisoblagichni uch marta chaqiring (`1`, `2`, `3` chiqishi kerak).",
      startingCode: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n  return qadam;\n}\nlet birinchi = hisoblagich();\n// Uch marta chaqiring\n",
      hint: "birinchi();\nbirinchi();\nbirinchi();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn '1, 2, 3 chiqishi kerak';"
    },
    {
      id: 3,
      title: "return ni qo'shish",
      instruction: "`return qadam;` yozilmagan. Qo'shing (`1` va `2` chiqishi kerak).",
      startingCode: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n}\nlet birinchi = hisoblagich();\nbirinchi();\nbirinchi();\n",
      hint: "return qadam;",
      test: "if (!code.includes('return qadam')) return 'return qadam qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2') return null;\nreturn '1 va 2 chiqishi kerak';"
    },
    {
      id: 4,
      title: "Xotirani yashirish",
      instruction: "`son` ni tashqariga chiqarmang. Faqat ichki funksiya orqali chiqaring (`1` chiqsin).",
      startingCode: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n  return qadam;\n}\nlet birinchi = hisoblagich();\n// birinchi() bilan chaqiring\n",
      hint: "birinchi();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1') return null;\nreturn '1 chiqishi kerak';"
    },
    {
      id: 5,
      title: "Ichki nom xatosi",
      instruction: "`qadam();` tashqarida ishlamaydi. Uzatilgan nom bilan chaqiring (`1` chiqsin).",
      startingCode: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n  return qadam;\n}\nqadam();\n",
      hint: "let birinchi = hisoblagich();\nbirinchi();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1') return null;\nreturn '1 chiqishi kerak';"
    },
    {
      id: 6,
      title: "Ikkita mustaqil xotira (chegara)",
      instruction: "Ikkita hisoblagich yasang. Birinchisini ikki marta, ikkinchisini bir marta chaqiring (`1`, `2`, `1` chiqishi kerak).",
      startingCode: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n  return qadam;\n}\n// Ikkita yasang va chaqiring\n",
      hint: "let birinchi = hisoblagich();\nlet ikkinchi = hisoblagich();\nbirinchi();\nbirinchi();\nikkinchi();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,1') return null;\nreturn '1, 2, 1 chiqishi kerak';"
    },
    {
      id: 7,
      title: "Kamayuvchi xotira (chegara)",
      instruction: "`son = 10` dan boshlanadigan, har safar `2` taga kamayadigan hisoblagich yasang. Ikki marta chaqiring (`8` va `6` chiqishi kerak).",
      startingCode: "// Kamayuvchi hisoblagich yozing\n",
      hint: "function hisoblagich() {\n  let son = 10;\n  function qadam() {\n    son -= 2;\n    console.log(son);\n  }\n  return qadam;\n}\nlet birinchi = hisoblagich();\nbirinchi();\nbirinchi();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '8,6') return null;\nreturn '8 va 6 chiqishi kerak';"
    },
    {
      id: 8,
      title: "Matnli xotira (chegara)",
      instruction: "`ism = \"A\"` dan boshlanadigan hisoblagich yasang. Har chaqiruvda `\"X\"` qo'shib chiqaring. Ikki marta chaqiring (`AX` va `AXX` chiqishi kerak).",
      startingCode: "// Matnli hisoblagich yozing\n",
      hint: "function hisoblagich() {\n  let ism = \"A\";\n  function qadam() {\n    ism += \"X\";\n    console.log(ism);\n  }\n  return qadam;\n}\nlet birinchi = hisoblagich();\nbirinchi();\nbirinchi();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === 'AX,AXX') return null;\nreturn 'AX va AXX chiqishi kerak';"
    },
    {
      id: 9,
      title: "Uchta mustaqil (chegara)",
      instruction: "Bitta zavoddan uchta hisoblagich oling. Har birini bir martadan chaqiring (uchala `1` chiqishi kerak).",
      startingCode: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n  return qadam;\n}\n// Uchta oling va bittadan chaqiring\n",
      hint: "let a = hisoblagich();\nlet b = hisoblagich();\nlet c = hisoblagich();\na();\nb();\nc();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,1,1') return null;\nreturn 'Uchala 1 chiqishi kerak';"
    },
    {
      id: 10,
      title: "Beshgacha sanash (chegara)",
      instruction: "Hisoblagichni besh marta chaqiring (`1`-`5` chiqishi kerak).",
      startingCode: "function hisoblagich() {\n  let son = 0;\n  function qadam() {\n    son++;\n    console.log(son);\n  }\n  return qadam;\n}\nlet birinchi = hisoblagich();\n// Besh marta chaqiring\n",
      hint: "birinchi();\nbirinchi();\nbirinchi();\nbirinchi();\nbirinchi();",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3,4,5') return null;\nreturn '1 dan 5 gacha chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Closure nima?",
      options: [
        "Yopiq qavs",
        "Tashqi o'zgaruvchini eslab qolgan ichki funksiya",
        "Xato turi",
        "Sikl turi"
      ],
      correctAnswer: 1,
      explanation: "Ichki funksiya tashqi xotirani eslab qoladi."
    },
    {
      id: 2,
      question: "`return qadam;` yozilmasa nima bo'ladi?",
      options: [
        "Hech narsa o'zgarmaydi",
        "TypeError beradi (birinchi chaqiruvda)",
        "0 chiqadi",
        "Cheksiz ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Uzatish bo'lmasa, undefined chaqirilmoqchi bo'ladi."
    },
    {
      id: 3,
      question: "Xotira qayerda yashaydi?",
      options: [
        "Tashqarida",
        "Ichkarida, himoyalangan",
        "Konsolda",
        "Hech qayerda"
      ],
      correctAnswer: 1,
      explanation: "Tashqaridan tegib bo'lmaydi. Faqat ichki funksiya orqali."
    },
    {
      id: 4,
      question: "`let birinchi = hisoblagich(); birinchi(); birinchi();` (son 0 dan) nima chiqaradi?",
      options: [
        "0, 0",
        "1, 2",
        "1, 1",
        "2, 2"
      ],
      correctAnswer: 1,
      explanation: "Har chaqiruvda xotira oshadi: 1, keyin 2."
    },
    {
      id: 5,
      question: "`console.log(son);` tashqarida yozilsa nima bo'ladi?",
      options: [
        "0 chiqadi",
        "ReferenceError beradi",
        "undefined chiqadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Xotira himoyalangan. Tashqaridan ko'rinmaydi."
    },
    {
      id: 6,
      question: "`qadam();` tashqarida yozilsa nima bo'ladi?",
      options: [
        "Ishlaydi",
        "ReferenceError beradi",
        "0 chiqadi",
        "Cheksiz ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Ichki nom tashqarida ko'rinmaydi."
    },
    {
      id: 7,
      question: "Ikkita hisoblagich xotirasi qanday bo'ladi?",
      options: [
        "Bitta umumiy",
        "Alohida-alohida",
        "Ikkinchisi birinchisini o'chiradi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Har chaqiruv yangi xotira ochadi."
    },
    {
      id: 8,
      question: "`let birinchi = hisoblagich(); let ikkinchi = hisoblagich(); birinchi(); birinchi(); ikkinchi();` nima chiqaradi?",
      options: [
        "1, 2, 3",
        "1, 2, 1",
        "1, 1, 1",
        "1, 1, 2"
      ],
      correctAnswer: 1,
      explanation: "Birinchi ikki marta oshdi. Ikkinchi yangidan boshladi."
    },
    {
      id: 9,
      question: "Tashqi funksiya tugagandan keyin xotira nima bo'ladi?",
      options: [
        "O'chadi",
        "Eslab qolinadi",
        "Nolga aylanadi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Ichki funksiya xotirani ushlab turadi."
    },
    {
      id: 10,
      question: "`son = 10` dan boshlanib, har safar 2 taga kamaysa, ikki chaqiruv nima chiqaradi?",
      options: [
        "10, 8",
        "8, 6",
        "9, 8",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "10 - 2 = 8, 8 - 2 = 6."
    },
    {
      id: 11,
      question: "`ism = \"A\"` dan boshlanib, har safar \"X\" qo'shilsa, ikki chaqiruv nima chiqaradi?",
      options: [
        "X, XX",
        "AX, AXX",
        "A, A",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "A + X = AX, keyin AX + X = AXX."
    },
    {
      id: 12,
      question: "Hisoblagich besh marta chaqirilsa nima chiqadi?",
      options: [
        "5, 5, 5, 5, 5",
        "1, 2, 3, 4, 5",
        "0, 1, 2, 3, 4",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Xotira har safar oshadi: 1 dan 5 gacha."
    }
  ]
};
