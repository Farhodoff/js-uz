export const sqlCte = {
  id: "sqlCte",
  title: "Vaqtinchalik Natija (WITH)",
  language: "sql",
  dbSetup: "CREATE TABLE hodimlar (id INT, ism STRING, bolim STRING, oylik INT); INSERT INTO hodimlar VALUES (1,'Ali','IT',500),(2,'Vali','IT',700),(3,'Guli','HR',400);",
  theory: `## 1. Bu nima?

Tasavvur qiling, oshxonada ovqat pishiryapsiz. Avval sabzavotlarni to'g'raysiz va alohida idishga solasiz. Keyin asosiy qozonga qo'shasiz. Oraliq idish ishingizni tartibli qiladi.

Dasturlashda WITH (bilan) xuddi shu oraliq idish. So'rov natijasi vaqtinchalik nom bilan saqlanadi. Keyin asosiy so'rovda ishlatiladi.

CTE (umumiy jadval ifodasi) — WITH bilan nomlangan vaqtinchalik natijadir.

---

## 2. Nega kerak?

IT bo'limida oyligi 600 dan katta xodimlar kerak. Ichki so'rov bilan ham bo'ladi:

\`\`\`sql
SELECT * FROM (SELECT * FROM hodimlar WHERE bolim = 'IT') AS it WHERE oylik > 600;
\`\`\`

Ishlaydi. Lekin ichma-ich qavslar chalkashtiradi.

Muammo shunda: murakkab so'rov o'qilmaydi. Yechim — WITH. Har qadam alohida nom oladi:

\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')
SELECT * FROM it WHERE oylik > 600;
\`\`\`

Bosqichma-bosqich o'qiladi.

---

## 3. Birinchi misol

Bu kod IT xodimlarni vaqtinchalik nom bilan chiqaradi.

\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')
SELECT * FROM it;
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"ism":"Ali","bolim":"IT","oylik":500},{"id":2,"ism":"Vali","bolim":"IT","oylik":700}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`WITH it AS (...)\` — ichki so'rov \`it\` nomi bilan saqlandi.
- \`SELECT * FROM it;\` — saqlangan natija jadvaldek so'raldi.
- Natijada faqat IT xodimlari chiqdi.

---

## 5. Yana bitta misol

Bu kod ikkita ketma-ket CTE ko'rsatadi.

\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT'),
yuqori AS (SELECT * FROM it WHERE oylik > 600)
SELECT * FROM yuqori;
\`\`\`

\`\`\`text
// Natija:
[{"id":2,"ism":"Vali","bolim":"IT","oylik":700}]
\`\`\`

Qator-baqator tahlil:
- Birinchi CTE IT ni ajratdi. Ikkinchisi undan qimmatlarini oldi.
- Vergul bilan bir nechta CTE yoziladi.
- Natijada faqat Vali chiqdi.

---

## 6. Ko'p uchraydigan xatolar

### 1. Vergulni unutish
❌ Xato kod:
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')
yuqori AS (SELECT * FROM it WHERE oylik > 600)
SELECT * FROM yuqori;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Bir nechta CTE vergul bilan ajratiladi.
✅ To'g'ri variant:
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT'),
yuqori AS (SELECT * FROM it WHERE oylik > 600)
SELECT * FROM yuqori;
\`\`\`

### 2. Nomni ishlatmaslik
❌ Xato tushuncha:
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')
SELECT * FROM hodimlar;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin CTE behuda yaratilgan. Asosiy so'rov uni ishlatmagan.
✅ To'g'ri variant:
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')
SELECT * FROM it;
\`\`\`

### 3. CTE dan keyin nuqta-vergul
❌ Xato kod:
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT');
SELECT * FROM it;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Nuqta-vergul so'rovni yakunlaydi. CTE keyingi so'rovda ko'rinmaydi.
✅ To'g'ri variant:
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')
SELECT * FROM it;
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
IT xodimlarni CTE bilan chiqaring (2 qator: Ali, Vali).

### 2-mashq (O'rtacha)
Ikkita CTE yozing: avval IT, keyin oyligi 600 dan kattalar (faqat Vali chiqishi kerak).

### 3-mashq (Chegara holat)
HR xodimlarni CTE bilan chiqaring (faqat Guli chiqishi kerak).

### Javoblar:
1.
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')
SELECT * FROM it;
\`\`\`
2.
\`\`\`sql
WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT'),
yuqori AS (SELECT * FROM it WHERE oylik > 600)
SELECT * FROM yuqori;
\`\`\`
3.
\`\`\`sql
WITH hr AS (SELECT * FROM hodimlar WHERE bolim = 'HR')
SELECT * FROM hr;
\`\`\`

---

## 8. Xulosa

1. WITH — vaqtinchalik natijaga nom beradi. Asosiy so'rov undan foydalanadi.
2. Bir nechta CTE vergul bilan yoziladi. Oxirida nuqta-vergul bo'lmaydi.
3. CTE faqat o'z so'rovida yashaydi. Keyingi so'rovda ko'rinmaydi.

Keyingi darsda: qatorlarni raqamlash (window funksiyalar) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: IT ro'yxati",
      instruction: "hodimlar jadvalidan (id, ism, bolim, oylik) IT xodimlarni CTE bilan chiqaring (Ali, Vali).",
      startingCode: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')\nSELECT * FROM it;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT') SELECT * FROM it;",
      test: "if (!/\\bWITH\\b/i.test(code)) return 'WITH yozing';\nif (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Ikki bosqich",
      instruction: "Ikkita CTE yozing: avval IT, keyin oyligi 600 dan kattalar (faqat Vali).",
      startingCode: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT'),\nyuqori AS (SELECT * FROM it WHERE oylik > 600)\nSELECT * FROM yuqori;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT'), yuqori AS (SELECT * FROM it WHERE oylik > 600) SELECT * FROM yuqori;",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Vali'])) return 'Faqat Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: HR ro'yxati",
      instruction: "HR xodimlarni CTE bilan chiqaring (faqat Guli).",
      startingCode: "WITH hr AS (SELECT * FROM hodimlar WHERE bolim = 'HR')\nSELECT * FROM hr;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH hr AS (SELECT * FROM hodimlar WHERE bolim = 'HR') SELECT * FROM hr;",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Guli'])) return 'Faqat Guli chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Vergul qo'shish",
      instruction: "Quyidagi xatoni tuzating: ikkita CTE orasiga vergul qo'ying.",
      startingCode: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')\nyuqori AS (SELECT * FROM it WHERE oylik > 600)\nSELECT * FROM yuqori;",
      hint: "Birinchi qator oxiriga vergul qo'shing.",
      solution: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT'), yuqori AS (SELECT * FROM it WHERE oylik > 600) SELECT * FROM yuqori;",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Vali'])) return 'Faqat Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Nuqta-vergul xatosi",
      instruction: "Quyidagi xatoni tuzating: CTE dan keyingi nuqta-vergulni olib tashlang.",
      startingCode: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT');\nSELECT * FROM it;",
      hint: "Birinchi qator oxiridagi ; ni olib tashlang.",
      solution: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT') SELECT * FROM it;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Qimmatlar (chegara)",
      instruction: "Oyligi 500 dan kattalarni CTE bilan chiqaring (Vali chiqishi kerak).",
      startingCode: "WITH qimmat AS (SELECT * FROM hodimlar WHERE oylik > 500)\nSELECT * FROM qimmat;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH qimmat AS (SELECT * FROM hodimlar WHERE oylik > 500) SELECT * FROM qimmat;",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Vali'])) return 'Faqat Vali chiqishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Ismlar (chegara)",
      instruction: "CTE orqali faqat ismlarni chiqaring (Ali, Vali, Guli).",
      startingCode: "WITH hamma AS (SELECT * FROM hodimlar)\nSELECT ism FROM hamma;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH hamma AS (SELECT * FROM hodimlar) SELECT ism FROM hamma;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: Sanoq CTE orqali (chegara)",
      instruction: "CTE orqali IT xodimlarni sanang (COUNT). Natija 2 bo'lishi kerak.",
      startingCode: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')\nSELECT COUNT(*) AS soni FROM it;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT') SELECT COUNT(*) AS soni FROM it;",
      test: "if (result[0].soni !== 2) return 'Natija 2 bolishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Yig'indi CTE orqali (chegara)",
      instruction: "CTE orqali IT oyliklari yig'indisini chiqaring (1200 chiqishi kerak).",
      startingCode: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT')\nSELECT SUM(oylik) AS jami FROM it;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH it AS (SELECT * FROM hodimlar WHERE bolim = 'IT') SELECT SUM(oylik) AS jami FROM it;",
      test: "if (result[0].jami !== 1200) return 'Natija 1200 bolishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq zanjir (chegara)",
      instruction: "Uch bosqichli zanjir yozing: hamma → IT → 600 dan kattalar (faqat Vali).",
      startingCode: "WITH hamma AS (SELECT * FROM hodimlar),\nit AS (SELECT * FROM hamma WHERE bolim = 'IT'),\nyuqori AS (SELECT * FROM it WHERE oylik > 600)\nSELECT * FROM yuqori;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "WITH hamma AS (SELECT * FROM hodimlar), it AS (SELECT * FROM hamma WHERE bolim = 'IT'), yuqori AS (SELECT * FROM it WHERE oylik > 600) SELECT * FROM yuqori;",
      test: "const names = result.map(r => r.ism);\nif (JSON.stringify(names) !== JSON.stringify(['Vali'])) return 'Faqat Vali chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "CTE nima?",
      options: ["Yangi jadval", "Nomlangan vaqtinchalik natija", "Indeks turi", "Xato turi"],
      correctAnswer: 1,
      explanation: "WITH bilan saqlanadi va asosiy so'rovda ishlatiladi."
    },
    {
      id: 2,
      question: "Bir nechta CTE qanday ajratiladi?",
      options: ["Nuqta-vergul bilan", "Vergul bilan", "Bo'sh joy bilan", "Ajratilmaydi"],
      correctAnswer: 1,
      explanation: "Vergul bilan ketma-ket yoziladi."
    },
    {
      id: 3,
      question: "CTE dan keyin nuqta-vergul qo'yilsa nima bo'ladi?",
      options: ["Ishlaydi", "Keyingi so'rov nomni ko'rmaydi", "Tezlashadi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Nuqta-vergul CTE ni yakunlaydi."
    },
    {
      id: 4,
      question: "CTE qayerda yashaydi?",
      options: ["Bazada abadiy", "Faqat o'z so'rovida", "Faylda", "Xotirada abadiy"],
      correctAnswer: 1,
      explanation: "Vaqtinchalik natija. Keyingi so'rovda yo'q."
    },
    {
      id: 5,
      question: "`WITH it AS (...) SELECT * FROM it;` da `it` nima?",
      options: ["Jadval", "Vaqtinchalik nom", "Ustun", "Baza"],
      correctAnswer: 1,
      explanation: "Natijaga berilgan nom."
    },
    {
      id: 6,
      question: "CTE ichida CTE ishlatsa bo'ladimi?",
      options: ["Yo'q", "Ha, zanjir qilib", "Faqat ikkita", "Hech qachon"],
      correctAnswer: 1,
      explanation: "Keyingisi oldingisiga tayanishi mumkin."
    },
    {
      id: 7,
      question: "CTE da agregat ishlaydimi?",
      options: ["Yo'q", "Ha (COUNT, SUM)", "Faqat COUNT", "Hech qachon"],
      correctAnswer: 1,
      explanation: "Vaqtinchalik natija ham jadvaldek so'raladi."
    },
    {
      id: 8,
      question: "Nega CTE ishlatiladi?",
      options: ["Tezlik uchun", "O'qilishi uchun (bosqichma-bosqich)", "Xavfsizlik uchun", "Hech qanday sababsiz"],
      correctAnswer: 1,
      explanation: "Ichma-ich qavslar o'rniga tartibli qadamlar."
    },
    {
      id: 9,
      question: "`WITH it AS (...) SELECT COUNT(*) AS soni FROM it;` (2 qator) nima qaytaradi?",
      options: ["2", "1", "0", "Xatolik"],
      correctAnswer: 0,
      explanation: "Vaqtinchalik natija sanaladi."
    },
    {
      id: 10,
      question: "CTE nomi takrorlansa nima bo'ladi?",
      options: ["Ishlaydi", "Xatolik beradi", "Birlashadi", "Eskisi qoladi"],
      correctAnswer: 1,
      explanation: "Bir so'rovda nom yagona bo'lishi kerak."
    },
    {
      id: 11,
      question: "CTE o'rniga nima ishlatsa bo'ladi (uzun yo'l)?",
      options: ["Hech narsa", "Ichma-ich subquery", "Faqat VIEW", "Faqat INDEX"],
      correctAnswer: 1,
      explanation: "Bir xil ishni qavs ichida ham yozsa bo'ladi."
    },
    {
      id: 12,
      question: "Uch bosqichli zanjirda oxirgi natija nimaga bog'liq?",
      options: ["Faqat birinchisiga", "Hamma bosqichga", "Hech biriga", "Faqat oxirgisiga"],
      correctAnswer: 1,
      explanation: "Zanjir uzilsa, natija buziladi."
    }
  ]
};
