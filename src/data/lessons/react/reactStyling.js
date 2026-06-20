export const reactStyling = {
  title: "Styling: Tailwind CSS va CSS-in-JS",
  content: `
# Styling: Zamonaviy Yondashuvlar

React komponentlarini stillash (dizayn berish) uchun bugungi kunda asosan 2 ta eng mashhur yondashuv mavjud. Odatdagi CSS fayllarni import qilish hozirda ko'p muammolarni keltirib chiqargani (klas nomlari to'qnashuvi) uchun yangicha uslublarga o'tilgan.

### 1. Tailwind CSS (Hozirgi standart)
* **Utility-First:** Barcha stillar oldindan tayyorlangan kichik sinflar (masalan, \`flex\`, \`p-4\`, \`text-center\`) orqali beriladi.
* **Afzalligi:** Siz alohida \`.css\` fayl yaratmaysiz. Komponent va uning ko'rinishi bitta joyda (JSX ichida) saqlanadi. Loyiha qanchalik kattalashmasin, yakuniy CSS fayl hajmi oshib ketmaydi. Hozirda Next.js va React dunyosida eng ommabop yechim hisoblanadi.

### 2. CSS-in-JS (Styled Components)
* **Vazifasi:** CSS'ni to'g'ridan-to'g'ri JavaScript (yoki TypeScript) ichida yozish. 
* **Afzalligi:** Dinamik stillar yaratish juda qulay (masalan, props orqali rangni mantiqan o'zgartirish).
* **Kamchiligi:** Odatda ilova ishlash paytida (runtime) CSS'ni hisoblagani uchun tezlikka biroz ta'sir ko'rsatadi. Server Components (Next.js 13+) bilan ishlashda qiyinchiliklar tug'dirishi mumkin.
`,
  code: `import React from "react";

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Styling Namunalari</h1>
      
      {/* Inline Style */}
      <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '10px' }}>
        Inline Style Tugma
      </button>

      {/* Tailwind namunasiga o'xshatma */}
      <button className="bg-green-500 text-white p-3 rounded shadow" style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        Tailwind-ga o'xshash Tugma
      </button>
      
      <p style={{ marginTop: '20px' }}>Tailwind loyihangizga o'rnatilgach, siz class="bg-blue-500 p-4" kabi classlar orqali dizayn berasiz.</p>
    </div>
  );
}`,
  exercises: [],
  quizzes: [
  {
    question: "Tailwind CSS'ning 'Utility-First' yondashuvi nima?",
    options: [
      "External CSS",
      "Hech qanday class ishlatmaslik",
      "Tayyor CSS sinflari (flex, p-4) orqali JSX o'zida yozish",
      "Faqat inline-styles"
    ],
    correctAnswer: 2,
    explanation: "CSS hajmini kichik saqlaydi va stillashni tezlashtiradi."
  }
]
};
