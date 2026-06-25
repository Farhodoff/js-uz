export const reactPerformanceBasics = {
  id: "react-performance-basics",
  title: "React Unumdorligi Asoslari (React Performance Basics)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

React tez ishlaydi, chunki u Virtual DOM (VDOM) dan foydalanadi. Qachonki komponent holati (state) yoki prop'lari o'zgarsa, React yangi VDOM yaratadi va eskisi bilan solishtiradi (Reconciliation). Agar farq bo'lsa, haqiqiy DOM shunga mos ravishda yangilanadi. Ammo, kerak bo'lmasa ham komponentlar qayta render bo'lishi (unnecessary re-renders) dastur sekinlashishiga olib kelishi mumkin. Shu sababli, biz React.memo, useMemo va useCallback kabi hook'lar orqali komponent va qiymatlarni "keschlaymiz" (memoize).

## 2. ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON Yondashuv:**
Har doim yangi funksiya yoki obyekt yaratish (bu bola komponentni ham qayta render qiladi):
\`\`\`javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  // YOMON: Har renderda yangi funksiya va obyekt yaratiladi
  const handleClick = () => console.log('Clicked');
  const user = { name: "Ali" };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <ChildComponent onClick={handleClick} user={user} />
    </div>
  );
}
\`\`\`

✅ **YAXSHI Yondashuv:**
Qiymat va funksiyalarni keshlash:
\`\`\`javascript
function Parent() {
  const [count, setCount] = useState(0);

  // YAXSHI: useCallback va useMemo orqali keshlash
  const handleClick = useCallback(() => console.log('Clicked'), []);
  const user = useMemo(() => ({ name: "Ali" }), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <MemoizedChildComponent onClick={handleClick} user={user} />
    </div>
  );
}
\`\`\`

## 3. 🎤 Intervyu Savollari

1. **Virtual DOM nima va u qanday ishlaydi?**
   Javob: VDOM bu haqiqiy DOM ning xotiradagi nusxasi. React holat o'zgarganda yangi VDOM yaratadi, eskisi bilan solishtiradi va faqat o'zgargan qismini haqiqiy DOM ga kiritadi (Reconciliation).

2. **Qachon \`React.memo\` dan foydalanish kerak?**
   Javob: Agar komponent o'zining proplari tez-tez o'zgarmasa va u og'ir render jarayoniga ega bo'lsa, React.memo yordam beradi.

3. **\`useMemo\` va \`useCallback\` ning farqi nima?**
   Javob: \`useMemo\` qimmat hisob-kitob natijasini (qiymatni) keshlaydi, \`useCallback\` esa funksiyaning o'zini keshlaydi.

## 4. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[Ota Komponent Render] --> B{Prop o'zgarganmi?}
    B -- Yo'q --> C[React.memo: Keshlangan komponent ishlatiladi]
    B -- Ha --> D[Bola Komponent Qayta Render bo'ladi]
    D --> E[DOM yangilanishi ehtimoli]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Memoize Funksiyasi (useMemo analogi)",
      instruction: "Oddiy memoize funksiyasini yozing. U parametr sifatida kiritilgan funksiya natijasini argumentlariga ko'ra keshlab qo'ysin.",
      startingCode: "function memoize(fn) {\n  // kesh yaratish\n  return function(...args) {\n    // keshni tekshirish va saqlash\n  }\n}",
      hint: "Obyekt yoki Map yordamida argumentlarni string ko'rinishida kalit sifatida saqlashingiz mumkin.",
      solution: "function memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (key in cache) return cache[key];\n    const result = fn(...args);\n    cache[key] = result;\n    return result;\n  }\n}",
      test: "const memo = new Function('fn', code + '; return memoize(fn);'); const mockFn = (a) => a * 2; const mFn = memo(mockFn); if (mFn(2) !== 4) throw new Error('2 kiritilganda 4 qaytishi kerak');"
    },
    {
      id: 2,
      title: "Saylovchi (Selector) Funksiya",
      instruction: "Faqatgina ma'lum bir maydon (field) o'zgargandagina hisoblashni bajaruvchi funksiya yarating.",
      startingCode: "function createSelector(state, field) {\n  // shu yerda yozing\n}",
      hint: "Kesh saqlash uchun closure ishlatiladi.",
      solution: "function createSelector(state, field) {\n  let lastState = null;\n  let lastResult = null;\n  return function(newState) {\n    if (newState[field] === lastState) return lastResult;\n    lastState = newState[field];\n    lastResult = newState[field] * 2;\n    return lastResult;\n  }\n}",
      test: "const fn = new Function(code + '; return createSelector;')(); const sel = fn({}, 'val'); if (sel({val: 2}) !== 4) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Shallow Compare (Yuzaki solishtirish)",
      instruction: "Ikkita obyektni yuzaki (shallow) solishtiradigan funksiya yozing (xuddi React.memo kabi).",
      startingCode: "function shallowEqual(obj1, obj2) {\n  // solishtiring\n}",
      hint: "Obyekt kalitlari soni bir xilmi va har bir kalitdagi qiymat === bilan tengmi tekshiring.",
      solution: "function shallowEqual(obj1, obj2) {\n  if (Object.is(obj1, obj2)) return true;\n  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || !obj1 || !obj2) return false;\n  const keys1 = Object.keys(obj1);\n  const keys2 = Object.keys(obj2);\n  if (keys1.length !== keys2.length) return false;\n  for (let key of keys1) {\n    if (obj1[key] !== obj2[key]) return false;\n  }\n  return true;\n}",
      test: "const fn = new Function(code + '; return shallowEqual;')(); if (!fn({a:1}, {a:1}) || fn({a:1}, {a:2})) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Simple useCallback analog",
      instruction: "Har safar chaqirilganda, agar qaramliklar (deps) o'zgarmagan bo'lsa, oldingi funksiyani qaytaradigan closure yozing.",
      startingCode: "function useCallbackAnalog(callback, deps) {\n  // keshni nazorat qiling\n}",
      hint: "Oldingi deps va oldingi callback'ni saqlab turing.",
      solution: "let lastDeps = null;\nlet lastCb = null;\nfunction useCallbackAnalog(callback, deps) {\n  if (!lastDeps) {\n    lastDeps = deps;\n    lastCb = callback;\n    return lastCb;\n  }\n  const isSame = deps.every((d, i) => d === lastDeps[i]);\n  if (isSame) return lastCb;\n  lastDeps = deps;\n  lastCb = callback;\n  return lastCb;\n}",
      test: "const fn = new Function(code + '; return useCallbackAnalog;')(); const cb1 = () => {}; const res1 = fn(cb1, [1]); const res2 = fn(() => {}, [1]); if (res1 !== res2) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Qimmat hisoblashni keshlashtirish",
      instruction: "Massivdagi sonlar yig'indisini hisoblaydigan funksiya, agar massiv bir xil bo'lsa hisoblashni qaytarmasin.",
      startingCode: "function expensiveSum(arr) {\n  // kesh qiling\n}",
      hint: "Massivning elementlarini tekshiring yoki JSON.stringify ishlating.",
      solution: "const cache = new Map();\nfunction expensiveSum(arr) {\n  const key = JSON.stringify(arr);\n  if (cache.has(key)) return cache.get(key);\n  const sum = arr.reduce((a,b)=>a+b, 0);\n  cache.set(key, sum);\n  return sum;\n}",
      test: "const fn = new Function(code + '; return expensiveSum;')(); if (fn([1,2,3]) !== 6) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Yolg'onchi re-render (Fake Re-render)",
      instruction: "Klassik hisoblashda obyekt referensi o'zgarishini oldini olish funksiyasi. Agar kelayotgan obyekt qiymatlari eski obyekt bilan bir xil bo'lsa, eskisini qaytaring.",
      startingCode: "function keepReference(oldObj, newObj) {\n  // agar qiymatlari teng bo'lsa oldObj ni qaytaring\n}",
      hint: "Shallow compare ishlating.",
      solution: "function keepReference(oldObj, newObj) {\n  const keys1 = Object.keys(oldObj);\n  const keys2 = Object.keys(newObj);\n  if (keys1.length !== keys2.length) return newObj;\n  for(let k of keys1) {\n    if (oldObj[k] !== newObj[k]) return newObj;\n  }\n  return oldObj;\n}",
      test: "const fn = new Function(code + '; return keepReference;')(); const a = {v:1}; const b = {v:1}; if (fn(a, b) !== a) throw new Error('Reference xato');"
    },
    {
      id: 7,
      title: "Custom Hook kabi closure",
      instruction: "Qiymat va uni o'zgartiruvchi funksiya qaytaruvchi useState analogi. Faqat qiymat haqiqatan o'zgarsa xabar bering.",
      startingCode: "function customState(init) {\n  // [value, setValue]\n}",
      hint: "Closure ichida state saqlang.",
      solution: "function customState(init) {\n  let val = init;\n  let notify = 0;\n  const setVal = (newVal) => {\n    if (val !== newVal) {\n      val = newVal;\n      notify++;\n    }\n  };\n  return [() => val, setVal, () => notify];\n}",
      test: "const fn = new Function(code + '; return customState;')(); const [get, set, not] = fn(5); set(5); if(not() !== 0) throw new Error('Xato'); set(6); if(not() !== 1) throw new Error('Xato2');"
    },
    {
      id: 8,
      title: "To'xtatib turish (Debounce)",
      instruction: "Performance uchun tez-tez chaqiriladigan funksiyalarni debounce qiluvchi funksiya yozing.",
      startingCode: "function debounce(fn, delay) {\n  // yozing\n}",
      hint: "setTimeout va clearTimeout ishlating.",
      solution: "function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}",
      test: "const fn = new Function(code + '; return debounce;')(); if (typeof fn(() => {}, 100) !== 'function') throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Cheklash (Throttle)",
      instruction: "Bir vaqt oralig'ida faqat bir marta ishlashga ruxsat beruvchi throttle funksiyasi.",
      startingCode: "function throttle(fn, limit) {\n  // yozing\n}",
      hint: "Oxirgi marta ishlagan vaqtni saqlang.",
      solution: "function throttle(fn, limit) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= limit) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}",
      test: "const fn = new Function(code + '; return throttle;')(); if (typeof fn(() => {}, 100) !== 'function') throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Obyektni muzlatish (Freeze)",
      instruction: "Obyektga o'zgartirish kiritilmasligi uchun uni chuqur muzlatuvchi (deep freeze) funksiya yozing.",
      startingCode: "function deepFreeze(obj) {\n  // yozing\n}",
      hint: "Object.freeze ishlating va barcha ichki obyektlarga rekursiv murojaat qiling.",
      solution: "function deepFreeze(obj) {\n  Object.freeze(obj);\n  Object.getOwnPropertyNames(obj).forEach(function(prop) {\n    if (obj.hasOwnProperty(prop) && obj[prop] !== null && typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {\n      deepFreeze(obj[prop]);\n    }\n  });\n  return obj;\n}",
      test: "const fn = new Function(code + '; return deepFreeze;')(); const o = {a: {b: 1}}; fn(o); try { o.a.b = 2; } catch(e) {} if (o.a.b === 2) throw new Error('Muzlatilmadi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "React'da qachon komponent qayta render bo'ladi?",
      options: [
        "Faqat proplar o'zgarganda",
        "State o'zgarganda, prop o'zgarganda yoki ota komponent render bo'lganda",
        "Faqatgina state o'zgarganda",
        "Sahifa yuklangandagina"
      ],
      correctAnswer: 1,
      explanation: "React'da komponent o'zining state, props'i o'zgarganda yoki ota komponenti qayta render bo'lganda qayta ishlaydi."
    },
    {
      id: 2,
      question: "useMemo qanday maqsadlarda ishlatiladi?",
      options: [
        "Funksiyani keshlashtirish",
        "Qimmat (og'ir) hisob-kitoblarni keshlashtirish",
        "Kodni qisqartirish",
        "API dan ma'lumot olish uchun"
      ],
      correctAnswer: 1,
      explanation: "useMemo funksiya qaytaruvchi qiymatni keshlaydi, bu og'ir amallarni qayta hisoblashdan qutqaradi."
    },
    {
      id: 3,
      question: "useCallback ni ishlatish qachon samarali?",
      options: [
        "Har doim funksiya yozganda",
        "Faqatgina komponentlar ichida yozilgan oddiy click funksiyalar uchun",
        "Bola komponentlarga funksiyani prop orqali berganda (va bola memo orqali o'ralganda)",
        "UseEffect ni to'xtatish uchun"
      ],
      correctAnswer: 2,
      explanation: "Bola komponentlar keraksiz qayta render bo'lmasligi uchun funksiya referensini saqlashda ishlatiladi."
    },
    {
      id: 4,
      question: "React.memo o'zi nima qiladi?",
      options: [
        "Komponentni har doim yangilaydi",
        "Faqatgina props'lar o'zgargandagina komponentni qayta render qiladi",
        "Komponentdagi barcha xatolarni yashiradi",
        "ComponentDidMount kabi ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "React.memo bu HOC (Higher Order Component) bo'lib, proplar yuzaki (shallow) tekshiruvdan o'tmagunicha qayta renderni to'xtatadi."
    },
    {
      id: 5,
      question: "Shallow Compare (Yuzaki solishtirish) qanday ishlaydi?",
      options: [
        "Obyekt ichidagi obyektlarni ham to'liq tekshiradi",
        "Faqat birinchi qatlamdagi qiymatlar va referenslarni tekshiradi",
        "Umuman tekshirmaydi, true qaytaradi",
        "Stringlarni solishtiradi xolos"
      ],
      correctAnswer: 1,
      explanation: "Yuzaki solishtirish obyekt kalitlarini tekshiradi, agar ularning referensi (yoki oddiy qiymati) === orqali teng bo'lsa, bir xil deb hisoblaydi."
    },
    {
      id: 6,
      question: "Qaysi holatda useCallback kerak emas?",
      options: [
        "Juda ko'p bola komponentlarga callback uzatilganda",
        "Custom hooklarda funksiya return qilinganda",
        "Oddiy div tugmasiga onClick berilganda",
        "Bola komponent React.memo bilan himoyalanganda"
      ],
      correctAnswer: 2,
      explanation: "Oddiy HTML elementlarida (masalan, <button onClick={...}>) useCallback ishlatishdan foyda yo'q, aksincha kesh xotira egallaydi xolos."
    },
    {
      id: 7,
      question: "React unumdorligida qaysi biri yomon amaliyot hisoblanadi?",
      options: [
        "Key prop sifatida indeks ishlatish (ro'yxat o'zgaruvchan bo'lsa)",
        "Memoization usullaridan me'yorida foydalanish",
        "Component state ni to'g'ri taqsimlash",
        "Lazy loading dan foydalanish"
      ],
      correctAnswer: 0,
      explanation: "Ro'yxat o'zgarganda map() ichida indeksni key sifatida ishlatish re-renderda qattiq muammolarga olib kelishi mumkin."
    },
    {
      id: 8,
      question: "useMemo da bog'liqlik (dependencies) massivini bo'sh [] qoldirilsa nima bo'ladi?",
      options: [
        "Har safar qayta hisoblanadi",
        "Faqat birinchi marta hisoblanib keshlanadi",
        "Xato beradi",
        "State ni yangilamaydi"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh massiv ( [] ) ko'rsatilsa, useMemo hisoblashni faqat komponent ilk marta mount bo'lganda amalga oshiradi."
    },
    {
      id: 9,
      question: "Virtual DOM nima uchun kerak?",
      options: [
        "Xotirada kamroq joy egallashi uchun",
        "Dastur kodi qisqarishi uchun",
        "Haqiqiy DOM yangilanishi og'ir ekanligi va minimallashtirish uchun",
        "Bu shunchaki reklamali atama"
      ],
      correctAnswer: 2,
      explanation: "Haqiqiy DOM manipulatsiyalari sekin. VDOM esa farqlarni aniqlab, faqat zarur qismlarni tezda yangilaydi."
    },
    {
      id: 10,
      question: "Debounce va Throttle farqi nima?",
      options: [
        "Debounce oxirgi harakatdan so'ng vaqt o'tishini kutadi, Throttle esa doimiy oraliqda ishlaydi",
        "Throttle faqat oxirida ishlaydi",
        "Ikkisi ham bitta narsa",
        "Debounce faqat React da bor"
      ],
      correctAnswer: 0,
      explanation: "Debounce bir nechta tez-tez bo'layotgan chaqiriqlarni bittaga birlashtirib, pauza bo'lganda chaqiradi. Throttle esa harakat qancha ko'p bo'lmasin, berilgan vaqt oralig'ida (masalan har 1 soniyada) 1 marta ishlashini ta'minlaydi."
    },
    {
      id: 11,
      question: "Reactda 'Reconciliation' jarayoni nima?",
      options: [
        "Fayllarni siqish jarayoni",
        "VDOM eskisi va yangisini solishtirib, farqlarni aniqlash algoritmi",
        "Ma'lumotlarni serverdan olish",
        "State ni tozalash"
      ],
      correctAnswer: 1,
      explanation: "Reconciliation - React ikkita virtual daraxtni taqqoslab, DOM ga kiritiladigan o'zgarishlarni aniqlash jarayonidir."
    },
    {
      id: 12,
      question: "Har bir bola komponentga obyekt prop uzatilganda qanday ehtiyotkorlik qilish kerak?",
      options: [
        "Obyektni komponent tashqarisida yoki useMemo da yaratish",
        "Faqatgina typeof object ni string ga o'zgartirish",
        "Umuman obyekt yubormaslik",
        "React.lazy dan foydalanish"
      ],
      correctAnswer: 0,
      explanation: "Komponent ichida { a: 1 } shaklida obyekt yaratilsa, u har renderda yangilanadi va memo qilingan bolani ham re-render qiladi. Shuning uchun uni tashqarida yoki useMemo da yaratish maqsadga muvofiq."
    }
  ]
};
