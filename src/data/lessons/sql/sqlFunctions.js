export const sqlFunctions = {
  id: "sqlFunctions",
  title: "Agregat Funksiyalar (COUNT, SUM, AVG)",
  language: "sql",
  dbSetup: "CREATE TABLE hodimlar (id INT, ism STRING, bolim STRING, oylik INT); INSERT INTO hodimlar VALUES (1,'Ali','IT',500),(2,'Vali','IT',700),(3,'Guli','HR',400),(4,'Hasan','IT',600);",
  theory: `## 1. Bu nima?

Tasavvur qiling, savatda to'rtta olma bor. Sizni qiziqtirgani bitta savol: "Hammasi bo'lib nechta?" Bittalab sanash o'rniga taroziga qo'yasiz. Bitta raqam chiqadi.

Dasturlashda agregat funksiyalar xuddi shu tarozi. Ko'p qator kiradi. Bitta jamlangan natija chiqadi.

Agregat funksiya — ko'p qatorni bitta yakuniy qiymatga jamlaydigan buyruqdir. Eng asosiylari: \`COUNT\` (soni), \`SUM\` (yig'indi), \`AVG\` (o'rtacha), \`MIN\` (eng kichik), \`MAX\` (eng katta).

---

## 2. Nega kerak?

Kompaniyada 4 xodim bor. Rahbar so'radi: "Jami oylik qancha? O'rtacha qancha?"

Muammo shunda: har birini qo'lda qo'shib bo'lmaydi. Yuzlab qator bo'lsa-chi? Yechim — jamlovchi funksiyalar:

\`\`\`sql
SELECT COUNT(*) AS soni FROM hodimlar;
SELECT SUM(oylik) AS jami FROM hodimlar;
\`\`\`

Bitta so'rov. Bitta javob. Qo'lda hisoblash shart emas.

---

## 3. Birinchi misol

Bu kod xodimlar sonini hisoblaydi.

\`\`\`sql
SELECT COUNT(*) AS soni FROM hodimlar; -- Nechta qator bor?
\`\`\`

\`\`\`text
// Natija:
[{"soni":4}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`COUNT(*)\` — qatorlarni sanaydi. Yulduzcha "hammasi" degani.
- \`AS soni\` — natija ustuniga nom beradi.
- Natijada bitta qator, bitta ustun: \`4\`.

---

## 5. Yana bitta misol

Bu kod bo'limlar bo'yicha guruhlab sanaydi.

\`\`\`sql
SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim; -- Har bo'limda nechtadan?
\`\`\`

\`\`\`text
// Natija:
[{"bolim":"IT","soni":3},{"bolim":"HR","soni":1}]
\`\`\`

Qator-baqator tahlil:
- \`GROUP BY bolim\` — qatorlarni bo'limlarga ajratadi. IT alohida, HR alohida.
- \`COUNT(*)\` — har guruhni alohida sanaydi. IT da 3 ta, HR da 1 ta.
- Natijada har guruh uchun bitta qator chiqadi.

---

## 5.1. Guruhni filtrlash

Guruhlangan natijani ham filtrlash mumkin. Lekin \`WHERE\` bilan emas — \`HAVING\` bilan:

\`\`\`sql
SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim HAVING COUNT(*) > 1; -- 1 tadan ko'p bo'lganlar
\`\`\`

\`\`\`text
// Natija:
[{"bolim":"IT","soni":3}]
\`\`\`

Qator-baqator tahlil:
- Avval guruhlash bajarildi: IT (3 ta), HR (1 ta).
- \`HAVING COUNT(*) > 1\` — guruhlarni tekshirdi. Faqat IT shartga mos keldi.
- \`WHERE\` qatorlarni, \`HAVING\` guruhlarni filtrlaydi.

---

## 6. Ko'p uchraydigan xatolar

### 1. GROUP BY siz ustun qo'shish
❌ Xato kod:
\`\`\`sql
SELECT bolim, COUNT(*) AS soni FROM hodimlar;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin natijada \`bolim\` ustuni yo'qolib ketadi — faqat \`soni\` chiqadi. Qaysi guruh sanalgani bilinmaydi. Natija ishonchsiz.
✅ To'g'ri variant:
\`\`\`sql
SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim;
\`\`\`

### 2. Guruhga WHERE ishlatish
❌ Xato kod:
\`\`\`sql
SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim WHERE COUNT(*) > 1;
\`\`\`
Nima bo'ladi: xatolik yuz beradi. \`WHERE\` guruhlashdan oldin ishlaydi. U hali guruhlarni ko'rmagan. Guruh sharti uchun faqat \`HAVING\` ishlatiladi.
✅ To'g'ri variant:
\`\`\`sql
SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim HAVING COUNT(*) > 1;
\`\`\`

### 3. COUNT(ustun) bilan COUNT(*) ni aralashtirish
❌ Xato tushuncha:
\`\`\`sql
SELECT COUNT(bolim) AS soni FROM hodimlar;
\`\`\`
Nima bo'ladi: xato bermaydi. Lekin farq bor: \`COUNT(*)\` hamma qatorni sanaydi. \`COUNT(bolim)\` faqat bo'sh bo'lmaganlarini sanaydi. Hozirgi jadvalda farq chiqmaydi. Lekin esda tutish kerak.
✅ To'g'ri tushuncha: hamma qator kerak bo'lsa — \`COUNT(*)\` yoziladi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
hodimlar sonini chiqaring (\`COUNT(*)\` bilan). Natija \`4\` bo'lishi kerak.

### 2-mashq (O'rtacha)
Oyliklar yig'indisini chiqaring (\`SUM(oylik)\` bilan). Natija \`2200\` bo'lishi kerak.

### 3-mashq (Chegara holat)
Bo'limlar bo'yicha sanang. Faqat 1 tadan ko'p bo'lgan guruh chiqsin (\`HAVING\` bilan). Faqat IT chiqishi kerak.

### Javoblar:
1.
\`\`\`sql
SELECT COUNT(*) AS soni FROM hodimlar;
\`\`\`
2.
\`\`\`sql
SELECT SUM(oylik) AS jami FROM hodimlar;
\`\`\`
3.
\`\`\`sql
SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim HAVING COUNT(*) > 1;
\`\`\`

---

## 8. Xulosa

1. Agregat funksiyalar ko'p qatorni bitta natijaga jamlaydi: \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`.
2. \`GROUP BY\` qatorlarni guruhlaydi. Har guruh alohida hisoblanadi.
3. \`WHERE\` qatorlarni, \`HAVING\` guruhlarni filtrlaydi. Joyi almashmaydi.

Keyingi darsda: mavjud qatorni yangilash va o'chirish (UPDATE, DELETE) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Sanoq",
      instruction: "hodimlar jadvalidagi (id, ism, bolim, oylik) qatorlar sonini chiqaring. Natija 4 bo'lishi kerak.",
      startingCode: "SELECT * FROM hodimlar;",
      hint: "SELECT COUNT(*) AS soni FROM hodimlar;",
      solution: "SELECT COUNT(*) AS soni FROM hodimlar;",
      test: "if (!/\\bCOUNT\\b/i.test(code)) return 'COUNT yozing';\nif (result.length !== 1 || result[0].soni !== 4) return 'Natija 4 bolishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Yig'indi",
      instruction: "Oyliklar yig'indisini chiqaring. Natija 2200 bo'lishi kerak.",
      startingCode: "SELECT * FROM hodimlar;",
      hint: "SELECT SUM(oylik) AS jami FROM hodimlar;",
      solution: "SELECT SUM(oylik) AS jami FROM hodimlar;",
      test: "if (!/\\bSUM\\b/i.test(code)) return 'SUM yozing';\nif (result.length !== 1 || result[0].jami !== 2200) return 'Natija 2200 bolishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: O'rtacha",
      instruction: "O'rtacha oylikni chiqaring. Natija 550 bo'lishi kerak.",
      startingCode: "SELECT * FROM hodimlar;",
      hint: "SELECT AVG(oylik) AS ortacha FROM hodimlar;",
      solution: "SELECT AVG(oylik) AS ortacha FROM hodimlar;",
      test: "if (!/\\bAVG\\b/i.test(code)) return 'AVG yozing';\nif (result.length !== 1 || result[0].ortacha !== 550) return 'Natija 550 bolishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Eng kichik va katta",
      instruction: "Eng kichik va eng katta oylikni chiqaring (400 va 700).",
      startingCode: "SELECT oylik FROM hodimlar;",
      hint: "SELECT MIN(oylik) AS engkam, MAX(oylik) AS engkop FROM hodimlar;",
      solution: "SELECT MIN(oylik) AS engkam, MAX(oylik) AS engkop FROM hodimlar;",
      test: "if (!/\\bMIN\\b/i.test(code) || !/\\bMAX\\b/i.test(code)) return 'MIN va MAX yozing';\nif (result[0].engkam !== 400 || result[0].engkop !== 700) return '400 va 700 chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Guruhlash",
      instruction: "Bo'limlar bo'yicha sanang (IT: 3, HR: 1). 2 qator chiqishi kerak.",
      startingCode: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim;",
      hint: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim;",
      solution: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim;",
      test: "if (!/\\bGROUP\\s+BY\\b/i.test(code)) return 'GROUP BY yozing';\nif (result.length !== 2) return '2 guruh chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Guruh filtri",
      instruction: "Faqat 1 tadan ko'p xodimi bor bo'limni chiqaring (HAVING bilan). Faqat IT chiqishi kerak.",
      startingCode: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim;",
      hint: "Oxiriga HAVING COUNT(*) > 1 qo'shing.",
      solution: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim HAVING COUNT(*) > 1;",
      test: "if (!/\\bHAVING\\b/i.test(code)) return 'HAVING yozing';\nif (result.length !== 1 || result[0].bolim !== 'IT') return 'Faqat IT chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: GROUP BY qo'shish",
      instruction: "Quyidagi xatoni tuzating: `GROUP BY` qo'shing (IT: 3, HR: 1 chiqishi kerak).",
      startingCode: "SELECT bolim, COUNT(*) AS soni FROM hodimlar;",
      hint: "Oxiriga GROUP BY bolim qo'shing.",
      solution: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim;",
      test: "if (!/\\bGROUP\\s+BY\\b/i.test(code)) return 'GROUP BY qoshing';\nif (result.length !== 2) return '2 guruh chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: WHERE o'rniga HAVING",
      instruction: "Quyidagi xatoni tuzating: guruh sharti `WHERE` emas, `HAVING` bo'lishi kerak.",
      startingCode: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim WHERE COUNT(*) > 1;",
      hint: "WHERE ni HAVING ga almashtiring.",
      solution: "SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim HAVING COUNT(*) > 1;",
      test: "if (!/\\bHAVING\\b/i.test(code)) return 'HAVING yozing';\nif (result.length !== 1) return 'Faqat IT chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: IT yig'indi (chegara)",
      instruction: "Faqat IT bo'limi oyliklari yig'indisini chiqaring (WHERE + SUM). Natija 1800 bo'lishi kerak.",
      startingCode: "SELECT * FROM hodimlar;",
      hint: "Oxiriga WHERE bolim = 'IT' qo'shing.",
      solution: "SELECT SUM(oylik) AS jami FROM hodimlar WHERE bolim = 'IT';",
      test: "if (!/\\bWHERE\\b/i.test(code)) return 'WHERE bilan filtrlang';\nif (result[0].jami !== 1800) return 'Natija 1800 bolishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Eng katta IT oylik (chegara)",
      instruction: "IT bo'limidagi eng katta oylikni chiqaring. Natija 700 bo'lishi kerak.",
      startingCode: "SELECT MAX(oylik) AS engkop FROM hodimlar;",
      hint: "Oxiriga WHERE bolim = 'IT' qo'shing.",
      solution: "SELECT MAX(oylik) AS engkop FROM hodimlar WHERE bolim = 'IT';",
      test: "if (result[0].engkop !== 700) return 'Natija 700 bolishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`SELECT COUNT(*) AS soni FROM hodimlar;` (4 qator) nima qaytaradi?",
      options: ["4 ta qator", "Bitta qator: 4", "Xatolik", "Bo'sh natija"],
      correctAnswer: 1,
      explanation: "COUNT hammasini sanab, bitta natija beradi."
    },
    {
      id: 2,
      question: "Yig'indi hisoblaydigan funksiya qaysi?",
      options: ["COUNT", "SUM", "AVG", "MIN"],
      correctAnswer: 1,
      explanation: "SUM ustun qiymatlarini qo'shadi."
    },
    {
      id: 3,
      question: "O'rtacha hisoblaydigan funksiya qaysi?",
      options: ["SUM", "AVG", "MAX", "COUNT"],
      correctAnswer: 1,
      explanation: "AVG o'rtacha qiymatni hisoblaydi."
    },
    {
      id: 4,
      question: "`SELECT bolim, COUNT(*) AS soni FROM hodimlar GROUP BY bolim;` nechta qator qaytaradi?",
      options: ["1 ta", "2 ta (har bo'limga bitta)", "4 ta", "Xatolik"],
      correctAnswer: 1,
      explanation: "Har guruh uchun bitta qator: IT va HR."
    },
    {
      id: 5,
      question: "Guruhlarni filtrlash uchun nima ishlatiladi?",
      options: ["WHERE", "HAVING", "FILTER", "GROUP"],
      correctAnswer: 1,
      explanation: "WHERE qatorlarni, HAVING guruhlarni filtrlaydi."
    },
    {
      id: 6,
      question: "`SELECT bolim, COUNT(*) AS soni FROM hodimlar;` (GROUP BY siz) nima qiladi?",
      options: ["Ishlaydi", "Xatolik beradi", "Bo'sh qaytaradi", "Hammasini sanaydi"],
      correctAnswer: 1,
      explanation: "Guruhlanmagan ustun bilan jamlangan natija aralashib bo'lmaydi."
    },
    {
      id: 7,
      question: "Eng kichik qiymatni topadigan funksiya qaysi?",
      options: ["MAX", "MIN", "LOW", "SMALL"],
      correctAnswer: 1,
      explanation: "MIN eng kichikni, MAX eng kattani qaytaradi."
    },
    {
      id: 8,
      question: "`SELECT SUM(oylik) AS jami FROM hodimlar WHERE bolim = 'IT';` (500, 700, 600) nima qaytaradi?",
      options: ["2200", "1800", "3", "Xatolik"],
      correctAnswer: 1,
      explanation: "Avval WHERE filtrlaydi (3 qator), keyin SUM qo'shadi."
    },
    {
      id: 9,
      question: "HAVING qayerda yoziladi?",
      options: ["WHERE dan oldin", "GROUP BY dan keyin", "SELECT dan oldin", "FROM dan oldin"],
      correctAnswer: 1,
      explanation: "Tartib: GROUP BY, keyin HAVING."
    },
    {
      id: 10,
      question: "`SELECT MAX(oylik) AS engkop FROM hodimlar WHERE bolim = 'IT';` (500, 700, 600) nima qaytaradi?",
      options: ["700", "600", "500", "1800"],
      correctAnswer: 0,
      explanation: "IT ichidagi eng kattasi 700."
    },
    {
      id: 11,
      question: "COUNT(*) bilan COUNT(bolim) farqi nima?",
      options: ["Farqi yo'q", "Birinchisi hamma qatorni, ikkinchisi bo'sh bo'lmaganlarni sanaydi", "Ikkinchisi tezroq", "Birinchisi xato beradi"],
      correctAnswer: 1,
      explanation: "COUNT(ustun) bo'sh (NULL) qiymatlarni sanamaydi."
    },
    {
      id: 12,
      question: "Agregat natijasi nechta qator bo'ladi (guruhsiz)?",
      options: ["Qatorlar sonicha", "Bitta", "Nol", "Cheksiz"],
      correctAnswer: 1,
      explanation: "Guruhsiz jamlash har doim bitta qator qaytaradi."
    }
  ]
};
