export const sqlIntro = {
  id: "sqlIntro",
  title: "Ma'lumotlar Bazasi va RDBMS Asoslari",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Ma'lumotlar Bazasi (Database) nima?
**Ma'lumotlar bazasi** — bu har qanday ma'lumotlarni (matn, raqamlar, rasmlar, fayllar) tartibli va tizimli ravishda saqlaydigan hamda ularni tezkor qidirish, qo'shish va o'zgartirish imkonini beradigan dasturiy tizimdir.

Siz har kuni foydalanadigan Telegram, Instagram, YouTube kabi ilovalar barcha foydalanuvchilar, xabarlar, rasmlar va videolarni aynan ma'lumotlar bazasida saqlaydi.

### Ma'lumotlar Bazalarining Turlari:
Ma'lumotlar bazalari asosan ikki turga bo'linadi:
1. **Relyatsion (SQL):** Ma'lumotlarni qat'iy jadvallar (Tables) ko'rinishida saqlaydi. Har bir jadval o'zaro kalitlar orqali bog'langan bo'ladi. Misol: MySQL, PostgreSQL, SQLite, Oracle.
2. **NoSQL (Norelyatsion):** Qat'iy jadval tuzilishiga ega bo'lmagan, tezkor va moslashuvchan tizimlar. Ularda ma'lumotlar kalit-qiymat (Key-Value) yoki hujjatlar (Document - JSON) shaklida saqlanadi. Misol: MongoDB, Redis, Cassandra.

### RDBMS nima?
**RDBMS (Relational Database Management System)** — relyatsion ma'lumotlar bazalarini boshqarish tizimidir. Bu bazalarni yaratish, boshqarish va xavfsizligini ta'minlash uchun ishlatiladigan dasturiy ta'minot. PostgreSQL va MySQL aynan RDBMS hisoblanadi.

### SQL vs NoSQL:
* **SQL:** Qat'iy jadval va sxema (Schema), kuchli tranzaksiyalar (ACID), murakkab JOIN-lar. Eng mos joylar: Bank tizimlari, ERP, CRM, buxgalteriya.
* **NoSQL:** Sxemasiz (Schema-less), yuqori gorizontal kengayish (Scaling), tezkor yozish. Eng mos joylar: Real-time chatlar, ijtimoiy tarmoq tasmalar, katta hajmdagi log-fayllar.

### Real hayotiy analogiya
Ma'lumotlar bazasini **katta kutubxona** yoki **ombordagi javonlar tizimi** deb tasavvur qiling:
* **Database:** Butun kutubxona binosi.
* **Tables (Jadvallar):** Kutubxonadagi alohida bo'limlar (masalan, "Kitobxonlar", "Kitoblar").
* **Columns (Ustunlar):** Kitob ro'yxatidagi ustunlar (Kitob nomi, Muallifi, Narxi).
* **Rows (Qatorlar):** Har bir alohida kitob yozuvi.
* **RDBMS:** Kutubxona mudiri (barcha kitoblar joyida turishini, faqat a'zolar kitob olishini nazorat qiluvchi shaxs).

---

## 2. 💻 Real SQL Kod Misollari

Ushbu bo'limda ma'lumotlar bazasini yaratish va relyatsion bog'lanishlarni tushunish uchun real DDL (Data Definition Language) misollarini keltiramiz.

### 1. Basic Example (Jadval Yaratish)
Foydalanuvchilar uchun sodda relyatsion jadval yaratish:
\`\`\`sql
-- Foydalanuvchilar jadvalini yaratish
CREATE TABLE users (
    id INT PRIMARY KEY, -- Har bir foydalanuvchining unikal ID si
    name VARCHAR(100),   -- Foydalanuvchi ismi (maksimal 100 harf)
    email VARCHAR(150) UNIQUE, -- Unikal elektron pochta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Avtomatik yaratilish vaqti
);
\`\`\`
* **Natija:** Bo'sh \`users\` jadvali yaratiladi.
* **Qachon ishlatiladi:** Loyihani birinchi marta boshlaganda foydalanuvchilar tizimini yaratish uchun.
* **Performance jihati:** \`id\` ustuniga \`PRIMARY KEY\` va \`email\`ga \`UNIQUE\` qo'yilganda, baza avtomatik ravishda ular uchun indeks yaratadi. Bu qidiruvni tezlashtiradi.

### 2. Intermediate Example (Relyatsion Bog'lanish - Foreign Key)
Buyurtmalar jadvalini yaratish va uni \`users\` jadvaliga bog'lash:
\`\`\`sql
-- Buyurtmalar jadvalini yaratish va users jadvali bilan bog'lash
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT, -- users jadvalidagi id ga mos keladi
    product_name VARCHAR(150),
    amount DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id) -- Relyatsion bog'lanish
);
\`\`\`
* **Natija:** \`orders\` jadvali yaratiladi. Agar \`users\` jadvalida mavjud bo'lmagan \`user_id\` bilan buyurtma qo'shmoqchi bo'lsak, baza bunga ruxsat bermaydi.
* **Qachon ishlatiladi:** Foydalanuvchilar va ularning buyurtmalari o'rtasidagi bog'liqlikni boshqarishda.
* **Performance jihati:** \`user_id\` ustunida relyatsion tekshiruvlar tez ishlashi uchun unga qo'shimcha indeks berish tavsiya etiladi.

### 3. Advanced Example (NoSQL kabi JSON ma'lumot saqlash)
PostgreSQL-da relyatsion jadval ichida moslashuvchan JSON saqlash:
\`\`\`sql
-- Foydalanuvchi sozlamalarini JSON formatda saqlash
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    meta_data JSONB, -- Moslashuvchan JSONB formati
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- JSON ichidagi ma'lumot bo'yicha qidiruv
SELECT user_id 
FROM user_profiles 
WHERE meta_data->>'theme' = 'dark';
\`\`\`
* **Natija:** SQL va NoSQL kuchini birlashtirib, bir vaqtda relyatsion va dinamik JSON ustun bilan ishlash imkonini beradi.
* **Qachon ishlatiladi:** Foydalanuvchi sozlamalari, o'zgaruvchan atributlar yoki har xil turdagi integratsiya ma'lumotlarini saqlashda.
* **Performance jihati:** JSONB ustunlar uchun PostgreSQL-da \`GIN\` indeksi ishlatiladi. Bu indeks oddiy B-Tree indeksga qaraganda ko'proq joy egallaydi, lekin JSON kalitlari bo'yicha qidiruvni juda tezlashtiradi.

### 4. Production Example (Katta hajmli jadvallarni Partitioning qilish)
Millionlab qatorlarga ega tranzaksiya jadvallarini yili bo'yicha bo'laklarga ajratish (PostgreSQL):
\`\`\`sql
-- Sanalar bo'yicha bo'lingan jadval yaratish
CREATE TABLE financial_logs (
    id BIGINT,
    log_date DATE NOT NULL,
    amount DECIMAL(15, 2),
    status VARCHAR(50)
) PARTITION BY RANGE (log_date);

-- Har bir yil uchun alohida partition jadvallar yaratish
CREATE TABLE financial_logs_2025 PARTITION OF financial_logs
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE financial_logs_2026 PARTITION OF financial_logs
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
\`\`\`
* **Natija:** Baza jismonan ma'lumotlarni alohida jadvallarda saqlaydi, lekin mantiqan bitta \`financial_logs\` jadvali bo'lib ko'rinadi.
* **Qachon ishlatiladi:** Katta moliyaviy tizimlar, audit loglari, monitoring xizmatlarida.
* **Performance jihati:** \`2026\` yildagi ma'lumotlarni qidirganda, baza keraksiz ravishda \`2025\` yildagi millionlab qatorlarni chetlab o'tadi (\`Partition Pruning\`).

### 5. Enterprise Example (Multi-tenant Database arxitekturasi)
Katta SaaS platformalar uchun foydalanuvchilar ma'lumotlarini ajratish:
\`\`\`sql
-- Tenant (Mijoz kompaniya) jadvali
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100),
    subdomain VARCHAR(50) UNIQUE
);

-- Tenant id ga ega bo'lgan foydalanuvchilar jadvali
CREATE TABLE tenant_users (
    id SERIAL PRIMARY KEY,
    tenant_id INT NOT NULL,
    username VARCHAR(100) UNIQUE,
    role VARCHAR(50),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);
\`\`\`
* **Natija:** Bitta ma'lumotlar bazasida minglab mijoz kompaniyalarning xavfsiz ishlashini ta'minlovchi struktura yaratiladi.
* **Qachon ishlatiladi:** Slack, Jira, Trello kabi SaaS platformalarida.
* **Performance jihati:** Barcha so'rovlarda \`WHERE tenant_id = ?\` sharti ishlatiladi, shuning uchun \`tenant_id\` ustunida kompozit indekslar qo'llanilishi shart.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Database va RDBMS qaysi muammoni hal qiladi?
Agar RDBMS bo'lmaganida, har bir backend dasturchi ma'lumotlarni diskdagi oddiy fayllarga yozishga majbur bo'lardi. Bu quyidagi global muammolarni keltirib chiqaradi:
1. **Concurrency (Bir vaqtda kirish):** Agar bir soniyada 10,000 odam bitta faylga ma'lumot yozmoqchi bo'lsa, fayl qulflanadi yoki ma'lumotlar o'chib ketadi. RDBMS buni tranzaksiyalar yordamida navbat bilan xavfsiz boshqaradi.
2. **Data Integrity (Ma'lumot butunligi):** O'chib ketgan foydalanuvchining buyurtmalari bazada qolib ketishi (Orphaned records) mumkin. RDBMS \`Foreign Key\` cheklovlari yordamida ma'lumotlar bog'liqligini kafolatlaydi.

### Dunyo gigantlarida qo'llanilishi:
* **Uber:** Haydovchi va yo'lovchilarni xaritada to'g'ri joylashtirish uchun relyatsion bazalardan foydalanadi.
* **Amazon:** Savdo aylanmasi va tovar qoldiqlari kabi muhim moliyaviy ma'lumotlarni RDBMS tizimlarida (ACID kafolati ostida) saqlaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Primary Key cheklovini qo'shmaslik
#### Xato:
\`\`\`sql
CREATE TABLE items (
    name VARCHAR(100),
    price DECIMAL(10, 2)
);
\`\`\`
#### Nima uchun noto'g'ri:
Jadvalda unikal kalit (Primary Key) bo'lmasa, ma'lumotlarni yangilash yoki o'chirish o'ta qiyin va xavfli bo'ladi, ma'lumotlar takrorlanishi yuz beradi.
#### To'g'ri usul:
\`\`\`sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);
\`\`\`
#### Izoh:
Har doim jadvalda o'z-o'zidan o'sib boruvchi unikal \`id\` yoki UUID bo'lishi shart.

### 2. Foreign Key cheklovlaridan foydalanmaslik
#### Xato:
\`\`\`sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT, -- Bog'lanish bor, lekin constraint yo'q
    product VARCHAR(100)
);
\`\`\`
#### Nima uchun noto'g'ri:
Agar \`users\` jadvalidan 5-ID ga ega foydalanuvchi o'chirilsa, uning buyurtmasi orders jadvalida egasiz (orphaned) qolib ketadi.
#### To'g'ri usul:
\`\`\`sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product VARCHAR(100)
);
\`\`\`
#### Izoh:
\`ON DELETE CASCADE\` foydalanuvchi o'chirilganda uning buyurtmalarini ham avtomatik o'chiradi va ma'lumotlar ziddiyatini oldini oladi.

### 3. Matnli ustunlar uzunligini juda katta qilish
#### Xato:
\`\`\`sql
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    status VARCHAR(65000) -- Juda katta uzunlik
);
\`\`\`
#### Nima uchun noto'g'ri:
Katta o'lchamdagi ustunlar xotirani keraksiz egallaydi va jadvallarni skaner qilish vaqtini uzaytiradi.
#### To'g'ri usul:
\`\`\`sql
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) -- Aniq o'lcham
);
\`\`\`
#### Izoh:
Faqat zarur bo'lgan matn uzunligidan foydalaning.

### 4. NoSQL bazani reliesion ma'lumotlar uchun ishlatish
#### Xato:
Bank o'tkazmalari va buxgalteriya tizimini MongoDB-da qurish.
#### Nima uchun noto'g'ri:
NoSQL bazalarda relyatsion cheklovlar va ACID tranzaksiyalari kuchsizroq bo'lgani sababli, hisob-kitoblarda xatoliklar kelib chiqishi mumkin.
#### To'g'ri usul:
Moliyaviy tizimlar uchun PostgreSQL yoki MySQL kabi relyatsion bazalarni tanlang.
#### Izoh:
SQL relying bazalari tranzaksiya izchilligini to'liq kafolatlaydi.

### 5. Ko'pdan-ko'pga (Many-to-Many) bog'lanishni noto'g'ri loyihalash
#### Xato:
Bitta kitobning bir nechta muallifi bo'lsa, mualliflar ID sini kitob jadvaliga string ko'rinishida yozish (\`authors_ids = '1,2,3'\`).
#### Nima uchun noto'g'ri:
Bunday loyihalashda ma'lum muallif bo'yicha kitoblarni qidirish, saralash yoki hisoblash imkonsiz va o'ta sekin bo'ladi.
#### To'g'ri usul:
\`\`\`sql
-- Intermediate junction table yaratish
CREATE TABLE book_authors (
    book_id INT REFERENCES books(id),
    author_id INT REFERENCES authors(id),
    PRIMARY KEY (book_id, author_id)
);
\`\`\`
#### Izoh:
Many-to-Many bog'lanishlar uchun doimo oraliq (junction/junction table) jadval yaratilishi shart.

### 6. Tranzaksiyalarni (ACID) hisobga olmaslik
#### Xato:
Balansni kamaytirish va hisob raqamini to'ldirish amallarini oddiy ketma-ket so'rovlar bilan yozish.
#### Nima uchun noto'g'ri:
Birinchi amal bajarilib, ikkinchisi xatolik bersa, pul yo'qoladi.
#### To'g'ri usul:
Amallarni \`BEGIN;\` va \`COMMIT;\` bloklari ichida bajarish kerak.
#### Izoh:
ACID ishonchli tizim yaratishning asosidir.

### 7. SQL vs NoSQL tanlashda adashish
#### Xato:
Barcha tezkor o'zgaruvchan chat tizimini faqat og'ir RDBMS bazalarda qurish.
#### Nima uchun noto'g'ri:
Katta yuklama ostidagi real-time yozish amallarida reliesion bazalar sekinlashadi.
#### To'g'ri usul:
Tezkor yoziladigan va doimiy o'zgarib turadigan chat xabarlarini saqlashda MongoDB yoki Redis kabi NoSQL bazalarni ishlatish.
#### Izoh:
Har bir texnologiya o'z o'rnida ishlatilishi lozim.

### 8. Unikal ustunlarga UNIQUE cheklovini qo'ymaslik
#### Xato:
\`\`\`sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) -- UNIQUE kaliti yo'q
);
\`\`\`
#### Nima uchun noto'g'ri:
Tizimda bir xil username-li bir nechta foydalanuvchi paydo bo'lib qoladi, bu esa avtorizatsiya va profiling tizimini buzadi.
#### To'g'ri usul:
\`\`\`sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE
);
\`\`\`
#### Izoh:
Elektron pochta, telefon raqamlari kabi unikal maydonlarga doimo \`UNIQUE\` constraint qo'ying.

### 9. Jadval nomlarini tartibsiz qo'yish
#### Xato:
Bir jadvalni \`User\`, ikkinchisini \`orders_list\`, uchinchisini \`productTable\` deb nomlash.
#### Nima uchun noto'g'ri:
Tartibsiz nomlar loyiha kattalashgani sari jamoada tushunmovchilik va xatolarni ko'paytiradi.
#### To'g'ri usul:
Jadvallarni doimo kichik harflarda, ko'plik shaklida va pastki chiziq bilan nomlang: \`users\`, \`orders\`, \`products\`.
#### Izoh:
Nomlash standartlari (naming conventions) kod tozaligini ta'minlaydi.

### 10. NULL qiymatlarga ruxsat berishni tahlil qilmaslik
#### Xato:
Foydalanuvchi ismini \`NOT NULL\` qilmaslik.
#### Nima uchun noto'g'ri:
Ismi bo'lmagan foydalanuvchilar ro'yxatdan o'ta boshlaydi, bu esa keyingi backend mantiqida xatolarga olib keladi.
#### To'g'ri usul:
\`\`\`sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
\`\`\`
#### Izoh:
Majburiy ustunlarga har doim \`NOT NULL\` cheklovini qo'shing.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Ma'lumotlar bazasi (Database) nima?
   * **Javob:** Ma'lumotlar bazasi — ma'lumotlarni tizimli, xavfsiz va tezkor saqlash uchun mo'ljallangan dasturiy tizimdir.
   * **Intervyuda qanday javob berish kerak:** *"Ma'lumotlar bazasi loyihadagi barcha foydalanuvchilar, tovarlar va amallarni markazlashtirilgan tarzda boshqarish imkonini beradigan tizimdir. U ma'lumotlar izchilligini kafolatlaydi."*
   * **Qo'shimcha izoh:** Bazani fayl tizimidan farqini aytib o'tish junior uchun katta afzallikdir.

2. **Savol:** RDBMS nima va u oddiy fayldan nimasi bilan farq qiladi?
   * **Javob:** RDBMS relyatsion bazalarni boshqaruvchi dastur. Fayldan farqi — bir vaqtda kirishni (concurrency), xavfsizlik va ma'lumotlar butunligini ta'minlaydi.
   * **Intervyuda qanday javob berish kerak:** *"RDBMS ma'lumotlarni jadvallar va ularning munosabatlari (relations) orqali saqlaydi va ACID tranzaksiyalarini ta'minlaydi."*
   * **Qo'shimcha izoh:** RDBMSga PostgreSQL, MySQL kabi misollarni aytish kerak.

3. **Savol:** SQL va NoSQL farqi nima?
   * **Javob:** SQL reliesion bo'lib, qat'iy jadvallarga ega. NoSQL esa sxemasiz bo'lib, moslashuvchan JSON yoki Key-Value formatida ishlaydi.
   * **Intervyuda qanday javob berish kerak:** *"SQL aniq sxema va moliya kabi ACID talab qilinadigan loyihalar uchun, NoSQL esa tezkor kengayish va moslashuvchan tuzilmalar uchun ishlatiladi."*
   * **Qo'shimcha izoh:** NoSQL-da gorizontal kengayish (Horizontal scaling) osonligini ta'kidlash lozim.

4. **Savol:** Primary Key va Foreign Key nima?
   * **Javob:** Primary Key — jadvaldagi qatorning unikal identifikatori. Foreign Key — boshqa jadvalga bog'lanish kaliti.
   * **Intervyuda qanday javob berish kerak:** *"Primary key jadvaldagi qatorlarni bir-biridan ajratish uchun xizmat qilsa, Foreign key jadvallarni o'zaro bog'laydi."*
   * **Qo'shimcha izoh:** Har bir jadvalda bitta Primary Key bo'ladi, lekin ko'plab Foreign Key-lar bo'lishi mumkin.

### Middle (5–8)
5. **Savol:** ACID prinsiplarini tushuntiring.
   * **Javob:** ACID — tranzaksiyalar xavfsizligini ta'minlovchi 4 qoida: Atomicity, Consistency, Isolation, Durability.
   * **Intervyuda qanday javob berish kerak:** *"Atomicity amallarni 'yoki hammasi yoki hech biri' bo'lishini ta'minlasa, Consistency bazani toza saqlaydi, Isolation parallel ishlashni ajratadi, Durability esa yozilgan ma'lumot saqlanib qolishini kafolatlaydi."*
   * **Qo'shimcha izoh:** ACID relyatsion bazalarning eng kuchli ustunligidir.

6. **Savol:** Many-to-Many (Ko'pdan-ko'pga) bog'lanish bazada qanday amalga oshiriladi?
   * **Javob:** Ikkita asosiy jadval va ularni bog'lovchi uchinchi (Junction/Pivot table) jadval orqali amalga oshiriladi.
   * **Intervyuda qanday javob berish kerak:** *"Masalan, talabalar va kurslar o'rtasida many-to-many bog'lanish bo'lsa, student_courses degan jadval ochib, unga student_id va course_id foreing key-larini joylashtiramiz."*
   * **Qo'shimcha izoh:** Pivot jadvalda kompozit Primary Key ishlatsa bo'ladi.

7. **Savol:** Relational integrity constraints (Relyatsion butunlik cheklovlari) nima?
   * **Javob:** Bazadagi ma'lumotlar sifati va tozaligini saqlash uchun o'rnatiladigan qoidalar: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK.
   * **Intervyuda qanday javob berish kerak:** *"Ular foydalanuvchi noto'g'ri ma'lumot yuborganida bazaning xatolik berib, noto'g'ri ma'lumot yozilishidan saqlash vositalaridir."*
   * **Qo'shimcha izoh:** CHECK constraint orqali yosh >= 18 kabi shartlarni baza darajasida tekshirish mumkin.

8. **Savol:** Ma'lumotlar bazasini loyihalashda 1NF, 2NF va 3NF normal formalari nimani anglatadi?
   * **Javob:** Bular ma'lumotlarni takrorlanishini kamaytirish uchun jadvallarni optimallashtirish bosqichlaridir.
   * **Intervyuda qanday javob berish kerak:** *"1NF da har bir katakda atomar (bo'linmas) qiymat bo'lishi shart. 2NF da qisman bog'liqlik yo'qotiladi va Primary Key ga bog'lanadi. 3NF da tranzitiv bog'liqliklar yo'q qilinadi."*
   * **Qo'shimcha izoh:** Ko'p hollarda 3-normal formagacha olib borish production uchun yetarli.

### Senior (9–12)
9. **Savol:** Sharding va Partitioning farqi nimada?
   * **Javob:** Partitioning bitta server ichida jadvallarni jismoniy qismlarga bo'lish, Sharding esa ma'lumotlarni bir nechta alohida jismoniy serverlarga (shardlarga) taqsimlashdir.
   * **Intervyuda qanday javob berish kerak:** *"Katta yuklamali loyihalarda yagona server sig'may qolsa Sharding qilamiz. Agar bitta server sig'sa-yu, lekin bitta jadval juda katta bo'lsa Partitioning ishlatamiz."*
   * **Qo'shimcha izoh:** Shardingni amalga oshirish backend arxitekturasini ancha murakkablashtiradi.

10. **Savol:** Database replication (Replikatsiya) qanday ishlaydi va Master-Slave tuzilmasi nima?
    * **Javob:** Replikatsiya ma'lumotlar nusxasini bir serverdan (Master) boshqa serverlarga (Slave) doimiy sinxronlab borish.
    * **Intervyuda qanday javob berish kerak:** *"Master server faqat yozish (write) amallarini qabul qiladi. Slave serverlar esa faqat o'qish (read) so'rovlariga javob beradi. Bu o'qish yuklamasini taqsimlaydi."*
    * **Qo'shimcha izoh:** Master server o'chib qolsa, Slave serverlardan biri Master-ga aylantiriladi (Failover).

11. **Savol:** NoSQL bazalardagi CAP teoremasini tushuntiring.
    * **Javob:** Tarmoq uzilishlari (Partition tolerance) yuz berganda, taqsimlangan tizim bir vaqtning o'zida ham Muvofiqlik (Consistency), ham Yuqori kiruvchanlikni (Availability) kafolatlay olmaydi.
    * **Intervyuda qanday javob berish kerak:** *"CAP teoremasiga ko'ra, biz uchta xususiyatdan (C, A, P) faqat ikkitasini tanlashimiz mumkin. Reliyatsion bazalar ko'pincha CA yoki CP bo'lsa, NoSQL tizimlar AP yoki CP bo'ladi."*
    * **Qo'shimcha izoh:** Real hayotda P (tarmoq muammolari) har doim bo'lishi sababli, tanlov asosan C va A orasida bo'ladi.

12. **Savol:** Nima uchun relyatsion ma'lumotlar bazasida trigger-lardan ko'p foydalanish tavsiya etilmaydi?
    * **Javob:** Triggerlar bazada yashirin ishlaydi, disk va CPU yuklamasini oshiradi, so'rovlarni sekinlashtiradi va debugging jarayonini murakkablashtiradi.
    * **Intervyuda qanday javob berish kerak:** *"Triggerlar biznes mantiqini bazaga bog'lab qo'yadi. Agar biznes mantiq o'zgarsa, SQL kodini o'zgartirish kerak bo'ladi. Shuningdek, ular kutilmagan qulflashlarga (deadlocks) olib kelishi mumkin. Biznes mantiqni backend kodida saqlash xavfsizroq."*
    * **Qo'shimcha izoh:** Triggerlarni faqat audit/log yozish kabi o'ta zarur database-level amallarda ishlatish tavsiya etiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlarni darsning pastdagi interaktiv kod muhitida bajarishingiz mumkin.

---

## 7. 📝 12 ta Mini Test

Dars oxirida o'zingizni sinash uchun testlar tayyorlangan.

---

## 8. 🎯 Real Project Case Study

### SaaS platformalar uchun Multi-tenant arxitektura loyihasi
Tasavvur qiling, siz **Slack** kabi korporativ chat platformasini loyihalashtirmoqchisiz. Har bir mijoz kompaniyaning (Workspace) o'z foydalanuvchilari va kanallari bo'ladi.

#### Muammo:
Agar har bir kompaniya uchun alohida ma'lumotlar bazasi ochsak (Database-per-tenant), minglab mijozlar uchun serverlarni boshqarish va yangilash (migration) o'ta og'ir bo'ladi. Agar bitta umumiy bazada saqlasak, bir kompaniya foydalanuvchisi xatolik sabab ikkinchi kompaniya kanallarini ko'rib qolmasligi kerak (Data Leakage).

#### Yechim:
Relyatsion bazada **Shared Database (Single database, shared schema)** modelini qo'llaymiz. Bunda har bir jadvalda \`tenant_id\` ustuni bo'ladi:
\`\`\`sql
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE channels (
    id SERIAL PRIMARY KEY,
    tenant_id INT REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL
);
\`\`\`
Backend kodida har bir SQL so'roviga majburiy ravishda \`WHERE tenant_id = current_tenant_id\` sharti qo'shiladi va ma'lumotlar butunligi reliesion bog'lanish orqali himoyalanadi.

---

## 9. 🚀 Performance va Optimization

Relyatsion bazalarda ma'lumotlar hajmi ortganida quyidagi optimallashtirish usullari qo'llaniladi:
1. **Vertical Scaling (Vertikal kengayish):** Serverning protsessori (CPU) va tezkor xotirasini (RAM) oshirish. Uning ma'lum bir jismoniy chegarasi bor.
2. **Horizontal Scaling (Replication):** So'rovlar yuklamasini kamaytirish uchun Master-Slave arxitekturasini o'rnatish. Yozish bitta Masterga, o'qish esa o'nlab Slave serverlarga yo'naltiriladi.

---

## 10. 📌 Cheat Sheet

| Tushuncha | Asosiy Sintaksis | Vazifasi | Qachon ishlatiladi |
| :--- | :--- | :--- | :--- |
| **CREATE TABLE** | \`CREATE TABLE users (...);\` | Jadval yaratish | Sxemani loyihalayotganda |
| **PRIMARY KEY** | \`id SERIAL PRIMARY KEY\` | Unikal identifikator | Har bir jadvalda bo'lishi shart |
| **FOREIGN KEY** | \`REFERENCES users(id)\` | relyatsion bog'lanish | Ikki jadvalni bog'lashda |
| **UNIQUE** | \`email VARCHAR UNIQUE\` | Takrorlanishni cheklash | Pochta, loginlar uchun |
| **ACID** | Ishonchlilik standartlari | Tranzaksiyalarni boshqarish | Barcha reliesion tizimlarda |
`,
  exercises: [
    {
      "id": 1,
      "title": "Barcha foydalanuvchilarni tanlash",
      "instruction": "Tizimdagi barcha foydalanuvchilarni ko'rish uchun `users` jadvalidagi barcha ustunlar va qatorlarni tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT * FROM users",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Jami 5 ta foydalanuvchi bo\\'lishi kerak'; if(!result[0].role) return 'Barcha ustunlarni (jumladan role) tanlash kerak'; return null;"
    },
    {
      "id": 2,
      "title": "Barcha mahsulotlar ro'yxati",
      "instruction": "Do'kondagi barcha tovarlarni ko'rish uchun `products` jadvalidagi barcha ustunlar va qatorlarni tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT * FROM products",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Jami 5 ta mahsulot bo\\'lishi kerak'; if(result[0].stock === undefined) return 'Jadval tarkibida stock (ombor qoldig\\'i) ustuni bo\\'lishi kerak'; return null;"
    },
    {
      "id": 3,
      "title": "Barcha buyurtmalarni olish",
      "instruction": "Tizimdagi barcha buyurtmalarni tekshirish uchun `orders` jadvalidagi barcha yozuvlarni tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT * FROM orders",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 6) return 'Jami 6 ta buyurtma qaytishi kerak'; return null;"
    },
    {
      "id": 4,
      "title": "Foydalanuvchilarning ismi va emaili",
      "instruction": "`users` jadvalidan faqat foydalanuvchilarning ismi (`name`) va elektron pochta (`email`) ustunlarini tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, email FROM users",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Jami 5 ta foydalanuvchi bo\\'lishi kerak'; if(result[0].name === undefined || result[0].email === undefined) return 'Faqat name va email ustunlarini tanlashingiz kerak'; if(result[0].role !== undefined) return 'Ortiqcha ustunlarni (masalan role) tanlamang'; return null;"
    },
    {
      "id": 5,
      "title": "Mahsulotlar nomi va narxi",
      "instruction": "`products` jadvalidan faqat mahsulot nomi (`name`) va narxi (`price`) ustunlarini oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, price FROM products",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Jami 5 ta mahsulot bo\\'lishi kerak'; if(result[0].name === undefined || result[0].price === undefined) return 'Faqat name va price ustunlarini tanlashingiz kerak'; if(result[0].stock !== undefined) return 'Stock ustunini tanlamasligingiz kerak'; return null;"
    },
    {
      "id": 6,
      "title": "Buyurtmalar ID va summasi",
      "instruction": "`orders` jadvalidan faqat buyurtma identifikatori (`id`) va summasi (`amount`) ustunlarini tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT id, amount FROM orders",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 6) return 'Jami 6 ta buyurtma bo\\'lishi kerak'; if(result[0].id === undefined || result[0].amount === undefined) return 'Faqat id va amount ustunlarini tanlashingiz kerak'; if(result[0].product !== undefined) return 'Mahsulot nomi (product) ustunini tanlamang'; return null;"
    },
    {
      "id": 7,
      "title": "Admin rolidagi foydalanuvchilar",
      "instruction": "`users` jadvalidan faqat roli (`role`) 'Admin' bo'lgan foydalanuvchilarning barcha ma'lumotlarini tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT * FROM users WHERE role = 'Admin'",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Roli Admin bo\\'lgan jami 1 ta foydalanuvchi bo\\'lishi kerak'; if(result[0].role !== 'Admin') return 'Faqat roli Admin bo\\'lgan foydalanuvchini tanlang'; return null;"
    },
    {
      "id": 8,
      "title": "Qimmat mahsulotlarni filtrlash",
      "instruction": "`products` jadvalidan narxi (`price`) 500 dan qimmat bo'lgan barcha mahsulotlarni tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT * FROM products WHERE price > 500",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Narxi 500 dan yuqori bo\\'lgan 2 ta mahsulot bo\\'lishi kerak'; if(result.some(p => parseFloat(p.price) <= 500)) return 'Faqat narxi 500 dan qimmat mahsulotlarni tanlang'; return null;"
    },
    {
      "id": 9,
      "title": "Katta miqdordagi buyurtmalar",
      "instruction": "`orders` jadvalidan buyurtma summasi (`amount`) 100 ga teng yoki undan ortiq bo'lgan barcha yozuvlarni tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT * FROM orders WHERE amount >= 100",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Summasi 100 va undan katta 3 ta buyurtma bo\\'lishi kerak'; if(result.some(o => parseFloat(o.amount) < 100)) return 'Faqat summasi 100 dan kam bo\\'lmagan buyurtmalarni tanlang'; return null;"
    },
    {
      "id": 10,
      "title": "Admin bo'lmagan foydalanuvchilar",
      "instruction": "`users` jadvalidan roli (`role`) 'Admin' bo'lgan foydalanuvchilardan tashqari barcha foydalanuvchilarni tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT * FROM users WHERE role != 'Admin'",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Admin bo\\'lmagan jami 4 ta foydalanuvchi bo\\'lishi kerak'; if(result.some(u => u.role === 'Admin')) return 'Natijada Admin bo\\'lgan foydalanuvchilar bo\\'lmasligi shart'; return null;"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Quyidagilardan qaysi biri relyatsion ma'lumotlar bazasiga kiradi?",
    "options": ["MongoDB", "PostgreSQL", "Redis", "Cassandra"],
    "correctAnswer": 1,
    "explanation": "PostgreSQL relyatsion ma'lumotlar bazasini boshqarish tizimi (RDBMS) hisoblanadi. MongoDB, Redis va Cassandra esa NoSQL bazalar hisoblanadi."
  },
  {
    "id": 2,
    "question": "RDBMS qisqartmasi qanday kengaytiriladi?",
    "options": [
      "Relational Database Management System",
      "Random Database Monitoring System",
      "Remote Database Migration Service",
      "Redundant Database Management Software"
    ],
    "correctAnswer": 0,
    "explanation": "RDBMS reliesion ma'lumotlar bazasini boshqarish tizimi (Relational Database Management System) ma'nosini anglatadi."
  },
  {
    "id": 3,
    "question": "NoSQL ma'lumotlar bazasi qanday ustunlikka ega?",
    "options": [
      "Qat'iy jadval tuzilishi",
      "JOIN-larni eng tez va optimal bajarishi",
      "Sxemasiz (Schema-less) moslashuvchanlik va oson kengayishi",
      "Doimiy ACID tranzaksiyalari kafolati"
    ],
    "correctAnswer": 2,
    "explanation": "NoSQL bazalar sxemasiz (moslashuvchan) tuzilmaga ega bo'lib, gorizontal kengayish (Horizontal scaling) uchun juda yaxshi moslashgan."
  },
  {
    "id": 4,
    "question": "ACID qoidalaridagi 'A' (Atomicity) nimani anglatadi?",
    "options": [
      "Ma'lumotlar avtomatik guruhlanishi",
      "Tranzaksiya amallarining 'yo to'liq bajarilishi, yoki hech biri bajarilmasligi' qoidasi",
      "Ma'lumotlar bazasi xavfsizligini ta'minlash",
      "Ma'lumotlar turini avtomatik moslashtirish"
    ],
    "correctAnswer": 1,
    "explanation": "Atomicity (bo'linmaslik) tranzaksiyadagi barcha so'rovlarning birgalikda to'liq muvaffaqiyatli bajarilishi yoki umuman bajarilmagan deb hisoblanishi (all or nothing) demakdir."
  },
  {
    "id": 5,
    "question": "Jadvaldagi har bir qatorni unikal tarzda aniqlash uchun qaysi cheklov (constraint) ishlatiladi?",
    "options": ["FOREIGN KEY", "UNIQUE KEY", "PRIMARY KEY", "CHECK CONSTRAINT"],
    "correctAnswer": 2,
    "explanation": "Primary Key (Birlamchi kalit) jadvaldagi har bir qatorni unikal tarzda aniqlash va indekslash uchun xizmat qiladi."
  },
  {
    "id": 6,
    "question": "Jadvallar o'rtasidagi munosabatlarni (relations) bog'lash uchun qaysi kalit ishlatiladi?",
    "options": ["PRIMARY KEY", "FOREIGN KEY", "UNIQUE KEY", "INDEX KEY"],
    "correctAnswer": 1,
    "explanation": "Foreign Key (Tashqi kalit) jadvaldagi ma'lumotlarni boshqa jadvalning Birlamchi kalitiga (Primary Key) bog'lash orqali relyatsiya o'rnatadi."
  },
  {
    "id": 7,
    "question": "Ko'pdan-ko'pga (Many-to-Many) munosabatni relyatsion bazada qanday to'g'ri loyihalash kerak?",
    "options": [
      "Bitta jadval ichiga massiv shaklida ID yozish",
      "Ikki jadvalni to'g'ridan-to'g'ri bog'lash",
      "Oraliq (Junction/Pivot) jadval yaratish",
      "NoSQL ga o'tish"
    ],
    "correctAnswer": 2,
    "explanation": "Many-to-Many munosabatlarni relyatsion bazalarda loyihalash uchun albatta uchinchi oraliq bog'lovchi jadval (Junction table) yaratiladi."
  },
  {
    "id": 8,
    "question": "Quyidagilardan qaysi biri NoSQL bazaga yorqin misoldir?",
    "options": ["PostgreSQL", "SQLite", "MongoDB", "MySQL"],
    "correctAnswer": 2,
    "explanation": "MongoDB hujjatga yo'naltirilgan (Document Store) eng mashhur NoSQL ma'lumotlar bazasidir."
  },
  {
    "id": 9,
    "question": "Taqsimlangan tizimlardagi CAP teoremasida 'C' nimani anglatadi?",
    "options": ["Concurrency", "Consistency", "Caching", "Complexity"],
    "correctAnswer": 1,
    "explanation": "CAP teoremasida C harfi Consistency (izchillik/muvofiqlik) ma'nosini bildiradi, ya'ni barcha tugunlarda bir vaqtda bir xil ma'lumot bo'lishi."
  },
  {
    "id": 10,
    "question": "PostgreSQL relyatsion bazasida qaysi ma'lumot turi NoSQL kabi moslashuvchan JSON saqlash imkonini beradi?",
    "options": ["TEXT", "VARCHAR", "JSONB", "BLOB"],
    "correctAnswer": 2,
    "explanation": "PostgreSQL-da JSONB ma'lumot turi JSON hujjatlarni binary formatda saqlash va indekslash imkoniyatini beradi."
  },
  {
    "id": 11,
    "question": "Master-Slave replikatsiyasi nima uchun kerak?",
    "options": [
      "Faqat kodlarni sinash uchun",
      "O'qish (read) yuklamasini taqsimlash va bazani zaxiralash (failover) uchun",
      "Yozish tezligini 100 barobarga oshirish uchun",
      "Sxemani o'zgartirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Master-Slave arxitekturasida yozish Masterga tushadi, Slave serverlar esa faqat o'qish (read) so'rovlariga javob berib, asosiy server yuklamasini yengillatadi."
  },
  {
    "id": 12,
    "question": "Tranzaksiyani butunlay bekor qilib, bazani avvalgi barqaror holatiga qaytarish qaysi buyruq orqali bajariladi?",
    "options": ["COMMIT", "ROLLBACK", "REVOKE", "BACKOUT"],
    "correctAnswer": 1,
    "explanation": "ROLLBACK buyrug'i tranzaksiya ichida sodir etilgan barcha amallarni bekor qilib, ma'lumotlarni tranzaksiya boshlanishidan oldingi holatiga qaytaradi."
  }
]

};
