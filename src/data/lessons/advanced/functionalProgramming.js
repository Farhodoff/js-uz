export const functionalProgramming = {
  id: "a14",
  title: "Functional Programming (Funksional dasturlash)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

Funksional dasturlash (FP) — bu kodni matematik funksiyalar to'plami va ma'lumotlar oqimi sifatida yozish uslubidir. Ushbu yondashuv o'zgaruvchan holatlardan (mutable state) va yashirin nojo'ya ta'sirlardan (side effects) qochish orqali xatolarni kamaytirish, kodni osonroq test qilish, o'qiluvchanlikni oshirish va parallel bajarilishga tayyorlash uchun xizmat qiladi. React, Redux va zamonaviy JS arxitekturalari aynan shu tamoyillar asosida qurilgan.

Buni **hujjat nusxalari bilan ishlash**ga o'xshatish mumkin:
- **Imperativ dasturlash:** Asl shartnoma matnini to'g'ridan-to'g'ri o'chirib-yozib o'zgartirish (original ma'lumotni mutatsiya qilish). Agar xatoga yo'l qo'ysangiz, asl hujjat yo'qoladi.
- **Funksional dasturlash:** Asl shartnomaning nusxasini olasiz, o'zgarishlarni yeni varoqqa yozasiz. Asl shartnoma har doim toza va o'zgarishsiz qoladi (Immutability).

---

## 2. 💻 Real Kod Misollari

Mavzuga oid amaliy kod misollari.

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### A. Pure Functions (Sof funksiyalar) va Side Effects
Sof funksiyaning ikki muhim sharti bor:
1. **Determinizm:** Bir xil kirish qiymatlari (arguments) uchun har doim bir xil natija qaytaradi.
2. **Side Effect yo'qligi:** Funksiyadan tashqaridagi hech qanday holatni (global o'zgaruvchi, DOM, tarmoq so'rovlari, console.log) o'zgartirmaydi yoki ularga tayanmaydi.

Sof funksiyalar **Referensial shaffoflikka (Referential Transparency)** ega. Bu degani, dastur ichida funksiya chaqirig'ini uning qaytaradigan qiymati bilan almashtirib qo'yganimizda ham dasturning umumiy xulq-atvori mutqalo o'zgarmasdan qoladi.

### B. Immutability (O'zgarmaslik) va Structural Sharing
Ma'lumotlar o'zgartirilmaydi, balki har doim yangi nusxa yaratiladi. Bu xotirani to'ldirib yubormasligi uchun JS dvigatellari **Strukturali ulashish (Structural Sharing)** texnikasidan foydalanadi. Ya'ni, yangi obyekt/massiv yaratilganda o'zgarmagan qismlar xotiradagi eski manzillarga ishora qilishda davom etadi.

### C. Function Currying va Partial Application
- **Currying:** Ko'p parametrli funksiyani (\`f(a, b, c)\`) navbatma-navbat bittadan parametr qabul qiluvchi funksiyalar zanjiriga (\`f(a)(b)(c)\`) aylantirish.
- **Partial Application:** Funksiyaning ba'zi argumentlarini oldindan bog'lab (masalan, \`bind\` orqali), kamroq parametr oladigan yangi funksiya hosil qilish.

### D. Function Composition (Funksiyalar kompozitsiyasi)
Kichik funksiyalarni birlashtirib, murakkab funksiyalar hosil qilish uslubi. Ikki xil yo'nalish mavjud:
- **compose:** Funksiyalarni o'ngdan chapga bajaradi (\`f(g(x))\`).
- **pipe:** Funksiyalarni chapdan o'ngga bajaradi (\`g(f(x))\`).

\`\`\`mermaid
graph LR
    Input([Input: x]) -->|pipe: chapdan o'ngga| PipeA[fn1]
    PipeA --> PipeB[fn2]
    PipeB --> PipeC[fn3]
    PipeC --> Output1([Output: fn3 fn2 fn1 x])

    Input2([Input: x]) -->|compose: o'ngdan chapga| CompC[fn3]
    CompC --> CompB[fn2]
    CompB --> CompA[fn1]
    CompA --> Output2([Output: fn1 fn2 fn3 x])

    style PipeA fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff
    style PipeB fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff
    style PipeC fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff
    style CompA fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff
    style CompB fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff
    style CompC fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff
\`\`\`

### E. Monadlar va Funktorlar (Maybe Monad)
- **Functor:** Qiymatni o'zida saqlaydigan va u ustida \`map\` amalini bajarishga imkon beruvchi obyekt (masalan, massivlar va Promiselar).
- **Monad:** Funktordan tashqari, qiymatlarni ochish va zanjirlash uchun \`flatMap\` (yoki \`bind\`, \`chain\`) metodiga ega tuzilma.
- **Maybe Monad:** \`null\` yoki \`undefined\` xavfi bor o'zgaruvchilar ustida zanjirli amallarni xavfsiz va \`TypeError\` xatalarisiz bajarish uchun xizmat qiladi. Agarda oqimda biror qiymat bo'sh bo'lib qolsa, Maybe keyingi barcha amallarni o'tkazib yuboradi (Nothing holati).

\`\`\`mermaid
graph TD
    Start([Boshlang'ich Qiymat]) --> Wrap[Maybe.of value]
    Wrap --> Map1{Qiymat bormi?}
    Map1 -->|Ha| Just1[Map amali: .map fn1]
    Map1 -->|Yo'q/Null| Nothing1[Nothing: Amallarni to'xtatish]
    Just1 --> Map2{Yangi qiymat bormi?}
    Map2 -->|Ha| Just2[Map amali: .map fn2]
    Map2 -->|Yo'q/Null| Nothing2[Nothing: Keyingi amallarni o'tkazib yuborish]
    Just2 --> End[Yakuniy Natija: .getOrElse default]
    Nothing1 --> End
    Nothing2 --> End

    style Wrap fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff
    style Just1 fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff
    style Just2 fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:#fff
    style Nothing1 fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff
    style Nothing2 fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:#fff
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

- **Asl ma'lumotlarni mutatsiya qilish:** O'zgarmaslikni buzib, massivga \`push\` yoki \`splice\` kabi metodlarni qo'llash. Buning o'rniga \`spread (...)\` yoki \`concat\` ishlatish lozim.
- **Tashqi holatga (state) tayanuvchi funksiyalar yozish:** Funksiya ichida global o'zgaruvchilarni yoki tashqi obektlarni o'qish/o'zgartirish.
- **Metodlar zanjirida sof bo'lmagan metodlarni qo'llash:** Masalan, \`reverse()\` yoki \`sort()\` massivning aslini o'zgartirib yuboradi.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Pure function nima?**
Faqat kirish parametrlariga bog'liq bo'lgan va hech qanday tashqi holatni o'zgartirmaydigan funksiya.

**2. Immutability nima uchun kerak?**
Kodning xatti-harakatini prognoz qilinadigan (predictable) qilish va xotiradagi yashirin xatolarni kamaytirish uchun.

**3. Side effect nima?**
Funksiyaning o'z tanasidan tashqaridagi holatlarga ta'sir ko'rsatishi (masalan, tarmoq so'rovi, konsol log, fayl o'qish yoki global o'zgaruvchini o'zgartirish).

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Data Processing Pipeline
Loyihadagi foydalanuvchi ma'lumotlarini toza funksiyalar yordamida tozalash va saralash:
\`\`\`javascript
const trimName = user => ({ ...user, name: user.name.trim() });
const filterActive = users => users.filter(u => u.isActive);
const processUsers = pipe(filterActive, users => users.map(trimName));
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph LR
    Input([Input: x]) -->|pipe: chapdan o'ngga| PipeA[fn1]
    PipeA --> PipeB[fn2]
    PipeB --> PipeC[fn3]
    PipeC --> Output1([Output: fn3 fn2 fn1 x])
\`\`\`

---

## 10. 📌 Cheat Sheet

| Konsept | Tushunish | Misol |
| :--- | :--- | :--- |
| **Pure Function** | Side-effect-siz, bir xil kirishga bir xil chiqish | \`const add = (a, b) => a + b;\` |
| **Immutability** | Qiymatlarni o'zgartirmasdan nusxa olish | \`const clone = { ...obj };\` |
| **Currying** | f(a,b) ni f(a)(b) ko'rinishga keltirish | \`const curried = a => b => a + b;\` |
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Sof funksiya yozish",
      instruction: "Berilgan sonning kvadratini qaytaruvchi 'pure' funksiya yozing.",
      startingCode: "function square(n) {\n  // Bu yerga yozing\n}\n",
      hint: "Faqat return n * n; ishlating.",
      test: "if (square(5) === 25) return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "2️⃣ Immutability",
      instruction: "Original massivni o'zgartirmasdan yangi element qo'shing.",
      startingCode: "const original = [1, 2, 3];\n// Bu yerga yangi massiv yarating\n",
      hint: "const updated = [...original, 4];",
      test: "if (code.includes('...') || code.includes('concat')) return null; return 'Immutability xato';"
    },
    {
      id: 3,
      title: "3️⃣ map() bilan transform",
      instruction: "Massivdagi sonlarni kvadratga aylantiring.",
      startingCode: "const nums = [1, 2, 3];\n// map orqali square qiling\n",
      hint: "const squared = nums.map(n => n * n);",
      test: "if (code.includes('.map')) return null; return 'map yoq';"
    },
    {
      id: 4,
      title: "4️⃣ filter() bilan saralash",
      instruction: "Faqat juft sonlarni qoldiring.",
      startingCode: "const nums = [1, 2, 3, 4];\n// Bu yerga filter\n",
      hint: "const evens = nums.filter(n => n % 2 === 0);",
      test: "if (code.includes('.filter')) return null; return 'filter yoq';"
    },
    {
      id: 5,
      title: "5️⃣ reduce() bilan yig'indi",
      instruction: "Massiv yig'indisini reduce bilan toping.",
      startingCode: "const nums = [1, 2, 3];\n// Bu yerga reduce\n",
      hint: "const sum = nums.reduce((acc, n) => acc + n, 0);",
      test: "if (code.includes('.reduce')) return null; return 'reduce yoq';"
    },
    {
      id: 6,
      title: "6️⃣ Higher-order function",
      instruction: "Funksiyani 2 marta qo'llaydigan applyTwice yozing.",
      startingCode: "function applyTwice(fn, value) {\n  // Bu yerga yozing\n}\n",
      hint: "return fn(fn(value));",
      test: "if (code.includes('fn(')) return null; return 'HOF xato';"
    },
    {
      id: 7,
      title: "7️⃣ Compose",
      instruction: "Compose funksiyasini yozing (o'ngdan chapga).",
      startingCode: "const compose = (...fns) => {\n  // Bu yerga yozing\n};\n",
      hint: "return x => fns.reduceRight((acc, fn) => fn(acc), x);",
      test: "if (code.includes('reduceRight')) return null; return 'Compose xato';"
    },
    {
      id: 8,
      title: "8️⃣ Pipe",
      instruction: "Pipe funksiyasini yozing (chapdan o'ngga).",
      startingCode: "const pipe = (...fns) => {\n  // Bu yerga yozing\n};\n",
      hint: "return x => fns.reduce((acc, fn) => fn(acc), x);",
      test: "if (code.includes('reduce(')) return null; return 'Pipe xato';"
    },
    {
      id: 9,
      title: "9️⃣ Currying",
      instruction: "add funksiyasini currying ko'rinishida yozing.",
      startingCode: "const add = (a) => {\n  // Bu yerga yozing\n};\n",
      hint: "return (b) => a + b;",
      test: "if (code.includes('=>')) return null; return 'Currying xato';"
    },
    {
      id: 10,
      title: "1️⃣0️⃣ Partial application",
      instruction: "greet funksiyasidan sayHello'ni partial qiling.",
      startingCode: "function greet(greeting, name) { return greeting + ', ' + name; }\n// Bu yerga sayHello\n",
      hint: "const sayHello = greet.bind(null, 'Salom');",
      test: "if (code.includes('.bind')) return null; return 'Partial xato';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Memoization",
      instruction: "Natijani kesh qiluvchi memoize yozing.",
      startingCode: "function memoize(fn) {\n  const cache = {};\n  // Bu yerga yozing\n}\n",
      hint: "return (...args) => { const key = JSON.stringify(args); if (key in cache) return cache[key]; return cache[key] = fn(...args); };",
      test: "if (code.includes('cache')) return null; return 'Memoize xato';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Kompleks: Pipeline",
      instruction: "map + filter + reduce bilan pipeline yarating.",
      startingCode: "const nums = [1, 2, 3, 4, 5];\n// 1) juftlarni qoldiring\n// 2) 2 ga ko'paytiring\n// 3) yig'indini toping\n",
      hint: "nums.filter(...).map(...).reduce(...);",
      test: "if (code.includes('.filter') && code.includes('.map') && code.includes('.reduce')) return null; return 'Pipeline xato';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Umumiy Currying wrapper (curry)",
      instruction: "Berilgan ko'p argumentli `fn` funksiyasini currying ko'rinishiga o'tkazuvchi `curry(fn)` funksiyasini yozing. Chaqirilganda argumentlar soni yetarli bo'lsa (`fn.length` ga teng yoki katta bo'lsa) asl funksiyani chaqirib natijani qaytarsin, aks holda qolgan argumentlarni kutuvchi yangi funksiya qaytarsin.",
      startingCode: "function curry(fn) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return function curried(...args) {\n  if (args.length >= fn.length) {\n    return fn.apply(this, args);\n  }\n  return function(...args2) {\n    return curried.apply(this, args.concat(args2));\n  };\n};",
      test: "if (typeof curry !== 'function') return 'curry funksiya emas';\nconst add = (a, b, c) => a + b + c;\nconst curriedAdd = curry(add);\nif (typeof curriedAdd(1) !== 'function') return 'Bitta argument uzatilganda funksiya qaytmadi';\nif (typeof curriedAdd(1)(2) !== 'function') return 'Ikkita argument uzatilganda funksiya qaytmadi';\nif (curriedAdd(1)(2)(3) !== 6) return 'Hisoblash noto\\'g\\'ri';\nreturn null;"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Funksiyalarni birlashtirish (composeFns)",
      instruction: "Bir nechta funksiyalarni o'ngdan chapga qarab zanjir ko'rinishida birlashtirib (Function Composition) bitta yakuniy funksiya qaytaruvchi `composeFns(...fns)` funksiyasini yozing. Masalan, `composeFns(f, g)(x)` ifodasi `f(g(x))` ko'rinishida ishlashi shart. O'ngdan chapga yurish uchun `reduceRight` metodidan foydalaning.",
      startingCode: "function composeFns(...fns) {\n  // Kodni shu yerdan yozing\n}",
      hint: "return function(x) {\n  return fns.reduceRight((acc, fn) => fn(acc), x);\n};",
      test: "if (typeof composeFns !== 'function') return 'composeFns funksiya emas';\nconst double = x => x * 2;\nconst addFive = x => x + 5;\nconst composed = composeFns(double, addFive);\nif (composed(10) !== 30) return 'O\\'ngdan chapga kompozitsiya to\\'g\\'ri ishlamadi';\nif (!code.includes('reduceRight')) return 'reduceRight-dan foydalaning';\nreturn null;"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Functional Programming (FP) ning asosiy ustunlaridan biri nima?",
    "options": [
      "Ob'ektlar va vorislikni keng qo'llash (Inheritance)",
      "O'zgaruvchan holatlardan (mutable state) va yon ta'sirlardan (side-effects) qochish",
      "Barcha o'zgaruvchilarni global qilish",
      "Faqat Class constructorlardan foydalanish"
    ],
    "correctAnswer": 1,
    "explanation": "Functional Programming (Funktsional Dasturlash) ning asosiy g'oyasi yon ta'sirlardan qochish, pure funksiyalar yozish va holatni o'zgartirmaslik (immutability) hisoblanadi."
  },
  {
    "id": 2,
    "question": "\"Pure Function\" (Toza funksiya) nima?",
    "options": [
      "Faqat bitta qator koddan iborat funksiya",
      "Bir xil kirish parametrlari uchun har doim bir xil natija qaytaradigan va hech qanday yon ta'siri (side-effects) bo'lmagan funksiya",
      "Faqat sonlar ustida ishlaydigan funksiya",
      "Hech qanday argument qabul qilmaydigan funksiya"
    ],
    "correctAnswer": 1,
    "explanation": "Pure funksiya tashqi muhitga ta'sir qilmaydi (side effect yo'q) va har doim bir xil argumentlarga bir xil natijani qaytaradi (deterministik)."
  },
  {
    "id": 3,
    "question": "\"Immutability\" (O'zgarmaslik) nima degani?",
    "options": [
      "Ma'lumotlar o'zgartirilganda uning ustiga yozilishi",
      "Mavjud ma'lumot tuzilmasini to'g'ridan-to'g'ri o'zgartirmasdan, har doim yangi nusxa yaratish va o'shani qaytarish",
      "Funksiyalarni o'zgartirish taqiqlanganligi",
      "Faol xotiraning (RAM) o'zgarmasligi"
    ],
    "correctAnswer": 1,
    "explanation": "Immutability printsipiga ko'ra, mavjud ob'ekt yoki massivlarni to'g'ridan-to'g'ri o'zgartirmaymiz (mutation yo'q), balki yangi nusxa yaratib ishlaymiz (masalan, spread operator yoki `.map()` yordamida)."
  },
  {
    "id": 4,
    "question": "\"Currying\" nima?",
    "options": [
      "Funksiyaga har doim massiv uzatish usuli",
      "Bir nechta argument qabul qiladigan funksiyani navbatma-navbat bittadan argument qabul qiladigan funksiyalar zanjiriga aylantirish",
      "Funksiya bajarilishini ma'lum vaqtga kechiktirish",
      "Xatolarni avtomatik o'tkazib yuboradigan funksiya"
    ],
    "correctAnswer": 1,
    "explanation": "Currying `f(a, b, c)` ko'rinishidagi funksiyani `f(a)(b)(c)` ko'rinishida chaqirish imkonini beradi. Har bir funksiya bitta argument olib, navbatdagi funksiyani qaytaradi."
  },
  {
    "id": 5,
    "question": "\"Function Composition\" (Funksiyalar kompozitsiyasi) nima?",
    "options": [
      "Bir funksiyani boshqa bir nechta funksiyalar yordamida yozish",
      "Bir funksiyaning chiqish natijasini (output) boshqa funksiyaning kirish parametri (input) sifatida zanjir ko'rinishida ulash",
      "Funksiyalarni matn sifatida jamlash",
      "Funksiyalar ichida class'lar yaratish"
    ],
    "correctAnswer": 1,
    "explanation": "Kompozitsiya funksiyalarni birlashtirish usuli bo'lib, uning yordamida `f(g(x))` kabi zanjirli ishlarni soddalashtirish uchun `compose(f, g)(x)` ko'rinishiga keltiriladi."
  },
  {
    "id": 6,
    "question": "JavaScriptda Funksiyalar zanjirini chapdan o'ngga qarab bajaradigan funksiya nima deb ataladi?",
    "options": [
      "`compose`",
      "`pipe`",
      "`map`",
      "`reducer`"
    ],
    "correctAnswer": 1,
    "explanation": "`pipe` funksiyasi argumentlarni chapdan o'ngga qarab bajaradi, ya'ni birinchi funksiyaning natijasini ikkinchisiga uzatadi. `compose` esa o'ngdan chapga ishlaydi."
  },
  {
    "id": 7,
    "question": "`compose` va `pipe` funksiyalari o'rtasidagi asosiy farq nimada?",
    "options": [
      "`compose` sinxron, `pipe` esa asinxron ishlaydi",
      "`compose` o'ngdan chapga (right-to-left), `pipe` esa chapdan o'ngga (left-to-right) funksiyalarni bajaradi",
      "`pipe` ko'proq xotira sarflaydi",
      "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Matematik kompozitsiya an'anaga ko'ra o'ngdan chapga hisoblanadi (f o g)(x) = f(g(x)), shuning uchun `compose` funksiyalar ro'yxatini o'ngdan chapga chaqiradi. Dasturchilarga qulay bo'lishi uchun esa `pipe` chapdan o'ngga bajaradi."
  },
  {
    "id": 8,
    "question": "Qimmat hisob-kitoblarga ega funksiya natijasini kiritilgan argumentlar kaliti bo'yicha keshlab, keyingi chaqiriqlarda qayta hisoblamaslik texnikasi nima deb ataladi?",
    "options": [
      "Currying",
      "Memoization",
      "Partial Application",
      "Recursion"
    ],
    "correctAnswer": 1,
    "explanation": "Memoization (keshlash) — bu pure funksiyalar natijasini tezlashtirish uchun foydalaniladigan optimal texnika bo'lib, argumentlar bo'yicha javobni keshda saqlaydi va bir xil argumentlar kelganda darhol javobni qaytaradi."
  },
  {
    "id": 9,
    "question": "Quyidagilardan qaysi biri yon ta'sirga (side effect) yorqin misol bo'la oladi?",
    "options": [
      "Global o'zgaruvchini funksiya ichida o'zgartirish",
      "Konsolga ma'lumot chiqarish (console.log)",
      "API orqali tarmoq so'rovi yuborish",
      "Barcha javoblar to'g'ri"
    ],
    "correctAnswer": 3,
    "explanation": "Funksiyaning o'zidan tashqaridagi muhitni har qanday tarzda o'zgartirishi yoki unga murojaat qilishi (I/O, console, network, global variable modification) side-effect hisoblanadi."
  },
  {
    "id": 10,
    "question": "JavaScriptda funksiyalar 'First-Class Citizens' (Birinchi darajali fuqarolar) deyilganda nima tushuniladi?",
    "options": [
      "Funksiyalar har doim birinchi bo'lib yuklanadi",
      "Funksiyalarni boshqa har qanday qiymat kabi o'zgaruvchiga yuklash, argument sifatida uzatish yoki boshqa funksiyadan qaytarish mumkin",
      "Ular faqat global scope-da ishlaydi",
      "Ular strict rejimda ishlashga majbur"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript funksiyalari ob'ektlar kabi birinchi darajali qiymatdir, ya'ni ularni o'zgaruvchilarga yuklash, callback sifatida ishlatish va boshqa funksiyalardan qaytarish mumkin."
  },
  {
    "id": 11,
    "question": "Quyidagi massiv metodlaridan qaysi biri original massivni o'zgartirgani (mutatsiya qilgani) uchun FP qoidalariga ko'ra pure metod hisoblanmaydi?",
    "options": [
      "`.map()`",
      "`.filter()`",
      "`.reverse()`",
      "`.concat()`"
    ],
    "correctAnswer": 2,
    "explanation": "`.reverse()` metodi mavjud massivning elementlarini joyida teskari qilib tartiblaydi va massivning o'zini o'zgartiradi. Qolgan metodlar esa har doim yangi massiv qaytaradi."
  },
  {
    "id": 12,
    "question": "\"Partial Application\" (Qisman qo'llash) nima degani?",
    "options": [
      "Funksiyani faqat yarmigacha bajarish va keyin to'xtatish",
      "Ko'p parametrli funksiyaga uning ba'zi argumentlarini oldindan bog'lab, qolgan argumentlarni qabul qiladigan yangi funksiya hosil qilish",
      "Faqat shartli bajariladigan funksiya",
      "Hech qanday argument olmaydigan funksiya"
    ],
    "correctAnswer": 1,
    "explanation": "Partial application — ko'p argumentli funksiyaning ma'lum bir qism argumentlarini oldindan aniqlab (masalan, `.bind(null, arg1)` yordamida), kamroq argument oladigan funksiyani qaytarish texnikasidir."
  }
]
};
