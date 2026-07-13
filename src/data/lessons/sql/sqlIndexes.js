export const sqlIndexes = {
  id: "sql_indexes",
  title: "SQL Indexes (Indekslar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, siz 10,000 betlik ulkan ensiklopediyadan "Dasturlash" so'zini qidiryapsiz. Agar kitobda mundarija yoki indeks (ko'rsatkich) bo'lmasa, siz 1-betdan boshlab to 10,000-betgacha har bir sahifani birma-bir o'qib chiqishga majbur bo'lasiz. Bu ma'lumotlar bazasida **Full Table Scan** (Jadvalni to'liq skanerlash) deb ataladi va u sekin ishlaydi.

Agar kitobning oxirida indeks bo'lsa (Masalan: D harfi -> Dasturlash -> 542-bet), siz to'g'ridan-to'g'ri 542-betni ochasiz va kerakli ma'lumotni darhol topasiz. Ma'lumotlar bazasidagi **Index** xuddi shunday ishlaydi — u qidiruvni keskin tezlashtiruvchi maxsus ma'lumotlar tuzilmasidir (**Index Scan / Index Seek**).

## 2. 🔬 Deep Dive (Under the hood, Turlari)

Indekslar qanday ishlaydi va ularning qanday turlari mavjud?

### B-Tree (Balanced Tree)
Bu eng keng tarqalgan indeks turi hisoblanadi. Odatda \\\`CREATE INDEX\\\` buyrug'i berilganda sukut bo'yicha B-Tree yaratiladi. B-Tree ma'lumotlarni daraxtsimon ierarxiyada, muvozanatlashgan holatda saqlaydi. 
- **Qanday ishlaydi:** Qidiruv vaqti $O(\\log N)$ ga teng. Tenglik (\\\`=\\\`) va oraliq (\\\`<\\\`, \\\`>\\\`, \\\`BETWEEN\\\`) qidiruvlari uchun juda samarali.

### Hash Index
Hash indekslar faqat tenglik (\\\`=\\\`) sharti bilan qidirilganda ishlaydi. 
- **Qachon ishlatish kerak:** Oraliq qidiruvlari kerak bo'lmaganda va ma'lumotlar ustuni faqat aniq tenglikka tekshirilganda. 
- PostgreSQL misoli:
\\\`\\\`\\\`sql
CREATE INDEX idx_name ON table USING hash (column);
\\\`\\\`\\\`

### BRIN (Block Range INdex)
Ayniqsa juda katta (Terabaytlab) jadvallar uchun mos. U har bir ma'lumotlar blokining minimum va maksimum qiymatlarini o'zida saqlaydi.
- **Qachon ishlatish kerak:** Katta hajmdagi va vaqt o'tishi bilan o'sib boruvchi (masalan, logs, sensor data) jadvallarda xotirani tejash maqsadida.

### Index Scan vs Bitmap Heap Scan
- **Index Scan:** DB to'g'ridan-to'g'ri indeksni o'qiydi va u yerdagi ko'rsatkichlar yordamida diskdan faqat kerakli qatorlarni oladi. Agar indeks kerakli barcha ustunlarni o'zida saqlasa (**Covering Index**), faqat indeksning o'zi o'qiladi (**Index Only Scan**).
- **Bitmap Heap Scan:** Agar so'rov natijasi ko'p qatorlarni qaytarishi kerak bo'lsa, avval indeksdan barcha mos keluvchi qatorlarning manzillari yig'iladi (Bitmap Index Scan) va keyin ular orqali xotira bloklari birgalikda optimal tartibda diskdan o'qiladi. Bu I/O samaradorligini oshiradi.

## 3. ⚠️ Edge Cases va Senior Interview Savollari

**Indeks qachon ishlamaydi? (Edge Cases)**
1. **Funksiyalar ishlatilganda:** Agar siz \\\`WHERE UPPER(email) = 'A@B.COM'\\\` deb yozsangiz, oddiy indeks ishlamaydi. Buning uchun **Expression Index** kerak:
\\\`\\\`\\\`sql
CREATE INDEX idx_email_upper ON users(UPPER(email));
\\\`\\\`\\\`
2. **LIKE '%word%'**: Agar izlash sharti \\\`%\\\` bilan boshlansa, B-Tree indeksi ishlamaydi va DB Full Table Scan qiladi. Lekin \\\`LIKE 'word%'\\\` indeksdan foydalanadi.
3. **Data Type Mismatch:** Ustun tipi string bo'lsa-yu, siz unga son (\\\`123\\\`) bilan murojaat qilsangiz, indeks e'tiborsiz qoldirilishi mumkin.
4. **Jadval juda kichik bo'lsa:** DB rejalashtiruvchisi kichik jadvallar uchun indeks o'rniga Full Table Scan ishlatishni afzal ko'radi.

**Senior Interview Savollari:**
1. **Index qachon salbiy ta'sir ko'rsatadi?**
   - *Javob:* Har bir \\\`INSERT\\\`, \\\`UPDATE\\\`, va \\\`DELETE\\\` amali vaqtida indekslar ham yangilanishi kerak. Juda ko'p indekslar yozish jarayonini sekinlashtiradi va diskda ortiqcha joy egallaydi.
2. **Clustered va Non-Clustered Index farqi nimada?**
   - *Javob:* Clustered Index jadvaldagi yozuvlarni jismonan tartiblaydi (faqat bitta bo'ladi). Non-Clustered Index esa mantiqiy ko'rsatkichlarni alohida tuzilmada saqlaydi.
3. **Composite Index'dagi "Leftmost Prefix Rule" nima?**
   - *Javob:* Agar \\\`(A, B, C)\\\` ustunlariga Composite Index yaratilgan bo'lsa, u faqat \\\`A\\\`, \\\`A, B\\\`, yoki \\\`A, B, C\\\` ustunlari bilan izlaganda to'liq ishlaydi. Faqat \\\`B\\\` yoki \\\`C\\\` bo'yicha qidirilsa, indeks umuman ishlamaydi.

## 4. 📊 Arxitektura va Ishlash Sxemasi

\\\`\\\`\\\`mermaid
graph TD
    A[Foydalanuvchi Sorovi] --> B{Indeks bormi?}
    B -- Yoq --> C[Full Table Scan]
    B -- Ha --> D{Qidiruv sharti mosmi?}
    D -- Yoq --> C
    D -- Ha --> E[Index Scan / Bitmap Scan]
    E --> F[Diskdan qatorlarni olish]
    C --> G[Natijani qaytarish]
    F --> G
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Indeks yaratish",
      instruction: "O'zgaruvchi orqali berilgan ustun nomiga asosan `users` jadvali uchun oddiy Non-Clustered Index yaratish so'rovini qaytaruvchi `createIndex` funksiyasini yozing. Indeks nomi: `idx_users_<ustun_nomi>` bo'lishi kerak.",
      startingCode: "function createIndex(columnName) {\n  // return SQL query string\n}",
      hint: "CREATE INDEX idx_users_... ON users(...); formatidan foydalaning.",
      solution: "function createIndex(columnName) {\n  return `CREATE INDEX idx_users_${columnName} ON users(${columnName});`;\n}",
      test: "const fn = new Function(code + '; return createIndex;')(); \nif (fn('email').trim().toUpperCase() !== 'CREATE INDEX IDX_USERS_EMAIL ON USERS(EMAIL);') throw new Error('email uchun noto\\'g\\'ri ishladi');\nif (fn('age').trim().toUpperCase() !== 'CREATE INDEX IDX_USERS_AGE ON USERS(AGE);') throw new Error('age uchun noto\\'g\\'ri ishladi');"
    },
    {
      id: 2,
      title: "Unique Index yaratish",
      instruction: "`products` jadvalidagi `sku` ustuniga unique (takrorlanmas) indeks yaratuvchi SQL so'rovni qaytaruvchi `createUniqueIndex` funksiyasini yozing.",
      startingCode: "function createUniqueIndex() {\n  \n}",
      hint: "CREATE UNIQUE INDEX indeks_nomi ON jadval(ustun);",
      solution: "function createUniqueIndex() {\n  return `CREATE UNIQUE INDEX idx_products_sku ON products(sku);`;\n}",
      test: "const fn = new Function(code + '; return createUniqueIndex;')(); \nif (!fn().trim().toUpperCase().includes('CREATE UNIQUE INDEX')) throw new Error('CREATE UNIQUE INDEX yetishmayapti');\nif (!fn().trim().toLowerCase().includes('products(sku)')) throw new Error('products(sku) qismi topilmadi');"
    },
    {
      id: 3,
      title: "Composite Index yaratish",
      instruction: "Bir nechta ustunlar asosida indeks yaratish. `employees` jadvalidagi `last_name` va `first_name` ustunlari uchun bitta birgalikdagi indeks yaratish so'rovini qaytaruvchi `createCompositeIndex` funksiyasini yozing. Indeks nomi: `idx_emp_name`.",
      startingCode: "function createCompositeIndex() {\n  \n}",
      hint: "CREATE INDEX idx_emp_name ON employees(last_name, first_name);",
      solution: "function createCompositeIndex() {\n  return `CREATE INDEX idx_emp_name ON employees(last_name, first_name);`;\n}",
      test: "const fn = new Function(code + '; return createCompositeIndex;')();\nconst q = fn().toLowerCase();\nif (!q.includes('idx_emp_name')) throw new Error('indeks nomi xato');\nif (!q.includes('employees(last_name, first_name)')) throw new Error('ustunlar ro\\'yxati xato');"
    },
    {
      id: 4,
      title: "Indeksni o'chirish",
      instruction: "Jadval nomini va indeks nomini argument sifatida olib, uni o'chiruvchi SQL so'rovni (DROP INDEX) qaytaruvchi `dropIndexQuery` funksiyasini yozing.",
      startingCode: "function dropIndexQuery(tableName, indexName) {\n  \n}",
      hint: "Odatda DROP INDEX indexName ON tableName; yoki shunchaki DROP INDEX indexName; bo'ladi. PostgreSQL da DROP INDEX indexName; yetarli. Iltimos PostgreSQL ga moslab yozing.",
      solution: "function dropIndexQuery(tableName, indexName) {\n  return `DROP INDEX ${indexName};`;\n}",
      test: "const fn = new Function(code + '; return dropIndexQuery;')(); \nif (fn('users', 'idx_email').trim().toUpperCase() !== 'DROP INDEX IDX_EMAIL;') throw new Error('Xato SQL so\\'rov qaytdi');"
    },
    {
      id: 5,
      title: "Clustered Index yondashuvi",
      instruction: "Clustered Index odatda Primary Key bilan avtomat yaratiladi. Shuning uchun Primary Key yaratish so'rovini qaytaruvchi `addPrimaryKey` funksiyasini yozing. U `tableName` va `colName` ni qabul qilib: `ALTER TABLE {tableName} ADD PRIMARY KEY ({colName});` qaytarsin.",
      startingCode: "function addPrimaryKey(tableName, colName) {\n  \n}",
      hint: "ALTER TABLE tableName ADD PRIMARY KEY (colName);",
      solution: "function addPrimaryKey(tableName, colName) {\n  return `ALTER TABLE ${tableName} ADD PRIMARY KEY (${colName});`;\n}",
      test: "const fn = new Function(code + '; return addPrimaryKey;')(); \nif (fn('users', 'id').trim().toUpperCase() !== 'ALTER TABLE USERS ADD PRIMARY KEY (ID);') throw new Error('Noto\\'g\\'ri SQL so\\'rov');"
    },
    {
      id: 6,
      title: "Partial Index",
      instruction: "Qisman indekslash - ma'lum bir shartga javob beradigan qatorlargagina indeks o'rnatish. `users` jadvalida `status = 'active'` bo'lgan qatorlar uchun `created_at` ga qisman indeks (`idx_active_users`) yaratuvchi `createPartialIndex` funksiyasini yozing.",
      startingCode: "function createPartialIndex() {\n  \n}",
      hint: "CREATE INDEX idx_active_users ON users(created_at) WHERE status = 'active';",
      solution: "function createPartialIndex() {\n  return `CREATE INDEX idx_active_users ON users(created_at) WHERE status = 'active';`;\n}",
      test: "const fn = new Function(code + '; return createPartialIndex;')();\nconst q = fn().toLowerCase();\nif (!q.includes('where status') || !q.includes(\\'\\'active\\'\\')) throw new Error('WHERE sharti noto\\'g\\'ri');"
    },
    {
      id: 7,
      title: "Covering Index",
      instruction: "SELECT ni tezlashtirish uchun INCLUDE (yoki shunchaki barcha kerakli ustunlarni indeksga qo'shish) yondashuvi. `orders` jadvalidagi `customer_id` ga indeks o'rnating va `total_amount` ni qo'shib qo'ying (Composite Index tarzida). `idx_orders_cust` deb nomlang.",
      startingCode: "function createCoveringIndex() {\n  \n}",
      hint: "CREATE INDEX idx_orders_cust ON orders(customer_id, total_amount);",
      solution: "function createCoveringIndex() {\n  return `CREATE INDEX idx_orders_cust ON orders(customer_id, total_amount);`;\n}",
      test: "const fn = new Function(code + '; return createCoveringIndex;')(); \nconst q = fn().toLowerCase();\nif(!q.includes('orders(customer_id, total_amount)')) throw new Error('xato ustunlar');"
    },
    {
      id: 8,
      title: "Explain so'rovi",
      instruction: "Indeksdan foydalanilayotganini tekshirish uchun EXPLAIN qilinadi. Argument sifatida sql query berilganda, uning oldiga EXPLAIN qo'shib qaytaruvchi `explainQuery` funksiyasini yozing.",
      startingCode: "function explainQuery(sqlQuery) {\n  \n}",
      hint: "EXPLAIN so'zidan keyin bo'sh joy qoldirib sqlQuery ni sring.",
      solution: "function explainQuery(sqlQuery) {\n  return `EXPLAIN ${sqlQuery}`;\n}",
      test: "const fn = new Function(code + '; return explainQuery;')(); \nif (fn('SELECT * FROM users').trim().toUpperCase() !== 'EXPLAIN SELECT * FROM USERS') throw new Error('EXPLAIN qo\\'shilmadi');"
    },
    {
      id: 9,
      title: "Index nomini aniqlash",
      instruction: "Kodni o'qish orqali qaysi jadvalga tegishliligini bilish uchun yaxshi nabbing konvensiyasi muhimdir. `generateIndexName` funksiyasini yozing, u `tableName` va `colName` larni qabul qilib: `idx_tableName_colName` ni qaytarsin.",
      startingCode: "function generateIndexName(tableName, colName) {\n  \n}",
      hint: "return `idx_${tableName}_${colName}`;",
      solution: "function generateIndexName(tableName, colName) {\n  return `idx_${tableName}_${colName}`;\n}",
      test: "const fn = new Function(code + '; return generateIndexName;')(); \nif (fn('users', 'age') !== 'idx_users_age') throw new Error('Xato format');"
    },
    {
      id: 10,
      title: "Hash Index yaratish",
      instruction: "PostgreSQL da HASH indeks ham bo'lishi mumkin. `CREATE INDEX index_name ON table_name USING hash (column_name);`. Ushbu qolipda `createHashIndex` funksiyasini yozing. Argumentlar: tableName, colName, indexName.",
      startingCode: "function createHashIndex(tableName, colName, indexName) {\n  \n}",
      hint: "using hash (colName) qismini unutmang.",
      solution: "function createHashIndex(tableName, colName, indexName) {\n  return `CREATE INDEX ${indexName} ON ${tableName} USING hash (${colName});`;\n}",
      test: "const fn = new Function(code + '; return createHashIndex;')();\nconst res = fn('users', 'email', 'idx_u_email').toLowerCase();\nif (!res.includes('using hash (email)')) throw new Error('USING hash yo\\'q');\nif (!res.includes('idx_u_email on users')) throw new Error('qolgan qismi noto\\'g\\'ri');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Indeksning asosiy maqsadi nima?",
      options: ["Jadvaldagi ma'lumotlarni shifrlash", "Ma'lumotlar bazasida xotira tejash", "SELECT so'rovlarini tezlashtirish", "INSERT/UPDATE amallarini tezlashtirish"],
      correctAnswer: 2,
      explanation: "Indekslar qidiruv (SELECT) va shartli filtrlash jarayonlarini tezlashtirish uchun foydalaniladi. INSERT va UPDATE esa sekinlashishi mumkin."
    },
    {
      id: 2,
      question: "Clustered Index va Non-Clustered Index ning asosiy farqi nimada?",
      options: ["Clustered Index xotirada, Non-Clustered diskda saqlanadi", "Clustered Index ma'lumotlarni jismonan tartiblaydi, Non-Clustered esa faqat ko'rsatkich", "Non-Clustered Index Primary Key uchun majburiy", "Farqi yo'q, ikkisi ham bir xil ishlaydi"],
      correctAnswer: 1,
      explanation: "Clustered Index to'g'ridan-to'g'ri jadvalning o'zidagi ma'lumotlarni jismoniy ketma-ketlikda tartiblaydi. Bitta jadvalda faqat bitta Clustered Index bo'lishi mumkin."
    },
    {
      id: 3,
      question: "Ko'p indeks yaratish nima uchun salbiy oqibatlarga olib kelishi mumkin?",
      options: ["Faqat xotirani to'ldiradi, boshqa zarari yo'q", "SELECT so'rovlari sekinlashadi", "INSERT, UPDATE va DELETE operatsiyalari sekinlashadi", "Jadvallar avtomatik ravishda qulflanadi"],
      correctAnswer: 2,
      explanation: "Har bir ma'lumot yozilganda, unga bog'langan indekslar ham qayta yozilishi/yangilanishi kerak. Bu yozish amallarini sekinlashtiradi."
    },
    {
      id: 4,
      question: "Qaysi ustunga albatta (ko'pincha) avtomatik indeks qo'yiladi?",
      options: ["Primary Key", "Foreign Key", "String turidagi barcha ustunlarga", "Tarix (Date) tipidagi ustunlarga"],
      correctAnswer: 0,
      explanation: "Aksariyat RDBMS tizimlarda Primary Key ustuniga avtomatik ravishda (odatda Clustered) indeks o'rnatiladi."
    },
    {
      id: 5,
      question: "Composite Index qachon to'liq kuch bilan ishlaydi?",
      options: ["Faqat o'ngdan chapga qarab qidirilganda", "Faqat birinchi ustun ishlatilmasa", "Leftmost Prefix qoidasiga amal qilib, chapdagi birinchi ustundan boshlab qidiruv berilganda", "Barcha ustunlar faqat OR orqali qidirilganda"],
      correctAnswer: 2,
      explanation: "Composite (ko'p ustunli) indeks chapdan o'ngga mantiqi bilan ishlaydi (Leftmost Prefix Rule). Chapdagi birinchi ustun qatnashmasa, keyingilari indeksdan topila olmaydi."
    },
    {
      id: 6,
      question: "B-Tree nima?",
      options: ["Jadvaldagi yozuvlarni Binary formatga o'tkazish", "Balanced Tree - indekslarni qidirish uchun ierarxik daraxt tuzilmasi", "Faqat boolean (True/False) qiymatlar indeksi", "Barcha yozuvlarni bir tekislikda saqlovchi format"],
      correctAnswer: 1,
      explanation: "B-Tree (Balanced Tree) indekslarni samarali qidirish uchun moslashtirilgan o'zaro muvozanatlangan daraxt tuzilmasi hisoblanadi."
    },
    {
      id: 7,
      question: "Full Table Scan nimani anglatadi?",
      options: ["Jadvaldagi ma'lumotlarni indeks yordamida tezkor topish", "Jadvaldagi barcha yozuvlarni boshidan oxirigacha bittalab o'qib chiqish", "Jadval strukturasini o'qish", "Jadvalni zaxiralash (backup)"],
      correctAnswer: 1,
      explanation: "Agar kerakli indeks bo'lmasa, ma'lumotlar bazasi qidirilayotgan yozuvni topish uchun jadvaldagi barcha qatorlarni o'qishga majbur (Full Table Scan)."
    },
    {
      id: 8,
      question: "Index Seek nima?",
      options: ["Indeksdan to'g'ridan-to'g'ri kerakli qatorga borish", "Barcha indekslarni bittalab o'qib chiqish", "Jadvalni boshidan oxirigacha ko'rish", "Yangi indeksni ro'yxatdan o'tkazish"],
      correctAnswer: 0,
      explanation: "Index Seek - bu to'g'ridan-to'g'ri indeks yordamida ma'lumot manzili (pointer) olinib, faqat kerakli qatordan ma'lumotlarni o'qish."
    },
    {
      id: 9,
      question: "Qaysi so'z indeksni tekshirish yoki ishlatilishini ko'rish uchun qo'llaniladi?",
      options: ["CHECK", "EXAMINE", "EXPLAIN", "TEST"],
      correctAnswer: 2,
      explanation: "So'rov oldidan EXPLAIN (yoki EXPLAIN ANALYZE) yozish orqali DB ushbu so'rov uchun qaysi indeksni ishlataiyotganini va qanday plan tuzganini ko'rish mumkin."
    },
    {
      id: 10,
      question: "Unique Index haqida to'g'ri fikrni toping:",
      options: ["Bitta ustunda bir xil qiymat takrorlanishiga yo'l qo'ymaydi va qidiruvni tezlashtiradi", "Faqat Primary Key uchun ishlaydi", "Indeks ichida faqat 1 ta yozuv turadi", "Sonli ustunlar uchun qo'llanilmaydi"],
      correctAnswer: 0,
      explanation: "Unique Index qidiruvni tezlashtirishdan tashqari ma'lumotlarning unikal bo'lishiga majbur qiladi."
    },
    {
      id: 11,
      question: "Partial Index (Qisman indeks) nima maqsadda ishlatiladi?",
      options: ["Faqat jadvalning yarmini indekslaydi", "Faqat aniq shartga (WHERE) javob beradigan qatorlar uchungina indeks yaratib xotirani tejaydi", "Qidiruv sekin bo'lishi uchun maxsus o'ylab topilgan", "Katta ma'lumotlarni qisqartirish uchun"],
      correctAnswer: 1,
      explanation: "Partial (Filtered) index faqat berilgan shartga javob beradigan qatorlargagina indeks yasab, xotira va yangilanish narxini kamaytiradi."
    },
    {
      id: 12,
      question: "Covering Index qanday muammoni hal qiladi?",
      options: ["Indeksni bekitish (xavfsizlik uchun)", "Ma'lumotlar turini qoplash", "Barcha SELECT qilinadigan ustunlarni o'zida saqlab, jadvalga (heap) murojaat qilish ehtiyojini yo'qotadi", "Faqat bitta jadvalni qoplaydi"],
      correctAnswer: 2,
      explanation: "Agar so'rovdagi barcha ustunlar indeksning o'zida mavjud bo'lsa (Covering Index), DB haqiqiy jadval qatoriga murojaat qilmasdan tezda javob qaytaradi."
    }
  ]
};
