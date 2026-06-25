export const dockerComposeDb = {
  id: "docker-compose-db",
  title: "Docker Compose va Ma'lumotlar Bazalari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
Docker Compose — bu bir nechta Docker konteynerlarini bitta fayl orqali boshqarish imkonini beruvchi vositadir. Ayniqsa, ilovangiz ma'lumotlar bazasi (masalan, PostgreSQL, MongoDB yoki Redis) bilan ishlaganda, har ikkisini bitta buyruq bilan ishga tushirish uchun juda qulay. Tasavvur qiling, orkestr (ilovangiz) va uning sozandalari (DB, kesh, va h.k.) bitta dirijyor (Docker Compose) tomonidan boshqariladi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON (Har birini alohida ishga tushirish)**:
\`\`\`bash
docker run -d --name my-db -e POSTGRES_PASSWORD=secret postgres
docker run -d --name my-app --link my-db:db my-app-image
\`\`\`
Bu yondashuvda buyruqlar ko'payib ketadi va qaramliklarni boshqarish qiyinlashadi.

✅ **YAXSHI (Docker Compose ishlatish)**:
\`\`\`yaml
version: '3.8'
services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret
  app:
    image: my-app-image
    depends_on:
      - db
\`\`\`
Hammasi bitta faylda va bitta buyruq (\`docker-compose up\`) orqali boshqariladi.

## 🎤 Intervyu Savollari
1. **Docker Compose nima va u qachon kerak bo'ladi?**
   - Javob: U ko'p konteynerli ilovalarni bitta \`docker-compose.yml\` fayli orqali sozlash va ishga tushirish vositasi. Asosan, ilova va uning qaramliklari (DB, Redis) ni birga ko'tarishda ishlatiladi.
2. **\`depends_on\` nima qiladi?**
   - Javob: Bir xizmatning boshqasidan oldin ishga tushishini ta'minlaydi. Ammo u konteyner ichidagi xizmat to'liq tayyor bo'lishini kutmaydi, faqat konteyner start bo'lishini kutadi.
3. **Docker Compose da ma'lumotlarni qanday qilib saqlab qolish mumkin?**
   - Javob: Volume-lar yordamida. \`volumes\` bo'limida DB fayllari saqlanadigan joyni xost tizimiga ulash mumkin.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD;
    A[docker-compose.yml] --> B[App Container];
    A --> C[Postgres Container];
    A --> D[Redis Container];
    B -. requests .-> C;
    B -. cache .-> D;
\`\`\`
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
