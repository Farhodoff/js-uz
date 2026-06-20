export const classes = {
  id: "classes",
  title: "Classes (Klasslar) - OOP",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Classes (Klasslar) nima?
**Klass (Class)** — bu obyektlar yaratish uchun ishlatiladigan maxsus shablon (qolip) hisoblanadi. JavaScript aslida prototiplarga asoslangan til bo'lsa ham, ES6 (2015) versiyasida klasslar sintaksisi kiritildi. Bu kodni o'qishni osonlashtiradi va boshqa dasturlash tillaridagi (Java, C++, C#) OOP (Obyektga yo'naltirilgan dasturlash) qoidalariga yaqinlashtiradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **pechenye pishiryapsiz**:
* **Qolip (Klass):** Bu pechenye kesadigan metall shakl. Uning o'zi yeyiladigan oziq-ovqat emas, balki pechenye qanday shaklda bo'lishini belgilaydi.
* **Pechenye (Obyekt/Instance):** Shu metall shakl yordamida xamirdan kesib olingan har bir alohida pechenye. Siz ularning ustiga har xil bezak yoki shokolad qo'shishingiz mumkin (\`properties\`), lekin ularning barchasi bir xil qolipdan chiqqan.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Klass va Obyekt yaratish)
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

// Klassdan obyekt (instance) yaratamiz
const car1 = new Car("BYD Song", 2024);
console.log(car1.getInfo()); // "BYD Song (2024)"
\`\`\`

### 2. Intermediate Example (Inheritance - Merosxo'rlik va \`super()\`)
\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return \`\${this.name} ovqatlanmoqda.\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Ota klass constructorini chaqiramiz
    this.breed = breed;
  }

  bark() {
    return \`\${this.name} vovullamoqda!\`;
  }
}

const myDog = new Dog("Tuzik", "Nemis ovchkasi");
console.log(myDog.eat()); // "Tuzik ovqatlanmoqda."
console.log(myDog.bark()); // "Tuzik vovullamoqda!"
\`\`\`

### 3. Advanced Example (Private maydonlar va Static metodlar)
Tashqaridan o'zgartirib bo'lmaydigan private xususiyatlar (#) va to'g'ridan-to'g'ri klass nomidan chaqiriladigan static metodlar:
\`\`\`javascript
class BankAccount {
  #balance = 0; // Private property (tashqaridan o'qib bo'lmaydi)

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance; // Xavfsiz o'qish
  }

  static getBankName() {
    return "Milliy Bank"; // Static method (instancisiz chaqiriladi)
  }
}

const acc = new BankAccount("Farhod");
acc.deposit(500);
console.log(acc.getBalance()); // 500
console.log(BankAccount.getBankName()); // "Milliy Bank"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Syntactic Sugar (Sintaktik bezak)
JavaScript-dagi klasslar aslida yangi OOP modeli emas. Ular prototiplar ustiga qurilgan.
\`\`\`javascript
class Person {
  constructor(name) { this.name = name; }
  greet() { return "Salom"; }
}
\`\`\`
Yuqoridagi kodni JS dvigateli ichkarida quyidagicha tushunadi:
\`\`\`javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Salom";
};
\`\`\`

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Getter va Setter metodlari orqali validatsiya
Foydalanuvchi ismini o'rnatishda tekshiruv (validation) joriy etish:

\`\`\`javascript
class User {
  constructor(name) {
    this._name = name; // Ichki o'zgaruvchi
  }

  // Getter - qiymatni o'qish uchun
  get name() {
    return this._name.toUpperCase();
  }

  // Setter - qiymat yozishda tekshiruv uchun
  set name(value) {
    if (value.trim().length < 3) {
      console.log("Ism kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    this._name = value;
  }
}

const user = new User("Ali");
console.log(user.name); // "ALI"
user.name = "Yo"; // Konsolga ogohlantirish chiqadi, o'zgarmaydi
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Merosxo'r klassda \`super()\`ni chaqirishni unutish
Merosxo'r klass constructorida \`this\`ni ishlatishdan oldin albatta \`super()\` chaqirilishi kerak.
* **Noto'g'ri:**
  \`\`\`javascript
  class Car extends Vehicle {
    constructor(model, color) {
      this.color = color; // ReferenceError!
      super(model);
    }
  }
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  class Car extends Vehicle {
    constructor(model, color) {
      super(model); // Ota constructor birinchi ishlaydi
      this.color = color;
    }
  }
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Kalit so'z | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`class\` | Yangi klass yaratish | \`class User {}\` |
| \`constructor\` | Boshlang'ich qiymat berish | \`constructor(name) {}\` |
| \`extends\` | Meros olish (Inheritance) | \`class Dog extends Animal\` |
| \`super()\` | Ota klass constructorini chaqirish | \`super(name)\` |
| \`static\` | Klassning o'ziga tegishli metod | \`static sum(a, b) {}\` |
| \`#property\` | Shaxsiy (private) maydon | \`#balance = 0\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Klasslar hoisting bo'ladimi?
Yo'q, klasslar let/const kabi Temporal Dead Zone doirasida bo'ladi va e'lon qilinishidan oldin ulardan foydalanib bo'lmaydi (ReferenceError beradi).

### 2. Obyekt ma'lum bir klassga tegishli ekanini qanday tekshirish mumkin?
\`instanceof\` operatori yordamida: \`user instanceof User\` true yoki false qaytaradi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Prototiplarga asoslangan merosxo'rlik va Klasslar o'rtasida qanday bog'liqlik bor?
2. Private maydonlarga (#) klassdan tashqarida murojaat qilsa nima sodir bo'ladi?
3. Static metod ichida \`this\` ishlatsa bo'ladimi? (Static metodlarda \`this\` klassning o'ziga ishora qiladi, obyektga emas).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida klasslar bo'yicha bilimlaringizni sinab ko'ring.
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
    },
    {
      "id": 13,
      "title": "Klass va Array ishlari",
      "instruction": "Ichida qator saqlaydigan `StringList` klassini yozing. Uning `add(str)` metodi qatorni qo'shsin va `getAll()` metodi barcha qatorlar massivini qaytarsin.",
      "startingCode": "class StringList {\n  constructor() {\n    this.items = [];\n  }\n  // add(str) va getAll() ni yozing\n}",
      "hint": "add(str) da this.items.push(str) va getAll() da return this.items ishlating.",
      "test": "const fn = new Function(code + '; const sl = new StringList(); sl.add(\"hello\"); return sl.getAll();')(); if(fn[0] === 'hello' && fn.length === 1) return null; return 'Xato';"
    },
    {
      "id": 14,
      "title": "To'rtburchak va Yuza",
      "instruction": "`Rectangle` klassini tuzing. `constructor(w, h)` qabul qilsin. `getArea()` metodi `w*h` ni qaytarsin.",
      "startingCode": "class Rectangle {\n  // Kodni yozing\n}",
      "hint": "this.w = w, this.h = h. Va getArea() { return this.w * this.h; }",
      "test": "const fn = new Function(code + '; return new Rectangle(4, 5).getArea();')(); if(fn === 20) return null; return 'Xato';"
    },
    {
      "id": 15,
      "title": "Avtomobil Oynasi",
      "instruction": "`Window` klassi `isOpen` (boshida false) xossasiga ega. `open()` metodi uni true qilsin, `close()` metodi false qilsin.",
      "startingCode": "class Window {\n  // Kodni yozing\n}",
      "hint": "constructor() { this.isOpen = false; } qilib, open va close larda true/false qiling.",
      "test": "const fn = new Function(code + '; const w=new Window(); w.open(); return w.isOpen;')(); if(fn===true) return null; return 'Xato';"
    },
    {
      "id": 16,
      "title": "Student va Baho",
      "instruction": "`Student` klassida `score` bor. `isPassed()` metodi `score >= 60` bo'lsa true, aks holda false qaytarsin.",
      "startingCode": "class Student {\n  constructor(score) {\n    this.score = score;\n  }\n  // isPassed() yozing\n}",
      "hint": "isPassed() { return this.score >= 60; }",
      "test": "const fn = new Function(code + '; return new Student(60).isPassed();')(); if(fn===true) return null; return 'Xato';"
    },
    {
      "id": 17,
      "title": "Klass metodida zanjir (Chaining)",
      "instruction": "`Calc` klassi boshida `value=0` ga ega. `add(n)` qoshib, o'zini (`this`) qaytarsin, shunda `.add(5).add(3)` qila olishimiz kerak.",
      "startingCode": "class Calc {\n  constructor() { this.value = 0; }\n  add(n) {\n    // Kodni yozing va o'zini qaytaring\n  }\n}",
      "hint": "this.value += n; return this;",
      "test": "const fn = new Function(code + '; return new Calc().add(5).add(3).value;')(); if(fn === 8) return null; return 'Chaining xato';"
    },
    {
      "id": 18,
      "title": "Xodim va Maosh",
      "instruction": "`Employee` klassi `baseSalary` bilan yaratilsin. `getSalary(bonus)` metodi `baseSalary + bonus` qaytarsin.",
      "startingCode": "class Employee {\n  // Kodni yozing\n}",
      "hint": "getSalary(bonus) { return this.baseSalary + bonus; }",
      "test": "const fn = new Function(code + '; return new Employee(100).getSalary(20);')(); if(fn===120) return null; return 'Xato';"
    },
    {
      "id": 19,
      "title": "Private Maydonda Ism",
      "instruction": "`User` klassida `#name` private maydoni bo'lsin. Konstruktorda `#name = name` o'rnating va `getName()` metodi qaytarsin.",
      "startingCode": "class User {\n  // Kodni yozing\n}",
      "hint": "#name; constructor(name) { this.#name = name; } getName() { return this.#name; }",
      "test": "const fn = new Function(code + '; const u = new User(\"Ali\"); return u.getName();')(); if(fn===\"Ali\") return null; return 'Xato';"
    },
    {
      "id": 20,
      "title": "Parolni Yashirish",
      "instruction": "`Account` klassi parol bilan yaratiladi. Ammo parolni o'qib bo'lmasligi kerak, faqat `checkPassword(pwd)` true/false qaytarsin.",
      "startingCode": "class Account {\n  // Kodni yozing\n}",
      "hint": "#password private qilib ishlating.",
      "test": "const fn = new Function(code + '; const a = new Account(\"123\"); return a.checkPassword(\"123\");')(); if(fn===true) return null; return 'Xato';"
    },
    {
      "id": 21,
      "title": "Super() chaqirish qoidasi",
      "instruction": "`Box` klassi tuzing (weight=10). `GiftBox` klassi undan voris bo'lsin va konstruktorda super() chaqirsin, so'ng `this.color = \"red\"`.",
      "startingCode": "class Box {\n  constructor() { this.weight = 10; }\n}\nclass GiftBox extends Box {\n  // Kodni yozing\n}",
      "hint": "constructor() { super(); this.color = 'red'; }",
      "test": "const fn = new Function(code + '; const g = new GiftBox(); return g.weight === 10 && g.color === \"red\";')(); if(fn===true) return null; return 'Xato';"
    },
    {
      "id": 22,
      "title": "Static funksiya yordamida obyekt yaratish",
      "instruction": "`Point` klassida x, y bor. `Point.origin()` degan static metod sifr(0,0) li yangi Point qaytarsin.",
      "startingCode": "class Point {\n  constructor(x, y) { this.x=x; this.y=y; }\n  // static origin() yozing\n}",
      "hint": "static origin() { return new Point(0,0); }",
      "test": "const fn = new Function(code + '; return Point.origin();')(); if(fn.x===0 && fn.y===0) return null; return 'Xato';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript klasslarida (Classes) `constructor` metodining asosiy vazifasi nima?",
    "options": [
      "Klass uchun yeni metodlarni yaratish",
      "Klassdan yangi obyekt (instance) olingan vaqtda avtomatik ishga tushib, obyektning boshlang'ich xususiyatlarini (properties) o'rnatish",
      "HTML elementlarni brauzerda render qilish",
      "Kodni optimallashtirish va tezligini oshirish"
    ],
    "correctAnswer": 1,
    "explanation": "`constructor` - yangi obyekt yaratilganda (`new` kalit so'zi bilan chaqirilganda) klass ichida birinchi bo'lib avtomatik ishlaydigan va obyekt property'larini initsializatsiya qiladigan maxsus metoddir."
  },
  {
    "id": 2,
    "question": "Merosxo'r klass (subclass) constructor'ida `this` kalit so'zini ishlatishdan oldin nima qilish majburiy hisoblanadi?",
    "options": [
      "`super()` funksiyasini chaqirib, ota klass (superclass) constructor'ini ishga tushirish",
      "Klass nomini kichik harflarda yozish",
      "`this` o'zgaruvchisini `null` qilish",
      "`super.prototype` ni o'chirish"
    ],
    "correctAnswer": 0,
    "explanation": "Merosxo'r klassda `this` dan foydalanishdan avval ota klass constructor'ini chaqirish uchun `super()` ishga tushirilishi zarur, aks holda ReferenceError yuz beradi."
  },
  {
    "id": 3,
    "question": "`static` kalit so'zi yordamida e'lon qilingan metod (static method) qanday chaqiriladi?",
    "options": [
      "Faqat `new` orqali yaratilgan obyekt (instance) orqali chaqiriladi",
      "Klass instansiyasini yaratmasdan, to'g'ridan-to'g'ri klass nomidan chaqiriladi (masalan, `MathHelper.add()`)",
      "Faqat `super` yordamida chaqiriladi",
      "Faqat asinxron tarzda `await` bilan chaqiriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Static metodlar klass instansiyalariga (obyektlarga) bog'lanmagan bo'ladi. Ular faqat klassning o'z nomidan chaqiriladi."
  },
  {
    "id": 4,
    "question": "ES6 klasslarida maydon yoki metod nomining oldiga qo'yiladigan panjara (`#`) belgisi nimani anglatadi?",
    "options": [
      "Ushbu maydon xotiradan butunlay o'chirilishini",
      "Ushbu maydon mutlaqo shaxsiy (private) ekanligini va unga faqat klass ichidan murojaat qilish mumkinligini (tashqaridan o'qib yoki o'zgartirib bo'lmaydi)",
      "Ushbu maydon global o'zgaruvchiga aylanganini",
      "Bu CSS selektorini belgilash uchun ishlatilishini"
    ],
    "correctAnswer": 1,
    "explanation": "Panjara `#` belgisi bilan boshlanuvchi maydonlar (fields) va metodlar to'liq shaxsiy (private) hisoblanib, ularga klass tashqarisidan to'g'ridan-to'g'ri murojaat qilish taqiqlanadi."
  },
  {
    "id": 5,
    "question": "JavaScript'dagi klasslar (Classes) haqida qaysi fikr to'g'ri?",
    "options": [
      "JavaScript klasslari butunlay yangi mustaqil OOP modelidir",
      "JavaScript klasslari aslida mavjud prototipli inheritance (prototype-based inheritance) ustiga qurilgan qulay \"syntactic sugar\" (sintaktik bezak) xolos",
      "Klasslar hoisting bo'ladi va e'lon qilinishidan oldin to'liq ishlatilishi mumkin",
      "Klasslar faqat server (Node.js) muhitida ishlaydi, brauzerda ishlamaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript tagida baribir prototype inheritance yotadi. ES6 klasslari esa koderlar uchun o'qish va yozishni osonlashtiruvchi sintaktik qobiq (syntactic sugar) vazifasini bajaradi xolos."
  },
  {
    "id": 6,
    "question": "Klass getter (get) metodi qanday chaqiriladi?",
    "options": [
      "Funksiya kabi qavslar bilan (masalan: `person.age()`)",
      "Oddiy property kabi, qavslarsiz (masalan: `person.age`)",
      "Faqat static metodlar ichida",
      "get kalit so'zi yordamida new orqali chaqiriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Getter metodlar (get kalit so'zi bilan yozilganlar) chaqirilganda funksiya kabi qavs qo'yilmaydi, balki oddiy xususiyat (property) kabi o'qiladi."
  },
  {
    "id": 7,
    "question": "Agar merosxo'r klassda `constructor` e'lon qilinmasa nima sodir bo'ladi?",
    "options": [
      "JavaScript xato qaytaradi (ReferenceError)",
      "JavaScript o'zi avtomatik ota klass constructor'ini barcha parametrlari bilan chaqiruvchi default constructor yaratadi",
      "Merosxo'rlik ishlamaydi",
      "Obyekt yaratilganda default qiymat undefined bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Agar child klassda constructor yozilmasa, JS dvigateli avtomatik ravishda `constructor(...args) { super(...args); }` ko'rinishidagi default constructor yaratadi."
  },
  {
    "id": 8,
    "question": "Klassda setter (set) metodlarining asosiy maqsadi va ishlatilishi nima?",
    "options": [
      "Qiymatni ekranga chop etish uchun",
      "Biror property'ga qiymat berishdan oldin uni tekshirish (validatsiya qilish) yoki o'zgartirish",
      "Klassga yangi static metodlar qo'shish",
      "Obyektni JSON ko'rinishiga o'tkazish"
    ],
    "correctAnswer": 1,
    "explanation": "Setter (set) metodlar property'ga yangi qiymat berilayotganda uni tekshirish, filtrlash yoki o'zgartirish imkonini beradi."
  },
  {
    "id": 9,
    "question": "`new.target` klass ichida nimani aniqlash uchun ishlatiladi?",
    "options": [
      "Yangi yaratiladigan HTML target elementini",
      "Klass to'g'ridan-to'g'ri chaqirilganini yoki merosxo'r klass orqali chaqirilganini (masalan, abstract klass yaratishda)",
      "Klassdagi static metodlar sonini",
      "Global 'this' obyekti targetini"
    ],
    "correctAnswer": 1,
    "explanation": "`new.target` constructor qaysi klass orqali chaqirilganini aniqlaydi. Agar klass bevosita chaqirilgan bo'lsa, `new.target` shu klassning o'zini qaytaradi."
  },
  {
    "id": 10,
    "question": "Ota klassdagi oddiy metodni merosxo'r klassda xuddi shu nom bilan qayta yozish (override qilish) qanday amalga oshiriladi?",
    "options": [
      "override kalit so'zi yordamida",
      "Merosxo'r klass ichida shunchaki o'sha nom bilan yangi metod e'lon qilish orqali (ota metodni chaqirish uchun `super.metodNom()` ishlatilishi mumkin)",
      "Buning iloji yo'q, xatolik yuz beradi",
      "Faqat static metodlarni override qilish mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Merosxo'r klassda ota klassdagi metod nomini qaytadan e'lon qilish orqali uni override qilish mumkin. Agar eski ota metodni ham ishlatmoqchi bo'lsak, `super.metodNom()` deb murojaat qilamiz."
  },
  {
    "id": 11,
    "question": "Klasslar hoisting (kodning yuqorisiga ko'tarilish) bo'ladimi?",
    "options": [
      "Ha, var kabi hoisting bo'ladi va e'lon qilinishidan oldin ishlatish mumkin",
      "Yo'q, klasslar hoisting bo'lmaydi (TDZda bo'ladi) va ulardan faqat e'lon qilingandan keyin foydalanish mumkin",
      "Faqat static klasslar hoisting bo'ladi",
      "Faqat constructor bo'lmagan klasslar hoisting bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Klasslar hoisting bo'lmaydi (funksiyalardan farqli ravishda, xuddi let/const kabi Temporal Dead Zone qoidasiga bo'ysunadi). Ularni faqat e'lon qilingandan keyin chaqirish mumkin."
  },
  {
    "id": 12,
    "question": "JavaScript klasslarida prototype zanjirini (prototype chain) tekshirish uchun qaysi operator ishlatiladi?",
    "options": [
      "`typeof`",
      "`instanceof`",
      "`in`",
      "`hasOwnProperty`"
    ],
    "correctAnswer": 1,
    "explanation": "`instanceof` operatori obyektning prototipi uning prototype zanjirida constructor.prototype'ga mos kelish-kelmasligini tekshiradi."
  }
]

};
