export const advancedTaskScheduling = {
  id: "advancedTaskScheduling",
  title: "Advanced Task Scheduling va Event Loop",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Asinxronlik va Task Scheduling nima?
JavaScript **bitta oqimli (single-threaded)** til bo'lib, u bir vaqtning o'zida faqat bitta kod bo'lagini bajara oladi. Bu bitta oqim (Main Thread) nafaqat JavaScript-ni bajaradi, balki sahifani chizish (rendering) va foydalanuvchi hodisalarini (click, type) qayta ishlash bilan ham shug'ullanadi. 

Agarda biz oqimni juda og'ir matematik hisob-kitob bilan band qilib qo'ysak, sahifa muzlab (freeze) qoladi. Shuning uchun, vazifalarni to'g'ri rejalashtirish (Task Scheduling) va kerak bo'lganda asosiy oqimni bo'shatib berish (Yielding) juda muhimdir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **kasalxona tez yordam bo'limining bosh shifokorisiz (Event Loop)**:
* **Microtask-lar (Shoshilinch tibbiy yordam):** Bu og'ir ahvoldagi bemorlar. Agar bir shoshilinch bemorni ko'rib bo'lsangiz-u, eshik tagida yana bir shoshilinch bemor paydo bo'lsa, siz navbatdagi oddiy bemorga o'tmasdan, darhol uni davolashga kirishasiz. Microtask navbati to'liq bo'shamaguncha boshqa ishlarga o'ta olmaysiz.
* **Macrotask-lar (Navbat bilan kelgan bemorlar):** Bular oldindan yozilib kelgan oddiy ko'rikdagi bemorlar (\`setTimeout\`). Siz har safar bitta oddiy bemorni ko'rib bo'lgach, shoshilinch navbatda (Microtask) kimdir bormi-yo'qligini tekshirasiz.
* **Animation Frame (Ekranni yangilash):** Bu shifoxonadagi bemorlar holati ko'rsatiladigan monitorlarni yangilash. U shoshilinch bemorlar ketganidan keyin va oddiy bemorlar ko'rilayotgan vaqt oralig'ida ma'lum bir reja asosida (ekran kadriga mos ravishda) yangilanadi.
* **Yielding (Tanaffus berish):** Agar siz 5 soatlik murakkab operatsiyani uzluksiz bajarsangiz, boshqa barcha bemorlar o'lib ketishi mumkin (sahifa qotib qoladi). Shuning uchun operatsiyani 30 daqiqalik bo'laklarga bo'lasiz va har bir bo'lakdan keyin 1 daqiqaga tashqariga chiqib shoshilinch bemorlarni tekshirasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Navbatlar tartibini tekshirish (Micro vs Macro vs rAF)
Quyidagi misolda har xil turdagi vazifalar Event Loop-da qanday ketma-ketlikda bajarilishini ko'rishimiz mumkin:

\`\`\`javascript
console.log("1. Sinxron Kod");

setTimeout(() => {
  console.log("6. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise)");
});

queueMicrotask(() => {
  console.log("4. Microtask (queueMicrotask)");
});

requestAnimationFrame(() => {
  console.log("5. Animation Frame Callback");
});

console.log("2. Sinxron Kod Oxiri");

// Konsoldagi natija:
// 1. Sinxron Kod
// 2. Sinxron Kod Oxiri
// 3. Microtask (Promise)
// 4. Microtask (queueMicrotask)
// 5. Animation Frame Callback
// 6. Macrotask (setTimeout)
\`\`\`

### 2. Prioritized Task Scheduling (\`scheduler.postTask\`)
Zamonaviy brauzerlarda vazifalarni prioriteti bo'yicha rejalashtirish uchun yangi \`Scheduler API\` taqdim etilgan:

\`\`\`javascript
// Agarda brauzer qo'llab-quvvatlasa
if (window.scheduler) {
  // 1. Eng past ustuvorlikdagi vazifa (background)
  scheduler.postTask(() => console.log("Background Task"), { priority: 'background' });

  // 2. Foydalanuvchiga ko'rinadigan standart vazifa (user-visible)
  scheduler.postTask(() => console.log("User Visible Task"), { priority: 'user-visible' });

  // 3. Foydalanuvchi interaktivligi uchun muhim vazifa (user-blocking)
  scheduler.postTask(() => console.log("User Blocking Task"), { priority: 'user-blocking' });
}

// Bajarilish tartibi:
// 1. User Blocking Task
// 2. User Visible Task
// 3. Background Task
\`\`\`

### 3. Og'ir sikllarda Main Thread bloklanishini oldini olish (Yielding)
Bloklovchi sinxron kod vs Yielding (bo'laklab asinxron bajarish):

\`\`\`javascript
// YOMON USUL: Asosiy oqimni 3 soniyaga bloklaydi, sahifa qotadi
function heavyComputationSync() {
  let result = 0;
  for (let i = 0; i < 1e9; i++) {
    result += Math.sqrt(i);
  }
  console.log("Tugadi:", result);
}

// YAXSHI USUL: Kodni bo'laklarga ajratib, Event Loop-ga yo'l berish (Yielding)
async function heavyComputationYielding() {
  let result = 0;
  const totalIterations = 1e9;
  const chunkSize = 1e7; // Har 10 million amaldan keyin bo'shatamiz

  for (let i = 0; i < totalIterations; i++) {
    result += Math.sqrt(i);
    
    if (i % chunkSize === 0) {
      // Main Thread-ga nafas olish va render qilish uchun yo'l beramiz
      await yieldToMain();
    }
  }
  console.log("Tugadi:", result);
}

function yieldToMain() {
  if (window.scheduler) {
    return scheduler.postTask(() => {}, { priority: 'user-visible' });
  }
  return new Promise(resolve => setTimeout(resolve, 0));
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Event Loop arxitekturasi
JavaScript Event Loop dvigatel (V8) va brauzer muhiti (Web APIs) o'rtasidagi bog'lovchi hisoblanadi. Bir iteratsiya (aylanish) davomida u quyidagi navbatlarni ma'lum tartibda boshqaradi:

\`\`\`mermaid
graph TD
    A[Start Event Loop] --> B[Pick eldest Macrotask from Macrotask Queue]
    B --> C{Macrotask exists?}
    C -->|Yes| D[Execute Macrotask on Call Stack]
    C -->|No| E[Microtasks Checkpoint]
    D --> E
    E --> F[Pick eldest Microtask from Microtask Queue]
    F --> G{Microtask exists?}
    G -->|Yes| H[Execute Microtask on Call Stack]
    H --> F
    G -->|No| I{Time to Render / Paint?}
    I -->|Yes| J[Run requestAnimationFrame Callbacks]
    J --> K[Style, Layout, Paint / Render Updates]
    K --> L[Run requestIdleCallback if Idle Time exists]
    I -->|No| L
    L --> M[End Loop Iteration / Next Loop]
    M --> A
\`\`\`

### Navbatlar turlari:
1. **Macrotask Queue (Task Queue):**
   * Bu yerda asinxron API-lar (\`setTimeout\`, \`setInterval\`, \`MessageChannel\`, I/O va tarmoq hodisalari) callbacks saqlanadi.
   * Har bir Event Loop aylanishida faqatgina **bitta** macrotask olinadi va Call Stack-da bajariladi.
2. **Microtask Queue:**
   * Bu yerda \`Promise\` callbacks (\`.then/catch/finally\`), \`queueMicrotask\` va \`MutationObserver\` saqlanadi.
   * Event Loop har bir macrotask tugaganidan keyin **Microtasks Checkpoint**-ni amalga oshiradi. Bu jarayonda Microtask Queue to'liq bo'shaguncha barcha microtask-lar ketma-ket bajariladi. Agar microtask bajarilayotganda yana yangi microtask navbatga qo'shilsa, u ham shu iteratsiyada bajariladi.
3. **Animation Frame Callbacks:**
   * Ekranning yangilanish tezligiga (odatda 60Hz yoki 120Hz) mos ravishda, brauzer render qilishdan avval \`requestAnimationFrame\` ichidagi vazifalarni bajaradi.
   * Bu sinxronizatsiya render kadrlarini silliq va ortiqcha hisob-kitoblarsiz bo'lishini ta'minlaydi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

Keling, katta hajmdagi ma'lumotlarni massivda qayta ishlovchi va foydalanuvchi interfeysini qotirib qo'ymaydigan **Non-blocking Data Processor** yaratamiz.

### Kod yozish:
\`\`\`javascript
// 1. Asosiy yield helper funksiyasini yozamiz
function yieldControl() {
  if (typeof scheduler !== 'undefined' && scheduler.postTask) {
    return scheduler.postTask(() => {}, { priority: 'user-visible' });
  }
  // Eski brauzerlar uchun fallback
  return new Promise(resolve => setTimeout(resolve, 0));
}

// 2. Asosiy ma'lumotlarni asinxron bo'laklab ishlovchi funksiya
async function processLargeArray(data, processor, onProgress) {
  const total = data.length;
  const startTime = performance.now();
  
  for (let i = 0; i < total; i++) {
    // Har bir elementni qayta ishlaymiz
    processor(data[i]);
    
    // Har 5ms ishlagandan keyin asosiy oqimga yo'l beramiz
    if (performance.now() - startTime > 5) {
      const progress = Math.round(((i + 1) / total) * 100);
      onProgress(progress);
      
      // Yo'l berish va taymerni qayta tiklash
      await yieldControl();
    }
  }
  
  onProgress(100);
  console.log("Qayta ishlash yakunlandi.");
}

// 3. Ishlatib ko'rish
const hugeData = Array.from({ length: 500000 }, (_, i) => i);
processLargeArray(
  hugeData, 
  (num) => Math.sqrt(num) * Math.sin(num), // Og'ir hisob
  (percent) => console.log(\`Jarayon: \${percent}%\`)
);
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Microtask-lar yordamida cheksiz sikl yaratib qo'yish
Microtask navbati tugamaguncha brauzer ekranni chiza olmaydi. Agar microtask ichida recursive ravishda yana microtask chaqirilsa, sahifa abadiy muzlab qoladi.
* **Noto'g'ri (Sahifa butunlay qotib qoladi):**
  \`\`\`javascript
  function runInfiniteMicrotask() {
    queueMicrotask(() => {
      runInfiniteMicrotask(); // Cheksiz microtask checkpoint loop
    });
  }
  runInfiniteMicrotask();
  \`\`\`
* **To'g'ri (Macrotask orqali yo'l berish):**
  \`\`\`javascript
  function runSafeLoop() {
    setTimeout(() => {
      runSafeLoop(); // Macrotask bo'lgani uchun brauzer oraliqda chiza oladi
    }, 0);
  }
  runSafeLoop();
  \`\`\`

### 2. requestAnimationFrame-ni microtask deb o'ylash
Ba'zilar \`rAF\` microtask kabi tez ishlaydi deb o'ylashadi, lekin u faqat brauzer yangi kadr render qilmoqchi bo'lgandagina chaqiriladi. Agar sahifa orqa fondagi tabda turgan bo'lsa, \`rAF\` butunlay to'xtab qolishi mumkin.

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Navbat turi | Qo'shish API-lari | Ishga tushish vaqti | Thread Blocking xavfi |
| :--- | :--- | :--- | :--- |
| **Sinxron Kod** | Global kod, funksiyalar | Darhol (Call Stack-da) | Yuqori |
| **Microtask** | \`Promise.then\`, \`queueMicrotask\` | Har bir Macrotask-dan keyin | Juda Yuqori (sikl bloklaydi) |
| **Animation Frame** | \`requestAnimationFrame\` | Render qilishdan oldin | O'rtacha |
| **Macrotask (Task)** | \`setTimeout\`, \`MessageChannel\` | Navbat bo'yicha (1 ta aylanishda 1 ta) | Past (orqaga qaytadi) |
| **Idle Task** | \`requestIdleCallback\` | Brauzer mutlaqo bo'sh bo'lganda | Yo'q |

---

## 7. ❓ Savollar va Javoblar

### 1. Nima uchun \`setTimeout(fn, 0)\` darhol 0ms-da ishlamaydi?
HTML standarti bo'yicha, ketma-ket joylashtirilgan asinxron taymerlar 4 yoki undan ko'p marta chuqurlashganda minimun 4ms kechikish majburiy hisoblanadi. Undan tashqari, agar Event Loop Call Stack band bo'lsa, vazifa navbatda kutib qoladi.

### 2. Scheduler API bilan setTimeout o'rtasidagi eng katta farq nima?
Scheduler API vazifalarni ustuvorligiga ko'ra dinamik boshqaradi va \`AbortController\` integratsiyasiga ega. Bu esa keraksiz yoki kechikkan vazifalarni bekor qilishni juda osonlashtiradi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qanday holatlarda \`queueMicrotask\` ishlatish xavfli hisoblanadi?
2. Sahifani silliq 60 kadr/soniya (60fps) tezlikda saqlab turish uchun har bir render sikli necha millisekunddan oshmasligi kerak? (Javob: ~16.7ms).
3. Nima uchun \`requestIdleCallback\` tezkor animatsiyalarni yaratish uchun mutlaqo yaroqsiz?

---

## 9. 🚀 Amaliy Topsiriq

Quyida keltirilgan 10 ta amaliy vazifalar orqali Event Loop boshqaruvi va vazifalarni rejalashtirish bo'yicha ko'nikmalaringizni charxlang. Har bir topshiriq real loyihalardagi murakkab arxitektura muammolarining simulyatsiyasidir.
`,
  exercises: [
  {
    "id": 1,
    "title": "1️⃣ Prioritetli Vazifalar Boshqaruvchisi (Prioritized Task Scheduler)",
    "instruction": "Har xil ustuvorlikdagi topshiriqlarni ('high', 'medium', 'low') qabul qilib, ularni navbat bo'yicha (avval barcha 'high', keyin 'medium', keyin 'low') asinxron ravishda bajaruvchi `PriorityTaskScheduler` klassini yarating. Metodlar:\n- `addTask(fn, priority)`: vazifani mos ustuvorlikdagi navbatga qo'shadi.\n- `runAll(callback)`: barcha vazifalarni ustuvorlik navbatida asinxron bajaradi va tugagach callback-ni chaqiradi.",
    "startingCode": "class PriorityTaskScheduler {\n  constructor() {\n    this.queues = { high: [], medium: [], low: [] };\n  }\n\n  addTask(fn, priority = 'medium') {\n    // Kodni shu yerda yozing\n  }\n\n  runAll(callback) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "AddTask metodida funksiyani this.queues[priority]-ga yuboring. runAll-da esa queue zanjirini Promise-lar yoki ketma-ket microtask-lar orqali chaqiring (masalan, avval high elementlarini, keyin qolganlarini asinxron run qilib, eng oxirida callback-ni ishga tushiring).",
    "test": "const scheduler = new PriorityTaskScheduler();\nconst order = [];\nscheduler.addTask(() => order.push('low'), 'low');\nscheduler.addTask(() => order.push('high'), 'high');\nscheduler.addTask(() => order.push('medium'), 'medium');\nscheduler.runAll(() => {\n  if (order.join(',') !== 'high,medium,low') {\n    throw new Error('Vazifalar ustuvorlik bo\\'yicha bajarilmadi: ' + order.join(','));\n  }\n});\nreturn null;"
  },
  {
    "id": 2,
    "title": "2️⃣ Microtask Checkpoint Simulyatori (Microtask Checkpoint Simulator)",
    "instruction": "Event Loop microtask checkpoint loop mexanizmini simulyatsiya qiladigan `simulateMicrotaskCheckpoint(queue)` funksiyasini yozing. Funksiya massiv ko'rinishidagi navbatni oladi. U navbatdagi har bir funksiyani bajaradi. Agar bajarilayotgan funksiya ichida yangi microtask qo'shilsa (masalan, funksiya `queue.push(newFn)` qilsa), u ham joriy checkpoint-da (navbat to'liq bo'shaguncha) bajarilishi shart. Cheksiz sikllardan saqlanish uchun maksimal bajarilish limitini 100 ta topshiriq qilib belgilang va undan oshsa `Error` tashlang.",
    "startingCode": "function simulateMicrotaskCheckpoint(queue) {\n  let count = 0;\n  // Kodni shu yerda yozing\n}",
    "hint": "while (queue.length > 0) siklini ishlating. Har safar queue.shift() orqali birinchi elementni olib chaqiring va count-ni oshiring. Agar count > 100 bo'lsa, xato tashlang.",
    "test": "const q = [];\nq.push(() => {\n  q.push(() => {});\n});\nsimulateMicrotaskCheckpoint(q);\nif (q.length !== 0) return 'Navbat to\\'liq bo\\'shamadi!';\n\nconst infiniteQ = [];\ninfiniteQ.push(function loop() {\n  infiniteQ.push(loop);\n});\ntry {\n  simulateMicrotaskCheckpoint(infiniteQ);\n  return 'Cheksiz sikl aniqlanmadi!';\n} catch(e) {\n  return null;\n}"
  },
  {
    "id": 3,
    "title": "3️⃣ Chunked Iterator va Asosiy Oqimni Bo'shatish (Yielding Chunked Iterator)",
    "instruction": "Katta hajmdagi massiv elementlarini asosiy oqimni (main thread) bloklamasdan qayta ishlash uchun `chunkedProcess(items, processor, chunkSize)` funksiyasini yozing. Funksiya har safar `chunkSize` miqdordagi elementni sinxron bajarib, keyingi qismini asinxron tarzda `setTimeout(..., 0)` orqali navbatga qo'yishi lozim. Funksiya barcha elementlar tugagach hal bo'ladigan Promise qaytarsin.",
    "startingCode": "function chunkedProcess(items, processor, chunkSize) {\n  return new Promise((resolve) => {\n    // Kodni shu yerda yozing\n  });\n}",
    "hint": "Recursion va setTimeout-dan foydalanib, massivni bo'laklarga ajratib ishlang. Har bir bo'lakdan keyin keyingi iteratsiyani setTimeout(..., 0) orqali chaqiring.",
    "test": "const items = Array.from({ length: 25 }, (_, i) => i);\nconst processed = [];\nchunkedProcess(items, (item) => processed.push(item), 10).then(() => {\n  if (processed.length !== 25) throw new Error('Barcha elementlar qayta ishlanmadi!');\n});\nreturn null;"
  },
  {
    "id": 4,
    "title": "4️⃣ Event Loop Tartibini Bashorat Qilish (Event Loop Predictor)",
    "instruction": "Quyidagi kod bajarilganda konsolga chiqadigan loglar tartibini aniqlang va massiv shaklida qaytaring:\n1. `console.log('start')` (sinxron)\n2. `setTimeout(() => console.log('timeout'), 0)` (macrotask)\n3. `Promise.resolve().then(() => console.log('promise'))` (microtask)\n4. `requestAnimationFrame(() => console.log('raf'))` (rAF)\n5. `console.log('end')` (sinxron)\n\nTo'g'ri tartibdagi massivni qaytaring.",
    "startingCode": "function predictOrder() {\n  // To'g'ri ketma-ketlikni massiv shaklida qaytaring\n  return [];\n}",
    "hint": "Sinxron kodlar birinchi bajariladi. Keyin microtask. Undan keyin brauzer render kadrini yangilaydi (requestAnimationFrame). Eng oxirida macrotask (setTimeout).",
    "test": "const order = predictOrder();\nif (order.join(',') !== 'start,end,promise,raf,timeout') {\n  return 'Tartib xato: ' + order.join(',');\n}\nreturn null;"
  },
  {
    "id": 5,
    "title": "5️⃣ Animation Frame Scheduler (Render Sinxronizatsiyasi)",
    "instruction": "DOM o'zgarishlarini bitta kadrda guruhlovchi `FrameScheduler` klassini yarating. Metodlar:\n- `scheduleUpdate(fn)`: funksiyani navbatga qo'shadi va agar requestAnimationFrame hali rejalashtirilmagan bo'lsa, uni rejalashtiradi.\n- Barcha rejalashtirilgan yangilanishlar navbatdagi kadrda (bitta requestAnimationFrame callback ichida) navbat bilan bajarilishi va navbat bo'shatilishi kerak.",
    "startingCode": "class FrameScheduler {\n  constructor() {\n    this.tasks = [];\n    this.scheduled = false;\n  }\n\n  scheduleUpdate(fn) {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "Vazifalarni tasks massiviga qo'shing. Agar scheduled false bo'lsa, requestAnimationFrame chaqirib, uning ichida barcha vazifalarni bajaring, scheduled-ni false qiling va tasks massivini bo'shating.",
    "test": "const scheduler = new FrameScheduler();\nlet count = 0;\nscheduler.scheduleUpdate(() => count += 1);\nscheduler.scheduleUpdate(() => count += 2);\n// Sinxron ravishda count hali 0 bo'lishi kerak\nif (count !== 0) return 'Yangilanish sinxron bajarilib ketdi!';\nreturn null;"
  },
  {
    "id": 6,
    "title": "6️⃣ postTask Polifilli Simulyatori (postTask Polyfill)",
    "instruction": "Scheduler API (`scheduler.postTask`) o'xshash bo'lgan va Promise qaytaradigan `postTaskMock(fn, options)` funksiyasini yarating. Options parametri `priority` ('user-blocking', 'user-visible', 'background') va `delay` (ms) qabul qiladi. Vazifalar asinxron MessageChannel yoki setTimeout yordamida bajarilishi kerak.",
    "startingCode": "function postTaskMock(fn, options = {}) {\n  // Kodni shu yerda yozing\n}",
    "hint": "Agar delay bo'lsa setTimeout ishlating. Agar yo'q bo'lsa, priority-ga mos ravishda Promise.resolve().then (user-blocking/microtask) yoki setTimeout (user-visible/background/macrotask) yordamida rejalashtiring.",
    "test": "postTaskMock(() => 42).then(res => {\n  if (res !== 42) throw new Error('Natija xato!');\n});\nreturn null;"
  },
  {
    "id": 7,
    "title": "7️⃣ requestIdleCallback Background Scheduler",
    "instruction": "Uzoq orqa fon vazifalarini (`tasks`) brauzer bo'sh bo'lgan paytda `requestIdleCallback` yordamida bajaruvchi `runIdleTasks(tasks)` funksiyasini yozing. Har bir task-ga `deadline` obyekti beriladi. Agar `deadline.timeRemaining() > 5` bo'lsa, navbatdagi vazifani bajaring, aks holda keyingi bo'sh vaqtga (requestIdleCallback orqali) qoldiring. Hamma vazifalar bajarilgach hal bo'luvchi Promise qaytaring.",
    "startingCode": "function runIdleTasks(tasks) {\n  return new Promise((resolve) => {\n    // Kodni shu yerda yozing\n  });\n}",
    "hint": "Har bir requestIdleCallback chaqiruvida loop yozib, timeRemaining() shartini tekshirib tasks.shift() qiling. Agar tasks tugasa resolve() chaqiring, aks holda yana requestIdleCallback rejalashtiring.",
    "test": "const tasks = [() => 1, () => 2];\nrunIdleTasks(tasks).then(() => {\n  if (tasks.length !== 0) throw new Error('Vazifalar to\\'liq tugatilmadi!');\n});\nreturn null;"
  },
  {
    "id": 8,
    "title": "8️⃣ Asosiy Oqim Bloklanishi Detektori (Main-Thread Blocking Detector)",
    "instruction": "Asosiy oqim (main thread) bloklanganligini aniqlash uchun `BlockingDetector` klassini yarating. U ma'lum vaqt oralig'ida (`intervalMs`) `setInterval` yoki `setTimeout` yordamida event loop aylanish vaqtini o'lchaydi. Agar kutilgan vaqtdan ko'ra ko'p vaqt o'tgan bo'lsa (ya'ni lag `thresholdMs` dan oshsa), u `onBlock(lag)` callback funksiyasini ishga tushirishi kerak. Metodlar: `start()`, `stop()`.",
    "startingCode": "class BlockingDetector {\n  constructor(intervalMs, thresholdMs, onBlock) {\n    this.intervalMs = intervalMs;\n    this.thresholdMs = thresholdMs;\n    this.onBlock = onBlock;\n    this.timer = null;\n  }\n\n  start() {\n    // Kodni shu yerda yozing\n  }\n\n  stop() {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "start() ichida recurrent setTimeout ishlating. Har safar chaqirilganda Performance.now() orqali o'tgan vaqtni o'lchab, intervalMs + thresholdMs dan katta bo'lsa onBlock(lag) chaqiring.",
    "test": "let blocked = false;\nconst detector = new BlockingDetector(10, 5, () => blocked = true);\ndetector.start();\ndetector.stop();\nreturn null;"
  },
  {
    "id": 9,
    "title": "9️⃣ Batch-Updater Queue (Sinxron o'zgarishlarni guruhlash)",
    "instruction": "Bir nechta ketma-ket yuz bergan o'zgarishlarni bitta yangilanishga guruhlab (batching), keyingi microtask checkpoint-da ishga tushiradigan `BatchUpdater` klassini yarating. Metodlar:\n- `addUpdate(key, value)`: key bo'yicha qiymatni keshda yangilaydi va bir marta microtask rejalashtiradi.\n- `flush()`: barcha yig'ilgan `updates` keshini `onFlush(updates)` callback-ga uzatadi va keshni tozalaydi.\n- Barcha yangilanishlar faqat bir marta microtask navbatida flush qilinishi kerak.",
    "startingCode": "class BatchUpdater {\n  constructor(onFlush) {\n    this.onFlush = onFlush;\n    this.updates = {};\n    this.scheduled = false;\n  }\n\n  addUpdate(key, value) {\n    // Kodni shu yerda yozing\n  }\n\n  flush() {\n    // Kodni shu yerda yozing\n  }\n}",
    "hint": "addUpdate ichida this.updates[key] = value yozing. Agar this.scheduled false bo'lsa, uni true qilib queueMicrotask(() => this.flush()) chaqiring. flush ichida onFlush-ga keshni berib, scheduled-ni false qiling va keshni bo'shating.",
    "test": "let updatesCount = 0;\nconst updater = new BatchUpdater((upd) => {\n  updatesCount++;\n  if (upd.a !== 2 || upd.b !== 3) throw new Error('Noto\\'g\\'ri qiymat keshlandi!');\n});\nupdater.addUpdate('a', 1);\nupdater.addUpdate('a', 2);\nupdater.addUpdate('b', 3);\n// flush() microtask checkpoint loopda asinxron chaqirilishi kerak\nreturn null;"
  },
  {
    "id": 10,
    "title": "🔟 Macro-Micro Queue Mixer (Event Loop simulyatsiyasi)",
    "instruction": "Berilgan macrotasks va microtasks massivlarini HTML5 Event Loop spetsifikatsiyasi bo'yicha tartiblab bajaruvchi va bajarilish logini qaytaruvchi `mixQueues(macroTasks, microTasks)` funksiyasini yozing. Har bir task `{ name: string, run: Function }` obyektidir. Bajarilish qoidalari:\n1. Dastlab microtasks navbatidagi barcha vazifalar to'liq bajariladi.\n2. Keyin bitta macrotask olinadi va bajariladi.\n3. Undan so'ng yana microtasks navbati tekshiriladi va agar yangi microtasks qo'shilgan bo'lsa, to'liq bajariladi.\n4. Keyingi macrotask bajariladi va h.k. Bajarilgan tasklarning `name` qiymatlarini ketma-ketlikda massiv qilib qaytaring.",
    "startingCode": "function mixQueues(macroTasks, microTasks) {\n  const result = [];\n  // Kodni shu yerda yozing\n  return result;\n}",
    "hint": "while (macroTasks.length > 0 || microTasks.length > 0) siklini yozing. Sikl ichida avval microTasks.length > 0 bo'lganda hammasini bajarib, result-ga push qiling. Keyin bitta macroTask bajarib, result-ga push qiling.",
    "test": "const macros = [{ name: 'macro1', run: () => {} }, { name: 'macro2', run: () => {} }];\nconst micros = [{ name: 'micro1', run: () => {} }];\nconst res = mixQueues(macros, micros);\nif (res.join(',') !== 'micro1,macro1,macro2') {\n  return 'Tartib xato: ' + res.join(',');\n}\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JS Event Loop-da Microtask va Macrotask (Task) navbatlarining asosiy farqi nimada?",
    "options": [
      "Macrotask-lar tezroq ishlaydi, microtask-lar esa orqa fonda ishlaydi",
      "Har bir macrotask bajarilgandan keyin, event loop microtask navbatida yig'ilgan barcha topshiriqlarni (hatto bajarilish davomida qo'shilganlarini ham) to'liq tugatmaguncha keyingi macrotask-ga o'tmaydi",
      "Microtask-lar faqat brauzer oynasi yopilganda ishga tushadi",
      "Macrotask va Microtask bir xil navbatda turadi va kelish tartibiga ko'ra bajariladi"
    ],
    "correctAnswer": 1,
    "explanation": "Event Loop har bitta macrotask tugagandan so'ng, microtask navbatidagi barcha topshiriqlarni (microtask checkpoint loop orqali) to'liq bajaradi. Keyingi macrotask-ga faqat microtask navbati bo'shagandan keyin o'tiladi."
  },
  {
    "id": 2,
    "question": "Quyidagi API-lardan qaysi biri microtask navbatiga vazifa qo'shadi?",
    "options": [
      "setTimeout va setInterval",
      "requestAnimationFrame",
      "Promise.resolve().then() va queueMicrotask()",
      "requestIdleCallback va postMessage"
    ],
    "correctAnswer": 2,
    "explanation": "Promises (.then/.catch/finally), queueMicrotask() va MutationObserver asinxron vazifalarni microtask navbatiga (Microtask Queue) joylashtiradi."
  },
  {
    "id": 3,
    "question": "Quyidagi API-lardan qaysi biri macrotask (task) navbatiga vazifa qo'shadi?",
    "options": [
      "queueMicrotask",
      "MutationObserver",
      "Promise.prototype.then",
      "setTimeout va MessageChannel"
    ],
    "correctAnswer": 3,
    "explanation": "setTimeout, setInterval, setImmediate, MessageChannel, postMessage va DOM hodisalari macrotask (yoki oddiygina task) navbatiga topshiriq qo'shadi."
  },
  {
    "id": 4,
    "question": "requestAnimationFrame (rAF) callbacks qachon ishga tushadi?",
    "options": [
      "Har bir microtask checkpoint loop ichida",
      "Brauzer navbatdagi kadrni render qilishdan oldin, uslublar (style) va tartib (layout) hisoblanishidan avval",
      "Faqat CPU 100% yuklanganda va sahifa muzlab qolganda",
      "Faqat `requestIdleCallback` ishga tushgandan so'ng"
    ],
    "correctAnswer": 1,
    "explanation": "requestAnimationFrame brauzerning render qilish bosqichi (Rendering Pipeline) boshlanishidan oldin ishlaydi, bu esa vizual o'zgarishlarni kadr bilan sinxronlashtirishga imkon beradi."
  },
  {
    "id": 5,
    "question": "Microtask checkpoint loop davomida yangi qo'shilgan microtask-lar qanday boshqariladi?",
    "options": [
      "Ular keyingi Event Loop iteratsiyasiga (aylanishiga) qoldiriladi",
      "Ular o'sha zahoti o'chirib yuboriladi",
      "Navbat bo'shaguncha, yangi qo'shilgan microtask-lar ham joriy checkpoint-da bajarilaveradi (agar cheksiz bo'lsa, thread bloklanadi)",
      "Ular avtomatik ravishda macrotask navbatiga o'tkaziladi"
    ],
    "correctAnswer": 2,
    "explanation": "Microtask checkpoint loop navbat to'liq bo'shamaguncha ishlaydi. Agar biror microtask yangi microtask qo'shsa, u ham o'sha siklning o'zida bajariladi, bu esa cheksiz sikl yaratsa sahifaning butunlay qotib qolishiga sabab bo'ladi."
  },
  {
    "id": 6,
    "question": "Scheduler API (scheduler.postTask) ning an'anaviy setTimeout-dan asosiy afzalligi nimada?",
    "options": [
      "U faqat Node.js-da ishlaydi va brauzerlarda mavjud emas",
      "U vazifalarni prioriteti bo'yicha ('user-blocking', 'user-visible', 'background') boshqarish va bekor qilish (AbortController) imkonini beradi",
      "U faqat sinxron kodlarni bajarish uchun mo'ljallangan",
      "U xotirani avtomatik tozalaydi va xatolarni oldini oladi"
    ],
    "correctAnswer": 1,
    "explanation": "Prioritized Task Scheduling (Scheduler API) dasturchilarga brauzerga qaysi vazifa muhimroq ekanini aytish (3 xil ustuvorlik darajasi) va AbortSignal yordamida ularni oson bekor qilish imkoniyatini beradi."
  },
  {
    "id": 7,
    "question": "Scheduler API-dagi 'user-blocking' prioriteti nima uchun ishlatiladi?",
    "options": [
      "Foydalanuvchining sahifadagi harakatlarini bloklash uchun",
      "Foydalanuvchi inputi (click, keydown) yoki vizual animatsiyalar kabi kechiktirib bo'lmaydigan, interaktivlik uchun muhim vazifalarda",
      "Orqa fondagi analitika ma'lumotlarini yuborish uchun",
      "Faqat sahifa yuklanayotgan paytda rasmlarni yuklash uchun"
    ],
    "correctAnswer": 1,
    "explanation": "'user-blocking' - interaktivlikni saqlab qolish uchun eng yuqori ustuvorlik darajasidir. U inputga javob berish yoki muhim animatsiyalarni silliq render qilish uchun xizmat qiladi."
  },
  {
    "id": 8,
    "question": "CPU-ni og'ir yuklovchi hisob-kitoblarda thread-blocking (asosiy oqim bloklanishi) ning qanday oldi olinadi?",
    "options": [
      "Kodni dynamic script sifatida import qilish orqali",
      "while(true) siklini shunchaki for sikliga almashtirish orqali",
      "Hisob-kitobni kichik bo'laklarga (chunks) bo'lib, har bir bo'lakdan keyin asosiy oqimga yo'l berish (yielding: scheduler.postTask yoki setTimeout orqali)",
      "Barcha o'zgaruvchilarni const o'rniga let bilan e'lon qilish orqali"
    ],
    "correctAnswer": 2,
    "explanation": "Yielding to the main thread (asosiy oqimga yo'l berish) og'ir operatsiyalarni bo'laklab bajarish va har bir bo'lak oralig'ida brauzerga inputlarni qayta ishlash hamda kadrni render qilish uchun imkoniyat yaratishdir."
  },
  {
    "id": 9,
    "question": "requestIdleCallback-dagi 'deadline' parametri nima vazifani bajaradi?",
    "options": [
      "Vazifani tugatish kerak bo'lgan oxirgi sana yoki vaqtni ko'rsatadi",
      "Brauzer joriy kadrni render qilguniga qadar qancha vaqt (millisekund) qolganini ko'rsatib, thread bloklanishining oldini olishga yordam beradi",
      "Sahifani yopish taymerini o'rnatadi",
      "Tarmoq so'rovining timeout vaqtini belgilaydi"
    ],
    "correctAnswer": 1,
    "explanation": "deadline.timeRemaining() metodi joriy kadrda brauzer bo'sh bo'lgan vaqtni qaytaradi. Dasturchilar bu vaqtdan oshib ketmasdan orqa fondagi ishlarni bajarib olishlari mumkin."
  },
  {
    "id": 10,
    "question": "JavaScript asosiy oqimida sinxron `while(true)` yoki juda uzoq davom etuvchi sikl bajarilsa nima sodir bo'ladi?",
    "options": [
      "Brauzer qo'shimcha CPU oqimini (thread) ishga tushirib, uni parallel bajaradi",
      "Event Loop butunlay to'xtaydi, rendering va foydalanuvchi harakatlari bloklanadi, brauzer sahifa 'muzlab qoldi' degan ogohlantirish beradi",
      "Microtask-lar tezroq ishlay boshlaydi",
      "Sikl avtomatik ravishda asinxron rejimga o'tadi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript bir oqimli (single-threaded) bo'lgani uchun, uzoq davom etuvchi sinxron kod Event Loop-ning aylanishini to'xtatadi. Natijada brauzer sahifani render qila olmaydi va interaktivlik butunlay yo'qoladi."
  },
  {
    "id": 11,
    "question": "Scheduler.postTask-da hech qanday ustuvorlik (priority) ko'rsatilmaganda, sukut bo'yicha (default) qaysi ustuvorlik beriladi?",
    "options": [
      "background",
      "user-blocking",
      "user-visible",
      "low-priority"
    ],
    "correctAnswer": 2,
    "explanation": "Agar `scheduler.postTask(fn)` chaqirilganda variantlar ko'rsatilmasa, sukut bo'yicha o'rtacha ustuvorlik — 'user-visible' qo'llaniladi."
  },
  {
    "id": 12,
    "question": "Brauzer renderlash bosqichini (Rendering Pipeline) Event Loop ichida qachon ishga tushiradi?",
    "options": [
      "Har bir microtask bajarilgandan keyin darhol",
      "Vaqti-vaqti bilan (odatda ekran yangilanishiga mos holda, masalan, 60fps-da har 16.7ms-da) asosiy oqim bo'sh bo'lganda",
      "Faqat requestIdleCallback chaqirilganda",
      "Sinxron kodlar bajarilayotgan paytda orqa fonda parallel ravishda"
    ],
    "correctAnswer": 1,
    "explanation": "Renderlash har bir Event Loop iteratsiyasida majburiy emas. Brauzer sahifada o'zgarishlar bor-yo'qligi va ekranning yangilanish chastotasiga qarab renderlashni sinxronlashtiradi (odatda har 16.7ms-da oqim bo'sh bo'lgan paytda)."
  }
]

};
