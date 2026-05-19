export const closuresLesson = {
  id: "closures",
  title: "Closures: Funksiyalarning 'Eslab Qolish' Qobiliyati",
  level: "Murakkab",
  description: "Closure kontseptsiyasi: Lexical Environment, Private o'zgaruvchilar, va Real hayot misollar.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, sizga counter kerak. Agar siz o'zgaruvchini global qilib yaratsangiz:
\`\`\`javascript
let globalCount = 0;  // XATO: Istalgan kod uni o'zgartirib yuborishi mumkin!
\`\`\`

**Closure** yordamida o'zgaruvchini funksiya ichiga yashirib (private) qo'yishimiz mumkin, faqat o'zimiz xohlagan yo'l bilan o'zgartiramiz:
\`\`\`javascript
function createCounter() {
  let count = 0;  // PRIVATE - boshqa kod buni to'g'ridan-to'g'ri o'zgartira olmaydi
  return {
    increment: () => ++count,
    get: () => count
  };
}
\`\`\`

Bu - **Encapsulation** (ma'lumotlarni yashirish) deyiladi.

## 2. SODDALIK (Analogiya)

Buni "xazinachining ruxsati" deb tasavvur qiling:
- **Xazina** (closure ichidagi o'zgaruvchi) lock orqali saqlanadi
- **Xazinachi** (qaytarilgan funksiya) faqat o'zi xohlagan tarzda pul olib/qo'yishi mumkin
- Boshqa kim bo'lmasin, lock bo'lmasdan pulga qo'l urusha olmaydi

## 3. STRUKTURA

### A. Oddiy Closure

\`\`\`javascript
function tashqi() {
  let ism = "Farhod";  // Tashqi funksiyaga tegishli o'zgaruvchi

  function ichki() {   // Ichki funksiya
    console.log("Salom, " + ism);  // Tashqining o'zgaruvchisini ishlatadi
  }

  return ichki;  // Ichki funksiyani qaytarish
}

const salom = tashqi();  // tashqi() tugadi, lekin...
salom();  // "Salom, Farhod" - ism o'zgaruvchisi hali ham xotirada saqlangan!
\`\`\`

**Muhim:** Tashqi funksiya o'z ishini tutatgani bilan ham, ichki funksiya uning o'zgaruvchilarini "eslab qoladi"!

### B. Closure va Lexical Environment

\`\`\`javascript
let global = "GLOBAL";

function level1() {
  let level1Var = "Level 1";

  function level2() {
    let level2Var = "Level 2";

    function level3() {
      console.log(level2Var);  // "Level 2" - o'z muhitida
      console.log(level1Var);  // "Level 1" - ota muhitida
      console.log(global);     // "GLOBAL" - global muhitida
    }

    level3();
  }

  level2();
}

level1();
// Har bir funksiya o'z Lexical Environment'ini saqlab turadi!
\`\`\`

### C. Private o'zgaruvchilar (Encapsulation)

\`\`\`javascript
function createAccount(initialBalance) {
  let balance = initialBalance;  // Private - boshqa kod buni to'g'ridan-to'g'ri o'zgartira olmaydi

  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return "Depozit: " + amount + ", Balans: " + balance;
      }
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return "Olib tashlash: " + amount + ", Balans: " + balance;
      }
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createAccount(1000);
console.log(account.deposit(500));      // "Depozit: 500, Balans: 1500"
console.log(account.getBalance());      // 1500
console.log(account.balance);           // undefined (private!)
\`\`\`

### D. Function Factory (Funksiya Fabrikasi)

Bir xil strukturadagi funksiyalarni factory orqali yarataishimiz mumkin:

\`\`\`javascript
function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const quadruple = makeMultiplier(4);

console.log(double(5));      // 10
console.log(triple(5));      // 15
console.log(quadruple(5));   // 20

// Har bir funksiya o'zining multiplier qiymatini eslab qoladi!
\`\`\`

### E. Loop ichida Closure (Muhim Masala!)

\`\`\`javascript
// ❌ XATO - var bilan
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);  // 3, 3, 3 (hammasi oxirgi qiymat!)
  }, 100);
}

// ✅ TO'G'RI - let bilan (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);  // 0, 1, 2 (to'g'ri!)
  }, 100);
}

// ✅ TO'G'RI - var bilan closure
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j);  // 0, 1, 2
    }, 100);
  })(i);  // i qiymatini j'ga o'tkazamiz
}
\`\`\`

**Sabab:** var function scope ga ega, let block scope ga ega. Har let iteratsiyasida yangi scope yarataadi.

### F. Closure bilan Caching (Kesh)

\`\`\`javascript
function expensiveOperation() {
  console.log("Hisoblayapman...");
  return 42;
}

const memoized = (function() {
  let cache;
  return function() {
    if (cache !== undefined) {
      console.log("Kesh'dan olinmoqda...");
      return cache;
    }
    console.log("Yangi hisoblash...");
    cache = expensiveOperation();
    return cache;
  };
})();

memoized();  // "Yangi hisoblash..." // Hisoblayapman...
memoized();  // "Kesh'dan olinmoqda..." // 42
memoized();  // "Kesh'dan olinmoqda..." // 42
\`\`\`

### G. Closure va This

\`\`\`javascript
const user = {
  name: "Ali",
  greetings: function() {
    const self = this;  // Closure orqali 'this' saqlab qo'yish

    setTimeout(function() {
      console.log(self.name);  // "Ali" (closure orqali ishlaydi)
    }, 100);

    // Yoki arrow function ishlatish (arrow function 'this' ni capture qiladi)
    setTimeout(() => {
      console.log(this.name);  // "Ali" (arrow function)
    }, 200);
  }
};

user.greetings();
\`\`\`

### H. Closure va Class-like Qo'llash (ES5)

\`\`\`javascript
// ES5 da Class yo'q edi, Closure ishlatiladi edi
function Animal(name) {
  this.name = name;

  this.speak = function() {
    console.log(this.name + " seda chiqarmoqda...");
  };
}

// Closure bilan "private" metod
function createDog(name) {
  const internalName = name;  // Private

  return {
    getName: function() {
      return internalName;
    },
    setName: function(newName) {
      if (newName.length > 0) {
        // internalName = newName;  // Bu ishlamaydi! newName local o'zgaruvchi
        // To'g'ri yo'l:
        const dog = this;
        // Aks holda boshqa metod qo'shish kerak
      }
    }
  };
}
\`\`\`

### I. Callback bilan Closure

\`\`\`javascript
function setupButtons() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", function() {
      console.log("Button " + index + " bosildi!");  // index - closure orqali
    });
  });
}
\`\`\`

### J. Memory Leak - Xotira Muammosi

\`\`\`javascript
// ❌ XATO - Closure'lar juda ko'p xotirani ishlatishi mumkin
function createHeavyClosures() {
  const heavyData = new Array(1000000).fill("data");  // Juda ko'p ma'lumot

  return function() {
    console.log(heavyData.length);  // heavyData xotirada qoladi
  };
}

// Agar bunday milyonlab closurelar yaratsak, xotira to'lib qoladi!
for (let i = 0; i < 1000000; i++) {
  const fn = createHeavyClosures();
  // fn birinchi murojaat qilingandan keyin o'chiryapmiz
}

// ✅ TO'G'RI - Closure'dan foydalanish tugatgandan keyin o'chiryapmiz
let bigFn = createHeavyClosures();
bigFn();
bigFn = null;  // Reference o'chiry (Garbage Collection qiladi)
\`\`\`

### K. Closure bilan Debounce va Throttle

\`\`\`javascript
// Debounce - oxirgi marta chaqirguncha kuta
function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Throttle - har N ms'dan keyin chaqirish
function throttle(func, interval) {
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

// Ishlatish:
const handleScroll = debounce(() => console.log("Scroll!"), 300);
window.addEventListener("scroll", handleScroll);
\`\`\`

### L. Closure va Nested Functions

\`\`\`javascript
function outer() {
  let x = 10;

  function middle() {
    let y = 20;

    function inner() {
      let z = 30;
      console.log(x + y + z);  // 60 - Barcha o'zgaruvchilarni eslab qoladi
    }

    return inner;
  }

  return middle;
}

const fn = outer();
const innerFn = fn();
innerFn();  // 60
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Loop ichida var bilan closure:**
   \`\`\`javascript
   for (var i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 100);  // 3, 3, 3 - XATO!
   }
   \`\`\`

2. **Xotirani to'ldirish (Memory Leak):**
   \`\`\`javascript
   const hugeClosures = [];
   for (let i = 0; i < 1000000; i++) {
     hugeClosures.push(() => console.log(i));  // Xotira to'lib qoladi!
   }
   \`\`\`

3. **Closure'da this adashtirish:**
   \`\`\`javascript
   obj.method = function() {
     setTimeout(function() {
       console.log(this);  // window (this'i o'zgaradi!)
     });
   };
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Closure nima va nima uchun kerak?</summary>
Funksiya o'zi yaratilgan muhitni (o'zgaruvchilarni) eslab qolib qolish. Private o'zgaruvchilar yaratish uchun kerak.
</details>

<details>
<summary>2. Ichki funksiya tashqi o'zgaruvchini qanday eslab qoladi?</summary>
JavaScript har funksiya yaratilganda uning Lexical Environment'ini saqlab qoladi. Ichki funksiya ota muhitiga kirish imkoniga ega.
</details>

<details>
<summary>3. Lexical Environment nima?</summary>
Funksiya yaratilgan joyidagi o'zgaruvchilar va o'zgaruvchilarga kirish huquqi.
</details>

<details>
<summary>4. Closure nima uchun "Private" o'zgaruvchilar yasashda kerak?</summary>
Global o'zgaruvchilar xavfsiz emas. Closure orqali funksiya ichiga yashirib qo'yish mumkin.
</details>

<details>
<summary>5. Tashqi funksiya ishini tutatsa, uning o'zgaruvchilari o'chib ketadimi?</summary>
Yo'q! Ichki funksiya xotirada bor bo'lsa, o'zgaruvchilar xotirada qoladi.
</details>

<details>
<summary>6. Closure xotiraga qanday ta'sir qiladi?</summary>
Closure o'zgaruvchilarni xotirada saqlab turadi. Keraksiz closure'lar xotirani to'ldirishi mumkin (Memory Leak).
</details>

<details>
<summary>7. let va var'ning closure bilan bog'liq farqi nima?</summary>
var - function scope, let - block scope. Loop ichida var bilan barcha iteratsiyalar oxirgi qiymatni oladi.
</details>

<details>
<summary>8. Closure ishlatilgan real misol keltiring.</summary>
Counter, Private datos, Event listeners, Debounce/Throttle, Module pattern.
</details>

<details>
<summary>9. Funksiya fabrikasi (Function factory) nima?</summary>
Funksiya qaytaruvchi funksiya. Har bir qaytarilgan funksiya kendi closure'i bor.
</details>

<details>
<summary>10. Har doim funksiya ichida funksiya bo'lsa closure bo'ladimi?</summary>
Yo'q, closure bo'lishi uchun ichki funksiya tashqining o'zgaruvchisini ishlatishi kerak.
</details>

<details>
<summary>11. Closure'ni qanday qilib "tozalash" (delete) mumkin?</summary>
Reference'ni null ga tenglash: fn = null. Garbage Collection qiladi.
</details>

<details>
<summary>12. Closure Senior intervyularida nega ko'p so'raladi?</summary>
JavaScript'ning fundamental kontseptsiya. Scope, Memory management, Encapsulation'ni tushunish ko'rsatadi.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Closure",
      instruction: "Tashqi funksiya 'ism' o'zgaruvchisini saqlab qolsa, ichki funksiya uni ishlatsa.",
      startingCode: "function tashqi() {\n  let ism = 'Farhod';\n  // Bu yerga ichki funksiya yozing\n}\n\nconst salom = tashqi();\nsalom(); // 'Salom, Farhod' chiqishi kerak\n",
      hint: "return function() { console.log('Salom, ' + ism); }",
      test: "if (code.includes('return') && code.includes('function')) return null; return 'Closure noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Private Counter",
      instruction: "'createCounter' funksiyasi increment() va getCount() metodlari bilan object qaytarsin.",
      startingCode: "function createCounter() {\n  let count = 0;\n  // Object qaytaring\n}\n\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\n",
      hint: "return { increment: () => ++count, getCount: () => count }",
      test: "if (code.includes('count') && code.includes('return')) return null; return 'Counter noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Function Factory",
      instruction: "'makeMultiplier(x)' funksiyasi qabul qilsa, qaytargan funksiya x ga ko'paytirsin.",
      startingCode: "function makeMultiplier(x) {\n  // Bu yerga yozing\n}\n\nconst double = makeMultiplier(2);\nconsole.log(double(5)); // 10\n",
      hint: "return function(y) { return x * y; }",
      test: "if (code.includes('return') && code.includes('function')) return null; return 'Factory noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Banking Account Closure",
      instruction: "'createAccount(balance)' private balance bilan deposit va withdraw metodlari qaytarsin.",
      startingCode: "function createAccount(balance) {\n  // Bu yerga yozing\n}\n\nconst acc = createAccount(1000);\nconsole.log(acc.deposit(500)); // Balans: 1500\nconsole.log(acc.withdraw(200)); // Balans: 1300\n",
      hint: "return { deposit: (amt) => balance += amt, withdraw: (amt) => balance -= amt }",
      test: "if (code.includes('deposit') && code.includes('withdraw')) return null; return 'Banking noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Loop ichida Closure - Let",
      instruction: "let bilan loop qiling, har button click'iga o'z indexni logga chiqarsin.",
      startingCode: "for (let i = 0; i < 3; i++) {\n  // Bu yerga click eventni yozing\n  setTimeout(() => console.log(i), 100);\n}\n// 0, 1, 2 chiqishi kerak\n",
      hint: "let bilan har iteratsiyada yangi scope yaratiladi",
      test: "if (code.includes('let')) return null; return 'Loop closure noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "Memoization (Caching)",
      instruction: "'memoize' funksiyasi natijani kesh qilib, ikkinchi marta qiynaydi.",
      startingCode: "function expensive() {\n  console.log('Hisoblayapman...');\n  return 42;\n}\n\nconst memoized = (function() {\n  let cache;\n  // Bu yerga yozing\n})();\n\nmemoized(); // Hisoblayapman..., 42\nmemoized(); // 42 (kesh'dan)\n",
      hint: "return function() { if (cache !== undefined) return cache; cache = expensive(); return cache; }",
      test: "if (code.includes('cache')) return null; return 'Memoization noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "Nested Closures",
      instruction: "3 qavatli nested funksiya: outer -> middle -> inner. Inner barcha o'zgaruvchilarni eslab qolsa.",
      startingCode: "function outer() {\n  let x = 10;\n  return function middle() {\n    let y = 20;\n    // Bu yerga yozing\n  };\n}\n\nconst fn = outer();\nconst innerFn = fn();\ninnerFn(); // x + y + z = 60 chiqishi kerak\n",
      hint: "return function inner() { let z = 30; console.log(x + y + z); }",
      test: "if (code.includes('return') && code.includes('function')) return null; return 'Nested noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Closure va This",
      instruction: "Method ichida setTimeout bilan 'this'ni eslab qo'ling va closure orqali ishlating.",
      startingCode: "const user = {\n  name: 'Ali',\n  greetings: function() {\n    const self = this;\n    // Bu yerga setTimeout yozing\n  }\n};\n\nuser.greetings(); // 'Ali' chiqishi kerak\n",
      hint: "setTimeout(() => console.log(self.name), 100);",
      test: "if (code.includes('self') && code.includes('setTimeout')) return null; return 'This noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Higher-Order Function",
      instruction: "'adder(x)' funksiyasi qaytargan funksiya y ga x qo'shsa.",
      startingCode: "function adder(x) {\n  // Bu yerga yozing\n}\n\nconst add5 = adder(5);\nconsole.log(add5(3)); // 8\nconsole.log(add5(10)); // 15\n",
      hint: "return function(y) { return x + y; }",
      test: "if (code.includes('return')) return null; return 'Higher-order noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Private Method bilan Closure",
      instruction: "'createSecuredData' funksiya private data va public getter/setter metodlari qaytarsin.",
      startingCode: "function createSecuredData(initialData) {\n  let privateData = initialData;\n  // Object qaytaring: {get, set}\n}\n\nconst data = createSecuredData('secret');\nconsole.log(data.get()); // 'secret'\ndata.set('newSecret');\n",
      hint: "return { get: () => privateData, set: (val) => privateData = val }",
      test: "if (code.includes('privateData')) return null; return 'Secured noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Module Pattern",
      instruction: "IIFE orqali module yarating: public va private metodlar bo'lsin.",
      startingCode: "const calculator = (function() {\n  let result = 0;\n  // Bu yerga public metodlar yozing\n})();\n\ncalculator.add(5);\ncalculator.multiply(2);\nconsole.log(calculator.getResult()); // 10\n",
      hint: "return { add: (x) => result += x, multiply: (x) => result *= x, getResult: () => result }",
      test: "if (code.includes('IIFE') || code.includes('function')) return null; return 'Module noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Debounce Implementation",
      instruction: "'debounce(func, delay)' funksiyasi qaytargan funksiya oxirgi marta chaqirguncha kuta.",
      startingCode: "function debounce(func, delay) {\n  // Bu yerga yozing\n  return function(...args) {\n    // Bu yerga yozing\n  };\n}\n\nconst search = debounce((term) => console.log('Search:', term), 300);\nsearch('a');\nsearch('ab');\nsearch('abc'); // Faqat 'Search: abc' chiqadi\n",
      hint: "let timeoutId; clearTimeout(timeoutId); timeoutId = setTimeout(() => func(...args), delay);",
      test: "if (code.includes('setTimeout') && code.includes('clearTimeout')) return null; return 'Debounce noto\\'g\\'ri';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nfunction makeCounter() {\n  let count = 0;\n  return () => count++;\n}\nconst c1 = makeCounter();\nconst c2 = makeCounter();\nconsole.log(c1(), c1(), c2());\n```",
      options: ["0 1 2", "0 1 0", "1 2 1", "0 0 0"],
      correctAnswer: 1,
      explanation: "Har safar `makeCounter()` chaqirilganda, yangi mustaqil lexical environment (xotira doirasi) yaratiladi va uning ichida o'zining shaxsiy `count` o'zgaruvchisi bo'ladi. `c1` ikki marta chaqirilganda o'z `count`ini `0` keyin `1` qiladi. `c2` esa butunlay yangi context bo'lgani uchun u yana `0` dan boshlaydi."
    },
    {
      id: 2,
      question: "Tashqi o'zgaruvchi o'zgargandan so'ng chaqirilgan closure funksiyasi natijasini toping:\n```javascript\nlet x = 10;\nfunction f() {\n  console.log(x);\n}\nx = 20;\nf();\n```",
      options: ["10", "20", "undefined", "ReferenceError"],
      correctAnswer: 1,
      explanation: "Closure funksiya tashqi o'zgaruvchilarning nusxasini (value copy) emas, balki ularning o'ziga ishorani (reference) saqlaydi. Funksiya chaqirilgan vaqtda (runtime) `x` o'zgaruvchisining qiymati `20` bo'lgani uchun, konsolga `20` chiqadi."
    },
    {
      id: 3,
      question: "IIFE closure qoidasi bo'yicha quyidagi kod nima chiqaradi?\n```javascript\nconst fn = (function() {\n  let x = 0;\n  return () => {\n    x++;\n    return x;\n  };\n})();\nconsole.log(fn(), fn());\n```",
      options: ["1 1", "1 2", "0 1", "undefined undefined"],
      correctAnswer: 1,
      explanation: "IIFE (Immediately Invoked Function Expression) darhol bitta scope yaratib ishlaydi. U qaytargan arrow funksiya o'sha yaratilgan `x` o'zgaruvchisi bilan closure hosil qiladi. Har bir `fn()` chaqirilganda, bitta `x` qiymati ortib boradi: avval `1`, keyin `2` bo'ladi."
    },
    {
      id: 4,
      question: "Parametr va tashqi o'zgaruvchi to'qnashganda (shadowing) qaysi biri ishlaydi?\n```javascript\nlet x = 10;\nfunction factory(x) {\n  return () => console.log(x);\n}\nconst f = factory(20);\nf();\n```",
      options: ["10", "20", "undefined", "ReferenceError"],
      correctAnswer: 1,
      explanation: "Funksiyaning parametri `x` uning ichki scopi hisoblanadi va u tashqi global `x` o'zgaruvchisini soya ostida qoldiradi (shadowing). `factory(20)` chaqirilganda uning scopi ichida `x = 20` bo'ladi va closure shu `x`ni eslab qoladi."
    },
    {
      id: 5,
      question: "JavaScriptda static (lexical) scoping qoidasi bo'yicha quyidagi kod natijasini toping:\n```javascript\nconst x = 1;\nfunction a() {\n  const x = 2;\n  b();\n}\nfunction b() {\n  console.log(x);\n}\na();\n```",
      options: ["1", "2", "undefined", "ReferenceError"],
      correctAnswer: 0,
      explanation: "JavaScript — statik (lexical) scope ishlatadigan til. Ya'ni funksiyaning scope zanjiri u qayerda chaqirilganiga (`a` ichida) emas, balki qayerda e'lon qilinganiga (global doirada) qarab aniqlanadi. `b` funksiyasi global doirada e'lon qilingan bo'lsa, u global `x = 1` ni ko'radi."
    }
  ]
};
