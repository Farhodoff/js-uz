export const eventLoopNode = {
  id: "eventLoopNode",
  title: "Node.js Event Loop",
  theory: `
# Node.js Event Loop: Asinxron Yuraq 🫀

### 1-Qism: Boshlang'ich Analoziya (Restoran misolida) 🍔

Node.js ni faqat bir nafar xodim (ofitsiant) ishlaydigan juda mashhur restoran deb tasavvur qiling. Bu xodim (asosiy oqim, ya'ni Single Thread) mijozlardan buyurtma qabul qiladi.
Agar xodim ovqat tayyor bo'lishini kutar ekan (Blocking - bloklash), boshqa mijozlarga xizmat ko'rsata olmaydi. Lekin Node.js restorani juda aqlli! 
Xodim buyurtmani oladi va uni oshxonadagi oshpazlarga (Worker Pool - orqa fon ishchilari) topshiradi. Keyin darhol boshqa mijozlarga xizmat ko'rsatishda davom etadi.
Oshpazlar ovqatni tayyorlagach, qo'ng'iroq chalinadi (Event Queue - navbatga qo'shiladi) va xodim bo'shashi bilan bu ovqatni tayyor holatda mijozga eltib beradi (Event Loop - Hodisalar halqasi).

Shu orqali bitta xodim (Single Thread) minglab mijozlarga hech qanday uzilishsiz (Non-blocking I/O) xizmat ko'rsata oladi!

---

### 2-Qism: Chuqur Sho'ng'ish (Under the hood, V8, Libuv, Memory) 🔬

Node.js ning asosi 2 ta asosiy qismdan iborat:
1. **V8 Engine**: Google Chrome'ning JS dvigateli. U JavaScript kodini mashina kodiga o'giradi va xotira (Heap) hamda Call Stack (Chaqiruvlar steki) ni boshqaradi.
2. **Libuv**: C tilida yozilgan kutubxona. U asinxron I/O (fayl o'qish, tarmoqqa ulanish) ishlari va **Event Loop** mexanizmini ta'minlaydi. Shuningdek, u OS (operatsion tizim) bilan gaplashib, og'ir jarayonlar uchun C++ Thread Pool ni ajratadi.

**Event Loop Bosqichlari (Phases):**
Event Loop muntazam aylanib turuvchi halqa bo'lib, har bir aylanishi (tick) quyidagi bosqichlardan iborat:
1. **Timers**: \\\`setTimeout\\\` va \\\`setInterval\\\` callback'larini bajaradi.
2. **Pending Callbacks**: OS darajasidagi xatolarni (masalan, TCP xatolari) qayta ishlaydi.
3. **Idle, Prepare**: Node.js ichki ishlari uchun.
4. **Poll**: Yangi kiritish-chiqarish (I/O) hodisalarini ushlaydi va ularning callback'larini (fayl o'qish, server so'rovlari) bajaradi.
5. **Check**: \\\`setImmediate\\\` callback'lari shu yerda ishlaydi.
6. **Close Callbacks**: Yopish bilan bog'liq callback'lar (\\\`socket.on('close', ...)\\\`).

**Microtasks va Macrotasks:**
Event Loop'dan tashqari ikkita alohida navbat (queue) ham mavjud, bular har bir bosqich oralig'ida tekshiriladi:
- **Microtask Queue**: \\\`Promise.then()\\\` va \\\`process.nextTick()\\\`.
- **Macrotask Queue**: Yuqorida sanalgan Timers va I/O.
**Oltin qoida:** Microtask'lar doimo Macrotask'lardan oldin va ustuvor ravishda bajariladi! Ayniqsa, \\\`process.nextTick()\\\` boshqa barcha microtask'lardan ham birinchi ishlaydi.

\\\`\\\`\\\`mermaid
graph TD
    A[Call Stack] --> B{Sinxron yoki Asinxron?}
    B -- Sinxron --> A
    B -- Asinxron --> C[Node APIs / Libuv]
    C --> D(Oshxona: Thread Pool, OS)
    D --> E[Event Queue]
    E --> F{Event Loop}
    F --> |Bosh bolsa| A
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#bfb,stroke:#333,stroke-width:2px
\\\`\\\`\\\`

---

### 3-Qism: Edge Cases va Senior Interview Savollari 🏆

**Edge Case 1: \\\`setTimeout\\\` va \\\`setImmediate\\\` musobaqasi**
Agar biz bo'sh faylda (I/O siklidan tashqarida) bir xil vaqtda \\\`setTimeout\\\` va \\\`setImmediate\\\` ni ishlatsak, qaysi biri birinchi ishlashi kafolatlanmagan (OS qanchalik bandligiga bog'liq). Lekin ular biror fayl o'qish operatsiyasi (\\\`fs.readFile\\\`) ichida (ya'ni Poll phase'dan so'ng) chaqirilsa, **DOIMO** \\\`setImmediate\\\` birinchi ishlaydi. Chunki Poll'dan keyingi navbat Check phase (\\\`setImmediate\\\`) hisoblanadi.

**Edge Case 2: Event Loop ni bloklash**
Node.js Asinxron bo'lsa-da, katta matematik hisob-kitoblar qilsangiz (masalan, cheksiz sikl - \\\`while(true)\\\`), Call Stack to'lib qoladi va Event Loop to'xtab qoladi. Natijada boshqa so'rovlar qabul qilinmaydi. Buning uchun yechim: **Worker Threads** ishlatish.

**Senior Intervyu Savollari:**

1. **Savol: \\\`process.nextTick()\\\` va \\\`Promise\\\` o'rtasidagi farq nima? Ikkisi ham Microtask emasmi?**
   **Javob:** Ha, ikkisi ham Microtask, ammo \\\`process.nextTick()\\\` ning navbati (nextTick queue) Promise navbatidan oldin tekshiriladi. Shuning uchun \\\`process.nextTick()\\\` doim birinchi bajariladi.

2. **Savol: Nega fayllarni o'qish (fs.readFile) ba'zan setTimeout(..., 0) dan tezroq, ba'zan sekinroq bo'lishi mumkin?**
   **Javob:** Fayl o'qish bu I/O operatsiyasi bo'lib, unga Libuv'dagi Thread Pool jalb qilinadi. Kichik fayl tezda o'qilib Poll navbatiga tushishi mumkin. \\\`setTimeout(..., 0)\\\` esa amalda \\\`1ms\\\` da bajariladi va u Timers fazasida ishlaydi. Vaqt nisbatiga qarab bu natijalar o'zgarishi mumkin.

3. **Savol: Event Loop asosan qaysi tilda yozilgan va uni qanday texnologiya ta'minlaydi?**
   **Javob:** JS kodi faqat V8 Engine (C++ da yozilgan) ichida bajariladi. Lekin Event Loop'ning ishlashi va OS bilan asinxron operatsiyalarni boshqarish to'liq C tilida yozilgan **Libuv** kutubxonasiga bog'liq.
`,
  exercises: [
    {
      "id": 1,
      "title": "Sinxron va Asinxron",
      "instruction": "Birinchi 'Birinchi' so'zini konsolga chiqaring, keyin setTimeout yordamida 'Ikkinchi' so'zini chiqaring.",
      "startingCode": "// Kodingizni yozing\n",
      "hint": "console.log va setTimeout ishlating",
      "test": "const logs = []; const orig = console.log; console.log = (val) => logs.push(val); try { eval(code); } catch(e) {} console.log = orig; return code.includes('setTimeout') && code.includes('Birinchi') && code.includes('Ikkinchi');"
    },
    {
      "id": 2,
      "title": "Promise va setTimeout",
      "instruction": "Kodingizda oldin Promise.resolve().then() orqali 'Promise' so'zini chiqaring, va undan keyin setTimeout orqali 'Timeout' so'zini chiqaring. Ular qaysi tartibda ishlashiga e'tibor bering.",
      "startingCode": "// Kodingizni yozing\n",
      "hint": "Promise.resolve().then(() => console.log('Promise')); setTimeout(() => console.log('Timeout'), 0);",
      "test": "return code.includes('Promise.resolve().then') && code.includes('setTimeout');"
    },
    {
      "id": 3,
      "title": "process.nextTick",
      "instruction": "`process.nextTick()` dan foydalanib 'NextTick' so'zini ekranga chiqaring.",
      "startingCode": "// process.nextTick yozing\n",
      "hint": "process.nextTick(() => console.log('NextTick'));",
      "test": "return code.includes('process.nextTick') && code.includes('NextTick');"
    },
    {
      "id": 4,
      "title": "Microtasklar musobaqasi",
      "instruction": "process.nextTick() va Promise.resolve().then() ni ketma-ket yozing. process.nextTick doim birinchi bajarilishini eslang.",
      "startingCode": "Promise.resolve().then(() => console.log('Promise'));\n// nextTick ni qo'shing\n",
      "hint": "process.nextTick(() => console.log('NextTick'));",
      "test": "return code.includes('process.nextTick') && code.includes('Promise.resolve');"
    },
    {
      "id": 5,
      "title": "setImmediate qanday ishlaydi?",
      "instruction": "`setImmediate` funksiyasidan foydalanib konsolga 'Immediate' deb chiqaring.",
      "startingCode": "// setImmediate dan foydalaning\n",
      "hint": "setImmediate(() => console.log('Immediate'));",
      "test": "return code.includes('setImmediate') && code.includes('Immediate');"
    },
    {
      "id": 6,
      "title": "Sinxron loop blokirovkasi",
      "instruction": "Event Loop ni bloklash uchun `for` tsiklida 1 dan 10 gacha bo'lgan sonlarni konsolga chiqaring (kichik blokirovka misoli).",
      "startingCode": "// for tsikl yozing\n",
      "hint": "for(let i = 1; i <= 10; i++) console.log(i);",
      "test": "return code.includes('for') && code.includes('console.log');"
    },
    {
      "id": 7,
      "title": "Timer qanday fazada ishlaydi?",
      "instruction": "500 millisoniyadan keyin 'Taymer tugadi' deb chiqaruvchi setTimeout yozing.",
      "startingCode": "// setTimeout yozing\n",
      "hint": "setTimeout(() => console.log('Taymer tugadi'), 500);",
      "test": "return code.includes('setTimeout') && code.includes('500');"
    },
    {
      "id": 8,
      "title": "Ketma-ketlik mantig'i",
      "instruction": "Bitta faylda console.log('1'), setTimeout, va Promise ishlating. Ular asinxronligiga e'tibor bering.",
      "startingCode": "console.log('1');\n// qolganlarini yozing\n",
      "hint": "Qisqa qilib console.log, setTimeout, Promise ishlating",
      "test": "return code.includes('setTimeout') && code.includes('Promise');"
    },
    {
      "id": 9,
      "title": "Macrotask",
      "instruction": "Qaysi biri Macrotask (Timers/I-O) qatorida ekanini bilib, `setInterval` orqali 'Interval' chiqaring va srazu uni o'chiring.",
      "startingCode": "// setInterval yozing\n",
      "hint": "const t = setInterval(() => console.log('Interval'), 100); clearInterval(t);",
      "test": "return code.includes('setInterval') && code.includes('clearInterval');"
    },
    {
      "id": 10,
      "title": "Hammasi bir joyda",
      "instruction": "console.log('Start'), process.nextTick(), Promise.resolve(), setTimeout(), va console.log('End') dan foydalanib tartibni tekshiradigan kod yozing.",
      "startingCode": "// Kompleks kod\n",
      "hint": "Hammasini ishlating",
      "test": "return code.includes('nextTick') && code.includes('Promise') && code.includes('setTimeout');"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "Node.js da Event Loop mexanizmi nima uchun kerak?",
      "options": [
        "Fayllarni tezroq siqish uchun",
        "Non-blocking asinxron amallarni (I/O) bajarish va Callback'larni boshqarish uchun",
        "Brauzer oynasini ochish uchun",
        "Faqat ma'lumotlar bazasini himoyalash uchun"
      ],
      "correctAnswer": 1,
      "explanation": "Event Loop orqali Node.js single-threaded bo'lishiga qaramay bir vaqtda ko'plab I/O asinxron so'rovlarni bajara oladi."
    },
    {
      "id": 2,
      "question": "Event Loop va asinxron I/O ni Node.js da qaysi kutubxona ta'minlaydi?",
      "options": [
        "V8 Engine",
        "Libuv",
        "Express",
        "Mongoose"
      ],
      "correctAnswer": 1,
      "explanation": "Libuv Node.js dagi Event Loop va Thread Pool ni boshqaruvchi C tilida yozilgan kutubxonadir."
    },
    {
      "id": 3,
      "question": "V8 dvigatelining vazifasi nima?",
      "options": [
        "C++ da yozilgan kodlarni tushunish",
        "Fayllarni o'qish",
        "JavaScript kodini mashina kodiga o'girish va Call Stack ni boshqarish",
        "Event Loop ni aylantirish"
      ],
      "correctAnswer": 2,
      "explanation": "V8 JS ni mashina kodiga o'girib beradi, asinxron I/O ni esa Libuv qiladi."
    },
    {
      "id": 4,
      "question": "Event Loop'ning birinchi fazasi (bosqichi) qaysi?",
      "options": [
        "Poll",
        "Check",
        "Timers",
        "Pending Callbacks"
      ],
      "correctAnswer": 2,
      "explanation": "Event Loop Timers fazasidan (setTimeout, setInterval) boshlanadi."
    },
    {
      "id": 5,
      "question": "Qaysi faza (phase) da I/O callback'lari (masalan fayl o'qilganligi haqida) ishlaydi?",
      "options": [
        "Timers",
        "Poll",
        "Check",
        "Close Callbacks"
      ],
      "correctAnswer": 1,
      "explanation": "Poll bosqichida yangi I/O hodisalari kutiladi va ularning callback'lari bajariladi."
    },
    {
      "id": 6,
      "question": "`setImmediate` funksiyasi Event Loop'ning qaysi fazasida ishlaydi?",
      "options": [
        "Timers",
        "Poll",
        "Check",
        "Idle"
      ],
      "correctAnswer": 2,
      "explanation": "setImmediate uchun maxsus Check fazasi mavjud bo'lib, u Poll dan keyin ishlaydi."
    },
    {
      "id": 7,
      "question": "Microtask va Macrotask o'rtasidagi asosiy farq nima?",
      "options": [
        "Macrotasklar doim birinchi ishlaydi",
        "Microtasklar (Promise, nextTick) ustuvorroq bo'lib, har bir fazadan oldin tozalanadi",
        "Ular bir xil, farqi yo'q",
        "Microtasklar faqat brauzerda ishlaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Microtask'lar Macrotask'larga nisbatan yuqoriroq prioritetga ega."
    },
    {
      "id": 8,
      "question": "`process.nextTick()` va `Promise.then()` bir vaqtda chaqirilsa qaysi biri birinchi bajariladi?",
      "options": [
        "Promise.then()",
        "process.nextTick()",
        "Tasodifiy",
        "Ikkisi birga"
      ],
      "correctAnswer": 1,
      "explanation": "`process.nextTick()` ning navbati eng ustuvor va u hamma microtasklardan oldin tekshiriladi."
    },
    {
      "id": 9,
      "question": "Agar biz cheksiz `while(true)` tsiklini yozsak nima bo'ladi?",
      "options": [
        "Event Loop uni fonga (orqaga) tashlaydi",
        "Call Stack to'lib, Event Loop bloklanadi (qotib qoladi)",
        "Node.js o'z-o'zidan to'g'irlab yuboradi",
        "Microtask navbatiga o'tadi"
      ],
      "correctAnswer": 1,
      "explanation": "Sinxron tsikllar (masalan, og'ir matematika) Call Stack ni band qilib, Event Loop ni to'xtatib qo'yadi."
    },
    {
      "id": 10,
      "question": "Fayl ichida faqat `setTimeout` va `setImmediate` ni bir vaqtda ishlatsak nima bo'ladi?",
      "options": [
        "Doim setTimeout birinchi ishlaydi",
        "Doim setImmediate birinchi ishlaydi",
        "Tartibi kafolatlanmagan (OS holatiga bog'liq)",
        "Xato (Error) beradi"
      ],
      "correctAnswer": 2,
      "explanation": "Asosiy modulda, I/O tsiklidan tashqarida ularning ishlash ketma-ketligi OS unumdorligiga ko'ra o'zgarishi mumkin."
    },
    {
      "id": 11,
      "question": "Fayl o'qish (fs.readFile) jarayonida OS darajasida Thread Pool (orqa fon ishchilari) dan nechta thread ishlatiladi (standart holda)?",
      "options": [
        "0 (Faqat Event Loop)",
        "2",
        "4",
        "10"
      ],
      "correctAnswer": 2,
      "explanation": "Libuv standart holatda 4 ta Thread Pool taqdim etadi (uni UV_THREADPOOL_SIZE orqali o'zgartirish mumkin)."
    },
    {
      "id": 12,
      "question": "Worker Threads (Node.js dagi ishchi oqimlar) nima maqsadda ishlatiladi?",
      "options": [
        "Event Loop'ni to'xtatish uchun",
        "Og'ir CPU-intensive (sinxron va murakkab hisob-kitoblar) vazifalarni bajarib, asosiy Event Loop ni bloklamaslik uchun",
        "Faqat xotirani tozalash uchun",
        "Brauzer oynasini ochish uchun"
      ],
      "correctAnswer": 1,
      "explanation": "CPU uchun og'ir bo'lgan ishlarni Event Loop dan tashqarida bajarish uchun Worker Threads ishlatiladi."
    }
  ]
};
