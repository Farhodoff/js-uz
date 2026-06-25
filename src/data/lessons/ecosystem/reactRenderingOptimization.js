export const reactRenderingOptimization = {
  id: "react-rendering-optimization",
  title: "React Render Jarayonini Optimallashtirish",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

React'da render jarayoni – bu holat (state) o'zgarganida UI'ni yangilashdir. Agar siz state'ni ilovaning eng yuqori qismida (App.js) saqlasangiz va u o'zgarsa, barcha pastki komponentlar ham qayta render bo'lishi mumkin. Buni oldini olish uchun **State Colocation** (holatni qayerda kerak bo'lsa o'sha yerning o'zida saqlash) ishlatiladi. Shuningdek, Context API dan noto'g'ri foydalanish ham butun dasturni sekinlashtiradi. Yana bir muhim narsa - ro'yxatlarda **key** prop'ni to'g'ri ishlatish (index o'rniga id berish), shunda React qaysi element o'zgarganini aniq topadi.

## 2. ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON Yondashuv:**
Ro'yxatda \`key\` o'rniga massiv indeksidan foydalanish (agar ro'yxat tartibi o'zgaradigan bo'lsa):
\`\`\`javascript
function List({ items }) {
  // YOMON: index ishlatish ro'yxatdan element o'chirilganda xatolarga olib keladi
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

✅ **YAXSHI Yondashuv:**
O'ziga xos va o'zgarmas ID dan foydalanish:
\`\`\`javascript
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

❌ **YOMON Yondashuv (State'ni keraksiz joyga ko'tarish):**
\`App\` da faqatgina bitta input uchun \`state\` saqlash barcha komponentlarni (hatto o'sha inputga aloqasi yo'qlarni ham) qayta render qiladi.

✅ **YAXSHI Yondashuv (State Colocation):**
Input state'ni faqat o'zining kichik komponenti ichida saqlash.

## 3. 🎤 Intervyu Savollari

1. **Nima uchun React'da ro'yxatlarga (lists) \`key\` prop'ini berish kerak?**
   Javob: React ro'yxatdagi elementlarni o'zgartirish, qo'shish yoki o'chirishni samarali bajarishi uchun \`key\` ga suyanadi. Agar \`key\` bo'lmasa yoki u index bo'lsa, React qaysi element haqiqatda o'zgarganini chalkashtirib, keraksiz DOM yangilanishlariga va inputdagi yo'qotishlarga sabab bo'lishi mumkin.

2. **State Colocation nima?**
   Javob: Holatni (state) iloji boricha faqat u kerak bo'lgan komponentning o'zida yozish. Ota komponentga keraksiz state qo'yishdan qochish. Bu ortiqcha re-renderlarni kamaytiradi.

3. **React 18 da Automatic Batching nima?**
   Javob: React 18 gacha bir vaqtda bir nechta \`setState\` chaqirilsa va u \`setTimeout\` kabi asinxron joyda bo'lsa, har bitta \`setState\` uchun bittadan render bo'lar edi. Batching esa barcha \`setState\` larni bitta guruhga yig'ib bitta renderda yangilashdir.

## 4. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[Ota Komponent] --> B[Bola 1]
    A --> C[Bola 2]
    B --> D[State faqat Bola 1 da bo'lsa]
    D --> E[Faqat Bola 1 qayta render bo'ladi]
    F[State Ota komponentda bo'lsa] --> G[Barcha komponentlar render bo'ladi!]
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Key Uniqueness Tekshiruvi",
      instruction: "Ro'yxatdagi (massivdagi) ob'ektlarning berilgan 'key' maydoni takrorlanmas (unique) ekanligini tekshiruvchi funksiya yozing. Agar hammasi unikal bo'lsa true, bo'lmasa false qaytarsin.",
      startingCode: "function isKeyUnique(arr, keyField) {\n  // tekshiring\n}",
      hint: "Set dan foydalanib uzunliklarni solishtiring.",
      solution: "function isKeyUnique(arr, keyField) {\n  const keys = arr.map(item => item[keyField]);\n  const uniqueKeys = new Set(keys);\n  return keys.length === uniqueKeys.size;\n}",
      test: "const fn = new Function(code + '; return isKeyUnique;')(); if(!fn([{id:1}, {id:2}], 'id') || fn([{id:1}, {id:1}], 'id')) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Diffing Analogi (Element qidirish)",
      instruction: "Ikki massiv (oldList, newList) berilgan. Har bir elementda 'id' bor. Qaysi id li elementlar olib tashlanganini qaytaruvchi funksiya yozing.",
      startingCode: "function getRemovedItems(oldList, newList) {\n  // id lar bo'yicha olib tashlanganlarini qaytaring\n}",
      hint: "newList dagi barcha id larni yig'ib, oldList dan topilmaganlarini ajrating.",
      solution: "function getRemovedItems(oldList, newList) {\n  const newIds = new Set(newList.map(item => item.id));\n  return oldList.filter(item => !newIds.has(item.id));\n}",
      test: "const fn = new Function(code + '; return getRemovedItems;')(); const res = fn([{id:1}, {id:2}], [{id:2}]); if(res.length !== 1 || res[0].id !== 1) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Automatic Batching Simulyatori",
      instruction: "Bir nechta funksiya chaqiriqlarini bitta tsiklda emas, balki keyingi Event Loop tick (Promise.resolve().then) gacha kutib, oxirida ularning hammasini bittada chaqiruvchi batcher yozing. Parametr sifatida bitta chaqiriladigan callback olasiz, unga barcha yangilanishlar massiv qilib beriladi.",
      startingCode: "function createBatcher(flushCallback) {\n  // funksiya qaytaringki u value olsin va yig'sin\n}",
      hint: "O'zgaruvchida value larni yig'ib borib, setTimeout(..., 0) yordamida flushCallback ga yuboring.",
      solution: "function createBatcher(flushCallback) {\n  let queue = [];\n  let isScheduled = false;\n  return function(value) {\n    queue.push(value);\n    if (!isScheduled) {\n      isScheduled = true;\n      Promise.resolve().then(() => {\n        flushCallback(queue);\n        queue = [];\n        isScheduled = false;\n      });\n    }\n  };\n}",
      test: "const fn = new Function(code + '; return createBatcher;')(); let res = []; const b = fn((q) => res = q); b(1); b(2); b(3); setTimeout(()=>{ if(res.length!==3 || res[2]!==3) throw new Error('Xato'); }, 10);"
    },
    {
      id: 4,
      title: "Re-render Tekshiruvchi",
      instruction: "React.memo yuzaki solishtirish qilib, agar o'zgarmagan bo'lsa render qilmaydi. Ikki obyektni yuzaki tekshirib (true - o'zgargan, false - bir xil) qaytaruvchi funksiya.",
      startingCode: "function shouldRender(prevProps, nextProps) {\n  // o'zgarganini toping\n}",
      hint: "Agar bittagina kalit qiymati boshqacha bo'lsa true, umuman farqi bo'lmasa false qaytarsin.",
      solution: "function shouldRender(prevProps, nextProps) {\n  if (Object.is(prevProps, nextProps)) return false;\n  const keys1 = Object.keys(prevProps);\n  const keys2 = Object.keys(nextProps);\n  if (keys1.length !== keys2.length) return true;\n  for (let key of keys1) {\n    if (prevProps[key] !== nextProps[key]) return true;\n  }\n  return false;\n}",
      test: "const fn = new Function(code + '; return shouldRender;')(); if(fn({a:1}, {a:1}) || !fn({a:1}, {a:2})) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "State Colocation yordamchisi",
      instruction: "Umumiy bitta katta 'state' obyekti bor. Agar biron kalit faqatgina 'allowed' (ruxsat berilganlar) ro'yxatida yo'q bo'lsa, o'sha kalitlarni olib tashlab yangi state qaytaring. Bu state colocation prinsipidek keraksizlarni tozalasin.",
      startingCode: "function colocateState(globalState, allowedKeys) {\n  // globalState dan allowedKeys dagilarni ajratib oling\n}",
      hint: "Obyektni aylanib chiqib, allowedKeys ga moslarini oling.",
      solution: "function colocateState(globalState, allowedKeys) {\n  const newState = {};\n  allowedKeys.forEach(key => {\n    if (key in globalState) newState[key] = globalState[key];\n  });\n  return newState;\n}",
      test: "const fn = new Function(code + '; return colocateState;')(); const r = fn({a:1, b:2, c:3}, ['a']); if(r.b || r.c || r.a !== 1) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Lazy Initialization Analogi",
      instruction: "useState da boshlang'ich qiymat hisoblash og'ir bo'lsa u funksiya sifatida beriladi. Shunga o'xshab, agar parametr funksiya bo'lsa uni ishlating, aks holda o'zini qaytaring.",
      startingCode: "function initializeState(init) {\n  // agar init funksiya bo'lsa typeof orqali topib, ishlating\n}",
      hint: "typeof init === 'function'",
      solution: "function initializeState(init) {\n  return typeof init === 'function' ? init() : init;\n}",
      test: "const fn = new Function(code + '; return initializeState;')(); if(fn(()=>5) !== 5 || fn(10) !== 10) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Event Pooling",
      instruction: "Qadimgi React da voqealar (events) pool orqali ishlatilardi. Obyekt berilganda, u ma'lum vaqtdan so'ng barcha qiymatlarini null ga aylantiradigan pooler yozing.",
      startingCode: "function poolEvent(eventObj) {\n  // eventObj ni setTimeout orqali null qiymatlar bilan to'ldiring\n}",
      hint: "Object.keys orqali for loop yozib qiymatlarni null qiling.",
      solution: "function poolEvent(eventObj) {\n  setTimeout(() => {\n    Object.keys(eventObj).forEach(key => {\n      eventObj[key] = null;\n    });\n  }, 0);\n  return eventObj;\n}",
      test: "const fn = new Function(code + '; return poolEvent;')(); const ev = {type: 'click'}; fn(ev); setTimeout(()=>{ if(ev.type !== null) throw new Error('Tozalanmadi'); }, 10);"
    },
    {
      id: 8,
      title: "Context Splitter",
      instruction: "Bitta obyektda data va funksiyalar aralashib yotibdi. Ularni { state, dispatchers } ikkita alohida obyektga ajratuvchi funksiya yozing.",
      startingCode: "function splitContext(contextValue) {\n  // return { state: {}, dispatchers: {} }\n}",
      hint: "typeof qiymat 'function' bo'lsa dispatchers ga qo'shing.",
      solution: "function splitContext(contextValue) {\n  const res = { state: {}, dispatchers: {} };\n  for (let key in contextValue) {\n    if (typeof contextValue[key] === 'function') {\n      res.dispatchers[key] = contextValue[key];\n    } else {\n      res.state[key] = contextValue[key];\n    }\n  }\n  return res;\n}",
      test: "const fn = new Function(code + '; return splitContext;')(); const res = fn({ val: 1, setVal: ()=>{} }); if(!res.state.val || !res.dispatchers.setVal) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Deep Equality Check",
      instruction: "Faqat bir qatlamli emas, balki chuqur obyektlarni ham solishtiradigan funksiya. Renderdan qutulishning murakkab usuli.",
      startingCode: "function deepEqual(obj1, obj2) {\n  // ...\n}",
      hint: "JSON.stringify ishlatib yoki rekursiya bilan hal qiling.",
      solution: "function deepEqual(obj1, obj2) {\n  if (obj1 === obj2) return true;\n  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false;\n  const keys1 = Object.keys(obj1);\n  const keys2 = Object.keys(obj2);\n  if (keys1.length !== keys2.length) return false;\n  for (let key of keys1) {\n    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;\n  }\n  return true;\n}",
      test: "const fn = new Function(code + '; return deepEqual;')(); if(!fn({a:{b:1}}, {a:{b:1}}) || fn({a:{b:1}}, {a:{b:2}})) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Render Sanagich (Closure)",
      instruction: "Har gal funksiya chaqirilganda necha marta chaqirilganini saqlab boruvchi counter funksiya qaytaring. (Komponent necha marta re-render bo'lganini bilish kabi).",
      startingCode: "function createRenderCounter() {\n  // return funksiya\n}",
      hint: "Ichkarida let count = 0 saqlang.",
      solution: "function createRenderCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  }\n}",
      test: "const fn = new Function(code + '; return createRenderCounter;')()(); fn(); if(fn() !== 2) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Nega ro'yxatlarni (list) render qilganda massivning indeksini (index) 'key' sifatida ishlatish xavfli?",
      options: [
        "Chunki brauzer qotib qoladi",
        "Agar ro'yxatga yangi element qo'shilsa yoki o'chirilsa (tartibi o'zgarsa), React qaysi element o'zgarganini adashtirib qo'yishi va xato ko'rsatishi mumkin",
        "Index ishlatish ruxsat etilmagan va har doim Error beradi",
        "Bu React.memo ni o'chirib qoyadi"
      ],
      correctAnswer: 1,
      explanation: "Tartib o'zgarganda element indekslari ham siljiydi, natijada React elementlarning eskilarini yangisi deb o'ylab xato render qiladi."
    },
    {
      id: 2,
      question: "State Colocation nima anglatadi?",
      options: [
        "Dasturdagi barcha state'larni bitta faylga yig'ish (Redux kabi)",
        "State'ni iloji boricha uni ishlatadigan komponentga yaqinroq joylashtirish (ota komponentda emas)",
        "State'ni faqat useEffect ichida e'lon qilish",
        "LocalStorage ga state larni saqlash"
      ],
      correctAnswer: 1,
      explanation: "Kerakli ma'lumot faqat o'z komponentida yotsa, ota komponent re-render bo'lishidan va butun dastur qayta chizilishidan saqlanamiz."
    },
    {
      id: 3,
      question: "React 18 dagi 'Automatic Batching' funksiyasi qanday ishlaydi?",
      options: [
        "Bir nechta ketma-ket state o'zgarishlarini yig'ib bitta renderda aks ettiradi (hatto setTimeout kabi asinxron joylarda ham)",
        "Komponentlarni avtomatik ravishda zip faylga siqadi",
        "Har bir state o'zgarishi uchun alohida render qiladi",
        "Render vaqtini belgilaydi"
      ],
      correctAnswer: 0,
      explanation: "Avvalgi versiyalarda setTimeout ichidagi 2 ta setState dasturni 2 marta render qilardi, React 18 da bu optimallashtirilib 1 marta render bo'ladi."
    },
    {
      id: 4,
      question: "Context API ishlashida unumdorlik muammosi qachon paydo bo'ladi?",
      options: [
        "Context ishlatsa har doim sekinlashadi",
        "Context'dagi birorta qiymat o'zgarganda, ushbu contextni ishlatayotgan BARCHA komponentlar qayta render bo'ladi",
        "Faqat useContext ishlatilgan qismni o'chirmasa",
        "Context.Provider props lari string bo'lsa"
      ],
      correctAnswer: 1,
      explanation: "Agar Context obyekti ichida bitta tez o'zgaruvchi va bitta sekin o'zgaruvchi maydon bo'lsa, tez o'zgaruvchisi yangilanganda sekinni ishlatuvchilar ham render bo'ladi. Shuning uchun ularni ajratish kerak."
    },
    {
      id: 5,
      question: "useState ga funksiya (lazy initialization) berish qachon samarali?",
      options: [
        "Hech qachon",
        "Boshlang'ich qiymatni hisoblash (masalan looplar) og'ir operatsiya bo'lganda, u faqat birinchi marta ishlaydi",
        "Barcha obyektlarni useState ga kiritish uchun",
        "State har doim yangilanishini ta'minlash uchun"
      ],
      correctAnswer: 1,
      explanation: "useState(() => expensiveCalculation()) tarzida yozilsa, hisoblash faqat initial renderda bir marta amalga oshadi."
    },
    {
      id: 6,
      question: "Komponent re-renderini qaysi hook nazorat qila olmaydi?",
      options: [
        "useMemo",
        "useCallback",
        "useEffect",
        "React.memo"
      ],
      correctAnswer: 2,
      explanation: "useEffect renderdan keyin sodir bo'ladigan nojo'ya ta'sirlarni (side effects) bajaradi, u re-renderni o'z-o'zidan to'xtatmaydi yoki keshlamaydi."
    },
    {
      id: 7,
      question: "React-da bir komponent necha usul bilan re-renderga uchrashi mumkin?",
      options: [
        "1 ta (faqat state)",
        "3 ta (State o'zgarganda, Props o'zgarganda, Ota komponent render bo'lganda)",
        "Istalgan vaqtda avtomatik",
        "Faqat ForceUpdate() chaqirilganda"
      ],
      correctAnswer: 1,
      explanation: "Asosiy sabablar uchta: state o'zgarishi, proplar o'zgarishi, yoki parent (ota) komponent qayta chizilishi tufayli."
    },
    {
      id: 8,
      question: "Key prop'ining asl maqsadi nima?",
      options: [
        "CSS klasslarni biriktirish uchun",
        "React'ga DOMdagi elementlar bilan VDOM dagi elementlarni solishtirishda aniqlik kiritish (Diffing algoritmi uchun)",
        "Elementlarni tartiblash",
        "Ma'lumotlar bazasida saqlash uchun"
      ],
      correctAnswer: 1,
      explanation: "Key'lar yordamida React farqlarni tez topadi va faqat o'zgargan (yangi qo'shilgan) qisminigina yaratadi."
    },
    {
      id: 9,
      question: "Ro'yxat (list) chizayotganda key sifatida uuid ishlatishning nima yomon tarafi bor?",
      options: [
        "UUID ishlamaydi",
        "Agar map() ichida har renderda yangi uuid yasalib berilsa, React ularni har safar yangi element deb o'ylaydi va eskisini o'chirib boshqatdan yaratadi",
        "Faqat ID qabul qilinadi",
        "Xavfsizlik muammosi yaratadi"
      ],
      correctAnswer: 1,
      explanation: "uuid() chaqirig'i har renderda yangi ID beradi. Bu elementning key'si doim o'zgaradi va unumdorlik batamom buziladi. Key'lar ma'lumotning o'zidan kelishi kerak."
    },
    {
      id: 10,
      question: "Qaysi xolatda UseMemo foyda bermaydi?",
      options: [
        "10 ming elementli massivni saralashda",
        "Funksiya juda qisqa (O(1) komplekslikda) va qaytariladigan qiymat primitiv bo'lganda",
        "Bolaga prop uzatishda",
        "Renderlar soni ko'p bo'lganda"
      ],
      correctAnswer: 1,
      explanation: "Oddiy amallar (masalan a+b) uchun useMemo ni ishlatish, uning o'zini keshini boshqarishdan olinadigan foydadan zarari ko'proq bo'lishi mumkin."
    },
    {
      id: 11,
      question: "React.PureComponent vazifasi nima edi?",
      options: [
        "Faqat klass komponentlarda React.memo kabi vazifani bajarardi",
        "Hech narsa",
        "Redux bilan ishlash uchun",
        "Xatolarni topish uchun"
      ],
      correctAnswer: 0,
      explanation: "PureComponent o'zining ichki shouldComponentUpdate metodida state va prop'larni yuzaki solishtiradi."
    },
    {
      id: 12,
      question: "FlushSync() (React-dom/flushSync) nima uchun kerak?",
      options: [
        "Fayllarni tozalash",
        "Automatic Batching ni aylanib o'tib, zudlik bilan (sinxron ravishda) render qilishni talab etish",
        "Redux ni ulash",
        "DOM ni o'chirish"
      ],
      correctAnswer: 1,
      explanation: "Agar render qilinishini keyingi tick'gacha kutish imkoni bo'lmasa (masalan input fokusini tezkor o'qish), flushSync ishlatiladi."
    }
  ]
};
