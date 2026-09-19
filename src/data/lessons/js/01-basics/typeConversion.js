export const typeConversionLesson = {
  id: "typeConversionLesson",
  title: "Type Conversion: Explicit va Implicit",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Type conversion nima?
Bir turni boshqasiga aylantirish. Masalan, foydalanuvchi formaga \`25\` yozdi — lekin u **matn** (\`"25"\`) bo'lib keladi. Hisoblash uchun uni **songa** aylantirish kerak.

Aylantirishning ikki usuli bor:
- **Explicit (oshkora)** — SIZ aytasiz: \`Number("25")\` → \`25\`
- **Implicit (yashirin)** — JavaScript O'ZI qiladi: \`"25" - 5\` → \`20\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **valyuta ayirboshlash shoxobchasidasiz**:
- **Explicit** — siz kassirga "shu dollarni so'mga almashtiring" deysiz (aniq buyruq)
- **Implicit** — avtomatning o'zi "bu dollar ekan, so'mda qaytaraman" deb taxmin qiladi (ba'zan xato kursda!)

Xulosa: pulingizni har doim O'ZINGIZ almashtiring — avtomatga ishonmang!

---

## 2. 💻 Oshkor Aylantirish (3 ta qurol)

### Number() — songa
\`\`\`javascript
console.log(Number("25"));    // 25
console.log(Number(""));      // 0
console.log(Number("Ali"));   // NaN (son emas!)
console.log(Number(true));    // 1
console.log(Number(false));   // 0
\`\`\`

### String() — matnga
\`\`\`javascript
console.log(String(25));      // "25"
console.log(String(true));    // "true"
console.log(String(null));    // "null"
\`\`\`

### Boolean() — rost/yolg'onga
\`\`\`javascript
console.log(Boolean(1));      // true
console.log(Boolean(0));      // false
console.log(Boolean("Ali"));  // true
console.log(Boolean(""));     // false (bo'sh matn yolg'on!)
console.log(Boolean(null));   // false
\`\`\`

### Yodlash qoidasi — "5 ta yolg'onchi"
\`false\` beradiganlar atigi **beshta**: \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Qolgan HAMMA narsa \`true\`!

\`\`\`mermaid
flowchart TD
    A["Boolean(X)"] --> B{"0, '', null, undefined, NaN mi?"}
    B -->|"Ha (5 tadan biri)"| C["false"]
    B -->|"Yo'q (qolgan hammasi)"| D["true"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

Yashirin aylantirishda \`+\` va qolgan operatorlar HAR XIL ishlaydi:

\`\`\`javascript
console.log("5" + 3);   // "53" (matn! + yopishtiradi)
console.log("5" - 3);   // 2 (son! - faqat hisoblaydi)
console.log("5" * 2);   // 10 (son!)
console.log("10" / 2);  // 5 (son!)
\`\`\`

> **Oltin qoida:** \`+\` matnni ko'rsa — yopishtiradi. Qolgan (\`- * /\`) — songa aylantirib hisoblaydi.

Va eng xavflisi — \`==\` (yumshoq tenglik) ham yashirin aylantiradi. Shuning uchun har doim \`===\` ishlating (1.11-darsda batafsil).

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`"5" + 3 = 8\` deb o'ylash | \`"53"\` ekanini bilish | \`+\` matn bilan yopishtiradi |
| \`Number("Ali")\` ga ishonish | \`NaN\` chiqishini bilish | Matn songa aylanmaydi |
| \`Boolean("false")\` → false deb o'ylash | \`true\`! | Bo'sh bo'lmagan har qanday matn rost |
| Forma ma'lumotini to'g'ridan hisoblash | Avval \`Number()\` qilish | Formadan hamma narsa matn bo'lib keladi! |

---

## 5. 🔑 Asosiy Atamalar

- **Explicit conversion** — oshkor aylantirish (\`Number()\`, \`String()\`, \`Boolean()\`)
- **Implicit coercion** — yashirin aylantirish (JS o'zi qiladi)
- **NaN** — "Not a Number", muvaffaqiyatsiz son aylantirish natijasi
- **Falsy** — \`false\` beradigan 5 qiymat (0, "", null, undefined, NaN)

---

## 6. 🌍 Real Hayotda Qayerda?

- **Forma:** yosh maydonidan \`"25"\` keldi → \`Number()\` qilib 25 ga aylantirish
- **Tekshiruv:** parol maydoni bo'shmi? → \`Boolean(parol) === false\`
- **Hisobot:** sonni ekranga chiqarish → \`String(jami)\` (kamdan-kam kerak, avtomatik bo'ladi)

---

## 7. 🎙 Intervyu Savollari

**1. \`"5" + 3\` va \`"5" - 3\` natijalari nima, nima uchun farq qiladi?**
**Javob:** \`"53"\` va \`2\`. \`+\` matnni ko'rsa yopishtiradi, \`-\` esa songa aylantirib hisoblaydi.

**2. Qaysi 5 qiymat \`false\` beradi?**
**Javob:** \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\` — qolgan hammasi \`true\`.

**3. \`Boolean("false")\` natijasi nima?**
**Javob:** \`true\`! Chunki bo'sh bo'lmagan matn — rost.

---

## 8. ✅ Xulosa

- **3 qurol:** \`Number()\`, \`String()\`, \`Boolean()\` — har doim oshkor aylantiring
- **5 yolg'onchi:** \`0, "", null, undefined, NaN\` → false
- **\`+\` yopishtiradi, \`- * /\` hisoblaydi**
- **Keyingi qadam:** 1.9-darsda faqat songa aylantirish — explicit casting
`,
  exercises: [
    {
      id: 1,
      title: "Matndan songa",
      instruction: "`toNumber(matn)` funksiyasi matnni `Number()` bilan songa aylantirib qaytarsin.",
      startingCode: "function toNumber(matn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number(matn);",
      test: "const fn = new Function(code + '; return toNumber;')();\nif (fn(\"25\") === 25 && fn(\"\") === 0) return null;\nreturn 'Number() ishlatilmadi';"
    },
    {
      id: 2,
      title: "Songa matnga",
      instruction: "`toString(son)` funksiyasi sonni `String()` bilan matnga aylantirib qaytarsin.",
      startingCode: "function toString(son) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return String(son);",
      test: "const fn = new Function(code + '; return toString;')();\nif (fn(25) === \"25\" && typeof fn(25) === \"string\") return null;\nreturn 'String() ishlatilmadi';"
    },
    {
      id: 3,
      title: "Forma yoshini hisoblash",
      instruction: "Formadan yosh `\"20\"` (matn) keldi. `nextYear(yoshMatn)` funksiyasi uni songa aylantirib, 1 qo'shib qaytarsin. Masalan: nextYear(\"20\") => 21.",
      startingCode: "function nextYear(yoshMatn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number(yoshMatn) + 1;",
      test: "const fn = new Function(code + '; return nextYear;')();\nif (fn(\"20\") === 21) return null;\nreturn 'Avval Number() qiling, keyin + 1';"
    },
    {
      id: 4,
      title: "Bo'shmi?",
      instruction: "`hasValue(qiymat)` funksiyasi qiymat \"to'ldirilgan\" bo'lsa `true` qaytarsin (`Boolean()` dan foydalaning).",
      startingCode: "function hasValue(qiymat) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Boolean(qiymat);",
      test: "const fn = new Function(code + '; return hasValue;')();\nif (fn(\"Ali\") === true && fn(\"\") === false && fn(0) === false) return null;\nreturn 'Boolean() ishlatilmadi';"
    },
    {
      id: 5,
      title: "Yashirin tuzoq",
      instruction: "`whatIs(a)` funksiyasi `\"5\" + 3` ifodaning NATIJASINI (\"53\" matnini) qaytarsin — kod ichida yozib ko'ring.",
      startingCode: "function whatIs(a) {\n  // \"5\" + 3 ni hisoblang\n}\n",
      hint: "return \"5\" + 3;",
      test: "const fn = new Function(code + '; return whatIs;')();\nif (fn() === \"53\") return null;\nreturn '\"5\" + 3 = \"53\" (matn)';"
    },
    {
      id: 6,
      title: "To'g'ri yig'indi",
      instruction: "`addStrings(a, b)` funksiyasi ikkita matn-sonni (`\"10\"`, `\"20\"`) songa aylantirib qo'shsin. Masalan: addStrings(\"10\", \"20\") => 30 (\"1020\" emas!).",
      startingCode: "function addStrings(a, b) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number(a) + Number(b);",
      test: "const fn = new Function(code + '; return addStrings;')();\nif (fn(\"10\", \"20\") === 30) return null;\nreturn 'Ikkisini ham Number() qiling';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`Number(\"25\")` natijasi nima?",
      options: [
        "\"25\" (matn)",
        "25 (son)",
        "NaN",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Number matnni songa aylantiradi."
    },
    {
      id: 2,
      question: "`\"5\" + 3` va `\"5\" - 3` natijalari?",
      options: [
        "8 va 2",
        "\"53\" va 2",
        "\"53\" va \"53\"",
        "8 va 8"
      ],
      correctAnswer: 1,
      explanation: "+ yopishtiradi, - hisoblaydi."
    },
    {
      id: 3,
      question: "Qaysi biri `false` bermaydi?",
      options: [
        "Boolean(0)",
        "Boolean(\"\")",
        "Boolean(\"false\")",
        "Boolean(null)"
      ],
      correctAnswer: 2,
      explanation: "\"false\" bo'sh bo'lmagan matn — demak true!"
    },
    {
      id: 4,
      question: "`Number(\"Ali\")` natijasi?",
      options: [
        "0",
        "NaN",
        "\"Ali\"",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Matn songa aylanmaydi — NaN chiqadi."
    },
    {
      id: 5,
      question: "Forma maydonidan kelgan \"20\" ga 1 qo'shmoqchimiz. To'g'ri yo'l?",
      options: [
        "\"20\" + 1",
        "Number(\"20\") + 1",
        "\"20\" - (-1)",
        "Hech qaysi"
      ],
      correctAnswer: 1,
      explanation: "Avval songa aylantirish kerak, aks holda \"201\" chiqadi."
    },
    {
      id: 6,
      question: "Explicit va implicit farqi?",
      options: [
        "Bir xil narsa",
        "Explicit — siz aytasiz, implicit — JS o'zi taxmin qiladi",
        "Implicit — siz aytasiz, explicit — JS o'zi",
        "Ikkisi ham taqiqlangan"
      ],
      correctAnswer: 1,
      explanation: "O'zingiz aylantiring — avtomatga ishonmang."
    }
  ]

};
