export const sqlTransactions = {
  id: "sqlTransactions",
  title: "Tranzaksiyalar (BEGIN, COMMIT, ROLLBACK)",
  language: "sql",
  dbSetup: "CREATE TABLE hisob (id INT, balans INT); INSERT INTO hisob VALUES (1,1000),(2,500);",
  theory: `## 1. Bu nima?

Tasavvur qiling, bankda pul o'tkazmasi bor. Ali 100 so'm yubormoqchi. Ikki ish bajarilishi kerak:
- Ali hisobidan 100 ayirish.
- Vali hisobiga 100 qo'shish.

Birinchisi bajarilib, ikkinchisi bajarilmasa-chi? Pul yo'qoladi! Ikkalasi bitta "paket" bo'lishi kerak.

Dasturlashda tranzaksiya (transaction) xuddi shu paket. Bir nechta amal birgalikda bajariladi. Hammasi bo'ladi yoki hech biri bo'lmaydi.

---

## 2. Nega kerak?

Pul o'tkazish dasturi ikkita alohida buyruq bilan yozilsa:

\`\`\`sql
UPDATE hisob SET balans = 900 WHERE id = 1;
UPDATE hisob SET balans = 600 WHERE id = 2;
\`\`\`

Birinchisi ishladi. Ikkinchisi xato berdi. Natija: pul yo'qoldi.

Muammo shunda: amallar yakka-yakka bajarilmoqda. Yechim — tranzaksiya paketi:

\`\`\`sql
BEGIN TRANSACTION;
UPDATE hisob SET balans = 900 WHERE id = 1;
UPDATE hisob SET balans = 600 WHERE id = 2;
COMMIT TRANSACTION;
\`\`\`

Paket birgalikda tasdiqlanadi.

---

## 3. Birinchi misol

Bu kod ikkita yangilashni bitta paketda bajaradi.

\`\`\`sql
BEGIN TRANSACTION; -- Paket boshlandi
UPDATE hisob SET balans = 900 WHERE id = 1; -- Birinchi amal
UPDATE hisob SET balans = 600 WHERE id = 2; -- Ikkinchi amal
COMMIT TRANSACTION; -- Paket tasdiqlandi
SELECT * FROM hisob; -- Tekshirildi
\`\`\`

\`\`\`text
// Natija:
[{"id":1,"balans":900},{"id":2,"balans":600}]
\`\`\`

---

## 4. Qator-baqator tahlil

- \`BEGIN TRANSACTION;\` — paket ochildi. Keyingi amallar paketga yoziladi.
- Ikkita \`UPDATE\` — paket ichida bajarildi.
- \`COMMIT TRANSACTION;\` — paket tasdiqlandi. O'zgarishlar kuchga kirdi.
- \`SELECT *\` — ikkalasi ham o'zgargan: 900 va 600.

---

## 5. Yana bitta misol

Bu kod bekor qilish yozuvini ko'rsatadi.

\`\`\`sql
BEGIN TRANSACTION; -- Paket boshlandi
UPDATE hisob SET balans = 0 WHERE id = 1; -- Sinov o'zgarishi
ROLLBACK TRANSACTION; -- Paket bekor qilindi
\`\`\`

\`\`\`text
// Natija: 1
\`\`\`

Qator-baqator tahlil:
- \`ROLLBACK TRANSACTION\` — "bekor qilish" degani. Paket ichidagilar qo'llanilmaydi.
- Haqiqiy bazalarda (PostgreSQL) ma'lumot eski holiga qaytadi.
- Eslatma: bu mashq muhiti soddalashtirilgan. Bu yerda ROLLBACK yozuvi qabul qilinadi.

---

## 5.1. ACID qoidasi

Tranzaksiyalar to'rtta kafolat beradi. Bosh harflaridan ACID so'zi chiqadi:

- **Atomicity (Bo'linmaslik)** — hamma amal bajariladi yoki hech biri bajarilmaydi.
- **Consistency (Muvofiqlik)** — baza har doim to'g'ri holatda qoladi.
- **Isolation (Ajratilganlik)** — ikki paket bir-biriga xalaqit bermaydi.
- **Durability (Bardoshlilik)** — tasdiqlangan paket o'chib ketmaydi.

---

## 6. Ko'p uchraydigan xatolar

### 1. COMMIT ni unutish
❌ Xato tushuncha:
\`\`\`sql
BEGIN TRANSACTION;
UPDATE hisob SET balans = 900 WHERE id = 1;
\`\`\`
Nima bo'ladi: xato bermaydi! Lekin paket ochiq qoladi. Tasdiqlanmagan o'zgarish boshqa ulanishlarga ko'rinmaydi. Har bir BEGIN ning COMMIT yoki ROLLBACK i bo'lishi kerak.
✅ To'g'ri variant:
\`\`\`sql
BEGIN TRANSACTION;
UPDATE hisob SET balans = 900 WHERE id = 1;
COMMIT TRANSACTION;
\`\`\`

### 2. Qisqa COMMIT yozish
❌ Xato kod:
\`\`\`sql
COMMIT;
\`\`\`
Nima bo'ladi: parse xatoligi yuz beradi. Bu muhitda to'liq yozuv kerak: \`COMMIT TRANSACTION\`.
✅ To'g'ri variant:
\`\`\`sql
COMMIT TRANSACTION;
\`\`\`

### 3. Bitta amal uchun paket ochish
❌ Xato tushuncha: har bir UPDATE uchun alohida BEGIN/COMMIT yozish kerak deb o'ylash.
Nima bo'ladi: xato bermaydi. Lekin keraksiz. Bitta amal o'zi yaxlit. Paket ikki va undan ko'p bog'liq amal uchun kerak.
✅ To'g'ri tushuncha: bog'liq amallar bitta paketda. Yakka amal paketsiz yoziladi.

---

## 7. Tekshiruv

### 1-mashq (Oson)
Tranzaksiya oching (\`BEGIN TRANSACTION;\`). Hech narsa o'zgartirmang. Yoping (\`COMMIT TRANSACTION;\`). Xato bermasligi kerak.

### 2-mashq (O'rtacha)
Paket ichida ikkita yangilash bajaring va tasdiqlang. Natijada 900 va 600 chiqishi kerak.

### 3-mashq (Chegara holat)
Paket oching, o'zgartiring, bekor qiling (\`ROLLBACK TRANSACTION;\`). Yozuv qabul qilinishi kerak.

### Javoblar:
1.
\`\`\`sql
BEGIN TRANSACTION;
COMMIT TRANSACTION;
\`\`\`
2.
\`\`\`sql
BEGIN TRANSACTION;
UPDATE hisob SET balans = 900 WHERE id = 1;
UPDATE hisob SET balans = 600 WHERE id = 2;
COMMIT TRANSACTION;
SELECT * FROM hisob;
\`\`\`
3.
\`\`\`sql
BEGIN TRANSACTION;
UPDATE hisob SET balans = 0 WHERE id = 1;
ROLLBACK TRANSACTION;
\`\`\`

---

## 8. Xulosa

1. Tranzaksiya — birgalikda bajariladigan amallar paketi.
2. \`BEGIN TRANSACTION\` ochadi. \`COMMIT TRANSACTION\` tasdiqlaydi. \`ROLLBACK TRANSACTION\` bekor qiladi.
3. ACID — bo'linmaslik, muvofiqlik, ajratilganlik, bardoshlilik kafolatlari.

Keyingi darsda: shartli qiymat (CASE) bilan tanishamiz.
`,
  exercises: [
    {
      id: 1,
      title: "1-Topshiriq: Paket ochish-yopish",
      instruction: "Bo'sh tranzaksiya paketi oching va yoping (BEGIN/COMMIT TRANSACTION). Xato bermasligi kerak.",
      startingCode: "BEGIN TRANSACTION;",
      hint: "COMMIT TRANSACTION; qo'shing.",
      solution: "BEGIN TRANSACTION; COMMIT TRANSACTION;",
      test: "if (!/\\bBEGIN\\s+TRANSACTION\\b/i.test(code)) return 'BEGIN TRANSACTION yozing';\nif (!/\\bCOMMIT\\s+TRANSACTION\\b/i.test(code)) return 'COMMIT TRANSACTION yozing';\nreturn null;"
    },
    {
      id: 2,
      title: "2-Topshiriq: Ikkita yangilash",
      instruction: "hisob jadvalidagi (id, balans) paket ichida yangilang: 1→900, 2→600. Tasdiqlang va o'qing.",
      startingCode: "BEGIN TRANSACTION;",
      hint: "UPDATE hisob SET balans = 900 WHERE id = 1;\nUPDATE hisob SET balans = 600 WHERE id = 2;\nCOMMIT TRANSACTION;\nSELECT * FROM hisob;",
      solution: "BEGIN TRANSACTION; UPDATE hisob SET balans = 900 WHERE id = 1; UPDATE hisob SET balans = 600 WHERE id = 2; COMMIT TRANSACTION; SELECT * FROM hisob;",
      test: "const m = {};\nresult.forEach(r => { m[r.id] = r.balans; });\nif (m[1] !== 900 || m[2] !== 600) return '900 va 600 chiqishi kerak';\nreturn null;"
    },
    {
      id: 3,
      title: "3-Topshiriq: Bekor qilish",
      instruction: "Paket oching, o'zgartiring, ROLLBACK TRANSACTION bilan bekor qiling. Yozuv qabul qilinishi kerak.",
      startingCode: "BEGIN TRANSACTION;",
      hint: "UPDATE hisob SET balans = 0 WHERE id = 1;\nROLLBACK TRANSACTION;",
      solution: "BEGIN TRANSACTION; UPDATE hisob SET balans = 0 WHERE id = 1; ROLLBACK TRANSACTION;",
      test: "if (!/\\bROLLBACK\\s+TRANSACTION\\b/i.test(code)) return 'ROLLBACK TRANSACTION yozing';\nreturn null;"
    },
    {
      id: 4,
      title: "4-Topshiriq: Qisqa COMMIT xatosi",
      instruction: "`COMMIT;` xato bermoqda. To'liq yozuvga tuzating (`COMMIT TRANSACTION;`).",
      startingCode: "BEGIN TRANSACTION;\nUPDATE hisob SET balans = 900 WHERE id = 1;\nCOMMIT;",
      hint: "COMMIT TRANSACTION;",
      solution: "BEGIN TRANSACTION; UPDATE hisob SET balans = 900 WHERE id = 1; COMMIT TRANSACTION; SELECT * FROM hisob;",
      test: "if (!/\\bCOMMIT\\s+TRANSACTION\\b/i.test(code)) return 'COMMIT TRANSACTION deb yozing';\nconst m = {};\nresult.forEach(r => { m[r.id] = r.balans; });\nif (m[1] !== 900) return '900 chiqishi kerak';\nreturn null;"
    },
    {
      id: 5,
      title: "5-Topshiriq: Balans tekshiruvi (chegara)",
      instruction: "Faqat 2-id ni 600 ga yangilang (paket ichida). 1-id 1000 ligicha qolishi kerak.",
      startingCode: "BEGIN TRANSACTION;",
      hint: "UPDATE hisob SET balans = 600 WHERE id = 2;\nCOMMIT TRANSACTION;\nSELECT * FROM hisob;",
      solution: "BEGIN TRANSACTION; UPDATE hisob SET balans = 600 WHERE id = 2; COMMIT TRANSACTION; SELECT * FROM hisob;",
      test: "const m = {};\nresult.forEach(r => { m[r.id] = r.balans; });\nif (m[1] !== 1000 || m[2] !== 600) return '1000 va 600 chiqishi kerak';\nreturn null;"
    },
    {
      id: 6,
      title: "6-Topshiriq: ACID harfi (chegara)",
      instruction: "Tranzaksiya ichida ikkala qatorni o'qing. 1000 va 500 chiqishi kerak (o'zgarishsiz).",
      startingCode: "BEGIN TRANSACTION;",
      hint: "SELECT * FROM hisob;\nCOMMIT TRANSACTION;",
      solution: "BEGIN TRANSACTION; SELECT * FROM hisob; COMMIT TRANSACTION;",
      test: "if (!/\\bBEGIN\\s+TRANSACTION\\b/i.test(code)) return 'BEGIN TRANSACTION yozing';\nif (!/\\bCOMMIT\\s+TRANSACTION\\b/i.test(code)) return 'COMMIT TRANSACTION yozing';\nreturn null;"
    },
    {
      id: 7,
      title: "7-Topshiriq: Ketma-ket paketlar (chegara)",
      instruction: "Ikkita alohida paket bajaring: birinchida 1→900, ikkinchisida 2→600. Oxirida o'qing.",
      startingCode: "BEGIN TRANSACTION;",
      hint: "UPDATE hisob SET balans = 900 WHERE id = 1;\nCOMMIT TRANSACTION;\nBEGIN TRANSACTION;\nUPDATE hisob SET balans = 600 WHERE id = 2;\nCOMMIT TRANSACTION;\nSELECT * FROM hisob;",
      solution: "BEGIN TRANSACTION; UPDATE hisob SET balans = 900 WHERE id = 1; COMMIT TRANSACTION; BEGIN TRANSACTION; UPDATE hisob SET balans = 600 WHERE id = 2; COMMIT TRANSACTION; SELECT * FROM hisob;",
      test: "const m = {};\nresult.forEach(r => { m[r.id] = r.balans; });\nif (m[1] !== 900 || m[2] !== 600) return '900 va 600 chiqishi kerak';\nreturn null;"
    },
    {
      id: 8,
      title: "8-Topshiriq: O'qish paketi (chegara)",
      instruction: "Faqat o'qishdan iborat paket yozing (BEGIN, SELECT, COMMIT). 2 qator chiqishi kerak.",
      startingCode: "BEGIN TRANSACTION;",
      hint: "SELECT * FROM hisob;\nCOMMIT TRANSACTION;",
      solution: "BEGIN TRANSACTION; SELECT * FROM hisob; COMMIT TRANSACTION;",
      test: "if (!/\\bBEGIN\\s+TRANSACTION\\b/i.test(code)) return 'BEGIN TRANSACTION yozing';\nif (!/\\bCOMMIT\\s+TRANSACTION\\b/i.test(code)) return 'COMMIT TRANSACTION yozing';\nreturn null;"
    },
    {
      id: 9,
      title: "9-Topshiriq: Bekor + o'qish (chegara)",
      instruction: "Paketda o'zgartirib, bekor qiling. Keyin alohida o'qing (2 qator chiqishi kerak).",
      startingCode: "BEGIN TRANSACTION;",
      hint: "UPDATE hisob SET balans = 0 WHERE id = 1;\nROLLBACK TRANSACTION;\nSELECT * FROM hisob;",
      solution: "BEGIN TRANSACTION; UPDATE hisob SET balans = 0 WHERE id = 1; ROLLBACK TRANSACTION; SELECT * FROM hisob;",
      test: "if (result.length !== 2) return '2 qator chiqishi kerak';\nreturn null;"
    },
    {
      id: 10,
      title: "10-Topshiriq: To'liq pul o'tkazma (chegara)",
      instruction: "1-id dan 100 ayirib, 2-id ga 100 qo'shing (900 va 600). Paketda bajaring.",
      startingCode: "BEGIN TRANSACTION;",
      hint: "UPDATE hisob SET balans = 900 WHERE id = 1;\nUPDATE hisob SET balans = 600 WHERE id = 2;\nCOMMIT TRANSACTION;\nSELECT * FROM hisob;",
      solution: "BEGIN TRANSACTION; UPDATE hisob SET balans = 900 WHERE id = 1; UPDATE hisob SET balans = 600 WHERE id = 2; COMMIT TRANSACTION; SELECT * FROM hisob;",
      test: "const m = {};\nresult.forEach(r => { m[r.id] = r.balans; });\nif (m[1] !== 900 || m[2] !== 600) return '900 va 600 chiqishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Tranzaksiya nima?",
      options: ["Bitta so'rov", "Birgalikda bajariladigan amallar paketi", "Jadval turi", "Xato turi"],
      correctAnswer: 1,
      explanation: "Hammasi bo'ladi yoki hech biri bo'lmaydi."
    },
    {
      id: 2,
      question: "Paket qanday ochiladi?",
      options: ["OPEN", "BEGIN TRANSACTION", "START", "BEGIN"],
      correctAnswer: 1,
      explanation: "Paket BEGIN TRANSACTION bilan ochiladi."
    },
    {
      id: 3,
      question: "Paket qanday tasdiqlanadi?",
      options: ["COMMIT", "COMMIT TRANSACTION", "END", "SAVE"],
      correctAnswer: 1,
      explanation: "Bu muhitda to'liq yozuv kerak."
    },
    {
      id: 4,
      question: "Paket qanday bekor qilinadi?",
      options: ["CANCEL", "ROLLBACK TRANSACTION", "DELETE", "STOP"],
      correctAnswer: 1,
      explanation: "Bekor qilish buyrug'i shu."
    },
    {
      id: 5,
      question: "ACID dagi A nimani bildiradi?",
      options: ["Tezlik", "Bo'linmaslik (Atomicity)", "Avtomatik", "Aloqa"],
      correctAnswer: 1,
      explanation: "Hamma amal yoki hech biri."
    },
    {
      id: 6,
      question: "Nega pul o'tkazma paketda bajariladi?",
      options: ["Tezroq bo'lgani uchun", "Yarim holatda pul yo'qolmasligi uchun", "Qisqaroq yozilgani uchun", "Hech qanday sababsiz"],
      correctAnswer: 1,
      explanation: "Biri bajarilib, biri qolib ketsa pul yo'qoladi."
    },
    {
      id: 7,
      question: "COMMIT unutilsa nima bo'ladi?",
      options: ["Hammasi saqlanadi", "Paket ochiq qoladi", "Xatolik beradi", "Hech narsa bo'lmaydi"],
      correctAnswer: 1,
      explanation: "Tasdiqlanmagan paket yakunlanmaydi."
    },
    {
      id: 8,
      question: "Bitta yakka UPDATE uchun paket kerakmi?",
      options: ["Ha, har doim", "Yo'q, o'zi yaxlit", "Faqat kechasi", "Hech qachon"],
      correctAnswer: 1,
      explanation: "Paket bog'liq amallar uchun."
    },
    {
      id: 9,
      question: "ACID dagi D nimani bildiradi?",
      options: ["Tezlik", "Bardoshlilik (Durability)", "Kattalik", "Davomiylik"],
      correctAnswer: 1,
      explanation: "Tasdiqlangan paket o'chib ketmaydi."
    },
    {
      id: 10,
      question: "`BEGIN TRANSACTION; UPDATE hisob SET balans = 900 WHERE id = 1; COMMIT TRANSACTION;` dan keyin 1-id balansi necha?",
      options: ["1000", "900", "0", "Xatolik"],
      correctAnswer: 1,
      explanation: "Paket tasdiqlandi. O'zgarish kuchga kirdi."
    },
    {
      id: 11,
      question: "Isolation (ajratilganlik) nimani bildiradi?",
      options: ["Tezlikni", "Paketlar bir-biriga xalaqit bermasligini", "Kattalikni", "Hech narsani"],
      correctAnswer: 1,
      explanation: "Parallel paketlar ajratilgan ishlaydi."
    },
    {
      id: 12,
      question: "ROLLBACK qachon ishlatiladi?",
      options: ["Har doim", "Xato bo'lganda bekor qilish uchun", "Tezlashtirish uchun", "Hech qachon"],
      correctAnswer: 1,
      explanation: "Muammo chiqsa, paket bekor qilinadi."
    }
  ]
};
