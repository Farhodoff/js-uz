export const reactPerformanceOptimization = {
  id: "react-performance-optimization",
  title: "React Unumdorligini Oshirish (Performance Optimization)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

React dasturlari kattalashgani sari foydalanuvchiga barcha kodni bitta katta faylda (bundle) yuklash veb-saytning sekinlashishiga olib keladi. Buni hal qilish uchun **Code Splitting** va **Lazy Loading** ishlatiladi. Bu kerakli qismlarni (masalan, foydalanuvchi bosgandagina ochiladigan sahifalarni) faqatgina zarur bo'lganda yuklash imkonini beradi. Shuningdek, minglab ma'lumotlarni render qilish kerak bo'lsa **Windowing (Virtualization)** orqali faqat ekranda ko'rinib turgan qismigina yaratiladi.

## 2. ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON Yondashuv:**
Barcha komponentlarni ro'yxatdan o'tkazib birdaniga yuklash:
\`\`\`javascript
import Home from './Home';
import Dashboard from './Dashboard'; // Juda og'ir komponent

function App() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
    </Router>
  );
}
\`\`\`

✅ **YAXSHI Yondashuv:**
React.lazy va Suspense bilan Lazy Loading:
\`\`\`javascript
import React, { Suspense } from 'react';
import Home from './Home';

// Lazy load
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={
        <Suspense fallback={<div>Loading Dashboard...</div>}>
          <Dashboard />
        </Suspense>
      } />
    </Router>
  );
}
\`\`\`

## 3. 🎤 Intervyu Savollari

1. **Code Splitting nima?**
   Javob: Veb dasturning barcha JavaScript kodini bitta katta \`bundle.js\` fayliga joylash o'rniga, kichikroq bo'laklarga (chunk) ajratish usuli. Bu sahifa tezroq yuklanishini ta'minlaydi.

2. **React.lazy qanday ishlaydi?**
   Javob: \`React.lazy\` dinamik importlarni render qilinadigan oddiy React komponentiga aylantiradi. Komponent birinchi marta render bo'layotganda uning kodini serverdan yuklab oladi.

3. **Suspense nima maqsadda ishlatiladi?**
   Javob: Lazy komponentlar serverdan yuklangunga qadar (Promise pending holatida), foydalanuvchiga Loading ekranini (fallback UI) ko'rsatib turish uchun ishlatiladi.

4. **Windowing (React Virtualization) haqida tushuncha bering?**
   Javob: Agar 10,000 ta ro'yxat elementi bo'lsa, ularning hammasini birdaniga DOM ga yozish juda sekin bo'ladi. Windowing orqali faqat ayni damda ekranda ko'rinib turgan qismi (+ biroz atrofi) render qilinadi (masalan, \`react-window\`).

## 4. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph LR
    A[Foydalanuvchi 'Dashboard' ni bosdi] --> B{Bundle yuklanganmi?}
    B -- Yo'q --> C[React.lazy orqali serverdan so'rov]
    C --> D[Suspense fallback ko'rsatiladi]
    D --> E[Yuklab olindi, Dashboard render bo'ladi]
    B -- Ha --> E
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Module Chunking (Ma'lumotni bo'laklash)",
      instruction: "Katta ro'yxatni (massivni) kichik 'chunk'larga ajratuvchi funksiya yozing. Bu Code Splitting ga o'xshaydi.",
      startingCode: "function chunkArray(array, size) {\n  // yozing\n}",
      hint: "slice() metodidan foydalanib massivni bo'ling.",
      solution: "function chunkArray(array, size) {\n  const result = [];\n  for (let i = 0; i < array.length; i += size) {\n    result.push(array.slice(i, i + size));\n  }\n  return result;\n}",
      test: "const fn = new Function(code + '; return chunkArray;')(); const res = fn([1,2,3,4,5], 2); if (res.length !== 3 || res[2][0] !== 5) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Lazy Loader Analogi",
      instruction: "Berilgan funksiya (promise qaytaradi) bajarilganda ma'lumotni oladigan oddiy lazyLoader funksiyasi. U modulni olib keshlaydi.",
      startingCode: "function lazyLoader(importFn) {\n  // module keshlansin, keyin qaytsin\n}",
      hint: "O'zgaruvchiga saqlang. Agar oldin yuklangan bo'lsa o'shani Promise.resolve bilan qaytaring.",
      solution: "let cache = null;\nfunction lazyLoader(importFn) {\n  if (cache) return Promise.resolve(cache);\n  return importFn().then(mod => {\n    cache = mod;\n    return mod;\n  });\n}",
      test: "const fn = new Function(code + '; return lazyLoader;')(); fn(() => Promise.resolve('ok')).then(r => { if(r !== 'ok') throw new Error('Xato'); });"
    },
    {
      id: 3,
      title: "Virtualization Logic (Oyna ko'rinishi)",
      instruction: "Scroll bo'yicha qaysi indekslar ko'rinishini toping. Parametrlar: scrollTop (px), windowHeight (px), itemHeight (px). O'shanga mos { startIndex, endIndex } qaytaring.",
      startingCode: "function getVisibleRange(scrollTop, windowHeight, itemHeight) {\n  // return { startIndex, endIndex }\n}",
      hint: "startIndex = Math.floor(scrollTop / itemHeight), endIndex = Math.ceil((scrollTop + windowHeight) / itemHeight)",
      solution: "function getVisibleRange(scrollTop, windowHeight, itemHeight) {\n  const startIndex = Math.floor(scrollTop / itemHeight);\n  const endIndex = Math.ceil((scrollTop + windowHeight) / itemHeight);\n  return { startIndex, endIndex };\n}",
      test: "const fn = new Function(code + '; return getVisibleRange;')(); const res = fn(50, 100, 20); if (res.startIndex !== 2 || res.endIndex !== 8) throw new Error('Hisoblash xato');"
    },
    {
      id: 4,
      title: "Suspense Analogi (Try/Catch Error)",
      instruction: "React'da Suspense xatoni ushlash(catch) qobiliyatidan foydalanadi (agar Promise otilsa). Funksiya yozing, agar ichidagi call() Promise bersa catch qilsin va u resolved bo'lganda yana call() qilsin.",
      startingCode: "function runSuspense(componentFn) {\n  // componentFn ni ishlating, error ushlasa uning .then() idan keyin yana ishlating\n}",
      hint: "try/catch orqali xatoni ushlang.",
      solution: "function runSuspense(componentFn) {\n  try {\n    return componentFn();\n  } catch (promiseOrErr) {\n    if (typeof promiseOrErr.then === 'function') {\n      promiseOrErr.then(() => runSuspense(componentFn));\n    }\n  }\n}",
      test: "const fn = new Function(code + '; return runSuspense;')(); let count=0; const comp = () => { if(count++ === 0) throw Promise.resolve(); return 'done'; }; if(fn(comp) !== undefined) throw new Error('Initial catch xato');"
    },
    {
      id: 5,
      title: "Tree Shaking Analogi",
      instruction: "Bizda exports obyekti bor va faqat ishlatilgan (used) metodlarnigina qoldirib yangi obyekt qaytaruvchi funksiya.",
      startingCode: "function treeShake(exportsObj, usedKeys) {\n  // keraklilarini ajrating\n}",
      hint: "reduce yoki forEach orqali ishlatilganlarini yig'ing.",
      solution: "function treeShake(exportsObj, usedKeys) {\n  return usedKeys.reduce((acc, key) => {\n    if(exportsObj[key] !== undefined) acc[key] = exportsObj[key];\n    return acc;\n  }, {});\n}",
      test: "const fn = new Function(code + '; return treeShake;')(); const res = fn({a:1, b:2, c:3}, ['a', 'c']); if(res.b || res.a !== 1) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Intersection Observer - Sodda ko'rinishi",
      instruction: "Ikkita to'rtburchak (rect) kesishganligini aniqlang (True/False). Rect: {x, y, width, height}.",
      startingCode: "function isIntersecting(rect1, rect2) {\n  // logic\n}",
      hint: "rect1 va rect2 ning x, y lari ularning kenglik/balandliklariga ko'ra kesishmasligini topib inkor qiling.",
      solution: "function isIntersecting(rect1, rect2) {\n  return !(\n    rect2.x > rect1.x + rect1.width ||\n    rect2.x + rect2.width < rect1.x ||\n    rect2.y > rect1.y + rect1.height ||\n    rect2.y + rect2.height < rect1.y\n  );\n}",
      test: "const fn = new Function(code + '; return isIntersecting;')(); const r1 = {x:0,y:0,width:10,height:10}; const r2 = {x:5,y:5,width:10,height:10}; if(!fn(r1, r2)) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Prefetch (Oldindan yuklash) yordamchisi",
      instruction: "Url lar ro'yxati beriladi, faqatgina hali yuklanmaganlarini Promise qilib qaytaruvchi funksiya yozing.",
      startingCode: "function prefetchUrls(urls, cachedUrls) {\n  // urls ichidan faqatgina cachedUrls da yo'qlarini qaytaring\n}",
      hint: "filter() orqali yo'qlarini ajrating.",
      solution: "function prefetchUrls(urls, cachedUrls) {\n  const cachedSet = new Set(cachedUrls);\n  return urls.filter(url => !cachedSet.has(url));\n}",
      test: "const fn = new Function(code + '; return prefetchUrls;')(); const urls = ['/a', '/b', '/c']; const cached = ['/b']; const res = fn(urls, cached); if (res.length !== 2 || res.includes('/b')) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Ro'yxatni filtrlab Memo qilish",
      instruction: "Massiv va filter so'zi kiritiladi. Agar oldingi filter va massiv bir xil bo'lsa, eskisini qaytarsin.",
      startingCode: "function memoizedFilter(arr, term) {\n  // kesh logic\n}",
      hint: "Obyektda { term, arr, result } saqlang.",
      solution: "let cache = {};\nfunction memoizedFilter(arr, term) {\n  if (cache.arr === arr && cache.term === term) return cache.result;\n  const result = arr.filter(item => item.includes(term));\n  cache = { arr, term, result };\n  return result;\n}",
      test: "const fn = new Function(code + '; return memoizedFilter;')(); const arr = ['apple', 'banana']; const res1 = fn(arr, 'a'); const res2 = fn(arr, 'a'); if (res1 !== res2) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Dynamic Import String",
      instruction: "Xuddi Webpack kabi, import qilinayotgan stringni pathdan ajratib oling: \"import('./pages/About')\" -> 'About'.",
      startingCode: "function extractModuleName(importStr) {\n  // regEx yoki split ishlating\n}",
      hint: "Qavs va qo'shtirnoqlarni olib tashlab, oxirgi qismini oling.",
      solution: "function extractModuleName(importStr) {\n  const match = importStr.match(/\\/([^/]+)'\\)$/);\n  return match ? match[1] : null;\n}",
      test: "const fn = new Function(code + '; return extractModuleName;')(); if (fn(\"import('./pages/About')\") !== 'About') throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Web Worker imitatsiyasi (Offloading)",
      instruction: "Asosiy Thread bloklanmasligi uchun, og'ir ishni kechiktirib (setTimeout 0) bajarib, callback orqali qaytaruvchi funksiya.",
      startingCode: "function runInWorker(heavyTask, cb) {\n  // non-blocking usul\n}",
      hint: "setTimeout dan foydalaning.",
      solution: "function runInWorker(heavyTask, cb) {\n  setTimeout(() => {\n    const res = heavyTask();\n    cb(res);\n  }, 0);\n}",
      test: "const fn = new Function(code + '; return runInWorker;')(); let done = false; fn(()=>100, (v)=>{ if(v===100) done=true; }); setTimeout(()=>{ if(!done) throw new Error('Xato'); }, 10);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Code splitting qanday afzallik beradi?",
      options: [
        "Fayl hajmini sun'iy kattalashtiradi",
        "Saytni SEO da orqaga tortadi",
        "Ilovani kerakli qismlarga bo'lib, sahifa tezroq yuklanishini ta'minlaydi",
        "Faqat rasmlarni optimizatsiya qiladi"
      ],
      correctAnswer: 2,
      explanation: "Code splitting orqali faqat hozir kerak bo'lgan kod yuklanadi va sayt ochilish tezligi oshadi."
    },
    {
      id: 2,
      question: "React.lazy qanday import turidan foydalanadi?",
      options: [
        "Static import (import X from 'x')",
        "Dynamic import (import('x'))",
        "Require ('x')",
        "AJAX fetch"
      ],
      correctAnswer: 1,
      explanation: "React.lazy dinamik import (import('./Component')) chaqiriqlariga tayanadi va u Promise qaytaradi."
    },
    {
      id: 3,
      question: "Suspense komponentida 'fallback' prop'i nima vazifa bajaradi?",
      options: [
        "Xatolarni ko'rsatish uchun",
        "Komponent yuklanayotgan paytda ko'rinib turuvchi vaqtinchalik UI (masalan, Loading...)",
        "Komponent topilmasa ishlaydi",
        "Sahifani yopib qoyadi"
      ],
      correctAnswer: 1,
      explanation: "Lazy yuklanish vaqt olyotganida ekranda fallback UI render qilinadi."
    },
    {
      id: 4,
      question: "React'da minglab ma'lumotlarni ko'rsatish uchun qaysi texnika eng ma'quli?",
      options: [
        "Barchasini bitta <ul> ga map qilish",
        "Windowing / Virtualization (masalan react-window)",
        "Faqat CSS display: none ishlatish",
        "Barchasiga React.memo ishlatish"
      ],
      correctAnswer: 1,
      explanation: "Windowing faqat ekranda ko'rinayotgan qismini render qilib, DOM va xotirani keraksiz yuklamadan himoya qiladi."
    },
    {
      id: 5,
      question: "Tree Shaking jarayoni nima qiladi?",
      options: [
        "Keraksiz CSS larni o'chiradi",
        "Dasturda yozilgan lekin hech qayerda ishlatilmagan (dead code) JavaScript kodlarini olib tashlaydi",
        "Barcha xatolarni tuzatadi",
        "DOM dagi eski node larni yangilaydi"
      ],
      correctAnswer: 1,
      explanation: "Webpack, Vite kabi bundler'lar modulning faqat ishlatilgan qismlarini saqlab qolib, foydalanilmagan (dead) kodni tushirib qoldiradi."
    },
    {
      id: 6,
      question: "Komponentni 'Lazy loading' qilish qachon samarali emas?",
      options: [
        "Komponent o'ta kichkina bo'lganda (bir necha kb)",
        "Juda katta grafik komponentlarda",
        "Juda kam kiriladigan sahifalarda",
        "Har xil tillardagi tarjimalarni yuklashda"
      ],
      correctAnswer: 0,
      explanation: "Juda kichik fayllar uchun tarmoq (network) so'rovi yuborish uni asosiy bundle'da olib kelishdan ko'ra sekinroq bo'lishi mumkin."
    },
    {
      id: 7,
      question: "Server-Side Rendering (SSR) da React.lazy qanday ishlaydi?",
      options: [
        "Mukammal ishlaydi, hech narsa qo'shish kerak emas",
        "React.lazy SSR da standart holatda qo'llab quvvatlanmaydi (@loadable/component kabi kutubxonalar ishlatiladi)",
        "Sahifani bloklab qoyadi",
        "Faqat fallback ko'rsatib turaveradi"
      ],
      correctAnswer: 1,
      explanation: "Hozirgi vaqtda standart React.lazy SSR to'liq mukammal qo'llamaydi, garchi React 18 da Suspense SSR qo'shilgan bo'lsa-da, boyitilgan kutubxonalar (loadable) yoki Next.js (next/dynamic) ishlatiladi."
    },
    {
      id: 8,
      question: "Prefetching qanday jarayon?",
      options: [
        "Foydalanuvchi sahifaga o'tmasdan oldin, fonda uning kodini oldindan yuklab qo'yish",
        "Orqaga qaytishni ta'qiqlash",
        "Xotirani bo'shatish",
        "CSS larni JS ga aylantirish"
      ],
      correctAnswer: 0,
      explanation: "Foydalanuvchi qaysidir havolaga bosishi mumkinligi ehtimoli yuqori bo'lsa (masalan ustiga sichqonchani olib kelganda), kod oldindan yuklab olinadi."
    },
    {
      id: 9,
      question: "React-window kabi kutubxonalar qanday muammoni hal qiladi?",
      options: [
        "Komponentni chiroyli qiladi",
        "Memory leak larni to'xtatadi",
        "Juda uzun ro'yxatlarni DOMda minglab elementlar yaratmasdan samarali render qilishni",
        "Backendga ko'p so'rov ketishini"
      ],
      correctAnswer: 2,
      explanation: "DOM ni kichik saqlash orqali scroll qilish muammosiz(smooth) bo'ladi."
    },
    {
      id: 10,
      question: "Suspense faqat dinamik komponentlarni yuklashda ishlatiladimi?",
      options: [
        "Ha, faqat React.lazy bilan ishlaydi",
        "Yo'q, React 18 dan boshlab ma'lumot (Data Fetching - masalan Relay yoki SWR) olinishini kutishda ham ishlatiladi",
        "Suspense endi ishlatilmaydi",
        "Suspense faqat rasmlar uchun kerak"
      ],
      correctAnswer: 1,
      explanation: "React 18 kiritgan o'zgarishlarga asosan Suspense asinxron ma'lumot kutish (Data Fetching) arxitekturasida ham to'liq qatnashadi."
    },
    {
      id: 11,
      question: "Dynamic import ning qaytarish turi nima?",
      options: [
        "Object",
        "String",
        "Promise",
        "Function"
      ],
      correctAnswer: 2,
      explanation: "import('./module.js') doimo Promise qaytaradi va bu modul yuklanganda resolved bo'ladi."
    },
    {
      id: 12,
      question: "Nega bitta sahifa ilovalari (SPA) dastlabki yuklanishda (Initial Load) sekin bo'ladi?",
      options: [
        "Internet sekinligi uchun faqat",
        "Brauzer eskirgani uchun",
        "Chunki barcha JS bundle yuklanib, parse qilinmaguncha sahifa ishlamaydi",
        "Faqat CSS renderni to'sadi"
      ],
      correctAnswer: 2,
      explanation: "Katta SPA larning eng zaif tomoni uning dastlabki bundle.js hajmining kattaligidir. Code splitting shuni yo'q qilishga qaratilgan."
    }
  ]
};
