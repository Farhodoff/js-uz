export const dockerComposeDb = {
  id: "dockerComposeDb",
  title: "Docker Compose va Ma'lumotlar Bazasi Integratsiyasi",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Docker Compose nima?
**Docker Compose** — bu ko'p konteynerli Docker ilovalarini ta'riflash va ishga tushirish uchun mo'ljallangan vositadir. Oddiy qilib aytganda, agar bitta konteyner (masalan, Node.js ilovasi) uchun \`Dockerfile\` retsept bo'lsa, butun boshli loyiha (backend, ma'lumotlar bazasi, Redis kesh tizimi) uchun \`docker-compose.yml\` loyihaning to'liq menyusi va uni stolga tortish yo'riqnomasidir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **orkestr boshqaruvchisiz (conductor)**:
* **Docker yordamida ishlash:** Har bir musiqachining (konteynerning) oldiga alohida borib, qachon chalishni boshlashni, qanday tovush chiqarishni qo'lda tushuntirasiz. Agar musiqachilar soni 10 ta bo'lsa, bu juda chigal va charchatadigan ish bo'ladi.
* **Docker Compose yordamida ishlash:** Siz bitta umumiy nota varag'ini yozasiz (\`docker-compose.yml\`). Unda kim qachon boshlashi (\`depends_on\`), qay darajada baland chalishi (\`ports\`) va bir-biri bilan qanday bog'lanishi yozilgan bo'ladi. Nota varag'ini ko'tarib, qo'lingizni bir marta ko'tarsangiz (\`docker compose up\`), butun orkestr bir vaqtda mukammal uyg'unlikda chalishni boshlaydi.

---

## 2. 💻 Real Kod Misollari

Quyida Node.js API, PostgreSQL (ma'lumotlar bazasi) va Redis (kesh tizimi) xizmatlarini birlashtirgan to'liq \`docker-compose.yml\` fayli keltirilgan:

\`\`\`yaml
version: '3.8'

# 1. Loyihamiz tarkibiga kiruvchi xizmatlar
services:
  # Node.js API ilovasi
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://postgres_user:postgres_password@postgres:5432/app_db
      - REDIS_URL=redis://redis:6379
    # Baza va kesh tizimi ishga tushgandan keyin web ilova ishga tushadi
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - app-network

  # PostgreSQL ma'lumotlar bazasi
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres_user
      POSTGRES_PASSWORD: postgres_password
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - pg-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres_user -d app_db"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  # Redis kesh xizmati
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network

# 2. Ma'lumotlarni doimiy saqlash uchun disklarni e'lon qilish
volumes:
  pg-data:
  redis-data:

# 3. Konteynerlar o'zaro aloqa qiladigan tarmoq
networks:
  app-network:
    driver: bridge
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Docker Networks (Konteynerlararo aloqa)
Docker Compose loyiha ishga tushganda avtomatik ravishda **Bridge** tarmog'ini yaratadi. Ushbu tarmoq ichida joylashgan barcha konteynerlar bir-biriga IP manzil yozmasdan, xizmat nomi (service name) orqali bog'lanishadi. 
* Masalan, \`web\` konteyneri \`postgres\` ma'lumotlar bazasiga ulanish uchun shunchaki \`postgres:5432\` hostiga murojaat qiladi.
* Ichki DNS tizimi avtomatik ravishda \`postgres\` nomini mos keluvchi konteyner IP-manziliga o'girib beradi.

### 2. Docker Volumes (Ma'lumotlarning doimiyligi)
Konteynerlar tabiatan vaqtinchalik (ephemeral) bo'ladi. Agar siz PostgreSQL konteynerini o'chirib yuborsangiz, uning ichidagi ma'lumotlar ham o'chib ketadi.
* \`pg-data:/var/lib/postgresql/data\` ko'rinishidagi volume yozuvi orqali PostgreSQL o'z fayllarini yozadigan konteyner ichidagi katalog host tizimidagi xavfsiz joyga ulanadi (mount).
* Konteyner o'chib, qaytadan yangisi yaratilsa ham, o'sha disk unga qaytadan ulanib, ma'lumotlarni saqlab qoladi.

\`\`\`mermaid
graph TD
    User([Foydalanuvchi/Brauzer]) -->|Port 3000| App[Node.js App Container]
    subgraph Docker Bridge Network: app-network
        App -->|Service Name: postgres| DB[(PostgreSQL Container)]
        App -->|Service Name: redis| Cache[(Redis Container)]
    end
    DB -->|Named Volume| PGData[(pg_data Volume)]
    Cache -->|Named Volume| RedisData[(redis_data Volume)]
\`\`\`

### 3. depends_on va Healthcheck farqi
* \`depends_on\` faqat konteynerlarning **ishga tushish ketma-ketligini** boshqaradi.
* Ammo, ma'lumotlar bazasi konteyneri ishga tushishi bilan darhol so'rovlarni qabul qila olmaydi (ichki tizimlar yuklanishi uchun bir necha soniya kerak).
* Shuning uchun \`healthcheck\` xossasi orqali bazaning tayyorligi (\`pg_isready\`) tekshiriladi va backend faqat baza to'liq tayyor bo'lgandan keyingina ishga tushiriladi (\`condition: service_healthy\`).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. depends_on ishlatilganda baza tayyor deb hisoblash
* **Xato:** \`depends_on: [postgres]\` deb yozib, backend ilovani darhol bazaga ulatish. Baza hali to'liq ishga tushmagani sababli backend "Connection Refused" xatosi bilan qulab tushadi.
* **Tuzatish:** Compose fayliga \`healthcheck\` qo'shish va backendda \`condition: service_healthy\` xususiyatini o'rnatish.

### 2. Parollarni Compose fayliga hardcode qilish
* **Xato:** Maxfiy parollarni to'g'ridan-to'g'ri \`docker-compose.yml\` ichida saqlash va uni Git-ga yuklash.
* **Tuzatish:** Parollarni \`.env\` fayliga o'tkazish va Compose ichida ularni \`\${DB_PASSWORD}\` shaklida chaqirish.

### 3. Port chalkashligi (Host Port vs Container Port)
* **Xato:** \`"80:3000"\` yozuvini noto'g'ri tushunish.
* **Tuzatish:** Chap tomondagi port \`Host Port\` (tashqi dunyo ko'radigan port), o'ng tomondagisi esa \`Container Port\` (konteyner ichida ilova tinglayotgan port).

---

## 5. 💬 12 ta Intervyu Savollari

1. **Docker Compose nima va u qachon ishlatiladi?**
   * Ko'p konteynerli muhitlarni yagona konfiguratsiya fayli orqali boshqarish uchun ishlatiladi.
2. **\`docker compose up\` va \`docker compose start\` farqi nimada?**
   * \`up\` konteynerlarni yaratadi, network va volumelarni sozlaydi va ishga tushiradi. \`start\` esa faqat to'xtatilgan mavjud konteynerlarni qayta ishga tushiradi.
3. **Loyihaning barcha konteynerlarini orqa fonda (detached) qanday ishga tushirish mumkin?**
   * \`docker compose up -d\` buyrug'i orqali.
4. **Docker compose-da yaratilgan konteynerlar qanday qilib bir-biri bilan ulanadi?**
   * Avtomatik yaratilgan Bridge tarmoq va ichki DNS tizimi orqali service name (xizmat nomi) yordamida bog'lanadi.
5. **docker-compose.yml faylidagi \`volumes\` nima uchun kerak?**
   * Konteyner o'chib ketganda ham ma'lumotlar yo'qolmasligi, doimiy saqlanishi (persistence) uchun.
6. **Depends_on faqat o'zi yetarlimi?**
   * Yo'q, u faqat konteyner boshlanishini ta'minlaydi. To'liq ulanish xavfsizligi uchun \`healthcheck\` zarur.
7. **Environment o'zgaruvchilarni compose fayliga qanday bog'lash mumkin?**
   * \`.env\` faylidan \`\${VARIABLE_NAME}\` sintaksisi orqali yuklash orqali.
8. **Qanday qilib faqat bitta xizmatni qayta yig'ish va ishga tushirish mumkin?**
   * \`docker compose up --build <service_name>\` buyrug'i bilan.
9. **\`docker compose down\` qanday resurslarni o'chiradi?**
   * Loyihaning konteynerlarini va tarmoqlarini (networks) o'chiradi. Volume-larni o'chirish uchun esa \`--volumes\` bayrog'ini qo'shish kerak.
10. **Bridge va Host tarmoq drayverlari farqi nimada?**
    * Bridge tarmoq izolyatsiya qilingan ichki tarmoq yaratadi. Host tarmoq esa konteynerni to'g'ridan-to'g'ri server tarmog'iga ulaydi.
11. **Docker Compose configurations faylida versiya (version) yozish shartmi?**
    * Compose V2 standartlaridan boshlab \`version\` yozilishi ixtiyoriy hisoblanadi, biroq V1 formatlarida format turini belgilash uchun majburiy edi.
12. **Docker Compose yordamida bitta xizmatning konteynerlar sonini qanday ko'paytirish (scale) mumkin?**
    * \`docker compose up --scale web=3\` buyrug'i yordamida.

---

## 6. 🛠️ Amaliy Topshiriqlar

Ushbu bo'limda Docker Compose konfiguratsiyalari, port mapping va ma'lumotlar bazasi muhit o'zgaruvchilarini to'g'ri shakllantirish bo'yicha amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars so'ngida taqdim etiladigan 12 ta test orqali Docker Compose tarmoqlari, doimiy disklar (volumes), dependent xizmatlar va buyruqlar haqidagi bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Node.js, MongoDB va Redis orqali Backend Arxitekturasi
Katta hajmdagi foydalanuvchilar oqimiga ega bo'lgan loyihalarda MongoDB asosiy ma'lumotlar ombori, Redis esa tez-tez so'raladigan ma'lumotlarni keshlovchi qatlam sifatida xizmat qiladi. Quyida ushbu tizimning Docker Compose konfiguratsiyasi berilgan:

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - MONGO_URL=mongodb://mongodb:27017/prod_db
      - REDIS_URL=redis://redis_cache:6379
    depends_on:
      mongodb:
        condition: service_healthy
      redis_cache:
        condition: service_started
    networks:
      - production-net

  mongodb:
    image: mongo:6.0-jammy
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 3
    networks:
      - production-net

  redis_cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - production-net

volumes:
  mongo_data:

networks:
  production-net:
\`\`\`

### Kod integratsiyasi (Node.js ulanishi):
Konteyner ichidagi Node.js backend ilovasida MongoDB va Redis-ga ulanish quyidagicha sodir bo'ladi:
\`\`\`javascript
const mongoose = require('mongoose');
const redis = require('redis');

// MONGO_URL va REDIS_URL o'zgaruvchilari docker-compose-dan o'tib keladi
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB-ga muvaffaqiyatli ulandi (Compose Network)."))
  .catch(err => console.error("MongoDB-ga ulanishda xato:", err));

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect();
\`\`\`

---

## 9. 🚀 Performance va Optimization

### 1. Build keshlarini optimallashtirish
Dockerfile ichida kod nusxalanishidan oldin \`package.json\` nusxalanishini ta'minlang:
\`\`\`dockerfile
COPY package*.json ./
RUN npm install
COPY . .
\`\`\`
Bu loyiha kodi o'zgarganda docker-compose build vaqtidagi \`npm install\` jarayonini keshdan o'qishini ta'minlaydi va vaqtni tejaydi.

### 2. Loglarni cheklash (Log rotation)
Docker Compose orqali ishlaydigan konteynerlar vaqt o'tishi bilan ko'p hajmdagi log yig'adi va diskni to'ldirib yuboradi. Buning oldini olish uchun log hajmini cheklang:
\`\`\`yaml
services:
  web:
    image: my-app:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

---

## 10. 📌 Cheat Sheet

| Buyruq | Vazifasi |
| :--- | :--- |
| \`docker compose up -d\` | Barcha xizmatlarni orqa fonda ishga tushirish |
| \`docker compose down\` | Konteynerlar va tarmoqlarni o'chirish |
| \`docker compose down -v\` | Konteynerlar, tarmoqlar va barcha doimiy volumelarni o'chirish |
| \`docker compose logs -f\` | Barcha konteynerlar loglarini real vaqtda kuzatish |
| \`docker compose ps\` | Loyihaning faol konteynerlari ro'yxatini ko'rish |
| \`docker compose exec <service> sh\` | Tanlangan xizmat konteyneri terminaliga kirish |
| \`docker compose build\` | Loyiha tasvirlarini (images) qayta yig'ish |
`,
  exercises: [
  {
    "id": 1,
    "title": "1️⃣ Compose Asoslari (Boshlang'ich)",
    "instruction": "Docker Compose fayllarida versiyani '3.8' deb belgilovchi va xizmatlarni (services) e'lon qilishda ishlatiladigan asosiy kalit so'zlar ro'yxatini massiv ko'rinishida qaytaruvchi getComposeBasics() funksiyasini yozing. U qaytargan obyektda { version: '3.8', rootKey: 'services' } bo'lishi lozim.",
    "startingCode": "function getComposeBasics() {\n  // Kodni shu yerda yozing\n}",
    "hint": "return { version: '3.8', rootKey: 'services' };",
    "test": "const sandbox = new Function(code + '; return getComposeBasics;');\nconst fn = sandbox();\nconst res = fn();\nif (!res || res.version !== '3.8' || res.rootKey !== 'services') return 'Natija noto\\'g\\'ri';\nreturn null;"
  },
  {
    "id": 2,
    "title": "2️⃣ PostgreSQL Environment Sozlamalari (O'rta)",
    "instruction": "PostgreSQL konteyneri uchun kerakli environment (muhit) o'zgaruvchilarini obyekt ko'rinishida qaytaruvchi getPostgresEnv(dbName, user, password) funksiyasini yozing. Obyektda POSTGRES_DB, POSTGRES_USER va POSTGRES_PASSWORD kalitlari mos qiymatlar bilan bo'lishi kerak.",
    "startingCode": "function getPostgresEnv(dbName, user, password) {\n  // Kodni shu yerda yozing\n}",
    "hint": "return { POSTGRES_DB: dbName, POSTGRES_USER: user, POSTGRES_PASSWORD: password };",
    "test": "const sandbox = new Function(code + '; return getPostgresEnv;');\nconst fn = sandbox();\nconst env = fn('app_db', 'admin', 'secret123');\nif (!env || env.POSTGRES_DB !== 'app_db' || env.POSTGRES_USER !== 'admin' || env.POSTGRES_PASSWORD !== 'secret123') return 'O\\'zgaruvchilar mosligi xato';\nreturn null;"
  },
  {
    "id": 3,
    "title": "3️⃣ Volume va Papkalarni Bog'lash (Qiyin)",
    "instruction": "Docker Compose-da postgres ma'lumotlarini saqlash uchun ishlatiladigan named volume nomini 'db_data' deb belgilagan holda, PostgreSQL xizmati ichida uni '/var/lib/postgresql/data' papkasiga ulash (mount) string formatini qaytaruvchi getVolumeMount() funksiyasini yozing.",
    "startingCode": "function getVolumeMount() {\n  // Kodni shu yerda yozing\n}",
    "hint": "return 'db_data:/var/lib/postgresql/data';",
    "test": "const sandbox = new Function(code + '; return getVolumeMount;');\nconst fn = sandbox();\nconst mountStr = fn();\nif (mountStr !== 'db_data:/var/lib/postgresql/data') return 'Volume mapping noto\\'g\\'ri. db_data:/var/lib/postgresql/data formatida qaytaring';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Docker Compose nima?",
    "options": [
      "Ko'p konteynerli Docker ilovalarini ta'riflash va ishga tushirish vositasi",
      "Faqat ma'lumotlar bazasini optimallashtiradigan alohida SQL vositasi",
      "JavaScript kodlarini yig'uvchi (bundler) dastur",
      "Konteyner ichidagi rasmlarni siquvchi utilita"
    ],
    "correctAnswer": 0,
    "explanation": "Docker Compose — bu yagona YAML fayl (docker-compose.yml) yordamida ko'p konteynerli ilovalar arxitekturasini ta'riflash va ularni birgalikda boshqarish (ishga tushirish, to'xtatish) vositasidir."
  },
  {
    "id": 2,
    "question": "docker-compose.yml faylidagi `depends_on` xossasi nima vazifani bajaradi?",
    "options": [
      "Konteynerlarning ishga tushish ketma-ketligini (tartibini) belgilaydi",
      "Bog'liq konteyner ichidagi ma'lumotlar to'liq yuklanmaguncha kodni to'xtatib turadi",
      "Baza parollarini shifrlab saqlaydi",
      "Portlarni tashqi tarmoqqa ochib beradi"
    ],
    "correctAnswer": 0,
    "explanation": "`depends_on` xizmatlar (services) qaysi tartibda boshlanishini belgilaydi (masalan, db va redis ishga tushgach web konteyneri boshlanadi). Ammo u bog'liq xizmatning so'rovlarni qabul qilishga tayyor (ready) bo'lganini kutmaydi, shunchaki konteyner jarayoni boshlanganini tekshiradi."
  },
  {
    "id": 3,
    "question": "Docker Compose xizmatlari konteynerlar o'chib ketganda ham ma'lumotlarni saqlab qolishi uchun qaysi xossadan foydalanadi?",
    "options": [
      "volumes",
      "networks",
      "ports",
      "environment"
    ],
    "correctAnswer": 0,
    "explanation": "`volumes` yordamida konteyner ichidagi papkalar host tizimiga yoki Docker boshqaradigan maxsus doimiy disk qismiga (named volume) bog'lanadi. Bu ma'lumotlar yo'qolishining oldini oladi."
  },
  {
    "options": [
      "Ular avtomatik ravishda yagona umumiy tarmoqqa (bridge network) ulanadi va xizmat nomi (service name) orqali bog'lana oladi",
      "Faqat IP manzillarini qo'lda yozib chiqish orqali bog'lanadi",
      "Faqat portlarni bir xil qilish orqali bog'lanadi",
      "Ular bir-biri bilan umuman bog'lana olmaydi"
    ],
    "question": "Docker Compose yordamida yaratilgan xizmatlar bir-biri bilan qanday aloqa qiladi?",
    "id": 4,
    "correctAnswer": 0,
    "explanation": "Docker Compose default holatda loyiha uchun alohida tarmoq (network) yaratadi. Konteynerlar o'sha tarmoq ichida xizmat nomlari (masalan: `postgres`, `redis`) orqali DNS so'rov yuborib bir-biri bilan bog'lana oladi."
  },
  {
    "id": 5,
    "question": "docker-compose.yml fayliga maxfiy kalitlar va parollarni xavfsiz uzatish uchun qaysi usul eng yaxshi hisoblanadi?",
    "options": [
      "Loyihada `.env` faylidan foydalanish va Compose faylida `${VAR_NAME}` sintaksisini qo'llash",
      "Parollarni to'g'ridan-to'g'ri docker-compose.yml faylida yozib ketish",
      "Baza parolidan umuman foydalanmaslik",
      "Parolni har safar konteyner terminaliga kirib qo'lda yozish"
    ],
    "correctAnswer": 0,
    "explanation": "Maxfiy o'zgaruvchilarni `.env` faylida saqlash va docker-compose.yml-da ularni o'zgaruvchi sifatida chaqirish (masalan: `POSTGRES_PASSWORD: ${DB_PASSWORD}`) xavfsizlik va moslashuvchanlik nuqtai nazaridan eng to'g'ri yo'ldir."
  },
  {
    "id": 6,
    "question": "Barcha Docker Compose xizmatlarini orqa fonda (detached mode) ishga tushirish buyrug'i qaysi?",
    "options": [
      "docker compose up -d",
      "docker compose up --build",
      "docker compose start -all",
      "docker compose run --bg"
    ],
    "correctAnswer": 0,
    "explanation": "`docker compose up -d` buyrug'i barcha xizmatlarni orqa fonda (detached) ishga tushiradi, natijada siz joriy terminal oynasidan boshqa buyruqlar uchun foydalanishda davom etishingiz mumkin."
  },
  {
    "id": 7,
    "question": "Docker Compose xizmatlarini o'chirish, yaratilgan tarmoq (network) va konteynerlarni butunlay tozalash buyrug'i qaysi?",
    "options": [
      "docker compose down",
      "docker compose stop",
      "docker compose clean",
      "docker compose remove"
    ],
    "correctAnswer": 0,
    "explanation": "`docker compose down` buyrug'i ishlayotgan konteynerlarni to'xtatadi va ularni, shuningdek loyiha uchun yaratilgan tarmoqlarni (networks) butunlay o'chirib yuboradi."
  },
  {
    "id": 8,
    "question": "Rasmiy PostgreSQL konteynerida ma'lumotlar saqlanadigan standart katalog qaysi?",
    "options": [
      "/var/lib/postgresql/data",
      "/data/db",
      "/usr/share/nginx/html",
      "/etc/postgresql"
    ],
    "correctAnswer": 0,
    "explanation": "PostgreSQL o'z ma'lumotlarini konteyner ichidagi `/var/lib/postgresql/data` papkasida saqlaydi. Biz doimiy saqlash (persistence) uchun ushbu papkani volume-ga mount qilamiz."
  },
  {
    "id": 9,
    "question": "Koddagi o'zgarishlardan so'ng Docker tasvirlarini (images) qayta yig'ib, xizmatlarni ishga tushirish uchun qaysi buyruq qo'llaniladi?",
    "options": [
      "docker compose up --build",
      "docker compose rebuild",
      "docker compose up -d --no-cache",
      "docker compose up --force-recreate"
    ],
    "correctAnswer": 0,
    "explanation": "`docker compose up --build` buyrug'i konteynerlarni ishga tushirishdan oldin Dockerfile fayllari o'zgargan xizmatlarni qaytadan yig'ish (build) majburiyatini yuklaydi."
  },
  {
    "id": 10,
    "question": "Rasmiy MongoDB konteynerida ma'lumotlar saqlanadigan standart ichki katalog qaysi?",
    "options": [
      "/data/db",
      "/var/lib/mongo",
      "/data/mongodb",
      "/var/lib/postgresql/data"
    ],
    "correctAnswer": 0,
    "explanation": "MongoDB ma'lumotlar bazasi o'z ma'lumotlarini standart holatda `/data/db` papkasida saqlaydi va ushbu joy volume orqali saqlanishi kerak."
  },
  {
    "id": 11,
    "question": "Nima uchun ma'lumotlar bazasi konteyneri ishga tushganda `depends_on` mavjudligiga qaramay backend ilovasida ulanish xatosi (Connection Error) yuz berishi mumkin?",
    "options": [
      "Chunki depends_on faqat konteyner boshlanganini tekshiradi, bazaning so'rovlarni qabul qilishga tayyorligini kutmaydi",
      "Chunki bazaning portlari har doim o'zgarib turadi",
      "Chunki backend faqat local portlar orqali bog'lana oladi",
      "depends_on ishlatilganda bunday xatolik umuman yuz bermaydi"
    ],
    "correctAnswer": 0,
    "explanation": "Konteynerning ishga tushishi (running) bazaning ichki tizimi to'liq yuklanib, portlarni tinglashni boshlaganini anglatmaydi. Bu muammoni hal qilish uchun `healthcheck` yoki `pg_isready` kabi tekshiruvlar yoziladi."
  },
  {
    "id": 12,
    "question": "Docker Compose faylidagi `ports` qismida `\"8080:3000\"` yozuvi nimani anglatadi?",
    "options": [
      "Host tizimining 8080-portini konteyner ichidagi 3000-portga bog'lash",
      "Host tizimining 3000-portini konteyner ichidagi 8080-portga bog'lash",
      "Faqat ichki 8080 va 3000 portlarni bog'lash",
      "Portlarni global tarmoq uchun butunlay yopish"
    ],
    "correctAnswer": 0,
    "explanation": "Port mapping-da chap tomondagi port host porti (tashqaridan kirish uchun), o'ng tomondagisi esa konteyner ichidagi xizmat tinglayotgan portdir (HOST:CONTAINER)."
  }
]

};
