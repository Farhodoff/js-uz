export const sqlFiltering = {
  id: "sql_filtering",
  title: "SQL Ma'lumotlarni Filtrlash",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
SQL da bizga kerakli aniq ma'lumotni izlab topish uchun filtrlardan foydalanamiz. Bu xuddi onlayn do'konda "narxi 100$ gacha", "rangi qora" va "brandi Apple" bo'lgan telefonlarni qidirishga o'xshaydi.

Eng ko'p ishlatiladigan filter operatorlari:
- **AND, OR, NOT:** Mantiqiy bog'lovchilar.
- **IN:** Bir nechta variantlardan biriga mos kelishini tekshirish.
- **BETWEEN:** Ikki qiymat oralig'ida ekanligini tekshirish.
- **LIKE:** Matnning ma'lum bir qismiga o'xshashlikni qidirish.

\\\`\\\`\\\`sql
-- AND (va): Yosh 18 dan katta VA shahri 'Toshkent' bo'lsa
SELECT * FROM users WHERE age > 18 AND city = 'Toshkent';

-- OR (yoki): Yosh 18 dan katta YOKI shahri 'Toshkent' bo'lsa
SELECT * FROM users WHERE age > 18 OR city = 'Toshkent';

-- IN: Shahar quyidagilardan biri bo'lsa
SELECT * FROM users WHERE city IN ('Toshkent', 'Samarqand', 'Buxoro');

-- BETWEEN: Yosh 18 va 30 orasida bo'lsa
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- LIKE: Ismi 'A' harfidan boshlanadiganlarni topish
SELECT * FROM users WHERE name LIKE 'A%';
\\\`\\\`\\\`

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON:** Bir nechta \`OR\` larni qatorasiga yozaverish.
\`\`\`sql
SELECT * FROM products WHERE color = 'Red' OR color = 'Blue' OR color = 'Green';
\`\`\`

**✅ YAXSHI:** \`OR\` lar o'rniga \`IN\` dan foydalanish. Bu ancha tushunarli va tezroq ishlashi mumkin.
\`\`\`sql
SELECT * FROM products WHERE color IN ('Red', 'Blue', 'Green');
\`\`\`

## 🎤 Intervyu Savollari
1. **\`LIKE '%a%'\` va \`LIKE 'a%'\` farqi nima?**
   - \`'a%'\` matn aynan "a" harfi bilan boshlanishini, \`'%a%'\` esa matnning istalgan joyida "a" qatnashganini bildiradi.
2. **\`BETWEEN\` oraliq chegaralarini (18 va 30 ni) ham hisobga oladimi (inclusive)?**
   - Ha, aksariyat SQL bazalarida \`BETWEEN 18 AND 30\` deganda 18 ham, 30 ham natijaga kiradi (>= 18 AND <= 30).
3. **\`AND\` va \`OR\` ni birga ishlatganda nimalarga e'tibor berish kerak?**
   - Ularning ustuvorligi turlicha. \`AND\` birinchi bajariladi. Xatolikni oldini olish uchun qavslardan \`()\` foydalanish shart. Masalan: \`WHERE (age > 18 OR role = 'admin') AND active = true\`.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
flowchart TD
    A[WHERE Sharti] --> B(Mantiqiy)
    A --> C(Kengaytirilgan)
    B --> D(AND)
    B --> E(OR)
    B --> F(NOT)
    C --> G(IN)
    C --> H(BETWEEN)
    C --> I(LIKE)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: VA (AND)",
      instruction: "Ikkita shart ham bir vaqtda to'g'ri bo'lishi kerak bo'lganda qaysi mantiqiy operator ishlatiladi?",
      startingCode: "function getAndOperator() {\n  return '';\n}",
      hint: "AND so'zini qaytaring.",
      solution: "function getAndOperator() {\n  return 'AND';\n}",
      test: "const fn = new Function(code + '; return getAndOperator;')();\nif (fn().toUpperCase() !== 'AND') throw new Error(\"AND kutilgandi\");"
    },
    {
      id: 2,
      title: "2-Topshiriq: YOKI (OR)",
      instruction: "Shartlardan bittasi to'g'ri bo'lsa ham qabul qilinishi uchun qaysi operator ishlatiladi?",
      startingCode: "function getOrOperator() {\n  return '';\n}",
      hint: "OR so'zini qaytaring.",
      solution: "function getOrOperator() {\n  return 'OR';\n}",
      test: "const fn = new Function(code + '; return getOrOperator;')();\nif (fn().toUpperCase() !== 'OR') throw new Error(\"OR kutilgandi\");"
    },
    {
      id: 3,
      title: "3-Topshiriq: IN operatori",
      instruction: "Ko'p 'OR' larning o'rnini bosuvchi va qavslar ichidagi ro'yxatni tekshiruvchi operator qaysi?",
      startingCode: "function getInOperator() {\n  return '';\n}",
      hint: "IN so'zini qaytaring.",
      solution: "function getInOperator() {\n  return 'IN';\n}",
      test: "const fn = new Function(code + '; return getInOperator;')();\nif (fn().toUpperCase() !== 'IN') throw new Error(\"IN kutilgandi\");"
    },
    {
      id: 4,
      title: "4-Topshiriq: Oraliq (BETWEEN)",
      instruction: "Ikkita raqam yoki sananing orasidagi ma'lumotlarni olish uchun qaysi operator ishlatiladi?",
      startingCode: "function getBetweenOperator() {\n  return '';\n}",
      hint: "BETWEEN",
      solution: "function getBetweenOperator() {\n  return 'BETWEEN';\n}",
      test: "const fn = new Function(code + '; return getBetweenOperator;')();\nif (fn().toUpperCase() !== 'BETWEEN') throw new Error(\"BETWEEN kutilgandi\");"
    },
    {
      id: 5,
      title: "5-Topshiriq: O'xshashlik (LIKE)",
      instruction: "Matnning ma'lum bir qismiga o'xshashlikni qidirish uchun (masalan '%son') qaysi operator ishlatiladi?",
      startingCode: "function getLikeOperator() {\n  return '';\n}",
      hint: "LIKE",
      solution: "function getLikeOperator() {\n  return 'LIKE';\n}",
      test: "const fn = new Function(code + '; return getLikeOperator;')();\nif (fn().toUpperCase() !== 'LIKE') throw new Error(\"LIKE kutilgandi\");"
    },
    {
      id: 6,
      title: "6-Topshiriq: Inkor (NOT)",
      instruction: "Shartning teskarisini bajarish uchun qaysi operator ishlatiladi? (Masalan null EMAS)",
      startingCode: "function getNotOperator() {\n  return '';\n}",
      hint: "NOT",
      solution: "function getNotOperator() {\n  return 'NOT';\n}",
      test: "const fn = new Function(code + '; return getNotOperator;')();\nif (fn().toUpperCase() !== 'NOT') throw new Error(\"NOT kutilgandi\");"
    },
    {
      id: 7,
      title: "7-Topshiriq: Boshlanishni qidirish",
      instruction: "'M' harfi bilan boshlanadigan ismlarni topish uchun LIKE operatoriga qanday qiymat beramiz? (Faqat matnni qaytaring)",
      startingCode: "function getStartsWithM() {\n  return '';\n}",
      hint: "M% deb qaytaring.",
      solution: "function getStartsWithM() {\n  return 'M%';\n}",
      test: "const fn = new Function(code + '; return getStartsWithM;')();\nif (fn() !== 'M%') throw new Error(\"M% kutilgandi\");"
    },
    {
      id: 8,
      title: "8-Topshiriq: Oxirini qidirish",
      instruction: "'son' so'zi bilan tugaydigan ismlarni topish uchun (masalan 'Jackson', 'Johnson') LIKE ga qanday qiymat beramiz?",
      startingCode: "function getEndsWithSon() {\n  return '';\n}",
      hint: "%son deb qaytaring.",
      solution: "function getEndsWithSon() {\n  return '%son';\n}",
      test: "const fn = new Function(code + '; return getEndsWithSon;')();\nif (fn() !== '%son') throw new Error(\"%son kutilgandi\");"
    },
    {
      id: 9,
      title: "9-Topshiriq: O'rtasidan qidirish",
      instruction: "Ismning qayeridadir 'a' harfi bo'lsa topish uchun LIKE ga qanday qiymat beramiz?",
      startingCode: "function getContainsA() {\n  return '';\n}",
      hint: "%a% deb qaytaring.",
      solution: "function getContainsA() {\n  return '%a%';\n}",
      test: "const fn = new Function(code + '; return getContainsA;')();\nif (fn() !== '%a%') throw new Error(\"%a% kutilgandi\");"
    },
    {
      id: 10,
      title: "10-Topshiriq: Bo'sh emaslik (IS NOT NULL)",
      instruction: "Biror ustun bo'sh (NULL) emasligini tekshirish uchun IS NULL emas, qanday yoziladi? (IS NOT NULL)",
      startingCode: "function getIsNotNull() {\n  return '';\n}",
      hint: "IS NOT NULL",
      solution: "function getIsNotNull() {\n  return 'IS NOT NULL';\n}",
      test: "const fn = new Function(code + '; return getIsNotNull;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'IS NOT NULL') throw new Error(\"IS NOT NULL kutilgandi\");"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Ikkita shart ham albatta to'g'ri bo'lishini talab qiluvchi operator qaysi?",
      options: ["OR", "AND", "NOT", "LIKE"],
      correctAnswer: 1,
      explanation: "AND operatori orqali birlashtirilgan barcha shartlar true (to'g'ri) bo'lishi shart."
    },
    {
      id: 2,
      question: "Shartlardan hech bo'lmaganda bittasi to'g'ri bo'lsa kifoya qiladigan operator qaysi?",
      options: ["AND", "OR", "BETWEEN", "IN"],
      correctAnswer: 1,
      explanation: "OR operatori qatorda shartlardan bittasi to'g'ri bo'lsa ham qabul qiladi."
    },
    {
      id: 3,
      question: "age BETWEEN 18 AND 30 qaysi operatorlarga ekvivalent?",
      options: ["age > 18 OR age < 30", "age >= 18 AND age <= 30", "age = 18 AND age = 30", "age > 18 AND age < 30"],
      correctAnswer: 1,
      explanation: "BETWEEN oraliqni o'z ichiga oladi (inclusive), ya'ni >= va <= ga teng."
    },
    {
      id: 4,
      question: "Ko'plab OR shartlarini yozishni osonlashtiruvchi operator qaysi?",
      options: ["BETWEEN", "LIKE", "IN", "IS"],
      correctAnswer: 2,
      explanation: "IN operatori qavs ichida bir nechta qiymatlarni berish orqali OR zanjirini qisqartiradi."
    },
    {
      id: 5,
      question: "Matn ichidan qidiruvchi LIKE operatorida '%' belgisi nimani anglatadi?",
      options: ["Faqat bitta harf", "0 yoki undan ko'p ixtiyoriy belgilar", "Raqam", "Probel"],
      correctAnswer: 1,
      explanation: "% belgisi istalgancha (hatto 0 ta) belgilar ketma-ketligini bildiradi."
    },
    {
      id: 6,
      question: "Matn ichida 'a' harfi bilan boshlanadigan ismni qanday qidiramiz?",
      options: ["LIKE '%a'", "LIKE 'a%'", "LIKE '%a%'", "LIKE '_a_'"],
      correctAnswer: 1,
      explanation: "'a%' degani birinchi harf 'a' bo'lsin, qolgani nima bo'lsa ham mayli degani."
    },
    {
      id: 7,
      question: "LIKE dagi '_' (pastki chiziq) belgisi nimani anglatadi?",
      options: ["Probel", "Faqat bitta ixtiyoriy belgi", "Istalgancha belgi", "Raqam"],
      correctAnswer: 1,
      explanation: "_ (pastki chiziq) har doim aynan bitta belgining o'rnini bosadi."
    },
    {
      id: 8,
      question: "Qaysi biri NULL qiymatni to'g'ri tekshiradi?",
      options: ["= NULL", "IS NULL", "== NULL", "LIKE NULL"],
      correctAnswer: 1,
      explanation: "SQL da NULL oddiy qiymat emas, u 'hech narsa yo'q' degani, shuning uchun '=' bilan emas, IS NULL bilan tekshiriladi."
    },
    {
      id: 9,
      question: "city IN ('Toshkent', 'Buxoro') ni OR bilan qanday yozish mumkin?",
      options: ["city = 'Toshkent' AND city = 'Buxoro'", "city = 'Toshkent' OR city = 'Buxoro'", "city LIKE 'Toshkent' OR 'Buxoro'", "city BETWEEN 'Toshkent' AND 'Buxoro'"],
      correctAnswer: 1,
      explanation: "IN operatori asosan ko'plab '=' va 'OR' larning qisqartmasidir."
    },
    {
      id: 10,
      question: "AND va OR ni aralash ishlatganda nima yuz beradi?",
      options: ["Xato beradi", "OR birinchi bajariladi", "AND birinchi bajariladi", "Chapdan ongga bajariladi"],
      correctAnswer: 2,
      explanation: "Matematikadagi ko'paytirish qo'shishdan oldin bajarilganidek, mantiqda AND OR dan oldin bajariladi."
    },
    {
      id: 11,
      question: "Shartni inkor qilish uchun qaysi so'z ishlatiladi?",
      options: ["NOT", "NO", "FALSE", "MINUS"],
      correctAnswer: 0,
      explanation: "NOT shartning qiymatini teskarisiga o'zgartiradi (masalan NOT IN, NOT LIKE)."
    },
    {
      id: 12,
      question: "LIKE '%book%' nimani izlaydi?",
      options: ["book bilan boshlanadigan", "book bilan tugaydigan", "Faqat book", "Ichida book so'zi bor istalgan matn"],
      correctAnswer: 3,
      explanation: "Ikki tomondan % bo'lsa, qidirilayotgan so'z qayerda qatnashganidan qat'iy nazar topiladi."
    }
  ]
};
