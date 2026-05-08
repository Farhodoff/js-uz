export const prototypesLesson = {
  id: "a18",
  title: "Prototypes va OOP: JavaScript'ning Ob'ekt-Yo'naltirilgan Dasturlash",
  level: "Murakkab",
  description: "Prototype chain, Inheritance, ES6 Classes, va JavaScript OOP mexanizmi.",
  theory: `## 1. NEGA kerak?

**Savollar:**
- Nima uchun har bir massivda .map(), .filter() metodi bor?
- Nima uchun har bir string .toUpperCase() metodi bor?
- Kodni qayta ishlatish uchun qanday pattern?

**Javob:** **Prototype** — JavaScript'ning OOP mexanizmi. Ob'ektlar o'zaro metodlar va xususiyatlarni "meros" orqali bo'lishadi.

## 2. SODDALIK (Analogiya)

**Oila vorislik:**
- **Bobasi** = Prototype (eng asosiy taqdim)
- **Otasi** = Prototype (o'rta qavat)
- **Men** = Object (konkret misol)

Menga pul kerak bo'lsa:
1. Avval o'zimda qidiram
2. Yo'q bo'lsa, otamdan so'rayman
3. Otada yo'q bo'lsa, bobamdan so'rayman
4. Hamma yo'q bo'lsa, "topilmadi" deyamiz

## 3. STRUKTURA

### A. Har Bir Ob'ektning Prototype Zanjiri (Chain) Bor

\`\`\`javascript
// Har bir ob'ekt tashqarida __proto__ bor (yashirin, internal)
const obj = {};
console.log(obj.__proto__); // Object.prototype

// Zanjir:
obj → Object.prototype → null

// Xususiyat qidirilish:
// 1. O'z obj'da bormi?
// 2. Object.prototype'da bormi?
// 3. Topilmadi → undefined
\`\`\`

### B. Built-in Types'ning Prototypes

\`\`\`javascript
// STRING
const str = "hello";
console.log(str.__proto__); // String.prototype
console.log(str.toUpperCase()); // String.prototype da
// Zanjir: str → String.prototype → Object.prototype → null

// ARRAY
const arr = [1, 2, 3];
console.log(arr.__proto__); // Array.prototype
console.log(arr.map(n => n * 2)); // Array.prototype da
// Zanjir: arr → Array.prototype → Object.prototype → null

// FUNCTION
function hello() {}
console.log(hello.__proto__); // Function.prototype
console.log(hello.call(null)); // Function.prototype da
// Zanjir: hello → Function.prototype → Object.prototype → null
\`\`\`

### C. Constructor Funksiyalar va New

\`\`\`javascript
// Constructor - odatiy funksiya, lekin 'new' bilan chaqirilgan

function Person(name, age) {
  this.name = name;  // Instance xususiyati
  this.age = age;
}

// new operator'i 4 ta qiladi:
// 1. Yangi empty object yaratadi: {}
// 2. Object'ning __proto__'sini Person.prototype'ga bog'laydi
// 3. this'ni yangi object'ga o'rnatadi
// 4. Constructor'ni chaqiradi

const person1 = new Person("Ali", 30);
const person2 = new Person("Sara", 25);

console.log(person1);     // { name: "Ali", age: 30 }
console.log(person1.__proto__ === Person.prototype); // true
console.log(person1 === person2); // false (turli objektlar)
\`\`\`

### D. Prototype'ga Metod Qo'shish

\`\`\`javascript
function Car(model) {
  this.model = model;
}

// Prototype'ga metod qo'shish
Car.prototype.drive = function() {
  console.log(this.model + " haydaydi");
};

Car.prototype.stop = function() {
  console.log(this.model + " to'xtadi");
};

const tesla = new Car("Tesla");
const bmw = new Car("BMW");

tesla.drive(); // "Tesla haydaydi"
bmw.drive();   // "BMW haydaydi"

console.log(tesla.drive === bmw.drive); // true (bir xil metod!)
\`\`\`

**Muhim:** Metodlarni Prototype'ga qo'shish memory uchun samarali! Aks holda har instance'da nusxasi bo'ladi.

### E. Prototype Chain bilan Inheritance

\`\`\`javascript
// STEP 1: Ota (Parent) Constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(this.name + " yeyapti");
};

// STEP 2: Farzand (Child) Constructor
function Dog(name, breed) {
  Animal.call(this, name);  // Ota konstruktorini chaqir
  this.breed = breed;
}

// STEP 3: Farzand.prototype'i Ota.prototype'dan meros oladi
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // Constructor'ni o'z o'rniga qo'y

// STEP 4: Farzandga o'z metodlarini qo'sh
Dog.prototype.bark = function() {
  console.log(this.name + " vav deya yuqorlaydi");
};

const dog = new Dog("Bobur", "Ovcharka");
dog.eat();  // "Bobur yeyapti" (meros olgan)
dog.bark(); // "Bobur vav deya yuqorlaydi" (o'z metodi)

// Zanjir: dog → Dog.prototype → Animal.prototype → Object.prototype → null
\`\`\`

### F. Object.create() - Prototipi Aniq Belgilash

\`\`\`javascript
const parent = {
  greet() { return "Salom!"; }
};

// Yangi objekt, prototipi = parent
const child = Object.create(parent);
console.log(child.greet()); // "Salom!"

// child'ning o'z xususiyatlarini qo'sh
child.name = "Ali";
console.log(child.name); // "Ali"
\`\`\`

### G. \`__proto__\` va \`prototype\` Farqi

Eng muhim farq:

\`\`\`javascript
function Robot(name) {
  this.name = name;
}

Robot.prototype.sayHi = function() {
  return "Salom, men " + this.name;
};

const robot = new Robot("R2D2");

// __proto__ - Ob'ekt'ning internal ishora (yashirin)
console.log(robot.__proto__); // Robot.prototype
console.log(robot.__proto__ === Robot.prototype); // true

// prototype - Constructor funksiyaning public xususiyati
console.log(Robot.prototype); // { constructor, sayHi }
console.log(typeof Robot.prototype); // "object"

// TAQLID:
// robot.__proto__ → Robot.prototype
// Robot.prototype.constructor → Robot
\`\`\`

### H. Xususiyatlarni Tekshirish

\`\`\`javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.type = "Animal";

const dog = new Animal("Bobur");

// 1. hasOwnProperty() - faqat o'z xususiyat
console.log(dog.hasOwnProperty("name")); // true (o'z)
console.log(dog.hasOwnProperty("type")); // false (prototype'dan)

// 2. in operator - ham o'z, ham prototype
console.log("name" in dog); // true
console.log("type" in dog); // true
console.log("nonexistent" in dog); // false

// 3. instanceof - prototype zanjir'da bormi?
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
console.log(dog instanceof Array); // false
\`\`\`

### I. for...in va for...of Farqi

\`\`\`javascript
function Car(model) {
  this.model = model;
}

Car.prototype.speed = 200;

const car = new Car("Tesla");

// for...in - prototip zanjirni ham bo'yib
console.log("for...in:");
for (let key in car) {
  console.log(key); // "model", keyin "speed" (prototype'dan)
}

// for...of - faqat iterator qiymatlari
const arr = [1, 2, 3];
console.log("for...of:");
for (let val of arr) {
  console.log(val); // 1, 2, 3
}
\`\`\`

### J. ES6 Classes - Prototype'ning Syntactic Sugar

ES6 klasslar asli Prototype-based! Shunchaki o'qish oson sintaksis:

\`\`\`javascript
// OLD - Constructor funksiyasi
function PersonOld(name, age) {
  this.name = name;
  this.age = age;
}

PersonOld.prototype.greet = function() {
  return "Salom, men " + this.name;
};

// NEW - ES6 Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Salom, men " + this.name;
  }

  static info() {
    return "Bu Person class'i";
  }
}

// Faqat sintaksis farqi! Asli bir xil:
console.log(typeof Person); // "function" (constructor funksiyasi)
console.log(Person.prototype.greet); // Method mavjud

const person = new Person("Ali", 30);
console.log(person.greet()); // "Salom, men Ali"
\`\`\`

### K. ES6 Class Inheritance

\`\`\`javascript
// Ota Class
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(this.name + " yeyapti");
  }
}

// Farzand Class
class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Ota constructor'ni chaqir
    this.breed = breed;
  }

  bark() {
    console.log(this.name + " vav deya yuqorlaydi");
  }
}

const dog = new Dog("Bobur", "Ovcharka");
dog.eat();  // "Bobur yeyapti" (meros olgan)
dog.bark(); // "Bobur vav deya yuqorlaydi"

// Asli bu prototype inheritance'ga o'giriladi!
\`\`\`

### L. Mixins va Composition

\`\`\`javascript
// Mixin - metodlar to'plami
const canEat = {
  eat() { console.log(this.name + " yeyapti"); }
};

const canWalk = {
  walk() { console.log(this.name + " yugurapti"); }
};

// Object'ni turli mixin'lar bilan "aralash"
function Animal(name) {
  this.name = name;
}

// Methodlarni qo'sh (ES6+)
Object.assign(Animal.prototype, canEat, canWalk);

const animal = new Animal("Bobur");
animal.eat();  // "Bobur yeyapti"
animal.walk(); // "Bobur yugurapti"
\`\`\`

### M. Polyfill Pattern

\`\`\`javascript
// Built-in metodga o'zingizning implementatsiyasini qo'shish

// Array'ga .sum() metodi
if (!Array.prototype.sum) {
  Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0);
  };
}

const nums = [1, 2, 3, 4, 5];
console.log(nums.sum()); // 15

// String'ga .reverse() metodi
if (!String.prototype.reverse) {
  String.prototype.reverse = function() {
    return this.split("").reverse().join("");
  };
}

console.log("hello".reverse()); // "olleh"
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Object.prototype'ga xatar metod qo'shish:**
   \`\`\`javascript
   // XATO: Hamma objektlar satralmaydi
   Object.prototype.sayHi = function() { return "Hi!"; };
   ({}).sayHi(); // "Hi!" - noma'qul!

   // TO'G'RI: Faqat kerak bo'lgan joyga
   function MyClass() {}
   MyClass.prototype.sayHi = function() { return "Hi!"; };
   \`\`\`

2. **Prototype qo'yishda Constructor'ni unutish:**
   \`\`\`javascript
   // XATO:
   Dog.prototype = Object.create(Animal.prototype);
   // Dog.prototype.constructor ni o'z o'rniga qo'yish kerak!

   // TO'G'RI:
   Dog.prototype = Object.create(Animal.prototype);
   Dog.prototype.constructor = Dog;
   \`\`\`

3. **for...in'da Prototype'dagi metodlar ham bo'yiladi:**
   \`\`\`javascript
   // XATO:
   for (let key in obj) {
     console.log(key); // Prototype'dagi xususiyatlarni ham chiqaradi
   }

   // TO'G'RI:
   for (let key in obj) {
     if (obj.hasOwnProperty(key)) {
       console.log(key); // Faqat o'z xususiyatlari
     }
   }
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Prototype nima?</summary>
Har bir JavaScript ob'ekti boshqa bir ob'ektga ishora qiladi (uning "taqdim"). Bu orqali metodlar va xususiyatlar bo'lishiladi.
</details>

<details>
<summary>2. __proto__ va prototype farqi?</summary>
__proto__ — ob'ektning prototipiga internal ishora. prototype — constructor funksiyaning public xususiyati.
</details>

<details>
<summary>3. Prototype chain nima?</summary>
Xususiyat qidirayotganda, avval o'z ob'ektda, keyin prototipda, keyin prototipning prototipida... null ga yetguncha qidiriladi.
</details>

<details>
<summary>4. new kalit so'zi nima qiladi?</summary>
1. Yangi object yaratadi, 2. __proto__'sini constructor.prototype'ga bog'laydi, 3. this'ni yangi object'ga o'rnatadi, 4. Constructor'ni chaqiradi.
</details>

<details>
<summary>5. Object.create() nima?</summary>
Yangi ob'ektni yaratadi va prototipini aniq belgilash imkonini beradi.
</details>

<details>
<summary>6. Constructor funksiyasi nima?</summary>
"new" kalit so'zi bilan chaqirilgan odatiy funksiya. Yangi ob'ektlar yaratishda ishlatiladi.
</details>

<details>
<summary>7. Object.prototype'ga metod qo'shish xavfli?</summary>
Ha! Hamma ob'ektlar satralmaydi. Faqat zarur bo'lsa va nom taqqoshlangan.
</details>

<details>
<summary>8. Prototype Inheritance qanday amalga oshadi?</summary>
Ota konstruktorini chaqirish (call) va Object.create() yordamida prototip bog'lash.
</details>

<details>
<summary>9. instanceof operatori nima?</summary>
Ob'ektning prototip zanjirida constructor.prototype bor-yo'qmi tekshiradi.
</details>

<details>
<summary>10. hasOwnProperty() metodi nima?</summary>
Xususiyat ob'ekt'da bo'lsa (prototype'da emas), true qaytaradi.
</details>

<details>
<summary>11. ES6 Classes asli nima?</summary>
Prototype-based va constructor funksiyalari. Faqat syntactic sugar (o'qish oson qilib yozish).
</details>

<details>
<summary>12. Mixin va Composition nima?</summary>
Bir ob'ektning turli mixin'larni (metod guruhlari) "aralashtirib" imkoniyatlarni yig'ish.
</details>`,
  exercises: [
    {
      id: 1,
      title: "Oddiy Prototype Metod",
      instruction: "Person konstruktor yarating, Prototype'ga greet metodi qo'shing.",
      startingCode: "function Person(name) {\n  this.name = name;\n}\n\n// Kodni shu yerda yozing\nPerson.prototype.greet = /* ... */;\n\nconst p = new Person('Ali');\nconsole.log(p.greet()); // 'Salom, Ali'\n",
      hint: "function() { return 'Salom, ' + this.name; }",
      test: "if (logs.includes('Salom, Ali')) return null; return 'Prototype metod noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Constructor va New Operator",
      instruction: "Dog(name) konstruktor yarating, 2 ta turli dog instance yaratib, ularni farqini ko'rsating.",
      startingCode: "function Dog(name) {\n  // Kodni shu yerda yozing\n}\n\nconst dog1 = new Dog('Bobur');\nconst dog2 = new Dog('Sergo');\nconsole.log(dog1.name, dog2.name);\nconsole.log(dog1 === dog2); // false\n",
      hint: "this.name = name;",
      test: "if (logs.includes('Bobur') && logs.includes('Sergo') && logs.includes('false')) return null; return 'New operator noto\\'g\\'ri';"
    },
    {
      id: 3,
      title: "Prototype Chain Inheritance",
      instruction: "Vehicle → Car merosxo'rlik qiling.",
      startingCode: "function Vehicle(color) {\n  this.color = color;\n}\n\nVehicle.prototype.drive = function() {\n  return 'Haydaydi';\n};\n\nfunction Car(model, color) {\n  Vehicle.call(this, color);\n  this.model = model;\n}\n\n// Kodni shu yerda yozing\nCar.prototype = Object.create(Vehicle.prototype);\nCar.prototype.constructor = Car;\n\nconst car = new Car('Tesla', 'qora');\nconsole.log(car.drive()); // 'Haydaydi'\nconsole.log(car.model); // 'Tesla'\n",
      hint: "Object.create(Vehicle.prototype) va constructor o'z o'rniga qo'yish",
      test: "if (logs.includes('Haydaydi') && logs.includes('Tesla')) return null; return 'Inheritance noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Object.create()",
      instruction: "Object.create() orqali parent'dan child yarating.",
      startingCode: "const parent = {\n  greet: function() {\n    return 'Salom!';\n  }\n};\n\n// Kodni shu yerda yozing\nconst child = Object.create(parent);\nconsole.log(child.greet()); // 'Salom!'\nconsole.log(child.hasOwnProperty('greet')); // false\n",
      hint: "Object.create(parent)",
      test: "if (logs.includes('Salom!')) return null; return 'Object.create noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "This Binding Constructor'da",
      instruction: "Constructor ichida 'this' to'g'ri bo'lishini ko'rsating.",
      startingCode: "function Robot(name) {\n  // Kodni shu yerda yozing\n}\n\nRobot.prototype.identify = function() {\n  console.log('Men: ' + this.name);\n};\n\nconst r1 = new Robot('R2D2');\nconst r2 = new Robot('C3PO');\nr1.identify(); // 'Men: R2D2'\nr2.identify(); // 'Men: C3PO'\n",
      hint: "this.name = name;",
      test: "if (logs.includes('Men: R2D2') && logs.includes('Men: C3PO')) return null; return 'This noto\\'g\\'ri';"
    },
    {
      id: 6,
      title: "hasOwnProperty vs Prototype",
      instruction: "O'z property bilan prototype'dagi farqini ko'rsating.",
      startingCode: "function Animal(name) {\n  this.name = name;\n}\n\nAnimal.prototype.type = 'Animal';\n\nconst animal = new Animal('Dog');\nconsole.log(animal.hasOwnProperty('name')); // true\nconsole.log(animal.hasOwnProperty('type')); // false\nconsole.log('type' in animal); // true\n",
      hint: "hasOwnProperty - faqat o'z, in operator - ham o'z, ham prototype",
      test: "if (logs.includes('true') && logs.includes('false')) return null; return 'hasOwnProperty noto\\'g\\'ri';"
    },
    {
      id: 7,
      title: "Instanceof Operator",
      instruction: "instanceof orqali tip tekshiring.",
      startingCode: "function Shape(name) {\n  this.name = name;\n}\n\nconst shape = new Shape('Circle');\nconsole.log(shape instanceof Shape); // true\nconsole.log(shape instanceof Object); // true\nconsole.log(shape instanceof Array); // false\n",
      hint: "instanceof - prototype zanjirda bormi tekshiradi",
      test: "if (logs.includes('true') && logs.includes('false')) return null; return 'instanceof noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Array.prototype Extension",
      instruction: "Array'ga .last() metodi qo'shing.",
      startingCode: "// Kodni shu yerda yozing\nArray.prototype.last = function() {\n  return this[this.length - 1];\n};\n\nconst arr = [1, 2, 3, 4, 5];\nconsole.log(arr.last()); // 5\n",
      hint: "return this[this.length - 1];",
      test: "if (logs.includes(5)) return null; return 'Array extension noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Multi-level Inheritance",
      instruction: "Animal → Mammal → Dog 3-qavat merosxo'rlik.",
      startingCode: "function Animal(name) {\n  this.name = name;\n}\n\nAnimal.prototype.move = function() {\n  return 'Harakat qilmoqda';\n};\n\nfunction Mammal(name, warmBlooded) {\n  Animal.call(this, name);\n  this.warmBlooded = warmBlooded;\n}\n\nMammal.prototype = Object.create(Animal.prototype);\nMammal.prototype.constructor = Mammal;\n\nfunction Dog(name, breed) {\n  Mammal.call(this, name, true);\n  this.breed = breed;\n}\n\nDog.prototype = Object.create(Mammal.prototype);\nDog.prototype.constructor = Dog;\n\nconst dog = new Dog('Bobur', 'Ovcharka');\nconsole.log(dog.move()); // 'Harakat qilmoqda'\nconsole.log(dog instanceof Dog); // true\nconsole.log(dog instanceof Animal); // true\n",
      hint: "Har qavat uchun Object.create va constructor",
      test: "if (logs.includes('Harakat qilmoqda')) return null; return 'Multi-level noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Prototype Delegation",
      instruction: "Bir necha ob'ektni bir prototype bilan ishlating.",
      startingCode: "const actions = {\n  jump: function() {\n    return this.name + ' sakraydi';\n  },\n  run: function() {\n    return this.name + ' yuguradi';\n  }\n};\n\nconst p1 = Object.create(actions);\np1.name = 'Ali';\n\nconst p2 = /* ... */;\np2.name = 'Zara';\n\nconsole.log(p1.jump()); // 'Ali sakraydi'\nconsole.log(p2.run()); // 'Zara yuguradi'\n",
      hint: "const p2 = Object.create(actions);",
      test: "if (logs.includes('Ali sakraydi') && logs.includes('Zara yuguradi')) return null; return 'Delegation noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Polyfill Pattern",
      instruction: "Array'ga .sum() metodi qo'shing, agar bo'lmasa.",
      startingCode: "// Kodni shu yerda yozing\nif (!Array.prototype.sum) {\n  Array.prototype.sum = function() {\n    return this.reduce((a, b) => a + b, 0);\n  };\n}\n\nconst nums = [1, 2, 3, 4, 5];\nconsole.log(nums.sum()); // 15\n",
      hint: "this.reduce((a, b) => a + b, 0)",
      test: "if (logs.includes(15)) return null; return 'Polyfill noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Constructor + Inheritance + Method",
      instruction: "Vehicle → Car merosxo'rlikda, getInfo() metodi qo'shing.",
      startingCode: "function Vehicle(type) {\n  this.type = type;\n}\n\nVehicle.prototype.getType = function() {\n  return 'Turi: ' + this.type;\n};\n\nfunction Car(type, model) {\n  // Kodni shu yerda yozing: Vehicle.call() va this.model\n}\n\nCar.prototype = Object.create(Vehicle.prototype);\nCar.prototype.constructor = Car;\n\nCar.prototype.getInfo = function() {\n  return this.getType() + ', Model: ' + this.model;\n};\n\nconst car = new Car('Mashina', 'Tesla');\nconsole.log(car.getInfo()); // 'Turi: Mashina, Model: Tesla'\n",
      hint: "Vehicle.call(this, type); this.model = model;",
      test: "if (logs.includes('Turi: Mashina') && logs.includes('Model: Tesla')) return null; return 'Kompleks noto\\'g\\'ri';"
    }
  ]
};
