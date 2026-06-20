export const componentLifecycle = {
  title: "Component Lifecycle va useEffect",
  content: `
# State va Lifecycle mexanizmi

React komponentlari qanday qilib "eslab qoladi"?

* **Closures:** Hooklar aslida funksiya ichidagi yopiq muhit (closure) orqali ishlaydi.
* **Linked List:** React komponent ichidagi hooklarni (\`useState\`, \`useEffect\`) bir qator (linked list) ko'rinishida saqlaydi. Shuning uchun ham **hooklarni hech qachon shartli ifoda (\`if\`) yoki tsikl ichida ishlatib bo'lmaydi**, chunki tartib buzilsa, React qaysi state qaysi o'zgaruvchiga tegishli ekanligini yo'qotadi.

# useEffect'ning "qorong'u" tomoni

\`useEffect\` faqat "component did mount" uchun emas.

* **Synchronization (Sinxronizatsiya):** \`useEffect\` komponent hayot sikli emas, balki "tashqi tizim" (API, DOM, Event Listeners) bilan komponent state'ini sinxronlashtirish vositasi.
* **Dependencies:** \`dependency array\` ( \`[]\`) bu "qachon ishga tushish" emas, balki "qachon qayta sinxronizatsiya qilish" deganidir. Agar array bo'sh bo'lsa, u faqat bir marta ishlaydi.
\`,
  code: \`import React, { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Tashqi tizim (DOM API) bilan sinxronizatsiya
    document.title = \`Sanoq: \${count}\`;
    
    // Clean-up funksiyasi
    return () => {
      document.title = "React App";
    };
  }, [count]); // 'count' o'zgarganda qayta sinxronlashadi

  return (
    <div>
      <h1>Sanoq: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Oshirish</button>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "useEffect qachon ishga tushadi agar uning dependency array'i bo'sh [] bo'lsa?",
    options: [
      "Har safar komponent qayta render bo'lganda",
      "Faqat komponent birinchi marta chizilganda (mount)",
      "Hech qachon ishga tushmaydi",
      "Sahifa yopilayotganda"
    ],
    correctAnswer: 1,
    explanation: "Bo'sh array [] bo'lsa, u faqat birinchi renderdan so'ng bir marta ishlaydi."
  }
]
};
