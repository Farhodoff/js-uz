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
    "id": 1,
    "title": "Metod ichida This",
    "instruction": "'user' obyektidagi 'getName' metodini shunday to'ldiringki, u 'user' obyektidagi 'ism' xususiyatini 'this' orqali qaytarsin.",
    "startingCode": "const user = {\n  ism: 'Ali',\n  getName() {\n    // Kodni shu yerda yozing\n  }\n};\n",
    "hint": "return this.ism;",
    "test": "if (!code.includes('this.ism')) return 'this.ism ishlatilmadi';\nconst sandbox = new Function(code + '; return user.getName();');\nconst res = sandbox();\nif (res === 'Ali') return null;\nreturn 'Natija noto\\'g\\'ri';"
  },
  {
    "id": 2,
    "title": "Call Metodi orqali Kontekst Bog'lash",
    "instruction": "'greet' funksiyasini 'user' obyektining konteksti bilan darhol ishga tushirish uchun 'call' metodidan foydalaning va natijani 'result' o'zgaruvchisiga saqlang.",
    "startingCode": "const user = { name: 'Zara' };\nfunction greet() {\n  return 'Salom, ' + this.name;\n}\n\n// Kodni shu yerda yozing\n",
    "hint": "const result = greet.call(user);",
    "test": "if (!code.includes('greet.call(user)')) return 'greet.call(user) ishlatilmadi';\nconst sandbox = new Function('user', 'greet', code + '; return result;');\nconst mockUser = { name: 'Zara' };\nconst mockGreet = function() { return 'Salom, ' + this.name; };\nconst res = sandbox(mockUser, mockGreet);\nif (res === 'Salom, Zara') return null;\nreturn 'result o\\'zgaruvchisi qiymati xato';"
  },
  {
    "id": 3,
    "title": "Chaining Pattern (Zanjirli Chaqiruv)",
    "instruction": "'calculator' obyektidagi 'add' va 'multiply' metodlari zanjirli chaqirilishi (chaining) uchun har bir metod oxirida 'this' obyektini qaytaring (return this).",
    "startingCode": "const calculator = {\n  value: 0,\n  add(n) {\n    this.value += n;\n    // Kodni shu yerda yozing\n  },\n  multiply(n) {\n    this.value *= n;\n    // Kodni shu yerda yozing\n  }\n};\n",
    "hint": "return this;",
    "test": "if (!code.includes('return this')) return 'return this ishlatilmadi';\nconst sandbox = new Function(code + '; return calculator.add(5).multiply(2).value;');\nconst res = sandbox();\nif (res === 10) return null;\nreturn 'Chaining to\\'g\\'ri ishlamadi';"
  }
]
,
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
