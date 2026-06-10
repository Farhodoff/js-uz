## 1. 💡 Sodda Tushuntirish va Analogiya

### Ma'lumotlarni Filtrlash (Filtering) nima?
Ma'lumotlar bazasida ko'pincha millionlab qatorlar saqlanadi. Bizga har doim ham barcha qatorlar kerak bo'lavermaydi. Masalan, faqat faol foydalanuvchilarni topish, ma'lum bir narx oralig'idagi mahsulotlarni ko'rish yoki ma'lum bir harfdan boshlanuvchi ismlarni qidirish kerak bo'ladi. SQL-da shunday aniq shartlar bo'yicha ma'lumotlarni tanlab olish uchun **WHERE** bloki va turli mantiqiy operatorlar ishlatiladi.

### Real hayotiy analogiya
Buni **do'kondagi kiyim qidirish filtrlariga** o'xshatish mumkin:
Siz onlayn do'konga kirib, kiyim qidiryapsiz:
* **Oddiy qidiruv:** Barcha kiyimlar ro'yxati (hech qanday filtrsiz).
* **AND filtri:** Rangi *qora* **VA** o'lchami *XL* bo'lgan kiyimlar. (Ikkala shartga ham mos kelishi shart).
* **OR filtri:** Rangi *qizil* **YOKI** *ko'k* bo'lgan kiyimlar. (Kamida bittasiga mos kelishi yetarli).
* **BETWEEN filtri:** Narxi *100,000* va *300,000* so'm oralig'idagi kiyimlar.
* **IN filtri:** Ishlab chiqarilgan davlati *O'zbekiston, Turkiya yoki Italiya* bo'lgan kiyimlar.
* **LIKE filtri:** Nomi *'Komp%'* deb boshlanadigan kiyimlar (masalan, Kompakt, Komplekt).

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Oddiy Tenglik va AND operatori)
Faqat Toshkent shahrida yashaydigan va yoshi 25 dan katta bo'lgan foydalanuvchilarni tanlash:
```sql
SELECT id, name, city, age 
FROM users 
WHERE city = 'Toshkent' AND age > 25;
```
* **Natija:** Toshkentlik va 25 yoshdan katta foydalanuvchilar ro'yxati chiqadi.
* **Qachon ishlatiladi:** Bir nechta shartlar bir vaqtda bajarilishi talab qilinganda.
* **Performance jihati:** `city` ustunida B-Tree indeks bo'lsa, baza tezda kerakli qatorlarni filtrlab oladi.

### 2. Intermediate Example (BETWEEN va IN operatorlari)
Narxi 100 dan 500 gacha bo'lgan va toifasi 'Electronics' yoki 'Furniture' bo'lgan mahsulotlarni tanlash:
```sql
SELECT id, name, price, category 
FROM products 
WHERE price BETWEEN 100 AND 500 
  AND category IN ('Electronics', 'Furniture');
```
* **Natija:** Ko'rsatilgan narx va toifalarga mos keluvchi mahsulotlar chiqadi.
* **Qachon ishlatiladi:** Qiymatlarni ma'lum bir oraliq (range) va to'plam (set) ichidan qidirganda.
* **Performance jihati:** `IN` operatori ko'p sonli qiymatlarni o'z ichiga olganda, ularni indeks yordamida tezkor tekshiradi.

