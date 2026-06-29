export const typeofLesson = {
  id: "typeofLesson",
  title: "Typeof Operator",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### \`typeof\` operatori nima?
JavaScript-da har qanday o'zgaruvchi yoki qiymat ma'lum bir **ma'lumot turiga (data type)** tegishli bo'ladi. \`typeof\` operatori — bu ma'lum bir o'zgaruvchi yoki qiymatning turini aniqlab beruvchi maxsus JavaScript vositasidir. U qiymat turini ifodalovchi **satr (string)** qaytaradi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz do'konga bordingiz va sizga yopiq qutilarda turli mahsulotlar berildi. Siz qutining ichida nima borligini bilmaysiz (u sutmi, nonmi yoki o'yinchoqmi). 
* **\`typeof\` operatori** — bu har bir qutining ustidagi shtrix-kodni o'qib, sizga "sut", "non" yoki "o'yinchoq" deb aytib beradigan **skaner qurilmasi**.

---

## 2. 💻 Real Kod Misollari

### 1. Sodda misol
\`\`\`javascript
console.log(typeof 42);           // "number"
console.log(typeof "Assalomu alaykum"); // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof Symbol("id")); // "symbol"
console.log(typeof 9007199254n);  // "bigint"
\`\`\`

### 2. O'rtacha misol (Type Guard)
\`\`\`javascript
function formatCurrency(value) {
  if (typeof value === "number") {
    return \`\${value.toFixed(2)} UZS\`;
  }
  return "Noto'g'ri pul formati";
}
\`\`\`

---

## 3. ❌ YOMON va ✅ YAXSHI Misollar

❌ YOMON (Array va Null bilan ishlashdagi xatolar):
\`\`\`javascript
const list = [1, 2, 3];
if (typeof list === "array") { // Hech qachon ishlamaydi, typeof massivga "object" qaytaradi!
  console.log("Bu massiv");
}

let user = null;
if (typeof user === "object") {
  console.log(user.name); // XATO! TypeError: Cannot read properties of null
}
\`\`\`

✅ YAXSHI (To'g'ri usullar):
\`\`\`javascript
const list = [1, 2, 3];
if (Array.isArray(list)) { 
  console.log("Bu haqiqiy massiv");
}

let user = null;
if (user !== null && typeof user === "object") {
  console.log("Xavfsiz tekshiruv.");
}
\`\`\`

---

## 4. ⚙️ Mermaid Diagrammasi

\`\`\`mermaid
graph TD
    Input["Qiymat (Input)"] --> Typeof{"typeof operatori"}
    Typeof -->|"42, 3.14, NaN"| TNum["'number'"]
    Typeof -->|"'salom'"| TStr["'string'"]
    Typeof -->|"true, false"| TBool["'boolean'"]
    Typeof -->|"undefined"| TUndef["'undefined'"]
    Typeof -->|"Symbol()"| TSym["'symbol'"]
    Typeof -->|"10n"| TBig["'bigint'"]
    Typeof -->|"() => {}"| TFunc["'function'"]
    Typeof -->|"null"| TObjBug["'object' (Tarixiy Bug)"]
    Typeof -->|"[], {}"| TObj["'object'"]
\`\`\`

---

## 5. 💬 Intervyu Savollari

1. **Savol:** \`typeof null\` natijasi nima va nima uchun?
   * **Javob:** Natija \`'object'\`. Bu JavaScript-ning dastlabki yillarida yozilgan tarixiy xatodir (null'ning xotiradagi bitlari 000 bo'lgani sababli obyekt deb qaralgan). Uni orqaga moslik (backward compatibility) uchun tuzatishmagan.
2. **Savol:** E'lon qilinmagan o'zgaruvchiga \`typeof\` ishlatsa nima bo'ladi?
   * **Javob:** Odatda e'lon qilinmagan o'zgaruvchini ishlatsangiz xatolik beradi, lekin \`typeof\` operatori xavfsiz tarzda \`'undefined'\` qaytaradi.
3. **Savol:** \`typeof typeof 1\` natijasi nima?
   * **Javob:** Natija \`'string'\`. Sababi \`typeof 1\` \`'number'\` satrini qaytaradi. Keyin \`typeof 'number'\` ishga tushadi, bu esa albatta satr (string) turidir.
`,
  exercises: [
    {
      id: 1,
      title: "Qiymat Turini Aniqlash",
      instruction: "Berilgan `value` qiymatining turini qaytaruvchi `getType(value)` funksiyasini yozing.",
      startingCode: "function getType(value) {\n  // Code\n}",
      hint: "return typeof value;",
      test: "const fn = new Function(code + '; return getType;')(); return fn(5) === 'number' && fn('hi') === 'string';"
    },
    {
      id: 2,
      title: "Null xatoligini tuzatish",
      instruction: "JavaScriptdagi null xatosini tuzatuvchi `getStrictType(value)` yozing. Agar qiymat null bo'lsa 'null' (string) qaytarsin, qolgan holatlarda `typeof` qilsin.",
      startingCode: "function getStrictType(value) {\n  // Code\n}",
      hint: "if (value === null) return 'null';",
      test: "const fn = new Function(code + '; return getStrictType;')(); return fn(null) === 'null' && fn({}) === 'object';"
    },
    {
      id: 3,
      title: "Faqat String qabul qilish",
      instruction: "`isString(val)` funksiyasini yarating. Agar val turi 'string' bo'lsa true, aks holda false qaytarsin.",
      startingCode: "function isString(val) {\n  // Code\n}",
      hint: "return typeof val === 'string';",
      test: "const fn = new Function(code + '; return isString;')(); return fn('test') === true && fn(1) === false;"
    },
    {
      id: 4,
      title: "Faqat Number qabul qilish",
      instruction: "`isNumber(val)` funksiyasi. Agar val 'number' bo'lsa true, aks holda false.",
      startingCode: "function isNumber(val) {\n  // Code\n}",
      hint: "return typeof val === 'number';",
      test: "const fn = new Function(code + '; return isNumber;')(); return fn(123) === true && fn('1') === false;"
    },
    {
      id: 5,
      title: "Massivni ajratib olish",
      instruction: "`isArrayOrObject(val)` yozing. Agar massiv bo'lsa 'array', oddiy obyekt bo'lsa (null bo'lmasa) 'object', qolgan barcha holatda 'other' qaytarsin.",
      startingCode: "function isArrayOrObject(val) {\n  // Code\n}",
      hint: "Array.isArray(val) ni ishlating.",
      test: "const fn = new Function(code + '; return isArrayOrObject;')(); return fn([]) === 'array' && fn({}) === 'object' && fn(null) === 'other';"
    },
    {
      id: 6,
      title: "Boolean tekshiruvi",
      instruction: "`isBooleanType(val)` funksiyasi val ni tekshirsin va turi boolean bo'lsa true qaytarsin.",
      startingCode: "function isBooleanType(val) {\n  // Code\n}",
      hint: "typeof val === 'boolean'",
      test: "const fn = new Function(code + '; return isBooleanType;')(); return fn(true) === true && fn('true') === false;"
    },
    {
      id: 7,
      title: "Funksiya tekshiruvi",
      instruction: "`isFunctionCode(val)` funksiyasi turi function bo'lsa true qaytarsin.",
      startingCode: "function isFunctionCode(val) {\n  // Code\n}",
      hint: "typeof val === 'function'",
      test: "const fn = new Function(code + '; return isFunctionCode;')(); return fn(() => {}) === true && fn({}) === false;"
    },
    {
      id: 8,
      title: "Undefined topish",
      instruction: "`isUndefinedVal(val)` undefined qiymat bo'lsa true qaytarsin.",
      startingCode: "function isUndefinedVal(val) {\n  // Code\n}",
      hint: "typeof val === 'undefined'",
      test: "const fn = new Function(code + '; return isUndefinedVal;')(); return fn(undefined) === true && fn(null) === false;"
    },
    {
      id: 9,
      title: "BigInt tekshirish",
      instruction: "`isBigInt(val)` agar val bigint bo'lsa true.",
      startingCode: "function isBigInt(val) {\n  // Code\n}",
      hint: "typeof val === 'bigint'",
      test: "const fn = new Function(code + '; return isBigInt;')(); return fn(10n) === true && fn(10) === false;"
    },
    {
      id: 10,
      title: "Symbol tekshirish",
      instruction: "`isSymbolVal(val)` symbol turlarini tutadi.",
      startingCode: "function isSymbolVal(val) {\n  // Code\n}",
      hint: "typeof val === 'symbol'",
      test: "const fn = new Function(code + '; return isSymbolVal;')(); return fn(Symbol('a')) === true && fn('a') === false;"
    }
  ],
  quizzes: [
    {
      question: "typeof 42 ifodasi nimani qaytaradi?",
      options: ["'number'", "'string'", "'object'", "'boolean'"],
      correctAnswer: 0,
      explanation: "typeof har qanday son uchun 'number' qaytaradi."
    },
    {
      question: "typeof null natijasi nima?",
      options: ["'null'", "'object'", "'undefined'", "TypeError"],
      correctAnswer: 1,
      explanation: "Bu JavaScriptdagi tarixiy bug: null uchun 'object' qaytadi."
    },
    {
      question: "typeof NaN natijasi nima?",
      options: ["'NaN'", "'undefined'", "'number'", "'string'"],
      correctAnswer: 2,
      explanation: "NaN ham aslida 'number' turiga kiradigan maxsus qiymatdir."
    },
    {
      question: "typeof typeof 1 ifodasi nimaga teng?",
      options: ["'number'", "'string'", "'undefined'", "'object'"],
      correctAnswer: 1,
      explanation: "typeof 1 -> 'number'. Keyin typeof 'number' -> 'string'."
    },
    {
      question: "Massivning turini aniqlash uchun nimadan foydalanish to'g'ri?",
      options: ["typeof [] === 'array'", "Array.isArray([])", "typeof [] === 'list'", "isType([])"],
      correctAnswer: 1,
      explanation: "Massivlar obyekt bo'lgani uchun typeof 'object' beradi. Shuning uchun Array.isArray ishlatiladi."
    },
    {
      question: "typeof undefined qanday natija beradi?",
      options: ["'null'", "'undefined'", "'object'", "ReferenceError"],
      correctAnswer: 1,
      explanation: "undefined o'zining 'undefined' turiga ega."
    },
    {
      question: "typeof e'lon qilinmagan (undeclared) o'zgaruvchi uchun nima beradi?",
      options: ["'undefined'", "ReferenceError", "'null'", "'string'"],
      correctAnswer: 0,
      explanation: "typeof o'zgaruvchi umuman topilmasa ham xavfsiz tarzda 'undefined' qaytaradi."
    },
    {
      question: "typeof (() => {}) nima bo'ladi?",
      options: ["'object'", "'function'", "'array'", "'string'"],
      correctAnswer: 1,
      explanation: "Oddiy va arrow funksiyalar typeof uchun 'function' qaytaradi."
    },
    {
      question: "typeof Symbol('id') nima beradi?",
      options: ["'symbol'", "'string'", "'object'", "'function'"],
      correctAnswer: 0,
      explanation: "Symbol bu primitiv tur."
    },
    {
      question: "typeof 10n nima qaytaradi?",
      options: ["'number'", "'bigint'", "'string'", "'object'"],
      correctAnswer: 1,
      explanation: "Oxirida n bilan yozilgan sonlar BigInt hisoblanadi."
    },
    {
      question: "typeof 'null' nimaga teng (qo'shtirnoqqa olingan null)?",
      options: ["'object'", "'null'", "'string'", "TypeError"],
      correctAnswer: 2,
      explanation: "Qo'shtirnoqqa olingan null shunchaki oddiy matn, u 'string' dir."
    },
    {
      question: "typeof new String('x') qanday bo'ladi?",
      options: ["'string'", "'object'", "'function'", "'undefined'"],
      correctAnswer: 1,
      explanation: "new kalit so'zi bilan yaratilgan qiymatlar obyekt qobig'i (wrapper object) ga aylanadi va 'object' qaytadi."
    }
  ]
};