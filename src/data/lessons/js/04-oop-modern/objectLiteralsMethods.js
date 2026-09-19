export const objectLiteralsMethods = {
  id: "objectLiteralsMethods",
  title: "OOP Asoslari: Obyekt Literal, Property va Method",
  language: "javascript",
  theory: `## 1. 💡 Part 1: Sodda Tushuntirish (Beginner Analogy)

OOP (Object-Oriented Programming) — dasturni **obyektlar** atrofida qurish uslubidir. Har bir obyekt real hayotdagi narsani modellaydi: foydalanuvchi, mashina, hisob-kitob...

### Real hayotiy o'xshatish
Tasavvur qiling, siz **talaba kartochkasi** yaratyapsiz:
- **Property (xossa)** — kartochkaga yozilgan ma'lumotlar: ism, yosh, guruh. Bu obyektning *holati* (state).
- **Method (metod)** — kartochka qila oladigan "harakatlar": o'zini tanishtirish, yoshini hisoblash. Bu obyektning *xulq-atvori* (behavior).

\`\`\`javascript
const student = {
  // === PROPERTIES (xossalari) ===
  name: "Ali",
  age: 20,
  group: "JS-01",

  // === METHODS (metodlari) ===
  introduce() {
    return \`Men \${this.name}, \${this.group} guruhida o'qiyman\`;
  },
  birthday() {
    this.age++; // o'z holatini o'zgartirish mumkin
  }
};
\`\`\`

### Obyekt literal nima?
Obyekt yaratishning eng sodda usuli — **object literal** (\`{}\`). Ichga kalit-qiymat (key-value) juftliklari yoziladi. Bu JSON'ning "jonli" JavaScript versiyasi deb tasavvur qilishingiz mumkin.

### \`this\` — obyektning "o'zi"
Method ichida \`this\` — aynan shu obyektni bildiradi. \`student.introduce()\` chaqirilganda \`this\` = \`student\`. Bitta metod yozib, uni minglab obyektlarda ishlatish mumkin.

---

## 2. ⚙️ Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

### Property'lar haqiqatda nima?
Har bir property oddiy qiymat emas — u **property descriptor** deb ataladigan meta-ma'lumotga ega:

\`\`\`javascript
const obj = { x: 1 };
const desc = Object.getOwnPropertyDescriptor(obj, "x");
// { value: 1, writable: true, enumerable: true, configurable: true }
\`\`\`

- \`writable\` — qiymatini o'zgartirish mumkinmi?
- \`enumerable\` — for...in / Object.keys da ko'rinadimi?
- \`configurable\` — o'chirish yoki sozlamalarini o'zgartirish mumkinmi?

### Method va Method Shorthand
ES6'dan boshlab \`introduce() {}\` qisqa yozuvi mavjud. U \`introduce: function() {}\` bilan deyarli bir xil, faqat bitta farq bor: qisqa yozuv \`super\` kalit so'zini qo'llab-quvvatlaydi (klasslar bilan ishlaganda muhim).

### \`this\` qanday aniqlanadi? (juda muhim!)
\`this\` funksiya **qayerda yozilganiga emas, qanday chaqirilganiga** bog'liq:

\`\`\`javascript
function show() { return this.name; }

const a = { name: "A", show };
const b = { name: "B", show };

a.show(); // "A" — chap tomondagi obyekt this bo'ldi
b.show(); // "B" — endi b

const lone = show; // chaqiruv kontekstidan uzildi
lone(); // undefined — this = undefined (strict mode)
\`\`\`

V8 dvigateli bunday "monomorf" chaqiruvlarni (doim bir xil shakldagi obyektlar) **Hidden Classes** orqali tezlashtiradi. Shuning uchun obyektga keyin qo'shimcha property'lar "tashlash" o'rniga, uni boshidanoq to'liq shaklda yaratish tezroq ishlaydi.

### Computed properties va ES6 qulayliklari
\`\`\`javascript
const key = "email";
const user = {
  [key + "_verified"]: true, // hisoblangan kalit
  // Qisqa property: o'zgaruvchi nomi = kalit
  name, // name: name bilan bir xil
};
\`\`\`

---

## 3. ⚠️ Part 3: Murakkab Holatlar va Senior Intervyu Savollari (Edge Cases)

### 1. Metodni obyektdan "uzib" olish
Eng ko'p uchraydigan xato: metodni callback sifatida uzatganda kontekst yo'qoladi:

\`\`\`javascript
const timer = {
  seconds: 0,
  start() {
    // XATO: setTimeout ichida this yo'qoladi!
    setTimeout(function () {
      this.seconds++; // this = undefined (strict mode)
    }, 1000);
  },
  startFixed() {
    // 1-usul: arrow function — this'ni tashqaridan oladi
    setTimeout(() => { this.seconds++; }, 1000);
  }
};
\`\`\`

### 2. \`this\` ni qo'lda bog'lash: call, apply, bind
\`\`\`javascript
const counter = { count: 0 };
function step(by) { this.count += by; }

step.call(counter, 5);   // this = counter, argumentlar ro'yxatda
step.apply(counter, [5]); // this = counter, argumentlar massivda
const bound = step.bind(counter); // doimiy bog'langan yangi funksiya
bound(5);
\`\`\`

### 3. Getter va Setter literal'da ham ishlaydi
\`\`\`javascript
const account = {
  _balance: 0,
  get balance() { return this._balance; },
  set balance(v) {
    if (v < 0) throw new Error("Salbiy bo'lmaydi!");
    this._balance = v;
  }
};
account.balance = 100; // setter ishladi
console.log(account.balance); // 100 — getter ishladi
\`\`\`

### 4. Obyektlar reference bilan uzatiladi
\`\`\`javascript
const original = { items: [1] };
const copy = { ...original }; // shallow copy!
copy.items.push(2);
console.log(original.items); // [1, 2] — ichki massiv umumiy!
\`\`\`

> [!WARNING]
> \`{...obj}\` yoki \`Object.assign({}, obj)\` — faqat **sayoz (shallow)** nusxa. Ichma-ich obyektlar baribir umumiy reference'ga ishora qiladi. Chuqur nusxa uchun \`structuredClone()\` ishlating.

---

## 4. 📊 Mermaid Diagrammasi

Obyektning tuzilishi va \`this\` bog'lanishi:

\`\`\`mermaid
graph TD
    A[Chaqiruv: student.introduce] --> B{Chap tomonda obyekt bormi?}
    B -->|Ha| C[this = student]
    B -->|Yo'q| D{call/apply/bind bilan bog'langanmi?}
    D -->|Ha| E[this = bog'langan obyekt]
    D -->|Yo'q| F[this = undefined strict mode]
    C --> G[Metod this.name orqali holatga murojaat qiladi]
    style A fill:#f9f,stroke:#333
    style G fill:#bfb,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Birinchi obyektingiz",
      instruction: "'Ali' ismli, 25 yoshli `person` obyektini yaratib, `console.log()` bilan chop eting.",
      startingCode: "// Obyekt literal yozing\n",
      hint: "const person = { name: 'Ali', age: 25 };",
      test: "const fn = new Function(code + '; return person;'); const p = fn(); if (p && p.name === 'Ali' && p.age === 25) return null; return 'person obyektida name=Ali va age=25 bo\\'lishi kerak';"
    },
    {
      id: 2,
      title: "Method qo'shish",
      instruction: "`car` obyektiga `brand` property va `start()` methodini qo'shing. `start()` — `'Tesla ishga tushdi'` matnini qaytarsin.",
      startingCode: "const car = {\n  brand: 'Tesla'\n  // start metodini qo'shing\n};",
      hint: "start() { return this.brand + ' ishga tushdi'; }",
      test: "const fn = new Function(code + '; return car.start();'); if (fn() === 'Tesla ishga tushdi') return null; return 'start() metodi \"Tesla ishga tushdi\" qaytarishi kerak';"
    },
    {
      id: 3,
      title: "`this` bilan ishlash",
      instruction: "`counter` obyekti yaratib, unga `value: 0` va `increment()` methodini qo'shing. `increment()` — `this.value` ni 1 ga oshirib, yangi qiymatni qaytarsin.",
      startingCode: "const counter = {\n  value: 0\n  // increment metodini qo'shing\n};",
      hint: "increment() { this.value++; return this.value; }",
      test: "const fn = new Function(code + '; counter.increment(); counter.increment(); return counter.value;'); if (fn() === 2) return null; return 'Ikki marta increment() chaqirilganda value=2 bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "Computed property",
      instruction: "`key` o'zgaruvchisi bor. `config` obyektida computed property sifatida `key + '_enabled'` kalitini `true` qiymat bilan yarating.",
      startingCode: "const key = 'api';\nconst config = {\n  // computed property yozing\n};",
      hint: "[key + '_enabled']: true",
      test: "const fn = new Function(code + '; return config;'); const c = fn(); if (c && c.api_enabled === true) return null; return 'config.api_enabled = true bo\\'lishi kerak';"
    },
    {
      id: 5,
      title: "Obyektlarni birlashtirish",
      instruction: "`defaults` va `userSettings` obyektlarini `Object.assign` bilan birlashtirib, `final` obyektini yarating. Natijada `theme: 'dark'` bo'lishi kerak.",
      startingCode: "const defaults = { theme: 'light', lang: 'uz' };\nconst userSettings = { theme: 'dark' };\n// final obyektini yarating",
      hint: "const final = Object.assign({}, defaults, userSettings);",
      test: "const fn = new Function(code + '; return final;'); const f = fn(); if (f && f.theme === 'dark' && f.lang === 'uz') return null; return 'final.theme=dark va final.lang=uz bo\\'lishi kerak';"
    },
    {
      id: 6,
      title: "Getter yozish",
      instruction: "`rect` obyektiga `area` getterini qo'shing — u `width * height` ni qaytarsin (qavslarsiz chaqiriladi!).",
      startingCode: "const rect = {\n  width: 10,\n  height: 5\n  // area getterini qo'shing\n};",
      hint: "get area() { return this.width * this.height; }",
      test: "const fn = new Function(code + '; return rect.area;'); if (fn() === 50) return null; return 'rect.area 50 qaytarishi kerak (getter qavslarsiz chaqiriladi)';"
    },
    {
      id: 7,
      title: "Setter bilan validatsiya",
      instruction: "`user` obyektiga `name` setteri yozing: agar qiymat bo'sh satr bo'lsa, o'zgartirmasin; aks holda `this._name` ga o'rnatsin. `name` getteri ham qo'shing.",
      startingCode: "const user = {\n  _name: 'Old'\n  // get name va set name yozing\n};",
      hint: "get name() { return this._name; } set name(v) { if (v) this._name = v; }",
      test: "const fn = new Function(code + '; user.name = \\'\\'; const first = user.name; user.name = \\'New\\'; return [first, user.name];'); const r = fn(); if (r && r[0] === 'Old' && r[1] === 'New') return null; return 'Bo\\'sh satr o\\'zgartirmasligi, to\\'liq satr esa o\\'zgartirishi kerak';"
    },
    {
      id: 8,
      title: "Nested obyekt",
      instruction: "`school` obyekti yarating: `name` property va ichida `director` obyekti bo'lsin (`director.name = 'Vali'`). Director ismini chop eting.",
      startingCode: "// school obyektini yarating\n",
      hint: "const school = { name: 'IT School', director: { name: 'Vali' } };",
      test: "const fn = new Function(code + '; return school.director.name;'); if (fn() === 'Vali') return null; return 'school.director.name = Vali bo\\'lishi kerak';"
    },
    {
      id: 9,
      title: "Kalitlarni sanash",
      instruction: "`book` obyekti berilgan. `countProps(obj)` funksiyasini yozing — u obyektning property'lar sonini qaytarsin (`Object.keys` ishlating).",
      startingCode: "const book = { title: 'JS', pages: 500, author: 'Someone' };\nfunction countProps(obj) {\n  // kodni yozing\n}",
      hint: "return Object.keys(obj).length;",
      test: "const fn = new Function(code + '; return countProps(book);'); if (fn() === 3) return null; return 'countProps(book) 3 qaytarishi kerak';"
    },
    {
      id: 10,
      title: "Method chaining",
      instruction: "`builder` obyekti yarating: `result: ''` property va `add(text)` methodi bor. `add()` — matnni `result` ga qo'shib, `this` qaytarsin (chaining uchun).",
      startingCode: "const builder = {\n  result: ''\n  // add metodini yozing\n};\n// Natija: builder.add('a').add('b').result === 'ab'",
      hint: "add(text) { this.result += text; return this; }",
      test: "const fn = new Function(code + '; return builder.add(\\'a\\').add(\\'b\\').result;'); if (fn() === 'ab') return null; return 'Chaining ishlashi kerak: builder.add(a).add(b).result === ab';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Object literal orqali obyekt qaysi belgilar bilan yaratiladi?",
      options: ["[]", "{}", "()", "<>"],
      correctAnswer: 1,
      explanation: "Obyekt literal — `{}` qavslari ichida kalit-qiymat juftliklari yozish orqali obyekt yaratishning eng sodda usuli."
    },
    {
      id: 2,
      question: "Method ichida `this` nimani bildiradi (oddiy chaqiruvda `obj.method()`)?",
      options: [
        "Global scope'ni",
        "Metod yozilgan faylni",
        "Chaqiruv chap tomondagi obyektni",
        "Doim undefined"
      ],
      correctAnswer: 2,
      explanation: "`obj.method()` chaqiruvvida `this` — nuqtaning chap tomonidagi obyekt, ya'ni `obj`."
    },
    {
      id: 3,
      question: "Qaysi usulda property kalitini o'zgaruvchidan hisoblab olish mumkin?",
      options: ["key: value", "(key): value", "[key]: value", "{{key}}: value"],
      correctAnswer: 2,
      explanation: "Computed property sintaksisi: `[ifoda]: qiymat` — kalit qavslar ichida hisoblanadi."
    },
    {
      id: 4,
      question: "`Object.assign({}, a, b)` chaqiruvida agar `a` va `b` da bir xil kalit bo'lsa, g'alaba kimniki?",
      options: ["a nikiniki", "b nikiniki", "Xatolik chiqadi", "Ikkalasi massivga aylanadi"],
      correctAnswer: 1,
      explanation: "Object.assign o'ngdan chapga yozadi: keyingi obyektdagi bir xil kalitlar avvalgisini bosib o'tadi."
    },
    {
      id: 5,
      question: "`{...obj}` spread nusxasi qanday nusxa beradi?",
      options: ["Deep copy", "Shallow (sayoz) copy", "Hech qanday nusxa", "Immutable nusxa"],
      correctAnswer: 1,
      explanation: "Spread faqat birinchi darajani nusxalaydi — ichki obyektlar reference bilan umumiy qoladi."
    },
    {
      id: 6,
      question: "Getter metod qanday chaqiriladi?",
      options: ["obj.get()", "obj.prop", "obj.prop()", "get(obj.prop)"],
      correctAnswer: 1,
      explanation: "Getter oddiy property kabi qavslarsiz o'qiladi: `obj.prop` — lekin ichida funksiya ishlaydi."
    },
    {
      id: 7,
      question: "Callback sifatida uzatilgan metod ichida `this` nimaga aylanadi (strict mode)?",
      options: ["Obyektga", "window ga", "undefined", "Yangi bo'sh obyektga"],
      correctAnswer: 2,
      explanation: "Kontekst uzilganda `this` yo'qoladi: strict mode'da `undefined`, strict bo'lmasa `window`."
    },
    {
      id: 8,
      question: "`setTimeout` ichida obyekt metodini arrow function bilan o'ranganda `this` kim bo'ladi?",
      options: [
        "Tashqi (lexic) scope'dagi `this` — ya'ni obyekt",
        "setTimeout o'zi",
        "window",
        "undefined"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiya o'z `this` ga ega emas — tashqi kontekstdagini oladi, shu sababli obyekt metodlari uchun ideal."
    },
    {
      id: 9,
      question: "Property descriptor'dagi `writable: false` nimani anglatadi?",
      options: [
        "Property o'chirmaydi",
        "Property qiymati o'zgartirilmaydi",
        "Property ko'rinmaydi",
        "Property tez ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`writable: false` — qiymatni o'zgartirishga urinish silent fail (yoki TypeError strict'da) bo'ladi."
    },
    {
      id: 10,
      question: "Obyektlar funksiyaga qanday uzatiladi?",
      options: ["Qiymat (value) bilan", "Reference bilan", "Nusxa olinib", "Seriylashib"],
      correctAnswer: 1,
      explanation: "Obyektlar reference bilan uzatiladi — funksiya ichidagi o'zgartirishlar tashqaridagi obyektga ta'sir qiladi."
    },
    {
      id: 11,
      question: "Qisqa metod yozuvi `say() {}` to'liq yozuv bilan farqi nima?",
      options: [
        "Hech qanday farq yo'q",
        "Qisqa yozuv `super` ni qo'llaydi va `this` ni bog'laydi",
        "Qisqa yozuv private bo'ladi",
        "Qisqa yozuv statik bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Method shorthand funksiyasi emas, metod — `super` qo'llaydi va `prototype` bog'lanishi boshqacha ishlaydi."
    },
    {
      id: 12,
      question: "`structuredClone(obj)` nima qiladi?",
      options: [
        "Sayoz nusxa oladi",
        "Faqat JSON qiymatlarni nusxalaydi",
        "To'liq chuqur nusxa oladi",
        "Obyektni freeze qiladi"
      ],
      correctAnswer: 2,
      explanation: "`structuredClone` — ichma-ich ma'lumotlarni ham to'liq nusxalaydigan zamonaviy API."
    }
  ]
};
