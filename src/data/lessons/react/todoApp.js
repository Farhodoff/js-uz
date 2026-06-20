export const todoApp = {
  title: "Murakkab To-Do App (Zustand bilan)",
  content: `
# Murakkab To-Do App (Zustand bilan)

Siz hozirgacha nazariy bilimlarni o'rgandingiz. Endi ularni amaliyotga tatbiq etish vaqti keldi! Birinchi loyihamiz **Zustand** yordamida holat (state) ni boshqaradigan Murakkab To-Do dasturi.

### Nima yozamiz?
* **Zustand Store:** Vazifalarni (tasks) saqlash, qo'shish, o'chirish va holatini o'zgartirish (Bajarilgan/Bajarilmagan).
* **Filtrlash:** "Barchasi", "Bajarilgan" va "Bajarilmagan" vazifalarni ajratib ko'rsatish.
* **Qidiruv:** Vazifalar ro'yxatidan nomiga qarab tezkor qidirish.
* **LocalStorage:** Sahifa yangilanganda ham vazifalar yo'qolib ketmasligini ta'minlash.

**Nima uchun Zustand?**
Chunki u React uchun eng oson va kuchli state management kutubxonalaridan biri. Unda ortiqcha boilerplate (ko'p kod) yozilmaydi.
`,
  code: `import React, { useState } from "react";
// Odatda: import { create } from "zustand"

// Zustand o'rniga namuna uchun oddiy state (MOCK)
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "React ni o'rganish", completed: true },
    { id: 2, title: "Zustand ni tushunish", completed: false },
    { id: 3, title: "Amaliyot qilish", completed: false }
  ]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(t => {
    if (filter === "completed") return t.completed;
    if (filter === "active") return !t.completed;
    return true;
  }).filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Murakkab To-Do (Mock)</h2>
      
      <input 
        placeholder="Qidirish..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      
      <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
        <button onClick={() => setFilter("all")} style={{ fontWeight: filter === "all" ? "bold" : "normal" }}>Barchasi</button>
        <button onClick={() => setFilter("active")} style={{ fontWeight: filter === "active" ? "bold" : "normal" }}>Faol</button>
        <button onClick={() => setFilter("completed")} style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}>Bajarilgan</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTasks.map(t => (
          <li key={t.id} style={{ padding: 10, borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)} style={{ marginRight: 10 }} />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
    {
      question: "Zustand kutubxonasida state yaratish uchun qaysi funksiyadan foydalaniladi?",
      options: ["createStore", "create", "useState", "configureStore"],
      correctAnswer: 1,
      explanation: "Zustand da state yaratish uchun to'g'ridan-to'g'ri 'import { create } from zustand' dan foydalaniladi."
    }
  ]
};
