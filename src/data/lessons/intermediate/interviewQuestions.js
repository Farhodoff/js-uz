export const interviewQuestionsIntermediate = {
  id: "q2",
  title: "🟡 Interview Savollar (O'rta daraja)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

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

### Case Study: Memory Leak with Event Listeners & Closures
Suhbatlarda ko'p so'raladigan real holat:
\`\`\`javascript
function attachEventHandlers() {
  const elements = document.querySelectorAll('.item');
  const largeData = new Array(1000000).fill("data");
  
  elements.forEach((el, index) => {
    el.addEventListener('click', () => {
      console.log("Clicked item:", index);
      // 'largeData' ishlatilmagan bo'lsa ham closure tufayli xotirada qolib ketadi!
    });
  });
}
\`\`\`

---

## 9. 🧠 Vizual ko'rinish (Architecture Diagram)

\`\`\`mermaid
graph TD
    subgraph Intermediate_Concepts ["O'rta Darajadagi Konseptlar"]
        Scopes["Ko'rinish Sohalari (Scope Chain / Lexical)"]
        Refs["Reference vs Value (Memory Allocation)"]
        Closures["Closures (Yopilishlar & State Preservation)"]
        Async["Async Basics (Callbacks, Web APIs)"]
    end
    
    Scopes --> Closures
    Refs --> Closures
    Closures --> Async
\`\`\`

---

## 10. 📌 Cheat Sheet

| Mavzu | Tushuntirish | Misol |
| :--- | :--- | :--- |
| **Closure** | Tashqi funksiya scope-iga kirish | \`const counter = () => { let c = 0; return () => ++c; }\` |
| **Reference** | Obyektlar havola bo'yicha uzatiladi | \`let a = {}; let b = a; b.x = 1;\` (a.x ham 1 bo'ladi) |
| **typeof null** | JS ning tarixiy bugi, object qaytaradi | \`typeof null === 'object'\` |
`,
  exercises: [
    {
      id: 1,
      title: "Unique Elements",
      instruction: "Massivdan takrorlanuvchi elementlarni Set yordamida o'chiring.",
      startingCode: "const data = [10, 20, 10, 30, 20];\n// Unique massiv yarating\nconst unique = [];\nconsole.log(unique);",
      hint: "const unique = [...new Set(data)];",
      test: "if (code.includes('Set') && code.includes('...')) return null; return 'Set va spread operatoridan foydalaning';"
    },
    {
      id: 2,
      title: "Shallow Copy",
      instruction: "Spread operatoridan foydalanib 'user' obyektining nusxasini 'clone' o'zgaruvchisiga oling.",
      startingCode: "const user = { name: 'Ali', age: 25 };\n// user nusxasini oling\nconst clone = {};",
      hint: "const clone = { ...user };",
      test: "if (code.includes('...') && code.includes('user')) return null; return 'Spread operatorini user bilan ishlating';"
    },
    {
      id: 3,
      title: "Sum with Rest",
      instruction: "Rest parameter (...args) yordamida barcha yuborilgan sonlar yig'indisini qaytaradigan 'sumAll' funksiyasini yozing.",
      startingCode: "function sumAll(...numbers) {\n  // Kodni yozing\n}",
      hint: "return numbers.reduce((acc, curr) => acc + curr, 0);",
      test: "if (code.includes('reduce') || code.includes('sumAll')) return null; return 'numbers.reduce yordamida yig\\'indini hisoblang';"
    },
    {
      id: 4,
      title: "Array Destructuring",
      instruction: "Destructuring yordamida a va b o'zgaruvchilar qiymatini almashtiring (swap).",
      startingCode: "let a = 1, b = 2;\n// Qiymatlarni almashtiring\n",
      hint: "[a, b] = [b, a];",
      test: "if (code.includes('[a, b]') || code.includes('[b, a]')) return null; return 'Destructuring orqali almashtiring';"
    },
    {
      id: 5,
      title: "Object Property Check",
      instruction: "'in' operatori yordamida 'car' obyektida 'speed' xossasi borligini aniqlovchi 'hasSpeed' o'zgaruvchisini yarating.",
      startingCode: "const car = { brand: 'BMW', color: 'black' };\nconst hasSpeed = false;",
      hint: "const hasSpeed = 'speed' in car;",
      test: "if (code.includes('in') && code.includes('car')) return null; return 'in operatori orqali car obyektini tekshiring';"
    },
    {
      id: 6,
      title: "Simple Closure",
      instruction: "Har safar chaqirilganda 1 ga oshadigan counter funksiyasini yaratuvchi 'createCounter' funksiyasini yozing.",
      startingCode: "function createCounter() {\n  let count = 0;\n  // counter funksiyasini qaytaring\n}",
      hint: "return function() { count++; return count; };",
      test: "if (code.includes('count++') || code.includes('++count')) return null; return 'Closure yordamida count-ni oshiruvchi ichki funksiyani qaytaring';"
    },
    {
      id: 7,
      title: "Filter Even Numbers",
      instruction: "Filter metodi yordamida massivdagi juft sonlarni ajratib oling.",
      startingCode: "const numbers = [1, 2, 3, 4, 5, 6];\nconst evens = [];",
      hint: "const evens = numbers.filter(n => n % 2 === 0);",
      test: "if (code.includes('filter') && code.includes('% 2')) return null; return 'filter metodidan foydalaning';"
    },
    {
      id: 8,
      title: "Array to Object",
      instruction: "Object.fromEntries yordamida kalit-qiymat juftligi ko'rinishidagi massivni obyektga o'giring.",
      startingCode: "const pairs = [['name', 'Ali'], ['role', 'admin']];\nconst obj = {};",
      hint: "const obj = Object.fromEntries(pairs);",
      test: "if (code.includes('Object.fromEntries')) return null; return 'Object.fromEntries metodidan foydalaning';"
    },
    {
      id: 9,
      title: "Property Renaming",
      instruction: "Destructuring yordamida 'user' obyektining 'name' xossasini 'username' deb qayta nomlab oling.",
      startingCode: "const user = { name: 'Ali', role: 'admin' };\n// username o'zgaruvchisiga oling\n",
      hint: "const { name: username } = user;",
      test: "if (code.includes('name:username') || code.includes('name: username')) return null; return 'name xossasini username deb nomlang';"
    },
    {
      id: 10,
      title: "Check All Positive",
      instruction: "every metodi yordamida massivdagi barcha sonlar musbat (n > 0) ekanligini aniqlang va natijani 'allPositive'ga yuklang.",
      startingCode: "const nums = [2, 5, 8, -1, 10];\nconst allPositive = false;",
      hint: "const allPositive = nums.every(n => n > 0);",
      test: "if (code.includes('every') && code.includes('> 0')) return null; return 'every metodidan foydalaning';"
    },
    {
      id: 11,
      title: "Merge Objects",
      instruction: "Spread operatori yordamida 'obj1' va 'obj2' obyektlarini 'merged' obyektiga birlashtiring.",
      startingCode: "const obj1 = { a: 1 };\nconst obj2 = { b: 2 };\nconst merged = {};",
      hint: "const merged = { ...obj1, ...obj2 };",
      test: "if (code.includes('...') && code.includes('obj1') && code.includes('obj2')) return null; return 'Ikkala obyektni spread yordamida birlashtiring';"
    },
    {
      id: 12,
      title: "Find Object in Array",
      instruction: "find() metodi yordamida 'users' massividan id si 3 bo'lgan foydalanuvchini toping.",
      startingCode: "const users = [{ id: 1 }, { id: 3 }, { id: 5 }];\nconst target = null;",
      hint: "const target = users.find(u => u.id === 3);",
      test: "if (code.includes('find') && code.includes('id')) return null; return 'find metodidan foydalanib id si 3 bo\\'lgan obyektni toping';"
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
