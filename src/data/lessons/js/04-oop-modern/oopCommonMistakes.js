export const oopCommonMistakes = {
  id: "oopCommonMistakes",
  title: "OOP Xatolarini Tushunish va Debugging",
  language: "javascript",
  theory: `## 1. 💡 Part 1: Sodda Tushuntirish (Beginner Analogy)

OOP'da eng ko'p uchraydigan xatolar **\`this\` yo'qolishi** va **prototip zanjiri noto'g'ri o'rnatilishi** atrofida aylanadi.

### Real hayotiy o'xshatish
\`this\` yo'qolishi — bu **"ismni eslab qolmaslik"**ga o'xshaydi:
- Obyekt metodi o'z ismini (kontekstini) **chaqiruvdan** oladi.
- Metodni boshqa joyga ko'chirsangiz (callback qilsangiz) — ism yo'qoladi, "Men kimman?" degan savol \`undefined\` javob beradi.

\`\`\`javascript
const user = {
  name: "Ali",
  sayName() { return this.name; },
  sayNameArrow() { return () => this.name; } // arrow tashqaridan oladi
};

// ✅ Normal chaqiruv
user.sayName(); // "Ali"

// ❌ Uzilgan chaqiruv — kontekst yo'qoladi
const lost = user.sayName;
lost(); // undefined

// ❌ Callback orqali (eng ko'p uchraydigan holat!)
setTimeout(user.sayName, 100);    // undefined
setTimeout(() => user.sayName(), 100); // "Ali" ✅
setTimeout(user.sayName.bind(user), 100); // "Ali" ✅
\`\`\`

### Prototip xatolari
\`\`\`javascript
// ❌ Xato: prototipni yangi obyektga almashtirib, constructor'ni yo'qotish
function Dog() {}
Dog.prototype = {
  bark() { return "Vov"; }
};
const d = new Dog();
d.constructor; // Object! Dog emas — constructor havolasi uzildi

// ✅ To'g'ri:
Dog.prototype.bark = function () { return "Vov"; }; // extend qiling
// yoki
Dog.prototype = Object.create(Object.prototype);
Dog.prototype.constructor = Dog; // qayta o'rnatish
\`\`\`

---

## 2. ⚙️ Part 2: Debugging vositalari va usullari

### \`this\` ni tekshirish
\`\`\`javascript
// 1-usul: console.log bilan
function suspect() {
  console.log("this =", this); // nima ekanini ko'ramiz
  console.log("this.constructor =", this?.constructor?.name);
}

// 2-usul: call bilan test
suspect.call({ name: "test" }); // this'ni qo'lda bog'lab ko'rish

// 3-usul: fn.name va fn.bind() funksiyalarida yo'qotish izlash
\`\`\`

### Prototip zanjirini tekshirish (DevTools'da)
\`\`\`javascript
const obj = new Dog("Rex");
console.log(obj); // DevTools'da [[Prototype]] zanjirini oching

// Programmatik:
let p = obj;
while (p) {
  console.log(p.constructor?.name || "anonim prototip");
  p = Object.getPrototypeOf(p);
}
// rex → Dog → Animal → Object → null
\`\`\`

### Tez-tez uchraydigan xato xabarlari va ularning sabablari
| Xato | Sabab | Yechim |
|------|-------|--------|
| \`Cannot read properties of undefined\` | \`this\` yo'qolgan yoki obyekt yaratilmagan | \`?.\`, \`bind\`, arrow funksiya |
| \`Class constructor X cannot be invoked without 'new'\` | klass \`new\` siz chaqirilgan | \`new\` qo'shish |
| \`Class extends value undefined\` | meros olingan klass import qilinmagan | import to'g'irlash |
| \`TypeError: x is not a constructor\` | arrow funksiya yoki \`bind\` natijasini \`new\` qilish | oddiy funksiya ishlash |
| \`__proto__\` qiymati kutilmaganda \`Object\` | \`Object.create\` chaqirilmasdan meros | zanjirni to'g'irlash |

### \`bind\` ning eslab qolinishi
\`bind\` — **yangi** funksiya qaytaradi, originalni o'zgartirmaydi:

\`\`\`javascript
const bound = user.sayName.bind(user);
bound(); // "Ali"
console.log(user.sayName === bound); // false — yangi funksiya!
\`\`\`

---

## 3. ⚠️ Part 3: Murakkab Holatlar va Senior Intervyu Savollari (Edge Cases)

### 1. Metod sharerlarining 4 ta qoidasi (intervyu standarti)
1. \`obj.method()\` — \`this\` = \`obj\` (nuqtadan oldingi).
2. \`fn()\` — \`this\` = \`undefined\` (strict) / \`window\` (sloppy).
3. \`fn.call(a)\`/\`fn.apply(a)\`/\`fn.bind(a)()\` — \`this\` = \`a\`.
4. \`new Fn()\` — \`this\` = yangi obyekt.
Arrow funksiya — o'z \`this\` yo'q, tashqi leksik \`this\` oladi. \`class\` tanasi — doim strict.

### 2. Event handler'larda \`this\`
\`\`\`javascript
// DOM'da: this = element
btn.addEventListener("click", function () {
  console.log(this); // btn element
});
btn.addEventListener("click", () => {
  console.log(this); // tashqi scope — element EMAS!
});

// Klassda: handler uzilib qolsa this yo'qoladi
class Panel {
  constructor() {
    // ✅ Yechim 1: constructor'da bind
    this.handleClick = this.handleClick.bind(this);
    // ✅ Yechim 2: arrow class field (zamonaviy)
    // handleClick = () => { ... }
  }
  handleClick() { /* this = panel */ }
}
\`\`\`

### 3. \`call\`/\`apply\`/\`bind\` performance
- \`bind\` har chaqiruvda yangi funksiya yaratadi — render sikllarida (React) har renderda bind qilish anti-pattern. \`useCallback\` yoki klass maydonidagi arrow ishlating.
- \`call\`/\`apply\` — bog'lamasdan bir marta ishga tushiradi, bind'dan tezroq.

### 4. Prototip "masofaviy" xatolari
\`\`\`javascript
// Array.prototype ni o'zgartirish — global portlash xavfi
Array.prototype.last = function () { return this[this.length - 1]; };
// Lekin for...in da sanaladi va boshqa kutubxonalar bilan to'qnashadi!
// Xavfsizroq: yordamchi funksiya yoki ES2023 .at(-1)
\`\`\`

### 5. \`Object.setPrototypeOf\` performance tuzog'i
Ish paytida prototipni almashtirish — V8 inline cache'larini to'liq buzadi (deoptimization). Prototipni faqat yaratish paytida o'rnatang (klass, \`Object.create\`).

---

## 4. 📊 Mermaid Diagrammasi

\`this\` aniqlanish qarshilari:

\`\`\`mermaid
graph TD
    A["Funksiya chaqirildi"] --> B{"Qanday chaqirildi?"}
    B -->|"new Fn()"| C["this = yangi obyekt"]
    B -->|"obj.fn()"| D["this = obj"]
    B -->|"call/apply/bind"| E["this = ko'rsatilgan obyekt"]
    B -->|"oddcha fn()"| F["strict: undefined<br/>sloppy: window"]
    B -->|"arrow funksiya"| G["this = tashqi leksik scope"]
    style A fill:#f9f,stroke:#333
    style G fill:#bbf,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Kontekst yo'qolishini tuzatish (bind)",
      instruction: "`lost()` funksiyasi `user.sayName` ga teng. Uni `bind` orqali bog'lab, `fixed()` ni yozing — u `'Ali'` qaytarsin.",
      startingCode: "const user = {\n  name: 'Ali',\n  sayName() { return this.name; }\n};\nconst lost = user.sayName;\n// fixed ni yozing",
      hint: "const fixed = user.sayName.bind(user);",
      test: "const fn = new Function(code + '; return fixed();'); if (fn() === 'Ali') return null; return 'bind bilan this ni qayta bog\\'lang';"
    },
    {
      id: 2,
      title: "Arrow bilan yechim",
      instruction: "`timer` obyektida `start()` ichida `setTimeout` bor. Xato versiyasini arrow funksiya bilan to'g'irlang — 100ms dan keyin `this.count` 1 bo'lsin. (Worker'da timeout sinxron emas — funksiya tayyor holda `runAfter()` ni chaqirsin).",
      startingCode: "const timer = {\n  count: 0,\n  tick() {\n    // this.count++ ni ishga tushiring (arrow bilan)\n    return this.count;\n  }\n};",
      hint: "tick() { const cb = () => { this.count++; }; cb(); return this.count; }",
      test: "const fn = new Function(code + '; return timer.tick();'); if (fn() === 1) return null; return 'Arrow funksiya this ni saqlashi kerak';"
    },
    {
      id: 3,
      title: "Constructor yo'qotilishi",
      instruction: "`Dog` prototipi yangi obyektga almashtirilgan. `bark` metodi ishlaydi, lekin `constructor` buzilgan. Uni to'g'irlang: `new Dog().constructor === Dog` bo'lsin.",
      startingCode: "function Dog() {}\nDog.prototype = {\n  bark() { return 'Vov'; }\n};\n// constructor ni to'g'irlang",
      hint: "Dog.prototype.constructor = Dog;",
      test: "const fn = new Function(code + '; return new Dog().constructor === Dog;'); if (fn() === true) return null; return 'Dog.prototype.constructor ni qayta o\\'rnating';"
    },
    {
      id: 4,
      title: "this qoidalarini aniqlash",
      instruction: "`whatIsThis(fn)` funksiyasi yozing: fn strict'likda oddiy chaqiruvda `this` ning qiymatini qaytarsin. Oddiy funksiya uchun `undefined` qaytishi kerak (worker strict mode).",
      startingCode: "function whatIsThis(fn) {\n  // fn() chaqirib this natijasini qaytaring\n}",
      hint: "function probe() { return this; } return typeof fn === 'function' ? probe() : undefined;",
      test: "const fn = new Function(code + '; return whatIsThis(function(){});'); if (fn() === undefined) return null; return 'Oddiy chaqiruvda this undefined bo\\'lishi kerak';"
    },
    {
      id: 5,
      title: "instanceof xatosini topish",
      instruction: "`check(obj)` funksiyasi `obj instanceof Array` bilan tekshiradi. Lekin `check([])` false berayotganda muammo boshqa frame'da. Zamonaviy yechim: `Array.isArray` ishlatib qayta yozing.",
      startingCode: "function check(obj) {\n  // Array.isArray ishlating\n}",
      hint: "return Array.isArray(obj);",
      test: "const fn = new Function(code + '; return [check([]), check({}), check(\\'a\\')];'); const r = fn(); if (r && r[0] === true && r[1] === false && r[2] === false) return null; return 'Array.isArray ishlating';"
    },
    {
      id: 6,
      title: "Klass handler bog'lash",
      instruction: "`Panel` klassi: `constructor` ichida `this.handleClick = this.handleClick.bind(this)` yozing. `handleClick()` — `'clicked'` qaytarsin.",
      startingCode: "class Panel {\n  constructor() {\n    // bind qiling\n  }\n  handleClick() { return 'clicked'; }\n}",
      hint: "this.handleClick = this.handleClick.bind(this);",
      test: "const fn = new Function(code + '; const p = new Panel(); const h = p.handleClick; return h();'); if (fn() === 'clicked') return null; return 'Uzilgan handler ham ishlashi kerak';"
    },
    {
      id: 7,
      title: "Call bilan o'zgartirish",
      instruction: "`greet()` funksiyasi `this.name` ni ishlatadi. `greetWith(user)` — `greet.call(user)` orqali `'Salom Ali'` qaytarsin.",
      startingCode: "function greet() { return 'Salom ' + this.name; }\nconst user = { name: 'Ali' };\nfunction greetWith() {\n  // call ishlating\n}",
      hint: "return greet.call(user);",
      test: "const fn = new Function(code + '; return greetWith();'); if (fn() === 'Salom Ali') return null; return 'greet.call(user) ishlating';"
    },
    {
      id: 8,
      title: "Zanjirni chop etish",
      instruction: "`printChain(obj)` funksiyasi prototip zanjiridagi har bir prototipning `constructor.name` ini massiv qilib qaytarsin (null gacha, oxirgi 'null').",
      startingCode: "class Animal {}\nclass Dog extends Animal {}\nfunction printChain(obj) {\n  // zanjirni massiv qilib qaytaring\n}",
      hint: "const names = []; let p = obj; while (p) { names.push(p.constructor.name); p = Object.getPrototypeOf(p); } names.push('null'); return names;",
      test: "const fn = new Function(code + '; const r = printChain(new Dog()); return r.length >= 3 && r[r.length - 1] === \\'null\\';'); if (fn() === true) return null; return 'Zanjir: Dog, Animal, Object, null';"
    },
    {
      id: 9,
      title: "Optional chaining bilan himoya",
      instruction: "`safeGet(obj, path)` funksiyasi ichma-ich property'ni xavfsiz o'qisin: `safeGet({a:{b:1}}, 'a.b')` → 1, `safeGet({}, 'a.b')` → undefined. (Split + reduce ishlating).",
      startingCode: "function safeGet(obj, path) {\n  // split va reduce bilan yozing\n}",
      hint: "return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);",
      test: "const fn = new Function(code + '; return [safeGet({a:{b:1}}, \\'a.b\\'), safeGet({}, \\'a.b\\')];'); const r = fn(); if (r && r[0] === 1 && r[1] === undefined) return null; return 'Xavfsiz o\\'qish ishlashi kerak';"
    },
    {
      id: 10,
      title: "Murakkab bug: prototip ifloslanishi",
      instruction: "`Object.prototype` ifloslanmaganini tekshiring: `isSafe()` funksiyasi `({}).polluted === undefined` bo'lsa true qaytarsin (hech kim proto ga polluted qo'shmagan bo'lsa).",
      startingCode: "function isSafe() {\n  // {}.polluted tekshiring\n}",
      hint: "return ({}).polluted === undefined;",
      test: "const fn = new Function(code + '; return isSafe();'); if (fn() === true) return null; return 'Obyektda polluted bo\\'lmasligi kerak';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`const f = obj.method; f()` chaqiruvida `this` nima bo'ladi (strict)?",
      options: ["obj", "window", "undefined", "f"],
      correctAnswer: 2,
      explanation: "Kontekst uzilganda strict mode'da `this = undefined`."
    },
    {
      id: 2,
      question: "`this` ni doimiy bog'laydigan metod qaysi?",
      options: ["call", "apply", "bind", "arrow function"],
      correctAnswer: 2,
      explanation: "`bind` — yangi funksiya qaytaradi, `this` abadiy bog'lanadi."
    },
    {
      id: 3,
      question: "Arrow funksiya `this` ni qayerdan oladi?",
      options: [
        "Chaqiruvdan",
        "Tashqi leksik scope'dan",
        "window'dan",
        "O'z prototipidan"
      ],
      correctAnswer: 1,
      explanation: "Arrow `this` ni o'z chaqiruviga qaramay, yozilgan joydagi (leksik) scope'dan oladi."
    },
    {
      id: 4,
      question: "`Dog.prototype = { bark() {} }` yozilgach nima buziladi?",
      options: [
        "bark ishlamaydi",
        "constructor havolasi Dog emas Object bo'ladi",
        "Hech narsa",
        "new ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "Yangi obyekt literal'ning constructor'i Object — constructor havolasini qo'lda tiklash kerak."
    },
    {
      id: 5,
      question: "DOM event handler'da oddiy funksiya bilan `this` nima?",
      options: ["window", "element", "undefined", "document"],
      correctAnswer: 1,
      explanation: "Oddiy funksiya handler sifatida: `this` = hodisa biriktirilgan element."
    },
    {
      id: 6,
      question: "`Class constructor X cannot be invoked without 'new'` xatosi nima uchun?",
      options: [
        "Klass prototip yo'q",
        "Klass faqat `new` bilan chaqiriladi",
        "Klass private maydon bor",
        "Klass statik metod chaqirdi"
      ],
      correctAnswer: 1,
      explanation: "Klasslar `new` bilan chaqirilishi majburiy — oddiy funksiya kabi emas."
    },
    {
      id: 7,
      question: "`Object.setPrototypeOf()` ni ish paytida chaqirish nimaga olib keladi?",
      options: [
        "Tezlashishga",
        "V8 keshlari buziladi (deoptimization)",
        "Hech narsaga",
        "Yangi obyektga"
      ],
      correctAnswer: 1,
      explanation: "Inline cache va hidden classlar tozalanadi — performance pasayadi."
    },
    {
      id: 8,
      question: "`Array.prototype` ga metod qo'shishning asosiy xavfi?",
      options: [
        "Sekinlashish",
        "for...in da sanaladi va kutubxonalar bilan to'qnashadi",
        "Massivlar o'chadi",
        "Hech qanday xavf yo'q"
      ],
      correctAnswer: 1,
      explanation: "Global prototype o'zgartirish — barcha massivlarga ta'sir qiladi; to'qnashuvlar mumkin."
    },
    {
      id: 9,
      question: "`bind` qilingan funksiya `new` bilan chaqirilsa?",
      options: [
        "Ishlaydi",
        "Ishlamaydi (bound funksiya prototype'siz)",
        "Xatolik beradi",
        "undefined qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "`bind` natijasida `prototype` yo'q — konstruktor sifatida ishlamaydi."
    },
    {
      id: 10,
      question: "React'da render ichida `this.handleClick.bind(this)` yozish nimaga olib keladi?",
      options: [
        "Optimallashtiradi",
        "Har renderda yangi funksiya — qayta renderlarga sabab",
        "Xatolik beradi",
        "Hech narsaga"
      ],
      correctAnswer: 1,
      explanation: "Har renderda yangi reference — memo/qiyoslash buziladi. Klass maydoni arrow yoki useCallback ishlating."
    },
    {
      id: 11,
      question: "`Cannot read properties of undefined (reading 'x')` eng ko'p sababi OOP'da?",
      options: [
        "Massiv qisqa",
        "`this` yo'qolgan yoki obyekt yaratilmagan",
        "CSS xato",
        "Import yetmaydi"
      ],
      correctAnswer: 1,
      explanation: "Ko'pincha metod uzilib chaqirilganda yoki `new` qilmasdan klass metodini chaqirganda yuzaga keladi."
    },
    {
      id: 12,
      question: "Zanjirni DevTools'da ko'rish uchun qaysi xususiyat ochiladi?",
      options: ["__chain__", "[[Prototype]]", "prototype", "super"],
      correctAnswer: 1,
      explanation: "DevTools'da obyektni chop etib, `[[Prototype]]` bo'ylab ochib borish mumkin."
    }
  ]
};
