export const step4_http_server = {
  theory: "\n# Node.js `http` moduli: Internetda o'z qahvaxonangizni ochish ☕\n\nTasavvur qiling, siz qahvaxona ochdingiz. Mijozlar kelib qahva so'raydi (Request), siz esa ularga qahva tayyorlab berasiz (Response). Node.js dagi `http` moduli aynan shunday ishlaydi! U server yaratish va HTTP so'rovlarini qabul qilib, javob qaytarish uchun kerak. Express.js kabi freymvorklar ham aynan shu modul ustiga qurilgan, shuning uchun \"tag-tomiri\"ni tushunish juda muhim! 😎\n\n### ❌ YOMON yondashuv (Serverni xavfsiz emas yoki noto'g'ri sozlash)\nMijoz kelib qahva so'radi, siz esa unga choynakni o'zini otib yubordingiz. Yoki kimdir \"Salom\" desa, umuman javob bermadingiz (va brauzer kutaverib o'lib qoldi).\n```javascript\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  // res.end() qilinmadi! Brauzer aylanib yotaveradi 💀\n  console.log(\"Kimdir kirdi, lekin men javob bermayman!\");\n});\nserver.listen(3000);\n```\n\n### ✅ YAXSHI yondashuv (Mijozga to'g'ri javob berish)\nMijozga nima so'rayotganiga qarab, to'g'ri status va ma'lumotni qaytaramiz.\n```javascript\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  // Avval qanday formatda javob berishimizni aytamiz (Headers)\n  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });\n  \n  if (req.url === '/') {\n    res.end('Qahvaxonamizga xush kelibsiz! ☕');\n  } else if (req.url === '/menu') {\n    res.end('Bizda Qora qahva va Sutli qahva bor 📜');\n  } else {\n    res.writeHead(404);\n    res.end('Bunday sahifa yo\\'q! 😢');\n  }\n});\n\nserver.listen(3000, () => {\n  console.log('Server 3000-portda yugurib yuribdi! 🏃‍♂️');\n});\n```\n\n---\n\n### Qanday ishlaydi?\n\n`http.createServer()` funktsiyasi har bir mijoz so'rovi uchun ishlashga tayyor bo'lgan serverni yaratadi. Undagi callback funktsiya ikkita sehrli ob'ektni qabul qiladi:\n1. **`req` (Request - So'rov):** Mijoz nima xohlayapti? URL qanaqa? Metodi nima (GET, POST)?\n2. **`res` (Response - Javob):** Biz mijozga nima jo'natamiz? Qanday holat kodi (200, 404, 500) va ma'lumot?\n\n### Mermaid Diagramma: Mijoz va Server suhbati\n\n```mermaid\nsequenceDiagram\n    participant Brauzer as Mijoz (Mijoz)\n    participant Server as Node.js Server\n    \n    Brauzer->>Server: HTTP GET /\n    Note right of Server: req.url === '/' ni tekshiradi\n    Server-->>Brauzer: HTTP 200 \"Xush kelibsiz!\"\n    \n    Brauzer->>Server: HTTP GET /yashirin-sahifa\n    Note right of Server: req.url hech qaysisiga tushmadi\n    Server-->>Brauzer: HTTP 404 \"Topilmadi!\"\n```\n\n---\n\n### 🎙 Intervyu savollari\n\n**1-savol: HTTP modulisiz server yarata olamizmi?**\n**Javob:** Node.js muhitida asosan TCP dagi `net` modullari orqali xom-xashak (raw) server yaratsa bo'ladi, lekin veb-so'rovlar asosan HTTP protokoli ustiga qurilgan. Shuning uchun `http` moduli eng optimal asos hisoblanadi. (Express ham asilida `http.createServer` ni ishlatadi).\n\n**2-savol: HTTP metodlarining farqi nimada (GET, POST, PUT, DELETE)?**\n**Javob:** \n- **GET:** Ma'lumotni o'qish/olish (qahva menyusini ko'rish).\n- **POST:** Yangi ma'lumot yaratish (yangi qahvaga buyurtma berish).\n- **PUT:** Bor ma'lumotni to'liq o'zgartirish (buyurtmani kattasiga almashtirish).\n- **DELETE:** Ma'lumotni o'chirish (buyurtmani bekor qilish).\n\n**3-savol: `res.end()` va `res.write()` o'rtasida qanday farq bor?**\n**Javob:** `res.write()` mijozga ma'lumotning bir qismini jo'natadi, buni bir necha marta chaqirish mumkin (xuddi qahvani qultumlab berishdek). `res.end()` esa ma'lumot jo'natish jarayonini tugatadi va oqimni yopadi (stakan to'ldi, oling endi deb uzatish). `res.end('salom')` = `res.write('salom')` + `res.end()`.\n",
  exercises: [
  {
    "id": 1,
    "title": "Serverga ilk qadam",
    "instruction": "'http' modulini import qiling va 'server' nomli o'zgaruvchiga yangi server yarating. Hozircha server ichida hech narsa yozish shart emas.",
    "startingCode": "const http = require('http');\n\n// Shu yerda server yarating\n",
    "hint": "http.createServer() dan foydalaning.",
    "test": "const http = require('http');\nif(typeof server !== 'object') throw new Error('server o\\'zgaruvchisi topilmadi yoki u obyekt emas');"
  },
  {
    "id": 2,
    "title": "Javob berish",
    "instruction": "Server yaratildi. Har safar so'rov kelganda 'Salom Dunyo' deb javob qaytarish (res.end) kerak.",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  // Shu yerda javob qaytaring\n});",
    "hint": "res.end('Salom Dunyo'); deb yozing.",
    "test": "const check = server.listeners('request')[0].toString(); if(!check.includes('Salom Dunyo')) throw new Error('Salom Dunyo so\\'zi qaytarilmadi!');"
  },
  {
    "id": 3,
    "title": "Portda eshitish",
    "instruction": "Serverni 8080-portda eshitishini (listen) ta'minlang.",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => res.end('ok'));\n\n// Shu yerda serverni 8080 portga ulang\n",
    "hint": "server.listen(8080); dan foydalaning.",
    "test": "if(!server.address() || server.address().port !== 8080) throw new Error('Server 8080 portda ishlamayapti'); server.close();"
  },
  {
    "id": 4,
    "title": "Status kod (Headers)",
    "instruction": "So'rovga javob berishdan oldin 200 status kodi va kontent turi 'text/plain' bo'lgan Header yozing.",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  // Header yozish\n  \n  res.end('Ok');\n});",
    "hint": "res.writeHead(200, {'Content-Type': 'text/plain'}); ishlating.",
    "test": "const check = server.listeners('request')[0].toString(); if(!check.includes('writeHead') || !check.includes('200')) throw new Error('writeHead yordamida 200 status qaytarilmadi');"
  },
  {
    "id": 5,
    "title": "JSON qaytarish",
    "instruction": "Mijozga JSON formatda `{ \"xabar\": \"Salom\" }` degan ma'lumotni yuboring. 'Content-Type' 'application/json' bo'lishi kerak.",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  // Header yozing va JSON string yuboring\n  \n});",
    "hint": "res.writeHead(200, {'Content-Type': 'application/json'}); so'ng res.end(JSON.stringify({ xabar: 'Salom' })); yozing.",
    "test": "const check = server.listeners('request')[0].toString(); if(!check.includes('application/json')) throw new Error('Content-Type xato');"
  },
  {
    "id": 6,
    "title": "Oddiy marshrut (Routing)",
    "instruction": "Agar `req.url` aynan `/hello` bo'lsa `res.end('Hello Page')` qaytarsin. Aks holda hech narsa qilmasin.",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  // Routing\n  \n});",
    "hint": "if (req.url === '/hello') yordamida tekshiring.",
    "test": "const check = server.listeners('request')[0].toString(); if(!check.includes('/hello')) throw new Error('URL /hello tekshirilmadi');"
  },
  {
    "id": 7,
    "title": "Not Found (404)",
    "instruction": "Tizimga kelgan so'rov yo'li `/` bo'lsa 'Bosh sahifa' deb qaytarsin, boshqa har qanday yo'lga 404 status qaytarib, 'Topilmadi' desin.",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  // Shart yozing\n  \n});",
    "hint": "if(req.url === '/') { ... } else { res.writeHead(404); res.end('Topilmadi'); }",
    "test": "const check = server.listeners('request')[0].toString(); if(!check.includes('404')) throw new Error('404 statusi qaytarilmadi');"
  },
  {
    "id": 8,
    "title": "Faqat POST so'rovlar",
    "instruction": "Agar mijozning so'rov usuli (`req.method`) 'POST' bo'lsa, 'Ma\\'lumot qabul qilindi' deb qaytarsin, boshqa metodlarga 'Faqat POST ruxsat etiladi' deb qaytarsin.",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  // Metodni tekshirish\n  \n});",
    "hint": "if (req.method === 'POST') ishlating.",
    "test": "const check = server.listeners('request')[0].toString(); if(!check.includes('POST')) throw new Error('POST metodi tekshirilmadi');"
  },
  {
    "id": 9,
    "title": "Query qatorini olish",
    "instruction": "Bilasizmi, req.url ichida ba'zan `?id=5` kabi ma'lumot bo'lishi mumkin. Hozircha sizning vazifangiz shunchaki req.url ni konsolga chiqarish (console.log) va javobni yakunlash (res.end()).",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => {\n  // req.url ni konsolga chiqaring\n  \n});",
    "hint": "console.log(req.url) ishlating.",
    "test": "const check = server.listeners('request')[0].toString(); if(!check.includes('console.log(req.url)')) throw new Error('console.log qilinmadi');"
  },
  {
    "id": 10,
    "title": "Asinxron server log",
    "instruction": "Server `listen` bo'lganida terminalda 'Server ishga tushdi' degan xabar chiqishi kerak. (Listen funksiyasining callback'idan foydalaning).",
    "startingCode": "const http = require('http');\nconst server = http.createServer((req, res) => res.end('ok'));\n\n// Callback qo'shing\nserver.listen(3000);\n",
    "hint": "server.listen(3000, () => { console.log('Server ishga tushdi') }) qiling.",
    "test": "if(!startingCode.includes('console.log')) throw new Error('Listen callbackida console.log yo\\'q');"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "Node.js da HTTP server yaratish uchun qaysi modul ishlatiladi?",
    "options": [
      "fs",
      "path",
      "http",
      "url"
    ],
    "correctAnswer": 2,
    "explanation": "'http' moduli orqali server yaratiladi va so'rovlar qabul qilinadi."
  },
  {
    "id": 2,
    "question": "http.createServer() qanday ikkita parametrni o'z callbackiga qabul qiladi?",
    "options": [
      "err, data",
      "req, res",
      "in, out",
      "get, post"
    ],
    "correctAnswer": 1,
    "explanation": "req (request/so'rov) va res (response/javob) obyektlari."
  },
  {
    "id": 3,
    "question": "Mijoz so'ragan yo'lni (url) qanday aniqlash mumkin?",
    "options": [
      "res.url",
      "req.path",
      "req.url",
      "http.url"
    ],
    "correctAnswer": 2,
    "explanation": "req.url so'rovning manzil qatorini bildiradi, masalan '/about'."
  },
  {
    "id": 4,
    "question": "HTTP 200 status kodi nimani anglatadi?",
    "options": [
      "Not Found (Topilmadi)",
      "Internal Server Error (Server xatosi)",
      "OK (Hammasi joyida)",
      "Forbidden (Ruxsat yo'q)"
    ],
    "correctAnswer": 2,
    "explanation": "200 - bu OK, ya'ni so'rov muvaffaqiyatli bajarildi degani."
  },
  {
    "id": 5,
    "question": "Mijoz ma'lumot yuborish uchun qaysi so'rov turidan kengroq foydalanadi?",
    "options": [
      "GET",
      "POST",
      "DELETE",
      "OPTIONS"
    ],
    "correctAnswer": 1,
    "explanation": "POST orqali foydalanuvchidan serverga ma'lumot yuboriladi (masalan forma orqali)."
  },
  {
    "id": 6,
    "question": "Serverni ma'lum bir portda ishga tushirish uchun qaysi funksiya kerak?",
    "options": [
      "server.start()",
      "server.run()",
      "server.open()",
      "server.listen()"
    ],
    "correctAnswer": 3,
    "explanation": "server.listen(port) orqali server kiritilgan portda so'rovlarni kuta boshlaydi."
  },
  {
    "id": 7,
    "question": "Javob jo'natishni qanday yakunlaymiz va xabar yuboramiz?",
    "options": [
      "res.send()",
      "res.stop()",
      "res.end()",
      "res.finish()"
    ],
    "correctAnswer": 2,
    "explanation": "res.end() ulanishni yopadi va (agar yozilgan bo'lsa) ma'lumotni jo'natadi. res.send() ExpressJS da bor."
  },
  {
    "id": 8,
    "question": "res.writeHead() nima vazifani bajaradi?",
    "options": [
      "So'rovga HTML fayl ulaydi",
      "Serverni to'xtatadi",
      "Javobning status kodini va headerlarini (HTTP sarlavhalari) yozadi",
      "Faqat xatoliklarni qaytaradi"
    ],
    "correctAnswer": 2,
    "explanation": "Ushbu funksiya orqali qanday formatda ma'lumot ketayotganini va holatni (statusni) bildiramiz."
  },
  {
    "id": 9,
    "question": "Port nima?",
    "options": [
      "Kema to'xtaydigan joy",
      "Dasturning tarmoqdan ma'lumot olish ulanish nuqtasi",
      "Modul nomi",
      "Tashqi server nomi"
    ],
    "correctAnswer": 1,
    "explanation": "Port kompyuteringizdagi ma'lum bir xizmat/dastur qabul qiladigan virtual ulanish nuqtasidir."
  },
  {
    "id": 10,
    "question": "404 HTTP status kodi ma'nosi?",
    "options": [
      "Muvaffaqiyatli",
      "Server ishlamay qoldi",
      "Topilmadi (Not Found)",
      "So'rov noto'g'ri"
    ],
    "correctAnswer": 2,
    "explanation": "Bunday manzil yoxud sahifa bazada yo'q yoki serverda mavjud emas degani."
  },
  {
    "id": 11,
    "question": "JSON ma'lumot qaytarayotganda qaysi Content-Type ishlatiladi?",
    "options": [
      "text/plain",
      "text/html",
      "application/json",
      "multipart/form-data"
    ],
    "correctAnswer": 2,
    "explanation": "application/json brauzerga javob JSON formatida ekanligini aytadi."
  },
  {
    "id": 12,
    "question": "req.method qanday qiymatlarni o'z ichiga olishi mumkin?",
    "options": [
      "GET, POST, PUT, DELETE ...",
      "200, 404, 500",
      "http, https, ftp",
      "json, xml, html"
    ],
    "correctAnswer": 0,
    "explanation": "req.method - bu HTTP request metodlari: GET, POST, PUT, DELETE kabi."
  }
]
};
