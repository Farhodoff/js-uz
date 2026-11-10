# 📚 this keyword — call, apply, bind, arrow functions, method borrowing — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**this** — JavaScriptda "context" — funksiya chaqirilgan holatga bog'liq "context obyekti". `this` qiymati **chaqirish holatiga (call site)** bog'liq — bu "qanday chaqirildi".

- **Global scope (agar funksiya tashqi chaqirilsa):** Browserda `this === window` (non-strict), Node.jsda `global`. Strict mode da `this === undefined` (agar funksiya tashqi chaqirilsa).
- **Funktsiya (standalone chaqirilganda):** `function f() { return this; }` — `f()` — `this` global (non-strict) yoki `undefined` (strict). Strict mode tavsiya — `undefined`.
- **Obyekt method (chaqirilganda):** `obj.method()` — `this === obj` (keyingi obyekt — method chaqirilgan obyekt). Masalan: `obj.greet()` — `this === obj`.
- **Constructor (new operator):** `new Person()` — `this === yangi hosil qilingan obyekt` (inovatsiya). `function Person(name) { this.name = name; } new Person("Ali")`.
- **call/apply/bind (explicit `this`):** `fn.call(obj, arg1, arg2...)` — `this === obj` (force), `fn.apply(obj, [args])` — `this === obj` (array), `fn.bind(obj, arg1...)` — `this === obj` (permanent, new function qaytaradi).
- **Arrow function (lexical `this`):** Arrow functionda `this` — "atyor context" (lexical — atrofdagi funksiya `this`). Arrow function `this` o'zgarmaydi (chaqirish holatiga bog'liq emas). Masalan: obj method ichida arrow callback — `this === obj` (lexical).
- **Event handler (DOM callback — function):** `button.addEventListener("click", function(e) { console.log(this === button); })` — `this === target element` (event handlerda function chaqirilganda). Arrow function — `this !== target` (lexical).
- **Callback confusion (xato holatlarida):** `obj.tasks.forEach(function(item) { console.log(this.name); })` — `this === undefined/window` (callback function — this confusion). Arrow function — `console.log(this.name)` — `this === obj` (lexical).

*Oddiy misol:* `obj.greet()` — `this === obj`. `const fn = obj.greet; fn();` — `this === undefined/window` (method extraction — this confusion). `fn.call(obj)` — `this === obj` (force). `() => { this }` — lexical (atyor).

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Global this (non-strict)
console.log(this === window); // true (browser, non-strict)

// 2. Standalone function (strict mode) — this undefined
"use strict";
function standalone() { return this; }
console.log(standalone()); // undefined

// 3. Method — this = obyekt
const user = {
  name: "Ali",
  greet() { return "Hello, " + this.name; }
};
console.log(user.greet()); // "Hello, Ali" — this === user

// 4. Method extraction — this confusion (to'g'ri hal)
const user = { name: "Ali", greet() { return "Hello, " + this.name; } };
const fn = user.greet;
console.log(fn()); // "Hello, undefined" — this confusion
console.log(fn.call(user)); // "Hello, Ali" — this = user (force)
const bound = fn.bind(user);
console.log(bound()); // "Hello, Ali" — this = user (permanent)

// 5. call vs apply vs bind
function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}
const user = { name: "Ali" };
console.log(greet.call(user, "Salom", "!")); // "Salom, Ali!" — call — args alohida
console.log(greet.apply(user, ["Salom", "!"])); // "Salom, Ali!" — apply — args array
const bound = greet.bind(user, "Salom");
console.log(bound("!")); // "Salom, Ali!" — bind — permanent this + oldin arg

// 6. Arrow function — lexical this
const user = {
  name: "Ali",
  greet() {
    console.log("Hello, " + this.name); // this === user (method chaqirilganda)
    const inner = () => {
      console.log("Inner this.name:", this.name); // this === user (lexical — atyor context)
    };
    inner();
  }
};
user.greet(); // "Hello, Ali" — "Inner this.name: Ali" — this === user

