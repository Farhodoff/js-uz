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

**<b>1. Klass (Class) nima?</b>**
Objektlar yaratish uchun "shablon" yoki "qolip". Modernizm JS/ES6 qo'shimchasi.


**<b>2. Constructor metodi nima?</b>**
Yangi objekti yaratilganda birinchi chaqirilgan maxsus metod. Boshlang'ich qiymatlarni berish uchun.


**<b>3. new kalit so'zi nima qiladi?</b>**
1. Yangi obje yaratadi. 2. Constructor'ni this bo'lib chaqiradi. 3. this'ni qaytaradi.


**<b>4. Klass ichidagi funksiya nima deyiladi?</b>**
Metod (method).


**<b>5. Extends kalit so'zi nima?</b>**
Bir klassdan boshqasini merosxo'rlik (inheritance) qilish uchun.


**<b>6. Super() funksiyasi nima?</b>**
Ota klass'ning constructor'ni chaqirish uchun. Extend qilganda shart.


**<b>7. Static metod nima?</b>**
Klassga tegishli, lekin objektga emas. new'ga kerak emas. Klass.metod() shaklida chaqiriladi.


**<b>8. Getter va Setter nima?</b>**
Getter: property'ni o'qish kabi yozish. Setter: property'ni belgilash kabi yozish. get/set kalit so'zlari bilan.


