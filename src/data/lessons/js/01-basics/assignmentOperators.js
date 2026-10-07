export const assignmentOperators = {
  id: "assignmentOperators",
  title: "Qiymat Berish Operatorlari (+=, -=, ++, --)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz basketbol o'yinida hisob tablosini yurityapsiz. Jamoa to'p kiritdi. Siz butun doskani o'chirib, hisobni boshidan yozmaysiz. Shunchaki eski hisobga yangisini qo'shib qo'yasiz.

Dasturlashda ham o'zgaruvchining eski qiymati ustiga yangisini qo'shish tez-tez kerak bo'ladi. Buning uchun qisqa yozuv operatorlari bor.

Qiymat berish operatorlari (\`+=\`, \`-=\`, \`++\`, \`--\`) — o'zgaruvchining mavjud qiymatini o'zgartirishning qisqa yozuvidir.

---

## 2. Nega kerak?

O'zgaruvchini o'zgartirish uchun har safar to'liq yozish uzun:

\`\`\`javascript
let score = 10;
score = score + 5;
\`\`\`

Bu yerda \`score\` ikki marta yozildi. Kod uzaygani sari bunday takrorlar ko'payadi. Xato qilish osonlashadi.

Yechim — qisqa yozuv:

\`\`\`javascript
let score = 10;
score += 5; // score = score + 5 bilan bir xil
\`\`\`

Bir so'z kamaydi. Ma'no o'sha. Kod qisqaroq va o'qilishi osonroq.

---

## 3. Birinchi misol

Bu kod \`+=\` va \`-=\` bilan o'zgaruvchini o'zgartiradi va konsolga chiqaradi.

\`\`\`javascript
let score = 10; // Boshlang'ich qiymat: 10
score += 5; // 5 qo'shildi, 15 bo'ldi
score -= 3; // 3 ayirildi, 12 bo'ldi
console.log(score); // 12 chiqadi
\`\`\`

\`\`\`text
// Natija: 12
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let score = 10;\` — \`score\` \`10\` qiymati bilan yaratildi.
- \`score += 5;\` — hozirgi qiymatga (\`10\`) \`5\` qo'shildi. Natija (\`15\`) yana \`score\` ga yozildi.
- \`score -= 3;\` — hozirgi qiymatdan (\`15\`) \`3\` ayirildi. Natija (\`12\`) yana \`score\` ga yozildi.
- \`console.log(score);\` — yakuniy \`12\` chiqadi.

---

## 5. Qadamma-qadam (trace)

\`score\` qiymati har qatorda qanday o'zgaradi:

| Qadam | Kod qatori | score qiymati | Tushuntirish |
|---|---|---|---|
| 1 | \`let score = 10;\` | \`10\` | Boshlang'ich qiymat berildi |
| 2 | \`score += 5;\` | \`15\` | \`10 + 5\` hisoblandi va saqlandi |
| 3 | \`score -= 3;\` | \`12\` | \`15 - 3\` hisoblandi va saqlandi |
| 4 | \`console.log(score);\` | \`12\` | Yakuniy qiymat chiqarildi |

---

## 6. Yana bitta misol

Bu kod 1 taga oshirish (\`++\`) va 1 taga kamaytirish (\`--\`) operatorlarini ko'rsatadi.

\`\`\`javascript
let lives = 3; // 3 ta jon bor
lives++; // 1 taga oshdi, 4 bo'ldi
lives--; // 1 taga kamaydi, 3 bo'ldi
console.log(lives); // 3 chiqadi
\`\`\`

\`\`\`text
// Natija: 3
\`\`\`

Qator-baqator tahlil:
- \`lives++\` — inkrement (oshirish) deb ataladi. Qiymatni aynan 1 taga oshiradi. \`lives += 1\` bilan bir xil.
- \`lives--\` — dekrement (kamaytirish) deb ataladi. Qiymatni aynan 1 taga kamaytiradi. \`lives -= 1\` bilan bir xil.

---

## 7. Ko'p uchraydigan xatolar

### 1. const bilan ishlatish
❌ Xato kod:
\`\`\`javascript
const points = 10;
points += 5;
\`\`\`
Nima bo'ladi: \`TypeError: Assignment to constant variable.\` xatoligi yuz beradi. \`+=\` qiymatni o'zgartiradi. \`const\` esa o'zgarmaydi. O'zgaradigan joyda faqat \`let\` ishlatiladi.
✅ To'g'ri variant:
\`\`\`javascript
let points = 10;
points += 5; // 15 bo'ladi
\`\`\`

### 2. += o'rniga =+ yozish
❌ Xato kod:
\`\`\`javascript
let score = 10;
score =+ 5;
console.log(score);
\`\`\`
Nima bo'ladi: \`15\` emas, \`5\` chiqadi! Chunki \`+=\` bilan \`=+\` ikki xil narsa. \`score =+ 5\` — "qo'shish" emas, "musbat 5 ni yuklash" degani.
✅ To'g'ri variant:
\`\`\`javascript
let score = 10;
score += 5; // 15 bo'ladi
\`\`\`

### 3. Belgilar orasiga probel qo'yish
❌ Xato kod:
\`\`\`javascript
let count = 1;
count + = 1;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '='\` xatoligi yuz beradi. \`+=\` bitta yaxlit belgi. O'rtasiga probel tushmaydi.
✅ To'g'ri variant:
\`\`\`javascript
let count = 1;
count += 1; // 2 bo'ladi
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`coins\` ga \`20\` bering. \`+=\` bilan \`15\` qo'shing. Konsolga chiqaring.

### 2-mashq (O'rtacha)
\`steps\` ga \`0\` bering. \`++\` bilan ketma-ket 3 marta oshiring. Konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi kodda \`TypeError\` bor. Tuzating, toki \`15\` chiqsin:
\`\`\`javascript
const balance = 25;
balance -= 10;
console.log(balance);
\`\`\`

### Javoblar:
1.
\`\`\`javascript
let coins = 20;
coins += 15;
console.log(coins);
\`\`\`
2.
\`\`\`javascript
let steps = 0;
steps++;
steps++;
steps++;
console.log(steps);
\`\`\`
3.
\`\`\`javascript
let balance = 25; // const o'rniga let
balance -= 10;
console.log(balance);
\`\`\`

---

## 9. Xulosa

1. \`+=\` va \`-=\` — qiymatga qo'shish va ayirishning qisqa yozuvi.
2. \`++\` 1 taga oshiradi (inkrement), \`--\` 1 taga kamaytiradi (dekrement).
3. Bu operatorlar qiymatni o'zgartirgani uchun faqat \`let\` bilan ishlaydi.

Keyingi darsda: taqqoslash operatorlari (>, <, >=, <=) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "+= bilan qo'shish",
      instruction: "`coins` yarating (`let coins = 20;`). `+=` bilan `15` qo'shing va `console.log(coins);` orqali chiqaring.",
      startingCode: "let coins = 20;\n// coins ga += bilan 15 qo'shing va chiqaring\n",
      hint: "coins += 15;\nconsole.log(coins);",
      test: "if (!code.includes('+=')) return '+= operatori ishlatilmadi';\nif (!code.includes('coins')) return 'coins topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '35')) return null;\nreturn '35 konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "-= bilan ayirish",
      instruction: "`price` yarating (`let price = 50;`). `-=` bilan `20` ayiring va chiqaring (`30` chiqishi kerak).",
      startingCode: "let price = 50;\n// price dan -= bilan 20 ayiring va chiqaring\n",
      hint: "price -= 20;\nconsole.log(price);",
      test: "if (!code.includes('-=')) return '-= operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '30')) return null;\nreturn '30 konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "++ bilan 3 marta oshirish",
      instruction: "`steps` yarating (`let steps = 0;`). `++` bilan ketma-ket 3 marta oshiring va chiqaring.",
      startingCode: "let steps = 0;\n// steps ni 3 marta ++ qiling va chiqaring\n",
      hint: "steps++;\nsteps++;\nsteps++;\nconsole.log(steps);",
      test: "if (!code.includes('++')) return '++ operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '3')) return null;\nreturn '3 konsolga chiqmadi';"
    },
    {
      id: 4,
      title: "-- bilan kamaytirish",
      instruction: "`lives` yarating (`let lives = 3;`). `--` bilan 1 taga kamaytiring va chiqaring (`2` chiqishi kerak).",
      startingCode: "let lives = 3;\n// lives ni -- bilan kamaytiring va chiqaring\n",
      hint: "lives--;\nconsole.log(lives);",
      test: "if (!code.includes('--')) return '-- operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2')) return null;\nreturn '2 konsolga chiqmadi';"
    },
    {
      id: 5,
      title: "TypeError ni tuzatish",
      instruction: "`const balance = 25; balance -= 10;` xato bermoqda. `let` ga tuzating: `15` chiqsin.",
      startingCode: "const balance = 25;\nbalance -= 10;\nconsole.log(balance);\n",
      hint: "let balance = 25;\nbalance -= 10;\nconsole.log(balance);",
      test: "if (code.includes('const')) return 'const orniga let ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '15')) return null;\nreturn '15 konsolga chiqmadi';"
    },
    {
      id: 6,
      title: "=+ xatosini tuzatish",
      instruction: "`score =+ 5` o'rniga `+=` yozing (`let score = 10;` berilgan). `15` chiqishi kerak.",
      startingCode: "let score = 10;\nscore =+ 5;\nconsole.log(score);\n",
      hint: "score += 5;",
      test: "if (!code.includes('+=')) return '+= bilan yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '15')) return null;\nreturn '15 konsolga chiqmadi';"
    },
    {
      id: 7,
      title: "Probel xatosini tuzatish",
      instruction: "`count + = 1` dagi probelni olib tashlang (`let count = 1;` berilgan). `2` chiqishi kerak.",
      startingCode: "let count = 1;\ncount + = 1;\nconsole.log(count);\n",
      hint: "count += 1;",
      test: "if (!code.includes('+=')) return '+= ni bitta yaxlit yozing';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '2')) return null;\nreturn '2 konsolga chiqmadi';"
    },
    {
      id: 8,
      title: "Ketma-ket uch amal",
      instruction: "`score = 10` berilgan. `+= 5`, `-= 3`, `++` ni ketma-ket bajaring va chiqaring (`13` chiqishi kerak).",
      startingCode: "let score = 10;\n// += 5, -= 3, ++ ni bajaring va chiqaring\n",
      hint: "score += 5;\nscore -= 3;\nscore++;\nconsole.log(score);",
      test: "if (!code.includes('+=') || !code.includes('-=') || !code.includes('++')) return '+=, -= va ++ ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '13')) return null;\nreturn '13 konsolga chiqmadi';"
    },
    {
      id: 9,
      title: "Har qadamni kuzatish (chegara)",
      instruction: "`n = 0` berilgan. `++` qiling, chiqaring. Yana `++` qiling, chiqaring. Konsolda `1` va `2` ko'rinsin.",
      startingCode: "let n = 0;\n// ++ qiling, chiqaring, yana ++ qiling, chiqaring\n",
      hint: "n++;\nconsole.log(n);\nn++;\nconsole.log(n);",
      test: "let out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.length !== 2) return 'Ikki marta chiqaring';\nif (out[0].trim() !== '1' || out[1].trim() !== '2') return 'Avval 1, keyin 2 chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "Noldan pastga (chegara)",
      instruction: "`lives = 1` berilgan. `--` ni ikki marta bajaring va chiqaring (`-1` chiqadi — kamayish noldan ham o'tadi).",
      startingCode: "let lives = 1;\n// -- ni ikki marta bajaring va chiqaring\n",
      hint: "lives--;\nlives--;\nconsole.log(lives);",
      test: "if (!code.includes('--')) return '-- operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.map(v => String(v)).join(' '));\ntry { new Function(code)(); } catch (e) { return 'Hali xato bor: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.trim() === '-1')) return null;\nreturn '-1 konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let count = 5; count += 3;` dan keyin `count` nechaga teng?",
      options: [
        "5",
        "3",
        "8",
        "\"53\""
      ],
      correctAnswer: 2,
      explanation: "count += 3 bu count = count + 3 degani: 5 + 3 = 8."
    },
    {
      id: 2,
      question: "`score++` nima qiladi?",
      options: [
        "2 qo'shadi",
        "1 taga oshiradi",
        "1 taga kamaytiradi",
        "0 ga tenglaydi"
      ],
      correctAnswer: 1,
      explanation: "++ (inkrement) qiymatni aynan 1 taga oshiradi."
    },
    {
      id: 3,
      question: "`const level = 1; level++;` nega xato beradi?",
      options: [
        "++ noto'g'ri yozilgan",
        "const o'zgarmaydi, let kerak",
        "Nom noto'g'ri",
        "Chiqarilmagan"
      ],
      correctAnswer: 1,
      explanation: "const qiymatini o'zgartirib bo'lmaydi. O'zgaradigan joyda let ishlatiladi."
    },
    {
      id: 4,
      question: "`let price = 50; price -= 20;` dan keyin `price` nechaga teng?",
      options: [
        "70",
        "30",
        "20",
        "-20"
      ],
      correctAnswer: 1,
      explanation: "price -= 20 bu price = price - 20 degani: 50 - 20 = 30."
    },
    {
      id: 5,
      question: "`let lives = 3; lives--;` dan keyin `lives` nechaga teng?",
      options: [
        "4",
        "3",
        "2",
        "0"
      ],
      correctAnswer: 2,
      explanation: "-- (dekrement) qiymatni 1 taga kamaytiradi: 3 - 1 = 2."
    },
    {
      id: 6,
      question: "`let score = 10; score =+ 5;` natijasi nima?",
      options: [
        "15",
        "5",
        "105",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "=+ qo'shish emas. Bu musbat 5 ni yuklash: score 5 bo'lib qoladi."
    },
    {
      id: 7,
      question: "`let count = 1; count + = 1;` qatorida nima bo'ladi?",
      options: [
        "2 chiqadi",
        "SyntaxError: Unexpected token '='",
        "1 chiqadi",
        "Hech narsa bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "+= bitta yaxlit belgi. O'rtasiga probel tushmaydi."
    },
    {
      id: 8,
      question: "`++` bilan bir xil ma'noni beradigan yozuv qaysi?",
      options: [
        "x = x + 2",
        "x += 1",
        "x -= 1",
        "x = 1"
      ],
      correctAnswer: 1,
      explanation: "x++ bu x += 1 ning eng qisqa ko'rinishi."
    },
    {
      id: 9,
      question: "`let x = 5; x += 3; x--;` dan keyin `x` nechaga teng?",
      options: [
        "8",
        "7",
        "9",
        "5"
      ],
      correctAnswer: 1,
      explanation: "5 + 3 = 8, keyin 1 taga kamayadi: 8 - 1 = 7."
    },
    {
      id: 10,
      question: "Qaysi operator 1 taga kamaytiradi?",
      options: [
        "++",
        "+=",
        "--",
        "-"
      ],
      correctAnswer: 2,
      explanation: "-- 1 taga kamaytiradi. - esa ayirish amali (ikki son kerak)."
    },
    {
      id: 11,
      question: "`let n = 0; n++; n++;` dan keyin `n` nechaga teng?",
      options: [
        "0",
        "1",
        "2",
        "3"
      ],
      correctAnswer: 2,
      explanation: "Har ++ bittadan qo'shadi: 0 + 1 + 1 = 2."
    },
    {
      id: 12,
      question: "`let lives = 1; lives--; lives--;` dan keyin `lives` nechaga teng?",
      options: [
        "1",
        "0",
        "-1",
        "Xatolik"
      ],
      correctAnswer: 2,
      explanation: "Kamayish nolda to'xtamaydi: 1 - 1 - 1 = -1."
    }
  ]
};
