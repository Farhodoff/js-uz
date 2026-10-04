export const middlewareBasics = {
  id: "middleware-basics",
  title: "Middleware Basics",
  theory: `
## 1-Qism: Sodda Tushuntirish

Tasavvur qiling, siz restoranga kirdingiz. Siz mijoz (Client) sifatida ofitsiantga (Server) buyurtma berasiz (Request). Lekin ofitsiant to'g'ridan-to'g'ri oshpazga (Route Handler) borishdan oldin, u bir nechta "tekshiruvchilar" yoki "yordamchilar"dan o'tishi kerak:

1. **Eshik og'asi (Security Middleware):** Sizning kiyinishingiz va yoshingizni tekshiradi (Masalan, autentifikatsiya va avtorizatsiya).
2. **Gigiyena tekshiruvchisi (Body Parser Middleware):** Qo'llaringizni yuvganingizni yoki yo'qligini tekshiradi (Masalan, kelayotgan JSON ma'lumotlarini o'qiladigan holatga keltirish).
3. **Menejer (Logging Middleware):** Restoranga qachon kelganingizni va nima buyurtma qilayotganingizni daftariga yozib qo'yadi (Log yozish).

Bu yordamchilar **Middleware** deb ataladi. Ular Request (so'rov) kelganda va Response (javob) qaytarilayotganda ishlaydigan oraliq dasturlardir. Ular so'rovni tekshiradi, o'zgartiradi yoki xatolarni ushlab qoladi.

---

## 2-Qism: Chuqur Tahlil (Ichki ishlash, xotira, V8 dvigateli, Libuv, unumdorlik)

Middleware bu Express.js yoki shunga o'xshash Node.js freymvorklarida request (req) va response (res) obyektlari, hamda \\\`next\\\` deb nomlanuvchi funksiyani qabul qiluvchi oddiy funksiyadir.

### Qanday ishlaydi?
Middleware funksiyalari navbatma-navbat zanjir (chain) shaklida ishlaydi. Biri o'z ishini tugatgach, \\\`next()\\\` funksiyasini chaqirish orqali boshqaruvni keyingisiga o'tkazadi. Agar \\\`next()\\\` chaqirilmasa, so'rov havoda osilib qoladi (timeout bo'ladi).

### Memory va Performance
Middleware larni haddan tashqari ko'p ishlatish performance'ga ta'sir qilishi mumkin. Chunki har bir middleware Call Stack'da yangi frame yaratadi va memory sarflaydi. Node.js V8 Engine'i orqali JavaScript ni bitta thread'da (Single Thread) bajaradi. Og'ir sinxron amallar (masalan, katta array'larni sikl qilish) middleware ichida qilinganda, Event Loop band bo'lib qoladi va boshqa foydalanuvchilarning so'rovlari kuttirib qo'yiladi (Event Loop Blocking).
Sinxron og'ir vazifalar o'rniga, Libuv orqali ishlaydigan asinxron (I/O) vazifalardan foydalanish (masalan, fayl o'qish, ma'lumotlar bazasi so'rovlari) tavsiya etiladi.

### Turlari:
1. **Application-level middleware:** Butun ilova uchun ishlaydi (\\\`app.use()\\\`).
2. **Router-level middleware:** Faqat ma'lum bir router uchun ishlaydi (\\\`router.use()\\\`).
3. **Error-handling middleware:** Xatolarni ushlash uchun maxsus struktura: \\\`(err, req, res, next)\\\`.
4. **Built-in middleware:** Express o'zida keluvchi (\\\`express.json()\\\`, \\\`express.static()\\\`).
5. **Third-party middleware:** Tashqi kutubxonalar (\\\`cors\\\`, \\\`helmet\\\`, \\\`morgan\\\`).

---

## 3-Qism: Chekka holatlar va Senior Intervyu Savollari

1. **Agar middleware ichida \\\`next()\\\` chaqirilmasa nima bo'ladi?**
   Javob: So'rov "osilib" qoladi. Mijoz javob ololmaydi va oxir-oqibat timeout xatosi yuz beradi. (Yoki \\\`res.send()\\\` qilib javobni shu joyda tugatish kerak).

2. **Error handling middleware'ni oddiy middleware'dan qanday farqi bor?**
   Javob: Oddiy middleware 3 ta parametr qabul qiladi: \\\`(req, res, next)\\\`. Error handling middleware esa 4 ta parametr qabul qiladi: \\\`(err, req, res, next)\\\`. Agar \\\`next(err)\\\` qilib xato uzatilsa, Express barcha oddiy middleware'larni sakrab o'tib, to'g'ridan-to'g'ri Error handling middleware'ga boradi.

3. **Multiple middlewares qanday zanjirlanadi?**
   Javob: Route ta'rifida bir nechta middleware'larni vergul bilan ajratib yozish mumkin:
   \\\`\\\`\\\`javascript
   app.get('/admin', verifyToken, checkAdminRole, (req, res) => {
       res.send('Admin Panel');
   });
   \\\`\\\`\\\`

4. **Middleware Event Loop'ni qanday qilib to'sib qo'yishi mumkin?**
   Javob: Agar middleware ichida kriptografik xeshlash (\\\`bcrypt.hashSync\\\`) yoki katta massivlarni sinxron filtrlash kabi og'ir CPU operatsiyalari bajarilsa, u holda Node.js ning bitta zanjiri band bo'lib, Libuv boshqa asinxron I/O operatsiyalarini qabul qila olmay qoladi.

---

## Diagram

\\\`\\\`\\\`mermaid
graph TD
    A[Client Request] --> B{Logger Middleware}
    B -->|next| C{Auth Middleware}
    C -->|next| D{Body Parser}
    C -->|Error| E[Error Handler]
    D --> F[Route Handler]
    F --> G[Client Response]
    E --> G
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: "1",
      title: "Logger Middleware yaratish",
      description: "So'rov usuli (method) va URL'ni konsolga chiqaruvchi, so'ngra keyingi middleware'ga o'tuvchi logger middleware funksiyasini yozing.",
      starterCode: "const logger = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default logger;",
      solution: "const logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();\n};\nexport default logger;",
      test: "const fn = (typeof logger === 'function') ? logger : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof logger !== \"undefined\" ? logger : null;')());\nif (typeof fn !== 'function') return \"logger funksiyasi aniqlanmagan\";\nlet logged = null;\nconst origLog = console.log;\nconsole.log = (...args) => { logged = args.join(' '); };\nlet nextCalled = false;\ntry {\n  fn({ method: 'GET', url: '/home' }, {}, () => { nextCalled = true; });\n} finally {\n  console.log = origLog;\n}\nif (logged !== 'GET /home') return \"Konsolga to'g'ri 'GET /home' chiqarilmadi\";\nif (!nextCalled) return \"next() chaqirilmadi\";\nreturn null;"
    },
    {
      id: "2",
      title: "Authentication Middleware",
      description: "Agar req.headers.authorization mavjud bo'lsa, keyingi bosqichga o'tadigan, aks holda res.status(401).send('Unauthorized') qaytaradigan middleware yozing.",
      starterCode: "const auth = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default auth;",
      solution: "const auth = (req, res, next) => {\n  if (req.headers && req.headers.authorization) {\n    next();\n  } else {\n    res.status(401).send('Unauthorized');\n  }\n};\nexport default auth;",
      test: "const fn = (typeof auth === 'function') ? auth : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof auth !== \"undefined\" ? auth : null;')());\nif (typeof fn !== 'function') return \"auth funksiyasi aniqlanmagan\";\nlet statusCalled = 0;\nlet sendCalled = '';\nconst res = { status: (code) => { statusCalled = code; return { send: (msg) => { sendCalled = msg; } }; } };\nlet nextCalled = false;\nfn({ headers: {} }, res, () => { nextCalled = true; });\nif (statusCalled !== 401 || sendCalled !== 'Unauthorized' || nextCalled) return \"Authorization bo'lmaganda 401 Unauthorized qaytarilishi kerak\";\nnextCalled = false;\nfn({ headers: { authorization: 'token' } }, res, () => { nextCalled = true; });\nif (!nextCalled) return \"Authorization mavjud bo'lganda next() chaqirilishi kerak\";\nreturn null;"
    },
    {
      id: "3",
      title: "Error Handling Middleware",
      description: "Xatolik ro'y berganda, 500 status kodi bilan 'Internal Server Error' matnini qaytaradigan error handling middleware funksiyasini yozing.",
      starterCode: "const errorHandler = (err, req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default errorHandler;",
      solution: "const errorHandler = (err, req, res, next) => {\n  res.status(500).send('Internal Server Error');\n};\nexport default errorHandler;",
      test: "const fn = (typeof errorHandler === 'function') ? errorHandler : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof errorHandler !== \"undefined\" ? errorHandler : null;')());\nif (typeof fn !== 'function') return \"errorHandler funksiyasi aniqlanmagan\";\nlet status = 0;\nlet message = '';\nconst res = { status: (s) => { status = s; return { send: (m) => { message = m; } }; } };\nfn(new Error(), {}, res, () => {});\nif (status !== 500 || message !== 'Internal Server Error') return \"Xatolik ro'y berganda 500 'Internal Server Error' qaytishi kerak\";\nreturn null;"
    },
    {
      id: "4",
      title: "Vaqtni belgilovchi Middleware",
      description: "Har bir so'rovga req.requestTime nomli xususiyat qo'shadigan va qiymati joriy vaqt (Date.now()) bo'ladigan middleware yozing.",
      starterCode: "const addTime = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default addTime;",
      solution: "const addTime = (req, res, next) => {\n  req.requestTime = Date.now();\n  next();\n};\nexport default addTime;",
      test: "const fn = (typeof addTime === 'function') ? addTime : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof addTime !== \"undefined\" ? addTime : null;')());\nif (typeof fn !== 'function') return \"addTime funksiyasi aniqlanmagan\";\nconst req = {};\nlet nextCalled = false;\nfn(req, {}, () => { nextCalled = true; });\nif (typeof req.requestTime !== 'number' || !nextCalled) return \"req.requestTime raqam bo'lishi va next() chaqirilishi kerak\";\nreturn null;"
    },
    {
      id: "5",
      title: "Admin Tekshiruvi",
      description: "Agar req.user.role 'admin' bo'lmasa, 403 status bilan 'Forbidden' qaytaradigan, aks holda keyingisiga o'tkazadigan middleware yozing. (req.user mavjud deb faraz qiling).",
      starterCode: "const checkAdmin = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default checkAdmin;",
      solution: "const checkAdmin = (req, res, next) => {\n  if (req.user && req.user.role === 'admin') {\n    next();\n  } else {\n    res.status(403).send('Forbidden');\n  }\n};\nexport default checkAdmin;",
      test: "const fn = (typeof checkAdmin === 'function') ? checkAdmin : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof checkAdmin !== \"undefined\" ? checkAdmin : null;')());\nif (typeof fn !== 'function') return \"checkAdmin funksiyasi aniqlanmagan\";\nlet status = 0;\nlet sendCalled = '';\nconst res = { status: (s) => { status = s; return { send: (m) => { sendCalled = m; } }; } };\nlet nextCalled = false;\nfn({ user: { role: 'user' } }, res, () => { nextCalled = true; });\nif (status !== 403 || sendCalled !== 'Forbidden' || nextCalled) return \"Admin bo'lmaganda 403 Forbidden qaytishi kerak\";\nnextCalled = false;\nfn({ user: { role: 'admin' } }, res, () => { nextCalled = true; });\nif (!nextCalled) return \"Admin bo'lganda next() chaqirilishi kerak\";\nreturn null;"
    },
    {
      id: "6",
      title: "API Key Checker",
      description: "So'rov sarlavhasida (headers) 'x-api-key' ni tekshiruvchi middleware yarating. Agar apiKey 'secret123' ga teng bo'lsa next() chaqirilsin, yo'qsa 401 'Invalid API Key' qaytarsin.",
      starterCode: "const apiKeyCheck = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default apiKeyCheck;",
      solution: "const apiKeyCheck = (req, res, next) => {\n  if (req.headers['x-api-key'] === 'secret123') {\n    next();\n  } else {\n    res.status(401).send('Invalid API Key');\n  }\n};\nexport default apiKeyCheck;",
      test: "const fn = (typeof apiKeyCheck === 'function') ? apiKeyCheck : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof apiKeyCheck !== \"undefined\" ? apiKeyCheck : null;')());\nif (typeof fn !== 'function') return \"apiKeyCheck funksiyasi aniqlanmagan\";\nlet status = 0;\nlet msg = '';\nconst res = { status: (s) => { status = s; return { send: (m) => { msg = m; } }; } };\nlet nextCalled = false;\nfn({ headers: { 'x-api-key': 'wrong' } }, res, () => { nextCalled = true; });\nif (status !== 401 || msg !== 'Invalid API Key' || nextCalled) return \"Noto'g'ri api key uchun 401 'Invalid API Key' qaytishi kerak\";\nnextCalled = false;\nfn({ headers: { 'x-api-key': 'secret123' } }, res, () => { nextCalled = true; });\nif (!nextCalled) return \"To'g'ri api key bilan next() chaqirilishi kerak\";\nreturn null;"
    },
    {
      id: "7",
      title: "Method Blocker",
      description: "Agar so'rov methodi 'DELETE' bo'lsa, 405 status bilan 'Method Not Allowed' qaytaradigan middleware yozing. Boshqa metodlar uchun o'tkazib yuboring.",
      starterCode: "const blockDelete = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default blockDelete;",
      solution: "const blockDelete = (req, res, next) => {\n  if (req.method === 'DELETE') {\n    res.status(405).send('Method Not Allowed');\n  } else {\n    next();\n  }\n};\nexport default blockDelete;",
      test: "const fn = (typeof blockDelete === 'function') ? blockDelete : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof blockDelete !== \"undefined\" ? blockDelete : null;')());\nif (typeof fn !== 'function') return \"blockDelete funksiyasi aniqlanmagan\";\nlet status = 0;\nlet msg = '';\nconst res = { status: (s) => { status = s; return { send: (m) => { msg = m; } }; } };\nlet nextCalled = false;\nfn({ method: 'DELETE' }, res, () => { nextCalled = true; });\nif (status !== 405 || msg !== 'Method Not Allowed' || nextCalled) return \"DELETE methodi uchun 405 'Method Not Allowed' qaytishi kerak\";\nnextCalled = false;\nfn({ method: 'GET' }, res, () => { nextCalled = true; });\nif (!nextCalled) return \"Boshqa methodlar uchun next() chaqirilishi kerak\";\nreturn null;"
    },
    {
      id: "8",
      title: "Body Checker",
      description: "POST so'rovlarida req.body mavjud bo'lmasa, yoki bo'sh obyekt bo'lsa 400 status kodi va 'Bad Request' xatosini qaytaruvchi middleware.",
      starterCode: "const bodyCheck = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default bodyCheck;",
      solution: "const bodyCheck = (req, res, next) => {\n  if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {\n    res.status(400).send('Bad Request');\n  } else {\n    next();\n  }\n};\nexport default bodyCheck;",
      test: "const fn = (typeof bodyCheck === 'function') ? bodyCheck : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof bodyCheck !== \"undefined\" ? bodyCheck : null;')());\nif (typeof fn !== 'function') return \"bodyCheck funksiyasi aniqlanmagan\";\nlet status = 0;\nlet msg = '';\nconst res = { status: (s) => { status = s; return { send: (m) => { msg = m; } }; } };\nlet nextCalled = false;\nfn({ method: 'POST', body: {} }, res, () => { nextCalled = true; });\nif (status !== 400 || msg !== 'Bad Request' || nextCalled) return \"Bo'sh body uchun 400 'Bad Request' qaytishi kerak\";\nnextCalled = false;\nfn({ method: 'POST', body: { name: 'Ali' } }, res, () => { nextCalled = true; });\nif (!nextCalled) return \"To'liq body bo'lganda next() chaqirilishi kerak\";\nreturn null;"
    },
    {
      id: "9",
      title: "IP Logger",
      description: "So'rov kelganda foydalanuvchi IP manzilini req.ip orqali olib konsolga chiqaring va keyingi middleware'ga o'tkazing.",
      starterCode: "const ipLogger = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default ipLogger;",
      solution: "const ipLogger = (req, res, next) => {\n  console.log(req.ip);\n  next();\n};\nexport default ipLogger;",
      test: "const fn = (typeof ipLogger === 'function') ? ipLogger : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof ipLogger !== \"undefined\" ? ipLogger : null;')());\nif (typeof fn !== 'function') return \"ipLogger funksiyasi aniqlanmagan\";\nlet logged = null;\nconst origLog = console.log;\nconsole.log = (...args) => { logged = args.join(' '); };\nlet nextCalled = false;\ntry {\n  fn({ ip: '127.0.0.1' }, {}, () => { nextCalled = true; });\n} finally {\n  console.log = origLog;\n}\nif (logged !== '127.0.0.1') return \"req.ip konsolga chiqarilmadi\";\nif (!nextCalled) return \"next() chaqirilmadi\";\nreturn null;"
    },
    {
      id: "10",
      title: "Query to Lowercase",
      description: "Agar so'rovda req.query.search mavjud bo'lsa, uni kichik harflarga o'tkazib (lowercase) qo'yadigan middleware yozing.",
      starterCode: "const searchLower = (req, res, next) => {\n  // kodingizni shu yerga yozing\n};\nexport default searchLower;",
      solution: "const searchLower = (req, res, next) => {\n  if (req.query && req.query.search) {\n    req.query.search = req.query.search.toLowerCase();\n  }\n  next();\n};\nexport default searchLower;",
      test: "const fn = (typeof searchLower === 'function') ? searchLower : (new Function(code.replace(/export\\s+default\\s+\\w+;?/, '') + '; return typeof searchLower !== \"undefined\" ? searchLower : null;')());\nif (typeof fn !== 'function') return \"searchLower funksiyasi aniqlanmagan\";\nconst req = { query: { search: 'NODEJS' } };\nlet nextCalled = false;\nfn(req, {}, () => { nextCalled = true; });\nif (req.query.search !== 'nodejs' || !nextCalled) return \"req.query.search kichik harflarga o'tkazilmadi yoki next() chaqirilmadi\";\nreturn null;"
    }
  ],
  quizzes: [
    {
      id: "1",
      question: "Middleware nima?",
      options: [
        "Request va Response o'rtasida ishlaydigan funksiya",
        "Ma'lumotlar bazasi",
        "Frontend freymvorki",
        "Faqat xatolarni ushlovchi dastur"
      ],
      correctAnswerIndex: 0,
      explanation: "Middleware bu Express.js kabi freymvorklarda so'rov kelganidan to javob qaytarilguncha bo'lgan jarayonda ishlovchi funksiyalardir."
    },
    {
      id: "2",
      question: "Middleware'da next() funksiyasi chaqirilmasa nima bo'ladi?",
      options: [
        "So'rov muvaffaqiyatli yakunlanadi",
        "So'rov qotib qoladi (timeout yuz beradi)",
        "Avtomatik 500 xato qaytariladi",
        "So'rov yana qayta yuboriladi"
      ],
      correctAnswerIndex: 1,
      explanation: "Agar next() chaqirilmasa yoki javob (res.send) qaytarilmasa, so'rov havoda osilib qoladi va mijoz javob kutib qolaveradi."
    },
    {
      id: "3",
      question: "Error handling middleware nechta parametr qabul qiladi?",
      options: [
        "2 ta",
        "3 ta",
        "4 ta",
        "1 ta"
      ],
      correctAnswerIndex: 2,
      explanation: "Error handling middleware maxsus 4 ta parametr qabul qiladi: (err, req, res, next)."
    },
    {
      id: "4",
      question: "Quyidagilardan qaysi biri Built-in (ichki) middleware hisoblanadi?",
      options: [
        "express.json()",
        "cors",
        "mongoose",
        "passport"
      ],
      correctAnswerIndex: 0,
      explanation: "express.json() va express.static() Express.js ning ichki (built-in) middleware'laridir."
    },
    {
      id: "5",
      question: "Application-level middleware qanday ro'yxatdan o'tkaziladi?",
      options: [
        "app.use()",
        "app.middleware()",
        "app.add()",
        "app.listen()"
      ],
      correctAnswerIndex: 0,
      explanation: "Butun ilova bo'ylab ishlaydigan middleware app.use() orqali qo'shiladi."
    },
    {
      id: "6",
      question: "Third-party middleware'ga misol keltiring",
      options: [
        "express.static",
        "res.send",
        "morgan",
        "req.body"
      ],
      correctAnswerIndex: 2,
      explanation: "Morgan, CORS, Helmet kabi kutubxonalar uchinchi tomon (third-party) middleware hisoblanadi."
    },
    {
      id: "7",
      question: "Middleware Node.js Event Loop'ni to'sib qo'yishi mumkinmi?",
      options: [
        "Yo'q, chunki ular asinxron",
        "Ha, agar ichida og'ir sinxron operatsiyalar bajarilsa",
        "Faqat Error Handler to'sishi mumkin",
        "Faqat Third-party middleware to'sishi mumkin"
      ],
      correctAnswerIndex: 1,
      explanation: "Javascript bitta oqimda ishlagani uchun (Single thread), middleware ichidagi har qanday og'ir sinxron hisob-kitob butun ilovani va Event Loop'ni bloklab qo'yadi."
    },
    {
      id: "8",
      question: "Middleware funksiyasi qaysi ob'ektlarga ruxsatga ega?",
      options: [
        "Faqat Request ob'ektiga",
        "Faqat Response ob'ektiga",
        "Request, Response va next() funksiyasiga",
        "Faqat Database ob'ektiga"
      ],
      correctAnswerIndex: 2,
      explanation: "Har bir oddiy middleware (req, res, next) parametrlarini qabul qiladi va ularni o'qiy olishi/o'zgartirishi mumkin."
    },
    {
      id: "9",
      question: "Router-level middleware ning farqi nimada?",
      options: [
        "U tezroq ishlaydi",
        "U faqat aniq bir express.Router() ga bog'langan bo'ladi",
        "Unda next() ishlatilmaydi",
        "U faqat GET so'rovlarida ishlaydi"
      ],
      correctAnswerIndex: 1,
      explanation: "Router-level middleware faqatgina ma'lum bir Router ob'ektiga (router.use) biriktiriladi va shu routerga tegishli yo'llardagina ishlaydi."
    },
    {
      id: "10",
      question: "Xatolikni error handler'ga uzatish uchun nima qilish kerak?",
      options: [
        "next() ni bo'sh chaqirish",
        "next(err) ko'rinishida xatoni parametr qilib uzatish",
        "throw new Error() qilish",
        "res.error() chaqirish"
      ],
      correctAnswerIndex: 1,
      explanation: "Agar next() funksiyasiga biror parametr berilsa, Express buni xato deb qabul qiladi va navbatdagi oddiy middleware'larni tashlab, to'g'ri Error handling middleware'ga o'tadi."
    },
    {
      id: "11",
      question: "Middleware'lar qanday ketma-ketlikda ishlaydi?",
      options: [
        "Alfavit tartibida",
        "Parallel (bir vaqtda)",
        "Ro'yxatdan o'tkazilgan tartibda (zanjir bo'lib)",
        "Tasodifiy tartibda"
      ],
      correctAnswerIndex: 2,
      explanation: "Middleware'lar kodda qanday ketma-ketlikda yozilgan bo'lsa (app.use()), aynan shunday navbat bilan ishlaydi."
    },
    {
      id: "12",
      question: "Autentifikatsiyani amalga oshiruvchi dastur bu...",
      options: [
        "Odatda middleware orqali yoziladi",
        "Faqat frontend'da qilinishi shart",
        "Node.js da umuman yozilmaydi",
        "Faqat Error handling'da yoziladi"
      ],
      correctAnswerIndex: 0,
      explanation: "Autentifikatsiya (foydalanuvchini tekshirish) Route handler'ga borishdan oldin middleware orqali amalga oshiriladigan klassik va eng ko'p qo'llaniladigan holatlardan biridir."
    }
  ]
};
