export const jsxRendering = {
  title: "JSX va Rendering",
  content: `
# Rendering vs Committing

Ko'pchilik "render" bo'lishni "ekranda ko'rinish" deb o'ylaydi, aslida unday emas:

1. **Render Phase:** React komponentlaringizni chaqiradi va JSX'ni "Fiber" daraxti (yangi Virtual DOM) sifatida shakllantiradi. Bu bosqichda hech qanday DOM o'zgarishi sodir bo'lmaydi.
2. **Commit Phase:** React aniqlangan farqlarni (diffs) haqiqiy DOM'ga o'tkazadi (yaratish, o'chirish, yangilash).
3. **Browser Paint:** Brauzer o'zgargan DOM'ni chizadi.

## Component Re-render shartlari

Komponent qachon qayta render bo'ladi?

1. State o'zgarganda (\`useState\`, \`useReducer\`).
2. Prop'lar o'zgarganda (obyekt/massiv kabi \`reference\` turlari har doim yangi xotira manziliga ega bo'lsa, render triggerlanadi).
3. Ota komponent render bo'lsa, barcha bola komponentlar (agar \`memo\` ishlatilmagan bo'lsa) ham qayta render bo'ladi.
\`,
  code: \`import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("Render Phase: Komponent chaqirildi!");

  return (
    <div>
      <h1>Sanoq: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Renderni ishga tushirish
      </button>
      <p>Konsolni tekshiring: har safar bosganda qanday qilib render trigger bo'lishini ko'rasiz.</p>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "React'da 'Render Phase' nima qiladi?",
    options: [
      "O'zgarishlarni darhol haqiqiy DOM ga chizadi",
      "Faqat API dan ma'lumot olib keladi",
      "Komponentni chaqirib yangi Virtual DOM daraxtini yasaydi",
      "Browser oynasini yangilaydi"
    ],
    correctAnswer: 2,
    explanation: "Render bosqichi bu faqat Virtual DOM'ni hisob-kitob qilishdir. U haqiqiy DOM'ga umuman tegmaydi."
  }
]
};
