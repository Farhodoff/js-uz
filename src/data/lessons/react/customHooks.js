export const customHooks = {
  title: "Custom Hooks yozish",
  content: `
# Custom Hooks (O'z hooklaringizni yozish)

React'da **Custom Hooks** bu shunchaki "use" so'zi bilan boshlanadigan va ichida boshqa React Hook'larini ishlatuvchi oddiy JavaScript funksiyalaridir.

Lekin nima uchun ular bunchalik muhim? 

### 1. Mantiqni (Logic) UI dan ajratish
Odatda komponent ichida ham dizayn (JSX), ham ma'lumotlarni olish mantiqi (fetch, state, useEffect) aralashib ketadi. Custom hooklar orqali siz mantiqni alohida faylga olib chiqib, komponentni faqat vizual qismga (Presentational) aylantira olasiz.

### 2. Kodni qayta ishlatish (Reusability)
Agar bir xil mantiq (masalan, dark/light rejimini almashtirish, oyna o'lchamini kuzatish yoki serverdan ma'lumot olish) bir nechta joyda kerak bo'lsa, uni har bir komponentda qayta yozish o'rniga bitta \`useTheme\`, \`useWindowSize\` yoki \`useFetch\` hookiga aylantiramiz.

**Muhim qoida:** Custom hooklar faqatgina **state mantiqini** ulashadi, state'ning o'zini emas! Ya'ni bitta hookni ikkita komponentda ishlatsangiz, ularning har birida mutlaqo mustaqil va alohida state yaratiladi.
\`,
  code: \`import React, { useState, useEffect } from "react";

// CUSTOM HOOK YARATISH
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    
    // Clean-up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function App() {
  // HOOKDAN FOYDALANISH
  const width = useWindowWidth();

  return (
    <div>
      <h1>Custom Hooks Namuna</h1>
      <p>Hozirgi oyna kengligi: <strong>{width}px</strong></p>
      <p>Oynani kichraytirib kattalashtirib ko'ring.</p>
    </div>
  );
}\`,
  exercises: [],
  quizzes: []
};
