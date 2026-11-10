# 📚 JavaScript OOP — Prototypes, Classes, Inheritance — O'rta daraja

## 📦 Tushunchalarning sodda izohi

**OOP (Object-Oriented Programming)** — "obyektlar asosida dasturlash" — o'yinchoqlar, hodisalar, meros (inheritance), inkapsulyatsiya (private/protected/public), polimorfizm (bir xil method — turli obyektlar). JavaScriptda OOP — prototypes va classes (ES6).

### 1. Prototypes (JavaScriptda OOP asosi)

- **Prototype (Kalit):** Obyektlarning "iras" (prototype chain) — obyekt `proto` (prototype) bo'yicha "kalit" (method/propertylar). Masalan: `const arr = [1, 2]; arr.__proto__ === Array.prototype;` — `Array.prototype.indexOf`, `push`, `map`... arr — `indexOf` access (prototype from Array.prototype).
- **Prototy chain (Zanjir):** Obyekt method/property — obyekt o'zi bo'lmasa — prototype — prototype prototype — `Object.prototype` (null). `obj.method()` — `obj` da yo'q — `obj.__proto__` (prototype) — yo'q — `__proto__.__proto__` — ... — `Object.prototype` — null.
- **Constructor function (Yaratish funksiyasi):** `function Person(name) { this.name = name; } Person.prototype.greet = function() { return "Hello, " + this.name; };` — `Person.prototype` — methodlar (shared). `const p = new Person("Ali"); p.greet()` — `Person.prototype.greet` (prototype chain).
- **`Object.create(prototype)`:** `const proto = { greet() { return "Hello"; } }; const obj = Object.create(proto);` — `obj` prototype = `proto` — `obj.greet()` (inheritance). Shunday qilib, `Object.create` — explicit prototype.
- **`__proto__` vs `prototype`:** `__proto__` — "instance" (obyektning prototype — actual prototype). `prototype` — "constructor" function da (constructor function `Person.prototype` — shared methodlar, `new Person()` instance `__proto__ === Person.prototype`).

### 2. Classes (ES6 — OOP sintaksisi)

- **Class (Sinf):** `class Person { constructor(name) { this.name = name; } greet() { return "Hello, " + this.name; } }` — `class` — OOP sintaksisi. `constructor` — initial. Methods — class body ichida (prototype). `const p = new Person("Ali"); p.greet()` — `Person.prototype.greet` (prototype).
- **Class inheritance (Meros olish):** `class Employee extends Person { constructor(name, salary) { super(name); this.salary = salary; } work() { return this.name + " is working"; } }` — `extends` — inheritance. `super()` — parent constructor (call). `const e = new Employee("Ali", 1000); e.greet()` — parent method (prototype chain). `e.work()` — child method.
- **Static method:** `class Person { static create(name) { return new Person(name); } }` — `Person.create("Ali")` — static method (class da, instance emas). `Person.create` — class da — `this` class.
- **Getter/Setter:** `class Person { get fullName() { return this.firstName + " " + this.lastName; } set fullName(value) { const parts = value.split(" "); this.firstName = parts[0]; this.lastName = parts[1]; } }` — `get`/`set` — property (access). `p.fullName` — getter, `p.fullName = "Ali Kim"` — setter.
- **Private fields (ES2022):** `class Person { #name; constructor(name) { this.#name = name; } getName() { return this.#name; } }` — `#name` — private (class ichida access). `p.name` — undefined (private). `p.getName()` — access.
- **`super` — parent method/property access:** `class Employee extends Person { constructor(name, salary) { super(name); } greet() { return super.greet() + " (worker)"; } }` — `super.greet()` — parent method.

### 3. Meros (Inheritance) — prototype chain / classes