### 3. Advanced Example (LIKE shablonli qidiruv va NULL tekshiruvi)
Ismi 'A' bilan boshlanadigan va email manzili kiritilmagan (bo'sh qolgan) foydalanuvchilarni topish:
```sql
SELECT id, name, email 
FROM users 
WHERE name LIKE 'A%' AND email IS NULL;
```
* **Natija:** Ismi 'A' bilan boshlanadigan, ammo email ustuni bo'sh (NULL) bo'lgan foydalanuvchilar chiqadi.
* **Qachon ishlatiladi:** Matnlar ichidan qisman qidirishda va bo'sh qiymatlarni aniqlashda.
* **Performance jihati:** `LIKE 'A%'` (oldidan wildcard bo'lmagan holda) indeksdan foydalana oladi. Ammo `%A%` ko'rinishidagi qidiruv indeksdan foydalana olmaydi va to'liq jadvalni o'qib chiqishga majbur bo'ladi (`Seq Scan`).

### 4. Production Example (Sanalarni filtrlash va dynamic interval)
Oxirgi 30 kun ichida berilgan va holati 'Completed' bo'lmagan buyurtmalarni filtrlash:
```sql
SELECT id, user_id, amount, order_date 
FROM orders 
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days' 
  AND status <> 'Completed';
```
* **Natija:** Oxirgi bir oy ichidagi faol (yakunlanmagan) buyurtmalar ro'yxati.
* **Qachon ishlatiladi:** Hisobotlar va real vaqtdagi faol tranzaksiyalarni kuzatishda.
* **Performance jihati:** `order_date` ustunida indeks bo'lishi juda muhim, aks holda millionlab eski buyurtmalar har safar qayta skaner qilinadi.

### 5. Enterprise Example (Composite Index va query shartlari)
Katta hajmli jadvallarda bir vaqtning o'zida shahar va status bo'yicha tezkor filtrlash:
```sql
-- composite index mavjud: CREATE INDEX idx_users_city_status ON users(city, status);
SELECT id, name, email 
FROM users 
WHERE city = 'Samarqand' AND status = 'Active';
```
* **Natija:** Samarqandlik faol foydalanuvchilar.
* **Qachon ishlatiladi:** Yuqori yuklamali SaaS tizimlarida.
* **Performance jihati:** Kompozit indeks (ikki yoki undan ko'p ustunga birgalikda o'rnatilgan indeks) faqat WHERE shartida ustunlar indeks yaratilgan tartibda kelganda to'liq ishlaydi.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Nega filtrlash o'ta muhim?
Agar SQL-da filtrlash operatorlari bo'lmaganida, backend dasturlar barcha ma'lumotlarni xotiraga yuklab olib, kod darajasida (masalan, JavaScript-da `filter` metodi orqali) filtrlashga majbur bo'lardi. Bu quyidagi global muammolarni keltirib chiqaradi:
1. **Network Congestion (Tarmoq bandligi):** Millionlab qatorlarni ma'lumotlar bazasidan backend serverga uzatish tarmoqni butunlay qotirib qo'yadi.
2. **Memory Overflow (RAM to'lib ketishi):** Gigabitlab ma'lumotlarni backend operativ xotirasida saqlash serverning qulashiga (Out of Memory) olib keladi.
3. **Database Performance:** Ma'lumotlar bazasi indekslar yordamida filtrlashni disk darajasida juda tez bajarish uchun optimallashtirilgan.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. NULL qiymatlarni tenglik operatori (`=`) bilan tekshirish
#### Xato:
```sql
SELECT * FROM users WHERE email = NULL;
```
#### Nima uchun noto'g'ri:
SQL-da `NULL` hech qanday qiymatga teng emas (xatto o'ziga ham). Shuning uchun tenglik operatori bilan tekshirilganda har doim bo'sh natija qaytadi.
#### To'g'ri usul:
```sql
SELECT * FROM users WHERE email IS NULL;
```
#### Izoh:
Bo'sh qiymatlarni aniqlash uchun har doim `IS NULL` yoki `IS NOT NULL` operatorlaridan foydalaning.

### 2. LIKE operatorida Wildcard (`%`) belgisini unutish
#### Xato:
```sql
SELECT * FROM users WHERE name LIKE 'Ali';
```
#### Nima uchun noto'g'ri:
Bu so'rov xuddi `name = 'Ali'` sharti kabi ishlaydi va 'Alisher' yoki 'Alijon' kabi ismlarni topmaydi.
#### To'g'ri usul:
```sql
SELECT * FROM users WHERE name LIKE 'Ali%';
```
#### Izoh:
`%` belgisi ixtiyoriy uzunlikdagi (hatto 0 ta) belgilar o'rniga o'tadi.

### 3. AND va OR operatorlarining ustuvorligini qavssiz yozish
#### Xato:
```sql
SELECT * FROM users 
WHERE city = 'Toshkent' OR city = 'Buxoro' AND role = 'Admin';
```
#### Nima uchun noto'g'ri:
SQL-da `AND` operatori `OR` operatoriga qaraganda yuqori ustuvorlikka ega. Yuqoridagi so'rov: "Toshkentdagi barcha foydalanuvchilar YOKI Buxorodagi faqat Adminlar" deb talqin qilinadi.
#### To'g'ri usul:
```sql
SELECT * FROM users 
WHERE (city = 'Toshkent' OR city = 'Buxoro') AND role = 'Admin';
```
#### Izoh:
Mantiqiy ustuvorlikni to'g'ri belgilash uchun `OR` shartlarini doimo qavs ichiga oling.

### 4. NOT IN operatori ichida NULL qiymat bo'lishi
#### Xato:
```sql
SELECT * FROM users 
WHERE city NOT IN ('Toshkent', NULL);
```
#### Nima uchun noto'g'ri:
Agar `NOT IN` ro'yxatida birorta ham `NULL` qiymat bo'lsa, SQL butun so'rov uchun bo'sh natija qaytaradi. Chunki u har bir element bilan solishtiradi va `NOT IN NULL` har doim `UNKNOWN` (noma'lum) qiymat beradi.
#### To'g'ri usul:
```sql
SELECT * FROM users 
WHERE city NOT IN ('Toshkent') OR city IS NULL;
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** SQL-da `WHERE` bloki nima uchun ishlatiladi?
   * **Javob:** Jadvaldan faqat berilgan shartga mos keladigan qatorlarni tanlab olish uchun ishlatiladi.
2. **Savol:** `BETWEEN` operatori chegaradagi qiymatlarni ham o'z ichiga oladimi?
   * **Javob:** Ha, `BETWEEN` inclusive (chegaraviy qiymatlarni ham hisobga oluvchi) operator hisoblanadi.
3. **Savol:** `LIKE` operatorida `%` va `_` belgilari nima farq qiladi?
   * **Javob:** `%` ixtiyoriy miqdordagi (shu jumladan 0 ta) belgilarni anglatsa, `_` (pastki chiziq) roppa-rosa bitta ixtiyoriy belgini ifodalaydi.
4. **Savol:** Qanday qilib ustunda qiymat bor-yo'qligini tekshirish mumkin?
   * **Javob:** `IS NULL` yordamida qiymati yo'qligini, `IS NOT NULL` yordamida qiymat mavjudligini tekshirish mumkin.

### Middle (5–8)
5. **Savol:** `IN` operatori qanday ishlaydi va uning o'rniga nima ishlatish mumkin?
   * **Javob:** Qiymat ro'yxat ichidan mos kelishini tekshiradi. Uni bir nechta `OR` operatorlari bilan almashtirsa bo'ladi, lekin `IN` yozilishi osonroq va optimizator uni yaxshiroq qayta ishlaydi.
6. **Savol:** `AND` va `OR` operatorlari birgalikda kelganda qaysi biri birinchi bajariladi?
   * **Javob:** `AND` operatori ustuvorroq. Shuning uchun mantiq buzilmasligi uchun `OR` shartlari qavslarga olinishi shart.
7. **Savol:** Nega `WHERE name LIKE '%Ali'` so'rovi sekin ishlaydi?
   * **Javob:** Chunki wildcard (`%`) so'z boshida kelganda, baza standart B-Tree indeksidan foydalana olmaydi va to'liq jadvalni skaner qilishga majbur bo'ladi.
8. **Savol:** `NOT IN` ro'yxatida `NULL` qiymat bo'lsa nima sodir bo'ladi?
   * **Javob:** So'rov natijasi har doim bo'sh bo'ladi, chunki `NULL` bilan tenglik tekshiruvi `UNKNOWN` qaytaradi va mantiqiy ziddiyat vujudga keladi.

### Senior (9–12)
9. **Savol:** SQL dialektlarida `LIKE` va `ILIKE` farqi nimada?
   * **Javob:** `LIKE` katta-kichik harflarni farqlaydi (case-sensitive), `ILIKE` esa farqlamaydi (case-insensitive - asosan PostgreSQL da).
10. **Savol:** Qanday qilib funksiya qo'llanilgan ustun bo'yicha filtrlashni optimallashtirish mumkin?
    * **Javob:** `WHERE UPPER(name) = 'ALI'` indeksdan foydalana olmaydi. Buning uchun yo bazada `Functional Index` yaratish kerak yoki so'rovni o'zgartirish kerak.
11. **Savol:** `EXISTS` va `IN` operatorlarining filtrlashda ishlash tezligi qanday farq qiladi?
    * **Javob:** Katta hajmli ichki so'rovlarda (Subqueries) `EXISTS` odatda tezroq ishlaydi, chunki u mos keluvchi birinchi qatorni topishi bilan tekshirishni to'xtatadi (`short-circuiting`).
12. **Savol:** Wildcard yordamida `%` yoki `_` belgilarining o'zini qanday qidirish mumkin?
    * **Javob:** Buning uchun `ESCAPE` belgisidan foydalanamiz. Masalan: `WHERE discount LIKE '10\%' ESCAPE '\'`.

---

## 6. 🛠️ Amaliy Topshiriqlar

Darsning pastki qismida siz uchun SQL-da filtrlash bo'yicha amaliy topshiriqlar joylashtirilgan. Ularni bajarib ko'nikmalaringizni mustahkamlang.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar sizning nazariy bilimlaringizni tekshirish uchun xizmat qiladi.

---

## 8. 🎯 Real Project Case Study

### E-commerce mahsulotlarini dynamic filtrlash tizimi
Tasavvur qiling, siz **Amazon** kabi do'kon uchun mahsulotlarni filtrlash backend qismini yozyapsiz. Foydalanuvchi quyidagi filtrlarni tanladi:
1. Toifasi: 'Laptops' yoki 'Smartphones'
2. Narxi: 500 dan 1500 dollargacha
3. Ombor qoldig'i mavjud bo'lgan (stock > 0)
4. Nomi tarkibida 'Pro' so'zi bor

#### Muammo:
Agar so'rov noto'g'ri yozilsa yoki indekslar hisobga olinmasa, millionlab tovarlar ichidan qidiruv bir necha soniya vaqt oladi va server qotadi.

#### SQL Yechim:
```sql
SELECT id, name, price, stock, category 
FROM products 
WHERE category IN ('Laptops', 'Smartphones') 
  AND price BETWEEN 500 AND 1500 
  AND stock > 0 
  AND name LIKE '%Pro%';
```

#### Arxitektura va Optimallashtirish:
* Biz `products` jadvalidagi `category`, `price` va `stock` ustunlariga indeks qo'yamiz.
* Nom tarkibida `%Pro%` qidiruvi indeksdan foydalana olmaydi, shuning uchun katta bazalarda **Full-Text Search (FTS)** yoki **Trigram Index** (PostgreSQL-da `pg_trgm`) ishlatish tavsiya etiladi.

---

## 9. 🚀 Performance va Optimization

* **Index Skanerlash:** `WHERE status = 'Active'` kabi tez-tez filtrlanadigan ustunlarga har doim indeks qo'ying.
* **Wildcards o'rni:** `LIKE '%text'` kabi so'rovlardan qoching. Buning o'rniga matn boshidan qidiruvchi `LIKE 'text%'` ni afzal ko'ring.
* **SDB (Sargable Queries):** Ustunlarni funksiya ichiga olmang. `WHERE DATE(created_at) = '2026-06-10'` o'rniga `WHERE created_at >= '2026-06-10 00:00:00' AND created_at < '2026-06-11 00:00:00'` deb yozing. Bu bazaga indeksdan foydalanish imkonini beradi.

---

## 10. 📌 Cheat Sheet

| Operator | Sintaksis | Vazifasi | Misol |
| :--- | :--- | :--- | :--- |
| **`=`** / **`!=`** | `WHERE status = 'Active'` | Qiymat teng yoki teng emasligini tekshiradi | `status != 'Pending'` |
| **`AND`** | `WHERE cond1 AND cond2` | Ikkala shart ham to'g'ri bo'lishi shart | `age > 18 AND city = 'Toshkent'` |
| **`OR`** | `WHERE cond1 OR cond2` | Shartlardan biri to'g'ri bo'lsa yetarli | `role = 'Admin' OR role = 'Manager'` |
| **`BETWEEN`** | `WHERE price BETWEEN a AND b` | Qiymat oraliqda ekanligini tekshiradi | `price BETWEEN 10 AND 50` |
| **`IN`** | `WHERE city IN ('a', 'b')` | Berilgan to'plamdan moslikni tekshiradi | `id IN (1, 3, 5)` |
| **`LIKE`** | `WHERE name LIKE 'A%'` | Shablon bo'yicha qidiradi | `email LIKE '%@gmail.com'` |
| **`IS NULL`** | `WHERE email IS NULL` | Bo'sh qiymatlarni aniqlaydi | `phone IS NULL` |
