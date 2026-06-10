export const classes = {
  id: "classes",
  title: "Classes (Klasslar) - OOP",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Classes (Klasslar) nima?
**Klass (Class)** — bu obyektlar yaratish uchun ishlatiladigan maxsus shablon (qolip) hisoblanadi. JavaScript aslida prototiplarga asoslangan til bo'lsa ham, ES6 (2015) versiyasida klasslar sintaksisi kiritildi. Bu kodni o'qishni osonlashtiradi va boshqa dasturlash tillaridagi (Java, C++, C#) OOP (Obyektga yo'naltirilgan dasturlash) qoidalariga yaqinlashtiradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **pechenye pishiryapsiz**:
* **Qolip (Klass):** Bu pechenye kesadigan metall shakl. Uning o'zi yeyiladigan oziq-ovqat emas, balki pechenye qanday shaklda bo'lishini belgilaydi.
* **Pechenye (Obyekt/Instance):** Shu metall shakl yordamida xamirdan kesib olingan har bir alohida pechenye. Siz ularning ustiga har xil bezak yoki shokolad qo'shishingiz mumkin (\`properties\`), lekin ularning barchasi bir xil qolipdan chiqqan.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Klass va Obyekt yaratish)
\`\`\`javascript
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return \`\${this.model} (\${this.year})\`;
  }
}

// Klassdan obyekt (instance) yaratamiz
const car1 = new Car("BYD Song", 2024);
console.log(car1.getInfo()); // "BYD Song (2024)"
\`\`\`

### 2. Intermediate Example (Inheritance - Merosxo'rlik va \`super()\`)
\`\`\`javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return \`\${this.name} ovqatlanmoqda.\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Ota klass constructorini chaqiramiz
    this.breed = breed;
  }

  bark() {
    return \`\${this.name} vovullamoqda!\`;
  }
}

const myDog = new Dog("Tuzik", "Nemis ovchkasi");
console.log(myDog.eat()); // "Tuzik ovqatlanmoqda."
console.log(myDog.bark()); // "Tuzik vovullamoqda!"
\`\`\`

### 3. Advanced Example (Private maydonlar va Static metodlar)
Tashqaridan o'zgartirib bo'lmaydigan private xususiyatlar (#) va to'g'ridan-to'g'ri klass nomidan chaqiriladigan static metodlar:
\`\`\`javascript
class BankAccount {
  #balance = 0; // Private property (tashqaridan o'qib bo'lmaydi)

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance; // Xavfsiz o'qish
  }

  static getBankName() {
    return "Milliy Bank"; // Static method (instancisiz chaqiriladi)
  }
}

const acc = new BankAccount("Farhod");
acc.deposit(500);
console.log(acc.getBalance()); // 500
console.log(BankAccount.getBankName()); // "Milliy Bank"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Syntactic Sugar (Sintaktik bezak)
JavaScript-dagi klasslar aslida yangi OOP modeli emas. Ular prototiplar ustiga qurilgan.
\`\`\`javascript
class Person {
  constructor(name) { this.name = name; }
  greet() { return "Salom"; }
}
\`\`\`
Yuqoridagi kodni JS dvigateli ichkarida quyidagicha tushunadi:
\`\`\`javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return "Salom";
};
\`\`\`

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Getter va Setter metodlari orqali validatsiya
Foydalanuvchi ismini o'rnatishda tekshiruv (validation) joriy etish:

\`\`\`javascript
class User {
  constructor(name) {
    this._name = name; // Ichki o'zgaruvchi
  }

  // Getter - qiymatni o'qish uchun
  get name() {
    return this._name.toUpperCase();
  }

  // Setter - qiymat yozishda tekshiruv uchun
  set name(value) {
    if (value.trim().length < 3) {
      console.log("Ism kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    this._name = value;
  }
}

const user = new User("Ali");
console.log(user.name); // "ALI"
user.name = "Yo"; // Konsolga ogohlantirish chiqadi, o'zgarmaydi
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Merosxo'r klassda \`super()\`ni chaqirishni unutish
Merosxo'r klass constructorida \`this\`ni ishlatishdan oldin albatta \`super()\` chaqirilishi kerak.
* **Noto'g'ri:**
  \`\`\`javascript
  class Car extends Vehicle {
    constructor(model, color) {
      this.color = color; // ReferenceError!
      super(model);
    }
  }
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  class Car extends Vehicle {
    constructor(model, color) {
      super(model); // Ota constructor birinchi ishlaydi
      this.color = color;
    }
  }
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Kalit so'z | Vazifasi | Misol |
| :--- | :--- | :--- |
| \`class\` | Yangi klass yaratish | \`class User {}\` |
| \`constructor\` | Boshlang'ich qiymat berish | \`constructor(name) {}\` |
| \`extends\` | Meros olish (Inheritance) | \`class Dog extends Animal\` |
| \`super()\` | Ota klass constructorini chaqirish | \`super(name)\` |
| \`static\` | Klassning o'ziga tegishli metod | \`static sum(a, b) {}\` |
| \`#property\` | Shaxsiy (private) maydon | \`#balance = 0\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Klasslar hoisting bo'ladimi?
Yo'q, klasslar let/const kabi Temporal Dead Zone doirasida bo'ladi va e'lon qilinishidan oldin ulardan foydalanib bo'lmaydi (ReferenceError beradi).

### 2. Obyekt ma'lum bir klassga tegishli ekanini qanday tekshirish mumkin?
\`instanceof\` operatori yordamida: \`user instanceof User\` true yoki false qaytaradi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Prototiplarga asoslangan merosxo'rlik va Klasslar o'rtasida qanday bog'liqlik bor?
2. Private maydonlarga (#) klassdan tashqarida murojaat qilsa nima sodir bo'ladi?
3. Static metod ichida \`this\` ishlatsa bo'ladimi? (Static metodlarda \`this\` klassning o'ziga ishora qiladi, obyektga emas).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida klasslar bo'yicha bilimlaringizni sinab ko'ring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Oddiy Klass Yaratis",
    "instruction": "'Person' nomli klass yarating. Klass constructor'i 'name' va 'age' parametrlarini qabul qilib, ularni obyekt xususiyatlariga o'zlashtirsin.",
    "startingCode": "// Kodni shu yerda yozing\n",
    "hint": "class Person { constructor(name, age) { this.name = name; this.age = age; } }",
    "test": "if (!code.includes('class Person')) return 'Person klassi yaratilmadi';\nif (!code.includes('constructor')) return 'constructor yozilmadi';\nconst sandbox = new Function(code + '; return Person;');\nconst PersonClass = sandbox();\nconst instance = new PersonClass('Ali', 25);\nif (instance.name === 'Ali' && instance.age === 25) return null;\nreturn 'Klass xususiyatlari noto\\'g\\'ri o\\'rnatildi';"
  },
  {
    "id": 2,
    "title": "Klassga Metod Qo'shish",
    "instruction": "'Car' nomli klass yarating. Uning constructor'i 'model' parametrini qabul qilsin. Klassga 'drive' nomli metod qo'shing, u '[model] haydalmoqda' matnini qaytarsin.",
    "startingCode": "// Kodni shu yerda yozing\n",
    "hint": "class Car { constructor(model) { this.model = model; } drive() { return this.model + ' haydalmoqda'; } }",
    "test": "if (!code.includes('class Car')) return 'Car klassi yaratilmadi';\nif (!code.includes('drive(')) return 'drive metodi qo\\'shilmadi';\nconst sandbox = new Function(code + '; return Car;');\nconst CarClass = sandbox();\nconst instance = new CarClass('Tesla');\nif (instance.drive() === 'Tesla haydalmoqda') return null;\nreturn 'drive() metodi kutilgan natijani qaytarmadi';"
  },
  {
    "id": 3,
    "title": "Inheritance (Merosxo'rlik)",
    "instruction": "'Animal' klassidan meros oluvchi 'Dog' klassini yarating. 'Dog' klassi constructor'ida 'super' yordamida ota klass constructor'iga 'name' parametrini uzating.",
    "startingCode": "class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  eat() {\n    return this.name + ' yeyapti';\n  }\n}\n\n// Kodni shu yerda yozing\n",
    "hint": "class Dog extends Animal { constructor(name) { super(name); } }",
    "test": "if (!code.includes('extends Animal')) return 'Dog klassi Animaldan extends orqali meros olmadi';\nif (!code.includes('super(')) return 'super() orqali ota klass constructori chaqirilmadi';\nconst sandbox = new Function('Animal', code + '; return Dog;');\nconst DogClass = sandbox(Animal);\nconst instance = new DogClass('Tuzik');\nif (instance.eat() === 'Tuzik yeyapti') return null;\nreturn 'Dog klassi Animal metodini muvaffaqiyatli meros qilib olmadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript klasslarida (Classes) `constructor` metodining asosiy vazifasi nima?",
    "options": [
      "Klass uchun yeni metodlarni yaratish",
      "Klassdan yangi obyekt (instance) olingan vaqtda avtomatik ishga tushib, obyektning boshlang'ich xususiyatlarini (properties) o'rnatish",
      "HTML elementlarni brauzerda render qilish",
      "Kodni optimallashtirish va tezligini oshirish"
    ],
    "correctAnswer": 1,
    "explanation": "`constructor` - yangi obyekt yaratilganda (`new` kalit so'zi bilan chaqirilganda) klass ichida birinchi bo'lib avtomatik ishlaydigan va obyekt property'larini initsializatsiya qiladigan maxsus metoddir."
  },
  {
    "id": 2,
    "question": "Merosxo'r klass (subclass) constructor'ida `this` kalit so'zini ishlatishdan oldin nima qilish majburiy hisoblanadi?",
    "options": [
      "`super()` funksiyasini chaqirib, ota klass (superclass) constructor'ini ishga tushirish",
      "Klass nomini kichik harflarda yozish",
      "`this` o'zgaruvchisini `null` qilish",
      "`super.prototype` ni o'chirish"
    ],
    "correctAnswer": 0,
    "explanation": "Merosxo'r klassda `this` dan foydalanishdan avval ota klass constructor'ini chaqirish uchun `super()` ishga tushirilishi zarur, aks holda ReferenceError yuz beradi."
  },
  {
    "id": 3,
    "question": "`static` kalit so'zi yordamida e'lon qilingan metod (static method) qanday chaqiriladi?",
    "options": [
      "Faqat `new` orqali yaratilgan obyekt (instance) orqali chaqiriladi",
      "Klass instansiyasini yaratmasdan, to'g'ridan-to'g'ri klass nomidan chaqiriladi (masalan, `MathHelper.add()`)",
      "Faqat `super` yordamida chaqiriladi",
      "Faqat asinxron tarzda `await` bilan chaqiriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Static metodlar klass instansiyalariga (obyektlarga) bog'lanmagan bo'ladi. Ular faqat klassning o'z nomidan chaqiriladi."
  },
  {
    "id": 4,
    "question": "ES6 klasslarida maydon yoki metod nomining oldiga qo'yiladigan panjara (`#`) belgisi nimani anglatadi?",
    "options": [
      "Ushbu maydon xotiradan butunlay o'chirilishini",
      "Ushbu maydon mutlaqo shaxsiy (private) ekanligini va unga faqat klass ichidan murojaat qilish mumkinligini (tashqaridan o'qib yoki o'zgartirib bo'lmaydi)",
      "Ushbu maydon global o'zgaruvchiga aylanganini",
      "Bu CSS selektorini belgilash uchun ishlatilishini"
    ],
    "correctAnswer": 1,
    "explanation": "Panjara `#` belgisi bilan boshlanuvchi maydonlar (fields) va metodlar to'liq shaxsiy (private) hisoblanib, ularga klass tashqarisidan to'g'ridan-to'g'ri murojaat qilish taqiqlanadi."
  },
  {
    "id": 5,
    "question": "JavaScript'dagi klasslar (Classes) haqida qaysi fikr to'g'ri?",
    "options": [
      "JavaScript klasslari butunlay yangi mustaqil OOP modelidir",
      "JavaScript klasslari aslida mavjud prototipli inheritance (prototype-based inheritance) ustiga qurilgan qulay \"syntactic sugar\" (sintaktik bezak) xolos",
      "Klasslar hoisting bo'ladi va e'lon qilinishidan oldin to'liq ishlatilishi mumkin",
      "Klasslar faqat server (Node.js) muhitida ishlaydi, brauzerda ishlamaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript tagida baribir prototype inheritance yotadi. ES6 klasslari esa koderlar uchun o'qish va yozishni osonlashtiruvchi sintaktik qobiq (syntactic sugar) vazifasini bajaradi xolos."
  },
  {
    "id": 6,
    "question": "Klass getter (get) metodi qanday chaqiriladi?",
    "options": [
      "Funksiya kabi qavslar bilan (masalan: `person.age()`)",
      "Oddiy property kabi, qavslarsiz (masalan: `person.age`)",
      "Faqat static metodlar ichida",
      "get kalit so'zi yordamida new orqali chaqiriladi"
    ],
    "correctAnswer": 1,
    "explanation": "Getter metodlar (get kalit so'zi bilan yozilganlar) chaqirilganda funksiya kabi qavs qo'yilmaydi, balki oddiy xususiyat (property) kabi o'qiladi."
  },
  {
    "id": 7,
    "question": "Agar merosxo'r klassda `constructor` e'lon qilinmasa nima sodir bo'ladi?",
    "options": [
      "JavaScript xato qaytaradi (ReferenceError)",
      "JavaScript o'zi avtomatik ota klass constructor'ini barcha parametrlari bilan chaqiruvchi default constructor yaratadi",
      "Merosxo'rlik ishlamaydi",
      "Obyekt yaratilganda default qiymat undefined bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Agar child klassda constructor yozilmasa, JS dvigateli avtomatik ravishda `constructor(...args) { super(...args); }` ko'rinishidagi default constructor yaratadi."
  },
  {
    "id": 8,
    "question": "Klassda setter (set) metodlarining asosiy maqsadi va ishlatilishi nima?",
    "options": [
      "Qiymatni ekranga chop etish uchun",
      "Biror property'ga qiymat berishdan oldin uni tekshirish (validatsiya qilish) yoki o'zgartirish",
      "Klassga yangi static metodlar qo'shish",
      "Obyektni JSON ko'rinishiga o'tkazish"
    ],
    "correctAnswer": 1,
    "explanation": "Setter (set) metodlar property'ga yangi qiymat berilayotganda uni tekshirish, filtrlash yoki o'zgartirish imkonini beradi."
  },
  {
    "id": 9,
    "question": "`new.target` klass ichida nimani aniqlash uchun ishlatiladi?",
    "options": [
      "Yangi yaratiladigan HTML target elementini",
      "Klass to'g'ridan-to'g'ri chaqirilganini yoki merosxo'r klass orqali chaqirilganini (masalan, abstract klass yaratishda)",
      "Klassdagi static metodlar sonini",
      "Global 'this' obyekti targetini"
    ],
    "correctAnswer": 1,
    "explanation": "`new.target` constructor qaysi klass orqali chaqirilganini aniqlaydi. Agar klass bevosita chaqirilgan bo'lsa, `new.target` shu klassning o'zini qaytaradi."
  },
  {
    "id": 10,
    "question": "Ota klassdagi oddiy metodni merosxo'r klassda xuddi shu nom bilan qayta yozish (override qilish) qanday amalga oshiriladi?",
    "options": [
      "override kalit so'zi yordamida",
      "Merosxo'r klass ichida shunchaki o'sha nom bilan yangi metod e'lon qilish orqali (ota metodni chaqirish uchun `super.metodNom()` ishlatilishi mumkin)",
      "Buning iloji yo'q, xatolik yuz beradi",
      "Faqat static metodlarni override qilish mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Merosxo'r klassda ota klassdagi metod nomini qaytadan e'lon qilish orqali uni override qilish mumkin. Agar eski ota metodni ham ishlatmoqchi bo'lsak, `super.metodNom()` deb murojaat qilamiz."
  },
  {
    "id": 11,
    "question": "Klasslar hoisting (kodning yuqorisiga ko'tarilish) bo'ladimi?",
    "options": [
      "Ha, var kabi hoisting bo'ladi va e'lon qilinishidan oldin ishlatish mumkin",
      "Yo'q, klasslar hoisting bo'lmaydi (TDZda bo'ladi) va ulardan faqat e'lon qilingandan keyin foydalanish mumkin",
      "Faqat static klasslar hoisting bo'ladi",
      "Faqat constructor bo'lmagan klasslar hoisting bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Klasslar hoisting bo'lmaydi (funksiyalardan farqli ravishda, xuddi let/const kabi Temporal Dead Zone qoidasiga bo'ysunadi). Ularni faqat e'lon qilingandan keyin chaqirish mumkin."
  },
  {
    "id": 12,
    "question": "JavaScript klasslarida prototype zanjirini (prototype chain) tekshirish uchun qaysi operator ishlatiladi?",
    "options": [
      "`typeof`",
      "`instanceof`",
      "`in`",
      "`hasOwnProperty`"
    ],
    "correctAnswer": 1,
    "explanation": "`instanceof` operatori obyektning prototipi uning prototype zanjirida constructor.prototype'ga mos kelish-kelmasligini tekshiradi."
  }
]

};
