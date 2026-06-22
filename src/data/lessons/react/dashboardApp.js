export const dashboardApp = {
  id: "dashboardApp",
  title: "Admin Dashboard (React Router v6+)",
  content: `
# Yakuniy Loyiha 3: Admin Dashboard (Nested Routing)

Har qanday yirik platformaning (masalan, e-commerce, CRM, ta'lim platformalari) orqa fonida ma'murlar (Adminlar) boshqaradigan yopiq sahifa — **Admin Dashboard** bo'ladi.

Dashboard ning asosiy xususiyatlari:
1. **Yopiqlik (Protected):** Tizimga kirmaganlar (login qilinmaganlar) u yerga kira olmaydi.
2. **Qolipli (Layout):** Chap tomondagi menyu (Sidebar) va Tepadagi navigatsiya (Navbar) sahifadan sahifaga o'tganda joyidan qimirlamaydi. Faqatgina o'rtadagi asosiy kontent o'zgaradi.
3. **Ichma-ich Yo'nalishlar (Nested Routes):** \`/admin/users\`, \`/admin/settings\` kabi manzil ierarxiyasi bo'ladi.

Bularning barchasini **React Router v6+** da qanday mukammal qilishni o'rganamiz.

## 1. Marshrutlarni (Routes) sozlash

Dashboard dagi barcha kichik sahifalar \`<AdminLayout>\` deb nomlangan ota komponentning ichida (\`Outlet\` yordamida) ochiladi.

\`\`\`jsx
// App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  // Haqiqiy dasturda bu state serverdan yoki LocalStorage dan olinadi
  const isAuthenticated = true; 

  // Himoyalangan Marshrut Komponenti (Protected Route)
  const RequireAuth = ({ children }) => {
    if (!isAuthenticated) {
      // Agar tizimga kirmagan bo'lsa, Loginga haydaymiz
      return <Navigate to="/login" replace />; 
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* ADMIN QISMI */}
        <Route 
          path="/admin" 
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          {/* Outlet ichiga quyidagilar ketadi */}
          <Route path="users" element={<Users />} />        {/* /admin/users */}
          <Route path="settings" element={<Settings />} />  {/* /admin/settings */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## 2. Layout Komponenti (\`<Outlet>\` mo'jizasi)

Layout bu — o'zgarmas "Rom" (Ramka). Yon tomonga Sidebar ni chizib olamiz, o'ng tomondagi bo'sh oyna ichiga esa \`<Outlet />\` deb yozamiz. React Router avtomatik tarzda URL ga qarab \`Users\` yoki \`Settings\` komponentlarini o'sha \`<Outlet>\` turgan joyga qo'yib beradi.

\`\`\`jsx
// layouts/AdminLayout.js
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css'; // Stil qo'shilgan deb faraz qilamiz

export default function AdminLayout() {
  return (
    <div className="dashboard-container">
      
      {/* 1. O'ZGARMAS YON MENU (SIDEBAR) */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin/users">👥 Foydalanuvchilar</Link></li>
            <li><Link to="/admin/settings">⚙️ Sozlamalar</Link></li>
            <li><button onClick={() => alert("Chiqish!")}>🚪 Chiqish</button></li>
          </ul>
        </nav>
      </aside>

      {/* 2. O'ZGARUVCHAN ASOSIY OYNA */}
      <main className="main-content">
        <header>
          Boshqaruv oynasi
        </header>

        <div className="content-area">
          {/* URL o'zgarganda faqat shu qism qayta chiziladi */}
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}
\`\`\`

## 3. Dinamik sahifalar (URL parametrlar)

Aytaylik, Admin "Foydalanuvchilar" (Users) ro'yxatini ko'ryapti va bittasining ustiga bosdi. U \`/admin/users/123\` sahifasiga o'tadi. O'sha \`123\` (ID) raqamini qanday olib, aynan shu user haqida ma'lumotni bazadan tortamiz?
Buning uchun \`<Route path="users/:id" element={<UserDetail />} />\` qilinadi va \`useParams\` ishlatiladi.

\`\`\`jsx
// pages/UserDetail.js
import { useParams, useNavigate } from 'react-router-dom';

export default function UserDetail() {
  // URL dan id ni ajratib olamiz
  const { id } = useParams();
  const navigate = useNavigate();

  // Aslida bu yerda useEffect yozilib, Serverdan "id" yordamida User qidiriladi.

  return (
    <div>
      <h2>Foydalanuvchi ma'lumoti</h2>
      <p>ID: {id}</p>
      
      <button onClick={() => navigate(-1)}>Orqaga qaytish</button>
    </div>
  );
}
\`\`\`

> **Muhim Falsafa:** React Router da hamma narsa URL atrofida aylanadi. UI holatlari (masalan qaysi User ko'rsatilayotgani, qaysi qidiruv so'zi terilgani)ni state da (\`useState\`) saqlagandan ko'ra URL da saqlagan ma'qul. Sababi, admin o'sha URL ni nusxalab (copy) boshqa adminga tashlasa, unda ham aynan shu oyna ochiladi.
  `,
  code: `import React, { useState } from "react";
// Odatda bu router uchun 'react-router-dom' ishlatiladi.
// Bu yerda tushuncha yaxshi shakllanishi uchun Simulyatsiya qilingan.

const UsersPage = () => (
  <div>
    <h3>👥 Foydalanuvchilar Ro'yxati</h3>
    <ul>
      <li>Alijon (ID: 101) <button>Batafsil (101)</button></li>
      <li>Valijon (ID: 102) <button>Batafsil (102)</button></li>
    </ul>
  </div>
);

const SettingsPage = () => (
  <div>
    <h3>⚙️ Tizim Sozlamalari</h3>
    <label>
      <input type="checkbox" defaultChecked /> Tungi rejimni yoqish
    </label>
    <br/><br/>
    <button style={{ background: "#0984e3", color: "white", padding: "5px 10px", border: "none" }}>Saqlash</button>
  </div>
);

export default function DashboardSimulator() {
  // Simulyatsiya qilingan URL (Router)
  const [currentPath, setCurrentPath] = useState('/users');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ fontFamily: "sans-serif", border: "1px solid #ccc", height: "400px", display: "flex", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      
      {/* SIDEBAR (Qotib turadi) */}
      <aside style={{ 
        width: isSidebarOpen ? "220px" : "0px", 
        background: "#2d3436", 
        color: "white", 
        transition: "0.3s",
        overflow: "hidden"
      }}>
        <div style={{ padding: "20px", fontWeight: "bold", fontSize: "18px", borderBottom: "1px solid #636e72" }}>
          Admin Panel
        </div>
        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          <li 
            onClick={() => setCurrentPath('/users')}
            style={{ padding: "15px 20px", cursor: "pointer", background: currentPath === '/users' ? '#0984e3' : 'transparent', borderBottom: "1px solid #636e72" }}
          >
            👥 Foydalanuvchilar
          </li>
          <li 
            onClick={() => setCurrentPath('/settings')}
            style={{ padding: "15px 20px", cursor: "pointer", background: currentPath === '/settings' ? '#0984e3' : 'transparent', borderBottom: "1px solid #636e72" }}
          >
            ⚙️ Sozlamalar
          </li>
        </ul>
      </aside>

      {/* ASOSIY OYNA */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f1f2f6" }}>
        
        {/* NAVBAR */}
        <header style={{ padding: "15px", background: "white", borderBottom: "1px solid #dfe6e9", display: "flex", justifyContent: "space-between" }}>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            style={{ border: "none", background: "transparent", fontSize: "18px", cursor: "pointer" }}
          >
            ☰ 
          </button>
          <span>Hozirgi URL: <strong>{currentPath}</strong></span>
          <button style={{ border: "none", background: "#d63031", color: "white", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Chiqish</button>
        </header>

        {/* OUTLET (URL ga qarab o'zgaruvchi kontent) */}
        <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
          {currentPath === '/users' && <UsersPage />}
          {currentPath === '/settings' && <SettingsPage />}
        </div>
        
      </main>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Nested Routes da to'g'ri Link berish",
      description: "Agar siz qaysidir foydalanuvchining ustiga bosganingizda \`/admin/users/123\` ga o'tishingiz kerak. Quyidagi \`Link\` komponentida manzilni to'g'irlang.",
      startingCode: `import { Link } from 'react-router-dom';\n\nfunction UserRow({ user }) {\n  return (\n    <li>\n      {user.name} \n      {/* VAZIFA: 'to' attribyutida manzilni backtick (\`) orqali dinamik bering */}\n      <Link to={          }>Ko'rish</Link>\n    </li>\n  );\n}`,
      solution: `import { Link } from 'react-router-dom';\n\nfunction UserRow({ user }) {\n  return (\n    <li>\n      {user.name} \n      <Link to={\`/admin/users/\${user.id}\`}>Ko'rish</Link>\n    </li>\n  );\n}`,
      hint: "\`to={\`/admin/users/\${user.id}\`}\` dan foydalaning."
    },
    {
      id: 2,
      title: "URL dagi parametrni ushlash",
      description: "React Router dagi maxsus hook orqali URL da kelayotgan (Route dagi \`:id\` ga joylashgan) qiymatni ajratib oling.",
      startingCode: `import {               } from 'react-router-dom'; // Hook ni import qiling\n\nfunction UserDetails() {\n  // VAZIFA: Hook orqali id ni oling\n  const { id } =                  ();\n\n  return <div>Ma'lumotlar ID: {id}</div>;\n}`,
      solution: `import { useParams } from 'react-router-dom';\n\nfunction UserDetails() {\n  const { id } = useParams();\n\n  return <div>Ma'lumotlar ID: {id}</div>;\n}`,
      hint: "\`useParams\` ni import qiling va qavs qo'yib \`useParams()\` tarzida chaqiring."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Dashboard (Layout) yaratishning asosiy prinsipi React Router da nima deb ataladi?",
      options: [
        "State Management",
        "Nested Routes (Ichma-ich yo'nalishlar) va Outlet dan foydalanish",
        "Window API lari",
        "Redux integratsiyasi"
      ],
      correctAnswer: 1,
      explanation: "Nested Routes da bitta bosh Ota komponent (Layout) yoziladi. Uning ichidagi <Outlet /> qismiga esa URL dagi manzilga mos keluvchi Bola komponentlar ketma-ket joylashtirilaveradi."
    },
    {
      id: 2,
      question: "RequireAuth (Himoyalangan Marshrut) komponentining asosiy maqsadi nima?",
      options: [
        "Saytni xakerlardan 100% himoya qilish",
        "React ni ishini tezlashtirish",
        "Foydalanuvchi ruxsat (token yoki session) ga ega emasligini tekshirib, uni darhol Login sahifasiga qaytarib yuborish (Navigate)",
        "Dasturni chiroyli qilish"
      ],
      correctAnswer: 2,
      explanation: "Agar foydalanuvchi qo'lda '/admin' deb yozib kirsayu, u aslida logindan o'tmagan bo'lsa, RequireAuth komponenti buni payqab uni orqaga otib yuboradi."
    },
    {
      id: 3,
      question: "useParams qachon ishlatiladi?",
      options: [
        "Formalarga ma'lumot kiritganda",
        "Faqat CSS ni o'zgartirish uchun",
        "URL ning dinamik qismidan (masalan /users/45 dagi 45 ni) o'qib olish va shu ID dagi ma'lumotni bazadan izlash uchun",
        "Sahifani yangilash uchun"
      ],
      correctAnswer: 2,
      explanation: "Foydalanuvchi profiliga o'tganda manzil /users/ali yoki /users/111 bo'lishi mumkin. Ana shu 'ali' yoki '111' ni useParams() orqali ushlab olib Serverga so'rov yuboramiz."
    },
    {
      id: 4,
      question: "Nega holatlarni (masalan joriy ochiq sahifa nomi yoki qidiruv so'zini) useState o'rniga to'g'ridan to'g'ri URL ga (Router ga) bog'lagan ma'qul?",
      options: [
        "Chunki useState sekin ishlaydi",
        "Boshqa sababi yo'q",
        "Shunda foydalanuvchi sahifani yangilasa ham yoki linkni boshqaga tashlasa ham xuddi o'sha oyna/natija ochiq qoladi. (Shareability)",
        "Brauzer ruxsat bermaydi"
      ],
      correctAnswer: 2,
      explanation: "Agar qidiruvni faqat State da saqlasangiz, sahifa F5 (yangilash) qilinganda barcha state o'chib ketib ro'yxat tozalangan holatga tushadi. URL dagi /users?search=ali bo'lsa hech qachon o'chib ketmaydi."
    }
  ]
};
