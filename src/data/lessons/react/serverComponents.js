export const serverComponents = {
  title: "Server Components (RSC)",
  content: `
# Server Components (RSC)

React o'zining butunlay yangi erasiga qadam qo'ydi: **React Server Components (RSC)**. Bu arxitektura hozirda Next.js 13+ (App Router) da to'liq joriy qilingan.

### U nima va nega kerak?
Odatda React kodi brauzerga js fayl (bundle) sifatida tushadi va foydalanuvchi qurilmasida hisoblanib HTML ga aylanadi (Bunga Client Components deyiladi).
**Server Components** esa to'g'ridan-to'g'ri serverning o'zida bajariladi va brauzerga faqat tayyor, yengil HTML (va maxsus JSON formati) jo'natiladi. Bu degani: brauzerga hech qanday og'ir kutubxonalar va JS kodi yuklanmaydi!

### Asosiy qoidalar:
1. **Server Component (Default):** Agar sizga ma'lumotlar bazasidan (Database) to'g'ridan-to'g'ri narsa olish kerak bo'lsa yoki API kalitlarni sir saqlash kerak bo'lsa buni ishlating. Ular SEO uchun juda zo'r va tez ishlaydi.
2. **Client Component (\`"use client"\`):** Agar sizga foydalanuvchi bilan interaktivlik (\`onClick\`, \`useState\`, \`useEffect\`) kerak bo'lsa, faylning eng tepasiga \`"use client"\` yozib aynan shu qismni brauzerga hisoblash uchun jo'natasiz.
`,
  code: `import React from "react";

export default function App() {
  return (
    <div>
      <h1>Server Components vs Client Components</h1>
      <pre style={{ background: '#eee', padding: 10, borderRadius: 5 }}>
{\`// layout.js (Server Component)
import db from './database';

export default async function Layout({ children }) {
  // DB ga to'g'ridan-to'g'ri so'rov!
  const user = await db.getUser();
  
  return (
    <div>
      <h1>Salom, {user.name}!</h1>
      {/* Interactive tugma uchun maxsus Client Component chaqiramiz */}
      <LikeButton />
    </div>
  );
}

// LikeButton.js (Client Component)
"use client";
import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(l => l+1)}>❤️ {likes}</button>;
}\`}
      </pre>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "React Server Components (RSC) ni qachon ishlatish ZARARLI?",
    options: [
      "Bazaga to'g'ridan-to'g'ri ulanishda",
      "Fayl hajmini kichraytirishda",
      "Tugmada onClick, useState kerak bo'lganda",
      "API ni yashirish uchun"
    ],
    correctAnswer: 2,
    explanation: "Agar komponent interaktiv bo'lishi kerak bo'lsa u oddiy Client Component bo'lishi shart."
  }
]
};
