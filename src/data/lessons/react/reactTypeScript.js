export const reactTypeScript = {
  title: "TypeScript bilan Integratsiya",
  content: `
# TypeScript bilan Integratsiya

React va TypeScript birga ishlaganda koddagi xatolar (buglar) ehtimolini deyarli nolga tushiradi. U Props, State va Event'larni kod ishga tushmasdan oldinroq tekshirib (compile-time) dasturchiga yordam beradi.

### Asosiy tiplash (Typing) qoidalari
* **Props:** Komponent qanday ma'lumot qabul qilishini qat'iy belgilash uchun \`interface\` yoki \`type\` dan foydalaniladi.
* **State:** \`useState<number>()\` kabi generic yozish orqali state ichida faqat raqam yoki faqat massiv saqlanishini majburlash.
* **Events:** \`React.MouseEvent<HTMLButtonElement>\`, \`React.ChangeEvent<HTMLInputElement>\` kabi tiplar orqali tugma bosilganda yoki input o'zgarganda qanday ma'lumotlar kelishini avtomatlashtirish.
* **Generics:** Bitta komponent har xil turdagi ma'lumotlarni qabul qila oladigan qilib universal dizayn qilish (masalan, Turli xil ma'lumotlardan iborat Jadval yoki Ro'yxat).
`,
  code: `import React from "react";

// Typescriptda yozilgan komponent namunasini oddiy JS ga o'xshatish:
/*
interface UserProps {
  name: string;
  age: number;
  isActive?: boolean; // ? - ixtiyoriy prop
}

function UserCard({ name, age, isActive = true }: UserProps) {
  return <div>...</div>
}
*/

export default function App() {
  return (
    <div>
      <h1>TypeScript + React Namuna</h1>
      <p>TypeScript ishlatilganda, agar siz "age" propiga "yigirma" degan matn jo'natmoqchi bo'lsangiz, muharrir qizil chiziq tortib, dasturni ishlashiga ruxsat bermaydi.</p>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "React + TypeScript kodi paytida Props qanday tekshiriladi?",
    options: [
      "Himoyalanmaydi",
      "PropType orqali",
      "Maxsus 'interface' yaratilib ishga tushishdan oldin (compile-time) xatolar ko'rsatiladi",
      "Konsol orqali"
    ],
    correctAnswer: 2,
    explanation: "Eng katta kuch bu ishga tushishdan oldingi qat'iy tahlil."
  }
]
};
