export const sqlSubqueries = {
  id: "sqlSubqueries",
  title: "SQL Subqueries (Ichki So'rovlar)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish

### Subquery (Ichma-ich so'rov) nima?
Ba'zida SQL-da biror natijani olish uchun kerak bo'ladigan shart boshqa bir so'rovning natijasiga bog'liq bo'ladi. Masalan, "O'rtacha buyurtma miqdoridan qimmatroq bo'lgan barcha buyurtmalarni topish" kerak. Buning uchun avval o'rtacha buyurtma miqdorini aniqlash, so'ngra shu qiymatdan katta buyurtmalarni filtrlash lozim. SQL-da buni bitta so'rov ichida ikkinchi so'rovni joylashtirish — **Subquery** (Ichma-ich so'rov) yordamida yechish mumkin.

### Real hayotiy o'xshatish
Buni **matematik ifodadagi qavslarga** o'xshatish mumkin:
Masalan, $x = 5 \\times (3 + 4)$ ifodasida avval qavs ichidagi $(3 + 4) = 7$ hisoblanadi, so'ngra tashqi ko'paytirish bajariladi.
SQL-da ham xuddi shunday: avval ichki so'rov (qavs ichidagi) ishlaydi va uning natijasi tashqi so'rovga shart sifatida uzatiladi.

---

## 2. 💻 Real SQL Kod Misollari

Ushbu bo'limda subquery'lardan foydalanish bo'yicha turli darajadagi real misollarni ko'rib chiqamiz.

