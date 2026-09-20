export const eventLoopDeep = {
  id: "eventLoopDeep",
  title: "Event Loop Chuqur Tahlili: Microtasks/Macrotasks",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish: Bank Kassiri

### Microtasks va Macrotasks nima?
1-bosqichdagi (6.7-dars) Event Loop asoslaridan bilamiz: sinxron kod → microtasklar → render → bitta macrotask. Endi navbatlarning **ichini** ochamiz.

1. **Macrotask (yoki shunchaki Task):** Brauzer/Node.js tomonidan rejalashtiriladigan yirikroq asinxron vazifalar — \`setTimeout\`, \`setInterval\`, I/O operatsiyalari, foydalanuvchi kliklari.
2. **Microtask (yoki Job):** JavaScript kodi o'zidan chiqaradigan o'ta yuqori ustuvorlikdagi mayda vazifalar — \`Promise.then/catch/finally\`, \`queueMicrotask\`, \`MutationObserver\`, \`await\`dan keyingi kod.

### Real hayotiy o'xshatish: Bank kassiri
Tasavvur qiling, siz **bank kassirisiz**:
* **Macrotasks (tashqaridagi navbat):** Bank eshigi oldida turgan mijozlar. Har biri kassaga bittadan keladi — bu har bir macrotask.
* **Microtasks (kassa oldidagi shoshilinch ishlar):** Birinchi mijoz kassaga keldi (macrotask boshlandi). Pul o'tkazdi va kvitansiyani so'radi. Jarayon paytida mijoz: "Voy, shoshilmang, yana bitta to'lovim bor edi, shuni ham qo'shib yubora olasizmi?" dedi (microtask yaratildi). Kassir navbatdagi tashqaridagi mijozni chaqirishdan OLDIN, joriy mijozning barcha shoshilinch mayda iltimoslarini (barcha microtasklarni) bajarib bo'lishi shart.
* **Rendering:** Kassa oldida hech kim qolmaganidan so'ng (stack + microtasklar bo'shagach), kassir stolidagi qog'ozlarni tartiblaydi (UI chiziladi). Faqat keyin navbatdagi tashqaridagi mijoz chaqiriladi.

\`\`\`mermaid
graph TD;
  A["Script / Macrotask"] --> B["Call Stack ishlaydi"]
  B --> C["Microtask Queue TO'LIQ bo'shatiladi"]
  C --> D{"Render kerakmi?"}
  D -->|Ha| E["rAF → Style → Layout → Paint"]
  D -->|Yo'q| F["Navbatdagi BITTA Macrotask"]
  E --> F
  F --> B
\`\`\`

---

## 2. 🧠 Chuqur Tahlil: Navbatlar Xaritasi

To'liq ustuvorlik piramidasi (yuqoridan pastga):

| # | Bosqich | Nimalar kiradi | Qachon bajariladi |
|---|---|---|---|
| 1 | **Call Stack** | Sinxron kod, \`new Promise\` executori | Darhol (LIFO) |
| 2 | **process.nextTick** (faqat Node.js) | \`process.nextTick(cb)\` | Microtasklardan HAM oldin |
| 3 | **Microtask Queue** | \`Promise.then/catch/finally\`, \`queueMicrotask\`, \`await\` davomi, \`MutationObserver\` | Stack bo'shagach, TO'LIQ |
| 4 | **rAF** (brauzer) | \`requestAnimationFrame\` callbacklari | Renderdan oldin, kadr vaqti kelganda |
| 5 | **Render** | Style → Layout → Paint | ~16.6ms da bir marta (60Hz) |
| 6 | **Macrotask Queue** | \`setTimeout\`, \`setInterval\`, I/O, hodisalar, \`MessageChannel\` | Har tickda BITTA |
| 7 | **setImmediate** (faqat Node.js) | \`setImmediate(cb)\` | Check fazasida |

### Tickning rasmiy ta'rifi
Har bir macrotask bajarilishi + undan keyingi **barcha** microtasklar = bitta **tick**. \`await\` har safar qatorini yangi microtaskga aylantiradi, shuning uchun \`await\` zanjirining har bir qadami alohida microtask ticklarida ishlaydi.

---

## 3. 💻 Real Kod Misollari

### 1. Basic Example (Klassik ustuvorlik)
\`\`\`javascript
console.log("1. Sinxron");

setTimeout(() => {
  console.log("2. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

console.log("4. Sinxron tugadi");

// Natija: 1 → 4 → 3 → 2
// Sinxron (1,4) → microtask (3) → macrotask (2)
\`\`\`

### 2. Intermediate Example (queueMicrotask ishlatilishi)
\`\`\`javascript
console.log("Start");

queueMicrotask(() => {
  console.log("Microtask 1");
  queueMicrotask(() => {
    console.log("Ichki Microtask 1.1"); // shu tickda bajariladi!
  });
});

setTimeout(() => {
  console.log("Macrotask (setTimeout)");
}, 0);

console.log("End");

// Natija: Start → End → Microtask 1 → Ichki Microtask 1.1 → Macrotask
// Microtask ichida yaratilgan microtask ham SHU tickda bajariladi
\`\`\`

### 3. Advanced Example (Promise + await + setTimeout aralashmasi)
\`\`\`javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

async function asyncFn() {
  console.log("3");
  await Promise.resolve(); // shu qatordan keyingi kod = microtask
  console.log("4");
}

new Promise((resolve) => {
  console.log("5"); // executor SINXRON ishlaydi!
  resolve();
}).then(() => console.log("6"));

asyncFn();

console.log("7");

// Bajarilish bosqichlari:
// Sinxron: "1" → taymer navbatga [2] → then navbatga [6] → "3" (asyncFn awaitgacha) → "7"
// Microtasklar: "6" → "4"
// Macrotask: "2"
// Yakuniy natija: 1, 5, 3, 7, 6, 4, 2
\`\`\`

### 4. Production Example (Kesh + asinxron izchillik kafolati)
Muammo: keshdan o'qish sinxron, serverdan olish asinxron — chaqiruvchi kod ikki xil xatti-harakatga moslashishi kerak bo'ladi. Bu bug'lar manbasi. Yechim — kesh holatda ham microtaskga o'tkazish:

\`\`\`javascript
const cache = new Map();

// ❌ Noto'g'ri: ba'zan sinxron, ba'zan asinxron
function getUserData(id, callback) {
  if (cache.has(id)) {
    callback(cache.get(id)); // SINXRON chaqirildi!
  } else {
    fetch(\`/api/user/\${id}\`)
      .then(res => res.json())
      .then(data => { cache.set(id, data); callback(data); });
  }
}

// ✅ To'g'ri: har doim asinxron (microtask) kafolati
function getUserDataSafe(id, callback) {
  if (cache.has(id)) {
    queueMicrotask(() => callback(cache.get(id))); // microtaskga o'tkazdik
  } else {
    fetch(\`/api/user/\${id}\`)
      .then(res => res.json())
      .then(data => { cache.set(id, data); callback(data); });
  }
}
// Endi chaqiruvchi uchun farq yo'q: callback doim "keyin" ishlaydi
\`\`\`

### 5. Enterprise Example (Node.js: nextTick vs setImmediate vs Promise)
\`\`\`javascript
// Node.js muhitida:
setImmediate(() => console.log("immediate")); // check fazasi
setTimeout(() => console.log("timeout"), 0);  // timers fazasi
Promise.resolve().then(() => console.log("promise")); // microtask
process.nextTick(() => console.log("nextTick"));      // nextTick navbati

console.log("sync");

// Natija: sync → nextTick → promise → timeout ≈ immediate
// (timeout va immediate tartibi ba'zan almashadi — ikkalasi alohida fazalarda,
//  lekin Promise va nextTick DOIM ikkalasidan oldin)
\`\`\`

### 6. Pro Example (Rendering flakering'ni yo'qotish)
\`\`\`javascript
// Muammo: macrotask'da DOM o'zgartirsangiz, brauzer oraliqda render qilishi mumkin
setTimeout(() => list.classList.add("visible"), 0);   // 1-kadrda
setTimeout(() => list.classList.add("animated"), 10); // 2-kadrda — miltillash!

// Yechim: ikkala o'zgarishni microtaskda birlashtirish — renderdan OLDIN
setTimeout(() => {
  list.classList.add("visible");
  queueMicrotask(() => list.classList.add("animated"));
  // Brauzer render qilishdan oldin microtaskni bajaradi →
  // ekranda ikkala class birdan paydo bo'ladi, miltillash yo'q
}, 0);
\`\`\`

---

## 4. ⚠️ Muammo va Nima uchun Muhimligi

* **Harakatlar tartibini kafolatlash:** Ba'zida kod sahifa qayta chizilishidan va yangi kliklar eshitilishidan oldin ishlashi shart. Microtask-lar bunga 100% kafolat beradi.
* **UI Barqarorligi:** Macrotask'dagi DOM o'zgarishlari orasida brauzer render qilib, ekranda "miltillash" (flickering) ko'rsatishi mumkin. Microtask'dagi o'zgarishlar vizual renderdan oldin yakunlanadi.
* **Node.js'da I/O tartibi:** \`process.nextTick\`ni noto'g'ri ishlatish butun serverni bloklashi mumkin.

---

## 5. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`new Promise()\` ichidagi kod asinxron ishlaydi deb o'ylash
\`\`\`javascript
new Promise((resolve) => {
  heavyComputation(); // ❌ Bu sinxron va oqimni to'liq bloklaydi!
  resolve();
});
\`\`\`
Promise faqat \`.then()/.catch()/.finally()\` chaqirilgandagina asinxron (microtask) yaratadi. Konstruktor executori oddiy sinxron kod.

### 2. Microtask-larda cheksiz rekursiya (Starvation)
\`\`\`javascript
function run() {
  Promise.resolve().then(run); // ❌ Cheksiz microtask zanjiri — sahifa MUZLAYDI
}
\`\`\`
Microtask navbati hech qachon bo'shamaydi, Event Loop macrotask va render bosqichiga o'ta olmaydi. \`setTimeout\` bilan qilingan xuddi shu zanjir qotirmaydi — har safar yangi macrotask bo'lib, oraliqda render ishlaydi.

### 3. Microtask va Macrotask ustuvorliklarini chalkashtirish
API'dan olingan natija "kech keldi" deb o'ylash, aslida u faqat macrotaskda ishlagani. Yoki UI o'zgarganini kutib macrotask ishlatish, aslida microtask renderdan oldin kerak bo'lgani.

### 4. Await-dan keyingi kod bajarilish joyini tushunmaslik
\`\`\`javascript
async function foo() {
  console.log("A");
  await bar();
  console.log("B"); // Bu qism MICROTASK ekanini bilmaslik — eng ko'p uchraydigan interview tuzog'i
}
\`\`\`

### 5. \`process.nextTick\`ni cheksiz chaqirish
\`\`\`javascript
function loop() {
  process.nextTick(loop); // ❌ Butun Node.js jarayonini (I/O, serverni) bloklaydi
}
\`\`\`
\`nextTick\` Promise'lardan ham ustun — uning cheksiz zanjiri hatto I/O'ni ham bo'g'adi.

### 6. \`setTimeout\` va \`setImmediate\` tartibiga ishonch
Node.js'da asosiy modulda ularning tartibi ba'zan almashadi (I/O callback ICHIDA \`setImmediate\` doim oldin, tashqarida noaniq). Tartibga bog'liq kod yozmang.

### 7. Microtaskda DOM o'lchash va o'zgartirishni aralashtirish
\`\`\`javascript
element.style.height = "100px";
console.log(element.offsetHeight); // ❌ layout majburiy hisoblanadi (layout thrashing)
element.style.height = "200px";
\`\`\`
O'lchashlarni yig'ib, bitta o'zgartirish paketida bajaring — \`rAF\` bilan.

---

## 6. 💬 Intervyu Savollari

### Junior (1–4)
1. **Savol:** Microtask va Macrotask o'rtasidagi asosiy farq nima?
   * **Javob:** Microtask-lar oliy ustuvorlikka ega — har qanday macrotask-dan oldin, to'liq bo'shatilib bajariladi. Macrotask-lar har bir tickda faqat bittadan bajariladi.

2. **Savol:** Qaysi API-lar microtask yaratadi?
   * **Javob:** \`Promise.then/catch/finally\`, \`queueMicrotask()\`, \`MutationObserver\`, va \`await\`dan keyingi kod davomi.

3. **Savol:** Qaysi API-lar macrotask yaratadi?
   * **Javob:** \`setTimeout\`, \`setInterval\`, \`setImmediate\` (Node), I/O operatsiyalari, foydalanuvchi hodisalari (click, keydown), \`MessageChannel\`.

4. **Savol:** Job Queue nima?
   * **Javob:** ECMA standarti bo'yicha Microtask Queue'ning rasmiy nomi.

### Middle (5–8)
5. **Savol:** Event Loop bitta tickda nechta macrotask va nechta microtask bajaradi?
   * **Javob:** Faqat **bitta** macrotask, so'ng navbatdagi **barcha** microtasklar (shu paytda qo'shilgan yangi microtasklar bilan birga) oxirigacha.

6. **Savol:** \`queueMicrotask\` nima uchun kerak, \`Promise.resolve().then\`dan farqi yo'qmi?
   * **Javob:** Natija bir xil, lekin \`queueMicrotask\` ancha va yakunlanish xatosini (unhandled rejection) yaratmasdan, Promise obyekt yaratmasdan to'g'ridan-to'g'ri microtask qo'shadi. Semantik jihatdan aniqroq va arzonroq.

7. **Savol:** Nega cheksiz \`setTimeout\` zanjiri sahifani qotirmaydi, cheksiz \`Promise.then\` zanjiri qotiradi?
   * **Javob:** \`setTimeout\` har safar yangi macrotask bo'lib, Event Loop har bir macrotask orasida render qilish imkoniga ega. \`Promise.then\` joriy microtask navbatida qayta-qayta yangi microtask yaratadi — navbat bo'shamaydi, render umuman ishlamaydi.

8. **Savol:** \`requestAnimationFrame\` qayerda turadi va macrotaskdan farqi nima?
   * **Javob:** rAF — render bosqichidan oldin ishlaydigan alohida navbat. U ekran yangilanishiga bog'liq (60Hz → 16.6ms da bir marta), macrotasklar esa bunga bog'lanmagan holda ishlaydi. Og'ir rAF callbacklari ham kadrlarni tushirishiga (dropped frames) olib keladi.

### Senior (9–12)
9. **Savol:** Event Loop tsiklida rendering aynan qayerda amalga oshadi?
   * **Javob:** Call Stack bo'shagach va Microtask Queue butunlay bo'shatilgandan keyin, keyingi macrotask-ga o'tishdan oldin (kadr vaqti kelganda). Shu sababli microtasklar ichidagi DOM o'zgarishlari bir kadrda birlashadi.

10. **Savol:** Node.js'da \`process.nextTick\` va \`setImmediate\` farqi?
    * **Javob:** \`process.nextTick\` — eng yuqori ustuvorlikdagi navbat, oddiy Promise microtasklaridan ham oldin ishlaydi. \`setImmediate\` — macrotask, Event Loop'ning 'check' fazasida (poll fazasi tugagach) bajariladi.

11. **Savol:** Foydalanuvchi kliki va dasturiy \`.click()\` chaqiruvi Event Loop nuqtai nazaridan farqlanadimi?
    * **Javob:** Ha. Haqiqiy klik — macrotask: har bir listener orasida microtasklar bajariladi. \`.click()\` dasturiy chaqiruv — sinxron: barcha listenerlar stack bo'shamasdan ketma-ket ishlaydi.

12. **Savol:** \`MutationObserver\` nega microtask bo'lishi kerak?
    * **Javob:** DOM o'zgarishiga javob brauzer render qilishidan oldin yakunlanishi shart — aks holda kuzatuvchi yarim yig'ilgan DOM bilan ishlaydi. Microtask kafolati (renderdan oldin to'liq bajarilish) buni ta'minlaydi.

---

## 7. 🛠️ Amaliy Topshiriqlar

Mashqlar interaktiv platforma orqali amalga oshiriladi.

---

## 8. 📝 Mini Test

Dars oxiridagi bilimni sinovchi 12 ta test savollari.

---

## 9. 🎯 Real Loyiha Tahlili

### Infinite Scroll: Renderga to'sqinlik qilmasdan yuklash
Muammo: foydalanuvchi pastga skroll qilganda 500 ta postni bitta tickda render qilish — sahifa muzlaydi.

Yechim: har tickda bitta sahifa yuklash — Event Loop har qadamda skroll hodisasiga va ekran chizishiga yo'l beradi:

\`\`\`javascript
async function loadAllPosts() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const posts = await fetchPosts(page); // I/O
    renderPosts(posts);                   // qisqa sinxron ish
    hasMore = posts.length === 20;
    page++;

    // Keyingi yuklanishni KEYINGI TICKga qoldirish.
    // Bu orada brauzer: skroll hodisasini ushlaydi, ekranni chizadi.
    await new Promise(r => setTimeout(r, 0));
  }
}
\`\`\`
Agar oxirgi \`await\` qatorini olib tashlasangiz — barcha 500 post bitta tickda render bo'lib, UI 2-3 soniya qotadi.

---

## 10. 🚀 Performance va Optimization

* **Rendering bloklanishining oldini olish:** Vizual o'zgarishlar bilan ishlaydigan asinxron amallarni \`requestAnimationFrame\` ichida yozish lozim. Bu animatsiyalar qotishini va ortiqcha CPU yuklamasini kamaytiradi.
* **Microtask hajmini nazorat qilish:** Microtask ichida og'ir tsikllardan foydalanmang, aks holda sahifa render bo'la olmay qolib ketadi (UI block).
* **DOM o'lchash/yozish paketlash:** Barcha o'lchashlarni bittada, barcha yozishlarni bittada bajaring — layout thrashing (30+ marta majburiy layout hisoblash) 60fps ni 10fps ga tushiradi.

---

## 11. 📌 Cheat Sheet

| Navbat Turi | Ustuvorlik | Tegishli API / Amallar | Cheksiz zanjir ta'siri |
| :--- | :--- | :--- | :--- |
| **Sinxron Kod** | 1-o'rin (Stack) | Asosiy kod oqimi, \`new Promise\` executori | Sahifani to'liq bloklaydi |
| **nextTick** (Node) | 2-o'rin | \`process.nextTick\` | Butun jarayonni bloklaydi |
| **Microtasks** | 3-o'rin (Job Queue) | \`Promise.then/catch/finally\`, \`queueMicrotask\`, \`await\` davomi, \`MutationObserver\` | Sahifani butunlay muzlatadi (Starvation) |
| **UI Rendering** | 4-o'rin | \`requestAnimationFrame\`, Style, Layout, Paint | — |
| **Macrotasks** | 5-o'rin (Task Queue) | \`setTimeout\`, \`setInterval\`, I/O, DOM Events, \`MessageChannel\` | Sahifani qotirmaydi — oraliqda render bo'ladi |
| **setImmediate** (Node) | Check fazasi | \`setImmediate\` | Poll fazasidan keyin |`,
  exercises: [
  {
    "id": 1,
    "title": "Microtask va Macrotask Navbati",
    "instruction": "Quyidagi `scheduleMicroAndMacro(logFn)` funksiyasini yozing. U berilgan `logFn` funksiyasini quyidagi tartibda chaqirishi kerak:\\n1. Sinxron ravishda 'sync' qiymati bilan.\\n2. Macrotask navbatida (setTimeout orqali 0ms) 'macro' qiymati bilan.\\n3. Microtask navbatida (Promise orqali) 'micro' qiymati bilan.",
    "startingCode": "function scheduleMicroAndMacro(logFn) {\\n  // Kodni shu yerda yozing\\n}\\n",
    "hint": "logFn('sync') ni sinxron chaqiring. setTimeout yordamida macro-ni rejalashtiring. Promise.resolve().then() yordamida micro-ni rejalashtiring.",
    "test": "if (!code.includes('Promise') || !code.includes('setTimeout')) return 'Promise va setTimeout ikkalasi ham ishlatilishi shart';\\nconst sandbox = new Function(code + '; return scheduleMicroAndMacro;');\\nconst fn = sandbox();\\nconst logs = [];\\nconst logFn = (msg) => logs.push(msg);\\nfn(logFn);\\nif (logs.length === 1 && logs[0] === 'sync') {\\n  return new Promise((resolve) => {\\n    setTimeout(() => {\\n      if (logs.length === 3 && logs[1] === 'micro' && logs[2] === 'macro') resolve(null);\\n      else resolve('Microtask va Macrotask navbati noto\\\\'g\\\\'ri: ' + logs.join(', '));\\n    }, 50);\\n  });\\n}\\nreturn 'Sinxron qism noto\\\\'g\\\\'ri bajarildi';"
  },
  {
    "id": 2,
    "title": "queueMicrotask yordamida Microtask yaratish",
    "instruction": "JavaScript-ning mahalliy `queueMicrotask(fn)` API-sidan foydalanib, berilgan `fn` funksiyasini microtask navbatiga qo'shuvchi `runMicrotask(fn)` funksiyasini yozing.",
    "startingCode": "function runMicrotask(fn) {\\n  // Kodni shu yerda yozing\\n}\\n",
    "hint": "queueMicrotask(fn) ni to'g'ridan-to'g'ri chaqiring.",
    "test": "if (!code.includes('queueMicrotask')) return 'queueMicrotask API-sidan foydalanilmadi';\\nconst sandbox = new Function(code + '; return runMicrotask;');\\nconst fn = sandbox();\\nlet called = false;\\nfn(() => { called = true; });\\nif (called === true) return 'Funksiya sinxron ishga tushib ketdi, u microtask bo\\\\'lishi kerak';\\nlet order = [];\\nfn(() => order.push('micro'));\\nsetTimeout(() => order.push('macro'), 0);\\nreturn new Promise((resolve) => {\\n  setTimeout(() => {\\n    if (order[0] === 'micro' && order[1] === 'macro') resolve(null);\\n    else resolve('Microtask macrotaskdan oldin ishga tushmadi');\\n  }, 20);\\n});"
  },
  {
    "id": 3,
    "title": "Aralash Asinxronlikni Boshqarish",
    "instruction": "Ikkita callback qabul qiladigan `executeMixed(cb1, cb2)` funksiyasini yozing. U `cb1` callback-ini microtask navbatida, `cb2` callback-ini esa macrotask navbatida ishga tushirishi kerak. Buni amalga oshirishda Promise va setTimeout lardan foydalaning.",
    "startingCode": "function executeMixed(cb1, cb2) {\\n  // Kodni shu yerda yozing\\n}\\n",
    "hint": "cb1 ni Promise.resolve().then(cb1) yoki queueMicrotask(cb1) ichida, cb2 ni esa setTimeout(cb2, 0) ichida chaqiring.",
    "test": "if (!code.includes('setTimeout') || (!code.includes('Promise') && !code.includes('queueMicrotask'))) return 'Kerakli asinxron mexanizmlar (setTimeout va Promise/queueMicrotask) ishlatilmadi';\\nconst sandbox = new Function(code + '; return executeMixed;');\\nconst fn = sandbox();\\nlet order = [];\\nfn(() => order.push('micro'), () => order.push('macro'));\\nreturn new Promise((resolve) => {\\n  setTimeout(() => {\\n    if (order[0] === 'micro' && order[1] === 'macro') resolve(null);\\n    else resolve('Tartib noto\\\\'g\\\\'ri: ' + order.join(', '));\\n  }, 20);\\n});"
  },
  {
    "id": 4,
    "title": "Microtask Chain Ketma-ketligi",
    "instruction": "`microChain(logFn)` funksiyasini yozing: u Promise.resolve().then() zanjiri orqali logFn ni 'birinchi', 'ikkinchi', 'uchinchi' qiymatlari bilan navbatma-navbat (har biri alohida microtaskda) chaqirsin.",
    "startingCode": "function microChain(logFn) {\\n  return Promise.resolve()\\n    // .then() zanjirini yozing\\n}\\n",
    "hint": "Promise.resolve().then(() => logFn('birinchi')).then(() => logFn('ikkinchi')).then(() => logFn('uchinchi'));",
    "test": "const sandbox = new Function(code + '; return microChain;');\\nconst fn = sandbox();\\nconst logs = [];\\nconst p = fn(m => logs.push(m));\\nreturn Promise.resolve(p).then(() => {\\n  if (logs.join(',') === 'birinchi,ikkinchi,uchinchi') return null;\\n  return 'Ketma-ketlik xato: ' + logs.join(',');\\n});"
  },
  {
    "id": 5,
    "title": "Kesh bilan Izchillik Kafolati",
    "instruction": "`getCached(key, cache, fetcher, callback)` funksiyasini yozing. Agar `key` keshda (Map) bo'lsa — callback ni `queueMicrotask` orqali chaqiring (keshda bo'lsa ham asinxron kafolat!). Bo'lmasa — `fetcher(key)` chaqirib, natijani keshga yozing va callback ni microtask orqali qiymat bilan chaqiring.",
    "startingCode": "function getCached(key, cache, fetcher, callback) {\\n  // 1) Keshda bo'lsa: queueMicrotask(() => callback(value))\\n  // 2) Bo'lmasa: fetcher(key).then(data => { ... })\\n}\\n",
    "hint": "if (cache.has(key)) { queueMicrotask(() => callback(cache.get(key))); return; } fetcher(key).then(data => { cache.set(key, data); queueMicrotask(() => callback(data)); });",
    "test": "if (!code.includes('queueMicrotask')) return 'queueMicrotask ishlatilmadi — asinxronlik kafolati yo\\'q';\\nconst sandbox = new Function(code + '; return getCached;');\\nconst fn = sandbox();\\nconst cache = new Map([['old', 42]]);\\nlet syncCalled = false;\\nlet result1 = null;\\nfn('old', cache, async () => 0, (v) => { syncCalled = true; result1 = v; });\\nif (syncCalled) return 'Keshdan olish ham asinxron bo\\'lishi kerak (queueMicrotask)';\\nreturn new Promise(resolve => {\\n  setTimeout(() => {\\n    if (result1 !== 42) { resolve('Kesh qiymati noto\\\\'g\\\\'ri uzatildi'); return; }\\n    let result2 = null;\\n    fn('new', cache, async (k) => k.length * 10, (v) => { result2 = v; });\\n    setTimeout(() => {\\n      resolve(result2 === 30 ? null : 'Fetcher natijasi noto\\\\'g\\\\'ri keshlandi/uzatildi');\\n    }, 20);\\n  }, 20);\\n});"
  },
  {
    "id": 6,
    "title": "Microtask Starvation'ni oldini olish",
    "instruction": "Cheksiz ishlaydigan lekin sahifani qotirmaydigan `startTicker(logFn)` funksiyasini yozing: u har 50ms da logFn('tick') ni chaqirsin va 500ms dan keyin o'zini to'xtatsin (jami ~10 marta). setInterval emas — setTimeout rekursiyasidan foydalaning.",
    "startingCode": "function startTicker(logFn) {\\n  // setTimeout rekursiyasi bilan ticker yozing\\n  // 500ms dan keyin to'xtash kerak\\n}\\n",
    "hint": "let count = 0; function step() { logFn('tick'); if (++count < 10) setTimeout(step, 50); } setTimeout(step, 50); — shaklida yozing.",
    "test": "const sandbox = new Function(code + '; return startTicker;');\\nconst fn = sandbox();\\nif (code.includes('setInterval')) return 'setInterval emas, setTimeout rekursiyasi ishlating';\\nconst logs = [];\\nfn(() => logs.push(1));\\nreturn new Promise(resolve => {\\n  setTimeout(() => {\\n    if (logs.length >= 8 && logs.length <= 11) resolve(null);\\n    else resolve('Chaqiruvlar soni xato: ' + logs.length + ' (kutilgan ~10)');\\n  }, 700);\\n});"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Microtask-lar (kichik vazifalar) navbatiga quyidagilardan qaysi biri kiradi?",
    "options": [
      "setTimeout va setInterval",
      "Promise.then() / catch() / finally() callback-lari",
      "I/O operatsiyalari (fayl o'qish)",
      "UI rendering (sahifani chizish)"
    ],
    "correctAnswer": 1,
    "explanation": "Promise-larning barcha javob callback-lari (then/catch/finally) standart bo'yicha microtask hisoblanadi."
  },
  {
    "id": 2,
    "question": "Macrotask-lar (katta vazifalar / shunchaki Tasks) navbatiga qaysi biri kiradi?",
    "options": [
      "queueMicrotask()",
      "MutationObserver",
      "setTimeout / setInterval / setImmediate",
      "Promise.resolve()"
    ],
    "correctAnswer": 2,
    "explanation": "Taymerlar (setTimeout, setInterval) brauzer va Node.js muhitida macrotask (yoki shunchaki task) hisoblanadi."
  },
  {
    "id": 3,
    "question": "JavaScript-da microtask-lar macrotask-larga nisbatan qanday ustuvorlikka (priority) ega?",
    "options": [
      "Pastroq ustuvorlikka ega",
      "Bir xil ustuvorlikka ega",
      "Yuqoriroq ustuvorlikka ega (sinxron kod tugagach, har qanday macrotask-dan oldin barcha microtask-lar bajariladi)",
      "Faqat Node.js muhitida yuqoriroq ustuvorlikka ega"
    ],
    "correctAnswer": 2,
    "explanation": "Microtask-lar har doim macrotask-lardan ustun turadi. Sinxron kod tugashi bilanoq, yoki har bir macrotask tugaganidan keyin, navbatdagi macrotask-ga o'tishdan oldin microtask navbati butunlay bo'shatiladi."
  },
  {
    "id": 4,
    "question": "Agar microtask bajarilayotgan paytda uning ichida cheksiz ravishda yangi microtask-lar qo'shilsa (masalan, rekursiv Promise), nima sodir bo'ladi?",
    "options": [
      "Ular keyingi macrotask-dan keyin ishlash uchun qoldiriladi",
      "Event Loop va macrotask-lar butunlay bloklanadi (sahifa qotib qoladi)",
      "Ortiqcha microtask-lar brauzer tomonidan o'chirib yuboriladi",
      "Hech qanday muammosiz parallel ishlayveradi"
    ],
    "correctAnswer": 1,
    "explanation": "Microtask navbati to'liq bo'shatilguncha Event Loop keyingi qadamga o'tmaydi. Agar cheksiz microtask yarataversangiz, u Task Queue va UI Rendering-ni bloklab qo'yadi va sahifa qotadi."
  },
  {
    "id": 5,
    "question": "Quyidagi API-lardan qaysi biri JavaScript-da to'g'ridan-to'g'ri maxsus microtask yaratish uchun xizmat qiladi?",
    "options": [
      "setTimeout()",
      "queueMicrotask()",
      "requestAnimationFrame()",
      "setImmediate()"
    ],
    "correctAnswer": 1,
    "explanation": "HTML5 standartiga kiritilgan `queueMicrotask(fn)` funksiyasi hech qanday Promise yaratmasdan, to'g'ridan-to'g'ri funksiyani microtask navbatiga qo'shish imkonini beradi."
  },
  {
    "id": 6,
    "question": "Sahifani vizual yangilash (UI Rendering) Event Loop tsiklida qachon sodir bo'ladi?",
    "options": [
      "Har bir yakka microtask bajarilganidan keyin darhol",
      "Call Stack bo'shagach va joriy barcha microtask-lar to'liq bajarib bo'linganidan keyin",
      "Sinxron kod ishlayotgan paytda parallel ravishda",
      "Faqat barcha setTimeout-lar tugagandan keyin sahifa oxirida"
    ],
    "correctAnswer": 1,
    "explanation": "Rendering (sahifani qayta chizish va layout hisoblash) ishlari microtask-lar navbati butunlay bo'shaganidan so'nggina amalga oshirilishi mumkin."
  },
  {
    "id": 7,
    "question": "Node.js muhitida `process.nextTick()` funksiyasining ustuvorligi qanday?",
    "options": [
      "Oddiy Promise microtask-laridan ham oldin (eng yuqori microtask ustuvorligi) bajariladi",
      "setTimeout va boshqa macrotask-lardan keyin bajariladi",
      "Faqat File I/O operatsiyalaridan keyin chaqiriladi",
      "Ustuvorligi eng past hisoblanadi"
    ],
    "correctAnswer": 0,
    "explanation": "Node.js da `process.nextTick()` microtask navbatining eng boshida turadi. U oddiy Promise-larga qaraganda ham oldinroq (stack bo'shashi bilanoq) bajariladi."
  },
  {
    "id": 8,
    "question": "Promise konstruktori `new Promise((resolve) => { ... })` ichidagi kod qanday bajariladi?",
    "options": [
      "Asinxron ravishda microtask sifatida",
      "Asinxron ravishda macrotask sifatida",
      "Sinxron ravishda darhol (oddiy kod kabi)",
      "Faqat resolve() chaqirilgandan so'ng asinxron"
    ],
    "correctAnswer": 2,
    "explanation": "Promise konstruktori ichiga uzatilgan executor funksiyasi sinxron hisoblanadi va darhol ishlaydi. Faqat `.then()`, `.catch()` va `.finally()` callback-larigina asinxron (microtask) hisoblanadi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod konsolga nimalarni chiqaradi?\\n```javascript\\nPromise.resolve().then(() => console.log('A'));\\nsetTimeout(() => console.log('B'), 0);\\nconsole.log('C');\\n```",
    "options": [
      "A, B, C",
      "C, A, B",
      "C, B, A",
      "A, C, B"
    ],
    "correctAnswer": 1,
    "explanation": "Birinchi sinxron kod ishlaydi ('C'). Keyin microtask navbati bo'shatiladi ('A'). Eng oxirida macrotask (setTimeout) bajariladi ('B'). Shuning uchun natija: C, A, B."
  },
  {
    "id": 10,
    "question": "Macrotask navbatini (Task Queue) V8 va brauzer arxitekturasida yana qanday nomlashadi?",
    "options": [
      "Microtask Queue",
      "Job Queue",
      "Event Queue yoki Message Queue",
      "Call Stack"
    ],
    "correctAnswer": 2,
    "explanation": "Macrotask navbati ko'pincha Task Queue, Event Queue yoki Message Queue deb ham ataladi. Microtask navbati esa Job Queue deb ataladi."
  },
  {
    "id": 11,
    "question": "Promise.then() zanjirlari va await-dan keyingi kodlar qaysi navbatda bajariladi?",
    "options": [
      "Task Queue (Macrotasks)",
      "Microtask Queue (Job Queue)",
      "Render Queue",
      "Call Stack"
    ],
    "correctAnswer": 1,
    "explanation": "Barcha Promise reaksiyalari va async/await-ning davomi (yield nuqtasidan keyingi kodlar) Microtask Queue-ga joylashtiriladi."
  },
  {
    "id": 12,
    "question": "Sinxron script fayli (main script) Event Loop nuqtai nazaridan nima deb hisoblanadi?",
    "options": [
      "Joriy script o'zi birinchi bajariladigan eng katta macrotask-dir",
      "U faqat microtask-lar to'plamidir",
      "U render navbati tarkibiga kiradi",
      "U Event Loop nazoratidan mutlaqo tashqarida"
    ],
    "correctAnswer": 0,
    "explanation": "Event Loop ishlashni boshlaganda, butun boshli JS faylini (sinxron kodni) bajarishning o'zi birinchi macrotask deb hisoblanadi. U tugagach, undan chiqqan microtask-lar bajariladi."
  }
]

};
