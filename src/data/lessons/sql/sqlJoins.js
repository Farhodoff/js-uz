export const sqlJoins = {
  id: "sqlJoins",
  title: "Jadvallarni Birlashtirish (JOINS)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish

### Jadvallarni Birlashtirish (JOINS) nima?
Relyatsion ma'lumotlar bazalarining (RDBMS) eng kuchli xususiyati — bu ma'lumotlarni turli jadvallarga bo'lib saqlash (Normalizatsiya) va so'rov paytida ularni bog'lab birlashtirish imkoniyatidir. Masalan, buyurtmalar jadvalida faqat foydalanuvchining ID si (\`user_id\`) saqlanadi. Lekin bizga hisobotda foydalanuvchining ismi (\`name\`) va u sotib olgan mahsulot nomi (\`product\`) birgalikda kerak bo'ladi. SQL-da buning uchun **JOIN** (Birlashtirish) operatorlaridan foydalaniladi.

### Real hayotiy o'xshatish
Tasavvur qiling, sizda ikkita qog'ozli ro'yxat bor:
1. **O'quvchilar ro'yxati**: Har bir o'quvchining ID raqami va ismi yozilgan.
2. **To'garaklar ro'yxati**: To'garak nomi va unga a'zo bo'lgan o'quvchining ID raqami yozilgan.
* **INNER JOIN:** Faqat to'garakka a'zo bo'lgan o'quvchilarni va ularning to'garaklarini ko'rsatadi (ikki ro'yxatning kesishgan qismi).
* **LEFT JOIN:** Barcha o'quvchilarni ko'rsatadi. Agar o'quvchi birorta ham to'garakka a'zo bo'lmagan bo'lsa, to'garak nomi to'g'risida bo'sh (\`NULL\`) joy qoladi.
* **RIGHT JOIN:** Barcha to'garaklarni ko'rsatadi, xoh o'quvchisi bo'lsin, xoh bo'lmasin.
* **FULL JOIN:** Barcha o'quvchilarni va barcha to'garaklarni birlashtirib ko'rsatadi.

---

## 2. 💻 Real SQL Kod Misollari

### 1. Basic Example (Ichki birlashtirish - INNER JOIN)
Buyurtma bergan foydalanuvchining ismi va u sotib olgan mahsulot:
\`\`\`sql
SELECT u.name, o.product, o.amount 
FROM orders o
INNER JOIN users u ON o.user_id = u.id;
\`\`\`
* **Natija:** Faqat ro'yxatda mavjud va buyurtma bergan foydalanuvchilar nomi hamda mahsulotlari chiqadi.
* **Qachon ishlatiladi:** Ikkala jadvalda ham o'zaro bog'liq ma'lumotlar mavjud bo'lgan qatorlarni olishda.
* **Performance jihati:** \`users.id\` ustuni primary key va \`orders.user_id\` ustuni foreign key sifatida indekslangan bo'lsa, birlashtirish o'ta tez bajariladi.

### 2. Intermediate Example (Chap tomonlama birlashtirish - LEFT JOIN)
Barcha foydalanuvchilar va ularning buyurtmalari (buyurtma bermaganlar ham ro'yxatda chiqadi va ularga tegishli buyurtma ustunlari NULL bo'ladi):
\`\`\`sql
SELECT u.name, o.product, o.amount 
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
\`\`\`
* **Natija:** Tizimdagi barcha foydalanuvchilar va ularning buyurtmalari (agar bor bo'lsa). Buyurtma bermaganlarning mahsulot qismi bo'sh (\`NULL\`) chiqadi.
* **Qachon ishlatiladi:** Asosiy jadvaldagi barcha qatorlarni yo'qotmasdan, ikkinchi jadvaldagi ma'lumotlarni ham qo'shib chiqarishda.
* **Performance jihati:** Chap jadvalda millionlab qatorlar bo'lganda, o'ng jadvalda tezkor moslikni qidirish uchun mos keluvchi ustun indekslangan bo'lishi shart.

### 3. Advanced Example (Uchta jadvalni birga JOIN qilish)
Foydalanuvchining ismi, u sotib olgan mahsulot nomi va u mahsulotning ombor qoldig'ini birgalikda chiqarish:
\`\`\`sql
SELECT u.name, o.product, p.price, p.stock 
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN products p ON o.product = p.name;
\`\`\`
* **Natija:** Uchta jadvaldagi (users, orders, products) bog'langan ustunlar yagona natijaga birlashadi.
* **Qachon ishlatiladi:** Murakkab relyatsiyali ma'lumotlarni (masalan: foydalanuvchi -> buyurtma -> mahsulot) birlashtirishda.
* **Performance jihati:** JOIN soni ortgani sari so'rov murakkablashadi. Indekslar to'g'ri qo'yilmagan bo'lsa, so'rov vaqti keskin oshadi.

### 4. Production Example (JOIN va GROUP BY birgalikda)
Har bir foydalanuvchining ismi va uning jami xarajatlari summasini aniqlash:
\`\`\`sql
SELECT u.name, COALESCE(SUM(o.amount), 0) AS total_spent 
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
\`\`\`
* **Natija:** Barcha foydalanuvchilar va ularning umumiy xarajatlari. \`COALESCE\` yordamida umuman xarid qilmaganlarning \`NULL\` qiymati \`0\` ga o'zgartiriladi.
* **Qachon ishlatiladi:** Mijozlar balansi yoki KPI hisobotlarini shakllantirishda.

### 5. Enterprise Example (Self JOIN - Jadvalni o'ziga birlashtirish)
Xodimlar jadvalida har bir xodim va uning rahbarining (manager) ismini chiqarish:
\`\`\`sql
-- employees jadvalida manager_id ustuni bor va u employees.id ga ishora qiladi
SELECT emp.name AS employee_name, mgr.name AS manager_name 
FROM employees emp
LEFT JOIN employees mgr ON emp.manager_id = mgr.id;
\`\`\`
* **Natija:** Xodimlar va ularning boshliqlari ro'yxati.
* **Qachon ishlatiladi:** Ierarxik tuzilmalar, daraxtsimon (tree) relyatsiyalar yoki ko'p darajali kategoriyalar bilan ishlashda.

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
Relyatsion bazalarda ma'lumotlar takrorlanishining oldini olish uchun jadvallar **normalizatsiya** qilinadi. Masalan, 1000 ta buyurtma bergan mijozning ismi va manzilini 1000 marta orders jadvalida takroran saqlash o'rniga, u ma'lumotlar bitta \`users\` jadvalida saqlanadi, orders da esa faqat \`user_id\` yoziladi.
* **Muammo:** Normalizatsiya natijasida ma'lumotlar tarqalib ketadi.
* **RDBMS Yechimi:** SQL \`JOIN\` operatorlari yordamida tarqoq ma'lumotlarni so'rov bajarilayotgan soniyalarda bir-biriga bog'lab, foydalanuvchiga butun ko'rinishda taqdim etadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. ON shartini unutib yozish (Cartesian Product)
#### Xato:
\`\`\`sql
SELECT u.name, o.product 
FROM users u 
INNER JOIN orders o; -- ON sharti yo'q!
\`\`\`
#### Nima uchun noto'g'ri:
Baza har bir foydalanuvchini har bir buyurtma bilan birlashtirib chiqadi (CROSS JOIN). Agar 1000 ta foydalanuvchi va 1000 ta buyurtma bo'lsa, natija 1,000,000 ta noto'g'ri qatordan iborat bo'ladi va xotirani to'ldiradi.
#### To'g'ri usul:
\`\`\`sql
SELECT u.name, o.product 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;
\`\`\`

### 2. Ambiguous Column Name (Chalkash ustun nomi) xatosi
#### Xato:
\`\`\`sql
SELECT id, name, product 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id; -- id qaysi jadvalniki?
\`\`\`
#### Nima uchun noto'g'ri:
Ikkala jadvalda ham \`id\` ustuni borligi sababli, SQL qaysi jadvalning \`id\` sini tanlashni bilmaydi va xatolik beradi.
#### To'g'ri usul:
\`\`\`sql
SELECT u.id AS user_id, u.name, o.product 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;
\`\`\`

### 3. LEFT JOIN qilingan jadval ustunini WHERE da filtrlab, uni INNER JOIN-ga aylantirib qo'yish
#### Xato:
\`\`\`sql
SELECT u.name, o.product 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE o.status = 'Completed'; -- LEFT JOIN ni buzadigan shart
\`\`\`
#### Nima uchun noto'g'ri:
\`WHERE o.status = 'Completed'\` sharti tufayli buyurtma bermagan (buyurtmasi null bo'lgan) foydalanuvchilar o'chib ketadi. So'rov o'z-o'zidan \`INNER JOIN\` ga aylanadi.
#### To'g'ri usul:
\`\`\`sql
SELECT u.name, o.product 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'Completed';
\`\`\`
#### Izoh:
Agar LEFT JOIN dagi o'ng jadvalga shart qo'ymoqchi bo'lsangiz, uni \`WHERE\` ga emas, \`ON\` bog'lanish blokiga qo'shing.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** SQL-da \`JOIN\` nima va u nima uchun kerak?
   * **Javob:** Turli jadvallardagi ma'lumotlarni o'zaro bog'lovchi ustun (kalit) orqali birlashtirib olish uchun ishlatiladi.
2. **Savol:** \`INNER JOIN\` va \`LEFT JOIN\` farqi nimada?
   * **Javob:** \`INNER JOIN\` faqat ikkala jadvalda ham mos qiymatga ega bo'lgan qatorlarni qaytaradi. \`LEFT JOIN\` esa chap jadvaldagi barcha qatorlarni va o'ng jadvaldagi faqat mos qatorlarni qaytaradi.
3. **Savol:** Jadval taxallusi (Table Alias) nima va u nega kerak?
   * **Javob:** So'rovlarni qisqartirish va bir xil nomli ustunlarni ajratish uchun ishlatiladigan vaqtinchalik nom (masalan, \`users u\`).
4. **Savol:** \`FULL JOIN\` nima ish qiladi?
   * **Javob:** Ikkala jadvaldagi barcha qatorlarni birlashtiradi, mos kelmagan ustunlar uchun \`NULL\` qiymatlar qaytaradi.

### Middle (5–8)
5. **Savol:** Agar ikkala jadvalda ham bog'liq ustunlar nomi bir xil bo'lsa, qanday JOIN yozish mumkin?
   * **Javob:** Standart \`ON u.id = o.id\` dan tashqari, ba'zi dialektlarda \`USING(id)\` operatoridan foydalanish mumkin.
6. **Savol:** \`Self JOIN\` nima va u qachon ishlatiladi?
   * **Javob:** Jadvalni o'z-o'ziga birlashtirish. Ierarxik ma'lumotlarda (rahbar-xodim, ota-bola kategoriyalar) ishlatiladi.
7. **Savol:** Nima uchun \`LEFT JOIN\` so'rovida \`WHERE\` shartida o'ng jadval ustunini filtrlasak \`INNER JOIN\`ga aylanib qoladi?
   * **Javob:** Chunki \`WHERE\` sharti \`NULL\` qiymatga ega qatorlarni o'chirib tashlaydi, bu esa LEFT JOIN orqali kelgan bo'sh ulanishlarni yo'q qiladi.
8. **Savol:** \`CROSS JOIN\` nima?
   * **Javob:** Dekart ko'paytmasi (Cartesian Product). Birinchi jadvalning har bir qatorini ikkinchi jadvalning har bir qatori bilan birlashtiradi.

### Senior (9–12)
9. **Savol:** Ma'lumotlar bazasi JOIN amalini bajarishda qaysi fizik algoritmlardan foydalanadi?
   * **Javob:** Uchta asosiy algoritm: \`Nested Loop\` (kichik jadvallar uchun), \`Hash Join\` (indekssiz katta jadvallar uchun) va \`Merge Join\` (saralangan yoki indekslangan katta jadvallar uchun).
10. **Savol:** Katta hajmli jadvallarni bog'lashni optimallashtirish uchun eng birinchi qilinadigan amal nima?
    * **Javob:** Bog'lanish ustunlariga (Foreign Key) albatta indeks qo'yish kerak. Baza bu orqali \`Merge Join\` yoki tezkor indeks skanerlashni qo'llay oladi.
11. **Savol:** \`LEFT JOIN\` va \`RIGHT JOIN\` ishlash tezligida farq bormi?
    * **Javob:** Tezlik jihatidan hech qanday farq yo'q. Optimizator ikkalasini ham bir xil reja bilan bajaradi. Tanlov faqat mantiqiy o'qishlilikka bog'liq.
12. **Savol:** Subquery yozgan ma'qulmi yoki \`JOIN\`?
    * **Javob:** Modern optimizatorlar ko'pincha subquery-larni ichki \`JOIN\`ga o'giradi (\`Query Rewrite\`). Ammo murakkab sharoitlarda \`JOIN\` o'qishga osonroq va optimizator uchun reja tuzishga qulayroqdir.

---

## 6. 🛠️ Amaliy Topshiriqlar

Dars yakunidagi topshiriqlar yordamida \`JOIN\` operatorlarini amaliyotda sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

JOIN mavzusi bo'yicha bilimlaringizni sinash uchun testlar.

---

## 8. 🎯 Real Project Case Study

### Elektron tijorat platformasi uchun buyurtmalar tafsiloti hisoboti
Siz onlayn do'kon uchun buyurtmalar ro'yxati va ulardagi mahsulotlar hamda foydalanuvchilar ismlarini birlashtirib, adminlar uchun hisobot shakllantiryapsiz.

#### Muammo:
Tizimda \`users\`, \`orders\`, \`order_items\` va \`products\` jadvallari alohida saqlanadi. Hisobotda har bir buyurtmadagi mahsulot nomi, uning narxi, sotib olgan odamning ismi va shahri ko'rinishi lozim. Agar so'rov noto'g'ri yozilsa, server to'liq ma'lumotlarni ko'paytirib, sekinlashuvga olib keladi.

#### SQL Yechim:
\`\`\`sql
SELECT o.id AS order_id, 
       u.name AS customer_name, 
       u.city AS customer_city,
       p.name AS product_name, 
       oi.quantity, 
       oi.price_at_purchase AS price
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
ORDER BY o.order_date DESC;
\`\`\`

#### Arxitektura va Optimallashtirish:
* Jadvallar o'rtasidagi bog'lanish ustunlari (\`user_id\`, \`order_id\`, \`product_id\`) primary/foreign key bo'lgani sababli, bazada ularga avtomatik indeks yaratiladi.
* \`ORDER BY\` sharti uchun \`order_date\` ustunida ham indeks bo'lishi talab etiladi.

---

## 9. 🚀 Performance va Optimization

* **Foreign Key Indexes:** Har doim tashqi kalit (\`Foreign Key\`) ustunlarida alohida indeks yarating. SQL \`JOIN\` bajarayotganda ushbu indekslar yordamida mos qatorlarni topish vaqtini millisoniyalargacha kamaytiradi.
* **Select Only Necessary Columns:** \`SELECT *\` yozish o'rniga faqat kerakli ustunlarni nomma-nom tanlang (\`SELECT u.name, o.product\`). Bu ma'lumot uzatish hajmini kamaytiradi.
* **Explain Analyze:** So'rovlar sekin ishlayotganda \`EXPLAIN ANALYZE SELECT ...\` buyrug'i orqali qaysi JOIN turi ishlatilganini va qayerda sekinlashish bo'layotganini ko'ring.

---

## 10. 📌 Cheat Sheet

| JOIN turi | Vazifasi | Natija tavsifi | ON sharti misoli |
| :--- | :--- | :--- | :--- |
| **\`INNER JOIN\`** | Faqat mos qatorlarni birlashtiradi | Faqat ikkala tomonda bor qatorlar | \`ON u.id = o.user_id\` |
| **\`LEFT JOIN\`** | Chap jadvaldagi hammasini, o'ngdan faqat mosini oladi | Chap jadval to'liq chiqadi, o'ng mos bo'lmasa \`NULL\` | \`ON u.id = o.user_id\` |
| **\`RIGHT JOIN\`** | O'ng jadvaldagi hammasini, chapdan faqat mosini oladi | O'ng jadval to'liq chiqadi, chap mos bo'lmasa \`NULL\` | \`ON u.id = o.user_id\` |
| **\`FULL JOIN\`** | Ikkala tomondagi barcha qatorlarni oladi | Hamma qatorlar chiqadi, mos kelmaganlar \`NULL\` | \`ON u.id = o.user_id\` |
| **\`CROSS JOIN\`** | Cartesian ko'paytmani hosil qiladi | Barcha kombinatsiyalar, ON sharti yozilmaydi | - |
`,
  exercises: [
  {
    "id": 1,
    "title": "Foydalanuvchilar va ularning buyurtmalari (INNER JOIN)",
    "instruction": "`orders` jadvalini `users` jadvali bilan bog'lang (`user_id` va `id` orqali). Foydalanuvchining ismi (`name`), mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang. Faqat buyurtma bergan foydalanuvchilar chiqishi kerak.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT u.name, o.product, o.amount FROM orders o INNER JOIN users u ON o.user_id = u.id",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 6) return 'Jami 6 ta buyurtma qaytishi kerak'; if(result[0].name === undefined || result[0].product === undefined || result[0].amount === undefined) return 'name, product va amount ustunlarini tanlang'; return null;"
  },
  {
    "id": 2,
    "title": "Barcha foydalanuvchilar va xaridlar (LEFT JOIN)",
    "instruction": "Tizimdagi barcha foydalanuvchilarni va ularning buyurtmalarini ko'rsating. Buning uchun `users` jadvalini `orders` jadvali bilan `LEFT JOIN` orqali bog'lang. Foydalanuvchining ismi (`name`), buyurtma qilingan mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT u.name, o.product, o.amount FROM users u LEFT JOIN orders o ON u.id = o.user_id",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 7) return 'LEFT JOIN ishlatilganda jami 7 ta qator qaytishi kerak (buyurtma bermagan Dilshod ham chiqishi shart)'; const dilshod = result.find(r => r.name === 'Dilshod'); if(!dilshod) return 'Dilshod natijada bo\\\'lishi kerak'; if(dilshod.product !== null && dilshod.product !== undefined) return 'Dilshodning buyurtma mahsuloti NULL bo\\\'lishi kerak'; return null;"
  },
  {
    "id": 3,
    "title": "Toshkentlik foydalanuvchilar buyurtmalari (INNER JOIN + WHERE)",
    "instruction": "Faqat Toshkent shahridan bo'lgan foydalanuvchilarning buyurtmalarini toping. `orders` va `users` jadvallarini birlashtiring. Foydalanuvchi ismi (`name`), shahri (`city`), mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang. Natijani Toshkent shahri bo'yicha filtrlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT u.name, u.city, o.product, o.amount FROM orders o INNER JOIN users u ON o.user_id = u.id WHERE u.city = 'Toshkent'",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Toshkentlik foydalanuvchilarning jami 3 ta buyurtmasi bo\\\'lhishi kerak'; const hasTashkentOnly = result.every(r => r.city === 'Toshkent'); if(!hasTashkentOnly) return 'Faqat Toshkent shahridagi foydalanuvchilar buyurtmalari chiqishi kerak'; return null;"
  },
  {
    "id": 4,
    "title": "Buyurtma bermagan mijozlarni aniqlash (LEFT JOIN + NULL check)",
    "instruction": "Tizimda ro'yxatdan o'tgan, lekin hali birorta ham buyurtma bermagan foydalanuvchilarni aniqlang. `users` jadvalini `orders` jadvali bilan `LEFT JOIN` qiling va `WHERE` yordamida faqat buyurtmasi yo'q (`orders.id IS NULL`) bo'lgan foydalanuvchining ismi (`name`) va roli (`role`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT u.name, u.role FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.id IS NULL",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1) return 'Faqat 1 ta buyurtma bermagan foydalanuvchi bo\\\'lishi kerak'; if(result[0].name !== 'Dilshod') return 'Buyurtma bermagan foydalanuvchi Dilshod bo\\\'lishi kerak'; if(result[0].role === undefined) return 'role ustunini tanlashni unutmang'; return null;"
  },
  {
    "id": 5,
    "title": "Mavjud mahsulotlar buyurtmalari (INNER JOIN)",
    "instruction": "`orders` jadvalidagi mahsulotlarni (`product`) `products` jadvalidagi mahsulot nomi (`name`) bilan bog'lang (`INNER JOIN`). Mahsulot nomi (`name`), toifasi (`category`), va buyurtma summasi (`amount`) ustunlarini tanlang. Faqat ikkala jadvalda ham mos keluvchi mahsulotlar chiqishi kerak.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT p.name, p.category, o.amount FROM orders o INNER JOIN products p ON o.product = p.name",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Faqat 3 ta buyurtma mahsuloti products jadvalida mavjud (Laptop, Phone, Mouse)'; if(result[0].category === undefined) return 'category ustunini ham tanlang'; return null;"
  },
  {
    "id": 6,
    "title": "Sotilmagan mahsulotlarni topish (RIGHT JOIN)",
    "instruction": "`orders` va `products` jadvallarini `RIGHT JOIN` yordamida birlashtirib, barcha mahsulotlar va ularga mos buyurtmalarni chiqaring. `products` jadvali o'ng tomonda bo'lsin. Mahsulot nomi (`name` - `products` jadvalidan), toifasi (`category`) va buyurtma summasi (`amount`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT p.name, p.category, o.amount FROM orders o RIGHT JOIN products p ON o.product = p.name",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'RIGHT JOIN tufayli jami 5 ta mahsulot chiqishi kerak (sotilmagan Desk va Chair bilan)'; const desk = result.find(r => r.name === \\`Desk\\`); if(!desk) return 'Desk mahsuloti natijada bo\\\'lishi kerak'; if(desk.amount !== null && desk.amount !== undefined) return 'Sotilmagan mahsulotlar uchun amount qiymati NULL bo\\\'lishi kerak'; return null;"
  },
  {
    "id": 7,
    "title": "Barcha mahsulotlar va buyurtmalar mosligi (FULL JOIN)",
    "instruction": "Barcha buyurtmalar va barcha mahsulotlarni to'liq birlashtirib ko'rish uchun `orders` va `products` jadvallarini `FULL JOIN` orqali ulang. Buyurtmadagi mahsulot nomi (`product` - `orders` jadvalidan), mahsulotlar jadvalidagi nomi (`name` - `products` jadvalidan) va buyurtma summasini (`amount`) tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT o.product, p.name, o.amount FROM orders o FULL JOIN products p ON o.product = p.name",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 8) return 'FULL JOIN natijasida jami 8 ta qator chiqishi kerak'; const onlyInOrders = result.filter(r => r.product && !r.name); const onlyInProducts = result.filter(r => !r.product && r.name); if(onlyInOrders.length !== 3) return 'Faqat buyurtmalarda bor 3 ta mahsulot chiqishi kerak (Keyboard, Monitor, Charger)'; if(onlyInProducts.length !== 2) return 'Faqat mahsulotlarda bor 2 ta mahsulot chiqishi kerak (Desk, Chair)'; return null;"
  },
  {
    "id": 8,
    "title": "Mijoz, Buyurtma va Mahsulot toifasi (3 ta jadval JOIN)",
    "instruction": "Foydalanuvchining ismi (`name` - `users` jadvalidan), buyurtma qilingan mahsulot nomi (`product` - `orders` jadvalidan) va uning toifasini (`category` - `products` jadvalidan) birgalikda chiqaruvchi so'rov yozing. Buning uchun `users`, `orders` va `products` jadvallarini `INNER JOIN` yordamida o'zaro bog'lang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT u.name, o.product, p.category FROM orders o INNER JOIN users u ON o.user_id = u.id INNER JOIN products p ON o.product = p.name",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return '3 ta jadvalda mos keluvchi jami 3 ta yozuv bo\\\'lishi kerak'; if(result[0].name === undefined || result[0].product === undefined || result[0].category === undefined) return 'Foydalanuvchi ismi, mahsulot va toifa ustunlarini tanlang'; return null;"
  },
  {
    "id": 9,
    "title": "Har bir foydalanuvchining xaridlari summasi (LEFT JOIN + GROUP BY)",
    "instruction": "Har bir foydalanuvchining ismi (`name`) va u qilgan buyurtmalarning umumiy summasini (`total_spent`) hisoblang. Buning uchun `users` jadvalini `orders` jadvali bilan `LEFT JOIN` qiling, natijani foydalanuvchi ID (`u.id`) va ismi (`u.name`) bo'yicha guruhlang (`GROUP BY`). Agar foydalanuvchi xarid qilmagan bo'lsa, summani `COALESCE(SUM(o.amount), 0)` yordamida `0` qilib ko'rsating. Natijani `total_spent` nomi bilan qaytaring.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT u.name, COALESCE(SUM(o.amount), 0) AS total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Barcha 5 ta foydalanuvchi guruhlanib chiqishi kerak'; const dilshod = result.find(r => r.name === 'Dilshod'); if(!dilshod) return 'Dilshod natijada bo\\\'lishi kerak'; if(Number(dilshod.total_spent) !== 0) return 'Dilshodning jami xarajati 0 bo\\\'lishi kerak'; const ali = result.find(r => r.name === 'Ali'); if(!ali || Number(ali.total_spent) !== 1225.5) return 'Ali ning jami xarajati 1225.5 bo\\\'lishi kerak'; return null;"
  },
  {
    "id": 10,
    "title": "Foydalanuvchilar va Mahsulotlar kombinatsiyasi (CROSS JOIN)",
    "instruction": "Kompaniya marketing kampaniyasi uchun har bir foydalanuvchiga har bir mavjud mahsulotni tavsiya qilmoqchi. `users` jadvali va `products` jadvalining barcha kombinatsiyalarini (CROSS JOIN) hosil qiling. Foydalanuvchi ismi (`name` - `users` jadvalidan) va mahsulot nomi (`name` - `products` jadvalidan) ustunlarini tanlang. Taxalluslar ishlating (`u.name AS user_name`, `p.name AS product_name`).",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT u.name AS user_name, p.name AS product_name FROM users u CROSS JOIN products p",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 25) return 'CROSS JOIN natijasida 5 ta foydalanuvchi va 5 ta mahsulot ko\\\'paytmasi bo\\\'lgan 25 ta qator hosil bo\\\'lishi kerak'; if(result[0].user_name === undefined || result[0].product_name === undefined) return 'user_name va product_name taxalluslaridan foydalaning'; return null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Ikkala jadvalda ham faqat shartga mos keluvchi o'zaro bog'langan qatorlarni qaytaradigan JOIN turi qaysi?",
    "options": ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"],
    "correctAnswer": 1,
    "explanation": "INNER JOIN faqat ikkala jadvalda ham mos kalitga ega bo'lgan qatorlar kesishmasini (intersection) qaytaradi."
  },
  {
    "id": 2,
    "question": "Chap jadvaldagi barcha qatorlarni va o'ng jadvaldagi faqat mos kelgan qatorlarni qaytaruvchi JOIN qaysi?",
    "options": ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "UNION"],
    "correctAnswer": 1,
    "explanation": "LEFT JOIN chap (boshlang'ich) jadvaldagi barcha ma'lumotlarni kafolatlangan holda chiqaradi, o'ng jadvalda moslik bo'lmasa NULL qo'yadi."
  },
  {
    "id": 3,
    "question": "Jadvallarni birlashtirishda bog'lanish ustunlarini ko'rsatish uchun qaysi kalit so'z ishlatiladi?",
    "options": ["WHERE", "ON", "USING", "IN"],
    "correctAnswer": 1,
    "explanation": "JOIN shartini yozish uchun ON kalit so'zi ishlatiladi (masalan, JOIN orders ON users.id = orders.user_id)."
  },
  {
    "id": 4,
    "question": "INNER JOIN bog'lanishida chap va o'ng jadvallarda mos kelmagan qatorlar natijada qanday ko'rinadi?",
    "options": ["NULL qiymatlar bilan chiqadi", "Natijaga umuman kirmaydi (o'chib ketadi)", "Xatolik (Error) yuz beradi", "Bo'sh satrlar bo'lib chiqadi"],
    "correctAnswer": 1,
    "explanation": "INNER JOIN faqat har ikkala jadvalda ham shartga mos keladigan (kesishgan) qatorlarni qaytaradi. Mos kelmaganlar natijadan chiqarib tashlanadi."
  },
  {
    "id": 5,
    "question": "LEFT JOIN bilan bog'langanda chap jadvaldagi qator o'ng tomonda mos yozuvga ega bo'lmasa, o'ng jadval ustunlarida qanday qiymat hosil bo'ladi?",
    "options": ["0 (nol)", "Bo'sh satr ('')", "NULL", "Xato xabari"],
    "correctAnswer": 2,
    "explanation": "LEFT JOIN-da chap jadvaldagi barcha qatorlar chiqadi. Agar o'ng jadvalda bog'lanish shartiga mos qator topilmasa, o'ng jadval ustunlari uchun NULL qaytadi."
  },
  {
    "id": 6,
    "question": "PRIMARY KEY (Birlamchi kalit) relying ma'lumotlar bazasida qanday bo'lishi shart?",
    "options": ["Null bo'lishi mumkin", "Unikal (takrorlanmas) va NULL bo'lmagan qiymat bo'lishi shart", "Faqat matnli bo'lishi kerak", "Har doim 0 dan boshlanishi kerak"],
    "correctAnswer": 1,
    "explanation": "Primary Key jadvaldagi har bir qatorni unikal tarzda ajratib turishi uchun takrorlanmas va doimo qiymatga ega (NOT NULL) bo'lishi talab etiladi."
  },
  {
    "id": 7,
    "question": "FOREIGN KEY (Tashqi kalit) relied jadvalda qaysi ustunga murojaat qiladi (havola beradi)?",
    "options": ["Ixtiyoriy ustunga", "Boshqa jadvalning Primary Key (Birlamchi kalit) ustuniga", "Faqat birinchi ustunga", "Hech qanday ustunga bog'liq bo'lmaydi"],
    "correctAnswer": 1,
    "explanation": "Foreign Key relyatsion bog'lanish o'rnatish uchun boshqa jadvalning unikal Primary Key ustuniga havola beradi."
  },
  {
    "id": 8,
    "question": "Jadvallar orasidagi bog'lanish turlari (Relations) nechta?",
    "options": ["1 ta (Faqat One-to-One)", "3 ta (One-to-One, One-to-Many, Many-to-Many)", "5 ta", "Cheksiz ko'p"],
    "correctAnswer": 1,
    "explanation": "Standard relyatsion bazalarda 3 turdagi munosabat mavjud: Birga-bir (One-to-One), Birga-ko'p (One-to-Many) va Ko'pga-ko'p (Many-to-Many)."
  },
  {
    "id": 9,
    "question": "Jadval taxalluslari (Aliases) qaysi kalit so'z orqali yoki uning ishtirokisiz berilishi mumkin?",
    "options": ["AS", "LIKE", "ON", "JOIN"],
    "correctAnswer": 0,
    "explanation": "Jadval yoki ustunlarga taxallus berishda AS kalit so'zi ishlatiladi. Masalan: `users AS u` yoki shunchaki `users u`."
  },
  {
    "id": 10,
    "question": "Quyidagilardan qaysi biri relyatsion bazalarda jadvallar bog'lanishidagi 'Many-to-Many' (Ko'pga-ko'p) munosabatni amalga oshirishda ishlatiladi?",
    "options": ["Faqat bitta jadvalda ikkita Foreign Key", "Uchinchi bog'lovchi oraliq jadval (Junction/Pivot table)", "Hech qanday bog'lanish talab etilmaydi", "Faqat o'ng tomonlama bog'lanish (RIGHT JOIN)"],
    "correctAnswer": 1,
    "explanation": "Many-to-Many munosabatini relying bazalarda amalga oshirish uchun ikkala asosiy jadval Primary Key-lariga havola qiluvchi uchinchi bog'lovchi jadval (Junction/Pivot table) yaratiladi."
  },
  {
    "id": 11,
    "question": "RIGHT JOIN bilan chap tomonlama LEFT JOIN o'rtasidagi asosiy farq nimada?",
    "options": ["RIGHT JOIN tezroq ishlaydi", "RIGHT JOIN o'ng (ikkinchi) jadvaldagi barcha qatorlar chiqishini kafolatlaydi, LEFT JOIN esa chap (birinchi) jadval qatorlarini", "Hech qanday farqi yo'q", "LEFT JOIN faqat sonlarni bog'laydi"],
    "correctAnswer": 1,
    "explanation": "Ular yo'nalishi bo'yicha farq qiladi. `A LEFT JOIN B` va `B RIGHT JOIN A` so'rovlari mutlaqo bir xil natija beradi."
  },
  {
    "id": 12,
    "question": "Agar JOIN so'rovida ON sharti yozilmasa nima yuz beradi?",
    "options": ["SQL so'rovi xato berib to'xtaydi", "Jadvallar tasodifiy ulanadi", "Ikkala jadvalning barcha qatorlari bir-biriga ko'paytirilib Cartesian Product (CROSS JOIN) hosil bo'ladi", "Faqat birinchi qatorlar bog'lanadi"],
    "correctAnswer": 2,
    "explanation": "ON shartisiz jadvallar Cartesian ko'paytma (barcha kombinatsiyalar) bo'lib bog'lanadi. Bu juda katta natija qaytishiga va sekinlashishga olib keladi."
  }
]

};
