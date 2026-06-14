export const sqlBasics = {
  id: "sqlBasics",
  title: "SQL So'rovlar Asoslari (SELECT, WHERE, ORDER BY)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish

### SQL So'rovlari nima?
**SQL So'rovi (Query)** — bu ma'lumotlar bazasiga ma'lumot olish uchun yuboriladigan buyruqdir. Eng ko'p ishlatiladigan so'rov bu ma'lumotlarni o'qish uchun mo'ljallangan \`SELECT\` so'rovidir.

### So'rovning Asosiy Tarkibiy Qismlari:
1. **\`SELECT\`:** Qaysi ustunlarni (ma'lumotlarni) olmoqchi ekanligimizni belgilaydi.
2. **\`FROM\`:** Ma'lumot qaysi jadvaldan olinishini ko'rsatadi.
3. **\`WHERE\`:** Olinayotgan ma'lumotlarga aniq filtrlash shartlarini qo'yadi (faqat ma'lum mezonlarga mos qatorlarni oladi).
4. **\`ORDER BY\`:** Keladigan natijani qanday tartibda (o'sish yoki kamayish) saralashni belgilaydi.
5. **\`LIMIT\`:** Natija sifatida necha dona qator qaytishini cheklaydi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **maktab direktorisiz** va kotibangizga topshiriq beryapsiz:
* **\`SELECT\`:** *"Menga o'quvchilarning ismi va telefon raqami kerak"* (Faqat shu ustunlar).
* **\`FROM\`:** *"Buni 'O'quvchilar' ro'yxatidan ol"* (Jadval nomi).
* **\`WHERE\`:** *"Faqat 9-sinfda o'qiydigan va yashash joyi Toshkent bo'lganlarni tanla"* (Filtr sharti).
* **\`ORDER BY\`:** *"Ularni ismlari bo'yicha alifbo tartibida taxla"* (Saralash).
* **\`LIMIT\`:** *"Menga faqat dastlabki 5 tasining ro'yxati yetarli"* (Natijani cheklash).

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Faqat SELECT va FROM)
Jadvaldagi barcha foydalanuvchilarning ismi va shahrini olish:
\`\`\`sql
-- Foydalanuvchilarning ismlari va shaharlarini olish
SELECT name, city 
FROM users;
\`\`\`
* **Natija:** Barcha foydalanuvchilarning ismi va yashash shahri ro'yxati.
* **Qachon ishlatiladi:** UI-da foydalanuvchilar haqida asosiy ma'lumotlarni ro'yxat ko'rinishida chiqarishda.
* **Performance jihati:** \`SELECT *\` emas, faqat kerakli ustunlarni tanlash RAM yuklamasini kamaytiradi.

### 2. Intermediate Example (WHERE bilan filtrlash)
Toshkent shahrida yashovchi va yoshi 25 dan katta bo'lgan foydalanuvchilarni topish:
\`\`\`sql
-- Shahar va yosh shartlari bo'yicha filtrlash
SELECT id, name, age 
FROM users 
WHERE city = 'Toshkent' 
  AND age > 25;
\`\`\`
* **Natija:** Toshkentlik 25 yoshdan katta foydalanuvchilar.
* **Qachon ishlatiladi:** Geografik yoki yoshga oid segmentlarda foydalanuvchilarni aniqlash uchun.
* **Performance jihati:** \`city\` ustunida indeks bo'lsa, qidiruv juda tez yakunlanadi.

### 3. Advanced Example (Saralash va LIMIT)
Tizimdagi eng yoshi katta 3 ta foydalanuvchining ma'lumotlarini olish:
\`\`\`sql
-- Yosh bo'yicha kamayish tartibida saralab, eng yoshi katta 3 kishini olish
SELECT name, age, role 
FROM users 
ORDER BY age DESC 
LIMIT 3;
\`\`\`
* **Natija:** Yoshi eng katta 3 ta foydalanuvchining ismi, yoshi va roli.
* **Qachon ishlatiladi:** Top ro'yxatlarni (masalan, eng ko'p pul sarflagan VIP mijozlarni) aniqlashda.
* **Performance jihati:** \`age\` ustunida indeks bo'lsa, saralash diskda emas, indeks yordamida tezda bajariladi.

### 4. Production Example (Sana bo'yicha filtrlash va saralash)
Bugungi kunda berilgan eng yirik 10 ta muvaffaqiyatli buyurtmani olish:
\`\`\`sql
-- Bugungi completed buyurtmalarni summasi bo'yicha saralab olish
SELECT id AS order_id, 
       user_id, 
       amount 
FROM orders 
WHERE status = 'completed'
  AND order_date = '2026-06-10'
ORDER BY amount DESC 
LIMIT 10;
\`\`\`
* **Natija:** Bugungi eng yirik 10 ta buyurtma ro'yxati.
* **Qachon ishlatiladi:** Admin panelda real-time eng yirik savdolarni ko'rsatishda.
* **Performance jihati:** \`(status, order_date, amount)\` ustunlarida kompozit indeks mavjudligi so'rov tezligini ideal holatga keltiradi.

### 5. Enterprise Example (Pagination - Sahifalash)
Foydalanuvchilar ro'yxatining 2-sahifasini yuklash (OFFSET bilan):
\`\`\`sql
-- Dastlabki 10 ta qatorni tashlab yuborib, keyingi 10 ta qatorni olish
SELECT id, name, email 
FROM users 
ORDER BY id ASC 
LIMIT 10 OFFSET 10;
\`\`\`
* **Natija:** Ro'yxatdagi 11-dan 20-gacha bo'lgan foydalanuvchilar.
* **Qachon ishlatiladi:** Veb-saytlarda ma'lumotlarni sahifalab (pagination) ko'rsatishda.
* **Performance jihati:** Millionlab qatorlarda \`OFFSET 100000\` qilish o'ta sekin ishlaydi. Bunday holda keyset pagination (\`WHERE id > ? LIMIT 10\`) ishlatiladi.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
\`SELECT\` so'rovlari va \`WHERE\`, \`ORDER BY\` operatorlari ma'lumotlarni **tartibga solish** va **filtrlash** muammolarini hal qiladi. Busiz, tizimlar barcha ma'lumotlarni yuklab, so'ng backend-da kod orqali saralashga va filtrlashga majbur bo'lardi. Bu esa xotirani (RAM) to'ldirib yuborardi.
\`LIMIT\` esa **tarmoq yuklamasini kamaytiradi** (Pagination orqali faqat kerakli hajmni yuklaydi).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Doimiy ravishda \`SELECT *\` ishlatish
#### Xato:
\`\`\`sql
SELECT * FROM users;
\`\`\`
#### Nima uchun noto'g'ri:
Jadvalda 50 ta ustun va millionlab qatorlar bo'lsa, keraksiz ma'lumotlarni o'qish server va tarmoqni keraksiz yuklaydi.
#### To'g'ri usul:
\`\`\`sql
SELECT id, name FROM users;
\`\`\`
#### Izoh:
Faqat kerakli ustunlarni so'rash orqali so'rov tezligini keskin oshiring.

### 2. \`ORDER BY\`siz \`LIMIT\` ishlatish
#### Xato:
\`\`\`sql
SELECT * FROM users LIMIT 3;
\`\`\`
#### Nima uchun noto'g'ri:
SQL-da jadvallardan keladigan ma'lumotlar tartibi kafolatlanmagan. Saralashsiz \`LIMIT\` ishlatganda, har safar har xil 3 ta foydalanuvchi chiqib qolishi mumkin.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users ORDER BY id ASC LIMIT 3;
\`\`\`
#### Izoh:
Doimiy va bir xil natija olish uchun \`ORDER BY\` ishlatish shart.

### 3. Matnlarni noto'g'ri qo'shtirnoq ichiga yozish
#### Xato:
\`\`\`sql
SELECT * FROM users WHERE city = "Toshkent";
\`\`\`
#### Nima uchun noto'g'ri:
SQL standartida qo'shtirnoq ustun nomini anglatadi. Matn uchun bir tirnoq kerak.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users WHERE city = 'Toshkent';
\`\`\`
#### Izoh:
Bir tirnoqdan foydalaning.

### 4. \`ORDER BY\` va \`LIMIT\` o'rnini adashtirish
#### Xato:
\`\`\`sql
SELECT * FROM users LIMIT 10 ORDER BY name; -- Sintaktik xato
\`\`\`
#### Nima uchun noto'g'ri:
Mantiqiy ketma-ketlik bo'yicha avval saralanishi (\`ORDER BY\`), so'ngra cheklanishi (\`LIMIT\`) kerak.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users ORDER BY name LIMIT 10;
\`\`\`
#### Izoh:
Sintaksis qoidalariga rioya qiling.

### 5. \`WHERE\` shartida ustun nomini chap tomonda o'zgartirish
#### Xato:
\`\`\`sql
SELECT * FROM users WHERE age + 5 = 30;
\`\`\`
#### Nima uchun noto'g'ri:
Ustunda matematik amal bajarilganda indeks o'chib ketadi.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM users WHERE age = 25;
\`\`\`
#### Izoh:
Ustun nomini toza holda qoldiring.

### 6. NULL qiymatlarni tenglik operatori bilan tekshirish
#### Xato:
\`WHERE status = NULL\`
#### To'g'ri usul:
\`WHERE status IS NULL\`
#### Izoh:
NULL bilan har doim IS ishlatiladi.

### 7. Saralashda \`ASC\` kalit so'zini majburiy yozish
#### Xato (ortiqcha kod):
\`ORDER BY age ASC\` (Yozish xato emas, lekin default hisoblanadi).
#### To'g'ri usul:
\`ORDER BY age\`
#### Izoh:
Kamayish tartibida esa \`DESC\` yozilishi shart.

### 8. \`LIMIT\`siz ulkan jadvallarni o'qish
#### Xato:
Millionlab foydalanuvchisi bor bazada shunchaki \`SELECT name FROM users;\` so'rovini yuborish.
#### Nima uchun noto'g'ri:
Server xotirasi to'lib, brauzer qotib qoladi.
#### To'g'ri usul:
Har doim \`LIMIT\` yoki sahifalash ishlating.
#### Izoh:
Ma'lumotlar yuklamasini nazorat qiling.

### 9. Pagination uchun ulkan \`OFFSET\` ishlatish
#### Xato:
\`LIMIT 10 OFFSET 500000;\`
#### Nima uchun noto'g'ri:
Baza 500,000 ta qatorni o'qib chiqishga vaqt sarflaydi.
#### To'g'ri usul:
Seek method ishlatish.
#### Izoh:
Offset katta bo'lganda so'rovlar juda sekinlashadi.

### 10. \`ORDER BY\` ustunida indeks yo'qligi
#### Xato:
Ko'p ma'lumotli jadvalda tez-tez \`ORDER BY created_at DESC\` qilish, lekin \`created_at\` ustunini indekslamaslik.
#### Nima uchun noto'g'ri:
Baza har safar barcha qatorlarni xotirada saralaydi (Filesort), bu esa protsessor yuklamasini oshiradi.
#### To'g'ri usul:
Saralanadigan ustunda indeks yaratish.
#### Izoh:
Saralashni tezlashtirish uchun indekslar o'ta muhim.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** SQL so'rovida \`SELECT\` va \`FROM\` kalit so'zlari nima uchun kerak?
   * **Javob:** \`SELECT\` ustunlarni tanlash uchun, \`FROM\` esa ma'lumot olinadigan jadvalni ko'rsatish uchun ishlatiladi.
   * **Intervyuda qanday javob berish kerak:** *"SELECT ustunlar nomini oladi, FROM esa qaysi jadvaldan ma'lumot yuklanishini belgilaydi."*

2. **Savol:** Natijadagi qatorlarni saralash qanday amalga oshiriladi?
   * **Javob:** \`ORDER BY\` kalit so'zi yordamida amalga oshiriladi.
   * **Intervyuda qanday javob berish kerak:** *"ORDER BY ustun nomi orqali saralaydi. O'sish tartibida ASC, kamayishda esa DESC ishlatiladi."*

3. **Savol:** SQL-da \`LIMIT\` nima vazifani bajaradi?
   * **Javob:** Natijadan qaytadigan maksimal qatorlar sonini belgilaydi.
   * **Intervyuda qanday javob berish kerak:** *"Natijalarni cheklash va sahifalab ko'rsatish (Pagination) uchun LIMIT operatoridan foydalanamiz."*

4. **Savol:** \`WHERE\` bloki nima uchun ishlatiladi?
   * **Javob:** Natijani ma'lum bir shartlar asosida filtrlash uchun ishlatiladi.
   * **Intervyuda qanday javob berish kerak:** *"WHERE ma'lum shartlarga to'g'ri keladigan qatorlarni tanlab olish uchun xizmat qiladi."*

### Middle (5–8)
5. **Savol:** \`ORDER BY\` sukut bo'yicha (default) qanday saralaydi?
   * **Javob:** Sukut bo'yicha o'sish tartibida (\`ASC\`) saralaydi.
   * **Intervyuda qanday javob berish kerak:** *"Agar biz ORDER BY age deb yozsak, u sukut bo'yicha yoshlarni kichikdan kattaga qarab saralaydi."*

6. **Savol:** \`LIMIT 10 OFFSET 20\` nimani anglatadi?
   * **Javob:** Natijadagi dastlabki 20 ta qatorni tashlab yuborib, keyingi 10 ta qatorni qaytaradi.
   * **Intervyuda qanday javob berish kerak:** *"Bu sahifalash (pagination) loyihasining 3-sahifasini yuklash mantiqini anglatadi."*

7. **Savol:** Nima uchun \`SELECT *\` ishlatish production muhitida tavsiya etilmaydi?
   * **Javob:** Tarmoq trafigini va xotirani tejash, shuning ko'plab RDBMS-larda indekslardan to'liq foydalanish uchun.
   * **Intervyuda qanday javob berish kerak:** *"SELECT * keraksiz ustunlarni yuklaydi, bu tizim tezligini kamaytiradi. Loyihalarda faqat kerakli ustunlarni yozish shart."*

8. **Savol:** \`ORDER BY\` ustunida indeks bo'lishi qanday yordam beradi?
   * **Javob:** Filesort (faylli saralash) jarayonini oldini olib, ma'lumotlarni indeks daraxtidan tayyor saralangan holda oladi.
   * **Intervyuda qanday javob berish kerak:** *"Indeks bo'lganda baza saralash uchun vaqt sarflamaydi, chunki indeksda ma'lumotlar allaqachon tartiblangan holda saqlanadi."*

### Senior (9–12)
9. **Savol:** Katta hajmli jadvallarda \`OFFSET\` ishlatilganda nima uchun so'rov sekinlashadi?
   * **Javob:** Baza so'ralgan offsetgacha bo'lgan barcha qatorlarni diskdan o'qib chiqishga majbur bo'ladi.
   * **Intervyuda qanday javob berish kerak:** *"OFFSET 1000000 yozilganda, baza 1 million qatorni o'qib chiqib, keyin tashlab yuboradi. Buning o'rniga Keyset Pagination ishlatgan ma'qul."*

10. **Savol:** \`ORDER BY\` amali bajarilayotganda \`Filesort\` muammosi yuzaga kelsa, buni qanday aniqlash va hal qilish mumkin?
    * **Javob:** \`EXPLAIN\` plandagi \`Using filesort\` yozuvini topamiz va o'sha ustunga B-Tree indeks qo'shamiz.
    * **Intervyuda qanday javob berish kerak:** *"Explain plan orqali filesortni aniqlaymiz va saralanayotgan ustunga indeks yaratib muammoni hal qilamiz."*

11. **Savol:** Agar so'rovda \`WHERE status = 'active' ORDER BY created_at DESC\` bo'lsa, indeksni qanday loyihalash kerak?
    * **Javob:** Ikkala ustun ustida kompozit indeks yaratish lozim: \`(status, created_at)\`.
    * **Intervyuda qanday javob berish kerak:** *"Faqat bitta ustunni indekslash yetarli bo'lmasligi mumkin. Kompozit indeks (status, created_at DESC) so'rovni ideal darajada tezlashtiradi."*

12. **Savol:** \`SELECT\` so'rovida \`DISTINCT\` nima vazifani bajaradi va u qanday optimallashtiriladi?
    * **Javob:** Dublikat (bir xil) qiymatlarni olib tashlaydi.
    * **Intervyuda qanday javob berish kerak:** *"DISTINCT dublikatlarni o'chirish uchun xizmat qiladi. Ustun indekslangan bo'lsa, baza tezda unikal qiymatlarni topadi."*

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Yangiliklar sayti (News portal) uchun pagination tizimini yaratish
Saytimizda 1 milliondan ortiq maqolalar bor. Foydalanuvchi "Oxirgi yangiliklar" sahifasiga kirganda maqolalarni eng yangisidan boshlab (sana bo'yicha) 10 tadan ko'rsatishimiz kerak.

#### Yechim:
\`\`\`sql
SELECT id, title, summary, publish_date 
FROM articles 
WHERE status = 'published'
ORDER BY publish_date DESC 
LIMIT 10;
\`\`\`
Biz \`(status, publish_date)\` ustunlariga indeks qo'yamiz. Bu orqali foydalanuvchilar har doim eng so'nggi yangiliklarni tezkor va xavfsiz o'qiy oladilar.

---

## 9. 🚀 Performance va Optimization

\`EXPLAIN\` plandagi saralash turlari:
* **Index Scan (Backward):** Eng optimal saralash. Ma'lumot indeksdan tayyor saralangan holda olinadi.
* **Filesort:** Baza xotirada (RAM yoki diskda) saralash algoritmini ishga soladi, bu sekinroq ishlaydi va resurs talab qiladi.

---

## 10. 📌 Cheat Sheet

| Buyruq | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **SELECT** | \`SELECT name FROM users\` | Ustunlarni olish | \`SELECT *\` dan qoching |
| **WHERE** | \`WHERE age >= 18\` | Qatorlarni filtrlash | Indeksli ustunlar uchun juda mos |
| **ORDER BY** | \`ORDER BY age DESC\` | Saralash | default tartib: ASC |
| **LIMIT** | \`LIMIT 10\` | Qatorlar sonini cheklash | Pagination asosi |
| **OFFSET** | \`OFFSET 20\` | Qatorlarni tashlab o'tish | Katta raqamlarda sekinlashadi |
`,
  exercises: [
    {
      "id": 1,
      "title": "Barcha foydalanuvchilarning ismlari",
      "instruction": "`users` jadvalidan barcha foydalanuvchilarning ismi (`name`) ustunini tanlab oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name FROM users",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Foydalanuvchilar soni noto\\'g\\'ri'; if(result[0].name !== 'Ali' || !result[0].hasOwnProperty('name') || Object.keys(result[0]).length !== 1) return 'Faqat name ustunini tanlang'; return null;"
    },
    {
      "id": 2,
      "title": "Foydalanuvchilarning ismi va yoshi",
      "instruction": "`users` jadvalidan barcha foydalanuvchilarning ismi (`name`) va yoshi (`age`) ustunlarini oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, age FROM users",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Foydalanuvchilar soni noto\\'g\\'ri'; if(!result[0].hasOwnProperty('name') || !result[0].hasOwnProperty('age') || Object.keys(result[0]).length !== 2) return 'Faqat name va age ustunlarini tanlang'; return null;"
    },
    {
      "id": 3,
      "title": "Foydalanuvchilarni alifbo bo'yicha saralash",
      "instruction": "`users` jadvalidan barcha foydalanuvchilarning ismi (`name`) ustunini ismi bo'yicha alifbo tartibida (o'sish tartibida - ASC) saralab oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name FROM users ORDER BY name ASC",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Natija 5 ta qatordan iborat bo\\'lishi kerak'; if(result[0].name !== 'Ali' || result[4].name !== 'Vali') return 'Alifbo bo\\'yicha saralash xato'; return null;"
    },
    {
      "id": 4,
      "title": "Eng qimmat mahsulotlar",
      "instruction": "`products` jadvalidan eng qimmat 3 ta mahsulotning nomi (`name`) va narxi (`price`) ustunlarini narxining kamayish tartibida (DESC) saralab oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, price FROM products ORDER BY price DESC LIMIT 3",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Faqat 3 ta mahsulot qaytishi kerak'; if(result[0].name !== 'Laptop' || parseFloat(result[0].price) !== 1200.00) return 'Narxi bo\\'yicha kamayish tartibida saralash xato'; return null;"
    },
    {
      "id": 5,
      "title": "Toshkentlik foydalanuvchilar",
      "instruction": "`users` jadvalidan yashash shahri (`city`) 'Toshkent' bo'lgan foydalanuvchilarning ismi (`name`) va shahri (`city`) ustunlarini tanlang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, city FROM users WHERE city = 'Toshkent'",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Toshkentda yashovchi foydalanuvchilar soni 3 ta bo\\'lishi kerak'; if(result.some(r => r.city !== 'Toshkent')) return 'Faqat Toshkentliklarni tanlang'; return null;"
    },
    {
      "id": 6,
      "title": "Katta yoshli foydalanuvchilar",
      "instruction": "`users` jadvalidan yoshi (`age`) 25 dan katta bo'lgan foydalanuvchilarning ismi (`name`), yoshi (`age`) va roli (`role`) ustunlarini yoshi bo'yicha o'sish tartibida (ASC) saralab oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, age, role FROM users WHERE age > 25 ORDER BY age ASC",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Yoshi 25 dan katta 3 ta foydalanuvchi bor'; if(Number(result[0].age) !== 28 || Number(result[2].age) !== 35) return 'Yosh bo\\'yicha saralash yoki shart xato'; return null;"
    },
    {
      "id": 7,
      "title": "Toshkentliklarni alifbo bo'yicha saralash va cheklash",
      "instruction": "`users` jadvalidan yashash shahri (`city`) 'Toshkent' bo'lgan barcha foydalanuvchilarning ismi (`name`) va yashash shahri (`city`) ustunlarini ismi bo'yicha alifbo tartibida (ASC) oling va dastlabki 2 ta qator bilan cheklang (LIMIT).",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, city FROM users WHERE city = 'Toshkent' ORDER BY name ASC LIMIT 2",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Faqat 2 ta qator qaytishi kerak'; if(result[0].name !== 'Ali' || result[1].name !== 'Dilshod') return 'Toshkentliklarni alifbo bo\\'yicha saralash va cheklash xato'; return null;"
    },
    {
      "id": 8,
      "title": "Sahifalash: Dastlabki buyurtmalarni o'tkazib yuborish",
      "instruction": "`orders` jadvalidan barcha buyurtmalarning idsi (`id`) va mahsulot nomi (`product`) ustunlarini id bo'yicha o'sish tartibida (ASC) saralang, keyin dastlabki 3 ta buyurtmani tashlab (OFFSET), keyingi 2 ta buyurtmani (LIMIT) oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT id, product FROM orders ORDER BY id ASC LIMIT 2 OFFSET 3",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Natija 2 ta qatordan iborat bo\\'lishi kerak'; if(result[0].id !== 104 || result[1].id !== 105) return 'Sahifalash mantiqi xato'; return null;"
    },
    {
      "id": 9,
      "title": "Murakkab saralash: Roli va Yoshi bo'yicha",
      "instruction": "`users` jadvalidan foydalanuvchilarning ismi (`name`), roli (`role`) va yoshi (`age`) ustunlarini tanlang. Ularni avval roli (`role`) bo'yicha o'sish tartibida (ASC), keyin esa bir xil roldagilarni yoshi (`age`) bo'yicha kamayish tartibida (DESC) saralang.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, role, age FROM users ORDER BY role ASC, age DESC",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Natijada barcha 5 ta foydalanuvchi bo\\'lishi kerak'; if(result[0].role !== 'Admin') return 'Roli bo\\'yicha o\\'sish tartibi xato'; if(result[2].name !== 'Dilshod' || result[2].age !== 35) return 'Roli bir xillar yoshi bo\\'yicha kamayish tartibida saralanmagan'; return null;"
    },
    {
      "id": 10,
      "title": "Electronics kategoriyasidagi eng arzon mahsulot",
      "instruction": "`products` jadvalidan kategoriyasi (`category`) 'Electronics' bo'lgan mahsulotlarning nomi (`name`), narxi (`price`) va ombordagi soni (`stock`) ustunlarini narx bo'yicha o'sish tartibida (ASC) saralang va faqat eng birinchi (eng arzon) 1 tasini (LIMIT) oling.",
      "startingCode": "-- SQL so'rovini yozing\n",
      "hint": "SELECT name, price, stock FROM products WHERE category = 'Electronics' ORDER BY price ASC LIMIT 1",
      "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Faqat 1 ta mahsulot qaytishi kerak'; if(result[0].name !== 'Mouse' || parseFloat(result[0].price) !== 25.00) return 'Electronics kategoriyasidagi eng arzon mahsulot tanlanmagan'; return null;"
    }
  ]
,
  quizzes: [
  {
    "id": 1,
    "question": "SQL so'rovida barcha ustunlarni tanlash uchun qaysi belgi ishlatiladi?",
    "options": ["#", "%", "*", "$"],
    "correctAnswer": 2,
    "explanation": "SQL-da * (yulduzcha) belgisi 'barcha ustunlar' degan ma'noni anglatadi."
  },
  {
    "id": 2,
    "question": "Natijalar sonini cheklash uchun qaysi kalit so'z ishlatiladi?",
    "options": ["TOP", "LIMIT", "COUNT", "MAX"],
    "correctAnswer": 1,
    "explanation": "Standard SQL dialektlarida (PostgreSQL, MySQL, SQLite) LIMIT kalit so'zi natijadagi qatorlar sonini cheklash uchun ishlatiladi."
  },
  {
    "id": 3,
    "question": "Qatorlarni biror shart bo'yicha filtrlash uchun qaysi kalit so'z ishlatiladi?",
    "options": ["HAVING", "GROUP BY", "WHERE", "ORDER BY"],
    "correctAnswer": 2,
    "explanation": "Bazadan keladigan birlamchi qatorlarni shart bo'yicha filtrlash uchun WHERE kalit so'zidan foydalaniladi."
  },
  {
    "id": 4,
    "question": "SQL so'rovida clauses (bloklar) qaysi sintaktik tartibda yozilishi shart?",
    "options": [
      "FROM -> SELECT -> WHERE",
      "SELECT -> FROM -> WHERE",
      "WHERE -> SELECT -> FROM",
      "SELECT -> WHERE -> FROM"
    ],
    "correctAnswer": 1,
    "explanation": "Sintaksis qoidalariga ko'ra doimo SELECT birinchi, keyin FROM va undan so'ng WHERE yoziladi."
  },
  {
    "id": 5,
    "question": "Natijani o'sish tartibida saralash uchun qaysi kalit so'z ishlatiladi?",
    "options": ["DESC", "ASC", "UP", "GROW"],
    "correctAnswer": 1,
    "explanation": "O'sish tartibida saralash uchun ASC (Ascending) kalit so'zi ishlatiladi. Bu sukut bo'yicha (default) tartib hisoblanadi."
  },
  {
    "id": 6,
    "question": "Yoshi bo'yicha kamayish tartibida saralash qaysi kalit so'z yordamida amalga oshiriladi?",
    "options": ["ORDER BY age DESC", "ORDER BY age ASC", "SORT BY age DOWN", "GROUP BY age DESC"],
    "correctAnswer": 0,
    "explanation": "ORDER BY ustun_nomi DESC yozuvi ustun qiymatlari bo'yicha kamayish tartibida saralaydi."
  },
  {
    "id": 7,
    "question": "Natijadan dastlabki 5 ta qatorni olish uchun nima yoziladi?",
    "options": ["LIMIT 5", "COUNT 5", "WHERE row <= 5", "TAKE 5"],
    "correctAnswer": 0,
    "explanation": "SQL-da natijalarni cheklash uchun LIMIT 5 qo'llaniladi."
  },
  {
    "id": 8,
    "question": "Pagination (sahifalash) yaratayotganda dastlabki 10 ta qatorni tashlab yuborish uchun qaysi kalit so'z ishlatiladi?",
    "options": ["SKIP 10", "OFFSET 10", "LIMIT 10", "JUMP 10"],
    "correctAnswer": 1,
    "explanation": "OFFSET operatori so'rov natijasidagi dastlabki berilgan miqdordagi qatorlarni tashlab yuborish (skip) uchun ishlatiladi."
  },
  {
    "id": 9,
    "question": "Jadval ustunlari (columns) reliesion ma'lumotlar bazasida yana nima deb ataladi?",
    "options": ["Qatorlar (Rows)", "Maydonlar (Fields/Attributes)", "Tugunlar (Nodes)", "Jadvallar"],
    "correctAnswer": 1,
    "explanation": "Jadvalning ustunlari maydonlar (fields yoki attributes) deb ataladi va ular ma'lumotlar turini ifodalaydi."
  },
  {
    "id": 10,
    "question": "Jadval qatorlari (rows) reliesion bazada nima deb nomlanadi?",
    "options": ["Yozuvlar (Records/Entities)", "Sarlavhalar (Headers)", "Kalitlar (Keys)", "Toifalar"],
    "correctAnswer": 0,
    "explanation": "Jadval qatorlari yozuvlar (records) yoki ob'ektlar (entities) deb nomlanadi va ular real ma'lumotlarni o'zida saqlaydi."
  },
  {
    "id": 11,
    "question": "So'rovda SELECT operatori mantiqan qaysi operatordan keyin bajariladi?",
    "options": ["Faqat WHERE dan keyin", "FROM va WHERE lardan keyin", "ORDER BY dan keyin", "LIMIT dan keyin"],
    "correctAnswer": 1,
    "explanation": "Mantiqiy bajarilish tartibiga ko'ra SELECT operatori FROM va WHERE operatorlaridan keyin bajariladi, shuning uchun SELECT alias-lari WHERE ichida ishlamaydi."
  },
  {
    "id": 12,
    "question": "Dublikat (bir xil) qatorlarni olib tashlab, faqat unikal qiymatlarni qaytarish uchun qaysi kalit so'z ishlatiladi?",
    "options": ["UNIQUE", "DISTINCT", "SINGLE", "ONCE"],
    "correctAnswer": 1,
    "explanation": "DISTINCT kalit so'zi so'rov natijasidagi barcha dublikat qatorlarni o'chirib tashlaydi."
  }
]

};
