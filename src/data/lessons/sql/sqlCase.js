export const sqlCase = {
  id: "sqlCase",
  title: "Shartli Qiymat (CASE)",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT, city STRING); INSERT INTO users VALUES (1,'Ali',25,'Toshkent'),(2,'Vali',17,'Samarqand'),(3,'Guli',30,'Toshkent'),(4,'Hasan',22,NULL);",
  theory: `## 1. Bu nima?

Tasavvur qiling, o'qituvchi baho qo'ymoqda. Qoidasi bor: 90 dan yuqori bo'lsa — "A'lo", 70 dan yuqori bo'lsa — "Yaxshi", qolgan bo'lsa — "Past". Ball kiradi. So'z chiqadi.

Dasturlashda CASE (holat) xuddi shu baholash qoidasi. Qiymatga qarab, boshqa qiymat qaytaradi.

CASE — shartga qarab qiymat tanlaydigan ifodadir. WHEN (qachon), THEN (unda), ELSE (aks holda) qismlaridan iborat.

---

## 2. Nega kerak?

Foydalanuvchilar ro'yxati bor. Har biriga holat yozish kerak: katta yoshlimi yoki kichikmi?

Muammo shunda: holat bazada yo'q. Uni hisoblash kerak. Yechim — CASE:

\`\`\`sql
SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;
\`\`\`

Yangi ustun hisoblangan. Jadval o'zgarmagan.

---

## 3. Birinchi misol

Bu kod har biriga holat yozadi.

\`\`\`sql
SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali","holat":"Katta"},{"name":"Vali","holat":"Kichik"},{"name":"Guli","holat":"Katta"},{"name":"Hasan","holat":"Katta"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`CASE WHEN age >= 18\` — savol. Har qator uchun tekshiriladi.
- \`THEN 'Katta'\` — rost bo'lsa, shu qiymat olinadi.
- \`ELSE 'Kichik'\` — yolg'on bo'lsa, shu qiymat olinadi.
- \`END AS holat\` — ifoda tugadi. Natija ustuni \`holat\` deb ataladi.

---

## 5. Yana bitta misol

Bu kod ikkita shartli ustun chiqaradi.

\`\`\`sql
SELECT name, CASE WHEN city = 'Toshkent' THEN 'Poytaxt' ELSE 'Viloyat' END AS joy FROM users;
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali","joy":"Poytaxt"},{"name":"Vali","joy":"Viloyat"},{"name":"Guli","joy":"Poytaxt"},{"name":"Hasan","joy":"Viloyat"}]
\`\`\`

Qator-baqator tahlil:
- Har qatorning shahri tekshirildi.
- Toshkentliklarga "Poytaxt", qolganlarga "Viloyat" yozildi.

---

## 5.1. Bo'shliqni almashtirish

COALESCE birinchi bo'sh bo'lmagan qiymatni oladi:

\`\`\`sql
SELECT name, COALESCE(city, 'Nomalum') AS shahar FROM users;
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali","shahar":"Toshkent"},{"name":"Vali","shahar":"Samarqand"},{"name":"Guli","shahar":"Toshkent"},{"name":"Hasan","shahar":"Nomalum"}]
\`\`\`

Qator-baqator tahlil:
- Hasan shahri bo'sh (NULL). O'rniga "Nomalum" qo'yildi.
- Qolganlar o'z qiymaticha qoldi.

---

## 6. Ko'p uchraydigan xatolar

### 1. END ni unutish
❌ Xato kod:
\`\`\`sql
SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' FROM users;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Har bir CASE so'zi END bilan yakunlanadi.
✅ To'g'ri variant:
\`\`\`sql
SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;
\`\`\`

### 2. ELSE ni unutish
❌ Xato tushuncha:
\`\`\`sql
SELECT name, CASE WHEN age >= 18 THEN 'Katta' END AS holat FROM users;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin shartga mos kelmaganlar bo'sh chiqadi (Vali uchun hech narsa). Har doim ELSE yozish odat qilinsin.
✅ To'g'ri variant:
\`\`\`sql
SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;
\`\`\`

### 3. THEN o'rniga = yozish
❌ Xato kod:
\`\`\`sql
SELECT CASE WHEN age >= 18 = 'Katta' END FROM users;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Shartdan keyin THEN keladi. Tenglik belgisi bu yerda ishlamaydi.
✅ To'g'ri variant:
\`\`\`sql
SELECT CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END FROM users;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Har biriga holat yozing: 18 dan katta bo'lsa \`'Katta'\`, aks holda \`'Kichik'\`. Ustun nomi \`holat\` bo'lsin.

### 2-mashq (O'rtacha)
Shahar bo'yicha yozing: Toshkent bo'lsa \`'Poytaxt'\`, aks holda \`'Viloyat'\`. Ustun nomi \`joy\` bo'lsin.

### 3-mashq (Chegara holat)
Bo'sh shaharni almashtiring: COALESCE bilan Hasan shahri \`'Nomalum'\` chiqsin.

### Javoblar:
1.
\`\`\`sql
SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;
\`\`\`
2.
\`\`\`sql
SELECT name, CASE WHEN city = 'Toshkent' THEN 'Poytaxt' ELSE 'Viloyat' END AS joy FROM users;
\`\`\`
3.
\`\`\`sql
SELECT name, COALESCE(city, 'Nomalum') AS shahar FROM users;
\`\`\`

---

## 8. Xulosa

1. CASE — shartga qarab qiymat tanlaydi: WHEN, THEN, ELSE, END.
2. ELSE unutilsa, mos kelmaganlar bo'sh chiqadi.
3. COALESCE birinchi bo'sh bo'lmagan qiymatni oladi.

Keyingi darsda: matn bilan ishlaydigan funksiyalar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Holat ustuni",
      instruction: "users jadvalidan (id, name, age, city) har biriga holat yozing (18+ → 'Katta', aks holda 'Kichik'). Ustun `holat` bo'lsin.",
      startingCode: "SELECT name FROM users;",
      hint: "SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;",
      solution: "SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;",
      test: "if (!/\\bCASE\\b/i.test(code)) return 'CASE yozing';\nconst m = {};\nresult.forEach(r => { m[r.name] = r.holat; });\nif (m['Ali'] !== 'Katta' || m['Vali'] !== 'Kichik' || m['Guli'] !== 'Katta' || m['Hasan'] !== 'Katta') return 'Holatlar togri bolishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Joy ustuni",
      instruction: "Shahar bo'yicha yozing (Toshkent → 'Poytaxt', aks holda 'Viloyat'). Ustun `joy` bo'lsin.",
      startingCode: "SELECT name FROM users;",
      hint: "SELECT name, CASE WHEN city = 'Toshkent' THEN 'Poytaxt' ELSE 'Viloyat' END AS joy FROM users;",
      solution: "SELECT name, CASE WHEN city = 'Toshkent' THEN 'Poytaxt' ELSE 'Viloyat' END AS joy FROM users;",
      test: "const m = {};\nresult.forEach(r => { m[r.name] = r.joy; });\nif (m['Ali'] !== 'Poytaxt' || m['Vali'] !== 'Viloyat' || m['Hasan'] !== 'Viloyat') return 'Joylar togri bolishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: END qo'shish",
      instruction: "Quyidagi xatoni tuzating: CASE so'zi END bilan yakunlanishi kerak.",
      startingCode: "SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' FROM users;",
      hint: "Oxiriga END AS holat qo'shing.",
      solution: "SELECT name, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;",
      test: "if (!/\\bEND\\b/i.test(code)) return 'END yozing';\nif (result.length !== 4) return '4 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: COALESCE",
      instruction: "Bo'sh shaharni almashtiring (Hasan → 'Nomalum'). Ustun `shahar` bo'lsin.",
      startingCode: "SELECT name, city FROM users;",
      hint: "SELECT name, COALESCE(city, 'Nomalum') AS shahar FROM users;",
      solution: "SELECT name, COALESCE(city, 'Nomalum') AS shahar FROM users;",
      test: "if (!/\\bCOALESCE\\b/i.test(code)) return 'COALESCE yozing';\nconst m = {};\nresult.forEach(r => { m[r.name] = r.shahar; });\nif (m['Hasan'] !== 'Nomalum' || m['Ali'] !== 'Toshkent') return 'Almashish togri bolishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Baho tizimi (chegara)",
      instruction: "Yosh bo'yicha yozing: 30+ → 'Katta', 20+ → 'Orta', aks holda 'Yosh'. Ustun `daraja` bo'lsin.",
      startingCode: "SELECT name, age FROM users;",
      hint: "SELECT name, CASE WHEN age >= 30 THEN 'Katta' WHEN age >= 20 THEN 'Orta' ELSE 'Yosh' END AS daraja FROM users;",
      solution: "SELECT name, CASE WHEN age >= 30 THEN 'Katta' WHEN age >= 20 THEN 'Orta' ELSE 'Yosh' END AS daraja FROM users;",
      test: "const m = {};\nresult.forEach(r => { m[r.name] = r.daraja; });\nif (m['Guli'] !== 'Katta' || m['Ali'] !== 'Orta' || m['Vali'] !== 'Yosh' || m['Hasan'] !== 'Orta') return 'Darajalar togri bolishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Shahar kodi (chegara)",
      instruction: "Toshkent → 'T', Samarqand → 'S', aks holda 'B' yozing. Ustun `kod` bo'lsin.",
      startingCode: "SELECT name, city FROM users;",
      hint: "SELECT name, CASE WHEN city = 'Toshkent' THEN 'T' WHEN city = 'Samarqand' THEN 'S' ELSE 'B' END AS kod FROM users;",
      solution: "SELECT name, CASE WHEN city = 'Toshkent' THEN 'T' WHEN city = 'Samarqand' THEN 'S' ELSE 'B' END AS kod FROM users;",
      test: "const m = {};\nresult.forEach(r => { m[r.name] = r.kod; });\nif (m['Ali'] !== 'T' || m['Vali'] !== 'S' || m['Hasan'] !== 'B') return 'Kodlar togri bolishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Yosh toifasi (chegara)",
      instruction: "18 dan kichiklar uchun 'Bola', qolganlar uchun 'Katta' yozing.",
      startingCode: "SELECT name, age FROM users;",
      hint: "SELECT name, CASE WHEN age < 18 THEN 'Bola' ELSE 'Katta' END AS toifa FROM users;",
      solution: "SELECT name, CASE WHEN age < 18 THEN 'Bola' ELSE 'Katta' END AS toifa FROM users;",
      test: "const m = {};\nresult.forEach(r => { m[r.name] = r.toifa; });\nif (m['Vali'] !== 'Bola' || m['Ali'] !== 'Katta') return 'Toifalar togri bolishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: NULLIF (chegara)",
      instruction: "Yoshi 25 bo'lganlarni bo'sh qiling: NULLIF bilan Ali qatori bo'sh chiqishi kerak.",
      startingCode: "SELECT name, NULLIF(age, 25) AS y FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name, NULLIF(age, 25) AS y FROM users;",
      test: "const m = {};\nresult.forEach(r => { m[r.name] = r.y; });\nif (!(m['Ali'] === undefined || m['Ali'] === null) || m['Vali'] !== 17) return 'Ali bosh, Vali 17 bolishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Ikki shartli (chegara)",
      instruction: "Toshkentlik kattalarni toping: shahar Toshkent VA yosh 20+ bo'lganlar 'Ha', qolganlar 'Yoq' deb chiqsin.",
      startingCode: "SELECT name FROM users;",
      hint: "SELECT name, CASE WHEN city = 'Toshkent' AND age >= 20 THEN 'Ha' ELSE 'Yoq' END AS javob FROM users;",
      solution: "SELECT name, CASE WHEN city = 'Toshkent' AND age >= 20 THEN 'Ha' ELSE 'Yoq' END AS javob FROM users;",
      test: "const m = {};\nresult.forEach(r => { m[r.name] = r.javob; });\nif (m['Ali'] !== 'Ha' || m['Guli'] !== 'Ha' || m['Vali'] !== 'Yoq' || m['Hasan'] !== 'Yoq') return 'Javoblar togri bolishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq jadval (chegara)",
      instruction: "Hamma ustun + holat ustunini chiqaring (holat: 18+ 'Katta', aks holda 'Kichik'). 4 qator chiqishi kerak.",
      startingCode: "SELECT * FROM users;",
      hint: "SELECT *, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;",
      solution: "SELECT *, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;",
      test: "if (result.length !== 4) return '4 qator chiqishi kerak';\nif (!('holat' in result[0]) && result[0].holat === undefined) return 'holat ustuni kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "CASE nimani qiladi?",
      options: ["Jadval yaratadi", "Shartga qarab qiymat tanlaydi", "Qator o'chiradi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "WHEN rost bo'lsa THEN qiymati, aks holda ELSE qiymati olinadi."
    },
    {
      id: 2,
      question: "CASE qaysi so'z bilan tugaydi?",
      options: ["FINISH", "END", "CLOSE", "STOP"],
      correctAnswer: 1,
      explanation: "Har bir CASE END bilan yakunlanadi."
    },
    {
      id: 3,
      question: "ELSE yozilmasa nima bo'ladi?",
      options: ["Xatolik beradi", "Mos kelmaganlar bo'sh chiqadi", "Hammasi chiqadi", "Hech narsa chiqmaydi"],
      correctAnswer: 1,
      explanation: "Mos kelmagan qatorlarda natija bo'sh bo'ladi."
    },
    {
      id: 4,
      question: "COALESCE nimani qiladi?",
      options: ["Hammasini qo'shadi", "Birinchi bo'sh bo'lmagan qiymatni oladi", "O'chiradi", "Saralaydi"],
      correctAnswer: 1,
      explanation: "Bo'sh qiymat o'rniga zaxira qo'yiladi."
    },
    {
      id: 5,
      question: "`CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END` (age 25) nima beradi?",
      options: ["Kichik", "Katta", "25", "Xatolik"],
      correctAnswer: 1,
      explanation: "25 >= 18 rost. Natija Katta."
    },
    {
      id: 6,
      question: "`CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END` (age 17) nima beradi?",
      options: ["Katta", "Kichik", "17", "Xatolik"],
      correctAnswer: 1,
      explanation: "17 >= 18 yolg'on. ELSE ishlaydi."
    },
    {
      id: 7,
      question: "Bir nechta WHEN yozsa bo'ladimi?",
      options: ["Yo'q", "Ha, ketma-ket yoziladi", "Faqat ikkita", "Hech qachon"],
      correctAnswer: 1,
      explanation: "Birinchi rost topilishi bilan to'xtaydi."
    },
    {
      id: 8,
      question: "NULLIF nimani qiladi?",
      options: ["Hammasini o'chiradi", "Mos kelganni bo'sh qiladi", "Qo'shadi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "Qiymat teng bo'lsa, o'rniga bo'sh qo'yiladi."
    },
    {
      id: 9,
      question: "`THEN 'Katta'` o'rniga `= 'Katta'` yozilsa nima bo'ladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh qaytaradi", "Ogohlantirish beradi"],
      correctAnswer: 1,
      explanation: "Shartdan keyin THEN keladi."
    },
    {
      id: 10,
      question: "`SELECT *, CASE WHEN age >= 18 THEN 'Katta' ELSE 'Kichik' END AS holat FROM users;` nechta ustun qaytaradi?",
      options: ["Faqat holat", "Hammasi + holat", "Faqat age", "Xatolik"],
      correctAnswer: 1,
      explanation: "* hammasi, CASE esa yangi ustun qo'shadi."
    },
    {
      id: 11,
      question: "CASE qayerda ishlatiladi?",
      options: ["Faqat WHERE da", "SELECT ro'yxatida (ustun o'rnida)", "Faqat FROM da", "Hech qayerda"],
      correctAnswer: 1,
      explanation: "CASE qiymat qaytaradi. Ustun o'rnida turadi."
    },
    {
      id: 12,
      question: "`COALESCE(city, 'Nomalum')` (shahar bo'sh bo'lsa) nima beradi?",
      options: ["Bo'sh", "Nomalum", "Xatolik", "0"],
      correctAnswer: 1,
      explanation: "Bo'sh o'rniga zaxira qiymat qo'yiladi."
    }
  ]
};
