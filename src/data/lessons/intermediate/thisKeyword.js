export const thisKeyword = {
  id: "this-keyword",
  title: "🎯 This Keyword va Context Binding (Chuqur O'rganish)",
  level: "O'rta",
  description: "JavaScript'dagi eng murakkab mavzu: this kaliti, binding qoidalari, call/apply/bind, va event listeners.",
  theory: `## 📌 THIS KEYWORD — MASTER BOSQICHI

### 1. NEGA KERAK? (Sabab)

**Muammo:** Mingta foydalanuvchi uchun alohida funksiya yozaman?
\`\`\`javascript
// ❌ XATO - Millionlab kod
const user1 = { ism: "Ali", salomBer: function() { console.log("Salom, Ali"); } };
const user2 = { ism: "Zara", salomBer: function() { console.log("Salom, Zara"); } };
const user3 = { ism: "Bobur", salomBer: function() { console.log("Salom, Bobur"); } };
\`\`\`

**Yechim:** this orqali bitta funksiya
\`\`\`javascript
// ✅ TO'G'RI - Bitta funksiya
function salomBer() {
  console.log("Salom, " + this.ism);
}

const user1 = { ism: "Ali", salomBer };
const user2 = { ism: "Zara", salomBer };
const user3 = { ism: "Bobur", salomBer };

user1.salomBer(); // "Salom, Ali"
user2.salomBer(); // "Salom, Zara"
user3.salomBer(); // "Salom, Bobur"
\`\`\`

---

### 2. SODDALIK (Analogiya)

**"Men" so'zi:**
- Siz: "Mening ismim Ali" — "Men" = Ali
- Zara: "Mening ismim Zara" — "Men" = Zara

**this — JavaScript'dagi "Men":**
- Ishlayotgan kontekstga beroq beradi
- Funksiya qayerdagi chaqirilganiga bog'liq

---

### 3. THIS BINDING 4 QOIDASI (ASOSIY)

#### A. Default Binding (Oddiy chaqirish)

\`\`\`javascript
function whoAmI() {
  console.log(this);
}

whoAmI(); // window (brauzerda)
// YOKI undefined (strict mode'da)

// Misol:
const person = {};
const sayName = function() {
  console.log(this === person); // false
  console.log(this === window); // true (strict mode'da undefined)
};
sayName(); // Chaqirish: window
\`\`\`

#### B. Method Binding (Metod sifatida chaqirish)

\`\`\`javascript
const user = {
  ism: "Ali",
  yosh: 25,

  salomBer() {
    console.log("Salom, " + this.ism); // this = user
  },

  info() {
    console.log(this.ism + " — " + this.yosh + " yosh");
  }
};

user.salomBer(); // "Salom, Ali"
user.info(); // "Ali — 25 yosh"

// MUHIM: Agar metodni o'zgaruvchiga saqlab, keyin chaqirsak:
const salomBer = user.salomBer;
salomBer(); // this = window, "Salom, undefined"
\`\`\`

#### C. Explicit Binding (Aniq qilish: call, apply, bind)

\`\`\`javascript
// 1. CALL - Darhol chaqirish + this belgilash
function salomBer(til, emoji) {
  console.log(emoji + " Salom, " + this.ism + "! " + til);
}

const user1 = { ism: "Ali" };
const user2 = { ism: "Zara" };

salomBer.call(user1, "Uzbekcha", "👋"); // 👋 Salom, Ali! Uzbekcha
salomBer.call(user2, "English", "🙋"); // 🙋 Salom, Zara! English

// 2. APPLY - call kabi, lekin parametrlar array'da
salomBer.apply(user1, ["Uzbekcha", "👋"]); // 👋 Salom, Ali! Uzbekcha

// 3. BIND - Yangi funksiya qaytaradi (this fixed)
const aliSalomBer = salomBer.bind(user1);
aliSalomBer("Uzbekcha", "👋"); // 👋 Salom, Ali! Uzbekcha

// Keyingi chaqiruvlarda ham this = user1 qoladi
aliSalomBer("English", "🙋"); // 🙋 Salom, Ali! English
\`\`\`

#### D. New Binding (Konstruktor sifatida)

\`\`\`javascript
function Robot(ism) {
  this.ism = ism;
  this.salamlash = function() {
    console.log("Salom, men " + this.ism);
  };
}

const robot1 = new Robot("R2D2");
const robot2 = new Robot("C3PO");

robot1.salamlash(); // "Salom, men R2D2"
robot2.salamlash(); // "Salom, men C3PO"

// new qilmasak:
Robot("Beysbot"); // this = window (xato!)
\`\`\`

---

### 4. ARROW FUNCTIONS VA THIS (MUHIM!)

#### Oddiy funksiya: this dynamic
\`\`\`javascript
const user = {
  ism: "Ali",
  hiDynamic: function() {
    console.log("Oddiy:", this.ism); // this = user
  }
};

user.hiDynamic(); // "Oddiy: Ali"

// O'zgaruvchiga saqlasa:
const saqlangan = user.hiDynamic;
saqlangan(); // "Oddiy: undefined" (this = window)
\`\`\`

#### Arrow funksiya: this lexical (static)
\`\`\`javascript
const user = {
  ism: "Ali",
  hiArrow: () => {
    console.log("Arrow:", this.ism); // this = GLOBAL (parent context)
  }
};

user.hiArrow(); // "Arrow: undefined" (window.ism yo'q)

// SHUNING UCHUN: Metodlar uchun arrow funksiya ishlatma!
// LEKIN: Callback uchun arrow funksiya juda yaxshi!
\`\`\`

#### Arrow funksiya nested method ichida
\`\`\`javascript
const user = {
  ism: "Ali",
  savollar: ["Q1", "Q2"],

  ishlash: function() {
    // this = user
    this.savollar.forEach((savol) => {
      // Arrow: this = user (parent context)
      console.log(this.ism + " — " + savol);
    });
  }
};

user.ishlash();
// Ali — Q1
// Ali — Q2
\`\`\`

---

### 5. EVENT LISTENERS VA THIS

\`\`\`javascript
// HTML:
// <button id="myBtn">Click me</button>

const button = document.getElementById("myBtn");

// ❌ XATO - Arrow: this = window
button.addEventListener("click", () => {
  console.log(this); // window (event target emas!)
});

// ✅ TO'G'RI - Regular: this = button
button.addEventListener("click", function() {
  console.log(this); // button element
  this.style.backgroundColor = "blue";
});

// ✅ TO'G'RI - bind yordamida
class Button {
  constructor(id) {
    this.button = document.getElementById(id);
    this.button.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    console.log(this); // Button instance
  }
}
\`\`\`

---

### 6. REAL HAYOTDAGI MISOLLAR

#### Misol 1: User class
\`\`\`javascript
class User {
  constructor(ism, yosh) {
    this.ism = ism;
    this.yosh = yosh;
  }

  info() {
    return this.ism + " — " + this.yosh + " yosh";
  }

  // Callback uchun arrow
  getInfoAsync() {
    setTimeout(() => {
      console.log(this.info()); // this = User instance
    }, 1000);
  }
}

const user = new User("Ali", 25);
user.getInfoAsync(); // "Ali — 25 yosh"
\`\`\`

#### Misol 2: Event handler
\`\`\`javascript
class Form {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted by:", this.form.id);
  }
}
\`\`\`

#### Misol 3: Array methods + this
\`\`\`javascript
const calculator = {
  numbers: [1, 2, 3, 4, 5],
  multiplier: 10,

  // YAXSHI - Arrow: this = calculator
  getMultiplied() {
    return this.numbers.map(n => n * this.multiplier);
  },

  // XATO - Regular: this = undefined
  getMultipliedBad() {
    return this.numbers.map(function(n) {
      return n * this.multiplier; // undefined
    });
  }
};

console.log(calculator.getMultiplied()); // [10, 20, 30, 40, 50]
\`\`\`

---

### 7. XATOLAR VA EDGE CASES

#### ❌ Xato 1: Lost context
\`\`\`javascript
const user = {
  ism: "Ali",
  saluding: function() {
    console.log(this.ism);
  }
};

// XATO - this yo'qoladi
const greet = user.saluding;
greet(); // undefined

// TO'G'RI - bind yordamida
const greetFixed = user.saluding.bind(user);
greetFixed(); // "Ali"
\`\`\`

#### ❌ Xato 2: Arrow method
\`\`\`javascript
// XATO - this = window
const user = {
  ism: "Ali",
  greet: () => {
    console.log(this.ism); // window.ism
  }
};

// TO'G'RI - Regular function
const user = {
  ism: "Ali",
  greet() {
    console.log(this.ism); // user.ism
  }
};
\`\`\`

#### ❌ Xato 3: setTimeout this
\`\`\`javascript
// XATO - this = window
class Counter {
  count = 0;
  increment() {
    setTimeout(function() {
      this.count++; // this = window
    }, 1000);
  }
}

// TO'G'RI - Arrow
class Counter {
  count = 0;
  increment() {
    setTimeout(() => {
      this.count++; // this = Counter
    }, 1000);
  }
}
\`\`\`

#### ⚠️ Edge Case: Chained calls
\`\`\`javascript
const user = {
  ism: "Ali",

  greet() {
    console.log("Salom, " + this.ism);
    return this; // Chaining uchun
  },

  wave() {
    console.log(this.ism + " saloma qo'lyapti");
    return this;
  }
};

user.greet().wave(); // Chaining ishlaydi
\`\`\`

---

### 8. 12 TA SAVOL VA JAVOBLAR

**<b>1. this so'zining asosiy ma'nosi nima?</b>**
this — funksiya qaysi kontekstda chaqirilayotganini ko'rsatadi. U "mening" yoki "bu object" degan so'z kabi.


**<b>2. Global kontekstda this nima qaytaradi?</b>**
Brauzerda: window. Node.js'da: global. Strict mode'da: undefined.


**<b>3. Obyekt metodida this nimaga teng?</b>**
O'sha objektning o'ziga teng. Masalan: user.method() qilsa, this = user.


**<b>4. Arrow funksiyalarda this bormi?</b>**
Ha, lekin u o'zining this'i emas — parent context'dan olinadi (lexical this).


**<b>5. call(), apply(), bind() farqi nima?</b>**
call — darhol chaqirish, parametrlar ketma-ketlik. apply — darhol chaqirish, parametrlar array. bind — yangi funksiya qaytarish (keyincha chaqirish mumkin).


**<b>6. Nima uchun arrow funksiyani metodda ishlatmaslik kerak?</b>**
Arrow funksiyada this lexical (parent'dan olinadi), method'da dynamic this kerak.


**<b>7. setTimeout ichidagi this muammosini qanday hal qilish?</b>**
Arrow funksiyani ishlatish yoki bind() qilish. setTimeout(() => { this... }) yoki setTimeout(func.bind(this), 1000).


**<b>8. new kalit so'zi bilan chaqirilganda this nima bo'ladi?</b>**
Yangi omda yaratiladi, this — o'sha omda. Constructor'ning oxirida return undefined bo'lmasa, this qaytariladi.


**<b>9. this qiymati compile-time yoki runtime'da aniqlanarmi?</b>**
Runtime'da! this funksiyaning qanday chaqirilganiga bog'liq, qaysi yerda yozilganiga emas.


**<b>10. Event listener'da this nimaga ishora qiladi?</b>**
Regular funksiyada: event target (button, div, h.k.). Arrow funksiyada: parent context.


**<b>11. Strict mode'da global this nima bo'ladi?</b>**
undefined. Global kontekstda bi-argumentsiz chaqirilgan funksiyada this = undefined.


**<b>12. Chaining pattern'da this qanday qaytariladi?</b>**
Methoddan return this; qilish orqali. Har bir method o'zi qaytariladi, keyingi method chaqiriladi.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Oddiy Metod (Boshlang'ich)",
      instruction: "Objektda this.ism qaytaradigan metod yozing.",
      startingCode: "const user = {\n  ism: 'Ali',\n  getName() {\n    // Kodni shu yerda yozing\n  }\n};\n\nconsole.log(user.getName());",
      hint: "return this.ism;",
      test: "if (user.getName() === 'Ali') return null; return 'this.ism ishlatilmadi!';"
    },
    {
      id: 2,
      title: "2️⃣ Global This (Boshlang'ich)",
      instruction: "Global this qanday ekanligi ko'rsating.",
      startingCode: "function checkThis() {\n  // Kodni shu yerda yozing\n  return this;\n}\n\nconst result = checkThis();\nconsole.log(result === window); // true yoki false?",
      hint: "return this;",
      test: "if (typeof checkThis() === 'object' || checkThis() === undefined) return null; return 'This type xato!';"
    },
    {
      id: 3,
      title: "3️⃣ Lost Context (O'rta)",
      instruction: "Method'ni o'zgaruvchiga saqlasa, this yo'qolishini ko'rsating.",
      startingCode: "const user = {\n  ism: 'Ali',\n  greet: function() {\n    return this.ism;\n  }\n};\n\nconst greetFunc = user.greet;\nconsole.log(greetFunc()); // nima qaytadi?",
      hint: "Javob: undefined (this yo'qoladi)",
      test: "if (greetFunc() === undefined) return null; return 'Context lost o\\'rtildi!';"
    },
    {
      id: 4,
      title: "4️⃣ Call Metodi (O'rta)",
      instruction: "call() yordamida boshqa object'ning metodini chaqiring.",
      startingCode: "const user1 = { ism: 'Ali' };\nconst user2 = { ism: 'Zara' };\n\nfunction greet() {\n  return 'Salom, ' + this.ism;\n}\n\n// Kodni shu yerda yozing\nconst result = greet.call(user2);",
      hint: "greet.call(user2)",
      test: "if (result === 'Salom, Zara') return null; return 'call() ishlatilmadi!';"
    },
    {
      id: 5,
      title: "5️⃣ Apply Metodi (O'rta)",
      instruction: "apply() yordamida parametrlarni array bilan o'tkazing.",
      startingCode: "function introduce(greeting, emoji) {\n  return emoji + ' ' + greeting + ', ' + this.ism;\n}\n\nconst user = { ism: 'Ali' };\n\n// Kodni shu yerda yozing\nconst result = introduce.apply(user, ['Salom', '👋']);",
      hint: "introduce.apply(user, ['Salom', '👋'])",
      test: "if (result.includes('Salom') && result.includes('Ali')) return null; return 'apply() xato!';"
    },
    {
      id: 6,
      title: "6️⃣ Bind Metodi (O'rta)",
      instruction: "bind() yordamida this fixed qilgan yangi funksiya yarating.",
      startingCode: "const user = { ism: 'Ali' };\n\nfunction getName() {\n  return this.ism;\n}\n\n// Kodni shu yerda yozing\nconst getAliName = getName.bind(user);\nconsole.log(getAliName());",
      hint: "const getAliName = getName.bind(user);",
      test: "if (getAliName() === 'Ali') return null; return 'bind() ishlatilmadi!';"
    },
    {
      id: 7,
      title: "7️⃣ Arrow vs Regular (O'rta)",
      instruction: "Arrow funksiyada this parent context'dan olinishini ko'rsating.",
      startingCode: "const calculator = {\n  num: 10,\n  // XATO - Arrow\n  getArrow: () => {\n    return this.num;\n  },\n  // TO'G'RI - Regular\n  getRegular: function() {\n    return this.num;\n  }\n};\n\nconsole.log('Arrow:', calculator.getArrow()); // undefined\nconsole.log('Regular:', calculator.getRegular()); // 10",
      hint: "Arrow: undefined, Regular: 10",
      test: "if (calculator.getRegular() === 10 && calculator.getArrow() === undefined) return null; return 'Arrow vs Regular xato!';"
    },
    {
      id: 8,
      title: "8️⃣ Constructor va New (O'rta)",
      instruction: "new yordamida objekt yaratish, this = yangi obje.",
      startingCode: "function Robot(ism) {\n  // Kodni shu yerda yozing: this.ism = ism\n}\n\nconst robot = new Robot('R2D2');\nconsole.log(robot.ism); // 'R2D2'",
      hint: "this.ism = ism;",
      test: "if (robot.ism === 'R2D2') return null; return 'Constructor xato!';"
    },
    {
      id: 9,
      title: "9️⃣ Callback Arrow (O'rta)",
      instruction: "forEach callback'iga arrow funksiya bersan, this preserved.",
      startingCode: "const user = {\\n  ism: 'Ali',\\n  hobbies: ['Kitob', 'Futbol', 'Dasturlash'],\\n  printHobbies() {\\n    // Arrow funksiya kerak\\n    this.hobbies.forEach((hobby) => {\\n      console.log(this.ism + ': ' + hobby);\\n    });\\n  }\\n};\\nuser.printHobbies();",
      hint: "this.hobbies.forEach((hobby) => { ... });",
      test: "if (code.includes('=>')) return null; return 'Arrow callback ishlatilmadi!';"
    },
    {
      id: 10,
      title: "🔟 Event Listener (O'rta)",
      instruction: "Event listener'da this = event target.",
      startingCode: "// HTML: <button id='btn'>Click</button>\n\nconst btn = document.getElementById('btn');\n\n// YAXSHI - Regular: this = button\nbtn.addEventListener('click', function() {\n  console.log(this); // button element\n  console.log(this.id); // 'btn'\n});\n\n// XATO - Arrow: this = window\n// btn.addEventListener('click', () => {\n//   console.log(this); // window (xato!)\n// });",
      hint: "Regular funksiyada this = button",
      test: "if (code.includes('function()')) return null; return 'Event listener xato!';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ Method Chaining (Qiyin)",
      instruction: "return this; orqali chaining qilgan metodlar yarating.",
      startingCode: "const calculator = {\n  value: 0,\n  \n  add(n) {\n    this.value += n;\n    return this; // Chaining uchun\n  },\n  \n  multiply(n) {\n    this.value *= n;\n    return this; // Chaining uchun\n  },\n  \n  getValue() {\n    return this.value;\n  }\n};\n\n// Kodni shu yerda yozing: Chaining\nconst result = calculator.add(5).multiply(2).getValue();\nconsole.log(result); // (0 + 5) * 2 = 10",
      hint: "calculator.add(5).multiply(2).getValue()",
      test: "if (result === 10) return null; return 'Chaining xato!';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Combine: Class + This + Binding (Eng Qiyin)",
      instruction: "Class'da metodni event listener'ga bind qiling.",
      startingCode: "class Counter {\n  constructor() {\n    this.count = 0;\n    // Kodni shu yerda yozing: bind\n    // this.button.addEventListener('click', this.increment.bind(this));\n  }\n  \n  increment() {\n    this.count++;\n    console.log('Count: ' + this.count);\n  }\n}\n\nconst counter = new Counter();",
      hint: "this.increment.bind(this) - this fixed qilish",
      test: "if (code.includes('bind')) return null; return 'Binding xato!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kodda obyekt metodi ichida oddiy funksiya chaqirilganda `this` nima natija beradi?\n```javascript\nconst obj = { \n  name: \"Ali\",\n  greet() {\n    function inner() {\n      console.log(this.name);\n    }\n    inner();\n  }\n};\nobj.greet();\n```",
      options: ["\"Ali\"", "undefined yoki window.name", "ReferenceError", "TypeError"],
      correctAnswer: 1,
      explanation: "Metod ichida regular (oddiy) funksiya `inner()` chaqirilganda, u hech qanday obyektsiz chaqirilgan hisoblanadi. JavaScript qoidasiga ko'ra, bi-argumentsiz chaqirilgan oddiy funksiyalarning `this`i global obyektga (window) yoki strict rejimda `undefined`ga ishora qiladi."
    },
    {
      id: 2,
      question: "Nested method ichida arrow funksiya ishlatilsa nima chiqadi?\n```javascript\nconst obj = { \n  name: \"Ali\",\n  greet() {\n    const inner = () => {\n      console.log(this.name);\n    };\n    inner();\n  }\n};\nobj.greet();\n```",
      options: ["\"Ali\"", "undefined yoki window.name", "ReferenceError", "TypeError"],
      correctAnswer: 0,
      explanation: "Arrow funksiyalarda o'ziga xos `this` bo'lmaydi. U o'zi aniqlangan joydagi tashqi funksiyaning (ya'ni `greet` metodining) `this` kontekstini meros qilib oladi. `greet` metodi `obj` orqali chaqirilgani uchun `this` -> `obj` bo'ladi va `this.name` \"Ali\" ni qaytaradi."
    },
    {
      id: 3,
      question: "`call` va `apply` metodlarining asosiy farqi nimada?\n```javascript\nfunction greet(msg, emoji) { ... }\n```",
      options: [
        "`call` yangi funksiya qaytaradi, `apply` esa darhol chaqiradi",
        "`call` argumentlarni ketma-ket qabul qiladi, `apply` esa massiv (array) ko'rinishida qabul qiladi",
        "`call` faqat obyektlarda, `apply` faqat massivlarda ishlaydi",
        "Hech qanday farqi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Ikkala metod ham funksiyadagi `this` kontekstini qo'lda sozlab darhol chaqirishga xizmat qiladi. Ularning yagona farqi: `call` qo'shimcha argumentlarni vergul bilan ketma-ket qabul qilsa (arg1, arg2), `apply` ularni yagona massiv ichida qabul qiladi ([arg1, arg2])."
    },
    {
      id: 4,
      question: "Ketma-ket bog'langan `bind` metodlari natijasi nima chiqadi?\n```javascript\nfunction f() {\n  console.log(this.x);\n}\nconst bound = f.bind({x: 1}).bind({x: 2});\nbound();\n```",
      options: ["1", "2", "undefined", "TypeError"],
      correctAnswer: 0,
      explanation: "JavaScriptda `bind` yordamida yaratilgan yangi funksiya o'zining kontekstini butunlay bog'lab oladi. Uni keyinchalik boshqa bind yordamida ikkinchi marta qayta bog'lab (re-bind) bo'lmaydi, kontekst har doim birinchi bind bo'lgan obyektga ishora qiladi."
    },
    {
      id: 5,
      question: "Arrow funksiyaning kontekstini `call` orqali o'zgartirsa nima bo'ladi?\n```javascript\nconst f = () => console.log(this.x);\nf.call({x: 10});\n```",
      options: ["10", "undefined yoki window.x", "ReferenceError", "TypeError"],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarda dynamic `this` mavjud emas va ularning lexical `this`ini `call()`, `apply()` yoki `bind()` yordamida qayta bog'lab yoki o'zgartirib bo'lmaydi. Ular chaqirilganda har doim o'zining original lexical contextini (bu yerda global context) ishlataveradi."
    },
    {
      id: 6,
      question: "`strict mode` (qat'iy rejim) yoqilganda, global funksiya chaqirilganda funksiya ichidagi `this` nimaga teng bo'ladi?",
      options: [
        "window (brauzerda) yoki global (Node.js'da)",
        "undefined",
        "Bo'sh obyekt {}",
        "Xatolik yuz berib dastur to'xtaydi (TypeError)"
      ],
      correctAnswer: 1,
      explanation: "Strict mode (qat'iy rejim) yoqilganda, global kontekstda yoki shunchaki chaqirilgan funksiyalar ichidagi default `this` qiymati `window` emas, balki `undefined` bo'ladi. Bu tasodifiy xatoliklarning oldini oladi."
    },
    {
      id: 7,
      question: "Quyidagi kod ishga tushganda konsolda nima chiqadi?\n```javascript\nconst user = {\n  name: \"Bobur\",\n  greet() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 100);\n  }\n};\nuser.greet();\n```",
      options: [
        "\"Bobur\"",
        "undefined (yoki window.name)",
        "ReferenceError",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "`setTimeout` ichidagi oddiy funksiya (regular function) asinxron chaqirilganda, u global obyekt (`window`) kontekstida ishlaydi. Shuning uchun `this.name` `undefined` bo'ladi."
    },
    {
      id: 8,
      question: "JavaScript-da `this` kalit so'zining qiymati qachon aniqlanadi?",
      options: [
        "Kod yozilayotganda (lexical analysis bosqichida)",
        "Kod runtime-da ishga tushib, funksiya bevosita chaqirilayotgan paytda (runtime execution)",
        "Sahifa to'liq yuklangandan keyin (DOM load)",
        "Faqat serverda ishlayotganda"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da `this` - dynamic binding bo'lib, uning qiymati funksiyaning qayerda yozilganiga qarab emas, balki runtime-da qanday chaqirilganiga qarab aniqlanadi."
    },
    {
      id: 9,
      question: "Quyidagi chain (zanjir) chaqiruvda `this` qiymati qanday o'zgaradi?\n```javascript\nconst obj = {\n  val: 5,\n  add(x) { this.val += x; return this; },\n  mul(y) { this.val *= y; return this; }\n};\nconsole.log(obj.add(2).mul(3).val);\n```",
      options: [
        "Xatolik yuz beradi, chunki add() natijasi son bo'ladi",
        "21 chiqadi, chunki return this tufayli zanjirli chaqirishda this doim objga teng bo'ladi",
        "15 chiqadi, chunki mul() original obyektni o'zgartirmaydi",
        "undefined chiqadi"
      ],
      correctAnswer: 1,
      explanation: "Metodlar `return this;` qaytargani uchun har bir chaqiruvdan keyin `this` (ya'ni `obj`) qaytadi va zanjir (method chaining) davom etib boradi. Natija: (5 + 2) * 3 = 21."
    },
    {
      id: 10,
      question: "Event listener funksiyasida `this` muammosini hal etish uchun `handleClick.bind(this)` ishlatilganda, `bind` yangi funksiya yaratadimi?",
      options: [
        "Yo'q, u shunchaki original funksiyaning o'zini o'zgartiradi",
        "Ha, u original funksiyaning nusxasini olib, unga this konteksti abadiy bog'langan yangi funksiya qaytaradi",
        "Ha, lekin u faqat strict mode-da ishlaydi",
        "Yo'q, u funksiyani asinxron funksiyaga aylantiradi"
      ],
      correctAnswer: 1,
      explanation: "`bind()` metodi original funksiyani o'zgartirmaydi, balki uning nusxasini yaratib, ko'rsatilgan `this` konteksti bog'langan mutlaqo yangi funksiyani qaytaradi."
    },
    {
      id: 11,
      question: "JavaScript-da constructor funksiyalarda (Constructor functions) `this` qachon avtomatik ravishda `undefined` yoki boshqa qiymat bo'lishi mumkin?",
      options: [
        "Agar constructor funksiya `new` kalit so'zisiz chaqirilsa",
        "Agar funksiya nomi kichik harf bilan boshlansa",
        "Agar funksiya parametr qabul qilmasa",
        "Agar strict mode o'chirilgan bo'lsa"
      ],
      correctAnswer: 0,
      explanation: "Agar constructor funksiya `new` kalit so'zisiz chaqirilsa (masalan, `Robot('R2D2')`), u oddiy funksiya kabi default binding bo'yicha ishlaydi va strict mode bo'lsa `this` `undefined` bo'ladi, aks holda `window`ni o'zgartirib yuboradi."
    },
    {
      id: 12,
      question: "Quyidagi kodda `this` qanday qiymat qaytaradi?\n```javascript\nclass Light {\n  turnOn() {\n    console.log(this);\n  }\n}\nconst deskLamp = new Light();\nconst turn = deskLamp.turnOn;\nturn();\n```",
      options: [
        "deskLamp obyekti",
        "window yoki global obyekt",
        "undefined",
        "Light klassining o'zi"
      ],
      correctAnswer: 2,
      explanation: "ES6 klasslari ichidagi barcha kodlar avtomatik ravishda strict mode-da ishlaydi. Shuning uchun, deskLamp'dan ajratib olingan `turn()` funksiyasi obyektsiz chaqirilganda uning ichidagi `this` qiymati `undefined` bo'ladi."
    }
  ]
};