// 7. Arrow function — forEach callback (this confusion kam)
const user = {
  name: "Ali",
  tasks: ["a", "b", "c"],
  printTasks() {
    this.tasks.forEach(item => {
      console.log(this.name + " - " + item); // this === user (lexical)
    });
  }
};
user.printTasks(); // "Ali - a", "Ali - b", "Ali - c"

// 8. Constructor — this = hosil (new)
function Person(name) {
  this.name = name;
  this.greet = function() { return "Hello, " + this.name; };
}
const p = new Person("Ali");
console.log(p.greet()); // "Hello, Ali" — this === p (new hosil)

class PersonClass {
  constructor(name) { this.name = name; }
  greet() { return "Hello, " + this.name; }
}
const p2 = new PersonClass("Vali");
console.log(p2.greet()); // "Hello, Vali" — this === p2

// 9. Method borrowing — call/apply yordamida
const person = {
  name: "Ali",
  greet(greeting, punctuation) {
    return greeting + ", " + this.name + punctuation;
  }
};
const user2 = { name: "Vali" };
console.log(person.greet.call(user2, "Salom", "!")); // "Salom, Vali!" — method borrowing
console.log(person.greet.apply(user2, ["Salom", "!"])); // "Salom, Vali!" — apply

// 10. Event handler — function callback this = target
const button = document.querySelector("button");
button.addEventListener("click", function(e) {
  console.log(this === button); // true (function callback — this = target)
});

// 11. Explicit this binding — bind (permanent)
const obj = { name: "Ali" };
function greet() { return "Hello, " + this.name; }
const bound = greet.bind(obj);
console.log(bound()); // "Hello, Ali" — this = obj (permanent)
// bind — new function — this o'zgarmaydi
```

### ❌ Noto'g'ri yondashuvlar:

```javascript
// XATO 1: Method extraction — this confusion
const obj = {
  name: "Ali",
  greet() { return "Hello, " + this.name; }
};
const fn = obj.greet;
console.log(fn()); // "Hello, undefined" — this confusion (this === window/undefined)

// XATO 2: Arrow function method — this confusion
const obj = {
  name: "Ali",
  greet: () => { return "Hello, " + this.name; } // arrow function — this === window (lexical)
};
console.log(obj.greet()); // "Hello, undefined" — this confusion (this === window)

// XATO 3: forEach callback — function (this confusion)
const obj = { name: "Ali", tasks: ["a", "b"] };
obj.tasks.forEach(function(item) {
  console.log(this.name + " - " + item); // this === undefined/window — xato
});
// Yuqorida arrow function — this === obj (lexical)

// XATO 4: Constructor — new yo'q (this = global/window)
function Person(name) {
  this.name = name; // new yo'q — this === window (non-strict) — global pollution
}
Person("Ali"); // new yo'q — this === window — window.name = "Ali" — xato!
console.log(window.name); // "Ali" — xato

// XATO 5: call/apply bind confusion
function greet(greeting) { console.log(greeting + ", " + this.name); }
const user = { name: "Ali" };
greet.call(user, "Hello"); // "Hello, Ali" — OK
greet.apply(user, "Hello"); // "Hello" — apply — array!

// XATO 6: Event handler — arrow function — this confusion
button.addEventListener("click", () => {
  console.log(this); // arrow function — this = window — xato (target emas)
});
// To'g'ri: function(e) { this === button }

// XATO 7: bind yo'q — this confusion
const obj = { name: "Ali" };
function greet() { return "Hello, " + this.name; }
const bound = greet.bind(obj);
bound(); // to'g'ri
// bind yo'q — greet() — this confusion

// XATO 8: Arrow function callback — lexical this (xato holat)
const obj = { name: "Ali", items: [1, 2, 3] };
obj.items.forEach(item => {
  console.log(this.name + " - " + item); // this === undefined/window — xato (lexical)
});
// Alternativ: forEach callback — arrow yoki function + this bind

