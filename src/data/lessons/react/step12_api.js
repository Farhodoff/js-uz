export const step12_api = {
  title: "12-DARS: API bilan ishlash (HTTP So'rovlar)",
  content: `
# 1. 🌐 API nima va u React da qanday ishlaydi?

API (Application Programming Interface) — bu sizning React (Frontend) ilovangizni Backend (Server yoki Ma'lumotlar bazasi) bilan bog'lovchi ko'prik.
React faqat UI (oyna) chizish bilan shug'ullanadi, ma'lumotlarni o'zida saqlamaydi. Odatda ma'lumotlar serverdan JSON formatida keladi.

Buning uchun biz asosan standart JavaScript funksiyasi bo'lgan **\`fetch\`** dan yoki mashhur **\`axios\`** kutubxonasidan foydalanamiz.

---

## 2. 📥 Ma'lumot olib kelish (GET Request)

Eng ko'p qilinadigan ish: Serverdan foydalanuvchilar, postlar yoki mahsulotlar ro'yxatini olib kelib ekranda ko'rsatish.
Bu ish qachon qilinishi kerak? Komponent birinchi marta ekranga chizilayotgan paytda! 
Demak, buni **\`useEffect\`** ichida bo'sh dependency array (\`[]\`) bilan yozamiz.

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API ga so'rov yuborish
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json()) // Kelgan ma'lumotni JSON ga o'giramiz
      .then(data => {
        setUsers(data); // State ga yozamiz
        setIsLoading(false); // Yuklanishni to'xtatamiz
      })
      .catch(error => {
        console.error("Xatolik:", error);
        setIsLoading(false);
      });
  }, []); // Faqat bir marta ishlaydi

  if (isLoading) return <h2>Yuklanmoqda...</h2>;

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
\`\`\`

---

## 3. 📤 Ma'lumot jo'natish (POST Request)

Agar siz formaga yangi foydalanuvchi ma'lumotlarini kiritib "Qo'shish" tugmasini bossangiz, bu ma'lumotni serverga jo'natish (POST) kerak bo'ladi.

\`\`\`jsx
const handleAddUser = () => {
  const newUser = { name: "Farhod", age: 25 };

  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST', // Jo'natish amali ekanligini bildiramiz
    headers: {
      'Content-Type': 'application/json' // Nima formatda yuborayotganimizni aytamiz
    },
    body: JSON.stringify(newUser) // JS obyektini JSON matnga aylantirib yuboramiz
  })
  .then(res => res.json())
  .then(data => console.log("Muvaffaqiyatli qo'shildi:", data));
};
\`\`\`

---

## 4. ⚡ \`async / await\` uslubi (Zamonaviyroq)

\`then()\` larni zanjir qilib yozish o'rniga, zamonaviy \`async / await\` sintaksisidan foydalanish ancha toza kod beradi.

\`\`\`jsx
useEffect(() => {
  // useEffect ichiga asinxron funksiya yozib olamiz
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData(); // Va uni chaqirib qo'yamiz
}, []);
\`\`\`

---

## ✅ Tabriklaymiz! Siz React Asoslarini yakunladingiz!

Ushbu 12-dars bilan React.js dagi barcha poydevor bilimlarni (State, Props, Hooks, API, Routing) mukammal o'zlashtirdingiz. 
Siz endi o'z loyihalaringizni bemalol noldan qurishingiz mumkin. Bundan keyingi qadamlar – "Arxitektura", "State Management (Zustand/Redux)" va "Next.js" kabi advanced (kengaytirilgan) mavzular bo'ladi!

---

## 🧠 Chuqurlashtirilgan Nazariya: Ma'lumot Olib Kelish Hayotiy Sikli (Fetching Data Lifecycle)

React komponentida ma'lumotlarni serverdan olib kelish aniq bir ketma-ketlikda (hayotiy sikl) amalga oshadi. Quyidagi jarayonni yaxshi tushunish React dasturchisi uchun o'ta muhimdir.

1. **Component Mount (Komponent ekranga chizilishi)**: Komponent birinchi marta render qilinadi. Bu vaqtda odatda \`isLoading\` state \`true\` bo'ladi.
2. **useEffect ishga tushadi**: Komponent ekranga chizilgandan so'ng, React \`useEffect\` hook'ini ishga tushiradi.
3. **API so'rovi (fetch)**: \`useEffect\` ichidagi \`fetch\` funksiyasi serverga ma'lumot so'rab HTTP so'rovini yuboradi.
4. **Promise Resolves (Javob kelishi)**: Serverdan ma'lumot yetib kelgach, kutib turgan Promise bajariladi.
5. **State yangilanishi (setState)**: Kelgan ma'lumot \`setState\` yordamida komponent xotirasiga yoziladi. Shuningdek, \`isLoading\` holati \`false\` qilinadi.
6. **Re-render (Qayta chizilish)**: State o'zgargani uchun, React komponentni qayta render qiladi va bu safar ekranda yuklanish jarayoni emas, balki serverdan kelgan haqiqiy ma'lumotlar ko'rsatiladi.

\`\`\`mermaid
sequenceDiagram
    participant B as Brauzer (UI)
    participant C as React Komponenti
    participant E as useEffect
    participant S as API Server

    B->>C: 1. Component Mount (Ekranga chizish)
    Note over C: isLoading: true
    C->>E: 2. useEffect ishga tushadi
    E->>S: 3. fetch('api/data') GET So'rovi yuboriladi
    Note over B,C: Ekranda "Yuklanmoqda..." ko'rinadi
    S-->>E: 4. Promise Resolves (JSON data keladi)
    E->>C: 5. setState(data) va setIsLoading(false)
    C->>B: 6. Re-render (Qayta chizish)
    Note over B: Ekranda haqiqiy ma'lumotlar paydo bo'ladi
\`\`\`
`,
  code: `import React, { useState, useEffect } from "react";

export default function ApiDemo() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Komponent yuklanganda ishlaydigan API So'rov
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Ochiq API (JSONPlaceholder) dan postlarni olib kelamiz
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        
        if (!response.ok) throw new Error("Tarmoqda xatolik yuz berdi!");
        
        const data = await response.json();
        setPosts(data); // Kelgan datani state ga saqlaymiz
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Xato bo'lsa ham, muvaffaqiyatli bo'lsa ham yuklanish tugaydi
      }
    };

    fetchPosts();
  }, []);

  // 2. Yangi post qo'shish (POST so'rovi) imitatsiyasi
  const addPost = async () => {
    const newPost = { title: "Yangi post", body: "Bu mening reactdagi birinchi postim", userId: 1 };
    
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
      });
      const savedPost = await response.json();
      
      // Yangi postni eski postlar ro'yxati boshiga qo'shib qo'yamiz (Ekranda ko'rinishi uchun)
      setPosts([savedPost, ...posts]);
      alert("Muvaffaqiyatli qo'shildi!");
    } catch(e) {
      alert("Xatolik!");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>API dan kelgan Postlar:</h2>
      
      <button 
        onClick={addPost} 
        style={{ padding: "10px 20px", background: "#2ecc71", color: "white", border: "none", borderRadius: 4, cursor: "pointer", marginBottom: 20 }}
      >
        Yangi post qo'shish (POST)
      </button>

      {/* Yuklanish holati */}
      {isLoading && <p>⏳ Ma'lumotlar serverdan yuklanmoqda...</p>}

      {/* Xatolik holati */}
      {error && <p style={{ color: "red" }}>❌ Xatolik: {error}</p>}

      {/* Ma'lumotlar muvaffaqiyatli kelgan holat */}
      {!isLoading && !error && (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {posts.map(post => (
            <li key={post.id} style={{ padding: 15, border: "1px solid #ccc", marginBottom: 10, borderRadius: 8 }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50", textTransform: "capitalize" }}>{post.title}</h3>
              <p style={{ margin: 0, color: "#7f8c8d" }}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "fetch() orqali ma'lumot olish",
      instruction: "Komponent yuklanganda API'dan foydalanuvchilarni olib kelish uchun `.then` zanjirida `response.json()` dan foydalaning va natijani state ga yozing.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [users, setUsers] = useState([]);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      // shu yerda response ni json ga o'giring va state ga saqlang\n      ;\n  }, []);\n\n  return <div>Foydalanuvchilar: {users.length}</div>;\n}",
      hint: "fetch(...).then(res => res.json()).then(data => setUsers(data)) qilib yozing.",
      test: "if(!code.includes('json()')) return 'Natijani JSON ga o\\'girish esdan chiqmasin.'; if(!code.includes('setUsers')) return 'Natijani state ga yozing.'; return null;"
    },
    {
      id: 2,
      title: "isLoading holati",
      instruction: "Ma'lumotlar kelishidan oldin ekranda 'Yuklanmoqda...' chiqadi. `fetch` tugagandan keyin `.then` bloki oxirida `setIsLoading(false)` ni chaqiring.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState([]);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/posts')\n      .then(res => res.json())\n      .then(result => {\n        setData(result);\n        // Yuklanishni shu yerda to'xtating\n        \n      });\n  }, []);\n\n  if (isLoading) return <p>Yuklanmoqda...</p>;\n  return <ul>{data.map(d => <li key={d.id}>{d.title}</li>)}</ul>;\n}",
      hint: "setIsLoading(false) qiling.",
      test: "if(!code.includes('setIsLoading(false)')) return 'Yuklanishni to\\'xtatishni esdan chiqardingiz.'; return null;"
    },
    {
      id: 3,
      title: "Xatoliklarni boshqarish (.catch)",
      instruction: "Agar API da xatolik bo'lsa uni tutib olish uchun `.catch` dan foydalanib xato xabarini `setError` orqali saqlang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetch('https://xato-url.com/api')\n      .then(res => res.json())\n      .then(data => console.log(data))\n      // catch qismini shu yerda yozing va err.message ni saqlang\n      ;\n  }, []);\n\n  if (error) return <p>Xatolik: {error}</p>;\n  return <p>Ma'lumotlar keldi</p>;\n}",
      hint: ".catch(err => setError(err.message)) shaklida yozing.",
      test: "if(!code.includes('.catch') || !code.includes('setError')) return 'Xatolikni tutish uchun .catch() va setError() ishlating.'; return null;"
    },
    {
      id: 4,
      title: "async/await uslubi",
      instruction: "`.then()` o'rniga `async / await` ishlating. `fetchData` funksiyasi ichida ma'lumotni olib `setData` ga saqlang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState([]);\n\n  useEffect(() => {\n    const fetchData = async () => {\n      // await fetch va await response.json() ni ishlating\n      \n    };\n    fetchData();\n  }, []);\n\n  return <div>Ma'lumotlar: {data.length}</div>;\n}",
      hint: "const res = await fetch(...); const result = await res.json(); setData(result);",
      test: "if(!code.includes('await fetch') || !code.includes('await') || !code.includes('setData')) return 'await fetch va setData() ni ishlating.'; return null;"
    },
    {
      id: 5,
      title: "try / catch / finally bloki",
      instruction: "`async/await` ishlatsangiz xatolarni tutish va yuklanishni tugatish uchun `try`, `catch`, va `finally` ni yozing.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [isLoading, setIsLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const getData = async () => {\n      // try, catch va finally ni yozing\n      \n    };\n    getData();\n  }, []);\n\n  if (error) return <p>{error}</p>;\n  return <p>{isLoading ? 'Yuklanmoqda...' : 'Tayyor'}</p>;\n}",
      hint: "try { /* asosiy kod */ } catch(err) { /* error */ } finally { /* loading false */ }",
      test: "if(!code.includes('try') || !code.includes('catch') || !code.includes('finally')) return 'try, catch va finally bloklaridan foydalaning.'; return null;"
    },
    {
      id: 6,
      title: "POST so'rovi (Ma'lumot jo'natish)",
      instruction: "Yangi post qo'shish uchun `fetch` da method ni 'POST' deb ko'rsating, headers hamda body qo'shing.",
      startingCode: "import React from 'react';\n\nexport default function App() {\n  const handlePost = () => {\n    const newPost = { title: 'Test', body: 'Salom' };\n    fetch('https://jsonplaceholder.typicode.com/posts', {\n      // shu yerda method, headers, va body ni to'ldiring\n      \n    })\n    .then(res => res.json())\n    .then(data => console.log(data));\n  };\n  return <button onClick={handlePost}>Jo'natish</button>;\n}",
      hint: "method: 'POST', body: JSON.stringify(newPost) bo'lishi lozim",
      test: "if(!code.includes('method') || !code.includes('POST') || !code.includes('JSON.stringify')) return 'method: POST va body: JSON.stringify() bo\\'lishi kerak.'; return null;"
    },
    {
      id: 7,
      title: "API dan kelgan ma'lumotlarni map qilish",
      instruction: "API dan kelgan posts massivini `map` yordamida aylanib chiqib, har bir postning `.title` ni ko'rsating.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [posts, setPosts] = useState([]);\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')\n      .then(res => res.json())\n      .then(data => setPosts(data));\n  }, []);\n\n  return (\n    <ul>\n      {/* posts ro'yxatini map qiling, va har birini <li key={post.id}>{post.title}</li> orqali chiqaring */}\n      \n    </ul>\n  );\n}",
      hint: "{posts.map(post => <li key={post.id}>{post.title}</li>)}",
      test: "if(!code.includes('posts.map') || !code.includes('key=') || !code.includes('<li')) return 'map yordamida <li> elementlarini hosil qiling va key bering.'; return null;"
    },
    {
      id: 8,
      title: "Dinamik API URL (Parametrlar)",
      instruction: "`fetch` yordamida id ga tegishli postni olish uchun URL manzilning oxiriga `id` o'zgaruvchisini biriktiring.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [id, setId] = useState(1);\n  const [post, setPost] = useState(null);\n\n  useEffect(() => {\n    // URL oxiriga id ni qo'shing\n    fetch(`https://jsonplaceholder.typicode.com/posts/`)\n      .then(res => res.json())\n      .then(data => setPost(data));\n  }, [id]);\n\n  return (\n    <div>\n      <input type=\"number\" value={id} onChange={e => setId(e.target.value)} />\n      <p>{post ? post.title : 'Kuting...'}</p>\n    </div>\n  );\n}",
      hint: "fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)",
      test: "if(!code.includes('${id}') && !code.includes('+ id') && !code.includes('+id')) return 'URL ga id ni dinamik ravishda biriktiring.'; return null;"
    },
    {
      id: 9,
      title: "Tugma bosilganda API chaqirish",
      instruction: "`fetchUser` funksiyasini tugmaning `onClick` hodisasiga bog'lang.",
      startingCode: "import React, { useState } from 'react';\n\nexport default function App() {\n  const [user, setUser] = useState(null);\n\n  const fetchUser = async () => {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\n    const data = await res.json();\n    setUser(data);\n  };\n\n  return (\n    <div>\n      {/* Shu tugmaga fetchUser ni bog'lang */}\n      <button>Foydalanuvchini olib kelish</button>\n      {user && <p>{user.name}</p>}\n    </div>\n  );\n}",
      hint: "<button onClick={fetchUser}>",
      test: "if(!code.includes('onClick={fetchUser}')) return 'Tugmaga onClick hodisasini qo\\'shing.'; return null;"
    },
    {
      id: 10,
      title: "Ikkita API ni baravar chaqirish",
      instruction: "`Promise.all` ichiga ikkita turli `fetch` so'rovlarini joylashtiring.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState({ users: 0, posts: 0 });\n\n  useEffect(() => {\n    const loadAll = async () => {\n      // Promise.all ichida fetch yozing\n      const [resUsers, resPosts] = await Promise.all([\n        \n      ]);\n      const users = await resUsers.json();\n      const posts = await resPosts.json();\n      setData({ users: users.length, posts: posts.length });\n    };\n    loadAll();\n  }, []);\n\n  return <p>Users: {data.users}, Posts: {data.posts}</p>;\n}",
      hint: "fetch('.../users'), fetch('.../posts') qo'shing",
      test: "if(!code.includes('fetch(')) return 'Promise.all ichida fetch so\\'rovlarini yozing.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "API (Application Programming Interface) nima?",
      options: [
        "Frontend va Backend ni bog'lovchi ko'prik",
        "Faqat ma'lumotlar bazasi",
        "Brauzerning dizayn yaratish vositasi",
        "Reactning maxsus hooki"
      ],
      correctAnswer: 0,
      explanation: "API orqali mijoz (Frontend) va server (Backend) bir-biri bilan qoida doirasida ma'lumot almashadi."
    },
    {
      question: "React da API so'rovlarini qayerda yozish eng to'g'ri hisoblanadi?",
      options: [
        "To'g'ridan-to'g'ri return () ichida",
        "Komponent tashqarisida e'lon qilib, har safar renderda chaqirib",
        "useEffect ichida (odatda bo'sh dependency array bilan)",
        "State parametriga to'g'ridan-to'g'ri fetch beriladi"
      ],
      correctAnswer: 2,
      explanation: "Odatda API lardan ma'lumot olish 'Side effect' hisoblanadi va komponent to'liq chizilgandan keyin bir marta ishlashi uchun useEffect va [] bilan bajariladi."
    },
    {
      question: "fetch() da default HTTP metodi qaysi biri?",
      options: [
        "POST",
        "GET",
        "PUT",
        "DELETE"
      ],
      correctAnswer: 1,
      explanation: "fetch() faqat URL bilan chaqirilsa, avtomatik ravishda GET metodidan foydalanadi (ya'ni serverdan ma'lumot o'qish uchun)."
    },
    {
      question: "API dan ma'lumot olishda nima uchun `.json()` metodidan foydalanamiz?",
      options: [
        "HTML ni React ga o'girish uchun",
        "Kelgan javob (response) ni JS obyekti yoki massiviga (JSON) aylantirish uchun",
        "Xatolarni avtomatik to'g'irlash uchun",
        "Backend dan kelgan ma'lumotni shifrlash uchun"
      ],
      correctAnswer: 1,
      explanation: "HTTP so'rovlar matn ko'rinishida javob beradi. Uni JavaScript da ishlata olish uchun JSON formatdagi matnni JS obyektiga o'girish kerak."
    },
    {
      question: "Serverga yangi ma'lumot yuborish (POST) uchun `fetch` da body qanday formatda yuborilishi kerak?",
      options: [
        "JS obyektida (to'g'ridan-to'g'ri body: { ... })",
        "Form obyekti ko'rinishida qat'iy",
        "JSON matn ko'rinishida (JSON.stringify() yordamida)",
        "Shifrlangan HTML ko'rinishida"
      ],
      correctAnswer: 2,
      explanation: "HTTP orqali ma'lumot yuborishda u JSON format ekanligini tushuntirish uchun JSON.stringify(obj) bilan matnga o'giramiz."
    },
    {
      question: "isLoading state (yuklanish holati) qachon false qilinadi?",
      options: [
        "useEffect ni boshida",
        "Faqatgina ma'lumot muvaffaqiyatli kelganida (.then ichida)",
        "API so'rov tugagach, xoh muvaffaqiyatli xoh xatolik bo'lsa ham (.finally yoki oxirida)",
        "Uni hech qachon false qilib bo'lmaydi"
      ],
      correctAnswer: 2,
      explanation: "Muvaffaqiyatli kelsa ham, xato kelsa ham yuklanish (loading) holati to'xtatilishi kerak."
    },
    {
      question: "async / await uslubidan nima sababdan foydalanamiz?",
      options: [
        "Dastur ishlash tezligini 10 barobar oshirish uchun",
        "Server bilan aloqani himoyalash uchun",
        "React ni maxsus talabi bo'lgani uchun",
        ".then() zanjirlarini ko'paytirib yubormaslik, kodni toza va tushunarli qilish uchun"
      ],
      correctAnswer: 3,
      explanation: "async/await bu Promiselarni yozishning yangi sintaksisi bo'lib, sinxron kod kabi o'qilishini ta'minlaydi."
    },
    {
      question: "useEffect ichida async funksiya yozishning to'g'ri yo'li qaysi?",
      options: [
        "useEffect(async () => { ... })",
        "useEffect(() => { const fetchData = async () => { ... }; fetchData(); }, [])",
        "async useEffect(() => { ... })",
        "useEffect yordamida async qilib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "React da useEffect o'zi Promise (async) qaytarmasligi kerak. Shu sabab ichida alohida async funksiya yaratib uni chaqirish talab qilinadi."
    },
    {
      question: "try ... catch blokining catch qismi nima vazifani bajaradi?",
      options: [
        "Ma'lumotlarni cache ga saqlaydi",
        "API dan kelgan obyektlarni massivga aylantiradi",
        "API ga yuborishda so'rovni bekor qiladi",
        "Agar try ichidagi kodda xatolik yuz bersa (masalan url noto'g'ri), dastur buzilmasligi uchun xatoni ushlab oladi"
      ],
      correctAnswer: 3,
      explanation: "Asinxron ishlarda xatoliklarni xavfsiz boshqarish (error handling) uchun try/catch ishlatiladi."
    },
    {
      question: "Xatolik bor yoki yo'qligini qaysi response parametri orqali tekshirish yaxshi amaliyot?",
      options: [
        "response.isError",
        "response.ok",
        "response.success",
        "response.hasError"
      ],
      correctAnswer: 1,
      explanation: "fetch da 404 status kelsa ham catch tushmaydi. Buning uchun 'if (!response.ok)' orqali qo'lda tekshirish eng to'g'ri yo'l."
    },
    {
      question: "Agar useEffect ichida `[]` qavslar qo'yilmasa API so'rovi qanday ishlaydi?",
      options: [
        "Faqatgina 1 marta ishlaydi",
        "Hech qachon ishlamaydi",
        "Har bir render bo'lganda API chaqirilib, bu cheksiz zanjir (infinite loop) ga aylanib ketishi mumkin",
        "Faqat tugma bosilganda ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Bo'sh massiv qo'yilmasa, useEffect har safar ishlaganda qayta ishlayveradi va cheksiz so'rovlarni keltirib chiqaradi."
    },
    {
      question: "Komponent unmount bo'lganda API so'rovini qanday bekor qilish mumkin?",
      options: [
        "clearTimeout yordamida",
        "AbortController va cleanup funksiyasi yordamida",
        "API o'zi avtomatik bekor bo'ladi",
        "Reactda buni iloji yo'q"
      ],
      correctAnswer: 1,
      explanation: "fetch so'rovlarini bekor qilish uchun AbortController ishlatamiz va useEffect ning cleanup funksiyasida (.abort()) ni chaqiramiz."
    }
  ]
};
