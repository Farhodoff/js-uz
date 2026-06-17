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
* Skaner sizga qutining ichidagi aniq sut brendini yoki nonning og'irligini aytmaydi, u faqat mahsulotning umumiy turini (kategoriyasini) aniqlab beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda misol)
Primitiv ma'lumot turlarini \`typeof\` yordamida aniqlash:
\`\`\`javascript
console.log(typeof 42);           // "number"
console.log(typeof "Assalomu alaykum"); // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof Symbol("id")); // "symbol"
console.log(typeof 9007199254n);  // "bigint" (oxirida 'n' bor)
\`\`\`

### 2. Intermediate Example (O'rtacha misol)
O'zgaruvchining turini tekshirib, shunga qarab dastur logikasini boshqarish (Type Guard):
\`\`\`javascript
function formatCurrency(value) {
  // Agar qiymat son bo'lsa, uni pul formatiga o'tkazamiz
  if (typeof value === "number") {
    return \`\${value.toFixed(2)} UZS\`;
  }
  
  // Agar qiymat matn bo'lsa va unda son yozilgan bo'lsa
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      return \`\${parsed.toFixed(2)} UZS\`;
    }
  }
  
  // Boshqa barcha holatlar uchun xatolik matni
  return "Noto'g'ri pul formati";
}

console.log(formatCurrency(15000));     // "15000.00 UZS"
console.log(formatCurrency("25000.5"));  // "25000.50 UZS"
console.log(formatCurrency(null));       // "Noto'g'ri pul formati"
\`\`\`

### 3. Advanced Example (Murakkab misol)
Funksiya yoki konfiguratsiya obyektlarini dynamic ravishda qayta ishlash:
\`\`\`javascript
function processInput(input, action) {
  console.log(\`Kirish qiymati turi: \${typeof input}\`);
  
  // Agar 'action' funksiya bo'lsa, uni ishga tushiramiz (Callback)
  if (typeof action === "function") {
    action(input);
  } 
  // Agar 'action' obyekt bo'lsa, uning ichidagi handler-ni chaqiramiz
  else if (typeof action === "object" && action !== null) {
    if (typeof action.handle === "function") {
      action.handle(input);
    } else {
      console.log("Obyekt ichida 'handle' funksiyasi topilmadi.");
    }
  } 
  else {
    console.log("Amalni bajarib bo'lmaydi: action noto'g'ri turda.");
  }
}

// Chaqirilishi:
processInput("Ma'lumot", (data) => console.log(\`Funksiya ishladi: \${data}\`));
processInput("Tizim", { handle: (data) => console.log(\`Obyekt handler ishladi: \${data}\`) });
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### JavaScript-da qiymatlarning xotiradagi tuzilishi
JavaScript dastlabki yillarda (1995-yil) qiymatlarni xotirada 32-bitli zanjir ko'rinishida saqlagan. Ushbu bitlarning birinchi 1 dan 3 bitigacha bo'lgan qismi qiymatning turini aniqlaydigan maxsus **tur teglari (type tags)** bo'lgan:

* \`000\` — Obyekt (Object)
* \`1\` — Butun son (Integer / Number)
* \`010\` — Haqiqiy son (Double / Number)
* \`100\` — Satr (String)
* \`110\` — Mantiqiy qiymat (Boolean)

### Tarixiy Bug: \`typeof null === 'object'\`
JavaScript-da \`null\` qiymati bo'sh ko'rsatkich (null pointer) hisoblanadi. Shuning uchun uning barcha bitlari \`0\` bo'lgan (ya'ni \`00000000...\`). 

\`typeof\` operatori qiymatning turini aniqlayotganda birinchi 3 ta bitga qaraydi. \`null\` ning birinchi 3 biti \`000\` bo'lgani uchun, operator uni **Obyekt (\`object\`)** deb hisoblagan va \`'object'\` satrini qaytargan. 

Bu tilning arxitekturasidagi xatolikdir. Keyinchalik bu xatoni tuzatish bo'yicha takliflar kiritilgan, ammo dunyo bo'yicha millionlab mavjud saytlar va tizimlar ushbu xususiyatga tayanib yozilgani sababli, orqaga moslikni (backward compatibility) buzmaslik uchun ushbu xato o'zgarishsiz qoldirilgan.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Massivni (Array) tekshirishda \`typeof\`ga tayanish
#### Xato:
\`\`\`javascript
const list = [1, 2, 3];
if (typeof list === "array") { // Hech qachon ishlamaydi!
  console.log("Bu massiv");
}
\`\`\`
#### Nima uchun:
JavaScript-da massivlar ham obyektlarning bir turi bo'lganligi sababli, \`typeof list\` har doim \`'object'\` qaytaradi.
#### To'g'ri usul:
Massivni tekshirish uchun maxsus \`Array.isArray()\` metodidan foydalanish kerak:
\`\`\`javascript
if (Array.isArray(list)) {
  console.log("Bu massiv");
}
\`\`\`

### 2. \`null\` qiymatini tekshirmasdan obyekt xossalariga murojaat qilish
#### Xato:
\`\`\`javascript
let user = null;
if (typeof user === "object") {
  console.log(user.name); // TypeError: Cannot read properties of null
}
\`\`\`
#### Nima uchun:
\`typeof null\` sizga \`'object'\` bergani bilan, \`null\` ichida hech qanday xossa yoki metod bo'lmaydi. Uni oddiy obyekt deb hisoblash xatolikka olib keladi.
#### To'g'ri usul:
Qiymat \`null\` emasligini alohida tekshiring:
\`\`\`javascript
if (user !== null && typeof user === "object") {
  console.log(user.name);
}
\`\`\`

### 3. Konstruktor yordamida yaratilgan wrapper (qobiq) obyektlari
#### Xato:
\`\`\`javascript
const nameObj = new String("Jasur");
console.log(typeof nameObj); // "object" qaytaradi, "string" emas!
\`\`\`
#### Nima uchun:
\`new\` kalit so'zi bilan yaratilgan har qanday qiymat oddiy ibtidoiy qiymat emas, balki qobiq obyekt (wrapper object) hisoblanadi. Shuning uchun ibtidoiy qiymatlarni yaratishda hech qachon \`new String()\`, \`new Number()\` yoki \`new Boolean()\` ishlatmang.

---

## 5. 💬 12 ta Intervyu Savollari

### Junior darajasi uchun
1. **Savol:** \`typeof\` operatori nima qaytaradi?
   * **Javob:** Qiymatning turini ko'rsatadigan kichik harflardagi satr (string) qaytaradi (masalan: \`'number'\`, \`'string'\`, \`'boolean'\`).
2. **Savol:** \`typeof null\` natijasi nima va nima uchun?
   * **Javob:** Natija \`'object'\`. Bu JavaScript-ning dastlabki bit-tizimidagi tarixiy xatodir (null pointer bitlari 000 bo'lgani sababli).
3. **Savol:** \`typeof undefined\` natijasi nima?
   * **Javob:** \`'undefined'\`.
4. **Savol:** \`typeof\` operatorini qavslar bilan yozish kerakmi? Masalan: \`typeof(x)\` yoki \`typeof x\`?
   * **Javob:** Ikkala usul ham to'g'ri. \`typeof\` bu funksiya emas, operator. Qavslar faqat ifodani guruhlash uchun xizmat qiladi.

### Middle darajasi uchun
5. **Savol:** \`typeof NaN\` natijasi nima?
   * **Javob:** \`'number'\`. \`NaN\` (Not-a-Number) sonli qiymatlarning noto'g'ri matematik amallar natijasidagi holatini ifodalaydi.
6. **Savol:** E'lon qilinmagan o'zgaruvchiga \`typeof\` ishlatilsa nima sodir bo'ladi?
   * **Javob:** Xatolik tashlanmaydi, aksincha xavfsiz tarzda \`'undefined'\` qaytadi.
7. **Savol:** Massiv (Array) va oddiy obyekt (Object) uchun \`typeof\` nima qaytaradi? Ularni qanday ajratish mumkin?
   * **Javob:** Har ikkalasi uchun ham \`'object'\` qaytaradi. Ularni ajratish uchun \`Array.isArray(x)\` yoki \`x instanceof Array\` ishlatish kerak.
8. **Savol:** \`typeof new Function()\` nima qaytaradi?
   * **Javob:** \`'function'\`. Barcha funksiyalar va funksiya konstruktorlari uchun \`'function'\` qaytadi.

### Senior darajasi uchun
9. **Savol:** \`typeof typeof 1\` natijasi nima?
   * **Javob:** \`'string'\`. Chunki birinchi \`typeof 1\` natijasi \`'number'\` satridir. Keyin esa \`typeof 'number'\` bajariladi va u har doim \`'string'\` bo'ladi.
10. **Savol:** \`typeof\` yordamida obyektning klassini yoki custom turini aniqlab bo'ladimi?
    * **Javob:** Yo'q, \`typeof\` faqat asosiy tiplarni qaytaradi. Maxsus klasslarni aniqlash uchun \`instanceof\` operatori yoki \`Object.prototype.toString.call(obj)\`dan foydalaniladi.
11. **Savol:** \`typeof\` ning qanday cheklovlari bor?
    * **Javob:** U \`null\`, \`Array\`, \`Date\`, \`RegExp\` va oddiy obyektlarni farqlay olmaydi — hammasiga \`'object'\` qaytaradi.
12. **Savol:** \`typeof 10n\` nima beradi?
    * **Javob:** \`'bigint'\`. Bu ES2020 da kiritilgan BigInt primitiv turining natijasidir.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi Mermaid diagrammasida \`typeof\` operatorining har xil turdagi qiymatlarni qanday satrlarga xaritalashi (map qilishi) batafsil ko'rsatilgan. Tarixiy \`null\` xatoligiga ham alohida e'tibor bering:

\`\`\`mermaid
graph TD
    A["Qiymat (Input Value)"] --> B{"typeof qiymat"}
    B -->|"42, 3.14, NaN"| C["'number'"]
    B -->|"'salom', \`text\`"| D["'string'"]
    B -->|"true, false"| E["'boolean'"]
    B -->|"undefined"| F["'undefined'"]
    B -->|"Symbol('id')"| G["'symbol'"]
    B -->|"10n"| H["'bigint'"]
    B -->|"() => {} yoki function"| I["'function'"]
    B -->|"null (Tarixiy Xato)"| J["'object' ⚠️"]
    B -->|"[], {}, new Date()"| K["'object'"]
\`\`\`

Ushbu qoidalar asosida o'zingizni sinash uchun \`typeof\` yordamida ma'lumotlarni validatsiya qilishni boshlang.

---

## 7. 📝 12 ta Mini Test

Bilimingizni sinash uchun ushbu darsga biriktirilgan test savollarini yechib chiqing. Testlar primitiv turlar, funksiyalar va JavaScript-ning o'ziga xos xususiyatlarini qamrab oladi.

---

## 8. 🎯 Real Project Case Study

### API Ma'lumotlarini Validatsiya Qilish Tizimi (Schema Validator)
Loyihada tashqi API-dan kelayotgan JSON ma'lumotlarini tekshirish juda muhim. Agar kelgan ma'lumot turi xato bo'lsa, dasturimiz to'xtab qolishi mumkin. Buning uchun \`typeof\` yordamida oddiy sxema validatori yozamiz:

\`\`\`javascript
function validateSchema(data, schema) {
  for (let key in schema) {
    const expectedType = schema[key];
    const actualValue = data[key];
    
    // Agar kutilayotgan maydon ma'lumotda bo'lmasa
    if (actualValue === undefined) {
      return { valid: false, error: \`'\${key}' maydoni kiritilishi shart.\` };
    }
    
    // Agar kutilayotgan tur funksiya yoki boshqa ma'lumot turi bo'lsa
    if (typeof actualValue !== expectedType) {
      return { 
        valid: false, 
        error: \`'\${key}' maydoni '\${expectedType}' turida bo'lishi kerak. Amalda: '\${typeof actualValue}'\` 
      };
    }
  }
  return { valid: true };
}

// Loyihadagi sxema:
const userSchema = {
  id: "number",
  username: "string",
  isActive: "boolean"
};

// API-dan kelgan to'g'ri ma'lumot:
const correctResponse = { id: 101, username: "admin", isActive: true };
console.log(validateSchema(correctResponse, userSchema)); // { valid: true }

// API-dan kelgan noto'g'ri ma'lumot:
const badResponse = { id: 101, username: "admin", isActive: "true" }; // isActive string bo'lib kelgan
console.log(validateSchema(badResponse, userSchema)); 
// { valid: false, error: "'isActive' maydoni 'boolean' turida bo'lishi kerak. Amalda: 'string'" }
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Tezlik:** \`typeof\` operatori JavaScript-dagi eng tezkor operatsiyalardan biridir. U xotiradagi tur tagiga qarab ishlaydi, shuning uchun uning bajarilish vaqti doimiy ya'ni $O(1)$ dir.
* **Statik turlardan foydalanish:** JavaScript dynamic tipli til bo'lgani sababli \`typeof\`ni juda ko'p tekshiruvlarda ishlatishga to'g'ri keladi. Ammo katta loyihalarda dynamic tekshiruvlarni kamaytirish va xatolarni dasturlash vaqtidayoq aniqlash uchun **TypeScript**dan foydalanish tavsiya etiladi. TypeScript compile vaqtida turlarni tekshirib beradi, natijada run-time da \`typeof\` tekshiruvlariga ehtiyoj kamayadi.

---

## 10. 📌 Cheat Sheet

| Qiymat | \`typeof\` Natijasi | Izoh / Tavsif |
| :--- | :--- | :--- |
| \`undefined\` | \`'undefined'\` | Qiymat berilmagan o'zgaruvchi |
| \`null\` | \`'object'\` | **Tarixiy xato (bug)**, obyekt emas |
| \`true\` / \`false\` | \`'boolean'\` | Mantiqiy qiymat |
| \`42\` / \`3.14\` / \`NaN\` | \`'number'\` | Oddiy va maxsus sonlar |
| \`10n\` | \`'bigint'\` | Katta o'lchamli butun son |
| \`"salom"\` | \`'string'\` | Matnli ma'lumot |
| \`Symbol("id")\` | \`'symbol'\` | Unikal identifikator turi |
| \`() => {}\` | \`'function'\` | Arrow yoki oddiy funksiyalar |
| \`[]\` | \`'object'\` | Massivlar aslida obyekt |
| \`{}\` | \`'object'\` | Oddiy obyekt |
`,
  exercises: [
  {
    "id": 1,
    "title": "Qiymat Turini Aniqlash (getType)",
    "instruction": "Berilgan qiymatning `typeof` turini qaytaradigan `getType(value)` funksiyasini yozing. JavaScript-dagi tarixiy xato tufayli `typeof null === 'object'` qaytadi. Loyihamizda bu xatoni tuzatishimiz kerak: agar qiymat `null` bo'lsa, funksiya `'null'` satrini qaytarsin. Qolgan barcha turlar uchun standart `typeof` natijasini qaytaring.",
    "startingCode": "function getType(value) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "Qiymat null ekanligini `value === null` orqali tekshiring. Agar null bo'lsa, 'null' qaytaring, aks holda `typeof value`dan foydalaning.",
    "test": "const sandbox = new Function(code + '; return getType;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'getType funksiya bo\\'lishi kerak';\nif (fn(5) !== 'number') return 'Son uchun number qaytishi kerak';\nif (fn('hello') !== 'string') return 'Satr uchun string qaytishi kerak';\nif (fn(null) !== 'null') return 'null qiymati uchun null qaytishi kerak';\nif (fn({}) !== 'object') return 'Obyekt uchun object qaytishi kerak';\nif (fn(undefined) !== 'undefined') return 'undefined uchun undefined qaytishi kerak';\nif (fn(Symbol('id')) !== 'symbol') return 'Symbol uchun symbol qaytishi kerak';\nreturn null;"
  },
  {
    "id": 2,
    "title": "Funksiyani Aniqlash (isFunction)",
    "instruction": "Berilgan qiymat funksiya ekanligini aniqlovchi `isFunction(value)` funksiyasini yozing. Agar qiymat funksiya bo'lsa `true`, aks holda `false` qaytarsin.",
    "startingCode": "function isFunction(value) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "JavaScript-da typeof operatori oddiy va arrow funksiyalar uchun 'function' satrini qaytaradi.",
    "test": "const sandbox = new Function(code + '; return isFunction;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'isFunction funksiya bo\\'lishi kerak';\nif (fn(() => {}) !== true) return 'Arrow funksiya uchun true bo\\'lishi kerak';\nif (fn(function() {}) !== true) return 'Oddiy funksiya uchun true bo\\'lishi kerak';\nif (fn({}) !== false) return 'Obyekt uchun false bo\\'lishi kerak';\nif (fn(null) !== false) return 'null uchun false bo\\'lishi kerak';\nif (fn(10) !== false) return 'Son uchun false bo\\'lishi kerak';\nreturn null;"
  },
  {
    "id": 3,
    "title": "Xavfsiz Qo'shish (safeSum)",
    "instruction": "Ikkita argument qabul qilib ularning yig'indisini hisoblaydigan `safeSum(a, b)` funksiyasini yozing. Har ikkala argument ham faqat son (`number`) bo'lishini tekshirish uchun `typeof`dan foydalaning. Agar ulardan biri yoki ikkalasi son bo'lmasa, `TypeError` xatosini tashlang (`throw new TypeError(...)`). Agar ikkalasi ham son bo'lsa, ularning yig'indisini qaytaring.",
    "startingCode": "function safeSum(a, b) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "typeof a !== 'number' yoki typeof b !== 'number' ekanligini tekshirib, throw new TypeError('Argumentlar son bo\\'lishi kerak') yozing.",
    "test": "const sandbox = new Function(code + '; return safeSum;');\nconst fn = sandbox();\nif (typeof fn !== 'function') return 'safeSum funksiya bo\\'lishi kerak';\nif (fn(5, 10) !== 15) return '5 va 10 yig\\'indisi 15 bo\\'lishi kerak';\ntry {\n  fn(5, '10');\n  return 'Sondan boshqa tur berilganda xatolik (TypeError) tashlashi kerak';\n} catch (e) {\n  if (!(e instanceof TypeError)) return 'Xatolik turi TypeError bo\\'lishi kerak';\n}\ntry {\n  fn(true, 10);\n  return 'Sondan boshqa tur berilganda xatolik (TypeError) tashlashi kerak';\n} catch (e) {\n  if (!(e instanceof TypeError)) return 'Xatolik turi TypeError bo\\'lishi kerak';\n}\nreturn null;"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "`typeof 42` ifoda qanday qiymat qaytaradi?",
    "options": [
      "'number'",
      "'string'",
      "'integer'",
      "'object'"
    ],
    "correctAnswer": 0,
    "explanation": "JavaScript-da butun va haqiqiy sonlar uchun `typeof` har doim `'number'` satrini qaytaradi."
  },
  {
    "id": 2,
    "question": "`typeof null` ifoda nima qaytaradi va bu nimaning natijasi?",
    "options": [
      "'null', bu to'g'ri qiymat",
      "'object', bu JavaScript-dagi tarixiy xato (bug)",
      "'undefined', chunki qiymat bo'sh",
      "'boolean', chunki null false hisoblanadi"
    ],
    "correctAnswer": 1,
    "explanation": "JS yaratilgan paytda (1995-yilda) qiymatlarni ifodalovchi bit zanjirlari tuzilishi sababli null xatolik tufayli 'object' deb belgilangan va orqaga moslik (backward compatibility) uchun o'zgartirilmagan."
  },
  {
    "id": 3,
    "question": "`typeof undefined` nima qaytaradi?",
    "options": [
      "'null'",
      "'object'",
      "'undefined'",
      "'boolean'"
    ],
    "correctAnswer": 2,
    "explanation": "O'zgaruvchi e'lon qilingan ammo qiymat berilmagan bo'lsada, uning turi 'undefined' bo'ladi."
  },
  {
    "id": 4,
    "question": "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nconsole.log(typeof (typeof 100));\n```",
    "options": [
      "'number'",
      "'string'",
      "'undefined'",
      "'object'"
    ],
    "correctAnswer": 1,
    "explanation": "`typeof 100` ifodasi 'number' satrini qaytaradi. Keyin `typeof 'number'` bajariladi va har qanday satrning turi 'string' bo'lgani uchun natija 'string' chiqadi."
  },
  {
    "id": 5,
    "question": "JavaScript-da `typeof []` (bo'sh massiv) va `typeof {}` (bo'sh obyekt) ifodalarining natijalari qanday?",
    "options": [
      "'array' va 'object'",
      "'object' va 'object'",
      "'array' va 'array'",
      "'list' va 'dict'"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da massivlar (arrays) ham obyektlarning bir turi hisoblanadi, shuning uchun massiv va oddiy obyekt uchun `typeof` har doim 'object' qaytaradi."
  },
  {
    "id": 6,
    "question": "`typeof NaN` natijasi nima?",
    "options": [
      "'NaN'",
      "'number'",
      "'undefined'",
      "'null'"
    ],
    "correctAnswer": 1,
    "explanation": "NaN (Not-a-Number) — bu sonli ma'lumot turiga kiruvchi maxsus sonli qiymatdir, shuning uchun `typeof NaN === 'number'` bo'ladi."
  },
  {
    "id": 7,
    "question": "`typeof (() => {})` (arrow funksiya) natijasi nima?",
    "options": [
      "'object'",
      "'arrow-function'",
      "'function'",
      "'undefined'"
    ],
    "correctAnswer": 2,
    "explanation": "JavaScript-da har qanday funksiya (oddiy yoki arrow funksiyalar) uchun `typeof` har doim 'function' satrini qaytaradi."
  },
  {
    "id": 8,
    "question": "Quyidagi ifodaning natijasini toping:\n```javascript\nconsole.log(typeof Symbol('id'));\n```",
    "options": [
      "'symbol'",
      "'object'",
      "'string'",
      "'undefined'"
    ],
    "correctAnswer": 0,
    "explanation": "Symbol — bu ES6-da kiritilgan primitiv ma'lumot turi bo'lib, uning turi 'symbol' qaytadi."
  },
  {
    "id": 9,
    "question": "`typeof 10n` ifodasi nima qaytaradi?",
    "options": [
      "'number'",
      "'bigint'",
      "'int64'",
      "'object'"
    ],
    "correctAnswer": 1,
    "explanation": "Oxirida n bo'lgan sonlar BigInt turi hisoblanadi. Ular uchun `typeof` operatori 'bigint' satrini qaytaradi."
  },
  {
    "id": 10,
    "question": "Quyidagi ifoda qanday qiymat qaytaradi?\n```javascript\ntypeof undeclaredVariable;\n```\n*(Eslatma: `undeclaredVariable` o'zgaruvchisi e'lon qilinmagan)*",
    "options": [
      "ReferenceError xatosi",
      "'undefined'",
      "'null'",
      "'object'"
    ],
    "correctAnswer": 1,
    "explanation": "`typeof` e'lon qilinmagan o'zgaruvchilar uchun xatolik tashlamaydi, aksincha xavfsiz tarzda 'undefined' satrini qaytaradi. Bu typeof-ning o'ziga xos xususiyatidir."
  },
  {
    "id": 11,
    "question": "`typeof` operatori qanday sintaksis bilan ishlatilishi mumkin?",
    "options": [
      "Faqat 'typeof qiymat' (operator ko'rinishida)",
      "Faqat 'typeof(qiymat)' (funksiya ko'rinishida)",
      "Har ikkalasi ham: 'typeof qiymat' va 'typeof(qiymat)'",
      "Hech biri, typeof faqat 'typeof = qiymat' ko'rinishida yoziladi"
    ],
    "correctAnswer": 2,
    "explanation": "`typeof` funksiya emas, operator. Shuning uchun qavs ishlatish ixtiyoriydir. Qavslar faqat ifodani guruhlash uchun xizmat qiladi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log(typeof new String(\"salom\"));\n```",
    "options": [
      "'string'",
      "'object'",
      "'constructor'",
      "'function'"
    ],
    "correctAnswer": 1,
    "explanation": "new kalit so'zi yordamida yaratilgan har qanday konstruktor obyekti (masalan, new String(), new Number(), new Boolean()) aslida obyekt hisoblanadi, shuning uchun `typeof` operatori ularga 'object' qaytaradi."
  }
]

};
