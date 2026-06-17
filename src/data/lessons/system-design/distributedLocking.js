export const distributedLocking = {
  id: "distributedLocking",
  title: "Taqsimlangan Bloklash (Distributed Locking)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Taqsimlangan Bloklash (Distributed Locking) nima?
**Taqsimlangan bloklash (Distributed Locking)** — bu bir nechta alohida serverlar, konteynerlar yoki mikroservislar ishlayotgan muhitda bitta umumiy va bo'linmas resursga (masalan, fayl, ma'lumotlar bazasi satri yoki tashqi to'lov API-si) bir vaqtda faqat bitta jarayon murojaat qilayotganini kafolatlash mexanizmidir. Bu sinxronizatsiya tushunchasining tarmoq/tizim darajasidagi variantidir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **ofisdagi umumiy yig'ilishlar xonasidan (meeting room)** foydalanmoqchisiz:
* **Bloklamasdan ishlash (Pessimistik ssenariy):** Bir vaqtning o'zida uchta xodim turli eshiklardan xonaga bostirib kiradi. Xonadagi doskaga har kim o'z yozuvini yozib yuboradi. Natijada betartiblik (Race Condition) yuzaga keladi.
* **Bloklash (Locking) tizimi:** Xona eshigiga **elektron qulf** o'rnatilgan. Xonaga kirmoqchi bo'lgan xodim kalit-kartani (token) bosib eshikni yopib oladi (Lock acquire). U ishini tugatmaguncha boshqalar kira olmaydi. Ishi tugagach, eshikni ochib qo'yadi (Lock release).
* **Taqsimlangan (Distributed) holat:** Agar ofis bitta emas, balki dunyoning turli shaharlarida joylashgan va barchasi bir vaqtda bitta virtual xonani bron qilmoqchi bo'lsa, bizga barcha shaharlar uchun yagona, markaziy bron qilish tizimi (Distributed Lock Manager) kerak bo'ladi.

---

## 2. 💻 Real Kod Misollari

### 1. Redis-da yagona tugunli sodda blokirovka (Single Instance SETNX)
Eng oddiy blokirovka olish va xavfsiz bo'shatish (Lua skript orqali):
\`\`\`javascript
import { createClient } from 'redis';
const redis = createClient();
await redis.connect();

async function acquireLock(lockKey, token, ttlMs) {
  // NX - faqat kalit bo'lmasa o'rnatish, PX - muddati millisekundda
  const acquired = await redis.set(lockKey, token, {
    NX: true,
    PX: ttlMs
  });
  return acquired === 'OK';
}

async function releaseLock(lockKey, token) {
  // Lua skript yordamida faqat o'zimizga tegishli tokenni atomar tekshirib o'chiramiz
  const luaScript = \`
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  \`;
  const result = await redis.eval(luaScript, {
    keys: [lockKey],
    arguments: [token]
  });
  return result === 1;
}
\`\`\`

### 2. Fencing Token yordamida ma'lumotlar bazasiga xavfsiz yozish
Taqsimlangan blokirovka muddati o'tib ketgan taqdirda ham bazani himoyalash:
\`\`\`javascript
// Ma'lumotlar bazasida jadval tuzilishi simulyatsiyasi:
// { id: 1, value: "data", last_fencing_token: 42 }

async function writeToDatabase(dbClient, resourceId, fencingToken, value) {
  // Tranzaksiya ichida tekshiramiz: faqat kelgan token kattaroq bo'lsa yangilaymiz
  const result = await dbClient.query(
    \`UPDATE resources 
     SET value = $1, last_fencing_token = $2 
     WHERE id = $3 AND last_fencing_token < $2\`,
    [value, fencingToken, resourceId]
  );
  
  if (result.rowCount === 0) {
    throw new Error("Split-Brain yoki muddati o'tgan blokirovka aniqlandi! Yozish rad etildi.");
  }
  return true;
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Taqsimlangan bloklash turlari

1. **Ma'lumotlar bazasiga asoslangan (Database-backed Locks):**
   * **Qanday ishlaydi:** Bazada maxsus jadval yaratiladi (\`lock_name UNIQUE\`). Blokirovka olish uchun \`INSERT\` qilinadi, bo'shatish uchun \`DELETE\`. Yoki PostgreSQL-da \`SELECT ... FOR UPDATE\` ishlatiladi.
   * **Kamchiligi:** Sekin, TTL mexanizmini qo'lda boshqarish qiyin (agar klient o'chib qolsa, lock abadiy qolib ketishi mumkin).

2. **Redis-ga asoslangan (SETNX va Redlock):**
   * **SETNX (Single instance):** Bitta Redis tugunida ishlaydi. O'ta tezkor, ammo Redis tuguni ishdan chiqsa, blokirovka tizimi ishlamay qoladi.
   * **Redlock (Salvatore Sanfilippo):** 5 ta mustaqil Redis tugunida parallel ravishda blokirovka olishga harakat qilinadi. Ko'pchilik (kamida 3 ta) tugunda muvaffaqiyatli bo'lsa va bunga ketgan vaqt TTL-dan kichik bo'lsa, blokirovka olingan hisoblanadi.

3. **Konsensus tizimlariga asoslangan (ZooKeeper va etcd):**
   * **ZooKeeper:** Klient va server o'rtasida faol sessiya ochiladi va **Ephemeral Nodes** (vaqtinchalik tugunlar) yaratiladi. Agar klient o'chib qolsa (heartbeat yo'qolsa), tugun avtomatik o'chadi.
   * **etcd:** **Leases (ijara)** mexanizmi orqali ishlaydi. Klient ma'lum vaqt uchun ijara oladi va uni doimiy uzaytirib turadi (keep-alive).

### Fencing Tokens (To'siq belgilari) mexanizmi
Martin Kleppmann tomonidan taklif qilingan bu mexanizm, blokirovka boshqaruvchisidan har safar lock olinganda monoton o'suvchi raqam (fencing token) olishni talab qiladi.

\`\`\`mermaid
sequenceDiagram
    participant Client1 as Client 1 (Expired Lock)
    participant Client2 as Client 2 (Active Lock)
    participant LockService as Lock Service
    participant Storage as Shared Storage

    Client1->>LockService: Acquire Lock
    LockService-->>Client1: Granted (Token = 33)
    Note over Client1: Long GC Pause (Stop the World)
    LockService->>LockService: Lock Expires
    
    Client2->>LockService: Acquire Lock
    LockService-->>Client2: Granted (Token = 34)
    Client2->>Storage: Write Data (Token = 34)
    Storage->>Storage: Store Token = 34
    Storage-->>Client2: Write Success
    
    Note over Client1: GC Pause Ends
    Client1->>Storage: Write Data (Token = 33)
    Storage->>Storage: Reject Token 33 < 34!
    Storage-->>Client1: Write Failed (Conflict)
\`\`\`

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Keling, bazada inventarni xavfsiz kamaytirish (Inventory Reduction) tizimini quramiz

Faraz qilaylik, bizda maxsulotlar ombori bor. Bir vaqtda kelgan 2 ta so'rov maxsulot sonini kamaytirmoqchi. Biz buni optimistik blokirovka va fencing token yordamida amalga oshiramiz.

\`\`\`javascript
// 1. Simulyatsiya qilingan baza
const database = {
  inventory: {
    product_101: { stock: 10, version: 1 }
  }
};

// 2. Maxsulot sonini xavfsiz kamaytirish funksiyasi
function updateStockOptimistic(productId, quantityToReduce, expectedVersion) {
  const product = database.inventory[productId];
  
  if (!product) {
    return { success: false, reason: "Mahsulot topilmadi" };
  }
  
  // Versiyani tekshiramiz (Optimistic locking)
  if (product.version !== expectedVersion) {
    return { success: false, reason: "Ziddiyat aniqlandi! Versiya mos kelmadi." };
  }
  
  if (product.stock < quantityToReduce) {
    return { success: false, reason: "Omborda yetarli mahsulot yo'q" };
  }
  
  // Yangilash
  product.stock -= quantityToReduce;
  product.version += 1; // Versiya oshiriladi
  
  return { success: true, newStock: product.stock, newVersion: product.version };
}

// 3. Ishlatib ko'rish
const client1_version = database.inventory.product_101.version; // 1

// Client 1 jarayoni boshlandi, lekin biroz sekinlashdi
setTimeout(() => {
  const res1 = updateStockOptimistic("product_101", 3, client1_version);
  console.log("Client 1 natijasi:", res1);
}, 100);

// Client 2 zudlik bilan ishni yakunladi
const client2_version = database.inventory.product_101.version; // 1
const res2 = updateStockOptimistic("product_101", 5, client2_version);
console.log("Client 2 natijasi:", res2); // Success: true
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Blokirovkaga TTL (Time-To-Live) bermaslik
* **Xavf:** Agar blokirovka olgan server ishini tugatmasdan turib to'satdan o'chib qolsa (crash), blokirovka abadiy qolib ketadi va boshqa hech kim u resursga kira olmaydi.
* **Tuzatish:** Har doim oqilona muddat bilan TTL belgilang.

### 2. Oddiy \`DEL\` yordamida lockni o'chirish (Token tekshirmasdan)
* **Xavf:** Client-A lock oldi. Client-A ning ishi cho'zilib ketdi, lock o'chib ketdi (TTL tugadi). Client-B lock oldi. Client-A nihoyat ishini tugatib, shunchaki \`DEL lock_key\` qildi. Natijada Client-B ning locki o'chib ketadi!
* **Tuzatish:** Har doim tasodifiy token yarating va lockni faqat shu token mos kelsagina (Lua skript orqali atomar tarzda) o'chiring.

### 3. Redlock-da soat og'ishini hisobga olmaslik
* **Xavf:** Redlock serverlarning tizim soatlariga tayanadi. Agar serverlardan birining soati to'satdan NTP sinxronizatsiyasi tufayli oldinga sakrab ketsa, u yerdagi lock muddati tezroq tugab qolishi mumkin.
* **Tuzatish:** Soat og'ish koeffitsiyentini (clock drift bound) hisobga olib, lock yashash muddatidan chegirib tashlang.

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Tizim turi | Asosiy mexanizm | Kuchli tomoni | Zaif tomoni |
| :--- | :--- | :--- | :--- |
| **SQL Database** | \`SELECT ... FOR UPDATE\` | Tranzaksion xavfsizlik | Sekin ishlaydi, shkalalanishi qiyin |
| **Redis (SETNX)** | In-memory key-value | Juda yuqori tezlik, past kechikish | Tugun o'chsa lock yo'qoladi |
| **Redis (Redlock)** | Multi-node consensus | Yuqori chidamlilik (High availability) | Soat og'ishi va GC pause ta'sir qiladi |
| **ZooKeeper / etcd** | Session & Ephemerals / Leases | Kuchli konsensus, CP model (CAP theorem) | Tizim murakkabligi, yuqori resurs talabi |

---

## 7. ❓ Savollar va Javoblar

### 1. Martin Kleppmann va Salvatore o'rtasidagi bahsning mohiyati nima?
Bahs distributed lock-larning ishonchliligi haqida edi. Kleppmann asinxron tarmoqlar, clock drift va Garbage Collection (GC) pauzalari sababli Redlock algoritmi mutlaqo ishonchli emasligini va so'nggi bosqichda baribir **Fencing Token** kerakligini isbotlagan. Salvatore esa ko'p holatlarda Redlock yetarli darajada xavfsiz ekanini himoya qilgan.

### 2. Lock TTL vaqti qanday tanlanadi?
TTL qiymati kutilayotgan vazifa bajarilish vaqtidan ancha katta bo'lishi kerak. Masalan, agar vazifa 2 soniya olsa, TTL 10 soniya etib belgilanadi. Agar vazifa muddati noaniq bo'lsa, **lock renewal loop (watchdog)** ishlatiladi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Agar klient blokirovka olgandan so'ng 15 soniya GC pauzaga (Stop-the-world) tushib qolsa, lock muddati 10 soniya bo'lsa nima sodir bo'ladi?
2. Fencing Token nima uchun monoton o'suvchi bo'lishi shart? Nega shunchaki tasodifiy UUID yetarli emas?
3. Redlock algoritmida blokirovka o'rnatish uchun ketgan vaqt lock TTL vaqtidan ayrilishi nima uchun muhim?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi mashqlar yordamida taqsimlangan bloklash (Distributed Locking) bo'yicha ko'nikmalaringizni sinab ko'ring.

---

## 10. 📌 Cheat Sheet

### Asosiy qoidalar:
1. **Faqat o'zingiznikini o'chiring:** Lock release qilganda token tekshiring.
2. **Fencing Token ishlating:** Saqlash tizimida oxirgi yozilgan tokendan kichik tokenlar rad etilishi kerak.
3. **Soat og'ishi xavfi:** Redis Redlock-ga to'liq ishonmang, kuchli konsensus kerak bo'lsa etcd yoki ZooKeeper tanlang.
4. **watchdog (auto-renewal):** Uzoq vazifalarda lockni vaqti-vaqti bilan uzaytirib turing.
`,
  exercises: [
  {
    "id": 1,
    "title": "1️⃣ Xavfsiz Blokirovkani Bo'shatish (Safe Lock Release)",
    "instruction": "Blokirovkani boshqa klientlar o'chirib yubormasligi uchun token tekshiruvi orqali o'chiruvchi `releaseLock(store, key, token)` funksiyasini yozing. `store` obyekti `get(key)` va `delete(key)` metodlariga ega bo'lgan Map simulyatsiyasidir. Agar keshdagi token parametrda kelgan token bilan mos kelsa, kalitni o'chiring va `true` qaytaring. Mos kelmasa yoki kalit mavjud bo'lmasa, `false` qaytaring.",
    "startingCode": "function releaseLock(store, key, token) {\n  // Kodni shu yerda yozing\n}",
    "hint": "store.get(key) orqali keshdagi tokenni oling. U token bilan teng bo'lsa, store.delete(key) metodini chaqiring va true qaytaring. Aks holda false qaytaring.",
    "test": "if (typeof releaseLock !== 'function') return 'releaseLock funksiya emas';\nconst store = new Map();\nstore.set('lock_1', 'token_abc');\nif (releaseLock(store, 'lock_1', 'token_wrong') !== false) return 'Noto\\'g\\'ri token bilan blokirovka o\\'chirilmasligi kerak';\nif (store.get('lock_1') !== 'token_abc') return 'Noto\\'g\\'ri token chaqirilganda blokirovka saqlanib qolishi kerak';\nif (releaseLock(store, 'lock_1', 'token_abc') !== true) return 'To\\'g\\'ri token bilan true qaytishi kerak';\nif (store.has('lock_1')) return 'To\\'g\\'ri token bilan blokirovka o\\'chirilishi kerak';\nreturn null;"
  },
  {
    "id": 2,
    "title": "2️⃣ Fencing Token yordamida Bazani Himoyalash",
    "instruction": "Kechikkan yoki muddati o'tgan blokirovkali klientlarning bazaga yozishini oldini olish uchun `processWriteWithFencing(db, token, value)` funksiyasini yozing. `db` obyekti `{ lastToken: 0, value: '' }` tuzilishiga ega. Yangi kelgan `token` (monoton o'suvchi raqam) `db.lastToken` dan qat'iy katta bo'lsagina bazani yangilang va `true` qaytaring. Aks holda rad eting va `false` qaytaring.",
    "startingCode": "function processWriteWithFencing(db, token, value) {\n  // Kodni shu yerda yozing\n}",
    "hint": "If (token > db.lastToken) shartini tekshiring. Shart bajarilsa, db.value = value va db.lastToken = token qilib true qaytaring.",
    "test": "if (typeof processWriteWithFencing !== 'function') return 'processWriteWithFencing funksiya emas';\nconst db = { lastToken: 10, value: 'eski' };\nif (processWriteWithFencing(db, 9, 'yangi_9') !== false) return 'Kichik tokenli so\\'rov rad etilishi kerak';\nif (db.value !== 'eski') return 'Rad etilgan so\\'rov bazani o\\'zgartirmasligi kerak';\nif (processWriteWithFencing(db, 10, 'yangi_10') !== false) return 'Teng tokenli so\\'rov rad etilishi kerak';\nif (processWriteWithFencing(db, 11, 'yangi_11') !== true) return 'Katta tokenli so\\'rov qabul qilinishi kerak';\nif (db.value !== 'yangi_11' || db.lastToken !== 11) return 'Qabul qilingan so\\'rov bazani yangilashi lozim';\nreturn null;"
  },
  {
    "id": 3,
    "title": "3️⃣ Redlock Quorum Tekshiruvi (Redlock Consensus)",
    "instruction": "Bir nechta Redis tugunlariga ega tizimda blokirovka olinishini simulyatsiya qiluvchi asinxron `acquireRedlockQuorum(nodes, key, token)` funksiyasini yozing. `nodes` - bu har birida `set(key, token)` (muvaffaqiyatli bo'lsa `true`, aks holda `false` qaytaradigan asinxron metod) va `delete(key)` (asinxron metod) bo'lgan tugunlar massividir. Blokirovka ko'pchilik (majority, ya'ni nodes.length / 2 dan ko'p) tugunlarda muvaffaqiyatli o'rnatilsagina `true` qaytaring. Ko'pchilik ovoz bo'lmasa, barcha tugunlardagi blokirovkani o'chirib yuboring (rollback/delete) va `false` qaytaring.",
    "startingCode": "async function acquireRedlockQuorum(nodes, key, token) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Har bir node uchun await node.set(key, token) chaqiring va muvaffaqiyatlarni hisoblang. Agar muvaffaqiyatlar soni > nodes.length / 2 bo'lsa true qaytaring. Aks holda, barcha nodelar uchun parallel ravishda await node.delete(key) chaqiring va false qaytaring.",
    "test": "if (typeof acquireRedlockQuorum !== 'function') return 'acquireRedlockQuorum funksiya emas';\nconst createMockNode = (success) => ({\n  active: false,\n  set: async function(k, v) { if (success) { this.active = true; return true; } return false; },\n  delete: async function(k) { this.active = false; }\n});\nconst nodesSuccess = [createMockNode(true), createMockNode(true), createMockNode(false)];\nreturn acquireRedlockQuorum(nodesSuccess, 'lock_test', 'tok_123').then(res1 => {\n  if (res1 !== true) return 'Ko\\'pchilik (2/3) muvaffaqiyatli bo\\'lganda true qaytishi kerak';\n  const nodesFail = [createMockNode(true), createMockNode(false), createMockNode(false)];\n  return acquireRedlockQuorum(nodesFail, 'lock_test', 'tok_123').then(res2 => {\n    if (res2 !== false) return 'Ko\\'pchilik bo\\'lmaganda (1/3) false qaytishi kerak';\n    if (nodesFail[0].active) return 'Muvaffaqiyatsiz urinishdan keyin o\\'rnatilgan blokirovkalar o\\'chirilishi (rollback) lozim';\n    return null;\n  });\n});"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Taqsimlangan bloklash (Distributed Locking) ning asosiy maqsadi nima?",
    "options": [
      "Ma'lumotlarni tarmoq bo'ylab shifrlash",
      "Bir nechta mustaqil tugunlar (nodes) yoki jarayonlarning bitta umumiy resursga bir vaqtda kirishini va undan foydalanishini muvofiqlashtirish (o'zaro istisno - mutual exclusion)",
      "Barcha serverlarni bir xil vaqt zonasiga o'tkazish",
      "Ma'lumotlar bazasidagi barcha jadvallarni shardlarga bo'lish"
    ],
    "correctAnswer": 1,
    "explanation": "Taqsimlangan bloklash bir nechta server/tugun parallel ishlayotgan muhitda bitta resursga (masalan, fayl yoki ma'lumotlar bazasi satriga) faqat bitta server yozishini ta'minlash uchun xizmat qiladi."
  },
  {
    "id": 2,
    "question": "Redis-da blokirovka olish uchun ishlatiladigan `SETNX` buyrug'ining asosiy xususiyati nimada?",
    "options": [
      "Kalit faqat u mavjud bo'lmasa o'rnatiladi (Set if Not eXists)",
      "Kalitni har doim majburiy yangilaydi",
      "Kalitni faqat tranzaksiya ichida o'chiradi",
      "Faqat raqamli qiymatlarni keshlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "`SETNX` (yoki zamonaviy Redis-da `SET key value NX`) kalit mavjud bo'lmagandagina uni yaratadi. Agar kalit allaqachon mavjud bo'lsa (ya'ni bloklangan bo'lsa), u hech narsa qilmaydi."
  },
  {
    "id": 3,
    "question": "Junior dasturchilar blokirovkani o'chirishda ko'p yo'l qo'yadigan eng katta xavfli xato qaysi?",
    "options": [
      "Blokirovkaga TTL muddati bermaslik",
      "Blokirovka kalitini tasodifiy token qiymatini tekshirmasdan, shunchaki oddiy `DEL` buyrug'i bilan o'chirib yuborish (boshqa klientning blokirovkasini o'chirish)",
      "Blokirovkani o'chirish uchun Lua skript ishlatish",
      "Faqat `EXISTS` buyrug'ini ishlatish"
    ],
    "correctAnswer": 1,
    "explanation": "Agar klient o'z ishi cho'zilib ketgani uchun blokirovka muddati tugab qolsa va boshqa klient uni egallagan bo'lsa, birinchi klient ishini tugatib shunchaki `DEL` qilsa, ikkinchi klientning blokirovkasini o'chirib yuboradi. Buni oldini olish uchun faqat o'ziga tegishli tokenni tekshirib o'chirish kerak."
  },
  {
    "id": 4,
    "question": "Redlock algoritmi bo'yicha N ta mustaqil Redis tugunidan nechtasida blokirovka muvaffaqiyatli o'rnatilishi kerak (Quorum)?",
    "options": [
      "Kamida bitta (1) tugunda",
      "Barcha (N) tugunlarda",
      "Ko'pchilik (majority) tugunlarda, ya'ni kamida (N/2 + 1) ta tugunda",
      "Faqat juft tugunlarda"
    ],
    "correctAnswer": 2,
    "explanation": "Redlock kabi taqsimlangan konsensusga asoslangan algoritmlarda qaror qabul qilish uchun ko'pchilik ovozi (quorum) kerak. N ta tugundan kamida (N/2 + 1) tasida blokirovka olingan bo'lishi lozim."
  },
  {
    "id": 5,
    "question": "Martin Kleppmann va Salvatore Sanfilippo o'rtasidagi bahsda Redlock algoritmining qaysi zaif jihati muhokama qilingan?",
    "options": [
      "Redis-ning juda sekin ishlashi",
      "Tizimdagi soat og'ishi (clock drift) va uzoq davom etuvchi GC pause (Stop-the-world) sababli Redlock-ning mutlaq xavfsiz emasligi",
      "Tarmoqdagi ma'lumotlar hajmi ortishi",
      "Redis parollarining zaifligi"
    ],
    "correctAnswer": 1,
    "explanation": "Martin Kleppmann soat og'ishi (clock drift) va kutilmagan uzoq GC pauzalar sababli klient blokirovka muddati tugaganini bilmay qolishi va bazaga noto'g'ri ma'lumot yozib qo'yishi mumkinligini isbotlagan."
  },
  {
    "id": 6,
    "question": "Fencing Token (To'siq belgisi) tushunchasi nima uchun kerak?",
    "options": [
      "Ma'lumotlar bazasida tranzaksiyalarni butunlay o'chirish uchun",
      "Kechikkan yoki blokirovka muddati tugagan klientlarning saqlash tizimiga (storage) eski ma'lumotlarni yozishini oldini olish uchun (monoton o'suvchi raqam yordamida tekshirish)",
      "Redis kalitlarini shifrlash uchun",
      "Faqat foydalanuvchi parolini tekshirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Fencing token - bu har safar blokirovka olinganda beriladigan monoton o'suvchi raqam. Saqlash tizimi (baza) har bir yozish so'rovida token avvalgisidan kattaligini tekshiradi. Agar klient uxlab qolib, keyinroq eski token bilan yozmoqchi bo'lsa, rad etiladi."
  },
  {
    "id": 7,
    "question": "ZooKeeper-dagi 'Ephemeral Node' (Vaqtinchalik tugun) blokirovka uchun qanday ishlaydi?",
    "options": [
      "Klient bilan aloqa (session) uzilishi bilan ZooKeeper avtomatik ravishda ushbu tugunni o'chirib yuboradi va blokirovka bo'shatiladi",
      "Tugun har doim saqlanib qoladi",
      "Faqat Redis serverlari bilan bog'langanda ishlaydi",
      "Tugunni faqat klient qo'lda o'chirishi shart, aks holda abadiy qoladi"
    ],
    "correctAnswer": 0,
    "explanation": "ZooKeeper-dagi ephemeral node-lar klientning sessiyasiga bog'langan bo'ladi. Klient o'chib qolsa (masalan crash bo'lsa), session tugaydi va vaqtinchalik tugun avtomatik o'chadi, bu esa blokirovkani xavfsiz bo'shatadi."
  },
  {
    "id": 8,
    "question": "Clock Drift (Soat og'ishi) deganda nima tushuniladi?",
    "options": [
      "Klient va server soatlarining tarmoq tezligiga qarab moslashishi",
      "Turli serverlardagi jismoniy soatlarning har xil tezlikda yurishi yoki kutilmaganda NTP yangilanishi sababli vaqt farqi yuzaga kelishi",
      "Kompyuter protsessorining chastotasi pasayishi",
      "Tarmoqdagi paketlarning yo'qolishi"
    ],
    "correctAnswer": 1,
    "explanation": "Taqsimlangan tizimlarda turli tugunlarning jismoniy soatlari mukammal mos kelmaydi. Kichik siljish yoki NTP o'zgarishi blokirovkaning amaldagi yashash muddatini (TTL) xato hisoblashga olib kelishi mumkin."
  },
  {
    "id": 9,
    "question": "Blokirovkani avtomatik uzaytirish (Auto-renewal/Heartbeat loop) nega kerak?",
    "options": [
      "Blokirovkaga boshqa klientlar teginmasligi uchun uni bloklab qo'yish",
      "Uzoq davom etadigan vazifalarda blokirovka muddati tugab, boshqa klient uni olib qo'ymasligi uchun fon rejimida blokirovka muddatini (lease time) uzaytirib turish",
      "Serverni tezroq yuklash uchun",
      "Redis xotirasini tejash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Agar vazifa qancha vaqt olishi aniq bo'lmasa, kichik TTL bilan blokirovka olinadi va fon oqimida vazifa tugaguncha blokirovka muddati uzaytirib boriladi."
  },
  {
    "id": 10,
    "question": "Optimistik blokirovka (Optimistic Locking) va Pessimistik blokirovka (Pessimistic Locking) o'rtasidagi asosiy farq nimada?",
    "options": [
      "Optimistik blokirovka faqat RAM-da ishlaydi",
      "Pessimistik blokirovka resursni oldindan yopiq qiladi (hech kim yozolmaydi), optimistik esa yozish paytida versiya to'g'riligini tekshiradi va ziddiyat bo'lsa rad etadi",
      "Optimistik blokirovka doimo sekinroq ishlaydi",
      "Hech qanday farqi yo'q"
    ],
    "correctAnswer": 1,
    "explanation": "Pessimistik blokirovka resursni egallab, boshqalarni kutishga majbur qiladi. Optimistik esa bloklamaydi, lekin yozishda versiya/vaqt o'zgarmaganligini tekshiradi (kam ziddiyatli tizimlar uchun juda mos)."
  },
  {
    "id": 11,
    "question": "Bir vaqtning o'zida bir nechta resursni (A va B) bloklashda Deadlock (tupik) yuzaga kelmasligi uchun nima qilish kerak?",
    "options": [
      "Barcha resurslarni bir vaqtda o'chirib tashlash",
      "Resurslarni har doim bir xil qat'iy ketma-ketlikda (tartiblangan holda, masalan, alifbo yoki ID bo'yicha) bloklash",
      "Har doim tasodifiy tartibda bloklash",
      "Faqat bitta resursdan foydalanish"
    ],
    "correctAnswer": 1,
    "explanation": "Agar klient-1 avval A keyin B ni, klient-2 esa avval B keyin A ni bloklamoqchi bo'lsa, ular bir-birini kutib o'zaro bloklanib qoladi (Deadlock). Har doim bir xil tartibda (masalan, A keyin B) bloklansa, bu muammo bo'lmaydi."
  },
  {
    "id": 12,
    "question": "etcd kabi konsensus tizimlarida blokirovka muddati qanday mexanizm orqali boshqariladi?",
    "options": [
      "Leases (Ijara shartnomalari) yordamida - klient ijara muddatini yangilab (keep-alive) turadi, aloqa uzilsa ijara tugab, kalit o'chadi",
      "Faqat tranzaksiyalar yordamida",
      "Soatni majburiy sinxronlash orqali",
      "Faqat SQL triggerlari yordamida"
    ],
    "correctAnswer": 0,
    "explanation": "etcd-dagi Leases (ijara) mexanizmi kalitga vaqtinchalik yashash muddati beradi. Klient vaqti-vaqti bilan lease-ni yangilaydi. Klient ishdan chiqsa, lease muddati tugab kalit avtomatik o'chiriladi."
  }
]

};
