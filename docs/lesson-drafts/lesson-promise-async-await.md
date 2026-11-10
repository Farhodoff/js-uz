# 📚 Promise va Async/Await — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**Promise (Va'da)** — kelajagi bajariladigan asinxron operatsiyani ifodalovchi obyekt. 3 ta holatga ega:
- **pending** (ko'rikda) — operatsiya hali yakunlanmagan
- **fulfilled / resolved** (bajarildi) — muvaffaqiyatli yakunlandi, qiymat mavjud
- **rejected** (rad etildi) — xato yuz berdi, sabab mavjud

Promise bir marta yaratiladi (`new Promise((resolve, reject) => { ... })`), keyin `then()`, `catch()`, `finally()` orqali natijani qabul qiladi. Promise — yagoni "resolve" yoki "reject" qiladi (bir marta); bir marta yakunlandi, qayta o'zgartirib bo'lmaydi.

**Async/Await** — Promise bilan ishlashning sintaktik qulay usuli:
- `async` funksiya — har doim Promise qaytaradi (aniq qiymat yoki xato Promise qaytaradi)
- `await` — Promise yakunlanmaguncha forbearance (faqat `async` funksiya ichida ishlaydi)
- `try { await ... } catch (err) { ... }` — xato ushlab olish

**Chaining (zanjirlash):** `promise.then(...).then(...).catch(...)` — zanjir. Bu "linea" (chiziqli) shakl; `async/await` esa "synchronous" ko'rinishda yozish imkonini beradi.

**Promise.all** — bir nechta Promise'larni parallel bajarish (barchasi muvaffaqiyatli bo'lsa — yakun). Bir biri xato bersa — umumiy Promise reject bo'ladi.
**Promise.allSettled** — barchasi yakunlansa ham, her biri statusi (fulfilled/rejected) bilan oxirgi natija.
**Promise.race** — birinchi yakunlangani qabul qilish (asosiysi yoki xato).
**Promise.any** — birinchi muvaffaqiyatli (fulfilled) Promiseni qaytaradi; barchasi reject bo'lsa — AggregateError.

*Faqat dars:* `fetch(url)` — Promise qaytaradi; `await fetch(url)` — natija Promise resolve bo'lgandan keyin keladi. `response.ok` — HTTP 200-299 holatlarini tekshiradi (`fetch` xato status (404, 500) holati da `fetch` reject qilmaydi! Shuning uchun `response.ok` yoki `response.status` tekshirish kerak).

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Promise yaratish va ishlash
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

delay(1000)
  .then(() => console.log('1 soniya o'tdi'))
  .catch(err => console.error('Xato:', err));

// 2. Async/await bilan
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Foydalanuvchi yuklanmadi:', err);
    throw err; // yoki null qaytarish
  }
}

// 3. Promise.all — parallel bajarish
async function loadAll() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json()),
  ]);
  return { users, posts, comments };
}

// 4. Promise.allSettled — barchasi yakunlansa ham
const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error('xato')),
  Promise.resolve(3),
]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log('Yakunlandi:', r.value);
  else console.error('Rad etildi:', r.reason);
});

// 5. Promise.race — birinchi
const first = await Promise.race([
  delay(2000),   // 2 soniya
  delay(1000),   // 1 soniya — bu keladi
  delay(3000),
]); // natija: delay(1000) qaytaradi (1 soniya)

// 6. Finally — har doim
fetch('/api/data')
  .then(r => r.json())
  .catch(err => console.error(err))
  .finally(() => hideLoadingSpinner()); // har doim

// 7. Async funksiya Promise qaytarmaydi
async function syncStyle() {
  return 42; // bu Promise<number> ga o'giriladi (resolve 42)
}
syncStyle().then(v => console.log(v)); // 42

// 8. Xato qaytarish va ushlab olish
async function mayFail() {
  throw new Error('Sizning xatotingiz');
}
mayFail()
  .catch(err => console.error(err)); // Error "Sizning xatotingiz"
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Catch ni unutish
fetch('/api/data')
  .then(r => r.json())
  // .catch(err => ...) — yo'q, Error qoldi!

