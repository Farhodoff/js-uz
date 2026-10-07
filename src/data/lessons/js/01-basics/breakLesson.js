export const breakLesson = {
  id: "breakLesson",
  title: "break (Siklni to'xtatish)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, poyezdda ketayapsiz. Birdan muhim qo'ng'iroq bo'ldi. Siz favqulodda tormozni tortasiz. Poyezd darhol to'xtaydi. Keyingi bekat kutilmaydi.

Dasturlashda \`break\` (to'xtatish) xuddi shu favqulodda tormoz. Sikl ichida uchrasa, sikl darhol to'xtaydi.

break — siklni shart kutilmasdan darhol to'xtatadigan operatordir.

---

## 2. Nega kerak?

Qidiruv bor: 1 dan 100 gacha sonlar ichidan 7 ga bo'linadigan birinchisini topish kerak. \`for\` bilan ham bo'ladi. Lekin topilgandan keyin ham sikl 100 gacha aylanadi. Bekor ish.

Muammo shunda: kerakli narsa topilishi bilan to'xtash kerak. Yechim — \`break\`:

\`\`\`javascript
for (let i = 1; i <= 100; i++) {
  console.log(i);
  break;
}
\`\`\`

Faqat \`1\` chiqadi! Birinchi aylanishda \`break\` uchradi. Sikl to'xtadi.

---

## 3. Birinchi misol

Bu kod shart bajarilishi bilan siklni to'xtatadi.

\`\`\`javascript
for (let i = 1; i <= 5; i++) { // 5 gacha mo'ljallangan
  console.log(i); // Hozirgi qiymat chiqadi
  break; // Darhol to'xtaydi
}
\`\`\`

\`\`\`text
// Natija: 1
\`\`\`

---

## 4. Qator-baqator tahlil

- \`for (let i = 1; i <= 5; i++) {\` — sikl boshlandi. 5 gacha mo'ljallangan.
- \`console.log(i);\` — birinchi aylanish. \`1\` chiqadi.
- \`break;\` — tormoz tortildi. Sikl darhol to'xtaydi. Qolgan aylanishlar bo'lmaydi.

---

## 5. Qadamma-qadam (trace)

Kompyuter qanday harakat qiladi:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`for (let i = 1; ...\` | i = 1, shart rost | Blok ichiga kirildi |
| 2 | \`console.log(i);\` | — | 1 chiqdi |
| 3 | \`break;\` | Tormoz! | Sikl to'xtadi |

2, 3, 4, 5 sonlari hech qachon chiqmaydi.

---

## 6. Yana bitta misol

Bu kod topilgandan keyin to'xtashni ko'rsatadi.

\`\`\`javascript
for (let i = 1; i <= 10; i++) { // 10 gacha mo'ljallangan
  console.log(i); // Hozirgi qiymat chiqadi
  if (i === 3) { // 3 topildimi?
    break; // Topildi — to'xtaydi
  }
}
\`\`\`

\`\`\`text
// Natija:
1
2
3
\`\`\`

Qator-baqator tahlil:
- Birinchi uch aylanish odatdagidek ishladi: \`1\`, \`2\`, \`3\` chiqdi.
- \`i === 3\` rost bo'lganda \`break\` ishga tushdi.
- Sikl to'xtadi. 4 dan 10 gacha hech narsa chiqmadi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Sikldan tashqarida yozish
❌ Xato kod:
\`\`\`javascript
break;
\`\`\`
Nima bo'ladi: \`SyntaxError: Illegal break statement\` xatoligi yuz beradi. \`break\` faqat sikl ichida yashaydi. Tashqarida ma'nosiz.
✅ To'g'ri variant:
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
  break;
}
\`\`\`

### 2. Noto'g'ri yozish
❌ Xato kod:
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  brake;
  console.log(i);
}
\`\`\`
Nima bo'ladi: \`ReferenceError: brake is not defined\` xatoligi yuz beradi. \`brake\` degan so'z yo'q. Faqat aniq \`break\` yoziladi.
✅ To'g'ri variant:
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  break;
  console.log(i);
}
\`\`\`

### 3. Keyingi kod to'xtaydi deb o'ylash
❌ Xato tushuncha: \`break\` dan keyingi hamma kod to'xtaydi deb o'ylash.
Nima bo'ladi: xato. \`break\` faqat O'Z siklini to'xtatadi. Sikldan keyingi qatorlar odatdagidek ishlaydi.
✅ To'g'ri variant:
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  break;
}
console.log("Tugadi!"); // Bu chiqadi
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`1\` dan \`5\` gacha sikl yozing. Ichiga darhol \`break\` qo'ying. Faqat \`1\` chiqsin.

### 2-mashq (O'rtacha)
\`1\` dan \`10\` gacha sikl yozing. \`i === 3\` bo'lganda \`break\` bilan to'xtating. Natijalar \`1\`, \`2\`, \`3\` bo'lsin.

### 3-mashq (Chegara holat)
Sikldan keyin ham kod ishlashini isbotlang: sikl ichida \`break\`, sikldan keyin \`"Tugadi!"\` chiqsin.

### Javoblar:
1.
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
  break;
}
\`\`\`
2.
\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  console.log(i);
  if (i === 3) {
    break;
  }
}
\`\`\`
3.
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  break;
}
console.log("Tugadi!");
\`\`\`

---

## 9. Xulosa

1. \`break\` — siklni darhol to'xtatadi. Qolgan aylanishlar bo'lmaydi.
2. \`break\` faqat sikl ichida yoziladi. Tashqarida xato beradi.
3. Sikldan keyingi kod to'xtamaydi. U odatdagidek ishlaydi.

Keyingi darsda: qadamni tashlab ketadigan \`continue\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Darhol to'xtatish",
      instruction: "`1` dan `5` gacha sikl yozing. Ichiga darhol `break` qo'ying. Faqat `1` chiqsin.",
      startingCode: "// for va break yozing\n",
      hint: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n  break;\n}",
      test: "if (!code.includes('break')) return 'break operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1') return null;\nreturn 'Faqat 1 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "3 da to'xtatish",
      instruction: "`1` dan `10` gacha sikl yozing. `i === 3` bo'lganda to'xtating (`1`, `2`, `3` chiqishi kerak).",
      startingCode: "// for, if va break yozing\n",
      hint: "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n  if (i === 3) {\n    break;\n  }\n}",
      test: "if (!code.includes('break')) return 'break operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn '1, 2, 3 chiqishi kerak';"
    },
    {
      id: 3,
      title: "Tashqaridagi break ni tuzatish",
      instruction: "`break;` yolg'iz qolgan. Uni `for` ichiga oling (`0`, `1`, `2` chiqishi kerak emas — faqat birinchi qiymat chiqsin).",
      startingCode: "break;\n",
      hint: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n  break;\n}",
      test: "if (!code.includes('for') || !code.includes('break')) return 'for ichiga break yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 1) return null;\nreturn 'Faqat BITTA qiymat chiqishi kerak';"
    },
    {
      id: 4,
      title: "brake ni tuzatish",
      instruction: "`brake` ni `break` ga tuzating (`i = 0` dan `5` gacha siklda). Faqat `0` chiqsin.",
      startingCode: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n  brake;\n}\n",
      hint: "brake o'rniga break yozing.",
      test: "if (code.includes('brake')) return 'brake ni break deb yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0') return null;\nreturn 'Faqat 0 chiqishi kerak';"
    },
    {
      id: 5,
      title: "Sikldan keyin davom etadi",
      instruction: "Sikl ichida `break`, sikldan keyin `\"Tugadi!\"` chiqaring. Ikkalasi ham ko'rinsin.",
      startingCode: "// for, break va oxirgi console.log yozing\n",
      hint: "for (let i = 1; i <= 5; i++) {\n  break;\n}\nconsole.log(\"Tugadi!\");",
      test: "if (!code.includes('break')) return 'break ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Tugadi'))) return null;\nreturn 'Tugadi xabari chiqmadi';"
    },
    {
      id: 6,
      title: "5 da to'xtatish (chegara)",
      instruction: "`1` dan `100` gacha sikl yozing. `i === 5` bo'lganda to'xtating (`1`-`5` chiqishi kerak).",
      startingCode: "// for, if va break yozing\n",
      hint: "for (let i = 1; i <= 100; i++) {\n  console.log(i);\n  if (i === 5) {\n    break;\n  }\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3,4,5') return null;\nreturn '1 dan 5 gacha chiqishi kerak';"
    },
    {
      id: 7,
      title: "while da break (chegara)",
      instruction: "`i = 1`, shart `true` bo'lgan `while` yozing. Ichida chiqaring va darhol `break` qiling (faqat `1` chiqsin).",
      startingCode: "let i = 1;\n// while va break yozing\n",
      hint: "while (true) {\n  console.log(i);\n  break;\n}",
      test: "if (!code.includes('while') || !code.includes('break')) return 'while va break ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1') return null;\nreturn 'Faqat 1 chiqishi kerak';"
    },
    {
      id: 8,
      title: "Topilganda to'xtash (chegara)",
      instruction: "`n = 1` dan boshlab chiqaring. `7` chiqqanda to'xtating (`1`-`7` chiqishi kerak).",
      startingCode: "let n = 1;\n// while, if va break yozing\n",
      hint: "while (true) {\n  console.log(n);\n  if (n === 7) {\n    break;\n  }\n  n++;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3,4,5,6,7') return null;\nreturn '1 dan 7 gacha chiqishi kerak';"
    },
    {
      id: 9,
      title: "Ikkita to'xtash nuqtasi (chegara)",
      instruction: "`i = 0` dan `10` gacha siklda `i === 2` bo'lganda to'xtating (`0`, `1`, `2` chiqishi kerak).",
      startingCode: "// for, if va break yozing\n",
      hint: "for (let i = 0; i <= 10; i++) {\n  console.log(i);\n  if (i === 2) {\n    break;\n  }\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    },
    {
      id: 10,
      title: "Qidiruv yakuni (chegara)",
      instruction: "`q = 5` berilgan. `i = 1` dan `10` gacha qidiring: `i === q` bo'lganda to'xtating (`1`-`5` chiqishi kerak).",
      startingCode: "let q = 5;\n// for, if va break yozing\n",
      hint: "for (let i = 1; i <= 10; i++) {\n  console.log(i);\n  if (i === q) {\n    break;\n  }\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3,4,5') return null;\nreturn '1 dan 5 gacha chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`for (let i = 1; i <= 5; i++) { console.log(i); break; }` nima chiqaradi?",
      options: [
        "1, 2, 3, 4, 5",
        "1",
        "Hech narsa",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Birinchi aylanishda break uchraydi. Sikl to'xtaydi."
    },
    {
      id: 2,
      question: "break nimani to'xtatadi?",
      options: [
        "Butun dasturni",
        "O'z siklini",
        "Faqat bir qatorni",
        "Hech narsani"
      ],
      correctAnswer: 1,
      explanation: "break faqat o'z siklini to'xtatadi. Keyingi kod ishlaydi."
    },
    {
      id: 3,
      question: "`break;` yolg'iz yozilsa nima bo'ladi?",
      options: [
        "Hech narsa bo'lmaydi",
        "SyntaxError beradi",
        "Dastur to'xtaydi",
        "true qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "break faqat sikl ichida yashaydi."
    },
    {
      id: 4,
      question: "`for (let i = 0; i < 5; i++) { brake; console.log(i); }` nima qiladi?",
      options: [
        "0 chiqaradi",
        "ReferenceError beradi",
        "0, 1, 2, 3, 4 chiqaradi",
        "Hech narsa chiqarmaydi"
      ],
      correctAnswer: 1,
      explanation: "brake degan so'z yo'q. Faqat aniq break yoziladi."
    },
    {
      id: 5,
      question: "`for (let i = 1; i <= 5; i++) { break; } console.log(\"Tugadi!\");` nima chiqaradi?",
      options: [
        "Hech narsa",
        "Tugadi!",
        "1, 2, 3, 4, 5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "break siklni to'xtatadi. Keyingi qator ishlaydi."
    },
    {
      id: 6,
      question: "`for (let i = 1; i <= 10; i++) { console.log(i); if (i === 3) { break; } }` nima chiqaradi?",
      options: [
        "1 dan 10 gacha",
        "1, 2, 3",
        "3",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "3 topilganda break ishlaydi. Qolgani chiqmaydi."
    },
    {
      id: 7,
      question: "break qayerda turishi kerak?",
      options: [
        "Sikldan tashqarida",
        "Sikl ichida",
        "Fayl boshida",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "break faqat sikl ichida ma'noga ega."
    },
    {
      id: 8,
      question: "`let i = 1; while (true) { console.log(i); break; }` nima chiqaradi?",
      options: [
        "Cheksiz 1",
        "1",
        "Hech narsa",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Shart har doim rost. Lekin break birinchi aylanishda to'xtatadi."
    },
    {
      id: 9,
      question: "`for (let i = 0; i <= 10; i++) { console.log(i); if (i === 2) { break; } }` nima chiqaradi?",
      options: [
        "0 dan 10 gacha",
        "0, 1, 2",
        "2",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "2 topilganda to'xtaydi."
    },
    {
      id: 10,
      question: "Topilgandan keyin to'xtash uchun nima kerak?",
      options: [
        "continue",
        "break",
        "if ning o'zi yetadi",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "if topadi, break to'xtatadi."
    },
    {
      id: 11,
      question: "`for (let i = 1; i <= 100; i++) { console.log(i); if (i === 5) { break; } }` nechta qiymat chiqadi?",
      options: [
        "100 ta",
        "5 ta",
        "1 ta",
        "Hech qanday"
      ],
      correctAnswer: 1,
      explanation: "1 dan 5 gacha chiqadi. 5 da to'xtaydi."
    },
    {
      id: 12,
      question: "break dan keyingi qatorlar nima bo'ladi?",
      options: [
        "O'chib ketadi",
        "Odatdagidek ishlaydi",
        "Xato beradi",
        "Takrorlanadi"
      ],
      correctAnswer: 1,
      explanation: "break faqat siklni to'xtatadi. Keyingi kodga tegmaydi."
    }
  ]
};
