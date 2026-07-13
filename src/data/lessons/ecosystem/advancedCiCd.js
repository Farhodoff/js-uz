export const advancedCiCd = {
  id: "advanced-cicd",
  title: "Murakkab CI/CD jarayonlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
Tasavvur qiling, siz pitsaxona ochdingiz. Boshida bitta pitsa tayyorlash, uni tekshirish va mijozga yetkazib berish oson edi. Lekin mijozlar ko'paygach, bu ishni qo'lda qilish qiyinlashdi. CI/CD huddi mana shu pitsa tayyorlash konveyeriga o'xshaydi. 
- **CI (Continuous Integration - Uzluksiz Integratsiya)**: Oshpazlar har bir qo'shgan masallig'ini avtomat ravishda to'g'ri ekanligini tekshirishadi (Avtomatik Test).
- **CD (Continuous Deployment - Uzluksiz Yetkazib berish)**: Tayyor va tekshirilgan pitsa to'g'ridan-to'g'ri mijozning stoliga avtomat tarzda yetkaziladi.

Dasturlashda bu qanday ishlaydi? Siz kodni yozib GitHub ga joylaysiz. Tizim avtomatik tarzda uni test qiladi, build qiladi (masalan, Docker yordamida) va serverga joylaydi.

## 2. 🚀 Deep Dive (Chuqur tahlil va murakkab jarayonlar)
Haqiqiy yirik loyihalarda CI/CD faqatgina test va deploy dan iborat emas. Undan tashqari ko'plab xavfsizlik va optimizatsiya bosqichlari mavjud.

### a) Blue-Green Deployments (Ko'k-Yashil reliz)
Eski va yangi versiyalar uchun alohida serverlar (yoki containerlar) bo'ladi.
- **Blue**: Hozir ishlayotgan jonli (production) muhit.
- **Green**: Yangi versiya yozilgan muhit. Barcha testlar shu yerda o'tkaziladi.
Testlar tugagach, routerning yo'nalishi (trafik) birdaniga Green muhitga buriladi. Agar xato chiqsa, tezda ortga (Blue ga) qaytarish mumkin (Zero-downtime).

### b) Canary Release (Kanareyka relizi)
Yangi versiya barcha foydalanuvchilarga emas, balki faqat kichik guruhga (masalan, 5-10% mijozlarga) ko'rsatiladi. Agar ularda xato kuzatilmasa, asta-sekin 100% ga yetkaziladi. Bu xatolarning keng tarqalishini oldini oladi.

### c) Infrastructure as Code (IaC)
Serverlar va tarmoq sozlamalarini qo'lda kiritish o'rniga kod sifatida yozish (masalan, Terraform yoki Ansible orqali). Bu sizning CI/CD quvuringizga serverlarni noldan boshlab avtomat yaratish imkonini beradi.

### d) Matrix Builds
Sizning kodingiz bitta muhitda emas, balki parallel ravishda bir nechta OS yoki Node.js versiyalarida test qilinadi.
\\\`javascript
// GitHub Actions misoli
strategy:
  matrix:
    node-version: [14.x, 16.x, 18.x]
    os: [ubuntu-latest, windows-latest]
\\\`

## 3. ⚠️ Edge Cases va Senior Intervyu Savollari

**Savol: CI/CD quvurida maxfiy kalitlar (API keys) qanday saqlanadi?**
**Javob:** Hech qachon kod ichida yoki oddiy o'zgaruvchilarda emas. Ular CI/CD platformasining o'zidagi xavfsiz "Secrets" bo'limiga saqlanadi (masalan, GitHub Secrets, AWS Secrets Manager) va qat'iy shifrlanadi.

**Savol: Nima uchun testlar qisqa va tez ishlashi kerak?**
**Javob:** CI/CD konveyeri sekinlashsa, dasturchilar kodni birlashtirishdan qocha boshlaydilar. Katta loyihalarda minglab testlar soatlab vaqt olishi mumkin, shuning uchun "parallel test run" va kodni "caching" (keshlash) texnikalarini qo'llash shart.

**Savol: CI/CD jarayonida Docker ning o'rni qanday?**
**Javob:** Docker kodni unga kerakli barcha paketlar (dependencies) bilan birga izolyatsiyalangan konteynerga o'raydi. Bu "Mening kompyuterimda ishlayotgandi" muammosini yo'q qiladi, sababi serverdagi muhit va local muhit mutlaqo bir xil bo'ladi.

## 4. 📊 Mermaid Diagrammasi
CI/CD quvurining qadam-baqadam ko'rinishi:
\\\`mermaid
graph TD;
    A[Dasturchi Code Push qiladi] --> B[Linting va Code Style];
    B --> C{Testlar Muvaffaqiyatlimi?};
    C -- Ha --> D[Security Scanning];
    C -- Yoq --> E[Slackga xabar jonatish];
    D --> F[Docker Image yaratish];
    F --> G[Staging serveriga Deploy];
    G --> H[End-to-End Testlar];
    H --> I[Productionga Deploy - Blue Green];
\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Pipeline davomiyligini hisoblash",
      instruction: "`getDuration` funksiyasi start va end vaqtlarini (millisekund) qabul qilib, necha soniya davom etganini qaytarsin.",
      startingCode: "function getDuration(startMs, endMs) {\n  // your code here\n}",
      hint: "(end - start) / 1000",
      solution: "function getDuration(startMs, endMs) {\n  return (endMs - startMs) / 1000;\n}",
      test: "const fn = new Function(code + '; return getDuration;')(); if(fn(1000, 3500) !== 2.5) throw new Error('Vaqt noto\\'g\\'ri hisoblandi');"
    },
    {
      id: 2,
      title: "Test muvaffaqiyati",
      instruction: "`isPipelinePassed` funksiyasi test natijalari massivini (boolean) olib, hammasi true bo'lsagina true qaytarsin.",
      startingCode: "function isPipelinePassed(tests) {\n  // your code here\n}",
      hint: "every() metodidan foydalaning",
      solution: "function isPipelinePassed(tests) {\n  return tests.every(t => t === true);\n}",
      test: "const fn = new Function(code + '; return isPipelinePassed;')(); if(!fn([true, true]) || fn([true, false])) throw new Error('Pipeline mantig\\'i xato');"
    },
    {
      id: 3,
      title: "SemVer parsing",
      instruction: "`parseSemVer` funksiyasi 'v1.2.3' formatidagi stringni qabul qilib, { major: 1, minor: 2, patch: 3 } obyektini qaytarsin.",
      startingCode: "function parseSemVer(versionStr) {\n  // your code here\n}",
      hint: "replace('v', '') va split('.') ishlating, keyin parseInt",
      solution: "function parseSemVer(versionStr) {\n  const parts = versionStr.replace('v', '').split('.');\n  return { major: parseInt(parts[0], 10), minor: parseInt(parts[1], 10), patch: parseInt(parts[2], 10) };\n}",
      test: "const fn = new Function(code + '; return parseSemVer;')(); const r = fn('v2.5.1'); if(r.major !== 2 || r.patch !== 1) throw new Error('SemVer xato parse qilindi');"
    },
    {
      id: 4,
      title: "Branch tekshiruvi",
      instruction: "`isDeployableBranch` funksiyasi branch nomini olib, agar u 'main' yoki 'master' bo'lsa true, aks holda false qaytarsin.",
      startingCode: "function isDeployableBranch(branch) {\n  // your code here\n}",
      hint: "branch === 'main' || branch === 'master'",
      solution: "function isDeployableBranch(branch) {\n  return branch === 'main' || branch === 'master';\n}",
      test: "const fn = new Function(code + '; return isDeployableBranch;')(); if(!fn('main') || fn('dev')) throw new Error('Branch logikasi xato');"
    },
    {
      id: 5,
      title: "Docker Tag yasalishi",
      instruction: "`createDockerTag` ilova nomi va versiyasini olib, 'app:v1.0' formatida qaytarsin.",
      startingCode: "function createDockerTag(app, version) {\n  // your code here\n}",
      hint: "Template literal ishlating",
      solution: "function createDockerTag(app, version) {\n  return `${app}:${version}`;\n}",
      test: "const fn = new Function(code + '; return createDockerTag;')(); if(fn('api', 'latest') !== 'api:latest') throw new Error('Tag formati xato');"
    },
    {
      id: 6,
      title: "Commit xabaridan issue ID ni olish",
      instruction: "`getIssueId` 'Fix: TICKET-123 login bug' stringidan 'TICKET-123' ni ajratib olsin. (Har doim bo'shliqdan oldin/keyin kelsa yoki regex ishlating)",
      startingCode: "function getIssueId(commitMsg) {\n  // string ichidan TICKET-123 ni qaytaring\n}",
      hint: "match(/[A-Z]+-\\d+/) dan foydalansangiz bo'ladi.",
      solution: "function getIssueId(commitMsg) {\n  const match = commitMsg.match(/[A-Z]+-\\d+/);\n  return match ? match[0] : null;\n}",
      test: "const fn = new Function(code + '; return getIssueId;')(); if(fn('hello PRJ-99 world') !== 'PRJ-99') throw new Error('Regex xato ishladi');"
    },
    {
      id: 7,
      title: "Kesh kalitini yasash",
      instruction: "`getCacheKey` funksiyasi OS va Node versiyasini olib 'cache-os-nodeVersion' formatida string qaytarsin. Masalan, 'cache-ubuntu-14'.",
      startingCode: "function getCacheKey(os, nodeVer) {\n  // your code here\n}",
      hint: "`cache-${os}-${nodeVer}`",
      solution: "function getCacheKey(os, nodeVer) {\n  return `cache-${os}-${nodeVer}`;\n}",
      test: "const fn = new Function(code + '; return getCacheKey;')(); if(fn('mac', '16') !== 'cache-mac-16') throw new Error('Key xato');"
    },
    {
      id: 8,
      title: "Slack Notification",
      instruction: "`createSlackPayload` status ('success'|'fail') olib, obyekt qaytarsin: { text: 'Pipeline success' }",
      startingCode: "function createSlackPayload(status) {\n  // your code here\n}",
      hint: "{ text: `Pipeline ${status}` }",
      solution: "function createSlackPayload(status) {\n  return { text: `Pipeline ${status}` };\n}",
      test: "const fn = new Function(code + '; return createSlackPayload;')(); if(fn('fail').text !== 'Pipeline fail') throw new Error('Xato obyekt');"
    },
    {
      id: 9,
      title: "Coverage tekshiruvi",
      instruction: "`isCoverageSufficient` foiz qabul qilib, >= 80 bo'lsa true, yo'qsa false qaytarsin.",
      startingCode: "function isCoverageSufficient(pct) {\n  // your code here\n}",
      hint: "pct >= 80",
      solution: "function isCoverageSufficient(pct) {\n  return pct >= 80;\n}",
      test: "const fn = new Function(code + '; return isCoverageSufficient;')(); if(!fn(80) || fn(79.9)) throw new Error('Koveraj logikasi xato');"
    },
    {
      id: 10,
      title: "Matrix Build",
      instruction: "`getMatrixConfig` Node versiyalari massivini olib, { strategy: { matrix: { node: versions } } } qaytarsin.",
      startingCode: "function getMatrixConfig(versions) {\n  // your code here\n}",
      hint: "Kerakli obyekt strukturasini quring.",
      solution: "function getMatrixConfig(versions) {\n  return { strategy: { matrix: { node: versions } } };\n}",
      test: "const fn = new Function(code + '; return getMatrixConfig;')(); const r = fn([12, 14]); if(r.strategy.matrix.node[1] !== 14) throw new Error('Matrix xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "CI nimaning qisqartmasi?",
      options: ["Code Integration", "Continuous Integration", "Computer Intelligence", "Custom Implementation"],
      correctAnswer: 1,
      explanation: "Continuous Integration - kodni doimiy ravishda asosiy omborga birlashtirish va tekshirish."
    },
    {
      id: 2,
      question: "CD (Continuous Deployment) ning asosiy maqsadi nima?",
      options: ["Kodni zaxiralash", "Barcha muvaffaqiyatli kod o'zgarishlarini foydalanuvchiga (prod ga) avtomat yetkazish", "Dasturni o'chirish", "Ma'lumotlar bazasini tozalash"],
      correctAnswer: 1,
      explanation: "U inson aralashuvisiz kodni avtomat production muhitiga yetkazadi."
    },
    {
      id: 3,
      question: "Pipeline nima?",
      options: ["Dasturlash tili", "Kodni build qilish, testlash va deploy qilish qadamlarining avtomatlashtirilgan ketma-ketligi", "Tarmoq protokoli", "Server turi"],
      correctAnswer: 1,
      explanation: "Pipeline (quvur) kodning git dan servergacha bosib o'tadigan avtomatlashgan bosqichlaridir."
    },
    {
      id: 4,
      question: "GitHub Actions yoki GitLab CI da ishlatiladigan fayl formati odatda qanday?",
      options: ["XML", "JSON", "YAML", "TXT"],
      correctAnswer: 2,
      explanation: "Aksariyat CI/CD tizimlari (GitHub Actions, GitLab CI, CircleCI) YAML dan foydalanadi."
    },
    {
      id: 5,
      question: "Matrix Build nima uchun kerak?",
      options: ["Xakerlikdan himoyalash uchun", "Bitta kodni turli muhitlarda (masalan turli OS va Node versiyalarida) parallel test qilish uchun", "Parollarni saqlash uchun", "UI dizayn uchun"],
      correctAnswer: 1,
      explanation: "Matrix imkoniyati yordamida bir xil pipeline ni turli xil parametrlar o'zgaruvchilari bilan parallel ishga tushirish mumkin."
    },
    {
      id: 6,
      question: "Code Coverage (Kod qamrovi) nima?",
      options: ["Koddagi fayllar soni", "Yozilgan avtomat testlar kodning necha foizini tekshirib o'tishini ko'rsatuvchi o'lchov", "Koddagi xatolar soni", "Dasturchilar soni"],
      correctAnswer: 1,
      explanation: "U testlaringiz ilovaning qancha qismini qamrab olganini bildiradi (masalan, 80%)."
    },
    {
      id: 7,
      question: "Canary Deployment qanday ishlaydi?",
      options: ["Faqat qushlar uchganda ishlaydi", "Yangi versiyani hamma uchun birdaniga o'rnatadi", "Yangi versiyani dastlab foydalanuvchilarning kichik guruhiga (masalan 5%) ko'rsatib, xavfsizligini tekshiradi", "Eski versiyani o'chirmaydi"],
      correctAnswer: 2,
      explanation: "Bu usul yordamida xato bo'lsa, u faqat 5% foydalanuvchiga ta'sir qiladi, qolganlariga emas."
    },
    {
      id: 8,
      question: "Artifact (Artifakt) CI/CD da nima?",
      options: ["Tarixiy obida", "Build jarayoni natijasida hosil bo'lgan yig'ilgan fayllar (masalan, .jar, .zip yoki docker image)", "Testdagi xato", "G'oya"],
      correctAnswer: 1,
      explanation: "Kompilyatsiya qilingan kod yoki tayyor paket keyingi qadamlarga (deploy) uzatiladigan artifakt deyiladi."
    },
    {
      id: 9,
      question: "Blue/Green deployment ning afzalligi nimada?",
      options: ["Rangli UI beradi", "Deployment paytida foydalanuvchi uzilish sezmaydi (Zero downtime)", "Server pulini tejaydi", "Kod hajmini kamaytiradi"],
      correctAnswer: 1,
      explanation: "Trafikni birdaniga yangi muhitga burish orqali downtime bo'lmaydi va xato chiqsa darhol orqaga qaytarish oson bo'ladi."
    },
    {
      id: 10,
      question: "Linter (masalan, ESLint) CI pipeline da nima ish qiladi?",
      options: ["Kodni tezlashtiradi", "Kod kodlash standartlariga (style, sintaksis xatolar) mosligini tekshiradi", "Test yozadi", "Kodni serverga yuklaydi"],
      correctAnswer: 1,
      explanation: "U kod sifatini nazorat qilib, standart buzilgan bo'lsa build ni to'xtatadi."
    },
    {
      id: 11,
      question: "Webhook nima?",
      options: ["Tarmog'ni bloklovchi", "Biror hodisa sodir bo'lganda bir tizim boshqa tizimga HTTP POST so'rovi yuborish mexanizmi", "Ma'lumotlar bazasi turi", "CLI komandasi"],
      correctAnswer: 1,
      explanation: "Masalan, GitHub ga kod push qilinganda Jenkins ga webhook orqali xabar borib, pipeline boshlanadi."
    },
    {
      id: 12,
      question: "Staging muhiti (environment) nima?",
      options: ["Video o'yin", "Production muhitining to'liq nusxasi bo'lib, relizdan oldin so'nggi bor test qilish uchun mo'ljallangan joy", "Dasturchining lokal kompyuteri", "O'chirilgan server"],
      correctAnswer: 1,
      explanation: "Staging - jonli efir (prod) dan oldingi so'nggi sinov maydoni."
    }
  ]
};