// XATO 2: HTTP error holatini tekshirib bermagich
fetch('/api/nonexistent') // 404
  .then(res => res.json()) // 404 da ham res.json() chaqiriladi — xato!
  .then(data => console.log(data)); // crash!

// XATO 3: Await ni async funksiya ichida ishlatmagan holda
async function bad() {
  // await faqat async ichida!
  const val = await Promise.resolve(1); // OK
  // await Promise.resolve(2) funksiya ichida bo'lmasa — SyntaxError!
}

// XATO 4: Callback hell (callback nesting)
getData((a) => {
  getMore(a, (b) => {
    getEvenMore(b, (c) => {
      // ... qancha deep?!
    });
  });
}); // Callback hell — qiyin o'qish, xato ushlab olish qiyin

// XATO 5: Promise va sync kod aralashtirish
async function mixed() {
  console.log('start');
  const val = await delay(1000); // forbearance
  console.log(val); // 1000 ms keyin
  console.log('end'); // "start" → "end" → (1s) → val
  // noto'g'ri tushunish — forbearance qilib o'tadi, lekin sync kod davom etadi!
}

// XATO 6: Parallel emas — sequential galtak
async function badParallel() {
  const a = await fetch('/api/a').then(r => r.json()); // 1s
  const b = await fetch('/api/b').then(r => r.json()); // 1s
  const c = await fetch('/api/c').then(r => r.json()); // 1s
  // Jami 3s, chunki ketma-ket — parallel emas!
}

// XATO 7: Uncaught rejection
Promise.reject(new Error('xato'))
  // .catch(...) yo'q — "Uncaught (in promise)" xato!
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Promise uchun catch():** Har doim `catch()` yoki `try/catch` bilan xato ushlab oling.
- **HTTP holatini tekshirish:** `fetch` 404/500 da reject qilmaydi — `res.ok` dan keyin `res.json()` yoki `res.text()`.
- **Parallel yuklash:** `Promise.all([...])` — bir nechta so'rovni parallel bajarish.
- **Zanjirni saqlash:** `.then().then().catch().finally()` — zanjirli, o'qilishi oson.
- **Async/await bilan o'qish:** `async function` ichida `try/catch` bilan o'qish, `await` bilan forbearance.
- **Finally:** Har doim ishga tushadigan kod (loading off, cleanup).
- **Xato qaytarish:** `async function` ichida `throw` — Promise reject bo'ladi, keyingi `.catch()` yoki `catch` bloki esa ushlab oladi.

### ❌ Noto'g'ri:

- **Catch() ni unutish** — "Uncaught (in promise)" xato.
- **HTTP error holatini tekshirib bermagich** — 404/500 da ham `res.json()` chaqiriladi, crash yoki tartibsiz ma'lumot.
- **`await` ni async funksiya tashqarisida ishlatish** — SyntaxError.
- **Callback hell (callback nesting)** — qiyin o'qish, xato ushlab olish qiyin.
- **Parallel emas ketma-ket** — `Promise.all` bilan parallel bo'lishimiz kerak.
- **Uncaught rejection** — Promise reject qilindi, lekin catch bo'lmasa, browser console "Uncaught (in promise)" xato beradi.
- **Async funksiya Promise qaytarmaydi** deb xato qilish — `async` har doim Promise qaytaradi.

## 🎩 Hayotiy o'xshatishlar

