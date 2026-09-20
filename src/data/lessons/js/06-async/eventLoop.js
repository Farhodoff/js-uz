export const eventLoop = {
  id: "eventLoop",
  title: "Event Loop (Hodisalar sikli)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish: Oshpaz va Restoran

### JavaScript nega "bir oqimli" (single-threaded)?
JavaScript bir vaqtning o'zida **faqat bitta** ishni bajaradi. Buning sababi — xavfsizlik: agar ikkita oqim bir vaqtda bir xil DOM elementini o'zgartirsa, nima bo'ladi? Ma'lumotlar chalkashib ketadi (race condition). Shuning uchun JS mualliflari bitta oqimni tanlagan.

Tasavvur qiling, restoran oshxonasida **faqat siz** ishlaysiz (bitta oshpaz):
* **Sinxron vazifalar:** Mijoz "Salat" buyurtma qildi. Siz darhol sabzavotlarni to'g'raysiz. Tez bajariladigan ish.
* **Asinxron vazifalar:** Boshqa mijoz "Tovuq pishirish"ni so'radi. Tovuq pishirish 30 daqiqa oladi, lekin siz kutib turmaysiz — tovuqni **pechga (Web API)** qo'yib, boshqa buyurtmalarni bajarishda davom etasiz.
* **Event Loop:** Pechdagi taom tayyor bo'lganida signal beradi (callback navbatga tushadi). Siz qo'lingizdagi ishni tugatganingizda (Call Stack bo'shganda), pechdan tayyor taomni olib mijozga berasiz (callback Call Stack-ga o'tadi).

> **Asosiy g'oya:** JS o'zi kutishni bilmaydi. Kutishni brauzer (yoki Node.js) bajaradi, JS esa faqat "natija tayyor" signalini kuzatadi. Shu kuzatuvchi — **Event Loop**.

---

## 2. 🧠 Kapot Ostida: Dvigatel va Muhit

Event Loop-ni tushunish uchun qatnashchilarni biling:

### JavaScript dvigateli (V8) — faqat 2 qism:
1. **Memory Heap** — obyektlar, massivlar, funksiyalar saqlanadigan xotira maydoni.
2. **Call Stack** — aynan qaysi funksiya ishlayotganini kuzatuvchi "ustma-ust idishlar" tizimi (LIFO: oxirgi kirgan — birinchi chiqadi). Har funksiya chaqiruvi stack-ga "frame" qo'shadi, return esa uni olib tashlaydi.

### Lekin dvigatelning o'zida asinxronlik YO'Q!
\`setTimeout\`, \`fetch\`, \`addEventListener\`, \`document\` — bularning hech biri V8 tarkibiga kirmaydi. Ular **muhit** (brauzer yoki Node.js) tomonidan taqdim etiladi:

| Qatnashchi | Vazifasi | Misollar |
|---|---|---|
| **Web APIs** | Fonda parallel ishlaydi | \`setTimeout\`, \`fetch\`, DOM Events, \`XMLHttpRequest\` |
| **Macrotask Queue** (Task Queue) | Tayyor callbacklar oddiy navbati (FIFO) | taymerlar, hodisalar, I/O |
| **Microtask Queue** (Job Queue) | Yuqori ustuvorlikdagi mayda vazifalar navbati | \`Promise.then\`, \`queueMicrotask\`, \`MutationObserver\`, \`await\` davomi |
| **Render Pipeline** | Ekran chizish: Style → Layout → Paint | har ~16.6ms (60Hz ekranda) |

> Node.js'da Web APIs o'rniga **libuv** kutubxonasi turadi — u fayl/tarmoq operatsiyalarini va Event Loop'ning o'zini boshqaradi.

---

## 3. 🔁 Event Loop Algoritmi: Bitta "Tick"

Event Loop — cheksiz aylanuvchi oddiy algoritm. Har bir aylanish **(tick)** shunday o'tadi:

1. **Call Stack bo'shashini kut** — joriy sinxron kod (script, funksiya) oxirigacha ishlashi shart.
2. **Microtask navbatini TO'LIQ bo'shat** — barcha \`Promise.then\`lar, \`queueMicrotask\`lar, \`await\`dan keyingi kodlar... Microtask bajarilayotganda yangi microtask qo'shilsa, u ham shu bosqichda bajariladi (navbat cheksiz o'sishi mumkin!).
3. **Render qilish** (agar kadr vaqti kelsa): \`requestAnimationFrame\` callbacklari → Style → Layout → Paint. Bu qadam har doim emas — 60Hz ekranda taxminan har 16.6ms da bir marta.
4. **Macrotask navbatidan BITTA vazifa ol** — faqat bittasini! Qolganlari keyingi tickni kutadi.
5. **1-qadamga qayt**.

\`\`\`mermaid
graph TD;
  A["Call Stack bo'shmi?"] -->|Yo'q| A
  A -->|Ha| B["BARCHA microtasklarni bajar"]
  B --> C{"Kadr vaqti keldimi?"}
  C -->|Ha| D["rAF → Style → Layout → Paint"]
  C -->|Yo'q| E["BITTA macrotask ol"]
  D --> E
  E --> A
\`\`\`

### Shu algoritmdan keladigan 3 ta oltin qoida:
1. **Sinxron kod doim birinchi** — stack bo'shamasdan hech narsa boshlanmaydi.
2. **Microtasklar har bir macrotaskdan oldin** — ham boshlanishda, ham har bir macrotaskdan keyin.
3. **Har tickda faqat BITTA macrotask** — shuning uchun cheksiz \`setTimeout\` zanjiri sahifani qotirmaydi (oraliqda render bo'lib turadi), lekin cheksiz \`Promise.then\` zanjiri qotiradi (render umuman bo'lmaydi).

---

## 4. 💻 Real Kod Misollari

### 1. Basic Example (Navbatni ko'rish)
\`\`\`javascript
console.log("1. Sinxron");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("2. Sinxron");

// Natija: 1 → 2 → 3 → 4
// 1-2 sinxron (stack), 3 microtask (avval), 4 macrotask (keyin)
\`\`\`

### 2. Intermediate Example (setTimeout(0) haqiqatan 0ms emas!)
\`\`\`javascript
const start = Date.now();

setTimeout(() => {
  console.log(\`Kechikish: \${Date.now() - start}ms\`); // ~1ms (birinchi daraja)
}, 0);

// Lekin ICHMA-ICH setTimeout'larda brauzer 4ms minimal kechikish majburlaydi!
let n = 0;
function nested() {
  if (n++ < 5) {
    setTimeout(nested, 0); // 5-qatordan keyin har biri >= 4ms o'lchaydi
  }
}
nested();
\`\`\`
> Bu **timer clamping** deyiladi: HTML standartiga ko'ra 5-darajadan chuqur ichma-ich taymerlar kamida 4ms kechikadi. Shuning uchun \`setTimeout\` zanjirlari "tez" emas — tez kerak bo'lsa \`queueMicrotask\` ishlating.

### 3. Advanced Example (async/await ham microtask!)
\`\`\`javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

(async () => {
  console.log("4");           // await gacha — sinxron ishlaydi!
  await null;                 // shu qatordan keyingi kod MICROTASK bo'ladi
  console.log("5");
})();

console.log("6");

// Natija: 1, 4, 6, 3, 5, 2
// Tahlil: 1 (sinxron) → 4 (async fn await gacha sinxron) → 6 (sinxron)
//         → 3, 5 (microtasklar navbat bo'yicha) → 2 (macrotask)
\`\`\`

### 4. Production Example (Og'ir ishni bo'lib bajarish — chunking)
Million elementli massivni bitta \`for\` bilan qayta ishlash sahifani 3 soniyaga "muzlatadi". Yechim — har tickda kichkina bo'lak qayta ishlab, stackni bo'shatish:
\`\`\`javascript
function processInChunks(items, chunkSize, onChunk, onDone) {
  let i = 0;
  function step() {
    const end = Math.min(i + chunkSize, items.length);
    onChunk(items.slice(i, end));   // bu bo'lak sinxron ishlaydi
    i = end;
    if (i < items.length) {
      setTimeout(step, 0);          // keyingi tickga qoldir — render nafas oladi
    } else {
      onDone();
    }
  }
  step();
}

processInChunks(
  Array.from({ length: 1_000_000 }, (_, i) => i),
  10_000,
  chunk => console.log(\`\${chunk.length} ta element qayta ishlandi\`),
  () => console.log("Tugadi! Sahifa hech qachon qotmadi")
);
\`\`\`

### 5. Enterprise Example (Microtask bilan DOM-batching)
Bir funksiyada 100 marta \`add()\` chaqirilsa, DOM 100 marta o'zgartirilmasligi kerak. Yechim — barchasini bitta microtaskda jamlash:
\`\`\`javascript
class RenderBatcher {
  #pending = new Set();
  #scheduled = false;

  add(el) {
    this.#pending.add(el);
    if (!this.#scheduled) {
      this.#scheduled = true;
      queueMicrotask(() => {
        // Barcha o'zgarishlar BITTA paketda — renderdan OLDIN yakunlanadi,
        // shuning uchun ekranda oraliq "miltillash" ko'rinmaydi
        for (const el of this.#pending) el.classList.add("updated");
        this.#pending.clear();
        this.#scheduled = false;
      });
    }
  }
}
\`\`\`
Nega microtask, macrotask emas? Chunki microtask **renderdan oldin kafolatlangan** — foydalanuvchi hech qachon oraliq holatni ko'rmaydi.

---

## 5. ⚠️ Muammo va Nima uchun Muhimligi

* **UI qotishining oldini olish:** Event Loop'ni bilmasangiz, bitta og'ir \`for\` tsikl butun sahifani "muzlatadi" — tugmalar ishlamaydi, animatsiya to'xtaydi.
* **Ketma-ketlikni bashorat qilish:** Promise + setTimeout + async/await aralashgan kodning natijasini Event Loop'siz taxmin qilib bo'lmaydi. Interviewlarda aynan shu so'raladi.
* **To'g'ri API tanlash:** "Keyingi tickda bajar" deyishning 4 xil usuli bor (\`setTimeout\`, \`queueMicrotask\`, \`requestAnimationFrame\`, \`MessageChannel\`) — har birining o'z vaqti va kafolati bor.

---

## 6. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`setTimeout(fn, 0)\` darhol bajariladi deb o'ylash
\`\`\`javascript
setTimeout(() => console.log("keyin"), 0);
console.log("oldin"); // "oldin" doim birinchi!
\`\`\`
0ms — bu "navbatga tush" degani, "darhol bajar" emas. Stack va barcha microtasklar bo'shamasdan hech qanday macrotask boshlanmaydi.

### 2. \`new Promise()\` ichidagi kod asinxron deb o'ylash
\`\`\`javascript
new Promise((resolve) => {
  heavyComputation(); // ❌ BU SINXRON! Oqimni to'liq bloklaydi
  resolve();
});
\`\`\`
Faqat \`.then/.catch/.finally\` callbacklari microtask. Executor (ichidagi funksiya) oddiy sinxron kod.

### 3. \`await\`dan keyingi kod sinxron deb o'ylash
\`\`\`javascript
async function f() {
  console.log("A");
  await null;
  console.log("B"); // Bu microtask — "awaitdan keyingi har narsa .then() bilan bir xil"
}
\`\`\`

### 4. Microtask starvation (ochlik) yaratish
\`\`\`javascript
function loop() {
  Promise.resolve().then(loop); // ❌ sahifa MUTELAZIM qotadi
}
\`\`\`
Microtask navbati bo'shamasdan render va macrotasklar umuman ishlamaydi. Cheksiz zanjir kerak bo'lsa — \`setTimeout\` ishlating (har tickda renderga ruxsat beradi).

### 5. Og'ir sinxron hisobni oqimda qoldirish
\`\`\`javascript
// ❌ 10 soniyalik hisob = 10 soniya qotgan sahifa
const result = fibonacci(50);
// ✅ Yechim: Web Worker (aloqida oqim) yoki chunking
\`\`\`

### 6. \`setInterval\` bilan og'ir ish bajarish
\`\`\`javascript
setInterval(veryHeavyFn, 1000); // Agar veryHeavyFn 2s olsa, qat.orasan navbat to'planadi
\`\`\`
Interval bajarilishini kafolatlamaydi — og'ir ishlarda \`setTimeout\` rekurziyasi (o'zini o'zi chaqirish) xavfsizroq: keyingi takrorlash faqat joriy ish tugagach rejalashtiriladi.

### 7. Microtaskdan macrotaskga o'tishni kutish
\`\`\`javascript
Promise.resolve().then(() => {
  // Bu yerda DOM o'zgartirsangiz — render HALI bo'lmagan
  // Foydalanuvchi yangi holatni faqat barcha microtasklar tugagach ko'radi
});
\`\`\`
"Ekran yangilangandan keyin" kerak bo'lsa — \`requestAnimationFrame\` yoki \`setTimeout\`.

### 8. Asinxron xatolarni sinxron try/catch bilan ushlash
\`\`\`javascript
try {
  setTimeout(() => { throw new Error("Kech kelgan xato"); }, 0);
} catch (e) {
  // ❌ USHLANMAYDI — try/catch bloki allaqachon tugagan!
}
\`\`\`
Har bir callback — alohida stack. \`setTimeout\` ichidagi xato faqat \`window.onerror\` yoki ichida \`try/catch\` bilan ushlanadi.

### 9. Navbat ustuvorliklarini aralashtirib yuborish
\`Promise.then\` bilan \`setTimeout\` o'rtasidagi farqni bilmaslik → API'dan olingan ma'lumot "kech kelgan"dek ko'rinadi yoki UI eski holatda qoladi.

### 10. Node.js'da \`process.nextTick\`ni cheksiz chaqirish
\`process.nextTick\` — Promise'lardan HAM ustun navbat. Cheksiz zanjir butun Node.js jarayonini (I/O, server) bloklaydi. Undan faqat juda shoshilinch holatlar uchun foydalaning.

---

## 7. 💬 Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript nega bir oqimli (single-threaded)?
   * **Javob:** DOM bilan parallel ishlashda race condition'larga yo'l qo'ymaslik uchun. Bitta oqim = bashorat qilinadigan xolat. Asinxronlik esa Event Loop orqali emulyatsiya qilinadi.

2. **Savol:** Event Loop nima qiladi?
   * **Javob:** Call Stack va navbatlarni kuzatib turuvchi mexanizm: Stack bo'shagach microtasklarni to'liq bajaradi, so'ng bitta macrotask oladi va jarayon takrorlanadi.

3. **Savol:** Call Stack nima?
   * **Javob:** Hozir ishlayotgan funksiyalarning LIFO ro'yxati. Funksiya chaqirilsa ustiga qo'shiladi, tugasa olib tashlanadi. To'lib ketsa — "Maximum call stack size exceeded".

4. **Savol:** \`setTimeout(fn, 0)\` nega aynan 0ms dan keyin ishlamaydi?
   * **Javob:** 0ms taymer "navbatga qo'shilganini" anglatadi. Uning callback'i macrotask — stack bo'shashi va barcha microtasklar bajarilishi kutadi. Bundan tashqari brauzer minimal ~1ms (nested'da 4ms) kechikish qo'shadi.

### Middle (5–8)
5. **Savol:** Event Loop'ning bitta tick qadamlari qanday?
   * **Javob:** (1) Stack bo'shashini kut, (2) barcha microtasklarni bo'shat, (3) kerak bo'lsa render (rAF → style → layout → paint), (4) BITTA macrotask bajar, (5) takrorla.

6. **Savol:** \`new Promise\` executori va \`.then\` callbacki qanday farqlanadi?
   * **Javob:** Executor sinxron — stackda darhol ishlaydi. \`.then/.catch/.finally\` callbacklari — microtask: faqat stack bo'shagach bajariladi.

7. **Savol:** Sahifa qachon chiziladi (render) va \`requestAnimationFrame\` qayerda turadi?
   * **Javob:** Render — microtasklardan keyin, keyingi macrotaskdan oldin (kadr vaqti kelganda). rAF callbacklari aynan render bosqichining boshida, style hisoblanishidan OLDIN chaqiriladi.

8. **Savol:** 3 soniyalik og'ir hisobni sahifani qotirmay bajarish usullari?
   * **Javob:** (a) Web Worker — aloqida oqimda; (b) chunking — ishni mayda bo'laklarga bo'lib, har bo'lak orasida \`setTimeout\` bilan stackni bo'shatish; (c) \`requestAnimationFrame\` bilan kadr oralariga taqsimlash.

### Senior (9–12)
9. **Savol:** Brauzer va Node.js Event Loop'lari orasidagi farq?
   * **Javob:** Brauzer: bitta macrotask + microtasklar + render. Node.js: libuv kutubxonasi, fazalarga bo'lingan (timers → pending → poll → check → close), har fazadan keyin microtasklar (\`process.nextTick\` + Promise) bajariladi, \`setImmediate\` check fazasida ishlaydi.

10. **Savol:** Timer clamping (4ms qoidasi) nima va nega kerak?
    * **Javob:** 5-darajadan chuqur ichma-ich \`setTimeout\`lar kamida 4ms kechikishga majburlanadi. Sababi: tarixda CSPF hujumlaridan himoya va CPU tejash. Shuning uchun \`setTimeout\` zanjiri — sekin \`queueMicrotask\` o'rniga emas, "renderga yo'l berish" vositasi.

11. **Savol:** Microtask starvation'dan qanday himoyalanamiz?
    * **Javod:** Cheksiz/katta zanjirlarni microtaskda emas, macrotaskda davom ettirish (\`setTimeout\`/\`MessageChannel\`). Monitoring: \`PerformanceObserver\` bilan 50ms dan uzun "long task"larni kuzatish. Ba'zi muhitlarda \`scheduler.yield()\` yangi API si taklif qilinadi.

12. **Savol:** \`MessageChannel\` orqali postMessage nima uchun ishlatiladi?
    * **Javob:** U yana bir macrotask manbai — va hozirgi tickda "mumkin bo'lgandan tezroq" macrotask yaratadi (\`setTimeout\`ning minimal kechikishiga bog'lanmagan). React kabi kutubxonalar uni scheduling uchun ishlatgan (browser "postTask/yield" APIlari paydo bo'lguncha).

---

## 8. 🎯 Real Loyiha Tahlili

### Infinite Scroll: Renderga to'sqinlik qilmasdan yuklash
Muammo: foydalanuvchi pastga skroll qilganda 500 ta postni render qilish — sahifa muzlaydi.

Yechim: har macrotaskda bitta sahifa (20 post) yuklash va render qilish — Event Loop har qadamda skroll hodisasiga va ekran chizishiga yo'l beradi:

\`\`\`javascript
async function loadAllPosts() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const posts = await fetchPosts(page); // I/O — brauzerda fonda
    renderPosts(posts);                   // qisqa sinxron ish
    hasMore = posts.length === 20;
    page++;

    // ⭐ Muhim qadam: keyingi yuklanishni KEYINGI TICKga qoldiramiz.
    // Bu orada brauzer: skroll hodisasini ushlaydi, ekranni chizadi,
    // foydalanuvchi harakatini sezadi — sahifa "tirik" turadi.
    await new Promise(r => setTimeout(r, 0));
  }
}
\`\`\`

Agar \`await new Promise(r => setTimeout(r, 0))\` qatorini olib tashlasangiz — 500 post bitta tickda render bo'lib, UI 2-3 soniya qotadi.

---

## 9. 🚀 Performance va Optimization

* **50ms qoidasi:** Har bir vazifa 50ms dan uzun bo'lmasin (Long Task). Undan oshsa — bo'ling (chunking) yoki Worker'ga o'tkazing. O'lchash: \`PerformanceObserver\` + \`'longtask'\` entrylari.
* **rAF vizual ishlar uchun:** DOM o'lchash + o'zgartirishni aralashtirmang (layout thrashing). O'lchashlarni yig'ib, o'zgartirishlarni bitta rAF ichida bajaring.
* **Microtask = tez, lekin renderdan oldin:** \`queueMicrotask\` ~0ms kechikadi, lekin ekranda hech narsa ko'rinmaydi. \`requestAnimationFrame\` = keyingi kadr (16.6ms), \`setTimeout(0)\` = keyingi tick (≥1ms, nested ≥4ms).
* **Web Worker:** CPU og'ir ishlarni (parsing, kriptografiya, filterlash) umuman boshqa oqimga chiqaring — asosiy oqim 100% bo'sh qoladi.

---

## 10. 📌 Cheat Sheet

| Vazifa turi | Navbat | API'lar | Ustuvorlik | Cheksiz zanjir ta'siri |
|---|---|---|---|---|
| **Sinxron kod** | Call Stack | Oddiy kod, \`new Promise\` executori | 1 (eng avval) | Sahifani to'liq bloklaydi |
| **Microtask** | Job Queue | \`Promise.then/catch/finally\`, \`queueMicrotask\`, \`await\` davomi, \`MutationObserver\` | 2 (har tickda to'liq bo'shatiladi) | Render + macrotasklarni ochlikka olib keladi (qotadi) |
| **Render** | Render Pipeline | \`requestAnimationFrame\` → Style → Layout → Paint | 3 (microtasklardan keyin) | — |
| **Macrotask** | Task Queue | \`setTimeout\`, \`setInterval\`, I/O, hodisalar, \`MessageChannel\` | 4 (har tickda BITTA) | Sahifa qotmaydi — har tickda render bo'ladi |
| **Node maxsus** | nextTick Queue | \`process.nextTick\` | Microtasklardan ham oldin | Butun jarayonni bloklaydi |
| **Node check** | Check phase | \`setImmediate\` | Poll fazasidan keyin | — |`,
  exercises: [
    {
      id: 1,
      title: "Sinxron va Asinxron Ketma-ketlik",
      instruction: "Quyidagi `scheduleLogs(logFn)` funksiyasini yozing. U berilgan `logFn` funksiyasini quyidagi tartibda chaqirsin:\\n1. 'Start' (sinxron)\\n2. 'Middle' (asinxron, setTimeout orqali)\\n3. 'End' (sinxron)",
      startingCode: "function scheduleLogs(logFn) {\\n  // Kodni shu yerda yozing\\n}\\n",
      hint: "logFn('Start') va logFn('End') ni sinxron yozing, o'rtada setTimeout(() => logFn('Middle'), 0) dan foydalaning.",
      test: "if (!code.includes('setTimeout')) return 'setTimeout ishlatilmadi';\\nconst sandbox = new Function(code + '; return scheduleLogs;');\\nconst fn = sandbox();\\nconst logs = [];\\nconst logFn = (msg) => logs.push(msg);\\nfn(logFn);\\nif (logs.length === 2 && logs[0] === 'Start' && logs[1] === 'End') {\\n  return new Promise((resolve) => {\\n    setTimeout(() => {\\n      if (logs.length === 3 && logs[2] === 'Middle') resolve(null);\\n      else resolve('Ketma-ketlik xato');\\n    }, 20);\\n  });\\n}\\nreturn 'Sinxron qism to\\\\'g\\\\'ri bajarilmadi';"
    },
    {
      id: 2,
      title: "Promise bilan Kechikish (Delay)",
      instruction: "Berilgan `ms` (millisekundlar) dan keyin resolve bo'ladigan Promise qaytaruvchi `delay(ms)` funksiyasini yozing.",
      startingCode: "function delay(ms) {\\n  // Kodni shu yerda yozing\\n}\\n",
      hint: "Yangi Promise yarating va uning resolve qismini setTimeout ichida ishlating.",
      test: "if (!code.includes('Promise') || !code.includes('setTimeout')) return 'Promise va setTimeout ikkalasi ham ishlatilishi shart';\\nconst sandbox = new Function(code + '; return delay;');\\nconst fn = sandbox();\\nconst start = Date.now();\\nreturn fn(50).then(() => {\\n  const diff = Date.now() - start;\\n  if (diff >= 40 && diff <= 120) return null;\\n  return 'Kechikish noto\\\\'g\\\\'ri';\\n});"
    },
    {
      id: 3,
      title: "Funksiyani Asinxron Chaqirish",
      instruction: "Qabul qilingan `fn` funksiyasini asinxron ravishda (Event Loop orqali) chaqiradigan `callAsync(fn)` funksiyasini yozing.",
      startingCode: "function callAsync(fn) {\\n  // Kodni shu yerda yozing\\n}\\n",
      hint: "setTimeout(fn, 0) yordamida uni navbatga qo'ying.",
      test: "if (!code.includes('setTimeout')) return 'setTimeout ishlatilmadi';\\nconst sandbox = new Function(code + '; return callAsync;');\\nconst fn = sandbox();\\nlet called = false;\\nfn(() => { called = true; });\\nif (called) return 'Sinxron chaqirildi, asinxron kerak';\\nreturn new Promise(resolve => {\\n  setTimeout(() => resolve(called ? null : 'Chaqirilmadi'), 10);\\n});"
    },
    {
      id: 4,
      title: "Microtask va Macrotask Navbati",
      instruction: "`logTasks(logFn)` funksiyasi `logFn` orqali 3 ta qiymatni konsolga chiqarsin: 1 (Sinxron), 2 (Microtask), 3 (Macrotask). Ular aytilgan tartibda ishlashi uchun to'g'ri API larni tanlang.",
      startingCode: "function logTasks(logFn) {\\n  // 1, 2, 3 ni mos ravishda chaqiring\\n}\\n",
      hint: "logFn(1) ni sinxron, logFn(2) ni Promise.resolve().then() ichida, logFn(3) ni setTimeout ichida ishlating.",
      test: "const sandbox = new Function(code + '; return logTasks;');\\nconst fn = sandbox();\\nconst logs = [];\\nfn(msg => logs.push(msg));\\nif (logs[0] !== 1) return 'Birinchi sinxron ishlashi kerak';\\nreturn new Promise(resolve => {\\n  setTimeout(() => {\\n    if (logs[1] === 2 && logs[2] === 3) resolve(null);\\n    else resolve('Microtask va Macrotask navbati buzildi');\\n  }, 10);\\n});"
    },
    {
      id: 5,
      title: "Taymerni Bekor Qilish",
      instruction: "`createCancelableTask(fn, ms)` funksiyasi vazifani `ms` dan so'ng bajarishni rejalashtirsin va taymerni bekor qila oladigan funksiya qaytarsin.",
      startingCode: "function createCancelableTask(fn, ms) {\\n  // Taymerni saqlang va cancel qilish uchun funksiya qaytaring\\n  return function cancel() {\\n    \\n  };\\n}\\n",
      hint: "setTimeout ID sini o'zgaruvchida saqlang va clearTimeout yordamida to'xtating.",
      test: "const sandbox = new Function(code + '; return createCancelableTask;');\\nconst fn = sandbox();\\nlet called = false;\\nconst cancel = fn(() => { called = true; }, 50);\\ncancel();\\nreturn new Promise(resolve => setTimeout(() => resolve(called ? 'Bekor qilinmadi' : null), 60));"
    },
    {
      id: 6,
      title: "setInterval bilan Takrorlash",
      instruction: "`repeatTask(fn, ms, times)` funksiyasi `fn` ni har `ms` vaqtda jami `times` marta chaqirsin, so'ng to'xtatsin.",
      startingCode: "function repeatTask(fn, ms, times) {\\n  // Interval yarating va kerakli marta ishlagach clearInterval qiling\\n}\\n",
      hint: "Sanoqchi (counter) ishlating va u times ga yetganda clearInterval ni chaqiring.",
      test: "const sandbox = new Function(code + '; return repeatTask;');\\nconst fn = sandbox();\\nlet count = 0;\\nfn(() => { count++; }, 10, 3);\\nreturn new Promise(resolve => setTimeout(() => resolve(count === 3 ? null : 'Takrorlash soni xato'), 60));"
    },
    {
      id: 7,
      title: "queueMicrotask orqali tezkor vazifa",
      instruction: "`runMicrotask(fn)` funksiyasini yozing, u `queueMicrotask` yordamida funksiyani Microtask sifatida ishga tushirsin.",
      startingCode: "function runMicrotask(fn) {\\n  // queueMicrotask ishlating\\n}\\n",
      hint: "queueMicrotask global funksiya bo'lib unga to'g'ridan-to'g'ri fn ni berib yuborishingiz mumkin.",
      test: "if (!code.includes('queueMicrotask')) return 'queueMicrotask ishlatilmadi';\\nconst sandbox = new Function(code + '; return runMicrotask;');\\nconst fn = sandbox();\\nlet called = false;\\nfn(() => { called = true; });\\nif (called) return 'Sinxron ishladi';\\nreturn Promise.resolve().then(() => called ? null : 'Microtask ishlamadi');"
    },
    {
      id: 8,
      title: "Promise Zanjiri (Chaining)",
      instruction: "`chainPromises(val)` funksiyasi `val` ni olsin va quyidagi 3 ta operatsiyani Promise then orqali zanjir qilib bajarsin: 1) val + 1 2) val * 2 3) val - 1. Natijada so'nggi qiymat Promise ichida qaytsin.",
      startingCode: "function chainPromises(val) {\\n  return Promise.resolve(val)\\n    // .then() larni yozing\\n}\\n",
      hint: "Har bir then() ichida oldingi natijani olib arifmetik amalni bajarib qaytaring.",
      test: "const sandbox = new Function(code + '; return chainPromises;');\\nconst fn = sandbox();\\nreturn fn(2).then(res => res === 5 ? null : 'Natija noto\\\\'g\\\\'ri');"
    },
    {
      id: 9,
      title: "Parallel Asinxron Kutish (Promise.all)",
      instruction: "Uchta Promise (P1, P2, P3) beriladi. Ular hammasi tugagach, ularning natijalarini jamlab (massiv ko'rinishida) qaytaruvchi `waitAll(p1, p2, p3)` funksiyasini yozing.",
      startingCode: "function waitAll(p1, p2, p3) {\\n  // Kodni shu yerda yozing\\n}\\n",
      hint: "Promise.all([p1, p2, p3]) dan foydalaning.",
      test: "const sandbox = new Function(code + '; return waitAll;');\\nconst fn = sandbox();\\nreturn fn(Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)).then(res => (res[0]===1 && res[1]===2 && res[2]===3) ? null : 'Massiv noto\\\\'g\\\\'ri');"
    },
    {
      id: 10,
      title: "Sinxron blokirovkani qismlarga bo'lish (Chunking)",
      instruction: "Juda ko'p tsikl brauzerni qotirib qo'yishi mumkin. 1 dan N gacha sonlarni yig'uvchi, lekin buni asinxron ravishda (o'zini o'zi setTimeout orqali chaqirib) bo'lib-bo'lib (chunk) bajaruvchi funksiya namunasi berilgan, ushbu funksiya to'g'ri ishlashi va Promise ni resolve qilishi uchun uni to'ldiring.",
      startingCode: "function asyncSum(n) {\\n  return new Promise(resolve => {\\n    let sum = 0;\\n    let i = 1;\\n    function chunk() {\\n      let count = 0;\\n      // Har bir tsiklda faqat 10 martagacha yig'indi qo'shilsin\\n      while(i <= n && count < 10) {\\n        sum += i++;\\n        count++;\\n      }\\n      if (i <= n) {\\n        setTimeout(chunk, 0);\\n      } else {\\n        resolve(sum);\\n      }\\n    }\\n    chunk();\\n  });\\n}\\n",
      hint: "Faqat code to'g'ri ishlashini tekshirib setTimeout ga chunk callbackini bering.",
      test: "const sandbox = new Function(code + '; return asyncSum;');\\nconst fn = sandbox();\\nreturn fn(25).then(res => res === 325 ? null : 'Yig\\\\'indi xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript dasturlash tili tabiatan qanday ishlaydi?",
      options: [
        "Ko'p oqimli (Multi-threaded)",
        "Bir oqimli (Single-threaded)",
        "Parallel va faqat sinxron",
        "Faqat asinxron va oqimsiz"
      ],
      correctAnswer: 1,
      explanation: "JavaScript bir vaqtning o'zida faqat bitta vazifani bajarishga mo'ljallangan bir oqimli (single-threaded) tildir."
    },
    {
      id: 2,
      question: "Event Loop (Hodisalar sikli) ning asosiy vazifasi nima?",
      options: [
        "Kodni tezroq kompilyatsiya qilish",
        "Call Stack va Callback Queue-ni kuzatib, Stack bo'shagach navbatdagi kodni bajarish",
        "Massivlar bilan ishlashni tezlashtirish va keshga yozish",
        "Sahifadagi CSS stillarni yangilab turish"
      ],
      correctAnswer: 1,
      explanation: "Event Loop uzluksiz ravishda Call Stack-ni tekshiradi. Agar u bo'sh bo'lsa, navbatdagi asinxron vazifalarni Stack-ga o'tkazib beradi."
    },
    {
      id: 3,
      question: "Call Stack nima vazifani bajaradi?",
      options: [
        "Asinxron vaqtinchalik xotira sifatida ishlaydi",
        "Funksiyalar chaqiruvini (LIFO - Last In First Out tartibida) kuzatib boradi",
        "O'zgaruvchilarni global xotirada saqlaydi",
        "Sahifani qayta chizish tartibini belgilaydi"
      ],
      correctAnswer: 1,
      explanation: "Call Stack bajarilayotgan funksiyalar ketma-ketligini LIFO tamoyili asosida kuzatib boruvchi mexanizmdir."
    },
    {
      id: 4,
      question: "setTimeout(fn, 0) chaqirilganda nima sodir bo'ladi?",
      options: [
        "Funksiya zudlik bilan sinxron ravishda ishga tushadi",
        "Funksiya Web API-ga yuboriladi va Stack bo'shagandan so'ng bajariladi",
        "Funksiya mutlaqo ishlamaydi",
        "Butun Call Stack bloklanadi"
      ],
      correctAnswer: 1,
      explanation: "0 millisekund berilsa ham, setTimeout asinxron Web API hisoblanadi. U navbatga (Task Queue) qo'shiladi."
    },
    {
      id: 5,
      question: "Web API-lar (masalan, setTimeout, fetch) qayerda bajariladi?",
      options: [
        "Call Stack ichida",
        "Brauzer (yoki Node.js) muhitida parallel tarzda",
        "Callback Queue ichida",
        "Memory Heap xotirasida"
      ],
      correctAnswer: 1,
      explanation: "Web API lar brauzerning o'zi tomonidan fonda bajariladi, JS oqimini bloklamaydi."
    },
    {
      id: 6,
      question: "Call Stack va Callback Queue o'rtasidagi asosiy farq nima?",
      options: [
        "Stack sinxron kodlarni, Queue esa o'zgaruvchilarni saqlaydi",
        "Stack LIFO (oxirgi kirgan - birinchi chiqadi), Queue esa FIFO (birinchi kirgan - birinchi chiqadi) tamoyilida ishlaydi",
        "Queue sinxron, Stack asinxron ishlaydi",
        "Ular o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "Call Stack funksiyalar chaqiruvini ustma-ust yig'adi (LIFO), Queue esa asinxron vazifalarni navbat asosida (FIFO) saqlaydi."
    },
    {
      id: 7,
      question: "JavaScript dvigateli (Engine) tarkibida nimalar mavjud?",
      options: [
        "Faqat Event Loop",
        "Call Stack va Memory Heap",
        "Web API va Callback Queue",
        "DOM va CSSOM"
      ],
      correctAnswer: 1,
      explanation: "JS dvigatelining o'zi asosan Call Stack va Memory Heap dan iborat."
    },
    {
      id: 8,
      question: "Stack Starvation qanday holatda yuz berishi mumkin?",
      options: [
        "Juda ko'p setTimeout chaqirilsa",
        "Microtask Queue (masalan Promise) da cheksiz sikl hosil bo'lsa",
        "CSS render bo'lishi sekinlashsa",
        "Foydalanuvchi tez-tez chertganda"
      ],
      correctAnswer: 1,
      explanation: "Microtask Queue (Promise.then) har doim Macrotask lardan oldin bo'shatilishi kerak, shuning uchun cheksiz Microtask qotib qolishga (Starvation) olib keladi."
    },
    {
      id: 9,
      question: "Event Loop qachon Callback Queue-dagi vazifani Call Stack-ga o'tkazadi?",
      options: [
        "Vaqt tugashi bilan zudlik bilan",
        "Faqat Call Stack butunlay bo'sh bo'lgandagina",
        "Faqat foydalanuvchi harakat qilganida",
        "Istagan paytda parallel ravishda"
      ],
      correctAnswer: 1,
      explanation: "Call Stack butunlay bo'sh bo'lmaguncha, Callback Queue-dagi vazifa stack-ga o'tkazilmaydi."
    },
    {
      id: 10,
      question: "Microtask (Promise) va Macrotask (setTimeout) ishlash tartibi qanday?",
      options: [
        "Birinchi setTimeout, keyin Promise ishlaydi",
        "Sinxron koddan so'ng birinchi Microtask(Promise) va keyin Macrotask ishlaydi",
        "Ularning ishlash tartibi tasodifiy",
        "Ikkalasi ham bir vaqtda parallel ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Microtask Queue Macrotask Queue ga nisbatan yuqori ustuvorlikka (priority) ega."
    },
    {
      id: 11,
      question: "Node.js Event Loop'ining brauzerdan asosiy farqi nimada?",
      options: [
        "Node.js'da Event Loop yo'q",
        "U libuv kutubxonasiga asoslangan va bir necha bosqichlarga (phases) bo'lingan",
        "U faqat sinxron kod uchun ishlaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Node.js libuv orqali ishlaydi va uning Event Loop'i Timers, Poll, Check kabi alohida bosqichlarga bo'lingan."
    },
    {
      id: 12,
      question: "Renderlash (sahifani qayta chizish) uzluksiz bo'lishi uchun nima qilish kerak?",
      options: [
        "Barcha ishlarni Call Stack'da sinxron bajarish kerak",
        "Og'ir ishlarni Macrotask yoki Web Worker ga bo'lib berib, Call Stack'ni bo'sh saqlash kerak",
        "DOM ni mutlaqo o'zgartirmaslik kerak",
        "Faqat CSS dan foydalanish kerak"
      ],
      correctAnswer: 1,
      explanation: "Sahifa chizilishi (render) uchun Call Stack muntazam bo'shatilib turilishi kerak, shuning uchun og'ir ishlar asinxron (yoki Web Worker orqali) bo'linadi."
    }
  ]
};
