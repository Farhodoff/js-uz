export const serverComponents = {
  id: "serverComponents",
  title: "Zamonaviy React: Server Components (RSC)",
  content: `
# React Server Components (RSC)

React o'zining butun tarixi davomida "Mijoz tomonida ishlovchi" (Client-side) kutubxona bo'lib kelgan. Ya'ni, React kodlari brauzerda (foydalanuvchining telefon yoki kompyuterida) yig'ilgan, ishlagan va chizilgan.

Lekin **React 18** dagi yepyangi xususiyat bilan butun frontend olamida katta inqilob yuz berdi: **React Server Components (RSC)**. Bu haqida gap ketganda ko'pincha **Next.js** framework'i misol qilinadi, chunki u RSC ni to'liq o'zlashtirgan birinchi tizimdir.

## 1. Server Component nima?

**Server Component** — bu faqat va faqat Serverda ishlaydigan (render bo'ladigan) va brauzerga o'zining JavaSript kodini (bundle) umuman yubormaydigan komponentdir.

Buning qanday katta plyuslari bor?
1. **Bundle hajmi Nolga teng:** Tasavvur qiling, siz \`date-fns\` (sana bilan ishlovchi katta kutubxona) ni Server Component ichida ishlatdingiz. Brauzerga bu kutubxona mutlaqo bormaydi, u faqat tayyor matn (sana) ni qabul qilib oladi.
2. **Ma'lumotlar bazasiga (Database) to'g'ridan-to'g'ri ulanish:** API yozish, \`useEffect\` va \`fetch\` qilish kabi azoblardan qutulasiz. Component ichida to'g'ridan to'g'ri bazaga so'rov yozib yuborish mumkin!
3. **SEO uchun ajoyib:** Qidiruv tizimlari (Google) uchun sahifalar tezroq va tayyor kontent bilan ochiladi.

\`\`\`tsx
// Bu Server Component! 
// Hech qanday "use client" yo'q, va u asinxron (async) ishlay oladi.

import db from './database'; // Haqiqiy bazaga ulanish

export default async function UserList() {
  // useEffect yoki API shart emas. To'g'ridan to'g'ri bazadan olamiz!
  const users = await db.query('SELECT * FROM users');

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## 2. Server Component qila OLMAYDIGAN ishlar

RSC lar ajoyib bo'lsa-da, ularning o'ziga xos cheklovlari bor, ular brauzer (Mijoz) narsalarini tushunmaydi:
- **State va Hooklar yo'q:** Ularda \`useState\`, \`useReducer\`, \`useEffect\` ishlatib bo'lmaydi.
- **Hodisalar (Events) yo'q:** Ularda \`onClick\`, \`onChange\` kabi foydalanuvchi bilan interaktivlik bo'lmaydi.
- **Browser API lari yo'q:** Ular \`window\`, \`localStorage\` kabi faqat brauzerda bor bo'lgan narsalarga ulana olmaydi.

## 3. "use client" (Mijoz komponentlari)

Xo'sh, unda tugma bosilganda ishlaydigan (interaktiv) komponentlarni qanday yozamiz?
Buning uchun faylning eng tepasiga **\`"use client"\`** deb yozib qo'yamiz. Bu oddiy, biz hozirgacha o'rgangan va ishlatib kelgan an'anaviy React komponentlaridir.

\`\`\`tsx
"use client"; // Bu qator komponent brauzerda ishlashini (JS bundle bo'lib borishini) bildiradi

import { useState } from 'react';

export default function Counter() {
  // useState va onClick endi bemalol ishlaydi
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(c => c + 1)}>Sanoq: {count}</button>;
}
\`\`\`

## 4. Oltin Qoida (Qayerda qaysi birini ishlatish kerak?)

Next.js v13+ da barcha komponentlar sukut bo'yicha (default) **Server Component** hisoblanadi.

**Server Component qachon ishlatiladi?**
- Bazadan ma'lumot olishda (Fetch, DB qidiruvlar)
- Faqat ko'rsatish uchun (Blog post matni, Header, Footer)
- Og'ir kutubxonalar bilan ishlaganda

**Client Component ("use client") qachon ishlatiladi?**
- Foydalanuvchi bosishi, yozishi (interaktivlik) kerak bo'lgan joylarda
- \`useState\`, \`useEffect\` va boshqa Hooklar kerak bo'lganda
- Brauzer API lariga (localStorage) ulanish kerak bo'lganda

### Xulosa
React arxitekturasi o'zgarmoqda: U "Faqat brauzer" (Client) kutubxonasidan "Server va Mijoz uyg'unligi" (Fullstack) tizimiga aylanmoqda. Bu ayniqsa katta va jiddiy loyihalarda performance va xavfsizlik borasida beqiyos imkoniyatlar yaratadi.
  `,
  code: `import React, { useState } from "react";

// Bu oddiy "Mijoz" (Client) komponenti
const LikeButton = ({ initialLikes }) => {
  // Unda useState va onClick ishlaydi
  const [likes, setLikes] = useState(initialLikes);
  return (
    <button 
      onClick={() => setLikes(likes + 1)}
      style={{ padding: "5px 10px", background: "pink", border: "none", borderRadius: "5px", cursor: "pointer" }}
    >
      ❤️ {likes} Likes
    </button>
  );
};

// Bu esa Server Komponent simulyatsiyasi (Aslida async bo'ladi)
const ServerBlogContent = () => {
  return (
    <div style={{ padding: "20px", background: "#f0f0f0", borderRadius: "10px", margin: "10px 0" }}>
      <h2>O'zbekistonda yozgi havo harorati</h2>
      <p style={{ color: "gray", fontSize: "12px" }}>
        [SERVER]: Bu ma'lumotlar bazadan olindi va brauzerga faqat HTML matn bo'lib keldi.
        Uning ichida hech qanday ortiqcha JavaScript (Bundle) yo'q.
      </p>
      <p>
        Bu yil yoz odatdagidan issiq kelishi kutilmoqda. Bu kontent statik bo'lgani uchun
        uni Mijoz (Client) komponent qilish shart emas.
      </p>
    </div>
  );
};

export default function RSC_Simulator() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Server Components Namuna (G'oya)</h1>
      <p>
        Haqiqiy Next.js (App Router) da siz sahifani qismlarga bo'lasiz. Odatda asosiy 
        qavat (Layout, Maqola matni) Serverda ishlaydi, faqatgina bosiladigan kichik 
        qismlar (Tugmalar, Izoh yozish formasi) Mijozga ("use client") o'tadi.
      </p>

      {/* Asosiy va og'ir kontent Server Component dan keladi */}
      <ServerBlogContent />

      <div style={{ marginTop: "10px" }}>
        {/* Interaktiv qism (Tugma) Client Component ga aylanadi */}
        <LikeButton initialLikes={45} />
      </div>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>
        <strong>Muhim qoida:</strong> Server Component ichida Client Component ni ishlatish (chaqirish) mumkin. Lekin Client Component ichida (odatda) Server Component ishlatib bo'lmaydi!
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "'use client' ni qo'shish",
      description: "Bizning komponentimizda \`useState\` ishlatilgan. Ammo u ishlamayapti, chunki Server komponent deb o'ylamoqda. Uni Mijoz komponentiga aylantiring.",
      startingCode: `// VAZIFA: Faylning eng boshiga maxsus direktivani qo'shing\n\nimport { useState } from 'react';\n\nexport default function Toggle() {\n  const [on, setOn] = useState(false);\n  return <button onClick={() => setOn(!on)}>{on ? "Yoniq" : "O'chiq"}</button>;\n}`,
      solution: `"use client";\n\nimport { useState } from 'react';\n\nexport default function Toggle() {\n  const [on, setOn] = useState(false);\n  return <button onClick={() => setOn(!on)}>{on ? "Yoniq" : "O'chiq"}</button>;\n}`,
      hint: "Kodni eng tepasiga (importlardan ham oldin) qo'shtirnoq ichida \`\"use client\";\` deb yozing."
    },
    {
      id: 2,
      title: "Server Component da ma'lumot olish",
      description: "Server komponentlar ajoyib, u yerda biz oddiy funksiyani \`async\` qilib uning ichida bevosita ma'lumot kuta olamiz.",
      startingCode: `// VAZIFA: Funksiyani asinxron qiling va getPosts() dan natija qaytishini kuting\nexport default function PostList() {\n  // VAZIFA: await qo'shing\n  const posts = getPosts(); // Baza funksiyasi (faraz qilamiz)\n\n  return <ul>{posts.map(p => <li>{p.title}</li>)}</ul>;\n}`,
      solution: `export default async function PostList() {\n  const posts = await getPosts();\n\n  return <ul>{posts.map(p => <li>{p.title}</li>)}</ul>;\n}`,
      hint: "\`async function PostList()\` va \`await getPosts()\` dan foydalaning."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React Server Component (RSC) larning eng yirik ustunligi nimada?",
      options: [
        "Ular qizil rangda bo'ladi",
        "Ular brauzerga (foydalanuvchiga) JavaScript kodini mutlaqo jo'natmaydi (Bundle size 0 bo'ladi), natijada sahifa juda tez ochiladi",
        "Ularning ichida onClick har doim ishlaydi",
        "Ular avtomatik tarzda formani validatsiya qiladi"
      ],
      correctAnswer: 1,
      explanation: "RSC faqat serverda ishlaydi, u yerdan qandaydir ma'lumotni hisoblab uni oddiy HTML matni shaklida mijozga yuboradi xolos. U yerda kutubxonalar ishlatilsa ham mijoz ularni yuklab olishga sarf-xarajat qilmaydi."
    },
    {
      id: 2,
      question: "Server Component lar ichida quyidagilardan qaysi birini ishlata OLMAYMIZ?",
      options: [
        "Database ga to'g'ridan to'g'ri so'rovni",
        "await (Asinxron kutish)",
        "if va for tsikllarini",
        "useState va onClick"
      ],
      correctAnswer: 3,
      explanation: "Serverda interaktivlik bo'lmaydi. Server uzoqda, foydalanuvchi esa o'z telefonining ekranini bosyapti. Bosilish hodisalari va UI o'zgarishlari (useState) faqat 'Mijoz' (Client) qavatiga tegishlidir."
    },
    {
      id: 3,
      question: "Oddiy komponentni 'Mijoz qavatida' (Client Component) ishlashini qanday qilib bildiramiz?",
      options: [
        "export client function ...",
        "Kompilyator buni o'zi hal qiladi",
        "Faylning eng birinchi qatoriga 'use client' direktivasini yozish orqali",
        "Faqat jsx o'rniga .client kengaytmasidan foydalanib"
      ],
      correctAnswer: 2,
      explanation: "Next.js va React 18 da 'use client' orqali biz serverga 'To'xta, bu komponentni sen u yerda yurmurgiz, uni o'zgartirmay brauzerga yubor, chunki uning ichida foydalanuvchi interaktivligi (useState/onClick) bor' deymiz."
    },
    {
      id: 4,
      question: "Server Component va Client Component ning to'g'ri integratsiya (aralashuvi) qoidasi qaysi?",
      options: [
        "Ular umuman bir-biri bilan ishlay olmaydi",
        "Client Component ichida to'g'ridan-to'g'ri Server Component ni import qilib chaqirish mumkin",
        "Server Component ichida Client Component ni (bolasi sifatida) bemalol import qilib ishlatsa bo'ladi",
        "Ularning ikkisi bitta faylda yozilishi shart"
      ],
      correctAnswer: 2,
      explanation: "Umumiy qoida: daraxtning ildizi va tana qismi (Server Component) bo'ladi. Uning novdalari (masalan, interaktiv tugmalar) Client Component bo'ladi. Demak, Server ichiga Client ni bemalol joylashtirsa bo'ladi."
    }
  ]
};
