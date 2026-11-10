# 📚 Closures Qo'shimcha — Module Pattern, Factory Functions, Currying — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**Closure (yopilma)** — ichki funksiya tashqi o'zgaruvchilarni "o'rganib qolgan" va ularni qayta ishlash imkonini beruvchi qurilma. Oddiy dars (1-dars)da `function outer() { let x = 1; return function inner() { console.log(x); }; }` — inner `x` ni "o'rganib qoldi".

**Closures qo'shimcha** — closure yordamida hayotiy qurilmalar (module, factory, currying).

### 1. Module Pattern (Modul qurilishi) — `private` va `public` maydonlar

- **Oddiy module (IIFE bilan):** `const module = (() => { let private = 0; return { increment() { private++; }, get() { return private; } }; })();` — `private` closure ichida, `public` methods return orqali. Tashqi `module.private` yo'q.
- **Revealing Module Pattern:** "private" vatiilarning "public" maydonlarimiz qaytariladi. `const module = (() => { const _data = []; function add(item) { _data.push(item); } function getAll() { return _data; } return { add, getAll }; })();` — `add` va `getAll` return orqali "public", `_data` private.
- **ES Modules (zamonaviy):** `export const func = () => {}; const private = 0;` — "private" module ichida (file scope), `export` public. `import { func } from './module.js';` — module import. ES Modules "private by default" (file scope).

### 2. Factory Functions (Yarotuvchi funksiyalar) — yangi obyekt yaratish

- **Factory function — funksiya yangi obyekt qaytaradi (classga o'xshash, lekin `new` emas).** `function createUser(name) { let _age = 0; return { getName() { return name; }, birthday() { _age++; }, getAge() { return _age; } }; }` — `_age` private (closure ichida), `birthday()` o'zgartiradi.
- **Private state (uslubi):** Factory function ichida `let _data = []` yoki `const _data = new WeakMap()` — private data. Misol: `const _cache = new WeakMap();` — `obj` private ma'lumot (GC bilan).
- **Uzoq muddatli state:** Factory function yaratgan obyekt uzoq muddatli ishlaydi (state saqlanadi). Misol: counter, karzina, foydalanuvchi session.

### 3. Currying (Qayta chaqirish) — funksiya argumentlarni qisman qabul qiladi

- **Currying — funksiya argumentlarni qisman qabul qilib, funksiya qaytaradi.** `function add(a) { return function(b) { return a + b; }; }` — `add(2)(3)` = 5 (qiymat).
- **Umumiy curry (arity — argumentlar soni):** `function curry(fn) { return function curried(...args) { if (args.length >= fn.length) return fn(...args); return function(...more) { return curried(...args, ...more); }; }; }` — funksiya `fn.length` (argumentlar soni) ga erishguncha funksiya qaytaradi, keyin chaqiriladi.
- **Foizlar (foydalanish):** `const add2 = add(2);` — `add2(3)` = 5. `const multiply = (a, b, c) => a * b * c;` — `curry(multiply)(2)(3)(4)` = 24. `curry(multiply)(2, 3)(4)` = 24.
- **Partial application (Qisman qo'llash):** `fn.bind(null, arg1, arg2)` — birinchi argumentlar oldindan. `const double = multiply.bind(null, 2);` — `double(5)` = 10. Currying — step-by-step; partial application — arglar oldindan.

### 4. Closure — xotira (memory leak) — closure ichidagi data saqlanadi

- **Closure ichidagi data:** Closure tugashidan so'ng ham, ichki o'zgaruvchilar xotirada saqlanadi (agar funksiya chaqirilishi mumkin bo'lsa). `function createHuge() { const huge = new Array(1000000).fill('x'); return function() { console.log(huge.length); }; }` — `huge` saqlanadi, funksiya tugash bilan, xotira "leak" (yo'qotish).
- **Memory leak kamaytirish:** `WeakMap` yordamida (GC bilan), yoki data `null` qilish (tugashidan so'ng). `const _cache = new WeakMap();` — GC bilan. Yoki `cleanup` yordamida (tugashdan so'ng data ni `null` qilish).

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Module Pattern (Revealing Module) — private / public
const CounterModule = (() => {
  let _count = 0; // private
  function increment() { _count++; return _count; }
  function decrement() { _count--; return _count; }
  function reset() { _count = 0; return _count; }
  function getCount() { return _count; }
  // "public" methods
  return {
    increment,
    decrement,
    reset,
    getCount,
  };
})();

CounterModule.increment(); // 1
CounterModule.increment(); // 2
CounterModule.getCount();  // 2
CounterModule.reset();     // 0
// CounterModule._count — undefined (private)

// 2. Factory Function — private state
function createCounter(initial = 0) {
  let count = initial;
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    getCount() { return count; },
    reset() { count = initial; return count; },
  };
}
const counterA = createCounter(10);
counterA.increment(); // 11
counterA.increment(); // 12
const counterB = createCounter();
counterB.increment(); // 1
// counterA va counterB har xil state (private)

// 3. Currying — umumiy
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...more) {
      return curried.apply(this, [...args, ...more]);
    };
  };
}
function multiply(a, b, c) { return a * b * c; }
const curriedMultiply = curry(multiply);
curriedMultiply(2)(3)(4);   // 24
curriedMultiply(2, 3)(4);   // 24
curriedMultiply(2)(3, 4);   // 24

