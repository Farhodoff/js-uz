export const switchLesson = {
  id: "switchLesson",
  title: "switch (Ko'p yo'lli tanlov)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, lift ichidasiz. Panelda tugmalar: 1, 2, 3. Qaysi tugmani bossangiz, lift o'sha qavatga boradi. Noto'g'ri tugma bossangiz — "Bunday qavat yo'q" degan xabar chiqadi.

Dasturlashda \`switch\` (almashtirgich) xuddi shu lift paneli. Qiymat qaysi holatga mos kelsa, o'sha blok ishlaydi.

switch — bitta qiymatni bir nechta holat bilan solishtirib, mos kelganini ishga tushiradigan operatordir.

---

## 2. Nega kerak?

Hafta kuni bo'yicha xabar chiqishi kerak: 1 — "Dushanba", 2 — "Seshanba", 3 — "Chorshanba". \`if/else if\` bilan ham bo'ladi:

\`\`\`javascript
let day = 2;
if (day === 1) {
  console.log("Dushanba!");
} else if (day === 2) {
  console.log("Seshanba!");
} else if (day === 3) {
  console.log("Chorshanba!");
}
\`\`\`

Ishlaydi. Lekin har qator takrorlanadi. Holatlar ko'paysa, kod cho'zilib ketadi.

Muammo shunda: bitta qiymatning ko'p holati bor. Yechim — \`switch\`. Qiymat bir marta yoziladi. Holatlar ro'yxat bo'lib tiziladi.

---

## 3. Birinchi misol

Bu kod hafta kunini \`switch\` bilan aniqlaydi.

\`\`\`javascript
let day = 2; // Kun raqami
switch (day) { // Qiymat tekshiriladi
  case 1: // 1 bo'lsa:
    console.log("Dushanba!"); // Shu chiqadi
    break; // Shu yerda to'xtaydi
  case 2: // 2 bo'lsa:
    console.log("Seshanba!"); // Shu chiqadi
    break; // Shu yerda to'xtaydi
}
\`\`\`

\`\`\`text
// Natija: Seshanba!
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let day = 2;\` — tekshiriladigan qiymat saqlandi.
- \`switch (day) {\` — tanlov boshlandi. Qavs ichida qiymat turadi.
- \`case 1:\` — birinchi holat. \`day\` 1 ga tengmi? Yo'q. Tashlab ketildi.
- \`case 2:\` — ikkinchi holat. \`day\` 2 ga tengmi? Ha. Shu blokka kirildi.
- \`console.log("Seshanba!");\` — ikkinchi xabar chiqadi.
- \`break;\` — tanlov shu yerda yakunlanadi. Keyingi holatlarga o'tilmaydi.

---

## 5. Qadamma-qadam (trace)

Kompyuter holatlarni ketma-ket tekshiradi (\`day\` 2 bo'lganda):

| Qadam | Kod qatori | Tekshiruv | Natija |
|---|---|---|---|
| 1 | \`let day = 2;\` | — | \`day\` 2 bo'ldi |
| 2 | \`switch (day) {\` | — | Tanlov boshlandi |
| 3 | \`case 1:\` | 2 teng 1 mi? Yo'q | Tashlandi |
| 4 | \`case 2:\` | 2 teng 2 mi? Ha | Blok ichiga kirildi |
| 5 | \`console.log(...);\` | — | "Seshanba!" chiqdi |
| 6 | \`break;\` | — | Tanlov yakunlandi |

---

## 6. Yana bitta misol

Bu kod hech qaysi holat mos kelmaganda ishlaydigan \`default\` ni ko'rsatadi.

\`\`\`javascript
let day = 9; // Noto'g'ri raqam
switch (day) { // Qiymat tekshiriladi
  case 1: // 1 bo'lsa:
    console.log("Dushanba!"); // Shu chiqadi
    break; // Shu yerda to'xtaydi
  default: // Hech biri bo'lmasa:
    console.log("Bunday kun yo'q!"); // Shu chiqadi
}
\`\`\`

\`\`\`text
// Natija: Bunday kun yo'q!
\`\`\`

Qator-baqator tahlil:
- \`case 1:\` — \`9\` teng \`1\` mi? Yo'q. Tashlandi.
- \`default:\` — "qolgan barcha holatlar" degani. Hech biri mos kelmagani uchun shu blok ishladi.
- \`default\` — \`else\` ga o'xshaydi: oxirgi zaxira yo'l.

---

## 7. Ko'p uchraydigan xatolar

### 1. break ni unutish
❌ Xato kod:
\`\`\`javascript
let day = 1;
switch (day) {
  case 1:
    console.log("A!");
  case 2:
    console.log("B!");
}
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin ikkalasi ham chiqadi: "A!" va "B!". Sababi: \`break\` bo'lmasa, kompyuter to'xtamaydi. Keyingi holatga o'tib ketadi. Bu "oqib ketish" deb ataladi.
✅ To'g'ri variant:
\`\`\`javascript
let day = 1;
switch (day) {
  case 1:
    console.log("A!");
    break; // Shu yerda to'xtaydi
  case 2:
    console.log("B!");
    break;
}
\`\`\`

### 2. Qavsni unutish
❌ Xato kod:
\`\`\`javascript
let day = 1;
switch day {
  case 1:
    console.log("A!");
    break;
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'day'\` xatoligi yuz beradi. Qiymat har doim yumaloq qavs ichida yoziladi: \`switch (day)\`.
✅ To'g'ri variant:
\`\`\`javascript
let day = 1;
switch (day) {
  case 1:
    console.log("A!");
    break;
}
\`\`\`

### 3. case ni yolg'iz yozish
❌ Xato kod:
\`\`\`javascript
case 1:
  console.log("A!");
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token 'case'\` xatoligi yuz beradi. \`case\` yolg'iz yasholmaydi. U har doim \`switch\` ichida bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
let day = 1;
switch (day) {
  case 1:
    console.log("A!");
    break;
}
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`day\` ga \`2\` bering. \`switch\` yozing: \`1\` bo'lsa \`"Dushanba!"\`, \`2\` bo'lsa \`"Seshanba!"\` chiqsin.

### 2-mashq (O'rtacha)
\`day\` ga \`9\` bering. \`case 1\` va \`default\` yozing: \`"Bunday kun yo'q!"\` chiqsin.

### 3-mashq (Chegara holat)
\`break\` ni ataylab olib tashlang. Ikkala xabar ham chiqishini kuzating. Keyin \`break\` ni qaytaring.

### Javoblar:
1.
\`\`\`javascript
let day = 2;
switch (day) {
  case 1:
    console.log("Dushanba!");
    break;
  case 2:
    console.log("Seshanba!");
    break;
}
\`\`\`
2.
\`\`\`javascript
let day = 9;
switch (day) {
  case 1:
    console.log("Dushanba!");
    break;
  default:
    console.log("Bunday kun yo'q!");
}
\`\`\`
3.
\`\`\`javascript
let day = 1;
switch (day) {
  case 1:
    console.log("A!");
  case 2:
    console.log("B!");
}
// break siz ikkalasi ham chiqadi
\`\`\`

---

## 9. Xulosa

1. \`switch\` — bitta qiymatning ko'p holatini tekshiradi. Mos kelgani ishlaydi.
2. Har bir holat oxirida \`break\` yoziladi. Bo'lmasa, keyingi holatga oqib ketadi.
3. \`default\` — hech biri mos kelmaganda ishlaydigan zaxira blok.

Keyingi darsda: kodni takrorlaydigan \`while\` sikli bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Kun tanlash",
      instruction: "`day` ga `2` bering. `switch` yozing: `1` bo'lsa `\"Dushanba!\"`, `2` bo'lsa `\"Seshanba!\"` chiqsin.",
      startingCode: "let day = 2;\n// switch yozing\n",
      hint: "switch (day) {\n  case 1:\n    console.log(\"Dushanba!\");\n    break;\n  case 2:\n    console.log(\"Seshanba!\");\n    break;\n}",
      test: "if (!code.includes('switch') || !code.includes('case')) return 'switch va case ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Seshanba'))) return null;\nreturn 'Seshanba xabari chiqmadi';"
    },
    {
      id: 2,
      title: "Birinchi holat",
      instruction: "`day` ga `1` bering. Faqat BIRINCHI xabar chiqsin (`\"Dushanba!\"`).",
      startingCode: "let day = 1;\n// switch yozing\n",
      hint: "switch (day) {\n  case 1:\n    console.log(\"Dushanba!\");\n    break;\n  case 2:\n    console.log(\"Seshanba!\");\n    break;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'Faqat BITTA xabar chiqishi kerak (break kerak)';\nif (out[0].includes('Dushanba')) return null;\nreturn 'Dushanba xabari chiqmadi';"
    },
    {
      id: 3,
      title: "Zaxira yo'l",
      instruction: "`day` ga `9` bering. `case 1` va `default` yozing: `\"Bunday kun yo'q!\"` chiqsin.",
      startingCode: "let day = 9;\n// switch va default yozing\n",
      hint: "switch (day) {\n  case 1:\n    console.log(\"Dushanba!\");\n    break;\n  default:\n    console.log(\"Bunday kun yo'q!\");\n}",
      test: "if (!code.includes('default')) return 'default blokini yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"Bunday kun yo'q\"))) return null;\nreturn 'Zaxira xabar chiqmadi';"
    },
    {
      id: 4,
      title: "break ni unutish oqibati",
      instruction: "`day = 1` berilgan. `break` SIZ yozing: ikkalasi ham chiqsin (`\"A!\"` va `\"B!\"`).",
      startingCode: "let day = 1;\nswitch (day) {\n  case 1:\n    console.log(\"A!\");\n  case 2:\n    console.log(\"B!\");\n}\n",
      hint: "break yozmang — hozircha shunday qolsin.",
      test: "if (code.includes('break')) return 'Bu mashqda break yozmang';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikkalasi ham chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "Oqib ketishni to'xtatish",
      instruction: "4-mashqdagi kodga `break` qo'shing: faqat `\"A!\"` chiqsin.",
      startingCode: "let day = 1;\nswitch (day) {\n  case 1:\n    console.log(\"A!\");\n  case 2:\n    console.log(\"B!\");\n}\n",
      hint: "case 1 blokining oxiriga break; qo'shing.",
      test: "if (!code.includes('break')) return 'break qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 1) return 'Faqat BITTA xabar chiqishi kerak';\nif (out[0].includes('A!')) return null;\nreturn 'A xabari chiqmadi';"
    },
    {
      id: 6,
      title: "Qavs xatosini tuzatish",
      instruction: "`switch day` dagi qavs xatosini tuzating (`day = 1` berilgan). `\"Dushanba!\"` chiqsin.",
      startingCode: "let day = 1;\nswitch day {\n  case 1:\n    console.log(\"Dushanba!\");\n    break;\n}\n",
      hint: "switch (day) {",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Dushanba'))) return null;\nreturn 'Dushanba xabari chiqmadi';"
    },
    {
      id: 7,
      title: "Yolg'iz case ni tuzatish (chegara)",
      instruction: "`case` yolg'iz qolgan. Uni `switch (day)` ichiga oling (`day = 1` berilgan).",
      startingCode: "let day = 1;\ncase 1:\n  console.log(\"Dushanba!\");\n",
      hint: "switch (day) {\n  case 1:\n    console.log(\"Dushanba!\");\n    break;\n}",
      test: "if (!code.includes('switch')) return 'switch ichiga oling';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Dushanba'))) return null;\nreturn 'Dushanba xabari chiqmadi';"
    },
    {
      id: 8,
      title: "Uchta holat (chegara)",
      instruction: "`n = 3` berilgan. Uchta `case` yozing (`1`, `2`, `3`). `\"Uch!\"` chiqsin.",
      startingCode: "let n = 3;\n// switch yozing\n",
      hint: "switch (n) {\n  case 1:\n    console.log(\"Bir!\");\n    break;\n  case 2:\n    console.log(\"Ikki!\");\n    break;\n  case 3:\n    console.log(\"Uch!\");\n    break;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Uch'))) return null;\nreturn 'Uch xabari chiqmadi';"
    },
    {
      id: 9,
      title: "Matnli holat (chegara)",
      instruction: "`color = \"qizil\"` berilgan. `case \"qizil\"` yozing: `\"To'xtang!\"` chiqsin.",
      startingCode: "let color = \"qizil\";\n// switch yozing\n",
      hint: "switch (color) {\n  case \"qizil\":\n    console.log(\"To'xtang!\");\n    break;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes(\"To'xtang\"))) return null;\nreturn 'Xabar chiqmadi';"
    },
    {
      id: 10,
      title: "Baho tanlash (chegara)",
      instruction: "`grade = \"B\"` berilgan. Uchta holat yozing (`\"A\"`, `\"B\"`, `\"C\"`). `\"Yaxshi!\"` chiqsin.",
      startingCode: "let grade = \"B\";\n// switch yozing\n",
      hint: "switch (grade) {\n  case \"A\":\n    console.log(\"A'lo!\");\n    break;\n  case \"B\":\n    console.log(\"Yaxshi!\");\n    break;\n  case \"C\":\n    console.log(\"Past!\");\n    break;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('Yaxshi'))) return null;\nreturn 'Yaxshi xabari chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let day = 2; switch (day) { case 1: console.log(\"A\"); break; case 2: console.log(\"B\"); break; }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "A va B",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "day 2 ga teng. Ikkinchi holat ishlaydi."
    },
    {
      id: 2,
      question: "break vazifasi nima?",
      options: [
        "Kodni buzadi",
        "Tanlovni shu yerda yakunlaydi",
        "Boshiga qaytaradi",
        "Hech narsa qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "break bo'lmasa, keyingi holatga oqib ketadi."
    },
    {
      id: 3,
      question: "`let day = 1; switch (day) { case 1: console.log(\"A\"); case 2: console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "Faqat A",
        "A va B",
        "Faqat B",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "break yo'q. Birinchi holatdan boshlab ikkalasi ham chiqadi."
    },
    {
      id: 4,
      question: "default bloki qachon ishlaydi?",
      options: [
        "Har doim",
        "Hech biri mos kelmaganda",
        "Birinchi bo'lib",
        "Hech qachon"
      ],
      correctAnswer: 1,
      explanation: "default — zaxira yo'l. Mos holat topilmasa ishlaydi."
    },
    {
      id: 5,
      question: "`switch day { case 1: ... }` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Ogohlantirish beradi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Qiymat qavs ichida bo'lishi shart: switch (day)."
    },
    {
      id: 6,
      question: "`case 1: console.log(\"A\");` yolg'iz yozilsa nima bo'ladi?",
      options: [
        "A chiqadi",
        "SyntaxError beradi",
        "Hech narsa chiqmaydi",
        "1 chiqadi"
      ],
      correctAnswer: 1,
      explanation: "case yolg'iz yasholmaydi. U switch ichida bo'lishi shart."
    },
    {
      id: 7,
      question: "`let day = 9; switch (day) { case 1: console.log(\"A\"); break; default: console.log(\"B\"); }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "A va B",
        "9"
      ],
      correctAnswer: 1,
      explanation: "9 hech biriga teng emas. default ishlaydi."
    },
    {
      id: 8,
      question: "switch nimani tekshiradi?",
      options: [
        "Faqat sonlarni",
        "Bitta qiymatning holatlarini",
        "Faqat matnlarni",
        "Hech narsani"
      ],
      correctAnswer: 1,
      explanation: "switch bitta qiymatni bir nechta holat bilan solishtiradi."
    },
    {
      id: 9,
      question: "`let n = 3; switch (n) { case 1: console.log(\"A\"); break; case 2: console.log(\"B\"); break; case 3: console.log(\"C\"); break; }` nima chiqaradi?",
      options: [
        "A",
        "B",
        "C",
        "ABC"
      ],
      correctAnswer: 2,
      explanation: "n 3 ga teng. Uchinchi holat ishlaydi."
    },
    {
      id: 10,
      question: "`let color = \"qizil\"; switch (color) { case \"qizil\": console.log(\"A\"); break; }` nima chiqaradi?",
      options: [
        "Xatolik (faqat son bo'ladi)",
        "A",
        "qizil",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "switch matn bilan ham ishlaydi."
    },
    {
      id: 11,
      question: "Har bir case oxirida nima yoziladi?",
      options: [
        "Hech narsa",
        "break",
        "else",
        "end"
      ],
      correctAnswer: 1,
      explanation: "break yozilmasa, keyingi holatga oqib ketadi."
    },
    {
      id: 12,
      question: "switch ga muqobil yozuv qaysi?",
      options: [
        "for sikli",
        "if / else if zanjiri",
        "console.log",
        "let"
      ],
      correctAnswer: 1,
      explanation: "Ko'p holatni if / else if bilan ham yozsa bo'ladi. switch qisqaroq."
    }
  ]
};
