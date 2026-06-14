export const sqlQueryOptimization = {
  id: "sqlQueryOptimization",
  title: "So'rovlarni Optimallashtirish (Query Optimization)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish

### So'rovlarni Optimallashtirish nima?
**So'rovlarni Optimallashtirish (Query Optimization)** — bu yozilgan SQL so'rovini ma'lumotlar bazasi tomonidan eng kam resurs (CPU, RAM, Disk I/O) va eng kam vaqt sarflab bajarilishini ta'minlash jarayonidir.

### Execution Plan (Bajarilish rejasi) nima?
Biz SQL so'rovini yozganimizda, baza uni to'g'ridan-to'g'ri bajarmaydi. Orqa fonda **Query Optimizer** (So'rov optimallashtiruvchisi) ishga tushadi. U so'rovni bajarishning bir nechta variantlarini ko'rib chiqadi va eng arzon, eng tezkor yo'lni tanlab, bizga **Bajarilish rejasini (Execution Plan)** tuzib beradi.
Biz ushbu rejani \`EXPLAIN\` yoki \`EXPLAIN ANALYZE\` buyruqlari yordamida o'rganishimiz mumkin.

### Asosiy tushunchalar:
1. **Query Cost (So'rov narxi):** Bazaning so'rovni bajarish uchun sarflaydigan taxminiy protsessor va disk amallari birligi (masalan, \`cost=0.00..45.10\`). Cost qanchalik kichik bo'lsa, so'rov shunchalik tez ishlaydi.
2. **Seq Scan (Sequential Scan):** Jadvaldagi barcha qatorlarni birma-bir o'qib chiqish. Millionlab qatorlarda bu o'ta sekin ishlaydi.
3. **Index Scan (yoki Index Seek):** Indeksdan foydalanib faqat kerakli qatorlarni tezkor topish. Eng maqbul yo'l.
4. **Bottlenecks (To'siqlar):** So'rovni sekinlashtiradigan joylar (indekslarning yo'qligi, ortiqcha JOIN-lar, yomon yozilgan mantiq).

### Real hayotiy o'xshatish
Tasavvur qiling, siz **Toshkentdan Samarqandga borishingiz kerak**:
* **Query Optimizer:** Sizning navigatsiya ilovangiz (Google Maps).
* **Bajarilish rejasi (Execution Plan):** Navigatsiya sizga taklif qilgan marshrutlar (eng tezkor yo'l, eng kalta yo'l).
* **Seq Scan (To'liq jadvalni o'qish):** Mahalliy, chiziqli yo'llardan, har bir chorrahada to'xtab, barcha qishloqlarni aylanib borish (sekin va ko'p yoqilg'i ketadi).
* **Index Scan (Indeksdan foydalanish):** Pullik tezyurar trassa (avtoban) orqali to'g'ridan-to'g'ri va tez yetib borish.
* **Query Cost:** Navigatsiya ko'rsatgan taxminiy yo'l vaqti va sarflanadigan yoqilg'i miqdori.

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (\`EXPLAIN\` ishlatish)
Sodda qidiruv so'rovining bajarilish rejasini (Execution Plan) ko'rish:
\`\`\`sql
-- Explain plan-ni ko'rish
EXPLAIN SELECT * FROM users WHERE email = 'ali@mail.com';
\`\`\`
* **Kutilayotgan Natija (Explain Output):**
  \`\`\`
  Seq Scan on users  (cost=0.00..15.40 rows=1 width=244)
    Filter: (email = 'ali@mail.com'::text)
  \`\`\`
* **Tahlil:** Baza sequential scan (Seq Scan) qilyapti. Cost 15.40. Agar jadvalda 1 million qator bo'lsa, bu cost juda katta bo'ladi.
* **Yechim:** \`email\` ustuniga indeks qo'yish kerak.

### 2. Intermediate Example (Indeksdan keyin \`EXPLAIN\` tahlili)
Indeks yaratilgandan so'ng planni qayta tekshirish:
\`\`\`sql
-- Indeks yaratamiz
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Planni qayta tekshiramiz
EXPLAIN SELECT * FROM users WHERE email = 'ali@mail.com';
\`\`\`
* **Kutilayotgan Natija (Explain Output):**
  \`\`\`
  Index Scan using idx_users_email on users  (cost=0.15..8.17 rows=1 width=244)
    Index Cond: (email = 'ali@mail.com'::text)
  \`\`\`
* **Tahlil:** Baza endi \`Index Scan\` qilyapti. Cost **15.40 dan 8.17 gacha** kamaydi. Millionlab qatorlarda bu farq 1000 barobardan ortiq bo'ladi.

### 3. Advanced Example (\`EXPLAIN ANALYZE\` bilan haqiqiy vaqtni o'lchash)
Faqat taxminiy cost-ni emas, balki so'rovni jismonan bajarib, real vaqt (Execution Time) va xotira sarfini aniqlash (PostgreSQL):
\`\`\`sql
-- So'rovni bajarib, real vaqtni o'lchash
EXPLAIN ANALYZE 
SELECT u.name, COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name;
\`\`\`
* **Kutilayotgan Natija (Explain Output):**
  \`\`\`
  HashAggregate  (cost=32.40..34.40 rows=200 width=40) (actual time=0.082..0.095 rows=5 loops=1)
    Group Key: u.name
    ->  Hash Left Join  (cost=12.20..28.50 rows=200 width=36) (actual time=0.045..0.062 rows=6 loops=1)
          Hash Cond: (u.id = o.user_id)
          ->  Seq Scan on users u  (cost=0.00..11.40 rows=140 width=36) (actual time=0.010..0.012 rows=5 loops=1)
          ->  Hash  (cost=10.20..10.20 rows=200 width=8) (actual time=0.021..0.021 rows=6 loops=1)
                ->  Seq Scan on orders o  (cost=0.00..10.20 rows=200 width=8) (actual time=0.008..0.010 rows=6 loops=1)
  Planning Time: 0.185 ms
  Execution Time: 0.142 ms
  \`\`\`
* **Qachon ishlatiladi:** Sekin ishlayotgan murakkab JOIN va guruhlash so'rovlarini tahlil qilishda.
* **Performance jihati:** \`actual time=0.082..0.095\` real bajarilish vaqtini (millisekundda) ko'rsatadi. Bu bizga so'rovning qaysi qismi (JOIN, Hash yoki Group) eng ko'p vaqt olayotganini aniqlashga yordam beradi.

### 4. Production Example (Index-Only Scan-ga majburlash)
Jadval sahifalarini o'qish yuklamasini deyarli nolga tushirish:
\`\`\`sql
-- Covering index yaratamiz (id ustuni bilan birga email-ni saqlash)
CREATE INDEX idx_users_covering ON users(email) INCLUDE (name);

-- Explain plan tekshiramiz
EXPLAIN SELECT name FROM users WHERE email = 'ali@mail.com';
\`\`\`
* **Kutilayotgan Natija (Explain Output):**
  \`\`\`
  Index Only Scan using idx_users_covering on users  (cost=0.15..8.17 rows=1 width=36)
    Index Cond: (email = 'ali@mail.com'::text)
  \`\`\`
* **Tahlil:** Baza jadvalga kirmadi, faqat indeksning o'zidan ma'lumotni o'qidi (\`Index Only Scan\`). Bu disk amallarini (Disk I/O) keskin kamaytiradi.

### 5. Enterprise Example (Common Table Expressions - CTE optimallashtirish)
Katta hajmli murakkab so'rovlarni optimallashtirish va xotirada keshlash (PostgreSQL 12+):
\`\`\`sql
-- CTE yordamida o'rta natijani xotirada saqlab so'ng JOIN qilish
WITH regional_sales AS (
    SELECT city, SUM(amount) AS total_sales
    FROM orders o
    INNER JOIN users u ON o.user_id = u.id
    GROUP BY city
)
-- Asosiy so'rovda tayyor hisob-kitobni ishlatish
SELECT city, total_sales
FROM regional_sales
WHERE total_sales > 10000.00;
\`\`\`
* **Natija:** Savdo hajmi 10,000 dan yuqori bo'lgan shaharlar.
* **Qachon ishlatiladi:** Korporativ ERP va tahliliy (BI) tizimlarda murakkab hisobotlarni shakllantirishda.
* **Performance jihati:** PostgreSQL 12+ dan boshlab, baza optimizeri CTE-larni avtomatik ravishda asosiy so'rov bilan birlashtira oladi (inline optimization). Agar kerak bo'lsa, \`MATERIALIZED\` kalit so'zi yordamida orqadagi so'rov natijasini xotirada jismonan keshlab olish mumkin.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **High CPU Usage (Yuqori yuklama):** Indekssiz og'ir so'rovlar protsessor yuklamasini 100% ga chiqarib yuboradi. Optimallashtirish bu yuklamani 1-2% gacha tushiradi.
* **Database Connection Timeout (Ulanish vaqti tugashi):** So'rovlar uzoq vaqt (masalan, 30 soniya) ishlasa, connection pool to'lib, yangi foydalanuvchilar saytga kira olmay qoladi.
* **Katta loyihalarda yechim:** Facebook, Uber, Telegram kabi tizimlarda har bir millisekund serverlar sonini (va xarajatlarini) yuzlab marta tejash imkonini beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`EXPLAIN\` qilmasdan indeks qo'yish
#### Xato:
So'rov sekin ishlagani uchun ko'r-ko'rona jadvallarga indekslar yarataverish.
#### Nima uchun noto'g'ri:
Foydasiz indekslar bazani sekinlashtiradi va diskni to'ldiradi.
#### To'g'ri usul:
Avval \`EXPLAIN ANALYZE\` yordamida aynan qaysi ustun Seq Scan bo'layotganini aniqlab, faqat o'sha ustunga indeks qo'yish.
#### Izoh:
Ma'lumotga asoslanib ish ko'ring.

### 2. \`EXPLAIN ANALYZE\`ni yozish (WRITE) amallarida ehtiyotsiz ishlatish
#### Xato:
\`EXPLAIN ANALYZE DELETE FROM users WHERE id = 5;\` deb yozish.
#### Nima uchun noto'g'ri:
\`EXPLAIN ANALYZE\` so'rovni jismonan bajaradi. Siz tahlil qilmoqchi bo'lgan foydalanuvchi bazadan o'chib ketadi!
#### To'g'ri usul:
Yozish amallarini tahlil qilishda tranzaksiya ichida ishlatib, keyin rollback qilish:
\`\`\`sql
BEGIN;
EXPLAIN ANALYZE DELETE FROM users WHERE id = 5;
ROLLBACK;
\`\`\`
#### Izoh:
Haqiqiy ma'lumotlar ustida ehtiyot bo'ling.

### 3. Indekslangan ustunlarda \`LOWER()\`, \`DATE()\` kabi funksiyalarni ishlatish (Sargable muammosi)
#### Xato:
\`WHERE YEAR(created_at) = 2026;\` yozish.
#### To'g'ri usul:
\`WHERE created_at BETWEEN '2026-01-01 00:00:00' AND '2026-12-31 23:59:59'\`
#### Izoh:
Funksiyalar indeks ishlashini to'xtatadi.

### 4. Ortiqcha JOIN-lardan foydalanish
#### Xato:
So'rovda faqat foydalanuvchi ismi kerak bo'lsa ham, profil, buyurtmalar, hamyonlar jadvallarini qo'shib (JOIN) yuborish.
#### To'g'ri usul:
Faqat zarur bo'lgan jadvallarni ulab, so'rov mantiqini sodda saqlash.
#### Izoh:
Har bir JOIN baza uchun qo'shimcha hisob-kitob yuklamasidir.

### 5. \`LIKE '%kalit%'\` (ikki tomondan wildcard) bilan indeks kutish
#### Xato:
\`WHERE name LIKE '%Ali%'\` so'rovi uchun ismga indeks qo'yish.
#### Nima uchun noto'g'ri:
B-Tree indekslar faqat chapdan o'ngga ishlagani uchun, matn oldida kelgan \`%\` belgisi indeksni o'chirib qo'yadi.
#### To'g'ri usul:
Partial search uchun Full-Text Search (GIN indeks) yoki ElasticSearch ishlatish.
#### Izoh:
LIKE qidiruvlarida indeks faqat 'Ali%' (o'ngda wildcard) bo'lganda ishlaydi.

### 6. \`UNION\` o'rniga \`UNION ALL\` ishlatishda adashish
#### Xato:
Ikkita mustaqil to'plamni birlashtirishda oddiy \`UNION\` ishlatish.
#### Nima uchun noto'g'ri:
\`UNION\` dublikatlarni tekshirish va o'chirish uchun natijani xotirada qayta saralaydi (og'ir amal). \`UNION ALL\` esa dublikatlarni tekshirmaydi va juda tez ishlaydi.
#### To'g'ri usul:
Agar natijalarda dublikatlar bo'lmasligi aniq bo'lsa yoki dublikatlar ahamiyatsiz bo'lsa, har doim \`UNION ALL\` ishlating.
#### Izoh:
UNION ALL saralash yuklamasidan xalos qiladi.

### 7. Subquery-larni haddan tashqari ko'p ishlatish (Correlated Subqueries)
#### Xato:
SELECT ichida har bir qator uchun qayta-qayta ishlaydigan ichki so'rov yozish.
#### To'g'ri usul:
Subquery o'rniga \`LEFT JOIN\` va \`GROUP BY\` yordamida yagona so'rov yozish.
#### Izoh:
Correlated subqueries $O(N^2)$ yuklama keltirishi mumkin.

### 8. \`IN\` ro'yxatini juda katta qilib yuborish
#### Xato:
\`WHERE id IN (1, 2, 3, ... 50000 ta ID)\`
#### To'g'ri usul:
ID-larni vaqtinchalik jadvalga yozib, so'ng JOIN qilish.
#### Izoh:
Katta IN massivlari query parsing bosqichini o'ta sekinlashtiradi.

### 9. Jadval statistikasini (Statistics) yangilamaslik
#### Xato:
Jadvalga millionlab ma'lumotlar yuklandi, lekin \`ANALYZE\` qilinmadi. Optimizer eski ma'lumotlarga qarab xato plan tuzishda davom etadi.
#### To'g'ri usul:
PostgreSQL-da katta yuklashlardan so'ng \`ANALYZE table_name;\` so'rovini bajarish.
#### Izoh:
Optimizer to'g'ri qaror qabul qilishi uchun unga yangi statistika kerak.

### 10. \`ORDER BY\` ustunida indeks yo'qligi
#### Xato:
Sekin ishlovchi tartiblash.
#### To'g'ri usul:
Saralanadigan ustunda indeks yarating.
#### Izoh:
Filesort (diskda saralash) reliesion bazalardagi eng og'ir amallardan biridir.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`EXPLAIN\` nima va u qanday ishlatiladi?
   * **Javob:** \`EXPLAIN\` SQL so'rovi oldidan qo'shilib, bazaning ushbu so'rovni qanday bajarish rejasini (Execution Plan) ko'rsatuvchi buyruqdir.
   * **Intervyuda qanday javob berish kerak:** *"Explain plan orqali biz so'rov qayerda sekinlashayotganini (masalan, Seq Scan bo'layotganini) aniqlaymiz va optimallashtiramiz."*

2. **Savol:** \`Seq Scan\` va \`Index Scan\` farqi nimada?
   * **Javob:** Seq Scan jadvalni boshidan oxirigacha o'qib chiqadi. Index Scan esa indeks daraxti yordamida faqat kerakli qatorlarni tezkor topadi.
   * **Intervyuda qanday javob berish kerak:** *"Seq Scan diskni og'ir yuklaydi, Index Scan esa qidiruvni logarifmik vaqtda tez bajaradi."*

3. **Savol:** Query Cost (So'rov narxi) nima?
   * **Javob:** Baza optimizatori tomonidan so'rovni bajarish uchun protsessor va disk amallariga qo'yilgan taxminiy qiymat (baholash).
   * **Intervyuda qanday javob berish kerak:** *"Cost qanchalik kichik bo'lsa, so'rov shunchalik samarali yozilgan hisoblanadi."*

4. **Savol:** \`UNION\` va \`UNION ALL\` farqi nimada va performance uchun qaysi biri yaxshi?
   * **Javob:** \`UNION\` dublikatlarni olib tashlaydi va natijani saralaydi. \`UNION ALL\` esa dublikatlarni tekshirmaydi va shunchaki birlashtiradi. \`UNION ALL\` ancha tez ishlaydi.
   * **Intervyuda qanday javob berish kerak:** *"Dublikatlar xavfi bo'lmasa yoki ular ahamiyatsiz bo'lsa, performance uchun har doim UNION ALL ishlatish kerak."*

### Middle (5–8)
5. **Savol:** \`EXPLAIN\` va \`EXPLAIN ANALYZE\` farqi nimada?
   * **Javob:** \`EXPLAIN\` faqat taxminiy reja va costni ko'rsatadi (so'rov bajarilmaydi). \`EXPLAIN ANALYZE\` esa so'rovni jismonan bajarib, real bajarilish vaqtini (execution time) ko'rsatadi.
   * **Intervyuda qanday javob berish kerak:** *"Real vaqtni aniq o'lchash va xotira sarfini bilish uchun doimo EXPLAIN ANALYZE ishlatamiz."*

6. **Savol:** \`Nested Loop Join\` va \`Hash Join\` farqini tushuntiring.
   * **Javob:**
     * \`Nested Loop Join\`: Bitta jadvalning har bir qatori uchun ikkinchi jadvalni aylanib chiqadi ($O(N \\times M)$). Kichik jadvallarda tez ishlaydi.
     * \`Hash Join\`: Birinchi jadvalni xotirada hash-jadvalga o'tkazib, ikkinchisini tez solishtiradi ($O(N + M)$). Katta jadvallarda optimal.
   * **Intervyuda qanday javob berish kerak:** *"Baza optimizeri ma'lumotlar hajmiga qarab eng mos join turini avtomatik tanlaydi. Indekslar bo'lganda ko'p hollarda Merge Join yoki Index Scan ishlatiladi."*

7. **Savol:** \`Using filesort\` nima va uni qanday bartaraf etish mumkin?
   * **Javob:** Baza saralash (ORDER BY) amalini indekslar yordamida emas, balki xotirada (RAM yoki diskda) saralash algoritmi orqali bajarayotganini bildiradi.
   * **Intervyuda qanday javob berish kerak:** *"Bu muammoni hal qilish uchun ORDER BY qilinayotgan ustunda indeks yaratish shart."*

8. **Savol:** Index-Only Scan sodir bo'lishiga qanday erishamiz?
   * **Javob:** So'rovda SELECT va WHERE qismida faqat indekslangan ustunlar qatnashishi kerak yoki indeksga \`INCLUDE\` kalit so'zi yordamida qo'shimcha ustunlar qo'shilishi kerak.
   * **Intervyuda qanday javob berish kerak:** *"Baza jadval sahifalariga kirmaydi va faqat indeksning o'zidan o'qiydi, bu disk yuklamasini nolga tushiradi."*

### Senior (9–12)
9. **Savol:** \`Cold Database\` va \`Warm Database\` tushunchalari nima va nima uchun \`EXPLAIN ANALYZE\` birinchi va ikkinchi safar chaqirilganda har xil bajarilish vaqti beradi?
   * **Javob:** Birinchi chaqiriqda ma'lumotlar diskdan o'qiladi (Cold read - sekin). Baza o'qilgan ma'lumotlarni o'zining xotira buffer keshida (Shared Buffers) saqlab qoladi va keyingi safar to'g'ridan-to'g'ri RAMdan o'qiydi (Warm read - o'ta tez).
   * **Intervyuda qanday javob berish kerak:** *"Bu buffer cache hisobiga sodir bo'ladi. Real production yuklamasini to'g'ri baholash uchun birinchi chaqiriq vaqtini (disk I/O) inobatga olish muhim."*

10. **Savol:** PostgreSQL-da \`Vacuum\` va \`Autovacuum\` qanday ishlaydi va ular so'rovlar optimalligiga qanday ta'sir qiladi?
    * **Javob:** PostgreSQL-da \`UPDATE\` yoki \`DELETE\` bo'lganda eski qatorlar o'chmaydi, faqat o'lik (dead tuples) bo'lib qoladi. \`Vacuum\` ushbu o'lik qatorlar egallagan joyni tozalaydi va yangi ma'lumotlar yozilishi uchun bo'shatadi.
    * **Intervyuda qanday javob berish kerak:** *"Agar Autovacuum ishlamasa, jadval shishib ketadi (Table Bloat), bu esa oddiy Seq Scan so'rovlarining ham bir necha barobar sekinlashishiga olib keladi. Davriy ravishda vacuum va reindex qilish shart."*

11. **Savol:** \`Query Cardinality\` va \`Selectivity\` nima va ular optimizer qarorlariga qanday ta'sir qiladi?
    * **Javob:**
      * \`Cardinality\`: Ustundagi unikal qiymatlar soni.
      * \`Selectivity\`: Qidirilayotgan shartning jadvaldagi umumiy qatorlarga nisbati (foizda).
    * **Intervyuda qanday javob berish kerak:** *"Agar selectivity juda past bo'lsa (masalan, so'rov jadvalning 90% qatorini olib kelsa), optimizer indeks bo'lsa ham undan foydalanmaydi va to'g'ridan-to'g'ri Seq Scan qiladi, chunki bu tezroq."*

12. **Savol:** PostgreSQL-dagi \`Shared Buffers\` va \`Work Mem\` sozlamalari sekin so'rovlarni optimallashtirishda qanday rol o'ynaydi?
    * **Javob:**
      * \`Shared Buffers\`: Baza ma'lumotlarini keshda saqlash uchun ajratilgan RAM hajmi.
      * \`Work Mem\`: Har bir individual so'rovning saralash (ORDER BY) va Hash amallari uchun ajratilgan RAM xotirasi.
    * **Intervyuda qanday javob berish kerak:** *"Agar so'rovdagi saralash amali Work Mem hajmidan katta bo'lsa, baza saralashni diskdagi vaqtinchalik fayllarda (temporary files) bajarishga majbur bo'ladi va bu tezlikni keskin pasaytiradi. Work Mem hajmini oshirish og'ir so'rovlarni tezlashtiradi."*

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### E-commerce loyihasida foydalanuvchilar buyurtmalar tarixini optimallashtirish
Mijoz o'zining profili sahifasiga kirganda uning barcha buyurtmalari ro'yxati chiqishi kerak. Loyihada 10 million buyurtma bor.

#### Muammo:
Foydalanuvchi sahifani ochganda uzoq vaqt kutib qolyapti.
Sekin so'rov:
\`\`\`sql
SELECT id, amount, order_date FROM orders WHERE user_id = 452 ORDER BY order_date DESC;
\`\`\`
\`EXPLAIN\` planda \`Seq Scan\` va \`Using filesort\` aniqlandi. So'rov 4.5 soniya vaqt olyapti.

#### Yechim:
Biz \`user_id\` va \`order_date\` ustunlarida kompozit indeks yaratamiz:
\`\`\`sql
CREATE INDEX idx_orders_user_date ON orders(user_id, order_date DESC);
\`\`\`
Planni qayta tekshiramiz: Baza Seq Scan o'rniga \`Index Scan\` qildi va filesort yo'qoldi. Bajarilish vaqti **4.5 soniyadan 0.001 soniyagacha** qisqardi.

---

## 9. 🚀 Performance va Optimization

### Optimallashtirishning 5 ta oltin qoidasi:
1. **SELECT \\* ishlatmang:** Faqat kerakli ustunlarni oling.
2. **Indekslardan unumli foydalaning:** WHERE va JOIN ustunlarini indekslang.
3. **UNION o'rniga UNION ALL ishlating:** Agar dublikatlarni o'chirish shart bo'lmasa.
4. **Explain planni doimo o'rganing:** Sekin so'rovlarni indeks seek/scan holatiga keltiring.
5. **Jadval shishishini (bloat) oldini oling:** Autovacuum va reindex amallarini nazorat qilib boring.

---

## 10. 📌 Cheat Sheet

| Amal / Operator | Sintaksis | Asosiy Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **EXPLAIN** | \`EXPLAIN SELECT...\` | Taxminiy planni ko'rish | So'rovni bajarmaydi |
| **EXPLAIN ANALYZE**| \`EXPLAIN ANALYZE SELECT...\`| Real plan va vaqtni o'lchash| So'rovni jismonan bajaradi |
| **UNION ALL** | \`SELECT... UNION ALL SELECT...\`| Dublikatlarsiz tezkor birlashma| Saralash yuklamasi yo'q |
| **Index Scan** | Explain plandagi yozuv | Indeks orqali qidirish | optimal qidiruv |
| **Seq Scan** | Explain plandagi yozuv | To'liq jadvalni o'qish | Jadvallar katta bo'lsa yomon |
| **Filesort** | Explain plandagi yozuv | Xotirada saralash | Indeks qo'shish kerak |
`,
  exercises: [
    {
      "id": 1,
      "title": "Explain Plan Tahlili",
      "instruction": "`users` jadvalidan yoshi (`age`) 25 bo'lgan foydalanuvchilarni topuvchi so'rov uchun `EXPLAIN` rejasini ko'ring.",
      "startingCode": "-- EXPLAIN so'rovini yozing\n",
      "hint": "EXPLAIN SELECT * FROM users WHERE age = 25;",
      "test": "try { const res = db.exec('EXPLAIN SELECT * FROM users WHERE age = 25'); if(!res || !res.length) return 'EXPLAIN bajarilmadi'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      "id": 2,
      "title": "SELECT * dan qochish",
      "instruction": "`users` jadvalidan barcha ustunlarni (`SELECT *`) emas, faqat foydalanuvchilarning ismi (`name`) va elektron pochtasini (`email`) yuklash yuklamasini kamaytirish uchun so'rab oling.",
      "startingCode": "-- Faqat kerakli ustunlarni tanlang\n",
      "hint": "SELECT name, email FROM users;",
      "test": "if(!Array.isArray(result) || result.length === 0) return 'Natija topilmadi'; const row = result[0]; if(row.hasOwnProperty('id') || row.hasOwnProperty('age') || row.hasOwnProperty('city')) return 'Ortiqcha ustunlar yuklangan. Faqat name va email bo\\'lishi kerak.'; if(!row.hasOwnProperty('name') || !row.hasOwnProperty('email')) return 'Ism (name) yoki email topilmadi'; return null;"
    },
    {
      "id": 3,
      "title": "UNION ALL orqali optimallashtirish",
      "instruction": "`users` jadvalidan shahri (`city`) 'Toshkent' bo'lganlar va shahri 'Samarqand' bo'lganlarning ismini (`name`) dublikatlarni tekshirmaydigan eng tezkor operator (`UNION ALL`) yordamida birlashtiring.",
      "startingCode": "-- UNION ALL operatorini ishlating\n",
      "hint": "SELECT name FROM users WHERE city = 'Toshkent' UNION ALL SELECT name FROM users WHERE city = 'Samarqand';",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Jami 4 ta foydalanuvchi chiqishi kerak (3 Toshkentlik va 1 Samarqandlik)'; return null;"
    },
    {
      "id": 4,
      "title": "Qidiruvni indekslash",
      "instruction": "`users` jadvalining `email` ustuni uchun `idx_users_email` nomli unikal indeks yarating.",
      "startingCode": "-- Unikal indeks yaratish buyrug'ini yozing\n",
      "hint": "CREATE UNIQUE INDEX idx_users_email ON users(email);",
      "test": "try { db.exec('CREATE UNIQUE INDEX idx_users_email ON users(email)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Indeks yaratib bo\\'lmadi'; } return null;"
    },
    {
      "id": 5,
      "title": "Covering Index orqali Index-Only Scan",
      "instruction": "`users` jadvalining `email` va `name` ustunlarida `idx_users_email_name` nomli kompozit covering indeks yarating.",
      "startingCode": "-- Kompozit covering indeks yarating\n",
      "hint": "CREATE INDEX idx_users_email_name ON users(email, name);",
      "test": "try { db.exec('CREATE INDEX idx_users_email_name ON users(email, name)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Indeks yaratib bo\\'lmadi'; } return null;"
    },
    {
      "id": 6,
      "title": "Subquery-ni JOIN-ga o'tkazish",
      "instruction": "Kamida bitta buyurtma bergan foydalanuvchilarning ismini (`name`) olish uchun `IN (SELECT user_id FROM orders)` ko'rinishidagi sekin subquery o'rniga samaraliroq `INNER JOIN` va `DISTINCT` operatoridan foydalanib so'rov yozing.",
      "startingCode": "-- JOIN yordamida optimallashtirilgan so'rov yozing\n",
      "hint": "SELECT DISTINCT u.name FROM users u INNER JOIN orders o ON u.id = o.user_id;",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Natijada 3 ta unikal foydalanuvchi chiqishi kerak'; const names = result.map(r => r.name); if(!names.includes('Ali') || !names.includes('Vali')) return 'Natijada Ali va Vali bo\\'lishi kerak'; return null;"
    },
    {
      "id": 7,
      "title": "Sargable shart yozish",
      "instruction": "`orders` jadvalidan `order_date` ustunida indeks bor deb hisoblab, `DATE(order_date) = '2026-06-10'` kabi indeksni o'chiradigan shart o'rniga, indeksdan foydalanadigan `BETWEEN` operatorli (2026-06-10 00:00:00 dan 23:59:59 gacha) optimal so'rov yozing.",
      "startingCode": "-- BETWEEN operatoridan foydalanib so'rov yozing\n",
      "hint": "SELECT * FROM orders WHERE order_date BETWEEN '2026-06-10 00:00:00' AND '2026-06-10 23:59:59';",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Faqat 1 ta buyurtma topilishi kerak edi'; if(result[0].id !== 1) return 'To\\'g\\'ri buyurtma topilmadi'; return null;"
    },
    {
      "id": 8,
      "title": "N+1 So'rovlar Muammosini Yechish",
      "instruction": "Har bir foydalanuvchi uchun alohida buyurtmalarni so'rash (N+1) o'rniga, barcha foydalanuvchilar (`users`) va ularning jami buyurtmalar summasini (`SUM(amount)`) bitta so'rovda `LEFT JOIN` va `GROUP BY` yordamida samarali hisoblab oling.",
      "startingCode": "-- LEFT JOIN va GROUP BY ishlating\n",
      "hint": "SELECT u.name, SUM(o.amount) AS total_amount FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length < 4) return 'Kamida 4 ta foydalanuvchi bo\\'lishi kerak'; const ali = result.find(r => r.name === 'Ali'); if(!ali || Math.round(ali.total_amount) !== 1225) return 'Ali uchun jami buyurtma summasi noto\\'g\\'ri'; return null;"
    },
    {
      "id": 9,
      "title": "Correlated Subquery-dan qochish",
      "instruction": "Har bir foydalanuvchi uchun uning oxirgi buyurtma sanasini hisoblashda correlated subquery ishlatish o'rniga, `GROUP BY` va `MAX(order_date)` yordamida jadvallarni bir marta birlashtirib (JOIN) ishlatuvchi optimal so'rov yozing.",
      "startingCode": "-- GROUP BY va MAX orqali optimallashtiring\n",
      "hint": "SELECT u.id, u.name, MAX(o.order_date) AS last_order FROM users u INNER JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name;",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Jami 3 ta foydalanuvchining buyurtmasi chiqishi kerak'; const ali = result.find(r => r.name === 'Ali'); if(!ali || !ali.last_order.startsWith('2026-06-12')) return 'Oxirgi buyurtma sanasi noto\\'g\\'ri'; return null;"
    },
    {
      "id": 10,
      "title": "Kompozit indeks uchun qidiruv",
      "instruction": "`users` jadvalida status va shahar bo'yicha tez-tez qidiruv bo'lgani sababli `CREATE INDEX idx_users_city_status ON users(city, status)` yaratilgan. Ushbu kompozit indeks chapdan o'ngga ishlash qoidasiga rioya qilishi uchun `city` va `status` ustunlari ishtirok etgan qidiruv so'rovini yozing.",
      "startingCode": "-- Kompozit indeksdan to'g'ri foydalanuvchi so'rov yozing\n",
      "hint": "SELECT * FROM users WHERE city = 'Toshkent' AND status = 'active';",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Shartga mos 1 ta foydalanuvchi bo\\'shi kerak'; if(result[0].name !== 'Ali') return 'Toshkentlik active foydalanuvchi Ali bo\\'lishi kerak'; return null;"
    }
  ]
