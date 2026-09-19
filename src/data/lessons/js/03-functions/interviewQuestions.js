export const interviewQuestionsBeginner = {
  id: "interviewQuestionsBeginner",
  title: "🟢 Interview Savollar (Boshlang'ich)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Junior Developer Intervyusi nima?
Junior (boshlang'ich) dasturchilar uchun o'tkaziladigan intervyular murakkab tizimlar arxitekturasini emas, balki JavaScript-ning eng asosiy va fundamental mexanizmlarini qay darajada tushunishingizni tekshiradi. JS qanday ishlaydi, xotira bilan qanday muloqot qiladi va kod qanday tartibda bajariladi — bular asosiy savollardir.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **quruvchi** bo'lib ishga kirmoqchisiz:
* **Tajribali muhandis (Senior):** Undan butun binoning chizmasi, zilzilaga bardoshliligi va xarajatlarni hisoblash so'raladi.
* **Boshlang'ich yordamchi (Junior):** Undan g'ishtni qanday terish, sementni qanday qorish va asboblarni qanday toza saqlash so'raladi.
* **JavaScript fundamental bilimlari:** JS-da ma'lumot turlari — bu g'ishtlar, scopes (sohalar) va hoisting — devorning skeleti, event loop va asinxronlik esa binodagi lift yoki elektr simlari kabi kommunikatsiya tizimlaridir.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example: Hoisting va Scope
\`var\` va \`let\` o'rtasidagi farq hamda xotirada joy ajratilishi:
\`\`\`javascript
// var o'zgaruvchisi hoisting bo'ladi va undefined qiymat oladi
console.log(hoistedVar); // undefined
var hoistedVar = "Men var o'zgaruvchisiman";

// let o'zgaruvchisi ham hoisting bo'ladi, lekin TDZ tufayli xato beradi
try {
  console.log(hoistedLet); // ReferenceError xatosi
} catch (error) {
  console.log("Xatolik:", error.message); 
}
let hoistedLet = "Men let o'zgaruvchisiman";
\`\`\`

### 2. Intermediate Example: Implicit Coercion (Yashirin tur o'zgartirish)
\`\`\`javascript
console.log(1 + "2");     // "12"
console.log("5" - 2);     // 3 
console.log(true + true); // 2
console.log(false == 0);  // true
console.log(null == undefined); // true
console.log(null === undefined); // false
\`\`\`

### 3. Advanced Example: Pass by Value vs Pass by Reference
\`\`\`javascript
// Primitive (Pass by Value): Qiymat ko'chiriladi
let originalNum = 10;
function changePrimitive(num) {
  num = 20;
}
changePrimitive(originalNum);
console.log(originalNum); // 10 (asl qiymat o'zgarmadi)

// Reference (Pass by Reference): Havola (manzil) ko'chiriladi
let originalObj = { name: "Ali" };
function changeReference(obj) {
  obj.name = "Vali";
}
changeReference(originalObj);
console.log(originalObj.name); // "Vali" (asl obyekt o'zgardi)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Execution Context (Bajarilish Muhiti)
JavaScript-da kod har doim **Execution Context** (Bajarilish Muhiti) ichida ishga tushadi. U ikki bosqichda ishlaydi:
1. **Creation Phase (Yaratilish bosqichi):** JS dvigateli kodni o'qib chiqadi, funksiyalar va o'zgaruvchilar uchun xotiradan joy ajratadi (Hoisting).
2. **Execution Phase (Bajarilish bosqichi):** Kod tepadan pastga qarab qatorma-qator bajariladi va o'zgaruvchilarga haqiqiy qiymatlar tayinlanadi.

### 2. Scope Chain (Sohalar zanjiri)
Agar biron-bir o'zgaruvchi joriy funksiya ichida topilmasa, JavaScript uni tashqi leksik muhitdan (outer lexical environment) qidiradi.

### 3. Event Loop va Single Thread
JavaScript **single-threaded** (bitta oqimli) til bo'lib, bir vaqtda faqat bitta amalni bajara oladi. Asinxron operatsiyalar brauzerning Web API qismiga yuboriladi va u yerda bajariladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`var\` o'zgaruvchisini sikl (loop) ichida asinxron kod bilan ishlatish
* **YOMON:**
  \`\`\`javascript
  for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
      console.log(i); // 4, 4, 4 chiqadi
    }, 1000);
  }
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  for (let i = 1; i <= 3; i++) {
    setTimeout(function() {
      console.log(i); // 1, 2, 3 chiqadi
    }, 1000);
  }
  \`\`\`

### 2. \`==\` (Yumshoq tenglik) ishlatish orqali kutilmagan bug-lar
* **YOMON:**
  \`\`\`javascript
  console.log([] == false); // true!
  \`\`\`
* **YAXSHI:** Har doim turlarni ham tekshiradigan qat'iy tenglik \`===\` operatoridan foydalaning.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (Boshlang'ich)
1. **Savol:** JS-da qanday ma'lumot turlari mavjud?
   * **Javob:** 8 ta ma'lumot turi bor: 7 ta primitive va 1 ta reference (Object).
2. **Savol:** \`null\` va \`undefined\` farqi nima?
   * **Javob:** \`undefined\` — qiymat berilmagan, \`null\` — qasddan bo'sh.
3. **Savol:** \`typeof null\` nima qaytaradi?
   * **Javob:** \`"object"\` qaytaradi, bu JS xatosi.
4. **Savol:** Hoisting nima?
   * **Javob:** O'zgaruvchi va funksiyalarni e'lon qilinishini xotiraga ko'tarilishi.

### Middle (O'rta)
5. **Savol:** Temporal Dead Zone (TDZ) nima?
   * **Javob:** \`let\` va \`const\` e'lon qilinmaguncha bo'lgan murojaat taqiqlangan oraliq.
6. **Savol:** \`var\`, \`let\` va \`const\` farqi?
   * **Javob:** \`var\` function scoped, \`let\` va \`const\` block scoped.
7. **Savol:** Implicit va Explicit Coercion?
   * **Javob:** Yashirin va oshkora tip o'zgarishi.
8. **Savol:** \`==\` va \`===\` farqi?
   * **Javob:** \`==\` qiymatni, \`===\` qiymat va tipni.

### Senior (Yuqori)
9. **Savol:** Closure (Yopilish) nima?
   * **Javob:** Ichki funksiyaning tashqi scope ga kirish huquqini saqlab qolishi.
10. **Savol:** Pass by Value va Pass by Reference nima?
    * **Javob:** Primitiv nusxalanadi, Obyekt havola (adres) beradi.
11. **Savol:** Event Loop qanday ishlaydi?
    * **Javob:** Call stack bo'shligini poylab, navbatdan callbacklarni stack'ga olib kiradi.
12. **Savol:** \`const obj = {}\` dagi xususiyatni nega o'zgartirib bo'ladi?
    * **Javob:** Havola qulflangan, ichki ma'lumot emas.

---

## 6. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A["Junior Developer JS Roadmap"] --> B["Data Types"]
    A --> C["Scopes & Hoisting"]
    A --> D["Type Coercion"]
    A --> E["Closures Basics"]
    A --> F["Asynchronous Basics"]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Testlar dars yakunida taqdim etilgan.

---

## 8. 🎯 Real Project Case Study

\`\`\`javascript
function createShoppingSession(user) {
  const cart = [];
  return {
    addItem(item) {
      cart.push(item);
    },
    getCart() {
      return [...cart]; // Shallow copy
    },
    getTotalPrice() {
      return cart.reduce((total, item) => total + item.price, 0);
    }
  };
}
\`\`\`

---

## 9. 🚀 Performance va Optimization
\`===\` ni har doim \`==\` dan afzal ko'ring.

---

## 10. 📌 Cheat Sheet
| Konsept | Kalit So'zlar | Muhim Qoida |
| :--- | :--- | :--- |
| **typeof null** | \`"object"\` | JS tarixidagi bug. |
`,
  exercises: [
    {
      "id": 1,
      "title": "Turlarni Taqqoslash (Custom Equality)",
      "instruction": "Shunday `compareValues(a, b, strict)` funksiyasini yozingki, u `strict` true bo'lsa qat'iy `===`, false bo'lsa `==` ishlatsin. Lekin `null` va `undefined` yumshoq tekshirilganda `false` qaytarishi shart qiling.",
      "startingCode": "function compareValues(a, b, strict) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "Avval if(!strict && ((a===null && b===undefined)||(a===undefined && b===null))) return false;",
      "test": "const fn = new Function(code + '; return compareValues;')(); if (fn(5, '5', true) !== false || fn(5, '5', false) !== true || fn(null, undefined, false) !== false) return 'Xato'; return null;"
    },
    {
      "id": 2,
      "title": "Maxfiy Balans (Private State)",
      "instruction": "`createBankAccount(initialBalance)` funksiyasini yarating. U `deposit(amount)`, `withdraw(amount)` (mablag' yetsa), `getBalance()` metodlari bor obyekt qaytarsin.",
      "startingCode": "function createBankAccount(initialBalance) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "Closure ishlating.",
      "test": "const fn = new Function(code + '; return createBankAccount;')(); const acc = fn(100); acc.deposit(50); if (acc.getBalance() !== 150) return 'Xato'; return null;"
    },
    {
      "id": 3,
      "title": "Haqiqiy Turni Aniqlash (Safe Typeof)",
      "instruction": "`safeTypeof(value)` yozing: `null` bo'lsa 'null', massiv bo'lsa 'array', qolgani standart `typeof` qaytarsin.",
      "startingCode": "function safeTypeof(value) {\n  // Kodni shu yerda yozing\n}\n",
      "hint": "value === null va Array.isArray() tekshiring.",
      "test": "const fn = new Function(code + '; return safeTypeof;')(); if(fn(null) !== 'null' || fn([]) !== 'array' || fn({}) !== 'object') return 'Xato'; return null;"
    },
    {
      "id": 4,
      "title": "Oddiy Counter",
      "instruction": "Closure yordamida `createCounter()` yarating. U obyekt qaytarsin: `increment()` va `getValue()` metodlari bilan.",
      "startingCode": "function createCounter() {\n  // Kodni yozing\n}",
      "hint": "let count = 0;",
      "test": "const fn = new Function(code + '; return createCounter;')(); const c = fn(); c.increment(); if(c.getValue() !== 1) return 'Xato'; return null;"
    },
    {
      "id": 5,
      "title": "Pass by Reference Bug",
      "instruction": "Funksiya `addAge(user)` unga berilgan obyektning yoshini +1 qiladi, lekin uni nusxalab yangi obyekt qaytarishi kerak (asl obyektni o'zgartirmasdan).",
      "startingCode": "function addAge(user) {\n  // Kodni yozing\n}",
      "hint": "return { ...user, age: user.age + 1 };",
      "test": "const fn = new Function(code + '; return addAge;')(); const u = {age: 20}; const nu = fn(u); if(u.age === 21) return 'Asl obyekt o\\'zgardi'; if(nu.age !== 21) return 'Xato'; return null;"
    },
    {
      "id": 6,
      "title": "Hoisting Bug",
      "instruction": "`a` let orqali e'lon qilinib, `console.log` undan oldin kelgan. `console.log(a)` ni o'zgaruvchi e'lon qilingandan keyinga oling, funksiya xatosiz `a` ni qaytarsin.",
      "startingCode": "function testHoisting() {\n  // console.log(a);\n  let a = 10;\n  return a;\n}",
      "hint": "return a; qilsa kifoya.",
      "test": "const fn = new Function(code + '; return testHoisting;')(); if(fn() !== 10) return 'Xato'; return null;"
    },
    {
      "id": 7,
      "title": "Asynchronous Loop",
      "instruction": "`runAsyncLoop()` funksiyasi massiv qaytarsin: unda 0 dan 2 gacha bo'lgan raqamlar bo'lishi kerak. `for` tsiklida `let` ishlating.",
      "startingCode": "function runAsyncLoop() {\n  const res = [];\n  for (let i = 0; i < 3; i++) {\n    res.push(i);\n  }\n  return res;\n}",
      "hint": "Res massivini qaytaring.",
      "test": "const fn = new Function(code + '; return runAsyncLoop;')(); if(fn().join('') !== '012') return 'Xato'; return null;"
    },
    {
      "id": 8,
      "title": "Yumshoq Tenglik Bug",
      "instruction": "`checkZeros()` funksiyasida `\"0\" == 0` va `[] == false` ni string yozuvida 'true' deb javob qaytaring (yoki bool true).",
      "startingCode": "function checkZeros() {\n  return (\"0\" == 0) && ([] == false);\n}",
      "hint": "Ikkalasi ham JS'da true.",
      "test": "const fn = new Function(code + '; return checkZeros;')(); if(!fn()) return 'Xato'; return null;"
    },
    {
      "id": 9,
      "title": "Const obyekt mutatsiyasi",
      "instruction": "`mutateConst()` funksiyasida `const obj = { val: 1 }` bor. Uni `{ val: 2 }` ga obyektni o'zini qayta o'rnatmasdan, property'ni o'zgartirib erishing va obyektni qaytaring.",
      "startingCode": "function mutateConst() {\n  const obj = { val: 1 };\n  // Kod\n  return obj;\n}",
      "hint": "obj.val = 2;",
      "test": "const fn = new Function(code + '; return mutateConst;')(); if(fn().val !== 2) return 'Xato'; return null;"
    },
    {
      "id": 10,
      "title": "Block Scope",
      "instruction": "`var` o'rniga `let` yoki `const` ishlatingki, x tashqariga sizmasin.",
      "startingCode": "function checkScope() {\n  if(true) {\n    let x = 'safe';\n  }\n  return typeof x;\n}",
      "hint": "typeof x === 'undefined' bo'ladi.",
      "test": "const fn = new Function(code + '; return checkScope;')(); if(fn() !== 'undefined') return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "Qaysi biri primitive emas?",
      "options": ["Symbol", "Object", "Undefined", "BigInt"],
      "correctAnswer": 1,
      "explanation": "Object reference tur."
    },
    {
      "id": 2,
      "question": "typeof null?",
      "options": ["\"null\"", "\"undefined\"", "\"object\"", "\"error\""],
      "correctAnswer": 2,
      "explanation": "JS tarixidagi xatolik."
    },
    {
      "id": 3,
      "question": "Qaysi biri false?",
      "options": ["null == undefined", "null === undefined", "false == 0", "'' == false"],
      "correctAnswer": 1,
      "explanation": "=== turlarni ham tekshiradi."
    },
    {
      "id": 4,
      "question": "var hoisting bo'lganda nimani oladi?",
      "options": ["ReferenceError", "undefined", "10", "TypeError"],
      "correctAnswer": 1,
      "explanation": "var undefined bo'lib ko'tariladi."
    },
    {
      "id": 5,
      "question": "let va TDZ?",
      "options": ["Hech narsa", "SyntaxError", "ReferenceError", "TypeError"],
      "correctAnswer": 2,
      "explanation": "let TDZ da xato beradi."
    },
    {
      "id": 6,
      "question": "1 + '2' - 1 natijasi?",
      "options": ["12", "11", "2", "NaN"],
      "correctAnswer": 1,
      "explanation": "1 + '2' = '12', '12' - 1 = 11."
    },
    {
      "id": 7,
      "question": "Qaysi biri window da paydo bo'ladi?",
      "options": ["Ikkalasi", "Hech qaysisi", "var", "let"],
      "correctAnswer": 2,
      "explanation": "var window obyekti xususiyatiga aylanadi."
    },
    {
      "id": 8,
      "question": "var fn = function()... tepada chaqirilsa nima bo'ladi?",
      "options": ["Ishlaydi", "TypeError", "ReferenceError", "Hech narsa"],
      "correctAnswer": 1,
      "explanation": "var undefined, shuning uchun call qilganda TypeError."
    },
    {
      "id": 9,
      "question": "TDZ nima?",
      "options": ["Xotira", "E'longacha oraliq", "Stack", "Tarmoqsiz"],
      "correctAnswer": 1,
      "explanation": "TDZ bu oraliq."
    },
    {
      "id": 10,
      "question": "Pass by Reference?",
      "options": ["Hammasi havola", "Hammasi qiymat", "Obyektlar havola", "Faqat sonlar qiymat"],
      "correctAnswer": 2,
      "explanation": "Obyektlar adres bo'yicha uzatiladi."
    },
    {
      "id": 11,
      "question": "const arr=[]; arr.push(1); xato beradimi?",
      "options": ["Ha", "Yo'q", "O'zgarmaydi", "Qulab tushadi"],
      "correctAnswer": 1,
      "explanation": "Reference qulflangan, ichi emas."
    },
    {
      "id": 12,
      "question": "JS qanday til?",
      "options": ["Ko'p oqimli", "Bitta oqimli", "Asinxron qat'iy", "Brauzersiz ishlamaydigan"],
      "correctAnswer": 1,
      "explanation": "Bitta oqimli (Single Threaded)."
    }
  ]
};
