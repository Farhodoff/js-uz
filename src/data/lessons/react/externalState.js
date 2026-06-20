export const externalState = {
  title: "External State Libraries (Zustand, Redux)",
  content: `
# External State Libraries

Global va tez o'zgaruvchan ma'lumotlar uchun tashqi kutubxonalardan foydalanish standartga aylangan. Prop drilling va Context re-render muammolarini yechish uchun biz asosan ikkita vositadan birini tanlaymiz:

### 1. Zustand (Tavsiya etiladi)
Hozirgi kunda eng tez ommalashayotgan kutubxona.
* **Afzalligi:** Juda yengil, minimal kod talab qiladi, Redux'ga qaraganda ancha sodda.
* **Ishlashi:** "Store" yaratasiz va uni istalgan komponentdan (hatto komponentdan tashqarida ham) to'g'ridan-to'g'ri chaqirasiz.

### 2. Redux Toolkit (RTK)
Murakkab va katta ilovalar uchun sanoat standarti.
* **Afzalligi:** Katta jamoalar uchun juda qulay, markazlashgan va "predictable" (oldindan bashorat qilinadigan) ma'lumotlar oqimi.
* **Kamchiligi:** Ko'p "boilerplate" kod talab qiladi.
`,
  code: `import React from "react";
import { create } from "zustand";

// 1. Store yaratamiz
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default function App() {
  // 2. Store dan qiymat va funksiyalarni olamiz
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);

  return (
    <div>
      <h1>Zustand Ayiqlari: {bears} 🐻</h1>
      <button onClick={increasePopulation}>Ayiq qo'shish</button>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "Zustand kutubxonasining Redux'dan asosiy ustunligi nima?",
    options: [
      "Faqat TypeScript da yozilgani",
      "Boilerplate (ortiqcha) kodsiz, juda yengil va oddiy ishlashi",
      "Faqat Class komponentlar uchun ekanligi",
      "React jamoasi tomonidan yozilgani"
    ],
    correctAnswer: 1,
    explanation: "Zustand juda sodda API ga ega bo'lib, Redux kabi ko'plab fayllar (reducers, actions) yaratishni talab qilmaydi."
  }
]
};
