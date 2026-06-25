export const sqlModifications = {
  id: "sql_modifications",
  title: "SQL Ma'lumotlarni O'zgartirish (INSERT, UPDATE, DELETE)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Ma'lumotlar bazasida (DB) ma'lumotlarni nafaqat o'qish (SELECT), balki ularni yozish, tahrirlash va o'chirish ham mumkin. Ushbu operatsiyalar **DML** (Data Manipulation Language) deyiladi:
- **INSERT**: Yangi ma'lumot (qator) qo'shish.
- **UPDATE**: Mavjud ma'lumotni o'zgartirish.
- **DELETE**: Mavjud ma'lumotni o'chirib tashlash.

Tasavvur qiling, ma'lumotlar bazasi xuddi Excel jadvali:
- \`INSERT\` - yangi qator yozish.
- \`UPDATE\` - qatordagi biron katakchani o'zgartirish.
- \`DELETE\` - butun qatorni o'chirish.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON (UPDATE va DELETE amallarini WHERE shartizsiz ishlatish):**
\`\`\`sql
-- DIQQAT! Bu butun jadvaldagi barcha yozuvlarni o'chirib yuboradi!
DELETE FROM users;

-- Bu barcha foydalanuvchilarning parolini '123' qilib qo'yadi!
UPDATE users SET password = '123';
\`\`\`

**✅ YAXSHI (Doim WHERE shartini qo'shing):**
\`\`\`sql
-- Faqat id=5 bo'lgan foydalanuvchini o'chirish
DELETE FROM users WHERE id = 5;

-- Faqat id=10 bo'lgan foydalanuvchining parolini yangilash
UPDATE users SET password = '123' WHERE id = 10;
\`\`\`

## 🎤 Intervyu Savollari

1. **INSERT, UPDATE, DELETE nima?**
   - *Javob*: Bu SQL dagi DML (Data Manipulation Language) komandalari bo'lib, bazaga ma'lumot qo'shish, o'zgartirish va o'chirish uchun ishlatiladi.
2. **DELETE va TRUNCATE farqi nima?**
   - *Javob*: DELETE yozuvlarni birma-bir o'chiradi va shart (WHERE) qo'yish mumkin, TRUNCATE esa jadvalni butunlay tozalaydi, WHERE sharti ishlamaydi va DELETE ga qaraganda tezroq ishlaydi.
3. **RETURNING (yoki OUTPUT) qanday ishlaydi?**
   - *Javob*: PostgreSQL (va ba'zi boshqa DB larda) yozish, o'chirish yoki o'zgartirish amali bajarilgandan so'ng qayta natijani o'qib olish (masalan, yangi qo'shilgan qatorning ID sini olish) uchun \`RETURNING\` kalit so'zi ishlatiladi.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[SQL So'rovi] --> B{Amal turi}
    B -- INSERT --> C[Yangi qator qo'shiladi]
    B -- UPDATE --> D[Ma'lumot yangilanadi]
    B -- DELETE --> E[Qator o'chiriladi]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Yangi ma'lumot qo'shish (INSERT)",
      instruction: "\`users\` jadvaliga \`name\` va \`age\` ustunlari bilan ma'lumot qo'shuvchi SQL so'rovini qaytaruvchi \`insertUser\` funksiyasini yozing. Matnli qiymatlar bir tirnoq ichida bo'lishi kerak.",
      startingCode: "function insertUser(name, age) {\n  \n}",
      hint: "INSERT INTO users (name, age) VALUES ('Qiymat', Son);",
      solution: "function insertUser(name, age) {\n  return `INSERT INTO users (name, age) VALUES ('${name}', ${age});`;\n}",
      test: "const fn = new Function(code + '; return insertUser;')(); \nif (fn('Ali', 25).trim().toUpperCase() !== \"INSERT INTO USERS (NAME, AGE) VALUES ('ALI', 25);\") throw new Error('Xato so\\'rov qaytdi');"
    },
    {
      id: 2,
      title: "Bir nechta yozuv qo'shish",
      instruction: "Bir nechta yozuvlarni birdaniga qo'shish so'rovini qaytaradigan \`insertMultiple\` funksiyasini yozing. U \`users(name)\` uchun ikki ismni qo'shsin.",
      startingCode: "function insertMultiple(name1, name2) {\n  \n}",
      hint: "INSERT INTO users (name) VALUES ('ism1'), ('ism2');",
      solution: "function insertMultiple(name1, name2) {\n  return `INSERT INTO users (name) VALUES ('${name1}'), ('${name2}');`;\n}",
      test: "const fn = new Function(code + '; return insertMultiple;')(); \nif (!fn('Ali', 'Vali').toUpperCase().includes(\"('ALI'), ('VALI')\")) throw new Error('Values qismi xato');"
    },
    {
      id: 3,
      title: "Ma'lumotni yangilash (UPDATE)",
      instruction: "\`users\` jadvalidagi \`status\` ni berilgan id bo'yicha yangilaydigan SQL so'rovini qaytaruvchi \`updateStatus\` funksiyasini yozing.",
      startingCode: "function updateStatus(id, newStatus) {\n  \n}",
      hint: "UPDATE users SET status = 'yangi_status' WHERE id = id_raqami;",
      solution: "function updateStatus(id, newStatus) {\n  return `UPDATE users SET status = '${newStatus}' WHERE id = ${id};`;\n}",
      test: "const fn = new Function(code + '; return updateStatus;')(); \nif (fn(5, 'active').trim().toUpperCase() !== \"UPDATE USERS SET STATUS = 'ACTIVE' WHERE ID = 5;\") throw new Error('Xato UPDATE so\\'rovi');"
    },
    {
      id: 4,
      title: "Ko'p ustunni yangilash",
      instruction: "\`users\` jadvalidagi id ga asosan ham \`name\`, ham \`age\` ni yangilaydigan funksiya \`updateUser\` yozing.",
      startingCode: "function updateUser(id, newName, newAge) {\n  \n}",
      hint: "SET ustun1 = 'qiymat1', ustun2 = qiymat2 ...",
      solution: "function updateUser(id, newName, newAge) {\n  return `UPDATE users SET name = '${newName}', age = ${newAge} WHERE id = ${id};`;\n}",
      test: "const fn = new Function(code + '; return updateUser;')(); \nif (!fn(1, 'Hasan', 30).toUpperCase().includes(\"NAME = 'HASAN', AGE = 30\")) throw new Error('SET qismi xato');"
    },
    {
      id: 5,
      title: "Ma'lumotni o'chirish (DELETE)",
      instruction: "\`users\` jadvalidan berilgan id ga asosan foydalanuvchini o'chiruvchi \`deleteUser\` funksiyasini yozing.",
      startingCode: "function deleteUser(id) {\n  \n}",
      hint: "DELETE FROM users WHERE id = ...;",
      solution: "function deleteUser(id) {\n  return `DELETE FROM users WHERE id = ${id};`;\n}",
      test: "const fn = new Function(code + '; return deleteUser;')(); \nif (fn(10).trim().toUpperCase() !== 'DELETE FROM USERS WHERE ID = 10;') throw new Error('Xato DELETE so\\'rovi');"
    },
    {
      id: 6,
      title: "Shart bilan o'chirish",
      instruction: "\`users\` jadvalidagi barcha \`age\` dan kichik bo'lgan yoshlarni o'chiruvchi \`deleteByAge\` funksiyasini yozing.",
      startingCode: "function deleteByAge(maxAge) {\n  \n}",
      hint: "DELETE FROM users WHERE age < maxAge;",
      solution: "function deleteByAge(maxAge) {\n  return `DELETE FROM users WHERE age < ${maxAge};`;\n}",
      test: "const fn = new Function(code + '; return deleteByAge;')(); \nif (fn(18).trim().toUpperCase() !== 'DELETE FROM USERS WHERE AGE < 18;') throw new Error('Xato WHERE sharti');"
    },
    {
      id: 7,
      title: "INSERT va RETURNING",
      instruction: "PostgreSQL da qo'shilgan ma'lumotning id sini qaytarib olish uchun \`RETURNING id\` ishlatiladi. Yangi foydalanuvchi qo'shadigan va id sini qaytaradigan SQL so'rov \`insertAndReturnId(name)\` yozing.",
      startingCode: "function insertAndReturnId(name) {\n  \n}",
      hint: "INSERT INTO ... VALUES (...) RETURNING id;",
      solution: "function insertAndReturnId(name) {\n  return `INSERT INTO users (name) VALUES ('${name}') RETURNING id;`;\n}",
      test: "const fn = new Function(code + '; return insertAndReturnId;')(); \nif (!fn('Jasur').toUpperCase().includes('RETURNING ID')) throw new Error('RETURNING id so\\'zi topilmadi');"
    },
    {
      id: 8,
      title: "Barcha ma'lumotni tozalash",
      instruction: "Barcha ma'lumotlarni WHERE shartizsiz o'chiruvchi xavfli (DELETE FROM) so'rovni qaytaruvchi \`deleteAll\` yozing (faqat jadval nomini parametr sifatida oladi).",
      startingCode: "function deleteAll(tableName) {\n  \n}",
      hint: "DELETE FROM tableName;",
      solution: "function deleteAll(tableName) {\n  return `DELETE FROM ${tableName};`;\n}",
      test: "const fn = new Function(code + '; return deleteAll;')(); \nif (fn('logs').trim().toUpperCase() !== 'DELETE FROM LOGS;') throw new Error('Xato so\\'rov');"
    },
    {
      id: 9,
      title: "INSERT INTO ... SELECT ...",
      instruction: "Bir jadvaldan o'qib ikkinchisiga yozish mumkin. \`old_users\` dan barcha ma'lumotlarni \`new_users\` ga yozuvchi so'rovni qaytaruvchi \`copyUsers\` funksiyasini yozing.",
      startingCode: "function copyUsers() {\n  \n}",
      hint: "INSERT INTO new_users SELECT * FROM old_users;",
      solution: "function copyUsers() {\n  return `INSERT INTO new_users SELECT * FROM old_users;`;\n}",
      test: "const fn = new Function(code + '; return copyUsers;')(); \nif (fn().trim().toUpperCase() !== 'INSERT INTO NEW_USERS SELECT * FROM OLD_USERS;') throw new Error('So\\'rov noto\\'g\\'ri');"
    },
    {
      id: 10,
      title: "TRUNCATE yordamida jadvalni tozalash",
      instruction: "DELETE dan ko'ra tezroq ishlovchi TRUNCATE so'rovini qaytaruvchi \`truncateTable(tableName)\` funksiyasini yozing.",
      startingCode: "function truncateTable(tableName) {\n  \n}",
      hint: "TRUNCATE TABLE tableName;",
      solution: "function truncateTable(tableName) {\n  return `TRUNCATE TABLE ${tableName};`;\n}",
      test: "const fn = new Function(code + '; return truncateTable;')(); \nif (fn('sessions').trim().toUpperCase() !== 'TRUNCATE TABLE SESSIONS;') throw new Error('Xato TRUNCATE so\\'rovi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Ma'lumotlar bazasiga yangi qator qo'shish uchun qaysi SQL operatori ishlatiladi?",
      options: ["ADD", "INSERT", "CREATE", "NEW"],
      correctAnswer: 1,
      explanation: "Yangi ma'lumot qatorini jadvalga qo'shish uchun INSERT INTO operatori ishlatiladi."
    },
    {
      id: 2,
      question: "Jadvaldagi ma'lumotni yangilash uchun nima ishlatiladi?",
      options: ["MODIFY", "CHANGE", "UPDATE", "ALTER"],
      correctAnswer: 2,
      explanation: "Mavjud ma'lumotlarni o'zgartirish uchun UPDATE va SET kalit so'zlari birgalikda ishlatiladi."
    },
    {
      id: 3,
      question: "Agar UPDATE so'rovida WHERE sharti tushirib qoldirilsa nima bo'ladi?",
      options: ["Xato yuz beradi", "Faqat birinchi qator o'zgaradi", "Jadvaldagi barcha qatorlar o'zgarib ketadi", "Hech narsa o'zgarmaydi"],
      correctAnswer: 2,
      explanation: "WHERE sharti bo'lmasa, DB yangilanishni jadvaldagi hamma qatorlarga qo'llaydi. Bu odatda jiddiy xato (bug) hisoblanadi."
    },
    {
      id: 4,
      question: "Qatorlarni o'chirish uchun to'g'ri operatorni toping:",
      options: ["REMOVE FROM", "DELETE FROM", "DROP FROM", "CLEAR"],
      correctAnswer: 1,
      explanation: "Jadvaldan ma'lumot (qator) larni o'chirish uchun DELETE FROM ishlatiladi."
    },
    {
      id: 5,
      question: "DELETE va TRUNCATE o'rtasidagi asosiy farq nimada?",
      options: ["Farqi yo'q", "TRUNCATE WHERE sharti bilan ishlaydi, DELETE esa yo'q", "DELETE sekinroq, ammo WHERE sharti ishlatish mumkin. TRUNCATE jadvalni butunlay tozalaydi va juda tez ishlaydi.", "TRUNCATE faqat ustunlarni o'chiradi"],
      correctAnswer: 2,
      explanation: "TRUNCATE jadvaldagi hamma yozuvlarni o'chiradi, odatda tranzaksiya jurnaliga kamroq yozadi, shuning uchun tezroq ishlaydi. Unda WHERE sharti qatnashmaydi."
    },
    {
      id: 6,
      question: "Yangi kiritilgan ma'lumotning ID sini darhol olish uchun PostgreSQL'da qaysi kalit so'z ishlatiladi?",
      options: ["RETURNING", "OUTPUT", "GET", "FETCH"],
      correctAnswer: 0,
      explanation: "PostgreSQL da INSERT/UPDATE/DELETE oxirida RETURNING ustun_nomi yozib natijani qaytarib olish mumkin."
    },
    {
      id: 7,
      question: "Birdaniga bir nechta qator qo'shish (Bulk Insert) to'g'ri ko'rsatilgan variant:",
      options: ["INSERT INTO users (id) VALUES (1) AND (2)", "INSERT INTO users (id) VALUES (1), (2)", "INSERT INTO users (id) VALUES (1); INSERT (2);", "INSERT MULTIPLE (1), (2) INTO users"],
      correctAnswer: 1,
      explanation: "VALUES so'zidan keyin har bir qator qiymatlari vergul bilan ajratilib qavs ichida yoziladi."
    },
    {
      id: 8,
      question: "Quyidagilardan qaysi biri DML (Data Manipulation Language) ga kirmaydi?",
      options: ["INSERT", "UPDATE", "DELETE", "CREATE"],
      correctAnswer: 3,
      explanation: "CREATE bu DDL (Data Definition Language) ga kiradi, chunki u ma'lumotni emas, jadval strukturasini (schema) yaratadi."
    },
    {
      id: 9,
      question: "Agar jadval nomidan keyin ustunlar nomi kiritilmasa (INSERT INTO users VALUES ...), nima bo'ladi?",
      options: ["Sintaksis xatosi", "Barcha ustunlarga mos tartibda qiymat berish talab qilinadi", "Faqat birinchi ustunga qiymat ketadi", "Jadval tasodifiy qiymatlar bilan to'ladi"],
      correctAnswer: 1,
      explanation: "Agar ustunlar aniq ko'rsatilmasa, jadvalda qancha ustun bo'lsa, VALUES ichida ham shuncha qiymat ketma-ket (tartib bo'yicha) kiritilishi shart."
    },
    {
      id: 10,
      question: "O'zgartirilgan ustunning oldingi va keyingi holatini bir vaqtda qaytarish mumkinmi?",
      options: ["Yo'q, faqat keyingi holati qaytadi", "Ha, agar RETURNING ishlatilsa faqat yangisi, ammo ba'zi DB larda eski/yangi olish mumkin", "Ha, doim avtomatik 2 ta qiymat qaytadi", "SQL da umuman javob qaytarilmaydi"],
      correctAnswer: 1,
      explanation: "Ba'zi RDMS (masalan, MS SQL Server) da OUTPUT deleted.*, inserted.* orqali olish mumkin, PostgreSQL da RETURNING yangi qatorni qaytaradi."
    },
    {
      id: 11,
      question: "Matnli va sanali ma'lumotlar kiritilayotganda qanday yozilishi kerak?",
      options: ["Hech qanday qo'shimchasiz", "Ikkita tirnoq (Double quotes) ichida", "Bitta tirnoq (Single quotes) ichida", "Kvadrat qavslar ichida"],
      correctAnswer: 2,
      explanation: "SQL da odatda satr (string) va sana (date) turidagi ma'lumotlar bitta tirnoq (' ') ichida yoziladi."
    },
    {
      id: 12,
      question: "Boshqa jadvaldan o'qib, o'zimizning jadvalga to'g'ridan to'g'ri yozishning eng qisqa usuli qaysi?",
      options: ["JS orqali SELECT qilib keyin for-loop orqali INSERT qilish", "INSERT INTO table1 SELECT * FROM table2", "COPY table1 FROM table2", "TRANSFER table2 TO table1"],
      correctAnswer: 1,
      explanation: "Buning eng yaxshi yo'li SQL ni o'zida INSERT INTO ... SELECT ... qolipini ishlatish. Bu tarmoq orqali o'qib-yozishdan ko'ra ancha tezroq."
    }
  ]
};
