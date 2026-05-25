export const sqlFiltering = {
  id: "sqlFiltering",
  title: "Ma'lumotlarni Filtrlash (Filtering)",
  language: "sql",
  theory: `## 1. NEGA kerak?
Haqiqiy ma'lumotlar bazalarida ko'pincha millionlab qatorlar saqlanadi. Bizga har doim ham barcha qatorlar kerak bo'lavermaydi. Masalan, faqat faol foydalanuvchilarni topish, ma'lum bir narx oralig'idagi mahsulotlarni ko'rish yoki ma'lum bir harfdan boshlanuvchi ismlarni qidirish kerak bo'ladi. SQL-da shunday aniq shartlar bo'yicha ma'lumotlarni tanlab olish uchun **WHERE** bloki bilan birga mantiqiy operatorlar ishlatiladi.

## 2. SODDALIK (Analogiya)
Buni **do'kondagi filtrlarga** o'xshatish mumkin:
Siz kiyim-kechak do'konidan "Rangi *qizil* bo'lgan **VA** o'lchami *M* bo'lgan **Yoki** narxi *100,000 so'mdan kam* bo'lgan" ko'ylaklarni filtrlab qidiryapsiz.
SQL-da mantiqiy shartlarni birlashtirish xuddi shunday ishlaydi.

## 3. STRUKTURA
Mantiqiy operatorlar:
1. **\`AND\`**: Ikkala shart ham to'g'ri (true) bo'lishi shart.
2. **\`OR\`**: Shartlardan kamida bittasi to'g'ri bo'lsa kifoya.
3. **\`IN\`**: Qiymat berilgan ro'yxat ichida borligini tekshiradi (masalan, \`city IN ('Toshkent', 'Samarqand')\`).
4. **\`BETWEEN\`**: Qiymat ma'lum bir oraliqda (inclusive - chegaralar bilan birga) ekanligini tekshiradi (masalan, \`age BETWEEN 20 AND 30\`).
5. **\`LIKE\`**: Qidiruv shablonini tekshiradi. \`%\` belgisi ixtiyoriy miqdordagi harflar o'rniga o'tadi (masalan, \`name LIKE 'A%'\` - 'A' harfi bilan boshlanuvchi ismlar).
6. **\`IS NULL\` / \`IS NOT NULL\`**: Ustunda qiymat yo'qligini (null) tekshirish.

## 4. AMALIYOT
Mock jadvallarimiz asosida filtrlash namunalari:

### Bir nechta shartlar (AND)
Toshkentda yashaydigan va yoshi 25 dan katta bo'lgan foydalanuvchilar:
\`\`\`sql
SELECT * FROM users 
WHERE city = 'Toshkent' AND age > 25;
\`\`\`

### Qiymatlar ro'yxati (IN)
Faqat adminlar yoki menejerlarni tanlash:
\`\`\`sql
SELECT * FROM users 
WHERE role IN ('Admin', 'Manager');
\`\`\`

### Shabloni bo'yicha qidirish (LIKE)
Ismi 'D' harfi bilan boshlanadigan foydalanuvchilar:
\`\`\`sql
SELECT * FROM users 
WHERE name LIKE 'D%';
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **LIKE operatorida wildcards (%) ni unutish**: \`WHERE name LIKE 'Ali'\` yozsangiz, u faqat to'liq 'Ali' ga teng bo'lgan qatorlarni qidiradi. 'Alisher' yoki 'Alijon' larni topish uchun \`WHERE name LIKE 'Ali%'\` deb yozish shart.
2. **NULL qiymatlarni tenglik operatori (=) bilan tekshirish**: SQL-da \`WHERE city = NULL\` xato hisoblanadi va hech qanday natija bermaydi. Buning o'rniga doimo \`WHERE city IS NULL\` yozilishi shart.
3. **AND va OR ustuvorligi (Precedence)**: Agar birgalikda AND va OR ishlatilsa, AND yuqori ustuvorlikka ega. Murakkab mantiqiy shartlarni doim qavs ichiga yozing: \`(city = 'Toshkent' OR city = 'Buxoro') AND age > 30\`.

## 6. SAVOLLAR VA JAVOBLAR
**1. SQL-da \`BETWEEN\` operatori chegaralarni ham hisobga oladimi?**
Ha, inclusive hisoblanadi. Masalan, \`age BETWEEN 20 AND 30\` yoshi 20 va 30 bo'lganlarni ham qaytaradi.

**2. \`IS NULL\` nima uchun kerak?**
Ustunga ma'lumot kiritilmagan (bo'sh qolgan) qatorlarni aniqlash uchun ishlatiladi.

**3. LIKE operatorida \`%\` va \`_\` (tag chiziq) farqi nimada?**
\`%\` belgisi ixtiyoriy uzunlikdagi (hatto 0 ta) belgilar o'rniga o'tadi, \`_\` esa roppa-rosa bitta harf yoki belgi o'rniga o'tadi.
`,
  exercises: [
    {
      id: 1,
      title: "Yosh oralig'i (BETWEEN)",
      instruction: "`users` jadvalidan yoshi 25 va 30 oralig'ida bo'lgan (25 va 30 ni ham qo'shib) barcha foydalanuvchilarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE age BETWEEN 25 AND 30",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Ushbu oraliqda 3 ta foydalanuvchi bor'; if(result.some(u => u.age < 25 || u.age > 30)) return 'Faqat 25 va 30 yosh oralig\\'idagi foydalanuvchilar chiqishi shart'; return null;"
    },
    {
      id: 2,
      title: "Rollar filtri (IN)",
      instruction: "`users` jadvalidan roli `Admin` yoki `Manager` bo'lgan foydalanuvchilarning ismi (`name`) va roli (`role`) ustunlarini tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT name, role FROM users WHERE role IN ('Admin', 'Manager')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Admin va Manager roli bo\\'lgan jami 2 kishi bor'; if(result[0].city !== undefined) return 'Faqat name va role ustunlari tanlanishi kerak'; return null;"
    },
    {
      id: 3,
      title: "Ism bo'yicha qidiruv (LIKE)",
      instruction: "`users` jadvalidan ismi 'M' harfi bilan boshlanadigan barcha foydalanuvchilarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE name LIKE 'M%'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Madina') return 'Faqat Madina ismi qaytishi kerak'; return null;"
    },
    {
      id: 4,
      title: "Toshkentlik foydalanuvchilar va rollar",
      instruction: "`users` jadvalidan Toshkentda yashaydigan yoki roli 'User' bo'lmagan barcha foydalanuvchilarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE city = 'Toshkent' OR role != 'User'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Jami 4 ta foydalanuvchi shartga mos keladi'; return null;"
    },
    {
      id: 5,
      title: "And sharti bilan filtrlash",
      instruction: "`users` jadvalidan yoshi (`age`) 25 dan katta bo'lgan va shahri (`city`) 'Toshkent' bo'lgan foydalanuvchilarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE age > 25 AND city = 'Toshkent'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 1 || result[0].name !== 'Dilshod') return 'Faqat 35 yoshli Toshkentlik Dilshod chiqishi kerak'; return null;"
    },
    {
      id: 6,
      title: "Roldan tashqari foydalanuvchilar (NOT IN)",
      instruction: "`users` jadvalidan roli (`role`) 'Admin' yoki 'Manager' bo'lmagan barcha foydalanuvchilarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE role NOT IN ('Admin', 'Manager')",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Admin va Manager bo\\'lmagan jami 3 ta foydalanuvchi bor'; return null;"
    },
    {
      id: 7,
      title: "Ismda 'a' harfi borlar",
      instruction: "`users` jadvalidan ismi tarkibida 'a' harfi qatnashgan barcha foydalanuvchilarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE name LIKE '%a%'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 4) return 'Ismida a harfi bor 4 kishi bor (Ali, Vali, Sardor, Madina)'; return null;"
    },
    {
      id: 8,
      title: "Murakkab mantiqiy filtrlash",
      instruction: "`users` jadvalidan roli 'Admin' bo'lgan yoki yoshi 30 dan kichik bo'lgan barcha foydalanuvchilarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM users WHERE role = 'Admin' OR age < 30",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Ushbu shartga 3 kishi mos keladi'; return null;"
    },
    {
      id: 9,
      title: "Mahsulotlar narxi filtri",
      instruction: "`products` jadvalidan narxi (`price`) 100 dan 900 gacha bo'lgan barcha mahsulotlarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE price BETWEEN 100 AND 900",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Ushbu narx oralig\\'ida 3 ta mahsulot bor (Phone, Desk, Chair)'; return null;"
    },
    {
      id: 10,
      title: "Ombor qoldig'i filtri",
      instruction: "`products` jadvalidan ombor qoldig'i (`stock`) 10 dan kam bo'lgan yoki toifasi (`category`) 'Furniture' bo'lgan mahsulotlarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM products WHERE stock < 10 OR category = 'Furniture'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 2) return 'Ushbu shartga 2 ta mahsulot mos keladi (Desk, Chair)'; return null;"
    },
    {
      id: 11,
      title: "Buyurtmalar miqdori filtri",
      instruction: "`orders` jadvalidan buyurtma summasi (`amount`) 50 dan kam bo'lgan barcha buyurtmalarni tanlang.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE amount < 50",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Summasi 50 dan kam bo\\'lgan 3 ta buyurtma bor'; return null;"
    },
    {
      id: 12,
      title: "Muayyan sanadagi buyurtmalar",
      instruction: "`orders` jadvalidan `order_date` qiymati '2026-05-03' dan keyin bo'lgan barcha buyurtmalarni oling.",
      startingCode: "-- SQL so'rovini yozing\n",
      hint: "SELECT * FROM orders WHERE order_date > '2026-05-03'",
      test: "if(!Array.isArray(result)) return 'Natija topilmadi'; if(result.length !== 3) return 'Ushbu sanadan keyin 3 ta buyurtma berilgan'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL-da ma'lumotlar bazasida qiymat saqlanmagan (bo'sh) kataklarni tekshirish uchun qaysi ifoda to'g'ri?",
      options: ["= NULL", "IS NULL", "IS EMPTY", "== NULL"],
      correctAnswer: 1,
      explanation: "SQL-da NULL qiymat tenglik operatori bilan tekshirilmaydi, buning o'rniga maxsus 'IS NULL' yoki 'IS NOT NULL' operatorlari ishlatiladi."
    },
    {
      id: 2,
      question: "LIKE operatorida faqat bitta belgini almashtirish uchun qaysi wildcard ishlatiladi?",
      options: ["%", "_", "*", "?"],
      correctAnswer: 1,
      explanation: "% belgisi ixtiyoriy uzunlikdagi matn o'rniga o'tadi, _ (pastki chiziq) esa roppa-rosa bitta ixtiyoriy belgi o'rnini egallaydi."
    },
    {
      id: 3,
      question: "BETWEEN operatori qanday oraliqni ifodalaydi?",
      options: [
        "Faqat kichik va katta qiymatlarni hisobga olmaydigan eksklyuziv oraliq",
        "Chegaraviy qiymatlarni ham o'z ichiga oluvchi (inclusive) oraliq",
        "Faqat manfiy sonlar oralig'i",
        "Ixtiyoriy matnlar oralig'i"
      ],
      correctAnswer: 1,
      explanation: "BETWEEN operatori chegaralarni ham o'z ichiga oladi (masalan, BETWEEN 1 AND 5 yozilsa, 1 va 5 ham oraliqqa kiradi)."
    },
    {
      id: 4,
      question: "AND va OR operatorlari birga kelganda qaysi biri yuqori ustuvorlikka ega?",
      options: ["OR", "AND", "Ikkalasi teng", "Faqat birinchi yozilgani"],
      correctAnswer: 1,
      explanation: "AND operatori OR operatoriga qaraganda ustuvorroq hisoblanadi. Shuning uchun OR shartlarini doimo qavsga olish tavsiya etiladi."
    },
    {
      id: 5,
      question: "Ro'yxatdan qidiruvchi IN operatorining teskari ko'rinishi qaysi?",
      options: ["EXCLUDE", "NOT IN", "WITHOUT", "NOT BETWEEN"],
      correctAnswer: 1,
      explanation: "NOT IN operatori qiymat berilgan ro'yxatda yo'qligini tekshiradi."
    },
    {
      id: 6,
      question: "Ismi 'Ali' bilan tugaydigan barcha ismlarni topish uchun LIKE shabloni qanday yoziladi?",
      options: ["'Ali%'", "'%Ali'", "'%Ali%'", "'_Ali'"],
      correctAnswer: 1,
      explanation: "%Ali shabloni satr istalgan belgilar bilan boshlanib, 'Ali' bilan tugashini anglatadi."
    },
    {
      id: 7,
      question: "Teng emas mantiqiy operatori SQL-da qanday yoziladi?",
      options: ["!=", "<>", "Ikkalasi ham to'g'ri", "!=="],
      correctAnswer: 2,
      explanation: "SQL-da teng emaslikni ifodalash uchun ham != ham <> operatorlari ishlatiladi va ikkalasi ham standartdir."
    },
    {
      id: 8,
      question: "Toshkent yoki Buxoroda yashaydigan foydalanuvchilarni topish uchun to'g'ri shart qaysi?",
      options: ["WHERE city = 'Toshkent' AND city = 'Buxoro'", "WHERE city = 'Toshkent' OR city = 'Buxoro'", "WHERE city IN ('Toshkent' AND 'Buxoro')", "WHERE city = 'Toshkent', 'Buxoro'"],
      correctAnswer: 1,
      explanation: "Foydalanuvchi bir vaqtda ikkita shaharda yashay olmaydi. Shuning uchun OR yoki IN ('Toshkent', 'Buxoro') ishlatilishi shart."
    },
    {
      id: 9,
      question: "Quyidagilardan qaysi biri '20 dan 30 gacha bo'lgan' sonlar oralig'ini to'g'ri tekshiradi?",
      options: ["WHERE age >= 20 OR age <= 30", "WHERE age BETWEEN 20 AND 30", "WHERE age IN (20, 30)", "WHERE age > 20 AND age < 30"],
      correctAnswer: 1,
      explanation: "BETWEEN 20 AND 30 operatori 20 va 30 ni o'z ichiga olgan mukammal oraliq filtridir."
    },
    {
      id: 10,
      question: "LIKE operatorida '_a%' shabloni nimani anglatadi?",
      options: ["Birinchi harfi 'a' bo'lgan istalgan so'z", "Ikkinchi harfi 'a' bo'lgan istalgan so'z", "Faqat 2 ta harfdan iborat va 'a' bilan tugaydigan so'z", "Tarkibida pastki chiziq bo'lgan so'z"],
      correctAnswer: 1,
      explanation: "Tag chiziq (_) roppa-rosa bitta ixtiyoriy belgini, 'a' esa ikkinchi o'rinda turishini, % esa keyin ixtiyoriy belgilar kelishini anglatadi."
    },
    {
      id: 11,
      question: "NULL qiymatga ega bo'lmagan (qiymat kiritilgan) qatorlarni topish uchun nima yoziladi?",
      options: ["IS NOT NULL", "!= NULL", "<> NULL", "IS FILLED"],
      correctAnswer: 0,
      explanation: "SQL-da qiymat mavjudligini tekshirish uchun IS NOT NULL operatoridan foydalaniladi."
    },
    {
      id: 12,
      question: "Matnlarni qidirishda katta-kichik harflarni farqlamaydigan LIKE o'rniga ba'zi SQL dialektlarida qaysi operator ishlatiladi?",
      options: ["SLIKE", "ILIKE", "LIKE_IGNORE", "MATCH"],
      correctAnswer: 1,
      explanation: "ILIKE operatori case-insensitive LIKE hisoblanadi (faqat PostgreSQL kabi ba'zi dialektlarda mavjud)."
    }
  ]
};
