export const sqlJoins = {
  id: "sqlJoins",
  title: "Jadvallarni Birlashtirish (JOIN)",
  language: "sql",
  dbSetup: "CREATE TABLE users (id INT, name STRING); INSERT INTO users VALUES (1,'Ali'),(2,'Vali'),(3,'Guli'); CREATE TABLE orders (id INT, user_id INT, amount INT); INSERT INTO orders VALUES (1,1,100),(2,1,200),(3,2,150),(4,99,500);",
  theory: `## 1. Bu nima?

Tasavvur qiling, ikkita daftar bor. Birinchida o'quvchilar ro'yxati: Ali, Vali, Guli. Ikkinchisida to'lovlar: kim qancha to'lagan. Savol: "Har bir o'quvchi qancha to'lagan?" Javob ikkala daftarda — ularni yonma-yon qo'yish kerak.

Dasturlashda JOIN (birlashtirish) xuddi shu ikki daftarni yonma-yon qo'yish. Umumiy ustun orqali qatorlar ulanadi.

JOIN — ikkita jadvalni umumiy ustun bo'yicha birlashtirib, bitta natija chiqaradigan operatordir.

---

## 2. Nega kerak?

users jadvalida ismlar bor. orders jadvalida summalar bor. Lekin qaysi summa kimniki — faqat raqamlar orqali bilinadi:

\`\`\`sql
SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

Natijada ism yonida summasi turadi. Ikkita jadval bitta javob bo'ldi.

Muammo shunda: ma'lumot ikki joyda saqlanadi. Yechim — umumiy ustun (\`id\` va \`user_id\`) orqali ulash.

---

## 3. Birinchi misol

Bu kod faqat ikkalasida ham bor qatorlarni chiqaradi.

\`\`\`sql
SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali","amount":100},{"name":"Ali","amount":200},{"name":"Vali","amount":150}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`FROM users INNER JOIN orders\` — ikkita jadval birlashtirilmoqda.
- \`ON users.id = orders.user_id\` — ulanish sharti. Foydalanuvchi raqami buyurtmadagi raqamga teng bo'lsa, qatorlar yonma-yon qo'yiladi.
- Ali ikki marta chiqdi. Chunki uning ikkita buyurtmasi bor.
- Guli chiqmadi. Uning buyurtmasi yo'q. INNER faqat jufti borlarni oladi.

---

## 5. Yana bitta misol

Bu kod buyurtmasizlarni ham chiqaradi.

\`\`\`sql
SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`

\`\`\`text
// Natija:
[{"name":"Ali","amount":100},{"name":"Ali","amount":200},{"name":"Vali","amount":150},{"name":"Guli"}]
\`\`\`

Qator-baqator tahlil:
- \`LEFT JOIN\` — chap jadval (users) to'liq chiqadi. Hammasi saqlanadi.
- Guli uchun buyurtma topilmadi. Uning \`amount\` qiymati bo'sh qoldi.
- O'ng tomonda jufti yo'q bo'lsa ham, chap tomon yo'qolmaydi.

---

## 5.1. RIGHT va FULL

Qolgan ikki tur:

\`\`\`sql
SELECT users.name, orders.amount FROM users RIGHT JOIN orders ON users.id = orders.user_id;
SELECT users.name, orders.amount FROM users FULL OUTER JOIN orders ON users.id = orders.user_id;
\`\`\`

\`\`\`text
// Natija (RIGHT, 4 qator — oxirgisi egasiz buyurtma):
[{"name":"Ali","amount":100},{"name":"Ali","amount":200},{"name":"Vali","amount":150},{"amount":500}]
// Natija (FULL, 5 qator — hammasi):
// Yuqoridagi 4 ta + {"name":"Guli"}
\`\`\`

Qator-baqator tahlil:
- \`RIGHT JOIN\` — o'ng jadval (orders) to'liq chiqadi. Egasiz buyurtma (500) ham chiqadi. Uning ismi bo'sh.
- \`FULL OUTER JOIN\` — ikkala tomon to'liq chiqadi. 4 + 1 = 5 qator.

---

## 6. Ko'p uchraydigan xatolar

### 1. ON ni unutish
❌ Xato kod:
\`\`\`sql
SELECT users.name, orders.amount FROM users INNER JOIN orders;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin har bir foydalanuvchi har bir buyurtma bilan ulanadi (3 x 4 = 12 qator). Bu "ko'paytma" deb ataladi. Kerakli javob emas.
✅ To'g'ri variant:
\`\`\`sql
SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

### 2. Noto'g'ri ustun bilan ulash
❌ Xato kod:
\`\`\`sql
SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.id;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin javob noto'g'ri: buyurtma raqami foydalanuvchi raqamiga teng bo'lganlar chiqadi (Ali-100, Vali-200). Ulanish ustuni xato tanlangan.
✅ To'g'ri variant:
\`\`\`sql
SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

### 3. LEFT o'rniga INNER kutish
❌ Xato tushuncha: INNER yozib, buyurtmasiz Guli ham chiqadi deb o'ylash.
Nima bo'ladi: Guli chiqmaydi. INNER faqat jufti borlarni oladi. Hamma foydalanuvchi kerak bo'lsa — LEFT JOIN yoziladi.
✅ To'g'ri variant:
\`\`\`sql
SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
users va orders ni INNER JOIN bilan ulang. 3 qator chiqishi kerak.

### 2-mashq (O'rtacha)
LEFT JOIN bilan ulang. 4 qator chiqishi kerak (Guli ham bor).

### 3-mashq (Chegara holat)
FULL OUTER JOIN bilan ulang. 5 qator chiqishi kerak.

### Javoblar:
1.
\`\`\`sql
SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;
\`\`\`
2.
\`\`\`sql
SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`
3.
\`\`\`sql
SELECT users.name, orders.amount FROM users FULL OUTER JOIN orders ON users.id = orders.user_id;
\`\`\`

---

## 8. Xulosa

1. JOIN ikki jadvalni umumiy ustun orqali birlashtiradi. Shart \`ON\` bilan yoziladi.
2. INNER — faqat jufti borlar. LEFT — chap to'liq. RIGHT — o'ng to'liq. FULL — hammasi.
3. \`ON\` unutilsa, ko'paytma chiqadi (har biri har biri bilan).

Keyingi darsda: so'rov ichida so'rov (subquery) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: INNER JOIN",
      instruction: "users va orders ni INNER JOIN bilan ulang (ON users.id = orders.user_id). 3 qator chiqishi kerak.",
      startingCode: "SELECT users.name, orders.amount FROM users INNER JOIN orders;",
      hint: "Oxiriga ON users.id = orders.user_id qo'shing.",
      solution: "SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;",
      test: "if (!/\\bINNER\\s+JOIN\\b/i.test(code)) return 'INNER JOIN yozing';\nif (!/\\bON\\b/i.test(code)) return 'ON sharti kerak';\nif (result.length !== 3) return '3 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: LEFT JOIN",
      instruction: "LEFT JOIN bilan ulang. 4 qator chiqishi kerak (Guli ham bor, summasi bo'sh).",
      startingCode: "SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;",
      test: "if (!/\\bLEFT\\s+JOIN\\b/i.test(code)) return 'LEFT JOIN yozing';\nif (result.length !== 4) return '4 qator chiqishi kerak';\nconst guli = result.filter(r => r.name === 'Guli');\nif (guli.length !== 1 || guli[0].amount !== undefined) return 'Guli summasiz chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: RIGHT JOIN",
      instruction: "RIGHT JOIN bilan ulang. 4 qator chiqishi kerak (oxirgisi egasiz buyurtma: 500).",
      startingCode: "SELECT users.name, orders.amount FROM users RIGHT JOIN orders ON users.id = orders.user_id;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT users.name, orders.amount FROM users RIGHT JOIN orders ON users.id = orders.user_id;",
      test: "if (!/\\bRIGHT\\s+JOIN\\b/i.test(code)) return 'RIGHT JOIN yozing';\nif (result.length !== 4) return '4 qator chiqishi kerak';\nif (!result.some(r => r.amount === 500)) return '500 lik buyurtma chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: FULL JOIN",
      instruction: "FULL OUTER JOIN bilan ulang. 5 qator chiqishi kerak.",
      startingCode: "SELECT users.name, orders.amount FROM users FULL OUTER JOIN orders ON users.id = orders.user_id;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT users.name, orders.amount FROM users FULL OUTER JOIN orders ON users.id = orders.user_id;",
      test: "if (!/\\bFULL\\b/i.test(code)) return 'FULL OUTER JOIN yozing';\nif (result.length !== 5) return '5 qator chiqishi kerak. Chiqdi: ' + result.length;\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: ON qo'shish",
      instruction: "Quyidagi ko'paytmani tuzating: ON shartini qo'shing (3 qator chiqishi kerak).",
      startingCode: "SELECT users.name, orders.amount FROM users INNER JOIN orders;",
      hint: "ON users.id = orders.user_id",
      solution: "SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;",
      test: "if (!/\\bON\\b/i.test(code)) return 'ON shartini qoshing';\nif (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Noto'g'ri ustun",
      instruction: "`ON users.id = orders.id` xato ulangan. To'g'rilang (`user_id` bo'lishi kerak). Ali ikki marta chiqishi kerak.",
      startingCode: "SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.id;",
      hint: "orders.user_id yozing.",
      solution: "SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;",
      test: "if (!/user_id/i.test(code)) return 'user_id ustuni kerak';\nconst ali = result.filter(r => r.name === 'Ali');\nif (ali.length !== 2) return 'Ali ikki marta chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Faqat summalar",
      instruction: "INNER JOIN bilan faqat amount ustunini chiqaring. 100, 200, 150 chiqishi kerak.",
      startingCode: "SELECT orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;",
      test: "const amounts = result.map(r => r.amount);\nif (JSON.stringify(amounts) !== JSON.stringify([100, 200, 150])) return '100, 200, 150 chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Vali summasi (chegara)",
      instruction: "INNER JOIN bilan Vali qatorini toping (amount 150 bo'lishi kerak).",
      startingCode: "SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;",
      hint: "Tayyor so'rovda Valini toping.",
      solution: "SELECT users.name, orders.amount FROM users INNER JOIN orders ON users.id = orders.user_id;",
      test: "const vali = result.filter(r => r.name === 'Vali');\nif (vali.length !== 1 || vali[0].amount !== 150) return 'Vali 150 bilan chiqishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Egasiz buyurtma (chegara)",
      instruction: "RIGHT JOIN bilan ismsiz qatorni toping (amount 500, name bo'sh bo'lishi kerak).",
      startingCode: "SELECT users.name, orders.amount FROM users RIGHT JOIN orders ON users.id = orders.user_id;",
      hint: "Tayyor so'rovda oxirgi qatorni tekshiring.",
      solution: "SELECT users.name, orders.amount FROM users RIGHT JOIN orders ON users.id = orders.user_id;",
      test: "const orphan = result.filter(r => r.amount === 500);\nif (orphan.length !== 1 || orphan[0].name !== undefined) return 'Ismsiz 500 lik qator kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Guli summasi (chegara)",
      instruction: "LEFT JOIN da Guli qatorining amount qiymati qanday? Javob: qiymat yo'q (bo'sh). So'rovni bajaring va tasdiqlang.",
      startingCode: "SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;",
      hint: "Guli qatorini toping.",
      solution: "SELECT users.name, orders.amount FROM users LEFT JOIN orders ON users.id = orders.user_id;",
      test: "const guli = result.filter(r => r.name === 'Guli');\nif (guli.length !== 1 || guli[0].amount !== undefined) return 'Guli summasiz chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JOIN nimani birlashtiradi?",
      options: ["Ustunlarni", "Ikkita jadval qatorlarini", "Bazalarni", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Umumiy ustun orqali ikki jadval qatorlari yonma-yon qo'yiladi."
    },
    {
      id: 2,
      question: "INNER JOIN kimlarni chiqaradi?",
      options: ["Hammani", "Faqat jufti borlarni", "Faqat jufti yo'qlarni", "Birinchini"],
      correctAnswer: 1,
      explanation: "INNER faqat ikkala tomonda ham mos kelganlarni oladi."
    },
    {
      id: 3,
      question: "LEFT JOIN da qaysi tomon to'liq chiqadi?",
      options: ["O'ng (ikkinchi)", "Chap (birinchi)", "Ikkalasi ham", "Hech biri"],
      correctAnswer: 1,
      explanation: "LEFT — chap jadval to'liq saqlanadi."
    },
    {
      id: 4,
      question: "ON yozilmasa nima bo'ladi?",
      options: ["Xatolik beradi", "Ko'paytma chiqadi (har biri har biri bilan)", "Bo'sh chiqadi", "Faqat birinchisi chiqadi"],
      correctAnswer: 1,
      explanation: "Shartsiz birlashma ko'paytma beradi."
    },
    {
      id: 5,
      question: "RIGHT JOIN kimlarni chiqaradi?",
      options: ["Faqat chapdagilarni", "O'ngdagilarni to'liq (juftsiz ham)", "Faqat jufti borlarni", "Hech kimni"],
      correctAnswer: 1,
      explanation: "O'ng tomon to'liq chiqadi, jufti bo'lmasa ham."
    },
    {
      id: 6,
      question: "FULL OUTER JOIN nimani chiqaradi?",
      options: ["Faqat jufti borlarni", "Ikkala tomonni to'liq", "Faqat chapni", "Faqat o'ngni"],
      correctAnswer: 1,
      explanation: "FULL — ikkala tomonning hammasi."
    },
    {
      id: 7,
      question: "`ON users.id = orders.user_id` nimani bildiradi?",
      options: ["Ustun yaratishni", "Ulanish shartini", "Tartiblashni", "Filtrlashni"],
      correctAnswer: 1,
      explanation: "Qaysi qatorlar ulanishini ON aytadi."
    },
    {
      id: 8,
      question: "`ON users.id = orders.id` yozilsa nima bo'ladi?",
      options: ["To'g'ri ishlaydi", "Xato ulanadi (noto'g'ri juftlar)", "Xatolik beradi", "Bo'sh chiqadi"],
      correctAnswer: 1,
      explanation: "Ustun xato tanlangan: raqamlar tasodifan mos keladi."
    },
    {
      id: 9,
      question: "Buyurtmasiz Guli qaysi JOIN da chiqadi?",
      options: ["INNER", "LEFT", "Hech birida", "Ikkalasida ham"],
      correctAnswer: 1,
      explanation: "LEFT chap tomonni saqlaydi. INNER uni tashlaydi."
    },
    {
      id: 10,
      question: "Egasiz buyurtma (500) qaysi JOIN da chiqadi?",
      options: ["INNER", "LEFT", "RIGHT", "Hech birida"],
      correctAnswer: 2,
      explanation: "RIGHT o'ng tomonni saqlaydi."
    },
    {
      id: 11,
      question: "3 foydalanuvchi va 4 buyurtma ON siz ulansa necha qator chiqadi?",
      options: ["7 ta", "12 ta", "4 ta", "3 ta"],
      correctAnswer: 1,
      explanation: "Ko'paytma: 3 x 4 = 12."
    },
    {
      id: 12,
      question: "JOIN o'rniga nima ishlatsa bo'ladi (uzun yo'l)?",
      options: ["Hech narsa", "Ko'p so'rov + dasturda ulash", "Faqat VIEW", "Faqat INDEX"],
      correctAnswer: 1,
      explanation: "Bazada ulash o'rniga dasturda ulash mumkin, lekin sekin."
    }
  ]
};
