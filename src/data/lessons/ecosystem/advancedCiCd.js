export const advancedCiCd = {
  id: "advancedCiCd",
  title: "Mukammal CI/CD va Avtomatlashtirilgan Deploy",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Continuous Deployment (CD) nima?
CI/CD darsimizning birinchi qismida biz CI (Continuous Integration - avtomatik testlash va integratsiya) haqida gaplashgan edik. **Continuous Deployment (CD - Uzluksiz joylashtirish)** esa pipeline-ning yakuniy bosqichidir. Bu bosqichda testlardan muvaffaqiyatli o'tgan kod avtomatik ravishda, inson aralashuvisiz jonli serverga (production) yuboriladi.

**Continuous Delivery va Continuous Deployment farqi:**
* **Continuous Delivery (Uzluksiz yetkazib berish):** Har bir o'zgarish avtomat sinovdan o'tadi va serverga yuklashga tayyor holga keltiriladi. Ammo deploy qilish uchun kimdir (masalan, Tech Lead) "Deploy" tugmasini qo'lda bosishi kerak.
* **Continuous Deployment (Uzluksiz joylashtirish):** Hech qanday qo'lda tasdiqlash yo'q. Kod yozildi -> Push qilindi -> Testlardan o'tdi -> Avtomatik ravishda foydalanuvchiga yetib bordi.

### Deployment Turlari va Platformalar
1. **PaaS (Platform as a Service - Vercel, Netlify):** Bu eng sodda usul. Serverni sozlash, Nginx o'rnatish, SSL olish bilan bosh og'ritmaysiz. Vercel kabi platformalar Git reposiga ulanadi va har push bo'lganda saytni o'zi build qilib beradi.
2. **VPS (Virtual Private Server - DigitalOcean, Hetzner):** O'zingiz xohlagan operatsion tizimli toza server sotib olasiz. Unda Node.js, Nginx, PM2, ma'lumotlar bazalarini o'zingiz o'rnatib sozlaysiz. Deploy qilish uchun SSH kalitlar orqali serverga ulanib, buyruqlarni avtomat bajarish kerak bo'ladi.
3. **Docker Registry va Konteynerlar:** Dasturni Docker image qilib o'raysiz va uni Docker Hub yoki AWS ECR kabi omborga (Registry) yuklaysiz (Push). Server esa yangi tasvirni tortib olib (Pull) konteynerni qayta ishga tushiradi.
4. **AWS (Amazon Web Services) deployment asoslari:** Dunyodagi eng katta bulutli platforma. Unda statik fayllarni **S3** (oddiy fayl ombori) da saqlab, **CloudFront** (CDN - fayllarni foydalanuvchiga yaqin joyga yetkazib beruvchi kesh serverlari) orqali hosting qilish juda mashhur usuldir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **pishiriqlar do'konining** egasisiz:
* **CI (Sifat nazorati):** Har bir tayyorlangan pishiriq do'konga chiqishidan oldin maxsus tekshiruvchi tomonidan tatib ko'riladi, shakli va tozaligi tekshiriladi.
* **Continuous Delivery:** Tekshiruvdan o'tgan pishiriqlar maxsus qutilarga joylanib, peshtaxtaga olib chiqish uchun tayyorlab qo'yiladi. Siz ruxsat berishingiz bilan ular sotuvga chiqadi.
* **Continuous Deployment:** Tekshiruvchi pishiriqni ma'qullashi bilanoq, konveyer lentasi uni to'g'ridan-to'g'ri mijozning stoliga avtomatik yetkazib beradi (hech qanday qo'shimcha tasdiqsiz).
* **Vercel (Tayyor bufet):** Siz shunchaki shirinlik retseptini berasiz, u o'zi pishirib, chiroyli idishga solib tarqatadi.
* **VPS (O'z shaxsiy oshxonangiz):** Gaz plitasi, idish-tovoq, pichoq va masalliqlargacha hammasini o'zingiz sotib olasiz, tozalaysiz va pishirasiz. Bu murakkabroq, lekin oshxona to'liq sizning nazoratingizda bo'ladi.

---

## 2. 💻 Real Kod Misollari

### 1. VPS-ga SSH kalitlari yordamida deploy qilish (\`.github/workflows/deploy.yml\`)
Quyidagi workflow kodni \`main\` branch-ga push qilinganda VPS serverga ulanadi, loyihani \`git pull\` qiladi va PM2 orqali ilovani qayta ishga tushiradi:

\`\`\`yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      # SSH-agent yordamida GitHub runner-ga maxfiy kalitni o'rnatish
      - name: Setup SSH agent
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: \${{ secrets.VPS_SSH_KEY }}

      # VPS serveriga SSH orqali ulanib buyruqlarni bajarish
      - name: Execute deploy commands on VPS
        run: |
          ssh -o StrictHostKeyChecking=no \${{ secrets.VPS_USER }}@\${{ secrets.VPS_HOST }} << 'EOF'
            cd /var/www/my-node-app
            git pull origin main
            npm ci --production
            pm2 reload ecosystem.config.js --env production
          EOF
\`\`\`

### 2. Docker Image build qilish va Registry-ga push qilish (\`.github/workflows/docker-deploy.yml\`)
Ushbu workflow ilovamizni Docker image holatiga keltirib, uni Docker Hub registry-ga yuklaydi:

\`\`\`yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  docker-build-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      # Docker Hub-ga login qilish
      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}

      # Docker buildx (keshlash va build tizimi) o'rnatish
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # Image yaratish va uni Docker Hub-ga push qilish
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ secrets.DOCKER_USERNAME }}/my-node-app:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

### 3. Vercel platformasiga GitHub Actions orqali deploy qilish (\`.github/workflows/vercel-deploy.yml\`)
Vercel o'zining avtomatik integratsiyasiga ega bo'lsa ham, ba'zan deploy qilishdan oldin testlarni to'liq tekshirish uchun GitHub Actions-dan foydalanish talab etiladi:

\`\`\`yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy-vercel:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel

      - name: Pull Vercel Project Info
        run: vercel pull --yes --environment=production --token=\${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=\${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy Project to Vercel
        run: vercel deploy --prebuilt --prod --token=\${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. SSH Kalitlari yordamida Avtorizatsiya Qanday Ishlaydi?
SSH (Secure Shell) orqali ulanish shifrlangan kriptografiya asosida ishlaydi. U ikkita kalitdan iborat:
* **Private Key (Yopiq kalit):** Sizning GitHub Actions runner-ingizda (shifrlangan holda \`secrets.VPS_SSH_KEY\` ichida) saqlanadi. U sizning pasportingiz yoki shaxsiy imzongiz hisoblanadi.
* **Public Key (Ochiq kalit):** VPS serverdagi \`~/.ssh/authorized_keys\` faylida saqlanadi. U sizni tanib olish uchun ishlatiladigan rasm/andozadir.

Ulanish jarayoni:
1. GitHub Actions runner serverga SSH orqali ulanishni so'raydi.
2. Server runner-ga tasodifiy xabar (challenge) yuboradi.
3. Runner ushbu xabarni o'zining yopiq kaliti (Private Key) bilan shifrlaydi va serverga qaytaradi.
4. Server uning ochiq kaliti (Public Key) bilan ushbu shifrlangan xabarni ochib tekshiradi. Agar mos kelsa, ulanishga ruxsat beradi.

### 2. CI/CD workflow to VPS (Oqim Diagrammasi)

Quyidagi diagrammada GitHub-dan VPS-gacha bo'lgan to'liq deployment zanjiri ko'rsatilgan:

\`\`\`mermaid
graph TD
    Developer["Git Commit & Push"] -->|1. Trigger| GitHub["GitHub Repository"]
    GitHub -->|2. Start workflow| Runner["GitHub Actions Runner"]
    Runner -->|3. Load Private Key| SSHAgent["SSH Agent Started"]
    SSHAgent -->|4. Test & Build app| LocalBuild["Build Success"]
    LocalBuild -->|5. Connect via SSH| VPS["VPS Server (Ubuntu)"]
    VPS -->|6. Run commands| PullCode["git pull && npm ci"]
    PullCode -->|7. Restart process| PM2["PM2 Reload App"]
    PM2 -->|8. Health check| LiveApp["App is Live & Updated!"]
\`\`\`

### 3. AWS S3 va CloudFront orqali deploy qilish
Statik veb-saytlar (React, Vue, HTML/JS) serverga muhtoj emas. AWS-da u quyidagicha ishlaydi:
1. Dastur kodini local ravishda \`npm run build\` qilib olamiz.
2. Hosil bo'lgan \`dist/\` yoki \`build/\` papkasini AWS S3 chelagiga (bucket) yuklaymiz.
3. AWS CloudFront butun dunyo bo'ylab joylashgan Edge serverlarda saytimizni keshlab tarqatadi.
4. Foydalanuvchilar veb-saytingizga kirganda, so'rov markaziy serverga bormaydi, balki ularga eng yaqin joylashgan CDN nuqtasidan darhol yuklab olinadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. SSH Private Key kalitini GitHub-da ochiq saqlash (Hardcoding)
Junior dasturchilar ko'pincha SSH kalitlarini to'g'ridan-to'g'ri yaml fayli ichida matn ko'rinishida yozib qo'yishadi. Bu butun serveringizni buzib kirishlari uchun eshik ochib berish demakdir.
* **Tuzatish:** Kalitlarni doimo GitHub Repository sozlamalaridan Secrets bo'limiga qo'shing va \`\${{ secrets.MY_KEY }}\` ko'rinishida ishlating.

### 2. Docker image ichida \`.env\` yoki maxfiy fayllarni saqlash
Docker image build qilinayotganda \`COPY .env .env\` qilish. Docker image docker-hub-ga yuklanganda (hatto u private repo bo'lsa ham), image-ni pull qilib olgan har qanday odam uning tarixidan (layers) parollarni topib olishi mumkin.
* **Tuzatish:** \`.env\` faylini docker image-ga yozmang. Buning o'rniga, konteynerni VPS serverida ishga tushirayotgan vaqtda (runtime) environment o'zgaruvchilarini argument sifatida bering yoki docker-compose orqali yuklang.

### 3. VPS-da eski Node jarayonlarini o'chirmasdan qayta ishga tushirish (Zombie Processes)
Serverda yangi kodni deploy qilib \`node server.js\` ni shunchaki fonda ishga tushiraverish. Natijada server xotirasi to'lib, eski va yangi jarayonlar bir-biri bilan to'qnashib, portni band qiladi.
* **Tuzatish:** Serverda ilovalarni boshqarish uchun **PM2** dan foydalaning. PM2 eski jarayonni o'chirib, yangisini osonlik bilan o'rnatadi (\`pm2 reload app-name\`).

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Continuous Deployment (CD) nima?
   * **Javob:** Testlardan muvaffaqiyatli o'tgan kodni avtomatik ravishda, inson aralashuvisiz serverga deploy qilish jarayonidir.
2. **Savol:** PaaS va VPS-ning asosiy farqi nimada?
   * **Javob:** PaaS-da (masalan, Vercel) serverni sozlash avtomatik bo'ladi, server operatsion tizimi bilan ishlash shart emas. VPS-da esa server to'liq dasturchi nazoratida bo'ladi va barcha dasturlarni (Node, Nginx va hkz) o'zi o'rnatishi kerak.
3. **Savol:** Serverga ulanishda SSH kalitlari qanday nomlanadi va qayerda saqlanadi?
   * **Javob:** Public key (ochiq kalit) serverda (\`authorized_keys\` faylida) va Private key (yopiq kalit) ulanuvchining shaxsiy kompyuterida (yoki CI/CD platformasining secrets bo'limida) saqlanadi.
4. **Savol:** VPS-da Node.js ilovalari uchun PM2 nima uchun kerak?
   * **Javob:** PM2 ilovani fonda (background) uzluksiz ishlatish, xatolik sodir bo'lganda uni qayta ishga tushirish va server restart bo'lganda dasturni avtomatik yoqish uchun xizmat qiladi.

### Middle
5. **Savol:** Docker Registry nima?
   * **Javob:** Tayyor Docker imagelarini saqlash va tarqatish omboridir. Masalan, Docker Hub yoki AWS ECR (Elastic Container Registry).
6. **Savol:** Docker build caching (keshlash) qanday ishlaydi va uni GitHub Actions-da qanday yoqish mumkin?
   * **Javob:** Docker har bir Dockerfile buyrug'ini qatlam (layer) sifatida keshlaydi. GitHub Actions-da \`cache-from: type=gha\` va \`cache-to: type=gha\` parametrlarini docker/build-push-action bilan ishlatsangiz, kesh keyingi runs-lar uchun saqlab qolinadi.
7. **Savol:** AWS S3 va CloudFront yordamida statik sayt qanday deploy qilinadi?
   * **Javob:** HTML/JS kodlari S3 bucket-ga yuklanadi. CloudFront esa ushbu fayllarni keshlab, butun dunyo bo'ylab tezkor yetkazib berish (CDN) vazifasini bajaradi.
8. **Savol:** AWS CloudFront keshini qanday yangilaymiz (Invalidation)?
   * **Javob:** Yangi kod yuklanganda CloudFront CDN-dagi kesh bekor qilinishi shart. Buning uchun AWS CLI orqali \`aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"\` buyrug'i yoziladi.

### Senior
9. **Savol:** Zero Downtime Deployment (uzilishlarsiz deploy) VPS-da qanday amalga oshiriladi?
   * **Javob:** PM2 yordamida ilovani \`cluster\` rejimida ishga tushirib, \`pm2 reload\` buyrug'i orqali jarayonlarni navbatma-navbat yangilash orqali yoki Nginx Load Balancer va ikkita portda ishlovchi ilovalarni almashtirish (Blue-Green) orqali amalga oshiriladi.
10. **Savol:** Docker orqali deploy qilganda environment sirlarini (secrets) qanday boshqarish kerak?
    - **Javob:** Build jarayonida maxfiy kalitlarni image-ga yozmasdan, run-time-da Docker Compose environment bo'limi orqali, Docker Secrets yoki Kubernetes-da ConfigMaps/Secrets yordamida uzatiladi.
11. **Savol:** Blue-Green Deployment nima va uning afzalligi nimada?
    - **Javob:** Ikkita bir xil server muhiti (Blue - eski versiya, Green - yangi versiya) ishlatiladi. Yangi versiya yuklanganda, barcha foydalanuvchilar oqimi marshrutizator (Nginx yoki Router) orqali bir lahzada Green-ga o'tkaziladi. Agar xatolik chiqsa, darhol Blue-ga qaytish (rollback) mumkin.
12. **Savol:** GitHub Actions deploy pipeline-ni qanday xavfsizlashtirasiz?
    - **Javob:** Eng kam imtiyozlar qoidasiga (Least Privilege Principle) amal qilish; server uchun cheklangan huquqli alohida deployer foydalanuvchisi ochish; AWS uchun vaqtinchalik kirish kalitlarini beruvchi OIDC (OpenID Connect) dan foydalanish.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar \`/Users/farhod/Desktop/github/js-uz/scratch/advancedCiCd_exercises.json\` faylida berilgan. Loyihangizda faqat \`main\` tarmoqqa push bo'lganda ishlovchi trigger, SSH agent va Docker registry login amallarini sozlashingiz so'raladi.

---

## 7. 📝 12 ta Mini Test

Test savollari \`/Users/farhod/Desktop/github/js-uz/scratch/advancedCiCd_quizzes.json\` faylida joylashgan. Unda siz Continuous Deployment asoslari, SSH ulanishlari, AWS S3/CloudFront va Docker Hub integration haqidagi bilimlaringizni tekshirib olishingiz mumkin.

---

## 8. 🎯 Real Project Case Study

### Node.js va Nginx o'rnatilgan VPS-ga to'liq avtomatik deploy loyihasi

Tasavvur qiling, bizda Node.js backend ilovasi bor va biz uni o'z shaxsiy VPS serverimizda ishga tushirmoqchimiz. Bizga quyidagi vazifalarni avtomatik bajaradigan pipeline kerak:
1. Serverga SSH ulanish.
2. Loyihaning oxirgi kodlarini GitHub-dan tortib olish.
3. Yangi kutubxonalarni o'rnatish (\`npm ci\`).
4. Kodni build qilish.
5. PM2 jarayonini uzilishlarsiz qayta yuklash (\`pm2 reload\`).

### To'liq pipeline konfiguratsiyasi (\`.github/workflows/production-deploy.yml\`):

\`\`\`yaml
name: Production CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  deploy-to-prod:
    name: Deploy Application to VPS
    runs-on: ubuntu-latest

    steps:
      # 1-Qadam: Kodni yuklab olish
      - name: Checkout Source Code
        uses: actions/checkout@v4

      # 2-Qadam: SSH-Agentni yuklash va maxfiy kalitni berish
      - name: Install SSH Key
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: \${{ secrets.VPS_SSH_PRIVATE_KEY }}

      # 3-Qadam: VPS-ga SSH orqali ulanib skriptlarni bajarish
      - name: Run Deploy Script via SSH
        run: |
          ssh -o StrictHostKeyChecking=no \${{ secrets.VPS_USERNAME }}@\${{ secrets.VPS_SERVER_IP }} << 'EOF'
            echo "--- Deployment boshlandi ---"
            
            # Loyiha papkasiga kirish
            cd /var/www/my-awesome-api
            
            # Git-dan o'zgarishlarni yuklash
            git checkout main
            git pull origin main
            
            # Toza o'rnatish
            echo "Kutubxonalar yangilanmoqda..."
            npm ci --production
            
            # Foydalanuvchi interfeysi yoki backend build
            echo "Loyiha yig'ilmoqda..."
            npm run build --if-present
            
            # PM2 orqali uzilishlarsiz qayta ishga tushirish
            echo "PM2 yangilanmoqda..."
            pm2 reload ecosystem.config.js || pm2 start dist/main.js --name "awesome-api"
            
            echo "--- Deployment muvaffaqiyatli yakunlandi! ---"
          EOF
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Docker Layer Caching:** Docker imagelarini yaratishda \`cache-from\` va \`cache-to\` parametrlaridan foydalanib build tezligini 10 daqiqadan 1 daqiqagacha qisqartiring.
* **Production Dependencies:** VPS-da kutubxonalarni o'rnatayotganda \`npm ci --production\` ishlating. Bu sizga devDependencies (linterlar, test frameworklari kabi keraksiz kutubxonalar)ni yuklamaslik orqali vaqtni va server xotirasini tejashga yordam beradi.
* **AWS CloudFront Cache Policy:** AWS deploylarida faqat o'zgargan static fayllarni S3-ga sinxronlash uchun \`aws s3 sync build/ s3://my-bucket --delete\` buyrug'idan foydalaning. Bu barcha fayllarni qayta yuklashning oldini oladi.

---

## 10. 📌 Cheat Sheet

| Platforma / Usul | Afzalligi | Kamchiligi | Asosiy Vositalar |
| :--- | :--- | :--- | :--- |
| **Vercel / Netlify** | Zero-config, juda tez sozlanadi, bepul HTTPS. | Backend sozlamalar cheklangan, narxi kattalashganda qimmat. | Git integration, Vercel CLI |
| **VPS (Ubuntu Server)** | To'liq erkinlik, arzon xizmatlar, istalgan ma'lumotlar bazasini o'rnatish. | Xavfsizlik, yangilanishlar va sozlashlarni o'zingiz qilishingiz shart. | SSH keys, PM2, Nginx |
| **Docker Registry** | Istalgan serverda (AWS, VPS) bir xil ishga tushish kafolati. | Image build va push vaqti ko'proq ketadi. | Dockerfile, Docker Hub, Actions |
| **AWS S3 + CDN** | Yuqori yuklamalarga chidamlilik (scalability), tejamkor. | Faqat statik frontend loyihalar uchun mos. | AWS CLI, S3 bucket, CloudFront |
`,
  exercises: [
  {
    "id": 1,
    "title": "VPS Deploy uchun Branch Triggerini Sozlash",
    "instruction": "GitHub Actions workflow loyihasi faqat `main` tarmog'iga push qilinganda va faqat `src/**` papkasidagi fayllar o'zgarganda ishga tushishi uchun `on` triggerini yozing.",
    "startingCode": "on:\n  push:\n    # Faqat main tarmoq va src/ papkasidagi o'zgarishlar uchun trigger yozing\n",
    "hint": "push kaliti ostida branches: [ main ] va paths: [ 'src/**' ] yozilishi kerak.",
    "test": "if (!code.includes('branches:')) return 'branches kalit so\\'zini yozing';\nif (!code.includes('main')) return 'main branchini belgilang';\nif (!code.includes('paths:')) return 'paths kalit so\\'zini kiriting';\nif (!code.includes('src/**')) return 'src/** yo\\'lini to\\'g\\'ri ko\\'rsating';"
  },
  {
    "id": 2,
    "title": "SSH Agent yordamida Kalitlarni Yuklash",
    "instruction": "GitHub workflow ishida `webfactory/ssh-agent@v0.9.0` action-idan foydalanib, secrets ichidagi `VPS_SSH_KEY` maxfiy kalitini yuklash qadamini yozing.",
    "startingCode": "- name: Install SSH Key\n  # webfactory ssh-agent action-dan foydalanib VPS_SSH_KEY ni yuklang\n",
    "hint": "uses: webfactory/ssh-agent@v0.9.0 va with: ssh-private-key: ${{ secrets.VPS_SSH_KEY }} ishlatiladi.",
    "test": "if (!code.includes('uses: webfactory/ssh-agent')) return 'webfactory ssh-agent action-ini ishlating';\nif (!code.includes('secrets.VPS_SSH_KEY')) return 'secrets.VPS_SSH_KEY ni with/ssh-private-key orqali bering';"
  },
  {
    "id": 3,
    "title": "Docker Hub Registry-ga Avtorizatsiya",
    "instruction": "Docker login-action-dan (`docker/login-action@v3`) foydalanib, secrets-dagi `DOCKER_USERNAME` va `DOCKER_PASSWORD` orqali Docker Hub-ga login qilish step-ini yozing.",
    "startingCode": "- name: Login to Docker Hub\n  # docker login action yordamida secrets-dagi username va password bilan login qiling\n",
    "hint": "uses: docker/login-action@v3 bo'limi ostida username va password parametrlarini secrets orqali bering.",
    "test": "if (!code.includes('docker/login-action')) return 'docker/login-action action-idan foydalaning';\nif (!code.includes('secrets.DOCKER_USERNAME') || !code.includes('secrets.DOCKER_PASSWORD')) return 'Foydalanuvchi nomi va parolini secrets-dan o\\'qing';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Continuous Deployment (CD) va Continuous Delivery o'rtasidagi asosiy farq nima?",
    "options": [
      "Continuous Deployment-da kod testlardan o'tgach avtomatik ravishda jonli serverga (production) joylanadi; Delivery-da esa deploy qilish uchun inson tasdig'i (manual trigger) talab etiladi",
      "Continuous Delivery faqat mobil ilovalar uchun, Deployment esa faqat veb-saytlar uchun ishlatiladi",
      "Continuous Deployment faqat local serverlarda ishlaydi",
      "Hech qanday farqi yo'q, ikkalasi bir xil narsani anglatadi"
    ],
    "correctAnswer": 0,
    "explanation": "Continuous Delivery kodni istalgan vaqtda deploy qilishga tayyor holatda saqlaydi, lekin deploy qo'lda tasdiqlanadi. Continuous Deployment esa butun jarayonni to'liq avtomatlashtiradi."
  },
  {
    "id": 2,
    "question": "Vercel platformasi asosan qaysi turdagi ilovalar uchun eng qulay hosting hisoblanadi?",
    "options": [
      "Katta hajmdagi Java va C++ backend tizimlari",
      "Frontend (React, Next.js, Vue) va serverless funksiyalar",
      "Faqat relational ma'lumotlar bazalari",
      "Faqat Docker konteynerlar"
    ],
    "correctAnswer": 1,
    "explanation": "Vercel asosan Jamstack, frontend frameworklar (Next.js kabi) va serverless arxitekturalar uchun eng mukammal va tezkor deployment platformasidir."
  },
  {
    "id": 3,
    "question": "SSH kalitlaridan foydalanib VPS serverga ulanishning parolli ulanishdan afzalligi nimada?",
    "options": [
      "Faqat tezkor yuklanishni ta'minlaydi",
      "Brute-force (parol tanlash) hujumlaridan himoya qiladi va CI/CD-da parolsiz avtomatlashtirish imkonini beradi",
      "Internet tezligini oshiradi",
      "Serverdagi fayllarni avtomatik siqib beradi"
    ],
    "correctAnswer": 1,
    "explanation": "SSH kalitlari parollarga qaraganda ancha uzun va murakkab bo'lib, brute-force hujumlarini imkonsiz qiladi. Shuningdek, CI/CD skriptlariga parolni yozmasdan ulanish imkonini beradi."
  },
  {
    "id": 4,
    "question": "SSH ulanishini sozlashda serverning `~/.ssh/authorized_keys` fayliga qaysi kalit joylashtiriladi?",
    "options": [
      "Public key (Ochiq kalit)",
      "Private key (Yopiq kalit)",
      "SSL sertifikati",
      "GitHub shaxsiy tokeni (PAT)"
    ],
    "correctAnswer": 0,
    "explanation": "Serverga har doim Public Key (ochiq kalit) joylanadi. Private Key (yopiq kalit) esa sizning kompyuteringizda yoki GitHub Secrets-da maxfiy saqlanadi."
  },
  {
    "id": 5,
    "question": "GitHub Actions workflow orqali VPS-ga ulanishda shaxsiy SSH kalitimiz (Private Key) qayerda saqlanishi kerak?",
    "options": [
      "Repository ichidagi ochiq `.env` faylida",
      "GitHub repository-ning 'Settings -> Secrets' bo'limida shifrlangan holda",
      "Dockerfile ichida COPY buyrug'i yordamida",
      "package.json ichidagi scriptlar bo'limida"
    ],
    "correctAnswer": 1,
    "explanation": "Maxfiy yopiq SSH kaliti hech qachon kod ichida ochiq yozilmasligi kerak. U xavfsiz tarzda GitHub Secrets-da saqlanadi."
  },
  {
    "id": 6,
    "question": "Docker Registry nima vazifani bajaradi?",
    "options": [
      "Kodni JavaScript-ga o'giruvchi transpayler",
      "Tayyor Docker image-larini saqlash va ularni serverlarga tarqatish ombori (masalan, Docker Hub)",
      "VPS serveridagi operatsion tizim turi",
      "Faqat loglarni saqlovchi server"
    ],
    "correctAnswer": 1,
    "explanation": "Docker Registry (masalan Docker Hub, AWS ECR, GitHub Packages) - bu Docker tasvirlarini (imagelarini) saqlash va ularni deploy qilish uchun yuklab olish omboridir."
  },
  {
    "id": 7,
    "question": "GitHub Actions workflow-da Docker image build qilish jarayonini tezlashtirish uchun qaysi usul qo'llaniladi?",
    "options": [
      "Har safar barcha qatlamlarni noldan qayta qurish",
      "Docker layer caching (qatlamli keshlash) va GitHub Actions cache backend-ni ishlatish",
      "Docker loglarini o'chirib tashlash",
      "Sinxron ishlarni asinxron qilish"
    ],
    "correctAnswer": 1,
    "explanation": "Docker layer caching yordamida o'zgarmagan Docker qatlamlari keshdan olinadi va bu build jarayonini 5-10 barobargacha tezlashtiradi."
  },
  {
    "id": 8,
    "question": "AWS S3 xizmati CI/CD jarayonida odatda nima uchun qo'llaniladi?",
    "options": [
      "Dastur ma'lumotlar bazasini saqlash uchun",
      "Statik frontend fayllarni (HTML, CSS, JS, rasmlar) saqlash va veb-sayt sifatida hosting qilish uchun",
      "Faqat Node.js serverlarini ishga tushirish uchun",
      "Virtual mashinalarni boshqarish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "AWS S3 (Simple Storage Service) - obyektli saqlash tizimi bo'lib, statik veb-saytlar hostingi va media fayllarni saqlash uchun juda mos keladi."
  },
  {
    "id": 9,
    "question": "AWS CloudFront CDN-dagi 'Cache Invalidation' nima degani?",
    "options": [
      "S3-dagi eski fayllarni to'liq o'chirib yuborish",
      "CDN keshidagi eski fayllarni bekor qilib, tarmoq tugunlarini yangi fayllarni yuklashga majburlash",
      "Saytni o'chirib qo'yish",
      "Foydalanuvchilarni blocklash"
    ],
    "correctAnswer": 1,
    "explanation": "CDN serverlari fayllarni keshda saqlaydi. Yangi versiya deploy bo'lganda, foydalanuvchilar eski versiyani ko'rib qolmasligi uchun keshni bekor qilish (Invalidation) buyrug'i beriladi."
  },
  {
    "id": 10,
    "question": "Nima uchun `.env` maxfiy faylini Docker image ichiga nusxalash (COPY .env) tavsiya etilmaydi?",
    "options": [
      "Chunki Docker image hajmi oshib ketadi",
      "Chunki Docker image tarkibidagi barcha maxfiy kalitlar image qatlamlarida ochiq holda qolib ketadi va tarqalganda o'g'irlanishi mumkin",
      "Bunday faylni Docker tanimaydi",
      "Bu fayl Node.js-ga zarar yetkazadi"
    ],
    "correctAnswer": 1,
    "explanation": "Docker imagelari tarqatiladigan obyektlardir. Ularning ichiga sirlarni yozish xavfsizlikka ziddir. Atrof-muhit o'zgaruvchilari (env) konteyner ishga tushayotgan vaqtda (runtime) berilishi kerak."
  },
  {
    "id": 11,
    "question": "GitHub Actions-da parallel ishlovchi Job-larni ketma-ket bajariladigan qilish uchun qaysi atribut ishlatiladi?",
    "options": [
      "depends_on",
      "needs",
      "requires",
      "after"
    ],
    "correctAnswer": 1,
    "explanation": "GitHub Actions-da `needs` kalit so'zi orqali bitta job-ni boshqasiga bog'lab, ketma-ketlikni ta'minlaymiz."
  },
  {
    "id": 12,
    "question": "VPS serverda Node.js dasturi to'xtab qolmasdan va server restart bo'lganda ham avtomatik ishlab ketishi uchun qaysi vosita ishlatiladi?",
    "options": [
      "nodemon",
      "PM2 (Process Manager 2)",
      "npm start",
      "node app.js"
    ],
    "correctAnswer": 1,
    "explanation": "PM2 - bu Node.js uchun mukammal jarayonlar boshqaruvchisi. U ilovani monitoring qiladi, xatolikda qayta ishga tushiradi va server yonganda ham avtomatik yoqilishini ta'minlaydi."
  }
]

};
