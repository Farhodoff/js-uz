export const componentTesting = {
  title: "Component Testing (RTL)",
  content: `
# Component Testing (RTL)

**React Testing Library (RTL)** — bu React komponentlarini foydalanuvchi ko'zi bilan test qilish uchun eng mashhur va rasmiy standart vositadir.

* **Falsafasi:** RTL dasturni "kapot ostidagi" implementatsiyasi (masalan, \`state\`da qanday ob'ekt saqlanayotgani yoki qaysi hook ishlayotgani) bilan umuman qiziqmaydi. U faqatgina **foydalanuvchiga nima ko'rinyapti** va **tugmani bosganda ekranda qanday HTML paydo bo'lyapti**, shuni tekshiradi.
* **Nega bu muhim?** Agar siz dasturingiz kodi implementatsiyasini (Refactor) qilsangiz — masalan \`useState\` dan \`useReducer\` ga o'tsangiz — foydalanuvchi buni sezmaydi. RTL bilan yozilgan testlaringiz ham xato bermasdan o'tishda davom etadi. Demak siz kodni emas, natijani test qilasiz.
`,
  code: `import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>RTL Falsafasi</h1>
      <pre style={{ background: '#eee', padding: 10, borderRadius: 5 }}>
{\`// App.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('tugmani bosganda matn o'zgaradi', () => {
  render(<App />);
  
  // Ekranda "Jo'natish" degan tugmani topish
  const button = screen.getByRole('button', { name: /jo'natish/i });
  
  // Tugmani bosish
  fireEvent.click(button);
  
  // Ekranda yangi matn paydo bo'lganini tekshirish
  expect(screen.getByText(/Muvaffaqiyatli/i)).toBeInTheDocument();
});\`}
      </pre>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "RTL qanday falsafaga asoslangan?",
    options: [
      "Private state test qilish",
      "Kapot ostidagi kodni emas, foydalanuvchi ekranda aynan nima ko'rayotganini tekshirish",
      "Faqat CSS ni tekshirish",
      "Uzun test yozish"
    ],
    correctAnswer: 1,
    explanation: "Dastur mantiqini refactor qilsangiz ham testlar o'tishini ta'minlaydi."
  }
]
};
