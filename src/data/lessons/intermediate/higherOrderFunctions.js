export const higherOrderFunctions = {
  id: "higher-order-functions",
  title: "Higher-Order Functions va Currying",
  level: "Murakkab",
  description: "Funksiyalarni qaytaruvchi va qabul qiluvchi funksiyalar (HOF), Karring (Currying), partial application va funksiyalar kompozitsiyasi.",
  theory: `## 1. NEGA kerak?
JavaScript-da funksiyalar **Birinchi darajali ob'ektlar (First-Class Citizens)** hisoblanadi. Bu shuni anglatadiki, funksiyalarni:
- Boshqa o'zgaruvchilarga o'zlashtirish;
- Boshqa funksiyalarga argument sifatida uzatish;
- Boshqa funksiyalardan qiymat sifatida qaytarish mumkin.

Ushbu xususiyatlar bizga **Higher-Order Functions** (HOF - Oliy tartibli funksiyalar) va **Currying** (Karring) kabi ilg'or dasturlash andozalarini (patterns) qo'llash imkonini beradi. Ular yordamida:
- Kodimizni modulli (bo'laklangan) va moslashuvchan qilamiz.
- Kod takrorlanishining oldini olamiz (DRY qoidasi).
- Funktsional dasturlash (Functional Programming) yondashuvidan to'liq foydalanova olamiz.

## 2. SODDALIK (Analogiya)
- **Higher-Order Function (Boshqaruvchi):** Buni xuddi **ish boshqaruvchiga (director)** o'xshatish mumkin. U o'zi to'g'ridan-to'g'ri jismoniy ish qilmaydi, balki boshqa ishchilarni (funksiyalarni) ishga yollaydi (qabul qiladi) yoki yangi ishchilarni tayinlaydi (qaytaradi).
- **Currying (Qadam-baqadam to'lov):** Tasavvur qiling, siz do'kondan muddatli to'lovga (kreditga) narsa sotib olyapsiz. Siz birdaniga hamma pulni to'lamaysiz. Birinchi oy bir qismini (birinchi argument), ikkinchi oy yana bir qismini (ikkinchi argument) to'laysiz va oxirida mahsulot to'liq sizniki bo'ladi (yakuniy natija qaytadi).
- **Function Composition (Konveyer):** Zavoddagi konveyer lentasi kabi. Birinchi mashina xomashyoni kesadi (1-funksiya), ikkinchisi uni bo'yaydi (2-funksiya), uchinchisi esa qadoqlaydi (3-funksiya). Natijada bir funksiyaning chiqishi keyingisining kirishi bo'ladi.

## 3. STRUKTURA VA ILG'OR TUSHUNCHALAR

### A. Higher-Order Functions (HOF)
Argument sifatida funksiya qabul qiladigan yoki o'zidan funksiya qaytaradigan funksiyaga HOF deyiladi.
\`\`\`javascript
// Funksiya qabul qiluvchi HOF:
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i); // callback chaqirilmoqda
  }
}
repeat(3, console.log); // 0, 1, 2 chiqadi

// Funksiya qaytaruvchi HOF (Factory function):
function greetingCreator(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}
const sayHello = greetingCreator("Salom");
console.log(sayHello("Ali")); // "Salom, Ali!"
\`\`\`

### B. Currying (Karring)
Karring — bu ko'p argumentli funksiyani bittadan argument qabul qiluvchi zanjirlangan funksiyalarga aylantirish jarayonidir.
\`\`\`javascript
// Oddiy funksiya:
function sum(a, b) {
  return a + b;
}

// Karring qilingan funksiya:
function curriedSum(a) {
  return function(b) {
    return a + b;
  };
}
console.log(curriedSum(5)(10)); // 15
\`\`\`
*Karringning foydasi:* U bizga **Partial Application** (qisman qo'llash) imkonini beradi. Ya'ni, funksiyaning birinchi argumentini saqlab qo'yib, keyinroq boshqa qiymatlar bilan chaqira olamiz:
\`\`\`javascript
const addFive = curriedSum(5); // a = 5 saqlandi
console.log(addFive(3)); // 8 (b = 3 berildi)
console.log(addFive(10)); // 15
\`\`\`

### C. Function Composition (Kompozitsiya)
Ikki yoki undan ko'p funksiyalarni birlashtirib, yangi funksiya hosil qilish. Bunda birinchi funksiyaning natijasi ikkinchisiga argument bo'ladi: \`f(g(x))\`.
\`\`\`javascript
const double = x => x * 2;
const addTen = x => x + 10;

// f(g(x)) -> double(addTen(x))
const compose = (f, g) => (x) => f(g(x));

const doubleThenAdd = compose(addTen, double);
console.log(doubleThenAdd(5)); // (5 * 2) + 10 = 20
\`\`\`

## 4. NIMA UCHUN MUHIM?
- **Qayta ishlatiluvchanlik (Reusability):** Umumiy logikaga ega funksiyani karring orqali osonlikcha ixtisoslashtirilgan kichik funksiyalarga bo'lish mumkin (masalan, chegirmalar yoki valyuta konvertorlari).
- **Deklarativ kod:** Kod qanday bajarilishi (imperativ) emas, nima bajarilishini (deklarativ) yozishga o'tiladi.

## 5. KO'P UCHRAYDIGAN XATOLAR
1. **Zanjirli chaqiruvlarda qavslarni unutish:**
   \`\`\`javascript
   const curried = a => b => a + b;
   curried(5); // funksiya qaytaradi, lekin ishlamaydi ❌
   curried(5)(10); // 15 ✅
   \`\`\`
2. **Context (this) yo'qolishi:** Higher-order funksiyalar ichida callback chaqirilganda, callback ichidagi \`this\` kalit so'zi global obyektga bog'lanib qolishi mumkin. Buning oldini olish uchun arrow functions yoki \`bind()\` ishlatiladi.

## 6. INTERVIEW SAVOLLAR (Junior -> Middle -> Senior)
1. **Oliy tartibli funksiya (Higher-Order Function) nima? (Junior)**
   - Argument sifatida boshqa funksiyani qabul qiladigan yoki o'zidan yangi funksiya qaytaradigan funksiyadir.
2. **First-class citizens (Birinchi darajali fuqarolar) nima degani? (Junior)**
   - Dasturlash tilida funksiyalar boshqa obyektlar va ma'lumotlar kabi erkin ishlatilishi, o'zgaruvchiga o'zlashtirilishi va argument bo'lib o'ta olishi.
3. **Currying (Karring) nima va u partial application dan qanday farq qiladi? (Middle)**
   - Karring ko'p argumentli funksiyani har safar faqat bittadan argument oladigan funksiyalar zanjiriga ajratadi. Partial application esa funksiyaning bir nechta argumentlarini oldindan biriktirib qo'yishdir (argumentlar soni bitta bo'lishi shart emas).
4. **Funksiyalar kompozitsiyasi (Function Composition) nima? (Middle)**
   - Bir nechta oddiy funksiyalarni birlashtirib, bitta murakkab funksiya hosil qilish. Masalan: \`f(g(x))\` ko'rinishida.
5. **Karring funksiyasini dinamik ravishda universal qiluvchi helper qanday yoziladi? (Senior)**
   - Funksiyaning \`length\` xossasi (kutilayotgan argumentlar soni) yordamida rekursiv ravishda yoziladi:
     \`\`\`javascript
     const curry = (fn) => {
       return function curried(...args) {
         if (args.length >= fn.length) return fn(...args);
         return (...moreArgs) => curried(...args, ...moreArgs);
       };
     };
     \`\`\`
6. **Currying loyihalarda real hayotda qayerda qo'llaniladi? (Middle)**
   - Konfiguratsiya yoki logger tizimlarida (masalan, birinchi bo'lib log darajasini "ERROR" deb sozlab, keyin xabarlarni yozishda) yoki API so'rovlarida umumiy endpointni saqlab qo'yishda.
7. **Callback va Higher-Order Function farqi nimada? (Junior)**
   - Callback — HOF funksiyaga argument sifatida berib yuboriladigan va keyinroq chaqiriladigan oddiy funksiya. HOF esa callback-ni qabul qiluvchi ota funksiyadir.
8. **Dramatik tarzda nesting ko'payib ketishidan (Callback Hell) qanday saqlanish mumkin? (Middle)**
   - Promises, async/await yoki funksiyalarni kichik bo'laklarga ajratib composition qilish orqali.
9. **Kombinatorlar (Combinators) va ularning funktsional dasturlashdagi roli nima? (Senior)**
   - Boshqa funksiyalar ustida mantiqiy amallar bajaradigan va o'zgaruvchilarsiz ishlaydigan HOF-lar (masalan: Identity \`I\`, Constant \`K\` kombinatorlari).
10. **Partial application yaratish uchun JavaScript-dagi qaysi standart metoddan foydalanish mumkin? (Junior)**
    - \`Function.prototype.bind()\` metodi orqali (masalan: \`const add5 = sum.bind(null, 5)\`).
11. **Funksiya kompozitsiyasini (Compose) ixtiyoriy miqdordagi funksiyalar uchun qanday yozish mumkin? (Senior)**
    - \`reduceRight\` metodi yordamida:
      \`\`\`javascript
      const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
      \`\`\`
12. **Pure functions (toza funksiyalar) va HOF bog'liqligi nimada? (Middle)**
    - HOF funksiyalar pure funksiyalar bilan ishlaganda eng yuqori xavfsizlikni beradi, chunki side-effect (tashqi dunyoni o'zgartirish) bo'lmaganda funksiyalarni xavfsiz kompozitsiya qilib bo'ladi.
`
  ,
  exercises: [
    {
      id: 1,
      title: "Karring (Currying) mashqi",
      instruction: "Ikki sonning ko'paytmasini karring usulida hisoblaydigan `multiply(a)(b)` funksiyasini yozing.",
      startingCode: "function multiply(a) {\n  // Karring funksiya yozing\n}",
      hint: "return function(b) { return a * b; };",
      test: "if (typeof multiply !== 'function') return 'multiply topilmadi'; if (typeof multiply(2) !== 'function') return 'Karring amalga oshirilmadi'; if (multiply(2)(5) !== 10) return 'Ko\\'paytma noto\\'g\\'ri'; return null;"
    },
    {
      id: 2,
      title: "Logger Decorator",
      instruction: "Berilgan funksiyani (`fn`) qabul qilib, u chaqirilganda argumentlarini konsolga chiqaradigan va keyin funksiya natijasini qaytaradigan oliy tartibli `logger(fn)` funksiyasini yozing.",
      startingCode: "function logger(fn) {\n  // Yangi funksiya qaytaring\n}",
      hint: "return function(...args) { console.log(...args); return fn(...args); };",
      test: "if (typeof logger !== 'function') return 'logger topilmadi'; const double = x => x * 2; const logged = logger(double); if (logged(4) !== 8) return 'Logger funksiya natijasini to\\'g\\'ri qaytarmadi'; return null;"
    },
    {
      id: 3,
      title: "Funksiyalar kompozitsiyasi (Compose)",
      instruction: "Ikkita funksiya `f` va `g` qabul qilib, ularning kompozitsiyasini (`f(g(x))`) hisoblaydigan yangi funksiya qaytaruvchi `compose(f, g)` funksiyasini yozing.",
      startingCode: "function compose(f, g) {\n  // f(g(x)) qaytaruvchi funksiya yozing\n}",
      hint: "return function(x) { return f(g(x)); };",
      test: "if (typeof compose !== 'function') return 'compose topilmadi'; const add5 = x => x + 5; const mult3 = x => x * 3; const comp = compose(add5, mult3); if (comp(10) !== 35) return 'Kompozitsiya xato (10 * 3 + 5 = 35 bo\\'lishi kerak)'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Higher-Order Function (Oliy tartibli funksiya) nima?",
      options: [
        "Faqat matematik hisob-kitoblarni bajaradigan funksiya",
        "Argument sifatida funksiya qabul qiladigan yoki o'zidan funksiya qaytaradigan funksiya",
        "Faqat klasslar ichida yoziladigan funksiya",
        "Eng tez ishlaydigan asinxron funksiya"
      ],
      correctAnswer: 1,
      explanation: "Oliy tartibli funksiyaning ta'rifi boshqa funksiyalarni argument qibly olish yoki yangi funksiya qaytarish qobiliyatidir."
    },
    {
      id: 2,
      question: "JavaScript-da funksiyalar 'First-Class Citizens' (Birinchi darajali obyektlar) ekanligi nimani anglatadi?",
      options: [
        "Ular faqat birinchi qatorda e'lon qilinishi kerakligini",
        "Funksiyalarni o'zgaruvchilarga o'zlashtirish, argument qibly uzatish va boshqa funksiyadan qaytarish mumkinligini",
        "Ular xotirada eng ko'p joy egallashini",
        "Ulardan faqat senior dasturchilar foydalanishini"
      ],
      correctAnswer: 1,
      explanation: "Birinchi darajali bo'lish ularning oddiy o'zgaruvchilar kabi erkin va teng ishlatilishini anglatadi."
    },
    {
      id: 3,
      question: "Karring (Currying) jarayonining maqsadi nima?",
      options: [
        "Koddagi barcha xatolarni avtomatik tuzatish",
        "Ko'p argumentli funksiyani bittadan argument qabul qiluvchi zanjirli funksiyalarga aylantirish",
        "Funksiya xotirasini optimallashtirish",
        "Faqat class konstruktorini ishga tushirish"
      ],
      correctAnswer: 1,
      explanation: "Karring ko'p argumentli funksiyani bir qator bitta argumentli zanjirlarga ajratadi. Masalan: `f(a, b)` -> `f(a)(b)`."
    },
    {
      id: 4,
      question: "Funksiyani qisman qo'llash (Partial Application) nima?",
      options: [
        "Funksiyaning faqat yarmini ishga tushirish",
        "Funksiya argumentlarining bir qismini oldindan biriktirib (fiksatsiya qilib) qo'yish",
        "Funksiyani faqat catch blokida chaqirish",
        "Faqat local storage bilan ishlash"
      ],
      correctAnswer: 1,
      explanation: "Partial application yordamida funksiyaning ba'zi argumentlarini oldindan saqlab qo'yib, qolganlarini keyinroq uzatish mumkin."
    },
    {
      id: 5,
      question: "Funksiyalar kompozitsiyasini ifodalovchi to'g'ri formula qaysi?",
      options: [
        "f(x) + g(x)",
        "f(g(x))",
        "f(x) * g(x)",
        "f(g) + x"
      ],
      correctAnswer: 1,
      explanation: "Funksiyalar kompozitsiyasi deb bitta funksiya natijasini keyingisiga kirish qilib ulashga aytiladi: `f(g(x))`."
    },
    {
      id: 6,
      question: "Quyidagi karring kodi chaqirilganda qanday natija qaytadi?\n```javascript\nconst add = a => b => a + b;\nconst res = add(10);\n```",
      options: [
        "10",
        "Yangi funksiya (`b => 10 + b`)",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "`add(10)` chaqirilganda birinchi o'ram bajarilib, `b` ni kutadigan ichki funksiya qaytadi. U hali ikkinchi marta chaqirilmagan."
    },
    {
      id: 7,
      question: "JavaScript-da partial application yaratish uchun qaysi standart metoddan foydalaniladi?",
      options: ["call()", "apply()", "bind()", "connect()"],
      correctAnswer: 2,
      explanation: "`Function.prototype.bind()` birinchi argumentni this qilib bog'laydi, keyingilarini esa funksiyaga argument sifatida oldindan biriktiradi."
    },
    {
      id: 8,
      question: "Ixtiyoriy miqdordagi funksiyalarni o'ngdan chapga qarab kompozitsiya (compose) qilish uchun massivning qaysi metodidan foydalaniladi?",
      options: ["reduce()", "reduceRight()", "map()", "filter()"],
      correctAnswer: 1,
      explanation: "Funktsional dasturlashda `compose` funksiyalarni o'ngdan chapga qarab ketma-ket qo'llaydi, shuning uchun massivdagi elementlarni o'ngdan chapga aylanishda `reduceRight` mos keladi."
    }
  ]
};
