export const cdnEdgeComputing = {
  id: "cdnEdgeComputing",
  title: "CDN va Edge Computing",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### CDN (Content Delivery Network) nima?
**CDN (Kontent yetkazib berish tarmog\\'i)** — bu dunyo bo\\'ylab tarqalgan serverlar tarmog\\'i bo\\'lib, veb-saytning statik va dinamik fayllarini (rasmlar, videolar, JS/CSS fayllar, HTML) foydalanuvchiga eng yaqin joylashgan server orqali yetkazib beradi. Bu serverlar joylashgan har bir nuqta **PoP (Point of Presence)** deb ataladi.

### Real hayotiy analogiya (CDN)
Tasavvur qiling, siz **Toshkentdasiz** va **Nyu-Yorkdagi** katta onlayn do\\'kondan kitob sotib olmoqchisiz:
* **CDN-siz holat:** Kitob har safar buyurtma qilinganda Amerika omboridan Toshkentga pochtadan yuboriladi. Yetib kelishi 10 kun davom etadi (yuqori kechikish - Latency).
* **CDN-li holat:** Onlayn do\\'kon kitoblarining nusxalarini butun dunyo bo\\'ylab, shu jumladan **Toshkentdagi mahalliy kitob do\\'koniga** (PoP/Edge server) oldindan joylashtiradi. Siz kitobni buyurtma qilganingizda, u Amerika omboridan emas, balki uyingiz yaqinidagi mahalliy do\\'kondan darhol yetkaziladi (kichik kechikish - 1-2 soat yoki daqiqalar).

### Edge Computing nima?
**Edge Computing (Chekka hisoblashlar)** — bu mantiqiy kodlarni va hisob-kitoblarni markaziy serverda (Origin) emas, balki foydalanuvchiga eng yaqin bo\\'gan CDN serverlarida (Edge) bajarish texnologiyasidir. Bu xuddi mahalliy kitob do\\'konidagi sotuvchi kitobni shunchaki berib yubormay, uning ichiga sizning ismingizni yozib (dinamik mantiq) sovg\\'a qilib berishiga o\\'xshaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Edge Worker (Cloudflare Workers uslubida sodda marshrutlash va sarlavhalar)
Edge worker-da so\\'rovni tahlil qilish va maxsus sarlavhalar qo\\'shish:
\\\`\\\`\\\`javascript
// Edge Worker kiruvchi so\\'rovlarni boshqaradi
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // 1. Agar foydalanuvchi rasmlar so\\'rayotgan bo\\'lsa va brauzeri WebP qo\\'llab-quvvatlasa
  const acceptHeader = request.headers.get('Accept') || '';
  if (url.pathname.endsWith('.png') && acceptHeader.includes('image/webp')) {
    // Rasm formatini dinamik ravishda WebP ga almashtirish
    const webpUrl = request.url.replace('.png', '.webp');
    return fetch(webpUrl);
  }

  // 2. Oddiy so\\'rovlarni kesh sarlavhalari bilan qaytarish
  const response = await fetch(request);
  const newHeaders = new Headers(response.headers);
  
  // CDN keshini 1 kun (86400s), foydalanuvchi brauzerini esa 1 soat (3600s) kesh qilishga majburlash
  newHeaders.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
\\\`\\\`\\\`

### 2. Query String-larni normalizatsiya qilish (Kesh samaradorligini oshirish)
Foydalanuvchilar query parametrlarni xohlagan tartibda yozishi mumkin. Quyidagi funksiya kesh kaliti farqlanib ketishini oldini oladi:
\\\`\\\`\\\`javascript
function normalizeCacheKey(requestUrl) {
  const url = new URL(requestUrl);
  
  // Parametrlarni alifbo tartibida saralaymiz
  const sortedParams = Array.from(url.searchParams.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  
  const searchParams = new URLSearchParams();
  for (const [key, value] of sortedParams) {
    searchParams.append(key.toLowerCase(), value.toLowerCase());
  }
  
  url.search = searchParams.toString();
  return url.toString(); // Yagona tartiblangan kesh kaliti
}

const key1 = normalizeCacheKey("https://api.uz/data?b=2&a=1");
const key2 = normalizeCacheKey("https://api.uz/data?a=1&b=2");
console.log(key1 === key2); // true -> Ikkala so\\'rov ham bitta keshga tushadi!
\\\`\\\`\\\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Anycast va GeoDNS Routing

CDN foydalanuvchini eng yaqin PoP-ga yo\\'naltirishda asosan ikkita usuldan foydalanadi:

1. **GeoDNS (DNS-based routing):**
   * Foydalanuvchi nom serveridan (DNS) IP manzil so\\'raganda, DNS tizimi foydalanuvchining IP manziliga qarab geografik joylashuvini aniqlaydi va unga o\\'sha hududga eng yaqin bo\\'gan PoP serverining IP manzilini qaytaradi.
   * *Kamchiligi:* DNS keshlash tizimi tufayli marshrut tez o\\'zgarmasligi mumkin.

2. **Anycast Routing (Network-based routing):**
   * Dunyo bo\\'ylab barcha PoP serverlariga **bir xil yagona IP manzil** beriladi.
   * Internet routerlari (BGP protokoli orqali) foydalanuvchi so\\'rovini tarmoqdagi eng yaqin masofada joylashgan PoP serveriga avtomatik yo\\'naltiradi.
   * *Afzalligi:* Juda tezkor va ishonchli (agar bitta PoP o\\'chsa, tarmoq darhol so\\'rovlarni navbatdagi eng yaqin PoP-ga yo\\'naltiradi).

### V8 Isolates va Node.js Virtual Konteynerlari farqi

Edge Computing tez ishlashining siri uning izolyatsiya texnologiyasida:
* **Node.js Konteynerlari (masalan, Docker yoki VM):** Har bir so\\'rov uchun to\\'liq operatsion tizim virtualizatsiyasi yoki alohida Node.js jarayoni (process) ishga tushadi. Bu ko\\'p xotira (100MB+) va vaqt (Cold Start: 100ms dan bir necha soniyagacha) talab qiladi.
* **V8 Isolates:** Google V8 JavaScript dvigateli bitta umumiy operatsion tizim jarayonida minglab kichik va alohida JavaScript kontekstlarini (Isolates) yarata oladi. Har bir isolate o\\'zining xotirasi va o\\'zgaruvchilariga ega, lekin ular OS darajasida yangi jarayon boshlamaydi. Natijada **Cold Start < 1ms** va xotira sarfi atigi bir necha Kilobaytni tashkil etadi.

### Cache Eviction Policies (Keshdan o\\'chirish qoidalari)
CDN serverlari xotirasi cheklangan. Kesh to\\'lganda qaysi fayllarni o\\'chirishni tizim quyidagi algoritmlar bilan hal qiladi:
* **LRU (Least Recently Used):** Eng uzoq vaqt davomida hech kim so\\'ramagan ma\\'lumotlarni o\\'chirish.
* **LFU (Least Frequently Used):** Eng kam chastotada (kam marta) so\\'ralgan ma\\'lumotlarni o\\'chirish.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

Keling, CDN Edge kesh funksionalligini va \`stale-while-revalidate\` logikasini simulyatsiya qiluvchi tizim yozamiz.

\\\`\\\`\\\`javascript
// Edge serverdagi kesh ombori
const edgeCache = new Map();

// Origin server (Asil ma\\'lumot manbai) simulyatsiyasi
async function fetchFromOrigin(endpoint) {
  console.log(\`[Origin] Og\\'ir SQL so\\'rov bajarilmoqda: \${endpoint}\`);
  await new Promise(resolve => setTimeout(resolve, 500)); // 500ms kutish
  return { data: \`Yangilangan ma\\'lumot (\${endpoint})\`, fetchedAt: Date.now() };
}

// Edge CDN funksiyasi
async function cdnEdgeHandler(endpoint) {
  const now = Date.now();
  const cached = edgeCache.get(endpoint);

  // 1. Kesh mavjud va hali eskirgan emas (Max-Age: 5 soniya)
  if (cached && (now - cached.fetchedAt < 5000)) {
    console.log("[Edge CDN] Cache Hit! Darhol qaytarildi.");
    return cached.data;
  }

  // 2. Kesh eskirgan, lekin Stale-While-Revalidate oynasida (SWR: yana 10 soniya)
  if (cached && (now - cached.fetchedAt < 15000)) {
    console.log("[Edge CDN] Cache Stale! Eski ma\\'lumot qaytarildi, fonda yangilanmoqda...");
    
    // Fonda origin serverdan yangilash (Background Revalidation)
    fetchFromOrigin(endpoint).then(freshData => {
      edgeCache.set(endpoint, freshData);
      console.log(\`[Edge CDN] Kesh yangilandi: \${endpoint}\`);
    });
    
    return cached.data; // Kutishlarsiz eski kesh qaytadi
  }

  // 3. Cache Miss (Kesh umuman yo\\'q yoki juda eski)
  console.log("[Edge CDN] Cache Miss! Origin kutilmoqda...");
  const freshData = await fetchFromOrigin(endpoint);
  edgeCache.set(endpoint, freshData);
  return freshData.data;
}
\\\`\\\`\\\`

---

## 5. ⚠️ Ko\\'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. \`max-age\` va \`s-maxage\` ni aralashtirib yuborish
* **Xato:** \`Cache-Control: max-age=86400\` deb yozib, CDN-dagi sahifani yangilay olmaslik. Foydalanuvchi brauzeri ham uni 1 kunga keshlab oladi va siz CDN-ni majburiy tozalasangiz ham brauzer yangi faylni ololmaydi.
* **Tuzatish:** Foydalanuvchi brauzeri uchun kichik muddat, CDN uchun esa katta muddat belgilang:
  \\\`\\\`\\\`http
  Cache-Control: public, max-age=3600, s-maxage=86400
  \\\`\\\`\\\`

### 2. Kesh kalitida URL case-sensitivligini hisobga olmaslik
* **Xato:** CDN \`/about\` va \`/ABOUT\` manzillarini alohida sahifa deb hisoblaydi va origin-ga ortiqcha yuklama beradi.
* **Tuzatish:** So\\'rovlarni keshga tekshirishdan oldin ularni kichik harflarga o\\'tkazing:
  \\\`\\\`\\\`javascript
  const cleanPath = url.pathname.toLowerCase();
  \\\`\\\`\\\`

### 3. V8 Isolates ichida global o\\'zgaruvchilarda sessiya saqlash
* **Xato:** Edge worker ichida global o\\'zgaruvchi yaratib, foydalanuvchi sessiyasini saqlash. V8 isolate-lar har safar o\\'chib-yonishi yoki boshqa PoP serverida ishga tushishi mumkin.
* **Tuzatish:** Edge workers mutlaqo **Stateless** (holatsiz) bo\\'lishi kerak. Holatni saqlash uchun tashqi Edge Key-Value (masalan, Cloudflare KV, Redis) dan foydalaning.

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Atama / Sarlavha | Nima vazifa bajaradi | Asosiy xususiyati |
| :--- | :--- | :--- |
| **PoP (Point of Presence)** | Geografik server markazi | Foydalanuvchiga eng yaqin CDN tuguni |
| **Anycast Routing** | Tarmoq darajasida eng yaqin serverga yo\\'naltirish | Bitta IP manzil hamma stansiyada ishlatiladi |
| **V8 Isolate** | JavaScript kontekst izolatsiyasi | Cold start < 1ms, xotira sarfi minimal |
| **s-maxage** | CDN kesh vaqti | Brauzer keshiga ta\\'sir qilmaydi |
| **stale-while-revalidate** | Eskirgan keshni ko\\'rsatib, fonda yangilash | UX (foydalanuvchi tajribasi) uchun ideal |
| **Cache Purging** | Keshni majburiy tozalash | Baza o\\'zgarganda zudlik bilan chaqiriladi |

---

## 7. ❓ Savollar va Javoblar

### 1. Nima uchun dynamic ma\\'lumotlar bazasini to\\'liq Edge serverda saqlab bo\\'lmaydi?
Ma\\'lumotlar bazasini dunyo bo\\'ylab yuzlab nuqtalarga tarqatish (Replication) CAP teoremasiga ko\\'ra write (yozish) amallarida sinxronizatsiya muammolarini keltirib chiqaradi. Shuning uchun mantiq edge-da, og\\'ir yozish bazalari esa markaziy hududlarda (ko\\'p hollarda Read-Replica-lar bilan birga) saqlanadi.

### 2. Edge Worker va Serverless (masalan, AWS Lambda) farqi nimada?
AWS Lambda odatda an\\'anaviy konteyner yoki VM-larda ishlaydi va cold start vaqti 100ms dan bir necha soniyagacha bo\\'lishi mumkin. Edge worker (Cloudflare Workers) V8 Isolates texnologiyasini ishlatadi, cold start deyarli 0ms ga teng va u foydalanuvchiga eng yaqin CDN tarmog\\'ida ishlaydi.

---

## 8. 🎯 Real Project Case Study

### Global E-Commerce loyihasini Edge Computing yordamida tezlashtirish

**Muammo:** Saytga kirgan foydalanuvchining mamlakatiga qarab narxlarni turli valyutada ko\\'rsatish va A/B test o\\'tkazish kerak. Markaziy server Nyu-Yorkda joylashgan bo\\'lib, har bir foydalanuvchini aniqlash 300ms kechikish beradi.

**Yechim:**
1. **Routing at the Edge:** Kiruvchi so\\'rovni Edge Worker tutib oladi.
2. **GeoIP Detection:** Edge worker foydalanuvchi kelgan IP manzildan uning davlatini (masalan, O\\'zbekiston) millisekund ichida aniqlaydi.
3. **Cookie-based A/B testing:** Worker foydalanuvchi brauzerida \`ab-group\` cookie bormi yoki yo\\'qligini tekshiradi, bo\\'lmasa uni dinamik tarzda guruhga (A yoki B) ajratadi.
4. **Header Injection:** Asl serverga (Origin) so\\'rov yuborishdan oldin, Edge worker so\\'rov sarlavhalariga \`X-User-Country: UZ\` va \`X-AB-Group: B\` qiymatlarini qo\\'shadi.
5. **Caching:** Origin qaytargan sahifani CDN keshida \`Vary: X-User-Country, X-AB-Group\` sarlavhasi yordamida alohida-alohida keshlaydi.

Natijada, keyingi o\\'zbekistonlik va B guruhidagi foydalanuvchilar markaziy serverga bormasdan, javobni Edge serverdan 10ms da oladi.

---

## 9. 🧠 Vizual ko\\'rinish (Architecture Diagram)

### GeoDNS vs Anycast Routing

\`\`\`mermaid
graph TD
    subgraph GeoDNS Routing
        Client1["Client in Uzbekistan"] -->|1. DNS Query| DNSServer[DNS Name Server]
        DNSServer -->|2. Detect Location & return PoP-Asia IP| Client1
        Client1 -->|3. Connect directly to| PoPAsia[PoP Server - Asia]
    end

    subgraph Anycast Routing
        Client2["Client in Uzbekistan"] -->|1. Connect to IP 192.0.2.1| Router[ISP Router]
        Router -->|2. BGP selects shortest path| PoPAsiaAnycast[PoP Server - Asia IP: 192.0.2.1]
        
        Client3["Client in USA"] -->|1. Connect to IP 192.0.2.1| RouterUSA[US ISP Router]
        RouterUSA -->|2. BGP selects shortest path| PoPUSAAnycast[PoP Server - USA IP: 192.0.2.1]
    end
\`\`\`

---

## 10. 📌 Cheat Sheet

### Eng muhim HTTP Caching Sarlavhalari

* **\`Cache-Control: public\`** — Kontentni brauzer ham, CDN ham keshlasa bo\\'ladi.
* **\`Cache-Control: private\`** — Faqat foydalanuvchi brauzeri keshlaydi (CDN keshlamasligi shart).
* **\`Cache-Control: no-store\`** — Kontentni hech qayerda keshlab bo\\'lmaydi (har doim origin-dan olinadi).
* **\`Cache-Control: max-age=X\`** — Foydalanuvchi brauzeri keshni yangilamasdan ishlatishi mumkin bo\\'lgan maksimal soniya.
* **\`Cache-Control: s-maxage=Y\`** — CDN-lar keshni saqlab turishi kerak bo\\'lgan muddat.
* **\`stale-while-revalidate=Z\`** — Kesh eskirgandan so\\'ng yana necha soniya davomida eski kontentni ko\\'rsatishga ruxsat berish muddati (fonda revalidation ketayotganda).
* **\`Vary: HeaderName\`** — CDN-ga berilgan sarlavha qiymatlariga ko\\'ra keshni alohida nusxalarda saqlashni buyuradi (masalan: \`Vary: Accept-Encoding, User-Agent\`).`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Edge Cache Simulator",
      instruction: "Sodda edge kesh tizimini simulyatsiya qiluvchi `EdgeCache` klassini yozing. U `set(key, value, ttlMs)` va `get(key)` metodlariga ega bo'lsin. Kalit yozilganda uning muddati tugash vaqti saqlansin. `get` metodida agar kalit muddati o'tgan bo'lsa `null` qaytsin va keshdan o'chirilsin. Agar mavjud va muddati o'tmagan bo'lsa qiymati qaytsin.",
      startingCode: "class EdgeCache {\n  constructor() {\n    this.store = new Map();\n  }\n\n  set(key, value, ttlMs) {\n    // Kodni shu yerda yozing\n  }\n\n  get(key) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "this.store.set(key, { value, expiry: Date.now() + ttlMs }) ko'rinishida saqlang. get() chaqirilganda, Date.now() > entry.expiry bo'lsa, delete qiling va null qaytaring.",
      test: "if (typeof EdgeCache !== 'function') return 'EdgeCache klass bo\\'lishi kerak';\nconst cache = new EdgeCache();\ncache.set('v1', 'data1', 50);\nif (cache.get('v1') !== 'data1') return 'Qiymat keshdan topilmadi';\nreturn new Promise((resolve) => {\n  setTimeout(() => {\n    if (cache.get('v1') === null) resolve(null);\n    else resolve('Muddati o\\'tgan kesh o\\'chirilmadi');\n  }, 60);\n});"
    },
    {
      id: 2,
      title: "2️⃣ Query String Normalization",
      instruction: "Kesh kalitlari fragmentatsiyasining oldini olish uchun so'rov URL manzilidagi query parametrlarni alifbo tartibida saralovchi va kalitlarni kichik harflarga o'tkazuvchi `normalizeUrl(urlStr)` funksiyasini yozing. Masalan: `https://example.com/api?b=2&A=1` -> `https://example.com/api?a=1&b=2`. Agar query parametrlar bo'lmasa, URL o'zgarishsiz qolsin.",
      startingCode: "function normalizeUrl(urlStr) {\n  // Kodni shu yerda yozing\n}",
      hint: "new URL(urlStr) yordamida URL obyektini yarating. searchParams kalitlarini oling, tartiblang, kichik harfga o'tkazing va searchParams.set() orqali qayta yozing. Oxirida url.toString() qaytaring.",
      test: "if (typeof normalizeUrl !== 'function') return 'normalizeUrl funksiya bo\\'lishi kerak';\nconst u1 = 'https://site.uz/path?z=9&A=1&m=5';\nconst r1 = normalizeUrl(u1);\nif (r1 !== 'https://site.uz/path?a=1&m=5&z=9') return 'Query parametrlar tartiblanmadi yoki kalitlar kichik harfga o\\'tmadi';\nconst u2 = 'https://site.uz/path';\nif (normalizeUrl(u2) !== 'https://site.uz/path') return 'Query parametrsiz URL o\\'zgarib ketdi';\nreturn null;"
    },
    {
      id: 3,
      title: "3️⃣ Cache Key Generator with Vary Headers",
      instruction: "Vary sarlavhalariga ko'ra kesh kalitlarini generatsiya qiladigan `generateCacheKey(url, headers, varyList)` funksiyasini yozing. Sarlavha kalitlari case-insensitive bo'lishi kerak. Qaytarilgan kalit formati: `url|header1:val1|header2:val2` bo'lishi va header qiymatlari kichik harflarga o'tkazilib, bo'sh joylardan tozalanishi (trim) lozim.",
      startingCode: "function generateCacheKey(url, headers, varyList) {\n  // Kodni shu yerda yozing\n}",
      hint: "varyList-dagi har bir sarlavha uchun headers obyektidan tegishli qiymatni qidiring. Kalitni lowerCase qilib qidirishni unutmang. Topilgan qiymatni trim() va toLowerCase() qilib kalitga qo'shing.",
      test: "if (typeof generateCacheKey !== 'function') return 'generateCacheKey funksiya emas';\nconst k1 = generateCacheKey('http://a.com', { 'accept-encoding': 'gzip', 'user-agent': 'mobile' }, ['Accept-Encoding']);\nconst k2 = generateCacheKey('http://a.com', { 'accept-encoding': 'GZIP', 'user-agent': 'desktop' }, ['Accept-Encoding']);\nif (k1 !== k2) return 'Accept-Encoding farq qilmasligi kerak edi (gzip vs GZIP)';\nconst k3 = generateCacheKey('http://a.com', { 'accept-encoding': 'br' }, ['Accept-Encoding']);\nif (k1 === k3) return 'Turli encoding-lar uchun bir xil kalit qaytdi';\nreturn null;"
    },
    {
      id: 4,
      title: "4️⃣ Stale-While-Revalidate",
      instruction: "Stale-while-revalidate keshlash strategiyasini simulyatsiya qiluvchi `swrFetch(cache, key, fetchFn, ttlMs, swrMs)` funksiyasini yozing. Funksiya eskirgan keshni `swrMs` oralig'ida bo'lsa darhol qaytarib, orqa fonda fetchFn() ni bajarishi kerak.",
      startingCode: "async function swrFetch(cache, key, fetchFn, ttlMs, swrMs) {\n  // Kodni shu yerda yozing\n}",
      hint: "const entry = cache.get(key); const now = Date.now(); if (entry && now < entry.expiry) return entry.value; if (entry && now < entry.expiry + swrMs) { fetchFn().then(val => cache.set(key, { value: val, expiry: Date.now() + ttlMs })); return entry.value; } const val = await fetchFn(); cache.set(key, { value: val, expiry: Date.now() + ttlMs }); return val;",
      test: "if (typeof swrFetch !== 'function') return 'swrFetch funksiya bo\\'lishi kerak';\nconst mockCache = new Map();\nlet fetchCount = 0;\nconst mockFetch = async () => { fetchCount++; return 'new_val_' + fetchCount; };\nconst res1 = await swrFetch(mockCache, 'item', mockFetch, 100, 200);\nif (res1 !== 'new_val_1' || fetchCount !== 1) return 'Kesh bo\\'sh bo\\'lganda fetch to\\'g\\'ri ishlamadi';\nconst res2 = await swrFetch(mockCache, 'item', mockFetch, 100, 200);\nif (res2 !== 'new_val_1' || fetchCount !== 1) return 'Hali muddati o\\'tmagan keshda qayta fetch qilindi';\nconst entry = mockCache.get('item');\nentry.expiry = Date.now() - 50;\nconst res3 = await swrFetch(mockCache, 'item', mockFetch, 100, 200);\nif (res3 !== 'new_val_1') return 'SWR vaqtida eski qiymat qaytishi kerak edi';\nawait new Promise(r => setTimeout(r, 10));\nif (fetchCount !== 2) return 'SWR fonda revalidation chaqirmadi';\nreturn null;"
    },
    {
      id: 5,
      title: "5️⃣ LRU Cache Eviction Policy for Edge PoPs",
      instruction: "Sig'imi cheklangan va eng kam ishlatilgan elementlarni keshdan o'chiradigan `LRUPopCache` klassini yozing. Konstruktor `capacity` qabul qiladi. `get(key)` va `put(key, value)` metodlari bo'lsin.",
      startingCode: "class LRUPopCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  get(key) {\n    // Kodni shu yerda yozing\n  }\n\n  put(key, value) {\n    // Kodni shu yerda yozing\n  }\n}",
      hint: "Map o'z kalitlari ketma-ketligini saqlaydi. get() qilinganda kalitni o'chirib qayta qo'shish orqali oxiriga o'tkazing. put() qilganda sig'im oshib ketsa, map.keys().next().value kalitini o'chiring.",
      test: "if (typeof LRUPopCache !== 'function') return 'LRUPopCache klass emas';\nconst c = new LRUPopCache(2);\nc.put('a', 1);\nc.put('b', 2);\nc.get('a');\nc.put('c', 3);\nif (c.get('b') !== null) return 'LRU element o\\'chmadi';\nif (c.get('a') !== 1 || c.get('c') !== 3) return 'LRU qiymatlari noto\\'g\\'ri';\nreturn null;"
    },
    {
      id: 6,
      title: "6️⃣ Wildcard Cache Purging",
      instruction: "CDN-da keshni tozalash funksiyasi `purgeCache(cache, pattern)`ni yozing. `pattern` parametrida oddiy kalit bo'lishi mumkin, yoki `*` belgisi bilan tugaydigan wildcard bo'lishi mumkin (masalan, `/images/*` barcha shu prefiksdan boshlanuvchi keshni o'chiradi). Agar `pattern` faqat `*` bo'lsa, barcha kesh tozalansin.",
      startingCode: "function purgeCache(cache, pattern) {\n  // Kodni shu yerda yozing\n}",
      hint: "Agar pattern === '*' bo'lsa cache.clear() qiling. Agarda prefiks bo'lsa, cache.keys() bo'ylab aylanib key.startsWith(prefix) orqali o'chiring.",
      test: "if (typeof purgeCache !== 'function') return 'purgeCache funksiya emas';\nconst cache = new Map([\n  ['/images/logo.png', 'a'],\n  ['/images/banner.jpg', 'b'],\n  ['/about', 'c']\n]);\npurgeCache(cache, '/images/*');\nif (cache.has('/images/logo.png') || cache.has('/images/banner.jpg')) return 'Wildcard o\\'chirish ishlamadi';\nif (!cache.has('/about')) return 'Boshqa kalitlar ham o\\'chib ketdi';\nreturn null;"
    },
    {
      id: 7,
      title: "7️⃣ Edge Route Selection (Geo-Routing)",
      instruction: "Foydalanuvchining koordinatalariga ko'ra eng yaqin PoP serverini aniqlaydigan `selectNearestPop(userCoords, pops)` funksiyasini yozing. Masofani hisoblash uchun sodda Evklid masofasidan foydalaning: `d = sqrt((x2-x1)^2 + (y2-y1)^2)`. Pops massividagi har bir pop `{ name, lat, lon }` ko'rinishida bo'ladi.",
      startingCode: "function selectNearestPop(userCoords, pops) {\n  // Kodni shu yerda yozing\n}",
      hint: "Math.sqrt() va Math.pow() yordamida har bir pop masofasini hisoblang va eng kichik masofaga ega pop.name qiymatini qaytaring.",
      test: "if (typeof selectNearestPop !== 'function') return 'selectNearestPop funksiya emas';\nconst pops = [\n  { name: 'PoP-Frankfurt', lat: 50.11, lon: 8.68 },\n  { name: 'PoP-Singapore', lat: 1.35, lon: 103.8 },\n  { name: 'PoP-Tashkent', lat: 41.3, lon: 69.2 }\n];\nconst nearest = selectNearestPop({ lat: 41.0, lon: 69.0 }, pops);\nif (nearest !== 'PoP-Tashkent') return 'Eng yaqin PoP noto\\'g\\'ri aniqlandi';\nreturn null;"
    },
    {
      id: 8,
      title: "8️⃣ WAF Firewall Rule Evaluator",
      instruction: "Edge serverida ishlaydigan sodda WAF (Veb ilovalar xavfsizlik devori) funksiyasi `evaluateWAF(request)`ni yozing. U quyidagi qoidalarni tekshirsin:\n1. Agar so'rov yuborgan IP `['192.0.2.1', '198.51.100.2']` ro'yxatida bo'lsa, `{ blocked: true, reason: 'IP_BLOCKED' }` qaytarsin.\n2. Agar `path` yoki `query` tarkibida `../` bo'lsa (path traversal), `{ blocked: true, reason: 'PATH_TRAVERSAL' }` qaytarsin.\n3. Agar `query` ichida SQL keywords `['select ', 'union ', 'insert ', 'drop ']` bo'lsa, `{ blocked: true, reason: 'SQL_INJECTION' }` qaytarsin. Qidiruv case-insensitive bo'lsin. Aks holda, `{ blocked: false }` qaytarsin.",
      startingCode: "function evaluateWAF(request) {\n  // Kodni shu yerda yozing\n}",
      hint: "Kiruvchi path va query stringlarni decodeURIComponent orqali dekodlab keyin tekshirish to'g'riroq bo'ladi.",
      test: "if (typeof evaluateWAF !== 'function') return 'evaluateWAF funksiya emas';\nconst r1 = evaluateWAF({ ip: '192.0.2.1', path: '/index', query: '', headers: {} });\nif (!r1.blocked || r1.reason !== 'IP_BLOCKED') return 'IP bloklash ishlamadi';\nconst r2 = evaluateWAF({ ip: '1.1.1.1', path: '/users', query: 'id=1%20UNION%20SELECT%20username', headers: {} });\nif (!r2.blocked || r2.reason !== 'SQL_INJECTION') return 'SQL Injection aniqlanmadi';\nconst r3 = evaluateWAF({ ip: '1.1.1.1', path: '/images/../../etc/passwd', query: '', headers: {} });\nif (!r3.blocked || r3.reason !== 'PATH_TRAVERSAL') return 'Path Traversal aniqlanmadi';\nreturn null;"
    },
    {
      id: 9,
      title: "9️⃣ A/B Traffic Splitter",
      instruction: "Edge-da A/B testingni amalga oshiradigan `abRoute(cookieStr, abWeight)` funksiyasini yozing. Agar cookieStr ichida `ab_group=B` bo'lsa, 'group_B' qaytsin. Agar `ab_group=A` bo'lsa, 'group_A' qaytsin. Agar cookie bo'lmasa, `abWeight` (0 dan 1 gacha ehtimollik, masalan 0.2 degani 20% ehtimol bilan B) ehtimoliga qarab tasodifiy ravishda 'group_B' yoki 'group_A' qaytaring.",
      startingCode: "function abRoute(cookieStr, abWeight = 0.2) {\n  // Kodni shu yerda yozing\n}",
      hint: "Cookie stringini tekshiring, agar topilmasa Math.random() < abWeight sharti bilan guruhni taqsimlang.",
      test: "if (typeof abRoute !== 'function') return 'abRoute funksiya emas';\nif (abRoute('session=xyz; ab_group=B') !== 'group_B') return 'Cookie-dagi guruh B tanlanmadi';\nif (abRoute('ab_group=A; other=1') !== 'group_A') return 'Cookie-dagi guruh A tanlanmadi';\nconst runs = [];\nfor (let i = 0; i < 100; i++) {\n  runs.push(abRoute('', 0));\n}\nif (runs.some(r => r !== 'group_A')) return '0 weight bilan B guruh tanlandi';\nreturn null;"
    },
    {
      id: 10,
      title: "🔟 Accept Header WebP Redirect",
      instruction: "Agar kiruvchi rasm so'rovi (.png yoki .jpg bilan tugaydigan URL) bo'lsa va brauzer yuborgan headers obyektida `accept` sarlavhasida `image/webp` mavjud bo'lsa, URL kengaytmasini `.webp` ga o'zgartirib qaytaradigan `handleImageRedirect(url, headers)` funksiyasini yozing. Aks holda asl URL-ni qaytarsin.",
      startingCode: "function handleImageRedirect(url, headers) {\n  // Kodni shu yerda yozing\n}",
      hint: "Headers obyektining accept maydonini oling (case-insensitive tekshirishni unutmang). URL .png yoki .jpg bilan tugashini va accept-da image/webp borligini tekshiring.",
      test: "if (typeof handleImageRedirect !== 'function') return 'handleImageRedirect funksiya emas';\nconst r1 = handleImageRedirect('https://site.com/logo.png', { 'accept': 'image/webp,image/apng' });\nif (r1 !== 'https://site.com/logo.webp') return 'WebP formatga yo\\'naltirilmadi';\nconst r2 = handleImageRedirect('https://site.com/logo.png', { 'accept': 'text/html' });\nif (r2 !== 'https://site.com/logo.png') return 'WebP qo\\'llamaydigan brauzer ham o\\'zgartirildi';\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "CDN (Content Delivery Network) ning asosiy vazifasi nima?",
      options: [
        "Ma'lumotlar bazasini xavfsiz shifrlash",
        "Statik va dinamik kontentni foydalanuvchiga geografik jihatdan eng yaqin serverlar (PoP) orqali yetkazib berish, kechikish vaqtini kamaytirish",
        "Veb-sahifani HTML va CSS kodlariga avtomatik o'tkazish",
        "Faqat server xotirasini tozalash"
      ],
      correctAnswer: 1,
      explanation: "CDN dunyo bo'ylab tarqatilgan PoP serverlari tarmog'i bo'lib, foydalanuvchiga eng yaqin joylashgan server orqali kontentni tezkor yetkazib beradi."
    },
    {
      id: 2,
      question: "PoP (Point of Presence) deganda nima tushuniladi?",
      options: [
        "CDN tarmog'ining geografik nuqtalarda joylashgan serverlar va kesh stansiyalari markazi",
        "JavaScript-dagi push va pop metodlari",
        "Ma'lumotlar bazasining zaxira nusxasi (backup)",
        "Veb-brauzerning yangi oynasi"
      ],
      correctAnswer: 0,
      explanation: "PoP (Point of Presence) — CDN provayderining ma'lum bir mintaqadagi ma'lumotlar markazi (datacenter) bo'lib, u yerda keshlovchi serverlar joylashadi."
    },
    {
      id: 3,
      question: "Anycast routing qanday ishlaydi?",
      options: [
        "Har bir foydalanuvchi alohida IP manzil orqali faqat bitta serverga bog'lanadi",
        "Bitta IP manzil dunyo bo'ylab bir nechta serverlarga tegishli bo'ladi va tarmoq so'rovni eng yaqin joylashgan faol serverga yo'naltiradi",
        "Ma'lumotlarni faqat elektron pochta orqali yuborish usuli",
        "Faqat IP manzillarni yashirish texnologiyasi"
      ],
      correctAnswer: 1,
      explanation: "Anycast routing yordamida dunyoning turli nuqtalaridagi PoP serverlari bir xil IP manzilni e'lon qiladi va routerlar so'rovni eng qisqa yo'l bilan eng yaqin serverga yuboradi."
    },
    {
      id: 4,
      question: "GeoDNS va Anycast routing farqi nimada?",
      options: [
        "GeoDNS DNS darajasida foydalanuvchining joylashuviga qarab har xil IP qaytaradi, Anycast esa bitta umumiy IP manzildan foydalanib tarmoq (BGP) darajasida yo'naltiradi",
        "GeoDNS faqat mobil qurilmalar uchun, Anycast esa desktop kompyuterlar uchun ishlaydi",
        "GeoDNS ma'lumotlarni sekinroq uzatadi",
        "Hech qanday farqi yo'q, ikkalasi ham bir xil texnologiya"
      ],
      correctAnswer: 0,
      explanation: "GeoDNS so'rov yuborgan foydalanuvchining joylashuviga qarab DNS server orqali eng yaqin server IP-sini beradi. Anycast esa hamma joyda bitta IP ishlatadi va yo'naltirish tarmoq marshrutizatsiyasi (routing) orqali hal qilinadi."
    },
    {
      id: 5,
      question: "V8 Isolates texnologiyasi an'anaviy konteynerlardan (masalan, Docker) qanday ustunlikka ega?",
      options: [
        "Faqat Windows operatsion tizimida ishlaydi",
        "Cold start (sovuq ishga tushish) kechikishi mikrosaniyalarda o'lchanadi va xotira sarfi juda kam, chunki bir nechta virtual muhitlar bitta OS jarayonida ishlaydi",
        "Har doim ma'lumotlar bazasiga to'g'ridan-to'g'ri ulangan bo'ladi",
        "Faqat statik rasmlarni siqish uchun mo'ljallangan"
      ],
      correctAnswer: 1,
      explanation: "V8 Isolates bitta Google V8 dvigateli ichida alohida xotira va kontekstlarni izolyatsiya qiladi. Bu esa to'liq OS yoki virtual mashina ishga tushirish ehtiyojini yo'qotadi va millisekundlik kechikishlarsiz ishlaydi."
    },
    {
      id: 6,
      question: "Cache-Control sarlavhasidagi 'stale-while-revalidate' direktivasi nima qiladi?",
      options: [
        "Kesh eskirganda xatolik qaytaradi",
        "Eskirgan keshni darhol o'chirib, foydalanuvchini kutishga majbur qiladi",
        "Foydalanuvchiga vaqtinchalik eski keshni tezda qaytaradi va orqa fonda (background) yangi ma'lumotni olish uchun serverga so'rov yuboradi",
        "Keshni abadiy saqlav qoladi"
      ],
      correctAnswer: 2,
      explanation: "stale-while-revalidate eski kontentni ko'rsatish orqali tezkorlikni saqlaydi va fonda keshni yangilab qo'yadi, bu foydalanuvchiga kutishlarsiz sahifani yuklash imkonini beradi."
    },
    {
      id: 7,
      question: "Query string parametrlari tartibi har xil bo'lganda (masalan, ?a=1&b=2 va ?b=2&a=1) CDN-da qanday muammo yuzaga keladi?",
      options: [
        "Dastur crash bo'ladi",
        "Cache key fragmentation (kesh kaliti bo'linishi) yuz beradi va bir xil sahifa keshda ikki marta alohida saqlanib, kesh samaradorligini kamaytiradi",
        "Brauzer sahifani yuklashdan bosh tortadi",
        "Hech qanday muammo bo'lmaydi, CDN ularni avtomatik o'zi tushunadi"
      ],
      correctAnswer: 1,
      explanation: "CDN kesh kaliti sifatida odatda butun URL-ni oladi. Agar query parametrlar tartibi o'zgarsa, kalit boshqa deb hisoblanadi. Buning oldini olish uchun Edge darajasida parametrlarni normalizatsiya qilish (tartiblash) kerak."
    },
    {
      id: 8,
      question: "Cache-Control sarlavhasidagi 's-maxage' nimani anglatadi?",
      options: [
        "Faqat foydalanuvchining shaxsiy brauzeri keshlaydigan vaqtni",
        "Faqat umumiy (shared) keshlar va CDN-lar uchun amal qiladigan saqlash muddatini (max-age direktivasini chetlab o'tadi)",
        "Serverning umumiy ishlash vaqtini",
        "Faqat HTTPS orqali kelgan so'rovlar uchun maxsus kalitni"
      ],
      correctAnswer: 1,
      explanation: "s-maxage (shared max-age) faqat umumiy keshlar (CDN, proksi) uchun mo'ljallangan va u brauzerdagi shaxsiy kesh muddatiga ta'sir qilmaydi."
    },
    {
      id: 9,
      question: "Keshdan chiqarish (Eviction) siyosatidan biri bo'lgan LRU (Least Recently Used) algoritmi qanday ishlaydi?",
      options: [
        "Eng ko'p kirilgan elementlarni o'chiradi",
        "Keshga birinchi bo'lib kirgan elementni birinchi bo'lib o'chiradi",
        "Eng uzoq vaqt davomida hech kim so'ramagan (foydalanilmagan) elementlarni birinchi bo'lib keshdan chiqaradi",
        "Tasodifiy elementlarni o'chiradi"
      ],
      correctAnswer: 2,
      explanation: "LRU (Least Recently Used) kesh sig'imi to'lganda eng oxirgi marta foydalanilgan vaqtiga qarab eng eski va foydalanilmay turgan ma'lumotni keshdan o'chiradi."
    },
    {
      id: 10,
      question: "Edge Computing-ning an'anaviy markaziy Cloud Serverdan asosiy afzalligi nimada?",
      options: [
        "Barcha ma'lumotlar bazasini bitta joyda saqlashi",
        "So'rovlarni foydalanuvchiga eng yaqin edge (chekka) serverlarda bajarish orqali tarmoq kechikishini (latency) minimal darajaga tushirishi",
        "SQL so'rovlarini tezroq bajarishi",
        "Faqat bepul xizmat ko'rsatishi"
      ],
      correctAnswer: 1,
      explanation: "Edge Computing hisob-kitoblarni va mantiqiy kodlarni foydalanuvchiga geografik yaqin bo'lgan edge serverlarda bajaradi va ma'lumotni markaziy servergacha borib-kelish vaqtini tejaydi."
    },
    {
      id: 11,
      question: "Nima uchun CDN-da Cache Purging (keshni tozalash) muhim ahamiyatga ega?",
      options: [
        "Serverdagi disk maydonini tejash uchun",
        "Bazada yoki serverda ma'lumotlar yangilanganda, CDN keshidagi eski (eski qolgan) ma'lumotlarni o'chirib, foydalanuvchilarga darhol yangi versiyani taqdim etish uchun",
        "Foydalanuvchi parolini tekshirish uchun",
        "Internet tezligini oshirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Kesh tozalanganda (purged), keyingi so'rov to'g'ridan-to'g'ri serverga (origin) boradi va yangi ma'lumot keshga yoziladi, bu foydalanuvchiga eskirgan ma'lumot ko'rsatilishini oldini oladi."
    },
    {
      id: 12,
      question: "BGP Anycast tarmoq marshruti qanday holatda boshqa PoP-ga yo'naltiriladi?",
      options: [
        "Foydalanuvchi parolini noto'g'ri kiritganda",
        "Eng yaqin PoP ishdan chiqqanda yoki tarmoq uzilganda, BGP protokoli avtomatik tarzda trafigini eng yaqin keyingi PoP serveriga yo'naltiradi",
        "Faqat kechasi, serverlar uxlaganda",
        "Foydalanuvchi brauzerini yangilaganda"
      ],
      correctAnswer: 1,
      explanation: "BGP (Border Gateway Protocol) Anycast routing yuqori bardoshlilikka (fault tolerance) ega. Agar eng yaqin stansiya o'chsa, routerlar so'rovni navbatdagi eng yaqin stansiya IP-siga yo'naltiradi."
    }
  ]
};
