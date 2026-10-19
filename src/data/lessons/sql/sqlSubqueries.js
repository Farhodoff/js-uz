export const sqlSubqueries = {
  id: "sqlSubqueries",
  title: "Ichki So'rovlar (Subquery)",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT); INSERT INTO users VALUES (1,'Ali',25),(2,'Vali',17),(3,'Guli',30); CREATE TABLE orders (id INT, user_id INT, amount INT); INSERT INTO orders VALUES (1,1,100),(2,2,150),(3,1,200);",
  theory: `## 1. Bu nima?

Tasavvur qiling, matryoshka qo'g'irchog'i bor. Katta qo'g'irchoq ichida kichigi turibdi. Avval kichigi ochiladi. Keyin kattasi ishlatiladi.

Dasturlashda subquery (ichki so'rov) xuddi shu matryoshka. Bitta so'rov ikkinchisining ichida yoziladi. Avval ichkaridagisi bajariladi.

Subquery — boshqa so'rov ichiga yozilgan so'rovdir. Ichkarisi avval hisoblanadi, natijasi tashqariga beriladi.

---

## 2. Nega kerak?

Savol: "150 dan katta buyurtma berganlar kim?" Javob ikki qadamda topiladi. Avval buyurtmalar qaraladi. Keyin ismlar topiladi.

Muammo shunda: bitta so'rov bilan ikki jadvaldan natija olish kerak. Yechim — ichki so'rov:

\`\`\`sql
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 120);
\`\`\`

Ichkarisi avval ishlaydi. Ro'yxat chiqadi. Tashqarisi shu ro'yxat bilan ishlaydi.

---

## 3. Birinchi misol

Bu kod katta buyurtma berganlarni chiqaradi.

\`\`\`sql
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 120);
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali"},{"name":"Vali"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`(SELECT user_id FROM orders WHERE amount > 120)\` — ichki so'rov. Avval bajariladi. Natija: \`1\` va \`2\`.
- \`WHERE id IN (...)\` — tashqi so'rov. \`id\` shu ro'yxatda bo'lganlar olinadi.
- Natijada Ali va Vali chiqadi. Guli chiqmadi. Uning buyurtmasi yo'q.

---

## 5. Yana bitta misol

Bu kod har birining buyurtma sonini chiqaradi.

\`\`\`sql
SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS soni FROM users;
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali","soni":2},{"name":"Vali","soni":1},{"name":"Guli","soni":0}]
\`\`\`

Qator-baqator tahlil:
- Ichki so'rov har qator uchun alohida ishlaydi. Ali uchun 2, Vali uchun 1, Guli uchun 0.
- Natija ustun sifatida chiqadi (\`soni\`).
- Bu "ustun ichidagi so'rov" deb ataladi.

---

## 5.1. EXISTS tekshiruvi

Bor-yo'qlikni tekshirish uchun maxsus so'z bor:

\`\`\`sql
SELECT name FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id);
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali"},{"name":"Vali"}]
\`\`\`

Qator-baqator tahlil:
- \`EXISTS\` — "bormi?" degani. Ichkarida kamida bitta qator topilsa, javob ha.
- Guli uchun hech narsa topilmadi. U chiqmadi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Qavsni unutish
❌ Xato kod:
\`\`\`sql
SELECT name FROM users WHERE id IN SELECT user_id FROM orders;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Ichki so'rov har doim qavs ichida yoziladi.
✅ To'g'ri variant:
\`\`\`sql
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders);
\`\`\`

### 2. Bitta ustundan ko'p so'rash
❌ Xato kod:
\`\`\`sql
SELECT name FROM users WHERE id IN (SELECT user_id, amount FROM orders);
\`\`\`
Nima bo'ladi: xatolik yuz beradi. \`IN\` ro'yxati bitta ustundan iborat bo'lishi kerak. Ikkita ustun solishtirib bo'lmaydi.
✅ To'g'ri variant:
\`\`\`sql
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders);
\`\`\`

### 3. Bo'sh ro'yxat
❌ Xato tushuncha:
\`\`\`sql
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin bo'sh natija chiqadi. Ichki so'rov hech narsa topmagan. Bo'sh ro'yxat bilan hech kim mos kelmaydi.
✅ To'g'ri tushuncha: avval ichki so'rovni alohida bajaring. Natija borligiga ishonch hosil qiling.

---

## 7. Tekshiruv

### 1-mashq (Oson)
150 dan katta buyurtma berganlarni chiqaring. Ali va Vali chiqishi kerak.

### 2-mashq (O'rtacha)
Har birining buyurtma sonini chiqaring (Ali: 2, Vali: 1, Guli: 0).

### 3-mashq (Chegara holat)
Buyurtmasi borlarni EXISTS bilan chiqaring. Ali va Vali chiqishi kerak.

### Javoblar:
1.
\`\`\`sql
SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 150);
\`\`\`
2.
\`\`\`sql
SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS soni FROM users;
\`\`\`
3.
\`\`\`sql
SELECT name FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id);
\`\`\`

---

## 8. Xulosa

1. Subquery — so'rov ichidagi so'rov. Ichkarisi avval bajariladi.
2. \`IN\` ro'yxat bilan, \`EXISTS\` bor-yo'qlik bilan ishlaydi.
3. Ichki so'rov qavs ichida yoziladi va bitta ustun qaytaradi.

Keyingi darsda: tayyor saqlangan so'rovlar — \`VIEW\` bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: IN subquery",
      instruction: "users (id, name, age) va orders (id, user_id, amount) jadvallaridan 120 dan katta buyurtma berganlarni chiqaring (Ali, Vali).",
      startingCode: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 120);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 120);",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Vali'])) return 'Ali va Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Buyurtma soni",
      instruction: "Har bir foydalanuvchining buyurtma sonini chiqaring (Ali: 2, Vali: 1, Guli: 0).",
      startingCode: "SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS soni FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS soni FROM users;",
      test: "const map = {};\nresult.forEach(r => { map[r.name] = r.soni; });\nif (map['Ali'] !== 2 || map['Vali'] !== 1 || map['Guli'] !== 0) return 'Ali:2, Vali:1, Guli:0 bolishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: EXISTS",
      instruction: "Buyurtmasi borlarni EXISTS bilan chiqaring (Ali, Vali).",
      startingCode: "SELECT name FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id);",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Vali'])) return 'Ali va Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Qavs qo'shish",
      instruction: "Quyidagi xatoni tuzating: ichki so'rov qavs ichida bo'lishi kerak.",
      startingCode: "SELECT name FROM users WHERE id IN SELECT user_id FROM orders;",
      hint: "(SELECT user_id FROM orders)",
      solution: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders);",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Vali'])) return 'Ali va Vali chiqishi kerak (Guli yoq)';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Yoshi kattalar",
      instruction: "Yoshi 20 dan katta va buyurtmasi borlarni chiqaring (Ali).",
      startingCode: "SELECT name FROM users WHERE age > 20 AND id IN (SELECT user_id FROM orders);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name FROM users WHERE age > 20 AND id IN (SELECT user_id FROM orders);",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali'])) return 'Faqat Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: FROM ichida (chegara)",
      instruction: "Ichki so'rovni jadval sifatida ishlating: yoshi 18 dan kattalarni chiqaring (Ali, Guli).",
      startingCode: "SELECT * FROM (SELECT name, age FROM users) AS k WHERE age > 18;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM (SELECT name, age FROM users) AS k WHERE age > 18;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Guli'])) return 'Ali va Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: 100 dan kattalar (chegara)",
      instruction: "100 dan katta buyurtma berganlarni chiqaring (Ali, Vali).",
      startingCode: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Vali'])) return 'Ali va Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Bo'sh natija (chegara)",
      instruction: "1000 dan katta buyurtma berganlarni so'rang. Bo'sh chiqishi kerak (xato emas!).",
      startingCode: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name FROM users WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);",
      test: "if (result.length !== 0) return 'Bosh chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Guli yo'qligi (chegara)",
      instruction: "Buyurtmasi borlarda Guli yo'qligini tasdiqlang (EXISTS so'rovida Guli chiqmasligi kerak).",
      startingCode: "SELECT name FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id);",
      hint: "Natijada Gulini qidiring.",
      solution: "SELECT name FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id);",
      test: "if (result.some(r => r.name === 'Guli')) return 'Guli chiqmasligi kerak';\nif (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Yig'indi (chegara)",
      instruction: "Ali buyurtmalari yig'indisini ichki so'rovsiz emas, to'g'ridan-to'g'ri hisoblang: orders dan user_id=1 summasi (300 chiqishi kerak).",
      startingCode: "SELECT SUM(amount) AS jami FROM orders WHERE user_id = 1;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT SUM(amount) AS jami FROM orders WHERE user_id = 1;",
      test: "if (result[0].jami !== 300) return 'Natija 300 bolishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Subquery nima?",
      options: ["Alohida baza", "So'rov ichidagi so'rov", "Jadval turi", "Xato turi"],
      correctAnswer: 1,
      explanation: "Ichki so'rov avval bajariladi, natijasi tashqariga beriladi."
    },
    {
      id: 2,
      question: "Qaysi biri avval bajariladi?",
      options: ["Tashqi so'rov", "Ichki so'rov", "Ikkalasi birga", "Hech biri"],
      correctAnswer: 1,
      explanation: "Ichkarisi avval hisoblanadi."
    },
    {
      id: 3,
      question: "Ichki so'rov qayerda yoziladi?",
      options: ["Qavssiz", "Qavs ichida", "Alohida faylda", "Izohda"],
      correctAnswer: 1,
      explanation: "Qavs bo'lmasa parse xatoligi beradi."
    },
    {
      id: 4,
      question: "`WHERE id IN (SELECT user_id FROM orders)` nimani bildiradi?",
      options: ["Hammasi", "Ro'yxatdagilar", "Hech kim", "Birinchisi"],
      correctAnswer: 1,
      explanation: "id ichki ro'yxatda bo'lganlar olinadi."
    },
    {
      id: 5,
      question: "EXISTS nimani tekshiradi?",
      options: ["Tenglikni", "Bor-yo'qlikni", "Turini", "Uzunlikni"],
      correctAnswer: 1,
      explanation: "Kamida bitta qator topilsa — ha."
    },
    {
      id: 6,
      question: "`IN (SELECT user_id, amount FROM orders)` nima qiladi?",
      options: ["Ishlaydi", "Xatolik beradi", "Birinchisini oladi", "Hammasini oladi"],
      correctAnswer: 1,
      explanation: "IN ro'yxati bitta ustundan iborat bo'lishi kerak."
    },
    {
      id: 7,
      question: "Bo'sh ichki natijada nima chiqadi?",
      options: ["Xatolik", "Bo'sh natija", "Hammasi", "Birinchi qator"],
      correctAnswer: 1,
      explanation: "Bo'sh ro'yxat bilan hech kim mos kelmaydi."
    },
    {
      id: 8,
      question: "`(SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id)` qayerda turibdi?",
      options: ["WHERE da", "Ustun o'rnida (SELECT ro'yxatida)", "FROM da", "Tashqarida"],
      correctAnswer: 1,
      explanation: "Ustun ichidagi so'rov har qator uchun hisoblanadi."
    },
    {
      id: 9,
      question: "`SELECT * FROM (SELECT name, age FROM users) AS k WHERE age > 18;` da `k` nima?",
      options: ["Jadval", "Vaqtinchalik nom (alias)", "Ustun", "Baza"],
      correctAnswer: 1,
      explanation: "Ichki natijaga nom berish shart."
    },
    {
      id: 10,
      question: "150 dan katta buyurtma berganlar kimlar? (Ali:100,200; Vali:150)",
      options: ["Ali", "Ali va Vali", "Vali", "Hech kim"],
      correctAnswer: 0,
      explanation: "150 dan katta faqat 200 (Ali). 150 ning o'zi kirmaydi."
    },
    {
      id: 11,
      question: "Subquery o'rniga nima ishlatsa bo'ladi (uzun yo'l)?",
      options: ["Hech narsa", "JOIN", "Faqat VIEW", "Faqat INDEX"],
      correctAnswer: 1,
      explanation: "Ko'p subquery JOIN bilan ham yoziladi."
    },
    {
      id: 12,
      question: "`SELECT SUM(amount) AS jami FROM orders WHERE user_id = 1;` (100, 200) nima qaytaradi?",
      options: ["2", "300", "100", "Xatolik"],
      correctAnswer: 1,
      explanation: "100 + 200 = 300."
    }
  ]
};