### 1. Basic Example (Skalyar Subquery)
O'rtacha buyurtma miqdoridan qimmat bo'lgan barcha buyurtmalarni olish:
\`\`\`sql
SELECT * FROM orders 
WHERE amount > (SELECT AVG(amount) FROM orders);
\`\`\`
* **Natija:** O'rtacha summadan yuqori bo'lgan buyurtmalar ro'yxati.
* **Qachon ishlatiladi:** Biznesda o'rtacha ko'rsatkichlardan yuqori yoki past natijalarni filtrlashda.
* **Performance jihati:** Ichki so'rov faqat bir marta ishlaydi va bitta skalyar qiymat qaytaradi, shuning uchun bu so'rov nisbatan tez ishlaydi.

### 2. Intermediate Example (Ko'p qatorli Subquery - IN operatori bilan)
Toshkentda yashaydigan foydalanuvchilarning barcha buyurtmalarini topish:
\`\`\`sql
SELECT * FROM orders 
WHERE user_id IN (SELECT id FROM users WHERE city = 'Toshkent');
\`\`\`
* **Natija:** Toshkentlik foydalanuvchilarga tegishli buyurtmalar qaytadi.
* **Qachon ishlatiladi:** Bir jadvaldagi ma'lumotlarni boshqa jadvalning filtr sharti asosida tanlashda.
* **Performance jihati:** \`IN\` ichidagi subquery qiymatlari soni juda katta bo'lsa, so'rov sekinlashishi mumkin. Bunday holatda \`JOIN\` yoki \`EXISTS\` samaraliroq bo'ladi.

### 3. Advanced Example (Correlated Subquery)
Har bir foydalanuvchining o'z shahriga tegishli foydalanuvchilar o'rtacha yoshidan kattaroq bo'lgan foydalanuvchilarni topish:
\`\`\`sql
SELECT u1.name, u1.city, u1.age 
FROM users u1
WHERE u1.age > (
    SELECT AVG(u2.age) 
    FROM users u2 
    WHERE u2.city = u1.city
);
\`\`\`
* **Natija:** Har bir shahar kesimida o'sha shaharning o'rtacha yoshidan kattaroq bo'lgan odamlar ro'yxati.
* **Qachon ishlatiladi:** Guruhlar bo'yicha dinamik solishtirishlar amalga oshirilganda.
* **Performance jihati:** Bu **Correlated Subquery** (tashqi so'rovga bog'liq so'rov) bo'lib, tashqi so'rovning har bir qatori uchun ichki so'rov qayta ishlaydi. Katta jadvallarda bu juda sekin ishlaydi.

### 4. Production Example (EXISTS operatoridan foydalanish)
Kamida bitta buyurtma bergan foydalanuvchilar ro'yxatini olish (katta hajmli ma'lumotlar uchun):
\`\`\`sql
SELECT name FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id
);
\`\`\`
* **Natija:** Buyurtmalari bor bo'lgan foydalanuvchilar nomi.
* **Qachon ishlatiladi:** Mavjudlikni tez tekshirish uchun.
* **Performance jihati:** \`EXISTS\` subquery birinchi moslikni topishi bilan tekshirishni to'xtatadi. Bu \`IN\` operatoriga qaraganda tezroq ishlaydi, ayniqsa bog'langan jadval katta bo'lsa.

### 5. Enterprise Example (SELECT va FROM qismida subquery ishlash)
Har bir foydalanuvchining ismi bilan birga uning buyurtmalarining umumiy summasini derived table orqali olish:
\`\`\`sql
SELECT u.name, o_summary.total_spent
FROM users u
INNER JOIN (
    SELECT user_id, SUM(amount) AS total_spent 
    FROM orders 
    GROUP BY user_id
) o_summary ON u.id = o_summary.user_id;
\`\`\`
* **Natija:** Foydalanuvchilar va ularning umumiy xarajatlari.
* **Qachon ishlatiladi:** Murakkab agregatsiya qilingan ma'lumotlarni jadvallar bilan birlashtirishda.
* **Performance jihati:** Derived table (FROM qismidagi subquery) avval xotirada virtual jadval ko'rinishida hosil qilinadi, so'ngra asosiy jadvalga join qilinadi. Indekslar yo'qligi sababli juda katta hajmlarda optimallashtirish talab etiladi.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Subquery'lar bizga dinamik va bir necha bosqichli hisob-kitoblarni amalga oshirish imkonini beradi. Agar subquery'lar bo'lmaganida, backend dasturchisi avval birinchi so'rovni bajarib natijani olishi, uni dastur xotirasida (RAM) saqlab, so'ngra ikkinchi so'rovni generatsiya qilishi kerak bo'lardi. Bu tarmoq trafigini va xotira sarfini oshiradi.

### Real Loyihalarda Qo'llanilishi:
* **E-commerce:** Foydalanuvchining oxirgi sotib olgan mahsulot toifasiga mos boshqa mahsulotlarni tavsiya qilishda.
* **Banking:** Foydalanuvchining o'tgan oydagi o'rtacha xarajatidan 2 barobar ko'p bo'lgan shubhali tranzaksiyalarni aniqlash tizimlarida.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Tenglik (=) operatori bilan ko'p qatorli subquery ishlatish
#### Xato:
\`\`\`sql
-- XATO! Agar Toshkentlik foydalanuvchilar birdan ortiq bo'lsa, xato beradi
SELECT * FROM orders 
WHERE user_id = (SELECT id FROM users WHERE city = 'Toshkent');
\`\`\`
#### Nima uchun noto'g'ri:
Tenglik (\`=\`) operatori faqat bitta skalyar qiymat bilan ishlaydi. Subquery ko'p qator qaytarsa, baza \`Subquery returned more than 1 row\` xatosini beradi.
#### To'g'ri usul:
\`\`\`sql
SELECT * FROM orders 
WHERE user_id IN (SELECT id FROM users WHERE city = 'Toshkent');
\`\`\`

### 2. Bog'liq (Correlated) subquery'dan nojoiz foydalanish
#### Xato:
\`\`\`sql
-- Har bir buyurtma uchun foydalanuvchining shahrini tekshirish (sekindir)
SELECT o.id, o.product 
FROM orders o 
WHERE 'Toshkent' = (SELECT city FROM users u WHERE u.id = o.user_id);
\`\`\`
#### Nima uchun noto'g'ri:
Har bir buyurtma qatori uchun ichki so'rov qayta ishlaydi. 1 millionta buyurtma bo'lsa, ichki so'rov 1 million marta bajariladi.
#### To'g'ri usul:
\`\`\`sql
SELECT o.id, o.product 
FROM orders o 
INNER JOIN users u ON o.user_id = u.id 
WHERE u.city = 'Toshkent';
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Subquery nima?
   * **Javob:** Subquery — bu boshqa bir SQL so'rovi (SELECT, INSERT, UPDATE, DELETE) ichiga yozilgan SELECT so'rovidir.
2. **Savol:** Subquery qanday belgilar ichida yozilishi shart?
   * **Javob:** Subquery har doim dumaloq qavslar \`(...)\` ichida yozilishi kerak.
3. **Savol:** Skalyar va ko'p qatorli subquery farqi nima?
   * **Javob:** Skalyar subquery faqat 1 ta qiymat (1 ta ustun, 1 ta qator) qaytaradi, ko'p qatorli esa ro'yxat qaytaradi va \`IN\`, \`ANY\`, \`ALL\` operatorlari bilan ishlatiladi.
4. **Savol:** Subquery'ni SELECT ustunlari orasida runsat etiladimi?
   * **Javob:** Ha, har bir qator uchun qo'shimcha skalyar qiymat chiqarish uchun ishlatiladi.

### Middle (5–8)
5. **Savol:** \`IN\` va \`EXISTS\` operatorlarining farqi nimada?
   * **Javob:** \`IN\` ichki so'rov natijalarini to'liq xotiraga yuklab oladi. \`EXISTS\` esa moslik topilishi bilan to'xtaydi, xotira sarfini tejaydi.
6. **Savol:** Correlated Subquery nima va u nega sekin ishlaydi?
   * **Javob:** Correlated Subquery tashqi so'rovning ustunlariga tayanadi, shuning uchun tashqi jadvalning har bir qatori uchun ichki so'rov qayta ishga tushadi.
7. **Savol:** Subquery va JOIN farqi nimada?
   * **Javob:** JOIN jadvallarni bog'lab ikkala tomondan ustunlarni tanlashga ruxsat beradi. Subquery esa odatda faqat filtrlash uchun shart vazifasini bajaradi.
8. **Savol:** Subquery natijasi bo'sh to'plam (no rows) bo'lsa, \`IN\` va \`NOT IN\` qanday ishlaydi?
   * **Javob:** \`IN\` operatori hech qanday moslik topa olmaydi va natija bo'sh bo'ladi.

### Senior (9–12)
9. **Savol:** Derived table nima va uning talabi qanday?
   * **Javob:** Derived table — bu FROM qismida yozilgan subquery. Unga albatta \`AS alias_name\` orqali nom berish shart.
10. **Savol:** \`NOT IN\` ichida NULL qiymat bo'lsa nima sodir bo'ladi?
    * **Javob:** Agar subquery natijasida bitta bo'lsa ham \`NULL\` qaytsa, \`NOT IN\` har doim bo'sh natija beradi. Shuning uchun subquery-da \`WHERE ustun IS NOT NULL\` shartini yozish kerak.
11. **Savol:** CTE (Common Table Expression) va Subquery farqi nima?
    * **Javob:** CTE \`WITH\` kalit so'zi yordamida tepada yoziladi va o'qishga osonroq, shuningdek rekurziv ishlashi mumkin. Subquery esa so'rov ichida yoziladi.
12. **Savol:** Optimizator subquery'ni qanday qayta ishlaydi?
    * **Javob:** Zamonaviy RDBMS optimizatorlari ko'plab oddiy subquery'larni avtomatik ravishda JOIN ko'rinishiga o'tkazadi (\`Query Rewrite\`).

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlarni quyidagi mashqlar bo'limida bajarishingiz mumkin.

---

## 7. 📝 12 ta Mini Test

Dars oxirida o'rganilgan material bo'yicha interaktiv testlardan o'ting.

---

## 8. 🎯 Real Project Case Study

### Shubhali Tranzaksiyalarni Aniqlash Tizimi
Moliyaviy ilovada har bir tranzaksiya amalga oshirilganda, uning summasi foydalanuvchining oxirgi 10 ta tranzaksiyasining o'rtacha qiymatidan 3 barobardan ortiq bo'lsa, ushbu tranzaksiyani bloklash yoki tekshiruvga yuborish kerak.

Subquery yordamida ushbu shubhali tranzaksiyani aniqlash so'rovi:
\`\`\`sql
SELECT t.id, t.user_id, t.amount 
FROM transactions t
WHERE t.amount > 3 * (
    SELECT AVG(sub.amount) 
    FROM (
        SELECT amount 
        FROM transactions 
        WHERE user_id = t.user_id 
        ORDER BY transaction_date DESC 
        LIMIT 10
    ) sub
);
\`\`\`
Ushbu so'rov dynamic subquery orqali har bir foydalanuvchining shaxsiy limiti bo'yicha hisob-kitob qilish imkonini beradi.

---

## 9. 🚀 Performance va Optimization

Subquery'larni optimallashtirish qoidalari:
1. **JOIN-ga o'tkazish:** Iloji boricha correlated subquery'larni \`INNER JOIN\` yoki \`LEFT JOIN\` ga o'zgartiring.
2. **EXISTS afzalligi:** \`IN\` operatori o'rniga, agar bog'langan ustunda indeks bo'lsa, \`EXISTS\` ishlating.
3. **Derived jadvallarni minimallashtirish:** FROM ichida katta subquery'lar yaratishdan qoching, chunki ular uchun indekslar ishlamaydi.

---

## 10. 📌 Cheat Sheet

| Turi | Misol | Qachon ishlatiladi | Performance |
| :--- | :--- | :--- | :--- |
| **Scalar Subquery** | \`SELECT * FROM p WHERE price > (SELECT AVG(price) FROM p)\` | Bitta qiymat bilan solishtirishda | Yuqori |
| **Multi-row Subquery** | \`SELECT * FROM o WHERE user_id IN (SELECT id FROM u)\` | Bir nechta ID-lar bo'yicha filtrlashda | O'rtacha |
| **Correlated Subquery** | \`SELECT * FROM u WHERE age > (SELECT AVG(age) FROM users WHERE city = u.city)\` | Tashqi jadvalga bog'liq dinamik solishtirishda | Past |
| **EXISTS Subquery** | \`SELECT * FROM u WHERE EXISTS (SELECT 1 FROM o WHERE o.user_id = u.id)\` | Mavjudlikni tezkor tekshirishda | Yuqori |
`,
  exercises: [
    {
      id: 1,
      title: "O'rtacha narxdan qimmat mahsulotlar",
      instruction: "`products` jadvalidan narxi o'rtacha narxdan (`AVG(price)`) katta bo'lgan barcha mahsulotlarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'O\\'rtacha narxdan (466) katta jami 2 ta mahsulot bor'; if(result.some(p => p.price <= 466)) return 'Faqat o\\'rtachadan qimmat mahsulotlar qaytishi kerak'; return null;"
    },
    {
      id: 2,
      title: "Adminlarning buyurtmalari",
      instruction: "`orders` jadvalidan roli `Admin` bo'lgan foydalanuvchilarning barcha buyurtmalarini subquery (`IN` operatori) orqali tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE role = 'Admin')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Admin foydalanuvchiga tegishli 2 ta buyurtma bor'; if(result.some(o => o.user_id !== 1)) return 'Faqat Admin buyurtmalari chiqishi kerak'; return null;"
    },
    {
      id: 3,
      title: "Minimal qoldiqdan ko'p mahsulotlar",
      instruction: "`products` jadvalidan `stock` (ombor qoldig'i) eng minimal qoldiqdan (`MIN(stock)`) ko'p bo'lgan barcha mahsulotlarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE stock > (SELECT MIN(stock) FROM products)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Minimal qoldiq 5 ga teng, undan katta 4 ta mahsulot bor'; return null;"
    },
    {
      id: 4,
      title: "Buyurtma bermagan foydalanuvchilar",
      instruction: "`users` jadvalidan umuman buyurtma bermagan (ya'ni `orders` jadvalidagi `user_id`lar ro'yxatida yo'q) barcha foydalanuvchilarni `NOT IN` yordamida aniqlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM orders)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Buyurtma bermagan faqat 1 ta foydalanuvchi bor (Dilshod)'; if(result[0].name !== 'Dilshod') return 'Noto\\'g\\'ri foydalanuvchi qaytarildi'; return null;"
    },
    {
      id: 5,
      title: "O'rtacha xarajatdan qimmat buyurtmalar",
      instruction: "`orders` jadvalidan har bir foydalanuvchining o'zining o'rtacha buyurtma summasidan (`AVG(amount)`) katta bo'lgan buyurtmalarini correlated subquery orqali tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders o1 WHERE o1.amount > (SELECT AVG(o2.amount) FROM orders o2 WHERE o2.user_id = o1.user_id)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Jami 2 ta buyurtma foydalanuvchining o\\'z o\\'rtacha xarajatidan ko\\'p'; if(!result.some(o => o.id === 101) || !result.some(o => o.id === 102)) return 'Noto\\'g\\'ri buyurtmalar qaytarildi'; return null;"
    },
    {
      id: 6,
      title: "Katta buyurtma bergan foydalanuvchilar",
      instruction: "`users` jadvalidan 500 dan qimmatroq bo'lgan kamida bitta buyurtma bergan foydalanuvchilarni `EXISTS` operatori yordamida tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.amount > 500)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return '500 dan katta buyurtma bergan 2 ta foydalanuvchi bor (Ali va Vali)'; if(!result.some(u => u.name === 'Ali') || !result.some(u => u.name === 'Vali')) return 'Faqat Ali va Vali bo\\'lishi kerak'; return null;"
    },
    {
      id: 7,
      title: "Shahardagi eng yosh foydalanuvchilar",
      instruction: "`users` jadvalidan har bir shahar bo'yicha eng yoshi kichik (minimal `age`) bo'lgan foydalanuvchilarni correlated subquery yordamida aniqlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users u1 WHERE u1.age = (SELECT MIN(u2.age) FROM users u2 WHERE u2.city = u1.city)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Har bir shahar uchun bittadan jami 3 ta foydalanuvchi bo\\'lishi kerak'; if(!result.some(u => u.name === 'Sardor' && u.city === 'Toshkent')) return 'Toshkentdagi eng yoshi kichik - Sardor bo\\'lishi kerak'; return null;"
    },
    {
      id: 8,
      title: "Dinamik buyurtmalar soni",
      instruction: "`users` jadvalidan foydalanuvchining `id`si, `name`i va u bergan buyurtmalar sonini (`order_count` deb nomlab) SELECT ustunlari qismidagi subquery orqali hisoblab chiqaring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT id, name, (SELECT COUNT(*) FROM orders WHERE user_id = users.id) AS order_count FROM users",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Jami 5 ta foydalanuvchi chiqishi kerak'; const ali = result.find(r => r.name === 'Ali'); if(!ali || ali.order_count !== 2) return 'Alining buyurtmalari soni 2 ga teng bo\\'lishi kerak'; const dil = result.find(r => r.name === 'Dilshod'); if(!dil || dil.order_count !== 0) return 'Dilshodning buyurtmalari soni 0 bo\\'lishi kerak'; return null;"
    },
    {
      id: 9,
      title: "Katta xarajatli foydalanuvchilar (Derived Table)",
      instruction: "`FROM` qismida derived table (subquery) yordamida har bir foydalanuvchining `user_id` va umumiy xarajatini (`total_spent`) hisoblang. Tashqi so'rovda umumiy xarajati 1000 dan katta bo'lgan foydalanuvchilarning `user_id` va `total_spent` qiymatlarini oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT user_id, total_spent FROM (SELECT user_id, SUM(amount) AS total_spent FROM orders GROUP BY user_id) temp WHERE total_spent > 1000",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Umumiy xarajati 1000 dan oshgan faqat 1 ta foydalanuvchi bor'; if(result[0].user_id !== 1 || Number(result[0].total_spent) !== 1225.50) return 'Faqat 1-user (1225.50 xarajat bilan) qaytishi kerak'; return null;"
    },
    {
      id: 10,
      title: "Boshqa toifadagi qimmat mahsulotlar",
      instruction: "`products` jadvalidan `Electronics` (Elektronika) toifasidagi eng arzon mahsulot narxidan qimmat bo'lgan boshqa toifadagi barcha mahsulotlarni subquery orqali tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE category != 'Electronics' AND price > (SELECT MIN(price) FROM products WHERE category = 'Electronics')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Elektronika toifasidagi eng arzon narx 25 (Mouse) ga teng. Boshqa toifalarda undan qimmat 2 ta mahsulot bor (Desk va Chair)'; if(result.some(p => p.category === 'Electronics')) return 'Faqat boshqa toifadagi (Electronics bo\\'lmagan) mahsulotlar chiqishi kerak'; return null;"
    }
  ]