// 4. Partial application (bind)
function multiply(a, b) { return a * b; }
const double = multiply.bind(null, 2);
double(5); // 10
const triple = multiply.bind(null, 3);
triple(4); // 12

// 5. Factory Function — WeakMap private state
const _userIdCache = new WeakMap();
function createUserSession(userId) {
  const data = { userId, loginTime: Date.now(), active: true };
  _userIdCache.set(data, { active: true });
  return {
    isActive() { return _userIdCache.get(data).active; },
    logout() { _userIdCache.get(data).active = false; },
    getUserId() { return data.userId; },
  };
}
const session = createUserSession("u123");
session.isActive(); // true
session.logout();
session.isActive(); // false

// 6. Module — WeakMap private + public
const _cache = new WeakMap();
const CacheModule = (() => {
  return {
    set(key, value) {
      _cache.set(key, value);
    },
    get(key) {
      return _cache.get(key);
    },
    has(key) {
      return _cache.has(key);
    },
  };
})();

// 7. Currying — foydali misol (API function)
function apiCall(base, resource, id) {
  return fetch(`${base}/${resource}/${id}`).then(r => r.json());
}
const baseApi = curry(apiCall)("https://api.example.com");
const getUser = baseApi("users");
const getPost = baseApi("posts");
getUser(123); // fetch("https://api.example.com/users/123")
getPost(456); // fetch("https://api.example.com/posts/456")
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Private property — `_` oxirgi belgi bilan "sirli"
function createCounter() {
  let _count = 0;
  return {
    getCount() { return _count; },
    setCount(val) { _count = val; }, // _count — "private" emas (obob)
    _count: 0, // xato — bu property hashar
  };
}
const c = createCounter();
c._count = 999; // xato — private bo'lmagan (oxirgi `_` — odatda, ammo `c._count` mavjud)

// XATO 2: Module pattern — global pollution
let globalCount = 0; // global
const badModule = {
  increment() { globalCount++; }, // globalCount — global (pollution)
};
// Yaxshi: IIFE ichida private

// XATO 3: Currying — recursive xato (bind qo'llanmagan)
function badCurry(fn) {
  return function(...args) {
    if (args.length >= fn.length) return fn(...args);
    // bu yerda recursive call — bind yo'q, `fn` o'zgarmagan
    return badCurry(fn.bind(null, ...args)); // xato — function.length o'zgarmaydi
  };
}
badCurry(multiply)(2)(3)(4); // xato — length o'zgarmaydi (recursive infinite)

// XATO 4: Module Pattern — global pollution
const CounterModule = (() => {
  let count = 0;
  return { increment() { count++; } };
})();
// Global chakika — count global (hofizachi emas)

