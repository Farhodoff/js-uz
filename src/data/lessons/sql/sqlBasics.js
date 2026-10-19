export const sqlBasics = {
  id: "sqlBasics",
  title: "Jadval Yaratish (CREATE TABLE)",
  language: "sql",
  dbSetup: "CREATE TABLE students (id INT, name STRING, age INT); INSERT INTO students VALUES (1,'Ali',20),(2,'Vali',19);",
  theory: `## 1. Bu nima?

Tasavvur qiling, yangi do'kon ochdingiz. Avval javonlar o'rnatasiz: har bir javonga yorliq yopishtirasiz ("Ism", "Narx"). Keyin mahsulotlarni joylaysiz. Javon bo'lmasa — mahsulotni qayerga qo'yasiz?

Dasturlashda jadval (table) xuddi shu javon. Avval jadval yaratiladi. Ustunlar belgilanadi. Keyin qatorlar yoziladi.

CREATE TABLE — yangi jadval yaratadigan buyruqdir. Qavs ichida ustunlar va ularning turlari yoziladi.

---

## 2. Nega kerak?

Talabalar ro'yxati kerak. Jadvalsiz saqlab bo'lmaydi. Avval uy quriladi:

\`\`\`sql
CREATE TABLE students (id INT, name STRING, age INT);
\`\`\`

Endi uy tayyor. Keyin odamlar kiritiladi:

\`\`\`sql
INSERT INTO students VALUES (1, 'Ali', 20);
\`\`\`

Muammo shunda: ma'lumot saqlashdan oldin joy tayyorlanishi kerak. Yechim — avval CREATE TABLE, keyin INSERT.

---

## 3. Birinchi misol

Bu kod yangi jadval yaratadi, bitta qator yozadi va o'qiydi.

\`\`\`sql
CREATE TABLE kurslar (id INT, nom STRING); -- Jadval yaratildi
INSERT INTO kurslar VALUES (1, 'Matematika'); -- Qator yozildi
SELECT * FROM kurslar; -- O'qildi
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"nom":"Matematika"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`CREATE TABLE kurslar (id INT, nom STRING);\` — jadval yaratildi. Ikkita ustun bor: \`id\` (son) va \`nom\` (matn).
- \`INSERT INTO kurslar VALUES (1, 'Matematika');\` — bitta qator yozildi. Qiymatlar ustunlar tartibida beriladi.
- \`SELECT * FROM kurslar;\` — jadval o'qildi. Bitta qator chiqdi.

---

## 5. Yana bitta misol

Bu kod tayyor jadvalga yangi qator qo'shadi.

\`\`\`sql
INSERT INTO students VALUES (3, 'Guli', 21); -- Uchinchi talaba
SELECT * FROM students; -- Hammasi o'qildi
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"name":"Ali","age":20},{"id":2,"name":"Vali","age":19},{"id":3,"name":"Guli","age":21}]
\`\`\`

Qator-baqator tahlil:
- \`students\` jadvali allaqachon bor (ikkita qator bilan).
- Yangi qator oxiriga qo'shildi. Endi uchta qator.
- \`SELECT *\` hammasini qaytardi.

---

## 5.1. Jadvalni o'chirish

Keraksiz jadval o'chiriladi:

\`\`\`sql
DROP TABLE kurslar; -- Jadval o'chirildi
\`\`\`

\`\`\`text
// Natija: 1
\`\`\`

Qator-baqator tahlil:
- \`DROP TABLE\` — jadvalni butunlay o'chiradi. Ichidagi ma'lumotlar ham ketadi.
- Natija \`1\` — buyruq bajarildi degani.

---

## 6. Ko'p uchraydigan xatolar

### 1. TABLE so'zini unutish
❌ Xato kod:
\`\`\`sql
CREATE students (id INT);
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi (\`Parse error on line 1\`). Nima yaratilayotgani aytilishi shart: \`CREATE TABLE\`.
✅ To'g'ri variant:
\`\`\`sql
CREATE TABLE students (id INT);
\`\`\`

### 2. Qiymatlar soni mos kelmasligi
❌ Xato kod:
\`\`\`sql
INSERT INTO students VALUES (1, 'Ali');
\`\`\`
Nima bo'ladi: xatolik yuz beradi (qiymatlar soni ustunlar soniga teng bo'lishi kerak). Jadvalda uchta ustun bor. Ikkita qiymat yetmaydi.
✅ To'g'ri variant:
\`\`\`sql
INSERT INTO students VALUES (1, 'Ali', 20);
\`\`\`

### 3. Bor jadvalni qayta yaratish
❌ Xato kod:
\`\`\`sql
CREATE TABLE students (id INT);
\`\`\`
Nima bo'ladi: xatolik yuz beradi (bunday jadval allaqachon bor). Bir nom bilan ikkita jadval bo'lmaydi.
✅ To'g'ri variant:
\`\`\`sql
CREATE TABLE talabalar (id INT);
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`kurslar\` jadvalini yarating (\`id INT, nom STRING\`). Bitta qator yozing. O'qib chiqing.

### 2-mashq (O'rtacha)
\`students\` ga uchinchi talabani qo'shing (\`3, 'Guli', 21\`). Hammasini o'qib chiqing (3 qator chiqishi kerak).

### 3-mashq (Chegara holat)
\`kurslar\` jadvalini o'chiring (\`DROP TABLE\`). Xato bermasligi kerak.

### Javoblar:
1.
\`\`\`sql
CREATE TABLE kurslar (id INT, nom STRING);
INSERT INTO kurslar VALUES (1, 'Matematika');
SELECT * FROM kurslar;
\`\`\`
2.
\`\`\`sql
INSERT INTO students VALUES (3, 'Guli', 21);
SELECT * FROM students;
\`\`\`
3.
\`\`\`sql
DROP TABLE kurslar;
\`\`\`

---

## 8. Xulosa

1. \`CREATE TABLE\` — yangi jadval yaratadi. Ustunlar va turlar qavs ichida yoziladi.
2. \`INSERT INTO\` — qator qo'shadi. Qiymatlar soni ustunlarga teng bo'lishi shart.
3. \`DROP TABLE\` — jadvalni o'chiradi. Bir nom bilan ikkita jadval bo'lmaydi.

Keyingi darsda: ustun turlari (data types) — \`WHERE\` va mantiqiy operatorlar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Jadval + qator",
      instruction: "`kurslar` jadvalini yarating (id INT, nom STRING). Bitta qator yozing (1, 'Matematika'). O'qib chiqing.",
      startingCode: "CREATE TABLE kurslar (id INT, nom STRING);",
      hint: "INSERT INTO kurslar VALUES (1, 'Matematika');\nSELECT * FROM kurslar;",
      solution: "CREATE TABLE kurslar (id INT, nom STRING); INSERT INTO kurslar VALUES (1, 'Matematika'); SELECT * FROM kurslar;",
      test: "if (!/\\bCREATE\\s+TABLE\\b/i.test(code)) return 'CREATE TABLE yozing';\nif (!/\\bINSERT\\s+INTO\\b/i.test(code)) return 'INSERT INTO yozing';\nconst rows = result.filter(r => r.nom === 'Matematika');\nif (rows.length !== 1) return 'Matematika qatori chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Uchinchi talaba",
      instruction: "`students` ga uchinchi qatorni qo'shing (3, 'Guli', 21). Hammasini o'qing (3 qator chiqishi kerak).",
      startingCode: "SELECT * FROM students;",
      hint: "INSERT INTO students VALUES (3, 'Guli', 21);",
      solution: "INSERT INTO students VALUES (3, 'Guli', 21); SELECT * FROM students;",
      test: "if (!/\\bINSERT\\s+INTO\\b/i.test(code)) return 'INSERT INTO yozing';\nif (result.length !== 3) return '3 qator chiqishi kerak. Chiqdi: ' + result.length;\nconst guli = result.filter(r => r.name === 'Guli');\nif (guli.length !== 1) return 'Guli qatori topilmadi';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: TABLE so'zi",
      instruction: "Quyidagi xatoni tuzating: `TABLE` so'zi tushib qolgan.",
      startingCode: "CREATE students (id INT);",
      hint: "CREATE TABLE students (id INT);",
      solution: "CREATE TABLE students2 (id INT); SELECT * FROM students;",
      test: "if (!/\\bCREATE\\s+TABLE\\b/i.test(code)) return 'CREATE TABLE deb yozing';\nif (result.length < 2) return 'students qatorlari chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Qiymatlar soni",
      instruction: "Quyidagi xatoni tuzating: qiymatlar soni ustunlarga teng bo'lishi kerak (3 ta ustun).",
      startingCode: "INSERT INTO students VALUES (1, 'Ali');\nSELECT * FROM students;",
      hint: "INSERT INTO students VALUES (1, 'Ali', 20);",
      solution: "INSERT INTO students VALUES (1, 'Ali', 20); SELECT * FROM students;",
      test: "let ok = false;\ntry { if (result.length >= 2) ok = true; } catch (e) { }\nif (!ok) return 'Qiymatlar sonini tenglang';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Jadvalni o'chirish",
      instruction: "`kurslar` jadvalini yarating, keyin o'chiring (DROP TABLE). Xato bermasligi kerak.",
      startingCode: "CREATE TABLE kurslar (id INT);\nDROP TABLE kurslar;",
      hint: "CREATE TABLE kurslar (id INT);\nDROP TABLE kurslar;",
      solution: "CREATE TABLE kurslar (id INT); DROP TABLE kurslar;",
      test: "if (!/\\bDROP\\s+TABLE\\b/i.test(code)) return 'DROP TABLE yozing';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Yangi jadval",
      instruction: "`guruhlar` jadvalini yarating (id INT, nom STRING). Bitta qator yozing (1, 'A'). O'qing.",
      startingCode: "CREATE TABLE guruhlar (id INT, nom STRING);",
      hint: "INSERT INTO guruhlar VALUES (1, 'A');\nSELECT * FROM guruhlar;",
      solution: "CREATE TABLE guruhlar (id INT, nom STRING); INSERT INTO guruhlar VALUES (1, 'A'); SELECT * FROM guruhlar;",
      test: "if (!/\\bCREATE\\s+TABLE\\b/i.test(code)) return 'CREATE TABLE yozing';\nconst rows = result.filter(r => r.nom === 'A');\nif (rows.length !== 1) return 'A qatori chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Ikki qator",
      instruction: "`kurslar` ga ikkita qator yozing (1, 'Matematika') va (2, 'Fizika'). Ikkalasini o'qing.",
      startingCode: "CREATE TABLE kurslar (id INT, nom STRING);",
      hint: "INSERT INTO kurslar VALUES (1, 'Matematika');\nINSERT INTO kurslar VALUES (2, 'Fizika');\nSELECT * FROM kurslar;",
      solution: "CREATE TABLE kurslar (id INT, nom STRING); INSERT INTO kurslar VALUES (1, 'Matematika'); INSERT INTO kurslar VALUES (2, 'Fizika'); SELECT * FROM kurslar;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Bitta ustun",
      instruction: "`students` dan faqat name ustunini o'qing (Ali va Vali chiqishi kerak).",
      startingCode: "SELECT * FROM students;",
      hint: "SELECT name FROM students;",
      solution: "SELECT name FROM students;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Vali'])) return 'Ali va Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Takror yaratish xatosi",
      instruction: "`students` allaqachon bor. Uni qayta yaratishga urinish xato beradi. Boshqa nom bering (`talabalar`).",
      startingCode: "CREATE TABLE students (id INT);",
      hint: "CREATE TABLE talabalar (id INT);",
      solution: "CREATE TABLE talabalar (id INT); SELECT * FROM students;",
      test: "if (/\\bstudents\\b/i.test(code) && !/\\btalabalar\\b/i.test(code)) return 'Boshqa nom bering';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq sikl (chegara)",
      instruction: "Yangi `fanlar` jadvali yarating (id INT, nom STRING). 2 qator yozing. Hammasini o'qing (2 qator chiqishi kerak).",
      startingCode: "CREATE TABLE fanlar (id INT, nom STRING);",
      hint: "INSERT INTO fanlar VALUES (1, 'Kimyo');\nINSERT INTO fanlar VALUES (2, 'Biologiya');\nSELECT * FROM fanlar;",
      solution: "CREATE TABLE fanlar (id INT, nom STRING); INSERT INTO fanlar VALUES (1, 'Kimyo'); INSERT INTO fanlar VALUES (2, 'Biologiya'); SELECT * FROM fanlar;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Yangi jadval qaysi buyruq bilan yaratiladi?",
      options: ["MAKE TABLE", "CREATE TABLE", "NEW TABLE", "BUILD TABLE"],
      correctAnswer: 1,
      explanation: "CREATE TABLE — jadval yaratish buyrug'i."
    },
    {
      id: 2,
      question: "`CREATE TABLE students (id INT, name STRING);` da qavs ichida nima yozilgan?",
      options: ["Qatorlar", "Ustunlar va ularning turlari", "Jadval nomi", "Hech narsa"],
      correctAnswer: 1,
      explanation: "Qavs ichida ustun nomi va turi yoziladi."
    },
    {
      id: 3,
      question: "Qator qo'shish buyrug'i qaysi?",
      options: ["ADD ROW", "INSERT INTO", "PUT", "APPEND"],
      correctAnswer: 1,
      explanation: "INSERT INTO jadvalga qator qo'shadi."
    },
    {
      id: 4,
      question: "`INSERT INTO students VALUES (1, 'Ali');` (3 ustunli jadvalga) nima qiladi?",
      options: ["Ishlaydi, 3-ustun bo'sh qoladi", "Xatolik beradi", "Faqat 1 ni yozadi", "Jadvalni o'chiradi"],
      correctAnswer: 1,
      explanation: "Qiymatlar soni ustunlarga teng bo'lishi shart."
    },
    {
      id: 5,
      question: "Jadvalni o'chirish buyrug'i qaysi?",
      options: ["DELETE TABLE", "REMOVE TABLE", "DROP TABLE", "CLEAR TABLE"],
      correctAnswer: 2,
      explanation: "DROP TABLE jadvalni butunlay o'chiradi."
    },
    {
      id: 6,
      question: "`CREATE students (id INT);` qatorida nima bo'ladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh jadval yaratadi", "Ogohlantirish beradi"],
      correctAnswer: 1,
      explanation: "TABLE so'zi shart: CREATE TABLE."
    },
    {
      id: 7,
      question: "Bor jadvalni qayta yaratsak nima bo'ladi?",
      options: ["Eskisi o'chib yangisi ochiladi", "Xatolik beradi", "Ikkita bo'ladi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Bir nom bilan ikkita jadval bo'lmaydi."
    },
    {
      id: 8,
      question: "`INT` nimani bildiradi?",
      options: ["Matn turini", "Butun son turini", "Jadval nomini", "Buyruqni"],
      correctAnswer: 1,
      explanation: "INT — butun sonlar uchun ustun turi."
    },
    {
      id: 9,
      question: "`STRING` nimani bildiradi?",
      options: ["Son turini", "Matn turini", "Jadval turini", "Hech narsani"],
      correctAnswer: 1,
      explanation: "STRING — matnlar uchun ustun turi."
    },
    {
      id: 10,
      question: "Avval nima qilinadi: CREATE TABLEmi yoki INSERTmi?",
      options: ["INSERT", "CREATE TABLE", "Farqi yo'q", "Ikkalasi birga"],
      correctAnswer: 1,
      explanation: "Avval uy quriladi (CREATE), keyin odam kiritiladi (INSERT)."
    },
    {
      id: 11,
      question: "`DROP TABLE kurslar;` dan keyin `SELECT * FROM kurslar;` nima qiladi?",
      options: ["Bo'sh natija beradi", "Xatolik beradi (jadval yo'q)", "Eski ma'lumotni beradi", "Yangi jadval yaratadi"],
      correctAnswer: 1,
      explanation: "O'chirilgan jadvaldan o'qib bo'lmaydi."
    },
    {
      id: 12,
      question: "Qiymatlar qavs ichida qanday ajratiladi?",
      options: ["Nuqta-vergul bilan", "Vergul bilan", "Bo'sh joy bilan", "Chiziqcha bilan"],
      correctAnswer: 1,
      explanation: "VALUES (1, 'Ali', 20) — vergul bilan."
    }
  ]
};
