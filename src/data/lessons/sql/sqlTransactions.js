export const sqlTransactions = {
  id: "sqlTransactions",
  title: "Tranzaksiyalar va ACID",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish

### Tranzaksiya (Transaction) nima?
**Tranzaksiya** — bu ma'lumotlar bazasida bajariladigan bir nechta SQL amallarining yagona butun blok (all-or-nothing) sifatida birlashtirilishidir. Tranzaksiya ichidagi barcha so'rovlar yo hammasi muvaffaqiyatli bajarilishi shart, yoki birortasi ham bajarilmasligi kerak.

Tranzaksiyalarni boshqarishda 3 ta asosiy kalit so'z ishlatiladi:
1. **\`BEGIN\` (yoki \`START TRANSACTION\`):** Tranzaksiyani boshlaydi.
2. **\`COMMIT\`:** Tranzaksiya ichidagi barcha o'zgarishlarni bazaga doimiy yozadi.
3. **\`ROLLBACK\`:** Agar xatolik yuz bersa, barcha bajarilgan o'zgarishlarni bekor qilib, bazani avvalgi holatiga qaytaradi.

### ACID prinsiplari nima?
ACID — tranzaksiyalar ishonchliligini kafolatlovchi 4 ta oltin qoidadir:
* **A (Atomicity - Bo'linmaslik):** Tranzaksiya amallarining hammasi bajariladi yoki umuman bajarilmaydi (yo hammasi, yo hech biri).
* **C (Consistency - Muvofiqlik):** Tranzaksiya boshlanishidan oldin va tugaganidan keyin baza qoidalari (cheklovlari) saqlanishi kerak.
* **I (Isolation - Izolyatsiya):** Bir vaqtda ishlayotgan tranzaksiyalar bir-biriga xalaqit bermaydi.
* **D (Durability - Bardoshlilik):** Tranzaksiya muvaffaqiyatli tugagach (Commit bo'lgach), tizim o'chib qolsa ham ma'lumotlar bazada saqlanib qoladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **do'stingizga klik orqali pul o'tkazyapsiz**:
1. **1-qadam:** Sizning balansingizdan 100,000 so'm ayriladi.
2. **2-qadam:** Do'stingizning balansiga 100,000 so'm qo'shiladi.

Agar 1-qadam bajarilib, 2-qadam bajarilayotganda elektr tarmog'i o'chib qolsa nima bo'ladi? Pul sizdan ketdi, lekin do'stingizga yetib bormadi.
**Tranzaksiyasiz:** Pul havoda yo'q bo'ladi.
**Tranzaksiya bilan:** RDBMS ikkala qadamni bitta tranzaksiyaga o'raydi. Agar 2-qadam bajarilmasa, baza \`ROLLBACK\` qiladi va 1-qadamda sizdan ayrilgan pul balansingizga qaytadi.

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Oddiy Tranzaksiya)
Foydalanuvchi balansidan pul yechish va ikkinchi foydalanuvchiga pul qo'shish:
\`\`\`sql
-- Tranzaksiyani boshlash
BEGIN;

-- 1. Alining balansidan 50,000 yechish
UPDATE wallets 
SET balance = balance - 50000 
WHERE user_id = 1;

-- 2. Valining balansiga 50,000 qo'shish
UPDATE wallets 
SET balance = balance + 50000 
WHERE user_id = 2;

-- O'zgarishlarni saqlash
COMMIT;
\`\`\`
* **Natija:** Alining balansi kamayadi va Valining balansi oshadi. Ikkala yangilanish ham bir vaqtda kuchga kiradi.
* **Qachon ishlatiladi:** Pul o'tkazmalari, savdo hisob-kitoblarida.
* **Performance jihati:** \`COMMIT\` chaqirilmaguncha o'zgarishlar faqat joriy sessiya uchun ko'rinadi, boshqa foydalanuvchilar buni ko'ra olmaydi.

### 2. Intermediate Example (ROLLBACK bilan xatolikni qaytarish)
Agar biror shart bajarilmasa yoki xatolik yuz bersa, tranzaksiyani orqaga qaytarish:
\`\`\`sql
BEGIN;

-- Mahsulot sonini kamaytirish
UPDATE products 
SET stock = stock - 1 
WHERE id = 3;

-- Agar tekshiruvda stock manfiy bo'lib ketganini bilsak (masalan, yetarli tovar yo'q)
-- Tranzaksiyani bekor qilamiz
ROLLBACK;
\`\`\`
* **Natija:** Mahsulot qoldig'i avvalgi holatiga qaytadi.
* **Qachon ishlatiladi:** Savdo jarayonida omborda mahsulot qolmaganini aniqlaganda operatsiyani bekor qilish uchun.
* **Performance jihati:** \`ROLLBACK\` bazaga ortiqcha og'irlik keltirmaydi, u faqat xotiradagi o'zgarishlarni tozalaydi.

### 3. Advanced Example (Race Condition oldini olish - FOR UPDATE)
Ikki kishi bir vaqtda bitta mahsulotni sotib olmoqchi bo'lganda ziddiyatni oldini olish:
\`\`\`sql
BEGIN;

-- Mahsulot qatorini qulflab qo'yish (boshqalar o'zgartira olmaydi)
SELECT stock 
FROM products 
WHERE id = 1 
FOR UPDATE;

-- Mahsulot sotish
UPDATE products 
SET stock = stock - 1 
WHERE id = 1;

COMMIT;
\`\`\`
* **Natija:** Boshqa parallel tranzaksiyalar ushbu qatorni o'zgartirish uchun joriy tranzaksiya tugashini (\`COMMIT\` yoki \`ROLLBACK\` bo'lishini) kutishga majbur bo'ladi.
* **Qachon ishlatiladi:** O'rindiqlarni band qilish, bilet sotish yoki aksiya tovarlarini sotishda (Race condition-ni oldini olish).
* **Performance jihati:** \`FOR UPDATE\` so'rovi Row-Level lock (qator darajasidagi qulf) qo'yadi. Agar tranzaksiya juda uzoq davom etsa, boshqa foydalanuvchilar kutib qoladi (Connection Timeout yuz berishi mumkin).

### 4. Production Example (Savepoint - Qisman qaytarish)
Murakkab operatsiyalarda qisman orqaga qaytarish nuqtalarini yaratish:
\`\`\`sql
BEGIN;

-- 1. Buyurtma yaratish
INSERT INTO orders (id, user_id, amount) VALUES (201, 1, 150.00);

-- Saqlash nuqtasi yaratish
SAVEPOINT order_created;

-- 2. Keshbek berishga urinish
INSERT INTO cashback_logs (user_id, amount) VALUES (1, 15.00);

-- Agar keshbek berish xato bo'lsa, faqat keshbekni bekor qilamiz, buyurtma qoladi
ROLLBACK TO order_created;

-- Tranzaksiyani tugatamiz (Buyurtma saqlanadi, keshbek esa yo'q)
COMMIT;
\`\`\`
* **Natija:** Buyurtma bazada qoladi, lekin keshbek yozuvi bekor qilinadi.
* **Qachon ishlatiladi:** Katta zanjirli amallarda (chain of actions) muhim bo'lmagan qadam xato berganda asosiy amalni saqlab qolish uchun.
* **Performance jihati:** Savepoint-lar xotirada qo'shimcha resurs talab qiladi, shuning uchun ularni juda ko'p ishlatish tavsiya etilmaydi.

### 5. Enterprise Example (Isolation Level o'zgartirish)
O'ta qattiq ma'lumotlar yaxlitligini ta'minlash uchun tranzaksiya izolyatsiya darajasini o'rnatish:
\`\`\`sql
-- Serializability izolyatsiya darajasini yoqish (Eng yuqori daraja)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN;

-- Hisob-kitoblarni amalga oshirish
SELECT SUM(amount) FROM orders WHERE user_id = 1;

-- Yangi ma'lumot yozish
INSERT INTO audit_reports (user_id, total_sum) VALUES (1, 2350.00);

COMMIT;
\`\`\`
* **Natija:** Tranzaksiya davomida boshqa hech qaysi tranzaksiya ushbu foydalanuvchi buyurtmalariga yangi qator qo'sha olmaydi (Phantom Read oldi olinadi).
* **Qachon ishlatiladi:** Yillik yoki oylik yirik moliyaviy hisobotlarni yopish paytida.
* **Performance jihati:** \`SERIALIZABLE\` darajasida bazada juda ko'p \`Serialization Failure\` xatolari yuz berishi mumkin. Agar ikki tranzaksiya to'qnashsa, biri avtomatik bekor qilinadi. Dasturiy ta'minot (Backend) bunday xato bo'lganda so'rovni qaytadan yuborishga (retry mechanism) tayyor bo'lishi shart.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Race Condition (Poyga holati):** Bir vaqtda ikki foydalanuvchi bitta tovar qoldig'ini (masalan, omborda oxirgi 1 dona tovar qolgan) sotib olishga harakat qilganda ziddiyatni bartaraf etadi.
* **Data Corruption (Ma'lumotlar buzilishi):** Tizim o'rtasida o'chib qolsa, ma'lumotlar yarmi yozilib, yarmi qolib ketishini oldini oladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Tranzaksiya ichida keraksiz tashqi tarmoq so'rovlarini (API calls) bajarish
#### Xato (Backend kodida):
\`\`\`javascript
// Tranzaksiyani boshlash
await db.query("BEGIN");
await db.query("UPDATE users SET balance = balance - 100 WHERE id = 1");
// Tashqi to'lov tizimi API-siga so'rov yuborish (bu 5-10 soniya olishi mumkin!)
const response = await paymeAPI.sendPayment(...);
await db.query("COMMIT");
\`\`\`
#### Nima uchun noto'g'ri:
API so'rovi ketayotgan paytda foydalanuvchi qatori qulflanib turadi. Bu bazadagi connection pullarni to'ldirib yuboradi va boshqa barcha foydalanuvchilar kutib qoladi (Database bottleneck).
#### To'g'ri usul:
API so'rovini tranzaksiyadan oldin yoki keyin bajaring. Tranzaksiya ichida faqat va faqat SQL amallari bo'lishi shart.
#### Izoh:
Tranzaksiya vaqti soniyaning milliy ulushlarida o'lchanishi kerak.

### 2. Tranzaksiyani \`COMMIT\` yoki \`ROLLBACK\` qilishni unutish
#### Xato:
\`\`\`sql
BEGIN;
UPDATE users SET status = 'active' WHERE id = 5;
-- COMMIT yoki ROLLBACK yoq
\`\`\`
#### Nima uchun noto'g'ri:
Sessiya ochiq qoladi va o'sha foydalanuvchi qatori qulflangan holatda turadi. Boshqa hech kim uni o'zgartira olmaydi.
#### To'g'ri usul:
Har doim kodni \`try-catch\` bloklariga o'rab, xatolik bo'lsa \`ROLLBACK\`, muvaffaqiyatli bo'lsa \`COMMIT\` qilinishini kafolatlang.
#### Izoh:
Ochiq qolgan tranzaksiyalar bazani qotiradi.

### 3. Deadlock (O'lik qulflash) holatini keltirib chiqarish
#### Xato:
* 1-tranzaksiya: Alini qulflaydi, keyin Valini yangilamoqchi bo'ladi.
* 2-tranzaksiya: Valini qulflaydi, keyin Alini yangilamoqchi bo'ladi.
Ikkalasi ham bir-birini cheksiz kutib qoladi.
#### To'g'ri usul:
Har doim barcha tranzaksiyalarda jadvallarni va qatorlarni bir xil tartibda (masalan, doimo kichik ID-dan boshlab katta ID-ga qarab) qulflang yoki yangilang.
#### Izoh:
Deadlock reliesion bazalarda ko'p uchraydi, uning oldini olish tartibga rioya qilishdir.

### 4. \`FOR UPDATE\`ni keraksiz joyda ishlatish
#### Xato:
Oddiy hisobot yoki o'qish (SELECT) so'rovlarida ham \`FOR UPDATE\` qo'shish.
#### Nima uchun noto'g'ri:
Bu parallel o'qish tezligini pasaytiradi va keraksiz qulflashlarga olib keladi.
#### To'g'ri usul:
Faqat ma'lumotni o'qib, keyin uni albatta o'zgartiradigan holatlardagina \`FOR UPDATE\` ishlating.
#### Izoh:
Keraksiz qulflashlardan qoching.

### 5. \`Isolation Level\`ni keraksiz tarzda \`SERIALIZABLE\` qilib qo'yish
#### Xato:
Tizimdagi barcha sodda o'qish-yozish amallarini serializable darajasida bajarish.
#### Nima uchun noto'g'ri:
Bu parallelizmni deyarli yo'q qiladi va ko'plab tranzaksiyalar rad etiladi.
#### To'g'ri usul:
Ko'p holatlarda sukut bo'yicha berilgan \`Read Committed\` darajasi yetarli hisoblanadi.
#### Izoh:
Izolyatsiya darajasini faqat o'ta muhim hisob-kitoblarda oshiring.

### 6. Tranzaksiya ichida DDL amallarini bajarish
#### Xato:
Tranzaksiya ichida \`CREATE TABLE\` yoki \`ALTER TABLE\` yozish.
#### Nima uchun noto'g'ri:
Ko'plab bazalarda DDL amallari avtomatik \`COMMIT\` bo'lib ketadi va orqaga qaytmaydi (non-transactional DDL).
#### To'g'ri usul:
Sxema o'zgarishlarini tranzaksiyalardan alohida bajaring.
#### Izoh:
MySQL tranzaksiyada DDL-ni qo'llab-quvvatlamaydi, PostgreSQL-da esa qisman mumkin.

### 7. Katta hajmdagi ma'lumotlarni bitta ulkan tranzaksiyada o'chirish yoki yozish
#### Xato:
10 million qatorni bitta tranzaksiya ichida \`DELETE FROM logs;\` qilish.
#### Nima uchun noto'g'ri:
Bu bazadagi tranzaksiya logini (WAL) to'ldirib yuboradi va jadvalni butunlay qulflab qo'yadi.
#### To'g'ri usul:
Ma'lumotlarni kichik bo'laklarga (batch) bo'lib (masalan, 5000 tadan) alohida tranzaksiyalarda o'chirish.
#### Izoh:
Katta amallarni bo'lib-bo'lib bajarish xavfsizdir.

### 8. \`ROLLBACK\`ni xatolikdan keyin chaqirmaslik
#### Xato:
SQL so'rov xato berdi, lekin dastur tranzaksiyani rollback qilmasdan keyingi so'rovlarni yuborishda davom etyapti.
#### To'g'ri usul:
Bitta xato bo'ldimi, darhol tranzaksiyani rollback qiling.
#### Izoh:
Xato holatda ochiq qolgan tranzaksiya ziddiyatlarga sabab bo'ladi.

### 9. Tranzaksiya ichida \`SELECT COUNT(*)\` qilish
#### Xato:
Tranzaksiya boshida jadvaldagi qatorlar sonini hisoblash.
#### Nima uchun noto'g'ri:
Bu jadvalni to'liq qulflab qo'yishi mumkin (ayniqsa yuqori izolyatsiyada).
#### To'g'ri usul:
Hisob-kitoblarni tranzaksiyadan tashqarida bajaring.
#### Izoh:
Tranzaksiya ichida faqat zaruriy qatorlar bilan ishlang.

### 10. \`Implicit\` (yashirin) tranzaksiyalarni nazorat qilmaslik
#### Xato:
Har bir INSERT so'rovi alohida avtomatik tranzaksiya yaratishini bilmaslik.
#### To'g'ri usul:
Agar 10 ta INSERT ketma-ket yozilishi kerak bo'lsa, ularni bitta \`BEGIN-COMMIT\` blokiga oling. Bu tezlikni 10 barobar oshiradi.
#### Izoh:
Bitta tranzaksiyaga birlashtirish disk yozish tezligini tejaydi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Tranzaksiya nima va u qaysi kalit so'zlar bilan boshqariladi?
   * **Javob:** Tranzaksiya — bir nechta SQL amallarining yagona bo'linmas blok sifatida bajarilishi. U \`BEGIN\`, \`COMMIT\` va \`ROLLBACK\` yordamida boshqariladi.
   * **Intervyuda qanday javob berish kerak:** *"Tranzaksiya all-or-nothing qoidasi asosida ishlaydi. Agar blok ichidagi bitta so'rov xato bersa, ROLLBACK qilinadi."*

2. **Savol:** ACID nima?
   * **Javob:** Tranzaksiyalar ishonchliligini ta'minlovchi 4 ta prinsip: Atomicity, Consistency, Isolation, Durability.
   * **Intervyuda qanday javob berish kerak:** *"Bu reliesion bazalarning ma'lumotlar yaxlitligini ta'minlovchi standart qoidalaridir."*

3. **Savol:** \`COMMIT\` va \`ROLLBACK\` farqi nima?
   * **Javob:** \`COMMIT\` o'zgarishlarni saqlaydi, \`ROLLBACK\` esa bekor qiladi.
   * **Intervyuda qanday javob berish kerak:** *"Muvaffaqiyatli yakunda COMMIT, xatolik yuz berganda esa ROLLBACK ishlatiladi."*

4. **Savol:** Tranzaksiyadagi 'Atomicity' (Bo'linmaslik) nimani anglatadi?
   * **Javob:** Tranzaksiyadagi barcha amallar yo to'liq bajariladi yoki birortasi ham bajarilmagan deb hisoblanadi.
   * **Intervyuda qanday javob berish kerak:** *"Pul o'tkazish misolida, agar pul yechilsa-yu, lekin ikkinchi tomonga tushmasa, atomicity talabiga ko'ra butun amal bekor qilinadi."*

### Middle (5–8)
5. **Savol:** Tranzaksiyalardagi Race Condition nima va uni qanday hal qilish mumkin?
   * **Javob:** Ikki parallel tranzaksiya bir vaqtda bitta qatorni o'zgartirishga harakat qilishi.
   * **Intervyuda qanday javob berish kerak:** *"Poyga holatini hal qilish uchun SELECT ... FOR UPDATE so'rovi yordamida qatorni bloklab qo'yamiz (Pessimistic Locking)."*

6. **Savol:** Tranzaksiyalarning 4 ta izolyatsiya darajasi (Isolation Levels) qaysilar?
   * **Javob:**
     1. Read Uncommitted
     2. Read Committed (PostgreSQL default)
     3. Repeatable Read
     4. Serializable
   * **Intervyuda qanday javob berish kerak:** *"Daraja oshgani sari ma'lumotlar xavfsizligi oshadi, lekin parallel ishlash tezligi pasayadi."*

7. **Savol:** Dirty Read (Nopok o'qish) nima va u qaysi izolyatsiya darajasida sodir bo'lishi mumkin?
   * **Javob:** Bir tranzaksiya hali \`COMMIT\` bo'lmagan ikkinchi tranzaksiyadagi o'zgarishlarni o'qiy olishi.
   * **Intervyuda qanday javob berish kerak:** *"Bu faqat Read Uncommitted darajasida sodir bo'ladi. Read Committed va undan yuqorida buning oldi olingan."*

8. **Savol:** \`Savepoint\` nima va u qachon ishlatiladi?
   * **Javob:** Tranzaksiya ichida oraqaga qaytish nuqtasi.
   * **Intervyuda qanday javob berish kerak:** *"Agar katta tranzaksiya ichida qisman xatolik yuz bersa, butun tranzaksiyani emas, faqat o'sha xato qismini SAVEPOINT nuqtasigacha ROLLBACK qilish mumkin."*

### Senior (9–12)
9. **Savol:** Optimistic Locking va Pessimistic Locking farqi nimada va qachon qaysi birini tanlash kerak?
   * **Javob:** Pessimistic Locking bazada \`FOR UPDATE\` orqali qatorni bloklaydi. Optimistic Locking esa bloklamaydi, balki yozish paytida versiya ustunini (\`version INT\`) tekshiradi.
   * **Intervyuda qanday javob berish kerak:** *"To'qnashuvlar (collisions) juda ko'p bo'ladigan joyda Pessimistic, to'qnashuv kam bo'lgan va parallel o'qish tez bo'lishi kerak bo'lgan joyda (masalan, maqolani tahrirlashda) Optimistic locking ishlatiladi."*

10. **Savol:** Phantom Read (Arvoh o'qish) muammosi nima va u qanday hal qilinadi?
    * **Javob:** Tranzaksiya davomida bir xil SELECT so'rovi ikki marta chaqirilganda, ikkinchi safar yangi qo'shilgan qatorlar (phantom rows) paydo bo'lib qolishi.
    * **Intervyuda qanday javob berish kerak:** *"Bu muammo Repeatable Read yoki Serializable izolyatsiya darajasida hal qilinadi. Baza so'ralgan diapazonni qulflaydi."*

11. **Savol:** Deadlock-ni avtomatik aniqlash (Deadlock Detection) qanday ishlaydi va tizim bunga qanday javob beradi?
    * **Javob:** RDBMS orqa fonda qulflashlar grafigini (Wait-For Graph) tekshiradi. Agar grafikda yopiq sikl (cycle) aniqlansa, tranzaksiyalardan birini qurbon qiladi (Abort/Rollback).
    * **Intervyuda qanday javob berish kerak:** *"Baza deadlock bo'lganda avtomatik bitta tranzaksiyani bekor qiladi va backend-ga xatolik yuboradi. Backend dastur bunday holatda retry (qayta urinish) qilishi kerak."*

12. **Savol:** 2PC (Two-Phase Commit) nima va u mikroservislar arxitekturasida taqsimlangan tranzaksiyalarni (Distributed Transactions) boshqarishda qanday muammolarni hal qiladi?
    * **Javob:** Ikki bosqichli commit protokoli bo'lib, bir nechta alohida ma'lumotlar bazasida tranzaksiyalar yaxlitligini ta'minlaydi (Prepare va Commit bosqichlari).
    * **Intervyuda qanday javob berish kerak:** *"2PC distributed tizimlarda barcha bazalar bir vaqtda roziligini bergandagina commit qilishni kafolatlaydi. Ammo u tarmoq sekinligida blokirovkalarga olib kelishi mumkin, shuning uchun ko'pincha Saga Pattern ishlatiladi."*

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv kod runner yordamida tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar.

---

## 8. 🎯 Real Project Case Study

### Bank hisob raqamlari o'rtasida pul o'tkazish tizimi (Billing)
Siz yirik to'lov tizimi (masalan, **Click** yoki **Payme**) uchun backend billing arxitekturasini quryapsiz.

#### Muammo:
Foydalanuvchi do'stiga 1,000,000 so'm yubordi. Tizimda ikkala foydalanuvchi hamyonini yangilash va tranzaksiyalar logini yozish kerak. Agar amallar bo'linib qolsa, bank katta zarar ko'radi.

#### Yechim:
\`\`\`sql
BEGIN;

-- 1. Jo'natuvchini aniqlash va balansini tekshirib qulflash
SELECT balance FROM user_wallets WHERE user_id = 101 FOR UPDATE;

-- 2. Balansni tekshirish (agar yetarli bo'lmasa, backend darhol ROLLBACK qiladi)
-- 3. Jo'natuvchidan pul yechish
UPDATE user_wallets SET balance = balance - 1000000.00 WHERE user_id = 101;

-- 4. Qabul qiluvchiga pul qo'shish
UPDATE user_wallets SET balance = balance + 1000000.00 WHERE user_id = 102;

-- 5. Kassa jurnaliga yozish
INSERT INTO transaction_logs (from_user, to_user, amount, status) 
VALUES (101, 102, 1000000.00, 'success');

COMMIT;
\`\`\`
Relyatsion bog'lanish va ACID tranzaksiyasi ushbu pul o'tkazmasini 100% xavfsiz va toza bajarilishini kafolatlaydi.

---

## 9. 🚀 Performance va Optimization

* **Lock Escalation (Qulflashning kengayishi):** Agar tranzaksiya juda ko'p qatorlarni qulflasa, baza xotirani tejash uchun Row Lock-dan Table Lock-ga (butun jadvalni qulflash) o'tib ketishi mumkin.
* **Optimallashtirish:** Tranzaksiya ichidagi SQL so'rovlar sonini minimal saqlang. Indekslanmagan ustunlarni \`FOR UPDATE\` bilan qidirmang (chunki bu butun jadvalni qulflaydi).

---

## 10. 📌 Cheat Sheet

| Buyruq | Sintaksis | Vazifasi | Eslatma |
| :--- | :--- | :--- | :--- |
| **BEGIN** | \`BEGIN;\` | Tranzaksiyani boshlash | Sessiyani ochadi |
| **COMMIT** | \`COMMIT;\` | O'zgarishlarni saqlash | Barcha sessiyalar uchun ma'lumotni ochiqlaydi |
| **ROLLBACK** | \`ROLLBACK;\` | O'zgarishlarni bekor qilish | Bazani avvalgi barqaror holatga qaytaradi |
| **FOR UPDATE** | \`SELECT ... FOR UPDATE\` | Qatorni qulflash | Race condition-ni oldini oladi |
| **SAVEPOINT** | \`SAVEPOINT point_name;\` | Qisman qaytish nuqtasi | Tranzaksiya ichida ishlaydi |
| **ROLLBACK TO**| \`ROLLBACK TO point_name;\`| Nuqtaga qaytish | Keyingi amallarni bekor qiladi |
`,
  exercises: [
    {
      "id": 1,
      "title": "Tranzaksiyani boshlash va saqlash (COMMIT)",
      "instruction": "Tranzaksiyani boshlang (`BEGIN;` yoki `BEGIN TRANSACTION;`), `users` jadvalidan ID-si 1 bo'lgan foydalanuvchining shahrini (`city`) 'Buxoro' qilib o'zgartiring va tranzaksiyani yakunlang (`COMMIT;`).",
      "startingCode": "-- Tranzaksiyani yozing\n",
      "hint": "BEGIN; UPDATE users SET city = 'Buxoro' WHERE id = 1; COMMIT;",
      "test": "const user = db.exec(\"SELECT city FROM users WHERE id = 1\")[0]; if (!user || user.city !== 'Buxoro') return 'Foydalanuvchi shahri Buxoroga o\\'zgartirilmadi va saqlanmadi.'; return null;"
    },
    {
      "id": 2,
      "title": "Tranzaksiyani bekor qilish (ROLLBACK)",
      "instruction": "Tranzaksiyani boshlang, `users` jadvalidan ID-si 3 bo'lgan foydalanuvchini o'chiring (`DELETE`), so'ngra ushbu o'chirish amalini bekor qiling (`ROLLBACK;`).",
      "startingCode": "-- Tranzaksiyani yozing\n",
      "hint": "BEGIN; DELETE FROM users WHERE id = 3; ROLLBACK;",
      "test": "const user = db.exec(\"SELECT * FROM users WHERE id = 3\")[0]; if (!user) return 'Foydalanuvchi butunlay o\\'chib ketdi, tranzaksiya bekor qilinmagan.'; return null;"
    },
    {
      "id": 3,
      "title": "Bir nechta yangilash amallarini birgalikda saqlash",
      "instruction": "Tranzaksiyani boshlang. ID-si 1 bo'lgan foydalanuvchining yoshini (`age`) 25 ga, ID-si 2 bo'lgan foydalanuvchining yoshini (`age`) 30 ga yangilang va o'zgarishlarni saqlang (`COMMIT;`).",
      "startingCode": "-- Tranzaksiyani yozing\n",
      "hint": "BEGIN; UPDATE users SET age = 25 WHERE id = 1; UPDATE users SET age = 30 WHERE id = 2; COMMIT;",
      "test": "const u1 = db.exec(\"SELECT age FROM users WHERE id = 1\")[0]; const u2 = db.exec(\"SELECT age FROM users WHERE id = 2\")[0]; if (!u1 || u1.age !== 25 || !u2 || u2.age !== 30) return 'Yoshlar to\\'g\\'ri o\\'zgartirilmadi yoki saqlanmadi.'; return null;"
    },
    {
      "id": 4,
      "title": "Savepoint yaratish va qisman bekor qilish",
      "instruction": "Tranzaksiyani boshlang. ID-si 1 bo'lgan foydalanuvchining rolini (`role`) 'Admin' qilib o'zgartiring. Keyin `sp1` nomli saqlash nuqtasini (`SAVEPOINT sp1;`) yarating. Keyin ID-si 2 bo'lgan foydalanuvchining rolini 'User' qilib o'zgartiring. Keyin esa faqat ikkinchi o'zgarishni bekor qilish uchun `sp1` nuqtasiga qayting (`ROLLBACK TO sp1;`). Oxirida tranzaksiyani yakunlang (`COMMIT;`).",
      "startingCode": "-- Tranzaksiyani yozing\n",
      "hint": "BEGIN; UPDATE users SET role = 'Admin' WHERE id = 1; SAVEPOINT sp1; UPDATE users SET role = 'User' WHERE id = 2; ROLLBACK TO sp1; COMMIT;",
      "test": "const u1 = db.exec(\"SELECT role FROM users WHERE id = 1\")[0]; const u2 = db.exec(\"SELECT role FROM users WHERE id = 2\")[0]; if (!u1 || u1.role !== 'Admin') return 'Birinchi foydalanuvchi roli Admin bo\\'lmadi.'; if (!u2 || u2.role === 'User') return 'Ikkinchi foydalanuvchi roli bekor qilinmadi.'; return null;"
    },
    {
      "id": 5,
      "title": "Tranzaksiya ichida yangi qator qo'shish va bekor qilish",
      "instruction": "Tranzaksiyani boshlang. `users` jadvaliga yangi foydalanuvchini qo'shing (id: 10, name: 'Sardor', age: 31, city: 'Qarshi', role: 'User'). So'ngra ushbu qo'shish amalini bekor qiling (`ROLLBACK;`).",
      "startingCode": "-- Tranzaksiyani yozing\n",
      "hint": "BEGIN; INSERT INTO users (id, name, age, city, role) VALUES (10, 'Sardor', 31, 'Qarshi', 'User'); ROLLBACK;",
      "test": "const user = db.exec(\"SELECT * FROM users WHERE id = 10\")[0]; if (user) return 'Foydalanuvchi bazaga qo\\'shilib qoldi, tranzaksiya bekor qilinmagan.'; return null;"
    },
    {
      "id": 6,
      "title": "Bir nechta SAVEPOINT bilan ishlash",
      "instruction": "Tranzaksiyani boshlang. `users` jadvaliga yangi foydalanuvchi qo'shing (id: 11, name: 'Malika', age: 22, city: 'Farg\\'ona', role: 'User'). `save_user` nomli saqlash nuqtasini yarating (`SAVEPOINT save_user;`). Keyin ID-si 1 bo'lgan foydalanuvchining shahrini 'Xiva' qilib yangilang. `save_city` nomli ikkinchi saqlash nuqtasini yarating. Keyin ID-si 2 bo'lgan foydalanuvchini o'chiring (`DELETE`). Endi faqat o'chirish amalini bekor qilish uchun `save_city` nuqtasiga qayting (`ROLLBACK TO save_city;`). Oxirida tranzaksiyani yakunlang (`COMMIT;`).",
      "startingCode": "-- Tranzaksiyani yozing\n",
      "hint": "BEGIN; INSERT INTO users VALUES (11, 'Malika', 22, 'Farg\\'ona', 'User'); SAVEPOINT save_user; UPDATE users SET city = 'Xiva' WHERE id = 1; SAVEPOINT save_city; DELETE FROM users WHERE id = 2; ROLLBACK TO save_city; COMMIT;",
      "test": "const u11 = db.exec(\"SELECT * FROM users WHERE id = 11\")[0]; const u1 = db.exec(\"SELECT city FROM users WHERE id = 1\")[0]; const u2 = db.exec(\"SELECT * FROM users WHERE id = 2\")[0]; if (!u11) return 'Malika qo\\'shilmadi.'; if (!u1 || u1.city !== 'Xiva') return 'ID 1 foydalanuvchining shahri Xiva bo\\'lmadi.'; if (!u2) return 'ID 2 o\\'chirilishi bekor qilinmadi.'; return null;"
    },
    {
      "id": 7,
      "title": "Tranzaksiya izolyatsiyasi darajasini belgilash",
      "instruction": "Tranzaksiya izolyatsiyasi darajasini `READ COMMITTED` qilib o'rnating (`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`), tranzaksiyani boshlang, ID-si 3 bo'lgan foydalanuvchining yoshini 35 ga yangilang va tranzaksiyani saqlang (`COMMIT;`).",
      "startingCode": "-- Izolyatsiya darajasini o'rnating va tranzaksiyani bajaring\n",
      "hint": "SET TRANSACTION ISOLATION LEVEL READ COMMITTED; BEGIN; UPDATE users SET age = 35 WHERE id = 3; COMMIT;",
      "test": "const u3 = db.exec(\"SELECT age FROM users WHERE id = 3\")[0]; if (!u3 || u3.age !== 35) return 'Tranzaksiya muvaffaqiyatli saqlanmadi yoki yosh o\\'zgartirilmadi.'; return null;"
    },
    {
      "id": 8,
      "title": "Serializable izolyatsiya darajasida tranzaksiya",
      "instruction": "Tranzaksiya izolyatsiyasi darajasini `SERIALIZABLE` qilib belgilang, tranzaksiyani boshlang, ID-si 4 bo'lgan foydalanuvchini o'chiring va tranzaksiyani yakunlang (`COMMIT;`).",
      "startingCode": "-- Izolyatsiya darajasini belgilab tranzaksiyani yozing\n",
      "hint": "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE; BEGIN; DELETE FROM users WHERE id = 4; COMMIT;",
      "test": "const u4 = db.exec(\"SELECT * FROM users WHERE id = 4\")[0]; if (u4) return 'ID-si 4 bo\\'lgan foydalanuvchi o\\'chirilmadi.'; return null;"
    },
    {
      "id": 9,
      "title": "Qatorni o'zgartirish uchun qulflash (FOR UPDATE)",
      "instruction": "Tranzaksiyani boshlang. ID-si 1 bo'lgan foydalanuvchi qatorini boshqalar o'zgartira olmasligi uchun `SELECT ... FOR UPDATE` yordamida qulflang. Keyin uning yoshini (`age`) 40 ga o'zgartiring va tranzaksiyani saqlang (`COMMIT;`).",
      "startingCode": "-- Tranzaksiya va FOR UPDATE ishlatib yozing\n",
      "hint": "BEGIN; SELECT * FROM users WHERE id = 1 FOR UPDATE; UPDATE users SET age = 40 WHERE id = 1; COMMIT;",
      "test": "const u1 = db.exec(\"SELECT age FROM users WHERE id = 1\")[0]; if (!u1 || u1.age !== 40) return 'Yosh o\\'zgartirilmadi yoki saqlanmadi.'; return null;"
    },
    {
      "id": 10,
      "title": "Tranzaksiya ichida shartli bekor qilish va saqlash",
      "instruction": "Tranzaksiyani boshlang. ID-si 5 bo'lgan foydalanuvchining shahrini 'Namangan' qilib o'zgartiring. `sp_namangan` saqlash nuqtasini yarating. Keyin ID-si 5 bo'lgan foydalanuvchining rolini 'SuperAdmin' qilib yangilang. `sp_role` saqlash nuqtasini yarating. Keyin butun `users` jadvalidagi foydalanuvchilarni o'chirib yuboruvchi xavfli so'rovni yozing (`DELETE FROM users;`). Bu xavfli xatoni bartaraf etish uchun darhol `sp_role` nuqtasiga qayting (`ROLLBACK TO sp_role;`). Oxirida tranzaksiyani yakunlang (`COMMIT;`).",
      "startingCode": "-- Tranzaksiyani yozing\n",
      "hint": "BEGIN; UPDATE users SET city = 'Namangan' WHERE id = 5; SAVEPOINT sp_namangan; UPDATE users SET role = 'SuperAdmin' WHERE id = 5; SAVEPOINT sp_role; DELETE FROM users; ROLLBACK TO sp_role; COMMIT;",
      "test": "const count = db.exec(\"SELECT COUNT(*) as cnt FROM users\")[0].cnt; if (count === 0) return 'Hamma foydalanuvchilar o\\'chirib yuborildi!'; const u5 = db.exec(\"SELECT city, role FROM users WHERE id = 5\")[0]; if (!u5 || u5.city !== 'Namangan' || u5.role !== 'SuperAdmin') return 'ID 5 o\\'zgarishlari to\\'g\\'ri saqlanmadi.'; return null;"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Tranzaksiyani boshlash uchun qaysi SQL buyrug'i ishlatiladi?",
    "options": ["START", "BEGIN", "OPEN", "INIT"],
    "correctAnswer": 1,
    "explanation": "SQL-da tranzaksiyani boshlash uchun 'BEGIN' yoki 'START TRANSACTION' buyruqlari qo'llaniladi."
  },
  {
    "id": 2,
    "question": "Tranzaksiyadagi barcha amallarni bazaga jismonan saqlab doimiy yozish qaysi operator orqali bajariladi?",
    "options": ["COMMIT", "ROLLBACK", "SAVE", "STORE"],
    "correctAnswer": 0,
    "explanation": "COMMIT buyrug'i tranzaksiya davomida qilingan barcha o'zgarishlarni bazaga doimiy yozadi."
  },
  {
    "id": 3,
    "question": "ACID qoidalaridagi 'D' (Durability) nimani kafolatlaydi?",
    "options": [
      "Tranzaksiyalarning o'ta tez ishlashini",
      "Tranzaksiya muvaffaqiyatli tugagach, server o'chib qolsa ham ma'lumotlar saqlanib qolishini",
      "Jadvallar o'rtasidagi bog'lanishlarni",
      "Foydalanuvchilar parollari shifrlanishini"
    ],
    "correctAnswer": 1,
    "explanation": "Durability (bardoshlilik/bardavomlik) tranzaksiya commit bo'lganidan so'ng, tizim qulashi yoki o'chib qolishi yuz berganda ham ma'lumotlar saqlanishini kafolatlaydi."
  },
  {
    "id": 4,
    "question": "Bir vaqtda ishlayotgan parallel tranzaksiyalar bir-biriga xalaqit bermasligi ACID-ning qaysi bandiga tegishli?",
    "options": ["Atomicity", "Consistency", "Isolation", "Durability"],
    "correctAnswer": 2,
    "explanation": "Isolation (izolyatsiya) parallel tranzaksiyalarning bir-biridan mustaqil bajarilishini ta'minlaydi."
  },
  {
    "id": 5,
    "question": "Faqat ma'lum bir nuqtagacha bo'lgan amallarni orqaga qaytarish uchun tranzaksiyada nima yaratiladi?",
    "options": ["COMMIT POINT", "SAVEPOINT", "CHECKPOINT", "ROLLBACK POINT"],
    "correctAnswer": 1,
    "explanation": "SAVEPOINT yordamida tranzaksiya ichida maxsus nazorat nuqtasi yaratiladi va 'ROLLBACK TO savepoint_name' yordamida faqat o'sha nuqtadan keyingi amallarni bekor qilish mumkin."
  },
  {
    "id": 6,
    "question": "Dirty Read (Nopok o'qish) muammosi nima?",
    "options": [
      "Jadvalda noto'g'ri yozilgan satrlarni o'qish",
      "Bir tranzaksiyaning hali commit qilinmagan ikkinchi tranzaksiya ma'lumotlarini o'qishi",
      "O'chirilgan foydalanuvchilarni o'qish",
      "Baza parollarini ko'rish"
    ],
    "correctAnswer": 1,
    "explanation": "Dirty Read deb hali saqlanmagan (uncommitted) ma'lumotlarni parallel tranzaksiya tomonidan o'qib olinishiga aytiladi."
  },
  {
    "id": 7,
    "question": "Eng yuqori darajadagi va parallelizmni eng ko'p cheklaydigan tranzaksiya izolyatsiyasi qaysi?",
    "options": ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
    "correctAnswer": 3,
    "explanation": "Serializable eng yuqori izolyatsiya darajasi bo'lib, barcha parallel tranzaksiyalarni ketma-ketlikda bajarishga majburlaydi va barcha mantiqiy to'qnashuvlarning oldini oladi."
  },
  {
    "id": 8,
    "question": "SELECT ... FOR UPDATE so'rovi nima vazifani bajaradi?",
    "options": [
      "Ma'lumotlarni tezroq tahrirlaydi",
      "So'ralgan qatorlarni boshqa parallel tranzaksiyalar o'zgartira olmasligi uchun qulflaydi",
      "Barcha jadvallarni o'chirib yuboradi",
      "Tranzaksiyani avtomatik commit qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "FOR UPDATE predikati tanlangan qatorlarni tranzaksiya yakunlangunga qadar yozish/o'zgartirish uchun qulflaydi (Pessimistic Locking)."
  },
  {
    "id": 9,
    "question": "Deadlock (O'lik qulflash) vaziyati nima?",
    "options": [
      "Baza butunlay o'chib qolishi",
      "Ikki parallel tranzaksiya bir-biri qulflagan resurslarni cheksiz kutib qolishi",
      "Ma'lumotlar noto'g'ri o'chirilishi",
      "Parol noto'g'ri terilishi"
    ],
    "correctAnswer": 1,
    "explanation": "Deadlock - parallel tranzaksiyalar bir-birlari tomonidan qulflangan resurslarni o'zaro kutib, cheksiz blokirovka holatiga tushib qolishidir."
  },
  {
    "id": 10,
    "question": "PostgreSQL bazasida sukut bo'yicha (default) qaysi izolyatsiya darajasi o'rnatilgan bo'ladi?",
    "options": ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
    "correctAnswer": 1,
    "explanation": "PostgreSQL va ko'plab zamonaviy reliesion bazalarda sukut bo'yicha Read Committed darajasi o'rnatilgan bo'lib, u Dirty Read-ni oldini oladi."
  },
  {
    "id": 11,
    "question": "Optimistic Locking amalda qanday bajariladi?",
    "options": [
      "FOR UPDATE yordamida",
      "Jadvalga versiya ustunini (version INT) qo'shib, yozish paytida uni tekshirish orqali",
      "Jadvalni to'liq qulflash orqali",
      "Avtomatik tarzda baza tomonidan"
    ],
    "correctAnswer": 1,
    "explanation": "Optimistic locking bazada qulflashlarsiz ishlaydi va parallel yozish paytida versiya raqami o'zgarmaganligini tekshiradi."
  },
  {
    "id": 12,
    "question": "Tranzaksiya ichida uzoq vaqt oladigan API so'rovlarni (masalan SMS jo'natish) yozish qanday muammoga olib keladi?",
    "options": [
      "SMS noto'g'ri ketadi",
      "Connection-lar band bo'lib, qulflangan qatorlar sababli baza sekinlashadi va qotadi",
      "Hech qanday muammo bo'lmaydi",
      "Sintaktik xatolik bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "API so'rovi bajarilayotgan paytda baza qatorlari qulflangan holatda turadi va connection pullarini to'ldirib, bazada tiqilinch (bottleneck) hosil qiladi."
  }
]

};