// XATO 5: Factory — `this` confusion (arrow function yoki function)
function createUser(name) {
  return {
    name,
    greet() { console.log("Hello, " + this.name); }, // this = obyekt (to'g'ri)
  };
}
const u = createUser("Ali");
const greetFn = u.greet;
greetFn(); // "Hello, undefined" — this confusion (this = window)

// XATO 6: Factory — state ni "reference" bilan uzadi
function createList() {
  const list = [];
  return {
    add(item) { list.push(item); },
    getAll() { return list; }, // list — reference (tashqi o'zgartirish mumkin)
  };
}
const obj = createList();
obj.add(1);
obj.add(2);
obj.getAll().push(3); // list — o'zgardi (reference) — xato (private state o'zgardi)
// Yaxshi: getAll() return [...list] yoki Object.freeze

// XATO 7: Currying — arity xato (fn.length chaqiriladi function pattern)
function sum(...args) { return args.reduce((a, b) => a + b, 0); }
// sum.length = 0 (rest parameter)
curry(sum)(1)(2)(3); // xato — sum.length = 0, shunday qilib, birinchi chaqirishda bn 0 — "fn(...args)" chaqiriladi, args.length < 0 — infinity recursion

// XATO 8: Closure memory leak — uzoq muddatli data
function createHuge() {
  const huge = new Array(1000000).fill("x");
  return function() { console.log(huge.length); };
}
const fn = createHuge();
fn(); // huge saqlanadi, xotira "leak"
// Yaxshi: data ni tugashidan so'ng null qilish yoki WeakMap
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Module Pattern (Revealing Module):** IIFE ichida private, return { public } — public methods. Private state — tashqi access yo'q (undefined).
- **Factory Function:** `new` emas, yangi obyekt qaytaradi, private state (closure yoki WeakMap).
- **WeakMap private state:** `const _cache = new WeakMap();` — GC bilan, private data.
- **Currying (umumiy):** `curry(fn)` — `fn.length` (argumentlar soni) ga erishguncha funksiya qaytaradi, keyin chaqiriladi.
- **Partial application:** `fn.bind(null, arg1, arg2)` — oldindan argumentlar. Currying — step-by-step; partial application — oldindan.
- **Array return — copy:** `getAll() { return [...list]; }` — reference o'zgartirmaslik uchun.
- **Memory leak kamaytirish:** WeakMap yoki data null qilish (tugashidan so'ng).

### ❌ Noto'g'ri:

- **Private `_` prefix:** `c._count` — private emas (oxirgi `_` — odatda, ammo property mavjud).
- **Global pollution:** IIFE ichida emas, global variable — pollution.
- **Currying recursive xato:** `fn.length` o'zgarmaydi, recursive infinite (bind yo'q).
- **Factory — `this` confusion:** `greetFn()` — this confusion (this = window) — arrow function yoki bind yoki method chaqirish.
- **Factory — reference uzadi:** `getAll()` — reference (list o'zgarishi mumkin) — copy yoki freeze.
- **Currying — rest parameter:** `fn.length = 0` — arity 0 — chaqirishda infinity recursion.
- **Closure memory leak:** huge data saqlanadi — WeakMap yoki null qilish.

## 🎩 Hayotiy o'xshatishlar

- **Module Pattern:** "Hujjat boshqaruvi" — ichki hujjatlar (private) — tashqi "ko'rinmaydigan", public methods orqali boshqarish. Masalan: "Bank hisobkarti" — ichki parametrlari private, public methods (`deposit`, `withdraw`, `getBalance`).
- **Factory Function:** "Fabrika" — har doim yangi "tovar" (obyekt) yaratish. Masalan: "Mablag' kartasi" — ichki chek private, public methods (`topUp`, `pay`, `getBalance`). Factory function yordamida private data.
- **Currying:** "Chaqiriş" — birlik qo'shish — "IKKI suvni qo'shish" — `add(2)(3)` = 5 (har biri alohida). Yoki "uchta suv" — `add(2)(3)(4)` (step-by-step). Yoki `curry(multiply)(2)(3)(4)`.
- **Partial application:** "To'ldirish" — "birinchi suv" beriladi — `double(5)` = 10. Yoki "ikkita suv beriladi" — `curry(multiply)(2, 3)` — qolgan "yiga" qabul qiladi.
- **Closures memory leak:** "Xotira" — "hajmli" data saqlanadi — tugashidan so'ng. Masalan: "video recording" — `huge` data saqlanadi — tugashidan so'ng "xotira leak" — WeakMap yoki null qilish.

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ Closures qo'shimcha ] --> B1[ Module Pattern ]
    A --> B2[ Factory Functions ]
    A --> B3[ Currying ]
    A --> B4[ Partial Application ]
    A --> B5[ Closure memory ]

    B1 --> C1[ IIFE ichida private\nreturn { public methods }\n— private state ]
    B2 --> C2[ Funksiya yangi obyekt\nnew emas\nprivate state (closure)\n— har xil obyekt ]
    B3 --> C3[ Curry(fn)\nargs.length >= fn.length\nchaqiriladi\n— step-by-step ]
    B4 --> C4[ bind(null, arg1, arg2)\noldindan arglar\n— partial application ]
    B5 --> C5[ WeakMap yoki null\ntugashidan so'ng\nGC bilan\n— memory leak kamaytirish ]

    C2 --> D1[ createUser()\nreturn { methods }\nprivate _age\n— har xil state ]
    C3 --> D2[ curry(multiply)(2)(3)(4) = 24\nstep-by-step\n(2)(3)(4) ]
    C4 --> D3[ double = multiply.bind(null, 2)\ndouble(5) = 10\n— oldindan arg ]
    C5 --> D4[ WeakMap.set(obj, data)\nGC — tugash\nnull qilish\n— memory leak kamaytirish ]

    style B1 fill:#e3f2fd,stroke:#1976d2
    style B2 fill:#e8f5e9,stroke:#2e7d32
    style B3 fill:#fff3e0,stroke:#e65100
    style B4 fill:#f3e5f5,stroke:#7b1fa2
    style B5 fill:#ffebee,stroke:#c62828
```

**Diagrama tushuntirishi:** Closures qo'shimcha — 5 ta asosiy qism:
1. **Module Pattern** — IIFE ichida private, return { public methods }.
2. **Factory Functions** — funksiya yangi obyekt (new emas), private state (closure yoki WeakMap).
3. **Currying** — `curry(fn)` — `fn.length` ga erishguncha funksiya qaytaradi, keyin chaqiriladi (step-by-step).
4. **Partial Application** — `bind(null, arg1, arg2)` — oldindan arglar.
5. **Closure memory** — WeakMap yoki null qilish — memory leak kamaytirish.

## 🎙 Intervyu savollari va javoblari

### 1. Module Pattern nima? Nima uchun foydali?

**Javob:** Module Pattern — IIFE (Immediately Invoked Function Expression) ichida private variables/functionlar, return { public methods }. Private state — tashqi access yo'q (undefined). Foydali — "global pollution" kam, private state (masalan, counter, cache, config), module yagona "instance" (yoki multiple instances — factory). Shunday qilib, private data va public API.

### 2. Factory Function va class farqi?

**Javob:** Factory Function — funksiya yangi obyekt qaytaradi (new emas). Class — `class Person { constructor() {} } new Person()` — OOP. Factory — private state (closure yoki WeakMap) yordamida, class — `#field` (ES2022) yoki WeakMap. Factory — lighter-weight, class — OOP sintaksisi. Shunday qilib, factory — simple obyekt, class — OOP.

### 3. Currying nima? Misol yozing.

**Javob:** Currying — funksiya "qayta chaqirish": `add(2)(3)(4)` — har biri alohida. Funksiya, argumentlarning bir qismini qabul qilib, funksiya qaytaradi. Shunday qilib, `curry(fn, arity)` — umumiy. Misol: `add(a) { return function(b) { return a + b; }; }` — `add(2)(3)` = 5. Shunday qilib, step-by-step.

### 4. Currying va Partial Application farqi?

**Javob:** Currying — funksiya "qayta chaqirish" — argumentlarning bir qismini qabul qilib, funksiya qaytaradi (step-by-step). Partial Application — funksiya "qisman argumentlar oldindan" — bind yordamida `multiply.bind(null, 2)` — `double(5)` = 10. Shunday qilib, currying — step-by-step, partial application — oldindan arglar. Bind — partial application yordamida.

### 5. WeakMap private state qanday ishlaydi? Nima uchun foydali?

**Javob:** WeakMap — key: object, value: private data. `const _cache = new WeakMap(); _cache.set(obj, privateData);` — `obj` private data. Garbage collection (GC) — `obj` yo'q bo'lganda, WeakMap entry ham "remove" (GC bilan). Shunday qilib, memory leak kam (GC). Shunday qilib, factory function yoki module ichida private data — WeakMap yordamida, GC bilan, memory leak kamaytirish.

### 6. Closure memory leak nima? Qanday kamaytirish mumkin?

**Javob:** Closure ichidagi data (huge array) tugashidan so'ng ham saqlanadi (funksiya chaqirilishi mumkin bo'lsa). Shunday qilib, memory leak. Kamaytirish: WeakMap yordamida (GC bilan), yoki tugashidan so'ng data null qilish (masalan, `cleanup()` yoki `data = null`), yoki data ni kamaytirish (o'rniga WeakMap). Shunday qilib, memory leak kamaytirish.

