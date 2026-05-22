export const interviewQuestionsAdvanced = {
  id: "q3",
  title: "🔴 Interview Savollar (Murakkab)",
  theory: `## 1. NEGA kerak?
Ilg'or (Advanced) darajadagi texnik suhbatlar sizning nafaqat JavaScript sintaksisini, balki JavaScript motorining (V8) xotirani boshqarishi, asinxron hodisalar arxitekturasi (Event Loop), kodni optimallashtirish va xavfsizlik kabi murakkab fundamental tushunchalarni qay darajada bilishingizni tekshiradi. Ushbu savollarga tayyorlanish yuqori darajali muhandis (Senior Developer) bo'lishda muhim ahamiyatga ega.

## 2. SODDALIK (Analogiya)
Buni **avtopoygachi va mexanik** analogiyasiga o'xshatish mumkin.
- O'rta darajadagi dasturchi — avtomobilni tez va to'g'ri boshqaradigan haydovchidir.
- Ilg'or dasturchi (Senior) — avtomobilning aerodinamikasi, shinalarining qizishi, dvigatelning xotira (yoqilg'i) taqsimoti va xavfsizlik tizimlarini to'liq tushunadigan hamda poyga paytida har qanday nosozlikni hal eta oladigan muhandis-haydovchidir.

## 3. STRUKTURA
Murakkab intervyularda eng ko'p so'raladigan 4 ta asosiy yo'nalish:
- **Event Loop & Concurrency:** Microtasks vs Macrotasks, call stack, render queue ishlash mexanizmlari.
- **Xotirani Boshqarish:** Garbage Collector (Mark-and-Sweep algoritmi), memory leaks (xotira sizib chiqishi).
- **Metaprogramming va Prototiplar:** Proxies, Reflect API, prototype chain zanjirini o'zgartirish.
- **Dizayn patternlar va Performance:** Debounce/Throttle, Memoization, Custom Promise implementatsiyalari.

## 4. AMALIYOT (Mashqlar pastda)
Suhbatlarda ko'p beriladigan amaliy savollardan biri — massivni rekursiv tekislash (deep flatten):
\`\`\`javascript
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
console.log(flatten([1, [2, [3, 4]]])); // [1, 2, 3, 4]
\`\`\`

## 5. XATOLAR (Common mistakes)
- **Microtask va Macrotask navbatini chalkashtirish:** \`Promise.then\` va \`setTimeout\` asinxron bo'lsa-da, ularning bajarilish navbati bir-biridan butunlay farq qilishini unutish.
- **Muzlatilgan obyektning yuzaki (shallow) ekanligi:** \`Object.freeze\` faqat birinchi darajali xossalarni muzlatadi, ichki obyektlarni esa bemalol o'zgartirish mumkinligini hisobga olmaslik.
- **Memory Leak yaratish:** Chaqirilgan setInterval'larni o'chirmaslik yoki global o'zgaruvchilarda ortiqcha ma'lumotlarni saqlab qolish.

## 6. SAVOLLAR VA JAVOBLAR
**1. Event Loop qanday ishlaydi?**
Event Loop call stack bo'shligini tekshiradi, keyin microtask queue (Promises) dagi barcha vazifalarni bajaradi, va nihoyat task queue (setTimeout) dagi bitta vazifani stackka olib chiqadi.

**2. Debounce va Throttle farqi nima?**
Debounce ketma-ket chaqiriqlarni kechiktirib, faqat oxirgisidan keyin ishlaydi. Throttle esa belgilangan vaqt oralig'ida faqat bir marta ishlashni ta'minlaydi.

**3. JavaScriptda Garbage Collector qanday ishlaydi?**
U asosan "Mark-and-Sweep" (belgilash va o'chirish) algoritmi yordamida ishlaydi. Dastur ildizidan (global scope) kirib bo'lmaydigan obyektlar xotiradan tozalab tashlanadi.
`,
  exercises: [
    {
      id: 1,
      title: "Memoization",
      instruction: "Natijani keshlovchi oddiy memoize funksiyasini yozing.",
      startingCode: "function memoize(fn) {\n  const cache = {};\n  return function(n) {\n    // keshni tekshiring\n  }\n}",
      hint: "cache[n] borligini tekshiring.",
      test: "if (code.includes('cache')) return null; return 'cache dan foydalaning';"
    },
    {
      id: 2,
      title: "Currying sum",
      instruction: "sum(a)(b)(c) ko'rinishida chaqiriladigan va 3 ta sonning yig'indisini qaytaruvchi funksiya yozing.",
      startingCode: "function sum(a) {\n  // Ichma-ich funksiyalar yozing\n}",
      hint: "return function(b) { return function(c) { return a + b + c; } }",
      test: "if (code.includes('return') && code.includes('b') && code.includes('c')) return null; return 'Ichma-ich funksiyalar orqali yig\\'indini qaytaring';"
    },
    {
      id: 3,
      title: "Array Flatten",
      instruction: "Rekursiya yordamida massivni tekislovchi (flatten) funksiya yozing (flat() ishlatmang).",
      startingCode: "function flatten(arr) {\n  // Rekursiv yechim yozing\n}",
      hint: "return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);",
      test: "if (code.includes('reduce') && code.includes('Array.isArray')) return null; return 'reduce va Array.isArray yordamida rekursiv yozing';"
    },
    {
      id: 4,
      title: "Simplified Debounce",
      instruction: "Ma'lum vaqtdan keyin chaqiriluvchi sodda 'debounce(fn, delay)' funksiyasini yozing.",
      startingCode: "function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    // Timeoutni tozalang va yangisini o'rnating\n  };\n}",
      hint: "clearTimeout(timeoutId); timeoutId = setTimeout(() => fn(...args), delay);",
      test: "if (code.includes('clearTimeout') && code.includes('setTimeout')) return null; return 'clearTimeout va setTimeout dan foydalaning';"
    },
    {
      id: 5,
      title: "Simplified Throttle",
      instruction: "Ma'lum vaqtda faqat bir marta chaqiriluvchi sodda 'throttle(fn, limit)' funksiyasini yozing.",
      startingCode: "function throttle(fn, limit) {\n  let inThrottle;\n  return function(...args) {\n    // Throttle shartini yozing\n  };\n}",
      hint: "if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, limit); }",
      test: "if (code.includes('inThrottle') && code.includes('setTimeout')) return null; return 'inThrottle flagi va setTimeout yordamida boshqaring';"
    },
    {
      id: 6,
      title: "Simple Deep Clone",
      instruction: "Obyektni chuqur nusxalovchi deepClone funksiyasini JSON orqali yozing.",
      startingCode: "function deepClone(obj) {\n  // JSON orqali deep clone qiling\n}",
      hint: "return JSON.parse(JSON.stringify(obj));",
      test: "if (code.includes('JSON.parse') && code.includes('JSON.stringify')) return null; return 'JSON parse va stringify dan foydalaning';"
    },
    {
      id: 7,
      title: "Cyclical reference checker",
      instruction: "Obyektda siklik bog'liqlik (circular reference) bor yoki yo'qligini tekshiruvchi 'hasCircular' funksiyasi shartini yozing.",
      startingCode: "function hasCircular(obj) {\n  try {\n    // JSON stringify xato berishini tekshiring\n  } catch (e) {\n    return true;\n  }\n  return false;\n}",
      hint: "JSON.stringify(obj);",
      test: "if (code.includes('JSON.stringify')) return null; return 'JSON.stringify yordamida sinab ko\\'ring';"
    },
    {
      id: 8,
      title: "Custom Bind implementation",
      instruction: "Function.prototype ga 'myBind' nomli custom bind funksiyasi shablonini yozing.",
      startingCode: "Function.prototype.myBind = function(context, ...args) {\n  const fn = this;\n  // Funksiyani qaytaring\n};",
      hint: "return function(...newArgs) { return fn.apply(context, [...args, ...newArgs]); };",
      test: "if (code.includes('apply') || code.includes('call')) return null; return 'apply yoki call orqali kontekstni bog\\'lang';"
    },
    {
      id: 9,
      title: "Basic Event Emitter",
      instruction: "Eventlarni boshqarish uchun on va emit metodlariga ega EventEmitter sinfi constructorida 'events' ob'ektini yarating.",
      startingCode: "class EventEmitter {\n  constructor() {\n    // events ob'ektini yarating\n  }\n}",
      hint: "this.events = {};",
      test: "if (code.includes('this.events')) return null; return 'this.events ni e\\'lon qiling';"
    },
    {
      id: 10,
      title: "Custom Promise.all skeleton",
      instruction: "Promise.all ga o'xshash funksiya yozish uchun massiv ustidan map yoki loop qilib Promise.resolve ishlatish shablonini yozing.",
      startingCode: "function promiseAll(promises) {\n  // Promise.resolve ishlatilishini ko'rsating\n}",
      hint: "promises.map(p => Promise.resolve(p))",
      test: "if (code.includes('Promise.resolve')) return null; return 'Promise.resolve dan foydalaning';"
    },
    {
      id: 11,
      title: "Delay function",
      instruction: "Belgilangan millisekunddan keyin resolve bo'ladigan delay funksiyasini yozing.",
      startingCode: "function delay(ms) {\n  // Promise qaytaring\n}",
      hint: "return new Promise(resolve => setTimeout(resolve, ms));",
      test: "if (code.includes('Promise') && code.includes('setTimeout')) return null; return 'Promise va setTimeout dan foydalaning';"
    },
    {
      id: 12,
      title: "Private variables with Closures",
      instruction: "Konteksda yashirin 'value'ni faqat get/set metodlari orqali boshqaruvchi obyekt qaytaring.",
      startingCode: "function createSecret(val) {\n  let secret = val;\n  return {\n    // get va set metodlarini yozing\n  };\n}",
      hint: "get: () => secret, set: (newVal) => secret = newVal",
      test: "if (code.includes('get') && code.includes('set')) return null; return 'get va set metodlarini yozing';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Event Loop ketma-ketligi bo'yicha quyidagi kod konsolga nimalarni chiqaradi?\n```javascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n```",
      options: ["1 2 3 4", "1 4 2 3", "1 4 3 2", "1 3 4 2"],
      correctAnswer: 2,
      explanation: "Sinxron kodlar (`1` va `4`) birinchi bajariladi. Keyin microtask'lar navbati keladi, shuning uchun `Promise` ning callback kodi (`3`) bajariladi. Eng oxirida macrotask bo'lgan `setTimeout` callback kodi (`2`) bajariladi."
    },
    {
      id: 2,
      question: "Asinxron `async/await` va microtask ketma-ketligi haqidagi ushbu savol javobini toping:\n```javascript\nasync function foo() {\n  console.log('A');\n  await bar();\n  console.log('B');\n}\nasync function bar() {\n  console.log('C');\n}\nconsole.log('D');\nfoo();\nconsole.log('E');\n```",
      options: ["D A C B E", "D A C E B", "D A E C B", "A C D E B"],
      correctAnswer: 1,
      explanation: "1. Birinchi `console.log('D')` ishlaydi. \n2. `foo()` chaqirilagi, uning ichida sinxron ravishda `console.log('A')` ishlaydi. \n3. `await bar()` chaqiriladi, uning ichidagi sinxron qism `console.log('C')` ishlaydi. `await` dan keyingi qism esa (`console.log('B')`) microtask queue'ga yuboriladi va `foo` bajarilishi pauza bo'ladi. \n4. Sinxron navbat davom etib `console.log('E')` ishlaydi. \n5. Sinxron kod tugagach, microtask ishga tushib, `console.log('B')` chiqadi."
    },
    {
      id: 3,
      question: "Prototypes va constructor funksiyalar bo'yicha quyidagi kod natijasini aniqlang:\n```javascript\nfunction Person(name) {\n  this.name = name;\n}\nPerson.prototype.sayName = function() {\n  return this.name;\n};\nconst p1 = new Person('Ali');\nPerson.prototype = { sayName() { return 'Vali'; } };\nconst p2 = new Person('Ali');\nconsole.log(p1.sayName(), p2.sayName());\n```",
      options: ["Ali Vali", "Vali Vali", "Ali Ali", "TypeError"],
      correctAnswer: 0,
      explanation: "`p1` obyekti yaratilgan paytdagi `Person.prototype` ga ishora qiladi. Keyinchalik `Person.prototype` butunlay yangi obyektga almashtirilganda, `p1` ning ichki `[[Prototype]]` havolasi eskisi bo'lib qolaveradi. Yangi yaratilgan `p2` esa yangi prototipga ishora qiladi, shuning uchun `p1.sayName()` 'Ali' (eski metod) va `p2.sayName()` 'Vali' (yangi metod) qaytaradi."
    },
    {
      id: 4,
      question: "Bind qilish bo'yicha quyidagi kod nima chiqaradi?\n```javascript\nfunction sayHi() {\n  console.log(this.name);\n}\nconst user = { name: 'Ali' };\nconst bound = sayHi.bind(user).bind({ name: 'Vali' });\nbound();\n```",
      options: ["Ali", "Vali", "undefined", "TypeError"],
      correctAnswer: 0,
      explanation: "JavaScriptda `bind()` funksiyasi yordamida bog'langan kontekstni ikkinchi marta `bind()` orqali o'zgartirib bo'lmaydi. Birinchi marta bog'langan kontekst (`user`) doimiy bo'lib qoladi."
    },
    {
      id: 5,
      question: "Obyektni muzlatish (freezing) bo'yicha quyidagi kod natijasini toping:\n```javascript\nconst user = { name: 'Ali', details: { age: 25 } };\nObject.freeze(user);\nuser.name = 'Vali';\nuser.details.age = 30;\nconsole.log(user.name, user.details.age);\n```",
      options: ["Ali 25", "Vali 30", "Ali 30", "TypeError"],
      correctAnswer: 2,
      explanation: "`Object.freeze()` obyektdan nusxa olmaydi, uni o'zgartirib bo'lmaydigan qilib qo'yadi. Lekin u sayoz (shallow) ishlaydi, ya'ni faqat birinchi darajali xususiyatlarni muzlatadi. Ichki obyektlar (details) muzlamaydi, shuning uchun `user.name` o'zgarmaydi ('Ali'), lekin `user.details.age` o'zgaradi (30)."
    },
    {
      id: 6,
      question: "Event Loop-da microtask'lar (Microtasks) va macrotask'lar (Macrotasks) bajarilish tartibi qanday?",
      options: [
        "Avval barcha macrotasklar, keyin microtasklar bajariladi",
        "Call Stack bo'shagach, barcha microtasklar bajarilib bo'lingandan keyingina bitta macrotask stackka olinadi",
        "Ular mutlaqo parallel bajariladi",
        "Faqat `setTimeout` birinchi bajariladi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript har doim navbatdagi macrotask (masalan, `setTimeout`) ga o'tishdan oldin microtask queue (masalan, `Promise.then` va `queueMicrotask`) bo'shligini tekshiradi va u yerdagi barcha vazifalarni tugatadi."
    },
    {
      id: 7,
      question: "JavaScriptda Temporal Dead Zone (TDZ) deb nimaga aytiladi?",
      options: [
        "Funksiya stackdan o'chib ketishidan oldingi vaqt oraliqlari",
        "O'zgaruvchi e'lon qilingan block scope boshlanganidan boshlab, to o'zgaruvchining let/const bilan initialization (qiymat olish) qatorigacha bo'lgan vaqt oralig'i (unda o'zgaruvchiga murojaat qilish ReferenceError beradi)",
        "Garbage collector ishlayotgan payt",
        "Asinxron so'rov bajarilib kelgunga qadar bo'lgan kutish jarayoni"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` o'zgaruvchilari hoist bo'ladi, lekin TDZ tufayli ularga o'zgaruvchi e'lon qilingan qatorga yetib borguncha murojaat qilib bo'lmaydi va xato qaytariladi."
    },
    {
      id: 8,
      question: "JavaScript motori (V8) xotirada ishlatilmay qolgan obyektlarni qaysi algoritm yordamida tozalaydi (Garbage Collection)?",
      options: [
        "Reference Counting (faqat)",
        "Mark-and-Sweep (belgilash va supurish)",
        "FIFO (First In First Out)",
        "LIFO (Last In First Out)"
      ],
      correctAnswer: 1,
      explanation: "Hozirgi zamonaviy brauzerlar global root obyektidan boshlab zanjir bo'yicha bog'lanib bo'lmaydigan (unreachable) obyektlarni 'unreachable' deb belgilaydi va xotiradan butunlay tozalaydi (Mark-and-Sweep)."
    },
    {
      id: 9,
      question: "JavaScriptda `[] == ![]` ifodasining natijasi nima bo'ladi?",
      options: [
        "false",
        "true",
        "TypeError",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Bu JavaScript-dagi type coercion qoidalarining o'ziga xosligi. `![]` boolean `false` ga o'giriladi. Shundan so'ng `[] == false` solishtiruvi amalga oshadi, u yerda massiv va boolean raqamga o'girilib `0 == 0` holiga keladi va natija `true` bo'ladi."
    },
    {
      id: 10,
      question: "Funksiyani bir necha bosqichli argumentlar qabul qiladigan zanjirga aylantirish (masalan, `f(a,b)`ni `f(a)(b)`ga) nima deyiladi?",
      options: [
        "Currying",
        "Memoization",
        "Composition",
        "Encapsulation"
      ],
      correctAnswer: 0,
      explanation: "Currying — bu ko'p argumentli funksiyani bittadan argument oladigan bir nechta ketma-ket funksiyalarga ajratish usulidir."
    },
    {
      id: 11,
      question: "Obyektga yangi xossa qo'shishni taqiqlash, mavjudlarini o'chirishni taqiqlash, lekin ularning qiymatini o'zgartirishga ruxsat berish uchun qaysi metod ishlatiladi?",
      options: [
        "`Object.freeze()`",
        "`Object.seal()`",
        "`Object.preventExtensions()`",
        "`Object.lock()`"
      ],
      correctAnswer: 1,
      explanation: "`Object.seal()` ob'ektni muhrlaydi. Muzlatishdan (`Object.freeze`) farqli o'laroq, u mavjud xossalarni qiymatlarini o'zgartirish imkoniyatini saqlab qoladi."
    },
    {
      id: 12,
      question: "Call Stack (funksiyalar chaqiriq steki) xotira hajmi to'lib ketganda (masalan, cheksiz rekursiyada) qanday xatolik yuz beradi?",
      options: [
        "RangeError: Maximum call stack size exceeded",
        "MemoryLimitError",
        "StackOverflowException",
        "TypeError: Overflow"
      ],
      correctAnswer: 0,
      explanation: "JavaScript dvigateli stek hajmi to'lib ketganda dasturni ishdan to'xtatadi va `RangeError: Maximum call stack size exceeded` xatosini beradi."
    }
  ]
};
