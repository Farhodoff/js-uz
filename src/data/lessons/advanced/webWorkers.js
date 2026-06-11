export const webWorkers = {
  id: "webWorkers",
  title: "Web Workers: Fon Rejimida Ko'p Oqimli Ishlash",
  language: "uz",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Web Workers nima?
JavaScript sukut bo'yicha **Single-Threaded** (bir oqimli) tildir. Bu degani, u bir vaqtning o'zida faqat bitta ishni bajara oladi. Agar siz saytda juda og'ir matematik hisob-kitob bajarsangiz (masalan, 10 millionta sonni saralash yoki rasmni qayta ishlash), foydalanuvchi interfeysi (UI) qotib qoladi, tugmalar bosilmaydi va sahifa muzlaydi.

**Web Workers** — brauzerda asosiy oqimdan (Main Thread) alohida, orqa fonda (background thread) ishlaydigan mustaqil JavaScript oqimidir. U orqa fonda og'ir ishlarni bajaradi va asosiy sahifaga xalal bermaydi.

### Real hayotiy analogiya
Tasavvur qiling, siz **restoran bosh oshpazisiz (Main Thread)**:
* **Workersiz usul:** Siz mijozlar buyurtmasini qabul qilasiz, ovqat pishirasiz, idishlarni yuvasiz va pollarni artasiz. Siz bitta og'ir ishni (masalan, idish yuvishni) boshlasangiz, yangi mijozlar kelganda ularga xizmat ko'rsata olmaysiz (UI qotib qoladi).
* **Workerli usul:** Siz faqat buyurtma olasiz va taom tayyorlaysiz (Main Thread - UI tezkor). Idishlarni yuvish va pollarni artish uchun **yordamchi ishchi yollaysiz (Web Worker)**. Yordamchi orqa xonada o'z ishi bilan band bo'ladi, siz esa mijozlarga xizmat ko'rsatishda davom etaverasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Worker yaratish va bog'lanish)
Asosiy sahifada workerni ishga tushirish:
\`\`\`javascript
// 1. Yangi worker yaratamiz
const myWorker = new Worker('worker.js');

// 2. Workerga ma'lumot jo'natamiz
myWorker.postMessage({ number: 40 });

// 3. Workerdan natijani kutib olamiz
myWorker.onmessage = (event) => {
  console.log("Workerdan kelgan natija:", event.data);
};
\`\`\`

\`worker.js\` faylining ichki kodi (fondagi oqim):
\`\`\`javascript
// Worker ichida 'message' hodisasini tinglaymiz
self.onmessage = (event) => {
  const num = event.data.number;
  
  // Og'ir hisob-kitob (masalan, Fibonachchi soni)
  const result = fibonacci(num);
  
  // Natijani asosiy oqimga qaytaramiz
  self.postMessage(result);
};

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

### 2. Intermediate Example (Xatoliklarni boshqarish va to'xtatish)
Agar worker ichida xatolik yuz bersa, uni asosiy oqimda ushlash va ishni to'xtatish:
\`\`\`javascript
const worker = new Worker('heavy-task.js');

// Xatoliklarni tinglash
worker.onerror = (error) => {
  console.error("Workerda xatolik yuz berdi:", error.message);
  console.error("Fayl:", error.filename, "Qator:", error.lineno);
  
  // Workerni zudlik bilan to'xtatamiz
  worker.terminate();
};

// Kerak bo'lsa ma'lum vaqtdan keyin majburiy o'chirish
setTimeout(() => {
  console.log("Vaqt tugadi, worker o'chirilmoqda...");
  worker.terminate(); // Worker ishi butunlay yakunlanadi
}, 5000);
\`\`\`

### 3. Advanced Example (Transferable Objects orqali tezkor uzatish)
Katta hajmdagi ma'lumotlarni structured clone qilmasdan tez uzatish:
\`\`\`javascript
const worker = new Worker('image-worker.js');

// Katta 32MB hajmli bufer yaratamiz
const buffer = new ArrayBuffer(32 * 1024 * 1024);

// Ikkinchi parametr sifatida buferni o'zini uzatamiz (Transferable)
// Bu orqali bufer nusxalanmaydi, uning egalik huquqi workerga o'tadi.
// Asosiy oqimda bufer bo'shab qoladi (hajmi 0 bo'ladi).
worker.postMessage(buffer, [buffer]);

console.log("Asosiy oqimdagi bufer hajmi:", buffer.byteLength); // 0
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
* **Muzlab qolgan foydalanuvchi interfeysi (UI Blocking):** Brauzerda barcha JS kodlari, DOM renderlash va foydalanuvchi harakatlari bitta asosiy oqimda bajariladi. Agar JS og'ir hisob-kitob bilan band bo'lsa, brauzer ekraniga hech narsa chizib berolmaydi (Jank / Lag). Web Workers bu og'ir ishlarni fon rejimiga olib o'tadi.
* **Ko'p yadroli protsessorlardan (CPU Multi-core) unumli foydalanish:** Hozirgi qurilmalarda 4, 8 yoki undan ko'p CPU yadrolari bor. Oddiy JS faqat 1 ta yadrodan foydalanadi. Web Workers yordamida parallel oqimlar yaratib, protsessor kuchidan to'liq foydalanish mumkin.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Worker ichida \`window\` yoki \`document\`ni ishlatishga urinish
#### Xato:
Worker alohida kontekstda ishlaydi, unda DOM mavjud emas. Shuning uchun \`document.getElementById\` yoki \`window.location\` kabi kodlar xatolik beradi.
\`\`\`javascript
// Worker ichida (Noto'g'ri)
const title = document.querySelector('h1'); // TypeError!
\`\`\`
#### To'g'ri yechim:
Ma'lumotlarni \`postMessage\` orqali asosiy oqimga yuborish va DOM o'zgarishlarini asosiy oqimda amalga oshirish.

### 2. Har safar tugma bosilganda yangi Worker yaratish
#### Xato:
Har safar \`new Worker()\` chaqirilganda, brauzer yangi OS oqimini ochadi. Bu xotira va vaqt talab qiladi. Agar foydalanuvchi tugmani ko'p bossa, kompyuter qotib qolishi mumkin.
\`\`\`javascript
// Noto'g'ri
button.onclick = () => {
  const w = new Worker('task.js'); // Xavfli!
  w.postMessage('run');
};
\`\`\`
#### To'g'ri yechim:
Workerni bir marta global miqyosda yaratib qo'yish va undan qayta-qayta foydalanish.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Web Worker nima va u nima uchun kerak?
   * **Javob:** Web Worker — bu brauzerning asosiy oqimini band qilmagan holda, fonda parallel ravishda ishlovchi JavaScript oqimidir. U sahifaning tezkorligini ta'minlash uchun kerak.
2. **Savol:** Worker ichida DOM bilan ishlab bo'ladimi?
   * **Javob:** Yo'q, worker ichida \`window\` va \`document\` obyektlariga kirish taqiqlangan. DOM bilan faqat asosiy oqim ishlay oladi.
3. **Savol:** Worker va asosiy oqim qanday muloqot qiladi?
   * **Javob:** Ular bir-biri bilan \`postMessage()\` metodi va \`onmessage\` hodisasi orqali xabarlar almashadi.
4. **Savol:** Workerni qanday to'xtatish mumkin?
   * **Javob:** Asosiy oqimdan \`worker.terminate()\` yoki worker ichidan \`self.close()\` metodini chaqirish orqali.

### Middle (5–8)
5. **Savol:** Worker ichida qaysi global obyektlar va API-lardan foydalanish mumkin?
   * **Javob:** \`self\`, \`navigator\`, \`location\`, \`setTimeout\`, \`setInterval\`, \`fetch\`, \`IndexedDB\` va \`WebSocket\`lardan foydalanish mumkin.
6. **Savol:** Structured Clone algoritmi nima va uning Web Workers-ga qanday aloqasi bor?
   * **Javob:** Bu JS obyektlarini xavfsiz va chuqur nusxalash algoritmi. \`postMessage\` orqali yuborilgan ma'lumotlar ushbu algoritm yordamida nusxalanib workerga o'tkaziladi.
7. **Savol:** SharedWorker va oddiy (Dedicated) Worker farqi nimada?
   * **Javob:** Dedicated Worker faqat uni yaratgan bitta sahifa (tab) uchun xizmat qiladi. SharedWorker esa bir xil domendagi bir nechta tablar va iframe-lar o'rtasida umumiy bo'lishi mumkin.
8. **Savol:** Worker yaratishda qanday cheklovlar bor (masalan, fayl yo'li)?
   * **Javob:** Worker fayli **Same-Origin Policy** (bir xil kelib chiqish) shartiga bo'ysunishi kerak. Ya'ni uni boshqa domendagi URL orqali to'g'ridan-to'g'ri yaratib bo'lmaydi (CORS cheklovi).

### Senior (9–12)
9. **Savol:** Transferable Objects nima va ular qachon ishlatiladi?
   * **Javob:** Transferable Objects (masalan, \`ArrayBuffer\`, \`MessagePort\`) — ma'lumotni nusxalamasdan, uning egalik huquqini (pointerini) bir oqimdan ikkinchisiga o'tkazuvchi obyektlardir. Ular juda katta hajmli ma'lumotlarni nol kechikish (zero-copy) bilan uzatishda qo'llaniladi.
10. **Savol:** SharedArrayBuffer va Atomics nima va ular Web Workers-da qanday qo'llaniladi?
    * **Javob:** \`SharedArrayBuffer\` yordamida bir nechta workerlar va asosiy oqim bir xil xotira maydonidan nusxasiz birgalikda foydalanishi mumkin. \`Atomics\` esa ushbu umumiy xotiraga yozish va o'qishda oqimlar to'qnashuvini (race conditions) oldini olish uchun sinxronizatsiya beradi.
11. **Savol:** inline Web Worker nima va uni qanday yaratish mumkin?
    * **Javob:** Alohida \`.js\` fayli ochmasdan, kod ichida Blob va URL.createObjectURL yordamida dinamik ravishda worker yaratish usulidir.
12. **Savol:** Web Workers yordamida parallel hisoblashlarni (MapReduce) brauzerda qanday amalga oshirish mumkin?
    * **Javob:** Vazifani mayda bo'laklarga bo'lib, bir nechta workerlarga yuborish (Map), barcha workerlar natijalarni hisoblab qaytargandan so'ng ularni asosiy oqimda jamlash (Reduce) orqali amalga oshiriladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz interaktiv kod muharriri orqali amaliy mashqlarni bajarasiz.

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi test topshiriqlari.

---

## 8. 🎯 Real Project Case Study

### Rasm filtrlarini qo'llash (Image Processing Pipeline)
Foydalanuvchi katta rasmni yuklaganda unga kulrang (grayscale) yoki blur filtrini qo'shish og'ir hisob-kitob talab qiladi.

#### Yechim (FilterWorker):
\`\`\`javascript
// main.js
const imgWorker = new Worker('filter-worker.js');

function applyGrayscale(canvas, ctx) {
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Rasm piksellarini workerga yuboramiz
  imgWorker.postMessage({
    pixels: imgData.data.buffer,
    width: canvas.width,
    height: canvas.height
  }, [imgData.data.buffer]); // Transferable sifatida beramiz

  imgWorker.onmessage = (event) => {
    const outputBuffer = event.data.pixels;
    const outputData = new ImageData(
      new Uint8ClampedArray(outputBuffer),
      event.data.width,
      event.data.height
    );
    // Filtr surtilgan rasmni chizamiz
    ctx.putImageData(outputData, 0, 0);
    console.log("Rasm filtri fonda muvaffaqiyatli bajarildi!");
  };
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Oqimlar sonini cheklash:** Tizimda cheksiz worker ochmang. Odatda protsessor yadrolari soniga qarab (\`navigator.hardwareConcurrency\` marta) worker ochish tavsiya etiladi.
* **Worker-ni reuse (qayta ishlash) qilish:** Yangi worker yaratish qimmatga tushadi. Worker-pool arxitekturasini yarating, ya'ni tayyor workerlarni navbat bilan ishlating.

---

## 10. 📌 Cheat Sheet

| Metod / Obyekt | Qayerda ishlaydi | Vazifasi |
| :--- | :--- | :--- |
| \`new Worker('path.js')\` | Asosiy Oqim | Yangi fondagi worker obyektini yaratadi |
| \`worker.postMessage(data)\` | Asosiy Oqim | Worker-ga ma'lumot jo'natadi (Structured Clone) |
| \`worker.terminate()\` | Asosiy Oqim | Workerni majburiy to'xtatadi |
| \`self.postMessage(data)\` | Worker Oqimi | Asosiy oqimga ma'lumot yuboradi |
| \`self.close()\` | Worker Oqimi | Workerni o'z ichidan yopadi |
| \`importScripts('lib.js')\` | Worker Oqimi | Worker ichiga tashqi JS kutubxonalarini yuklaydi |
`,
  exercises: [
    {
      id: 1,
      title: "Worker yaratish",
      instruction: "'heavyTask.js' faylidan foydalanuvchi yangi Web Worker obyektini yarating va uni 'myWorker' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nconst myWorker = ",
      hint: "new Worker('heavyTask.js')",
      test: "if (code.includes(\"new Worker('heavyTask.js')\") || code.includes('new Worker(\"heavyTask.js\")')) return null; return 'Worker-ni to\\'g\\'ri fayl nomi bilan yarating.';"
    },
    {
      id: 2,
      title: "Worker-ga xabar yuborish",
      instruction: "'myWorker' obyektiga 'start' matnini yuboruvchi kod yozing.",
      startingCode: "const myWorker = new Worker('heavyTask.js');\n// Bu yerga yozing\n",
      hint: "myWorker.postMessage('start');",
      test: "if (code.includes(\"myWorker.postMessage('start')\") || code.includes('myWorker.postMessage(\"start\")')) return null; return 'postMessage orqali \\'start\\' matnini yuboring.';"
    },
    {
      id: 3,
      title: "Worker-dan javob olish",
      instruction: "Worker-dan ma'lumot kelganda (onmessage) kelgan ma'lumotni (event.data) konsolga chiqaradigan funksiya yozing.",
      startingCode: "const myWorker = new Worker('heavyTask.js');\n// Bu yerga yozing\n",
      hint: "myWorker.onmessage = (event) => {\n  console.log(event.data);\n};",
      test: "if (code.includes('onmessage') && (code.includes('event.data') || code.includes('data'))) return null; return 'onmessage hodisasini sozlab event.data-ni konsolga chiqaring.';"
    },
    {
      id: 4,
      title: "Worker ichida xabar tinglash",
      instruction: "Worker-ning o'zida (self global obyekti orqali) 'onmessage' hodisasini tinglovchi funksiya yozing.",
      startingCode: "// Worker kodi ichida\n// Bu yerga yozing\n",
      hint: "self.onmessage = (event) => {\n  // kod\n};",
      test: "if (code.includes('self.onmessage') || code.includes('onmessage =')) return null; return 'self.onmessage hodisasini e\\'lon qiling.';"
    },
    {
      id: 5,
      title: "Worker ichidan javob yuborish",
      instruction: "Worker ichida kelgan xabar matniga ' Qabul qilindi' so'zini ulab, asosiy oqimga postMessage orqali qaytarib yuboring.",
      startingCode: "self.onmessage = (event) => {\n  const message = event.data;\n  // Bu yerga yozing\n  \n};",
      hint: "self.postMessage(message + ' Qabul qilindi');",
      test: "if (code.includes('postMessage') && (code.includes('message +') || code.includes('Qabul qilindi'))) return null; return 'self.postMessage orqali natijani yuboring.';"
    },
    {
      id: 6,
      title: "Worker-ni asosiy oqimdan to'xtatish",
      instruction: "Asosiy oqimdan turib 'myWorker' obyektini darhol to'xtating (ishini tugating).",
      startingCode: "const myWorker = new Worker('heavyTask.js');\n// Bu yerga yozing\n",
      hint: "myWorker.terminate();",
      test: "if (code.includes('myWorker.terminate()')) return null; return 'terminate() metodini chaqiring.';"
    },
    {
      id: 7,
      title: "Worker-ni o'z ichidan yopish",
      instruction: "Worker kodining o'zidan turib aloqani va oqimni yopadigan metodni chaqiring.",
      startingCode: "// Worker kodi ichida\n// Bu yerga yozing\n",
      hint: "self.close();",
      test: "if (code.includes('self.close()') || code.includes('close()')) return null; return 'close() yoki self.close() metodini chaqiring.';"
    },
    {
      id: 8,
      title: "Worker errorlarini tutish",
      instruction: "Worker-da xatolik yuz berganda (onerror), xatoning xabarini (event.message) konsolga chiqaruvchi kod yozing.",
      startingCode: "const myWorker = new Worker('heavyTask.js');\n// Bu yerga yozing\n",
      hint: "myWorker.onerror = (event) => {\n  console.error(event.message);\n};",
      test: "if (code.includes('onerror') && (code.includes('event.message') || code.includes('message'))) return null; return 'onerror hodisasi ichida event.message-ni chiqaring.';"
    },
    {
      id: 9,
      title: "Web Worker qo'llab-quvvatlashini tekshirish",
      instruction: "Agar brauzerda Web Worker mavjud bo'lsa, 'hasWorker' o'zgaruvchisini true ga tenglang.",
      startingCode: "let hasWorker = false;\n// Bu yerga yozing\n",
      hint: "if (typeof Worker !== 'undefined') {\n  hasWorker = true;\n}",
      test: "if (code.includes('typeof Worker') && code.includes('undefined')) return null; return 'typeof Worker !== \"undefined\" tekshiruvini yozing.';"
    },
    {
      id: 10,
      title: "Obyekt yuborish",
      instruction: "'myWorker'ga { taskId: 1, action: 'calculate' } obyektini yuboradigan kod yozing.",
      startingCode: "const myWorker = new Worker('heavyTask.js');\n// Bu yerga yozing\n",
      hint: "myWorker.postMessage({ taskId: 1, action: 'calculate' });",
      test: "if (code.includes('postMessage') && code.includes('taskId') && code.includes('calculate')) return null; return 'Obyektni postMessage yordamida to\\'g\\'ri yuboring.';"
    },
    {
      id: 11,
      title: "Inline Worker yaratish (Blob)",
      instruction: "Berilgan 'workerCode' matnidan 'application/javascript' tipidagi Blob yarating va uni 'blob' o'zgaruvchisiga saqlang.",
      startingCode: "const workerCode = \"self.onmessage = (e) => self.postMessage(e.data * 2);\";\n// Bu yerga yozing\nconst blob = ",
      hint: "new Blob([workerCode], { type: 'application/javascript' })",
      test: "if (code.includes('new Blob') && code.includes('application/javascript')) return null; return 'application/javascript tipi bilan Blob yarating.';"
    },
    {
      id: 12,
      title: "SharedWorker obyektini yaratish",
      instruction: "'shared.js' faylidan foydalanuvchi yangi Shared Worker obyektini yarating va uni 'myShared' o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nconst myShared = ",
      hint: "new SharedWorker('shared.js')",
      test: "if (code.includes(\"new SharedWorker('shared.js')\") || code.includes('new SharedWorker(\"shared.js\")')) return null; return 'SharedWorker-ni to\\'g\\'ri fayl nomi bilan yarating.';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Vaqt Limitsiz Inline Worker (workerWithTimeout)",
      instruction: "Dinamik ravishda inline Web Worker (Blob yordamida) yaratib, unga `data` qiymatini yuboradigan va natijani Promise ko'rinishida qaytaradigan `workerWithTimeout(workerCode, data, timeoutMs)` funksiyasini yozing. Agar worker belgilangan `timeoutMs` vaqt ichida javob bermasa, ulanish va worker `terminate()` orqali yopilsin va Promise 'Timeout' xatoligi bilan reject bo'lsin. (Eslatma: Test muhitida Web Worker simulyatsiyasi uchun `new Function` va global `setTimeout` ishlatilishi mumkin).",
      startingCode: "function workerWithTimeout(workerCode, data, timeoutMs) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return new Promise((resolve, reject) => { const blob = new Blob([workerCode], { type: 'application/javascript' }); const url = URL.createObjectURL(blob); const worker = new Worker(url); const timer = setTimeout(() => { worker.terminate(); reject('Timeout'); }, timeoutMs); worker.onmessage = (e) => { clearTimeout(timer); worker.terminate(); resolve(e.data); }; worker.postMessage(data); });",
      test: "if (typeof workerWithTimeout !== 'function') return 'workerWithTimeout funksiya emas';\n// Simulating worker for the runner check\nconst workerCode = \"self.onmessage = (e) => self.postMessage(e.data + 1);\";\nreturn new Promise(resolve => {\n  workerWithTimeout(workerCode, 5, 200).then(res => {\n    if (res === 6) resolve(null);\n    else resolve('Worker natijasi noto\\'g\\'ri: ' + res);\n  }).catch(err => {\n    resolve('Worker muvaffaqiyatli ishlamadi: ' + err);\n  });\n});"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ ArrayBuffer Transfer Helper (transferBufferToWorker)",
      instruction: "Foydalanuvchi bergan `ArrayBuffer` obyektini uning xotiradagi nusxasini ko'chirmasdan, transferable object ko'rinishida workerga yuboruvchi `transferBufferToWorker(worker, buffer)` funksiyasini yozing. Muvaffaqiyatli yuborilgach, `true` qaytarsin (agar buffer transferable bo'lmasa yoki xato yuz bersa `false` qaytarsin).",
      startingCode: "function transferBufferToWorker(worker, buffer) {\n  // Kodni shu yerdan yozing\n}",
      hint: "try { if (!worker || !buffer) return false; worker.postMessage(buffer, [buffer]); return true; } catch(e) { return false; }",
      test: "if (typeof transferBufferToWorker !== 'function') return 'transferBufferToWorker funksiya emas';\nconst mockWorker = { postMessage: (data, transfer) => { mockWorker.transferred = transfer; } };\nconst buffer = new ArrayBuffer(8);\nconst success = transferBufferToWorker(mockWorker, buffer);\nif (success && mockWorker.transferred && mockWorker.transferred[0] === buffer) return null;\nreturn 'Buffer transferable qilib uzatilmadi';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Web Worker nima vazifani bajaradi?",
    "options": [
      "Brauzerning asosiy oqimini (UI thread) bloklamasdan, fon rejimida og'ir kodlarni bajarish imkonini beradi",
      "DOM elementlarini tezroq render qiluvchi CSS dvigatelidir",
      "Ma'lumotlar bazasini brauzer ichida avtomatik sinxronizatsiya qiluvchi tizim",
      "Faqat internet tezligini oshiruvchi proksi server"
    ],
    "correctAnswer": 0,
    "explanation": "Web Worker brauzerning UI (foydalanuvchi interfeysi) oqimini muzlatib qo'ymaslik uchun og'ir matematik yoki ma'lumotlar bilan bog'liq ishlarni orqa fonda bajaradi."
  },
  {
    "id": 2,
    "question": "Web Worker ichida quyidagi global obyektlardan qaysi biridan foydalanish TAQIQLANGAN?",
    "options": [
      "self",
      "navigator",
      "window (va uning yordamida DOM)",
      "location"
    ],
    "correctAnswer": 2,
    "explanation": "Web Worker alohida oqim bo'lgani uchun u DOM (Document Object Model) elementlariga va `window` obyektiga bevosita kira olmaydi. Bu xavfsizlik va oqimlar to'qnashuvining oldini olish uchun joriy qilingan."
  },
  {
    "id": 3,
    "question": "Asosiy oqimdan Web Workerga xabar yuborish uchun qaysi metod chaqiriladi?",
    "options": [
      "sendMessage()",
      "postMessage()",
      "pushData()",
      "emit()"
    ],
    "correctAnswer": 1,
    "explanation": "Web Worker-da oqimlararo aloqa faqat `postMessage()` metodi orqali amalga oshiriladi."
  },
  {
    "id": 4,
    "question": "Web Worker-dan yuborilgan ma'lumotlarni qabul qilish uchun qaysi event handler ishlatiladi?",
    "options": [
      "onmessage",
      "onload",
      "onchange",
      "onreceive"
    ],
    "correctAnswer": 0,
    "explanation": "Ma'lumot kelganda javob qaytarish uchun `onmessage` yoki `addEventListener('message', callback)` ishlatiladi."
  },
  {
    "id": 5,
    "question": "Yangi Web Worker yaratish uchun qanday sintaksis ishlatiladi?",
    "options": [
      "const worker = new Worker('worker.js');",
      "const worker = Worker.create('worker.js');",
      "const worker = new ServiceWorker('worker.js');",
      "const worker = fetchWorker('worker.js');"
    ],
    "correctAnswer": 0,
    "explanation": "`new Worker('file_path')` yordamida yangi fon oqimi yaratiladi va unga alohida JS fayli yuklanadi."
  },
  {
    "id": 6,
    "question": "Web Worker-ni uning o'z ichidan (fondagi koddan) to'xtatish uchun qaysi metod chaqiriladi?",
    "options": [
      "self.close()",
      "self.terminate()",
      "self.stop()",
      "self.exit()"
    ],
    "correctAnswer": 0,
    "explanation": "Worker o'z ishini yakunlab o'zini to'xtatishi uchun global `self.close()` funksiyasini chaqirishi kerak."
  },
  {
    "id": 7,
    "question": "Asosiy oqimdan turib fondagi workerni darhol va majburiy to'xtatish uchun qaysi metod chaqiriladi?",
    "options": [
      "worker.stop()",
      "worker.close()",
      "worker.terminate()",
      "worker.destroy()"
    ],
    "correctAnswer": 2,
    "explanation": "Asosiy oqimdan turib ishlayotgan workerni zudlik bilan yopib yuborish uchun `worker.terminate()` metodi ishlatiladi."
  },
  {
    "id": 8,
    "question": "Worker ichida xatolik yuz berganda uni asosiy oqimda qanday tinglash mumkin?",
    "options": [
      "worker.onerror = ...",
      "worker.onfail = ...",
      "worker.onbreak = ...",
      "worker.onabort = ..."
    ],
    "correctAnswer": 0,
    "explanation": "Worker ichidagi xatoliklarni kuzatish uchun asosiy oqimda `worker.onerror` yoki `addEventListener('error', callback)` qo'llaniladi."
  },
  {
    "id": 9,
    "question": "Web Worker ichida tarmoq so'rovlari yuborish mumkinmi?",
    "options": [
      "Yo'q, Web Worker-da tarmoq so'rovlari butunlay taqiqlangan",
      "Ha, faqat XMLHttpRequest orqali mumkin",
      "Ha, ham fetch(), ham XMLHttpRequest orqali so'rov yuborish mumkin",
      "Ha, lekin faqat local serverga"
    ],
    "correctAnswer": 2,
    "explanation": "Web Worker ichida tarmoq bilan ishlash cheklanmagan. U erda `fetch` va `XMLHttpRequest` dan bemalol foydalanish mumkin."
  },
  {
    "id": 10,
    "question": "Web Workerga `postMessage` orqali obyekt uzatilganda JS dvigateli uni qanday o'tkazadi?",
    "options": [
      "Reference (ko'rsatkich) orqali to'g'ridan-to'g'ri uzatadi",
      "Structured Clone algoritmi yordamida obyektning chuqur nusxasini yaratib o'tkazadi",
      "Obyektni avtomatik ravishda Base64-ga o'giradi",
      "Uni faqat global xotirada saqlab qo'yadi"
    ],
    "correctAnswer": 1,
    "explanation": "JS oqimlar o'rtasida ma'lumotlar xavfsiz bo'lishi va bir vaqtda o'zgartirilmasligi uchun ularni Structured Clone algoritmi yordamida nusxalab beradi."
  },
  {
    "id": 11,
    "question": "Juda katta massivlarni (masalan, ArrayBuffer) nusxalamasdan, egalik huquqini workerga o'tkazish uchun nima ishlatiladi?",
    "options": [
      "Shared Memory",
      "Transferable Objects",
      "JSON Serialization",
      "WebSockets"
    ],
    "correctAnswer": 1,
    "explanation": "Transferable Objects yordamida ma'lumot nusxalanmaydi, balki uning xotiradagi adresi workerga o'tkaziladi. Bu esa resurs va vaqtni tejaydi (chunki asosiy oqim endi u ma'lumotdan foydalana olmaydi)."
  },
  {
    "id": 12,
    "question": "SharedWorker nima?",
    "options": [
      "Bir nechta sahifalar (tablar, iframe-lar) tomonidan birgalikda foydalaniladigan Web Worker",
      "Faqat bitta tab ichida ishlaydigan oddiy worker",
      "Serverdagi fayllarni yuklashni tezlashtiruvchi worker",
      "O'zgaruvchilarni umumiy tarmoqqa yuklovchi tizim"
    ],
    "correctAnswer": 0,
    "explanation": "SharedWorker bitta kelib chiqish manziliga (origin) ega bo'lgan bir nechta tablar, oynalar yoki iframe-lar o'rtasida umumiy bitta worker oqimi bo'lib ishlay oladi."
  }
]

};
