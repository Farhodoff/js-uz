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
      title: "Bo'sh dependency array (faqat birinchi render)",
      instruction: "Quyidagi kodda `useEffect` har safar tugma bosilganda (komponent yangilanganda) ishlab ketmoqda. Uni shunday o'zgartiringki, u faqatgina komponent birinchi marta ekranga chiqqanda ishlasin (bo'sh qaramlik massivi qo'shing).",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    console.log('Komponent ishga tushdi!');\n  });\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(count + 1)}>Oshirish</button>\n    </div>\n  );\n}",
      hint: "useEffect(() => { ... }, []); ko'rinishida bo'sh massiv yozish kerak.",
      test: "if (!code.includes('}, [])') && !code.includes('},[])') && !code.includes('}, [ ])')) return 'useEffect funksiyasiga bo\\'sh qaramlik massivini (dependency array) qo\\'shing.'; return null;"
    },
    {
      id: 2,
      title: "Dependency array (qaramlik massivi) bilan ishlash",
      instruction: "`name` steyti o'zgarganda konsolga xabar chiqaruvchi `useEffect` yozing. Buning uchun qaramlik massivi ichiga `name` o'zgaruvchisini qo'shishingiz kerak.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [name, setName] = useState('Ali');\n  const [age, setAge] = useState(20);\n\n  useEffect(() => {\n    console.log(`Ism o'zgardi: ${name}`);\n  } /* Shu yerda qaramlik massivi kerak */);\n\n  return (\n    <div>\n      <input value={name} onChange={e => setName(e.target.value)} />\n      <button onClick={() => setAge(age + 1)}>Yosh: {age}</button>\n    </div>\n  );\n}",
      hint: "useEffect ikkinchi parametriga [name] yozish kerak.",
      test: "if (!code.includes('[name]') && !code.match(/,\\s*\\[\\s*name\\s*\\]/)) return 'useEffect qaramlik massiviga `name` ni qo\\'shing.'; return null;"
    },
    {
      id: 3,
      title: "Sahifa sarlavhasini (document.title) yangilash",
      instruction: "`count` steyti o'zgarganda sahifaning sarlavhasi (document.title) `Sanoq: {count}` ko'rinishida yangilanishi uchun `useEffect` yozing. Bu `useEffect` qaramlik massiviga `count` o'zgaruvchisini qo'shish esdan chiqmasin.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n\n  // Shu yerda useEffect yozing\n\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Sanoq: {count}</button>\n    </div>\n  );\n}",
      hint: "useEffect ichida document.title = `Sanoq: ${count}` deb yozing va [count] dependency bering.",
      test: "if (!code.includes('useEffect') || !code.includes('document.title') || !code.includes('[count]')) return 'useEffect ishlatib, ichida document.title ni yangilang va [count] qaramligini bering.'; return null;"
    },
    {
      id: 4,
      title: "useEffect Cleanup (tozalash) funksiyasi",
      instruction: "Komponent o'chirilganda `setInterval` fonda ishlab qolmasligi uchun uni tozalash (cleanup) kerak. Berilgan `useEffect` ichida `clearInterval(timer)` ni qaytaruvchi (return) tozalash funksiyasini yozing.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function Timer() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const timer = setInterval(() => setSeconds(s => s + 1), 1000);\n\n    // Shu yerda return orqali cleanup funksiyasini yozing\n    \n  }, []);\n\n  return <h2>Soniya: {seconds}</h2>;\n}",
      hint: "return () => { clearInterval(timer); } ko'rinishida yoziladi.",
      test: "if (!code.includes('return') || !code.includes('clearInterval(timer)')) return 'useEffect ichida tozalash funksiyasini (return) yozing va unda clearInterval ni ishlating.'; return null;"
    },
    {
      id: 5,
      title: "useRef bilan DOM elementni tutib olish",
      instruction: "Input elementiga avtomatik fokus (fokus qaratish) uchun `useRef` dan foydalaning. `inputRef` degan ref yarating, uni `<input>` ga bog'lang va `focusInput` funksiyasi ichida unga fokus bering (`inputRef.current.focus()`).",
      startingCode: "import React, { useRef } from 'react';\n\nexport default function App() {\n  // 1. inputRef yarating (useRef null bilan)\n  \n  const focusInput = () => {\n    // 3. inputRef ga fokus bering\n    \n  };\n\n  return (\n    <div>\n      {/* 2. ref atributini inputga bog'lang */}\n      <input type=\"text\" placeholder=\"Yozing...\" />\n      <button onClick={focusInput}>Fokus berish</button>\n    </div>\n  );\n}",
      hint: "const inputRef = useRef(null); yozing, so'ng input ichida ref={inputRef} deb bog'lab, funksiyada inputRef.current.focus() ni chaqiring.",
      test: "if (!code.includes('useRef') || !code.includes('ref={inputRef}') || !code.includes('inputRef.current.focus()')) return 'useRef yaratib, inputga ref orqali bog\\'lang va focus() chaqiring.'; return null;"
    },
    {
      id: 6,
      title: "useRef - render qilmaydigan o'zgaruvchi sifatida",
      instruction: "Oddiy o'zgaruvchi o'rniga komponent qayta chizilganda yo'qolib ketmaydigan qiymat saqlash uchun `useRef` ishlatamiz. `renderCount` degan ref yarating va har safar komponent chizilganda uning `current` qiymatini 1 taga oshiruvchi `useEffect` yozing.",
      startingCode: "import React, { useState, useEffect, useRef } from 'react';\n\nexport default function App() {\n  const [text, setText] = useState('');\n  // 1. renderCount useRef ni 0 qiymati bilan yarating\n  \n  // 2. useEffect ichida renderCount.current ni 1 taga oshiring (bo'sh qaramlik massivisiz!)\n\n  return (\n    <div>\n      <input value={text} onChange={e => setText(e.target.value)} />\n      {/* 3. renderCount.current ni ekranga chiqaring */}\n      <p>Renderlar soni: 0</p>\n    </div>\n  );\n}",
      hint: "const renderCount = useRef(0); va useEffect ichida renderCount.current = renderCount.current + 1; (yoki ++) deng. JSX da {renderCount.current} chiqaring.",
      test: "if (!code.includes('useRef(0)') || !code.includes('renderCount.current') || !code.includes('useEffect')) return 'useRef orqali renderCount ni e\\'lon qiling va useEffect ichida uni oshiring.'; return null;"
    },
    {
      id: 7,
      title: "useEffect da Event Listener",
      instruction: "Oynaning o'lchami o'zgarganini kuzatuvchi o'zgaruvchi yaratamiz. `useEffect` ichida `window.addEventListener('resize', handleResize)` ni ulang va uni `return` ichida `removeEventListener` yordamida tozalashni unutmang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [width, setWidth] = useState(window.innerWidth);\n\n  useEffect(() => {\n    const handleResize = () => setWidth(window.innerWidth);\n    // 1. window ga 'resize' hodisasini (handleResize) ulang\n    \n    // 2. return orqali 'resize' hodisasini olib tashlang (cleanup)\n    \n  }, []);\n\n  return <p>Oyna kengligi: {width}px</p>;\n}",
      hint: "window.addEventListener('resize', handleResize); va return () => window.removeEventListener('resize', handleResize); yozing.",
      test: "if (!code.includes('addEventListener') || !code.includes('removeEventListener')) return 'Hodisani eshituvchi qushish va o\\'chirish funksiyalari (addEventListener / removeEventListener) dan foydalaning.'; return null;"
    },
    {
      id: 8,
      title: "useEffect da Fetch (Ma'lumot tortish)",
      instruction: "Komponent ochilganda API dan foydalanuvchi ma'lumotini olishni simulyatsiya qilamiz. `useEffect` ichida `fetchData` funksiyasini chaqiring. `useEffect` faqat **bir marta** ishlashi uchun bo'sh massiv `[]` qo'shishni unutmang.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [data, setData] = useState('Yuklanmoqda...');\n\n  const fetchData = () => {\n    setTimeout(() => setData('Salom, bu serverdan olingan ma\\'lumot!'), 2000);\n  };\n\n  // Shu yerda useEffect yozing va fetchData ni chaqiring\n\n  return <h1>{data}</h1>;\n}",
      hint: "useEffect(() => { fetchData(); }, []); qilib yoziladi.",
      test: "if (!code.includes('useEffect') || !code.includes('fetchData()') || !code.includes('[]')) return 'useEffect orqali fetchData ni faqat bir marta ishlating (bo\\'sh qaramlik massivi qo\\'shing).'; return null;"
    },
    {
      id: 9,
      title: "Bir nechta Hook larni birga ishlatish",
      instruction: "Ikki xil state o'zgaruvchilari: `count` (sanoq) va `step` (qadam) bor. `count` o'zgaruvchisi o'zgarganda faqat uning qiymatini konsolga chiqaruvchi bitta `useEffect`, `step` o'zgarganda faqat `step` ni konsolga chiqaruvchi boshqa bir `useEffect` yozing.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  const [step, setStep] = useState(1);\n\n  // 1. count uchun useEffect\n  \n  // 2. step uchun useEffect\n\n  return (\n    <div>\n      <p>Sanoq: {count}, Qadam: {step}</p>\n      <button onClick={() => setCount(count + step)}>Oshirish</button>\n      <button onClick={() => setStep(step + 1)}>Qadamni kattalashtirish</button>\n    </div>\n  );\n}",
      hint: "Ikkita alohida useEffect yozing. Birida [count], ikkinchisida [step] dependency bo'lsin.",
      test: "if (code.match(/useEffect/g)?.length < 2 || !code.includes('[count]') || !code.includes('[step]')) return 'Ikkita alohida useEffect yozing, ularga tegishli qaramlik massivlarini bering.'; return null;"
    },
    {
      id: 10,
      title: "Hook larni faqat eng yuqorida ishlatish",
      instruction: "Hook larning qoidalaridan biri - ularni shartlar (`if`) ichida yozib bo'lmaydi. Quyidagi kodda `useEffect` `if` ichiga yashirib qo'yilgan. Uni shunday to'g'rilangki, `useEffect` yuqoriga chiqsin, `if` sharti esa `useEffect` ichida bo'lsin.",
      startingCode: "import React, { useState, useEffect } from 'react';\n\nexport default function App() {\n  const [isLogged, setIsLogged] = useState(false);\n\n  // XATO YONDASHUV: Hook shart ichida!\n  if (isLogged) {\n    useEffect(() => {\n      console.log('Tizimga kirdingiz!');\n    }, [isLogged]);\n  }\n\n  return (\n    <button onClick={() => setIsLogged(true)}>Kirish</button>\n  );\n}",
      hint: "useEffect ni if dan tashqariga chiqaring va if shartini useEffect ning callback funksiyasi ichida yozing.",
      test: "if (code.match(/if\\s*\\([^)]+\\)\\s*\\{\\s*useEffect/)) return 'useEffect ni if shartidan tashqariga olib chiqing!'; return null;"
    }
  ],
  quizzes: [
    {
      question: "React hook'larini (masalan, useState, useEffect) qaysi turdagi komponentlarda ishlatish mumkin?",
      options: [
        "Faqat Class (sinf) komponentlarida",
        "Faqat Funksional (function) komponentlarda",
        "Ham Class, ham Funksional komponentlarda",
        "Faqat oddiy JavaScript funksiyalarida"
      ],
      correctAnswer: 1,
      explanation: "React hooklari aynan Funksional komponentlar uchun yaratilgan. Ularni Class komponentlarda yoki oddiy JS funksiyalarida ishlatib bo'lmaydi."
    },
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
      question: "useEffect hookining asosiy vazifasi nima?",
      options: [
        "Komponent ichida yangi o'zgaruvchi yaratish",
        "UI dizaynini o'zgartirish",
        "Yon ta'sirlarni (Side effects), ya'ni API dan ma'lumot olish, taymerlar va hokazolarni boshqarish",
        "Class komponentlarni funksionalga aylantirish"
      ],
      correctAnswer: 2,
      explanation: "useEffect aynan yon ta'sirlar (side effects) bilan ishlash uchun mo'ljallangan (fetch orqali ma'lumot olish, DOM ni bevosita o'zgartirish, event listenerlar qo'shish va h.k)."
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
      explanation: "Cleanup funksiyasi (return () => ...) komponent hayot sikli tugayotganda (dom dan olib tashlanganda) o'zidan qolgan izlarni, obunalarni yoki taymerlarni tozalash uchun xizmat qiladi. Shuningdek, qaramlik o'zgarganda ham avvalgisi tozalanadi."
    },
    {
      question: "useEffect(() => { ... }, []) — bo'sh qaramlik massivi berilsa nima bo'ladi?",
      options: [
        "Effect har safar komponent render bo'lganda ishlaydi",
        "Effect hech qachon ishlamaydi",
        "Effect faqatgina birinchi marta komponent chizilganda (mount) ishlaydi",
        "Effect sahifa yangilanganda ishlamaydi"
      ],
      correctAnswer: 2,
      explanation: "Agar dependency array bo'sh ( [] ) bo'lsa, u hech qanday state'ga qaram emas, shuning uchun faqat bir marta — komponent ilk marta chizilganda ishlaydi."
    },
    {
      question: "useEffect(() => { ... }) — umuman qaramlik massivi yozilmasa nima bo'ladi?",
      options: [
        "Xatolik yuz beradi",
        "Faqat bir marta ishlaydi",
        "Har safar komponent qayta render bo'lganda ishlayveradi",
        "Faqat brauzer oynasi o'zgarganda ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Dependency array umuman berilmasa, React useEffect ni har doim — komponent birinchi chizilganda ham, har qanday state yoki prop o'zgarganda ham takror-takror ishlataveradi."
    },
    {
      question: "useRef hookining asosiy xususiyati qaysi qatorda to'g'ri ko'rsatilgan?",
      options: [
        "useRef orqali o'zgaruvchi yaratilsa va uning qiymati o'zgarsa, komponent qayta chiziladi (re-render bo'ladi)",
        "useRef orqali saqlangan qiymat o'zgarganda komponent QAYTA CHIZILMAYDI",
        "useRef faqatgina API dan ma'lumot olish uchun ishlatiladi",
        "useRef ichida funksiya saqlash taqiqlanadi"
      ],
      correctAnswer: 1,
      explanation: "useRef komponentning butun hayot sikli davomida bir xil ob'ektni saqlaydi va uning 'current' xususiyati o'zgartirilganda komponent re-render bo'lmaydi (qayta chizilmaydi)."
    },
    {
      question: "useRef dan DOM elementlarga kirish uchun qanday foydalanamiz?",
      options: [
        "<input use={myRef} />",
        "<input id={myRef} />",
        "<input ref={myRef} />",
        "<input dom={myRef} />"
      ],
      correctAnswer: 2,
      explanation: "Reactda DOM elementga to'g'ridan-to'g'ri murojaat qilish uchun 'ref' atributidan foydalaniladi va unga useRef orqali olingan o'zgaruvchi beriladi (masalan: ref={myRef})."
    },
    {
      question: "Agar useEffect ichida 'setInterval' yoki event listener ulasangiz, qanday muammo yuzaga kelishi mumkin?",
      options: [
        "Hech qanday muammo bo'lmaydi",
        "Ular brauzer oynasini yopib yuboradi",
        "Komponent o'chganda (unmount) ular fonda ishlashda davom etadi va xotira to'lib qoladi (Memory leak)",
        "React ularni avtomatik tarzda to'xtatadi"
      ],
      correctAnswer: 2,
      explanation: "Agar ularni 'cleanup function' (return) orqali tozalamasak, komponent o'chib ketgan taqdirda ham taymer yoki hodisa kuzatuvchi fonda ishlab yotaveradi. Bu xotira sizishiga (Memory leak) va qotishlarga sabab bo'ladi."
    },
    {
      question: "Komponent ichida nechta useEffect va nechta useState yozish mumkin?",
      options: [
        "Faqat bittadan",
        "Cheksiz, qancha kerak bo'lsa shuncha (lekin yuqorida bo'lishi shart)",
        "Har bir state uchun faqat bitta useEffect mumkin",
        "Ikkita useState va bitta useEffect gacha"
      ],
      correctAnswer: 1,
      explanation: "Bir komponentda barcha hooklardan xohlagancha marta (kerakligicha) chaqirish mumkin, asosiysi ular komponentning eng yuqori darajasida (top level) bo'lishi kerak."
    },
    {
      question: "useEffect( () => { console.log('Salom'); }, [count] ) kodi qachon ishlaydi?",
      options: [
        "Faqat bir marta ishlaydi",
        "Komponent birinchi chizilganda va 'count' steyti o'zgarganda",
        "Faqatgina 'count' noldan katta bo'lganda",
        "Har qanday state o'zgarganda"
      ],
      correctAnswer: 1,
      explanation: "Qaramlik massiviga [count] yozilgani uchun, ushbu effect faqatgina ilk renderda va keyinchalik 'count' ning qiymati o'zgarganidagina ishlaydi. Boshqa statelar o'zgargani bunga ta'sir qilmaydi."
    },
    {
      question: "Agar useRef bilan yaratilgan qiymat (ref.current) ni ekranda (JSX ichida) ko'rsatmoqchi bo'lsak va uni o'zgartirsak nima bo'ladi?",
      options: [
        "Ekranda uning qiymati darhol o'zgaradi, chunki state kabi ishlaydi",
        "Ekranda u o'zgarmaydi, chunki useRef o'zgarganda komponent qayta render bo'lmaydi",
        "Xatolik (error) beradi, useRef ni JSX da ko'rsatish taqiqlangan",
        "Faqat tugma bosilganda o'zgaradi"
      ],
      correctAnswer: 1,
      explanation: "useRef ning .current qiymati o'zgarganda komponent yangilanmaydi (re-render bo'lmaydi). Shuning uchun u ekranda yangilanib ko'rinmaydi. Ekranda dinamik ravishda yangilanib turishi kerak bo'lgan ma'lumotlar uchun useState ishlatish kerak."
    }
  ]
};
