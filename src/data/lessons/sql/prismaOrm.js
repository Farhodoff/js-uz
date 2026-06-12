export const prismaOrm = {
  id: "prismaOrm",
  title: "Prisma ORM va Ma'lumotlar Bazasi Modellashtirish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### ORM nima?
**ORM (Object-Relational Mapping)** — bu relyatsion ma'lumotlar bazasidagi jadvallarni (RDBMS) dasturlash tilidagi (masalan, JavaScript/TypeScript) obyektlar va klasslar bilan bog'lash texnologiyasidir. ORM yordamida siz murakkab SQL so'rovlarini qo'lda yozmasdan, o'zingizga qulay dasturlash tili sintaksisi orqali ma'lumotlar bazasi bilan ishlay olasiz.

### Prisma nima?
**Prisma** — bu Node.js va TypeScript uchun zamonaviy, tezkor va xavfsiz (Typesafe) ORM hisoblanadi. U dasturchilarga ma'lumotlar bazasini deklarativ sxema (Schema) yordamida loyihalash, migratsiyalarni boshqarish va avtomatik tiplashgan (strongly typed) so'rov mijozini (Client) yaratish imkonini beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **O'zbekistonda yashaysiz va faqat o'zbekcha gapira olasiz**. Sizda **fransuz tilida so'zlashadigan hamkor (Ma'lumotlar bazasi)** bor.
* **SQL usuli:** Siz fransuzcha so'zlashuv lug'atini ochib, har bir so'zni xato va kamchiliklarsiz terib, fransuzcha gapirishga harakat qilasiz (SQL yozish). Birgina harf xatosi butun muzokarani buzishi mumkin.
* **ORM (Prisma) usuli:** Siz o'zingiz bilan professional **tarjimon (Prisma ORM)** olib yurasiz. Siz tarjimonga o'zbekcha gapirasiz (JavaScript/TypeScript obyekti bilan ishlaysiz), u esa buni darhol fransuz tiliga o'girib hamkoringizga yetkazadi va javobni qayta o'zbekchaga tarjima qiladi.

---

## 2. 💻 Real Kod Misollari

