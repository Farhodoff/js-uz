export const sqlFunctions = {
  id: "sql_functions_1",
  title: "SQL Functions (Funksiyalar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
SQL funksiyalari xuddi JavaScript'dagi funksiyalarga o'xshaydi, lekin ular to'g'ridan-to'g'ri ma'lumotlar bazasida ishlaydi. Ular ma'lumotni o'zgartirish, hisoblash yoki guruhlash uchun ishlatiladi.
Asosan 2 turga bo'linadi:
1. **Scalar (Skalyar) funksiyalar**: Har bir qator uchun alohida qiymat qaytaradi (masalan, \`UPPER(name)\`, \`ROUND(price, 2)\`).
2. **Aggregate (Agregat) funksiyalar**: Bir necha qatorlarni birlashtirib, bitta umumiy natija qaytaradi (masalan, \`SUM(price)\`, \`COUNT(id)\`).

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON**: Barcha ma'lumotlarni JS ga tortib kelib, keyin hisoblash:
\`\`\`javascript
// 10,000 ta qatorni bazadan xotiraga olib kelish (Yomon performance)
const users = await db.query("SELECT * FROM users"); 
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
\`\`\`

✅ **YAXSHI**: Hisoblashni SQL o'zida bajarish:
\`\`\`javascript
// Baza o'zi hisoblab, bitta qator qaytaradi (Juda tez)
const result = await db.query("SELECT SUM(age) as total_age FROM users");
\`\`\`

## 🎤 Intervyu Savollari
1. **\`COUNT(*)\` va \`COUNT(column_name)\` o'rtasidagi farq nima?**
   - \`COUNT(*)\` jami qatorlar sonini sanaydi (hatto \`NULL\` bo'lsa ham). \`COUNT(column_name)\` esa faqat \`NULL\` bo'lmagan qiymatlarni sanaydi.
2. **Agregat funksiyalarni \`WHERE\` bilan ishlatsa bo'ladimi?**
   - Yo'q, agregat funksiyalar bo'yicha filtrlash uchun \`HAVING\` ishlatiladi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD;
    A[Ma'lumotlar Bazasi] --> B(SQL Funksiyasi);
    B -->|Skalyar| C[Har bir qator o'zgaradi];
    B -->|Agregat| D[Bitta umumiy natija];
\`\`\`
`,
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
      question: "SQL agregat funksiyalari nima vazifani bajaradi?",
      options: [
        "Jadvaldagi barcha qatorlarni o'chiradi",
        "Bir nechta qatorlardan yagona xulosa/natija hisoblaydi",
        "Ma'lumotlar bazasini zaxiralaydi (backup)",
        "Yangi ustun qo'shadi"
      ],
      correctAnswer: 1,
      explanation: "Agregat funksiyalar ko'plab qatorlar ustida amal bajarib, bitta qiymat (masalan, SUM, COUNT) qaytaradi."
    },
    {
      id: 2,
      question: "Qaysi funksiya NULL qiymatlarni sanamaydi?",
      options: [
        "COUNT(*)",
        "COUNT(1)",
        "COUNT(column_name)",
        "Barchasi sanaydi"
      ],
      correctAnswer: 2,
      explanation: "COUNT(column_name) faqat shu ustundagi NULL bo'lmagan qiymatlarni sanaydi. COUNT(*) esa hamma qatorni sanaydi."
    },
    {
      id: 3,
      question: "Ma'lumotlarni guruhlaganda (GROUP BY), ustunni filtrlash uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "WHERE",
        "FILTER",
        "HAVING",
        "ORDER BY"
      ],
      correctAnswer: 2,
      explanation: "Agregat funksiyalar yordamida filtrlash WHERE bilan emas, HAVING orqali qilinadi."
    },
    {
      id: 4,
      question: "Matnni faqat kichik harflarga o'tkazuvchi SQL funksiyasi qaysi?",
      options: [
        "SMALLTEXT()",
        "LOWER()",
        "DOWN()",
        "MIN()"
      ],
      correctAnswer: 1,
      explanation: "LOWER() funksiyasi matndagi barcha harflarni kichik registrga o'tkazadi."
    },
    {
      id: 5,
      question: "Narxlarni o'rtacha qiymatini qanday topish mumkin?",
      options: [
        "SELECT MIDDLE(price)",
        "SELECT AVG(price)",
        "SELECT MEAN(price)",
        "SELECT CENTER(price)"
      ],
      correctAnswer: 1,
      explanation: "SQL da o'rtacha qiymat topish uchun AVG() (Average) ishlatiladi."
    },
    {
      id: 6,
      question: "NULL qiymat o'rniga default qiymat qaytaruvchi qaysi funksiya standart hisoblanadi?",
      options: [
        "ISNULL()",
        "NVL()",
        "COALESCE()",
        "IFNULL()"
      ],
      correctAnswer: 2,
      explanation: "COALESCE() standart SQL funksiyasi bo'lib, ro'yxatdagi birinchi NULL bo'lmagan qiymatni qaytaradi."
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
      explanation: "ROUND funksiyasi 2-xona aniqlikgacha yaxlitlaydi, .926 = .93 bo'ladi."
    },
    {
      id: 8,
      question: "Qatorlarni birlashtirish (string concatenation) uchun qaysi funksiyadan foydalaniladi?",
      options: [
        "JOIN()",
        "MERGE()",
        "CONCAT()",
        "ADD()"
      ],
      correctAnswer: 2,
      explanation: "CONCAT() funksiyasi berilgan matnlarni bir-biriga yopishtirib beradi."
    },
    {
      id: 9,
      question: "SELECT MAX(name) FROM users nimani qaytaradi?",
      options: [
        "Eng ko'p harfdan iborat ismni",
        "Alifbo bo'yicha eng oxirgi ismni",
        "Xato yuz beradi, MAX faqat sonlarda ishlaydi",
        "Eng mashhur ismni"
      ],
      correctAnswer: 1,
      explanation: "Matnlar (string) bilan MAX ishlatsangiz, u leksikografik (alifbo) bo'yicha eng oxirgi qiymatni qaytaradi (masalan 'Z' harfidan boshlanadigan)."
    },
    {
      id: 10,
      question: "Asosiy farqi: SUM va COUNT o'rtasida nima?",
      options: [
        "SUM qatorlarni sanaydi, COUNT qo'shadi",
        "SUM qiymatlarni qo'shadi, COUNT nechta qator borligini sanaydi",
        "Ikkalasi ham bir xil ish qiladi",
        "COUNT faqat sonlarda, SUM esa matnlarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "SUM sonlarni matematik jihatdan bir-biriga qo'shib yig'indini beradi. COUNT esa ularning sonini sanaydi."
    },
    {
      id: 11,
      question: "Skalyar (Scalar) funksiyaning xususiyati nimada?",
      options: [
        "Natijani butun jadval bo'ylab guruhlaydi",
        "Ma'lumotlar bazasiga o'zgarish (INSERT) kiritadi",
        "Har bir qatordagi qiymat uchun alohida yakka natija qaytaradi",
        "U faqat jadvallarni bog'lashda kerak"
      ],
      correctAnswer: 2,
      explanation: "Skalyar funksiya har bir qator uchun ishlab, shu qatorning o'zgarishini qaytaradi (masalan, UPPER(name))."
    },
    {
      id: 12,
      question: "Qaysi holatda SQL funksiyalaridan foydalanish YAXSHI yondashuv?",
      options: [
        "Ma'lumotni front-end'da hisoblash imkoni yo'q bo'lsa",
        "Barcha ma'lumotni klientga yuborish o'rniga, serverning (DB) o'zida hisob-kitob qilish orqali tarmoq tezligini tejashda",
        "Faqat kichik jadvallarda ishlaganda",
        "Hech qachon, chunki DB juda sekin"
      ],
      correctAnswer: 1,
      explanation: "DB tez hisoblaydi va tarmoq orqali katta massiv jo'natishning oldini oladi (qisqa qilib aytganda - optimallash)."
    }
  ]
};
