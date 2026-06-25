export const sqlBasics = {
  id: "sql_basics",
  title: "SQL Asoslari (CREATE, INSERT, UPDATE, DELETE)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
SQL orqali nafaqat ma'lumotlarni o'qiymiz, balki ularni yaratamiz va o'zgartiramiz.
Buni biz **CRUD** deymiz (Create, Read, Update, Delete).

- **Jadval yaratish (CREATE TABLE):** Bazada yangi quti (jadval) yasaymiz.
- **Ma'lumot qo'shish (INSERT):** Jadvalga yangi qator qo'shamiz.
- **Ma'lumotni o'zgartirish (UPDATE):** Mavjud qatordagi biror ustunni o'zgartiramiz.
- **Ma'lumotni o'chirish (DELETE):** Jadvaldan qatorni butunlay olib tashlaymiz.

\\\`\\\`\\\`sql
-- Yangi ma'lumot qo'shish:
INSERT INTO users (name, age) VALUES ('Ali', 20);

-- Ma'lumotni yangilash:
UPDATE users SET age = 21 WHERE name = 'Ali';

-- Ma'lumotni o'chirish:
DELETE FROM users WHERE name = 'Ali';
\\\`\\\`\\\`

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON:** UPDATE yoki DELETE buyruqlarini \`WHERE\` shartisiz ishlatish!
\`\`\`sql
-- DIQQAT! Bu butun jadvaldagi hamma foydalanuvchilarning yoshini 21 ga o'zgartirib yuboradi!
UPDATE users SET age = 21;

-- Butun jadvalni o'chirib yuboradi!
DELETE FROM users;
\`\`\`

**✅ YAXSHI:** Doim \`WHERE\` orqali qaysi qatorni o'zgartirish kerakligini aniq ko'rsatish (ayniqsa \`id\` orqali).
\`\`\`sql
UPDATE users SET age = 21 WHERE id = 5;
\`\`\`

## 🎤 Intervyu Savollari
1. **TRUNCATE va DELETE farqi nima?**
   - \`DELETE\` qatorlarni birma-bir o'chiradi va shart (WHERE) berish mumkin. \`TRUNCATE\` butun jadvalni bo'shatadi (juda tez), lekin WHERE ishlatib bo'lmaydi va odatda tranzaksiyani bekor qilish qiyinroq.
2. **DDL va DML nima?**
   - DDL (Data Definition Language) - Jadvallarni tuzish (CREATE, ALTER, DROP).
   - DML (Data Manipulation Language) - Ma'lumotlarni o'zgartirish (INSERT, UPDATE, DELETE).
3. **Primary Key (Asosiy Kalit) nima?**
   - Har bir qatorni takrorlanmas (unique) qilib ajratib turuvchi ustun (odatda \`id\`).

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
flowchart TD
    A[Jadvalni Boshqarish] --> B(CREATE TABLE)
    A --> C(DROP TABLE)
    D[Ma'lumotni Boshqarish] --> E(INSERT)
    D --> F(UPDATE)
    D --> G(DELETE)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Jadval yaratish",
      instruction: "Yangi jadval yaratish uchun qaysi ikki so'z ishlatiladi? (CREATE TABLE)",
      startingCode: "function getCreateTable() {\n  return '';\n}",
      hint: "CREATE TABLE deb qaytaring.",
      solution: "function getCreateTable() {\n  return 'CREATE TABLE';\n}",
      test: "const fn = new Function(code + '; return getCreateTable;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'CREATE TABLE') throw new Error(\"CREATE TABLE kutilgandi\");"
    },
    {
      id: 2,
      title: "2-Topshiriq: Ma'lumot qo'shish",
      instruction: "Jadvalga yangi qator qo'shish uchun qaysi kalit so'z ishlatiladi? (INSERT INTO)",
      startingCode: "function getInsertInto() {\n  return '';\n}",
      hint: "INSERT INTO",
      solution: "function getInsertInto() {\n  return 'INSERT INTO';\n}",
      test: "const fn = new Function(code + '; return getInsertInto;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'INSERT INTO') throw new Error(\"INSERT INTO kutilgandi\");"
    },
    {
      id: 3,
      title: "3-Topshiriq: Qiymatlar",
      instruction: "INSERT INTO dan keyin, qaysi qiymatlarni qo'shishni ko'rsatish uchun qaysi so'z ishlatiladi?",
      startingCode: "function getValues() {\n  return '';\n}",
      hint: "VALUES so'zini qaytaring.",
      solution: "function getValues() {\n  return 'VALUES';\n}",
      test: "const fn = new Function(code + '; return getValues;')();\nif (fn().toUpperCase() !== 'VALUES') throw new Error(\"VALUES kutilgandi\");"
    },
    {
      id: 4,
      title: "4-Topshiriq: Ma'lumotni yangilash",
      instruction: "Jadvaldagi ma'lumotni o'zgartirish (yangilash) uchun qaysi kalit so'z ishlatiladi?",
      startingCode: "function getUpdate() {\n  return '';\n}",
      hint: "UPDATE so'zini qaytaring.",
      solution: "function getUpdate() {\n  return 'UPDATE';\n}",
      test: "const fn = new Function(code + '; return getUpdate;')();\nif (fn().toUpperCase() !== 'UPDATE') throw new Error(\"UPDATE kutilgandi\");"
    },
    {
      id: 5,
      title: "5-Topshiriq: O'zgartirishni o'rnatish",
      instruction: "UPDATE buyrug'idan so'ng, qaysi ustunga qanday qiymat berishni ko'rsatish uchun qaysi so'z ishlatiladi? (SET)",
      startingCode: "function getSet() {\n  return '';\n}",
      hint: "SET so'zini qaytaring.",
      solution: "function getSet() {\n  return 'SET';\n}",
      test: "const fn = new Function(code + '; return getSet;')();\nif (fn().toUpperCase() !== 'SET') throw new Error(\"SET kutilgandi\");"
    },
    {
      id: 6,
      title: "6-Topshiriq: Ma'lumotni o'chirish",
      instruction: "Jadvaldan qatorni o'chirish uchun qaysi so'zlar ishlatiladi? (DELETE FROM)",
      startingCode: "function getDeleteFrom() {\n  return '';\n}",
      hint: "DELETE FROM deb qaytaring.",
      solution: "function getDeleteFrom() {\n  return 'DELETE FROM';\n}",
      test: "const fn = new Function(code + '; return getDeleteFrom;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'DELETE FROM') throw new Error(\"DELETE FROM kutilgandi\");"
    },
    {
      id: 7,
      title: "7-Topshiriq: Xavfli xato",
      instruction: "UPDATE yoki DELETE dan so'ng qaysi kalit so'zni yozishni unutmaslik O'TA MUHIM?",
      startingCode: "function getImportantWord() {\n  return '';\n}",
      hint: "WHERE so'zini qaytaring.",
      solution: "function getImportantWord() {\n  return 'WHERE';\n}",
      test: "const fn = new Function(code + '; return getImportantWord;')();\nif (fn().toUpperCase() !== 'WHERE') throw new Error(\"WHERE kutilgandi\");"
    },
    {
      id: 8,
      title: "8-Topshiriq: Jadvalni yo'q qilish",
      instruction: "Butun jadvalni (ichidagi ma'lumotlari bilan birga) yo'q qilib yuborish uchun qaysi so'zlar ishlatiladi? (DROP TABLE)",
      startingCode: "function getDropTable() {\n  return '';\n}",
      hint: "DROP TABLE",
      solution: "function getDropTable() {\n  return 'DROP TABLE';\n}",
      test: "const fn = new Function(code + '; return getDropTable;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'DROP TABLE') throw new Error(\"DROP TABLE kutilgandi\");"
    },
    {
      id: 9,
      title: "9-Topshiriq: DDL",
      instruction: "CREATE va DROP qaysi til turiga kiradi? DDL yoki DML?",
      startingCode: "function getLanguageType() {\n  return '';\n}",
      hint: "DDL deb qaytaring.",
      solution: "function getLanguageType() {\n  return 'DDL';\n}",
      test: "const fn = new Function(code + '; return getLanguageType;')();\nif (fn().toUpperCase() !== 'DDL') throw new Error(\"DDL kutilgandi\");"
    },
    {
      id: 10,
      title: "10-Topshiriq: DML",
      instruction: "INSERT, UPDATE va DELETE qaysi turiga kiradi? DDL yoki DML?",
      startingCode: "function getDML() {\n  return '';\n}",
      hint: "DML deb qaytaring.",
      solution: "function getDML() {\n  return 'DML';\n}",
      test: "const fn = new Function(code + '; return getDML;')();\nif (fn().toUpperCase() !== 'DML') throw new Error(\"DML kutilgandi\");"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Yangi jadval yaratish buyrug'i nima?",
      options: ["NEW TABLE", "CREATE TABLE", "MAKE TABLE", "ADD TABLE"],
      correctAnswer: 1,
      explanation: "SQL da jadvallar CREATE TABLE orqali yaratiladi."
    },
    {
      id: 2,
      question: "Jadvalga yangi ma'lumot (qator) qo'shish qanday bajariladi?",
      options: ["ADD INTO", "INSERT INTO", "PUT INTO", "APPEND TO"],
      correctAnswer: 1,
      explanation: "Yangi ma'lumot qo'shish uchun INSERT INTO ishlatiladi."
    },
    {
      id: 3,
      question: "Mavjud ma'lumotlarni o'zgartirish buyrug'i qaysi?",
      options: ["MODIFY", "CHANGE", "UPDATE", "ALTER"],
      correctAnswer: 2,
      explanation: "Qatordagi ma'lumotlarni yangilash uchun UPDATE ishlatiladi."
    },
    {
      id: 4,
      question: "UPDATE ishlatganda nima esdan chiqmasligi kerak?",
      options: ["Nuqtali vergul", "WHERE sharti", "Jadval rangi", "SELECT so'zi"],
      correctAnswer: 1,
      explanation: "WHERE sharti yozilmasa, butun jadvaldagi Hamma qatorlar o'zgarib ketadi!"
    },
    {
      id: 5,
      question: "Ma'lum bir qatorni o'chirish uchun qaysi buyruq ishlatiladi?",
      options: ["DELETE FROM", "REMOVE", "DROP ROW", "ERASE"],
      correctAnswer: 0,
      explanation: "Qatorni o'chirish uchun DELETE FROM ishlatiladi."
    },
    {
      id: 6,
      question: "DROP TABLE nima ish qiladi?",
      options: ["Jadval ichidagi ma'lumotni o'chiradi", "Jadvalni barcha ma'lumotlari bilan butunlay yo'q qiladi", "Jadval nomini o'zgartiradi", "Jadvalni nusxalaydi"],
      correctAnswer: 1,
      explanation: "DROP TABLE jadvalning o'zini strukturasi va barcha ma'lumotlari bilan yo'q qiladi."
    },
    {
      id: 7,
      question: "DDL qisqartmasining ma'nosi nima?",
      options: ["Data Definition Language", "Data Deletion Language", "Database Design Logic", "Dynamic Data Logic"],
      correctAnswer: 0,
      explanation: "DDL (Data Definition Language) - CREATE, DROP, ALTER kabi buyruqlarni o'z ichiga oladi."
    },
    {
      id: 8,
      question: "DML qisqartmasining ma'nosi nima?",
      options: ["Data Moving Logic", "Database Manipulation Logic", "Data Manipulation Language", "Direct Machine Language"],
      correctAnswer: 2,
      explanation: "DML (Data Manipulation Language) - ma'lumotlarni o'zgartiruvchi INSERT, UPDATE, DELETE larni o'z ichiga oladi."
    },
    {
      id: 9,
      question: "Primary Key nima uchun kerak?",
      options: ["Ma'lumotlarni shifrlash uchun", "Har bir qatorni noyob (unique) qilib aniqlash uchun", "Baza parolini saqlash uchun", "Faqat chiroyli ko'rinish uchun"],
      correctAnswer: 1,
      explanation: "Primary Key har bir qatorga takrorlanmas ID berish orqali, qatorlarni bir-biridan ajratadi."
    },
    {
      id: 10,
      question: "DELETE va TRUNCATE ning farqi nimada?",
      options: ["Farqi yo'q", "DELETE shart (WHERE) qabul qiladi, TRUNCATE esa butun jadvalni tez tozalaydi", "TRUNCATE faqat bir qatorni o'chiradi", "DELETE jadvallarni o'chiradi"],
      correctAnswer: 1,
      explanation: "TRUNCATE WHERE shartini qabul qilmaydi va jadvalni butunlay tozalashning eng tezkor yo'lidir."
    },
    {
      id: 11,
      question: "UPDATE qaysi so'z bilan birga ishlatilib, qiymatni o'rnatadi?",
      options: ["SET", "PUT", "EQUAL", "MAKE"],
      correctAnswer: 0,
      explanation: "UPDATE table_name SET column_name = value ko'rinishida ishlatiladi."
    },
    {
      id: 12,
      question: "INSERT INTO dan so'ng qator qiymatlari qaysi so'zdan keyin yoziladi?",
      options: ["DATA", "INPUT", "VALUES", "ROWS"],
      correctAnswer: 2,
      explanation: "INSERT INTO table_name (...) VALUES (...) ko'rinishida yoziladi."
    }
  ]
};
