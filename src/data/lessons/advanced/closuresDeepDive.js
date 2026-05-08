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
  console.log(x); // 10 - global dan koʻra oladi
}
\`\`\`

#### B. Function Scope (Funksiya darajasi)
\`\`\`javascript
function tashqi() {
  const y = 20; // Function scope

  function ichki() {
    console.log(y); // 20 - tashqida topa oladi
  }

  ichki();
  // console.log(y); // ichkida yo'q - ERROR!
}
\`\`\`

#### C. Block Scope (Blok darajasi)
\`\`\`javascript
{
  let a = 1;
  const b = 2;
  var c = 3;
}

// a va b: ReferenceError
// c: 3 (var'da block scope yo'q!)
\`\`\`

#### D. Lexical Scope (Qoida: ichka funksiyalar tashqa o'zgaruvchilarni ko'ra oladi)
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

Funksiya tashqarida yaratilgan bo'lsa ham, o'zining tashqarisidagi o'zgaruvchilarni "eslab" turadi.

\`\`\`javascript
function createCounter() {
  let count = 0; // Closure bu yerda buni eslab turadi

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

**Nima bo'lyapti?**
- `createCounter()` chaqirildi va qaytdi
- Lekin `count` o'zgaruvchisi **yo'q bo'lmadi** — closure uni bilan olib turdi
- Har bir chaqiruvda `count` o'sib turadi

#### B. Closure yordamida Private State

\`\`\`javascript
// 1️⃣ BANK KARTASI MISOLI
function createBankCard() {
  let balans = 0; // PRIVATE - tashqaridan o'zgartirib bo'lmaydi

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
console.log(karta.pulQoshish(100000)); // Qo'shildi: 100000. Balans: 100000
console.log(karta.balansniKorish()); // 100000

// Hech kim balansni to'g'ridan-to'g'ri o'zgartira olmaydi!
// karta.balans = 1000000; // Ishlamaydi - private!
\`\`\`

#### C. Function Factory (Sozlanuvchi Funksiyalar)

\`\`\`javascript
// Misol 1: Ko'paytirish fabrikasi
function createMultiplier(factor) {
  return function(num) {
    return num * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Misol 2: API URL fabrikasi
function createAPIClient(baseURL) {
  return {
    get(endpoint) {
      return \`\${baseURL}\${endpoint}\`;
    },
    post(endpoint, data) {
      return \`POST: \${baseURL}\${endpoint}\`;
    }
  };
}

const apiV1 = createAPIClient("https://api.example.com/v1");
const apiV2 = createAPIClient("https://api.example.com/v2");

console.log(apiV1.get("/users")); // https://api.example.com/v1/users
console.log(apiV2.get("/users")); // https://api.example.com/v2/users
\`\`\`

#### D. IIFE (Immediately Invoked Function Expression)

\`\`\`javascript
// IIFE — funksiyani darhol chaqirish
(function() {
  let private_x = 100;
  console.log(private_x); // 100
})();

// console.log(private_x); // ReferenceError

// Amaliyotda Module Pattern
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
console.log(calculator.subtract(2)); // 6
\`\`\`

#### E. Currying (Qisqaviy funksiya)

\`\`\`javascript
// Oddiy funksiya
function add(a, b) {
  return a + b;
}

// Curry versiyasi
function curriedAdd(a) {
  return function(b) {
    return a + b;
  };
}

console.log(curriedAdd(5)(3)); // 8

// Amaliyotda: Parametrlarni bosqichma-bosqich yuborish
const add5 = curriedAdd(5);
console.log(add5(10)); // 15
console.log(add5(20)); // 25

// Real hayotdagi misol:
function formatDate(separator) {
  return function(day) {
    return function(month) {
      return function(year) {
        return \`\${day}\${separator}\${month}\${separator}\${year}\`;
      };
    };
  };
}

const formatWithSlash = formatDate("/");
console.log(formatWithSlash(15)(3)(2025)); // 15/3/2025
\`\`\`

---

### 4. ADVANCED TUSHUNCHALAR

#### A. Closure va Loop Muammosi

\`\`\`javascript
// ❌ XATO - Bu ko'p ehtimol begona bulga
const functions = [];

for (var i = 0; i < 3; i++) {
  functions.push(function() {
    console.log(i); // Hammasi 3 chiqadi!
  });
}

functions[0](); // 3
functions[1](); // 3
functions[2](); // 3

// SABABU: var funksiya darajasida scope qiladi. Sikldan keyin i = 3.

// ✅ YECHIMI 1: let ishlatish (block scope)
const functions = [];
for (let i = 0; i < 3; i++) {
  functions.push(function() {
    console.log(i);
  });
}

functions[0](); // 0
functions[1](); // 1
functions[2](); // 2

// ✅ YECHIMI 2: Closure yordamida (eski usul)
const functions = [];
for (var i = 0; i < 3; i++) {
  functions.push((function(j) {
    return function() {
      console.log(j);
    };
  })(i));
}

functions[0](); // 0
functions[1](); // 1
functions[2](); // 2
\`\`\`

#### B. Closure va Memory Leak

\`\`\`javascript
// ⚠️ Memory leak ehtimoli
function createListener() {
  const bigData = new Array(1000000).fill("data");

  document.addEventListener("click", function() {
    console.log(bigData[0]); // bigData closure da qoladi
  });
}

// bigData hech qachon "chiqib" ketmaydi, ham foydalanuvchi listener o'chirganda ham.

// ✅ YECHIMI:
function createListener() {
  const bigData = new Array(1000000).fill("data");

  const handler = function() {
    console.log(bigData[0]);
  };

  document.addEventListener("click", handler);

  // Kerak bo'lganda ochirish:
  // document.removeEventListener("click", handler);
}
\`\`\`

#### C. Hoisting va TDZ (Temporal Dead Zone)

\`\`\`javascript
// VAR - Hoisting mavjud
console.log(x); // undefined (error emas)
var x = 5;

// LET/CONST - TDZ (Temporal Dead Zone)
// console.log(y); // ReferenceError! TDZ'da
let y = 5;
\`\`\`

---

### 5. REAL HAYOTDAGI MISOLLAR

#### Misol 1: Event Listener Manager
\`\`\`javascript
function createEventManager() {
  const listeners = [];

  return {
    on(event, callback) {
      listeners.push({ event, callback });
    },
    emit(event, data) {
      listeners
        .filter(l => l.event === event)
        .forEach(l => l.callback(data));
    },
    off(event) {
      listeners = listeners.filter(l => l.event !== event);
    }
  };
}

const events = createEventManager();
events.on("login", (user) => console.log("Login:", user));
events.emit("login", "Ali"); // Login: Ali
\`\`\`

#### Misol 2: Request Rate Limiter
\`\`\`javascript
function createRateLimiter(maxRequests, windowMs) {
  let requestCount = 0;

  return function() {
    if (requestCount >= maxRequests) {
      return "Kotora rasta!";
    }

    requestCount++;

    setTimeout(() => {
      requestCount--;
    }, windowMs);

    return "Requset qabul qilindi";
  };
}

const limit = createRateLimiter(3, 1000); // 3 ta so'rov/1 sekund
console.log(limit()); // Requset qabul qilindi
console.log(limit()); // Requset qabul qilindi
console.log(limit()); // Requset qabul qilindi
console.log(limit()); // Kotora rasta!
\`\`\`

---

### 6. 12 TA SAVOL VA JAVOBLAR

<details>
<summary><b>1. Closure nima va nima uchun kerak?</b></summary>
Closure = funksiya + uning tashqarisidagi o'zgaruvchilar. Kerak: Data privacy, factory functions, callbacks.
</details>

<details>
<summary><b>2. var, let, const farqni batafsilroq tushuntiring.</b></summary>
- \`var\`: funksiya darajasida scope, hoisting, re-declare mumkin
- \`let\`: block scope, TDZ, re-declare mumkin emas
- \`const\`: block scope, TDZ, o'zgartira olmaydi
</details>

<details>
<summary><b>3. Lexical scope nima?</b></summary>
Funksiya qaysi yerda yozilgani bo'yicha ko'rining qoida — ichka funksiyalar tashqaring o'zgaruvchilarini ko'ra oladi.
</details>

<details>
<summary><b>4. for loop bilan var/let farqi nima?</b></summary>
\`var\` — loop dagi o'zgaruvchi loop tashqarida ham mavjud. \`let\` — faqat block ichida.
</details>

<details>
<summary><b>5. IIFE qachon kerak?</b></summary>
Private scope yaratmoqchi bo'lganda, module pattern yozganda.
</details>

<details>
<summary><b>6. Currying nima va nega kerak?</b></summary>
Funksiya parametrlarini bosqichma-bosqich yuborish. Kerak: Partial application, composition.
</details>

<details>
<summary><b>7. Closure memory leak qilishi mumkinmi?</b></summary>
Ha! Agar big data closure da qolsa va listener o'chirilmasa, xotirada qoladi.
</details>

<details>
<summary><b>8. TDZ nima?</b></summary>
Temporal Dead Zone — let/const bilan o'zgaruvchi initialization dan oldin ishlatish xatosi.
</details>

<details>
<summary><b>9. Function Factory nima misol bilan?</b></summary>
Sozlanuvchi funksiyalar qaytaradigan funksiya. Misol: \`createMultiplier(2)\` → \`multiply by 2\` funksiya.
</details>

<details>
<summary><b>10. Closure va this o'rtasidagi bog'lanish?</b></summary>
Closure \`this\` ni saqlaydi, lekin \`this\` lexical emas — chaqirish kontekstiga bog'liq.
</details>

<details>
<summary><b>11. Recursive funksiya closure dan foydalanishi mumkinmi?</b></summary>
Ha! Recursive funksiya closure yaratishi mumkin va uni sanab turishi mumkin.
</details>

<details>
<summary><b>12. Module pattern nima va qanday yoziladi?</b></summary>
IIFE yordamida public va private API yaratish. Misol: \`const mod = (function() { ... })();\`
</details>`,
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
  ]
};
**Vazifa:** Faqat maxfiy kod bilan o'qish mumkin bo'lgan xabar saqlagich yarating.

\`\`\`javascript
function secretStore(initialMessage) {
  let message = initialMessage;
  
  return (code) => {
    if (code === "1234") return message;
    return "Xato kod!";
  };
}

const mySecret = secretStore("Yashirin xabar!");
console.log(mySecret("0000")); // → Xato kod!
console.log(mySecret("1234")); // → Yashirin xabar!
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Private variable",
      instruction: "Closure yordamida 'name'ni saqlaydigan va uni faqat 'getName()' orqali qaytaradigan funksiya yozing.",
      startingCode: "function person(initialName) {\n  let name = initialName;\n  // return qiling\n}",
      hint: "return { getName: () => name };",
      test: "const p = person('Ali'); if (p.getName() === 'Ali') return null; return 'getName() funksiyasi name-ni qaytarishi kerak';"
    }
  ]
};