// XATO 9: constructor — this confusion (new yo'q)
function Person(name) { this.name = name; }
const p = Person("Ali"); // new yo'q — this === window — global pollution
// Yaxshi: new Person("Ali")

// XATO 10: bind — this confusion (bind sho'rx bo'lmagan holda)
const obj = { name: "Ali" };
function greet() { return "Hello, " + this.name; }
const bound = greet.bind(obj);
bound(); // to'g'ri
// bind yo'q — greet() — this confusion
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Method chaqirish:** `obj.method()` — `this === obj`.
- **call/apply/bind:** `this` force — `this === obj` (explicit).
- **Arrow function:** `this` lexical — "atyor context" — `this` o'zgarmaydi (chaqirish holatiga bog'liq emas).
- **Constructor (new):** `this === yangi hosil` (inovatsiya).
- **Event handler (function callback):** `this === target element`.
- **bind — permanent:** `fn.bind(obj)` — new function — `this === obj` (permanent).
- **forEach arrow callback:** `this === atyor obj` (lexical).
- **Method borrowing:** `obj.method.call(otherObj)` — method ning `this` ulash `otherObj`.

### ❌ Noto'g'ri:

- **Method extraction:** `const fn = obj.method; fn();` — this confusion (this === window/undefined).
- **Arrow function method:** `obj.greet: () => { this }` — this === window (lexical) — confusion.
- **forEach function callback:** `forEach(function(item) { this.name })` — this confusion — arrow yoki bind yoki this o'zgartirish.
- **Constructor — new yo'q:** `this === window` (global pollution).
- **apply — args array yo'q:** `apply(obj, "Salom")` — xato (apply args array).
- **Event handler — arrow callback:** `this === window` (target emas).
- **bind yo'q:** `fn()` — this confusion.
- **Arrow callback — lexical confusion:** `forEach(item => { this.name })` — `this === undefined` (bu atyor context yo'q) — yoki qo'shimcha lexical context qo'shish.

## 🎩 Hayotiy o'xshatishlar

- **this — "kimlik belgi" (context obyekti):** "Kim chaqirdi?" — `obj.greet()` — "obj chaqirdi" — this = obj. `fn()` — "kim chaqirdi? global" — this = window/undefined. `call(obj)` — "men chaqirdim, this = obj".
- **Arrow function — "qarab chiqqan joy" (lexical):** "Arrow function" — this "joylashgan joydan" (lexical) — atrofdagi funksiya context. Masalan: obj method ichida arrow callback — this obj (atyor context). function callback — this undefined/window (call site).
- **call / apply / bind — "uch o'yinchoq" (force):** "call" — "bir zarba" (args alohida). "apply" — "bir yozuv" (args array). "bind" — "qo'shno" (permanent this + oldin arglar). Shunday qilib, method borrowing — one method `call` yoki `apply` yoki `bind` yordamida `this = other`.
- **Event handler — "tomonga intilish" (target):** DOM "click" — function callback — this = target (button). Arrow callback — this = window (lexical) — confusion. Shunday qilib, function callback yoki bind(target).

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ this — context (call site) ] --> B{ Chaqirish holati }
    B --> B1[ Global (non-strict): this = window/global ]
    B --> B2[ Standalone function (strict): this = undefined ]
    B --> B3[ Method: obj.method() — this = obj ]
    B --> B4[ Constructor: new Person() — this = yangi hosil ]
    B --> B5[ call/apply/bind: this = force obj ]
    B --> B6[ Arrow function: this = lexical (atyor context) ]
    B --> B7[ Event handler (function callback): this = target element ]
    
    B3 --> C1[ Method extraction — this confusion\nconst fn = obj.method; fn() — this === undefined ]
    B5 --> C2[ call/apply/bind — force this\nfn.call(obj) / apply / bind(obj) ]
    B6 --> C3[ Arrow function — lexical\nobj method ichida arrow — this === obj\ncallback forEach arrow — this === obj ]
    B7 --> C4[ Event handler — target\nbutton.addEventListener("click", function(e) { this === button })\narrow callback — this !== target ]
    
    C1 --> D1[ this confusion — bind(obj) yoki call(obj) yoki arrow function ]
    C2 --> D2[ Method borrowing — call/apply/bind ]
    C3 --> D3[ Arrow function this = atyor context ]
    C4 --> D4[ function callback yoki bind(target) ]
    
    style B3 fill:#c8e6c9,stroke:#2e7d32
    style B5 fill:#fff3e0,stroke:#e65100
    style B6 fill:#f3e5f5,stroke:#7b1fa2
    style B7 fill:#e3f2fd,stroke:#1976d2
    style C1 fill:#ffebee,stroke:#c62828
