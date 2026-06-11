export const thisKeyword = {
  id: "thisKeyword",
  title: "This Keyword va Context Binding",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### This kalit so'zi nima?
**\`this\` (kontekst)** — bu JavaScript dasturlash tilidagi o'ziga xos kalit so'z bo'lib, u joriy vaqtda funksiya yoki metod kim yoki nima tomonidan bajarilayotganini ko'rsatuvchi ma'lumotnomadir. U funksiyaning yozilish joyiga emas, balki runtime-da (ishlash jarayonida) qanday chaqirilganiga qarab o'zgaradi.

### Real hayotiy analogiya
Tasavvur qiling, siz do'stlaringiz bilan suhbatlashyapsiz:
* Siz: "**Mening** ismim Ali" deysiz. Bu yerda "**Mening**" = Ali.
* Do'stingiz Zara: "**Mening** ismim Zara" deydi. Bu yerda "**Mening**" = Zara.
* Suhbatda "**Mening**" so'zi bir xil bo'lsa-da, u gapirayotgan odamga qarab o'zgaradi.
JavaScript-da \`this\` — bu gapirayotgan (ya'ni funksiyani chaqirayotgan) obyekt yoki kontekstdir.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Method Binding va Default Binding)
\`\`\`javascript
const person = {
  name: "Ali",
  sayHello() {
    console.log(\`Salom, men \${this.name}\`); // this = person
  }
};

person.sayHello(); // "Salom, men Ali"

// Oddiy funksiya chaqirilganda default binding (window yoki strict rejimda undefined) ishlaydi:
function whoAmI() {
  console.log(this);
}
whoAmI(); // window (yoki strict mode-da undefined)
\`\`\`

### 2. Intermediate Example (Context binding: call, apply va bind)
\`\`\`javascript
function greet(location, emoji) {
  console.log(\`\${emoji} Salom \${this.name}, \${location}ga xush kelibsiz!\`);
}

const user = { name: "Farhod" };

// 1. call — darhol chaqiradi, parametrlarni ketma-ket oladi
greet.call(user, "Tashkent", "👋");

// 2. apply — darhol chaqiradi, parametrlarni massivda oladi
greet.apply(user, ["Tashkent", "👋"]);

// 3. bind — yangi funksiya qaytaradi (this qulflangan holatda)
const greetFarhod = greet.bind(user);
greetFarhod("Samarkand", "🙋");
\`\`\`

### 3. Advanced Example (Class Constructor va Event Listeners)
ES6 klasslarida va DOM hodisalarini eshitishda \`this\`dan foydalanish:
\`\`\`javascript
class UI {
  constructor(buttonId) {
    this.button = document.getElementById(buttonId);
    // click hodisasida 'this' yo'qolmasligi uchun metodni bind qilamiz:
    if (this.button) {
      this.button.addEventListener("click", this.handleClick.bind(this));
    }
  }

  handleClick() {
    console.log("Bosilgan UI elementi:", this.button); // this = UI obyekti
  }
}
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Bindingning 4 Asosiy Qoidasi (Ustuvorlik tartibida)
JavaScript \`this\` qiymatini aniqlash uchun quyidagi 4 qoidani ketma-ket tekshiradi:

1. **New Binding:** Agar funksiya \`new\` orqali chaqirilgan bo'lsa (konstruktor), \`this\` — yangi yaratilgan obyekt.
2. **Explicit Binding (Aniq bog'lash):** Agar funksiya \`.call()\`, \`.apply()\` yoki \`.bind()\` orqali chaqirilgan bo'lsa, \`this\` — ko'rsatilgan obyekt.
3. **Implicit Binding (Metod sifatida):** Agar funksiya obyekt metodi sifatida chaqirilgan bo'lsa (\`obj.func()\`), \`this\` — \`obj\` obyekti.
4. **Default Binding (Tashqi chaqiriq):** Agar funksiya mustaqil chaqirilgan bo'lsa (\`func()\`), \`this\` — global obyekt (\`window\`) yoki strict rejimda \`undefined\`.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Context (this) Yo'qolishi va Uni Tuzatish
Ko'pincha funksiya boshqa joyga callback sifatida uzatilganda \`this\` yo'qolib ketadi (Context Loss).

#### Muammo:
\`\`\`javascript
const timer = {
  seconds: 0,
  start() {
    setInterval(function() {
      // XATO: setTimeout/setInterval callbacki global contextda ishlaydi
      this.seconds++; // this = window
      console.log(this.seconds); // NaN (chunki window.seconds yo'q)
    }, 1000);
  }
};
\`\`\`

#### Yechim (Arrow funksiya yordamida - u thisni tashqi start metodidan meros oladi):
\`\`\`javascript
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // this = timer obyekti
      console.log(this.seconds); // 1, 2, 3...
    }, 1000);
  }
};
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Arrow funksiyani metod sifatida ishlatish
Arrow funksiyalarda \`this\` bo'lmagani uchun u har doim o'zi yozilgan doiradan lexical o'qiydi.
* **Noto'g'ri:**
  \`\`\`javascript
  const user = {
    name: "Ali",
    showName: () => console.log(this.name) // 'this' global windowga teng bo'ladi
  };
  user.showName(); // undefined
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const user = {
    name: "Ali",
    showName() { console.log(this.name) } // Shaxsiy metod sintaksisi
  };
  user.showName(); // "Ali"
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Chaqiriq turi | \`this\` nimaga teng bo'ladi? | Misol |
| :--- | :--- | :--- |
| Global doira | \`window\` (yoki strict rejimda \`undefined\`) | \`myFunc()\` |
| Obyekt metodi | O'sha obyektning o'ziga | \`user.greet()\` |
| \`call\` / \`apply\` / \`bind\` | Ko'rsatilgan birinchi argumentga | \`greet.call(user)\` |
| \`new\` konstruktor | Yangi yaratilgan obyektga | \`new User()\` |
| Arrow function | Tashqi (lexical) muhitning \`this\`iga | \`() => this.x\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Zanjirli (Chaining) metodlarda \`this\` qanday ishlaydi?
Zanjirli chaqiruvlarni (masalan, \`calc.add(2).mul(3)\`) qo'llab-quvvatlash uchun har bir metod oxirida \`return this;\` (obyektning o'zini) qaytarishi kerak.

### 2. Strict mode (qat'iy rejim) \`this\`ga qanday ta'sir qiladi?
Strict mode yoqilganda global funksiya chaqiruvlarida \`this\` global \`window\` o'rniga \`undefined\`ga teng bo'ladi. Bu xavfsizlik va xatolarni oldini olish uchun joriy qilingan.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`bind\` metodini bir nechta marta ketma-ket ishlatsa bo'ladimi?
2. Event listener regular funksiya bo'lsa, \`this\` nimaga teng?
3. Nima uchun arrow funksiyani \`new\` kalit so'zi bilan chaqirib bo'lmaydi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida \`this\` bo'yicha ko'nikmalaringizni sinab ko'ring.
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
    "id": 1,
    "question": "Quyidagi kodda obyekt metodi ichida oddiy funksiya chaqirilganda `this` nima natija beradi?\n```javascript\nconst obj = { \n  name: \"Ali\",\n  greet() {\n    function inner() {\n      console.log(this.name);\n    }\n    inner();\n  }\n};\nobj.greet();\n```",
    "options": ["\"Ali\"", "undefined yoki window.name", "ReferenceError", "TypeError"],
    "correctAnswer": 1,
    "explanation": "Metod ichida regular (oddiy) funksiya `inner()` chaqirilganda, u hech qanday obyektsiz chaqirilgan hisoblanadi. JavaScript qoidasiga ko'ra, bi-argumentsiz chaqirilgan oddiy funksiyalarning `this`i global obyektga (window) yoki strict rejimda `undefined`ga ishora qiladi."
  },
  {
    "id": 2,
    "question": "Nested method ichida arrow funksiya ishlatilsa nima chiqadi?\n```javascript\nconst obj = { \n  name: \"Ali\",\n  greet() {\n    const inner = () => {\n      console.log(this.name);\n    };\n    inner();\n  }\n};\nobj.greet();\n```",
    "options": ["\"Ali\"", "undefined yoki window.name", "ReferenceError", "TypeError"],
    "correctAnswer": 0,
    "explanation": "Arrow funksiyalarda o'ziga xos `this` bo'lmaydi. U o'zi aniqlangan joydagi tashqi funksiyaning (ya'ni `greet` metodining) `this` kontekstini meros qilib oladi. `greet` metodi `obj` orqali chaqirilgani uchun `this` -> `obj` bo'ladi va `this.name` \"Ali\" ni qaytaradi."
  },
  {
    "id": 3,
    "question": "`call` va `apply` metodlarining asosiy farqi nimada?\n```javascript\nfunction greet(msg, emoji) { ... }\n```",
    "options": [
      "`call` yangi funksiya qaytaradi, `apply` esa darhol chaqiradi",
      "`call` argumentlarni ketma-ket qabul qiladi, `apply` esa massiv (array) ko'rinishida qabul qiladi",
      "`call` faqat obyektlarda, `apply` faqat massivlarda ishlaydi",
      "Hech qanday farqi yo't"
    ],
    "correctAnswer": 1,
    "explanation": "Ikkala metod ham funksiyadagi `this` kontekstini qo'lda sozlab darhol chaqirishga xizmat qiladi. Ularning yagona farqi: `call` qo'shimcha argumentlarni vergul bilan ketma-ket qabul qilsa (arg1, arg2), `apply` ularni yagona massiv ichida qabul qiladi ([arg1, arg2])."
  },
  {
    "id": 4,
    "question": "Ketma-ket bog'langan `bind` metodlari natijasi nima chiqadi?\n```javascript\nfunction f() {\n  console.log(this.x);\n}\nconst bound = f.bind({x: 1}).bind({x: 2});\nbound();\n```",
    "options": ["1", "2", "undefined", "TypeError"],
    "correctAnswer": 0,
    "explanation": "JavaScriptda `bind` yordamida yaratilgan yangi funksiya o'zining kontekstini butunlay bog'lab oladi. Uni keyinchalik boshqa bind yordamida ikkinchi marta qayta bog'lab (re-bind) bo'lmaydi, kontekst har doim birinchi bind bo'lgan obyektga ishora qiladi."
  },
  {
    "id": 5,
    "question": "Arrow funksiyaning kontekstini `call` orqali o'zgartirsa nima bo'ladi?\n```javascript\nconst f = () => console.log(this.x);\nf.call({x: 10});\n```",
    "options": ["10", "undefined yoki window.x", "ReferenceError", "TypeError"],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalarda dynamic `this` mavjud emas va ularning lexical `this`ini `call()`, `apply()` yoki `bind()` yordamida qayta bog'lab yoki o'zgartirib bo'lmaydi. Ular chaqirilganda har doim o'zining original lexical contextini (bu yerda global context) ishlataveradi."
  },
  {
    "id": 6,
    "question": "`strict mode` (qat'iy rejim) yoqilganda, global funksiya chaqirilganda funksiya ichidagi `this` nimaga teng bo'ladi?",
    "options": [
      "window (brauzerda) yoki global (Node.js'da)",
      "undefined",
      "Bo'sh obyekt {}",
      "Xatolik yuz berib dastur to'xtaydi (TypeError)"
    ],
    "correctAnswer": 1,
    "explanation": "Strict mode (qat'iy rejim) yoqilganda, global kontekstda yoki shunchaki chaqirilgan funksiyalar ichidagi default `this` qiymati `window` emas, balki `undefined` bo'ladi. Bu tasodifiy xatoliklarning oldini oladi."
  },
  {
    "id": 7,
    "question": "Quyidagi kod vaqtinchalik ishga tushganda konsolda nima chiqadi?\n```javascript\nconst user = {\n  name: \"Bobur\",\n  greet() {\n    setTimeout(function() {\n      console.log(this.name);\n    }, 100);\n  }\n};\nuser.greet();\n```",
    "options": [
      "\"Bobur\"",
      "undefined (yoki window.name)",
      "ReferenceError",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "`setTimeout` ichidagi oddiy funksiya (regular function) asinxron chaqirilganda, u global obyekt (`window`) kontekstida ishlaydi. Shuning uchun `this.name` `undefined` bo'ladi."
  },
  {
    "id": 8,
    "question": "JavaScript-da `this` kalit so'zining qiymati qachon aniqlanadi?",
    "options": [
      "Kod yozilayotganda (lexical analysis bosqichida)",
      "Kod runtime-da ishga tushib, funksiya bevosita chaqirilayotgan paytda (runtime execution)",
      "Sahifa to'liq yuklangandan keyin (DOM load)",
      "Faqat serverda ishlayotganda"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da `this` - dynamic binding bo'lib, uning qiymati funksiyaning qayerda yozilganiga qarab emas, balki runtime-da qanday chaqirilganiga qarab aniqlanadi."
  },
  {
    "id": 9,
    "question": "Quyidagi chain (zanjir) chaqiruvda `this` qiymati qanday o'zgaradi?\n```javascript\nconst obj = {\n  val: 5,\n  add(x) { this.val += x; return this; },\n  mul(y) { this.val *= y; return this; }\n};\nconsole.log(obj.add(2).mul(3).val);\n```",
    "options": [
      "Xatolik yuz beradi, chunki add() natijasi son bo'ladi",
      "21 chiqadi, chunki return this tufayli zanjirli chaqirishda this doim objga teng bo'ladi",
      "15 chiqadi, chunki mul() original obyektni o'zgartirmaydi",
      "undefined chiqadi"
    ],
    "correctAnswer": 1,
    "explanation": "Metodlar `return this;` qaytargani uchun har bir chaqiruvdan keyin `this` (ya'ni `obj`) qaytadi va zanjir (method chaining) davom etib boradi. Natija: (5 + 2) * 3 = 21."
  },
  {
    "id": 10,
    "question": "Event listener funksiyasida `this` muammosini hal etish uchun `handleClick.bind(this)` ishlatilganda, `bind` yangi funksiya yaratadimi?",
    "options": [
      "Yo'q, u shunchaki original funksiyaning o'zini o'zgartiradi",
      "Ha, u original funksiyaning nusxasini olib, unga this konteksti abadiy bog'langan yangi funksiya qaytaradi",
      "Ha, lekin u faqat strict mode-da ishlaydi",
      "Yo'q, u funksiyani asinxron funksiyaga aylantiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`bind()` metodi original funksiyani o'zgartirmaydi, balki uning nusxasini yaratib, ko'rsatilgan `this` konteksti bog'langan mutlaqo yangi funksiyani qaytaradi."
  },
  {
    "id": 11,
    "question": "JavaScript-da constructor funksiyalarda `this` qachon avtomatik ravishda `undefined` bo'lishi mumkin?",
    "options": [
      "Agar constructor funksiya `new` kalit so'zisiz chaqirilsa",
      "Agar funksiya nomi kichik harf bilan boshlansa",
      "Agar funksiya parametr qabul qilmasa",
      "Agar strict mode o'chirilgan bo'lsa"
    ],
    "correctAnswer": 0,
    "explanation": "Agar constructor funksiya `new` kalit so'zisiz chaqirilsa, u oddiy funksiya kabi default binding bo'yicha ishlaydi va strict mode bo'lsa `this` `undefined` bo'ladi."
  },
  {
    "id": 12,
    "question": "Quyidagi kodda `this` qanday qiymat qaytaradi?\n```javascript\nclass Light {\n  turnOn() {\n    console.log(this);\n  }\n}\nconst deskLamp = new Light();\nconst turn = deskLamp.turnOn;\nturn();\n```",
    "options": [
      "deskLamp obyekti",
      "window yoki global obyekt",
      "undefined",
      "Light klassining o'zi"
    ],
    "correctAnswer": 2,
    "explanation": "ES6 klasslari ichidagi barcha kodlar avtomatik ravishda strict mode-da ishlaydi. Shuning uchun, deskLamp'dan ajratib olingan `turn()` funksiyasi obyektsiz chaqirilganda uning ichidagi `this` qiymati `undefined` bo'ladi."
  }
]

};
