export const fullstackRestApi = {
  id: "p3",
  title: "Loyiha: Express.js va React REST API (Full-stack)",
  theory: `## 1. REST API nima? (Beginner Analogy)

Tasavvur qiling, siz restorandasiz. Siz (Client - React Frontend) ovqat buyurtma qilmoqchisiz, lekin oshxonaga (Database) to'g'ridan-to'g'ri kirolmaysiz. Sizga ofitsiant kerak! Ofitsiant (Server - Express.js REST API) sizning buyurtmangizni (HTTP Request) qabul qiladi, oshxonaga yetkazadi va tayyor ovqatni (JSON Response) sizga olib keladi.

REST (Representational State Transfer) bu - ofitsiant va mijoz o'rtasidagi kelishuv (qoidalar to'plami). Masalan, siz ofitsiantdan faqat mavjud taomlarni so'ray olasiz va u sizga ma'lum tilda javob beradi. API esa dasturlarni o'zaro tillashishi uchun "menyudir".

---

## 2. Deep Dive (Under the hood)

REST arxitekturasining asosiy xususiyatlari:

1. **Statelessness (Hotsizlik):** Server har bir so'rovni alohida va mustaqil deb qabul qiladi. U oldingi so'rovlar haqida ma'lumot saqlamaydi (stateless). Har bir so'rov o'z ichiga avtorizatsiya va barcha kerakli ma'lumotlarni (masalan, token) olishi shart.
2. **REST Constraints:** Client-Server, Cacheability, Uniform Interface, Layered System.
3. **JSON Serialization/Deserialization:** Tarmoq orqali yuborilayotgan ma'lumotlar JavaScript obyekti emas, balki oddiy matn (JSON string) bo'ladi. \\\`JSON.stringify()\\\` (Serialization) ma'lumotni jo'natish uchun tayyorlaydi, \\\`JSON.parse()\\\` (Deserialization) uni qabul qilib olgach obyektga aylantiradi.
4. **JWT Auth (JSON Web Token):** Foydalanuvchini autentifikatsiya qilish uchun server JWT token beradi. Client uni LocalStorage'da saqlab, keyingi barcha so'rovlarning sarlavhasida (Headers: Authorization) yuboradi.

---

## 3. Edge Cases and Senior Interview Questions

Senior dasturchilarga REST API bo'yicha beriladigan qiyin savollar:

- **Scaling REST APIs:** Tizim kattalashganda load balancer'lar, keshlar (Redis) va microservices yordamida qanday gorizontal masshtablash mumkin?
- **N+1 Problem:** Bitta so'rovda ro'yxatni o'qib, ularning har biri uchun yana alohida DB-dan ma'lumot so'rash oqibatida ishlash tezligi tushib ketishi. Bunga yechim sifatida GraphQL, DataLoader yoki SQL JOINs ishlatiladi.
- **Idempotency:** Qanday qilib bitta amalni takroran yuborilganda ham ma'lumotlar omboriga faqat bir marta yozilishini ta'minlash mumkin? Masalan, to'lov qilish tizimida \\\`PUT\\\` yoki \\\`DELETE\\\` idempotency xususiyatiga ega, \\\`POST\\\` esa yo'q.

---

## 4. Arxitektura sxemasi (Mermaid)

\\\`\\\`\\\`mermaid
sequenceDiagram
    participant C as React Frontend
    participant S as Express Server
    participant D as Database
    
    C->>S: GET /api/users (Token bilan)
    S->>S: JWT Tokenni tekshirish (Auth)
    S->>D: Ma'lumotlarni o'qish
    D-->>S: Foydalanuvchilar (Raw Data)
    S-->>C: 200 OK + JSON (Serialization)
    C->>C: JSON Parsing (Deserialization)
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Express GET Endpoint yaratish",
      instruction: "Express app obyektida `/api/status` yo'nalishiga GET so'rovi kelganda `{ status: 'ok' }` obyektini JSON shaklida qaytaradigan API endpoint yozing.",
      startingCode: "const express = require('express');\nconst app = express();\n\n// API yozing\n",
      hint: "app.get('/api/status', (req, res) => res.json({ status: 'ok' }));",
      test: "if (!code.includes('app.get')) return 'app.get() metodidan foydalaning';\nif (!code.includes('/api/status')) return 'GET manzilini to\\'g\\'ri kiriting';\nif (!code.includes('res.json')) return 'res.json() orqali javob qaytaring';"
    },
    {
      id: 2,
      title: "Express POST va Validation",
      instruction: "POST so'rovi orqali kelgan `req.body.name` mavjudligini tekshiring. Agar bo'sh bo'lsa `400` status va `{ error: 'Name required' }` qaytaring, aks holda yangi element qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\napp.post('/api/users', (req, res) => {\n  // Validation qo'shing\n});",
      hint: "if (!req.body.name) return res.status(400).json({ error: 'Name required' });",
      test: "if (!code.includes('res.status(400)')) return '400 status kodini qaytarish esdan chiqdi';\nif (!code.includes('req.body.name')) return 'req.body.name qiymatini tekshiring';"
    },
    {
      id: 3,
      title: "React fetch yordamida GET so'rovi",
      instruction: "React component yuklanganda `http://localhost:5000/api/users` manzilidan foydalanuvchilar ro'yxatini olib, `setUsers` orqali saqlang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nfunction Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    // fetch so'rovini yozing\n  }, []);\n  return null;\n}",
      hint: "fetch('http://localhost:5000/api/users').then(res => res.json()).then(data => setUsers(data))",
      test: "if (!code.includes('fetch')) return 'fetch() funksiyasini ishlating';\nif (!code.includes('setUsers')) return 'setUsers orqali o\\'zgaruvchini yangilang';"
    },
    {
      id: 4,
      title: "Express Router yordamida modullashtirish",
      instruction: "Express.Router() obyektidan foydalanib `/` yo'liga GET so'rovi yuborilganda `{ message: 'Hello API' }` qaytaradigan router yarating va uni export qiling.",
      startingCode: "const express = require('express');\nconst router = express.Router();\n\n// Routerni yozing\n\nmodule.exports = router;",
      hint: "router.get('/', (req, res) => res.json({ message: 'Hello API' }));",
      test: "if (!code.includes('router.get')) return 'router.get() dan foydalaning';\nif (!code.includes('res.json')) return 'JSON qaytarish kerak';"
    },
    {
      id: 5,
      title: "CORS Middleware qoshish",
      instruction: "Express appiga `cors` paketini chaqirib barcha so'rovlarga ruxsat beradigan qilib ulang.",
      startingCode: "const express = require('express');\nconst cors = require('cors');\nconst app = express();\n\n// Middleware ni shu yerga yozing\n",
      hint: "app.use(cors());",
      test: "if (!code.includes('app.use(cors())')) return 'app.use(cors()) qolib ketdi';"
    },
    {
      id: 6,
      title: "URL parametrlarni olish (req.params)",
      instruction: "GET so'rovi bilan `/api/users/:id` yo'liga kelgan `id` parametrini tutib oling va JSON formatida qaytaring: `{ userId: id }`",
      startingCode: "const express = require('express');\nconst app = express();\n\napp.get('/api/users/:id', (req, res) => {\n  // id ni olib javob qaytaring\n});",
      hint: "const id = req.params.id; res.json({ userId: id });",
      test: "if (!code.includes('req.params.id')) return 'req.params dan foydalaning';\nif (!code.includes('res.json')) return 'Javobni JSON shaklida bering';"
    },
    {
      id: 7,
      title: "Query parametrlarni olish (req.query)",
      instruction: "GET so'rovi bilan `/api/search` ga kelgan `q` so'zini (query param) oling va `{ query: q }` deb qaytaring.",
      startingCode: "const express = require('express');\nconst app = express();\n\napp.get('/api/search', (req, res) => {\n  // q ni oling\n});",
      hint: "const q = req.query.q; res.json({ query: q });",
      test: "if (!code.includes('req.query.q')) return 'req.query obyektidan foydalaning';"
    },
    {
      id: 8,
      title: "Express Error Handling Middleware",
      instruction: "Barcha xatoliklarni tutuvchi express error handling middleware (4 ta parametrli funksiya) yozing va u { error: err.message } qilib JSON qaytarsin (500 status bilan).",
      startingCode: "const express = require('express');\nconst app = express();\n\n// Middleware yozing\n",
      hint: "app.use((err, req, res, next) => res.status(500).json({ error: err.message }));",
      test: "if (!code.match(/err,\\s*req,\\s*res,\\s*next/)) return 'To\\'rtta parametrdan iborat funksiya yozing (err, req, res, next)';\nif (!code.includes('res.status(500)')) return 'Status 500 bo\\'lishi kerak';"
    },
    {
      id: 9,
      title: "Axios yordamida POST so'rovi (React)",
      instruction: "React ichida `axios` kutubxonasidan foydalanib `/api/users` ga `{ name: 'Ali' }` ni POST qiling va qaytgan javobni console ga chiqaring.",
      startingCode: "import React from 'react';\nimport axios from 'axios';\n\nfunction App() {\n  const sendData = async () => {\n    // axios POST qiling\n  };\n  return <button onClick={sendData}>Send</button>;\n}",
      hint: "const response = await axios.post('/api/users', { name: 'Ali' }); console.log(response.data);",
      test: "if (!code.includes('axios.post')) return 'axios.post funksiyasidan foydalaning';\nif (!code.includes('name: \\'Ali\\'')) return 'To\\'g\\'ri ob\\'yekt jo\\'nating';"
    },
    {
      id: 10,
      title: "JWT Token olish (Authorization header)",
      instruction: "Frontenddan fetch yordamida `/api/data` ga so'rov yuboring, u yerda `Authorization` headeriga `Bearer my-token` yozing.",
      startingCode: "async function getData() {\n  // fetch qiling\n}",
      hint: "fetch('/api/data', { headers: { 'Authorization': 'Bearer my-token' } })",
      test: "if (!code.includes('Authorization')) return 'Authorization sarlavhasi (header) bo\\'lishi shart';\nif (!code.includes('Bearer')) return 'Bearer so\\'zi kiritilishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "REST API nima uchun xizmat qiladi?",
      options: [
        "Client va Server o'rtasida JSON yoki XML formatida ma'lumot almashish uchun",
        "Brauzerga CSS va HTML fayllarni ulash uchun",
        "Ma'lumotlar bazasini o'chirish uchun faqatgina ishlash qoidalari",
        "Faqat React loyihalarini Node.js da yuritish uchun"
      ],
      answer: "Client va Server o'rtasida JSON yoki XML formatida ma'lumot almashish uchun",
      explanation: "REST API client va server o'rtasida muloqotni ta'minlaydigan ko'prikdir."
    },
    {
      id: 2,
      question: "Statelessness (Hotsizlik) nima?",
      options: [
        "Server avvalgi so'rovlar haqida hech qanday holat saqlamaydi",
        "Server har bir foydalanuvchining sessiyasini uzoq muddat ushlab turadi",
        "Client o'z holatini o'zgartira olmasligi",
        "Xotiraning (RAM) to'lib ketish xatosi"
      ],
      answer: "Server avvalgi so'rovlar haqida hech qanday holat saqlamaydi",
      explanation: "Har bir so'rov mustaqil va barcha ma'lumotni (masalan, tokenni) o'zida mujassam qiladi."
    },
    {
      id: 3,
      question: "JSON.stringify() nimaga kerak?",
      options: [
        "JavaScript obyektini tarmoq orqali jo'natish uchun JSON matnga aylantiradi",
        "JSON matnini JavaScript obyektiga o'tkazadi",
        "CSS animatsiyalarini ishga tushirish uchun",
        "Serverda xatoliklarni matn ko'rinishida saqlash uchun"
      ],
      answer: "JavaScript obyektini tarmoq orqali jo'natish uchun JSON matnga aylantiradi",
      explanation: "Serialization qismi: obyektni jo'natish uchun yaroqli matnga (string) aylantiradi."
    },
    {
      id: 4,
      question: "Express.js dagi app.use(express.json()) nima qiladi?",
      options: [
        "Kelayotgan JSON formatdagi POST/PUT so'rovlarini req.body obyekti qilib beradi",
        "Barcha javoblarni HTML formatga o'tkazadi",
        "CORS xatoliklarini oldini oladi",
        "Server portini 3000 ga almashtiradi"
      ],
      answer: "Kelayotgan JSON formatdagi POST/PUT so'rovlarini req.body obyekti qilib beradi",
      explanation: "Agar bu middleware yozilmasa, req.body har doim undefined bo'ladi."
    },
    {
      id: 5,
      question: "N+1 muammosi qachon paydo bo'ladi?",
      options: [
        "Ro'yxatning har bir elementi uchun ma'lumotlar bazasiga qo'shimcha so'rov jo'natilganda",
        "Foydalanuvchi bir tugmani ketma-ket bir necha marta bosganda",
        "Server 1 dan ortiq faylni yuborolmay qolganda",
        "Port band bo'lganda (masalan, 3000 port)"
      ],
      answer: "Ro'yxatning har bir elementi uchun ma'lumotlar bazasiga qo'shimcha so'rov jo'natilganda",
      explanation: "N+1 so'rovlar sonining ortib ketishi server samaradorligini pasaytiradi."
    },
    {
      id: 6,
      question: "JWT qayerda saqlanishi kerak?",
      options: [
        "LocalStorage yoki HttpOnly Cookie larda",
        "Oddiy JavaScript o'zgaruvchilarida",
        "URL manzilidagi path'da",
        "Faqat serverning o'zida, front endda umuman saqlanmaydi"
      ],
      answer: "LocalStorage yoki HttpOnly Cookie larda",
      explanation: "Xavfsizlik nuqtai nazaridan tokenni Cookie (HttpOnly) larda yoki localStorage'da saqlash tavsiya etiladi."
    },
    {
      id: 7,
      question: "Qaysi HTTP metodi idempotent emas?",
      options: [
        "POST",
        "GET",
        "PUT",
        "DELETE"
      ],
      answer: "POST",
      explanation: "POST so'rovi takror yuborilsa, har safar yangi resurs yaratadi, shuning uchun idempotent emas."
    },
    {
      id: 8,
      question: "CORS (Cross-Origin Resource Sharing) muammosining sababi nima?",
      options: [
        "Brauzer boshqa domenlardan (masalan 3000 portdan 5000 portga) keladigan javoblarni xavfsizlik uchun bloklashi",
        "Express server ishga tushmay qolishi",
        "JSON formatda sintaksis xato yozilganligi",
        "React ilovasining build qilinmaganligi"
      ],
      answer: "Brauzer boshqa domenlardan (masalan 3000 portdan 5000 portga) keladigan javoblarni xavfsizlik uchun bloklashi",
      explanation: "Shu sababli serverda cors() middleware'dan foydalanish talab etiladi."
    },
    {
      id: 9,
      question: "Express Router ning asosiy vazifasi nima?",
      options: [
        "Marshrutlarni alohida fayllarga modullashtirib, tartibga solish",
        "Ma'lumotlar bazasiga ulanishni ta'minlash",
        "Faqat HTML sahifalarini frontendga jo'natish",
        "IP manzillarni yashirish"
      ],
      answer: "Marshrutlarni alohida fayllarga modullashtirib, tartibga solish",
      explanation: "Router katta ilovalardagi har xil API yo'llarini (/users, /products) bo'lib yozishga yordam beradi."
    },
    {
      id: 10,
      question: "201 Created status kodi nimani bildiradi?",
      options: [
        "So'rov muvaffaqiyatli bajarildi va yangi resurs yaratildi",
        "Ma'lumot topilmadi (Not found)",
        "Server tomonda ichki xatolik yuz berdi",
        "Foydalanuvchining kirishga huquqi yo'q (Unauthorized)"
      ],
      answer: "So'rov muvaffaqiyatli bajarildi va yangi resurs yaratildi",
      explanation: "Odatda POST so'rovidan keyin yangi element saqlanganda javob sifatida yuboriladi."
    },
    {
      id: 11,
      question: "req.params va req.query farqi nima?",
      options: [
        "req.params URLning yo'l qismidan (/:id), req.query esa so'roq belgisidan keyingi (/?q=) qiymatlarni oladi",
        "req.params body qismini, req.query faqat sarlavhani bildiradi",
        "Hech qanday farqi yo'q, ikkalasi ham POST so'rovda ishlaydi",
        "req.params faqat Expressda, req.query esa Reactda bo'ladi"
      ],
      answer: "req.params URLning yo'l qismidan (/:id), req.query esa so'roq belgisidan keyingi (/?q=) qiymatlarni oladi",
      explanation: "params route-ning dinamik qismini ifodalasa, query qidiruv argumentlarini tashlaydi."
    },
    {
      id: 12,
      question: "req.body da malumot kelishi uchun POST so'rovda qaysi header bo'lishi kerak?",
      options: [
        "Content-Type: application/json",
        "Authorization: Bearer token",
        "Accept: text/html",
        "CORS: true"
      ],
      answer: "Content-Type: application/json",
      explanation: "Bu sarlavha serverga kelayotgan malumot JSON ekanini aytadi, shunda express.json() uni obyektga ogiradi."
    }
  ]
};
