export const dockerBasics = {
  id: "docker-basics",
  title: "Docker Basics",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
Docker - dasturni o'zining barcha kerakli kutubxonalari, fayllari va konfiguratsiyalari bilan birga **Konteyner** nomli qutiga joylashtiradigan tizimdir. Keng tarqalgan "Mening kompyuterimda ishlayapti, lekin serverda nega xato berdi?" degan muammo shu orqali barham topadi. Docker bilan yaratilgan ilova xoh Windows, xoh Mac, xoh Linux serverda bo'lsin - har doim bir xil ishlaydi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON:** Loyihani to'g'ridan-to'g'ri operatsion tizim (OS) ga o'rnatish. Node.js versiyalari to'qnashishi yuzaga kelishi mumkin.
\`\`\`bash
npm install # OS kutubxonalari muhitga bog'liq bo'lib qoladi
\`\`\`

✅ **YAXSHI:** Dockerfile yordamida o'ziga xos va izolyatsiyalangan muhit yaratish.
\`\`\`dockerfile
# Node.js ning 18-versiyasi asos qilib olinadi
FROM node:18-alpine
# Konteyner ichida ishchi papka yaratamiz
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Dasturni ishga tushirish buyrug'i
CMD ["npm", "start"]
\`\`\`

## 🎤 Intervyu Savollari
1. **Docker Image va Container farqi nima?**
   Javob: Image - bu ilovaning qanday yig'ilishi kerakligi tasvirlangan faqat o'qish uchun mo'ljallangan andoza (shablon/chizma). Container esa o'sha Image'ni kompyuterda ishga tushirilgan, hayotiy (running process) holatidir.
2. **Dockerfile nima?**
   Javob: Docker Image'ni hosil qilish qoidalarini va ketma-ketligini belgilab beruvchi maxsus fayl (masalan FROM, COPY, RUN).
3. **Docker Compose nimasi bilan qulay?**
   Javob: Bitta loyihaga tegishli bir nechta xizmatlarni (masalan API, PostgreSQL va Redis) \`docker-compose.yml\` fayli orqali yaxlit holatda qulay ishga tushirish imkonini beradi.

## 🛠️ Amaliy Topshiriqlar
Docker'ning asosiy ish jarayoni:

\`\`\`mermaid
graph LR
    A[Dockerfile] -->|docker build| B(Docker Image)
    B -->|docker run| C[Konteyner 1]
    B -->|docker run| D[Konteyner 2]
    E[Docker Hub Registry] <-->|push / pull| B
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Get Image Name",
      instruction: "`getImageName(repo, name, tag)` funksiyasini yozing. U `repo/name:tag` string qaytarsin. Agar tag bo'lmasa, `latest` so'zi qo'yilsin.",
      startingCode: "function getImageName(repo, name, tag) {\n  // code\n}",
      hint: "O'zgaruvchilarni template string bilan birlashtiring.",
      solution: "function getImageName(repo, name, tag) {\n  return `${repo}/${name}:${tag || 'latest'}`;\n}",
      test: "const fn = new Function(code + '; return getImageName;')();\nif(fn('r', 'n') !== 'r/n:latest' || fn('r', 'n', 'v1') !== 'r/n:v1') throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Calculate Image Size",
      instruction: "`calcTotalSize(layers)` - `{sizeMB: number}` formatidagi obyektlardan iborat massivning barcha size'larini jamlab qaytarsin.",
      startingCode: "function calcTotalSize(layers) {\n  // code\n}",
      hint: "reduce dan foydalaning.",
      solution: "function calcTotalSize(layers) {\n  return layers.reduce((sum, layer) => sum + layer.sizeMB, 0);\n}",
      test: "const fn = new Function(code + '; return calcTotalSize;')();\nif(fn([{sizeMB: 10}, {sizeMB: 30}]) !== 40) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Parse Port Mapping",
      instruction: "`parsePort('8080:80')` kabi matndan obyekt oling: `{ host: 8080, container: 80 }`.",
      startingCode: "function parsePort(mapping) {\n  // code\n}",
      hint: "split(':') va Number ishlating.",
      solution: "function parsePort(mapping) {\n  const [host, container] = mapping.split(':');\n  return { host: Number(host), container: Number(container) };\n}",
      test: "const fn = new Function(code + '; return parsePort;')();\nconst r = fn('3000:80'); if(r.host !== 3000 || r.container !== 80) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Is Container Running",
      instruction: "`isRunning(container)` - id va status maydoni bor. Agar status 'Up' so'zi bilan boshlansa true, yo'qsa false.",
      startingCode: "function isRunning(container) {\n  // code\n}",
      hint: "startsWith funksiyasi.",
      solution: "function isRunning(container) {\n  return container.status.startsWith('Up');\n}",
      test: "const fn = new Function(code + '; return isRunning;')();\nif(fn({status:'Up 2 hours'}) !== true || fn({status:'Exited'}) !== false) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Valid Volume Mount",
      instruction: "`isValidMount(mountStr)` agar u '/host:/container' ko'rinishida bo'lsa (ichida faqat bitta ':' bo'lsa va ikki tomoni bo'sh bo'lmasa) true.",
      startingCode: "function isValidMount(str) {\n  // code\n}",
      hint: "split qilib array elementlari 2 ta va bo'sh emasligini tekshiring.",
      solution: "function isValidMount(str) {\n  const p = str.split(':');\n  return p.length === 2 && p[0].length > 0 && p[1].length > 0;\n}",
      test: "const fn = new Function(code + '; return isValidMount;')();\nif(fn('/a:/b') !== true || fn('/a') !== false || fn(':/b') !== false) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Merge Environment",
      instruction: "`mergeEnv(global, local)` ikkita obyektni birlashtirsin. Agar kalit bir xil bo'lsa local obyektning qiymati olinadi.",
      startingCode: "function mergeEnv(global, local) {\n  // code\n}",
      hint: "Spread (...) yordam beradi.",
      solution: "function mergeEnv(global, local) {\n  return { ...global, ...local };\n}",
      test: "const fn = new Function(code + '; return mergeEnv;')();\nconst r = fn({a:1, b:1}, {b:2}); if(r.b !== 2 || r.a !== 1) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Build Run Command",
      instruction: "`buildRunCmd(image, port)` funksiyasi shu stringni yasab bersin: `docker run -d -p port:80 image`.",
      startingCode: "function buildRunCmd(image, port) {\n  // code\n}",
      hint: "Template literal ishlatamiz.",
      solution: "function buildRunCmd(image, port) {\n  return `docker run -d -p ${port}:80 ${image}`;\n}",
      test: "const fn = new Function(code + '; return buildRunCmd;')();\nif(fn('nginx', 3000) !== 'docker run -d -p 3000:80 nginx') throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Optimize Commands",
      instruction: "`optimizeCmds(cmds)` stringlardan iborat massiv. Ketma-ket ikki xil bir xil komanda kelsa, bittasini olib tashlang.",
      startingCode: "function optimizeCmds(cmds) {\n  // code\n}",
      hint: "filter orqali avvalgisi bilan solishtiring.",
      solution: "function optimizeCmds(cmds) {\n  return cmds.filter((cmd, i) => i === 0 || cmd !== cmds[i-1]);\n}",
      test: "const fn = new Function(code + '; return optimizeCmds;')();\nif(fn(['A','A','B']).length !== 2) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Find Service in Compose",
      instruction: "`findService(compose, name)` compose fayl (mock obyekt) dagi `.services[name]` mavjud bo'lsa uni qaytarsin, yo'qsa null.",
      startingCode: "function findService(compose, name) {\n  // code\n}",
      hint: "obyekt tekshiruvini qiling.",
      solution: "function findService(compose, name) {\n  return compose?.services?.[name] || null;\n}",
      test: "const fn = new Function(code + '; return findService;')();\nconst c = {services:{api:{image:'x'}}}; if(fn(c, 'api').image !== 'x' || fn(c, 'db') !== null) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Has Dockerfile",
      instruction: "`hasDockerfile(files)` massiv ichida kichik-katta harflar aralash bo'lsa ham 'dockerfile' so'zi bo'lsa true qaytaring.",
      startingCode: "function hasDockerfile(files) {\n  // code\n}",
      hint: "toLowerCase va some ishlating.",
      solution: "function hasDockerfile(files) {\n  return files.some(f => f.toLowerCase() === 'dockerfile');\n}",
      test: "const fn = new Function(code + '; return hasDockerfile;')();\nif(fn(['DOCKERfile', 'a']) !== true || fn(['src']) !== false) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Docker'ning eng asosiy maqsadi nima?",
      options: ["Faqat operatsion tizim yaratish", "Dastur, unga tegishli kutubxonalar va barcha moslamalarni bir joyga to'plab izolyatsiya qilingan muhit (konteyner) yaratish", "Web server o'rnatish", "Github o'rnini bosish"],
      correctAnswer: 1,
      explanation: "Konteynerlash orqali siz ilovangiz har doim aniq va xatosiz ishlashiga ishonch hosil qilasiz."
    },
    {
      id: 2,
      question: "Docker Image deganda nima tushuniladi?",
      options: ["Ishlab turgan dastur", "Faqat o'qish uchun mo'ljallangan va konteyner ishga tushishi uchun barcha ko'rsatmalarga ega bo'lgan statik shablon", "Videokarta yordamida rasm chizish", "Bulutli ombor"],
      correctAnswer: 1,
      explanation: "Tasavvur qiling, Image bu uyni qurish chizmasi, Konteyner esa shu chizma asosida qurilgan uy."
    },
    {
      id: 3,
      question: "Dockerfile faylidagi `FROM` buyrug'ining ahamiyati nima?",
      options: ["Kodni yuklaydi", "Konteyner qaysi asosiy Image'dan (masalan node:18 yoki ubuntu) qurilishini boshlab beradi", "Fayllarni zaxiralaydi", "O'z-o'zidan o'chirib yuboradi"],
      correctAnswer: 1,
      explanation: "Har qanday to'g'ri yozilgan Dockerfile aynan FROM buyrug'i bilan boshlanadi."
    },
    {
      id: 4,
      question: "Docker Container nima?",
      options: ["Fayllarni yashiradigan joy", "OS xotirasi", "Image asosida kompyuterda ishga tushirilgan izolyatsiyadagi aktiv jarayon (running process)", "Maxsus tarmoq simi"],
      correctAnswer: 2,
      explanation: "Konteynerlar ichida dastur xuddi alohida operatsion tizimda turgandek ishlaydi."
    },
    {
      id: 5,
      question: "Docker konteynerlar Virtual Mashinalardan (VM) nimasi bilan ustun?",
      options: ["Ular kompyuter yadrosini (Kernel) o'zaro baham ko'radi (share) va og'ir OS yuklamasiz tez hamda yengil ishlaydi", "Ular internetni ko'proq yeydi", "VM arzonroq", "Docker konteyner faqat Mac kompyuterda ishlaydi"],
      correctAnswer: 0,
      explanation: "Har bir VM alohida operatsion tizim talab qiladi va gigabaytlab RAM band etadi, Docker konteyneri esa bir necha MB dan boshlanadi."
    },
    {
      id: 6,
      question: "`docker build` buyrug'i qanday harakatni amalga oshiradi?",
      options: ["Konteynerni o'chiradi", "Dockerfile ni o'qib, yangi Docker Image'ni hosil qiladi", "Internetga ulaydi", "Boshqa serverga yuklaydi"],
      correctAnswer: 1,
      explanation: "Build orqali loyihaning ko'rsatmalari tayyor qutiga joylashadi."
    },
    {
      id: 7,
      question: "Docker Compose nega ko'p ishlatiladi?",
      options: ["U fayllarni siqadi (zip)", "Bir-biriga bog'liq bo'lgan turli xil konteynerlarni (masalan API va Database) bitta yaml fayli orqali tartibli ko'tarish uchun", "Ma'lumotlarni o'g'irlash uchun", "Hech qachon ishlatilmaydi"],
      correctAnswer: 1,
      explanation: "Murakkab tizimlarda har bir servisni alohida CLI da yozib o'tirmasdan `docker-compose up -d` deyiladi."
    },
    {
      id: 8,
      question: "Konteyner o'chirib yuborilganda undagi ma'lumotlar nima bo'ladi?",
      options: ["Hammasi saqlanib qoladi", "Konteyner vaqtinchalik xotira bo'lgani uchun yo'qoladi, ularni saqlash uchun Docker Volumes kerak", "Docker o'zi bulutga saqlaydi", "Parollanib qoladi"],
      correctAnswer: 1,
      explanation: "Ma'lumotlar bazasi kabi davomiy (persistent) ma'lumotlar Volume'larga biriktirilishi shart."
    },
    {
      id: 9,
      question: "`docker push` vazifasi nima?",
      options: ["Loyiha tezligini oshiradi", "Tayyorlangan Docker Image'ni mahalliy muhitdan Docker Hub (yoki boshqa registry) ga saqlab jo'natadi", "Xotirani tozalaydi", "Avtomatik test qiladi"],
      correctAnswer: 1,
      explanation: "Bu xuddi Git'dagi push kabi boshqalar yoki serveringiz sizning Imageni ishlatishi uchun omborga yuklashdir."
    },
    {
      id: 10,
      question: "Dockerfile'dagi `COPY` va `ADD` amallarida nima farq bor?",
      options: ["Ikkovi tamoman bir xil", "COPY faqat fayl nusxalaydi, ADD esa internet URL dan fayl torta oladi va zip larni ochib yuboradi", "ADD sekin ishlaydi", "COPY xavfsiz emas"],
      correctAnswer: 1,
      explanation: "Odatiy va tushunarli yondashuvda kutilmagan holatlardan qochish uchun doim COPY ishlatish maslahat beriladi."
    },
    {
      id: 11,
      question: "`docker run -p 8080:80` ning mazmuni nima?",
      options: ["Faqat 8080 ta ulanishni qabul qilish", "Asosiy kompyuterning (Host) 8080-portini Konteynerning ichki 80-porti bilan bog'lash (mapping)", "Tezlikni oshirish", "IP manzil taqsimlash"],
      correctAnswer: 1,
      explanation: "Bu bog'liqlik orqali siz brauzerda localhost:8080 ga kirsangiz, u konteynerdagi 80 portli serverga jo'natiladi."
    },
    {
      id: 12,
      question: "`.dockerignore` fayli nega foydali?",
      options: ["Server xatolarini bekitadi", "Image build qilinayotgan vaqtda kerak bo'lmagan fayllarni (node_modules, .git) kirmasligini ta'minlab Image hajmini kamaytiradi", "Docker parollarini qo'riqlaydi", "Konteyner tezligini o'lchaydi"],
      correctAnswer: 1,
      explanation: "Xuddi gitignore kabi, uni ishlatsangiz build vaqti keskin kamayadi."
    }
  ]
};