```

**Diagrama tushuntirishi:** `this` — call site:
1. **Global (non-strict):** `this = window/global`
2. **Standalone function (strict):** `this = undefined`
3. **Method:** `obj.method()` — `this = obj`
4. **Constructor:** `new Person()` — `this = yangi hosil`
5. **call/apply/bind:** `this = force obj` (explicit)
6. **Arrow function:** `this = lexical` (atyor context)
7. **Event handler (function callback):** `this = target element`

Keyinchalik: Method extraction — this confusion (bind/call yoki arrow). call/apply/bind — force this (method borrowing). Arrow function — lexical (atyor context). Event handler — target (function callback yoki bind(target)).

## 🎙 Intervyu savollari va javoblari

### 1. `this` qanday aniqlanadi? Asosiy holatlarni tasvirlang.

**Javob:** `this` — call site (chaqirish holati) bilan aniqlanadi:
- **Global (non-strict):** `this === window` (browser), `global` (Node) — global scope.
- **Standalone function (strict mode):** `this === undefined`.
- **Method:** `obj.method()` — `this === obj`.
- **Constructor:** `new Person()` — `this === yangi hosil` (inovatsiya).
- **call/apply/bind:** `this === force obj` (explicit).
- **Arrow function:** `this === lexical` (atyor context — chaqirish holatiga bog'liq emas).
- **Event handler (function callback):** `this === target element`.
Shunday qilib, `this` — call site.

### 2. call, apply, bind farqi nima? Misol yozing.

**Javob:** `fn.call(obj, arg1, arg2, ...)` — args alohida (individual). `fn.apply(obj, [arg1, arg2, ...])` — args array. `fn.bind(obj, arg1, arg2, ...)` — permanent this + oldin arglar (new function qaytaradi).
Misol:
```javascript
function greet(greeting, punct) { return greeting + ", " + this.name + punct; }
const user = { name: "Ali" };
greet.call(user, "Salom", "!");      // "Salom, Ali!"
greet.apply(user, ["Salom", "!"]);  // "Salom, Ali!"
const bound = greet.bind(user, "Salom");
bound("!");                          // "Salom, Ali!" — permanent + oldin arg
```

### 3. Arrow function `this` nima? Qanday ishlaydi?

**Javob:** Arrow function — `this` lexical (atyor context). Arrow function `this` — calling context (atyor funksiya) — this o'zgarmaydi (chaqirish holatiga bog'liq emas). Misol: obj method ichida arrow callback — `this === obj` (lexical — atyor context). function callback — `this === undefined` (strict mode) yoki `window` (non-strict). Shunday qilib, arrow function — this confusion kam (callback ichida).

### 4. Method extraction — this confusion misol va hal.

**Javob:** `const obj = { name: "Ali", greet() { return "Hello, " + this.name; } }; const fn = obj.greet; fn();` — `fn()` — `this === undefined/window` — "Hello, undefined" (this confusion). Hal:
- `fn.call(obj)` — `this === obj` (force).
- `fn.bind(obj)()` — `this === obj` (permanent).
- `obj.greet()` — method chaqirilganda (asli).
- `() => { this.name }` — arrow function (lexical) — `this === obj` (atyor context).

### 5. Event handler larda `this` nima? Arrow function callback — this confusion?

**Javob:** Event handler `button.addEventListener("click", function(e) { console.log(this === button); })` — function callback — `this === target element` (button). Arrow callback — `() => { console.log(this === button); }` — `this === window` (lexical) — confusion (target emas). Hal: function callback yoki `bind(button)` yoki `e.currentTarget`.

### 6. Constructor da `this` nima? `new yo'q` — xato nima?

