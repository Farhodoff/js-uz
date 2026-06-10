## 1. 💡 Sodda Tushuntirish va Analogiya

### Ma'lumotlarni o'zgartirish nima?
Ma'lumotlar bazasi faqatgina o'qish (SELECT) uchun ishlatilmaydi. Ilovangizda yangi foydalanuvchi ro'yxatdan o'tganda, u o'z profil ma'lumotlarini o'zgartirganda yoki hisobini o'chirganda siz ma'lumotlar bazasini o'zgartirishingiz kerak. Buning uchun SQL-da **DML (Data Manipulation Language)** amallari: **INSERT** (qo'shish), **UPDATE** (yangilash) va **DELETE** (o'chirish) buyruqlari xizmat qiladi.

### Real hayotiy analogiya
Daftarda yozuvlar bilan ishlashni tasavvur qiling:
* **INSERT**: Daftarning yangi bo'sh varag'iga yangi foydalanuvchi ma'lumotlarini qator qilib yozib qo'yish.
* **UPDATE**: Daftardagi yozilgan qatorning biror qiymatini (masalan, yashash joyini) o'chirgich bilan o'chirib, yangisini yozish.
* **DELETE**: Daftardagi biror qatorning ustidan butunlay chiziq tortib (yoki o'chirib) tashlash.

---

## 2. 💻 Real SQL Kod Misollari

Ushbu bo'limda ma'lumotlarni qo'shish, yangilash va o'chirish bo'yicha real amaliy misollarni ko'rib chiqamiz.

### 1. Basic Example (INSERT INTO)
Yangi foydalanuvchi ma'lumotlarini jadvalga kiritish:
```sql
INSERT INTO users (id, name, age, city, role) 
VALUES (6, 'Jasur', 27, 'Farg''ona', 'User');
```
* **Natija:** `users` jadvalida yangi qator paydo bo'ladi.
* **Qachon ishlatiladi:** Ro'yxatdan o'tish jarayonida.
* **Performance jihati:** Faqat kerakli ustunlarni belgilash va keraksiz indekslarni vaqtincha cheklash orqali yozish tezligini oshirish mumkin.

### 2. Intermediate Example (UPDATE with WHERE)
Sardor ismli foydalanuvchining yoshini yangilash:
```sql
UPDATE users 
SET age = 23 
WHERE name = 'Sardor';
```
* **Natija:** Ismi 'Sardor' bo'lgan barcha foydalanuvchilarning yoshi 23 ga o'zgaradi.
* **Qachon ishlatiladi:** Profil sozlamalarini o'zgartirishda.
* **Performance jihati:** `WHERE` shartida indekslangan ustundan foydalanish (masalan, `id`) jadvalni to'liq skaner qilishdan (Full Table Scan) saqlaydi va tez ishlaydi.

### 3. Advanced Example (UPDATE with Subquery)
Faqatgina buyurtmalarining umumiy summasi 500 dan oshgan foydalanuvchilarning rolini 'VIP' ga o'zgartirish:
```sql
UPDATE users 
SET role = 'VIP' 
WHERE id IN (
    SELECT user_id 
    FROM orders 
    GROUP BY user_id 
    HAVING SUM(amount) > 500
);
```
* **Natija:** Baza subquery orqali kerakli foydalanuvchilarni aniqlaydi va faqat ularning rolini o'zgartiradi.
* **Qachon ishlatiladi:** Foydalanuvchilar holatini ularning faolligi bo'yicha avtomatik yangilashda.
* **Performance jihati:** Bu so'rov ichki agregatsiyaga bog'liq. Katta hajmlarda tranzaksiya qulflanishiga (row locking) olib kelmasligi uchun ehtiyotkorlik bilan ishlatilishi lozim.

### 4. Production Example (DELETE and Foreign Key constraints)
Roli 'Manager' bo'lgan foydalanuvchini o'chirish:
```sql
DELETE FROM users 
WHERE role = 'Manager';
```
* **Natija:** Roli menejer bo'lgan barcha foydalanuvchilar o'chiriladi.
* **Qachon ishlatiladi:** Tizimdan keraksiz yoki faol bo'lmagan foydalanuvchilarni o'chirishda.
* **Performance jihati:** Agar boshqa jadvallarda (masalan, `orders`) ushbu foydalanuvchiga bog'liq yozuvlar bo'lsa va `ON DELETE CASCADE` o'rnatilmagan bo'lsa, baza xatolik beradi va o'chirishga ruxsat bermaydi.

### 5. Enterprise Example (Upsert - INSERT ... ON CONFLICT)
PostgreSQL-da yangi foydalanuvchi ma'lumotlarini kiritish, agar email oldindan mavjud bo'lsa, shunchaki oxirgi kirish vaqtini yangilash (Upsert amaliyoti):
```sql
INSERT INTO users (id, name, email, last_login) 
VALUES (10, 'Bobur', 'bobur@example.com', CURRENT_TIMESTAMP)
ON CONFLICT (email) 
DO UPDATE SET last_login = EXCLUDED.last_login;
```
* **Natija:** Email bazada bo'lmasa yangi qator qo'shiladi, agar bo'lsa xatolik yuz bermaydi va mavjud foydalanuvchining login vaqti yangilanadi.
* **Qachon ishlatiladi:** Sinxronizatsiya jarayonlarida, login tizimida, API integratsiyalarida.
* **Performance jihati:** `ON CONFLICT` ishlashi uchun mo'ljallangan ustunda albatta unikal indeks (Unique Index) yoki Primary Key bo'lishi shart.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### DML amallari qaysi muammoni hal qiladi?
DML amallari ma'lumotlar bazasini statik (faqat o'qiladigan) holatdan dinamik (hayotiy) holatga o'tkazadi. Agar bu buyruqlar bo'lmaganda, foydalanuvchi faolligini saqlash, tovar qoldiqlarini yangilash yoki hisob-kitoblarni real vaqtda yangilab borish imkonsiz bo'lar edi.

