export const constructorFunctions = {
  id: "constructorFunctions",
  title: "Konstruktor Funksiyalar va new Operatori",
  language: "javascript",
  theory: `## 1. 💡 Part 1: Sodda Tushuntirish (Beginner Analogy)

Bir xil turdagi ko'p obyektlar kerak bo'lsa, har birini qo'lda yozish g'arazlik. Shu yerda **konstruktor funksiyalar** yordamga keladi — ular "obyekt zavodi" kabi ishlaydi.

### Real hayotiy o'xshatish
Tasavvur qiling, **cookie formasi (qolip)** va **pechenye (nusxa)**:
- **Konstruktor funksiya** — formaning o'zi (bir marta yasaladi).
- **new Operatori** — xamirni formaga quyish (har safar yangi pechenye beradi).
- **Instance (nusxa)** — tayyor pechenye. Har biri o'z shaklidagi, ammo barchasi bir formadan chiqqan.

\`\`\`javascript
// Konstruktor funksiya — an'anaviy katta harf bilan (PascalCase)
function Car(brand, year) {
  this.brand = brand; // har bir nusxaga o'z property'si
  this.year = year;
}

// new — yangi obyekt yarataldi va qaytariladi
const car1 = new Car("Tesla", 2023);
const car2 = new Car("Spark", 2020);

console.log(car1.brand); // "Tesla"
console.log(car2.brand); // "Spark"
\`\`\`

### new operatori nimani yashirincha bajaradi?
\`new Car("Tesla", 2023)\` chaqiruvida 4 qadam sodir bo'ladi:
1. Bo'sh obyekt yaratiladi: \`{}\`
2. Ushbu obyekt \`this\` ga bog'lanadi
3. Funksiya tanasi ishlaydi (property'lar o'rnatiladi)
4. Agar funksiya o'zi obyekt qaytarmasa — \`this\` avtomatik qaytariladi

\`\`\`javascript
// new siz chaqirsangiz — oddiy funksiya bo'lib qoladi!
const bad = Car("Tesla", 2023); // this = undefined (strict mode)
console.log(bad); // undefined — obyekt qaytmadi!
\`\`\`

---

## 2. ⚙️ Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

### new.target — "meni new bilan chaqirdingizmi?"
\`new.target\` — funksiya ichida uni \`new\` bilan chaqirilganini aniqlash imkonini beradi. Bu "new siz chaqirilsa ham xatolik bermaslik" himoyasi:

\`\`\`javascript
function User(name) {
  if (!new.target) {
    return new User(name); // new siz chaqirilsa, o'zi new qiladi
  }
  this.name = name;
}

const u1 = new User("Ali");
const u2 = User("Vali"); // ham obyekt qaytaradi!
console.log(u2.name); // "Vali"
\`\`\`

### Metodlarni prototype'ga joylash (xotira tejamkorligi)
Konstruktor ichida metod yozsangiz — **har bir nusxa uchun alohida nusxa** yaratiladi:

\`\`\`javascript
// ❌ Kam samarali: 10 000 nusxa = 10 000 ta sayHello funksiyasi
function User(name) {
  this.name = name;
  this.sayHello = function () {
    return "Salom, " + this.name;
  };
}

// ✅ Samaraali: metod prototype'da — barcha nusxalar uchun bittagina
function User(name) {
  this.name = name;
}
User.prototype.sayHello = function () {
  return "Salom, " + this.name;
};
\`\`\`

10 000 ta \`User\` nusxasi yaratilsa, birinchi usulda 10 000 ta funksiya xotirada turadi. Ikkinchi usulda esa faqat **bittagina** — barchasi bir prototipdan foydalanadi.

### instanceof — nusxa qaysi konstruktordan?
\`instanceof\` — obyektning prototip zanjirida qaysi konstruktorni \`prototype\` i borligini tekshiradi:

\`\`\`javascript
const car = new Car("Tesla", 2023);
console.log(car instanceof Car); // true
console.log(car instanceof Object); // true — zanjir Object'gacha boradi
\`\`\`

### V8 va konstruktorni optimallashtirishi
V8 konstruktor ichida yozilgan property'lar tartibiga qarab "Hidden Class" (Maps) yaratadi. Agar barcha nusxalar bir xil tartibda bir xil property'lar oladigan bo'lsa — obyektlar "monomorf" bo'ladi va V8 ularni tezlashiradi. Property'lar tartibini har xil qilsangiz (shartli ravishda barcha nusxaga har xil property'lar "tashlash") — deoptimizatsiya bo'ladi.

---

## 3. ⚠️ Part 3: Murakkab Holatlar va Senior Intervyu Savollari (Edge Cases)

### 1. Konstruktordan obyekt qaytarish — xatolik yoki g'arazlik?
Agar konstruktor ichida \`return\` bilan obyekt qaytarsangiz — \`this\` **ishlatilmaydi**, obyektning o'zi qaytadi:

\`\`\`javascript
function Weird(name) {
  this.name = name;
  return { hijacked: true }; // obyekt qaytdi — this tashlanadi!
}

const w = new Weird("Ali");
console.log(w.name); // undefined
console.log(w.hijacked); // true
\`\`\`

Agar primitive qaytarsa (raqam, satr) — u **ignore** qilinadi, \`this\` qaytadi.

### 2. Arrow funksiya konstruktordan bo'lmaydi
Arrow funksiya \`this\` ni \`new\` bilan bog'lay olmaydi:

\`\`\`javascript
const Bad = (name) => {
  this.name = name;
};
new Bad("Ali"); // TypeError: Bad is not a constructor
\`\`\`

### 3. Symbol ishlatilgan konstruktorni new'siz chaqirib bo'lmaydi
\`Symbol\`, \`BigInt\` — o'zgaruvchilarni \`new\` bilan yaratish taqiqlangan (primitive'lar):

\`\`\`javascript
new Symbol("a"); // TypeError: Symbol is not a constructor
Symbol("a"); // ✅ to'g'ri
\`\`\`

### 4. Built-in konstruktorlar bilan ishlash
\`\`\`javascript
const d = new Date(2024, 0, 1); // Date obyekt
const re = new RegExp("\\\\d+"); // Regexp
const map = new Map([["a", 1]]); // Map
\`\`\`

> [!WARNING]
> \`new String("a")\`, \`new Number(5)\`, \`new Boolean(true)\` — **object wrapper**lar yaratadi, primitive emas! \`typeof new String("a")\` — \`"object"\`, bu kutilmagan xatoliklarga olib keladi. Doim primitive ko'rinishda ishlating.

---

## 4. 📊 Mermaid Diagrammasi

\`new\` operatorining ichki ishlashi:

\`\`\`mermaid
graph TD
    A[new Car Tesla, 2023] --> B[1. Bo'sh obyekt yaratiladi]
    B --> C[2. __proto__ = Car.prototype]
    C --> D[3. this = yangi obyekt]
    D --> E[4. Funksiya tanasi ishlaydi]
    E --> F{Funksiya obyekt qaytardimi?}
    F -->|Ha| G[Qaytarilgan obyekt ishlatiladi]
    F -->|Yo'q| H[this qaytariladi]
    H --> I[car1 = yangi nusxa tayyor]
    style A fill:#f9f,stroke:#333
    style I fill:#bfb,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi konstruktor",
      instruction: "`Book(title, pages)` konstruktor funksiyasini yozing — u `title` va `pages` property'larini o'rnatadi.",
      startingCode: "// Book konstruktorini yozing\n",
      hint: "function Book(title, pages) { this.title = title; this.pages = pages; }",
      test: "const fn = new Function(code + '; return Book;'); const B = fn(); const b = new B('JS', 300); if (b.title === 'JS' && b.pages === 300) return null; return 'Book konstruktori title va pages o\\'rnatishi kerak';"
    },
    {
      id: 2,
      title: "Nusxalar yaratish",
      instruction: "`Person(name, age)` konstruktoridan 2 ta nusxa yarating: `p1` (Ali, 25) va `p2` (Vali, 30).",
      startingCode: "function Person(name, age) {\n  this.name = name;\n  this.age = age;\n}\n// p1 va p2 ni yarating",
      hint: "const p1 = new Person('Ali', 25); const p2 = new Person('Vali', 30);",
      test: "const fn = new Function(code + '; return [p1, p2];'); const [a, b] = fn(); if (a.name === 'Ali' && a.age === 25 && b.name === 'Vali' && b.age === 30) return null; return 'p1 va p2 to\\'g\\'ri yarating';"
    },
    {
      id: 3,
      title: "Konstruktorga metod",
      instruction: "`Person` konstruktoriga `greet()` metodini qo'shing (constructor ichida) — u `'Salom, [ism]'` qaytarsin.",
      startingCode: "function Person(name) {\n  this.name = name;\n  // greet metodini qo'shing\n}",
      hint: "this.greet = function() { return 'Salom, ' + this.name; };",
      test: "const fn = new Function(code + '; return new Person(\\'Ali\\').greet();'); if (fn() === 'Salom, Ali') return null; return 'greet() metodi Salom, Ali qaytarishi kerak';"
    },
    {
      id: 4,
      title: "new.target himoyasi",
      instruction: "`SafeUser(name)` konstruktorini yozing: agar new bilan chaqirilmasa, o'zi `new` qilib qaytarsin (`new.target` ishlating).",
      startingCode: "function SafeUser(name) {\n  // himoyani yozing\n  this.name = name;\n}",
      hint: "if (!new.target) return new SafeUser(name);",
      test: "const fn = new Function(code + '; return [new SafeUser(\\'A\\').name, SafeUser(\\'B\\').name];'); const r = fn(); if (r && r[0] === 'A' && r[1] === 'B') return null; return 'SafeUser new bilan ham, new siz ham ishlashi kerak';"
    },
    {
      id: 5,
      title: "Prototype'da metod",
      instruction: "`Animal` konstruktoridan keyin, `speak()` metodini `Animal.prototype` ga qo'shing — u `'Shovqin'` qaytarsin.",
      startingCode: "function Animal(name) {\n  this.name = name;\n}\n// speak metodini prototype'ga qo'shing",
      hint: "Animal.prototype.speak = function() { return 'Shovqin'; };",
      test: "const fn = new Function(code + '; return new Animal(\\'Rex\\').speak();'); if (fn() === 'Shovqin') return null; return 'Animal.prototype.speak metodini qo\\'shing';"
    },
    {
      id: 6,
      title: "instanceof tekshiruvi",
      instruction: "`Dog` konstruktori yozing. `isDog(obj)` funksiyasini yozing — u `obj instanceof Dog` ni qaytarsin.",
      startingCode: "function Dog(name) {\n  this.name = name;\n}\nfunction isDog(obj) {\n  // kodni yozing\n}",
      hint: "return obj instanceof Dog;",
      test: "const fn = new Function(code + '; return [isDog(new Dog(\\'x\\')), isDog({})];'); const r = fn(); if (r && r[0] === true && r[1] === false) return null; return 'isDog faqat Dog nusxalari uchun true qaytarsin';"
    },
    {
      id: 7,
      title: "Return obyekt",
      instruction: "`Wrapper(value)` konstruktorini yozing: u `{ val: value }` ko'rinishidagi obyekt qaytarsin (return bilan).",
      startingCode: "function Wrapper(value) {\n  // return bilan obyekt qaytaring\n}",
      hint: "return { val: value };",
      test: "const fn = new Function(code + '; return new Wrapper(42).val;'); if (fn() === 42) return null; return 'Wrapper 42 qiymatli val property\\'li obyekt qaytarsin';"
    },
    {
      id: 8,
      title: "Hisoblagich konstruktor",
      instruction: "`Counter()` konstruktori `count: 0` bilan boshlanadi va `increment()` metodi bor — har chaqiruvda `count` ni 1 ga oshiradi. Metodni prototype'ga qo'ying.",
      startingCode: "function Counter() {\n  this.count = 0;\n}\n// increment metodini prototype'ga qo'shing",
      hint: "Counter.prototype.increment = function() { this.count++; };",
      test: "const fn = new Function(code + '; const c = new Counter(); c.increment(); c.increment(); return c.count;'); if (fn() === 2) return null; return 'Ikki marta increment() chaqirilganda count=2 bo\\'lishi kerak';"
    },
    {
      id: 9,
      title: "Konstruktorlar zanjiri",
      instruction: "`Point(x, y)` va `Point3D(x, y, z)` konstruktorlari yozing. `Point3D` ichida `Point.call(this, x, y)` orqali otasini chaqirsin va `z` ni o'rnatsin.",
      startingCode: "function Point(x, y) {\n  this.x = x;\n  this.y = y;\n}\nfunction Point3D(x, y, z) {\n  // Point.call ishlating va z ni o'rnating\n}",
      hint: "Point.call(this, x, y); this.z = z;",
      test: "const fn = new Function(code + '; const p = new Point3D(1, 2, 3); return [p.x, p.y, p.z];'); const r = fn(); if (r && r[0] === 1 && r[1] === 2 && r[2] === 3) return null; return 'Point3D x, y, z ni to\\'g\\'ri o\\'rnatishi kerak';"
    },
    {
      id: 10,
      title: "Nusxalar sonini hisoblash",
      instruction: "`Item(name)` konstruktori yozing va `Item.created` static property (o'zgarmas, funksiyaning o'ziga biriktirilgan) bilan yaratilgan nusxalar sonini hisoblang.",
      startingCode: "function Item(name) {\n  this.name = name;\n  // created hisoblagichni oshiring\n}",
      hint: "Item.created = Item.created ? Item.created + 1 : 1;",
      test: "const fn = new Function(code + '; new Item(\\'a\\'); new Item(\\'b\\'); return Item.created;'); if (fn() === 2) return null; return 'Item.created ikki nusxa yaratilgach 2 bo\\'lishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`new` operatori chaqirilganda birinchi qanday amal sodir bo'ladi?",
      options: [
        "Funksiya tanasi ishlaydi",
        "Bo'sh obyekt yaratiladi",
        "constructor chaqiriladi",
        "prototype kopyalanadi"
      ],
      correctAnswer: 1,
      explanation: "1-qadam — bo'sh obyekt yaratish; keyin u prototype'ga bog'lanadi va this bo'ladi."
    },
    {
      id: 2,
      question: "Konstruktor funksiyalar odatda qaysi uslubda nomlanadi?",
      options: ["camelCase", "PascalCase", "snake_case", "kebab-case"],
      correctAnswer: 1,
      explanation: "Konstruktor funksiyalar PascalCase bilan yoziladi: `function Car() {}` — bu new bilan chaqirilishini anglatadi."
    },
    {
      id: 3,
      question: "`new` siz chaqirilgan konstruktor strict mode'da `this` qanday bo'ladi?",
      options: ["window", "undefined", "global", "Yangi obyekt"],
      correctAnswer: 1,
      explanation: "Strict mode'da oddiy chaqiruvda `this = undefined` — property o'rnatishda TypeError chiqadi."
    },
    {
      id: 4,
      question: "Konstruktor ichida `return { a: 1 }` yozilsa nima bo'ladi?",
      options: [
        "this qaytariladi",
        "SyntaxError chiqadi",
        "Qaytarilgan obyekt ishlatiladi",
        "undefined qaytariladi"
      ],
      correctAnswer: 2,
      explanation: "Agar konstruktor obyekt qaytarsa — `new` uning o'zini qaytaradi, `this` tashlanadi."
    },
    {
      id: 5,
      question: "`new.target` nima qiladi?",
      options: [
        "Yangi obyekt yaratadi",
        "Funksiya new bilan chaqirilganini aniqlaydi",
        "Klass nomini qaytaradi",
        "Prototipni o'zgartiradi"
      ],
      correctAnswer: 1,
      explanation: "`new.target` — funksiya `new` bilan chaqirilganda konstruktorga, oddiy chaqiruvda `undefined` bo'ladi."
    },
    {
      id: 6,
      question: "Metodni konstruktor ichida yozish va prototype'ga yozish farqi nimada?",
      options: [
        "Farq yo'q, ikkalasi ham bir xil",
        "Prototype'dagi metod barcha nusxalar uchun bittagina",
        "Konstruktordagi metod tezroq ishlaydi",
        "Prototype'da metod ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Konstruktorda yozilgan metod har bir nusxada nusxalanadi; prototype'da esa barcha nusxalar bitta umumiy metodga murojaat qiladi."
    },
    {
      id: 7,
      question: "Arrow funksiyani konstruktor sifatida ishlatish mumkinmi?",
      options: ["Ha, mutlaqo", "Yo'q, TypeError beradi", "Faqat strict mode'da", "Faqat module ichida"],
      correctAnswer: 1,
      explanation: "Arrow funksiya `this` ga ega emas va `prototype` yaralmaydi — `new` bilan chaqirilsa TypeError chiqadi."
    },
    {
      id: 8,
      question: "`instanceof` qanday tekshiradi?",
      options: [
        "typeof natijasini solishtiradi",
        "Prototip zanjirida konstruktorni izlaydi",
        "constructor.name ni solishtiradi",
        "Obyekt kalitlarini solishtiradi"
      ],
      correctAnswer: 1,
      explanation: "`instanceof` obyektning prototip zanjirida konstruktornin `prototype` obyekti bormi yoki yo'qmi tekshiradi."
    },
    {
      id: 9,
      question: "`new String('hello')` nimani qaytaradi?",
      options: ["primitive satr", "object (wrapper)", "array", "function"],
      correctAnswer: 1,
      explanation: "`new String` object wrapper qaytaradi — `typeof` natijasi 'object'. Oddiy qavssiz yozish kerak: `typeof 'hello' === 'string'`."
    },
    {
      id: 10,
      question: "Konstruktorni strict mode'da `new` siz chaqirsangiz nima bo'ladi?",
      options: [
        "this = undefined va TypeError",
        "window'ga property qo'shiladi",
        "Doim yangi obyekt qaytadi",
        "Hech narsa sodir bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "Strict mode'da `this` undefined — `this.name = x` kabi yozuvlar TypeError beradi."
    },
    {
      id: 11,
      question: "Konstruktor ichida `this` nimaning muqobilini bildiradi?",
      options: [
        "Global obyektni",
        "Hozir yaratilayotgan yangi obyektni",
        "Prototipni",
        "Konstruktornin o'zini"
      ],
      correctAnswer: 1,
      explanation: "`new` bilan chaqirilganda `this` — yangi yaratilgan obyekt, uning ustida property'lar o'rnatiladi."
    },
    {
      id: 12,
      question: "`Point.call(this, x, y)` nima qiladi (konstruktorlar kombinatsiyasida)?",
      options: [
        "Yangi obyekt yaratadi",
        "Point funksiyasini this kontekstida ishlatadi",
        "Point prototipini ko'chiradi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "`call` bilan boshqa konstruktor `this` ustida ishlaydi — bu ES5'dagi 'constructor stealing' (constructor borrowing) usuli."
    }
  ]
};
