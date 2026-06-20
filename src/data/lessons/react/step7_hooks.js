export const step7_hooks = {
  title: "7-DARS: React Hooks (Asosiy)",
  content: `
# 1. 🪝 Hook o'zi nima?

React 16.8 versiyasidan oldin, Funksional Komponentlar faqatgina JSX qaytaradigan sodda (dumb) funksiyalar edi. Ularda na State saqlab bo'lardi, na komponent qachon chizilib qachon o'chganini (Lifecycle) bilib bo'lardi. Hamma qiyin ishlar Class komponentlarda yozilardi.

**Hooks (Ilmoqlar)** paydo bo'lgach esa, hamma narsa o'zgardi! 
Hook — bu oddiy funksional komponentga React ning eng kuchli xususiyatlarini (State, Context, Lifecycle) "ilib" beruvchi (hooked into) maxsus funksiyalardir. Ularning barchasi **\`use\`** so'zi bilan boshlanadi: \`useState\`, \`useEffect\`, \`useRef\`.

### Hook larning 2 ta oltin qoidasi bor:
1. **Faqat React komponentlari ichida chaqiriladi:** Oddiy JS funksiyalari ichida Hook chaqirib bo'lmaydi.
2. **Faqat eng yuqorida (top-level) chaqiriladi:** Hooklarni hech qachon \`if/else\`, \`for\` tsikllari yoki ichma-ich funksiyalar (callback) ichida chaqirmang. Har bir renderda hooklar xuddi o'sha tartibda chaqirilishi kafolatlangan bo'lishi shart!

---

## 2. ⚡ \`useEffect\` — Yon ta'sirlarni boshqarish

Biz \`useState\` nima ekanini o'rgandik. Endigi eng muhim ikkinchi hook — bu **\`useEffect\`**.

Komponent asosiy vazifasi bo'lgan **"UI chizish"** (return) dan tashqari har qanday ishlarni (API dan ma'lumot olish, Taymer yoqish, LocalStorage ga yozish) bajarishiga **Side Effect (Yon ta'sir)** deyiladi. Bular aynan \`useEffect\` ichida qilinadi.

\`\`\`jsx
import { useEffect } from 'react';

useEffect(() => {
  // Nimadir ish qilish (masalan console.log yoki API fetch)
});
\`\`\`

---

## 3. 🎯 Dependency Array (Qaramlik massivi)

\`useEffect\` ning qachon ishlashi unga beriladigan ikkinchi parametr — massivga (\`[]\`) bog'liq. Bu mavzu intervyularda eng ko'p so'raladigan savoldir!

1. **Massiv umuman yozilmasa:** Effekt **har safar** komponent qayta chizilganda (re-render) ishlayveradi. (Buni kamdan-kam ishlatamiz, chunki kompyuterni qotirib qo'yishi mumkin).
   \`\`\`jsx
   useEffect(() => { console.log("Har doim ishlaydi!") });
   \`\`\`
2. **Bo'sh massiv \`[]\` yozilsa:** Effekt faqatgina eng birinchi marta komponent ekranga chiqqanida **BIR marta** ishlaydi va qaytib ishlamaydi. (API dan dastlabki ma'lumotni tortib kelish uchun zo'r usul).
   \`\`\`jsx
   useEffect(() => { console.log("Faqat birinchi chizilganda ishlaydi") }, []);
   \`\`\`
3. **Massiv ichida nimadir bo'lsa \`[state]\`:** Effekt birinchi marta va faqatgina o'sha \`state\` ning qiymati o'zgargandagina ishlaydi.
   \`\`\`jsx
   useEffect(() => { console.log("id o'zgarganda ishlaydi") }, [id]);
   \`\`\`

---

## 4. 🧹 Tozalash (Cleanup function)

Agar \`useEffect\` ichida \`setInterval\` yoqsangiz yoki brauzerga oynani kuzatish (\`addEventListener\`) hodisasini ulasangiz, komponent ekrandan o'chib ketganda bu narsalar fonda ishlamasligi (xotirani to'ldirmasligi) uchun ularni "tozalash" kerak.

Buning uchun \`useEffect\` ichidan bitta mitti funksiya **return** qilinadi:
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => console.log('Tiktak'), 1000);
  
  // Komponent o'chayotganda ishlaydigan tozalovchi funksiya:
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

---

## 5. 🎯 \`useRef\` Hook (Qisqacha)

\`useRef\` bu o'zgarganda **komponentni qayta render qilmaydigan (chizmaydigan)** o'zgaruvchi yaratish uchun kerak. Yana bir eng katta foydasi — haqiqiy DOM dagi biron elementni (masalan Inputni) to'g'ridan-to'g'ri tutib olish va unga fokus qaratishdir. (\`document.getElementById\` ning React'dagi varianti).
`,
  code: `import React, { useState, useEffect, useRef } from "react";

export default function HooksDemo() {
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // DOM elementni ushlab olish uchun Ref
  const inputRef = useRef(null);

  // 1. Taymer uchun useEffect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      // Taymer yoqildi
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // CLEANUP (Tozalash) funksiyasi
    // Agar taymer to'xtatilsa yoki komponent ekrandan o'chsa, intervalni tozalaymiz
    return () => {
      clearInterval(timer);
    };
  }, [isPlaying]); // Dependency array: isPlaying o'zgarganidagina bu effect boshidan ishlaydi

  // 2. Fokus uchun useRef dan foydalanish
  const handleFocus = () => {
    // inputRef.current orqali haqiqiy input DOM elementiga murojaat qilamiz
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>useEffect: Taymer misoli</h2>
      <h1 style={{ fontSize: 40, color: '#e74c3c' }}>{seconds} soniya</h1>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ padding: '10px 20px', background: isPlaying ? '#e74c3c' : '#2ecc71', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
      >
        {isPlaying ? 'Taymerni To\'xtatish ⏸' : 'Taymerni Boshlash ▶️'}
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>useRef: DOM ni tutish</h2>
      <p>Tugmani bossangiz, kursor avtomatik ravishda input ichiga tushadi (Fokus bo'ladi).</p>
      
      {/* ref atributi orqali inputni inputRef ga bog'laymiz */}
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Menga yozing..." 
        style={{ padding: 10, marginRight: 10, width: 200 }}
      />
      <button onClick={handleFocus} style={{ padding: 10, background: '#3498db', color: 'white', border: 'none', borderRadius: 4 }}>
        Inputga Fokus
      </button>
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Bo'sh dependency array ishlatish",
      instruction: "Quyidagi kodda `useEffect` chaqirilgan. Lekin uning oxirida dependency array yozilmagan. Natijada har bir tugma bosilganda (state o'zgarganda) konsolga xabar chiqaveradi. Ushbu `useEffect` ni faqatgina birinchi marta chizilganda ishlaydigan qilib to'g'rilang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    console.log(\"Komponent ishga tushdi!\");\n  } /* Shu yerga nimadir yozish esdan chiqqan */ );\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>Oshirish</button>\n    </div>\n  );\n}",
      hint: "useEffect(() => { ... }, []); ko'rinishida yozish kerak.",
      test: "if (!code.includes('}, [])') && !code.includes('},[])')) return 'useEffect ga bo\\'sh massiv (dependency array) bering.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "Hook yozish qoidalariga ko'ra quyidagilardan qaysi biri TAQIQLANADI?",
      options: [
        "Hookni faylning eng tepasida import qilish",
        "Hookni komponentning ichida, eng tepasida e'lon qilish",
        "Hookni qandaydir if sharti (if statement) yoki for tsikli ichida chaqirish",
        "Bitta komponent ichida ikkita bir xil hook ishlatish (masalan 2 marta useState)"
      ],
      correctAnswer: 2,
      explanation: "Hooklar hech qachon shartlar (if/else) yoki tsikllar ichida ishlatilmaydi. Ularning chaqirilish ketma-ketligi har renderda bir xil bo'lishi kafolatlanishi shart, aks holda React xotirani chalkashtirib yuboradi."
    },
    {
      question: "Qachon useEffect dagi Cleanup (tozalash) funksiyasi ishga tushadi?",
      options: [
        "Faqat brauzer yopilganda",
        "Komponent ekrandan o'chib ketayotganda (Unmount) va navbatdagi effect ishlashidan oldin",
        "Faqat sahifa yangilanganida (refresh)",
        "React dagi xatolik yuz berganda"
      ],
      correctAnswer: 1,
      explanation: "Cleanup funksiyasi (return () => ...) komponent hayot sikli tugayotganda (dom dan olib tashlanganda) o'zidan qolgan izlarni, obunalarni yoki taymerlarni tozalash uchun xizmat qiladi."
    }
  ]
};
