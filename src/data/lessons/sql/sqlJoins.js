export const sqlJoins = {
  id: "sqlJoins",
  title: "Jadvallarni Birlashtirish (JOINS)",
  language: "sql",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Jadvallarni Birlashtirish (JOINS) nima?
Relyatsion ma'lumotlar bazalarining (RDBMS) eng kuchli xususiyati — bu ma'lumotlarni turli jadvallarga bo'lib saqlash (Normalizatsiya) va so'rov paytida ularni bog'lab birlashtirish imkoniyatidir. Masalan, buyurtmalar jadvalida faqat foydalanuvchining ID si (\`user_id\`) saqlanadi. Lekin bizga hisobotda foydalanuvchining ismi (\`name\`) va u sotib olgan mahsulot nomi (\`product\`) birgalikda kerak bo'ladi. SQL-da buning uchun **JOIN** (Birlashtirish) operatorlaridan foydalaniladi.

### Real hayotiy analogiya
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
    "title": "Buyurtmalar va Ismlar (INNER JOIN)",
    "instruction": "`orders` jadvalini `users` jadvali bilan bog'lang (user_id va id orqali). Foydalanuvchining ismi (`name`), mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT users.name, orders.product, orders.amount FROM orders INNER JOIN users ON orders.user_id = users.id",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 6) return 'Jami 6 ta buyurtma qaytishi kerak'; if(result[0].name === undefined || result[0].product === undefined) return 'name va product ustunlarini tanlang'; return null;"
  },
  {
    "id": 2,
    "title": "Barcha foydalanuvchilar va buyurtmalar (LEFT JOIN)",
    "instruction": "`users` jadvalini `orders` jadvali bilan `LEFT JOIN` yordamida bog'lang. Foydalanuvchining ismi (`name`), mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT users.name, orders.product, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 7) return 'LEFT JOIN tufayli buyurtma bermagan foydalanuvchilar (masalan, Dilshod) ham chiqishi shart (jami 7 qator)'; return null;"
  },
  {
    "id": 3,
    "title": "Mahsulotlar va buyurtma summalari",
    "instruction": "`orders` jadvalidagi `product` ustunini `products` jadvalidagi `name` ustuniga bog'lang (`INNER JOIN`). Mahsulot nomi (`name`), toifasi (`category`) va buyurtma qilingan summasi (`amount`) ustunlarini tanlang.",
    "startingCode": "-- SQL so'rovini yozing\n",
    "hint": "SELECT p.name, p.category, o.amount FROM orders o INNER JOIN products p ON o.product = p.name",
    "test": "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Orders va Products jadvallarida mos keluvchi 3 ta mahsulot bor'; return null;"
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
