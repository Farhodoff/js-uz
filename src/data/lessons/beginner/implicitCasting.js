export const implicitCasting = {
  id: "implicitCasting",
  title: "Implicit Type Casting",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Implicit Type Casting (Yashirin Type Casting / Coercion) nima?
* **Implicit Type Casting:** JavaScript dasturlash tilining o'zgaruvchilar bilan ishlashda bir ma'lumot turini boshqasiga avtomatik ravishda (dasturchining ishtirokisiz) o'tkazish xususiyatidir. Bunga ko'pincha **Type Coercion** ham deyiladi.
* **Explicit Type Casting:** Dasturchi tomonidan funksiyalar yordamida (masalan, \`Number()\`, \`String()\`) tiplarni qo'lda o'zgartirish.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **xorijiy davlatdagi kafedasiz**:
* Kassir faqat **milliy valyutani (so'mni)** qabul qiladi.
* Siz esa unga **dollar** uzatasiz.
* Diler (JS dvigateli) kassir va sizning o'rtangizga kirib, dollar qiymatini avtomatik tarzda kurs bo'yicha so'mga aylantiradi va savdoni davom ettiradi. Siz o'zingiz bankka borib pul almashtirib kelmadingiz (explicit emas), hammasi yashirincha orqa fonda sodir bo'ldi (implicit).

Xuddi shunday, JavaScript ham \`"5" - 2\` amalini bajarganda, ayirish faqat sonlar o'rtasida bo'lishi mumkinligini tushunib, \`"5"\` matnini yashirin tarzda \`5\` soniga aylantirib yuboradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Plyus va Minus operatorlari farqi)
Plyus operatori matnlarni birlashtirishga, minus esa matematik hisobga moyil:
\`\`\`javascript
// Plyus (+) operatori: string ustunlik qiladi
const result1 = "5" + 2; 
console.log(result1); // "52" (String)

// Minus (-) operatori: son ustunlik qiladi
const result2 = "5" - 2; 
console.log(result2); // 3 (Number)
\`\`\`

### 2. Intermediate Example (Boolean va Null qiymatlarning aylanishi)
Matematik amallarda mantiqiy qiymatlar va \`null\` son sifatida talqin qilinadi:
\`\`\`javascript
// true -> 1, false -> 0 ga aylanadi
console.log(true + 5);     // 6 (1 + 5)
console.log(false + 10);   // 10 (0 + 10)

// null -> 0 ga aylanadi
console.log(null + 7);     // 7 (0 + 7)

// undefined -> NaN ga aylanadi
console.log(undefined + 5); // NaN
\`\`\`

### 3. Advanced Example (Obyektlarni Primitive tipga o'tkazish)
Obyekt yoki massivlarni boshqa qiymatlar bilan aralashtirganda kutilmagan natijalar chiqadi:
\`\`\`javascript
// Massivlar default holda bo'sh string bo'lib ToPrimitive-dan o'tadi
console.log([] + []); // "" (bo'sh string)

// Massiv va obyekt qo'shilganda
console.log([] + {}); // "[object Object]" (chunki [] -> "" va {} -> "[object Object]")

// Loose equality (==) taqqoslashda coercion
console.log([] == false); // true
// Nega? [] -> "" -> 0 va false -> 0. Shuning uchun 0 == 0 -> true bo'ladi.
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### ECMAScript Abstract Operations
JavaScript dvigateli tiplarni yashirin o'zgartirishda ichki (abstract) operatsiyalardan foydalanadi:
1. **\`ToPrimitive(input, PreferredType)\`:** Obyekt turidagi qiymatlarni oddiy (primitive) qiymatga aylantiradi.
2. **\`ToNumber(input)\`:** Qiymatni son tipiga o'tkazadi. Masalan, \`"123"\` -> \`123\`, \`true\` -> \`1\`, \`false\` -> \`0\`, \`null\` -> \`0\`, \`undefined\` -> \`NaN\`.
3. **\`ToString(input)\`:** Qiymatni string tipiga o'tkazadi.
4. **\`ToBoolean(input)\`:** Qiymatni boolean holatiga o'tkazadi.

> [!IMPORTANT]
> **Falsy qiymatlar ro'yxati:**
> \`false\`, \`0\`, \`-0\`, \`0n\`, \`""\` (bo'sh string), \`null\`, \`undefined\`, \`NaN\`.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Loose Equality (\`==\`) operatoridan foydalanish
* **YOMON:**
  \`\`\`javascript
  const count = "";
  if (count == 0) {
    console.log("Nolga teng!"); // count "" dan 0 ga aylanadi
  }
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  const count = "";
  if (count === 0) {
    console.log("Nolga teng!"); // Ishga tushmaydi
  }
  \`\`\`

### 2. Forma (Input) ma'lumotlarini to'g'ridan-to'g'ri hisoblash
* **YOMON:**
  \`\`\`javascript
  const ageInput = "25";
  const nextYearAge = ageInput + 1; // "251"
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  const ageInput = "25";
  const nextYearAge = Number(ageInput) + 1; // 26
  \`\`\`

### 3. \`undefined\` o'zgaruvchi bilan matematik amallar
* **YOMON:**
  \`\`\`javascript
  let total; // undefined
  total += 10; // NaN
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  let total = 0;
  total += 10; // 10
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Implicit type casting nima?
   * **Javob:** JS operatorlar yordamida tiplarni avtomatik o'tkazishi.
2. **Savol:** \`"5" + 3\` va \`"5" - 3\` natijasi nima?
   * **Javob:** "53" va 2.
3. **Savol:** Falsy qiymatlar qaysilar?
   * **Javob:** \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`.
4. **Savol:** \`==\` va \`===\` farqi?
   * **Javob:** \`==\` casting qiladi, \`===\` qilmaydi.

### Middle
5. **Savol:** \`[] == false\` nega \`true\` qaytaradi?
   * **Javob:** Ikkalasi ham \`0\` raqamiga aylanadi.
6. **Savol:** \`null == undefined\` nima?
   * **Javob:** \`true\`, lekin qat'iy tekshiruvda \`false\`.
7. **Savol:** \`NaN == NaN\` nega \`false\`?
   * **Javob:** Standart bo'yicha NaN o'ziga teng emas.
8. **Savol:** \`+[]\` va \`+{}\` nimaga aylanadi?
   * **Javob:** \`+[]\` = 0, \`+{}\` = NaN.

### Senior
9. **Savol:** \`[Symbol.toPrimitive]\` nima?
   * **Javob:** Obyektlarni primitivga o'tkazishni boshqaradigan maxsus metod.
10. **Savol:** \`{} + []\` va \`[] + {}\` farqi?
    * **Javob:** Konsolda biri blok deb o'qilib \`0\` qaytarishi mumkin, ikkinchisi \`"[object Object]"\`.
11. **Savol:** object va primitive taqqoslansa nima bo'ladi?
    * **Javob:** Obyekt \`valueOf\` yoki \`toString\` orqali primitivga o'tadi.
12. **Savol:** Nega implicit casting'dan qochish kerak?
    * **Javob:** Kodni o'qishni qiyinlashtirib, bug'lar olib keladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    Operator{"Operator turi?"}
    Operator -->|"+"| PlusOp{"+ Operandi stringmi?"}
    Operator -->|"-, *, /, %"| MathOp["Barchasi songa o'tadi"]
    PlusOp -->|Ha| Concat["String Concatenation"]
    PlusOp -->|Yo'q| Add["Number Addition"]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Testlar pastroqda e'lon qilingan.

---

## 8. 🎯 Real Project Case Study

### URL Query parametrlari bilan hisoblash
\`\`\`javascript
const queryParams = { page: "2" };
const nextPage = Number(queryParams.page) + 1; // 3
\`\`\`

---

## 9. 🚀 Performance va Optimization
Explicit o'tkazish (masalan \`Number()\`) dvigatel uchun implicit ga qaraganda tezroq hisoblanadi.

---

## 10. 📌 Cheat Sheet
| Amal | Qanday | Natija |
| :--- | :--- | :--- |
| \`any + string\` | Barcha string bo'ladi | \`"value" + "string"\` |
| \`any - number\` | Barchasi songa o'tadi | Son yoki \`NaN\` |
`,
  exercises: [
    {
      "id": 1,
      "title": "Songa majburiy o'tkazish (Safe Addition)",
      "instruction": "Ikkita parametr qabul qiladigan `safeAdd(val1, val2)` funksiyasi yozing. Unar `+` yordamida ularni songa o'tkazib qo'shing.",
      "startingCode": "function safeAdd(val1, val2) {\n  // Kodni yozing\n}",
      "hint": "return +val1 + +val2;",
      "test": "const fn = new Function(code + '; return safeAdd;')(); if(fn('5', '10') === 15) return null; return 'Xato';"
    },
    {
      "id": 2,
      "title": "Falsy qiymatlarni inkor qilish",
      "instruction": "Istalgan qiymatni mantiqiy inkor `!` bilan tekshiradigan `isFalsy(value)` yozing.",
      "startingCode": "function isFalsy(value) {\n  // Kodni yozing\n}",
      "hint": "return !value;",
      "test": "const fn = new Function(code + '; return isFalsy;')(); if(fn('') === true && fn(5) === false) return null; return 'Xato';"
    },
    {
      "id": 3,
      "title": "Massiv elementlarini songa o'tkazib yig'ish",
      "instruction": "Massivdagi hamma elementni songa (unar `+`) o'tkazib yig'uvchi `sumCoerced(arr)` tuzing. NaN bo'lsa 0 deb hisoblang.",
      "startingCode": "function sumCoerced(arr) {\n  // Kodni yozing\n}",
      "hint": "reduce va isNaN ishlating.",
      "test": "const fn = new Function(code + '; return sumCoerced;')(); if(fn([1, '2', 'abc']) === 3) return null; return 'Xato';"
    },
    {
      "id": 4,
      "title": "Implicit ayirish",
      "instruction": "`subtractStr(str1, str2)` yozingki, u shunchaki `-` ishlatsin (casting bo'ladi) va qaytarsin.",
      "startingCode": "function subtractStr(str1, str2) {\n  // Kodni yozing\n}",
      "hint": "return str1 - str2;",
      "test": "const fn = new Function(code + '; return subtractStr;')(); if(fn('10', '3') === 7) return null; return 'Xato';"
    },
    {
      "id": 5,
      "title": "Bo'sh massiv casting",
      "instruction": "`checkArray(arr)` funksiyasida `arr == false` ni qaytaring (bo'sh massiv uchun u implicit tarzda nima qaytaradi ko'ramiz).",
      "startingCode": "function checkArray(arr) {\n  // Kodni yozing\n}",
      "hint": "return arr == false;",
      "test": "const fn = new Function(code + '; return checkArray;')(); if(fn([]) === true) return null; return 'Xato';"
    },
    {
      "id": 6,
      "title": "Booleans qoshish",
      "instruction": "`addBooleans(b1, b2)` 2 ta boolean qiymatini yig'ib qaytarsin (implicit coercion bilan 1 va 0 ga aylanadi).",
      "startingCode": "function addBooleans(b1, b2) {\n  // Kodni yozing\n}",
      "hint": "return b1 + b2;",
      "test": "const fn = new Function(code + '; return addBooleans;')(); if(fn(true, false) === 1 && fn(true, true) === 2) return null; return 'Xato';"
    },
    {
      "id": 7,
      "title": "Ikki marta inkor (!!)",
      "instruction": "Qiymatni sof boolean holatiga o'tkazuvchi `toBool(val)` yozing. `!!` ishlating.",
      "startingCode": "function toBool(val) {\n  // Kodni yozing\n}",
      "hint": "return !!val;",
      "test": "const fn = new Function(code + '; return toBool;')(); if(fn('hello') === true && fn(0) === false) return null; return 'Xato';"
    },
    {
      "id": 8,
      "title": "Null va matematik amal",
      "instruction": "`addNull(val)` ga 5 raqamini va kiritilgan val (agar null bo'lsa) ni oddiy `+` qilib yig'ing.",
      "startingCode": "function addNull(val) {\n  // Kodni yozing\n}",
      "hint": "return val + 5;",
      "test": "const fn = new Function(code + '; return addNull;')(); if(fn(null) === 5) return null; return 'Xato';"
    },
    {
      "id": 9,
      "title": "Undefined va NaN",
      "instruction": "`addUndefined()` funksiyasi `undefined + 10` amalini bajarsin va qaytarsin. U `NaN` chiqishi kutiladi.",
      "startingCode": "function addUndefined() {\n  // Kodni yozing\n}",
      "hint": "return undefined + 10;",
      "test": "const fn = new Function(code + '; return addUndefined;')(); if(isNaN(fn())) return null; return 'Xato';"
    },
    {
      "id": 10,
      "title": "Strict va Loose taqqoslash",
      "instruction": "`compareObj(obj)` da obyektni string \"[object Object]\" ga yumshoq (loose) teng bo'lsa `true` qaytarsin.",
      "startingCode": "function compareObj(obj) {\n  // Kodni yozing\n}",
      "hint": "return obj == \"[object Object]\";",
      "test": "const fn = new Function(code + '; return compareObj;')(); if(fn({}) === true) return null; return 'Xato';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nconsole.log('5' + 2);\\n```",
      "options": ["7", "\"52\"", "NaN", "TypeError"],
      "correctAnswer": 1,
      "explanation": "Plyus operatori stringni birlashtiradi."
    },
    {
      "id": 2,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nconsole.log('5' - 2);\\n```",
      "options": ["3", "\"3\"", "\"52\"", "NaN"],
      "correctAnswer": 0,
      "explanation": "Minus faqat sonlar bilan ishlaydi."
    },
    {
      "id": 3,
      "question": "Natija?\\n```javascript\\nconsole.log(true + true + '5');\\n```",
      "options": ["\"truetrue5\"", "\"25\"", "\"7\"", "NaN"],
      "correctAnswer": 1,
      "explanation": "1 + 1 = 2, so'ngra '2' + '5' = '25'."
    },
    {
      "id": 4,
      "question": "Natija?\\n```javascript\\nconsole.log(null + 10);\\n```",
      "options": ["\"null10\"", "10", "NaN", "TypeError"],
      "correctAnswer": 1,
      "explanation": "null son bo'lganda 0 ga aylanadi."
    },
    {
      "id": 5,
      "question": "Natija?\\n```javascript\\nconsole.log(undefined + 5);\\n```",
      "options": ["\"undefined5\"", "5", "NaN", "TypeError"],
      "correctAnswer": 2,
      "explanation": "undefined math-da NaN."
    },
    {
      "id": 6,
      "question": "Qaysi biri true?\\n```javascript\\n[] == false\\n```",
      "options": ["[] == false", "null == false", "undefined == false", "\"\" == undefined"],
      "correctAnswer": 0,
      "explanation": "[] -> '' -> 0, false -> 0."
    },
    {
      "id": 7,
      "question": "Natija?\\n```javascript\\nconsole.log(+'');\\n```",
      "options": ["0", "NaN", "undefined", "TypeError"],
      "correctAnswer": 0,
      "explanation": "Bo'sh string unar plyus bilan 0."
    },
    {
      "id": 8,
      "question": "Qaysi biri false?",
      "options": ["'5' == 5", "null == undefined", "NaN == NaN", "0 == \"\""],
      "correctAnswer": 2,
      "explanation": "NaN o'ziga teng emas."
    },
    {
      "id": 9,
      "question": "Natija?\\n```javascript\\nconsole.log('10' / '2');\\n```",
      "options": ["\"102\"", "5", "\"5\"", "NaN"],
      "correctAnswer": 1,
      "explanation": "Bo'lish faqat son bilan ishlaydi."
    },
    {
      "id": 10,
      "question": "Natija?\\n```javascript\\nconsole.log(![]);\\n```",
      "options": ["true", "false", "[]", "TypeError"],
      "correctAnswer": 1,
      "explanation": "Massiv truthy, inkor false."
    },
    {
      "id": 11,
      "question": "Natija?\\n```javascript\\nconsole.log([] + []);\\n```",
      "options": ["[]", "\"\"", "0", "NaN"],
      "correctAnswer": 1,
      "explanation": "Massivlar bo'sh satrga o'tadi."
    },
    {
      "id": 12,
      "question": "ToPrimitive dagi metodlar tartibi?",
      "options": ["[Symbol.toPrimitive], valueOf, toString", "JSON.stringify", "Object.keys", "constructor"],
      "correctAnswer": 0,
      "explanation": "JavaScript шу tartibda tekshiradi."
    }
  ]
};
