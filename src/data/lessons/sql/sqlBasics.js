export const sqlBasics = {
  id: "sqlBasics",
  title: "SQL va So'rovlar Asoslari",
  language: "sql",
  theory: `## 1. NEGA kerak?
Hozirgi kunda deyarli barcha ilovalar va tizimlar ma'lumotlarni saqlash va boshqarish uchun ma'lumotlar bazalaridan (Databases) foydalanadi. **SQL (Structured Query Language)** — bu relyatsion ma'lumotlar bazalari (MySQL, PostgreSQL, SQLite, SQL Server) bilan muloqot qilish uchun ishlatiladigan universal tildir. Web-dasturchi sifatida siz serverga kelgan ma'lumotlarni bazaga yozishingiz yoki bazadagi ma'lumotlarni tezkor so'rovlar orqali o'qib, foydalanuvchiga taqdim etishingiz kerak.

## 2. SODDALIK (Analogiya)
Ma'lumotlar bazasini **katta Excel kitobiga** o'xshatish mumkin. Excelda jadvallar (tables), ularning ustunlari (columns/fields) va qatorlari (rows/records) bor.
SQL so'rovini esa **kutubxonachiga berilgan buyruqqa** o'xshatsa bo'ladi:
"Menga *kitoblar* bo'limidan, muallifi *O'tkir Hoshimov* bo'lgan, faqat *nomi* va *narxi* ustunlarini olib ber, lekin jami *5 ta*dan ko'p bo'lmasin".
SQL-da bu shunday yoziladi:
\`\`\`sql
SELECT nomi, narxi 
FROM kitoblar 
WHERE muallif = 'O''tkir Hoshimov' 
LIMIT 5;
\`\`\`

## 3. STRUKTURA
SQL so'rovining asosiy sintaksis bloklari quyidagi tartibda yoziladi:
1. **\`SELECT\`**: Qaysi ustunlarni ko'rmoqchi ekanligimizni belgilaydi (hamma ustunlar uchun \`*\` ishlatiladi).
2. **\`FROM\`**: Ma'lumot qaysi jadvaldan olinishini ko'rsatadi.
3. **\`WHERE\`**: Qatorlarni filtrlash uchun shart yoziladi.
4. **\`ORDER BY\`**: Natijani saralash (o'sish yoki kamayish tartibida).
5. **\`LIMIT\`**: Natijalar sonini cheklash.

## 4. AMALIYOT
Bizning tizimimizda quyidagi mock (sinov) jadvallari mavjud:
- **\`users\`**: Foydalanuvchilar ro'yxati (\`id\`, \`name\`, \`age\`, \`city\`, \`role\`)
- **\`orders\`**: Buyurtmalar ro'yxati (\`id\`, \`user_id\`, \`product\`, \`amount\`, \`order_date\`)
- **\`products\`**: Mahsulotlar ro'yxati (\`id\`, \`name\`, \`category\`, \`price\`, \`stock\`)

Oddiy so'rovlar yozish namunalari:

### Hamma ma'lumotlarni olish
\`\`\`sql
SELECT * FROM users;
\`\`\`

### Faqat kerakli ustunlarni olish
\`\`\`sql
SELECT name, city FROM users;
\`\`\`

### Shart bo'yicha filtrlash va saralash
Toshkentda yashaydigan foydalanuvchilarning ismini yoshi bo'yicha o'sish tartibida olish:
\`\`\`sql
SELECT name, age 
FROM users 
WHERE city = 'Toshkent' 
ORDER BY age ASC;
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Ustun nomlarini xato yozish**: SQL Case-insensitive (katta-kichik harflarni farqlamaydi), lekin ustun nomlaridagi harflar to'g'ri yozilishi shart.
2. **Matnlarga tirnoq qo'ymaslik**: SQL-da matnli qiymatlar doimo bir tirnoq (\`'\`) ichida yozilishi kerak. Qo'shtirnoq (\`"\`) ba'zi SQL dialektlarida jadval yoki ustun nomlari uchun ishlatiladi.
3. **WHERE shartini noto'g'ri yozish**: SELECT ustunlaridan keyin to'g'ridan-to'g'ri WHERE yozib bo'lmaydi. Doim SELECT -> FROM -> WHERE tartibi bo'lishi shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. SQL nima?**
Relyatsion ma'lumotlar bazalarini boshqarish va ular ustida amallar bajarish uchun mo'ljallangan deklarativ til.

**2. \`SELECT * FROM users;\` so'rovidagi \`*\` nimani anglatadi?**
\`users\` jadvalidagi barcha ustunlarni (fields) qaytarishni anglatadi.

**3. Relyatsion ma'lumotlar bazasi nima?**
Ma'lumotlarni jadvallar shaklida saqlaydigan va jadvallar orasida o'zaro aloqalar (relations) o'rnatadigan ma'lumotlar bazasi tizimi.

**4. \`LIMIT\` nima uchun kerak?**
Bazada millionlab qatorlar bo'lishi mumkin. So'rov faqat kerakli miqdordagi (masalan, dastlabki 10 ta) qatorni qaytarishi va tizim tez ishlashi uchun limit ishlatiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Barcha foydalanuvchilar",
      instruction: "`users` jadvalidagi barcha qator va ustunlarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Jami 5 ta qator qaytishi kerak'; if(!result[0].city) return 'Barcha ustunlarni tanlash kerak'; return null;"
    },
    {
      id: 2,
      title: "Ism va Shaharlarni tanlash",
      instruction: "`users` jadvalidan faqat foydalanuvchilarning ismi (`name`) va yashash shahri (`city`) ustunlarini oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT name, city FROM users",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result[0].name === undefined || result[0].city === undefined) return 'Ism va Shahar tanlanishi shart'; if(result[0].age !== undefined) return 'Yosh (age) ustuni ko\\'rsatilmasligi kerak'; return null;"
    },
    {
      id: 3,
      title: "Toshkentlik foydalanuvchilar",
      instruction: "`users` jadvalidan faqat `city` qiymati 'Toshkent' bo'lgan barcha foydalanuvchilarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE city = 'Toshkent'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Toshkentda 3 ta foydalanuvchi bor'; if(result.some(u => u.city !== 'Toshkent')) return 'Faqat Toshkent shahridagilar qaytishi shart'; return null;"
    },
    {
      id: 4,
      title: "Yosh bo'yicha tartiblash (ORDER BY)",
      instruction: "`users` jadvalidagi barcha foydalanuvchilarni yoshi (`age`) bo'yicha kamayish tartibida (DESC) oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users ORDER BY age DESC",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result[0].age !== 35 || result[4].age !== 22) return 'Yosh bo\\'yicha kamayish tartibida saralash xato'; return null;"
    },
    {
      id: 5,
      title: "Yoshi 30 dan kichiklar",
      instruction: "`users` jadvalidan yoshi (`age`) 30 dan kichik bo'lgan barcha foydalanuvchilarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE age < 30",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Yoshi 30 dan kichik bo\\'lgan jami 3 ta foydalanuvchi bor'; return null;"
    },
    {
      id: 6,
      title: "Alifbo bo'yicha saralash",
      instruction: "`users` jadvalidagi barcha foydalanuvchilarni ismi (`name`) bo'yicha alifbo tartibida (ASC) oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users ORDER BY name ASC",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result[0].name !== 'Ali' || result[4].name !== 'Vali') return 'Alifbo bo\\'yicha o\\'sish tartibida saralash xato'; return null;"
    },
    {
      id: 7,
      title: "Dastlabki 3 ta foydalanuvchi",
      instruction: "`users` jadvalidan eng birinchi joylashgan 3 ta foydalanuvchini oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users LIMIT 3",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Faqat dastlabki 3 ta qator qaytishi kerak'; return null;"
    },
    {
      id: 8,
      title: "Oddiy userlarning ismlari va yoshi",
      instruction: "`users` jadvalidan roli (`role`) 'User' bo'lgan foydalanuvchilarning ismi (`name`) va yoshi (`age`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT name, age FROM users WHERE role = 'User'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Roli User bo\\'lgan 3 kishi bor'; if(result[0].role !== undefined) return 'Faqat name va age ustunlarini tanlash kerak'; return null;"
    },
    {
      id: 9,
      title: "Samarqandlik foydalanuvchi",
      instruction: "`users` jadvalidan shahri (`city`) 'Samarqand' bo'lgan barcha ma'lumotlarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE city = 'Samarqand'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Vali') return 'Faqat Samarqandlik Vali chiqishi kerak'; return null;"
    },
    {
      id: 10,
      title: "Eng yosh 2 ta foydalanuvchi",
      instruction: "`users` jadvalidan eng kichik yoshdagi 2 ta foydalanuvchini yoshi o'sish tartibida saralab oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users ORDER BY age ASC LIMIT 2",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2 || result[0].age !== 22 || result[1].age !== 25) return 'Eng yosh 2 ta foydalanuvchi olinmadi'; return null;"
    },
    {
      id: 11,
      title: "Katta yoshlilar ismi",
      instruction: "`users` jadvalidan yoshi (`age`) 25 dan katta bo'lgan foydalanuvchilarning faqat ismi (`name`) ustunini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT name FROM users WHERE age > 25",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return '25 dan katta 3 kishi bor (Vali, Madina, Dilshod)'; if(result[0].age !== undefined) return 'Faqat name ustuni qaytishi kerak'; return null;"
    },
    {
      id: 12,
      title: "Menejer ma'lumotlari",
      instruction: "`users` jadvalidan roli (`role`) 'Manager' bo'lgan barcha ustunlarni tanlang va natijani 1 ta qator bilan cheklang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE role = 'Manager' LIMIT 1",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].role !== 'Manager') return 'Faqat 1 ta Manager qaytishi kerak'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL so'rovida barcha ustunlarni tanlash uchun qaysi belgi ishlatiladi?",
      options: ["#", "%", "*", "$"],
      correctAnswer: 2,
      explanation: "SQL-da * (yulduzcha) belgisi 'barcha ustunlar' degan ma'noni anglatadi."
    },
    {
      id: 2,
      question: "Natijalar sonini cheklash uchun qaysi kalit so'z ishlatiladi?",
      options: ["TOP", "LIMIT", "COUNT", "MAX"],
      correctAnswer: 1,
      explanation: "Standard SQL dialektlarida (PostgreSQL, MySQL, SQLite) LIMIT kalit so'zi natijadagi qatorlar sonini cheklash uchun ishlatiladi."
    },
    {
      id: 3,
      question: "Qatorlarni biror shart bo'yicha filtrlash uchun qaysi kalit so'z ishlatiladi?",
      options: ["HAVING", "GROUP BY", "WHERE", "ORDER BY"],
      correctAnswer: 2,
      explanation: "Bazadan keladigan birlamchi qatorlarni shart bo'yicha filtrlash uchun WHERE kalit so'zidan foydalaniladi."
    },
    {
      id: 4,
      question: "SQL so'rovida qismlar (clauses) qaysi tartibda yozilishi shart?",
      options: ["FROM -> SELECT -> WHERE", "SELECT -> FROM -> WHERE", "WHERE -> SELECT -> FROM", "SELECT -> WHERE -> FROM"],
      correctAnswer: 1,
      explanation: "Sintaksis qoidalariga ko'ra doimo SELECT birinchi, keyin FROM va undan so'ng WHERE yoziladi."
    },
    {
      id: 5,
      question: "SQL-da ma'lumotlar (string) qiymatlari qanday yoziladi?",
      options: ["Qo'shtirnoq ichida (Double quotes)", "Bir tirnoq ichida (Single quotes)", "Qavslar ichida", "Burchakli qavslar ichida"],
      correctAnswer: 1,
      explanation: "SQL standartida matnli qiymatlar (string literals) doimo bir tirnoq (') ichida yozilishi shart."
    },
    {
      id: 6,
      question: "SQL buyruqlari (SELECT, FROM va boshqalar) katta-kichik harflarga sezgirmi (case-sensitive)?",
      options: ["Ha, hammasi faqat kichik harfda yozilishi kerak", "Ha, hammasi faqat katta harfda yozilishi kerak", "Yo'q, SQL kalit so'zlari katta-kichik harflarni farqlamaydi (case-insensitive)", "Faqat SELECT kalit so'zi katta harfda bo'lishi shart"],
      correctAnswer: 2,
      explanation: "SQL-da kalit so'zlar case-insensitive. Masalan, SELECT va select bir xil ishlaydi, biroq kod o'qilishi oson bo'lishi uchun ularni katta harfda yozish tavsiya etiladi."
    },
    {
      id: 7,
      question: "Natijani o'sish tartibida saralash uchun qaysi kalit so'z ishlatiladi?",
      options: ["DESC", "ASC", "UP", "GROW"],
      correctAnswer: 1,
      explanation: "O'sish tartibida saralash uchun ASC (Ascending) kalit so'zi ishlatiladi. Bu sukut bo'yicha (default) tartib hisoblanadi."
    },
    {
      id: 8,
      question: "Jadval ustunlari (columns) relyatsion ma'lumotlar bazasida nima deyiladi?",
      options: ["Qatorlar (Rows)", "Maydonlar (Fields/Attributes)", "Tugunlar (Nodes)", "Jadvallar"],
      correctAnswer: 1,
      explanation: "Jadvalning ustunlari maydonlar (fields yoki attributes) deb ataladi va ular ma'lumotlar turini ifodalaydi."
    },
    {
      id: 9,
      question: "Jadval qatorlari (rows) relyatsion bazada nima deb ataladi?",
      options: ["Yozuvlar (Records/Entities)", "Sarlavhalar (Headers)", "Kalitlar (Keys)", "Toifalar"],
      correctAnswer: 0,
      explanation: "Jadval qatorlari yozuvlar (records) yoki ob'ektlar (entities) deb nomlanadi va ular real ma'lumotlarni o'zida saqlaydi."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri relyatsion ma'lumotlar bazasi tizimi emas?",
      options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
      correctAnswer: 2,
      explanation: "MongoDB relyatsion emas, balki NoSQL (hujjatga yo'naltirilgan) ma'lumotlar bazasi hisoblanadi. PostgreSQL, MySQL va SQLite esa relyatsion ma'lumotlar bazasidir."
    },
    {
      id: 11,
      question: "Yoshi bo'yicha kamayish tartibida saralash qaysi kalit so'z yordamida amalga oshiriladi?",
      options: ["ORDER BY age DESC", "ORDER BY age ASC", "SORT BY age DOWN", "GROUP BY age DESC"],
      correctAnswer: 0,
      explanation: "ORDER BY ustun_nomi DESC yozuvi ustun qiymatlari bo'yicha kamayish tartibida saralaydi."
    },
    {
      id: 12,
      question: "Natijadan dastlabki 5 ta qatorni olish uchun nima yoziladi?",
      options: ["LIMIT 5", "COUNT 5", "WHERE row <= 5", "TAKE 5"],
      correctAnswer: 0,
      explanation: "SQL-da natijalarni cheklash uchun LIMIT 5 qo'llaniladi."
    }
  ]
};
