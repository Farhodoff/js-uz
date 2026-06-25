export const sqlSyntax = {
  id: "sql_syntax",
  title: "SQL Sintaksis (Syntax)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
SQL tili huddi ingliz tiliga o'xshaydi. Unda gaplar (statements) yozamiz. Har bir gap qaysidir ishni bajarishni buyuradi.

Eng asosiy sintaksis - bu ma'lumotlarni o'qish (SELECT):
\\\`\\\`\\\`sql
SELECT ustun1, ustun2 
FROM jadval_nomi 
WHERE shart;
\\\`\\\`\\\`
Bu huddi: *"Falon jadvaldan, falon shartga mos keladigan qatorlarning falon ustunlarini tanlab ber"* degani.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON:** Hamma ustunlarni (SELECT *) kerak bo'lmasa ham chaqirib olish. Bu bazani va tarmoqni ortiqcha zo'riqtiradi.
\`\`\`sql
-- Faqat foydalanuvchining ismi kerak bo'lsa ham:
SELECT * FROM users;
\`\`\`

**✅ YAXSHI:** Faqat sizga aynan kerak bo'lgan ustunlarni sanab o'tish.
\`\`\`sql
SELECT first_name, last_name FROM users;
\`\`\`

## 🎤 Intervyu Savollari
1. **\`SELECT *\` nima uchun yomon amaliyot hisoblanadi (production'da)?**
   - Tarmoq trafigi oshadi, xotira ko'p sarflanadi. Keraksiz ma'lumotlarni (masalan, parollar heshlari) tortib olish xavfsizlikka ham ziddir.
2. **SQL so'rovlari case-sensitive (harf kattaligiga sezgir) mi?**
   - SQL buyruqlarining o'zi (SELECT, FROM, WHERE) case-insensitive (farqi yo'q). Ammo jadval ichidagi matnli ma'lumotlar (masalan 'Toshkent' vs 'toshkent') ko'pincha sezgir bo'lishi mumkin (bazaning sozlamasiga qarab).
3. **\`WHERE\` qatorlarni qachon filtrlaydi?**
   - \`WHERE\` qatorlar guruhlanishidan (GROUP BY) oldin filtrlaydi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
flowchart LR
    A[SELECT] -->|Nimani olish?| B(ustunlar, ...)
    B --> C[FROM]
    C -->|Qayerdan?| D(jadval_nomi)
    D --> E[WHERE]
    E -->|Qaysi shart?| F(shartlar)
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Barchasini tanlash",
      instruction: "Barcha ustunlarni tanlash uchun SQL'da qaysi belgi ishlatiladi? Funksiya shu belgini qaytarsin.",
      startingCode: "function getAllSymbol() {\n  return '';\n}",
      hint: "Yulduzcha (*) belgisini qaytaring.",
      solution: "function getAllSymbol() {\n  return '*';\n}",
      test: "const fn = new Function(code + '; return getAllSymbol;')();\nif (fn() !== '*') throw new Error(\"'*' belgisi qaytarilmadi\");"
    },
    {
      id: 2,
      title: "2-Topshiriq: Qayerdan olish",
      instruction: "Qaysi jadvaldan ma'lumot olishni ko'rsatish uchun qaysi kalit so'z (keyword) ishlatiladi?",
      startingCode: "function getFromKeyword() {\n  return '';\n}",
      hint: "FROM so'zini qaytaring.",
      solution: "function getFromKeyword() {\n  return 'FROM';\n}",
      test: "const fn = new Function(code + '; return getFromKeyword;')();\nif (fn().toUpperCase() !== 'FROM') throw new Error(\"'FROM' so'zi kutilgandi\");"
    },
    {
      id: 3,
      title: "3-Topshiriq: Shart berish",
      instruction: "Qatorlarni filtrlash (shart berish) uchun qaysi kalit so'z ishlatiladi?",
      startingCode: "function getWhereKeyword() {\n  return '';\n}",
      hint: "WHERE so'zini qaytaring.",
      solution: "function getWhereKeyword() {\n  return 'WHERE';\n}",
      test: "const fn = new Function(code + '; return getWhereKeyword;')();\nif (fn().toUpperCase() !== 'WHERE') throw new Error(\"'WHERE' so'zi kutilgandi\");"
    },
    {
      id: 4,
      title: "4-Topshiriq: So'rov oxiri",
      instruction: "Standart SQL so'rovlari qaysi belgi bilan tugashi kerak? (Nuqtali vergul)",
      startingCode: "function getEndSymbol() {\n  return '';\n}",
      hint: "Nuqtali vergul (;) belgisini qaytaring.",
      solution: "function getEndSymbol() {\n  return ';';\n}",
      test: "const fn = new Function(code + '; return getEndSymbol;')();\nif (fn() !== ';') throw new Error(\"';' belgisi kutilgandi\");"
    },
    {
      id: 5,
      title: "5-Topshiriq: Oddiy so'rov",
      instruction: "'users' jadvalidan barcha ma'lumotlarni oluvchi SQL so'rovini yozing.",
      startingCode: "function selectAllUsers() {\n  return '';\n}",
      hint: "SELECT * FROM users; deb yozing.",
      solution: "function selectAllUsers() {\n  return 'SELECT * FROM users;';\n}",
      test: "const fn = new Function(code + '; return selectAllUsers;')();\nconst query = fn().trim().replace(/;$/, '').toUpperCase();\nif (query !== 'SELECT * FROM USERS') throw new Error(\"Xato SQL so'rovi\");"
    },
    {
      id: 6,
      title: "6-Topshiriq: Bitta ustun",
      instruction: "'users' jadvalidan faqat 'email' ustunini tanlovchi so'rov yozing.",
      startingCode: "function selectEmail() {\n  return '';\n}",
      hint: "SELECT email FROM users;",
      solution: "function selectEmail() {\n  return 'SELECT email FROM users;';\n}",
      test: "const fn = new Function(code + '; return selectEmail;')();\nconst query = fn().trim().replace(/;$/, '').toLowerCase();\nif (query !== 'select email from users') throw new Error(\"Faqat email ustuni tanlanishi kerak\");"
    },
    {
      id: 7,
      title: "7-Topshiriq: Ikkita ustun",
      instruction: "'users' jadvalidan 'name' va 'age' ustunlarini tanlang. Ustunlar orasiga vergul qo'yiladi.",
      startingCode: "function selectTwo() {\n  return '';\n}",
      hint: "SELECT name, age FROM users;",
      solution: "function selectTwo() {\n  return 'SELECT name, age FROM users;';\n}",
      test: "const fn = new Function(code + '; return selectTwo;')();\nconst query = fn().trim().replace(/;$/, '').toLowerCase().replace(/\\s+/g, ' ');\nif (!query.includes('select name, age from users') && !query.includes('select age, name from users')) throw new Error(\"Ikkita ustun tanlanishi kerak\");"
    },
    {
      id: 8,
      title: "8-Topshiriq: Shartli tanlash",
      instruction: "'users' jadvalidan 'id' si 5 ga teng bo'lgan qatorning barcha ustunlarini tanlang.",
      startingCode: "function selectWhere() {\n  return '';\n}",
      hint: "SELECT * FROM users WHERE id = 5;",
      solution: "function selectWhere() {\n  return 'SELECT * FROM users WHERE id = 5;';\n}",
      test: "const fn = new Function(code + '; return selectWhere;')();\nconst query = fn().trim().replace(/;$/, '').toLowerCase().replace(/\\s+/g, ' ');\nif (query !== 'select * from users where id = 5') throw new Error(\"WHERE sharti noto'g'ri\");"
    },
    {
      id: 9,
      title: "9-Topshiriq: Noyob ma'lumotlar",
      instruction: "Takrorlanuvchi ma'lumotlarni bitta qilib chiqarish uchun SELECT dan keyin qaysi so'z ishlatiladi?",
      startingCode: "function getDistinct() {\n  return '';\n}",
      hint: "DISTINCT so'zini qaytaring.",
      solution: "function getDistinct() {\n  return 'DISTINCT';\n}",
      test: "const fn = new Function(code + '; return getDistinct;')();\nif (fn().toUpperCase() !== 'DISTINCT') throw new Error(\"'DISTINCT' kutilgandi\");"
    },
    {
      id: 10,
      title: "10-Topshiriq: Tartiblash (Oldindan ko'rish)",
      instruction: "Ma'lumotlarni tartiblash uchun qaysi kalit so'z ishlatiladi? (Ikki so'z, bo'sh joy bilan)",
      startingCode: "function getOrderBy() {\n  return '';\n}",
      hint: "ORDER BY",
      solution: "function getOrderBy() {\n  return 'ORDER BY';\n}",
      test: "const fn = new Function(code + '; return getOrderBy;')();\nif (fn().toUpperCase().replace(/\\s+/g, ' ') !== 'ORDER BY') throw new Error(\"'ORDER BY' kutilgandi\");"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Barcha ustunlarni olish uchun qaysi belgi ishlatiladi?",
      options: ["*", "%", "$", "#"],
      correctAnswer: 0,
      explanation: "* belgisi 'all columns' (barcha ustunlar) degan ma'noni bildiradi."
    },
    {
      id: 2,
      question: "Qaysi kalit so'z jadval nomini ko'rsatadi?",
      options: ["SELECT", "FROM", "WHERE", "TABLE"],
      correctAnswer: 1,
      explanation: "FROM so'zidan so'ng qaysi jadvaldan ma'lumot olinishi kerakligi ko'rsatiladi."
    },
    {
      id: 3,
      question: "Qaysi kalit so'z shart berish uchun ishlatiladi?",
      options: ["CONDITION", "IF", "WHERE", "FILTER"],
      correctAnswer: 2,
      explanation: "WHERE yordamida faqat ma'lum bir shartga javob beradigan qatorlar tanlanadi."
    },
    {
      id: 4,
      question: "SQL so'rovlari qanday belgi bilan tugashi kerak?",
      options: [".", ",", ":", ";"],
      correctAnswer: 3,
      explanation: "Standartga ko'ra har bir SQL statement nuqtali vergul (;) bilan tugashi kerak."
    },
    {
      id: 5,
      question: "SELECT email, name FROM users; so'rovi qanday ishlaydi?",
      options: ["Barcha ma'lumotni oladi", "Faqat email va name ustunlarini oladi", "Xato beradi", "Jadvalni o'chiradi"],
      correctAnswer: 1,
      explanation: "U faqat ko'rsatilgan ustunlarni (email va name) qaytaradi."
    },
    {
      id: 6,
      question: "Takrorlangan qatorlarni olib tashlab, faqat noyob (unique) qiymatlarni olish uchun nima ishlatiladi?",
      options: ["SELECT UNIQUE", "SELECT DISTINCT", "SELECT SINGLE", "SELECT DIFFERENT"],
      correctAnswer: 1,
      explanation: "SELECT DISTINCT takrorlanishlarni olib tashlaydi."
    },
    {
      id: 7,
      question: "SQL kalit so'zlari katta-kichik harfga sezgirmi?",
      options: ["Ha, doim", "Yo'q, SELECT va select bir xil ishlaydi", "Faqat PostgreSQL da sezgir", "Faqat FROM sezgir"],
      correctAnswer: 1,
      explanation: "SQL kalit so'zlari (keywords) katta-kichik harfga sezgir emas, lekin an'anaga ko'ra KATTA harflarda yoziladi."
    },
    {
      id: 8,
      question: "Jadvaldagi qatorlar sonini sanash uchun qaysi funksiya ishlatiladi?",
      options: ["SUM()", "COUNT()", "TOTAL()", "ADD()"],
      correctAnswer: 1,
      explanation: "COUNT() funksiyasi qatorlar sonini sanaydi."
    },
    {
      id: 9,
      question: "Nima uchun SELECT * yomon amaliyot bo'lishi mumkin?",
      options: ["Xato beradi", "Tarmoq trafigi va xotirani bekorga band qiladi", "Baza o'chib ketadi", "Jadvalni bloklaydi"],
      correctAnswer: 1,
      explanation: "Keraksiz ustunlarni olish ko'p resurs sarflaydi."
    },
    {
      id: 10,
      question: "WHERE sharti qachon bajariladi?",
      options: ["Natija ekranga chiqqandan keyin", "Ma'lumotlarni tanlash vaqtida", "So'rov tugaganidan so'ng", "Baza yaratilayotganda"],
      correctAnswer: 1,
      explanation: "WHERE sharti ma'lumotlar tanlab olinayotganda ishlaydi va noto'g'ri qatorlarni filtrlaydi."
    },
    {
      id: 11,
      question: "Bir nechta ustunlarni tanlashda ular nimaning yordamida ajratiladi?",
      options: ["Nuqta", "Vergul", "Probel", "Tire"],
      correctAnswer: 1,
      explanation: "Vergul (,) orqali ustunlar nomlari ketma-ket sanaladi (SELECT a, b, c)."
    },
    {
      id: 12,
      question: "So'rovda FROM so'zi qayerda joylashadi?",
      options: ["SELECT dan oldin", "SELECT dan keyin va WHERE dan oldin", "Eng oxirida", "Istalgan joyda"],
      correctAnswer: 1,
      explanation: "Standart sintaksis: SELECT ... FROM ... WHERE ... ko'rinishida bo'ladi."
    }
  ]
};
