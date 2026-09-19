export const primitivesVsObjects = {
  id: "primitivesVsObjects",
  title: "Primitivlar va Obyektlar (Memory)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

JavaScript-da o'zgaruvchilar xotirada qanday saqlanishini tushunish juda muhim. Tasavvur qiling: sizda ma'lumotlarni saqlash uchun ikkita usul bor.

**Primitiv turlar (Number, String, Boolean, Null, Undefined, Symbol, BigInt):**
Bular xuddi qog'ozga yozilgan raqamlar yoki matnlarga o'xshaydi. Agar siz do'stingizga varaqdagi raqamdan nusxa ko'chirib bersangiz, unda mutlaqo mustaqil yangi varaq bo'ladi. U o'z varag'idagi raqamni o'zgartirsa, sizning varag'ingizdagi raqam o'zgarmaydi. Ular xotiraning **Stack** (qattiq tartibga ega, tezkor) qismida bevosita o'z qiymati bilan saqlanadi.

**Obyektlar (Object, Array, Function):**
Bular Google Docs hujjatlariga o'xshaydi. Agar siz do'stingizga havolani (linkni) yuborsangiz va u hujjatni o'zgartirsa, siz ochganingizda ham o'sha o'zgargan hujjatni ko'rasiz, chunki sizlarda bitta hujjatga ikkita havola bor xolos. Obyektlarning o'zi xotiraning **Heap** (dinamik, katta hajmga mo'ljallangan) qismida saqlanadi, **Stack**-da esa faqat ularning Heap-dagi manziliga ko'rsatuvchi pointer (havola) turadi.

## 2. 🚀 Deep Dive (Under the Hood, V8 Engine & Performance)

V8 dvigateli primitivlar va obyektlarni boshqarishda yuqori samaradorlik uchun turlicha yondashuvlardan foydalanadi:

