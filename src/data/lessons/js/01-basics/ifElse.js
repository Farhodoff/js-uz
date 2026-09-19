export const ifElseLesson = {
  id: "ifElseLesson",
  title: "Shart Operatorlari: if, else",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### if/else — qaror qabul qilish
Dastur ham odam kabi qaror qabul qiladi: **agar** shart bajarilsa — buni qil, **aks holda** — buni qil.

\`\`\`javascript
let yosh = 18;

if (yosh >= 18) {
  console.log("Xush kelibsiz!");
} else {
  console.log("Kirish taqiqlangan!");
}
\`\`\`

### Real hayotiy o'xshatish
Tasavvur qiling, siz **aeroport nazoratchisisiz**:
- **if** — "pasport bormi?" → ha bo'lsa, keyingi tekshiruvga
- **else if** — "vizami?" → viza bo'lsa, boshqa yo'lakka
- **else** — "hech biri yo'qmi?" → qaytib boring!

Har bir yo'lovchi faqat BITTA yo'ldan o'tadi.

---

## 2. 💻 Uchta Shakl

### Oddiy if
\`\`\`javascript
let yomgir = true;
if (yomgir) {
  console.log("Soyabon oling!");
}
\`\`\`

### if/else
\`\`\`javascript
let ball = 75;
if (ball >= 60) {
  console.log("O'tdingiz!");
} else {
  console.log("Yiqildingiz!");
}
\`\`\`

### if/else if/else (zanjir)
\`\`\`javascript
let baho = 85;
if (baho >= 90) {
  console.log("A'lo!");
} else if (baho >= 70) {
  console.log("Yaxshi!");
} else if (baho >= 60) {
  console.log("Qoniqarli!");
} else {
  console.log("Qoniqarsiz!");
}
\`\`\`

\`\`\`mermaid
flowchart TD
    A{"baho >= 90?"} -->|"Ha"| B["A'lo!"]
    A -->|"Yo'q"| C{"baho >= 70?"}
    C -->|"Ha"| D["Yaxshi!"]
    C -->|"Yo'q"| E["Davom et..."]
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi

JavaScript yuqoridan pastga tekshiradi: birinchi \`true\` topilishi bilan O'SHA blok ishlaydi, qolganlari o'tkazib yuboriladi:

\`\`\`javascript
let x = 75;
if (x >= 90) { ... }      // false — o'tkaziladi
else if (x >= 70) { ... } // true — ISHLAYDI!
else if (x >= 60) { ... } // tekshirilmaydi ham
\`\`\`

---

## 4. ⚠️ Keng Tarqalgan Xatolar

| ❌ Xato | ✅ To'g'ri | Sabab |
|---|---|---|
| \`if (yosh = 18)\` | \`if (yosh === 18)\` | Bitta \`=\` saqlaydi (har doim true!), solishtirish uchun \`===\` |
| \`if (yosh >= 18); { ... }\` | Nuqta-vergulsiz | \`;\` shartni "tugatadi" — blok har doim ishlaydi! |
| Qavslarni unutish (bir qatordan ko'p bo'lsa) | Har doim \`{ }\` | Bir qatorli bo'lsa ham qavs qo'yish — xavfsiz odat |

---

## 5. 🔑 Asosiy Atamalar

- **Shart (condition)** — \`true\`/\`false\` beradigan ifoda
- **Tarmoq (branch)** — shartga qarab tanlanadigan yo'l
- **Zanjir (chain)** — if/else if/else ketma-ketligi

---

## 6. 🌍 Real Hayotda Qayerda?

- **Kirish:** yosh tekshiruvi, parol tekshiruvi
- **Baholash:** ball → baho
- **Chegirma:** mijoz turiga qarab narx

---

## 7. 🎙 Intervyu Savollari

**1. \`=\` va \`===\` ni if ichida aralashtirsak nima bo'ladi?**
**Javob:** \`if (x = 5)\` har doim true (saqlash muvaffaqiyatli) — klassik xato.

**2. else if zanjirida nechta blok ishlaydi?**
**Javob:** Bittasi — birinchi true topilishi bilan qolganlari o'tkaziladi.

**3. Qavslar majburmi?**
**Javob:** Bir qatorda shart emas, lekin har doim qo'yish tavsiya qilinadi.

---

## 8. ✅ Xulosa

- **if** — agar, **else if** — yoki agar, **else** — aks holda
- **Faqat bitta blok** ishlaydi (birinchi true)
- **\`===\`** ishlating, \`;\` ni if dan keyin qo'ymang!
- **Keyingi qadam:** 1.16-darsda ko'p variantli tanlov — switch
`,
  exercises: [
    {
      id: 1,
      title: "Voyaga yetgan",
      instruction: "`checkAge(yosh)` funksiyasi 18+ bo'lsa `\"Kirish mumkin\"`, aks holda `\"Kirish taqiqlangan\"` qaytarsin.",
      startingCode: "function checkAge(yosh) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (yosh >= 18) return \"Kirish mumkin\"; return \"Kirish taqiqlangan\";",
      test: "const fn = new Function(code + '; return checkAge;')();\nif (fn(20) === 'Kirish mumkin' && fn(15) === 'Kirish taqiqlangan') return null;\nreturn 'if/else ishlating';"
    },
    {
      id: 2,
      title: "Juft yoki toq",
      instruction: "`evenOrOdd(son)` funksiyasi juft bo'lsa `\"Juft\"`, toq bo'lsa `\"Toq\"` qaytarsin.",
      startingCode: "function evenOrOdd(son) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (son % 2 === 0) return \"Juft\"; return \"Toq\";",
      test: "const fn = new Function(code + '; return evenOrOdd;')();\nif (fn(4) === 'Juft' && fn(7) === 'Toq') return null;\nreturn '% bilan tekshiring';"
    },
    {
      id: 3,
      title: "Baho qo'yish",
      instruction: "`grade(ball)` funksiyasi: 90+ => `\"A'lo\"`, 70+ => `\"Yaxshi\"`, 60+ => `\"Qoniqarli\"`, aks holda `\"Qoniqarsiz\"` qaytarsin.",
      startingCode: "function grade(ball) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (ball >= 90) return \"A'lo\"; else if (ball >= 70) ...",
      test: "const fn = new Function(code + '; return grade;')();\nif (fn(95) === \"A'lo\" && fn(75) === 'Yaxshi' && fn(65) === 'Qoniqarli' && fn(40) === 'Qoniqarsiz') return null;\nreturn 'Zanjir noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Musbatmi?",
      instruction: "`sign(son)` funksiyasi: musbat => `\"Musbat\"`, manfiy => `\"Manfiy\"`, nol => `\"Nol\"` qaytarsin.",
      startingCode: "function sign(son) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (son > 0) return \"Musbat\"; else if (son < 0) ...",
      test: "const fn = new Function(code + '; return sign;')();\nif (fn(5) === 'Musbat' && fn(-3) === 'Manfiy' && fn(0) === 'Nol') return null;\nreturn 'Uchala holatni qamrang';"
    },
    {
      id: 5,
      title: "Parol tekshiruvi",
      instruction: "`login(parol)` funksiyasi parol `\"1234\"` ga QAT'IY teng bo'lsa `\"Xush kelibsiz\"`, aks holda `\"Xato parol\"` qaytarsin.",
      startingCode: "function login(parol) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "if (parol === \"1234\") return \"Xush kelibsiz\"; return \"Xato parol\";",
      test: "const fn = new Function(code + '; return login;')();\nif (fn(\"1234\") === 'Xush kelibsiz' && fn(\"0000\") === 'Xato parol' && fn(1234) === 'Xato parol') return null;\nreturn '=== ishlating!';"
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "Zanjirda ikkita shart true bo'lsa nechtasi ishlaydi?",
      options: [
        "Ikkisi ham",
        "Faqat birinchisi",
        "Hech biri",
        "Oxirgisi"
      ],
      correctAnswer: 1,
      explanation: "Birinchi true topilishi bilan qolganlari o'tkaziladi."
    },
    {
      id: 2,
      question: "`if (yosh = 18)` dagi xato nima?",
      options: [
        "Xato yo'q",
        "= saqlash — har doim true, === kerak",
        "18 noto'g'ri son",
        "yosh e'lon qilinmagan"
      ],
      correctAnswer: 1,
      explanation: "Bitta = solishtirmaydi, saqlaydi!"
    },
    {
      id: 3,
      question: "`if (x > 5); { console.log(\"ok\"); }` — nuqta-vergul muammosi?",
      options: [
        "Muammo yo'q",
        "Blok har doim ishlaydi — ; shartni tugatadi",
        "Xatolik beradi",
        "Hech narsa chiqmaydi"
      ],
      correctAnswer: 1,
      explanation: "if dan keyin ; qo'ymang!"
    },
    {
      id: 4,
      question: "Qavslar bir qatorli if da majburmi?",
      options: [
        "Ha, har doim",
        "Yo'q, lekin qo'yish tavsiya qilinadi",
        "Faqat else da",
        "Hech qachon kerak emas"
      ],
      correctAnswer: 1,
      explanation: "Xavfsiz odat — har doim qavs."
    },
    {
      id: 5,
      question: "`else` qachon ishlaydi?",
      options: [
        "Har doim",
        "Hamma if/else if false bo'lganda",
        "Hech qachon",
        "Faqat xato bo'lganda"
      ],
      correctAnswer: 1,
      explanation: "else — oxirgi chorа, \"aks holda\"."
    }
  ]

};
