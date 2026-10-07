export const arrayBasics = {
  id: "arrayBasics",
  title: "Massiv Yaratish va Murojaat",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, dorixonada dori qutisi bor. Quti ichida raqamlangan katakchalar: 0, 1, 2. Har bir katakchada bitta dori turadi. Keraklisini raqami orqali olasiz.

Dasturlashda massiv (array) xuddi shu quti. Ichida bir nechta qiymat turadi. Har birining raqami (indeksi) bor.

Massiv — bitta nom ostida bir nechta qiymatni saqlaydigan to'plamdir.

---

## 2. Nega kerak?

Uch o'quvchining baholari kerak: 5, 4, 3. Alohida o'zgaruvchilar bilan ham bo'ladi:

\`\`\`javascript
let a = 5;
let b = 4;
let c = 3;
\`\`\`

Uchta nom. O'ttizta baho bo'lsa — o'ttizta nom. Adashish oson.

Muammo shunda: bir turdagi ko'p qiymatni bitta nomda saqlash kerak. Yechim — massiv:

\`\`\`javascript
let baholar = [5, 4, 3];
console.log(baholar[0]);
\`\`\`

Bitta nom. Ichida uchta qiymat. Raqami orqali olinadi.

---

## 3. Birinchi misol

Bu kod uchta mevadan massiv yasaydi va birinchisini chiqaradi.

\`\`\`javascript
let mevalar = ["olma", "nok", "uzum"]; // Uchta qiymat
console.log(mevalar[0]); // Birinchisi chiqadi
\`\`\`

\`\`\`text
// Natija: olma
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let mevalar = ["olma", "nok", "uzum"];\` — massiv yaratildi. Kvadrat qavs ichida qiymatlar vergul bilan yoziladi.
- \`mevalar[0]\` — murojaat. Birinchi qiymat olindi. Sanoq 0 dan boshlanadi: 0 — birinchi, 1 — ikkinchi, 2 — uchinchi.
- \`console.log(mevalar[0]);\` — \`olma\` chiqadi.

---

## 5. Qadamma-qadam (trace)

Qiymatlar katakchalarga qanday joylashadi:

| Katak (indeks) | 0 | 1 | 2 |
|---|---|---|---|
| Qiymat | "olma" | "nok" | "uzum" |

\`mevalar[0]\` — 0-katak → "olma". \`mevalar[1]\` — 1-katak → "nok". \`mevalar[2]\` — 2-katak → "uzum".

---

## 6. Yana bitta misol

Bu kod sonlar massivini va uzunligini ko'rsatadi.

\`\`\`javascript
let ballar = [10, 20, 30]; // Uchta son
console.log(ballar[2]); // Oxirgisi chiqadi
console.log(ballar.length); // Soni chiqadi
\`\`\`

\`\`\`text
// Natija:
30
3
\`\`\`

Qator-baqator tahlil:
- \`ballar[2]\` — 2-katak. Oxirgi qiymat \`30\` chiqadi.
- \`ballar.length\` — massivda nechta qiymat borligini aytadi. Uchta qiymat bor. Natija \`3\`.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`javascript
let m = 1, 2, 3;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected number\` xatoligi yuz beradi. Bir nechta qiymat faqat kvadrat qavs ichida yashaydi: \`[1, 2, 3]\`.
✅ To'g'ri variant:
\`\`\`javascript
let m = [1, 2, 3];
console.log(m[0]); // 1 chiqadi
\`\`\`

### 2. 1 dan boshlash
❌ Xato kod:
\`\`\`javascript
let mevalar = ["olma", "nok", "uzum"];
console.log(mevalar[1]);
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin "olma" emas, "nok" chiqadi! Sababi: sanoq 0 dan boshlanadi. Birinchi qiymat — \`[0]\`.
✅ To'g'ri variant:
\`\`\`javascript
let mevalar = ["olma", "nok", "uzum"];
console.log(mevalar[0]); // olma chiqadi
\`\`\`

### 3. Yo'q katakni so'rash
❌ Xato kod:
\`\`\`javascript
let m = [1, 2, 3];
console.log(m[5]);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin \`undefined\` chiqadi. Sababi: 5-katak mavjud emas. Yo'q katak so'ralsa, JavaScript \`undefined\` beradi.
✅ To'g'ri tushuncha: avval \`length\` bilan tekshiriladi. Katak raqami uzunlikdan kichik bo'lishi kerak.

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`["olma", "nok", "uzum"]\` massivini \`mevalar\` ga saqlang. Birinchisini chiqaring (\`olma\` chiqishi kerak).

### 2-mashq (O'rtacha)
\`[10, 20, 30]\` massivini \`ballar\` ga saqlang. Oxirgisini va uzunligini chiqaring (\`30\` va \`3\` chiqishi kerak).

### 3-mashq (Chegara holat)
\`[1, 2, 3]\` massivida \`m[5]\` ni chiqaring. \`undefined\` chiqishini tasdiqlang (bu xato emas).

### Javoblar:
1.
\`\`\`javascript
let mevalar = ["olma", "nok", "uzum"];
console.log(mevalar[0]);
\`\`\`
2.
\`\`\`javascript
let ballar = [10, 20, 30];
console.log(ballar[2]);
console.log(ballar.length);
\`\`\`
3.
\`\`\`javascript
let m = [1, 2, 3];
console.log(m[5]); // undefined chiqadi
\`\`\`

---

## 9. Xulosa

1. Massiv — bitta nomda bir nechta qiymat. Kvadrat qavs ichida vergul bilan yoziladi.
2. Sanoq 0 dan boshlanadi. Birinchi qiymat — \`[0]\`.
3. Yo'q katak so'ralsa, \`undefined\` chiqadi. Uzunlik \`length\` bilan bilinadi.

Keyingi darsda: oxiriga qo'shadigan va oxirgisini oladigan \`push\` va \`pop\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi meva",
      instruction: "`[\"olma\", \"nok\", \"uzum\"]` ni `mevalar` ga saqlang. Birinchisini chiqaring (`olma` chiqishi kerak).",
      startingCode: "// mevalar massivini yarating va birinchisini chiqaring\n",
      hint: "let mevalar = [\"olma\", \"nok\", \"uzum\"];\nconsole.log(mevalar[0]);",
      test: "if (!code.includes('[') || !code.includes(']')) return 'Massiv qavsi ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('olma'))) return null;\nreturn 'olma chiqmadi';"
    },
    {
      id: 2,
      title: "Ikkinchi qiymat",
      instruction: "`[10, 20, 30]` ni `ballar` ga saqlang. Ikkinchisini chiqaring (`20` chiqishi kerak).",
      startingCode: "// ballar massivini yarating va ikkinchisini chiqaring\n",
      hint: "let ballar = [10, 20, 30];\nconsole.log(ballar[1]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '20')) return null;\nreturn '20 chiqmadi';"
    },
    {
      id: 3,
      title: "Oxirgi qiymat",
      instruction: "`[10, 20, 30]` da oxirgisini chiqaring (`30` chiqishi kerak).",
      startingCode: "let ballar = [10, 20, 30];\n// Oxirgisini chiqaring\n",
      hint: "console.log(ballar[2]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '30')) return null;\nreturn '30 chiqmadi';"
    },
    {
      id: 4,
      title: "Uzunlik",
      instruction: "`[10, 20, 30]` ning uzunligini chiqaring (`3` chiqishi kerak).",
      startingCode: "let ballar = [10, 20, 30];\n// Uzunligini chiqaring\n",
      hint: "console.log(ballar.length);",
      test: "if (!code.includes('.length')) return 'length ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '3')) return null;\nreturn '3 chiqmadi';"
    },
    {
      id: 5,
      title: "Qavs xatosini tuzatish",
      instruction: "`let m = 1, 2, 3;` xato bermoqda. Qavs bilan tuzating (`1` chiqsin).",
      startingCode: "let m = 1, 2, 3;\nconsole.log(m[0]);\n",
      hint: "let m = [1, 2, 3];",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '1')) return null;\nreturn '1 chiqmadi';"
    },
    {
      id: 6,
      title: "Nolinchi katak (chegara)",
      instruction: "`[\"a\", \"b\", \"c\"]` da `m[0]` ni chiqaring (`a` chiqishi kerak — sanoq noldan).",
      startingCode: "let m = [\"a\", \"b\", \"c\"];\n// m[0] ni chiqaring\n",
      hint: "console.log(m[0]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'a')) return null;\nreturn 'a chiqmadi';"
    },
    {
      id: 7,
      title: "Yo'q katak (chegara)",
      instruction: "`[1, 2, 3]` da `m[5]` ni chiqaring (`undefined` chiqadi — bu xato emas).",
      startingCode: "let m = [1, 2, 3];\n// m[5] ni chiqaring\n",
      hint: "console.log(m[5]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === 'undefined')) return null;\nreturn 'undefined chiqmadi';"
    },
    {
      id: 8,
      title: "Qiymatni almashtirish (chegara)",
      instruction: "`[1, 2, 3]` da `m[0]` ga `9` yozing (`m[0] = 9;`). Keyin chiqaring (`9` chiqishi kerak).",
      startingCode: "let m = [1, 2, 3];\n// m[0] ga 9 yozing va chiqaring\n",
      hint: "m[0] = 9;\nconsole.log(m[0]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '9')) return null;\nreturn '9 chiqmadi';"
    },
    {
      id: 9,
      title: "Mantiqiy massiv (chegara)",
      instruction: "`[true, false, true]` ni `ok` ga saqlang. O'rtadagisini chiqaring (`false` chiqishi kerak).",
      startingCode: "// ok massivini yarating va o'rtadagisini chiqaring\n",
      hint: "let ok = [true, false, true];\nconsole.log(ok[1]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x);\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(x => x[0] === false)) return null;\nreturn 'false chiqmadi';"
    },
    {
      id: 10,
      title: "Hammasi birga (chegara)",
      instruction: "`[5, 10, 15]` ni `n` ga saqlang. Uchalasini alohida chiqaring (`5`, `10`, `15`).",
      startingCode: "let n = [5, 10, 15];\n// Uchalasini chiqaring\n",
      hint: "console.log(n[0]);\nconsole.log(n[1]);\nconsole.log(n[2]);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '5,10,15') return null;\nreturn '5, 10, 15 chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let m = [\"olma\", \"nok\", \"uzum\"]; console.log(m[0]);` nima chiqaradi?",
      options: [
        "nok",
        "olma",
        "uzum",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Sanoq noldan boshlanadi. Birinchi qiymat [0] da."
    },
    {
      id: 2,
      question: "Massiv qanday belgilanadi?",
      options: [
        "Oddiy qavs ()",
        "Kvadrat qavs []",
        "Jingalak qavs {}",
        "Qo'shtirnoq"
      ],
      correctAnswer: 1,
      explanation: "Qiymatlar kvadrat qavs ichida vergul bilan yoziladi."
    },
    {
      id: 3,
      question: "`let m = [10, 20, 30]; console.log(m[2]);` nima chiqaradi?",
      options: [
        "10",
        "20",
        "30",
        "Xatolik"
      ],
      correctAnswer: 2,
      explanation: "2-katak — uchinchi qiymat: 30."
    },
    {
      id: 4,
      question: "`let m = [10, 20, 30]; console.log(m.length);` nima chiqaradi?",
      options: [
        "30",
        "3",
        "2",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "length qiymatlar sonini aytadi: 3 ta."
    },
    {
      id: 5,
      question: "`let m = 1, 2, 3;` qatorida nima bo'ladi?",
      options: [
        "Massiv yasaladi",
        "SyntaxError beradi",
        "Faqat 1 saqlanadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Qavssiz bir nechta qiymat yozib bo'lmaydi."
    },
    {
      id: 6,
      question: "`let m = [1, 2, 3]; console.log(m[5]);` nima chiqaradi?",
      options: [
        "Xatolik",
        "undefined",
        "5",
        "3"
      ],
      correctAnswer: 1,
      explanation: "Yo'q katak so'ralsa, xato bermaydi. undefined chiqadi."
    },
    {
      id: 7,
      question: "Birinchi qiymat qaysi katakda?",
      options: [
        "[1]",
        "[0]",
        "[-1]",
        "[birinchi]"
      ],
      correctAnswer: 1,
      explanation: "Sanoq har doim noldan boshlanadi."
    },
    {
      id: 8,
      question: "`let m = [1, 2, 3]; m[0] = 9; console.log(m[0]);` nima chiqaradi?",
      options: [
        "1",
        "9",
        "Xatolik",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Katak qiymati yangilandi: endi 9 turibdi."
    },
    {
      id: 9,
      question: "`let ok = [true, false, true]; console.log(ok[1]);` nima chiqaradi?",
      options: [
        "true",
        "false",
        "1",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "1-katak — ikkinchi qiymat: false."
    },
    {
      id: 10,
      question: "`let n = [5, 10, 15]; console.log(n[0]); console.log(n[1]); console.log(n[2]);` nima chiqaradi?",
      options: [
        "5",
        "5, 10, 15",
        "15, 10, 5",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Har biri o'z katagidan chiqadi."
    },
    {
      id: 11,
      question: "`let m = [\"a\", \"b\", \"c\", \"d\"]; console.log(m.length);` nima chiqaradi?",
      options: [
        "3",
        "4",
        "d",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "To'rtta qiymat bor. Uzunligi 4."
    },
    {
      id: 12,
      question: "`let m = []; console.log(m.length);` nima chiqaradi?",
      options: [
        "Xatolik",
        "0",
        "undefined",
        "null"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh massivda hech narsa yo'q. Uzunligi 0."
    }
  ]
};
