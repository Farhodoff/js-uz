export const classesLesson = {
  id: "classes",
  title: "🏗️ Classes — OOP Modern Yo'l",
  level: "Murakkab",
  description: "ES6 Klasslar, Constructor, Inheritance, va Static metodlar.",
  theory: `## 📌 ES6 CLASSES — ZAMONAVIY OOP

### 1. NEGA KERAK? (Sabab)
**Eski usulda (Prototype):**
\`\`\`javascript
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return "Salom"; };
\`\`\`

**Zamonaviy usulda (Classes):**
\`\`\`javascript
class Person {
  constructor(name) { this.name = name; }
  greet() { return "Salom"; }
}
\`\`\`

**Foyda:** O'qishga oson, zamonaviy, klassik tillarnikiga yaqin.

---

### 2. SODDALIK (Analogiya)

**Klass** — Pechenye qolipi (forma), **Objektlar** — Pechenyelar
- Bitta forma → Ko'p pechenye
- Bitta klass → Ko'p obje

---

### 3. TUSHUNCHA (BATAFSIL)

#### A. Klass Yaratish va Instance

\`\`\`javascript
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return \`\${this.model} (\${this.year})\`;
  }
}

const car1 = new Car("Tesla", 2024);
const car2 = new Car("BMW", 2023);

console.log(car1.getInfo()); // "Tesla (2024)"
console.log(car2.getInfo()); // "BMW (2023)"
\`\`\`

#### B. Getter va Setter

\`\`\`javascript
class Person {
  constructor(name, birthYear) {
    this._name = name; // Private konvensiyasi
    this._birthYear = birthYear;
  }

  get age() {
    return new Date().getFullYear() - this._birthYear;
  }

  set name(value) {
    if (value.length > 0) {
      this._name = value;
    }
  }

  get name() {
    return this._name;
  }
}

const person = new Person("Ali", 1990);
console.log(person.age); // 34 (avtomatik hisoblandi)
person.name = "Bobur"; // Setter
console.log(person.name); // "Bobur"
\`\`\`

#### C. Inheritance (Extends)

\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return this.name + " yeyapti";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Ota constructor'ni chaqirish
    this.breed = breed;
  }

  bark() {
    return this.name + " vav deya yuqorlaydi";
  }
}

const dog = new Dog("Bobur", "Ovcharka");
console.log(dog.eat()); // "Bobur yeyapti" (meros olgan)
console.log(dog.bark()); // "Bobur vav deya yuqorlaydi"
\`\`\`

#### D. Static Metodlar

\`\`\`javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

console.log(MathHelper.add(5, 3)); // 8 (instanci kerak emas!)
console.log(MathHelper.multiply(5, 3)); // 15
\`\`\`

#### E. Private Metodlar va Maydonlar (Private Fields)

\`\`\`javascript
class BankAccount {
  #balance = 0; // Private maydon (#)

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // SyntaxError - Private!
\`\`\`

---

### 4. ADVANCED TUSHUNCHALAR

#### A. Super Kalit So'zi

\`\`\`javascript
class Vehicle {
  constructor(model) {
    this.model = model;
  }

  info() {
    return "Model: " + this.model;
  }
}

class Truck extends Vehicle {
  constructor(model, capacity) {
    super(model); // Ota constructor'ni chaqirish
    this.capacity = capacity;
  }

  info() {
    return super.info() + ", Sig'im: " + this.capacity; // Ota metodi chaqirish
  }
}

const truck = new Truck("Volvo", 50);
console.log(truck.info()); // "Model: Volvo, Sig'im: 50"
\`\`\`

#### B. Static Property

\`\`\`javascript
class Counter {
  static count = 0;

  constructor() {
    Counter.count++;
  }

  static getCount() {
    return Counter.count;
  }
}

new Counter();
new Counter();
new Counter();

console.log(Counter.getCount()); // 3
\`\`\`

#### C. Abstract Class Pattern

\`\`\`javascript
class Animal {
  constructor(name) {
    if (new.target === Animal) {
      throw new Error("Animal class'ni to'g'ridan-to'g'ri ishlatish mumkin emas!");
    }
    this.name = name;
  }

  makeSound() {
    throw new Error("makeSound() metodini override qil!");
  }
}

class Dog extends Animal {
  makeSound() {
    return "Vav!";
  }
}

// const animal = new Animal("Test"); // Error!
const dog = new Dog("Bobur");
console.log(dog.makeSound()); // "Vav!"
\`\`\`

---

### 5. PROTOTYPE-BASED vs CLASS-BASED

\`\`\`javascript
// Qo'shimcha: Klasslar = Prototype orqali implementatsiya qilingan
class Car {
  constructor(model) { this.model = model; }
  drive() { return "Haydaydi"; }
}

// Ichida aslida:
// Car.prototype.drive = function() { ... }
// Constructor.prototype = Car.prototype

// Shuning uchun:
const car = new Car("Tesla");
console.log(car instanceof Car); // true
console.log(car.constructor === Car); // true
\`\`\`

---

### 6. 12 TA SAVOL VA JAVOBLAR

<details>
<summary><b>1. Klass (Class) nima?</b></summary>
Objektlar yaratish uchun "shablon" yoki "qolip". Modernizm JS/ES6 qo'shimchasi.
</details>

<details>
<summary><b>2. Constructor metodi nima?</b></summary>
Yangi objekti yaratilganda birinchi chaqirilgan maxsus metod. Boshlang'ich qiymatlarni berish uchun.
</details>

<details>
<summary><b>3. new kalit so'zi nima qiladi?</b></summary>
1. Yangi obje yaratadi. 2. Constructor'ni this bo'lib chaqiradi. 3. this'ni qaytaradi.
</details>

<details>
<summary><b>4. Klass ichidagi funksiya nima deyiladi?</b></summary>
Metod (method).
</details>

<details>
<summary><b>5. Extends kalit so'zi nima?</b></summary>
Bir klassdan boshqasini merosxo'rlik (inheritance) qilish uchun.
</details>

<details>
<summary><b>6. Super() funksiyasi nima?</b></summary>
Ota klass'ning constructor'ni chaqirish uchun. Extend qilganda shart.
</details>

<details>
<summary><b>7. Static metod nima?</b></summary>
Klassga tegishli, lekin objektga emas. new'ga kerak emas. Klass.metod() shaklida chaqiriladi.
</details>

<details>
<summary><b>8. Getter va Setter nima?</b></summary>
Getter: property'ni o'qish kabi yozish. Setter: property'ni belgilash kabi yozish. get/set kalit so'zlari bilan.
</details>

<details>
<summary><b>9. Private maydonlar (#) nima?</b></summary>
Tashqaridan o'zgartirib bo'lmaydigan maydonlar. Faqat klass ichida.
</details>

<details>
<summary><b>10. Klass nomi qanday harf bilan boshlanishi kerak?</b></summary>
Katta harf (PascalCase): Car, Person, Animal.
</details>

<details>
<summary><b>11. Bitta klassdan nechta obyekt olish mumkin?</b></summary>
Cheksiz. Har biri alohida instance.
</details>

<details>
<summary><b>12. Klasslar JSga qachon qo'shilgan?</b></summary>
ES6 (ECMAScript 2015). Asli prototip-based, syntactic sugar.
</details>`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy Klass (Boshlang'ich)",
      instruction: "Person klass yarating: name va age xususiyati.",
      startingCode: "class Person {\n  // Kodni shu yerda yozing\n}\n\nconst p = new Person('Ali', 25);\nconsole.log(p.name); // 'Ali'",
      hint: "constructor(name, age) { this.name = name; this.age = age; }",
      test: "if (logs.includes('Ali')) return null; return 'Klass xato!';"
    },
    {
      id: 2,
      title: "2️⃣ Metod Qo'shish (Boshlang'ich)",
      instruction: "Car klass yarating, drive() metodi bilan.",
      startingCode: "class Car {\n  constructor(model) { this.model = model; }\n  // drive() metodi qo'shing\n}\n\nconst car = new Car('Tesla');\nconsole.log(car.drive()); // 'Tesla haydaydi'",
      hint: "drive() { return this.model + ' haydaydi'; }",
      test: "if (logs.includes('Tesla haydaydi')) return null; return 'Metod xato!';"
    },
    {
      id: 3,
      title: "3️⃣ Inheritance (O'rta)",
      instruction: "Animal → Dog merosxo'rlik qiling.",
      startingCode: "class Animal {\n  constructor(name) { this.name = name; }\n  eat() { return this.name + ' yeyapti'; }\n}\n\nclass Dog extends Animal {\n  // Kodni shu yerda yozing\n  bark() { return this.name + ' vav deya yuqorlaydi'; }\n}\n\nconst dog = new Dog('Bobur');\nconsole.log(dog.eat()); // 'Bobur yeyapti'",
      hint: "constructor(name, breed) { super(name); this.breed = breed; }",
      test: "if (logs.includes('Bobur yeyapti')) return null; return 'Inheritance xato!';"
    },
    {
      id: 4,
      title: "4️⃣ Getter (O'rta)",
      instruction: "Getter orqali age'ni hisoblang (birthYear'dan).",
      startingCode: "class Person {\n  constructor(name, birthYear) {\n    this.name = name;\n    this.birthYear = birthYear;\n  }\n  \n  // Getter yarating\n  get age() {\n    return 2024 - this.birthYear;\n  }\n}\n\nconst p = new Person('Ali', 1990);\nconsole.log(p.age); // 34",
      hint: "return 2024 - this.birthYear;",
      test: "if (logs.includes(34)) return null; return 'Getter xato!';"
    },
    {
      id: 5,
      title: "5️⃣ Static Metod (O'rta)",
      instruction: "Static add() metodi qo'shing Calculator klassga.",
      startingCode: "class Calculator {\n  // Kodni shu yerda yozing\n  static add(a, b) {\n    return a + b;\n  }\n}\n\nconsole.log(Calculator.add(5, 3)); // 8",
      hint: "static add(a, b) { return a + b; }",
      test: "if (logs.includes(8)) return null; return 'Static xato!';"
    },
    {
      id: 6,
      title: "6️⃣ Super() (O'rta)",
      instruction: "Vehicle → Car merosxo'rlikda super() chaqiring.",
      startingCode: "class Vehicle {\n  constructor(model) { this.model = model; }\n}\n\nclass Car extends Vehicle {\n  constructor(model, color) {\n    // Kodni shu yerda yozing: super va this.color\n  }\n}\n\nconst car = new Car('Tesla', 'qora');\nconsole.log(car.model); // 'Tesla'",
      hint: "super(model); this.color = color;",
      test: "if (logs.includes('Tesla')) return null; return 'Super xato!';"
    },
    {
      id: 7,
      title: "7️⃣ Private Maydon (O'rta)",
      instruction: "BankAccount'da #balance private maydon qo'shing.",
      startingCode: "class BankAccount {\n  // Kodni shu yerda yozing: #balance private maydon\n  \n  deposit(amount) {\n    this.#balance += amount;\n  }\n  \n  getBalance() {\n    return this.#balance;\n  }\n}\n\nconst acc = new BankAccount();\nacc.deposit(100);\nconsole.log(acc.getBalance()); // 100",
      hint: "#balance = 0;",
      test: "if (logs.includes(100)) return null; return 'Private maydon xato!';"
    },
    {
      id: 8,
      title: "8️⃣ Setter (O'rta)",
      instruction: "Setter orqali name'ni o'zgartirib bo'lishi uchun.",
      startingCode: "class User {\n  constructor(name) { this._name = name; }\n  \n  get name() { return this._name; }\n  \n  // Setter yarating\n  set name(value) {\n    if (value.length > 0) this._name = value;\n  }\n}\n\nconst u = new User('Ali');\nu.name = 'Bobur';\nconsole.log(u.name); // 'Bobur'",
      hint: "set name(value) { if (value.length > 0) this._name = value; }",
      test: "if (logs.includes('Bobur')) return null; return 'Setter xato!';"
    },
    {
      id: 9,
      title: "9️⃣ Multi-level Inheritance (Qiyin)",
      instruction: "Animal → Mammal → Dog 3-qavat merosxo'rlik.",
      startingCode: "class Animal {\n  constructor(name) { this.name = name; }\n  move() { return this.name + ' harakat qilmoqda'; }\n}\n\nclass Mammal extends Animal {\n  // Kodni shu yerda yozing\n}\n\nclass Dog extends Mammal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n}\n\nconst dog = new Dog('Bobur', 'Ovcharka');\nconsole.log(dog.move()); // 'Bobur harakat qilmoqda'",
      hint: "constructor(name, warmBlooded) { super(name); this.warmBlooded = warmBlooded; }",
      test: "if (logs.includes('Bobur harakat qilmoqda')) return null; return 'Multi-level xato!';"
    },
    {
      id: 10,
      title: "🔟 Static Property (Qiyin)",
      instruction: "Counter klassda static count property va getCount() static metodi.",
      startingCode: "class Counter {\n  // Kodni shu yerda yozing: static count va constructor\n  \n  static getCount() {\n    return Counter.count;\n  }\n}\n\nnew Counter(); new Counter(); new Counter();\nconsole.log(Counter.getCount()); // 3",
      hint: "static count = 0; constructor() { Counter.count++; }",
      test: "if (logs.includes(3)) return null; return 'Static property xato!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Super Metod (Qiyin)",
      instruction: "Vehicle → Car merosxo'rlikda super.info() chaqiring.",
      startingCode: "class Vehicle {\n  constructor(model) { this.model = model; }\n  info() { return 'Model: ' + this.model; }\n}\n\nclass Car extends Vehicle {\n  constructor(model, color) {\n    super(model);\n    this.color = color;\n  }\n  \n  // Kodni shu yerda yozing: super.info() chaqiring\n  info() {\n    return super.info() + ', Rang: ' + this.color;\n  }\n}\n\nconst car = new Car('Tesla', 'qora');\nconsole.log(car.info()); // 'Model: Tesla, Rang: qora'",
      hint: "return super.info() + ', Rang: ' + this.color;",
      test: "if (logs.includes('Model: Tesla') && logs.includes('Rang: qora')) return null; return 'Super metod xato!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Combine: Klass + Getter + Inheritance (Eng Qiyin)",
      instruction: "Shape → Circle: radius va area getter.",
      startingCode: "class Shape {\n  constructor(name) { this.name = name; }\n}\n\nclass Circle extends Shape {\n  // Kodni shu yerda yozing: constructor radius bilan\n  \n  get area() {\n    return Math.PI * this.radius ** 2;\n  }\n}\n\nconst circle = new Circle('Doira', 5);\nconsole.log(circle.area.toFixed(2)); // '78.50'",
      hint: "constructor(name, radius) { super(name); this.radius = radius; }",
      test: "if (logs.some(l => l.includes('78.50') || l.includes('78.5'))) return null; return 'Combine xato!';"
    }
  ]
};