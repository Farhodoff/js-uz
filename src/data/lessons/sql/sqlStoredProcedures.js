export const sqlStoredProcedures = {
  id: "sql_stored_procedures",
  title: "SQL Stored Procedures",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**Stored Procedure (Saqlangan Protsedura)** – bu ma'lumotlar bazasining o'zida saqlanadigan va qayta-qayta chaqirib ishlatish mumkin bo'lgan oldindan yozilgan SQL kodlar to'plami. Buni xuddi dasturlash tillaridagi funksiyalarga o'xshatish mumkin.

Siz bir nechta qadamdan iborat murakkab SQL so'rovlarini dasturiy kodingizda (masalan, Node.js yoki Python) qayta-qayta yozmasdan, bittagina Protsedura orqali bajarishingiz mumkin. Bu nafaqat kodni toza saqlaydi, balki tarmoq (network) trafigini tejaydi va tezlikni (performance) oshiradi.

Afzalliklari:
1. **Tezlik**: DB server protsedurani bir marta kompilyatsiya qilib, reja (execution plan) ni keshlashadi.
2. **Xavfsizlik**: SQL Injection hujumlariga qarshi tabiiy himoya beradi, foydalanuvchilarga jadvallarga to'g'ridan-to'g'ri ruxsat bermasdan, faqat protsedurani ishga tushirish huquqini berish mumkin.
3. **Qayta foydalanish (Reusability)**: Bir xil mantiqni turli dasturlardan (Web, Mobile) turib bitta joydan chaqirish mumkin.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON (Mantiqni dastur tomonida qilish - har bir so'rov alohida tarmoqdan borib keladi):**
\`\`\`javascript
// Backend dan 3 marta so'rov jo'natish - tarmoq trafigi oshadi
await db.query("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
await db.query("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
await db.query("INSERT INTO logs (message) VALUES ('Transfer completed')");
\`\`\`

**✅ YAXSHI (Hammasini Stored Procedure ichida qilish, backend faqat 1 marta chaqiradi):**
\`\`\`sql
-- Baza tomonida oldindan saqlab qo'yilgan protsedura
CREATE PROCEDURE TransferMoney(IN sender_id INT, IN receiver_id INT, IN amount DECIMAL)
BEGIN
    UPDATE accounts SET balance = balance - amount WHERE id = sender_id;
    UPDATE accounts SET balance = balance + amount WHERE id = receiver_id;
    INSERT INTO logs (message) VALUES ('Transfer completed');
END;
\`\`\`
\`\`\`javascript
// Backend dan 1 marta chaqiramiz
await db.query("CALL TransferMoney(1, 2, 100)");
\`\`\`

## 🎤 Intervyu Savollari

1. **Stored Procedure va Function farqi nimada?**
   - *Javob*: Function doim qiymat qaytarishi shart (RETURN) va u SELECT so'rovi ichida ishlatilishi mumkin (\`SELECT myFunction()\` kabi). Stored Procedure qiymat qaytarishi shart emas (OUT parametrlar bo'lishi mumkin) va uni faqat \`CALL\` yoki \`EXEC\` orqali ishga tushiriladi. Procedure ichida Tranzaksiya (COMMIT/ROLLBACK) ishlatish mumkin, ko'p joylarda function ichida bunga ruxsat yo'q.
2. **Protseduralar qanday qilib SQL Injection'dan himoya qiladi?**
   - *Javob*: Protseduralarga yuborilgan parametrlar to'g'ridan-to'g'ri so'rov matniga (string) qo'shilmaydi. DB dvigateli parametrlarni amallar qatori sifatida emas, balki aniq ma'lumot (data) sifatida qayta ishlaydi.
3. **Stored Procedure'ning kamchiligi nimada?**
   - *Javob*: Ma'lumotlar bazasi dvigateliga qattiq bog'lanib qoladi (Vendor lock-in). Masalan, Oracle'dagi PL/SQL kodini MySQL ga to'g'ridan-to'g'ri ko'chirib o'tkazish qiyin. Versiyani boshqarish (Version Control) ham biroz murakkab bo'lishi mumkin.

## 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
sequenceDiagram
    participant App as Backend App
    participant DB as Database Engine
    
    App->>DB: CALL CreateUser('Ali', 'ali@test.com')
    activate DB
    DB->>DB: INSERT INTO users ...
    DB->>DB: INSERT INTO audit_logs ...
    DB-->>App: OK (Success)
    deactivate DB
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "CALL buyrug'i",
      instruction: "Protsedurani qanday ishga tushirishni yozing. `getUser(1)` protsedurasini chaqiruvchi SQL so'rovini qaytaruvchi `callProcedure` funksiyasini yozing.",
      startingCode: "function callProcedure() {\n  \n}",
      hint: "CALL protsedura_nomi(parametr);",
      solution: "function callProcedure() {\n  return 'CALL getUser(1);';\n}",
      test: "const fn = new Function(code + '; return callProcedure;')();\nif (!fn().toUpperCase().includes('CALL GETUSER(1)')) throw new Error('CALL xato');"
    },
    {
      id: 2,
      title: "Oddiy protsedura yaratish",
      instruction: "Hech qanday argument qabul qilmaydigan `SayHello` nomli protsedurani yaratish SQL skriptini qaytaruvchi `createSayHello` funksiyasini yozing. (PostgreSQL yoki MySQL uslubida, oddiy `CREATE PROCEDURE SayHello() AS $$ BEGIN END; $$ LANGUAGE plpgsql;` kabi, lekin bu yerda simulyatsiya uchun `CREATE PROCEDURE SayHello() BEGIN SELECT 1; END;` qaytarsangiz bo'ladi).",
      startingCode: "function createSayHello() {\n  \n}",
      hint: "CREATE PROCEDURE SayHello() BEGIN SELECT 1; END;",
      solution: "function createSayHello() {\n  return 'CREATE PROCEDURE SayHello() BEGIN SELECT 1; END;';\n}",
      test: "const fn = new Function(code + '; return createSayHello;')();\nif (!fn().toUpperCase().includes('CREATE PROCEDURE SAYHELLO()')) throw new Error('CREATE PROCEDURE xato');"
    },
    {
      id: 3,
      title: "Parametrli protsedura (IN)",
      instruction: "MySQL sintaksisi bo'yicha: `CREATE PROCEDURE GetUserById(IN userId INT) BEGIN SELECT * FROM users WHERE id = userId; END;` - shuni qaytaruvchi funksiya yozing.",
      startingCode: "function createGetUser() {\n  \n}",
      hint: "Matnni xatosiz qaytaring.",
      solution: "function createGetUser() {\n  return 'CREATE PROCEDURE GetUserById(IN userId INT) BEGIN SELECT * FROM users WHERE id = userId; END;';\n}",
      test: "const fn = new Function(code + '; return createGetUser;')();\nif (!fn().includes('IN userId INT')) throw new Error('Parametr qismi xato');"
    },
    {
      id: 4,
      title: "OUT parametrli protsedura",
      instruction: "MySQL uslubida: `CREATE PROCEDURE GetCount(OUT total INT) BEGIN SELECT COUNT(*) INTO total FROM users; END;` - so'rovini string qilib qaytaruvchi funksiya tuzing.",
      startingCode: "function createOutProcedure() {\n  \n}",
      hint: "OUT total INT, INTO total kabi joylarga e'tibor bering.",
      solution: "function createOutProcedure() {\n  return 'CREATE PROCEDURE GetCount(OUT total INT) BEGIN SELECT COUNT(*) INTO total FROM users; END;';\n}",
      test: "const fn = new Function(code + '; return createOutProcedure;')();\nif (!fn().includes('OUT total INT')) throw new Error('OUT parametri noto\\'g\\'ri');"
    },
    {
      id: 5,
      title: "Protsedurani o'chirish",
      instruction: "`dropProcedure` funksiyasini yozing. U `procName` argumentini qabul qilib, uni o'chiruvchi SQL buyrug'ini qaytarsin.",
      startingCode: "function dropProcedure(procName) {\n  \n}",
      hint: "DROP PROCEDURE IF EXISTS procName;",
      solution: "function dropProcedure(procName) {\n  return `DROP PROCEDURE IF EXISTS ${procName};`;\n}",
      test: "const fn = new Function(code + '; return dropProcedure;')();\nif (fn('MyProc').toUpperCase() !== 'DROP PROCEDURE IF EXISTS MYPROC;') throw new Error('Xato SQL');"
    },
    {
      id: 6,
      title: "Bir nechta parametr qabul qilish",
      instruction: "`insertLog` protsedurasini chaqirish: `CALL insertLog('error', 'baza o\\'chib qoldi');` ni qaytaruvchi `callInsertLog` funksiyasini tuzing.",
      startingCode: "function callInsertLog(level, msg) {\n  \n}",
      hint: "CALL insertLog(level, msg); yozing, string qiymatlar atrofiga bittalik qo'shtirnoq qo'ying.",
      solution: "function callInsertLog(level, msg) {\n  return `CALL insertLog('${level}', '${msg}');`;\n}",
      test: "const fn = new Function(code + '; return callInsertLog;')();\nif (fn('info', 'ok').toUpperCase() !== \"CALL INSERTLOG('INFO', 'OK');\") throw new Error('Format xato');"
    },
    {
      id: 7,
      title: "EXEC buyrug'i (SQL Server)",
      instruction: "Microsoft SQL Server'da protseduralar odatda `EXEC` yoki `EXECUTE` bilan chaqiriladi. `EXEC GetUser @id = 5;` shuni yozuvchi `execProc` funksiyasini yozing.",
      startingCode: "function execProc(id) {\n  \n}",
      hint: "EXEC GetUser @id = id;",
      solution: "function execProc(id) {\n  return `EXEC GetUser @id = ${id};`;\n}",
      test: "const fn = new Function(code + '; return execProc;')();\nif (fn(10).toUpperCase() !== 'EXEC GETUSER @ID = 10;') throw new Error('Xato format');"
    },
    {
      id: 8,
      title: "Protsedura ichida shart (IF-THEN)",
      instruction: "Ba'zan protsedura ichida if-else mantiqi bo'ladi. Simulyatsiya: `IF amount > 1000 THEN SELECT 'Too large'; END IF;` - shu stringni qaytaruvchi `logicSim` funksiyasini yozing.",
      startingCode: "function logicSim() {\n  \n}",
      hint: "Matnni o'zini qaytaring.",
      solution: "function logicSim() {\n  return \"IF amount > 1000 THEN SELECT 'Too large'; END IF;\";\n}",
      test: "const fn = new Function(code + '; return logicSim;')();\nif (!fn().includes('END IF;')) throw new Error('END IF unutilgan');"
    },
    {
      id: 9,
      title: "Tranzaksiyani prosedura ichida ishlatish",
      instruction: "Protsedura ichida START TRANSACTION; COMMIT; amallarini birlashtirib qaytaruvchi funksiya tuzing: `BEGIN START TRANSACTION; UPDATE accounts SET balance = 0; COMMIT; END;`",
      startingCode: "function procTransaction() {\n  \n}",
      hint: "Kodni yozing.",
      solution: "function procTransaction() {\n  return 'BEGIN START TRANSACTION; UPDATE accounts SET balance = 0; COMMIT; END;';\n}",
      test: "const fn = new Function(code + '; return procTransaction;')();\nif (!fn().includes('COMMIT;')) throw new Error('xato');"
    },
    {
      id: 10,
      title: "SQL Function (Farqini ko'rsatish uchun)",
      instruction: "Funksiya qanday yaratilishini ko'rish uchun `CREATE FUNCTION getOne() RETURNS INT BEGIN RETURN 1; END;` stringni qaytaruvchi `createFunc` yozing.",
      startingCode: "function createFunc() {\n  \n}",
      hint: "RETURNS INT qismiga e'tibor bering.",
      solution: "function createFunc() {\n  return 'CREATE FUNCTION getOne() RETURNS INT BEGIN RETURN 1; END;';\n}",
      test: "const fn = new Function(code + '; return createFunc;')();\nif (!fn().includes('RETURNS INT')) throw new Error('xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Stored Procedure nima o'zi?",
      options: ["Faqat HTML ni formatlaydigan vosita", "MB ichida saqlanadigan, qayta chaqirish mumkin bo'lgan SQL kodlar bloki", "Vaqtinchalik xotira", "Jadvaldagi ustun tipi"],
      correctAnswer: 1,
      explanation: "Stored procedure – bu saqlangan dasturcha. U orqali bir necha amallarni bitta qadamda chaqirsa bo'ladi."
    },
    {
      id: 2,
      question: "Protseduralarni dasturdan chaqirishning asosiy foydalaridan biri qaysi?",
      options: ["Tarmoq (network) trafigini kamaytiradi, chunki ko'plab so'rovlar o'rniga bitta CALL ishlatiladi", "UI (frontend) ni go'zallashtiradi", "Internet o'chganda ham ishlashni ta'minlaydi", "Server hard diski hajmini oshiradi"],
      correctAnswer: 0,
      explanation: "Agar siz 10 ta UPDATE qilish kerak bo'lsa, backend 10 marta DB ga ulanib request/response qilmasdan, 1 marta Procedure ni chaqiradi, hammasi ichkarida tezda aylanadi."
    },
    {
      id: 3,
      question: "Protsedura qanday turdagi parametrlarni qabul qilishi mumkin? (MySQL misolida)",
      options: ["Faqat string tipidagi", "IN, OUT, INOUT parametrlari", "Umuman parametr ololmaydi", "Faqat Primary Key qiymatlari"],
      correctAnswer: 1,
      explanation: "Protseduraga parametr berish (IN), protseduradan parametr orqali javob olish (OUT) yoki ham berib ham yangilanganini qaytarib olish (INOUT) mumkin."
    },
    {
      id: 4,
      question: "SQL Function va Stored Procedure farqlaridan to'g'risini toping:",
      options: ["Protsedura har doim RETURN bilan qiymat qaytarishi shart, funksiya emas", "Function ichida so'rovda foydalanish mumkin (masalan, SELECT my_func()), Protsedurani esa faqat CALL bilan alohida ishga tushiriladi", "Ikkalasi aynan bir xil", "Function tranzaksiyani boshqarishi (COMMIT/ROLLBACK) mumkin, protsedura esa yo'q"],
      correctAnswer: 1,
      explanation: "Funksiyalar hisob-kitob qilib bitta javob (qator yoki qiymat) qaytarishga mo'ljallangan va ular SQL so'rovining ichida ishlay oladi. Protseduralar esa alohida skriptdek 'CALL' bilan chaqiriladi."
    },
    {
      id: 5,
      question: "Protseduralar Xavfsizlikka qanday yordam beradi?",
      options: ["Viruslarni o'chiradi", "SQL Injection dan tabiiy himoya qiladi va foydalanuvchi jadvallarga to'g'ridan-to'g'ri o'zgartirish kirita olmasligini nazorat qilish imkonini beradi", "Parollarni avtomatik yangilaydi", "HTTP ni HTTPS ga aylantiradi"],
      correctAnswer: 1,
      explanation: "Agar DB dagi userga faqat \`EXECUTE PROCEDURE\` huquqi berilsa, u hech qaysi jadvalni o'zi bevosita ko'ra olmaydi. Parametrlar orqali jo'natilgan ma'lumotlar esa sql-injection'dan asrashda rejalangan (prepared) parametr sifatida ishlaydi."
    },
    {
      id: 6,
      question: "Vendor Lock-in kamchiligi nima?",
      options: ["SQL kodi juda xavfsiz bo'lib qolishi", "Bir MB da yozilgan protsedura kodining boshqa MB ga (masalan, Oracle'dan MySQL ga) ko'chirilishi juda qiyinligi", "Protseduralarning narxi oshib ketishi", "Protsedura serverni qulflab qo'yishi"],
      correctAnswer: 1,
      explanation: "Har bir ma'lumotlar bazasi (SQL Server -> T-SQL, Oracle -> PL/SQL, PostgreSQL -> PL/pgSQL) o'zining ichki dasturlash tiliga ega. Bu boshqasiga o'tishni murakkablashtiradi."
    },
    {
      id: 7,
      question: "Protsedura ishga tushirish qaysi kalit so'z bilan qilinadi? (PostgreSQL/MySQL)",
      options: ["RUN", "START", "CALL", "FETCH"],
      correctAnswer: 2,
      explanation: "MySQL va PostgreSQL kabi ko'plab tizimlarda protsedura 'CALL procedure_name();' orqali ishga tushadi."
    },
    {
      id: 8,
      question: "Protseduralarda IF, ELSE, WHILE kabi sikl va shartlarni ishlatsa bo'ladimi?",
      options: ["Yo'q, faqat SELECT yozish mumkin", "Ha, to'liq mantiqiy jarayonlarni dasturlash mumkin", "Faqat WHILE sikli ruxsat etilgan", "Faqat Oracle bazasidagina mumkin"],
      correctAnswer: 1,
      explanation: "Protseduralar to'laqonli skript yozishga, o'zgaruvchilar saqlashga, shart va tsikllardan foydalanishga ruxsat beradi."
    },
    {
      id: 9,
      question: "Protsedurani ma'lumotlar bazasidan olib tashlash uchun qaysi so'rov kerak?",
      options: ["DELETE PROCEDURE", "REMOVE PROCEDURE", "DROP PROCEDURE", "CLEAR PROCEDURE"],
      correctAnswer: 2,
      explanation: "Barcha asosiy DB obyektlari (Table, View, Index, Procedure, Function) 'DROP' orqali o'chiriladi."
    },
    {
      id: 10,
      question: "Nima uchun protseduralar ba'zan oddiy SQL so'rovlaridan tezroq ishlaydi?",
      options: ["Chunki ular kompyuterning o'zida yoziladi", "Chunki ular oldindan kompilyatsiya (compile) qilinadi va ularni bajarish rejalari (execution plan) keshlanadi", "Chunki ular RAM o'rniga videokartani ishlatadi", "Ular tarmoq orqali ishlamaydi"],
      correctAnswer: 1,
      explanation: "MB protsedurani saqlayotganda uning sintaksisini tekshirib, qanday ishlashi kerakligini (plan) bir marta hisoblab qo'yadi. Keyingi chaqiruvlarda o'ylab o'tirmay, tezda bajaradi."
    },
    {
      id: 11,
      question: "Qaysi xolatda protsedura yaratish tavsiya ETILMAYDI?",
      options: ["Bank o'tkazmalari kabi murakkab va bog'liq amallarda", "Biznes mantiq (business logic) ni 100% kodda saqlab DB ni faqat xotira vazifasida ishlatganda", "Bitta operatsiya uchun 10 xil jadvalga INSERT qilish kerak bo'lganda", "Hisobotlarni yig'ishda"],
      correctAnswer: 1,
      explanation: "Zamonaviy yondashuvlarda ba'zan biznes mantiqni to'liq backend (Node.js/Spring) ga berishadi va DB faqat xotira qilib olinadi. Agar loyihangiz shunday arxitekturaga qurilgan bo'lsa, uni yarmiga protsedura qo'shish kodni tartibsiz qilib yuboradi."
    },
    {
      id: 12,
      question: "Protsedura ichida boshqa protsedurani chaqirish (Nested procedures) mumkinmi?",
      options: ["Ha, xuddi funksiyalar boshqa funksiyalarni chaqirgandek", "Yo'q, qat'iyan man etilgan", "Faqat nomlari har xil bo'lsa", "Faqat bittagina ichki darajaga ruxsat berilgan"],
      correctAnswer: 0,
      explanation: "Stored Procedure ichidan turib, boshqa bir protsedurani chaqirish (CALL boshqa_proc()) to'liq qo'llab-quvvatlanadi va kodni modullarga ajratishda yaxshi usuldir."
    }
  ]
};
