export const mongoDbBasics = {
  id: "mongodb_basics",
  title: "MongoDB Asoslari (NoSQL)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, siz katta bir kutubxonadasiz. SQL (relyatsion) ma'lumotlar bazasida har bir kitob haqidagi ma'lumot qat'iy jadvallarga bo'lingan bo'ladi: bitta jadvalda avtorlar, ikkinchisida kitob nomlari, uchinchisida nashriyotlar. Barchasini birlashtirish uchun qiyin va uzoq qidiruvlar (JOIN) qilish kerak.

**MongoDB (NoSQL)** esa bu xuddi har bir kitob uchun alohida jild (papka) ochishga o'xshaydi. Bir jild ichida kitobning o'zi ham, avtori ham, nashriyoti ham turadi. Hech qanday qat'iy qoidalar yo'q: bitta jildda rasmlar bo'lishi mumkin, boshqasida esa faqat matn. MongoDB ma'lumotlarni jadvallarda emas, balki **BSON** (JSON'ga o'xshash) hujjatlarida saqlaydi.

- **Database** = Kutubxona
- **Collection** = Jildlar to'plami (Masalan, barcha "Foydalanuvchilar" jildlari)
- **Document** = Bitta maxsus jild (Bitta foydalanuvchining barcha ma'lumotlari)

---

## 2. 🧠 Chuqur Sho'ng'ish (Deep Dive)

### BSON vs JSON
MongoDB ma'lumotlarni saqlash va tarmoq orqali uzatish uchun **BSON** (Binary JSON) dan foydalanadi. Nega oddiy JSON emas?
JSON o'qishga qulay, lekin u turlarni (data types) cheklangan miqdorda qo'llab-quvvatlaydi (faqat string, number, boolean, array, object).
BSON esa \\\`Date\\\`, \\\`ObjectId\\\`, \\\`BinData\\\` kabi murakkab turlarni o'z ichiga oladi va kompyuter xotirasida baytlar ko'rinishida saqlangani uchun qidiruv va indeksatsiya jarayonlarini juda tezlashtiradi.

### WiredTiger Storage Engine (Dvigatel)
MongoDB ning ostida ma'lumotlarni diskka yozish va xotirani boshqarish bilan shug'ullanadigan **WiredTiger** nomli dvigatel yotadi.
Uning asosiy afzalliklari:
1. **Document-level concurrency control**: Bir vaqtning o'zida ikkita foydalanuvchi bir xil kolleksiyadagi ikkita turli xil hujjatni o'zgartirsa, ular bir-birini kutib turmaydi.
2. **Compression (Siqish)**: Diskdagi joyni tejash uchun ma'lumotlarni siqib saqlaydi (Snappy algoritmi).
3. **In-memory cache**: Eng ko'p ishlatiladigan ma'lumotlarni RAM da ushlab turadi, bu esa o'qish tezligini karrasiga oshiradi.

---

## 3. ⚠️ Chekka Holatlar (Edge Cases) va Senior Intervyu Savollari

### Chekka Holatlar:
- **Maximum Document Size**: Bitta BSON hujjatining maksimal hajmi **16 MB**. Agar ma'lumot bundan oshib ketsa, \\\`GridFS\\\` dan foydalanish kerak yoki sxemani o'zgartirish (masalan, reference qilish) lozim.
- **Transactions**: MongoDB 4.0 dan boshlab ko'p hujjatli tranzaksiyalarni (multi-document transactions) qo'llab-quvvatlaydi. Lekin tranzaksiyalar sharding tizimida sekin ishlashi va dead-lock larni keltirib chiqarishi mumkin. Iloji boricha **Single-Document Atomicity** dan foydalangan ma'qul.

### Senior Intervyu Savollari:
1. **MongoDB da qachon Embedding (Ichma-ich) va qachon Referencing (Bog'lash) ishlatish kerak?**
   - *Javob*: Agar bog'liq ma'lumotlar hajmi kichik bo'lsa va tez-tez o'zgarmasa (1-to-Few), shuningdek o'qish tezligi muhim bo'lsa, **Embedding** qilinadi. Agar ma'lumotlar o'z-o'zidan mustaqil bo'lsa, hajmi cheksiz o'sishi mumkin bo'lsa (1-to-Squillions, masalan, bitta postga yozilgan millionlab kommentlar) **Referencing** ishlatiladi, aks holda 16 MB limitdan o'tib ketadi.
2. **Sharding qanday ishlaydi va uning Shard Key tanlashdagi qoidalari qanday?**
   - *Javob*: Sharding bu ma'lumotlarni gorizontal ravishda bir nechta serverlarga bo'lib yuborish. Shard Key bu qaysi ma'lumot qaysi serverga tushishini hal qiluvchi maydon. Yaxshi Shard Key **High Cardinality** (ko'p xilma-xillik), bir maromda taqsimlanish (evenly distributed) va ko'p yozishlarni bitta tugunga qaratib qo'ymaslik xususiyatlariga ega bo'lishi kerak.
3. **WiredTiger da Checkpoint qanday ishlaydi?**
   - *Javob*: Checkpoint ma'lumotlarning vaqtichalik xotiradan (RAM) diskka xavfsiz yozilgan nuqtasidir (odatda har 60 soniyada). Agar server kutilmaganda o'chib qolsa, MongoDB Journal (Write-Ahead Log) yordamida Checkpoint dan keyingi o'zgarishlarni tiklab oladi.

---

## 📊 Arxitektura Diagrammasi

\\\`\\\`\\\`mermaid
graph TD
    Client[Client Application] --> Driver[MongoDB Driver]
    Driver --> QueryRouter[Query Router / mongos]
    QueryRouter --> ConfigServer[Config Servers - Metadata]
    QueryRouter --> Shard1[(Shard 1 - WiredTiger)]
    QueryRouter --> Shard2[(Shard 2 - WiredTiger)]
    Shard1 --> Repl1_Secondary1[(Secondary 1)]
    Shard1 --> Repl1_Secondary2[(Secondary 2)]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Barcha hujjatlarni topish",
      instruction: "MongoDB da `users` kolleksiyasidan barcha yozuvlarni olib keluvchi so'rovni string formatida qaytaring. Format: `db.users.find({})`",
      startingCode: "function findAllUsers() {\n  \n}",
      hint: "db.users.find({})",
      solution: "function findAllUsers() {\n  return 'db.users.find({})';\n}",
      test: "const fn = new Function(code + '; return findAllUsers;')();\nif(fn().replace(/\\s/g,'') !== 'db.users.find({})') throw new Error('find({}) xato');"
    },
    {
      id: 2,
      title: "Bitta hujjat qo'shish",
      instruction: "Yangi ma'lumot qo'shish uchun `insertOne` ishlatiladi. Parametr sifatida ism kelsa, `users` ga shuni yozadigan kodni matn qilib qaytaring. Masalan: `db.users.insertOne({ name: 'Ali' })`",
      startingCode: "function insertUser(name) {\n  \n}",
      hint: "db.users.insertOne({ name: '${name}' })",
      solution: "function insertUser(name) {\n  return `db.users.insertOne({ name: '${name}' })`;\n}",
      test: "const fn = new Function(code + '; return insertUser;')();\nif(!fn('Hasan').replace(/\\s/g,'').includes(\"insertOne({name:'Hasan'})\")) throw new Error('insertOne xato');"
    },
    {
      id: 3,
      title: "Bir nechta hujjat qo'shish",
      instruction: "Bir vaqtning o'zida ko'p yozuv qo'shish uchun `insertMany` metodi qanday yoziladi? O'zingiz xohlagan ixtiyoriy 2 ta oddiy obyekt (ichida ismlar) qo'shilgan kodni qaytaring.",
      startingCode: "function insertMultiple() {\n  \n}",
      hint: "db.users.insertMany([{ name: 'A' }, { name: 'B' }])",
      solution: "function insertMultiple() {\n  return `db.users.insertMany([{ name: 'A' }, { name: 'B' }])`;\n}",
      test: "const fn = new Function(code + '; return insertMultiple;')();\nif(!fn().replace(/\\s/g,'').includes(\"insertMany([\")) throw new Error('insertMany massiv qabul qiladi');"
    },
    {
      id: 4,
      title: "Ma'lumotni yangilash (updateOne)",
      instruction: "`updateOne` birinchi mos kelgan yozuvni yangilaydi. Ismi 'Ali' bo'lgan userning yoshini 30 qilish kodini matn qilib qaytaring. (Esda tuting, $set ishlatiladi!)",
      startingCode: "function updateAli() {\n  \n}",
      hint: "db.users.updateOne({ name: 'Ali' }, { $set: { age: 30 } })",
      solution: "function updateAli() {\n  return `db.users.updateOne({ name: 'Ali' }, { $set: { age: 30 } })`;\n}",
      test: "const fn = new Function(code + '; return updateAli;')();\nconst res = fn().replace(/\\s/g,'');\nif(!res.includes(\"updateOne({name:'Ali'},{$set:{age:30}})\")) throw new Error('updateOne yoki $set qismi xato');"
    },
    {
      id: 5,
      title: "Ma'lumotni o'chirish (deleteOne)",
      instruction: "MongoDB da yozuvni o'chirish uchun `deleteOne` ishlatiladi. `_id` si 5 bo'lgan foydalanuvchini o'chirish kodini matn qilib qaytaring.",
      startingCode: "function deleteUser() {\n  \n}",
      hint: "db.users.deleteOne({ _id: 5 })",
      solution: "function deleteUser() {\n  return `db.users.deleteOne({ _id: 5 })`;\n}",
      test: "const fn = new Function(code + '; return deleteUser;')();\nif(fn().replace(/\\s/g,'') !== \"db.users.deleteOne({_id:5})\") throw new Error('deleteOne xato');"
    },
    {
      id: 6,
      title: "Operator bilan izlash ($gt)",
      instruction: "Yosh (`age`) i 18 dan katta bo'lgan (`$gt`) userlarni olib keluvchi so'rovni qaytaring.",
      startingCode: "function findAdults() {\n  \n}",
      hint: "db.users.find({ age: { $gt: 18 } })",
      solution: "function findAdults() {\n  return `db.users.find({ age: { $gt: 18 } })`;\n}",
      test: "const fn = new Function(code + '; return findAdults;')();\nif(!fn().replace(/\\s/g,'').includes(\"find({age:{$gt:18}})\")) throw new Error('$gt operatori xato ishladi');"
    },
    {
      id: 7,
      title: "Ko'plik bo'yicha qidiruv ($in)",
      instruction: "Ismi 'Ali' yoki 'Vali' bo'lganlarni izlash uchun `$in` operatori ishlatiladi. Shu kodni matn holida qaytaring.",
      startingCode: "function findSpecificNames() {\n  \n}",
      hint: "db.users.find({ name: { $in: ['Ali', 'Vali'] } })",
      solution: "function findSpecificNames() {\n  return `db.users.find({ name: { $in: ['Ali', 'Vali'] } })`;\n}",
      test: "const fn = new Function(code + '; return findSpecificNames;')();\nif(!fn().replace(/\\s/g,'').includes(\"name:{$in:['Ali','Vali']}\")) throw new Error('$in operatori xato');"
    },
    {
      id: 8,
      title: "Sanoq olish (countDocuments)",
      instruction: "MongoDB da kolleksiyadagi ma'lumotlar sonini bilish uchun qaysi metod ishlatiladi? Barcha userlar sonini sanovchi kodni qaytaring.",
      startingCode: "function countUsers() {\n  \n}",
      hint: "db.users.countDocuments({})",
      solution: "function countUsers() {\n  return 'db.users.countDocuments({})';\n}",
      test: "const fn = new Function(code + '; return countUsers;')();\nif(!fn().replace(/\\s/g,'').includes(\"countDocuments({})\")) throw new Error('countDocuments xato');"
    },
    {
      id: 9,
      title: "Faqat birinchi ma'lumotni topish",
      instruction: "`findOne` metodi faqatgina bitta qator(document) qaytaradi. Email orqali faqat bitta foydalanuvchini topuvchi kodni matn qilib qaytaring (parametr sifatida email keladi).",
      startingCode: "function getOneByEmail(email) {\n  \n}",
      hint: "db.users.findOne({ email: '${email}' })",
      solution: "function getOneByEmail(email) {\n  return `db.users.findOne({ email: '${email}' })`;\n}",
      test: "const fn = new Function(code + '; return getOneByEmail;')();\nif(!fn('test@mail').replace(/\\s/g,'').includes(\"findOne({email:'test@mail'})\")) throw new Error('findOne xato');"
    },
    {
      id: 10,
      title: "Yangilash (Maydon qo'shish)",
      instruction: "$set yordamida nafaqat mavjud maydonni yangilash, balki umuman yangi maydon (field) qo'shish ham mumkin. Ismi 'Ali' bo'lgan kishiga `status: 'active'` maydonini qo'shuvchi kodni yozing.",
      startingCode: "function addStatusField() {\n  \n}",
      hint: "db.users.updateOne({ name: 'Ali' }, { $set: { status: 'active' } })",
      solution: "function addStatusField() {\n  return `db.users.updateOne({ name: 'Ali' }, { $set: { status: 'active' } })`;\n}",
      test: "const fn = new Function(code + '; return addStatusField;')();\nif(!fn().replace(/\\s/g,'').includes(\"{$set:{status:'active'}}\")) throw new Error('$set qismi xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "MongoDB da ma'lumotlar qanday formatda saqlanadi?",
      options: ["Jadval ko'rinishida", "BSON (Binary JSON) formatida", "Oddiy matn (txt) faylida", "XML formatida"],
      correctAnswer: 1,
      explanation: "MongoDB kompyuter xotirasida ma'lumotlarni JSON ga o'xshash, lekin qidiruv va turlarni saqlashda optimizatsiya qilingan BSON (Binary JSON) formatida saqlaydi."
    },
    {
      id: 2,
      question: "SQL dagi `Table` MongoDB da nima deb ataladi?",
      options: ["Collection", "Document", "Field", "Base"],
      correctAnswer: 0,
      explanation: "Jadvallar yig'indisi Collection (Kolleksiya) deyiladi."
    },
    {
      id: 3,
      question: "SQL dagi `Row` (Qator) MongoDB da nima deyiladi?",
      options: ["Column", "Document", "Property", "Item"],
      correctAnswer: 1,
      explanation: "MongoDB dagi har bir JSON obyekt bitta Document (Hujjat) hisoblanadi."
    },
    {
      id: 4,
      question: "MongoDB da har bir hujjatda albatta bo'lishi kerak bo'lgan, takrorlanmas qiymat qaysi?",
      options: ["id", "_id", "primaryKey", "UUID"],
      correctAnswer: 1,
      explanation: "MongoDB da `_id` maydoni majburiy bo'lib, hujjatning unikal identifikatori (Primary Key) vazifasini bajaradi."
    },
    {
      id: 5,
      question: "Bir marta so'rov yuborishda bir nechta hujjat qo'shish uchun qaysi metod ishlatiladi?",
      options: ["addMany", "insertMany", "pushAll", "createBatch"],
      correctAnswer: 1,
      explanation: "Bir vaqtning o'zida bir nechta JSON obyektlarni (massiv ichida) kiritish uchun `insertMany` ishlatiladi."
    },
    {
      id: 6,
      question: "Qaysi xususiyat MongoDB ning `Schema-less` ekanligini bildiradi?",
      options: ["Umuman DB strukturasi yo'q", "Bitta kolleksiya ichidagi hujjatlar bir xil maydonlarga ega bo'lishi shart emas", "Barcha hujjatlar bir xil tuzilishda bo'lishi majburiy", "Boshqa bazaga ulana olmaslik"],
      correctAnswer: 1,
      explanation: "Moslashuvchanlik (schema-less yoki flexible schema) shuni anglatadiki, turli xil o'zgaruvchilarga ega obyektlarni bir joyda saqlashingiz mumkin."
    },
    {
      id: 7,
      question: "MongoDB da ma'lumotni yangilashda nima sababdan `$set` operatori ishlatiladi?",
      options: ["Faqat yangi obyekt yaratish uchun", "Ko'rsatilgan maydonni almashtirish yoki qo'shish uchun, obyektning qolgan qismini o'chirib yubormaslik uchun", "Barcha maydonlarni o'chirish uchun", "Faqat raqamlarni kattalashtirish uchun"],
      correctAnswer: 1,
      explanation: "Agar `$set` ishlatilmasa, siz butun bir obyektni bergan yangi obyekt bilan (barcha eski ma'lumotlarini o'chirib) almashtirib qo'yishingiz mumkin."
    },
    {
      id: 8,
      question: "Raqamli qiymatning ma'lum sondan kattaligini tekshirish uchun qaysi operator kerak?",
      options: ["$greater", "$lt", "$gt", "$up"],
      correctAnswer: 2,
      explanation: "$gt (Greater Than - katta), $lt (Less Than - kichik) kabi operatorlardan foydalaniladi."
    },
    {
      id: 9,
      question: "MongoDB dagi `find()` metodi nimani qaytaradi?",
      options: ["Bitta hujjat", "Cursor (Iteratsiya qilish mumkin bo'lgan ma'lumotlar to'plami oqimi)", "Massiv uzunligini", "Faqat birinchi obyektdagi xatoni"],
      correctAnswer: 1,
      explanation: "find() to'g'ridan-to'g'ri massiv emas, balki Cursor qaytaradi, uni .toArray() orqali to'liq JS massivga aylantirish mumkin."
    },
    {
      id: 10,
      question: "Kolleksiyadagi jami qatorlar sonini aniqlash uchun qaysi metod xavfsiz va aniq ishlaydi?",
      options: ["count()", "size()", "countDocuments()", "length()"],
      correctAnswer: 2,
      explanation: "Eski count() metodi bekor qilinib, hozirda real-time sanash uchun countDocuments() tavsiya etiladi."
    },
    {
      id: 11,
      question: "Embedded Document (Ichma-ich hujjat) nima?",
      options: ["Faqat 1 ta qator bo'lishi", "Bog'liq ma'lumotlarni alohida kolleksiyada emas, balki asosiy obyekt ichida (massiv yoki obyekt sifatida) saqlash", "O'zgaruvchilarni tashqi faylda saqlash", "Shifrlangan hujjat"],
      correctAnswer: 1,
      explanation: "Masalan, Userning address (manzil) ma'lumotlari alohida `addresses` kolleksiyasida emas, shu User hujjatining ichida `address: { city: ... }` tarzida yozilishi."
    },
    {
      id: 12,
      question: "Bitta BSON hujjatining maksimal hajmi qancha bo'lishi mumkin?",
      options: ["Cheksiz", "4 MB", "16 MB", "1 GB"],
      correctAnswer: 2,
      explanation: "MongoDB bitta hujjat uchun 16 MB limit qoygan. Bundan kattaroq hajmli obyektlar uchun GridFS ishlatilishi yoki ma'lumot referencing qilinishi kerak."
    }
  ]
};
