export const sqlBasics = {
  id: "sqlBasics",
  title: "SQL va So'rovlar Asoslari",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Ma'lumotlar Bazasi (Database) nima?
**Ma'lumotlar Bazasi (Database)** — bu tizimli, tartibli va kompyuter orqali boshqariladigan ma'lumotlar to'plamidir. Har qanday zamonaviy dastur (veb-sayt, mobil ilova, o'yinlar) o'z foydalanuvchilari, parollari, rasmlari, xabarlari va balanslarini saqlash uchun ma'lumotlar bazalariga tayanadi.

### Ma'lumotlar Bazalarining Turlari:
Ma'lumotlar bazalari asosan ikki turga bo'linadi:
1. **Relyatsion ma'lumotlar bazalari (RDBMS):** Ma'lumotlarni qat'iy jadvallar (jadvallar o'rtasidagi bog'lanishlar - relations) ko'rinishida saqlaydi (masalan, PostgreSQL, MySQL, SQLite).
2. **NoSQL (Norelyatsion):** Moslashuvchan va jadvallarga tayanmaydigan ma'lumotlar tizimlari. Ular kalit-qiymat (Key-Value), Hujjatli (Document - masalan MongoDB), Grafik (Graph) kabi formatlarda saqlanadi.

### RDBMS (Relational Database Management System):
RDBMS — relyatsion ma'lumotlar bazalarini boshqarish tizimidir. U ma'lumotlarning butunligi (Integrity constraints: Primary Key, Foreign Key), tranzaksiyalarning xavfsizligi (ACID) va SQL tili yordamida tezkor boshqarilishini ta'minlaydi.

### SQL vs NoSQL:
- **SQL (Relyatsion):** Qat'iy jadval tuzilmasi, ACID xavfsizligi, murakkab JOIN operatsiyalarini qo'llab-quvvatlashi bilan ajralib turadi. (Masalan, bank tranzaksiyalari uchun eng to'g'ri tanlov).
- **NoSQL:** Oson gorizontal kengayish (scaling), moslashuvchan schema (Dynamic schema) va yuqori yozish tezligiga ega. (Masalan, chat xabarlari va ijtimoiy tarmoq tasmalarida ko'p qo'llaniladi).

