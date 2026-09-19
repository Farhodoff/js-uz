export const arrowFunctions = {
  id: "arrowFunctions",
  title: "Arrow Functions (Arrow funksiyalar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Arrow Functions nima?
**Arrow Functions (Ko'rsatkichli funksiyalar)** — bu ES6 versiyasida JavaScript dasturlash tiliga kiritilgan, funksiyalarni yozishning yanada qisqa, tushunarli va zamonaviy sintaksisidir. U an'anaviy \\\`function\\\` kalit so'zi o'rniga \\\`=>\\\` (semiz ko'rsatkich/strelka) belgisidan foydalanadi.

### Real hayotiy o'xshatish (Beginner Analogy)
Tasavvur qiling, siz do'stingizga xat yozayapsiz:
* **Eski usul (Rasmiy xat):** "Hurmatli do'stim, sizga shuni ma'lum qilamanki, ertaga uchrashamiz. Hurmat bilan, Ali." (Barcha kalit so'zlar va rasmiyatchiliklar joyida, bu eski oddiy funksiyaga o'xshaydi).
* **Arrow funksiya (SMS tili):** "Ertaga ko'rishamiz. Ali." (Ortiqcha so'zlarsiz, maqsad qisqa va tezkor ifodalangan). Shuning uchun kod yozish tezlashadi.

---

## 2. ⚙️ Chuqur O'rganish (Deep Dive: Under the hood)

### Lexical \\\`this\\\` va V8 Engine
Arrow funksiyalarning eng katta kuchi qisqalikda emas, balki **\\\`this\\\`** ning ishlashidadir.
An'anaviy funksiyalar chaqirilgan vaqtiga qarab o'zlarining shaxsiy \\\`this\\\` obyektini yaratadi. V8 engine bunday funksiya ishga tushganda yangi execution context yaratib, unga xotira ajratadi.
Arrow funksiyalar esa o'ziga xos \\\`this\\\` ga ega emas. V8 engine arrow funksiya uchun maxsus \\\`this\\\` xotirasi ajratmaydi. U \\\`this\\\` ni tashqi doiradan (Lexical Environment) oddiy o'zgaruvchi sifatida qidiradi. Bu ba'zi joylarda kodning tez ishlashini va kutilmagan bug'larning oldini oladi.

### Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD
    A[Obyekt Metodi] --> B(Regular Function)
    A --> C(Arrow Function)
    B --> D[O'zining 'this' obyektiga ega]
    C --> E[O'ziga tegishli 'this' yo'q]
    D --> F[this === Obyekt]
    E --> G[this === Tashqi doira / Window]
\\\`\\\`\\\`

> [!IMPORTANT]
> Arrow funksiyalarni \\\`new\\\` kalit so'zi yordamida konstruktor funksiya kabi chaqirib bo'lmaydi. Ularda \\\`[[Construct]]\\\` ichki metodi va \\\`prototype\\\` xususiyati mavjud emas.

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Interview Question 1
**Savol:** Arrow funksiyada \\\`arguments\\\` obyektidan foydalanish mumkinmi?
**Javob:** Yo'q, arrow funksiyalarda ichki \\\`arguments\\\` obyekti yo'q. Uning o'rniga ES6 ning Rest parametrlaridan (\\\`...args\\\`) foydalanish kerak.
\\\`\\\`\\\`javascript
// ReferenceError: arguments is not defined
const showArgs = () => console.log(arguments); 

// To'g'ri yechim
const showArgs = (...args) => console.log(args);
\\\`\\\`\\\`

### Interview Question 2
**Savol:** Nega obyekt metodini arrow funksiya bilan e'lon qilish xavfli hisoblanadi?
**Javob:** Chunki arrow funksiyaning \\\`this\\\` qiymati obyektga emas, uni o'rab turgan global (masalan, window) obyektga tegishli bo'lib qoladi.
\\\`\\\`\\\`javascript
const person = {
  name: "Farhod",
  sayName: () => console.log(this.name) // 'this' windowga teng bo'ladi
};
person.sayName(); // undefined
\\\`\\\`\\\`

### Edge Case (Implicit Return obyekti)
Arrow funksiya orqali bitta qatorda obyekt qaytarish uchun obyektni oddiy qavslarga \\\`()\\\` o'rash kerak, chunki jingalak qavslar \\\`{}\` kod bloki hisoblanadi.
\\\`\\\`\\\`javascript
// Noto'g'ri (undefined qaytaradi)
const createUserBad = (name, age) => { name: name, age: age };

// To'g'ri sintaksis
const createUserGood = (name, age) => ({ name: name, age: age });
\\\`\\\`\\\`
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
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Arrow funksiyalarning an'anaviy `function` kalit so'zi yordamida yaratilgan funksiyalardan asosiy farqi nimada?",
      options: [
        "Arrow funksiyalarda o'zining shaxsiy `this` bog'lanishi (binding) mavjud emas, u `this`ni tashqi lexical doiradan meros oladi",
        "Arrow funksiyalar sekinroq ishlaydi",
        "Arrow funksiyalarni faqat serverda ishlatish mumkin",
        "Arrow funksiyalar faqat musbat sonlarni qaytara oladi"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiyalar o'zining `this` qiymatiga ega emas. Ular `this` ni o'zlarini o'rab turgan tashqi (lexical) kontekstdan qabul qilishadi."
    },
    {
      id: 2,
      question: "Arrow funksiya yordamida bitta qatorda obyekt qaytarmoqchi bo'lsak, qaysi sintaksis to'g'ri hisoblanadi?",
      options: [
        "const user = () => { name: 'Ali' };",
        "const user = () => ({ name: 'Ali' });",
        "const user = () => return { name: 'Ali' };",
        "const user = () => [ name: 'Ali' ];"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar `{}` funksiya tanasini (block) anglatgani uchun, obyekt literali qaytarilayotganda chalkashlik yuzaga kelmasligi uchun obyekt qavslar ichiga `({ ... })` olinishi shart."
    },
    {
      id: 3,
      question: "Arrow funksiyada `arguments` obyekti mavjudmi?",
      options: [
        "Ha, u oddiy funksiyadagi kabi to'liq ishlaydi",
        "Yo'q, arrow funksiyalarda `arguments` obyekti yo'q. Buning o'rniga rest parametrlardan (`...args`) foydalanish kerak",
        "Ha, lekin faqat massiv ko'rinishida bo'ladi",
        "Faqat `strict mode` yoqilganda mavjud bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarda `arguments` maxsus o'zgaruvchisi yo'q. Agar kiruvchi argumentlar oqimini olish kerak bo'lsa, rest `...args` parametrlaridan foydalanish zarur."
    },
    {
      id: 4,
      question: "Arrow funksiyani `new` kalit so'zi yordamida konstruktor sifatida chaqirsa nima sodir bo'ladi?",
      options: [
        "Yangi obyekt muvaffaqiyatli yaratiladi",
        "TypeError: [FunctionName] is not a constructor xatosi yuz beradi",
        "Funksiya oddiy funksiya kabi bajariladi, lekin obyekt qaytarmaydi",
        "Sahifa avtomatik qayta yuklanadi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar `prototype` xususiyatiga ega emas, shu sababli ularni `new` kalit so'zi orqali konstruktor sifatida ishlatib bo'lmaydi va xatolik beradi."
    },
    {
      id: 5,
      question: "Arrow funksiyalar qachon 'hoisted' bo'ladi (kodning yuqorisiga ko'tariladi)?",
      options: [
        "Har doim, chunki hamma funksiya hisoblanadi",
        "Ular e'lon qilinish shakliga bog'liq (const/let bilan TDZga tushadi)",
        "Faqat var bilan e'lon qilinganda funksiya sifatida hoisted bo'ladi",
        "Faqat brauzer o'chib yonganda hoisted bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar ifoda (Expression) sifatida e'lon qilinadi (odatda `const` yoki `let` bilan). Shuning uchun o'zgaruvchilar kabi hoisted bo'lmaydi."
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst obj = { x: 10, getX: () => this.x };\nconsole.log(obj.getX());\n```",
      options: [
        "10",
        "undefined",
        "ReferenceError",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyada `this` lexical scope-ga bog'liq. U obyektdan emas, window dan `this`ni oladi. Globalda `x` bo'lmagani uchun `undefined` chiqadi."
    },
    {
      id: 7,
      question: "Arrow funksiyalarni `call()`, `apply()` yoki `bind()` yordamida boshqa obyektdagi `this` kontekstiga bog'lab bo'ladimi?",
      options: [
        "Ha, mutlaqo bog'lab bo'ladi",
        "Yo'q, ularda this o'zgarmaydi, parametrlar inobatga olinmaydi",
        "Faqat `bind()` yordamida bog'lash mumkin",
        "Faqat `call()` yordamida bog'lash mumkin"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarda `this` har doim o'zi e'lon qilingan lexical context-ga bog'langan bo'ladi. Ularni qayta bog'lab bo'lmaydi."
    },
    {
      id: 8,
      question: "Arrow funksiyaning parametri atigi bitta bo'lganda, sintaksisda nima qilish mumkin?",
      options: [
        "Parametr atrofidagi qavslarni `()` tashlab ketish mumkin",
        "Jingalak qavslarni tashlab ketish mumkin",
        "Hech qanday qisqartirish mumkin emas",
        "Parametrni umuman yozmaslik mumkin"
      ],
      correctAnswer: 0,
      explanation: "Agar arrow funksiyada parametr bitta bo'lsa, qavslarsiz `x => x * 2` shaklida yozish mumkin."
    },
    {
      id: 9,
      question: "Quyidagi arrow funksiya sintaksisining qaysi biri sintaktik jihatdan xato?",
      options: [
        "const f = () => 10;",
        "const f = x => x;",
        "const f = x, y => x + y;",
        "const f = (x, y) => x + y;"
      ],
      correctAnswer: 2,
      explanation: "Parametrlar soni birdan ortiq bo'lsa (`x, y`), ular albatta qavs ichiga olinishi kerak: `(x, y) => x + y`. Qavssiz yozish SyntaxError beradi."
    },
    {
      id: 10,
      question: "Arrow funksiyaning `prototype` xususiyati bormi?",
      options: [
        "Ha",
        "Yo'q",
        "Faqat `var` bilan e'lon qilinganda mavjud",
        "Faqat `return` ishlatilganda mavjud"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar konstruktor bo'la olmaganligi sababli, ularda `prototype` xususiyati bo'lmaydi (`undefined` bo'ladi)."
    },
    {
      id: 11,
      question: "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nconst multiply = (x, y) => { x * y };\nconsole.log(multiply(2, 3));\n```",
      options: [
        "6",
        "undefined",
        "NaN",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar `{}` ochilganda uni kod bloki deb hisoblaydi va avtomatik return qilmaydi. Shuning uchun undefined qaytadi."
    },
    {
      id: 12,
      question: "Arrow funksiyalar generator (`function*`) sifatida ishlatilishi mumkinmi?",
      options: [
        "Ha",
        "Yo'q",
        "Faqat Node.js da",
        "Faqat asinxron bo'lsa"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar generator funksiya bo'la olmaydi. Ular `yield` kalit so'zini ishlata olmaydi."
    }
  ]
};
