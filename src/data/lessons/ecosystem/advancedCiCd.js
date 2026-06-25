export const advancedCiCd = {
  id: "advanced-cicd",
  title: "Murakkab CI/CD jarayonlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
CI/CD (Continuous Integration / Continuous Deployment) — bu dasturni yozishdan tortib uni serverga (prodga) yetkazib berishgacha bo'lgan jarayonlarni avtomatlashtirishdir.
- **CI (Continuous Integration)**: Dasturchi kodni Git ga push qilganida u avtomat test qilinadi va build qilinadi.
- **CD (Continuous Deployment/Delivery)**: Muvaffaqiyatli build dan so'ng u avtomat ravishda serverlarga yoki foydalanuvchilarga yetkaziladi.

Murakkab CI/CD pipeline'larida Matrix build'lar (bir vaqtda turli OS larda test qilish), xavfsizlik (security scan), va canary deployment'lar (yangi versiyani faqat 10% foydalanuvchiga ko'rsatish) ishlatiladi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON (Qo'lda qilish)**:
1. Dasturchi kodni yozib zip ga joylaydi.
2. Serverga FTP orqali yuklaydi.
3. Eskisini o'chirib yangisini ishga tushiradi. Sayt buzilsa nima bo'lganini bilmaydi.

✅ **YAXSHI (CI/CD Pipeline bilan)**:
1. Kod GitHub/GitLab ga push qilinadi.
2. Pipeline avtomat ishga tushadi: Linter -> Unit Test -> SonarQube (sifat) -> Docker Build -> Serverga deploy.
3. Agar bitta qadam xato bo'lsa, jarayon to'xtaydi va dasturchiga Slack ga xabar keladi.

## 🎤 Intervyu Savollari
1. **CI va CD o'rtasidagi farq nima?**
   - Javob: CI asosan kodni birlashtirish, build va test qilishga qaratilgan. CD esa ushbu tayyor kodni avtomatik tarzda muhitlarga (Dev, Staging, Prod) chiqarishga qaratilgan.
2. **GitHub Actions yoki GitLab CI da "Matrix" tushunchasi nima?**
   - Javob: Bitta testni bir nechta o'zgaruvchilar bilan parallel ishlatish. Masalan, Node.js ning 14, 16, 18 versiyalarida bir vaqtda test qilish.
3. **Blue/Green Deployment nima?**
   - Javob: Ikkita bir xil muhit bo'ladi. Yangi versiya Blue ga deploy qilinadi, to'liq test qilingach, trafik birdaniga Green dan Blue ga o'tkaziladi. Bu "zero-downtime" beradi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph LR;
    A[Git Push] --> B[Lint & Test];
    B --> C[Security Scan];
    C --> D[Docker Build];
    D --> E[Deploy to Staging];
    E --> F[Approve];
    F --> G[Deploy to Prod];
\`\`\`
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
      solution: "function parseSemVer(versionStr) {\n  const parts = versionStr.replace('v', '').split('.');\n  return { major: parseInt(parts[0]), minor: parseInt(parts[1]), patch: parseInt(parts[2]) };\n}",
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
      explanation: "Pipeline (quvur) kodning git'dan servergacha bosib o'tadigan avtomatlashgan bosqichlaridir."
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
      explanation: "Matrix imkoniyati yordamida bir xil pipeline'ni turli xil parametrlar o'zgaruvchilari bilan parallel ishga tushirish mumkin."
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
      question: "Linter (masalan, ESLint) CI pipeline'da nima ish qiladi?",
      options: ["Kodni tezlashtiradi", "Kod kodlash standartlariga (style, sintaksis xatolar) mosligini tekshiradi", "Test yozadi", "Kodni serverga yuklaydi"],
      correctAnswer: 1,
      explanation: "U kod sifatini nazorat qilib, standart buzilgan bo'lsa build'ni to'xtatadi."
    },
    {
      id: 11,
      question: "Webhook nima?",
      options: ["Tarmog'ni bloklovchi", "Biror hodisa sodir bo'lganda bir tizim boshqa tizimga HTTP POST so'rovi yuborish mexanizmi", "Ma'lumotlar bazasi turi", "CLI komandasi"],
      correctAnswer: 1,
      explanation: "Masalan, GitHub'ga kod push qilinganda Jenkins'ga webhook orqali xabar borib, pipeline boshlanadi."
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
