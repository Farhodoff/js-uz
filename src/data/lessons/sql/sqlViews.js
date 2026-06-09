export const sqlViews = {
  id: "sqlViews",
  title: "Ko'rinishlar (Views)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Ko'rinish (View) nima?
**Ko'rinish (View)** — bu ma'lumotlar bazasidagi "virtual" jadvaldir. Virtual deganda, uning ichida ma'lumotlar jismonan saqlanmaydi. U shunchaki biz yozgan murakkab SQL so'rovining saqlab qo'yilgan nomidir (alias). Biz ushbu ko'rinishga oddiy jadval kabi so'rov yuborganimizda, u orqa fonda o'sha murakkab so'rovni bajarib ma'lumotlarni tortib keladi.

### Nima uchun kerak?
1. **Soddalashtirish:** Murakkab va 5-6 ta jadvalni JOIN qiladigan so'rovlarni har safar qaytadan yozmaslik uchun ularni bitta View-ga o'rab qo'yamiz.
2. **Xavfsizlik:** Foydalanuvchilarga jismoniy jadvallarni emas, balki faqat kerakli ustunlar ko'rinadigan View-larni berish orqali maxfiy ma'lumotlarni (masalan parollarni) yashirish mumkin.

### Materialized View nima?
Oddiy View har safar so'ralganda orqa fondagi so'rovni qayta ishga tushiradi. **Materialized View** esa orqa fondagi so'rov natijasini diskka jismoniy jadval ko'rinishida yozib oladi. Bu juda murakkab hisob-kitoblar tez ishlashi uchun juda foydali, lekin ma'lumotlar o'zgarganda uni yangilab (\`REFRESH\`) turish kerak.

### Real hayotiy analogiya
Tasavvur qiling, siz **do'kon boshqaruvchisisiz**:
* **Jismoniy jadval (Table):** Omborxonadagi barcha tovarlar va ularning batafsil hujjatlari (sotib olingan narxi, yetkazib beruvchi kontakti va h.k.).
* **Ko'rinish (View):** Vitrina (oynali javon). Vitrinada tovarlar turadi, lekin ularning hamma hujjatlari va sotib olish narxlari yashirilgan. Mijozlar faqat o'zlari uchun kerak bo'lgan ma'lumotlarni (tovar nomi va narxi) ko'radilar.
* **Materialized View:** Vitrinadagi mahsulotlarning **fotografiyasi**. Surat tayyor turadi (juda tez ko'rish mumkin), lekin omborda tovar o'zgarsa, yangi suratga olish kerak (\`REFRESH\`).

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Oddiy View Yaratish)
Faqat Toshkentlik foydalanuvchilarni ko'rsatadigan virtual ko'rinish yaratish:
\`\`\`sql
-- View yaratish
CREATE VIEW toshkent_users AS
SELECT id, name, email 
FROM users 
WHERE city = 'Toshkent';

-- View-dan foydalanish (oddiy jadval kabi)
SELECT * FROM toshkent_users;
\`\`\`
* **Natija:** Toshkentda yashovchi faol foydalanuvchilar ro'yxati chiqadi.
* **Qachon ishlatiladi:** Backend-da faqat Toshkent mintaqasi uchun yoziladigan kodlarni soddalashtirishda.
* **Performance jihati:** Bu virtual so'rov bo'lgani sababli, foydalanilganda orqa fonda \`users\` jadvalidan qidiradi. \`city\` ustunida indeks bo'lsa, tez ishlaydi.

### 2. Intermediate Example (JOIN-li murakkab View)
Foydalanuvchilarning buyurtmalari va sarflagan summalari hisobotini beruvchi View:
\`\`\`sql
-- Foydalanuvchi buyurtmalar hisoboti View-sini yaratish
CREATE VIEW user_order_summaries AS
SELECT u.id AS user_id,
       u.name,
       COUNT(o.id) AS total_orders,
       SUM(o.amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Hisobotni ishlatish
SELECT * FROM user_order_summaries WHERE total_spent > 1000.00;
\`\`\`
* **Natija:** Jami 1000 dan ko'p xarid qilgan foydalanuvchilar hisoboti.
* **Qachon ishlatiladi:** Biznes hisobotlarini tayyorlashda backend kodini sodda saqlash uchun.
* **Performance jihati:** \`users\` va \`orders\` jadvallari katta bo'lsa, bu so'rov har safar chaqirilganda og'ir JOIN va \`GROUP BY\` ishlaydi.

### 3. Advanced Example (Materialized View va Refresh)
Hisobotlarni tezkor yuklash uchun Materialized View yaratish (PostgreSQL):
\`\`\`sql
-- Og'ir hisobotni jismoniy saqlovchi Materialized View yaratish
CREATE MATERIALIZED VIEW mv_user_order_summaries AS
SELECT u.id AS user_id,
       u.name,
       COUNT(o.id) AS total_orders,
       SUM(o.amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Ma'lumotlarni yangilash (omborda o'zgarish bo'lgandan keyin)
REFRESH MATERIALIZED VIEW mv_user_order_summaries;
\`\`\`
* **Natija:** Natijalar diskka yoziladi. Uni o'qish oddiy jadvalni o'qish bilan bir xil tezlikda (JOINlarsiz) bo'ladi.
* **Qachon ishlatiladi:** Har soniyada o'zgarishi shart bo'lmagan, lekin yuklanishi tez bo'lishi kerak bo'lgan dashboard-larda.
* **Performance jihati:** Ma'lumotlarni yangilash uchun \`REFRESH\` amali bajarilganda jadval vaqtincha qulflanishi (Lock) mumkin. PostgreSQL-da \`REFRESH MATERIALIZED VIEW CONCURRENTLY\` yordamida qulflashlarsiz yangilash mumkin.

### 4. Production Example (Xavfsizlik uchun ustunlarni yashirish)
Foydalanuvchilar jadvalidan parollar va maxfiy ma'lumotlarni yashirib, faqat ommaviy profillar uchun View yaratish:
\`\`\`sql
-- Ommaviy profillar uchun View (parollar va maxfiy ustunlar olib tashlangan)
CREATE VIEW public_user_profiles AS
SELECT id, 
       name, 
       city, 
       created_at 
FROM users 
WHERE status = 'active';
\`\`\`
* **Natija:** Tashqi API yoki UI uchun xavfsiz ma'lumotlar ko'rinishi.
* **Qachon ishlatiladi:** Tashqi dasturlar yoki uchinchi tomon integratsiyalari uchun bazaga ruxsat berganda.
* **Performance jihati:** Jismoniy jadval yuklamasini kamaytiradi va xavfsizlik auditidan oson o'tishga yordam beradi.

### 5. Enterprise Example (Updatable Views - Yangilanadigan View-lar)
PostgreSQL-da to'g'ridan-to'g'ri View orqali jismoniy jadvalga ma'lumot yozish:
\`\`\`sql
-- Sodda filtrlangan View yaratish
CREATE VIEW active_users_view AS
SELECT id, name, city, status
FROM users
WHERE status = 'active'
WITH CHECK OPTION; -- 'inactive' statusda ma'lumot yozishni taqiqlaydi

-- View orqali INSERT qilish (avtomatik users jadvaliga yozadi)
INSERT INTO active_users_view (id, name, city, status)
VALUES (99, 'Shirin', 'Samarqand', 'active');
\`\`\`
* **Natija:** Yangi foydalanuvchi jismoniy \`users\` jadvaliga qo'shiladi.
* **Qachon ishlatiladi:** Ma'lumotlar bazasini qatlamli (layered) arxitektura asosida qurishda.
* **Performance jihati:** \`WITH CHECK OPTION\` yozilayotgan ma'lumotlar View filtriga (WHERE) mos kelishini tekshiradi, bu esa ma'lumotlar sofligini ta'minlaydi.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Kodning takrorlanishi (DRY):** Har xil backend xizmatlarida bir xil og'ir JOIN so'rovlarini qayta-qayta yozishni oldini oladi.
* **Xavfsizlik (Data Security):** Bazadagi nozik ma'lumotlarni (telefon raqam, parol, balans) keraksiz foydalanuvchilardan himoya qiladi.
* **Qadimgi tizimlar integratsiyasi (Legacy database conversion):** Bazadagi jadvallar nomi o'zgarganda, eski dasturlar ishlamay qolmasligi uchun eski nom bilan View yaratib qo'yiladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. View orqali yozishda (INSERT/UPDATE) murakkab View-larni ishlatish
#### Xato:
\`GROUP BY\` yoki \`JOIN\` ishlatilgan \`user_order_summaries\` ko'rinishiga ma'lumot qo'shishga (INSERT) urinish.
#### Nima uchun noto'g'ri:
RDBMS guruhlangan yoki bog'langan ma'lumotlarning qaysi jadvalga va qanday yozilishini avtomatik aniqlay olmaydi.
#### To'g'ri usul:
Faqat bitta jadvaldan iborat, agregatsiyalarsiz sodda View-lar orqali yozish mumkin yoki baza darajasida \`INSTEAD OF TRIGGER\` yozish kerak.
#### Izoh:
Murakkab View-lar faqat o'qish (Read-only) uchun mo'ljallangan.

### 2. Materialized View ni yangilashni (REFRESH) unutib qo'yish
#### Xato:
Bazada foydalanuvchilar o'zgardi, lekin dashboard hali ham eski ma'lumotlarni ko'rsatyapti.
#### Nima uchun noto'g'ri:
Materialized view jismoniy ma'lumotlarni saqlaydi va avtomatik ravishda yangilanmaydi.
#### To'g'ri usul:
Cron orqali yoki jadvaldagi trigger yordamida \`REFRESH MATERIALIZED VIEW\` so'rovini davriy bajarib turish.
#### Izoh:
Materialized view-lar kesh (Cache) kabi ishlaydi va invalidatsiya talab qiladi.

### 3. View-larga haddan tashqari ko'p JOIN-lar qo'shish (View nesting)
#### Xato:
Bitta View-ni ikkinchi View-ga ulab, uni uchinchisiga ulab yuborish.
#### Nima uchun noto'g'ri:
Bu "so'rovlar portlashi"ga (Query explosion) olib keladi. Optimizer chalkashadi va bitta sodda so'rov orqa fonda 50 ta jadvalni o'qib ketishi mumkin.
#### To'g'ri usul:
Jadvallarni to'g'ridan-to'g'ri bog'laydigan toza, sodda View-lar yaratish.
#### Izoh:
View nesting reliesion bazalarni sekinlashtiruvchi eng og'ir muammolardan biridir.

### 4. View ustiga indeks qo'yishga urinish
#### Xato:
\`CREATE INDEX idx_view ON toshkent_users(name);\` deb yozish.
#### Nima uchun noto'g'ri:
Oddiy View virtual bo'lgani sababli jismoniy ma'lumotga ega emas va unga indeks qo'yib bo'lmaydi.
#### To'g'ri usul:
Indeksni jismoniy jadvalga (\`users\` ustiga) yaratish kerak yoki Materialized View ishlatish kerak.
#### Izoh:
Materialized View-lar ustiga jismoniy indekslar yaratish mumkin.

### 5. \`DROP VIEW\` ni jadval o'rniga ishlatish
#### Xato:
\`DROP VIEW users;\` yozish.
#### Nima uchun noto'g'ri:
Agar u jadval bo'lsa, xatolik qaytaradi.
#### To'g'ri usul:
\`DROP VIEW view_name;\` yoki \`DROP TABLE table_name;\`
#### Izoh:
View va Table sintaksislari alohida hisoblanadi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** SQL-da View nima?
   * **Javob:** View — bu saqlangan SQL so'rovidan iborat virtual jadvaldir.
   * **Intervyuda qanday javob berish kerak:** *"View ma'lumotlarni diskda saqlamaydi, u shunchaki tayyor mantiqiy filtr va JOIN-larni soddalashtirish uchun virtual qobiqdir."*

2. **Savol:** View va oddiy Jadval (Table) farqi nimada?
   * **Javob:** Jadval jismoniy ma'lumotlarni saqlaydi, View esa faqat SQL so'rovini saqlaydi.
   * **Intervyuda qanday javob berish kerak:** *"Jadvalda real ma'lumotlar saqlansa, View jadval ustiga qurilgan virtual oyna vazifasini bajaradi."*

3. **Savol:** View orqali ma'lumotlarni o'zgartirish (INSERT, UPDATE) mumkinmi?
   * **Javob:** Ha, faqat sodda, bitta jadvalga tayanadigan va agregatsiyalarsiz View-lar orqali mumkin.
   * **Intervyuda qanday javob berish kerak:** *"Agar View JOIN-lar yoki GROUP BY ishlatmagan bo'lsa, u orqali bazadagi jadvalga yozish mumkin."*

4. **Savol:** View-ni o'chirish qanday sintaksis bilan amalga oshiriladi?
   * **Javob:** \`DROP VIEW view_name;\`
   * **Intervyuda qanday javob berish kerak:** *"Ko'rinishlarni o'chirish uchun DROP VIEW, agar mavjudligiga ishonch bo'lmasa DROP VIEW IF EXISTS ishlatiladi."*

### Middle (5–8)
5. **Savol:** Materialized View nima va u oddiy View-dan qanday farq qiladi?
   * **Javob:** Materialized View o'z natijasini jismonan diskda saqlaydi, oddiy View esa har safar so'ralganda bazadan qaytadan o'qiydi.
   * **Intervyuda qanday javob berish kerak:** *"Materialized View og'ir hisobotlar tez ishlashi uchun kesh vazifasini bajaradi, lekin ma'lumot yangilanishi uchun REFRESH talab qiladi."*

6. **Savol:** \`REFRESH MATERIALIZED VIEW\` nimani anglatadi?
   * **Javob:** Materialized View tarkibidagi ma'lumotlarni jismoniy jadvallardagi so'nggi holatga qarab qayta hisoblab diskka yozadi.
   * **Intervyuda qanday javob berish kerak:** *"Bu keshni yangilash kabi ishlaydi. Uni ma'lum vaqt oralig'ida (Cron) yoki tranzaksiyadan so'ng bajarish kerak."*

7. **Savol:** View-larda xavfsizlik (Security) qanday ta'minlanadi?
   * **Javob:** Foydalanuvchiga to'liq jadvalga ruxsat bermasdan, faqat maxfiy bo'lmagan ustunlarni o'z ichiga olgan View yaratib beriladi.
   * **Intervyuda qanday javob berish kerak:** *"Masalan, parollar ustunini SELECT qilmaydigan View yaratib, tashqi dasturlarga faqat shu View-dan o'qish huquqini (GRANT SELECT ON view_name) berish mumkin."*

8. **Savol:** \`WITH CHECK OPTION\` nima uchun kerak?
   * **Javob:** View orqali ma'lumot yozilayotganda, yozilayotgan ma'lumot View ning filtrlash shartiga mos kelishini kafolatlaydi.
   * **Intervyuda qanday javob berish kerak:** *"Agar toshkentliklar View-siga samarqandlik foydalanuvchini qo'shmoqchi bo'lsak, WITH CHECK OPTION xatolik berib, ma'lumot ziddiyatini oldini oladi."*

### Senior (9–12)
9. **Savol:** Nested Views (Ichma-ich View-lar) qanday performance muammolariga olib kelishi mumkin?
   * **Javob:** Ular so'rov murakkabligini keskin oshirib yuboradi, optimizer indekslardan to'g'ri foydalana olmay qoladi va natijada kichik qidiruv ham bir necha soniya vaqt oladi.
   * **Intervyuda qanday javob berish kerak:** *"Nested view-lar production tizimlarda eng ko'p yuklama keltiradigan xatolardan. Baza orqa fonda juda ko'p subquery va JOIN-larni bajarishga majbur bo'ladi. Ularni toza SQL yoki CTE-lar bilan almashtirish lozim."*

10. **Savol:** Materialized View-ni blokirovkasiz (non-blocking) qanday yangilash mumkin?
    * **Javob:** PostgreSQL-da \`CONCURRENTLY\` kalit so'zidan foydalanib yangilash orqali.
    * **Intervyuda qanday javob berish kerak:** *"Buning uchun Materialized View-da kamida bitta unikal indeks (Unique Index) bo'lishi shart va REFRESH MATERIALIZED VIEW CONCURRENTLY view_name so'rovi bajariladi."*

11. **Savol:** SQL-da \`INSTEAD OF TRIGGER\` nima va u View-lar bilan qanday bog'liq?
    * **Javob:** Murakkab View-larga \`INSERT\`, \`UPDATE\` yoki \`DELETE\` so'rovlari kelganida, o'sha so'rov o'rniga ishlaydigan va ma'lumotlarni jismoniy jadvallarga to'g'ri taqsimlaydigan triggerdir.
    * **Intervyuda qanday javob berish kerak:** *"Biz JOIN-li og'ir View-larni ham yoziladigan (updatable) qilishimiz uchun uning ustiga INSTEAD OF trigger yozib, mantiqni boshqaramiz."*

12. **Savol:** View orqali amalga oshiriladigan so'rovning Execution Plan-i jismoniy jadvalnikidan farq qiladimi?
    * **Javob:** Yo'q, oddiy View-da baza optimizeri View-ni ochib yuboradi (Query Merging) va jismoniy jadvallarga to'g'ridan-to'g'ri so'rov yozgandek plan tuzadi.
    * **Intervyuda qanday javob berish kerak:** *"Baza mantiqan View-ni oddiy so'rovga aylantiradi. Shuning uchun plan jismoniy jadvallardagi indekslarga qarab tuziladi."*

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv muhitda bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars oxirida testlarni yechib ko'ring.

---

## 8. 🎯 Real Project Case Study

### SaaS loyihalarida billing va hisobot tizimi uchun Materialized View
Bizda **SaaS (masalan CRM)** loyihasi bor. Unda har bir mijoz kompaniya o'z xodimlarining savdolarini ko'rib turadi. Dashboard yuklanganda oylik jami savdo aylanmasi hisoblab berilishi kerak.

#### Muammo:
Ushbu hisobotni har safar foydalanuvchi sahifani yangilaganda millionlab qatorli \`transactions\` va \`users\` jadvallaridan hisoblash serverni qotiradi.

#### Yechim:
Har bir kompaniya uchun savdolar hisobotini beruvchi Materialized View yaratamiz:
\`\`\`sql
CREATE MATERIALIZED VIEW mv_tenant_sales AS
SELECT tenant_id,
       DATE_TRUNC('month', created_at) AS sales_month,
       SUM(amount) AS total_revenue
FROM tenant_transactions
GROUP BY tenant_id, DATE_TRUNC('month', created_at);

-- Kompaniya ID si bo'yicha indeks yaratamiz
CREATE UNIQUE INDEX idx_mv_tenant_sales ON mv_tenant_sales(tenant_id, sales_month);
\`\`\`
Ushbu Materialized View har 1 soatda \`REFRESH MATERIALIZED VIEW CONCURRENTLY mv_tenant_sales\` so'rovi yordamida orqa fonda yangilab turiladi va mijozlar dashboard-ni bir zumda (0.01 soniyada) ochishadi.

---

## 9. 🚀 Performance va Optimization

* **Virtual View:** Qo'shimcha saqlash joyi talab qilmaydi, lekin har safar chaqirilganda so'rov qayta ishlaydi.
* **Materialized View:** Diskda joy egallaydi, yangilanishi vaqt oladi, lekin o'qish tezligi oddiy jismoniy jadval bilan bir xil (o'ta tez).

---

## 10. 📌 Cheat Sheet

| Buyruq | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **CREATE VIEW** | \`CREATE VIEW name AS SELECT...\` | Virtual ko'rinish yaratish | Xotirada ma'lumot saqlamaydi |
| **DROP VIEW** | \`DROP VIEW name;\` | Ko'rinishni o'chirish | Jismoniy jadvalga ta'sir qilmaydi |
| **CREATE MATERIALIZED VIEW** | \`CREATE MATERIALIZED VIEW name AS...\` | Hisobotni diskka yozuvchi View | Kesh kabi ishlaydi |
| **REFRESH MATERIALIZED VIEW** | \`REFRESH MATERIALIZED VIEW name;\` | Materialized View ma'lumotlarini yangilash | Yangilanishda jadvalni qulflaydi |
| **WITH CHECK OPTION** | view shartida qo'shimcha | Yozilayotgan ma'lumotni tekshiradi | Noto'g'ri INSERT-ni cheklaydi |
`,
  exercises: [
  {
    "id": 1,
    "title": "Toshkentliklar Ko'rinishi",
    "instruction": "`users` jadvalidan yashash shahri (`city`) 'Toshkent' bo'lgan barcha foydalanuvchilarni tanlaydigan `toshkent_users` nomli virtual ko'rinish (VIEW) yarating.",
    "startingCode": "-- VIEW yaratuvchi SQL so'rovini yozing\n",
    "hint": "CREATE VIEW toshkent_users AS SELECT * FROM users WHERE city = 'Toshkent'",
    "test": "try { const res = db.exec('SELECT * FROM toshkent_users'); if(!Array.isArray(res) || res.length !== 3) return 'View yaratilmagan yoki noto\\'g\\'ri filtrlangan'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 2,
    "title": "Katta Buyurtmalar",
    "instruction": "`orders` jadvalidan buyurtma summasi (`amount`) 100.00 dan yuqori bo'lgan barcha buyurtmalarni tanlaydigan `high_orders` nomli virtual ko'rinish (VIEW) yarating.",
    "startingCode": "-- VIEW yaratuvchi SQL so'rovini yozing\n",
    "hint": "CREATE VIEW high_orders AS SELECT * FROM orders WHERE amount > 100",
    "test": "try { const res = db.exec('SELECT * FROM high_orders'); if(!Array.isArray(res) || res.length !== 4) return 'View yaratilmagan yoki noto\\'g\\'ri cheklangan'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  },
  {
    "id": 3,
    "title": "Buyurtmalar Soni",
    "instruction": "`orders` jadvalidan har bir `user_id` bo'yicha buyurtmalar sonini (`total_orders`) hisoblaydigan `user_orders_count` nomli VIEW yarating.",
    "startingCode": "-- VIEW yaratuvchi SQL so'rovini yozing\n",
    "hint": "CREATE VIEW user_orders_count AS SELECT user_id, COUNT(id) AS total_orders FROM orders GROUP BY user_id",
    "test": "try { const res = db.exec('SELECT * FROM user_orders_count'); if(!Array.isArray(res) || res.length !== 4) return 'View yaratilmagan yoki guruhlash xato'; } catch(e) { return 'Xato: ' + e.message; } return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "View (Ko'rinish) o'zida ma'lumot saqlaydimi?",
    "options": [
      "Ha, u ma'lumotlarni jismonan diskka saqlaydi",
      "Yo'q, u ma'lumot saqlamaydi, faqat SQL so'rovini saqlaydi",
      "Faqat server o'chguncha RAMda saqlaydi",
      "Faqat sonli ustunlarni saqlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Oddiy View virtual jadval bo'lib, o'zida hech qanday jismoniy ma'lumot saqlamaydi. U faqat belgilangan SQL so'rovini o'z ichiga oladi."
  },
  {
    "id": 2,
    "question": "Materialized View-ning oddiy View-dan asosiy farqi nimada?",
    "options": [
      "U faqat PostgreSQL da ishlaydi",
      "U o'z natijasini jismonan diskda saqlaydi (kesh kabi)",
      "U orqali ma'lumot yozish (INSERT) osonroq",
      "U hech qanday xotira egallamaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Materialized View so'rov natijasini diskda jismoniy jadval ko'rinishida saqlaydi, bu esa og'ir hisobotlarni bir zumda o'qish imkonini beradi."
  },
  {
    "id": 3,
    "question": "Materialized View tarkibidagi ma'lumotlarni yangilash uchun qaysi buyruq bajariladi?",
    "options": [
      "UPDATE MATERIALIZED VIEW",
      "REFRESH MATERIALIZED VIEW",
      "ALTER MATERIALIZED VIEW",
      "RELOAD MATERIALIZED VIEW"
    ],
    "correctAnswer": 1,
    "explanation": "Materialized View ma'lumotlarini asosiy jadvallardagi so'nggi holatga moslab yangilash uchun 'REFRESH MATERIALIZED VIEW' buyrug'i ishlatiladi."
  },
  {
    "id": 4,
    "question": "Ko'p jadvalli (JOIN-li) murakkab View orqali jismoniy jadvallarga ma'lumot qo'shish (INSERT) mumkinmi?",
    "options": [
      "Ha, baza avtomatik barcha jadvallarga taqsimlaydi",
      "Yo'q, murakkab View-lar faqat o'qish (Read-only) uchun mo'ljallangan",
      "Faqat administratordan ruxsat bo'lsa mumkin",
      "Faqat MySQL-da mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "JOIN yoki GROUP BY ishlatilgan murakkab View-lar orqali to'g'ridan-to'g'ri INSERT/UPDATE qilish mumkin emas, chunki baza qaysi jadvalga qanday yozishni aniqlay olmaydi."
  },
  {
    "id": 5,
    "question": "View yaratish uchun qaysi SQL operatori ishlatiladi?",
    "options": ["MAKE VIEW", "CREATE VIEW", "NEW VIEW", "ADD VIEW"],
    "correctAnswer": 1,
    "explanation": "SQL-da ko'rinish yaratish uchun standart 'CREATE VIEW view_name AS SELECT...' sintaksisi qo'llaniladi."
  },
  {
    "id": 6,
    "question": "PostgreSQL-da Materialized View-ni blokirovkasiz (non-blocking) yangilash qanday bajariladi?",
    "options": [
      "REFRESH MATERIALIZED VIEW CONCURRENTLY",
      "REFRESH MATERIALIZED VIEW ONLINE",
      "REFRESH MATERIALIZED VIEW WITHOUT LOCK",
      "REFRESH MATERIALIZED VIEW FAST"
    ],
    "correctAnswer": 0,
    "explanation": "CONCURRENTLY kalit so'zi Materialized View-ni yangilash paytida o'qish so'rovlarini qulflamasdan orqa fonda tezkor bajarish imkonini beradi (unikal indeks talab qilinadi)."
  },
  {
    "id": 7,
    "question": "Quyidagi View-lardan qaysi biri ustiga jismoniy indeks (INDEX) yaratish mumkin?",
    "options": [
      "Faqat oddiy View ustiga",
      "Faqat Materialized View ustiga",
      "Ikkalasi ustiga ham yaratib bo'lmaydi",
      "Ikkalasi ustiga ham yaratsa bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Materialized View diskda jismoniy ma'lumot saqlagani uchun uning ustunlariga xuddi oddiy jadvallardek indekslar qo'yish mumkin. Oddiy View-da esa ma'lumot bo'lmagani uchun indeks qo'yilmaydi."
  },
  {
    "id": 8,
    "question": "WITH CHECK OPTION nima uchun xizmat qiladi?",
    "options": [
      "View-ni har soniyada tekshirib turish uchun",
      "View orqali yozilayotgan ma'lumotlar View filtri (WHERE) shartiga mos kelishini tekshirish uchun",
      "Indekslarni tekshirish uchun",
      "Xavfsizlik parolini o'rnatish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "WITH CHECK OPTION View orqali INSERT/UPDATE qilinayotgan qatorlar View ning WHERE shartiga mos kelishini ta'minlaydi, aks holda xatolik qaytaradi."
  },
  {
    "id": 9,
    "question": "View-ni o'chirish uchun to'g'ri SQL buyrug'i qaysi?",
    "options": ["DELETE VIEW view_name", "DROP VIEW view_name", "REMOVE VIEW view_name", "CLEAR VIEW view_name"],
    "correctAnswer": 1,
    "explanation": "SQL-da ko'rinishni o'chirish uchun 'DROP VIEW view_name' buyrug'i ishlatiladi."
  },
  {
    "id": 10,
    "question": "View-lar xavfsizlikka (Security) qanday yordam beradi?",
    "options": [
      "Ular ma'lumotlarni shifrlaydi (encrypt)",
      "Ular maxfiy ustunlarni yashirib, faqat ruxsat berilgan ma'lumotlarni ommaviy qilish imkonini beradi",
      "Ular SQL Injection hujumlarini avtomatik to'xtatadi",
      "Ular parollarni avtomatik o'chiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Foydalanuvchilarga jismoniy jadvallarga emas, balki faqat kerakli xavfsiz ustunlar tanlangan View-larga ruxsat berish orqali maxfiy ma'lumotlar himoya qilinadi."
  },
  {
    "id": 11,
    "question": "Nested Views (Ichma-ich View-lar) nima uchun tavsiya etilmaydi?",
    "options": [
      "Ular SQL-da taqiqlangan",
      "Ular so'rov murakkabligini oshirib, performance-ni keskin pasaytiradi",
      "Ular faqat MySQL-da ishlaydi",
      "Ular xotirani o'chirib yuboradi"
    ],
    "correctAnswer": 1,
    "explanation": "View ichida View yaratilganda baza optimizeri so'rovni tahlil qilishda qiynaladi va indekslardan unumli foydalana olmay Sequential Scan-ga majbur bo'ladi."
  },
  {
    "id": 12,
    "question": "INSTEAD OF TRIGGER nima uchun ishlatiladi?",
    "options": [
      "Jadvalga ma'lumot yozishni taqiqlash uchun",
      "Murakkab View-larga kelgan INSERT/UPDATE/DELETE amallarini jismoniy jadvallarga to'g'ri taqsimlash uchun",
      "Avtomatik keshni o'chirish uchun",
      "Sanalarni solishtirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "INSTEAD OF triggeri yozib bo'lmaydigan (non-updatable) murakkab View-larga kelgan yozish amallarini backend kabi boshqarish imkonini beradi."
  }
]

};
