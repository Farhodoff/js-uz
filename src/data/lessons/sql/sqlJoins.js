export const sqlJoins = {
  id: "sqlJoins",
  title: "Jadvallarni Birlashtirish (JOINS)",
  language: "sql",
  theory: `## 1. NEGA kerak?
Relyatsion ma'lumotlar bazalarining (RDBMS) eng kuchli xususiyati — bu ma'lumotlarni turli jadvallarga bo'lib saqlash (Normalizatsiya) va so'rov paytida ularni bog'lab birlashtirish imkoniyatidir. Masalan, buyurtmalar jadvalida faqat foydalanuvchining ID si (\`user_id\`) saqlanadi. Lekin bizga hisobotda foydalanuvchining ismi (\`name\`) va uning qaysi mahsulotni buyurtma qilgani (\`product\`) birgalikda kerak bo'ladi. SQL-da buning uchun **JOIN** (Birlashtirish) operatorlaridan foydalaniladi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, sizda ikkita ro'yxat bor:
1. **O'quvchilar ro'yxati**: har bir o'quvchining ID si va ismi bor.
2. **To'garaklar ro'yxati**: to'garak nomi va unga qatnashayotgan o'quvchining ID si bor.
- **INNER JOIN**: faqat to'garakka qatnashadigan o'quvchilarni va ularning to'garaklarini ko'rsatadi (kesishgan qismi).
- **LEFT JOIN**: barcha o'quvchilarni ko'rsatagi, agar o'quvchi to'garakka qatnashmasa, to'garak nomi bo'sh (null) bo'lib chiqadi.

## 3. STRUKTURA
Jadvallarni birlashtirish uchun ularning orasidagi bog'lovchi kalit (foreign key) ko'rsatilishi shart (**ON** bloki orqali):
\`\`\`sql
SELECT j1.ustun, j2.ustun
FROM jadval1 j1
[JOIN turi] JOIN jadval2 j2
ON j1.umumiy_kalit = j2.umumiy_kalit;
\`\`\`

JOIN turlari:
1. **\`INNER JOIN\`**: Ikkala jadvalda ham mos keluvchi qiymatlarga ega bo'lgan qatorlarni qaytaradi.
2. **\`LEFT JOIN (yoki LEFT OUTER JOIN)\`**: Chap (birinchi) jadvaldagi barcha qatorlarni va o'ng jadvaldagi mos keluvchi qatorlarni qaytaradi. Mos kelmagan o'ng ustunlar uchun NULL chiqadi.
3. **\`RIGHT JOIN\`**: O'ng (ikkinchi) jadvaldagi barcha qatorlarni va chap jadvaldagi mos qatorlarni qaytaradi.
4. **\`FULL JOIN\`**: Ikkala jadvaldan birida mos keluvchi bo'lsa barcha qatorlarni qaytaradi.

## 4. AMALIYOT
Mock jadvallarimiz bo'yicha jadvallarni bog'lash:

### Ichki birlashtirish (INNER JOIN)
Buyurtma bergan foydalanuvchining ismi va u sotib olgan mahsulot nomi:
\`\`\`sql
SELECT u.name, o.product 
FROM orders o
INNER JOIN users u ON o.user_id = u.id;
\`\`\`

### Chap tomonlama birlashtirish (LEFT JOIN)
Barcha foydalanuvchilar va ularning buyurtmalari (buyurtma bermaganlar ham chiqadi, ularning buyurtma ma'lumotlari null bo'ladi):
\`\`\`sql
SELECT u.name, o.product, o.amount 
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Bog'lovchi ON shartini unutish**: Agar \`ON u.id = o.user_id\` shartini yozmasangiz, SQL har bir qatorni har bir qator bilan ko'paytirib yuboradi (Cartesian Product / CROSS JOIN), bu esa juda katta xato natija va sekinlashishga olib keladi.
2. **Ustun nomlarining chalkashishi**: Agar ikkala jadvalda ham bir xil nomli ustun bo'lsa (masalan, \`id\`), SQL qaysi jadvaldan olishni bilmaydi (Ambiguous column name). Shuning uchun doim jadval taxalluslarini (Aliases) ishlating: \`u.id\` va \`o.id\`.

## 6. SAVOLLAR VA JAVOBLAR
**1. \`JOIN\` va \`INNER JOIN\` farqi nimada?**
Hech qanday farqi yo'q. Standard SQL-da shunchaki \`JOIN\` deb yozilsa, sukut bo'yicha \`INNER JOIN\` deb tushuniladi.

**2. Jadval taxallusi (Table Alias) nima?**
So'rovni qisqa va o'qishli qilish uchun jadval nomiga beriladigan vaqtincha harfli qisqartma (masalan, \`FROM users u\`).

**3. Primary Key va Foreign Key farqi nima?**
\`Primary Key\` — jadvaldagi har bir qatorni unikal identifikatsiya qiluvchi ustun (masalan, \`users.id\`). \`Foreign Key\` — ikkinchi jadvaldagi Primary Key-ga havola qiluvchi va jadvallarni bog'lovchi ustun (masalan, \`orders.user_id\`).
`,
  exercises: [
    {
      id: 1,
      title: "Buyurtmalar va Ismlar (INNER JOIN)",
      instruction: "`orders` jadvalini `users` jadvali bilan bog'lang (user_id va id orqali). Foydalanuvchining ismi (`name`), mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT users.name, orders.product, orders.amount FROM orders INNER JOIN users ON orders.user_id = users.id",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 6) return 'Jami 6 ta buyurtma qaytishi kerak'; if(result[0].name === undefined || result[0].product === undefined) return 'name va product ustunlarini tanlang'; return null;"
    },
    {
      id: 2,
      title: "Barcha foydalanuvchilar va buyurtmalar (LEFT JOIN)",
      instruction: "`users` jadvalini `orders` jadvali bilan `LEFT JOIN` yordamida bog'lang. Foydalanuvchining ismi (`name`), mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT users.name, orders.product, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 7) return 'LEFT JOIN tufayli buyurtma bermagan foydalanuvchilar (masalan, Dilshod) ham chiqishi shart (jami 7 qator)'; return null;"
    },
    {
      id: 3,
      title: "Mahsulotlar va buyurtma summalari",
      instruction: "`orders` jadvalidagi `product` ustunini `products` jadvalidagi `name` ustuniga bog'lang (`INNER JOIN`). Mahsulot nomi (`name`), toifasi (`category`) va buyurtma qilingan summasi (`amount`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT p.name, p.category, o.amount FROM orders o INNER JOIN products p ON o.product = p.name",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Orders va Products jadvallarida mos keluvchi 3 ta mahsulot bor'; return null;"
    },
    {
      id: 4,
      title: "Foydalanuvchilar va mahsulotlar (LEFT JOIN)",
      instruction: "`users` jadvalini `orders` jadvali bilan `LEFT JOIN` yordamida bog'lab, foydalanuvchining ismi (`name`) va u sotib olgan mahsulot (`product`) ustunlarini oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT users.name, orders.product FROM users LEFT JOIN orders ON users.id = orders.user_id",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 7) return 'LEFT JOIN natijasida 7 qator qaytishi kerak'; return null;"
    },
    {
      id: 5,
      title: "Buyurtmalar tafsiloti (Products va Orders INNER JOIN)",
      instruction: "`orders` jadvalini `products` jadvali bilan mahsulot nomi orqali (`product` va `name`) `INNER JOIN` qiling va buyurtma ID si (`id`), mahsulot narxi (`price`) va ombor qoldig'i (`stock`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT orders.id, products.price, products.stock FROM orders INNER JOIN products ON orders.product = products.name",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Jami 3 ta mos mahsulot buyurtma berilgan'; if(result[0].price === undefined) return 'price va stock ustunlarini tanlang'; return null;"
    },
    {
      id: 6,
      title: "Menejerlarning buyurtmalari (INNER JOIN)",
      instruction: "`orders` jadvalini `users` jadvali bilan bog'lang (`INNER JOIN`). Roli (`role`) 'Manager' bo'lgan foydalanuvchilarning ismi (`name`), mahsulot (`product`) va summasi (`amount`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT u.name, o.product, o.amount FROM orders o INNER JOIN users u ON o.user_id = u.id WHERE u.role = 'Manager'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Madina') return 'Faqat menejer Madinaga tegishli 1 ta buyurtma bor'; return null;"
    },
    {
      id: 7,
      title: "Toshkentliklarning buyurtmalari",
      instruction: "`users` jadvalini `orders` jadvali bilan `INNER JOIN` bog'lab, shahri (`city`) 'Toshkent' bo'lgan foydalanuvchilarning ismi (`name`), mahsulot (`product`) va yuborilgan sana (`order_date`) ustunlarini oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT u.name, o.product, o.order_date FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE u.city = 'Toshkent'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Toshkentlik foydalanuvchilarga tegishli 3 ta buyurtma bor (Ali: 2 ta, Sardor: 1 ta)'; return null;"
    },
    {
      id: 8,
      title: "Yirik buyurtma bergan foydalanuvchilar",
      instruction: "`orders` jadvalini `users` jadvali bilan `INNER JOIN` bog'lang. Buyurtma summasi (`amount`) 500 dan katta bo'lgan foydalanuvchilarning ismi (`name`), mahsulot (`product`) va summasi (`amount`) ustunlarini oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT u.name, o.product, o.amount FROM orders o INNER JOIN users u ON o.user_id = u.id WHERE o.amount > 500",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Summasi 500 dan katta 2 ta buyurtma bor (Laptop va Phone)'; return null;"
    },
    {
      id: 9,
      title: "Buyurtma bermagan foydalanuvchilar",
      instruction: "`users` jadvalini `orders` jadvali bilan `LEFT JOIN` bog'lang. Faqat buyurtma bermagan foydalanuvchilarni topish uchun WHERE shartida `orders.id IS NULL` tekshiruvini ishlating.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT u.name, o.id FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.id IS NULL",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Dilshod') return 'Faqat Dilshod buyurtma bermagan'; return null;"
    },
    {
      id: 10,
      title: "Mahsulotlar ombori va buyurtmalar",
      instruction: "`orders` jadvalini `products` jadvali bilan mahsulot nomi orqali bog'lab (`INNER JOIN`), ombor qoldig'i (`stock`) 15 dan ko'p bo'lgan mahsulotlar buyurtmalarining ID si (`id`) va mahsulot nomini (`product`) oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT o.id, o.product FROM orders o INNER JOIN products p ON o.product = p.name WHERE p.stock > 15",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Qoldig\\'i 15 dan ko\\'p bo\\'lgan mahsulot buyurtmalari 2 ta (Phone va Mouse)'; return null;"
    },
    {
      id: 11,
      title: "Har bir foydalanuvchining buyurtmalar soni (JOIN + GROUP BY)",
      instruction: "`users` jadvalini `orders` jadvali bilan `LEFT JOIN` yordamida bog'lang. Har bir foydalanuvchining ismi (`name`) va unga tegishli buyurtmalar sonini (`COUNT(orders.id)`) guruhlab (`GROUP BY users.name`) oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Barcha 5 ta foydalanuvchi chiqishi kerak'; return null;"
    },
    {
      id: 12,
      title: "Har bir foydalanuvchining jami xarajati (JOIN + GROUP BY)",
      instruction: "`users` jadvalini `orders` jadvali bilan `INNER JOIN` bog'lang. Har bir foydalanuvchining ismi (`name`) va jami buyurtma summasi (`SUM(orders.amount)`) ni guruhlab tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT u.name, SUM(o.amount) FROM users u INNER JOIN orders o ON u.id = o.user_id GROUP BY u.name",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Buyurtma bergan 4 ta foydalanuvchi chiqishi kerak'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Ikkala jadvalda ham faqat shartga mos keluvchi o'zaro bog'langan qatorlarni qaytaradigan JOIN turi qaysi?",
      options: ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"],
      correctAnswer: 1,
      explanation: "INNER JOIN faqat ikkala jadvalda ham mos kalitga ega bo'lgan qatorlar kesishmasini (intersection) qaytaradi."
    },
    {
      id: 2,
      question: "Chap jadvaldagi barcha qatorlarni va o'ng jadvaldagi faqat mos kelgan qatorlarni qaytaruvchi JOIN qaysi?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "UNION"],
      correctAnswer: 1,
      explanation: "LEFT JOIN chap (boshlang'ich) jadvaldagi barcha ma'lumotlarni kafolatlangan holda chiqaradi, o'ng jadvalda moslik bo'lmasa NULL qo'yadi."
    },
    {
      id: 3,
      question: "Jadvallarni birlashtirishda bog'lanish ustunlarini ko'rsatish uchun qaysi kalit so'z ishlatiladi?",
      options: ["WHERE", "ON", "USING", "IN"],
      correctAnswer: 1,
      explanation: "JOIN shartini yozish uchun ON kalit so'zi ishlatiladi (masalan, JOIN orders ON users.id = orders.user_id)."
    },
    {
      id: 4,
      question: "INNER JOIN bog'lanishida chap va o'ng jadvallarda mos kelmagan qatorlar natijada qanday ko'rinadi?",
      options: ["NULL qiymatlar bilan chiqadi", "Natijaga umuman kirmaydi (o'chib ketadi)", "Xatolik (Error) yuz beradi", "Bo'sh satrlar bo'lib chiqadi"],
      correctAnswer: 1,
      explanation: "INNER JOIN faqat har ikkala jadvalda ham shartga mos keladigan (kesishgan) qatorlarni qaytaradi. Mos kelmaganlar natijadan chiqarib tashlanadi."
    },
    {
      id: 5,
      question: "LEFT JOIN bilan bog'langanda chap jadvaldagi qator o'ng tomonda mos yozuvga ega bo'lmasa, o'ng jadval ustunlarida qanday qiymat hosil bo'ladi?",
      options: ["0 (nol)", "Bo'sh satr ('')", "NULL", "Xato xabari"],
      correctAnswer: 2,
      explanation: "LEFT JOIN-da chap jadvaldagi barcha qatorlar chiqadi. Agar o'ng jadvalda bog'lanish shartiga mos qator topilmasa, o'ng jadval ustunlari uchun NULL qaytadi."
    },
    {
      id: 6,
      question: "PRIMARY KEY (Birlamchi kalit) relying ma'lumotlar bazasida qanday bo'lishi shart?",
      options: ["Null bo'lishi mumkin", "Unikal (takrorlanmas) va NULL bo'lmagan qiymat bo'lishi shart", "Faqat matnli bo'lishi kerak", "Har doim 0 dan boshlanishi kerak"],
      correctAnswer: 1,
      explanation: "Primary Key jadvaldagi har bir qatorni unikal tarzda ajratib turishi uchun takrorlanmas va doimo qiymatga ega (NOT NULL) bo'lishi talab etiladi."
    },
    {
      id: 7,
      question: "FOREIGN KEY (Tashqi kalit) relied jadvalda qaysi ustunga murojaat qiladi (havola beradi)?",
      options: ["Ixtiyoriy ustunga", "Boshqa jadvalning Primary Key (Birlamchi kalit) ustuniga", "Faqat birinchi ustunga", "Hech qanday ustunga bog'liq bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Foreign Key relyatsion bog'lanish o'rnatish uchun boshqa jadvalning unikal Primary Key ustuniga havola beradi."
    },
    {
      id: 8,
      question: "Jadvallar orasidagi bog'lanish turlari (Relations) nechta?",
      options: ["1 ta (Faqat One-to-One)", "3 ta (One-to-One, One-to-Many, Many-to-Many)", "5 ta", "Cheksiz ko'p"],
      correctAnswer: 1,
      explanation: "Standard relyatsion bazalarda 3 turdagi munosabat mavjud: Birga-bir (One-to-One), Birga-ko'p (One-to-Many) va Ko'pga-ko'p (Many-to-Many)."
    },
    {
      id: 9,
      question: "Jadval taxalluslari (Aliases) qaysi kalit so'z orqali yoki uning ishtirokisiz berilishi mumkin?",
      options: ["AS", "LIKE", "ON", "JOIN"],
      correctAnswer: 0,
      explanation: "Jadval yoki ustunlarga taxallus berishda AS kalit so'zi ishlatiladi. Masalan: `users AS u` yoki shunchaki `users u`."
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri relyatsion bazalarda jadvallar bog'lanishidagi 'Many-to-Many' (Ko'pga-ko'p) munosabatni amalga oshirishda ishlatiladi?",
      options: ["Faqat bitta jadvalda ikkita Foreign Key", "Uchinchi bog'lovchi oraliq jadval (Junction/Pivot table)", "Hech qanday bog'lanish talab etilmaydi", "Faqat o'ng tomonlama bog'lanish (RIGHT JOIN)"],
      correctAnswer: 1,
      explanation: "Many-to-Many munosabatini relying bazalarda amalga oshirish uchun ikkala asosiy jadval Primary Key-lariga havola qiluvchi uchinchi bog'lovchi jadval (Junction/Pivot table) yaratiladi."
    },
    {
      id: 11,
      question: "RIGHT JOIN bilan chap tomonlama LEFT JOIN o'rtasidagi asosiy farm nimada?",
      options: ["RIGHT JOIN tezroq ishlaydi", "RIGHT JOIN o'ng (ikkinchi) jadvaldagi barcha qatorlar chiqishini kafolatlaydi, LEFT JOIN esa chap (birinchi) jadval qatorlarini", "Hech qanday farqi yo'q", "LEFT JOIN faqat sonlarni bog'laydi"],
      correctAnswer: 1,
      explanation: "Ular yo'nalishi bo'yicha farq qiladi. `A LEFT JOIN B` va `B RIGHT JOIN A` so'rovlari mutlaqo bir xil natija beradi."
    },
    {
      id: 12,
      question: "Agar JOIN so'rovida ON sharti yozilmasa nima yuz beradi?",
      options: ["SQL so'rovi xato berib to'xtaydi", "Jadvallar tasodifiy ulanadi", "Ikkala jadvalning barcha qatorlari bir-biriga ko'paytirilib Cartesian Product (CROSS JOIN) hosil bo'ladi", "Faqat birinchi qatorlar bog'lanadi"],
      correctAnswer: 2,
      explanation: "ON shartisiz jadvallar Cartesian ko'paytma (barcha kombinatsiyalar) bo'lib bog'lanadi. Bu juda katta natija qaytishiga va sekinlashishga olib keladi."
    }
  ]
};
