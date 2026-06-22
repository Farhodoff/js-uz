export const reactStyling = {
  id: "reactStyling",
  title: "Styling: Tailwind CSS va CSS-in-JS",
  content: `
# React'da dizayn berish usullari

HTML o'z-o'zidan juda oddiy ko'rinishga ega. Unga jon kiritish uchun bizga CSS kerak bo'ladi. React'da CSS yozishning an'anaviy HTML dan farqli va ancha kuchli usullari bor. Keling, bugungi kunning eng mashhur 4 ta yondashuvi bilan tanishamiz.

## 1. Odatiy (Global) CSS va uning muammolari

Eng oson yo'li: Bitta \`App.css\` fayl yaratib, uni to'g'ridan-to'g'ri import qilishdir.

\`\`\`css
/* App.css */
.btn { background: red; color: white; }
\`\`\`

\`\`\`jsx
import './App.css'; // Shunchaki import qilamiz

function Button() {
  return <button className="btn">Bosish</button>;
}
\`\`\`

**Katta Muammo:** Bu CSS butun loyiha bo'ylab Global (umumiy) bo'lib qoladi. Agar siz boshqa sahifadagi umuman boshqa komponentga tasodifan \`className="btn"\` deb bersangiz, u ham qizil rangga kirib qoladi (Naming Collision - nomlar to'qnashuvi).

## 2. CSS Modules (Mahalliy CSS)

Yuqoridagi muammoni yechish uchun **CSS Modules** o'ylab topilgan. Fayl nomini \`style.module.css\` ko'rinishida yozamiz va uni JavaScript obyekti sifatida import qilamiz.

\`\`\`css
/* Button.module.css */
.btn { background: blue; padding: 10px; }
\`\`\`

\`\`\`jsx
// style obyektini import qilamiz
import style from './Button.module.css';

function Button() {
  // React avtomatik ravishda unga "Button_btn__xY3Z" kabi yashirin va unikal nom beradi!
  return <button className={style.btn}>Bosish</button>;
}
\`\`\`

**Yutug'i:** Class nomlari avtomatik unikal qilinadi, boshqa komponentlar bilan umuman to'qnashmaydi.

## 3. Tailwind CSS (Utility-First)

**Tailwind CSS** — hozirgi kunda Frontend olamining oltin standartidir. Siz umuman alohida CSS fayl ochib o'tirmaysiz. Kutubxona sizga minglab tayyor kichik class larni (\`flex\`, \`text-center\`, \`bg-red-500\`) beradi va siz ularni to'g'ridan-to'g'ri HTML ichida yig'ib ketasiz.

\`\`\`jsx
function TailwindButton() {
  return (
    // Hech qanday CSS faylsiz, shunchaki class larni terib chiqamiz
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Tailwind Tugma
    </button>
  );
}
\`\`\`

**Nega hamma Tailwind ni yaxshi ko'radi?**
- CSS fayllar o'rtasida sakrab yurish shart emas, kodni o'qish tezligi oshadi.
- U loyihangizdagi faqat O'zingiz ishlatgan class larnigina ishlab chiqaradi. Jami CSS faylingiz 10-15kb dan oshmaydi (Juda tez yuklanadi).
- Dizayn tizimi oldindan o'ylangan (masalan, ranglar va o'lchamlar bir xil standartda).

## 4. CSS-in-JS (Styled Components)

**CSS-in-JS** — bu CSS ni xuddi JavaScript o'zgaruvchilari kabi yozish. Uning eng mashhur kutubxonasi \`styled-components\` dir.

\`\`\`javascript
import styled from 'styled-components';

// 1. O'zimizga moslashtirilgan HTML tugma yasaymiz
// CSS yozishda orqa qo'shtirnoq (backtick) lardan foydalaniladi
const StyledButton = styled.button\`
  background-color: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  
  &:hover {
    opacity: 0.8;
  }
\`;

function App() {
  return (
    <div>
      <StyledButton>Oddiy Tugma</StyledButton>
      
      {/* JavaScript dagi kabi prop uzatib rangini o'zgartira olamiz! */}
      <StyledButton primary>Asosiy Tugma</StyledButton>
    </div>
  );
}
\`\`\`

**Yutug'i:** Sizning CSS kodlaringiz doimiy o'zgarib turuvchi JavaScript mantiqlariga (masalan isDarkTheme, isOpen) to'g'ridan-to'g'ri bog'lana oladi.  

## Xulosa: Qaysi birini tanlash kerak?

1. Kichik va tezkor ishlar uchun: **CSS Modules**.
2. Zamonaviy, tez va bir xil standartdagi jamoaviy yirik loyihalar uchun: **Tailwind CSS**.
3. Agar komponentlaringiz juda ko'p dinamik holatlarga (state larga) qarab dizaynini o'zgartirishi kerak bo'lsa: **Styled Components (CSS-in-JS)**.
  `,
  code: `import React, { useState } from "react";

// Faraz qiling bu qism styled-components yordamida yaratilgan:
// const ModernCard = styled.div\`
//   background: \${props => props.darkMode ? '#333' : '#fff'};
//   color: \${props => props.darkMode ? '#fff' : '#333'};
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 6px rgba(0,0,0,0.1);
// \`;

export default function StylingDemo() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>React Styling Usullari</h2>
      <button 
        onClick={() => setIsDark(!isDark)}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        Mavzuni o'zgartirish (Theme)
      </button>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        {/* 1. Inline CSS (Juda noqulay, xatoga moyil) */}
        <div style={{
          backgroundColor: isDark ? "#2c3e50" : "#ecf0f1",
          color: isDark ? "white" : "black",
          padding: "20px",
          borderRadius: "10px",
          width: "250px"
        }}>
          <h3>1. Inline CSS</h3>
          <p>Style obyekti orqali berilgan. Hover yoki pseudo-elementlarni (before, after) bu yerda yozib bo'lmaydi.</p>
        </div>

        {/* 2. Tailwind CSS Simulyatsiyasi */}
        {/* Aslida bu shunday yoziladi: className="bg-blue-500 text-white p-5 rounded-xl w-[250px] shadow-lg hover:bg-blue-600 transition" */}
        <div style={{
          backgroundColor: "#3b82f6", color: "white", padding: "20px", borderRadius: "10px", width: "250px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}>
          <h3>2. Tailwind CSS</h3>
          <p>Eng ommabop usul. Maxsus classlar orqali juda tez kod yoziladi. Fayllarga bo'linib ketmaydi.</p>
        </div>

        {/* 3. CSS-in-JS Simulyatsiyasi */}
        <div style={{
          backgroundColor: isDark ? "#8e44ad" : "#9b59b6",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "250px",
          transition: "background-color 0.3s ease" // JS orqali silliq o'tishlar oson boshqariladi
        }}>
          <h3>3. Styled Components</h3>
          <p>JS va CSS ni birga qo'shib yozish usuli. Component Props lariga juda kuchli bog'langan.</p>
        </div>

      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Inline uslublarni obyektga o'girish",
      description: "React da Inline CSS oddiy HTML dan farqli ravishda camelCase obyekt talab qiladi. Shuni to'g'rilang.",
      startingCode: `import React from 'react';\n\nexport default function App() {\n  return (\n    // VAZIFA: background-color ni camelCase qiling va 'red' ni qo'shtirnoqqa oling\n    <div style={{ background-color: red, font-size: "20px" }}>\n      Xato CSS\n    </div>\n  );\n}`,
      solution: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div style={{ backgroundColor: 'red', fontSize: "20px" }}>\n      To'g'ri CSS\n    </div>\n  );\n}`,
      hint: "\`backgroundColor: 'red', fontSize: '20px'\` ko'rinishida o'zgartiring."
    },
    {
      id: 2,
      title: "CSS Modules to'g'ri ishlatish",
      description: "Biz CSS faylni modul (style obyekti) sifatida import qildik. Endi uni tegning \`className\` xususiyatiga bering.",
      startingCode: `import React from 'react';\n// Faraz qilamiz .box nomli class bor\nimport style from './App.module.css';\n\nexport default function App() {\n  // VAZIFA: className ga 'box' ni to'g'ri bering\n  return <div className="box">Modulli CSS</div>;\n}`,
      solution: `import React from 'react';\nimport style from './App.module.css';\n\nexport default function App() {\n  return <div className={style.box}>Modulli CSS</div>;\n}`,
      hint: "\`className={style.box}\` tarzida jingalak qavs ishlatiladi."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nima uchun React da bitta ulkan .css fayldan barcha komponentlar uchun umumiy foydalanish xato hisoblanadi?",
      options: [
        "Chunki brauzer CSS fayllarni o'qiy olmaydi",
        "Bu 'Naming Collisions' (Class nomlarining to'qnashuvi) ga olib keladi. Bitta joydagi kod boshqa komponentning dizaynini buzib yuborishi mumkin.",
        "React ruxsat bermaydi",
        "Umumiy CSS fayllar faqat Node.js uchun mo'ljallangan"
      ],
      correctAnswer: 1,
      explanation: "Agar siz oddiygina .card degan class ni global yozsangiz, loyihaning istalgan burchagidagi boshqa bir dasturchi yaratgan .card ham aynan shu dizaynni olib oladi."
    },
    {
      id: 2,
      question: "CSS Modules qanday qilib nomlar to'qnashuvining oldini oladi?",
      options: [
        "U class nomlarini butunlay o'chirib tashlaydi",
        "React dagi har bir tegni id orqali belgilaydi",
        "U import qilingan class nomiga avtomatik ravishda yashirin, noyob (unikal) harflarni qo'shib qo'yadi (Masalan: .btn_3xA1z)",
        "U faqat tailwind classlaridan foydalanadi"
      ],
      correctAnswer: 2,
      explanation: "CSS Modules yordamida siz doim bir xil, oddiy nomlarni (.button, .title) ishlataverasiz. Brauzerga yuborilishdan oldin Webpack ularni unikal qilib o'zgartirib beradi."
    },
    {
      id: 3,
      question: "Tailwind CSS ning boshqa yondashuvlardan asosiy yutug'i nima?",
      options: [
        "U CSS umuman ishlatmaydi",
        "Utility-First usuli orqali HTML fayldan chiqmagan holda tayyor kichik classlardan (m-4, p-2, flex) foydalanib juda tezkor va hajmi kichik dizayn tuzish imkonini beradi",
        "U faqat JavaScript obyektlari bilan ishlaydi",
        "U avtomatik tarzda animatsiyalar yaratadi"
      ],
      correctAnswer: 1,
      explanation: "Tailwind sizni CSS fayl o'ylab topish va har bir div ga nom o'ylab topish (Naming) azobidan xalos qiladi. Va u foydalanilmagan classlarni olib tashlash hisobiga juda yengil."
    },
    {
      id: 4,
      question: "Qaysi texnologiya (kutubxona) orqali CSS to'g'ridan-to'g'ri JavaScript ichida orqa qo'shtirnoqlar (\`\`) yordamida yoziladi va Component ning Props larini bemalol qabul qila oladi?",
      options: [
        "Styled-components (CSS-in-JS)",
        "CSS Modules",
        "Global CSS",
        "SASS/SCSS"
      ],
      correctAnswer: 0,
      explanation: "Styled Components orqali yozilgan CSS aslida JavaScript funksiyasi bo'lgani uchun u xuddi React komponentlari kabi o'zgaruvchilarni ({ isOpen }) tutib olish va unga qarab rangini o'zgartirish qobiliyatiga ega."
    }
  ]
};
