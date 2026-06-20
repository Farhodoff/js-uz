export const refImperative = {
  title: "Ref va useImperativeHandle",
  content: `
# Ref va useImperativeHandle

\`useRef\` hook'i ko'pincha state'ning ukasi deb ataladi, lekin u state'dan juda katta farq qiladi: uning qiymati o'zgarganda **komponent qayta render bo'lmaydi**.

### 1. useRef nimaga kerak?
* **DOM bilan ishlash:** DOM elementlarga to'g'ridan-to'g'ri murojaat qilish uchun (masalan, input'ga avtomatik fokus berish, scroll qilish).
* **Renderlar orasida ma'lumot saqlash:** Timer ID'lari, oldingi state qiymati kabi render trigger qilinishini talab etmaydigan qiymatlarni saqlash uchun.

### 2. forwardRef va useImperativeHandle
* Odatda siz bola komponentning DOM elementiga ota komponentdan turib murojaat qila olmaysiz. Bunga ruxsat berish uchun **\`forwardRef\`** ishlatiladi.
* **\`useImperativeHandle\`:** Agar siz ota komponentga butun bir DOM elementni emas, balki faqatgina o'zingiz belgilagan maxsus funksiyalarni (masalan, \`play()\`, \`pause()\`, \`focus()\`) bermoqchi bo'lsangiz, shu hookdan foydalanasiz. Bu React'da imperativ kod yozishning kamdan-kam holatlaridan biridir va u faqat zarurat tug'ilganda ishlatilishi kerak.
\`,
  code: \`import React, { useRef, useImperativeHandle, forwardRef } from "react";

// Bola komponent (faqat focus funksiyasini tashqariga beradi)
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    shunchakiFocusQil: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} placeholder="Bola input..." />;
});

export default function App() {
  const inputEl = useRef(null);

  return (
    <div>
      <h1>useImperativeHandle Namuna</h1>
      <CustomInput ref={inputEl} />
      <br/><br/>
      <button onClick={() => inputEl.current.shunchakiFocusQil()}>
        Tashqaridan Fokus Berish
      </button>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "useRef ning qanday asosiy xususiyati bor?",
    options: [
      "O'zgarsa komponent re-render bo'ladi",
      "Faqat raqam saqlashi mumkin",
      "Qiymati o'zgarganda komponent qayta render BO'LMAYDI",
      "Faqat formalar uchun kerak"
    ],
    correctAnswer: 2,
    explanation: "useRef ma'lumotni renderlarsiz saqlash va DOM ga to'g'ridan-to'g'ri bog'lanish uchun xizmat qiladi."
  }
]
};