- **Stack xotira:** O'lchami oldindan ma'lum, tez ajratiladi va funksiya ishi tugashi bilan avtomatik tozalanadi (LIFO prinsipi). Primitivlar doim Stack-da turadi. Ularni nusxalash juda tez ishlaydi, chunki faqat baytlar nusxalanadi.
- **Heap xotira:** O'lchami dinamik o'zgarishi mumkin bo'lgan ma'lumotlar uchun ishlatiladi. Obyekt yaratilganda V8 Heap-dan joy ajratadi va Stack-dagi o'zgaruvchiga o'sha joyning manzili (pointer) yoziladi.
- **Garbage Collection (GC):** Heap xotirani tozalash uchun V8 dvigatelida *Mark-and-Sweep* algoritmi ishlaydi. Agar obyektga hech qanday havola (pointer) qolmasa (masalan, funksiya tugab, Stack-dagi havola o'chib ketsa), GC uni xotiradan o'chiradi.

**Performance (Samaradorlik) qoidalari:**
- Yirik obyektlarni mutatsiya qilmasdan doim chuqur nusxalash (Deep Copy) xotira (Heap) hajmini oshirib, Garbage Collector ishlashiga (va dastur qotishiga - *jank*) olib kelishi mumkin.
- Shuning uchun ko'pincha *Shallow Copy* (yuzaki nusxa) ishlatiladi, biroq ichki obyektlar hamon pointer bo'lib qolishidan ehtiyot bo'lish kerak.

## 3. ⚠️ Edge Cases & Senior Interview Questions

**Edge Case 1: \\\`typeof null\\\`**
\\\`\\\`\\\`javascript
console.log(typeof null); // "object"
\\\`\\\`\\\`
Bu JavaScript-dagi tarixiy xato (bug). \\\`null\\\` aslida primitiv tipdir.

**Edge Case 2: Obyektlarni taqqoslash**
\\\`\\\`\\\`javascript
console.log({} === {}); // false
console.log([] === []); // false
\\\`\\\`\\\`
Ikkita o'xshash obyekt xotirada ikki xil manzilda yotadi. \\\`===\\\` ularning manzilini tekshiradi, tarkibini emas.

**Edge Case 3: Obyekt primitivga aylanishi (Type Coercion)**
\\\`\\\`\\\`javascript
const obj = {
  valueOf() { return 10; },
  toString() { return "hello"; }
};
console.log(obj + 5); // 15 (valueOf ishladi)
console.log(String(obj)); // "hello" (toString ishladi)
\\\`\\\`\\\`

**Senior Interview Savollari:**
1. **Pass-by-value va Pass-by-reference orasida qanday farq bor, JS qaysi birini ishlatadi?**
   - Javob: JS har doim *Pass-by-value* ishlatadi. Lekin obyekt uzatilganda, o'sha "value" (qiymat) obyektning Heap-dagi pointerni o'zi bo'ladi (Buni ko'pincha *Call-by-sharing* deyishadi). Pointer orqali ichki qismlarni o'zgartirish mumkin, lekin butunlay boshqa obyektga o'zgartirib bo'lmaydi (reassignment originalga ta'sir qilmaydi).
2. **Qanday qilib mukammal Deep Copy qilish mumkin?**
   - Javob: Eski usul \\\`JSON.parse(JSON.stringify(obj))\\\` (bunda Date, Function, undefined kabi tiplar yo'qoladi). Yangi va standart usul: \\\`structuredClone(obj)\\\`.
3. **\\\`Object.freeze()\\\` ning kamchiligi nima?**
   - Javob: U faqat yuzaki (Shallow) muzlatadi. Agar obyekt ichida yana obyekt bo'lsa, u ichki obyekt o'zgarishi mumkin. Buni oldini olish uchun "Deep Freeze" funksiyasi yozilishi kerak.

## 4. 📊 Xotira Arxitekturasi Diagrammasi

\\\`\\\`\\\`mermaid
flowchart TD
    A[JavaScript Memory] --> B[Stack Memory]
    A --> C[Heap Memory]
    
    B --> D[let x = 10]
    B --> E[let y = x]
    B --> F[const user = pointer_A102]
    B --> G[const clone = pointer_A102]
    
    C --> H[#A102 Object name: Ali]
    
    F -.-> H
    G -.-> H
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bfb,stroke:#333,stroke-width:2px
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Havolani mutatsiya qilmasdan yangilash",
      instruction: "Berilgan `user` obyektini o'zgartirmasdan, uning `score` xususiyatini yangi `newScore` qiymatiga o'zgartirib, yangi obyektni qaytaruvchi `updateScore(user, newScore)` funksiyasini yozing.",
      startingCode: "function updateScore(user, newScore) {\n  // Kodni yozing\n}",
      hint: "Spread operator `{ ...user, score: newScore }` yordamida yuzaki nusxa olib qaytaring.",
      test: "const fn = new Function(code + '; return updateScore;')(); const original = { name: 'Anvar', score: 50 }; const updated = fn(original, 100); if (original.score !== 50 || updated === original || updated.score !== 100) throw new Error('Xato');"
    },
    {
      id: 2,
      title: "Chuqur nusxalash (Deep Clone)",
      instruction: "Ichma-ich tuzilishga ega `user` obyektini xavfsiz chuqur nusxalab qaytaruvchi `deepCloneUser(user)` yozing.",
      startingCode: "function deepCloneUser(user) {\n  // Kodni yozing\n}",
      hint: "`structuredClone(user)` yoki `JSON.parse(JSON.stringify(user))` ishlating.",
      test: "const fn = new Function(code + '; return deepCloneUser;')(); const original = { a: { b: 1 } }; const cloned = fn(original); cloned.a.b = 2; if (original.a.b !== 1 || cloned === original) throw new Error('Xato');"
    },
    {
      id: 3,
      title: "Obyektlarni qiymatlari bo'yicha solishtirish",
      instruction: "Ikkita obyektni birinchi darajali xususiyatlari va ularning qiymatlari bo'yicha solishtiruvchi `areEqual(obj1, obj2)` funksiyasini yozing.",
      startingCode: "function areEqual(obj1, obj2) {\n  // Kodni yozing\n}",
      hint: "Object.keys() orqali kalitlar soni va qiymatlarini solishtiring.",
      test: "const fn = new Function(code + '; return areEqual;')(); if (!fn({a:1}, {a:1}) || fn({a:1}, {b:1})) throw new Error('Xato');"
    },
    {
      id: 4,
      title: "Primitivlarni taqqoslash",
      instruction: "Ikkita parametr qabul qilib, ular qat'iy teng bo'lsa true qaytaruvchi `comparePrimitives(a, b)` yozing.",
      startingCode: "function comparePrimitives(a, b) {\n  // Kodni yozing\n}",
      hint: "a === b ishlating.",
      test: "const fn = new Function(code + '; return comparePrimitives;')(); if (!fn('5', '5') || fn('5', 5)) throw new Error('Xato');"
    },
    {
      id: 5,
      title: "Massivlarni xavfsiz nusxalash",
      instruction: "Berilgan massiv (Array) dan yuzaki nusxa (clone) olib qaytaradigan `cloneArray(arr)` yozing.",
      startingCode: "function cloneArray(arr) {\n  // Kodni yozing\n}",
      hint: "[...arr] operatoridan foydalaning.",
      test: "const fn = new Function(code + '; return cloneArray;')(); const original = [1, 2]; const cloned = fn(original); if (original === cloned || cloned[0] !== 1) throw new Error('Xato');"
    },
    {
      id: 6,
      title: "Object.assign bilan nusxa",
      instruction: "Object.assign yordamida obyektning yangi nusxasini qaytaruvchi `cloneWithAssign(obj)` yozing.",
      startingCode: "function cloneWithAssign(obj) {\n  // Kodni yozing\n}",
      hint: "Object.assign({}, obj) orqali hal qiling.",
      test: "const fn = new Function(code + '; return cloneWithAssign;')(); const obj = {x: 10}; const copy = fn(obj); if (copy === obj || copy.x !== 10) throw new Error('Xato');"
    },
    {
      id: 7,
      title: "Typeof operatori bilan tekshirish",
      instruction: "Agar argument 'string' tipidagi primitiv bo'lsa true, boshqa holatda false qaytaruvchi `isString(val)` yozing.",
      startingCode: "function isString(val) {\n  // Kodni yozing\n}",
      hint: "typeof val === 'string'",
      test: "const fn = new Function(code + '; return isString;')(); if (!fn('salom') || fn(123)) throw new Error('Xato');"
    },
    {
      id: 8,
      title: "Reference turi mutatsiyasi",
      instruction: "Ikkita parametr x va y (obyektlar). Ularning xotira manzili bir xil bo'lsa true qaytaruvchi `isSameReference(x, y)` yozing.",
      startingCode: "function isSameReference(x, y) {\n  // Kodni yozing\n}",
      hint: "x === y manzillarni taqqoslaydi.",
      test: "const fn = new Function(code + '; return isSameReference;')(); const o = {}; if (!fn(o, o) || fn({}, {})) throw new Error('Xato');"
    },
    {
      id: 9,
      title: "Object.freeze tekshiruvi",
      instruction: "Obyektni qabul qilib, u Object.freeze orqali muzlatilgan bo'lsa true, aks holda false qaytaruvchi `isFrozenObject(obj)` yozing.",
      startingCode: "function isFrozenObject(obj) {\n  // Kodni yozing\n}",
      hint: "Object.isFrozen(obj)",
      test: "const fn = new Function(code + '; return isFrozenObject;')(); const obj1 = Object.freeze({}); const obj2 = {}; if (!fn(obj1) || fn(obj2)) throw new Error('Xato');"
    },
    {
      id: 10,
      title: "Massivda Object mutatsiyasi",
      instruction: "Ichida obyektlar bor massivdan yuzaki nusxa olinganda (masalan `newArr = [...arr]`), obyekt o'zgarishi (newArr[0].x = 5) originalga ham ta'sir qiladimi? Shuni isbotlash uchun doim true qaytaruvchi `doesShallowCopyMutateInnerObjects()` yozing.",
      startingCode: "function doesShallowCopyMutateInnerObjects() {\n  // Kodni yozing\n}",
      hint: "Ha ta'sir qiladi, shunchaki return true; yozing.",
      test: "const fn = new Function(code + '; return doesShallowCopyMutateInnerObjects;')(); if(fn() !== true) throw new Error('Xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da qaysi ma'lumotlar turi primitiv hisoblanadi?",
      options: [
        "Object",
        "Function",
        "String",
        "Array"
      ],
      correctAnswer: 2,
      explanation: "String JavaScript-dagi primitiv ma'lumot turlaridan biridir."
    },
    {
      id: 2,
      question: "Primitiv qiymatlar xotiraning qaysi qismida saqlanadi?",
      options: [
        "Stack xotirada",
        "Heap xotirada",
        "Faqat diskda",
        "Web API-larda"
      ],
      correctAnswer: 0,
      explanation: "Primitiv qiymatlar tezkor va qat'iy tartibli Stack xotirasida bevosita saqlanadi."
    },
    {
      id: 3,
      question: "Obyektlar kabi murakkab ma'lumotlar qanday saqlanadi?",
      options: [
        "Heap-da saqlanadi, Stack-da pointer (havola) turadi",
        "Stack-da saqlanadi, Heap-da pointer turadi",
        "Faqat Stack-da",
        "Hech qayerda"
      ],
      correctAnswer: 0,
      explanation: "Dinamik o'lchamli obyektlar Heap xotirada, uning manzili Stack-da saqlanadi."
    },
    {
      id: 4,
      question: "let a = 5; let b = a; b = 10; a ning qiymati nima bo'ladi?",
      options: [
        "10",
        "5",
        "undefined",
        "Error"
      ],
      correctAnswer: 1,
      explanation: "a primitiv son bo'lganligi sababli b ga faqat qiymat nusxalandi, ular bir-biriga bog'liq emas."
    },
    {
      id: 5,
      question: "Quyidagi natija qanday bo'ladi: const user1={name:'Ali'}; const user2=user1; user2.name='Vali'; console.log(user1.name);",
      options: [
        "'Ali'",
        "'Vali'",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Obyektlar havola (reference) bo'yicha nusxalanadi, shuning uchun birini o'zgartirish ikkinchisiga ta'sir qiladi."
    },
    {
      id: 6,
      question: "console.log({} === {}); nima qaytaradi?",
      options: [
        "true",
        "false",
        "undefined",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "Ikki obyekt === orqali solishtirilganda xotiradagi manzili tekshiriladi, bu erda 2ta yangi manzilli obyektlar yaratilgan."
    },
    {
      id: 7,
      question: "const bilan e'lon qilingan obyektda qaysi amalni bajarib bo'lmaydi?",
      options: [
        "Ichidagi xususiyatni o'zgartirish",
        "Yangi xususiyat qo'shish",
        "Obyektga butunlay yangi obyekt yuklash (Reassignment)",
        "Xususiyatni o'chirish"
      ],
      correctAnswer: 2,
      explanation: "const o'zgaruvchisi o'z manzilini o'zgartira olmaydi, shuning uchun unga boshqa obyektni ta'minlab bo'lmaydi."
    },
    {
      id: 8,
      question: "Obyektning faqat birinchi darajali xossalarini yangi manzilga nusxalash nima deyiladi?",
      options: [
        "Deep Copy",
        "Shallow Copy (Yuzaki nusxa)",
        "Reference Copy",
        "Mutloq nusxa"
      ],
      correctAnswer: 1,
      explanation: "Faqat tashqi darajadagi xossalarni nusxalash Shallow Copy deyiladi."
    },
    {
      id: 9,
      question: "Obyektni chuqur nusxalash (Deep Copy) uchun JavaScript-ning zamonaviy o'rnatilgan funksiyasi qaysi?",
      options: [
        "Object.assign()",
        "Spread operator (...)",
        "structuredClone()",
        "Object.create()"
      ],
      correctAnswer: 2,
      explanation: "structuredClone() obyektlarni chuqur nusxalashni xavfsiz va samarali bajaradi."
    },
    {
      id: 10,
      question: "Parametr sifatida obyekt uzatilganda va uning ichki xususiyati funksiya ichida o'zgartirilganda originalga ta'sir qiladimi?",
      options: [
        "Yo'q",
        "Ha, ta'sir qiladi",
        "Faqat array bo'lsa",
        "Faqat strict mode da"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da obyekt uzatilganda uning Heap-dagi manziliga havola beriladi. Ichki mutatsiyalar original obyektda ham namoyon bo'ladi."
    },
    {
      id: 11,
      question: "Obyektni mutatsiyadan to'liq saqlash (shallow) uchun nima ishlatiladi?",
      options: [
        "Object.freeze()",
        "Object.seal()",
        "Object.preventExtensions()",
        "Object.lock()"
      ],
      correctAnswer: 0,
      explanation: "Object.freeze() obyektga har qanday yangi xususiyat qo'shish, o'chirish yoki o'zgartirishni man etadi (Shallow darajada)."
    },
    {
      id: 12,
      question: "Heap xotiradagi keraksiz obyektlar (hech kim foydalanmayotgan) qanday tozalanadi?",
      options: [
        "Stack to'lishi bilan avtomatik",
        "Garbage Collector (Axlat yig'uvchi) tomonidan",
        "free() funksiyasi chaqirilganda",
        "Brauzer yopilguncha xotirada qolaveradi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da Garbage Collector avtomatik tarzda ishlaydi va aloqasi uzilgan (unreachable) obyektlarni xotiradan tozalaydi."
    }
  ]
};