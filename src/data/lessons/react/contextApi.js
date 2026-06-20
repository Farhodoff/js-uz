export const contextApi = {
  title: "Context API va Global State",
  content: `
# Context API

React'ning o'rnatilgan funksiyasi bo'lib, Global State'ni boshqarish uchun qulay yechim.

* **Qachon ishlatiladi:** Kam o'zgaradigan global ma'lumotlar uchun (masalan, Theme (Dark/Light), Language (Til sozlamalari)).
* **Kamchiligi:** Agar Context qiymati tez-tez o'zgarib tursa, Context'ga ulangan **barcha** komponentlar qayta render bo'ladi (bu ishlash unumdorligi muammosiga olib keladi). Shuning uchun har bir kichik holat uchun Context ishlatish tavsiya etilmaydi.
\`,
  code: \`import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: '20px' }}>
      <p>Joriy mavzu: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Mavzuni o'zgartirish</button>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "Context API qachon eng ko'p asqotadi?",
    options: [
      "Tez o'zgaradigan API javoblarini saqlash uchun",
      "Ilovadagi har bir inputni boshqarish uchun",
      "Kam o'zgaradigan global ma'lumotlar (Theme, Til) uchun",
      "Component Lifecycle o'rniga"
    ],
    correctAnswer: 2,
    explanation: "Context API tez-tez o'zgaradigan ma'lumotlar uchun mos emas, u butun ilovaga ta'sir qiluvchi sozlamalar uchun idealdir."
  }
]
};
