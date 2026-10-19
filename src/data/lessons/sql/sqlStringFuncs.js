export const sqlStringFuncs = {
  id: "sqlStringFuncs",
  title: "Matn Funksiyalari",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, city STRING); INSERT INTO users VALUES (1,'Ali','Toshkent'),(2,'Vali','Samarqand'),(3,'Guli','Toshkent');",
  theory: `## 1. Bu nima?

Tasavvur qiling, matbaa bor. Harflar bilan ishlaydi: kattalashtiradi, kesadi, yelimlaydi. Matn ustida amallar bajaradi.

Dasturlashda matn funksiyalari xuddi shu matbaa. Qiymatni o'zgartirmasdan, yangi ko'rinish beradi.

Matn funksiyalari — satr qiymatlarni o'zgartirib, yangi matn qaytaradigan buyruqlardir: \`UPPER\`, \`LOWER\`, \`LENGTH\`, \`SUBSTRING\`, \`CONCAT\`, \`TRIM\`.

---

## 2. Nega kerak?

Ismlar har xil yozilgan: "Ali", "VALI", "guli". Qidiruvda bir xil bo'lishi kerak. Hammasini katta harfga o'tkazish kerak:

\`\`\`sql
SELECT UPPER(name) AS katta FROM users;
\`\`\`

Muammo shunda: matnni tozalash va birxillashtirish kerak. Yechim — matn funksiyalari.

---

## 3. Birinchi misol

Bu kod ismlarni katta harfga o'tkazadi.

\`\`\`sql
SELECT UPPER(name) AS katta FROM users; -- Katta harfga
\`\`\`

\`\`\`text
// Natija:
[{"katta":"ALI"},{"katta":"VALI"},{"katta":"GULI"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`UPPER(name)\` — har bir ism katta harflarga o'tkazildi.
- \`AS katta\` — natija ustuni nomlandi.
- Asosiy jadval o'zgarmadi. Faqat ko'rinish o'zgardi.

---

## 5. Yana bitta misol

Bu kod ism uzunligini hisoblaydi.

\`\`\`sql
SELECT name, LENGTH(name) AS uzun FROM users; -- Harf soni
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali","uzun":3},{"name":"Vali","uzun":4},{"name":"Guli","uzun":4}]
\`\`\`

Qator-baqator tahlil:
- \`LENGTH(name)\` — harf sonini sanadi.
- Natija son sifatida chiqdi.

---

## 5.1. Kesish va ulash

Ikkita foydali funksiya:

\`\`\`sql
SELECT SUBSTRING(name, 1, 2) AS bosh FROM users; -- Birinchi 2 harf
SELECT CONCAT(name, '!') AS salom FROM users; -- Oxiriga belgi
\`\`\`

\`\`\`text
// Natija (birinchi):
[{"bosh":"Al"},{"bosh":"Va"},{"bosh":"Gu"}]
// Natija (ikkinchi):
[{"salom":"Ali!"},{"salom":"Vali!"},{"salom":"Guli!"}]
\`\`\`

Qator-baqator tahlil:
- \`SUBSTRING(name, 1, 2)\` — 1-harfdan boshlab 2 ta harf oladi.
- \`CONCAT(name, '!')\` — ikkita matnni ulaydi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`sql
SELECT UPPER name FROM users;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Funksiya qavssiz ishlamaydi.
✅ To'g'ri variant:
\`\`\`sql
SELECT UPPER(name) FROM users;
\`\`\`

### 2. Yangi nomni shartda ishlatish
❌ Xato tushuncha:
\`\`\`sql
SELECT UPPER(name) AS katta FROM users WHERE katta = 'ALI';
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin bo'sh natija chiqadi. Yangi nom faqat natijada bor. Shart hali eski nomlarni ko'radi.
✅ To'g'ri variant:
\`\`\`sql
SELECT UPPER(name) AS katta FROM users WHERE name = 'Ali';
\`\`\`

### 3. SUBSTRING raqamlash
❌ Xato tushuncha: \`SUBSTRING(name, 0, 2)\` birinchi 2 harfni beradi deb o'ylash.
Nima bo'ladi: xato bermaydi. Lekin natija kutilmagan bo'lishi mumkin. SQL da sanoq 1 dan boshlanadi: \`SUBSTRING(name, 1, 2)\`.
✅ To'g'ri variant:
\`\`\`sql
SELECT SUBSTRING(name, 1, 2) FROM users;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Ismlarni katta harfga o'tkazing (\`UPPER\` bilan). Ustun \`katta\` bo'lsin.

### 2-mashq (O'rtacha)
Ism uzunliklarini chiqaring (\`LENGTH\` bilan). Ustun \`uzun\` bo'lsin.

### 3-mashq (Chegara holat)
Ismning birinchi 2 harfini chiqaring (\`SUBSTRING\` bilan). Ustun \`bosh\` bo'lsin.

### Javoblar:
1.
\`\`\`sql
SELECT UPPER(name) AS katta FROM users;
\`\`\`
2.
\`\`\`sql
SELECT name, LENGTH(name) AS uzun FROM users;
\`\`\`
3.
\`\`\`sql
SELECT SUBSTRING(name, 1, 2) AS bosh FROM users;
\`\`\`

---

## 8. Xulosa

1. Matn funksiyalari yangi ko'rinish beradi: \`UPPER\`, \`LOWER\`, \`LENGTH\`, \`SUBSTRING\`, \`CONCAT\`, \`TRIM\`.
2. Funksiya qavs bilan chaqiriladi. Sanoq 1 dan boshlanadi.
3. Yangi nom faqat natijada bor. Shartda ishlatilmaydi.

Keyingi darsda: sana bilan ishlaydigan funksiyalar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Katta harf",
      instruction: "users jadvalidan (id, name, city) ismlarni katta harfga o'tkazing. Ustun `katta` bo'lsin.",
      startingCode: "SELECT UPPER(name) AS katta FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT UPPER(name) AS katta FROM users;",
      test: "const vals = result.map(r => r.katta);\nif (JSON.stringify(vals) !== JSON.stringify(['ALI', 'VALI', 'GULI'])) return 'Katta harflar chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Kichik harf",
      instruction: "Ismlarni kichik harfga o'tkazing. Ustun `kichik` bo'lsin.",
      startingCode: "SELECT LOWER(name) AS kichik FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT LOWER(name) AS kichik FROM users;",
      test: "const vals = result.map(r => r.kichik);\nif (JSON.stringify(vals) !== JSON.stringify(['ali', 'vali', 'guli'])) return 'Kichik harflar chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Uzunlik",
      instruction: "Ism uzunliklarini chiqaring. Ustun `uzun` bo'lsin (3, 4, 4).",
      startingCode: "SELECT name, LENGTH(name) AS uzun FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name, LENGTH(name) AS uzun FROM users;",
      test: "const vals = result.map(r => r.uzun);\nif (JSON.stringify(vals) !== JSON.stringify([3, 4, 4])) return '3, 4, 4 chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Kesish",
      instruction: "Ismning birinchi 2 harfini chiqaring. Ustun `bosh` bo'lsin (Al, Va, Gu).",
      startingCode: "SELECT SUBSTRING(name, 1, 2) AS bosh FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT SUBSTRING(name, 1, 2) AS bosh FROM users;",
      test: "const vals = result.map(r => r.bosh);\nif (JSON.stringify(vals) !== JSON.stringify(['Al', 'Va', 'Gu'])) return 'Al, Va, Gu chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Ulash",
      instruction: "Ism oxiriga '!' qo'shing. Ustun `salom` bo'lsin.",
      startingCode: "SELECT CONCAT(name, '!') AS salom FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT CONCAT(name, '!') AS salom FROM users;",
      test: "const vals = result.map(r => r.salom);\nif (JSON.stringify(vals) !== JSON.stringify(['Ali!', 'Vali!', 'Guli!'])) return 'Undovli ismlar chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Qavs qo'shish",
      instruction: "Quyidagi xatoni tuzating: funksiya qavssiz ishlamaydi.",
      startingCode: "SELECT UPPER name FROM users;",
      hint: "SELECT UPPER(name) FROM users;",
      solution: "SELECT UPPER(name) FROM users;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Shahar katta (chegara)",
      instruction: "Shaharlarni katta harfga o'tkazing. Ustun `katta` bo'lsin.",
      startingCode: "SELECT UPPER(city) AS katta FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT UPPER(city) AS katta FROM users;",
      test: "const vals = result.map(r => r.katta);\nif (JSON.stringify(vals) !== JSON.stringify(['TOSHKENT', 'SAMARQAND', 'TOSHKENT'])) return 'Katta shaharlar chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Tozalash (chegara)",
      instruction: "Bo'sh joyli matnni tozalang: `TRIM('  Ali  ')` natijasi 'Ali' bo'lishi kerak.",
      startingCode: "SELECT TRIM('  Ali  ') AS toza;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT TRIM('  Ali  ') AS toza;",
      test: "if (result[0].toza !== 'Ali') return 'Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Almashtirish (chegara)",
      instruction: "Ismlardagi 'Ali' ni 'Vali' ga almashtiring (REPLACE bilan).",
      startingCode: "SELECT REPLACE(name, 'Ali', 'Vali') AS r FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT REPLACE(name, 'Ali', 'Vali') AS r FROM users;",
      test: "const vals = result.map(r => r.r);\nif (JSON.stringify(vals) !== JSON.stringify(['Vali', 'Vali', 'Guli'])) return 'Almashgan royxat chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Kombinatsiya (chegara)",
      instruction: "Ism uzunligi 3 dan katta bo'lganlarni katta harfda chiqaring.",
      startingCode: "SELECT UPPER(name) AS katta FROM users WHERE LENGTH(name) > 3;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT UPPER(name) AS katta FROM users WHERE LENGTH(name) > 3;",
      test: "const vals = result.map(r => r.katta);\nif (JSON.stringify(vals) !== JSON.stringify(['VALI', 'GULI'])) return 'VALI va GULI chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`SELECT UPPER(name) AS katta FROM users;` (Ali) nima qaytaradi?",
      options: ["Ali", "ALI", "ali", "Xatolik"],
      correctAnswer: 1,
      explanation: "UPPER hammasini katta harfga o'tkazadi."
    },
    {
      id: 2,
      question: "`SELECT LENGTH(name) AS uzun FROM users;` (Ali) nima qaytaradi?",
      options: ["Ali", "3", "A", "Xatolik"],
      correctAnswer: 1,
      explanation: "LENGTH harf sonini sanaydi."
    },
    {
      id: 3,
      question: "`SELECT SUBSTRING(name, 1, 2) AS bosh FROM users;` (Ali) nima qaytaradi?",
      options: ["li", "Al", "A", "Ali"],
      correctAnswer: 1,
      explanation: "1-harfdan 2 ta olinadi. Sanoq 1 dan."
    },
    {
      id: 4,
      question: "`SELECT CONCAT(name, '!') AS salom FROM users;` (Ali) nima qaytaradi?",
      options: ["Ali", "Ali!", "!Ali", "Xatolik"],
      correctAnswer: 1,
      explanation: "CONCAT ikkita matnni ulaydi."
    },
    {
      id: 5,
      question: "`SELECT UPPER name FROM users;` nima qiladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh qaytaradi", "Kichik chiqaradi"],
      correctAnswer: 1,
      explanation: "Funksiya qavssiz ishlamaydi."
    },
    {
      id: 6,
      question: "`SELECT TRIM('  Ali  ') AS toza;` nima qaytaradi?",
      options: ["'  Ali  '", "Ali", "A", "Xatolik"],
      correctAnswer: 1,
      explanation: "TRIM bosh va oxirgi bo'sh joylarni tozalaydi."
    },
    {
      id: 7,
      question: "Yangi nom (AS) shartda ishlatiladimi?",
      options: ["Ha", "Yo'q, faqat natijada", "Ba'zan", "Har doim"],
      correctAnswer: 1,
      explanation: "AS faqat natija ustunini nomlaydi."
    },
    {
      id: 8,
      question: "`SELECT REPLACE(name, 'Ali', 'Vali') AS r FROM users;` (Ali, Vali, Guli) nima qaytaradi?",
      options: ["Ali, Vali, Guli", "Vali, Vali, Guli", "Xatolik", "Bo'sh natija"],
      correctAnswer: 1,
      explanation: "Ali Vali ga almashadi. Qolgani o'zgarishsiz."
    },
    {
      id: 9,
      question: "`SELECT LOWER(name) AS kichik FROM users;` (Ali) nima qaytaradi?",
      options: ["ALI", "ali", "Ali", "Xatolik"],
      correctAnswer: 1,
      explanation: "LOWER hammasini kichik harfga o'tkazadi."
    },
    {
      id: 10,
      question: "`SELECT UPPER(name) AS katta FROM users WHERE LENGTH(name) > 3;` (Ali, Vali, Guli) nima qaytaradi?",
      options: ["ALI", "VALI, GULI", "Ali, Vali, Guli", "Xatolik"],
      correctAnswer: 1,
      explanation: "Uzunligi 3 dan kattalar: Vali, Guli. Katta harfda chiqadi."
    },
    {
      id: 11,
      question: "Matn funksiyalari jadvalni o'zgartiradimi?",
      options: ["Ha", "Yo'q, faqat ko'rinish beradi", "Ba'zan", "Har doim"],
      correctAnswer: 1,
      explanation: "Asosiy ma'lumot o'zgarmaydi."
    },
    {
      id: 12,
      question: "Qaysi biri matn funksiyasi emas?",
      options: ["UPPER", "LENGTH", "COUNT", "TRIM"],
      correctAnswer: 2,
      explanation: "COUNT — agregat funksiya."
    }
  ]
};
