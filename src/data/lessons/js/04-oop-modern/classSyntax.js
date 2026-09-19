export const classSyntax = {
  id: "classSyntax",
  title: "ES6 Klasslar: class, constructor va static",
  language: "javascript",
  theory: `## 1. 💡 Part 1: Sodda Tushuntirish (Beginner Analogy)

ES6 (2015) bilan JavaScript'ga \`class\` sintaksisi kirdi. U **yangi mexanizm emas** — eski prototip tizimining zamonaviy, o'qishli "po'stlog'i" (syntactic sugar).

### Real hayotiy o'xshatish
Klass — bu **binolarning me'moriy chizmasi (blueprint)**:
- **class** — chizma (bir marta chiziladi)
- **new** — chizma asosida bino qurish (nusxa/instance yaratish)
- **constructor** — binoning poydevori (nusxa yaratilishida avtomatik ishlaydi)
- **metodlar** — binodagi xonalar (barcha binolarda bir xil joylashgan)

\`\`\`javascript
class Car {
  constructor(brand, year) {
    this.brand = brand;   // har bir nusxaning o'z property'si
    this.year = year;
  }

  // Oddiy metod — prototype'ga tushadi
  info() {
    return \`\\\${this.brand} (\\\${this.year})\`;
  }

  // Statik metod — klassning o'ziga tegishli, nusxalarda bo'lmaydi
  static compare(carA, carB) {
    return carA.year - carB.year;
  }
}

const car1 = new Car("Tesla", 2023);
const car2 = new Car("Spark", 2020);

console.log(car1.info());          // "Tesla (2023)"
console.log(Car.compare(car1, car2)); // 3
console.log(car1.compare);         // undefined — nusxada statik yo'q!
\`\`\`

### Klass tarkibi (anatomiyasi)
1. **constructor()** — \`new\` chaqirilganda avtomatik ishlaydi. Bir klassda bittagina bo'ladi.
2. **Oddiy metodlar** — \`Car.prototype\` ga tushadi, barcha nusxalar umumiy foydalanadi.
3. **static metodlar/property'lar** — \`Car.compare\` kabi, to'g'ridan-to'g'ri klassga biriktiriladi.
4. **Static bloklar (ES2022)** — klass ishlovchi vaqtida bir marta ishlaydigan \`static { ... }\` blok.

---

## 2. ⚙️ Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

### Klass = konstruktorni funksiya ekanligini ko'rsatish
Klass aslida **maxsus funksiya** (function). \`typeof Car\` — \`"function"\`. Uning ichki ko'rinishi:

\`\`\`javascript
class Car {
  constructor(brand) { this.brand = brand; }
  drive() { return "yurmoqda"; }
}

// Taxminiy ichki ko'rinish:
function Car(brand) {
  // new bilan chaqirilmagan bo'lsa — TypeError!
  this.brand = brand;
}
Car.prototype.drive = function () {
  return "yurmoqda";
};
\`\`\`

**Muhim farq:** oddiy funksiyani \`new\` siz chaqirsangiz — ishlaydi; klassni \`new\` siz chaqirsangiz — \`TypeError: Class constructor Car cannot be invoked without 'new'\`.

### Xotira jihatidan nima sodir bo'ladi?
- \`this.brand = ...\` — **har bir nusxaning** o'z xotirasida.
- \`drive()\` — \`Car.prototype\` da **bittagina**. 1 mln nusxa = 1 mln murojaat, 1 ta metod.
- \`static\` metod — \`Car\` funksiya obyektining o'zida, prototipda yo'q.

Bu ikki darajali saqlash tuzilmasi (instance-level va prototype-level) xotirani sezilarli tejaydi. V8 dvigateli klasslardan yaratilgan obyektlarning "shaklini" (Hidden Class/Map) keshlaydi — shu sababli barcha nusxalarga bir xil tartibda property'lar berish performance uchun muhim.

### Hoisting va TDZ
Klasslar \`let\`/\`const\` kabi **Temporal Dead Zone** ga ega — e'lon qilinishidan oldin ishlatish \`ReferenceError\` beradi:

\`\`\`javascript
const a = new Shape(); // ReferenceError!
class Shape {}
\`\`\`

### Klasslar funksiya ichida e'lon qilinishi va class expressions
\`\`\`javascript
// Class expression (nomli)
const Shape = class NamedShape {
  // NamedShape faqat ichkarida mavjud
};

// Funksiya orqali dinamik klass yaratish
function makeClass(name) {
  return class {
    hi() { return name; }
  };
}
const Cat = makeClass("Cat");
\`\`\`

---

## 3. ⚠️ Part 3: Murakkab Holatlar va Senior Intervyu Savollari (Edge Cases)

### 1. Klasslar strict mode'da
Klass tanasi **avtomatik ravishda strict mode** da ishlaydi. \`this = window\` muammosi yo'q — \`this\` yo'qolgan joylarda \`undefined\`.

### 2. Static metodlar ichida \`this\`
Statik metodda \`this\` — nusxa emas, **klassning o'zi**:

\`\`\`javascript
class User {
  static create() {
    return new this("anonim"); // this = User klassi
  }
  constructor(name) { this.name = name; }
}
const u = User.create(); // yangi User
console.log(u.name); // "anonim"
\`\`\`

Bu odat \`new.target\` bilan meros olinganda ham ishlaydi: subclass'da \`this\` — subclass bo'ladi. Bu **static factory pattern** asosi.

### 3. Static property'lar (ES2022)
\`\`\`javascript
class Config {
  static VERSION = "2.0";
  static #SECRET = "xyz"; // static private!
}
console.log(Config.VERSION); // "2.0"
\`\`\`

### 4. \`typeof\` va klasslar
\`typeof Car\` — \`"function"\`. Klassni \`instanceof\` bilan tekshirish mumkin, \`typeof\` bilan \`"class"\` degan natija yo'q.

### 5. Klass metodlarida \`enumerable: false\`
\`Object.keys(new Car())\` — faqat \`constructor\` ichida o'rnatilgan property'larni qaytaradi. **Klass metodlari enumerable emas** (for...in'da ko'rinmaydi). Bu oddiy prototype'ga qo'lda qo'shilgan metodlardan farqi.

### 6. Getter/Setter klass ichida
\`\`\`javascript
class Circle {
  constructor(r) { this.r = r; }
  get area() { return Math.PI * this.r ** 2; }
  set diameter(d) { this.r = d / 2; }
}
\`\`\`

---

## 4. 📊 Mermaid Diagrammasi

Klass va nusxalar orasidagi aloqa:

\`\`\`mermaid
graph TD
    A["class Car"] -->|new| B["car1 nusxa"]
    A -->|new| C["car2 nusxa"]
    A -->|"static compare()"| D["Car.compare — klassning o'zida"]
    B -->|"__proto__"| E["Car.prototype"]
    C -->|"__proto__"| E
    E -->|"drive(), info()"| F["Metodlar bittagina"]
    E -->|"__proto__"| G["Object.prototype"]
    style A fill:#f9f,stroke:#333
    style E fill:#bbf,stroke:#333
    style G fill:#bfb,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi klass",
      instruction: "`Person` klassini yozing: `constructor(name, age)` ni qabul qiladi va property'larni o'rnatadi.",
      startingCode: "// Person klassini yozing\n",
      hint: "class Person { constructor(name, age) { this.name = name; this.age = age; } }",
      test: "const fn = new Function(code + '; return Person;'); const P = fn(); const p = new P('Ali', 25); if (p.name === 'Ali' && p.age === 25) return null; return 'Person klassi name va age o\\'rnatishi kerak';"
    },
    {
      id: 2,
      title: "Klass metodlari",
      instruction: "`Rectangle` klassini yozing: `constructor(w, h)` va `area()` metodi — `w * h` qaytaradi.",
      startingCode: "// Rectangle klassini yozing\n",
      hint: "class Rectangle { constructor(w, h) { this.w = w; this.h = h; } area() { return this.w * this.h; } }",
      test: "const fn = new Function(code + '; return new Rectangle(4, 5).area();'); if (fn() === 20) return null; return 'area() metodi 20 qaytarishi kerak';"
    },
    {
      id: 3,
      title: "Statik metod",
      instruction: "`MathHelper` klassiga `sum(a, b)` statik metodini qo'shing — `a + b` qaytaradi. U nusxada emas, klassda chaqiriladi!",
      startingCode: "class MathHelper {\n  // sum statik metodini yozing\n}",
      hint: "static sum(a, b) { return a + b; }",
      test: "const fn = new Function(code + '; return MathHelper.sum(3, 4);'); if (fn() === 7) return null; return 'MathHelper.sum(3,4) 7 qaytarishi kerak';"
    },
    {
      id: 4,
      title: "Static property",
      instruction: "`App` klassiga `static VERSION = '1.0'` property'sini qo'shing va `getVersion()` statik metodi orqali qaytaring.",
      startingCode: "class App {\n  // VERSION property va getVersion statik metodi\n}",
      hint: "static VERSION = '1.0'; static getVersion() { return App.VERSION; }",
      test: "const fn = new Function(code + '; return App.getVersion();'); if (fn() === '1.0') return null; return 'App.getVersion() \"1.0\" qaytarishi kerak';"
    },
    {
      id: 5,
      title: "Statik zavod (factory)",
      instruction: "`User` klassiga `static create(name)` metodini yozing — u `new this(name)` orqali yangi nusxa qaytarsin.",
      startingCode: "class User {\n  constructor(name) { this.name = name; }\n  // create statik metodini yozing\n}",
      hint: "static create(name) { return new this(name); }",
      test: "const fn = new Function(code + '; return User.create(\\'Ali\\').name;'); if (fn() === 'Ali') return null; return 'User.create() yangi User qaytarishi kerak';"
    },
    {
      id: 6,
      title: "Getter bilan yuza",
      instruction: "`Circle` klassi `radius` qabul qiladi. `area` getteri yozing — `Math.PI * radius ** 2` qaytarsin.",
      startingCode: "class Circle {\n  constructor(radius) { this.radius = radius; }\n  // area getterini yozing\n}",
      hint: "get area() { return Math.PI * this.radius ** 2; }",
      test: "const fn = new Function(code + '; return Math.round(new Circle(10).area);'); if (fn() === 314) return null; return 'circle.area getter 314 ga yaqin qiymat qaytarsin';"
    },
    {
      id: 7,
      title: "Setter bilan validatsiya",
      instruction: "`Temperature` klassiga `celsius` setteri yozing: -273 dan kichik qiymat o'tirmasin (ignore qilsin). Getter ham bo'lsin.",
      startingCode: "class Temperature {\n  constructor(c) { this._c = c; }\n  // celsius get/set yozing\n}",
      hint: "get celsius() { return this._c; } set celsius(v) { if (v >= -273) this._c = v; }",
      test: "const fn = new Function(code + '; const t = new Temperature(20); t.celsius = -300; const a = t.celsius; t.celsius = 25; return [a, t.celsius];'); const r = fn(); if (r && r[0] === 20 && r[1] === 25) return null; return 'Noto\\'g\\'ri qiymat ignore qilinishi kerak';"
    },
    {
      id: 8,
      title: "Metod chaqiruv zanjiri",
      instruction: "`StringBuilder` klassi: `add(str)` metodida `this.str += str` va `this` qaytaradi. `get()` — natijani qaytaradi.",
      startingCode: "class StringBuilder {\n  constructor() { this.str = ''; }\n  // add va get metodlarini yozing\n}",
      hint: "add(s) { this.str += s; return this; } get() { return this.str; }",
      test: "const fn = new Function(code + '; return new StringBuilder().add(\\'a\\').add(\\'b\\').get();'); if (fn() === 'ab') return null; return 'Chaining ishlashi kerak: add(a).add(b).get() === ab';"
    },
    {
      id: 9,
      title: "Statik metod ichida statik chaqiruv",
      instruction: "`Logger` klassi: `static log(msg)` — `'[LOG] ' + msg` qaytarsin, `static error(msg)` — `Logger.log` ishlatib `'[ERROR] ' + msg` qaytarsin.",
      startingCode: "class Logger {\n  // log va error statik metodlarini yozing\n}",
      hint: "static log(m) { return '[LOG] ' + m; } static error(m) { return '[ERROR] ' + Logger.log(m); }",
      test: "const fn = new Function(code + '; return Logger.error(\\'x\\');'); if (fn() === '[ERROR] [LOG] x') return null; return 'error() metod log() ni chaqirib [ERROR] prefiks qo\\'shishi kerak';"
    },
    {
      id: 10,
      title: "TDZ tekshiruvi",
      instruction: "`Shape` klassi e'lon qilingan. `createShape()` funksiyasi yozing — u `new Shape()` qaytarsin. Eslatma: klass e'lonidan keyin chaqiriladi.",
      startingCode: "function createShape() {\n  // new Shape() qaytaring\n}\nclass Shape {\n  constructor() { this.type = 'shape'; }\n}",
      hint: "return new Shape();",
      test: "const fn = new Function(code + '; return createShape().type;'); if (fn() === 'shape') return null; return 'createShape() Shape nusxasini qaytarishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Klass ichidagi oddiy metodlar qayerda saqlanadi?",
      options: ["Har bir nusxada", "Klassning prototype'ida", "Global scope'da", "constructor ichida"],
      correctAnswer: 1,
      explanation: "Klass metodlari `Klass.prototype` ga tushadi — barcha nusxalar umumiy foydalanadi, xotira tejaladi."
    },
    {
      id: 2,
      question: "Statik metod qayerdan chaqiriladi?",
      options: ["Nusxadan: `obj.method()`", "Klassdan: `Klass.method()`", "constructor ichidan", "prototype'dan"],
      correctAnswer: 1,
      explanation: "Statik metodlar klassning o'ziga tegishli: `Klass.method()` — nusxada mavjud emas."
    },
    {
      id: 3,
      question: "Klassni `new` siz chaqirsangiz nima bo'ladi?",
      options: ["Ishlaydi", "TypeError beradi", "undefined qaytaradi", "Window'ga yozadi"],
      correctAnswer: 1,
      explanation: "Klasslar faqat `new` bilan chaqiriladi: 'Class constructor cannot be invoked without new'."
    },
    {
      id: 4,
      question: "Klass e'lonlari hoisting qanday bo'ladi?",
      options: [
        "Funksiyalar kabi to'liq hoisting",
        "TDZ — e'londan oldin chaqirib bo'lmaydi",
        "Hech qanday hoisting yo'q",
        "Faqat statik metodlar hoisting"
      ],
      correctAnswer: 1,
      explanation: "Klasslar let/const kabi TDZ'da — e'lon qilinishidan oldin murojaat ReferenceError beradi."
    },
    {
      id: 5,
      question: "Statik metod ichida `this` nima bo'ladi?",
      options: ["Yangi nusxa", "Klassning o'zi", "undefined", "window"],
      correctAnswer: 1,
      explanation: "Statik metod klassda chaqiriladi — `this` = klass. `new this()` fabrika metodlarida ishlatiladi."
    },
    {
      id: 6,
      question: "`typeof SomeClass` nimani qaytaradi?",
      options: ["'class'", "'object'", "'function'", "'constructor'"],
      correctAnswer: 2,
      explanation: "Klasslar aslida funksiya — `typeof` natijasi 'function'."
    },
    {
      id: 7,
      question: "Bir klassda nechta `constructor` bo'lishi mumkin?",
      options: ["Cheksiz", "Bittagina", "Ikkita", "Umuman bo'lmasligi ham mumkin"],
      correctAnswer: 1,
      explanation: "Bir klassda bitta constructor bo'ladi; yozilmasa bo'sh constructor avtomatik yaratiladi."
    },
    {
      id: 8,
      question: "Klass tanasi qanday rejimda ishlaydi?",
      options: ["Sloppy mode", "Strict mode (avtomatik)", "Module mode", "Foydalanuvchi tanlaydi"],
      correctAnswer: 1,
      explanation: "Klass tanasi avtomatik strict mode'da — `this` yo'qolgan joylarda `undefined` bo'ladi."
    },
    {
      id: 9,
      question: "`static VERSION = '1.0'` sintaksisi qachon qo'shilgan?",
      options: ["ES5", "ES6", "ES2022", "Hali kirmagan"],
      correctAnswer: 2,
      explanation: "Statik property'lar ES2022 bilan kirdi; ilgari faqat static metodlar bor edi."
    },
    {
      id: 10,
      question: "Klass metodlari `for...in` orqali sanaladimi?",
      options: ["Ha, hammasi", "Yo'q, ular enumerable emas", "Faqat statiklar", "Faqat getterlar"],
      correctAnswer: 1,
      explanation: "Klass metodlari `enumerable: false` — `for...in` va `Object.keys` da ko'rinmaydi."
    },
    {
      id: 11,
      question: "Class expression nima?",
      options: [
        "Klassni o'zgaruvchiga yozish: `const A = class {}`",
        "Klass ichidagi ifoda",
        "Statik metod",
        "Getter/setter juftligi"
      ],
      correctAnswer: 0,
      explanation: "Class expression — klassni qiymat sifatida yozish: o'zgaruvchiga berish, argument o'tkazish mumkin."
    },
    {
      id: 12,
      question: "`static { ... }` blok nima qiladi?",
      options: [
        "Nusxa yaratilganda ishlaydi",
        "Klass ishlovchi vaqtida bir marta ishlaydi",
        "Modul yuklanishida xatolik beradi",
        "Hech qachon ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Static blok (ES2022) — klass tanasi baholanishida bir marta ishlaydi: statik property'larni murakkab init uchun."
    }
  ]
};
