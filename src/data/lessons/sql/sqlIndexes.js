export const sqlIndexes = {
  id: "sql_indexes",
  title: "SQL Indexes (Indekslar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**Index (Indeks)** – ma'lumotlar bazasida (MB) qidiruvni tezlashtirish uchun foydalaniladigan maxsus ma'lumotlar tuzilmasi. Buni xuddi kitobning mundarijasi yoki indeks varag'iga o'xshatish mumkin. Agar kitobda indeks bo'lmasa, kerakli ma'lumotni topish uchun har bir sahifani (Table Scan) o'qib chiqishga to'g'ri keladi. Indeks yordamida esa kerakli sahifani to'g'ridan-to'g'ri (Index Seek) ochishingiz mumkin.

Indekslarning turlari:
1. **Clustered Index**: Jadvaldagi ma'lumotlarni jismonan tartiblaydi. Har bir jadvalda faqat bitta Clustered Index bo'lishi mumkin (odatda Primary Key avtomatik Clustered Index bo'ladi).
2. **Non-Clustered Index**: Ma'lumotlarni jismonan o'zgartirmaydi, balki ko'rsatkichlar (pointers) ro'yxatini yaratadi. Bitta jadvalda bir nechta Non-Clustered Index bo'lishi mumkin.
3. **Unique Index**: Ustundagi qiymatlarning takrorlanmasligini ta'minlaydi.
4. **Composite Index**: Bir nechta ustunlarni birlashtirgan holda yaratiladigan indeks.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON (Juda ko'p indeks yaratish):**
\`\`\`sql
-- Har bir ustunga alohida indeks yaratish yomon amaliyot.
CREATE INDEX idx_first_name ON users(first_name);
CREATE INDEX idx_last_name ON users(last_name);
CREATE INDEX idx_age ON users(age);
CREATE INDEX idx_status ON users(status);
-- Bu ma'lumot yozish (INSERT/UPDATE/DELETE) jarayonini juda sekinlashtiradi.
\`\`\`

**✅ YAXSHI (Faqat kerakli va ko'p qidiriladigan ustunlarga indeks berish):**
\`\`\`sql
-- Qidiruv ko'p ishlatiladigan email ustuniga indeks yaratish
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Composite Index (Birgalikda qidiriladigan ustunlar uchun)
CREATE INDEX idx_users_name ON users(last_name, first_name);
\`\`\`

## 🎤 Intervyu Savollari

1. **Clustered va Non-Clustered Index farqi nimada?**
   - *Javob*: Clustered Index ma'lumotlarni diskda jismoniy tartiblaydi (shuning uchun faqat 1 ta bo'ladi), Non-Clustered Index esa xotirada mantiqiy ko'rsatkichlarni (pointer) yaratadi.
2. **Indekslar qachon yomon ishlashi yoki zarar keltirishi mumkin?**
   - *Javob*: Tez-tez yangilanib turuvchi (INSERT, UPDATE, DELETE) jadvallarda indekslar yozish tezligini tushirib yuboradi. Shuningdek, kichik jadvallarda (masalan 10-50 qator) indeks ishlatish ortiqcha resurs sarfidir.
3. **B-Tree (Balanced Tree) indeksi qanday ishlaydi?**
   - *Javob*: Ma'lumotlar tartiblangan ierarxik daraxt ko'rinishida saqlanadi, bu qidiruv vaqtini $O(N)$ dan $O(\\log N)$ ga tushiradi.
4. **Composite Index nima va \`Leftmost Prefix Rule\` nimani anglatadi?**
   - *Javob*: Bir nechta ustunlardan iborat indeks. \`Leftmost Prefix\` qoidasiga ko'ra, qidiruv Composite Indeksning faqat chapdagi (birinchi) ustunlaridan boshlab ishlatilgandagina to'liq kuch bilan ishlaydi.

## 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarda SQL so'rovini qaytaruvchi funksiyalarni yozishingiz talab etiladi.

\`\`\`mermaid
graph TD
    A[Foydalanuvchi So'rovi] --> B{Indeks bormi?}
    B -- Yo'q --> C[Full Table Scan <br/> Sekin qidiruv]
    B -- Ha --> D[Index Seek <br/> Tezkor qidiruv]
    D --> E[Ma'lumotlar qaytariladi]
    C --> E
\`\`\`
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
