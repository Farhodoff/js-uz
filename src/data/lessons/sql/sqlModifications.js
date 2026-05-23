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
    }
  ]
};
