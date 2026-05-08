export const prototypesLesson = {
  id: "a18",
  title: "🔗 Prototypes — OOP Asosi",
  level: "Murakkab",
  description: "Prototype chain, merosxo'rlik, va JavaScript OOP mexanizmi.",
  theory: `## 📌 PROTOTYPES — OOP ASOSI

### 1. NEGA KERAK? (Sabab)
**Savollar:**
- Nima uchun har bir massivda .map(), .filter() metodi bor?
- Nima uchun har bir string .toUpperCase() metodi bor?
- Kodni qayta ishlatish uchun qanday pattern?

**Javob:** Prototype — JavaScript'ning OOP mexanizmi.

---

### 2. SODDALIK (Analogiya)

**Oila vorislik:**
- \`Bobasi = Prototype (taqdim)\`
- \`Otasi = Prototype (o'rta)\`
- \`Men = Object (konkret)\`

Menga pul kerak bo'lsa, avval o'zimda qidiram. Yo'q bo'lsa, otamdan so'rayman. Otada yo'q bo'lsa, bobamdan so'rayman.

---

### 3. TUSHUNCHA (BATAFSIL)

#### A. Prototype Zanjiri (Prototype Chain)

\`\`\`javascript
// Har bir obyekt tashqarida __proto__ bor (yashirin)
const obj = {};
console.log(obj.__proto__); // Object.prototype

// Zanjir:
obj → Object.prototype → null
\`\`\`

#### B. Metod Qo'shish

\`\`\`javascript
// 1. Object.prototype da qo'shish (HAMMA objektlarda bo'ladi)
Object.prototype.salom = function() {
  return "Salom!";
};

const obj = {};
console.log(obj.salom()); // "Salom!" (yuqoridan topildi)

// 2. Konkret objektda qo'shish
const user = {};
user.salom = function() { return "Salom, " + this.ism; };
console.log(user.salom()); // Faqat bu objektda

// 3. Constructor funksiya orqali
function Robot(name) {
  this.name = name;
}

Robot.prototype.sayHi = function() {
  return "Salom, men " + this.name;
};

const robot = new Robot("R2D2");
console.log(robot.sayHi()); // "Salom, men R2D2"
\`\`\`

#### C. Inheritance (Merosxo'rlik)

\`\`\`javascript
// USULI 1: Prototype Chain
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return this.name + " yeyapti";
};

function Dog(name, breed) {
  Animal.call(this, name); // Ota konstruktorini chaqirish
  this.breed = breed;
}

// Dog.prototype'i Animal.prototype'dan meros oladi
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Constructor'ni o'z o'rniga qo'yish

Dog.prototype.bark = function() {
  return this.name + " vav deya yuqorlaydi";
};

const dog = new Dog("Bobur", "Ovcharka");
console.log(dog.eat()); // "Bobur yeyapti" (meros olgan)
console.log(dog.bark()); // "Bobur vav deya yuqorlaydi"
\`\`\`

#### D. Object.create()

\`\`\`javascript
const parent = {
  greet: function() { return "Salom!"; }
};

// Yangi objekt, prototipi = parent
const child = Object.create(parent);
console.log(child.greet()); // "Salom!" (parent'dan topildi)
\`\`\`

---

### 4. CONSTRUCTOR FUNKSIYALAR

\`\`\`javascript
function Car(model, year) {
  this.model = model; // Instance xususiyati
  this.year = year;
}

Car.prototype.info = function() {
  return this.model + " (" + this.year + ")";
};

const car1 = new Car("Tesla", 2024);
const car2 = new Car("BMW", 2023);

console.log(car1.info()); // "Tesla (2024)"
console.log(car2.info()); // "BMW (2023)"

// Qaysilari turli?
console.log(car1 === car2); // false (turli objektlar)
console.log(car1.info === car2.info); // true (bir xil metod)
\`\`\`

---

### 5. BUILT-IN PROTOTYPES

\`\`\`javascript
// String
const str = "hello";
console.log(str.toUpperCase()); // String.prototype da

// Array
const arr = [1, 2, 3];
console.log(arr.map(n => n * 2)); // Array.prototype da

// Function
function hello() {}
console.log(hello.call(null)); // Function.prototype da

// Zanjir:
arr → Array.prototype → Object.prototype → null
\`\`\`

---

### 6. PROTO vs PROTOTYPE

\`\`\`javascript
function Robot(name) {
  this.name = name;
}

const robot = new Robot("R2D2");

// __proto__ — Implementatsiya (yashirin, internal)
console.log(robot.__proto__ === Robot.prototype); // true

// prototype — Constructor funk funksiyaning xususiyati
console.log(Robot.prototype); // { constructor, ... }
\`\`\`

---

### 7. 12 TA SAVOL VA JAVOBLAR

<details>
<summary><b>1. Prototype nima?</b></summary>
Har bir JavaScript objekti boshqa bir objektga ishora qiladi (uning "taqdim"). Bu orqali metodlar va xususiyatlar bo'lishiladi.
</details>

<details>
<summary><b>2. __proto__ va prototype farqi?</b></summary>
\`__proto__\` — obyektning prototipiga ishora. \`prototype\` — constructor funksiyaning xususiyati.
</details>

<details>
<summary><b>3. Prototype chain nima?</b></summary>
Xususiyat qidirayotganda, avval o'z objektda, keyin prototipda, keyin prototipning prototipida... null ga yetguncha qidiriladi.
</details>

<details>
<summary><b>4. new kalit so'zi nima qiladi?</b></summary>
1. Yangi object yaratadi. 2. Constructor'ga this bo'lib beradi. 3. Yangi objektning __proto__'si constructor.prototype'i bilan bog'lanadi.
</details>

<details>
<summary><b>5. Object.create() nima?</b></summary>
Yangi objektni yaratadi, prototipini belgilash imkonini beradi.
</details>

<details>
<summary><b>6. Constructor funksiyasi nima?</b></summary>
"new" kalit so'zi bilan chaqirilgan odatiy funksiya. Yangi objektlar yaratishda ishlatiladi.
</details>

<details>
<summary><b>7. Object.prototype'ga metod qo'shish xavfli?</b></summary>
Ha! Hamma objektlar satralmaydi. Faqat zarur bo'lsa va nom taqqoshladi.
</details>

<details>
<summary><b>8. Inheritance qanday amalga oshadi?</b></summary>
Ota konstruktorini chaqirish va Object.create() yordamida prototip bog'lash.
</details>

<details>
<summary><b>9. instanceof operatori nima?</b></summary>
Objektning prototoip zanjirida konstruktor.prototype bormi-yo'qmi tekshiradi.
</details>

<details>
<summary><b>10. Hasownproperty() metodi nima?</b></summary>
Xususiyat o'z object'da bormi (prototipda emas), tekshiradi.
</details>

<details>
<summary><b>11. for...in va for...of farqi?</b></summary>
\`for...in\` — prototip zanjirni ham bo'yib. \`for...of\` — Iterator protocol.
</details>

<details>
<summary><b>12. Klasslar asli nima?</b></summary>
ES6 klasslar asli Prototype-based va constructor funksiyalari. Syntactic sugar.
</details>`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Prototype Metod (Boshlang'ich)",
      instruction: "Person konstruktor yarating, Prototype'ga greet metodi qo'shing.",
      startingCode: "function Person(name) {\n  this.name = name;\n}\n\n// Kodni shu yerda yozing\nPerson.prototype.greet = /* ... */;\n\nconst p = new Person('Ali');\nconsole.log(p.greet()); // 'Salom, Ali'",
      hint: "function() { return 'Salom, ' + this.name; }",
      test: "if (logs.includes('Salom, Ali')) return null; return 'Prototype metod xato!';"
    },
    {
      id: 2,
      title: "2️⃣ Constructor va New (O'rta)",
      instruction: "Dog(name) konstruktor yarating, 2 ta dog instance yaratib, ularni ayrash kerak.",
      startingCode: "function Dog(name) {\n  // Kodni shu yerda yozing: this.name = name\n}\n\nconst dog1 = new Dog('Bobur');\nconst dog2 = new Dog('Sergo');\nconsole.log(dog1.name, dog2.name);",
      hint: "this.name = name;",
      test: "if (logs.some(l => l.includes('Bobur') && l.includes('Sergo'))) return null; return 'Constructor xato!';"
    },
    {
      id: 3,
      title: "3️⃣ Prototype Chain (O'rta)",
      instruction: "Car(model) → Vehicle(color) merosxo'rlik qiling.",
      startingCode: "function Vehicle(color) { this.color = color; }\nVehicle.prototype.drive = function() { return 'Haydaydi'; };\n\nfunction Car(model, color) {\n  Vehicle.call(this, color);\n  this.model = model;\n}\n\n// Kodni shu yerda yozing (merosxo'rlik)\nCar.prototype = Object.create(Vehicle.prototype);\nCar.prototype.constructor = Car;\n\nconst car = new Car('Tesla', 'qora');\nconsole.log(car.drive()); // 'Haydaydi'",
      hint: "// Mavjud, to'liq bo'lgan",
      test: "if (logs.includes('Haydaydi')) return null; return 'Inheritance xato!';"
    },
    {
      id: 4,
      title: "4️⃣ Object.create() (O'rta)",
      instruction: "Object.create() orqali parent'dan child yarating.",
      startingCode: "const parent = { greet: function() { return 'Salom!'; } };\n\n// Kodni shu yerda yozing\nconst child = Object.create(parent);\nconsole.log(child.greet()); // 'Salom!'",
      hint: "Object.create(parent)",
      test: "if (logs.includes('Salom!')) return null; return 'Object.create xato!';"
    },
    {
      id: 5,
      title: "5️⃣ This Binding (O'rta)",
      instruction: "Constructor ichida 'this' to'g'ri ishlashini ko'rsating.",
      startingCode: "function Robot(name) {\n  // Kodni shu yerda yozing: this.name = name\n}\n\nRobot.prototype.identify = function() {\n  console.log('Men: ' + this.name);\n};\n\nconst r1 = new Robot('R2D2');\nconst r2 = new Robot('C3PO');\nr1.identify(); // 'Men: R2D2'\nr2.identify(); // 'Men: C3PO'",
      hint: "this.name = name;",
      test: "if (logs.includes('Men: R2D2') && logs.includes('Men: C3PO')) return null; return 'This xato!';"
    },
    {
      id: 6,
      title: "6️⃣ Prototype vs Own Property (O'rta)",
      instruction: "hasOwnProperty() orqali o'z property bilan prototype'dagi farqini ko'rsating.",
      startingCode: "function Animal(name) { this.name = name; }\nAnimal.prototype.type = 'Animal';\n\nconst animal = new Animal('Dog');\nconsole.log(animal.hasOwnProperty('name')); // true\nconsole.log(animal.hasOwnProperty('type')); // false",
      hint: "// Mavjud",
      test: "if (logs.some(l => l === 'true' || l === 'false')) return null; return 'HasOwnProperty xato!';"
    },
    {
      id: 7,
      title: "7️⃣ Instanceof (O'rta)",
      instruction: "instanceof operator'ni ishlatib, typ tekshiring.",
      startingCode: "function Shape(name) { this.name = name; }\n\nconst shape = new Shape('Circle');\nconsole.log(shape instanceof Shape); // true\nconsole.log(shape instanceof Object); // true\nconsole.log(shape instanceof Array); // false",
      hint: "// Mavjud",
      test: "if (logs.includes('true') && logs.includes('false')) return null; return 'Instanceof xato!';"
    },
    {
      id: 8,
      title: "8️⃣ Prototype Extension (O'rta)",
      instruction: "Massiv uchun .last() metodi qo'shing Array.prototype ga.",
      startingCode: "// Kodni shu yerda yozing\nArray.prototype.last = function() {\n  return this[this.length - 1];\n};\n\nconst arr = [1, 2, 3, 4, 5];\nconsole.log(arr.last()); // 5",
      hint: "return this[this.length - 1];",
      test: "if (logs.includes(5)) return null; return 'Array extension xato!';"
    },
    {
      id: 9,
      title: "9️⃣ Multi-level Inheritance (Qiyin)",
      instruction: "Animal → Mammal → Dog 3-qavat merosxo'rlik.",
      startingCode: "function Animal(name) { this.name = name; }\nAnimal.prototype.move = function() { return 'Harakat qilmoqda'; };\n\nfunction Mammal(name, warmBlooded) {\n  Animal.call(this, name);\n  this.warmBlooded = warmBlooded;\n}\n\n// Kodni shu yerda yozing (Mammal ← Animal)\nMammal.prototype = Object.create(Animal.prototype);\nMammal.prototype.constructor = Mammal;\n\nfunction Dog(name, breed) {\n  Mammal.call(this, name, true);\n  this.breed = breed;\n}\n\nDog.prototype = Object.create(Mammal.prototype);\nDog.prototype.constructor = Dog;\n\nconst dog = new Dog('Bobur', 'Ovcharka');\nconsole.log(dog.move()); // 'Harakat qilmoqda'",
      hint: "// Mavjud",
      test: "if (logs.includes('Harakat qilmoqda')) return null; return 'Multi-level xato!';"
    },
    {
      id: 10,
      title: "🔟 Prototype Delegation (Qiyin)",
      instruction: "Bir necha objektni bir prototype bilan ishlating.",
      startingCode: "const actions = {\n  jump: function() { return this.name + ' sakraydi'; },\n  run: function() { return this.name + ' yuguradi'; }\n};\n\n// Kodni shu yerda yozing (ikkita player'ni Object.create bilan yarating)\nconst p1 = Object.create(actions);\np1.name = 'Ali';\n\nconst p2 = /* ... */;\np2.name = 'Zara';\n\nconsole.log(p1.jump()); // 'Ali sakraydi'\nconsole.log(p2.run()); // 'Zara yuguradi'",
      hint: "const p2 = Object.create(actions); p2.name = 'Zara';",
      test: "if (logs.includes('Ali sakraydi') && logs.includes('Zara yuguradi')) return null; return 'Delegation xato!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Polyfill Pattern (Qiyin)",
      instruction: "Array'ga .sum() metodi qo'shing faqat bo'lmasa.",
      startingCode: "// Kodni shu yerda yozing (Agar Array.prototype.sum yo'q bo'lsa qo'shing)\nif (!Array.prototype.sum) {\n  Array.prototype.sum = function() {\n    return this.reduce((a, b) => a + b, 0);\n  };\n}\n\nconst nums = [1, 2, 3, 4, 5];\nconsole.log(nums.sum()); // 15",
      hint: "Mavjud",
      test: "if (logs.includes(15)) return null; return 'Polyfill xato!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Combine: Constructor + Inheritance + Metod (Eng Qiyin)",
      instruction: "Vehicle → Car merosxo'rlikda, getInfo() metodi qo'shing.",
      startingCode: "function Vehicle(type) {\n  this.type = type;\n}\n\nVehicle.prototype.getType = function() {\n  return 'Turi: ' + this.type;\n};\n\nfunction Car(type, model) {\n  // Kodni shu yerda yozing: Vehicle.call() va this.model\n}\n\nCar.prototype = Object.create(Vehicle.prototype);\nCar.prototype.constructor = Car;\n\nCar.prototype.getInfo = function() {\n  return this.getType() + ', Model: ' + this.model;\n};\n\nconst car = new Car('Mashina', 'Tesla');\nconsole.log(car.getInfo()); // 'Turi: Mashina, Model: Tesla'",
      hint: "Vehicle.call(this, type); this.model = model;",
      test: "if (logs.includes('Turi: Mashina') && logs.includes('Model: Tesla')) return null; return 'Combine xato!';"
    }
  ]
};