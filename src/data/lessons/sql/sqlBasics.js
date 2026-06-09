export const sqlBasics = {
  id: "sqlBasics",
  title: "SQL va So'rovlar Asoslari",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Mavzu nima?
**SQL (Structured Query Language)** — relyatsion (jadvalli) ma'lumotlar bazalari bilan muloqot qilish, ularga ma'lumot yozish, o'chirish yoki kerakli ma'lumotlarni so'rab olish uchun ishlatiladigan universal dasturlash tilidir.

### Nima uchun kerak?
Siz veb-sayt yoki mobil ilova yaratganingizda (masalan, Telegram yoki Instagram), foydalanuvchilar, postlar, xabarlar va buyurtmalar qayerdadir saqlanishi kerak. SQL ushbu ma'lumotlarni jadvallar ko'rinishida tartibli saqlash va ulardan juda tezkorlik bilan foydalanish imkonini beradi.

### Qanday ishlaydi?
SQL - bu deklarativ til. Ya'ni, siz kompyuterga "ma'lumotni qanday qilib topib kelishni" emas (algoritmni), balki "aynan qaysi ma'lumot kerakligini" aytasiz. Qolgan barcha og'ir qidiruv ishlarini Ma'lumotlar Bazasi Boshqaruv Tizimi (DBMS - masalan, PostgreSQL yoki MySQL) o'zi bajaradi.

### Real hayotiy analogiya
Ma'lumotlar bazasini **ulkan supermarketga** o'xshatish mumkin:
- **Jadval (Table):** Supermarketdagi javonlar (masalan, "Sut mahsulotlari" javoni).
- **Qator (Row/Record):** Javondagi har bir alohida mahsulot (masalan, 1 litrli "Nestle" suti).
- **Ustun (Column/Field):** Mahsulotning xususiyatlari (nomi, narxi, yaroqlilik muddati).
- **SELECT WHERE so'rovi:** Sizning xaridlaringiz ro'yxati. Kutubxonachiga yoki sotuvchiga: "Menga 'Sut mahsulotlari' javonidan faqat 'Nestle' brendiga tegishli va narxi 15 000 so'mdan arzon bo'lgan mahsulotlarning nomi va narxini olib ber" deb buyruq berishga o'xshaydi.

---

## 2. 💻 Real SQL Kod Misollari

Quyida real loyihalar misolida yozilgan 3 ta SQL so'rovi keltirilgan:

### Misol 1 (Basic) - Barcha ma'lumotlarni olish
\`\`\`sql
-- Foydalanuvchilar jadvalidagi barcha ma'lumotlarni o'qish
SELECT *
FROM users;
\`\`\`
- **Izoh:** Ready-to-use bo'lgan ushbu so'rov \`users\` jadvalidagi barcha qatorlar (rows) va barcha ustunlarni (columns) qaytaradi.
- **Natija:** Jadvaldagi barcha foydalanuvchilarning ID, ism, yosh va shahar kabi barcha ustunlari ro'yxati chiqadi.
- **Qachon ishlatiladi:** Loyihani endi boshlaganda, test qilishda yoki jadvaldagi ustunlar strukturasini tezkor tekshirib olish kerak bo'lganda.

### Misol 2 (Intermediate) - Shart bo'yicha filtrlash
\`\`\`sql
-- Yoshi 18 dan katta bo'lgan foydalanuvchilarning faqat ismi va shahrini olish
SELECT name, city
FROM users
WHERE age > 18;
\`\`\`
- **Izoh:** \`SELECT\` orqali faqat \`name\` va \`city\` ustunlarini so'rayapmiz (xotirani tejash uchun \`*\` ishlatilmaydi). \`WHERE\` sharti faqat yoshi 18 dan yuqori bo'lgan qatorlarni filtrlap beradi.
- **Natija:** Yoshi 18 dan katta bo'lgan foydalanuvchilarning ismlari va yashash shaharlari ro'yxati.
- **Qachon ishlatiladi:** Foydalanuvchi qidiruv yoki filtr tizimlarida (masalan, faqat Toshkentdagi tovarlarni yoki faqat faol foydalanuvchilarni ko'rsatishda).

### Misol 3 (Production Example) - Guruhlash va Agregatsiya
\`\`\`sql
-- Har bir mijoz jami qancha summaga buyurtma berganini hisoblash
SELECT customer_id,
       SUM(total_amount) AS total_spent,
       COUNT(id) AS total_orders
FROM orders
WHERE status = 'completed'
GROUP BY customer_id
ORDER BY total_spent DESC;
\`\`\`
- **Izoh:** Faqat muvaffaqiyatli completed bo'lgan buyurtmalar olinadi. \`SUM\` va \`COUNT\` agregat funksiyalari orqali mijozlar buyurtmalari yig'indisi va soni hisoblanadi. \`GROUP BY\` orqali har bir mijoz uchun alohida guruhlanadi va \`ORDER BY\` orqali eng ko'p xarid qilganlar tepaga saralanadi.
- **Natija:** Eng faol mijozlar va ularning umumiy xarid summasi jadvali.
- **Qachon ishlatiladi:** Dashboard-lar, analitika panellari va biznes hisobotlar yaratishda.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Bu mavzu qanday muammoni hal qiladi?
Agar SQL bo'lmasa, dasturchilar millionlab foydalanuvchilar ma'lumotlarini txt yoki json fayllarda saqlashga majbur bo'lishardi. Bir dona foydalanuvchini topish uchun butun faylni xotiraga yuklab, tsiklda qidirish kerak bo'lar edi. SQL relyatsion jadvallar, indekslar va optimallashtirilgan so'rovlar yordamida **millisoniyalar ichida** millionlab qatorlar orasidan kerakli ma'lumotni topish muammosini hal qiladi.

### Katta loyihalarda qo'llanilishi:
- **Telegram:** Siz yozgan chat xabarlari bazada \`messages\` jadvalida saqlanadi. Siz chatni ochganingizda orqa fonda \`SELECT * FROM messages WHERE chat_id = 123 ORDER BY created_at DESC LIMIT 20;\` kabi so'rov ishlab, oxirgi 20 ta xabarni tezkor yuklab beradi.
- **Netflix:** Siz ko'rayotgan kinolar ro'yxati va tavsiyalar SQL query-lar yordamida guruhlanib, filtrlangan holda taqdim etiladi.

### Performance va Scalability:
Katta hajmdagi bazalarda noto'g'ri yozilgan bitta SQL so'rov butun serverni yuklab (CPU 100% qilib) tizimni o'chirib qo'yishi mumkin. So'rovlarni to'g'ri filtrlash, indekslardan foydalanish va keraksiz ustunlarni tanlamaslik loyihaning scalability (kengayishi) uchun hayotiy muhimdir.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. SELECT * operatoridan doimiy foydalanish
- **Nima uchun yomon:** Jadvalda 50 ta ustun bo'lsa va sizga faqat \`name\` kerak bo'lsa ham, \`SELECT *\` barcha 50 ta ustunni tortib keladi. Bu tarmoq (network) va RAM-ni behuda band qiladi.
- **To'g'ri usul:**
\`\`\`sql
SELECT id, name FROM users;
\`\`\`

### 2. Matnli qiymatlarda qo'shtirnoq ishlatish
- **Nima uchun yomon:** Standart SQL-da matnlar doimo bir tirnoq (\`'\`) bilan yoziladi. Qo'shtirnoq (\`"\`) esa ustun yoki jadval nomlarini belgilash uchun ishlatiladi (PostgreSQL-da bu xatolikka olib keladi).
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users WHERE status = 'active';
\`\`\`

### 3. Indekslanmagan ustunlarda funksiyalar yordamida qidirish (Non-sargable WHERE)
- **Nima uchun yomon:** \`WHERE LOWER(email) = 'ali@mail.com'\` yozilganda, baza \`email\` ustunidagi indeksdan foydalana olmaydi va barcha qatorlarni tekshirib chiqadi (Full Table Scan).
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users WHERE email = 'ali@mail.com';
\`\`\`

### 4. LIMIT ishlatmaslik
- **Nima uchun yomon:** Bazada 5 millionta mijoz bo'lsa, \`SELECT * FROM users;\` so'rovi millionlab qatorlarni birdan yuklashga urinib, brauzerni va serverni qotiradi.
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users LIMIT 100;
\`\`\`

### 5. WHERE va HAVING operatorlarini chalkashtirish
- **Nima uchun yomon:** Guruhlashdan oldin oddiy qatorlarni filtrlash uchun \`HAVING\` ishlatish juda sekin ishlaydi. \`HAVING\` faqat guruhlangan (GROUP BY) agregat natijalar uchun ishlatilishi kerak.
- **To'g'ri usul:**
\`\`\`sql
SELECT role, COUNT(id) 
FROM users 
WHERE age > 18 
GROUP BY role;
\`\`\`

### 6. COUNT(*) ni katta jadvallarda asossiz ishlatish
- **Nima uchun yomon:** InnoDB (MySQL) kabi motorlarda millionlab qatorli jadvalda \`COUNT(*)\` qilish har safar barcha qatorlarni qayta sanashga majbur qiladi.
- **To'g'ri usul:**
Tizim statistikasi yoki metama'lumotlar saqlanadigan alohida kesh jadvaldan o'qish.

### 7. SQL Injection xavfi (Dasturlash tiliga ulashda)
- **Nima uchun yomon:** SQL so'rovini string konkatenatsiyasi yordamida yozish (\`query = "SELECT * FROM users WHERE id = " + input\`). Xakerlar inputga maxsus SQL kod yozib, bazani buzishi yoki o'chirishi mumkin.
- **To'g'ri usul:** Parametrlangan so'rovlardan foydalanish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)

**1. SQL nima va u qayerda ishlatiladi?**
- Relyatsion ma'lumotlar bazalari bilan muloqot qilish, ularga ma'lumot yozish, o'qish va tahrirlash uchun ishlatiladigan deklarativ so'rovlar tili.

**2. SELECT va FROM vazifasi nima?**
- \`SELECT\` so'ralayotgan ustunlarni (fields) belgilaydi, \`FROM\` esa ma'lumot olinadigan jadvalni ko'rsatadi.

**3. WHERE va ORDER BY farqi nimada?**
- \`WHERE\` qatorlarni shart bo'yicha filtrlash uchun, \`ORDER BY\` esa natijalarni ma'lum ustun bo'yicha saralash (o'sish/kamayish tartibida) uchun ishlatiladi.

**4. SQL-da 'NULL' nima?**
- NULL - qiymatning yo'qligini, noaniq yoki bo'sh katakni anglatadi. U bo'sh string \`''\` yoki \`0\` sonidan farq qiladi.

### Middle (5–8)

**5. WHERE va HAVING farqi nimada?**
- \`WHERE\` guruhlashdan (GROUP BY) oldin individual qatorlarni filtrlaydi. \`HAVING\` esa guruhlashdan keyin hosil bo'lgan agregat natijalarni filtrlaydi.

**6. Relyatsion ma'lumotlar bazasi nima?**
- Ma'lumotlarni o'zaro aloqador jadvallar (Primary va Foreign key-lar orqali) shaklida saqlaydigan tizim (masalan, PostgreSQL, MySQL).

**7. SQL so'rovini bajarilish tartibi (Logical Query Processing) qanday?**
- Yozilish tartibidan farq qiladi. Baza so'rovni quyidagi tartibda bajaradi: \`FROM\` -> \`JOIN\` -> \`WHERE\` -> \`GROUP BY\` -> \`HAVING\` -> \`SELECT\` -> \`DISTINCT\` -> \`ORDER BY\` -> \`LIMIT\`.

**8. LIKE operatori nima va '%' belgisi nima vazifani bajaradi?**
- \`LIKE\` matnlar ichidan andoza (pattern) bo'yicha qidirish uchun ishlatiladi. \`%\` belgisi har qanday miqdordagi harflar kombinatsiyasini anglatadi (masalan, \`WHERE name LIKE 'A%'\` - A harfi dengan boshlanadigan ismlar).

### Senior (9–12)

**9. Index nima va u so'rovlar tezligiga qanday ta'sir qiladi?**
- Indeks - bu bazada qidiruvni tezlashtirish uchun ustunga o'rnatiladigan ma'lumotlar strukturasi (odatda B-Tree). U SELECT so'rovlarini ming barobargacha tezlashtiradi, lekin INSERT va UPDATE tezligini biroz pasaytiradi.

**10. B-Tree va Hash index farqi nimada?**
- B-Tree indekslar qiymatlar diapazonini qidirishda (\`>\`, \`<\`, \`BETWEEN\`) samarali. Hash indekslar esa faqat aniq tenglikni (\`=\`, \`IN\`) tekshirishda juda tez ishlaydi, lekin diapazonlarni qo'llab-quvvatlamaydi.

**11. SQL Injection hujumini qanday oldini olish mumkin?**
- Foydalanuvchidan kelayotgan o'zgaruvchilarni to'g'ridan-to'g'ri stringga qo'shmasdan, **Prepared Statements** (parametrlangan so'rovlar) yoki ORM-dan foydalanish orqali.

**12. Katta hajmdagi jadvalda pagination (sahifalash) uchun \`LIMIT 100 OFFSET 1000000\` ishlatish nega yomon va uni qanday optimallash mumkin?**
- Chunki baza dastlabki 1 millionta qatorni o'qib, tashlab yuborishga majbur bo'ladi (juda sekin). Buni optimallash uchun **Keyset Pagination (Seek method)** qo'llaniladi (masalan, \`WHERE id > last_seen_id LIMIT 100\`).

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi mashqlar bo'limida bajarishingiz mumkin. Har bir topshiriq uchun o'zbek tilidagi shartlar, yordamchi kodlar va ularni tekshiruvchi avtomatlashtirilgan test ssenariylari yozilgan.

---

### 📌 Eslab Qolish Kerak Bo'lgan Qoidalar
1. **Tartib juda muhim:** SQL-da so'rov bloklari qat'iy ketma-ketlikda yozilishi shart: \`SELECT\` -> \`FROM\` -> \`WHERE\` -> \`GROUP BY\` -> \`HAVING\` -> \`ORDER BY\` -> \`LIMIT\`.
2. **Bir tirnoq qoidasi:** Matnlarni doimo bir tirnoq \`'\` ichiga oling.
3. **NULL solishtirilmaydi:** SQL-da \`WHERE status = NULL\` deb yozish xato. Buning o'rniga \`WHERE status IS NULL\` yoki \`IS NOT NULL\` ishlatiladi.

### 🚀 Production Tips
1. **Faqat kerakli ustunlarni oling:** \`SELECT *\` ni ishlab chiqarish (production) kodida ishlatishdan qoching.
2. **Indekslardan oqilona foydalaning:** Tez-tez \`WHERE\` va \`JOIN\` shartlarida qatnashadigan ustunlarga indeks qo'ying.
3. **So'rovlarni tahlil qiling:** Har qanday shubhali sekin so'rov oldidan \`EXPLAIN\` kalit so'zini qo'yib, uning qanday bajarilish rejasini ko'ring.

### 🎯 Interview Cheat Sheet
- **DML vs DDL:** DML ma'lumotlar bilan ishlaydi (\`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`). DDL struktura bilan ishlaydi (\`CREATE\`, \`ALTER\`, \`DROP\`).
- **Index foydasi:** Read-ni tezlashtiradi, Write-ni sekinlashtiradi.
- **SQL Logical Order:** Birinchi bo'lib \`FROM\` ishlaydi, eng oxiri \`LIMIT\`.
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