### Real Dunyoda Qo'llanilishi:
* **E-commerce:** Xaridor mahsulot sotib olganda `products` jadvalidagi `stock` (ombor qoldig'i) miqdorini kamaytirish (`UPDATE`).
* **Ijtimoiy Tarmoqlar:** Foydalanuvchi o'z postini o'chirib tashlaganida (`DELETE`).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. UPDATE va DELETE amallarida WHERE shartini yozishni unutish
#### Xato:
```sql
-- XATO! Bazadagi barcha foydalanuvchilarning shahrini Toshkent qilib qo'yadi!
UPDATE users SET city = 'Toshkent';
```
#### Nima uchun noto'g'ri:
`WHERE` sharti berilmasa, SQL bazadagi barcha qatorlarni yangilaydi yoki o'chiradi. Bu loyihalarda juda katta ma'lumot yo'qolishiga (data loss) olib keladi.
#### To'g'ri usul:
```sql
UPDATE users SET city = 'Toshkent' WHERE id = 3;
```

### 2. Qiymatlar tartibini adashtirish
#### Xato:
```sql
-- XATO! Ustunlar tartibi va values mos emas
INSERT INTO users (name, age) VALUES (25, 'Ali');
```
#### Nima uchun noto'g'ri:
String turi kutilgan joyga raqam, yoki aksincha qiymat kiritilsa, baza ma'lumotlar turi mos kelmasligi (data type mismatch) sababli xato beradi.
#### To'g'ri usul:
```sql
INSERT INTO users (name, age) VALUES ('Ali', 25);
```

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** SQL-da ma'lumotlarni o'zgartirish uchun qaysi asosiy buyruqlar ishlatiladi?
   * **Javob:** `INSERT` (qo'shish), `UPDATE` (yangilash) va `DELETE` (o'chirish).
2. **Savol:** UPDATE so'rovida `WHERE` sharti yozilmasa nima bo'ladi?
   * **Javob:** Jadvaldagi barcha qatorlarning qiymatlari yangilanib ketadi.
3. **Savol:** `DELETE` va `TRUNCATE` farqi nimada?
   * **Javob:** `DELETE` ma'lum shart bo'yicha qatorlarni o'chiradi va sekinroq ishlaydi. `TRUNCATE` esa butun jadval ma'lumotlarini tezda tozalaydi, lekin jadval strukturasini saqlab qoladi.
4. **Savol:** String formatidagi qiymatlar SQL buyruqlarida qanday yoziladi?
   * **Javob:** Yagona tirnoqlar `'...'` ichida yozilishi shart.

### Middle (5–8)
5. **Savol:** `ON DELETE CASCADE` nima vazifani bajaradi?
   * **Javob:** Agar asosiy jadvaldagi qator o'chirilsa, unga bog'liq bo'lgan tashqi kalitli (Foreign Key) jadvallardagi barcha tegishli qatorlarni ham avtomatik o'chiradi.
6. **Savol:** Bitta `UPDATE` so'rovida bir nechta ustunlarni qanday yangilash mumkin?
   * **Javob:** `SET` kalit so'zidan keyin ustunlarni vergul bilan ajratgan holda: `SET city = 'Toshkent', age = 30`.
7. **Savol:** `INSERT INTO ... SELECT` nima vazifani bajaradi?
   * **Javob:** Bir jadvaldagi ma'lumotlarni tanlab (SELECT), ikkinchi jadvalga to'g'ridan-to'g'ri yozish (INSERT) imkonini beradi.
8. **Savol:** Tranzaksiya ichida `DELETE` qilingan ma'lumotlarni qaytarish mumkinmi?
   * **Javob:** Ha, agar tranzaksiya hali `COMMIT` qilinmagan bo'lsa, `ROLLBACK` buyrug'i bilan o'chirishni bekor qilish mumkin.

### Senior (9–12)
9. **Savol:** UPSERT nima va PostgreSQL-da u qanday amalga oshiriladi?
   * **Javob:** UPSERT — bu kiritish va yangilash birlashmasi. `INSERT ... ON CONFLICT (ustun) DO UPDATE SET ...` sintaksisi orqali bajariladi.
10. **Savol:** Katta hajmli jadvalda (masalan, 100 mln qator) `DELETE` so'rovini optimallashtirish qanday amalga oshiriladi?
    * **Javob:** Barcha qatorlarni birdaniga o'chirish bazani va loglarni qulflab qo'yishi mumkin. Shuning uchun ma'lumotlar partiyalarga bo'lib (chunking) o'chiriladi yoki jadval qayta yaratiladi.
11. **Savol:** `UPDATE` so'rovida `RETURNING` kalit so'zi nima uchun ishlatiladi?
    * **Javob:** Yangilangan qatorlarning yangi qiymatlarini qaytarib olish uchun ishlatiladi (PostgreSQL va ba'zi boshqa bazalarda).
12. **Savol:** Jadvalni butunlay o'chirish (`DROP`) bilan ma'lumotlarini tozalash (`TRUNCATE`) farqi nimada?
    * **Javob:** `DROP` jadval tuzilishi va indekslarini ham o'chirib tashlaydi. `TRUNCATE` esa faqat ma'lumotlarni tozalaydi, jadval strukturasi qoladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi mashqlar bo'limida bajarishingiz mumkin.

---

## 7. 📝 12 ta Mini Test

Dars oxirida o'rganilgan material bo'yicha interaktiv testlardan o'ting.

---

## 8. 🎯 Real Project Case Study

### Elektron Tijorat Platformasida Buyurtma Rasmiylashtirish va Ombor Qoldig'i
Mijoz savatchadagi mahsulotlarni sotib olganida, tizim quyidagi DML amallarini zanjir ko'rinishida bajarishi kerak:
1. Yangi buyurtma yaratish (`INSERT INTO orders`).
2. Har bir mahsulotning ombor qoldig'ini sotib olingan miqdorga kamaytirish (`UPDATE products`).

Agar mahsulot omborida yetarli miqdor qolmagan bo'lsa yoki birinchi amal bajarilib, ikkinchisi to'xtab qolsa, ma'lumotlar butunligi buziladi. Buning oldini olish uchun ushbu amallar yagona tranzaksiya blokida bajariladi:
```sql
BEGIN;

-- 1. Yangi buyurtma kiritiladi
INSERT INTO orders (id, user_id, product, amount, order_date) 
VALUES (108, 2, 'Chair', 120.00, '2026-06-10');

-- 2. Ombor qoldig'i kamaytiriladi
UPDATE products 
SET stock = stock - 1 
WHERE name = 'Chair' AND stock >= 1;

COMMIT;
```
Agar `stock >= 1` sharti bajarilmasa, dastur tranzaksiyani bekor qiladi (`ROLLBACK`).

---

## 9. 🚀 Performance va Optimization

DML amallarini optimallashtirish qoidalari:
1. **Indekslar ta'siri:** Har bir `INSERT`, `UPDATE`, `DELETE` amali jadvaldagi barcha indekslarni qayta yangilashga majbur qiladi. Katta hajmli yuklashlarda indekslarni vaqtincha o'chirib turish tavsiya etiladi.
2. **Batching:** 10,000 ta qatorni alohida 10,000 ta `INSERT` so'rovi bilan kiritgandan ko'ra, ularni bitta massiv ko'rinishida (Batch Insert) kiritish 50 barobar tezroq ishlaydi.
3. **Primary Key orqali yangilash:** `UPDATE` va `DELETE` amallarida doimo Primary Key ustunidan foydalaning.

---

## 10. 📌 Cheat Sheet

| Buyruq | Sintaksis | Vazifasi | Ehtiyot bo'lish kerak bo'lgan jihati |
| :--- | :--- | :--- | :--- |
| **INSERT** | `INSERT INTO users (name) VALUES ('Ali');` | Yangi qator qo'shish | Ma'lumotlar turlarining mosligi |
| **UPDATE** | `UPDATE users SET age = 20 WHERE id = 1;` | Qiymatni yangilash | `WHERE` shartini unutmaslik |
| **DELETE** | `DELETE FROM users WHERE id = 1;` | Qatorlarni o'chirish | `WHERE` shartini unutmaslik |
| **TRUNCATE** | `TRUNCATE TABLE users;` | Jadvalni butunlay tozalash | ROLLBACK qilish imkonsiz (ko'p hollarda) |
