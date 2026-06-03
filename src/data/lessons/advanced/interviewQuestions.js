export const interviewQuestionsAdvanced = {
  id: "q3",
  title: "🔴 Interview Savollar (Murakkab)",
  theory: `## 1. NEGA kerak?
Ilg'or (Advanced) darajadagi texnik suhbatlar sizning nafaqat JavaScript sintaksisini, balki JavaScript motorining (V8) xotirani boshqarishi, asinxron hodisalar arxitekturasi (Event Loop), kodni optimallashtirish va xavfsizlik kabi murakkab fundamental tushunchalarni qay darajada bilishingizni tekshiradi. Ushbu darsda biz Event Loop-dagi mikrotasklar va makrotasklar navbati, V8 motorining ishlash quvuri (pipeline), prototype zanjiri qidiruvi va maxsus polifillar yozish texnikasini chuqur tahlil qilamiz.

## 2. SODDALIK (Analogiya)
Buni **avtopoygachi va mexanik** analogiyasiga o'xshatish mumkin.
- O'rta darajadagi dasturchi — avtomobilni tez va to'g'ri boshqaradigan haydovchidir.
- Ilg'or dasturchi (Senior) — avtomobilning aerodinamikasi, shinalarining qizishi, dvigatelning xotira (yoqilg'i) taqsimoti va xavfsizlik tizimlarini to'liq tushunadigan hamda poyga paytida har qanday nosozlikni hal eta oladigan muhandis-haydovchidir.

## 3. STRUKTURA VA PRINTSIPLAR

### A. Event Loop: Microtasks va Macrotasks Prioriteti
JavaScript bir oqimli (single-threaded) til bo'lib, asinxronlikni Event Loop orqali boshqaradi. Biroq, asinxron vazifalar bir xil ahamiyatga ega emas:
1. **Microtask Queue:** Tez bajarilishi kerak bo'lgan vazifalar uchun. Bunga \`Promise.then/catch/finally\`, \`queueMicrotask\`, va \`MutationObserver\` kiradi.
2. **Macrotask Queue (Task Queue):** Brauzer/Node tomonidan rejalashtiriladigan tashqi amallar. Bunga \`setTimeout\`, \`setInterval\`, \`setImmediate\` (Node), I/O amallari va UI hodisalari kiradi.
3. **Ustuvorlik:** Call Stack bo'shashi bilan, Event Loop avval **Microtask Queue-dagi barcha** vazifalarni (ular bajarilish davomida yangi mikrotasklar qo'shsa ham) to'liq tugatadi. Shundan keyingina Macrotask Queue-dan **bitta** vazifani olib bajaradi.

\`mermaid
sequenceDiagram
    participant CS as Call Stack
    participant MT as Microtask Queue (Promises, queueMicrotask)
    participant MacT as Macrotask Queue (setTimeout, UI events)
    participant Render as Render Queue (Screen repaint)

    CS->>CS: Sinxron kodlarni bajarish
    CS->>MT: Microtask-larni navbatga qo'shish
    CS->>MacT: Macrotask-larni navbatga qo'shish
    Note over CS: Call Stack bo'shaydi
    CS->>MT: Barcha Microtask-larni bajarish (Queue bo'shaguncha)
    MT->>CS: Callback-larni bajarish
    Note over CS: Microtask-lar tugadi
    CS->>Render: Ekran yangilanishi (agar kerak bo'lsa)
    CS->>MacT: Navbatdagi BITTA Macrotask-ni bajarish
    MacT->>CS: Callback-ni stack-ga o'tkazish
\`

### B. V8 Engine Compilation Pipeline
V8 JavaScript kodini quyidagi bosqichlarda bajaradi:
1. **Parser & AST:** Kod matni o'qilib, sintaktik tahlil qilinadi va **Abstract Syntax Tree (AST)** daraxti tuziladi.
2. **Ignition Interpreter:** AST asosida tezda **Bytecode** generatsiya qilinadi va kod darhol bajarila boshlaydi. Ignition xotirani tejaydi va tez ishga tushadi.
3. **TurboFan Compiler:** Ishga tushirish jarayonida ko'p bajariladigan, issiq ("hot") funksiyalar aniqlanadi. TurboFan ularni to'g'ridan-to'g'ri o'ta optimallashgan **Mashina kodiga (Machine Code)** o'tkazadi.
4. **Deoptimization:** Agar optimallashtirilgan kod kutilmaganda boshqa tipdagi o'zgaruvchini qabul qilsa (masalan, har doim \`number\` oladigan funksiyaga \`string\` kelib qolsa), TurboFan optimallikdan voz kechadi (deoptimization) va yana Ignition bytekodiga qaytadi.

\`mermaid
graph TD
    %% Styling
    classDef source fill:#2c3e50,stroke:#34495e,stroke-width:2px,color:#fff;
    classDef parser fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:#fff;
    classDef interpreter fill:#d35400,stroke:#e67e22,stroke-width:2px,color:#fff;
    classDef compiler fill:#2980b9,stroke:#3498db,stroke-width:2px,color:#fff;
    classDef machine fill:#27ae60,stroke:#2ecc71,stroke-width:2px,color:#fff;

    Src["JavaScript Source Code"]:::source
    Parser["Parser & AST (Abstract Syntax Tree)"]:::parser
    Ignition["Ignition Interpreter (Bytecode)"]:::interpreter
    TurboFan["TurboFan Compiler (Optimized Machine Code)"]:::compiler
    Exec["CPU Execution"]:::machine

    Src --> Parser
    Parser --> Ignition
    Ignition --> Exec
    Ignition -- "Hot Code (Tez-tez ishlaydigan kod)" --> TurboFan
    TurboFan --> Exec
    TurboFan -- "Deoptimization (Kutilmagan tip o'zgarishi)" --> Ignition
\`

### C. Prototype Chain (Prototiplar zanjiri) Lookup
JavaScript-da har bir obyekt o'zining yashirin \`[[Prototype]]\` (ya'ni \`__proto__\`) xususiyatiga ega. 
- Obyektdan biron xususiyat yoki metod qidirilganda, JS avval obyektning o'zidan qidiradi.
- Topilmasa, uning prototipiga o'tadi va to zanjir oxiri (\`null\`ga yetguncha) qidiruvni davom ettiradi.
- **Optimallashtirish:** Dvigatellar prototype chain lookup jarayonini tezlashtirish uchun **Hidden Classes (Shapes)** va **Inline Caches (IC)** dan foydalanadi. Obyekt tuzilishi dynamic o'zgarganda (delete yoki yangi xossa qo'shilganda) hidden class o'zgaradi va lookup sekinlashadi.

### D. Custom Array Implementations (Polifillar)
Intervyularda ko'p beriladigan masalalardan biri — massiv metodlarining polifillarini (polyfills) qo'lda yozish. Custom metodlar yozishda \`thisArg\` orqali kontekstni uzatish va uning to'g'ri qo'llanilishini ta'minlash muhimdir:
\`javascript
Array.prototype.myMap = function(callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Massivdagi bo'sh elementlarni (sparse elements) tashlab ketish uchun
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return result;
};
\`

## 4. XATOLAR (Common mistakes)
- **Microtask va Macrotask navbatini chalkashtirish:** \`Promise.then\` va \`setTimeout\` asinxron bo'lsa-da, ularning bajarilish navbati bir-biridan butunlay farq qilishini unutish.
- **Muzlatilgan obyektning yuzaki (shallow) ekanligi:** \`Object.freeze\` faqat birinchi darajali xossalarni muzlatadi, ichki obyektlarni esa bemalol o'zgartirish mumkinligini hisobga olmaslik.
- **Memory Leak yaratish:** Chaqirilgan \`setInterval\`larni o'chirmaslik yoki global o'zgaruvchilarda ortiqcha ma'lumotlarni saqlab qolish.

## 5. SAVOLLAR VA JAVOBLAR
**1. Event Loop qanday ishlaydi?**
Event Loop call stack bo'shligini tekshiradi, keyin microtask queue (Promises) dagi barcha vazifalarni bajaradi, va nihoyat task queue (setTimeout) dagi bitta vazifani stackka olib chiqadi.

**2. Debounce va Throttle farqi nima?**
Debounce ketma-ket chaqiriqlarni kechiktirib, faqat oxirgisidan keyin ishlaydi. Throttle esa belgilangan vaqt oralig'ida faqat bir marta ishlashni ta'minlaydi.

**3. JavaScriptda Garbage Collector qanday ishlaydi?**
U asosan "Mark-and-Sweep" (belgilash va o'chirish) algoritmi yordamida ishlaydi. Dastur ildizidan (global scope) kirib bo'lmaydigan obyektlar xotiradan tozalab tashlanadi.

**4. V8 motorida Ignition va TurboFan rollari qanday?**
Ignition vaqtinchalik AST-ni bytecode-ga o'girib ishga tushiradi, TurboFan esa tez-tez chaqiriladigan "hot" kodlarni optimallashgan mashina kodiga o'tkazib, tezlikni oshiradi.

### 6. AMALIY SAVOLLAR VA JAVOBLAR (Kod misollari)

**1. Quyidagi asinxron kod bajarilganda konsolga nimalar qaysi tartibda chiqadi?**
\`\`\`javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
  queueMicrotask(() => {
    console.log("Microtask ichida");
  });
}).then(() => {
  console.log("Promise 2");
});

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");
\`\`\`

**Javob:**
\`\`\`text
Start
End
Promise 1
Microtask ichida
Promise 2
Timeout 1
Timeout 2
\`\`\`
**Tushuntirish:**
1. Sinxron kodlar birinchi navbatda Call Stack-da bajariladi: \`"Start"\` va keyin \`"End"\`.
2. Asinxron operatsiyalar navbatga olinadi:
   - \`Timeout 1\` va \`Timeout 2\` -> **Macrotask Queue**.
   - \`Promise 1\` -> **Microtask Queue**.
3. Call Stack bo'shagach, barcha microtask-lar bajariladi:
   - Avval \`Promise 1\` bajariladi. Uning ichida yangi mikrotask (\`Microtask ichida\`) navbat oxiriga qo'shiladi va keyingi \`.then\` (\`Promise 2\`) ham navbatga qo'shiladi.
   - Microtask navbati bo'shaguncha ishlaganligi sababli, \`"Microtask ichida"\` va \`"Promise 2"\` ham bajarilib ketadi.
4. Microtask navbati bo'shagach, navbat macrotask-larga keladi. Birinchi makrotask \`"Timeout 1"\`, undan keyin esa \`"Timeout 2"\` bajariladi.

**2. Quyidagi kod nima chiqaradi va nega?**
\`\`\`javascript
function Person(name) {
  this.name = name;
}
const p1 = new Person("Anvar");

Person.prototype = {
  sayHello() {
    return "Salom, " + this.name;
  }
};

const p2 = new Person("Sardor");

try {
  console.log(p1.sayHello());
} catch(e) {
  console.log("Xatolik 1");
}

try {
  console.log(p2.sayHello());
} catch(e) {
  console.log("Xatolik 2");
}
\`\`\`

**Javob:**
\`"Xatolik 1"\` va \`"Salom, Sardor"\`.
- \`p1\` obyekti yaratilgan paytda \`Person.prototype\` bo'sh obyekt edi. \`p1\`ning ichki \`[[Prototype]]\` havolasi o'sha eski prototip obyektiga bog'langan.
- Keyingi qatorda \`Person.prototype\` butunlay yangi obyektga (\`{ sayHello() { ... } }\`) almashtirildi. Bu eski \`p1\` obyektining prototipini o'zgartirmaydi (chunki u eski xotira manziliga ishora qilmoqda).
- Shuning uchun \`p1.sayHello()\` chaqirilganda metod topilmaydi va \`TypeError\` (xatolik) sodir bo'ladi, bu esa \`"Xatolik 1"\`ni chiqaradi.
- Yangi yaratilgan \`p2\` esa yangilangan prototip bilan bog'lanadi, shuning uchun \`p2.sayHello()\` muvaffaqiyatli ishlaydi va \`"Salom, Sardor"\` qaytaradi.

**3. Quyidagi kodda xotira muammosi (Memory Leak) bormi? Bo'lsa, uni qanday tuzatish mumkin?**
\`\`\`javascript
function setupHandler() {
  const largeData = new Array(1000000).fill("data");
  const button = document.getElementById("my-button");
  
  button.addEventListener("click", function() {
    console.log("Button clicked!");
  });
}
setupHandler();
\`\`\`

**Javob:**
Ha, bu yerda yashirin **Memory Leak** yuzaga kelishi mumkin (ayniqsa eski brauzerlarda yoki dynamic elementlar o'chirilganda).
- **Sababi:** Button-ga qo'shilgan click handler funksiyasi closure (yopilish) tufayli \`setupHandler\` ning butun lexical scope-iga bog'lanadi. Garchi \`largeData\` funksiya ichida ishlatilmagan bo'lsa-da, ba'zi JS dvigatellari butun scope-ni xotirada saqlab qolishi mumkin.
- **Tuzatish:** Ishlatilmagan o'zgaruvchilarni funksiya tugashidan oldin \`null\` qilish yoki event handler-ni alohida funksiya sifatida e'lon qilib, click tugagach handler-ni o'chirib tashlash (\`removeEventListener\`). Yaxshiroq yechim:
\`\`\`javascript
function setupHandler() {
  let largeData = new Array(1000000).fill("data");
  const button = document.getElementById("my-button");
  
  button.addEventListener("click", function() {
    console.log("Button clicked!");
  });
  largeData = null; // garbage collector tozalashi uchun xotirani bo'shatamiz
}
\`\`\`

**4. Quyidagi kod nima chiqaradi va nega?**
\`\`\`javascript
const original = {
  a: 1,
  b: { c: 2 },
  d: function() { return 5; }
};
const clone = JSON.parse(JSON.stringify(original));
console.log("d" in clone);
console.log(clone.b === original.b);
\`\`\`

**Javob:**
\`false\` va \`false\`.
- \`JSON.parse(JSON.stringify(original))\` usuli obyektni **Deep Clone** (chuqur nusxalash) qilishda ishlatiladi, shuning uchun \`clone.b\` va \`original.b\` boshqa-boshqa obyektlar bo'ladi (\`clone.b === original.b\` -> \`false\`).
- Ammo JSON formati funksiyalarni (\`function\`, \`arrow function\`), \`undefined\` qiymatlarni va \`Symbol\`larni qo'llab-quvvatlamaydi. Serializatsiya paytida \`d\` funksiyasi butunlay o'chib ketadi, shuning uchun \`clone\` obyektida \`d\` kaliti mavjud bo'lmaydi (\`"d" in clone\` -> \`false\`).
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
      instruction: "Ma'tundan keyin chaqiriluvchi sodda 'debounce(fn, delay)' funksiyasini yozing.",
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
    },
    {
      id: 13,
      title: "Custom Filter Polyfill (myFilter)",
      instruction: "`Array.prototype.filter` polifillini original `.filter` funksiyasidan foydalanmagan holda `Array.prototype.myFilter` nomi ostida e'lon qiling va uning ishlashini tekshiring. Funksiya callback qabul qilishi va callback-ni `thisArg` konteksti bilan chaqirish imkoniyatiga ega bo'lishi shart.",
      startingCode: "Array.prototype.myFilter = function(callback, thisArg) {\n  // Custom filter implementatsiyasini yozing\n};",
      hint: "const result = [];\nfor (let i = 0; i < this.length; i++) {\n  if (i in this) {\n    if (callback.call(thisArg, this[i], i, this)) {\n      result.push(this[i]);\n    }\n  }\n}\nreturn result;",
      test: "const arr = [1, 2, 3, 4];\nconst filtered = arr.myFilter(x => x > 2);\nconst empty = [].myFilter(() => true);\nif (Array.isArray(filtered) && filtered[0] === 3 && filtered[1] === 4 && filtered.length === 2 && Array.isArray(empty) && empty.length === 0) {\n  const context = { limit: 2 };\n  const filterWithThis = arr.myFilter(function(x) { return x > this.limit; }, context);\n  if (filterWithThis.length === 2 && filterWithThis[0] === 3 && filterWithThis[1] === 4) {\n    return null;\n  }\n}\nreturn 'myFilter to\\'g\\'ri ishlamadi yoki thisArg konteksti qo\\'llab-quvvatlanmadi';"
    },
    {
      id: 14,
      title: "Asinxron Microtask Scheduler (scheduleMicrotask)",
      instruction: "Brauzer yoki Node.js muhitlarida microtask navbatiga vazifa qo'shuvchi `scheduleMicrotask(callback)` funksiyasini yozing. Agar platformada `queueMicrotask` mavjud bo'lsa undan, aks holda `Promise.resolve().then(...)` dan, u ham bo'lmasa fallback sifatida `setTimeout` dan foydalanilsin.",
      startingCode: "function scheduleMicrotask(callback) {\n  // Microtask navbatiga qo'shish funksiyasini yozing\n}",
      hint: "if (typeof queueMicrotask === 'function') {\n  queueMicrotask(callback);\n} else if (typeof Promise === 'function') {\n  Promise.resolve().then(callback);\n} else {\n  setTimeout(callback, 0);\n}",
      test: "let order = [];\nscheduleMicrotask(() => order.push('micro'));\nsetTimeout(() => order.push('macro'), 0);\nPromise.resolve().then(() => order.push('promise'));\nreturn new Promise(resolve => {\n  setTimeout(() => {\n    if (order[0] === 'micro' && order[1] === 'promise' && order[2] === 'macro') {\n      resolve(null);\n    } else {\n      resolve('scheduleMicrotask microtask queue-da vaqtida ishga tushmadi. Kutilgan tartib: micro, promise, macro. Lekin olindi: ' + order.join(', '));\n    }\n  }, 20);\n});"
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
      explanation: "`let` va `const` o'zgaruvchilari hoist bo'ladi, lekin TDZ tufayli ularga o'zgaruvchi e'lon qilingan qatorga yetib borguncha murojaat qibly bo'lmaydi va xato qaytariladi."
    },
    {
      id: 8,
      question: "JavaScript motori (V8) xotirada ishlatilmay qolgan obyektlarni qaysi algoritm yordamida tozalaydi (Garbage Collection)?",
      options: [
        "Reference Counting (faqat)",
        "Mark-and-Sweep (belgilash va supurish)",
        "FIFO (First In First Out)",
        "LILO (Last In, Last Out)"
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
    },
    {
      id: 13,
      question: "V8 Engine optimallashtirish pipeline-ida nima uchun TurboFan kompilyatori ishlatiladi?",
      options: [
        "AST (Abstract Syntax Tree) yaratish uchun",
        "Tez-tez ishlatiladigan (hot) kodlarni optimallashtirilgan mashina kodiga o'tkazish uchun",
        "Koddagi sintaktik xatolarni topish uchun",
        "Call Stack xotirasini tozalash uchun"
      ],
      correctAnswer: 1,
      explanation: "V8 motorining TurboFan kompilyatori ko'p marta bajariladigan ('hot') JavaScript kodini to'g'diran-to'g'ri tezkor mashina kodiga kompilyatsiya qiladi va optimallashtiradi. Agar kodning ishlash contexti o'zgarsa (deoptimization), u yana Ignition interpreteriga qaytariladi."
    },
    {
      id: 14,
      question: "Event Loop-da quyidagi kod qaysi tartibda konsolga yozadi?\n```javascript\nsetTimeout(() => console.log('Macro'), 0);\nqueueMicrotask(() => console.log('Micro'));\nconsole.log('Sync');\n```",
      options: [
        "Sync Micro Macro",
        "Sync Macro Micro",
        "Micro Sync Macro",
        "Macro Sync Micro"
      ],
      correctAnswer: 0,
      explanation: "Sinxron kod ('Sync') birinchi navbatda Call Stack-da bajariladi. Sinxron kod tugashi bilan Call Stack bo'shagach, microtask queue ('Micro') to'liq tugatiladi. Shundan so'ng macrotask queue-dagi setTimeout ('Macro') bajariladi."
    }
  ]
};
