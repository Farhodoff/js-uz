export const sqlBasics = {
  id: "sql_basics",
  title: "SQL Asoslari (CREATE, INSERT, UPDATE, DELETE)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, ma'lumotlar bazasi (database) bu ulkan bir kutubxona. Jadvallar (tables) esa kutubxonadagi kitob javonlari.
Bizga bu javonlarni boshqarish uchun SQL (Structured Query Language) kerak bo'ladi.
Asosiy 4 ta amal CRUD deb ataladi:
- **CREATE (Yaratish):** Yangi bo'sh javon yasash (masalan, \\\`CREATE TABLE\\\`).
- **READ (O'qish):** Javondan kerakli kitobni topib olish (\\\`SELECT\\\`).
- **UPDATE (Yangilash):** Kitobning muqovasini yoki nomini o'zgartirish (\\\`UPDATE\\\`).
- **DELETE (O'chirish):** Kitobni javondan butunlay uloqtirish (\\\`DELETE\\\`).

SQL tilidagi DML (Data Manipulation Language) buyruqlari yordamida biz jadvaldagi yozuvlar bilan ishlaymiz.

## 2. 🚀 Chuqurlashtirilgan O'rganish (Deep Dive)

Baza qanday qilib yozuvlarni topadi va o'zgartiradi?

- **Sequential Scan (Ketma-ket qidiruv):** Agar sizda millionlab qatorlar bo'lsa va siz birgina \\\`id = 500\\\` bo'lgan yozuvni izlasangiz (\\\`UPDATE users SET name = 'Ali' WHERE id = 500\\\`), indeks bo'lmagan holatda, baza noldan boshlab har bir qatorni tekshirib chiqadi. Bu juda sekin.
- **Index Scan (Indeksli qidiruv):** Xuddi kitobning oxiridagi mundarija kabi, \\\`id\\\` ustuni indekslangan bo'lsa (Primary Key avtomatik indekslanadi), baza kerakli qatorni O(log N) tezlikda B-Tree tuzilmasi orqali topadi va faqat o'sha qatorni o'zgartiradi yoki o'chiradi.
- **Planner/Optimizer:** Har qanday so'rovdan oldin, bazaning rejalashtiruvchisi (Query Planner) eng tez bajarilish yo'lini tanlaydi. Masalan, qaysi indeksni ishlatish yoki jadval kichik bo'lsa indeskni chetlab o'tishni o'zi hal qiladi.
- **Performance (Ishlash tezligi):** \\\`UPDATE\\\` va \\\`DELETE\\\` buyruqlari bazada eski yozuvni saqlab qolib, yangisini yozadi (PostgreSQL'da MVCC sababli). Shuning uchun tez-tez \\\`UPDATE\\\` bo'ladigan jadvallarda "Dead Tuples" (o'lik qatorlar) ko'payib ketadi va ularni \\\`VACUUM\\\` orqali tozalash kerak.

## 3. ⚠️ Chekka Holatlar va Senior Intervyu Savollari (Edge Cases & Interview Questions)

1. **WHERE shartini esdan chiqarish:**
   Eng keng tarqalgan xato! Agar siz \\\`UPDATE users SET status = 'active'\\\` deb yozsangiz, barcha foydalanuvchilar active bo'lib qoladi. Har doim tranzaksiyadan foydalaning (\\\`BEGIN; ... COMMIT;\\\`) va shartni tekshiring.
2. **DELETE vs TRUNCATE vs DROP farqi nima?**
   - \\\`DELETE\\\`: DML buyruq. Qatorlarni birma-bir o'chiradi (WHERE qabul qiladi), MVCC'da eski versiyalarni qoldiradi. Tranzaksiya ichida orqaga qaytarish (Rollback) mumkin. Sekinroq.
   - \\\`TRUNCATE\\\`: DDL buyruq. Jadval faylini to'g'ridan-to'g'ri tozalaydi, juda tez. WHERE ishlamaydi.
   - \\\`DROP\\\`: DDL buyruq. Jadvalni strukturasigacha yo'q qiladi.
3. **Primary Key nima va U qanday saqlanadi?**
   - Har bir qatorning noyob identifikatori. Baza avtomatik ravishda Primary Key uchun B-Tree indeks yaratadi, shuning uchun \\\`WHERE id = ?\\\` doim tez ishlaydi.
4. **Agar bir vaqtda 2 kishi bitta qatorni UPDATE qilsa nima bo'ladi?**
   - Baza Qulflash (Row-level lock) mexanizmini ishlatadi. Birinchi boshlagan tranzaksiya qatorni band qiladi, ikkinchisi u tugamaguncha kutib turadi.

## 📊 Jarayonlar Sxemasi

\\\`\\\`\\\`mermaid
flowchart TD
    A[SQL Asoslari] --> B(DDL: Data Definition)
    A --> C(DML: Data Manipulation)
    B --> D[CREATE TABLE]
    B --> E[DROP TABLE]
    B --> F[TRUNCATE]
    C --> G[INSERT INTO]
    C --> H[UPDATE SET]
    C --> I[DELETE FROM]
    H --> J{WHERE sharti bormi?}
    I --> J
    J -- Yoq --> K[XAVFLI: Butun jadval ozgaradi]
    J -- Ha --> L[XAVFSIZ: Kerakli qatorlar ozgaradi]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Jadval yaratish",
      instruction: "Yangi jadval yaratish uchun qaysi ikkita kalit so'z ishlatiladi?",
      startingCode: "function getCreateTable() {\n  return '';\n}",
      hint: "CREATE TABLE deb qaytaring.",
      solution: "function getCreateTable() {\n  return 'CREATE TABLE';\n}",
      test: "const fn = new Function(code + '; return getCreateTable;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'CREATE TABLE') throw new Error(\"CREATE TABLE kutilgandi\");"
    },
    {
      id: 2,
      title: "2-Topshiriq: Ma'lumot qo'shish",
      instruction: "Jadvalga yangi qator qo'shish uchun qaysi kalit so'z ishlatiladi?",
      startingCode: "function getInsertInto() {\n  return '';\n}",
      hint: "INSERT INTO",
      solution: "function getInsertInto() {\n  return 'INSERT INTO';\n}",
      test: "const fn = new Function(code + '; return getInsertInto;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'INSERT INTO') throw new Error(\"INSERT INTO kutilgandi\");"
    },
    {
      id: 3,
      title: "3-Topshiriq: Qiymatlar",
      instruction: "INSERT INTO da qiymatlarni ko'rsatish uchun qaysi so'z kerak?",
      startingCode: "function getValues() {\n  return '';\n}",
      hint: "VALUES so'zini qaytaring.",
      solution: "function getValues() {\n  return 'VALUES';\n}",
      test: "const fn = new Function(code + '; return getValues;')();\nif (fn().toUpperCase() !== 'VALUES') throw new Error(\"VALUES kutilgandi\");"
    },
    {
      id: 4,
      title: "4-Topshiriq: Ma'lumotni yangilash",
      instruction: "Mavjud qatordagi ma'lumotni o'zgartirish (yangilash) buyrug'i nima?",
      startingCode: "function getUpdate() {\n  return '';\n}",
      hint: "UPDATE so'zini qaytaring.",
      solution: "function getUpdate() {\n  return 'UPDATE';\n}",
      test: "const fn = new Function(code + '; return getUpdate;')();\nif (fn().toUpperCase() !== 'UPDATE') throw new Error(\"UPDATE kutilgandi\");"
    },
    {
      id: 5,
      title: "5-Topshiriq: O'zgartirishni o'rnatish",
      instruction: "UPDATE buyrug'idan so'ng yangi qiymatni o'rnatish so'zi nima?",
      startingCode: "function getSet() {\n  return '';\n}",
      hint: "SET so'zini qaytaring.",
      solution: "function getSet() {\n  return 'SET';\n}",
      test: "const fn = new Function(code + '; return getSet;')();\nif (fn().toUpperCase() !== 'SET') throw new Error(\"SET kutilgandi\");"
    },
    {
      id: 6,
      title: "6-Topshiriq: Ma'lumotni o'chirish",
      instruction: "Jadvaldan qatorni o'chirish buyrug'i nima?",
      startingCode: "function getDeleteFrom() {\n  return '';\n}",
      hint: "DELETE FROM deb qaytaring.",
      solution: "function getDeleteFrom() {\n  return 'DELETE FROM';\n}",
      test: "const fn = new Function(code + '; return getDeleteFrom;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'DELETE FROM') throw new Error(\"DELETE FROM kutilgandi\");"
    },
    {
      id: 7,
      title: "7-Topshiriq: Shart berish",
      instruction: "UPDATE va DELETE buyruqlarida qaysi qatorlarga ta'sir qilishini cheklash uchun qaysi so'z O'TA MUHIM?",
      startingCode: "function getWhere() {\n  return '';\n}",
      hint: "WHERE so'zini qaytaring.",
      solution: "function getWhere() {\n  return 'WHERE';\n}",
      test: "const fn = new Function(code + '; return getWhere;')();\nif (fn().toUpperCase() !== 'WHERE') throw new Error(\"WHERE kutilgandi\");"
    },
    {
      id: 8,
      title: "8-Topshiriq: Jadvalni yo'q qilish",
      instruction: "Butun jadvalni struktura va ma'lumotlari bilan bazadan yo'q qilish buyrug'i nima?",
      startingCode: "function getDropTable() {\n  return '';\n}",
      hint: "DROP TABLE",
      solution: "function getDropTable() {\n  return 'DROP TABLE';\n}",
      test: "const fn = new Function(code + '; return getDropTable;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'DROP TABLE') throw new Error(\"DROP TABLE kutilgandi\");"
    },
    {
      id: 9,
      title: "9-Topshiriq: Jadvalni tozalash",
      instruction: "Jadvalning barcha qatorlarini eng tez o'chiradigan (WHERE siz) buyruq qaysi?",
      startingCode: "function getTruncate() {\n  return '';\n}",
      hint: "TRUNCATE",
      solution: "function getTruncate() {\n  return 'TRUNCATE';\n}",
      test: "const fn = new Function(code + '; return getTruncate;')();\nif (fn().toUpperCase() !== 'TRUNCATE') throw new Error(\"TRUNCATE kutilgandi\");"
    },
    {
      id: 10,
      title: "10-Topshiriq: Til qisqartmalari",
      instruction: "CREATE, DROP kabi buyruqlar guruhini ifodalovchi qisqartma (uchta harf) nima?",
      startingCode: "function getDDL() {\n  return '';\n}",
      hint: "DDL",
      solution: "function getDDL() {\n  return 'DDL';\n}",
      test: "const fn = new Function(code + '; return getDDL;')();\nif (fn().toUpperCase() !== 'DDL') throw new Error(\"DDL kutilgandi\");"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL da jadval (table) yaratish uchun qaysi kalit so'z ishlatiladi?",
      options: ["NEW TABLE", "CREATE TABLE", "MAKE TABLE", "ADD TABLE"],
      correctAnswer: 1,
      explanation: "Yangi jadval CREATE TABLE orqali yaratiladi."
    },
    {
      id: 2,
      question: "Bazada ma'lumotlar bilan ishlashning asosi CRUD. Uning kengaytmasi nima?",
      options: ["Create, Read, Update, Delete", "Copy, Run, Use, Drop", "Change, Read, Undo, Drop", "Create, Remove, Update, Drop"],
      correctAnswer: 0,
      explanation: "CRUD = Create (yaratish), Read (o'qish), Update (yangilash), Delete (o'chirish)."
    },
    {
      id: 3,
      question: "Jadvalga yangi ma'lumot (qator) qo'shish qaysi buyruq orqali qilinadi?",
      options: ["ADD INTO", "INSERT INTO", "APPEND", "PUT"],
      correctAnswer: 1,
      explanation: "Yangi qatorlar qo'shish uchun INSERT INTO ishlatiladi."
    },
    {
      id: 4,
      question: "Mavjud ma'lumotni yangilash uchun qaysi so'zdan foydalanamiz?",
      options: ["MODIFY", "CHANGE", "UPDATE", "ALTER"],
      correctAnswer: 2,
      explanation: "Ma'lumotni yangilash buyrug'i UPDATE hisoblanadi."
    },
    {
      id: 5,
      question: "UPDATE yoki DELETE yozayotganda, barcha qatorlar o'zgarib ketmasligi uchun nima shart?",
      options: ["Nuqtali vergul qoyish", "WHERE sharti", "SELECT ni ishlatish", "LIMIT berish"],
      correctAnswer: 1,
      explanation: "WHERE sharti qaysi qator o'zgarishi kerakligini bildiradi. U siz butun jadval xavf ostida qoladi."
    },
    {
      id: 6,
      question: "Qatorlarni birma-bir o'chirish uchun qaysi buyruq mos?",
      options: ["DELETE FROM", "REMOVE", "DROP", "ERASE"],
      correctAnswer: 0,
      explanation: "DELETE FROM orqali qatorlarni shart asosida o'chirish mumkin."
    },
    {
      id: 7,
      question: "TRUNCATE va DELETE ning asosiy farqi nimada?",
      options: ["Farqi yo'q", "DELETE butun faylni yo'q qiladi", "TRUNCATE qatorlarni juda tez o'chiradi, WHERE ishlatilmaydi", "TRUNCATE jadvalni strukturasini ham o'chiradi"],
      correctAnswer: 2,
      explanation: "TRUNCATE juda tez tozalamoqchi bo'lganda qo'llaniladi va WHERE shartsiz ishlaydi."
    },
    {
      id: 8,
      question: "DROP TABLE nima ish qiladi?",
      options: ["Faqat ma'lumotni tozalaydi", "Jadval nomini o'zgartiradi", "Jadvaldan ustunni olib tashlaydi", "Jadvalni strukturasi bilan bazadan yo'q qiladi"],
      correctAnswer: 3,
      explanation: "DROP TABLE jadvalni butunlay bazadan o'chiradi."
    },
    {
      id: 9,
      question: "DML nima?",
      options: ["Data Moving Logic", "Data Manipulation Language", "Database Model Logic", "Dynamic Master Language"],
      correctAnswer: 1,
      explanation: "DML - INSERT, UPDATE, DELETE ni o'z ichiga olgan Data Manipulation Language."
    },
    {
      id: 10,
      question: "DDL qaysi buyruqlarni o'z ichiga oladi?",
      options: ["INSERT, UPDATE, DELETE", "CREATE, DROP, ALTER", "SELECT, JOIN", "GRANT, REVOKE"],
      correctAnswer: 1,
      explanation: "DDL - Data Definition Language, bazani va jadvallarni tuzilishini belgilaydi."
    },
    {
      id: 11,
      question: "Index Scan ning foydasi nimada?",
      options: ["Jadvalni sekin o'qiydi", "Har bir qatorni boshidan oxirigacha tekshiradi", "Qatorlarni tezkor (O(log N)) topishga yordam beradi", "Ma'lumotni arxivlaydi"],
      correctAnswer: 2,
      explanation: "Index xuddi kitob mundarijasi kabi ishlaydi, so'rovlarni juda tezlashtiradi."
    },
    {
      id: 12,
      question: "Primary Key nima?",
      options: ["Jadvaldagi barcha ma'lumotlar", "Xavfsizlik paroli", "Har bir qatorni noyob aniqlovchi kalit ustun", "Faqat raqamlardan iborat bo'lishi shart bo'lgan satr"],
      correctAnswer: 2,
      explanation: "Primary Key - bu qatorlarning ID raqami bo'lib, takrorlanmasligini kafolatlaydi."
    }
  ]
};
