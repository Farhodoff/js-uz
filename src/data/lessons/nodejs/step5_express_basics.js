export const step5_express_basics = {
  id: 5,
  title: "Express.js asoslari va Routing",
  theory: `
# Express.js Asoslari: Yoki qanday qilib Node.js dagi "qiynoq"dan qutulish mumkin?

Tasavvur qiling, sizga yog'ochdan uy qurishni buyurishdi, lekin faqat bolta va mix berishdi. Sof (vanilla) Node.js bilan server yozish xuddi shunga o'xshaydi. Har safar URL'ni tekshirish, header'larni qo'lda yozish, JSON parse qilish... O'zingizni xuddi o'rta asrlarda his qilasiz.

Express.js — bu sizga tayyor asbob-uskunalar qutisini beruvchi framework (ramka). U Node.js ustiga qurilgan va hayotingizni sezilarli darajada osonlashtiradi.

### Nima uchun Express.js?

❌ **YOMON (Sof Node.js):**
\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ name: 'Ali' }]));
  } else if (req.method === 'POST' && req.url === '/users') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // Va hokazo cheksiz azoblar...
      res.end('User created');
    });
  }
});
\`\`\`

✅ **YAXSHI (Express.js):**
\`\`\`javascript
const express = require('express');
const app = express();
app.use(express.json()); // JSON'ni parse qilish uchun 1 qator!

app.get('/users', (req, res) => {
  res.json([{ name: 'Ali' }]); // Avtomat header va stringify!
});

app.post('/users', (req, res) => {
  console.log(req.body); // Tayyor ma'lumot!
  res.send('User created');
});
\`\`\`
Ko'rdingizmi? Kod nafaqat qisqardi, balki o'qilishi ham ancha osonlashdi.

### Routing (Yo'naltirish) Nima?
Routing bu — mehmon qaysi eshikni taqillatsa, kim javob berishini belgilashdir. 
Masalan, kimdir \`/kitoblar\` deb so'rasa, kitoblar ro'yxatini berasiz, \`/users\` desa, foydalanuvchilarni.

Mermaid orqali tushunib olaylik:

\`\`\`mermaid
sequenceDiagram
    participant Client as Brauzer (Mijoz)
    participant Express as Express Server
    participant Router as Router (Yo'l ko'rsatuvchi)
    
    Client->>Express: GET /api/users (Foydalanuvchilarni bering!)
    Express->>Router: Bu kimga tegishli?
    Router-->>Express: Bu "users" kontrolleriga tegishli.
    Express->>Client: JSON [Ali, Vali] (Mana oling!)
\`\`\`

### 🔥 Intervyu Savollari

1. **Savol:** Express.js nima va u nega kerak?
   **Javob:** Express.js bu Node.js uchun veb-dasturlar va API'lar yaratishni osonlashtiradigan minimalistik framework. U routing, middleware (oraliq dasturlar) va request/response obyektlarini boshqarishni juda soddalashtiradi. Vanilla Node.js da ko'p kod yozish talab etiladigan ishlarni bir necha qatorda bajarishga imkon beradi.

2. **Savol:** Express'da \`app.use()\` nima ish qiladi?
   **Javob:** \`app.use()\` middleware (oraliq dastur) funksiyalarini ro'yxatdan o'tkazish uchun ishlatiladi. Bu funksiyalar serverga kelgan har qanday so'rovni tutib olib, unga qandaydir ishlov beradi (masalan, JSON body'ni parse qilish \`app.use(express.json())\`, yoki log yozish) va keyingi bosqichga o'tkazadi.

3. **Savol:** Route parametrlar (\`:id\`) va Query string (\`?name=ali\`) o'rtasidagi farq nima?
   **Javob:** Route parametrlari URL'ning bir qismi bo'lib, aniq bitta resursni aniqlash uchun ishlatiladi (masalan, \`/users/:id\` => \`req.params.id\`). Query string esa ixtiyoriy, qo'shimcha ma'lumotlar (masalan, filterlash, qidirish) uchun ishlatiladi va URL oxirida \`?\` dan keyin keladi (masalan, \`/users?age=20\` => \`req.query.age\`).

`,
  exercises: [
    {
      id: 1,
      title: "Birinchi Express Serveringiz",
      instruction: "Express.js modulini chaqiring, yangi 'app' yarating va 3000-portda ishga tushiring. Server ishga tushganda konsolga 'Server is running' deb chiqaring.",
      startingCode: "const express = require('express');\n// app yarating va 3000-portni eshiting",
      hint: "app = express() dan foydalaning va app.listen(3000, callback) ishlating.",
      test: "const request = require('supertest');\nexpect(app).toBeDefined();"
    },
    {
      id: 2,
      title: "Oddiy GET so'rov",
      instruction: "'/' yo'liga GET so'rov kelganda mijozga 'Hello Express' so'zini yuboradigan route (yo'l) yarating.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// '/' uchun GET route yarating\n\nmodule.exports = app;",
      hint: "app.get('/', (req, res) => { res.send('...') })",
      test: "const request = require('supertest');\nconst res = await request(app).get('/');\nexpect(res.text).toBe('Hello Express');"
    },
    {
      id: 3,
      title: "JSON qaytarish",
      instruction: "'/api/info' yo'liga GET so'rov kelganda, { framework: 'Express', version: 4 } JSON obyektini qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// '/api/info' uchun GET route\n\nmodule.exports = app;",
      hint: "res.json() metodidan foydalaning.",
      test: "const request = require('supertest');\nconst res = await request(app).get('/api/info');\nexpect(res.body).toEqual({ framework: 'Express', version: 4 });"
    },
    {
      id: 4,
      title: "POST so'rovini qabul qilish",
      instruction: "Express.js dagi app.use(express.json()) ni sozlang va '/users' yo'liga POST so'rovini qabul qilib, unga 'User added' matnini javob qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// JSON middleware'ni ulab, '/users' ga POST yarating\n\nmodule.exports = app;",
      hint: "app.use(express.json()) ni qotirish esingizdan chiqmasin va app.post() ni ishlating.",
      test: "const request = require('supertest');\nconst res = await request(app).post('/users');\nexpect(res.text).toBe('User added');"
    },
    {
      id: 5,
      title: "Route Parametrlari",
      instruction: "'/users/:id' yo'liga GET so'rovini qo'shing va kelgan 'id' ni 'User ID: {id}' formatida qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// '/users/:id' route yarating\n\nmodule.exports = app;",
      hint: "req.params.id orqali id ni olishingiz mumkin va res.send() bilan qaytarasiz.",
      test: "const request = require('supertest');\nconst res = await request(app).get('/users/42');\nexpect(res.text).toBe('User ID: 42');"
    },
    {
      id: 6,
      title: "Query Parametrlari",
      instruction: "'/search' yo'liga GET so'rov kelganda, URL dan 'q' degan query parametrni oling va 'Searching for: {q}' deb javob qaytaring. Agar 'q' bo'lmasa 'No query' qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// '/search' route yarating\n\nmodule.exports = app;",
      hint: "req.query.q ni tekshiring.",
      test: "const request = require('supertest');\nlet res = await request(app).get('/search?q=Node');\nexpect(res.text).toBe('Searching for: Node');\nres = await request(app).get('/search');\nexpect(res.text).toBe('No query');"
    },
    {
      id: 7,
      title: "Barcha yo'llarni ushlash (404)",
      instruction: "Agar foydalanuvchi mavjud bo'lmagan yo'lga (masalan, GET '/not-found') kirsa, 404 status kodi bilan 'Page not found' matnini qaytaruvchi barcha so'rovlar uchun catch-all handler yarating.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// 404 handler yarating (app.use bilan)\n\nmodule.exports = app;",
      hint: "Fayl oxirida app.use((req, res) => { res.status(404).send(...) }) ishlating.",
      test: "const request = require('supertest');\nconst res = await request(app).get('/random-path');\nexpect(res.status).toBe(404);\nexpect(res.text).toBe('Page not found');"
    },
    {
      id: 8,
      title: "PUT so'rovi orqali yangilash",
      instruction: "'/products/:id' yo'liga PUT so'rovi qabul qiladigan route yozing. U JSON orqali { name: 'Meva' } kabi body olishini kuting. Va { updated: id, newName: req.body.name } obyektini qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\n// PUT '/products/:id' route yarating\n\nmodule.exports = app;",
      hint: "req.params.id va req.body.name dan foydalanib res.json() qaytaring.",
      test: "const request = require('supertest');\nconst res = await request(app).put('/products/7').send({name: 'Olma'});\nexpect(res.body).toEqual({updated: '7', newName: 'Olma'});"
    },
    {
      id: 9,
      title: "DELETE so'rovi",
      instruction: "'/posts/:id' yo'li uchun DELETE so'rovini qabul qiladigan route yarating. Status 200 qilib { message: 'Deleted', id: id } ni JSON formatda qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// DELETE '/posts/:id' route yarating\n\nmodule.exports = app;",
      hint: "app.delete() dan foydalaning.",
      test: "const request = require('supertest');\nconst res = await request(app).delete('/posts/99');\nexpect(res.status).toBe(200);\nexpect(res.body).toEqual({message: 'Deleted', id: '99'});"
    },
    {
      id: 10,
      title: "Router'dan foydalanish",
      instruction: "Express'ning Router() imkoniyatidan foydalanib, yangi 'userRouter' yarating. Unga GET '/' route qilib 'User list' qaytaring. Keyin uni '/api/users' ga app.use() qiling.",
      startingCode: "const express = require('express');\nconst app = express();\n\nconst userRouter = express.Router();\n// userRouter ga route qo'shing\n// app ga ulang\n\nmodule.exports = app;",
      hint: "userRouter.get('/', ...) so'ngra app.use('/api/users', userRouter)",
      test: "const request = require('supertest');\nconst res = await request(app).get('/api/users');\nexpect(res.text).toBe('User list');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Express.js o'zi nima?",
      options: [
        "Ma'lumotlar bazasi",
        "Frontend kutubxonasi",
        "Node.js uchun web framework",
        "Kodni formatlaydigan vosita"
      ],
      correctAnswer: 2,
      explanation: "Express.js bu Node.js ustiga qurilgan, veb va API larni tezroq va qulayroq yaratish uchun xizmat qiladigan backend framework."
    },
    {
      id: 2,
      question: "Express'ni loyihaga o'rnatish uchun qaysi komanda ishlatiladi?",
      options: [
        "npm start express",
        "npm install express",
        "node run express",
        "express setup"
      ],
      correctAnswer: 1,
      explanation: "Express - bu npm paketi. Uni 'npm install express' komandasi orqali o'rnatamiz."
    },
    {
      id: 3,
      question: "Express serverni ishga tushirish uchun qaysi metoddan foydalanamiz?",
      options: [
        "app.start()",
        "app.run()",
        "app.listen()",
        "app.init()"
      ],
      correctAnswer: 2,
      explanation: "app.listen(port, callback) portda serverni ishga tushirish va so'rovlarni kutish uchun xizmat qiladi."
    },
    {
      id: 4,
      question: "Mijozga JSON formatda ma'lumot jo'natish uchun qaysi kod ishlatiladi?",
      options: [
        "res.sendJSON()",
        "res.json()",
        "res.send({json: true})",
        "res.data()"
      ],
      correctAnswer: 1,
      explanation: "res.json() avtomatik ravishda obyektni stringify qiladi va header'ga 'Content-Type: application/json' qo'shib beradi."
    },
    {
      id: 5,
      question: "URL manzilidagi '/users/:id' dagi 'id' nimani bildiradi?",
      options: [
        "Fayl nomi",
        "Query parametr",
        "Route parametri",
        "Xatolik kodi"
      ],
      correctAnswer: 2,
      explanation: "Ikki nuqta (:) bilan boshlangan so'zlar Route Parametrlar deyiladi, va URL ni o'zgaruvchan qismlarini bildiradi."
    },
    {
      id: 6,
      question: "POST so'rovi orqali kelayotgan JSON body'ni o'qish uchun Express'ga nima qo'shish kerak?",
      options: [
        "app.use(express.json())",
        "app.bodyParse()",
        "app.getJson()",
        "Express o'zi avtomat o'qiydi"
      ],
      correctAnswer: 0,
      explanation: "Express.js o'z holicha so'rov (req) dagi JSON ma'lumotlarni o'qimaydi. Buning uchun 'app.use(express.json())' middleware ulanishi shart."
    },
    {
      id: 7,
      question: "Query parametrlarni ('?name=ali') o'qish uchun qaysi obyektdan foydalaniladi?",
      options: [
        "req.params",
        "req.body",
        "req.url",
        "req.query"
      ],
      correctAnswer: 3,
      explanation: "URL'dagi so'roq belgisidan keyingi ma'lumotlar query parametrlar deyiladi va ular req.query obyektida keladi."
    },
    {
      id: 8,
      question: "Har qanday yo'lni (catch-all yoki 404 page) ushlash uchun odatda nima ishlatiladi?",
      options: [
        "app.all('*', ...)",
        "Dastur oxirida app.use((req, res) => ...)",
        "app.catch()",
        "Ikkalasi ham: A va B to'g'ri"
      ],
      correctAnswer: 3,
      explanation: "Barcha yo'llar ushlashda ko'pincha barcha route'lar oxirida qolgan barcha holatlarni 'app.use()' yoki 'app.all('*')' bilan ushlab 404 qaytarish mumkin."
    },
    {
      id: 9,
      question: "Express'da HTTP method turlaridan qaysilari bor?",
      options: [
        "Faqat GET va POST",
        "GET, POST, PUT, DELETE, PATCH va h.k",
        "Faqat SEND va RECEIVE",
        "HTTP methodlar Expressda yo'q"
      ],
      correctAnswer: 1,
      explanation: "Express.js barcha asosiy HTTP methodlarini (app.get, app.post, app.put, app.delete va h.k) to'liq qo'llab-quvvatlaydi."
    },
    {
      id: 10,
      question: "Express router nima uchun kerak?",
      options: [
        "Internet tezligini oshirish uchun",
        "Kodni faqat server.js da yozish uchun",
        "Route'larni guruhlarga bo'lib, loyihani modulli qilish uchun",
        "Baza bilan bog'lanish uchun"
      ],
      correctAnswer: 2,
      explanation: "express.Router() - bu kichik, izolyatsiya qilingan app bo'lib, katta loyihalarni (masalan fayllarni) alohida bo'limlarga ajratib ishlashni juda osonlashtiradi."
    },
    {
      id: 11,
      question: "Agar res.send() yoki res.json() ni yubormasak nima bo'ladi?",
      options: [
        "Mijozda brauzer qotib, so'rov cheksiz kutish (timeout) holatida qolib ketadi",
        "Express avtomat 'OK' jo'natadi",
        "Node.js crash bo'ladi (o'chib qoladi)",
        "Brauzer o'zidan o'zi refresh bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "Server har doim request'ga response yuborishi kerak (res.end/send/json orqali). Yubormasa, front-end tomon abadiy kutib qoladi."
    },
    {
      id: 12,
      question: "Node.js'ning o'zidagi 'http' modulidan ko'ra Express.js ning ustunligi nimada?",
      options: [
        "Tezroq ishlaydi",
        "Faqat JSON ishlatadi",
        "O'qishga oson kod, routing, tayyor metodlar, va middleware arxitekturasi borligi",
        "Ustunligi yo'q"
      ],
      correctAnswer: 2,
      explanation: "Express boilerplate (qaytalanuvchi, zerikarli) kodlarni yashirib, qulay API beradi."
    }
  ]
};
