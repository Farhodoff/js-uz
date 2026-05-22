export const functionalProgramming = {
  id: "a14",
  title: "Functional Programming (Funksional dasturlash)",
  theory: `## 1. NEGA kerak?
Funksional dasturlash (FP) — bu kodni matematik funksiyalar to'plami sifatida yozish uslubidir. Bu yondashuv o'zgaruvchan holatlardan (mutable state) va yashirin nojo'ya ta'sirlardan (side effects) qochish orqali xatolarni kamaytirish, kodni osonroq test qilish va parallel bajarilishga tayyorlash uchun xizmat qiladi. React, Redux va zamonaviy JS arxitekturalari aynan shu tamoyillar asosida qurilgan.

## 2. SODDALIK (Analogiya)
Buni **hujjat nusxalari bilan ishlash**ga o'xshatish mumkin.
- **Imperativ dasturlash:** Asl shartnoma matnini to'g'ridan-to'g'ri o'chirib-yozib o'zgartirish (original ma'lumotni mutatsiya qilish). Agar xatoga yo'l qo'ysangiz, asl hujjat yo'qoladi.
- **Funksional dasturlash:** Asl shartnomaning nusxasini olasiz, o'zgarishlarni yangi varoqqa yozasiz. Asl shartnoma har doim toza va o'zgarishsiz qoladi (Immutability).

## 3. STRUKTURA
Funksional dasturlashning asosiy ustunlari:
- **Sof funksiyalar (Pure Functions):** Bir xil kirish qiymati uchun har doim bir xil natija qaytaruvchi va tashqi dunyoga hech qanday yon ta'sir ko'rsatmaydigan funksiyalar.
- **O'zgarmaslik (Immutability):** Ma'lumotlarni o'zgartirmaslik, buning o'rniga har doim yangi nusxa yaratish.
- **Higher-Order Functions:** Boshqa funksiyalarni parametr sifatida oladigan yoki yangi funksiya qaytaradigan funksiyalar (masalan, \`map\`, \`filter\`, \`reduce\`).
- **Function Composition:** Kichik funksiyalarni zanjir kabi birlashtirib, murakkab funksiyalar hosil qilish (\`compose\`, \`pipe\`).

## 4. AMALIYOT (Mashqlar pastda)
Ma'lumotlarni ketma-ket qayta ishlovchi oddiy pipeline:
\`\`\`javascript
const double = x => x * 2;
const addFive = x => x + 5;

// Chapdan o'ngga pipe funksiyasi
const pipe = (val, ...fns) => fns.reduce((acc, fn) => fn(acc), val);

const result = pipe(10, double, addFive); // 10 * 2 + 5 = 25
console.log(result); // 25
\`\`\`

## 5. XATOLAR (Common mistakes)
- **Asl ma'lumotlarni mutatsiya qilish:** O'zgarmaslikni buzib, massivga \`push\` yoki \`splice\` kabi metodlarni qo'llash. Buning o'rniga \`spread (...)\` yoki \`concat\` ishlatish lozim.
- **Tashqi holatga (state) tayanuvchi funksiyalar yozish:** Funksiya ichida global o'zgaruvchilarni yoki tashqi obektlarni o'qish/o'zgartirish.
- **Metodlar zanjirida sof bo'lmagan metodlarni qo'llash:** Masalan, \`reverse()\` yoki \`sort()\` massivning aslini o'zgartirib yuboradi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Pure function nima?**
Faqat kirish parametrlariga bog'liq bo'lgan va hech qanday tashqi holatni o'zgartirmaydigan funksiya.

**2. Immutability nima uchun kerak?**
Kodni prognoz qilinadigan (predictable) qilish va xotiradagi yashirin xatolarni kamaytirish uchun.

**3. Side effect nima?**
Funksiyaning o'z tanasidan tashqaridagi holatlarga ta'sir ko'rsatishi (masalan, tarmoq so'rovi, konsol log, fayl o'qish yoki global o'zgaruvchini o'zgartirish).

**4. Higher-order function nima?**
Argument sifatida funksiya qabul qiladigan yoki boshqa funksiyani qaytaradigan funksiya.
`,
  exercises: [
    {
      id: 1,
      title: "Sof funksiya yozish",
      instruction: "Berilgan sonning kvadratini qaytaruvchi 'pure' funksiya yozing.",
      startingCode: "function square(n) {\n  // Bu yerga yozing\n}\n",
      hint: "Faqat return n * n; ishlating.",
      test: "if (square(5) === 25) return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Immutability",
      instruction: "Original massivni o'zgartirmasdan yangi element qo'shing.",
      startingCode: "const original = [1, 2, 3];\n// Bu yerga yangi massiv yarating\n",
      hint: "const updated = [...original, 4];",
      test: "if (code.includes('...') || code.includes('concat')) return null; return 'Immutability xato';"
    },
    {
      id: 3,
      title: "map() bilan transform",
      instruction: "Massivdagi sonlarni kvadratga aylantiring.",
      startingCode: "const nums = [1, 2, 3];\n// map orqali square qiling\n",
      hint: "const squared = nums.map(n => n * n);",
      test: "if (code.includes('.map')) return null; return 'map yoq';"
    },
    {
      id: 4,
      title: "filter() bilan saralash",
      instruction: "Faqat juft sonlarni qoldiring.",
      startingCode: "const nums = [1, 2, 3, 4];\n// Bu yerga filter\n",
      hint: "const evens = nums.filter(n => n % 2 === 0);",
      test: "if (code.includes('.filter')) return null; return 'filter yoq';"
    },
    {
      id: 5,
      title: "reduce() bilan yig'indi",
      instruction: "Massiv yig'indisini reduce bilan toping.",
      startingCode: "const nums = [1, 2, 3];\n// Bu yerga reduce\n",
      hint: "const sum = nums.reduce((acc, n) => acc + n, 0);",
      test: "if (code.includes('.reduce')) return null; return 'reduce yoq';"
    },
    {
      id: 6,
      title: "Higher-order function",
      instruction: "Funksiyani 2 marta qo'llaydigan applyTwice yozing.",
      startingCode: "function applyTwice(fn, value) {\n  // Bu yerga yozing\n}\n",
      hint: "return fn(fn(value));",
      test: "if (code.includes('fn(')) return null; return 'HOF xato';"
    },
    {
      id: 7,
      title: "Compose",
      instruction: "Compose funksiyasini yozing (o'ngdan chapga).",
      startingCode: "const compose = (...fns) => {\n  // Bu yerga yozing\n};\n",
      hint: "return x => fns.reduceRight((acc, fn) => fn(acc), x);",
      test: "if (code.includes('reduceRight')) return null; return 'Compose xato';"
    },
    {
      id: 8,
      title: "Pipe",
      instruction: "Pipe funksiyasini yozing (chapdan o'ngga).",
      startingCode: "const pipe = (...fns) => {\n  // Bu yerga yozing\n};\n",
      hint: "return x => fns.reduce((acc, fn) => fn(acc), x);",
      test: "if (code.includes('reduce(')) return null; return 'Pipe xato';"
    },
    {
      id: 9,
      title: "Currying",
      instruction: "add funksiyasini currying ko'rinishida yozing.",
      startingCode: "const add = (a) => {\n  // Bu yerga yozing\n};\n",
      hint: "return (b) => a + b;",
      test: "if (code.includes('=>')) return null; return 'Currying xato';"
    },
    {
      id: 10,
      title: "Partial application",
      instruction: "greet funksiyasidan sayHello'ni partial qiling.",
      startingCode: "function greet(greeting, name) { return greeting + ', ' + name; }\n// Bu yerga sayHello\n",
      hint: "const sayHello = greet.bind(null, 'Salom');",
      test: "if (code.includes('.bind')) return null; return 'Partial xato';"
    },
    {
      id: 11,
      title: "Memoization",
      instruction: "Natijani kesh qiluvchi memoize yozing.",
      startingCode: "function memoize(fn) {\n  const cache = {};\n  // Bu yerga yozing\n}\n",
      hint: "return (...args) => { const key = JSON.stringify(args); if (key in cache) return cache[key]; return cache[key] = fn(...args); };",
      test: "if (code.includes('cache')) return null; return 'Memoize xato';"
    },
    {
      id: 12,
      title: "Kompleks: Pipeline",
      instruction: "map + filter + reduce bilan pipeline yarating.",
      startingCode: "const nums = [1, 2, 3, 4, 5];\n// 1) juftlarni qoldiring\n// 2) 2 ga ko'paytiring\n// 3) yig'indini toping\n",
      hint: "nums.filter(...).map(...).reduce(...);",
      test: "if (code.includes('.filter') && code.includes('.map') && code.includes('.reduce')) return null; return 'Pipeline xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Functional Programming (FP) ning asosiy ustunlaridan biri nima?",
      options: [
        "Ob'ektlar va vorislikni keng qo'llash (Inheritance)",
        "O'zgaruvchan holatlardan (mutable state) va yon ta'sirlardan (side-effects) qochish",
        "Barcha o'zgaruvchilarni global qilish",
        "Faqat Class constructorlardan foydalanish"
      ],
      correctAnswer: 1,
      explanation: "Functional Programming (Funktsional Dasturlash) ning asosiy g'oyasi yon ta'sirlardan qochish, pure funksiyalar yozish va holatni o'zgartirmaslik (immutability) hisoblanadi."
    },
    {
      id: 2,
      question: '"Pure Function" (Toza funksiya) nima?',
      options: [
        "Faqat bitta qator koddan iborat funksiya",
        "Bir xil kirish parametrlari uchun har doim bir xil natija qaytaradigan va hech qanday yon ta'siri (side-effects) bo'lmagan funksiya",
        "Faqat sonlar ustida ishlaydigan funksiya",
        "Hech qanday argument qabul qilmaydigan funksiya"
      ],
      correctAnswer: 1,
      explanation: "Pure funksiya tashqi muhitga ta'sir qilmaydi (side effect yo'q) va har doim bir xil argumentlarga bir xil natijani qaytaradi (deterministik)."
    },
    {
      id: 3,
      question: '"Immutability" (O\'zgarmaslik) nima degani?',
      options: [
        "Ma'lumotlar o'zgartirilganda uning ustiga yozilishi",
        "Mavjud ma'lumot tuzilmasini to'g'ridan-to'g'ri o'zgartirmasdan, har doim yangi nusxa yaratish va o'shani qaytarish",
        "Funksiyalarni o'zgartirish taqiqlanganligi",
        "Faol xotiraning (RAM) o'zgarmasligi"
      ],
      correctAnswer: 1,
      explanation: "Immutability printsipiga ko'ra, mavjud ob'ekt yoki massivlarni to'g'ridan-to'g'ri o'zgartirmaymiz (mutation yo'q), balki yangi nusxa yaratib ishlaymiz (masalan, spread operator yoki `.map()` yordamida)."
    },
    {
      id: 4,
      question: '"Currying" nima?',
      options: [
        "Funksiyaga har doim massiv uzatish usuli",
        "Bir nechta argument qabul qiladigan funksiyani navbatma-navbat bittadan argument qabul qiladigan funksiyalar zanjiriga aylantirish",
        "Funksiya bajarilishini ma'lum vaqtga kechiktirish",
        "Xatolarni avtomatik o'tkazib yuboradigan funksiya"
      ],
      correctAnswer: 1,
      explanation: "Currying `f(a, b, c)` ko'rinishidagi funksiyani `f(a)(b)(c)` ko'rinishida chaqirish imkonini beradi. Har bir funksiya bitta argument olib, navbatdagi funksiyani qaytaradi."
    },
    {
      id: 5,
      question: '"Function Composition" (Funksiyalar kompozitsiyasi) nima?',
      options: [
        "Bir funksiyani boshqa bir nechta funksiyalar yordamida yozish",
        "Bir funksiyaning chiqish natijasini (output) boshqa funksiyaning kirish parametri (input) sifatida zanjir ko'rinishida ulash",
        "Funksiyalarni matn sifatida jamlash",
        "Funksiyalar ichida class'lar yaratish"
      ],
      correctAnswer: 1,
      explanation: "Kompozitsiya funksiyalarni birlashtirish usuli bo'lib, uning yordamida `f(g(x))` kabi zanjirli ishlarni soddalashtirish uchun `compose(f, g)(x)` ko'rinishiga keltiriladi."
    },
    {
      id: 6,
      question: "JavaScriptda Funksiyalar zanjirini chapdan o'ngga qarab bajaradigan funksiya nima deb ataladi?",
      options: [
        "`compose`",
        "`pipe`",
        "`map`",
        "`reducer`"
      ],
      correctAnswer: 1,
      explanation: "`pipe` funksiyasi argumentlarni chapdan o'ngga qarab bajaradi, ya'ni birinchi funksiyaning natijasini ikkinchisiga uzatadi. `compose` esa o'ngdan chapga ishlaydi."
    },
    {
      id: 7,
      question: "`compose` va `pipe` funksiyalari o'rtasidagi asosiy farq nimada?",
      options: [
        "`compose` sinxron, `pipe` esa asinxron ishlaydi",
        "`compose` o'ngdan chapga (right-to-left), `pipe` esa chapdan o'ngga (left-to-right) funksiyalarni bajaradi",
        "`pipe` ko'proq xotira sarflaydi",
        "Hech qanday farqi yo'q, ikkalasi ham bir xil ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Matematik kompozitsiya an'anaga ko'ra o'ngdan chapga hisoblanadi (f o g)(x) = f(g(x)), shuning uchun `compose` funksiyalar ro'yxatini o'ngdan chapga chaqiradi. Dasturchilarga qulay bo'lishi uchun esa `pipe` chapdan o'ngga bajaradi."
    },
    {
      id: 8,
      question: "Qimmat hisob-kitoblarga ega funksiya natijasini kiritilgan argumentlar kaliti bo'yicha keshlab, keyingi chaqiriqlarda qayta hisoblamaslik texnikasi nima deb ataladi?",
      options: [
        "Currying",
        "Memoization",
        "Partial Application",
        "Recursion"
      ],
      correctAnswer: 1,
      explanation: "Memoization (keshlash) — bu pure funksiyalar natijasini tezlashtirish uchun foydalaniladigan optimal texnika bo'lib, argumentlar bo'yicha javobni keshda saqlaydi va bir xil argumentlar kelganda darhol javobni qaytaradi."
    },
    {
      id: 9,
      question: "Quyidagilardan qaysi biri yon ta'sirga (side effect) yorqin misol bo'la oladi?",
      options: [
        "Global o'zgaruvchini funksiya ichida o'zgartirish",
        "Konsolga ma'lumot chiqarish (console.log)",
        "API orqali tarmoq so'rovi yuborish",
        "Barcha javoblar to'g'ri"
      ],
      correctAnswer: 3,
      explanation: "Funksiyaning o'zidan tashqaridagi muhitni har qanday tarzda o'zgartirishi yoki unga murojaat qilishi (I/O, console, network, global variable modification) side-effect hisoblanadi."
    },
    {
      id: 10,
      question: "JavaScriptda funksiyalar 'First-Class Citizens' (Birinchi darajali fuqarolar) deyilganda nima tushuniladi?",
      options: [
        "Funksiyalar har doim birinchi bo'lib yuklanadi",
        "Funksiyalarni boshqa har qanday qiymat kabi o'zgaruvchiga yuklash, argument sifatida uzatish yoki boshqa funksiyadan qaytarish mumkin",
        "Ular faqat global scope-da ishlaydi",
        "Ular strict rejimda ishlashga majbur"
      ],
      correctAnswer: 1,
      explanation: "JavaScript funksiyalari ob'ektlar kabi birinchi darajali qiymatdir, ya'ni ularni o'zgaruvchilarga yuklash, callback sifatida ishlatish va boshqa funksiyalardan qaytarish mumkin."
    },
    {
      id: 11,
      question: "Quyidagi massiv metodlaridan qaysi biri original massivni o'zgartirgani (mutatsiya qilgani) uchun FP qoidalariga ko'ra pure metod hisoblanmaydi?",
      options: [
        "`.map()`",
        "`.filter()`",
        "`.reverse()`",
        "`.concat()`"
      ],
      correctAnswer: 2,
      explanation: "`.reverse()` metodi mavjud massivning elementlarini joyida teskari qilib tartiblaydi va massivning o'zini o'zgartiradi. Qolgan metodlar esa har doim yangi massiv qaytaradi."
    },
    {
      id: 12,
      question: '"Partial Application" (Qisman qo\'llash) nima degani?',
      options: [
        "Funksiyani faqat yarmigacha bajarish va keyin to'xtatish",
        "Ko'p parametrli funksiyaga uning ba'zi argumentlarini oldindan bog'lab, qolgan argumentlarni qabul qiladigan yangi funksiya hosil qilish",
        "Faqat shartli bajariladigan funksiya",
        "Hech qanday argument olmaydigan funksiya"
      ],
      correctAnswer: 1,
      explanation: "Partial application — ko'p argumentli funksiyaning ma'lum bir qism argumentlarini oldindan aniqlab (masalan, `.bind(null, arg1)` yordamida), kamroq argument oladigan funksiyani qaytarish texnikasidir."
    }
  ]
};
