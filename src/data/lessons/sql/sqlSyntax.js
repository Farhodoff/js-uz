export const sqlSyntax = {
  id: "sqlSyntax",
  title: "SQL Sintaksisi va Operatorlar",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### SQL Sintaksisi nima?
**SQL (Structured Query Language)** — bu ma'lumotlar bazasi bilan gaplashish uchun maxsus til. Undagi sintaksis (kod yozish qoidalari) ingliz tili grammatikasiga juda yaqin bo'lib, deklarativ xarakterga ega. Ya'ni, biz bazaga nimani bajarish kerakligini oddiy jumlalar orqali tushuntiramiz.

### SQL-da Ma'lumot turlari (Data Types):
Ma'lumotlar bazasi har bir ustundagi ma'lumot qanday ko'rinishda ekanini bilishi shart. Asosiy turlar:
1. **Matnli:** \`VARCHAR(N)\` (uzunligi cheklangan matn, masalan ism uchun), \`TEXT\` (uzun maqolalar uchun).
2. **Sonli:** \`INT\` (butun sonlar), \`DECIMAL(10,2)\` (kasr sonlar, masalan narx-navo uchun - jami 10 ta raqam, 2 tasi verguldan keyin).
3. **Mantiqiy:** \`BOOLEAN\` (True yoki False).
4. **Vaqt:** \`DATE\` (sana), \`TIMESTAMP\` (sana va vaqt birga).

### SQL Operatorlari:
Biz ma'lumotlarni solishtirish yoki birlashtirish uchun operatorlardan foydalanamiz:
* **Matematik:** \`+\`, \`-\`, \`*\`, \`/\`
* **Solishtirish:** \`=\`, \`!=\` yoki \`<>\` (teng emas), \`>\`, \`<\`, \`>=\`, \`<=\`
* **Mantiqiy:** \`AND\` (va), \`OR\` (yoki), \`NOT\` (emas), \`IN\` (ichida), \`BETWEEN\` (oraliqda), \`LIKE\` (o'xshash).

### Real hayotiy analogiya
SQL so'rovini **restorandagi mijozning ofitsiantga bergan buyurtmasiga** o'xshatish mumkin:
* **Sintaksis:** *"Menga 2 porsiya somsa va bitta ko'k choy olib keling."* Agar siz *"Somsa ko'k choy 2 menga"* desangiz, ofitsiant tushunmaydi (Syntax Error).
* **Ma'lumot turlari:** Ofitsiant buyurtmadagi miqdorni son ko'rinishida (\`INT\` = 2), taom nomini matn ko'rinishida (\`VARCHAR\` = 'Somsa') yozib oladi.
* **Operatorlar:** Mijoz: *"Narxi 20,000 dan arzon bo'lgan **VA** go'shtli taomlarni olib keling"* (Mantiqiy operatorlar).

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Solishtirish operatorlari)
Yoshi 30 dan katta bo'lgan foydalanuvchilarni tanlash:
\`\`\`sql
-- Yoshi 30 dan katta bo'lganlarni filtrlash
SELECT name, age 
FROM users 
WHERE age > 30;
\`\`\`
* **Natija:** Yoshi 30 dan katta foydalanuvchilar ro'yxati.
* **Qachon ishlatiladi:** UI-da ma'lum yosh cheklovlariga mos foydalanuvchilarni topishda.
* **Performance jihati:** \`age\` ustunida indeks bo'lsa, baza tezda natijani qaytaradi.

### 2. Intermediate Example (Mantiqiy operatorlar va IN)
Toshkent yoki Samarqandda yashaydigan foydalanuvchilarni tanlash:
\`\`\`sql
-- IN operatori yordamida shaharlarni filtrlash
SELECT name, city 
FROM users 
WHERE city IN ('Toshkent', 'Samarqand');
\`\`\`
* **Natija:** Shahri Toshkent yoki Samarqand bo'lgan foydalanuvchilar.
* **Qachon ishlatiladi:** Foydalanuvchi bir nechta shaharlarni filtrda belgilaganida.
* **Performance jihati:** \`IN\` ro'yxati juda katta bo'lsa (masalan 10,000 ta qiymat), so'rov sekinlashadi. Bunday holda vaqtinchalik jadvalga (temp table) yuklab JOIN qilish tavsiya etiladi.

### 3. Advanced Example (Matematik va NULL operatorlari)
Mahsulotlarning umumiy qiymatini hisoblash va chegirmalarni chegirib tashlash:
\`\`\`sql
-- Narxga mantiqiy chegirma qo'llash va NULL qiymatni hisoblash
SELECT name,
       price,
       stock,
       price * stock AS total_value, -- Matematik ko'paytirish
       COALESCE(discount, 0.00) AS applied_discount -- NULL bo'lsa 0 qaytaradi
FROM products
WHERE price * stock > 1000.00;
\`\`\`
* **Natija:** Qiymati 1000 dan katta bo'lgan mahsulotlar ro'yxeti va ularning jami summasi.
* **Qachon ishlatiladi:** Ombor qoldig'i qiymatini hisoblash va moliyaviy hisobotlarda.
* **Performance jihati:** \`price * stock > 1000\` sharti indeksdan foydalana olmaydi. Agar bu tez-tez ishlatilsa, generated column yoki expression index yaratish kerak.

### 4. Production Example (LIKE va Wildcards)
Ismi 'Ali' bilan boshlanadigan foydalanuvchilarni case-insensitive qidirish (PostgreSQL):
\`\`\`sql
-- Ism bo'yicha qidirish (case-insensitive ILIKE)
SELECT id, name, email 
FROM users 
WHERE name ILIKE 'Ali%';
\`\`\`
* **Natija:** Ali, Alisher, Alijon kabi foydalanuvchilar chiqadi (harf katta-kichikligidan qat'iy nazar).
* **Qachon ishlatiladi:** Foydalanuvchilar qidiruv panelida (search input) ism yozib qidirganda.
* **Performance jihati:** \`LIKE 'Ali%'\` (o'ng tomonda wildcard) B-Tree indeksidan foydalana oladi. Ammo \`%Ali%\` (ikki tomonda wildcard) indeksni ishlatmaydi va Full Table Scan qiladi.

### 5. Enterprise Example (Matn va Sana funksiyalarini birgalikda ishlatish)
Foydalanuvchi ro'yxatdan o'tganiga 1 yildan oshganini aniqlash (PostgreSQL):
\`\`\`sql
-- Sana operatorlari yordamida VIP foydalanuvchilarni aniqlash
SELECT id, 
       name, 
       created_at,
       AGE(NOW(), created_at) AS account_age
FROM users
WHERE created_at <= NOW() - INTERVAL '1 year';
\`\`\`
* **Natija:** Kamida 1 yil oldin ro'yxatdan o'tgan foydalanuvchilar ro'yxati.
* **Qachon ishlatiladi:** Sodiq mijozlarga yillik bonuslar taqdim etish tizimida.
* **Performance jihati:** \`created_at\` ustunida B-Tree indeks mavjud bo'lishi shart, chunki bu yerda aniq diapazonli qidiruv ketmoqda.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Ma'lumotlar turlari (Data Types) ma'lumotlar bazasida **joy tejash** va **xatoliklardan saqlash** muammolarini hal qiladi. Masalan, agar narx ustunini \`VARCHAR\` qilib ochsak, unga adashib 'yuz ming' deb yozib yuborishimiz mumkin va keyinchalik uni qo'shib bo'lmaydi. \`DECIMAL\` esa bunga yo'l qo'ymaydi.
Operatorlar esa murakkab biznes shartlarni (masalan: *"Faqat yoshi 18 dan katta bo'lgan, Toshkentda yashaydigan va balansi 50,000 dan ko'p bo'lgan foydalanuvchilarni tanlash"*) minimal kod bilan amalga oshirish imkonini beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Narxlarni saqlashda FLOAT yoki DOUBLE ishlash
#### Xato:
\`\`\`sql
CREATE TABLE products (
    price FLOAT -- Xavfli ma'lumot turi
);
\`\`\`
#### Nima uchun noto'g'ri:
\`FLOAT\` taqribiy hisob-kitoblar uchun mo'ljallangan. Moliyaviy amallarda tiyinlar yo'qolib qolishiga yoki noto'g'ri hisoblanishiga sabab bo'ladi (floating point precision error).
#### To'g'ri usul:
\`\`\`sql
CREATE TABLE products (
    price DECIMAL(12, 2) -- To'g'ri va aniq
);
\`\`\`
#### Izoh:
Moliyaviy va aniq qiymat talab qiladigan ustunlar uchun faqat \`DECIMAL\` yoki \`NUMERIC\` ishlating.

### 2. LIKE operatorida wildcards (%) ni noto'g'ri ishlatish
#### Xato:
\`\`\`sql
SELECT * FROM users WHERE name LIKE 'Ali';
\`\`\`
#### Nima uchun noto'g'ri:
Ushbu so'rov faqat ismi aniq 'Ali' bo'lganlarni qidiradi. 'Alisher'-ni topa olmaydi.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users WHERE name LIKE 'Ali%';
\`\`\`
#### Izoh:
\`%\` belgisi qolgan harflar o'rniga o'tadi.

### 3. Matnlarni solishtirishda harflar registri (Case sensitivity)
#### Xato:
\`\`\`sql
SELECT * FROM users WHERE email = 'Ali@Mail.com';
\`\`\`
#### Nima uchun noto'g'ri:
PostgreSQL kabi ko'plab bazalarda matnlar case-sensitive bo'lib, 'Ali@Mail.com' va 'ali@mail.com' boshqa-boshqa hisoblanadi.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users WHERE LOWER(email) = LOWER('Ali@Mail.com');
\`\`\`
#### Izoh:
Ma'lumot kiritishda elektron pochtani har doim kichik harfda saqlash tavsiya etiladi.

### 4. Solishtirish operatorlarida ma'lumot turlarini aralashtirish
#### Xato:
\`\`\`sql
SELECT * FROM users WHERE age = 'yigirma';
\`\`\`
#### Nima uchun noto'g'ri:
\`age\` sonli ustuniga matnli qiymat berilganda baza xatolik qaytaradi.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users WHERE age = 20;
\`\`\`
#### Izoh:
Solishtirilayotgan qiymat va ustun ma'lumot turi mos kelishi shart.

### 5. \`BETWEEN\` operatorining inclusive chegaralarini unutish
#### Xato:
Yoshi 20 dan 30 gacha bo'lganlarni olishda 20 va 30 yoshdagilar kirmaydi deb o'ylash.
#### To'g'ri usul:
\`BETWEEN 20 AND 30\` 20 va 30 yoshdagilarni ham natijaga qo'shadi. Agar ular kerak bo'lmasa, \`age > 20 AND age < 30\` yozish kerak.
#### Izoh:
BETWEEN har doim chegaraviy qiymatlarni ham o'z ichiga oladi.

### 6. NULL bilan taqqoslashda \`NOT IN\` ishlatish
#### Xato:
\`id NOT IN (1, 2, NULL)\` deb yozish.
#### Nima uchun noto'g'ri:
Ro'yxatda bitta NULL bo'lsa, butun so'rov natijasi bo'sh qaytadi.
#### To'g'ri usul:
Ro'yxatdan NULL qiymatlarni filtrlab tashlash yoki \`NOT EXISTS\` ishlatish.
#### Izoh:
NULL bilan bog'liq ishlarda har doim ehtiyot bo'ling.

### 7. Sanalarni matn ko'rinishida saqlash
#### Xato:
\`\`\`sql
CREATE TABLE orders (
    order_date VARCHAR(50) -- Xato ma'lumot turi
);
\`\`\`
#### Nima uchun noto'g'ri:
Sanalarni matn ko'rinishida saqlasa, keyinchalik ma'lum sanalar oralig'ini qidirish yoki oylar bo'yicha guruhlash imkonsiz bo'lib qoladi.
#### To'g'ri usul:
\`\`\`sql
CREATE TABLE orders (
    order_date TIMESTAMP DEFAULT NOW()
);
\`\`\`
#### Izoh:
Sana va vaqtlar uchun faqat \`DATE\`, \`TIME\` yoki \`TIMESTAMP\` ishlating.

### 8. \`AND\` va \`OR\` operatorlarini qavssiz aralashtirish
#### Xato:
\`\`\`sql
SELECT * FROM users WHERE status = 'active' OR role = 'Admin' AND age > 30;
\`\`\`
#### Nima uchun noto'g'ri:
\`AND\` operatori \`OR\` ga qaraganda yuqori ustuvorlikka ega bo'lgani uchun so'rov kutilgandek ishlamaydi.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users WHERE (status = 'active' OR role = 'Admin') AND age > 30;
\`\`\`
#### Izoh:
Ustuvorlikni aniq belgilash uchun qavslardan foydalaning.

### 9. BOOLEAN ustunlarni tenglik operatori bilan tekshirish
#### Xato:
\`\`\`sql
SELECT * FROM users WHERE is_active = TRUE;
\`\`\`
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users WHERE is_active;
\`\`\`
#### Izoh:
Boolean ustunlarni shunchaki yozish yetarli, \`= TRUE\` yozish ortiqcha hisoblanadi.

### 10. NOT LIKE operatorida case farqlari
#### Xato:
\`name NOT LIKE 'a%'\` deb yozib, katta 'A' harfi bilan boshlanuvchilarni hisobga olmaslik.
#### To'g'ri usul:
PostgreSQL-da \`name NOT ILIKE 'a%'\` yozish.
#### Izoh:
Katta-kichik harflarni farqlash-farqlamasligiga e'tibor bering.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** SQL-da \`CHAR\` va \`VARCHAR\` o'rtasidagi farq nima?
   * **Javob:** \`CHAR\` belgilangan uzunlikda ishlaydi, qolgan joylarni bo'shliq bilan to'ldiradi. \`VARCHAR\` esa kiritilgan matn uzunligiga mos ravishda dinamik joy egallaydi.
   * **Intervyuda qanday javob berish kerak:** *"CHAR doimiy uzunlikdagi (masalan, davlat kodlari 'UZ', 'US'), VARCHAR esa o'zgaruvchan uzunlikdagi matnlar (ism, elektron pochta) uchun ishlatiladi."*
   * **Qo'shimcha izoh:** CHAR xotirani ko'proq egallashi mumkin, agar matn qisqa bo'lsa.

2. **Savol:** \`DECIMAL(10,2)\` nimani anglatadi?
   * **Javob:** Bu ustunda jami 10 ta raqam saqlanishi mumkin, ulardan roppa-rosa 2 tasi verguldan keyin (kasr qismi) bo'ladi.
   * **Intervyuda qanday javob berish kerak:** *"Bu moliya va narxlarni saqlashda ishlatiladigan eng ishonchli sonli ma'lumot turidir. U floating-point xatolarining oldini oladi."*
   * **Qo'shimcha izoh:** Eng katta son 99999999.99 bo'lishi mumkin.

3. **Savol:** \`AND\` va \`OR\` operatorlari farqi nimada?
   * **Javob:** \`AND\` so'rovdagi barcha shartlar bajarilishini talab qiladi. \`OR\` esa kamida bitta shart to'g'ri bo'lsa yetarli.
   * **Intervyuda qanday javob berish kerak:** *"AND mantiqiy ko'paytirish, OR esa mantiqiy qo'shish kabi ishlaydi. Birgalikda kelganda AND ustuvorroqdir."*
   * **Qo'shimcha izoh:** Murakkab shartlarda qavslar qo'yilishi shart.

4. **Savol:** \`LIKE\` operatorida \`%\` va \`_\` belgilari farqi nima?
   * **Javob:** \`%\` ixtiyoriy miqdordagi (hatto 0 ta) belgilar o'rniga o'tadi. \`_\` esa roppa-rosa bitta ixtiyoriy belgi o'rnini egallaydi.
   * **Intervyuda qanday javob berish kerak:** *"Ismi 'A' bilan boshlanib har qanday uzunlikda bo'lganlarni qidirishda 'A%' yozsak, ikkinchi harfi 'a' bo'lgan 3 ta harfli so'zni qidirishda '_a_' yozamiz."*
   * **Qo'shimcha izoh:** LIKE case-sensitive hisoblanadi.

### Middle (5–8)
5. **Savol:** \`COALESCE()\` funksiyasi nima va u qachon ishlatiladi?
   * **Javob:** U berilgan qiymatlar ro'yxatidan birinchi bo'lib \`NULL\` bo'lmagan qiymatni qaytaradi.
   * **Intervyuda qanday javob berish kerak:** *"Ustundagi NULL qiymatlarni sukut bo'yicha boshqa qiymatga (masalan, 0 yoki bo'sh matnga) almashtirishda COALESCE(discount, 0) ko'rinishida ishlatamiz."*
   * **Qo'shimcha izoh:** Bu hisobotlarda xatoliklarni oldini oladi.

6. **Savol:** SQL-da mantiqiy operatorlarning bajarilish ustuvorligi (Operator Precedence) qanday?
   * **Javob:** Eng birinchi mantiqiy operator \`NOT\` bajariladi, keyin \`AND\`, va eng oxirida \`OR\` bajariladi.
   * **Intervyuda qanday javob berish kerak:** *"Precedence qoidalariga ko'ra AND operatori OR dan oldin bajariladi, shuning uchun shartlarni aralashtirganda qavslardan foydalanish lozim."*
   * **Qo'shimcha izoh:** Qavslar mantiqiy ustuvorlikni o'zgartiradi.

7. **Savol:** PostgreSQL-da \`TIMESTAMP WITH TIME ZONE\` va \`TIMESTAMP WITHOUT TIME ZONE\` farqi nima?
   * **Javob:** Birinchisi vaqtni UTC formatiga o'tkazib, serverning vaqt zonasini hisobga olgan holda saqlaydi. Ikkinchisi esa vaqt zonasini hisobga olmaydi.
   * **Intervyuda qanday javob berish kerak:** *"Global loyihalarda foydalanuvchi qayerdan kirganini aniq bilish va vaqtni to'g'ri ko'rsatish uchun doimo TIMESTAMPTZ (with time zone) ishlatish lozim."*
   * **Qo'shimcha izoh:** Bu vaqt zonasi chalkashliklarini oldini oladi.

8. **Savol:** \`IN\` va \`BETWEEN\` operatorlarini qanday hollarda ishlatamiz?
   * **Javob:** \`IN\` ro'yxat ichidan qidirganda, \`BETWEEN\` esa ma'lum bir oraliqni (inclusive) qidirganda ishlatiladi.
   * **Intervyuda qanday javob berish kerak:** *"Ma'lum shaharlar ro'yxati berilsa IN, narx yoki sana diapazoni berilsa BETWEEN ishlatiladi."*
   * **Qo'shimcha izoh:** Ikkala operator ham indekslarni ishlata oladi.

### Senior (9–12)
9. **Savol:** Expression Index (Funksional indeks) nima va u qachon kerak?
   * **Javob:** Agar biz tez-tez \`WHERE LOWER(email) = ...\` ko'rinishidagi funksional so'rovlarni ishlatsak, emailning o'ziga emas, balki \`LOWER(email)\` qiymati ustiga indeks yaratish Expression Index deyiladi.
   * **Intervyuda qanday javob berish kerak:** *"Oddiy indekslar funksiyalar bilan ishlaganda o'chib qolishi sababli, biz PostgreSQL-da CREATE INDEX idx_lower_email ON users(LOWER(email)) ko'rinishida funksional indeks yaratamiz."*
   * **Qo'shimcha izoh:** Bu indeks qo'shimcha yozish va xotira yuklamasini olib keladi.

10. **Savol:** PostgreSQL va MySQL-da \`VARCHAR(255)\` va \`TEXT\` o'rtasidagi jismoniy saqlash (physical storage) farqi nimada?
    * **Javob:** Kichik matnlar qator bilan birga saqlanadi (Inline). Agar matn juda katta bo'lsa (masalan TEXT), baza uni alohida joyda (PostgreSQL-da TOAST deb ataladi) saqlab, jadval ichida faqat unga ishora (pointer) qoldiradi.
    * **Intervyuda qanday javob berish kerak:** *"Katta matnlar jadval qatorlari hajmini oshirib yubormasligi uchun reliesion bazalar TOAST kabi mexanizmlar orqali matnni chetda saqlaydi. Bu o'qish yuklamasini kamaytiradi."*
    * **Qo'shimcha izoh:** VARCHAR va TEXT o'rtasida o'qish tezligida katta farq yo'q, agar ma'lumot hajmi bir xil bo'lsa.

11. **Savol:** Nima uchun \`SELECT * FROM users WHERE status = 'active' OR age > 30\` so'rovi ba'zan indekslardan foydalanmaydi va buni qanday optimallashtirish mumkin?
    * **Javob:** Baza optimizatori \`OR\` operatorini ko'rganda ikkala shart bo'yicha alohida indeks qidirib, keyin ularni birlashtirishdan ko'ra to'liq jadvalni o'qib chiqishni (\`Seq Scan\`) afzal ko'rishi mumkin.
    * **Intervyuda qanday javob berish kerak:** *"OR operatorini UNION yordamida ikkita alohida SELECT so'roviga bo'lish orqali har bir shartni alohida indeks scan qilishga majburlash mumkin."*
    * **Qo'shimcha izoh:** UNION avtomatik tarzda dublikatlarni olib tashlaydi.

12. **Savol:** \`BOOLEAN\` ustunlarida indeks yaratish to'g'rimi va nima uchun?
    * **Javob:** Ko'p hollarda boolean ustunlarda (masalan \`is_deleted\`) oddiy indeks yaratish foydasiz, chunki uning kardinalligi (unikal qiymatlari soni) juda past (faqat true va false). Baza indeksdan foydalanmaydi.
    * **Intervyuda qanday javob berish kerak:** *"Boolean ustun uchun oddiy indeks yaratish tavsiya etilmaydi. Buning o'rniga qisman indeks (Partial Index) yaratish kerak, masalan: CREATE INDEX idx_active_users ON users(id) WHERE is_active = TRUE."*
    * **Qo'shimcha izoh:** Partial Index faqat shartga mos kelgan oz sonli qatorlarni indekslaydi va juda kichik joy egallaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar darsning pastdagi interaktiv kod muhitida bajarilishi uchun tayyorlangan.

---

## 7. 📝 12 ta Mini Test

Dars oxirida mini testlar orqali bilimingizni sinab ko'rishingiz mumkin.

---

## 8. 🎯 Real Project Case Study

### Elektron tijorat (E-commerce) uchun mahsulot filtr tizimini loyihalash
Tasavvur qiling, biz yirik kiyim-kechak onlayn do'konining qidiruv tizimini loyihalashtiryapmiz. Foydalanuvchilar mahsulotlarni rangi, o'lchami va narxi bo'yicha filtrlaydi.

#### Muammo:
Foydalanuvchi ranglar ro'yxatidan 'Qizil' va 'Qora' ranglarni belgilaydi, o'lchamini esa 'M' yoki 'L' qiladi. Narxi 100,000 va 500,000 so'm oralig'ida bo'lishi kerak. Biz ushbu mantiqni to'g'ri SQL operatorlari orqali tezkor ishlaydigan qilib yozishimiz shart.

#### Yechim:
\`\`\`sql
SELECT id, title, price 
FROM products 
WHERE color IN ('Qizil', 'Qora')
  AND size IN ('M', 'L')
  AND price BETWEEN 100000.00 AND 500000.00
  AND status = 'in_stock';
\`\`\`
Ushbu so'rovda \`IN\` va \`BETWEEN\` operatorlaridan to'g'ri foydalanildi. Agar rang, o'lcham va narx ustunlarida kompozit indekslar bo'lsa, millionlab tovarlar orasidan soniyaning yuzdan bir ulushida natija filtrlab beriladi.

---

## 9. 🚀 Performance va Optimization

Solishtirish va mantiqiy operatorlarning indekslarga ta'siri:
* **Sargable Operatorlar:** \`=\`, \`>\`, \`<\`, \`>=\`, \`<=\`, \`IN\`, \`BETWEEN\`, \`LIKE 'prefix%'\`. Bular indekslardan to'liq foydalana oladi.
* **Non-sargable Operatorlar:** \`!=\`, \`NOT IN\`, \`NOT LIKE\`, \`LIKE '%suffix%'\`. Bular ko'p hollarda to'liq jadvalni o'qib chiqishga (Full Table Scan) majbur qiladi.

---

## 10. 📌 Cheat Sheet

| Operator / Ma'lumot turi | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **DECIMAL(P, S)** | \`price DECIMAL(10,2)\` | Aniq kasr sonlar | Moliyaviy tizimlar uchun majburiy |
| **IN** | \`WHERE city IN ('A', 'B')\` | Ro'yxatdan qidirish | OR operatorlarining qisqartmasi |
| **BETWEEN** | \`WHERE price BETWEEN 10 AND 50\` | Diapazonda qidirish | Chegaralarni ham o'z ichiga oladi |
| **LIKE** | \`WHERE name LIKE 'A%'\` | Shablon bo'yicha qidirish | Case-sensitive ishlaydi |
| **COALESCE** | \`COALESCE(val, 0)\` | NULL bo'lsa o'rnini almashtirish | Birinchi NULL bo'lmagan qiymatni qaytaradi |
| **ILIKE** | \`WHERE name ILIKE 'a%'\` | Case-insensitive LIKE | PostgreSQL da mavjud |
`,
  exercises: [
  {
    "id": 1,
    "title": "Tenglik va Sonlar",
    "instruction": "`users` jadvalidan yoshi (`age`) roppa-rosa 25 bo'lgan foydalanuvchilarning ismi (`name`) va yoshi (`age`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT name, age FROM users WHERE age = 25",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Yoshi 25 bo\\'lgan 1 ta foydalanuvchi bor (Ali)'; if(result[0].name !== 'Ali' || result[0].age !== 25) return 'Natijada faqat 25 yoshli Ali chiqishi kerak'; return null;"
  },
  {
    "id": 2,
    "title": "Taqqoslash va DECIMAL",
    "instruction": "`products` jadvalidan narxi (`price`) 100.00 dan yuqori bo'lgan mahsulotlarning nomi (`name`) va narxi (`price`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT name, price FROM products WHERE price > 100",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Narxi 100 dan yuqori 4 ta mahsulot bor'; if(result.some(p => p.price <= 100)) return 'Faqat narxi 100 dan yuqori bo\\'lgan mahsulotlar chiqishi kerak'; return null;"
  },
  {
    "id": 3,
    "title": "Mantiqiy operator (AND)",
    "instruction": "`products` jadvalidan toifasi (`category`) 'Electronics' bo'lgan va narxi (`price`) 1000.00 dan arzon bo'lgan barcha mahsulotlarni tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT * FROM products WHERE category = 'Electronics' AND price < 1000",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Shartga mos keladigan 1 ta mahsulot bor (Phone)'; if(result[0].name !== 'Phone') return 'Faqat Phone chiqishi kerak'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "SQL-da matnli qiymatlar qaysi belgi ichiga yoziladi?",
    "options": ["Qo'shtirnoq (\")", "Bir tirnoq (')", "Burchakli qavs (<)", "O'ram yulduzcha (*) "],
    "correctAnswer": 1,
    "explanation": "SQL standartida matnli qiymatlar (string literals) har doim bir tirnoq (') ichida yozilishi kerak."
  },
  {
    "id": 2,
    "question": "Moliyaviy hisob-kitoblar va narxlarni saqlashda qaysi sonli tur eng xavfsiz va aniq hisoblanadi?",
    "options": ["FLOAT", "REAL", "DECIMAL (yoki NUMERIC)", "DOUBLE PRECISION"],
    "correctAnswer": 2,
    "explanation": "DECIMAL yoki NUMERIC ma'lumot turlari kasr sonlarni aniq saqlaydi va floating-point xatolaridan saqlaydi."
  },
  {
    "id": 3,
    "question": "Quyidagi operatorlardan qaysi biri 'teng emas' (not equal) mantiqiy ma'noni ifodalaydi?",
    "options": ["==", "<>", "===", "&&"],
    "correctAnswer": 1,
    "explanation": "SQL-da teng emaslik operatori sifatida '<>' yoki '!=' operatorlari ishlatiladi. Ko'p dialektlarda ikkalasi ham to'g'ri."
  },
  {
    "id": 4,
    "question": "Mantiqiy operatorlarning bajarilish ustuvorligida (precedence) qaysi operator eng birinchi bajariladi?",
    "options": ["AND", "OR", "NOT", "Ikkalasi ham bir vaqtda"],
    "correctAnswer": 2,
    "explanation": "Mantiqiy operatorlar orasida eng yuqori ustuvorlik NOT operatoriga tegishli. Undan keyin AND, keyin esa OR bajariladi."
  },
  {
    "id": 5,
    "question": "LIKE operatorida 'a%' shabloni nimani anglatadi?",
    "options": [
      "Faqat 'a' harfidan iborat satrlarni",
      "'a' harfi bilan boshlanadigan istalgan uzunlikdagi satrlarni",
      "'a' harfi bilan tugaydigan satrlarni",
      "Ikkinchi harfi 'a' bo'lgan satrlarni"
    ],
    "correctAnswer": 1,
    "explanation": "'a%' yozuvi boshlanishi 'a' harfi bo'lib, uning ketidan ixtiyoriy miqdordagi harflar kelishi mumkinligini anglatadi."
  },
  {
    "id": 6,
    "question": "Sana va aniq vaqtni (soat va millisekundgacha) saqlash uchun qaysi tur eng mos keladi?",
    "options": ["DATE", "TIME", "TIMESTAMP", "YEAR"],
    "correctAnswer": 2,
    "explanation": "TIMESTAMP ma'lumot turi ham sanani, ham aniq vaqtni o'z ichiga oladi."
  },
  {
    "id": 7,
    "question": "Qiymat ma'lum bir ro'yxat ichida borligini tekshirish uchun qaysi operator ishlatiladi?",
    "options": ["BETWEEN", "LIKE", "IN", "EXISTS"],
    "correctAnswer": 2,
    "explanation": "IN operatori qiymat berilgan ro'yxat yoki massiv elementlari orasida borligini tekshirish uchun ishlatiladi."
  },
  {
    "id": 8,
    "question": "Quyidagilardan qaysi biri 'inclusive' (chegaralarni ham o'z ichiga oladigan) oraliqni qidiradi?",
    "options": ["LIKE", "BETWEEN", "IN", "NOT IN"],
    "correctAnswer": 1,
    "explanation": "BETWEEN operatori chegaralarni ham hisobga olib, berilgan diapazondagi ma'lumotlarni filtrlaydi (inclusive)."
  },
  {
    "id": 9,
    "question": "NULL qiymatga ega bo'lmagan qatorlarni qidirishda qaysi sintaksis to'g'ri?",
    "options": ["col != NULL", "col IS NOT NULL", "col <> NULL", "col IS FILLED"],
    "correctAnswer": 1,
    "explanation": "SQL-da NULL qiymat hech qachon tenglik bilan tekshirilmaydi, buning o'rniga har doim 'IS NOT NULL' yoziladi."
  },
  {
    "id": 10,
    "question": "LIKE operatorida faqat bitta belgini almashtirish uchun qaysi belgi ishlatiladi?",
    "options": ["%", "_", "*", "?"],
    "correctAnswer": 1,
    "explanation": "Tag chiziq (_) roppa-rosa bitta ixtiyoriy belgi o'rnini bildiradi."
  },
  {
    "id": 11,
    "question": "PostgreSQL-da case-insensitive (katta-kichik harf farq qilmaydigan) LIKE qidiruv uchun qaysi operator ishlatiladi?",
    "options": ["LIKE", "ILIKE", "SLIKE", "MATCH"],
    "correctAnswer": 1,
    "explanation": "PostgreSQL-da ILIKE operatori case-insensitive qidiruvni amalga oshiradi."
  },
  {
    "id": 12,
    "question": "Solishtirish operatorlarida BOOLEAN maydonni qanday tekshirish to'g'riroq?",
    "options": [
      "WHERE is_active = TRUE",
      "WHERE is_active = 1",
      "WHERE is_active",
      "WHERE is_active = 'true'"
    ],
    "correctAnswer": 2,
    "explanation": "Boolean ustunning o'zini to'g'ridan-to'g'ri 'WHERE is_active' deb yozish eng toza va to'g'ri sintaksis hisoblanadi."
  }
]

};
