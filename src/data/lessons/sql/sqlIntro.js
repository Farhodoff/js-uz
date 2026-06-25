export const sqlIntro = {
  id: "sql_intro",
  title: "SQL Kirish (Introduction)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
**SQL** (Structured Query Language) - bu ma'lumotlar bazasi (Database) bilan gaplashish uchun maxsus til. Tasavvur qiling, ma'lumotlar bazasi bu juda katta kutubxona, SQL esa shu kutubxonachiga qaysi kitobni olib kelish, qayerga yangi kitob qo'yish yoki qaysi kitobni olib tashlashni aytadigan tildir.

SQL orqali biz **CRUD** amallarini bajaramiz:
- **C**reate - Yangi ma'lumot qo'shish (INSERT)
- **R**ead - Ma'lumotni o'qish/olish (SELECT)
- **U**pdate - Ma'lumotni yangilash (UPDATE)
- **D**elete - Ma'lumotni o'chirish (DELETE)

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON:** Ma'lumotlar bazasi haqida o'ylamasdan, barcha ma'lumotlarni tortib olib, JavaScript'da filtrlash.
\`\`\`javascript
// 10 million qator ma'lumotni olib kelib, xotirani to'ldirib yuborish
const allUsers = await db.query("SELECT * FROM users");
const activeUsers = allUsers.filter(u => u.isActive);
\`\`\`

**✅ YAXSHI:** SQL'ning o'zida filtrlash (faqat kerakli ma'lumotni olish).
\`\`\`javascript
// Ma'lumotlar bazasining o'zidan faqat aktiv foydalanuvchilarni olish
const activeUsers = await db.query("SELECT * FROM users WHERE is_active = true");
\`\`\`

## 🎤 Intervyu Savollari
1. **SQL nima va u qanday ishlaydi?**
   - RDBMs (Relational Database Management System) bilan ishlash uchun so'rov tili. Ma'lumotlarni jadvallar (tables) ko'rinishida saqlaydi va ular orasida munosabatlar (relations) o'rnatadi.
2. **RDBMS (Relatsion Ma'lumotlar Bazasi) nima?**
   - Ma'lumotlar jadvallarda (qatorlar va ustunlar ko'rinishida) saqlanadigan baza turi (MySQL, PostgreSQL, SQLite).
3. **NoSQL va SQL farqi nima?**
   - SQL qat'iy sxemaga ega, munosabatlarga asoslangan (Jadvallar). NoSQL (masalan, MongoDB) esa hujjatlarga asoslangan (JSON) va sxemasizroq ishlaydi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD
    A[Sizning Dasturingiz] -->|SQL So'rov| B(Ma'lumotlar Bazasi)
    B -->|Javob: Jadvallar| A
    B --> C[(Saqlangan Ma'lumotlar)]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: SQL So'rovni qaytarish",
      instruction: "Quyidagi funksiya oddiy matn ('SELECT') qaytarishi kerak. SQL tili haqida gap ketganda eng ko'p ishlatiladigan so'zni qaytaring.",
      startingCode: "function getSqlWord() {\n  // shu yerga yozing\n  return '';\n}",
      hint: "Faqat 'SELECT' so'zini qaytaring",
      solution: "function getSqlWord() {\n  return 'SELECT';\n}",
      test: "const fn = new Function(code + '; return getSqlWord;')();\nconst res = fn();\nif (res !== 'SELECT') throw new Error(\"'SELECT' qaytarilmadi\");"
    },
    {
      id: 2,
      title: "2-Topshiriq: CRUD - Create",
      instruction: "CRUD dagi Create amali uchun qaysi SQL buyrug'i ishlatiladi? Funksiya shu buyruqni string sifatida qaytarsin.",
      startingCode: "function getCreateCommand() {\n  return '';\n}",
      hint: "INSERT buyrug'ini qaytaring.",
      solution: "function getCreateCommand() {\n  return 'INSERT';\n}",
      test: "const fn = new Function(code + '; return getCreateCommand;')();\nconst res = fn();\nif (res !== 'INSERT') throw new Error(\"'INSERT' qaytarilmadi\");"
    },
    {
      id: 3,
      title: "3-Topshiriq: CRUD - Read",
      instruction: "CRUD dagi Read (o'qish) amali uchun SQL'da qaysi buyruq ishlatiladi?",
      startingCode: "function getReadCommand() {\n  return '';\n}",
      hint: "SELECT buyrug'ini qaytaring.",
      solution: "function getReadCommand() {\n  return 'SELECT';\n}",
      test: "const fn = new Function(code + '; return getReadCommand;')();\nconst res = fn();\nif (res !== 'SELECT') throw new Error(\"'SELECT' qaytarilmadi\");"
    },
    {
      id: 4,
      title: "4-Topshiriq: CRUD - Update",
      instruction: "CRUD dagi Update amali uchun SQL'da qaysi buyruq ishlatiladi?",
      startingCode: "function getUpdateCommand() {\n  return '';\n}",
      hint: "UPDATE buyrug'ini qaytaring.",
      solution: "function getUpdateCommand() {\n  return 'UPDATE';\n}",
      test: "const fn = new Function(code + '; return getUpdateCommand;')();\nconst res = fn();\nif (res !== 'UPDATE') throw new Error(\"'UPDATE' qaytarilmadi\");"
    },
    {
      id: 5,
      title: "5-Topshiriq: CRUD - Delete",
      instruction: "CRUD dagi Delete amali uchun SQL'da qaysi buyruq ishlatiladi?",
      startingCode: "function getDeleteCommand() {\n  return '';\n}",
      hint: "DELETE buyrug'ini qaytaring.",
      solution: "function getDeleteCommand() {\n  return 'DELETE';\n}",
      test: "const fn = new Function(code + '; return getDeleteCommand;')();\nconst res = fn();\nif (res !== 'DELETE') throw new Error(\"'DELETE' qaytarilmadi\");"
    },
    {
      id: 6,
      title: "6-Topshiriq: RDBMS ma'nosi",
      instruction: "RDBMS so'zining kengaytmasini to'g'ri qaytaring. (Relational Database Management System)",
      startingCode: "function getRDBMS() {\n  return '';\n}",
      hint: "Katta harflar yoki kichik harflarda 'Relational Database Management System' deb qaytaring.",
      solution: "function getRDBMS() {\n  return 'Relational Database Management System';\n}",
      test: "const fn = new Function(code + '; return getRDBMS;')();\nconst res = fn().toLowerCase();\nif (res !== 'relational database management system') throw new Error(\"Noto'g'ri kengaytma\");"
    },
    {
      id: 7,
      title: "7-Topshiriq: SQL kengaytmasi",
      instruction: "SQL qanday so'zlarning qisqartmasi hisoblanadi? (Structured Query Language)",
      startingCode: "function getSQLMeaning() {\n  return '';\n}",
      hint: "Structured Query Language deb qaytaring.",
      solution: "function getSQLMeaning() {\n  return 'Structured Query Language';\n}",
      test: "const fn = new Function(code + '; return getSQLMeaning;')();\nif (fn().toLowerCase() !== 'structured query language') throw new Error(\"Xato ma'no!\");"
    },
    {
      id: 8,
      title: "8-Topshiriq: Ma'lumotlarni qanday formatda saqlaydi?",
      instruction: "Relatsion bazalar ma'lumotlarni qanday saqlaydi? 'Tables' (Jadvallar) so'zini qaytaring.",
      startingCode: "function getStorageFormat() {\n  return '';\n}",
      hint: "'Tables' so'zini qaytaring.",
      solution: "function getStorageFormat() {\n  return 'Tables';\n}",
      test: "const fn = new Function(code + '; return getStorageFormat;')();\nif (fn().toLowerCase() !== 'tables') throw new Error(\"Tables deb qaytarilishi kerak\");"
    },
    {
      id: 9,
      title: "9-Topshiriq: Ma'lumotlar bazasi turlari",
      instruction: "Agar baza 'Tables' ishlatmasa, uni odatda qanday ataymiz? 'NoSQL' so'zini qaytaring.",
      startingCode: "function getNonRelational() {\n  return '';\n}",
      hint: "'NoSQL' so'zini qaytaring.",
      solution: "function getNonRelational() {\n  return 'NoSQL';\n}",
      test: "const fn = new Function(code + '; return getNonRelational;')();\nif (fn().toLowerCase() !== 'nosql') throw new Error(\"NoSQL deb qaytarilishi kerak\");"
    },
    {
      id: 10,
      title: "10-Topshiriq: Eng mashhur bazalardan biri",
      instruction: "Eng mashhur ochiq kodli SQL bazalaridan birining nomini qaytaring (masalan 'PostgreSQL' yoki 'MySQL').",
      startingCode: "function getDBName() {\n  return '';\n}",
      hint: "'PostgreSQL' yoki 'MySQL' deb qaytaring.",
      solution: "function getDBName() {\n  return 'PostgreSQL';\n}",
      test: "const fn = new Function(code + '; return getDBName;')();\nconst res = fn().toLowerCase();\nif (!['postgresql', 'mysql'].includes(res)) throw new Error(\"MySQL yoki PostgreSQL kutilgandi\");"
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
      explanation: "SQL relatsion ma'lumotlar bazasini boshqarish va unga so'rov yuborish uchun ishlatiladi."
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
      question: "CRUD dagi 'C' nimani anglatadi?",
      options: ["Connect", "Change", "Create", "Copy"],
      correctAnswer: 2,
      explanation: "CRUD dagi C - Create, ya'ni yangi ma'lumot yaratish (INSERT) ni bildiradi."
    },
    {
      id: 5,
      question: "CRUD dagi 'R' nimani anglatadi?",
      options: ["Read", "Remove", "Replace", "Restore"],
      correctAnswer: 0,
      explanation: "R - Read, ya'ni ma'lumotlarni o'qish (SELECT) ni bildiradi."
    },
    {
      id: 6,
      question: "Quyidagilardan qaysi biri NoSQL bazaga kiradi?",
      options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
      correctAnswer: 2,
      explanation: "MongoDB hujjatlarga asoslangan (document-based) NoSQL baza hisoblanadi."
    },
    {
      id: 7,
      question: "SQL bazalari ma'lumotni asosan qanday formatda saqlaydi?",
      options: ["JSON fayllarda", "Jadvallar (Tables) ko'rinishida", "Graf shaklida", "Faqat rasm ko'rinishida"],
      correctAnswer: 1,
      explanation: "SQL bazalari ma'lumotlarni qator va ustunlardan iborat jadvallarda saqlaydi."
    },
    {
      id: 8,
      question: "Qaysi amal ma'lumotni o'chirish uchun ishlatiladi?",
      options: ["DELETE", "DROP", "REMOVE", "ERASE"],
      correctAnswer: 0,
      explanation: "Ma'lumotlar qatorini o'chirish uchun DELETE ishlatiladi."
    },
    {
      id: 9,
      question: "Qaysi amal ma'lumotni yangilash uchun ishlatiladi?",
      options: ["CHANGE", "MODIFY", "UPDATE", "SET"],
      correctAnswer: 2,
      explanation: "Mavjud ma'lumotni o'zgartirish uchun UPDATE buyrug'i ishlatiladi."
    },
    {
      id: 10,
      question: "Ma'lumotlar bazasida sxema (schema) nima?",
      options: ["Ma'lumotlar strukturasi va qoidalari", "Baza paroli", "Dasturchi ismi", "Faqat jadvalning rangi"],
      correctAnswer: 0,
      explanation: "Sxema - bu ma'lumotlar bazasining qanday tuzilganligi, jadvallar va ulardagi ustunlar qoidalari majmuasi."
    },
    {
      id: 11,
      question: "SQL dasturlash tilimi?",
      options: ["Ha, u to'laqonli dasturlash tili", "Yo'q, u faqat so'rovlar (query) tili", "U brauzer tili", "U faqat matematik tili"],
      correctAnswer: 1,
      explanation: "SQL asosan Query Language (so'rov tili), u to'laqonli (Turing complete) an'anaviy dasturlash tili emas (garchi uning ba'zi kengaytmalarida shartlar bo'lsa ham)."
    },
    {
      id: 12,
      question: "Nima uchun JavaScriptda to'g'ridan to'g'ri bazani filter qilish yomon amaliyot?",
      options: ["Chunki JS juda sekin", "Barcha ma'lumotlarni xotiraga tortish serverni qotirib qo'yadi", "SQL arzonroq", "Mumkin emas, JS buni qila olmaydi"],
      correctAnswer: 1,
      explanation: "Barcha millionlab qatorlarni JSga yuklab, keyin filter qilish Memory (xotira) to'lishiga olib keladi. Filter SQLning o'zida bajarilishi kerak."
    }
  ]
};
