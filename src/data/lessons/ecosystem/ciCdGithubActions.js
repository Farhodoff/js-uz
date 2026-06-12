export const ciCdGithubActions = {
  id: "ciCdGithubActions",
  title: "CI/CD va GitHub Actions",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### CI/CD nima?
* **Continuous Integration (CI - Uzluksiz integratsiya):** Dasturchilar o'z kodlarini asosiy tarmoqqa (main branch) qo'shganda, u avtomatik ravishda testlardan o'tkazilishi va tekshirilishi jarayoni.
* **Continuous Deployment (CD - Uzluksiz yetkazib berish):** Kod testlardan muvaffaqiyatli o'tgach, u avtomatik ravishda jonli serverga (production) deploy qilinishi (yuklanishi).

**Analogiya:**
Bu xuddi **avtomobil ishlab chiqarish zavodidagi konveyerga** o'xshaydi:
1. Har bir detal qo'shilganda (kod yozilganda), robotlar uni darhol tekshiradi, chizadi, o'lchaydi (**CI - Avtomatlashtirilgan test**).
2. Agar hamma tekshiruvlar muvaffaqiyatli o'tsa, mashina to'g'ridan-to'g'ri do'konga yo'l oladi (**CD - Avtomatlashtirilgan yetkazib berish**). Agar biror joyida xato bo'lsa, konveyer darhol to'xtaydi va muhandislarga xabar yuboradi.

---

## 2. 💻 Real Kod Misollari

### 1. GitHub Actions Workflow (.github/workflows/ci.yml)
GitHub Actions loyiha ildizidagi \\\`.github/workflows/\\\` papkasida joylashgan YAML formatidagi fayllar orqali boshqariladi.

Quyida Node.js loyihasini avtomatik testlovchi pipeline berilgan:
\\\`\\\`\\\`yaml
# Workflow nomi
name: Node.js CI

# Triggers (Qachon ishga tushishi)
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# Ish bajariladigan qismlar
jobs:
  build-and-test:
    # Ish qaysi operatsion tizimda bajarilishi
    runs-on: ubuntu-latest

    steps:
      # 1. Kodni serverga yuklab olish
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Node.js muhitini o'rnatish
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # 3. Kutubxonalarni o'rnatish
      - name: Install dependencies
        run: npm ci

      # 4. Kod sifatini tekshirish (Linter)
      - name: Run linter
        run: npm run lint

      # 5. Testlarni ishga tushirish
      - name: Run tests
        run: npm test
\\\`\\\`\\\`

### 2. GitHub Secrets (Maxfiy kalitlarni saqlash)
Production serverga ulanish (masalan API kalitlar, AWS parollari) yozilgan YAML fayliga ochiq yozilmaydi. Ular GitHub-dagi **Settings -> Secrets and variables** bo'limida saqlanadi va YAML faylida quyidagicha chaqiriladi:
\\\`\\\`\\\`yaml
      - name: Deploy to Hosting
        run: npm run deploy
        env:
          MY_API_KEY: \${{ secrets.PRODUCTION_API_KEY }}
\\\`\\\`\\\`

---

## 3. 🎨 Pipeline Oqimi (Mermaid diagrammasi)

GitHub Actions ishga tushish bosqichlari:

\`\`\`mermaid
graph TD
    Push["Git Push (main branch)"] -->|Trigger workflow| Runner["GitHub Runner (Ubuntu VM)"]
    Runner -->|Step 1: checkout| Code["Codebase downloaded"]
    Code -->|Step 2: setup-node| Node["Node.js installed"]
    Node -->|Step 3: npm ci| Deps["Dependencies installed"]
    Deps -->|Step 4: npm test| Test{"Tests Pass?"}
    Test -->|Yes| Deploy["CD: Auto-deploy to Production"]
    Test -->|No| Fail["Pipeline Fails & Alerts Developer"]
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \\\`npm install\\\` ishlatish (npm ci o'rniga)
Workflow ichida oddiy \\\`npm install\\\` ishlatilsa, u package-lock.json faylini o'zgartirib yuborishi va build barqarorligini buzishi mumkin.
* **Tuzatish:** CI muhitlarida har doim \\\`npm ci\\\` (clean install) buyrug'ini ishlating. U tezroq ishlaydi va package-lock.json-ga 100% mos kutubxonalarni o'rnatadi.

### 2. Maxfiy kalitlarni ochiq yozish (Hardcoding secrets)
API kalitlari yoki server parollarini yashirmasdan yozish xavfsizlikka juda katta zarardir.
* **Tuzatish:** Kalitlarni doimo GitHub Secrets-da saqlang va \\\`\${{ secrets.KEY }}\\\` sintaksisi yordamida o'qing.

---

## 5. 💬 12 ta Intervyu Savollari (Junior/Middle)

### Junior
1. **Savol:** CI/CD nima?
   * **Javob:** CI — Continuous Integration (kodni avtomatik tekshirish va integratsiya qilish), CD — Continuous Delivery/Deployment (kodni avtomatik serverga yetkazish).
2. **Savol:** GitHub Actions nima?
   * **Javob:** GitHub platformasida loyihalarni avtomatlashtirish, testlash va deploy qilish uchun ishlatiladigan CI/CD vositasidir.
3. **Savol:** Workflow nima va u qayerda saqlanadi?
   * **Javob:** Loyihaning avtomatlashtirilgan jarayoni bo'lib, u \\\`.github/workflows/\\\` papkasi ichida YAML formatida saqlanadi.
4. **Savol:** Workflow qachon ishga tushadi?
   * **Javob:** Biz belgilagan hodisalar (triggers) sodir bo'lganda (masalan, main branch-ga push yoki pull request bo'lganda).

### Middle
5. **Savol:** GitHub Actions-da Runner nima?
   * **Javob:** Bizning workflow qadamlarimiz (steps) bajariladigan GitHub tomonidan taqdim etiladigan yoki shaxsiy virtual mashinadir (masalan, ubuntu-latest).
6. **Savol:** Job va Step o'rtasidagi farq nima?
   * **Javob:** Job (Ish) — bitta runner-da ishlaydigan mustaqil qadamlar to'plami. Steps (Qadamlar) esa ushbu Job ichida ketma-ket bajariladigan alohida buyruqlardir.
7. **Savol:** Nima uchun CI-da \\\`npm install\\\` o'rniga \\\`npm ci\\\` ishlatiladi?
   * **Javob:** \\\`npm ci\\\` lock-file bo'yicha qat'iy o'rnatadi, local package-lock.json ni o'zgartirmaydi va local node_modules-ni o'chirib qayta o'rnatgani uchun toza o'rnatishni kafolatlaydi.
8. **Savol:** GitHub Secrets nima va u qanday xavfsizlik beradi?
   * **Javob:** Parollar va maxfiy kalitlarni GitHub-da shifrlangan holda saqlash tizimi. Ular workflow loglarida ham yashiriladi (masalan, logda *** bo'lib ko'rinadi).

### Senior
9. **Savol:** Self-hosted runner nima va u qachon ishlatiladi?
   * **Javob:** GitHub runner-lari o'rniga tashkilotning shaxsiy serverlarida o'rnatilgan runnerdir. U katta loyihalarni tekin build qilish yoki xavfsiz ichki tarmoqlar (Intranet) bilan ishlashda kerak bo'ladi.
10. **Savol:** Bir nechta Job-larni parallel yoki ketma-ket bajarish qanday sozlanadi?
    * **Javob:** Sukut bo'yicha Job-lar parallel ishlaydi. Ularni ketma-ket qilish uchun \\\`needs\\\` xossasidan foydalaniladi (masalan: deploy ishi test ishini kutishi shart).
11. **Savol:** Matrix build nima?
    * **Javob:** Loyihani bir vaqtning o'zida bir nechta muhitda (masalan, Node.js ning 16, 18, 20 versiyalarida va Windows/Linux OS-larida) parallel testlash imkoniyatidir.
12. **Savol:** Workflow-ni tezlashtirish uchun qanday optimallashtirish usullari mavjud?
    * **Javob:** Node.js paketlari uchun kesh (cache: 'npm') ishlatish, multi-stage Docker build, parallel ishlarni (parallel jobs) to'g'ri taqsimlash va faqat o'zgargan fayllar bo'yicha trigger qilish (paths filtering).
`,
  exercises: [
    {
      id: 1,
      title: "Workflow push trigger yozish",
      instruction: "GitHub actions workflow yozayotganda, loyiha faqat `main` branch-ga push qilinganda ishga tushishi uchun YAML trigger qismini to'ldiring.",
      startingCode: "# YAML trigger qismini to'ldiring\non:\n  push:\n    # Faqat main branch uchun yozing\n",
      hint: "branches: [ main ]",
      test: "if (!code.includes('branches:')) return 'branches kalit so\\'zini yozing';\nif (!code.includes('main')) return 'main branch nomini ko\\'rsating';"
    },
    {
      id: 2,
      title: "Step actions checkout ishlatish",
      instruction: "Kodni runner-ga yuklab olish uchun ishlatiladigan rasmiy checkout action-ning checkout@v4 versiyasidan foydalanish buyrug'ini (uses) yozing.",
      startingCode: "- name: Checkout repository\n  # checkout v4 ishlating\n",
      hint: "uses: actions/checkout@v4",
      test: "if (!code.includes('uses:')) return 'uses kalit so\\'zini ishlating';\nif (!code.includes('actions/checkout@v4')) return 'actions/checkout@v4 nomini to\\'g\\'ri yozing';"
    },
    {
      id: 3,
      title: "GitHub Secrets bilan ishlash",
      instruction: "GitHub Actions workflow-da `MY_TOKEN` nomli maxfiy kalitni GitHub Secrets-dan dinamik o'qib olish sintaksisini yozing (env qiymati sifatida).",
      startingCode: "const secretSyntax = '';\n",
      hint: "const secretSyntax = '${{ secrets.MY_TOKEN }}';",
      test: "if (!code.includes('secrets.MY_TOKEN')) return 'secrets.MY_TOKEN ni chaqiring';\nif (!code.includes('${{')) return 'Secrets o\\'qish uchun ${{ }} sintaksisidan foydalaning';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "CI/CD-dagi CI (Continuous Integration) atamasi nimani anglatadi?",
      options: [
        "Loyiha xavfsizligini ta'minlash",
        "Kod o'zgarishlarini avtomatik testlash va markaziy tarmoqqa birlashtirib borish",
        "Kodni to'g'ridan-to'g'ri foydalanuvchiga etkazish",
        "Faqat dizaynni avtomatlashtirish"
      ],
      correctAnswer: 1,
      explanation: "CI (Continuous Integration) loyihaga qo'shilgan yangi kodlarni avtomatlashtirilgan tarzda tekshirish va integratsiya qilishdir."
    },
    {
      id: 2,
      question: "GitHub Actions workflow konfiguratsiya fayllari qaysi formatda yoziladi?",
      options: [
        "JSON",
        "YAML (.yml yoki .yaml)",
        "XML",
        "TypeScript"
      ],
      correctAnswer: 1,
      explanation: "GitHub Actions workflow fayllari YAML (Yet Another Markup Language) formatida yoziladi."
    },
    {
      id: 3,
      question: "Workflow fayllari loyihaning qaysi katalogida saqlanishi kerak?",
      options: [
        "workflows/",
        ".github/workflows/",
        "config/workflows/",
        "src/workflows/"
      ],
      correctAnswer: 1,
      explanation: "GitHub Actions faqat .github/workflows/ papkasidagi YAML konfiguratsiyalarni taniydi va ishga tushiradi."
    },
    {
      id: 4,
      question: "GitHub Actions-da Runner nima?",
      options: [
        "Workflow bajariladigan shaxsiy yoki GitHub tomonidan beriladigan virtual mashina (server)",
        "Kodni tezlashtiruvchi brauzer plagini",
        "Git buyruqlar to'plami",
        "Node.js dasturi"
      ],
      correctAnswer: 0,
      explanation: "Runner — bu workflow ichidagi buyruqlar va testlarni bajaradigan operatsion tizim (VM)."
    },
    {
      id: 5,
      question: "Nima uchun workflow-da npm install o'rniga npm ci ishlatish tavsiya etiladi?",
      options: [
        "U package-lock.json ga to'liq mos clean install qiladi va barqarorlikni ta'minlaydi",
        "U faqat local kompyuterda ishlaydi",
        "U internet talab qilmaydi",
        "U barcha fayllarni o'chirib yuboradi"
      ],
      correctAnswer: 0,
      explanation: "npm ci (clean install) package-lock.json o'zgartirmasdan, uning asosida aynan bir xil bog'liqliklarni tezkor o'rnatadi."
    },
    {
      id: 6,
      question: "GitHub Secrets nima vazifani bajaradi?",
      options: [
        "Kod omborini (repository) yashirin qiladi",
        "Maxfiy kalitlar va parollarni shifrlangan holda xavfsiz saqlaydi",
        "Faqat rasmlarni saqlaydi",
        "Loyiha sahifasini blocklaydi"
      ],
      correctAnswer: 1,
      explanation: "GitHub Secrets API kalitlar va maxfiy ma'lumotlarni workflow ichida xavfsiz ishlatish uchun shifrlangan ombordir."
    },
    {
      id: 7,
      question: "Bir nechta Job-lar o'rtasida bog'liqlik yaratish (ya'ni biri tugab keyin ikkinchisi boshlanishi) uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "needs",
        "depends",
        "after",
        "wait"
      ],
      correctAnswer: 0,
      explanation: "needs kalit so'zi Job-larning ketma-ketligini belgilaydi (masalan: deploy ishi build ishiga muhtoj: needs: build)."
    },
    {
      id: 8,
      question: "Matrix build nima?",
      options: [
        "Kodni CSS grid layout yordamida yig'ish",
        "Loyihani bir vaqtning o'zida har xil Node.js versiyalari yoki tizimlarida parallel testlash",
        "Faqat 3D loyihalar uchun yig'ish tizimi",
        "GitHub sahifasini o'zgartirish"
      ],
      correctAnswer: 1,
      explanation: "Matrix ko'p o'lchamli test muhitlarini yaratib, bir necha Node va OS variantlarida kodni testlashga imkon beradi."
    },
    {
      id: 9,
      question: "Self-hosted runner-ning GitHub runner-lardan farqi nimada?",
      options: [
        "U pullik",
        "U bizning shaxsiy server yoki kompyuterimizda o'rnatiladi va ishlaydi",
        "U faqat docker bilan ishlaydi",
        "U faqat testlarni o'chiradi"
      ],
      correctAnswer: 1,
      explanation: "Self-hosted runner tashkilotning o'z shaxsiy serverlarida o'rnatilgan runner bo'lib, xarajatlar va xavfsizlik uchun qulaydir."
    },
    {
      id: 10,
      question: "GitHub Secrets o'zgaruvchisi workflow YAML faylida qanday chaqiriladi?",
      options: [
        "${{ secrets.MY_SECRET }}",
        "process.env.MY_SECRET",
        "$MY_SECRET",
        "{{ secrets.MY_SECRET }}"
      ],
      correctAnswer: 0,
      explanation: "GitHub Actions secrets chaqirish sintaksisi ${{ secrets.SECRET_NAME }} ko'rinishidadir."
    },
    {
      id: 11,
      question: "Continuous Deployment (CD) atamasi nimani anglatadi?",
      options: [
        "Kodni faqat local kompyuterda sinash",
        "Muvaffaqiyatli testlardan o'tgan kodni avtomatik tarzda jonli serverga yuklash (deploy)",
        "Foydalanuvchilarga email yuborish",
        "Litsenziya sotib olish"
      ],
      correctAnswer: 1,
      explanation: "CD (Continuous Deployment) butun pipeline testlaridan o'tgan yangilanishlarni avtomat tarzda foydalanuvchiga taqdim etish (production-ga deploy) jarayonidir."
    },
    {
      id: 12,
      question: "Workflow tezligi va kompilyatsiyani optimallashtirish uchun setup-node action-da qaysi xususiyat ishlatiladi?",
      options: [
        "cache: 'npm'",
        "speed: 'high'",
        "optimize: true",
        "install: 'fast'"
      ],
      correctAnswer: 0,
      explanation: "cache: 'npm' o'rnatilgan node paketlarini keshlab olib, keyingi build jarayonida qayta yuklash vaqtini sezilarli qisqartiradi."
    }
  ]
};
