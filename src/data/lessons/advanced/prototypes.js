export const prototypes = {
  id: "prototypes",
  title: "Prototypes va Vorislik (Inheritance)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Prototypes (Prototiplar) va Vorislik (Inheritance) nima?
* **Prototype (Prototip):** Bu JavaScript-da obyektlar o'rtasida metodlar va xossalarni ulashish uchun ishlatiladigan maxsus mexanizm (ya'ni boshqa obyektga havola). Har bir obyekt yashirin \`[[Prototype]]\` (ko'pincha \`__proto__\` deb ko'rsatiladi) xossasiga ega bo'lib, u orqali o'z ota-onasidan meros oladi.
* **Prototip zanjiri (Prototype Chain):** Agar obyektning o'zidan biron bir xossa qidirilsa va topilmasa, JavaScript uni avtomatik tarzda uning prototipidan qidirishni boshlaydi. Bu qidiruv zanjiri oxir-oqibat \`null\` qiymatiga yetganda to'xtaydi.

### Real hayotiy analogiya
Tasavvur qiling, siz **uy qurmoqchisiz**:
* **Chizma (Blueprint):** Sizda tayyor uy chizmasi bor (Konstruktor / Class).
* **Nusxalar (Objects):** Siz shu chizma asosida bir nechta uylarni qurasiz.
* **Prototip (Meros):** Tasavvur qiling, har bir uyda alohida **generator (elektr manbai)** o'rnatish o'rniga, butun mahalla uchun bitta umumiy **katta transformator (Prototype)** o'rnatildi. Har bir uy elektr kerak bo'lganda o'zidan qidirmaydi, balki umumiy transformatordan (prototipdan) oqim oladi. Bu xotira va mablag'ni tejaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy prototip ulash)
\`Object.create\` yordamida prototip zanjiri hosil qilish:
\`\`\`javascript
const car = {
  hasEngine: true,
  drive() {
    console.log("Mashina harakatlanmoqda...");
  }
};

// tesla obyekti prototipi car ga teng bo'ladi
const tesla = Object.create(car);
tesla.model = "Model S";

console.log(tesla.model);      // "Model S" (shaxsiy xossasi)
console.log(tesla.hasEngine);  // true (prototipdan olindi)
tesla.drive();                 // "Mashina harakatlanmoqda..." (prototip metodi)
\`\`\`

### 2. Intermediate Example (ES5 Constructor Function va Prototip)
Konstruktor funksiyalar yordamida metodlarni prototipga biriktirish:
\`\`\`javascript
function User(name, role) {
  this.name = name;
  this.role = role;
}

// Metodni prototipga yuklaymiz (Xotirani tejash uchun)
User.prototype.sayHello = function() {
  return \`Salom, mening ismim \${this.name}. Roli: \${this.role}\`;
};

const user1 = new User("Jasur", "Admin");
const user2 = new User("Zilola", "User");

console.log(user1.sayHello()); // "Salom, mening ismim Jasur..."
console.log(user2.sayHello()); // "Salom, mening ismim Zilola..."
\`\`\`

### 3. Advanced Example (Constructor Inheritance - Konstruktorli Vorislik)
\`\`\`javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() {
  console.log(\`\${this.name} ovqatlanmoqda.\`);
};

function Bird(name, canFly) {
  // 1. Ota konstruktorni chaqirish (super call)
  Animal.call(this, name);
  this.canFly = canFly;
}

// 2. Prototip zanjirini ulash
Bird.prototype = Object.create(Animal.prototype);

// 3. Constructor xossasini o'ziga qaytarish (tuzatish)
Bird.prototype.constructor = Bird;

Bird.prototype.fly = function() {
  if (this.canFly) {
    console.log(\`\${this.name} uchmoqda!\`);
  } else {
    console.log(\`\${this.name} ucha olmaydi.\`);
  }
};

const eagle = new Bird("Burgut", true);
eagle.eat(); // "Burgut ovqatlanmoqda." (Animal prototipidan)
eagle.fly(); // "Burgut uchmoqda!" (Bird prototipidan)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript Prototypes Mechanics
Har bir funksiya yaratilganda avtomatik ravishda uning ichida \`prototype\` deb nomlangan obyekt ham yaratiladi. Uning ichida \`constructor\` xossasi bo'lib, u funksiyaning o'ziga qayta havola beradi.
Qachonki biz \`new\` kalit so'zi bilan yangi obyekt yaratsak, JavaScript orqa fonda quyidagi ishlarni bajaradi:
1. Yangi bo'sh obyekt yaratadi.
2. Obyektning \`__proto__\` yashirin xossasini konstruktor funksiyaning \`prototype\` obyektiga bog'laydi.
3. Konstruktor funksiyani \`this\` kalit so'zini shu yangi obyektga qaratib ishga tushiradi.
4. Obyektni qaytaradi.

\`\`\`
[ eagle ] ──__proto__──> [ Bird.prototype ] ──__proto__──> [ Animal.prototype ] ──__proto__──> [ Object.prototype ] ──__proto__──> null
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`prototype\` va \`__proto__\` ni adashtirib yuborish
* **\`prototype\`** — bu faqat konstruktor funksiyalar (va klasslar)da mavjud bo'lgan xossa bo'lib, u orqali yaratiladigan obyektlarga andoza beriladi.
* **\`__proto__\`** — bu yaratilgan obyekt nusxasining haqiqiy prototipiga ishora qiluvchi yashirin havoladir.

### 2. Prototipni butunlay almashtirganda \`constructor\` xossasini tuzatishni unutish
#### Xato:
\`\`\`javascript
function Cat() {}
Cat.prototype = {
  meow() { console.log("Meow"); }
};
const myCat = new Cat();
console.log(myCat.constructor === Cat); // false! constructor yo'qoldi (Object bo'lib qoldi)
\`\`\`
#### Tuzatish:
\`\`\`javascript
Cat.prototype = {
  constructor: Cat, // constructor havolasini qo'lda tiklash
  meow() { console.log("Meow"); }
};
\`\`\`

### 3. Prototip zanjirini dynamic ravishda \`__proto__\` orqali o'zgartirish
#### Xato:
\`\`\`javascript
obj.__proto__ = newProto; // Juda sekin ishlaydi va xavfli!
\`\`\`
#### Tuzatish:
Prototipni dynamic o'zgartirishdan qoching, uning o'rniga boshidanoq \`Object.create(proto)\` yordamida to'g'ri yarating.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Prototip nima?
   * **Javob:** Obyektlar o'rtasida metodlar va xossalarni ulashish imkonini beruvchi andoza (havola).
2. **Savol:** Prototip zanjiri qayerda tugaydi?
   * **Javob:** \`Object.prototype.__proto__\` da, ya'ni \`null\` qiymatida.
3. **Savol:** \`Object.create(proto)\` nima qiladi?
   * **Javob:** Berilgan \`proto\` obyektini prototip qilib olgan yangi bo'sh obyekt yaratadi.
4. **Savol:** Barcha funksiyalarda \`prototype\` xossasi bormi?
   * **Javob:** Arrow (o'q) funksiyalarda \`prototype\` mavjud emas va ularni \`new\` bilan chaqirib bo'lmaydi.

### Middle
5. **Savol:** \`__proto__\` va \`prototype\` farqi nimada?
   * **Javob:** \`prototype\` konstruktorda yangi nusxalarga andoza berish uchun xizmat qiladi. \`__proto__\` esa obyekt nusxasining o'z prototipiga bo'lgan real havolasidir.
6. **Savol:** Prototipdagi xossani obyektning o'zidagi xossa bilan to'sib qo'yish (Shadowing) nima?
   * **Javob:** Obyektning o'zida prototipdagi xossa bilan bir xil nomli xossa yaratish. JS uni birinchi topadi va prototipdagini to'sib qo'yadi.
7. **Savol:** \`hasOwnProperty\` metodi nima uchun kerak?
   * **Javob:** Obyektda xossa prototip zanjiridan olinmayotganini, balki obyektning shaxsiy xossasi ekanini aniqlash uchun.
8. **Savol:** \`Object.create(null)\` yordamida yaratilgan obyektning afzalligi nimada?
   * **Javob:** Unda mutlaqo prototip va standart metodlar (masalan \`toString\`, \`hasOwnProperty\`) bo'lmaydi. Bu uni kesh yoki toza lug'at sifatida xavfsiz qiladi.

### Senior
9. **Savol:** Prototype Pollution (Prototiplarni ifloslantirish) zaifligi nima va undan qanday himoyalanish mumkin?
   * **Javob:** Dynamic obyektlarni birlashtirishda tajovuzkor \`__proto__\` yoki \`constructor.prototype\` orqali global \`Object.prototype\`ga zararli xossalar qo'shib yuborishi. Himoyalanish uchun \`Object.create(null)\` ishlatish, kirish ma'lumotlarini filtrlash yoki \`Object.freeze(Object.prototype)\` qilish mumkin.
10. **Savol:** Nima uchun dynamic prototip o'zgartirish (\`Object.setPrototypeOf\`) sekin ishlaydi?
    * **Javob:** JS dvigateli (V8) obyektlar strukturasini tezlashtirish uchun Inline Cache va Hidden Classes (Map) tizimidan foydalanadi. Prototip o'zgarganda bu optimallashtirishlar butunlay bekor qilinadi va qayta quriladi.
11. **Savol:** Prototip zanjirini tekshirish uchun \`instanceof\` qanday ishlaydi?
    * **Javob:** U o'ng tomondagi konstruktorning \`prototype\` xossasi chap tomondagi obyektning \`__proto__\` prototip zanjirida bor yoki yo'qligini tekshiradi.
12. **Savol:** ES6 klasslaridagi \`super\` kalit so'zi prototiplarda qanday ishlaydi?
    * **Javob:** Orqa fonda u joriy obyekt prototipining prototipidagi (\`Object.getPrototypeOf(Proto)\`) mos metodni chaqiradi va \`this\` kontekstini saqlab qoladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Prototip zanjirini ulash, global obyekt prototiplarini kengaytirish va Object.create bilan ishlash bo'yicha amaliy topshiriqlarni bajaring.

---

## 7. 📝 12 ta Mini Test

Dars yakunidagi prototiplar va vorislik bo'yicha testlar.

---

## 8. 🎯 Real Project Case Study

### Kengaytiriladigan Log Tizimi (Extensible Logging Plugin)
Katta loyihalarda umumiy bazaviy loger tuzib, keyinchalik turli xizmatlar uchun uning prototipini buzmasdan yangi metodlar bilan kengaytirilgan variantlarini yaratish kerak bo'ladi.

\`\`\`javascript
// Bazaviy loger
const baseLogger = {
  log(message) {
    console.log(\`[LOG] \${new Date().toISOString()}: \${message}\`);
  },
  error(message) {
    console.error(\`[ERROR] \${new Date().toISOString()}: \${message}\`);
  }
};

// Maxsus xizmat loggeri
const paymentLogger = Object.create(baseLogger);

// Yangi metod qo'shamiz
paymentLogger.logPayment = function(amount, currency) {
  this.log(\`To'lov amalga oshirildi: \${amount} \${currency}\`);
};

// Foydalanish:
paymentLogger.logPayment(150, "USD"); // [LOG] 2026-06-10T...: To'lov amalga oshirildi...
paymentLogger.error("Tizimda xato!"); // Ota metod ishlamoqda
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Metodlarni prototipda saqlang:** Agar bir nechta obyektlar yaratilsa, ularning metodlarini konstruktor ichida emas, prototipida yozing. Bu RAM sarfini sezilarli tejaydi.
* **Zanjir chuqurligiga e'tibor bering:** Agar prototip zanjiri juda uzun bo'lsa (5 tadan ko'p ota-ona), xossa qidirish vaqti ortadi.

---

## 10. 📌 Cheat Sheet

| Metod / Xossa | Vazifasi | Misol |
| :--- | :--- | :--- |
| **\`__proto__\`** | Obyekt nusxasining haqiqiy prototip havolasi | \`obj.__proto__\` |
| **\`prototype\`** | Konstruktor orqali beriladigan andoza xossasi | \`Constructor.prototype\` |
| **\`Object.create(proto)\`** | Berilgan prototip bilan yangi obyekt yaratadi | \`Object.create(baseObj)\` |
| **\`hasOwnProperty(prop)\`** | Xossa obyektning shaxsiy o'zinikimi yoki yo'qligini tekshiradi | \`obj.hasOwnProperty("name")\` |
| **\`Object.getPrototypeOf(obj)\`**| Obyektning prototipini qaytaradi (Modern usul) | \`Object.getPrototypeOf(obj)\` |
| **\`Object.create(null)\`** | Prototipsiz, toza obyekt yaratadi | \`const dict = Object.create(null)\` |
`,
  exercises: [
  {
    "id": 1,
    "title": "Prototipli Vorislik Zanjiri (ES5)",
    "instruction": "Berilgan `Animal` konstruktor funksiyasidan vorislik oluvchi `Dog` konstruktor funksiyasini yozing. `Dog` ota konstruktordagi `name` xossasini qabul qilishi va qo'shimcha `breed` xossasiga ega bo'lishi kerak. Prototip zanjirini to'g'ri o'rnating va `constructor` xossasini tuzating.",
    "startingCode": "function Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.speak = function() {\n  return this.name + ' shovqin solmoqda';\n};\n\nfunction Dog(name, breed) {\n  // Kodni shu yerda yozing\n}\n// Vorislikni sozlang\n",
    "hint": "`Dog` ichida `Animal.call(this, name)` dan foydalanib ota xossani chaqiring. Keyin `Dog.prototype = Object.create(Animal.prototype)` qiling va uning `constructor`ini `Dog` ga tenglang.",
    "test": "const sandbox = new Function(code + '; return { Animal, Dog };');\nconst scope = sandbox();\nconst husky = new scope.Dog('Maks', 'Husky');\nif (!(husky instanceof scope.Animal)) return 'Dog Animal-dan vorislik olmagan';\nif (husky.speak() !== 'Maks shovqin solmoqda') return 'Ota metod (speak) xato ishlayapti';\nif (husky.breed !== 'Husky') return 'breed xossasi to\\'g\\'ri o\\'rnatilmagan';\nif (husky.constructor !== scope.Dog) return 'Dog prototipining constructor xossasi tuzatilmadi';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Massiv Prototipini Kengaytirish",
    "instruction": "Barcha JavaScript massivlarida ishlaydigan shaxsiy `Array.prototype.last()` metodini yarating. U massivning eng oxirgi elementini qaytarsin. Agar massiv bo'sh bo'lsa, `undefined` qaytarsin.",
    "startingCode": "// Prototipni shu yerda kengaytiring\n",
    "hint": "`Array.prototype.last = function() { ... }` ko'rinishida yozib, massiv elementiga `this` kalit so'zi va uning uzunligi `this.length` orqali murojaat qiling.",
    "test": "const sandbox = new Function(code + '; return [\"olma\", \"anor\", \"limon\"].last();');\nif (sandbox() !== 'limon') return 'last() metodi oxirgi elementni qaytarmadi';\nconst emptySandbox = new Function(code + '; return [].last();');\nif (emptySandbox() !== undefined) return 'Bo\\'sh massiv uchun undefined qaytarishi kerak';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Object.create yordamida Prototip Bog'lash",
    "instruction": "Berilgan `person` obyektini prototip sifatida qabul qiluvchi yangi `student` obyektini `Object.create` yordamcha metodi orqali yarating. `student` obyektida shaxsiy `study()` metodi bo'lsin va u `'O\\'qimoqda'` degan matnni qaytarsin.",
    "startingCode": "const person = {\n  greet() {\n    return 'Salom';\n  }\n};\n\n// student obyektini yarating\n",
    "hint": "`const student = Object.create(person);` yordamida voris obyekt oching va unga `student.study = function() { ... }` shaklida metod biriktiring.",
    "test": "const sandbox = new Function(code + '; return student;');\nconst st = sandbox();\nif (!st) return 'student obyekti yaratilmagan';\nif (Object.getPrototypeOf(st) !== person) return 'student obyekti prototipi person ga bog\\'lanmagan';\nif (st.greet() !== 'Salom') return 'student otasining greet() metodini chaqira olmayapti';\nif (typeof st.study !== 'function' || st.study() !== 'O\\'qimoqda') return 'study() metodi to\\'g\\'ri yozilmagan';\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript prototipiga oid qaysi ta'rif to'g'ri?",
    "options": [
      "Faqat server xotirasini tejaydigan maxsus API kalit",
      "JavaScript obyektlari o'zaro xossalar va metodlarni baham ko'rish uchun foydalanadigan andoza (boshqa obyektga havola)",
      "Faqat massivlarni saralashda ishlatiladigan ichki algoritm",
      "Faqat HTML sahifasini o'zgartiradigan JavaScript kodi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da har bir obyekt boshqa bir obyektga yashirin havolaga ega bo'ladi, u prototip (prototype) deb ataladi. Obyekt undagi metod va xossalarni meros qilib oladi."
  },
  {
    "id": 2,
    "question": "Obyektning `__proto__` xossasi va Konstruktor funksiyasining `prototype` xossasi farqi nimada?",
    "options": [
      "Hech qanday farqi yo'q, ikkalasi bir xil narsa",
      "`__proto__` obyektning aniq prototip havolasidir; `prototype` esa konstruktor funksiyadan yaratiladigan yangi obyektlarga prototip qilib beriladigan obyektdir",
      "`prototype` faqat satrlarda, `__proto__` esa faqat raqamlarda ishlaydi",
      "`__proto__` yangi metodlar yaratadi, `prototype` esa ularni o'chiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`__proto__` har bir obyekt nusxasining real prototipiga ishora qiluvchi getter/setter. `prototype` esa faqat konstruktor funksiyalarda (yoki klasslarda) bo'lib, yangi yaratilgan obyekt unga `__proto__` orqali ulanadi."
  },
  {
    "id": 3,
    "question": "Prototip zanjiri (Prototype Chain) qanday ishlaydi?",
    "options": [
      "Obyektdan xossa qidirilganda, JS avval obyektning o'zini, topilmasa uning prototipini, undan keyin esa zanjir bo'ylab yuqori prototiplarni tekshirib boradi",
      "Xossalarni faqat global o'zgaruvchilardan qidiradi",
      "Faqat xatolar yuz berganda ularni qayta ishlaydi",
      "Barcha metodlarni bir vaqtda parallel ishga tushiradi"
    ],
    "correctAnswer": 0,
    "explanation": "Agar obyektning o'zida so'ralgan xossa topilmasa, JavaScript uning prototipiga (`__proto__`) o'tadi va to `null` qiymatga yetguncha zanjir bo'ylab qidirishni davom ettiradi."
  },
  {
    "id": 4,
    "question": "JavaScript prototip zanjirining eng yuqori (oxirgi) nuqtasida qaysi obyekt turadi va uning prototipi nimaga teng?",
    "options": [
      "`Function.prototype` va uning prototipi `undefined` ga",
      "`Object.prototype` va uning prototipi `null` ga",
      "`Array.prototype` va uning prototipi `Object` ga",
      "`window` va uning prototipi `document` ga"
    ],
    "correctAnswer": 1,
    "explanation": "Deyarli barcha obyektlar oxir-oqibat `Object.prototype`dan meros oladi. `Object.prototype.__proto__` esa `null` ga teng bo'lib, zanjir shu yerda tugaydi."
  },
  {
    "id": 5,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst animal = { eats: true };\nconst rabbit = Object.create(animal);\nrabbit.eats = false;\nconsole.log(rabbit.eats);\nconsole.log(animal.eats);\n```",
    "options": [
      "`true`, `true`",
      "`false`, `false`",
      "`false`, `true`",
      "`undefined`, `true`"
    ],
    "correctAnswer": 2,
    "explanation": "`rabbit.eats = false` deb yozilganda, bu xossa `rabbit` obyektining o'zida (yuzada) yaratiladi (shadowing). Prototipdagi `animal.eats` esa o'zgarmasdan `true` bo'lib qolaveradi."
  },
  {
    "id": 6,
    "question": "Konstruktor funksiya ichida `this.method = ...` deb yozish va `Constructor.prototype.method = ...` deb yozishning xotira (performance) jihatidan farqi nimada?",
    "options": [
      "Hech qanday farqi yo'q",
      "Konstruktor ichida yozilsa, har bir yangi obyekt nusxasi uchun xotirada alohida yangi funksiya yaratiladi. Prototipga qo'shilsa, barcha nusxalar bitta umumiy funksiya nusxasidan foydalanadi (xotirani tejaydi)",
      "Prototipda yozilgan metodlar tezroq ishlaydi, lekin xotirani ko'proq band qiladi",
      "Konstruktor ichida yozilgan metodlar faqat asinxron ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "Prototipda e'lon qilingan metodlar xotirada faqat bitta nusxada saqlanadi, har bir yangi obyekt (`new` orqali) yaratilganda qayta-qayta nusxalanmaydi, bu esa xotirani sezilarli darajada tejaydi."
  },
  {
    "id": 7,
    "question": "Obyektdagi xossa uning o'zinikimi yoki prototipdan kelayotganini aniqlash uchun qaysi metoddan foydalaniladi?",
    "options": [
      "`obj.isPrototypeOf()`",
      "`obj.hasOwnProperty()`",
      "`obj.instanceof()`",
      "`Object.getPrototypeOf()`"
    ],
    "correctAnswer": 1,
    "explanation": "`hasOwnProperty(propName)` metodi agar xossa to'g'ridan-to'g'ri obyektning o'ziga tegishli bo'lsa `true`, agar u prototip zanjiridan olinayotgan bo'lsa `false` qaytaradi."
  },
  {
    "id": 8,
    "question": "ES6-dagi `class` kalit so'zi JavaScript-ga qanday yangilik olib kirdi?",
    "options": [
      "U prototiplarni butunlay yo'q qildi va klassik OOP mexanizmini yaratdi",
      "U prototipli vorislik ustiga qurilgan qulay sintaktik shakar (syntactic sugar) bo'lib, kod yozishni osonlashtirdi xolos",
      "U faqat ma'lumotlar bazasi bilan ishlash funksiyalarini qo'shdi",
      "U JavaScript dasturlarini avtomatik kompilyatsiya qiladi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-dagi klasslar aslida prototipli vorislikning boshqacha (chiroyli) ko'rinishidir. Orqa fonda baribir o'sha prototiplar va konstruktor funksiyalar ishlayveradi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\nfunction Person() {}\nconst p1 = new Person();\nPerson.prototype.sayHi = () => \"Salom\";\nconsole.log(p1.sayHi());\n```",
    "options": [
      "`TypeError: p1.sayHi is not a function`",
      "`Salom`",
      "`undefined`",
      "`ReferenceError`"
    ],
    "correctAnswer": 1,
    "explanation": "Obyekt prototip bilan bog'lanishi dynamic hisoblanadi. Obyekt yaratilib bo'linganidan so'ng uning prototipiga yangi metod qo'shilsa ham, u zudlik bilan barcha obyekt nusxalarida (jumladan `p1`da ham) ishlay boshlaydi."
  },
  {
    "id": 10,
    "question": "Nima uchun `Object.setPrototypeOf(obj, newProto)` metodidan dynamic foydalanish tavsiya etilmaydi?",
    "options": [
      "Chunki u JS xavfsizlik tizimini butunlay o'chirib qo'yadi",
      "Chunki u JS dvigatellarining ichki optimallashtirish tizimlarini buzadi va kod ishlash tezligini sezilarli darajada pasaytiradi (performance penalty)",
      "Chunki bu metod ES6 tarkibiga kiritilmagan",
      "Chunki u massivlarni o'chirib yuborishi mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Obyekt yaratilgandan so'ng uning prototipini dynamic o'zgartirish (re-prototyping) JS dvigatellarining tezkor xossalarga kirish optimallashtirishlarini (Inline Caches) yo'qqa chiqaradi."
  },
  {
    "id": 11,
    "question": "`Object.create(null)` orqali obyekt yaratilganda nima sodir bo'ladi?",
    "options": [
      "Bo'sh obyekt yaratiladi, lekin unda `toString`, `hasOwnProperty` kabi standart Object metodlari va umuman prototip bo'lmaydi",
      "`null` qiymat qaytadi, obyekt yaratilmaydi",
      "Faqat `null` nomli xossa yaratiladi",
      "Obyekt avtomatik tarzda muzlatiladi (`Object.freeze` qilinadi)"
    ],
    "correctAnswer": 0,
    "explanation": "`Object.create(null)` prototipi `null` bo'lgan, ya'ni mutlaqo hech qanday prototipga (xatto `Object.prototype`ga ham) ega bo'lmagan toza obyekt yaratadi. Unda standart metodlar ishlamaydi."
  },
  {
    "id": 12,
    "question": "Prototipni ifloslantirish (Prototype Pollution) nima?",
    "options": [
      "Faqat kodda ko'plab sharhlar yozish",
      "Tashqi (ko'pincha zararli) kiruvchi ma'lumotlar orqali `__proto__` yoki `constructor.prototype` ga yangi xossalar yozib, global obyekt prototiplarini buzish yoki xavfsizlikni zaiflashtirish",
      "Xotiraning to'lib qolishi muammosi",
      "Prototip metodlarini bir nechta faylda takroran yozish"
    ],
    "correctAnswer": 1,
    "explanation": "Prototype Pollution xavfsizlik zaifligi bo'lib, unda tajovuzkor dynamic obyeklar orqali `Object.prototype`ga zararli metod yoki xossalar qo'shib yuboradi va bu butun ilovadagi barcha obyektlarda aks etadi."
  }
]

};