**Javob:** `new Person()` — `this === yangi hosil` (inovatsiya). `Person("Ali")` — new yo'q — `this === window` (non-strict) yoki `undefined` (strict) — global pollution (window.name = "Ali") yoki xato (strict). Shunday qilib, constructor `new` bilan chaqirilishi kerak. Shunday qilib, `new` yo'q — this confusion.

### 7. `forEach` ichida callback `this` confusion — hal?

**Javob:** `obj.tasks.forEach(function(item) { console.log(this.name); })` — function callback — `this === undefined/window` — this confusion. Hal:
- Arrow callback: `obj.tasks.forEach(item => { console.log(this.name); })` — `this === obj` (lexical).
- `forEach(function(item) { ... }.bind(obj))` — `this === obj` (bind).
- `forEach` ichida `obj` obyektni qo'shish: `forEach(function(item) { console.log(obj.name); })` (but this — lexical yoki global).
Shunday qilib, arrow callback yoki bind.

### 8. Method borrowing — nima? Misol yozing.

**Javob:** Method borrowing — boshqa obyekt methodini `call/apply` yordamida chaqirish (this ulash orqali). Misol:
```javascript
const person = { name: "Ali", greet(greet, punct) { return greet + ", " + this.name + punct; } };
const user = { name: "Vali" };
person.greet.call(user, "Salom", "!"); // "Salom, Vali!" — method borrowing (this = user)
```
Shunday qilib, `person.greet` method `call/user` orqali `this = user` (method borrowing).

### 9. `bind` permanent?

**Javob:** `fn.bind(obj)` — new function qaytaradi — `this === obj` (permanent). `bound()` — `this === obj` (permanent). `bound.call(otherObj)` — `this === obj` (permanent — call/apply/bind yo'q). Shunday qilib, bind — permanent this. Shunday qilib, `bind` — new function — this o'zgarmaydi (yo'qotish).

### 10. Arrow function method — this confusion?

**Javob:** `obj.greet: () => { return "Hello, " + this.name; }` — arrow function method — `this === window` (lexical — atyor context — global). Shunday qilib, `obj.greet()` — this confusion (this === window). Hal: `greet() { ... }` (function method — this === obj). Shunday qilib, arrow function method — this confusion — yomon.

### 📌 Xulosa:

- this — call site (chaqirish holati).
- Global — window; standalone (strict) — undefined; method — obj; constructor — yangi hosil; call/apply/bind — force obj; arrow — lexical; event handler (function) — target.
- call — args alohida; apply — args array; bind — permanent + oldin arglar.
- Arrow function — this yok (lexical).
- Method extraction — this confusion — bind/call/arrow yoki method chaqirish.
- Event handler — function callback this === target; arrow callback this === window — confusion.
- Constructor — new yo'q — this === window (pollution) yoki undefined (strict).
- forEach function callback — this confusion — arrow yoki bind.

---

**Keyingi darslar (o'rta daraja) — ketma-ketlik:**
1. ✅ Event Loop
2. ✅ Error Handling
3. **Closures Qo'shimcha — Module Pattern, Factory Functions, Currying**
4. **this keyword — call, apply, bind, arrow functions, method borrowing (bu dars)**
5. **React Hooks — JS context bilan uyg'unlik (useState, useEffect, useContext)**
6. **TypeScript (tip, interface, type alias) — JS keyingi bosqich**

Keyingi mavzu: **3 — Closures Qo'shimcha**. Yozayman.