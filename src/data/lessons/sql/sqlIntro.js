export const sqlIntro = {
  id: "sqlIntro",
  title: "SQL Kirish: Baza va So'rov Tili",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT, city STRING); INSERT INTO users VALUES (1,'Ali',25,'Toshkent'),(2,'Vali',17,'Samarqand'),(3,'Guli',30,'Toshkent');",
  theory: `## 1. Bu nima?

Tasavvur qiling, ulkan kutubxona bor. Millionlab kitoblar javonlarda tartib bilan turibdi. Siz kutubxonachiga aytasiz: "Menga Toshkent haqidagi kitoblarni olib kel." U borib, aynan shularni topib keladi.

Dasturlashda bu kutubxona — ma'lumotlar bazasi (database). Kutubxonachi — SQL (Structured Query Language). Siz so'rov yozasiz. Baza javob qaytaradi.

SQL — ma'lumotlar bazasidan ma'lumot olish va boshqarish uchun ishlatiladigan so'rov tilidir.

---

## 2. Nega kerak?

Saytda 10 ming foydalanuvchi bor. Bitta foydalanuvchi kerak: ismi Ali. JavaScript bilan bo'lmaydi:

\`\`\`javascript
// Hamma 10 mingtasini yuklab ol, keyin bittalab tekshir
\`\`\`

Bu 10 ming qatorni xotiraga tortadi. Sekin. Xavfli.

Muammo shunda: kerakli ma'lumotni bazaning o'zida topish kerak. Yechim — SQL so'rov:

\`\`\`sql
SELECT * FROM users WHERE name = 'Ali';
\`\`\`

Baza o'zi qidiradi. Faqat topilgani keladi. Tez va tejamli.

---

## 3. Birinchi misol

Bu kod users jadvalidagi hamma qatorni chiqaradi.

\`\`\`sql
SELECT * FROM users; -- Hamma ustun, hamma qator
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"name":"Ali","age":25,"city":"Toshkent"},{"id":2,"name":"Vali","age":17,"city":"Samarqand"},{"id":3,"name":"Guli","age":30,"city":"Toshkent"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`SELECT\` — "ol" degani. Qanday ustunlar kerakligini aytadi.
- \`*\` — "hammasi" degani. Barcha ustunlar olinadi.
- \`FROM users\` — "qayerdan" degani. users jadvalidan olinadi.
- \`;\` — so'rov oxiri. Bitta so'rov bitta nuqta-vergul bilan tugaydi.
- \`-- Hamma ustun, hamma qator\` — izoh. \`--\` dan keyingi matn ishlamaydi.

---

## 5. Yana bitta misol

Bu kod faqat ismlarni chiqaradi.

\`\`\`sql
SELECT name FROM users; -- Faqat ism ustuni
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali"},{"name":"Vali"},{"name":"Guli"}]
\`\`\`

Qator-baqator tahlil:
- \`SELECT name\` — faqat bitta ustun so'raldi. Qolganlari kelmaydi.
- Natijada har qatorda faqat \`name\` bor.

---

## 6. Ko'p uchraydigan xatolar

### 1. Kalit so'zni xato yozish
❌ Xato kod:
\`\`\`sql
SELCT * FROM users;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi (\`Parse error on line 1\`). Baza \`SELCT\` so'zini tanimaydi. Kalit so'zlar aniq yoziladi.
✅ To'g'ri variant:
\`\`\`sql
SELECT * FROM users;
\`\`\`

### 2. SELECT siz FROM yozish
❌ Xato kod:
\`\`\`sql
FROM users;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi (\`Parse error on line 1\`). So'rov har doim \`SELECT\` bilan boshlanadi. \`FROM\` yolg'iz yasholmaydi.
✅ To'g'ri variant:
\`\`\`sql
SELECT * FROM users;
\`\`\`

### 3. Kichik harfda yozish
❌ Xato tushuncha:
\`\`\`sql
select * from users;
\`\`\`
Nima bo'ladi: xato bermaydi! So'rov ishlaydi. SQL kalit so'zlari katta-kichik harfga sezgir emas. Lekin odat bo'yicha katta harfda yoziladi — kod o'qilishi uchun.
✅ To'g'ri variant:
\`\`\`sql
SELECT * FROM users; -- Katta harf odat
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
users jadvalidagi hamma qatorni chiqaring (\`SELECT * FROM users;\`). Natijada 3 qator bo'lishi kerak.

### 2-mashq (O'rtacha)
Faqat ismlarni chiqaring (\`SELECT name FROM users;\`). Natijada Ali, Vali, Guli bo'lishi kerak.

### 3-mashq (Chegara holat)
Kichik harfda yozing (\`select * from users;\`). Ishlashini tasdiqlang (3 qator chiqishi kerak).

### Javoblar:
1.
\`\`\`sql
SELECT * FROM users;
\`\`\`
2.
\`\`\`sql
SELECT name FROM users;
\`\`\`
3.
\`\`\`sql
select * from users;
\`\`\`

---

## 8. Xulosa

1. SQL — bazadan ma'lumot oladigan so'rov tili. Baza kutubxona, so'rov — buyurtma.
2. Eng oddiy so'rov: \`SELECT * FROM users;\` (hamma ustun, hamma qator).
3. Kalit so'zlar aniq yoziladi. Katta harf — odat, kichik harf ham ishlaydi.

Keyingi darsda: jadval yaratadigan \`CREATE TABLE\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Hamma qator",
      instruction: "users jadvalidagi (id, name, age, city) hamma qatorni chiqaring. 3 qator chiqishi kerak.",
      startingCode: "SELECT id FROM users;",
      hint: "SELECT * FROM users;",
      solution: "SELECT * FROM users;",
      test: "if (!/\\bSELECT\\b/i.test(code)) return 'SELECT yozing';\nif (!code.includes('*')) return '* belgisi kerak (hamma ustun)';\nif (result.length !== 3) return '3 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Faqat ismlar",
      instruction: "users jadvalidan faqat name ustunini chiqaring. Ali, Vali, Guli chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT name FROM users;",
      solution: "SELECT name FROM users;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Vali', 'Guli'])) return 'Ali, Vali, Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Faqat yoshlar",
      instruction: "users jadvalidan faqat age ustunini chiqaring. 25, 17, 30 chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT age FROM users;",
      solution: "SELECT age FROM users;",
      test: "const ages = result.map(r => r.age);\nif (JSON.stringify(ages) !== JSON.stringify([25, 17, 30])) return '25, 17, 30 chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Faqat shaharlar",
      instruction: "users jadvalidan faqat city ustunini chiqaring.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT city FROM users;",
      solution: "SELECT city FROM users;",
      test: "const cities = result.map(r => r.city);\nif (JSON.stringify(cities) !== JSON.stringify(['Toshkent', 'Samarqand', 'Toshkent'])) return 'Shaharlar chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Faqat id lar",
      instruction: "users jadvalidan faqat id ustunini chiqaring. 1, 2, 3 chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT id FROM users;",
      solution: "SELECT id FROM users;",
      test: "const ids = result.map(r => r.id);\nif (JSON.stringify(ids) !== JSON.stringify([1, 2, 3])) return '1, 2, 3 chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Ism va yosh",
      instruction: "users jadvalidan name va age ustunlarini chiqaring.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT name, age FROM users;",
      solution: "SELECT name, age FROM users;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nif (!('name' in result[0] && 'age' in result[0])) return 'name va age ustunlari kerak';\nif ('city' in result[0]) return 'city chiqmasligi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Yosh va shahar",
      instruction: "users jadvalidan age va city ustunlarini chiqaring.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT age, city FROM users;",
      solution: "SELECT age, city FROM users;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nif (!('age' in result[0] && 'city' in result[0])) return 'age va city ustunlari kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Id va ism",
      instruction: "users jadvalidan id va name ustunlarini chiqaring.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT id, name FROM users;",
      solution: "SELECT id, name FROM users;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nif (!('id' in result[0] && 'name' in result[0])) return 'id va name ustunlari kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Uchta ustun",
      instruction: "users jadvalidan name, age va city ustunlarini chiqaring (id chiqmasligi kerak).",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT name, age, city FROM users;",
      solution: "SELECT name, age, city FROM users;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nif ('id' in result[0]) return 'id chiqmasligi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Kichik harf",
      instruction: "So'rovni kichik harfda yozing (select * from users;). 3 qator chiqishi kerak.",
      startingCode: "SELECT id FROM users;",
      hint: "select * from users;",
      solution: "select * from users;",
      test: "if (code !== code.toLowerCase()) return 'Hamma harf kichik bolsin';\nif (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL so'zining kengaytmasi nima?",
      options: ["Structured Query Language", "Standard Query Logic", "System Question Language", "Strong Query Language"],
      correctAnswer: 0,
      explanation: "SQL 'Structured Query Language' ning qisqartmasi hisoblanadi."
    },
    {
      id: 2,
      question: "SQL nima uchun ishlatiladi?",
      options: ["Faqat veb sayt yaratish uchun", "Ma'lumotlar bazasi bilan aloqa qilish uchun", "Dasturni bezash uchun", "Video tahrirlash uchun"],
      correctAnswer: 1,
      explanation: "SQL ma'lumotlar bazasini boshqarish va unga so'rov yuborish uchun ishlatiladi."
    },
    {
      id: 3,
      question: "RDBMS nima?",
      options: ["Realtime Database System", "Relational Database Management System", "Right Database System", "Redundant Database Management"],
      correctAnswer: 1,
      explanation: "RDBMS - Relational Database Management System, ya'ni relatsion bazalarni boshqarish tizimi."
    },
    {
      id: 4,
      question: "Ma'lumotlar bazasini nima bilan taqqosladik?",
      options: ["Do'kon", "Tartibli kutubxona", "Maktab", "Shifoxona"],
      correctAnswer: 1,
      explanation: "Baza — tartibli kutubxona. SQL — kutubxonachi."
    },
    {
      id: 5,
      question: "Nega ma'lumotni JavaScript'da emas, bazada filtrlash kerak?",
      options: ["JS buni uddalay olmaydi", "Hamma ma'lumotni xotiraga tortish halokatli bo'lishi mumkin", "SQL qisqaroq yoziladi", "JS sekin til"],
      correctAnswer: 1,
      explanation: "Katta bazadan hammasini olib kelish xotirani to'ldirib, dasturni qulatishi mumkin."
    },
    {
      id: 6,
      question: "`SELECT * FROM users;` da `*` nimani bildiradi?",
      options: ["Faqat birinchi ustun", "Hamma ustun", "Hech narsa", "Xatolik"],
      correctAnswer: 1,
      explanation: "* — hamma ustun degani."
    },
    {
      id: 7,
      question: "`SELECT * FROM users;` da `users` nima?",
      options: ["Ustun nomi", "Jadval nomi", "Baza nomi", "Buyruq"],
      correctAnswer: 1,
      explanation: "FROM dan keyin jadval nomi yoziladi."
    },
    {
      id: 8,
      question: "So'rov oxirida nima turadi?",
      options: ["Nuqta", "Nuqta-vergul (;)", "Vergul", "Hech narsa"],
      correctAnswer: 1,
      explanation: "Bitta so'rov bitta nuqta-vergul bilan tugaydi."
    },
    {
      id: 9,
      question: "`SELECT name FROM users;` nima chiqaradi?",
      options: ["Hamma ustun", "Faqat ismlar", "Hech narsa", "Xatolik"],
      correctAnswer: 1,
      explanation: "Faqat so'ralgan ustun keladi."
    },
    {
      id: 10,
      question: "`--` belgisi SQL'da nima qiladi?",
      options: ["So'rovni tugatadi", "Izoh boshlaydi (ishlamaydi)", "Xatolik beradi", "Jadval yaratadi"],
      correctAnswer: 1,
      explanation: "-- dan keyingi matn izoh. Baza uni o'qimaydi."
    },
    {
      id: 11,
      question: "Kichik harfdagi `select * from users;` ishlaydimi?",
      options: ["Yo'q, xato beradi", "Ha, ishlaydi (odat katta harf)", "Faqat bazada ishlaydi", "Hech qachon"],
      correctAnswer: 1,
      explanation: "Kalit so'zlar harfga sezgir emas. Lekin katta harf odat."
    },
    {
      id: 12,
      question: "PostgreSQL va MySQL nima?",
      options: ["Dasturlash tillari", "Ma'lumotlar bazasi tizimlari (RDBMS)", "Brauzerlar", "Operatsion tizimlar"],
      correctAnswer: 1,
      explanation: "Ikkalasi ham SQL bilan ishlaydigan mashhur baza tizimlari."
    }
  ]
};
