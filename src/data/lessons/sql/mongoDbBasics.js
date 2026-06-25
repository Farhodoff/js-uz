export const mongoDbBasics = {
  id: "mongodb_basics",
  title: "MongoDB Asoslari (NoSQL)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**MongoDB** - bu eng mashhur **NoSQL** (SQL emas) ma'lumotlar bazalaridan biridir. Unda ma'lumotlar jadvallar va qatorlar shaklida emas, balki JSON ga o'xshash **BSON** (Binary JSON) hujjatlar (document) ko'rinishida saqlanadi.

Asosiy atamalar SQL bilan solishtirganda:
- **Database** = Database
- **Table (Jadval)** = **Collection (Kolleksiya)**
- **Row (Qator)** = **Document (Hujjat - JSON obyekt)**
- **Column (Ustun)** = **Field (Maydon / Kalit)**

MongoDB ning asosiy ustunligi - uning moslashuvchanligida (schema-less). Bitta kolleksiya ichidagi hujjatlar bir-biridan farq qiluvchi turli xil maydonlarga ega bo'lishi mumkin. Masalan, bir userda \`age\` maydoni bo'lsa, ikkinchisida yo'q bo'lishi mumkin.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON (Juda ko'p bog'lanishlar - Relational yondashuv):**
\`\`\`javascript
// MongoDB da SQL kabi ko'plab alohida kolleksiyalarni 
// bir-biriga bog'lash (Joins / $lookup) sekin ishlashiga olib kelishi mumkin.
const order = { id: 1, userId: 5, productId: 10 };
\`\`\`

**✅ YAXSHI (Ichma-ich joylash - Embedding):**
\`\`\`javascript
// Ma'lumotlarni bitta hujjat ichida saqlash (Denormalization)
// o'qish tezligini oshiradi.
const order = {
  id: 1,
  user: { name: "Ali", phone: "123" },
  items: [
    { name: "Noutbuk", price: 1000 },
    { name: "Sichqoncha", price: 20 }
  ]
};
\`\`\`

## 🎤 Intervyu Savollari

1. **SQL va NoSQL o'rtasidagi asosiy farq nima?**
   - *Javob*: SQL (relyatsion) qat'iy tuzilishga (schema) va jadvallar orasida aniq munosabatlarga ega. NoSQL (MongoDB) esa moslashuvchan JSON hujjatlaridan iborat bo'lib, o'zgaruvchan tuzilishni yaxshi qo'llab-quvvatlaydi.
2. **Nima uchun MongoDB da $lookup (JOIN) ko'p ishlatish tavsiya etilmaydi?**
   - *Javob*: MongoDB o'z tabiatiga ko'ra o'qish/yozishni taqsimlangan arxitektura (sharding) da tezlashtirish uchun qilingan. Boshqa kolleksiyalar bilan join qilish (bog'lash) bu jarayonni sekinlashtiradi. Yaxshisi o'xshash ma'lumotlarni \`embedded\` (ichma-ich) saqlagan ma'qul.
3. **_id maydoni nima?**
   - *Javob*: Har bir MongoDB hujjatida unikal bo'lishi shart bo'lgan Primary Key. Agar o'zingiz bermasangiz, MongoDB avtomatik ravishda unikal \`ObjectId\` turidagi id ni generatsiya qiladi.

## 🛠️ Amaliy Topshiriqlar

Quyida siz MongoDB komandalarini (Masalan: \`db.users.find(...)\`) string formatida qaytaruvchi funksiyalarni yozasiz. (Bu faqat o'rganish uchun simulyatsiya).

\`\`\`mermaid
graph TD
    A[Database] --> B[Kolleksiya: users]
    A --> C[Kolleksiya: posts]
    B --> D["{ _id: 1, name: 'Ali' }"]
    B --> E["{ _id: 2, name: 'Vali', age: 25 }"]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Barcha hujjatlarni topish",
      instruction: "MongoDB da \`users\` kolleksiyasidan barcha yozuvlarni olib keluvchi so'rovni string formatida qaytaring. Format: \`db.users.find({})\`",
      startingCode: "function findAllUsers() {\n  \n}",
      hint: "db.users.find({})",
      solution: "function findAllUsers() {\n  return 'db.users.find({})';\n}",
      test: "const fn = new Function(code + '; return findAllUsers;')();\nif(fn().replace(/\\s/g,'') !== 'db.users.find({})') throw new Error('find({}) xato');"
    },
    {
      id: 2,
      title: "Bitta hujjat qo'shish",
      instruction: "Yangi ma'lumot qo'shish uchun \`insertOne\` ishlatiladi. Parametr sifatida ism kelsa, \`users\` ga shuni yozadigan kodni matn qilib qaytaring. Masalan: \`db.users.insertOne({ name: 'Ali' })\`",
      startingCode: "function insertUser(name) {\n  \n}",
      hint: "db.users.insertOne({ name: '${name}' })",
      solution: "function insertUser(name) {\n  return `db.users.insertOne({ name: '${name}' })`;\n}",
      test: "const fn = new Function(code + '; return insertUser;')();\nif(!fn('Hasan').replace(/\\s/g,'').includes(\"insertOne({name:'Hasan'})\")) throw new Error('insertOne xato');"
    },
    {
      id: 3,
      title: "Bir nechta hujjat qo'shish",
      instruction: "Bir vaqtning o'zida ko'p yozuv qo'shish uchun \`insertMany\` metodi qanday yoziladi? O'zingiz xohlagan ixtiyoriy 2 ta oddiy obyekt (ichida ismlar) qo'shilgan kodni qaytaring.",
      startingCode: "function insertMultiple() {\n  \n}",
      hint: "db.users.insertMany([{ name: 'A' }, { name: 'B' }])",
      solution: "function insertMultiple() {\n  return `db.users.insertMany([{ name: 'A' }, { name: 'B' }])`;\n}",
      test: "const fn = new Function(code + '; return insertMultiple;')();\nif(!fn().replace(/\\s/g,'').includes(\"insertMany([\")) throw new Error('insertMany massiv qabul qiladi');"
    },
    {
      id: 4,
      title: "Ma'lumotni yangilash (updateOne)",
      instruction: "\`updateOne\` birinchi mos kelgan yozuvni yangilaydi. Ismi 'Ali' bo'lgan userning yoshini 30 qilish kodini matn qilib qaytaring. (Esda tuting, $set ishlatiladi!)",
      startingCode: "function updateAli() {\n  \n}",
      hint: "db.users.updateOne({ name: 'Ali' }, { $set: { age: 30 } })",
      solution: "function updateAli() {\n  return `db.users.updateOne({ name: 'Ali' }, { $set: { age: 30 } })`;\n}",
      test: "const fn = new Function(code + '; return updateAli;')();\nconst res = fn().replace(/\\s/g,'');\nif(!res.includes(\"updateOne({name:'Ali'},{$set:{age:30}})\")) throw new Error('updateOne yoki $set qismi xato');"
    },
    {
      id: 5,
      title: "Ma'lumotni o'chirish (deleteOne)",
      instruction: "MongoDB da yozuvni o'chirish uchun \`deleteOne\` ishlatiladi. \`_id\` si 5 bo'lgan foydalanuvchini o'chirish kodini matn qilib qaytaring.",
      startingCode: "function deleteUser() {\n  \n}",
      hint: "db.users.deleteOne({ _id: 5 })",
      solution: "function deleteUser() {\n  return `db.users.deleteOne({ _id: 5 })`;\n}",
      test: "const fn = new Function(code + '; return deleteUser;')();\nif(fn().replace(/\\s/g,'') !== \"db.users.deleteOne({_id:5})\") throw new Error('deleteOne xato');"
    },
    {
      id: 6,
      title: "Operator bilan izlash ($gt)",
      instruction: "Yosh (\`age\`) i 18 dan katta bo'lgan (\`$gt\`) userlarni olib keluvchi so'rovni qaytaring.",
      startingCode: "function findAdults() {\n  \n}",
      hint: "db.users.find({ age: { $gt: 18 } })",
      solution: "function findAdults() {\n  return `db.users.find({ age: { $gt: 18 } })`;\n}",
      test: "const fn = new Function(code + '; return findAdults;')();\nif(!fn().replace(/\\s/g,'').includes(\"find({age:{$gt:18}})\")) throw new Error('$gt operatori xato ishladi');"
    },
    {
      id: 7,
      title: "Ko'plik bo'yicha qidiruv ($in)",
      instruction: "Ismi 'Ali' yoki 'Vali' bo'lganlarni izlash uchun \`$in\` operatori ishlatiladi. Shu kodni matn holida qaytaring.",
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
      instruction: "\`findOne\` metodi faqatgina bitta qator(document) qaytaradi. Email orqali faqat bitta foydalanuvchini topuvchi kodni matn qilib qaytaring (parametr sifatida email keladi).",
      startingCode: "function getOneByEmail(email) {\n  \n}",
      hint: "db.users.findOne({ email: '${email}' })",
      solution: "function getOneByEmail(email) {\n  return `db.users.findOne({ email: '${email}' })`;\n}",
      test: "const fn = new Function(code + '; return getOneByEmail;')();\nif(!fn('test@mail').replace(/\\s/g,'').includes(\"findOne({email:'test@mail'})\")) throw new Error('findOne xato');"
    },
    {
      id: 10,
      title: "Yangilash (Maydon qo'shish)",
      instruction: "$set yordamida nafaqat mavjud maydonni yangilash, balki umuman yangi maydon (field) qo'shish ham mumkin. Ismi 'Ali' bo'lgan kishiga \`status: 'active'\` maydonini qo'shuvchi kodni yozing.",
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
      question: "SQL dagi \`Table\` MongoDB da nima deb ataladi?",
      options: ["Collection", "Document", "Field", "Base"],
      correctAnswer: 0,
      explanation: "Jadvallar yig'indisi Collection (Kolleksiya) deyiladi."
    },
    {
      id: 3,
      question: "SQL dagi \`Row\` (Qator) MongoDB da nima deyiladi?",
      options: ["Column", "Document", "Property", "Item"],
      correctAnswer: 1,
      explanation: "MongoDB dagi har bir JSON obyekt bitta Document (Hujjat) hisoblanadi."
    },
    {
      id: 4,
      question: "MongoDB da har bir hujjatda albatta bo'lishi kerak bo'lgan, takrorlanmas qiymat qaysi?",
      options: ["id", "_id", "primaryKey", "UUID"],
      correctAnswer: 1,
      explanation: "MongoDB da \`_id\` maydoni majburiy bo'lib, hujjatning unikal identifikatori (Primary Key) vazifasini bajaradi."
    },
    {
      id: 5,
      question: "Bir marta so'rov yuborishda bir nechta hujjat qo'shish uchun qaysi metod ishlatiladi?",
      options: ["addMany", "insertMany", "pushAll", "createBatch"],
      correctAnswer: 1,
      explanation: "Bir vaqtning o'zida bir nechta JSON obyektlarni (massiv ichida) kiritish uchun \`insertMany\` ishlatiladi."
    },
    {
      id: 6,
      question: "Qaysi xususiyat MongoDB ning \`Schema-less\` ekanligini bildiradi?",
      options: ["Umuman DB strukturasi yo'q", "Bitta kolleksiya ichidagi hujjatlar bir xil maydonlarga ega bo'lishi shart emas", "Barcha hujjatlar bir xil tuzilishda bo'lishi majburiy", "Boshqa bazaga ulana olmaslik"],
      correctAnswer: 1,
      explanation: "Moslashuvchanlik (schema-less yoki flexible schema) shuni anglatadiki, turli xil o'zgaruvchilarga ega obyektlarni bir joyda saqlashingiz mumkin."
    },
    {
      id: 7,
      question: "MongoDB da ma'lumotni yangilashda nima sababdan \`$set\` operatori ishlatiladi?",
      options: ["Faqat yangi obyekt yaratish uchun", "Ko'rsatilgan maydonni almashtirish yoki qo'shish uchun, obyektning qolgan qismini o'chirib yubormaslik uchun", "Barcha maydonlarni o'chirish uchun", "Faqat raqamlarni kattalashtirish uchun"],
      correctAnswer: 1,
      explanation: "Agar \`$set\` ishlatilmasa, siz butun bir obyektni bergan yangi obyekt bilan (barcha eski ma'lumotlarini o'chirib) almashtirib qo'yishingiz mumkin."
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
      question: "MongoDB dagi \`find()\` metodi nimani qaytaradi?",
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
      explanation: "Masalan, Userning address (manzil) ma'lumotlari alohida \`addresses\` kolleksiyasida emas, shu User hujjatining ichida \`address: { city: ... }\` tarzida yozilishi."
    },
    {
      id: 12,
      question: "MongoDB da ma'lumotlarni jismonan o'chirmasdan 'o'chirilgan' deb belgilash (Soft Delete) ni qanday qilish qulayroq?",
      options: ["Buning iloji yo'q", "deleteMany orqali", "Hujjatga \`isDeleted: true\` maydonini $set orqali qo'shish va qidiruvda doim shuni inobatga olish", "Faylni korzinaga yuborish"],
      correctAnswer: 2,
      explanation: "Soft delete yondashuvida haqiqatda \`deleteOne\` ishlatilmaydi, uning o'rniga status (masalan, deletedAt, isDeleted) yangilanadi holos."
    }
  ]
};
