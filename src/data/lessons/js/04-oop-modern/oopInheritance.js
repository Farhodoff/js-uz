export const oopInheritance = {
  id: "oopInheritance",
  title: "Meros Olish: extends, super va Polimorfizm",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**Meros olish (Inheritance)** — bir klass boshqa klassning xususiyatlarini "voris" sifatida oladi. Bu **DRY** (Don't Repeat Yourself) prinsipining OOP ko'rinishi.

### Real hayotiy o'xshatish
**Hayvonot olami**ni tasavvur qiling:
- \`Animal\` — umumiy: hammasi nafas oladi, ovqat yeydi (ota klass).
- \`Dog\`, \`Cat\`, \`Bird\` — vorislar: ota klassning barchasini oladi + o'ziga xos qo'shimchalar.
- \`Dog.speak()\` — "Vov-vov", \`Cat.speak()\` — "Miyov" — **bir xil metod, xil natija** = polimorfizm!

\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    return \`\${this.name} ovqat yeydi\`;
  }
  speak() {
    return \`\${this.name} tovush chiqaradi\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 1) ota klassni ishga tushirish (majburiy!)
    this.breed = breed; // 2) keyin o'z property'lari
  }
  speak() { // override — ota metodini qayta yozish
    return \`\${this.name}: Vov-vov!\`;
  }
  fetch() { // yangi metod
    return \`\${this.name} to'p olib keladi\`;
  }
}

const rex = new Dog("Rex", "Husky");
console.log(rex.eat());   // Ota metodidan: "Rex ovqat yeydi"
console.log(rex.speak()); // Override qilingan: "Rex: Vov-vov!"
\`\`\`

### \`super()\` qoidalari
1. Voris klassning \`constructor\`ida \`this\` ishlatishdan **oldin** \`super()\` chaqirish **majburiy**.
2. \`super()\` ota klassning \`constructor\`ini ishga tushiradi.
3. \`super.metod()\` — ota klassning metodini chaqiradi (override ichida foydali).

\`\`\`javascript
class ColorPrinter extends Printer {
  print() {
    return super.print() + " (rangli)"; // ota metodni kengaytirish
  }
}
\`\`\`

---

## 2. ⚙️ Chuqur Tahlil (Ichki ishlash, xotira, V8 dvigateli, unumdorlik)

### Meros qanday amalga oshadi?
\`class Dog extends Animal\` yozilganda ikki bog'lanish o'rnatiladi:

\`\`\`javascript
// 1) Voris nusxalar ota prototipiga bog'lanadi:
Object.setPrototypeOf(Dog.prototype, Animal.prototype);

// 2) Voris konstruktori ota konstruktoriga bog'lanadi (static metodlar uchun):
Object.setPrototypeOf(Dog, Animal);
\`\`\`

Shu sababli \`Dog.fetch()\` topilmasa, JS \`Dog.prototype\` → \`Animal.prototype\` → \`Object.prototype\` zanjirida qidiradi. \`static\` metodlar ham shu zanjirdan meros oladi: \`Dog.staticMetod()\` — \`Animal\`dan topiladi!

### \`super\` mexanizmi — oddiy \`this.__proto__\` emas
\`super.print()\` — \`this.__proto__.print\` emas! U **HomeObject** maxsus mexanizmi bilan metod yozilgan klassning ota sinfini topadi. Farqi:

\`\`\`javascript
// super: ota prototipda qidiradi, this = hozirgi nusxa
// this.__proto__.metod(): natija bir xil ko'rinadi, lekin
// uch safar olingan klasslarda super aniq va xavfsiz ishlaydi
\`\`\`

### Polimorfizm va Open-Closed prinsip
Polimorfizm — bir interfeys, ko'p xatti-harakat. Yangi tur qo'shish uchun **eski kodni o'zgartirmaysiz** (Open-Closed Principle):

\`\`\`javascript
const animals = [new Dog("Rex"), new Cat("Murzik"), new Bird("Kesha")];
for (const a of animals) {
  console.log(a.speak()); // har biri o'zini bildiradi!
}
\`\`\`

V8 bunday chaqiruvlarni **inline caching** orqali optimallashtiradi: agar bir joyda doim bir xil tur chaqirilsa — "monomorf" tez yo'l; ko'p tur chaqirilsa — "polimorf" yo'l, biroz sekinroq, lekin barobar samarali.

### instanceof va meros
\`\`\`javascript
const rex = new Dog("Rex");
rex instanceof Dog;    // true
rex instanceof Animal; // true — zanjir ustidan ham ishlaydi!
rex instanceof Object; // true
\`\`\`

---

## 3. ⚠️ Murakkab Holatlar va Senior Intervyu Savollari

### 1. \`super()\` qoidalarining tuzoqlari
\`\`\`javascript
class Dog extends Animal {
  constructor() {
    // ❌ XATO: return dan keyin super() — SyntaxError
    // ❌ XATO: super() dan oldin this ishlatish — ReferenceError
    super(); // ✅ birinchi qator
    this.x = 1;
  }
  // ❌ constructor umuman yozilmasa — avtomatik super(...args) ishlaydi
}
\`\`\`

### 2. Arrow funksiya ichida \`super\`
\`super\` faqat **metodlar** ichida ishlaydi. Odatiy \`function\` ichida — SyntaxError. Arrow funksiya tashqi metoddan oladi:

\`\`\`javascript
class Timer extends Base {
  start() {
    setTimeout(() => {
      super.log("ishladi"); // ✅ arrow — tashqi metodning super'i
    }, 100);
    setTimeout(function () {
      // super.log(...); // ❌ SyntaxError
    }, 200);
  }
}
\`\`\`

### 3. \`super\` va static metodlar
Statik metodda \`super.metod()\` — ota klassning **statik** metodini chaqiradi:

\`\`\`javascript
class A {
  static hi() { return "A-hi"; }
}
class B extends A {
  static hi() { return super.hi() + "+B"; }
}
console.log(B.hi()); // "A-hi+B"
\`\`\`

### 4. Diamond problem va mixin'lar
JS **ko'p merosni qo'llamaydi** (bitta \`extends\`). Ko'p manbalardan xususiyat olish uchun **mixin**lar ishlatiladi:

\`\`\`javascript
const Swimmer = (Base) => class extends Base {
  swim() { return "suzmoqda"; }
};
const Flyer = (Base) => class extends Base {
  fly() { return "uchmoqda"; }
};
class Animal { constructor(name) { this.name = name; } }
class Duck extends Flyer(Swimmer(Animal)) {}
const d = new Duck("Kesha");
d.fly(); // "uchmoqda"
d.swim(); // "suzmoqda"
\`\`\`

### 5. \`Object.getPrototypeOf\` bilan zanjirni tekshirish
\`\`\`javascript
Object.getPrototypeOf(Dog.prototype) === Animal.prototype; // true
\`\`\`

> [!WARNING]
> \`#\` private maydonlar meros olinmaydi. Voris klass ota klassning private maydoniga murojaat qilishi mumkin emas — faqat ota klassning public getter/metodlari orqali.

---

## 4. 📊 Mermaid Diagrammasi

\`\`\`mermaid
graph TD
    A["class Animal"] -->|"extends"| B["class Dog"]
    A -->|"extends"| C["class Cat"]
    B -->|"new"| D["rex nusxa"]
    C -->|"new"| E["murzik nusxa"]
    D -->|"__proto__"| B
    B -->|"prototype"| A
    D -->|"speak() topilmasa zanjirdan"| A
    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#bbf,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Extends bilan meros",
      instruction: "`Animal` klassidan `Dog` klassini meros oling (`extends`).",
      startingCode: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return 'Shovqin'; }\n}\nclass Dog /* extends... */ {\n}",
      hint: "class Dog extends Animal {}",
      test: "const fn = new Function(code + '; return Dog;'); const D = fn(); const d = new D('Rex'); if (d.name === 'Rex' && d.speak() === 'Shovqin') return null; return 'Dog Animal dan meros olishi kerak';"
    },
    {
      id: 2,
      title: "Super bilan constructor",
      instruction: "`Dog` klassi `name` va `breed` qabul qiladi. `super(name)` ishlatib `breed` ni o'rnating.",
      startingCode: "class Animal {\n  constructor(name) { this.name = name; }\n}\nclass Dog extends Animal {\n  // constructor yozing\n}",
      hint: "constructor(name, breed) { super(name); this.breed = breed; }",
      test: "const fn = new Function(code + '; const d = new Dog(\\'Rex\\', \\'Husky\\'); return [d.name, d.breed];'); const r = fn(); if (r && r[0] === 'Rex' && r[1] === 'Husky') return null; return 'super(name) chaqirib breed o\\'rnating';"
    },
    {
      id: 3,
      title: "Override qilish",
      instruction: "`Dog` klassida `speak()` metodini override qiling — `'Vov-vov'` qaytarsin.",
      startingCode: "class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return 'Shovqin'; }\n}\nclass Dog extends Animal {\n  // speak metodini qayta yozing\n}",
      hint: "speak() { return 'Vov-vov'; }",
      test: "const fn = new Function(code + '; return new Dog(\\'Rex\\').speak();'); if (fn() === 'Vov-vov') return null; return 'Dog.speak() Vov-vov qaytarishi kerak';"
    },
    {
      id: 4,
      title: "Super.metod() bilan kengaytirish",
      instruction: "`Dog.speak()` — ota metodini chaqirib (`super.speak()`) unga `' (vov-vov)'` qo'shsin. Natija: `'Shovqin (vov-vov)'`.",
      startingCode: "class Animal {\n  speak() { return 'Shovqin'; }\n}\nclass Dog extends Animal {\n  // super.speak() ishlatib kengaytiring\n}",
      hint: "speak() { return super.speak() + ' (vov-vov)'; }",
      test: "const fn = new Function(code + '; return new Dog().speak();'); if (fn() === 'Shovqin (vov-vov)') return null; return 'super.speak() natijasiga qo\\'shimcha qo\\'shing';"
    },
    {
      id: 5,
      title: "Polimorfizm",
      instruction: "`Shape` klassi `describe()` — `'Shakl'` qaytaradi. `Circle` — `'Doira'`, `Square` — `'Kvadrat'` qaytarsin (override).",
      startingCode: "class Shape {\n  describe() { return 'Shakl'; }\n}\n// Circle va Square klasslarini yarating",
      hint: "class Circle extends Shape { describe() { return 'Doira'; } }",
      test: "const fn = new Function(code + '; return [new Circle().describe(), new Square().describe()];'); const r = fn(); if (r && r[0] === 'Doira' && r[1] === 'Kvadrat') return null; return 'Har bir voris o\\'z javobini qaytarsin';"
    },
    {
      id: 6,
      title: "instanceof zanjiri",
      instruction: "`isAnimal(obj)` funksiyasini yozing — `obj` Dog bo'lsa ham, Animal bo'lsa ham true qaytarsin (`instanceof Animal`).",
      startingCode: "class Animal {}\nclass Dog extends Animal {}\nfunction isAnimal(obj) {\n  // kodni yozing\n}",
      hint: "return obj instanceof Animal;",
      test: "const fn = new Function(code + '; return [isAnimal(new Dog()), isAnimal(new Animal()), isAnimal({})];'); const r = fn(); if (r && r[0] === true && r[1] === true && r[2] === false) return null; return 'instanceof meros zanjiri bo\\'ylab ishlaydi';"
    },
    {
      id: 7,
      title: "Uch pog'ona meros",
      instruction: "`A` → `B` → `C` zanjirini yarating. `C` nusxasi `A` ning `hello()` metodini ishlatishi kerak.",
      startingCode: "class A {\n  hello() { return 'Hello'; }\n}\n// B va C ni yarating",
      hint: "class B extends A {} class C extends B {}",
      test: "const fn = new Function(code + '; return new C().hello();'); if (fn() === 'Hello') return null; return 'C orqali A metodiga yetib borish kerak';"
    },
    {
      id: 8,
      title: "Static meros",
      instruction: "`A` klassida `static info()` bor. `B extends A` qilinsa, `B.info()` ishlashi kerak (static ham meros olinadi).",
      startingCode: "class A {\n  static info() { return 'A-info'; }\n}\n// B klassini yarating",
      hint: "class B extends A {}",
      test: "const fn = new Function(code + '; return B.info();'); if (fn() === 'A-info') return null; return 'Static metod ham meros olinishi kerak';"
    },
    {
      id: 9,
      title: "Mixin pattern",
      instruction: "`canSwim` mixin funksiyasini yozing: `(Base) => class extends Base` shaklida bo'lib, `swim()` metodi qo'shsin. `Duck` yarating.",
      startingCode: "class Animal {\n  constructor(name) { this.name = name; }\n}\n// canSwim mixin va Duck klassini yozing",
      hint: "const canSwim = (Base) => class extends Base { swim() { return 'suzmoqda'; } }; class Duck extends canSwim(Animal) {}",
      test: "const fn = new Function(code + '; return new Duck(\\'Kesha\\').swim();'); if (fn() === 'suzmoqda') return null; return 'Mixin orqali swim metodi qo\\'shilishi kerak';"
    },
    {
      id: 10,
      title: "Abstrakt naqsh",
      instruction: "`Vehicle` klassida `describe()` — `this.getInfo() + ' — transport'` qaytarsin. `getInfo()` vorislar yozadi: `Car` — `'Mashina'`. Natija: `'Mashina — transport'`.",
      startingCode: "class Vehicle {\n  describe() {\n    // getInfo() ishlating\n  }\n}\nclass Car extends Vehicle {\n  // getInfo yozing\n}",
      hint: "describe() { return this.getInfo() + ' — transport'; } getInfo() { return 'Mashina'; }",
      test: "const fn = new Function(code + '; return new Car().describe();'); if (fn() === 'Mashina — transport') return null; return 'describe getInfo natijasidan foydalanishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Meros olish qaysi kalit so'z bilan amalga oshadi?",
      options: ["inherit", "extends", "super", "proto"],
      correctAnswer: 1,
      explanation: "`class B extends A` — B A dan meros oladi."
    },
    {
      id: 2,
      question: "Voris constructorida `this` ishlatishdan oldin nima chaqirilishi majburiy?",
      options: ["constructor()", "super()", "init()", "new.target"],
      correctAnswer: 1,
      explanation: "`super()` ota konstruktorni ishga tushiradi — chaqirilmasa `this` ishlatilsa ReferenceError."
    },
    {
      id: 3,
      question: "`super.metod()` nima qiladi?",
      options: [
        "O'z metodini chaqiradi",
        "Ota klass metodini chaqiradi",
        "Yangi nusxa yaratadi",
        "Statik metodni chaqiradi"
      ],
      correctAnswer: 1,
      explanation: "`super.metod()` — ota klass prototipidagi metodni, `this` hozirgi nusxa bo'lgan holatda chaqiradi."
    },
    {
      id: 4,
      question: "Polimorfizm nima?",
      options: [
        "Ko'p meros olish",
        "Bir interfeys — ko'p xatti-harakat",
        "Klasslarni ko'paytirish",
        "Property'larni nusxalash"
      ],
      correctAnswer: 1,
      explanation: "Polimorfizm — bir xil metod nomi har xil turda har xil ishlaydi."
    },
    {
      id: 5,
      question: "Override qanday qilinadi?",
      options: [
        "override kalit so'zi bilan",
        "Vorisda bir xil nomli metod yozish bilan",
        "super bilan o'chirish",
        "Buning imkoni yo'q"
      ],
      correctAnswer: 1,
      explanation: "Voris klassda ota klassdagi nom bilan metod yozilsa — prototip zanjirida ustiroq bo'ladi (shadowing)."
    },
    {
      id: 6,
      question: "`rex instanceof Animal` (Dog extends Animal) nimani qaytaradi?",
      options: ["false", "true", "xato", "undefined"],
      correctAnswer: 1,
      explanation: "`instanceof` prototip zanjirini tekshiradi — voris nusxa ota klass nusxasi hisoblanadi."
    },
    {
      id: 7,
      question: "JS ko'p merosni (multiple inheritance) qo'llaydimi?",
      options: ["Ha, istalgancha", "Yo'q, bitta extends", "Faqat mixinlar ichida", "Faqat interface bilan"],
      correctAnswer: 1,
      explanation: "JS'da bitta `extends` — ko'p meros mixin funksiyalar orqali simulyatsiya qilinadi."
    },
    {
      id: 8,
      question: "Voris constructori umuman yozilmasa nima bo'ladi?",
      options: [
        "Xatolik",
        "Avtomatik constructor — super(...args) ishlaydi",
        "undefined nusxa",
        "Ota constructor chaqirilmaydi"
      ],
      correctAnswer: 1,
      explanation: "Constructor yozilmasa, avtomatik `constructor(...args) { super(...args); }` yaratiladi."
    },
    {
      id: 9,
      question: "Statik metodlar meros olinadimi?",
      options: ["Yo'q", "Ha, extends orqali", "Faqat private bo'lsa", "Faqat mixin orqali"],
      correctAnswer: 1,
      explanation: "`Object.setPrototypeOf(Dog, Animal)` sababli statik metodlar ham zanjirdan topiladi."
    },
    {
      id: 10,
      question: "`super` oddiy `function` ichida ishlaydimi?",
      options: ["Ha", "Yo'q, SyntaxError", "Faqat strict'da", "Faqat arrow'da"],
      correctAnswer: 1,
      explanation: "`super` faqat method shorthand ichida; oddiy function'da SyntaxError."
    },
    {
      id: 11,
      question: "`#` private maydonlar vorisda ko'rinadimi?",
      options: ["Ha, to'liq", "Yo'q, faqat ota klass ichida", "Faqat getter bilan", "Faqat static bo'lsa"],
      correctAnswer: 1,
      explanation: "Private maydonlar faqat e'lon qilingan klass tanasida mavjud — voris ko'rmaydi."
    },
    {
      id: 12,
      question: "Mixin pattern nima uchun ishlatiladi?",
      options: [
        "Klasslarni o'chirish",
        "Bir necha manbadan xatti-harakat qo'shish",
        "Metodlarni yashirish",
        "Prototipni tozalash"
      ],
      correctAnswer: 1,
      explanation: "Mixin — funksiya orqali klassga qo'shimcha xatti-harakat 'yopishtirish' (ko'p meros muqobili)."
    }
  ]
};
