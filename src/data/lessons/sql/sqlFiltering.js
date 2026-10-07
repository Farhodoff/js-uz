export const sqlFiltering = {
  id: "sqlFiltering",
  title: "SQL Ma'lumotlarni Filtrlash",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT, city STRING); INSERT INTO users VALUES (1,'Ali',25,'Toshkent'),(2,'Vali',17,'Samarqand'),(3,'Guli',30,'Toshkent'),(4,'Hasan',22,NULL),(5,'Malika',19,'Buxoro'),(6,'Jasur',35,'Samarqand'),(7,'Nodira',28,'Toshkent'),(8,'Otabek',16,'Buxoro'),(9,'Sanjar',40,'Xiva');",
  theory: `## 1. 💡 Sodda Tushuntirish
SQL da filtrlash (Filtering) xuddi onlayn do'konda qidiruv filtrlarini o'rnatishga o'xshaydi. Tasavvur qiling, sizga "Faqat qora rangli", "Narxi $1000 dan arzon", va "Apple yoki Samsung brendi" bo'lgan telefonlar kerak. Siz barcha millionlab telefonlarni bittalab qidirmaysiz, shunchaki filtrlarni belgilaysiz va tizim sizga faqat shartlarga mos keladiganlarni ko'rsatadi. SQL dagi \\\`WHERE\\\` operatori ham xuddi shunday ishlaydi - bazadagi millionlab qatorlardan faqat bizning shartlarimizga mos keladiganlarini filtrlab beradi.

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

## 2. 🧠 Chuqur Tahlil (Chuqurlashtirilgan o'rganish)
**Ichki ishlash mexanizmi:**
SQL dvigateli (Engine) \\\`WHERE\\\` shartini ko'rganda nima qiladi? Agar filtrlayotgan ustunimizda **Index** (B-Tree indeksi) bo'lmasa, ma'lumotlar bazasi **Full Table Scan (To'liq jadval skanerlashi)** ni amalga oshiradi. Bu degani jadvaldagi millionlab qatorlarni bittalab tekshirib chiqadi. Bu xotira (RAM) va vaqt jihatidan juda qimmat jarayon.

Agar biz \\\`age\\\` yoki \\\`city\\\` ustuniga **B-Tree Index** o'rnatgan bo'lsak, ma'lumotlar bazasi indeks orqali barcha qatorlarni emas, faqat kerakli qatorlarni to'g'ridan-to'g'ri (Logarithmic vaqtda - O(log n)) topib oladi.

**Performance (Tezlik):**
1. **IN vs OR:** Ko'p hollarda \\\`column IN (val1, val2)\\\` yozish \\\`column = val1 OR column = val2\\\` dan ko'ra tezroq ishlaydi, chunki SQL optimizatori \\\`IN\\\` dagi qiymatlarni binar qidiruv orqali tekshirish uchun tartiblashi mumkin.
2. **LIKE '%text%':** LIKE operatorida qidiruvni \\\`%\\\` bilan boshlash (masalan, \\\`'%son'\\\`) Index ishlatilishini butunlay cheklaydi (Index Scan o'rniga Full Table Scan bo'ladi). Bunga sabab, B-Tree indekslari so'zlarning bosh harflariga qarab daraxt tuzadi. Faqat so'z boshi ma'lum bo'lsa (masalan \\\`'son%'\\\`) indeks ishlaydi.

## 3. ⚠️ Chekka holatlar va Senior Intervyu Savollari

1. **\\\`NULL\\\` bilan solishtirish muammosi:**
   \\\`WHERE age != 25\\\` sharti \\\`age\\\` ustuni \\\`NULL\\\` bo'lgan qatorlarni qaytarmaydi! SQL da \\\`NULL\\\` noma'lum degani. Shuning uchun noma'lum narsa 25 ga teng yoki teng emasligini bilib bo'lmaydi. \\\`NULL\\\` ni tekshirish uchun har doim \\\`IS NULL\\\` yoki \\\`IS NOT NULL\\\` dan foydalanish kerak.

2. **\\\`AND\\\` va \\\`OR\\\` Prioriteti (Ustuvorligi):**
   Mantiqiy ifodalarda \\\`AND\\\` har doim \\\`OR\\\` dan oldin bajariladi.
   \\\`WHERE age > 18 OR role = 'admin' AND active = true\\\` bu shart aslida bunday ishlaydi:
   \\\`WHERE age > 18 OR (role = 'admin' AND active = true)\\\`. Xatolarni oldini olish uchun doim qavslardan foydalaning!

3. **\\\`BETWEEN\\\` va Sanalar (Dates):**
   \\\`WHERE created_at BETWEEN '2023-01-01' AND '2023-01-31'\\\` so'rovi ba'zan '2023-01-31 15:00:00' dagi ma'lumotlarni olmay qoladi, chunki vaqt ko'rsatilmasa, u \\\`'2023-01-31 00:00:00'\\\` deb olinadi. Buning o'rniga \\\`>= '2023-01-01' AND < '2023-02-01'\\\` yozish to'g'riroq.

## 🛠️ Amaliy Topshiriqlar uchun Vizualizatsiya
\\\`\\\`\\\`mermaid
flowchart TD
    A[WHERE Operatorlari] --> B(Mantiqiy)
    A --> C(Kengaytirilgan)
    B --> D[AND]
    B --> E[OR]
    B --> F[NOT]
    C --> G[IN]
    C --> H[BETWEEN]
    C --> I[LIKE]
    C --> J[IS NULL]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: VA (AND)",
      instruction: "users jadvalidan (id, name, age, city) yoshi 18 dan katta VA shahri Toshkent bo'lganlarni toping. Natijada Ali, Guli, Nodira chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE age > 18 AND city = 'Toshkent'",
      solution: "SELECT * FROM users WHERE age > 18 AND city = 'Toshkent';",
      test: "if (!/\\bAND\\b/i.test(code)) return 'AND operatorini ishlating';\nconst names = result.map(r => r.name).sort();\nconst exp = ['Ali', 'Guli', 'Nodira'];\nif (JSON.stringify(names) !== JSON.stringify(exp)) return 'Ali, Guli, Nodira chiqishi kerak. Chiqdi: ' + names.join(', ');\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: YOKI (OR)",
      instruction: "users jadvalidan yoshi 18 dan kichik YOKI shahri Buxoro bo'lganlarni toping. Natijada Vali, Malika, Otabek chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE age < 18 OR city = 'Buxoro'",
      solution: "SELECT * FROM users WHERE age < 18 OR city = 'Buxoro';",
      test: "if (!/\\bOR\\b/i.test(code)) return 'OR operatorini ishlating';\nconst names = result.map(r => r.name).sort();\nconst exp = ['Malika', 'Otabek', 'Vali'];\nif (JSON.stringify(names) !== JSON.stringify(exp)) return 'Vali, Malika, Otabek chiqishi kerak. Chiqdi: ' + names.join(', ');\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: IN operatori",
      instruction: "users jadvalidan shahri Toshkent yoki Buxoro bo'lganlarni IN bilan toping. 5 qator chiqishi kerak (Ali, Guli, Malika, Nodira, Otabek).",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE city IN ('Toshkent', 'Buxoro')",
      solution: "SELECT * FROM users WHERE city IN ('Toshkent', 'Buxoro');",
      test: "if (!/\\bIN\\b/i.test(code)) return 'IN operatorini ishlating';\nconst names = result.map(r => r.name).sort();\nconst exp = ['Ali', 'Guli', 'Malika', 'Nodira', 'Otabek'];\nif (JSON.stringify(names) !== JSON.stringify(exp)) return '5 qator chiqishi kerak. Chiqdi: ' + names.join(', ');\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Oraliq (BETWEEN)",
      instruction: "users jadvalidan yoshi 18 dan 30 gacha bo'lganlarni BETWEEN bilan toping. 5 qator chiqishi kerak (Ali, Guli, Hasan, Malika, Nodira — shahar farqi yo'q).",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE age BETWEEN 18 AND 30",
      solution: "SELECT * FROM users WHERE age BETWEEN 18 AND 30;",
      test: "if (!/\\bBETWEEN\\b/i.test(code)) return 'BETWEEN operatorini ishlating';\nconst names = result.map(r => r.name).sort();\nconst exp = ['Ali', 'Guli', 'Hasan', 'Malika', 'Nodira'];\nif (JSON.stringify(names) !== JSON.stringify(exp)) return '5 qator chiqishi kerak. Chiqdi: ' + names.join(', ');\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: O'xshashlik (LIKE)",
      instruction: "users jadvalidan ismida 'a' harfi qatnashganlarni LIKE bilan toping. 8 qator chiqishi kerak (faqat Guli qatnashmaydi).",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE name LIKE '%a%'",
      solution: "SELECT * FROM users WHERE name LIKE '%a%';",
      test: "if (!/\\bLIKE\\b/i.test(code)) return 'LIKE operatorini ishlating';\nif (result.length !== 8) return '8 qator chiqishi kerak. Chiqdi: ' + result.length;\nif (result.some(r => r.name === 'Guli')) return 'Guli chiqmasligi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Inkor (NOT)",
      instruction: "users jadvalidan yoshi 18 dan kichik BO'LMAGANLARNI toping (NOT bilan). 7 qator chiqishi kerak (Vali va Otabek chiqmasligi kerak).",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE NOT age < 18",
      solution: "SELECT * FROM users WHERE NOT age < 18;",
      test: "if (!/\\bNOT\\b/i.test(code)) return 'NOT operatorini ishlating';\nconst names = result.map(r => r.name).sort();\nif (names.length !== 7) return '7 qator chiqishi kerak. Chiqdi: ' + names.join(', ');\nif (names.includes('Vali') || names.includes('Otabek')) return 'Vali va Otabek chiqmasligi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Boshlanishni qidirish",
      instruction: "users jadvalidan ismi 'M' harfi bilan boshlanadiganlarni toping. Faqat Malika chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE name LIKE 'M%'",
      solution: "SELECT * FROM users WHERE name LIKE 'M%';",
      test: "if (!/\\bLIKE\\b/i.test(code)) return 'LIKE operatorini ishlating';\nconst names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Malika'])) return 'Faqat Malika chiqishi kerak. Chiqdi: ' + names.join(', ');\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Oxirini qidirish",
      instruction: "users jadvalidan ismi 'ar' bilan tugaydiganlarni toping. Faqat Sanjar chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE name LIKE '%ar'",
      solution: "SELECT * FROM users WHERE name LIKE '%ar';",
      test: "if (!/\\bLIKE\\b/i.test(code)) return 'LIKE operatorini ishlating';\nconst names = result.map(r => r.name);\nif (JSON.stringify(names) === JSON.stringify(['Sanjar'])) return null;\nreturn 'Faqat Sanjar chiqishi kerak. Chiqdi: ' + names.join(', ');"
    },
    {
      id: 9,
      title: "9-Topshiriq: Bo'shliqni topish (IS NULL)",
      instruction: "users jadvalidan shahri kiritilmagan (NULL) qatorni toping. Faqat Hasan chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE city IS NULL",
      solution: "SELECT * FROM users WHERE city IS NULL;",
      test: "if (!/\\bIS\\s+NULL\\b/i.test(code)) return 'IS NULL yozing';\nconst names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Hasan'])) return 'Faqat Hasan chiqishi kerak. Chiqdi: ' + names.join(', ');\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Bo'sh emaslik (IS NOT NULL)",
      instruction: "users jadvalidan shahri kiritilgan qatorlarni toping. 8 qator chiqishi kerak (faqat Hasan chiqmasligi kerak).",
      startingCode: "SELECT * FROM users;",
      hint: "WHERE city IS NOT NULL",
      solution: "SELECT * FROM users WHERE city IS NOT NULL;",
      test: "if (!/\\bIS\\s+NOT\\s+NULL\\b/i.test(code)) return 'IS NOT NULL yozing';\nif (result.length !== 8) return '8 qator chiqishi kerak. Chiqdi: ' + result.length;\nif (result.some(r => r.name === 'Hasan')) return 'Hasan chiqmasligi kerak';\nreturn null;"
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
