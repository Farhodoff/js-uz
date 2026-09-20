export const encapsulation = {
  id: "encapsulation",
  title: "Inkapsulyatsiya: Private Maydonlar (#), Getter va Setter",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

**Inkapsulyatsiya (Encapsulation)** — obyektning ichki "oshxonasi"ni tashqaridan yashirish, faqat kerakli "ovqat"ni menyuga chiqarishdir.

### Real hayotiy o'xshatish
**Bankomatni** tasavvur qiling:
- Siz pul qo'yasiz, pul olasiz — bu **public interface** (menyu).
- Pulingiz qanday saqlanishi, hisob-kitob qanday yuritilishi — bu **private detallar** (oshxona). Siz bilmaysiz ham, bo'lsa kerak emas!

Agar har kim bankomat ichiga kirib, hisobni qo'lda "tuzatib" qo'ysa — fojia. Shuning uchun ichki holat yashirin, faqat maxsus metodlar orqali o'zgartiriladi.

\`\`\`javascript
class BankAccount {
  #balance = 0; // PRIVATE — tashqaridan ko'rinmaydi!

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
    } else {
      return "Mablag' yetarli emas";
    }
  }

  get balance() {
    return this.#balance; // faqat o'qish mumkin
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log(acc.balance); // 100
// console.log(acc.#balance); // SyntaxError — tashqaridan yopilgan!
\`\`\`

### Nima uchun kerak?
1. **Xato himoyasi** — hech kim ichki holatni buzib qo'ya olmaydi.
2. **Erkin refaktor** — ichki tuzilishni o'zgartirsangiz, tashqi kod buzilmaydi.
3. **Validatsiya** — ma'lumot faqat nazorat ostida kiradi (setter orqali).

---

## 2. ⚙️ Chuqur Tahlil (Ichki ishlash, xotira, V8 dvigateli, unumdorlik)

### Private maydonlarning 3 bosqichi (tarixiy rivojlanish)

**1-usul: Konventsiya (underscore) — "shartnoma bilan private"**
\`\`\`javascript
class User {
  constructor(name) {
    this._name = name; // _ — faqat ko'rsatma: "tekkilmang!"
  }
}
// Texnik jihatdan hali ham public: user._name ishlaydi
\`\`\`

**2-usul: Closure bilan haqiqiy private (WeakMap yoki local scope)**
\`\`\`javascript
function createUser(name) {
  let balance = 0; // closure ichida — tashqaridan umuman yo'q
  return {
    deposit: (a) => (balance += a),
    getBalance: () => balance,
  };
}
// Haqiqiy private, lekin har bir nusxa uchun metodlar nusxalanadi (xotira ortadi)
\`\`\`

**3-usul: \`#\` private fields (ES2022) — til darajasida himoya**
\`\`\`javascript
class Wallet {
  #money = 0;
  static #count = 0; // static private ham bor
  #secret = "hushyor";
}
\`\`\`

### \`#\` maydonlari qanday ishlaydi?
V8 dvigatelida \`#\` maydonlar odatiy property sifatida saqlanmaydi — ular **ichki niyat (private symbol) bilan bog'langan maxsus slot**larda turadi. Shu sababli:
- \`Object.keys()\`, \`for...in\`, \`JSON.stringify\` — ularni **umuman ko'rmaydi**.
- \`Object.freeze()\` ham ularni musodara qila olmaydi.
- \`obj["#money"]\` — ishlamaydi, \`#\` sintaksis faqat statik yozuv bilan.

### Getter/Setter mexanizmi
Getter/setter — property descriptor'ning \`get\`/\`set\` funksiyalari bilan amalga oshadi:

\`\`\`javascript
const obj = {
  _x: 1,
  get x() { return this._x; },
  set x(v) { this._x = v; }
};
const d = Object.getOwnPropertyDescriptor(obj, "x");
// { get: f, set: f, enumerable: true, configurable: true }
// value va writable yo'q — getter/setter bilan almashtirilgan!
\`\`\`

V8 bunday accessor'larni inline-cache qiladi, shuning uchun oddiy property bilan orasidagi farq amalda sezilarli emas.

---

## 3. ⚠️ Murakkab Holatlar va Senior Intervyu Savollari

### 1. \`#\` maydonlariga olishga urinish — "branding" muammosi
Private maydon \`#\` bilan **klass ichida e'lon qilinmagan bo'lsa**, uni ishlatishga urinish \`TypeError\` (xato "is not declared" emas, "undeclared private field") beradi. Bu qutulmagan brand mexanizmi:

\`\`\`javascript
class A {
  #x = 1;
  getX(obj) {
    return obj.#x; // ✅ faqat A tanasida yozilgan bo'lsa
  }
}
class B {}
const a = new A();
// a.#x tashqaridan — SyntaxError
\`\`\`

### 2. \`in\` operatori va private maydonlar
ES2022 bilan \`#\` maydonlarni \`in\` bilan tekshirish mumkin (klass ichidan):

\`\`\`javascript
class C {
  static has(obj) {
    return #x in obj; // C ning #x maydoni bormi?
  }
  #x = 1;
}
\`\`\`

### 3. Getter/setter'da cheksiz rekursiya tuzoqi
\`\`\`javascript
class Bad {
  name = ""; // ❌ property getter bilan bir nomda bo'lsa — kutyagi xato!
  get name() { return this.name; } // cheksiz rekursiya (RangeError)
}
class Good {
  _name = ""; // ✅ orqa maydon boshqa nomda
  get name() { return this._name; }
  set name(v) { this._name = v; }
}
\`\`\`

### 4. \`Object.freeze\` vs \`#\`
\`Object.freeze(obj)\` — barcha **public** property'larni o'zgartirilmaydigan qiladi, ammo:
- Ichki (nested) obyektlarni **muzlatmaydi** (deep freeze emas).
- \`#\` maydonlar unga qarab o'zgarishda davom etadi (ular allaqachon tashqaridan o'zgarmas edi).

### 5. Private metodlar va \`delete\`
\`#\` metodlar ham bor: \`#recount() {}\`. Bular \`delete\` qilib bo'lmaydi va meros bo'lib bermaydi (subclass'dan ko'rinmaydi!) — bu inkapsulyatsiyaning cho'qqisi.

> [!IMPORTANT]
> \`#\` maydonlar **prototip zanjiri orqali meros olinmaydi** — subclass ichida ota klassning \`#\` maydonlariga murojaat qilib bo'lmaydi. Buning uchun ota klassdagi public getterlardan foydalanish kerak.

---

## 4. 📊 Mermaid Diagrammasi

\`\`\`mermaid
graph TD
    A["Obyekt tashqarisi"] -->|"✅ public metodlar"| B["Public API"]
    A -->|"❌ SyntaxError"| C["#balance"]
    B -->|"✅ ichidan murojaat"| C
    C --> D["Ichki holat himoyalangan"]
    B -->|"get balance"| E["Faqat o'qish ruxsati"]
    style A fill:#f9f,stroke:#333
    style C fill:#f66,stroke:#333
    style D fill:#bfb,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Private maydon",
      instruction: "`Wallet` klassi yozing: `#money = 0` private maydon, `add(amount)` metodi uni oshiradi, `getMoney()` — qiymatini qaytaradi.",
      startingCode: "// Wallet klassini yozing\n",
      hint: "class Wallet { #money = 0; add(a) { this.#money += a; } getMoney() { return this.#money; } }",
      test: "const fn = new Function(code + '; const w = new Wallet(); w.add(50); return w.getMoney();'); if (fn() === 50) return null; return 'add(50) dan keyin getMoney() 50 qaytarsin';"
    },
    {
      id: 2,
      title: "Private maydonni yashirish",
      instruction: "`Secret` klassi yozing: `#code = 42` bor. `isCodeHidden(obj)` funksiyasi yozing — u `Object.keys(new Secret())` uzunligi 0 ekanligini tekshirsin.",
      startingCode: "class Secret {\n  // #code maydonini yozing\n}\nfunction isCodeHidden(obj) {\n  // Object.keys bilan tekshiring\n}",
      hint: "return Object.keys(new Secret()).length === 0;",
      test: "const fn = new Function(code + '; return isCodeHidden(new Secret());'); if (fn() === true) return null; return 'Object.keys #code maydonini ko\\'rmasligi kerak';"
    },
    {
      id: 3,
      title: "Bank hisobi",
      instruction: "`Account` klassi: `#balance = 0`, `deposit(a)` — faqat musbat son qabul qiladi, `withdraw(a)` — balans yetarli bo'lsa yechildi (true) qaytarsin, aks holda false.",
      startingCode: "// Account klassini yozing\n",
      hint: "withdraw(a) { if (a > 0 && a <= this.#balance) { this.#balance -= a; return true; } return false; }",
      test: "const fn = new Function(code + '; const a = new Account(); a.deposit(100); const ok = a.withdraw(150); const nok = a.withdraw(50); return [ok, nok, a.getBalance()];'); const r = fn(); if (r && r[0] === false && r[1] === true && r[2] === 50) return null; return 'Balansni nazorat qiling';"
    },
    {
      id: 4,
      title: "Getter bilan o'qish",
      instruction: "`Circle` klassi: `#radius` private. `area` getteri — `Math.PI * #radius ** 2` qaytarsin.",
      startingCode: "class Circle {\n  constructor(r) { this.#radius = r; }\n  // #radius maydoni va area getteri\n}",
      hint: "#radius = 0; get area() { return Math.PI * this.#radius ** 2; }",
      test: "const fn = new Function(code + '; return Math.round(new Circle(10).area);'); if (fn() === 314) return null; return 'area getter ~314 qaytarsin (radius 10)';"
    },
    {
      id: 5,
      title: "Setter bilan nazorat",
      instruction: "`Speed` klassi: `#value = 0` va `value` setteri — faqat 0..200 oralig'idagi qiymatlarni qabul qilsin, boshqalarini ignore. Getter ham bo'lsin.",
      startingCode: "class Speed {\n  // #value maydoni va value get/set\n}",
      hint: "set value(v) { if (v >= 0 && v <= 200) this.#value = v; } get value() { return this.#value; }",
      test: "const fn = new Function(code + '; const s = new Speed(); s.value = 100; const a = s.value; s.value = 500; return [a, s.value];'); const r = fn(); if (r && r[0] === 100 && r[1] === 100) return null; return '500 qiymati ignore qilinishi kerak';"
    },
    {
      id: 6,
      title: "Read-only property",
      instruction: "`Clock` klassi: `constructor` ichida `#start = Date.now()` o'rnatilsin. `uptime` getteri — o'tgan soniyalarni qaytarsin (round bilan). Setter yo'q!",
      startingCode: "class Clock {\n  // #start va uptime getteri\n}",
      hint: "#start = Date.now(); get uptime() { return Math.round((Date.now() - this.#start) / 1000); }",
      test: "const fn = new Function(code + '; return typeof Object.getOwnPropertyDescriptor(new Clock(), \"uptime\");'); if (fn() === 'undefined') return null; return 'uptime getter bo\\'lishi kerak (descriptor yo\\'q — bu accessor)';"
    },
    {
      id: 7,
      title: "Private metod",
      instruction: "`Calculator` klassi: `#double(n)` private metodi bor — n*2 qaytaradi. `quad(n)` public metodi — `#double(#double(n))` qaytarsin.",
      startingCode: "class Calculator {\n  // #double private metodi va quad public metodi\n}",
      hint: "#double(n) { return n * 2; } quad(n) { return this.#double(this.#double(n)); }",
      test: "const fn = new Function(code + '; return new Calculator().quad(5);'); if (fn() === 20) return null; return 'quad(5) = 20 bo\\'lishi kerak';"
    },
    {
      id: 8,
      title: "Closure bilan private",
      instruction: "`createCounter()` fabrika funksiyasini yozing: u `{ increment, getCount }` obyektini qaytarsin. Count closure ichida yashirin bo'lsin.",
      startingCode: "function createCounter() {\n  // closure bilan yozing\n}",
      hint: "let count = 0; return { increment: () => ++count, getCount: () => count };",
      test: "const fn = new Function(code + '; const c = createCounter(); c.increment(); c.increment(); return c.getCount();'); if (fn() === 2) return null; return 'Ikki incrementdan keyin count = 2 bo\\'lishi kerak';"
    },
    {
      id: 9,
      title: "Static private",
      instruction: "`User` klassi: `static #total = 0` va har `new User()` chaqirilganda oshsin. `static getTotal()` metodi bor bo'lsin.",
      startingCode: "class User {\n  // static #total va constructor + static getTotal\n}",
      hint: "static #total = 0; constructor() { User.#total++; } static getTotal() { return User.#total; }",
      test: "const fn = new Function(code + '; new User(); new User(); new User(); return User.getTotal();'); if (fn() === 3) return null; return '3 nusxa yaratilgach total = 3 bo\\'lishi kerak';"
    },
    {
      id: 10,
      title: "Validatsiyali setter",
      instruction: "`Email` klassi: `constructor(value)` ichida setter orqali o'rnatadi. `value` setteri — satrda '@' bo'lmasa, o'zgartirmasin (yoki xato tashlasin).",
      startingCode: "class Email {\n  // #value maydoni va value get/set\n}",
      hint: "set value(v) { if (typeof v === 'string' && v.includes('@')) this.#value = v; } get value() { return this.#value; }",
      test: "const fn = new Function(code + '; const e = new Email(); e.value = \\'x@y.com\\'; const a = e.value; e.value = \\'bad\\'; return [a, e.value];'); const r = fn(); if (r && r[0] === 'x@y.com' && r[1] === 'x@y.com') return null; return '@ bo\\'lmagan qiymat qabul qilinmasligi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Inkapsulyatsiya nima?",
      options: [
        "Kodni qisqartirish",
        "Ichki holatni yashirib, faqat nazoratli interfeys qoldirish",
        "Klasslarni fayllarga bo'lish",
        "Funksiyalarni zanjirlash"
      ],
      correctAnswer: 1,
      explanation: "Inkapsulyatsiya — ichki maydonlarni yashirish va ularga faqat metodlar (API) orqali kirish."
    },
    {
      id: 2,
      question: "Haqiqiy private maydon qaysi belgi bilan yoziladi (ES2022)?",
      options: ["_", "$", "#", "@@"],
      correctAnswer: 2,
      explanation: "`#` prefiks — til darajasidagi haqiqiy private maydon."
    },
    {
      id: 3,
      question: "`Object.keys()` private (#) maydonlarni ko'radimi?",
      options: ["Ha", "Yo'q, ular ko'rinmaydi", "Faqat statik maydonlarni", "Faqat getterlarni"],
      correctAnswer: 1,
      explanation: "`#` maydonlar enumerable emas — Object.keys, for...in va JSON.stringify ularni ko'rmaydi."
    },
    {
      id: 4,
      question: "`this._name` uslubidagi underscore nima anglatadi?",
      options: [
        "Til darajasida private",
        "Faqat konventsiya — texnik jihatdan public",
        "Statik maydon",
        "O'zgarmas maydon"
      ],
      correctAnswer: 1,
      explanation: "Underscore — 'tekkilmang' degan shartnoma, lekin `obj._name` tashqaridan ishlaydi."
    },
    {
      id: 5,
      question: "Getter qanday chaqiriladi?",
      options: ["obj.prop()", "obj.prop", "obj.get()", "get(obj.prop)"],
      correctAnswer: 1,
      explanation: "Getter property kabi qavslarsiz o'qiladi: `obj.prop`."
    },
    {
      id: 6,
      question: "Getter bilan bir xil nomli oddiy property yozilsa nima bo'ladi?",
      options: [
        "Ikkalasi ham ishlaydi",
        "Cheksiz rekursiya (RangeError)",
        "SyntaxError",
        "Getter e'tiborga olinmaydi"
      ],
      correctAnswer: 1,
      explanation: "Getter ichida o'zini o'qisa — cheksiz rekursiya. Orqa maydon (`_name`) alohida nomda bo'lishi kerak."
    },
    {
      id: 7,
      question: "`#` maydonlar meros olinadimi (subclass'dan ko'rinadimi)?",
      options: ["Ha", "Yo'q, faqat e'lon qilingan klass ichida", "Faqat static bo'lsa", "Faqat getter orqali"],
      correctAnswer: 1,
      explanation: "`#` maydonlar klassga 'brand' qilingan — subclass ularni ko'rmaydi."
    },
    {
      id: 8,
      question: "Closure bilan private qilishning kamchiligi nima?",
      options: [
        "Ishlamaydi",
        "Metodlar har nusxa uchun nusxalanadi (xotira ortadi)",
        "Sekinroq kompilyatsiya",
        "Oldingi brauzerlar qo'llamaydi"
      ],
      correctAnswer: 1,
      explanation: "Closure fabrikasida metodlar har obyektda yangi yaratiladi — prototype'dagi umumiy metodlar kabi samarali emas."
    },
    {
      id: 9,
      question: "`static #count` nima?",
      options: ["Xato sintaksis", "Statik private maydon", "Oddiy statik maydon", "Constanta"],
      correctAnswer: 1,
      explanation: "Statik private maydonlar ham mumkin: klassning o'zida yashirin, nusxalarda yo'q."
    },
    {
      id: 10,
      question: "`Object.freeze()` nimani muzlatmaydi?",
      options: ["Public property'lar", "Ichma-ich (nested) obyektlar", "Funksiyalar", "Massivlar"],
      correctAnswer: 1,
      explanation: "Freeze — sayoz: ichki obyektlar o'zgaruvchan qoladi (deep freeze qilish kerak bo'ladi)."
    },
    {
      id: 11,
      question: "Setter nima uchun kerak?",
      options: [
        "Qiymatni tez o'qish",
        "Qiymat o'rnatishda validatsiya/logika bajarish",
        "Metodlarni yashirish",
        "Klassni kichraytirish"
      ],
      correctAnswer: 1,
      explanation: "Setter — o'rnatish jarayonini nazorat qilish: validatsiya, log, transformatsiya."
    },
    {
      id: 12,
      question: "`obj.#x` tashqaridan yozilsa nima bo'ladi?",
      options: ["undefined qaytadi", "SyntaxError", "silent fail", "null"],
      correctAnswer: 1,
      explanation: "`#` sintaksis tashqarida umuman parse qilinmaydi — SyntaxError."
    }
  ]
};
