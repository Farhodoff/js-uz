export const prismaOrm = {
  id: "prisma_orm",
  title: "Prisma ORM bilan Ishlash",
  language: "javascript",
  theory: `## Part 1: Beginner Analogy

Tasavvur qiling, siz restoranda ovqat buyurtma qilyapsiz.
- Siz (Dasturchi) ingliz tilida (JavaScript/TypeScript) gapirasiz.
- Oshpaz (Ma'lumotlar bazasi) faqat fransuz tilida (SQL) gapiradi.

Agar siz to'g'ridan-to'g'ri Oshpaz bilan gaplashmoqchi bo'lsangiz, fransuz tilini o'rganishingiz va buyurtmani tarjima qilishingiz kerak bo'ladi. Agar bitta harfni xato qilsangiz, umuman boshqa ovqat kelishi mumkin (Syntax error).
**Prisma** - bu sizning mukammal ikki tilli Ofitsiantingiz. Siz Ofitsiantga ingliz tilida nima xohlashingizni aytasiz (masalan, \\\`prisma.user.findMany()\\\`), u esa Oshpazga tushunarli bo'lgan mukammal fransuz tiliga (SQL) o'giradi. Tayyor bo'lgach, taomni chiroyli idishda (avtotoldirish va type-safety ga ega JS obyektlari) oldingizga olib keladi.

## Part 2: Deep Dive (Under the hood, Rust Engine, Query translation, Prisma Client performance)

Prisma shunchaki oddiy so'rov yasovchi emas. Uning tagida juda kuchli **Rust Engine** ishlaydi.

1. **Prisma Schema**: Prisma-ning yuragi bu \\\`schema.prisma\\\` fayli. U bazangizning strukturasi uchun yagona manba (single source of truth) bo'lib xizmat qiladi.
2. **Prisma Client**: Siz \\\`prisma generate\\\` ni ishga tushirganingizda, Prisma sizning schemangizni o'qiydi va JS/TS da juda tez ishlaydigan, xavfsiz (type-safe) bazaga ulanish kodlarini avtomatik yaratadi.
3. **Query Engine (Rust Engine)**: Aslida so'rovlarni bajarish ishi Rust dasturlash tilida yozilgan qism tomonidan qilinadi. Qachonki siz \\\`prisma.user.findMany()\\\` desangiz, Prisma Client bu talabni Rust Engine-ga yuboradi. Rust Engine uni qabul qilib, eng optimizatsiya qilingan SQL so'roviga aylantiradi, ulanishlarni (connection pool) boshqaradi, bazaga jo'natadi va kelgan ma'lumotni JS obyektlariga o'girib beradi.

**Query Translation va Performance (N+1 muammosi):**
Rust Engine N+1 so'rov xatolarini DataLoader naqshidan (pattern) foydalanib avtomatik optimallashtiradi. Masalan, agar siz foydalanuvchilar va ularning postlarini birga olmoqchi bo'lsangiz (\\\`include: { posts: true }\\\`), Rust Engine buni har bir user uchun alohida so'rov yubormasdan, juda samarali JOIN yoki minimal miqdordagi SQL so'rovlarga aylantiradi.

## Part 3: Edge Cases and Senior Interview Questions

**Edge Case 1: Katta hajmdagi tranzaksiyalar (Massive Transactions)**
Katta hajmdagi ma'lumotlarni bazaga yozishda \\\`createMany\\\` dan foydalanish mumkin, lekin Prisma'da so'rovning hajmi bo'yicha cheklovlar bo'lishi mumkin. Juda katta operatsiyalarda ma'lumotlarni bo'laklab (chunk) yuborish yoki raw SQL (\\\`$executeRaw\\\`) ishlatish kerak bo'ladi.

**Edge Case 2: Murakkab Analitik So'rovlar**
Prisma \\\`groupBy\\\` va oddiy hisoblashlarni qo'llab-quvvatlasa-da, juda murakkab analitik so'rovlar, masalan oyna funksiyalari (window functions) to'liq qo'llab-quvvatlanmaydi. Bunday holatlarda to'g'ridan-to'g'ri SQL (\\\`$queryRaw\\\`) yozish eng to'g'ri yo'l.

**Senior Interview Savollari:**

- **Savol:** *Prisma qanday qilib connection pooling ni boshqaradi va serverless arxitekturada (AWS Lambda) nima uchun Prisma Accelerate kerak bo'lishi mumkin?*
  **Javob:** Serverless muhitda har bir funksiya chaqiruvi bazaga yangi ulanish (connection) yaratishi mumkin va bu qisqa vaqt ichida bazaning ulanish limitini to'ldirib qo'yadi. Prisma o'zining Rust Engine-ida ulanishlarni boshqaradi, lekin ko'plab lambda funksiyalari o'rtasida ulanishlarni optimal taqsimlash uchun PgBouncer yoki Prisma Accelerate kabi tashqi pooler kerak bo'ladi.

- **Savol:** *\\\`prisma db push\\\` va \\\`prisma migrate dev\\\` orasidagi farqni tushuntiring.*
  **Javob:** \\\`db push\\\` schemadagi o'zgarishlarni bazaga migratsiya fayli yaratmasdan to'g'ridan-to'g'ri majburiy yozadi (tezkor prototiplash uchun mos). \\\`migrate dev\\\` esa har bir o'zgarish uchun \\\`.sql\\\` migratsiya fayllarini yaratadi, bu loyiha tarixini saqlash va ishlab chiqarish (production) muhitiga moslash uchun kerak.

## Diagramma

\\\`\\\`\\\`mermaid
graph TD
    A[JS/TS Code] --> B[Prisma Client]
    B --> C[Rust Query Engine]
    C --> D[(Ma'lumotlar Bazasi)]
    C --> B
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Barcha foydalanuvchilarni olish",
      instruction: "Prisma orqali 'user' jadvalidagi barcha ma'lumotlarni olish uchun ishlatiladigan metod nomini string ko'rinishida qaytaruvchi 'getAllUsersMethod' yozing.",
      startingCode: "function getAllUsersMethod() {\n  \n}",
      hint: "prisma.user.findMany() deb yozamiz. Siz 'prisma.user.findMany()' deb qaytaring.",
      solution: "function getAllUsersMethod() {\n  return 'prisma.user.findMany()';\n}",
      test: "const fn = new Function(code + '; return getAllUsersMethod;')();\nif (!fn().includes('prisma.user.findMany()')) throw new Error('findMany xato');"
    },
    {
      id: 2,
      title: "ID orqali bitta qator topish",
      instruction: "Foydalanuvchini id si orqali topish (qidiruv faqat unique yoki id bo'yicha) qaysi metod orqali bo'ladi? Funksiya shu kodni matn qilib qaytarsin (masalan: 'prisma.user.findUnique({ where: { id: 5 } })'). Id qilib parametrda berilgan o'zgaruvchini ishlating.",
      startingCode: "function getUserById(id) {\n  \n}",
      hint: "return `prisma.user.findUnique({ where: { id: ${id} } })`;",
      solution: "function getUserById(id) {\n  return `prisma.user.findUnique({ where: { id: ${id} } })`;\n}",
      test: "const fn = new Function(code + '; return getUserById;')();\nif (fn(10).replace(/\\s/g,'') !== 'prisma.user.findUnique({where:{id:10}})'.replace(/\\s/g,'')) throw new Error('findUnique xato');"
    },
    {
      id: 3,
      title: "Yangi ma'lumot qo'shish",
      instruction: "Yangi 'user' (ismi va emaili bilan) qo'shish kodi yozilgan stringni qaytaruvchi 'createUser' funksiyasini yozing. Parametrda 'name' va 'email' keladi.",
      startingCode: "function createUser(name, email) {\n  \n}",
      hint: "return `prisma.user.create({ data: { name: '${name}', email: '${email}' } })`;",
      solution: "function createUser(name, email) {\n  return `prisma.user.create({ data: { name: '${name}', email: '${email}' } })`;\n}",
      test: "const fn = new Function(code + '; return createUser;')();\nconst res = fn('Ali', 'ali@mail.ru');\nif (!res.includes('create(') || !res.includes('data:')) throw new Error('create metodi xato');\nif (!res.includes('Ali') || !res.includes('ali@mail.ru')) throw new Error('Ma\\'lumotlar noto\\'g\\'ri uzatildi');"
    },
    {
      id: 4,
      title: "Ma'lumotni yangilash",
      instruction: "Berilgan id bo'yicha userni yangilash kodi matnini qaytaring. Yangi ma'lumot: '{ name: \"Yangi ism\" }'. Funksiya parametrlari: 'id', 'newName'.",
      startingCode: "function updateUser(id, newName) {\n  \n}",
      hint: "prisma.user.update({ where: { id: ID }, data: { name: 'YANGI' } })",
      solution: "function updateUser(id, newName) {\n  return `prisma.user.update({ where: { id: ${id} }, data: { name: '${newName}' } })`;\n}",
      test: "const fn = new Function(code + '; return updateUser;')();\nconst res = fn(1, 'Jasur').replace(/\\s/g, '');\nif (!res.includes('update({where:{id:1},data:{name:\\'Jasur\\'}})')) throw new Error('Update noto\\'g\\'ri');"
    },
    {
      id: 5,
      title: "Ma'lumotni o'chirish",
      instruction: "Prisma-da ma'lumotni 'delete' metodi o'chiradi. 'id' orqali o'chirish kodini matn qilib qaytaring.",
      startingCode: "function deleteUser(id) {\n  \n}",
      hint: "prisma.user.delete({ where: { id: ID } })",
      solution: "function deleteUser(id) {\n  return `prisma.user.delete({ where: { id: ${id} } })`;\n}",
      test: "const fn = new Function(code + '; return deleteUser;')();\nif (fn(5).replace(/\\s/g, '') !== 'prisma.user.delete({where:{id:5}})'.replace(/\\s/g, '')) throw new Error('Delete xato');"
    },
    {
      id: 6,
      title: "Pagination (Skip va Take)",
      instruction: "Ko'p ma'lumotni qismlab olish uchun 'skip' va 'take' ishlatiladi. Argument sifatida skip=10, take=5 kelgan holda prisma findMany ni qanday yozasiz?",
      startingCode: "function getPaginated(skip, take) {\n  \n}",
      hint: "prisma.user.findMany({ skip: skip, take: take })",
      solution: "function getPaginated(skip, take) {\n  return `prisma.user.findMany({ skip: ${skip}, take: ${take} })`;\n}",
      test: "const fn = new Function(code + '; return getPaginated;')();\nconst res = fn(10, 5).replace(/\\s/g, '');\nif (!res.includes('findMany({skip:10,take:5})')) throw new Error('Skip/take xato');"
    },
    {
      id: 7,
      title: "Bog'langan ma'lumotlar (Include)",
      instruction: "Userlarni tortganda, ularning 'posts' (postlarini) ham birga olish (include) kodini matn qilib qaytaring.",
      startingCode: "function getUsersWithPosts() {\n  \n}",
      hint: "prisma.user.findMany({ include: { posts: true } })",
      solution: "function getUsersWithPosts() {\n  return `prisma.user.findMany({ include: { posts: true } })`;\n}",
      test: "const fn = new Function(code + '; return getUsersWithPosts;')();\nif (!fn().replace(/\\s/g, '').includes('include:{posts:true}')) throw new Error('Include xato');"
    },
    {
      id: 8,
      title: "Filtrlash (Where)",
      instruction: "Faqat 'active' statusli userlarni oluvchi findMany kodini string ko'rinishida qaytaring. Parametrda 'status' so'zi keladi.",
      startingCode: "function getByStatus(status) {\n  \n}",
      hint: "prisma.user.findMany({ where: { status: '...' } })",
      solution: "function getByStatus(status) {\n  return `prisma.user.findMany({ where: { status: '${status}' } })`;\n}",
      test: "const fn = new Function(code + '; return getByStatus;')();\nif (!fn('active').replace(/\\s/g, '').includes(\"where:{status:'active'}\")) throw new Error('Where xato');"
    },
    {
      id: 9,
      title: "Tartiblash (OrderBy)",
      instruction: "Foydalanuvchilarni qachon yaratilganligiga ('createdAt') ko'ra eng yangilarini birinchi (kamayish tartibida - 'desc') olish kodini yozing.",
      startingCode: "function getLatestUsers() {\n  \n}",
      hint: "prisma.user.findMany({ orderBy: { createdAt: 'desc' } })",
      solution: "function getLatestUsers() {\n  return `prisma.user.findMany({ orderBy: { createdAt: 'desc' } })`;\n}",
      test: "const fn = new Function(code + '; return getLatestUsers;')();\nif (!fn().replace(/\\s/g, '').includes(\"orderBy:{createdAt:'desc'}\")) throw new Error('orderBy xato');"
    },
    {
      id: 10,
      title: "Sanoq (Count)",
      instruction: "Bazada nechta user borligini sanash uchun 'count()' metodi ishlatiladi. Barcha userlarni sanash kodini qaytaring.",
      startingCode: "function countUsers() {\n  \n}",
      hint: "prisma.user.count()",
      solution: "function countUsers() {\n  return 'prisma.user.count()';\n}",
      test: "const fn = new Function(code + '; return countUsers;')();\nif (fn().replace(/\\s/g, '') !== 'prisma.user.count()') throw new Error('count() noto\\'g\\'ri');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Prisma ORM ning 'schema.prisma' fayli nima uchun kerak?",
      options: ["Faqat TypeScript konfiguratsiyasi uchun", "Ma'lumotlar bazasi tuzilishini (modellarni) tasvirlash va ulanish (connection) sozlamalari uchun", "Bu ma'lumotlar bazasining o'zi, barcha qatorlar shu yerda saqlanadi", "SQL so'rovlarini yozish uchun maxsus fayl"],
      correctAnswer: 1,
      explanation: "'schema.prisma' fayli orqali ma'lumotlar bazasiga ulanish va u yerdagi jadvallarning tiplari/strukturalari yoziladi."
    },
    {
      id: 2,
      question: "Qaysi komanda orqali 'schema.prisma' fayli bo'yicha bazaga o'zgarishlar kiritiladi (Migratsiya)?",
      options: ["prisma db pull", "prisma generate", "npx prisma migrate dev", "npx prisma init"],
      correctAnswer: 2,
      explanation: "'migrate dev' komandasi yangi migratsiya faylini yaratib, so'ng bazaga jismonan o'zgarishlarni jo'natadi."
    },
    {
      id: 3,
      question: "'prisma generate' komandasi nima qiladi?",
      options: ["Yangi ma'lumotlar bazasi yaratadi", "Prisma Client (JS/TS dagi typelar va metodlar) ni schema fayl asosida qayta yaratadi / yangilaydi", "Jadvallarga random ma'lumot (seed) qo'shadi", "Serverni ishga tushiradi"],
      correctAnswer: 1,
      explanation: "Har gal schema fayl o'zgarganda Prisma Client da eng so'nggi jadvallar va tiplar ishlashi uchun uni generate qilish kerak."
    },
    {
      id: 4,
      question: "Prisma-da 'findFirst' va 'findUnique' o'rtasida qanday farq bor?",
      options: ["Hech qanday farq yo'q", "findFirst faqat birinchi id bilan ishlaydi, findUnique shartli.", "findUnique faqat unikal/primary kalitlar bo'yicha qidirib eng tez javob qaytaradi, findFirst esa istalgan shartdagi birinchi natijani beradi.", "findFirst xotirani kamroq yeydi"],
      correctAnswer: 2,
      explanation: "findUnique ni faqat @id yoki @unique qo'yilgan ustunlarga ishlatib bo'ladi (ya'ni 100% bitta ekanligiga kafolat bor joyda). findFirst ga esa xohlagan shartni berish mumkin."
    },
    {
      id: 5,
      question: "Ma'lumotlarni qismlab (Pagination) olish uchun qaysi xususiyatlar ishlatiladi?",
      options: ["start va end", "limit va offset", "skip va take", "page va size"],
      correctAnswer: 2,
      explanation: "Prisma-da skip (qanchasini o'tkazib yuborish) va take (qanchasini olish) tushunchalari pagination uchun xizmat qiladi."
    },
    {
      id: 6,
      question: "Bog'langan jadvallar (relations) dan ma'lumotni ham birga olib kelish qaysi kalit so'z bilan qilinadi?",
      options: ["join", "populate", "include", "fetch"],
      correctAnswer: 2,
      explanation: "Prisma-da foreign key bilan bog'langan ma'lumotlarni 'include: { relatedModel: true }' yordamida yuklab olamiz."
    },
    {
      id: 7,
      question: "Obyektni qo'shish yoki agar u mavjud bo'lsa uni yangilash qaysi metod bilan qilinadi?",
      options: ["insertOrUpdate", "upsert", "createOrUpdate", "updateMany"],
      correctAnswer: 1,
      explanation: "Upsert (Update yoki Insert) metodi bitta so'rov orqali yoki ma'lumotni yaratadi, yoki mavjud bo'lsa uni yangilaydi."
    },
    {
      id: 8,
      question: "Prisma Studio nima?",
      options: ["Prisma da kod yozish uchun maxsus IDE", "Bazadagi ma'lumotlarni ko'rish va o'zgartirish imkonini beruvchi mahalliy Web Interfeys", "Cloud da ma'lumotlar bazasini saqlovchi xizmat", "React komponentlari to'plami"],
      correctAnswer: 1,
      explanation: "'npx prisma studio' komandasi orqali mahalliy kompyuteringizda DB ma'lumotlari vizual jadval shaklida ochiladi."
    },
    {
      id: 9,
      question: "Prisma dagi N+1 muammosi...",
      options: ["Prisma o'z-o'zidan hal qilib berolmaydi, faqat SQL bilan hal qilinadi", "Avtomatik hal bo'ladi, chunki Prisma DataLoader kabi texnologiyalardan foydalanib o'xshash so'rovlarni guruhlaydi", "Node.js ga bog'liq muammo hisoblanadi", "Ma'lumotlar turlaridagi mismatch muammosidir"],
      correctAnswer: 1,
      explanation: "Prisma findUnique chaqiruvlarini (agar ular ketma-ket bo'lsa) DataLoader yordamida guruhlab avtomatik N+1 muammosini hal etadi. Include ham shunga o'xshash optimizatsiya qiladi."
    },
    {
      id: 10,
      question: "Prisma da 'updateMany' qachon kerak?",
      options: ["Faqat bitta ma'lumotni yangilashda", "Bir vaqtning o'zida shartga tushuvchi bir nechta qatorlarni bittada yangilash kerak bo'lganda", "Boshqa bazaga ko'chirishda", "O'zgarishlarni qaytarishda"],
      correctAnswer: 1,
      explanation: "'update' faqat bitta unikal qatorni, 'updateMany' esa where shartiga to'g'ri keladigan guruh qatorlarini birdaniga yangilash imkonini beradi."
    },
    {
      id: 11,
      question: "'schema.prisma' da '@default(autoincrement())' nimani anglatadi?",
      options: ["Xavfsizlik parolini generatsiya qiladi", "Jadvalga yangi qator yozilganda, ushbu ustun avtomatik navbatdagi son bilan to'ladi", "Doim bir xil sonni saqlaydi", "Bunday xususiyat Prisma da yo'q"],
      correctAnswer: 1,
      explanation: "Bu xususiyat odatda ID ustuni uchun ishlatiladi, har bir yangi qatorga ketma-ket tartib raqam avtomatik beriladi."
    },
    {
      id: 12,
      question: "'prisma db push' komandasi migrate dan nimasi bilan farq qiladi?",
      options: ["Ikkovi butunlay bir xil", "push tezkor o'zgarishni bazaga tiqadi va migratsiya tarixini ('.sql' fayllarini) yaratmaydi, odatda prototiplashda ishlatiladi", "push ma'lumotlarni o'chirib yuboradi", "push faqat cloud da ishlaydi"],
      correctAnswer: 1,
      explanation: "'db push' schema o'zgarishlarini bazaga migratsiya fayllarisiz joriy etishga xizmat qiladi. Ko'pincha boshlang'ich tezkor prototiplash bosqichida yoki MongoDB bilan ishlashda qulay."
    }
  ]
};
