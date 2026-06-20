export const memoizationHooks = {
  title: "Memoization: useMemo va useCallback",
  content: `
# Memoization Hooks

React'da **Memoization** — bu qimmatli (og'ir) hisob-kitoblarni yoki funksiyalarni har safar komponent qayta render bo'lganda boshqatdan yaratmaslik uchun keshlash (eslab qolish) jarayoni.

### 1. useMemo
* **Vazifasi:** Qandaydir qimmatli hisob-kitob (masalan, katta massivni filtr qilish yoki murakkab matematika) natijasini keshlash.
* **Qachon ishlatilishi kerak:** Faqatgina hisob-kitob rostdan ham sekin bo'lsa yoki olingan obyekt (reference) keyingi re-renderda ham o'zgarmasdan qolishi muhim bo'lsa. 
* **Qachon KERAK EMAS:** Oddiy hisob-kitoblar ($a+b$ kabi) uchun \`useMemo\` ni ishlatish dasturni tezlashtirmaydi, aksincha xotiradan joy olib sekinlashtiradi!

### 2. useCallback
* **Vazifasi:** Funksiyaning xotiradagi o'rnini (reference) saqlab qolish. React'da har bir render paytida barcha o'zgaruvchilar va funksiyalar boshqatdan yaratiladi. 
* **Qachon ishlatilishi kerak:** Agar siz funksiyani \`React.memo\` bilan o'ralgan bola komponentga (child component) Prop sifatida uzatayotgan bo'lsangiz. Agar \`useCallback\` ishlatmasangiz, bola komponent funksiya o'zgardi deb o'ylab keraksiz qayta render bo'laveradi.
* **Qachon KERAK EMAS:** Oddiy HTML tugmalari (\`<button onClick={handleClick}>\`) ga uzatiladigan funksiyalar uchun \`useCallback\` ishlatishdan foyda yo'q.
`,
  code: `import React, { useState, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Qimmatli hisob kitobni simulyatsiya qilish
  const expensiveCalculation = useMemo(() => {
    console.log("Qimmatli hisob-kitob bajarilmoqda...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) { result += 1; }
    return result;
  }, []); // [] bo'lgani uchun faqat bir marta hisoblanadi

  return (
    <div>
      <h1>useMemo Namuna</h1>
      <p>Hisob natijasi: {expensiveCalculation}</p>
      
      <button onClick={() => setCount(c => c + 1)}>Sanoq: {count}</button>
      <br/><br/>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Matn kiriting..."
      />
      <p>Sanoqni yoki matnni o'zgartirganda "Qimmatli hisob-kitob" qayta bajarilmaydi.</p>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "useCallback va useMemo qachon ishlatilishi ZARARLI?",
    options: [
      "Hech qachon",
      "API dan ma'lumot olayotganda",
      "Oddiy yengil hisob-kitoblar va mayda komponentlar uchun",
      "React.memo bilan birga"
    ],
    correctAnswer: 2,
    explanation: "Memoization (keshlash) o'zi xotira oladi. Shuning uchun mayda narsaga ishlataverish dasturni sekinlashtiradi."
  }
]
};
