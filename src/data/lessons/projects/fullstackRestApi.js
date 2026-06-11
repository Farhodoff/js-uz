export const fullstackRestApi = {
  id: "p3",
  title: "Loyiha: Express.js va React REST API (Full-stack)",
  theory: `## 1. NEGA VA NIMA?
Zamonaviy veb-ilovalarning aksariyati **Client-Server** arxitekturasida ishlaydi. Bu yerda foydalanuvchi interfeysi (Frontend) va ma'lumotlar bilan ishlovchi server (Backend) bir-biridan mustaqil bo'ladi. Ular o'zaro **REST API** protokoli orqali JSON formatida ma'lumot almashadi.

Ushbu loyihada siz **Express.js**da ma'lumotlar omborini boshqaradigan backend server va uni vizual ko'rsatadigan **React** frontend qismini qurasiz!

---

## 2. CLIENT-SERVER ALOQASI
REST API amallarini quyidagi ketma-ketlik sxemasida ko'rishimiz mumkin:

\`\`\`mermaid
sequenceDiagram
    participant React as React Frontend (Client)
    participant Express as Express.js (Server)
    participant DB as Memory/Database (State)
    
    React->>Express: GET /api/todos (Suro'v yuborish)
    Express->>DB: Ma'lumotlarni o'qish
    DB-->>Express: Todos ro'yxati
    Express-->>React: 200 OK + JSON Data

    React->>Express: POST /api/todos {text: "Yangi vazifa"}
    Express->>DB: Yangi element qo'shish
    DB-->>Express: Tasdiqlash
    Express-->>React: 201 Created + Yangi Todo
\`\`\`

---

## 3. EXPRESS.JS BACKEND (Yaratish)
Backend serverimiz so'rovlarni qabul qilishi, ma'lumotni qayta ishlashi va javob qaytarishi lozim.

**Asosiy qismlar:**
1.  **CORS:** Brauzerlar xavfsizlik uchun boshqa portdan kelgan so'rovlarni bloklaydi. Buni hal qilish uchun backend'da \`cors\` middleware ishlatiladi.
2.  **body-parser (JSON parsing):** Keling so'rovlar tanasini (\`req.body\`) o'qish uchun serverga JSON parse qilishni o'rgatishimiz kerak.

**Misol:**
\`\`\`javascript
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Barcha domenlar uchun CORS ruxsat berish
app.use(express.json()); // JSON formatdagi so'rovlarni qabul qilish

let items = [
  { id: 1, name: "Node.js o'rganish" }
];

// GET: Ma'lumotlarni olish
app.get("/api/items", (req, res) => {
  res.json(items);
});

// POST: Yangi ma'lumot qo'shish
app.post("/api/items", (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(5000, () => console.log("Server 5000 portda ishga tushdi"));
\`\`\`

---

## 4. REACT FRONTEND (Bog'lash)
React frontend qismi serverdan ma'lumotlarni \`fetch\` yoki \`axios\` yordamida o'qiydi va \`useEffect\` ichida statega saqlaydi.

**Misol:**
\`\`\`javascript
import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  // Sahifa yuklanganda backenddan ma'lumot olish
  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  // Yangi elementni backendga yuborish va stateni yangilash
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const newItem = await response.json();
    setItems([...items, newItem]);
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Qo'shish</button>
      </form>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
\`\`\`

---

## 5. KO'P UCHRAYDIGAN MUAMMOLAR ⚠️
1.  **CORS Error:** Agar \`cors()\` middleware serverda ishlatilmasa, brauzer konsolida CORS xatoligi chiqadi va so'rov bloklanadi.
2.  **Bo'sh Request Body (\`undefined\`):** Serverda \`app.use(express.json())\` yoki \`body-parser\` qo'shish unutilsa, \`req.body\` har doim \`undefined\` bo'ladi.

---

## 6. TOP SAVOLLAR (Suhbatlarga tayyorgarlik) 🎯

1. **CORS nima va nega u kerak? (Middle)**
   *Javob:* Cross-Origin Resource Sharing — brauzer xavfsizlik siyosati bo'lib, bir domendan (masalan localhost:3000) boshqa domendagi (localhost:5000) resursga so'rov yuborishni nazorat qiladi. Server bunga ruxsat berishini maxsus HTTP sarlavhalari (Headers) orqali bildiradi.

2. **REST API qanday asosiy HTTP metodlardan foydalanadi? (Junior)**
   *Javob:* \`GET\` (o'qish), \`POST\` (yaratish), \`PUT\` (yangilash), \`DELETE\` (o'chirish).

3. **Status kodlarining ma'nolari qanday? (Junior)**
   *Javob:* \`200 OK\` (muvaffaqiyatli), \`201 Created\` (yangi resurs yaratildi), \`400 Bad Request\` (mijoz tomonidan noto'g'ri so'rov), \`404 Not Found\` (resurs topilmadi), \`500 Internal Server Error\` (serverda xatolik).

---

## 7. FINAL CHALLENGE 🏆
Sizning vazifangiz:
1. Loyihangizga \`DELETE /api/items/:id\` API endpoint qo'shing.
2. React frontendida har bir element yoniga "O'chirish" tugmasini qo'shib, uni backend API bilan bog'lang.
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
      title: "React fetch yordamida get so'rovi",
      instruction: "React component yuklanganda `http://localhost:5000/api/users` manzilidan foydalanuvchilar ro'yxatini olib, `setUsers` orqali saqlang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nfunction Users() {\n  const [users, setUsers] = useState([]);\n  useEffect(() => {\n    // fetch so'rovini yozing\n  }, []);\n  return null;\n}",
      hint: "fetch('http://localhost:5000/api/users').then(res => res.json()).then(data => setUsers(data))",
      test: "if (!code.includes('fetch')) return 'fetch() funksiyasini ishlating';\nif (!code.includes('setUsers')) return 'setUsers orqali o\\'zgaruvchini yangilang';"
    }
  ]
};
