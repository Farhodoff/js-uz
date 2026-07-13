export const expressBasics = {
  id: "expressBasics",
  title: "Express.js Basics",
  description: "Learn the basics of Express.js",
  theory: `
## Part 1: Beginner Analogy

Tasavvur qiling, Node.js bu o'rmondan yog'och olib kelish va undan stol-stul yasash bo'lsa, Express.js bu mebel fabrikasidir. Node.js da oddiy HTTP server yaratishda hamma narsani (marshrutlash, fayllarni jo'natish, ma'lumotlarni qabul qilish) qo'lda yozishingiz kerak. Express.js esa bularni barchasini oson, tez va tartibli qilish uchun maxsus asboblarni taqdim etadi.

Bu xuddi restoranda oshpaz (Node.js) va ofitsiant (Express.js) o'rtasidagi farqga o'xshaydi. Express sizning so'rovlaringizni to'g'ri manzilga (marshrutga) yo'naltiradi va mijozga kerakli ovqatni (javobni) yetkazib beradi.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, Libuv, performance)

Express.js o'z mohiyatiga ko'ra Node.js ning o'rnatilgan HTTP modulining ustiga qurilgan yupqa qatlamdir. U Event Loop va Libuv arxitekturasiga hech qanday o'zgartirish kiritmaydi. Uning ishlash tamoyili Middleware (oraliq dastur) naqshiga asoslangan.

Har bir kelgan so'rov (Request) va ketadigan javob (Response) obyektlari Express tomonidan qabul qilinadi va Middleware'lar zanjiridan o'tkaziladi. 

\\\`\\\`\\\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
\\\`\\\`\\\`

Xotira nuqtai nazaridan, Express har bir marshrut va middleware uchun funksiyalar ro'yxatini xotirada saqlaydi (Router obyekti). V8 dvigateli orqali barcha JavaScript kodlari kabi optimallashtiriladi, lekin middleware zanjiri juda uzun bo'lsa, bu unumdorlikka (performance) salbiy ta'sir qilishi mumkin. Libuv bu jarayonda barcha kiritish-chiqarish (I/O) operatsiyalarini asinxron tarzda boshqarishda davom etadi.

## Part 3: Edge Cases and Senior Interview Questions

**Savol 1:** Nima uchun Express.js da \\\`next()\\\` funksiyasini chaqirish muhim?
**Javob:** Express zanjirida \\\`next()\\\` chaqirilmasa, so'rov havoda osilib qoladi (timeout). Middleware keyingi qadamga o'tishi uchun bu funksiya chaqirilishi shart.

**Savol 2:** Xatoni qanday qilib markazlashtirilgan holda boshqarish (Global Error Handling) mumkin?
**Javob:** Express da maxsus to'rtta parametrli middleware yozish orqali. Masalan: \\\`app.use((err, req, res, next) => { res.status(500).send(err.message) })\\\`

**Savol 3:** Express ilovasini qanday optimallashtirish mumkin?
**Javob:** 
1. Keraksiz middleware'larni olib tashlash.
2. Gzip siqishni (\\\`compression\\\`) yoqish.
3. Node.js Cluster moduli orqali ko'p jarayonli (multi-process) ishlash.
4. Keshlash (Redis orqali) va h.k.

### Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD;
    A[Mijoz - Client] -->|HTTP So'rov| B[Node.js HTTP Server];
    B --> C[Express Ilovasi];
    C --> D{Middleware Zanjiri};
    D -->|Ruxsat tekshirish| E[Auth Middleware];
    E --> F[Body Parser Middleware];
    F --> G[Route Handler];
    G -->|Javob| H[Mijozga Qaytish];
\\\`\\\`\\\`
  `,
  exercises: [
    {
      id: 1,
      title: "1-mashq",
      description: "Oddiy Express server yaratish",
      task: "3000 portda ishlaydigan Express serverini yarating.",
      starterCode: "const express = require('express');\\nconst app = express();\\n",
      solution: "const express = require('express');\\nconst app = express();\\napp.listen(3000, () => console.log('Server is running'));"
    },
    {
      id: 2,
      title: "2-mashq",
      description: "GET so'rovi",
      task: "'/' marshrutiga GET so'rovi kelganda 'Hello Express' qaytaring.",
      starterCode: "app.get('/', (req, res) => {\\n  // yechim bu yerda\\n});",
      solution: "app.get('/', (req, res) => {\\n  res.send('Hello Express');\\n});"
    },
    {
      id: 3,
      title: "3-mashq",
      description: "POST so'rovi",
      task: "'/data' marshrutiga POST so'rovi yozing.",
      starterCode: "app.post('/data', (req, res) => {\\n  // yechim bu yerda\\n});",
      solution: "app.post('/data', (req, res) => {\\n  res.send('Data received');\\n});"
    },
    {
      id: 4,
      title: "4-mashq",
      description: "URL parametrlari",
      task: "'/users/:id' marshrutida qabul qilingan id ni qaytaring.",
      starterCode: "app.get('/users/:id', (req, res) => {\\n  // yechim bu yerda\\n});",
      solution: "app.get('/users/:id', (req, res) => {\\n  res.send(req.params.id);\\n});"
    },
    {
      id: 5,
      title: "5-mashq",
      description: "Query parametrlari",
      task: "'/search' marshrutida 'q' query parametrini o'qib qaytaring.",
      starterCode: "app.get('/search', (req, res) => {\\n  // yechim bu yerda\\n});",
      solution: "app.get('/search', (req, res) => {\\n  res.send(req.query.q);\\n});"
    },
    {
      id: 6,
      title: "6-mashq",
      description: "JSON qaytarish",
      task: "'/api' marshrutida `{ message: 'ok' }` JSON obyektini qaytaring.",
      starterCode: "app.get('/api', (req, res) => {\\n  // yechim bu yerda\\n});",
      solution: "app.get('/api', (req, res) => {\\n  res.json({ message: 'ok' });\\n});"
    },
    {
      id: 7,
      title: "7-mashq",
      description: "Middleware ishlatish",
      task: "Barcha so'rovlar uchun 'Logger' middleware yarating va konsolga nimadir yozing.",
      starterCode: "app.use((req, res, next) => {\\n  // yechim bu yerda\\n});",
      solution: "app.use((req, res, next) => {\\n  console.log(req.method, req.url);\\n  next();\\n});"
    },
    {
      id: 8,
      title: "8-mashq",
      description: "JSON body parser",
      task: "Kelayotgan JSON ma'lumotlarni o'qish uchun o'rnatilgan middleware'ni yoqing.",
      starterCode: "// middleware bu yerda",
      solution: "app.use(express.json());"
    },
    {
      id: 9,
      title: "9-mashq",
      description: "404 Not Found",
      task: "Mavjud bo'lmagan marshrutlarga kirganda 404 status qaytaruvchi handler yozing.",
      starterCode: "app.use((req, res, next) => {\\n  // yechim bu yerda\\n});",
      solution: "app.use((req, res, next) => {\\n  res.status(404).send('Not Found');\\n});"
    },
    {
      id: 10,
      title: "10-mashq",
      description: "Global Error Handler",
      task: "Global error handler yarating (4 parametrli funksiya).",
      starterCode: "app.use((err, req, res, next) => {\\n  // yechim bu yerda\\n});",
      solution: "app.use((err, req, res, next) => {\\n  res.status(500).send('Error');\\n});"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Express.js nima?",
      options: [
        "Node.js uchun web framework",
        "Ma'lumotlar bazasi",
        "Frontend kutubxona",
        "Fayl tizimi moduli"
      ],
      correctAnswer: "Node.js uchun web framework"
    },
    {
      id: 2,
      question: "Express.js da middleware nima?",
      options: [
        "So'rov va javob o'rtasida ishlaydigan funksiya",
        "Ma'lumotlar bazasi drayveri",
        "HTML shabloni",
        "Faqat xatolarni ushlovchi modul"
      ],
      correctAnswer: "So'rov va javob o'rtasida ishlaydigan funksiya"
    },
    {
      id: 3,
      question: "Marshrut parametrlari qay holatda olinadi? Masalan, /users/:id",
      options: [
        "req.params.id",
        "req.query.id",
        "req.body.id",
        "req.id"
      ],
      correctAnswer: "req.params.id"
    },
    {
      id: 4,
      question: "So'rovdagi query string ni qaytadan o'qish uchun nima ishlatiladi?",
      options: [
        "req.query",
        "req.params",
        "req.body",
        "req.url_query"
      ],
      correctAnswer: "req.query"
    },
    {
      id: 5,
      question: "Qaysi metod JSON javob qaytarish uchun ishlatiladi?",
      options: [
        "res.json()",
        "res.sendJSON()",
        "res.end()",
        "res.html()"
      ],
      correctAnswer: "res.json()"
    },
    {
      id: 6,
      question: "Global error handler qanday farq qiladi?",
      options: [
        "4 ta parametr qabul qiladi (err, req, res, next)",
        "U faqat eng boshida yozilishi kerak",
        "Parametr qabul qilmaydi",
        "Faqat res obyekti bo'ladi"
      ],
      correctAnswer: "4 ta parametr qabul qiladi (err, req, res, next)"
    },
    {
      id: 7,
      question: "next() chaqirilmasa nima bo'ladi?",
      options: [
        "So'rov osilib qoladi (timeout)",
        "Xatolik yuz beradi",
        "Dastur yopilib ketadi",
        "Javob avtomatik ketadi"
      ],
      correctAnswer: "So'rov osilib qoladi (timeout)"
    },
    {
      id: 8,
      question: "JSON ma'lumot qabul qilish uchun qaysi middleware yoqilishi kerak?",
      options: [
        "express.json()",
        "express.body()",
        "express.parse()",
        "express.text()"
      ],
      correctAnswer: "express.json()"
    },
    {
      id: 9,
      question: "404 handler qayerda yozilishi kerak?",
      options: [
        "Barcha marshrutlardan keyin eng oxirida",
        "Dastur boshida",
        "Middleware zanjiri o'rtasida",
        "Farqi yo'q"
      ],
      correctAnswer: "Barcha marshrutlardan keyin eng oxirida"
    },
    {
      id: 10,
      question: "res.send() va res.json() o'rtasida qanday farq bor?",
      options: [
        "res.json() obyektni avtomatik string qiladi va Content-Type ni application/json qilib qo'yadi",
        "Ularning farqi yo'q",
        "res.send() faqat raqam qabul qiladi",
        "res.json() tezroq ishlaydi"
      ],
      correctAnswer: "res.json() obyektni avtomatik string qiladi va Content-Type ni application/json qilib qo'yadi"
    },
    {
      id: 11,
      question: "Express da router nima maqsadda ishlatiladi?",
      options: [
        "Marshrutlarni alohida modullarga ajratish va tartibga solish uchun",
        "Faqat ma'lumotlar bazasiga ulanish uchun",
        "Xatolarni qayd qilish (log) uchun",
        "Dastur ishlash tezligini ikki barobar oshirish uchun"
      ],
      correctAnswer: "Marshrutlarni alohida modullarga ajratish va tartibga solish uchun"
    },
    {
      id: 12,
      question: "app.listen(port) nima vazifani bajaradi?",
      options: [
        "Serverni ma'lum portda eshitishni (ishlashni) boshlaydi",
        "Dasturni to'xtatadi",
        "Ma'lumotlar bazasi ulanishini ochadi",
        "Mijozga fayl jo'natadi"
      ],
      correctAnswer: "Serverni ma'lum portda eshitishni (ishlashni) boshlaydi"
    }
  ]
};
