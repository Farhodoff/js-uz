export const sqlModifications = {
  id: "sqlModifications",
  title: "UPDATE va DELETE (O'zgartirish)",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT, city STRING); INSERT INTO users VALUES (1,'Ali',25,'Toshkent'),(2,'Vali',17,'Samarqand'),(3,'Guli',30,'Toshkent');",
  theory: `## 1. Bu nima?

Tasavvur qiling, sinf ro'yxati doskasida yozilgan. Ali ko'chib ketdi — uning shahrini o'chirish kerak. Vali 18 ga to'ldi — yoshini yangilash kerak. Ba'zida o'quvchi butunlay ketadi — qatorini o'chirish kerak.

Dasturlashda mavjud qatorni o'zgartirish uchun ikkita buyruq bor.

UPDATE — qator qiymatini yangilaydi. DELETE — qatorni o'chiradi.

---

## 2. Nega kerak?

Vali 18 ga to'ldi. Bazada hali 17 yozilgan. Eski ma'lumot bilan ishlash xato qarorlarga olib keladi.

Muammo shunda: mavjud qatorni yangilash kerak, qayta yozmasdan. Yechim — \`UPDATE\`:

\`\`\`sql
UPDATE users SET age = 18 WHERE name = 'Vali';
SELECT * FROM users;
\`\`\`

Faqat Vali o'zgardi. Qolgani joyida.

---

## 3. Birinchi misol

Bu kod bitta qatorni yangilaydi.

\`\`\`sql
UPDATE users SET age = 18 WHERE name = 'Vali'; -- Yangilandi
SELECT * FROM users; -- Tekshirildi
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"name":"Ali","age":25,"city":"Toshkent"},{"id":2,"name":"Vali","age":18,"city":"Samarqand"},{"id":3,"name":"Guli","age":30,"city":"Toshkent"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`UPDATE users\` — qaysi jadval o'zgaradi.
- \`SET age = 18\` — nima yangilanadi. Yangi qiymat yoziladi.
- \`WHERE name = 'Vali'\` — qaysi qator. Faqat Vali o'zgaradi.
- \`SELECT *\` — natija tekshirildi. Vali endi 18.

---

## 5. Yana bitta misol

Bu kod bitta qatorni o'chiradi.

\`\`\`sql
DELETE FROM users WHERE name = 'Vali'; -- O'chirildi
SELECT * FROM users; -- Qolganlar o'qildi
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"name":"Ali","age":25,"city":"Toshkent"},{"id":3,"name":"Guli","age":30,"city":"Toshkent"}]
\`\`\`

Qator-baqator tahlil:
- \`DELETE FROM users\` — qayerdan o'chiriladi.
- \`WHERE name = 'Vali'\` — qaysi qator. Faqat Vali ketadi.
- Natijada ikkita qator qoldi.

---

## 5.1. Shartsiz xavf

Eng xavfli xato — shartsiz yozish:

\`\`\`sql
UPDATE users SET age = 0;
SELECT * FROM users;
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"name":"Ali","age":0,"city":"Toshkent"},{"id":2,"name":"Vali","age":0,"city":"Samarqand"},{"id":3,"name":"Guli","age":0,"city":"Toshkent"}]
\`\`\`

Qator-baqator tahlil:
- \`WHERE\` yo'q. Shuning uchun HAMMA qator o'zgardi.
- Uchala yosh ham 0 bo'ldi. Qaytarib bo'lmaydi.

---

## 6. Ko'p uchraydigan xatolar

### 1. WHERE ni unutish
❌ Xato kod:
\`\`\`sql
UPDATE users SET age = 0;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin hamma qator o'zgaradi. Bitta o'rniga uchala yosh 0 bo'ladi. Bu eng xavfli xato.
✅ To'g'ri variant:
\`\`\`sql
UPDATE users SET age = 18 WHERE name = 'Vali';
\`\`\`

### 2. Shartsiz o'chirish
❌ Xato kod:
\`\`\`sql
DELETE FROM users;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin hamma qator o'chadi. Jadval bo'sh qoladi.
✅ To'g'ri variant:
\`\`\`sql
DELETE FROM users WHERE name = 'Vali';
\`\`\`

### 3. Tenglik uchun bitta = yozish
❌ Xato kod:
\`\`\`sql
UPDATE users SET age == 18 WHERE name = 'Vali';
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. \`SET\` da qiymat beriladi — bitta \`=\` yoziladi. Ikkita \`==\` faqat solishtirishda ishlaydi.
✅ To'g'ri variant:
\`\`\`sql
UPDATE users SET age = 18 WHERE name = 'Vali';
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Vali yoshini \`18\` ga yangilang. Tekshirib chiqing (Vali 18 bo'lishi kerak).

### 2-mashq (O'rtacha)
Valini o'chiring. Qolgan ikkitasini o'qing (Ali va Guli chiqishi kerak).

### 3-mashq (Chegara holat)
Shartsiz yangilash oqibatini ko'ring: hamma yosh \`0\` bo'lishini tasdiqlang.

### Javoblar:
1.
\`\`\`sql
UPDATE users SET age = 18 WHERE name = 'Vali';
SELECT * FROM users;
\`\`\`
2.
\`\`\`sql
DELETE FROM users WHERE name = 'Vali';
SELECT * FROM users;
\`\`\`
3.
\`\`\`sql
UPDATE users SET age = 0;
SELECT * FROM users;
\`\`\`

---

## 8. Xulosa

1. \`UPDATE\` — qiymatni yangilaydi. \`DELETE\` — qatorni o'chiradi.
2. Ikkalasida ham \`WHERE\` shart. Shartsiz yozilsa, hamma qator o'zgaradi.
3. \`SET\` da bitta \`=\` yoziladi. Ikkita \`==\` xato beradi.

Keyingi darsda: jadvallarni birlashtiradigan JOIN bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Yosh yangilash",
      instruction: "users jadvalidan (id, name, age, city) Vali yoshini 18 ga yangilang. Tekshirib chiqing.",
      startingCode: "UPDATE users SET age = 18 WHERE name = 'Vali';",
      hint: "SELECT * FROM users;",
      solution: "UPDATE users SET age = 18 WHERE name = 'Vali'; SELECT * FROM users;",
      test: "if (!/\\bUPDATE\\b/i.test(code)) return 'UPDATE yozing';\nconst vali = result.filter(r => r.name === 'Vali');\nif (vali.length !== 1 || vali[0].age !== 18) return 'Vali 18 bolishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Qator o'chirish",
      instruction: "Valini o'chiring (DELETE). Qolgan ikkitasini o'qing (Ali va Guli).",
      startingCode: "DELETE FROM users WHERE name = 'Vali';",
      hint: "SELECT * FROM users;",
      solution: "DELETE FROM users WHERE name = 'Vali'; SELECT * FROM users;",
      test: "if (!/\\bDELETE\\b/i.test(code)) return 'DELETE yozing';\nif (result.length !== 2) return '2 qator qolishi kerak';\nif (result.some(r => r.name === 'Vali')) return 'Vali ketishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Shahar yangilash",
      instruction: "Ali shahrini 'Andijon' ga yangilang. Tekshiring.",
      startingCode: "UPDATE users SET city = 'Andijon' WHERE name = 'Ali';",
      hint: "SELECT * FROM users;",
      solution: "UPDATE users SET city = 'Andijon' WHERE name = 'Ali'; SELECT * FROM users;",
      test: "const ali = result.filter(r => r.name === 'Ali');\nif (ali.length !== 1 || ali[0].city !== 'Andijon') return 'Ali Andijonda bolishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Shartsiz xavf",
      instruction: "Ataylab shartsiz yozing: hamma yosh 0 bo'lsin. Oqibatni ko'ring (uchala 0 chiqishi kerak).",
      startingCode: "UPDATE users SET age = 0;",
      hint: "SELECT * FROM users;",
      solution: "UPDATE users SET age = 0; SELECT * FROM users;",
      test: "if (result.every(r => r.age === 0)) return null;\nreturn 'Hamma yosh 0 bolishi kerak';"
    },
    {
      id: 5,
      title: "5-Topshiriq: == xatosi",
      instruction: "`SET age == 18` dagi ikkita tenglikni bittaga tuzating.",
      startingCode: "UPDATE users SET age == 18 WHERE name = 'Vali';",
      hint: "UPDATE users SET age = 18 WHERE name = 'Vali';",
      solution: "UPDATE users SET age = 18 WHERE name = 'Vali'; SELECT * FROM users;",
      test: "if (/==/.test(code)) return 'Bitta = yozing';\nconst vali = result.filter(r => r.name === 'Vali');\nif (vali.length !== 1 || vali[0].age !== 18) return 'Vali 18 bolishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Gulini o'chirish (chegara)",
      instruction: "Gulini o'chiring. Qolgan ikkitasini o'qing.",
      startingCode: "DELETE FROM users WHERE name = 'Guli';",
      hint: "SELECT * FROM users;",
      solution: "DELETE FROM users WHERE name = 'Guli'; SELECT * FROM users;",
      test: "if (result.length !== 2) return '2 qator qolishi kerak';\nif (result.some(r => r.name === 'Guli')) return 'Guli ketishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Yosh qo'shish (chegara)",
      instruction: "Hamma yoshga 1 qo'shib bo'lmaydi (hisoblash UPDATE ichida murakkab). Bitta qatorni yangilang: Ali 26 bo'lsin.",
      startingCode: "UPDATE users SET age = 26 WHERE name = 'Ali';",
      hint: "SELECT * FROM users;",
      solution: "UPDATE users SET age = 26 WHERE name = 'Ali'; SELECT * FROM users;",
      test: "const ali = result.filter(r => r.name === 'Ali');\nif (ali.length !== 1 || ali[0].age !== 26) return 'Ali 26 bolishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Shahar o'chirish (chegara)",
      instruction: "Samarqandliklarni o'chiring (Vali ketishi kerak). Qolgan ikkitasini o'qing.",
      startingCode: "DELETE FROM users WHERE city = 'Samarqand';",
      hint: "SELECT * FROM users;",
      solution: "DELETE FROM users WHERE city = 'Samarqand'; SELECT * FROM users;",
      test: "if (result.length !== 2) return '2 qator qolishi kerak';\nif (result.some(r => r.city === 'Samarqand')) return 'Samarqandlik ketishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Yangilab o'qish (chegara)",
      instruction: "Guli yoshini 31 ga yangilang. Faqat Gulini o'qing (31 chiqishi kerak).",
      startingCode: "UPDATE users SET age = 31 WHERE name = 'Guli';",
      hint: "SELECT * FROM users WHERE name = 'Guli';",
      solution: "UPDATE users SET age = 31 WHERE name = 'Guli'; SELECT * FROM users WHERE name = 'Guli';",
      test: "if (result.length !== 1 || result[0].age !== 31) return 'Guli 31 bolishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq sikl (chegara)",
      instruction: "Yangi qator qo'shing (4, 'Hasan', 22, 'Buxoro'). Keyin uni o'chiring. Oxirida 3 qator qolishi kerak.",
      startingCode: "INSERT INTO users VALUES (4, 'Hasan', 22, 'Buxoro');",
      hint: "DELETE FROM users WHERE name = 'Hasan';\nSELECT * FROM users;",
      solution: "INSERT INTO users VALUES (4, 'Hasan', 22, 'Buxoro'); DELETE FROM users WHERE name = 'Hasan'; SELECT * FROM users;",
      test: "if (result.length !== 3) return '3 qator qolishi kerak';\nif (result.some(r => r.name === 'Hasan')) return 'Hasan ketishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`UPDATE users SET age = 18 WHERE name = 'Vali';` nimani o'zgartiradi?",
      options: ["Hamma yoshni", "Faqat Valini", "Hech kimni", "Jadvalni o'chiradi"],
      correctAnswer: 1,
      explanation: "WHERE faqat Valini tanlaydi."
    },
    {
      id: 2,
      question: "`DELETE FROM users WHERE name = 'Vali';` nimani o'chiradi?",
      options: ["Hammasini", "Faqat Valini", "Hech nimani", "Jadvalni"],
      correctAnswer: 1,
      explanation: "Shartga mos kelgan qator ketadi."
    },
    {
      id: 3,
      question: "`UPDATE users SET age = 0;` (shartsiz) nima qiladi?",
      options: ["Hech narsa qilmaydi", "Hamma yoshni 0 qiladi", "Xatolik beradi", "Bitta qatorni o'zgartiradi"],
      correctAnswer: 1,
      explanation: "Shart bo'lmasa, hamma qator o'zgaradi."
    },
    {
      id: 4,
      question: "`DELETE FROM users;` (shartsiz) nima qiladi?",
      options: ["Hech narsa qilmaydi", "Hammasini o'chiradi", "Xatolik beradi", "Bittasini o'chiradi"],
      correctAnswer: 1,
      explanation: "Shartsiz o'chirish jadvalni bo'shatadi."
    },
    {
      id: 5,
      question: "`UPDATE users SET age == 18 WHERE name = 'Vali';` qatorida nima bo'ladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "18 emas, 0 yozadi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "SET da bitta = yoziladi."
    },
    {
      id: 6,
      question: "Yangilashdan keyin tekshirish uchun nima yoziladi?",
      options: ["Hech narsa", "SELECT * FROM users;", "Yana UPDATE", "DROP TABLE"],
      correctAnswer: 1,
      explanation: "O'qib ko'rish — ishonchli usul."
    },
    {
      id: 7,
      question: "`DELETE FROM users WHERE city = 'Samarqand';` (Vali Samarqandda) kimni o'chiradi?",
      options: ["Hammani", "Valini", "Hech kimni", "Alini"],
      correctAnswer: 1,
      explanation: "Faqat shartga mos kelgani ketadi."
    },
    {
      id: 8,
      question: "O'chirilgan qatorni qaytarib bo'ladimi?",
      options: ["Ha, oson", "Yo'q (zaxira bo'lmasa)", "Faqat ertaga", "Avtomatik qaytadi"],
      correctAnswer: 1,
      explanation: "O'chirish qaytarilmas. Ehtiyot bo'lish kerak."
    },
    {
      id: 9,
      question: "`UPDATE users SET city = 'Andijon' WHERE name = 'Ali';` dan keyin Ali qayerda?",
      options: ["Toshkentda", "Andijonda", "Samarqandda", "Hech qayerda"],
      correctAnswer: 1,
      explanation: "Faqat Ali shahri yangilandi."
    },
    {
      id: 10,
      question: "Qaysi biri xavfsizroq?",
      options: ["Shartsiz UPDATE", "WHERE li UPDATE", "Ikkalasi ham", "Hech biri"],
      correctAnswer: 1,
      explanation: "Har doim shart bilan yoziladi."
    },
    {
      id: 11,
      question: "`INSERT INTO users VALUES (4, 'Hasan', 22, 'Buxoro'); DELETE FROM users WHERE name = 'Hasan'; SELECT * FROM users;` nechta qator qaytaradi?",
      options: ["4 ta", "3 ta", "2 ta", "0 ta"],
      correctAnswer: 1,
      explanation: "Qo'shildi, keyin o'chirildi. Eskisi qoldi: 3 ta."
    },
    {
      id: 12,
      question: "SET da qiymat qanday beriladi?",
      options: ["Ikki tenglik bilan", "Bitta tenglik bilan", "Nuqta-vergul bilan", "Vergul bilan"],
      correctAnswer: 1,
      explanation: "SET age = 18 — bitta =."
    }
  ]
};
