export const reactRouting = {
  title: "Routing: React Router v6+",
  content: `
# Routing: React Router v6+

SPA (Single Page Application) da sahifalar aslida butunlay yangilanmaydi, shunchaki URL o'zgaradi va ekrandagi komponentlar shu URL'ga mos ravishda React tomonidan almashtiriladi.

### React Router v6+ imkoniyatlari
* **Nested Routes (Ichma-ich marshrutlar):** Ota sahifa o'zgarishsiz qolib, uning faqat ma'lum qismini (masalan, dashboard ichidagi panellarni) almashtirish.
* **Data Loaders:** Komponent render bo'lishidan oldin unga kerakli ma'lumotlarni serverdan yuklab olish (bu "render-as-you-fetch" yondashuvini ta'minlaydi).
* **Actions:** Forma ma'lumotlarini jo'natish (submit) mantiqini marshrutning o'zida deklarativ ravishda boshqarish.
`,
  code: `import React from "react";
// Odatda React Router "BrowserRouter" orqali ilovani o'rab oladi.
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() { return <h2>Asosiy sahifa</h2>; }
function About() { return <h2>Biz haqimizda</h2>; }

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ display: 'flex', gap: '10px', background: '#eee', padding: 10 }}>
          <Link to="/">Bosh sahifa</Link>
          <Link to="/about">Biz haqimizda</Link>
        </nav>
        
        <div style={{ padding: 20 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "React Router v6+ da Nested Routes nima degani?",
    options: [
      "Router ishlatmaslik",
      "Bitta ota sahifa ichida qolgan qismlarni (panellarni) almashtirish",
      "Sahifani serverda render qilish",
      "Ma'lumotlarni yashirin uzatish"
    ],
    correctAnswer: 1,
    explanation: "URL o'zgarsa-da, butun sahifa almashtirilmasdan faqat uning belgilangan qismi yangilanadi."
  }
]
};
