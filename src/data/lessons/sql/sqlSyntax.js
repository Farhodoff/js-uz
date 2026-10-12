export const sqlSyntax = {
  id: "sqlSyntax",
  title: "SELECT Asoslari: Ustun, Tartib, Chegara",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT, city STRING); INSERT INTO users VALUES (1,'Ali',25,'Toshkent'),(2,'Vali',17,'Samarqand'),(3,'Guli',30,'Toshkent'),(4,'Hasan',22,'Buxoro'),(5,'Malika',19,'Toshkent'),(6,'Jasur',35,'Samarqand');",
  theory: `## 1. Bu nima?

Tasavvur qiling, restorandasiz. Ofitsiantga aytasiz: "Menga taomnomadan faqat sho'rvalar ro'yxatini keltiring. Narxi bo'yicha arzonidan boshlab. Faqat uchtasini."

Uchta istak: qaysi ustun, qanday tartib, nechta qator. SQL da har biri alohida so'z bilan aytiladi.

SELECT so'rovi — jadvaldan kerakli ustunlarni, kerakli tartibda, kerakli miqdorda oladigan buyruqdir.

---

## 2. Nega kerak?

users jadvalida 6 kishi bor. Sizga faqat ismlar ro'yxati kerak. Hammasi emas:

\`\`\`sql
SELECT name FROM users;
\`\`\`

Yoki yoshi kattadan kichikka, faqat ikkitasi:

\`\`\`sql
SELECT name, age FROM users ORDER BY age DESC LIMIT 2;
\`\`\`

Muammo shunda: har safar hamma ma'lumot kerak emas. Yechim — ustunni tanlash (\`SELECT name\`), tartiblash (\`ORDER BY\`) va cheklash (\`LIMIT\`).

---

## 3. Birinchi misol

Bu kod faqat ismlarni chiqaradi.

\`\`\`sql
SELECT name FROM users; -- Faqat ism ustuni
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali"},{"name":"Vali"},{"name":"Guli"},{"name":"Hasan"},{"name":"Malika"},{"name":"Jasur"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`SELECT name\` — faqat bitta ustun so'raldi. Qolganlari kelmaydi.
- \`FROM users\` — users jadvalidan olinadi.
- Natijada har qatorda faqat \`name\` bor.

---

## 5. Yana bitta misol

Bu kod yosh bo'yicha kamayish tartibida ikkitasini chiqaradi.

\`\`\`sql
SELECT name, age FROM users ORDER BY age DESC LIMIT 2; -- Kattalar birinchi, 2 ta
\`\`\`

\`\`\`text
// Natija:
[{"name":"Jasur","age":35},{"name":"Guli","age":30}]
\`\`\`

Qator-baqator tahlil:
- \`SELECT name, age\` — ikkita ustun so'raldi.
- \`ORDER BY age DESC\` — yosh bo'yicha kamayish tartibi. Eng kattasi birinchi.
- \`LIMIT 2\` — faqat ikkita qator olinadi.

---

## 5.1. Takrorni yo'qotish va nomlash

Ikkita qo'shimcha so'z bor:

\`\`\`sql
SELECT DISTINCT city FROM users; -- Takrorlarsiz: 3 ta shahar
SELECT name AS ism FROM users; -- Ustun nomi o'zgardi
\`\`\`

\`\`\`text
// Natija (birinchi):
[{"city":"Toshkent"},{"city":"Samarqand"},{"city":"Buxoro"}]
\`\`\`

Qator-baqator tahlil:
- \`DISTINCT\` — takrorlangan qiymatlarni bitta qiladi. Toshkent ikki marta bo'lsa ham bir chiqadi.
- \`AS ism\` — ustunga vaqtinchalik yangi nom beradi. Natijada kalit \`ism\` bo'ladi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Jadval nomini xato yozish
❌ Xato kod:
\`\`\`sql
SELECT * FROM user;
\`\`\`
Nima bo'ladi: xatolik yuz beradi (\`Table does not exist: user\`). Jadval nomi aniq bo'lishi shart: \`users\` bilan \`user\` ikki xil nom.
✅ To'g'ri variant:
\`\`\`sql
SELECT * FROM users;
\`\`\`

### 2. Mavjud bo'lmagan ustun
❌ Xato kod:
\`\`\`sql
SELECT foo FROM users;
\`\`\`
Nima bo'ladi: xatolik yuz beradi (\`Column does not exist: foo\`). Avval jadvalda qanday ustunlar borligini bilish kerak.
✅ To'g'ri variant:
\`\`\`sql
SELECT name FROM users;
\`\`\`

### 3. Tartib so'zini unutish
❌ Xato tushuncha:
\`\`\`sql
SELECT name, age FROM users BY age DESC;
\`\`\`
Nima bo'ladi: xatolik yuz beradi. Tartiblash so'zi ikki qismli: \`ORDER BY\`. Faqat \`BY\` ning o'zi ishlamaydi.
✅ To'g'ri variant:
\`\`\`sql
SELECT name, age FROM users ORDER BY age DESC;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
users dan faqat ismlarni chiqaring. 6 ta ism chiqishi kerak.

### 2-mashq (O'rtacha)
users dan yosh bo'yicha o'sish tartibida ism va yoshni chiqaring. Birinchi qator Vali (17) bo'lishi kerak.

### 3-mashq (Chegara holat)
users dan takrorlanmagan shaharlarni chiqaring. 3 qator chiqishi kerak.

### Javoblar:
1.
\`\`\`sql
SELECT name FROM users;
\`\`\`
2.
\`\`\`sql
SELECT name, age FROM users ORDER BY age;
\`\`\`
3.
\`\`\`sql
SELECT DISTINCT city FROM users;
\`\`\`

---

## 8. Xulosa

1. \`SELECT\` — qaysi ustunlar, \`FROM\` — qaysi jadval, \`ORDER BY\` — qanday tartib, \`LIMIT\` — nechta qator.
2. \`DISTINCT\` takrorni o'chiradi, \`AS\` ustunga yangi nom beradi.
3. Jadval va ustun nomlari aniq yoziladi. Xato nom — xatolik.

Keyingi darsda: jadval yaratadigan \`CREATE TABLE\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Faqat ismlar",
      instruction: "users jadvalidan (id, name, age, city) faqat name ustunini chiqaring. 6 ta ism chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT name FROM users;",
      solution: "SELECT name FROM users;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Vali', 'Guli', 'Hasan', 'Malika', 'Jasur'])) return '6 ta ism chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Ism va yosh",
      instruction: "users dan name va age ustunlarini chiqaring. 6 qator chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT name, age FROM users;",
      solution: "SELECT name, age FROM users;",
      test: "if (result.length !== 6) return '6 qator chiqishi kerak';\nif (!('name' in result[0] && 'age' in result[0])) return 'name va age ustunlari kerak';\nif ('city' in result[0]) return 'city chiqmasligi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: O'sish tartibi",
      instruction: "users dan name va age ni yosh bo'yicha O'SISH tartibida chiqaring. Birinchi qator Vali (17) bo'lishi kerak.",
      startingCode: "SELECT name, age FROM users;",
      hint: "SELECT name, age FROM users ORDER BY age;",
      solution: "SELECT name, age FROM users ORDER BY age;",
      test: "if (!/\\bORDER\\s+BY\\b/i.test(code)) return 'ORDER BY yozing';\nif (result[0].name !== 'Vali') return 'Birinchi Vali bolishi kerak. Chiqdi: ' + (result[0] || {}).name;\nif (result.length !== 6) return '6 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Kamayish tartibi",
      instruction: "users dan name va age ni yosh bo'yicha KAMAYISH tartibida chiqaring. Birinchi qator Jasur (35) bo'lishi kerak.",
      startingCode: "SELECT name, age FROM users;",
      hint: "SELECT name, age FROM users ORDER BY age DESC;",
      solution: "SELECT name, age FROM users ORDER BY age DESC;",
      test: "if (!/\\bDESC\\b/i.test(code)) return 'DESC yozing';\nif (result[0].name !== 'Jasur') return 'Birinchi Jasur bolishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Chegara (LIMIT)",
      instruction: "users dan faqat 2 ta qator chiqaring (name ustuni). Ali va Vali chiqishi kerak.",
      startingCode: "SELECT name FROM users;",
      hint: "SELECT name FROM users LIMIT 2;",
      solution: "SELECT name FROM users LIMIT 2;",
      test: "if (!/\\bLIMIT\\b/i.test(code)) return 'LIMIT yozing';\nif (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Takrorsiz shaharlar",
      instruction: "users dan takrorlanmagan city qiymatlarini chiqaring. 3 qator chiqishi kerak.",
      startingCode: "SELECT city FROM users;",
      hint: "SELECT DISTINCT city FROM users;",
      solution: "SELECT DISTINCT city FROM users;",
      test: "if (!/\\bDISTINCT\\b/i.test(code)) return 'DISTINCT yozing';\nif (result.length !== 3) return '3 ta shahar chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Yangi nom (AS)",
      instruction: "name ustunini `ism` nomi bilan chiqaring (AS ishlating). Natija kaliti `ism` bo'lishi kerak.",
      startingCode: "SELECT name FROM users;",
      hint: "SELECT name AS ism FROM users;",
      solution: "SELECT name AS ism FROM users;",
      test: "if (!/\\bAS\\b/i.test(code)) return 'AS yozing';\nif (!('ism' in result[0])) return 'Kalit ism bolishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Tartib + chegara",
      instruction: "Yoshi kattalaridan 2 tasini chiqaring (name, age; kamayish tartibida). Jasur va Guli chiqishi kerak.",
      startingCode: "SELECT name, age FROM users;",
      hint: "SELECT name, age FROM users ORDER BY age DESC LIMIT 2;",
      solution: "SELECT name, age FROM users ORDER BY age DESC LIMIT 2;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Jasur', 'Guli'])) return 'Jasur va Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Jadval nomi xatosi",
      instruction: "Quyidagi xatoni tuzating: jadval nomi `users` bo'lishi kerak (`user` emas).",
      startingCode: "SELECT * FROM user;",
      hint: "SELECT * FROM users;",
      solution: "SELECT * FROM users;",
      test: "if (/user(?!s)/i.test(code)) return 'user emas, users deb yozing';\nif (!/\\busers\\b/i.test(code)) return 'users deb yozing';\nif (result.length !== 6) return '6 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Ustun xatosi",
      instruction: "Quyidagi xatoni tuzating: `foo` ustuni yo'q. `name` ga almashtiring.",
      startingCode: "SELECT foo FROM users;",
      hint: "SELECT name FROM users;",
      solution: "SELECT name FROM users;",
      test: "if (result.length !== 6) return '6 qator chiqishi kerak';\nif (!('name' in result[0])) return 'name ustuni kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`SELECT name FROM users;` nima chiqaradi?",
      options: ["Hamma ustun", "Faqat ismlar", "Hech narsa", "Xatolik"],
      correctAnswer: 1,
      explanation: "Faqat so'ralgan ustun keladi."
    },
    {
      id: 2,
      question: "`ORDER BY age DESC` nimani bildiradi?",
      options: ["Yosh bo'yicha o'sish", "Yosh bo'yicha kamayish", "Ism bo'yicha tartib", "Tartibsiz"],
      correctAnswer: 1,
      explanation: "DESC — kamayish (katta birinchi). Odatiy tartib o'sish."
    },
    {
      id: 3,
      question: "`LIMIT 2` nimani qiladi?",
      options: ["2-qatordan boshlaydi", "Faqat 2 qator qaytaradi", "2-ustunni oladi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "LIMIT natija sonini cheklaydi."
    },
    {
      id: 4,
      question: "`SELECT DISTINCT city FROM users;` nima chiqaradi?",
      options: ["Hamma shahar (takror bilan)", "Takrorlanmagan shaharlar", "Faqat birinchi shahar", "Xatolik"],
      correctAnswer: 1,
      explanation: "DISTINCT takrorlarni bitta qiladi."
    },
    {
      id: 5,
      question: "`SELECT name AS ism FROM users;` da kalit nima bo'ladi?",
      options: ["name", "ism", "users", "AS"],
      correctAnswer: 1,
      explanation: "AS ustunga vaqtinchalik yangi nom beradi."
    },
    {
      id: 6,
      question: "`SELECT * FROM user;` (users emas) qatorida nima bo'ladi?",
      options: ["Bo'sh natija", "Xatolik: jadval topilmadi", "Hamma qator", "Birinchi qator"],
      correctAnswer: 1,
      explanation: "Jadval nomi aniq bo'lishi shart."
    },
    {
      id: 7,
      question: "`SELECT foo FROM users;` qatorida nima bo'ladi?",
      options: ["Bo'sh natija", "Xatolik: ustun topilmadi", "Hamma ustun", "null chiqadi"],
      correctAnswer: 1,
      explanation: "Mavjud bo'lmagan ustun so'ralsa xato beradi."
    },
    {
      id: 8,
      question: "`ORDER BY` da `BY` ni unutib `ORDER age` yozilsa nima bo'ladi?",
      options: ["Ishlaydi", "Xatolik beradi", "Tartibsiz chiqaradi", "Faqat bitta chiqaradi"],
      correctAnswer: 1,
      explanation: "Tartib so'zi ikki qismli: ORDER BY."
    },
    {
      id: 9,
      question: "Eng katta yoshdagi 2 kishini qanday olamiz?",
      options: ["SELECT name FROM users LIMIT 2", "SELECT name, age FROM users ORDER BY age DESC LIMIT 2", "SELECT name FROM users ORDER BY age LIMIT 2", "SELECT * FROM users"],
      correctAnswer: 1,
      explanation: "Avval kamayish tartibi, keyin chegara."
    },
    {
      id: 10,
      question: "`SELECT name, age FROM users;` nechta ustun qaytaradi?",
      options: ["1 ta", "2 ta", "Hammasi", "0 ta"],
      correctAnswer: 1,
      explanation: "Vergul bilan ikkita ustun so'ralgan."
    },
    {
      id: 11,
      question: "O'sish tartibi uchun nima yoziladi?",
      options: ["ORDER BY age DESC", "ORDER BY age", "SORT BY age", "GROUP BY age"],
      correctAnswer: 1,
      explanation: "Qo'shimchasiz ORDER BY o'sish tartibida saralaydi."
    },
    {
      id: 12,
      question: "`SELECT * FROM users ORDER BY age DESC LIMIT 1;` nima qaytaradi?",
      options: ["Eng yoshini", "Eng kattasini (bitta qator)", "Hammasi", "Xatolik"],
      correctAnswer: 1,
      explanation: "Kamayish + 1 chegara = eng kattasi."
    }
  ]
};
