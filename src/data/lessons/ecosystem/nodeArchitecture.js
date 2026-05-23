export const nodeArchitecture = {
  id: "nodeArchitecture",
  title: "Node.js Arxitekturasi va Event Loop",
  theory: `## 1. NEGA kerak?
Node.js JavaScript-ni brauzerdan tashqarida — server muhitida ishga tushirish imkonini beradi. U o'zining tezkorligi va samaradorligi bilan mashhur, bunga sabab uning **asinxron**, **bloklamaydigan I/O (Non-blocking I/O)** va **bir oqimli (Single-threaded)** arxitekturasidir.
Node.js intervyularida sizdan Node.js ning ishlash arxitekturasi, **Event Loop** fazalari, **libuv** kutubxonasi, **Thread Pool**, hamda katta ma'lumotlar bilan ishlashda ishlatiladigan **Streams & Buffers** haqida batafsil tushunchaga ega bo'lishingiz so'raladi. Bularni bilmaslik serverda xotira to'lib qolishi (Out of Memory) yoki butun sayt faoliyatini to'xtatib qo'yuvchi bloklanishlarga (Blocking the Event Loop) olib keladi.

## 2. SODDALIK (Analogiya)
Siz **kichik qahvaxona** ochdingiz:
- **Single-threaded (Bir oqim):** Qahvaxonada faqat **bitta kassir** (JavaScript Main Thread) ishlaydi. U so'rovlarni qabul qiladi.
- **Asinxron / Non-blocking:** Kassir sizdan buyurtma oladi, unga raqam beradi va kofeni tayyorlovchi **oshxonaga** (C++ APIs / libuv) uzatadi. Sizni stolga yuboradi va navbatdagi mijozdan buyurtma olaveradi. U kofening tayyor bo'lishini kutib turmaydi.
- **Thread Pool:** Oshxonadagi kofe mashinalari va baristalar (libuv Thread Pool). Ular og'ir contributes (kofe qaynatish, shirinlik tayyorlash) bilan shug'ullanishadi.
- **Event Loop (Hodisalar aylanmasi):** Tayyor bo'lgan kofe haqidagi xabarni eshitib, uni mijozga yetkazib berish jarayonini boshqarib turuvchi administrator.

## 3. STRUKTURA
Node.js arxitekturasining asosiy ustunlari:

### 1. libuv va Thread Pool
JavaScript faqat bitta oqimda ishlasa-da, Node.js orqa fonda og'ir operatsiyalarni (Fayl tizimi bilan ishlash - fs, Kriptografiya - crypto, Tarmoq so'rovlari) C++ yordamida **Thread Pool** (odatda 4 ta oqimdan iborat ishchilar guruhi) ga yuklaydi.

### 2. Event Loop Fazalari
Event Loop doimiy ravishda quyidagi fazalarni aylanib chiqadi:
1. **Timers (Taymerlar):** \`setTimeout\` va \`setInterval\` callbacklari bajariladi.
2. **Pending Callbacks:** Ba'zi tizimli xatolar callbacklari.
3. **Idle, Prepare:** Ichki tizimli faza.
4. **Poll (So'rov):** Yangi tarmoq ulanishlari, fayl o'qish operatsiyalari callbacklari bajariladi.
5. **Check (Tekshiruv):** \`setImmediate\` callbacklari bajariladi.
6. **Close Callbacks:** \`socket.on('close', ...)\` kabi yopilish callbacklari.
*Eslatma:* \`process.nextTick()\` va \`Promise.then()\` (microtasklar) har bir faza o'rtasida zudlik bilan bajariladi!

### 3. Buffers va Streams
- **Buffer (Bufer):** Xotirada (RAM) vaqtinchalik saqlanadigan ikkilik ma'lumotlar (binary data) bo'lagi.
- **Stream (Oqim):** Katta hajmdagi fayllarni (masalan, 5 GB video) to'liq xotiraga yuklamasdan, ularni mayda bo'laklarga (chunks) bo'lib, oqim shaklida o'qish va yozish imkoniyati.

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **Asosiy oqimni bloklash (Blocking the Event Loop):** Masalan, 1 millionta elementni sinxron saralash yoki \`fs.readFileSync()\` ni so'rov kelgan paytda chaqirish. JavaScript yagona oqimda bo'lgani uchun, u band bo'lganda boshqa hech qaysi foydalanuvchiga javob bera olmaydi (sayt qotib qoladi). Har doim asinxron (\`fs.readFile\`) metodlar ishlatilishi shart.
2. **Katta fayllarni o'qishda \`fs.readFile\` ishlatish:** Agar 2 GB li faylni \`fs.readFile\` orqali o'qisak, Node.js uni to'liq xotiraga yuklashga harakat qiladi va xotira tugab server o'chadi. Bunday holatda \`fs.createReadStream\` (Streams) ishlatilishi zarur.
3. **\`setImmediate\` va \`setTimeout(..., 0)\` farqini bilmaslik:** Ikkalasi ham asinxron bo'lsa-da, \`setImmediate\` har doim I/O (fayl o'qish/yozish) callbacklaridan keyingi Check fazasida birinchi ishga tushishi kafolatlanadi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Node.js nima va u nega yagona oqimli (single-threaded) deyiladi?**
Node.js JavaScript-ni serverda ishlatuvchi platforma bo'lib, u foydalanuvchi yozgan JS kodlarini faqat bitta asosiy oqimda (Main Thread) ketma-ket bajaradi.

**2. Agar Node.js bir oqimli bo'lsa, u qanday qilib minglab so'rovlarni bir vaqtda qayta ishlaydi?**
Asinxron Non-blocking I/O tufayli. Og'ir tarmoq va fayl amallari operatsion tizim yoki orqa fondagi ishchi oqimlarga (libuv Thread Pool) topshiriladi, asosiy oqim esa bo'sh qolib, yangi so'rovlarni qabul qilaveradi.

**3. libuv nima?**
C tilida yozilgan, asinxronlikni va orqa fondagi oqimlar pulini (Thread Pool) boshqaradigan, Node.js ning eng muhim ichki kutubxonasi.

**4. Node.js Event Loop nima?**
Asinxron operatsiyalar tugagandan so'ng, ularning callback funksiyalarini tartib bo'yicha Call Stack-ga olib kirib bajarishni boshqaradigan cheksiz aylanma sikl.

**5. process.nextTick() nima va u qachon bajariladi?**
U Event Loop-dan mustaqil ravishda joriy operatsiya tugashi bilan, Event Loop keyingi fazaga o'tishidan oldin zudlik bilan ishga tushadigan callback navbatidir (barcha asinxron ishlardan oldin bajariladi).

**6. Buffer (Bufer) nima?**
Node.js-da xotiraning V8 dvigatelidan tashqarida ajratilgan, xom ikkilik (binary) ma'lumotlarni baytlar ko'rinishida saqlaydigan vaqtinchalik xotira bo'lagi.

**7. Stream (Oqim) nima va uning qanday turlari bor?**
Ma'lumotlarni bo'laklab (chunk) uzatish texnologiyasi. 4 turi bor: Readable (o'qish), Writable (yozish), Duplex (o'qish+yozish), Transform (o'zgartirib yozish).

**8. Nima uchun katta fayllarni uzatishda Stream ishlatish kerak?**
Chunki u faylni xotiraga to'liq yuklamaydi. Xotira sarfi minimal (masalan, 20-30 MB) bo'lib qolaveradi va har qanday katta faylni xavfsiz o'qish imkonini beradi.

**9. setImmediate va setTimeout(fn, 0) farqi nima?**
I/O sikli (masalan, fayl o'qish tugagach) ichida \`setImmediate\` har doim \`setTimeout\` dan oldin bajarilishi kafolatlanadi. Oddiy holatda esa ularning navbati aniq bo'lmaydi.

**10. Node.js-da nechta oqim bor (default Thread Pool size)?**
Odatiy holatda libuv Thread Pool 4 ta oqimga (threads) ega. Uni \`UV_THREADPOOL_SIZE\` muhit o'zgaruvchisi orqali oshirish mumkin.

**11. REPL nima?**
Read-Eval-Print Loop — terminal orqali Node.js kodlarini darhol yozib, natijasini sinab ko'rish imkonini beruvchi interaktiv muhit.

**12. EventEmitter nima?**
Node.js-da hodisalarni (events) yaratish, tinglash (listen) va tarqatish (emit) uchun ishlatiladigan fundamental klass bo'lib, asosan asinxron aloqalarda qo'llaniladi.
`,
  exercises: [
    {
      id: 1,
      title: "Buffer yaratish",
      instruction: "Berilgan satrdan (string) UTF-8 formatida yangi Buffer obyektini yaratadigan `createBuffer(str)` funksiyasini yozing.",
      startingCode: "function createBuffer(str) {\n  // Buffer.from yordamida yarating\n}",
      hint: "return Buffer.from(str, 'utf8');",
      test: "if (typeof createBuffer !== 'function') return 'createBuffer topilmadi'; const buf = createBuffer('Salom'); if(!buf || buf.toString() !== 'Salom') return 'Buffer noto\\'g\\'ri yaratildi'; return null;"
    },
    {
      id: 2,
      title: "Buffer-ni string-ga o'girish",
      instruction: "Berilgan Buffer obyektini UTF-8 kodlash formatida oddiy satrga (string) o'giruvchi `bufferToString(buf)` funksiyasini yozing.",
      startingCode: "function bufferToString(buf) {\n  // toString yordamida o'giring\n}",
      hint: "return buf.toString('utf8');",
      test: "if (typeof bufferToString !== 'function') return 'bufferToString topilmadi'; const buf = Buffer.from('Test'); if(bufferToString(buf) !== 'Test') return 'String-ga o\\'girish xato'; return null;"
    },
    {
      id: 3,
      title: "Path birlashtirish (path.join)",
      instruction: "Node.js-dagi `path` moduli kabi papka yo'li (`dir`) va fayl nomini (`file`) to'g'ri birlashtiruvchi `joinPaths(dir, file)` funksiyasini yozing (ortiqcha sleshlar tozalansin, oddiy '/' separator ishlatilsin).",
      startingCode: "function joinPaths(dir, file) {\n  // dir va file ni '/' bilan birlashtirib, takroriy sleshlarni tozalang\n}",
      hint: "return \`\${dir}/\${file}\`.replace(/\\/+/g, '/');", // eslint-disable-line no-useless-escape
      test: "if (typeof joinPaths !== 'function') return 'joinPaths topilmadi'; if(joinPaths('/app/', '/src/index.js') !== '/app/src/index.js') return 'Yo\\'llar xato birlashtirildi'; return null;"
    },
    {
      id: 4,
      title: "Asolbute Path tekshiruvi",
      instruction: "Berilgan fayl yo'li faqat slesh `/` bilan boshlanadigan absolut yo'l ekanligini tekshiradigan `isAbsolute(filePath)` funksiyasini yozing (true/false).",
      startingCode: "function isAbsolute(filePath) {\n  // Boshlanishini tekshiring\n}",
      hint: "return filePath.startsWith('/');",
      test: "if (typeof isAbsolute !== 'function') return 'isAbsolute topilmadi'; if (isAbsolute('/var/log') !== true) return 'Absolut yo\\'l aniqlanmadi'; if(isAbsolute('src/index.js') !== false) return 'Nisbiy yo\\'l uchun xato'; return null;"
    },
    {
      id: 5,
      title: "EventEmitter hodisa tinglovchisi",
      instruction: "Sodda `EventEmitter` obyektida `start` nomli hodisa sodir bo'lganda (emit qilinganda) konsolga 'Boshlandi' deb yozuvchi tinglovchi (listener) ni ro'yxatdan o'tkazing.",
      startingCode: "class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, listener) { (this.events[event] = this.events[event] || []).push(listener); }\n  emit(event, ...args) { (this.events[event] || []).forEach(fn => fn(...args)); }\n}\nconst emitter = new EventEmitter();\n// Bu yerga yozing\n",
      hint: "emitter.on('start', () => console.log('Boshlandi'));",
      test: "if (typeof emitter === 'undefined') return 'emitter topilmadi'; let logged = false; const oldLog = console.log; console.log = (msg) => { if(msg === 'Boshlandi') logged = true; }; try { emitter.emit('start'); } catch(e){} console.log = oldLog; if(!logged) return 'start hodisasi tinglovchisi to\\'g\\'ri yozilmadi'; return null;"
    },
    {
      id: 6,
      title: "Event Loop Phase order finder",
      instruction: "Node.js Event Loop fazalaridan `setImmediate` callbacklari bajariladigan faza nomini (string) `immediatePhase` o'zgaruvchisiga yozing ('poll', 'check' yoki 'timers').",
      startingCode: "const immediatePhase = ",
      hint: "'check'",
      test: "if (typeof immediatePhase === 'undefined') return 'immediatePhase topilmadi'; if (immediatePhase !== 'check') return 'setImmediate check fazasida bajariladi'; return null;"
    },
    {
      id: 7,
      title: "Fayl hajmini olish",
      instruction: "Node.js fs.stat qaytargan stat obyektidan fayl hajmini baytlarda qaytaruvchi `getFileSize(stats)` funksiyasini yozing.",
      startingCode: "function getFileSize(stats) {\n  // stats.size ni qaytaring\n}",
      hint: "return stats?.size || 0;",
      test: "if (typeof getFileSize !== 'function') return 'getFileSize topilmadi'; if(getFileSize({ size: 1024 }) !== 1024) return 'Hajm to\\'g\\'ri olinmadi'; return null;"
    },
    {
      id: 8,
      title: "Platform tekshiruvi (Windows)",
      instruction: "Node.js-dagi process.platform moduli kabi platforma 'win32' (Windows) ekanligini tekshirib true/false qaytaradigan `isWindows(platform)` funksiyasini yozing.",
      startingCode: "function isWindows(platform) {\n  // win32 ekanligini tekshiring\n}",
      hint: "return platform === 'win32';",
      test: "if (typeof isWindows !== 'function') return 'isWindows topilmadi'; if (isWindows('win32') !== true || isWindows('darwin') !== false) return 'Platforma tekshiruvi xato'; return null;"
    },
    {
      id: 9,
      title: "Thread Pool default size",
      instruction: "Libuv orqa fondagi Thread Pool ning standart oqimlar sonini (raqam) `defaultThreadPoolSize` o'zgaruvchisiga yozing.",
      startingCode: "const defaultThreadPoolSize = ",
      hint: "4",
      test: "if (typeof defaultThreadPoolSize === 'undefined') return 'defaultThreadPoolSize topilmadi'; if(defaultThreadPoolSize !== 4) return 'Libuv thread pool standart hajmi 4 ta oqimga teng'; return null;"
    },
    {
      id: 10,
      title: "Buffer bo'shligini tekshirish",
      instruction: "Berilgan Buffer obyekti uzunligi 0 ekanligini tekshiradigan `isBufferEmpty(buf)` funksiyasini yozing (true/false).",
      startingCode: "function isBufferEmpty(buf) {\n  // length xossasini tekshiring\n}",
      hint: "return buf.length === 0;",
      test: "if (typeof isBufferEmpty !== 'function') return 'isBufferEmpty topilmadi'; const b = Buffer.from(''); if(isBufferEmpty(b) !== true) return 'Bo\\'sh buffer uchun xato'; return null;"
    },
    {
      id: 11,
      title: "Sodda asinxron fayl o'qish (Mock)",
      instruction: "fs.readFile kabi callback qabul qilib, ma'lumotni asinxron (setTimeout 10ms yordamida) qaytaradigan `mockReadFile(data, callback)` funksiyasini yozing (callback(null, data) ko'rinishida chaqiring).",
      startingCode: "function mockReadFile(data, callback) {\n  // setTimeout ichida callback chaqiring\n}",
      hint: "setTimeout(() => callback(null, data), 10);",
      test: "if (typeof mockReadFile !== 'function') return 'mockReadFile topilmadi'; let resData = null; mockReadFile('Salom', (err, data) => { resData = data; }); // testing async via setTimeout\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (resData !== 'Salom') resolve('Asinxron o\\'qish simulyatsiyasi xato');\n    else resolve(null);\n  }, 20);\n});"
    },
    {
      id: 12,
      title: "Buffer ajratish (Buffer.alloc)",
      instruction: "Xotiradan ma'lum bir bayt miqdordagi (size) tozalangan (bo'sh) Buffer xotirasini ajratadigan `allocateBuffer(size)` funksiyasini yozing.",
      startingCode: "function allocateBuffer(size) {\n  // Buffer.alloc dan foydalaning\n}",
      hint: "return Buffer.alloc(size);",
      test: "if (typeof allocateBuffer !== 'function') return 'allocateBuffer topilmadi'; const b = allocateBuffer(10); if(b.length !== 10) return 'Buffer to\\'g\\'ri ajratilmadi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Node.js nima uchun yuqori yuklamali tarmoq so'rovlarini juda samarali va tez bajara oladi?",
      options: [
        "Chunki u ma'lumotlarni faqat sonlarda saqlaydi",
        "Asinxron, Non-blocking I/O modeliga va hodisalarga asoslangan arxitekturasiga ko'ra",
        "Chunki unda 100 dan ortiq asosiy oqimlar (threads) ishlaydi",
        "U faqat Windows operatsion tizimida tez ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Node.js bloklamaydigan I/O arxitekturasi tufayli og'ir ishlarni orqa fonga topshirib, o'zining yagona oqimini doimo bo'sh saqlaydi va tezkor javob beradi."
    },
    {
      id: 2,
      question: "libuv kutubxonasining Node.js dagi asosiy vazifasi nima?",
      options: [
        "Sayt dizaynini boshqarish",
        "Asinxron ishlarni, tarmoq voqealarini va Thread Pool (ishchilar guruhi)ni boshqarib berish",
        "HTML sahifani render qilish",
        "Parollarni Bcrypt orqali hashlash"
      ],
      correctAnswer: 1,
      explanation: "libuv — Node.js-ga asinxron Non-blocking I/O va ko'p oqimli Thread Pool-ni taqdim etadigan, C tilida yozilgan platformalararo yordamchi kutubxonadir."
    },
    {
      id: 3,
      question: "Event Loop-dagi 'Poll' fazasining vazifasi nima?",
      options: [
        "Faqat `setTimeout` taymerlarini tekshirish",
        "Yangi tarmoq so'rovlari va fayl tizimi (I/O) callbacklarini qabul qilish hamda bajarish",
        "Dasturni to'liq o'chirish",
        "Strict mode ogohlantirishlarini chiqarish"
      ],
      correctAnswer: 1,
      explanation: "Poll fazasi Event Loop-ning eng muhim qismi bo'lib, u yangi kiruvchi I/O operatsiyalarini va ularning bajarilgan natijalarini qabul qiladi."
    },
    {
      id: 4,
      question: "setImmediate() va setTimeout(fn, 0) farqi nimada?",
      options: [
        "setTimeout tezroq ishlaydi",
        "I/O (masalan, fayl o'qish) callbacklari ichida `setImmediate` har doim `setTimeout` dan birinchi ishga tushishi kafolatlanadi",
        "Ikkalasi mutlaqo har xil kompyuterda ishlaydi",
        "setImmediate faqat server o'chganda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Fayl o'qish (I/O) yakunlangach, Event Loop Check fazasiga o'tadi va u yerda birinchi bo'lib `setImmediate` bajariladi, `setTimeout` taymerlari esa keyingi aylanmada ko'riladi."
    },
    {
      id: 5,
      question: "Nima uchun Event Loop-ni bloklash (Blocking the Event Loop) xavfli?",
      options: [
        "Chunki bu xotirani tozalab yuboradi",
        "JavaScript yagona oqimda bo'lgani sababli, u sinxron og'ir amal bilan band bo'lganda boshqa foydalanuvchilarning so'rovlariga javob bera olmay, sayt to'liq qotib qoladi",
        "Faqat CSS kodlari buziladi",
        "Server avtomatik o'chadi"
      ],
      correctAnswer: 1,
      explanation: "Agar asinxron bo'lmagan og'ir sikl yoki sinxron fayl o'qish bajarsak, yagona Main Thread band bo'ladi va boshqa mijozlar navbatda javobsiz qolib ketadi."
    },
    {
      id: 6,
      question: "Buffer (Bufer) nima va u ma'lumotlarni qanday shaklda saqlaydi?",
      options: [
        "Faqat JSON formatidagi matn",
        "Xotirada (V8 tashqarisida) vaqtinchalik ajratilgan xom baytlar va ikkilik (binary) ma'lumotlar to'plami",
        "CSS klasslari ro'yxati",
        "O'z-o'zidan o'sadigan massiv"
      ],
      correctAnswer: 1,
      explanation: "Buffer xotiradagi ma'lum bir bayt o'lchamdagi to'g'ridan-to'g'ri raqamlar (binary bytes) to'plamidir."
    },
    {
      id: 7,
      question: "Nima uchun katta fayllarni (masalan, 1 GB) o'qishda `fs.readFile` o'rniga `fs.createReadStream` (Streams) tavsiya etiladi?",
      options: [
        "readFile faqat Windows-da ishlaydi",
        "readFile butun faylni xotiraga (RAM) yuklashga harakat qiladi va xotira to'lib ketishiga olib keladi, Stream esa faylni mayda bo'laklar (chunks) holida uzatadi",
        "Stream faylni shifrlaydi",
        "Chunki Stream tezroq yopiladi"
      ],
      correctAnswer: 1,
      explanation: "Stream ma'lumotni oqimli (chunk-by-chunk) uzatgani uchun xotira sarfi minimal (taxminan 20-30 MB) bo'lib qoladi va har qanday ulkan faylni xavfsiz o'qiy oladi."
    },
    {
      id: 8,
      question: "Node.js-da microtasklar (Promises, process.nextTick) qachon bajariladi?",
      options: [
        "Faqat Event Loop yakunida",
        "Event Loop-ning har bir fazasi orasida, joriy faza tugashi bilan zudlik bilan",
        "Faqat `setTimeout` dan keyin",
        "Ular hech qachon bajarilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Microtask navbatlari eng yuqori ustuvorlikka ega. Event Loop bir fazadan ikkinchisiga o'tish arafasida turgan har qanday soniyada barcha microtasklarni bajarib bo'shatadi."
    },
    {
      id: 9,
      question: "Libuv Thread Pool standart oqimlar soni (threads) nechaga teng?",
      options: ["1 ta", "2 ta", "4 ta", "8 ta"],
      correctAnswer: 2,
      explanation: "Libuv oqimlar hovuzining (Thread Pool) standart o'lchami 4 ta oqimdan iborat."
    },
    {
      id: 10,
      question: "process.nextTick() ning vazifasi nima?",
      options: [
        "Navbatdagi tizim vaqtini aniqlash",
        "Callback funksiyani joriy kod bajarilib bo'lishi bilan (Event Loop fazasi o'zgarishidan oldin) zudlik bilan ishga tushirish",
        "Faqat yangi oqim ochish",
        "LocalStorage-ni tozalash"
      ],
      correctAnswer: 1,
      explanation: "nextTick() callbacklarini Event Loop doirasiga kirmasdan, joriy call stack bo'shashi bilanoq eng birinchi navbatda bajaradi."
    },
    {
      id: 11,
      question: "Node.js muhitida asinxronlikni boshqaruvchi C++ da yozilgan yadro nima deb nomlanadi?",
      options: ["React Dvigateli", "V8 Engine va libuv", "Express JS", "Node Webpack"],
      correctAnswer: 1,
      explanation: "Node.js-ning yadrosi Google V8 JS engine (kodni tezlatish uchun) va libuv (asinxron tarmoq/fayl I/O va oqimlar uchun) dan iborat."
    },
    {
      id: 12,
      question: "EventEmitter-da `once(event, listener)` metodining vazifasi nima?",
      options: [
        "Hodisani o'chirib yuboradi",
        "Hodisa tinglovchisini faqat bir marta ishlashga sozlaydi (birinchi chaqiriqdan keyin u avtomatik o'chadi)",
        "Faqat soniyalarni sanaydi",
        "Hodisani serverga yuboradi"
      ],
      correctAnswer: 1,
      explanation: "`once` metodi hodisa birinchi marta trigger (`emit`) bo'lganda tinglovchini ishga tushiradi va darhol o'chib ketadi, qayta ishlamaydi."
    }
  ]
};
