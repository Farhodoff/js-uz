export const closuresDeepDive = {
  id: "a20",
  title: "🔐 Closures va Scope (Chuqur O'rganish)",
  level: "Murakkab",
  theory: `## 📌 CLOSURES VA SCOPE — KURS DARAJASI

### 1. NEGA KERAK? (Asosiy savol)
"Closure nima?" solig biladigan ko'pchilik, lekin "Closure qachon kerak, real hayotda nima qiladi?" solig javob berish boshlang'ichlikni intermediateddan seniorg'a ko'taraydi.

**Asosiy faida:** Closure yordamida:
- ✅ Ma'lumotlarni xavfsiz himoya qilishimiz (encapsulation)
- ✅ Private o'zgaruvchilar yaratishimiz
- ✅ Funksiyalarni parametrlashtirish (currying)
- ✅ Memory-safe callback yozishimiz

---

### 2. SCOPE TUSHUNCHASI (Asosiy)

#### A. Global Scope (Dunyo darajasi)
\`\`\`javascript
const x = 10; // Global
function func() {
  console.log(x); // 10
}
\`\`\`

#### B. Function Scope (Funksiya darajasi)
\`\`\`javascript
function tashqi() {
  const y = 20;
  function ichki() {
    console.log(y); // 20
  }
  ichki();
}
\`\`\`

#### C. Block Scope (Blok darajasi)
\`\`\`javascript
{
  let a = 1;
  const b = 2;
  var c = 3;
}
\`\`\`

#### D. Lexical Scope (Qoida)
\`\`\`javascript
const global_x = 1;
function tashqi() {
  const tashqi_y = 2;
  function ichki() {
    const ichki_z = 3;
    console.log(global_x, tashqi_y, ichki_z); // 1, 2, 3
  }
  ichki();
}
\`\`\`

---

### 3. CLOSURE — ANA MAVZU

#### A. Closure ta'rifi
**Closure** = Funksiya + uning lexical environment (atrof o'zgaruvchilar)

\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

#### B. Closure yordamida Private State

\`\`\`javascript
function createBankCard() {
  let balans = 0;
  return {
    pulQoshish(summa) {
      if (summa > 0) balans += summa;
      return \`Qo'shildi: \${summa}. Balans: \${balans}\`;
    },
    pulOlish(summa) {
      if (summa > 0 && balans >= summa) {
        balans -= summa;
        return \`Olingan: \${summa}. Balans: \${balans}\`;
      }
      return "Yetarli pul yo'q!";
    },
    balansniKorish() {
      return balans;
    }
  };
}

const karta = createBankCard();
console.log(karta.pulQoshish(100000)); // Qo'shildi: 100000
console.log(karta.balansniKorish()); // 100000
\`\`\`

#### C. Function Factory (Sozlanuvchi Funksiyalar)

\`\`\`javascript
function createMultiplier(factor) {
  return function(num) {
    return num * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
\`\`\`

#### D. IIFE (Immediately Invoked Function Expression)

\`\`\`javascript
const calculator = (function() {
  let memory = 0;
  return {
    add(n) { memory += n; return memory; },
    subtract(n) { memory -= n; return memory; },
    clear() { memory = 0; }
  };
})();

console.log(calculator.add(5)); // 5
console.log(calculator.add(3)); // 8
\`\`\`

#### E. Currying (Qisqaviy funksiya)

\`\`\`javascript
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

console.log(curriedAdd(5)(3)); // 8
const add5 = curriedAdd(5);
console.log(add5(10)); // 15
\`\`\`

---

### 4. ADVANCED TUSHUNCHALAR

#### A. Closure va Loop Muammosi

\`\`\`javascript
// ❌ XATO
const functions = [];
for (var i = 0; i < 3; i++) {
  functions.push(function() {
    console.log(i);
  });
}
functions[0](); // 3 (0 emas!)

// ✅ TO'G'RI - let ishlatish
const functions = [];
for (let i = 0; i < 3; i++) {
  functions.push(function() {
    console.log(i);
  });
}
functions[0](); // 0
\`\`\`

#### B. Closure va Memory Leak

\`\`\`javascript
function createListener() {
  const bigData = new Array(1000000).fill("data");
  document.addEventListener("click", function() {
    console.log(bigData[0]);
  });
}
\`\`\`

#### C. Hoisting va TDZ

\`\`\`javascript
console.log(x); // undefined
var x = 5;

// console.log(y); // ReferenceError - TDZ
let y = 5;
\`\`\`

---

### 5. REAL HAYOTDAGI MISOLLAR

#### Misol 1: Private Counter

\`\`\`javascript
const counter = (function() {
  let count = 0;
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getCount() { return count; }
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
\`\`\`

#### Misol 2: Module Pattern

\`\`\`javascript
const userModule = (function() {
  let users = [];

  return {
    addUser(name) { users.push(name); },
    getUsers() { return [...users]; },
    userCount() { return users.length; }
  };
})();

userModule.addUser("Ali");
console.log(userModule.userCount()); // 1
\`\`\`

---

### 6. 12 TA SAVOL VA JAVOBLAR

**<b>1. Closure nima va nima uchun kerak?</b>**
Closure = funksiya + uning tashqarisidagi o'zgaruvchilar. Kerak: Data privacy, factory functions, callbacks.


**<b>2. var, let, const farqini batafsilroq tushuntiring.</b>**
var: funksiya scope, hoisting, let: block scope, TDZ, const: block scope, TDZ, o'zgartira olmaydi.


**<b>3. Lexical scope nima?</b>**
Funksiya qaysi yerda yozilgani bo'yicha ko'rining qoida — ichka funksiyalar tashqaring o'zgaruvchilarini ko'ra oladi.


**<b>4. for loop bilan var/let farqi nima?</b>**
var — loop dagi o'zgaruvchi loop tashqarida ham mavjud. let — faqat block ichida.


**<b>5. IIFE qachon kerak?</b>**
Private scope yaratmoqchi bo'lganda, module pattern yozganda.


**<b>6. Currying nima va nega kerak?</b>**
Funksiya parametrlarini bosqichma-bosqich yuborish. Kerak: Partial application, composition.


**<b>7. Closure memory leak qilishi mumkinmi?</b>**
Ha! Agar big data closure da qolsa va listener o'chirilmasa, xotirada qoladi.


**<b>8. TDZ nima?</b>**
Temporal Dead Zone — let/const bilan o'zgaruvchi initialization dan oldin ishlatish xatosi.


**<b>9. Function Factory nima misol bilan?</b>**
Sozlanuvchi funksiyalar qaytaradigan funksiya. Misol: createMultiplier(2) → multiply by 2 funksiya.


**<b>10. Closure va this o'rtasidagi bog'lanish?</b>**
Closure this ni saqlaydi, lekin this lexical emas — chaqirish kontekstiga bog'liq.


**<b>11. Recursive funksiya closure dan foydalanishi mumkinmi?</b>**
Ha! Recursive funksiya closure yaratishi mumkin va uni sanab turishi mumkin.


**<b>12. Module pattern nima va qanday yoziladi?</b>**
IIFE yordamida public va private API yaratish. Misol: const mod = (function() { ... })();
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy Closure (Boshlang'ich)",
      instruction: "Counter funksiya yarating. Har chaqirilganda 1 ga o'sib turadi.",
      startingCode: "// Kodni shu yerda yozing\nconst counter = /* ... */;\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3",
      hint: "function createCounter() { let count = 0; return () => ++count; }",
      test: "if (logs.includes(1) && logs.includes(2) && logs.includes(3)) return null; return 'Counter to\\'g\\'ri ishlashi kerak!';"
    },
    {
      id: 2,
      title: "2️⃣ Private Balans (Boshlang'ich)",
      instruction: "Bank kartasi yarating. qosh va ol metodlari bilan, private balans bilan.",
      startingCode: "// Kodni shu yerda yozing\nconst karta = /* ... */;\nconsole.log(karta.qosh(100)); \nconsole.log(karta.olish(30));",
      hint: "function createCard() { let balance = 0; return { qosh(n) { balance += n; return balance; }, olish(n) { balance -= n; return balance; } }; }",
      test: "if (logs.some(l => typeof l === 'number' && l === 100)) return null; return 'Balans funksiyası ishlamadi!';"
    },
    {
      id: 3,
      title: "3️⃣ IIFE (O'rta)",
      instruction: "IIFE yordamida private x o'zgaruvchisi bilan calculator yarating.",
      startingCode: "// Kodni shu yerda yozing\nconst calc = /* IIFE */;\nconsole.log(calc.add(5)); // 5\nconsole.log(calc.add(3)); // 8",
      hint: "const calc = (function() { let memory = 0; return { add(n) { return memory += n; } }; })();",
      test: "if (logs.includes(5) && logs.includes(8)) return null; return 'Calculator to\\'g\\'ri ishlamadi!';"
    },
    {
      id: 4,
      title: "4️⃣ Currying (O'rta)",
      instruction: "add() funksiyasini currying qoling, add(a)(b) shaklida ishlashi uchun.",
      startingCode: "// Kodni shu yerda yozing\nconst curriedAdd = /* ... */;\nconsole.log(curriedAdd(5)(3)); // 8",
      hint: "function curriedAdd(a) { return function(b) { return a + b; }; }",
      test: "if (logs.includes(8)) return null; return 'Currying to\\'g\\'ri emas!';"
    },
    {
      id: 5,
      title: "5️⃣ Function Factory (O'rta)",
      instruction: "multiplier factory yarating: createMultiplier(2) → 2 ga ko'paytiradigan funksiya.",
      startingCode: "// Kodni shu yerda yozing\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15",
      hint: "function createMultiplier(factor) { return n => n * factor; }",
      test: "if (logs.includes(10) && logs.includes(15)) return null; return 'Factory to\\'g\\'ri emas!';"
    },
    {
      id: 6,
      title: "6️⃣ Let vs Var Loop (O'rta)",
      instruction: "Let bilan for loop yozib, har bir i qiymatini funksiyalarda saqlab qoling.",
      startingCode: "const functions = [];\nfor (let i = 0; i < 3; i++) {\n  // Kodni shu yerda yozing\n  functions.push(/* ... */);\n}\nconsole.log(functions[0]()); // 0\nconsole.log(functions[2]()); // 2",
      hint: "functions.push(() => console.log(i));",
      test: "if (logs.includes(0) && logs.includes(2)) return null; return 'Loop to\\'g\\'ri emas!';"
    },
    {
      id: 7,
      title: "7️⃣ Rate Limiter (O'rta)",
      instruction: "Request limiter yarating: cheksiz chaqirish mumkin, lekin bittadan ko'p bo'lmaydi.",
      startingCode: "// Kodni shu yerda yozing\nconst limit = createRateLimiter(2);\nconsole.log(limit()); // OK\nconsole.log(limit()); // OK\nconsole.log(limit()); // Kotora rasta!",
      hint: "function createRateLimiter(max) { let count = 0; return () => { return count++ < max ? 'OK' : 'Kotora!'; }; }",
      test: "if (logs.some(l => l === 'OK') && logs.some(l => l === 'Kotora!')) return null; return 'Limiter to\\'g\\'ri emas!';"
    },
    {
      id: 8,
      title: "8️⃣ Scope Chain (O'rta)",
      instruction: "3 qatlama (global -> funksiya -> nested) o'zgaruvchilar bilan scope chaining ko'rsating.",
      startingCode: "const global = 'global';\nfunction outer() {\n  const outer = 'outer';\n  function inner() {\n    const inner = 'inner';\n    // Kodni shu yerda yozing\n    console.log(/* global, outer, inner */);  \n  }\n  inner();\n}\nouter();",
      hint: "console.log(global, outer, inner);",
      test: "if (logs.some(l => Array.isArray(l) && l[0] === 'global')) return null; return 'Scope chain to\\'g\\'ri emas!';"
    },
    {
      id: 9,
      title: "9️⃣ Closure with Parameters (Qiyin)",
      instruction: "greeting funksiya yarating: createGreeter('Salom') → 'Salom, [name]' qaytaradigan funksiya.",
      startingCode: "// Kodni shu yerda yozing\nconst greet = createGreeter('Salom');\nconsole.log(greet('Ali')); // Salom, Ali",
      hint: "function createGreeter(greeting) { return name => greeting + ', ' + name; }",
      test: "if (logs.includes('Salom, Ali')) return null; return 'Greeter to\\'g\\'ri emas!';"
    },
    {
      id: 10,
      title: "🔟 Module Pattern (Qiyin)",
      instruction: "IIFE bilan module yarating: add, subtract, getValue methodlari bilan.",
      startingCode: "// Kodni shu yerda yozing\nconst module = (function() { /* ... */ })();\nconsole.log(module.add(5)); // 5\nconsole.log(module.add(3)); // 8\nconsole.log(module.getValue()); // 8",
      hint: "const module = (function() { let total = 0; return { add(n) { total += n; return total; }, subtract(n) { total -= n; return total; }, getValue() { return total; } }; })();",
      test: "if (logs.includes(5) && logs.includes(8)) return null; return 'Module pattern to\\'g\\'ri emas!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Closure Array (Qiyin)",
      instruction: "10 ta funksiya massivini yarating har biri i*2 qaytaradigan. Let ishlatib closure muammosini hal qiling.",
      startingCode: "const functions = [];\n// Kodni shu yerda yozing\nconst fns = [/* ... */];\nconsole.log(fns[0]()); // 0\nconsole.log(fns[5]()); // 10",
      hint: "for (let i = 0; i < 10; i++) { functions.push(() => i * 2); }",
      test: "if (logs.includes(0) && logs.includes(10)) return null; return 'Closure array to\\'g\\'ri emas!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Combine: Curry + Factory (Eng Qiyin)",
      instruction: "curriedMultiplier yarating: createCurriedMultiplier(2) → multiply(3) → 6.",
      startingCode: "// Kodni shu yerda yozing\nconst double = createCurriedMultiplier(2);\nconsole.log(double(3)); // 6\nconsole.log(double(5)); // 10",
      hint: "function createCurriedMultiplier(factor) { return function multiply(n) { return factor * n; }; }",
      test: "if (logs.includes(6) && logs.includes(10)) return null; return 'Curry + Factory to\\'g\\'ri emas!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript'da Closure (yopilish) nima?",
      options: [
        "Funksiya va uning e'lon qilingan lexical scope (tashqi muhit o'zgaruvchilari) kombinatsiyasi",
        "Funksiya bajarilishini to'xtatuvchi maxsus runtime xatosi",
        "Faqat `let` va `const` yordamida yaratilgan o'zgaruvchilar guruhi",
        "Dasturning xotirasini butunlay tozalovchi maxsus metod"
      ],
      correctAnswer: 0,
      explanation: "Closure funksiya o'zining lexical scope'idagi o'zgaruvchilarni (xoh u tashqi funksiyada bo'lsin) o'zi yopilganidan (tashqi funksiya bajarilib bo'lganidan) keyin ham eslab qolish qobiliyatidir."
    },
    {
      id: 2,
      question: "Lexical Scope deganda nima tushuniladi?",
      options: [
        "Funksiya chaqirilayotgan vaqtdagi dinamik o'zgaruvchilar ko'rinishi",
        "Funksiya kodda qayerda yozilganligiga qarab uning o'zgaruvchilarni ko'rish doirasi belgilanishi",
        "Faqat brauzer oynasiga bog'liq bo'lgan global o'zgaruvchilar",
        "Xatolarni qayd etuvchi loglar to'plami"
      ],
      correctAnswer: 1,
      explanation: "Lexical (yoki Static) Scope - bu o'zgaruvchining ko'rinish doirasi u kodda qayerda e'lon qilinganiga qarab aniqlanishidir. JavaScript dynamic scope emas, lexical scope'dan foydalanadi."
    },
    {
      id: 3,
      question: "Quyidagi kod bajarilganda konsolda nima chiqadi?\n```javascript\nconst arr = [];\nfor (var i = 0; i < 3; i++) {\n  arr.push(() => console.log(i));\n}\narr[0]();\n```",
      options: [
        "0",
        "3",
        "undefined",
        "ReferenceError: i is not defined"
      ],
      correctAnswer: 1,
      explanation: "`var` funksiyaviy/global scope'ga ega bo'lgani uchun, loop davomida bitta umumiy `i` o'zgaruvchisi o'zgarib boradi. Loop tugaganda `i` qiymati `3` bo'ladi va barcha closure funksiyalar shu yagona `i` ga ishora qilgani uchun konsolga `3` chop etiladi."
    },
    {
      id: 4,
      question: "Nima uchun yuqoridagi kodda `let` ishlatilganda `arr[0]()` chaqirilganda `0` chiqadi?",
      options: [
        "`let` ishlatilganda har bir loop iteratsiyasi uchun alohida yangi block scope (o'zgaruvchi bog'lamasi) yaratiladi",
        "`let` o'zgaruvchilari global scope'ga tushadi",
        "`let` hoisting'ni umuman taqiqlaydi",
        "`let` ishlatilganda funksiya sinxron ravishda bajariladi"
      ],
      correctAnswer: 0,
      explanation: "`let` block-scoped bo'lgani tufayli, har bir iteratsiyada yangi `i` o'zgaruvchisi xotirada yaratiladi va o'sha iteratsiyadagi closure aynan o'sha o'ziga tegishli nusxani eslab qoladi."
    },
    {
      id: 5,
      question: "Closures qanday qilib \"Memory Leak\" (xotira sizib chiqishi) ga sabab bo'lishi mumkin?",
      options: [
        "Hech qachon xotira muammosiga sabab bo'lmaydi",
        "Tashqi funksiyadagi katta hajmli ma'lumotlar (masalan, yirik massivlar) closure funksiya xotirada turgunicha Garbage Collector tomonidan o'chirilmaydi",
        "Barcha closure'lar avtomatik tarzda cheksiz loop yaratadi",
        "O'zgaruvchilarni var bilan yaratganda"
      ],
      correctAnswer: 1,
      explanation: "Agar closure funksiya yirik hajmli ma'lumotni ushlab tursa va u closure uzoq vaqt (masalan, global DOM event listener ichida) xotirada yashasa, Garbage Collector u yirik ma'lumotni o'chira olmaydi va natijada xotira band bo'lib qolaveradi."
    }
  ]
};