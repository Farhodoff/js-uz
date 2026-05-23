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
    }
  ]
};
