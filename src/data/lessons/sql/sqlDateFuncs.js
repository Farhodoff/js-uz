export const sqlDateFuncs = {
  id: "sqlDateFuncs",
  title: "Sana Funksiyalari",
  language: "sql",
  dbSetup: "CREATE TABLE tadbirlar (id INT, nom STRING, sana DATE); INSERT INTO tadbirlar VALUES (1,'Navruz','2024-03-21'),(2,'Mustaqillik','2024-09-01'),(3,'YangiYil','2024-01-01');",
  theory: `## 1. Bu nima?

Tasavvur qiling, devorda kalendar bor. Har bir sana uch qismdan iborat: yil, oy, kun. Ba'zan faqat yili kerak. Ba'zan faqat oyi.

Dasturlashda sana funksiyalari xuddi shu kalendar varag'i. Sanadan kerakli qismini ajratib beradi.

Sana funksiyalari — DATE qiymatidan yil, oy yoki kunni ajratadigan buyruqlardir: \`YEAR\`, \`MONTH\`, \`DAY\`.

---

## 2. Nega kerak?

Tadbirlar ro'yxati bor. Savol: "Qaysi tadbirlar bahorda?" Oyini tekshirish kerak:

\`\`\`sql
SELECT nom FROM tadbirlar WHERE MONTH(sana) = 3;
\`\`\`

Muammo shunda: sana yaxlit saqlanadi. Qismlarga ajratish kerak. Yechim — sana funksiyalari.

---

## 3. Birinchi misol

Bu kod har bir tadbirning yilini chiqaradi.

\`\`\`sql
SELECT nom, YEAR(sana) AS yil FROM tadbirlar; -- Yilni ajratish
\`\`\`

\`\`\`text
// Natija:
[{"nom":"Navruz","yil":2024},{"nom":"Mustaqillik","yil":2024},{"nom":"YangiYil","yil":2024}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`YEAR(sana)\` — sanadan faqat yil qismini oladi.
- Har qator uchun alohida hisoblanadi.
- Asosiy sana o'zgarmaydi. Faqat ko'rinish olinadi.

---

## 5. Yana bitta misol

Bu kod oy va kunni chiqaradi.

\`\`\`sql
SELECT nom, MONTH(sana) AS oy, DAY(sana) AS kun FROM tadbirlar; -- Oy va kun
\`\`\`

\`\`\`text
// Natija:
[{"nom":"Navruz","oy":3,"kun":21},{"nom":"Mustaqillik","oy":9,"kun":1},{"nom":"YangiYil","oy":1,"kun":1}]
\`\`\`

Qator-baqator tahlil:
- \`MONTH(sana)\` — oy raqamini beradi: 3, 9, 1.
- \`DAY(sana)\` — oy kunini beradi: 21, 1, 1.

---

## 5.1. Hozirgi sana

Tizim soati ham so'raladi:

\`\`\`sql
SELECT CURRENT_DATE AS bugun; -- Bugungi sana
\`\`\`

Qator-baqator tahlil:
- \`CURRENT_DATE\` — bugungi sanani beradi. Jadval shart emas.
- Natija har kuni o'zgaradi. Shuning uchun testda aniq qiymat tekshirilmaydi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`sql
SELECT YEAR sana FROM tadbirlar;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Funksiya qavssiz ishlamaydi.
✅ To'g'ri variant:
\`\`\`sql
SELECT YEAR(sana) FROM tadbirlar;
\`\`\`

### 2. Noto'g'ri format
❌ Xato kod:
\`\`\`sql
SELECT YEAR('21.03.2024') AS yil;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin natija kutilmagan bo'lishi mumkin. Sana har doim \`'2024-03-21'\` formatida yoziladi.
✅ To'g'ri variant:
\`\`\`sql
SELECT YEAR('2024-03-21') AS yil;
\`\`\`

### 3. Matndan yil olish
❌ Xato tushuncha:
\`\`\`sql
SELECT YEAR(nom) FROM tadbirlar;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin natija bo'sh chiqadi. \`YEAR\` faqat sana ustunida ishlaydi. Matndan yil ajratib bo'lmaydi.
✅ To'g'ri tushuncha: sana funksiyalari faqat DATE ustunlarda ishlaydi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
Har bir tadbirning yilini chiqaring. Uchala 2024 chiqishi kerak.

### 2-mashq (O'rtacha)
Oy va kunni chiqaring. Navruz uchun 3 va 21 chiqishi kerak.

### 3-mashq (Chegara holat)
Mart oyidagi tadbirlarni toping (faqat Navruz chiqishi kerak).

### Javoblar:
1.
\`\`\`sql
SELECT nom, YEAR(sana) AS yil FROM tadbirlar;
\`\`\`
2.
\`\`\`sql
SELECT nom, MONTH(sana) AS oy, DAY(sana) AS kun FROM tadbirlar;
\`\`\`
3.
\`\`\`sql
SELECT nom FROM tadbirlar WHERE MONTH(sana) = 3;
\`\`\`

---

## 8. Xulosa

1. Sana funksiyalari qismlarni ajratadi: \`YEAR\`, \`MONTH\`, \`DAY\`.
2. Funksiya qavs bilan chaqiriladi. Sana \`'2024-03-21'\` formatida yoziladi.
3. Faqat DATE ustunda ishlaydi. Matndan ajratib bo'lmaydi.

Keyingi darsda: jadvallar orasidagi munosabatlar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Yillar",
      instruction: "tadbirlar jadvalidan (id, nom, sana) har birining yilini chiqaring. Uchala 2024 chiqishi kerak.",
      startingCode: "SELECT nom, YEAR(sana) AS yil FROM tadbirlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom, YEAR(sana) AS yil FROM tadbirlar;",
      test: "const vals = result.map(r => r.yil);\nif (JSON.stringify(vals) !== JSON.stringify([2024, 2024, 2024])) return 'Uchala 2024 chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Oy va kun",
      instruction: "Oy va kunni chiqaring. Navruz uchun 3 va 21 chiqishi kerak.",
      startingCode: "SELECT nom, MONTH(sana) AS oy, DAY(sana) AS kun FROM tadbirlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom, MONTH(sana) AS oy, DAY(sana) AS kun FROM tadbirlar;",
      test: "if (result[0].oy !== 3 || result[0].kun !== 21) return 'Navruz uchun 3 va 21 chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Mart oyi",
      instruction: "Mart oyidagi tadbirlarni toping. Faqat Navruz chiqishi kerak.",
      startingCode: "SELECT nom FROM tadbirlar WHERE MONTH(sana) = 3;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom FROM tadbirlar WHERE MONTH(sana) = 3;",
      test: "const names = result.map(r => r.nom);\nif (JSON.stringify(names) !== JSON.stringify(['Navruz'])) return 'Faqat Navruz chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Qavs qo'shish",
      instruction: "Quyidagi xatoni tuzating: funksiya qavssiz ishlamaydi.",
      startingCode: "SELECT YEAR sana FROM tadbirlar;",
      hint: "SELECT YEAR(sana) FROM tadbirlar;",
      solution: "SELECT YEAR(sana) FROM tadbirlar;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Sentyabr (chegara)",
      instruction: "Sentyabr oyidagi tadbirlarni toping. Faqat Mustaqillik chiqishi kerak.",
      startingCode: "SELECT nom FROM tadbirlar WHERE MONTH(sana) = 9;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom FROM tadbirlar WHERE MONTH(sana) = 9;",
      test: "const names = result.map(r => r.name || r.nom);\nif (names.length !== 1) return 'Bitta tadbir chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Birinchi kun (chegara)",
      instruction: "Oyining 1-kunidagi tadbirlarni toping. Mustaqillik va YangiYil chiqishi kerak.",
      startingCode: "SELECT nom FROM tadbirlar WHERE DAY(sana) = 1;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom FROM tadbirlar WHERE DAY(sana) = 1;",
      test: "if (result.length !== 2) return '2 tadbir chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: 2024 yili (chegara)",
      instruction: "2024 yildagi tadbirlarni toping. Uchala chiqishi kerak.",
      startingCode: "SELECT nom FROM tadbirlar WHERE YEAR(sana) = 2024;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom FROM tadbirlar WHERE YEAR(sana) = 2024;",
      test: "if (result.length !== 3) return '3 tadbir chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Hozirgi sana (chegara)",
      instruction: "Bugungi sanani chiqaring (CURRENT_DATE). Bitta qator chiqishi kerak.",
      startingCode: "SELECT CURRENT_DATE AS bugun;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT CURRENT_DATE AS bugun;",
      test: "if (result.length !== 1 || !result[0].bugun) return 'Bitta sana chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Yanvar (chegara)",
      instruction: "Yanvar oyidagi tadbirlarni toping. Faqat YangiYil chiqishi kerak.",
      startingCode: "SELECT nom FROM tadbirlar WHERE MONTH(sana) = 1;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom FROM tadbirlar WHERE MONTH(sana) = 1;",
      test: "const names = result.map(r => r.nom);\nif (JSON.stringify(names) !== JSON.stringify(['YangiYil'])) return 'Faqat YangiYil chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Yil + oy (chegara)",
      instruction: "2024 yil, 9-oydagilarni toping. Faqat Mustaqillik chiqishi kerak.",
      startingCode: "SELECT nom FROM tadbirlar WHERE YEAR(sana) = 2024 AND MONTH(sana) = 9;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT nom FROM tadbirlar WHERE YEAR(sana) = 2024 AND MONTH(sana) = 9;",
      test: "const names = result.map(r => r.nom);\nif (JSON.stringify(names) !== JSON.stringify(['Mustaqillik'])) return 'Faqat Mustaqillik chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`SELECT YEAR(sana) AS yil FROM tadbirlar;` (2024-03-21) nima qaytaradi?",
      options: ["2024-03-21", "2024", "03", "21"],
      correctAnswer: 1,
      explanation: "YEAR faqat yil qismini oladi."
    },
    {
      id: 2,
      question: "`SELECT MONTH(sana) AS oy FROM tadbirlar;` (2024-09-01) nima qaytaradi?",
      options: ["2024", "9", "1", "Sentyabr"],
      correctAnswer: 1,
      explanation: "MONTH oy raqamini beradi."
    },
    {
      id: 3,
      question: "`SELECT DAY(sana) AS kun FROM tadbirlar;` (2024-03-21) nima qaytaradi?",
      options: ["3", "2024", "21", "Mart"],
      correctAnswer: 2,
      explanation: "DAY oy kunini beradi."
    },
    {
      id: 4,
      question: "`SELECT YEAR sana FROM tadbirlar;` nima qiladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh qaytaradi", "Hammasini chiqaradi"],
      correctAnswer: 1,
      explanation: "Funksiya qavssiz ishlamaydi."
    },
    {
      id: 5,
      question: "Sana qanday formatda yoziladi?",
      options: ["21.03.2024", "2024-03-21", "03/21/2024", "Farqi yo'q"],
      correctAnswer: 1,
      explanation: "Standart: yil-oy-kun."
    },
    {
      id: 6,
      question: "`SELECT YEAR(nom) FROM tadbirlar;` (nom matn) nima qiladi?",
      options: ["Yilni topadi", "Bo'sh yoki kutilmagan natija beradi", "Xatolik beradi", "Hammasini chiqaradi"],
      correctAnswer: 1,
      explanation: "Sana funksiyasi faqat DATE ustunda ishlaydi."
    },
    {
      id: 7,
      question: "Mart oyidagilarni qanday topamiz?",
      options: ["WHERE sana = 3", "WHERE MONTH(sana) = 3", "WHERE oy = 3", "WHERE 3"],
      correctAnswer: 1,
      explanation: "Oy MONTH bilan ajratiladi."
    },
    {
      id: 8,
      question: "CURRENT_DATE nimani beradi?",
      options: ["Kecha sanasini", "Bugungi sanani", "Ertangi sanani", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Tizim soatidan bugungi sana olinadi."
    },
    {
      id: 9,
      question: "`SELECT nom FROM tadbirlar WHERE DAY(sana) = 1;` (Navruz 21, Mustaqillik 1, YangiYil 1) nima chiqaradi?",
      options: ["Navruz", "Mustaqillik, YangiYil", "Hammasi", "Hech kim"],
      correctAnswer: 1,
      explanation: "Faqat kuni 1 bo'lganlar."
    },
    {
      id: 10,
      question: "`SELECT nom FROM tadbirlar WHERE YEAR(sana) = 2024 AND MONTH(sana) = 9;` nima chiqaradi?",
      options: ["Navruz", "Mustaqillik", "YangiYil", "Hammasi"],
      correctAnswer: 1,
      explanation: "Ikkala shartga faqat Mustaqillik mos keladi."
    },
    {
      id: 11,
      question: "Sana funksiyalari jadvalni o'zgartiradimi?",
      options: ["Ha", "Yo'q, faqat ko'rinish beradi", "Ba'zan", "Har doim"],
      correctAnswer: 1,
      explanation: "Asosiy sana o'zgarmaydi."
    },
    {
      id: 12,
      question: "Qaysi biri sana funksiyasi emas?",
      options: ["YEAR", "MONTH", "LENGTH", "DAY"],
      correctAnswer: 2,
      explanation: "LENGTH — matn funksiyasi."
    }
  ]
};