- **Promise:** "Buyurtma" — men sizdan "so'rov yubordim", men "javobni kuting", javob kelganda (muvaffaqiyatli yoki xato) sizni xabar beraman. Siz "javob kutilayotgan" (pending), hamda "ha" yoki "yo'q" (resolved/rejected).
- **Async/Await:** "Behapar" danov — siz `async` buyrug'ini berasiz, keyin `await` — "men bu natijani kutaman, keyingi qadamni boshlashdan oldin". Bu kod "synchronous" ko'rinishda yoziladi, lekin aslida forbearance (non-blocking) — tizim boshqa ishlarni ham bajaradi.
- **Promise.all:** "Ko'p xizmat" — barcha xizmatlar parallel bajariladi; barchasi yakunlansa ham, umumiy natija. Bir xizmat xato bersa — umumiy xato.
- **HTTP 404 muammosi:** "Telefon raqam" — 404 yoki 500 holati, `fetch` "rad etilmagan" (reject) emas, balki "javob keldi lekin holati noto'g'ri" (response keldi, lekin `res.ok` false). Shuning uchun `res.ok` tekshirish kerak.

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Promise yaratish: new Promise((resolve, reject) => ...) ] --> B[ Pending holat ]
    B --> C1[ resolve(qiymat) ] --> D[ Fulfilled / Resolved ]
    B --> C2[ reject(xato) ] --> E[ Rejected ]
    D --> F[ .then() or await ]
    E --> G[ .catch() or try/catch ]
    F --> H[ Zanjir: .then().then().catch() ]
    G --> I[ Xato ushlab olish ]
    H --> J[ Result ]
    I --> J
    J --> K[ finally() - har doim ]
    
    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#fff3e0,stroke:#e65100
    style D fill:#c8e6c9,stroke:#2e7d32
    style E fill:#ffcdd2,stroke:#c62828
    style F fill:#e8f5e9,stroke:#2e7d32
    style G fill:#ffebee,stroke:#c62828
    style K fill:#f3e5f5,stroke:#7b1fa2
