# 📚 Event Loop — Task Queue, Microtask, setTimeout vs Promise — O'rta daraja

## 📦 Tushunchalarning sodda izohi

JavaScript — single-threaded (yagona oqim). Bir vaqtda bir funksiya bajariladi. Ammo asinxron ishlar (setTimeout, fetch, Promises) ichki "event loop" yordamida boshqariladi — bu yakuniy qayta ishlash mexanizmi.

- **Call Stack (Yig'ilish massivi):** Hajmi qatnashuvchi funksiyalar o'zi bajariladi. Bir funksiya tugaganda — uning import massivi deng beriladi. Ikki funksiya bir vaqtda bajariladi.
- **Heap (Hajm):** Hajm chiqariladigan hajm emas — bu kod bo'limi. Hajm saqlanadi.
- **Task Queue (Macrotask Queue):** setTimeout, setInterval, I/O, UI rendering — chunki buning "tasklar" joylashgan joyi. Faraziy.
- **Microtask Queue (Microtask Queue):** Promises (then/catch/finally), MutationObserver, queueMicrotask — buning "microtasklar" joylashadi. **Priority:** microtasklar educational bo'lib tasklarga (axamloblack).
- **Event Loop (Hodisa sikli):** Call stack bo'sh (empty) bo'lganda: microtask queue bo'sh bo'lguncha — barcha microtasklar bajariladi; keyin task queue (macrotask) dan biri bajariladi. Juftlik.
- **setTimeout:** — task (macrotask) hosil qiladi. `setTimeout(callback, 0)` — emasman callback task queue ga qo'shadi, lekin u call stack bo'sh bo'lganda bajariladi. Zero delay ham instant emas — tasklar series.
- **Promise.resolve().then()** — microtask qo'shadi. Call stack tugagandan so'ng — barcha microtasklar bajariladi. Shunday qilib, Promise callbacklari setTimeout dan avval ishlaydi.

*Soddalashtirilgan tartib:* Call Stack → Call Stack bo'sh → Microtask queue bobomin bo'lishish tugagunda — barcha microtasklar bosh qilinadi; microtasklar tugaganda — task queue dan biri (setTimeout, I/O); keyin rendering; keyin tasklar davom etadi.

*Oddiy misol:* `console.log('1'); setTimeout(()=>console.log('2'), 0); Promise.resolve().then(()=>console.log('3')); console.log('4');` → tartib: 1 → 4 → 3 → 2.

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. setTimeout vs Promise — tartib
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
// Tartib: start → end → promise → timeout

// 2. Microtask priority (Promise)
console.log(1);
setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise 1'));
setTimeout(() => console.log('setTimeout2'), 0);
Promise.resolve().then(() => console.log('Promise 2'));
console.log(2);
// Tartib: 1, 2, Promise 1, Promise 2, setTimeout, setTimeout2

// 3. Recursion yordamida task (setTimeout)
function scheduleWork() {
  setTimeout(() => {
    console.log('task run');
    scheduleWork();
  }, 100);
}
scheduleWork(); // call stack bo'sh, task joylanadi, har 100ms

// 4. Promise chain — microtasklar zanjiri
Promise.resolve()
  .then(() => console.log('A'))
  .then(() => console.log('B'))
  .then(() => console.log('C'));
// A → B → C (kattayi harp)

// 5. async/await — subscribe funksiya
async function demo() {
  console.log('1');
  await Promise.resolve().then(() => console.log('await done'));
  console.log('2');
}
demo();
console.log('3');
// Tartib: 1 → 3 → await done → 2

// 6. Animation frame (postMessage, requestAnimationFrame)
// requestAnimationFrame — microtask bo'lmagan (callback rendering)
console.log('before rAF');
requestAnimationFrame(() => console.log('rAF callback'));
console.log('after rAF');
// Bir "requestAnimationFrame" callback boshqa queue da

// 7. Zone-y (task vs microtask)
console.log('begin');
setTimeout(() => console.log('timeout A'), 0);
setTimeout(() => console.log('timeout B'), 0);
queueMicrotask(() => console.log('microtask 1'));
queueMicrotask(() => console.log('microtask 2'));
console.log('finish');
// Tartib: begin, finish, microtask 1, microtask 2, timeout A, timeout B
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: setTimeout callbackning "instant" ekanligi
console.log('1');
setTimeout(() => console.log('instant?'), 0);
console.log('2');
// NotImplementedException: 'instant?' o'zgachir — task queue kuting

// XATO 2: Promise callbacki setTimeout bilan o'rag'ishan
window.addEventListener('load', () => {
  setTimeout(() => console.log('timeout'), 0);
  Promise.resolve().then(() => console.log('promise'));
  // promise avval ishlaydi, uni share emas
});

// XATO 3: Microtask chain — recursive ishlashda xato
function loop() {
  Promise.resolve().then(loop); // Infinite microtask — stack crash!
}
loop();

// XATO 4: Promise hosil qilishda callback hell
// console.log('done');
// .then(() => setTimeout(...)) — task

// XATO 5: Call stack masshima (recursive) — stack overflow
function badRecursive(x) {
  console.log(x);
  badRecursive(x + 1); // call stack masshima — xato!
}
badRecursive(1);

// XATO 6: setTimeout delay nol tarzda — immediate emas
setTimeout(() => console.log('immediate'), 0);
console.log('after'); // 'after' avval chiqadi — task queue kuting

// XARO 7: Microtaskni call stack tugashiga ishlash
// Microtask qo'shildi, lekin call stack tugash uni bajariladi — har doim effector call stack tugashidan keyin
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Tartib bilish:** console.log → Promise.then (microtask) → setTimeout (task).
- **Microtask priority** — Promise microtasklar tasklarga avval (call stack tugashini).
- **setTimeout(callback, 0)** — emasman callback task queue ga joylanadi, keyin bajariladi (call stack bo'sh).
- **async/await** — await Promise.resolve dan microtask qo'shadi.
- **Recursive mikro taks** — `queueMicrotask` yoki Promise recursion "infinite microtask" (stack xato).
- **Task recursion** — `setTimeout(callback, 0)` — call stack tugashiga bajariladi (stack masshima).
- **requestAnimationFrame** — rendering queue — microtask emas.

### ❌ Noto'g'ri:

- **setTimeout instant** — emas — task queue (kuting).
- **Promise callbacki setTimeoutdan avval** — o'rgab bo'lmagan holda xato.
- **Microtask recursion** — "infinite microtask" — call stack bo'sh, microtask zanjiri tugamaydi, browser crash.
- **Callback hell** — Promise va async/await bilan hal qilinadi.
- **Promise this yerda "instant"** — task — kuting darebi.
- **Call stack masshima** — "stack overflow" — funksiya recursion funksiya tugamaydi.
- **Microtask qo'shildi, lekin call stack tugash uni bajariladi — har doim effector call stack tugashidan keyin**

## 🎩 Hayotiy o'xshatishlar

- **Call Stack:** "Sarrafon" — bir funksiya bajariladi, tugaganda keyingisi. Ikki oqimli sarrafon bilan ishlaydigan "tarmoq" — yuqori sarrafon.
- **Microtask (Promise):** "Tez-tez o'tqaziladigan vezik" — sarrafon tugashidan darhol, mikroveziklar (Promise callbacklari) ovozlashtiriladi.
- **Task (setTimeout):** "Kechiktirilgan vezik" — sarrafon tugashidan, vaqt tugaganda, takrorlanadi. Zero delay — "hoverka emas", task queue kuting.
- **Event Loop:** "Boshqaruvchi" — sarrafon (call stack) bo'shmi? Shunda, mikroveziklar joylatilgan qiladi (Promise), mikroveziklar tugashidan keyin, keskin veziklar (setTimeout) bir tarzi.
- **RequestAnimationFrame:** "Animatsiyaning video qismi" — pixelga mos ravishda callback.

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Call Stack ] --> B{ Call Stack bo'sh? }
    B -->|Yo'q| C[ Umumiy funksiyon bajariladi ]
    B -->|Ha| D[ Microtask Queue bo'sh? ]
    D -->|Yo'q| E[ Barcha microtasklar (Promise.then) bajariladi ]
    D -->|Ha| F[ Task Queue (Macrotask) dan biri ]
    E --> B
    F --> G[ setTimeout, I/O, setInterval, UI rendering ]
    G --> B
    
    H[ setTimeout(callback, 0) ] --> H1[ Task (macrotask) joylash ]
    I[ Promise.resolve().then() ] --> I1[ Microtask joylash ]
    J[ queueMicrotask() ] --> J1[ Microtask joylash ]
    
    style A fill:#e3f2fd,stroke:#1976d2
    style B fill:#fff3e0,stroke:#e65100
    style E fill:#c8e6c9,stroke:#2e7d32
    style F fill:#ffebee,stroke:#c62828
    style I1 fill:#f3e5f5,stroke:#7b1fa2
```

**Diagrama tushuntirishi:** Event Loop mexanizmi:
1. Call stack (funksiyalar bajariladi) tugashini kutadi (bo'sh).
2. Call stack bo'sh — microtask queue (Promise.then, queueMicrotask) bo'shmi? Shunday bolsa — barcha microtasklar bosh qilinadi.
3. Microtask tugashidan keyin — task queue (setTimeout, setInterval, I/O) dan biri bosh qiladi.
4. Keyin — browser rendering (agar kerak bo'lsa).
Shunday qilib, Promise callbacki setTimeout callbackidan avval ishlaydi (microtask priority).

## 🎙 Intervyu savollari va javoblari

### S1: JavaScript event loop nima?

**Javob:** Event loop — call stack bo'sh bo'lganda microtasklarni (Promise) yoki tasklarni (setTimeout) bajarilishini boshqaruvchi sikl. Call stack tugashidan — microtask queue (Priority) tugashidan — task queue dan biri bosh qilinadi. Shunday qilib, JavaScript asinxroni asosida yoki single-threadedni hisoblaydi.

### S2: Microtask va Macrotask farqi?

**Javob:** Microtask (Promise.then, queueMicrotask, MutationObserver) — call stack tugashidan darhol bajariladi (Priority). Macrotask (setTimeout, setInterval, I/O) — task queue dan biri, rendering faslashi. Microtask tugashidan keyin Macrotask bosh qilinadi. Shunday qilib, Promise callbacki setTimeout callbackidan avval.

### S3: `setTimeout(callback, 0)` nima uchun instaant emas?

**Javob:** `setTimeout(callback, 0)` — callback task queue ga joylanadi. Call stack tugashidan — task queue kuting (event loop). Zero delay — har doim emas (minimum delay browser: 4ms). Shunday qilib, instant emas — task queue wait.

### S4: `console.log('1'); setTimeout(()=>console.log('2'),0); Promise.resolve().then(()=>console.log('3')); console.log('4');` tartib?

**Javob:** 1 → 4 → 3 → 2. Console.log ob-havo macro. Promise.then microtask (Priority), setTimeout task (Priority). Call stack tugasidan — microtask tugadi (3), keyin task (2).

### S5: `Promise.resolve().then(...).then(...)` zanjiri qanday ishlaydi?

**Javob:** Promise.resolve().then primero microtask (A). Keyin .then () boshqa microtask (B) qo'shadi. Microtask tugashidan — next microtasn tugadi (C). Shunday qilib, Promise chain microtasklar orasida queue bosh qilinadi (har bir .then qo'shimcha microtask). Tartib: A → B → C.

### S6: Async/await va event loop qanday?

**Javob:** await Promise.resolve() — Promise.resolve().then() (microtask) orqali .then () callback qo'shiladi. U holda — await "forbearance" qilib, keyingi code (console.log('2')) call stack tugashiga microtask tugashidan keyin bajariladi. Shunday qilib, 1 → 3 → await done → 2 tartibi.

### S7: call stack masshima (stack overflow) nima?

**Javob:** Call stack joyi cheklov (masalan, 10K-100K call). Recursive funksiya tugamaydi — call stack chekkan, "Maximum call stack size exceeded" xato. Shuning uchün funksiya recursion tugashini yoki iterative (loop) yoki tail recursion (JS esa qo'llab-quvvatlanmaydi). Shunday qilib, stack overflow recursive boshqarilgandanga.

### S8: `queueMicrotask` nima?

**Javob:** `queueMicrotask(callback)` — microtask qo'shish (Promise.then kabi). Shunday qilib, callback call stack tugashidan keyin microtask queue tugashidan darhol bajariladi. Masalan: `queueMicrotask(() => console.log('microtask'))` — Promise.resolve().then qo'shilmagan holda ham same priority.

### S9: requestAnimationFrame nima va microtask emas?

**Javob:** `requestAnimationFrame(callback)` — browser rendering da callback (frame per second ~60fps). Bu task queue (macrotask) emas — rendering queue. Shunday qilib, callback call stack tugashida, rendering oldin ko'ryapti. UI animatsiya uchun foydali — microtask bilan bir xil emas.

### S10: Event loop da "sleep" yoki blocking qanday?

**Javob:** Call stack blocking (shu asosida — uzun code execution). Masalan: `while (true) {}` — call stack tugashagan holda, event loop ishlamaydi (microtask, task) — blocking. Shunday qilib, asinxron callbacklar ishlamaydi (brew kon sadece call stack). Shunday qilib, blocking code evetloop blok. Shunday qilib, asinxron (setTimeout, Promise) — call stack tugashiga bajariladi, blocking emas.

### 📌 Xulosa:

- Call stack — funksiyalar bajariladi, tugaganda — event loop.
- Microtask (Promise.then, queueMicrotask) — call stack tugashidan darhol bajariladi (Priority).
- Task (setTimeout, setInterval, I/O) — task queue, rendering tugashida.
- `Promise.then` — setTimeout avval.
- `setTimeout(callback, 0)` — emasman task queue (kuting).
- Recursive microtask — infinite microtask (xato).
- Async/await — await microtask qo'shadi.
- `requestAnimationFrame` — rendering queue — microtask emas.

---

**Keyingi darslar:**
1. **Error Handling — Custom Error, Error Types, Debugging usullari**
2. **Closures Qo'shimcha — Module Pattern, Factory Functions, Currying**
3. **this keyword — call, apply, bind, arrow functions, method borrowing**
4. **React Hooks — JS context bilan uyg'unlik (useState, useEffect, useContext)**
5. **TypeScript (tip, interface, type alias) — JS keyingi bosqich**

Qaysi mavzu keyingi? Raqam (1, 2, 3, 4, 5) yoki nom. Yozayman.