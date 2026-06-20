export const componentLifecycle = {
  title: "Component Lifecycle va useEffect",
  content: `
# 1. 💡 Component Lifecycle (Hayot tsikli) nima?

Xuddi odamlar kabi, React komponentlarining ham o'z hayot tsikli bor. U uchta asosiy bosqichdan iborat:

1. **Mounting (Tug'ilish):** Komponent birinchi marta ekranda paydo bo'lishi. Bu bosqichda barcha state'lar boshlang'ich qiymatlarini oladi va ilk marta JSX chiziladi.
2. **Updating (O'sish/O'zgarish):** Komponentning prop'lari yoki state'i o'zgarganda, u o'zini qaytadan chizadi (Re-render). Bu hayoti davomida ko'p marta sodir bo'lishi mumkin.
3. **Unmounting (O'lim/O'chirilish):** Komponent boshqa kerak bo'lmay qolsa, ekrandan (Real DOM'dan) o'chirib tashlanadi.

Eski Class komponentlarida bu uchta bosqich uchun maxsus funksiyalar bor edi (\`componentDidMount\`, \`componentDidUpdate\`, \`componentWillUnmount\`). Hozirgi zamonaviy React'da (Function Components) bularning hammasi bitta **\`useEffect\`** deb nomlangan ajoyib Hook orqali boshqariladi!

---

## 2. ⚙️ useEffect'ning "qorong'u" tomoni va maqsadi

Ko'pchilik o'ylaydi: *"useEffect bu — komponent yuklanganda biror narsa qilib beruvchi vosita"*. **Yo'q!**
Aslida \`useEffect\` — bu sizning React komponentingizni **Tashqi Tizimlar** bilan **Sinxronlashtiruvchi** (synchronize) vosita.

**Tashqi tizimlar nima?**
* **Network:** Backend server bilan bog'lanish (Fetch API).
* **Browser API:** DOM bilan to'g'ridan-to'g'ri ishlash (\`document.title\`, \`window.addEventListener\`).
* **Third-party libraries:** Boshqa JS kutubxonalari bilan React'ni bog'lash (masalan, Google Maps yoki Chart.js).

Agar siz shunchaki ma'lumotlarni filtrlash, hisob-kitob qilish uchun \`useEffect\` ishlatayotgan bo'lsangiz, **bu katta xato**. (Bu holatlarda \`useMemo\` ishlatish kerak).

---

## 3. 🧩 Dependency Array (Bog'liqliklar ro'yxati)

\`useEffect\` ning ikkinchi argumenti — `dependency array` \`[]\` eng muhim qismdir. Bu massiv ichidagi elementlar "qachon useEffect qayta ishga tushishi kerakligini" belgilaydi.

* **Hech qanday array berilmasa:** \`useEffect(() => {...})\` -> Har safar render bo'lgandan keyin ishlaydi (Juda yomon praktika, cheksiz loop (infinite loop) ga tushish xavfi bor).
* **Bo'sh array berilsa:** \`useEffect(() => {...}, [])\` -> Faqat 1-marta (Mounting) ishlaydi.
* **Ichida qiymat bo'lsa:** \`useEffect(() => {...}, [count])\` -> Faqat 1-marta (Mounting) va keyinchalik faqat \`count\` o'zgargandagina ishlaydi.

### Cleanup Function (Tozalash funksiyasi)
\`useEffect\` ichida ko'pincha obuna bo'lish (subscribe), taymer (setTimeout) yozish mumkin. Bularni albatta Unmounting bosqichida tozalash kerak (Clear timeout, unsubscribe). Buning uchun \`useEffect\` ichidan \`return\` qilingan funksiya ishlatiladi.

---

## 4. 📊 Diagramma: useEffect oqimi

\`\`\`mermaid
stateDiagram-v2
    [*] --> Mounting
    Mounting --> Render: Birinchi chizish
    Render --> useEffect: (Bo'sh [] yoki qiymat bilan) ishlaydi
    
    state "O'zgarish sodir bo'ldi (State/Props)" as Updating
    Updating --> ReRender: Qayta chizish
    
    ReRender --> Cleanup: Avvalgi useEffect tozalash (agar return yozilgan bo'lsa)
    Cleanup --> useEffect2: Yangi qiymatlar bilan qayta ishlaydi
    
    state "Komponent ekrandan olinmoqda" as Unmounting
    Unmounting --> CleanupFinal: Oxirgi marta tozalash funksiyasi ishlaydi
    CleanupFinal --> [*]
\`\`\`

---

## 5. 💬 Intervyu Savollari

1. **useEffect qachon bajariladi: Render qilishdan oldinmi yoki keyin?**
   *Javob:* Har doim Browser Paint (chizib bo'lingandan) keyin, ya'ni ekranda o'zgarishlar paydo bo'lgach asinxron tarzda bajariladi. Agar renderdan oldin yoki sinxron bajariladigan mantiq kerak bo'lsa, \`useLayoutEffect\` ishlatiladi.
2. **Nima uchun useEffect ichida cheksiz sikl (infinite loop) paydo bo'ladi?**
   *Javob:* Agar siz \`useEffect\` ichida \`setState\` chaqirsangiz va unga Dependency array bermasangiz (yoki array ichidagi state tez-tez o'zgarsa). Shunda state o'zgaradi -> render bo'ladi -> useEffect ishlaydi -> state o'zgaradi -> render bo'ladi... zanjir boshlanadi.
3. **Cleanup (Tozalash) funksiyasi qachon va nega ishlaydi?**
   *Javob:* Ikkita holatda ishlaydi: Komponent o'chirilayotganda (Unmounting) va keyingi \`useEffect\` ishga tushishidan oldin (eski state xotiralaridan tozalanish uchun). Agar taymerlar tozalab tashlanmasa xotira to'lishi (Memory leak) yuzaga keladi.
`,
  code: `import React, { useState, useEffect } from "react";

// Bola komponent (O'chirib yondiriladigan taymer misoli)
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. Mounting bosqichi: Taymerni boshlaymiz
    console.log("Timer ishga tushdi!");
    
    const intervalId = setInterval(() => {
      // Functional state update (xotiradagi avvalgi qiymatga ulanish)
      setSeconds(prev => prev + 1);
    }, 1000);

    // 2. Unmounting (Tozalash) bosqichi: Taymerni to'xtatamiz
    return () => {
      console.log("Komponent o'chirildi. Taymer to'xtatildi!");
      clearInterval(intervalId);
    };
  }, []); // Bo'sh array -> Faqat Mounting va Unmounting da ishlaydi

  return (
    <div style={{ padding: 10, background: '#2ecc71', color: 'white', marginTop: 10, borderRadius: 5 }}>
      <h3>Men taymerman! Ishlayotgan vaqt: {seconds} sekund</h3>
    </div>
  );
}

export default function App() {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>useEffect va Cleanup (Tozalash)</h2>
      
      <p>
        Quyidagi tugma <strong>Timer</strong> komponentini ekranga qo'shadi (Mount) va o'chiradi (Unmount).
        Konsolni ochib komponent hayot siklini (Lifecycle) kuzating!
      </p>

      <button 
        onClick={() => setShowTimer(!showTimer)}
        style={{ padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {showTimer ? "Taymerni Yopish" : "Taymerni Ochish"}
      </button>

      {/* Komponentni shartli chizish (Mount/Unmount trigger) */}
      {showTimer && <Timer />}
    </div>
  );
}`,
  exercises: [
    {
      id: 1,
      title: "Document Title'ni sinxronlashtirish",
      instruction: "Sizga count va setCount berilgan. Har safar tugma bosilganda sanog'i oshadi. Siz `useEffect` dan foydalanib, har safar `count` o'zgarganda brauzer oynasi sarlavhasini (document.title) 'Sanoq: 1', 'Sanoq: 2' kabi o'zgartiruvchi kodni yozing. Buning uchun document.title = `Sanoq: ${count}` deb yozishingiz kerak. Dependency array ga `count` ni berishni unutmang!",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function CounterApp() {\n  const [count, setCount] = useState(0);\n\n  // useEffect ni shu yerda yozing\n\n  return (\n    <div>\n      <h1>Sanoq: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>Oshirish</button>\n    </div>\n  );\n}",
      hint: "useEffect(() => { document.title = `Sanoq: ${count}`; }, [count]); shaklida yoziladi.",
      test: "if (!code.includes('useEffect(')) return 'useEffect ishlatilmadi.'; if (!code.includes('document.title')) return 'document.title yangilanmadi.'; return null;"
    }
  ],
  quizzes: [
    {
      question: "useEffect ichidan qaytarilgan (return) funksiya nima deb ataladi va uning vazifasi nima?",
      options: [
        "Render funksiyasi - JSX qaytarish uchun",
        "Cleanup (Tozalash) funksiyasi - taymer yoki obunalarni to'xtatish uchun",
        "Callback funksiyasi - faqat button bosilganda ishlashi uchun",
        "Higher Order funksiya - boshqa funksiyalarni ishga tushirish uchun"
      ],
      correctAnswer: 1,
      explanation: "useEffect ichidagi return funksiyasi Cleanup vazifasini o'taydi va komponent o'chayotganda (Unmount) yoki Dependency o'zgarib keyingi renderdan oldin ishlaydi."
    },
    {
      question: "Agar useEffect ning Dependency array'i ([]) umuman berilmasa (hatto bo'sh massiv ham), nima sodir bo'ladi?",
      options: [
        "U umuman ishlamaydi.",
        "U faqat komponent o'chirilayotgan paytda ishlaydi.",
        "U har bir re-renderdan keyin to'xtovsiz ishlaydi.",
        "U dasturga xatolik (Error) beradi."
      ],
      correctAnswer: 2,
      explanation: "Array umuman berilmasa, React uni 'har doim ishla' deb qabul qiladi. Har qanday state yoki prop o'zgarganda (hatto aloqasi bo'lmasa ham) u qayta ishlayveradi."
    }
  ]
};
