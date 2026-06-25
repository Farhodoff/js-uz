export const sqlViews = {
  id: "sql_views_1",
  title: "SQL Views (Virtual Jadvallar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
**View (Ko'rinish)** — bu haqiqiy jadvalga o'xshab ko'rinadigan, lekin ichida o'zining xususiy ma'lumotlarini saqlamaydigan "Virtual Jadval". U aslida saqlab qo'yilgan (kombinatsiyalangan) **SQL so'rovidir**.
Agar siz doim 3-4 ta jadvalni JOIN qilib, aynan bir xil qiyin so'rovni yozishdan charchagan bo'lsangiz, uni bitta \`View\` qilib saqlab qo'yishingiz mumkin. Keyin esa xuddi oddiy jadval kabi \`SELECT * FROM mening_view_im\` deb ishlataverasiz.

**Turlari**:
1. **Simple View (Oddiy)**: Odatda faqat bitta jadval asosida yasaladi. Uni ustida INSERT/UPDATE qilish imkoni ham bo'lishi mumkin (Updatable View).
2. **Complex View (Murakkab)**: Bir nechta jadvallarni JOIN qilib, GROUP BY va funksiyalar ishlatilgan view. Unga ma'lumot kiritib bo'lmaydi.
3. **Materialized View (Moddiylashgan ko'rinish)**: Xuddi keshga (cache) o'xshaydi. O'zining ichida haqiqiy natijalarni vaqtincha saqlab qoladi (PostgreSQL, Oracle va boshqalarda bor).

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON**: View ichidan View, uning ichidan yana View chaqirish (Nested Views). Bu performance'ni juda yomonlashtiradi, chunki har safar eng chuqur qatlamgacha so'rov borib kelishi kerak.

✅ **YAXSHI**: Maxfiy ma'lumotlarni yashirish uchun View ishlatish. Masalan, xodimlarning \`salary\` (maosh) ustunini olib tashlab, qolgan ma'lumotlarni qamrab oluvchi View yaratish va boshqa bo'limlarga faqat shu View'ni o'qishga ruxsat berish.

## 🎤 Intervyu Savollari
1. **View'ga ma'lumot qo'shsa (INSERT) bo'ladimi?**
   - Ha, agar u "Simple View" bo'lsa va unda agregat funksiyalar, DISTINCT, GROUP BY ishlatilmagan bo'lsa (y'ani to'g'ridan-to'g'ri asl jadvalga bog'lansa).
2. **Materialized View nima?**
   - Bu oddiy View'dan farqli o'laroq natijalarni fizik (disk) xotirada ma'lum vaqtgacha saqlab turadigan, keyinchalik periyodik tarzda (yoki triggerlar orqali) yangilanadigan (REFRESH) ko'rinishdir. Tezlikni juda oshiradi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD;
    T1[(Users Jadvali)] --> V(User Orders View);
    T2[(Orders Jadvali)] --> V;
    V --> UserQuery[Dasturchi: SELECT * FROM view_ismi];
    style V fill:#ff9,stroke:#333,stroke-dasharray: 5 5
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "CREATE VIEW",
      instruction: "Faqat 'active' (status = 1) bo'lgan userlarni o'z ichiga oladigan 'active_users' nomli View yarating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "CREATE VIEW active_users AS SELECT * FROM users WHERE status = 1",
      solution: "function myFunction() {\n  return \"CREATE VIEW active_users AS SELECT * FROM users WHERE status = 1;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('CREATE VIEW ACTIVE_USERS AS') || !res.includes('WHERE STATUS = 1')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 2,
      title: "View dan ma'lumot o'qish",
      instruction: "Endi biz yaratgan 'active_users' virtual jadvalidan hamma ma'lumotni o'qib oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM active_users",
      solution: "function myFunction() {\n  return \"SELECT * FROM active_users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('SELECT * FROM ACTIVE_USERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 3,
      title: "JOIN bilan Murakkab View",
      instruction: "'users' va 'orders' ni qo'shib 'user_orders_view' degan View yarating (faqat users.name, orders.amount ustunlari bilan).",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "CREATE VIEW user_orders_view AS SELECT users.name, orders.amount FROM users JOIN orders ON ...",
      solution: "function myFunction() {\n  return \"CREATE VIEW user_orders_view AS SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('CREATE VIEW USER_ORDERS_VIEW') || !res.includes('JOIN ORDERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 4,
      title: "Ko'rinishni (View) O'chirish",
      instruction: "Ortiqcha bo'lgan 'old_users_view' ni ma'lumotlar bazasidan o'chirib yuboruvchi SQL so'rovini yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "DROP VIEW view_name",
      solution: "function myFunction() {\n  return \"DROP VIEW old_users_view;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('DROP VIEW OLD_USERS_VIEW')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 5,
      title: "Viewni o'zgartirish (CREATE OR REPLACE)",
      instruction: "'active_users' ni o'zgartiring (yangi ustunlar yoki shart qo'shing). Buni 'CREATE OR REPLACE VIEW' orqali bajaring (status = 1 va age > 18).",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "CREATE OR REPLACE VIEW active_users AS ...",
      solution: "function myFunction() {\n  return \"CREATE OR REPLACE VIEW active_users AS SELECT * FROM users WHERE status = 1 AND age > 18;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('CREATE OR REPLACE VIEW ACTIVE_USERS') || !res.includes('AGE > 18')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 6,
      title: "Yashirilgan ma'lumot View (Security)",
      instruction: "Xodimlarning maoshini (salary) qolganlardan yashirish uchun 'employees_public' nomli View yarating, faqat (id, name, department) ustunlarini olsin.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "CREATE VIEW employees_public AS SELECT id, name, department FROM employees",
      solution: "function myFunction() {\n  return \"CREATE VIEW employees_public AS SELECT id, name, department FROM employees;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('CREATE VIEW EMPLOYEES_PUBLIC') || res.includes('SALARY')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 7,
      title: "View ichida Agregatsiya",
      instruction: "Har bir foydalanuvchining umumiy xarid summalarini ('total_spent') saqlovchi 'customer_stats' degan View yarating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "CREATE VIEW customer_stats AS SELECT user_id, SUM(amount) AS total_spent FROM orders GROUP BY user_id",
      solution: "function myFunction() {\n  return \"CREATE VIEW customer_stats AS SELECT user_id, SUM(amount) AS total_spent FROM orders GROUP BY user_id;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('CREATE VIEW CUSTOMER_STATS') || !res.includes('GROUP BY')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 8,
      title: "Ma'lumot qo'shish (Updatable View)",
      instruction: "Oddiy View ('usa_customers') ustiga ma'lumot kiritish: unga (id, name, country) qilib (1, 'John', 'USA') qiymatini INSERT qiling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "INSERT INTO usa_customers (id, name, country) VALUES ...",
      solution: "function myFunction() {\n  return \"INSERT INTO usa_customers (id, name, country) VALUES (1, 'John', 'USA');\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('INSERT INTO USA_CUSTOMERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 9,
      title: "WITH CHECK OPTION",
      instruction: "'usa_customers' view'siga yozayotganda faqat country = 'USA' ekanligini ta'minlovchi 'WITH CHECK OPTION' bilan view yarating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "CREATE VIEW usa_customers AS SELECT * FROM users WHERE country = 'USA' WITH CHECK OPTION",
      solution: "function myFunction() {\n  return \"CREATE VIEW usa_customers AS SELECT * FROM users WHERE country = 'USA' WITH CHECK OPTION;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('WITH CHECK OPTION')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 10,
      title: "View yordamida filtrlash",
      instruction: "Sizda 'customer_stats' degan view bor (7-masala). O'sha view'dan total_spent > 100 bo'lganlarni o'qiydigan so'rov yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT * FROM customer_stats WHERE total_spent > 100",
      solution: "function myFunction() {\n  return \"SELECT * FROM customer_stats WHERE total_spent > 100;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('FROM CUSTOMER_STATS') || !res.includes('TOTAL_SPENT > 100')) throw new Error('Xato so\\'rov');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "View o'zi nima?",
      options: [
        "Fayl tizimidagi papka",
        "Ma'lumotlarni jismonan ikkinchi marta saqlovchi zaxira jadvallar",
        "Saqlab qo'yilgan mantiqiy so'rov (Virtual jadval)",
        "Dasturlash tilining bir qismi"
      ],
      correctAnswer: 2,
      explanation: "View - diskda ma'lumot o'rniga so'rovning o'zini (CREATE VIEW...) saqlaydi va chaqirilganda o'sha so'rovni ishga tushirib natijani beradi."
    },
    {
      id: 2,
      question: "Nega View dan foydalanamiz?",
      options: [
        "Baza hajmini kamaytirish uchun",
        "Murakkab so'rovlarni soddalashtirish, kodni takrorlamaslik va ma'lumotlar xavfsizligi (ruxsatlarni boshqarish) uchun",
        "Serverni sekinlashtirish uchun",
        "Faqat ma'lumotlarni o'chirish uchun"
      ],
      correctAnswer: 1,
      explanation: "View orqali uzun JOINlarni qisqa 'SELECT * FROM view_ism' qilib ishlatishimiz, hamda maxfiy ustunlarni tushirib qoldirib, xavfsizlikni ta'minlashimiz mumkin."
    },
    {
      id: 3,
      question: "View ichiga qachon ma'lumot (INSERT) qilsa bo'ladi?",
      options: [
        "Har qanday holatda ham mumkin",
        "Faqat bitta jadvalga tayanuvchi (Simple) ko'rinish bo'lsa va unda GROUP BY, DISTINCT ishlatilmagan bo'lsa",
        "Hech qachon INSERT qilib bo'lmaydi",
        "Faqat MySQL da mumkin"
      ],
      correctAnswer: 1,
      explanation: "Agar ko'rinish oddiy (birma-bir xaritada ko'rinadigan) bo'lsa, undan o'tib kelgan ma'lumot to'g'ridan-to'g'ri asl jadvalga tushadi (Updatable View)."
    },
    {
      id: 4,
      question: "Materialized View (Moddiylashgan ko'rinish) oddiy View dan qanday farq qiladi?",
      options: [
        "Materialized View ma'lumotni saqlamaydi, faqat so'rov",
        "Farqi yo'q, ikkisi bitta",
        "Materialized View so'rov natijalarini qattiq diskda real jadval kabi saqlaydi (keshlaydi) va o'qish juda tez bo'ladi",
        "Unda faqat sonlarni ko'rish mumkin"
      ],
      correctAnswer: 2,
      explanation: "Tez-tez hisoblanadigan murakkab hisobotlarni Materialized View da yig'ish tizimga tushadigan yukni (load) ancha yengillashtiradi."
    },
    {
      id: 5,
      question: "Mavjud View ni tuzilishini o'zgartirish uchun qaysi ifoda to'g'ri keladi?",
      options: [
        "UPDATE VIEW ...",
        "ALTER TABLE ...",
        "CREATE OR REPLACE VIEW ...",
        "MODIFY VIEW ..."
      ],
      correctAnswer: 2,
      explanation: "Ko'plab SQL bazalarida ko'rinishni tezda yangilash uchun CREATE OR REPLACE VIEW sintaksisi ishlatiladi."
    },
    {
      id: 6,
      question: "WITH CHECK OPTION nima vazifa bajaradi?",
      options: [
        "Viewni o'chirib yuboradi",
        "View yaratishda yozilgan WHERE shartiga to'g'ri kelmaydigan ma'lumotni kiritish/o'zgartirishga yo'l qo'ymaydi",
        "Ma'lumotlar to'g'riligini AI orqali tekshiradi",
        "Jadvallarga ruxsatlarni ochadi"
      ],
      correctAnswer: 1,
      explanation: "Bu orqali View ni filtridan (masalan faqat O'zbekiston mijozlari) tashqari bo'lgan ma'lumot kiritib qo'yishdan himoyalanamiz."
    },
    {
      id: 7,
      question: "Oddiy foydalanuvchiga (User) faqat u o'z ma'lumotlarini ko'rishi uchun qanday qilib View qo'llash mumkin?",
      options: [
        "Har bir user uchun alohida jadval yaratib",
        "Userlarni o'chirib yuborish",
        "WHERE ichiga hozirgi avtorizatsiyadan o'tgan userni filtrlash logikasini qo'shib, shu View ga o'qish huquqi beriladi",
        "Buni faqat JavaScript da qilib bo'ladi"
      ],
      correctAnswer: 2,
      explanation: "Database Row-Level Security (Qator darajasidagi xavfsizlik) yoki joriy sessiyaga (current_user) bog'lab View yaratish juda xavfsiz va samaralidir."
    },
    {
      id: 8,
      question: "Ko'rinishni yo'qotish qanday kalit so'z orqali bajariladi?",
      options: [
        "DELETE VIEW",
        "REMOVE VIEW",
        "DROP VIEW",
        "TRUNCATE VIEW"
      ],
      correctAnswer: 2,
      explanation: "Ma'lumotlar bazasidan tizimli obyektlarni (jadval, view, index) o'chirish DROP buyrug'i orqali qilinadi."
    },
    {
      id: 9,
      question: "Agar asosiy (Tagidagi) jadvalda bir ustun DROP qilinsa va u View da ishlatilgan bo'lsa, nima sodir bo'ladi?",
      options: [
        "Hech nima bo'lmaydi, View o'z-o'zidan to'g'rilanadi",
        "View invalid (yaroqsiz) holatga keladi va uni chaqirganda SQL xatolik beradi",
        "U ustun nol bilan to'ldiriladi",
        "Asosiy jadvaldan uni DROP qilib bo'lmaydi (ko'p DB larda to'g'ridan to'g'ri ta'qiq ham bor)"
      ],
      correctAnswer: 1,
      explanation: "Baza uni ishlata olmay qoladi yoki o'sha jadvalni (DROP CASCADE bo'lmaguncha) o'chirishga ruxsat bermasligi mumkin."
    },
    {
      id: 10,
      question: "Ko'rinishlar (Views) performanceni (tezlikni) o'z-o'zidan oshiradimi?",
      options: [
        "Ha, chunki u maxsus texnologiya",
        "Yo'q, u shunchaki so'rovning boshqa nomi bo'lib, bajarilish paytida ichidagi so'rov o'rniga qo'yilib real-vaqtda qayta ishga tushadi",
        "Ha, chunki indekslanadi",
        "Bunday tushuncha yo'q"
      ],
      correctAnswer: 1,
      explanation: "Oddiy View tezlikni oshirmaydi, u faqat kodni (logikani) toza saqlash uchun. (Moddiylashgani - Materialized View esa tezlashtiradi)."
    },
    {
      id: 11,
      question: "Quyidagilardan qaysi biri View haqida to'g'ri tasdiq?",
      options: [
        "Bitta View boshqa View ga aslida murojaat qila olmaydi",
        "Bitta View ni yaratayotganda boshqa Viewlardan ham foydalanish (Nested views) mumkin",
        "View ning o'zida PRIMARY KEY bo'ladi",
        "Faqat SELECT kalit so'zisiz yasaladi"
      ],
      correctAnswer: 1,
      explanation: "Mumkin, lekin buni suiste'mol qilish (qavat-qavat view qilish) tezlikka salbiy ta'sir ko'rsatadi."
    },
    {
      id: 12,
      question: "CREATE VIEW da 'AS' so'zi nimani anglatadi?",
      options: [
        "Jadvalning ko'paytmasini",
        "Qanday so'rov qolibiga asoslanishini ko'rsatadi (masalan AS SELECT ...)",
        "O'zgaruvchilar yaratish uchun",
        "Ustun turini aniqlash uchun"
      ],
      correctAnswer: 1,
      explanation: "'CREATE VIEW x AS' ko'rsatmasidan so'ng haqiqiy so'rov (SELECT) yozilishi shart."
    }
  ]
};
