## 1. 💡 Sodda Tushuntirish va Analogiya

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

### 1. Prisma Sxemasi (`schema.prisma` fayli)
Loyihadagi ma'lumotlar modeli va bazaga ulanish shu yerda ta'riflanadi:

```prisma
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
```

### 2. Prisma Client Query (CRUD)
Sxema asosida generatsiya qilingan mijoz yordamida bazaga so'rov yuborish:

```javascript
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
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

Prisma an'anaviy ORM-lardan farqli o'laroq, tezlik va xavfsizlikni oshirish uchun **Rust** tilida yozilgan maxsus **Query Engine (So'rov Dvigateli)** dan foydalanadi.

### Ishlash jarayoni:
1. **Sxemani yozish:** Dasturchi `schema.prisma` faylida modellar va ulanishlarni belgilaydi.
2. **Kodni generatsiya qilish (`prisma generate`):** Prisma ushbu sxemani tahlil qiladi va `node_modules/.prisma/client` papkasiga to'liq TypeScript tiplari bilan yozilgan moslashtirilgan Client klassini va Rust Query Engine binar faylini yuklaydi.
3. **So'rovlarni bajarish:** Dastur ichida `prisma.user.findMany()` chaqirilganda, so'rov Rust Query Engine-ga yuboriladi, u so'rovni optimallashtirilgan SQL-ga o'giradi, bazadan javobni olib, tiplangan JSON ko'rinishida JS dasturiga qaytaradi.

```mermaid
graph TD
    A[schema.prisma] -->|npx prisma generate| B[Prisma Client Generatsiyasi]
    B -->|JavaScript/TypeScript tiplari| C[Dasturchi Kodi]
    C -->|API Query| D[Rust Query Engine]
    D -->|Tezkor optimallashtirilgan SQL| E[(Ma'lumotlar Bazasi)]
    E -->|SQL Result| D
    D -->|Tiplangan JSON Obyekt| C
```

> [!NOTE]
> Rust Query Engine tufayli Prisma an'anaviy JavaScript ORM-lariga (masalan, Sequelize) qaraganda xotiradan ancha samarali foydalanadi va SQL so'rovlarini tezroq tahlil qiladi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Loyihada Prisma-ni sozlash va ishga tushirish

#### 1-qadam: Paketlarni o'rnatish
Bo'sh loyiha yaratamiz va kerakli paketlarni o'rnatamiz:
```bash
npm init -y
npm install @prisma/client
npm install prisma --save-dev
```

#### 2-qadam: Prisma-ni initsializatsiya qilish
Loyiha tuzilishida Prisma papkasi va `.env` faylini yaratamiz:
```bash
npx prisma init
```
Bu buyruq loyihangizda `prisma/schema.prisma` fayli va bazaga ulanish uchun `.env` faylini hosil qiladi.

#### 3-qadam: Bazaga ulanish
`.env` faylini ochib, ma'lumotlar bazangizning manzilini kiriting (masalan, PostgreSQL uchun):
```env
DATABASE_URL="postgresql://postgres:parol123@localhost:5432/my_database?schema=public"
```

#### 4-qadam: Sxemani yozish va Migratsiya qilish
`prisma/schema.prisma` ichiga `User` modelini yozib, quyidagi buyruqni bajaring:
```bash
npx prisma migrate dev --name init_users
```
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
  ```bash
  npx prisma generate
  ```

### 2. N+1 So'rovlari Muammosi (N+1 Query Problem)
Foydalanuvchilarni olib, sikl ichida ularning har biri uchun postlarni alohida chaqirish:
```javascript
// Noto'g'ri (Baza yuklamasini keskin oshiradi):
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } }); // N ta qo'shimcha so'rov!
}
```
* **Yechim:** Prisma `include` yordamida bog'liq ma'lumotlarni bitta so'rov orqali yuklang (Eager Loading):
  ```javascript
  const usersWithPosts = await prisma.user.findMany({
    include: { posts: true }
  });
  ```

### 3. Prisma so'rovlarida `await` ni unutish
Prisma Client so'rovlari asinxron bo'lib, Promise qaytaradi.
* **Xato kod:**
  ```javascript
  const user = prisma.user.findUnique({ where: { id: 1 } });
  console.log(user.name); // undefined yoki xatolik beradi
  ```
* **To'g'ri kod:**
  ```javascript
  const user = await prisma.user.findUnique({ where: { id: 1 } });
  console.log(user.name);
  ```

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Operatsiya | Prisma Metodi | Misol |
| :--- | :--- | :--- |
| **Yaratish** | `create` / `createMany` | `prisma.user.create({ data })` |
| **Bitta topish** | `findUnique` / `findFirst` | `prisma.user.findUnique({ where })` |
| **Hammasini topish** | `findMany` | `prisma.user.findMany({ where, include })` |
| **Yangilash** | `update` / `updateMany` | `prisma.user.update({ where, data })` |
| **O'chirish** | `delete` / `deleteMany` | `prisma.user.delete({ where })` |
| **Birlashtirish** | `include` / `select` | `{ include: { relationName: true } }` |

---

## 7. ❓ Savollar va Javoblar

### 1. Nima uchun raw SQL o'rniga Prisma ORM-ni ishlatishim kerak?
Prisma loyihani rivojlantirish tezligini (Developer Experience) keskin oshiradi. U to'liq TypeScript tiplarini taqdim etgani uchun siz xato ustun nomini yozib qo'ysangiz, kodingiz run-time ga yetmasdan IDE ichidayoq xato deb ko'rsatiladi.

### 2. Prisma-da o'zim yozgan murakkab raw SQL so'rovini ishlatsam bo'ladimi?
Ha, albatta. Agar Prisma metodlari bilan yozib bo'lmaydigan juda murakkab so'rov yuzaga kelsa, siz `prisma.$queryRaw` yoki `prisma.$executeRaw` metodlaridan foydalanib to'g'ridan-to'g'ri SQL yozishingiz mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Prisma-dagi `@relation` atributining vazifasi nima?
2. `npx prisma db push` va `npx prisma migrate dev` buyruqlarining asosiy farqi nimada?
3. Prisma Client qayta generatsiya bo'lganda qaysi papkaga yoziladi?
4. Nima sababdan `include` o'rniga `select` ishlatgan ma'qulroq (xususan, faqat kerakli ustunlarni olishda)?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi mashqlar va testlar yordamida Prisma ORM, sxemalar yaratish, bog'lanishlar bilan ishlash va CRUD so'rovlarini shakllantirish bo'yicha ko'nikmalaringizni mustahkamlang.

---

## 10. 🔗 Qo'shimcha Manbalar

* [Prisma Rasmiy Hujjatlari](https://www.prisma.io/docs)
* [Prisma GitHub Repozitoriysi](https://github.com/prisma/prisma)
* [TypeScript va Prisma Bilan Ishlash Video Darslari](https://www.youtube.com/)
