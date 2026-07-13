export const sqlFunctions = {
  id: "sql_functions_1",
  title: "SQL Functions (Funksiyalar)",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy: Oshxona Asboblari

Tasavvur qiling, sizning oshxonangizda turli xil asboblar bor.
**Scalar (Skalyar) funksiyalar** - bu pichoq. U har bir olma yoki sabzini alohida kesadi. Ya'ni, har bir qator (row) uchun alohida bitta natija qaytaradi.
Masalan: \\\`UPPER(name)\\\` har bir ismni katta harflarga o'tkazadi.

**Aggregate (Agregat) funksiyalar** - bu blender. Siz unga ko'plab mevalarni solasiz, u ularni aralashtirib, bitta sharbat (bitta umumiy natija) qilib beradi.
Masalan: \\\`SUM(price)\\\` barcha narxlarni qo'shib, bitta jami summani qaytaradi.

## 2. 🚀 Deep Dive: Under the Hood (Qanday Ishlaydi?)

SQL bazasi (Masalan PostgreSQL, MySQL) agregat funksiyalarni (\\\`SUM\\\`, \\\`AVG\\\`) bajarayotganda asosan 2 xil **Aggregation Pipeline** (guruhlash usuli) dan foydalanadi:

1. **HashAggregate**: 
Xotirada (RAM) maxsus Hash-table yaratadi. Guruhning har bir kaliti (key) uchun qiymatlarni (masalan summa yoki sanoq) xotirada yangilab boradi. Agar ma'lumot xotiraga sig'masa, qolganini diskka yozishga majbur bo'ladi (Spilling to disk). Odatda HashAggregate juda tez ishlaydi, chunki ma'lumotlarni tartiblash (sorting) talab qilinmaydi.

2. **GroupAggregate (SortAggregate)**: 
Avval barcha ma'lumotlarni guruhlanadigan ustun bo'yicha tartiblaydi (Sort), so'ngra qatorma-qator o'tib, guruhlarni hisoblaydi. Sorting (tartiblash) jarayoni CPU uchun og'ir va qimmat turadi. Shuning uchun ma'lumotlar bazasi asosan indekslangan ustunlar uchun yoki xotira (RAM) Hash-table uchun yetishmaganda GroupAggregate dan foydalanadi.

**Performance (Tezlik) bo'yicha maslahat**:
Barcha ma'lumotni JavaScript-ga \\\`SELECT *\\\` bilan tortib olib, Node.js da \\\`Array.reduce()\\\` orqali hisoblash qat'iyan man etiladi! DB-ning o'zi buni maxsus C/C++ tillarida yozilgan motor (engine) orqali va SIMD (Single Instruction, Multiple Data) ko'rsatmalaridan foydalanib, ancha tezroq bajaradi. Natijani tayyor holda (masalan \\\`SELECT SUM(price)\\\`) olish eng optimal yondashuvdir.

## 3. ⚠️ Edge Cases & Senior Interview Questions

1. **\\\`COUNT(*)\\\` va \\\`COUNT(column_name)\\\` o'rtasidagi farq nimada?**
   - \\\`COUNT(*)\\\` barcha qatorlarni, hatto qatordagi barcha ustunlar \\\`NULL\\\` bo'lsa ham sanaydi.
   - \\\`COUNT(column_name)\\\` esa faqat ko'rsatilgan ustunda \\\`NULL\\\` bo'lmagan qatorlarni sanaydi. \\\`NULL\\\` qiymatlar hisobga olinmaydi.

2. **Window Function va Aggregate Function ning farqi nimada?**
   - Agregat funksiya ko'plab qatorlarni birlashtirib (guruhlab), guruh uchun bitta natija qaytaradi, ya'ni yakuniy qatorlar soni qisqaradi.
   - Window function (masalan \\\`SUM(salary) OVER()\\\`) guruhlashni qatorlarni qisqartirmasdan amalga oshiradi. U har bir asl qatorni saqlab qoladi, lekin har bir qator yoniga umumiy natijani (masalan jami summani) yozib beradi.

3. **Agregat funksiyalar bilan \\\`WHERE\\\` ishlatish mumkinmi?**
   - Yo'q. \\\`WHERE\\\` guruhlash jarayonidan oldin ishlaydi va faqat oddiy qatorlarni filtrlaydi.
   - Agregat funksiyalar asosida filtrlash uchun (masalan jami summasi 100 dan katta bo'lgan guruhlar) \\\`HAVING\\\` ishlatiladi. \\\`HAVING\\\` doim guruhlash va hisoblash tugagandan so'ng ishga tushadi.

## 📊 Ma'lumotlarni Qayta ishlash Arxitekturasi

\\\`\\\`\\\`mermaid
graph TD;
    A[SQL So'rovi] --> B{Funksiya Turi};
    B -->|Skalyar| C[Har bir qatorga qo'llanadi];
    B -->|Agregat| D[Guruhlash / Aggregation Pipeline];
    D --> E{Execution Plan};
    E -->|Xotira yetarli| F[HashAggregate];
    E -->|Xotira kam / Index bor| G[GroupAggregate / Sort];
    F --> H[Umumiy Bitta Natija];
    G --> H;
\\\`\\\`\\\``,
  exercises: [
    {
      id: 1,
      title: "COUNT - Qatorlarni sanash",
      instruction: "Barcha foydalanuvchilar (users) sonini sanaydigan SQL so'rovini qaytaruvchi funksiya yozing. Alias sifatida 'total_users' ishlating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT COUNT(*) AS ...",
      solution: "function myFunction() {\n  return \"SELECT COUNT(*) AS total_users FROM users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('COUNT(*)') || !res.includes('TOTAL_USERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 2,
      title: "SUM - Yig'indini hisoblash",
      instruction: "'orders' jadvalidagi barcha 'amount' ustuni yig'indisini 'total_sales' aliasi bilan qaytaruvchi SQL yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT SUM(...) AS ...",
      solution: "function myFunction() {\n  return \"SELECT SUM(amount) AS total_sales FROM orders;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('SUM(AMOUNT)') || !res.includes('TOTAL_SALES')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 3,
      title: "AVG - O'rtacha qiymat",
      instruction: "'products' jadvalidagi 'price' ustunining o'rtacha qiymatini 'avg_price' qilib qaytaring.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT AVG(...) AS ...",
      solution: "function myFunction() {\n  return \"SELECT AVG(price) AS avg_price FROM products;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('AVG(PRICE)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 4,
      title: "MAX - Eng katta qiymat",
      instruction: "'employees' jadvalidan eng yuqori maoshni (salary) 'highest_salary' qilib oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT MAX(...) AS ...",
      solution: "function myFunction() {\n  return \"SELECT MAX(salary) AS highest_salary FROM employees;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('MAX(SALARY)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 5,
      title: "MIN - Eng kichik qiymat",
      instruction: "'products' jadvalidan eng arzon mahsulot narxini (price) 'lowest_price' qilib oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT MIN(...) AS ...",
      solution: "function myFunction() {\n  return \"SELECT MIN(price) AS lowest_price FROM products;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('MIN(PRICE)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 6,
      title: "UPPER - Katta harflarga o'tkazish",
      instruction: "'users' jadvalidan 'name' ustunini barchasini katta harflarda 'upper_name' aliasi bilan oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT UPPER(name) AS ...",
      solution: "function myFunction() {\n  return \"SELECT UPPER(name) AS upper_name FROM users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('UPPER(NAME)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 7,
      title: "LOWER - Kichik harflarga o'tkazish",
      instruction: "'users' jadvalidan 'email' ustunini to'liq kichik harflarda 'lower_email' qilib oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT LOWER(email) AS ...",
      solution: "function myFunction() {\n  return \"SELECT LOWER(email) AS lower_email FROM users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('LOWER(EMAIL)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 8,
      title: "ROUND - Yaxlitlash",
      instruction: "'products' jadvalidan 'price' ustunini 2 xona aniqlikda yaxlitlab, 'rounded_price' qilib oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT ROUND(price, 2) AS ...",
      solution: "function myFunction() {\n  return \"SELECT ROUND(price, 2) AS rounded_price FROM products;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('ROUND(PRICE, 2)') && !res.includes('ROUND(PRICE,2)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 9,
      title: "CONCAT - Birlashtirish",
      instruction: "'users' jadvalidagi 'first_name' va 'last_name' ustunlarini orasida bo'sh joy qo'yib birlashtirib, 'full_name' qilib oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT CONCAT(first_name, ' ', last_name) ...",
      solution: "function myFunction() {\n  return \"SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('CONCAT(FIRST_NAME')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 10,
      title: "COALESCE - NULL o'rniga qiymat",
      instruction: "'users' jadvalidan 'phone' ustunini oling, agar NULL bo'lsa 'No Phone' so'zini chiqaring (alias: user_phone).",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT COALESCE(phone, 'No Phone') AS ...",
      solution: "function myFunction() {\n  return \"SELECT COALESCE(phone, 'No Phone') AS user_phone FROM users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('COALESCE(PHONE') || !res.includes('NO PHONE')) throw new Error('Xato so\\'rov');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL agregat funksiyalari qanday vazifani bajaradi?",
      options: [
        "Jadvaldagi barcha qatorlarni o'chiradi",
        "Bir nechta qatorlardan bitta umumiy natija/xulosa hisoblaydi",
        "Har bir qatorga alohida hisob-kitob qo'llaydi",
        "Yangi ustun qo'shadi"
      ],
      correctAnswer: 1,
      explanation: "Agregat funksiyalar (masalan SUM, AVG) ko'plab qatorlarni birlashtirib bitta qiymat beradi."
    },
    {
      id: 2,
      question: "Qaysi funksiya NULL qiymatlarni sanamaydi?",
      options: [
        "COUNT(*)",
        "COUNT(1)",
        "COUNT(column_name)",
        "Yuqoridagilarning barchasi sanaydi"
      ],
      correctAnswer: 2,
      explanation: "COUNT(column_name) ko'rsatilgan ustundagi faqat NULL bo'lmagan (mavjud) qiymatlarni sanaydi. COUNT(*) barchasini sanaydi."
    },
    {
      id: 3,
      question: "Ma'lumotlarni guruhlaganda (GROUP BY), agregat funksiyalar natijasi bo'yicha filtrlash uchun nima ishlatiladi?",
      options: [
        "WHERE",
        "HAVING",
        "FILTER",
        "ORDER BY"
      ],
      correctAnswer: 1,
      explanation: "Agregat funksiyalar natijasi bo'yicha filtrlash faqat HAVING orqali qilinadi. WHERE esa oddiy qatorlarni guruhlashdan oldin filtrlaydi."
    },
    {
      id: 4,
      question: "Matnni faqat kichik harflarga o'tkazuvchi skalyar SQL funksiyasi qaysi?",
      options: [
        "SMALLTEXT()",
        "LOWER()",
        "DOWN()",
        "MIN()"
      ],
      correctAnswer: 1,
      explanation: "LOWER() funksiyasi berilgan matndagi barcha harflarni kichik registrga o'tkazadi."
    },
    {
      id: 5,
      question: "Qatorlar narxining o'rtacha qiymatini qanday topish mumkin?",
      options: [
        "SELECT MIDDLE(price)",
        "SELECT AVG(price)",
        "SELECT MEAN(price)",
        "SELECT CENTER(price)"
      ],
      correctAnswer: 1,
      explanation: "SQL da o'rtacha qiymat topish uchun AVG() (Average) agregat funksiyasi ishlatiladi."
    },
    {
      id: 6,
      question: "Agar qatorda NULL qiymat bo'lsa, o'rniga default qiymat qaytarish uchun qaysi funksiya ishlatiladi?",
      options: [
        "ISNULL()",
        "NVL()",
        "COALESCE()",
        "IFNULL()"
      ],
      correctAnswer: 2,
      explanation: "COALESCE() standart SQL funksiyasi bo'lib, o'z ro'yxatidagi birinchi NULL bo'lmagan qiymatni qaytaradi."
    },
    {
      id: 7,
      question: "ROUND(45.926, 2) qanday natija beradi?",
      options: [
        "45",
        "46",
        "45.93",
        "45.92"
      ],
      correctAnswer: 2,
      explanation: "ROUND funksiyasi 2-xona aniqlikkacha yaxlitlaydi, 0.006 > 0.005 bo'lgani uchun natija 45.93 ga aylanadi."
    },
    {
      id: 8,
      question: "Qatorlardagi matnlarni bir-biriga yopishtirish (birlashtirish) uchun qaysi funksiyadan foydalaniladi?",
      options: [
        "JOIN()",
        "MERGE()",
        "CONCAT()",
        "ADD()"
      ],
      correctAnswer: 2,
      explanation: "CONCAT() funksiyasi 2 yoki undan ortiq matnlarni bir-biriga ulash/birlashtirish uchun ishlatiladi."
    },
    {
      id: 9,
      question: "HashAggregate ning GroupAggregate (SortAggregate) dan asosiy ustunligi nimada?",
      options: [
        "Index kerak emas va xotira(RAM) yetarli bo'lsa ma'lumotlarni tartiblamaydi (sorting qilinmaydi) shu sabab tezroq",
        "Har doim disk(xotira) dan foydalanadi va xavfsizroq",
        "Faqat kichik jadvallar bilan ishlaydi",
        "HashAggregate umuman mavjud emas"
      ],
      correctAnswer: 0,
      explanation: "HashAggregate ma'lumotlarni tartiblash(sorting)ga vaqt sarflamaydi va xotirada tezkor hash-table yaratish orqali natija beradi."
    },
    {
      id: 10,
      question: "SUM va COUNT funksiyalarining maqsadi qanday farqlanadi?",
      options: [
        "SUM qatorlarni sanaydi, COUNT qo'shadi",
        "SUM sonlarni bir-biriga qo'shib jami miqdorni hisoblaydi, COUNT esa qatorlar sonini sanaydi",
        "Ikkalasi ham har qanday ma'lumotni hisoblaydi va bir xil ish qiladi",
        "COUNT faqat sonlarda, SUM esa matnlarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "SUM matematik qo'shish jarayoni, COUNT esa ob'ekt(qator)lar sanog'ini chiqarish jarayoni hisoblanadi."
    },
    {
      id: 11,
      question: "Window function agregat funksiyadan nima bilan farq qiladi?",
      options: [
        "O'rtasida hech qanday farq yo'q",
        "Window function asl qatorlarni qisqartirib tashlaydi",
        "Window function qatorlarni qisqartirmasdan har bir qator yoniga umumiy natija beradi",
        "Window function faqat Windows operatsion tizimi serverlarida ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Window function guruhlashda original qatorlar sonini o'zgartirmay, har bir qator ma'lumotini saqlab qoladi."
    },
    {
      id: 12,
      question: "Hisoblashlarni SQL o'zida amalga oshirish nima uchun frontend/backend da hisoblashdan (masalan Array.reduce) afzal?",
      options: [
        "C++ da yozilgan DB engine va SIMD imkoniyatlari sababli ishlash tezligi yuqori bo'ladi va tarmoq orqali ortiqcha data o'tmaydi",
        "JavaScript hisoblashlarda xato qiladi",
        "Ma'lumotlar bazasi ko'proq xotira egallaydi",
        "Hech qachon afzal emas, doim Array.reduce ishlatish kerak"
      ],
      correctAnswer: 0,
      explanation: "Katta hajmdagi ma'lumotni tarmoq orqali o'tkazmay, uni SQL orqali motorning o'zida hisoblash ancha samarali va tez."
    }
  ]
};
