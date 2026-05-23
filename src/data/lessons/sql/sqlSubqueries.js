export const sqlSubqueries = {
  id: "sqlSubqueries",
  title: "Ichma-ich So'rovlar (Subqueries)",
  language: "sql",
  theory: `## 1. NEGA kerak?
Ba'zida so'rovni bajarish uchun kerak bo'ladigan shart boshqa bir so'rovning natijasiga bog'liq bo'ladi. Masalan, "O'rtacha buyurtma miqdoridan qimmatroq bo'lgan barcha buyurtmalarni topish" kerak. Buning uchun avval o'rtacha buyurtma miqdorini aniqlash, so'ngra shu qiymatdan katta buyurtmalarni filtrlash lozim. SQL-da buni bitta so'rov ichida ikkinchi so'rovni joylashtirish — **Subquery** (Ichma-ich so'rov) yordamida yechish mumkin.

## 2. SODDALIK (Analogiya)
Buni **matematik ifodadagi qavslarga** o'xshatish mumkin:
Masalan, $x = 5 \times (3 + 4)$ ifodasida avval qavs ichidagi $(3 + 4) = 7$ hisoblanadi, so'ngra tashqi ko'paytirish bajariladi.
SQL-da ham xuddi shunday: avval ichki so'rov (qavs ichidagi) ishlaydi va uning natijasi tashqi so'rovga shart sifatida uzatiladi.

## 3. STRUKTURA
Ichki so'rov doimo qavs \`(...)\` ichida yoziladi va u SELECT, WHERE yoki FROM bloklari ichida kelishi mumkin:
\`\`\`sql
SELECT * FROM jadval1 
WHERE ustun = (SELECT ustun FROM jadval2 WHERE shart);
\`\`\`

Subqueries turlari:
1. **Skalyar (Scalar Subquery)**: Faqat bitta qiymat (1 ta qator va 1 ta ustun) qaytaradigan so'rov (masalan, \`SELECT AVG(price)\`).
2. **Ko'p qatorli (Multi-row Subquery)**: Bir nechta qiymat qaytaradigan so'rov. Bu holatda \`=\` operatori o'rniga \`IN\`, \`ANY\` yoki \`ALL\` operatorlari ishlatiladi.

## 4. AMALIYOT
Mock jadvallarimiz bo'yicha subqueries yozish namunalari:

### Skalyar subquery (O'rtacha qiymatdan kattalar)
O'rtacha buyurtma miqdoridan qimmat bo'lgan barcha buyurtmalarni olish:
\`\`\`sql
SELECT * FROM orders 
WHERE amount > (SELECT AVG(amount) FROM orders);
\`\`\`

### Ko'p qatorli subquery (IN operatori bilan)
Toshkentda yashaydigan foydalanuvchilarning barcha buyurtmalarini topish:
\`\`\`sql
SELECT * FROM orders 
WHERE user_id IN (SELECT id FROM users WHERE city = 'Toshkent');
\`\`\`
*(Bu vazifani INNER JOIN yordamida ham hal qilsa bo'ladi, lekin subquery orqali kod ancha o'qishli chiqadi).*

## 5. XATOLAR (Common mistakes)
1. **Tenglik (=) operatori bilan ko'p qatorli subquery ishlatish**: Agar ichki so'rov birdan ortiq qator qaytarsa va siz \`WHERE user_id = (SELECT id FROM users WHERE city = 'Toshkent')\` deb yozsangiz, SQL xato beradi (Subquery returned more than 1 row). Ko'p qator qaytaruvchi so'rovlar uchun doimo \`IN\` operatorini ishlating!
2. **Samarasiz subqueries**: Ba'zida ichki so'rovlar tashqi so'rovning har bir qatori uchun qayta-qayta hisoblanishi mumkin (Correlated Subquery), bu bazani juda sekinlashtiradi. Mumkin bo'lgan joyda JOIN-dan foydalanish afzalroq.

## 6. SAVOLLAR VA JAVOBLAR
**1. Subquery nima?**
Boshqa bir SQL so'rovi (SELECT, INSERT, UPDATE yoki DELETE) ichiga joylashtirilgan SELECT so'rovi.

**2. Subquery va JOIN farqi nimada?**
JOIN jadvallarni yonma-yon birlashtiradi va har ikkala jadval ustunlarini ko'rish imkonini beradi. Subquery esa odatda filtrlash uchun ishlatiladi va faqat tashqi jadval ustunlarini qaytaradi.

**3. \`EXISTS\` operatori nima?**
Subquery biror qator qaytarsa true, aks holda false beruvchi operator. U ko'pincha katta hajmdagi ma'lumotlarda tez tekshirish uchun ishlatiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Eng qimmat mahsulotlar",
      instruction: "`products` jadvalidan narxi eng o'rtacha narxdan (`AVG(price)`) katta bo'lgan barcha mahsulotlarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Ortacha narxdan (451) katta jami 2 ta mahsulot bor'; if(result.some(p => p.price < 451)) return 'Faqat o\\'rtachadan qimmat mahsulotlar qaytishi kerak'; return null;"
    },
    {
      id: 2,
      title: "Adminlarning buyurtmalari",
      instruction: "`orders` jadvalidan roli `Admin` bo'lgan foydalanuvchilarning barcha buyurtmalarini subquery orqali tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE role = 'Admin')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Admin foydalanuvchiga (Ali) tegishli 2 ta buyurtma bor'; if(result.some(o => o.user_id !== 1)) return 'Faqat Admin buyurtmalari chiqishi kerak'; return null;"
    },
    {
      id: 3,
      title: "Kam qolgan mahsulotlar",
      instruction: "`products` jadvalidan `stock` (ombor qoldig'i) eng minimal qoldiqdan (`MIN(stock)`) ko'proq bo'lgan barcha mahsulotlarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE stock > (SELECT MIN(stock) FROM products)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Minimal qoldiq 5 ga teng, undan katta 4 ta mahsulot bor'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Ichki so'rov (Subquery) odatda qanday belgilar ichida yoziladi?",
      options: ["[ ... ]", "{ ... }", "( ... )", "< ... >"],
      correctAnswer: 2,
      explanation: "SQL-da subquery'lar har doim oddiy qavslar (parentheses) ichida yozilishi shart."
    },
    {
      id: 2,
      question: "Agar subquery birdan ortiq qator qaytarsa, WHERE shartida qaysi operatorni ishlatish lozim?",
      options: ["=", "IN", "LIKE", "BETWEEN"],
      correctAnswer: 1,
      explanation: "Agar ichki so'rov ko'p qatorli bo'lsa, tenglik (=) xatolikka sabab bo'ladi. Uning o'rniga ro'yxat ichidan qidiruvchi IN operatori ishlatiladi."
    },
    {
      id: 3,
      question: "Subquery'ni qaysi SQL buyruqlari ichida ishlatish mumkin?",
      options: [
        "Faqat SELECT ichida",
        "Faqat SELECT va WHERE ichida",
        "SELECT, INSERT, UPDATE va DELETE ichida",
        "Faqat FROM ichida"
      ],
      correctAnswer: 2,
      explanation: "Ichma-ich so'rovlarni barcha asosiy DML buyruqlarida (SELECT, INSERT, UPDATE, DELETE) turli maqsadlar uchun ishlatish mumkin."
    }
  ]
};
