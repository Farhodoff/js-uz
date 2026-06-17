export const cachingRedis = {
  id: "cachingRedis",
  title: "Keshlash va Redis (Caching & Redis)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Keshlash nima?
**Keshlash (Caching)** — bu ma'lumotlarni tez-tez so'ralganda tezkor va qulay joyda (odatda tezkor xotira - RAM) vaqtinchalik saqlash texnologiyasidir. Bu ma'lumotlar bazasiga (Database) tushadigan yuklamani kamaytiradi va dastur tezligini yuzlab barobar oshiradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **oshxonada taom pishiryapsiz**:
* **Keshsiz holat:** Har safar sizga tuz, murch yoki pichoq kerak bo'lganda, uyingizdan chiqib, 2 km uzoqlikdagi **yirik supermarketga** (Ma'lumotlar bazasiga) borib kelasiz. Taom pishirish juda uzoq vaqt oladi va charchab qolasiz.
* **Keshli holat:** Siz ziravorlar va eng kerakli anjomlarni **oshxona stoliga** (Kesh/Redis) qo'yib qo'yasiz. Supermarketga faqat oshxona stolida yo'q bo'lgan narsalar uchun borasiz va ularni olib kelib, kelajakda tezroq foydalanish uchun stol ustiga joylashtirasiz.

### Redis nima?
**Redis (Remote Dictionary Server)** — bu in-memory (tezkor xotirada ishlaydigan), kalit-qiymat (Key-Value) ko'rinishidagi o'ta tezkor ma'lumotlar bazasi va kesh tizimidir. Ma'lumotlarni RAM-da saqlagani uchun o'qish va yozish operatsiyalari mikrosaniyalarda bajariladi.

---

## 2. 💻 Real Kod Misollari

