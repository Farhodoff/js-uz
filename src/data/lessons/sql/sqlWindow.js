export const sqlWindow = {
  id: "sqlWindow",
  title: "Qator Raqamlash (Window)",
  language: "sql",
  dbSetup: "CREATE TABLE hodimlar (id INT, ism STRING, bolim STRING, oylik INT); INSERT INTO hodimlar VALUES (1,'Ali','IT',500),(2,'Vali','IT',700),(3,'Guli','HR',400);",
  theory: `## 1. Bu nima?

Tasavvur qiling, musobaqa bor. Hakam natijalarni e'lon qiladi: "1-o'rin — Vali, 2-o'rin — Ali, 3-o'rin — Guli." Har bir qatnashchi yonida uning tartib raqami turadi. Qatorlar o'chirilmaydi. Faqat raqam qo'shiladi.

Dasturlashda window funksiya xuddi shu hakam. Har qatorga hisoblab chiqarilgan qiymat qo'shadi.

Window funksiya — qatorlarni o'chirmasdan, har biriga hisoblab chiqarilgan qiymat qo'shadigan buyruqdir. Asosiysi: \`ROW_NUMBER\`.

---

## 2. Nega kerak?

Xodimlar ro'yxati bor. Har biriga tartib raqami kerak. Qo'lda yozib bo'lmaydi — qatorlar o'zgarib turadi.

Muammo shunda: raqamlash avtomatik bo'lishi kerak. Yechim — window:

\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;
\`\`\`

Har qator yonida uning raqami turadi.

---

## 3. Birinchi misol

Bu kod oylik bo'yicha kamayish tartibida raqamlaydi.

\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);
\`\`\`

\`\`\`text
// Natija:
[{"ism":"Vali","orin":1},{"ism":"Ali","orin":2},{"ism":"Guli","orin":3}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`(SELECT * FROM hodimlar ORDER BY oylik DESC)\` — ichki so'rov. Avval saralaydi: Vali, Ali, Guli.
- \`ROW_NUMBER() OVER ()\` — tayyor tartibni raqamlaydi. Birinchi qatorga 1, ikkinchisiga 2.
- \`AS orin\` — yangi ustun nomi.
- Ikkita qism birga ishlaydi: saralash + raqamlash.

---

## 5. Yana bitta misol

Bu kod o'sish tartibida raqamlaydi.

\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik);
\`\`\`

\`\`\`text
// Natija:
[{"ism":"Guli","orin":1},{"ism":"Ali","orin":2},{"ism":"Vali","orin":3}]
\`\`\`

Qator-baqator tahlil:
- Ichki so'rov o'sish tartibida saraladi: Guli, Ali, Vali.
- Raqamlash shu tartibda beriladi.

---

## 5.1. Filtrlangan raqamlash

Faqat bir bo'lim raqamlanadi:

\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar WHERE bolim = 'IT' ORDER BY oylik DESC);
\`\`\`

\`\`\`text
// Natija:
[{"ism":"Vali","orin":1},{"ism":"Ali","orin":2}]
\`\`\`

Qator-baqator tahlil:
- Ichki so'rov avval filtrlaydi (faqat IT), keyin saralaydi.
- Raqamlash tayyor ro'yxatga beriladi.

---

## 6. Ko'p uchraydigan xatolar

### 1. OVER ni unutish
❌ Xato kod:
\`\`\`sql
SELECT ism, ROW_NUMBER() FROM hodimlar;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin g'alati ustunlar chiqadi (\`ROW_NUMBER()\` nomli keraksiz kalit). Raqamlash ishlamaydi. OVER bo'lmasa, funksiya ishlamaydi.
✅ To'g'ri variant:
\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;
\`\`\`

### 2. Qavsni unutish
❌ Xato kod:
\`\`\`sql
SELECT ism, ROW_NUMBER OVER () AS orin FROM hodimlar;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Funksiya nomi yonida bo'sh qavs bo'lishi shart.
✅ To'g'ri variant:
\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;
\`\`\`

### 3. Saralamasdan raqamlash
❌ Xato tushuncha:
\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin raqamlar jadval tartibida beriladi (Ali 1, Vali 2). Reyting uchun avval saralash kerak.
✅ To'g'ri variant:
\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);
\`\`\`

---

## 7. Tekshiruv

### 1-mashq (Oson)
Kamayish tartibida raqamlang. Birinchi Vali chiqishi kerak.

### 2-mashq (O'rtacha)
O'sish tartibida raqamlang. Birinchi Guli chiqishi kerak.

### 3-mashq (Chegara holat)
Faqat IT ni kamayish tartibida raqamlang (Vali 1, Ali 2).

### Javoblar:
1.
\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);
\`\`\`
2.
\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik);
\`\`\`
3.
\`\`\`sql
SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar WHERE bolim = 'IT' ORDER BY oylik DESC);
\`\`\`

---

## 8. Xulosa

1. Window funksiya qatorlarni o'chirmasdan yangi qiymat qo'shadi.
2. \`ROW_NUMBER()\` har doim \`OVER\` bilan yoziladi.
3. Reyting uchun avval ichki so'rovda saralanadi, keyin raqamlanadi.

Keyingi darsda: xavfsizlik — SQL inyeksiyadan himoyalanish bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Kamayish reytingi",
      instruction: "hodimlar jadvalidan (id, ism, bolim, oylik) oylik bo'yicha kamayish tartibida raqamlang. Birinchi Vali chiqishi kerak.",
      startingCode: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);",
      test: "if (!/\\bOVER\\b/i.test(code)) return 'OVER yozing';\nif (result[0].ism !== 'Vali' || result[0].orin !== 1) return 'Birinchi Vali (1) bolishi kerak';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: O'sish reytingi",
      instruction: "O'sish tartibida raqamlang. Birinchi Guli chiqishi kerak.",
      startingCode: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik);",
      test: "if (result[0].ism !== 'Guli' || result[0].orin !== 1) return 'Birinchi Guli (1) bolishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Oddiy raqamlash",
      instruction: "Tartibsiz raqamlang. Uchala qator chiqishi kerak.",
      startingCode: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: OVER qo'shish",
      instruction: "Quyidagi xatoni tuzating: OVER tushib qolgan (bo'sh natija chiqmoqda).",
      startingCode: "SELECT ism, ROW_NUMBER() FROM hodimlar;",
      hint: "OVER () qo'shing.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;",
      test: "if (!/\\bOVER\\b/i.test(code)) return 'OVER qoshing';\nif (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Qavs qo'shish",
      instruction: "Quyidagi xatoni tuzating: funksiya qavssiz yozilgan.",
      startingCode: "SELECT ism, ROW_NUMBER OVER () AS orin FROM hodimlar;",
      hint: "ROW_NUMBER() deb yozing.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: Faqat IT (chegara)",
      instruction: "Faqat IT xodimlarni kamayish tartibida raqamlang (Vali 1, Ali 2).",
      startingCode: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar WHERE bolim = 'IT' ORDER BY oylik DESC);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar WHERE bolim = 'IT' ORDER BY oylik DESC);",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak';\nif (result[0].ism !== 'Vali') return 'Birinchi Vali bolishi kerak';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Ali o'rni (chegara)",
      instruction: "Kamayish tartibida Ali nechanchi o'rinda? So'rov bilan toping (2 chiqishi kerak — Ali qatorining orin qiymati).",
      startingCode: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);",
      hint: "Natijada Alini toping.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);",
      test: "const ali = result.filter(r => r.ism === 'Ali');\nif (ali.length !== 1 || ali[0].orin !== 2) return 'Ali 2 bolishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: HR ichida (chegara)",
      instruction: "Faqat HR xodimni raqamlang (Guli 1 chiqishi kerak).",
      startingCode: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar WHERE bolim = 'HR');",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar WHERE bolim = 'HR');",
      test: "if (result.length !== 1 || result[0].orin !== 1) return 'Guli 1 bolishi kerak';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Hamma ustun (chegara)",
      instruction: "Hamma ustun + tartib raqamini chiqaring. 3 qator chiqishi kerak.",
      startingCode: "SELECT *, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);",
      hint: "Tayyor ko'rinadi — bajaring.",
      solution: "SELECT *, ROW_NUMBER() OVER () AS orin FROM (SELECT * FROM hodimlar ORDER BY oylik DESC);",
      test: "if (result.length !== 3) return '3 qator chiqishi kerak';\nif (!('orin' in result[0]) && result[0].orin === undefined) return 'orin ustuni kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: Saralamasdan (chegara)",
      instruction: "Saralamasdan raqamlang. Birinchi qator Ali bo'lishini tasdiqlang (jadval tartibi).",
      startingCode: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;",
      hint: "Natijada birinchi qatorni tekshiring.",
      solution: "SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;",
      test: "if (result[0].ism !== 'Ali' || result[0].orin !== 1) return 'Birinchi Ali (1) bolishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Window funksiya nimani qiladi?",
      options: ["Qatorlarni o'chiradi", "Har qatorga hisoblangan qiymat qo'shadi", "Jadval yaratadi", "Hech narsa qilmaydi"],
      correctAnswer: 1,
      explanation: "Qatorlar qoladi. Yoniga yangi ustun qo'shiladi."
    },
    {
      id: 2,
      question: "Reyting uchun qanday yoziladi?",
      options: ["Faqat ROW_NUMBER()", "Ichki so'rovda saralab, keyin raqamlash", "Faqat ORDER BY", "Hech qanday"],
      correctAnswer: 1,
      explanation: "Avval saralanadi, keyin raqamlanadi."
    },
    {
      id: 3,
      question: "`SELECT ism, ROW_NUMBER() FROM hodimlar;` (OVER siz) nima qiladi?",
      options: ["To'g'ri raqamlaydi", "G'alati ustunlar chiqaradi", "Bo'sh qaytaradi", "Hammasini 1 qiladi"],
      correctAnswer: 1,
      explanation: "OVER bo'lmasa, raqamlash ishlamaydi. Keraksiz kalit chiqadi."
    },
    {
      id: 4,
      question: "`SELECT ism, ROW_NUMBER OVER () AS orin FROM hodimlar;` nima qiladi?",
      options: ["Ishlaydi", "Parse xatoligi beradi", "Bo'sh qaytaradi", "Hammasini 0 qiladi"],
      correctAnswer: 1,
      explanation: "Funksiya nomi yonida bo'sh qavs bo'lishi shart."
    },
    {
      id: 5,
      question: "`SELECT ism, ROW_NUMBER() OVER () AS orin FROM hodimlar;` (Ali, Vali, Guli) nima qaytaradi?",
      options: ["Tartibsiz raqamlar", "Ali 1, Vali 2, Guli 3", "Hammasi 1", "Xatolik"],
      correctAnswer: 1,
      explanation: "Jadval tartibida raqamlanadi."
    },
    {
      id: 6,
      question: "Kamayish reytingida birinchi kim chiqadi? (Ali 500, Vali 700, Guli 400)",
      options: ["Ali", "Vali", "Guli", "Hech kim"],
      correctAnswer: 1,
      explanation: "Eng katta oylik birinchi: Vali."
    },
    {
      id: 7,
      question: "O'sish reytingida birinchi kim chiqadi?",
      options: ["Vali", "Ali", "Guli", "Hech kim"],
      correctAnswer: 2,
      explanation: "Eng kichik oylik birinchi: Guli."
    },
    {
      id: 8,
      question: "Faqat IT ni raqamlasak (Vali 700, Ali 500) nima chiqadi?",
      options: ["Vali 1, Ali 2", "Ali 1, Vali 2", "Faqat Vali", "Xatolik"],
      correctAnswer: 0,
      explanation: "Kamayishda Vali birinchi."
    },
    {
      id: 9,
      question: "HR da bitta xodim bo'lsa, uning o'rni nima bo'ladi?",
      options: ["0", "1", "Davom etadi", "Xatolik"],
      correctAnswer: 1,
      explanation: "Bitta qator — birinchi o'rin."
    },
    {
      id: 10,
      question: "`SELECT *, ROW_NUMBER() OVER () AS orin FROM ...` nechta ustun qaytaradi?",
      options: ["Faqat orin", "Hammasi + orin", "Faqat eskilar", "Xatolik"],
      correctAnswer: 1,
      explanation: "* hammasi, orin qo'shimcha."
    },
    {
      id: 11,
      question: "OVER ichida nima yoziladi?",
      options: ["Jadval nomi", "Bo'sh qavs (bu muhitda)", "Hech narsa", "Faqat nuqta-vergul"],
      correctAnswer: 1,
      explanation: "Tartib ichki so'rovda beriladi."
    },
    {
      id: 12,
      question: "Saralamasdan raqamlansa birinchi kim chiqadi? (Ali, Vali, Guli kiritilgan)",
      options: ["Vali", "Ali", "Guli", "Tasodifiy"],
      correctAnswer: 1,
      explanation: "Jadval tartibi saqlanadi."
    }
  ]
};
