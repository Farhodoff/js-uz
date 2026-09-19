export const classes = {
  id: "classes",
  title: "Classes (Klasslar) - OOP",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

### Klasslar nima?
Tasavvur qiling, siz bino qurmoqchisiz. Sizga bino qurish uchun **chizma (blueprint)** kerak bo'ladi. Klass (Class) – bu dasturlashda ana shunday chizma hisoblanadi. U o'zida obyektlarning qanday xususiyatlarga (property) va harakatlarga (method) ega bo'lishini belgilaydi.
O'sha chizma yordamida esa bir nechta bir xil turdagi **binolarni (obyektlarni)** qurishingiz mumkin.

Masalan:
* **Klass:** Avtomobil chizmasi.
* **Obyekt (Instance):** Shu chizma asosida yig'ilgan har bir aniq mashina (qora Tesla, oq Spark).

\\\`\\\`\\\`javascript
class Car {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  drive() {
    return \\\`\${this.model} oldinga harakatlanmoqda...\\\`;
  }
}

// Chizmadan (Klassdan) yangi obyekt (mashina) yaratish
const myCar = new Car("Tesla", "Qora");
const yourCar = new Car("Spark", "Oq");
\\\`\\\`\\\`

---

## 2. ⚙️ Chuqur Tahlil (Deep Dive - Under the Hood)

### JavaScript'da Klasslar aslida qanday ishlaydi?
JavaScript boshqa OOP tillari (masalan, Java yoki C++) kabi sof klasslarga asoslangan til emas. U **Prototipga asoslangan (Prototype-based)** til hisoblanadi. ES6 (ECMAScript 2015) da kiritilgan \\\`class\\\` sintaksisi aslida **sintaktik shakar (Syntactic Sugar)** hisoblanadi. Ya'ni u tag-tagida baribir funksiyalar va prototiplar yordamida ishlaydi.

V8 Engine (masalan, Chrome brauzeridagi dvigatel) \\\`class\\\` yordamida yozilgan kodni ko'rsa, uni ichkarida an'anaviy konstruktor-funksiyaga aylantiradi. Obyektning xususiyatlari (\\\`this.model\\\`) har bir obyekt xotirasida alohida saqlansa, metodlari (\\\`drive()\\\`) barcha obyektlar uchun bitta umumiy **Prototip (Prototype)** xotirasida saqlanadi. Bu xotirani optimallashtirishda juda katta yordam beradi.

\\\`\\\`\\\`javascript
// Yuqoridagi class kodimiz V8 dvigateli uchun ichkarida quyidagicha ko'rinadi:
function Car(model, color) {
  this.model = model;
  this.color = color;
}

Car.prototype.drive = function() {
  return this.model + " oldinga harakatlanmoqda...";
};
\\\`\\\`\\\`

### Xotira boshqaruvi va Performance
Klass metodlari obyektning o'zida emas, uning \\\`.prototype\\\` obyektida saqlangani sababli, minglab obyekt (instance) yaratilsa ham, xotirada metodlar faqat bitta marta joy egallaydi. Ammo, \\\`constructor\\\` ichida arrow function (\\\`this.sayHi = () => {}\\\`) yaratsangiz, u holda har bir obyekt uchun metod xotiradan alohida joy oladi, bu esa Performance (tezlik va xotira sig'imi) ga salbiy ta'sir ko'rsatishi mumkin. Shuning uchun metodlarni doim oddiy usulda (\\\`metodNomi() {}\\\`) e'lon qilish tavsiya etiladi.

---

## 3. ⚠️ Murakkab Holatlar va Senior Intervyu Savollari (Edge Cases)

### 1. Klasslar va Hoisting
Intervyuda tez-tez so'raladigan savol: *"Klasslar Hoisting bo'ladimi?"*
**Javob:** Klass e'lonlari Hoisting qilinadi, lekin ular xuddi \\\`let\\\` va \\\`const\\\` kabi **Temporal Dead Zone (TDZ)** ga tushadi. Ya'ni, klassni e'lon qilishdan oldin undan foydalanmoqchi bo'lsangiz xatolik yuzaga keladi.

\\\`\\\`\\\`javascript
// ReferenceError: Cannot access 'User' before initialization
const u = new User(); 

class User {
  constructor() {}
}
\\\`\\\`\\\`

### 2. \\\`extends\\\` va \\\`super()\\\` ishlatishdagi qoidalar
Merosxo'r (Subclass) yaratilganda, uning constructorida \\\`this\\\` kalit so'ziga murojaat qilishdan oldin albatta ota klassning constructorini chaqirish uchun \\\`super()\\\` dan foydalanish shart. Aks holda, yomon xatolik olasiz.

\\\`\\\`\\\`javascript
class Animal {
  constructor(name) { this.name = name; }
}

class Dog extends Animal {
  constructor(name, breed) {
    // this.breed = breed; // Xato! super() chaqirilmasdan this ishlatildi!
    super(name); // Ota constructor birinchi ishga tushadi
    this.breed = breed; // Endi hammasi To'g'ri
  }
}
\\\`\\\`\\\`

### 3. Private Property va Metodlar
ES2022 dagi yangilik orqali JavaScript'ga \\\`#\\\` belgisi orqali haqiqiy xususiy (private) maydonlar qo'shildi. Private maydonlarga faqat klass ichidangina murojaat qilish mumkin, ular \\\`Object.keys()\\\` da yoki obyektdan tashqarida ko'rinmaydi.

\\\`\\\`\\\`javascript
class BankAccount {
  #balance = 0; // Private field (maxfiy maydon)

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const myAcc = new BankAccount();
// console.log(myAcc.#balance); // SyntaxError: Private field bo'lgani uchun o'qib bo'lmaydi
console.log(myAcc.getBalance()); // 0
\\\`\\\`\\\`

---

## 4. 📊 Mermaid Diagrammasi
Quyida OOP dagi merosxo'rlik (Inheritance) qanday ishlashi tasvirlangan:

\\\`\\\`\\\`mermaid
graph TD
    A[Animal Class] -->|extends| B[Dog Class]
    A -->|extends| C[Cat Class]
    
    B --> D[dog1 Object]
    B --> E[dog2 Object]
    
    C --> F[cat1 Object]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Klass yaratish",
      instruction: "Ichida \`name\` va \`age\` xususiyatlari bo'lgan \`Person\` klassini \`constructor\` yordamida yarating.",
      startingCode: "class Person {\n  // Kodni shu yerda yozing\n}\n\nconst p = new Person('Ali', 25);\nconsole.log(p.name);",
      hint: "constructor(name, age) { this.name = name; this.age = age; } yozishingiz kerak.",
      test: "const fn = new Function(code + '; return new Person(\\'Ali\\', 25).name;')(); if(fn === 'Ali') return null; return 'Xato';"
    },
    {
      id: 2,
      title: "Klass Metodlari",
      instruction: "\`Car\` klassi uchun \`model\` qabul qiladigan constructor va \`drive()\` metodini yarating, u '\`[model] haydayapti\`' degan qatorni qaytarsin.",
      startingCode: "class Car {\n  // Kodni yozing\n}",
      hint: "drive() { return this.model + ' haydayapti'; }",
      test: "const fn = new Function(code + '; return new Car(\\'Tesla\\').drive();')(); if(fn === 'Tesla haydayapti') return null; return 'Xato';"
    },
    {
      id: 3,
      title: "Meros olish (Inheritance)",
      instruction: "\`Animal\` klassi yaratilgan. Undan voris qilib \`Dog\` klassini yarating, unga \`bark()\` metodini qo'shing, u '\`Vov-vov\`' qaytarsin.",
      startingCode: "class Animal {\n  constructor(name) { this.name = name; }\n}\nclass Dog /* extends... */ {\n  // Kodni yozing\n}",
      hint: "class Dog extends Animal { bark() { return 'Vov-vov'; } }",
      test: "const fn = new Function(code + '; return new Dog(\\'Rex\\').bark();')(); if(fn === 'Vov-vov') return null; return 'Xato';"
    },
    {
      id: 4,
      title: "Getter ishlatish",
      instruction: "\`Circle\` klassi radius qabul qiladi. \`area\` (yuza) getterni yarating (π * radius^2). π uchun \`Math.PI\` ishlating.",
      startingCode: "class Circle {\n  constructor(radius) { this.radius = radius; }\n  // get area() { ... }\n}",
      hint: "get area() { return Math.PI * this.radius ** 2; }",
      test: "const fn = new Function(code + '; return new Circle(10).area;')(); if(fn === Math.PI * 100) return null; return 'Xato';"
    },
    {
      id: 5,
      title: "Setter ishlatish",
      instruction: "\`User\` klassiga \`name\` get va set metodlarini yozing. Setter agar ism 3 harfdan qisqa bo'lsa o'zgartirmasin, uzun bo'lsa \`this._name\` ga tenglashtirsin.",
      startingCode: "class User {\n  constructor(name) { this._name = name; }\n  // get name() { ... }\n  // set name(val) { ... }\n}",
      hint: "get name() { return this._name; } set name(v) { if(v.length >= 3) this._name = v; }",
      test: "const fn = new Function(code + '; const u = new User(\\'Ali\\'); u.name = \\'Bo\\'; const first = u.name; u.name = \\'Vali\\'; return first === \\'Ali\\' && u.name === \\'Vali\\';')(); if(fn === true) return null; return 'Xato';"
    },
    {
      id: 6,
      title: "Super() ishlatish",
      instruction: "\`Employee\` klassi \`name\` qabul qiladi. \`Manager\` undan meros olsin, \`name\` va \`department\` qabul qilsin. constructor ichida \`super(name)\` ishlating.",
      startingCode: "class Employee {\n  constructor(name) { this.name = name; }\n}\nclass Manager extends Employee {\n  // Kodni yozing\n}",
      hint: "constructor(name, dept) { super(name); this.department = dept; }",
      test: "const fn = new Function(code + '; const m = new Manager(\\'Ali\\', \\'IT\\'); return m.name === \\'Ali\\' && m.department === \\'IT\\';')(); if(fn === true) return null; return 'Xato';"
    },
    {
      id: 7,
      title: "Private maydonlar (#)",
      instruction: "\`Wallet\` klassida \`#balance = 0\` degan private o'zgaruvchi e'lon qiling va unga \`add(amount)\` metodini yozing, va \`getBalance()\` metodi \`#balance\` ni qaytarsin.",
      startingCode: "class Wallet {\n  // Kodni yozing\n}",
      hint: "#balance = 0; add(amount) { this.#balance += amount; } getBalance() { return this.#balance; }",
      test: "const fn = new Function(code + '; const w = new Wallet(); w.add(50); return w.getBalance();')(); if(fn === 50) return null; return 'Xato';"
    },
    {
      id: 8,
      title: "Static metodlar",
      instruction: "\`MathHelper\` klassini tuzing. Unga ikkita raqamni qo'shib beradigan \`add(a, b)\` static metodini yozing.",
      startingCode: "class MathHelper {\n  // Kodni yozing\n}",
      hint: "static add(a, b) { return a + b; }",
      test: "const fn = new Function(code + '; return MathHelper.add(5, 7);')(); if(fn === 12) return null; return 'Xato';"
    },
    {
      id: 9,
      title: "Zanjir (Chaining)",
      instruction: "\`Calc\` klassida \`value = 0\` bor. \`add(n)\` va \`sub(n)\` metodlarini yarating va har biri amal bajarib \`this\` (o'zini) qaytarsin.",
      startingCode: "class Calc {\n  constructor() { this.value = 0; }\n  // Kodni yozing\n}",
      hint: "add(n) { this.value += n; return this; } xuddi shunday sub(n) ham.",
      test: "const fn = new Function(code + '; return new Calc().add(10).sub(3).value;')(); if(fn === 7) return null; return 'Xato';"
    },
    {
      id: 10,
      title: "Ota metodni Override qilish",
      instruction: "\`Printer\` klassida \`print()\` metodi '\`Hujjat\`' qaytaradi. \`ColorPrinter\` klassini undan meros qilib oling va uning \`print()\` metodi '\`Rangli hujjat\`' qaytaradigan qiling.",
      startingCode: "class Printer {\n  print() { return 'Hujjat'; }\n}\nclass ColorPrinter extends Printer {\n  // Kodni yozing\n}",
      hint: "print() { return 'Rangli hujjat'; } yozish orqali ota metodni ustidan yozasiz.",
      test: "const fn = new Function(code + '; return new ColorPrinter().print();')(); if(fn === 'Rangli hujjat') return null; return 'Xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Klasslarda \`constructor\` metodining vazifasi nima?",
      options: [
        "Klassdan ob'ekt yaratilganda xususiyatlarni initsializatsiya qilish",
        "Klassni kompyuter xotirasidan o'chirish",
        "DOM ni yangilash",
        "Private metodlarni ishga tushirish"
      ],
      correctAnswer: 0,
      explanation: "\`constructor\` bu klassdan yangi instance (obyekt) yasalganida birinchi bo'lib avtomatik chaqiriladigan va obyektga boshlang'ich qiymat o'rnatadigan maxsus metoddir."
    },
    {
      id: 2,
      question: "Merosxo'r klass (subclass) da \`this\` ishlatishdan oldin qaysi funksiyani chaqirish majburiydir?",
      options: [
        "call()",
        "apply()",
        "super()",
        "bind()"
      ],
      correctAnswer: 2,
      explanation: "Agar klass \`extends\` orqali boshqa klassdan meros olayotgan bo'lsa, \`constructor\` ichida \`this\` dan foydalanishdan oldin ota klass konstruktorini ishga tushiruvchi \`super()\` ni chaqirish zarur."
    },
    {
      id: 3,
      question: "Klass o'ziga tegishli (obyektga emas) metod yaratish uchun qaysi kalit so'z ishlatiladi?",
      options: [
        "private",
        "public",
        "static",
        "const"
      ],
      correctAnswer: 2,
      explanation: "\`static\` kalit so'zi metodning instansiyaga emas, to'g'ridan-to'g'ri klassning o'ziga tegishli ekanligini bildiradi."
    },
    {
      id: 4,
      question: "Klass ichida xaqiqiy (true) private (maxfiy) xususiyat yaratish uchun nomining oldiga qaysi belgi qo'yiladi?",
      options: [
        "_",
        "#",
        "$",
        "@"
      ],
      correctAnswer: 1,
      explanation: "ES2022'dan boshlab private maydon va metodlar nomi oldidan \`#\` belgisi qo'yiladi va ularga faqat shu klass ichidangina murojaat qilish mumkin bo'ladi."
    },
    {
      id: 5,
      question: "JavaScript klasslari haqida qaysi fikr to'g'ri?",
      options: [
        "Ular mutlaqo yangi mexanizm asosida ishlaydi",
        "Ular hoisting bo'ladi va ularni funksiya kabi e'lon qilishdan oldin ishlatsa bo'ladi",
        "Ular prototiplarga asoslangan sintaktik shakar (Syntactic Sugar) hisoblanadi",
        "Ular obyekt qaytarmaydi"
      ],
      correctAnswer: 2,
      explanation: "JS klasslari ichkarida baribir prototip mexanizmi yordamida ishlaydi. Klass sintaksisi kodni yozishni qulaylashtirish uchun qo'shilgan 'Sintaktik shakar' hisoblanadi."
    },
    {
      id: 6,
      question: "Bir obyekt aynan shu klassdan (yoki uning ajdodidan) yasalganini tekshirish uchun qaysi operator kerak?",
      options: [
        "typeof",
        "instanceof",
        "isPrototypeOf",
        "in"
      ],
      correctAnswer: 1,
      explanation: "\`instanceof\` operatori obyekt ma'lum bir konstruktor prototipi zanjirida mavjudmi yoki yo'qmi tekshirib, true/false qaytaradi."
    },
    {
      id: 7,
      question: "Klasslar Hoisting qoidalariga bo'ysunadimi?",
      options: [
        "Ha, xuddi var kabi hoisting bo'ladi",
        "Yo'q, klasslar TDZ (Temporal Dead Zone) da saqlanadi va e'londan oldin chaqirib bo'lmaydi",
        "Faqat static metodlar hoisting bo'ladi",
        "Ular global ob'ektga qo'shiladi"
      ],
      correctAnswer: 1,
      explanation: "Klass e'lonlari hoisting bo'lsa-da, let/const kabi initsializatsiya qilinmaguncha chaqirilsa ReferenceError qaytaradi."
    },
    {
      id: 8,
      question: "Obyektning property'sini o'qiyotganda qandaydir amal bajarish uchun metod qaysi kalit so'z bilan yoziladi?",
      options: [
        "set",
        "get",
        "read",
        "value"
      ],
      correctAnswer: 1,
      explanation: "\`get\` (getter) metodi qavslarsiz, oddiy xususiyat o'qilgandek (\`obj.prop\`) chaqiriladi va qaytargan natijasi qiymat sifatida olinadi."
    },
    {
      id: 9,
      question: "Merosxo'r klass ota klassning metodini qanday qilib override qiladi (qayta yozadi)?",
      options: [
        "Ota klassdagi bir xil nom bilan metod e'lon qilish orqali",
        "override() metodini ishlatib",
        "Buning imkoni yo'q, xatolik chiqadi",
        "Ota klassni o'chirib tashlash bilan"
      ],
      correctAnswer: 0,
      explanation: "Voris klass ichida ota klassdagi metod nomini yana takror yozish orqali uning ustidan yoziladi (override)."
    },
    {
      id: 10,
      question: "Konstruktor aynan qaysi klass orqali chaqirilganligini bilish uchun klass ichida nima ishlatsa bo'ladi?",
      options: [
        "this.constructor",
        "super.class",
        "new.target",
        "current.class"
      ],
      correctAnswer: 2,
      explanation: "\`new.target\` yordamida obyekt to'g'ridan-to'g'ri shu klassdan yoki undan meros olgan child klassdan yaratilayotganini aniqlash mumkin."
    },
    {
      id: 11,
      question: "Klassning oddiy metodlari kompyuter xotirasida qayerda saqlanadi?",
      options: [
        "Har bir obyekt (instance) xotirasida takror-takror nusxalanib",
        "Faqat Klassning prototype ob'ektida (bir marta joy egallab)",
        "Dastur xotirasidan tashqarida",
        "Global window obyektida"
      ],
      correctAnswer: 1,
      explanation: "Klass deklaratsiyasi yordamida yozilgan barcha metodlar Klassning prototipida saqlanadi, shu sababli millionta obyekt yaratilganda ham ular metodlardan umumiy bitta manba orqali foydalanadi (xotira optimallashtirilishi)."
    },
    {
      id: 12,
      question: "Ota klassdagi metodga voris klass ichidan turib murojaat qilish uchun qaysi sintaksis to'g'ri?",
      options: [
        "this.super.methodName()",
        "super.methodName()",
        "parent.methodName()",
        "base.methodName()"
      ],
      correctAnswer: 1,
      explanation: "\`super\` kalit so'zi ota klassni bildiradi. Uning metodini ishlatish uchun \`super.metodNomi()\` sintaksisidan foydalaniladi."
    }
  ]
};
