export const closuresDeepDive = {
  id: "a20",
  title: "🔐 Closures va Scope (Chuqur O'rganish)",
  level: "Murakkab",
  theory: `## 📌 CLOSURES VA SCOPE — CHUQUR O'RGANISH

### 1. NEGA KERAK? (Asosiy savol)
"Closure nima?" savoliga deyarli barcha dasturchilar "ichki funksiyaning tashqi funksiya o'zgaruvchilarini eslab qolishi" deb javob bera oladilar. Ammo real hayotda u nima uchun kerak?
- **Ma'lumotlar inkapsulyatsiyasi (Encapsulation):** Obyekt xossalarini to'g'ridan-to'g'ri o'zgartirishdan himoya qilish (Private properties).
- **Dinamik funksiyalar yaratish (Function Factory):** Masalan, turli xil hisob-kitoblar yoki sozlamalarga ega funksiyalarni generatsiya qilish.
- **Keshlashtirish va Memoization:** Funksiya natijalarini uning o'z xotirasida (closure) saqlab qolish va qayta hisob-kitoblarni oldini olish.
- **Asinxron operatsiyalar va Callbacks:** \`setTimeout\` yoki tarmoq so'rovlari vaqtida kontekst (muhit) holatini saqlab qolish.

---

### 2. SCOPE VA LEKSIK MUHIT (UNDER THE HOOD)

Har safar JavaScriptda funksiya ishga tushganda yoki blok (\`{...}\`) bajarilganda xotirada yashirin **Lexical Environment (Leksik muhit)** obyekti yaratiladi. U ikki qismdan iborat:
1. **Environment Record:** Hozirgi scope'dagi barcha mahalliy o'zgaruvchilar va parametrlar saqlanadigan joy.
2. **Outer Link (Tashqi havola):** Tashqi (ota) leksik muhitga ko'rsatkich.

\`\`\`mermaid
graph LR
    subgraph Global Lexical Environment
        A[Env Record: global_x = 10]
        B[Outer Link: null]
    end
    subgraph Tashqi Lexical Environment
        C[Env Record: tashqi_y = 20]
        D[Outer Link: Global Env]
    end
    subgraph Ichki Lexical Environment
        E[Env Record: ichki_z = 30]
        F[Outer Link: Tashqi Env]
    end
    F --> D
    D --> B
\`\`\`

#### VariableEnvironment vs LexicalEnvironment
Bajarilish konteksti (Execution Context) yaratilganda, o'zgaruvchilar turi bo'yicha ikki xil muhitga joylashtiriladi:
* **VariableEnvironment:** \`var\` yordamida e'lon qilingan o'zgaruvchilarni saqlaydi (chunki ular block-scoped emas, balki function-scoped).
* **LexicalEnvironment:** \`let\`, \`const\`, \`class\` va funksiya deklaratsiyalarini saqlaydi. Blok scope (masalan \`if\` yoki \`for\`) boshlanganda, faqat yangi \`LexicalEnvironment\` yaratiladi va zanjirga ulanadi, \`VariableEnvironment\` esa o'z holicha qolaveradi.

---

### 3. V8 GARBAGE COLLECTION VA DEBUGGER GOTCHA

Nazariy jihatdan, agar ichki funksiya (closure) tashqariga qaytarilsa, u tashqi funksiyaning **barcha** o'zgaruvchilarini o'zida saqlab qolishi kerak. Ammo bu xotirada katta hajmli ma'lumotlar qolib ketishiga (Memory Leak) olib kelishi mumkin.

**V8 Dvigateli Optimallashuvi (V8 Engine GC Optimization):**
Zamonaviy JS dvigatellari (V8, JavaScriptCore) kodni statik tahlil qiladi. Agar tashqi o'zgaruvchi ichki funksiyada **ishlatilmagan** bo'lsa, u leksik muhit yozuvidan (Environment Record) avtomatik ravishda **o'chiriladi** (Garbage Collected).

**Debugger Gotcha (Tuzoq):**
Agarda siz kodingizga \`debugger\` qo'yib, V8 optimallashtirgan (ichki funksiyada ishlatilmagan) tashqi o'zgaruvchini konsolga yozmoqchi bo'lsangiz, \`ReferenceError: variable is not defined\` xatosini olasiz, garchi u kodda yozilgan bo'lsa ham!

\`\`\`javascript
function outer() {
  let unusedValue = "Katta massiv...";
  let usedValue = "Salom";
  
  return function inner() {
    // usedValue ishlatilgan, xotirada saqlanadi
    console.log(usedValue); 
    // unusedValue ishlatilmagan, V8 uni GC orqali o'chirib yuboradi!
    debugger; // Konsolda unusedValue ni o'qib bo'lmaydi
  };
}
const myFn = outer();
myFn();
\`\`\`

---

### 4. LOOPlar VA LET UNDER THE HOOD

Nima uchun \`for (let i = 0; i < 3; i++)\` har bir qadamda yangi o'zgaruvchi qiymatini saqlaydi?
JavaScript har bir loop iteratsiyasi (aylanishi) uchun **mutlaqo yangi Lexical Environment** yaratadi va oldingi iteratsiyadagi \`i\` qiymatini yangi muhitga ko'chirib o'tkazadi (copy).

\`\`\`mermaid
sequenceDiagram
    participant Loop as For Loop Engine
    participant Env0 as Iteration 0 Env (i = 0)
    participant Env1 as Iteration 1 Env (i = 1)
    participant Env2 as Iteration 2 Env (i = 2)
    Loop->>Env0: Yaratish: i = 0
    Loop->>Env1: Yangi Env: oldingi i (0) + 1 -> i = 1
    Loop->>Env2: Yangi Env: oldingi i (1) + 1 -> i = 2
\`\`\`

---

### 5. REAL HAYOTDAN MISOL: MEMOIZATION
Memoization — hisob-kitoblarni closure ichidagi kesh yordamida tezlashtirish patternidir:
\`\`\`javascript
function createFibonacci() {
  const cache = {}; // Closure xotirasi
  
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}
const fib = createFibonacci();
console.log(fib(40)); // Bir necha millisekundda hisoblaydi!
\`\`\`
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
      startingCode: "const global = 'global';\nfunction outer() {\n  const outer = 'outer';\n  function inner() {\n    const inner = 'inner';\n    // Kodni shu yerda yozing\n    console.log(/* global, outer, inner */);\n  }\n  inner();\n}\nouter();",
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
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Memoize Funksiya (Memoization)",
      instruction: "Katta hajmli hisob-kitoblarni optimallashtirish uchun universal `memoize(fn)` keshlovchi funksiyani yozing. U berilgan `fn` funksiyasining natijalarini closure xotirasida (obyekt yoki Map-da) saqlab qolsin. Agar keyingi safar chaqirilganda parametrlar bir xil bo'lsa, keshdagi natijani qaytarsin (parametr sifatida bitta primitiv qiymat uzatiladi deb hisoblang).",
      startingCode: "function memoize(fn) {\n  // Kodni shu yerdan yozing\n}\n",
      hint: "const cache = {}; return function(arg) { if (arg in cache) return cache[arg]; return cache[arg] = fn(arg); };",
      test: "let count = 0; const double = x => { count++; return x * 2; }; const memoized = memoize(double); if (memoized(5) === 10 && memoized(5) === 10 && count === 1) return null; return 'Memoize keshdan to\\'g\\'ri foydalanmadi';"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Xavfsiz reyestr (Secure Registry)",
      instruction: "Faqat closure va uning ichidagi Leksik muhit orqali qiymatlarni saqlaydigan xavfsiz reyestr `createSecureRegistry()` funksiyasini yozing. U tashqi o'zgaruvchilardan butunlay yashirin bo'lgan Map yoki obyektni saqlasin va quyidagi metodlarga ega obyektni qaytarsin:\n- `register(key, val)` - qiymatni reyestrga qo'shadi;\n- `has(key)` - reyestrda kalit borligini tekshiradi (true/false);\n- `get(key)` - qiymatni oladi (agar bo'lmasa undefined).",
      startingCode: "function createSecureRegistry() {\n  // Kodni shu yerdan yozing\n}\n",
      hint: "const registry = new Map(); return { register(k, v) { registry.set(k, v); }, has(k) { return registry.has(k); }, get(k) { return registry.get(k); } };",
      test: "const reg = createSecureRegistry(); reg.register('apiKey', 'secret_123'); if (reg.has('apiKey') && reg.get('apiKey') === 'secret_123' && !reg.hasOwnProperty('registry')) return null; return 'Secure registry to\\'g\\'ri ishlamadi';"
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
      question: "Closures qanday qildek \"Memory Leak\" (xotira sizib chiqishi) ga sabab bo'lishi mumkin?",
      options: [
        "Hech qachon xotira muammosiga sabab bo'lmaydi",
        "Tashqi funksiyadagi katta hajmli ma'lumotlar (masalan, yirik massivlar) closure funksiya xotirada turgunicha Garbage Collector tomonidan o'chirilmaydi",
        "Barcha closure'lar avtomatik tarzda cheksiz loop yaratadi",
        "O'zgaruvchilarni var bilan yaratganda"
      ],
      correctAnswer: 1,
      explanation: "Agar closure funksiya yirik hajmli ma'lumotni ushlab tursa va u closure uzoq vaqt (masalan, global DOM event listener ichida) xotirada yashasa, Garbage Collector u yirik ma'lumotni o'chira olmaydi va natijada xotira band bo'lib qolaveradi."
    },
    {
      id: 6,
      question: "Temporal Dead Zone (TDZ) atamasi nimani anglatami?",
      options: [
        "`let` yoki `const` bilan e'lon qilingan o'zgaruvchining scope boshidan to unga qiymat berilguncha bo'lgan, murojaat qibly bo'lmaydigan hududi",
        "Funksiya bajarilib tugagandan keyin uning o'chib ketish vaqti",
        "JavaScript Call Stack to'lib qolgandagi holat",
        "Event Loop kutish vaqti"
      ],
      correctAnswer: 0,
      explanation: "TDZ — let va const bilan e'lon qilingan o'zgaruvchilarning hoisting holatida ularga e'lon qilinishidan oldin murojaat qilinsa, ReferenceError beradigan vaqtinchalik kirish taqiqlangan zonadir."
    },
    {
      id: 7,
      question: "Currying nima?",
      options: [
        "Ko'p argumentli funksiyani ketma-ket bittadan argument oluvchi bir necha funksiyalarga bo'lish jarayoni",
        "Funksiyani recursiv chaqirish mexanizmi",
        "Obyekt elementlarini kalitlari bo'yicha saralash",
        "Brauzer xotirasini optimallashtirish"
      ],
      correctAnswer: 0,
      explanation: "Currying - ko'p argumentli funksiyani har safar bitta argument qabul qiladigan va keyingi argumentni olish uchun yangi funksiya qaytaradigan zanjirli shaklga keltirishdir."
    },
    {
      id: 8,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst make = () => {\n  let counter = 0;\n  return {\n    get: () => counter,\n    inc: () => { counter++; }\n  };\n};\nconst m = make();\nm.inc();\nconsole.log(m.get());\n```",
      options: [
        "`1`",
        "`0`",
        "`undefined`",
        "`TypeError`"
      ],
      correctAnswer: 0,
      explanation: "`inc()` metodi closure-scoped bo'lgan counter qiymatini 0 dan 1 ga oshiradi. `get()` esa o'sha o'zgargan qiymatni qaytaradi."
    },
    {
      id: 9,
      question: "JavaScript-da garbage collection (axlat yig'uvchi) qanday ishlaydi va closure-ga qanday ta'sir qiladi?",
      options: [
        "O'zgaruvchiga yetib borish imkoni (reachability) bo'lmasa, u o'chiriladi. Closure unga ishorani ushlab tursa, u o'chmaydi",
        "Ballar o'zgaruvchilar har 5 soniyada majburan o'chiriladi",
        "Faqat global o'zgaruvchilar saqlab qolinadi",
        "Faqat callbacklar o'chiriladi"
      ],
      correctAnswer: 0,
      explanation: "JavaScript engine xotiradagi ma'lumotlarni qidirishda 'yetib borish' qoidasiga tayanadi. Agar closure ichidagi o'zgaruvchiga murojaat qilish imkoniyati hali ham madison bo'lsa (ya'ni ichki funksiya faol bo'lsa), GC ordan o'chirmaydi."
    },
    {
      id: 10,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet val = 10;\nfunction show() {\n  console.log(val);\n}\nfunction run() {\n  let val = 20;\n  show();\n}\nrun();\n```",
      options: [
        "`10`",
        "`20`",
        "`undefined`",
        "`ReferenceError`"
      ],
      correctAnswer: 0,
      explanation: "JavaScript static (lexical) scope ishlatadi. `show` e'lon qilingan joyda `val` global scope-dagi `10` ga ishora qiladi, shuning uchun `run` ichidan chaqirilsa ham static e'lon qilingan qiymat chiqadi."
    },
    {
      id: 11,
      question: "Module pattern-da closures-dan foydalanishdan maqsad nima?",
      options: [
        "Koddagi funksionallikni ma'lum qismlarga (modullarga) ajratib, public va private a'zolarni ta'minlash uchun",
        "Asinxron so'rovlarni tezlashtirish uchun",
        "Kodni xatolarini avtomatik tuzatish uchun",
        "Kodni faqat strict mode-da ishga tushirish uchun"
      ],
      correctAnswer: 0,
      explanation: "Module pattern closure yordamida o'zgaruvchilar va yordamchi funksiyalarny tashqi dunyodan yashirishga (private qilish) va faqat kerakli API metodlarini tashqariga chiqarishga imkon beradi."
    },
    {
      id: 12,
      question: "`const add = x => y => z => x + y + z;` ko'rinishidagi yozuv nima deb ataladi?",
      options: [
        "Currying (zanjirli closure-lar)",
        "Recursive self-invocation",
        "Function compilation",
        "Object destructing"
      ],
      correctAnswer: 0,
      explanation: "Bu bir nechta argumentlarni qabul qilishni closure-lar yordamida ketma-ketlikka bo'lgan currying texnikasidir."
    },
    {
      id: 13,
      question: "V8 dvigateli (Garbage Collector) closures xotirasini optimallashtirishi nima uchun ba'zida debuggerda o'zgaruvchi topilmadi xatosiga sabab bo'ladi?",
      options: [
        "Chunki V8 closure ichida ishlatilmagan tashqi o'zgaruvchilarni GC orqali o'chirib yuboradi, natijada ular debuggerda 'not defined' bo'lib qoladi",
        "Chunki debugger closures bilan umuman ishlay olmaydi",
        "Chunki V8 barcha closure'larni avtomatik tarzda sinxronlashtiradi",
        "Chunki debugger orqali xotira butunlay tozalab tashlanadi"
      ],
      correctAnswer: 0,
      explanation: "Zamonaviy JS dvigatellari xotirani optimallashtirish uchun ichki funksiyada (closureda) ishlatilmagan tashqi o'zgaruvchilarni leksik muhitda saqlamaydi, balki o'chirib yuboradi. Shuning uchun debuggerda to'xtaganda, o'sha o'zgaruvchi xotirada mavjud bo'lmaydi."
    },
    {
      id: 14,
      question: "Bajarilish konteksti (Execution Context) ichidagi VariableEnvironment va LexicalEnvironment o'rtasidagi farq nima?",
      options: [
        "VariableEnvironment block scope o'zgaruvchilarini saqlaydi, LexicalEnvironment esa global xossalarni",
        "VariableEnvironment faqat 'var' bilan e'lon qilingan o'zgaruvchilarni, LexicalEnvironment esa 'let', 'const' kabi block scope o'zgaruvchilarini saqlaydi",
        "Ular o'rtasida hech qanday farq yo'q, ikkalasi ham bir xil ma'lumotlarni saqlaydi",
        "VariableEnvironment faqat stackda ishlaydi, LexicalEnvironment esa diskda"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda 'var' o'zgaruvchilari VariableEnvironment'ga tushadi, 'let' va 'const' esa LexicalEnvironment'ga ulanadi. Blok scope (if/for) ochilganda, yangi LexicalEnvironment yaratilib, context o'shanga ulanadi, VariableEnvironment esa o'zgarmaydi."
    }
  ]
};