- **Prototy inheritance:** `const proto = { greet() { return "Hello"; } }; const obj = Object.create(proto);` — `obj` prototype = `proto` — method access (inheritance). Shunday qilib, prototype chain — inheritance (method access).
- **Class inheritance:** `class Employee extends Person { ... }` — `Person.prototype` — Employee prototype chain. `e.greet()` — `Person.prototype.greet` (prototype chain).
- **`instanceof`:** `const p = new Person(); p instanceof Person` — true (Person.prototype chain).
- **Polimorfizm:** `class Dog { speak() { return "havhay"; } } class Cat { speak() { return "myu"; } }` — `speak()` — alohida obyektlar (bir xil method, turli qiymat). Array orqali: `animals.forEach(a => a.speak())`.

### 4. Inkapsulyatsiya (Encapsulation) — private/protected/public

- **Public:** `class Person { name; constructor(name) { this.name = name; } }` — `this.name` — public (access).
- **Private (#):** `class Person { #name; constructor(name) { this.#name = name; } getName() { return this.#name; } }` — `#name` — private (class ichida access).
- **Protected (yoki private):** JavaScriptda `protected` yo'q (ES). `protected` — `#` private yoki convention (`_name` — "private" by convention, lekin access yo'q). Shunday qilib, `protected` — JavaScriptda `#` private yoki convention (`_name`).
- **OOP principles (SOLID):** SRP (single responsibility), OCP (open-closed), LSP (liskov substitution), ISP (interface segregation), DIP (dependency injection). OOP — SRP (bir class — bir mas'uliyat), OCP (open for extension, closed for modification), LSP (child — parent olib tashlash), ISP (interface segregation), DIP (dependency injection).

## 💻 JavaScript kod namunalari

### ✅ To'g'ri misollar:

```javascript
// 1. Prototypes — constructor function + prototype
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Hello, " + this.name;
};
Person.prototype.sayAge = function(age) {
  return this.name + " — " + age + " yosh";
};
const p = new Person("Ali");
console.log(p.greet()); // "Hello, Ali"
console.log(p.sayAge(25)); // "Ali — 25 yosh"
console.log(p instanceof Person); // true
console.log(p.__proto__ === Person.prototype); // true

// 2. Prototypes — Object.create (explicit prototype)
const proto = {
  greet() { return "Hello, " + this.name; },
  toString() { return this.name; }
};
const obj = Object.create(proto);
obj.name = "Ali";
console.log(obj.greet()); // "Hello, Ali"
console.log(obj.toString()); // "Ali"
console.log(obj.__proto__ === proto); // true
```

```javascript
// 3. Classes — ES6
class Person {
  constructor(name) { this.name = name; }
  greet() { return "Hello, " + this.name; }
  toString() { return this.name; }
}
const p = new Person("Ali");
console.log(p.greet()); // "Hello, Ali"
console.log(p instanceof Person); // true
console.log(p.__proto__ === Person.prototype); // true (same as constructor function)

// 4. Class inheritance (extends) — meros
class Person {
  constructor(name) { this.name = name; }
  greet() { return "Hello, " + this.name; }
  toString() { return this.name; }
}
class Employee extends Person {
  constructor(name, salary) {
    super(name); // parent constructor
    this.salary = salary;
  }
  work() { return this.name + " is working"; }
  greet() { return super.greet() + " (worker)"; } // parent method + o'z
}
const e = new Employee("Ali", 1000);
console.log(e.greet()); // "Hello, Ali (worker)"
console.log(e.work()); // "Ali is working"
console.log(e instanceof Person); // true
console.log(e instanceof Employee); // true
console.log(e.__proto__ === Employee.prototype); // true
console.log(Employee.prototype.__proto__ === Person.prototype); // true (prototype chain)

// 5. Static method
class Person {
  constructor(name) { this.name = name; }
  greet() { return "Hello, " + this.name; }
  static create(name) { return new Person(name); }
  static count = 0; // static property
}
const p = Person.create("Ali"); // static method — class da (instance emas)
console.log(p.greet()); // "Hello, Ali"
console.log(Person.count); // 0

// 6. Getter / Setter
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get fullName() { return this.firstName + " " + this.lastName; }
  set fullName(value) {
    const parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
}
const p = new Person("Ali", "Valiyev");
console.log(p.fullName); // "Ali Valiyev" — getter
p.fullName = "Vali Aliyev"; // setter
console.log(p.fullName); // "Vali Aliyev"

// 7. Private fields (ES2022)
class Person {
  #name; // private
  constructor(name) { this.#name = name; }
  getName() { return this.#name; }
  setName(value) { this.#name = value; }
}
const p = new Person("Ali");
console.log(p.getName()); // "Ali"
// p.#name — xato (private access)
// p.name — undefined (private field emas)
p.setName("Vali");
console.log(p.getName()); // "Vali"

// 8. Polymorphism (bir xil method — turli obyektlar)
class Animal {
  speak() { return "..."; }
}
class Dog extends Animal {
  speak() { return "havhav"; }
}
class Cat extends Animal {
  speak() { return "myu"; }
}
class Cow extends Animal {
  speak() { return "moo"; }
}
const animals = [new Dog(), new Cat(), new Cow()];
animals.forEach(a => console.log(a.speak())); // "havhav", "myu", "moo"

// 9. Factory Pattern — OOP (prototype) bilan
class Counter {
  constructor(initial = 0) { this.count = initial; }
  increment() { this.count++; return this.count; }
  getCount() { return this.count; }
}
const c1 = new Counter(10);
const c2 = new Counter();
c1.increment(); // 11
c2.increment(); // 1
// c1 va c2 har xil instance (prototype — Counter.prototype)

// 10. Module Pattern — IIFE + prototype
const Calculator = (() => {
  function calculate(a, b, op) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return a / b;
    throw new Error("Unknown op");
  }
  return { calculate };
})();
console.log(Calculator.calculate(2, 3, "+")); // 5
console.log(Calculator.calculate(5, 2, "*")); // 10
```

### ❌ Noto'g'ri yondashuvlar (OOP):

```javascript
// XATO 1: Prototype — method creation har new (every instance — memory waste)
function Person(name) {
  this.name = name;
  this.greet = function() { return "Hello, " + this.name; }; // har new — new function (memory waste)
}
const p1 = new Person("Ali");
const p2 = new Person("Vali");
console.log(p1.greet === p2.greet); // false — har xil function (memory waste)
// Yaxshi: Person.prototype.greet — shared method

// XATO 2: class — method creation har instance — prototype emas
class Person {
  constructor(name) { this.name = name; this.greet = function() { return "Hello, " + this.name; }; } // xato — method instance da (memory waste)
}
// Yaxshi: class body ichida — method prototype

// XATO 3: inheritance — super yo'q (constructor)
class Employee extends Person {
  constructor(name, salary) {
    this.salary = salary; // xato — super() yo'q — this yo'q (parent constructor chaqirilmagan)
  }
}
// Yaxshi: super(name); this.salary = salary;

// XATO 4: inheritance — this yo'q (super yo'q)
class Person {
  constructor(name) { this.name = name; }
}
class Employee extends Person {
  constructor(name, salary) {
    this.name = name; // xato — super() yo'q — this yo'q
    this.salary = salary;
  }
}
// Yaxshi: super(name); this.salary = salary;

// XATO 5: private field — access (xato)
class Person {
  #name;
  constructor(name) { this.#name = name; }
  getName() { return this.#name; }
}
const p = new Person("Ali");
console.log(p.name); // undefined — private field emas
// p.#name — xato (private access)
// Yaxshi: p.getName() — access

// XATO 6: static method — instance da (xato)
class Person {
  static create(name) { return new Person(name); }
}
const p = new Person();
p.create("Ali"); // xato — static method instance da (Person.create)
// Yaxshi: Person.create("Ali") — static method class da

// XATO 7: getter/setter — property, function call (xato)
class Person {
  getName() { return this.name; } // function call — p.getName() — xato (getter emas)
  // Yaxshi: get fullName() { return this.firstName + " " + this.lastName; } — getter (p.fullName — property access)

// XATO 8: OOP — SRP (single responsibility) — class ko'p (yomon)
class UserManager {
  constructor() { }
  createUser() { /* ... */ }
  deleteUser() { /* ... */ }
  sendEmail() { /* ... */ } // xato — SRP — class bir narsa (UserManager — user only)
}
// Yaxshi: UserManager (user CRUD), EmailService (email), UserService (user business logic)

// XATO 9: inheritance — LSP (Liskov substitution) — child parent olib tashlash (yomon)
class Bird {
  fly() { return "flying"; }
}
class Penguin extends Bird {
  fly() { throw new Error("Penguin fly emas"); } // xato — LSP — parent method o'zgartirilishi mumkin (penguin fly emas)
}
// Yaxshi: Bird — fly() optional (yoki Bird — interface — fly optional)
// Yaxshi: Bird (parent) — Penguin (child) — LSP — parent method — child fit

// XATO 10: prototype — __proto__ o'zgartirish (xato)
const obj = { name: "Ali" };
obj.__proto__ = { greet() { return "Hello, " + this.name; } }; // xato — __proto__ o'zgartirish (anti-pattern)
// Yaxshi: Object.create(proto) — explicit prototype
```

## ✅ To'g'ri va ❌ noto'g'ri yondashuvlar

### ✅ To'g'ri:

- **Prototype (constructor function):** `Person.prototype.greet = function() { ... }` — shared method (memory efficient).
- **Class (ES6):** `class Person { constructor(name) { this.name = name; } greet() { ... } }` — method — prototype (shared).
- **Class inheritance (extends):** `class Employee extends Person { super(name); ... }` — meros (prototype chain).
- **Static method:** `class Person { static create(name) { ... } }` — class da — `Person.create` — static.
- **Getter/Setter:** `get fullName() { ... }` — property access (p.fullName); `set fullName(value) { ... }` — property set (p.fullName = "Ali").
- **Private fields (#):** `class Person { #name; ... }` — `#name` private (class ichida access). `p.#name` — xato.
- **Prototy chain:** `obj.__proto__` — prototype chain — method access (obj method yo'q — prototype — prototype prototype — Object.prototype — null).
- **`instanceof`:** `p instanceof Person` — true (prototype chain check).
- **Polimorfizm:** `animals.forEach(a => a.speak())` — bir xil method — turli obyektlar.
- **OOP principles (SOLID):** SRP (bir class — bir mas'uliyat), OCP, LSP, ISP, DIP.

### ❌ Noto'g'ri:

- **Method creation har new (constructor function):** `this.greet = function() { ... }` — har new — new function (memory waste) — prototype shared method yaxshi.
- **Class — method instance da:** `this.greet = function() { ... }` — memory waste — class body ichida method prototype.
- **Inheritance — super yo'q (constructor):** `this.salary = salary;` — super() yo'q — this yo'q (xato).
- **Inheritance — super yo'q (this yo'q):** `this.name = name;` — super() yo'q — this yo'q.
- **Private field access:** `p.#name` — xato; `p.name` — undefined (private emas). `p.getName()` — access.
- **Static method — instance da:** `p.create("Ali")` — xato (Person.create).
- **Getter/setter — function call:** `p.getName()` — function call — getter emas — `get fullName() { ... }` — p.fullName property access.
- **OOP — SRP (class ko'p):** UserManager — sendEmail() — SRP (user only). EmailService — email.
- **Inheritance — LSP:** Penguin — fly() — error (parent method o'zgartirilishi mumkin). LSP — child parent olib tashlash (yomon).
- **Prototype — __proto__ o'zgartirish:** `obj.__proto__ = ...` — anti-pattern. Object.create(proto) — explicit.

## 🎩 Hayotiy o'xshatishlar

- **Prototypes:** "Haqiqiy hayot — family" — "father" (prototype) — "children" (instance) — "children" methodlar "father" (prototype) — children method access (inheritance). Masalan: "Ota" (prototype) — "greet" method — "children" (instance) — "greet" access (prototype chain).
- **Classes:** "Mikroskop" — "class" — "Person" — "constructor" — "name" — "methods" (greet, toString) — "instance" (new Person) — prototype chain (method access).
- **Inheritance:** "Family — meros" — "Person" (parent) — "Employee" (child) — "extends" — "meros" (inheritance). `super()` — parent constructor (call) — `name`. `super.greet()` — parent method (access).
- **Private fields (#):** "Siri" — "private" — "class ichida access" — `#name` — "class ichida" — "getName()" — access. `p.name` — "undefined" (private).
- **Static method:** "Factory" — `Person.create(name)` — "class da" — "instance" (new Person) — "create" — "static method" (class da).
- **Getter/Setter:** "Ho'llash" — "fullName" — "get" — "p.fullName" — "property access" — "setter" — "p.fullName = 'Ali'" — "property set".

## 📊 Mermaid diagrammasi

```mermaid
flowchart TD
    A[ JavaScript OOP — Prototypes, Classes, Inheritance ] --> B1[ Prototype (constructor function)
    function Person(name) { this.name = name; }
    Person.prototype.greet = function() { return "Hello, " + this.name; }
    const p = new Person("Ali");
    p.greet() — Person.prototype.greet (shared method)
    — prototype chain
    ]
    A --> B2[ Class (ES6)
    class Person { constructor(name) { this.name = name; } greet() { ... } }
    const p = new Person("Ali");
    p.greet() — Person.prototype.greet (prototype)
    — method — prototype (shared)
    ]
    A --> B3[ Class inheritance (extends)
    class Employee extends Person {
    constructor(name, salary) { super(name); this.salary = salary; }
    work() { ... }
    greet() { return super.greet() + " (worker)"; } // super.greet() — parent method
    }
    const e = new Employee("Ali", 1000);
    e.greet() — Employee.prototype — Person.prototype.greet (prototype chain)
    — inheritance (meros)
    ]
    A --> B4[ Static method
    class Person { static create(name) { return new Person(name); } }
    Person.create("Ali") — static method (class da)
    — instance emas — class da
    ]
    A --> B5[ Getter/Setter
    class Person { get fullName() { return this.firstName + " " + this.lastName; } set fullName(value) { ... } }
    p.fullName — getter (property access)
    p.fullName = "Ali" — setter (property set)
    ]
    A --> B6[ Private fields (#)
    class Person { #name; constructor(name) { this.#name = name; } getName() { return this.#name; } }
    p.#name — xato (private)
    p.getName() — access
    — private (class ichida)
    ]
    A --> B7[ Prototy chain / instanceof
    p.__proto__ === Person.prototype (true)
    p instanceof Person (true)
    — prototype chain — method access
    ]
    A --> B8[ Polymorphism — bir xil method — turli obyektlar
    class Dog extends Animal { speak() { return "havhav"; } }
    class Cat extends Animal { speak() { return "myu"; } }
    animals.forEach(a => a.speak()) — "havhav", "myu"
    ]
    
    B1 --> F1[ Prototype — memory efficient — shared method
    Person.prototype.greet — shared
    — har new — new method (memory waste) — YANGISHI: prototype
    ]
    B2 --> F2[ Class — method — prototype (shared)
    class Person { greet() { ... } } — method — prototype
    — method instance da (memory waste) — YANGISHI: class body
    ]
    B3 --> F3[ Class inheritance — super() — parent constructor
    constructor(name, salary) { super(name); this.salary = salary; }
    — super() yo'q — this yo'q (xato)
    ]
    B4 --> F4[ Static method — class da
    Person.create("Ali") — static method (class da)
    — instance emas — class da
    ]
    B5 --> F5[ Getter/Setter — property
    get fullName() { ... } — p.fullName (property)
    set fullName(value) { ... } — p.fullName = "Ali" (property set)
    ]
    B6 --> F6[ Private fields (#) — private (class ichida)
    #name — class ichida access
    p.#name — xato — p.getName() — access
    ]
    B7 --> F7[ Prototy chain — instanceof
    p.__proto__ === Person.prototype — true
    p instanceof Person — true
    ]
    B8 --> F8[ Polymorphism — bir xil method — turli obyektlar
    animals.forEach(a => a.speak()) — "havhav", "myu"
    ]
    
    style B1 fill:#e3f2fd,stroke:#1976d2
    style B2 fill:#e8f5e9,stroke:#2e7d32
    style B3 fill:#fff3e0,stroke:#e65100
    style B4 fill:#f3e5f5,stroke:#7b1fa2
    style B5 fill:#ffebee,stroke:#c62828
    style B6 fill:#e0f2f1,stroke:#00897b
    style B7 fill:#ede7f6,stroke:#7b1fa2
    style B8 fill:#e8eaf6,stroke:#3949ab
```

**Diagrama tushuntirishi:** JavaScript OOP — 8 ta asosiy qism:
1. **Prototype (constructor function):** `Person.prototype.greet = function() { ... }` — shared method. `new Person("Ali")` — `p.greet()` — `Person.prototype.greet` (shared). Prototype chain.
2. **Class (ES6):** `class Person { constructor(name) { this.name = name; } greet() { ... } }` — method — prototype (shared). `p.greet()` — `Person.prototype.greet`.
3. **Class inheritance (extends):** `class Employee extends Person { constructor(name, salary) { super(name); this.salary = salary; } work() { ... } greet() { return super.greet() + " (worker)"; } }` — `super.greet()` — parent method. Prototype chain.
4. **Static method:** `class Person { static create(name) { return new Person(name); } }` — `Person.create("Ali")` — class da (instance emas).
5. **Getter/Setter:** `get fullName() { ... }` — `p.fullName` (property); `set fullName(value) { ... }` — `p.fullName = "Ali"` (property set).
6. **Private fields (#):** `class Person { #name; ... }` — `#name` private (class ichida). `p.#name` — xato. `p.getName()` — access.
7. **Prototy chain / instanceof:** `p.__proto__ === Person.prototype` (true). `p instanceof Person` (true).
8. **Polymorphism:** `animals.forEach(a => a.speak())` — "havhav", "myu".

## 🎙 Intervyu savollari va javoblari

### 1. JavaScriptda "prototype" nima? Prototy chain qanday ishlaydi?

**Javob:** `prototype` — constructor function (Person.prototype) — shared methodlar/propertylar. Ob'yekt instance `__proto__` — prototype (constructor function prototype) — prototype chain. Ob'yekt method/property — ob'yekt o'zi yo'q — `__proto__` (prototype) — yo'q — `__proto__.__proto__` — ... — `Object.prototype` — null. Shunday qilib, prototype chain — method/property access (inheritance).

### 2. `Person.prototype.greet = function() { ... }` va `class Person { greet() { ... } }` farqi?

**Javob:** `Person.prototype.greet = function() { ... }` — constructor function — shared method — prototype (shared — memory efficient). `class Person { greet() { ... } }` — class — method — prototype (shared — memory efficient — same). Shunday qilib, constructor function va class — method — prototype (shared). Shunday qilib, farqi — sintaksis (constructor function vs class).

### 3. Class inheritance (extends) qanday ishlaydi? `super()` nima?

**Javob:** `class Employee extends Person { constructor(name, salary) { super(name); this.salary = salary; } }` — `extends` — inheritance — `Employee.prototype.__proto__ === Person.prototype` (prototype chain). `super(name)` — parent constructor (call) — `this.name = name` (parent constructor). Shunday qilib, `super(name)` — parent constructor call (this.name = name). Shunday qilib, `this` — parent constructor chaqirilgandan keyin (super) — this (Employee).

### 4. Static method nima? Misol yozing.

**Javob:** Static method — class da (instance emas). `class Person { static create(name) { return new Person(name); } }` — `Person.create("Ali")` — static method (class da). `p.create("Ali")` — xato (instance da — static method yo'q). Shunday qilib, static method — class da — `Person.create`.

### 5. Getter/Setter nima? Misol yozing.

**Javob:** Getter/Setter — property access/set. `class Person { get fullName() { return this.firstName + " " + this.lastName; } set fullName(value) { const parts = value.split(" "); this.firstName = parts[0]; this.lastName = parts[1]; } }` — `p.fullName` — getter (property access). `p.fullName = "Ali Kim"` — setter (property set). Shunday qilib, getter/setter — property access/set.

### 6. Private fields (#) nima? Misol yozing.

**Javob:** Private fields — `#name` — class ichida access (private). `class Person { #name; constructor(name) { this.#name = name; } getName() { return this.#name; } }` — `p.#name` — xato (private). `p.getName()` — access. Shunday qilib, `#name` — private — class ichida access. Shunday qilib, private fields — `#` — private.

### 7. `instanceof` nima? Prototy chain bilan qanday bog'liq?

**Javob:** `instanceof` — prototype chain check. `p instanceof Person` — `p.__proto__ === Person.prototype` (true) — yoki `p.__proto__.__proto__ === Person.prototype` (prototype chain). Shunday qilib, `instanceof` — prototype chain (method/property access — prototype chain check). Shunday qilib, `instanceof` — prototype chain.

### 8. Polymorphism nima? Misol yozing.

**Javob:** Polymorphism — "bir xil method — turli obyektlar". Misol: `class Dog extends Animal { speak() { return "havhav"; } } class Cat extends Animal { speak() { return "myu"; } }` — `animals.forEach(a => a.speak())` — "havhav", "myu". Shunday qilib, "bir xil method — speak() — turli obyektlar — "havhav", "myu".

### 9. OOP principles (SOLID) qisqacha?

**Javob:** SOLID — OOP principles:
- **S (SRP):** Single Responsibility — class — bir mas'uliyat (UserManager — user CRUD — email yo'q).
- **O (OCP):** Open-Closed — open for extension, closed for modification (class — extension — modification yo'q).
- **L (LSP):** Liskov Substitution — child — parent olib tashlash (Penguin — fly() — error — LSP — parent method o'zgartirilishi mumkin).
- **I (ISP):** Interface Segregation — interface — small (User interface — name, age — email yo'q).
- **D (DIP):** Dependency Injection — dependency — interface — implementation (class — dependency interface — yoki injection).
Shunday qilib, SOLID — OOP principles (SRP, OCP, LSP, ISP, DIP).

### 10. Constructor function vs class — memory efficient — prototype shared?

**Javob:** Constructor function — `Person.prototype.greet = function() { ... }` — shared method — memory efficient. Class — `class Person { greet() { ... } }` — method — prototype (shared) — memory efficient (same). Shunday qilib, constructor function va class — method — prototype (shared). Shunday qilib, farqi — sintaksis (constructor function vs class).

### 📌 Xulosa:

- **Prototype:** `Person.prototype.greet = function() { ... }` — shared method (memory efficient). Prototype chain — method access (inheritance).
- **Class (ES6):** `class Person { constructor(name) { this.name = name; } greet() { ... } }` — method — prototype (shared).
- **Class inheritance (extends):** `class Employee extends Person { super(name); ... }` — `super()` — parent constructor. Prototype chain.
- **Static method:** `class Person { static create(name) { ... } }` — class da.
- **Getter/Setter:** `get fullName() { ... }` — property access; `set fullName(value) { ... }` — property set.
- **Private fields (#):** `class Person { #name; ... }` — `#name` private (class ichida). `p.#name` — xato.
- **Prototy chain/instanceof:** `p.__proto__ === Person.prototype` (true). `p instanceof Person` (true).
- **Polymorphism:** `animals.forEach(a => a.speak())` — bir xil method — turli obyektlar.
- **OOP principles (SOLID):** SRP, OCP, LSP, ISP, DIP.
- **Constructor function vs class:** method — prototype (shared) — memory efficient. `this.greet = function() { ... }` — memory waste — prototype shared method yaxshi.

---

**Davom etish uchun:**
- **DSA (Data Structures & Algorithms) darslari** — massivlar, bog'langan ro'yxatlar, stack/queue, daraxtlar, graph, sorting, searching, Big O.
- **Node.js asoslari** — fs, http, events, streams, Express.
- **Advanced TypeScript** — generics, utility types, advanced types, decorators, declaration files.
- **JavaScript Internals (V8, memory, GC)** — advanced.
- **Functional Programming (JS) — currying, composition, monads, functor**.
- **Design Patterns (JS) — Singleton, Factory, Observer, Strategy, Decorator**.

Qaysi mavzu keyingi? Yozayman.