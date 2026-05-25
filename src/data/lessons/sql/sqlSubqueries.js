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
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Admin foydalanuviga (Ali) tegishli 2 ta buyurtma bor'; if(result.some(o => o.user_id !== 1)) return 'Faqat Admin buyurtmalari chiqishi kerak'; return null;"
    },
    {
      id: 3,
      title: "Kam qolgan mahsulotlar",
      instruction: "`products` jadvalidan `stock` (ombor qoldig'i) eng minimal qoldiqdan (`MIN(stock)`) ko'proq bo'lgan barcha mahsulotlarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE stock > (SELECT MIN(stock) FROM products)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Minimal qoldiq 5 ga teng, undan katta 4 ta mahsulot bor'; return null;"
    },
    {
      id: 4,
      title: "Eng arzon mahsulot narxi bilan solishtirish",
      instruction: "`products` jadvalidan narxi eng minimal narxga (`MIN(price)`) teng bo'lgan mahsulot(lar)ni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE price = (SELECT MIN(price) FROM products)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Mouse') return 'Faqat eng arzon mahsulot (Mouse - 25) qaytishi kerak'; return null;"
    },
    {
      id: 5,
      title: "Toshkentlik foydalanuvchilarning buyurtmalari",
      instruction: "`orders` jadvalidan `city` qiymati 'Toshkent' bo'lgan foydalanuvchilarning barcha buyurtmalarini subquery yordamida oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE city = 'Toshkent')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Toshkentlik foydalanuvchilarga tegishli jami 3 ta buyurtma bor'; return null;"
    },
    {
      id: 6,
      title: "Menejer bo'lmagan foydalanuvchilarning buyurtmalari",
      instruction: "`orders` jadvalidan roli `Manager` bo'lmagan (`role != 'Manager'`) foydalanuvchilarning barcha buyurtmalarini subquery orqali oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE role != 'Manager')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 5) return 'Menejer bo\\'lmagan foydalanuvchilarning jami 5 ta buyurtmasi bor'; return null;"
    },
    {
      id: 7,
      title: "Hech qanday buyurtma bermagan foydalanuvchilar",
      instruction: "`users` jadvalidan `orders` jadvalida umuman buyurtmasi mavjud bo'lmagan foydalanuvchilarning ma'lumotlarini subquery (`NOT IN`) orqali tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM orders)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Dilshod') return 'Faqat buyurtma bermagan Dilshod qaytishi kerak'; return null;"
    },
    {
      id: 8,
      title: "O'rtacha buyurtma miqdoridan kichik bo'lgan buyurtmalar",
      instruction: "`orders` jadvalidan buyurtma summasi (`amount`) barcha buyurtmalarning o'rtacha summasidan (`AVG(amount)`) kichik bo'lgan buyurtmalarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE amount < (SELECT AVG(amount) FROM orders)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'O\\'rtacha buyurtmadan kichik jami 4 ta buyurtma bor'; return null;"
    },
    {
      id: 9,
      title: "Eng yosh foydalanuvchining buyurtmalari",
      instruction: "`orders` jadvalidan yoshi eng kichik bo'lgan (`MIN(age)`) foydalanuvchining barcha buyurtmalarini subquery yordamida oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE age = (SELECT MIN(age) FROM users))",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].product !== 'Keyboard') return 'Faqat eng yosh foydalanuvchining buyurtmasi chiqishi kerak'; return null;"
    },
    {
      id: 10,
      title: "Mebel toifasidagi eng qimmat mahsulot",
      instruction: "`products` jadvalidan toifasi 'Furniture' bo'lgan mahsulotlar ichida narxi ushbu toifadagi o'rtacha narxdan (`AVG(price)`) katta bo'lgan mahsulotlarni subquery yordamida tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE category = 'Furniture' AND price > (SELECT AVG(price) FROM products WHERE category = 'Furniture')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Chair') return 'Faqat mebel toifasidagi o\\'rtachadan qimmat mahsulot (Chair) qaytishi kerak'; return null;"
    },
    {
      id: 11,
      title: "Ko'p buyurtma bergan foydalanuvchi ma'lumotlari",
      instruction: "`users` jadvalidan `orders` jadvalida kamida bitta buyurtmasi bor bo'lgan barcha foydalanuvchilarni `IN` subquery yordamida oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders)",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Kamida bitta buyurtma bergan jami 4 ta foydalanuvchi bor'; return null;"
    },
    {
      id: 12,
      title: "Elektronika toifasidan arzonroq mahsulotlar",
      instruction: "`products` jadvalidan narxi elektronika toifasidagi eng qimmat mahsulot narxidan (`MAX(price)`) arzonroq bo'lgan barcha mahsulotlarni subquery orqali tanlang. (Elektronika toifasidagi eng qimmat mahsulotni tanlash uchun ichki so'rov ishlating).",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE price < (SELECT MAX(price) FROM products WHERE category = 'Electronics')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Narxi eng qimmat elektronika mahsulotidan arzon jami 4 ta mahsulot bor'; return null;"
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
    },
    {
      id: 4,
      question: "Subquery natijasi tashqi so'rovning WHERE shartiga qanday uzatiladi?",
      options: [
        "Subquery avval bajarilib, uning qaytargan qiymati(lari) shart o'rniga qo'yiladi",
        "Tashqi so'rov birinchi bajarilib, natijasi ichki so'rovga o'tkaziladi",
        "Ikki so'rov parallel bajarilib, natijalar birlashtiriladi",
        "Tizim xatolik beradi, chunki bitta so'rovda ikkita SELECT mumkin emas"
      ],
      correctAnswer: 0,
      explanation: "SQL dvijogi avval qavs ichidagi ichki so'rovni (subquery) bajaradi va uning natijasini tashqi so'rovning WHERE shartiga parametr sifatida beradi."
    },
    {
      id: 5,
      question: "Skalyar subquery (Scalar Subquery) nima qaytaradi?",
      options: [
        "Butun bir jadvalni",
        "Faqat bitta qiymatni (1 ta ustun va 1 ta qator)",
        "Faqat true yoki false qiymatni",
        "Bir nechta ustunlardan iborat qatorlarni"
      ],
      correctAnswer: 1,
      explanation: "Skalyar subquery faqatgina bitta ustun va bitta qatordan iborat yagona qiymat (masalan, SUM, AVG, yoki bitta ID) qaytaruvchi so'rovdir."
    },
    {
      id: 6,
      question: "Quyidagilardan qaysi biri subquery qaytargan ro'yxat ichidan moslikni tekshirish uchun ishlatiladi?",
      options: [
        "LIKE",
        "BETWEEN",
        "IN",
        "AND"
      ],
      correctAnswer: 2,
      explanation: "IN operatori chap tomondagi qiymat o'ng tomondagi subquery qaytargan ro'yxat (massiv) ichida bor-yo'qligini tekshiradi."
    },
    {
      id: 7,
      question: "Correlated Subquery (Bog'liq ichki so'rov) nima?",
      options: [
        "Hech qachon ishlamaydigan va xato beradigan so'rov",
        "Tashqi so'rovning har bir qatori uchun alohida qayta bajariladigan va tashqi jadval ustuniga tayanadigan so'rov",
        "Faqat JOIN yordamida yozilgan so'rov",
        "Baza yuklanishida faqat bir marta ishlaydigan so'rov"
      ],
      correctAnswer: 1,
      explanation: "Correlated subquery tashqi so'rov ma'lumotlariga bog'liq bo'ladi va tashqi so'rovning har bir qatori uchun qayta-qayta ishga tushib, unumdorlikni pasaytirishi mumkin."
    },
    {
      id: 8,
      question: "Subquery natijasida birorta ham qator qaytmaganini tekshirish uchun qaysi operator ishlatiladi?",
      options: [
        "NOT EXISTS",
        "NOT IN",
        "IS NULL",
        "EMPTY"
      ],
      correctAnswer: 0,
      explanation: "NOT EXISTS operatori ichki so'rov hech qanday natija (0 ta qator) qaytarmasa true beradi."
    },
    {
      id: 9,
      question: "SELECT * FROM products WHERE price > (SELECT MAX(price) FROM products) so'rovi nimani qaytaradi?",
      options: [
        "Eng qimmat mahsulotni",
        "Bo'sh natija (hech narsa qaytmaydi)",
        "O'rtacha narxdan qimmat barcha mahsulotlarni",
        "Xatolik yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "Chunki mahsulot narxi o'zining eng maksimal narxidan qimmat bo'la olmaydi (price > MAX(price) har doim false). Natijada bo'sh to'plam qaytadi."
    },
    {
      id: 10,
      question: "Subquery'ni SELECT ustunlari ro'yxatida (projection) ishlatsa bo'ladimi?",
      options: [
        "Yo'q, faqat WHERE va FROM ichida ishlatish mumkin",
        "Ha, har bir qator uchun qo'shimcha skalyar qiymat hisoblash uchun SELECT tarkibida ishlatsa bo'ladi",
        "Faqat ma'lumotlarni o'chirishda SELECT ichida ishlatiladi",
        "Ha, lekin faqat ORDER BY bilan birga"
      ],
      correctAnswer: 1,
      explanation: "SELECT ustunlari orasida skalyar subquery ishlatib, har bir natijaviy qator uchun boshqa jadvaldan tegishli qiymatni hisoblab chiqarish mumkin."
    },
    {
      id: 11,
      question: "Subquery'ni FROM qismida jadval o'rnida ishlatganda nima deb ataladi?",
      options: [
        "Derived Table (yoki Inline View)",
        "Temporary Table",
        "Common Table Expression (CTE)",
        "Correlated Subquery"
      ],
      correctAnswer: 0,
      explanation: "FROM qismida yozilgan va jadval vazifasini bajaradigan subquery 'Derived Table' yoki 'Inline View' deb nomlanadi va unga odatda alias (nom) berish talab etiladi."
    },
    {
      id: 12,
      question: "ALL operatori subquery bilan birga ishlatilganda nima vazifani bajaradi?",
      options: [
        "Bacha shartlar qisman bajarilsa ham true beradi",
        "Tashqi so'rov qiymati subquery qaytargan barcha qiymatlarning har biridan kattaligini/kichikligini tekshiradi",
        "Faqat barcha qatorlarni o'chirish uchun qo'llaniladi",
        "Subquery qaytargan barcha ustunlarni birlashtiradi"
      ],
      correctAnswer: 1,
      explanation: "Masalan, price > ALL (Subquery) sharti mahsulot narxi subquery qaytargan barcha qiymatlarning eng kattasidan ham katta bo'lishini talab qiladi."
    }
  ]
};
