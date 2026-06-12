export const dockerBasics = {
  id: "dockerBasics",
  title: "Docker Asoslari (Konteynerlashtirish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Docker nima va u qaysi muammoni hal qiladi?
Dasturchilar orasida eng ko'p aytiladigan gaplardan biri: *\"Mening kompyuterimda ishlayotgan edi, nega serverda ishlamayapti?\"*. Bu muammo kompyuterlar va serverlardagi operatsion tizim, Node.js versiyalari yoki tizim kutubxonalarining turlicha bo'lishidan kelib chiqadi.

**Docker** — bu ilovangizni barcha bog'liqliklari (Node.js versiyasi, kutubxonalar, sozlamalar) bilan birga bitta yopiq qutiga — **Konteynerga (Container)** joylashtirib beruvchi texnologiyadir.
Bu xuddi **dengiz yuk tashish konteynerlariga** o'xshaydi: konteyner ichida nima borligidan qat'iy nazar (xoh mebel, xoh elektronika), u har qanday yuk kemasiga (xoh AWS, xoh shaxsiy server) bir xil joylashadi va muammosiz yetib boradi.

---

## 2. 💻 Real Kod Misollari

### 1. Node.js ilovasi uchun Dockerfile
**Dockerfile** — bu konteyner tasvirini (Image) yaratish uchun yo'riqnomalar to'plamidir.
\\\`\\\`\\\`dockerfile
# 1. Asosiy Node.js tasvirini tanlash
FROM node:20-alpine

# 2. Konteyner ichidagi ishchi papkani belgilash
WORKDIR /app

# 3. package.json fayllarini nusxalash
COPY package*.json ./

# 4. Bog'liqliklarni o'rnatish
RUN npm install

# 5. Loyihaning qolgan barcha kodlarini nusxalash
COPY . .

# 6. Portni ochish (faqat hujjatlashtirish uchun)
EXPOSE 5000

# 7. Ilovani ishga tushirish buyrug'i
CMD ["npm", "start"]
\\\`\\\`\\\`

### 2. .dockerignore fayli
Konteyner ichiga keraksiz fayllar (masalan local \\\`node_modules\\\` yoki \\\`.env\\\` maxfiy kalitlari) nusxalanib ketmasligi uchun \\\`.dockerignore\\\` fayli ishlatiladi:
\\\`\\\`\\\`text
node_modules
npm-debug.log
dist
.env
.git
\\\`\\\`\\\`

### 3. Docker Compose (Ko'p konteynerli tizim)
**Docker Compose** bir nechta bog'liq konteynerlarni (masalan, Node.js backend va MongoDB) bitta buyruq orqali bir vaqtda ishga tushirish uchun ishlatiladi:
\\\`\\\`\\\`yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://db:27017/my-db
    depends_on:
      - db

  db:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
\\\`\\\`\\\`

---

## 3. 🎨 Konteyner Ishlash Sxemasi (Mermaid diagrammasi)

Docker muhitida Image (Tasvir) va Container (Ishlayotgan nusxa) aloqasi:

\`\`\`mermaid
graph TD
    DF[Dockerfile - Retsept] -->|docker build| Image[Docker Image - Tayyor taom andozasi]
    Image -->|docker run| C1[Container 1 - Ishlayotgan backend]
    Image -->|docker run| C2[Container 2 - Ishlayotgan sinov nusxasi]
    subgraph Host OS (Server/PC)
        C1
        C2
    end
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Og'ir Docker Image yaratish (node:latest)
Standard \\\`node:latest\\\` tasviri 1GB dan ortiq joy olishi mumkin. Bu server xotirasini tez to'ldiradi va yuklanish vaqtini oshiradi.
* **Tuzatish:** Har doim yengil, xavfsiz va tez ishlaydigan \\\`node:20-alpine\\\` yoki \\\`node:20-slim\\\` tasvirlaridan foydalaning (ular taxminan 100-150MB joy oladi).

### 2. Package.json keshidan foydalanmaslik
Agar kod o'zgarganda docker har safar \\\`npm install\\\`ni qaytadan bajarsa, build juda uzoq vaqt oladi.
* **Tuzatish:** Dockerfile ichida \\\`COPY package*.json ./\\\` qilib, keyin \\\`RUN npm install\\\` yozish kerak, shundan so'ng \\\`COPY . .\\\` yoziladi. Shunda kod o'zgarganda npm cache-dan foydalanadi va kutubxonalarni qayta yuklamaydi.

---

## 5. 💬 12 ta Intervyu Savollari (Junior/Middle)

### Junior
1. **Savol:** Docker nima?
   * **Javob:** Ilovani va uning barcha muhit bog'liqliklarini yagona, portativ konteyner ichida izolyatsiya qilish imkonini beruvchi platformadir.
2. **Savol:** Docker Image va Docker Container farqi nimada?
   * **Javob:** Image (Tasvir) — bu faqat o'qiladigan, o'zgarmas andoza (Class kabi). Container — bu ushbu Image-ning xotiradagi ishlayotgan nusxasidir (Object kabi).
3. **Savol:** Dockerfile nima?
   * **Javob:** Docker Image-ni yaratish uchun ketma-ket bajariladigan buyruqlar yozilgan matnli fayldir.
4. **Savol:** \\\`.dockerignore\\\` fayli nima uchun kerak?
   * **Javob:** Konteyner ichiga nusxalanishi kerak bo'lmagan fayl va papkalarni (node_modules, .env va hk) belgilash uchun.

### Middle
5. **Savol:** Docker Volume nima va u nima uchun ishlatiladi?
   * **Javob:** Konteyner o'chib ketganda ham uning ichidagi ma'lumotlar (masalan bazadagi ma'lumotlar) yo'qolib ketmasligi uchun, ma'lumotlarni asosiy kompyuter (host) xotirasiga bog'lab saqlash usulidir.
6. **Savol:** Docker-da Port Mapping (Portlarni bog'lash) qanday amalga oshiriladi?
   * **Javob:** \\\`docker run -p 8080:5000 my-app\\\` ko'rinishida yoziladi. Bu yerda 8080 host porti, 5000 esa konteyner ichki portidir.
7. **Savol:** Docker Compose nima?
   * **Javob:** Bir nechta konteynerlardan iborat murakkab tizimlarni (masalan: app, db, redis) bitta \\\`docker-compose.yml\\\` fayli orqali oson boshqarish va ishga tushirish vositasidir.
8. **Savol:** Dockerfile-da \\\`RUN\\\` va \\\`CMD\\\` buyruqlari farqi nimada?
   * **Javob:** \\\`RUN\\\` tasvirni yig'ish (build time) vaqtida bajariladi va yangi qatlam yaratadi. \\\`CMD\\\` esa tayyor konteyner ishga tushayotganda (runtime) bajariladigan asosiy buyruqdir.

### Senior
9. **Savol:** Multi-stage build nima va u nima uchun kerak?
   * **Javob:** Image hajmini minimal qilish uchun build jarayonini bir necha bosqichga bo'lish (masalan, birinchi bosqichda kodni yig'ish/kompilyatsiya qilish, ikkinchi bosqichda faqat yig'ilgan fayllarni eng yengil production image-ga o'tkazish).
10. **Savol:** Docker konteyneri virtual mashinadan (VM) qanday farq qiladi?
    * **Javob:** Virtual mashina o'zining shaxsiy Guest OS (mehmon operatsion tizimi) va Hypervisor-iga ega bo'lib, og'ir ishlaydi. Konteynerlar esa asosiy tizim (Host OS) yadrosini (kernel) o'zaro baham ko'radi va ancha yengil hamda tez ishlaydi.
11. **Savol:** Docker Compose-dagi \\\`depends_on\\\` xossasi nima qiladi va uning kamchiligi nimada?
    * **Javob:** Xizmatlar ishga tushish ketma-ketligini belgilaydi (masalan bazadan keyin backend ishga tushsin). Kamchiligi — u faqat konteyner ishga tushganini tekshiradi, lekin baza ichida so'rovlarni qabul qilishga to'liq tayyor bo'lganini kutmaydi.
12. **Savol:** Konteyner xavfsizligini ta'minlash uchun qanday amaliyotlardan foydalaniladi?
    * **Javob:** Konteyner ichida root foydalanuvchi rejimidan qochish (non-root user), minimal alpine tasvirlarini ishlatish, maxfiy kalitlarni Docker Secrets orqali o'tkazish va uchinchi tomon paketlarini skanerlash.
`,
  exercises: [
    {
      id: 1,
      title: "Dockerfile buyrug'i",
      instruction: "Konteyner ichida `/usr/src/app` papkasini ishchi katalog (working directory) sifatida belgilovchi Dockerfile buyrug'ini yozing.",
      startingCode: "# Ishchi katalogni belgilang\n",
      hint: "WORKDIR /usr/src/app",
      test: "if (!code.includes('WORKDIR')) return 'WORKDIR buyrug\\'idan foydalaning';\nif (!code.includes('/usr/src/app')) return 'Katalog manzilini to\\'g\\'ri yozing';"
    },
    {
      id: 2,
      title: "Port mapping buyrug'i",
      instruction: "Konteynerning ichki `3000` portini tashqi hostning `80` portiga bog'lab ishga tushirish uchun yoziladigan docker run parametrini yozing (faqat port qismini).",
      startingCode: "const dockerPortFlag = '';\n",
      hint: "const dockerPortFlag = '-p 80:3000';",
      test: "if (!code.includes('-p')) return '-p bayrog\\'idan foydalaning';\nif (!code.includes('80:3000')) return 'Port bog\\'lanishini to\\'g\\'ri ko\\'rsating (tashqi:ichki)';"
    },
    {
      id: 3,
      title: "Docker Compose bog'liqlik",
      instruction: "Docker compose-da xizmat boshqa bir xizmatga (masalan `db`ga) bog'liqligini ko'rsatish uchun yoziladigan yaml xossasini string formatida ko'rsating.",
      startingCode: "const dependencyKey = '';\n",
      hint: "const dependencyKey = 'depends_on';",
      test: "if (!code.includes('depends_on')) return 'depends_on kalit so\\'zini yozing';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Docker-da Image nima?",
      options: [
        "Faqat o'qiladigan, o'zgarmas konteyner andozasi",
        "Konteyner ichidagi rasmlar papkasi",
        "Virtual mashinaning operatsion tizimi",
        "Veb-ilovaning foydalanuvchi interfeysi"
      ],
      correctAnswer: 0,
      explanation: "Image — bu o'zgarmas, faqat o'qish uchun mo'ljallangan va konteyner yaratishda ishlatiladigan andozadir."
    },
    {
      id: 2,
      question: "Kompilyatsiya qilingan yoki ishlayotgan Docker Image nusxasi nima deb ataladi?",
      options: [
        "Dockerfile",
        "Docker Container",
        "Docker Compose",
        "Docker Volume"
      ],
      correctAnswer: 1,
      explanation: "Image-dan yaratilgan va xotirada ishlayotgan faol jarayon Docker Container deb ataladi."
    },
    {
      id: 3,
      question: "Dockerfile-da konteyner ishga tushayotganda bajariladigan asosiy buyruq qaysi kalit so'z bilan beriladi?",
      options: [
        "RUN",
        "CMD",
        "COPY",
        "FROM"
      ],
      correctAnswer: 1,
      explanation: "CMD (command) konteyner ishga tushayotgan lahzada bajariladigan boshlang'ich buyruqni belgilaydi."
    },
    {
      id: 4,
      question: "Konteyner o'chib ketganda ham undagi ma'lumotlarni saqlab qolish uchun nima ishlatiladi?",
      options: [
        "Docker Volume",
        "Docker Port",
        "Docker Network",
        "Docker Ignore"
      ],
      correctAnswer: 0,
      explanation: "Docker Volume ma'lumotlarni konteyner tashqarisida, asosiy server xotirasida saqlash uchun xizmat qiladi."
    },
    {
      id: 5,
      question: "Nima uchun Dockerfile-da node:latest o'rniga node:alpine ishlatish tavsiya etiladi?",
      options: [
        "Unda ko'proq dasturlar bor",
        "U juda yengil (hajmi kichik) va xavfsiz operatsion tizimga asoslangan",
        "U tezroq internetga ulanadi",
        "U faqat CSS-ni qo'llab-quvvatlaydi"
      ],
      correctAnswer: 1,
      explanation: "Alpine linux o'ta yengil (5MB atrofida), natijada Node-alpine tasvirlari juda kichik hajmga ega bo'ladi."
    },
    {
      id: 6,
      question: "Bir nechta konteynerlarni bitta faylda ta'riflab, birgalikda boshqarish qaysi vosita orqali amalga oshiriladi?",
      options: [
        "Docker Compose",
        "Docker Desktop",
        "Docker Swarm",
        "Kubernetes"
      ],
      correctAnswer: 0,
      explanation: "Docker Compose docker-compose.yml fayli yordamida ko'p konteynerli ilovalarni boshqarishga imkon beradi."
    },
    {
      id: 7,
      question: "Dockerfile buyruqlari ichida COPY va ADD o'rtasidagi asosiy farq nima?",
      options: [
        "COPY tezroq ishlaydi",
        "ADD uzoqdagi URL manzillardan yuklash va arxivlarni avtomatik ochish imkoniyatiga ega",
        "COPY faqat rasmlarni nusxalaydi",
        "Farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "ADD uzoq manzildan yuklab olish (wget kabi) va tar/zip arxivlarni ochib nusxalash xususiyatlariga ega."
    },
    {
      id: 8,
      question: "Konteynerlarni o'zaro xavfsiz bog'lash va aloqa qilishini ta'minlash uchun nima sozlanadi?",
      options: [
        "Docker Network",
        "Docker Port",
        "Docker Compose",
        "Docker Image"
      ],
      correctAnswer: 0,
      explanation: "Docker Network konteynerlar o'rtasida izolyatsiya qilingan tarmoq aloqasini yaratib beradi."
    },
    {
      id: 9,
      question: "Docker Compose-da depends_on xususiyati nima qiladi?",
      options: [
        "Konteynerlar portlarini bog'laydi",
        "Konteynerlarning ishga tushish tartibi ketma-ketligini belgilaydi",
        "Ma'lumotlar omborini tozalaydi",
        "Barcha konteynerlarni bitta qiladi"
      ],
      correctAnswer: 1,
      explanation: "depends_on xizmatlarning ketma-ket yuklanishini ta'minlaydi (masalan, DB backend-dan oldin ishga tushishi kerak)."
    },
    {
      id: 10,
      question: "Docker-da local node_modules papkasini build vaqtida chetlab o'tish uchun qaysi fayl kerak?",
      options: [
        ".gitignore",
        ".dockerignore",
        "docker-compose.yml",
        "Dockerfile"
      ],
      correctAnswer: 1,
      explanation: ".dockerignore faylida ko'rsatilgan fayllar docker build jarayonida konteynerga nusxalanmaydi."
    },
    {
      id: 11,
      question: "Docker build vaqtida npm install jarayonini tezlashtirish uchun qaysi yondashuv to'g'ri?",
      options: [
        "Barcha kodlarni nusxalashdan oldin package.json ni nusxalab npm install qilish",
        "npm install qilmaslik",
        "Faqat zip arxivlardan nusxalash",
        "Har doim yangi image olish"
      ],
      correctAnswer: 0,
      explanation: "package.json nusxalanib install qilinsa, kod o'zgarganda docker cash-dan foydalanib kutubxonalarni qayta o'rnatib o'tirmaydi."
    },
    {
      id: 12,
      question: "Docker konteynerlarining virtual mashinalardan ustunligi nimada?",
      options: [
        "Ular shaxsiy OS-ga ega",
        "Ular asosiy OS yadrosini baham ko'rib, ancha kam xotira sarflaydi va tezroq yuklanadi",
        "Ular faqat Windows-da ishlaydi",
        "Ular internet talab qilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Konteynerlar virtualizatsiyani OS darajasida amalga oshiradi, Hypervisor va mehmon OS yo'qligi sababli o'ta tez va yengildir."
    }
  ]
};
