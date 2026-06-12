export const sqlModifications = {
  id: "sqlModifications",
  title: "Ma'lumotlarni o'zgartirish (INSERT, UPDATE, DELETE)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

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
\`\`\`sql
INSERT INTO users (id, name, age, city, role) 
VALUES (6, 'Jasur', 27, 'Farg''ona', 'User');
\`\`\`
* **Natija:** \`users\` jadvalida yangi qator paydo bo'ladi.
* **Qachon ishlatiladi:** Ro'yxatdan o'tish jarayonida.
* **Performance jihati:** Faqat kerakli ustunlarni belgilash va keraksiz indekslarni vaqtincha cheklash orqali yozish tezligini oshirish mumkin.

### 2. Intermediate Example (UPDATE with WHERE)
Sardor ismli foydalanuvchining yoshini yangilash:
\`\`\`sql
UPDATE users 
SET age = 23 
WHERE name = 'Sardor';
\`\`\`
* **Natija:** Ismi 'Sardor' bo'lgan barcha foydalanuvchilarning yoshi 23 ga o'zgaradi.
* **Qachon ishlatiladi:** Profil sozlamalarini o'zgartirishda.
* **Performance jihati:** \`WHERE\` shartida indekslangan ustundan foydalanish (masalan, \`id\`) jadvalni to'liq skaner qilishdan (Full Table Scan) saqlaydi va tez ishlaydi.

### 3. Advanced Example (UPDATE with Subquery)
Faqatgina buyurtmalarining umumiy summasi 500 dan oshgan foydalanuvchilarning rolini 'VIP' ga o'zgartirish:
\`\`\`sql
UPDATE users 
SET role = 'VIP' 
WHERE id IN (
    SELECT user_id 
    FROM orders 
    GROUP BY user_id 
    HAVING SUM(amount) > 500
);
\`\`\`
* **Natija:** Baza subquery orqali kerakli foydalanuvchilarni aniqlaydi va faqat ularning rolini o'zgartiradi.
* **Qachon ishlatiladi:** Foydalanuvchilar holatini ularning faolligi bo'yicha avtomatik yangilashda.
* **Performance jihati:** Bu so'rov ichki agregatsiyaga bog'liq. Katta hajmlarda tranzaksiya qulflanishiga (row locking) olib kelmasligi uchun ehtiyotkorlik bilan ishlatilishi lozim.

### 4. Production Example (DELETE and Foreign Key constraints)
Roli 'Manager' bo'lgan foydalanuvchini o'chirish:
\`\`\`sql
DELETE FROM users 
WHERE role = 'Manager';
\`\`\`
* **Natija:** Roli menejer bo'lgan barcha foydalanuvchilar o'chiriladi.
* **Qachon ishlatiladi:** Tizimdan keraksiz yoki faol bo'lmagan foydalanuvchilarni o'chirishda.
* **Performance jihati:** Agar boshqa jadvallarda (masalan, \`orders\`) ushbu foydalanuvchiga bog'liq yozuvlar bo'lsa va \`ON DELETE CASCADE\` o'rnatilmagan bo'lsa, baza xatolik beradi va o'chirishga ruxsat bermaydi.

### 5. Enterprise Example (Upsert - INSERT ... ON CONFLICT)
PostgreSQL-da yangi foydalanuvchi ma'lumotlarini kiritish, agar email oldindan mavjud bo'lsa, shunchaki oxirgi kirish vaqtini yangilash (Upsert amaliyoti):
\`\`\`sql
INSERT INTO users (id, name, email, last_login) 
VALUES (10, 'Bobur', 'bobur@example.com', CURRENT_TIMESTAMP)
ON CONFLICT (email) 
DO UPDATE SET last_login = EXCLUDED.last_login;
\`\`\`
* **Natija:** Email bazada bo'lmasa yangi qator qo'shiladi, agar bo'lsa xatolik yuz bermaydi va mavjud foydalanuvchining login vaqti yangilanadi.
* **Qachon ishlatiladi:** Sinxronizatsiya jarayonlarida, login tizimida, API integratsiyalarida.
* **Performance jihati:** \`ON CONFLICT\` ishlashi uchun mo'ljallangan ustunda albatta unikal indeks (Unique Index) yoki Primary Key bo'lishi shart.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### DML amallari qaysi muammoni hal qiladi?
DML amallari ma'lumotlar bazasini statik (faqat o'qiladigan) holatdan dinamik (hayotiy) holatga o'tkazadi. Agar bu buyruqlar bo'lmaganda, foydalanuvchi faolligini saqlash, tovar qoldiqlarini yangilash yoki hisob-kitoblarni real vaqtda yangilab borish imkonsiz bo'lar edi.

### Real Dunyoda Qo'llanilishi:
* **E-commerce:** Xaridor mahsulot sotib olganda \`products\` jadvalidagi \`stock\` (ombor qoldig'i) miqdorini kamaytirish (\`UPDATE\`).
* **Ijtimoiy Tarmoqlar:** Foydalanuvchi o'z postini o'chirib tashlaganida (\`DELETE\`).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. UPDATE va DELETE amallarida WHERE shartini yozishni unutish
#### Xato:
\`\`\`sql
-- XATO! Bazadagi barcha foydalanuvchilarning shahrini Toshkent qilib qo'yadi!
UPDATE users SET city = 'Toshkent';
\`\`\`
#### Nima uchun noto'g'ri:
\`WHERE\` sharti berilmasa, SQL bazadagi barcha qatorlarni yangilaydi yoki o'chiradi. Bu loyihalarda juda katta ma'lumot yo'qolishiga (data loss) olib keladi.
#### To'g'ri usul:
\`\`\`sql
UPDATE users SET city = 'Toshkent' WHERE id = 3;
\`\`\`

### 2. Qiymatlar tartibini adashtirish
#### Xato:
\`\`\`sql
-- XATO! Ustunlar tartibi va values mos emas
INSERT INTO users (name, age) VALUES (25, 'Ali');
\`\`\`
#### Nima uchun noto'g'ri:
String turi kutilgan joyga raqam, yoki aksincha qiymat kiritilsa, baza ma'lumotlar turi mos kelmasligi (data type mismatch) sababli xato beradi.
#### To'g'ri usul:
\`\`\`sql
INSERT INTO users (name, age) VALUES ('Ali', 25);
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** SQL-da ma'lumotlarni o'zgartirish uchun qaysi asosiy buyruqlar ishlatiladi?
   * **Javob:** \`INSERT\` (qo'shish), \`UPDATE\` (yangilash) va \`DELETE\` (o'chirish).
2. **Savol:** UPDATE so'rovida \`WHERE\` sharti yozilmasa nima bo'ladi?
   * **Javob:** Jadvaldagi barcha qatorlarning qiymatlari yangilanib ketadi.
3. **Savol:** \`DELETE\` va \`TRUNCATE\` farqi nimada?
   * **Javob:** \`DELETE\` ma'lum shart bo'yicha qatorlarni o'chiradi va sekinroq ishlaydi. \`TRUNCATE\` esa butun jadval ma'lumotlarini tezda tozalaydi, lekin jadval strukturasini saqlab qoladi.
4. **Savol:** String formatidagi qiymatlar SQL buyruqlarida qanday yoziladi?
   * **Javob:** Yagona tirnoqlar \`'...'\` ichida yozilishi shart.

### Middle (5–8)
5. **Savol:** \`ON DELETE CASCADE\` nima vazifani bajaradi?
   * **Javob:** Agar asosiy jadvaldagi qator o'chirilsa, unga bog'liq bo'lgan tashqi kalitli (Foreign Key) jadvallardagi barcha tegishli qatorlarni ham avtomatik o'chiradi.
6. **Savol:** Bitta \`UPDATE\` so'rovida bir nechta ustunlarni qanday yangilash mumkin?
   * **Javob:** \`SET\` kalit so'zidan keyin ustunlarni vergul bilan ajratgan holda: \`SET city = 'Toshkent', age = 30\`.
7. **Savol:** \`INSERT INTO ... SELECT\` nima vazifani bajaradi?
   * **Javob:** Bir jadvaldagi ma'lumotlarni tanlab (SELECT), ikkinchi jadvalga to'g'ridan-to'g'ri yozish (INSERT) imkonini beradi.
8. **Savol:** Tranzaksiya ichida \`DELETE\` qilingan ma'lumotlarni qaytarish mumkinmi?
   * **Javob:** Ha, agar tranzaksiya hali \`COMMIT\` qilinmagan bo'lsa, \`ROLLBACK\` buyrug'i bilan o'chirishni bekor qilish mumkin.

### Senior (9–12)
9. **Savol:** UPSERT nima va PostgreSQL-da u qanday amalga oshiriladi?
   * **Javob:** UPSERT — bu kiritish va yangilash birlashmasi. \`INSERT ... ON CONFLICT (ustun) DO UPDATE SET ...\` sintaksisi orqali bajariladi.
10. **Savol:** Katta hajmli jadvalda (masalan, 100 mln qator) \`DELETE\` so'rovini optimallashtirish qanday amalga oshiriladi?
    * **Javob:** Barcha qatorlarni birdaniga o'chirish bazani va loglarni qulflab qo'yishi mumkin. Shuning uchun ma'lumotlar partiyalarga bo'lib (chunking) o'chiriladi yoki jadval qayta yaratiladi.
11. **Savol:** \`UPDATE\` so'rovida \`RETURNING\` kalit so'zi nima uchun ishlatiladi?
    * **Javob:** Yangilangan qatorlarning yangi qiymatlarini qaytarib olish uchun ishlatiladi (PostgreSQL va ba'zi boshqa bazalarda).
12. **Savol:** Jadvalni butunlay o'chirish (\`DROP\`) bilan ma'lumotlarini tozalash (\`TRUNCATE\`) farqi nimada?
    * **Javob:** \`DROP\` jadval tuzilishi va indekslarini ham o'chirib tashlaydi. \`TRUNCATE\` esa faqat ma'lumotlarni tozalaydi, jadval strukturasi qoladi.

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
1. Yangi buyurtma yaratish (\`INSERT INTO orders\`).
2. Har bir mahsulotning ombor qoldig'ini sotib olingan miqdorga kamaytirish (\`UPDATE products\`).

Agar mahsulot omborida yetarli miqdor qolmagan bo'lsa yoki birinchi amal bajarilib, ikkinchisi to'xtab qolsa, ma'lumotlar butunligi buziladi. Buning oldini olish uchun ushbu amallar yagona tranzaksiya blokida bajariladi:
\`\`\`sql
BEGIN;

-- 1. Yangi buyurtma kiritiladi
INSERT INTO orders (id, user_id, product, amount, order_date) 
VALUES (108, 2, 'Chair', 120.00, '2026-06-10');

-- 2. Ombor qoldig'i kamaytiriladi
UPDATE products 
SET stock = stock - 1 
WHERE name = 'Chair' AND stock >= 1;

COMMIT;
\`\`\`
Agar \`stock >= 1\` sharti bajarilmasa, dastur tranzaksiyani bekor qiladi (\`ROLLBACK\`).

---

## 9. 🚀 Performance va Optimization

DML amallarini optimallashtirish qoidalari:
1. **Indekslar ta'siri:** Har bir \`INSERT\`, \`UPDATE\`, \`DELETE\` amali jadvaldagi barcha indekslarni qayta yangilashga majbur qiladi. Katta hajmli yuklashlarda indekslarni vaqtincha o'chirib turish tavsiya etiladi.
2. **Batching:** 10,000 ta qatorni alohida 10,000 ta \`INSERT\` so'rovi bilan kiritgandan ko'ra, ularni bitta massiv ko'rinishida (Batch Insert) kiritish 50 barobar tezroq ishlaydi.
3. **Primary Key orqali yangilash:** \`UPDATE\` va \`DELETE\` amallarida doimo Primary Key ustunidan foydalaning.

---

## 10. 📌 Cheat Sheet

| Buyruq | Sintaksis | Vazifasi | Ehtiyot bo'lish kerak bo'lgan jihati |
| :--- | :--- | :--- | :--- |
| **INSERT** | \`INSERT INTO users (name) VALUES ('Ali');\` | Yangi qator qo'shish | Ma'lumotlar turlarining mosligi |
| **UPDATE** | \`UPDATE users SET age = 20 WHERE id = 1;\` | Qiymatni yangilash | \`WHERE\` shartini unutmaslik |
| **DELETE** | \`DELETE FROM users WHERE id = 1;\` | Qatorlarni o'chirish | \`WHERE\` shartini unutmaslik |
| **TRUNCATE** | \`TRUNCATE TABLE users;\` | Jadvalni butunlay tozalash | ROLLBACK qilish imkonsiz (ko'p hollarda) |
`,
  exercises: [
    {
      "id": 1,
      "title": "Yangi foydalanuvchi qo'shish",
      "instruction": "`users` jadvaliga yangi foydalanuvchi qo'shing. Qiymatlar: `id` = 6, `name` = 'Jasur', `age` = 24, `city` = 'Xiva', `role` = 'User'.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "INSERT INTO users (id, name, age, city, role) VALUES (6, 'Jasur', 24, 'Xiva', 'User')",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec('SELECT * FROM users WHERE id = 6'); if(check.length !== 1 || check[0].name !== 'Jasur') return 'Jasur foydalanuvchisi qo\\'shilmadi'; return null;"
    },
    {
      "id": 2,
      "title": "Yoshni yangilash (UPDATE)",
      "instruction": "`users` jadvalidan `name` qiymati 'Sardor' bo'lgan foydalanuvchining yoshini (`age`) 23 ga o'zgartiring.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "UPDATE users SET age = 23 WHERE name = 'Sardor'",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT age FROM users WHERE name = 'Sardor'\"); if(check.length === 0 || check[0].age !== 23) return 'Sardorning yoshi yangilanmadi'; return null;"
    },
    {
      "id": 3,
      "title": "Menejerni o'chirish (DELETE)",
      "instruction": "`users` jadvalidan roli `Manager` bo'lgan barcha foydalanuvchilarni o'chirib tashlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "DELETE FROM users WHERE role = 'Manager'",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT * FROM users WHERE role = 'Manager'\"); if(check.length !== 0) return 'Menejer o\\'chmadi'; return null;"
    },
    {
      "id": 4,
      "title": "Bir nechta yozuv qo'shish (Batch Insert)",
      "instruction": "`users` jadvaliga bir vaqtning o'zida ikkita yangi foydalanuvchini qo'shing:\n1. `id` = 7, `name` = 'Malika', `age` = 22, `city` = 'Buxoro', `role` = 'User'\n2. `id` = 8, `name` = 'Temur', `age` = 29, `city` = 'Samarqand', `role` = 'User'",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "INSERT INTO users (id, name, age, city, role) VALUES (7, 'Malika', 22, 'Buxoro', 'User'), (8, 'Temur', 29, 'Samarqand', 'User')",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec('SELECT * FROM users WHERE id IN (7, 8)'); if(check.length !== 2) return 'Foydalanuvchilar to\\'liq qo\\'shilmadi'; return null;"
    },
    {
      "id": 5,
      "title": "Shahri aniqlanmagan foydalanuvchilarni o'chirish",
      "instruction": "`users` jadvalidan shahri (`city`) aniqlanmagan (ya'ni `NULL` bo'lgan) barcha foydalanuvchilarni o'chiring.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "DELETE FROM users WHERE city IS NULL",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec('SELECT * FROM users WHERE city IS NULL'); if(check.length !== 0) return 'Shahri NULL bo\\'lgan foydalanuvchilar o\\'chmadi'; return null;"
    },
    {
      "id": 6,
      "title": "Bir nechta maydonni yangilash",
      "instruction": "`users` jadvalida ID-si 2 bo'lgan foydalanuvchining shahrini (`city`) 'Toshkent' ga, yoshini (`age`) 28 ga va roli (`role`) ni 'Admin' ga o'zgartiring.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "UPDATE users SET city = 'Toshkent', age = 28, role = 'Admin' WHERE id = 2",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec('SELECT * FROM users WHERE id = 2'); if(check.length === 0 || check[0].city !== 'Toshkent' || check[0].age !== 28 || check[0].role !== 'Admin') return 'Foydalanuvchi ma\\'lumotlari to\\'g\\'ri yangilanmadi'; return null;"
    },
    {
      "id": 7,
      "title": "Subquery yordamida rolni yangilash",
      "instruction": "`orders` jadvalida kamida bitta buyurtmasi bor bo'lgan foydalanuvchilarning roli (`role`) ni 'Active' ga o'zgartiring (Subquery yordamida `WHERE id IN (...)` shaklida yozing).",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "UPDATE users SET role = 'Active' WHERE id IN (SELECT DISTINCT user_id FROM orders)",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec('SELECT role FROM users WHERE id IN (1, 2, 3, 4)'); if(check.some(u => u.role !== 'Active')) return 'Buyurtmasi bor barcha foydalanuvchilar roli Active bo\\'lmadi'; return null;"
    },
    {
      "id": 8,
      "title": "Subquery yordamida o'chirish",
      "instruction": "Hech qachon buyurtma bermagan (ya'ni `id` qiymati `orders` jadvalidagi `user_id` ustunida mavjud bo'lmagan) barcha foydalanuvchilarni `users` jadvalidan o'chiring.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "DELETE FROM users WHERE id NOT IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL)",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec('SELECT * FROM users WHERE id NOT IN (SELECT DISTINCT user_id FROM orders)'); if(check.length !== 0) return 'Buyurtma bermagan foydalanuvchilar o\\'chirilmadi'; return null;"
    },
    {
      "id": 9,
      "title": "Matematik amallar bilan yangilash",
      "instruction": "`products` jadvalidan nomi 'Laptop' bo'lgan mahsulotning ombor qoldig'ini (`stock`) 2 taga kamaytiring (ya'ni uning qiymatidan 2 ni ayiring).",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "UPDATE products SET stock = stock - 2 WHERE name = 'Laptop'",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT stock FROM products WHERE name = 'Laptop'\"); if(check.length === 0 || check[0].stock !== 8) return 'Laptopning ombor qoldig\\'i to\\'g\\'ri kamaytirilmadi'; return null;"
    },
    {
      "id": 10,
      "title": "Boshqa jadval qiymatlari asosida yangilash",
      "instruction": "`products` jadvalidagi barcha mahsulotlarning narxini (`price`) 10% ga oshiring (narxni `price * 1.1` ga o'zgartiring), lekin faqat kategoriyasi (`category`) 'Electronics' bo'lgan mahsulotlar uchun.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "UPDATE products SET price = price * 1.1 WHERE category = 'Electronics'",
      "test": "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT price FROM products WHERE name = 'Laptop'\"); if(check.length === 0 || parseFloat(check[0].price) !== 1320.00) return 'Electronics mahsulotlari narxi to\\'g\\'ri yangilanmadi'; return null;"
    }
  ]
