export const nodeArchitecture = {
  id: "node-architecture",
  title: "Node.js Architecture",
  language: "javascript",
  theory: `## Part 1: Beginner Analogy
Tasavvur qiling, Node.js bu gavjum restorandagi yagona, ammo juda chaqqon ofitsiant (Single Thread). Agar ofitsiant har bir mijozning ovqati pishishini oshxona eshigi oldida kutib tursa (Blocking I/O), boshqa mijozlar och qoladi va janjal ko'tariladi.
Buning o'rniga, bizning ofitsiant buyurtmani olib oshxonaga (Thread Pool) beradi va o'sha zahoti keyingi mijozga xizmat ko'rsatishga o'tadi (Non-blocking I/O). Taom tayyor bo'lgach, oshxona ofitsiantga signal beradi (Callback / Event) va u tayyor taomni egasiga eltib beradi. Shu tariqa atigi 1 ta ofitsiant minglab mijozlarga hech qanday kuttirishlarsiz xizmat ko'rsata oladi!

## Part 2: Deep Dive
Node.js asosan ikkita kuchli dvigatel ustiga qurilgan: **V8 Engine** va **Libuv**.

1. **V8 Engine:** Google tomonidan C++ tilida yozilgan dvigatel. U JavaScript kodimizni kompyuter tushunadigan mashina tiliga (machine code) o'ta tez o'girib beradi.
2. **Libuv:** Node.js'ning asinxron yuragi! Bu C++ kutubxonasi Event Loop va asinxron I/O operatsiyalarini boshqaradi. Uning yashirin qahramonlaridan biri bu **Thread Pool** (sukut bo'yicha 4 ta thread'dan iborat) bo'lib, og'ir vazifalarni (fayl o'qish, kriptografiya) aynan shu hovuz bajaradi.

### Microtask vs Macrotask Queue
Event Loop har bir tsiklda (tick) turli navbatlarni (queues) ma'lum tartibda tekshiradi. Bular orasida eng ko'p chalg'itadiganlari Microtask va Macrotask navbatlaridir:
- **Microtask Queue:** Bunga \`Promise.then()\`, \`process.nextTick()\` kabi amallar kiradi. Microtask'lar doim eng yuqori ustuvorlikka ega va Macrotask'lardan oldin bajariladi!
- **Macrotask Queue:** Bunga \`setTimeout()\`, \`setInterval()\`, \`setImmediate()\` kiradi.

\`\`\`javascript
console.log('1. Sinxron ish');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask (Promise)');
});

console.log('2. Sinxron ish');
\`\`\`
Yuqoridagi kod natijasi ketma-ketligi: 1, 2, 3, 4 bo'ladi. Sababi, sinxron kod tugagach, Event Loop darhol Microtask navbatini tekshiradi va u yerdagi hamma vazifalarni bajarib bo'lgachgina Macrotask'larga o'tadi.

## Part 3: Edge Cases va Senior Interview Questions

- **CPU-Intensive vazifalar:** Node.js asosan I/O vazifalari (fayl, tarmoq) uchun zo'r. Ammo 1 GB lik videoni formatlash yoki murakkab matematik hisob-kitoblarni (CPU-bound) qilsangiz, Event Loop bloklanadi va butun server qotib qoladi! Yechim: **Worker Threads** ishlatish yoki og'ir vazifani alohida mikroxizmatga o'tkazish.
- **Memory Leaks:** Katta hajmli obyektlarni global o'zgaruvchilarda doimiy saqlash Garbage Collector ularni tozalashiga to'sqinlik qiladi. Natijada xotira to'lib (Out of Memory), server "crash" bo'ladi.

### 🎯 Senior Interview Questions
1. **Event Loop nima va u qanday fazalardan iborat?**
   Javob: Libuv taqdim etuvchi mexanizm. U asosan 6 fazadan iborat: Timers, Pending Callbacks, Idle/Prepare, Poll (eng muhimi - I/O shu yerda), Check (\`setImmediate\`), va Close Callbacks.
2. **\`setImmediate\` va \`setTimeout(fn, 0)\` o'rtasidagi farq nima?**
   Javob: Oddiy holatda qaysi biri birinchi ishlashi kafolatlanmagan (sistemaga bog'liq). Ammo ular I/O tsikli (masalan, fayl o'qish callback'i) ichida chaqirilsa, **\`setImmediate\` doim birinchi ishlaydi**, chunki u darhol Check fazasida ushlanadi.
3. **Cluster nima va u qachon kerak?**
   Javob: Node.js faqat bitta CPU yadrosini ishlatadi. Ko'p yadroli serverda to'liq quvvatdan foydalanish uchun Cluster moduli orqali bir nechta Node.js jarayonlarini (workers) yaratish mumkin.

\`\`\`mermaid
graph TD
    A[Incoming Request] --> B{Event Loop}
    B -->|Fast / Sync Ops| C[Return Response]
    B -->|Async I/O / DB / Crypto| D[Libuv Thread Pool]
    D --> E[OS Kernel / File System]
    E --> D
    D -->|Callback placed in Queue| B
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Parse Environment",
      instruction: "`.env` fayl mazmunini obyektga aylantiruvchi `parseEnv(str)` funksiyasini yozing. Masalan: `'PORT=3000\\nHOST=local'` qabul qilsa `{ PORT: '3000', HOST: 'local' }` qaytarsin.",
      startingCode: "function parseEnv(str) {\n  // code\n}",
      hint: "split('\\n') va reduce ishlating.",
      solution: "function parseEnv(str) {\n  return str.split('\\n').reduce((acc, line) => {\n    const [k, v] = line.split('=');\n    if(k && v) acc[k] = v;\n    return acc;\n  }, {});\n}",
      test: "const fn = new Function(code + '; return parseEnv;')();\nif(fn('A=1\\nB=2').B !== '2') throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Parse Route",
      instruction: "`parseRoute(url)` funksiyasini yozing. U URL'ni bo'laklab obyektga aylantirsin: `/users/123` formatini `{ path: 'users', id: '123' }` qilsin. id bo'lmasa null.",
      startingCode: "function parseRoute(url) {\n  // code\n}",
      hint: "split('/') orqali bo'lib chiqing.",
      solution: "function parseRoute(url) {\n  const parts = url.split('/').filter(Boolean);\n  return { path: parts[0] || '', id: parts[1] || null };\n}",
      test: "const fn = new Function(code + '; return parseRoute;')();\nif(fn('/users/123').id !== '123' || fn('/home').id !== null) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Optimal Workers",
      instruction: "`calcWorkers(cpu, load)` yozing. Agar server yuklanishi (load) > 80 bo'lsa `cpu` sonini, aks holda Math.max(1, Math.floor(cpu / 2)) qaytarsin.",
      startingCode: "function calcWorkers(cpu, load) {\n  // code\n}",
      hint: "Shart operatorini ishlating.",
      solution: "function calcWorkers(cpu, load) {\n  return load > 80 ? cpu : Math.max(1, Math.floor(cpu / 2));\n}",
      test: "const fn = new Function(code + '; return calcWorkers;')();\nif(fn(4, 90) !== 4 || fn(4, 50) !== 2) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Format Response",
      instruction: "`formatRes(data, err)` funksiyasi agar error bo'lsa `{ success: false, error: err.message }`, bo'lmasa `{ success: true, data }` qaytarsin.",
      startingCode: "function formatRes(data, err) {\n  // code\n}",
      hint: "Ternary operator mos keladi.",
      solution: "function formatRes(data, err) {\n  return err ? { success: false, error: err.message } : { success: true, data };\n}",
      test: "const fn = new Function(code + '; return formatRes;')();\nif(fn(null, {message:'x'}).success !== false || fn('ok', null).data !== 'ok') throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Rate Limiter",
      instruction: "`rateLimit(ips, currentIp, limit)` ips obyektida joriy ip necha marta ko'rilganini sanaydi. Limitdan oshsa false, oshmasa true qaytarsin (va oshirsin).",
      startingCode: "function rateLimit(ips, currentIp, limit) {\n  // code\n}",
      hint: "Obyekt kalitlariga qiymat yozing.",
      solution: "function rateLimit(ips, currentIp, limit) {\n  ips[currentIp] = (ips[currentIp] || 0) + 1;\n  return ips[currentIp] <= limit;\n}",
      test: "const fn = new Function(code + '; return rateLimit;')();\nconst d = {}; fn(d,'ip',1); if(fn(d,'ip',1) !== false) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Cache Key",
      instruction: "`getCacheKey(req)` req obyekti `{ method: 'GET', url: '/data' }` ko'rinishida beriladi. Uni `'GET:/data'` formatidagi stringga aylantiring.",
      startingCode: "function getCacheKey(req) {\n  // code\n}",
      hint: "Template literal yordam beradi.",
      solution: "function getCacheKey(req) {\n  return `${req.method}:${req.url}`;\n}",
      test: "const fn = new Function(code + '; return getCacheKey;')();\nif(fn({method:'GET', url:'/abc'}) !== 'GET:/abc') throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Check Memory Leak",
      instruction: "`hasLeak(memories)` sonlardan iborat massiv oladi (xotira hajmi). Agar barcha sonlar qat'iy o'sib borsa (hech qachon kamaymasa) va massiv uzunligi >= 3 bo'lsa true.",
      startingCode: "function hasLeak(mem) {\n  // code\n}",
      hint: "for sikli orqali oldingi element bilan solishtiring.",
      solution: "function hasLeak(mem) {\n  if(mem.length < 3) return false;\n  for(let i=1; i<mem.length; i++) if(mem[i] <= mem[i-1]) return false;\n  return true;\n}",
      test: "const fn = new Function(code + '; return hasLeak;')();\nif(fn([1,2,3,4]) !== true || fn([1,3,2,4]) !== false) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Chunk Stream",
      instruction: "`chunkStream(str, size)` kiritilgan matnni Node stream'lariga o'xshab berilgan size (o'lcham) li bo'laklarga ajratib, massiv qaytarsin.",
      startingCode: "function chunkStream(str, size) {\n  // code\n}",
      hint: "slice ishlatish mumkin.",
      solution: "function chunkStream(str, size) {\n  const res = [];\n  for(let i=0; i<str.length; i+=size) res.push(str.slice(i, i+size));\n  return res;\n}",
      test: "const fn = new Function(code + '; return chunkStream;')();\nif(fn('abcd', 2).length !== 2) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Retry Mechanism",
      instruction: "Mikroservislarda qulay bo'lgan `retryFunc(fn, max)` funksiyasini yozing. U `fn` chaqirib, agar xato bo'lsa yana uring, jami `max` marta. Oxirida ham xato bo'lsa throw qilsin.",
      startingCode: "function retryFunc(fn, max) {\n  // code\n}",
      hint: "try/catch va sikl.",
      solution: "function retryFunc(fn, max) {\n  let err;\n  for(let i=0; i<max; i++) { try { return fn(); } catch(e) { err = e; } }\n  throw err;\n}",
      test: "const fn = new Function(code + '; return retryFunc;')();\nlet x=0; fn(() => { x++; if(x<2) throw new Error('e'); return 'ok'; }, 3);\nif(x !== 2) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "CORS Allowed",
      instruction: "`isAllowed(origin, allowedList)` funksiyasi agar `origin` massiv ichida bo'lsa yoki massiv ichida `'*'` bo'lsa true qaytarsin.",
      startingCode: "function isAllowed(origin, allowed) {\n  // code\n}",
      hint: "includes ishlatish qulay.",
      solution: "function isAllowed(origin, allowed) {\n  return allowed.includes('*') || allowed.includes(origin);\n}",
      test: "const fn = new Function(code + '; return isAllowed;')();\nif(fn('a.com', ['b.com', '*']) !== true || fn('a', ['b']) !== false) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Node.js qanday arxitekturaga asoslangan?",
      options: ["Multi-threaded", "Single-threaded Non-blocking I/O", "Blocking sinxron arxitektura", "Faqat frontend arxitektura"],
      correctAnswer: 1,
      explanation: "Node.js asosan bitta thread'da asinxron ravishda ishlaydi, shuning uchun juda ko'p parallel so'rovlarni bloklamasdan bajara oladi."
    },
    {
      id: 2,
      question: "Event Loop vazifasi nima?",
      options: ["Xatolarni ushlash", "Dastur kodini o'chirish", "Barcha asinxron operatsiyalarni va callbacklarni navbat bilan boshqarish", "Faqat API so'rov yuborish"],
      correctAnswer: 2,
      explanation: "Event Loop asinxron amallarni kutib, ular tayyor bo'lganda natijani (callback'ni) asosiy thread'ga taqdim etadi."
    },
    {
      id: 3,
      question: "Microservices arxitekturasining asosiy afzalligi nimada?",
      options: ["Kodni bitta joyda jamlash", "Bitta kattagina ma'lumotlar bazasi", "Mustaqil xizmatlarni alohida ishlab chiqish, test qilish va miqyosini kengaytirish (scale) qulayligi", "Dasturning kichrayishi"],
      correctAnswer: 2,
      explanation: "Microservices yordamida har bir xizmat (masalan, foydalanuvchi qismi) qolganlaridan qat'iy nazar yangilanishi va kengaytirilishi mumkin."
    },
    {
      id: 4,
      question: "Node.js'da Cluster moduli qachon ishlatiladi?",
      options: ["Fayllarni o'qishda", "Barcha CPU yadrolaridan foydalanish maqsadida Node.js process'lar nusxalarini yaratish uchun", "Memory leak'larni tuzatish uchun", "Brauzerga ulash uchun"],
      correctAnswer: 1,
      explanation: "Cluster orqali 8 yadroli serverda 8 ta Node.js instansiyasi yaratilib, serverning to'liq kuchidan foydalanish imkoni tug'iladi."
    },
    {
      id: 5,
      question: "Worker Threads moduli qanday holatda kerak bo'ladi?",
      options: ["Ma'lumotlar bazasi saqlash", "CPU-intensive (og'ir hisob-kitob, rasm ishlash) vazifalarni asosiy thread'ni to'sib qo'ymasligi uchun", "HTML sahifalar tuzish", "So'rovlarni tezlashtirish"],
      correctAnswer: 1,
      explanation: "Asosiy thread bloklanmasligi uchun, og'ir tsikl yoki murakkab algoritmlar Worker Thread ichida bajariladi."
    },
    {
      id: 6,
      question: "Node.js Stream'larining eng muhim xususiyati nima?",
      options: ["Matn rangini o'zgartiradi", "Katta hajmdagi ma'lumotlarni qismlab (chunk) uzatib operativ xotirani tejaydi", "Kod hajmini qisqartiradi", "Tezlikni pasaytiradi"],
      correctAnswer: 1,
      explanation: "Stream'lar 1 GB lik videoni atigi bir necha MB xotira bilan o'qish va yozish imkonini beradi."
    },
    {
      id: 7,
      question: "Express.js da Middleware nima?",
      options: ["Faqat xatolarni tahlil qiluvchi klass", "So'rov (Request) va Javob (Response) o'rtasida ishlaydigan funksiyalar zanjiri", "Ma'lumotlar bazasi texnologiyasi", "Frontend ulash qismi"],
      correctAnswer: 1,
      explanation: "Middleware req obyekti ustida ma'lum amallar bajaradi (masalan, log yozish, ruxsat tekshirish) va next() chaqirib keyingisiga o'tadi."
    },
    {
      id: 8,
      question: "Monolithic (Yaxlit) arxitekturaning eng asosiy kamchiliklaridan biri qaysi?",
      options: ["Umutaman ishlamaydi", "Dastur kattalashgani sari uni o'zgartirish, test qilish va build jarayonining o'ta murakkab va sekinlashishi", "Kichik dasturlar yasab bo'lmaydi", "Pythonni qo'llab quvvatlamaydi"],
      correctAnswer: 1,
      explanation: "Katta monolit ilovada bir qatordagi xatolik ham butun dasturning ishdan chiqishiga olib kelishi mumkin."
    },
    {
      id: 9,
      question: "Message Broker (RabbitMQ, Kafka) mikroservislarda nima maqsadda qo'llaniladi?",
      options: ["Frontend chizish", "Ma'lumotlarni asinxron, ishonchli va navbat (queue) asosida servislar o'rtasida almashish uchun", "Kodni tekshirish", "Tasvirlarni kesish"],
      correctAnswer: 1,
      explanation: "Broker orqali bitta servis o'chib qolgan taqdirda ham unga kelgan xabarlar navbatda saqlanib turadi."
    },
    {
      id: 10,
      question: "PM2 kabi Process Manager'larning production'dagi o'rni qanday?",
      options: ["Dasturni tezkor kompyilyatsiya qilish", "Dastur kutilmaganda xato berib to'xtab qolsa (crash) avtomatik qayta ishga tushirish va loglarni to'plash", "Faqat React uchun kerak", "Baza bilan ishlash"],
      correctAnswer: 1,
      explanation: "PM2 Node.js dasturingiz uzluksiz 24/7 ishlashini ta'minlaydi."
    },
    {
      id: 11,
      question: "Nima sababdan Node.js API'lari 'non-blocking' deb ataladi?",
      options: ["Boshqa so'rovlarni o'ziga jalb qiladi", "I/O (masalan baza yoki fayl) kutilayotganda, thread vaqtni bekor ketkazmasdan boshqa so'rovlarni ishlashda davom etadi", "Sinxron ishlagani uchun", "Asinxron kod yozib bo'lmagani uchun"],
      correctAnswer: 1,
      explanation: "Kutish jarayonida Node.js uxlab qolmaydi, balki keyingi funksiyaga o'tadi."
    },
    {
      id: 12,
      question: "API Gateway mikroservislarda nima vazifani bajaradi?",
      options: ["Fayllarni o'qish", "Barcha tashqi so'rovlarni o'zida qabul qilib, kerakli xizmatlarga yo'naltiruvchi, markazlashgan boshqaruv nuqtasi (kirish eshigi)", "Baza zaxirasi", "CSS'larni birlashtirish"],
      correctAnswer: 1,
      explanation: "API Gateway orqali token tekshirish va rate limit kabi vazifalarni hamma mikroservislarda qayta takrorlamasdan hal qilish mumkin."
    }
  ]
};
