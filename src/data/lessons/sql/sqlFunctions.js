export const sqlFunctions = {
  id: "sqlFunctions",
  title: "SQL Agregat Funksiyalari va Grouping",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Agregat Funksiyalar va Guruhlash nima?
Hisobotlar yaratish yoki ma'lumotlarni umumlashtirish uchun biz alohida qatorlarni emas, balki guruhlar bo'yicha yig'ilgan ma'lumotlarni hisoblashimiz kerak. Masalan, umumiy sotuvlar hajmini bilish, eng qimmat mahsulotni aniqlash, har bir shaharda nechtadan foydalanuvchi borligini sanash yoki har bir mijozning o'rtacha xarajatini topish. SQL-da bu vazifalar **Agregat funksiyalar** (\`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`) va **GROUP BY** operatori yordamida juda tez bajariladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz maktab direktorisiz va har bir sinfdagi o'quvchilarning **o'rtacha bahosini** bilmoqchisiz:
1. Avval barcha o'quvchilarni sinflari bo'yicha alohida guruhlarga ajratasiz (**GROUP BY**).
2. So'ngra har bir guruhdagi o'quvchilar bahosining o'rtacha qiymatini hisoblaysiz (**AVG**).
3. Agar faqat o'rtacha bahosi 4 dan yuqori bo'lgan sinflarni ko'rmoqchi bo'lsangiz, ularni guruhlangan natija bo'yicha filtrlaysiz (**HAVING**).

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Oddiy COUNT va SUM)
Jadvaldagi jami foydalanuvchilar sonini va buyurtmalarning umumiy summasini hisoblash:
\`\`\`sql
SELECT COUNT(*) AS total_users, SUM(amount) AS total_sales 
FROM orders;
\`\`\`
* **Natija:** Bitta qatorda jami foydalanuvchilar soni va jami savdo summasi chiqadi.
* **Qachon ishlatiladi:** Umumiy hisobotlar va statistikalarni chiqarishda.
* **Performance jihati:** \`COUNT(*)\` jadvaldagi barcha qatorlarni tezda sanaydi. Indekslangan ustun orqali \`SUM\` hisoblash tezroq amalga oshadi.

### 2. Intermediate Example (GROUP BY orqali guruhlash)
Har bir shahardagi foydalanuvchilar sonini va ularning o'rtacha yoshini topish:
\`\`\`sql
SELECT city, COUNT(*) AS user_count, AVG(age) AS average_age 
FROM users 
GROUP BY city;
\`\`\`
* **Natija:** Har bir shahar uchun alohida qator va o'sha shahardagi foydalanuvchilar soni hamda o'rtacha yoshi chiqadi.
* **Qachon ishlatiladi:** Hududlar, toifalar yoki rollar bo'yicha guruhlangan statistikalarni ko'rishda.
* **Performance jihati:** \`city\` ustunida indeks bo'lsa, guruhlash tezroq bajariladi.

### 3. Advanced Example (GROUP BY va HAVING filtri)
Faqat jami buyurtmalari soni 5 tadan ko'p va jami xarajatlari 1000 dollardan oshgan foydalanuvchilarning ID si va umumiy summasi:
\`\`\`sql
SELECT user_id, COUNT(id) AS order_count, SUM(amount) AS total_spent 
FROM orders 
GROUP BY user_id 
HAVING COUNT(id) > 5 AND SUM(amount) > 1000;
\`\`\`
* **Natija:** Berilgan shartga mos keluvchi faol va yirik xaridorlar ro'yxati.
* **Qachon ishlatiladi:** Guruhlangan natijalar ustidan hisob-kitob shartlarini tekshirishda.
* **Performance jihati:** \`HAVING\` faqat guruhlashdan keyin ishlaydi, shuning uchun bu yerda oddiy filtrlarni (masalan, \`WHERE status = 'Completed'\`) ishlatmaslik kerak, ularni \`WHERE\` qismiga o'tkazish lozim.

### 4. Production Example (Sana bo'yicha guruhlash - Rollup/Truncate)
Har bir oy bo'yicha jami savdo summasini hisoblash (PostgreSQL):
\`\`\`sql
SELECT DATE_TRUNC('month', order_date) AS order_month, SUM(amount) AS monthly_sales 
FROM orders 
GROUP BY order_month 
ORDER BY order_month DESC;
\`\`\`
* **Natija:** Oylar kesimidagi savdo dinamikasi.
* **Qachon ishlatiladi:** Moliyaviy va tahliliy hisobotlar (dashboards) yaratishda.
* **Performance jihati:** Vaqt bo'yicha guruhlash sekin ishlamasligi uchun \`order_date\` ustunida indeks bo'lishi va so'rov oralig'i (date range) \`WHERE\` da cheklanishi kerak.

### 5. Enterprise Example (Multiple Grouping Sets va Rollup)
Bir vaqtning o'zida ham toifa, ham shahar bo'yicha va umumiy yig'indilarni (Grand Total) olish:
\`\`\`sql
SELECT category, city, SUM(sales) AS total_revenue 
FROM store_sales 
GROUP BY ROLLUP (category, city);
\`\`\`
* **Natija:** Toifa bo'yicha guruhlar, toifa+shahar bo'yicha guruhlar va butun do'kon bo'yicha umumiy daromad bitta so'rovda qaytadi.
* **Qachon ishlatiladi:** Katta ERP va biznes tahlil (BI) tizimlarida ko'p o'lchamli hisobotlar shakllantirishda.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Agar SQL-da agregat funksiyalar bo'lmaganida, har bir buyurtma yoki foydalanuvchi ma'lumotlarini alohida tortib olib, backend kodda loop orqali \`sum\`, \`count\` qilishga majbur bo'lardik.
* **Muammo:** 10 millionta sotuv qatorini yuklash server xotirasini tugatadi va tarmoqni band qiladi.
* **RDBMS Yechimi:** Ma'lumotlar bazasi hisob-kitobni disk joylashgan joyda bajaradi va faqatgina 1 qatorlik natijani backendga qaytaradi. Bu resurslarni yuzlab barobar tejaydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. SELECT ustunlarini GROUP BY qismida ko'rsatmaslik
#### Xato:
\`\`\`sql
-- Xato sintaksis!
SELECT city, role, COUNT(*) 
FROM users 
GROUP BY city;
\`\`\`
#### Nima uchun noto'g'ri:
\`role\` ustuni agregat funksiyaga olinmagan va \`GROUP BY\` qismida ham ko'rsatilmagan. SQL \`city\` bo'yicha guruhlaganda \`role\` ustunidagi qaysi qiymatni chiqarishni bilmaydi.
#### To'g'ri usul:
\`\`\`sql
SELECT city, role, COUNT(*) 
FROM users 
GROUP BY city, role;
\`\`\`

### 2. HAVING va WHERE operatorlarini adashtirish
#### Xato:
\`\`\`sql
-- Xato sintaksis!
SELECT city, COUNT(*) 
FROM users 
WHERE COUNT(*) > 5 
GROUP BY city;
\`\`\`
#### Nima uchun noto'g'ri:
\`WHERE\` bloki guruhlashdan oldin ishlaydi, shuning uchun u hali hisoblanmagan \`COUNT(*)\` qiymati bilan ishlay olmaydi.
#### To'g'ri usul:
\`\`\`sql
SELECT city, COUNT(*) 
FROM users 
GROUP BY city 
HAVING COUNT(*) > 5;
\`\`\`

### 3. Guruhlanishi mumkin bo'lgan shartlarni WHERE o'rniga HAVING-ga yozish
#### Xato:
\`\`\`sql
SELECT city, COUNT(*) 
FROM users 
GROUP BY city 
HAVING city = 'Toshkent'; -- Noto'g'ri joylashtirilgan filtr
\`\`\`
#### Nima uchun noto'g'ri:
Bu so'rov ishlaydi, ammo u juda sekin ishlaydi. Chunki baza avval barcha shaharlarni guruhlab, keyin faqat Toshkentni qoldiradi.
#### To'g'ri usul:
\`\`\`sql
SELECT city, COUNT(*) 
FROM users 
WHERE city = 'Toshkent' 
GROUP BY city;
\`\`\`
#### Izoh:
Guruhlashdan oldin filtrlanishi mumkin bo'lgan har qanday shartni har doim \`WHERE\` qismiga yozing. Bu guruhlanadigan ma'lumotlar hajmini keskin kamaytiradi.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Agregat funksiyalar nima va ularga misollar keltiring?
   * **Javob:** Bir nechta qatorlar qiymatlarini birlashtirib, bitta qiymat qaytaruvchi funksiyalar: \`SUM\`, \`COUNT\`, \`AVG\`, \`MIN\`, \`MAX\`.
2. **Savol:** \`GROUP BY\` nima uchun ishlatiladi?
   * **Javob:** Ma'lumotlarni bir xil qiymatga ega bo'lgan ustunlar bo'yicha guruhlab, har bir guruh uchun hisob-kitob qilishda ishlatiladi.
3. **Savol:** \`WHERE\` va \`HAVING\` farqi nimada?
   * **Javob:** \`WHERE\` oddiy qatorlarni guruhlashdan oldin filtrlaydi. \`HAVING\` esa guruhlangan natijalarni filtrlaydi.
4. **Savol:** \`COUNT(*)\` va \`COUNT(email)\` farqi nimada?
   * **Javob:** \`COUNT(*)\` NULL qiymatlarni ham qo'shib barcha qatorlarni sanaydi, \`COUNT(email)\` esa email ustuni NULL bo'lmagan qatorlarni sanaydi.

### Middle (5–8)
5. **Savol:** Agar \`SELECT\` da ham agregat funksiya, ham oddiy ustun kelgan bo'lsa, qanday qoida bajarilishi shart?
   * **Javob:** Agregat funksiya bo'lmagan barcha ustunlar albatta \`GROUP BY\` kalit so'zidan keyin yozilishi shart.
6. **Savol:** \`AVG\` funksiyasi NULL qiymatlarni qanday qayta ishlaydi?
   * **Javob:** \`AVG\` funksiyasi NULL qiymatga ega qatorlarni hisobga olmaydi (ulardan tashqari o'rtachani oladi).
7. **Savol:** Bir vaqtning o'zida ham \`WHERE\`, ham \`GROUP BY\`, ham \`HAVING\` ishlatilgan so'rovning bajarilish tartibi qanday?
   * **Javob:** 1. \`WHERE\` (birlamchi qatorlar filtrlanadi), 2. \`GROUP BY\` (guruhlar shakllanadi), 3. Agregat hisoblar bajariladi, 4. \`HAVING\` (guruhlar filtrlanadi).
8. **Savol:** \`COUNT(DISTINCT role)\` nimani hisoblaydi?
   * **Javob:** Jadvaldagi takrorlanmagan unikal rollar sonini hisoblaydi.

### Senior (9–12)
9. **Savol:** Ma'lumotlar bazasi \`GROUP BY\` operatsiyasini bajarishda qanday algoritmlardan foydalanadi?
   * **Javob:** Asosan ikkita algoritm: \`HashAggregate\` (xotirada hash-jadval qurish orqali - tezroq ishlaydi) va \`GroupAggregate\` (ma'lumotlarni saralash orqali guruhlash).
10. **Savol:** Nima uchun \`HAVING\` bloki indekslardan foydalana olmaydi?
    * **Javob:** Chunki \`HAVING\` shartlari faqat dynamic ravishda hisoblangan agregat qiymatlarga (masalan, \`SUM(amount)\`) qo'yiladi. Bu qiymatlar jismoniy diskda indeks ko'rinishida mavjud emas.
11. **Savol:** Guruhlash so'rovlarini optimallashtirish uchun qanday indekslar yaratiladi?
    * **Javob:** \`GROUP BY\` ustunlariga o'rnatilgan indekslar bazaga saralash yoki hash qurish jarayonini chetlab o'tib, to'g'ridan-to'g'ri guruhlashga imkon beradi.
12. **Savol:** Katta hajmli jadvallarda \`COUNT(*)\` juda sekin ishlasa, qanday muqobil yechimlar bor?
    * **Javob:** Agar aniq son shart bo'lmasa, bazaning metadata jadvallaridan taxminiy sonni olish mumkin (PostgreSQL-da \`pg_class\` orqali) yoki trigger yordamida hisoblagich jadvalini yuritish mumkin.

---

## 6. 🛠️ Amaliy Topshiriqlar

Dars yakunidagi topshiriqlarni bajarib, SQL agregat funksiyalari va guruhlash bo'yicha ko'nikmalarni mustahkamlang.

---

## 7. 📝 12 ta Mini Test

Bilimlaringizni sinash uchun tayyorlangan testlar.

---

## 8. 🎯 Real Project Case Study

### SaaS loyihasi uchun oylik sotuvlar va KPI Dashboard tizimi
Siz yirik do'konlar tarmog'i uchun tahliliy dashboard yaratyapsiz. Tizimda har bir sotuvchi xodim va uning sotuvlari tarixi saqlanadi.

#### Muammo:
Rahbariyat har bir sotuvchining o'rtacha savdosi 500 dan yuqori bo'lgan oylik natijalarini ko'rmoqchi. Agar so'rov noto'g'ri yozilsa, server barcha tranzaksiyalarni o'qib, o'zi guruhlashiga to'g'ri keladi va bu hisobot yuklanishini daqiqalarga kechiktiradi.

#### SQL Yechim:
\`\`\`sql
SELECT employee_id, 
       DATE_TRUNC('month', sale_date) AS sale_month, 
       SUM(amount) AS total_sales, 
       AVG(amount) AS avg_sale_amount 
FROM sales 
WHERE status = 'Completed' -- faqat muvaffaqiyatli sotuvlar
GROUP BY employee_id, sale_month 
HAVING AVG(amount) > 500;
\`\`\`

#### Natija va Tahlil:
* \`WHERE\` qismida bekor qilingan sotuvlar chetlab o'tildi.
* \`GROUP BY\` xodim va oylar bo'yicha guruhlarni shakllantirdi.
* \`HAVING\` o'rtacha sotuvi 500 dan kam bo'lgan xodimlarni hisobotdan chiqarib tashladi.

---

## 9. 🚀 Performance va Optimization

* **Filter First (WHERE):** Doimo guruhlashdan oldin \`WHERE\` yordamida keraksiz qatorlarni o'chirib tashlang.
* **Covering Index:** Agar siz \`GROUP BY city\` deb yozsangiz va \`AVG(age)\` ni hisoblasangiz, \`(city, age)\` ustunlariga qo'yilgan kompozit indeks so'rovni faqat indeks orqali bajarishga imkon beradi (\`Index Only Scan\`).
* **Avoid High Cardinality Grouping:** Juda unikal qiymatga ega bo'lgan (masalan, UUID yoki aniq timestamp) ustunlar bo'yicha guruhlashdan qoching, bu xotirani to'ldirib yuboradi.

---

## 10. 📌 Cheat Sheet

| Funksiya / Operator | Sintaksis | Vazifasi | Qachon ishlatiladi |
| :--- | :--- | :--- | :--- |
| **\`COUNT()\`** | \`COUNT(*)\` / \`COUNT(ustun)\` | Qatorlar sonini sanaydi | Jami yozuvlarni aniqlashda |
| **\`SUM()\`** | \`SUM(amount)\` | Sonlar yig'indisini hisoblaydi | Moliyaviy aylanmalarda |
| **\`AVG()\`** | \`AVG(age)\` | O'rtacha qiymatni hisoblaydi | O'rtacha ko'rsatkichlarda |
| **\`MIN()\`** / **\`MAX()\`** | \`MIN(price)\` / \`MAX(price)\` | Eng kichik va eng katta qiymat | Ekstremal nuqtalarni topishda |
| **\`GROUP BY\`** | \`GROUP BY city, role\` | Ma'lumotlarni guruhlaydi | Agregat funksiyalar bilan birga |
| **\`HAVING\`** | \`HAVING SUM(amount) > 100\` | Guruhlangan natijalarni filtrlaydi | Guruhlashdan keyingi shartlarda |
| **\`DISTINCT\`** | \`COUNT(DISTINCT city)\` | Unikal qiymatlarni sanash | Takrorlanishlarni chetlab o'tishda |
`,
  exercises: [
  {
    "id": 1,
    "title": "Jami buyurtmalar summasi (SUM)",
    "instruction": "`orders` jadvalidagi barcha buyurtmalar summasi yig'indisini (`SUM`) toping.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT SUM(amount) FROM orders",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; const sum = result[0]['SUM(amount)'] || result[0]['sum(amount)'] || Object.values(result[0])[0]; if(Math.abs(Number(sum) - 2386) > 10) return 'Jami summa noto\\'g\\'ri'; return null;"
  },
  {
    "id": 2,
    "title": "Rollar bo'yicha guruhlash",
    "instruction": "`users` jadvalidan har bir roldagi (`role`) foydalanuvchilar sonini (`COUNT`) guruhlab oling.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT role, COUNT(*) FROM users GROUP BY role",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Jami 3 ta alohida rol bor'; return null;"
  },
  {
    "id": 3,
    "title": "Eng arzon mahsulot narxi (MIN)",
    "instruction": "`products` jadvalidan eng arzon mahsulot narxini (`MIN`) toping.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT MIN(price) FROM products",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; const minVal = Object.values(result[0])[0]; if(Number(minVal) !== 25) return 'Eng arzon narx 25 bo\\'lishi kerak'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Guruhlangan natijalarni filtrlash uchun qaysi kalit so'z ishlatiladi?",
    "options": ["WHERE", "HAVING", "ORDER BY", "SELECT"],
    "correctAnswer": 1,
    "explanation": "GROUP BY yordamida guruhlangan ma'lumotlar ustidan shart tekshirish uchun HAVING ishlatiladi. WHERE esa guruhlashdan oldin ishlaydi."
  },
  {
    "id": 2,
    "question": "Jadvaldagi qatorlar sonini sanash uchun qaysi agregat funksiya ishlatiladi?",
    "options": ["SUM()", "COUNT()", "AVG()", "TOTAL()"],
    "correctAnswer": 1,
    "explanation": "COUNT() funksiyasi qatorlar yoki NULL bo'lmagan qiymatlar sonini hisoblash uchun xizmat qiladi."
  },
  {
    "id": 3,
    "question": "Quyidagilardan qaysi biri to'g'ri yozilgan SQL so'rovi?",
    "options": [
      "SELECT city, AVG(age) FROM users WHERE AVG(age) > 20 GROUP BY city",
      "SELECT city, AVG(age) FROM users GROUP BY city HAVING AVG(age) > 20",
      "SELECT city, AVG(age) FROM users GROUP BY city WHERE age > 20",
      "SELECT city, AVG(age) FROM users HAVING AVG(age) > 20"
    ],
    "correctAnswer": 1,
    "explanation": "Agregat natija bo'yicha filtrlash HAVING orqali va u GROUP BY dan keyin yozilishi shart."
  },
  {
    "id": 4,
    "question": "Agregat funksiyaga olinmagan oddiy ustun SELECT qismida turgan bo'lsa, u yana qayerda ko'rsatilishi shart?",
    "options": ["ORDER BY qismida", "WHERE qismida", "GROUP BY qismida", "LIMIT qismida"],
    "correctAnswer": 2,
    "explanation": "Sintaksis qoidasiga ko'ra, SELECT-ga yozilgan va agregat funksiya bo'lmagan har bir ustun albatta GROUP BY guruhlash qismida ham yozilishi shart."
  },
  {
    "id": 5,
    "question": "WHERE va HAVING farqi nimada?",
    "options": [
      "Hech qanday farqi yo'q",
      "WHERE guruhlashdan oldin qatorlarni filtrlash uchun, HAVING esa guruhlashdan keyingi agregat natijalarni filtrlash uchun ishlatiladi",
      "HAVING tezroq ishlaydi",
      "WHERE faqat sonlarni, HAVING esa faqat matnlarni filtrlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "WHERE birlamchi jadval qatorlarini, HAVING esa GROUP BY natijasida hosil bo'lgan agregat guruhlarni filtrlaydi."
  },
  {
    "id": 6,
    "question": "COUNT(city) va COUNT(*) farqi nimada?",
    "options": [
      "COUNT(*) shaharlarni sanamaydi",
      "COUNT(city) faqat city ustunida NULL bo'lmagan qiymatlarni sanaydi, COUNT(*) esa barcha qatorlarni sanaydi",
      "Ikkalasi mutlaqo bir xil",
      "COUNT(city) xato sintaksis"
    ],
    "correctAnswer": 1,
    "explanation": "COUNT(ustun) faqat shu ustundagi aniq (NULL bo'lmagan) ma'lumotlarni hisoblaydi, yulduzcha (*) esa har qanday qatorni hisobga oladi."
  },
  {
    "id": 7,
    "question": "O'rtacha yoshni topish uchun qaysi agregat funksiya ishlatiladi?",
    "options": ["MIDDLE()", "AVG()", "MEAN()", "AVERAGE()"],
    "correctAnswer": 1,
    "explanation": "Average so'zining qisqartmasi bo'lgan AVG() funksiyasi sonlarning o'rtacha qiymatini hisoblaydi."
  },
  {
    "id": 8,
    "question": "Ustun nomiga so'rov natijasida chiroyli vaqtinchalik nom berish (Alias) uchun qaysi kalit so'z yoziladi?",
    "options": ["LIKE", "AS", "NAME", "TO"],
    "correctAnswer": 1,
    "explanation": "AS (Alias) kalit so'zi natijadagi ustun sarlavhasiga vaqtincha nom berish uchun ishlatiladi."
  },
  {
    "id": 9,
    "question": "Quyidagi agregat funksiyalardan qaysi biri faqat sonli qiymatlar bilan ishlay oladi?",
    "options": ["COUNT()", "MIN()", "SUM()", "MAX()"],
    "correctAnswer": 2,
    "explanation": "SUM() va AVG() funksiyalari faqat matematik yig'indi hisoblagani uchun sonli ustunlar bilan ishlaydi. COUNT, MIN va MAX esa matnlar bilan ham ishlay oladi."
  },
  {
    "id": 10,
    "question": "Agregat funksiyalar ichida unikal (takrorlanmagan) qiymatlarni sanash uchun qaysi kalit so'z qo'shiladi?",
    "options": ["COUNT(UNIQUE ...)", "COUNT(DISTINCT ...)", "COUNT(ALL ...)", "COUNT(SINGLE ...)"],
    "correctAnswer": 1,
    "explanation": "COUNT(DISTINCT ustun) yordamida ustundagi faqat bir-biriga o'xshamaydigan unikal qiymatlar soni aniqlanadi."
  },
  {
    "id": 11,
    "question": "Quyidagilardan qaysi biri eng katta qiymatni topib beradi?",
    "options": ["MIN()", "MAX()", "HIGH()", "TOP()"],
    "correctAnswer": 1,
    "explanation": "MAX() funksiyasi berilgan maydondagi eng maksimal (katta) qiymatni qaytaradi."
  },
  {
    "id": 12,
    "question": "Har bir foydalanuvchining jami xarajatini topish uchun qaysi so'rov to'g'ri?",
    "options": [
      "SELECT user_id, SUM(amount) FROM orders",
      "SELECT user_id, SUM(amount) FROM orders GROUP BY user_id",
      "SELECT user_id, SUM(amount) FROM orders HAVING SUM(amount) > 0",
      "SELECT SUM(amount) FROM orders GROUP BY product"
    ],
    "correctAnswer": 1,
    "explanation": "Har bir foydalanuvchi bo'yicha yig'indi topish uchun albatta GROUP BY user_id bo'lishi lozim."
  }
]

};