,
  quizzes: [
  {
    "id": 1,
    "question": "Ichki so'rov (Subquery) odatda qanday belgilar ichida yoziladi?",
    "options": ["[ ... ]", "{ ... }", "( ... )", "< ... >"],
    "correctAnswer": 2,
    "explanation": "SQL-da subquery'lar har doim oddiy qavslar (parentheses) ichida yozilishi shart."
  },
  {
    "id": 2,
    "question": "Agar subquery birdan ortiq qator qaytarsa, WHERE shartida qaysi operatorni ishlatish lozim?",
    "options": ["=", "IN", "LIKE", "BETWEEN"],
    "correctAnswer": 1,
    "explanation": "Agar ichki so'rov ko'p qatorli bo'lsa, tenglik (=) xatolikka sabab bo'ladi. Uning o'rniga ro'yxat ichidan qidiruvchi IN operatori ishlatiladi."
  },
  {
    "id": 3,
    "question": "Subquery'ni qaysi SQL buyruqlari ichida ishlatish mumkin?",
    "options": [
      "Faqat SELECT ichida",
      "Faqat SELECT va WHERE ichida",
      "SELECT, INSERT, UPDATE va DELETE ichida",
      "Faqat FROM ichida"
    ],
    "correctAnswer": 2,
    "explanation": "Ichma-ich so'rovlarni barcha asosiy DML buyruqlarida (SELECT, INSERT, UPDATE, DELETE) turli maqsadlar uchun ishlatish mumkin."
  },
  {
    "id": 4,
    "question": "Subquery natijasi tashqi so'rovning WHERE shartiga qanday uzatiladi?",
    "options": [
      "Subquery avval bajarilib, uning qaytargan qiymati(lari) shart o'rniga qo'yiladi",
      "Tashqi so'rov birinchi bajarilib, natijasi ichki so'rovga o'tkaziladi",
      "Ikki so'rov parallel bajarilib, natijalar birlashtiriladi",
      "Tizim xatolik beradi, chunki bitta so'rovda ikkita SELECT mumkin emas"
    ],
    "correctAnswer": 0,
    "explanation": "SQL dvijogi avval qavs ichidagi ichki so'rovni (subquery) bajaradi va uning natijasini tashqi so'rovning WHERE shartiga parametr sifatida beradi."
  },
  {
    "id": 5,
    "question": "Skalyar subquery (Scalar Subquery) nima qaytaradi?",
    "options": [
      "Butun bir jadvalni",
      "Faqat bitta qiymatni (1 ta ustun va 1 ta qator)",
      "Faqat true yoki false qiymatni",
      "Bir nechta ustunlardan iborat qatorlarni"
    ],
    "correctAnswer": 1,
    "explanation": "Skalyar subquery faqatgina bitta ustun va bitta qatordan iborat yagona qiymat (masalan, SUM, AVG, yoki bitta ID) qaytaruvchi so'rovdir."
  },
  {
    "id": 6,
    "question": "Quyidagilardan qaysi biri subquery qaytargan ro'yxat ichidan moslikni tekshirish uchun ishlatiladi?",
    "options": [
      "LIKE",
      "BETWEEN",
      "IN",
      "AND"
    ],
    "correctAnswer": 2,
    "explanation": "IN operatori chap tomondagi qiymat o'ng tomondagi subquery qaytargan ro'yxat (massiv) ichida bor-yo'qligini tekshiradi."
  },
  {
    "id": 7,
    "question": "Correlated Subquery (Bog'liq ichki so'rov) nima?",
    "options": [
      "Hech qachon ishlamaydigan va xato beradigan so'rov",
      "Tashqi so'rovning har bir qatori uchun alohida qayta bajariladigan va tashqi jadval ustuniga tayanadigan so'rov",
      "Faqat JOIN yordamida yozilgan so'rov",
      "Baza yuklanishida faqat bir marta ishlaydigan so'rov"
    ],
    "correctAnswer": 1,
    "explanation": "Correlated subquery tashqi so'rov ma'lumotlariga bog'liq bo'ladi va tashqi so'rovning har bir qatori uchun qayta-qayta ishga tushib, unumdorlikni pasaytirishi mumkin."
  },
  {
    "id": 8,
    "question": "Subquery natijasida birorta ham qator qaytmaganini tekshirish uchun qaysi operator ishlatiladi?",
    "options": [
      "NOT EXISTS",
      "NOT IN",
      "IS NULL",
      "EMPTY"
    ],
    "correctAnswer": 0,
    "explanation": "NOT EXISTS operatori ichki so'rov hech qanday natija (0 ta qator) qaytarmasa true beradi."
  },
  {
    "id": 9,
    "question": "SELECT * FROM products WHERE price > (SELECT MAX(price) FROM products) so'rovi nimani qaytaradi?",
    "options": [
      "Eng qimmat mahsulotni",
      "Bo'sh natija (hech narsa qaytmaydi)",
      "O'rtacha narxdan qimmat barcha mahsulotlarni",
      "Xatolik yuz beradi"
    ],
    "correctAnswer": 1,
    "explanation": "Chunki mahsulot narxi o'zining eng maksimal narxidan qimmat bo'la olmaydi (price > MAX(price) har doim false). Natijada bo'sh to'plam qaytadi."
  },
  {
    "id": 10,
    "question": "Subquery'ni SELECT ustunlari ro'yxatida (projection) ishlatsa bo'ladimi?",
    "options": [
      "Yo'q, faqat WHERE va FROM ichida ishlatish mumkin",
      "Ha, har bir qator uchun qo'shimcha skalyar qiymat hisoblash uchun SELECT tarkibida ishlatsa bo'ladi",
      "Faqat ma'lumotlarni o'chirishda SELECT ichida ishlatiladi",
      "Ha, lekin faqat ORDER BY bilan birga"
    ],
    "correctAnswer": 1,
    "explanation": "SELECT ustunlari orasida skalyar subquery ishlatib, har bir natijaviy qator uchun boshqa jadvaldan tegishli qiymatni hisoblab chiqarish mumkin."
  },
  {
    "id": 11,
    "question": "Subquery'ni FROM qismida jadval o'rnida ishlatganda nima deb ataladi?",
    "options": [
      "Derived Table (yoki Inline View)",
      "Temporary Table",
      "Common Table Expression (CTE)",
      "Correlated Subquery"
    ],
    "correctAnswer": 0,
    "explanation": "FROM qismida yozilgan va jadval vazifasini bajaradigan subquery 'Derived Table' yoki 'Inline View' deb nomlanadi va unga odatda alias (nom) berish talab etiladi."
  },
  {
    "id": 12,
    "question": "ALL operatori subquery bilan birga ishlatilganda nima vazifani bajaradi?",
    "options": [
      "Bacha shartlar qisman bajarilsa ham true beradi",
      "Tashqi so'rov qiymati subquery qaytargan barcha qiymatlarning har biridan kattaligini/kichikligini tekshiradi",
      "Faqat barcha qatorlarni o'chirish uchun qo'llaniladi",
      "Subquery qaytargan barcha ustunlarni birlashtiradi"
    ],
    "correctAnswer": 1,
    "explanation": "Masalan, price > ALL (Subquery) sharti mahsulot narxi subquery qaytargan barcha qiymatlarning eng kattasidan ham katta bo'lishini talab qiladi."
  }
]

};