**<b>9. Private maydonlar (#) nima?</b>**
Tashqaridan o'zgartirib bo'lmaydigan maydonlar. Faqat klass ichida.


**<b>10. Klass nomi qanday harf bilan boshlanishi kerak?</b>**
Katta harf (PascalCase): Car, Person, Animal.


**<b>11. Bitta klassdan nechta obyekt olish mumkin?</b>**
Cheksiz. Har biri alohida instance.


**<b>12. Klasslar JSga qachon qo'shilgan?</b>**
ES6 (ECMAScript 2015). Asli prototip-based, syntactic sugar.
`,
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
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript klasslarida (Classes) `constructor` metodining asosiy vazifasi nima?",
      options: [
        "Klass uchun yangi metodlarni yaratish",
        "Klassdan yangi obyekt (instance) olingan vaqtda avtomatik ishga tushib, obyektning boshlang'ich xususiyatlarini (properties) o'rnatish",
        "HTML elementlarni brauzerda render qilish",
        "Kodni optimallashtirish va tezligini oshirish"
      ],
      correctAnswer: 1,
      explanation: "`constructor` - yangi obyekt yaratilganda (`new` kalit so'zi bilan chaqirilganda) klass ichida birinchi bo'lib avtomatik ishlaydigan va obyekt property'larini initsializatsiya qiladigan maxsus metoddir."
    },
    {
      id: 2,
      question: "Merosxo'r klass (subclass) constructor'ida `this` kalit so'zini ishlatishdan oldin nima qilish majburiy hisoblanadi?",
      options: [
        "`super()` funksiyasini chaqirib, ota klass (superclass) constructor'ini ishga tushirish",
        "Klass nomini kichik harflarda yozish",
        "`this` o'zgaruvchisini `null` qilish",
        "`super.prototype` ni o'chirish"
      ],
      correctAnswer: 0,
      explanation: "Merosxo'r klassda `this` dan foydalanishdan avval ota klass constructor'ini chaqirish uchun `super()` ishga tushirilishi zarur, aks holda ReferenceError yuz beradi."
    },
    {
      id: 3,
      question: "`static` kalit so'zi yordamida e'lon qilingan metod (static method) qanday chaqiriladi?",
      options: [
        "Faqat `new` orqali yaratilgan obyekt (instance) orqali chaqiriladi",
        "Klass instansiyasini yaratmasdan, to'g'ridan-to'g'ri klass nomidan chaqiriladi (masalan, `MathHelper.add()`)",
        "Faqat `super` yordamida chaqiriladi",
        "Faqat asinxron tarzda `await` bilan chaqiriladi"
      ],
      correctAnswer: 1,
      explanation: "Static metodlar klass instansiyalariga (obyektlarga) bog'lanmagan bo'ladi. Ular faqat klassning o'z nomidan chaqiriladi."
    },
    {
      id: 4,
      question: "ES6 klasslarida maydon yoki metod nomining oldiga qo'yiladigan panjara (`#`) belgisi nimani anglatadi?",
      options: [
        "Ushbu maydon xotiradan butunlay o'chirilishini",
        "Ushbu maydon mutlaqo shaxsiy (private) ekanligini va unga faqat klass ichidan murojaat qilish mumkinligini (tashqaridan o'qib yoki o'zgartirib bo'lmaydi)",
        "Ushbu maydon global o'zgaruvchiga aylanganini",
        "Bu CSS selektorini belgilash uchun ishlatilishini"
      ],
      correctAnswer: 1,
      explanation: "Panjara `#` belgisi bilan boshlanuvchi maydonlar (fields) va metodlar to'liq shaxsiy (private) hisoblanib, ularga klass tashqarisidan to'g'ridan-to'g'ri murojaat qilish taqiqlanadi."
    },
    {
      id: 5,
      question: "JavaScript'dagi klasslar (Classes) haqida qaysi fikr to'g'ri?",
      options: [
        "JavaScript klasslari butunlay yangi mustaqil OOP modelidir",
        "JavaScript klasslari aslida mavjud prototipli inheritance (prototype-based inheritance) ustiga qurilgan qulay \"syntactic sugar\" (sintaktik bezak) xolos",
        "Klasslar hoisting bo'ladi va e'lon qilinishidan oldin to'liq ishlatilishi mumkin",
        "Klasslar faqat server (Node.js) muhitida ishlaydi, brauzerda ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript tagida baribir prototype inheritance yotadi. ES6 klasslari esa koderlar uchun o'qish va yozishni osonlashtiruvchi sintaktik qobiq (syntactic sugar) vazifasini bajaradi xolos."
    },
    {
      id: 6,
      question: "Klass getter (get) metodi qanday chaqiriladi?",
      options: [
        "Funksiya kabi qavslar bilan (masalan: `person.age()`)",
        "Oddiy property kabi, qavslarsiz (masalan: `person.age`)",
        "Faqat static metodlar ichida",
        "get kalit so'zi yordamida new orqali chaqiriladi"
      ],
      correctAnswer: 1,
      explanation: "Getter metodlar (get kalit so'zi bilan yozilganlar) chaqirilganda funksiya kabi qavs qo'yilmaydi, balki oddiy xususiyat (property) kabi o'qiladi."
    },
    {
      id: 7,
      question: "Agar merosxo'r klassda `constructor` e'lon qilinmasa nima sodir bo'ladi?",
      options: [
        "JavaScript xato qaytaradi (ReferenceError)",
        "JavaScript o'zi avtomatik ota klass constructor'ini barcha parametrlari bilan chaqiruvchi default constructor yaratadi",
        "Merosxo'rlik ishlamaydi",
        "Obyekt yaratilganda default qiymat undefined bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Agar child klassda constructor yozilmasa, JS dvigateli avtomatik ravishda `constructor(...args) { super(...args); }` ko'rinishidagi default constructor yaratadi."
    },
    {
      id: 8,
      question: "Klassda setter (set) metodlarining asosiy maqsadi va ishlatilishi nima?",
      options: [
        "Qiymatni ekranga chop etish uchun",
        "Biror property'ga qiymat berishdan oldin uni tekshirish (validatsiya qilish) yoki o'zgartirish",
        "Klassga yangi static metodlar qo'shish",
        "Obyektni JSON ko'rinishiga o'tkazish"
      ],
      correctAnswer: 1,
      explanation: "Setter (set) metodlar property'ga yangi qiymat berilayotganda uni tekshirish, filtrlash yoki o'zgartirish imkonini beradi."
    },
    {
      id: 9,
      question: "`new.target` klass ichida nimani aniqlash uchun ishlatiladi?",
      options: [
        "Yangi yaratiladigan HTML target elementini",
        "Klass to'g'ridan-to'g'ri chaqirilganini yoki merosxo'r klass orqali chaqirilganini (masalan, abstract klass yaratishda)",
        "Klassdagi static metodlar sonini",
        "Global 'this' obyekti targetini"
      ],
      correctAnswer: 1,
      explanation: "`new.target` constructor qaysi klass orqali chaqirilganini aniqlaydi. Agar klass bevosita chaqirilgan bo'lsa, `new.target` shu klassning o'zini qaytaradi."
    },
    {
      id: 10,
      question: "Ota klassdagi oddiy metodni merosxo'r klassda xuddi shu nom bilan qayta yozish (override qilish) qanday amalga oshiriladi?",
      options: [
        "override kalit so'zi yordamida",
        "Merosxo'r klass ichida shunchaki o'sha nom bilan yangi metod e'lon qilish orqali (ota metodni chaqirish uchun `super.metodNom()` ishlatilishi mumkin)",
        "Buning iloji yo'q, xatolik yuz beradi",
        "Faqat static metodlarni override qilish mumkin"
      ],
      correctAnswer: 1,
      explanation: "Merosxo'r klassda ota klassdagi metod nomini qaytadan e'lon qilish orqali uni override qilish mumkin. Agar eski ota metodni ham ishlatmoqchi bo'lsak, `super.metodNom()` deb murojaat qilamiz."
    },
    {
      id: 11,
      question: "Klasslar hoisting (kodning yuqorisiga ko'tarilish) bo'ladimi?",
      options: [
        "Ha, var kabi hoisting bo'ladi va e'lon qilinishidan oldin ishlatish mumkin",
        "Yo'q, klasslar hoisting bo'lmaydi (TDZda bo'ladi) va ulardan faqat e'lon qilingandan keyin foydalanish mumkin",
        "Faqat static klasslar hoisting bo'ladi",
        "Faqat constructor bo'lmagan klasslar hoisting bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Klasslar hoisting bo'lmaydi (funksiyalardan farqli ravishda, xuddi let/const kabi Temporal Dead Zone qoidasiga bo'ysunadi). Ularni faqat e'lon qilingandan keyin chaqirish mumkin."
    },
    {
      id: 12,
      question: "JavaScript klasslarida prototype zanjirini (prototype chain) tekshirish uchun qaysi operator ishlatiladi?",
      options: [
        "`typeof`",
        "`instanceof`",
        "`in`",
        "`hasOwnProperty`"
      ],
      correctAnswer: 1,
      explanation: "`instanceof` operatori obyektning prototipi uning prototype zanjirida constructor.prototype'ga mos kelish-kelmasligini tekshiradi."
    }
  ]
};