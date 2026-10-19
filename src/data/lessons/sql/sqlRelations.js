export const sqlRelations = {
  id: "sqlRelations",
  title: "Jadvallar Aloqasi (Relationships)",
  language: "sql",
  dbSetup: "CREATE TABLE mualliflar (id INT PRIMARY KEY, ism VARCHAR(50)); INSERT INTO mualliflar VALUES (1,'Ali'),(2,'Vali'); CREATE TABLE kitoblar (id INT PRIMARY KEY, nom STRING, muallif_id INT REFERENCES mualliflar(id)); INSERT INTO kitoblar VALUES (1,'Alifbo',1),(2,'Hisob',1),(3,'Tabiat',2);",
  theory: `## 1. Bu nima?

Tasavvur qiling, maktabda o'quvchilar va sinflar bor. Har o'quvchi bitta sinfda o'qiydi. Bir sinfda ko'p o'quvchi bor. Bog'lanish bir tomonlama emas — har ikki ro'yxat bir-birini ko'rsatadi.

Dasturlashda aloqa (relationship) xuddi shu bog'lanish. Jadvallar umumiy ustun orqali bog'lanadi. Uch xil aloqa bor.

Aloqa turlari: birga-bir, birga-ko'p, ko'pga-ko'p. Eng ko'p uchraydigani — birga-ko'p (bitta muallifning ko'p kitobi).

---

## 2. Nega kerak?

Mualliflar va kitoblar bor. Savol: "Har bir kitobning muallifi kim?" Kitob jadvalida faqat raqam turibdi:

\`\`\`sql
SELECT * FROM kitoblar;
\`\`\`

Raqamdan ism chiqmaydi.

Muammo shunda: jadvallar uzilgan. Yechim — aloqa ustuni (\`muallif_id\`) va JOIN:

\`\`\`sql
SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;
\`\`\`

Endi har kitob yonida muallifi turibdi.

---

## 3. Birinchi misol

Bu kod kitoblarni mualliflari bilan chiqaradi.

\`\`\`sql
SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;
\`\`\`

\`\`\`text
// Natija:
[{"nom":"Alifbo","ism":"Ali"},{"nom":"Hisob","ism":"Ali"},{"nom":"Tabiat","ism":"Vali"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`kitoblar.muallif_id\` — aloqa ustuni. Har kitobda muallif raqami bor.
- \`ON ... = mualliflar.id\` — raqamlar teng bo'lgan qatorlar ulanadi.
- Ali ikki marta chiqdi. Uning ikkita kitobi bor (birga-ko'p aloqa).

---

## 5. Yana bitta misol

Bu kod mavjud bo'lmagan muallifga yozishga urinishni ko'rsatadi.

\`\`\`sql
INSERT INTO kitoblar VALUES (4, 'Fizika', 99);
\`\`\`

\`\`\`text
// Natija: xatolik (bunday muallif yo'q)
\`\`\`

Qator-baqator tahlil:
- \`muallif_id\` ustunida tashqi kalit (foreign key) qoidasi bor.
- 99 raqamli muallif yo'q. Baza yozuvni rad etadi.
- Aloqa faqat qog'ozda emas — baza uni qo'riqlaydi.

---

## 5.1. Aloqa turlari

Uchta asosiy aloqa bor:

- **Birga-ko'p** — bitta muallif, ko'p kitob. Eng ko'p uchraydi.
- **Birga-bir** — bitta odam, bitta pasport. Kam uchraydi.
- **Ko'pga-ko'p** — o'quvchilar va fanlar. Oraliq jadval kerak bo'ladi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Aloqa ustunini unutish
❌ Xato tushuncha:
\`\`\`sql
CREATE TABLE kitoblar (id INT PRIMARY KEY, nom STRING);
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin kitob muallifsiz qoladi. Keyin ulab bo'lmaydi. Aloqa ustuni boshidan bo'lishi kerak.
✅ To'g'ri variant:
\`\`\`sql
CREATE TABLE kitoblar (id INT PRIMARY KEY, nom STRING, muallif_id INT REFERENCES mualliflar(id));
\`\`\`

### 2. Yo'q raqamga yozish
❌ Xato kod:
\`\`\`sql
INSERT INTO kitoblar VALUES (4, 'Fizika', 99);
\`\`\`
Nima bo'ladi: xatolik yuz beradi (bunday muallif topilmadi). Tashqi kalit begona raqamni kiritmaydi.
✅ To'g'ri variant:
\`\`\`sql
INSERT INTO kitoblar VALUES (4, 'Fizika', 1);
\`\`\`

### 3. Noto'g'ri ustun bilan ulash
❌ Xato kod:
\`\`\`sql
SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.id = mualliflar.id;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin javob noto'g'ri: kitob raqami muallif raqamiga teng bo'lganlar chiqadi. Ulanish har doim aloqa ustuni orqali bo'ladi.
✅ To'g'ri variant:
\`\`\`sql
SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Kitoblarni mualliflari bilan chiqaring (INNER JOIN). 3 qator chiqishi kerak.

### 2-mashq (O'rtacha)
Mavjud muallifga yangi kitob yozing (4, 'Kimyo', 2). Valida ikkita kitob bo'lishi kerak.

### 3-mashq (Chegara holat)
Ali kitoblarini sanang (JOIN + COUNT). Natija 2 bo'lishi kerak.

### Javoblar:
1.
\`\`\`sql
SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;
\`\`\`
2.
\`\`\`sql
INSERT INTO kitoblar VALUES (4, 'Kimyo', 2);
SELECT * FROM kitoblar WHERE muallif_id = 2;
\`\`\`
3.
\`\`\`sql
SELECT COUNT(*) AS soni FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id WHERE mualliflar.ism = 'Ali';
\`\`\`

---

## 8. Xulosa

1. Aloqa — jadvallar bog'lanishi. Birga-ko'p eng ko'p uchraydi.
2. Aloqa ustuni (tashqi kalit) boshidan bo'ladi. U begona raqamni kiritmaydi.
3. Ulanish har doim aloqa ustuni orqali bo'ladi.

Keyingi darsda: to'g'ri loyihalash qoidalari (normalizatsiya) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Kitob + muallif",
      instruction: "mualliflar (id, ism) va kitoblar (id, nom, muallif_id) ni ulang. 3 qator chiqishi kerak.",
      startingCode: "SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Yangi kitob",
      instruction: "Mavjud muallifga yangi kitob yozing (4, 'Kimyo', 2). Valida ikkita kitob bo'lishi kerak.",
      startingCode: "INSERT INTO kitoblar VALUES (4, 'Kimyo', 2);",
      hint: "SELECT * FROM kitoblar WHERE muallif_id = 2;",
      solution: "INSERT INTO kitoblar VALUES (4, 'Kimyo', 2); SELECT * FROM kitoblar WHERE muallif_id = 2;",
      test: "if (result.length !== 2) return '2 kitob chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Ali kitoblari",
      instruction: "Ali kitoblarini sanang (JOIN + COUNT). Natija 2 bo'lishi kerak.",
      startingCode: "SELECT COUNT(*) AS soni FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id WHERE mualliflar.ism = 'Ali';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT COUNT(*) AS soni FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id WHERE mualliflar.ism = 'Ali';",
      test: "if (result[0].soni !== 2) return 'Natija 2 bolishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Yangi kitob",
      instruction: "Valiga yangi kitob yozing (4, 'Kimyo', 2). Keyin Valini toping.",
      startingCode: "INSERT INTO kitoblar VALUES (4, 'Kimyo', 2);",
      hint: "SELECT * FROM kitoblar WHERE muallif_id = 2;",
      solution: "INSERT INTO kitoblar VALUES (4, 'Kimyo', 2); SELECT * FROM kitoblar WHERE muallif_id = 2;",
      test: "const rows = result.filter(r => r.nom === 'Kimyo');\nif (rows.length !== 1) return 'Kimyo qatori chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Noto'g'ri ulash",
      instruction: "`ON kitoblar.id = mualliflar.id` xato ulangan. To'g'rilang (muallif_id bo'lishi kerak).",
      startingCode: "SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.id = mualliflar.id;",
      hint: "ON kitoblar.muallif_id = mualliflar.id",
      solution: "SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;",
      test: "if (!/muallif_id/i.test(code)) return 'muallif_id bilan ulang';\nif (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Vali kitoblari (chegara)",
      instruction: "Vali kitoblarini chiqaring (Tabiat chiqishi kerak).",
      startingCode: "SELECT kitoblar.nom FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id WHERE mualliflar.ism = 'Vali';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT kitoblar.nom FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id WHERE mualliflar.ism = 'Vali';",
      test: "const names = result.map(r => r.nom);\nif (JSON.stringify(names) !== JSON.stringify(['Tabiat'])) return 'Faqat Tabiat chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Kitobsiz muallif (chegara)",
      instruction: "Yangi muallif qo'shing (3, 'Guli'). LEFT JOIN bilan hamma muallifni chiqaring (3 qator).",
      startingCode: "INSERT INTO mualliflar VALUES (3, 'Guli');",
      hint: "SELECT mualliflar.ism, kitoblar.nom FROM mualliflar LEFT JOIN kitoblar ON kitoblar.muallif_id = mualliflar.id;",
      solution: "INSERT INTO mualliflar VALUES (3, 'Guli'); SELECT mualliflar.ism, kitoblar.nom FROM mualliflar LEFT JOIN kitoblar ON kitoblar.muallif_id = mualliflar.id;",
      test: "if (result.length !== 4) return '4 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Jami kitob (chegara)",
      instruction: "Hamma kitobni sanang (COUNT). Natija 3 bo'lishi kerak.",
      startingCode: "SELECT COUNT(*) AS soni FROM kitoblar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT COUNT(*) AS soni FROM kitoblar;",
      test: "if (result[0].soni !== 3) return 'Natija 3 bolishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Alifbo muallifi (chegara)",
      instruction: "'Alifbo' kitob muallifini toping (Ali chiqishi kerak).",
      startingCode: "SELECT mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id WHERE kitoblar.nom = 'Alifbo';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id WHERE kitoblar.nom = 'Alifbo';",
      test: "if (result[0].ism !== 'Ali') return 'Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq ro'yxat (chegara)",
      instruction: "Barcha kitoblarni muallifi bilan chiqaring (nom + ism). 3 qator chiqishi kerak.",
      startingCode: "SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT kitoblar.nom, mualliflar.ism FROM kitoblar INNER JOIN mualliflar ON kitoblar.muallif_id = mualliflar.id;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Aloqa ustuni nima qiladi?",
      options: ["Tezlashtiradi", "Jadvallarni bog'laydi", "O'chiradi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "Umumiy raqam orqali qatorlar ulanadi."
    },
    {
      id: 2,
      question: "Eng ko'p uchraydigan aloqa qaysi?",
      options: ["Birga-bir", "Birga-ko'p", "Ko'pga-ko'p", "Hech biri"],
      correctAnswer: 1,
      explanation: "Bitta muallifning ko'p kitobi bo'ladi."
    },
    {
      id: 3,
      question: "Mavjud bo'lmagan muallifga yozilsa nima bo'ladi?",
      options: ["Yoziladi", "Xatolik beradi", "Bo'sh qoladi", "O'chiriladi"],
      correctAnswer: 1,
      explanation: "Tashqi kalit begona raqamni kiritmaydi."
    },
    {
      id: 4,
      question: "`ON kitoblar.id = mualliflar.id` yozilsa nima bo'ladi?",
      options: ["To'g'ri ishlaydi", "Noto'g'ri juftlar chiqadi", "Xatolik beradi", "Bo'sh chiqadi"],
      correctAnswer: 1,
      explanation: "Ulanish har doim aloqa ustuni orqali bo'ladi."
    },
    {
      id: 5,
      question: "Tashqi kalit (foreign key) nima?",
      options: ["Asosiy kalit", "Boshqa jadvalga ishora qiluvchi ustun", "Indeks", "Ko'rinish"],
      correctAnswer: 1,
      explanation: "muallif_id mualliflar.id ga ishora qiladi."
    },
    {
      id: 6,
      question: "Vali kitoblari nechta? (Tabiat)",
      options: ["0 ta", "1 ta", "2 ta", "3 ta"],
      correctAnswer: 1,
      explanation: "Valining bitta kitobi bor: Tabiat."
    },
    {
      id: 7,
      question: "Kitobsiz muallif LEFT JOIN da chiqadimi?",
      options: ["Yo'q", "Ha, kitobi bo'sh chiqadi", "Xatolik beradi", "O'chiriladi"],
      correctAnswer: 1,
      explanation: "LEFT chap tomonni saqlaydi."
    },
    {
      id: 8,
      question: "Ko'pga-ko'p aloqada nima kerak?",
      options: ["Hech narsa", "Oraliq jadval", "Faqat indeks", "Faqat ko'rinish"],
      correctAnswer: 1,
      explanation: "O'quvchilar va fanlar oraliq jadval orqali bog'lanadi."
    },
    {
      id: 9,
      question: "'Alifbo' kitob muallifi kim?",
      options: ["Vali", "Ali", "Guli", "Hech kim"],
      correctAnswer: 1,
      explanation: "Alifbo muallif_id 1 ga tegishli — Ali."
    },
    {
      id: 10,
      question: "Aloqa ustuni qachon belgilanadi?",
      options: ["So'rovda", "Jadval yaratishda", "Hech qachon", "O'chirishda"],
      correctAnswer: 1,
      explanation: "REFERENCES qoidasi boshidan yoziladi."
    },
    {
      id: 11,
      question: "Birga-bir aloqaga misol qaysi?",
      options: ["Muallif-kitoblar", "Odam-pasport", "O'quvchi-fanlar", "Shahar-aholi"],
      correctAnswer: 1,
      explanation: "Bitta odamda bitta pasport bo'ladi."
    },
    {
      id: 12,
      question: "Ali kitoblari nechta?",
      options: ["1 ta", "2 ta", "3 ta", "0 ta"],
      correctAnswer: 1,
      explanation: "Alifbo va Hisob — ikkita kitob."
    }
  ]
};
