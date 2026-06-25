export const reactAdvancedPerformance = {
  id: "react-advanced-performance",
  title: "React Ilg'or Unumdorlik (Advanced Performance)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

React 18'da "Concurrent Features" (Bir vaqtda ishlash xususiyatlari) qo'shildi. Bu degani endi qandaydir og'ir hisoblash (masalan qidiruv paytida ro'yxatni yangilash) foydalanuvchi kiritayotgan inputga (klaviaturada yozishga) to'sqinlik qilmaydi. Biz **useTransition** va **useDeferredValue** hook'laridan foydalanib, unchalik muhim bo'lmagan UI yangilanishlarini orqaga suramiz. Agar to'g'ridan-to'g'ri JavaScript og'ir amallarni (masalan, 100,000 marta aylanishni) qilsa brauzer qotadi. Buning uchun esa **Web Worker** lardan foydalanish mumkin. Yana bir narsa, ilovangizni sekinlashtirayotgan joyini topish uchun React DevTools tarkibidagi **Profiler** dan foydalaniladi.

## 2. ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON Yondashuv:**
Qidiruv inputini va minglab natijalarni bitta state bilan yangilash:
\`\`\`javascript
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value); // Input yangilanishi
    setResults(heavySearch(e.target.value)); // Og'ir hisoblash (Input qotib qoladi!)
  };

  return <input value={query} onChange={handleChange} />;
}
\`\`\`

✅ **YAXSHI Yondashuv (useTransition):**
Og'ir yangilanishni (qidiruv natijasini) pastroq prioritetga (transition) tushirish:
\`\`\`javascript
import { useState, useTransition } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value); // Tezkor yangilanish (Input darhol o'zgaradi)
    
    startTransition(() => {
      // Sekinroq yangilanish (bu UI ni bloklamaydi)
      setResults(heavySearch(e.target.value));
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <span>Kuting...</span> : <List items={results} />}
    </>
  );
}
\`\`\`

## 3. 🎤 Intervyu Savollari

1. **Concurrent React o'zi nima?**
   Javob: React 18 ning yangi arxitekturasi bo'lib, render jarayonini to'xtatib turish, bekor qilish va qayta boshlash imkonini beradi. Eng muhim (foydalanuvchi bilan interaktiv) harakatlar zudlik bilan, og'irroq renderlar esa orqa fonga surilib UI qotishining oldi olinadi.

2. **useTransition va setTimeout o'rtasidagi farq nima?**
   Javob: \`setTimeout\` kodni mutlaqo makro-task qilib keyinga (asinxron) qoldiradi. \`startTransition\` ichidagi holat esa sinxron baholanadi, lekin u "Transition" (past prioritetli render) deb belgilanadi va agar yuqori prioritetli vazifa (kiritish) kelsa, u to'xtatilib turilishi (interrupt) mumkin.

3. **useDeferredValue qachon ishlatiladi?**
   Javob: Odatda \`useTransition\` holatni o'zgartirish o'zimizning qo'limizda bo'lganda (masalan event handler ichida) ishlatiladi. Lekin state tepadan proplar orqali kelayotgan bo'lsa, uni o'zgartirishni biz boshqara olmasak, \`useDeferredValue(propName)\` orqali kechiktirib ishlatishimiz mumkin.

4. **React Profiler nima?**
   Javob: React dasturining qaysi komponentlari qancha vaqt ichida render bo'lganligini, qaysilari eng sekin ishlayotganini tahlil qiladigan vosita. \`<Profiler>\` komponenti sifatida yoki Browser DevTools orqali yoqiladi.

## 4. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[Foydalanuvchi klaviaturada yozdi] --> B{Transition bormi?}
    B -- Yo'q --> C[Input va Og'ir List baravar yangilanadi: EKRAN QOTADI]
    B -- Ha --> D[Input zudlik bilan yangilanadi]
    D --> E[Og'ir List orqa fonga o'tadi va bo'sh vaqtda render qilinadi]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Deferred Value Analogi",
      instruction: "Qiymat darhol o'zgarmasdan biroz kutib yangilanuvchi (masalan 10ms kutuvchi) va callback ni chaqiruvchi funksiya yarating. Eski qiymat saqlanib qolishi kerak.",
      startingCode: "function deferValue(newValue, callback) {\n  // setTimeout ishlating\n}",
      hint: "setTimeout orqali yangi qiymatni callback ga uzating.",
      solution: "function deferValue(newValue, callback) {\n  setTimeout(() => {\n    callback(newValue);\n  }, 10);\n}",
      test: "const fn = new Function(code + '; return deferValue;')(); let v = 0; fn(5, (val)=>v=val); if(v !== 0) throw new Error('Darhol ishladi'); setTimeout(()=>{ if(v!==5) throw new Error('Ishlamadi')}, 15);"
    },
    {
      id: 2,
      title: "startTransition Simulyatsiyasi",
      instruction: "Agar muhitda requestIdleCallback bo'lsa (bo'sh vaqtda ishlash), o'shandan foydalangan holda yoki bo'lmasa setTimeout orqali kodni ishlatuvchi startTransition analogi yozing.",
      startingCode: "function myStartTransition(callback) {\n  // bo'sh vaqtda ishlash\n}",
      hint: "window.requestIdleCallback mavjudligini tekshiring, aks holda setTimeout(..., 0).",
      solution: "function myStartTransition(callback) {\n  if (typeof requestIdleCallback === 'function') {\n    requestIdleCallback(callback);\n  } else {\n    setTimeout(callback, 0);\n  }\n}",
      test: "const fn = new Function(code + '; return myStartTransition;')(); let done = false; fn(()=> done=true); if(done) throw new Error('Zudlik bilan ishladi'); setTimeout(()=>{ if(!done) throw new Error('Ishlamadi')}, 50);"
    },
    {
      id: 3,
      title: "Vaqtni (Performance) O'lchash (Profiler kabi)",
      instruction: "Funksiya qabul qilib, uning ishlashi uchun qancha vaqt ketganligini millisoniyada o'lchab { result, time } qaytaradigan wrapper funksiya yozing.",
      startingCode: "function measurePerformance(fn) {\n  // performance.now() ishlating\n}",
      hint: "performance.now() yordamida funksiyadan oldingi va keyingi vaqtni ayiring.",
      solution: "function measurePerformance(fn) {\n  const start = performance.now();\n  const result = fn();\n  const end = performance.now();\n  return { result, time: end - start };\n}",
      test: "const fn = new Function(code + '; return measurePerformance;')(); const res = fn(()=>{ for(let i=0;i<10000;i++){} return 'ok'; }); if(res.result !== 'ok' || typeof res.time !== 'number') throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Time Slicing (Vaqtga bo'lish)",
      instruction: "Juda katta massivni har 100 ta elementdan so'ng asinxron (setTimeout) ishlatib aylanib chiquvchi 'processChunks' yozing. Callback ga har bir 100 talik qism (chunk) yuboriladi.",
      startingCode: "function processChunks(array, callback) {\n  // har 100 tasida setTimeout yordamida nafas oling\n}",
      hint: "Rekursiya yoki setInterval/setTimeout orqali sikl aylaning.",
      solution: "function processChunks(array, callback) {\n  let i = 0;\n  function processNext() {\n    const end = Math.min(i + 100, array.length);\n    const chunk = array.slice(i, end);\n    callback(chunk);\n    i = end;\n    if (i < array.length) {\n      setTimeout(processNext, 0);\n    }\n  }\n  processNext();\n}",
      test: "const fn = new Function(code + '; return processChunks;')(); let count=0; fn(new Array(200).fill(1), (c)=>count+=c.length); setTimeout(()=>{ if(count!==200) throw new Error('Xato')}, 50);"
    },
    {
      id: 5,
      title: "Priority Queue (Prioritet bo'yicha ishlash)",
      instruction: "Qatorga (queue) vazifalar tushadi: { task, priority } (priority: 1 - baland, 0 - past). Olib ishlatganda (runNext) har doim avval priority 1 larni ishlatuvchi queue yarating.",
      startingCode: "function createPriorityQueue() {\n  // enqueue va runNext metodlarini qaytaring\n}",
      hint: "2 ta massiv saqlang: high va low.",
      solution: "function createPriorityQueue() {\n  const high = [];\n  const low = [];\n  return {\n    enqueue(task, priority) {\n      if(priority === 1) high.push(task);\n      else low.push(task);\n    },\n    runNext() {\n      if(high.length > 0) return high.shift()();\n      if(low.length > 0) return low.shift()();\n    }\n  };\n}",
      test: "const fn = new Function(code + '; return createPriorityQueue;')(); const q = fn(); let res=[]; q.enqueue(()=>res.push('A'), 0); q.enqueue(()=>res.push('B'), 1); q.runNext(); if(res[0] !== 'B') throw new Error('Prioritet xato');"
    },
    {
      id: 6,
      title: "Heavy Task Web Worker String",
      instruction: "Kod blokini (funksiyani string ko'rinishida) qabul qilib, uni Blob orqali ishchi (Worker) ga aylantira oladigan Object URL (URL.createObjectURL) yaratadigan funksiya yozing.",
      startingCode: "function createWorkerUrl(fnString) {\n  // Blob va URL.createObjectURL ishlating\n}",
      hint: "new Blob([fnString], {type: 'application/javascript'})",
      solution: "function createWorkerUrl(fnString) {\n  const blob = new Blob([fnString], { type: 'application/javascript' });\n  return URL.createObjectURL(blob);\n}",
      test: "const fn = new Function(code + '; return createWorkerUrl;')(); const url = fn('console.log(1)'); if(typeof url !== 'string' || !url.startsWith('blob:')) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Memoization bilan Algoritmik Optimallashtirish",
      instruction: "Fibonachchi sonini topuvchi rekursiv funksiya juda sekin. Uni kesh (memo) orqali optimallashtiruvchi fastFib yozing.",
      startingCode: "function fastFib(n, memo = {}) {\n  // keshdan o'qing yoki hisoblab saqlang\n}",
      hint: "Agar memo[n] bor bo'lsa darhol qaytaring.",
      solution: "function fastFib(n, memo = {}) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);\n  return memo[n];\n}",
      test: "const fn = new Function(code + '; return fastFib;')(); if(fn(10) !== 55 || fn(50) < 100) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "O'chirilgan (Stale) Renderlarni Bekor qilish",
      instruction: "Asinxron qidiruvda (fetch) eski natijalar yangi natijalardan keyin kelsa, ui da eski ko'rinib qoladi (Race condition). Buning uchun so'rov jo'natilgan 'id' ni eslab qolib faqat oxirgisini qabul qiladigan class/obyekt yozing.",
      startingCode: "function createLatestResolver() {\n  // metod: request(promise). faqat eng oxirgi chaqirilgan promise natijasini qaytarsin\n}",
      hint: "Har request da currentId ni oshirib, promise .then ichida o'sha id saqlanib qolganmi tekshiring.",
      solution: "function createLatestResolver() {\n  let currentId = 0;\n  return {\n    request: function(promise) {\n      const id = ++currentId;\n      return promise.then(res => {\n        if (id === currentId) return res;\n        throw new Error('Stale');\n      });\n    }\n  }\n}",
      test: "const fn = new Function(code + '; return createLatestResolver;')(); const r = fn(); r.request(Promise.resolve(1)).catch(()=>{}); r.request(Promise.resolve(2)).then(v=>{ if(v!==2) throw new Error('Xato')});"
    },
    {
      id: 9,
      title: "Object Reactivity'ni chetlab o'tish (Muzlatish)",
      instruction: "Qaysidir hollarda katta massiv/obyektlarga mutatsiya qo'llanilmasligi ularni reaktiv qilishdan osonroq. Obyektni chuqur clone (deep clone) qilmasdan shunchaki shallow copy yaratadigan tezkor funksiya.",
      startingCode: "function shallowCopyObj(obj) {\n  // tezkor copy\n}",
      hint: "Object.assign yoki Spread operator",
      solution: "function shallowCopyObj(obj) {\n  return { ...obj };\n}",
      test: "const fn = new Function(code + '; return shallowCopyObj;')(); const a = {x:1}; const b = fn(a); if(a===b || b.x!==1) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Xotirani tozalash (Garbage Collection yordami)",
      instruction: "Katta obyekt (kesh) hajmi ma'lum bir miqdordan (masalan 3 ta kalitdan) oshib ketsa, eng eski kiritilgan qiymatni o'chirib yuboradigan kesh obyekti (LRU soddalashtirilgan).",
      startingCode: "function createLimitedCache(limit) {\n  // set(key, val) va get(key)\n}",
      hint: "Map'dan foydalaning, chunki Map kalitlar kiritish ketma-ketligini saqlaydi. size oshganda keys().next().value ni o'chiring.",
      solution: "function createLimitedCache(limit) {\n  const cache = new Map();\n  return {\n    set(key, val) {\n      if (cache.size >= limit && !cache.has(key)) {\n        const firstKey = cache.keys().next().value;\n        cache.delete(firstKey);\n      }\n      cache.set(key, val);\n    },\n    get(key) {\n      return cache.get(key);\n    }\n  };\n}",
      test: "const fn = new Function(code + '; return createLimitedCache;')(); const c = fn(2); c.set('a',1); c.set('b',2); c.set('c',3); if(c.get('a') !== undefined || c.get('c') !== 3) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Concurrent Features qaysi React versiyasida to'liq rasman qo'shilgan?",
      options: [
        "React 15",
        "React 16.8",
        "React 18",
        "React 19"
      ],
      correctAnswer: 2,
      explanation: "React 18'da Concurrent React va undagi hooklar (useTransition, useDeferredValue kabi) to'liq ishga tushirilgan."
    },
    {
      id: 2,
      question: "useTransition'dan qaytuvchi 'isPending' holati nima uchun kerak?",
      options: [
        "Tarmoqdan so'rov kelayotganini bildirish uchun (Fetch loading kabi)",
        "React orqa fonda og'ir render operatsiyasini bajarayotganligini foydalanuvchiga bildirish (masalan 'Kuting...' kabi matn ko'rsatish) uchun",
        "Xatolik chiqqanini ko'rsatish",
        "Faqat CSS ni o'zgartirish uchun"
      ],
      correctAnswer: 1,
      explanation: "startTransition orqali boshlangan state yangilanishi tugaguncha isPending 'true' bo'lib turadi."
    },
    {
      id: 3,
      question: "useDeferredValue va debounce o'rtasida qanday katta farq bor?",
      options: [
        "Debounce asinxron, useDeferredValue esa sinxron",
        "Farqi yo'q ikkisi bir xil ishlaydi",
        "Debounce ko'r-ko'rona belgilangan vaqt (masalan 500ms) kutadi. useDeferredValue esa vaqt kutmaydi, faqatgina brauzer bo'sh bo'lganda zudlik bilan render qilib yuboradi.",
        "useDeferredValue faqat massivlar bilan ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Debounce qattiq vaqt (timer) ga asoslanadi. DeferredValue esa React ning ichki schedule arxitekturasiga, agar qilinadigan muhim ish bo'lmasa u 0 millisoniyada ishini qilib yuborishi mumkin."
    },
    {
      id: 4,
      question: "Web Worker React bilan nega ba'zida ishlatiladi?",
      options: [
        "Kodni xavfsiz qilish uchun",
        "Main Thread (Asosiy oqim) ni to'sib qo'yadigan o'ta og'ir hisoblashlarni fondagi alohida thread'ga ko'chirish uchun",
        "Faqat rasmlarni saqlash uchun",
        "React Web Workersiz ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript bir oqimli (single-threaded). Og'ir amallar brauzerni qotiradi, Web Worker ushbu amallarni boshqa oqimda bajarishga imkon beradi."
    },
    {
      id: 5,
      question: "React Profiler'dagi 'Commit' bosqichi nima?",
      options: [
        "Git ga kodni commit qilish",
        "React DOM ga (yoki boshqa muhitga) o'zgarishlarni kiritish vaqti",
        "Komponent o'chirilishi",
        "State yangilanishi e'lon qilinishi"
      ],
      correctAnswer: 1,
      explanation: "React-da ikki bosqich bor: Render bosqichi (nimalar o'zgarishini aniqlash) va Commit bosqichi (shularni DOMga yozish). Profiler ularning har birini vaqtini ko'rsatadi."
    },
    {
      id: 6,
      question: "Concurrent rendering paytida React bitta komponentni render qilishni yarmida to'xtatib qoya oladimi?",
      options: [
        "Yo'q, u doim oxirigacha yetkazadi",
        "Ha, agar render 'Transition' deb belgilangan bo'lsa va shu vaqtda input kabi 'Urgent' (shoshilinch) yangilanish paydo bo'lsa, uni to'xtatadi",
        "Faqat brauzer ruxsat bersa",
        "Ha, agar xato bo'lsa"
      ],
      correctAnswer: 1,
      explanation: "Concurrent React ning asosiy kuchi ham shunda - u render jarayonini to'xtatishi (interrupt) va keyinroq tashlab yuborib boshqatdan boshlashi mumkin."
    },
    {
      id: 7,
      question: "Stale Closure muammosi qachon kelib chiqadi?",
      options: [
        "Komponent nomi xato yozilganda",
        "Hook (masalan useEffect yoki useCallback) ichida eski state yoki prop ning eskimi (stale) qiymati qolib ketishi va yangi qiymat o'qilmasligida",
        "Proplar ko'payib ketganda",
        "React versiyasi eskirganda"
      ],
      correctAnswer: 1,
      explanation: "Dependencies massivida to'g'ri qiymatlarni bermaslik natijasida ichkaridagi funksiya doimo birinchi (eski) qiymat bilan ishlashda davom etadi."
    },
    {
      id: 8,
      question: "Komponent ko'rinayotganini (visible) aniqlab, faqat ko'ringandagina uni render qilish nima deb ataladi?",
      options: [
        "Virtualization (Windowing) yoki Lazy loading with Intersection Observer",
        "State Colocation",
        "Context isolation",
        "useTransition"
      ],
      correctAnswer: 0,
      explanation: "Ko'rinmaydigan qismlarni render qilmaslik UI larda memory va CPU unumdorligini tejaydi."
    },
    {
      id: 9,
      question: "Nega 'useTransition' ni 'setTimeout' o'rnida tanlash kerak?",
      options: [
        "Chunki setTimeout React.js da ishlamaydi",
        "setTimeout orqali state o'zgarganda oraliq qora ekran(bo'sh joy) paydo bo'lishi mumkin (Suspense bilan ishlaganda). useTransition esa eski UI ni ushlab turib 'isPending' orqali silliq o'tish imkonini beradi.",
        "useTransition ko'proq kod yozishga majbur qiladi",
        "Ikkisi bir xil, tanlov sizniki"
      ],
      correctAnswer: 1,
      explanation: "useTransition ayniqsa Suspense bilan ishlaganda yangi sahifa yoki komponent yuklanguncha eskisini ko'rsatib turishga zamin yaratadi."
    },
    {
      id: 10,
      question: "Quyidagilarning qaysi biri Render bosqichida qilinmasligi SHART?",
      options: [
        "Console log yozish",
        "Tarmoqdan API so'rov yuborib javob kela solib setState chaqirish (Side-effect lar)",
        "Obyekt qaytarish",
        "Shart operatori yozish"
      ],
      correctAnswer: 1,
      explanation: "Render qismi sof (pure) bo'lishi kerak. Fetch qilish va state'ni o'zgartirish side-effect hisoblanadi va asosan useEffect kabi joylarga olinishi shart. Aks holda infinite loop yuz beradi."
    },
    {
      id: 11,
      question: "Qaysi qoida React hooks uchun xos (Rules of Hooks)?",
      options: [
        "Faqat class larda ishlatish mumkin",
        "Hooklarni shartli operator (if) yoki sikl (for) ichida chaqirib bo'lmaydi",
        "Faqat bitta hook bo'lishi shart",
        "Hooklarni event handlerda ishlatsa bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "React hooklarni ularning chaqirilish tartibiga qarab boshqaradi. Agar ular if/else ichiga kiritilsa tartib buziladi."
    },
    {
      id: 12,
      question: "Profiling paytida qaysi turdagi komponentlar eng katta muammo hisoblanadi?",
      options: [
        "Umuman re-render bo'lmaydigan komponentlar",
        "O'ta ko'p marta keraksiz re-render bo'layotgan yoki renderi sekin bo'layotgan (qizil/sariq rangli) komponentlar",
        "Birinchi marta yuklanishi 1ms bo'lgan komponentlar",
        "Bo'sh DIV elementlari"
      ],
      correctAnswer: 1,
      explanation: "Profilerning maqsadi keraksiz qayta chizilishlarni topish va ularni memoization (React.memo) bilan qisqartirishdir."
    }
  ]
};
