export const todoApp = {
  id: "todoApp",
  title: "Murakkab To-Do App (Zustand bilan)",
  content: `
# Yakuniy Loyiha 1: Murakkab To-Do App

React asoslarini va State Management larni o'rganganingizdan so'ng, endi amaliyot vaqti keldi. Biz shunchaki oddiy ro'yxat emas, balki qidiruv tizimiga ega, filtrlash imkoniyati bor, LocalStorage ga saqlanadigan va state lari **Zustand** orqali boshqariladigan murakkab "Task Manager" ilovasini quramiz.

## 1. Nega Zustand?

Oddiy Todo loyihalarida odatda \`useState\` dan foydalaniladi. Lekin loyiha sal kattalashib, ma'lumotni turli komponentlar (Header, Sidebar, TodoList, Footer) orqali almashish kerak bo'lganda prop-drilling (ma'lumotni tepadan pastga zanjirdek uzatish) muammosi kelib chiqadi. 

**Zustand** bizga global, yengil va juda tezkor State omborini yaratib beradi. U React Context API kabi ilovani to'liq o'rab (Provider bilan) chiqishni talab qilmaydi.

## 2. Arxitektura

Loyihamiz quyidagi asosiy qismlardan iborat bo'ladi:
1. **Store (\`useTodoStore\`)**: Barcha vazifalar (tasks), qidiruv so'zi (searchQuery) va filtr holati (barchasi, bajarilgan, bajarilmagan) saqlanadigan markaziy ombor.
2. **TodoInput**: Yangi vazifa qo'shish formasi.
3. **TodoFilter**: Vazifalarni izlash va toifalash qismi.
4. **TodoList**: Vazifalarni ko'rsatuvchi va o'chirish/bajarish funksiyalariga ega komponent.

## 3. Zustand Omborini Yaratish

\`\`\`javascript
// store/useTodoStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // LocalStorage uchun

export const useTodoStore = create(
  // persist yordamida barcha o'zgarishlar avtomat brauzer xotirasiga yoziladi
  persist(
    (set) => ({
      todos: [],
      filter: 'ALL', // ALL, COMPLETED, PENDING
      searchQuery: '',

      // Yangi vazifa qo'shish
      addTodo: (text) => set((state) => ({ 
        todos: [{ id: Date.now(), text, isDone: false }, ...state.todos] 
      })),

      // Bajarilgan qilib belgilash
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo => 
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      })),

      // O'chirish
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),

      // Filtrni o'zgartirish
      setFilter: (filterType) => set({ filter: filterType }),
      
      // Qidiruv so'zini yangilash
      setSearchQuery: (query) => set({ searchQuery: query })
    }),
    {
      name: 'my-complex-todos', // LocalStorage dagi nomi
    }
  )
);
\`\`\`

## 4. Komponentlarda foydalanish

Zustand ni React komponentida ishlatish juda oson. Shunchaki hook ni chaqirib, kerakli funksiya yoki ma'lumotni olib ketamiz.

\`\`\`jsx
// TodoInput.js
import { useState } from 'react';
import { useTodoStore } from './store/useTodoStore';

export default function TodoInput() {
  const [text, setText] = useState('');
  const addTodo = useTodoStore(state => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Yangi vazifa..." 
      />
      <button type="submit">Qo'shish</button>
    </form>
  );
}
\`\`\`

## 5. Qidiruv va Filtrlash mantiqi

Barcha mantiqni TodoList ni chizishdan avval bajaramiz. 

\`\`\`jsx
// TodoList.js
import { useTodoStore } from './store/useTodoStore';

export default function TodoList() {
  const { todos, filter, searchQuery, toggleTodo, deleteTodo } = useTodoStore();

  // 1. Qidiruv bo'yicha saralash
  let filteredTodos = todos.filter(t => 
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Status bo'yicha saralash
  if (filter === 'COMPLETED') {
    filteredTodos = filteredTodos.filter(t => t.isDone);
  } else if (filter === 'PENDING') {
    filteredTodos = filteredTodos.filter(t => !t.isDone);
  }

  if (filteredTodos.length === 0) return <p>Vazifalar topilmadi...</p>;

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id} style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
          <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>O'chirish</button>
        </li>
      ))}
    </ul>
  );
}
\`\`\`

> **Xulosa:** Shu tarzdagi arxitektura loyihani kelajakda qanchalik yiriklashmasin, boshqaruvni oson ushlab turishga yordam beradi. Siz istalgan joyda (masalan tepa menuda) hozir nechta vazifa borligini bemalol o'qib ko'rsata olasiz.
  `,
  code: `import React, { useState } from "react";
// DIQQAT: Bu yerda Zustand o'rniga oddiy simulyatsiya qilingan (xuddi shunday ishlaydigan) Custom Hook yozilgan.

function useZustandMock() {
  const [todos, setTodos] = useState([
    { id: 1, text: "React o'rganish", isDone: true },
    { id: 2, text: "Zustand bilan amaliyot", isDone: false },
    { id: 3, text: "Portfolio yasash", isDone: false }
  ]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  return {
    todos,
    filter,
    search,
    addTodo: (text) => setTodos([{ id: Date.now(), text, isDone: false }, ...todos]),
    toggleTodo: (id) => setTodos(todos.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t)),
    deleteTodo: (id) => setTodos(todos.filter(t => t.id !== id)),
    setFilter,
    setSearch
  };
}

export default function App() {
  const store = useZustandMock();
  const [inputText, setInputText] = useState("");

  const filtered = store.todos
    .filter(t => t.text.toLowerCase().includes(store.search.toLowerCase()))
    .filter(t => {
      if (store.filter === 'COMPLETED') return t.isDone;
      if (store.filter === 'PENDING') return !t.isDone;
      return true;
    });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px", background: "#f8f9fa", borderRadius: "8px" }}>
      <h2>Murakkab To-Do App</h2>
      
      {/* Statistika (Global state namoyishi) */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", fontSize: "14px", color: "gray" }}>
        <span>Jami: {store.todos.length}</span>
        <span>Bajarildi: {store.todos.filter(t => t.isDone).length}</span>
        <span>Qoldi: {store.todos.filter(t => !t.isDone).length}</span>
      </div>

      {/* Kontrollerlar (Header qismi) */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          placeholder="🔎 Qidirish..." 
          value={store.search}
          onChange={e => store.setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <select value={store.filter} onChange={e => store.setFilter(e.target.value)} style={{ padding: "8px" }}>
          <option value="ALL">Barchasi</option>
          <option value="COMPLETED">Bajarilganlar</option>
          <option value="PENDING">Kutayotganlar</option>
        </select>
      </div>

      {/* Yangi vazifa (Input qismi) */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          placeholder="Yangi vazifa kiriting" 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          style={{ flex: 1, padding: "8px", border: "1px solid #00b894" }}
        />
        <button 
          onClick={() => { if(inputText.trim()) { store.addTodo(inputText); setInputText(''); } }}
          style={{ background: "#00b894", color: "white", padding: "8px 15px", border: "none", cursor: "pointer" }}
        >
          Qo'shish
        </button>
      </div>

      {/* Ro'yxat (List qismi) */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.length === 0 ? <p style={{ color: "gray", textAlign: "center" }}>Vazifalar yo'q...</p> : null}
        
        {filtered.map(todo => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", background: "white", padding: "10px", marginBottom: "5px", borderRadius: "5px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <span 
              onClick={() => store.toggleTodo(todo.id)}
              style={{ textDecoration: todo.isDone ? "line-through" : "none", color: todo.isDone ? "gray" : "black", cursor: "pointer", flex: 1 }}
            >
              {todo.text}
            </span>
            <button onClick={() => store.deleteTodo(todo.id)} style={{ background: "#ff7675", color: "white", border: "none", cursor: "pointer", borderRadius: "3px" }}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Zustand hook in chaqirish",
      description: "Quyida Zustand stori berilgan. Ushbu stordan faqatgina \`todos\` ni tanlab (ajratib) oling.",
      startingCode: `import { useTodoStore } from './store';\n\nexport default function TotalTasks() {\n  // VAZIFA: store dan faqat todos array ini oling\n  const todos = useTodoStore(             );\n\n  return <div>Jami vazifalar: {todos.length}</div>;\n}`,
      solution: `import { useTodoStore } from './store';\n\nexport default function TotalTasks() {\n  const todos = useTodoStore(state => state.todos);\n\n  return <div>Jami vazifalar: {todos.length}</div>;\n}`,
      hint: "\`state => state.todos\` deb yozing. Shunda butun obyektdan faqat \`todos\` keladi."
    },
    {
      id: 2,
      title: "Array ni filtrdan o'tkazish",
      description: "\`list\` nomli arraydagi obyektlarni \`isDone === true\` bo'lganlarinigina qoldiring.",
      startingCode: `const list = [{ task: 'A', isDone: true }, { task: 'B', isDone: false }];\n\n// VAZIFA: faqat bajarilganlarni qoldirib yangi array oling\nconst completedList = list.       (                   );\n\nconsole.log(completedList);`,
      solution: `const list = [{ task: 'A', isDone: true }, { task: 'B', isDone: false }];\n\nconst completedList = list.filter(item => item.isDone);\n\nconsole.log(completedList);`,
      hint: "\`.filter(item => item.isDone)\` dan foydalaning."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Zustand nima maqsadda ishlatiladi?",
      options: [
        "Faqat CSS yozish uchun",
        "React ilovasidagi global ma'lumotlarni (State) Provider lar (o'ramlar) siz, juda yengil va oson usulda barcha komponentlar orasida taqsimlash uchun",
        "Backend ga ma'lumot jo'natish uchun",
        "React ni o'rniga ishlatiladigan til"
      ],
      correctAnswer: 1,
      explanation: "Zustand Redux yoki Context API kabi o'zida ma'lumot saqlovchi ombordir. Uning zo'r tarafi - hech qanday <Provider> yozish shart emas va u juda oz joy egallaydi."
    },
    {
      id: 2,
      question: "Zustand store ichida nega biz funksiyalarni (masalan addTodo) ham holat (state) qatorida saqlaymiz?",
      options: [
        "Chunki komponent ichida funksiya yozib bo'lmaydi",
        "Barcha xatti-harakatlar (Actions) bitta joyda turishi, boshqarish oson bo'lishi va istalgan komponent uni to'g'ridan to'g'ri chaqirishi uchun",
        "Brauzer ruxsat bermagani uchun",
        "Bu xavfsizlikni ta'minlaydi"
      ],
      correctAnswer: 1,
      explanation: "Agar addTodo funksiyasini faqat bitta komponentda yozsak, boshqalar uni chaqira olmaydi. Store ning ichida tursa hamma uchun umumiy funksiyaga aylanadi."
    },
    {
      id: 3,
      question: "Qidiruv (Search) tizimi yasayotganda qaysi array metodlaridan tez-tez foydalaniladi?",
      options: [
        ".push() va .pop()",
        ".forEach() va .reduce()",
        ".filter() va .includes()",
        ".slice() va .splice()"
      ],
      correctAnswer: 2,
      explanation: "Asosiy ro'yxatdan faqat kiritilgan harflarni (includes) o'z ichiga olgan qismlarinigina ajratib qoldirish (filter) qidiruvning eng to'g'ri strategiyasidir."
    },
    {
      id: 4,
      question: "Zustand da 'persist' middleware ining vazifasi nima?",
      options: [
        "Kod xatolarini tekshiradi",
        "Store ni animatsiya bilan chiqaradi",
        "Store dagi barcha ma'lumotlarni avtomatik tarzda brauzerning LocalStorage xotirasiga yozib boradi, va sahifa yangilanganda ham yo'qolib ketmasligini ta'minlaydi",
        "U ma'lumotni o'chirib tashlaydi"
      ],
      correctAnswer: 2,
      explanation: "Persist (saqlab qolish) sizni manually localStorage.setItem() qilib o'tirish azobidan qutqaradi."
    }
  ]
};
