export const sqlSubqueries = {
  id: "sql_subqueries_1",
  title: "SQL Subqueries (Ichki So'rovlar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
**Subquery** (ichki yoki qism so'rov) — bu boshqa bir SQL so'rovining ichiga joylashtirilgan so'rov. Xuddi "Matryoshka" o'yinchog'iga o'xshaydi: bitta katta so'rov o'z ichida kichikroq so'rovni tashiydi.
Asosan \`WHERE\`, \`FROM\` va \`SELECT\` qismlarida ishlatiladi.

**Turlari**:
1. **Uncorrelated (O'zaro bog'lanmagan) Subquery**: Ichki so'rov tashqi so'rovga umuman qaram emas va u o'zi alohida mustaqil ishlay oladi (birinchi bo'lib ichki so'rov ishlaydi).
2. **Correlated (O'zaro bog'langan) Subquery**: Ichki so'rovning ishlashi tashqi so'rovning har bir qatoriga bog'liq. Bu sekinroq ishlashi mumkin, chunki u har bir qator uchun qayta-qayta ishga tushadi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON**: Katta ma'lumotlar bilan \`IN\` ishlatsangiz yoki Correlated Subquery orqali og'ir tsikl yuzaga kelsangiz:
\`\`\`javascript
// Barcha xodimlarni top, qaysilarkim o'z bo'limining o'rtacha maoshidan ko'p oylik oladi
// Bu "Correlated" bo'lib, har bir xodim uchun alohida ichki so'rovni ishlatib chiqadi.
const bad = \`
  SELECT name FROM employees e1
  WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id)
\`;
\`\`\`

✅ **YAXSHI**: Ba'zan uni JOIN yoki CTE (Common Table Expressions) / Oyna (Window) funksiyalari orqali hal qilish arzonroq tushadi. Yoki \`EXISTS\` ishlatish \`IN\` ga qaraganda samaraliroq (ayniqsa, subquery natijasi juda katta bo'lsa).

## 🎤 Intervyu Savollari
1. **\`IN\` va \`EXISTS\` ning farqi nimada?**
   - \`IN\` ichki so'rovning barcha natijalarini to'plam sifatida baholaydi va tekshiradi. \`EXISTS\` esa bittagina mos yozuvni topishi bilan izlashni to'xtatadi va rost (\`TRUE\`) qaytaradi (asosan True/False menti).
2. **Skalyar (Scalar) Subquery nima?**
   - Faqatgina bitta qator va bitta ustun (ya'ni yagona qiymat) qaytaruvchi ichki so'rov.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD;
    A(Tashqi Asosiy So'rov) --> B{Ichki So'rov};
    B -->|Bitta qiymat beradi| C[Skalyar];
    B -->|Ro'yxat beradi| D[IN / ANY / ALL];
    B -->|Mantiqiy holat beradi| E[EXISTS];
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Subquery (Eng arzon mahsulotni topish)",
      instruction: "'products' jadvalidan 'price' eng kichik bo'lgan mahsulotning 'name' ni oluvchi so'rov yozing.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM products WHERE price = (SELECT MIN(price) FROM ...)",
      solution: "function myFunction() {\n  return \"SELECT name FROM products WHERE price = (SELECT MIN(price) FROM products);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('(SELECT MIN(PRICE)') || !res.includes('FROM PRODUCTS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 2,
      title: "IN kalit so'zi (Kichik to'plam)",
      instruction: "IT bo'limiga ('department_id' = 1 yoki 2) tegishli barcha 'employees' larni ('name' ni) toping. Ichki so'rov orqali 'departments' jadvalidan foydalaning, masalan 'WHERE department_id IN (SELECT id FROM departments WHERE name = 'IT')'.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE department_id IN (SELECT id FROM departments WHERE name = 'IT')",
      solution: "function myFunction() {\n  return \"SELECT name FROM employees WHERE department_id IN (SELECT id FROM departments WHERE name = 'IT');\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes(' IN (SELECT') || !res.includes(\"'IT'\")) throw new Error('Xato so\\'rov');"
    },
    {
      id: 3,
      title: "NOT IN (Cheklash)",
      instruction: "'orders' bermagan barcha 'users' (ismlarini) toping. (WHERE id NOT IN ...)",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM users WHERE id NOT IN (SELECT user_id FROM orders)",
      solution: "function myFunction() {\n  return \"SELECT name FROM users WHERE id NOT IN (SELECT user_id FROM orders);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('NOT IN (SELECT USER_ID')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 4,
      title: "EXISTS (Tezkor izlash)",
      instruction: "Kamida bitta 'order' bergan 'users' larni topish uchun EXISTS ishlating.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id)",
      solution: "function myFunction() {\n  return \"SELECT name FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('EXISTS (SELECT') || !res.includes('WHERE O.USER_ID = U.ID')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 5,
      title: "NOT EXISTS (Yo'qini izlash)",
      instruction: "Hech qanday 'order' bermagan userlarni 'NOT EXISTS' orqali toping.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE ...)",
      solution: "function myFunction() {\n  return \"SELECT name FROM users u WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('NOT EXISTS (SELECT')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 6,
      title: "SELECT qismida Subquery",
      instruction: "Har bir foydalanuvchining ismini (name) va o'sha qatorning o'zida barcha xaridlar sonini ('total_orders') skalyar so'rov sifatida chiqaring.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS total_orders FROM users",
      solution: "function myFunction() {\n  return \"SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS total_orders FROM users;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('(SELECT COUNT(*) FROM ORDERS') || !res.includes('AS TOTAL_ORDERS')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 7,
      title: "FROM qismida Subquery (Ture/Derive table)",
      instruction: "Ichki so'rov orqali avval foydalanuvchilarni faqat ID va NAME larini oling va 'sub' deb nomlang, keyin asosiy so'rovda 'sub.name' ni qaytaring.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT sub.name FROM (SELECT id, name FROM users) AS sub",
      solution: "function myFunction() {\n  return \"SELECT sub.name FROM (SELECT id, name FROM users) AS sub;\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('FROM (SELECT') || !res.includes('AS SUB')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 8,
      title: "Correlated Subquery (Bog'langan so'rov)",
      instruction: "'employees' orasidan, o'zining bo'limidagi o'rtacha maoshdan (AVG(salary)) kattaroq maosh (salary) oladiganlarni 'name' ustunini qaytaring.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "SELECT name FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id)",
      solution: "function myFunction() {\n  return \"SELECT name FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('E1.DEPT_ID = E2.DEPT_ID') || !res.includes('AVG(SALARY)')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 9,
      title: "ANY kalit so'zi",
      instruction: "'products' jadvalidan istalgan 'electronics' (category_id = 2) mahsulotidan narxi arzonroq (price < ANY) bo'lgan boshqa toifadagi 'name' larni oling.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE price < ANY(SELECT price FROM products WHERE category_id = 2)",
      solution: "function myFunction() {\n  return \"SELECT name FROM products WHERE price < ANY (SELECT price FROM products WHERE category_id = 2);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('< ANY') && !res.includes('<ANY')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 10,
      title: "ALL kalit so'zi",
      instruction: "'products' orasidan barcha 'toys' (category_id = 3) dan narxi qimmat (price > ALL) bo'lgan mahsulotlar 'name' ini toping.",
      startingCode: "function myFunction() {\n  return \"\";\n}",
      hint: "WHERE price > ALL(SELECT price FROM products WHERE category_id = 3)",
      solution: "function myFunction() {\n  return \"SELECT name FROM products WHERE price > ALL (SELECT price FROM products WHERE category_id = 3);\";\n}",
      test: "const fn = new Function(code + '; return myFunction;')();\nconst res = fn().trim().toUpperCase();\nif (!res.includes('> ALL') && !res.includes('>ALL')) throw new Error('Xato so\\'rov');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Subquery nima?",
      options: [
        "Boshqa til orqali qilingan so'rov",
        "Tashqi so'rovning ichida joylashgan qo'shimcha (ichki) so'rov",
        "Jadvallarni birlashtiruvchi kalit so'z",
        "So'rov tezligini cheklovchi xatolik"
      ],
      correctAnswer: 1,
      explanation: "Subquery - bu bitta asosiy so'rov ichidagi kichikroq mustaqil yordamchi so'rov."
    },
    {
      id: 2,
      question: "Skalyar (Scalar) Subqueryning o'ziga xosligi nimada?",
      options: [
        "U doim jadval qaytaradi",
        "U hech qachon qator qaytarmaydi",
        "U roppa-rosa bitta qator va bitta ustun (ya'ni 1 ta yagona qiymat) qaytarishi shart",
        "Uni ishlatib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Skalyar deganda matematika/fizikadagi kabi yolg'iz bitta son yoki matn (yagona qiymat) tushuniladi."
    },
    {
      id: 3,
      question: "Qaysi operator ro'yxatni tekshirish uchun ishlatiladi (Subquery bir necha qator qaytarganda)?",
      options: [
        "=",
        ">",
        "IN",
        "EXISTS"
      ],
      correctAnswer: 2,
      explanation: "Agar ichki so'rov ro'yxat qaytarsa (masalan bir nechta id), unga IN yordamida murojaat qilinadi."
    },
    {
      id: 4,
      question: "O'zaro bog'langan (Correlated) so'rovning salbiy tarafi nima bo'lishi mumkin?",
      options: [
        "Juda tez ishlaydi",
        "Tez-tez syntax error beradi",
        "U tashqi so'rovning har bir qatori uchun qayta va qayta bajariladi, bu katta ma'lumotlarda juda sekin ishlashiga (N+1) sabab bo'ladi",
        "Hech qanday salbiy tarafi yo'q"
      ],
      correctAnswer: 2,
      explanation: "Tashqi tsikldagi 1000 ta qator bo'lsa, ichki so'rov ham 1000 marta bajariladi. Buni to'g'rilash uchun JOIN yoki CTE ishlatish tavsiya qilinadi."
    },
    {
      id: 5,
      question: "EXISTS va IN farqi nimada?",
      options: [
        "Ikkalasi umuman har xil, biri matnga, biri songa ishlaydi",
        "IN qatorlar to'plamini birma-bir solishtiradi. EXISTS faqat u yerda natija bor yoki yo'qligini mantiqiy (True/False) baholaydi va topishi bilan izlashni to'xtatadi",
        "Farqi yo'q",
        "EXISTS faqat MySQL da bor"
      ],
      correctAnswer: 1,
      explanation: "EXISTS ko'p hollarda 'Short-circuit' texnikasi kabi ishlaydi, 1 ta natija chiqsa qolganlarini qidirmaydi, natijada IN dan tezroq ishlashi mumkin."
    },
    {
      id: 6,
      question: "FROM qismidagi Subquerylarga (Derived tables) nima qo'yish majburiy?",
      options: [
        "Hech narsa",
        "Faqat WHERE sharti",
        "Alias (Taxallus) - masalan 'AS x'",
        "GROUP BY sharti"
      ],
      correctAnswer: 2,
      explanation: "Katta bazalarda (xususan PostgreSQL, MySQL) ichki so'rov orqali yaratilgan vaqtinchalik jadvalga o'z nomi (alias) berilishi qat'iy talab qilinadi."
    },
    {
      id: 7,
      question: "ANY va ALL operatorlari qayerda ishlatiladi?",
      options: [
        "Faqat SELECT da",
        "WHERE yoki HAVING da ro'yxat ichidagi ixtiyoriy bittasiga (ANY) yoki hammaga birdek (ALL) mos kelishini tekshirish uchun",
        "FROM qismida",
        "Jadvallarni nomlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Masalan: `> ALL(5,10)` degani ham 5dan ham 10dan katta degani (ya'ni 10 dan katta). `> ANY(5,10)` esa 5 dan katta bo'lsa bo'ldi degani."
    },
    {
      id: 8,
      question: "Agar ichki so'rov 0 ta natija qaytarsa, EXISTS qanday ishlaydi?",
      options: [
        "True qaytaradi",
        "Xatolik (Error) beradi",
        "False qaytaradi va asosiy so'rov bu qatorni tashlab o'tadi",
        "NULL qaytaradi"
      ],
      correctAnswer: 2,
      explanation: "EXISTS qutisi bo'sh bo'lsa, u FALSE bo'ladi va shart bajarilmaydi."
    },
    {
      id: 9,
      question: "Agar Subquery ichida ORDER BY ishlatsak bo'ladimi?",
      options: [
        "Hech qachon bo'lmaydi",
        "Asosan Skalyar yoki Top 1 natija kerak bo'lgandagina (masalan MAX(..) o'rniga ORDER BY .. LIMIT 1) foydalidir, aks holda IN kabi to'plamlarda uni ma'nosi yo'q va resurs oladi",
        "Doim majburiy",
        "Bu xatoga olib keladi"
      ],
      correctAnswer: 1,
      explanation: "Odatda ro'yxat (IN) uchun tartib muhim emas, lekin eng kattasini olish (LIMIT 1) uchun ORDER BY kerak."
    },
    {
      id: 10,
      question: "Subquerylar doim JOINlarga nisbatan tezroq ishlaydimi?",
      options: [
        "Ha, har doim",
        "Yo'q, aksariyat hollarda JOIN ancha optimallashtirilgan bo'ladi, lekin ba'zi mantiqlarni (masalan EXISTS) Subquery orqali chiroyli yozish samaraliroq bo'lishi mumkin",
        "Ikkalasi bir xil",
        "Hech biri to'g'ri emas"
      ],
      correctAnswer: 1,
      explanation: "Relyatsion bazalarda JOINlar juda optimallashtirilgan, lekin to'g'ri ishlangan Subquerylar ham (ayniqsa EXISTS bilan) kuchli vosita hisoblanadi."
    },
    {
      id: 11,
      question: "`SELECT id, (SELECT name FROM roles WHERE id=u.role_id) FROM users u` - Bu qanday subquery?",
      options: [
        "Uncorrelated Subquery",
        "Correlated Scalar Subquery (O'zaro bog'langan Skalyar)",
        "Derived Table",
        "Xato so'rov"
      ],
      correctAnswer: 1,
      explanation: "Har bir foydalanuvchi (u) uchun rolning nomi topilyapti (id = u.role_id) va bittagina ism (Scalar) qaytarilyapti. Demak, Correlated Scalar Subquery."
    },
    {
      id: 12,
      question: "Bir-biriga joylangan nechta Subquery ishlatish mumkin?",
      options: [
        "Faqat 1 ta",
        "Faqat 2 ta",
        "Texnik jihatdan juda ko'p (baza chekloviga ko'ra, masalan 32 ta), lekin chuqur ichma-ich so'rovlar o'qilishni va unumdorlikni qiyinlashtiradi",
        "Cheksiz, hech qanday yo'qotish bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Chuqur joylashtirilgan so'rovlar ('spaghetti code' kabi) o'qilishi juda qiyin bo'ladi va tezkor xotirani band qilishi mumkin, shuning uchun iloji boricha qisqa yoki CTE ko'rinishida yozish tavsiya qilinadi."
    }
  ]
};
