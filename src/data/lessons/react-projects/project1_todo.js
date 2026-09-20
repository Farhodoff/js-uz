export const project1_todo = {
  id: "project1_todo",
  title: "1. Todo List (useState, map)",
  content: `
# 1-Loyiha: To'liq ishlaydigan Todo List

Bugunga qadar o'rgangan React ko'nikmalaringiz uchun eng yaxshi sinov maydoniga xush kelibsiz! Biz holatlar (state), hodisalarni boshqarish va ro'yxatlarni chizishni muhokama qildik. Endi klassik, to'liq ishlaydigan **Todo List**ni yaratish vaqti keldi.

Todo list yaratish React dasturchisi uchun gitarchining "Stairway to Heaven"ni o'rganishiga o'xshaydi: majburiy o'tish marosimi!

## Maqsad: To'liq ishlaydigan Todo List yaratish

Bizning maqsadimiz foydalanuvchi quyidagilarni qila oladigan ishonchli ilova yaratish:
1. Vazifalar ro'yxatini **ko'rish**.
2. Matn maydoni orqali yangi vazifa **qo'shish**.
3. Har bir vazifaning bajarilgan/bajarilmagan holatini **o'zgartirish**.
4. Vazifalarni butunlay **o'chirish**.
5. **Bonus:** Vazifalarni saqlash \\\`LocalStorage\\\` — sahifa yangilanganda ham vazifalar saqlanib qoladi!

### Arxitektura (Mental Model)

Ilovani restoran deb tasavvur qiling:
- **State (Oshxona):** Xom mahsulotlarni saqlaydi (vazifalar massivi va joriy matn maydoni).
- **Event Handlerlar (Ofitsiantlar):** Buyurtmalarni qabul qiladi (tugma bosilishi, forma yuborilishi) va oshxonga mahsulotlarni yangilashni buyuradi.
- **UI (Zal):** Taomlarni go'zal dasturxonlarda ko'rsatadi ( \\\`map\\\`).

Holat oqimini Mermaid diagrammasi orqali tasavvur qilamiz:

\\\`\\\`\\\`mermaid
flowchart TD
    State["tasks holati massivi"] --> Map["tasks ustidan map()"]
    Map --> UI["TodoItemlarni chizish"]
    
    UserInput["Foydalanuvchi vazifa yozadi"] --> InputState["inputValue holati"]
    SubmitButton["Foydalanuvchi 'Qo'shish' bosadi"] --> AddHandler["addTask()"]
    
    AddHandler -->|O'qiydi| InputState
    AddHandler -->|Yangilaydi| State
    
    ToggleBtn["Foydalanuvchi 'Bajarildi' bosadi"] --> ToggleHandler["toggleTask(id)"]
    ToggleHandler -->|Yangilaydi| State
    
    DeleteBtn["Foydalanuvchi 'O'chirish' bosadi"] --> DeleteHandler["deleteTask(id)"]
    DeleteHandler -->|Yangilaydi| State
\\\`\\\`\\\`

---

## 1-Qadam: Holatlarni initsializatsiya qilish (Vazifalar massivi va kiritish matni)

Ilovani qurish uchun ikkita o'zgaruvchan qismini (holatni) kuzatib boramiz:
1. Foydalanuvchi kiritish maydoniga yozayotgan **joriy matn**.
2. Qo'shilgan **vazifalar ro'yxati**.

\\\`\\\`\\\`jsx
const [text, setText] = useState("");
const [tasks, setTasks] = useState([]);
\\\`\\\`\\\`

> **Analogiya:** \\\`text\\\` — qog'ozchaga yozib qo'yilgan qalamga o'xshaydi. \\\`tasks\\\` — tayyor qog'ozchalarni ilib qo'yadigan stend.

Massivdagi har bir vazifa oddiy satr bo'lmasligi kerak. U bir nechta ma'lumotni saqlashi kerak: ID, vazifa matni va bajarilgan holati.

\\\`\\\`\\\`js
// Bitta vazifa obyekti qanday ko'rinishda
{
  id: 1700456123,
  text: "Buy groceries",
  completed: false
}
\\\`\\\`\\\`

---

## 2-Qadam: Yangi vazifa qo'shish

Foydalanuvchi formani yuborganda yangi vazifa obyektini yaratib, uni massivimizga qo'shishimiz kerak. 
**MUHIM QOIDA:** Holat massivini to'g'ridan-to'g'ri o'zgartirmang! Har doim *yangi* massiv yarating.

**To'g'ri:**
\\\`\\\`\\\`jsx
const addTask = (e) => {
  e.preventDefault(); // Sahifa yangilanishining oldini olish!
  if (!text.trim()) return; // Bo'sh vazifalarning oldini olish
  
  const newTask = {
    id: Date.now(), // Unikal ID yaratish
    text: text,
    completed: false
  };

  // Eski vazifalarni yoyib, yangisini qo'shish
  setTasks([...tasks, newTask]);
  
  // Kiritish maydonini tozalash
  setText("");
};
\\\`\\\`\\\`

**Noto'g'ri:**
\\\`\\\`\\\`jsx
// XATO! Holatga to'g'ridan-to'g'ri push qilmang.
tasks.push(newTask);
setTasks(tasks); 
\\\`\\\`\\\`

---

## 3-Qadam: Bajarilgan holatini o'zgartirish

Foydalanuvchi vazifani bajarilgan deb belgilash uchun bossa, shu vazifani massivimizdan topib, uning \\\`completed\\\` qiymatini teskari aylantiramiz.
Holatni to'g'ridan-to'g'ri o'zgartira olmaganimiz uchun, \\\`.map()\\\` funksiyasi bilan butunlay yangi massiv yaratamiz. Agar vazifaning ID'si o'zgartiriladigan vazifa ID'siga mos kelsa, holati teskari qilingan *yangi* obyektni qaytaramiz; aks holda vazifani o'z holicha qaytaramiz.

\\\`\\\`\\\`jsx
const toggleTask = (id) => {
  setTasks(tasks.map(task => {
    if (task.id === id) {
      // Vazifa nusxasini yaratib, completed holatini teskari aylantirish
      return { ...task, completed: !task.completed };
    }
    return task;
  }));
};
\\\`\\\`\\\`

---

## 4-Qadam: Vazifani o'chirish

O'chirish — kerakmas vazifani filtrlashdan iborat. \\\`.filter()\\\` massiv metodi bunga juda mos keladi. U shartimizdan o'tgan elementlargina saqlangan *yangi* massiv qaytaradi.

\\\`\\\`\\\`jsx
const deleteTask = (id) => {
  // Mos ID'li vazifadan boshqalarini qoldirish
  setTasks(tasks.filter(task => task.id !== id));
};
\\\`\\\`\\\`

---

## 5-Qadam: (Bonus) LocalStorage'ga saqlash

Sahifa yangilanganda barcha vazifalar yo'qolib qolsa, bunday Todo list nima kerak? Brauzerning \\\`localStorage\\\` orqali vazifalarimizni saqlaymiz.

\\\`localStorage\\\` faqat satrlarni saqlay oladi. Shuning uchun obyektlar massivini \\\`JSON.stringify()\\\` yordamida JSON satriga aylantiramiz. Qayta o'qishda esa quyidagidan foydalanamiz: \\\`JSON.parse()\\\`.

\\\`\\\`\\\`jsx
// 1. LocalStorage'dan o'qib, holatni kechiktirilgan (lazy) usulda initsializatsiya qilish
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("my_todos");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return [];
  }
});

// 2. Vazifalar o'zgarganda ularni LocalStorage'ga saqlash uchun useEffect ishlatamiz!
// (useEffect 'react'dan import qilingan deb faraz qilamiz)
// useEffect(() => {
//   localStorage.setItem("my_todos", JSON.stringify(tasks));
// }, [tasks]); 
\\\`\\\`\\\`

*(Izoh: \\\`useEffect\\\` kelgusi darslarda chuqur o'rganiladi, lekin bu uning qanchalik foydali ekanidan ko'rkam bir lahza!)*
  `,
  code: `import React, { useState } from "react";

export default function TodoApp() {
  // Bu yerda holatlarni (state) qo\'shing

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      {/* Formani bu yerga qo'shing */}
      
      {/* Ro'yxatni bu yerga chiqaring */}
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "1-mashq: Vazifalar holatini initsializatsiya qilish",
      description: "`tasks` deb nomlangan holat o'zgaruvchisini bo'sh massiv bilan yarating. U todo elementlarini saqlaydi.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  // VAZIFA: \'tasks\' holatini (state) bo\'sh massiv bilan initsializatsiya qiling\n\n  return <div>Todo App</div>;\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n\n  return <div>Todo App</div>;\n}`,
      hint: "Buning uchun `const [tasks, setTasks] = useState([]);`"
    },
    {
      id: 2,
      title: "2-mashq: Kiritish holatini initsializatsiya qilish",
      description: "Yana bir holat o'zgaruvchisi — `text`ni bo'sh satr bilan yarating. U foydalanuvchi kiritishini kuzatadi.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  // VAZIFA: \'text\' holatini (state) initsializatsiya qiling\n\n  return <div>Todo App</div>;\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  const [text, setText] = useState("");\n\n  return <div>Todo App</div>;\n}`,
      hint: "Buning uchun `const [text, setText] = useState(\"\");`"
    },
    {
      id: 3,
      title: "3-mashq: Boshqariladigan (controlled) input",
      description: "Komponentga input maydoni qo'shing. Uni `value` xossasini `text` holatiga bog'lang va holatni `onChange` handlerida yangilang.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  return (\n    <div>\n      {/* VAZIFA: Bu yerga boshqariluvchi (controlled) input maydonini qo\'shing */}\n    </div>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  return (\n    <div>\n      <input \n        type="text" \n        value={text} \n        onChange={(e) => setText(e.target.value)} \n        placeholder="Add a task"\n      />\n    </div>\n  );\n}`,
      hint: "Input taxminan shunday ko'rinishi kerak: `<input value={text} onChange={(e) => setText(e.target.value)} />`"
    },
    {
      id: 4,
      title: "4-mashq: Forma yuborish wrapper'i",
      description: "Inputni `<form>` tegiga o'rang va `<button type=\"submit\">` qo'shing. Standart forma yuborilishining oldini oluvchi `handleSubmit` funksiyasini yarating.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    // VAZIFA: Standart yuborish (sahifa yangilanishi) harakatining oldini oling\n  };\n\n  return (\n    <div>\n      {/* VAZIFA: Formaga o\'rang va onSubmit={handleSubmit} bering */}\n      <input \n        type="text" \n        value={text} \n        onChange={(e) => setText(e.target.value)} \n      />\n      {/* VAZIFA: Yuborish (submit) tugmasini qo\'shing */}\n    </div>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n  };\n\n  return (\n    <div>\n      <form onSubmit={handleSubmit}>\n        <input \n          type="text" \n          value={text} \n          onChange={(e) => setText(e.target.value)} \n        />\n        <button type="submit">Add</button>\n      </form>\n    </div>\n  );\n}`,
      hint: "Buning uchun `handleSubmit` ichida `e.preventDefault();` yozib, uni `<form onSubmit={handleSubmit}>`ga ulang."
    },
    {
      id: 5,
      title: "5-mashq: Vazifa qo'shish",
      description: "`handleSubmit` ichida yangi vazifa obyektini yarating (id, text, completed maydonlari bilan) va uni `tasks` massiviga qo'shing. So'ng `text` holatini tozalang.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    \n    // VAZIFA: Yangi vazifa (newTask) obyektini yarating\n    // VAZIFA: tasks holatini (state) yangilang\n    // VAZIFA: text holatini tozalang\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button type="submit">Add</button>\n    </form>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([]);\n  const [text, setText] = useState("");\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (!text.trim()) return;\n    \n    const newTask = {\n      id: Date.now(),\n      text: text,\n      completed: false\n    };\n    \n    setTasks([...tasks, newTask]);\n    setText("");\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      <button type="submit">Add</button>\n    </form>\n  );\n}`,
      hint: "Buning uchun `setTasks([...tasks, { id: Date.now(), text, completed: false }])` va `setText(\"\")` yozing."
    },
    {
      id: 6,
      title: "6-mashq: Vazifalar ro'yxatini chizish",
      description: "`tasks` massivi ustidan map qilib, vazifa matnini o'z ichiga olgan `<li>` elementlari ro'yxatini chiqaring. `key` xossasini unutmang!",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {/* VAZIFA: tasks massivi ustidan aylanib (map), <li> elementlarini ekranga chiqaring */}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>{task.text}</li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "Buning uchun `{tasks.map(task => <li key={task.id}>{task.text}</li>)}`"
    },
    {
      id: 7,
      title: "7-mashq: Vazifani o'chirish",
      description: "Berilgan id'li vazifani o'chiruvchi `deleteTask(id)` funksiyasini yarating. Har bir `<li>`ga bu funksiyani chaqiruvchi O'chirish tugmasini qo'shing.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const deleteTask = (id) => {\n    // VAZIFA: Berilgan ID\'ni filtrlash orqali tasks massivini yangilang\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {task.text}\n          {/* VAZIFA: O\'chirish (Delete) tugmasini qo\'shing */}\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const deleteTask = (id) => {\n    setTasks(tasks.filter(task => task.id !== id));\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {task.text}\n          <button onClick={() => deleteTask(task.id)}>Delete</button>\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "`setTasks(tasks.filter(task => task.id !== id))`"
    },
    {
      id: 8,
      title: "8-mashq: Bajarilgan holatini o'zgartirish",
      description: "`toggleTask(id)` funksiyasini yarating. Vazifalar ustidan map qiling va ID mos kelsa, `completed` qiymatini teskari aylantiring. Buni checkbox input bilan ulang.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const toggleTask = (id) => {\n    // VAZIFA: tasks\'ni yangilang, mos ID uchun \'completed\' qiymatini o\'zgartiring\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {/* VAZIFA: Bajarilganlikni belgilash uchun checkbox qo\'shing */}\n          {task.text}\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: false }\n  ]);\n\n  const toggleTask = (id) => {\n    setTasks(tasks.map(task => \n      task.id === id ? { ...task, completed: !task.completed } : task\n    ));\n  };\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          <input \n            type="checkbox" \n            checked={task.completed} \n            onChange={() => toggleTask(task.id)} \n          />\n          {task.text}\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "Buning uchun `tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)`"
    },
    {
      id: 9,
      title: "9-mashq: Bajarilgan vazifalarga stil berish",
      description: "Vazifa bajarilgan bo'lsa, uning matniga chizilgan (line-through) stil beriling.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: true },\n    { id: 2, text: "Build App", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          {/* VAZIFA: task.completed qiymatiga asoslanib, dinamik ravishda stil bering */}\n          <span>{task.text}</span>\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState([\n    { id: 1, text: "Learn React", completed: true },\n    { id: 2, text: "Build App", completed: false }\n  ]);\n\n  return (\n    <ul>\n      {tasks.map(task => (\n        <li key={task.id}>\n          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>\n            {task.text}\n          </span>\n        </li>\n      ))}\n    </ul>\n  );\n}`,
      hint: "Buning uchun `style={{ textDecoration: task.completed ? \"line-through\" : \"none\" }}`"
    },
    {
      id: 10,
      title: "10-mashq: Bonus — Lazy holat initsializatsiyasi",
      description: "`tasks` holatini `localStorage.getItem(\"todos\")`dan o'qib initsializatsiya qiling. Qiymat bo'lsa parse qiling, aks holda `[]` oling.",
      startingCode: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  // VAZIFA: LocalStorage\'dan o\'qish uchun useState ichida callback\'dan foydalaning\n  const [tasks, setTasks] = useState([]);\n\n  return <div>Loaded {tasks.length} tasks!</div>;\n}`,
      solution: `import React, { useState } from "react";\n\nexport default function TodoApp() {\n  const [tasks, setTasks] = useState(() => {\n    const saved = localStorage.getItem("todos");\n    if (saved) {\n      return JSON.parse(saved);\n    }\n    return [];\n  });\n\n  return <div>Loaded {tasks.length} tasks!</div>;\n}`,
      hint: "`useState`ga `() => { ... }` arrow funksiyasini bering."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Todo List elementlari massivini saqlash uchun qaysi Hook ishlatiladi?",
      options: [
        "useArray", 
        "useState", 
        "useList", 
        "useEffect"
      ],
      correctAnswer: 1,
      explanation: "`useState` — massiv va obyektlar ham qat'i nazar, komponentning istalgan lokal holatini saqlash uchun standart React hooki."
    },
    {
      id: 2,
      question: "Vazifalar massivi ustidan map qilishda nega `key` xossasini berish kerak?",
      options: [
        "Ro'yxat elementlariga noyob stil berish uchun.",
        "React har bir ro'yxat elementini qayta chizishlar orasida kuzatib borishi uchun.",
        "Brauzerga bu qanday ma'lumot turini aytish uchun.",
        "`map()` undan bo'masa xato beradi."
      ],
      correctAnswer: 1,
      explanation: "React key'lar yordamida qaysi elementlar o'zgarganini, qo'shilganini yoki o'chirilganini aniqlaydi va render jarayonini optimallashtiradi."
    },
    {
      id: 3,
      question: "`tasks` holat massiviga yangi elementni qanday qo'shish kerak?",
      options: [
        "tasks.push(newItem); setTasks(tasks);",
        "setTasks([...tasks, newItem]);",
        "tasks[tasks.length] = newItem; setTasks(tasks);",
        "tasks.add(newItem);"
      ],
      correctAnswer: 1,
      explanation: "Immutability ta'minlash uchun doim eski elementlar (spread operator) va yangi elementdan iborat yangi massiv yaratish kerak."
    },
    {
      id: 4,
      question: "`tasks.push(newTask)` kabi holat massivini to'g'ridan-to'g'ri o'zgartirsak nima bo'ladi?",
      options: [
        "Ilova darhol ishdan chiqadi.",
        "React o'zgarishni to'g'ri sezib, qayta chizadi.",
        "React holat o'zganganini sezmagan bo'lishi mumkin — massiv referensi o'zgarmaydi, shuning uchun qayta chizilmaydi.",
        "Element push qilinadi, lekin ID yo'qoladi."
      ],
      correctAnswer: 2,
      explanation: "React holat o'zgarganini referens tengligi orqali aniqlaydi. Mavjud massivni o'zgartirish esa referensni o'zgarmas qoldiradi."
    },
    {
      id: 5,
      question: "Holat massividagi elementni olib tashlash uchun qaysi massiv metodi eng mos?",
      options: [
        "slice()", 
        "splice()", 
        "filter()", 
        "pop()"
      ],
      correctAnswer: 2,
      explanation: "`filter()` shartdan o'tmagan elementlarni chiqarib tashlab yangi massiv yaratadi — elementni immutable o'chirish uchun juda qulay."
    },
    {
      id: 6,
      question: "Massivdagi aniq bir elementning xossasini o'zgartirish uchun qaysi massiv metodi eng mos?",
      options: [
        "filter()", 
        "map()", 
        "reduce()", 
        "forEach()"
      ],
      correctAnswer: 1,
      explanation: "`map()` xuddi shu uzunlikdagi yangi massiv yaratadi: maqsadli ID topilsa o'zgartirilgan obyektni, qolganlarga asl obyektni qaytaramiz."
    },
    {
      id: 7,
      question: "React'da \"controlled component\" (boshqariladigan komponent) nima?",
      options: [
        "Redux tomonidan boshqariladigan komponent.",
        "Qiymati butunlay React holati tomonidan boshqariladigan input elementi.",
        "Ichki holati bo'lmagan komponent.",
        "Qat'iy validatsiya qoidali input."
      ],
      correctAnswer: 1,
      explanation: "Inputning `value` xossasi holat o'zgaruvchisiga bog'lansa, u \"controlled component\"ga aylanadi."
    },
    {
      id: 8,
      question: "Forma yuborish handlerida nega `e.preventDefault()` chaqiramiz?",
      options: [
        "Forma yuborilganda butun sahifa yangilanishining standart HTML xulqining oldini olish uchun.",
        "React ilovani qayta chizishining oldini olish uchun.",
        "Foydalanuvchining tugmani ikki marta bosishining oldini olish uchun.",
        "Input maydonini avtomatik tozalash uchun."
      ],
      correctAnswer: 0,
      explanation: "Native formalar yuborilganda sahifani yangilaydi. Biz buni to'sib, holat yangilanishini butunlay React ichida boshqaramiz."
    },
    {
      id: 9,
      question: "LocalStorage ishlatganda `tasks` massivini saqlashda nega `JSON.stringify()` kerak?",
      options: [
        "Bu usulda LocalStorage xavfsizroq bo'ladi.",
        "LocalStorage faqat satrlarni saqlay oladi — murakkab obyekt yoki massivlarni to'g'ridan-to'g'ri saqlay olmaydi.",
        "Fayl hajmini kichraytiradi.",
        "Chunki React barcha holatlarni satr shaklida talab qiladi."
      ],
      correctAnswer: 1,
      explanation: "Web Storage API faqat satr qiymatlarni qo'llaydi. Obyekt/massivlarni saqlashdan oldin stringify, yuklashda parse qilish kerak."
    },
    {
      id: 10,
      question: "`{...task, completed: !task.completed}` ifodasida spread operator (`...task`) nima qiladi?",
      options: [
        "Vazifalar massivini satrga aylantiradi.",
        "Asl vazifa obyektining barcha xossalarini yangi obyektga nusxalaydi.",
        "Vazifani o'chiradi.",
        "task null bo'lsa xato tashlaydi."
      ],
      correctAnswer: 1,
      explanation: "Spread operator obyekt xossalarining sayoz nusxasini (shallow copy) yaratadi va `completed` kabi aniq maydonlarni xavfsiz almashtirish imkonini beradi."
    },
    {
      id: 11,
      question: "`localStorage`dan boshlang'ich holatni lazy usulda olishda `useState`ga nima beramiz?",
      options: [
        "Satr.",
        "Bo'sh massiv.",
        "Boshlang'ich holat qiymatini qaytaruvchi funksiya.",
        "localStorage obyekti."
      ],
      correctAnswer: 2,
      explanation: "`useState`ga funksiya berilsa, qimmat operatsiya (localStorage parse qilish kabi) faqat boshlang'ich renderda bir marta bajariladi."
    },
    {
      id: 12,
      question: "Foydalanuvchi bo'sh vazifa yubormoqchi bo'lsa, `handleSubmit` funksiyasida buni sodda qanday usulda ushlaymiz?",
      options: [
        "`deleteTask()` chaqirish.",
        "`if (!text.trim()) return;` tekshiruvi bilan yuborishni e'tiborsiz qoldirish.",
        "JavaScript xatosi tashlash.",
        "`e.preventDefault()`ni yana chaqirish."
      ],
      correctAnswer: 1,
      explanation: "Satrni trim qilib bo'shlig'ini tekshirish ro'yxatga bo'sh vazifa qo'shilishining oldini oladi. Handlerdan shunchaki erta `return` qilamiz."
    }
  ]
};
