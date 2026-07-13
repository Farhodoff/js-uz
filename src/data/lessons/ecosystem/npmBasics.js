export const npmBasics = {
  id: "npm-basics",
  title: "NPM Basics",
  theory: `
## Part 1: Beginner Analogy
Tasavvur qiling, siz o'zingizning orzuingizdagi uyni quryapsiz. Har bir detalni: g'ishtlarni, eshik va derazalarni o'zingiz noldan boshlab yasashingiz mumkin. Ammo bu juda uzoq vaqt va mashaqqat talab qiladi. Buning o'rniga, qurilish materiallari do'koniga borib, tayyor va sinalgan mahsulotlarni sotib olishingiz mumkin.

JavaScript olamida ham xuddi shunday! O'zingiz noldan barcha murakkab funksiyalarni yozib chiqishingiz shart emas. Boshqa dasturchilar tomonidan yozilgan tayyor "qurilish materiallari" (kutubxonalar yoki paketlar) mavjud. **NPM (Node Package Manager)** - bu xuddi ana shu ulkan qurilish materiallari do'koni hisoblanadi.

Loyiha yaratishni boshlash uchun terminalda \\\`npm init\\\` buyrug'ini yozasiz. Natijada \\\`package.json\\\` nomli maxsus fayl paydo bo'ladi. Bu fayl loyihangizning "pasporti" bo'lib, uning nomi, versiyasi va loyihada ishlatilgan barcha do'kondan olingan materiallar ro'yxatini saqlaydi.

## Part 2: Deep Dive (Under the hood, memory, dependency resolution, lockfiles, npm vs yarn vs pnpm)

NPM asosan 3 xil komponentdan tashkil topgan:
1. **Website (Vebsayt):** Paketlarni qidirish va ularning hujjatlarini (documentation) o'qish uchun foydalaniladi.
2. **Registry (Reyestr):** Barcha ochiq manbali (open-source) paketlar joylashgan va saqlanadigan juda ulkan ma'lumotlar bazasi.
3. **CLI (Command Line Interface):** Dasturchilar o'z terminali orqali paketlarni o'rnatish, yangilash yoki o'chirish uchun ishlatadigan vosita.

### Dependency Resolution va Lockfiles
Siz terminalda \\\`npm install express\\\` buyrug'ini bersangiz, NPM nafaqat Express'ning o'zini, balki Express ishlashi uchun kerak bo'lgan boshqa barcha paketlarni ham o'rnatib beradi. Bunga **dependency tree (qaramliklar daraxti)** deyiladi.
Biroq, bu paketlar vaqt o'tishi bilan yangilanadi va o'zgaradi. Biror jamoa a'zosi loyihani kompyuteriga ko'chirib olganida eski versiyadagi kodlar bilan ziddiyat kelib chiqmasligi uchun, \\\`package-lock.json\\\` (lockfile) fayli paketlarning har birining aynan qaysi versiyasi o'rnatilganligini "qulflab" qo'yadi. Shu orqali barcha muhitlarda kod bir xilda ishlashi kafolatlanadi.

### Memory, npm vs yarn vs pnpm
O'rnatilgan barcha paketlar loyihangizdagi \\\`node_modules\\\` papkasiga saqlanadi. Agar kompyuteringizda 10 ta xil loyiha bo'lsa va ularning har birida "lodash" paketi o'rnatilgan bo'lsa nima bo'ladi?
- **npm va yarn:** Ikkalasida ham lodash 10 marta alohida diskka yuklab olinadi va kompyuter xotirasidan 10 karra ortiqcha joy oladi.
- **pnpm:** Bu yondashuvni tubdan o'zgartiradi! U barcha paketlarni tizimda bitta global "do'kon" ga yuklab oladi. Har bir loyiha esa o'sha bitta joyga faqat **symlink (havola)** orqali ulanadi. Bu disk xotirasini deyarli 10 barobarga tejaydi va paketlar o'rnatilishini aql bovar qilmaydigan darajada tezlashtiradi.

## Part 3: Edge Cases and Senior Interview Questions

- **Savol 1:** \\\`dependencies\\\`, \\\`devDependencies\\\` va \\\`peerDependencies\\\` o'rtasida qanday farq bor?
  - **Javob:** 
    - \\\`dependencies\\\`: Ilovaning to'g'ri ishlashi (production muhiti) uchun zarur bo'lgan paketlar (masalan: react, vue, axios).
    - \\\`devDependencies\\\`: Faqatgina ishlab chiqish (development) va test qilish jarayonida kerak bo'ladigan paketlar (masalan: jest, prettier, typescript).
    - \\\`peerDependencies\\\`: Odatda kutubxona yaratuvchilari tomonidan ishlatiladi. Bu paket sizning loyihangiz ma'lum bir paketning aynan qaysidir versiyasiga (masalan React 18) ega bo'lishini talab qiladi.

- **Savol 2:** NPM dagi scriptlarda qanday yashirin xavfsizlik (security) muammolari bo'lishi mumkin?
  - **Javob:** Ba'zan xakerlar foydali bo'lib ko'ringan yomon niyatli paketlarni yaratishadi. Siz bu paketni o'rnatayotganingizda \\\`preinstall\\\` yoki \\\`postinstall\\\` deb nomlangan scriptlar terminalingizda o'z-o'zidan ishga tushib ketishi va tizimda zararli kodni (masalan ma'lumot o'g'rilash) ishlatib yuborishi mumkin.

- **Savol 3:** Nima uchun CI/CD (Continuous Integration/Deployment) jarayonlarida \\\`npm install\\\` emas, balki \\\`npm ci\\\` (clean install) buyrug'ini ishlatish kerak?
  - **Javob:** \\\`npm install\\\` ba'zan paketlarning eng so'nggi patch/minor versiyalarini yuklab olib \\\`package-lock.json\\\` ni o'zgartirib yuborishi mumkin. \\\`npm ci\\\` esa avval mavjud \\\`node_modules\\\` papkasini butunlay o'chirib tashlaydi, so'ngra qat'iy ravishda faqat \\\`package-lock.json\\\` faylida ko'rsatilgan aniq versiyalarni qaytadan toza o'rnatadi. Bu ishlab chiqarish (production) muhitida buzilishlarning oldini oladi.

## Mermaid Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[npm install <package>] --> B{NPM Registry - Database}
    B -->|Tarball| C[Download Package]
    C --> D[Extract to node_modules]
    D --> E[Update package.json]
    D --> F[Update package-lock.json]
    F --> G[Ready for Development!]
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: 1,
      title: "Loyihani boshlash",
      instruction: "Yangi loyihani boshlash uchun standart so'rovlarsiz (default) ro'yxatdan o'tish komandasini yozing.",
      testCode: "const result = 'npm init -y';"
    },
    {
      id: 2,
      title: "Paket o'rnatish",
      instruction: "'axios' paketini oddiy dependency sifatida loyihaga o'rnatish komandasini kiritng.",
      testCode: "const result = 'npm install axios';"
    },
    {
      id: 3,
      title: "Dev Dependency o'rnatish",
      instruction: "'typescript' ni faqat development muhiti (devDependencies) uchun o'rnating.",
      testCode: "const result = 'npm install typescript -D';"
    },
    {
      id: 4,
      title: "Global o'rnatish",
      instruction: "'nodemon' paketini butun tizimda (global) ishlatish uchun qanday o'rnatasiz?",
      testCode: "const result = 'npm install -g nodemon';"
    },
    {
      id: 5,
      title: "Maxsus scriptni ishga tushirish",
      instruction: "package.json dagi maxsus 'build' nomli scriptni qanday ishga tushirasiz?",
      testCode: "const result = 'npm run build';"
    },
    {
      id: 6,
      title: "Start scriptini ishlatish",
      instruction: "Loyiha uchun standart 'start' scriptini qisqa yo'l bilan terminal orqali qanday ishga tushirasiz?",
      testCode: "const result = 'npm start';"
    },
    {
      id: 7,
      title: "Paketni o'chirish",
      instruction: "Loyihadagi 'lodash' paketini butunlay olib tashlang (uninstall qiling).",
      testCode: "const result = 'npm uninstall lodash';"
    },
    {
      id: 8,
      title: "Toza o'rnatish (Clean install)",
      instruction: "Loyiha paketlarini to'liq va aniq versiyalar bilan lockfile'ga asoslanib toza o'rnatuvchi komandani yozing (CI muhitida ishlatiladigan).",
      testCode: "const result = 'npm ci';"
    },
    {
      id: 9,
      title: "Paketlarni yangilash",
      instruction: "Loyihadagi paketlarni xavfsiz minor va patch versiyalarigacha yangilash komandasini yozing.",
      testCode: "const result = 'npm update';"
    },
    {
      id: 10,
      title: "Eskirgan paketlarni tekshirish",
      instruction: "Loyihangizdagi qaysi paketlar eskirganini ro'yxatini ko'rish uchun qaysi komandadan foydalanasiz?",
      testCode: "const result = 'npm outdated';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "NPM nimaning qisqartmasi hisoblanadi?",
      options: [
        "Network Protocol Manager",
        "Node Package Manager",
        "New Project Module",
        "Node Project Manager"
      ],
      correctAnswerIndex: 1
    },
    {
      id: 2,
      question: "Qaysi fayl loyihaning metama'lumotlari (nomi, versiyasi, qaramliklari) haqidagi yozuvlarni saqlaydi?",
      options: [
        "index.js",
        "package-lock.json",
        "package.json",
        "node_modules"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 3,
      question: "Paketlarni global tarzda kompyuterga o'rnatish qanday amalga oshiriladi?",
      options: [
        "npm install <package> --global",
        "npm global <package>",
        "npm -g install <package>",
        "npm install -g <package>"
      ],
      correctAnswerIndex: 3
    },
    {
      id: 4,
      question: "Qaysi xususiyat pnpm ni npm va yarn dan ustun va tezroq qiladi?",
      options: [
        "Faqat Windows tizimlarida ishlashi",
        "Paketlarni faqatgina cloud (bulut) da saqlab kompyuterga umuman yuklamasligi",
        "Paketlarni markaziy joyga bir marta yuklab, hamma loyihalarga symlink (havola) berishi",
        "Barcha paketlarni har bir loyiha uchun qayta yuklab olishi"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 5,
      question: "npm ci buyrug'i npm install dan qanday farq qiladi?",
      options: [
        "Paketlarni eng oxirgi versiyasiga qadar yangilab o'rnatadi",
        "node_modules papkasini o'chiradi va faqat package-lock.json asosida aniq versiyalarni o'rnatadi",
        "Faqatgina devDependencies bo'limidagi paketlarni o'rnatadi",
        "Loyiha hajmini kichraytirib beradi"
      ],
      correctAnswerIndex: 1
    },
    {
      id: 6,
      question: "devDependencies nima uchun ishlatiladi?",
      options: [
        "Foydalanuvchilar (users) uchun taqdim etiladigan asosiy ilova kodi",
        "Mobil dasturlarni ishga tushirish uchun",
        "Faqatgina dasturchilar tomonidan loyihani ishlab chiqish va test qilish bosqichlarida kerak bo'ladigan kutubxonalar uchun",
        "Har qanday turdagi virusli dasturlarni aniqlash uchun"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 7,
      question: "peerDependencies qanday maqsadda qo'llaniladi?",
      options: [
        "Foydalanuvchi ma'lum bir kutubxonaning aniq bir versiyasiga (masalan React 18) ega bo'lishini talab qilish uchun",
        "Boshqa dasturchilar bilan chat orqali gaplashish uchun",
        "Loyihani to'g'ridan-to'g'ri serverga joylash (deploy) uchun",
        "Tizimdagi global paketlarni boshqarish uchun"
      ],
      correctAnswerIndex: 0
    },
    {
      id: 8,
      question: "npm registry nima vazifani bajaradi?",
      options: [
        "Faqat pullik dasturlarni sotib oluvchi bozor",
        "Internet yo'q bo'lganda ishlaydigan oflayn papka",
        "Ochiq manbali kodlar markazlashtirilgan tarzda saqlanadigan ommaviy server (ma'lumotlar bazasi)",
        "Kompyuter operatsion tizimi sozlamalarini boshqarish markazi"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 9,
      question: "package-lock.json faylining xususiyatlaridan biri qaysi?",
      options: [
        "Uni har doim qo'lda (manual) tahrirlash kerak",
        "U o'rnatilgan paketlarning eng aniq va qat'iy versiyalarini (lock) saqlaydi",
        "U loyiha kodlarining asosiy logikasini saqlaydi",
        "Uni git repozitoriysiga yuklash (commit qilish) umuman mumkin emas"
      ],
      correctAnswerIndex: 1
    },
    {
      id: 10,
      question: "package.json dagi versiyalash bo'yicha ^1.4.2 qanday ma'noni anglatadi?",
      options: [
        "Faqat aniq 1.4.2 versiya o'rnatiladi",
        "Xavfsiz minor va patch versiyalar (masalan, 1.5.0) qabul qilinadi",
        "Faqat major versiyalar (masalan, 2.0.0) qabul qilinadi",
        "Hech qanday yangilanishlarni qabul qilmaydi"
      ],
      correctAnswerIndex: 1
    },
    {
      id: 11,
      question: "Qaysi vaziyatda NPM scriptlari tizimga xavf tug'dirishi mumkin?",
      options: [
        "Loyiha to'g'ri yozilgan bo'lsa",
        "Dastur faqat open source bo'lsa",
        "Boshqa dasturchi tomonidan yaratilgan zararli paket ichidagi preinstall / postinstall scriptlar yashirincha ishga tushganda",
        "node_modules jildini zip formatda saqlaganda"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 12,
      question: "Loyiha paketlarini yangi versiyasi bor-yo'qligini tekshirish komandasi qaysi?",
      options: [
        "npm check",
        "npm test",
        "npm update",
        "npm outdated"
      ],
      correctAnswerIndex: 3
    }
  ]
};
