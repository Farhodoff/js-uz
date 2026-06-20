export const dashboardApp = {
  title: "Admin Dashboard (React Router)",
  content: `
# Admin Dashboard (React Router)

Va nihoyat uchinchi amaliyot loyihamiz: **Admin Dashboard**. Ushbu loyiha ko'plab real biznes ilovalarining (CRM, B2B panellar) asosi hisoblanadi.

### Nimani o'rganamiz?
* **React Router:** Ilovani sahifalarga bo'lish (Asosiy, Foydalanuvchilar, Sozlamalar) va ularni brauzerni yangilamasdan navigatsiya qilish.
* **Layouts & Outlet:** Saytning chap tomonidagi menyu (Sidebar) har doim joyida qolishi, o'ng tomondagi kontent (\`<Outlet />\`) esa URL ga qarab o'zgarishi (Nested Routing).
* **Mock Data:** Jadval (Table) ko'rinishidagi ma'lumotlar bilan ishlash.
\`,
  code: \`import React from "react";
// Odatda: import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

// MOCK Router o'rniga oddiy namuna
export default function App() {
  const [page, setPage] = React.useState("home");

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif', margin: -8 }}>
      
      {/* SIDEBAR (Har doim turadi) */}
      <div style={{ width: 250, background: '#2c3e50', color: 'white', padding: 20 }}>
        <h2>Admin Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 30, display: 'flex', flexDirection: 'column', gap: 15 }}>
          <li style={{ cursor: 'pointer', color: page === 'home' ? '#3498db' : 'white' }} onClick={() => setPage("home")}>🏠 Bosh sahifa</li>
          <li style={{ cursor: 'pointer', color: page === 'users' ? '#3498db' : 'white' }} onClick={() => setPage("users")}>👥 Foydalanuvchilar</li>
          <li style={{ cursor: 'pointer', color: page === 'settings' ? '#3498db' : 'white' }} onClick={() => setPage("settings")}>⚙️ Sozlamalar</li>
        </ul>
      </div>

      {/* ASOSIY OYNA (Outlet qismi) */}
      <div style={{ flex: 1, padding: 30, background: '#ecf0f1' }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {page === "home" && <div>
            <h3>Bosh sahifa</h3>
            <p>Xush kelibsiz! Bugungi statistikangiz: 1,245 ta tashrif.</p>
          </div>}
          
          {page === "users" && <div>
            <h3>Foydalanuvchilar</h3>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd' }}><th>ID</th><th>Ism</th><th>Rol</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Ali</td><td>Admin</td></tr>
                <tr><td>2</td><td>Vali</td><td>User</td></tr>
              </tbody>
            </table>
          </div>}
          
          {page === "settings" && <div>
            <h3>Sozlamalar</h3>
            <p>Profilni tahrirlash formasi shu yerda bo'ladi.</p>
          </div>}
        </div>
      </div>
      
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
    {
      question: "React Router da 'Nested Routing' paytida ota komponent ichidagi bola komponent qayerda chiziladi?",
      options: ["<Children /> ichida", "<Outlet /> ichida", "Avtomatik tarzda eng pastda", "Oynani yangilangachgina ko'rinadi"],
      correctAnswer: 1,
      explanation: "React Router da ichma-ich sahifalar yasalganda, <Outlet /> qismi URL ga mos ravishda o'zgaruvchi qism hisoblanadi."
    }
  ]
};
