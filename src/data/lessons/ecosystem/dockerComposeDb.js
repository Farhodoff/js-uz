export const dockerComposeDb = {
  id: "docker-compose-db",
  title: "Docker Compose va Ma'lumotlar Bazalari",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy (Sodda Tushuntirish)

Tasavvur qiling, siz katta bir restoran ochyapsiz. Restoranda oshpaz (Backend ilova), ofitsiant (Frontend) va omborxona mudiri (Ma'lumotlar bazasi - DB) bor. 
Agar siz har bir xodimni alohida-alohida ishga chaqirib, ularga nima qilish kerakligini birma-bir tushuntirsangiz (bu \\\`docker run\\\` buyrug'iga o'xshaydi), juda ko'p vaqt va asab yo'qotasiz.

**Docker Compose** — bu restoran boshqaruvchisining yozma "Ish rejasi" (ya'ni \\\`docker-compose.yml\\\` fayli). Siz shunchaki bitta buyruq (\\\`docker-compose up\\\`) berasiz va restoran boshqaruvchisi oshpazni, ofitsiantni va omborxona mudirini birdaniga ishga tushiradi. Ular qachon kelishini, kim kimga qaram ekanligini (masalan, oshpaz omborxona mudirisiz ovqat pishirolmasligini) bitta faylda ko'rsatib qo'yasiz. Shunday qilib, butun tizim (ilovangiz va uning DB si) bitta jamoa bo'lib ishlaydi.

## 2. 🧠 Deep Dive (Chuqurlashtirilgan o'rganish)

Docker Compose qanday qilib bir nechta konteynerlarni bog'laydi?

- **Under the hood (Ichki ishlash mexanizmi)**: Docker Compose aslida Docker API ustiga qurilgan abstraksiya qatlami hisoblanadi. U siz yozgan YAML faylini o'qiydi, ketma-ketlikni (\\\`depends_on\\\`) tahlil qiladi va har bir xizmat uchun ketma-ket \\\`docker run\\\` buyruqlarini generatsiya qilib ijro etadi.
- **Networking Bridge (Tarmoq ko'prigi)**: Compose avtomatik ravishda barcha xizmatlar uchun bitta izolyatsiya qilingan (default) tarmoq yaratadi. Shuning uchun ilovangiz DB bilan bog'lanish uchun IP manzil emas, balki to'g'ridan-to'g'ri xizmat nomini (masalan, \\\`db\\\` yoki \\\`postgres\\\`) ishlatishi mumkin. Dockerning ichki DNS serveri bu nomni tegishli konteynerning IP manziliga o'zgartirib beradi.
- **Memory va Resurslarni boshqarish**: YAML fayl orqali har bir konteyner qancha RAM yoki CPU ishlatishini aniq belgilab berishingiz mumkin (\\\`deploy.resources.limits\\\` orqali). Bu bitta xizmat (masalan, DB) butun server xotirasini band qilib qo'ymasligini ta'minlaydi.
- **Volumes va DB Persistence (Ma'lumotlarni saqlab qolish)**: Konteynerlar o'tkinchi (ephemeral). Agar PostgreSQL konteynerini o'chirsangiz, barcha ma'lumotlar o'chib ketadi. Bunga yo'l qo'ymaslik uchun **Volumes** (hajmlar) ishlatiladi. Volume xost mashinasidagi qattiq diskning ma'lum bir qismini konteyner ichidagi ma'lumotlar saqlanadigan papkaga (\\\`/var/lib/postgresql/data\\\`) bog'laydi. Natijada, konteyner o'chirilsa ham, ma'lumotlar kompyuteringizda xavfsiz saqlanib qoladi.

## 3. ⚠️ Edge Cases va Senior Interview Questions (Murakkab holatlar)

**Edge Case 1: "Konteyner ishga tushdi, lekin DB tayyor emas"**
\\\`depends_on\\\` faqat konteyner ishga tushganligini tekshiradi, lekin DB o'zining ichki jarayonlarini tugatib, ulanishlarni qabul qilishga tayyor ekanligini kutmaydi. Natijada, ilovangiz DB ga ulana olmay "Connection Refused" xatosini berishi mumkin.
*Yechim:* \\\`depends_on.condition: service_healthy\\\` dan foydalanish va DB uchun \\\`healthcheck\\\` yozish kerak. Yoki dastur ichida kutish mantiqini (retry logic) qo'shish kerak.

**Edge Case 2: Ma'lumotlar bazasi parolini xavfsiz saqlash**
YAML fayl ichida \\\`POSTGRES_PASSWORD: mysecret\\\` deb ochiq yozish xavfsizlikka ziddir, ayniqsa kod Githubda tursa.
*Yechim:* \\\`.env\\\` fayl ishlatish va YAML ichida \\\`POSTGRES_PASSWORD: \${DB_PASSWORD}\\\` shaklida o'zgaruvchilarni chaqirish kerak.

**Senior Interview Savollari:**
1. **Savol:** \\\`docker-compose up\\\` va \\\`docker-compose start\\\` ning farqi nima?
   **Javob:** \\\`up\\\` konteynerlarni noldan yaratadi (agar yo'q bo'lsa), tarmoqlarni ulaydi va ishga tushiradi. \\\`start\\\` esa faqatgina oldin yaratilgan va to'xtab turgan konteynerlarni qayta ishga tushiradi, u yangi konfiguratsiyani o'qimaydi.
2. **Savol:** Bitta serverda ikkita bir xil loyihani Docker Compose orqali qanday qilib nomlar to'qnashuvisiz (name collision) ishga tushirish mumkin?
   **Javob:** \\\`-p\\\` (\\\`--project-name\\\`) flagi orqali loyihaga alohida nom berish yoki \\\`COMPOSE_PROJECT_NAME\\\` environment o'zgaruvchisini o'rnatish orqali. Aks holda Compose default papka nomidan foydalanib nom to'qnashuviga olib keladi.

## 📊 4. Arxitektura Diagrammasi

\\\`\\\`\\\`mermaid
graph TD;
    User[Foydalanuvchi] -->|HTTP Request| API[Node.js App];
    
    subgraph Docker_Compose_Network [Docker Compose Default Network]
        API -->|DNS: db:5432| DB[(PostgreSQL)];
        API -->|DNS: redis:6379| Cache[(Redis Cache)];
    end
    
    DB -.->|Volume Mount| HostDisk[Xost Mashina Diski];
    Cache -.->|In Memory| RAM[RAM Xotira];
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Docker Compose obyekti",
      instruction: "Docker Compose xizmatlari ro'yxatini qaytaruvchi `getServices` funksiyasini yozing. U kamida 'app' va 'db' kalitlarini (xizmatlarini) o'z ichiga olgan obyekt qaytarishi kerak.",
      startingCode: "function getServices() {\n  // your code here\n}",
      hint: "{ app: {}, db: {} } kabi obyekt qaytaring",
      solution: "function getServices() {\n  return { app: {}, db: {} };\n}",
      test: "const fn = new Function(code + '; return getServices;')(); const res = fn(); if(!res.app || !res.db) throw new Error('App yoki db xizmati topilmadi');"
    },
    {
      id: 2,
      title: "Portlarni sozlash",
      instruction: "`addPort` funksiyasini yozing. U berilgan tashqi va ichki portni olib, 'tashqi:ichki' formatida string qaytarsin.",
      startingCode: "function addPort(external, internal) {\n  // your code here\n}",
      hint: "Template literal ishlating: `${external}:${internal}`",
      solution: "function addPort(external, internal) {\n  return `${external}:${internal}`;\n}",
      test: "const fn = new Function(code + '; return addPort;')(); if(fn(8080, 5432) !== '8080:5432') throw new Error('Noto\\'g\\'ri format');"
    },
    {
      id: 3,
      title: "Muhit o'zgaruvchilari (Environment)",
      instruction: "`getDbEnv` funksiyasini tuzing, u username va password qabul qilib, POSTGRES_USER va POSTGRES_PASSWORD kalitli obyekt qaytarsin.",
      startingCode: "function getDbEnv(user, pass) {\n  // your code here\n}",
      hint: "{ POSTGRES_USER: user, POSTGRES_PASSWORD: pass } shaklida qaytaring.",
      solution: "function getDbEnv(user, pass) {\n  return { POSTGRES_USER: user, POSTGRES_PASSWORD: pass };\n}",
      test: "const fn = new Function(code + '; return getDbEnv;')(); const r = fn('u', 'p'); if(r.POSTGRES_USER !== 'u' || r.POSTGRES_PASSWORD !== 'p') throw new Error('Xato obyekt');"
    },
    {
      id: 4,
      title: "Qaramliklar (depends_on)",
      instruction: "`setDependencies` funksiyasi xizmat nomlari massivini qabul qilib, ularni `depends_on` kaliti ostida massiv qilib qaytarsin.",
      startingCode: "function setDependencies(services) {\n  // your code here\n}",
      hint: "return { depends_on: services }",
      solution: "function setDependencies(services) {\n  return { depends_on: services };\n}",
      test: "const fn = new Function(code + '; return setDependencies;')(); const r = fn(['db', 'redis']); if(r.depends_on[1] !== 'redis') throw new Error('Xato natija');"
    },
    {
      id: 5,
      title: "Volume yaratish",
      instruction: "`createVolume` funksiyasi xost va konteyner yo'llarini birlashtirib string qaytarsin.",
      startingCode: "function createVolume(hostPath, containerPath) {\n  // your code here\n}",
      hint: "hostPath + ':' + containerPath",
      solution: "function createVolume(hostPath, containerPath) {\n  return `${hostPath}:${containerPath}`;\n}",
      test: "const fn = new Function(code + '; return createVolume;')(); if(fn('./data', '/var/lib') !== './data:/var/lib') throw new Error('Xato format');"
    },
    {
      id: 6,
      title: "Image nomini tekshirish",
      instruction: "`isValidImage` funksiyasi image nomida 'postgres' yoki 'mysql' bo'lsa true, aks holda false qaytarsin.",
      startingCode: "function isValidImage(imageName) {\n  // your code here\n}",
      hint: "includes() metodidan foydalaning.",
      solution: "function isValidImage(imageName) {\n  return imageName.includes('postgres') || imageName.includes('mysql');\n}",
      test: "const fn = new Function(code + '; return isValidImage;')(); if(!fn('postgres:13') || fn('nginx')) throw new Error('Xato ishladi');"
    },
    {
      id: 7,
      title: "Service Restart Policy",
      instruction: "`getRestartPolicy` funksiyasi policy nomini olib, obyekt qaytarsin: { restart: policy }",
      startingCode: "function getRestartPolicy(policyName) {\n  // your code here\n}",
      hint: "{ restart: policyName }",
      solution: "function getRestartPolicy(policyName) {\n  return { restart: policyName };\n}",
      test: "const fn = new Function(code + '; return getRestartPolicy;')(); if(fn('always').restart !== 'always') throw new Error('Xato policy');"
    },
    {
      id: 8,
      title: "Connection URI",
      instruction: "`createMongoUri` user, pass, host qabul qilib, mongodb uri qursin: 'mongodb://user:pass@host:27017'",
      startingCode: "function createMongoUri(user, pass, host) {\n  // your code here\n}",
      hint: "Template literal ishlating",
      solution: "function createMongoUri(user, pass, host) {\n  return `mongodb://${user}:${pass}@${host}:27017`;\n}",
      test: "const fn = new Function(code + '; return createMongoUri;')(); if(fn('a','b','c') !== 'mongodb://a:b@c:27017') throw new Error('Xato URI');"
    },
    {
      id: 9,
      title: "Version Check",
      instruction: "`isSupportedVersion` compose versiyasi '3' yoki undan katta bo'lsa true qaytarsin. Parametr string ko'rinishida beriladi.",
      startingCode: "function isSupportedVersion(version) {\n  // your code here\n}",
      hint: "parseFloat(version) >= 3",
      solution: "function isSupportedVersion(version) {\n  return parseFloat(version) >= 3;\n}",
      test: "const fn = new Function(code + '; return isSupportedVersion;')(); if(!fn('3.8') || fn('2.1')) throw new Error('Version tekshiruvi xato');"
    },
    {
      id: 10,
      title: "Environment Faylini O'qish (Mock)",
      instruction: "`parseEnvLine` funksiyasi 'KEY=VALUE' yozuvini olib, [KEY, VALUE] massiviga aylantirsin.",
      startingCode: "function parseEnvLine(line) {\n  // your code here\n}",
      hint: "split('=') dan foydalaning.",
      solution: "function parseEnvLine(line) {\n  return line.split('=');\n}",
      test: "const fn = new Function(code + '; return parseEnvLine;')(); const res = fn('DB_HOST=localhost'); if(res[0] !== 'DB_HOST' || res[1] !== 'localhost') throw new Error('Xato parsing');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Docker Compose ning asosiy vazifasi nima?",
      options: ["O'yinlar yaratish", "Bir nechta konteynerlarni bitta fayl orqali boshqarish", "Kod yozish", "Ma'lumotlar bazasini o'chirish"],
      correctAnswer: 1,
      explanation: "Docker Compose bir nechta qaram konteynerlarni bitta yaml fayli yordamida orkestratsiya qiladi."
    },
    {
      id: 2,
      question: "Qaysi fayl formati Docker Compose da ishlatiladi?",
      options: ["JSON", "XML", "YAML", "TXT"],
      correctAnswer: 2,
      explanation: "Docker Compose asosan .yml yoki .yaml kengaytmali fayllardan foydalanadi."
    },
    {
      id: 3,
      question: "`depends_on` kalit so'zi nima qiladi?",
      options: ["Konteynerni o'chiradi", "Konteynerlarning ishga tushish ketma-ketligini belgilaydi", "Internet tezligini oshiradi", "Fayllarni arxivlaydi"],
      correctAnswer: 1,
      explanation: "U xizmatlarni qaysi biri oldin ishga tushishini ta'minlaydi."
    },
    {
      id: 4,
      question: "Qaysi buyruq Docker Compose faylidagi barcha xizmatlarni ishga tushiradi?",
      options: ["docker-compose up", "docker-compose start", "docker run all", "docker up"],
      correctAnswer: 0,
      explanation: "`docker-compose up` buyrug'i barcha xizmatlarni build qilib ishga tushiradi."
    },
    {
      id: 5,
      question: "DB ma'lumotlari konteyner o'chganda yo'qolmasligi uchun nima ishlatiladi?",
      options: ["Ports", "Volumes", "Networks", "Images"],
      correctAnswer: 1,
      explanation: "Volumes orqali xost mashina va konteyner o'rtasida papkalar ulanib, ma'lumot saqlab qolinadi."
    },
    {
      id: 6,
      question: "`ports: ['5432:5432']` da birinchi raqam nima?",
      options: ["Konteyner porti", "Xost porti", "Protsessor raqami", "ID raqam"],
      correctAnswer: 1,
      explanation: "Har doim format `HOST_PORT:CONTAINER_PORT` bo'ladi, birinchi raqam tashqi xost portidir."
    },
    {
      id: 7,
      question: "Docker Compose faylida tarmoqlar (networks) nima uchun kerak?",
      options: ["Fayl yuklash uchun", "Konteynerlar bir-biri bilan xavfsiz aloqa qilishi uchun", "Virusdan himoya qilish uchun", "UI dizayn uchun"],
      correctAnswer: 1,
      explanation: "Konteynerlar alohida tarmoqlarga ajratilib, faqat kerakli xizmatlar bir-biri bilan aloqa qila oladi."
    },
    {
      id: 8,
      question: "`docker-compose down` buyrug'i nima qiladi?",
      options: ["Faqat tarmoqni o'chiradi", "Konteynerlarni to'xtatadi va o'chiradi", "Rasmlarni (image) o'chiradi", "Tizimni o'chiradi"],
      correctAnswer: 1,
      explanation: "Bu buyruq xizmatlarni to'xtatadi, konteynerlarni, networklarni o'chirib tashlaydi."
    },
    {
      id: 9,
      question: "Agar `restart: always` yozilsa nima bo'ladi?",
      options: ["Hech narsa", "Konteyner kutilmaganda to'xtasa yoki server yonsa avtomat qayta ishga tushadi", "Faqat bir marta ishlaydi", "Internet uziladi"],
      correctAnswer: 1,
      explanation: "always xususiyati konteynerni doim ishlashini kafolatlashga harakat qiladi."
    },
    {
      id: 10,
      question: "Muhit o'zgaruvchilari qaysi bo'limda yoziladi?",
      options: ["environment", "variables", "args", "env_vars"],
      correctAnswer: 0,
      explanation: "`environment:` ostida barcha kerakli ENV o'zgaruvchilar ko'rsatiladi."
    },
    {
      id: 11,
      question: "Compose faylida `build: .` nimani anglatadi?",
      options: ["Tayyor image yuklaydi", "Joriy papkadagi Dockerfile orqali image yasaydi", "Arxitektura quradi", "Fayllarni arxivlaydi"],
      correctAnswer: 1,
      explanation: "`build:` direktivasi ko'rsatilgan papkadan Dockerfile qidiradi va yig'adi."
    },
    {
      id: 12,
      question: "Konteynerlarni fon (background) rejimida qanday ishga tushiramiz?",
      options: ["docker-compose up -b", "docker-compose up -f", "docker-compose up -d", "docker-compose run"],
      correctAnswer: 2,
      explanation: "`-d` (detached) parametri yordamida terminal band qilinmasdan, fonda ishlaydi."
    }
  ]
};
