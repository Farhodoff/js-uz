export const forLesson = {
  id: "forLesson",
  title: "for Sikli",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, oshpaz guruch pishirmoqda. Retseptda uchta ma'lumot bitta qatorda yozilgan: "0 dan boshla, 3 gacha davom et, har safar 1 taga oshir."

Dasturlashda \`for\` (uchun) xuddi shu retsept qatori. Boshlanish, shart va qadam — bitt joyda, qavs ichida yoziladi.

for — boshi va oxiri oldindan ma'lum bo'lgan takrorlash uchun ishlatiladigan sikl operatordir.

---

## 2. Nega kerak?

\`while\` bilan ham takrorlash bo'ladi:

\`\`\`javascript
let i = 1;
while (i <= 3) {
  console.log(i);
  i++;
}
\`\`\`

Ishlaydi. Lekin uchta narsa uch joyda sochilib yotibdi: boshlanish yuqorida, shart o'rtada, qadam pastda. Bittasini unutish oson.

Muammo shunda: takrorlash tartibini bir joyda ko'rish kerak. Yechim — \`for\`. Uchala qism bitta qatorda:

\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
\`\`\`

Boshlanish, shart va qadam — ko'z oldida.

---

## 3. Birinchi misol

Bu kod 1 dan 3 gacha sonlarni chiqaradi.

\`\`\`javascript
for (let i = 1; i <= 3; i++) { // Retsept: 1 dan, 3 gacha, 1 tadan
  console.log(i); // Hozirgi qiymat chiqadi
}
\`\`\`

\`\`\`text
// Natija:
1
2
3
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let i = 1;\` — boshlanish. Bir marta, eng boshida bajariladi.
- \`i <= 3;\` — shart. Har aylanishdan oldin tekshiriladi.
- \`i++\` — qadam. Har aylanish oxirida bajariladi.
- \`console.log(i);\` — blok ichi. Shart rost ekan takrorlanadi.
- Uch qism nuqta-vergul (\`;\`) bilan ajratiladi. Aynan ikkita nuqta-vergul bo'ladi.

---

## 5. Qadamma-qadam (trace)

\`i\` ning qiymati qanday o'zgaradi:

| Qadam | Boshlanish | Shart (i <= 3) | Chiqadi | Qadam (i++) |
|---|---|---|---|---|
| 1 | i = 1 | 1 <= 3? Ha | 1 | 2 bo'ladi |
| 2 | — | 2 <= 3? Ha | 2 | 3 bo'ladi |
| 3 | — | 3 <= 3? Ha | 3 | 4 bo'ladi |
| 4 | — | 4 <= 3? Yo'q | — | To'xtaydi |

---

## 6. Yana bitta misol

Bu kod teskari sanaydi: 3 dan 1 gacha.

\`\`\`javascript
for (let n = 3; n > 0; n--) { // 3 dan, 0 gacha, 1 tadan kamayib
  console.log(n); // Hozirgi qiymat chiqadi
}
\`\`\`

\`\`\`text
// Natija:
3
2
1
\`\`\`

Qator-baqator tahlil:
- \`let n = 3;\` — boshlanish 3 dan.
- \`n > 0;\` — shart. \`n\` 0 ga yetguncha rost.
- \`n--\` — qadam. Har safar 1 taga kamayadi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Vergul bilan ajratish
❌ Xato kod:
\`\`\`javascript
for (let i = 0, i < 3, i++) {
  console.log(i);
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Identifier 'i' has already been declared\` xatoligi yuz beradi. Uch qism vergul (\`,\`) bilan emas, nuqta-vergul (\`;\`) bilan ajratiladi.
✅ To'g'ri variant:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
\`\`\`

### 2. let ni unutish
❌ Xato kod:
\`\`\`javascript
for (i = 0; i < 3; i++) {
  console.log(i);
}
console.log(i);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin oxirgi qatorda \`3\` chiqadi. Sababi: \`let\` siz \`i\` sikldan keyin ham yashab qoladi. Bu kutilmagan oqibatlarga olib keladi.
✅ To'g'ri variant:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
\`\`\`

### 3. Boshlanish shartga to'g'ri kelmasligi
❌ Xato tushuncha:
\`\`\`javascript
for (let i = 5; i < 3; i++) {
  console.log(i);
}
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin hech narsa chiqmaydi! Birinchi tekshiruvdayoq \`5 < 3\` yolg'on. Blok bir marta ham ishlamaydi.
✅ To'g'ri tushuncha: boshlanish qiymati shartga mos kelishi kerak. Aks holda sikl bo'sh o'tadi.

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`1\` dan \`3\` gacha chiqaring (\`for\` bilan). Natijalar \`1\`, \`2\`, \`3\` bo'lsin.

### 2-mashq (O'rtacha)
\`3\` dan \`1\` gacha chiqaring. Natijalar \`3\`, \`2\`, \`1\` bo'lsin.

### 3-mashq (Chegara holat)
\`0\` dan \`6\` gacha juft sonlarni chiqaring (\`i += 2\` qadam bilan). Natijalar \`0\`, \`2\`, \`4\`, \`6\` bo'lsin.

### Javoblar:
1.
\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
\`\`\`
2.
\`\`\`javascript
for (let n = 3; n > 0; n--) {
  console.log(n);
}
\`\`\`
3.
\`\`\`javascript
for (let i = 0; i <= 6; i += 2) {
  console.log(i);
}
\`\`\`

---

## 9. Xulosa

1. \`for\` — boshlanish, shart va qadam bitta qatorda yoziladigan sikl.
2. Uch qism nuqta-vergul bilan ajratiladi. Vergul xato beradi.
3. Hisoblagich \`let\` bilan e'lon qilinadi. Shart birinchi tekshiruvda yolg'on bo'lsa, blok ishlamaydi.

Keyingi darsda: kamida bir marta ishlaydigan \`do...while\` sikli bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1 dan 3 gacha",
      instruction: "`for` bilan `1` dan `3` gacha chiqaring (`1`, `2`, `3` chiqishi kerak).",
      startingCode: "// for sikli yozing\n",
      hint: "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn '1, 2, 3 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "0 dan 4 gacha",
      instruction: "`for` bilan `0` dan `4` gacha chiqaring (`0`, `1`, `2`, `3`, `4`).",
      startingCode: "// for sikli yozing\n",
      hint: "for (let i = 0; i <= 4; i++) {\n  console.log(i);\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2,3,4') return null;\nreturn '0, 1, 2, 3, 4 chiqishi kerak';"
    },
    {
      id: 3,
      title: "Teskari sanash",
      instruction: "`n` bilan `3` dan `1` gacha chiqaring (`3`, `2`, `1`).",
      startingCode: "// for sikli yozing\n",
      hint: "for (let n = 3; n > 0; n--) {\n  console.log(n);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '3,2,1') return null;\nreturn '3, 2, 1 chiqishi kerak';"
    },
    {
      id: 4,
      title: "Vergul xatosini tuzatish",
      instruction: "`for (let i = 0, i < 3, i++)` dagi vergullarni `;` ga tuzating. `0`, `1`, `2` chiqsin.",
      startingCode: "for (let i = 0, i < 3, i++) {\n  console.log(i);\n}\n",
      hint: "for (let i = 0; i < 3; i++) {",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    },
    {
      id: 5,
      title: "let ni qo'shish",
      instruction: "`for (i = 0; i < 3; i++)` ga `let` qo'shing. `0`, `1`, `2` chiqsin.",
      startingCode: "for (i = 0; i < 3; i++) {\n  console.log(i);\n}\n",
      hint: "for (let i = 0; i < 3; i++) {",
      test: "if (!code.includes('let i')) return 'let qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    },
    {
      id: 6,
      title: "Juft sonlar (chegara)",
      instruction: "`0` dan `6` gacha juft sonlarni chiqaring (`i += 2` qadam bilan).",
      startingCode: "// for sikli yozing\n",
      hint: "for (let i = 0; i <= 6; i += 2) {\n  console.log(i);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,2,4,6') return null;\nreturn '0, 2, 4, 6 chiqishi kerak';"
    },
    {
      id: 7,
      title: "5 dan 1 gacha (chegara)",
      instruction: "`n` bilan `5` dan `1` gacha chiqaring.",
      startingCode: "// for sikli yozing\n",
      hint: "for (let n = 5; n > 0; n--) {\n  console.log(n);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '5,4,3,2,1') return null;\nreturn '5, 4, 3, 2, 1 chiqishi kerak';"
    },
    {
      id: 8,
      title: "Yig'indi (chegara)",
      instruction: "`sum = 0` berilgan. `1` dan `5` gacha `sum` ga qo'shing (`sum += i`). Oxirida chiqaring (`15` chiqishi kerak).",
      startingCode: "let sum = 0;\n// for sikli yozing\nconsole.log(sum);\n",
      hint: "for (let i = 1; i <= 5; i++) {\n  sum += i;\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out[out.length - 1] === '15') return null;\nreturn 'Oxirgi natija 15 bolishi kerak';"
    },
    {
      id: 9,
      title: "Bo'sh sikl (chegara)",
      instruction: "`i = 5` dan boshlab `i < 3` sharti bilan yozing. Hech narsa chiqmasligi kerak.",
      startingCode: "// for sikli yozing\n",
      hint: "for (let i = 5; i < 3; i++) {\n  console.log(i);\n}",
      test: "if (!code.includes('for')) return 'for sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'Hech narsa chiqmasligi kerak';"
    },
    {
      id: 10,
      title: "10 dan 0 gacha (chegara)",
      instruction: "`n` bilan `10` dan `0` gacha `2` tadan kamaytirib chiqaring (`10`, `8`, `6`, `4`, `2`, `0`).",
      startingCode: "// for sikli yozing\n",
      hint: "for (let n = 10; n >= 0; n -= 2) {\n  console.log(n);\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '10,8,6,4,2,0') return null;\nreturn '10, 8, 6, 4, 2, 0 chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`for (let i = 1; i <= 3; i++) { console.log(i); }` nima chiqaradi?",
      options: [
        "1, 2, 3",
        "1, 2, 3, 4",
        "0, 1, 2, 3",
        "Hech narsa"
      ],
      correctAnswer: 0,
      explanation: "i 1, 2, 3 bo'lganda shart rost. 4 bo'lganda to'xtaydi."
    },
    {
      id: 2,
      question: "for qavsida nechta qism bo'ladi?",
      options: [
        "Bitta",
        "Ikkita",
        "Uchta: boshlanish, shart, qadam",
        "To'rtta"
      ],
      correctAnswer: 2,
      explanation: "Uch qism nuqta-vergul bilan ajratiladi."
    },
    {
      id: 3,
      question: "`for (let i = 0, i < 3, i++) { ... }` qatorida nima bo'ladi?",
      options: [
        "Ishlaydi",
        "SyntaxError beradi",
        "Bir marta ishlaydi",
        "Cheksiz ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Vergul emas, nuqta-vergul kerak."
    },
    {
      id: 4,
      question: "`for (let n = 3; n > 0; n--) { console.log(n); }` nima chiqaradi?",
      options: [
        "1, 2, 3",
        "3, 2, 1",
        "3, 2, 1, 0",
        "Hech narsa"
      ],
      correctAnswer: 1,
      explanation: "n 3, 2, 1 bo'lganda rost. 0 bo'lganda to'xtaydi."
    },
    {
      id: 5,
      question: "`for (i = 0; i < 3; i++)` da `let` bo'lmasa nima bo'ladi?",
      options: [
        "Xatolik beradi",
        "Ishlaydi, lekin i tashqarida qolib ketadi",
        "Bir marta ishlaydi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "Xato bermaydi. Lekin i sikldan keyin ham yashaydi."
    },
    {
      id: 6,
      question: "Qadam qachon bajariladi?",
      options: [
        "Shartdan oldin",
        "Har aylanish oxirida",
        "Faqat boshida",
        "Hech qachon"
      ],
      correctAnswer: 1,
      explanation: "Blok ishlangach, qadam bajariladi. Keyin shart qayta tekshiriladi."
    },
    {
      id: 7,
      question: "`for (let i = 0; i <= 6; i += 2) { console.log(i); }` nima chiqaradi?",
      options: [
        "0, 1, 2, 3, 4, 5, 6",
        "0, 2, 4, 6",
        "0, 2, 4, 6, 8",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 1,
      explanation: "Har safar 2 taga oshadi: 0, 2, 4, 6."
    },
    {
      id: 8,
      question: "`for (let i = 5; i < 3; i++) { console.log(i); }` nima chiqaradi?",
      options: [
        "5",
        "Hech narsa",
        "Xatolik",
        "5, 6, 7..."
      ],
      correctAnswer: 1,
      explanation: "Birinchi tekshiruvdayoq yolg'on. Blok ishlamaydi."
    },
    {
      id: 9,
      question: "`let sum = 0; for (let i = 1; i <= 5; i++) { sum += i; } console.log(sum);` nima chiqaradi?",
      options: [
        "5",
        "15",
        "10",
        "0"
      ],
      correctAnswer: 1,
      explanation: "sum = 1+2+3+4+5 = 15."
    },
    {
      id: 10,
      question: "for bilan while ning farqi nima?",
      options: [
        "Farqi yo'q",
        "for da uchala qism bitta qatorda",
        "while tezroq",
        "for faqat bir marta ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "for da boshlanish, shart va qadam ko'z oldida turadi."
    },
    {
      id: 11,
      question: "`for (let n = 10; n >= 0; n -= 2) { console.log(n); }` nima chiqaradi?",
      options: [
        "10, 8, 6, 4, 2",
        "10, 8, 6, 4, 2, 0",
        "10, 9, 8...",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 1,
      explanation: "n 0 bo'lganda ham shart rost (>=). Keyin -2 bo'lib to'xtaydi."
    },
    {
      id: 12,
      question: "Uch qism qanday ajratiladi?",
      options: [
        "Vergul bilan",
        "Nuqta-vergul bilan",
        "Bo'sh joy bilan",
        "Qavs bilan"
      ],
      correctAnswer: 1,
      explanation: "Aynan ikkita nuqta-vergul: for (boshlanish; shart; qadam)."
    }
  ]
};
