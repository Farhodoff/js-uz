export const operators = {
  id: "operators",
  title: "Operatorlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Operator nima?
**Operator** — qiymatlar ustida ish bajaradigan belgi: qo'shish, ayirish, solishtirish, ulash.

\`\`\`javascript
let natija = 10 + 5;  // + operatori: 10 va 5 ni qo'shadi
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **oshxonada oshpazsiz**:
- **+** — ikki masalliqni aralashtirish (un + suv = xamir)
- **-** — ortiqchasini olib tashlash
- **\\*** — ko'paytirish (retseptni 2 baravar oshirish)
- **/** — bo'lish (tortni 8 bo'lakka kesish)
- **%** — qoldiq (8 ta olmani 3 kishiga bo'lsangiz, 2 tasi ortadi)

Operator — oshpazning pichog'i: to'g'ri ishlatsangiz — taom, noto'g'ri ishlatsangiz — barmoq kesiladi!

---

## 2. 💻 Asosiy Operatorlar

### Arifmetik (hisob-kitob)
\`\`\`javascript
console.log(10 + 5);   // 15 (qo'shish)
console.log(10 - 5);   // 5 (ayirish)
console.log(10 * 5);   // 50 (ko'paytirish)
console.log(10 / 5);   // 2 (bo'lish)
console.log(10 % 3);   // 1 (qoldiq: 10 ni 3 ga bo'lsak 1 ortadi)
console.log(2 ** 3);   // 8 (daraja: 2*2*2)
\`\`\`

### Qisqa yozuv (o'ziga qo'shish)
\`\`\`javascript
let hisob = 10;
hisob = hisob + 5;  // uzun yo'l
hisob += 5;         // qisqa yo'l — bir xil natija!

let son = 1;
son++;  // 1 ga oshirish (son = 2)
son--;  // 1 ga kamaytirish (son = 1)
\`\`\`

### Solishtirish (natija har doim true/false)
\`\`\`javascript
console.log(10 > 5);    // true (katta)
console.log(10 < 5);    // false (kichik)
console.log(10 >= 10);  // true (katta yoki teng)
console.log(5 <= 3);    // false
\`\`\`

### Mantiqiy (bir nechta shartni ulash)
\`\`\`javascript
console.log(true && false);  // false (VA — ikkisi ham rost bo'lishi kerak)
console.log(true || false);  // true (YOKI — bittasi rost bo'lsa kifoya)
console.log(!true);          // false (EMAS — teskarisi)
\`\`\`

\`\`\`mermaid
flowchart LR
    A["Operator"] --> B["Arifmetik: + - * / %"]
    A --> C["Solishtirish: > < >= <="]
    A --> D["Mantiqiy: && || !"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Operatorlar **ustuvorlik** (priority) bilan ishlaydi — xuddi matematikadagi kabi: avval ko'paytirish, keyin qo'shish:

\`\`\`javascript
console.log(2 + 3 * 4);    // 14 (avval 3*4=12, keyin +2)
console.log((2 + 3) * 4);  // 20 (qavs birinchiligi bor!)
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`10 / 0\` ga hayron qolish | \`Infinity\` ekanini bilish | Nolga bo'lish xato emas, cheksizlik beradi |
| \`5 = 5\` yozish | \`5 === 5\` | Bitta \`=\` — saqlash, solishtirish uchun \`===\` |
| \`%\` ni foiz deb o'ylash | Qoldiq operatori ekanini bilish | \`10 % 3 = 1\` (qoldiq), foiz emas! |
| \`son++\` va \`++son\` ni bir xil deb o'ylash | Farqni bilish (keyingi darslarda) | Hozircha \`son++\` kifoya |

---

## 5. 🔑 Asosiy Atamalar

- **Operator** — ish bajaruvchi belgi (\`+\`, \`-\`, \`>\`, \`&&\`)
- **Operand** — operator ishlaydigan qiymat (\`10 + 5\` da 10 va 5)
- **Qoldiq (%)** — bo'linishdan ortgan qism
- **Mantiqiy** — rost/yolg'on qiymatlar bilan ishlash (\`&&\`, \`||\`, \`!\`)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Do'kon:** \`jami = narx * soni - chegirma;\`
- **Yosh tekshiruvi:** \`yosh >= 18 && hujjatBor\`
- **Juft/toq:** \`son % 2 === 0\` → juft!

---

## 7. 🎙 Intervyu Savollari

**1. \`%\` operatori nima qiladi?**
**Javob:** Bo'linish qoldig'ini qaytaradi: \`10 % 3 = 1\`. Juft/toq tekshirishda ishlatiladi.

**2. \`=\` va \`===\` farqi nima?**
**Javob:** \`=\` — qiymat saqlash, \`===\` — qat'iy solishtirish (turi bilan).

**3. \`&&\` va \`||\` farqi?**
**Javob:** \`&&\` — ikkisi ham true bo'lsa true. \`||\` — bittasi true bo'lsa true.

---

## 8. ✅ Xulosa

- **Arifmetik:** \`+ - * / % **\` — hisob-kitob
- **Solishtirish:** \`> < >= <=\` — natija boolean
- **Mantiqiy:** \`&&\` (VA), \`||\` (YOKI), \`!\` (EMAS)
- **Qisqa yozuv:** \`+=\`, \`++\`, \`--\`
- **Keyingi qadam:** 1.8-darsda bir turni boshqasiga aylantirish — type conversion
`,
  exercises: [
    {
      id: 1,
      title: "Kalkulyator",
      instruction: "`calc(a, b)` funksiyasi `[a+b, a-b, a*b, a/b]` massivini qaytarsin.",
      startingCode: "function calc(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return [a + b, a - b, a * b, a / b];",
      test: "const fn = new Function(code + '; return calc;')();\nconst r = fn(10, 5);\nif (r[0] === 15 && r[1] === 5 && r[2] === 50 && r[3] === 2) return null;\nreturn 'To\\'rtta amal ham to\\'g\\'ri bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Juftmi?",
      instruction: "`isEven(son)` funksiyasi son juft bo'lsa `true`, toq bo'lsa `false` qaytarsin.",
      startingCode: "function isEven(son) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return son % 2 === 0;",
      test: "const fn = new Function(code + '; return isEven;')();\nif (fn(4) === true && fn(7) === false && fn(0) === true) return null;\nreturn '% bilan qoldiq tekshiring';"
    },
    {
      id: 3,
      title: "Chegirmali narx",
      instruction: "`finalPrice(narx, chegirma)` funksiyasi chegirmadan keyingi narxni qaytarsin. Masalan: finalPrice(100, 20) => 80.",
      startingCode: "function finalPrice(narx, chegirma) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return narx - chegirma; yoki return narx * (100 - 20) / 100;",
      test: "const fn = new Function(code + '; return finalPrice;')();\nif (fn(100, 20) === 80 && fn(50, 5) === 45) return null;\nreturn 'Ayirish noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Kirish huquqi",
      instruction: "`canEnter(yosh, biletBor)` funksiyasi yosh 12+ VA bilet bo'lsa `true` qaytarsin.",
      startingCode: "function canEnter(yosh, biletBor) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return yosh >= 12 && biletBor;",
      test: "const fn = new Function(code + '; return canEnter;')();\nif (fn(15, true) === true && fn(10, true) === false && fn(15, false) === false) return null;\nreturn '&& bilan ikki shartni ulang';"
    },
    {
      id: 5,
      title: "Katta sonni top",
      instruction: "`max(a, b)` funksiyasi ikkisidan kattasini qaytarsin (teng bo'lsa istalganini).",
      startingCode: "function max(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (a > b) return a; return b;",
      test: "const fn = new Function(code + '; return max;')();\nif (fn(10, 5) === 10 && fn(3, 9) === 9) return null;\nreturn '> bilan solishtiring';"
    },
    {
      id: 6,
      title: "Ballarni yig'ish",
      instruction: "`totalScore` 0 dan boshlansin. Unga avval 10, keyin 25 qo'shing (`+=` bilan). Natija 35 bo'lishi kerak.",
      startingCode: "let totalScore = 0;\n// Qo'shishni yozing\n",
      hint: "totalScore += 10; totalScore += 25;",
      test: "const v = new Function(code + '; return totalScore;')();\nif (v === 35) return null;\nreturn 'totalScore 35 bo\\'lishi kerak';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`10 % 3` natijasi nima?",
      options: [
        "3",
        "1 (qoldiq)",
        "3.33",
        "0"
      ],
      correctAnswer: 1,
      explanation: "% qoldiqni beradi: 10 = 3*3 + 1."
    },
    {
      id: 2,
      question: "Son juftligini qanday tekshiramiz?",
      options: [
        "son % 2 === 0",
        "son / 2 === 0",
        "son + 2 === 0",
        "son > 2"
      ],
      correctAnswer: 0,
      explanation: "Juft son 2 ga qoldiqsiz bo'linadi."
    },
    {
      id: 3,
      question: "`2 + 3 * 4` natijasi nima?",
      options: [
        "20",
        "14 (avval ko'paytirish)",
        "24",
        "9"
      ],
      correctAnswer: 1,
      explanation: "Ustuvorlik: avval 3*4=12, keyin +2."
    },
    {
      id: 4,
      question: "`true && false` va `true || false` natijalari?",
      options: [
        "true va true",
        "false va true",
        "false va false",
        "true va false"
      ],
      correctAnswer: 1,
      explanation: "&& ikkisi ham rost bo'lishini, || bittasi kifoya bo'lishini talab qiladi."
    },
    {
      id: 5,
      question: "`=` va `===` farqi?",
      options: [
        "Bir xil",
        "= saqlash, === qat'iy solishtirish",
        "=== saqlash, = solishtirish",
        "Ikkisi ham saqlash"
      ],
      correctAnswer: 1,
      explanation: "Bitta = qutiga soladi, uchta === solishtiradi."
    },
    {
      id: 6,
      question: "`x += 5` nimaga teng?",
      options: [
        "x = x + 5",
        "x = 5",
        "x = x * 5",
        "Hech narsaga"
      ],
      correctAnswer: 0,
      explanation: "+= — o'ziga qo'shib qayta saqlashning qisqa yo'li."
    }
  ]

};
