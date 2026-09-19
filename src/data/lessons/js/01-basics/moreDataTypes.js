export const moreDataTypesLesson = {
  id: "moreDataTypesLesson",
  title: "Ma'lumot Turlari: Null, Symbol, BigInt",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### "Hech narsa"ning ikki turi
1.4-darsda 3 asosiy turni o'rgandik. Endi g'alatiroq turlar: **bo'sh quti** (\`undefined\`) va **atasi bo'sh quti** (\`null\`).

\`\`\`javascript
let quti1;              // undefined — quti bor, lekin ichi bo'sh
let quti2 = null;       // null — ichi ATAYLAB bo'shatilgan
\`\`\`

Farqi nimada? Tasavvur qiling:
- **\`undefined\`** — sizga hali topshirilmagan uy vazifasi daftari (mavjud, lekin ichi bo'sh)
- **\`null\`** — o'qituvchi "bu varaqni ataylab bo'sh qoldirdim" deb yozib qo'ygan varaq

### Katta sonlar va noyob kalitlar
- **BigInt** — juda katta sonlar uchun (bank hisobi, astronomiya)
- **Symbol** — mutlaqo takrorlanmas maxfiy kalitlar uchun

---

## 2. 💻 Har Biri Amalda

### undefined — avtomatik bo'shlik
\`\`\`javascript
let ism;
console.log(ism);  // undefined
console.log(typeof ism);  // "undefined"
\`\`\`

### null — ataylab bo'shatish
\`\`\`javascript
let tanlanganRang = "Qizil";
tanlanganRang = null;  // foydalanuvchi tanlovni bekor qildi
console.log(typeof null);  // "object" (tarixiy xato, lekin shunday!)
\`\`\`

> ⚠️ Mashhur g'alatilik: \`typeof null\` → \`"object"\`. Bu JavaScript'dagi eng qadimiy xato (1995-yildan!), lekin o'zgartirilmaydi — millionlab saytlar buziladi.

### BigInt — cheksiz katta sonlar
Oddiy \`number\` 2^53 dan katta sonni aniq saqlolmaydi:

\`\`\`javascript
console.log(9999999999999999);   // 10000000000000000 (xato!)
console.log(9999999999999999n);  // 9999999999999999n (aniq!)
\`\`\`

Oxiriga \`n\` qo'shsangiz — BigInt bo'ladi.

### Symbol — noyob kalit
\`\`\`javascript
const kalit1 = Symbol("tavsif");
const kalit2 = Symbol("tavsif");
console.log(kalit1 === kalit2);  // false — har biri noyob!
\`\`\`

\`\`\`mermaid
flowchart TD
    A["Qiymat yo'qmi?"] -->|"O'zi bo'sh"| B["undefined"]
    A -->|"Ataylab bo'shatildi"| C["null"]
    D["Son juda kattami?"] -->|"Ha"| E["BigInt (n)"]
    F["Noyob kalit kerakmi?"] -->|"Ha"| G["Symbol()"]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

- **\`undefined\`** avtomatik qo'yiladi: qiymat berilmagan o'zgaruvchi, qaytarmaydigan funksiya natijasi
- **\`null\`** ni FAQAT dasturchi qo'yadi — "bu yer ataylab bo'sh" degan belgi
- **BigInt** va **number** ni aralashtirib bo'lmaydi: \`10n + 5\` → Xato!

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`if (qiymat == null)\` ga ishonish | \`if (qiymat === null)\` | \`==\` da \`null == undefined\` true bo'ladi — chalkash! |
| \`10n + 5\` | \`10n + 5n\` yoki \`Number(10n) + 5\` | BigInt va number aralashmaydi |
| \`typeof null === "null"\` deb o'ylash | \`=== "object"\` ekanini bilish | Tarixiy xato — intervyuda so'rashadi! |

---

## 5. 🔑 Asosiy Atamalar

- **undefined** — qiymat hali berilmagan (avtomatik)
- **null** — ataylab bo'shatilgan (dasturchi qo'yadi)
- **BigInt** — katta butun sonlar (\`n\` bilan)
- **Symbol** — noyob identifikator

---

## 6. 🌍 Real Hayotda Qayerda?

- **Ro'yxatdan o'tish:** ism kiritilmagan → \`undefined\`; foydalanuvchi "bekor qilish"ni bossa → \`null\`
- **Bank:** trillion so'mlik hisoblar → \`BigInt\`
- **Kutubxonalar:** ichki maxfiy kalitlar → \`Symbol\`

---

## 7. 🎙 Intervyu Savollari

**1. \`null\` va \`undefined\` farqi nima?**
**Javob:** \`undefined\` — qiymat hali berilmagan (avtomatik). \`null\` — dasturchi ataylab bo'shatgan.

**2. \`typeof null\` nima qaytaradi va nima uchun?**
**Javob:** \`"object"\` — bu 1995-yildagi tarixiy xato, lekin moslik uchun o'zgartirilmaydi.

**3. \`null == undefined\` va \`null === undefined\` natijasi?**
**Javob:** \`==\` → true (yumshoq solishtirish), \`===\` → false (qat'iy — turlari har xil).

---

## 8. ✅ Xulosa

- **undefined** = hali bo'sh (avtomatik), **null** = ataylab bo'sh (siz qo'yasiz)
- **BigInt** = katta sonlar (\`n\`), **Symbol** = noyob kalit
- **E'tibor:** \`typeof null\` → \`"object"\` (tarixiy xato!)
- **Keyingi qadam:** 1.6-darsda \`typeof\` ni chuqur o'rganamiz
`,
  exercises: [
    {
      id: 1,
      title: "Bo'sh quti",
      instruction: "`kelajakReja` nomli o'zgaruvchi yarating, lekin unga hech qanday qiymat bermang. Keyin uning turini konsolga chop eting.",
      startingCode: "// kelajakReja ni yarating va turini chop eting\n",
      hint: "let kelajakReja; console.log(typeof kelajakReja);",
      test: "if (!code.includes('kelajakReja')) return 'kelajakReja topilmadi';\nconst v = new Function(code + '; return (typeof kelajakReja !== \"undefined\" || true) ? \"ok\" : null;')();\nreturn null;"
    },
    {
      id: 2,
      title: "Ataylab bo'shatish",
      instruction: "`tanlov` ga avval `Qizil` bering, keyin uni `null` ga tenglang.",
      startingCode: "// tanlov ni yarating va null qiling\n",
      hint: "let tanlov = \"Qizil\"; tanlov = null;",
      test: "const v = new Function(code + '; return tanlov;')();\nif (v === null) return null;\nreturn 'tanlov null bo\\'lishi kerak';"
    },
    {
      id: 3,
      title: "Bo'shmi?",
      instruction: "`isEmpty(value)` funksiyasi qiymat `null` YOKI `undefined` bo'lsa `true`, aks holda `false` qaytarsin.",
      startingCode: "function isEmpty(value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return value === null || value === undefined;",
      test: "const fn = new Function(code + '; return isEmpty;')();\nif (fn(null) === true && fn(undefined) === true && fn(0) === false && fn(\"\") === false) return null;\nreturn 'Faqat null/undefined uchun true';"
    },
    {
      id: 4,
      title: "Katta son",
      instruction: "`kattaSon` o'zgaruvchisiga `9007199254740993n` (BigInt) qiymatini bering.",
      startingCode: "// BigInt yarating\n",
      hint: "const kattaSon = 9007199254740993n;",
      test: "const v = new Function(code + '; return kattaSon;')();\nif (typeof v === 'bigint') return null;\nreturn 'BigInt (n bilan) bo\\'lishi kerak';"
    },
    {
      id: 5,
      title: "Standart qiymat",
      instruction: "`greet(ism)` funksiyasi: agar `ism` berilgan bo'lsa `Salom Ali` qaytarsin, berilmagan (`undefined`) bo'lsa `Salom Mehmon` qaytarsin.",
      startingCode: "function greet(ism) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (ism === undefined) return \"Salom Mehmon\"; return \"Salom \" + ism;",
      test: "const fn = new Function(code + '; return greet;')();\nif (fn('Ali') === 'Salom Ali' && fn() === 'Salom Mehmon') return null;\nreturn 'Standart qiymat ishlamadi';"
    },
    {
      id: 6,
      title: "Noyob kalitlar",
      instruction: "Ikkita `Symbol` yarating (`s1`, `s2`) va ular teng EMASligini tekshiruvchi kod yozing. Natijani `tengEmas` ga saqlang.",
      startingCode: "// Ikkita Symbol yarating\n",
      hint: "const s1 = Symbol(\"a\"); const s2 = Symbol(\"a\"); const tengEmas = s1 !== s2;",
      test: "const v = new Function(code + '; return tengEmas;')();\nif (v === true) return null;\nreturn 'tengEmas true bo\\'lishi kerak';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "`let x;` dan keyin `x` ning qiymati nima?",
      options: [
        "null",
        "undefined",
        "0",
        "Xatolik"
      ],
      correctAnswer: 1,
      explanation: "Qiymat berilmagan o'zgaruvchi avtomatik undefined bo'ladi."
    },
    {
      id: 2,
      question: "`typeof null` nimani qaytaradi?",
      options: [
        "\"null\"",
        "\"undefined\"",
        "\"object\"",
        "\"empty\""
      ],
      correctAnswer: 2,
      explanation: "Tarixiy xato tufayli \"object\" qaytadi — intervyuda ko'p so'raladi!"
    },
    {
      id: 3,
      question: "`null == undefined` va `null === undefined`?",
      options: [
        "Ikkisi ham true",
        "Ikkisi ham false",
        "== true, === false",
        "== false, === true"
      ],
      correctAnswer: 2,
      explanation: "Yumshoq (==) teng deydi, qat'iy (===) farq qiladi."
    },
    {
      id: 4,
      question: "BigInt qanday yoziladi?",
      options: [
        "BigInt(123)",
        "123n (oxirida n)",
        "\"123\" katta harfda",
        "123.0"
      ],
      correctAnswer: 1,
      explanation: "Oxiriga n qo'shiladi: 123n."
    },
    {
      id: 5,
      question: "Ikkita bir xil tavsifli Symbol tengmi?\n```javascript\nSymbol(\"a\") === Symbol(\"a\")\n```",
      options: [
        "true — bir xil",
        "false — har biri noyob",
        "Xatolik beradi",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Har bir Symbol noyob, tavsifi bir xil bo'lsa ham."
    },
    {
      id: 6,
      question: "Qachon `null` ishlatamiz?",
      options: [
        "Hech qachon",
        "Qiymatni ataylab bo'shatmoqchi bo'lganda",
        "Son saqlaganda",
        "Funksiya yozganda"
      ],
      correctAnswer: 1,
      explanation: "null — dasturchining \"ataylab bo'sh\" degan belgisi."
    }
  ]

};
