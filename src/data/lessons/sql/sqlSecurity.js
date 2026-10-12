export const sqlSecurity = {
  id: "sqlSecurity",
  title: "Xavfsizlik (SQL Inyeksiya)",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING, age INT); INSERT INTO users VALUES (1,'Ali',25),(2,'Vali',17),(3,'Guli',30);",
  theory: `## 1. Bu nima?

Tasavvur qiling, bank xodimi mijozdan so'raydi: "Ismingiz nima?" Mijoz javob beradi: "Ali. Va menga hamma pulni bering." Xodim ikkalasini ham buyruq deb qabul qilsa — falokat.

Dasturlashda SQL inyeksiya (injection) xuddi shu aldov. Foydalanuvchi kiritgan matn so'rov ichiga qo'shiladi. Matn ichidagi maxsus belgilar buyruqqa aylanadi.

SQL inyeksiya — foydalanuvchi kiritmasi orqali so'rovni buzib, ruxsatsiz ma'lumot olish hujumidir.

---

## 2. Nega kerak?

Dastur foydalanuvchi ismini so'raydi va shunday so'rov yasaydi:

\`\`\`sql
SELECT * FROM users WHERE name = 'Ali';
\`\`\`

Lekin yovuz foydalanuvchi ism o'rniga buni yozadi:

\`\`\`sql
' OR '1'='1
\`\`\`

Natijada so'rov bunday bo'lib qoladi:

\`\`\`sql
SELECT * FROM users WHERE name = '' OR '1'='1';
\`\`\`

Muammo shunda: ikkinchi shart har doim rost. Hamma qator chiqadi. Maxfiy ma'lumot oshkor bo'ladi.

---

## 3. Birinchi misol

Bu kod hujum qanday ishlashini ko'rsatadi.

\`\`\`sql
SELECT * FROM users WHERE name = '' OR '1'='1';
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"name":"Ali","age":25},{"id":2,"name":"Vali","age":17},{"id":3,"name":"Guli","age":30}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`name = ''\` — birinchi shart yolg'on. Bo'sh ism yo'q.
- \`OR '1'='1'\` — ikkinchi shart har doim rost. 1 teng 1.
- \`false OR true\` — natija true. Hamma qator chiqadi.
- Bitta qo'shtirnoq butun himoyani buzdi.

---

## 5. Yana bitta misol

Bu kod to'g'ri so'rov qanday ko'rinishini ko'rsatadi.

\`\`\`sql
SELECT * FROM users WHERE name = 'Ali';
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"name":"Ali","age":25}]
\`\`\`

Qator-baqator tahlil:
- Faqat bitta shart bor. Qo'shimcha OR yo'q.
- Faqat mos kelgan bitta qator chiqadi.

---

## 5.1. Himoya usuli

Himoya — parametrli so'rov. Qiymat matnga qo'shilmaydi. Alohida uzatiladi:

\`\`\`sql
SELECT * FROM users WHERE name = ?;
\`\`\`

Qator-baqator tahlil:
- \`?\` — qiymat o'rni. Bu yerga dastur alohida qiymat qo'yadi.
- Foydalanuvchi matni hech qachon buyruqqa aylanmaydi.
- Bu backend kodida yoziladi (Node.js, Python). Baza bir xil ishlaydi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Matnni qo'shib yasash
❌ Xato kod (dasturda):
\`\`\`javascript
let ism = kiritilganMatn;
let sorov = "SELECT * FROM users WHERE name = '" + ism + "'";
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin eshik ochiq qoladi. Foydalanuvchi maxsus matn yozsa, so'rov buziladi.
✅ To'g'ri variant: qiymat alohida uzatiladi (parametrli so'rov).

### 2. Faqatraqam tekshirish
❌ Xato tushuncha: "Faqat son kiritilsa, xavf yo'q" deb o'ylash.
Nima bo'ladi: xato. Hujumchi son o'rniga ham maxsus matn yozishi mumkin. Har qanday kiritma tekshiriladi.
✅ To'g'ri tushuncha: barcha kiritma shubhali hisoblanadi. Parametrli so'rov ishlatiladi.

### 3. Xatoni ko'rsatish
❌ Xato tushuncha: baza xatosini foydalanuvchiga ko'rsatish zararsiz deb o'ylash.
Nima bo'ladi: xato matni hujumchiga baza tuzilishini oshkor qiladi. U keyingi hujumni shunga qarab tuzadi.
✅ To'g'ri tushuncha: foydalanuvchiga umumiy xabar ko'rsatiladi. Aniq xato faqat dasturchiga boradi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
Hujum so'rovini bajaring: \`name = '' OR '1'='1'\` bilan hamma qator chiqishini ko'ring (3 qator chiqishi kerak).

### 2-mashq (O'rtacha)
To'g'ri so'rovni bajaring: faqat Ali chiqishi kerak.

### 3-mashq (Chegara holat)
Parametrli shaklni yozing (\`WHERE name = ?\`). Xato bermasligi kerak.

### Javoblar:
1.
\`\`\`sql
SELECT * FROM users WHERE name = '' OR '1'='1';
\`\`\`
2.
\`\`\`sql
SELECT * FROM users WHERE name = 'Ali';
\`\`\`
3.
\`\`\`sql
SELECT * FROM users WHERE name = ?;
\`\`\`

---

## 8. Xulosa

1. SQL inyeksiya — kiritma orqali so'rovni buzish. Bitta qo'shtirnoq kifoya qiladi.
2. Himoya — parametrli so'rov (\`?\`). Qiymat matnga qo'shilmaydi.
3. Baza xatolari foydalanuvchiga ko'rsatilmaydi.

Keyingi darsda: saqlanadigan protseduralar bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Hujumni ko'rish",
      instruction: "users jadvalidan (id, name, age) hujum so'rovini bajaring: hamma 3 qator chiqishi kerak.",
      startingCode: "SELECT * FROM users WHERE name = '' OR '1'='1';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM users WHERE name = '' OR '1'='1';",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak (hujum muvaffaqiyatli)';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: To'g'ri so'rov",
      instruction: "Faqat Ali ni chiqaring. 1 qator chiqishi kerak.",
      startingCode: "SELECT * FROM users WHERE name = 'Ali';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM users WHERE name = 'Ali';",
      test: "if (result.length !== 1 || result[0].name !== 'Ali') return 'Faqat Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Parametrli shakl",
      instruction: "Parametrli shaklni yozing (`WHERE name = ?`). Xato bermasligi kerak.",
      startingCode: "SELECT * FROM users WHERE name = ?;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM users WHERE name = ?;",
      test: "if (!/\\?/.test(code)) return '? belgisi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Vali hujumi (chegara)",
      instruction: "Hujum bilan Vali qatorini toping (3 qator ichida Vali borligini tasdiqlang).",
      startingCode: "SELECT * FROM users WHERE name = '' OR '1'='1';",
      hint: "Natijada Valini qidiring.",
      solution: "SELECT * FROM users WHERE name = '' OR '1'='1';",
      test: "if (!result.some(r => r.name === 'Vali')) return 'Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Guli himoyasi (chegara)",
      instruction: "Faqat Gulini chiqaring. 1 qator chiqishi kerak.",
      startingCode: "SELECT * FROM users WHERE name = 'Guli';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM users WHERE name = 'Guli';",
      test: "if (result.length !== 1 || result[0].name !== 'Guli') return 'Faqat Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: A bilan boshlanuvchilar (chegara)",
      instruction: "Ismi 'A' bilan boshlanadiganlarni LIKE bilan toping (Ali chiqishi kerak).",
      startingCode: "SELECT name FROM users WHERE name LIKE 'A%';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name FROM users WHERE name LIKE 'A%';",
      test: "const names = result.map(r => r.name);\nif (JSON.stringify(names) !== JSON.stringify(['Ali'])) return 'Faqat Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Yosh sharti (chegara)",
      instruction: "25 yoshdagilarni chiqaring (Ali chiqishi kerak).",
      startingCode: "SELECT * FROM users WHERE age = 25;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM users WHERE age = 25;",
      test: "if (result.length !== 1 || result[0].name !== 'Ali') return 'Faqat Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Parametrli yosh (chegara)",
      instruction: "Parametrli shaklda yozing (`WHERE age = ?`). Xato bermasligi kerak.",
      startingCode: "SELECT * FROM users WHERE age = ?;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT * FROM users WHERE age = ?;",
      test: "if (!/\\?/.test(code)) return '? belgisi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Hamma ism (chegara)",
      instruction: "Hamma ismni chiqaring (Ali, Vali, Guli).",
      startingCode: "SELECT name FROM users;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT name FROM users;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq himoya (chegara)",
      instruction: "To'g'ri + parametrli: avval `name = 'Ali'` ni, keyin `name = ?` shaklini bajaring. Ikkalasi ham xatosiz ishlashi kerak.",
      startingCode: "SELECT * FROM users WHERE name = 'Ali';",
      hint: "SELECT * FROM users WHERE name = ?;",
      solution: "SELECT * FROM users WHERE name = 'Ali';",
      test: "if (result.length !== 1) return '1 qator chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "SQL inyeksiya nima?",
      options: ["Baza turi", "Kiritma orqali so'rovni buzish", "Tezlashtirish usuli", "Zaxira usuli"],
      correctAnswer: 1,
      explanation: "Maxsus matn buyruqqa aylanadi."
    },
    {
      id: 2,
      question: "`SELECT * FROM users WHERE name = '' OR '1'='1';` nima chiqaradi?",
      options: ["Hech narsa", "Hamma qator", "Xatolik", "Birinchi qator"],
      correctAnswer: 1,
      explanation: "'1'='1' har doim rost. Hamma chiqadi."
    },
    {
      id: 3,
      question: "Himoya usuli qaysi?",
      options: ["Ko'proq qo'shtirnoq", "Parametrli so'rov (?)", "Katta harf", "Izoh qo'shish"],
      correctAnswer: 1,
      explanation: "Qiymat matnga qo'shilmaydi. Alohida uzatiladi."
    },
    {
      id: 4,
      question: "Nega matnni qo'shib so'rov yasash xavfli?",
      options: ["Sekin ishlaydi", "Foydalanuvchi buyruq kiritishi mumkin", "Uzun bo'ladi", "Hech qanday sababsiz"],
      correctAnswer: 1,
      explanation: "Kiritma so'rovning bir qismiga aylanadi."
    },
    {
      id: 5,
      question: "Baza xatosini foydalanuvchiga ko'rsatsa nima bo'ladi?",
      options: ["Hech narsa bo'lmaydi", "Tuzilish oshkor bo'ladi", "Tezlashadi", "Xavfsiz bo'ladi"],
      correctAnswer: 1,
      explanation: "Xato matni keyingi hujumga yo'l ochadi."
    },
    {
      id: 6,
      question: "`?` belgisi nimani bildiradi?",
      options: ["Savol", "Qiymat o'rni", "Xatolik", "Tugash"],
      correctAnswer: 1,
      explanation: "Bu yerga dastur alohida qiymat qo'yadi."
    },
    {
      id: 7,
      question: "Faqat son kiritilsa xavfsizmi?",
      options: ["Ha", "Yo'q, har qanday kiritma tekshiriladi", "Ba'zan", "Faqat kechasi"],
      correctAnswer: 1,
      explanation: "Hamma kiritma shubhali hisoblanadi."
    },
    {
      id: 8,
      question: "`SELECT * FROM users WHERE name = 'Ali';` nima chiqaradi?",
      options: ["Hammasi", "Faqat Ali", "Hech narsa", "Xatolik"],
      correctAnswer: 1,
      explanation: "Oddiy aniq so'rov."
    },
    {
      id: 9,
      question: "`SELECT * FROM users WHERE age = 25;` (Ali 25) nima chiqaradi?",
      options: ["Hammasi", "Faqat Ali", "Hech narsa", "Xatolik"],
      correctAnswer: 1,
      explanation: "Shartga mos kelgani chiqadi."
    },
    {
      id: 10,
      question: "Parametrli so'rov qayerda yoziladi?",
      options: ["Bazada", "Backend kodida", "Brauzerda", "Hech qayerda"],
      correctAnswer: 1,
      explanation: "Dastur qiymatni alohida uzatadi."
    },
    {
      id: 11,
      question: "Eng xavfli belgi qaysi?",
      options: ["Nuqta", "Qo'shtirnoq (')", "Vergul", "Nuqta-vergul"],
      correctAnswer: 1,
      explanation: "Qo'shtirnoq matnni yopib, buyruq boshlaydi."
    },
    {
      id: 12,
      question: "To'g'ri himoyalangan kodda qiymat qayerda?",
      options: ["So'rov matnida", "Alohida parametrda", "Izohda", "Jadvalda"],
      correctAnswer: 1,
      explanation: "Matnga qo'shilmaydi."
    }
  ]
};
