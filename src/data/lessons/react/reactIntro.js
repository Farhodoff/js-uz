export const reactIntro = {
  title: "React nima? Va u qanday ishlaydi?",
  content: `
# React nima? Va u qanday ishlaydi?

React bu foydalanuvchi interfeyslarini (UI) qurish uchun mo'ljallangan mashhur JavaScript kutubxonasi. U dastlab Facebook (hozirgi Meta) tomonidan yaratilgan. React'ning asosiy ustunligi - bu qismlarga (komponentlarga) ajratilgan tuzilma va **Tezlik**. 

Xo'sh, u qanday qilib bunchalik tez ishlaydi? Bu uning ichki arxitekturasi bilan bog'liq. Keling, eng muhim konsepsiyalarni ko'rib chiqamiz:

## Reconciliation (Qayta kelishuv)
Reconciliation – bu React foydalanuvchi interfeysini yangilashda qanday qilib eng tezkor yo'lni tanlashini belgilaydigan jarayon. Oddiy aytganda, DOM'da faqatgina o'zgargan qismlarnigina yangilaydi, butun sahifani emas.

### 1. Virtual DOM
React haqiqiy DOM (HTML daraxti) bilan to'g'ridan-to'g'ri ishlamaydi. Buning o'rniga u xotirada DOM'ning yengil nusxasi bo'lgan **Virtual DOM** (JavaScript ob'ektlari daraxti) ni ushlab turadi. O'zgarish bo'lganda, React avval Virtual DOM'ni yangilaydi. Bu xotirada bajarilyotgani uchun juda tez amalga oshadi.

### 2. Diffing Algorithm
Bu algoritm yangi yaratilgan (render bo'layotgan) Virtual DOM daraxti bilan eskisini solishtiradi. React bu orqali nimalar o'zgarganini tezda topadi. Uning murakkabligi $O(n)$ ni tashkil etadi, ya'ni minglab elementlar bo'lsa ham solishtirish bir necha millisoniyalarda amalga oshadi.

### 3. Fiber Architecture
React 16+ versiyasidan boshlab **Fiber** arxitekturasi joriy etilgan. Bu React'ga ishni kichik bo'laklarga bo'lish (interruptible) va muhimroq vazifalarni birinchi o'ringa qo'yish imkonini beradi. Masalan, foydalanuvchi matn kiritayotganda (input), interfeys qotib qolmasligi uchun yozish qolgan og'ir render operatsiyalaridan ustunroq ko'riladi va birinchi bo'lib ekranga chiziladi.
`,
  code: `import React from "react";\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Hello React!</h1>\n      <p>React - Virtual DOM va Fiber bilan ishlaydigan kuchli UI kutubxonasi.</p>\n    </div>\n  );\n}`,
  exercises: [],
  quizzes: []
};
