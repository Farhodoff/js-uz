export const jsGotchas = {
  id: "jsGotchas",
  title: "JavaScript Gotchas (Tuzoqlar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Gotchas — JavaScript'ning "tuzoqlari"
JavaScript ba'zi joylarda g'alati xatti-harakat qiladi. Bularni bilmasangiz — kod sizni "aldab" qo'yadi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **yangi shaharda haydayapsiz**: ba'zi ko'chalar bir tomonlama, ba'zi belgilar chalg'ituvchi. Mahalliy haydovchi (tajribali dasturchi) bu tuzoqlarni biladi va chetlab o'tadi. Bugun o'sha tuzoqlarni o'rganamiz!

---

## 2. 💻 Mashhur Tuzoqlar

### 1. \`typeof null\` → \`"object"\`
\`\`\`javascript
console.log(typeof null);  // "object" (1995-yil xatosi)
\`\`\`

### 2. \`NaN\` o'ziga ham teng emas
\`\`\`javascript
console.log(NaN === NaN);  // false (!)
console.log(Number.isNaN(NaN));  // true (to'g'ri usul)
\`\`\`

### 3. Qo'shish va yopishtirish
\`\`\`javascript
console.log(1 + 2 + "3");   // "33" (avval 3, keyin yopishtirdi)
console.log("1" + 2 + 3);   // "123" (boshida matn — hammasi yopishtiriladi)
\`\`\`

### 4. \`[] + []\` va \`[] + {}\`
\`\`\`javascript
console.log([] + []);   // "" (bo'sh matn!)
console.log([] + {});   // "[object Object]"
\`\`\`

### 5. Massiv "teng emasligi"
\`\`\`javascript
console.log([1,2] === [1,2]);  // false! (ikki xil quti)
\`\`\`

### 6. \`0.1 + 0.2\`
\`\`\`javascript
console.log(0.1 + 0.2);  // 0.30000000000000004 (float!)
console.log((0.1 + 0.2).toFixed(1));  // "0.3"
\`\`\`

\`\`\`mermaid
flowchart TD
    A["JS tuzoqlari"] --> B["typeof null = object"]
    A --> C["NaN !== NaN"]
    A --> D["[1,2] !== [1,2]"]
    A --> E["0.1 + 0.2 = 0.30000000000000004"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Bu "tuzoqlar"ning sabablari:
- **Tarix:** 1995-yilda qilingan qarorlar bugun ham saqlanadi (moslik uchun o'zgartirilmaydi)
- **Suzuvchan nuqta (float):** \`0.1\` ni ikkilik sistemada aniq ifodalab bo'lmaydi
- **Obyekt = havola:** Massiv/obyektlar xotiradagi manzil bilan solishtiriladi

---

## 4. ⚠️ Qanday Himoyalanish

| Tuzoq | Himoya |
|---|---|
| \`typeof null\` | \`x === null\` bilan tekshirish |
| \`NaN\` | \`Number.isNaN(x)\` |
| \`0.1 + 0.2\` | \`toFixed()\` yoki tiyinda hisoblash |
| Massiv tengligi | \`JSON.stringify(a) === JSON.stringify(b)\` yoki elementma-element |
| \`"5" + 3\` | Avval \`Number()\` |

---

## 5. 🔑 Asosiy Atamalar

- **Gotcha** — kutilmagan xatti-harakat (tuzoq)
- **Coercion** — yashirin tur aylantirish
- **Float precision** — kasr sonlarning aniqlik chegarasi

---

## 6. 🌍 Real Hayotda Qayerda?

- **Narx hisobi:** \`0.1 + 0.2\` muammosi — pul hisobida tiyindа saqlash (\`100 + 20\` tiyin)
- **Solishtirish:** massivlarni \`JSON.stringify\` bilan solishtirish
- **Tekshiruv:** \`Number.isNaN\` bilan foydalanuvchi kiritmasini nazorat

---

## 7. 🎙 Intervyu Savollari

**1. \`typeof null\` nima uchun \`"object"\`?**
**Javob:** 1995-yilgi implementatsiya xatosi, moslik uchun o'zgartirilmagan.

**2. \`0.1 + 0.2 === 0.3\` rostmi?**
**Javob:** Yo'q — \`0.30000000000000004\`. Float aniqlik chegarasi.

**3. Ikkita bir xil massiv tengmi?**
**Javob:** Yo'q — \`[1] === [1]\` false, chunki havolalar har xil.

---

## 8. ✅ Xulosa

- **Tuzoqlar** eski qarorlar + float + havola semantikasi natijasi
- **Himoya:** \`Number.isNaN\`, \`=== null\`, \`toFixed\`, \`JSON.stringify\`
- **Bilish = tayyorlik** — intervyularda ko'p so'raladi
- **Keyingi qadam:** 1.23-darsda to'liq ma'lumotnoma — cheat sheet
`,
exercises: [
    {
      id: 1,
      title: "null turi",
      instruction: "`nullType()` funksiyasi `typeof null` natijasini qaytarsin.",
      startingCode: "function nullType() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return typeof null;",
      test: "const fn = new Function(code + '; return nullType;')();\nif (fn() === 'object') return null;\nreturn 'typeof null -> object';"
    },
    {
      id: 2,
      title: "NaN ni aniqlash",
      instruction: "`isNotNumber(x)` funksiyasi `Number.isNaN(x)` bilan tekshirsin.",
      startingCode: "function isNotNumber(x) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number.isNaN(x);",
      test: "const fn = new Function(code + '; return isNotNumber;')();\nif (fn(NaN) === true && fn(5) === false) return null;\nreturn 'Number.isNaN ishlating';"
    },
    {
      id: 3,
      title: "Yopishtirish tuzog'i",
      instruction: "`concatTrap()` funksiyasi `1 + 2 + \"3\"` natijasini (`\"33\"`) qaytarsin.",
      startingCode: "function concatTrap() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return 1 + 2 + \"3\";",
      test: "const fn = new Function(code + '; return concatTrap;')();\nif (fn() === \"33\") return null;\nreturn '\"33\" bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "Kasr aniqligi",
      instruction: "`floatTrap()` funksiyasi `(0.1 + 0.2).toFixed(1)` natijasini qaytarsin.",
      startingCode: "function floatTrap() {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return (0.1 + 0.2).toFixed(1);",
      test: "const fn = new Function(code + '; return floatTrap;')();\nif (fn() === '0.3') return null;\nreturn 'toFixed(1) ishlating -> \"0.3\"';"
    },
    {
      id: 5,
      title: "Massiv solishtirish",
      instruction: "`sameArrays(a, b)` funksiyasi ikkita massivni `JSON.stringify` bilan solishtirib `true`/`false` qaytarsin.",
      startingCode: "function sameArrays(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return JSON.stringify(a) === JSON.stringify(b);",
      test: "const fn = new Function(code + '; return sameArrays;')();\nif (fn([1,2], [1,2]) === true && fn([1], [2]) === false) return null;\nreturn 'JSON.stringify bilan solishtiring';"
    }
  ],
quizzes: [
    {
      id: 1,
      question: "`typeof null` nima qaytaradi?",
      options: [
        "\"null\"",
        "\"object\"",
        "\"undefined\"",
        "null"
      ],
      correctAnswer: 1,
      explanation: "1995-yilgi tarixiy xato."
    },
    {
      id: 2,
      question: "`NaN === NaN` natijasi?",
      options: [
        "true",
        "false",
        "NaN",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Number.isNaN() bilan tekshiriladi."
    },
    {
      id: 3,
      question: "`1 + 2 + \"3\"` natijasi?",
      options: [
        "\"33\"",
        "\"123\"",
        "6",
        "\"6\""
      ],
      correctAnswer: 0,
      explanation: "Avval 1+2=3, keyin \"3\" bilan yopishtiriladi."
    },
    {
      id: 4,
      question: "`0.1 + 0.2` nima beradi?",
      options: [
        "0.3",
        "0.30000000000000004",
        "0",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Float aniqlik chegarasi — toFixed ishlatiladi."
    },
    {
      id: 5,
      question: "`[1,2] === [1,2]` natijasi?",
      options: [
        "true",
        "false — havolalar har xil",
        "undefined",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "JSON.stringify bilan solishtiriladi."
    }
  ]
};
