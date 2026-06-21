export const step7_hooks = {
  title: "7-DARS: React Hooks (Asosiy)",
  content: `
# 7-qadam: React Hooklari va useEffect'ga Chuqur Sho'ng'ish

React'ning eng kuchli xususiyatlaridan biri bu **Hook**lardir. Ular funksional komponentlarga "kuch" bag'ishlaydi. Ushbu darsda biz Hooklar tushunchasi va ayniqsa, \`useEffect\` bilan mukammal ishlashni o'rganamiz.

---

## Hooklar o'zi nima?

**Hooklar** (ilmoqlar) – bu React'ning "state" (holat) va hayot sikli xususiyatlariga "ilinish" (ulanish) imkonini beruvchi maxsus funksiyalardir. Ularsiz funksional komponentlar shunchaki ma'lumot qabul qilib, UI qaytaradigan oddiy va "xotirasiz" funksiyalar bo'lar edi. Hooklar yordamida esa biz komponentlarga xotira (\`useState\`) va tashqi dunyo bilan ishlash qobiliyatini (\`useEffect\`) qo'shamiz.

> **Analogiya:** Tasavvur qiling, sizning komponentingiz - bu oddiy bir xona. Hooklar - bu shu xonaga elektr toki, suv yoki internet olib kiruvchi kabellar va quvurlardir. Siz kerakli "hook"ni chaqirish orqali o'sha xonani jonlantirasiz.

### Nega kerak?
Eski React'da murakkab ishlarni faqat Klass (Class) komponentlari yordamida qilish mumkin edi. Bu esa kodni o'qishni va yozishni qiyinlashtirardi (masalan, \`this\` kalit so'zi bilan bog'liq chalkashliklar). Hooklar bizga butun ilovani oddiy, toza va tushunarli funksiyalar orqali yozish imkonini berdi.

---

## Hooklarning Oltin Qoidalari (Rules of Hooks)

Hooklardan foydalanishning qat'iy qoidalari mavjud. Agar bu qoidalarni buzsangiz, React xatoga uchraydi.

1. **Faqat eng yuqori darajada chaqiring (Top-level only):** 
   Hooklarni tsikllar (\`for\`, \`while\`), shartlar (\`if\`, \`else\`) yoki ichki funksiyalar ichida chaqirmang. Har safar komponent render bo'lganda, Hooklar aniq bir xil tartibda chaqirilishi kerak.

   ❌ **Yomon amaliyot (Don't):**
   \`\`\`javascript
   if (isUserLoggedIn) {
     const [name, setName] = useState("Ali"); // Xato! Shart ichida Hook ishlatish mumkin emas.
   }
   \`\`\`

   ✅ **Yaxshi amaliyot (Do):**
   \`\`\`javascript
   const [name, setName] = useState("Ali"); // To'g'ri! Komponentning eng yuqori qismida.
   if (isUserLoggedIn) {
     // endi nimadir qilish mumkin
   }
   \`\`\`

2. **Faqat React funksiyalaridan chaqiring:**
   Hooklarni oddiy JavaScript funksiyalaridan chaqirmang. Ularni faqat React funksional komponentlaridan yoki o'zingiz yaratgan "Custom Hook" (Maxsus hook)lardan chaqirishingiz mumkin.

---

## useEffect Hookiga Chuqur Sho'ng'ish

React'da \`useEffect\` - bu komponentingizni tashqi tizimlar bilan sinxronlashtirish uchun mo'ljallangan hook. "Tashqi tizim" deganda internetdan ma'lumot yuklab olish (API fetch), brauzer hujjatini (DOM) o'zgartirish, taymerlar (setTimeout) o'rnatish yoki boshqa kutubxonalar bilan ishlash tushuniladi.

### Komponent Hayot Sikli (Component Lifecycle)

Har bir React komponentining xuddi odamlar kabi o'z "hayot sikli" mavjud:
1. **Tug'ilish (Mounting):** Komponent birinchi marta ekranda paydo bo'ladi.
2. **O'zgarish (Updating):** Komponentning \`state\` yoki \`props\` lari o'zgaradi va u qayta chiziladi (re-render).
3. **O'lim (Unmounting):** Komponent ekrandan o'chiriladi.

Biz \`useEffect\` yordamida mana shu 3 ta bosqichning har biriga reksiya bildirishimiz mumkin.

#### Hayot sikli va useEffect qaramliklari (Mermaid diagram)

\`\`\`mermaid
graph TD
    A([Komponent ekranga chiqdi - Mount]) --> B{useEffect qaramliklari qanday?}
    
    B -->|Qaramlik massivi yo'q| C[Har bir renderdan keyin ishlaydi]
    B -->|Bo'sh massiv: [ ]| D[Faqat 1 marta, boshida ishlaydi]
    B -->|Massivda elementlar: [x, y]| E[Faqat x yoki y o'zgarsa ishlaydi]
    
    C --> F((Komponent yangilanadi - Update))
    E --> F
    
    F -.-> G{State yoki Props o'zgardi}
    G --> B
    
    D --> H([Komponent ekrandan o'chmoqda - Unmount])
    C -.-> |"Cleanup ishga tushadi"| H
    E -.-> |"Cleanup ishga tushadi"| H
    
    H --> I((Cleanup funksiyasi ishlaydi))
\`\`\`

---

## Qaramliklar Massivi (The Dependency Array)

\`useEffect\` ikkita argument qabul qiladi:
1. Bajarilishi kerak bo'lgan funksiya (Effect).
2. Qaramliklar massivi (Dependency array) - opsional.

Mana shu 2-argument sizning effektingiz qachon va necha marta ishlashini hal qiladi. Bu eng ko'p xato qilinadigan joy!

### 1. Hech narsa berilmasa (Massiv yo'q)
Agar siz qaramliklar massivini umuman yozmasangiz, sizning effektingiz **har bir renderdan so'ng** ishlayveradi.

\`\`\`javascript
useEffect(() => {
  console.log("Men har safar komponent o'zgarganda ishlayman!");
}); // E'tibor bering, vergul va massiv yo'q
\`\`\`

### 2. Bo'sh massiv \`[]\` (Tug'ilish / Mount)
Agar bo'sh massiv bersangiz, React bu effektni komponent **faqatgina birinchi marta yaratilganda** (Mount) 1 marta ishlatadi, boshqa hech qachon ishlatmaydi. Odatda API dan dastlabki ma'lumotlarni tortish uchun (fetch) ishlatiladi.

\`\`\`javascript
useEffect(() => {
  console.log("Men faqatgina 1 marta, eng boshida ishlayman!");
}, []); // Bo'sh massiv
\`\`\`

### 3. To'ldirilgan massiv \`[var1, var2]\` (O'zgarish / Update)
Massiv ichiga qandaydir o'zgaruvchilarni (state yoki props) solsangiz, React faqatgina shu o'zgaruvchilardan biri o'zgargandagina effektni qayta ishga tushiradi.

\`\`\`javascript
const [count, setCount] = useState(0);

useEffect(() => {
  console.log(\`Count qiymati o'zgardi: \${count}\`);
}, [count]); // Faqat 'count' o'zgarganda ishlaydi
\`\`\`

---

## Cheksiz Tsikllar Tuzog'i (Infinite Loops Trap)

React dasturchilari o'z faoliyati davomida kamida bir marta (ko'pincha yuzlab marta) cheksiz tsikl tuzog'iga tushishadi. Bu brauzerni qotib qolishiga olib keladi.

### Qanday qilib bu yuzaga keladi?
Agar siz \`useEffect\` ichida biror \`state\`ni o'zgartirsangiz va \`useEffect\` shu \`state\` o'zgarganda ishlashga sozlangan bo'lsa (yoki qaramliklar massivi umuman berilmagan bo'lsa), ular bir-birini cheksiz chaqirishni boshlaydi.

> **Analogiya:** Bu xuddi kuchukka o'z dumini tishlashini aytishga o'xshaydi. U dumiga yetib olganda yana aylanib ketaveradi va hech qachon to'xtamaydi.

❌ **Yomon amaliyot (Cheksiz tsikl):**
\`\`\`javascript
const [counter, setCounter] = useState(0);

useEffect(() => {
  // XATO! Effect har renderda ishlaydi, va o'zi ham re-render chaqiryapti!
  setCounter(counter + 1); 
});
\`\`\`
*Tushuntirish: Komponent render bo'ladi -> useEffect ishlaydi -> counter + 1 ga o'zgaradi -> State o'zgargani uchun komponent qayta render bo'ladi -> useEffect yana ishlaydi -> va h.k. cheksiz!*

✅ **Yaxshi amaliyot:**
\`\`\`javascript
const [counter, setCounter] = useState(0);

// Faqatgina biz xohlagan qat'iy holatda ishlaydi (masalan, faqat boshida)
useEffect(() => {
  const timer = setTimeout(() => {
    setCounter((prev) => prev + 1);
  }, 1000);
  
  return () => clearTimeout(timer); // Tozalash (Cleanup)
}, []); // Yoki faqatgina biror aniq shart asosida ishlaydigan qilib sozlash
\`\`\`

---

## Tozalash Funksiyalari (Cleanup Functions)

\`useEffect\` sizga funksiya ichidan yana bir funksiya qaytarishga imkon beradi. Bu **Tozalash funksiyasi (Cleanup function)** deb ataladi.

### Nega kerak?
Ba'zi effektlar "iz" qoldiradi. Masalan, siz setInterval bilan taymer yoqdingiz yoki qandaydir hodisani tinglashni boshladingiz (\`window.addEventListener\`). Agar komponent ekrandan o'chirilsa (Unmount), u taymerlar orqada ishlayveradi va xotira sizib chiqishiga (Memory Leak) hamda xatolarga olib keladi.

> **Analogiya:** Siz mehmonxona xonasini ijaraga oldingiz (Mount). Xonada musiqa qo'yib berishini so'radingiz (Effect). Mehmonxonadan chiqib ketayotganingizda (Unmount), musiqani o'chirib ketishingiz kerak, aks holda u kimsasiz xonada bo'shga jiringlab yotaveradi (Memory Leak).

### Qachon ishlaydi?
1. Komponent ekrandan butunlay o'chirilishidan oldin (Unmount).
2. Effekt keyingi marta qayta ishga tushishidan oldin (oldingi effektning qoldiqlarini tozalash uchun).

❌ **Yomon amaliyot (Tozalamaslik):**
\`\`\`javascript
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Agar foydalanuvchi sahifadan chiqib ketsa, bu "listener" brauzer xotirasida osilib qoladi!
}, []);
\`\`\`

✅ **Yaxshi amaliyot (Tozalash bilan):**
\`\`\`javascript
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  
  window.addEventListener('resize', handleResize);
  
  // Cleanup funksiyasi:
  return () => {
    window.removeEventListener('resize', handleResize);
    console.log("Listener tozalandi!");
  };
}, []);
\`\`\`

### Xulosa
Hooklar qoidalariga amal qiling. \`useEffect\` dagi qaramliklar massiviga (\`[]\`) doim e'tibor qarating, chunki kodning ishlash mantig'i va tezligi to'g'ridan-to'g'ri unga bog'liq. Har doim ishlatilgan obunalar (subscriptions) yoki taymerlarni "Cleanup" qilishni unutmang!

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
