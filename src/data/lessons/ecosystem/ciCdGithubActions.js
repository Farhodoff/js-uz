export const ciCdGithubActions = {
  id: "cicd-github-actions",
  title: "CI/CD & GitHub Actions",
  language: "javascript",
  theory: `## Part 1: Beginner Analogy

Tasavvur qiling, siz restoranda oshpazsiz (Dasturchi). Siz ovqatni tayyorlab bo'lgach (kod yozib bo'lgach), uni darhol mijozga (Production) bermaysiz. Avvaliga sifat nazoratchisi (CI) ovqatni tatib ko'radi, tuzi joyidami, pishganmi tekshiradi (Testing). Agar hammasi joyida bo'lsa, ofitsiant (CD) ovqatni mijoz stoliga eltib beradi (Deployment). GitHub Actions ana shu sifat nazoratchisi va ofitsiant vazifasini to'liq avtomatlashtirib beruvchi bepul "ishchilar" jamoasidir.

## Part 2: Deep Dive (Under the hood, runner architecture, yaml parsing, caching strategy)

**1. Runner Architecture (Runner Arxitekturasi)**
GitHub Actions asosida *Runner* deb ataladigan virtual mashinalar yotadi. Siz kodni push qilganingizda, GitHub o'zining bulutli serverlarida (Ubuntu, Windows yoki macOS) bitta vaqtinchalik (ephemeral) konteyner yoki virtual mashina yaratadi. Bu *Hosted Runner* deyiladi. Agar kompaniya xavfsizlikni kuchaytirmoqchi bo'lsa, o'zining shaxsiy serverini *Self-hosted Runner* sifatida ulashi ham mumkin.

**2. YAML Parsing (YAML tahlili)**
Barcha jarayonlar \\\`.github/workflows\\\` papkasidagi YAML fayllarda yoziladi. GitHub ushbu faylni o'qigach, uni Abstract Syntax Tree (AST) kabi o'zining ichki ma'lumotlar tuzilmasiga o'giradi va \\\`jobs\\\` larni parallel yoki ketma-ket (masalan, \\\`needs: [build]\\\` orqali) ishga tushirish grafigini (DAG - Directed Acyclic Graph) tuzib chiqadi.

**3. Caching Strategy (Kesh strategiyasi)**
CI tez ishlashi uchun *caching* juda muhim. Masalan, \\\`node_modules\\\` papkasini har safar boshqatdan yuklab olish o'rniga, \\\`actions/cache\\\` orqali \\\`package-lock.json\\\` ning heshi (hash) asosida keshga olinadi. Keyingi safar xuddi shu hesh topilsa, bog'liqliklar (dependencies) to'g'ridan-to'g'ri bulutdan yuklab olinadi va daqiqalar tejaladi.

\\\`\\\`\\\`yaml
name: Node.js CI Deep Dive
on:
  push:
    branches: [ "main" ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'
    - run: npm ci
    - run: npm test
\\\`\\\`\\\`

## Part 3: Edge Cases and Senior Interview Questions

**Edge Cases (Noodatiy holatlar)**
- **Secret'larni O'g'irlash (Exfiltration)**: Yomon niyatli dasturchi \\\`console.log\\\` qilib secretlarni ko'rmoqchi bo'lsa, GitHub uni avtomatik \\\`***\\\` bilan yopib qo'yadi. Biroq uni base64 ga o'girib chiqarishga urinsa o'qib olishi mumkin, shu sabab Pull Request larda ehtiyotkor bo'lish va kod review o'tkazish muhim.
- **Race Conditions**: Ikki xil workflow bir vaqtda deploy qilsa konflikt kelib chiqishi mumkin. Buni oldini olish uchun \\\`concurrency\\\` kalit so'zi bilan bir vaqtda faqat bitta deploy bo'lishini ta'minlash kerak.

**Senior Interview Questions (Katta Dasturchilar uchun Savollar)**
1. **GitHub Actions'da \\\`concurrency\\\` guruhlari qanday ishlaydi va ular nega kerak?**
   Javob: Agar siz qisqa vaqt ichida ketma-ket 5 marta push qilsangiz, eski pushlar uchun deploy ishini bekor qilish (cancel-in-progress: true) va faqat eng so'nggi kodni deploy qilish uchun ishlatiladi. Bu vaqt va resurslarni tejaydi, shuningdek serverda konfliktlarni oldini oladi.

2. **\\\`npm install\\\` va \\\`npm ci\\\` o'rtasidagi farq nima va nima uchun CI/CD da \\\`npm ci\\\` ishlatamiz?**
   Javob: \\\`npm install\\\` package.json'ni o'qib, yangiroq minor versiyalarni yuklashi mumkin va lock faylni o'zgartirishi mumkin. \\\`npm ci\\\` (Continuous Integration) esa qat'iy tarzda \\\`package-lock.json\\\` dan o'qiydi, avval \\\`node_modules\\\` ni tozalaydi, va lock faylni umuman o'zgartirmaydi. Bu 100% ishonchli muhitni (deterministic build) ta'minlaydi.

3. **Self-hosted runner'larning xavfsizlik xatarlari qanday?**
   Javob: Ochiq manbali (open source) loyihalarda ruxsatsiz pull request'lar self-hosted runner'da ishlasa, hacker sizning serveringizga kirish huquqini olishi, docker socket orqali butun tizimni nazorat qilishi mumkin. Shu sababli jamoat omborlarida ehtiyotkorlik yoki faqat o'z jamoa a'zolariga ruxsat berish tavsiya qilinadi.

## Mermaid Diagram

Quyida DAG (Directed Acyclic Graph) asosida ishlovchi GitHub Actions ketma-ketligi ko'rsatilgan:

\\\`\\\`\\\`mermaid
graph TD
    A[Push to main] --> B(Job: Lint & Test)
    B -->|Muvaffaqiyatli| C{Job: Build}
    B -->|Xatolik| D[Slack Notification: Failed]
    C --> E[Cache node_modules]
    C --> F(Job: Deploy to Staging)
    F --> G[Approval Gate]
    G --> H((Deploy to Production))
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Should Trigger Workflow",
      instruction: "shouldTrigger(branch, event) yozing. U true qaytarishi uchun event 'push' bo'lishi va branch 'main' yoki 'master' bo'lishi shart.",
      startingCode: "function shouldTrigger(branch, event) {\n  // code\n}",
      hint: "Mantiqiy shartlardan && va || dan foydalaning.",
      solution: "function shouldTrigger(branch, event) {\n  return event === 'push' && (branch === 'main' || branch === 'master');\n}",
      test: "const fn = new Function(code + '; return shouldTrigger;')();\nif(fn('main', 'push') !== true || fn('dev', 'push') !== false) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Check Job Status",
      instruction: "isJobSuccessful(steps) steps massivida status qatnashadi. Hamma qadam status'i 'success' bo'lsa true, yo'qsa false.",
      startingCode: "function isJobSuccessful(steps) {\n  // code\n}",
      hint: "every array metodidan foydalaning.",
      solution: "function isJobSuccessful(steps) {\n  return steps.every(s => s.status === 'success');\n}",
      test: "const fn = new Function(code + '; return isJobSuccessful;')();\nif(fn([{status:'success'}]) !== true || fn([{status:'fail'}]) !== false) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Mask Secret String",
      instruction: "maskSecret(secret) funksiyasi satrning faqat oxirgi 4 ta belgisini qoldirib, qolgan hamma belgilar o'rniga '*' ko'rsatsin. Agar 4 ta yoki undan kam bo'lsa o'zgarmasin.",
      startingCode: "function maskSecret(secret) {\n  // code\n}",
      hint: "repeat() va slice(-4) kabi string metodlari.",
      solution: "function maskSecret(secret) {\n  if(secret.length <= 4) return secret;\n  return '*'.repeat(secret.length - 4) + secret.slice(-4);\n}",
      test: "const fn = new Function(code + '; return maskSecret;')();\nif(fn('12345678') !== '****5678' || fn('123') !== '123') throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Calculate CI Duration",
      instruction: "calcDuration(start, end) - qabul qilingan string ko'rinishidagi ISO vaqtlari ('2024-01-01T10:00:00Z') orqali bajarilish vaqtini (soniyalarda) toping.",
      startingCode: "function calcDuration(start, end) {\n  // code\n}",
      hint: "Date.parse yordamida hisoblang va 1000 ga bo'ling.",
      solution: "function calcDuration(start, end) {\n  return (Date.parse(end) - Date.parse(start)) / 1000;\n}",
      test: "const fn = new Function(code + '; return calcDuration;')();\nif(fn('2024-01-01T10:00:00Z', '2024-01-01T10:00:10Z') !== 10) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Generate Matrix Combinations",
      instruction: "generateMatrix(osList, nodeList) ikkita massiv beriladi. Ularning barcha kombinatsiyasidan obyektlar massivini tuzing (Masalan [{os: 'u', node: 14}, ...]).",
      startingCode: "function generateMatrix(osList, nodeList) {\n  // code\n}",
      hint: "Ikki qavatli for tsikli.",
      solution: "function generateMatrix(osList, nodeList) {\n  const res = [];\n  for(let o of osList) {\n    for(let n of nodeList) res.push({ os: o, node: n });\n  }\n  return res;\n}",
      test: "const fn = new Function(code + '; return generateMatrix;')();\nif(fn(['m'], [1]).length !== 1) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Build Cache Key",
      instruction: "getCacheKey(os, hash) - ushbu funksiya qabul qilingan ma'lumotlardan npm-cache-os-hash stringini yasasin.",
      startingCode: "function getCacheKey(os, hash) {\n  // code\n}",
      hint: "Template literals qulay.",
      solution: "function getCacheKey(os, hash) {\n  return 'npm-cache-' + os + '-' + hash;\n}",
      test: "const fn = new Function(code + '; return getCacheKey;')();\nif(fn('mac', '123') !== 'npm-cache-mac-123') throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Validate Workflow File",
      instruction: "isValidWorkflow(yamlObj) obyektida majburiy bo'lgan 3 ta kalit: name, on va jobs bo'lsa true qaytaring.",
      startingCode: "function isValidWorkflow(yamlObj) {\n  // code\n}",
      hint: "Mantiqiy ifodadan foydalaning.",
      solution: "function isValidWorkflow(yamlObj) {\n  return !!(yamlObj && yamlObj.name && yamlObj.on && yamlObj.jobs);\n}",
      test: "const fn = new Function(code + '; return isValidWorkflow;')();\nif(fn({name:'a', on:'b', jobs:'c'}) !== true || fn({name:'a'}) !== false) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Find Artifact Files",
      instruction: "findArtifacts(files) string'lar massividan faqat oxiri '.zip' yoki '.tar.gz' bilan tugagan fayl nomlarini massiv qilib qaytarsin.",
      startingCode: "function findArtifacts(files) {\n  // code\n}",
      hint: "endsWith ishlatish kerak.",
      solution: "function findArtifacts(files) {\n  return files.filter(f => f.endsWith('.zip') || f.endsWith('.tar.gz'));\n}",
      test: "const fn = new Function(code + '; return findArtifacts;')();\nif(fn(['a.txt', 'b.zip']).length !== 1) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Find Failed Step Name",
      instruction: "getFailedStep(steps) massiv orasidan birinchi status: 'failed' bo'lgan obyektning name qiymatini qaytarsin. Bo'lmasa null.",
      startingCode: "function getFailedStep(steps) {\n  // code\n}",
      hint: "find orqali toping.",
      solution: "function getFailedStep(steps) {\n  const failed = steps.find(s => s.status === 'failed');\n  return failed ? failed.name : null;\n}",
      test: "const fn = new Function(code + '; return getFailedStep;')();\nif(fn([{name:'A', status:'failed'}]) !== 'A' || fn([{status:'success'}]) !== null) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Deploy Check",
      instruction: "canDeploy(branch, testPassed, isDraft) deploy amalga oshishi uchun branch 'main', testPassed true va isDraft false bo'lishi kerak. Shunda true qaytsin.",
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
      question: "GitHub Actions da 'Workflow' so'zi qanday ma'no beradi?",
      options: ["Bitta avtomatlashtirilgan vazifalar to'plami (masalan test yoki deploy jarayoni)", "Docker konteyneri nomi", "Dasturchining yozgan kodi", "Jadvalni ko'rsatadi"],
      correctAnswer: 0,
      explanation: "Workflow ma'lum hodisa yuz berganda (push, pull_request) o'ziga bog'langan barcha ishlarni (jobs) boshqaradi."
    },
    {
      id: 5,
      question: "Workflow dagi 'on: push' yozuvi nimani anglatadi?",
      options: ["Barcha kodni qaytarish", "Githubga yangi kod push qilinganida ushbu workflow avtomatik ishga tushadi", "Github serverni o'chiradi", "Hech qanday ma'no bildirmaydi"],
      correctAnswer: 1,
      explanation: "on parametri ushbu workflow'ning qo'zg'atuvchisini (trigger) belgilaydi."
    },
    {
      id: 6,
      question: "uses: actions/checkout@v3 odatda workflow'ning birinchi qadami. U nima qiladi?",
      options: ["Githubdan chiqib ketadi", "Repozitoriyangizdagi joriy kodni ishchi (Runner) serveriga nusxalab (clone) beradi", "Kod yozishni boshlaydi", "Pull requestni qabul qiladi"],
      correctAnswer: 1,
      explanation: "Agar siz checkout qilsangizgina kod Runner serveriga keladi va siz npm install qila olasiz."
    },
    {
      id: 7,
      question: "GitHub Actions'da 'Runner' qanday texnologiya hisoblanadi?",
      options: ["Sizning kodingizni sinab ko'rish uchun maxsus ajratilgan vaqtinchalik virtual mashina (server)", "Dastur ishlovchi o'yin", "Maxsus Github brauzeri", "Faqat xatolar izlovchi"],
      correctAnswer: 0,
      explanation: "Runner Ubuntu, Windows, yoki Mac OS tizimlarida ishlashi mumkin, sizning hamma jarayoningiz aynan shunda bo'ladi."
    },
    {
      id: 8,
      question: "Maxfiy bo'lgan API kalitlari (API_KEY) GitHub Actions'da qanday xavfsiz chaqiriladi?",
      options: ["Kodni ichiga kiritib", "GitHub Repozitoriyasining Secrets bo'limiga kiritilib YAML faylda \\${{ secrets.API_KEY }} bilan o'qib olinadi", "Faylni matn shaklida saqlab", "Commit nomiga qo'shib"],
      correctAnswer: 1,
      explanation: "Secrets yordamida kalitlar shifrlanadi, uni Github hodimlar ham, boshqalar ham ko'ra olmaydi."
    },
    {
      id: 9,
      question: "Matrix strategy (matritsa) ni nega ishlatishadi?",
      options: ["Bir vaqtning o'zida turli xil environmentlarda (masalan Node.js 14, 16, 18 versiyalari) kodni sinovdan o'tkazish uchun", "Ma'lumotni keshga saqlash uchun", "Ma'lumotlar bazasini himoyalash uchun", "Github repo dizaynini o'zgartirish uchun"],
      correctAnswer: 0,
      explanation: "Sizning paketingiz turli node versiyalarida ham ishlaydimi yo'qmi deb tekshirish uchun matritsa juda mos keladi."
    },
    {
      id: 10,
      question: "Workflow davomida paydo bo'ladigan Artifacts (artefakt) deganda nima nazarda tutiladi?",
      options: ["Xatolar hisoboti", "CI/CD jarayonida yaratilgan hamda yuklab olinishi mumkin bo'lgan fayllar (masalan build qilingan .zip fayli, test reporti)", "Konteynerlar nomi", "Faqat log fayllar"],
      correctAnswer: 1,
      explanation: "Build stepidan so'ng tayyorlangan zip faylni artefact sifatida yuklab keyingi deploy stepiga uzatishingiz mumkin."
    },
    {
      id: 11,
      question: "Agar deploy job'ining ichida needs: build deb yozilsa bu nimani anglatadi?",
      options: ["Ikki job o'zaro parallel ishlaydi", "deploy bosqichi faqat build bosqichi xatosiz yakunlangandan keyingina ishga tushadi", "Bunday kalit so'z xato beradi", "Faqat build ishlaydi"],
      correctAnswer: 1,
      explanation: "needs orqali job'larning ketma-ketlik va bo'g'liqlik shartlarini boshqarish oson."
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