Prisma asosan uchta qismdan iborat: **Prisma Schema (sxema)**, **Prisma Migrate (migratsiyalar)** va **Prisma Client (so'rovlar)**.

### 1. Prisma Sxemasi (\`schema.prisma\` fayli)
Loyihadagi ma'lumotlar modeli va bazaga ulanish shu yerda ta'riflanadi:

\`\`\`prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Foydalanuvchilar modeli (jadval)
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]   // One-to-Many bog'liqlik
  createdAt DateTime @default(now())
}

// Postlar modeli
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
\`\`\`

### 2. Prisma Client Query (CRUD)
Sxema asosida generatsiya qilingan mijoz yordamida bazaga so'rov yuborish:

\`\`\`javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Create (Yaratish)
  const newUser = await prisma.user.create({
    data: {
      name: "Diyor",
      email: "diyor@example.com",
      posts: {
        create: { title: "Prisma ORM Asoslari" }
      }
    }
  });
  console.log("Yaratildi:", newUser);

  // 2. Read (O'qish - include orqali foydalanuvchini postlari bilan birga olish)
  const usersWithPosts = await prisma.user.findMany({
    include: { posts: true }
  });
  console.log("Foydalanuvchilar va postlar:", usersWithPosts);

  // 3. Update (Yangilash)
  const updatedUser = await prisma.user.update({
    where: { email: "diyor@example.com" },
    data: { name: "Diyorbek" }
  });

  // 4. Delete (O'chirish)
  await prisma.post.deleteMany({
    where: { authorId: newUser.id }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Prisma an'anaviy ORM-lardan farqli o'laroq, tezlik va xavfsizlikni oshirish uchun **Rust** tilida yozilgan maxsus **Query Engine (So'rov Dvigateli)** dan foydalanadi.

### Ishlash jarayoni:
1. **Sxemani yozish:** Dasturchi \`schema.prisma\` faylida modellar va ulanishlarni belgilaydi.
2. **Kodni generatsiya qilish (\`prisma generate\`):** Prisma ushbu sxemani tahlil qiladi va \`node_modules/.prisma/client\` papkasiga to'liq TypeScript tiplari bilan yozilgan moslashtirilgan Client klassini va Rust Query Engine binar faylini yuklaydi.
3. **So'rovlarni bajarish:** Dastur ichida \`prisma.user.findMany()\` chaqirilganda, so'rov Rust Query Engine-ga yuboriladi, u so'rovni optimallashtirilgan SQL-ga o'giradi, bazadan javobni olib, tiplangan JSON ko'rinishida JS dasturiga qaytaradi.

\`\`\`mermaid
graph TD
    A[schema.prisma] -->|npx prisma generate| B[Prisma Client Generatsiyasi]
    B -->|JavaScript/TypeScript tiplari| C[Dasturchi Kodi]
    C -->|API Query| D[Rust Query Engine]
    D -->|Tezkor optimallashtirilgan SQL| E[(Ma'lumotlar Bazasi)]
    E -->|SQL Result| D
    D -->|Tiplangan JSON Obyekt| C
\`\`\`

> [!NOTE]
> Rust Query Engine tufayli Prisma an'anaviy JavaScript ORM-lariga (masalan, Sequelize) qaraganda xotiradan ancha samarali foydalanadi va SQL so'rovlarini tezroq tahlil qiladi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Loyihada Prisma-ni sozlash va ishga tushirish

#### 1-qadam: Paketlarni o'rnatish
Bo'sh loyiha yaratamiz va kerakli paketlarni o'rnatamiz:
\`\`\`bash
npm init -y
npm install @prisma/client
npm install prisma --save-dev
\`\`\`

#### 2-qadam: Prisma-ni initsializatsiya qilish
Loyiha tuzilishida Prisma papkasi va \`.env\` faylini yaratamiz:
\`\`\`bash
npx prisma init
\`\`\`
Bu buyruq loyihangizda \`prisma/schema.prisma\` fayli va bazaga ulanish uchun \`.env\` faylini hosil qiladi.

#### 3-qadam: Bazaga ulanish
\`.env\` faylini ochib, ma'lumotlar bazangizning manzilini kiriting (masalan, PostgreSQL uchun):
\`\`\`env
DATABASE_URL="postgresql://postgres:parol123@localhost:5432/my_database?schema=public"
\`\`\`

#### 4-qadam: Sxemani yozish va Migratsiya qilish
\`prisma/schema.prisma\` ichiga \`User\` modelini yozib, quyidagi buyruqni bajaring:
\`\`\`bash
npx prisma migrate dev --name init_users
\`\`\`
Ushbu buyruq:
1. Sxemadagi o'zgarishlarni tekshiradi.
2. Bazada jadvallarni yaratish uchun SQL skript yaratadi va ishga tushiradi.
3. Prisma Client-ni avtomatik ravishda qayta generatsiya qiladi.

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Sxema o'zgargandan keyin Generatsiya qilishni unutish
Sxemaga yangi ustun yoki model qo'shganda, kodda xatolik yuz beradi yoki yangi ustunlar ko'rinmaydi.
* **Sababi:** Prisma Client avvalgi sxema bo'yicha qolib ketgan.
* **Yechim:** Har doim sxemani qo'lda o'zgartirgandan keyin yoki migratsiyadan so'ng quyidagi buyruqni bajaring:
  \`\`\`bash
  npx prisma generate
  \`\`\`

### 2. N+1 So'rovlari Muammosi (N+1 Query Problem)
Foydalanuvchilarni olib, sikl ichida ularning har biri uchun postlarni alohida chaqirish:
\`\`\`javascript
// Noto'g'ri (Baza yuklamasini keskin oshiradi):
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } }); // N ta qo'shimcha so'rov!
}
\`\`\`
* **Yechim:** Prisma \`include\` yordamida bog'liq ma'lumotlarni bitta so'rov orqali yuklang (Eager Loading):
  \`\`\`javascript
  const usersWithPosts = await prisma.user.findMany({
    include: { posts: true }
  });
  \`\`\`

### 3. Prisma so'rovlarida \`await\` ni unutish
Prisma Client so'rovlari asinxron bo'lib, Promise qaytaradi.
* **Xato kod:**
  \`\`\`javascript
  const user = prisma.user.findUnique({ where: { id: 1 } });
  console.log(user.name); // undefined yoki xatolik beradi
  \`\`\`
* **To'g'ri kod:**
  \`\`\`javascript
  const user = await prisma.user.findUnique({ where: { id: 1 } });
  console.log(user.name);
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Operatsiya | Prisma Metodi | Misol |
| :--- | :--- | :--- |
| **Yaratish** | \`create\` / \`createMany\` | \`prisma.user.create({ data })\` |
| **Bitta topish** | \`findUnique\` / \`findFirst\` | \`prisma.user.findUnique({ where })\` |
| **Hammasini topish** | \`findMany\` | \`prisma.user.findMany({ where, include })\` |
| **Yangilash** | \`update\` / \`updateMany\` | \`prisma.user.update({ where, data })\` |
| **O'chirish** | \`delete\` / \`deleteMany\` | \`prisma.user.delete({ where })\` |
| **Birlashtirish** | \`include\` / \`select\` | \`{ include: { relationName: true } }\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Nima uchun raw SQL o'rniga Prisma ORM-ni ishlatishim kerak?
Prisma loyihani rivojlantirish tezligini (Developer Experience) keskin oshiradi. U to'liq TypeScript tiplarini taqdim etgani uchun siz xato ustun nomini yozib qo'ysangiz, kodingiz run-time ga yetmasdan IDE ichidayoq xato deb ko'rsatiladi.

### 2. Prisma-da o'zim yozgan murakkab raw SQL so'rovini ishlatsam bo'ladimi?
Ha, albatta. Agar Prisma metodlari bilan yozib bo'lmaydigan juda murakkab so'rov yuzaga kelsa, siz \`prisma.$queryRaw\` yoki \`prisma.$executeRaw\` metodlaridan foydalanib to'g'ridan-to'g'ri SQL yozishingiz mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Prisma-dagi \`@relation\` atributining vazifasi nima?
2. \`npx prisma db push\` va \`npx prisma migrate dev\` buyruqlarining asosiy farqi nimada?
3. Prisma Client qayta generatsiya bo'lganda qaysi papkaga yoziladi?
4. Nima sababdan \`include\` o'rniga \`select\` ishlatgan ma'qulroq (xususan, faqat kerakli ustunlarni olishda)?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi mashqlar va testlar yordamida Prisma ORM, sxemalar yaratish, bog'lanishlar bilan ishlash va CRUD so'rovlarini shakllantirish bo'yicha ko'nikmalaringizni mustahkamlang.

---

## 10. 🔗 Qo'shimcha Manbalar

* [Prisma Rasmiy Hujjatlari](https://www.prisma.io/docs)
* [Prisma GitHub Repozitoriysi](https://github.com/prisma/prisma)
* [TypeScript va Prisma Bilan Ishlash Video Darslari](https://www.youtube.com/)`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Foydalanuvchi yaratish (Prisma CLI)",
      instruction: "Foydalanuvchini Prisma orqali ma'lumotlar bazasida saqlash uchun `createUser(prisma, email, name)` funksiyasini yozing. Funksiya yangi yaratilgan foydalanuvchi obyektini qaytarsin.",
      startingCode: "async function createUser(prisma, email, name) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return await prisma.user.create({ data: { email, name } });",
      test: "const mockPrisma = {\n  user: {\n    create: async ({ data }) => {\n      if (!data.email || !data.name) throw new Error('Ma\\'lumotlar to\\'liq emas');\n      return { id: 1, ...data };\n    }\n  }\n};\nconst sandbox = new Function(code + '; return createUser;');\nconst fn = sandbox();\nreturn fn(mockPrisma, 'user@example.com', 'Ali')\n  .then(res => {\n    if (res && res.id === 1 && res.email === 'user@example.com' && res.name === 'Ali') return null;\n    return 'Foydalanuvchi to\\'g\\'ri yaratilmadi yoki qaytarilmadi';\n  })\n  .catch(err => 'Xatolik: ' + err.message);"
    },
    {
      id: 2,
      title: "2️⃣ Muallif postlarini olish (findMany)",
      instruction: "Berilgan muallifning ID raqami (`authorId`) bo'yicha barcha postlarni yuklovchi `getAuthorPosts(prisma, authorId)` funksiyasini yozing. Funksiya topilgan postlar massivini qaytarsin.",
      startingCode: "async function getAuthorPosts(prisma, authorId) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return await prisma.post.findMany({ where: { authorId } });",
      test: "const mockPrisma = {\n  post: {\n    findMany: async ({ where }) => {\n      if (where && where.authorId === 99) {\n        return [{ id: 10, title: 'Prisma Darslari', authorId: 99 }];\n      }\n      return [];\n    }\n  }\n};\nconst sandbox = new Function(code + '; return getAuthorPosts;');\nconst fn = sandbox();\nreturn fn(mockPrisma, 99)\n  .then(res => {\n    if (Array.isArray(res) && res.length === 1 && res[0].authorId === 99) return null;\n    return 'Muallif postlari to\\'g\\'ri filtrlanib qaytarilmadi';\n  })\n  .catch(err => 'Xatolik: ' + err.message);"
    },
    {
      id: 3,
      title: "3️⃣ Foydalanuvchi ismini yangilash (update)",
      instruction: "Berilgan `id` dagi foydalanuvchining ismini `newName` ga yangilovchi va yangilangan foydalanuvchini qaytaruvchi `updateUsername(prisma, id, newName)` funksiyasini yozing.",
      startingCode: "async function updateUsername(prisma, id, newName) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "return await prisma.user.update({ where: { id }, data: { name: newName } });",
      test: "const mockPrisma = {\n  user: {\n    update: async ({ where, data }) => {\n      if (where && where.id === 5 && data && data.name === 'Farhod') {\n        return { id: 5, name: 'Farhod', email: 'farhod@example.com' };\n      }\n      return null;\n    }\n  }\n};\nconst sandbox = new Function(code + '; return updateUsername;');\nconst fn = sandbox();\nreturn fn(mockPrisma, 5, 'Farhod')\n  .then(res => {\n    if (res && res.id === 5 && res.name === 'Farhod') return null;\n    return 'Foydalanuvchi ismi to\\'g\\'ri yangilanmadi yoki qaytarilmadi';\n  })\n  .catch(err => 'Xatolik: ' + err.message);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "ORM (Object-Relational Mapping) nima?",
      options: [
        "Ma'lumotlar bazasidagi jadvallarni dasturlash tilidagi obyektlar va klasslar bilan bog'lovchi texnologiya",
        "Faqat CSS stillari va animatsiyalarini boshqarish uchun maxsus JavaScript kutubxonasi",
        "Ma'lumotlar bazasini to'liq zaxira (backup) qiladigan tashqi bulutli xizmat",
        "Faqat SQL so'rovlarini tahlil qilib xatoliklarini ko'rsatuvchi CLI dasturi"
      ],
      correctAnswer: 0,
      explanation: "ORM - bu relyatsion ma'lumotlar bazasidagi jadvallar va ularning ustunlarini JavaScript/TypeScript obyektlariga moslashtirib, SQL yozmasdan bazaga so'rov yuborish imkonini beruvchi vositadir."
    },
    {
      id: 2,
      question: "Prisma sxema fayli (schema.prisma) qanday asosiy vazifani bajaradi?",
      options: [
        "Ma'lumotlar bazasiga ulanish sozlamalari, provayder va modellar (jadvallar) tuzilishini deklarativ tavsiflaydi",
        "Dasturning barcha sahifalari uchun HTML sahifalarni render qiladi",
        "Faqat serverning port sozlamalari va routerlarini belgilaydi",
        "Klient brauzerida ma'lumotlarni keshlab saqlaydi"
      ],
      correctAnswer: 0,
      explanation: "schema.prisma fayli butun ma'lumotlar bazasining sxemasini (modellar, munosabatlar va bog'lanish parametrlarini) bitta joyda saqlaydi."
    },
    {
      id: 3,
      question: "Prisma-da model ustunini Primary Key (asosiy kalit) sifatida belgilash uchun qaysi atribut ishlatiladi?",
      options: [
        "@id",
        "@primary",
        "@unique",
        "@key"
      ],
      correctAnswer: 0,
      explanation: "Prisma sxemasida `@id` atributi ustunni jadval uchun asosiy unikal kalit (Primary Key) ekanligini bildiradi."
    },
    {
      id: 4,
      question: "Prisma CLI yordamida sxemadagi o'zgarishlarni bazaga qo'llash va migratsiya faylini yaratish uchun qaysi buyruq ishlatiladi?",
      options: [
        "npx prisma migrate dev",
        "npx prisma generate",
        "npx prisma studio",
        "npx prisma db push"
      ],
      correctAnswer: 0,
      explanation: "`npx prisma migrate dev` buyrug'i sxemadagi o'zgarishlarni SQL migratsiya fayllariga aylantiradi, bazaga qo'llaydi va Prisma Client-ni avtomatik generatsiya qiladi."
    },
    {
      id: 5,
      question: "Prisma Client-ni sxema o'zgarishlariga mos ravishda qayta generatsiya qilish uchun qaysi buyruq ishlatiladi?",
      options: [
        "npx prisma generate",
        "npx prisma db pull",
        "npx prisma migrate reset",
        "npx prisma format"
      ],
      correctAnswer: 0,
      explanation: "`npx prisma generate` buyrug'i `node_modules/.prisma/client` papkasida sxemaga moslashtirilgan tiplar va Prisma Client kodini yaratadi."
    },
    {
      id: 6,
      question: "Prisma Studio nima?",
      options: [
        "Ma'lumotlar bazasidagi ma'lumotlarni ko'rish va tahrirlash uchun vizual GUI (brauzer interfeysi)",
        "SQL kodlarini yozish va tahlil qilish uchun o'rnatilgan IDE dasturi",
        "Serverni avtomatik qayta ishga tushiruvchi terminal buyrug'i",
        "Faqat rasmlar va media fayllarini saqlash uchun mo'ljallangan bulutli ombor"
      ],
      correctAnswer: 0,
      explanation: "Prisma Studio — bu localhost-da ishlovchi, ma'lumotlar bazasini Excel jadvaliga o'xshab chiroyli ko'rsatuvchi va boshqaruvchi veb-ilova."
    },
    {
      id: 7,
      question: "Prisma-da foydalanuvchilarni yoshi (age) bo'yicha kamayish tartibida saralash uchun qaysi obyekt ishlatiladi?",
      options: [
        "orderBy: { age: 'desc' }",
        "sortBy: { age: 'desc' }",
        "sort: { age: 'down' }",
        "order: { age: 'desc' }"
      ],
      correctAnswer: 0,
      explanation: "Prisma-da ma'lumotlarni saralash (ordering) uchun `orderBy` kalit so'zi va `'asc'` yoki `'desc'` qiymatlari qo'llaniladi."
    },
    {
      id: 8,
      question: "Prisma sxemasida ikki model o'rtasidagi munosabatni (relation) bog'lash uchun qaysi atribut ishlatiladi?",
      options: [
        "@relation",
        "@connect",
        "@foreignKey",
        "@link"
      ],
      correctAnswer: 0,
      explanation: "`@relation` atributi orqali tashqi kalitlar (`fields`) va ularga mos keluvchi asosiy model kalitlari (`references`) aniqlanadi."
    },
    {
      id: 9,
      question: "Prisma-da foydalanuvchini olish bilan birga uning barcha postlarini ham qo'shib yuklash (Eager Loading) uchun qanday so'rov yoziladi?",
      options: [
        "include: { posts: true }",
        "join: { posts: true }",
        "select: { posts: 'all' }",
        "with: { posts: true }"
      ],
      correctAnswer: 0,
      explanation: "Prisma-da bog'liq modellarni qo'shib yuklash uchun `include` kalit so'zidan foydalaniladi."
    },
    {
      id: 10,
      question: "Quyidagi Prisma kodi qanday vazifani bajaradi?\nawait prisma.user.findUnique({ where: { email: 'ali@example.com' } })",
      options: [
        "Email manzili 'ali@example.com' bo'lgan yagona foydalanuvchini qidiradi",
        "Barakalovchi foydalanuvchilarning emailini 'ali@example.com'ga o'zgartiradi",
        "Yangi foydalanuvchi yaratadi va emailini 'ali@example.com' qiladi",
        "Foydalanuvchini o'chirib yuboradi"
      ],
      correctAnswer: 0,
      explanation: "`findUnique` metodi faqat unikal (Unique) yoki Primary Key ustunlari bo'yicha bitta aniq yozuvni tezkor topishga mo'ljallangan."
    },
    {
      id: 11,
      question: "N+1 so'rovlari (N+1 query problem) deganda nima tushuniladi?",
      options: [
        "Asosiy ro'yxatni olgandan keyin, unga tegishli har bir elementning bog'liq ma'lumotlarini olish uchun bazaga alohida so'rovlar yuborilishi natijasida unumdorlik pasayishi",
        "Bazaga ulanishlar soni 1 tadan oshib ketib xatolik yuz berishi",
        "SQL tranzaksiyasi ichida bir nechta so'rovlar bajarilishi taqiqlanishi",
        "Faqat bitta foydalanuvchi ma'lumotini olish uchun 1 soniya vaqt ketishi"
      ],
      correctAnswer: 0,
      explanation: "N+1 muammosi — bu 1 ta asosiy so'rov bilan N ta yozuv olinib, har bir yozuvning bog'liqliklarini yuklash uchun yana N marta so'rov yuborilishi tufayli bazaga yuklamaning oshishidir."
    },
    {
      id: 12,
      question: "Prisma-da bir vaqtning o'zida bir nechta yozuvlarni yaratish uchun qaysi metoddan foydalaniladi?",
      options: [
        "createMany",
        "createList",
        "insertMany",
        "bulkCreate"
      ],
      correctAnswer: 0,
      explanation: "`createMany` metodi bir nechta yozuvdan iborat massivni qabul qilib, bitta SQL so'rov bilan bazaga yozadi."
    }
  ]
};
