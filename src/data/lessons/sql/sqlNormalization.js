export const sqlNormalization = {
  id: "sqlNormalization",
  title: "To'g'ri Loyihalash (Normalizatsiya)",
  language: "sql",
  dbSetup: "CREATE TABLE yomon (id INT, ism STRING, telefonlar STRING); INSERT INTO yomon VALUES (1,'Ali','99890,99777'),(2,'Vali','99891'); CREATE TABLE mijozlar (id INT PRIMARY KEY, ism VARCHAR(50)); INSERT INTO mijozlar VALUES (1,'Ali'),(2,'Vali'); CREATE TABLE telefonlar (id INT PRIMARY KEY, mijoz_id INT REFERENCES mijozlar(id), raqam STRING); INSERT INTO telefonlar VALUES (1,1,'99890'),(2,1,'99777'),(3,2,'99891');",
  theory: `## 1. Bu nima?

Tasavvur qiling, daftar bor. Bitta katakka uchta telefon raqam yozilgan: "99890, 99777, 99111". Keyin savol tug'iladi: "99777 kimniki?" Javob topish uchun vergullarni ajratib, bittalab tekshirish kerak.

Dasturlashda normalizatsiya (me'yorlash) xuddi shu tartib qoidasi. Har bir katakda bitta qiymat turishi kerak.

Normalizatsiya — jadvallarni to'g'ri loyihalash qoidalari to'plamidir. Asosiylari: 1NF (har katakda bitta qiymat), 2NF, 3NF.

---

## 2. Nega kerak?

Yomon jadvalda telefonlar vergul bilan yozilgan:

\`\`\`sql
SELECT * FROM yomon WHERE telefonlar LIKE '%99777%';
\`\`\`

Ishlaydi. Lekin sekin. Xato qilish oson. Raqam qo'shish qiyin.

Muammo shunda: bitta katakda ko'p qiymat yashiringan. Yechim — alohida jadval:

\`\`\`sql
SELECT mijozlar.ism, telefonlar.raqam FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id;
\`\`\`

Har raqam alohida qatorda. Aniqlik to'liq.

---

## 3. Birinchi misol

Bu kod yomon jadvaldan qidirishni ko'rsatadi.

\`\`\`sql
SELECT ism FROM yomon WHERE telefonlar LIKE '%99777%'; -- Vergul ichidan qidirish
\`\`\`

\`\`\`text
// Natija:
[{"ism":"Ali"}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`telefonlar LIKE '%99777%'\` — vergul bilan yozilgan matn ichidan qidirildi.
- Natija chiqdi. Lekin usul ishonchsiz: vergul unutilsa, natija buziladi.
- Bu 1NF qoidasini buzadi: bitta katakda bitta qiymat bo'lishi kerak.

---

## 5. Yana bitta misol

Bu kod to'g'ri loyihada xuddi shu savolga javob beradi.

\`\`\`sql
SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99777';
\`\`\`

\`\`\`text
// Natija:
[{"ism":"Ali"}]
\`\`\`

Qator-baqator tahlil:
- Har raqam alohida qator. Vergul yo'q.
- Aniq tenglik bilan qidirildi. Xato ehtimoli yo'q.

---

## 5.1. Uchta qoida

- **1NF** — har katakda bitta qiymat. Vergul bilan yozish taqiqlanadi.
- **2NF** — har ustun butun kalitga tegishli bo'lishi kerak.
- **3NF** — bog'liq bo'lmagan ma'lumot alohida jadvalda turishi kerak.

---

## 6. Ko'p uchraydigan xatolar

### 1. Vergul bilan yozish
❌ Xato tushuncha:
\`\`\`sql
INSERT INTO yomon VALUES (3, 'Guli', '99001,99002');
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin 1NF buziladi. Keyin qidiruv qiynaladi.
✅ To'g'ri variant:
\`\`\`sql
INSERT INTO mijozlar VALUES (3, 'Guli');
INSERT INTO telefonlar VALUES (4, 3, '99001');
INSERT INTO telefonlar VALUES (5, 3, '99002');
\`\`\`

### 2. Takrorlanuvchi ustunlar
❌ Xato tushuncha: har mijozga telefon1, telefon2, telefon3 ustunlari ochish.
Nima bo'ladi: xato bermaydi! Lekin to'rtinchi raqam sig'maydi. Jadvalni o'zgartirish kerak bo'ladi.
✅ To'g'ri variant: cheksiz qatorli alohida jadval ochiladi.

### 3. Bitta ulkan jadval
❌ Xato tushuncha: hamma ma'lumotni bitta jadvalga tiqish (ism, telefon, manzil, buyurtma...).
Nima bo'ladi: xato bermaydi! Lekin takror ko'payadi. Bitta o'zgarish ko'p joyni buzadi.
✅ To'g'ri tushuncha: mavzular alohida jadvallarga bo'linadi. Aloqa ustuni bilan bog'lanadi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
Yomon jadvaldan 99777 ni LIKE bilan toping (Ali chiqishi kerak).

### 2-mashq (O'rtacha)
To'g'ri loyihada 99777 ni aniq tenglik bilan toping (Ali chiqishi kerak).

### 3-mashq (Chegara holat)
Ali telefonlarini sanang (JOIN + COUNT). Natija 2 bo'lishi kerak.

### Javoblar:
1.
\`\`\`sql
SELECT ism FROM yomon WHERE telefonlar LIKE '%99777%';
\`\`\`
2.
\`\`\`sql
SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99777';
\`\`\`
3.
\`\`\`sql
SELECT COUNT(*) AS soni FROM telefonlar INNER JOIN mijozlar ON telefonlar.mijoz_id = mijozlar.id WHERE mijozlar.ism = 'Ali';
\`\`\`

---

## 8. Xulosa

1. Normalizatsiya — to'g'ri loyihalash qoidalari. Asosiysi 1NF: bitta katakda bitta qiymat.
2. Vergul bilan yozish ishlaydi, lekin ishonchsiz. Alohida jadval ochiladi.
3. Mavzular bo'linadi. Jadvallar aloqa ustuni bilan bog'lanadi.

Keyingi darsda: vaqtinchalik natija (WITH) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Vergul ichidan qidirish",
      instruction: "yomon jadvalidan (id, ism, telefonlar) 99777 ni LIKE bilan toping (Ali chiqishi kerak).",
      startingCode: "SELECT ism FROM yomon WHERE telefonlar LIKE '%99777%';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism FROM yomon WHERE telefonlar LIKE '%99777%';",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Ali'])) return 'Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Aniq qidirish",
      instruction: "To'g'ri loyihada 99777 ni aniq tenglik bilan toping (Ali chiqishi kerak).",
      startingCode: "SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99777';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99777';",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Ali'])) return 'Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Ali raqamlari",
      instruction: "Ali telefonlarini sanang (JOIN + COUNT). Natija 2 bo'lishi kerak.",
      startingCode: "SELECT COUNT(*) AS soni FROM telefonlar INNER JOIN mijozlar ON telefonlar.mijoz_id = mijozlar.id WHERE mijozlar.ism = 'Ali';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT COUNT(*) AS soni FROM telefonlar INNER JOIN mijozlar ON telefonlar.mijoz_id = mijozlar.id WHERE mijozlar.ism = 'Ali';",
      test: "if (result[0].soni !== 2) return 'Natija 2 bolishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Yangi mijoz",
      instruction: "Yangi mijoz yozing (3, 'Guli'). Unga 2 ta raqam yozing. Jami 5 ta raqam bo'lishi kerak.",
      startingCode: "INSERT INTO mijozlar VALUES (3, 'Guli');",
      hint: "INSERT INTO telefonlar VALUES (4, 3, '99001');\nINSERT INTO telefonlar VALUES (5, 3, '99002');\nSELECT COUNT(*) AS soni FROM telefonlar;",
      solution: "INSERT INTO mijozlar VALUES (3, 'Guli'); INSERT INTO telefonlar VALUES (4, 3, '99001'); INSERT INTO telefonlar VALUES (5, 3, '99002'); SELECT COUNT(*) AS soni FROM telefonlar;",
      test: "if (result[0].soni !== 5) return 'Natija 5 bolishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Vali raqami (chegara)",
      instruction: "Vali raqamini toping (99891 chiqishi kerak).",
      startingCode: "SELECT telefonlar.raqam FROM telefonlar INNER JOIN mijozlar ON telefonlar.mijoz_id = mijozlar.id WHERE mijozlar.ism = 'Vali';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT telefonlar.raqam FROM telefonlar INNER JOIN mijozlar ON telefonlar.mijoz_id = mijozlar.id WHERE mijozlar.ism = 'Vali';",
      test: "if (result[0].raqam !== '99891') return '99891 chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Barcha raqamlar (chegara)",
      instruction: "Barcha telefonlarni chiqaring (3 ta chiqishi kerak).",
      startingCode: "SELECT raqam FROM telefonlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT raqam FROM telefonlar;",
      test: "if (result.length !== 3) return '3 ta chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: 99890 kimniki (chegara)",
      instruction: "99890 raqam egasini toping (Ali chiqishi kerak).",
      startingCode: "SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99890';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99890';",
      test: "if (result[0].ism !== 'Ali') return 'Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Mijozlar soni (chegara)",
      instruction: "Mijozlarni sanang (2 chiqishi kerak).",
      startingCode: "SELECT COUNT(*) AS soni FROM mijozlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT COUNT(*) AS soni FROM mijozlar;",
      test: "if (result[0].soni !== 2) return 'Natija 2 bolishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: 99777 kimniki (chegara)",
      instruction: "To'g'ri loyihada 99777 egasini toping (Ali chiqishi kerak).",
      startingCode: "SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99777';",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT mijozlar.ism FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id WHERE telefonlar.raqam = '99777';",
      test: "if (result[0].ism !== 'Ali') return 'Ali chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq ro'yxat (chegara)",
      instruction: "Hamma mijozni telefonlari bilan chiqaring (3 qator: Ali×2, Vali×1).",
      startingCode: "SELECT mijozlar.ism, telefonlar.raqam FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT mijozlar.ism, telefonlar.raqam FROM mijozlar INNER JOIN telefonlar ON telefonlar.mijoz_id = mijozlar.id;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "1NF nimani talab qiladi?",
      options: ["Ko'p jadval", "Har katakda bitta qiymat", "Tezlik", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Vergul bilan yozish taqiqlanadi."
    },
    {
      id: 2,
      question: "`telefonlar LIKE '%99777%'` kamchiligi nima?",
      options: ["Ishlamaydi", "Sekin va ishonchsiz", "Qimmat", "Hech qanday"],
      correctAnswer: 1,
      explanation: "Vergul unutilsa, natija buziladi."
    },
    {
      id: 3,
      question: "To'g'ri loyihada raqamlar qayerda turadi?",
      options: ["Bitta katakda", "Alohida qatorlarda", "Izohda", "Hech qayerda"],
      correctAnswer: 1,
      explanation: "Har raqam alohida qator bo'ladi."
    },
    {
      id: 4,
      question: "Bitta odamda 10 ta raqam bo'lsa, ustun usuli bilan nima bo'ladi?",
      options: ["Oson bo'ladi", "10 ta ustun kerak bo'ladi", "Avtomatik bo'ladi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "11-chi sig'maydi. Jadval o'zgaradi."
    },
    {
      id: 5,
      question: "Normalizatsiya nimani beradi?",
      options: ["Tezlikni pasaytiradi", "Aniqlik va tartibni", "Joyni ko'paytiradi", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Har qiymat o'z o'rnida turadi."
    },
    {
      id: 6,
      question: "3NF mohiyati nima?",
      options: ["Uchta jadval", "Bog'liq bo'lmagan ma'lumot alohida jadvalda", "Uchta ustun", "Uch marta takrorlash"],
      correctAnswer: 1,
      explanation: "Har mavzu o'z jadvalida yashaydi."
    },
    {
      id: 7,
      question: "Vali raqami qaysi?",
      options: ["99890", "99891", "99777", "99001"],
      correctAnswer: 1,
      explanation: "Valiga 99891 yozilgan."
    },
    {
      id: 8,
      question: "Ali telefonlari nechta?",
      options: ["1 ta", "2 ta", "3 ta", "0 ta"],
      correctAnswer: 1,
      explanation: "99890 va 99777 — ikkita raqam."
    },
    {
      id: 9,
      question: "99777 kimniki?",
      options: ["Vali", "Ali", "Guli", "Hech kimniki"],
      correctAnswer: 1,
      explanation: "To'g'ri loyihada ham, vergulda ham Ali chiqadi."
    },
    {
      id: 10,
      question: "Hamma mijoz telefonlari bilan necha qator chiqadi?",
      options: ["2 ta", "3 ta", "5 ta", "1 ta"],
      correctAnswer: 1,
      explanation: "Ali×2, Vali×1. Jami 3 qator."
    },
    {
      id: 11,
      question: "Bitta ulkan jadval kamchiligi nima?",
      options: ["Tez ishlaydi", "Takror ko'payadi", "Arzon turadi", "Hech qanday"],
      correctAnswer: 1,
      explanation: "Bir o'zgarish ko'p joyni buzadi."
    },
    {
      id: 12,
      question: "Jadvallar qanday bog'lanadi?",
      options: ["Ism bilan", "Aloqa ustuni bilan", "Tasodifan", "Hech qanday"],
      correctAnswer: 1,
      explanation: "mijoz_id kabi ustunlar bog'laydi."
    }
  ]
};
