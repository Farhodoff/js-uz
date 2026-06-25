export const sqlJoins = {
  id: "sql_joins_1",
  title: "SQL Joins (Jadvallarni Birlashtirish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
**JOIN** — bu ikki yoki undan ortiq jadvallarni (table) ulardagi umumiy ustun (odatda ID) orqali birlashtirish amali.
Odatda quyidagi turlari mavjud:
1. **INNER JOIN**: Faqat ikkala jadvalda ham bor (mos keladigan) ma'lumotlarni oladi.
2. **LEFT (OUTER) JOIN**: Chap jadvaldagi barcha ma'lumotlarni va o'ng jadvaldagi mos keladiganlarini oladi.
3. **RIGHT (OUTER) JOIN**: O'ng jadvaldagi barchasini, chapdagi mos keladiganini oladi.
4. **FULL (OUTER) JOIN**: Ikkala jadvaldagi barcha ma'lumotlarni birlashtirib oladi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON**: Eski usul (Implicit Join) va xotirani to'ldirish (N+1 muammosi)
\`\`\`javascript
// 1. Eski usul bilan qo'shish (Xatoga moyil)
const badQuery = "SELECT * FROM users, orders WHERE users.id = orders.user_id";

// 2. N+1 muammosi (Dasturlash tilida tsikl ichida SQL so'rov berish)
const users = await db.query("SELECT * FROM users");
for (let user of users) {
  const orders = await db.query("SELECT * FROM orders WHERE user_id = " + user.id); // 100 ta user = 101 ta so'rov
}
\`\`\`

✅ **YAXSHI**: Aniq ochiq (Explicit) JOIN ishlatish:
\`\`\`javascript
// Bitta so'rov orqali hamma kerakli ma'lumotni olish (Juda tez)
const goodQuery = "SELECT u.name, o.amount FROM users u INNER JOIN orders o ON u.id = o.user_id";
\`\`\`

## 🎤 Intervyu Savollari
1. **\`INNER JOIN\` va \`LEFT JOIN\` farqi nimada?**
   - \`INNER JOIN\` faqat ikkala jadvalda mos tushgan qatorlarni qaytaradi. \`LEFT JOIN\` asosiy (chap) jadvaldagi hamma qatorlarni qaytaradi, o'ng jadvalda topilmasa, o'rniga \`NULL\` beradi.
2. **Cartesian Product (CROSS JOIN) nima?**
   - Agar jadvallarni birlashtirish sharti (ON) berilmasa, 1-jadvaldagi har bir qator 2-jadvaldagi har bir qatorga ko'paytirilib ketadi (masalan, 10 x 10 = 100 qator).

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph LR;
    Users[Users jadvali] -- "users.id = orders.user_id" --> Orders[Orders jadvali];
    style Users fill:#f9f,stroke:#333,stroke-width:2px
    style Orders fill:#bbf,stroke:#333,stroke-width:2px
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy INNER JOIN",
      instruction: "'users' jadvalini 'orders' jadvali bilan 'user_id' ustuni orqali INNER JOIN qilib barcha ma'lumotlarni oluvchi SQL yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id",
      solution: "function myFunction() {\n  return \"SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('INNER JOIN ORDERS') || !res.includes('ON USERS.ID')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 2,
      title: "Faqat ism va narx",
      instruction: "'users' dan 'name', 'orders' dan 'price' ustunlarini olib INNER JOIN qiling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT users.name, orders.price FROM ...",
      solution: "function myFunction() {\n  return \"SELECT users.name, orders.price FROM users INNER JOIN orders ON users.id = orders.user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('USERS.NAME') || !res.includes('ORDERS.PRICE')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 3,
      title: "LEFT JOIN",
      instruction: "Barcha 'users' (chapda) va ularning 'orders' larini oling. Agar buyurtma qilmagan bo'lsa ham foydalanuvchi chiqishi kerak.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM users LEFT JOIN orders ...",
      solution: "function myFunction() {\n  return \"SELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('LEFT JOIN ORDERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 4,
      title: "RIGHT JOIN",
      instruction: "Barcha 'orders' (o'ngda) chiqishi shart bo'lgan so'rovni 'RIGHT JOIN' yordamida 'users' ga qo'shing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM users RIGHT JOIN orders ...",
      solution: "function myFunction() {\n  return \"SELECT * FROM users RIGHT JOIN orders ON users.id = orders.user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('RIGHT JOIN ORDERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 5,
      title: "FULL JOIN",
      instruction: "Ikkala jadvallardagi (users, orders) barcha qatorlarni birlashtirib qaytaruvchi 'FULL OUTER JOIN' so'rovini yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM users FULL OUTER JOIN orders ...",
      solution: "function myFunction() {\n  return \"SELECT * FROM users FULL OUTER JOIN orders ON users.id = orders.user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('FULL') && !res.includes('OUTER JOIN')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 6,
      title: "Alias bilan ishlash (AS)",
      instruction: "'users' ga 'u' va 'orders' ga 'o' deb qisqa nom (alias) berib INNER JOIN qiling (u.id = o.user_id).",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM users u INNER JOIN orders o ON ...",
      solution: "function myFunction() {\n  return \"SELECT * FROM users u INNER JOIN orders o ON u.id = o.user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('USERS U') || !res.includes('ORDERS O')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 7,
      title: "Uchta jadvalni qo'shish",
      instruction: "'users', 'orders' va 'products' jadvallarini INNER JOIN orqali birlashtiring. (orders.product_id = products.id)",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "FROM users INNER JOIN orders ON ... INNER JOIN products ON ...",
      solution: "function myFunction() {\n  return \"SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id INNER JOIN products ON orders.product_id = products.id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('JOIN PRODUCTS') || !res.includes('ORDERS.PRODUCT_ID')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 8,
      title: "Faqat buyurtma qilmaganlar (LEFT JOIN + IS NULL)",
      instruction: "Hali birorta ham order bermagan userlarni toping. ('orders.id IS NULL' dan foydalaning)",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM users LEFT JOIN orders ... WHERE orders.id IS NULL",
      solution: "function myFunction() {\n  return \"SELECT * FROM users LEFT JOIN orders ON users.id = orders.user_id WHERE orders.id IS NULL;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('LEFT JOIN') || !res.includes('IS NULL')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 9,
      title: "GROUP BY bilan JOIN",
      instruction: "Har bir foydalanuvchining ismini (users.name) va uning jami xarajatini (SUM(orders.amount)) 'total' deb oluvchi JOIN so'rovi.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT users.name, SUM(...) FROM ... JOIN ... GROUP BY users.name",
      solution: "function myFunction() {\n  return \"SELECT users.name, SUM(orders.amount) AS total FROM users INNER JOIN orders ON users.id = orders.user_id GROUP BY users.name;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('GROUP BY USERS.NAME') || !res.includes('SUM(ORDERS.AMOUNT)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 10,
      title: "O'z-o'ziga qo'shish (Self Join)",
      instruction: "'employees' jadvalini o'ziga JOIN qilib, xodim va uning menejerini oling (e1.manager_id = e2.id).",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT e1.name, e2.name FROM employees e1 INNER JOIN employees e2 ON ...",
      solution: "function myFunction() {\n  return \"SELECT e1.name AS employee, e2.name AS manager FROM employees e1 INNER JOIN employees e2 ON e1.manager_id = e2.id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('EMPLOYEES E1') || !res.includes('EMPLOYEES E2')) throw new Error('Xato so\\'rov');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JOIN qanday maqsadlar uchun ishlatiladi?",
      options: [
        "Jadvaldagi ma'lumotlarni o'chirish uchun",
        "Ikki yoki undan ortiq jadvallardagi ma'lumotlarni birlashtirib ko'rish uchun",
        "Ma'lumotlarni shifrlash uchun",
        "Faqat yangi jadvallar yaratish uchun"
      ],
      correctAnswer: 1,
      explanation: "JOIN - ma'lumotlar bazasidagi o'zaro bog'langan jadvallarni bitta so'rovda ko'rish imkonini beradi."
    },
    {
      id: 2,
      question: "INNER JOIN faqat nimani qaytaradi?",
      options: [
        "Ikkala jadvalda ham mavjud (mos kelgan) qatorlarni",
        "Birinchi jadvaldagi barcha qatorlarni",
        "Ikkinchi jadvaldagi barcha qatorlarni",
        "Barcha ma'lumotlarni hech qanday filtrsiz"
      ],
      correctAnswer: 0,
      explanation: "INNER JOIN shart bajarilgan (ON A.id = B.a_id) joydagina qatorni olib chiqadi, qolganini tushirib yuboradi."
    },
    {
      id: 3,
      question: "Agar A jadvalda 5ta qator, B jadvalda 4ta qator bo'lsa va CROSS JOIN ishlatilsa natijada nechta qator chiqadi?",
      options: [
        "9",
        "5",
        "4",
        "20"
      ],
      correctAnswer: 3,
      explanation: "CROSS JOIN dekart ko'paytmasini beradi (5 x 4 = 20)."
    },
    {
      id: 4,
      question: "LEFT JOIN haqida qaysi biri to'g'ri?",
      options: [
        "Chap jadvaldagi hamma qatorlarni saqlaydi, o'ngda mos tushmasa bo'sh joy NULL bo'ladi",
        "O'ng jadvaldagi hamma qatorlarni saqlaydi",
        "Faqat mos tushganlarini saqlaydi",
        "Xato beradi"
      ],
      correctAnswer: 0,
      explanation: "LEFT JOIN - 'chapdagi hamma narsani ol, o'ngdagi bog'langani bo'lsa uni ham ol, bo'lmasa NULL qo'y' degani."
    },
    {
      id: 5,
      question: "Ikki jadvalni qaysi kalitlar yordamida JOIN qilish to'g'ri amaliyot hisoblanadi?",
      options: [
        "Har qanday tasodifiy matnli ustunlar orqali",
        "Primary Key va Foreign Key bog'liqliklari orqali",
        "Sana ustunlari orqali",
        "Boolean ustunlar orqali"
      ],
      correctAnswer: 1,
      explanation: "Odatda jadvallar Primary Key (Asosiy kalit) va Foreign Key (Chet el kaliti) orqali ishonchli bog'lanadi."
    },
    {
      id: 6,
      question: "Jadvallarga vaqtinchalik 'taxallus' berish qaysi kalit so'z orqali bajariladi?",
      options: [
        "ALIAS",
        "NICKNAME",
        "AS",
        "RENAME"
      ],
      correctAnswer: 2,
      explanation: "'AS' orqali yoziladi. Masalan: 'FROM users AS u'."
    },
    {
      id: 7,
      question: "O'z-o'ziga JOIN (Self Join) nima?",
      options: [
        "Jadval o'z ichidagi ma'lumotlar bilan o'zi birlashishi",
        "Jadval o'chib ketishi",
        "Xatolik",
        "Tashqi kalit ishlatilmasligi"
      ],
      correctAnswer: 0,
      explanation: "Self-Join'da bitta jadval 'A' va 'B' taxalluslari yordamida xuddi ikki xil jadval kabi o'z-o'ziga JOIN qilinadi (masalan boshliq-xodim munosabati)."
    },
    {
      id: 8,
      question: "FULL OUTER JOIN vazifasi nima?",
      options: [
        "Ikkala jadvaldagi barcha elementlarni va mos tushganlarini birlashtirib ko'rsatadi",
        "Faqat chapni ko'rsatadi",
        "Faqat o'ngni ko'rsatadi",
        "CROSS JOIN bilan aynan bir xil"
      ],
      correctAnswer: 0,
      explanation: "FULL OUTER JOIN bu asosan LEFT JOIN va RIGHT JOIN'ning yig'indisi desak bo'ladi."
    },
    {
      id: 9,
      question: "N+1 muammosi nima?",
      options: [
        "SQL serverda 1 ta so'rov oshib ketishi",
        "Dasturda 1 marta so'rov o'rniga, tsikl ichida qayta-qayta bazaga murojaat qilib (masalan 100+1), sekinlashuvga olib kelish",
        "Matematik hisob xatosi",
        "LEFT JOIN xatosi"
      ],
      correctAnswer: 1,
      explanation: "Bu dasturlashda ko'p kuzatiladigan unumdorlik (performance) xatosi bo'lib, JOIN ishlatish orqali buning oldini olish mumkin."
    },
    {
      id: 10,
      question: "SQL so'rovini ixchamlash uchun 'AS' yozmasdan shunchaki bo'sh joy bilan taxallus ishlatsa bo'ladimi (users u)?",
      options: [
        "Yo'q, AS majburiy",
        "Ha, ko'pchilik holatlarda AS kalit so'zi ixtiyoriy",
        "Faqat INNER JOIN'da mumkin",
        "Faqat qimmat SQL bazalarida mumkin"
      ],
      correctAnswer: 1,
      explanation: "SQLda ko'pincha AS ixtiyoriy bo'lib, jadvallarga 'users u' deb nom bersangiz ham bo'ladi."
    },
    {
      id: 11,
      question: "Chap jadvalda mavjud, lekin o'ng jadvalda bo'lmagan ma'lumotlarni topish uchun eng yaxshi usul:",
      options: [
        "INNER JOIN ishlatish",
        "LEFT JOIN ishlatib, WHERE qismida o'ng jadval ID'sini IS NULL shartiga tekshirish",
        "RIGHT JOIN ishlatish",
        "FULL JOIN ishlatish"
      ],
      correctAnswer: 1,
      explanation: "Bu 'LEFT Anti-Join' deb ataladi, va mosligi topilmaganlarni filtrlab beradi."
    },
    {
      id: 12,
      question: "Uchta jadvalni qo'shish (JOIN) jarayoni qanday ko'rinishda bo'ladi?",
      options: [
        "Birinchi ikkitasi qo'shiladi, so'ng natijaga uchinchi jadval JOIN orqali bog'lanadi",
        "Uchalasi ham baravariga qo'shila olmaydi",
        "Faqat CROSS JOIN qilish kerak",
        "Faqat VIEW orqali mumkin"
      ],
      correctAnswer: 0,
      explanation: "SQL avval 2 ta jadvalni ko'rsatilgan ON shartlariga binoan qo'shib oladi, va natijaviy setga 3-jadvalni yana ON sharti asosida biriktiradi."
    }
  ]
};
