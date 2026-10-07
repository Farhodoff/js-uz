export const whileLesson = {
  id: "whileLesson",
  title: "while Sikli",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz zinadan ko'tarilyapsiz. Qoida oddiy: "Zina tugamaguncha — bir qadam yuqoriga." Har qadamda shart tekshiriladi. Shart yolg'on bo'lishi bilan to'xtaysiz.

Dasturlashda \`while\` (toki, ekan) xuddi shu qoida. Shart rost ekan, blok takrorlanadi.

while — shart rost bo'lib turguncha kod blokini takrorlaydigan sikl operatordir.

---

## 2. Nega kerak?

Ekranga 1 dan 5 gacha sonlarni chiqarish kerak. \`console.log\` ni besh marta yozish mumkin:

\`\`\`javascript
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
\`\`\`

Ishlaydi. Lekin 100 ta son kerak bo'lsa-chi? Yuz qator yozilmaydi.

Muammo shunda: bir ishni ko'p marta takrorlash kerak. Yechim — \`while\`. Uch qatorda yuz marta takrorlash:

\`\`\`javascript
let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
\`\`\`

---

## 3. Birinchi misol

Bu kod 1 dan 3 gacha sonlarni chiqaradi.

\`\`\`javascript
let i = 1; // Boshlanish: 1
while (i <= 3) { // 3 gacha takrorlanadi
  console.log(i); // Hozirgi qiymat chiqadi
  i++; // Keyingi qadamga o'tiladi
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

- \`let i = 1;\` — hisoblagich yaratildi. 1 dan boshlanadi.
- \`while (i <= 3) {\` — savol: "davom etilsinmi?" Javob rost ekan, blok takrorlanadi.
- \`console.log(i);\` — hozirgi qiymat chiqadi.
- \`i++;\` — hisoblagich 1 taga oshadi. Shart keyingi safar qayta tekshiriladi.

---

## 5. Qadamma-qadam (trace)

\`i\` ning qiymati har aylanishda qanday o'zgaradi:

| Qadam | Shart (i <= 3) | Chiqadi | Keyin i |
|---|---|---|---|
| 1 | 1 <= 3? Ha | 1 | 2 bo'ladi |
| 2 | 2 <= 3? Ha | 2 | 3 bo'ladi |
| 3 | 3 <= 3? Ha | 3 | 4 bo'ladi |
| 4 | 4 <= 3? Yo'q | — | To'xtaydi |

To'rtinchi tekshiruvda javob "Yo'q". Sikl to'xtaydi.

---

## 6. Yana bitta misol

Bu kod teskari sanaydi: 3 dan 1 gacha.

\`\`\`javascript
let n = 3; // Boshlanish: 3
while (n > 0) { // 0 dan katta ekan
  console.log(n); // Hozirgi qiymat chiqadi
  n--; // Bittaga kamayadi
}
\`\`\`

\`\`\`text
// Natija:
3
2
1
\`\`\`

Qator-baqator tahlil:
- \`n > 0\` — shart. \`n\` 0 ga yetguncha rost.
- \`n--\` — har aylanishda 1 taga kamayadi. Shart bir kun yolg'on bo'ladi. Sikl to'xtaydi.

---

## 7. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`javascript
let i = 0;
while i < 3 {
  console.log(i);
  i++;
}
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected identifier 'i'\` xatoligi yuz beradi. Shart har doim yumaloq qavs ichida yoziladi: \`while (i < 3)\`.
✅ To'g'ri variant:
\`\`\`javascript
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
\`\`\`

### 2. E'lon qilinmagan shart
❌ Xato kod:
\`\`\`javascript
while (count < 3) {
  console.log(count);
}
\`\`\`
Nima bo'ladi: \`ReferenceError: count is not defined\` xatoligi yuz beradi. Shartdagi o'zgaruvchi oldin e'lon qilinishi shart.
✅ To'g'ri variant:
\`\`\`javascript
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
\`\`\`

### 3. Birinchi tekshiruvdayoq yolg'on
❌ Xato tushuncha:
\`\`\`javascript
let i = 10;
while (i < 3) {
  console.log(i);
}
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin hech narsa chiqmaydi! Sababi: shart BIRINCHI tekshiruvdayoq yolg'on. Blok bir marta ham ishlamaydi. \`while\` avval tekshiradi, keyin ishlaydi.
✅ To'g'ri tushuncha: blok kamida bir marta ishlashi kerak bo'lsa, boshlang'ich qiymat shartga mos kelishi shart.

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`i\` ga \`1\` bering. \`i <= 3\` ekan, chiqaring va oshiring. Natijalar \`1\`, \`2\`, \`3\` bo'lsin.

### 2-mashq (O'rtacha)
\`n\` ga \`3\` bering. \`n > 0\` ekan, chiqaring va kamaytiring. Natijalar \`3\`, \`2\`, \`1\` bo'lsin.

### 3-mashq (Chegara holat)
\`i\` ga \`10\` bering. \`i < 3\` sharti bilan sikl yozing. Hech narsa chiqmasligini tasdiqlang (bo'sh natija ham to'g'ri javob).

### Javoblar:
1.
\`\`\`javascript
let i = 1;
while (i <= 3) {
  console.log(i);
  i++;
}
\`\`\`
2.
\`\`\`javascript
let n = 3;
while (n > 0) {
  console.log(n);
  n--;
}
\`\`\`
3.
\`\`\`javascript
let i = 10;
while (i < 3) {
  console.log(i);
}
\`\`\`

---

## 9. Xulosa

1. \`while\` — shart rost ekan, blokni takrorlaydi. Shart har aylanishdan oldin tekshiriladi.
2. Hisoblagich yangilanishi shart (\`i++\` yoki \`n--\`). Bo'lmasa, shart hech qachon yolg'on bo'lmaydi.
3. Birinchi tekshiruvdayoq yolg'on bo'lsa, blok bir marta ham ishlamaydi.

Keyingi darsda: boshi va oxiri aniq sikl — \`for\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1 dan 3 gacha",
      instruction: "`i` ga `1` bering. `i <= 3` ekan chiqaring va oshiring (`1`, `2`, `3` chiqishi kerak).",
      startingCode: "let i = 1;\n// while sikli yozing\n",
      hint: "while (i <= 3) {\n  console.log(i);\n  i++;\n}",
      test: "if (!code.includes('while')) return 'while sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '1,2,3') return null;\nreturn '1, 2, 3 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 2,
      title: "Teskari sanash",
      instruction: "`n` ga `3` bering. `n > 0` ekan chiqaring va kamaytiring (`3`, `2`, `1` chiqishi kerak).",
      startingCode: "let n = 3;\n// while sikli yozing\n",
      hint: "while (n > 0) {\n  console.log(n);\n  n--;\n}",
      test: "if (!code.includes('while')) return 'while sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '3,2,1') return null;\nreturn '3, 2, 1 chiqishi kerak. Chiqqan natija: ' + out.join(', ');"
    },
    {
      id: 3,
      title: "Qavs xatosini tuzatish",
      instruction: "`while i < 3` dagi qavs xatosini tuzating (`i = 0` berilgan). `0`, `1`, `2` chiqsin.",
      startingCode: "let i = 0;\nwhile i < 3 {\n  console.log(i);\n  i++;\n}\n",
      hint: "while (i < 3) {",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    },
    {
      id: 4,
      title: "E'lon xatosini tuzatish",
      instruction: "`count` e'lon qilinmagan. Oldiniga `let count = 0;` qo'shing. `0`, `1`, `2` chiqsin.",
      startingCode: "while (count < 3) {\n  console.log(count);\n  count++;\n}\n",
      hint: "let count = 0; — eng boshiga yozing.",
      test: "if (!code.includes('let count')) return 'let count qatorini qoshing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0,1,2') return null;\nreturn '0, 1, 2 chiqishi kerak';"
    },
    {
      id: 5,
      title: "Bo'sh sikl",
      instruction: "`i` ga `10` bering. `i < 3` sharti bilan sikl yozing. Hech narsa chiqmasligi kerak.",
      startingCode: "let i = 10;\n// while sikli yozing\n",
      hint: "while (i < 3) {\n  console.log(i);\n}",
      test: "if (!code.includes('while')) return 'while sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length === 0) return null;\nreturn 'Hech narsa chiqmasligi kerak';"
    },
    {
      id: 6,
      title: "Juft sonlar (chegara)",
      instruction: "`i` ga `2` bering. `i <= 6` ekan chiqaring va `2` taga oshiring (`i += 2`). `2`, `4`, `6` chiqsin.",
      startingCode: "let i = 2;\n// while sikli yozing\n",
      hint: "while (i <= 6) {\n  console.log(i);\n  i += 2;\n}",
      test: "if (!code.includes('while')) return 'while sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '2,4,6') return null;\nreturn '2, 4, 6 chiqishi kerak';"
    },
    {
      id: 7,
      title: "5 dan 1 gacha (chegara)",
      instruction: "`n` ga `5` bering. `n > 0` ekan chiqaring va kamaytiring (`5`, `4`, `3`, `2`, `1`).",
      startingCode: "let n = 5;\n// while sikli yozing\n",
      hint: "while (n > 0) {\n  console.log(n);\n  n--;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '5,4,3,2,1') return null;\nreturn '5, 4, 3, 2, 1 chiqishi kerak';"
    },
    {
      id: 8,
      title: "Yig'indi hisoblash (chegara)",
      instruction: "`sum = 0`, `i = 1` berilgan. `i <= 4` ekan `sum` ga `i` ni qo'shing (`sum += i`). Oxirida `sum` ni chiqaring (`10` chiqishi kerak).",
      startingCode: "let sum = 0;\nlet i = 1;\n// while sikli yozing\nconsole.log(sum);\n",
      hint: "while (i <= 4) {\n  sum += i;\n  i++;\n}",
      test: "if (!code.includes('while')) return 'while sikli ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out[out.length - 1] === '10') return null;\nreturn 'Oxirgi natija 10 bolishi kerak';"
    },
    {
      id: 9,
      title: "Bitta qadam (chegara)",
      instruction: "`i` ga `0` bering. `i < 1` ekan chiqaring va oshiring. Faqat `0` chiqishi kerak (bitta aylanish).",
      startingCode: "let i = 0;\n// while sikli yozing\n",
      hint: "while (i < 1) {\n  console.log(i);\n  i++;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '0') return null;\nreturn 'Faqat 0 chiqishi kerak';"
    },
    {
      id: 10,
      title: "Teskari juftlar (chegara)",
      instruction: "`n` ga `6` bering. `n > 0` ekan chiqaring va `2` taga kamaytiring (`6`, `4`, `2` chiqsin).",
      startingCode: "let n = 6;\n// while sikli yozing\n",
      hint: "while (n > 0) {\n  console.log(n);\n  n -= 2;\n}",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.join(',') === '6,4,2') return null;\nreturn '6, 4, 2 chiqishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let i = 1; while (i <= 3) { console.log(i); i++; }` nima chiqaradi?",
      options: [
        "1, 2, 3",
        "1, 2, 3, 4",
        "Cheksiz davom etadi",
        "Hech narsa"
      ],
      correctAnswer: 0,
      explanation: "i 1, 2, 3 bo'lganda shart rost. 4 bo'lganda to'xtaydi."
    },
    {
      id: 2,
      question: "Sikl qachon to'xtaydi?",
      options: [
        "Blok tugaganda",
        "Shart yolg'on bo'lganda",
        "Hech qachon",
        "3 marta aylanganda"
      ],
      correctAnswer: 1,
      explanation: "Har aylanishdan oldin shart tekshiriladi. Yolg'on bo'lishi bilan sikl to'xtaydi."
    },
    {
      id: 3,
      question: "`let i = 10; while (i < 3) { console.log(i); }` nima chiqaradi?",
      options: [
        "10",
        "Hech narsa",
        "Xatolik",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 1,
      explanation: "Birinchi tekshiruvdayoq yolg'on. Blok bir marta ham ishlamaydi."
    },
    {
      id: 4,
      question: "`while i < 3 { ... }` qatorida nima bo'ladi?",
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
      question: "Nega `i++` kerak?",
      options: [
        "Chiroyli ko'rinishi uchun",
        "Shart bir kun yolg'on bo'lishi uchun",
        "Tezroq ishlashi uchun",
        "Xato bermasligi uchun"
      ],
      correctAnswer: 1,
      explanation: "Hisoblagich yangilanmasa, shart har doim rost qoladi."
    },
    {
      id: 6,
      question: "`let n = 3; while (n > 0) { console.log(n); n--; }` nima chiqaradi?",
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
      question: "`while (count < 3) { ... }` da `count` e'lon qilinmagan bo'lsa nima bo'ladi?",
      options: [
        "0 dan boshlaydi",
        "ReferenceError beradi",
        "Cheksiz ishlaydi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "Shartdagi o'zgaruvchi oldin e'lon qilinishi shart."
    },
    {
      id: 8,
      question: "`let i = 2; while (i <= 6) { console.log(i); i += 2; }` nima chiqaradi?",
      options: [
        "2, 3, 4, 5, 6",
        "2, 4, 6",
        "2, 4, 6, 8",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 1,
      explanation: "Har safar 2 taga oshadi: 2, 4, 6. Keyin 8 > 6 bo'lib to'xtaydi."
    },
    {
      id: 9,
      question: "`let sum = 0; let i = 1; while (i <= 4) { sum += i; i++; } console.log(sum);` nima chiqaradi?",
      options: [
        "4",
        "10",
        "24",
        "0"
      ],
      correctAnswer: 1,
      explanation: "sum = 0+1+2+3+4 = 10."
    },
    {
      id: 10,
      question: "`let i = 0; while (i < 1) { console.log(i); i++; }` necha marta ishlaydi?",
      options: [
        "0 marta",
        "1 marta",
        "Cheksiz",
        "2 marta"
      ],
      correctAnswer: 1,
      explanation: "Birinchi rost, keyin i 1 bo'lib shart yolg'on bo'ladi."
    },
    {
      id: 11,
      question: "while nimani takrorlaydi?",
      options: [
        "Shartni",
        "Jingalak qavs ichidagi blokni",
        "Faqat console.log ni",
        "Hamma kodni"
      ],
      correctAnswer: 1,
      explanation: "Faqat o'z blokidagi qatorlar takrorlanadi."
    },
    {
      id: 12,
      question: "`let n = 6; while (n > 0) { console.log(n); n -= 2; }` nima chiqaradi?",
      options: [
        "6, 5, 4, 3, 2, 1",
        "6, 4, 2",
        "6, 4, 2, 0",
        "Cheksiz davom etadi"
      ],
      correctAnswer: 1,
      explanation: "n 6, 4, 2 bo'lganda rost. 0 bo'lganda to'xtaydi."
    }
  ]
};
