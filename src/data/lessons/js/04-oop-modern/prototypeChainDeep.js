export const prototypeChainDeep = {
  id: "prototypeChainDeep",
  title: "Prototip Zanjiri Chuqur: Object.create va Meros Mexanizmi",
  language: "javascript",
  theory: `## 1. 💡 Part 1: Sodda Tushuntirish (Beginner Analogy)

JavaScript — **prototipga asoslangan (prototype-based)** til. Klasslar faqat "yopiqroq" — hammasi baribir prototip orqali ishlaydi.

### Real hayotiy o'xshatish
**Oilaviy genealogiya**ni tasavvur qiling:
- Siz biror narsani bilmaganingizda — **otangizdan so'raysiz**.
- Ota ham bilmasa — **bobodan so'raydi**, bobo ham bilmasa — buvining bobosidan...
- Bu zanjir — **prototip zanjiri (prototype chain)**.
- Zanjir oxiri — \`null\` ("barcha ajdodlar tugadi").

\`\`\`javascript
const animal = {
  eat() { return "yeyapti"; }
};

const dog = Object.create(animal); // dog ning prototipi = animal
dog.name = "Rex";

console.log(dog.name); // "Rex" — o'zidan topildi
console.log(dog.eat()); // "yeyapti" — prototipdan topildi (delegatsiya!)
\`\`\`

### \`prototype\` va \`__proto__\` farqi (eng ko'p adashiladigan joy!)
- \`Funksiya.prototype\` — **funksiya yaratadigan** nusxalar uchun shablon (faqat funksiyalarda bor).
- \`Obyekt.__proto__\` (yoki \`Object.getPrototypeOf(obj)\`) — obyekt **qayerdan meros olganini** ko'rsatuvchi havola.

\`\`\`javascript
function Dog() {}
const rex = new Dog();

Dog.prototype === Object.getPrototypeOf(rex); // true!
// Dog.prototype = "yangi Dog nusxalarining shabloni"
// rex.__proto__ = "mening meros manbam"
\`\`\`

---

## 2. ⚙️ Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

### Property qidiruv algoritmi (prop o'qilganda)
1. Obyektning **o'zida** qidiradi (own properties).
2. Topilmasa — \`__proto__\` havolasiga o'tadi, u yerda qidiradi.
3. Zanjir bo'ylab yuqoriga davom etadi.
4. \`null\` ga yetib kelsa va topilmasa — \`undefined\`.

**Muhim:** yozish (\`obj.prop = x\`) boshqacha ishlaydi — u **doim obyektning o'ziga** yozadi, zanjirga qaramaydi (setter bo'lmasa).

### V8 optimizatsiyalari
- **Inline Caching:** bir joyda doim bir xil turdagi obyektdan prop o'qilsa, V8 qiymat "manzilini" keshlaydi.
- **Hidden Classes (Maps):** obyektlar shakli bir xil bo'lsa — umumiy yashirin klass ishlatiladi.
- **Deoptimization tuzoq:** \`Object.setPrototypeOf()\` yoki \`__proto__\` ni **o'rtada o'zgartirish** — barcha keshlarni buzadi. Shuning uchun prototipni obyekt yaratilishidan **oldin** o'rnatish (klass, \`Object.create\`) eng tez yo'l.

### \`Object.create\` ning imkoniyatlari
\`\`\`javascript
const proto = { greet() { return "Salom"; } };

const child = Object.create(proto, {
  name: { value: "Ali", enumerable: true, writable: true }
});

// "Jinsiz" obyekt — prototipsiz (xavfsiz so'zlik (dict) uchun):
const dict = Object.create(null);
dict.constructor; // undefined — Object.prototype ga bog'lanmagan!
\`\`\`

### \`new\` operatori prototip nuqtai nazaridan
\`\`\`javascript
function Dog(name) { this.name = name; }
Dog.prototype.speak = function () { return "Vov"; };

// new Dog("Rex") taxminan shunday ishlaydi:
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype); // 1) prototip bog'lanadi
  const result = constructor.apply(obj, args);      // 2) this = obj
  return result instanceof Object ? result : obj;   // 3) obyekt qaytarsa — u
}
\`\`\`

Bu \`new\` ning "qora qutisi"ni ochish — intervyuda yuqori baholanadi.

---

## 3. ⚠️ Part 3: Murakkab Holatlar va Senior Intervyu Savollari (Edge Cases)

### 1. Shadowing (soyalash)
Zanjirdagi prop, obyektning o'zidagi bir xil nomli prop bilan "soyalanadi":

\`\`\`javascript
const proto = { value: 1 };
const obj = Object.create(proto);
obj.value = 2;        // o'ziga yozdi (shadow)
obj.value;            // 2 — o'ziniki
delete obj.value;
obj.value;            // 1 — endi prototipniki ko'rinadi
\`\`\`

### 2. \`for...in\` vs \`Object.keys\`
- \`for...in\` — **zanjir bo'ylab** ham sanaydi (enumerable).
- \`Object.keys\` — faqat **o'z** property'lari.
- \`hasOwnProperty\` / \`Object.hasOwn(obj, "x")\` — "o'zinikimi?" tekshiruvi.

### 3. Prototype Pollution (xavfsizlik!)
\`\`\`javascript
const payload = JSON.parse('{"__proto__": {"isAdmin": true}}');
Object.assign({}, payload); // ❌ eski usullar bilan Object.prototype ifloslanadi!
\`\`\`
Himoya: \`Object.create(null)\`, \`Map\` ishlatish, merge kutubxonalarini \`__proto__\` kalitini filtrlashi.

### 4. \`instanceof\` ning "botiq" tomonlari
\`\`\`javascript
const obj = Object.create(Dog.prototype);
obj instanceof Dog; // true — constructor chaqirilmagan bo'lsa ham!

// Primitive'lar bilan:
"abc" instanceof String; // false (primitive)
new String("abc") instanceof String; // true (wrapper)
\`\`\`

### 5. \`Function.prototype.bind\` va prototip
\`bind\` qilingan funksiya \`prototype\` ga ega emas — uni \`new\` bilan chaqirib bo'lmaydi.

> [!IMPORTANT]
> \`__proto__\` — eski (deprecated) accessor. Zamonaviy kodda \`Object.getPrototypeOf()\`, \`Object.setPrototypeOf()\`, \`Object.create()\` ishlating. \`__proto__\` faqat o'qish/tekshirish uchun qoldiq.

---

## 4. 📊 Mermaid Diagrammasi

To'liq prototip zanjiri:

\`\`\`mermaid
graph TD
    A["rex (Dog nusxa)"] -->|"__proto__"| B["Dog.prototype"]
    B -->|"speak(), constructor"| B2["Dog metodlari"]
    B -->|"__proto__"| C["Animal.prototype"]
    C -->|"__proto__"| D["Object.prototype"]
    D -->|"toString, hasOwnProperty"| D2["Umumiy metodlar"]
    D -->|"__proto__"| E["null — zanjir tugadi"]
    style A fill:#f9f,stroke:#333
    style D fill:#bbf,stroke:#333
    style E fill:#f66,stroke:#333
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Object.create asoslari",
      instruction: "`proto` obyektdan `Object.create` yordamida `child` yarating va unga `name: 'Child'` qo'shing.",
      startingCode: "const proto = { greet() { return 'Salom'; } };\n// child ni yarating",
      hint: "const child = Object.create(proto); child.name = 'Child';",
      test: "const fn = new Function(code + '; return child;'); const c = fn(); if (c.name === 'Child' && c.greet() === 'Salom') return null; return 'Object.create bilan proto dan child yarating';"
    },
    {
      id: 2,
      title: "Zanjirni tekshirish",
      instruction: "`getProto(obj)` funksiyasini yozing — u `Object.getPrototypeOf` orqali prototipni qaytarsin.",
      startingCode: "function getProto(obj) {\n  // kodni yozing\n}",
      hint: "return Object.getPrototypeOf(obj);",
      test: "const fn = new Function(code + '; const p = {}; const c = Object.create(p); return getProto(c) === p;'); if (fn() === true) return null; return 'Object.getPrototypeOf ishlating';"
    },
    {
      id: 3,
      title: "prototype vs __proto__",
      instruction: "`Dog` konstruktori yozing. `sameProto()` funksiyasi `Dog.prototype === Object.getPrototypeOf(new Dog())` natijasini qaytarsin.",
      startingCode: "function Dog() {}\nfunction sameProto() {\n  // tekshiruvni yozing\n}",
      hint: "return Dog.prototype === Object.getPrototypeOf(new Dog());",
      test: "const fn = new Function(code + '; return sameProto();'); if (fn() === true) return null; return 'Dog.prototype nusxa prototipi bilan bir xil bo\\'lishi kerak';"
    },
    {
      id: 4,
      title: "Shadowing tushunish",
      instruction: "`proto.value = 1` bor. `obj` dan meros olgan `child.value = 2` yozilgach: `checkShadow()` — `[child.value, delete child.value, child.value]` qaytarsin (oxirgisi prototipdan o'qiladi).",
      startingCode: "const proto = { value: 1 };\nconst child = Object.create(proto);\nchild.value = 2;\nfunction checkShadow() {\n  // [child.value, delete child.value, child.value] qaytaring\n}",
      hint: "const a = child.value; const b = delete child.value; return [a, b, child.value];",
      test: "const fn = new Function(code + '; return checkShadow();'); const r = fn(); if (r && r[0] === 2 && r[1] === true && r[2] === 1) return null; return 'Shadowing va delete qoidalarini tekshiring';"
    },
    {
      id: 5,
      title: "new operatorini yozish",
      instruction: "`myNew(constructor, ...args)` funksiyasini yozing — `new` operatori kabi ishlaydi (`Object.create` + `apply`).",
      startingCode: "function Person(name) { this.name = name; }\nPerson.prototype.hi = function() { return 'Hi ' + this.name; };\nfunction myNew(constructor, ...args) {\n  // kodni yozing\n}",
      hint: "const obj = Object.create(constructor.prototype); const r = constructor.apply(obj, args); return r instanceof Object ? r : obj;",
      test: "const fn = new Function(code + '; const p = myNew(Person, \\'Ali\\'); return [p.name, p.hi()];'); const r = fn(); if (r && r[0] === 'Ali' && r[1] === 'Hi Ali') return null; return 'myNew new operatori kabi ishlashi kerak';"
    },
    {
      id: 6,
      title: "hasOwnProperty vs zanjir",
      instruction: "`ownKeys(obj)` funksiyasi yozing — faqat o'z property'larini qaytarsin (`Object.keys`).",
      startingCode: "const proto = { inherited: true };\nconst obj = Object.create(proto);\nobj.own = 1;\nfunction ownKeys(o) {\n  // faqat o'zinikilarini qaytaring\n}",
      hint: "return Object.keys(o);",
      test: "const fn = new Function(code + '; return ownKeys(obj).length;'); if (fn() === 1) return null; return 'Faqat own property qaytishi kerak';"
    },
    {
      id: 7,
      title: "Jinsiz obyekt",
      instruction: "`Object.create(null)` orqali `dict` yarating. `isNullProto()` — `Object.getPrototypeOf(dict) === null` qaytarsin.",
      startingCode: "// dict ni yarating va isNullProto yozing\n",
      hint: "const dict = Object.create(null); function isNullProto() { return Object.getPrototypeOf(dict) === null; }",
      test: "const fn = new Function(code + '; return isNullProto();'); if (fn() === true) return null; return 'Object.create(null) prototipsiz obyekt beradi';"
    },
    {
      id: 8,
      title: "Zanjir uzunligi",
      instruction: "`chainLength(obj)` funksiyasini yozing — prototip zanjiridagi havolalar sonini qaytarsin (null gacha). Oddiy obyekt uchun 1 (Object.prototype).",
      startingCode: "function chainLength(obj) {\n  // while bilan zanjirni hisoblang\n}",
      hint: "let n = 0; let p = Object.getPrototypeOf(obj); while (p) { n++; p = Object.getPrototypeOf(p); } return n;",
      test: "const fn = new Function(code + '; return chainLength({});'); if (fn() === 1) return null; return 'Oddiy obyekt uchun 1 qaytishi kerak (Object.prototype)';"
    },
    {
      id: 9,
      title: "Prototipga metod qo'shish",
      instruction: "`Dog` konstruktoridan keyin `speak` metodini prototype'ga qo'shing. Eslatma: allaqachon yaratilgan nusxalar ham yangi metodni ko'radi!",
      startingCode: "function Dog(name) { this.name = name; }\nconst rex = new Dog('Rex');\n// speak metodini prototype'ga qo'shing (rex ham ko'radi!)",
      hint: "Dog.prototype.speak = function() { return this.name + ' vov'; };",
      test: "const fn = new Function(code + '; return rex.speak();'); if (fn() === 'Rex vov') return null; return 'Allaqachon yaratilgan nusxa ham prototip metodini ko\\'rishi kerak';"
    },
    {
      id: 10,
      title: "instanceof mexanizmi",
      instruction: "`myInstanceof(obj, constructor)` funksiyasini yozing — prototip zanjirini qo'lda tekshirib true/false qaytarsin.",
      startingCode: "class Animal {}\nclass Dog extends Animal {}\nfunction myInstanceof(obj, constructor) {\n  // prototip zanjirini qo'lda tekshiring\n}",
      hint: "let p = Object.getPrototypeOf(obj); while (p) { if (p === constructor.prototype) return true; p = Object.getPrototypeOf(p); } return false;",
      test: "const fn = new Function(code + '; const d = new Dog(); return [myInstanceof(d, Dog), myInstanceof(d, Animal), myInstanceof({}, Dog)];'); const r = fn(); if (r && r[0] === true && r[1] === true && r[2] === false) return null; return 'instanceof ni qo\\'lda implementatsiya qiling';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Property o'qishda prototip zanjiri qanday ishlaydi?",
      options: [
        "Faqat obyektning o'zida qidiriladi",
        "Topilmasa zanjir bo'ylab yuqoriga qidiriladi",
        "Doim Object.prototype dan boshlanadi",
        "Tasodifiy tartibda"
      ],
      correctAnswer: 1,
      explanation: "O'zida topilmasa — __proto__ havolasi bo'ylab yuqoriga qarab chiqiladi, null gacha."
    },
    {
      id: 2,
      question: "`Funksiya.prototype` va `nusxa.__proto__` orasidagi bog'liqlik?",
      options: [
        "Aloqasiz",
        "new bilan yaratilgan nusxa.__proto__ === Funksiya.prototype",
        "Ular bir xil nom bilan bog'lanadi",
        "__proto__ prototipning nusxasi"
      ],
      correctAnswer: 1,
      explanation: "`new` yangi obyektning `__proto__` sini konstruktornin `prototype`iga bog'laydi."
    },
    {
      id: 3,
      question: "`Object.create(null)` nimani yaratadi?",
      options: [
        "Bo'sh massiv",
        "Prototipsiz 'jinsiz' obyekt",
        "Null qiymat",
        "Frozen obyekt"
      ],
      correctAnswer: 1,
      explanation: "Prototip bo'lmagan obyekt — prototype pollution'dan himoya sifatida ishlatiladi."
    },
    {
      id: 4,
      question: "Prototipni o'rtada o'zgartirish (setPrototypeOf) nimaga olib keladi?",
      options: [
        "Tezlashishga",
        "V8 keshlarini buzishga (deoptimization)",
        "Hech narsaga",
        "Yangi obyekt yaratishga"
      ],
      correctAnswer: 1,
      explanation: "Inline cache va hidden classlar bekor qilinadi — performance pasayadi."
    },
    {
      id: 5,
      question: "`obj.prop = 5` yozishda prototip qanday rol o'ynaydi?",
      options: [
        "Zanjirga ham yoziladi",
        "Doim obyektning o'ziga yoziladi",
        "Faqat setter bo'lsa prototipga yoziladi",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Yozish doim own property yaratadi (prototipda setter yo'q bo'lsa) — shadowing hosil qiladi."
    },
    {
      id: 6,
      question: "`for...in` bilan `Object.keys` farqi?",
      options: [
        "Farq yo'q",
        "for...in zanjirni ham sanaydi, Object.keys faqat own",
        "Object.keys zanjirni ham sanaydi",
        "for...in faqat massivlarda"
      ],
      correctAnswer: 1,
      explanation: "`for...in` meros bo'lgan enumerable property'larni ham beradi."
    },
    {
      id: 7,
      question: "`obj instanceof Konstruktor` aslida nimani tekshiradi?",
      options: [
        "typeof natijasini",
        "Konstruktornin prototype'i obyekt zanjirida bormi",
        "constructor.name ni",
        "Kalitlar to'plamini"
      ],
      correctAnswer: 1,
      explanation: "Zanjirda `Konstruktor.prototype` bo'lsa — true."
    },
    {
      id: 8,
      question: "Prototype pollution nima?",
      options: [
        "Prototipni o'zgartirish tezligi",
        "__proto__ orqali Object.prototype ni ifloslantirish hujumi",
        "Metodlarni ko'paytirish",
        "Zanjirning uzunligi"
      ],
      correctAnswer: 1,
      explanation: "Tashqi ma'lumotdan `__proto__` kaliti kirib qolsa — global prototype buziladi, barcha obyektlar zararlanadi."
    },
    {
      id: 9,
      question: "`bind` qilingan funksiyani `new` bilan chaqirish mumkinmi?",
      options: ["Ha", "Yo'q, bind qilingan funksiya prototype'siz", "Faqat strict'da", "Faqat klasslarda"],
      correctAnswer: 1,
      explanation: "Bound funksiyalar `prototype` maydoniga ega emas — konstruktor sifatida ishlamaydi."
    },
    {
      id: 10,
      question: "V8 'monomorf' obyektlar deganda nima tushuniladi?",
      options: [
        "Bitta property'li obyektlar",
        "Bir xil shakl/tartibdagi obyektlar (tez optimizatsiya)",
        "Frozen obyektlar",
        "Prototipsiz obyektlar"
      ],
      correctAnswer: 1,
      explanation: "Bir xil shakldagi obyektlar umumiy hidden class ishlatadi — eng tez yo'l."
    },
    {
      id: 11,
      question: "`Object.hasOwn(obj, 'x')` nima qiladi?",
      options: [
        "Zanjirdan tekshiradi",
        "Faqat own property ekanini tekshiradi",
        "Qiymatini qaytaradi",
        "O'chiradi"
      ],
      correctAnswer: 1,
      explanation: "`hasOwnProperty`ning zamonaviy statik muqobili — obyekt null prototipli bo'lsa ham ishlaydi."
    },
    {
      id: 12,
      question: "`delete obj.ownProp` qilingandan keyin bir xil nomli prototip prop ko'rinadimi?",
      options: ["Yo'q, undefined qoladi", "Ha, endi prototipniki ko'rinadi", "Xatolik beradi", "Faqat strict'da"],
      correctAnswer: 1,
      explanation: "Own property o'chirilgach, shadow yo'qoladi — zanjirdagi qiymat yana ko'rinadi."
    }
  ]
};
