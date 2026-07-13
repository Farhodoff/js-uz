export const sqlIntro = {
  id: "sql_intro",
  title: "SQL Kirish (Introduction)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)
Tasavvur qiling, ma'lumotlar bazasi (Database) - bu ulkan va juda tartibli kutubxona. SQL (Structured Query Language) - bu kutubxonachiga nima qilish kerakligini aytadigan maxsus tildir.

Siz kutubxonachiga: "Menga 2020-yilda yozilgan va O'zbekiston haqidagi barcha kitoblarni olib kel", desangiz u sizga aynan shularni olib keladi. Agar siz SQL o'rniga JavaScript-da (yomon yondashuv bilan) ishlasangiz, siz kutubxonachiga: "Kutubxonadagi 10 millionta kitobni hammasini uyimga olib kel", deysiz va uyda o'zingiz ularni bitta-bitta qarab, keraklisini ajratasiz. Bu naqadar absurd bo'lsa, ma'lumotlar bazasidan hamma narsani yuklab olib keyin JavaScript-da \`filter\` qilish ham shunday absurd va xotira (RAM) uchun halokatlidir.

SQL orqali biz asosan **CRUD** amallarini bajaramiz:
- **C**reate - Yangi ma'lumot qo'shish (INSERT)
- **R**ead - Ma'lumotni o'qish/olish (SELECT)
- **U**pdate - Ma'lumotni yangilash (UPDATE)
- **D**elete - Ma'lumotni o'chirish (DELETE)

## 2. 🧠 Chuqur O'rganish (Deep Dive)
### RDBMS Arxitekturasi va PostgreSQL Inernals
RDBMS (Relational Database Management System) ma'lumotlarni qat'iy sxema asosida (jadvallar ko'rinishida) saqlaydi. Lekin bu jadvallar diskda qanday saqlanadi?

**Memory va Storage:**
PostgreSQL kabi tizimlar ma'lumotlarni *Page* (sahifa) deb ataluvchi bloklarda (odatda 8KB) saqlaydi. So'rov berilganda, PostgreSQL kerakli *Page* ni diskdan xotiraga (Shared Buffers) yuklaydi. Disk I/O (kiritish/chiqarish) juda sekin jarayon bo'lgani uchun, bazani to'g'ri loyihalash (indekslar yaratish) orqali biz qaysi *Page* ni diskdan o'qishni oldindan aniqlab, qolgan keraksiz millionlab *Page* larni o'qishdan saqlanamiz.

**Query Execution (So'rov qanday ishlaydi):**
1. **Parser:** Siz yozgan SQL so'rovni tahlil qilib, Syntax Tree yasaydi.
2. **Analyzer:** Jadval nomi to'g'rimi, ustunlar bormi tekshiradi.
3. **Planner/Optimizer:** Ma'lumotni qanday qilib eng tez olishni (qaysi indeksni ishlatishni) hisoblab chiqib, *Execution Plan* tuzadi. (Bunda Cost-based optimization qo'llaniladi).
4. **Executor:** Planni ishga tushirib, natijani qaytaradi.

## 3. ⚠️ Edge Cases va Senior Intervyu Savollari

**Senior Intervyu Savoli 1:** "NoSQL (masalan, MongoDB) SQL (PostgreSQL) dan ko'ra tezroq degan fikrga qo'shilasizmi?"
**Javob:** Yo'q, bu noto'g'ri tushuncha. Ikkisi turli xil muammolarni hal qilish uchun yaratilgan. Agar ma'lumotlar aniq sxemaga ega bo'lsa va ko'p 'JOIN' amallari kerak bo'lsa, yaxshi optimizatsiya qilingan PostgreSQL, MongoDB-dan ko'ra tezroq ishlaydi. NoSQL ko'proq sxemasiz, tez o'zgaruvchan yoki ierarxik tuzilmadagi ma'lumotlar (JSON) uchun qulay.

**Senior Intervyu Savoli 2:** "Nima uchun \`SELECT *\` ishlatish ishlab chiqarish (production) muhitida yomon amaliyot hisoblanadi?"
**Javob:** Ikkita sababi bor. 1) Xotira va Tarmoq: Bizga kerak bo'lmagan ustunlarni ham diskdan xotiraga, undan esa tarmoq orqali dasturimizga olib kelish ortiqcha resurs talab qiladi. 2) Index-only scan ishlamasligi: Agar so'rov aniq ustunlarni so'rasa, baza faqat indeksning o'zini o'qib javob qaytarishi mumkin (juda tez), \`SELECT *\` holatida esa doim jadvalga murojaat qilinadi.

## 🛠️ Ma'lumotlar Bazasi va Dastur Munosabati

\`\`\`mermaid
graph TD
    A[Node.js / Express Dastur] -->|1. SQL So'rov| B(PostgreSQL - Parser & Optimizer)
    B -->|2. Execution Plan| C{Shared Buffers / RAM}
    C -->|3. Cache Miss holatida| D[(Disk / SSD)]
    D -->|4. Page larni yuklash| C
    C -->|5. Tayyor Natija| A
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
      title: "9-Topshiriq: Ma'lumotlar bazasi sahifalari",
      instruction: "PostgreSQL ma'lumotlarni diskda qanday ataluvchi bloklarda saqlaydi? 'Page' so'zini qaytaring.",
      startingCode: "function getDbBlockName() {\n  return '';\n}",
      hint: "'Page' so'zini qaytaring.",
      solution: "function getDbBlockName() {\n  return 'Page';\n}",
      test: "const fn = new Function(code + '; return getDbBlockName;')();\nif (fn().toLowerCase() !== 'page') throw new Error(\"Page deb qaytarilishi kerak\");"
    },
    {
      id: 10,
      title: "10-Topshiriq: Yomon amaliyot",
      instruction: "Barcha ustunlarni tanlash uchun ishlatiladigan va production-da yomon amaliyot hisoblangan buyruqni qaytaring. ('SELECT *')",
      startingCode: "function getBadPracticeCommand() {\n  return '';\n}",
      hint: "'SELECT *' deb qaytaring.",
      solution: "function getBadPracticeCommand() {\n  return 'SELECT *';\n}",
      test: "const fn = new Function(code + '; return getBadPracticeCommand;')();\nif (fn() !== 'SELECT *') throw new Error(\"SELECT * kutilgandi\");"
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
      question: "PostgreSQL ma'lumotlarni diskda asosan qanday o'lchamli bloklarda saqlaydi?",
      options: ["1 MB fayllar", "8 KB Page'lar", "Bitta katta fayl", "Faqat RAM'da"],
      correctAnswer: 1,
      explanation: "PostgreSQL ma'lumotlarni 8KB o'lchamdagi Page larda diskda saqlaydi."
    },
    {
      id: 8,
      question: "Query Execution Plan nima?",
      options: ["Dasturlash tili turi", "So'rovni eng optimal tarzda qanday bajarish strategiyasi", "Baza paroli", "Tarmoq xatosi"],
      correctAnswer: 1,
      explanation: "Optimizer SQL so'rovni tahlil qilib, uni eng kam xarajat bilan (tez) bajarish uchun Execution Plan tuzadi."
    },
    {
      id: 9,
      question: "Nega 'SELECT *' production muhitida yomon amaliyot hisoblanadi?",
      options: ["Sintaksis xato", "U hech qachon ishlamaydi", "Keraksiz ma'lumotlarni ham olib kelib xotira va tarmoqni band qiladi", "U SQL standartiga kirmaydi"],
      correctAnswer: 2,
      explanation: "Ortiqcha ustunlarni so'rash tarmoq, xotira va Disk I/O resurslarini behuda isrof qiladi."
    },
    {
      id: 10,
      question: "SQL so'rovi qayta ishlashning birinchi bosqichida qaysi qism ishlaydi?",
      options: ["Parser", "Executor", "Cache", "SSD"],
      correctAnswer: 0,
      explanation: "Birinchi bo'lib Parser SQL so'rovini o'qib, uni kompyuter tushunadigan Syntax Tree'ga o'giradi."
    },
    {
      id: 11,
      question: "SQL dasturlash tilimi?",
      options: ["Ha, u to'laqonli dasturlash tili", "Yo'q, u maxsus so'rov (query) tili", "U brauzer tili", "U faqat matematik tili"],
      correctAnswer: 1,
      explanation: "SQL an'anaviy ma'noda (Turing complete) dasturlash tili emas, balki ma'lumotlar bilan ishlashga ixtisoslashgan so'rov tilidir."
    },
    {
      id: 12,
      question: "Nima uchun ma'lumotlarni JavaScript-da emas, SQL-ning o'zida (WHERE orqali) filtrlash kerak?",
      options: ["JS buni uddalay olmaydi", "JS juda sekin tillar qatoriga kiradi", "Barcha ma'lumotlarni RAM'ga tortish halokatli bo'lishi mumkin", "SQL qisqaroq yoziladi"],
      correctAnswer: 2,
      explanation: "Katta bazadan hamma ma'lumotni dasturga olib kelish xotira (RAM) ni to'ldirib, dasturni qulatishi mumkin. Shuning uchun filtrlash doim bazaning o'zida bo'lishi kerak."
    }
  ]
};
