export const oopPrinciples = {
  id: "oopPrinciples",
  title: "OOP'ning 4 Asosiy Prinsipi (SOLID yo'lida)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

OOP'ning to'rt ustuni bor. Ularni **restoran** misolida ko'ramiz. Avval umumiy manzara — so'ng har bir prinsipni alohida bo'limda chuqur tahlil qilamiz.

### 1. Inkapsulyatsiya (Encapsulation) — "Oshxona yopiq"
Mijoz taomni buyurtma qiladi, oshxona ichida nima bo'layotganini ko'rmaydi. Ichki holat \`#\` private maydonlarda yashirin, faqat metodlar orqali kiriladi.

### 2. Meros (Inheritance) — "Franchayzing"
Markaziy retseptlar (ota klass) bor. Har filial (voris) ularni oladi va o'z mahalliy taomlarini qo'shadi. Narsalarni qaytadan yozmaysiz.

### 3. Polimorfizm (Polymorphism) — "Bir menyu, turli oshpazlar"
"Buyurtma qabul qilish" barcha xodimlar uchun bir xil metod, lekin ofitsiant, oshpaz va kassir uni o'zicha bajaradi. Chaqiruvchi **kim bajarishini bilishi shart emas**.

### 4. Abstraktsiya (Abstraction) — "Faqat menyuga qarang"
Mijoz taom nomini biladi, uning 47 ta ingredientini emas. Murakkablik yashirin, interfeys sodda.

\`\`\`javascript
// 1. INKAPSULYATSIYA
class CoffeeMachine {
  #water = 100;     // yashirin
  #beans = 50;      // yashirin

  brew() {          // public interfeys
    if (this.#water < 10 || this.#beans < 5) return "Resurs yetarli emas";
    this.#water -= 10;
    this.#beans -= 5;
    return "Kofe tayyor ☕";
  }
}

// 2. MEROS + 3. POLIMORFIZM + 4. ABSTRAKTSIYA
class Payment {
  pay(amount) { // umumiy shartnoma
    throw new Error("Abstrakt metod — voris yozishi kerak");
  }
}

class CardPayment extends Payment {
  pay(amount) { return \`Karta orqali \\\${amount} to\`landi\`; }
}
class CashPayment extends Payment {
  pay(amount) { return \`Naqd \\\${amount} olindi\`; }
}

// Chaqiruvchi turini bilmaydi — faqat shartnomaga tayanadi (polimorfizm):
function checkout(payment, amount) {
  return payment.pay(amount);
}
\`\`\`

---

## 1.1 🔒 Inkapsulyatsiya (Encapsulation) — chuqur

**Ta'rif:** Obyektning ichki holati (data) va xatti-harakatini (metodlar) bitta birlikka jamlash hamda ichki detallarni tashqi dunyodan yashirish.

**Analogiya:** Telefon — siz faqat tugmalar (public interfeys) bilan ishlaysiz, ichki plata (yashirin holat) bilan emas.

**Prinsipsiz nima bo'ladi?**

\`\`\`javascript
// ❌ Ochiq obyekt — istalgan joydan buzilishi mumkin
const account = { owner: "Ali", balance: 1000 };
account.balance = -99999; // hech kim to'sqinlik qilmadi!
account.owner = 42;       // tip buzildi — hech kim tekshirmadi
\`\`\`

**Prinsip bilan:**

\`\`\`javascript
class BankAccount {
  #balance = 0;
  #owner;

  constructor(owner) {
    this.#owner = owner;
  }

  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Noto'g'ri summa");
    }
    this.#balance += amount;
    return this.#balance;
  }

  get balance() { return this.#balance; } // faqat o'qish
}

const acc = new BankAccount("Ali");
acc.deposit(500);
// acc.#balance = -99999; // ❌ SyntaxError — til darajasida himoya
\`\`\`

**Asosiy foyda:** validatsiya bitta joyda. Qoidani o'zgartirsangiz, faqat shu klassni tuzatasiz — loyiha bo'ylab 100 ta foydalanuvchi joyini emas.

---

## 1.2 🧬 Meros olish (Inheritance) — chuqur

**Ta'rif:** Bir klass boshqa klassning property va metodlarini oladi ("is-a" — "bu ... dir" munosabati).

**Analogiya:** Franchayzing — markaziy retseptlarni olasiz, mahalliy taom qo'shasiz. Narsalarni qaytadan yozmaysiz.

**Prinsipsiz nima bo'ladi?** — copy-paste gellosi: 3 klassda bir xil \`validate()\` metodi 3 marta yoziladi; xato topsangiz 3 joyda tuzatishga to'g'ri keladi va bir joyini unutasiz.

\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  eat() { return this.name + " yeyapti"; }
}

class Dog extends Animal {
  bark() { return this.name + ": vov-vov"; }
}

const dog = new Dog("Rex");
dog.eat();  // ota klassdan meros olindi
dog.bark(); // o'z metodi
\`\`\`

**super bilan kengaytirish:**

\`\`\`javascript
class Cat extends Animal {
  constructor(name, indoor) {
    super(name);        // 1) ota klassni ishga tushirish (majburiy!)
    this.indoor = indoor;
  }

  eat() { return super.eat() + " (uyda)"; } // override + kengaytirish
}
\`\`\`

**Qachon ISHLATMANG:** "has-a" munosabat bo'lsa (Car **has** Engine) — kompozitsiya ishlating. Meros — eng kuchli (mo'rt) bog'lanish, faqat haqiqiy "is-a" bo'lsa oching.

---

## 1.3 🎭 Polimorfizm (Polymorphism) — chuqur

**Ta'rif:** Bir xil interfeys — turli obyektlar uni o'zicha bajaradi. Chaqiruvchi **turega bog'lanmaydi**, faqat shartnomaga tayanadi.

**Analogiya:** USB port — istalgan qurilma (flash, sichqoncha, klaviatura) bir xil portga ulanadi, har biri o'z ishini qiladi.

**Prinsipsiz nima bo'ladi?**

\`\`\`javascript
// ❌ Har yangi tur — switch'ga yangi case
function makeSound(animal) {
  switch (animal.type) {
    case "dog": return "vov";
    case "cat": return "miyov";
    // yangi hayvon qo'shsangiz — BU funksiyani o'zgartirasiz
  }
}
\`\`\`

**Prinsip bilan:**

\`\`\`javascript
class Dog { speak() { return "vov"; } }
class Cat { speak() { return "miyov"; } }
class Cow { speak() { return "moo"; } } // yangi tur — ESKI KODGA TEGMADIK

function makeSound(animal) {
  return animal.speak(); // hammasi bir xil shartnomaga ega
}

const animals = [new Dog(), new Cat(), new Cow()];
animals.map(makeSound); // ["vov", "miyov", "moo"]
\`\`\`

**Klassik ta'rif:** "Bir interfeys, ko'p implementatsiya". Bu Open/Closed prinsipining amaliy ko'rinishi — \`switch\` yozish o'rniga yangi klass yozasiz.

---

## 1.4 🎛️ Abstraktsiya (Abstraction) — chuqur

**Ta'rif:** Faqat muhim xususiyatlarni ko'rsatish, murakkab detallarni yashirish. Interfeys sodda, ichki mexanizm yashirin.

**Analogiya:** Mashinaning gas pedali — siz bosasiz, dvigatelning 12 bosqichli ishi yashirin qoladi.

**Abstraktsiya vs Inkapsulyatsiya — farqi (intervyuda so'raladi!):**
- **Inkapsulyatsiya** — DATA'ni yashirash (private maydonlar, getter/setter).
- **Abstraktsiya** — MURAKKABLIKni yashirash (sodda interfeys).
- Inkapsulyatsiya — abstraktsiyaga erishish **vositasi**.

**Prinsip bilan:**

\`\`\`javascript
class ImageUploader {
  // public — sodda interfeys (faqat 1 ta metod)
  async upload(file) {
    const validated = this.#validate(file);
    const compressed = await this.#compress(validated);
    return await this.#sendToServer(compressed);
  }

  // private — murakkablik butunlay yashirin
  #validate(file) { /* 30 qator tekshiruv */ return file; }
  async #compress(file) { /* worker'da siqish */ return file; }
  async #sendToServer(f) { return "https://cdn.example/img/1"; }
}

// Foydalanuvchi uchun — BIR QATOR:
// const url = await uploader.upload(file);
\`\`\`

**Amaliy qoida:** klassning public API'sidagi metodlar soni qancha kam bo'lsa, abstraktsiya shunchalik kuchli bo'ladi.

---

## 2. ⚙️ Chuqur Tahlil (Ichki ishlash, xotira, V8 dvigateli, unumdorlik)

### Prinsiplarning "nima uchun"i — arxitektura nuqtai nazaridan

**Inkapsulyatsiya → O'zgartirish xavfini lokalizatsiya qiladi.**
Ichki maydon yashirin bo'lsa, uni faqat 1 klass ichida refaktor qilasiz. Public maydon bo'lsa — loyiha bo'ylab 100 joyda ishlatilgan bo'lishi mumkin.

**Meros → Kod takrorini kamitadi, lekin xavfli qurol.**
"Meros" aloqa bog'laydi: voris ota klassning barcha tafsilotiga bog'lanadi. Shuning uchun zamonaviy prinsip: **"Kompozitsiyani merosga afzal ko'ring" (Favor Composition over Inheritance)**:

\`\`\`javascript
// ❌ Chuqur meros — mo'rt
class Car extends Vehicle { }
class ElectricCar extends Car { }

// ✅ Kompozitsiya — moslashuvchan
class Engine { start() {} }
class ElectricEngine extends Engine { start() { return "jim ishlaydi"; } }
class Car {
  constructor(engine) { this.engine = engine; } // "has-a" bog'lanish
  start() { return this.engine.start(); }
}
new Car(new ElectricEngine()).start();
\`\`\`

**Polimorfizm → Open/Closed Principle.**
Yangi tur qo'shish uchun eski \`switch\`larni o'zgartirmaysiz — yangi klass yozasiz. \`checkout(payment, ...)\` funksiyasi \`CardPayment\` mavjudligidan baxabbar.

**Abstraktsiya → Murakkablikni boshqarish.**
Abstrakt klass (yoki interfeys) **shartnoma**: "vorislarim shu metodlarni yozishi shart". JS'da til darajasida \`abstract\` yo'q, lekin konventsiya + xato tashlash bilan amalga oshiriladi.

### Abstraktni JS'da amalga oshirish usullari
\`\`\`javascript
// 1-usul: xato tashlash (klassik)
class Repository {
  save() { throw new Error("Implement save()!"); }
}

// 2-usul: new.target bilan abstraktlikni majburlash
class AbstractRepo {
  constructor() {
    if (new.target === AbstractRepo) {
      throw new Error("Abstrakt klassni instansiyalash mumkin emas");
    }
  }
}

// 3-usul: JSDoc @abstract — faqat hujjat (IDE yordam uchun)
\`\`\`

---

## 3. ⚠️ Murakkab Holatlar va Senior Intervyu Savollari

### 1. SOLID — OOP prinsiplarining professional davomi
| Harf | Nomlanish | Ma'nosi |
|------|-----------|---------|
| **S** | Single Responsibility | Bir klass — bitta mas'uliyat |
| **O** | Open/Closed | Kengaytirishga och, o'zgartirishga yopiq |
| **L** | Liskov Substitution | Voris ota o'rnida muammosiz ishlashi kerak |
| **I** | Interface Segregation | Katta interfeysni kichiklarga bo'lish |
| **M** (D) | Dependency Inversion | Konkretlarga emas, abstraktsiyaga tayan |

\`Payment\` misoli — aynan **D** va **O**: \`checkout\` konkret turlarga emas, abstraksiyaga bog'langan.

### 2. Liskov Substitution tuzoq misoli
\`\`\`javascript
class Rectangle {
  set width(w) { this._w = w; }
  set height(h) { this._h = h; }
  get area() { return this._w * this._h; }
}

class Square extends Rectangle {
  set width(w) { this._w = w; this._h = w; } // ❌ LSP buziladi!
  set height(h) { this._h = h; this._w = h; }
}

// Square — Rectangle "mantiqan" meros, ammo xulq-atvor boshqacha:
const r = new Square();
r.width = 4; r.height = 5; // r.area = 20 kutilgan, lekin 25!
\`\`\`
**Xulosa:** "is-a" munosabati faqat **xulq-atvor** jihatidan to'g'ri bo'lishi kerak, matematik emas.

### 3. Composition vs Inheritance — qachon qaysi?
- **Inheritance:** haqiqiy "is-a" bo'lsa (Dog **is** Animal), ota klassning ichki tafsilotlarini bilish tabiiy bo'lsa.
- **Composition:** "has-a" bo'lsa (Car **has** Engine), xatti-harakat almashtirilishi kerak bo'lsa, ko'p o'lchovli kombinatsiyalar bo'lsa.

### 4. "4 prinsipni bir jumlada" — intervyu xulosasi

| Prinsip | Bir jumlada | JS vositasi |
|---------|-------------|-------------|
| Inkapsulyatsiya | Data'ni yashir, faqat metod orqali kirit | \`#private\`, getter/setter |
| Meros | "is-a" bo'lsa, qayta ishlatish uchun | \`extends\`, \`super\` |
| Polimorfizm | Bir interfeys, ko'p xatti-harakat | override, duck typing |
| Abstraktsiya | Murakkablikni yashir, sodda interfeys | abstrakt klass, interfeys shartnomasi |

### 5. Duck typing — JS'ning "nominal emas, strukturali" polimorfizmi

JS'da klasslar orasidagi bog'liqlik emas, **shakl** muhim:
\`\`\`javascript
function checkout(p) { return p.pay(100); }
// Klass bo'lmasa ham — pay() metodli HAR QANDAY obyekt ishlaydi:
checkout({ pay: (a) => \`To\`landi \\\${a}\` }); // ✅
\`\`\`
Bu "Agar u o'rdakdek yursa — o'rdak" tamoyili. TypeScript'ni \`structuraltip\` ham shundan keladi.

### 6. 4 prinsip birgalikda — to'liq misol

Bitta to'lov tizimida 4 prinsip ham birga ishlaydi:

\`\`\`javascript
class Payment {                       // 4) ABSTRAKTSIYA: sodda shartnoma
  #amount = 0;                        // 1) INKAPSULYATSIYA: yashirin holat
  constructor(amount) {
    if (amount <= 0) throw new Error("Summa > 0 bo'lishi kerak");
    this.#amount = amount;
  }
  get amount() { return this.#amount; }          // 1) nazorat qilingan o'qish
  pay() { throw new Error("Voris pay() yozishi shart"); } // 4) shartnoma
}

class CardPayment extends Payment {   // 2) MEROS: shartnomadan meros oladi
  pay() { return "Karta: " + this.amount + " so'm"; }     // 3) POLIMORFIZM
}

class CashPayment extends Payment {
  pay() { return "Naqd: " + this.amount + " so'm"; }
}

// Chaqiruvchi — turlardan mustaqil (polimorfizm + abstraktsiya):
function checkout(p) { return p.pay(); }
checkout(new CardPayment(50000)); // "Karta: 50000 so'm"
checkout(new CashPayment(20000)); // "Naqd: 20000 so'm"
\`\`\`

- **Payment** — murakkablikni yashiradi, faqat \`pay()\` va \`amount\` beradi (abstraktsiya).
- **#amount** — tashqaridan buzmab bo'lmaydi (inkapsulyatsiya).
- **extends** — umumiy qismlarni qayta yozmaymiz (meros).
- **pay()** — har voris o'zicha bajaradi (polimorfizm).

---

## 4. 📊 Mermaid Diagrammasi

4 prinsip va ularning bog'lanishi:

\`\`\`mermaid
graph TD
    A["OOP 4 ustuni"] --> B["Inkapsulyatsiya<br/>#private + interfeys"]
    A --> C["Meros<br/>extends + super"]
    A --> D["Polimorfizm<br/>override + umumiy shartnoma"]
    A --> E["Abstraktsiya<br/>sodda interfeys, yashirin murakkablik"]
    C --> D
    B --> E
    D --> F["Open/Closed + Liskov"]
    E --> F
    style A fill:#f9f,stroke:#333
    style F fill:#bfb,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Inkapsulyatsiya amaliyoti",
      instruction: "`SafeBox` klassi yozing: `#secret` private, `setSecret(v)` va `getSecret()` metodlari bor bo'lsin.",
      startingCode: "// SafeBox klassini yozing\n",
      hint: "class SafeBox { #secret = null; setSecret(v) { this.#secret = v; } getSecret() { return this.#secret; } }",
      test: "const fn = new Function(code + '; const s = new SafeBox(); s.setSecret(\\'x\\'); return s.getSecret();'); if (fn() === 'x') return null; return 'Private maydon va metodlarni yozing';"
    },
    {
      id: 2,
      title: "Abstrakt klass",
      instruction: "`AbstractRepo` klassi yozing: `constructor` ichida `new.target === AbstractRepo` bo'lsa `Error` tashlaydi. `FileRepo` undan meros olsin (yaratilsa xato bermasin).",
      startingCode: "class AbstractRepo {\n  // abstrakt himoyani yozing\n}\nclass FileRepo extends AbstractRepo {}",
      hint: "if (new.target === AbstractRepo) throw new Error('Abstrakt');",
      test: "const fn = new Function(code + '; try { new AbstractRepo(); return \\'no-error\\'; } catch(e) { const ok = new FileRepo(); return \\'ok\\'; }'); if (fn() === 'ok') return null; return 'Abstrakt himoya FileRepo ishini buzmasligi kerak';"
    },
    {
      id: 3,
      title: "Polimorfizm bilan dispecher",
      instruction: "`checkout(payment)` funksiyasini yozing — u `payment.pay(100)` natijasini qaytarsin. `CardPayment` va `CashPayment` klasslarini yarating.",
      startingCode: "// Payment klasslarini va checkout funksiyasini yozing\n",
      hint: "class CardPayment { pay(a) { return 'Card ' + a; } } class CashPayment { pay(a) { return 'Cash ' + a; } } function checkout(p) { return p.pay(100); }",
      test: "const fn = new Function(code + '; return [checkout(new CardPayment()), checkout(new CashPayment())];'); const r = fn(); if (r && r[0] === 'Card 100' && r[1] === 'Cash 100') return null; return 'Har bir klass o\\'z pay() metodini yozishi kerak';"
    },
    {
      id: 4,
      title: "Duck typing",
      instruction: "`canPay(obj)` funksiyasini yozing — obj da `pay` metod bo'lsa true, aks holda false (klass bo'lsa shart emas).",
      startingCode: "function canPay(obj) {\n  // kodni yozing\n}",
      hint: "return typeof obj.pay === 'function';",
      test: "const fn = new Function(code + '; return [canPay({pay(){}}), canPay({})];'); const r = fn(); if (r && r[0] === true && r[1] === false) return null; return 'Faqat pay metodi mavjudligini tekshiring';"
    },
    {
      id: 5,
      title: "Kompozitsiya",
      instruction: "`Car` klassi `constructor(engine)` qabul qiladi. `start()` — `engine.start()` natijasini qaytarsin. `TurboEngine` — `'Vroom'` qaytarsin.",
      startingCode: "// Car va TurboEngine klasslarini yozing\n",
      hint: "class TurboEngine { start() { return 'Vroom'; } } class Car { constructor(e) { this.engine = e; } start() { return this.engine.start(); } }",
      test: "const fn = new Function(code + '; return new Car(new TurboEngine()).start();'); if (fn() === 'Vroom') return null; return 'Car engine obyektini ishlatishi kerak';"
    },
    {
      id: 6,
      title: "Single Responsibility",
      instruction: "`isEmail(v)` funksiyasini yozing (faqat validatsiya) va `saveToDb(v)` funksiyasini (faqat saqlash — `'saved'` qaytarsin). Ikkita mas'uliyatni ajratgan hol.",
      startingCode: "// ikki alohida funksiya yozing\n",
      hint: "function isEmail(v) { return v.includes('@'); } function saveToDb(v) { return 'saved'; }",
      test: "const fn = new Function(code + '; return [isEmail(\\'a@b\\'), isEmail(\\'bad\\'), saveToDb(\\'a@b\\')];'); const r = fn(); if (r && r[0] === true && r[1] === false && r[2] === 'saved') return null; return 'Ikkita funksiya alohida mas\\'uliyatga ega bo\\'lsin';"
    },
    {
      id: 7,
      title: "Liskov tuzoq",
      instruction: "`Bird` klassida `fly()` — `'uchmoqda'` qaytaradi. `Penguin extends Bird` yozing lekin `fly()` — `'suzmoqda'` qaytarsin (LSP buzilishini ko'rsatish uchun `describe(bird)` funksiyasi ham yozilsin).",
      startingCode: "class Bird {\n  fly() { return 'uchmoqda'; }\n}\n// Penguin va describe funksiyasini yozing\n",
      hint: "class Penguin extends Bird { fly() { return 'suzmoqda'; } } function describe(b) { return b.fly(); }",
      test: "const fn = new Function(code + '; return [describe(new Bird()), describe(new Penguin())];'); const r = fn(); if (r && r[0] === 'uchmoqda' && r[1] === 'suzmoqda') return null; return 'Penguin fly ni override qilishi kerak';"
    },
    {
      id: 8,
      title: "Open/Closed",
      instruction: "`shapes` massivi bor (har birida `area()` metodi). `totalArea(shapes)` funksiyasi yozing — barcha yuza yig'indisini qaytarsin (turini bilmasdan!).",
      startingCode: "class Square { constructor(s) { this.s = s; } area() { return this.s ** 2; } }\nclass Circle { constructor(r) { this.r = r; } area() { return 3 * this.r * this.r; } }\nfunction totalArea(shapes) {\n  // har birining area() ni yig'ing\n}",
      hint: "return shapes.reduce((sum, s) => sum + s.area(), 0);",
      test: "const fn = new Function(code + '; return totalArea([new Square(2), new Circle(1)]);'); if (fn() === 7) return null; return 'totalArea har bir shape.area() ni yig\\'ishi kerak';"
    },
    {
      id: 9,
      title: "Interfeys shartnomasi",
      instruction: "`ensureImplements(obj, methods)` funksiyasini yozing — obj da barcha `methods` nomlari funksiya bo'lmasa Error tashlaydi, aks holda `'ok'` qaytaradi.",
      startingCode: "function ensureImplements(obj, methods) {\n  // tekshiruvni yozing\n}",
      hint: "for (const m of methods) { if (typeof obj[m] !== 'function') throw new Error('Missing ' + m); } return 'ok';",
      test: "const fn = new Function(code + '; try { ensureImplements({a(){}}, [\\'a\\', \\'b\\']); return \\'no\\'; } catch(e) { return \\'ok\\'; }'); if (fn() === 'ok') return null; return 'Yetishmagan metod uchun Error tashlashingiz kerak';"
    },
    {
      id: 10,
      title: "To'liq mini-arxitektura",
      instruction: "`Notifier` abstrakt (xato tashlaydi), `EmailNotifier` va `SmsNotifier` vorislari bor. `notifyAll(list, msg)` funksiyasi barcha notifierlarni ishlatib natijalarni massiv qaytarsin.",
      startingCode: "// Notifier, EmailNotifier, SmsNotifier, notifyAll yozing\n",
      hint: "class EmailNotifier { send(m) { return 'Email: ' + m; } } class SmsNotifier { send(m) { return 'SMS: ' + m; } } function notifyAll(list, msg) { return list.map(n => n.send(msg)); }",
      test: "const fn = new Function(code + '; return notifyAll([new EmailNotifier(), new SmsNotifier()], \\'hi\\');'); const r = fn(); if (r && r[0] === 'Email: hi' && r[1] === 'SMS: hi') return null; return 'notifyAll har bir notifier.send() ni chaqirishi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "OOP'ning 4 asosiy prinsipi qaysilar?",
      options: [
        "Loop, Function, Array, Object",
        "Inkapsulyatsiya, Meros, Polimorfizm, Abstraktsiya",
        "HTML, CSS, JS, API",
        "Sync, Async, Promise, Callback"
      ],
      correctAnswer: 1,
      explanation: "OOP 4 ustuni: Encapsulation, Inheritance, Polymorphism, Abstraction."
    },
    {
      id: 2,
      question: "Abstraktsiya nima?",
      options: [
        "Barcha detallarni ochiq qoldirish",
        "Faqat muhim interfeysni ko'rsatib, murakkablikni yashirish",
        "Klasslarni kichraytirish",
        "Funksiyalarni arrow qilib yozish"
      ],
      correctAnswer: 1,
      explanation: "Abstraktsiya — foydalanuvchiga kerakli interfeysni berib, ichki murakkablikni yashirish."
    },
    {
      id: 3,
      question: "Polimorfizm qanday muammoni yechadi?",
      options: [
        "Xotira tejash",
        "Yangi turlar qo'shilganda eski kodni o'zgartirmaslik (Open/Closed)",
        "Kod qisqartirish",
        "Xatolarni yashirish"
      ],
      correctAnswer: 1,
      explanation: "Polimorfizm bilan yangi tur qo'shish — yangi klass; mavjud chaqiruvlar o'zgarmaydi."
    },
    {
      id: 4,
      question: "\"Favor composition over inheritance\" deganda nima tushuniladi?",
      options: [
        "Merosni har doim ishlating",
        "\"has-a\" bog'lanishni \"is-a\"dan afzal ko'ring",
        "Klasslarni umuman yozmang",
        "Faqat obyekt literal ishlating"
      ],
      correctAnswer: 1,
      explanation: "Kompozitsiya (obyektni ichida saqlash) — merosdan moslashuvchanroq va mo'rt emas."
    },
    {
      id: 5,
      question: "Liskov Substitution prinsipi nima?",
      options: [
        "Voris ota o'rnida muammosiz ishlashi kerak",
        "Klasslar kichik bo'lishi kerak",
        "Funksiyalar toza bo'lishi kerak",
        "Merosdan foydalanmang"
      ],
      correctAnswer: 0,
      explanation: "LSP: subclass klass ota klassning istalgan joyida kutilgan xulq-atvorni buzmasdan ishlatila olishi."
    },
    {
      id: 6,
      question: "JS'da `abstract` kalit so'zi bormi?",
      options: ["Ha, ES6'dan", "Yo'q, konventsiya/xato tashlash bilan", "Faqat TS'da ham yo'q", "ES2023'da kirdi"],
      correctAnswer: 1,
      explanation: "JS'da abstract yo'q — constructor'da new.target tekshiruvi yoki xato tashlash bilan simulyatsiya qilinadi."
    },
    {
      id: 7,
      question: "Duck typing nimani anglatadi?",
      options: [
        "Faqat klasslar ishlaydi",
        "Shakl (metodlar mavjudligi) muhim, klass nomi emas",
        "Tiplar qat'iy tekshiriladi",
        "Massivlar bilan ishlash"
      ],
      correctAnswer: 1,
      explanation: "JS strukturali tip: kerakli metod bor bo'lsa — obyekt mos, klassidan qat'i nazar."
    },
    {
      id: 8,
      question: "Single Responsibility nima?",
      options: [
        "Bir faylda bitta klass",
        "Bir klass — bitta o'zgarish sababi/bitta mas'uliyat",
        "Bir metodda bitta qator",
        "Bitta instansiya"
      ],
      correctAnswer: 1,
      explanation: "SRP — klass bitta vazifaga mas'ul bo'lishi, bitta o'zgarish sababi bo'lishi."
    },
    {
      id: 9,
      question: "Open/Closed prinsipi nima?",
      options: [
        "Fayllar ochiq bo'lishi kerak",
        "Kengaytirishga och, o'zgartirishga yopiq",
        "Kod ochiq manba bo'lishi kerak",
        "Klasslar public bo'lishi kerak"
      ],
      correctAnswer: 1,
      explanation: "Yangi funksionallik — mavjud kodni o'zgartirmasdan, kengaytirish orqali qo'shiladi."
    },
    {
      id: 10,
      question: "Dependency Inversion nima?",
      options: [
        "Dependency'larni o'chirish",
        "Konkretlarga emas, abstraktsiyalarga tayanish",
        "Funksiyalarni teskari chaqirish",
        "Promise'ni await qilish"
      ],
      correctAnswer: 1,
      explanation: "Yuqori darajadagi modullar abstraksiyaga bog'lanadi — konkret implementatsiya oson almashtiriladi."
    },
    {
      id: 11,
      question: "Car (has Engine) uchun qaysi bog'lanish tabiiiy?",
      options: ["Meros (extends)", "Kompozitsiya (constructor'da qabul qilish)", "Global o'zgaruvchi", "Static metod"],
      correctAnswer: 1,
      explanation: "\"has-a\" munosabatda kompozitsiya ishlatiladi — engine almashtiriladigan bo'ladi."
    },
    {
      id: 12,
      question: "Square extends Rectangle misoli qanday prinsipni buzadi?",
      options: ["SRP", "LSP (Liskov)", "ISP", "DRY"],
      correctAnswer: 1,
      explanation: "Square xulq-atvori Rectangle shartnomasini buzadi (width o'rnatish height ni ham o'zgartiradi) — LSP buziladi."
    }
  ]
};
