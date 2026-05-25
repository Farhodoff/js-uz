export const sqlFunctions = {
  id: "sqlFunctions",
  title: "Agregat Funksiyalar va Guruhlash",
  language: "sql",
  theory: `## 1. NEGA kerak?
Hisobotlar yaratish yoki ma'lumotlarni umumlashtirish uchun biz alohida qatorlarni emas, balki guruhlar bo'yicha yig'ilgan ma'lumotlarni hisoblashimiz kerak. Masalan, umumiy sotuvlar hajmini bilish, eng qimmat mahsulotni aniqlash, har bir shaharda nechtadan foydalanuvchi borligini sanash yoki har bir foydalanuvchining o'rtacha xarajatini topish. SQL-da bu vazifalar **Agregat funksiyalar** va **GROUP BY** operatori yordamida juda tez bajariladi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, siz maktab direktorisiz va har bir sinfdagi o'quvchilarning **o'rtacha bahosini** bilmoqchisiz.
1. Avval barcha o'quvchilarni sinflari bo'yicha guruhlarga ajratasiz (**GROUP BY**).
2. So'ngra har bir guruhdagi o'quvchilar bahosining o'rtacha qiymatini hisoblaysiz (**AVG**).
3. Agar faqat o'rtacha bahosi 4 dan yuqori bo'lgan sinflarni ko'rmoqchi bo'lsangiz, ularni guruhlangan natija bo'yicha filtrlaysiz (**HAVING**).

## 3. STRUKTURA
Agregat funksiyalar:
1. **\`COUNT()\`**: Qatorlar sonini sanaydi.
2. **\`SUM()\`**: Ustundagi sonlar yig'indisini hisoblaydi.
3. **\`AVG()\`**: Sonlarning o'rtacha qiymatini topadi.
4. **\`MIN()\`**: Eng kichik qiymatni aniqlaydi.
5. **\`MAX()\`**: Eng katta qiymatni aniqlaydi.

Guruhlash va Filtrlash:
- **\`GROUP BY\`**: Ma'lumotlarni bir xil qiymatga ega bo'lgan ustun bo'yicha guruhlaydi.
- **\`HAVING\`**: Guruhlangan natijalarni filtrlash uchun shart. (\`WHERE\` guruhlashdan *oldin*, \`HAVING\` esa guruhlashdan *keyin* ishlaydi).

## 4. AMALIYOT
Mock jadvallarimiz bo'yicha guruhlash namunalari:

### Barcha foydalanuvchilar soni (COUNT)
\`\`\`sql
SELECT COUNT(*) FROM users;
\`\`\`

### Shaharlar bo'yicha foydalanuvchilar soni (GROUP BY)
Har bir shaharda nechtadan kishi borligini ko'rish:
\`\`\`sql
SELECT city, COUNT(*) AS user_count 
FROM users 
GROUP BY city;
\`\`\`

### O'rtacha buyurtma miqdori (AVG) va HAVING
Faqat o'rtacha buyurtmasi 100 dollardan oshgan foydalanuvchilarning ID si va o'rtacha buyurtma summasi:
\`\`\`sql
SELECT user_id, AVG(amount) AS avg_amount 
FROM orders 
GROUP BY user_id 
HAVING AVG(amount) > 100;
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **GROUP BY-da bo'lmagan ustunni SELECT-ga yozish**: Agregat so'rov yozganda, SELECT-dagi barcha oddiy ustunlar (agregat funksiyaga olinmagan ustunlar) albatta GROUP BY qismida ham ko'rsatilishi shart! Aks holda xato yuz beradi.
2. **HAVING va WHERE farqini bilmaslik**: \`WHERE\` oddiy qatorlarni filtrlash uchun guruhlashdan oldin qo'llaniladi. \`HAVING\` esa faqat guruhlangan natijalar (masalan, \`SUM(amount) > 500\`) uchun ishlatiladi. \`WHERE COUNT(*) > 5\` deb yozish xatodir.

## 6. SAVOLLAR VA JAVOBLAR
**1. \`COUNT(*)\` va \`COUNT(ustun_nomi)\` farqi nima?**
\`COUNT(*)\` jadvaldagi barcha qatorlarni (shu jumladan NULL qiymatli qatorlarni ham) sanaydi. \`COUNT(ustun)\` esa faqat shu ustunda NULL bo'lmagan qiymatlarni sanaydi.

**2. \`AS\` kalit so'zi nima uchun ishlatiladi?**
Natijadagi ustun yoki hisoblangan qiymat uchun vaqtinchalik nom (Alias) berish uchun. Masalan, \`COUNT(*) AS jami_soni\`.

**3. Bir vaqtning o'zida ham WHERE, ham HAVING ishlatsa bo'ladimi?**
Ha, avval WHERE sharti bilan qatorlar filtrlanadi, so'ngra qolgan qatorlar GROUP BY bilan guruhlanadi, va eng oxirida HAVING sharti orqali guruhlar filtrlanadi.
`,
  exercises: [
    {
      id: 1,
      title: "Jami buyurtmalar summasi (SUM)",
      instruction: "`orders` jadvalidagi barcha buyurtmalar summasi yig'indisini (`SUM`) toping.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT SUM(amount) FROM orders",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; const sum = result[0]['SUM(amount)'] || result[0]['sum(amount)'] || Object.values(result[0])[0]; if(Math.abs(Number(sum) - 2386) > 10) return 'Jami summa noto\\'g\\'ri'; return null;"
    },
    {
      id: 2,
      title: "Rollar bo'yicha guruhlash",
      instruction: "`users` jadvalidan har bir roldagi (`role`) foydalanuvchilar sonini (`COUNT`) guruhlab oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT role, COUNT(*) FROM users GROUP BY role",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Jami 3 ta alohida rol bor'; return null;"
    },
    {
      id: 3,
      title: "Eng arzon mahsulot narxi (MIN)",
      instruction: "`products` jadvalidan eng arzon mahsulot narxini (`MIN`) toping.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT MIN(price) FROM products",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; const minVal = Object.values(result[0])[0]; if(Number(minVal) !== 25) return 'Eng arzon narx 25 bo\\'lishi kerak'; return null;"
    },
    {
      id: 4,
      title: "Ko'p buyurtma berganlar (HAVING)",
      instruction: "`orders` jadvalidan har bir foydalanuvchining (`user_id`) jami buyurtmalar summasini (`SUM`) guruhlab oling, lekin faqat jami summa 500 dan katta bo'lgan foydalanuvchilarni qoldiring.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT user_id, SUM(amount) FROM orders GROUP BY user_id HAVING SUM(amount) > 500",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Shartga faqat 2 ta foydalanuvchi mos keladi (user_id: 1 va 2)'; return null;"
    },
    {
      id: 5,
      title: "O'rtacha yosh (AVG)",
      instruction: "`users` jadvalidagi barcha foydalanuvchilarning o'rtacha yoshini (`AVG`) hisoblang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT AVG(age) FROM users",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; const avgAge = Object.values(result[0])[0]; if(Math.round(Number(avgAge)) !== 28) return 'O\\'rtacha yosh xato hisoblandi (taxminan 28 bo\\'lishi kerak)'; return null;"
    },
    {
      id: 6,
      title: "Shaharlar bo'yicha guruhlash",
      instruction: "`users` jadvalidan har bir shahardagi (`city`) foydalanuvchilar sonini (`COUNT`) guruhlab tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT city, COUNT(*) FROM users GROUP BY city",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Jami 3 ta alohida shahar bor'; return null;"
    },
    {
      id: 7,
      title: "Eng qimmat mahsulot narxi (MAX)",
      instruction: "`products` jadvalidan eng qimmat mahsulot narxini (`MAX`) toping.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT MAX(price) FROM products",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; const maxVal = Object.values(result[0])[0]; if(Number(maxVal) !== 1200) return 'Eng qimmat narx 1200 bo\\'lishi kerak'; return null;"
    },
    {
      id: 8,
      title: "O'rtacha buyurtma summasi",
      instruction: "`orders` jadvalidagi barcha buyurtmalarning o'rtacha summasini (`AVG`) hisoblang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT AVG(amount) FROM orders",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; const avgAmt = Object.values(result[0])[0]; if(Math.round(Number(avgAmt)) !== 398) return 'O\\'rtacha buyurtma xato hisoblandi'; return null;"
    },
    {
      id: 9,
      title: "Toifalar bo'yicha mahsulotlar soni",
      instruction: "`products` jadvalidagi mahsulotlarni toifalar (`category`) bo'yicha guruhlang va har bir toifada nechtadan mahsulot borligini sanang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT category, COUNT(*) FROM products GROUP BY category",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Jami 2 ta toifa bor (Electronics va Furniture)'; return null;"
    },
    {
      id: 10,
      title: "Ko'p foydalanuvchili shaharlar (HAVING)",
      instruction: "`users` jadvalidan shaharlar bo'yicha guruhlang, lekin faqat foydalanuvchilar soni 1 tadan ko'p bo'lgan shaharlarni ko'rsating.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) > 1",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].city !== 'Toshkent') return 'Faqat Toshkentda 1 tadan ko\\'p foydalanuvchi bor (3 kishi)'; return null;"
    },
    {
      id: 11,
      title: "Buyurtmalar soni bo'yicha guruhlash",
      instruction: "`orders` jadvalidan har bir foydalanuvchining (`user_id`) jami bergan buyurtmalari sonini (`COUNT`) guruhlab oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT user_id, COUNT(*) FROM orders GROUP BY user_id",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Jami 4 ta foydalanuvchi buyurtma bergan'; return null;"
    },
    {
      id: 12,
      title: "Mahsulotlar jami soni (SUM)",
      instruction: "`products` jadvalidagi barcha mahsulotlarning jami ombor qoldig'i (`SUM(stock)`) yig'indisini hisoblang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT SUM(stock) FROM products",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; const totalStock = Object.values(result[0])[0]; if(Number(totalStock) !== 105) return 'Jami ombor qoldig\\'i 105 bo\\'lishi kerak'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Guruhlangan natijalarni filtrlash uchun qaysi kalit so'z ishlatiladi?",
      options: ["WHERE", "HAVING", "ORDER BY", "SELECT"],
      correctAnswer: 1,
      explanation: "GROUP BY yordamida guruhlangan ma'lumotlar ustidan shart tekshirish uchun HAVING ishlatiladi. WHERE esa guruhlashdan oldin ishlaydi."
    },
    {
      id: 2,
      question: "Jadvaldagi qatorlar sonini sanash uchun qaysi agregat funksiya ishlatiladi?",
      options: ["SUM()", "COUNT()", "AVG()", "TOTAL()"],
      correctAnswer: 1,
      explanation: "COUNT() funksiyasi qatorlar yoki NULL bo'lmagan qiymatlar sonini hisoblash uchun xizmat qiladi."
    },
    {
      id: 3,
      question: "Quyidagilardan qaysi biri to'g'ri yozilgan SQL so'rovi?",
      options: [
        "SELECT city, AVG(age) FROM users WHERE AVG(age) > 20 GROUP BY city",
        "SELECT city, AVG(age) FROM users GROUP BY city HAVING AVG(age) > 20",
        "SELECT city, AVG(age) FROM users GROUP BY city WHERE age > 20",
        "SELECT city, AVG(age) FROM users HAVING AVG(age) > 20"
      ],
      correctAnswer: 1,
      explanation: "Agregat natija bo'yicha filtrlash HAVING orqali va u GROUP BY dan keyin yozilishi shart."
    },
    {
      id: 4,
      question: "Agregat funksiyaga olinmagan oddiy ustun SELECT qismida turgan bo'lsa, u yana qayerda ko'rsatilishi shart?",
      options: ["ORDER BY qismida", "WHERE qismida", "GROUP BY qismida", "LIMIT qismida"],
      correctAnswer: 2,
      explanation: "Sintaksis qoidasiga ko'ra, SELECT-ga yozilgan va agregat funksiya bo'lmagan har bir ustun albatta GROUP BY guruhlash qismida ham yozilishi shart."
    },
    {
      id: 5,
      question: "WHERE va HAVING farqi nimada?",
      options: [
        "Hech qanday farqi yo'q",
        "WHERE guruhlashdan oldin qatorlarni filtrlash uchun, HAVING esa guruhlashdan keyingi agregat natijalarni filtrlash uchun ishlatiladi",
        "HAVING tezroq ishlaydi",
        "WHERE faqat sonlarni, HAVING esa faqat matnlarni filtrlaydi"
      ],
      correctAnswer: 1,
      explanation: "WHERE birlamchi jadval qatorlarini, HAVING esa GROUP BY natijasida hosil bo'lgan agregat guruhlarni filtrlaydi."
    },
    {
      id: 6,
      question: "COUNT(city) va COUNT(*) farqi nimada?",
      options: [
        "COUNT(*) shaharlarni sanamaydi",
        "COUNT(city) faqat city ustunida NULL bo'lmagan qiymatlarni sanaydi, COUNT(*) esa barcha qatorlarni sanaydi",
        "Ikkalasi mutlaqo bir xil",
        "COUNT(city) xato sintaksis"
      ],
      correctAnswer: 1,
      explanation: "COUNT(ustun) faqat shu ustundagi aniq (NULL bo'lmagan) ma'lumotlarni hisoblaydi, yulduzcha (*) esa har qanday qatorni hisobga oladi."
    },
    {
      id: 7,
      question: "O'rtacha yoshni topish uchun qaysi agregat funksiya ishlatiladi?",
      options: ["MIDDLE()", "AVG()", "MEAN()", "AVERAGE()"],
      correctAnswer: 1,
      explanation: "Average so'zining qisqartmasi bo'lgan AVG() funksiyasi sonlarning o'rtacha qiymatini hisoblaydi."
    },
    {
      id: 8,
      question: "Ustun nomiga so'rov natijasida chiroyli vaqtinchalik nom berish (Alias) uchun qaysi kalit so'z yoziladi?",
      options: ["LIKE", "AS", "NAME", "TO"],
      correctAnswer: 1,
      explanation: "AS (Alias) kalit so'zi natijadagi ustun sarlavhasiga vaqtincha nom berish uchun ishlatiladi."
    },
    {
      id: 9,
      question: "Quyidagi agregat funksiyalardan qaysi biri faqat sonli qiymatlar bilan ishlay oladi?",
      options: ["COUNT()", "MIN()", "SUM()", "MAX()"],
      correctAnswer: 2,
      explanation: "SUM() va AVG() funksiyalari faqat matematik yig'indi hisoblagani uchun sonli ustunlar bilan ishlaydi. COUNT, MIN va MAX esa matnlar bilan ham ishlay oladi."
    },
    {
      id: 10,
      question: "Agregat funksiyalar ichida unikal (takrorlanmagan) qiymatlarni sanash uchun qaysi kalit so'z qo'shiladi?",
      options: ["COUNT(UNIQUE ...)", "COUNT(DISTINCT ...)", "COUNT(ALL ...)", "COUNT(SINGLE ...)"],
      correctAnswer: 1,
      explanation: "COUNT(DISTINCT ustun) yordamida ustundagi faqat bir-biriga o'xshamaydigan unikal qiymatlar soni aniqlanadi."
    },
    {
      id: 11,
      question: "Quyidagilardan qaysi biri eng katta qiymatni topib beradi?",
      options: ["MIN()", "MAX()", "HIGH()", "TOP()"],
      correctAnswer: 1,
      explanation: "MAX() funksiyasi berilgan maydondagi eng maksimal (katta) qiymatni qaytaradi."
    },
    {
      id: 12,
      question: "Har bir foydalanuvchining jami xarajatini topish uchun qaysi so'rov to'g'ri?",
      options: [
        "SELECT user_id, SUM(amount) FROM orders",
        "SELECT user_id, SUM(amount) FROM orders GROUP BY user_id",
        "SELECT user_id, SUM(amount) FROM orders HAVING SUM(amount) > 0",
        "SELECT SUM(amount) FROM orders GROUP BY product"
      ],
      correctAnswer: 1,
      explanation: "Har bir foydalanuvchi bo'yicha yig'indi topish uchun albatta GROUP BY user_id bo'lishi lozim."
    }
  ]
};
