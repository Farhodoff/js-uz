export const webWorkers = {
  id: "webWorkers",
  title: "Web Workers: JavaScript-da Ko'p Oqimli Fikrlash",
  theory: `## 1. NEGA kerak?
JavaScript tabiatan yagona oqimli (single-threaded) til hisoblanadi. Bu degani, brauzerda barcha ishlar (UI renderlash, tugmalarni bosish, animatsiyalar va kodlar) bitta asosiy oqimda (Main Thread) bajariladi. Agar siz juda murakkab matematik hisob-kitoblar (masalan, tasvirlarga filtrlar berish, katta hajmdagi ma'lumotlarni saralash yoki 3D grafikalar hisoblash) bajarsangiz, asosiy oqim band bo'lib qoladi. Natijada brauzer "qotib" (freeze) qoladi va foydalanuvchi sahifada hech narsani bosa olmaydi. **Web Workers** bu muammoni hal etib, og'ir vazifalarni fonda, alohida oqimda (background thread) bajarish imkonini beradi. Bu orqali interfeys (UI) doimo silliq va faol holatda qoladi.

## 2. SODDALIK (Analogiya)
Tasavvur qiling, siz **restorandagi yagona ofitsiant va oshpazsiz** (bu Main Thread). Mijozlardan buyurtma olasiz, keyin oshxonaga kirib ovqat pishirasiz. Siz ovqat pishirayotganingizda yangi mijozlar keladi, lekin siz bandligingiz sababli ular kutishga majbur bo'ladi (sahifa qotishi). 
Agar siz **yordamchi oshpaz** yollasangiz (bu Web Worker), siz buyurtma olasiz va uni oshpazga berasiz. Oshpaz fonda taom tayyorlaydi (og'ir hisob-kitob), siz esa mijozlarga xizmat ko'rsatishda davom etasiz (UI ishlaydi). Taom tayyor bo'lgach, oshpaz sizni chaqiradi va siz uni mijozga yetkazasiz.

## 3. STRUKTURA
JavaScript-da Web Worker yaratish uchun alohida faylda yozilgan kod kerak bo'ladi.

### 1. Asosiy fayl (main.js):
\`\`\`javascript
// Oshpazni (worker-ni) ishga yollash
const worker = new Worker('worker.js');

// Worker-ga buyurtma (ma'lumot) yuborish
worker.postMessage({ number: 40 });

// Worker-dan javob kelganda
worker.onmessage = (event) => {
  console.log('Hisoblangan natija:', event.data);
};

// Kerak bo'lmaganda ishdan bo'shatish (to'xtatish)
// worker.terminate();
\`\`\`

### 2. Fondagi fayl (worker.js):
\`\`\`javascript
// Asosiy oqimdan ma'lumot kelishini kutish
self.onmessage = (event) => {
  const number = event.data.number;
  
  // Og'ir hisob-kitob (masalan, Fibonachchi soni)
  const result = fibonacci(number);
  
  // Natijani asosiy oqimga yuborish
  self.postMessage(result);
};

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

### Web Worker cheklovlari:
Web Worker-lar alohida oqimda ishlagani uchun ular quyidagilarga **kira olmaydi**:
- **DOM elementlari** (\`document.getElementById\` va hk)
- **\`window\` va \`parent\` obyekti**
- Lekin ular \`navigator\`, \`location\`, \`fetch()\`, \`setTimeout\`, \`IndexedDB\` kabi vositalardan foydalanishlari mumkin.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Worker ichida DOM-ga murojaat qilish:** Eng ko'p tarqalgan xato. Worker fayli ichida \`document\` yoki \`window\` ni ishlatish \`ReferenceError\` xatoligiga olib keladi. Barcha DOM amallari faqat asosiy oqimda (\`main.js\` ichida) bajarilishi shart.
2. **Katta hajmdagi ma'lumotlarni tez-tez uzatish:** \`postMessage\` orqali uzatiladigan ma'lumotlar klonlanadi (Structured Clone). Juda katta massiv yoki obyektlarni tez-tez jo'natish xotira va samaradorlikka salbiy ta'sir qiladi. Katta hajmlar uchun **Transferable Objects** (masalan, \`ArrayBuffer\`) ishlatish maqsadga muvofiq.
3. **Ishlatib bo'lingan Worker-ni ochiq qoldirish:** Worker-lar brauzer resurslarini (xotira va CPU) egallaydi. Vazifa butunlay tugagach, ularni \`worker.terminate()\` (asosiy oqimdan) yoki \`self.close()\` (worker ichidan) orqali to'xtatish kerak.

## 6. SAVOLLAR VA JAVOBLAR
**1. Web Worker nima?**
Asosiy UI oqimiga xalaqit bermagan holda JavaScript kodlarini fonda (background thread) bajarish imkonini beruvchi texnologiya.

**2. Web Worker-ni qanday yaratamiz?**
\`new Worker('script.js')\` konstruktori yordamida alohida JS faylini yuklash orqali.

**3. Asosiy oqim va Worker qanday aloqa qiladi?**
\`postMessage()\` metodi va \`onmessage\` voqea tinglovchisi orqali ma'lumot almashadi.

**4. Worker ichida DOM (masalan, \`document.body\`) obyekti bilan ishlash mumkinmi?**
Yo'q, Worker ichida DOM obyektlariga ruxsat yo'q.

**5. Worker ichidagi global obyekt nima?**
\`self\` obyekti (u asosiy oqimdagi \`window\` o'rnini bosadi).

**6. Worker-ni asosiy fayldan turib qanday to'xtatiladi?**
\`worker.terminate()\` metodi orqali.

**7. Worker-ni o'zining ichidan turib qanday o'chirish mumkin?**
\`self.close()\` (yoki oddiygina \`close()\`) metodi yordamida.

**8. Worker ichida \`fetch\` yordamida tarmoq so'rovlarini amalga oshirsa bo'ladimi?**
Ha, Web Worker ichida \`fetch()\` yoki \`XMLHttpRequest\` dan to'liq foydalanish mumkin.

**9. Web Worker-da vaqt taymerlaridan (\`setTimeout\`, \`setInterval\`) foydalansa bo'ladimi?**
Ha, bu taymerlar Worker ichida to'liq ishlaydi.

**10. Qanday ma'lumotlarni \`postMessage\` orqali uzatish mumkin?**
Structured Clone algoritmi qo'llab-quvvatlaydigan barcha obyektlarni (obyektlar, massivlar, stringlar, sonlar, bulianlar, shuningdek, \`Map\`, \`Set\`, \`Blob\` kabilar). Funksiyalarni uzatib bo'lmaydi.

**11. Inline Worker (faylsiz) yaratish mumkinmi?**
Ha, kod matnini \`Blob\` ga o'girib va \`URL.createObjectURL(blob)\` yordamida URL yaratib, uni Worker-ga topshirish orqali.

**12. Web Worker va Shared Worker farqi nima?**
Web Worker faqat uni yaratgan sahifaga bog'langan bo'ladi. Shared Worker esa bitta domendagi bir nechta tab, oyna yoki iframe-lar o'rtasida umumiy bo'lishishi mumkin.
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
      question: "Web Worker o'zining ichki kodidan turib o'z ishini to'xtatish uchun qaysi metoddan foydalanadi?",
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
      explanation: "Shared Worker bitta domen ostidagi barcha faol brauzer oynalari (tabs) yoki iframe-lar o'rtasida bitta umumiy background oqim sifatida xizmat qila oladi."
    }
  ]
};
