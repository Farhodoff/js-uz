export const sqlDataTypes = {
  id: "sqlDataTypes",
  title: "Ma'lumot Turlari (Data Types)",
  language: "sql",
  dbSetup: "CREATE TABLE mahsulotlar (id INT, nom VARCHAR(50), tavsif TEXT, mavjud BOOLEAN, sana DATE, narx DECIMAL(10,2)); INSERT INTO mahsulotlar VALUES (1,'Olma','qizil olma',true,'2024-01-15',99.99);",
  theory: `## 1. Bu nima?

Tasavvur qiling, omborda qutilar bor. Har bir qutida yozuv bor: "Bu qutiga faqat kitob solinadi", "Bu qutiga faqat sharbat". Yozuv noto'g'ri solishni oldini oladi.

Dasturlashda ustun turi xuddi shu yozuv. Har ustunga qanday qiymat turishi oldindan aytiladi.

Ma'lumot turi — ustunda qanday qiymat saqlanishini belgilaydigan qoidadir. Asosiylari: \`INT\` (butun son), \`VARCHAR\` (matn), \`TEXT\` (uzun matn), \`BOOLEAN\` (mantiqiy), \`DATE\` (sana), \`DECIMAL\` (kasr son).

---

## 2. Nega kerak?

Mahsulot narxi matn sifatida saqlansa:

\`\`\`sql
CREATE TABLE xato (narx STRING);
\`\`\`

Keyin narxlarni qo'shib bo'lmaydi. Yig'indi o'rniga matn ulanadi.

Muammo shunda: noto'g'ri tur — noto'g'ri natija. Yechim — boshidan to'g'ri tur tanlash:

\`\`\`sql
CREATE TABLE mahsulotlar (id INT, nom VARCHAR(50), narx DECIMAL(10,2));
\`\`\`

Har ustun o'z turida. Hisob-kitob to'g'ri ishlaydi.

---

## 3. Birinchi misol

Bu kod har xil turdagi ustunlar bilan jadval yaratadi.

\`\`\`sql
CREATE TABLE mahsulotlar (id INT, nom VARCHAR(50), tavsif TEXT, mavjud BOOLEAN, sana DATE, narx DECIMAL(10,2));
INSERT INTO mahsulotlar VALUES (1, 'Olma', 'qizil olma', true, '2024-01-15', 99.99);
SELECT * FROM mahsulotlar;
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"nom":"Olma","tavsif":"qizil olma","mavjud":true,"sana":"2024-01-15","narx":99.99}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`id INT\` — butun son ustuni. Raqamlash uchun.
- \`nom VARCHAR(50)\` — matn ustuni. Qavsda eng uzunlik: 50 belgi.
- \`tavsif TEXT\` — uzun matn ustuni. Uzunlik chegarasiz.
- \`mavjud BOOLEAN\` — mantiqiy ustun. Faqat rost/yolg'on.
- \`sana DATE\` — sana ustuni. Yil-oy-kun formatida.
- \`narx DECIMAL(10,2)\` — kasr son ustuni. Pul uchun.

---

## 5. Yana bitta misol

Bu kod turlar bo'yicha qiymatlarni o'qiydi.

\`\`\`sql
SELECT nom, narx FROM mahsulotlar;
SELECT mavjud FROM mahsulotlar;
\`\`\`

\`\`\`text
// Natija:
[{"nom":"Olma","narx":99.99}]
[{"mavjud":true}]
\`\`\`

Qator-baqator tahlil:
- Birinchi so'rov ikkita ustunni o'qiydi.
- Ikkinchi so'rov mantiqiy ustunni o'qiydi.
- Ustun nomi xato yozilsa, baza xato beradi. Aniq yozish kerak.

---

## 6. Ko'p uchraydigan xatolar

### 1. Vergulni unutish
❌ Xato kod:
\`\`\`sql
CREATE TABLE t (id INT nom VARCHAR(50));
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Ustunlar vergul bilan ajratiladi.
✅ To'g'ri variant:
\`\`\`sql
CREATE TABLE t (id INT, nom VARCHAR(50));
\`\`\`

### 2. Matnga son yozish
❌ Xato tushuncha:
\`\`\`sql
INSERT INTO mahsulotlar VALUES (2, 123, 'x', true, '2024-01-15', 10.5);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin \`nom\` ustuniga son yozildi. Keyin matn amallari kutilmagan ishlaydi. Har ustunga o'z turidagi qiymat yoziladi.
✅ To'g'ri variant:
\`\`\`sql
INSERT INTO mahsulotlar VALUES (2, 'Nok', 'yashil nok', true, '2024-01-15', 10.5);
\`\`\`

### 3. Sana formati
❌ Xato kod:
\`\`\`sql
INSERT INTO mahsulotlar VALUES (3, 'Anor', 'qizil', true, '15.01.2024', 50.0);
\`\`\`
Nima bo'ladi: sana noto'g'ri saqlanishi mumkin. Standart format: \`'2024-01-15'\` (yil-oy-kun).
✅ To'g'ri variant:
\`\`\`sql
INSERT INTO mahsulotlar VALUES (3, 'Anor', 'qizil', true, '2024-01-15', 50.0);
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`kitoblar\` jadvalini yarating (\`id INT, nom VARCHAR(50)\`). Bitta qator yozing. O'qing.

### 2-mashq (O'rtacha)
\`mahsulotlar\` ga ikkinchi qator yozing (\`2, 'Nok', 'yashil nok', true, '2024-02-01', 10.5\`). Hammasini o'qing (2 qator chiqishi kerak).

### 3-mashq (Chegara holat)
Ustunlar orasiga vergul qo'yishni unutmang. Quyidagi xatoni tuzating: \`CREATE TABLE t (id INT nom VARCHAR(50));\`

### Javoblar:
1.
\`\`\`sql
CREATE TABLE kitoblar (id INT, nom VARCHAR(50));
INSERT INTO kitoblar VALUES (1, 'Alifbo');
SELECT * FROM kitoblar;
\`\`\`
2.
\`\`\`sql
INSERT INTO mahsulotlar VALUES (2, 'Nok', 'yashil nok', true, '2024-02-01', 10.5);
SELECT * FROM mahsulotlar;
\`\`\`
3.
\`\`\`sql
CREATE TABLE t (id INT, nom VARCHAR(50));
\`\`\`

---

## 8. Xulosa

1. Har ustunning turi bo'ladi: \`INT\`, \`VARCHAR\`, \`TEXT\`, \`BOOLEAN\`, \`DATE\`, \`DECIMAL\`.
2. Qiymat ustun turiga mos yoziladi. Sana \`'2024-01-15'\` formatida.
3. Ustunlar vergul bilan ajratiladi. Vergul tushib qolsa parse xatoligi beradi.

Keyingi darsda: qoidalar bilan himoyalash (cheklovlar) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Kitoblar jadvali",
      instruction: "`kitoblar` jadvalini yarating (id INT, nom VARCHAR(50)). Bitta qator yozing (1, 'Alifbo'). O'qing.",
      startingCode: "CREATE TABLE kitoblar (id INT, nom VARCHAR(50));",
      hint: "INSERT INTO kitoblar VALUES (1, 'Alifbo');\nSELECT * FROM kitoblar;",
      solution: "CREATE TABLE kitoblar (id INT, nom STRING); INSERT INTO kitoblar VALUES (1, 'Alifbo'); SELECT * FROM kitoblar;",
      test: "const rows = result.filter(r => r.nom === 'Alifbo');\nif (rows.length !== 1) return 'Alifbo qatori chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Ikkinchi mahsulot",
      instruction: "`mahsulotlar` ga ikkinchi qator yozing (2, 'Nok', 'yashil nok', true, '2024-02-01', 10.5). Hammasini o'qing (2 qator).",
      startingCode: "SELECT * FROM mahsulotlar;",
      hint: "INSERT INTO mahsulotlar VALUES (2, 'Nok', 'yashil nok', true, '2024-02-01', 10.5);",
      solution: "INSERT INTO mahsulotlar VALUES (2, 'Nok', 'yashil nok', true, '2024-02-01', 10.5); SELECT * FROM mahsulotlar;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Vergul qo'shish",
      instruction: "Quyidagi xatoni tuzating: ustunlar orasiga vergul qo'ying.",
      startingCode: "CREATE TABLE t (id INT nom VARCHAR(50));",
      hint: "CREATE TABLE t (id INT, nom VARCHAR(50));",
      solution: "CREATE TABLE t (id INT, nom VARCHAR(50)); SELECT * FROM mahsulotlar;",
      test: "if (result.length < 1) return 'So rov ishlashi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Mantiqiy ustun",
      instruction: "`mahsulotlar` dan mavjudligi rost bo'lganlarni sanang (COUNT). Natija 1 bo'lishi kerak.",
      startingCode: "SELECT COUNT(*) AS soni FROM mahsulotlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT COUNT(*) AS soni FROM mahsulotlar;",
      test: "if (result[0].soni !== 1) return 'Natija 1 bolishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Sana ustuni",
      instruction: "`mahsulotlar` dan sana ustunini o'qing. '2024-01-15' chiqishi kerak.",
      startingCode: "SELECT sana FROM mahsulotlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT sana FROM mahsulotlar;",
      test: "if (result[0].sana !== '2024-01-15') return 'Sana chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Narx ustuni (chegara)",
      instruction: "`mahsulotlar` dan narx ustunini o'qing. 99.99 chiqishi kerak.",
      startingCode: "SELECT narx FROM mahsulotlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT narx FROM mahsulotlar;",
      test: "if (result[0].narx !== 99.99) return '99.99 chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Matn uzunligi (chegara)",
      instruction: "`kitoblar` ga uzun nomli qator yozing (2, 'Ona tilim'). O'qing.",
      startingCode: "CREATE TABLE kitoblar (id INT, nom VARCHAR(50));",
      hint: "INSERT INTO kitoblar VALUES (2, 'Ona tilim');\nSELECT * FROM kitoblar;",
      solution: "CREATE TABLE kitoblar (id INT, nom VARCHAR(50)); INSERT INTO kitoblar VALUES (2, 'Ona tilim'); SELECT * FROM kitoblar;",
      test: "if (result.length !== 1) return '1 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Tavsif ustuni (chegara)",
      instruction: "`mahsulotlar` dan tavsif ustunini o'qing. 'qizil olma' chiqishi kerak.",
      startingCode: "SELECT tavsif FROM mahsulotlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT tavsif FROM mahsulotlar;",
      test: "if (result[0].tavsif !== 'qizil olma') return 'Tavsif chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Mavjudlik filtri (chegara)",
      instruction: "`mahsulotlar` dan mavjud bo'lganlarni toping (mavjud = true). 1 qator chiqishi kerak.",
      startingCode: "SELECT * FROM mahsulotlar WHERE mavjud = true;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM mahsulotlar WHERE mavjud = true;",
      test: "if (result.length !== 1) return '1 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq jadval (chegara)",
      instruction: "Yangi `mevalar` jadvali yarating (id INT, nom VARCHAR(50), narx DECIMAL(10,2)). 2 qator yozing. Hammasini o'qing.",
      startingCode: "CREATE TABLE mevalar (id INT, nom VARCHAR(50), narx DECIMAL(10,2));",
      hint: "INSERT INTO mevalar VALUES (1, 'Olma', 5.5);\nINSERT INTO mevalar VALUES (2, 'Nok', 7.25);\nSELECT * FROM mevalar;",
      solution: "CREATE TABLE mevalar (id INT, nom VARCHAR(50), narx DECIMAL(10,2)); INSERT INTO mevalar VALUES (1, 'Olma', 5.5); INSERT INTO mevalar VALUES (2, 'Nok', 7.25); SELECT * FROM mevalar;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Butun sonlar uchun qaysi tur ishlatiladi?",
      options: ["VARCHAR", "INT", "TEXT", "BOOLEAN"],
      correctAnswer: 1,
      explanation: "INT — butun son ustuni."
    },
    {
      id: 2,
      question: "Qisqa matnlar uchun qaysi tur ishlatiladi?",
      options: ["INT", "VARCHAR", "DATE", "BOOLEAN"],
      correctAnswer: 1,
      explanation: "VARCHAR — uzunligi ko'rsatilgan matn."
    },
    {
      id: 3,
      question: "Uzun matnlar uchun qaysi tur ishlatiladi?",
      options: ["VARCHAR", "TEXT", "INT", "DATE"],
      correctAnswer: 1,
      explanation: "TEXT — chegarasiz uzun matn."
    },
    {
      id: 4,
      question: "Rost/yolg'on uchun qaysi tur ishlatiladi?",
      options: ["INT", "BOOLEAN", "VARCHAR", "DECIMAL"],
      correctAnswer: 1,
      explanation: "BOOLEAN — mantiqiy tur."
    },
    {
      id: 5,
      question: "Sana uchun qaysi tur ishlatiladi?",
      options: ["STRING", "DATE", "INT", "TEXT"],
      correctAnswer: 1,
      explanation: "DATE — yil-oy-kun formatida."
    },
    {
      id: 6,
      question: "Pul uchun qaysi tur ishlatiladi?",
      options: ["INT", "DECIMAL", "VARCHAR", "BOOLEAN"],
      correctAnswer: 1,
      explanation: "DECIMAL — kasr sonlar uchun."
    },
    {
      id: 7,
      question: "`CREATE TABLE t (id INT nom VARCHAR(50));` qatorida nima bo'ladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh yaratadi", "Ogohlantirish beradi"],
      correctAnswer: 1,
      explanation: "Ustunlar vergul bilan ajratiladi."
    },
    {
      id: 8,
      question: "Sana qanday formatda yoziladi?",
      options: ["15.01.2024", "2024-01-15", "15/01/2024", "Farqi yo'q"],
      correctAnswer: 1,
      explanation: "Standart: yil-oy-kun."
    },
    {
      id: 9,
      question: "`VARCHAR(50)` dagi 50 nimani bildiradi?",
      options: ["Ustun raqamini", "Eng uzunlikni", "Qator sonini", "Hech narsani"],
      correctAnswer: 1,
      explanation: "50 belgidan uzun matn kirmaydi (odatda)."
    },
    {
      id: 10,
      question: "Noto'g'ri tur tanlansa nima bo'ladi?",
      options: ["Hech narsa bo'lmaydi", "Hisob-kitob xato ishlaydi", "Jadval o'chadi", "Baza to'xtaydi"],
      correctAnswer: 1,
      explanation: "Matndagi narxni qo'shib bo'lmaydi."
    },
    {
      id: 11,
      question: "`mavjud BOOLEAN` ustuniga qanday qiymat yoziladi?",
      options: ["0/1", "true/false", "ha/yo'q", "iboralar"],
      correctAnswer: 1,
      explanation: "BOOLEAN — rost yoki yolg'on."
    },
    {
      id: 12,
      question: "Qaysi juftlik to'g'ri?",
      options: ["id INT, nom INT", "id INT, nom VARCHAR(50)", "id VARCHAR, nom INT", "id DATE, nom BOOLEAN"],
      correctAnswer: 1,
      explanation: "Raqam — INT, matn — VARCHAR."
    }
  ]
};
