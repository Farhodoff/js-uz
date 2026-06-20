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
      title: "fetch() ni ishlatish",
      instruction: "Quyidagi kodda API chaqirilgan, lekin natija JSON ga o'girilmagan. Kodni to'g'irlab, `.then(response => response.json())` qo'shib, keyin data ni state ga yozadigan qiling.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState([]);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      // Shu yerda response ni JSON ga aylantirish qolib ketgan!\n      .then(data => setData(data));\n  }, []);\n\n  return <div>Foydalanuvchilar soni: {data.length}</div>;\n}",
      hint: "fetch(...).then(res => res.json()).then(data => setData(data)) qilib yozing.",
      test: "if (!code.includes('res.json()') && !code.includes('response.json()')) return 'Foydalanuvchi ma\\'lumotini avval json() ga o\\'giring!'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React da API so'rovlarini (HTTP GET) komponentning qayerida yozish eng to'g'ri hisoblanadi?",
      options: [
        "To'g'ridan-to'g'ri return () ichida",
        "Komponent e'lon qilinishidan oldin (tashqarida)",
        "useEffect ichida (bo'sh dependency array bilan)",
        "useState ichida parametr qilib yuboriladi"
      ],
      correctAnswer: 2,
      explanation: "API lardan ma'lumot olish bu Yon Ta'sir (Side Effect) hisoblanadi. Shuning uchun u albatta useEffect ichida qilinishi kerak. Bo'sh massiv [] berilsa, u cheksiz chaqirilavermasdan faqat bir marta (mount bo'lganda) ishlaydi."
    },
    {
      question: "Serverga ma'lumot jo'natish (POST) va uni o'qish (GET) farqi nima?",
      options: [
        "Umuman farqi yo'q, fetch doim bir xil ishlaydi",
        "GET so'rovida qandaydir 'body' (tana) yuborib bo'lmaydi va u ma'lumotni olib keladi. POST da esa 'method: POST' qilib ko'rsatiladi va 'body' orqali ma'lumot yuboriladi.",
        "POST bepul api lar uchun ishlamaydi",
        "GET faqat Google Chrome da ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "fetch() ni o'zi faqat url bilan ishlatilsa avtomatik GET so'rovi bo'ladi. POST qilish uchun ikkinchi parametr sifatida obyekt (options) berilib, method, headers va body ni ko'rsatish shart."
    }
  ]
};