### 1. Cache-Aside Strategiyasi (Express + Redis)
Eng keng tarqalgan keshlash strategiyasi:
\`\`\`javascript
import { createClient } from 'redis';
import express from 'express';

const app = express();
const redisClient = createClient();
await redisClient.connect();

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = \`product:\${id}\`;

  try {
    // 1. Keshdan ma'lumotni tekshiramiz (Cache Hit)
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Cache Hit!');
      return res.json(JSON.parse(cachedData));
    }

    // 2. Keshda yo'q bo'lsa, bazadan qidiramiz (Cache Miss)
    console.log('Cache Miss! Fetching from DB...');
    const product = await db.products.findById(id); // Simulyatsiya

    if (!product) {
      return res.status(404).json({ error: 'Mahsulot topilmadi' });
    }

    // 3. Kelajak uchun keshga yozamiz va 1 soat (3600s) TTL (Time To Live) beramiz
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(product));

    return res.json(product);
  } catch (error) {
    // Redis ishlamay qolsa ham tizim qulamasligi uchun catch ichida bazadan olish kerak
    console.error('Redis xatoligi:', error);
    const product = await db.products.findById(id);
    return res.json(product);
  }
});
\`\`\`

### 2. Redis Data Types (Turli xil ma'lumot turlari)
Redis faqat oddiy stringlar emas, balki murakkab tuzilmalarni ham qo'llab-quvvatlaydi:
\`\`\`javascript
// Strings: Oddiy kalit-qiymat
await redisClient.set('user:101:name', 'Farhod');
const name = await redisClient.get('user:101:name'); // 'Farhod'

// Hashes: Obyektlarni saqlash uchun qulay
await redisClient.hSet('user:102', {
  name: 'Sardor',
  role: 'admin',
  age: '28'
});
const userFields = await redisClient.hGetAll('user:102'); 
// { name: 'Sardor', role: 'admin', age: '28' }

// Lists: Tartiblangan ro'yxatlar (Navbatlar uchun qulay)
await redisClient.rPush('jobs', 'job_1');
await redisClient.rPush('jobs', 'job_2');
const nextJob = await redisClient.lPop('jobs'); // 'job_1'

// Sets: Takrorlanmas elementlar to'plami
await redisClient.sAdd('tags:book', ['js', 'programming', 'js']); // 'js' faqat bir marta saqlanadi
const tags = await redisClient.sMembers('tags:book'); // ['js', 'programming']
\`\`\`

### 3. Session Store (Sessiyalarni saqlash)
Gorizontal kengayuvchi tizimlarda sessiyani markazlashgan Redis-da saqlash:
\`\`\`javascript
import session from 'express-session';
import RedisStore from 'connect-redis';

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'my-super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // HTTPS uchun true qiling
    maxAge: 1000 * 60 * 60 * 24 // 1 kun
  }
}));
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Kesh Strategiyalari (Caching Strategies)
1. **Cache-Aside (Lazy Loading):** Ilova birinchi navbatda keshni o'qiydi. Agar ma'lumot bo'lsa (Hit) qaytaradi. Bo'lmasa (Miss), bazadan o'qib keshga yozadi. Eng ko'p ishlatiladigan usul.
2. **Read-Through:** Ilova kesh provayderidan so'raydi. Kesh provayderi o'zi orqa fonda bazadan ma'lumotni o'qib, keshlab, keyin ilovaga qaytaradi.
3. **Write-Through:** Ma'lumot yozilayotganda avval keshga, keyin bazaga darhol yoziladi. O'qish tez, lekin yozish biroz sekinlashadi.
4. **Write-Behind (Write-Back):** Ma'lumot avval tezkorlik bilan keshga yoziladi, ma'lum vaqt o'tganidan keyin navbat orqali bazaga asinxron sinxronizatsiya qilinadi. Bazani o'ta tez yozishga yordam beradi, lekin server o'chib qolsa ma'lumot yo'qolish xavfi bor.

### Redis arxitekturasi va Single-Threaded ishlashi
Redis **Single-Threaded** (bir oqimli) tizimdir. U barcha so'rovlarni navbatma-navbat bajaradi.
* **Nega tez ishlaydi?** Chunki u CPU-ni oqimlararo almashtirish (context switching) va lock (qulflash) operatsiyalari bilan charchatmaydi. Eng asosiysi, u to'liq operativ xotirada (RAM) ishlaydi va non-blocking I/O (Multiplexing) yordamida soniyasiga 100,000+ so'rovni bajara oladi.

### Keshni tozalash qoidalari (Eviction Policies)
Xotira to'lib ketganda Redis eski ma'lumotlarni o'chirishni boshlaydi. Buning bir nehcha algoritmlari bor:
* **LRU (Least Recently Used):** Eng uzoq vaqt davomida ishlatilmagan (eskirgan) elementlar o'chiriladi.
* **LFU (Least Frequently Used):** Eng kam chastotada (kam marta) chaqirilgan elementlar o'chiriladi.
* **FIFO (First In, First Out):** Birinchi bo'lib keshga kirgan element birinchi o'chiriladi.
* **Volatile-TTL:** Faqat TTL (yashash muddati) berilgan kalitlar orasidan eng kam muddati qolganini o'chirish.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Keshni Yangilay Olmaslik (Stale Data / Cache Invalidation)
Ma'lumotlar bazasida profil yoki narx o'zgarganda keshni yangilamaslik (yoki o'chirmaslik). Natijada foydalanuvchiga eski ma'lumotlar ko'rinib qoladi.
* *Tuzatish:* Bazada ma'lumot o'zgarishi bilan mos kesh kalitini \`redis.del(key)\` orqali o'chirib tashlang.

### 2. Kesh Bo'roni (Cache Stampede / Dog-piling)
Keshning TTL muddati tugashi bilan (masalan, eng ko'p kiriladigan bosh sahifa kesh muddati tugaganda) parallel ravishda minglab so'rovlar bazaga borib, bazani qotirib qo'yishi.
* *Tuzatish:* Kesh muddatini tasodifiy kichik sonlar bilan o'zgartirish (Jitter) yoki kesh tugashidan oldin orqa fonda asinxron yangilab borish.

### 3. Keshga TTL (Time To Live) bermaslik
Keshga yozilgan ma'lumotlarga yashash muddatini belgilamaslik xotirani tezda to'ldiradi va server qotishiga sabab bo'ladi.
* *Tuzatish:* Har doim oqilona TTL qo'ying (masalan, 15 daqiqa yoki 1 soat).

---

## 5. 💬 12 ta Intervyu Savollari

**1. Cache Hit va Cache Miss nima?**
Javob: Cache Hit — so'ralgan ma'lumot keshda topilishi va tez qaytarilishi. Cache Miss — ma'lumot keshda topilmay bazaga so'rov yuborilishi.

**2. Nima uchun Redis-ni oddiy obyektdan (Node.js global variable) kesh sifatida afzal ko'rishadi?**
Javob: Chunki ob'ekt faqat bitta Node.js jarayoni xotirasida yashaydi. Agar gorizontal kengaytirilsa, har bir serverda alohida kesh bo'lib qoladi. Redis esa markazlashtirilgan bo'lib, barcha serverlar uchun yagona manbadir.

**3. Redis single-threaded bo'lsa, qanday qilib o'ta yuqori tezlikka erishadi?**
Javob: Non-blocking I/O multiplexing yordamida va ma'lumotlar xotirada (RAM) saqlangani sababli diskka yozish kechikishlaridan xoli bo'ladi.

**4. Redis-da ma'lumotlarni doimiy (persistent) saqlash mumkinmi?**
Javob: Ha, RDB (Redis Database snapshots) va AOF (Append Only File) mexanizmlari orqali ma'lumotlarni diskka yozib borish mumkin.

**5. Cache Invalidation (Keshni tozalash) nima va u nega qiyin?**
Javob: Bu bazadagi ma'lumotlar yangilanganda keshdagi nusxasini ham o'chirish yoki yangilashdir. Qiyinligi — tizimning barcha qismlarida sinxronlikni ta'minlashda.

**6. Redis-dagi Hash ma'lumot turining oddiy String-dan afzalligi nimada?**
Javob: Hash obyekt shaklidagi ma'lumotlarni saqlaydi va uning faqat bitta maydonini (field) butun obyektni qayta yozmasdan o'zgartirish imkonini beradi. Xotirani ham tejaydi.

**7. Kesh Penetratsiyasi (Cache Penetration) nima va uni qanday hal qilish mumkin?**
Javob: Bazada umuman mavjud bo'lmagan kalitlarni (masalan, salbiy ID-lar) qayta-qayta so'rash orqali bazaga yuklama verish. Yechim: Mavjud bo'lmagan kalitlarni ham qisqa muddatga (masalan, null qiymat bilan) keshlab qo'yish yoki Bloom Filter ishlatish.

**8. LRU va LFU kesh o'chirish qoidalarining farqi nimada?**
Javob: LRU eng uzoq vaqt ishlatilmagan kalitni o'chiradi. LFU esa eng kam chastotada (kam martaba) ishlatilgan kalitni o'chiradi.

**9. Redis-da \`SETEX\` va \`SET\` buyruqlarining farqi nimada?**
Javob: \`SET\` kalit qiymatini yozadi. \`SETEX\` esa qiymat yozish bilan birga uning yashash muddatini (TTL soniyalarda) atomar tarzda belgilaydi.

**10. Redis-ni Message Queue (Xabarlar navbati) sifatida ishlatsa bo'ladimi?**
Javob: Ha, Redis List (\`LPUSH\`/\`RPOP\`), Pub/Sub mexanizmi yoki zamonaviy Redis Streams yordamida navbatlarni tashkil qilish mumkin.

**11. Nima uchun kesh sifatida sessiyalarni saqlaganda xavfsizlikka e'tibor berish kerak?**
Javob: Chunki sessiya ma'lumotlari foydalanuvchining shaxsiy ma'lumotlari yoki tokenlarini saqlaydi. Redis xavfsiz tarmog'ida bo'lishi va tashqi dunyoga ochiq bo'lmasligi shart.

**12. Cache Avalanche (Kesh ko'chkisi) nima?**
Javob: Bir vaqtning o'zida juda ko'p kesh kalitlarining TTL muddati tugashi yoki Redis serverining o'chib qolishi natijasida barcha so'rovlarning bir lahzada bazaga borib, uni yiqitishi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar bo'limida siz quyidagi vazifalarni bajarasiz:
1. Vaqtinchalik keshni simulyatsiya qiluvchi sodda JavaScript sinfi yoki funksiyasini yozish.
2. LRU kesh cheklovini hisobga oluvchi mexanizm yaratish.
3. Express middleware uchun Cache-Aside wrapper funksiyasini qurish.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi quizzes bo'limida 12 ta test orqali bilimlaringizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Katta yuklamali internet do'kon uchun Cache-Aside yechimi
Agar saytingizga soniyasiga 5000 so'rov kelsa va har bir so'rov ma'lumotlar bazasiga SQL \`JOIN\` so'rovi yuborsa, baza tezda qulaydi. Quyidagi wrapper yordamida har qanday asinxron ma'lumot olish funksiyasini avtomatik keshlovchi wrapper yaratish mumkin:

\`\`\`javascript
async function getCachedData(redis, key, ttl, fetchFunction) {
  // 1. Keshdan qidirish
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Keshda bo'lmasa, ma'lumotni asil manbadan olish
  const freshData = await fetchFunction();

  // 3. Keshga yozish
  if (freshData) {
    await redis.setEx(key, ttl, JSON.stringify(freshData));
  }

  return freshData;
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

Quyida Cache-Aside strategiyasi qanday ishlashi ko'rsatilgan:

\`\`\`mermaid
sequenceDiagram
    autonumber
    Foydalanuvchi->>Ilova (Backend): Mahsulot ma'lumotini so'rash
    Ilova (Backend)->>Kesh (Redis): Keshda bormi? (GET product:123)
    alt Cache Hit (Keshda bor)
        Kesh (Redis)-->>Ilova (Backend): Mahsulot ma'lumoti
        Ilova (Backend)-->>Foydalanuvchi: Tezkor javob (1-5ms)
    else Cache Miss (Keshda yo'q)
        Kesh (Redis)-->>Ilova (Backend): Null / Topilmadi
        Ilova (Backend)->>Baza (SQL/NoSQL): So'rov yuborish (SELECT * FROM products...)
        Baza (SQL/NoSQL)-->>Ilova (Backend): Mahsulot ma'lumoti (50-200ms)
        Ilova (Backend)->>Kesh (Redis): Ma'lumotni keshga yozish (SETEX product:123 3600)
        Ilova (Backend)-->>Foydalanuvchi: Javob qaytarish
    end
\`\`\`

---

## 10. 📌 Cheat Sheet

### Asosiy Redis buyruqlari

| Buyruq | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`SET key val\` | Kalitga qiymat yozish | \`SET user:1 "Ali"\` |
| \`GET key\` | Kalit qiymatini o'qish | \`GET user:1\` |
| \`DEL key\` | Kalitni keshdan o'chirish | \`DEL user:1\` |
| \`EXISTS key\` | Kalit borligini tekshirish | \`EXISTS user:1\` |
| \`EXPIRE key sec\` | Kalitga yashash muddati berish | \`EXPIRE user:1 60\` |
| \`SETEX key sec val\` | Yashash muddati bilan yozish | \`SETEX user:1 60 "Ali"\` |
| \`TTL key\` | Qolgan yashash vaqtini bilish | \`TTL user:1\` |
| \`FLUSHALL\` | Barcha keshni tozalash | \`FLUSHALL\` |
`,
  exercises: [
  {
    "id": 1,
    "title": "1️⃣ Redis-like in-memory cache",
    "instruction": "Sodda vaqtinchalik keshni simulyatsiya qiluvchi `InMemoryCache` klassini yozing. U `set(key, value, ttlMs)` va `get(key)` metodlariga ega bo'lsin. Agar `ttlMs` (millisekundlarda yashash muddati) berilgan bo'lsa, belgilangan vaqt o'tgandan keyin kalit o'chib ketsin (ya'ni `get` qilganda `null` qaytsin).",
    "startingCode": "class InMemoryCache {\n  constructor() {\n    this.cache = new Map();\n  }\n\n  set(key, value, ttlMs) {\n    // Kodni shu yerda yozing\n  }\n\n  get(key) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "Map ichida qiymat bilan birga tugash vaqtini (Date.now() + ttlMs) saqlang. get() chaqirilganda hozirgi vaqt tugash vaqtidan o'tgan bo'lsa, kalitni o'chirib null qaytaring.",
    "test": "if (typeof InMemoryCache !== 'function') return 'InMemoryCache klass emas';\nconst c = new InMemoryCache();\nc.set('a', 42, 50);\nif (c.get('a') !== 42) return 'Qiymat to\\'g\\'ri saqlanmadi';\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (c.get('a') === null) resolve(null);\n    else resolve('Muddati o\\'tgan kesh o\\'chirilmadi');\n  }, 60);\n});"
  },
  {
    "id": 2,
    "title": "2️⃣ LRU Eviction Cache",
    "instruction": "Sig'imi cheklangan `LRUCache` klassini yozing. Yangi element qo'shganda sig'im to'lgan bo'lsa, eng uzoq vaqt ishlatilmagan (least recently used) elementni o'chirib tashlasin. `get(key)` va `put(key, value)` metodlari bo'lsin.",
    "startingCode": "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  get(key) {\n    // Kodni shu yerda yozing\n  }\n\n  put(key, value) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "JavaScript Map obyekti kalitlar tartibini saqlaydi. get() qilinganda kalitni o'chirib qayta qo'shish orqali eng oxiriga o'tkaziladi. O'chirish uchun esa map.keys().next().value orqali birinchi (eng eski) kalitni topsa bo'ladi.",
    "test": "if (typeof LRUCache !== 'function') return 'LRUCache klass emas';\nconst lru = new LRUCache(2);\nlru.put(1, 'bir');\nlru.put(2, 'ikki');\nlru.get(1);\nlru.put(3, 'uch');\nif (lru.get(2) !== undefined && lru.get(2) !== null) return 'Eng eski element o\\'chib ketmadi';\nif (lru.get(1) !== 'bir' || lru.get(3) !== 'uch') return 'Elementlar noto\\'g\\'ri saqlangan';\nreturn null;"
  },
  {
    "id": 3,
    "title": "3️⃣ Cache-Aside Wrapper",
    "instruction": "Asinxron `cacheAside(redisMock, key, fetchFn, ttl)` funksiyasini yozing. U keshda ma'lumot bo'lsa darhol qaytarsin. Agar keshda bo'lmasa, `fetchFn()` orqali bazadan ma'lumotni olsin, uni keshga `redisMock.set(key, value, ttl)` yordamida yozsin va natijani qaytarsin.",
    "startingCode": "async function cacheAside(redisMock, key, fetchFn, ttl) {\n  // Kodni shu yerda yozing\n}",
    "hint": "await redisMock.get(key) orqali keshni tekshiring. Topilsa qaytaring, topilmasa fetchFn() chaqirib, uning natijasini set qiling va qaytaring.",
    "test": "if (typeof cacheAside !== 'function') return 'cacheAside funksiya emas';\nlet dbCalls = 0;\nconst dbFetch = async () => { dbCalls++; return 'data_from_db'; };\nconst mockStore = {};\nconst redisMock = {\n  get: async (k) => mockStore[k] || null,\n  set: async (k, v, t) => { mockStore[k] = v; }\n};\nreturn cacheAside(redisMock, 'item', dbFetch, 60).then(res1 => {\n  if (res1 !== 'data_from_db' || dbCalls !== 1) return 'Birinchi chaqiriq xato';\n  return cacheAside(redisMock, 'item', dbFetch, 60).then(res2 => {\n    if (res2 !== 'data_from_db' || dbCalls !== 1) return 'Keshdan o\\'qish o\\'rniga yana bazaga borildi';\n    return null;\n  });\n});"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Keshlash (Caching) ning eng asosiy maqsadi nima?",
    "options": [
      "Ma'lumotlarni xavfsiz shifrlab saqlash",
      "Tez-tez so'raladigan og'ir ma'lumotlarni RAM kabi tezkor xotiraga vaqtinchalik yozib, tizim tezligini oshirish va bazaga yuklamani kamaytirish",
      "Serverni yangi operatsion tizimga o'tkazish",
      "Veb-sahifa dizaynini chiroyli va qulay qilish"
    ],
    "correctAnswer": 1,
    "explanation": "Keshlash tez-tez o'qiladigan og'ir so'rovlar natijasini tezkor RAM xotirasiga saqlash orqali bazaga qayta-qayta murojaat qilishni oldini oladi va javob tezligini oshiradi."
  },
  {
    "id": 2,
    "question": "Redis qanday ma'lumotlar bazasi hisoblanadi?",
    "options": [
      "SQL relyatsion ma'lumotlar bazasi",
      "RAM-da o'ta tezkor ishlaydigan Key-Value (kalit-qiymat) in-memory kesh tizimi va bazadir",
      "Faqat diskda fayllar saqlaydigan arxiv tizimi",
      "Hujjatlarga asoslangan NoSQL MongoDB analogi"
    ],
    "correctAnswer": 1,
    "explanation": "Redis in-memory (tezkor xotirada ishlaydigan) kalit-qiymat ma'lumotlar do'konidir va asosan kesh yuritishda qo'llaniladi."
  },
  {
    "id": 3,
    "question": "Keshda saqlanayotgan ma'lumotlarning yashash muddati nima deyiladi?",
    "options": [
      "DNS (Domain Name System)",
      "CORS (Cross-Origin Resource Sharing)",
      "TTL (Time To Live)",
      "API Gateway Lifetime"
    ],
    "correctAnswer": 2,
    "explanation": "TTL (Time To Live) ma'lumotning keshda qancha soniya yoki millisekund davomida saqlanishini belgilaydi."
  },
  {
    "id": 4,
    "question": "Cache-Aside (Lazy Loading) strategiyasi qanday ishlaydi?",
    "options": [
      "Har doim faqat bazadan o'qiladi, keshga yozilmaydi",
      "Avval kesh tekshiriladi, topilmasa bazadan o'qilib, keshga yoziladi va qaytariladi",
      "Ma'lumot faqat keshga yoziladi va bazaga hech qachon yozilmaydi",
      "Har doim kesh va baza parallel o'chiriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Cache-Aside uslubida ilova keshni o'qiydi (hit bo'lsa darhol qaytaradi), agar ma'lumot keshda bo'lmasa (miss), bazadan olib keshga yozib qo'yadi."
  },
  {
    "id": 5,
    "question": "Redis single-threaded bo'lishiga qaramay nega juda tez ishlaydi?",
    "options": [
      "Chunki u faqat bitta kompyuterda ishlay oladi",
      "Chunki u to'liq operativ xotirada (RAM) ishlaydi va non-blocking I/O multiplexing ishlatadi",
      "Chunki u barcha so'rovlarni diskka yozadi",
      "Chunki u ko'p yadroli protsessorni to'liq band qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "Redis RAM-da ishlashi va I/O multiplexing (non-blocking) ishlatishi tufayli CPU oqimlarini almashtirish kechikishlarisiz o'ta tez ishlaydi."
  },
  {
    "id": 6,
    "question": "Redis-da ma'lumotlarni saqlash muddati (TTL) bilan birga yozish uchun qaysi buyruq qo'llaniladi?",
    "options": [
      "`SET`",
      "`SETEX`",
      "`GET`",
      "`EXISTS`"
    ],
    "correctAnswer": 1,
    "explanation": "`SETEX` buyrug'i qiymatni keshga yozish bilan bir qatorda uning yashash muddatini (expiry in seconds) atomar tarzda belgilaydi."
  },
  {
    "id": 7,
    "question": "Kesh to'lib ketganda, eng uzoq vaqt davomida ishlatilmagan elementlarni o'chirish algoritmi qaysi?",
    "options": [
      "FIFO (First In First Out)",
      "LRU (Least Recently Used)",
      "LFU (Least Frequently Used)",
      "Random Eviction"
    ],
    "correctAnswer": 1,
    "explanation": "LRU (Least Recently Used) eng uzoq vaqt so'ralmagan (kirilmagan) elementlarni birinchi bo'lib keshdan chiqarib tashlaydi."
  },
  {
    "id": 8,
    "question": "Cache Stampede (Kesh bo'roni/shovqini) muammosi qanday yuz beradi?",
    "options": [
      "Kesh kaliti o'chirilganda server o'chib qolsa",
      "Kesh muddati (TTL) tugashi bilan parallel ravishda juda ko'p so'rovlar bir vaqtda bazaga yuborilganda",
      "Redis-da xotira to'lib qolganda",
      "Redis-ga noto'g'ri parol kiritilganda"
    ],
    "correctAnswer": 1,
    "explanation": "Kesh muddati tugagani uchun barcha parallel so'rovlar keshdan o'tolmay, birdaniga bazaga yuklama bersa, bu Cache Stampede deyiladi."
  },
  {
    "id": 9,
    "question": "Sessiyalarni (Sessions) Redis keshda saqlashning eng katta foydasi nimada?",
    "options": [
      "Xavfsiz HTTP sarlavhalarini tekshirish",
      "Gorizontal kengaytirilgan (Horizontal scaling) serverlarda foydalanuvchi qaysi serverga bormasin sessiya uzilib qolmasligi",
      "SQL injection hujumlarining oldini olish",
      "Statik rasmlarni avtomatik siqish"
    ],
    "correctAnswer": 1,
    "explanation": "Sessiyalarni Redis-da markazlashtirib saqlash orqali har qaysi backend server foydalanuvchini muvaffaqiyatli autentifikatsiya qila oladi."
  },
  {
    "id": 10,
    "question": "Redis Hash (HSET/HGET) ma'lumot turidan qanday maqsadda foydalaniladi?",
    "options": [
      "Faqat sonli qiymatlarni hisoblash uchun",
      "Obyekt ko'rinishidagi ma'lumotlarni saqlash va ularning alohida maydonlarini o'qish/yozish uchun",
      "Cheksiz matnlarni saqlash uchun",
      "Faqat ro'yxatlarni saqlash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Hash kalit ostida maydon-qiymat (field-value) juftliklarini (xuddi JS obyektidek) saqlashga imkon beradi va xotirani tejaydi."
  },
  {
    "id": 11,
    "question": "Cache Invalidation (Keshni tozalash) nima?",
    "options": [
      "Keshga noto'g'ri ma'lumot turlarini yozish",
      "Bazadagi ma'lumot o'zgarganda keshdagi eski nusxasini yangilash yoki o'chirish jarayoni",
      "Kesh tezligini oshiruvchi yangi algoritm",
      "Redis serverini qayta ishga tushirish"
    ],
    "correctAnswer": 1,
    "explanation": "Bazada ma'lumot o'zgarganda keshdagi ma'lumot eskiradi. Uni tozalash yoki yangilash jarayoni Cache Invalidation deb nomlanadi."
  },
  {
    "id": 12,
    "question": "Redis-da barcha kesh ma'lumotlarini butunlay o'chirib tashlash uchun qaysi buyruq ishlatiladi?",
    "options": [
      "`DEL ALL`",
      "`FLUSHALL`",
      "`REMOVE`",
      "`CLEAR`"
    ],
    "correctAnswer": 1,
    "explanation": "`FLUSHALL` buyrug'i Redis-dagi barcha ma'lumotlarni va kalitlarni to'liq o'chirib tashlaydi."
  }
]

};
