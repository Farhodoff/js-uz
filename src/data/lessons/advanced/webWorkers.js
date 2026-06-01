export const webWorkers = {
  id: "webWorkers",
  title: "Web Workers: JavaScript-da Ko'p Oqimli Fikrlash",
  level: "Murakkab",
  description: "Og'ir hisob-kitoblarni asosiy UI oqimidan fondagi alohida oqimga (Worker thread) o'tkazish.",
  theory: `## 1. NEGA kerak?
JavaScript tabiatan yagona oqimli (single-threaded) til hisoblanadi. Bu degani, brauzerda barcha ishlar (UI renderlash, tugmalarni bosish, animatsiyalar va kodlar) bitta asosiy oqimda (Main Thread) bajariladi. Agar siz juda murakkab matematik hisob-kitoblar (masalan, tasvirlarga filtrlar berish, katta hajmdagi ma'lumotlarni saralash yoki 3D grafikalar hisoblash) bajarsangiz, asosiy oqim band bo'lib qoladi. Natijada brauzer "qotib" (freeze) qoladi va foydalanuvchi sahifada hech narsani bosa olmaydi. **Web Workers** bu muammoni hal etib, og'ir vazifalarni fonda, alohida oqimda (background thread) bajarish imkonini beradi. Bu orqali interfeys (UI) doimo silliq va faol holatda qoladi.

---

## 2. SODDALIK (Analogiya)
Tasavvur qiling, siz **restorandagi yagona ofitsiant va oshpazsiz** (bu Main Thread). Mijozlardan buyurtma olasiz, keyin oshxonaga kirib ovqat pishirasiz. Siz ovqat pishirayotganingizda yangi mijozlar keladi, lekin siz bandligingiz sababli ular kutishga majbur bo'ladi (sahifa qotishi).
Agar siz **yordamchi oshpaz** yollasangiz (bu Web Worker), siz buyurtma olasiz va uni oshpazga berasiz. Oshpaz fonda taom tayyorlaydi (og'ir hisob-kitob), siz esa mijozlarga xizmat ko'rsatishda davom etasiz (UI ishlaydi). Taom tayyor bo'lgach, oshpaz sizni chaqiradi va siz uni mijozga yetkazasiz.

---

## 3. STRUKTURA VA CHUQUR TUSHUNCHALAR

### A. Structured Clone vs Transferable Objects
* **Structured Clone (Klonlash):** Odatiy holatda, \`postMessage\` orqali yuborilgan ma'lumotlar klonlanadi (Structured Clone algoritmi). Bu algoritm deyarli barcha JS obyektlarini (Map, Set, Date, Array va hk) to'liq nusxalaydi, lekin **funksiyalar, DOM elementlari va symbol-larni** klonlay olmaydi. Agar juda katta hajmdagi (masalan, 100MB) massivni klonlab yuborsak, nusxa ko'chirish jarayoni asosiy oqimni vaqtincha sekinlashtiradi.
* **Transferable Objects (Egalikni o'tkazish):** Katta hajmli binar ma'lumotlar (\`ArrayBuffer\`, \`MessagePort\`, \`ImageBitmap\`) uchun xotirada nusxa ko'chirmasdan, ma'lumotlarga bo'lgan **egalik huquqini (ownership)** butunlay ikkinchi oqimga uzatib yuborish mumkin (Zero-copy transfer). Egalik huquqi o'tgandan so'ng, jo'natuvchi oqimda bu ma'lumotlar butunlay bo'shab qoladi (hajmi 0 bo'ladi) va unga kirish taqiqlanadi.

\`\`\`mermaid
sequenceDiagram
    participant M as Main Thread
    participant W as Worker Thread
    Note over M, W: 1. Structured Clone (Nusxa ko'chirish)
    M->>W: postMessage(data) [100MB copy]
    Note over M, W: 2. Transferable Object (Egalikni o'tkazish)
    M->>W: postMessage(buffer, [buffer]) [Zero-Copy]
    Note over M: buffer o'lchami Main-da 0 ga aylanadi!
\`\`\`

### B. Shared Workers (Umumiy Worker-lar)
Dedicated Worker (oddiy worker) faqat uni yaratgan sahifaga (tabga) tegishli bo'ladi. **Shared Worker** esa bir xil domen ostidagi bir nechta har xil tablar, oynalar yoki iframe-lar o'rtasida umumiy bo'lishi mumkin. Aloqa maxsus \`port\`lar orqali o'rnatiladi:
\`\`\`javascript
// main.js
const myShared = new SharedWorker('shared-worker.js');
myShared.port.start();
myShared.port.postMessage('Salom');
\`\`\`

### C. Inline Workers (Blob va ObjectURL)
Alohida fayl yaratmasdan, bevosita kod ichida Web Worker-ni dinamik yaratish uchun \`Blob\` va \`URL.createObjectURL\` kombinatsiyasidan foydalaniladi:
\`\`\`javascript
const code = "self.onmessage = (e) => self.postMessage(e.data * 2);";
const blob = new Blob([code], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));
\`\`\`

\`\`\`mermaid
graph TD
    A[JavaScript Thread Turlari] --> B[Dedicated Worker - Bitta sahifa uchun]
    A --> C[Shared Worker - Bir nechta tablar ulasha oladi]
    A --> D[Service Worker - Offline kesh va proxy]
    B --> E[Transferable Objects qo'llaydi - ArrayBuffer]
    B --> F[DOM-ga kirish butunlay taqiqlangan]
\`\`\`

---

## 4. XATOLAR (Common mistakes)
1. **Worker ichida DOM-ga murojaat qilish:** Eng ko'p tarqalgan xato. Worker fayli ichida \`document\` yoki \`window\` ni ishlatish \`ReferenceError\` xatoligiga olib keladi. Barcha DOM amallari faqat asosiy oqimda (\`main.js\` ichida) bajarilishi shart.
2. **Egaligi o'tkazilgan buferga qayta murojaat qilish:** Agar \`ArrayBuffer\` worker-ga transferable qilib uzatilsa, u asosiy oqimda yaroqsiz (detached) bo'lib qoladi. Unga yozish yoki o'qishga urinish xatolik beradi.

---

## 5. SAVOLLAR VA JAVOBLAR
**1. Web Worker nima?**
Asosiy UI oqimiga xalaqit bermagan holda JavaScript kodlarini fonda (background thread) bajarish imkonini beruvchi texnologiya.

**2. Web Worker-ni qanday yaratamiz?**
\`new Worker('script.js')\` konstruktori yordamida alohida JS faylini yuklash orqali.

**3. Asosiy oqim va Worker qanday aloqa qiladi?**
\`postMessage()\` metodi va \`onmessage\` voqea tinglovchisi orqali ma'lumot almashadi.`,
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
      id: 1,
      question: "JavaScript-ning yagona oqimli (single-threaded) tabiatini chetlab o'tib, fonda hisoblashlarni bajarish imkoni qaysi texnologiyada bor?",
      options: [
        "Local Storage",
        "Web Workers",
        "DOM Event Listeners",
        "Async/Await"
      ],
      correctAnswer: 1,
      explanation: "Web Workers fonda yangi oqim (thread) ochib beradi va asosiy oqimga (Main Thread) xalaqit bermaydi."
    },
    {
      id: 2,
      question: "Web Worker kodi yozilgan alohida faylda quyidagi obyektlarning qaysi biriga kirish taqiqlangan?",
      options: [
        "navigator",
        "document",
        "location",
        "setTimeout"
      ],
      correctAnswer: 1,
      explanation: "Worker-lar alohida muhitda ishlaydi va ularga DOM elementlari (shu jumladan document obyekti) bilan ishlash taqiqlangan."
    },
    {
      id: 3,
      question: "Asosiy oqim va Web Worker o'rtasida ma'lumot uzatish uchun qaysi metoddan foydalaniladi?",
      options: [
        "worker.sendMessage()",
        "worker.postMessage()",
        "worker.emit()",
        "worker.transfer()"
      ],
      correctAnswer: 1,
      explanation: "postMessage() metodi orqali asosiy oqim va worker o'rtasida xabarlar almashiladi."
    },
    {
      id: 4,
      question: "Web Worker-dan kelgan xabarlarni tinglash uchun qaysi xususiyat / hodisa tinglovchisi ishlatiladi?",
      options: [
        "onreceive",
        "onmessage",
        "onpost",
        "onchange"
      ],
      correctAnswer: 1,
      explanation: "Har ikki tomonda ham boshqa tomondan yuborilgan xabarni olish uchun onmessage hodisasi yoki 'message' voqea tinglovchisi ishlatiladi."
    },
    {
      id: 5,
      question: "Asosiy oqimdan turib Web Worker-ni darhol to'xtatish metodini belgilang.",
      options: [
        "worker.stop()",
        "worker.close()",
        "worker.terminate()",
        "worker.kill()"
      ],
      correctAnswer: 2,
      explanation: "Asosiy oqimda worker-ni o'chirish uchun terminate() chaqiriladi. close() esa faqat worker-ning o'z ichida ishlatiladi."
    },
    {
      id: 6,
      question: "Web Worker o'zining ichki kodidan turib o'z ishini to'xtatish uchun qaysi metoddan foydalanibi?",
      options: [
        "self.terminate()",
        "self.close()",
        "self.destroy()",
        "self.stop()"
      ],
      correctAnswer: 1,
      explanation: "Worker o'zini o'zi to'xtatishi uchun close() yoki self.close() metodidan foydalanadi."
    },
    {
      id: 7,
      question: "Web Worker-dagi global kontekst obyekti nima deb nomlanadi?",
      options: [
        "window",
        "self",
        "global",
        "parent"
      ],
      correctAnswer: 1,
      explanation: "Worker-lar ichida global scope vazifasini window emas, self (yoki DedicatedWorkerGlobalScope) obyekti bajaradi."
    },
    {
      id: 8,
      question: "Web Worker ichida tarmoqdan ma'lumot olish uchun qaysi API-lardan foydalanish mumkin?",
      options: [
        "Faqat axios",
        "fetch() va XMLHttpRequest",
        "Hech qanday tarmoq so'rovi qilish mumkin emas",
        "Faqat websocket"
      ],
      correctAnswer: 1,
      explanation: "Worker-lar DOM-ga kira olmasada, fetch() yoki XMLHttpRequest yordamida fonda server bilan ma'lumot almasha oladi."
    },
    {
      id: 9,
      question: "postMessage orqali yuborilgan ma'lumotlar qanday uzatiladi?",
      options: [
        "Malumotlar faqat reference (havola) orqali uzatiladi",
        "Structured Clone algoritmi yordamida nusxa ko'chiriladi (klonlanadi)",
        "Obyektlar matnga o'girilib XML-ga aylantiriladi",
        "Faqat base64 formatiga o'tkaziladi"
      ],
      correctAnswer: 1,
      explanation: "Xavfsizlik va mustaqillik sababli uzatiladigan har qanday ma'lumot Structured Clone algoritmi yordamida klonlanadi, ya'ni ularning to'liq nusxasi olinadi."
    },
    {
      id: 10,
      question: "Agar xatolik yuz berib uni tuta olmasak, Web Worker xatoligini qaysi event handler orqali aniqlaymiz?",
      options: [
        "onclose",
        "onerror",
        "onfailure",
        "onpanic"
      ],
      correctAnswer: 1,
      explanation: "Web Worker ichida yuz bergan xatolarni asosiy oqimda onerror hodisasi yordamida ushlash mumkin."
    },
    {
      id: 11,
      question: "Transferable Objects (masalan, ArrayBuffer) yuborishning afzalligi nimada?",
      options: [
        "Ular xotira hajmini kamaytiradi",
        "Ular nusxa ko'chirmaydi, xotira manziliga egalikni (ownership) to'g'ridan-to'g'ri ikkinchi oqimga o'tkazadi va bu juda tez ishlaydi",
        "Ular JSON-ga qaraganda xavfsizroq",
        "Ularni faqat CSS qo'llab-quvvatlaydi"
      ],
      correctAnswer: 1,
      explanation: "Transferable objects ma'lumotni klonlamasdan, uning xotiradagi joyiga bo'lgan egalik huquqini bir zumda boshqa oqimga o'tkazib beradi. Bu gigabaytlab ma'lumotni nol soniyada uzatish imkonini beradi."
    },
    {
      id: 12,
      question: "Shared Worker-ning Dedicated Worker (oddiy Worker)-dan farqi nimada?",
      options: [
        "Shared Worker sekinroq ishlaydi",
        "Shared Worker bir nechta oyna (tabs), iframe yoki brauzer sessiyalari orasida bitta ulanishni baham ko'ra oladi",
        "Shared Worker-ga DOM bilan ishlashga ruxsat berilgan",
        "Shared Worker hech qachon yopilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Shared Worker bitta domen ostidagi baklar faol brauzer oynalari (tabs) yoki iframe-lar o'rtasida bitta umumiy background oqim sifatida xizmat qila oladi."
    },
    {
      id: 13,
      question: "Web Workerga yuboriladigan ma'lumotlarni klonlovchi Structured Clone algoritmi quyidagi qaysi qiymatni nusxalashni qo'llab-quvvatlamaydi?",
      options: [
        "Map va Set obyektlarini",
        "RegExp va Date obyektlarini",
        "JavaScript Funksiyalarini (Functions) va DOM elementlarini",
        "ArrayBuffer obyektlarini"
      ],
      correctAnswer: 2,
      explanation: "Structured Clone algoritmi funksiyalarni, DOM tugunlarini (nodes) va symbol-larni nusxalay olmaydi. Ularni postMessage orqali yuborish xatolikka olib keladi."
    },
    {
      id: 14,
      question: "Transferable object (masalan, ArrayBuffer) worker-ga muvaffaqiyatli uzatilgandan so'ng, jo'natuvchi (asosiy) oqimdagi uning holati qanday bo'ladi?",
      options: [
        "U hech qanday o'zgarishsiz qoladi",
        "U butunlay bo'shab (detached/neutralized) qoladi, byteLength xossasi 0 ga aylanadi va unga kirib bo'lmaydi",
        "U avtomatik ravishda JSON stringga o'giriladi",
        "U faqat o'qish uchun (read-only) holatiga o'tadi"
      ],
      correctAnswer: 1,
      explanation: "Egalik huquqi butunlay ikkinchi oqimga o'tkazilgani uchun, jo'natuvchi oqimdagi buffer bo'shab qoladi (byteLength = 0). Bu esa xotira xavfsizligini ta'minlaydi."
    }
  ]
};
