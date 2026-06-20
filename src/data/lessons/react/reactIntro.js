export const reactIntro = {
  title: "Virtual DOM va Reconciliation",
  content: `
# Virtual DOM va Reconciliation

React "Asoslari" deganda ko'pchilik \`useState\` yoki \`props\`ni tushunadi. Lekin **chuqur daraja** bu — React qanday ishlashini (mexanikasini) tushunishdir. Quyida React'ning "kapot ostidagi" jarayonlari keltirilgan:

### Reconciliation (Qayta kelishuv) jarayoni

React foydalanuvchi interfeysini yangilashda eng tezkor yo'lni tanlaydi.

* **Virtual DOM:** React haqiqiy DOM bilan emas, balki uning yengil nusxasi (JS ob'ektlari daraxti) bilan ishlaydi.
* **Diffing Algorithm:** Yangi render bo'layotgan daraxt bilan eski daraxtni solishtiradi ($O(n)$ murakkablikdagi algoritmi).
* **Fiber Architecture:** React 16+ dan boshlab joriy etilgan. Bu React'ga ishni bo'laklarga bo'lish (interruptible) va muhimroq vazifalarni (masalan, input yozish) birinchi o'ringa qo'yish imkonini beradi.
`,
  code: `import React from "react";\n\nexport default function App() {\n  return (\n    <div>\n      <h1>Virtual DOM & Fiber</h1>\n      <p>React qanday qilib bunchalik tez ishlashining siri!</p>\n    </div>\n  );\n}`,
  exercises: [],
  quizzes: []
};
