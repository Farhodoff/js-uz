export const rateLimitingSecurity = {
  id: "rateLimitingSecurity",
  title: "Rate Limiting va API Xavfsizligi (Rate Limiting & API Security)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Rate Limiting nima?
**Rate Limiting (So'rovlar sonini cheklash)** — bu tizimga (API, veb-server) ma'lum vaqt oralig'ida bitta foydalanuvchi yoki IP manzilidan keladigan so'rovlar miqdorini cheklash mexanizmidir. Bu tizimni yuklamadan (DDoS hujumlaridan), spam va botlardan himoya qilish hamda resurslarni adolatli taqsimlash uchun zarur.

### Real hayotiy analogiya
Tasavvur qiling, siz **tungi klub eshigidagi qo'riqchisiz (Bouncer)**:
* Klub ichiga har daqiqada faqat 10 ta odam kirishi mumkin. Eshik tagida esa 100 kishilik navbat bor.
* Agar 11-odam kirmoqchi bo'lsa, siz unga: "Iltimos, kutib turing, keyingi daqiqada kirasiz" deysiz (bu HTTP 429 Too Many Requests status kodiga teng).
* Agar kimdir juda tez-tez va asabiy tarzda eshikni taqillatsa, siz uni butunlay bloklab qo'yasiz (DDoS himoyasi / IP Ban).

---

## 2. 💻 Real Kod Misollari

### 1. Express.js-da sodda Rate Limiting (express-rate-limit)
Eng oson yo'li tayyor middleware-dan foydalanish:

\`\`\`javascript
import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();

// IP manzillarni reverse proxy (Nginx/Cloudflare) ortidan to'g'ri o'qish uchun:
app.set('trust proxy', 1);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100, // Har bir IP uchun maksimal 100 ta so'rov
  message: {
    status: 429,
    error: "Juda ko'p so'rov yuborildi. Iltimos, 15 daqiqadan so'ng qayta urinib ko'ring."
  },
  standardHeaders: true, // X-RateLimit-Limit va X-RateLimit-Remaining headerlarini qaytarish
  legacyHeaders: false, // X-Headers eskirgan usulni o'chirish
});

// Cheklovni faqat API yo'nalishlariga qo'llash
app.use('/api/', apiLimiter);
\`\`\`

### 2. Redis yordamida Sliding Window Counter (Distributed Rate Limiting)
Redis-ning ZSET (Sorted Set) ma'lumot turi yordamida aniq vaqt oynali (sliding window) cheklovchi yozish:

\`\`\`javascript
import { createClient } from 'redis';
const redis = createClient();
await redis.connect();

async function isRateLimited(ip, limit, windowMs) {
  const key = \`rate_limit:\${ip}\`;
  const now = Date.now();
  const clearBefore = now - windowMs;

  // 1. Oynadan tashqaridagi (eskirgan) so'rovlarni o'chiramiz
  await redis.zRemRangeByScore(key, 0, clearBefore);

  // 2. Ushbu oynadagi umumiy so'rovlar sonini olamiz
  const requestCount = await redis.zCard(key);

  if (requestCount >= limit) {
    return true; // Limit to'lgan
  }

  // 3. Yangi so'rov vaqtini ro'yxatga qo'shamiz (score va member sifatida vaqt ishlatiladi)
  await redis.zAdd(key, { score: now, value: now.toString() });
  
  // 4. Kalitga avtomatik o'chish muddati (TTL) beramiz
  await redis.expire(key, Math.ceil(windowMs / 1000));
  
  return false;
}
\`\`\`

### 3. API Security & Helmet (Headers himoyasi)
API xavfsizligini ta'minlash uchun HTTP sarlavhalarini to'g'ri sozlash kerak:

\`\`\`javascript
import helmet from 'helmet';

// X-Powered-By, XSS-Protection va boshqa muhim headerlarni sozlash
app.use(helmet());

// CORS sozlamalarini xavfsiz qilish
import cors from 'cors';
app.use(cors({
  origin: 'https://ishonchli-sayt.uz', // '*' qo'ymang!
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Rate Limiting Algoritmlari

1. **Token Bucket (Token chelagi):**
   * Chelakda maksimal miqdordagi tokenlar saqlanadi (masalan, 10).
   * Har bir so'rov kelganda bitta token chelakdan olinadi. Agar token qolmagan bo'lsa, so'rov rad etiladi.
   * Tokenlar ma'lum bir tezlikda (masalan, har soniyada 2 ta) avtomatik ravishda to'ldirib boriladi.
   * *Afzalligi:* To'satdan keladigan qisqa muddatli yuklamalarni (burst traffic) yaxshi qabul qiladi.

2. **Leaky Bucket (Teshik chelak):**
   * Chelakning ostida kichik teshik bor va undan suv (so'rovlar) doimiy, bir tekis tezlikda oqib chiqadi.
   * Kiruvchi so'rovlar chelakning ustidan quyiladi (navbatga yig'iladi).
   * Agar chelak to'lib ketsa (navbat to'lsa), yangi so'rovlar darhol rad etiladi.
   * *Afzalligi:* Tizimga yuklamani to'liq tekislaydi (smooth traffic).

3. **Fixed Window Counter (Ruxsat etilgan oyna hisoblagichi):**
   * Vaqt oynalarga bo'linadi (masalan, 13:00 dan 13:01 gacha). Har bir oynada hisoblagich bor.
   * *Kamchiligi:* Oyna chegaralarida (masalan, 13:00:59 va 13:01:01 da) limitdan 2 barobar ko'p so'rov kelishi mumkin (boundary spike).

4. **Sliding Window Log (Sirpanuvchi oyna jurnali):**
   * Har bir so'rovning aniq vaqti (timestamp) saqlanadi.
   * So'rov kelganda, \`[now - window, now]\` oralig'idagi barcha yozuvlar sanaladi. Juda aniq, lekin xotirani ko'p yeydi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Local Memory-da Rate Limit saqlash (Cluster/Multi-node muammosi)
\`express-rate-limit\`ni standart xotirada qoldirish. Agar backend 3 ta serverda (instance) ishlasa, kesh sinxron bo'lmaydi va foydalanuvchi har bir serverdan alohida limit oladi.
* *Tuzatish:* RedisStore kabi taqsimlangan (distributed) kesh do'konini ulang.

### 2. Reverse Proxy ortida \`trust proxy\`ni unutish
Agar server Nginx yoki Cloudflare ortida bo'lsa va \`trust proxy\` sozlanmagan bo'lsa, barcha so'rovlar serverga proxy IP manzilidan kelgandek ko'rinadi va butun tizim barcha foydalanuvchilarni bitta IP deb hisoblab bloklab qo'yadi.
* *Tuzatish:* \`app.set('trust proxy', true)\` sozlamasini yoqing.

### 3. HTTP Status kodlarini noto'g'ri qaytarish
Limit tugaganda \`500 Internal Error\` yoki shunchaki \`403 Forbidden\` qaytarish.
* *Tuzatish:* Standart bo'yicha \`429 Too Many Requests\` status kodini qaytaring.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Rate limiting nima va u nima uchun kerak?**
Javob: Server resurslarini DDoS hujumlaridan, botlar faolligidan, spam va bevosita yuklamalardan himoya qilish uchun so'rovlar sonini cheklash.

**2. Token Bucket va Leaky Bucket-ning asosiy farqi nimada?**
Javob: Token Bucket qisqa muddatli to'satdan yuklamalarni (burst requests) o'tkaza oladi, Leaky Bucket esa chiqish so'rovlarini qat'iy va bir tekis (constant rate) tezlikda boshqaradi.

**3. Fixed Window va Sliding Window farqi nimada?**
Javob: Fixed Window statik vaqt oralig'idan foydalanadi (chegaradagi yuklama xavfi bor). Sliding Window esa oxirgi soniyalarni real vaqt rejimida hisoblab boradi.

**4. 429 Too Many Requests status kodi bilan birga qaysi header yuborilishi tavsiya etiladi?**
Javob: \`Retry-After\` sarlavhasi (saniyada yoki HTTP-date ko'rinishida), u mijozga qachon qayta urinib ko'rish mumkinligini aytadi.

**5. Distributed Rate Limiting nima?**
Javob: Bir nechta klaster serverlarida rate limit holatini yagona va umumiy saqlash (masalan, Redis yordamida).

**6. Cloudflare kabi CDN tizimlari qanday yordam beradi?**
Javob: Ular so'rovlarni hali sizning backend serveringizga yetib kelmasdan oldin tarmoq (edge) darajasida cheklaydi va DDoS-ni qaytaradi.

**7. Nima uchun rate limitda IP manzilga tayanish har doim ham megamil yechim emas?**
Javob: Chunki bitta ofis yoki uy tarmog'idagi yuzlab foydalanuvchilar bitta umumiy NAT IP manzilidan chiqishadi. Yechim: API Token yoki foydalanuvchi ID-sini ham qo'shib hisoblash.

**8. Nginx-da rate limiting qanday sozlanadi?**
Javob: \`limit_req_zone\` va \`limit_req\` direktivalari yordamida Nginx darajasida so'rovlar tezligini cheklash mumkin.

**9. API Gateway-da rate limiting o'rnatishning afzalligi nimada?**
Javob: Har bir mikroservis o'zida rate limit kodini yozishi shart bo'lmaydi, kirish darvozasining o'zida global cheklovlar o'rnatiladi.

**10. Redis-da sliding window rate limit jurnallarini tozalash qanday optimallashtiriladi?**
Javob: Har bir yangi so'rov yozilayotganda \`ZREMRANGEBYSCORE\` buyrug'i orqali eski so'rovlar tarixi o'chiriladi.

**11. WAF (Web Application Firewall) nima?**
Javob: Bu API-ga kelayotgan zararli trafikni (SQL Injection, XSS, botlar) filtrlovchi va xavfsizlik qoidalarini qo'llovchi tarmoq devoridir.

**12. CORS siyosati nima va uni qanday xavfsiz sozlash kerak?**
Javob: Brauzerda begona domenlardan resurslar so'rash ruxsati. Ishlab chiqarishda Origin qiymatiga \`*\` qo'ymaslik, aniq domenlarni ko'rsatish lozim.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar bo'limida siz quyidagi vazifalarni bajarasiz:
1. Vaqt bo'yicha to'lib boruvchi \`TokenBucket\` klassini yaratish.
2. Sirpanuvchi oyna printsipida ishlaydigan \`SlidingWindowCounter\` klassini yozish.
3. API so'rovlari uchun limit ma'lumotlarini o'z ichiga olgan sarlavhalar generatorini tuzish.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi testlar orqali bilimingizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### Redis va Lua Script yordamida Atomar Rate Limiting
Redis-da distributed tizimlar uchun race condition (poyga holati) yuzaga kelmasligi uchun Lua skriptlaridan foydalaniladi. Skript Redis serveri ichida bitta atomar amal sifatida bajariladi:

\`\`\`lua
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 > limit then
    return 0
else
    redis.call("INCRBY", key, 1)
    if current == 0 then
        redis.call("EXPIRE", key, 60) -- 1 daqiqa
    end
    return 1
end
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

Quyada Token Bucket algoritmining ishlash tartibi tasvirlangan:

\`\`\`mermaid
flowchart TD
    Req([Kiruvchi So'rov]) --> Bucket{Chelakda token bormi?}
    Bucket -- Ha --> Take[Tokenni olamiz]
    Take --> Process[So'rovni bajarish - 200 OK]
    Bucket -- Yo'q --> Reject[Rad etish - 429 Too Many Requests]
    
    Refill([Refiller Taymer]) --> AddToken[Chelakka yangi token qo'shish]
    AddToken --> CapCheck{Sig'imdan oshib ketdimi?}
    CapCheck -- Yo'q --> Keep[Tokenda qoladi]
    CapCheck -- Ha --> Discard[Ortiqcha tokenni tashlab yuborish]
\`\`\`

---

## 10. 📌 Cheat Sheet

### Rate Limiting Headerlar Standarti

| Sarlavha (Header) | Tavsifi | Misol |
| :--- | :--- | :--- |
| \`X-RateLimit-Limit\` | Oynada ruxsat etilgan maksimal so'rovlar | \`100\` |
| \`X-RateLimit-Remaining\` | Joriy oynada qolgan so'rovlar soni | \`45\` |
| \`X-RateLimit-Reset\` | Limitlar qachon to'liq tiklanishi (Unix epoch vaqti) | \`1686580000\` |
| \`Retry-After\` | Qayta urinish uchun kutish muddati (soniya yoki sana) | \`120\` |`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Token Bucket Rate Limiter",
      instruction: "Vaqtga bog'liq ravishda tokenlarni to'ldirib boruvchi `TokenBucket` klassini yozing. Metodlar: `take()`. Har safar `take()` chaqirilganda, o'tgan millisekundlar hisobidan tokenlarni to'ldiring (maksimal `capacity`gacha) va bitta token oling. Token bo'lsa `true`, bo'lmasa `false` qaytaring.",
      startingCode: "class TokenBucket {\n  constructor(capacity, refillRatePerMs) {\n    this.capacity = capacity;\n    this.refillRate = refillRatePerMs; // millisekundiga nechta token qo'shilishi\n    this.tokens = capacity;\n    this.lastRefill = Date.now();\n  }\n\n  take() {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Hozirgi vaqt va lastRefill farqini toping. Uni refillRate ga ko'paytirib, mavjud tokenlarga qo'shing va Math.min(capacity, tokens) qilib cheklang. lastRefill-ni hozirgi vaqtga yangilang.",
      test: "if (typeof TokenBucket !== 'function') return 'TokenBucket klass emas';\nconst bucket = new TokenBucket(3, 0.1); // 10ms da 1 token to'ladi\nif (!bucket.take() || !bucket.take() || !bucket.take()) return 'Dastlabki tokenlar berilmadi';\nif (bucket.take()) return 'Tokenlar tugagach ham ruxsat berildi';\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (bucket.take() === true) resolve(null);\n    else resolve('Kutilgan vaqtdan keyin token to\\'lmadi');\n  }, 15);\n});"
    },
    {
      id: 2,
      title: "2️⃣ Sliding Window Counter",
      instruction: "Foydalanuvchining IP manzili bo'yicha `SlidingWindowCounter` klassini yozing. Konstruktorda `limit` va `windowMs` qabul qiladi. `allowRequest(ip)` metodi joriy vaqtdan `windowMs` millisekund oldingi vaqt oralig'ida so'rovlar soni `limit`dan oshmagan bo'lsa `true` qaytarib so'rovni qo'shsin, aks holda `false` qaytarsin.",
      startingCode: "class SlidingWindowCounter {\n  constructor(limit, windowMs) {\n    this.limit = limit;\n    this.windowMs = windowMs;\n    this.requests = new Map(); // ip -> [timestamps]\n  }\n\n  allowRequest(ip) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Map-dan ip bo'yicha massivni oling. Undan hozirgi vaqt minus windowMs dan kichik bo'lgan barcha eski timestamp-larni olib tashlang. Agar qolgan elementlar soni limitdan kichik bo'lsa, joriy vaqtni qo'shib true qaytaring.",
      test: "if (typeof SlidingWindowCounter !== 'function') return 'SlidingWindowCounter klass emas';\nconst sw = new SlidingWindowCounter(2, 50);\nif (!sw.allowRequest('1.1.1.1')) return 'Birinchi so\\'rov rad etildi';\nif (!sw.allowRequest('1.1.1.1')) return 'Ikkinchi so\\'rov rad etildi';\nif (sw.allowRequest('1.1.1.1')) return 'Limitdan oshganda ham ruxsat berildi';\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (sw.allowRequest('1.1.1.1')) resolve(null);\n    else resolve('Oyna surilgandan keyin so\\'rovga ruxsat berilmadi');\n  }, 60);\n});"
    },
    {
      id: 3,
      title: "3️⃣ API Rate Limit Headers Generator",
      instruction: "Mijozga qaytariladigan standart javob headerlarini shakllantiruvchi `generateHeaders(limit, remaining, resetTimeMs)` funksiyasini yozing. Funksiya quyidagi ob'ektni qaytarishi kerak: `{ 'X-RateLimit-Limit': ..., 'X-RateLimit-Remaining': ..., 'X-RateLimit-Reset': ... }` shaklida. Bunda `resetTimeMs` millisekunddagi vaqt Unix Epoch soniyalariga (boshiga yaxlitlangan holda) o'tkaziladi.",
      startingCode: "function generateHeaders(limit, remaining, resetTimeMs) {\n  // Kodni shu yerda yozing\n}",
      hint: "resetTimeMs millisekundni soniyaga o'tkazish uchun 1000 ga bo'ling va Math.floor yoki Math.ceil yordamida butun son qiling. Keyin ob'ekt kalitlari string qiymatga ega bo'lishini ta'minlang.",
      test: "if (typeof generateHeaders !== 'function') return 'Funksiya topilmadi';\nconst headers = generateHeaders(100, 45, 1686580000123);\nif (String(headers['X-RateLimit-Limit']) !== '100') return 'Maksimal limit noto\\'g\\'ri';\nif (String(headers['X-RateLimit-Remaining']) !== '45') return 'Qolgan limit noto\\'g\\'ri';\nif (String(headers['X-RateLimit-Reset']) !== '1686580000') return 'Reset vaqti soniyaga noto\\'g\\'ri o\\'tkazildi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Rate limiting mexanizmining eng birinchi maqsadi nima?",
      options: [
        "Foydalanuvchi ma'lumotlarini SQL Injection-dan tozalash",
        "Ma'lum vaqt oralig'ida keladigan so'rovlar sonini cheklash orqali serverni himoya qilish va yuklamani boshqarish",
        "Veb-sahifani load-balancer-lar orasida teng tarqatish",
        "API so'rovlarining HTTPS protokolidan o'tishini ta'minlash"
      ],
      correctAnswer: 1,
      explanation: "Rate Limiting ma'lum vaqt ichida mijozlardan keladigan maksimal so'rovlar sonini cheklaydi."
    },
    {
      id: 2,
      question: "Tungi klub eshigi va undagi navbat misoli rate limiting-ning qaysi algoritmiga mos keladi?",
      options: [
        "Fixed Window Counter",
        "Token Bucket",
        "Leaky Bucket",
        "Sliding Window Log"
      ],
      correctAnswer: 2,
      explanation: "Leaky Bucket algoritmi kiruvchi tartibsiz so'rovlarni navbat (chelak) orqali yig'ib, doimiy tekis tezlikda qayta ishlashga uzatadi."
    },
    {
      id: 3,
      question: "Token Bucket algoritmining Leaky Bucket-dan eng asosiy afzalligi nimada?",
      options: [
        "U ma'lumotlarni hech qachon xotirada saqlamaydi",
        "U to'satdan keladigan qisqa vaqtli yuklama to'lqinlarini (burst requests) qabul qila oladi",
        "U faqat bitta ip manzil uchun ishlaydi",
        "U faqat HTTP GET so'rovlarini cheklaydi"
      ],
      correctAnswer: 1,
      explanation: "Token Bucket-da chelak to'la bo'lsa, to'satdan kelgan ko'p sonli so'rovlar token yetarli bo'lgani uchun darhol bajarilishi mumkin."
    },
    {
      id: 4,
      question: "Rate limitga tushgan foydalanuvchiga qanday HTTP status kodi qaytariladi?",
      options: [
        "403 Forbidden",
        "429 Too Many Requests",
        "503 Service Unavailable",
        "400 Bad Request"
      ],
      correctAnswer: 1,
      explanation: "429 Too Many Requests standarti so'rovlar soni me'yoridan oshib ketganini bildirish uchun ishlatiladi."
    },
    {
      id: 5,
      question: "Fixed Window Counter algoritmining asosiy kamchiligi nima?",
      options: [
        "Unda juda ko'p xotira talab etiladi",
        "Oyna chegaralarida (boundary) yuklama 2 barobar ortib ketishi mumkin (Spike)",
        "U faqat Redis ma'lumotlar bazasida ishlaydi",
        "U tokenlarni juda sekin yangilaydi"
      ],
      correctAnswer: 1,
      explanation: "Fixed Window-da ikki oyna oralig'i chegarasida limitdan ko'proq so'rovlar o'tib ketishi (Spike) mumkin."
    },
    {
      id: 6,
      question: "Nima uchun Express rate limiter-ni gorizontal kengayuvchi (Distributed) tizimlarda Redis bilan ishlatish kerak?",
      options: [
        "Chunki Redis so'rovlarni shifrlaydi",
        "Har bir server o'z xotirasida alohida hisoblamasligi va umumiy cheklov o'rnatilishi uchun",
        "Chunki Node.js-da global o'zgaruvchilar taqiqlangan",
        "Chunki Redis keshni o'chirib yubora olmaydi"
      ],
      correctAnswer: 1,
      explanation: "Distributed kesh (masalan, Redis) ballar backend serverlari uchun yagona rate limit holatini saqlash imkonini beradi."
    },
    {
      id: 7,
      question: "Express-da reverse proxy (Nginx, Cloudflare) ortida turganda to'g'ri IP manzilni aniqlash uchun nima sozlanishi kerak?",
      options: [
        "app.set('trust proxy', true)",
        "app.use(cors())",
        "app.disable('x-powered-by')",
        "app.use(express.json())"
      ],
      correctAnswer: 0,
      explanation: "`trust proxy` sozlamasi Express-ga `X-Forwarded-For` sarlavhasidagi haqiqiy mijoz IP-siga ishonish kerakligini bildiradi."
    },
    {
      id: 8,
      question: "Sliding Window Log algoritmining eng katta kamchiligi nimada?",
      options: [
        "U juda noto'g'ri hisoblaydi",
        "Har bir so'rov vaqtini (timestamp) saqlagani uchun xotira sarfi juda yuqori bo'ladi",
        "U faqat local xotirada ishlay olami",
        "U 429 status kodini qaytara olmaydi"
      ],
      correctAnswer: 1,
      explanation: "Sliding Window Log har bir so'rov vaqtini saqlab boradi. Agar so'rovlar ko'p bo'lsa, xotira sarfi keskin oshadi."
    },
    {
      id: 9,
      question: "API sarlavhalarida 'X-RateLimit-Remaining' nimani anglatadi?",
      options: [
        "Keyingi so'rovgacha qolgan vaqtni (soniyalarda)",
        "Joriy vaqt oynasida foydalanuvchida qolgan ruxsat etilgan so'rovlar sonini",
        "Umumiy taqiqlangan IP manzillar sonini",
        "Foydalanuvchi yuborgan jami so'rovlar hajmini"
      ],
      correctAnswer: 1,
      explanation: "Remaining sarlavhasi joriy oyna tugaguncha foydalanuvchi yana nechta so'rov yuborishi mumkinligini ko'rsatadi."
    },
    {
      id: 10,
      question: "API xavfsizligini ta'minlash uchun HTTP sarlavhalarini avtomatik sozlovchi mashhur Express middleware qaysi?",
      options: [
        "cors",
        "helmet",
        "morgan",
        "dotenv"
      ],
      correctAnswer: 1,
      explanation: "`helmet` middleware-i turli xil zararli hujumlarning oldini olish uchun xavfsiz HTTP header-larni o'rnatadi."
    },
    {
      id: 11,
      question: "DDoS hujumlaridan himoyalanish uchun eng samarali joy qayer hisoblanadi?",
      options: [
        "Ma'lumotlar bazasi darajasi",
        "Faqat serverning middleware qatlami",
        "Tarmoq chekkasi (Edge network / CDN darajasi, masalan, Cloudflare)",
        "Brauzerning localStorage qismi"
      ],
      correctAnswer: 2,
      explanation: "DDoS hujumlarini serverga yetib kelmasdan avval tarmoq darvozasida (Edge/CDN darajasida) to'xtatish eng samarali yo'ldir."
    },
    {
      id: 12,
      question: "Distributed rate limiter-da 'Race Condition' (poyga holati) oldini olish uchun Redis-da nima qo'llaniladi?",
      options: [
        "Faqat oddiy `GET` va `SET` buyruqlari",
        "Redis-ning atomar Lua skriptlari yoki tranzaksiyalari",
        "Redis cluster replikatsiyasini o'chirish",
        "Ma'lumotlarni string ko'rinishida saqlash"
      ],
      correctAnswer: 1,
      explanation: "Lua skriptlari Redis serverining o'zida atomar (yagona, bo'linmas) tarzda bajarilib, bir vaqtda kelgan parallel so'rovlar orasidagi poygani bartaraf etadi."
    }
  ]
};