### 7. `fn.length` nima? Curryingda qanday ishlatiladi?

**Javob:** `fn.length` — funksiya "expected arguments soni" (rest parameter yo'q). Masalan: `function add(a, b) {}` — `add.length = 2`. `function sum(...args) {}` — `sum.length = 0` (rest parameter). Shunday qilib, curry — `fn.length` ga erishguncha funksiya qaytaradi, keyin chaqirildi. Shunday qilib, arity `fn.length`.

### 8. `bind` orqali partial application?

**Javob:** `function multiply(a, b) { return a * b; }` — `const double = multiply.bind(null, 2);` — `double(5)` = 10. `null` — `this` (function — this yo'q). `multiply.bind(null, 2)` — first arg `2`. Shunday qilib, partial application — bind yordamida, oldindan arglar.

### 9. Factory Function `this` confusion misol va hal?

**Javob:** `const u = createUser("Ali"); const greetFn = u.greet; greetFn();` — greetFn() `this = undefined/window` — "Hello, undefined". Hal: arrow function yordamida — `greet: () => { console.log("Hello, " + this.name); }` — arrow function `this` lexical (atyor context), yoki `u.greet()` (method chaqirish), yoki `greet.bind(u)` (bind). Shunday qilib, this confusion hal.

### 10. ES Modules — "private" va "public" qanday ishlaydi?

**Javob:** ES Modules — `export const func = () => {}; const private = 0;` — `private` module ichida (file scope), to'g'ridan-to'g'ri import yo'q. `export` — public. `import { func } from './module.js';` — import public. Shunday qilib, ES Modules — file scope — private by default, `export` — public. Shunday qilib, ES Modules — modern module pattern (private/public).

### 📌 Xulosa:

- Module Pattern — IIFE, private, return { public }.
- Factory Function — `new` emas, private state (closure/WeakMap).
- Currying — funksiya funksiya qaytaradi (step-by-step).
- Partial Application — `bind`, oldindan arglar.
- WeakMap — private data (GC).
- Memory leak — closure data, WeakMap yoki null qilish.
- ES Modules — file scope, export public.

---

**Keyingi darslar (o'rta daraja) — ketma-ketlik:**
1. ✅ Event Loop
2. ✅ Error Handling
3. ✅ **Closures Qo'shimcha — Module Pattern, Factory Functions, Currying (bu dars)**
4. **this keyword — call, apply, bind, arrow functions, method borrowing**
5. **React Hooks — JS context bilan uyg'unlik (useState, useEffect, useContext)**
6. **TypeScript (tip, interface, type alias) — JS keyingi bosqich**

Keyingi mavzu: **4 — this keyword**. Yozayman.