```

**Diagrama tushuntirishi:** Promise yaratilganda "pending" holatda. `resolve` qilinganda "fulfilled" — `.then()` yoki `await` natijani qabul qiladi. `reject` qilinganda "rejected" — `.catch()` yoki `try/catch` xatoni ushlab oladi. Zanjir (`then().then()`) orqali natijalar qayta ishlanadi, `finally` — har doim ishga tushadi.

## 🎙 Intervyu savollari va javoblari

### S1: Promise nima? Uning 3 ta holati qanday?

**Javob:** Promise — asinxron operatsiyani ifodalovchi obyekt. 3 ta holat: pending (ko'rikda), fulfilled/resolved (bajarildi, qiymat mavjud), rejected (rad etildi, xato mavjud). Bir marta yakunlanadi — qayta resolve/reject qilinib bo'lmaydi.

### S2: `fetch()` 404 yoki 500 holatida reject qilmaydi — nima uchun va qanday tekshirish kerak?

**Javob:** `fetch()` faqat tarmoq xatosi (masalan, DNS xato, to'xtab qolgan server) da reject qiladi. HTTP 404 yoki 500 holati — "javob keldi" (response keldi), lekin status noto'g'ri. Shuning uchun `fetch` Promise resolved bo'ladi, lekin `res.ok` (`res.status >= 200 && res.status < 300`) tekshirib borish kerak. Agar `!res.ok` — `throw new Error(`HTTP ${res.status}`)` yoki o'zingiz xato qiling.

### S3: `async` funksiya qanday qaytaradi? `async function f() { return 42; }` qanday ishlaydi?

**Javob:** `async` funksiya — har doim Promise qaytaradi. `return 42` → Promise resolve 42. Xato berishi (`throw new Error(...)`) → Promise reject bo'ladi. Shuning uchun `async` funksiya chaqirilganda `.then()`, `.catch()`, yoki `await` yordamida natijani qabul qilish kerak.

### S4: `Promise.all` va `Promise.allSettled` farqi?

**Javob:** `Promise.all` — barchasi fulfilled bo'lsa, umumiy Promise resolve (array qiymatlar bilan). Bir biri reject bo'lsa — Promise reject (birinchi reject bilan). `Promise.allSettled` — barchasi yakunlansa (fulfilled yoki rejected), natija array (har biri `{ status: 'fulfilled', value }` yoki `{ status: 'rejected', reason }`). Shuning uchun barchasi yakunlansa ham, xatolarni ham qayta ishlovchi kodda `allSettled` foydali.

### S5: `Promise.race` nima ishlaydi? Misol yozing.

**Javob:** `Promise.race([p1, p2, p3])` — birinchi yakunlanayotgan Promise (fulfilled yoki rejected) qaytariladi. Misol: `Promise.race([delay(2000), delay(1000), delay(3000)])` → delay(1000) keladi (1 soniya). Timeout: `Promise.race([someLongTask(), timeout(5000)])` — agar task 5 soniyadan ko'p tushsa, timeout reject bo'ladi.

### S6: Callback hell nima? Qanday hal qilinadi?

**Javob:** Callback hell — callback qo'shimcha callback ichida, qancha deep nesting — qiyin o'qish, xato ushlab olish qiyin. Promise bilan `then().then().then()` — zanjirli shakl. Async/await — `try { const a = await step1(); const b = await step2(a); }` — synchronous ko'rinishda, lekin asinxron. Shuning uchun Promise va async/await callback hell ni hal qiladi.

### S7: `await` ni async funksiya tashqarisida qo'llash mumkinmi?

**Javob:** Yo'q — `await` faqat `async` funksiya ichida ishlaydi. `await` ni global scope yoki async funksiya tashqarisida ishlatish — SyntaxError. Shuningdek, top-level await (modulda) — ESM module da ishlaydi (browser/Node.js). Lekin umumiy funksiya chaqiruvida — funksiyani `async` qilish kerak.

### S8: Promise reject bo'ldi, lekin `.catch()` yo'q — nima yuz beradi?

**Javob:** "Uncaught (in promise)" xatosi — console da `Uncaught (in promise) Error: ...` ko'rinadi. Bu xato "catch" bo'lmaydi, shuning uchun uni ushlab olish vositasi yo'q. Shuning uchun Promise reject bo'lishi kerak, `.catch()` yoki `try/catch` bilan ushlab olish kerak.

### S9: `try/catch` bilan `await` qanday ishlaydi? Misol yozing.

**Javob:** `async function` ichida `try { const res = await fetch(url); } catch (err) { console.error(err); }` — agar `await` Promise reject bo'lsa, `catch` bloki ishga tushadi. Bu Promise `.catch()` bilan bir xil. Misol:

```javascript
async function load() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('YUK XATO:', err);
    throw err; // yoki fallback
  }
}
```

### S10: `finally()` nima uchun kerak?

**Javob:** `finally()` — Promise yakunlanganda (fulfilled yoki rejected) har doim ishga tushadi. Masalan, loading spinnerni o'chirish, resourceni bekor qilish, ya'ni cleanup. `finally` qiymatni qaytaradi (Promise chain davom etish mumkin) yoki qiymatni o'zgartirib bo'lmaydi.

### 📌 Xulosa:

- Promise — 3 holat: pending, fulfilled, rejected.
- `fetch` 404/500 da reject qilmaydi — `res.ok` tekshirish kerak.
- `async` har doim Promise qaytaradi.
- `Promise.all` — parallel, barchasi resolve; `allSettled` — barchasi yakunlansa ham.
- `await` faqat async funksiya ichida.
- Callback hell — Promise va async/await bilan hal.
- Promise reject bo'lsa, `.catch()` yoki `try/catch` bilan ushlab olish kerak.

---

**Keyingi darslar (o'rta daraja):**
1. **Event Loop va Microtask/Macrotask** (event loop mechanism, task queue, microtask queue, setTimeout, Promise resolution)
2. **Array Higher-order Metodlari** (map, filter, reduce, find, some, every, flatMap — keng qo'llaniladi)
3. **Obyektlar, Destructuring, Spread/Rest, Optional Chaining** (zamonaviy JS obyekt ishlash)
4. **JavaScript Type System va Core Internals** (type coercion qo'shimcha, memory basics, value vs reference)

Qaysi mavzuni keyingi dars qilishimiz kerak? 1, 2, 3 yoki 4? Yoki boshqa mavzu?