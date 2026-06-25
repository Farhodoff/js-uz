export const ciCdGithubActions = {
  id: "cicd-github-actions",
  title: "CI/CD & GitHub Actions",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
**CI (Continuous Integration - Uzluksiz Birlashtirish)**: Dasturchi har safar kod yozib Github'ga yuklaganida (push, pull request), maxsus serverlar ushbu yangi kodni avtomatik tekshirib, xatoliklari bor yoki yo'qligini, shuningdek testlardan o'tishini tahlil qiladi.
**CD (Continuous Deployment - Uzluksiz Yetkazib berish)**: Testlardan muvaffaqiyatli o'tgan kodni inson ishtirokisiz to'g'ridan-to'g'ri ishlab chiqarish (production) serverlariga avtomatik tarzda joylashtirish mexanizmi.

**GitHub Actions** bu jarayonlarni bepul va oson tarzda bitta omborda (repo) yuritish uchun CI/CD vositasidir.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON:** Serverga har bir kod o'zgarishini FTP orqali qo'lda tashlash va xatoni mijoz ko'rgandan so'ng bilish.
Bunday yondashuv vaqtni o'g'irlaydi, stressli va komanda ishida kodlarni ziddiyatga olib keladi.

✅ **YAXSHI:** GitHub Actions yordamida ishonchli CI/CD Pipeline qurish.
\`\`\`yaml
# .github/workflows/node.yml fayli
name: Node.js CI
on:
  push:
    branches: [ "main" ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Node.js 18 versiyasini o'rnatish
      uses: actions/setup-node@v3
      with:
        node-version: 18
    - run: npm install
    - run: npm test
\`\`\`

## 🎤 Intervyu Savollari
1. **GitHub Actions'da Workflow va Job o'rtasidagi munosabat qanday?**
   Javob: Workflow umumiy ish jarayoni bo'lib, o'z ichiga qadamlar ketma-ketligini olgan Job'larni birlashtiradi. Har bir Job alohida, parallel tarzda turli Runner'larda bajarilishi mumkin.
2. **Secret'lar GitHub Actions'da qanday himoyalanadi?**
   Javob: API kalitlari yoki parollar omborning Settings > Secrets qismida shifrlab saqlanadi va YAML faylda \`\${{ secrets.API_KEY }}\` ko'rinishida chaqiriladi. Jurnal (log) larda ular * yulduzchalar bilan berkitiladi.
3. **Continuous Delivery va Deployment farqi?**
   Javob: Delivery - kod deploy'ga tayyor turadi lekin yakuniy ruxsatni odam berishi kerak bo'ladi. Deployment - ruxsatsiz avtomatik jonli muhitga (live) chiqib ketadi.

## 🛠️ Amaliy Topshiriqlar
Quyidagi diagramma standart CI/CD pipeline yo'nalishini ko'rsatadi:

\`\`\`mermaid
graph LR
    A[Git Push] --> B(GitHub Actions)
    B --> C[Install & Build]
    C --> D[Run Unit Tests]
    D -->|O'tdi| E[Deploy to Server]
    D -->|Yiqildi| F[Telegram Notification]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Should Trigger Workflow",
      instruction: "`shouldTrigger(branch, event)` yozing. U true qaytarishi uchun event 'push' bo'lishi va branch 'main' yoki 'master' bo'lishi shart.",
      startingCode: "function shouldTrigger(branch, event) {\n  // code\n}",
      hint: "Mantiqiy shartlardan && va || dan foydalaning.",
      solution: "function shouldTrigger(branch, event) {\n  return event === 'push' && (branch === 'main' || branch === 'master');\n}",
      test: "const fn = new Function(code + '; return shouldTrigger;')();\nif(fn('main', 'push') !== true || fn('dev', 'push') !== false) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Check Job Status",
      instruction: "`isJobSuccessful(steps)` steps massivida status qatnashadi. Hamma qadam status'i 'success' bo'lsa true, yo'qsa false.",
      startingCode: "function isJobSuccessful(steps) {\n  // code\n}",
      hint: "every array metodidan foydalaning.",
      solution: "function isJobSuccessful(steps) {\n  return steps.every(s => s.status === 'success');\n}",
      test: "const fn = new Function(code + '; return isJobSuccessful;')();\nif(fn([{status:'success'}]) !== true || fn([{status:'fail'}]) !== false) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Mask Secret String",
      instruction: "`maskSecret(secret)` funksiyasi satrning faqat oxirgi 4 ta belgisini qoldirib, qolgan hamma belgilar o'rniga '*' ko'rsatsin. Agar 4 ta yoki undan kam bo'lsa o'zgarmasin.",
      startingCode: "function maskSecret(secret) {\n  // code\n}",
      hint: "repeat() va slice(-4) kabi string metodlari.",
      solution: "function maskSecret(secret) {\n  if(secret.length <= 4) return secret;\n  return '*'.repeat(secret.length - 4) + secret.slice(-4);\n}",
      test: "const fn = new Function(code + '; return maskSecret;')();\nif(fn('12345678') !== '****5678' || fn('123') !== '123') throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Calculate CI Duration",
      instruction: "`calcDuration(start, end)` - qabul qilingan string ko'rinishidagi ISO vaqtlari ('2024-01-01T10:00:00Z') orqali bajarilish vaqtini (soniyalarda) toping.",
      startingCode: "function calcDuration(start, end) {\n  // code\n}",
      hint: "Date.parse yordamida hisoblang va 1000 ga bo'ling.",
      solution: "function calcDuration(start, end) {\n  return (Date.parse(end) - Date.parse(start)) / 1000;\n}",
      test: "const fn = new Function(code + '; return calcDuration;')();\nif(fn('2024-01-01T10:00:00Z', '2024-01-01T10:00:10Z') !== 10) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Generate Matrix Combinations",
      instruction: "`generateMatrix(osList, nodeList)` ikkita massiv beriladi. Ularning barcha kombinatsiyasidan obyektlar massivini tuzing (Masalan [{os: 'u', node: 14}, ...]).",
      startingCode: "function generateMatrix(osList, nodeList) {\n  // code\n}",
      hint: "Ikki qavatli for tsikli.",
      solution: "function generateMatrix(osList, nodeList) {\n  const res = [];\n  for(let o of osList) {\n    for(let n of nodeList) res.push({ os: o, node: n });\n  }\n  return res;\n}",
      test: "const fn = new Function(code + '; return generateMatrix;')();\nif(fn(['m'], [1]).length !== 1) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Build Cache Key",
      instruction: "`getCacheKey(os, hash)` - ushbu funksiya qabul qilingan ma'lumotlardan `npm-cache-os-hash` stringini yasasin.",
      startingCode: "function getCacheKey(os, hash) {\n  // code\n}",
      hint: "Template literals qulay.",
      solution: "function getCacheKey(os, hash) {\n  return `npm-cache-${os}-${hash}`;\n}",
      test: "const fn = new Function(code + '; return getCacheKey;')();\nif(fn('mac', '123') !== 'npm-cache-mac-123') throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Validate Workflow File",
      instruction: "`isValidWorkflow(yamlObj)` obyektida majburiy bo'lgan 3 ta kalit: `name`, `on` va `jobs` bo'lsa true qaytaring.",
      startingCode: "function isValidWorkflow(yamlObj) {\n  // code\n}",
      hint: "Mantiqiy ifodadan foydalaning.",
      solution: "function isValidWorkflow(yamlObj) {\n  return !!(yamlObj?.name && yamlObj?.on && yamlObj?.jobs);\n}",
      test: "const fn = new Function(code + '; return isValidWorkflow;')();\nif(fn({name:'a', on:'b', jobs:'c'}) !== true || fn({name:'a'}) !== false) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Find Artifact Files",
      instruction: "`findArtifacts(files)` string'lar massividan faqat oxiri `.zip` yoki `.tar.gz` bilan tugagan fayl nomlarini massiv qilib qaytarsin.",
      startingCode: "function findArtifacts(files) {\n  // code\n}",
      hint: "endsWith ishlatish kerak.",
      solution: "function findArtifacts(files) {\n  return files.filter(f => f.endsWith('.zip') || f.endsWith('.tar.gz'));\n}",
      test: "const fn = new Function(code + '; return findArtifacts;')();\nif(fn(['a.txt', 'b.zip']).length !== 1) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Find Failed Step Name",
      instruction: "`getFailedStep(steps)` massiv orasidan birinchi `status: 'failed'` bo'lgan obyektning `name` qiymatini qaytarsin. Bo'lmasa null.",
      startingCode: "function getFailedStep(steps) {\n  // code\n}",
      hint: "find orqali toping.",
      solution: "function getFailedStep(steps) {\n  const failed = steps.find(s => s.status === 'failed');\n  return failed ? failed.name : null;\n}",
      test: "const fn = new Function(code + '; return getFailedStep;')();\nif(fn([{name:'A', status:'failed'}]) !== 'A' || fn([{status:'success'}]) !== null) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Deploy Check",
      instruction: "`canDeploy(branch, testPassed, isDraft)` deploy amalga oshishi uchun branch 'main', testPassed true va isDraft false bo'lishi kerak. Shunda true qaytsin.",
      startingCode: "function canDeploy(branch, testPassed, isDraft) {\n  // code\n}",
      hint: "Uchala shartni qat'iy mantiq bilan birlashtiring.",
      solution: "function canDeploy(branch, testPassed, isDraft) {\n  return branch === 'main' && testPassed === true && isDraft === false;\n}",
      test: "const fn = new Function(code + '; return canDeploy;')();\nif(fn('main', true, false) !== true || fn('main', false, false) !== false) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "CI (Continuous Integration) jarayonining ahamiyati nimada?",
      options: ["Kodni to'g'ridan-to'g'ri bulutga yuklash", "Dasturchilar kodini tez-tez birlashtirish va ularning to'g'riligini avtomatik test qilish", "Ma'lumotlar bazasini optimallashtirish", "Faqat dasturni sekinlashtirish"],
      correctAnswer: 1,
      explanation: "CI yordamida sizning Pull Request kodingiz asosiy tarmoqqa qabul qilinishidan oldin to'liq tekshiruvdan o'tadi."
    },
    {
      id: 2,
      question: "CD (Continuous Deployment) nima?",
      options: ["Github omborini o'chirib yuborish", "Testlardan o'tgan yangi versiyani mijozlar ishlatadigan serverlarga to'liq avtomatik jo'natish", "Kod arxitekturasini chizish", "Dasturni o'rnatish"],
      correctAnswer: 1,
      explanation: "Continuous Deployment yordamida dastur har xil qo'lda qilinadigan rasmiyatlarsiz mijozga tezlik bilan yetkazib beriladi."
    },
    {
      id: 3,
      question: "GitHub Actions konfiguratsiyalari qaysi fayl formatida va qayerda saqlanadi?",
      options: ["JSON, root papkada", "XML, /actions papkasida", "YAML, loyiha ichidagi .github/workflows/ papkasida", "JavaScript, /scripts papkasida"],
      correctAnswer: 2,
      explanation: "Har bir YAML (YML) fayli bitta Workflow (ish zanjiri) ni o'zida ifodalaydi."
    },
    {
      id: 4,
      question: "GitHub Actions da `Workflow` so'zi qanday ma'no beradi?",
      options: ["Bitta avtomatlashtirilgan vazifalar to'plami (masalan test yoki deploy jarayoni)", "Docker konteyneri nomi", "Dasturchining yozgan kodi", "Jadvalni ko'rsatadi"],
      correctAnswer: 0,
      explanation: "Workflow ma'lum hodisa yuz berganda (push, pull_request) o'ziga bog'langan barcha ishlarni (jobs) boshqaradi."
    },
    {
      id: 5,
      question: "Workflow dagi `on: push` yozuvi nimani anglatadi?",
      options: ["Barcha kodni qaytarish", "Githubga yangi kod push qilinganida ushbu workflow avtomatik ishga tushadi", "Github serverni o'chiradi", "Hech qanday ma'no bildirmaydi"],
      correctAnswer: 1,
      explanation: "`on` parametri ushbu workflow'ning qo'zg'atuvchisini (trigger) belgilaydi."
    },
    {
      id: 6,
      question: "`uses: actions/checkout@v3` odatda workflow'ning birinchi qadami. U nima qiladi?",
      options: ["Githubdan chiqib ketadi", "Repozitoriyangizdagi joriy kodni ishchi (Runner) serveriga nusxalab (clone) beradi", "Kod yozishni boshlaydi", "Pull requestni qabul qiladi"],
      correctAnswer: 1,
      explanation: "Agar siz checkout qilsangizgina kod Runner serveriga keladi va siz \`npm install\` qila olasiz."
    },
    {
      id: 7,
      question: "GitHub Actions'da `Runner` qanday texnologiya hisoblanadi?",
      options: ["Sizning kodingizni sinab ko'rish uchun maxsus ajratilgan vaqtinchalik virtual mashina (server)", "Dastur ishlovchi o'yin", "Maxsus Github brauzeri", "Faqat xatolar izlovchi"],
      correctAnswer: 0,
      explanation: "Runner Ubuntu, Windows, yoki Mac OS tizimlarida ishlashi mumkin, sizning hamma jarayoningiz aynan shunda bo'ladi."
    },
    {
      id: 8,
      question: "Maxfiy bo'lgan API kalitlari (API_KEY) GitHub Actions'da qanday xavfsiz chaqiriladi?",
      options: ["Kodni ichiga kiritib", "GitHub Repozitoriyasining `Secrets` bo'limiga kiritilib YAML faylda \`\${{ secrets.API_KEY }}\` bilan o'qib olinadi", "Faylni matn shaklida saqlab", "Commit nomiga qo'shib"],
      correctAnswer: 1,
      explanation: "Secrets yordamida kalitlar shifrlanadi, uni Github hodimlar ham, boshqalar ham ko'ra olmaydi."
    },
    {
      id: 9,
      question: "`Matrix strategy` (matritsa) ni nega ishlatishadi?",
      options: ["Bir vaqtning o'zida turli xil environmentlarda (masalan Node.js 14, 16, 18 versiyalari) kodni sinovdan o'tkazish uchun", "Ma'lumotni keshga saqlash uchun", "Ma'lumotlar bazasini himoyalash uchun", "Github repo dizaynini o'zgartirish uchun"],
      correctAnswer: 0,
      explanation: "Sizning paketingiz turli node versiyalarida ham ishlaydimi yo'qmi deb tekshirish uchun matritsa juda mos keladi."
    },
    {
      id: 10,
      question: "Workflow davomida paydo bo'ladigan `Artifacts` (artefakt) deganda nima nazarda tutiladi?",
      options: ["Xatolar hisoboti", "CI/CD jarayonida yaratilgan hamda yuklab olinishi mumkin bo'lgan fayllar (masalan build qilingan .zip fayli, test reporti)", "Konteynerlar nomi", "Faqat log fayllar"],
      correctAnswer: 1,
      explanation: "Build stepidan so'ng tayyorlangan zip faylni artefact sifatida yuklab keyingi deploy stepiga uzatishingiz mumkin."
    },
    {
      id: 11,
      question: "Agar \`deploy\` job'ining ichida \`needs: build\` deb yozilsa bu nimani anglatadi?",
      options: ["Ikki job o'zaro parallel ishlaydi", "\`deploy\` bosqichi faqat \`build\` bosqichi xatosiz yakunlangandan keyingina ishga tushadi", "Bunday kalit so'z xato beradi", "Faqat \`build\` ishlaydi"],
      correctAnswer: 1,
      explanation: "\`needs\` orqali job'larning ketma-ketlik va bo'g'liqlik shartlarini boshqarish oson."
    },
    {
      id: 12,
      question: "Kodni serverga SSH ulanish orqali deploy qilishda GitHub Actions uchun qaysi texnika kerak?",
      options: ["Server FTP parolini omma biladigan README ga yozish", "Serverning IP manzili, SSH Private Key hamda foydalanuvchi ismini Github Secrets'da xavfsiz saqlash va Action orqali kiritish", "Brauzer cookies orqali ulash", "Github profil login orqali ulash"],
      correctAnswer: 1,
      explanation: "Shaxsiy va o'ta muhim bo'lgan SSH kalit orqali Actions virtual serverdan turib sizning serveringizga xavfsiz buyruq bera oladi."
    }
  ]
};
