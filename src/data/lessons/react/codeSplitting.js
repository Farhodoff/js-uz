export const codeSplitting = {
  title: "Code Splitting va Lazy Loading",
  content: `
# Code Splitting va Lazy Loading

React ilovalari (ayniqsa SPA - Single Page Application) kattalashgani sari, dastlabki yuklanish vaqti (Initial Load Time) sekinlashib boradi. Chunki Webpack yoki Vite butun ilovani bitta katta JavaScript fayliga (bundle) yig'ib qo'yadi.

### Code Splitting nima?
**Code Splitting** (Kodni bo'laklash) — bu butun dastur kodini bir nechta kichik qismlarga (chunklarga) ajratishdir. Foydalanuvchi faqat o'zi kirgan sahifa uchun kerakli bo'lgan kodnigina yuklab oladi.

### React.lazy va Suspense
React'da komponentlarni "dangasa" (lazy) usulda yuklash uchun \`React.lazy()\` dan foydalaniladi.
U komponentni darhol import qilmaydi, balki ekranda ko'rsatilishi kerak bo'lgandagina serverdan chaqiradi. Komponent yuklanayotgan paytda ekranda xato chiqmasligi uchun u albatta \`<Suspense>\` komponenti bilan o'ralishi va \`fallback\` (masalan, Spinner) berilishi shart.
\`,
  code: \`import React, { Suspense, useState } from "react";

// Komponentni faqat kerak bo'lganda (tugma bosilganda) yuklaymiz!
const HeavyComponent = React.lazy(() => {
  // Simulyatsiya qilingan kechikish (network latency)
  return new Promise(resolve => setTimeout(() => resolve({
    default: () => <div style={{ padding: 20, border: '1px solid black' }}>Men juda katta va og'ir komponentman!</div>
  }), 2000));
});

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h1>React.lazy va Suspense Namuna</h1>
      <button onClick={() => setShow(true)}>Komponentni Yuklash</button>
      
      {show && (
        <Suspense fallback={<p>Yuklanmoqda... Kuting...</p>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}\`,
  exercises: [],
  quizzes: []
};
