export const mongooseDb = {
  id: "mongoose_db",
  title: "Mongoose bilan Ishlash (ODM)",
  language: "javascript",
  theory: `## 1. 💡 Mongoose: Beginner Analogy (Sodda Tushuntirish)

Tasavvur qiling, sizning bir omboringiz (MongoDB) bor. Bu ombor juda katta va unga xohlagan narsangizni xohlagan qutiga solib qo'yishingiz mumkin (schema-less). Siz "Ismlar" qutisiga raqam, "Yosh" qutisiga esa harf solib qo'ysangiz ham, omborchi indamaydi. 
Lekin, vaqt o'tishi bilan omborda tartibsizlik yuzaga keladi. Sizga qattiqqo'l nazoratchi (Mongoose) kerak! Mongoose sizga har bir qutining o'z qoidasini (Schema) o'rnatishga yordam beradi: "Bu yerga faqat yoshi 18 dan kattalar ro'yxati yoziladi", "Bu yerga faqat elektron pochta yoziladi", deb qoidalarni kiritasiz. Endi xato ma'lumot kiritilsa, Mongoose uni omborga kiritmay, qaytarib yuboradi.

## 2. 🚀 Deep Dive (Chuqur O'rganish)

### 2.1 Under the Hood (Mongoose qanday ishlaydi?)
Mongoose bu Node.js uchun MongoDB bilan ishlashni osonlashtiruvchi Object Data Modeling (ODM) kutubxonasi hisoblanadi. U to'g'ridan-to'g'ri MongoDB driver'i ustiga qurilgan bo'lib, uning vazifasi – ma'lumotlar ustida qat'iy tekshiruv (validation), xususiyatlar bog'lanishi (populate) va turli avtomatlashtirilgan jarayonlarni (middlewares) ta'minlashdir.

### 2.2 Schema Validation (Qat'iy qoidalar)
Mongoose ning eng kuchli tomoni – uning qoliplari (Schemas).

\\\`\\\`\\\`javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,      // Majburiy maydon
    unique: true,        // Bitta email faqat 1 marta ishlatilishi kerak
    trim: true,          // Boshida va oxiridagi bo'sh joylarni kesib tashlash
    lowercase: true      // Hamma harflarni kichik qilib saqlash
  },
  age: {
    type: Number,
    min: [18, 'Yosh kamida 18 bo\\'lishi kerak!'], // Xato xabari
    max: 100
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'], // Faqat shu 3 ta qiymatdan biri bo'lishi mumkin
    default: 'user'
  }
});
\\\`\\\`\\\`

### 2.3 Middleware (Hooks)
Mongoose da \\\`pre\\\` va \\\`post\\\` hooklari (ilmoqlar) orqali ma'lum bir amal bajarilishidan oldin yoki keyin qandaydir logikani ishga tushirish mumkin. Masalan, foydalanuvchi parolini saqlashdan oldin uni hash qilish:

\\\`\\\`\\\`javascript
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next(); // Keyingi qadamga o'tish
});
\\\`\\\`\\\`

### 2.4 Connection Pooling (Ulanishlarni boshqarish)
MongoDB da bitta so'rov uchun har safar yangi ulanish (connection) ochilmaydi. Mongoose "Connection Pool" orqali ma'lum miqdordagi ulanishlarni ochiq saqlaydi va tez ishlashini ta'minlaydi. Odatda Mongoose uchun bu ko'rsatkich 100 atrofida (v6+ da default poolSize). 

## 3. ⚠️ Edge Cases va Senior Interview Savollari

1. **MongoDB da Transaction'lar bormi va Mongoose uni qanday qabul qiladi?**
   *Javob:* Ha, Replica Set o'rnatilgan bo'lsa (yoki MongoDB Atlas), MongoDB 4.0 dan boshlab ACID tranzaksiyalarni qo'llab-quvvatlaydi. Mongoose da \\\`session.withTransaction()\\\` orqali ishlatsa bo'ladi. Bu orqali 2 ta hujjat bir vaqtda yangilanayotganda bittasida xato bo'lsa, ikkinchisi ham bekor bo'ladi (Rollback).

2. **\\\`populate()\\\` metodi nega ba'zida sekin ishlashi mumkin va uning o'rniga nima ishlatsa bo'ladi?**
   *Javob:* \\\`populate\\\` orqa fonda asosan bir nechta so'rovlarni bajaradi. Agar millionlab ma'lumotlar bo'lsa, uning o'rniga MongoDB Aggregate \\\`$lookup\\\` metodini ishlatish tavsiya etiladi.

3. **Lean query nima? Qachon ishlatiladi?**
   *Javob:* Mongoose \\\`find()\\\` orqali obyekt qaytarsa, u xotirada katta "Mongoose Document" obyekti bo'ladi (ichida save, remove kabi funksiyalari bor). Agar siz ma'lumotni faqat o'qimoqchi bo'lsangiz (Read-Only), so'rov oxirida \\\`.lean()\\\` ishlatish kerak: \\\`User.find().lean()\\\`. Bu toza JS obyekti qaytaradi va xotira hamda vaqtdan kamida 3-5 marta yutadi.

## 4. 📊 Diagramma: Mongoose Ishlash Arxitekturasi

\\\`\\\`\\\`mermaid
graph TD
    A[Client Request] --> B[Express Node.js]
    B --> C[Mongoose Model Query]
    C --> D[Mongoose Schema Validators]
    D -- Validatsiya o'tdi --> E[MongoDB Connection Pool]
    D -- Validatsiya XATO --> F[Mongoose Error Exception]
    E --> G[MongoDB Database]
    G --> E
    E --> C
    C --> B
    B --> A
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Barcha foydalanuvchilarni topish",
      instruction: "Mongoose da barcha ma'lumotni olish uchun qaysi metod ishlatiladi? Model nomi `User` bo'lsa, uni `User.find()` deb yozing va shuni matn qilib qaytaring.",
      startingCode: "function findAll() {\n  \n}",
      hint: "return 'User.find()';",
      solution: "function findAll() {\n  return 'User.find()';\n}",
      test: "const fn = new Function(code + '; return findAll;')();\nif(fn().replace(/\\s/g,'') !== 'User.find()') throw new Error('find xato');"
    },
    {
      id: 2,
      title: "ID orqali topish (findById)",
      instruction: "Faqat Mongoose da bor bo'lgan va ID bo'yicha qidirishni ancha qulaylashtirgan `findById` metodi bor. Parametr sifatida `id` kelsa, `User.findById(id)` ko'rinishidagi so'rovni matn holida qaytaring.",
      startingCode: "function findUserById(id) {\n  \n}",
      hint: "return `User.findById(${id})`;",
      solution: "function findUserById(id) {\n  return `User.findById(${id})`;\n}",
      test: "const fn = new Function(code + '; return findUserById;')();\nif(!fn(5).replace(/\\s/g,'').includes(\"findById(5)\")) throw new Error('findById xato');"
    },
    {
      id: 3,
      title: "Yangi obyekt yaratish (create)",
      instruction: "Mongoose orqali bitta yoki bir nechta qator qo'shish uchun ham ishlaydigan bitta `create()` metodi bor. Ism (name) ni olib, `User.create({ name: '...'}) ` ni string qilib qaytaring.",
      startingCode: "function createUser(name) {\n  \n}",
      hint: "return `User.create({ name: '${name}' })`;",
      solution: "function createUser(name) {\n  return `User.create({ name: '${name}' })`;\n}",
      test: "const fn = new Function(code + '; return createUser;')();\nif(!fn('Ali').replace(/\\s/g,'').includes(\"create({name:'Ali'})\")) throw new Error('create xato');"
    },
    {
      id: 4,
      title: "ID bo'yicha yangilash",
      instruction: "Mongoose da `findByIdAndUpdate` metodi juda qulay. Unda `{ new: true }` parametrini bersangiz, yangilangan ob'ektning o'zini qaytaradi. `id` va `name` kelsa, shuni yangilaydigan kodni qaytaring.",
      startingCode: "function updateById(id, name) {\n  \n}",
      hint: "return `User.findByIdAndUpdate(${id}, { name: '${name}' }, { new: true })`;",
      solution: "function updateById(id, name) {\n  return `User.findByIdAndUpdate(${id}, { name: '${name}' }, { new: true })`;\n}",
      test: "const fn = new Function(code + '; return updateById;')();\nconst res = fn(1, 'Hasan').replace(/\\s/g,'');\nif(!res.includes(\"findByIdAndUpdate(1,{name:'Hasan'},{new:true})\")) throw new Error('findByIdAndUpdate yoki new:true qismi xato');"
    },
    {
      id: 5,
      title: "ID bo'yicha o'chirish",
      instruction: "`findByIdAndDelete` (yoki findByIdAndRemove) metodi mavjud. Id orqali o'chirish kodini `User.findByIdAndDelete(id)` tarzida qaytaring.",
      startingCode: "function deleteById(id) {\n  \n}",
      hint: "return `User.findByIdAndDelete(${id})`;",
      solution: "function deleteById(id) {\n  return `User.findByIdAndDelete(${id})`;\n}",
      test: "const fn = new Function(code + '; return deleteById;')();\nif(!fn(10).replace(/\\s/g,'').includes(\"findByIdAndDelete(10)\")) throw new Error('findByIdAndDelete xato');"
    },
    {
      id: 6,
      title: "Ma'lumotlarni bog'lash (Populate)",
      instruction: "Agar userning `posts` ro'yxati (ID lar) bo'lsa, ularni to'liq obyektga aylantirib kelish uchun `populate` ishlatiladi. Barcha userlarni `posts` bilan birga oluvchi kod: `User.find().populate('posts')` ni qaytaring.",
      startingCode: "function getUsersWithPosts() {\n  \n}",
      hint: "return \"User.find().populate('posts')\";",
      solution: "function getUsersWithPosts() {\n  return \"User.find().populate('posts')\";\n}",
      test: "const fn = new Function(code + '; return getUsersWithPosts;')();\nif(!fn().replace(/\\s/g,'').includes(\"find().populate('posts')\")) throw new Error('populate qismi xato');"
    },
    {
      id: 7,
      title: "Faqat kerakli ustunlarni olish (Select)",
      instruction: "SQL dagi kabi Mongoose da ham faqat ma'lum maydonlarni olish mumkin. Buni `select()` metodi bajaradi. Parolni o'qimaslik uchun `User.find().select('-password')` deb yoziladi. Shu matnni qaytaring.",
      startingCode: "function getWithoutPassword() {\n  \n}",
      hint: "return \"User.find().select('-password')\";",
      solution: "function getWithoutPassword() {\n  return \"User.find().select('-password')\";\n}",
      test: "const fn = new Function(code + '; return getWithoutPassword;')();\nif(!fn().replace(/\\s/g,'').includes(\"select('-password')\")) throw new Error('select qismi xato');"
    },
    {
      id: 8,
      title: "Tartiblash (Sort)",
      instruction: "Mongoose da `sort()` metodi ishlatiladi. Yoshga (`age`) ko'ra kamayish tartibida olish kodini: `User.find().sort({ age: -1 })` tarzida qaytaring.",
      startingCode: "function sortByAgeDesc() {\n  \n}",
      hint: "return \"User.find().sort({ age: -1 })\";",
      solution: "function sortByAgeDesc() {\n  return \"User.find().sort({ age: -1 })\";\n}",
      test: "const fn = new Function(code + '; return sortByAgeDesc;')();\nif(!fn().replace(/\\s/g,'').includes(\"sort({age:-1})\")) throw new Error('sort xato');"
    },
    {
      id: 9,
      title: "Sanoq olish (countDocuments)",
      instruction: "Native MongoDB dagi kabi `User.countDocuments()` ishlatsa bo'ladi. Shu so'rovni qaytaring.",
      startingCode: "function countUsers() {\n  \n}",
      hint: "return \"User.countDocuments()\";",
      solution: "function countUsers() {\n  return \"User.countDocuments()\";\n}",
      test: "const fn = new Function(code + '; return countUsers;')();\nif(!fn().replace(/\\s/g,'').includes(\"countDocuments()\")) throw new Error('countDocuments xato');"
    },
    {
      id: 10,
      title: "Pagination - Skip va Limit",
      instruction: "Ma'lumotlarning ma'lum qismini olish. `skip` (o'tkazib yuborish) va `limit` (cheklov) orqali yoziladi. Parametrda skip va limit sonlari keladi. Kod: `User.find().skip(s).limit(l)` ko'rinishida bo'lsin.",
      startingCode: "function getPaginated(s, l) {\n  \n}",
      hint: "return `User.find().skip(${s}).limit(${l})`;",
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
      question: "Mongoose modelidagi `required: true` nimani anglatadi?",
      options: ["Bu maydon foydalanuvchiga ko'rinmaydi", "Bu maydon to'ldirilishi majburiydir, aks holda xato (Error) yuzaga keladi", "Maydon faqat raqamlardan iborat bo'lishi kerak", "Bu maydon doim unikaldur"],
      correctAnswer: 1,
      explanation: "Agar obyekt yaratishda required (majburiy) qilib qo'yilgan maydonga qiymat berilmasa, Mongoose bazaga jo'natmasdan ValidatorError qaytaradi."
    },
    {
      id: 4,
      question: "Modeldagi `unique: true` nimani ta'minlaydi?",
      options: ["Faqat bitta obyekt saqlashni", "Barcha foydalanuvchilar paroli bir xilligini", "Kolleksiya darajasida berilgan maydondagi qiymat takrorlanmas ekanligini (MongoDB da indeks ochib beradi)", "Bu maydonni o'zgartirib bo'lmasligini"],
      correctAnswer: 2,
      explanation: "Unique xususiyati bitta qiymat (masalan, email) bazada ikkinchi marta takrorlanishiga yo'l qo'ymaydi."
    },
    {
      id: 5,
      question: "`populate()` metodining vazifasi nima?",
      options: ["Bazada qancha ma'lumot borligini hisoblash", "Xotirani tozalash", "Boshqa kolleksiyaga tegishli bo'lgan obyekt(lar)ni ObjectId (ID) lari orqali topib, to'liq obyekt ko'rinishida olib kelish (SQL JOIN alternativasi)", "Massivlarni to'ldirish"],
      correctAnswer: 2,
      explanation: "MongoDB relatsion emas (JOIN yo'q), biroq Mongoose `populate()` yordamida IDsini olib, avtomatik boshqa kolleksiyadan kerakli ma'lumotni yuklab oladi."
    },
    {
      id: 6,
      question: "Parolni yashirish (so'rov natijasida qaytarmaslik) uchun qaysi yondashuv ishlatiladi?",
      options: ["select('-password')", "hide('password')", "exclude: password", "omit('password')"],
      correctAnswer: 0,
      explanation: "`select()` metodida maydon oldidan minus (-) belgisi qo'yilsa, shu maydon natijadan olib tashlanadi."
    },
    {
      id: 7,
      question: "Mongoose dagi `timestamps: true` konfiguratsiyasi nima qilib beradi?",
      options: ["Sana vaqtni faqat ko'rsatib turadi", "Hujjatga avtomatik ravishda `createdAt` va `updatedAt` maydonlarini qo'shadi hamda ularni boshqaradi", "Sanani sekundlarda ko'rsatadi", "Hech qanday farqi yo'q"],
      correctAnswer: 1,
      explanation: "Schema parametrlarida { timestamps: true } berilsa, Mongoose o'zi qachon obyekt yaratilgani va qachon yangilanganini qayd qilib boradi."
    },
    {
      id: 8,
      question: "`findByIdAndUpdate(id, data, { new: true })` dagi `{ new: true }` nima maqsadni bajaradi?",
      options: ["Yangidan id generatsiya qiladi", "Agar true bo'lmasa xato beradi", "O'zgartirilgan obyektning eng yangi (o'zgargan) holatini qaytaradi (aslida eski holati qaytishi kerak edi)", "Ma'lumot bazasida yangi kolleksiya ochadi"],
      correctAnswer: 2,
      explanation: "Agar { new: true } yozmasangiz, by default Mongoose obyektning update dan oldingi (eski) holatini qaytarib beradi."
    },
    {
      id: 9,
      question: "Mongoose da Middleware (yoki Pre/Post hook lari) qachon ishlatiladi?",
      options: ["Faqat sahifalar almashganda", "Masalan, `save()` qilinishidan oldin parolni hash (shifrlash) qilish yoki `remove()` dan keyin bog'liq rasmlarni o'chirib yuborish kabi amallarni avtomatlashtirish uchun", "Faqat front-end uchun", "Ma'lumot bazasiga ulanish uzilganda"],
      correctAnswer: 1,
      explanation: "Schema.pre('save', function) orqali ma'lumot bazaga borib tushishidan darhol oldin qo'shimcha ishlarni (password hashing) bajarish mumkin."
    },
    {
      id: 10,
      question: "Model metodlaridan `findOne()` qachon qulay?",
      options: ["Istalgan maydon (shart) asosida faqat birinchi duch kelgan bitta obyektni topishda (masalan email bo'yicha)", "Har doim ID bo'yicha qidirganda", "Barcha ob'yektlarni massiv qilib qaytarishda", "Faqat birinchi kolleksiyani qidirishda"],
      correctAnswer: 0,
      explanation: "findById faqat ID ga moslashgan, lekin findOne yordamida masalan { email: '...' } yoki boshqa istalgan shart bilan aynan 1 ta obyekt olish mumkin."
    },
    {
      id: 11,
      question: "`Virtual` maydonlar nima?",
      options: ["Haqiqatda DB da saqlanmaydigan, faqat mavjud maydonlar asosida hisoblanib keladigan mantiqiy (vaqtinchalik) maydonlar (masalan: ism + familiya = to'liq ism)", "DB dagi haqiqiy saqlanadigan ma'lumot", "Tushunib bo'lmaydigan xotira bo'lagi", "Modelni himoyalash tizimi"],
      correctAnswer: 0,
      explanation: "Virtual maydonlar yordamida siz bazadagi bo'lak-bo'lak ma'lumotlarni birlashtirib obyekt o'qilganda hisoblanadigan field larni qo'shishingiz mumkin, ular DB xotirasini band qilmaydi."
    },
    {
      id: 12,
      question: "Mongoose da natijani faqat o'qish uchun (tez ishlash maqsadida) toza JSON holatida olish usuli qaysi?",
      options: ["find().pure()", "find().json()", "find().lean()", "find().readOnly()"],
      correctAnswer: 2,
      explanation: "Agar siz Mongoose Document obyektidan (save, remove funksiyalari yo'q) kechib, faqat DB dagi toza JavaScript obyektni olmoqchi bo'lsangiz .lean() metodidan foydalanasiz. Bu yuzlab marta tezroq ishlashi mumkin."
    }
  ]
};
