export const assignmentOperators = {
  id: "assignmentOperators",
  title: "Qiymat Berish Operatorlari (+=, -=, ++, --)",
  language: "javascript",
  theory: `## 1. Bu nima?

Tasavvur qiling, siz basketbol o'yinidagi hisob tablosini boshqaryapsiz. Jamoa har safar to'p kiritganda, siz butun doskani o'chirib boshidan yozmaysiz. Shunchaki mavjud hisobga \`+1\` yoki \`+2\` qo'shib qo'yasiz.

Qiymat berish va oshirish/kamaytirish operatorlari (\`+=\`, \`-=\`, \`++\`, \`--\`) — o'zgaruvchining mavjud qiymatiga son qo'shish, undan ayirish yoki uni 1 taga tezkor o'zgartirish uchun ishlatiladigan qisqa yozuv usullaridir.

---

## 2. Nega kerak?

O'zgaruvchi qiymatini o'zgartirish uchun har doim:
\`score = score + 5;\` yoki \`count = count + 1;\` deb yozish uzun va noqulay.

JavaScript'da bu amallarni qisqartirib yozish mumkin:
- \`score = score + 5;\` o'rniga \`score += 5;\`
- \`count = count + 1;\` o'rniga \`count++;\`

Bu kodni qisqaroq, o'qishni esa osonroq qiladi.

---

## 3. Birinchi misol

Bu kod \`+=\` va \`-=\` operatorlari yordamida o'zgaruvchi qiymatini o'zgartiradi va konsolga chiqaradi.

\`\`\`javascript
let score = 10; // Boshlang'ich qiymat: 10
score += 5; // score = score + 5 (natija: 15)
score -= 3; // score = score - 3 (natija: 12)
console.log(score);
\`\`\`

\`\`\`text
// Natija: 12
\`\`\`

---

## 4. Qator-baqator tahlil

- \`let score = 10;\` — \`score\` o'zgaruvchisi \`10\` qiymati bilan yaratildi.
- \`score += 5;\` — \`score\` ning hozirgi qiymatiga (\`10\`) 5 qo'shildi va natija (\`15\`) yana \`score\` ga yozildi.
- \`score -= 3;\` — \`score\` ning qiymatidan (\`15\`) 3 ayirildi va natija (\`12\`) yana \`score\` ga yozildi.
- \`console.log(score);\` — konsolga yakuniy \`12\` soni chiqadi.

---

## 5. Qadamma-qadam (trace)

O'zgaruvchi qiymatining qadam-baqadam o'zgarishi:

| Qadam | Kod qatori | score qiymati | Tushuntirish |
|---|---|---|---|
| 1 | \`let score = 10;\` | \`10\` | Boshlang'ich qiymat berildi |
| 2 | \`score += 5;\` | \`15\` | \`10 + 5\` hisoblandi va saqlandi |
| 3 | \`score -= 3;\` | \`12\` | \`15 - 3\` hisoblandi va saqlandi |

---

## 6. Yana bitta misol

Bu kod \`++\` (inkrement) va \`--\` (dekrement) operatorlari yordamida qiymatni 1 taga oshiradi va kamaytiradi.

\`\`\`javascript
let lives = 3; // 3 ta jon
lives++; // 1 taga oshirish (lives = lives + 1) -> 4
lives--; // 1 taga kamaytirish (lives = lives - 1) -> 3
console.log(lives);
\`\`\`

\`\`\`text
// Natija: 3
\`\`\`

Qator-baqator tahlil:
- \`lives++\` — inkrement (increment) deb ataladi. O'zgaruvchi qiymatini aynan 1 taga oshiradi (\`lives = lives + 1\` yoki \`lives += 1\` bilan bir xil).
- \`lives--\` — dekrement (decrement) deb ataladi. O'zgaruvchi qiymatini aynan 1 taga kamaytiradi (\`lives = lives - 1\` yoki \`lives -= 1\` bilan bir xil).

---

## 7. Ko'p uchraydigan xatolar

### 1. const bilan yaratilgan o'zgaruvchida ishlatish
❌ Xato kod:
\`\`\`javascript
const points = 10;
points += 5;
\`\`\`
Nima bo'ladi: \`TypeError: Assignment to constant variable.\` xatoligi yuz beradi. Chunki \`const\` o'zgarmasdir, \`+=\` esa uning qiymatini o'zgartirishga urinadi. Qiymati o'zgaradigan holatlarda faqat \`let\` ishlatilishi kerak.
✅ To'g'ri variant:
\`\`\`javascript
let points = 10;
points += 5;
\`\`\`

### 2. += o'rniga =+ yozib qo'yish
❌ Xato kod:
\`\`\`javascript
let score = 10;
score =+ 5;
console.log(score);
\`\`\`
Nima bo'ladi: Natija \`15\` emas, \`5\` bo'lib qoladi! Chunki \`=+ 5\` amali qiymatga qo'shish emas, balki shunchaki musbat \`+5\` sonini yuklash bo'lib qoladi (\`score = +5\`).
✅ To'g'ri variant:
\`\`\`javascript
let score = 10;
score += 5; // 15
\`\`\`

### 3. Belgilar orasiga probel qo'yish (+ =)
❌ Xato kod:
\`\`\`javascript
let count = 1;
count + = 1;
\`\`\`
Nima bo'ladi: \`SyntaxError: Unexpected token '='\` xatoligi yuz beradi. \`+=\`, \`-=\`, \`++\`, \`--\` bitta yaxlit operator bo'lgani uchun ularning o'rtasida probel bo'lmasligi shart.
✅ To'g'ri variant:
\`\`\`javascript
let count = 1;
count += 1;
\`\`\`

---

## 8. Tekshiruv

### 1-mashq (Oson)
\`coins\` nomli o'zgaruvchi yarating (\`let coins = 20;\`). Unga \`+=\` operatori yordamida \`15\` sonini qo'shing va konsolga chiqaring.

### 2-mashq (O'rtacha)
\`steps\` nomli o'zgaruvchi yarating (\`let steps = 0;\`). Uni \`++\` operatori yordamida ketma-ket 3 marta 1 taga oshiring va konsolga chiqaring.

### 3-mashq (Xatoni topish)
Quyidagi koddagi \`TypeError\` xatosini to'g'rilang, toki konsolga \`15\` chiqsin:
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

1. \`+=\` va \`-=\` operatorlari qiymatga son qo'shish yoki ayirishning qisqa yo'lidir (\`x += 5\` bu \`x = x + 5\`).
2. \`++\` qiymatni 1 taga oshiradi (inkrement), \`--\` esa 1 taga kamaytiradi (dekrement).
3. Bu operatorlar o'zgaruvchini o'zgartirgani uchun faqat \`let\` bilan ishlaydi (\`const\` bilan ishlatilsa \`TypeError\` beradi).

Keyingi darsda: Taqqoslash operatorlari (==, ===, !=, !==, >, <) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "+= operatori bilan qo'shish",
      instruction: "`coins` nomli o'zgaruvchi yarating (`let coins = 20;`). Unga `+=` operatori bilan `15` qo'shing va `console.log(coins);` orqali chiqaring.",
      startingCode: "let coins = 20;\n// coins ga += bilan 15 qo'shing va chiqaring\n",
      hint: "coins += 15;\nconsole.log(coins);",
      test: "if (!code.includes('+=')) return '+= operatori ishlatilmadi';\nif (!code.includes('coins')) return 'coins o\\'zgaruvchisi topilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('35'))) return null;\nreturn '35 natijasi konsolga chiqmadi';"
    },
    {
      id: 2,
      title: "++ bilan 3 marta oshirish",
      instruction: "`steps` nomli o'zgaruvchi yarating (`let steps = 0;`). Uni `++` operatori bilan ketma-ket 3 marta oshiring va konsolga chiqaring.",
      startingCode: "let steps = 0;\n// steps ni 3 marta ++ qiling va chiqaring\n",
      hint: "steps++;\nsteps++;\nsteps++;\nconsole.log(steps);",
      test: "if (!code.includes('++')) return '++ operatori ishlatilmadi';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('3'))) return null;\nreturn '3 natijasi konsolga chiqmadi';"
    },
    {
      id: 3,
      title: "TypeError xatosini to'g'rilash",
      instruction: "`const balance = 25; balance -= 10;` dagi `TypeError` xatosini to'g'rilang (`const` o'rniga `let` ishlating), toki konsolga `15` chiqsin.",
      startingCode: "const balance = 25;\nbalance -= 10;\nconsole.log(balance);\n",
      hint: "let balance = 25;\nbalance -= 10;\nconsole.log(balance);",
      test: "if (code.includes('const')) return 'const o\\'rniga let ishlating';\nlet out = [];\nconst orig = console.log;\nconsole.log = (...x) => out.push(x.join(' '));\ntry { new Function(code)(); } catch (e) { return 'Xato: ' + e.message; } finally { console.log = orig; }\nif (out.some(m => m.includes('15'))) return null;\nreturn '15 natijasi konsolga chiqmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`let count = 5; count += 3;` kodi bajarilgandan so'ng `count` ning qiymati nima bo'ladi?",
      options: [
        "5",
        "3",
        "8",
        "\"53\""
      ],
      correctAnswer: 2,
      explanation: "count += 3 amali count = count + 3 deganidir, ya'ni 5 + 3 = 8."
    },
    {
      id: 2,
      question: "`score++` amali nimani anglatadi?",
      options: [
        "score ga 2 qo'shadi",
        "score qiymatini 1 taga oshiradi (inkrement)",
        "score ni 1 taga kamaytiradi",
        "score ni 0 ga tenglaydi"
      ],
      correctAnswer: 1,
      explanation: "++ (inkrement) operatori o'zgaruvchi qiymatini aynan 1 taga oshiradi."
    },
    {
      id: 3,
      question: "Quyidagi kod nega xatolik (TypeError) beradi?\nconst level = 1;\nlevel++;",
      options: [
        "++ operatori noto'g'ri yozilgan",
        "const bilan yaratilgan o'zgarmas qiymatni o'zgartirib bo'lmaydi",
        "level o'rniga boshqa nom qo'yish kerak",
        "Konsolga chiqarilmagani uchun"
      ],
      correctAnswer: 1,
      explanation: "const o'zgarmas bo'lgani uchun uning qiymatini ++ yoki += bilan o'zgartirib bo'lmaydi; bu holatda let ishlatish kerak."
    }
  ]
};
