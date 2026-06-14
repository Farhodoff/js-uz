export const arrowFunctions = {
  id: "arrowFunctions",
  title: "Arrow Functions (Arrow funksiyalar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Arrow Functions nima?
**Arrow Functions (Ko'rsatkichli funksiyalar)** — bu ES6 versiyasida JavaScript dasturlash tiliga kiritilgan, funksiyalarni yozishning yanada qisqa, tushunarli va zamonaviy sintaksisidir. U an'anaviy \`function\` kalit so'zi o'rniga \`=>\` (semiz ko'rsatkich/strelka) belgisidan foydalanadi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz do'stingizga xat yozayapsiz:
* **Eski usul (Rasmiy xat):** "Hurmatli do'stim, sizga shuni ma'lum qilamanki, ertaga uchrashamiz. Hurmat bilan, Ali." (Barcha kalit so'zlar va rasmiyatchiliklar joyida).
* **Arrow funksiya (SMS tili):** "Ertaga ko'rishamiz. Ali." (Ortiqcha so'zlarsiz, maqsad qisqa va tezkor ifodalangan).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sintaksis Qisqartirilishi)
\`\`\`javascript
// An'anaviy funksiya
const doubleOld = function(x) {
  return x * 2;
};

// Arrow funksiya (Implicit Return bilan)
const doubleNew = x => x * 2;

console.log(doubleNew(5)); // 10
\`\`\`

### 2. Intermediate Example (Massiv Metodlari bilan ishlash)
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Massivdagi juft sonlarni topish (juda qisqa kod)
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]
\`\`\`

### 3. Advanced Example (Lexical \`this\` va setTimeout)
Arrow funksiyalarda o'zining shaxsiy \`this\` konteksti yo'q, u \`this\`ni o'zi e'lon qilingan doiradan (scope) meros oladi.
\`\`\`javascript
const counter = {
  count: 0,
  start() {
    // Arrow funksiya ishlatilgani uchun 'this' counter obyektiga ishora qiladi
    setInterval(() => {
      this.count++;
      console.log(this.count);
    }, 1000);
  }
};
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Lexical \`this\` Bog'lanishi
An'anaviy funksiyalar chaqirilish usuliga qarab o'zlarining \`this\` qiymatini dinamik ravishda belgilaydi. Arrow funksiyalar esa \`this\`ni lexical doiradan oladi (ya'ni funksiya qayerda yozilgan bo'lsa, o'sha joydagi \`this\` bog'lanib qoladi).

> [!IMPORTANT]
> Arrow funksiyalarni \`new\` kalit so'zi yordamida konstruktor funksiya kabi chaqirib bo'lmaydi. Ularda \`[[Construct]]\` ichki metodi va \`prototype\` xususiyati mavjud emas.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Obyekt Qaytaruvchi Arrow Funksiya (Implicit Return)
Bitta qatorda obyekt qaytarishda jingalak qavslar \`{}\` funksiya bloki deb tushunilmasligi uchun obyektni oddiy qavslarga \`()\` o'rash kerak:

\`\`\`javascript
// Noto'g'ri (JS buni kod bloki deb o'ylaydi va undefined qaytaradi)
const createUserBad = (name, age) => { name: name, age: age };

// To'g'ri sintaksis
const createUserGood = (name, age) => ({ name: name, age: age });

console.log(createUserGood("Ali", 20)); // { name: "Ali", age: 20 }
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. \`this\`ni yo'qotib qo'yish (Obyekt metodlarida)
Obyekt metodlarini e'lon qilishda arrow funksiya ishlatish xavfli, chunki u obyektning o'ziga emas, global contextga bog'lanib qoladi.
* **Noto'g'ri:**
  \`\`\`javascript
  const person = {
    name: "Farhod",
    sayName: () => console.log(this.name) // 'this' windowga teng bo'ladi
  };
  person.sayName(); // undefined
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const person = {
    name: "Farhod",
    sayName() { console.log(this.name) } // Shaxsiy metod sintaksisi
  };
  person.sayName(); // "Farhod"
  \`\`\`

### 2. Jingalak qavs ochib return yozmaslik
* **Noto'g'ri:**
  \`\`\`javascript
  const multiply = (a, b) => { a * b }; // undefined qaytadi
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const multiply = (a, b) => { return a * b };
  // Yoki qavssiz:
  const multiply = (a, b) => a * b;
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Sintaksis | Xususiyati | Misol |
| :--- | :--- | :--- |
| \`() => value\` | Parametrsiz va avtomatik qaytaruvchi | \`const getTen = () => 10\` |
| \`x => x * x\` | Bitta parametrda qavs shart emas | \`const sq = x => x * x\` |
| \`(x, y) => { ... }\` | Ko'p qatorli, return yozish majburiy | \`(x, y) => { return x + y }\` |
| \`() => ({ a: 1 })\` | Obyekt qaytarishda qavs bilan o'rash shart | \`() => ({ active: true })\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Arrow funksiyada \`arguments\` obyekti bormi?
Yo'q, arrow funksiyalarda \`arguments\` obyekti mavjud emas. Uning o'rniga rest parametridan (\`...args\`) foydalanish kerak.

### 2. Arrow funksiyani \`call\`, \`apply\` yoki \`bind\` orqali \`this\`ini o'zgartirsa bo'ladimi?
Yo'q, arrow funksiyadagi \`this\` qat'iy lexical bog'langan va uni hech qanday usul bilan o'zgartirib bo'lmaydi (bu metodlarning birinchi parametri shunchaki inobatga olinmaydi).

---

## 8. 🧠 O'z-o'zini Tekshirish

1. Qaysi holatlarda arrow funksiya o'rniga an'anaviy funksiya ishlatish maqsadga muvofiq?
2. Arrow funksiyada \`prototype\` xususiyati bormi va u \`new\` orqali ishlaydimi?
3. Implicit return nima va u qanday shartlarda ishlaydi?

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida arrow funksiyalar bo'yicha ko'nikmalaringizni mustahkamlang.
`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Arrow Yig'indi",
      instruction: "Ikkita sonni qo'shadigan 'add' arrow funksiyasini yozing.",
      startingCode: "// add funksiyasini yozing\n\nconsole.log(add(5, 3));",
      hint: "const add = (a, b) => a + b;",
      test: "if (add(5, 3) === 8) return null; return 'Qo\\'shish noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "2️⃣ Implicit Return",
      instruction: "Sonning kvadratini topadigan 'square' arrow funksiyasini (bitta qatorda, return so'ziziz) yozing.",
      startingCode: "// square funksiyasini yozing\n\nconsole.log(square(4));",
      hint: "const square = n => n * n;",
      test: "if (square(4) === 16 && !code.includes('return')) return null; return 'Implicit return ishlatilmadi';"
    },
    {
      id: 3,
      title: "3️⃣ Bitta Parametrli Arrow",
      instruction: "Faqat bitta 'son' parametrini oladigan va uni musbat bo'lsa true, manfiy bo'lsa false qaytaradigan 'isPositive' funksiyasini yozing. Qavssiz ishlating.",
      startingCode: "// isPositive funksiyasini yozing\n\nconsole.log(isPositive(10));",
      hint: "const isPositive = son => son > 0;",
      test: "if (isPositive(10) === true && isPositive(-5) === false) return null; return 'Funksiya noto\\'g\\'ri ishlayapti';"
    },
    {
      id: 4,
      title: "4️⃣ Obyekt Qaytarish",
      instruction: "ism va yosh qabul qilib, obyekt qaytaradigan 'createProfile' arrow funksiyasini yozing. Yodda tuting: ({...})",
      startingCode: "// createProfile funksiyasini yozing\n\nconsole.log(createProfile('Ali', 20));",
      hint: "const createProfile = (ism, yosh) => ({ ism, yosh });",
      test: "if (createProfile('Ali', 20).ism === 'Ali') return null; return 'Obyekt to\\'g\\'ri qaytarilmadi';"
    },
    {
      id: 5,
      title: "5️⃣ Map bilan qisqa yozish",
      instruction: "'nums' massividagi har bir sonni 2 ga ko'paytiring. Map metodining ichiga qisqa arrow function yozing.",
      startingCode: "const nums = [1, 2, 3];\n// Bu yerga yozing\nconst doubled = nums.map( /* shu yerga yozing */ );\nconsole.log(doubled);",
      hint: "nums.map(n => n * 2)",
      test: "if (doubled[2] === 6) return null; return 'Map ichida xatolik';"
    },
    {
      id: 6,
      title: "6️⃣ Filter bilan qisqa yozish",
      instruction: "Massivdan faqat toq sonlarni filter orqali qaytarib oling.",
      startingCode: "const nums = [1, 2, 3, 4, 5];\n// Bu yerga yozing\nconst odds = nums.filter( /* shu yerga yozing */ );\nconsole.log(odds);",
      hint: "nums.filter(n => n % 2 !== 0)",
      test: "if (odds.length === 3 && odds[1] === 3) return null; return 'Filter ichida xatolik';"
    },
    {
      id: 7,
      title: "7️⃣ setTimeout va Arrow",
      instruction: "setTimeout ichida anonim arrow function yozib, 10ms dan so'ng 'Salom' deb chiqaring.",
      startingCode: "// setTimeout ichiga arrow function yozing\nsetTimeout(  , 10);",
      hint: "setTimeout(() => console.log('Salom'), 10)",
      test: "if (code.includes('=>') && code.includes('setTimeout')) return null; return 'setTimeout da arrow function yo\\'q';"
    },
    {
      id: 8,
      title: "8️⃣ Lexical This (Obyekt ichida)",
      instruction: "'user' obyektining 'greet' metodida setTimeout bor. Ichidagi funksiyani arrow ga o'zgartiringki, 'this.name' topilsin.",
      startingCode: "const user = {\n  name: 'Bobur',\n  greet() {\n    // Buni arrow ga aylantiring\n    setTimeout(function() {\n      console.log('Salom, ' + this.name);\n    }, 10);\n  }\n};\nuser.greet();",
      hint: "setTimeout(() => { ... })",
      test: "if (code.includes('=>') && !code.includes('function()')) return null; return 'Arrow ga aylantirilmadi';"
    },
    {
      id: 9,
      title: "9️⃣ Rest parametr va Arrow",
      instruction: "Rest parametr (...args) yordamida uzatilgan barcha sonlarning uzunligini qaytaradigan funksiya yozing.",
      startingCode: "// countArgs funksiyasi\n\nconsole.log(countArgs(1, 2, 3, 4)); // 4 chiqishi kerak",
      hint: "const countArgs = (...args) => args.length;",
      test: "if (countArgs(1,2,3,4) === 4) return null; return 'Uzunlik qaytarilmadi';"
    },
    {
      id: 10,
      title: "🔟 Reduce va Arrow",
      instruction: "reduce() metodi yordamida massivdagi barcha sonlar yig'indisini arrow funksiya yordamida hisoblang.",
      startingCode: "const nums = [10, 20, 30];\n// Bu yerga yozing\nconst sum = nums.reduce( /* shu yerga yozing */ );\nconsole.log(sum);",
      hint: "nums.reduce((acc, curr) => acc + curr, 0)",
      test: "if (sum === 60) return null; return 'Reduce hisoblashi xato';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ String interpolatsiyasi (Template literal)",
      instruction: "Ismni parametr sifatida qabul qilib, 'Salom, [ism]!' matnini qaytaradigan arrow funksiya yozing.",
      startingCode: "// sayHello funksiyasi\n\nconsole.log(sayHello('Zuhra'));",
      hint: "const sayHello = name => `Salom, ${name}!`;",
      test: "if (sayHello('Zuhra') === 'Salom, Zuhra!') return null; return 'Matn xato';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Currying (Eng Qiyin)",
      instruction: "Bitta son qabul qilib, yana bitta son qabul qiladigan arrow funksiya qaytaradigan (currying) yozuv. Natijada ularning yig'indisi hisoblansin.",
      startingCode: "// add funksiyasini yozing: add(a)(b)\n\nconsole.log(add(5)(3)); // 8",
      hint: "const add = a => b => a + b;",
      test: "if (add(5)(3) === 8) return null; return 'Currying qilinmadi';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "Arrow funksiyalarning an'anaviy `function` kalit so'zi yordamida yaratilgan funksiyalardan asosiy farqi nimada?",
    "options": [
      "Arrow funksiyalarda o'zining shaxsiy `this` bog'lanishi (binding) mavjud emas, u `this`ni tashqi lexical doiradan meros oladi",
      "Arrow funksiyalar sekinroq ishlaydi",
      "Arrow funksiyalarni faqat serverda ishlatish mumkin",
      "Arrow funksiyalar faqat musbat sonlarni qaytara oladi"
    ],
    "correctAnswer": 0,
    "explanation": "Arrow funksiyalar o'zining `this` qiymatiga ega emas. Ular `this` ni o'zlarini o'rab turgan tashqi (lexical) kontekstdan qabul qilishadi."
  },
  {
    "id": 2,
    "question": "Arrow funksiya yordamida bitta qatorda obyekt qaytarmoqchi bo'lsak, qaysi sintaksis to'g'ri hisoblanadi?",
    "options": [
      "const user = () => { name: 'Ali' };",
      "const user = () => ({ name: 'Ali' });",
      "const user = () => return { name: 'Ali' };",
      "const user = () => [ name: 'Ali' ];"
    ],
    "correctAnswer": 1,
    "explanation": "Jingalak qavslar `{}` funksiya tanasini (block) anglatgani uchun, obyekt literali qaytarilayotganda chalkashlik yuzaga kelmasligi uchun obyekt qavslar ichiga `({ ... })` olinishi shart."
  },
  {
    "id": 3,
    "question": "Arrow funksiyada `arguments` obyekti mavjudmi?",
    "options": [
      "Ha, u oddiy funksiyadagi kabi to'liq ishlaydi",
      "Yo'q, arrow funksiyalarda `arguments` obyekti yo'q. Buning o'rniga rest parametrlardan (`...args`) foydalanish kerak",
      "Ha, lekin faqat massiv ko'rinishida bo'ladi",
      "Faqat `strict mode` yoqilganda mavjud bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalarda `arguments` maxsus o'zgaruvchisi yo'q. Agar kiruvchi argumentlar oqimini olish kerak bo'lsa, rest `...args` parametrlaridan foydalanish zarur."
  },
  {
    "id": 4,
    "question": "Arrow funksiyani `new` kalit so'zi yordamida konstruktor sifatida chaqirsa nima sodir bo'ladi?",
    "options": [
      "Yangi obyekt muvaffaqiyatli yaratiladi",
      "TypeError: [FunctionName] is not a constructor xatosi yuz beradi",
      "Funksiya oddiy funksiya kabi bajariladi, lekin obyekt qaytarmaydi",
      "Sahifa avtomatik qayta yuklanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalar `prototype` xususiyatiga ega emas, shu sababli ularni `new` kalit so'zi orqali konstruktor sifatida ishlatib bo'lmaydi va xatolik beradi."
  },
  {
    "id": 5,
    "question": "Arrow funksiyalar qachon \"hoisted\" bo'ladi (kodning yuqorisiga ko'tariladi)?",
    "options": [
      "Har doim, chunki hamma funksiya hisoblanadi",
      "Ular e'lon qilinish shakliga (masalan, const/let o'zgaruvchisiga biriktirilganiga) bog'liq. Ular hoisted bo'lmaydi va Temporal Dead Zone (TDZ) ga bo'ysunadi",
      "Faqat var bilan e'lon qilinganda funksiya sifatida hoisted bo'ladi",
      "Faqat brauzer o'chib yonganda hoisted bo'ladi"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalar ifoda (Expression) sifatida e'lon qilinadi (odatda `const` yoki `let` bilan). Shuning uchun o'zgaruvchilar kabi oni hoisted bo'lmaydi va e'lon qilinishidan oldin ishlatib bo'lmaydi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi (brauzerda)?\n```javascript\nconst obj = {\n  x: 10,\n  getX: () => this.x\n};\nconsole.log(obj.getX());\n```",
    "options": [
      "10",
      "undefined (chunki arrow function o'zining this-iga ega emas va global context-dan oladi)",
      "ReferenceError",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyada `this` lexical scope-ga bog'liq. U obyektdan emas, o'sha obyekt yaratilgan global context (window) dan `this`ni oladi. Globalda `x` bo'lmagani uchun `undefined` chiqadi."
  },
  {
    "id": 7,
    "question": "Arrow funksiyalarni `call()`, `apply()` yoki `bind()` yordamida boshqa obyektdagi `this` kontekstiga bog'lab bo'ladimi?",
    "options": [
      "Ha, mutlaqo bog'lab bo'ladi",
      "Yo'q, arrow funksiyalar bu metodlar orqali `this` qiymatini o'zgartirishga yo'l qo'ymaydi (ular e'tiborsiz qoldiriladi)",
      "Faqat `bind()` yordamida bog'lash mumkin",
      "Faqat `call()` yordamida bog'lash mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalarda `this` har doim o'zi e'lon qilingan lexical context-ga bog'langan bo'ladi. `call`, `apply` yoki `bind` chaqirilganda, uzatilgan birinchi parametr shunchaki inobatga olinmaydi."
  },
  {
    "id": 8,
    "question": "Arrow funksiyaning parametri atigi bitta bo'lganda, sintaksisda nima qilish mumkin?",
    "options": [
      "Parametr atrofidagi qavslarni `()` tashlab ketish mumkin",
      "Jingalak qavslarni tashlab ketish mumkin",
      "Hech qanday qisqartirish mumkin emas",
      "Parametrni umuman yozmaslik mumkin"
    ],
    "correctAnswer": 0,
    "explanation": "Agar arrow funksiyada parametr bitta bo'lsa, qavslarsiz `x => x * 2` shaklida yozish mumkin. Agar parametrlar 0 ta yoki 2 ta va undan ortiq bo'lsa, qavslar majburiy."
  },
  {
    "id": 9,
    "question": "Quyidagi arrow funksiya sintaksisining qaysi biri sintaktik jihatdan xato?",
    "options": [
      "const f = () => 10;",
      "const f = x => x;",
      "const f = x, y => x + y;",
      "const f = (x, y) => x + y;"
    ],
    "correctAnswer": 2,
    "explanation": "Parametrlar soni birdan ortiq bo'lsa (`x, y`), ular albatta qavs ichiga olinishi kerak: `(x, y) => x + y`. Qavssiz yozish SyntaxError beradi."
  },
  {
    "id": 10,
    "question": "Arrow funksiyaning `prototype` xususiyati (property) bormi?",
    "options": [
      "Ha, oddiy funksiyalardagi kabi `prototype` bor",
      "Yo'q, arrow funksiyalarda `prototype` mavjud emas (undefined)",
      "Faqat `var` bilan e'lon qilinganda mavjud",
      "Faqat `return` ishlatilganda mavjud"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalar konstruktor bo'la olmaganligi sababli, ularda `prototype` xususiyati bo'lmaydi (`f.prototype` qiymati `undefined` bo'ladi)."
  },
  {
    "id": 11,
    "question": "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nconst multiply = (x, y) => { x * y };\nconsole.log(multiply(2, 3));\n```",
    "options": [
      "6",
      "undefined (chunki jingalak qavslar ichida return yozilmagan)",
      "NaN",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "Jingalak qavslar `{}` ochilganda JavaScript uni funksiya tanasi (block) deb hisoblaydi va avtomatik return qilmaydi. Qiymat qaytarish uchun `return x * y;` yozilishi kerak edi."
  },
  {
    "id": 12,
    "question": "Arrow funksiyalar generator (`function*`) sifatida ishlatilishi mumkinmi?",
    "options": [
      "Ha, `* =>` yordamida",
      "Yo'q, arrow funksiyalarni generator funksiya (yield ishlatiladigan) sifatida ishlatib bo'lmaydi",
      "Faqat Node.js muhitida ishlatish mumkin",
      "Faqat asinxron bo'lsa ishlatish mumkin"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyalar generator funksiya bo'la olmaydi. Ular `yield` kalit so'zini o'z ichida ishlata olmaydi va `*` sintaksisini qo'llab-quvvatlamaydi."
  }
]

};
