export const sqlIndexes = {
  id: "sqlIndexes",
  title: "Indekslar (Indexes)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish

### Indeks (Index) nima?
**Indeks (Index)** — bu ma'lumotlar bazasidan ma'lumotlarni qidirishni tezlashtirish uchun mo'ljallangan maxsus yordamchi strukturadir. U xuddi kitob oxiridagi **mundarijaga** o'xshaydi.

Agar sizda 1000 sahifali kitob bo'lsa va undan "Tranzaksiya" so'zini qidirmoqchi bo'lsangiz:
* **Indekssiz:** Har bir sahifani birma-bir o'qib chiqasiz (bu SQL-da **Full Table Scan** deb ataladi).
* **Indeks bilan:** Kitob oxiridagi mundarijani ochasiz, "Tranzaksiya" so'zini topib (masalan, 854-sahifa) to'g'ridan-to'g'ri o'sha sahifani ochasiz (bu **Index Scan/Index Seek** deb ataladi).

### Indeks Turlari:
1. **B-Tree Indeks (Balanced Tree):** Eng ko'p ishlatiladigan universal indeks turi. U ma'lumotlarni saralangan daraxt ko'rinishida saqlaydi. Diapazonli qidiruvlarni (\`>\`, \`<\`, \`BETWEEN\`) juda yaxshi qo'llab-quvvatlaydi.
2. **Hash Indeks:** Qiymatlarni tezkor tekshirish uchun ishlatiladi. Faqat aniq tenglikni (\`=\`) tez qidiradi, lekin saralash va diapazonlarni qo'llab-quvvatlamaydi.
3. **Unique Index:** Ustundagi qiymatlar takrorlanmasligini kafolatlaydi (masalan, \`email\` yoki \`username\` uchun).
4. **Composite Index (Kompozit indeks):** Bir nechta ustunlarni birlashtirib yaratiladigan indeks (masalan, \`WHERE city = 'Toshkent' AND status = 'active'\`).
5. **Expression Index (Qisman/Funksional indeks):** Ustunning o'ziga emas, funksiya natijasiga qo'yiladigan indeks (masalan, \`LOWER(email)\`).

### Salbiy Tomoni:
Indekslar sehrli tayoqcha emas. Ular:
* **Yozishni sekinlashtiradi:** Har safar yangi qator yozilganda, indeks daraxti qayta muvozanatlanishi (rebalance) kerak.
* **Joy egallaydi:** Indekslar diskda alohida joy egallaydi.

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Sodda Indeks Yaratish)
Foydalanuvchilarning elektron pochtasi bo'yicha qidiruvni tezlashtirish:
\`\`\`sql
-- email ustunida indeks yaratish
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Qidiruv
SELECT * FROM users WHERE email = 'ali@mail.com';
\`\`\`
* **Natija:** Baza to'liq jadvalni o'qimasdan (\`Seq Scan\`), indeks yordamida $O(1)$ yoki $O(\\log N)$ vaqtda foydalanuvchini topadi.
* **Qachon ishlatiladi:** Login qilish, profillarni qidirish kabi tez-tez bajariladigan ishlarda.
* **Performance jihati:** \`UNIQUE\` kaliti bazada takrorlanishlar bo'lmasligini ta'minlaydi.

### 2. Intermediate Example (Kompozit Indeks - Composite Index)
Shahar va foydalanuvchi statusi bo'yicha bir vaqtda qidiruvni tezlashtirish:
\`\`\`sql
-- Kompozit indeks yaratish
CREATE INDEX idx_users_city_status ON users(city, status);

-- Qidiruv
SELECT * FROM users WHERE city = 'Toshkent' AND status = 'active';
\`\`\`
* **Natija:** Toshkentlik faol foydalanuvchilar ro'yxati tezkor chiqadi.
* **Qachon ishlatiladi:** Murakkab filtrlarga ega qidiruv tizimlarida.
* **Performance jihati:** Kompozit indeksda ustunlar ketma-ketligi o'ta muhim. B-Tree qoidasiga ko'ra, indeks faqat chapdan o'ngga qarab ishlaydi. Ya'ni, ushbu indeks \`WHERE status = 'active'\` sharti uchun ishlamaydi, chunki \`city\` birinchi turibdi.

### 3. Advanced Example (Qisman/Funksional Indeks - Expression Index)
Matnlarni katta-kichik harf farqisiz qidirganda indeksdan foydalanish:
\`\`\`sql
-- Funksional indeks yaratish
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Qidiruv
SELECT * FROM users WHERE LOWER(email) = 'ali@mail.com';
\`\`\`
* **Natija:** Baza LOWER funksiyasi bajarilganidan keyin ham indeks orqali ishlaydi.
* **Qachon ishlatiladi:** Login qilishda foydalanuvchi har xil harflar yozganda xavfsiz qidirish uchun.
* **Performance jihati:** Bu indeks faqat \`LOWER(email)\` sharti ishlatilganda ishlaydi. Oddiy \`WHERE email = ...\` uchun ishlamasligi mumkin.

### 4. Production Example (Partial Index - Qisman Indeks)
Faqat o'chirilmagan faol foydalanuvchilarni indekslash (PostgreSQL):
\`\`\`sql
-- Faqat deleted_at IS NULL bo'lgan faol qatorlarni indekslash
CREATE INDEX idx_active_users ON users(id) 
WHERE deleted_at IS NULL;
\`\`\`
* **Natija:** Indeks hajmi juda kichik bo'ladi, chunki u o'chirilgan foydalanuvchilar ma'lumotlarini o'z ichiga olmaydi.
* **Qachon ishlatiladi:** Katta hajmli soft-delete (o'chirilganlar bazada qoladigan) jadvallarida.
* **Performance jihati:** Diskdan joyni tejaydi va indeks yangilanish vaqtini keskin kamaytiradi.

### 5. Enterprise Example (Covering Index - Indeks ichidan o'qish)
Hatto jadvalning o'zini o'qimasdan, faqat indeks ma'lumotlaridan foydalanib javob qaytarish (PostgreSQL):
\`\`\`sql
-- INCLUDE yordamida qo'shimcha ma'lumotlarni indeks ichiga joylash
CREATE INDEX idx_users_covering ON users(email) 
INCLUDE (name);

-- Qidiruv (Baza jadvalga kirmaydi, faqat indeksdan javob beradi)
SELECT name FROM users WHERE email = 'ali@mail.com';
\`\`\`
* **Natija:** Index-Only Scan amalga oshadi, bu jadval sahifalarini o'qish yuklamasini (I/O) deyarli nolga tushiradi.
* **Qachon ishlatiladi:** O'ta yuqori yuklamali API tizimlarida.
* **Performance jihati:** \`INCLUDE\` qismidagi ustunlar indeks daraxtini saralamaydi, shunchaki eng quyi barg tugunlarda (leaf nodes) saqlanadi.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Indeks relyatsion bazalardagi eng og'ir muammo — **Seq Scan (Sequential Scan)** muammosini hal qiladi. 10 millionlik foydalanuvchilar jadvalida bitta emailni topish uchun indeks bo'lmasa, server 10 millionta qatorni diskdan xotiraga o'qib chiqishga majbur bo'ladi (bu bir necha soniya yoki daqiqa olishi mumkin). Indeks yordamida esa bu qidiruv 1-2 millisekundga tushadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Jadvaldagi barcha ustunlarga indeks qo'yib tashlash
#### Xato:
Jadvaldagi 20 ta ustunning har biriga alohida \`CREATE INDEX\` qilish.
#### Nima uchun noto'g'ri:
Har bir indeks diskda joy egallaydi va \`INSERT\`/\`UPDATE\` amallarini o'ta sekinlashtiradi.
#### To'g'ri usul:
Faqat \`WHERE\`, \`JOIN\` va \`ORDER BY\` shartlarida ko'p ishlatiladigan ustunlarga indeks qo'yish.
#### Izoh:
Indekslar balanslangan holda ishlatilishi lozim.

### 2. Kompozit indeks ustunlari ketma-ketligini noto'g'ri loyihalash
#### Xato:
\`(status, city)\` indeksini yaratib, so'rovda \`WHERE city = 'Toshkent'\` deb qidirish.
#### Nima uchun noto'g'ri:
B-Tree qoidasiga ko'ra, indeks chapdan o'ngga ishlaydi. Birinchi turgan \`status\` sharti berilmasa, bu indeks butunlay ishlamaydi.
#### To'g'ri usul:
Tez-tez yolg'iz o'zi qidiriladigan yoki ko'proq unikal qiymatga ega bo'lgan ustunni kompozit indeksda birinchi o'ringa qo'yish.
#### Izoh:
Indeks tartibi uning ishlash samaradorligini belgilaydi.

### 3. Indekslangan ustunda funksiya ishlatish (Sargable muammosi)
#### Xato:
\`WHERE DATE(created_at) = '2026-06-10'\` deb qidirish (\`created_at\` indekslangan).
#### Nima uchun noto'g'ri:
\`DATE()\` funksiyasi indeksni o'chirib qo'yadi.
#### To'g'ri usul:
\`WHERE created_at BETWEEN '2026-06-10 00:00:00' AND '2026-06-10 23:59:59'\`
#### Izoh:
Indekslangan ustun funksiyalarga o'ralmasligi kerak.

### 4. Kichik jadvallarga indeks qo'shish
#### Xato:
Atigi 50-100 ta qatori bor \`status_types\` jadvaliga indeks yaratish.
#### Nima uchun noto'g'ri:
Kichik jadvallarda baza optimizeri indeksni o'qib vaqt sarflagandan ko'ra, jadvalning o'zini birdan o'qib qo'ya qoladi (\`Seq Scan\`). Indeks keraksiz joy egallaydi.
#### To'g'ri usul:
Kichik ma'lumotli jadvallarni indekslash shart emas.
#### Izoh:
Indeks faqat katta hajmli ma'lumotlarda o'zini oqlaydi.

### 5. \`OR\` operatori bilan indeks ishlashini kutish
#### Xato:
\`WHERE email = 'ali@mail.com' OR phone = '99890...'\`
#### Nima uchun noto'g'ri:
Ko'pincha \`OR\` operatori indeks ishlashini to'xtatadi.
#### To'g'ri usul:
\`UNION\` yordamida ikkita alohida so'rov yozish.
#### Izoh:
UNION har bir shartni o'z indeksi orqali tezkor bajaradi.

### 6. NULL qiymatlar ko'p bo'lgan ustunni to'liq indekslash
#### Xato:
1 million foydalanuvchidan atigi 100 tasida yozilgan \`vip_code\` ustunini to'liq indekslash.
#### To'g'ri usul:
\`WHERE vip_code IS NOT NULL\` partial index yaratish.
#### Izoh:
Partial index kesh hajmini ancha qisqartiradi.

### 7. Matnlar ustiga B-Tree indeks qo'yib to'liq matnli (Full-text) qidiruv qilish
#### Xato:
Maqola matni saqlanadigan \`content TEXT\` ustuniga B-Tree indeks qo'yib, \`LIKE '%kalit_soz%'\` deb qidirish.
#### Nima uchun noto'g'ri:
B-Tree boshida wildcards (\`%\`) kelgan matnlarni indeks orqali topa olmaydi.
#### To'g'ri usul:
Baza darajasida \`Full-Text Search\` (PostgreSQL-da \`TSVECTOR\` va \`GIN\` indeksi) yoki ElasticSearch ishlating.
#### Izoh:
Matnli qidiruv uchun maxsus indekslar lozim.

### 8. Indekslar eskirganini hisobga olmaslik
#### Xato:
Bazada millionlab INSERT/DELETE bo'ldi, lekin indekslar qayta tuzilmadi (Rebuild qilinmadi).
#### To'g'ri usul:
Davriy ravishda indekslar statistikasini yangilash yoki \`REINDEX\` amalini bajarish.
#### Izoh:
Eskirgan indekslar so'rovlar tezligini pasaytiradi.

### 9. Foreign Key ustunlarini indekslashni unutish
#### Xato:
\`orders\` jadvalidagi \`user_id\` ustunini indekslamaslik.
#### Nima uchun noto'g'ri:
JOIN so'rovlari bajarilganda har doim ushbu ustun bo'yicha bog'lanadi. Indeks bo'lmasa JOIN o'ta sekin ishlaydi.
#### To'g'ri usul:
Barcha Foreign Key ustunlarida indeks yarating.
#### Izoh:
JOIN amallari asosi indekslardir.

### 10. Kardinalligi past ustunlarni indekslash
#### Xato:
Faqat 'M' va 'F' (gender) qiymatlari saqlanadigan ustunga indeks qo'yish.
#### Nima uchun noto'g'ri:
Baza baribir indeksdan foydalanmaydi, chunki o'qilganda jadvalning 50% qismini o'qishga majbur.
#### To'g'ri usul:
Faqat unikal qiymatlari ko'p (High Cardinality) bo'lgan ustunlarni indekslang.
#### Izoh:
Indeks selektivligi yuqori bo'lishi shart.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Indeks nima va u nima uchun kerak?
   * **Javob:** Indeks — jadvaldan kerakli ma'lumotlarni tezroq topish uchun alohida yaratiladigan mundarijaga o'xshash strukturadir.
   * **Intervyuda qanday javob berish kerak:** *"Indeks SELECT so'rovlarini tezlashtiradi, lekin INSERT va UPDATE amallarini sekinlashtiradi va diskda joy egallaydi."*

2. **Savol:** B-Tree va Hash indeks farqi nima?
   * **Javob:** B-Tree saralangan daraxt bo'lib, diapazonli qidiruvlarni qo'llab-quvvatlaydi. Hash indeks esa faqat aniq tenglikni (\`=\`) qidiradi.
   * **Intervyuda qanday javob berish kerak:** *"PostgreSQL-da standart indeks B-Tree hisoblanadi. Hash indeks diapazonli (> yoki <) qidiruvlarda ishlamaydi."*

3. **Savol:** \`Seq Scan\` (Sequential Scan) nima?
   * **Javob:** Ma'lumotlar bazasining jadvaldagi barcha qatorlarni birma-bir o'qib chiqishi.
   * **Intervyuda qanday javob berish kerak:** *"Jadvalda indeks bo'lmasa yoki optimizer indeks foydasiz deb topsa, to'liq jadvalni o'qib chiqadi (Full Table Scan)."*

4. **Savol:** \`Index Scan\` nima?
   * **Javob:** Bazaning ma'lumotni indeks daraxti orqali topib, faqat kerakli sahifalarni o'qishi.
   * **Intervyuda qanday javob berish kerak:** *"Indeks scan qidiruv vaqtini logarifmik darajada kamaytiradi va disk yuklamasini tejaydi."*

### Middle (5–8)
5. **Savol:** Kompozit indeks (Composite Index) yaratganda ustunlar tartibi nima uchun muhim?
   * **Javob:** B-Tree indekslar faqat chapdan o'ngga ishlaydi.
   * **Intervyuda qanday javob berish kerak:** *"Agar (city, status) indeksimiz bo'lsa, WHERE city = ? AND status = ? yoki faqat WHERE city = ? shartlarida indeks ishlaydi. Lekin faqat WHERE status = ? uchun bu indeks ishlamaydi."*

6. **Savol:** Partial Index (Qisman indeks) nima va uning foydasi nimada?
   * **Javob:** Faqat ma'lum bir \`WHERE\` shartiga to'g'ri keladigan qatorlarni indekslashdir.
   * **Intervyuda qanday javob berish kerak:** *"Masalan, faqat is_active = TRUE bo'lgan foydalanuvchilarni indekslasak, indeks diskda juda kam joy egallaydi va tez yangilanadi."*

7. **Savol:** Expression Index (Funksional indeks) nima?
   * **Javob:** Ustunning qiymatiga emas, funksiya amali natijasiga qo'yiladigan indeks.
   * **Intervyuda qanday javob berish kerak:** *"Agar biz tez-tez WHERE LOWER(email) deb qidirsak, indeksni ham LOWER(email) ustiga yaratamiz. Shunda qidiruv sekinlashmaydi."*

8. **Savol:** \`Index-Only Scan\` nimani anglatadi va u qachon sodir bo'ladi?
   * **Javob:** Baza so'ralgan barcha ma'lumotlarni jadval sahifalariga kirmasdan, faqat indeksning o'zidan o'qib qaytara olishi.
   * **Intervyuda qanday javob berish kerak:** *"Agar SELECT qilinayotgan va WHERE shartidagi barcha ustunlar indeks tarkibida (yoki INCLUDE qismida) bo'lsa, Index-Only Scan sodir bo'ladi."*

### Senior (9–12)
9. **Savol:** B-Tree indeksining ichki tuzilishi (Internal structure) qanday va u $O(\\log N)$ vaqtda ma'lumotni qanday qidiradi?
   * **Javob:** B-Tree daraxti Root node (ildiz), Intermediate nodes (oraliq tugunlar) va Leaf nodes (barg tugunlari) dan iborat bo'lib, barcha barglar bir xil balandlikda turadi.
   * **Intervyuda qanday javob berish kerak:** *"B-Tree saralangan tartibda ishlaydi. Baza ildiz tugunidan boshlab qiymatlarni solishtirib, kerakli shoxga tushib boradi va barg tugunidagi jismoniy qator manziliga (TID/RID) yetib boradi. Bu logarifmik vaqt oladi."*

10. **Savol:** Write Amplification (Yozish yuklamasi) muammosi indekslar bilan qanday bog'liq va buni qanday kamaytirish mumkin?
    * **Javob:** Ustun tez-tez UPDATE bo'lganda, indeks daraxti ham har safar yangilanishga majbur bo'ladi, bu esa disk amallarini keskin oshiradi.
    * **Intervyuda qanday javob berish kerak:** *"Yozish yuklamasini kamaytirish uchun keraksiz indekslarni o'chirish, kompozit indekslar sonini cheklash va partial indekslardan foydalanish lozim."*

11. **Savol:** PostgreSQL-dagi \`GIN\` (Generalized Inverted Index) indeksi nima va u qachon ishlatiladi?
    * **Javob:** Teskari indeks turi bo'lib, bitta qatorda bir nechta qiymat (masalan, JSON kalitlari, massivlar, matn bo'laklari) bo'lganda ishlatiladi.
    * **Intervyuda qanday javob berish kerak:** *"GIN indekslari massivlar, to'liq matnli qidiruv (Full-Text Search) va JSONB ustunlarini indekslash uchun o'ta samaralidir."*

12. **Savol:** \`Covering Index\` (Yopuvchi indeks) yaratish loyiha yuklamasini qanday kamaytiradi va \`INCLUDE\` sintaksisining an'anaviy kompozit indeksdan afzalligi nimada?
    * **Javob:** \`INCLUDE\` ustunlari faqat barg tugunlarda saqlangani uchun B-Tree daraxtini saralash yuklamasi (maintenance cost) oshmaydi.
    * **Intervyuda qanday javob berish kerak:** *"INCLUDE yordamida biz jadvalga kirmasdan faqat indeksdan o'qish (Index-Only Scan) imkonini yaratamiz, shu bilan birga indeks yangilanish vaqtini saralash yuklamasisiz saqlab qolamiz."*

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner yordamida bajariladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Ijtimoiy tarmoqda foydalanuvchilarni ism va familiya bo'yicha tezkor qidirish
Katta ijtimoiy tarmoqda 50 million foydalanuvchi bor. Qidiruv panelida \`Ali\` deb yozilganda, ismi yoki familiyasi shu harf bilan boshlanadiganlar chiqishi kerak.

#### Muammo:
Agar biz oddiy \`WHERE name LIKE 'Ali%' OR surname LIKE 'Ali%'\` yozsak va ularga alohida indeks qo'ysak, baza \`OR\` sababli indekslarni ishlatmasligi yoki sekin ishlashi mumkin.

#### Yechim:
Biz ismi va familiyani birlashtiruvchi kompozit indeks yoki funksional indeks yaratamiz:
\`\`\`sql
CREATE INDEX idx_users_search ON users(LOWER(name), LOWER(surname));
\`\`\`
Yoki so'rovni \`UNION\` yordamida ikkita indeks scan-ga bo'lamiz:
\`\`\`sql
SELECT id, name, surname FROM users WHERE name LIKE 'Ali%'
UNION
SELECT id, name, surname FROM users WHERE surname LIKE 'Ali%';
\`\`\`
Bu mantiq har bir qidiruvni 0.002 soniyada bajarilishini ta'minlaydi.

---

## 9. 🚀 Performance va Optimization

\`EXPLAIN\` plandagi indeks amallari:
* **Index Scan:** Indeks daraxtidan kerakli kalit topilib, keyin jadvaldan qator o'qiladi.
* **Index-Only Scan:** Eng tezkor usul. Jadval sahifalariga umuman kirmaydi, barcha ma'lumot indeksda bor.
* **Bitmap Index Scan:** Bir nechta indekslarni birlashtirib, natijani xotirada bitmap shaklida yig'ib olish.

---

## 10. 📌 Cheat Sheet

| Indeks Turi | Sintaksis | Asosiy Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **B-Tree** | \`CREATE INDEX idx ON tbl(col);\` | Universal tezkor qidiruv | Diapazonlarni qo'llab-quvvatlaydi |
| **Unique** | \`CREATE UNIQUE INDEX...\` | Takrorlanishni cheklash | Primary Key kabi ishlaydi |
| **Composite** | \`CREATE INDEX idx ON tbl(c1, c2);\` | Ko'p ustunli shartlar uchun | Tartib o'ta muhim (chapdan o'ngga) |
| **Partial** | \`CREATE INDEX... WHERE status='active'\`| Joyni tejash | Faqat shartli qatorlarni indekslaydi |
| **Expression**| \`CREATE INDEX ON tbl(LOWER(col));\`| Funksiya natijasini indekslash| So'rovda ham LOWER ishlatilishi shart |
`,
  exercises: [
    {
      "id": 1,
      "title": "Oddiy Indeks Yaratish",
      "instruction": "`users` jadvalining yashash shahri (`city`) ustunida `idx_users_city` nomli indeks yarating.",
      "startingCode": "-- Indeks yaratuvchi SQL so'rovini yozing\n",
      "hint": "CREATE INDEX idx_users_city ON users(city);",
      "test": "try { db.exec('CREATE INDEX idx_users_city ON users(city)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Indeks yaratib bo\\'lmadi'; } return null;"
    },
    {
      "id": 2,
      "title": "Unikal Indeks Yaratish",
      "instruction": "`products` jadvalining nomi (`name`) ustunida unikal `idx_products_name` nomli indeks yarating.",
      "startingCode": "-- Unikal indeks yaratuvchi SQL so'rovini yozing\n",
      "hint": "CREATE UNIQUE INDEX idx_products_name ON products(name);",
      "test": "try { db.exec('CREATE UNIQUE INDEX idx_products_name ON products(name)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Unikal indeks yaratib bo\\'lmadi'; } return null;"
    },
    {
      "id": 3,
      "title": "Kompozit Indeks Yaratish",
      "instruction": "`orders` jadvalining `user_id` va `order_date` ustunlarida birgalikda `idx_orders_user_date` nomli kompozit indeks yarating.",
      "startingCode": "-- Kompozit indeks yaratuvchi SQL so'rovini yozing\n",
      "hint": "CREATE INDEX idx_orders_user_date ON orders(user_id, order_date);",
      "test": "try { db.exec('CREATE INDEX idx_orders_user_date ON orders(user_id, order_date)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Kompozit indeks yaratib bo\\'lmadi'; } return null;"
    },
    {
      "id": 4,
      "title": "Indeksni O'chirish",
      "instruction": "`users` jadvalida keraksiz bo'lib qolgan `idx_temp_users` nomli indeksni o'chirib tashlang.",
      "startingCode": "-- Indeksni o'chirish uchun SQL so'rovini yozing\n",
      "hint": "DROP INDEX idx_temp_users;",
      "test": "try { const check = db.prepare(\"SELECT 1 FROM sqlite_master WHERE type='index' AND name='idx_temp_users'\").get(); if (check) return 'Xato: idx_temp_users indeksi hali ham mavjud'; } catch(e) { return 'Xato: ' + e.message; } return null;"
    },
    {
      "id": 5,
      "title": "Qisman (Partial) Indeks Yaratish",
      "instruction": "`users` jadvalida faqat faol foydalanuvchilarning (`status = 'active'`) elektron pochtasi uchun `idx_active_users_email` nomli qisman indeks yarating.",
      "startingCode": "-- Qisman indeks yaratuvchi SQL so'rovini yozing\n",
      "hint": "CREATE INDEX idx_active_users_email ON users(email) WHERE status = 'active';",
      "test": "try { db.exec(\"CREATE INDEX idx_active_users_email ON users(email) WHERE status = 'active'\"); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Qisman indeks yaratib bo\\'lmadi'; } return null;"
    },
    {
      "id": 6,
      "title": "Funksional (Expression) Indeks",
      "instruction": "`users` jadvalida elektron pochtani katta-kichik harf farqisiz qidirganda tezkor ishlashi uchun `LOWER(email)` ustida `idx_users_lower_email` nomli indeks yarating.",
      "startingCode": "-- Funksional indeks yaratuvchi SQL so'rovini yozing\n",
      "hint": "CREATE INDEX idx_users_lower_email ON users(LOWER(email));",
      "test": "try { db.exec('CREATE INDEX idx_users_lower_email ON users(LOWER(email))'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Funksional indeks yaratib bo\\'lmadi'; } return null;"
    },
    {
      "id": 7,
      "title": "Qidiruv Rejasini Tahlil Qilish (EXPLAIN)",
      "instruction": "`users` jadvalidan yoshi (`age`) 30 dan katta bo'lgan foydalanuvchilarni qidirish so'rovining bajarilish rejasini (Query Plan) tekshirish uchun so'rov yozing.",
      "startingCode": "-- So'rov bajarilish rejasini tekshirish uchun SQL yozing\n",
      "hint": "EXPLAIN QUERY PLAN SELECT * FROM users WHERE age > 30;",
      "test": "if (!result || !Array.isArray(result)) return 'Xato: Natija topilmadi'; const plan = JSON.stringify(result).toLowerCase(); if (!plan.includes('explain') && !plan.includes('scan') && !plan.includes('search')) return 'Xato: EXPLAIN QUERY PLAN so\\'rovi ishlatilmagan'; return null;"
    },
    {
      "id": 8,
      "title": "Saralashni Optimallashtirish",
      "instruction": "`orders` jadvalida buyurtmalarni avval `status` bo'yicha (tenglik), keyin esa buyurtma summasi (`amount`) bo'yicha kamayish tartibida (`DESC`) tezkor saralash uchun `idx_orders_status_amount` nomli indeks yarating.",
      "startingCode": "-- Saralash uchun mos indeks yaratuvchi SQL yozing\n",
      "hint": "CREATE INDEX idx_orders_status_amount ON orders(status, amount DESC);",
      "test": "try { db.exec('CREATE INDEX idx_orders_status_amount ON orders(status, amount DESC)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Saralash uchun indeks yaratilmadi'; } return null;"
    },
    {
      "id": 9,
      "title": "Yopuvchi (Covering) Indeks",
      "instruction": "`users` jadvalida faqat `email` orqali foydalanuvchining ismini (`name`) qidirganda jadval sahifalariga murojaat qilmaslik uchun `idx_users_email_name` nomli yopuvchi indeks yarating.",
      "startingCode": "-- Yopuvchi indeks yaratuvchi SQL yozing\n",
      "hint": "CREATE INDEX idx_users_email_name ON users(email, name);",
      "test": "try { db.exec('CREATE INDEX idx_users_email_name ON users(email, name)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Yopuvchi indeks yaratilmadi'; } return null;"
    },
    {
      "id": 10,
      "title": "Unikal Kompozit Indeks",
      "instruction": "`reviews` jadvalida bitta foydalanuvchi (`user_id`) ma'lum bir mahsulotga (`product_id`) faqat bitta sharh yozishini ta'minlash uchun unikal kompozit `idx_unique_user_product` indeksini yarating.",
      "startingCode": "-- Unikal kompozit indeks yaratuvchi SQL yozing\n",
      "hint": "CREATE UNIQUE INDEX idx_unique_user_product ON reviews(user_id, product_id);",
      "test": "try { db.exec('CREATE UNIQUE INDEX idx_unique_user_product ON reviews(user_id, product_id)'); } catch(e) { if(e.message.indexOf('already exists') === -1) return 'Xato: Unikal kompozit indeks yaratilmadi'; } return null;"
    }
  ]
,
  quizzes: [
  {
    "id": 1,
    "question": "Indeks yaratishning asosiy maqsadi nima?",
    "options": [
      "Ma'lumotlar bazasida ko'proq joy ochish",
      "Ma'lumotlarni qidirish (SELECT) tezligini oshirish",
      "Yozish (INSERT) operatsiyalarini tezlashtirish",
      "Tranzaksiyalarni boshqarish"
    ],
    "correctAnswer": 1,
    "explanation": "Indekslar ma'lumotlar bazasidan ma'lumotlarni qidirishni tezlashtirish uchun foydalaniladi (kitob mundarijasi kabi)."
  },
  {
    "id": 2,
    "question": "Indekslarning qanday salbiy tomoni bor?",
    "options": [
      "Ular o'qish tezligini pasaytiradi",
      "Ular diskda qo'shimcha joy egallaydi va yozish (INSERT/UPDATE) tezligini pasaytiradi",
      "Ular faqat MySQL-da ishlaydi",
      "Ular jadvallarni o'chirib yuborishi mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Indekslar diskda joy egallaydi va har bir yozish yoki o'zgartirish amali bajarilganda indeks daraxti qayta tuzilishi kerakligi sababli yozish tezligini pasaytiradi."
  },
  {
    "id": 3,
    "question": "Eng ko'p ishlatiladigan va diapazonli qidiruvlarni qo'llab-quvvatlaydigan universal indeks turi qaysi?",
    "options": ["Hash Index", "B-Tree Index", "GIN Index", "BRIN Index"],
    "correctAnswer": 1,
    "explanation": "B-Tree (Balanced Tree) indeks turi eng universal va ko'p ishlatiladigan indeks bo'lib, diapazonli (>, <, BETWEEN) qidiruvlarni qo'llab-quvvatlaydi."
  },
  {
    "id": 4,
    "question": "Hash indeks qachon eng optimal hisoblanadi?",
    "options": [
      "Faqat aniq tenglikni (=) tekshirganda",
      "Diapazonli (>, <) qidiruvlarda",
      "Saralash (ORDER BY) amallarida",
      "Matn ichidan qidirganda"
    ],
    "correctAnswer": 0,
    "explanation": "Hash indeks aniq tenglikni (=) tekshirishda O(1) murakkablikda ishlaydi. Lekin saralash yoki diapazonlarni qo'llab-quvvatlamaydi."
  },
  {
    "id": 5,
    "question": "Jadvaldagi bir nechta ustunlarni birlashtirib yaratiladigan indeks nima deyiladi?",
    "options": ["Unique Index", "Composite Index", "Partial Index", "Functional Index"],
    "correctAnswer": 1,
    "explanation": "Bir nechta ustun ustida birgalikda yaratilgan indeks Kompozit indeks (Composite Index) deb ataladi."
  },
  {
    "id": 6,
    "question": "Kompozit indeksda (col1, col2) shartlar qanday tartibda tekshiriladi?",
    "options": [
      "Ixtiyoriy tartibda",
      "Faqat o'ngdan chapga",
      "Faqat chapdan o'ngga (Left-to-right prefix rule)",
      "Buning ahamiyati yo'q"
    ],
    "correctAnswer": 2,
    "explanation": "Kompozit indeks faqat chapdan o'ngga qarab ishlaydi. Agar birinchi ustun (col1) WHERE shartida bo'lmasa, indeks ishlamaydi."
  },
  {
    "id": 7,
    "question": "Partial Index (Qisman indeks) nima?",
    "options": [
      "Jadvalning yarmini o'chirib yuboradigan indeks",
      "Faqat ma'lum bir shartga (WHERE) mos keladigan qatorlarni indekslash",
      "Faqat matnli ustunlar uchun indeks",
      "Avtomatik yaratiladigan indeks"
    ],
    "correctAnswer": 1,
    "explanation": "Partial Index faqat shartga mos keladigan qatorlarni indekslash orqali diskdan joy tejaydi va tez ishlaydi."
  },
  {
    "id": 8,
    "question": "LOWER(email) sharti tez ishlashi uchun qaysi indeks turi kerak?",
    "options": ["Hash Index", "Expression Index (Funksional)", "Composite Index", "Covering Index"],
    "correctAnswer": 1,
    "explanation": "Expression Index (Funksional indeks) ustunga funksiya amali qo'llanilganda ham indeks ishlashini ta'minlaydi."
  },
  {
    "id": 9,
    "question": "Index-Only Scan nima?",
    "options": [
      "Baza jadvalga kirmasdan, faqat indeksdan ma'lumotni o'qib qaytara olishi",
      "Baza faqat indekslarni o'chirib yuborishi",
      "Indekslarning to'liq o'qilishi",
      "Jadvalning sekin ishlashi"
    ],
    "correctAnswer": 0,
    "explanation": "So'ralayotgan barcha ustunlar indeks tarkibida bo'lsa, baza jismoniy jadval sahifalariga kirmasdan javob beradi (Index-Only Scan)."
  },
  {
    "id": 10,
    "question": "Nima uchun gender (jins) yoki status kabi kardinalligi past ustunlarni indekslash tavsiya etilmaydi?",
    "options": [
      "Baza xatolik beradi",
      "Baza baribir Seq Scan qiladi, indeks esa keraksiz joy egallaydi",
      "Ular faqat son bo'lishi shart",
      "Ular faqat NoSQL bazalarda indekslanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Qiymatlari turi juda kam bo'lgan ustunlarda indekslash befoyda, chunki optimizer indeksdan ko'ra to'liq jadvalni o'qishni afzal biladi."
  },
  {
    "id": 11,
    "question": "Indekslangan ustunda UPPER(name) = 'ALI' deb so'rov yozsak nima sodir bo'ladi?",
    "options": [
      "Indeks tez ishlaydi",
      "UPPER funksiyasi sababli indeks o'chib, Seq Scan sodir bo'ladi",
      "Baza avtomatik funksional indeks yaratadi",
      "Sintaktik xatolik bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Indekslangan ustunda har qanday funksiya ishlatilganda B-Tree indeks o'z kuchini yo'qotadi va sequential scan sodir bo'ladi."
  },
  {
    "id": 12,
    "question": "Indeksni o'chirish uchun qaysi SQL buyrug'i ishlatiladi?",
    "options": ["DELETE INDEX idx_name", "DROP INDEX idx_name", "REMOVE INDEX idx_name", "CLEAR INDEX idx_name"],
    "correctAnswer": 1,
    "explanation": "SQL-da indeksni o'chirish uchun 'DROP INDEX idx_name' buyrug'i ishlatiladi."
  }
]

};
