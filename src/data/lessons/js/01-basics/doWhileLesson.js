export const doWhileLesson = {
  id: "doWhileLesson",
  title: "do...while Sikli",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, oshxonasiz. Qoida bunday: "Avval ovqatni tatib ko'r. Keyin so'ra: yana kerakmi?" Tatib ko'rish — shartsiz. Birinchi qoshiq albatta og'izda bo'ladi.

Dasturlashda \`do...while\` (bajar... toki) xuddi shu qoida. Avval blok BIR marta ishlaydi. Keyin shart tekshiriladi.

do...while — blokni avval bir marta bajarib, keyin shart rost ekan takrorlaydigan sikldir.

---

## 2. Nega kerak?

\`while\` da shart BIRINCHI tekshiriladi:

\`\`\`javascript
let i = 10;
while (i < 3) {
  console.log(i);
}
\`\`\`

Hech narsa chiqmaydi. Blok bir marta ham ishlamaydi.

Muammo shunda: ba'zan blok kamida bir marta ishlashi shart. Keyin shart tekshirilsa bo'ladi. Yechim — \`do...while\`:

\`\`\`javascript
let i = 10;
do {
  console.log(i);
} while (i < 3);
\`\`\`

\`10\` chiqadi! Blok birinchi ishladi. Keyin shart yolg'on bo'lib to'xtadi.

---

## 3. Birinchi misol

Bu kod shart yolg'on bo'lsa ham bir marta ishlaydi.

\`\`\`javascript
let i = 10; // Boshlanish: 10
do { // Avval bajariladi
  console.log(i); // 10 chiqadi
} while (i < 3); // Keyin tekshiriladi
\`\`\`

\`\`\`text
// Natija: 10
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let i = 10;\` — hisoblagich yaratildi.
- \`do {\` — "bajar" degani. Shart so'ralmaydi. To'g'ri blokka kiriladi.
- \`console.log(i);\` — \`10\` chiqadi. Blok birinchi marta ishladi.
- \`} while (i < 3);\` — endi shart tekshiriladi. \`10 < 3\` yolg'on. Sikl to'xtaydi.

---

## 5. Qadamma-qadam (trace)

\`i\` 10 bo'lganda qadamlar:

| Qadam | Kod qatori | Holat | Natija |
|---|---|---|---|
| 1 | \`let i = 10;\` | — | \`i\` 10 bo'ldi |
| 2 | \`do {\` | Tekshiruv yo'q | Blok ichiga kirildi |
| 3 | \`console.log(i);\` | — | 10 chiqdi |
| 4 | \`} while (i < 3);\` | 10 < 3? Yo'q | To'xtaydi |

Blok tekshiruvdan OLDIN ishladi. Shuning uchun bitta natija bor.

---

## 6. Yana bitta misol

Bu kod shart rost bo'lganda takrorlanishini ko'rsatadi.

\`\`\`javascript
let i = 1; // Boshlanish: 1
do { // Avval bajariladi
  console.log(i); // Hozirgi qiymat chiqadi
  i++; // Keyingi qadam
} while (i <= 3); // 3 gacha takrorlanadi
\`\`\`

\`\`\`text
// Natija:
1
2
3
\`\`\`

Qator-baqator tahlil:
- Birinchi aylanish shartsiz ishladi: \`1\` chiqdi.
- Keyin shart tekshirildi: \`2 <= 3\` rost. Davom etdi.
- \`4 <= 3\` yolg'on bo'lganda to'xtadi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`javascript
let i = 0;
do {
  console.log(i);
  i++;
} while i < 3;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'i'\` xatoligi yuz beradi. Shart har doim yumaloq qavs ichida yoziladi: \`while (i < 3);\`.
✅ To'g'ri variant:
\`\`\`javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
\`\`\`

### 2. while qismini unutish
❌ Xato kod:
\`\`\`javascript
let i = 0;
do {
  console.log(i);
  i++;
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '}'\` xatoligi yuz beradi. \`do\` yolg'iz qolishi mumkin emas. Oxirida har doim \`while (shart);\` bo'lishi shart.
✅ To'g'ri variant:
\`\`\`javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
\`\`\`

### 3. while bilan adashtirish
❌ Xato tushuncha: \`do...while\` ham shart yolg'on bo'lsa hech narsa chiqarmaydi deb o'ylash.
Nima bo'ladi: xato. \`do...while\` da blok har doim kamida bir marta ishlaydi. Farq shunda: \`while\` avval tekshiradi, \`do...while\` avval bajaradi.
✅ To'g'ri variant:
\`\`\`javascript
let i = 10;
do {
  console.log(i); // 10 chiqadi
} while (i < 3);
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`i\` ga \`1\` bering. \`do...while\` bilan \`3\` gacha chiqaring (\`1\`, \`2\`, \`3\` bo'lsin).

### 2-mashq (O'rtacha)
\`i\` ga \`10\` bering. \`i < 3\` sharti bilan yozing. Bir marta chiqsin (\`10\` chiqishi kerak).

### 3-mashq (Chegara holat)
\`while\` va \`do...while\` farqini isbotlang: \`i = 10\`, shart \`i < 3\`. Avval \`while\` bilan (bo'sh), keyin \`do...while\` bilan (\`10\` chiqadi) yozing.

### Javoblar:
1.
\`\`\`javascript
let i = 1;
do {
  console.log(i);
  i++;
} while (i <= 3);
\`\`\`
2.
\`\`\`javascript
let i = 10;
do {
  console.log(i);
} while (i < 3);
\`\`\`
3.
\`\`\`javascript
let i = 10;
while (i < 3) {
  console.log(i); // Chiqmaydi
}
do {
  console.log(i); // 10 chiqadi
} while (i < 3);
\`\`\`

---

## 9. Xulosa

1. \`do...while\` — blokni avval bir marta bajaradi, keyin shartni tekshiradi.
2. Shart qavs ichida yoziladi. Oxirida \`while (shart);\` bo'lishi shart.
3. Shart birinchi tekshiruvdayoq yolg'on bo'lsa ham, bitta natija chiqadi.

Keyingi darsda: siklni to'xtatadigan \`break\` operatori bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1 dan 3 gacha",
      instruction: "`i` ga `1` bering. `do...while` bilan `3` gacha chiqaring (`1`, `2`, `3` chiqishi kerak).",
      startingCode: "let i = 1;\n// do...while yozing\n",
      hint: "do {\n  console.log(i);\n  i++;\n} while (i <= 3);",
      test: "if (!code.includes('do') || !code.includes('while')) return 'do...while ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn '1, 2, 3 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "Bir marta ishlash",
      instruction: "`i` ga `10` bering. `i < 3` sharti bilan yozing. Bir marta chiqsin (`10` chiqishi kerak).",
      startingCode: "let i = 10;\n// do...while yozing\n",
      hint: "do {\n  console.log(i);\n} while (i < 3);",
      test: "if (!code.includes('do') || !code.includes('while')) return 'do...while ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '10') return null;\nreturn 'Faqat 10 chiqishi kerak';"
    },
    {
      id: 3,
      title: "Qavs xatosini tuzatish",
      instruction: "`while i < 3` dagi qavs xatosini tuzating (`i = 0` berilgan). `0`, `1`, `2` chiqsin.",
      startingCode: "let i = 0;\ndo {\n  console.log(i);\n  i++;\n} while i < 3;\n",
      hint: "} while (i < 3);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    },
    {
      id: 4,
      title: "while qismini qo'shish",
      instruction: "`do` yolg'iz qolgan. Oxiriga `while (i < 3);` qo'shing (`i = 0` berilgan).",
      startingCode: "let i = 0;\ndo {\n  console.log(i);\n  i++;\n}\n",
      hint: "} while (i < 3);",
      test: "if (!code.includes('while')) return 'while qismini qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    },
    {
      id: 5,
      title: "Teskari sanash",
      instruction: "`n` ga `3` bering. `n > 0` ekan chiqaring va kamaytiring (`3`, `2`, `1`).",
      startingCode: "let n = 3;\n// do...while yozing\n",
      hint: "do {\n  console.log(n);\n  n--;\n} while (n > 0);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '3,2,1') return null;\nreturn '3, 2, 1 chiqishi kerak';"
    },
    {
      id: 6,
      title: "Farqni isbotlash (chegara)",
      instruction: "`i = 10`, shart `i < 3`. Avval `while` bilan yozing (bo'sh), keyin `do...while` bilan (`10` chiqadi).",
      startingCode: "let i = 10;\n// Avval while, keyin do...while yozing\n",
      hint: "while (i < 3) {\n  console.log(i);\n}\ndo {\n  console.log(i);\n} while (i < 3);",
      test: "if (!code.includes('do') || !code.includes('while')) return 'Ikkalasini ham yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '10') return null;\nreturn 'Faqat bitta 10 chiqishi kerak (do...while dan)';"
    },
    {
      id: 7,
      title: "0 dan 4 gacha (chegara)",
      instruction: "`i` ga `0` bering. `i <= 4` ekan chiqaring va oshiring.",
      startingCode: "let i = 0;\n// do...while yozing\n",
      hint: "do {\n  console.log(i);\n  i++;\n} while (i <= 4);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2,3,4') return null;\nreturn '0, 1, 2, 3, 4 chiqishi kerak';"
    },
    {
      id: 8,
      title: "5 dan 1 gacha (chegara)",
      instruction: "`n` ga `5` bering. `n > 0` ekan chiqaring va kamaytiring.",
      startingCode: "let n = 5;\n// do...while yozing\n",
      hint: "do {\n  console.log(n);\n  n--;\n} while (n > 0);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '5,4,3,2,1') return null;\nreturn '5, 4, 3, 2, 1 chiqishi kerak';"
    },
    {
      id: 9,
      title: "Yig'indi (chegara)",
      instruction: "`sum = 0`, `i = 1` berilgan. `i <= 4` ekan qo'shing. Oxirida chiqaring (`10` chiqishi kerak).",
      startingCode: "let sum = 0;\nlet i = 1;\n// do...while yozing\nconsole.log(sum);\n",
      hint: "do {\n  sum += i;\n  i++;\n} while (i <= 4);",
      test: "if (!code.includes('do')) return 'do...while ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out[out.length - 1] === '10') return null;\nreturn 'Oxirgi natija 10 bolishi kerak';"
    },
    {
      id: 10,
      title: "Bitta qadam (chegara)",
      instruction: "`i` ga `0` bering. `i < 1` sharti bilan yozing. Faqat `0` chiqishi kerak.",
      startingCode: "let i = 0;\n// do...while yozing\n",
      hint: "do {\n  console.log(i);\n  i++;\n} while (i < 1);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0') return null;\nreturn 'Faqat 0 chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let i = 1; do { console.log(i); i++; } while (i <= 3);` nima chiqaradi?",
      options: [
        "1, 2, 3",
        "1, 2, 3, 4",
        "Hech narsa",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 0,
      explanation: "Blok ishlaydi, keyin shart tekshiriladi: 1, 2, 3."
    },
    {
      id: 2,
      question: "`let i = 10; do { console.log(i); } while (i < 3);` nima chiqaradi?",
      options: [
        "Hech narsa",
        "10",
        "Xatolik",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 1,
      explanation: "Blok avval bir marta ishlaydi. Keyin shart yolg'on bo'lib to'xtaydi."
    },
    {
      id: 3,
      question: "do...while bilan while ning farqi nima?",
      options: [
        "Farqi yo'q",
        "do...while kamida bir marta ishlaydi",
        "while tezroq",
        "do...while faqat bir marta ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "do...while avval bajaradi, keyin tekshiradi."
    },
    {
      id: 4,
      question: "`} while i < 3;` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Bir marta ishlaydi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Shart qavs ichida bo'lishi shart: while (i < 3)."
    },
    {
      id: 5,
      question: "`do { ... }` yolg'iz (while siz) yozilsa nima bo'ladi?",
      options: [
        "Bir marta ishlaydi",
        "SyntaxError beradi",
        "Cheksiz ishlaydi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "do yolg'iz qolishi mumkin emas. Oxirida while (shart) shart."
    },
    {
      id: 6,
      question: "`let n = 3; do { console.log(n); n--; } while (n > 0);` nima chiqaradi?",
      options: [
        "1, 2, 3",
        "3, 2, 1",
        "3, 2, 1, 0",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "n 3, 2, 1 bo'lganda shart rost. 0 bo'lganda to'xtaydi."
    },
    {
      id: 7,
      question: "`let i = 10; while (i < 3) { console.log(i); }` bilan `do...while` varianti farqi nima?",
      options: [
        "Farqi yo'q",
        "Birinchisi bo'sh, ikkinchisi 10 chiqaradi",
        "Ikkalasi ham 10 chiqaradi",
        "Ikkalasi ham xato beradi"
      ],
      correctAnswer: 1,
      explanation: "while avval tekshiradi (bo'sh). do...while avval bajaradi (10 chiqadi)."
    },
    {
      id: 8,
      question: "`let i = 0; do { console.log(i); i++; } while (i <= 4);` nima chiqaradi?",
      options: [
        "0, 1, 2, 3",
        "0, 1, 2, 3, 4",
        "1, 2, 3, 4",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 1,
      explanation: "i 0 dan 4 gacha: beshta qiymat chiqadi."
    },
    {
      id: 9,
      question: "`let sum = 0; let i = 1; do { sum += i; i++; } while (i <= 4); console.log(sum);` nima chiqaradi?",
      options: [
        "4",
        "10",
        "24",
        "0"
      ],
      correctAnswer: 1,
      explanation: "sum = 1+2+3+4 = 10."
    },
    {
      id: 10,
      question: "`do { ... } while (...);` oxiridagi nuqta-vergul shartmi?",
      options: [
        "Ha, har doim yoziladi",
        "Yo'q, yozilmasa ham ishlaydi",
        "Faqat xato bo'lganda",
        "Hech qachon yozilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Nuqta-vergulsiz ham ishlaydi. Lekin yozish odatga aylansin."
    },
    {
      id: 11,
      question: "`let i = 0; do { console.log(i); i++; } while (i < 1);` necha marta ishlaydi?",
      options: [
        "0 marta",
        "1 marta",
        "Cheksiz",
        "2 marta"
      ],
      correctAnswer: 1,
      explanation: "Birinchi marta shartsiz ishlaydi. Keyin i 1 bo'lib to'xtaydi."
    },
    {
      id: 12,
      question: "Qaysi sikl kamida bir marta ishlaydi?",
      options: [
        "while",
        "do...while",
        "for",
        "Hech biri"
      ],
      correctAnswer: 1,
      explanation: "Faqat do...while avval bajaradi, keyin tekshiradi."
    }
  ]
};
