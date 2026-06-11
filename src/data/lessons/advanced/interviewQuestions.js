export const interviewQuestionsAdvanced = {
  id: "q3",
  title: "🔴 Interview Savollar (Murakkab)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

O'rta (Intermediate) darajadagi intervyu savollari sizning JavaScript-ni shunchaki ishlatishni emas, balki uning ichki ishlash mexanizmlari (scoping, references, memory, async, ES6+ xususiyatlari) qanday ishlashini bilishingizni tekshiradi. Bu savollar sizning kod sifatini va arxitekturasini tushunishingizni aniqlashga xizmat qiladi.

Buni **avtomobil haydash va uni ta'mirlash** o'rtasidagi farqga o'xshatish mumkin.
- **Boshlang'ich dasturchi:** Rulni buradi, gaz va tormozni bosadi (kod yozadi).
- **O'rta darajadagi dasturchi:** Dvigatel kapotini ochib, u yerda nimalar borligini, qanday ishlashini va biror qism buzilsa, qanday tuzatishni biladi (kod qanday ishlashini tushunadi).

---

## 2. 💻 Real Kod Misollari

Suhbatlarda ko'p so'raladigan amaliy topshiriqlardan biri — massivdan takrorlanuvchi elementlarni o'chirish yoki obyektlarni toza nusxalash:
\`\`\`javascript
// Shallow copy (yuzaki nusxa) spread operatori yordamida:
const original = { name: "Ali", skills: ["JS"] };
const shallowCopy = { ...original };

// Deep copy (chuqur nusxa) JSON yordamida (sodda usul):
const deepCopy = JSON.parse(JSON.stringify(original));
\`\`\`

**1. Quyidagi kod bajarilganda konsolga nima chiqadi?**
\`\`\`javascript
const person = {
  name: "Dilshod",
  greet: function() {
    setTimeout(function() {
      console.log("Salom, " + this.name);
    }, 100);
  }
};
person.greet();
\`\`\`

**Javob:**
\`"Salom, undefined"\`.
- \`setTimeout\` ichidagi funksiya oddiy funksiya bo'lgani uchun u global doirada (yoki window kontekstida) ishlaydi va uning \`this\`i \`person\` obyektiga emas, global obyektga teng bo'ladi. Global obyektda \`name\` yo'qligi uchun \`undefined\` chiqadi.
- Buni to'g'rilash uchun arrow funksiyadan foydalanish kerak: \`setTimeout(() => { console.log("Salom, " + this.name); }, 100);\` (arrow funksiya o'zining \`this\`iga ega emas va tashqi \`greet\` metodining \`this\`ini oladi).

**2. Quyidagi kod nima chiqishini tushuntiring:**
\`\`\`javascript
const obj = { a: 1, b: { c: 2 } };
const clone = { ...obj };
clone.a = 10;
clone.b.c = 20;

console.log(obj.a);
console.log(obj.b.c);
\`\`\`

**Javob:**
\`1\` va \`20\`.
- Spread operatori (\`...\`) yuzaki nusxa (\`shallow copy\`) oladi. Birinchi darajali \`a\` xossasi qiymat bo'yicha ko'chiriladi, shuning uchun \`clone.a\` o'zgarganda \`obj.a\` o'zgarmasdan \`1\`ligicha qoladi.
- Ammo ichki obyekt \`b\` referens (manzil) bo'yicha nusxalanadi. Ikkala obyekt ham bitta ichki \`b\` obyektiga ishora qiladi. Shuning uchun \`clone.b.c = 20\` qilinganda \`obj.b.c\` ham \`20\` ga aylanadi.

**3. Quyidagi destructuring va default qiymat kodi nima natija beradi?**
\`\`\`javascript
const { name = "Guest", age = 18 } = { name: null, age: undefined };
console.log(name, age);
\`\`\`

**Javob:**
\`null 18\`.
- JavaScript-da default qiymat faqat va faqat qiymat mutlaqo berilmaganda yoki \`undefined\` bo'lgandagina ishga tushadi.
- \`name\` uchun \`null\` berilgan, shuning uchun u default qiymatni olmaydi va \`null\`ligicha qoladi.
- \`age\` uchun \`undefined\` berilgan, shuning uchun u default qiymat bo'lgan \`18\` ni oladi.

**4. Quyidagi kod bajarilganda konsolga nimalar chiqadi?**
\`\`\`javascript
const arr = [1, 2, 3];
const [x, , z] = arr;
console.log(x, z);
\`\`\`

**Javob:**
\`1 3\`. Bu massiv destructuring yordamida elementlarni o'tkazib yuborishdir. Ikkinchi element tashlab ketiladi va uning o'rniga vergul qo'yiladi.

**5. Quyidagi kodning natijasi nima bo'ladi?**
\`\`\`javascript
const numbers = [1, 2, 3, 4];
const result = numbers
  .filter(n => n > 2)
  .reduce((acc, curr) => acc + curr, 10);
console.log(result);
\`\`\`

**Javob:**
\`17\`.
- \`.filter(n => n > 2)\` massivdan faqat \`3\` va \`4\` elementlarini saqlab qoladi (\`[3, 4]\`).
- \`.reduce((acc, curr) => acc + curr, 10)\` metodida boshlang'ich qiymat \`10\` ga teng.
- Iteratsiya: \`10 + 3 = 13\`, so'ngra \`13 + 4 = 17\`.

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

O'rta darajadagi JavaScript suhbatlarida asosan quyidagi mavzularda savollar beriladi:
- **Kontekst va this:** Arrow funksiyalar va oddiy funksiyalar farqlari, binding usullari (\`call\`, \`apply\`, \`bind\`).
- **ES6+ yangiliklari:** Destructuring, Rest/Spread operatorlari, Template Literals, default qiymatlar.
- **Havola va Qiymat (Reference vs Value):** Obyekt va massivlar bilan ishlashda xotira havolalari, shallow vs deep cloning.
- **Asosiy asinxronlik:** Callback va oddiy Promiselarni tushunish.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

- **Obyekt referensini unutish:** \`let a = {}; let b = a; b.x = 10;\` qilinganda \`a.x\` ham 10 bo'lishini tushunmaslik.
- **typeof operatorining "tuzoqlari":** \`typeof null\` -> \`"object"\` ekanligini, hamda \`typeof NaN\` -> \`"number"\` ekanligini hisobga olmaslik.
- **Arrow function ichida this ishlatish:** Uning shaxsiy \`this\`i yo'qligi sababli metod yozishda uni ehtiyotkorlik bilan qo'llash lozim.

---

## 5. 💬 12 ta Intervyu Savollari

**1. Arrow function va oddiy function farqi nima?**
Arrow funksiyalarda o'zining \`this\`, \`arguments\` va konstruktori bo'lmaydi. Ular \`this\`ni lexical scope-dan (tashqaridan) oladi.

**2. Destructuring nima?**
Massiv yoki obyekt ichidagi elementlarni alohida o'zgaruvchilarga tezkor ajratib olish sintaksisi.

**3. Spread va Rest operatorlarining farqi nimada?**
Spread (\`...\`) yig'ilgan ma'lumotlarni alohida bo'laklarga yoyib yuboradi. Rest (\`...\`) esa alohida argumentlarni bitta massivga yig'ib oladi.

**4. typeof null natijasi nima uchun 'object'?**
Bu JavaScript tilining ilk versiyalaridagi xatolik (bug) bo'lib, keyinchalik orqaga moslikni buzmaslik uchun o'zgartirilmagan.

**5. NaN nima va uning turi nima?**
NaN - "Not a Number" (Son emas), turi esa \`"number"\` hisoblanadi. U noto'g'ri matematik amallar natijasida hosil bo'ladi.

**6. == va === operatorlari farqi nima?**
\`==\` (kuchsiz tenglik) ma'lumot turlarini avtomatik konvertatsiya qilib solishtiradi. \`===\` (qat'iy tenglik) esa turlarini o'zgartirmasdan, qiymat va turini birdek tekshiradi.

#

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy mashqlar quyida exercises bo'limida berilgan. Ularni bajarib ko'nikmalaringizni sinab ko'ring.

---

## 7. 📝 12 ta Mini Test

Dars oxirida quizzes bo'limidagi testlar orqali bilimingizni tekshirib oling.

---

## 8. 🎯 Real Project Case Study

### Case Study: Custom Promise.all Implementation
Suhbatlarda eng ko'p so'raladigan asinxron polifil yozish masalasi:
\`\`\`javascript
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const results = [];
    promises.forEach((p, index) => {
      Promise.resolve(p).then(val => {
        results[index] = val;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
sequenceDiagram
    participant CS as Call Stack
    participant MT as Microtask Queue
    participant MacT as Macrotask Queue
    CS->>MT: Microtask qo'shish
    CS->>MacT: Macrotask qo'shish
    Note over CS: Call Stack bo'shaydi
    CS->>MT: Barcha Microtask-larni bajarish
    CS->>MacT: Navbatdagi BITTA Macrotask-ni bajarish
\`\`\`

---

## 10. 📌 Cheat Sheet

| Amaliyot | Natija | Tushuntirish |
| :--- | :--- | :--- |
| **[] == ![]** | \`true\` | Coercion qoidalari bo'yicha |
| **typeof NaN** | \`"number"\` | Son emas, lekin turi son |
| **Object.freeze** | Yuzaki muzlatish | Ichki obyektlar muzlamaydi |
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
    "id": 1,
    "question": "Obyekt havolasi bo'yicha quyidagi kod nima natija beradi?\n```javascript\nlet a = { name: \"Ali\" };\nlet b = a;\nb.name = \"Vali\";\nconsole.log(a.name);\n```",
    "options": [
      "Ali",
      "Vali",
      "undefined",
      "ReferenceError"
    ],
    "correctAnswer": 1,
    "explanation": "Obyektlar xotiradagi manzili (reference) bo'yicha uzatiladi. `b = a` qilinganda ikkala o'zgaruvchi bitta obyektga ishora qiladi, shuning uchun b.name o'zgarganda a.name ham o'zgaradi."
  },
  {
    "id": 2,
    "question": "Quyidagi kod nima chiqaradi?\n```javascript\nconst obj = { \n  name: \"Ali\",\n  sayHi: () => console.log(this.name),\n  sayHi2() { console.log(this.name) }\n};\nobj.sayHi();\nobj.sayHi2();\n```",
    "options": [
      "Ali va Ali",
      "undefined va Ali",
      "Ali va undefined",
      "undefined va undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow functionlar o'zining `this` kontekstiga ega bo'lmaydi va tashqi global scope kontekstini oladi, global scope'da `name` yo'q bo'lsa `undefined` chiqadi. Oddiy metod `sayHi2` esa `obj` kontekstida chaqirilgani uchun `this.name` -> \"Ali\" bo'ladi."
  },
  {
    "id": 3,
    "question": "Destructuring bo'yicha quyidagi kod natijasini toping:\n```javascript\nconst { a = 10, b = 20 } = { a: null, b: undefined };\nconsole.log(a, b);\n```",
    "options": [
      "10 20",
      "null 20",
      "10 undefined",
      "null undefined"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScriptda default qiymat faqat qiymat `undefined` bo'lgandagina ishlaydi. `a: null` bo'lgani uchun u default qiymatni olmaydi va `null`ligicha qoladi, `b` esa `undefined` bo'lgani uchun default `20` ni oladi."
  },
  {
    "id": 4,
    "question": "Spread operatori bo'yicha ushbu kod natijasini aniqlang:\n```javascript\nconst user = { name: \"Vali\", details: { age: 25 } };\nconst updated = { ...user };\nupdated.details.age = 30;\nconsole.log(user.details.age);\n```",
    "options": [
      "25",
      "30",
      "undefined",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Spread operatori (`...`) faqat shallow copy (yuzaki nusxa) yaratadi. Ichki obyektlar (details) nusxalanmaydi, balki ularning havolasi o'tadi, shuning uchun `updated.details.age` o'zgarganda aslidagi ham o'zgaradi."
  },
  {
    "id": 5,
    "question": "Loop ichida closure muammosi haqida ushbu kod nima chiqaradi?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n```",
    "options": [
      "0 1 2",
      "3 3 3",
      "2 2 2",
      "undefined undefined undefined"
    ],
    "correctAnswer": 1,
    "explanation": "`var` o'zgaruvchisi function/global scopega ega. `setTimeout` asinxron bo'lgani uchun u ishlaguncha loop tugab, `i` ning qiymati `3` bo'lib ulguradi va barcha callbacklar `3` ni chiqaradi. Agar `let` ishlatilganda, har bir qadam uchun yangi scope yaratilib, `0 1 2` chiqardi."
  },
  {
    "id": 6,
    "question": "JavaScriptda `==` (kuchsiz tenglik) va `===` (qat'iy tenglik) operatorlari o'rtasidagi farq nima?",
    "options": [
      "`==` faqat sonlarni, `===` esa faqat stringlarni solishtiradi",
      "`==` solishtirishdan oldin ma'lumot turlarini konvertatsiya qiladi, `===` esa turlarni o'zgartirmasdan solishtiradi",
      "`===` tezroq ishlaydi",
      "Hech qanday farqi yo'q, ikkalasi ham bir xil solishtiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`==` taqqoslashda turlarni avtomatik tarzda majburiy moslashtiradi (type coercion). `===` esa ham qiymat, ham uning ma'lumot turini qat'iy tengligini tekshiradi."
  },
  {
    "id": 7,
    "question": "Quyidagi kodning natijasi nima bo'ladi?\n```javascript\nconsole.log(typeof NaN);\n```",
    "options": [
      "\"number\"",
      "\"NaN\"",
      "\"undefined\"",
      "\"object\""
    ],
    "correctAnswer": 0,
    "explanation": "NaN — 'Not a Number' (son emas) degan ma'noni bildirsa-da, u JavaScript tip tizimida sonli qiymat hisoblanadi, shuning uchun uning turi `\"number\"` chiqadi."
  },
  {
    "id": 8,
    "question": "JavaScriptda `[1, 2] + [3, 4]` amali bajarilganda nima natija qaytadi?",
    "options": [
      "[1, 2, 3, 4]",
      "\"1,23,4\"",
      "TypeError",
      "\"1,2,3,4\""
    ],
    "correctAnswer": 3,
    "explanation": "JavaScriptda massivlarni qo'shish operatori (`+`) ishlatilganda, massivlar avval stringga o'giriladi (`\"1,2\"` va `\"3,4\"`), keyin esa ular birlashtiriladi: `\"1,23,4\"`."
  },
  {
    "id": 9,
    "question": "Agar `Array.prototype.map()` metodining callback funksiyasi hech qanday qiymat qaytarmasa (yani undefined bo'lsa), map metodining qaytargan massivida nimalar bo'ladi?",
    "options": [
      "Bo'sh massiv qaytadi",
      "Barcha elementlar o'zgarishsiz qoladi",
      "Har bir element uchun `undefined` bo'lgan yangi massiv qaytadi",
      "Xatolik yuz beradi (TypeError)"
    ],
    "correctAnswer": 2,
    "explanation": "`map()` metodi har doim kiruvchi massiv bilan bir xil uzunlikdagi massiv qaytaradi. Har bir element callback funksiyasi qaytargan qiymatga teng bo'ladi, agar callback hech narsa qaytarmasa, u `undefined` qaytaradi, mos ravishda natijaviy massiv elementlari `undefined`dan iborat bo'ladi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod strict rejimda ('use strict') ishga tushirilganda nima sodir bo'ladi?\n```javascript\nconst obj = { a: 1 };\nObject.freeze(obj);\nobj.a = 2;\n```",
    "options": [
      "Natijasiz o'tib ketadi va obj.a o'zgarmasdan qoladi",
      "TypeError xatoligi yuz beradi",
      "obj.a ning qiymati 2 ga o'zgaradi",
      "SyntaxError yuz beradi"
    ],
    "correctAnswer": 1,
    "explanation": "`Object.freeze()` obyektni butunlay muzlatib, unga yangi xossa qo'shish, o'chirish yoki qiymatini o'zgartirishni taqiqlaydi. Strict rejimda muzlatilgan obyektni o'zgartirishga urinish `TypeError` xatoligini keltirib chiqaradi."
  },
  {
    "id": 11,
    "question": "Quyidagi ifodaning natijasini toping:\n```javascript\nconsole.log(1 + \"2\" + 3);\n```",
    "options": [
      "6",
      "\"123\"",
      "\"15\"",
      "\"6\""
    ],
    "correctAnswer": 1,
    "explanation": "Amallar chapdan o'ngga bajariladi. Avval `1 + \"2\"` string kontatenatsiyasi bajarilib `\"12\"` hosil bo'ladi, keyin unga `3` qo'shiladi va yakuniy natija `\"123\"` string bo'ladi."
  },
  {
    "id": 12,
    "question": "`null` va `undefined` orasidagi asosiy farq nima?",
    "options": [
      "Ikkalasi mutlaqo bir xil narsani anglatadi",
      "`undefined` o'zgaruvchining e'lon qilingani ammo qiymat berilmaganligini anglatadi, `null` esa qasddan bo'sh qoldirilgan qiymatni bildiradi",
      "`null` sonli qiymat, `undefined` esa string hisoblanadi",
      "`null` turi `undefined`, `undefined` turi esa `null`dir"
    ],
    "correctAnswer": 1,
    "explanation": "`undefined` — tizim yoki JavaScript tomonidan qiymat berilmaganligini ko'rsatuvchi default holat. `null` esa dasturchi tomonidan obyekt yoki qiymat yo'qligini qasddan ko'rsatish uchun beriladigan qiymatdir."
  }
]
};
