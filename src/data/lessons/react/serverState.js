export const serverState = {
  title: "Server State: TanStack Query",
  content: `
# Server State: TanStack Query (React Query)

Backend'dan keladigan ma'lumotlarni (Server holatini) boshqarish qiyin vazifa. An'anaviy usulda siz \`useEffect\` va \`useState\` yordamida fetch qilasiz, loading, error kabi state'larni qo'lda yaratasiz.

**TanStack Query** (oldingi nomi React Query) esa bu ish uchun eng zo'r yechim hisoblanadi.

* **Vazifasi:** API so'rovlarini avtomatlashtirish, ma'lumotlarni keshlash (caching), avtomatik yangilash (refetch in background), yuklanish (\`loading\`) va xatolik (\`error\`) holatlarini boshqarish.
* **Muhim jihat:** Bu kutubxona ishlatilgach, ko'pincha global "state" (masalan Redux) ga ehtiyoj qolmaydi. Backend ma'lumotlari to'g'ridan-to'g'ri keshdan istalgan komponentda ishlatilishi mumkin bo'ladi.
\`,
  code: \`import React from "react";
// Odatda _app.js da QueryClientProvider bilan o'raladi.
// import { useQuery } from "@tanstack/react-query";

export default function App() {
  /*
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/Farhodoff/js-uz').then((res) =>
        res.json(),
      ),
  })
  
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  */

  return (
    <div>
      <h1>TanStack Query Namuna</h1>
      <p>Bu erda TanStack Query so'rovlari ko'rsatiladi. Kod ichidagi izoh (comment)larni o'qing.</p>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "TanStack Query (React Query) qanday muammoni hal qiladi?",
    options: [
      "HTML stillarini o'zgartirish",
      "Server holati (ma'lumotlarni keshlash, yuklash va yangilash)",
      "Redux ni o'chirish",
      "Local state'ni saqlash"
    ],
    correctAnswer: 1,
    explanation: "TanStack Query aynan backend ma'lumotlarini samarali saqlash va boshqarish uchun yaratilgan."
  }
]
};
