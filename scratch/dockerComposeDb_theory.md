## 1. 💡 Sodda Tushuntirish va Analogiya

### Docker Compose nima?
**Docker Compose** — bu ko'p konteynerli Docker ilovalarini ta'riflash va ishga tushirish uchun mo'ljallangan vositadir. Oddiy qilib aytganda, agar bitta konteyner (masalan, Node.js ilovasi) uchun `Dockerfile` retsept bo'lsa, butun boshli loyiha (backend, ma'lumotlar bazasi, Redis kesh tizimi) uchun `docker-compose.yml` loyihaning to'liq menyusi va uni stolga tortish yo'riqnomasidir.

### Real hayotiy analogiya
Tasavvur qiling, siz **orkestr boshqaruvchisiz (conductor)**:
* **Docker yordamida ishlash:** Har bir musiqachining (konteynerning) oldiga alohida borib, qachon chalishni boshlashni, qanday tovush chiqarishni qo'lda tushuntirasiz. Agar musiqachilar soni 10 ta bo'lsa, bu juda chigal va charchatadigan ish bo'ladi.
* **Docker Compose yordamida ishlash:** Siz bitta umumiy nota varag'ini yozasiz (`docker-compose.yml`). Unda kim qachon boshlashi (`depends_on`), qay darajada baland chalishi (`ports`) va bir-biri bilan qanday bog'lanishi yozilgan bo'ladi. Nota varag'ini ko'tarib, qo'lingizni bir marta ko'tarsangiz (`docker compose up`), butun orkestr bir vaqtda mukammal uyg'unlikda chalishni boshlaydi.

---

## 2. 💻 Real Kod Misollari

Quyida Node.js API, PostgreSQL (ma'lumotlar bazasi) va Redis (kesh tizimi) xizmatlarini birlashtirgan to'liq `docker-compose.yml` fayli keltirilgan:

```yaml
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
```

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Docker Networks (Konteynerlararo aloqa)
Docker Compose loyiha ishga tushganda avtomatik ravishda **Bridge** tarmog'ini yaratadi. Ushbu tarmoq ichida joylashgan barcha konteynerlar bir-biriga IP manzil yozmasdan, xizmat nomi (service name) orqali bog'lanishadi. 
* Masalan, `web` konteyneri `postgres` ma'lumotlar bazasiga ulanish uchun shunchaki `postgres:5432` hostiga murojaat qiladi.
* Ichki DNS tizimi avtomatik ravishda `postgres` nomini mos keluvchi konteyner IP-manziliga o'girib beradi.

### 2. Docker Volumes (Ma'lumotlarning doimiyligi)
Konteynerlar tabiatan vaqtinchalik (ephemeral) bo'ladi. Agar siz PostgreSQL konteynerini o'chirib yuborsangiz, uning ichidagi ma'lumotlar ham o'chib ketadi.
* `pg-data:/var/lib/postgresql/data` ko'rinishidagi volume yozuvi orqali PostgreSQL o'z fayllarini yozadigan konteyner ichidagi katalog host tizimidagi xavfsiz joyga ulanadi (mount).
* Konteyner o'chib, qaytadan yangisi yaratilsa ham, o'sha disk unga qaytadan ulanib, ma'lumotlarni saqlab qoladi.

```mermaid
graph TD
    User([Foydalanuvchi/Brauzer]) -->|Port 3000| App[Node.js App Container]
    subgraph Docker Bridge Network: app-network
        App -->|Service Name: postgres| DB[(PostgreSQL Container)]
        App -->|Service Name: redis| Cache[(Redis Container)]
    end
    DB -->|Named Volume| PGData[(pg_data Volume)]
    Cache -->|Named Volume| RedisData[(redis_data Volume)]
```

### 3. depends_on va Healthcheck farqi
* `depends_on` faqat konteynerlarning **ishga tushish ketma-ketligini** boshqaradi.
* Ammo, ma'lumotlar bazasi konteyneri ishga tushishi bilan darhol so'rovlarni qabul qila olmaydi (ichki tizimlar yuklanishi uchun bir necha soniya kerak).
* Shuning uchun `healthcheck` xossasi orqali bazaning tayyorligi (`pg_isready`) tekshiriladi va backend faqat baza to'liq tayyor bo'lgandan keyingina ishga tushiriladi (`condition: service_healthy`).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. depends_on ishlatilganda baza tayyor deb hisoblash
* **Xato:** `depends_on: [postgres]` deb yozib, backend ilovani darhol bazaga ulatish. Baza hali to'liq ishga tushmagani sababli backend "Connection Refused" xatosi bilan qulab tushadi.
* **Tuzatish:** Compose fayliga `healthcheck` qo'shish va backendda `condition: service_healthy` xususiyatini o'rnatish.

### 2. Parollarni Compose fayliga hardcode qilish
* **Xato:** Maxfiy parollarni to'g'ridan-to'g'ri `docker-compose.yml` ichida saqlash va uni Git-ga yuklash.
* **Tuzatish:** Parollarni `.env` fayliga o'tkazish va Compose ichida ularni `${DB_PASSWORD}` shaklida chaqirish.

### 3. Port chalkashligi (Host Port vs Container Port)
* **Xato:** `"80:3000"` yozuvini noto'g'ri tushunish.
* **Tuzatish:** Chap tomondagi port `Host Port` (tashqi dunyo ko'radigan port), o'ng tomondagisi esa `Container Port` (konteyner ichida ilova tinglayotgan port).

---

## 5. 💬 12 ta Intervyu Savollari

1. **Docker Compose nima va u qachon ishlatiladi?**
   * Ko'p konteynerli muhitlarni yagona konfiguratsiya fayli orqali boshqarish uchun ishlatiladi.
2. **`docker compose up` va `docker compose start` farqi nimada?**
   * `up` konteynerlarni yaratadi, network va volumelarni sozlaydi va ishga tushiradi. `start` esa faqat to'xtatilgan mavjud konteynerlarni qayta ishga tushiradi.
3. **Loyihaning barcha konteynerlarini orqa fonda (detached) qanday ishga tushirish mumkin?**
   * `docker compose up -d` buyrug'i orqali.
4. **Docker compose-da yaratilgan konteynerlar qanday qilib bir-biri bilan ulanadi?**
   * Avtomatik yaratilgan Bridge tarmoq va ichki DNS tizimi orqali service name (xizmat nomi) yordamida bog'lanadi.
5. **docker-compose.yml faylidagi `volumes` nima uchun kerak?**
   * Konteyner o'chib ketganda ham ma'lumotlar yo'qolmasligi, doimiy saqlanishi (persistence) uchun.
6. **Depends_on faqat o'zi yetarlimi?**
   * Yo'q, u faqat konteyner boshlanishini ta'minlaydi. To'liq ulanish xavfsizligi uchun `healthcheck` zarur.
7. **Environment o'zgaruvchilarni compose fayliga qanday bog'lash mumkin?**
   * `.env` faylidan `${VARIABLE_NAME}` sintaksisi orqali yuklash orqali.
8. **Qanday qilib faqat bitta xizmatni qayta yig'ish va ishga tushirish mumkin?**
   * `docker compose up --build <service_name>` buyrug'i bilan.
9. **`docker compose down` qanday resurslarni o'chiradi?**
   * Loyihaning konteynerlarini va tarmoqlarini (networks) o'chiradi. Volume-larni o'chirish uchun esa `--volumes` bayrog'ini qo'shish kerak.
10. **Bridge va Host tarmoq drayverlari farqi nimada?**
    * Bridge tarmoq izolyatsiya qilingan ichki tarmoq yaratadi. Host tarmoq esa konteynerni to'g'ridan-to'g'ri server tarmog'iga ulaydi.
11. **Docker Compose configurations faylida versiya (version) yozish shartmi?**
    * Compose V2 standartlaridan boshlab `version` yozilishi ixtiyoriy hisoblanadi, biroq V1 formatlarida format turini belgilash uchun majburiy edi.
12. **Docker Compose yordamida bitta xizmatning konteynerlar sonini qanday ko'paytirish (scale) mumkin?**
    * `docker compose up --scale web=3` buyrug'i yordamida.

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

```yaml
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
```

### Kod integratsiyasi (Node.js ulanishi):
Konteyner ichidagi Node.js backend ilovasida MongoDB va Redis-ga ulanish quyidagicha sodir bo'ladi:
```javascript
const mongoose = require('mongoose');
const redis = require('redis');

// MONGO_URL va REDIS_URL o'zgaruvchilari docker-compose-dan o'tib keladi
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB-ga muvaffaqiyatli ulandi (Compose Network)."))
  .catch(err => console.error("MongoDB-ga ulanishda xato:", err));

const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect();
```

---

## 9. 🚀 Performance va Optimization

### 1. Build keshlarini optimallashtirish
Dockerfile ichida kod nusxalanishidan oldin `package.json` nusxalanishini ta'minlang:
```dockerfile
COPY package*.json ./
RUN npm install
COPY . .
```
Bu loyiha kodi o'zgarganda docker-compose build vaqtidagi `npm install` jarayonini keshdan o'qishini ta'minlaydi va vaqtni tejaydi.

### 2. Loglarni cheklash (Log rotation)
Docker Compose orqali ishlaydigan konteynerlar vaqt o'tishi bilan ko'p hajmdagi log yig'adi va diskni to'ldirib yuboradi. Buning oldini olish uchun log hajmini cheklang:
```yaml
services:
  web:
    image: my-app:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## 10. 📌 Cheat Sheet

| Buyruq | Vazifasi |
| :--- | :--- |
| `docker compose up -d` | Barcha xizmatlarni orqa fonda ishga tushirish |
| `docker compose down` | Konteynerlar va tarmoqlarni o'chirish |
| `docker compose down -v` | Konteynerlar, tarmoqlar va barcha doimiy volumelarni o'chirish |
| `docker compose logs -f` | Barcha konteynerlar loglarini real vaqtda kuzatish |
| `docker compose ps` | Loyihaning faol konteynerlari ro'yxatini ko'rish |
| `docker compose exec <service> sh` | Tanlangan xizmat konteyneri terminaliga kirish |
| `docker compose build` | Loyiha tasvirlarini (images) qayta yig'ish |
