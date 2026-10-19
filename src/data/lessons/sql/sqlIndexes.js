export const sqlIndexes = {
  id: "sqlIndexes",
  title: "Qidiruv Tezligi (INDEX)",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT, city STRING); INSERT INTO users VALUES (1,'Ali',25,'Toshkent'),(2,'Vali',17,'Samarqand'),(3,'Guli',30,'Toshkent'),(4,'Hasan',22,'Buxoro');",
  theory: `## 1. Bu nima?

Tasavvur qiling, qalin kitob bor. Oxirgi sahifada alfavit ko'rsatkichi bor: qaysi so'z qaysi sahifada. Ko'rsatkichsiz butun kitob varaqlanadi. Ko'rsatkich bilan darhol topiladi.

Dasturlashda indeks (index) xuddi shu kitob oxiridagi ko'rsatkich. Ustun uchun alohida tez qidiruv yo'li yaratiladi.

INDEX — ustun bo'yicha qidiruvni tezlashtiradigan yordamchi tuzilmadir.

---

## 2. Nega kerak?

users jadvalida million qator bor. \`WHERE city = 'Toshkent'\` so'rovi hamma qatorni bittalab tekshiradi. Sekin.

Muammo shunda: katta jadvallarda qidiruv sekinlashadi. Yechim — indeks:

\`\`\`sql
CREATE INDEX idx_city ON users(city);
\`\`\`

Endi baza shahar bo'yicha tayyor ro'yxatdan qidiradi. Tez topiladi.

---

## 3. Birinchi misol

Bu kod shahar ustuniga indeks yaratadi.

\`\`\`sql
CREATE INDEX idx_city ON users(city); -- Tez qidiruv yo'li
SELECT name FROM users WHERE city = 'Toshkent'; -- Indeks ishlaydi
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali"},{"name":"Guli"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`CREATE INDEX idx_city ON users(city);\` — indeks yaratildi. Nomi \`idx_city\`. Qaysi jadval, qaysi ustun — qavsda aytiladi.
- \`SELECT ... WHERE city = 'Toshkent';\` — oddiy so'rov. Baza endi indeksdan foydalanadi.
- Natija o'zgarmaydi. Faqat tezlik oshadi.

---

## 5. Yana bitta misol

Bu kod takrorlanmas ustunga noyob indeks yaratadi.

\`\`\`sql
CREATE UNIQUE INDEX idx_name ON users(name); -- Takror taqiqlanadi
SELECT name FROM users WHERE name = 'Ali'; -- Tez topiladi
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali"}]
\`\`\`

Qator-baqator tahlil:
- \`UNIQUE INDEX\` — ikki ish qiladi: tezlashtiradi VA takrorlanishni taqiqlaydi.
- Ikkinchi "Ali" yozib bo'lmaydi. Baza rad etadi.

---

## 5.1. Indeksni o'chirish

Keraksiz indeks o'chiriladi:

\`\`\`sql
DROP INDEX idx_city; -- O'chirildi
\`\`\`

\`\`\`text
// Natija: 1
\`\`\`

Qator-baqator tahlil:
- \`DROP INDEX\` — yordamchi tuzilma o'chiriladi. Asosiy jadvalga tegmaydi.
- Natija \`1\` — buyruq bajarildi degani.

---

## 6. Ko'p uchraydigan xatolar

### 1. ON ni unutish
❌ Xato kod:
\`\`\`sql
CREATE INDEX idx_city users(city);
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Qaysi jadval ekanini \`ON\` aytadi. Tushib qolmasligi kerak.
✅ To'g'ri variant:
\`\`\`sql
CREATE INDEX idx_city ON users(city);
\`\`\`

### 2. Takror yozishga urinish
❌ Xato kod:
\`\`\`sql
CREATE UNIQUE INDEX idx_name ON users(name);
INSERT INTO users VALUES (5, 'Ali', 40, 'Xiva');
\`\`\`
Nima bo'ladi: xatolik yuz beradi (bunday yozuv noyob indeksda allaqachon bor). \`UNIQUE\` nafaqat tezlashtiradi — takrorni ham taqiqlaydi.
✅ To'g'ri variant:
\`\`\`sql
CREATE UNIQUE INDEX idx_name ON users(name);
INSERT INTO users VALUES (5, 'Otabek', 40, 'Xiva');
\`\`\`

### 3. Har ustunga indeks
❌ Xato tushuncha: tez bo'lishi uchun hamma ustunga indeks qo'yish kerak deb o'ylash.
Nima bo'ladi: xato bermaydi. Lekin yozish (INSERT/UPDATE) sekinlashadi! Sababi: har yozishda indeks ham yangilanadi. Indeks faqat ko'p qidiriladigan ustunlarga qo'yiladi.
✅ To'g'ri tushuncha: qidiruv ko'p bo'lgan ustunga — indeks. Kam ishlatiladiganga — kerak emas.

---

## 7. Tekshiruv

### 1-mashq (Oson)
\`city\` ustuniga indeks yarating (\`idx_city\`). So'rov bajaring: Toshkentliklar chiqsin (Ali, Guli).

### 2-mashq (O'rtacha)
\`name\` ustuniga noyob indeks yarating. So'rov bajaring: Ali chiqsin.

### 3-mashq (Chegara holat)
Indeksni yarating, keyin o'chiring. Xato bermasligi kerak.

### Javoblar:
1.
\`\`\`sql
CREATE INDEX idx_city ON users(city);
SELECT name FROM users WHERE city = 'Toshkent';
\`\`\`
2.
\`\`\`sql
CREATE UNIQUE INDEX idx_name ON users(name);
SELECT name FROM users WHERE name = 'Ali';
\`\`\`
3.
\`\`\`sql
CREATE INDEX idx_city ON users(city);
DROP INDEX idx_city;
SELECT name FROM users;
\`\`\`

---

## 8. Xulosa

1. INDEX — qidiruvni tezlashtiradi. Natija o'zgarmaydi, tezlik oshadi.
2. \`UNIQUE INDEX\` takrorni taqiqlaydi. \`DROP INDEX\` o'chiradi.
3. Indeks faqat kerakli ustunga qo'yiladi. Ko'pi yozishni sekinlashtiradi.

Keyingi darsda: birgalikda bajariladigan amallar — tranzaksiyalar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Indeks yaratish",
      instruction: "`city` ustuniga `idx_city` indeksini yarating. Toshkentliklarni so'rang (Ali, Guli).",
      startingCode: "CREATE INDEX idx_city ON users(city);",
      hint: "SELECT name FROM users WHERE city = 'Toshkent';",
      solution: "CREATE INDEX idx_city ON users(city); SELECT name FROM users WHERE city = 'Toshkent';",
      test: "if (!/\\bCREATE\\s+(UNIQUE\\s+)?INDEX\\b/i.test(code)) return 'CREATE INDEX yozing';\nconst names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Guli'])) return 'Ali va Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Noyob indeks",
      instruction: "`name` ustuniga noyob indeks yarating. Ali ni so'rang.",
      startingCode: "CREATE UNIQUE INDEX idx_name ON users(name);",
      hint: "SELECT name FROM users WHERE name = 'Ali';",
      solution: "CREATE UNIQUE INDEX idx_name ON users(name); SELECT name FROM users WHERE name = 'Ali';",
      test: "if (!/\\bUNIQUE\\b/i.test(code)) return 'UNIQUE yozing';\nconst names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali'])) return 'Faqat Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: ON qo'shish",
      instruction: "Quyidagi xatoni tuzating: `ON` so'zi tushib qolgan.",
      startingCode: "CREATE INDEX idx_city users(city);",
      hint: "CREATE INDEX idx_city ON users(city);",
      solution: "CREATE INDEX idx_city ON users(city); SELECT name FROM users WHERE city = 'Toshkent';",
      test: "if (!/\\bON\\b/i.test(code)) return 'ON qoshing';\nconst names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Guli'])) return 'Ali va Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: O'chirish",
      instruction: "`idx_city` ni yarating, keyin o'chiring. Xato bermasligi kerak.",
      startingCode: "CREATE INDEX idx_city ON users(city);",
      hint: "DROP INDEX idx_city;",
      solution: "CREATE INDEX idx_city ON users(city); DROP INDEX idx_city; SELECT name FROM users;",
      test: "if (!/\\bDROP\\s+INDEX\\b/i.test(code)) return 'DROP INDEX yozing';\nif (result.length !== 4) return '4 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Yosh indeksi (chegara)",
      instruction: "`age` ustuniga indeks yarating. 20 dan kattalarni so'rang (Ali, Guli, Hasan).",
      startingCode: "CREATE INDEX idx_age ON users(age);",
      hint: "SELECT name FROM users WHERE age > 20;",
      solution: "CREATE INDEX idx_age ON users(age); SELECT name FROM users WHERE age > 20;",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali', 'Guli', 'Hasan'])) return '3 ta ism chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Noyoblik tekshiruvi",
      instruction: "`name` ga noyob indeks yarating. Yangi ism yozing (5, 'Otabek', 40, 'Xiva'). Otabek chiqishi kerak.",
      startingCode: "CREATE UNIQUE INDEX idx_name ON users(name);",
      hint: "INSERT INTO users VALUES (5, 'Otabek', 40, 'Xiva');\nSELECT name FROM users WHERE name = 'Otabek';",
      solution: "CREATE UNIQUE INDEX idx_name ON users(name); INSERT INTO users VALUES (5, 'Otabek', 40, 'Xiva'); SELECT name FROM users WHERE name = 'Otabek';",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Otabek'])) return 'Otabek chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Samarqand (chegara)",
      instruction: "Indeks bilan Samarqandliklarni so'rang (Vali chiqishi kerak).",
      startingCode: "CREATE INDEX idx_city ON users(city);",
      hint: "SELECT name FROM users WHERE city = 'Samarqand';",
      solution: "CREATE INDEX idx_city ON users(city); SELECT name FROM users WHERE city = 'Samarqand';",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Vali'])) return 'Faqat Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Buxoro (chegara)",
      instruction: "Indeks bilan Buxoroliklarni so'rang (Hasan chiqishi kerak).",
      startingCode: "CREATE INDEX idx_city ON users(city);",
      hint: "SELECT name FROM users WHERE city = 'Buxoro';",
      solution: "CREATE INDEX idx_city ON users(city); SELECT name FROM users WHERE city = 'Buxoro';",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Hasan'])) return 'Faqat Hasan chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Ikkita indeks (chegara)",
      instruction: "`city` va `age` ga alohida indekslar yarating. Keyin hammasini o'qing (4 qator chiqishi kerak).",
      startingCode: "CREATE INDEX idx_city ON users(city);",
      hint: "CREATE INDEX idx_age ON users(age);\nSELECT * FROM users;",
      solution: "CREATE INDEX idx_city ON users(city); CREATE INDEX idx_age ON users(age); SELECT * FROM users;",
      test: "if (result.length !== 4) return '4 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq sikl (chegara)",
      instruction: "Indeks yarating, so'rang (Ali, Guli), o'chiring. Xato bermasligi kerak.",
      startingCode: "CREATE INDEX idx_city ON users(city);",
      hint: "SELECT name FROM users WHERE city = 'Toshkent';\nDROP INDEX idx_city;",
      solution: "CREATE INDEX idx_city ON users(city); SELECT name FROM users WHERE city = 'Toshkent'; DROP INDEX idx_city;",
      test: "if (!/\\bDROP\\s+INDEX\\b/i.test(code)) return 'DROP INDEX yozing';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "INDEX nima qiladi?",
      options: ["Ma'lumot qo'shadi", "Qidiruvni tezlashtiradi", "Jadval o'chiradi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "Indeks natijani o'zgartirmaydi. Faqat tezlik oshadi."
    },
    {
      id: 2,
      question: "`CREATE INDEX idx_city ON users(city);` da `idx_city` nima?",
      options: ["Jadval nomi", "Indeks nomi", "Ustun nomi", "Baza nomi"],
      correctAnswer: 1,
      explanation: "Har indeksning o'z nomi bo'ladi."
    },
    {
      id: 3,
      question: "`CREATE INDEX idx_city users(city);` (ON siz) nima qiladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh yaratadi", "Ogohlantirish beradi"],
      correctAnswer: 1,
      explanation: "Qaysi jadval ekanini ON aytadi."
    },
    {
      id: 4,
      question: "UNIQUE INDEX nimani taqiqlaydi?",
      options: ["O'qishni", "Takrorlanishni", "O'chirishni", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Bir xil qiymat ikki marta yozilmaydi."
    },
    {
      id: 5,
      question: "`DROP INDEX idx_city;` nimani o'chiradi?",
      options: ["Jadvalni", "Indeksni (jadval qoladi)", "Bazani", "Hammasini"],
      correctAnswer: 1,
      explanation: "Faqat yordamchi tuzilma ketadi."
    },
    {
      id: 6,
      question: "Noyob indeks bor ustunga takror yozilsa nima bo'ladi?",
      options: ["Yoziladi", "Rad etiladi (xatolik)", "Almashtiriladi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "UNIQUE buzilsa, baza yozuvni qabul qilmaydi."
    },
    {
      id: 7,
      question: "Hamma ustunga indeks qo'ysa nima bo'ladi?",
      options: ["Juda tezlashadi", "Yozish sekinlashadi", "Hech narsa o'zgarmaydi", "Xatolik beradi"],
      correctAnswer: 1,
      explanation: "Har yozishda indeks ham yangilanadi."
    },
    {
      id: 8,
      question: "Indeks qachon kerak?",
      options: ["Har doim", "Ko'p qidiriladigan ustunga", "Hech qachon", "Faqat kichik jadvalga"],
      correctAnswer: 1,
      explanation: "Qidiruv ko'p bo'lgan joyga qo'yiladi."
    },
    {
      id: 9,
      question: "`SELECT name FROM users WHERE city = 'Toshkent';` (Ali, Guli) indeks bilan ham xuddi shunday chiqadimi?",
      options: ["Yo'q, boshqacha", "Ha, bir xil", "Xatolik beradi", "Bo'sh chiqadi"],
      correctAnswer: 1,
      explanation: "Indeks natijani o'zgartirmaydi."
    },
    {
      id: 10,
      question: "`CREATE UNIQUE INDEX idx_name ON users(name);` dan keyin ikkinchi 'Ali' yozilsa nima bo'ladi?",
      options: ["Yoziladi", "Rad etiladi", "Almashtiriladi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Noyoblik buzilsa, baza qabul qilmaydi."
    },
    {
      id: 11,
      question: "Kitob oxiridagi ko'rsatkich nimaga o'xshaydi?",
      options: ["Jadvalga", "Indeksga", "So'rovga", "Xatolikka"],
      correctAnswer: 1,
      explanation: "Ikkalasi ham tez topish uchun."
    },
    {
      id: 12,
      question: "`DROP INDEX` dan keyin so'rovlar ishlaydimi?",
      options: ["Yo'q, to'xtaydi", "Ha, faqat sekinroq", "Xatolik beradi", "Jadval yo'qoladi"],
      correctAnswer: 1,
      explanation: "Indeks yordamchi. Yo'qolsa ham so'rov ishlaydi."
    }
  ]
};
