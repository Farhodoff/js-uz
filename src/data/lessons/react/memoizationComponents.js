export const memoizationComponents = {
  title: "Memoization Components (React.memo)",
  content: `
# Memoization Components (React.memo)

Odatda React'da ota komponent qayta render bo'lsa, uning ichidagi barcha bola komponentlar (garchi ularning proplari umuman o'zgarmagan bo'lsa ham) avtomatik tarzda qayta render bo'ladi.

### React.memo nima?
\`React.memo\` — bu Higher Order Component (HOC) bo'lib, u komponentni "o'rab oladi". U komponentga kirayotgan yangi proplarni eskisi bilan sayoz (shallow) solishtiradi. Agar proplar o'zgarmagan bo'lsa, React bu komponentni qayta render qilmasdan avvalgi keshlangan (memoized) natijani ekranga chizadi.

### Qachon ishlatish KERAK?
* Bola komponent juda ko'p HTML elementlaridan tashkil topgan bo'lsa va uni render qilish og'ir bo'lsa.
* Ota komponentdagi state tez-tez o'zgarib turadigan holatlarda (masalan inputga har bir harf yozilganda, lekin pastdagi grafik komponenti unga bog'liq bo'lmasa).

### Qachon ishlatish FOYDASIZ (va zararli)?
* Agar komponent har doim yangi proplar qabul qilsa (masalan \`children\` prop yoki har safar yangi yaratiladigan ob'ektlar / inline funksiyalar).
* Oddiy kichkina komponentlar uchun (React ularni shundoq ham juda tez render qiladi, ularni xotirada eslab qolish va solishtirish jarayoni esa ba'zan render qilishdan ham ko'proq vaqt olishi mumkin).
\`,
  code: \`import React, { useState, memo } from "react";

// React.memo bilan o'ralgan bola komponent
const ExpensiveChild = memo(({ name }) => {
  // Bu faqat 'name' prop o'zgargandagina konsolga yoziladi
  console.log("ExpensiveChild qayta render bo'ldi!");
  return <div style={{ border: "2px solid blue", padding: 10 }}>Mening ismim: {name}</div>;
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>React.memo Namuna</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Sanoq (Ota komponent re-render bo'ladi): {count}
      </button>
      <br/><br/>
      {/* Sanoq o'zgargani bilan pastdagi qism qayta chizilmaydi, chunki prop o'zgarmadi! */}
      <ExpensiveChild name="Ali" />
      <p>Konsolni tekshiring: tugmani bosganingizda bola komponent qayta ishlamayapti.</p>
    </div>
  );
}\`,
  exercises: [],
  quizzes: []
};
