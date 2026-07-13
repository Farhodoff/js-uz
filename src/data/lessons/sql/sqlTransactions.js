export const sqlTransactions = {
  id: "sql_transactions",
  title: "SQL Transactions va ACID",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

**Transaction (Tranzaksiya)** – bu bir nechta SQL buyruqlarni bitta bo'linmas (atomic) operatsiya sifatida guruhlash. Agar barcha buyruqlar muvaffaqiyatli yakunlansa, o'zgarishlar tasdiqlanadi (COMMIT). Agar bitta operatsiya xato qilsa ham, barcha o'zgarishlar bekor qilinib, baza dastlabki holatiga qaytadi (ROLLBACK).

**Analogi:** Do'kondan xarid qilish. 
Siz tovar uchun pul to'laysiz (sizning hisobingizdan pul yechiladi), do'kon egasi esa tovarni sizga beradi. Agar pul o'tsa-yu, tovar berilmasa (yoki aksincha), bu adolatsizlik bo'ladi. Tranzaksiya aynan shuni oldini oladi: yo ikkala amal ham to'liq bajariladi, yoki umuman hech qanday amal bajarilmaydi.

## 2. 🧠 Chuqur sho'ng'ish (Deep Dive)

### ACID Tamoyillari
1. **A - Atomicity (Bo'linmaslik):** "Hammasi yoki hech narsa". Tranzaksiya yarim-yorti bajarilmaydi. 
2. **C - Consistency (Muvofiqlik):** Tranzaksiyadan so'ng barcha cheklovlar (constraints) qoidalari bajarilishi kerak (masalan, balans manfiy bo'lib qolmasligi).
3. **I - Isolation (Izolyatsiya):** Bir vaqtda parallel ketayotgan tranzaksiyalar bir-biriga xalaqit bermaydi.
4. **D - Durability (Chidamlilik):** COMMIT bo'lgan o'zgarishlar tizim qulasa ham yo'qolmaydi (diskka mustahkam yoziladi).

### MVCC (Multi-Version Concurrency Control) PostgreSQL'da
PostgreSQL tranzaksiyalarni boshqarish uchun **MVCC** arxitekturasidan foydalanadi. Bu shuni anglatadiki, o'qish (SELECT) operatsiyalari yozish (UPDATE/DELETE) operatsiyalarini bloklamaydi va aksincha. Har bir tranzaksiya ma'lumotlarning o'ziga xos "snepshotini" (snapshot) ko'radi. UPDATE operatsiyasi eski qatorni o'chirmaydi, balki yangi versiyasini yaratadi (eski versiya VACUUM orqali tozalanmaguncha turadi).

### Isolation Levels (Izolyatsiya darajalari)
SQL standarti 4 xil izolyatsiya darajasini belgilaydi:
1. **Read Uncommitted:** Boshqa tranzaksiyadagi hali COMMIT qilinmagan o'zgarishlarni o'qish mumkin (Dirty Read).
2. **Read Committed:** Faqat COMMIT qilingan o'zgarishlarni o'qish mumkin. PostgreSQL da bu standart daraja (default).
3. **Repeatable Read:** Bitta tranzaksiya ichida bir xil qatorni qayta-qayta o'qish doim bir xil natija beradi (Non-repeatable read oldi olinadi).
4. **Serializable:** Eng qat'iy daraja. Tranzaksiyalar go'yo ketma-ket bajarilayotgandek ishlaydi. Phantom read'ni ham oldini oladi.

### Qulflar (Locks)
Tranzaksiyalar davomida qulflar avtomatik yoki qo'lda boshqarilishi mumkin.
- **Row-level locks:** Masalan, \\\`SELECT * FROM accounts FOR UPDATE;\\\` bir qatorni boshqa tranzaksiyalar o'zgartirmasligi uchun qulflaydi.
- **Deadlock:** Ikkita tranzaksiya bir-birini cheksiz kutib qoladigan holat. Buni oldini olish uchun resurslarni doim bir xil ketma-ketlikda qulflash tavsiya etiladi.

## 3. ⚠️ Edge Caselar va Senior Intervyu Savollari

1. **Deadlock nima va uni qanday hal qilish mumkin?**
   - *Javob:* Ikkita tranzaksiya o'zaro bir-birini bloklab qo'yishi. Hal qilish: Retry mantiqi (xatolik bo'lsa qaytadan urinish) yoki doim jadvallarga bir xil tartibda murojaat qilish. PostgreSQL avtomatik deadlocklarni aniqlab, bitta tranzaksiyani bekor qiladi.

2. **MVCC da "bloat" nima?**
   - *Javob:* Ko'plab UPDATE/DELETE lar oqibatida o'lik qatorlar (dead tuples) ko'payib ketishi. Buni oldini olish uchun Autovacuum ishlaydi.

3. **Dirty Read, Non-repeatable Read va Phantom Read farqlari?**
   - *Dirty Read:* Hali commit bo'lmagan datani o'qish.
   - *Non-repeatable Read:* Bitta tranzaksiya ichida 2 marta SELECT qilganda turli xil natija (commit bo'lgan update sababli).
   - *Phantom Read:* Bitta tranzaksiya ichida 2 marta SELECT qilganda yangi qator qo'shilganini (commit bo'lgan insert sababli) ko'rish.

## 📊 Jarayon (Mermaid Diagram)

\\\`\\\`\\\`mermaid
graph TD
    A[BEGIN TRANSACTION] --> B[Operation 1 - UPDATE]
    B --> C[Operation 2 - INSERT]
    C --> D{Xatolik bormi?}
    D -- Yoq --> E[COMMIT]
    D -- Ha --> F[ROLLBACK]
    E --> G((Tugadi))
    F --> G((Tugadi - O'zgarishlarsiz))
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Tranzaksiya boshlash",
      instruction: "Yangi tranzaksiya boshlash so'rovini qaytaruvchi `beginTransaction` funksiyasini yozing.",
      startingCode: "function beginTransaction() {\n  \n}",
      hint: "BEGIN; dan foydalaning.",
      solution: "function beginTransaction() {\n  return 'BEGIN;';\n}",
      test: "const fn = new Function(code + '; return beginTransaction;')();\nif (fn().trim().toUpperCase() !== 'BEGIN;') throw new Error('BEGIN; qaytarilmadi');"
    },
    {
      id: 2,
      title: "Tranzaksiyani tasdiqlash",
      instruction: "Tranzaksiyani muvaffaqiyatli yakunlovchi so'rovni qaytaruvchi `commitTransaction` funksiyasini yozing.",
      startingCode: "function commitTransaction() {\n  \n}",
      hint: "COMMIT; buyrug'i kerak.",
      solution: "function commitTransaction() {\n  return 'COMMIT;';\n}",
      test: "const fn = new Function(code + '; return commitTransaction;')();\nif (fn().trim().toUpperCase() !== 'COMMIT;') throw new Error('COMMIT; qaytarilmadi');"
    },
    {
      id: 3,
      title: "Tranzaksiyani bekor qilish",
      instruction: "Xatolik yuz berganda barcha amallarni ortga qaytaruvchi buyruqni qaytaruvchi `rollbackTransaction` funksiyasini yozing.",
      startingCode: "function rollbackTransaction() {\n  \n}",
      hint: "ROLLBACK; buyrug'idan foydalaning.",
      solution: "function rollbackTransaction() {\n  return 'ROLLBACK;';\n}",
      test: "const fn = new Function(code + '; return rollbackTransaction;')();\nif (fn().trim().toUpperCase() !== 'ROLLBACK;') throw new Error('ROLLBACK; qaytarilmadi');"
    },
    {
      id: 4,
      title: "Pul yechish (UPDATE)",
      instruction: "`withdrawMoney` funksiyasini yozing. U `accountId` va `amount` qabul qiladi. `accounts` jadvalidan (balance) berilgan miqdorni ayirib yozuvchi (UPDATE) so'rovni qaytarsin.",
      startingCode: "function withdrawMoney(accountId, amount) {\n  \n}",
      hint: "UPDATE accounts SET balance = balance - amount WHERE id = accountId;",
      solution: "function withdrawMoney(accountId, amount) {\n  return `UPDATE accounts SET balance = balance - ${amount} WHERE id = ${accountId};`;\n}",
      test: "const fn = new Function(code + '; return withdrawMoney;')();\nif (!fn(1, 100).toUpperCase().includes('BALANCE - 100')) throw new Error('Balansdan ayirish xato');"
    },
    {
      id: 5,
      title: "Pul tushirish (UPDATE)",
      instruction: "`depositMoney` funksiyasini yozing. U `accountId` va `amount` qabul qiladi. Hisobga (balance) pul qoshuvchi UPDATE so'rovni qaytarsin.",
      startingCode: "function depositMoney(accountId, amount) {\n  \n}",
      hint: "UPDATE accounts SET balance = balance + amount WHERE id = accountId;",
      solution: "function depositMoney(accountId, amount) {\n  return `UPDATE accounts SET balance = balance + ${amount} WHERE id = ${accountId};`;\n}",
      test: "const fn = new Function(code + '; return depositMoney;')();\nif (!fn(2, 50).toUpperCase().includes('BALANCE + 50')) throw new Error('Balansga qoshish xato');"
    },
    {
      id: 6,
      title: "Savepoint yaratish",
      instruction: "Tranzaksiya davomida qaytish nuqtasini belgilash uchun `createSavepoint` funksiyasini yozing. U parametr sifatida `name` qabul qiladi.",
      startingCode: "function createSavepoint(name) {\n  \n}",
      hint: "SAVEPOINT name;",
      solution: "function createSavepoint(name) {\n  return `SAVEPOINT ${name};`;\n}",
      test: "const fn = new Function(code + '; return createSavepoint;')();\nif (fn('sp1').toUpperCase() !== 'SAVEPOINT SP1;') throw new Error('SAVEPOINT xato');"
    },
    {
      id: 7,
      title: "Savepointga qaytish",
      instruction: "Muayyan savepointga qaytish buyrug'ini qaytaruvchi `rollbackTo` funksiyasini yozing. U `name` argumentini oladi.",
      startingCode: "function rollbackTo(name) {\n  \n}",
      hint: "ROLLBACK TO name;",
      solution: "function rollbackTo(name) {\n  return `ROLLBACK TO ${name};`;\n}",
      test: "const fn = new Function(code + '; return rollbackTo;')();\nif (fn('sp1').toUpperCase() !== 'ROLLBACK TO SP1;') throw new Error('ROLLBACK TO xato');"
    },
    {
      id: 8,
      title: "Read Committed darajasi",
      instruction: "Tranzaksiya izolyatsiya darajasini 'READ COMMITTED' qilib o'zgartiruvchi `setReadCommitted` funksiyasini yozing.",
      startingCode: "function setReadCommitted() {\n  \n}",
      hint: "SET TRANSACTION ISOLATION LEVEL READ COMMITTED;",
      solution: "function setReadCommitted() {\n  return 'SET TRANSACTION ISOLATION LEVEL READ COMMITTED;';\n}",
      test: "const fn = new Function(code + '; return setReadCommitted;')();\nif (!fn().toUpperCase().includes('READ COMMITTED')) throw new Error('Xato isolation level');"
    },
    {
      id: 9,
      title: "Serializable darajasi",
      instruction: "Eng qat'iy izolyatsiya darajasiga sozlash so'rovini qaytaruvchi `setSerializable` funksiyasini yozing.",
      startingCode: "function setSerializable() {\n  \n}",
      hint: "SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;",
      solution: "function setSerializable() {\n  return 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;';\n}",
      test: "const fn = new Function(code + '; return setSerializable;')();\nif (!fn().toUpperCase().includes('SERIALIZABLE')) throw new Error('Xato so\\'rov');"
    },
    {
      id: 10,
      title: "Qatorni qulflash (Row-level lock)",
      instruction: "`lockAccount` funksiyasini yozing. U `accountId` oladi va `SELECT * FROM accounts WHERE id = accountId FOR UPDATE;` qaytaradi.",
      startingCode: "function lockAccount(accountId) {\n  \n}",
      hint: "FOR UPDATE operatoridan foydalaning.",
      solution: "function lockAccount(accountId) {\n  return `SELECT * FROM accounts WHERE id = ${accountId} FOR UPDATE;`;\n}",
      test: "const fn = new Function(code + '; return lockAccount;')();\nif (!fn(5).toUpperCase().includes('FOR UPDATE')) throw new Error('FOR UPDATE yetishmayapti');"
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
