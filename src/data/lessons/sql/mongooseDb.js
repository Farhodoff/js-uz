export const mongooseDb = {
  id: "mongooseDb",
  title: "Mongoose ODM va MongoDB",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### MongoDB va Mongoose nima?
* **MongoDB:** Bu reliesion (SQL) bazalardan farqli ravishda, ma'lumotlarni jadvallarda emas, balki **hujjatlar (documents)** ko'rinishida saqlaydigan NoSQL ma'lumotlar bazasi. Hujjatlar JSON (BSON) formatida yoziladi va ular juda moslashuvchan.
* **Mongoose:** Bu MongoDB uchun yozilgan **ODM (Object Document Mapper)** kutubxonasi. U Node.js dasturi va MongoDB o'rtasida ko'prik vazifasini bajaradi. U bazaga yozilayotgan ma'lumotlar ma'lum bir tartibda (Schema) bo'lishini va tekshiruvlardan (Validation) o'tishini ta'minlaydi.

### SQL vs MongoDB (NoSQL) o'xshatishsi
Keling, ularni **Kutubxona** tizimi orqali solishtiramiz:
* **SQL (Relyatsion):** Bu an'anaviy kutubxona kartotekasi. Har bir kitob haqida ma'lumot qat'iy ustunlari bor jadvalga yoziladi (ID, Nomi, Muallif, Chiqilgan yili). Agar kitobning bir nechta muallifi bo'lsa, siz alohida \`Mualliflar\` jadvalini yaratib, ularni kitobga bog'lashingiz shart (JOIN yordamida).
* **MongoDB (NoSQL):** Bu har bir kitob uchun alohida **kichik papka (hujjat)**. Ushbu papka ichida kitob nomi, uning mualliflari massivi va hatto boblar ro'yxatini ham bitta fayl ichida saqlash mumkin. Hech qanday murakkab bog'lanishlarsiz barcha ma'lumot bitta joyda (Document) jamlanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Schema va Model yaratish)
Mongoose-da foydalanuvchilar kolleksiyasi uchun oddiy sxema va model yaratish:
\`\`\`javascript
const mongoose = require('mongoose');

// 1. Schema loyihasini chizamiz
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number
});

// 2. Sxema asosida model (klass) yaratamiz
const User = mongoose.model('User', userSchema);
\`\`\`

### 2. Intermediate Example (Validatsiya va Middleware)
Sxema ichida maydonlarni tekshirish (validation) va ma'lumot saqlanishidan oldin ishlovchi hook (middleware):
\`\`\`javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Foydalanuvchi nomi kiritilishi shart'],
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

// Pre-save hook: Parol bazaga saqlanishidan oldin uni hash qilish
userSchema.pre('save', async function(next) {
  // Faqat parol maydoni o'zgargandagina hash qilamiz
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
\`\`\`

### 3. Advanced Example (Bog'liqliklar va Population)
Ikki kolleksiyani (User va Post) bir-biriga bog'lash va so'rov paytida birlashtirish:
\`\`\`javascript
// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User modeliga ishora (reference)
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

// So'rov paytida populate yordamida muallif ma'lumotlarini qo'shib olish
async function getPostWithAuthor(postId) {
  const post = await Post.findById(postId).populate('author', 'name email');
  console.log(post);
  /* Natijada author maydoni faqat ID emas, to'liq User obyektiga aylanadi:
     {
       title: "Mongoose Asoslari",
       author: { _id: "...", name: "Farhod", email: "farhod@example.com" }
     }
  */
}
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Sxemasiz bazaga sxema berish:** MongoDB aslini olganda sxemasiz (schema-less) baza hisoblanadi, ya'ni istalgan hujjatga istalgan maydonni saqlab yuborish mumkin. Mongoose dastur darajasida sxema o'rnatib, tartib va izchillikni ta'minlaydi.
2. **Validatsiya yukini yengillatish:** Bazaga noto'g'ri (masalan, yoshi manfiy yoki formati noto'g'ri email) ma'lumotlar kirishining oldini olishni to'g'ridan-to'g'ri schema darajasida hal qiladi.
3. **Ma'lumotlar hayotiy siklini boshqarish (Lifecycle hooks):** Ma'lumot yozilishi, o'chirilishi yoki yangilanishi jarayonlariga aralashish, parollarni avtomat hashlash yoki log yuritish imkonini beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Hook (Middleware) ichida Arrow funksiyalarni ishlatish
#### Xato:
\`\`\`javascript
userSchema.pre('save', (next) => {
  this.password = hash(this.password); // Xatolik! this undefined bo'ladi
  next();
});
\`\`\`
#### Tuzatish:
Mongoose hooklarida joriy hujjatni (document) anglatuvchi \`this\` konteksti to'g'ri ishlashi uchun **oddiy funksiya** ishlatish shart.
\`\`\`javascript
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = hash(this.password);
  }
  next();
});
\`\`\`

### 2. Har doim to'liq Mongoose hujjatini qaytarish (Optimallashtirish yo'qligi)
#### Xato:
Faqat ma'lumotni o'qish (read-only) uchun qilinadigan so'rovlarda ham og'ir Mongoose Document klassini yuklash.
#### Tuzatish:
Faqat o'qish uchun bo'lgan so'rovlarda \`.lean()\` metodini ishlating. Bu so'rov tezligini 4-5 baravargacha oshiradi.
\`\`\`javascript
const users = await User.find().lean(); // Oddiy yengil JS obyekti qaytadi
\`\`\`

### 3. Population ref model nomini xato yozish
#### Xato:
\`ref: 'user'\` (model nomi kichik harfda, aslida model \`User\` deb nomlangan).
#### Tuzatish:
Mongoose model yaratilgan nomga sezgir (case-sensitive). Model qanday nomlangan bo'lsa (\`mongoose.model('User', ...)\`), ref kalitida ham xuddi shunday (\`ref: 'User'\`) yozilishi shart.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Mongoose-da Schema va Model o'rtasidagi farq nima?
   * **Javob:** Schema - bu ma'lumotlar tuzilishi va qoidalarini belgilaydigan loyiha (blueprint). Model esa shu sxema asosida yaratilgan klass bo'lib, u orqali bazada yaratish, o'qish, yangilash va o'chirish (CRUD) amallari bajariladi.
2. **Savol:** \`required: true\` nima vazifani bajaradi?
   * **Javob:** Belgilangan maydon kiritilishi majburiy ekanligini bildiradi. Agar u berilmasa, Mongoose validatsiya xatosini qaytaradi va ma'lumot saqlanmaydi.
3. **Savol:** Mongoose-da qanday asosiy ma'lumot turlari mavjud?
   * **Javob:** String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array va Decimal128.
4. **Savol:** \`unique: true\` validatsiya hisoblanadimi?
   * **Javob:** Yo'q, u Mongoose validator emas. U MongoDB darajasida yagona indeks (unique index) yaratadi. Shuning uchun uning xatolarini ushlash uchun validator xatolari emas, MongoDB error handling ishlatiladi.

### Middle (5–8)
5. **Savol:** Pre va Post middleware-lar farqi nimada?
   * **Javob:** \`pre\` middleware ma'lum bir hodisa (masalan, save yoki validate) bajarilishidan oldin ishlaydi va \`next()\` orqali zanjirni davom ettiradi. \`post\` middleware esa hodisa muvaffaqiyatli bajarilib bo'lingandan keyin ishlaydi va uning ichida \`next\` chaqirilmaydi.
6. **Savol:** \`isModified()\` metodi nima uchun kerak?
   * **Javob:** Hujjatdagi biror maydon qiymati o'zgarganligini tekshirish uchun ishlatiladi. Ko'pincha parolni faqat o'zgargandagina hash qilishda \`isModified('password')\` ko'rinishida qo'llaniladi.
7. **Savol:** Virtual xossalar nima va ularning afzalligi nimada?
   * **Javob:** Virtual maydonlar bazada saqlanmaydi, lekin so'rov paytida dinamik hisoblanadi (masalan, firstName va lastName birlashib fullName qaytarishi). Ular bazada ortiqcha joy egallamaslik imkonini beradi.
8. **Savol:** Mongoose-da ma'lumotlarni bog'lash (Relationships) qanday amalga oshiriladi?
   * **Javob:** Schema maydoniga \`mongoose.Schema.Types.ObjectId\` turini berish va bog'lanadigan model nomini \`ref\` kaliti orqali ko'rsatish orqali amalga oshiriladi.

### Senior (9–12)
9. **Savol:** Mongoose-da \`.lean()\` metodining ishlash mexanizmi va ahamiyati nimada?
   * **Javob:** Sukut bo'yicha Mongoose so'rovlarida to'liq Mongoose Document obyekti qaytadi, unda \`save()\`, \`validate()\`, getters/setters kabi og'ir metodlar bo'ladi. \`.lean()\` ishlatilganda, Mongoose bularni yuklamaydi, faqat toza POJO (Plain Old JavaScript Object) qaytaradi, bu xotirani tejaydi va tezlikni sezilarli oshiradi.
10. **Savol:** Mongoose-da save lifecycle ketma-ketligi qanday?
    * **Javob:** Quyidagi tartibda amalga oshadi: pre('validate') -> validation jarayoni -> post('validate') -> pre('save') -> bazaga yozish -> post('save').
11. **Savol:** Mongoose-da tranzaksiyalar (Transactions) qanday ishlaydi?
    * **Javob:** MongoDB Replica Set-da ishlayotganda Mongoose tranzaksiyalarni qo'llab-quvvatlaydi. Buning uchun \`connection.startSession()\` orqali sessiya ochiladi, keyin \`session.startTransaction()\` chaqiriladi va barcha yozish amallari shu sessiya doirasida bajariladi. Xatolik bo'lsa \`abortTransaction()\`, muvaffaqiyatli tugasa \`commitTransaction()\` qilinadi.
12. **Savol:** Discriminators nima va qachon ishlatiladi?
    * **Javob:** Discriminators - bu bir xil kolleksiyadagi ma'lumotlar uchun merosxo'rlik (inheritance) mexanizmi. Masalan, bitta \`User\` kolleksiyasida \`Customer\` va \`Admin\` sxemalarini bir-biridan farqli maydonlar bilan saqlashda ishlatiladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Ushbu dars amaliy topshiriqlarida siz Mongoose schemalari yaratish, validatsiyalarni sozlash va pre-save hooklari yozish bo'yicha ko'nikmalaringizni sinab ko'rasiz.

---

## 7. 📝 12 ta Mini Test

Bilimingizni sinash va mustahkamlash uchun dars oxirida 12 ta interaktiv test taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Avtomatlashtirilgan foydalanuvchi akkaunti hayotiy sikli

Haqiqiy loyihalarda foydalanuvchi ro'yxatdan o'tganda parolni xavfsiz saqlash, ism-familiyani birlashtirib ko'rsatish va profil rasmini default sozlash talab qilinadi. Quyida Mongoose-da bular qanday integratsiya qilinishi ko'rsatilgan:

\`\`\`javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  avatarUrl: { type: String, default: 'https://example.com/default-avatar.png' }
}, {
  timestamps: true // createdAt va updatedAt maydonlarini avtomat yaratadi
});

// 1. Virtual property orqali to'liq ismni hisoblash
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});

// 2. Pre-save hook orqali parolni hash qilish va default qiymatlarni sozlash
userSchema.pre('save', async function(next) {
  // Parol o'zgargan bo'lsa hashlaymiz
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
\`\`\`

---

## 9. 🚀 Performance va Optimization

1. **Indekslardan to'g'ri foydalanish:** Tez-tez qidiriladigan maydonlarga (\`email\`, \`username\`) sxema darajasida \`index: true\` yoki \`unique: true\` bering.
2. **Maydonlarni cheklash (Projection):** So'rov paytida keraksiz maydonlarni (masalan, katta matnlar yoki parollar) chetlab o'ting:
   \`\`\`javascript
   const users = await User.find().select('name email'); // Parol va boshqa maydonlar yuklanmaydi
   \`\`\`
3. **Mongoose Save Lifecycle Visual:**

\`\`\`mermaid
graph TD
    A[Model.save chaqirilishi] --> B[pre 'validate' hook]
    B --> C[Mongoose validatsiya jarayoni]
    C --> D[post 'validate' hook]
    D --> E[pre 'save' hook]
    E --> F[MongoDB bazasiga yozish operatsiyasi]
    F --> G[post 'save' hook]
    G --> H[Natija qaytishi]
\`\`\`

---

## 10. 📌 Cheat Sheet

| Metod / Kalit | Sintaksis / Vazifasi | Misol |
| :--- | :--- | :--- |
| **Schema yaratish** | \`new mongoose.Schema({ ... })\` | Sxema tuzilmasini aniqlash |
| **Model yaratish** | \`mongoose.model('ModelName', schema)\` | Bazaga so'rov yuboruvchi klass |
| **Pre Hook** | \`schema.pre('save', function(next) { ... })\` | Saqlashdan oldin bajariladigan funksiya |
| **Post Hook** | \`schema.post('save', function(doc) { ... })\` | Saqlab bo'lingandan keyin bajariladigan funksiya |
| **Population** | \`query.populate('field')\` | Bog'langan obyekt ma'lumotlarini yuklash |
| **Lean Queries** | \`query.lean()\` | Mongoose klassisiz oddiy tezkor obyekt olish |
| **Select Fields** | \`query.select('a -b')\` | Kerakli maydonlarni tanlash yoki chetlatish |
`,
  exercises: [
  {
    "id": 1,
    "title": "Mongoose Schema yaratish",
    "instruction": "Mongoose-da foydalanuvchilar (User) uchun schema yarating. Foydalanuvchi schemasi quyidagi maydonlarga va ularning validatsiyalariga ega bo'lishi shart:\n- `username` (String, majburiy (required: true), bo'sh joylar bosh va oxiridan kesilgan (trim: true))\n- `email` (String, majburiy (required: true), kichik harfga o'tkazilgan (lowercase: true))\n- `age` (Number, minimal qiymati 18 bo'lishi kerak)\n- `createdAt` (Date, sukut bo'yicha joriy vaqt ya'ni `Date.now` funksiyasi)\n\nFunksiya nomi `createUserSchema(mongoose)` bo'lsin va u yangi Mongoose Schema obyektini qaytarsin.",
    "startingCode": "function createUserSchema(mongoose) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "new mongoose.Schema({ username: { type: String, required: true, trim: true }, ... }) ko'rinishida yozing.",
    "test": "const mockMongoose = {\n  Schema: class {\n    constructor(obj) {\n      this.obj = obj;\n    }\n  }\n};\nconst sandbox = new Function(code + '; return createUserSchema;');\nconst fn = sandbox();\nconst schema = fn(mockMongoose);\nif (!schema || !schema.obj) return 'Schema obyekti qaytarilmadi';\nconst obj = schema.obj;\nif (!obj.username || obj.username.type !== String || !obj.username.required || !obj.username.trim) {\n  return 'username maydoni to\\'g\\'ri konfiguratsiya qilinmagan (String, required, trim)';\n}\nif (!obj.email || obj.email.type !== String || !obj.email.required || !obj.email.lowercase) {\n  return 'email maydoni to\\'g\\'ri konfiguratsiya qilinmagan (String, required, lowercase)';\n}\nif (!obj.age || obj.age.type !== Number || obj.age.min !== 18) {\n  return 'age maydoni to\\'g\\'ri konfiguratsiya qilinmagan (Number, min: 18)';\n}\nif (!obj.createdAt || obj.createdAt.type !== Date || (obj.createdAt.default !== Date.now && typeof obj.createdAt.default !== 'function')) {\n  return 'createdAt maydoni to\\'g\\'ri konfiguratsiya qilinmagan (Date, default: Date.now)';\n}\nreturn null;"
  },
  {
    "id": 2,
    "title": "Pre-save Hook orqali parolni hash qilish",
    "instruction": "Foydalanuvchi parolini bazaga saqlashdan oldin uni hash qiladigan pre-save middleware qo'shuvchi `addPasswordHook(schema, hashFunction)` funksiyasini yozing. Bu funksiya berilgan `schema`-ga pre-save hook (`pre('save', ...)`) qo'shishi kerak. Agar parol maydoni (`password`) o'zgartirilgan bo'lsa (`isModified('password')`), uni `hashFunction(password)` yordamida hashlab, parolni yangilang. Middleware yakunida keyingi bosqichga o'tish uchun `next()` funksiyasini chaqiring. (Eslatma: hook funksiyasi ichida `this` joriy hujjatni (document) anglatishi uchun oddiy funksiyadan (arrow funksiya emas) foydalaning).",
    "startingCode": "function addPasswordHook(schema, hashFunction) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "schema.pre('save', function(next) { if (this.isModified('password')) { this.password = hashFunction(this.password); } next(); })",
    "test": "let hookType, hookFn;\nconst mockSchema = {\n  pre(type, fn) {\n    hookType = type;\n    hookFn = fn;\n  }\n};\nconst sandbox = new Function(code + '; return addPasswordHook;');\nconst fn = sandbox();\nfn(mockSchema, (pwd) => pwd + '_hashed');\nif (hookType !== 'save') return 'save pre-hook qo\\'shilmadi';\nif (typeof hookFn !== 'function') return 'Hook funksiyasi to\\'g\\'ri yozilmagan';\nlet nextCalled = false;\nconst mockDoc = {\n  password: '123',\n  isModified(field) { return field === 'password'; },\n  next() { nextCalled = true; }\n};\nhookFn.call(mockDoc, () => { nextCalled = true; });\nif (mockDoc.password !== '123_hashed') return 'Parol hash qilinmadi';\nif (!nextCalled) return 'next() chaqirilmadi';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Virtual xossa (fullName) qo'shish",
    "instruction": "Foydalanuvchining ismi va familiyasini birlashtirib qaytaruvchi virtual xossani yaratuvchi `addUserVirtuals(schema)` funksiyasini yozing. Funksiya berilgan `schema`-ga `fullName` nomli virtual maydon qo'shishi va uning `get` metodi orqali `this.firstName` hamda `this.lastName` qiymatlarini birlashtirib (o'rtada bitta bo'sh joy bilan) qaytarishi kerak. (Eslatma: `this` konteksti to'g'ri ishlashi uchun get metodi uchun oddiy funksiya ishlating).",
    "startingCode": "function addUserVirtuals(schema) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "schema.virtual('fullName').get(function() { return `${this.firstName} ${this.lastName}`; })",
    "test": "let virtualName = '';\nlet getFn;\nconst mockSchema = {\n  virtual(name) {\n    virtualName = name;\n    return {\n      get(fn) {\n        getFn = fn;\n      }\n    };\n  }\n};\nconst sandbox = new Function(code + '; return addUserVirtuals;');\nconst fn = sandbox();\nfn(mockSchema);\nif (virtualName !== 'fullName') return 'fullName virtual xossasi qo\\'shilmadi';\nif (typeof getFn !== 'function') return 'fullName uchun get metodi belgilanmagan';\nconst mockDoc = { firstName: 'Ali', lastName: 'Valiyev' };\nconst res = getFn.call(mockDoc);\nif (res !== 'Ali Valiyev') return 'fullName virtual xossasi noto\\'g\\'ri qiymat qaytardi: ' + res;\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Mongoose nima?",
    "options": [
      "JavaScript ma'lumotlar bazasi boshqaruv tizimi (DBMS)",
      "MongoDB uchun Schema asosida ishlovchi ODM (Object Document Mapper) kutubxonasi",
      "Faqat SQL bazalar bilan ishlovchi ORM",
      "Faqat brauzerda ma'lumotlarni keshlash uchun ishlatiladigan vosita"
    ],
    "correctAnswer": 1,
    "explanation": "Mongoose - bu Node.js muhitida MongoDB bilan ishlash uchun mo'ljallangan, obyektlarni ma'lumotlar bazasidagi hujjatlar bilan bog'laydigan va ularga sxema (Schema) hamda validatsiya beruvchi ODM kutubxonasidir."
  },
  {
    "id": 2,
    "question": "MongoDB va reliesion (SQL) bazalar o'rtasidagi asosiy farq nima?",
    "options": [
      "SQL ma'lumotlarni JSON ko'rinishida, MongoDB esa jadvallarda saqlaydi",
      "MongoDB ma'lumotlarni jadvallar (tables) va qatorlarda (rows) saqlaydi",
      "MongoDB - bu NoSQL bo'lib, hujjatga yo'naltirilgan (document-oriented, BSON/JSON formatida), SQL esa relyatsion jadvallarga asoslangan",
      "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi"
    ],
    "correctAnswer": 2,
    "explanation": "MongoDB - bu NoSQL toifasidagi, hujjatga yo'naltirilgan ma'lumotlar bazasi bo'lib, ma'lumotlarni moslashuvchan JSON/BSON formatida saqlaydi. SQL esa qat'iy tuzilmali reliesion jadvallar va aloqalarga asoslanadi."
  },
  {
    "options": [
      "Document, Row",
      "Schema, Model",
      "Query, Callback",
      "Collection, Middleware"
    ],
    "correctAnswer": 1,
    "id": 3,
    "question": "Mongoose-da ma'lumotlar strukturasini aniqlash va bazadagi hujjatlar ustida amallar bajarish uchun qaysi ikki asosiy tushunchadan foydalaniladi?"
  },
  {
    "id": 4,
    "question": "Mongoose Schema validatorida qaysi xususiyat satr (string) boshidagi va oxiridagi bo'shliqlarni avtomatik o'chiradi?",
    "options": [
      "clean: true",
      "strip: true",
      "trim: true",
      "slice: true"
    ],
    "correctAnswer": 2,
    "explanation": "`trim: true` xossasi Mongoose-ga satr saqlanishidan oldin uning boshidagi va oxiridagi bo'shliqlarni (whitespace) avtomatik o'chirib tashlashni buyuradi."
  },
  {
    "id": 5,
    "question": "Mongoose middleware (hooks) nima?",
    "options": [
      "Faqat xatolarni tekshiradigan yordamchi funksiyalar",
      "Asinxron operatsiyalarni bajarish paytida (masalan, save, validate, remove) avtomatik ravishda ishga tushadigan oraliq funksiyalar (pre va post)",
      "Bazadagi ma'lumotlarni tozalash uchun ishlaydigan cron-skriptlar",
      "Faqat express ilovalari uchun ishlaydigan middleware"
    ],
    "correctAnswer": 1,
    "explanation": "Mongoose-da middleware (yoki hooks) - bu ma'lum bir hodisalar (validate, save, remove, find va h.k.) bajarilishidan oldin (pre) yoki keyin (post) ishga tushuvchi funksiyalardir."
  },
  {
    "id": 6,
    "question": "Mongoose pre-save middleware hook funksiyasi ichida nega arrow funksiya `() => {}` ishlatish tavsiya etilmaydi?",
    "options": [
      "Arrow funksiyalarda `this` joriy hujjat (document) obyektini emas, tashqi kontekstni ifodalagani uchun",
      "Arrow funksiyalar asinxron ishlay olmaydi",
      "Mongoose arrow funksiyalarni umuman qo'llab-quvvatlamaydi",
      "Arrow funksiyalar sekinroq ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Mongoose pre/post hooklari ichida saqlanayotgan joriy hujjatga (document) `this` kalit so'zi orqali kirish mumkin. Arrow funksiyalar o'zining `this` kontekstiga ega bo'lmagani uchun, unda `this` joriy document-ni emas, balki tashqi scope-ni anglatib qoladi."
  },
  {
    "id": 7,
    "question": "Mongoose-da virtual xususiyatlar (virtuals) nima?",
    "options": [
      "Faqat RAM xotirasida ishlovchi maxsus ma'lumotlar bazasi",
      "MongoDB bazasida jismonan saqlanmaydigan, lekin o'qilganda hisoblab chiqariladigan dinamik maydonlar",
      "Faqat parollarni shifrlash uchun mo'ljallangan maydonlar",
      "Hali yaratilmagan, kelajakda qo'shiladigan maydonlar"
    ],
    "correctAnswer": 1,
    "explanation": "Virtual maydonlar - bu MongoDB bazasining o'zida saqlanmaydigan, biroq xuddi oddiy maydondek o'qilishi (`get`) yoki yozilishi (`set`) mumkin bo'lgan, dinamik hisoblanadigan xususiyatlardir."
  },
  {
    "id": 8,
    "question": "Bitta hujjatni boshqa bir kolleksiyadagi hujjat bilan bog'lash (references) va so'rov paytida uni to'liq ma'lumotlar bilan almashtirish qanday ataladi?",
    "options": [
      "Aggregation",
      "Population",
      "Migration",
      "Join Query"
    ],
    "correctAnswer": 1,
    "explanation": "Mongoose-da `populate()` metodi orqali bir hujjatdagi ObjectId maydonini boshqa kolleksiyadan unga mos keladigan to'liq hujjat bilan almashtirish (ya'ni bog'liqlikni yechish) `Population` deb ataladi."
  },
  {
    "id": 9,
    "question": "Query-larni optimallashtirish uchun Mongoose-da so'rov natijalarini to'liq Mongoose hujjati o'rniga oddiy JavaScript obyekti sifatida qaytarishni ta'minlovchi metod qaysi?",
    "options": [
      "`.toObject()`",
      "`.toJSON()`",
      "`.lean()`",
      "`.raw()`"
    ],
    "correctAnswer": 2,
    "explanation": "`.lean()` metodi Mongoose-ga so'rovni bajarayotganda to'liq Mongoose Document klassi instansiyasini (metodlari, change tracking va h.k.) yaratishni chetlab o'tib, oddiy, juda tez va yengil JS obyektini qaytarishni buyuradi."
  },
  {
    "id": 10,
    "question": "Mongoose-da ikkita hujjat o'rtasidagi munosabatni o'rnatishda ref kaliti nimani anglatadi?",
    "options": [
      "Bog'lanayotgan maqsadli modelning nomi",
      "Ma'lumotlar bazasining IP manzili",
      "Kalit maydonning turi",
      "Validatsiya qoidasi"
    ],
    "correctAnswer": 0,
    "explanation": "Schema-da `ref` xossasi ObjectId turi qaysi modelga ishora qilayotganini (ya'ni bog'lanish obyektini) ko'rsatish uchun ishlatiladi."
  },
  {
    "id": 11,
    "question": "Quyidagi Mongoose so'rovida qaysi xususiyat `users` ro'yxatidan faqat ismi va yoshini olib, parolni chetlab o'tadi?",
    "options": [
      "`.select('name age -password')`",
      "`.project({ name: 1, age: 1, password: 0 })`",
      "`.find({}, 'name age -password')`",
      "A va C to'g'ri"
    ],
    "correctAnswer": 3,
    "explanation": "Mongoose-da so'rovga qaytadigan maydonlarni belgilash uchun `.select()` yoki `.find(filter, projection)` ishlatiladi. `name age` ularni olishni, `-password` esa parolni olib tashlashni (exclude) anglatadi. Shuning uchun A va C variantlar to'g'ri."
  },
  {
    "id": 12,
    "question": "Mongoose pre-save middleware-da `isModified('password')` metodi nima vazifani bajaradi?",
    "options": [
      "Parol maydoni bazada mavjudligini tekshiradi",
      "Hujjat saqlanayotgan paytda parol maydoni qiymati yangilanganmi yoki o'zgartirilganmi ekanini aniqlaydi",
      "Parol to'g'ri shifrlanganligini tekshiradi",
      "Foydalanuvchi tizimga kirganligini tasdiqlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`isModified(path)` metodi ko'rsatilgan maydon qiymati yaratilganidan beri yoki oxirgi marta bazadan olinganidan beri o'zgartirilganligini tekshiradi. Bu orqali faqat parol o'zgargandagina hash qilishni ishga tushirish mumkin."
  }
]

};
