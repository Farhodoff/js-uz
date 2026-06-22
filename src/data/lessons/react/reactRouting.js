export const reactRouting = {
  id: "reactRouting",
  title: "Routing: React Router v6+",
  content: `
# Routing: React Router v6+

React o'z tabiati bo'yicha "Single Page Application" (SPA - Yagona Sahifali Ilova) hisoblanadi. Bu degani, brauzer serverdan faqat bitta \`index.html\` faylini yuklab oladi va qolgan barcha ishlarni JavaScript bajaradi. 

Lekin foydalanuvchi "Biz haqimizda" (About) yoki "Aloqa" (Contact) sahifalariga kirganda URL o'zgarishi va shunga mos komponentlar ko'rsatilishi kerak. Brauzerni qayta yuklamasdan (reload qilmasdan) sahifalarni almashtirish mexanizmi **Client-Side Routing (Mijoz tomonida marshrutlash)** deb ataladi.

Buning uchun React olamidagi eng mashhur standart kutubxona — **React Router** ishlatiladi.

## 1. Asosiy tushunchalar

Loyihaga React Routerni o'rnatamiz:
\`npm install react-router-dom\`

Eng asosiy komponentlar:
- **\`<BrowserRouter>\`**: Butun ilovani qamrab olishi kerak (odatda \`index.js\` da).
- **\`<Routes>\`**: Barcha yo'nalishlarni (marshrutlarni) o'zida saqlovchi quti.
- **\`<Route>\`**: Ma'lum bir URL ga qaysi komponent mos kelishini belgilaydi.
- **\`<Link>\`**: Oddiy HTML dagi \`<a href>\` ning React uchun o'zgartirilgan, sahifani yangilamaydigan versiyasi.

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      {/* Navigatsiya qismi doim ko'rinib turadi */}
      <nav>
        <Link to="/">Bosh sahifa</Link> | <Link to="/about">Biz haqimizda</Link>
      </nav>

      {/* URL ga qarab o'zgaradigan qism */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Yo'q sahifaga kirganda (404 Not Found) */}
        <Route path="*" element={<h1>Sahifa topilmadi</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## 2. Asosiy Hooklar (v6+)

React Router v6 o'zining sodda va qudratli hooklari bilan ajralib turadi:

### A) \`useNavigate\` (Sahifaga yo'naltirish)
\`<Link>\` foydalanuvchi bosishi uchun kerak. Lekin agar siz funksiya ichida (masalan, login tugmachasi bosilgach) foydalanuvchini boshqa sahifaga otmoqchi bo'lsangiz \`useNavigate\` kerak bo'ladi.

\`\`\`jsx
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Parol tekshirildi...
    // Foydalanuvchini Dashboard sahifasiga yuborish:
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Kirish</button>;
}
\`\`\`

### B) \`useParams\` (Dinamik URL larni o'qish)
Agar URL da id kabi dinamik qismlar bo'lsa (\`/users/123\`), ularni ajratib olish uchun.

\`\`\`jsx
// App.js dagi route: <Route path="/users/:id" element={<UserProfile />} />

import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams(); // URL dan "123" ni oladi
  return <h1>Foydalanuvchi ID: {id}</h1>;
}
\`\`\`

### C) \`useSearchParams\` (So'rov parametrlarini o'qish va yozish)
URL oxiridagi \`?name=ali&sort=asc\` kabi parametrlarni xuddi \`useState\` kabi boshqaradi.

\`\`\`jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || ''; // 'q' ni o'qiydi

  return (
    <input 
      value={q} 
      onChange={(e) => setSearchParams({ q: e.target.value })} 
    />
  );
}
\`\`\`

## 3. Nested Routes (Ichma-ich sahifalar) va \`<Outlet>\`

Vaqti keladi, sizda bitta asosiy sahifa (masalan Admin Panel) va uning ichida o'zgaruvchi kichik sahifalar bo'ladi. V6 da buning uchun \`<Outlet>\` ishlatiladi. Bu ota komponent ichida "bola komponentlar chiqadigan oyna (tirqish)" degani.

\`\`\`jsx
// ROUTE QISMI:
<Routes>
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="users" element={<UsersList />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

// ADMIN LAYOUT KOMPONENTI:
import { Link, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <aside> {/* Yon Menu */}
        <Link to="users">Foydalanuvchilar</Link>
        <Link to="settings">Sozlamalar</Link>
      </aside>
      <main>
        {/* Shu yerga bolalar (UsersList yoki Settings) kelib tushadi */}
        <Outlet /> 
      </main>
    </div>
  );
}
\`\`\`

## 4. Yangi avlod: Data Router (\`createBrowserRouter\`)

React Router v6.4 dan boshlab sahifa yuklanmasidan avval API larni chaqirish (loader) va formalarni jo'natish (action) uchun yepyangi Data API taqdim etildi. Bu kelajakdagi (va Next.js dagi) standartlarga juda yaqin. Uni ishlatish uchun \`<BrowserRouter>\` o'rniga obyektlar orqali router yaratiladi:

\`\`\`jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
    // Sahifa render bo'lishidan oldin ishlaydi!
    loader: async () => {
      return fetch('/api/products');
    }
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
\`\`\`
  `,
  code: `import React, { useState } from "react";
// Odatda bular 'react-router-dom' dan olinadi. 
// Bu yerda ularni sodda holatda simulyatsiya qilyapmiz:

// Simulyatsiya qilingan hooklar
function useNavigate() {
  return (path) => console.log("Navigate called to:", path);
}

// 1. Asosiy Layout (Outlet ishlatilgan)
const DashboardLayout = ({ currentPath, setPath }) => {
  return (
    <div style={{ display: "flex", height: "300px", border: "1px solid #ccc" }}>
      {/* Yon menyu (Sidebar) doim joyida qoladi */}
      <div style={{ width: "200px", background: "#f0f0f0", padding: "10px" }}>
        <h3>Menu</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><button onClick={() => setPath('/dashboard')}>Dashboard Home</button></li>
          <li><button onClick={() => setPath('/dashboard/stats')}>Statistika</button></li>
          <li><button onClick={() => setPath('/dashboard/settings')}>Sozlamalar</button></li>
        </ul>
      </div>

      {/* Asosiy oyna (Outlet vazifasini bajaruvchi qism) */}
      <div style={{ padding: "20px", flex: 1 }}>
        {/* Aslida bu yerda <Outlet /> turadi va URL ga qarab ichi o'zgaradi */}
        {currentPath === '/dashboard' && <h2>Hush kelibsiz!</h2>}
        {currentPath === '/dashboard/stats' && <h2>📈 Bu yerda grafiklar...</h2>}
        {currentPath === '/dashboard/settings' && <h2>⚙️ Sozlamalar menyusi</h2>}
      </div>
    </div>
  );
};

export default function App() {
  const [path, setPath] = useState('/dashboard');
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>React Router (Simulyatsiya)</h2>
      <p>Hozirgi URL: <strong>http://localhost:3000{path}</strong></p>
      
      <button 
        onClick={() => {
          navigate('/login'); 
          alert("Tizimdan chiqildi, Loginga yo'naltirildi!");
        }}
        style={{ marginBottom: "20px", background: "#ff4d4f", color: "white" }}
      >
        Chiqish (useNavigate)
      </button>

      {/* Router tizimi */}
      <DashboardLayout currentPath={path} setPath={setPath} />
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "useNavigate orqali yo'naltirish",
      description: "Quyidagi tugma bosilganda foydalanuvchini \`/profile\` sahifasiga yo'naltiring.",
      startingCode: `import React from 'react';\nimport { useNavigate } from 'react-router-dom';\n\nexport default function GoProfile() {\n  // VAZIFA: useNavigate hookini ishlating va navigate deb nomlang\n\n  const handleGo = () => {\n    // VAZIFA: '/profile' manziliga o'tkazing\n  };\n\n  return <button onClick={handleGo}>Profilga o'tish</button>;\n}`,
      solution: `import React from 'react';\nimport { useNavigate } from 'react-router-dom';\n\nexport default function GoProfile() {\n  const navigate = useNavigate();\n\n  const handleGo = () => {\n    navigate('/profile');\n  };\n\n  return <button onClick={handleGo}>Profilga o'tish</button>;\n}`,
      hint: "\`const navigate = useNavigate();\` va \`navigate('/profile');\`"
    },
    {
      id: 2,
      title: "useParams dan parametrni o'qish",
      description: "URL manzili \`/posts/:postId\` ko'rinishida bo'lsa, \`postId\` ni o'qib olib ekranga chiqaring.",
      startingCode: `import React from 'react';\nimport { useParams } from 'react-router-dom';\n\nexport default function PostDetail() {\n  // VAZIFA: useParams orqali 'postId' ni oling\n\n  return (\n    <div>\n      {/* VAZIFA: Post ID ni chiqaring */}\n      <h1>Post ID: </h1>\n    </div>\n  );\n}`,
      solution: `import React from 'react';\nimport { useParams } from 'react-router-dom';\n\nexport default function PostDetail() {\n  const { postId } = useParams();\n\n  return (\n    <div>\n      <h1>Post ID: {postId}</h1>\n    </div>\n  );\n}`,
      hint: "\`const { postId } = useParams();\` qilib obyektdan ajratib (destructure) oling."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nega oddiy HTML <a> tegi o'rniga React Router ning <Link> komponenti ishlatiladi?",
      options: [
        "Chunki <Link> chiroyliroq ko'rinadi",
        "<a> tegi sahifani butunlay qayta yuklaydi (reload). <Link> esa sahifani yangilamasdan, faqatgina JavaScript orqali DOM ni o'zgartiradi",
        "<Link> xavfsizroq va xakerlardan himoyalangan",
        "Aslida farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Single Page Application larning butun mazmuni shunda: Oq ekran chiqib brauzer aylanishi kerak emas, hamma narsa tez va 'yumshoq' o'tishi lozim."
    },
    {
      id: 2,
      question: "<Outlet> komponenti qachon ishlatiladi?",
      options: [
        "Faqat tashqi linklarga o'tish uchun",
        "React ilovasidan chiqib ketish uchun",
        "Ichma-ich marshrutlarda (Nested Routes) ota komponent ichida bola komponentlar qayerda render bo'lishini ko'rsatish uchun",
        "Serverga ma'lumot jo'natish (Output) uchun"
      ],
      correctAnswer: 2,
      explanation: "<Outlet> xuddi 'tirqish' (slot) ga o'xshaydi. Ota Layout o'zining Yon Menyusini chizadi va <Outlet /> qo'ygan joyiga URL ga mos bola komponent kelib tushaveradi."
    },
    {
      id: 3,
      question: "URL da '/products/45' kabi o'zgaruvchi qism bo'lsa, o'sha '45' ni o'qib olish uchun qaysi hook ishlatiladi?",
      options: [
        "useSearchParams",
        "useNavigate",
        "useParams",
        "useLocation"
      ],
      correctAnswer: 2,
      explanation: "useParams - yo'l (path) ichidagi dinamik parametrlarni (id, slug) o'qish uchun mo'ljallangan."
    },
    {
      id: 4,
      question: "JavaScript funksiyasi ichida (masalan, if sharti to'g'ri bo'lsa) sahifani almashtirish uchun nima ishlatamiz?",
      options: [
        "window.location.href = '/'",
        "Yangi <Link> yasab, uni bosishni dasturlash",
        "useNavigate() orqali navigate('/')",
        "<Route redirect='/' />"
      ],
      correctAnswer: 2,
      explanation: "Programmatik yo'naltirish (Programmatic Navigation) uchun v6 da faqat useNavigate() ishlatiladi. window.location.href esa React Routerni aylanib o'tib sahifani butunlay yangilab yuboradi (bu xato)."
    }
  ]
};
