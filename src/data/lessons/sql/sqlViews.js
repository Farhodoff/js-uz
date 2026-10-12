export const sqlViews = {
  id: "sqlViews",
  title: "Saqlangan So'rovlar (VIEW)",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT, active INT); INSERT INTO users VALUES (1,'Ali',25,1),(2,'Vali',17,0),(3,'Guli',30,1),(4,'Hasan',22,0);",
  theory: `## 1. Bu nima?

Tasavvur qiling, sevimli kitoblaringiz ro'yxati muzlatgich eshigida yozilgan. Har safar butun kutubxonani qidirmaysiz. Tayyor ro'yxatga qaraysiz.

Dasturlashda VIEW (ko'rinish) xuddi shu tayyor ro'yxat. So'rov bir marta yoziladi va nom bilan saqlanadi. Keyin jadvaldek ishlatiladi.

VIEW — saqlangan SELECT so'rovdir. U jadvaldek so'raladi, lekin ma'lumotni nusxalamaydi.

---

## 2. Nega kerak?

Faol foydalanuvchilar ro'yxati har kuni kerak:

\`\`\`sql
SELECT * FROM users WHERE active = 1;
\`\`\`

Har safar uzun so'rov yoziladi. Xato qilish oson.

Muammo shunda: tez-tez kerak bo'ladigan so'rovni saqlash kerak. Yechim — VIEW:

\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;
SELECT * FROM faollar;
\`\`\`

Bir marta yozildi. Keyin qisqa nom bilan chaqiriladi.

---

## 3. Birinchi misol

Bu kod faol foydalanuvchilar ko'rinishini yaratadi va o'qiydi.

\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1; -- Saqlandi
SELECT name FROM faollar; -- O'qildi
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali"},{"name":"Guli"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`CREATE VIEW faollar AS ...\` — so'rov saqlandi. \`faollar\` endi nom. Ma'lumot nusxalanmadi.
- \`SELECT name FROM faollar;\` — ko'rinish jadvaldek so'raldi.
- Natijada faqat faollar chiqdi: Ali va Guli.

---

## 5. Yana bitta misol

Bu kod yoshlar ko'rinishini ko'rsatadi.

\`\`\`sql
CREATE VIEW yoshlar AS SELECT * FROM users WHERE age < 18; -- Saqlandi
SELECT name FROM yoshlar; -- O'qildi
\`\`\`

\`\`\`text
// Natija:
[{"name":"Vali"}]
\`\`\`

Qator-baqator tahlil:
- Faqat bitta shartli so'rov saqlandi.
- Natijada faqat Vali chiqdi.

---

## 5.1. Ko'rinishni o'chirish

Keraksiz ko'rinish o'chiriladi:

\`\`\`sql
DROP VIEW faollar; -- O'chirildi
\`\`\`

\`\`\`text
// Natija: 1
\`\`\`

Qator-baqator tahlil:
- \`DROP VIEW\` — saqlangan so'rov o'chiriladi. Asosiy jadvalga tegmaydi.
- Natija \`1\` — buyruq bajarildi degani.

---

## 6. Ko'p uchraydigan xatolar

### 1. AS ni unutish
❌ Xato kod:
\`\`\`sql
CREATE VIEW faollar SELECT * FROM users;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Nom bilan so'rov orasida har doim \`AS\` yoziladi.
✅ To'g'ri variant:
\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users;
\`\`\`

### 2. Yo'q ko'rinishni o'chirish
❌ Xato kod:
\`\`\`sql
DROP VIEW yoq;
\`\`\`
Nima bo'ladi: xatolik yuz beradi (bunday ko'rinish topilmadi). Avval borligiga ishonch hosil qilinadi.
✅ To'g'ri variant:
\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users;
DROP VIEW faollar;
\`\`\`

### 3. Bor nomni qayta ishlatish
❌ Xato kod:
\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users;
CREATE VIEW faollar AS SELECT name FROM users;
\`\`\`
Nima bo'ladi: xatolik yuz beradi (bunday nom allaqachon bor). Bir nom — bitta ko'rinish.
✅ To'g'ri variant:
\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users;
DROP VIEW faollar;
CREATE VIEW faollar AS SELECT name FROM users;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`faollar\` ko'rinishini yarating (\`active = 1\` bo'lganlar). O'qib chiqing (Ali va Guli chiqishi kerak).

### 2-mashq (O'rtacha)
\`yoshlar\` ko'rinishini yarating (\`age < 18\`). O'qib chiqing (Vali chiqishi kerak).

### 3-mashq (Chegara holat)
\`faollar\` ni yarating, o'qing, keyin o'chiring. O'chirish xato bermasligi kerak.

### Javoblar:
1.
\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;
SELECT name FROM faollar;
\`\`\`
2.
\`\`\`sql
CREATE VIEW yoshlar AS SELECT * FROM users WHERE age < 18;
SELECT name FROM yoshlar;
\`\`\`
3.
\`\`\`sql
CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;
SELECT name FROM faollar;
DROP VIEW faollar;
\`\`\`

---

## 8. Xulosa

1. VIEW — saqlangan so'rov. Jadvaldek so'raladi, ma'lumot nusxalanmaydi.
2. \`CREATE VIEW nom AS ...\` saqlaydi. \`DROP VIEW\` o'chiradi.
3. Nom yagona bo'ladi. AS tushib qolmasligi kerak.

Keyingi darsda: qidiruvni tezlashtiradigan indekslar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Faollar ko'rinishi",
      instruction: "users jadvalidan (id, name, age, active) `faollar` ko'rinishini yarating (active = 1). Ismlarni o'qing (Ali, Guli).",
      startingCode: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;",
      hint: "SELECT name FROM faollar;",
      solution: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1; SELECT name FROM faollar;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Guli'])) return 'Ali va Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Yoshlar ko'rinishi",
      instruction: "`yoshlar` ko'rinishini yarating (age < 18). O'qing (Vali chiqishi kerak).",
      startingCode: "CREATE VIEW yoshlar AS SELECT * FROM users WHERE age < 18;",
      hint: "SELECT name FROM yoshlar;",
      solution: "CREATE VIEW yoshlar AS SELECT * FROM users WHERE age < 18; SELECT name FROM yoshlar;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Vali'])) return 'Faqat Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: AS qo'shish",
      instruction: "Quyidagi xatoni tuzating: `AS` so'zi tushib qolgan.",
      startingCode: "CREATE VIEW faollar SELECT * FROM users;",
      hint: "CREATE VIEW faollar AS SELECT * FROM users;",
      solution: "CREATE VIEW faollar AS SELECT * FROM users; SELECT name FROM faollar;",
      test: "if (result.length !== 4) return '4 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: O'chirish",
      instruction: "`faollar` ni yarating, o'qing, keyin o'chiring. Xato bermasligi kerak.",
      startingCode: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;",
      hint: "SELECT name FROM faollar;\nDROP VIEW faollar;",
      solution: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1; SELECT name FROM faollar; DROP VIEW faollar;",
      test: "if (!/\\bDROP\\s+VIEW\\b/i.test(code)) return 'DROP VIEW yozing';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Kattalar (chegara)",
      instruction: "`kattalar` ko'rinishini yarating (age >= 18). Uchala ism chiqishi kerak.",
      startingCode: "CREATE VIEW kattalar AS SELECT * FROM users WHERE age >= 18;",
      hint: "SELECT name FROM kattalar;",
      solution: "CREATE VIEW kattalar AS SELECT * FROM users WHERE age >= 18; SELECT name FROM kattalar;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Bitta ustunli view (chegara)",
      instruction: "`ismlar` ko'rinishini yarating (faqat name ustuni). O'qing (4 ta ism chiqishi kerak).",
      startingCode: "CREATE VIEW ismlar AS SELECT name FROM users;",
      hint: "SELECT * FROM ismlar;",
      solution: "CREATE VIEW ismlar AS SELECT name FROM users; SELECT * FROM ismlar;",
      test: "if (result.length !== 4) return '4 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Nofaollar (chegara)",
      instruction: "`nofaollar` ko'rinishini yarating (active = 0). Vali va Hasan chiqishi kerak.",
      startingCode: "CREATE VIEW nofaollar AS SELECT * FROM users WHERE active = 0;",
      hint: "SELECT name FROM nofaollar;",
      solution: "CREATE VIEW nofaollar AS SELECT * FROM users WHERE active = 0; SELECT name FROM nofaollar;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Vali', 'Hasan'])) return 'Vali va Hasan chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Qayta yaratish (chegara)",
      instruction: "`faollar` ni yarating, o'chiring, yana yarating. Oxirida o'qing (Ali, Guli chiqishi kerak).",
      startingCode: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;",
      hint: "DROP VIEW faollar;\nCREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;\nSELECT name FROM faollar;",
      solution: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1; DROP VIEW faollar; CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1; SELECT name FROM faollar;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Guli'])) return 'Ali va Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Sanoq view orqali (chegara)",
      instruction: "`faollar` orqali nechta faol borligini sanang (COUNT). Natija 2 bo'lishi kerak.",
      startingCode: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;",
      hint: "SELECT COUNT(*) AS soni FROM faollar;",
      solution: "CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1; SELECT COUNT(*) AS soni FROM faollar;",
      test: "if (result[0].soni !== 2) return 'Natija 2 bolishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq sikl (chegara)",
      instruction: "`yoshlar` ni yarating, o'qing (Vali), o'chiring. Xato bermasligi kerak.",
      startingCode: "CREATE VIEW yoshlar AS SELECT * FROM users WHERE age < 18;",
      hint: "SELECT name FROM yoshlar;\nDROP VIEW yoshlar;",
      solution: "CREATE VIEW yoshlar AS SELECT * FROM users WHERE age < 18; SELECT name FROM yoshlar; DROP VIEW yoshlar;",
      test: "if (!/\\bDROP\\s+VIEW\\b/i.test(code)) return 'DROP VIEW yozing';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "VIEW nima?",
      options: ["Yangi jadval", "Saqlangan so'rov", "Indeks turi", "Xato turi"],
      correctAnswer: 1,
      explanation: "So'rov nom bilan saqlanadi va jadvaldek so'raladi."
    },
    {
      id: 2,
      question: "`CREATE VIEW faollar AS SELECT * FROM users WHERE active = 1;` nimani qiladi?",
      options: ["Yangi jadval yaratadi", "So'rovni faollar nomi bilan saqlaydi", "Faollarni o'chiradi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "Ma'lumot nusxalanmaydi. Faqat so'rov saqlanadi."
    },
    {
      id: 3,
      question: "`CREATE VIEW faollar SELECT * FROM users;` (AS siz) nima qiladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh saqlaydi", "Ogohlantirish beradi"],
      correctAnswer: 1,
      explanation: "Nom bilan so'rov orasida AS shart."
    },
    {
      id: 4,
      question: "`DROP VIEW yoq;` (mavjud bo'lmasa) nima qiladi?",
      options: ["Hech narsa qilmaydi", "Xatolik beradi", "Yangi yaratadi", "Hammasini o'chiradi"],
      correctAnswer: 1,
      explanation: "Yo'q nomni o'chirib bo'lmaydi."
    },
    {
      id: 5,
      question: "Bir nom bilan ikkita VIEW yaratsa bo'ladimi?",
      options: ["Ha", "Yo'q, xatolik beradi", "Ha, birlashadi", "Faqat bo'sh bo'lsa"],
      correctAnswer: 1,
      explanation: "Nom yagona bo'ladi."
    },
    {
      id: 6,
      question: "`SELECT name FROM faollar;` (faollar saqlangan) nima chiqaradi?",
      options: ["Xatolik", "Ismlar ro'yxati", "Hamma ustun", "Bo'sh natija"],
      correctAnswer: 1,
      explanation: "Ko'rinish jadvaldek so'raladi."
    },
    {
      id: 7,
      question: "VIEW asosiy jadvalni o'zgartiradimi?",
      options: ["Ha, nusxalaydi", "Yo'q, faqat so'rov saqlaydi", "Ha, o'chiradi", "Ba'zan"],
      correctAnswer: 1,
      explanation: "VIEW ma'lumot saqlamaydi. Asosiy jadval o'zgarishsiz."
    },
    {
      id: 8,
      question: "Asosiy jadvalga yangi qator qo'shilsa, VIEW nima ko'rsatadi?",
      options: ["Eskisini", "Yangilanganini", "Xatolik beradi", "Bo'sh natija"],
      correctAnswer: 1,
      explanation: "VIEW har safar qayta hisoblanadi. Yangi qator ko'rinadi."
    },
    {
      id: 9,
      question: "`DROP VIEW faollar;` dan keyin `SELECT * FROM faollar;` nima qiladi?",
      options: ["Eski natijani beradi", "Xatolik beradi", "Bo'sh qaytaradi", "Qayta yaratadi"],
      correctAnswer: 1,
      explanation: "O'chirilgan nomdan so'rab bo'lmaydi."
    },
    {
      id: 10,
      question: "`SELECT COUNT(*) AS soni FROM faollar;` (2 faol) nima qaytaradi?",
      options: ["4", "2", "0", "Xatolik"],
      correctAnswer: 1,
      explanation: "Ko'rinish ustida agregat ham ishlaydi."
    },
    {
      id: 11,
      question: "VIEW qachon foydali?",
      options: ["Bir martalik so'rovda", "Tez-tez takrorlanadigan so'rovda", "Hech qachon", "Faqat o'chirishda"],
      correctAnswer: 1,
      explanation: "Takroriy so'rov bir marta yozilib saqlanadi."
    },
    {
      id: 12,
      question: "`CREATE VIEW yoshlar AS SELECT * FROM users WHERE age < 18; SELECT name FROM yoshlar;` (Vali 17) nima chiqaradi?",
      options: ["Hammasi", "Faqat Vali", "Hech kim", "Xatolik"],
      correctAnswer: 1,
      explanation: "Faqat shartga mos kelgan saqlangan."
    }
  ]
};
