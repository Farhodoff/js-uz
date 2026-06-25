export const mongooseDb = {
  id: "mongoose_db",
  title: "Mongoose bilan Ishlash (ODM)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**Mongoose** - bu Node.js da MongoDB bilan ishlashni juda osonlashtiruvchi va xavfsizroq qiluvchi ODM (Object Data Modeling) kutubxonasidir.

MongoDB o'z tabiatiga ko'ra \`schema-less\` (qoidalari erkin) bo'lgani uchun, u yerga istalgan turdagi ma'lumotni yozib yuborish mumkin (masalan, yosh ustuniga harflar yozib qo'yish).
Mongoose bu muammoni hal qiladi! U orqali biz aniq **Schema** (qolip) yaratamiz va shu qolipdan tashqaridagi yoki noto'g'ri turdagi (type) ma'lumotlar bazaga yozilishiga yo'l qo'ymaymiz.

Asosiy tushunchalar:
1. **Schema (Qolip)**: Hujjat qanday maydonlardan iborat ekanligi va ularning turlari (String, Number, Boolean) belgilangan qoida.
2. **Model**: Schema asosida yaratilgan, DB dan ma'lumot o'qish/yozishni ta'minlovchi JS klassi.
3. **Validation**: Ma'lumotning to'g'riligini tekshirish (masalan, parol kamida 6 harfdan iborat bo'lishi).

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

**❌ YOMON (Mongoose orqali Model validation ni nazarga ilmaslik):**
\`\`\`javascript
// Qolipda tekshiruvlar yo'q bo'lsa, istalgan narsa yozilib ketadi
const userSchema = new mongoose.Schema({
  email: String
});
\`\`\`

**✅ YAXSHI (Aniq va qat'iy Validation yozish):**
\`\`\`javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,      // Majburiy maydon
    unique: true,        // Takrorlanmas bo'lishi shart
    trim: true,          // Bo'sh joylarni kesib tashlash
    lowercase: true      // Harflarni kichraytirish
  },
  age: {
    type: Number,
    min: 18              // Yosh 18 dan kichik bo'lmasligi kerak
  }
});
\`\`\`

## 🎤 Intervyu Savollari

1. **Mongoose va sof MongoDB drayveri (native driver) ning farqi nimada?**
   - *Javob*: Sof drayver bazaga tezroq ulanadi va hech qanday cheklovlarsiz ishlaydi. Mongoose esa o'rtada \`Middleware\`, \`Schema Validation\`, va qulay \`Populate\` (Join) mexanizmlarini taqdim etib, dasturchining ishini yengillashtiradi, lekin sal sekinroq bo'lishi mumkin.
2. **\`populate()\` metodi nima qiladi?**
   - *Javob*: U SQL dagi JOIN ga o'xshaydi. Bir modeldagi \`ObjectId\` orqali bog'langan boshqa kolleksiyadagi ma'lumotni to'liq obyekt sifatida yuklab olib keladi.
3. **Mongoose da Middleware (Hooks) nima?**
   - *Javob*: Ma'lumotni saqlash (\`save\`), o'chirish (\`remove\`) kabi amallardan oldin (pre) yoki keyin (post) avtomatik ishga tushadigan funksiyalar (masalan, parolni saqlashdan oldin hash qilish uchun).

## 🛠️ Amaliy Topshiriqlar

Quyida siz Mongoose metodlarini string holatida qaytaruvchi funksiyalarni yozasiz. (Test matnni tekshiradi). Model nomi doim \`User\` deb tasavvur qiling.

\`\`\`mermaid
graph TD
    A[Node.js / Express] --> B[Mongoose Model]
    B --> C[Mongoose Schema / Validation]
    C -->|To'g'ri bo'lsa| D[(MongoDB)]
    C -.->|Xato bo'lsa| E[Error Exception]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Barcha foydalanuvchilarni topish",
      instruction: "Mongoose da barcha ma'lumotni olish uchun qaysi metod ishlatiladi? Model nomi \`User\` bo'lsa, uni \`User.find()\` deb yozing va shuni matn qilib qaytaring.",
      startingCode: "function findAll() {\n  \n}",
      hint: "return 'User.find()';",
      solution: "function findAll() {\n  return 'User.find()';\n}",
      test: "const fn = new Function(code + '; return findAll;')();\nif(fn().replace(/\\s/g,'') !== 'User.find()') throw new Error('find xato');"
    },
    {
      id: 2,
      title: "ID orqali topish (findById)",
      instruction: "Faqat Mongoose da bor bo'lgan va ID bo'yicha qidirishni ancha qulaylashtirgan \`findById\` metodi bor. Parametr sifatida \`id\` kelsa, \`User.findById(id)\` ko'rinishidagi so'rovni matn holida qaytaring.",
      startingCode: "function findUserById(id) {\n  \n}",
      hint: "return `User.findById(${id})`;",
      solution: "function findUserById(id) {\n  return `User.findById(${id})`;\n}",
      test: "const fn = new Function(code + '; return findUserById;')();\nif(!fn(5).replace(/\\s/g,'').includes(\"findById(5)\")) throw new Error('findById xato');"
    },
    {
      id: 3,
      title: "Yangi obyekt yaratish (create)",
      instruction: "Mongoose orqali bitta yoki bir nechta qator qo'shish uchun ham ishlaydigan bitta \`create()\` metodi bor. Ism (name) ni olib, \`User.create({ name: '...'}) \` ni string qilib qaytaring.",
      startingCode: "function createUser(name) {\n  \n}",
      hint: "User.create({ name: '${name}' })",
      solution: "function createUser(name) {\n  return `User.create({ name: '${name}' })`;\n}",
      test: "const fn = new Function(code + '; return createUser;')();\nif(!fn('Ali').replace(/\\s/g,'').includes(\"create({name:'Ali'})\")) throw new Error('create xato');"
    },
    {
      id: 4,
      title: "ID bo'yicha yangilash",
      instruction: "Mongoose da \`findByIdAndUpdate\` metodi juda qulay. Unda \`{ new: true }\` parametrini bersangiz, yangilangan ob'ektning o'zini qaytaradi. \`id\` va \`name\` kelsa, shuni yangilaydigan kodni qaytaring.",
      startingCode: "function updateById(id, name) {\n  \n}",
      hint: "User.findByIdAndUpdate(id, { name: name }, { new: true })",
      solution: "function updateById(id, name) {\n  return `User.findByIdAndUpdate(${id}, { name: '${name}' }, { new: true })`;\n}",
      test: "const fn = new Function(code + '; return updateById;')();\nconst res = fn(1, 'Hasan').replace(/\\s/g,'');\nif(!res.includes(\"findByIdAndUpdate(1,{name:'Hasan'},{new:true})\")) throw new Error('findByIdAndUpdate yoki new:true qismi xato');"
    },
    {
      id: 5,
      title: "ID bo'yicha o'chirish",
      instruction: "\`findByIdAndDelete\` (yoki findByIdAndRemove) metodi mavjud. Id orqali o'chirish kodini \`User.findByIdAndDelete(id)\` tarzida qaytaring.",
      startingCode: "function deleteById(id) {\n  \n}",
      hint: "User.findByIdAndDelete(${id})",
      solution: "function deleteById(id) {\n  return `User.findByIdAndDelete(${id})`;\n}",
      test: "const fn = new Function(code + '; return deleteById;')();\nif(!fn(10).replace(/\\s/g,'').includes(\"findByIdAndDelete(10)\")) throw new Error('findByIdAndDelete xato');"
    },
    {
      id: 6,
      title: "Ma'lumotlarni bog'lash (Populate)",
      instruction: "Agar userning \`posts\` ro'yxati (ID lar) bo'lsa, ularni to'liq obyektga aylantirib kelish uchun \`populate\` ishlatiladi. Barcha userlarni \`posts\` bilan birga oluvchi kod: \`User.find().populate('posts')\` ni qaytaring.",
      startingCode: "function getUsersWithPosts() {\n  \n}",
      hint: "User.find().populate('posts')",
      solution: "function getUsersWithPosts() {\n  return \"User.find().populate('posts')\";\n}",
      test: "const fn = new Function(code + '; return getUsersWithPosts;')();\nif(!fn().replace(/\\s/g,'').includes(\"find().populate('posts')\")) throw new Error('populate qismi xato');"
    },
    {
      id: 7,
      title: "Faqat kerakli ustunlarni olish (Select)",
      instruction: "SQL dagi kabi Mongoose da ham faqat ma'lum maydonlarni olish mumkin. Buni \`select()\` metodi bajaradi. Parolni o'qimaslik uchun \`User.find().select('-password')\` deb yoziladi. Shu matnni qaytaring.",
      startingCode: "function getWithoutPassword() {\n  \n}",
      hint: "User.find().select('-password')",
      solution: "function getWithoutPassword() {\n  return \"User.find().select('-password')\";\n}",
      test: "const fn = new Function(code + '; return getWithoutPassword;')();\nif(!fn().replace(/\\s/g,'').includes(\"select('-password')\")) throw new Error('select qismi xato');"
    },
    {
      id: 8,
      title: "Tartiblash (Sort)",
      instruction: "Mongoose da \`sort()\` metodi ishlatiladi. Yoshga (\`age\`) ko'ra kamayish tartibida olish kodini: \`User.find().sort({ age: -1 })\` tarzida qaytaring.",
      startingCode: "function sortByAgeDesc() {\n  \n}",
      hint: "User.find().sort({ age: -1 })",
      solution: "function sortByAgeDesc() {\n  return \"User.find().sort({ age: -1 })\";\n}",
      test: "const fn = new Function(code + '; return sortByAgeDesc;')();\nif(!fn().replace(/\\s/g,'').includes(\"sort({age:-1})\")) throw new Error('sort xato');"
    },
    {
      id: 9,
      title: "Sanoq olish (countDocuments)",
      instruction: "Native MongoDB dagi kabi \`User.countDocuments()\` ishlatsa bo'ladi. Shu so'rovni qaytaring.",
      startingCode: "function countUsers() {\n  \n}",
      hint: "User.countDocuments()",
      solution: "function countUsers() {\n  return \"User.countDocuments()\";\n}",
      test: "const fn = new Function(code + '; return countUsers;')();\nif(!fn().replace(/\\s/g,'').includes(\"countDocuments()\")) throw new Error('countDocuments xato');"
    },
    {
      id: 10,
      title: "Pagination - Skip va Limit",
      instruction: "Ma'lumotlarning ma'lum qismini olish. \`skip\` (o'tkazib yuborish) va \`limit\` (cheklov) orqali yoziladi. Parametrda skip va limit sonlari keladi. Kod: \`User.find().skip(s).limit(l)\` ko'rinishida bo'lsin.",
      startingCode: "function getPaginated(s, l) {\n  \n}",
      hint: "User.find().skip(${s}).limit(${l})",
      solution: "function getPaginated(s, l) {\n  return `User.find().skip(${s}).limit(${l})`;\n}",
      test: "const fn = new Function(code + '; return getPaginated;')();\nif(!fn(10, 5).replace(/\\s/g,'').includes(\"skip(10).limit(5)\")) throw new Error('skip yoki limit xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Mongoose nima maqsadda ishlatiladi?",
      options: ["Ma'lumotlar bazasini yaratish uchun", "Node.js da MongoDB bilan Object Data Modeling (ODM) arxitekturasida ishlash uchun", "Faqat React uchun", "MongoDB vizual interfeysi"],
      correctAnswer: 1,
      explanation: "Mongoose MongoDB ning rasmiy Node.js driveri ustiga qurilgan bo'lib, jadvallarga Schema qo'shish va bog'lanishlarni (populate) osonlashtirish uchun mo'ljallangan."
    },
    {
      id: 2,
      question: "Schema degani nima?",
      options: ["Ma'lumotlarning faqat nomini saqlovchi jadval", "Kolleksiyadagi hujjatning qanday tuzilishda, tiplarda bo'lishini va ularning cheklovlarini (validation) belgilab beruvchi qolip", "Boshqa bazaga ulash komandasi", "Parollarni shifrlash usuli"],
      correctAnswer: 1,
      explanation: "Schema orqali biz bazaga kiritilayotgan obyekt qanday ustunlarga (fields) va qanday tiplarga (String, Number) ega bo'lishi kerakligini belgilaymiz."
    },
    {
      id: 3,
      question: "Mongoose modelidagi \`required: true\` nimani anglatadi?",
      options: ["Bu maydon foydalanuvchiga ko'rinmaydi", "Bu maydon to'ldirilishi majburiydir, aks holda xato (Error) yuzaga keladi", "Maydon faqat raqamlardan iborat bo'lishi kerak", "Bu maydon doim unikaldur"],
      correctAnswer: 1,
      explanation: "Agar obyekt yaratishda required (majburiy) qilib qo'yilgan maydonga qiymat berilmasa, Mongoose bazaga jo'natmasdan ValidatorError qaytaradi."
    },
    {
      id: 4,
      question: "Modeldagi \`unique: true\` nimani ta'minlaydi?",
      options: ["Faqat bitta obyekt saqlashni", "Barcha foydalanuvchilar paroli bir xilligini", "Kolleksiya darajasida berilgan maydondagi qiymat takrorlanmas ekanligini (MongoDB da indeks ochib beradi)", "Bu maydonni o'zgartirib bo'lmasligini"],
      correctAnswer: 2,
      explanation: "Unique xususiyati bitta qiymat (masalan, email) bazada ikkinchi marta takrorlanishiga yo'l qo'ymaydi."
    },
    {
      id: 5,
      question: "\`populate()\` metodining vazifasi nima?",
      options: ["Bazada qancha ma'lumot borligini hisoblash", "Xotirani tozalash", "Boshqa kolleksiyaga tegishli bo'lgan obyekt(lar)ni ObjectId (ID) lari orqali topib, to'liq obyekt ko'rinishida olib kelish (SQL JOIN alternativasi)", "Massivlarni to'ldirish"],
      correctAnswer: 2,
      explanation: "MongoDB relatsion emas (JOIN yo'q), biroq Mongoose \`populate()\` yordamida IDsini olib, avtomatik boshqa kolleksiyadan kerakli ma'lumotni yuklab oladi."
    },
    {
      id: 6,
      question: "Parolni yashirish (so'rov natijasida qaytarmaslik) uchun qaysi yondashuv ishlatiladi?",
      options: ["select('-password')", "hide('password')", "exclude: password", "omit('password')"],
      correctAnswer: 0,
      explanation: "\`select()\` metodida maydon oldidan minus (-) belgisi qo'yilsa, shu maydon natijadan olib tashlanadi."
    },
    {
      id: 7,
      question: "Mongoose dagi \`timestamps: true\` konfiguratsiyasi nima qilib beradi?",
      options: ["Sana vaqtni faqat ko'rsatib turadi", "Hujjatga avtomatik ravishda \`createdAt\` va \`updatedAt\` maydonlarini qo'shadi hamda ularni boshqaradi", "Sanani sekundlarda ko'rsatadi", "Hech qanday farqi yo'q"],
      correctAnswer: 1,
      explanation: "Schema parametrlarida { timestamps: true } berilsa, Mongoose o'zi qachon obyekt yaratilgani va qachon yangilanganini qayd qilib boradi."
    },
    {
      id: 8,
      question: "\`findByIdAndUpdate(id, data, { new: true })\` dagi \`{ new: true }\` nima maqsadni bajaradi?",
      options: ["Yangidan id generatsiya qiladi", "Agar true bo'lmasa xato beradi", "O'zgartirilgan obyektning eng yangi (o'zgargan) holatini qaytaradi (aslida eski holati qaytishi kerak edi)", "Ma'lumot bazasida yangi kolleksiya ochadi"],
      correctAnswer: 2,
      explanation: "Agar { new: true } yozmasangiz, by default Mongoose obyektning update dan oldingi (eski) holatini qaytarib beradi."
    },
    {
      id: 9,
      question: "Mongoose da Middleware (yoki Pre/Post hook lari) qachon ishlatiladi?",
      options: ["Faqat sahifalar almashganda", "Masalan, \`save()\` qilinishidan oldin parolni hash (shifrlash) qilish yoki \`remove()\` dan keyin bog'liq rasmlarni o'chirib yuborish kabi amallarni avtomatlashtirish uchun", "Faqat front-end uchun", "Ma'lumot bazasiga ulanish uzilganda"],
      correctAnswer: 1,
      explanation: "Schema.pre('save', function) orqali ma'lumot bazaga borib tushishidan darhol oldin qo'shimcha ishlarni (password hashing) bajarish mumkin."
    },
    {
      id: 10,
      question: "Model metodlaridan \`findOne()\` qachon qulay?",
      options: ["Istalgan maydon (shart) asosida faqat birinchi duch kelgan bitta obyektni topishda (masalan email bo'yicha)", "Har doim ID bo'yicha qidirganda", "Barcha ob'yektlarni massiv qilib qaytarishda", "Faqat birinchi kolleksiyani qidirishda"],
      correctAnswer: 0,
      explanation: "findById faqat ID ga moslashgan, lekin findOne yordamida masalan { email: '...' } yoki boshqa istalgan shart bilan aynan 1 ta obyekt olish mumkin."
    },
    {
      id: 11,
      question: "\`Virtual\` maydonlar nima?",
      options: ["Haqiqatda DB da saqlanmaydigan, faqat mavjud maydonlar asosida hisoblanib keladigan mantiqiy (vaqtinchalik) maydonlar (masalan: ism + familiya = to'liq ism)", "DB dagi haqiqiy saqlanadigan ma'lumot", "Tushunib bo'lmaydigan xotira bo'lagi", "Modelni himoyalash tizimi"],
      correctAnswer: 0,
      explanation: "Virtual maydonlar yordamida siz bazadagi bo'lak-bo'lak ma'lumotlarni birlashtirib obyekt o'qilganda hisoblanadigan field larni qo'shishingiz mumkin, ular DB xotirasini band qilmaydi."
    },
    {
      id: 12,
      question: "Mongoose bilan ulangan DB da qidiruvni \`RegEx\` orqali amalga oshirish nima uchun kerak?",
      options: ["Faqat butun sonlarni topish uchun", "Ma'lumotlarni qisman yoki harf registriga e'tibor bermay (Like qidiruv - masalan, search) topish uchun", "Parolni tiklash uchun", "Rasm izlash uchun"],
      correctAnswer: 1,
      explanation: "Mongoose/MongoDB da SQL dagi \`LIKE '%abc%'\` kabi ishlash uchun RegExp (Regular Expression) dan foydalaniladi. Masalan: { title: { $regex: 'query', $options: 'i' } }."
    }
  ]
};
