export const arrowFunctions = {
  id: "arrowFunctions",
  title: "Arrow Functions (Arrow funksiyalar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Arrow Functions nima?
**Arrow Functions (Ko'rsatkichli funksiyalar)** — bu ES6 versiyasida JavaScript dasturlash tiliga kiritilgan, funksiyalarni yozishning yanada qisqa, tushunarli va zamonaviy sintaksisidir. U an'anaviy \`function\` kalit so'zi o'rniga \`=>\` (semiz ko'rsatkich/strelka) belgisidan foydalanadi.

### Real hayotiy analogiya
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
    "id": 1,
    "title": "Arrow Yig'indi",
    "instruction": "Ikkita sonni parametr sifatida qabul qilib, ularning yig'indisini qaytaruvchi 'add' nomli arrow funksiyasini yozing.",
    "startingCode": "// Kodni shu yerda yozing\n",
    "hint": "const add = (a, b) => a + b;",
    "test": "if (!code.includes('=>')) return 'Arrow funksiya (=>) sintaksisi ishlatilmadi';\nconst sandbox = new Function(code + '; return add;');\nconst fn = sandbox();\nif (typeof fn === 'function' && fn(5, 3) === 8) return null;\nreturn 'add funksiyasi noto\\'g\\'ri hisoblamoqda';"
  },
  {
    "id": 2,
    "title": "Implicit Return bilan Obyekt Qaytarish",
    "instruction": "'ism' va 'yosh' parametrlarini qabul qilib, ularni mos ravishda kalit va qiymat qilib obyekt ko'rinishida qaytaruvchi 'createProfile' nomli arrow funksiyasini yozing. Funksiyada jingalak qavslarni jingalak qavsli obyekt deb tushunmaslik uchun oddiy qavslardan foydalaning (implicit return).",
    "startingCode": "// Kodni shu yerda yozing\n",
    "hint": "const createProfile = (ism, yosh) => ({ ism, yosh });",
    "test": "if (code.includes('return')) return 'Implicit return ishlatilishi kerak, ya\\'ni return so\\'zini yozmang';\nconst sandbox = new Function(code + '; return createProfile;');\nconst fn = sandbox();\nconst profile = fn('Ali', 20);\nif (profile && profile.ism === 'Ali' && profile.yosh === 20) return null;\nreturn 'createProfile funksiyasi to\\'g\\'ri obyekt qaytarmadi';"
  },
  {
    "id": 3,
    "title": "Map bilan Arrow Funksiya",
    "instruction": "Taqdim etilgan 'nums' massividagi har bir elementni 2 barobar oshirish uchun 'map' metodi ichiga arrow funksiyani yozing va natijani 'doubled' o'zgaruvchisiga saqlang.",
    "startingCode": "const nums = [1, 2, 3];\n// Kodni shu yerda yozing\n",
    "hint": "const doubled = nums.map(n => n * 2);",
    "test": "if (!code.includes('map') || !code.includes('=>')) return 'map va arrow funksiya birgalikda ishlatilmadi';\nconst sandbox = new Function('nums', code + '; return doubled;');\nconst res = sandbox([1, 2, 3]);\nif (Array.isArray(res) && res[0] === 2 && res[2] === 6) return null;\nreturn 'Natija noto\\'g\\'ri';"
  }
]
,
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
