export const sqlTransactions = {
  id: "sql_transactions",
  title: "SQL Transactions va ACID",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**Transaction (Tranzaksiya)** – bu ma'lumotlar bazasida bajariladigan bir nechta mantiqiy bog'liq operatsiyalarning yagona, bo'linmas (atomic) guruhidir. Agar guruhdagi barcha operatsiyalar muvaffaqiyatli yakunlansa, o'zgarishlar tasdiqlanadi (COMMIT). Agar bitta operatsiya bo'lsa ham xato qilsa, barcha o'zgarishlar bekor qilinib, oldingi holatiga qaytariladi (ROLLBACK).

Eng oddiy misol: Pul o'tkazmasi. 
Sizning hisobingizdan $100 yechiladi va do'stingiz hisobiga $100 qo'shiladi. Agar birinchi amal bajarilsa-yu, ikkinchisida xatolik chiqsa, siz $100 yo'qotasiz. Tranzaksiya shu kabi vaziyatlarning oldini olib, ikkala amalni yo birdaniga bajaradi, yoki umuman bajarmaydi.

**ACID tamoyillari:**
1. **A - Atomicity (Bo'linmaslik):** "Hammasi yoki hech narsa". Tranzaksiya qisman bajarilishi mumkin emas.
2. **C - Consistency (Muvofiqlik):** Tranzaksiyadan oldin va keyin MBdagi qoidalar va cheklovlar to'g'ri ishlashi shart.
3. **I - Isolation (Izolyatsiya):** Bir vaqtda bajarilayotgan tranzaksiyalar bir-biriga ta'sir qilmasligi kerak.
4. **D - Durability (Chidamlilik):** COMMIT bo'lgan o'zgarishlar hatto tizim o'chib qolsa ham saqlanib qoladi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON (Tranzaksiyalarni ishlatmaslik):**
\`\`\`sql
-- Bir-biriga bog'liq operatsiyalarni shunday tashlab ketish xavfli
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Agar shu yerda xato bo'lsa, 1-foydalanuvchi pulini yo'qotadi!
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
\`\`\`

**✅ YAXSHI (Tranzaksiya bilan ishlash):**
\`\`\`sql
BEGIN; -- Yoki BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- Hammasi joyida bo'lsa
-- Agar xatolik bo'lsa ROLLBACK; ishlatiladi.
\`\`\`

## 🎤 Intervyu Savollari

1. **ACID nima va u nima uchun kerak?**
   - *Javob*: Atomicity, Consistency, Isolation, Durability. MB da ishonchli va aniq ma'lumotlar saqlanishini ta'minlaydi, ayniqsa muhim operatsiyalarda (moliyaviy jarayonlar).
2. **COMMIT va ROLLBACK ning farqi nimada?**
   - *Javob*: COMMIT barcha o'zgarishlarni doimiy saqlaydi. ROLLBACK esa barcha o'zgarishlarni bekor qilib, bazani tranzaksiya boshlanmasdan oldingi holatiga qaytaradi.
3. **Dirty Read (Iflos o'qish) nima?**
   - *Javob*: Bitta tranzaksiya hali COMMIT qilinmagan o'zgarishlarni boshqa tranzaksiya tomonidan o'qilishi.
4. **Transaction Isolation Level lar qaysilar?**
   - *Javob*: Read Uncommitted, Read Committed, Repeatable Read, Serializable.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[BEGIN / START TRANSACTION] --> B[Operation 1]
    B --> C[Operation 2]
    C --> D{Xatolik bormi?}
    D -- Yo'q --> E[COMMIT]
    D -- Ha --> F[ROLLBACK]
    E --> G((Tugadi))
    F --> G
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Tranzaksiya boshlash",
      instruction: "Yangi tranzaksiya boshlash so'rovini qaytaruvchi `beginTransaction` funksiyasini yozing.",
      startingCode: "function beginTransaction() {\n  \n}",
      hint: "Odatda BEGIN; yoki START TRANSACTION; yoziladi. BEGIN; ni qaytaring.",
      solution: "function beginTransaction() {\n  return 'BEGIN;';\n}",
      test: "const fn = new Function(code + '; return beginTransaction;')();\nif (fn().trim().toUpperCase() !== 'BEGIN;') throw new Error('BEGIN; qaytarilmadi');"
    },
    {
      id: 2,
      title: "Tranzaksiyani tasdiqlash",
      instruction: "Tranzaksiyani muvaffaqiyatli yakunlovchi va o'zgarishlarni saqlovchi sql buyruqni qaytaruvchi `commitTransaction` funksiyasini yozing.",
      startingCode: "function commitTransaction() {\n  \n}",
      hint: "COMMIT; buyrug'i.",
      solution: "function commitTransaction() {\n  return 'COMMIT;';\n}",
      test: "const fn = new Function(code + '; return commitTransaction;')();\nif (fn().trim().toUpperCase() !== 'COMMIT;') throw new Error('COMMIT; qaytarilmadi');"
    },
    {
      id: 3,
      title: "Tranzaksiyani bekor qilish",
      instruction: "Xatolik yuz berganda barcha amallarni ortga qaytaruvchi buyruqni qaytaruvchi `rollbackTransaction` funksiyasini yozing.",
      startingCode: "function rollbackTransaction() {\n  \n}",
      hint: "ROLLBACK; buyrug'i kerak.",
      solution: "function rollbackTransaction() {\n  return 'ROLLBACK;';\n}",
      test: "const fn = new Function(code + '; return rollbackTransaction;')();\nif (fn().trim().toUpperCase() !== 'ROLLBACK;') throw new Error('ROLLBACK; qaytarilmadi');"
    },
    {
      id: 4,
      title: "Pul o'tkazmasi 1-qadam",
      instruction: "`withdrawMoney` funksiyasini yozing. U `accountId` va `amount` qabul qiladi. `accounts` jadvalida shu id dagi hisob balansidan (balance) berilgan miqdorni ayirib yozuvchi (UPDATE) so'rovni qaytarsin.",
      startingCode: "function withdrawMoney(accountId, amount) {\n  \n}",
      hint: "UPDATE accounts SET balance = balance - amount WHERE id = accountId;",
      solution: "function withdrawMoney(accountId, amount) {\n  return `UPDATE accounts SET balance = balance - ${amount} WHERE id = ${accountId};`;\n}",
      test: "const fn = new Function(code + '; return withdrawMoney;')();\nif (!fn(1, 100).toUpperCase().includes('BALANCE - 100')) throw new Error('Balansdan ayirish xato');"
    },
    {
      id: 5,
      title: "Pul o'tkazmasi 2-qadam",
      instruction: "`depositMoney` funksiyasini yozing. U `accountId` va `amount` qabul qiladi. Hisob raqamiga (balance) pul qoshuvchi UPDATE so'rovni qaytarsin.",
      startingCode: "function depositMoney(accountId, amount) {\n  \n}",
      hint: "UPDATE accounts SET balance = balance + amount WHERE id = accountId;",
      solution: "function depositMoney(accountId, amount) {\n  return `UPDATE accounts SET balance = balance + ${amount} WHERE id = ${accountId};`;\n}",
      test: "const fn = new Function(code + '; return depositMoney;')();\nif (!fn(2, 50).toUpperCase().includes('BALANCE + 50')) throw new Error('Balansga qo\\'shish xato');"
    },
    {
      id: 6,
      title: "To'liq tranzaksiya bloki",
      instruction: "`transferMoneyBlock` funksiyasini yozing (faqat sintaktik simulyatsiya). U BEGIN, ikkita UPDATE (1 id dan 100 ayirish, 2 id ga 100 qo'shish) va COMMIT so'rovlarini qatorma-qator qilib bitta stringda qaytarsin.",
      startingCode: "function transferMoneyBlock() {\n  // har bir buyruq orasida \\n ishlating\n}",
      hint: "BEGIN;\\nUPDATE...\\nUPDATE...\\nCOMMIT; formatida",
      solution: "function transferMoneyBlock() {\n  return `BEGIN;\\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\\nCOMMIT;`;\n}",
      test: "const fn = new Function(code + '; return transferMoneyBlock;')();\nconst res = fn().toUpperCase();\nif (!res.startsWith('BEGIN;') || !res.endsWith('COMMIT;')) throw new Error('BEGIN va COMMIT formatiga e\\'tibor bering');"
    },
    {
      id: 7,
      title: "Savepoint yaratish",
      instruction: "Tranzaksiya davomida qaytish nuqtasini belgilash uchun SAVEPOINT ishlatiladi. Argument sifatida savepoint nomini qabul qilib, `SAVEPOINT name;` qaytaruvchi `createSavepoint` funksiyasini yozing.",
      startingCode: "function createSavepoint(pointName) {\n  \n}",
      hint: "SAVEPOINT pointName;",
      solution: "function createSavepoint(pointName) {\n  return `SAVEPOINT ${pointName};`;\n}",
      test: "const fn = new Function(code + '; return createSavepoint;')();\nif (fn('sp1').toUpperCase() !== 'SAVEPOINT SP1;') throw new Error('SAVEPOINT xato');"
    },
    {
      id: 8,
      title: "Savepointga qaytish",
      instruction: "Muayyan savepointga qaytish buyrug'ini (ROLLBACK TO) qaytaruvchi `rollbackTo` funksiyasini yozing. U `pointName` argumentini oladi.",
      startingCode: "function rollbackTo(pointName) {\n  \n}",
      hint: "ROLLBACK TO pointName;",
      solution: "function rollbackTo(pointName) {\n  return `ROLLBACK TO ${pointName};`;\n}",
      test: "const fn = new Function(code + '; return rollbackTo;')();\nif (fn('sp1').toUpperCase() !== 'ROLLBACK TO SP1;') throw new Error('ROLLBACK TO xato');"
    },
    {
      id: 9,
      title: "Isolation Level - Read Committed",
      instruction: "Tranzaksiya izolyatsiya darajasini 'READ COMMITTED' qilib o'zgartiruvchi `setReadCommitted` funksiyasini yozing. (PostgreSQL standarti bo'yicha: `SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`)",
      startingCode: "function setReadCommitted() {\n  \n}",
      hint: "SET TRANSACTION ISOLATION LEVEL READ COMMITTED;",
      solution: "function setReadCommitted() {\n  return 'SET TRANSACTION ISOLATION LEVEL READ COMMITTED;';\n}",
      test: "const fn = new Function(code + '; return setReadCommitted;')();\nif (!fn().toUpperCase().includes('READ COMMITTED')) throw new Error('Xato isolation level');"
    },
    {
      id: 10,
      title: "Isolation Level - Serializable",
      instruction: "Eng qat'iy izolyatsiya darajasiga sozlash so'rovini qaytaruvchi `setSerializable` funksiyasini yozing. `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`",
      startingCode: "function setSerializable() {\n  \n}",
      hint: "SERIALIZABLE qilib sozlang.",
      solution: "function setSerializable() {\n  return 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;';\n}",
      test: "const fn = new Function(code + '; return setSerializable;')();\nif (!fn().toUpperCase().includes('SERIALIZABLE')) throw new Error('Xato so\\'rov');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Tranzaksiyaning ma'nosi nima?",
      options: ["Ma'lumotlarni o'chirish vositasi", "Bir nechta amallarni yagona, bo'linmas blok sifatida bajarish", "Faqat SELECT so'rovlari uchun qilingan limit", "Bazani arxivlash jarayoni"],
      correctAnswer: 1,
      explanation: "Tranzaksiya bir nechta mantiqiy bog'liq ishlarni bitta jarayon qilib o'raydi. Ular yo to'liq bajariladi, yo umuman bekor qilinadi."
    },
    {
      id: 2,
      question: "ACID qisqartmasi nimani anglatadi?",
      options: ["Atomic, Consistent, Isolated, Durable", "Array, Class, Integer, Double", "Access, Control, Identify, Delete", "Auto, Catch, Ignore, Drop"],
      correctAnswer: 0,
      explanation: "ACID – Atomicity, Consistency, Isolation, Durability so'zlaridan tashkil topgan."
    },
    {
      id: 3,
      question: "COMMIT amali qanday vazifani bajaradi?",
      options: ["Amallarni bekor qiladi", "So'rovdagi xatolarni to'g'rilaydi", "Tranzaksiya muvaffaqiyatli bo'lsa, o'zgarishlarni bazaga doimiy yozib qo'yadi", "Indeksni tozalaydi"],
      correctAnswer: 2,
      explanation: "COMMIT orqali qilingan barcha INSERT/UPDATE/DELETE o'zgarishlar rasman haqiqiy bazada saqlanadi."
    },
    {
      id: 4,
      question: "ROLLBACK amali nima qiladi?",
      options: ["Faqat so'nggi bitta yozuvni o'chiradi", "Tranzaksiya davomida qilingan barcha o'zgarishlarni bekor qilib, bazani dastlabki holatiga qaytaradi", "Tranzaksiyani davom ettiradi", "Barcha jadvallarni o'chirib yuboradi"],
      correctAnswer: 1,
      explanation: "ROLLBACK orqali xatolik bo'lgan paytda tranzaksiya ichidagi barcha o'zgarishlar ortga qaytariladi."
    },
    {
      id: 5,
      question: "SAVEPOINT nima uchun ishlatiladi?",
      options: ["Baza parolini saqlash uchun", "Baza ma'lumotlarini arxivlash (backup) uchun", "Tranzaksiya ichida qaytish nuqtasini belgilash uchun", "Boshqa bazaga ulanish uchun"],
      correctAnswer: 2,
      explanation: "SAVEPOINT yordamida uzun tranzaksiya ichida ma'lum nuqtalarni belgilab, faqat o'sha yergacha orqaga qaytish (ROLLBACK TO) mumkin."
    },
    {
      id: 6,
      question: "Atomicity (A) tamoyili nima?",
      options: ["Bir vaqtda bir nechta foydalanuvchi ishlashi", "Tranzaksiyadagi barcha amallar yo to'liq bajarilishi, yoki umuman bajarilmasligi", "Ma'lumotlar turini avtomatik aniqlash", "Xatolarni log faylga yozish"],
      correctAnswer: 1,
      explanation: "Atomicity (Bo'linmaslik) - tranzaksiya qismlarga bo'linmaydi. Bitta xato bo'lsa, qolgan bajarilganlari ham bekor bo'ladi."
    },
    {
      id: 7,
      question: "Isolation (I) tamoyili nima ma'no bildiradi?",
      options: ["Jadvallar o'zaro bog'lanmasligi", "Parol bilan izolyatsiya qilish", "Bir-biriga parallel ketayotgan tranzaksiyalar biri ikkinchisiga xalaqit bermasligi", "Ma'lumotlarni shifrlash"],
      correctAnswer: 2,
      explanation: "Har bir tranzaksiya o'zini shunday tutishi kerakki, go'yo tizimda u o'zi yagona ishlagandek bo'lsin. (Isolation)"
    },
    {
      id: 8,
      question: "Durability (D) xususiyati nima?",
      options: ["COMMIT qilinganidan so'ng bazaning serveri o'chib qolsa ham ma'lumot saqlanib qolishi", "Jadvallarning juda ko'p ma'lumot ololishi", "Turli OS larda ishlash", "Qattiq disklarni test qilish"],
      correctAnswer: 0,
      explanation: "Chidamlilik (Durability) — tizim ishdan chiqish holatlarida (masalan elektr o'chishi) ham commit bo'lgan ma'lumotlar diskda abadiy qolishini kafolatlaydi."
    },
    {
      id: 9,
      question: "Qaysi xolat `Dirty Read` deyiladi?",
      options: ["Eskirgan va keraksiz ma'lumotlarni o'qish", "Hali COMMIT qilinmagan o'zgarishlarni boshqa tranzaksiya o'qib olishi", "Parolsiz bazani o'qish", "O'chirilgan (deleted) ma'lumotlarni o'qish"],
      correctAnswer: 1,
      explanation: "Bir tranzaksiya yozayotgan, lekin hali yakunlamagan ma'lumotni 2-tranzaksiya o'qib olsa, bu `Iflos o'qish` (Dirty read) deyiladi."
    },
    {
      id: 10,
      question: "Eng qat'iy va sekin ishlaydigan Isolation Level qaysi?",
      options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      correctAnswer: 3,
      explanation: "Serializable eng xavfsiz va qat'iy izolyatsiya darajasidir, barcha tranzaksiyalarni to'liq navbat bilan (ketma-ket) bajarayotgandek cheklaydi, ammo ishlash tezligi (performance) tushib ketadi."
    },
    {
      id: 11,
      question: "Odatda ko'p RDBMS larda sukut bo'yicha (default) Isolation Level qaysi?",
      options: ["Read Uncommitted", "Read Committed", "Serializable", "None"],
      correctAnswer: 1,
      explanation: "Ko'pchilik ma'lumotlar bazalarida (PostgreSQL, SQL Server, Oracle) default izolyatsiya - READ COMMITTED bo'ladi."
    },
    {
      id: 12,
      question: "Deadlock (O'zaro qulf) nima?",
      options: ["Serverning internetdan uzilishi", "Ikkita tranzaksiya bir-birini kutib qolishi va jarayon to'xtab qolishi", "Ma'lumotni o'chirishning imkoni yo'qligi", "Commit qilishning man etilishi"],
      correctAnswer: 1,
      explanation: "Tranzaksiya A ni tugatish uchun B resurs kerak, Tranzaksiya B ni tugatish uchun esa A resurs kerak bo'lib, ikkisi bir-birini cheksiz kutib qolish holati Deadlock deyiladi."
    }
  ]
};
