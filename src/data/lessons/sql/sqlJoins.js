export const sqlJoins = {
  id: "sql_joins_1",
  title: "SQL Joins (Jadvallarni Birlashtirish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**JOIN** - bu ma'lumotlar bazasidagi ikki yoki undan ortiq jadvallarni bir-biriga bog'lash usuli. 
Tasavvur qiling, sizda ikkita ro'yxat bor:
1. **O'quvchilar ro'yxati** (Ismi, ID si)
2. **Kutubxonadan olingan kitoblar ro'yxati** (Kitob nomi, O'quvchi ID si)

Siz qaysi o'quvchi qanday kitob olganini bilmoqchisiz. Buning uchun siz ikkala ro'yxatni **O'quvchi ID** si orqali yonma-yon qilib tikib chiqasiz. SQL dagi JOIN xuddi shu "tikish" amaliyotidir!

Turlari:
- **INNER JOIN**: Faqat ikkala ro'yxatda ham borlarni (ham o'quvchisi bor, ham kitobi borlarni) olib beradi.
- **LEFT JOIN**: Chapdagi ro'yxatdan hamma o'quvchini oladi, kitob olgan bo'lsa kitobini yozadi, olmagan bo'lsa kitob o'rniga bo'sh (NULL) qoldiradi.
- **RIGHT JOIN**: O'ngdagi ro'yxatdan hamma kitoblarni oladi, o'quvchisi topilsa yozadi, topilmasa NULL.
- **FULL JOIN**: Ikkala ro'yxatdagi hamma narsani birlashtirib ko'rsatadi.

## 2. 🧠 Deep Dive (Under the hood)

Keling, JOIN qanday ishlashini ma'lumotlar bazasi dvigateli (Database Engine) darajasida ko'rib chiqamiz. Jadvallarni birlashtirish xotirada qanday amalga oshadi?
Asosan 3 xil algoritm mavjud:

1. **Nested Loop Join**
Eng sodda algoritm. Dvigatel birinchi jadvalning har bir qatori uchun ikkinchi jadvalni to'liq aylanib chiqib mosini qidiradi.
Xuddi ikkita \\\`for\\\` tsikli ichma-ich ishlaganidek:
\\\`\\\`\\\`javascript
for (let user of users) {
  for (let order of orders) {
    if (user.id === order.user_id) result.push({user, order});
  }
}
\\\`\\\`\\\`
Agar jadvallar kichik bo'lsa, bu tez ishlaydi. Ammo katta jadvallarda (O(N*M) vaqt ketadi) juda sekinlashib ketadi.

2. **Hash Join**
Agar birlashtirish sharti tenglik ( \\\`=\\\` ) bo'lsa, dvigatel **Hash Join** ishlatadi. Kichikroq jadvalni olib, xotirada (RAM) Hash Table (Obyekt yoki Map kabi) yaratadi. Keyin katta jadvalni bir marta aylanib, xotiradagi Hash Table dan O(1) vaqtda qidiradi. Bu juda tez ishlaydi! Lekin katta xotira talab qiladi.

3. **Merge Join (Sort-Merge Join)**
Agar ikkala jadval ham JOIN qilinayotgan ustun bo'yicha oldindan tartiblangan (Indexed/Sorted) bo'lsa, Merge Join ishga tushadi. Dvigatel ikkala jadval ustidan bir vaqtda qadam tashlab (two pointers usuli) moslarni topib ketadi. Xotira ko'p yemaydi va juda tez (O(N+M) vaqtda) ishlaydi.

## 3. ⚠️ Edge Cases va Senior Interview Savollari

**Savol 1: N+1 problemi nima va uni JOIN yordamida qanday hal qilish mumkin?**
*Javob*: Dasturlash tilida (masalan, ORM orqali) 1 ta so'rov bilan 100 ta foydalanuvchini olib kelib, keyin ularning har biri uchun alohida so'rov jo'natib (yana 100 ta so'rov) buyurtmalarni olish N+1 xatosi deyiladi. Buni JOIN orqali bitta SQL so'rovda hal qilish (Eager Loading) ma'lumotlar bazasiga tushadigan yukni keskin kamaytiradi.

**Savol 2: Ikki jadvalda ham bir xil nomli ustunlar bo'lsa, qanday yo'l tutiladi?**
*Javob*: Bunday holatda noaniqlik (Ambiguous column name) xatosi yuz beradi. Buni oldini olish uchun jadvallarga Alias (taxallus) berish va ustunlarni \\\`table_alias.column_name\\\` shaklida aniq ko'rsatish shart.

**Savol 3: CROSS JOIN nima va qachon ishlatiladi?**
*Javob*: CROSS JOIN - bu jadvallarning Dekart ko'paytmasi. 1-jadvaldagi har bir qator 2-jadvaldagi har bir qator bilan birlashadi. Agar ON sharti berilmasa shunday yuz beradi. Masalan, 3 xil o'lcham va 4 xil rang jadvallarini CROSS JOIN qilsak, barcha 12 xil kombinatsiyani hosil qilib beradi.

## 📊 Vizual Tuzilma
\\\`\\\`\\\`mermaid
graph LR
    A[Users Jadvali] -->|ON users.id = orders.user_id| B[Orders Jadvali]
    C[Hash Table in RAM] -.->|Tez qidiruv| B
    style A fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    style B fill:#2196f3,stroke:#1976d2,stroke-width:2px,color:#fff
    style C fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
\\\`\\\`\\\`
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
