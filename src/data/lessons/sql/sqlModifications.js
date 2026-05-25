export const sqlModifications = {
  id: "sqlModifications",
  title: "Ma'lumotlarni O'zgartirish (INSERT, UPDATE, DELETE)",
  language: "sql",
  theory: `## 1. NEGA kerak?
Ma'lumotlar bazasi faqatgina o'qish (SELECT) uchun ishlatilmaydi. Ilovangizda yangi foydalanuvchi ro'yxatdan o'tganda, u o'z profil ma'lumotlarini o'zgartirganda yoki hisobini o'chirganda siz ma'lumotlar bazasini o'zgartirishingiz kerak. Buning uchun SQL-da **DML (Data Manipulation Language)** amallari: **INSERT** (qo'shish), **UPDATE** (yangilash) va **DELETE** (o'chirish) buyruqlari xizmat qiladi.

## 2. SODDALIK (Analogiya)
- **INSERT**: Daftarning yangi bo'sh varag'iga yangi foydalanuvchi ma'lumotlarini qator qilib yozib qo'yish.
- **UPDATE**: Daftardagi yozilgan qatorning biror qiymatini (masalan, yashash joyini) o'chirgich bilan o'chirib, yangisini yozish.
- **DELETE**: Daftardagi biror qatorning ustidan butunlay chiziq tortib (yoki o'chirib) tashlash.

## 3. STRUKTURA

### INSERT INTO (Qo'shish)
Yangi qator qo'shish uchun jadval nomi, ustunlar ro'yxati va ularga mos qiymatlar ko'rsatiladi:
\`\`\`sql
INSERT INTO jadval_nomi (ustun1, ustun2) 
VALUES (qiymat1, qiymat2);
\`\`\`

### UPDATE (Yangilash)
Mavjud qatorlarni o'zgartirish uchun ishlatiladi. **DIQQAT**: Qaysi qatorlarni yangilashni belgilash uchun doimo **WHERE** sharti kerak!
\`\`\`sql
UPDATE jadval_nomi 
SET ustun1 = qiymat1, ustun2 = qiymat2
WHERE shart;
\`\`\`

### DELETE (O'chirish)
Qatorlarni butunlay o'chirish. **DIQQAT**: Qaysi qatorlarni o'chirishni belgilash uchun doimo **WHERE** shartidan foydalaniladi!
\`\`\`sql
DELETE FROM jadval_nomi 
WHERE shart;
\`\`\`

## 4. AMALIYOT
Mock jadvallarimiz bo'yicha ma'lumotlarni o'zgartirish namunalari:

### Yangi foydalanuvchi qo'shish (INSERT)
\`\`\`sql
INSERT INTO users (id, name, age, city, role) 
VALUES (6, 'Jasur', 27, 'Farg''ona', 'User');
\`\`\`

### Foydalanuvchi ma'lumotlarini yangilash (UPDATE)
Ali ismli foydalanuvchining shahrini 'Buxoro'ga o'zgartirish:
\`\`\`sql
UPDATE users 
SET city = 'Buxoro' 
WHERE name = 'Ali';
\`\`\`

### Foydalanuvchini o'chirish (DELETE)
ID si 5 bo'lgan foydalanuvchini o'chirish:
\`\`\`sql
DELETE FROM users 
WHERE id = 5;
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **UPDATE va DELETE amallarida WHERE shartini yozishni unutish**: Agar \`UPDATE users SET city = 'Toshkent'\` deb WHERE shartisiz yozsangiz, bazadagi **barcha** foydalanuvchilarning shahri Toshkent bo'lib qoladi! Agar \`DELETE FROM users\` deb yozsangiz, jadvaldagi barcha ma'lumotlar o'chib ketadi! Bu real loyihalarda juda katta halokatga (data loss) olib keladi.
2. **Qiymatlar tartibini adashtirish**: INSERT so'rovida ustunlar tartibi bilan VALUES qismidagi qiymatlar tartibi va turlari mutlaqo mos kelishi shart.

## 6. SAVOLLAR VA JAVOBLAR
**1. UPDATE so'rovida bir vaqtning o'zida bir nechta ustunni o'zgartirsa bo'ladimi?**
Ha, ustunlarni vergul bilan ajratgan holda yozish orqali. Masalan: \`SET city = 'Toshkent', age = 30\`.

**2. \`DELETE\` va \`DROP TABLE\` farqi nima?**
\`DELETE\` faqat jadval ichidagi qatorlarni o'chiradi (jadval strukturasi saqlanib qoladi). \`DROP TABLE\` esa butun jadvalni va uning strukturasini bazadan to'liq yo'q qiladi.

**3. O'chirilgan ma'lumotlarni qaytarish mumkinmi?**
Oddiy SQL so'rovi bajarilgandan so'ng ma'lumotlar qaytmaydi. Tranzaksiyalar (Transactions) ishlatilganda, xato bo'lsa \`ROLLBACK\` qilish mumkin. Shuning uchun o'chirish amallarida ehtiyot bo'lish shart.
`,
  exercises: [
    {
      id: 1,
      title: "Yangi foydalanuvchi qo'shish",
      instruction: "`users` jadvaliga yangi foydalanuvchi qo'shing. Qiymatlar: `id` = 6, `name` = 'Jasur', `age` = 24, `city` = 'Xiva', `role` = 'User'.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "INSERT INTO users (id, name, age, city, role) VALUES (6, 'Jasur', 24, 'Xiva', 'User')",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec('SELECT * FROM users WHERE id = 6'); if(check.length !== 1 || check[0].name !== 'Jasur') return 'Jasur foydalanuvchisi qo\\'shilmadi'; return null;"
    },
    {
      id: 2,
      title: "Yoshni yangilash (UPDATE)",
      instruction: "`users` jadvalidan `name` qiymati 'Sardor' bo'lgan foydalanuvchining yoshini (`age`) 23 ga o'zgartiring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "UPDATE users SET age = 23 WHERE name = 'Sardor'",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT age FROM users WHERE name = 'Sardor'\"); if(check.length === 0 || check[0].age !== 23) return 'Sardorning yoshi yangilanmadi'; return null;"
    },
    {
      id: 3,
      title: "Menejerni o'chirish (DELETE)",
      instruction: "`users` jadvalidan roli `Manager` bo'lgan barcha foydalanuvchilarni o'chirib tashlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "DELETE FROM users WHERE role = 'Manager'",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT * FROM users WHERE role = 'Manager'\"); if(check.length !== 0) return 'Menejer o\\'chmadi'; return null;"
    },
    {
      id: 4,
      title: "Yangi mahsulot qo'shish",
      instruction: "`products` jadvaliga yangi mahsulot qo'shing. Qiymatlar: `id` = 6, `name` = 'Table', `category` = 'Furniture', `price` = 200.00, `stock` = 8.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "INSERT INTO products (id, name, category, price, stock) VALUES (6, 'Table', 'Furniture', 200.00, 8)",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT * FROM products WHERE id = 6\"); if(check.length !== 1 || check[0].name !== 'Table') return 'Mahsulot qo\\'shilmadi'; return null;"
    },
    {
      id: 5,
      title: "Foydalanuvchining shahrini o'zgartirish",
      instruction: "`users` jadvalida Madinaning (`name` = 'Madina') shahrini (`city`) 'Navoiy'ga o'zgartiring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "UPDATE users SET city = 'Navoiy' WHERE name = 'Madina'",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT city FROM users WHERE name = 'Madina'\"); if(check.length === 0 || check[0].city !== 'Navoiy') return 'Madinaning shahri yangilanmadi'; return null;"
    },
    {
      id: 6,
      title: "Buyurtmani o'chirish",
      instruction: "`orders` jadvalidan `id` qiymati 103 bo'lgan buyurtmani o'chirib tashlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "DELETE FROM orders WHERE id = 103",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT * FROM orders WHERE id = 103\"); if(check.length !== 0) return 'Buyurtma o\\'chmadi'; return null;"
    },
    {
      id: 7,
      title: "Narxlarni oshirish",
      instruction: "Elektronika (`category` = 'Electronics') turidagi barcha mahsulotlarning narxini (`price`) 10% ga oshiring (ya'ni 1.1 ga ko'paytiring).",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "UPDATE products SET price = price * 1.1 WHERE category = 'Electronics'",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT price FROM products WHERE category = 'Electronics'\"); if(check.length === 0 || Math.abs(check[0].price - 1320.00) > 0.01) return 'Elektronika mahsulotlarining narxi to\\'g\\'ri oshirilmadi'; return null;"
    },
    {
      id: 8,
      title: "Yangi buyurtma qo'shish",
      instruction: "`orders` jadvaliga yangi buyurtma qo'shing. Qiymatlar: `id` = 107, `user_id` = 2, `product` = 'Desk', `amount` = 150.00, `order_date` = '2026-05-07'.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "INSERT INTO orders (id, user_id, product, amount, order_date) VALUES (107, 2, 'Desk', 150.00, '2026-05-07')",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT * FROM orders WHERE id = 107\"); if(check.length !== 1 || check[0].product !== 'Desk') return 'Buyurtma qo\\'shilmadi'; return null;"
    },
    {
      id: 9,
      title: "Ombor qoldig'ini kamaytirish",
      instruction: "`products` jadvalidan Desk (`name` = 'Desk') mahsulotining ombor qoldig'ini (`stock`) 1 taga kamaytiring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "UPDATE products SET stock = stock - 1 WHERE name = 'Desk'",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT stock FROM products WHERE name = 'Desk'\"); if(check.length === 0 || check[0].stock !== 4) return 'Ombor qoldig\\'i kamaytirilmadi'; return null;"
    },
    {
      id: 10,
      title: "Kam miqdordagi buyurtmalarni o'chirish",
      instruction: "`orders` jadvalidan buyurtma summasi (`amount`) 30 dan kichik bo'lgan barcha buyurtmalarni o'chiring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "DELETE FROM orders WHERE amount < 30",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT * FROM orders WHERE amount < 30\"); if(check.length !== 0) return 'Kichik summadagi buyurtmalar o\\'chirilmadi'; return null;"
    },
    {
      id: 11,
      title: "Ko'p ustunlarni yangilash",
      instruction: "`users` jadvalida Ali (`name` = 'Ali') foydalanuvchisining yoshini (`age`) 26 ga va rolini (`role`) 'Superadmin'ga o'zgartiring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "UPDATE users SET age = 26, role = 'Superadmin' WHERE name = 'Ali'",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT age, role FROM users WHERE name = 'Ali'\"); if(check.length === 0 || check[0].age !== 26 || check[0].role !== 'Superadmin') return 'Foydalanuvchi ma\\'lumotlari to\\'g\\'ri yangilanmadi'; return null;"
    },
    {
      id: 12,
      title: "Muayyan sanadagi buyurtmalarni o'chirish",
      instruction: "`orders` jadvalidan buyurtma sanasi (`order_date`) '2026-05-03' bo'lgan buyurtmani o'chiring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "DELETE FROM orders WHERE order_date = '2026-05-03'",
      test: "if(!Array.isArray(result) && typeof result !== 'number') return 'Xatolik yuz berdi'; const check = db.exec(\"SELECT * FROM orders WHERE order_date = '2026-05-03'\"); if(check.length !== 0) return 'Belgilangan sanadagi buyurtma o\\'chirilmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Mavjud ma'lumotlarni o'zgartirish (tahrirlash) uchun qaysi SQL buyrug'i ishlatiladi?",
      options: ["INSERT", "UPDATE", "CHANGE", "MODIFY"],
      correctAnswer: 1,
      explanation: "Mavjud qatorlardagi qiymatlarni yangilash yoki o'zgartirish uchun UPDATE buyrug'i ishlatiladi."
    },
    {
      id: 2,
      question: "UPDATE yoki DELETE so'rovlarida WHERE shartini yozish unutilsa nima sodir bo'ladi?",
      options: [
        "Faqat birinchi qator o'zgaradi / o'chadi",
        "Loyiha xatolik berib to'xtaydi va hech narsa o'zgarmaydi",
        "Jadvaldagi barcha qatorlar o'zgaradi / o'chadi",
        "Oxirgi qo'shilgan qator o'zgaradi"
      ],
      correctAnswer: 2,
      explanation: "WHERE sharti yozilmasa, buyruq butun jadval bo'yicha qo'llaniladi. Bu barcha ma'lumotlarning o'zgarishi yoki o'chib ketishiga olib keladi."
    },
    {
      id: 3,
      question: "Jadvalga yangi qator kiritish uchun to'g'ri sintaksis qaysi?",
      options: [
        "INSERT INTO users VALUES (name, age) VALUES ('Ali', 20)",
        "INSERT INTO users (name, age) VALUES ('Ali', 20)",
        "UPDATE users ADD (name = 'Ali', age = 20)",
        "INSERT INTO users SET name = 'Ali', age = 20"
      ],
      correctAnswer: 1,
      explanation: "Standard INSERT sintaksisi: INSERT INTO jadval (ustunlar) VALUES (qiymatlar) ko'rinishida bo'ladi."
    },
    {
      id: 4,
      question: "INSERT INTO jadval_nomi VALUES (...) so'rovida ustunlar nomlari yozilmasa nima bo'ladi?",
      options: [
        "Xatolik yuz beradi, ustun nomlari yozilishi shart",
        "Qiymatlar jadvaldagi barcha ustunlarga tartib bo'yicha to'liq va mos ravishda kiritilishi kerak",
        "Faqat birinchi ustunga ma'lumot yoziladi",
        "Jadvaldagi tasodifiy ustunlarga yoziladi"
      ],
      correctAnswer: 1,
      explanation: "Jadval ustunlari ko'rsatilmaganda, VALUES qismidagi qiymatlar jadvalning barcha ustunlariga yaratilgan tartibda mos ravishda taqdim etilishi kerak."
    },
    {
      id: 5,
      question: "Bitta UPDATE so'rovida bir nechta ustun qiymatini o'zgartirish uchun ular qanday ajratiladi?",
      options: [
        "AND kalit so'zi bilan",
        "Vergul (,) belgisi bilan",
        "Nuqtali vergul (;) bilan",
        "OR kalit so'zi bilan"
      ],
      correctAnswer: 1,
      explanation: "UPDATE so'rovida bir nechta ustunlarni yangilashda SET ustun1 = qiymat1, ustun2 = qiymat2 ko'rinishida vergul bilan ajratiladi."
    },
    {
      id: 6,
      question: "Jadvaldagi barcha ma'lumotlarni o'chirish uchun qaysi so'rov ishlatiladi (lekin jadval strukturasini saqlab qoladi)?",
      options: [
        "DROP TABLE jadval_nomi",
        "DELETE FROM jadval_nomi",
        "REMOVE TABLE jadval_nomi",
        "CLEAR jadval_nomi"
      ],
      correctAnswer: 1,
      explanation: "DELETE FROM jadval_nomi so'rovi shartsiz (WHERE-siz) bajarilsa, jadvaldagi barcha qatorlar o'chib ketadi, lekin jadvalning o'zi va ustunlari o'chmaydi."
    },
    {
      id: 7,
      question: "UPDATE so'rovida SET kalit so'zi nima vazifani bajaradi?",
      options: [
        "Filtrlash shartini o'rnatadi",
        "Yangilanadigan ustunlar va ularning yangi qiymatlarini belgilaydi",
        "Qatorlarni o'chirish uchun ishlatiladi",
        "Natijalarni saralaydi"
      ],
      correctAnswer: 1,
      explanation: "SET kalit so'zi yangilanadigan ustun(lar) nomini va ularga beriladigan yangi qiymat(lar)ni ko'rsatish uchun ishlatiladi."
    },
    {
      id: 8,
      question: "INSERT buyrug'ida VALUES ichiga yoziladigan matnli ma'lumotlar qanday yoziladi?",
      options: [
        "Qavssiz va tirnoqsiz",
        "Bir tirnoq (') ichida",
        "Kvadrat qavs [ ] ichida",
        "Faqat katta harflar bilan"
      ],
      correctAnswer: 1,
      explanation: "SQL standartiga ko'ra har qanday string (matn) qiymati bir tirnoq ichida yozilishi shart."
    },
    {
      id: 9,
      question: "DELETE FROM users WHERE age IS NULL so'rovi nima qiladi?",
      options: [
        "Yoshi 0 bo'lgan foydalanuvchilarni o'chiradi",
        "Yoshi ko'rsatilmagan (NULL bo'lgan) foydalanuvchilarni o'chiradi",
        "Barcha foydalanuvchilarni o'chiradi",
        "Haqiqiy foydalanuvchilarni saqlab, qolganlarini o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "IS NULL operatori qiymat mavjud bo'lmagan (bo'sh) qatorlarni aniqlaydi. Ushbu so'rov yoshi NULL bo'lgan foydalanuvchilarni o'chiradi."
    },
    {
      id: 10,
      question: "TRUNCATE TABLE va DELETE FROM farqi nimada?",
      options: [
        "TRUNCATE jadvalni butunlay o'chiradi (DROP kabi), DELETE esa qatorlarni",
        "TRUNCATE tezroq ishlaydi, tranzaksiya jurnallarini kamroq yozadi va WHERE shartini qabul qilmaydi",
        "DELETE faqat bitta qatorni o'chira oladi, TRUNCATE esa ko'p qatorni",
        "Ular o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "TRUNCATE yirik jadvallardagi barcha ma'lumotlarni juda tez o'chirish uchun mo'ljallangan, WHERE shartini qo'llab-quvvatlamaydi va DELETE kabi qatorlar bo'yicha triggerlarni ishga tushirmaydi."
    },
    {
      id: 11,
      question: "Jadvalga bir vaqtning o'zida bir nechta yangi qator kiritish mumkinmi?",
      options: [
        "Yo'q, har bir INSERT so'rovi faqat bitta qator kiritadi",
        "Ha, VALUES qismidan keyin qavslarni vergul bilan ajratib yozish orqali",
        "Faqat UPDATE so'rovi orqali ko'p qator kiritish mumkin",
        "Ha, faqat maxsus MULTI INSERT buyrug'i orqali"
      ],
      correctAnswer: 1,
      explanation: "Ko'pgina SQL tizimlarida INSERT INTO jadval (...) VALUES (...), (...), (...) ko'rinishida bir so'rov bilan ko'plab qatorlarni qo'shish mumkin."
    },
    {
      id: 12,
      question: "UPDATE users SET age = age + 1 so'rovi nima ish bajaradi?",
      options: [
        "Faqat birinchi foydalanuvchining yoshini 1 taga oshiradi",
        "Barcha foydalanuvchilarning yoshini 1 taga oshiradi",
        "Xatolik beradi, chunki o'ng tomonda ustun nomi yozilgan",
        "Yangi foydalanuvchi qo'shadi va uning yoshini 1 qiladi"
      ],
      correctAnswer: 1,
      explanation: "WHERE sharti ko'rsatilmagani sababli, ushbu so'rov jadvaldagi barcha foydalanuvchilarning yoshini (`age`) 1 taga oshiradi."
    }
  ]
};