,
  quizzes: [
  {
    "id": 1,
    "question": "Query Optimizer nima vazifani bajaradi?",
    "options": [
      "Ma'lumotlar bazasini avtomatik o'chiradi",
      "Yozilgan so'rovni bajarishning eng optimal yo'lini tanlab, Execution Plan tuzadi",
      "Sanalarni bir-biriga qo'shadi",
      "Parollarni shifrlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Query Optimizer reliesion bazalarning miyasi hisoblanadi. U so'rovni eng kam resurs va eng tez bajaradigan yo'lini (Execution Plan) hisoblab chiqadi."
  },
  {
    "id": 2,
    "question": "EXPLAIN va EXPLAIN ANALYZE buyruqlari o'rtasidagi asosiy farq nima?",
    "options": [
      "EXPLAIN faqat MySQL da ishlaydi",
      "EXPLAIN ANALYZE so'rovni jismonan bajaradi va real vaqtni o'lchaydi, EXPLAIN esa faqat taxminiy planni ko'rsatadi",
      "EXPLAIN ANALYZE o'zgarishlarni doimiy saqlaydi",
      "Hech qanday farq yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "EXPLAIN faqat taxminiy costlarni baholaydi (so'rov bajarilmaydi). EXPLAIN ANALYZE esa so'rovni jismonan bajarib, real execution vaqtini ko'rsatadi."
  },
  {
    "id": 3,
    "question": "Seq Scan (Sequential Scan) qachon eng ko'p zarar keltiradi?",
    "options": [
      "Kichik jadvallarda (masalan, 10 qator)",
      "Katta hajmli jadvallarda (masalan, 10 million qator)",
      "Faqat NoSQL bazalarda",
      "Hech qachon zarar keltirmaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Katta jadvallarda Seq Scan (to'liq o'qish) disk va protsessorni 100% yuklab, so'rovni soniyalar yoki daqiqalar davomida bajarilishiga sabab bo'ladi."
  },
  {
    "id": 4,
    "question": "Execution plandagi 'Using filesort' nimani anglatadi?",
    "options": [
      "Fayllar to'g'ri saqlanganini",
      "Bazaning saralash amalini (ORDER BY) indekslarsiz, xotirada saralash algoritmi orqali bajarayotganini",
      "Ma'lumotlar o'chirilayotganini",
      "Baza optimizatsiyasi juda zo'rligini"
    ],
    "correctAnswer": 1,
    "explanation": "Filesort baza xotirada yoki vaqtinchalik disk fayllarida saralash (sort) mantiqini ishga solganini va u uchun indeks topolmaganini bildiradi (sekin ishlaydi)."
  },
  {
    "id": 5,
    "question": "UNION va UNION ALL farqi nimada va qaysi biri tezroq ishlaydi?",
    "options": [
      "UNION tezroq ishlaydi",
      "UNION ALL dublikatlarni tekshirmaydi va saralamaydi, shuning uchun u ancha tezroq ishlaydi",
      "Ikkalasi ham bir xil tezlikda ishlaydi",
      "UNION ALL faqat MySQL da bor"
    ],
    "correctAnswer": 1,
    "explanation": "UNION dublikatlarni o'chirish uchun xotirada saralash amalini bajaradi. UNION ALL esa shunchaki natijalarni birlashtirib bergani uchun o'ta tez ishlaydi."
  },
  {
    "id": 6,
    "question": "Index-Only Scan-ga qanday erishiladi?",
    "options": [
      "Barcha indekslarni o'chirish orqali",
      "SELECT va WHERE shartidagi barcha ustunlar indeks tarkibida bo'lishi orqali (baza jadvalga kirmasdan javob beradi)",
      "Faqat Primary Key ishlatganda",
      "Jadvalni to'liq qulflab"
    ],
    "correctAnswer": 1,
    "explanation": "Index-Only Scan so'ralgan barcha ma'lumotlar indeksda tayyor turganda jismoniy jadval sahifalariga bormasdan javob qaytarish jarayonidir."
  },
  {
    "id": 7,
    "question": "PostgreSQL-da o'lik qatorlarni (dead tuples) tozalash va jadval shishishini (bloat) oldini olish uchun qaysi mexanizm ishlaydi?",
    "options": ["Vacuum (va Autovacuum)", "Reindex", "Explain", "Optimize table"],
    "correctAnswer": 0,
    "explanation": "PostgreSQL-da Vacuum va Autovacuum eski o'chirilgan yoki o'zgartirilgan qatorlarni (dead tuples) tozalab, bo'sh joyni yangi ma'lumotlar yozilishi uchun bo'shatadi."
  },
  {
    "id": 8,
    "question": "So'rovda yoshi 18 dan kattalarni olib kelish sharti jadvalning 95% ma'lumotini qaytarsa (selectivity juda past bo'lsa), optimizer indeks bo'lsa ham nima qiladi?",
    "options": [
      "Indeks orqali sekin qidiradi",
      "Indeksni chetlab o'tib, Seq Scan (to'liq o'qish) qiladi",
      "Xatolik qaytaradi",
      "Avtomatik keshni yoqadi"
    ],
    "correctAnswer": 1,
    "explanation": "Selectivity juda past bo'lsa (deyarli hamma qator mos kelsa), optimizer indeksni o'qib vaqt yo'qotishni xohlamaydi va birdan Seq Scan-ga o'tadi."
  },
  {
    "id": 9,
    "question": "Work Mem (PostgreSQL sozlamasi) nima uchun xizmat qiladi?",
    "options": [
      "Foydalanuvchilar sessiyalarini saqlash uchun",
      "Har bir so'rovning saralash (ORDER BY) va Hash join amallari uchun ajratilgan RAM xotirasi",
      "Barcha jadvallar keshini saqlash uchun",
      "Sana formatini sozlash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Work Mem har bir so'rovning saralash va guruhlash amallari uchun xotira chegarasi bo'lib, agar u yetishmasa baza diskda vaqtinchalik sekin fayllarni yaratadi."
  },
  {
    "id": 10,
    "question": "Yozish (WRITE) amallarini EXPLAIN ANALYZE bilan tekshirganda qanday ehtiyotkorlik lozim?",
    "options": [
      "Hech qanday ehtiyotkorlik shart emas",
      "Tranzaksiya (BEGIN) ichida ishlatib, keyin rollback qilish shart, aks holda tahlil qilinayotgan ma'lumotlar bazada o'chib yoki o'zgarib ketadi",
      "Faqat o'qish kerak",
      "Baza xizmatini to'xtatish kerak"
    ],
    "correctAnswer": 1,
    "explanation": "EXPLAIN ANALYZE so'rovni real bajaradi. Shuning uchun INSERT/UPDATE/DELETE tahlil qilinayotganda ularni BEGIN tranzaksiyasi ichida yozib, so'ng ROLLBACK qilish shart."
  },
  {
    "id": 11,
    "question": "Explain plandagi 'actual time' nimani bildiradi?",
    "options": [
      "Taxminiy hisoblash vaqtini",
      "So'rovning jismonan bajarilishi uchun ketgan haqiqiy vaqtni (millisekundda)",
      "Serverning joriy vaqtini",
      "Ulanish vaqtini"
    ],
    "correctAnswer": 1,
    "explanation": "EXPLAIN ANALYZE natijasida ko'rsatiladigan 'actual time' so'rov bajarilishiga real ketgan millisekundlardir."
  },
  {
    "id": 12,
    "question": "Nima uchun execution plan keshlanishi (Prepared statements) yuqori yuklamali tizimlarda muhim?",
    "options": [
      "Ular ma'lumotlarni shifrlaydi",
      "Baza har safar SQL sintaksisini tekshirish va plan tuzishga (planning time) vaqt sarflamaydi",
      "Ular disk hajmini tejaydi",
      "Hech qanday ahamiyati yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "Keshlanish orqali planning time nolga tushadi, bu esa soniyada o'n minglab so'rov bajaradigan enterprise tizimlarda CPU yuklamasini tejaydi."
  }
]

};