### SQL Sintaksisi, Ma'lumotlar Turlari va Operatorlar:
- **Sintaksis (Syntax):** SQL deklarativ tildir, ya'ni biz nimani xohlashimizni ingliz tiliga yaqin buyruqlar orqali bayon qilamiz (\`SELECT\`, \`FROM\`, \`WHERE\`).
- **Ma'lumotlar turlari (Data Types):** Sonli (\`INT\`, \`DECIMAL\`, \`BIGINT\`), Matnli (\`VARCHAR\`, \`TEXT\`), Vaqtli (\`DATE\`, \`TIMESTAMP\`) va Mantiqiy (\`BOOLEAN\`).
- **Operatorlar:** Matematik (\`+\`, \`-\`, \`*\`, \`/\`), Solishtirish (\`=\`, \`!=\`, \`>\`, \`<\`), Mantiqiy (\`AND\`, \`OR\`, \`NOT\`, \`IN\`, \`BETWEEN\`, \`LIKE\`).

### Real hayotiy analogiya
Ma'lumotlar bazasini **ulkan temir yo'l omboriga** o'xshatish mumkin:
- **Jadvallar (Tables):** Ombor ichidagi maxsus konteynerlar (masalan, "Kiyimlar" konteyneri, "Elektronika" konteyneri).
- **Ustunlar (Columns/Fields):** Har bir konteyner ichidagi mahsulotlarning xususiyatlari (nomi, vazni, rangi, narxi).
- **Qatorlar (Rows/Records):** Har bir alohida mahsulot qutisi (masalan, oq rangli, 2 kg og'irlikdagi Nike krossovkasi).
- **SQL So'rovi:** Ombor nazoratchisiga berilgan aniq buyruq: *"Menga 'Kiyimlar' konteyneridan faqat narxi 100 dollardan yuqori va brendi 'Nike' bo'lgan mahsulotlarning nomi va vaznini olib kel, lekin ko'pi bilan 5 ta bo'lsin"*.

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Oddiy So'rov)
\`\`\`sql
-- Faqat faol foydalanuvchilarning ismi va shahrini alifbo bo'yicha o'sish tartibida olish
SELECT name, city
FROM users
WHERE status = 'active'
ORDER BY name ASC
LIMIT 10;
\`\`\`
- **Natija:** 10 tagacha faol foydalanuvchining ismi va yashash shahri ro'yxati chiqadi.
- **Qachon ishlatiladi:** UI interfeysida ro'yxatlarni (masalan, foydalanuvchilar profillarini) qisqa va tartiblangan holda ko'rsatishda.
- **Performance jihati:** \`LIMIT\` va \`WHERE\` shartlaridagi ustunlarda indeks bo'lsa, so'rov tezda (Full Table Scan-siz) yakunlanadi.

### 2. Intermediate Example (Filtrlash va Guruhlash)
\`\`\`sql
-- Shaharlar bo'yicha 18 yoshdan kattalar o'rtacha yoshi va sonini, faqat 5 tadan ko'p foydalanuvchisi bor shaharlar uchun olish
SELECT city, 
       COUNT(id) AS total_users, 
       AVG(age) AS avg_age
FROM users
WHERE age >= 18
GROUP BY city
HAVING COUNT(id) > 5;
\`\`\`
- **Natija:** Shaharlar nomi, ulardagi kattalar soni va o'rtacha yoshi ro'yxati (faqat 5 tadan ortiq odam yashaydigan shaharlar chiqadi).
- **Qachon ishlatiladi:** Geografik yoki demografik tahlillarni amalga oshirishda.
- **Performance jihati:** \`GROUP BY\` qilinadigan ustun (city) indekslansa, baza ma'lumotlarni tezroq guruhlaydi. \`HAVING\` o'rniga \`WHERE\` orqali birlamchi qatorlarni oldindan qisqartirish xotirani tejaydi.

### 3. Advanced Example (JOIN - Jadvallarni Birlashtirish)
\`\`\`sql
-- Foydalanuvchilarning buyurtmalari ro'yxatini va buyurtma tafsilotlarini birlashtirib olish
SELECT u.name AS customer_name,
       o.product_name,
       o.amount,
       o.order_date
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.order_date >= '2026-01-01'
ORDER BY o.amount DESC;
\`\`\`
- **Natija:** 2026-yil va undan keyingi buyurtmalar ro'yxati, unda mijozning ismi va sotib olgan narsasi va summasi ko'rsatiladi.
- **Qachon ishlatiladi:** Savdo tarixi yoki foydalanuvchi buyurtmalar ro'yxatini profil sahifasida ko'rsatishda.
- **Performance jihati:** \`o.user_id\` va \`u.id\` Primary/Foreign key bog'lanishlariga ega bo'lishi va indekslanishi shart. Aks holda, JOIN operatsiyasi millionlab qatorlarda o'ta sekin ishlaydi.

### 4. Production Example (Agregatsiya va Katta Datalar Tahlili)
\`\`\`sql
-- Har bir toifadagi (category) mahsulotlar savdo aylanmasi va sotgan unikal mijozlar sonini topish
SELECT p.category,
       SUM(o.amount) AS total_revenue,
       COUNT(DISTINCT o.user_id) AS unique_customers
FROM orders o
INNER JOIN products p ON o.product_id = p.id
WHERE o.status = 'completed'
GROUP BY p.category
ORDER BY total_revenue DESC;
\`\`\`
- **Natija:** Eng daromadli mahsulotlar toifalari va ularni sotib olgan unikal mijozlar jadvali.
- **Qachon ishlatiladi:** E-commerce admin panelidagi savdo hisoboti va moliyaviy tahlil qismida.
- **Performance jihati:** \`o.status\` ustunida indeks bo'lishi yoki \`o.product_id\` orqali optimal hash join qo'llanilishi so'rov vaqtini bir necha soniyaga qisqartiradi.

### 5. Enterprise Example (Subquery va Murakkab Tekshiruv)
\`\`\`sql
-- 100 000 so'mdan qimmat bitta buyurtma qilgan va jami xaridlari barcha foydalanuvchilar o'rtacha xarididan yuqori bo'lgan foydalanuvchilarni topish
SELECT u.id, 
       u.name,
       (SELECT SUM(o.amount) FROM orders o WHERE o.user_id = u.id) AS total_spent
FROM users u
WHERE u.role = 'User'
  AND EXISTS (
      SELECT 1 
      FROM orders o 
      WHERE o.user_id = u.id 
        AND o.amount > 100000
  )
  AND (
      SELECT SUM(o.amount) 
      FROM orders o 
      WHERE o.user_id = u.id
  ) > (
      SELECT AVG(amount) 
      FROM orders
  )
ORDER BY total_spent DESC;
\`\`\`
- **Natija:** Yuqori qiymatga ega VIP mijozlar ro'yxati va ularning umumiy xaridlari.
- **Qachon ishlatiladi:** Katta korporativ CRM-larda foydalanuvchilarni marketing kampaniyalari uchun segmentatsiya (targetlash) qilishda.
- **Performance jihati:** Har bir qator uchun subquery-lar qayta-qayta ishlamasligi (Correlated Subquery overhead) uchun so'rovlarni CTE (Common Table Expressions) yoki temporary aggregation table-lar yordamida optimallashtirish tavsiya etilmaydi.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
SQL relyatsion ma'lumotlar strukturasini mukammal boshqarish orqali **Ma'lumotlar Integralligi (Data Integrity)** muammosini hal qiladi. Ya'ni, ma'lumotlar bazada xatolarsiz, takrorlanishlarsiz (normalization) va o'zaro ziddiyatsiz saqlanadi. Shuningdek, relyatsion bazalardagi **ACID** tranzaksiyalar (Atomicity, Consistency, Isolation, Durability) orqali bank to'lovlari kabi muhim ma'lumotlar 100% ishonchli yozilishini ta'minlaydi.

### Katta loyihalarda qo'llanilishi:
- **Facebook:** Do'stlik aloqalari, foydalanuvchi profili ma'lumotlarini yuqori darajadagi ACID xavfsiz relyatsion bazalarda saqlaydi va tezkor qidiruv uchun ulkan indekslar bilan optimallashtiradi.
- **Amazon:** Millionlab tovarlar orasidan to'lov jarayonini xavfsiz o'tkazish, tranzaksiya tarixi va tovarlar zaxirasini (stock) xatosiz boshqarishda SQL-ga tayanadi.
- **Netflix:** Foydalanuvchilar profillari, ko'rilgan filmlar ro'yxatini relyatsion va NoSQL bazalar aralashmasida saqlaydi. Ko'rish statistikalarini agregatlash orqali yangi tavsiyalar modelini yaratadi.
- **Telegram:** Har bir chat xabari global \`messages\` jadvalida unikal indeks bilan saqlanadi. Chat ochilganda \`SELECT WHERE chat_id = ?\` so'rovi yordamida xabarlar ro'yxati tortiladi.
- **Uber:** Yo'lovchi va haydovchilarni koordinatalari bo'yicha bog'lashda PostGIS (PostgreSQL spatial extension) yordamida geografik so'rovlardan foydalanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. SELECT * operatoridan doimiy foydalanish
- **Nima uchun noto'g'ri:** Jadvalda millionlab qatorlar va 50 ta ustun bo'lsa, \`SELECT *\` tarmoqni keraksiz yuklaydi.
- **To'g'ri usul:**
\`\`\`sql
SELECT id, name FROM users;
\`\`\`
- **Izoh:** Faqat kerakli ustunlarni so'rash RAM va tarmoq trafigini keskin kamaytiradi.

### 2. Matnli qiymatlarda qo'shtirnoq qo'yish
- **Nima uchun noto'g'ri:** Ko'plab relyatsion bazalarda (masalan PostgreSQL-da) qo'shtirnoq \`"\` faqat ustun yoki jadval nomlariga qo'yiladi. Matnlar esa \`'\` bir tirnoq ichida yozilishi shart.
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users WHERE city = 'Toshkent';
\`\`\`
- **Izoh:** Matnli qiymatlarda har doim bir tirnoqdan foydalaning.

### 3. Indekslangan ustunlarda funksiyalar ishlatish (Non-sargable WHERE)
- **Nima uchun noto'g'ri:** \`WHERE LOWER(email) = 'ali@mail.com'\` yozilganda, indeks ishlamay qoladi va baza Full Table Scan qiladi.
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users WHERE email = 'ali@mail.com';
\`\`\`
- **Izoh:** Ustun nomini funksiyaga o'rash indeksni yo'q qiladi, qidiruv qiymatining o'zini o'zgartirish kerak.

### 4. LIMIT ishlatmaslik
- **Nima uchun noto'g'ri:** Bazada 5 millionta mijoz bo'lsa, \`SELECT * FROM users;\` so'rovi millionlab qatorlarni birdan yuklashga urinib, brauzerni va serverni qotiradi.
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users LIMIT 50;
\`\`\`
- **Izoh:** Har doim natijalarni sahifalab yoki limitlab ko'rsating.

### 5. WHERE va HAVING operatorlarini aralashtirib yuborish
- **Nima uchun noto'g'ri:** Guruhlashdan oldin filtrlash mumkin bo'lgan shartlarni \`HAVING\` ichiga yozish so'rov tezligini tushiradi.
- **To'g'ri usul:**
\`\`\`sql
SELECT role, COUNT(id) FROM users WHERE age > 18 GROUP BY role;
\`\`\`
- **Izoh:** \`WHERE\` guruhlashdan oldin qatorlarni filtrlaydi, \`HAVING\` esa faqat guruhlangandan keyin ishlaydi.

### 6. NULL qiymatlarni tenglik operatori bilan tekshirish
- **Nima uchun noto'g'ri:** \`WHERE status = NULL\` SQL-da noto'g'ri natija beradi, chunki NULL hech narsaga, hatto o'ziga ham teng emas.
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users WHERE status IS NULL;
\`\`\`
- **Izoh:** NULL qiymatlarni tekshirish uchun \`IS NULL\` yoki \`IS NOT NULL\` ishlatiladi.

### 7. SQL Injection xavfli ulanishi
- **Nima uchun noto'g'ri:** Dasturlash tilidagi foydalanuvchi inputini string konkatenatsiyasi yordamida to'g'ridan-to'g'ri SQL so'roviga ulash.
- **To'g'ri usul:**
\`\`\`sql
-- Prepared statement yoki parametrli query ishlatish:
SELECT * FROM users WHERE email = ?;
\`\`\`
- **Izoh:** Parametrlash foydalanuvchi kiritgan har qanday belgini faqat qiymat deb hisoblab bazani Injection-dan saqlaydi.

### 8. JOIN shartida ustunlar ma'lumotlar turlarining mos kelmasligi
- **Nima uchun noto'g'ri:** \`VARCHAR\` ustunni \`INT\` ustunga JOIN qilish. Baza ma'lumotlarni implicit (yashirin) o'zgartiradi va indekslarni ishlatmaydi.
- **To'g'ri usul:**
Bog'lanish ustunlarining ma'lumot turlari bazada 100% bir xil (masalan, ikkalasi ham \`INT\`) bo'legen bo'lishi kerak.
- **Izoh:** Bog'lovchi kalitlar turlarini bir xil saqlash JOIN-ni tezlashtiradi.

### 9. Katta jadvallarda OFFSET ishlatib pagination qilish
- **Nima uchun noto'g'ri:** \`LIMIT 20 OFFSET 500000\` so'rovi baza 500 000 ta qatorni o'qib, so'ng tashlab yuborishiga sabab bo'ladi.
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users WHERE id > 500000 LIMIT 20;
\`\`\`
- **Izoh:** Keyset pagination (Seek method) oxirgi ko'rilgan ID-dan keyingilarni o'qib tez ishlaydi.

### 10. NOT IN operatoridan NULL bor ustunlarda foydalanish
- **Nima uchun noto'g'ri:** Agar \`NOT IN\` ichidagi qiymatlar orasida bitta \`NULL\` bo'lsa, butun so'rov natijasi bo'sh chiqadi.
- **To'g'ri usul:**
\`\`\`sql
SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM orders WHERE user_id IS NOT NULL);
\`\`\`
- **Izoh:** NULL qiymatlarni \`NOT IN\` massividan chiqarib tashlash yoki \`NOT EXISTS\` dan foydalanish shart.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)

**1. SQL nima va RDBMS nima?**
- **Javob:** SQL — relyatsion bazalar bilan muloqot qilish uchun universal til. RDBMS — relyatsion ma'lumotlar bazalarini boshqarish tizimi (dastur).
- **Intervyuda qanday javob berish kerak:** SQL bu so'rov tili, RDBMS esa MySQL, PostgreSQL kabi bazalarni boshqaradigan mexanizmdir.
- **Qo'shimcha izoh:** Ko'p odamlar SQL bilan MySQL-ni bir xil narsa deb o'ylashadi, bu farqni tushuntirish junior-ga ball beradi.

**2. WHERE va HAVING farqi nimada?**
- **Javob:** \`WHERE\` individual qatorlarni filtrlaydi va \`GROUP BY\` dan oldin ishlaydi. \`HAVING\` esa guruhlangan natijalarni filtrlaydi va \`GROUP BY\` dan keyin ishlaydi.
- **Intervyuda qanday javob berish kerak:** \`WHERE\` agregat funksiyalar (\`SUM\`, \`AVG\`) bilan ishlay olmaydi, \`HAVING\` esa aynan agregat natijalarini filtrlash uchun kerak.
- **Qo'shimcha izoh:** \`WHERE\` har doim birinchi bajarilib bazaga yuklamani kamaytiradi.

**3. NULL qiymat nima va u qanday tekshiriladi?**
- **Javob:** NULL — bazadagi ma'lumotning yo'qligini anglatadi. U \`=\` bilan emas, \`IS NULL\` yoki \`IS NOT NULL\` operatorlari yordamida tekshiriladi.
- **Intervyuda qanday javob berish kerak:** NULL hech qanday qiymatga ega emasligi uchun uni matematik tenglik bilan solishtirish imkonsiz.
- **Qo'shimcha izoh:** \`NULL = NULL\` har doim \`UNKNOWN\` (false) natija beradi.

**4. SQL-da 'JOIN' nima va uning turlari qaysilar?**
- **Javob:** JOIN — ikki yoki undan ortiq jadvallarni bog'lovchi kalit ustunlar orqali birlashtirish. Turlari: \`INNER JOIN\`, \`LEFT JOIN\`, \`RIGHT JOIN\`, \`FULL OUTER JOIN\`.
- **Intervyuda qanday javob berish kerak:** Eng ko'p ishlatiladigani \`INNER JOIN\` (ikkala jadvalda ham borlarini oladi) va \`LEFT JOIN\` (chap jadvaldagi hamma va o'ng jadvaldagi moslarini oladi).
- **Qo'shimcha izoh:** \`CROSS JOIN\` (dekart ko'paytma) ham borligini aytish junior uchun ajoyib plyus.

### Middle (5–8)

**5. SQL-da Tranzaksiyalar (Transactions) nima va ACID qoidalari nimani anglatadi?**
- **Javob:** Tranzaksiya — bir nechta SQL amallarining yagona bo'linmas blok sifatida bajarilishi.
- **Intervyuda qanday javob berish kerak:** ACID bu tranzaksiyalar ishonchliligini ta'minlovchi 4 ta prinsip: Atomicity (hammasi yoki hech narsa), Consistency (izchillik), Isolation (izolyatsiya), Durability (chidlilik).
- **Qo'shimcha izoh:** Tranzaksiyalar to'lov tizimlarida o'ta muhim (masalan, balansi kamayishi va ikkinchi odamga pul tushishi bitta tranzaksiyada bo'ladi).

**6. Subquery va JOIN o'rtasidagi farq nima va qaysi biri tezroq ishlaydi?**
- **Javob:** Subquery — boshqa so'rov ichida kelgan so'rov. JOIN esa jadvallarni bog'lovchi kalitlar orqali birlashtiradi.
- **Intervyuda qanday javob berish kerak:** Ko'p hollarda RDBMS optimizer-lari JOIN-larni subquery-larga qaraganda yaxshiroq optimallashtiradi va indekslardan unumli foydaniladi. JOIN odatda tezroq ishlaydi.
- **Qo'shimcha izoh:** Hozirgi zamonaviy optimizer-lar ba'zi subquery-larni orqa fonda JOIN shakliga o'tkazib yuboradi (Query rewriting).

**7. SQL logical execution order (So'rov bajarilish tartibi) qanday?**
- **Javob:** So'rov yozilish tartibidan farqli ravishda quyidagi tartibda bajariladi: FROM -> ON -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.
- **Intervyuda qanday javob berish kerak:** SELECT operatori deyarli eng oxirida bajarilgani uchun, biz SELECT ichida bergan taxminiy nomlarimizdan (Alias) WHERE ichida to'g'ridan-to'g'ri foydalana olmaymiz.
- **Qo'shimcha izoh:** Ushbu tartibni bilish so'rovlar qanday xato berishini tahlil qilishda juda muhim.

**8. Inner Join va Left Join o'rtasidagi asosiy performance farqi nimada?**
- **Javob:** \`INNER JOIN\` faqat mos kelgan qatorlarni qidiradi, \`LEFT JOIN\` esa chap jadvaldagi barcha qatorlarni saqlab qolgani uchun optimizer-ga ko'proq ma'lumotni yuklashga majbur qiladi.
- **Intervyuda qanday javob berish kerak:** Agar o'ng jadvalda mos qator bo'lmasa LEFT JOIN baribir NULL bilan to'ldirib qaytargani uchun ko'proq resurs talab qiladi.
- **Qo'shimcha izoh:** LEFT JOIN-dan faqat o'ng tomonda qiymatlar bo'lmasligi mumkin bo'lgan holatlardagina foydalanish kerak.

### Senior (9–12)

**9. Indeks nima va u so'rovlarni qanday tezlashtiradi? Uning salbiy tomonlari bormi?**
- **Javob:** Indeks — ustundagi qiymatlarni tez topish uchun bazadagi alohida B-Tree yoki Hash strukturadir.
- **Intervyuda qanday javob berish kerak:** Indeks SELECT so'rovlarini minglab marta tezlashtiradi, lekin ma'lumot yozish (INSERT, UPDATE, DELETE) tezligini pasaytiradi va diskda qo'shimcha joy egallaydi.
- **Qo'shimcha izoh:** Chunki har bir yozish amali bajarilganda indeks daraxti ham qayta muvozanatlanishi (rebalance) kerak.

**10. B-Tree va Hash indekslar farqi nima va qachon qaysi biri qo'llaniladi?**
- **Javob:** B-Tree indekslar daraxt shaklida bo'lib saralash va diapazonli qidiruvlarni (\`>\`, \`<\`, \`BETWEEN\`) qo'llab-quvvatlaydi. Hash indekslar esa aniq tenglikni (\`=\`) qidirishda O(1) vaqtda ishlaydi.
- **Intervyuda qanday javob berish kerak:** PostgreSQL-da sukut bo'yicha B-Tree ishlatiladi, chunki u diapazonli so'rovlar uchun yagona yechim.
- **Qo'shimcha izoh:** Hash indeks saralash yoki taqqoslash amallarini bajara olmaydi.

**11. Katta hajmdagi jadvalda offset-based pagination sekinlashish sababi nima va qanday yechim taklif qilasiz?**
- **Javob:** \`OFFSET 1000000 LIMIT 20\` so'rovi baza 1 millionta qatorni diskdan o'qib, so'ng tashlab yuborishiga sabab bo'ladi.
- **Intervyuda qanday javob berish kerak:** Keyset pagination (Seek method) qo'llash orqali faqat oxirgi ko'rilgan element ID-sidan kattalarini filtrlaymiz (\`WHERE id > ? LIMIT 20\`).
- **Qo'shimcha izoh:** Bu yondashuv har doim doimiy tezlikda (O(1) vaqtda) ishlaydi.

**12. Execution Plan (EXPLAIN) yordamida qanday qilib sekin so'rovni optimallashtirasiz?**
- **Javob:** So'rov oldidan \`EXPLAIN ANALYZE\` qo'shib, execution plan-ni o'rganamiz. Undagi Full Table Scan (Sequential Scan), og'ir Nested Loop-larni topamiz.
- **Intervyuda qanday javob berish kerak:** Sequential Scan bo'layotgan WHERE yoki JOIN ustunlariga indeks qo'yamiz va planni qayta tekshirib index seek/scan holatiga o'tganini ko'ramiz.
- **Qo'shimcha izoh:** Explain plandagi "Cost" qiymatlarini kamaytirish bizning asosiy maqsadimiz bo'ladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni darsning pastdagi interaktiv mashqlar qismida bajarishingiz mumkin. Har bir topshiriq uchun o'zbek tilidagi shartlar, yordamchi kodlar va ularni tekshiruvchi avtomatlashtirilgan test ssenariylari yozilgan.

---

## 7. 📝 12 ta Mini Test

Dars yakunida o'zingizni sinab ko'rish uchun 12 ta test savollaridan iborat bo'lim tayyorlangan. Har bir savol uchun to'g'ri va noto'g'ri javoblarning sabablari batafsil keltirilgan.

---

## 8. 🎯 Real Project Case Study

### E-commerce Buyurtmalarni Boshqarish Tizimi:
Tasavvur qiling, biz yirik **E-commerce loyihasi (Online do'kon)** uchun ma'lumotlar bazasi arxitekturasini quryapmiz. Bizda quyidagi jadvallar mavjud:
- \`users\` (foydalanuvchilar)
- \`products\` (mahsulotlar)
- \`orders\` (mijozlar buyurtmalari)
- \`order_items\` (buyurtma ichidagi mahsulotlar batafsil ro'yxati)

#### Muammo:
Mijoz o'zining "Mening buyurtmalarim" sahifasiga kirganda, unga barcha buyurtmalar ro'yxati, har bir buyurtma ichidagi mahsulotlar nomi va jami summa ko'rsatilishi kerak. Agar biz ma'lumotlarni to'g'ri SQL so'rovi bilan olmasak, har bir buyurtma uchun alohida so'rov yuborishimiz kerak bo'ladi (**N+1 query problem**), bu serverni qotiradi.

#### Yechim:
Biz \`INNER JOIN\` va \`GROUP BY\` yordamida barcha ma'lumotlarni yagona so'rov bilan yig'ib olamiz:
\`\`\`sql
SELECT o.id AS order_id,
       o.order_date,
       o.status,
       COUNT(oi.id) AS total_items,
       SUM(oi.price * oi.quantity) AS total_order_amount
FROM orders o
INNER JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = 45 -- Foydalanuvchi ID-si
GROUP BY o.id, o.order_date, o.status
ORDER BY o.order_date DESC;
\`\`\`
Ushbu so'rov yagona tarmoq so'rovi orqali foydalanuvchining barcha buyurtmalarini hisoblab beradi va tizim yuklamasini 10 barobargacha kamaytiradi.

---

## 9. 🚀 Performance va Optimization

### Explain Plan va Query Cost:
Relyatsion bazada har qanday so'rovni tahlil qilish uchun \`EXPLAIN\` buyrug'i ishlatiladi:
\`\`\`sql
EXPLAIN SELECT * FROM users WHERE email = 'test@mail.com';
\`\`\`

Explain natijasida siz quyidagilarni ko'rasiz:
- **Seq Scan (Sequential Scan):** Baza barcha qatorlarni birma-bir o'qib chiqayotganini bildiradi (Full Table Scan). Agar jadvalda millionlab qatorlar bo'lsa, bu o'ta sekin ishlaydi.
- **Index Scan:** Baza indeksdan foydalanib faqat kerakli qatorni topganini bildiradi (Eng tezkor usul).
- **Cost (So'rov narxi):** Baza so'rovni bajarish uchun sarflaydigan taxminiy protsessor va disk amallari birligi (masalan, \`cost=0.00..4.30\`).

### Optimallashtirish qadamlari:
1. **WHERE va JOIN ustunlarini indekslash:** Agar so'rov tez-tez ma'lum ustun bo'yicha qidirsa, o'sha ustunga alohida indeks qo'ying:
\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
\`\`\`
2. **Indeksni qayta tekshirish:** Indeks qo'yilgandan keyin so'rovni \`EXPLAIN\` orqali qayta tekshirsangiz, \`Seq Scan\` o'rniga \`Index Scan\` paydo bo'ladi va \`Cost\` qiymati 100 barobargacha kamayadi.

---

## 10. 📌 Cheat Sheet

| Sintaksis / Tushuncha | Asosiy Vazifasi | Production Maslahati | Interview Eslatmasi |
| :--- | :--- | :--- | :--- |
| **SELECT** | Ustunlarni tanlaydi | \`SELECT *\` o'rniga faqat ustunlar nomini yozing | Logical execution orderda SELECT oxirlarda bajariladi |
| **WHERE** | Qatorlarni filtrlaydi | Indekslangan ustunlarda funksiya (LOWER, DATE) ishlatmang | Agregat funksiyalar WHERE ichida ishlamaydi |
| **GROUP BY** | Guruhlaydi | Guruhlanadigan ustunni indekslash tezlikni oshiradi | SELECT-dagi noagregat ustunlar GROUP BY-da bo'lishi shart |
| **INDEX** | Qidiruvni tezlashtiradi | FAQAT ko'p qidiriladigan ustunlarga indeks qo'ying | Yozish (Insert/Update) amallarini sekinlashtiradi |
| **ACID** | Tranzaksiya qoidalari | To'lov jarayonlarini doimo tranzaksiya ichida bajaring | Atomicity, Consistency, Isolation, Durability |
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
