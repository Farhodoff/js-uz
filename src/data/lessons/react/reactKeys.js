export const reactKeys = {
  title: "Keys va Listlar bilan ishlash",
  content: `
# "Key" propining ichki roli

\`key\` bu shunchaki ro'yxat uchun kerakli narsa emas. Bu React'ga **identifikatsiya** qilish uchun kerak.

* Agar siz \`index\` dan foydalansangiz, ro'yxatga element qo'shilganda React eski va yangi elementlarni chalkashtirib yuboradi va DOM'ni keraksiz qayta chizadi (yoki state'larni noto'g'ri bog'laydi).
* Unique ID (\`id\`) ishlatish orqali React elementlar o'rnini almashtirganda DOM'ni to'liq qayta render qilmaydi, balki shunchaki "ko'chirib o'tkazadi".
\`,
  code: \`import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Olma" },
    { id: 2, name: "Banan" }
  ]);

  const addItem = () => {
    // Ro'yxat boshiga element qo'shish
    setItems([{ id: Date.now(), name: "Yangi meva" }, ...items]);
  };

  return (
    <div>
      <button onClick={addItem}>Boshiga qo'shish</button>
      <ul>
        {items.map(item => (
          // key={item.id} ni key={index} ga almashtirib ko'ring (input'dagi o'zgarishlarga e'tibor bering)
          <li key={item.id}>
            {item.name} <input type="text" placeholder="Izoh..." />
          </li>
        ))}
      </ul>
    </div>
  );
}\`,
  exercises: [],
  quizzes: [
  {
    question: "Nega ro'yxatlarda (lists) index'ni key sifatida ishlatish tavsiya etilmaydi?",
    options: [
      "React xato berib ishlamay qoladi",
      "Ular juda ko'p xotira band qiladi",
      "Elementlar o'rni almashsa, React ularni chalkashtirib DOM ni noto'g'ri yangilashi mumkin",
      "Browser indexlarni raqam emas harf deb tushunadi"
    ],
    correctAnswer: 2,
    explanation: "Indexlar doimiylikni saqlamaydi. Agar ro'yxatning boshiga yangi element qo'shilsa, barcha indexlar o'zgarib ketadi."
  }
]
};
