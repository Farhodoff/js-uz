export const typeofLesson = {
  id: "typeofLesson",
  title: "Typeof Operator",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### typeof — "sen kimsan?" degan savol
Har qanday qiymatdan turini so'rash uchun \`typeof\` ishlatiladi. Natija har doim **matn** (string) bo'ladi:

\`\`\`javascript
console.log(typeof 25);        // "number"
console.log(typeof "Ali");     // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **bojxona xodimisiz**: har bir yuk mashinasi oldingizdan o'tayotganda "ichida nima bor?" deb so'raysiz. Haydovchi javob beradi: "meva", "kiyim", "texnika". \`typeof\` ham xuddi shunday — har bir qiymatdan "turing nima?" deb so'raydi.

---

## 2. 💻 To'liq Jadval

\`\`\`javascript
console.log(typeof 42);         // "number"
console.log(typeof "matn");     // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof 10n);        // "bigint"
console.log(typeof Symbol());   // "symbol"
console.log(typeof null);       // "object" (!!!)
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"
console.log(typeof function(){}); // "function"
\`\`\`

### Yodlash oson qoida
> **Hamma narsa o'z nomini aytadi** — \`typeof 42\` → \`"number"\`. Faqat **uchta istisno** bor:
> 1. \`typeof null\` → \`"object"\` (tarixiy xato)
> 2. \`typeof []\` → \`"object"\` (massiv ham obyekt!)
> 3. \`typeof function(){}\` → \`"function"\` (obyekt bo'lsa ham alohida nom)

\`\`\`mermaid
flowchart TD
    A["typeof X"] --> B{"null yoki massivmi?"}
    B -->|"Ha"| C["'object'"]
    B -->|"Yo'q"| D{"funksiyami?"}
    D -->|"Ha"| E["'function'"]
    D -->|"Yo'q"| F["O'z nomi: number, string..."]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

\`typeof\` — operator (funksiya emas!). Qavs shart emas:

\`\`\`javascript
console.log(typeof 42);   // ishlaydi
console.log(typeof(42));  // ham ishlaydi
let x = 10;
console.log(typeof x);    // "number"
\`\`\`

Amaliy qo'llanish — funksiyaga nima kelganini tekshirish:

\`\`\`javascript
function ikkilantir(son) {
  if (typeof son !== "number") {
    return "Iltimos, son kiriting!";
  }
  return son * 2;
}
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`if (typeof x == number)\` | \`if (typeof x === "number")\` | Natija MATN — qo'shtirnoq shart! |
| Massivni \`typeof\` bilan tekshirish | \`Array.isArray(arr)\` | \`typeof []\` → \`"object"\`, massivligi bilinmaydi |
| \`typeof null === "null"\` kutish | \`"object"\` ekanini bilish | Tarixiy xato |

---

## 5. 🔑 Asosiy Atamalar

- **typeof** — tur aniqlovchi operator, natija har doim matn
- **Istisno** — umumiy qoidaga bo'ysunmaydigan holat (null, massiv)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Forma tekshiruvi:** foydalanuvchi songa matn yozsa — \`typeof\` bilan ushlab, ogohlantirish
- **Kutubxona himoyasi:** funksiyaga noto'g'ri tur kelsa — erta xato qaytarish

---

## 7. 🎙 Intervyu Savollari

**1. \`typeof\` natijasi qaysi turda bo'ladi?**
**Javob:** Har doim string (matn): \`typeof 42\` → \`"number"\` (qo'shtirnoqli).

**2. Massiv ekanini \`typeof\` bilan bilib bo'ladimi?**
**Javob:** Yo'q — \`typeof []\` → \`"object"\`. \`Array.isArray()\` ishlatiladi.

**3. \`typeof\` ning uchta istisnosini ayting.**
**Javob:** \`null\` → \`"object"\`, \`[]\` → \`"object"\`, funksiya → \`"function"\`.

---

## 8. ✅ Xulosa

- **typeof** har doim matn qaytaradi, qavs shart emas
- **3 istisno:** \`null\` va \`[]\` → \`"object"\`, funksiya → \`"function"\`
- **Qo'shtirnoqni unutmang:** \`=== "number"\`, \`=== number\` emas!
- **Keyingi qadam:** 1.7-darsda sonlar va matnlar ustida amallar — operatorlar
`,
  exercises: [
    {
      id: 1,
      title: "Turlarni chop etish",
      instruction: "Uchta qiymat turini konsolga chop eting: `42`, `\"Salom\"`, `true` ning `typeof` natijalarini.",
      startingCode: "// typeof natijalarini chop eting\n",
      hint: "console.log(typeof 42); console.log(typeof \"Salom\"); console.log(typeof true);",
      test: "if (!code.includes('typeof')) return 'typeof ishlatilmadi';\n      return null;"
    },
    {
      id: 2,
      title: "Tur nomini qaytarish",
      instruction: "`getTypeName(value)` funksiyasi `typeof value` ni qaytarsin.",
      startingCode: "function getTypeName(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof value;",
      test: "const fn = new Function(code + '; return getTypeName;')();\nif (fn(10) === 'number' && fn('a') === 'string') return null;\nreturn 'typeof qaytarilmadi';"
    },
    {
      id: 3,
      title: "Sonmi?",
      instruction: "`isNumber(value)` funksiyasi qiymat son bo'lsa `true`, bo'lmasa `false` qaytarsin.",
      startingCode: "function isNumber(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof value === \"number\";",
      test: "const fn = new Function(code + '; return isNumber;')();\nif (fn(5) === true && fn(\"5\") === false && fn(null) === false) return null;\nreturn 'Faqat number uchun true';"
    },
    {
      id: 4,
      title: "Matnmi?",
      instruction: "`isString(value)` funksiyasi qiymat matn bo'lsa `true`, bo'lmasa `false` qaytarsin.",
      startingCode: "function isString(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof value === \"string\";",
      test: "const fn = new Function(code + '; return isString;')();\nif (fn(\"Ali\") === true && fn(42) === false) return null;\nreturn 'Faqat string uchun true';"
    },
    {
      id: 5,
      title: "Himoyalangan funksiya",
      instruction: "`double(x)` funksiyasi: agar `x` son bo'lsa `x * 2` qaytarsin, bo'lmasa `\"Son kiriting!\"` qaytarsin.",
      startingCode: "function double(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (typeof x !== \"number\") return \"Son kiriting!\"; return x * 2;",
      test: "const fn = new Function(code + '; return double;')();\nif (fn(5) === 10 && fn(\"a\") === 'Son kiriting!') return null;\nreturn 'Himoya ishlamadi';"
    },
    {
      id: 6,
      title: "Istisnoni top",
      instruction: "`whatIsNull()` funksiyasi `typeof null` natijasini qaytarsin.",
      startingCode: "function whatIsNull() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof null;",
      test: "const fn = new Function(code + '; return whatIsNull;')();\nif (fn() === 'object') return null;\nreturn 'typeof null object qaytaradi';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`typeof 42` natijasi qaysi turda?",
      options: [
        "number (son)",
        "\"number\" (matn)",
        "Natija yo'q",
        "42"
      ],
      correctAnswer: 1,
      explanation: "typeof har doim matn qaytaradi."
    },
    {
      id: 2,
      question: "Qaysi biri `typeof` istisnosi?",
      options: [
        "typeof 42 → \"number\"",
        "typeof \"a\" → \"string\"",
        "typeof null → \"object\"",
        "typeof true → \"boolean\""
      ],
      correctAnswer: 2,
      explanation: "null object qaytaradi — tarixiy xato."
    },
    {
      id: 3,
      question: "Massiv ekanini qanday aniq tekshiramiz?",
      options: [
        "typeof arr === \"array\"",
        "Array.isArray(arr)",
        "typeof arr === \"object\" (kifoya)",
        "arr.type"
      ],
      correctAnswer: 1,
      explanation: "typeof massivni object deydi, Array.isArray aniq javob beradi."
    },
    {
      id: 4,
      question: "`typeof function(){}` nima qaytaradi?",
      options: [
        "\"object\"",
        "\"function\"",
        "\"method\"",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Funksiya uchun alohida nom — \"function\"."
    },
    {
      id: 5,
      question: "`if (typeof x == number)` dagi xato nima?",
      options: [
        "== o'rniga === kerak",
        "number qo'shtirnoqsiz — \"number\" bo'lishi kerak",
        "if kerak emas",
        "Xato yo'q"
      ],
      correctAnswer: 1,
      explanation: "typeof matn qaytaradi, matn bilan solishtirish kerak."
    },
    {
      id: 6,
      question: "`typeof undefined` nima?",
      options: [
        "\"empty\"",
        "\"undefined\"",
        "\"null\"",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "undefined o'z nomini aytadi — istisnosiz."
    }
  ]

};
