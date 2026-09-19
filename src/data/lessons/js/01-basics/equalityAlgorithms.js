export const equalityAlgorithms = {
  id: "equalityAlgorithms",
  title: "Taqqoslash va Tenglik (== vs ===)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Ikki xil "tengmi?"
JavaScript'da solishtirishning ikki usuli bor:

\`\`\`javascript
console.log(5 == "5");   // true (yumshoq — ko'r)
console.log(5 === "5");  // false (qat'iy — ko'ruvchi)
\`\`\`

- **\`==\` (yumshoq):** faqat qiymatga qaraydi, turni e'tiborsiz qoldiradi
- **\`===\` (qat'iy):** qiymat VA turni tekshiradi

### Real hayotiy o'xshatish
Tasavvur qiling, siz **kino teatr chipta tekshiruvchisisiz**:
- **Yumshoq (\`==\`):** "raqam to'g'ri bo'lsa bo'ldi — qog'ozmi, telefondami farqi yo'q" → hammani kiritib yuboradi
- **Qat'iy (\`===\`):** "raqam ham, chipta shakli ham mos bo'lishi shart" → begonalarni kiritmaydi

Qaysi biri xavfsizroq? Albatta qat'iy!

---

## 2. 💻 Yumshoq Tenglik Tuzoqlari

\`\`\`javascript
console.log(5 == "5");       // true (tuzoq!)
console.log(0 == false);     // true (tuzoq!)
console.log("" == false);    // true (tuzoq!)
console.log(null == undefined); // true (tuzoq!)
\`\`\`

Bularning barchasi \`==\` ning "ko'r"ligi sababli. Qat'iy tekshiruvda:

\`\`\`javascript
console.log(5 === "5");      // false (to'g'ri!)
console.log(0 === false);    // false (to'g'ri!)
console.log("" === false);   // false (to'g'ri!)
\`\`\`

### Qoida
> **Har doim \`===\` ishlating.** \`==\` ni unuting — professional kodda unga o'rin yo'q.

### \`!==\` — teng emasmi?
\`\`\`javascript
console.log(5 !== "5");  // true (turlar har xil — demak teng emas)
console.log(5 !== 5);    // false (bir xil!)
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Solishtirish kerakmi?"] --> B["==="]
    B --> C["Qiymat + tur bir xilmi?"]
    C -->|"Ha"| D["true"]
    C -->|"Yo'q"| E["false"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

\`===\` avval **turlarni** solishtiradi: har xil bo'lsa — darhol \`false\`, aylantirish yo'q. Shuning uchun u tezroq ham, xavfsizroq ham.

\`==\` esa avval turlarni birxillashga urinadi (yashirin aylantirish), keyin solishtiradi — shu jarayonda tuzoqlar tug'iladi.

Istisno — \`NaN\`: u hatto o'ziga ham teng emas!
\`\`\`javascript
console.log(NaN === NaN);  // false (!!!)
console.log(Number.isNaN(NaN));  // true (tekshirish usuli)
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`if (parol == 1234)\` | \`if (parol === 1234)\` | \`"1234" == 1234\` true — xavfsizlik teshigi! |
| \`==\` ni odat qilish | Faqat \`===\` va \`!==\` | Yumshoq tenglik — xatolar manbai |
| \`NaN === NaN\` dan true kutish | \`Number.isNaN()\` ishlatish | NaN o'ziga ham teng emas |

---

## 5. 🔑 Asosiy Atamalar

- **\`==\`** — yumshoq tenglik (faqat qiymat, tur e'tiborsiz)
- **\`===\`** — qat'iy tenglik (qiymat + tur)
- **\`!==\`** — qat'iy teng emaslik

---

## 6. 🌍 Real Hayotda Qayerda?

- **Parol tekshiruvi:** \`kiritilgan === saqlangan\` — turlar ham mos bo'lishi shart
- **Yosh chegarasi:** \`yosh === 18\` — \`"18"\` (matn) o'tmasligi kerak

---

## 7. 🎙 Intervyu Savollari

**1. \`==\` va \`===\` farqi nima?**
**Javob:** \`==\` faqat qiymatni solishtiradi (turni aylantiradi), \`===\` qiymat va turni birga tekshiradi.

**2. \`0 == false\` nima uchun true?**
**Javob:** \`==\` false ni 0 ga aylantiradi — yumshoq tenglik tuzog'i.

**3. \`NaN === NaN\` nima uchun false?**
**Javob:** Standart bo'yicha NaN hech narsaga teng emas, o'ziga ham. \`Number.isNaN()\` bilan tekshiriladi.

---

## 8. ✅ Xulosa

- **Faqat \`===\` va \`!==\`** — \`==\` ni lug'atingizdan o'chiring
- **NaN** o'ziga ham teng emas — \`Number.isNaN()\` ishlating
- **Keyingi qadam:** 1.12-darsda o'zgaruvchilar "qayerda ko'rinadi" — scope
`,
  exercises: [
    {
      id: 1,
      title: "Farqni ko'r",
      instruction: "`check(a, b)` funksiyasi `[a == b, a === b]` qaytarsin. check(5, \"5\") => [true, false] bo'lishi kerak.",
      startingCode: "function check(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return [a == b, a === b];",
      test: "const fn = new Function(code + '; return check;')();\nconst r = fn(5, \"5\");\nif (r[0] === true && r[1] === false) return null;\nreturn '[true, false] kutilgandi';"
    },
    {
      id: 2,
      title: "Xavfsiz parol",
      instruction: "`isCorrect(kiritilgan, saqlangan)` funksiyasi QAT'IY tenglik bilan solishtirsin. isCorrect(\"1234\", 1234) => false bo'lishi kerak!",
      startingCode: "function isCorrect(kiritilgan, saqlangan) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return kiritilgan === saqlangan;",
      test: "const fn = new Function(code + '; return isCorrect;')();\nif (fn(\"1234\", 1234) === false && fn(1234, 1234) === true) return null;\nreturn '=== ishlating, == emas!';"
    },
    {
      id: 3,
      title: "Turli tuzoqlar",
      instruction: "`traps()` funksiyasi `[0 == false, \"\" == false, null == undefined]` natijasini qaytarsin (uchtasi ham true).",
      startingCode: "function traps() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return [0 == false, \"\" == false, null == undefined];",
      test: "const fn = new Function(code + '; return traps;')();\nconst r = fn();\nif (r[0] === true && r[1] === true && r[2] === true) return null;\nreturn 'Uchala == ham true';"
    },
    {
      id: 4,
      title: "Qat'iy javoblar",
      instruction: "`strict()` funksiyasi `[0 === false, \"\" === false, null === undefined]` natijasini qaytarsin (uchtasi ham false).",
      startingCode: "function strict() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return [0 === false, \"\" === false, null === undefined];",
      test: "const fn = new Function(code + '; return strict;')();\nconst r = fn();\nif (r[0] === false && r[1] === false && r[2] === false) return null;\nreturn 'Uchala === ham false';"
    },
    {
      id: 5,
      title: "NaN ovchisi",
      instruction: "`isReallyNaN(x)` funksiyasi `Number.isNaN(x)` bilan tekshirsin.",
      startingCode: "function isReallyNaN(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number.isNaN(x);",
      test: "const fn = new Function(code + '; return isReallyNaN;')();\nif (fn(NaN) === true && fn(5) === false && fn(\"a\") === false) return null;\nreturn 'Number.isNaN ishlating';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`5 == \"5\"` va `5 === \"5\"`?",
      options: [
        "true va true",
        "true va false",
        "false va true",
        "false va false"
      ],
      correctAnswer: 1,
      explanation: "== ko'r, === qat'iy."
    },
    {
      id: 2,
      question: "Nega professional kodda `==` ishlatilmaydi?",
      options: [
        "U sekin yoziladi",
        "U turlarni yashirin aylantirib, kutilmagan true beradi",
        "U taqiqlangan so'z",
        "U faqat matnda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "0 == false → true kabi tuzoqlar xavfli."
    },
    {
      id: 3,
      question: "`NaN === NaN` natijasi?",
      options: [
        "true",
        "false (NaN o'ziga ham teng emas)",
        "NaN",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Number.isNaN() bilan tekshiriladi."
    },
    {
      id: 4,
      question: "Parol `\"1234\"` va `1234` ni `==` bilan solishtirsak?",
      options: [
        "false — xavfsiz",
        "true — XAVFLI! Turlar har xil bo'lsa ham o'tkazadi",
        "Xatolik",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "Shuning uchun parolda har doim ===."
    },
    {
      id: 5,
      question: "`null == undefined` va `null === undefined`?",
      options: [
        "true va false",
        "false va true",
        "true va true",
        "false va false"
      ],
      correctAnswer: 0,
      explanation: "== ularni teng deydi, === farqlaydi."
    }
  ]

};
