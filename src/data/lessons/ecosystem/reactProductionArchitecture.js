export const reactProductionArchitecture = {
  id: "react-production-architecture",
  title: "React.js Production Architecture",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
React dasturini ishlab chiqarishga (production) tayyorlash shunchaki \`npm run build\` qilish bilan tugamaydi. Katta loyihalarda **Code Splitting**, **Lazy Loading**, **Error Boundaries**, **State Management** arxitekturasi va **Performance Optimization** kabi tushunchalar muhim ahamiyatga ega. Loyihaning yuklanish vaqtini (Initial Load Time) qisqartirish uchun keraksiz kodlarni boshlang'ich bundle'dan ajratish kerak.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON:** Hamma komponentlarni bitta katta bundle qilib yuklash. Bu dastlabki yuklanishni juda sekinlashtiradi.
\`\`\`javascript
import { HeavyChart } from './HeavyChart'; // Sahifa ochilishini kutishga majbur qiladi
\`\`\`

✅ **YAXSHI:** Code Splitting va Lazy Loading ishlatish. Faqat kerakli paytda yuklash.
\`\`\`javascript
import React, { lazy, Suspense } from 'react';
const HeavyChart = lazy(() => import('./HeavyChart'));

// Suspense orqali yuklanish jarayonida fallback (Loading) ko'rsatiladi
<Suspense fallback={<div>Loading...</div>}>
  <HeavyChart />
</Suspense>
\`\`\`

## 🎤 Intervyu Savollari
1. **React'da Code Splitting nima va nega kerak?**
   Javob: Dastur kodini kichik qismlarga (chunks) bo'lish orqali faqat kerakli sahifa yoki komponent yuklanganda kerakli kodni tarmoqdan yuklab olishdir. Bu Initial Load Time'ni keskin qisqartiradi.
2. **Error Boundary nima?**
   Javob: React komponentlar daraxtida (ayniqsa render vaqtida) yuz bergan xatolarni ushlab, butun dastur ekrani oq bo'lib qulab tushishining oldini oluvchi xavfsizlik qatlami.
3. **React.memo va useMemo farqi nima?**
   Javob: \`React.memo\` HOC bo'lib, komponent props'lari o'zgarmasa uni qayta render bo'lishidan saqlaydi. \`useMemo\` esa React hook bo'lib, og'ir hisob-kitob natijasini xotirada keshlaydi.

## 🛠️ Amaliy Topshiriqlar
Quyidagi arxitektura chizmasi React ilovasining production muhitidagi ishlashini ko'rsatadi:

\`\`\`mermaid
graph TD
    A[Foydalanuvchi] -->|So'rov| B(CDN / Nginx)
    B -->|Statik fayllar| C{React App bundle.js}
    C -->|API so'rovlar| D[Backend Server]
    C -.->|Lazy Component| E[chunk-1.js]
    C -.->|Lazy Component| F[chunk-2.js]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Production Config",
      instruction: "React loyihasi uchun `getConfig(env)` funksiyasini yozing. Agar `env === 'production'` bo'lsa `{ apiUrl: 'prod' }`, aks holda `{ apiUrl: 'dev' }` qaytarsin.",
      startingCode: "function getConfig(env) {\n  // code\n}",
      hint: "Ternary operatordan foydalaning.",
      solution: "function getConfig(env) {\n  return { apiUrl: env === 'production' ? 'prod' : 'dev' };\n}",
      test: "const fn = new Function(code + '; return getConfig;')();\nif(fn('production').apiUrl !== 'prod' || fn('development').apiUrl !== 'dev') throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Analyze Bundle Size",
      instruction: "`analyzeBundle(chunks)` funksiyasini yozing. U `{size: number}` ko'rinishidagi obyektlardan iborat massiv qabul qilib, barcha chunk'larning umumiy hajmini qaytarsin.",
      startingCode: "function analyzeBundle(chunks) {\n  // code\n}",
      hint: "reduce metodidan foydalaning.",
      solution: "function analyzeBundle(chunks) {\n  return chunks.reduce((acc, curr) => acc + curr.size, 0);\n}",
      test: "const fn = new Function(code + '; return analyzeBundle;')();\nif(fn([{size: 100}, {size: 200}]) !== 300) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Fallback UI",
      instruction: "`fallbackUI(error)` funksiyasi agar `error` mavjud bo'lsa `{ error: error.message }` obyektini, yo'q bo'lsa `null` qaytarsin.",
      startingCode: "function fallbackUI(error) {\n  // code\n}",
      hint: "if sharti orqali tekshiring.",
      solution: "function fallbackUI(error) {\n  return error ? { error: error.message } : null;\n}",
      test: "const fn = new Function(code + '; return fallbackUI;')();\nif(fn(null) !== null || fn({message:'xato'}).error !== 'xato') throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Chunk Data",
      instruction: "Virtualization uchun `chunkData(arr, size)` funksiyasini yozing. U massivni `size` uzunlikdagi kichik massivlarga ajratsin.",
      startingCode: "function chunkData(arr, size) {\n  // code\n}",
      hint: "for sikli va slice ishlating.",
      solution: "function chunkData(arr, size) {\n  const res = [];\n  for(let i=0; i<arr.length; i+=size) res.push(arr.slice(i, i+size));\n  return res;\n}",
      test: "const fn = new Function(code + '; return chunkData;')();\nif(fn([1,2,3], 2).length !== 2) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Build URL",
      instruction: "`buildUrl(base, param)` funksiyasi `base` ga `param` ni qo'shib qaytarsin. Agar base oxirida `/` bo'lsa, uni olib tashlang. `param` bo'lmasa faqat `base` qaytsin.",
      startingCode: "function buildUrl(base, param) {\n  // code\n}",
      hint: "endsWith ishlatib ko'ring.",
      solution: "function buildUrl(base, param) {\n  let b = base.endsWith('/') ? base.slice(0, -1) : base;\n  return param ? `${b}/${param}` : b;\n}",
      test: "const fn = new Function(code + '; return buildUrl;')();\nif(fn('/a/', 'b') !== '/a/b' || fn('/a') !== '/a') throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Filter Critical CSS",
      instruction: "`filterCritical(styles)` funksiyasi styles obyektlari massividan faqat `isCritical: true` bo'lganlarini qaytarsin.",
      startingCode: "function filterCritical(styles) {\n  // code\n}",
      hint: "filter() ishlating.",
      solution: "function filterCritical(styles) {\n  return styles.filter(s => s.isCritical);\n}",
      test: "const fn = new Function(code + '; return filterCritical;')();\nif(fn([{isCritical:true}, {isCritical:false}]).length !== 1) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Check Health",
      instruction: "`checkHealth(deps)` funksiyasi deps obyektidagi barcha xizmatlar `true` ekanligini tekshirsin. Hammasi true bo'lsa true, bittasi false bo'lsa false qaytsin.",
      startingCode: "function checkHealth(deps) {\n  // code\n}",
      hint: "Object.values() va every().",
      solution: "function checkHealth(deps) {\n  return Object.values(deps).every(Boolean);\n}",
      test: "const fn = new Function(code + '; return checkHealth;')();\nif(fn({a:true, b:true}) !== true || fn({a:true, c:false}) !== false) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Calculate Load Time",
      instruction: "`calcLoadTime(start, end)` - qabul qilingan ikkita Date obyekti yoki timestamp orasidagi farqni millisekundlarda qaytarsin.",
      startingCode: "function calcLoadTime(start, end) {\n  // code\n}",
      hint: "end - start ishlating.",
      solution: "function calcLoadTime(start, end) {\n  return end - start;\n}",
      test: "const fn = new Function(code + '; return calcLoadTime;')();\nif(fn(100, 250) !== 150) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Mock Debounce",
      instruction: "`debounce(fn, ms)` funksiyasini yozing. U `fn` ni chaqirishdan oldin `ms` millisekund kutadigan keshlovchi funksiya qaytarsin.",
      startingCode: "function debounce(fn, ms) {\n  // code\n}",
      hint: "setTimeout va clearTimeout ishlating.",
      solution: "function debounce(fn, ms) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), ms);\n  };\n}",
      test: "const fn = new Function(code + '; return debounce;')();\nlet x = 0; const d = fn(() => x++, 10); d(); d(); \nsetTimeout(() => { if(x !== 1) throw new Error('Xato') }, 20);"
    },
    {
      id: 10,
      title: "Parse App Version",
      instruction: "`parseVersion(str)` - `v1.2.3` ko'rinishidagi stringdan obyekt yarating `{ major: 1, minor: 2, patch: 3 }`.",
      startingCode: "function parseVersion(str) {\n  // code\n}",
      hint: "replace('v', '') qilib keyin split('.') qiling.",
      solution: "function parseVersion(str) {\n  const [major, minor, patch] = str.replace('v', '').split('.').map(Number);\n  return { major, minor, patch };\n}",
      test: "const fn = new Function(code + '; return parseVersion;')();\nconst v = fn('v1.2.3'); if(v.major !== 1 || v.minor !== 2 || v.patch !== 3) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Code Splitting'ning asosiy maqsadi nima?",
      options: ["Bundle hajmini kattalashtirish", "Kodni xavfsiz qilish", "Faqat kerakli kodni yuklab, sahifa ochilishini tezlashtirish", "React versiyasini yangilash"],
      correctAnswer: 2,
      explanation: "Code Splitting dastlabki yuklanish vaqtini (initial load time) qisqartiradi."
    },
    {
      id: 2,
      question: "React'da qaysi hook qimmatbaho hisob-kitoblarni keshlaydi?",
      options: ["useState", "useMemo", "useEffect", "useRef"],
      correctAnswer: 1,
      explanation: "useMemo funksiya natijasini xotirada saqlab, ortiqcha hisob-kitoblarning oldini oladi."
    },
    {
      id: 3,
      question: "Lazy loading amalga oshirishda React'da asosan qaysi komponentdan foydalaniladi?",
      options: ["<Suspense>", "<ErrorBoundary>", "<Provider>", "<Fragment>"],
      correctAnswer: 0,
      explanation: "Suspense orqali komponent yuklangunga qadar fallback (masalan loading spinner) ko'rsatiladi."
    },
    {
      id: 4,
      question: "Error Boundary nima uchun kerak?",
      options: ["API xatolarini to'g'rilash", "Kodni xavfsizroq qilish va dastur qulab tushishidan saqlab fallback UI ko'rsatish", "Dasturni tezlashtirish", "Redux state'ni tozalash"],
      correctAnswer: 1,
      explanation: "Render vaqtidagi xatolar butun daraxtni qulatib qo'ymasligi uchun Error Boundary ishlatiladi."
    },
    {
      id: 5,
      question: "React.memo qanday vazifani bajaradi?",
      options: ["Global stateni boshqaradi", "Xatolarni tutadi", "Props o'zgarmasa komponentni qayta render bo'lishdan saqlaydi", "Kodni lazy load qiladi"],
      correctAnswer: 2,
      explanation: "React.memo Higher Order Component bo'lib, komponentni ortiqcha renderlardan himoya qiladi."
    },
    {
      id: 6,
      question: "Production muhitida console.log() larni nima qilish tavsiya etiladi?",
      options: ["Qoldirish kerak", "Olib tashlash yoki build vaqtida tozalash", "Faqat errorlarni qoldirish", "Foydalanuvchiga ko'rsatish"],
      correctAnswer: 1,
      explanation: "Console'ga chiqarish production'da ham sekinlik, ham ma'lumot sizib chiqishiga olib keladi."
    },
    {
      id: 7,
      question: "Tree Shaking nima?",
      options: ["Ishlatilmagan (dead) kodlarni yakuniy bundle'dan olib tashlash", "Komponentlar daraxtini yangilash", "Kodni siqish", "Virtual DOM'ni tozalash"],
      correctAnswer: 0,
      explanation: "Tree Shaking import qilinmagan yoki umuman ishlatilmagan funksiyalarni build jarayonida olib tashlaydi."
    },
    {
      id: 8,
      question: "Lighthouse audit vositasi nimani o'lchaydi?",
      options: ["Ma'lumotlar bazasi tezligini", "Backend arxitekturasini", "Web dasturning performance, SEO va Accessibility ko'rsatkichlarini", "Fayllar hajmini"],
      correctAnswer: 2,
      explanation: "Chrome DevTools ichidagi Lighthouse dasturning production'ga qanchalik tayyorligini baholaydi."
    },
    {
      id: 9,
      question: "CDN (Content Delivery Network) React dasturi uchun qanday foyda beradi?",
      options: ["Ma'lumotlar bazasini himoyalaydi", "Statik fayllarni (masalan, bundle.js) foydalanuvchiga eng yaqin serverdan tezkor yetkazib beradi", "Kod yozishni osonlashtiradi", "Faqat tasvirlarni saqlaydi"],
      correctAnswer: 1,
      explanation: "CDN yordamida ilova fayllari geografik jihatdan foydalanuvchiga yaqin hududdan yuklanadi."
    },
    {
      id: 10,
      question: "Server-Side Rendering (SSR) ni qachon ishlatgan ma'qul?",
      options: ["Faqat admin panellarda", "Kodni qisqartirish uchun", "SEO'ni yaxshilash va birinchi sahifani (FCP) tezroq ko'rsatish talab etilganda", "Har doim shart"],
      correctAnswer: 2,
      explanation: "SSR tayyor HTML qaytargani sababli qidiruv tizimlari botlari sahifani oson indekslaydi."
    },
    {
      id: 11,
      question: "React'da ko'p miqdordagi elementlarni (list) ekranga chiqarishda samarali yondashuv nima?",
      options: ["Barchasini birdan map qilish", "Virtualization (masalan react-window) ishlatish", "For loop dan foydalanish", "Hammasini alohida komponent qilish"],
      correctAnswer: 1,
      explanation: "Virtualization faqat ekranda ko'rinib turgan elementlarnigina DOM'ga joylashtirib, performance'ni oshiradi."
    },
    {
      id: 12,
      question: "React ilovasini production uchun qurishda qaysi muhit o'zgaruvchisidan foydalaniladi?",
      options: ["NODE_ENV=production", "REACT_APP_PROD=true", "BUILD_MODE=prod", "ENV=live"],
      correctAnswer: 0,
      explanation: "NODE_ENV='production' bo'lganda React o'zining ichki debug va xato xabarlarini o'chiradi, bu dasturni tezlashtiradi."
    }
  ]
};
