export const sqlConstraints = {
  id: "sqlConstraints",
  title: "Qoidalar (Constraints)",
  language: "sql",
  dbSetup: "CREATE TABLE talabalar (id INT PRIMARY KEY, ism VARCHAR(50) NOT NULL, email STRING UNIQUE, yosh INT DEFAULT 18); INSERT INTO talabalar VALUES (1,'Ali','ali@x.uz',20);",
  theory: `## 1. Bu nima?

Tasavvur qiling, klubga a'zolik qoidalari bor: har bir a'zoda raqam bo'lishi shart, raqamlar takrorlanmasligi kerak, yosh ko'rsatilmasa 18 deb olinadi. Qoidasiz ro'yxat chalkashib ketadi.

Dasturlashda cheklov (constraint) xuddi shu klub qoidalari. Jadvalga nima yozilishi mumkinligini belgilaydi.

Cheklov — ustunga yoziladigan qiymatga qo'yilgan qoidadir. Asosiylari: \`PRIMARY KEY\` (takrorlanmas ID), \`NOT NULL\` (bo'sh bo'lmasligi), \`UNIQUE\` (takrorlanmasligi), \`DEFAULT\` (standart qiymat).

---

## 2. Nega kerak?

Talabalar ro'yxati bor. Ikkita muammo chiqdi: bitta raqam ikki kishiga berildi, bitta ism bo'sh qoldi. Qaysi yozuv to'g'ri? Bilinmaydi.

Muammo shunda: yaroqsiz ma'lumot kirib qolmoqda. Yechim — cheklovlar:

\`\`\`sql
CREATE TABLE talabalar (id INT PRIMARY KEY, ism VARCHAR(50) NOT NULL);
\`\`\`

Endi baza o'zi qo'riqlaydi. Takror kirsa — rad etadi. Bo'sh kirsa — rad etadi.

---

## 3. Birinchi misol

Bu kod qoidali jadval yaratadi va to'g'ri qator yozadi.

\`\`\`sql
CREATE TABLE talabalar (id INT PRIMARY KEY, ism VARCHAR(50) NOT NULL); -- Qoidali jadval
INSERT INTO talabalar VALUES (1, 'Ali'); -- To'g'ri qator
SELECT * FROM talabalar; -- O'qildi
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"ism":"Ali"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`id INT PRIMARY KEY\` — asosiy kalit. Takrorlanmaydi. Har qatorning pasporti.
- \`ism VARCHAR(50) NOT NULL\` — bo'sh bo'lishi mumkin emas. Har doim qiymat bo'ladi.
- Qator yozildi. Qoidalar buzilmadi. Baza qabul qildi.

---

## 5. Yana bitta misol

Bu kod takror ID yozishga urinishni ko'rsatadi.

\`\`\`sql
INSERT INTO talabalar VALUES (1, 'Vali'); -- Xato: 1 band!
\`\`\`

\`\`\`text
// Natija: xatolik (bunday yozuv asosiy kalitda allaqachon bor)
\`\`\`

Qator-baqator tahlil:
- \`id\` 1 allaqachon band. Ikkinchi marta yozib bo'lmaydi.
- Baza rad etadi. Ma'lumot buzilmaydi.

---

## 5.1. Standart qiymat

Qiymat berilmasa, tayyor qiymat qo'yiladi:

\`\`\`sql
CREATE TABLE mehmonlar (id INT, yosh INT DEFAULT 18); -- Standart: 18
INSERT INTO mehmonlar (id) VALUES (1); -- Yosh berilmadi
SELECT * FROM mehmonlar; -- 18 chiqadi
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"yosh":18}]
\`\`\`

Qator-baqator tahlil:
- \`DEFAULT 18\` — berilmasa, shu qiymat qo'yiladi.
- Faqat \`id\` berildi. \`yosh\` avtomatik 18 bo'ldi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Takror ID yozish
❌ Xato kod:
\`\`\`sql
INSERT INTO talabalar VALUES (1, 'Vali');
\`\`\`
Nima bo'ladi: xatolik yuz beradi (bunday yozuv asosiy kalitda allaqachon bor). Asosiy kalit yagona bo'lishi shart.
✅ To'g'ri variant:
\`\`\`sql
INSERT INTO talabalar VALUES (2, 'Vali');
\`\`\`

### 2. Bo'sh ism yozish
❌ Xato tushuncha:
\`\`\`sql
INSERT INTO talabalar (id) VALUES (3);
\`\`\`
Nima bo'ladi: xatolik yuz beradi (\`ism\` ustuni bo'sh bo'lmasligi kerak). \`NOT NULL\` shuni taqiqlaydi.
✅ To'g'ri variant:
\`\`\`sql
INSERT INTO talabalar VALUES (3, 'Guli');
\`\`\`

### 3. Cheklovsiz jadval
❌ Xato tushuncha: cheklovsiz ham bo'laveradi deb o'ylash.
Nima bo'ladi: xato bermaydi. Lekin keyin takror va bo'sh qiymatlar to'lib ketadi. Tozalash qiyin bo'ladi.
✅ To'g'ri tushuncha: jadval yaratishda darhol qoidalar yoziladi. Keyin kech bo'ladi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`talabalar\` ga yangi qator yozing (\`2, 'Vali', 'vali@x.uz', 19\`). O'qing (2 qator chiqishi kerak).

### 2-mashq (O'rtacha)
Yangi email bilan qator yozing (\`5, 'Otabek', 'otabek@x.uz', 22\`). O'qing (Otabek chiqishi kerak).

### 3-mashq (Chegara holat)
Yosh bermasdan qator yozing (\`3, 'Guli', 'guli@x.uz'\`). Standart 18 qo'yilishini tasdiqlang.

### Javoblar:
1.
\`\`\`sql
INSERT INTO talabalar VALUES (2, 'Vali', 'vali@x.uz', 19);
SELECT * FROM talabalar;
\`\`\`
2.
\`\`\`sql
INSERT INTO talabalar VALUES (5, 'Otabek', 'otabek@x.uz', 22);
SELECT * FROM talabalar;
\`\`\`
3.
\`\`\`sql
INSERT INTO talabalar (id, ism, email) VALUES (3, 'Guli', 'guli@x.uz');
SELECT * FROM talabalar;
\`\`\`

---

## 8. Xulosa

1. Cheklovlar yaroqsiz ma'lumotni kirgizmaydi: \`PRIMARY KEY\`, \`NOT NULL\`, \`UNIQUE\`, \`DEFAULT\`.
2. Takror ID va bo'sh majburiy ustun — xato beradi.
3. Qoidalar jadval yaratishda yoziladi.

Keyingi darsda: shart bilan filtrlash — \`WHERE\` va mantiqiy operatorlar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Yangi qator",
      instruction: "talabalar jadvaliga (id, ism, email, yosh) yangi qator yozing (2, 'Vali', 'vali@x.uz', 19). O'qing (2 qator).",
      startingCode: "INSERT INTO talabalar VALUES (2, 'Vali', 'vali@x.uz', 19);",
      hint: "SELECT * FROM talabalar;",
      solution: "INSERT INTO talabalar VALUES (2, 'Vali', 'vali@x.uz', 19); SELECT * FROM talabalar;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Yangi ID",
      instruction: "Yangi qator yozing (2, 'Vali', 'vali@x.uz', 19). ID takrorlanmasligi kerak. O'qing (2 qator).",
      startingCode: "INSERT INTO talabalar VALUES (2, 'Vali', 'vali@x.uz', 19);",
      hint: "SELECT * FROM talabalar;",
      solution: "INSERT INTO talabalar VALUES (2, 'Vali', 'vali@x.uz', 19); SELECT * FROM talabalar;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Standart yosh",
      instruction: "Yosh bermasdan qator yozing (3, 'Guli', 'guli@x.uz'). Yosh avtomatik 18 bo'lishi kerak.",
      startingCode: "INSERT INTO talabalar (id, ism, email) VALUES (3, 'Guli', 'guli@x.uz');",
      hint: "SELECT * FROM talabalar;",
      solution: "INSERT INTO talabalar (id, ism, email) VALUES (3, 'Guli', 'guli@x.uz'); SELECT * FROM talabalar;",
      test: "const guli = result.filter(r => r.ism === 'Guli');\nif (guli.length !== 1 || guli[0].yosh !== 18) return 'Guli yoshi 18 bolishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Ismli qator",
      instruction: "Ism bilan qator yozing (4, 'Guli', 'guli@x.uz', 21). O'qing (ism ko'rinishi kerak).",
      startingCode: "INSERT INTO talabalar VALUES (4, 'Guli', 'guli@x.uz', 21);",
      hint: "SELECT * FROM talabalar;",
      solution: "INSERT INTO talabalar VALUES (4, 'Guli', 'guli@x.uz', 21); SELECT * FROM talabalar;",
      test: "const guli = result.filter(r => r.ism === 'Guli');\nif (guli.length !== 1) return 'Guli qatori chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Yangi email",
      instruction: "Yangi email bilan qator yozing (5, 'Otabek', 'otabek@x.uz', 22). O'qing.",
      startingCode: "INSERT INTO talabalar VALUES (5, 'Otabek', 'otabek@x.uz', 22);",
      hint: "SELECT * FROM talabalar;",
      solution: "INSERT INTO talabalar VALUES (5, 'Otabek', 'otabek@x.uz', 22); SELECT * FROM talabalar;",
      test: "const o = result.filter(r => r.ism === 'Otabek');\nif (o.length !== 1) return 'Otabek qatori chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: To'g'ri email (chegara)",
      instruction: "Yangi email bilan qator yozing (5, 'Otabek', 'otabek@x.uz', 22). O'qing.",
      startingCode: "INSERT INTO talabalar VALUES (5, 'Otabek', 'otabek@x.uz', 22);",
      hint: "SELECT * FROM talabalar;",
      solution: "INSERT INTO talabalar VALUES (5, 'Otabek', 'otabek@x.uz', 22); SELECT * FROM talabalar;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Ismlar ro'yxati (chegara)",
      instruction: "Faqat ismlarni o'qing (Ali chiqishi kerak).",
      startingCode: "SELECT ism FROM talabalar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism FROM talabalar;",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Ali'])) return 'Faqat Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Yoshi kattalar (chegara)",
      instruction: "Yoshi 18 dan katta talabalarni sanang (COUNT). Natija 1 bo'lishi kerak.",
      startingCode: "SELECT COUNT(*) AS soni FROM talabalar WHERE yosh > 18;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT COUNT(*) AS soni FROM talabalar WHERE yosh > 18;",
      test: "if (result[0].soni !== 1) return 'Natija 1 bolishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Email qidirish (chegara)",
      instruction: "'ali@x.uz' email egasini toping (Ali chiqishi kerak).",
      startingCode: "SELECT ism FROM talabalar WHERE email = 'ali@x.uz';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism FROM talabalar WHERE email = 'ali@x.uz';",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Ali'])) return 'Faqat Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq sikl (chegara)",
      instruction: "Yangi `guruh` jadvali yarating (id PRIMARY KEY, nom NOT NULL). Qator yozing. O'qing.",
      startingCode: "CREATE TABLE guruh (id INT PRIMARY KEY, nom VARCHAR(50) NOT NULL);",
      hint: "INSERT INTO guruh VALUES (1, 'A');\nSELECT * FROM guruh;",
      solution: "CREATE TABLE guruh (id INT PRIMARY KEY, nom VARCHAR(50) NOT NULL); INSERT INTO guruh VALUES (1, 'A'); SELECT * FROM guruh;",
      test: "if (result.length !== 1 || result[0].nom !== 'A') return 'A qatori chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "PRIMARY KEY nimani bildiradi?",
      options: ["Birinchi ustun", "Takrorlanmas yagona ID", "Matn ustuni", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Har qatorning pasporti. Takrorlanmaydi."
    },
    {
      id: 2,
      question: "NOT NULL nimani bildiradi?",
      options: ["Nol qiymat", "Bo'sh bo'lmasligi shart", "Yangi ustun", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Bu ustunga har doim qiymat yozilishi shart."
    },
    {
      id: 3,
      question: "UNIQUE nimani bildiradi?",
      options: ["Yagona jadval", "Takrorlanmas qiymat", "Yangi nom", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Bir xil qiymat ikki marta yozilmaydi."
    },
    {
      id: 4,
      question: "DEFAULT nimani bildiradi?",
      options: ["O'chirish", "Berilmasa qo'yiladigan standart qiymat", "Yangi jadval", "Xatolik"],
      correctAnswer: 1,
      explanation: "Qiymat berilmasa, shu qo'yiladi."
    },
    {
      id: 5,
      question: "Takror ID yozilsa nima bo'ladi?",
      options: ["Yoziladi", "Xatolik beradi", "Almashtiriladi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Asosiy kalit yagona bo'lishi shart."
    },
    {
      id: 6,
      question: "NOT NULL ustunga qiymat berilmasa nima bo'ladi?",
      options: ["NULL yoziladi", "Xatolik beradi", "0 yoziladi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Bo'sh qoldirish taqiqlangan."
    },
    {
      id: 7,
      question: "`yosh INT DEFAULT 18` da yosh berilmasa nima bo'ladi?",
      options: ["Xatolik beradi", "18 qo'yiladi", "0 qo'yiladi", "NULL qo'yiladi"],
      correctAnswer: 1,
      explanation: "Standart qiymat avtomatik qo'yiladi."
    },
    {
      id: 8,
      question: "Cheklovlar qachon yoziladi?",
      options: ["Har so'rovda", "Jadval yaratishda", "Hech qachon", "O'chirishda"],
      correctAnswer: 1,
      explanation: "Qoidalar boshidan belgilanadi."
    },
    {
      id: 9,
      question: "Qaysi biri cheklov emas?",
      options: ["PRIMARY KEY", "SELECT", "UNIQUE", "NOT NULL"],
      correctAnswer: 1,
      explanation: "SELECT — so'rov buyrug'i, qoida emas."
    },
    {
      id: 10,
      question: "Mavjud email takrorlansa nima bo'ladi?",
      options: ["Yoziladi", "Xatolik beradi", "Eskisi o'chadi", "Ikkalasi qoladi"],
      correctAnswer: 1,
      explanation: "UNIQUE buzilsa, baza rad etadi."
    },
    {
      id: 11,
      question: "Cheklovsiz jadvalda nima bo'ladi?",
      options: ["Hech narsa bo'lmaydi", "Takror va bo'sh qiymatlar to'lib ketadi", "Tezroq ishlaydi", "Xavfsiz bo'ladi"],
      correctAnswer: 1,
      explanation: "Qoidasiz ro'yxat chalkashadi."
    },
    {
      id: 12,
      question: "`ism VARCHAR(50) NOT NULL` nimani anglatadi?",
      options: ["Ism ixtiyoriy", "Ism matn va shart", "Ism son", "Ism jadval"],
      correctAnswer: 1,
      explanation: "Matn ustuni, bo'sh bo'lmasligi shart."
    }
  ]
};
