export const typeCasting = {
  id: "typeCasting",
  title: "Explicit Type Casting",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Explicit casting — o'zingiz buyruq berasiz
1.8-darsda har uchala qurolni ko'rdik. Endi faqat **songa aylantirishga** chuqurlashamiz — chunki forma, prompt va API'dan hamma narsa matn bo'lib keladi.

Uchta usul bor:

\`\`\`javascript
Number("25");      // 25 — universal, tavsiya qilinadi
parseInt("25.9");  // 25 — butun qismni oladi
parseFloat("25.9"); // 25.9 — kasrni saqlaydi
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **tarozibonsiz**, mijoz qopda un olib keldi:
- **Number** — qopdagi hammasini tortish (aniq vazn)
- **parseInt** — faqat to'liq kilolarni sanash (kasrni tashlash)
- **parseFloat** — grammigacha aniq tortish

---

## 2. 💻 Uchala Usul Farqi

\`\`\`javascript
console.log(Number("25.9"));      // 25.9
console.log(parseInt("25.9"));    // 25 (kasr tashlandi!)
console.log(parseFloat("25.9"));  // 25.9

console.log(Number("25px"));      // NaN (qat'iy!)
console.log(parseInt("25px"));    // 25 (boshidagi sonni oldi!)
console.log(parseFloat("25px"));  // 25

console.log(Number(""));          // 0
console.log(parseInt(""));        // NaN
\`\`\`

### Farqni eslab qoling
> **Number** — perfeksionist: ozgina nuqson bo'lsa \`NaN\`.
> **parseInt/parseFloat** — kelishuvchan: boshidagi sonni olib beradi.

\`\`\`mermaid
flowchart TD
    A["'25.9px'"] --> B{"Qaysi usul?"}
    B -->|"Number"| C["NaN (qat'iy)"]
    B -->|"parseInt"| D["25 (butun)"]
    B -->|"parseFloat"| E["25.9 (kasr)"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

\`+\` (unar) ham songa aylantiradi — \`Number()\` ning qisqa yo'li:

\`\`\`javascript
console.log(+"25");  // 25
console.log(+"");    // 0
\`\`\`

Lekin o'qilishi qiyin — o'quv davrida \`Number()\` yozing, professional bo'lgach \`+\` ga o'tasiz.

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`parseInt(25.9)\` kutganda 25.9 | \`25\` ekanini bilish | parseInt har doim butunlaydi |
| \`Number("25px")\` dan 25 kutish | \`NaN\` — parseInt kerak | Number qat'iy, harf ko'rsa taslim |
| \`parseInt("12", 8)\` ni 12 deb o'ylash | Sakkizlikda 10! | Ikkinchi parametr sanoq sistemasi (kamdan kerak) |

---

## 5. 🔑 Asosiy Atamalar

- **Explicit casting** — oshkor aylantirish (siz buyruq berasiz)
- **parseInt** — butun songa (kasrni tashlaydi)
- **parseFloat** — kasr songa (aniqlikni saqlaydi)
- **NaN** — muvaffaqiyatsiz aylantirish belgisi

---

## 6. 🌍 Real Hayotda Qayerda?

- **Narx:** \`"99.99"\` → \`parseFloat\` (tiyinlar kerak!)
- **Yosh:** \`"25 yosh"\` → \`parseInt\` (25 ni oladi)
- **Hisob:** forma maydoni → \`Number\` (toza son bo'lsa)

---

## 7. 🎙 Intervyu Savollari

**1. \`Number("25px")\` va \`parseInt("25px")\` farqi?**
**Javob:** \`NaN\` va \`25\`. Number qat'iy, parseInt boshidagi sonni oladi.

**2. \`parseInt\` va \`parseFloat\` farqi?**
**Javob:** parseInt butunlaydi (\`25.9\` → \`25\`), parseFloat kasrni saqlaydi.

**3. \`+"25"\` nima?**
**Javob:** \`Number("25")\` ning qisqa yozuvi — 25.

---

## 8. ✅ Xulosa

- **Number** — qat'iy va universal (tavsiya)
- **parseInt** — butun qism, **parseFloat** — kasrli
- **Qoida:** toza matn → Number, "25px" kabi → parseInt/parseFloat
- **Keyingi qadam:** 1.10-darsda yashirin aylantirish tuzoqlari
`,
  exercises: [
    {
      id: 1,
      title: "Butun yosh",
      instruction: "`getAge(matn)` funksiyasi `\"25 yosh\"` kabi matndan butun sonni olib bersin. Masalan: getAge(\"25 yosh\") => 25.",
      startingCode: "function getAge(matn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return parseInt(matn);",
      test: "const fn = new Function(code + '; return getAge;')();\nif (fn(\"25 yosh\") === 25 && fn(\"30\") === 30) return null;\nreturn 'parseInt ishlating';"
    },
    {
      id: 2,
      title: "Aniq narx",
      instruction: "`getPrice(matn)` funksiyasi `\"99.99\"` dan kasr sonni qaytarsin.",
      startingCode: "function getPrice(matn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return parseFloat(matn);",
      test: "const fn = new Function(code + '; return getPrice;')();\nif (fn(\"99.99\") === 99.99) return null;\nreturn 'parseFloat ishlating';"
    },
    {
      id: 3,
      title: "Qat'iy tekshiruv",
      instruction: "`strictNum(matn)` funksiyasi `Number()` bilan aylantirsin. `\"25px\"` uchun `NaN` qaytishi kerak.",
      startingCode: "function strictNum(matn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return Number(matn);",
      test: "const fn = new Function(code + '; return strictNum;')();\nif (fn(\"25\") === 25 && Number.isNaN(fn(\"25px\"))) return null;\nreturn 'Number() ishlating';"
    },
    {
      id: 4,
      title: "Sonmi?",
      instruction: "`isRealNumber(matn)` funksiyasi matn toza son bo'lsa `true`, bo'lmasa `false` qaytarsin. (`Number.isNaN` dan foydalaning).",
      startingCode: "function isRealNumber(matn) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return !Number.isNaN(Number(matn));",
      test: "const fn = new Function(code + '; return isRealNumber;')();\nif (fn(\"25\") === true && fn(\"Ali\") === false && fn(\"\") === true) return null;\nreturn 'Number.isNaN bilan tekshiring';"
    },
    {
      id: 5,
      title: "Kasrni tashlash",
      instruction: "`wholePart(son)` funksiyasi `25.9` dan `25` qaytarsin.",
      startingCode: "function wholePart(son) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return parseInt(son);",
      test: "const fn = new Function(code + '; return wholePart;')();\nif (fn(25.9) === 25 && fn(99.1) === 99) return null;\nreturn 'parseInt ishlating';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`parseInt(\"25.9\")` natijasi?",
      options: [
        "25.9",
        "25",
        "26",
        "NaN"
      ],
      correctAnswer: 1,
      explanation: "parseInt kasrni tashlab butunlaydi."
    },
    {
      id: 2,
      question: "`Number(\"25px\")` natijasi?",
      options: [
        "25",
        "NaN (qat'iy — harf bor)",
        "\"25px\"",
        "0"
      ],
      correctAnswer: 1,
      explanation: "Number ozgina nuqsonda ham taslim bo'ladi."
    },
    {
      id: 3,
      question: "Narx \"99.99\" ni aniq saqlash uchun qaysi usul?",
      options: [
        "parseInt",
        "parseFloat",
        "Boolean",
        "String"
      ],
      correctAnswer: 1,
      explanation: "parseFloat kasrni saqlaydi."
    },
    {
      id: 4,
      question: "`+\"25\"` nimaga teng?",
      options: [
        "\"25\"",
        "25 (Number ning qisqa yo'li)",
        "NaN",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Unar + — Number() ning qisqasi."
    },
    {
      id: 5,
      question: "`Number(\"\")` natijasi?",
      options: [
        "NaN",
        "0",
        "\"\"",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh matn Number uchun 0 — parseInt dan farqi!"
    }
  ]

};
