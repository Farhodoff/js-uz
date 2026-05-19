export const designPatterns = {
  id: "a13",
  title: "Design Patterns: Singleton, Factory, Observer, Decorator, Strategy",
  theory: `## 1. NEGA KERAK?

Tayyor xamalar orqali kod qayta ishlatish, xavfsiz va tez yozish.

## 2. CREATIONAL PATTERNS - Ob'ekt Yaratish

### A. Singleton - Bitta Instance

\`\`\`javascript
class Database {
  static instance = null;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
\`\`\`

### B. Factory - Ob'ekt Yaratish Fabrikasi

\`\`\`javascript
class VehicleFactory {
  static create(type) {
    if (type === 'car') return new Car();
    if (type === 'bike') return new Bike();
  }
}

const car = VehicleFactory.create('car');
const bike = VehicleFactory.create('bike');
\`\`\`

### C. Builder - Murakkab Ob'ekt Yaratish

\`\`\`javascript
class User {
  constructor(builder) {
    this.name = builder.name;
    this.email = builder.email;
    this.age = builder.age;
  }
}

class UserBuilder {
  withName(name) { this.name = name; return this; }
  withEmail(email) { this.email = email; return this; }
  withAge(age) { this.age = age; return this; }
  build() { return new User(this); }
}

const user = new UserBuilder()
  .withName('Ali')
  .withEmail('ali@test.com')
  .withAge(25)
  .build();
\`\`\`

## 3. STRUCTURAL PATTERNS - Ob'ektlarni Biriktirish

### D. Decorator - Funksionallik Qo'shish

\`\`\`javascript
class Coffee {
  cost() { return 5; }
}

class Milk {
  constructor(coffee) { this.coffee = coffee; }
  cost() { return this.coffee.cost() + 2; }
}

const coffee = new Coffee();
const withMilk = new Milk(coffee);
console.log(withMilk.cost()); // 7
\`\`\`

### E. Facade - Murakkab API'ni Soddalash

\`\`\`javascript
// Murakkab subsystem
class PaymentProcessor { process() { } }
class EmailSender { send() { } }
class Logger { log() { } }

// Facade
class PaymentFacade {
  processPayment(amount) {
    const processor = new PaymentProcessor();
    const sender = new EmailSender();
    const logger = new Logger();

    processor.process(amount);
    logger.log('Payment processed');
    sender.send('Thank you!');
  }
}
\`\`\`

## 4. BEHAVIORAL PATTERNS - Harakat va Comportement

### F. Observer - Event Listening

\`\`\`javascript
class EventEmitter {
  constructor() { this.events = {}; }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, data) {
    this.events[event]?.forEach(listener => listener(data));
  }
}

const emitter = new EventEmitter();
emitter.on('login', (user) => console.log(user));
emitter.emit('login', 'Ali');
\`\`\`

### G. Strategy - Turli Algoritm

\`\`\`javascript
class PaymentStrategy {
  pay(amount) { }
}

class CreditCard extends PaymentStrategy {
  pay(amount) { console.log('Credit card: ' + amount); }
}

class PayPal extends PaymentStrategy {
  pay(amount) { console.log('PayPal: ' + amount); }
}

class Order {
  pay(strategy, amount) { strategy.pay(amount); }
}

const order = new Order();
order.pay(new CreditCard(), 100);
\`\`\`

### H. State - Holat o'zgarishi

\`\`\`javascript
class Document {
  constructor() { this.state = new DraftState(this); }
  publish() { this.state.publish(); }
}

class DraftState {
  constructor(doc) { this.doc = doc; }
  publish() {
    console.log('Publishing...');
    this.doc.state = new PublishedState(this.doc);
  }
}
\`\`\`

## 5. ARCHITECTURAL PATTERNS

### I. MVC - Model-View-Controller

### J. Repository - Data Access

\`\`\`javascript
class UserRepository {
  async getById(id) { return db.users.find(id); }
  async save(user) { return db.users.save(user); }
}
\`\`\`

## 6. ANTI-PATTERNS - Noto'g'ri Yandalash

- Callback Hell - RxJS yoki async/await ishlat
- Global Variables - Modullar va scope
- Spaghetti Code - Tuzilgan ko'shni
- Copy-Paste - DRY prinsipi

## 7. AMALIYOT (Mushqlar pastda)

## 8. SAVOLLAR VA JAVOBLAR

<details><summary>1. Design Pattern nima?</summary>Tayyor xamalar (solutions)</details>
<details><summary>2. Singleton nima?</summary>Bitta instance - Database, Config</details>
<details><summary>3. Factory nima?</summary>Ob'ekt yaratish fabrikasi</details>
<details><summary>4. Observer nima?</summary>Event listener pattern</details>
<details><summary>5. Decorator nima?</summary>Funksionallik qo'shish</details>
<details><summary>6. Strategy nima?</summary>Turli algoritm o'zaro</details>
<details><summary>7. Facade nima?</summary>Murakkab API soddalash</details>
<details><summary>8. MVC nima?</summary>Model-View-Controller architecture</details>
<details><summary>9. Repository nima?</summary>Data access abstraction</details>
<details><summary>10. State pattern nima?</summary>Holat o'zgarishni boshqarish</details>
<details><summary>11. Anti-pattern nima?</summary>Noto'g'ri yandalash - oldini olish</details>
<details><summary>12. Qaysi pattern eng muhim?</summary>Singleton, Factory, Observer - eng ko'p ishlatiladi</details>`,
  exercises: [
    {
      id: 1,
      title: "Singleton Pattern",
      instruction: "Bitta instance qaytaruvchi Singleton class yarating.",
      startingCode: "class Singleton {\n  static getInstance() {\n    // Bu yerga yozing\n  }\n}\n",
      hint: "static instance = null; if (!instance) instance = new Singleton();",
      test: "if (code.includes('getInstance')) return null; return 'Singleton kerak';"
    },
    {
      id: 2,
      title: "Factory Pattern",
      instruction: "Factory method orqali ob'ekt yarating.",
      startingCode: "class Factory {\n  static create(type) {\n    // Bu yerga yozing\n  }\n}\n",
      hint: "if (type === 'A') return new A();",
      test: "if (code.includes('create')) return null; return 'Factory kerak';"
    },
    {
      id: 3,
      title: "Observer Pattern",
      instruction: "EventEmitter bilan observer yarating.",
      startingCode: "class EventEmitter {\n  on(event, listener) { /* ... */ }\n  emit(event, data) { /* ... */ }\n}\n",
      hint: "this.events[event]?.forEach(...)",
      test: "if (code.includes('on') && code.includes('emit')) return null; return 'Observer kerak';"
    },
    {
      id: 4,
      title: "Decorator Pattern",
      instruction: "Decorator orqali funksionallik qo'shing.",
      startingCode: "class Decorator {\n  constructor(obj) { this.obj = obj; }\n}\n",
      hint: "Wrapper pattern",
      test: "if (code.includes('constructor')) return null; return 'Decorator kerak';"
    },
    {
      id: 5,
      title: "Strategy Pattern",
      instruction: "Turli strategiyalarni o'tqazing.",
      startingCode: "class Context {\n  execute(strategy) {\n    // Bu yerga yozing\n  }\n}\n",
      hint: "strategy.execute();",
      test: "if (code.includes('strategy')) return null; return 'Strategy kerak';"
    },
    {
      id: 6,
      title: "Facade Pattern",
      instruction: "Murakkab API'ni soddalashtirib facade yarating.",
      startingCode: "class Facade {\n  complexOperation() {\n    // Nechta subsystem ul\n  }\n}\n",
      hint: "Bir method'da hammasini yig'ish",
      test: "if (code.includes('Facade')) return null; return 'Facade kerak';"
    },
    {
      id: 7,
      title: "Builder Pattern",
      instruction: "Builder orqali murakkab ob'ekt yarating.",
      startingCode: "class Builder {\n  with(prop, val) { this[prop] = val; return this; }\n  build() { /* ... */ }\n}\n",
      hint: "Method chaining",
      test: "if (code.includes('build')) return null; return 'Builder kerak';"
    },
    {
      id: 8,
      title: "State Pattern",
      instruction: "Holat o'zgarishini state pattern bilan qiling.",
      startingCode: "class Machine {\n  setState(state) { this.state = state; }\n}\n",
      hint: "State almashtirish",
      test: "if (code.includes('setState')) return null; return 'State kerak';"
    },
    {
      id: 9,
      title: "Repository Pattern",
      instruction: "Data access abstraction qiling.",
      startingCode: "class Repository {\n  async getById(id) { /* ... */ }\n  async save(data) { /* ... */ }\n}\n",
      hint: "Database abstraction",
      test: "if (code.includes('getById')) return null; return 'Repository kerak';"
    },
    {
      id: 10,
      title: "Adapter Pattern",
      instruction: "Birorta API'ni boshqasiga moslang.",
      startingCode: "class Adapter {\n  constructor(oldAPI) { this.api = oldAPI; }\n  newMethod() { return this.api.oldMethod(); }\n}\n",
      hint: "API wrapping",
      test: "if (code.includes('Adapter')) return null; return 'Adapter kerak';"
    },
    {
      id: 11,
      title: "Module Pattern",
      instruction: "Module pattern bilan private/public qiling.",
      startingCode: "const Module = (function() {\n  const private = 'hidden';\n  return { public: () => private };\n})();\n",
      hint: "IIFE pattern",
      test: "if (code.includes('IIFE')) return null; return 'Module kerak';"
    },
    {
      id: 12,
      title: "Kompleks - Pattern Kombinatsiyasi",
      instruction: "Singleton + Factory + Observer birgalikda.",
      startingCode: "// EventEmitter (Observer) + Factory + Singleton\nclass App {\n  static get instance() { /* singleton */ }\n  static createService() { /* factory */ }\n  subscribe(event) { /* observer */ }\n}\n",
      hint: "Uchala pattern birgalikda",
      test: "if (code.includes('instance') && code.includes('create')) return null; return 'Kompleks kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Dasturlashda Singleton naqshi (Design Pattern) qanday maqsadlarda ishlatiladi?",
      options: [
        "Obyekt yaratish tezligini 10 barobarga oshirish",
        "Butun dastur davomida ma'lum bir klassdan faqat va faqat bitta namuna (instance) yaratilishini va unga yagona global kirish nuqtasini ta'minlash (masalan, Database connection, Config settings)",
        "Har xil turdagi obyektlarni bitta joyda guruhlash",
        "Klasslarni funksiyaga o'zgartirish"
      ],
      correctAnswer: 1,
      explanation: "Singleton klassi o'zining yagona namunasini statik xususiyatda saqlaydi va ikkinchi marta yaratmoqchi bo'lganda yangisini yaratmasdan o'sha birinchisini qaytaradi. Bu resurslarni tejash va umumiy holatni bitta joyda saqlash uchun juda foydali."
    },
    {
      id: 2,
      question: "Obyekt yaratish jarayonini (new operatorini) to'g'ridan-to'g'ri chaqirish o'rniga, uning turiga qarab alohida maxsus metod (yoki klass) orqali obyektdan nusxa olib beradigan yaratuvchi (creational) naqsh qaysi?",
      options: [
        "Observer Pattern",
        "Factory Pattern",
        "Decorator Pattern",
        "Strategy Pattern"
      ],
      correctAnswer: 1,
      explanation: "Factory pattern obyekt yaratish logikasini o'ziga oladi. Dasturchi unga qaysi turdagi obyekt kerakligini string yoki parametr orqali aytadi va Factory kerakli klassdan obyekt yaratib beradi."
    },
    {
      id: 3,
      question: "JavaScript-da `addEventListener` metodi qaysi mashhur xulq-atvor (behavioral) naqshiga asoslangan holda ishlaydi?",
      options: [
        "Singleton Pattern",
        "Observer (yoki Publish-Subscribe) Pattern",
        "Facade Pattern",
        "Adapter Pattern"
      ],
      correctAnswer: 1,
      explanation: "Observer naqshi biror obyektda (subject) o'zgarish bo'lganda, unga obuna bo'lgan boshqa ko'plab obyektlarni (observers) avtomat xabardor qilish uchun ishlatiladi. `addEventListener` aynan klik yoki boshqa hodisalarga obuna bo'lish namunasidir."
    },
    {
      id: 4,
      question: "Mavjud klassning kodini o'zgartirmasdan yoki undan vorislik (inheritance) olmasdan turib, unga dinamik ravishda yangi funksionallik yoki xatti-harakatlarni qo'shish (o'rash) imkonini beruvchi tarkibiy (structural) naqsh qaysi?",
      options: [
        "Decorator Pattern",
        "Singleton Pattern",
        "Factory Pattern",
        "Strategy Pattern"
      ],
      correctAnswer: 0,
      explanation: "Decorator naqshi asl obyektni o'rab oladigan boshqa wrapper-klasslar orqali uning xatti-harakatlarini kengaytiradi (masalan, oddiy qahvaga sut yoki shakar qo'shimchalarini qo'shib uning cost() funksiyasi qiymatini oshirish)."
    },
    {
      id: 5,
      question: "Bir nechta murakkab va chalkash quyi tizimlar (subsystems) ustidan oddiy va yagona interfeys taqdim etuvchi (masalan, to'lov qilish, email jo'natish va log yozishni bitta methodga birlashtiruvchi) naqsh qaysi?",
      options: [
        "Proxy Pattern",
        "Facade Pattern",
        "Strategy Pattern",
        "State Pattern"
      ],
      correctAnswer: 1,
      explanation: "Facade (Tashqi ko'rinish) naqshi murakkab quyi tizimlarni bitta sodda klass yoki metod orqali boshqarish interfeysini yaratib beradi, natijada mijoz (client) ichki detallar bilan chalkashmaydi."
    }
  ]
};