,
  quizzes: [
  {
    "id": 1,
    "question": "Mavjud ma'lumotlarni o'zgartirish (tahrirlash) uchun qaysi SQL buyrug'i ishlatiladi?",
    "options": ["INSERT", "UPDATE", "CHANGE", "MODIFY"],
    "correctAnswer": 1,
    "explanation": "Mavjud qatorlardagi qiymatlarni yangilash yoki o'zgartirish uchun UPDATE buyrug'i ishlatiladi."
  },
  {
    "id": 2,
    "question": "UPDATE yoki DELETE so'rovlarida WHERE shartini yozish unutilsa nima sodir bo'ladi?",
    "options": [
      "Faqat birinchi qator o'zgaradi / o'chadi",
      "Loyiha xatolik berib to'xtaydi va hech narsa o'zgarmaydi",
      "Jadvaldagi barcha qatorlar o'zgaradi / o'chadi",
      "Oxirgi qo'shilgan qator o'zgaradi"
    ],
    "correctAnswer": 2,
    "explanation": "WHERE sharti yozilmasa, buyruq butun jadval bo'yicha qo'llaniladi. Bu barcha ma'lumotlarning o'zgarishi yoki o'chib ketishiga olib keladi."
  },
  {
    "id": 3,
    "question": "Jadvalga yangi qator kiritish uchun to'g'ri sintaksis qaysi?",
    "options": [
      "INSERT INTO users VALUES (name, age) VALUES ('Ali', 20)",
      "INSERT INTO users (name, age) VALUES ('Ali', 20)",
      "UPDATE users ADD (name = 'Ali', age = 20)",
      "INSERT INTO users SET name = 'Ali', age = 20"
    ],
    "correctAnswer": 1,
    "explanation": "Standard INSERT sintaksisi: INSERT INTO jadval (ustunlar) VALUES (qiymatlar) ko'rinishida bo'ladi."
  },
  {
    "id": 4,
    "question": "INSERT INTO jadval_nomi VALUES (...) so'rovida ustunlar nomlari yozilmasa nima bo'ladi?",
    "options": [
      "Xatolik yuz beradi, ustun nomlari yozilishi shart",
      "Qiymatlar jadvaldagi barcha ustunlarga tartib bo'yicha to'liq va mos ravishda kiritilishi kerak",
      "Faqat birinchi ustunga ma'lumot yoziladi",
      "Jadvaldagi tasodifiy ustunlarga yoziladi"
    ],
    "correctAnswer": 1,
    "explanation": "Jadval ustunlari ko'rsatilmaganda, VALUES qismidagi qiymatlar jadvalning barcha ustunlariga yaratilgan tartibda mos ravishda taqdim etilishi kerak."
  },
  {
    "id": 5,
    "question": "Bitta UPDATE so'rovida bir nechta ustun qiymatini o'zgartirish uchun ular qanday ajratiladi?",
    "options": [
      "AND kalit so'zi bilan",
      "Vergul (,) belgisi bilan",
      "Nuqtali vergul (;) bilan",
      "OR kalit so'zi bilan"
    ],
    "correctAnswer": 1,
    "explanation": "UPDATE so'rovida bir nechta ustunlarni yangilashda SET ustun1 = qiymat1, ustun2 = qiymat2 ko'rinishida vergul bilan ajratiladi."
  },
  {
    "id": 6,
    "question": "Jadvaldagi barcha ma'lumotlarni o'chirish uchun qaysi so'rov ishlatiladi (lekin jadval strukturasini saqlab qoladi)?",
    "options": [
      "DROP TABLE jadval_nomi",
      "DELETE FROM jadval_nomi",
      "REMOVE TABLE jadval_nomi",
      "CLEAR jadval_nomi"
    ],
    "correctAnswer": 1,
    "explanation": "DELETE FROM jadval_nomi so'rovi shartsiz (WHERE-siz) bajarilsa, jadvaldagi barcha qatorlar o'chib ketadi, lekin jadvalning o'zi va ustunlari o'chmaydi."
  },
  {
    "id": 7,
    "question": "UPDATE so'rovida SET kalit so'zi nima vazifani bajaradi?",
    "options": [
      "Filtrlash shartini o'rnatadi",
      "Yangilanadigan ustunlar va ularning yangi qiymatlarini belgilaydi",
      "Qatorlarni o'chirish uchun ishlatiladi",
      "Natijalarni saralaydi"
    ],
    "correctAnswer": 1,
    "explanation": "SET kalit so'zi yangilanadigan ustun(lar) nomini va ularga beriladigan yangi qiymat(lar)ni ko'rsatish uchun ishlatiladi."
  },
  {
    "id": 8,
    "question": "INSERT buyrug'ida VALUES ichiga yoziladigan matnli ma'lumotlar qanday yoziladi?",
    "options": [
      "Qavssiz va tirnoqsiz",
      "Bir tirnoq (') ichida",
      "Kvadrat qavs [ ] ichida",
      "Faqat katta harflar bilan"
    ],
    "correctAnswer": 1,
    "explanation": "SQL standartiga ko'ra har qanday string (matn) qiymati bir tirnoq ichida yozilishi shart."
  },
  {
    "id": 9,
    "question": "DELETE FROM users WHERE age IS NULL so'rovi nima qiladi?",
    "options": [
      "Yoshi 0 bo'lgan foydalanuvchilarni o'chiradi",
      "Yoshi ko'rsatilmagan (NULL bo'lgan) foydalanuvchilarni o'chiradi",
      "Bacha foydalanuvchilarni o'chiradi",
      "Haqiqiy foydalanuvchilarni saqlab, qolganlarini o'chiradi"
    ],
    "correctAnswer": 1,
    "explanation": "IS NULL operatori qiymat mavjud bo'lmagan (bo'sh) qatorlarni aniqlaydi. Ushbu so'rov yoshi NULL bo'lgan foydalanuvchilarni o'chiradi."
  },
  {
    "id": 10,
    "question": "TRUNCATE TABLE va DELETE FROM farqi nimada?",
    "options": [
      "TRUNCATE jadvalni butunlay o'chiradi (DROP kabi), DELETE esa qatorlarni",
      "TRUNCATE tezroq ishlaydi, tranzaksiya jurnallarini kamroq yozadi va WHERE shartini qabul qilmaydi",
      "DELETE faqat bitta qatorni o'chira oladi, TRUNCATE esa ko'p qatorni",
      "Ular o'rtasida hech qanday farq yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "TRUNCATE yirik jadvallardagi barcha ma'lumotlarni juda tez o'chirish uchun mo'ljallangan, WHERE shartini qo'llab-quvvatlamaydi va DELETE kabi qatorlar bo'yicha triggerlarni ishga tushirmaydi."
  },
  {
    "id": 11,
    "question": "Jadvalga bir vaqtning o'zida bir nechta yangi qator kiritish mumkinmi?",
    "options": [
      "Yo'q, har bir INSERT so'rovi faqat bitta qator kiritadi",
      "Ha, VALUES qismidan keyin qavslarni vergul bilan ajratib yozish orqali",
      "Faqat UPDATE so'rovi orqali ko'p qator kiritish mumkin",
      "Ha, faqat maxsus MULTI INSERT buyrug'i orqali"
    ],
    "correctAnswer": 1,
    "explanation": "Ko'pgina SQL tizimlarida INSERT INTO jadval (...) VALUES (...), (...), (...) ko'rinishida bir so'rov bilan ko'plab qatorlarni qo'shish mumkin."
  },
  {
    "id": 12,
    "question": "UPDATE users SET age = age + 1 so'rovi nima ish bajaradi?",
    "options": [
      "Faqat birinchi foydalanuvchining yoshini 1 taga oshiradi",
      "Bacha foydalanuvchilarning yoshini 1 taga oshiradi",
      "Xatolik beradi, chunki o'ng tomonda ustun nomi yozilgan",
      "Yangi foydalanuvchi qo'shadi va uning yoshini 1 qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "WHERE sharti ko'rsatilmagani sababli, ushbu so'rov jadvaldagi barcha foydalanuvchilarning yoshini (`age`) 1 taga oshiradi."
  }
]

};
