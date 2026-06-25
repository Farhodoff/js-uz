export const sqlQueryOptimization = {
  id: "sql_query_optimization",
  title: "SQL Query Optimization",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**Query Optimization (So'rovlarni optimallashtirish)** – bu ma'lumotlar bazasiga yuboriladigan SQL so'rovlarni (ayniqsa, qidirish - \`SELECT\`) imkon qadar kam resurs (CPU, RAM) sarflab, qisqa vaqt ichida natija qaytaradigan qilib yozish san'ati.

Loyiha boshida bazada 100 ta qator bo'lsa, qanday yozilgan so'rov bo'lishidan qat'i nazar, u tez ishlaydi. Lekin jadvallar millionlab qatorlarga yetganda yomon yozilgan so'rovlar butun serverni osib (qotirib) qo'yishi mumkin.

Optimallashtirishning asosiy qoidalari:
1. **Faqat o'zingizga kerak narsani so'rang.**
2. **Qidiruv maydonlarini indekslang.**
3. **Database server ishlashi uchun imkon qadar qulay usullarni (Joins, Exists) qo'llang.**
4. **Har doim EXPLAIN / EXPLAIN ANALYZE dan foydalaning.**

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON (\`SELECT *\` ishlatish):**
\`\`\`sql
-- YOMON: Agar jadvalda 50 ta ustun bo'lsa, hammasini tarmoqdan olib keladi
SELECT * FROM users;
\`\`\`
**✅ YAXSHI (Faqat kerakli ustunlarni sanash):**
\`\`\`sql
-- YAXSHI: Faqat ism va email kerak bo'lsa
SELECT id, name, email FROM users;
\`\`\`

**❌ YOMON (\`LIKE\` da % ni boshiga qo'yish):**
\`\`\`sql
-- YOMON: Bu so'rov hech qanday indeksni ishlata olmaydi (Full Scan)
SELECT * FROM products WHERE name LIKE '%phone%';
\`\`\`
**✅ YAXSHI (% ni oxirida ishlatish yoki Full-Text Search ishlatish):**
\`\`\`sql
-- YAXSHI: Index ishlay oladi (Leftmost prefix)
SELECT id, name FROM products WHERE name LIKE 'phone%';
\`\`\`

**❌ YOMON (Jadvalga hisoblash amalini qo'shish):**
\`\`\`sql
-- YOMON: Ustunga function ishlatsangiz, indeks ishlamay qoladi!
SELECT * FROM users WHERE YEAR(created_at) = 2023;
\`\`\`
**✅ YAXSHI (Ustunni toza saqlash):**
\`\`\`sql
-- YAXSHI: Bu holatda created_at indeksi 100% ishlaydi.
SELECT * FROM users WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';
\`\`\`

## 🎤 Intervyu Savollari

1. **N+1 Query muammosi nima?**
   - *Javob*: Avval 1 ta so'rov bilan 100 ta foydalanuvchini olib (1), keyin dastur sikli ichida (for loop) har bir foydalanuvchining rasmlarini olish uchun yana 100 marta so'rov yuborish (+N). Buni oldini olish uchun \`JOIN\` yoki \`IN (...)\` ishlatish kerak.
2. **\`IN\` va \`EXISTS\` o'rtasida qanday farq bor?**
   - *Javob*: Agar ichki (Subquery) jadval kichik bo'lsa, \`IN\` yaxshi ishlaydi. Agar Subquery dan qaytadigan ro'yxat juda katta bo'lsa, \`EXISTS\` ishlatish ancha samaraliroq (chunki u birinchi mos kelganidan topib qaytadi va hammasini solishtirib o'tirmaydi).
3. **Nima uchun \`SELECT *\` yomon amaliyot?**
   - *Javob*: 1. Katta jadvallarda kerak bo'lmagan ustunlarni ham xotiraga (va tarmoqqa) yuklaydi. 2. \`Covering Index\` ishlashiga to'sqinlik qiladi.
4. **EXPLAIN buyrug'i nima beradi?**
   - *Javob*: U SQL so'rovni ishga tushirmay turib, uni DB dvigateli qanday mantiqda (Full scan, Index seek, Hashing) bajarish rejasini (execution plan) ko'rsatib beradi.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
flowchart LR
    A[Slow Query] --> B{EXPLAIN}
    B --> C[Full Table Scan?]
    C -- Yes --> D[Indeks qo'shish yoki LIKE % ni to'g'irlash]
    C -- No --> E[Ustunlarni qisqartirish SELECT * ni o'chirish]
    E --> F((Optimized))
    D --> F
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "SELECT * ni tuzatish",
      instruction: "Xato yondashuv: `SELECT * FROM employees;`. Siz `fixSelectAll` funksiyasini yozing, u `employees` jadvalidan faqat `id`, `first_name`, va `department` ustunlarini olib keladigan SQL ni qaytarsin.",
      startingCode: "function fixSelectAll() {\n  \n}",
      hint: "SELECT id, first_name, department FROM employees;",
      solution: "function fixSelectAll() {\n  return 'SELECT id, first_name, department FROM employees;';\n}",
      test: "const fn = new Function(code + '; return fixSelectAll;')();\nconst q = fn().toLowerCase();\nif (q.includes('*') || !q.includes('id, first_name, department')) throw new Error('Ustunlar noto\\'g\\'ri');"
    },
    {
      id: 2,
      title: "LIKE dagi xatoni tuzatish",
      instruction: "`LIKE '%Ali%'` yozilsa indeks ishlamaydi. Uni indeks ishlaydigan formatda, ya'ni `LIKE 'Ali%'` (faqat Ali bilan boshlanadiganlar) shakliga keltiruvchi `fixLikeQuery` funksiyasini yozing. So'rov: `SELECT id FROM users WHERE name LIKE 'Ali%';` bo'lishi kerak.",
      startingCode: "function fixLikeQuery() {\n  \n}",
      hint: "SELECT id FROM users WHERE name LIKE 'Ali%';",
      solution: "function fixLikeQuery() {\n  return \"SELECT id FROM users WHERE name LIKE 'Ali%';\";\n}",
      test: "const fn = new Function(code + '; return fixLikeQuery;')();\nconst q = fn().toLowerCase();\nif (q.includes(\"'%ali%\'\") || q.includes(\"'%ali'\")) throw new Error('Foiz belgisi xato joyda');\nif (!q.includes(\"'ali%'\")) throw new Error('To\\'g\\'ri string topilmadi');"
    },
    {
      id: 3,
      title: "Funksiya bilan solishtirish",
      instruction: "`WHERE YEAR(created_at) = 2023` sharti indeksni o'ldiradi. Uni to'g'rilang. `fixDateQuery` funksiyasini yozing, u: `SELECT * FROM orders WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';` ni qaytarsin.",
      startingCode: "function fixDateQuery() {\n  \n}",
      hint: "created_at >= '2023-01-01' AND created_at < '2024-01-01'",
      solution: "function fixDateQuery() {\n  return \"SELECT * FROM orders WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';\";\n}",
      test: "const fn = new Function(code + '; return fixDateQuery;')();\nconst q = fn().toLowerCase();\nif (q.includes('year(')) throw new Error('YEAR() funksiyasi ishlatilmasligi kerak');\nif (!q.includes('>=') || !q.includes('<')) throw new Error('Solishtirish xato');"
    },
    {
      id: 4,
      title: "IN o'rniga EXISTS ishlatish",
      instruction: "Ichki so'rov katta bo'lsa `EXISTS` samaraliroq. `fixInToExists` funksiyasida: `SELECT * FROM departments d WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);` qaytaring.",
      startingCode: "function fixInToExists() {\n  \n}",
      hint: "WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);",
      solution: "function fixInToExists() {\n  return 'SELECT * FROM departments d WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);';\n}",
      test: "const fn = new Function(code + '; return fixInToExists;')();\nconst q = fn().toLowerCase();\nif (!q.includes('exists')) throw new Error('EXISTS topilmadi');\nif (q.includes(' in ')) throw new Error('IN ishlatmang');"
    },
    {
      id: 5,
      title: "EXPLAIN ni qo'shish",
      instruction: "So'rovni qanday ishlashini bilish uchun `analyzeQuery` funksiyasini yozing. U parametrda SQL so'rov oladi va oldiga `EXPLAIN ANALYZE ` qo'shib qaytaradi.",
      startingCode: "function analyzeQuery(sql) {\n  \n}",
      hint: "return `EXPLAIN ANALYZE ${sql}`;",
      solution: "function analyzeQuery(sql) {\n  return `EXPLAIN ANALYZE ${sql}`;\n}",
      test: "const fn = new Function(code + '; return analyzeQuery;')();\nif (fn('SELECT 1').toUpperCase() !== 'EXPLAIN ANALYZE SELECT 1') throw new Error('Xato');"
    },
    {
      id: 6,
      title: "LIMIT yordamida optimallashtirish",
      instruction: "Faqat birinchi topilgan yoki ma'lum miqdordagi qatorni olish uchun LIMIT qo'yiladi. `getTop10` funksiyasini yozing: `SELECT id FROM users ORDER BY score DESC LIMIT 10;`",
      startingCode: "function getTop10() {\n  \n}",
      hint: "LIMIT 10",
      solution: "function getTop10() {\n  return 'SELECT id FROM users ORDER BY score DESC LIMIT 10;';\n}",
      test: "const fn = new Function(code + '; return getTop10;')();\nif (!fn().toUpperCase().includes('LIMIT 10')) throw new Error('LIMIT xato');"
    },
    {
      id: 7,
      title: "UNION o'rniga UNION ALL",
      instruction: "Agar ma'lumotlar takrorlanmasligi aniq bo'lsa yoki buni ahamiyati bo'lmasa, `UNION ALL` ishlatish tezroq, chunki o'zaro solishtirib saralamaydi (Distinct qilmaydi). `unionAllQuery` funksiyasini yozing. U: `SELECT name FROM a UNION ALL SELECT name FROM b;` qaytarsin.",
      startingCode: "function unionAllQuery() {\n  \n}",
      hint: "UNION ALL orqali birlashtiring.",
      solution: "function unionAllQuery() {\n  return 'SELECT name FROM a UNION ALL SELECT name FROM b;';\n}",
      test: "const fn = new Function(code + '; return unionAllQuery;')();\nif (fn().toUpperCase().includes('UNION') && !fn().toUpperCase().includes('UNION ALL')) throw new Error('UNION emas, UNION ALL kerak');"
    },
    {
      id: 8,
      title: "N+1 muammosiga qarshi JOIN",
      instruction: "N+1 muammosini hal qilish uchun `users` va ularning `posts` lari birlashtirib olinadi. `SELECT u.id, p.title FROM users u JOIN posts p ON u.id = p.user_id;` qaytaruvchi `joinUsersPosts` funksiyasini yozing.",
      startingCode: "function joinUsersPosts() {\n  \n}",
      hint: "JOIN ishlating.",
      solution: "function joinUsersPosts() {\n  return 'SELECT u.id, p.title FROM users u JOIN posts p ON u.id = p.user_id;';\n}",
      test: "const fn = new Function(code + '; return joinUsersPosts;')();\nif (!fn().toLowerCase().includes('join posts p on u.id = p.user_id')) throw new Error('JOIN qismi xato');"
    },
    {
      id: 9,
      title: "OR o'rniga IN",
      instruction: "Ko'plab OR larni yozish yomon (x=1 OR x=2 OR x=3). Uni o'rniga `IN` (x IN (1,2,3)) yaxshiroq o'qiladi va ba'zan DB yaxshiroq optimizatsiya qiladi. `optimizeOrQuery` funksiyasi yozing u `SELECT id FROM statuses WHERE code IN (1, 2, 3);` qaytarsin.",
      startingCode: "function optimizeOrQuery() {\n  \n}",
      hint: "WHERE code IN (1, 2, 3);",
      solution: "function optimizeOrQuery() {\n  return 'SELECT id FROM statuses WHERE code IN (1, 2, 3);';\n}",
      test: "const fn = new Function(code + '; return optimizeOrQuery;')();\nif (!fn().toUpperCase().includes('IN (1, 2, 3)')) throw new Error('IN ishlatilmadi');"
    },
    {
      id: 10,
      title: "HAVING ni to'g'ri joyda ishlatish",
      instruction: "HAVING faqat agregat (GROUP BY) qilingan funksiyalarga shart berish uchun kerak, qolgan hamma shartlarni WHERE da berish kerak (chunki WHERE tezroq filtrlaydi). `SELECT category, COUNT(*) FROM products WHERE price > 100 GROUP BY category HAVING COUNT(*) > 5;` - shuni yozuvchi `fixHavingQuery` funksiyasini yozing.",
      startingCode: "function fixHavingQuery() {\n  \n}",
      hint: "price sharti WHERE da bo'lishi muhim.",
      solution: "function fixHavingQuery() {\n  return 'SELECT category, COUNT(*) FROM products WHERE price > 100 GROUP BY category HAVING COUNT(*) > 5;';\n}",
      test: "const fn = new Function(code + '; return fixHavingQuery;')();\nconst q = fn().toLowerCase();\nif (!q.includes('where price > 100') || !q.includes('having count(*) > 5')) throw new Error('WHERE va HAVING joylashuvi xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL Query Optimization nima?",
      options: ["Ma'lumotlar bazasini dizaynini (ranglarini) o'zgartirish", "SQL so'rovini qisqa vaqtda va kam resurs sarflab ishlaydigan qilish uchun optimallashtirish", "Parollarni shifrlash usuli", "Faqat SELECT so'rovlarini INSERT ga aylantirish"],
      correctAnswer: 1,
      explanation: "Optimallashtirish – DB engine (server) ni ortiqcha qiynamasdan tezkor natija olish maqsadida to'g'ri so'rovlar yozishdir."
    },
    {
      id: 2,
      question: "Nima uchun `SELECT *` dan qochish kerak?",
      options: ["Sababi ko'p yozish klaviaturani eskitadi", "DB faqat 10 ta ustunni ololadi", "Keraksiz ma'lumotlarni xotiraga olish hamda Covering Index lardan foydalanishga to'sqinlik qilish orqali so'rovni sekinlashtiradi", "U doim Error qaytaradi"],
      correctAnswer: 2,
      explanation: "SELECT * hamma narsani olib kelishga majbur qiladi, bu ortiqcha disk IO (o'qish) va tarmoq trafigidir."
    },
    {
      id: 3,
      question: "Qaysi LIKE so'rovi indeksdan to'liq foydalana oladi?",
      options: ["LIKE '%phone%'", "LIKE '%phone'", "LIKE 'phone%'", "LIKE '%ph%one%'"],
      correctAnswer: 2,
      explanation: "Indekslar so'zning boshidan boshlab yozilgandagina izlay oladi (B-Tree tuzilmasi tufayli). Agar oldiga '%' qo'ysangiz u Full Table Scan ga aylanib ketadi."
    },
    {
      id: 4,
      question: "Sana filtrlashda qaysi usul optimallashtirilgan hisoblanadi?",
      options: ["WHERE YEAR(created_at) = 2024", "WHERE DATE(created_at) = '2024-01-01'", "WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'", "Barchasi bir xil ishlaydi"],
      correctAnswer: 2,
      explanation: "Jadval ustuniga (created_at) biror funksiya (YEAR, DATE) ishlatib yuborsangiz, DB engine o'sha ustundagi indeksni ishlata olmaydi."
    },
    {
      id: 5,
      question: "N+1 muammosi qachon paydo bo'ladi?",
      options: ["Har safar N raqamiga 1 qo'shganda", "Bitta massivda N ta ustun bo'lganda", "Asosiy jadvaldan N ta obyekt olib, ularning har biriga aloqador ma'lumotlarni olish uchun sikl (loop) ichida alohida DB so'rovi yuborilganda", "DB ulanishlar soni tugaganda"],
      correctAnswer: 2,
      explanation: "Bu ORM (Hibernate, Prisma va h.k) lar ishlatilganda ko'p kuzatiladigan eng keng tarqalgan muammo. Yechimi - JOIN lardan (yoki Eager Loading) foydalanish."
    },
    {
      id: 6,
      question: "EXISTS va IN farqi nimada?",
      options: ["Farqi yo'q", "IN ichki so'rovni avval ishlab ro'yxat qiladi, EXISTS esa ichki so'rovda 1 ta shart bajarilishi bilan True qaytarib ishni tezlatadi", "EXISTS xatolarni yashiradi", "IN faqat raqamlar bilan ishlaydi"],
      correctAnswer: 1,
      explanation: "Ichki subquery katta miqdordagi (millionlab) ma'lumot qaytarayotgan bo'lsa, EXISTS qo'llagan ma'qul. Chunki u barcha ro'yxatni qurib o'tirmaydi."
    },
    {
      id: 7,
      question: "UNION va UNION ALL ning DB tezligiga qanday ta'siri bor?",
      options: ["UNION ALL tezroq ishlaydi chunki u qatorlarni saralash (Distinct) uchun vaqt sarflamaydi", "UNION tezroq ishlaydi chunki takroriylar olib tashlanadi", "Ikkalasi aynan bir xil tezlikda ishlaydi", "UNION ALL xotirani bloklaydi"],
      correctAnswer: 0,
      explanation: "Agar natijada takroriy ma'lumot chiqmasligi aniq bo'lsa yoki buni ahamiyati yo'q bo'lsa, har doim UNION ALL dan foydalanish DB ning ortiqcha o'ylashini (sorting/distinct) oldini oladi."
    },
    {
      id: 8,
      question: "EXPLAIN buyrug'ining vazifasi nima?",
      options: ["Xatolarni ingliz tiliga tarjima qilish", "Jadvaldagi barcha ma'lumotlarni o'qish", "So'rov qay tarzda (Qaysi indekslarni ishlatishi, Full Scan yoki Index Seek qilishi) ishga tushish rejasini (execution plan) ko'rsatish", "Ma'lumotlar bazasini qisqacha ta'rifi"],
      correctAnswer: 2,
      explanation: "So'rov sekin ishlayotganida birinchi qilinadigan ish - so'rov oldiga EXPLAIN qo'yib ishlatib ko'rishdir."
    },
    {
      id: 9,
      question: "HAVING ni qayerda ishlatish to'g'ri?",
      options: ["Barcha shartlarni tekshirish uchun", "Faqat GROUP BY guruhlashlari va SUM, COUNT kabi agregat funksiyalar natijasini filtrlash uchun", "Ma'lumotni kiritishdan oldin", "WHERE o'rnida"],
      correctAnswer: 1,
      explanation: "Oddiy shartlar (masalan: narx > 100) WHERE yordamida berilishi kerak. Chunki WHERE ma'lumotlarni guruhlashdan (GROUP BY) oldin filtrlab resurslarni tejaydi."
    },
    {
      id: 10,
      question: "Joins larni optimallashtirish siri nima?",
      options: ["Umuman JOIN ishlatmaslik", "Har doim CROSS JOIN ishlatish", "Bog'lanayotgan ustunlarda (Foreign keys) indeks bo'lishini ta'minlash", "Faqat VIEW lardan foydalanish"],
      correctAnswer: 2,
      explanation: "Agar ikkita 100,000 talik jadvalni ON sharti orqali bog'lasangiz va ularda indeks bo'lmasa DB qiynalib qoladi (Nested Loops)."
    },
    {
      id: 11,
      question: "Indekslash so'rovni doim ham tezlashtiradimi?",
      options: ["Ha, qancha ko'p bo'lsa shuncha tez", "Yo'q, ayniqsa Insert, Update kabi yozish amallarini sekinlashtirib qo'yishi mumkin", "Yo'q, chunki indekslar pullik xizmat", "Ha, doim tezlashtiradi"],
      correctAnswer: 1,
      explanation: "Optimizatsiya deganda faqat qidiruvni emas, ummumiy tizimning ishini inobatga olish kerak. Keraksiz indeksni qo'shish SELECT ni ozgina tezlatgani bilan bazaga yozishni sekinlashtiradi."
    },
    {
      id: 12,
      question: "Faqat bitta rekord qidirayotganingizni DB ga bildirish uchun nima ishlatiladi?",
      options: ["MAX(1)", "LIMIT 1", "ONLY_ONE()", "FIRST 1"],
      correctAnswer: 1,
      explanation: "LIMIT 1 (yoki SQL serverda TOP 1) ishlatish orqali DB ga birinchi mos kelgan yozuvni topgach, qidiruvni davom ettirmay darhol to'xtashni va natijani qaytarishni aytasiz."
    }
  ]
};
