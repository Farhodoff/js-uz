export const sqlSubqueries = {
  id: "sql_subqueries_1",
  title: "SQL Subqueries (Ichki So'rovlar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)
**Subquery** (ichki yoki qism so'rov) - bu boshqa bir SQL so'rovining ichiga joylashtirilgan so'rov. Buni xuddi "Matryoshka" o'yinchog'iga o'xshatish mumkin: bitta katta so'rov o'z ichida kichikroq so'rovni tashiydi. 
Asosiy so'rov ishlashi uchun avval ichki so'rov ma'lumot qidirib topib beradi.

Masalan, do'kondan "Eng qimmat kompyuter"ni topmoqchisiz:
1. Ichki so'rov (Subquery): Kompyuterlar ichidan eng maksimal narxni topadi (masalan $2000).
2. Tashqi so'rov (Main query): Narxi $2000 bo'lgan barcha kompyuterlarni chiqarib beradi.

## 2. 🧠 Deep Dive (Under the hood, memory, Correlated vs CTE, performance)
Subquery'lar asosan \`WHERE\`, \`FROM\` va \`SELECT\` qismlarida ishlatiladi. Ishlash mexanizmiga ko'ra ular ikkiga bo'linadi:

1. **Uncorrelated (Mustaqil) Subquery**: Ichki so'rov tashqi so'rovga umuman bog'lanmagan. U avval bir marta ishga tushadi, o'z natijasini xotiraga oladi va tashqi so'rov undan tayyor foydalanadi.
2. **Correlated (O'zaro bog'langan) Subquery**: Ichki so'rov tashqi so'rovning **har bir qatori uchun** qayta-qayta ishga tushadi. Agar tashqi so'rov 1 million qator qaytarsa, ichki so'rov ham 1 million marta ishlaydi! Bu ko'p hollarda \`O(N^2)\` vaqt murakkabligini yuzaga keltiradi.

**Memory va Performance**:
Correlated Subquery'lar juda og'ir va resurs talab qiluvchi bo'lishi mumkin. Katta ma'lumotlar bilan ishlaganda ularning o'rniga **JOIN** yoki **CTE** (\`WITH\` clause - vaqtinchalik xotira jadvallari) ishlatish samaraliroq. CTE yordamida natija xotiraga o'qiladi va qayta-qayta ishlatiladi.
Lekin \`EXISTS\` ishlatiladigan holatlarda Correlated Subquery juda zo'r ishlaydi, chunki u "Short-circuit" baholash (birinchi mos kelgan ma'lumotni topishi bilanoq ishlashdan to'xtash) mexanizmiga ega.

## 3. ⚠️ Edge Cases and Senior Interview Questions

**Savol: \`IN\` va \`EXISTS\` ning farqi nimada va qaysi biri tezroq?**
**Javob:** \`IN\` ichki so'rovdagi barcha ma'lumotlarni to'liq xotiraga yuklab olib ro'yxat yaratadi va qidiradi. Kichik ma'lumotlarda \`IN\` qulay. \`EXISTS\` esa natijani ko'rishi bilanoq qidiruvni to'xtatadi. Agar subquery millionlab qator qaytarsa, \`EXISTS\` keskin darajada tezroq ishlaydi!

**Savol: \`NOT IN\` dagi "Null Trap" (Null tuzog'i) nima?**
**Javob:** Agar \`WHERE id NOT IN (SELECT some_id FROM table)\` ishlatsangiz va ichki so'rov bitta bo'lsa ham \`NULL\` qiymat qaytarsa, tashqi so'rov UMUMAN natija qaytarmaydi (bo'sh ro'yxat). Sababi SQL da \`X != NULL\` mantiqiy jihatdan \`UNKNOWN\` hisoblanadi. Bunga tushmaslik uchun bunday holatda \`NOT EXISTS\` ishlatiladi.

**Savol: Subquery o'rnida qachon Oyna (Window) funksiyalaridan foydalangan ma'qul?**
**Javob:** Har bir qatorda umumiy agregat qiymatlarni (masalan, o'rtacha maosh) ko'rsatish uchun skalyar subquery ishlatish o'rniga \`AVG(salary) OVER()\` oynasidan foydalanish bir necha barobar tezroq ishlaydi, chunki oyna funksiyalari ma'lumotlarni qayta-qayta skaner qilmaydi.

## 📊 Mantiqiy Diagramma
\`\`\`mermaid
graph TD;
    A[Tashqi Asosiy So'rov] -->|O'z ichiga oladi| B[Ichki So'rov];
    B --> C{Natija formati?};
    C -->|Bitta yagona qiymat| D[Skalyar Subquery];
    C -->|Qiymatlar ro'yxati| E[IN / ANY / ALL];
    C -->|Mantiqiy holat| F[EXISTS / NOT EXISTS];
    C -->|Vaqtinchalik jadval| G[Derived Table / FROM qismida];
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Subquery (Eng arzon mahsulot)",
      instruction: "'products' jadvalidan eng arzon (minimum 'price') mahsulotning 'name' ni oluvchi so'rov yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM products WHERE price = (SELECT MIN(price) FROM products)",
      solution: "function myFunction() {\n  return \"SELECT name FROM products WHERE price = (SELECT MIN(price) FROM products);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('(SELECT MIN(PRICE)') || !res.includes('FROM PRODUCTS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 2,
      title: "IN kalit so'zi (To'plamda tekshirish)",
      instruction: "IT bo'limiga ('name' = 'IT') tegishli barcha 'employees' larning ismini toping. 'departments' jadvalidan foydalanish uchun IN ishlating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE department_id IN (SELECT id FROM departments WHERE name = 'IT')",
      solution: "function myFunction() {\n  return \"SELECT name FROM employees WHERE department_id IN (SELECT id FROM departments WHERE name = 'IT');\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes(' IN (SELECT') || !res.includes(\"'IT'\")) throw new Error('Xato so\\'rov');"
    },
    {
      id: 3,
      title: "NOT IN va xarid qilmaganlar",
      instruction: "Hech qanday 'orders' (buyurtma) bermagan 'users' ismlarini toping. WHERE id NOT IN orqali yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM users WHERE id NOT IN (SELECT user_id FROM orders)",
      solution: "function myFunction() {\n  return \"SELECT name FROM users WHERE id NOT IN (SELECT user_id FROM orders);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('NOT IN (SELECT USER_ID')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 4,
      title: "EXISTS bilan tezkor izlash",
      instruction: "Kamida bitta 'order' bergan 'users' larni topish uchun EXISTS ishlating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)",
      solution: "function myFunction() {\n  return \"SELECT name FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('EXISTS (SELECT') || !res.includes('WHERE O.USER_ID = U.ID')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 5,
      title: "NOT EXISTS (Yaxshiroq usul)",
      instruction: "Buyurtma bermaganlarni topish uchun 'NOT EXISTS' ishlating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)",
      solution: "function myFunction() {\n  return \"SELECT name FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('NOT EXISTS (SELECT')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 6,
      title: "Skalyar Subquery (SELECT ichida)",
      instruction: "Har bir foydalanuvchining ismini (name) va uning umumiy buyurtmalari sonini ('total_orders') SELECT qismida subquery yozish orqali chiqaring.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS total_orders FROM users",
      solution: "function myFunction() {\n  return \"SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS total_orders FROM users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('(SELECT COUNT(*) FROM ORDERS') || !res.includes('AS TOTAL_ORDERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 7,
      title: "FROM qismida Subquery (Derived Table)",
      instruction: "Ichki so'rov orqali 'users' jadvalidan faqat id va name ni oling, uni 'sub' deb nomlang (alias) va asosiy so'rovda 'sub.name' ni tanlang.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT sub.name FROM (SELECT id, name FROM users) AS sub",
      solution: "function myFunction() {\n  return \"SELECT sub.name FROM (SELECT id, name FROM users) AS sub;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('FROM (SELECT') || !res.includes('AS SUB')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 8,
      title: "Correlated Subquery (Maosh tekshiruvi)",
      instruction: "'employees' orasidan, o'zi ishlaydigan bo'limning o'rtacha maoshidan (AVG(salary)) ko'proq oladigan xodimlarning ismini chiqaring.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id)",
      solution: "function myFunction() {\n  return \"SELECT name FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('E1.DEPT_ID = E2.DEPT_ID') || !res.includes('AVG(SALARY)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 9,
      title: "ANY kalit so'zi",
      instruction: "'products' jadvalidan electronics toifasidagi (category_id = 2) istalgan mahsulot narxidan arzonroq (price < ANY) bo'lgan boshqa mahsulotlar 'name' ini oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE price < ANY(SELECT price FROM products WHERE category_id = 2)",
      solution: "function myFunction() {\n  return \"SELECT name FROM products WHERE price < ANY (SELECT price FROM products WHERE category_id = 2);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('< ANY') && !res.includes('<ANY')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 10,
      title: "ALL kalit so'zi",
      instruction: "'products' orasidan barcha toys toifasiga oid (category_id = 3) mahsulotlardan qimmatroq (price > ALL) bo'lgan mahsulotlar 'name' ini toping.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE price > ALL (SELECT price FROM products WHERE category_id = 3)",
      solution: "function myFunction() {\n  return \"SELECT name FROM products WHERE price > ALL (SELECT price FROM products WHERE category_id = 3);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('> ALL') && !res.includes('>ALL')) throw new Error('Xato so\\'rov');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Subquery nima?",
      options: [
        "Boshqa dasturlash tilidan chaqirilgan so'rov",
        "Asosiy so'rovning ichida joylashgan qo'shimcha (ichki) so'rov",
        "Ma'lumotlar bazasini o'chirib yuboruvchi buyruq",
        "Faqat JOIN yordamida yoziladigan kod"
      ],
      correctAnswer: 1,
      explanation: "Subquery - bu bitta asosiy SQL so'rovi ichidagi kichikroq, yordamchi so'rovdir."
    },
    {
      id: 2,
      question: "Uncorrelated va Correlated Subquery ning farqi nimada?",
      options: [
        "Uncorrelated tez ishlaydi, chunki u faqat 1 marta bajariladi. Correlated esa har bir qator uchun qayta-qayta ishga tushadi.",
        "Hech qanday farqi yo'q",
        "Correlated subquery faqat SELECT qismida yoziladi",
        "Uncorrelated faqat qizil rangda yozilishi kerak"
      ],
      correctAnswer: 0,
      explanation: "Uncorrelated tashqi so'rovga bog'liq bo'lmagani uchun bir marta bajariladi. Correlated esa har bir qator uchun qayta ishlaydi."
    },
    {
      id: 3,
      question: "Skalyar (Scalar) Subqueryning asosiy sharti nima?",
      options: [
        "Jadval qaytarishi shart",
        "Eng kamida 5 ta ustun qaytarishi kerak",
        "Roppa-rosa 1 ta qator va 1 ta ustun (yagona qiymat) qaytarishi majburiy",
        "Unda GROUP BY ishlatib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Skalyar degani bitta son yoki matn (yagona qiymat) degani. Agar skalyar subquery birdan ko'p qator qaytarsa, xatolik beradi."
    },
    {
      id: 4,
      question: "Qachon IN o'rniga EXISTS ishlatgan ma'qul?",
      options: [
        "Agar subquery juda kam natija qaytarsa",
        "Agar subquery millionlab qator natija qaytarsa (EXISTS short-circuit tufayli ancha tez ishlaydi)",
        "Faqat Oracle bazasida ishlayotganda",
        "IN va EXISTS tezligi doim bir xil"
      ],
      correctAnswer: 1,
      explanation: "EXISTS mos keluvchi birinchi ma'lumotni topishi bilan tekshirishni to'xtatadi. Bu esa katta ma'lumotlarda resursni tejaydi."
    },
    {
      id: 5,
      question: "'Null Trap' (Null tuzog'i) nima bilan bog'liq?",
      options: [
        "NULL qiymatlarni o'chirib bo'lmaydi",
        "NOT IN ishlatganda, ichki so'rovdan bitta bo'lsa ham NULL kelsa, tashqi so'rov hech qanday natija qaytarmasligi",
        "Jadvallarda NULL ga ruxsat berish mumkin emasligi",
        "EXISTS faqat NULL larga ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "SQL da `X != NULL` qat'iy mantiqsiz (UNKNOWN) qiymat qaytaradi. Shuning uchun NOT IN da ehtiyot bo'lish kerak."
    },
    {
      id: 6,
      question: "Correlated Subquery ning asoratlarini (sekinlashishini) qanday bartaraf qilish mumkin?",
      options: [
        "Jadvallarni butunlay o'chirib tashlash orqali",
        "Qo'shimcha JOIN, CTE yoki Oyna (Window) funksiyalaridan foydalanish orqali",
        "Subquery'larni faqat SELECT da ishlatish orqali",
        "Buni to'g'irlab bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Xotirani va tezlikni asrash uchun ko'pincha CTE va JOIN lar Correlated Subquery o'rnida ishlatiladi."
    },
    {
      id: 7,
      question: "FROM qismida yoziladigan Subquerylarga (Derived tables) nima qo'shish qat'iy talab etiladi?",
      options: [
        "Hech narsa, xohlagancha yozaverasiz",
        "GROUP BY sharti",
        "Alias (Taxallus) - masalan `AS sub_table`",
        "Faqat INNER JOIN so'zi"
      ],
      correctAnswer: 2,
      explanation: "Vaqtinchalik xotiradagi jadvalga nomi yo'qligi uchun ko'pchilik RDBMS (masalan MySQL, Postgres) lar unga Alias berishni majburiy qilib qo'ygan."
    },
    {
      id: 8,
      question: "Agar ichki so'rov bo'sh natija (0 qator) qaytarsa, EXISTS qanday ishlaydi?",
      options: [
        "Error (Xatolik) beradi",
        "False (Yolg'on) qaytaradi va asosiy so'rov o'sha qatorni o'tkazib yuboradi",
        "True (Rost) qaytaradi",
        "Cheksiz tsiklga tushadi"
      ],
      correctAnswer: 1,
      explanation: "EXISTS nima bo'lsa ham qatorda ma'lumot bormi-yo'qmi tekshiradi. Agar topmasa, mantiqiy False beradi."
    },
    {
      id: 9,
      question: "ANY va ALL operatorlari qanday mantiq asosida ishlaydi?",
      options: [
        "ANY = Ro'yxatdagi ixtiyoriy bittasiga mos kelsa yetarli. ALL = Ro'yxatdagi barchasiga birdek mos kelishi shart.",
        "ANY faqat sonlar bilan ishlaydi, ALL faqat matn bilan.",
        "Ikkalasi ham bitta vazifani bajaradi",
        "Faqat bitta jadval bo'lsa ishlaydi"
      ],
      correctAnswer: 0,
      explanation: "Masalan `> ALL(1, 5, 10)` degani ham 1dan, ham 5dan, ham 10dan katta degani. `> ANY(1, 5, 10)` esa 1 dan katta bo'lsa kifoya."
    },
    {
      id: 10,
      question: "Subquery ichida ORDER BY ishlatish kerakmi?",
      options: [
        "Doim yozish kerak, shart",
        "Odatda IN ro'yxatlarida foydasiz, faqat Skalyar subqueryda (LIMIT 1 kabi) qaysi birinchi yoki oxirgi qatorni olish uchun kerak",
        "SQL ruxsat bermaydi",
        "Jadval o'lchamini kichraytiradi"
      ],
      correctAnswer: 1,
      explanation: "IN yoki EXISTS kabi mantiqlarda qatorlarning tartibi umuman ahamiyatsiz, shuning uchun bazani bekorga ORDER BY bilan charchatish kerak emas."
    },
    {
      id: 11,
      question: "CTE (Common Table Expression) va Subquery o'rtasida qanday asosiy farq bor?",
      options: [
        "CTE faqat o'chirish (DELETE) uchun kerak",
        "Subquery ba'zan kod o'qilishini qiyinlashtiradi (spaghetti). CTE esa WITH orqali kodni toza saqlaydi va bir necha marta murojaat qilish imkonini beradi.",
        "CTE sekinroq ishlaydi",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "CTE (WITH) kodni tepadanoq e'lon qilib, murakkab so'rovlarni bo'laklarga ajratib ishlashni osonlashtiradi."
    },
    {
      id: 12,
      question: "Nima uchun chuqur ichma-ich (nested) Subquery lardan qochish kerak?",
      options: [
        "Sababi ularni hech qaysi SQL tili qo'llab-quvvatlamaydi",
        "Kod o'qilishi o'ta murakkablashadi, texnik xizmat ko'rsatish qiyinlashadi va so'rov rejalashtiruvchi (Query Optimizer) qiynalib ketib unumdorlik tushib ketadi",
        "Dastur xotiradan toshib ketadi (OOM)",
        "Natija har doim xato chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Clean code (Toza kod) va yuqori tezlik uchun juda chuqur nested so'rovlarni JOIN yoki CTE bilan almashtirish tavsiya etiladi."
    }
  ]
};
