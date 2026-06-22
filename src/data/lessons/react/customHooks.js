export const customHooks = {
  id: "customHooks",
  title: "Custom Hooks yozish (O'zimiz Hook yozamiz)",
  content: `
# Custom Hooks yozish

React'da \`useState\`, \`useEffect\`, va \`useContext\` kabi ajoyib tayyor Hooklar mavjud. Lekin dasturlash jarayonida ba'zan bir xil mantiqni (logic) turli xil komponentlarda takror ishlatishga to'g'ri keladi. Shunday paytda biz ularni ajratib olib, o'zimizning **Custom Hook (Maxsus Hook)** larimizni yaratishimiz mumkin.

## 1. Custom Hook nima?

Custom Hook — bu shunchaki oddiy JavaScript funksiyasi. Uning yagona qoidasi shundaki, uning nomi **"use"** so'zi bilan boshlanishi kerak (masalan: \`useFetch\`, \`useWindowSize\`, \`useLocalStorage\`).
Eng asosiysi, Custom Hook o'z ichida boshqa React Hook'larini (\`useState\`, \`useEffect\`) chaqirishi mumkin.

> **Qoida:** Agar sizning funksiyangiz ichida hech qanday React Hook ishlatilmasa, uni shunchaki oddiy funksiya (masalan, \`formatDate\`) deb nomlang, unga "use" qo'shmang!

## 2. Nega Custom Hook kerak?

Ikkita asosiy sabab bor:
1. **Kodni qayta ishlatish (Reusability):** Bitta oyna o'lchamini topadigan mantiqni o'nta faylga yozib chiqmaysiz. Bir marta \`useWindowSize\` yozib, hamma joyda ishlatasiz.
2. **Kodni tozalash (Abstraction):** Komponentlar UI (dizayn) qaytarish uchun mo'ljallangan. Agar uning ichini qandaydir hisob-kitoblar bilan to'ldirib yuborsak, uni o'qish qiyinlashadi. Custom hook mantiqni "yashirish" ga yordam beradi.

## 3. 1-Misol: \`useWindowSize\`

Keling, brauzer oynasining joriy kengligi (width) va balandligini (height) qaytaradigan maxsus hook yozamiz.

\`\`\`javascript
import { useState, useEffect } from 'react';

// 1. "use" bilan boshlanuvchi funksiya yaratamiz
export function useWindowSize() {
  // 2. O'zimizning statelarimizni ochamiz
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 3. Oyna o'lchami o'zgarganda ishlaydigan funksiya
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 4. Hodisani (event) tinglash
    window.addEventListener('resize', handleResize);
    
    // 5. Tozalash (Cleanup) funksiyasi
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Bo'sh massiv = faqat birinchi renderda ishlaydi

  // 6. Natijani qaytaramiz
  return windowSize;
}
\`\`\`

Endi ushbu hookni istalgan komponentda juda sodda tarzda ishlatishimiz mumkin:
\`\`\`jsx
import { useWindowSize } from './useWindowSize';

function App() {
  const { width, height } = useWindowSize();
  return <p>Oyna o'lchami: {width} x {height}</p>;
}
\`\`\`

## 4. 2-Misol: \`useLocalStorage\`

State ni ham yangilaydigan, ham uni bir vaqtning o'zida Local Storage ga saqlab ketadigan qulay hook yaratamiz.

\`\`\`javascript
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. Dastlabki o'qish jarayoni
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Agar keshda bo'lsa o'qib olamiz, aks holda initialValue'ni beramiz
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 2. Value o'zgarganda Local Storage'ni ham yangilaymiz
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // 3. Xuddi useState kabi massiv qaytaramiz
  return [value, setValue];
}
\`\`\`

Qanday ishlatiladi? Xuddi \`useState\` kabi, lekin bu safar u xotiradan o'chib ketmaydi!
\`\`\`jsx
function App() {
  const [name, setName] = useLocalStorage('username', 'Mehmon');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
\`\`\`
  `,
  code: `import React, { useState, useEffect } from "react";

// CUSTOM HOOK: useToggle
// Bu oddiy true/false qiymatlarni oson almashtirish uchun hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue(!value);
  };

  // State'ning o'zini va o'zgartiruvchi funksiyani qaytaramiz
  return [value, toggle];
}

// CUSTOM HOOK: useFetch
// Har qanday URL'dan oson API yuklash uchun
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

export default function App() {
  // 1-Custom hook ni ishlatamiz
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  
  // 2-Custom hook ni ishlatamiz
  const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/users/1");

  return (
    <div style={{ 
      padding: "20px", 
      background: isDarkMode ? "#333" : "#fff", 
      color: isDarkMode ? "#fff" : "#000",
      height: "100vh"
    }}>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode'ga o'tish" : "Dark Mode'ga o'tish"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Foydalanuvchi ma'lumoti (useFetch orqali):</h3>
        {loading ? <p>Yuklanmoqda...</p> : <p>Ismi: {data?.name}</p>}
      </div>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "useToggle yaratish",
      description: "Bizga komponentlarda modal oynalarni ochish/yopish uchun \`useToggle\` nomli custom hook kerak. U o'z ichida \`useState\` ishlatsin va \`[state, toggleFunction]\` qaytarsin.",
      startingCode: `import { useState } from 'react';\n\nexport function useToggle(initialValue = false) {\n  // VAZIFA: useState orqali 'value' va 'setValue' yarating\n\n  const toggle = () => {\n    // VAZIFA: qiymatni teskarisiga o'zgartiring (!value)\n  };\n\n  // VAZIFA: massiv ko'rinishida [value, toggle] qaytaring\n}`,
      solution: `import { useState } from 'react';\n\nexport function useToggle(initialValue = false) {\n  const [value, setValue] = useState(initialValue);\n\n  const toggle = () => {\n    setValue(v => !v);\n  };\n\n  return [value, toggle];\n}`,
      hint: "\`setValue(!value)\` o'rniga eskisiga qarab yangilovchi \`setValue(v => !v)\` ishlatsangiz yanada xavfsizroq bo'ladi."
    },
    {
      id: 2,
      title: "useDocumentTitle yaratish",
      description: "Browser oynasining tepasidagi nomini (\`document.title\`) o'zgartiruvchi va state o'zgarganda uni avtomatik yangilovchi \`useDocumentTitle\` hook'ini yarating.",
      startingCode: `import { useEffect } from 'react';\n\nexport function useDocumentTitle(title) {\n  // VAZIFA: useEffect yordamida document.title ga parametrdan kelgan 'title' ni tenglang\n}`,
      solution: `import { useEffect } from 'react';\n\nexport function useDocumentTitle(title) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]); // title o'zgarganda ishlaydi\n}`,
      hint: "useEffect ichida \`document.title = title;\` deb yozing va dependency qatoriga \`[title]\` ni qo'ying."
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Custom Hook larning qanday nomi majburiy qoida hisoblanadi?",
      options: [
        "Ular albatta Hook so'zi bilan tugashi kerak (masalan: themeHook)",
        "Ular 'use' so'zi bilan boshlanishi shart (masalan: useTheme)",
        "Katta harf bilan boshlanishi kerak (masalan: UseTheme)",
        "Hech qanday nomlash qoidasi yo'q"
      ],
      correctAnswer: 1,
      explanation: "React hook'lar qoidasini to'g'ri ishlashi (Linter ularni ajratib olishi) uchun Custom Hook lar har doim kichik 'use' so'zi bilan boshlanishi qat'iy talabdir."
    },
    {
      id: 2,
      question: "Custom Hook qachon yaratilishi kerak?",
      options: [
        "Har bir komponent uchun bittadan",
        "React dagi mavjud hooklar (useState) tushunarsiz bo'lganda",
        "Bir xil state yoki useEffect mantig'i ilova bo'ylab bir nechta joyda takrorlanganda",
        "Komponentning dizaynini o'zgartirish kerak bo'lganda"
      ],
      correctAnswer: 2,
      explanation: "Custom Hook larning asosiy maqsadi — kodning takrorlanishini (DRY qoidasi - Don't Repeat Yourself) oldini olish va uni qismlarga ajratishdir."
    },
    {
      id: 3,
      question: "Agar \`useUser()\` nomli custom hookni bitta sahifadagi 3 ta alohida komponent ichida chaqirsak, ular bitta umumiy State ni ulashadimi?",
      options: [
        "Ha, ular avtomatik Global State ga aylanadi",
        "Yo'q, har bir komponent hookni chaqirganda o'zining mutlaqo mustaqil va alohida state nusxasiga ega bo'ladi",
        "Xato yuz beradi, custom hookni bitta sahifada 2 marta ishlatish mumkin emas"
      ],
      correctAnswer: 1,
      explanation: "Custom Hook shunchaki oddiy funksiya bo'lib, har safar chaqirilganda u o'zining yangi 'useState' yoki 'useEffect'larini yaratadi. Ular o'rtasida ma'lumot almashinmaydi."
    },
    {
      id: 4,
      question: "Quyidagilardan qaysi biri to'g'ri custom hook qaytarishi (return) hisoblanadi?",
      options: [
        "Faqat massiv (array) qaytarishi shart",
        "Faqat obyekt (object) qaytarishi shart",
        "Hech narsa qaytarmasligi kerak",
        "Har qanday narsa qaytarishi mumkin: Massiv, Obyekt, Yagona qiymat yoki hatto hech narsa"
      ],
      correctAnswer: 3,
      explanation: "Custom Hook shunchaki JavaScript funksiya bo'lgani uchun, qaysi ma'lumot turi sizga qulayroq bo'lsa shuni bemalol qaytarishingiz (return) mumkin."
    }
  ]
};
