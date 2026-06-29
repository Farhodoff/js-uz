export const moreDataTypesLesson = {
  id: "moreDataTypesLesson",
  title: "Ma'lumotlar Turlari: Null, Symbol, BigInt",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

JavaScript tilida ma'lumotlar turlari (Data Types) asosan ikki guruhga bo'linadi: **ibtidoiy (primitive)** va **murakkab (reference/object)** turlari. Keling, eng maxsus va ilg'or primitive turlar bo'lgan **Null**, **Symbol** va **BigInt** haqida batafsil gaplashamiz.

*   **Null:** Bu ataylab bo'shliqni, qiymatning mutlaqo yo'qligini anglatuvchi maxsus turdir.
*   **Symbol:** Obyektlar uchun mutlaqo noyob va takrorlanmas kalitlar (identifikatorlar) yaratish uchun xizmat qiladi.
*   **BigInt:** JavaScript-dagi standart \`Number\` turi sig'dira olmaydigan juda katta butun sonlar bilan ishlash uchun ishlatiladi.

### Real hayotiy o'xshatish

1.  **Null (Bo'sh quti):** Tasavvur qiling, uyingizda bitta **quti** bor. Quti ichida hech narsa yo'q va siz buni yaxshi bilasiz, chunki o'zingiz uni bo'shatib qo'ygansiz. Bu \`null\`. Agar sizda umuman quti bo'lmaganida va u haqida bilmaganingizda, bu \`undefined\` bo'lar edi.
2.  **Symbol (Barmoq izi):** Har bir insonning o'ziga xos **barmoq izi** bor. Dunyoda ikki insonning ismi bir xil bo'lishi mumkin (masalan, ikkita "Jasur"), lekin ularning barmoq izi hech qachon bir xil bo'lmaydi. \`Symbol\` — bu obyekt xossalari uchun yaratilgan o'sha takrorlanmas barmoq izidir.
3.  **BigInt (Teleskopik o'lchov):** Oddiy kundalik hayotda siz uyingizning uzunligini o'lchash uchun oddiy **metr o'lchagich** (Number) ishlatasiz. Lekin yer sharidan Quyoshgacha bo'lgan masofani hisoblash uchun sizga o'ta quvvatli **kosmik kalkulyator** (BigInt) kerak bo'ladi.

---

## 2. 💻 Real Kod Misollari

### 1. Null bilan ishlash (Qasddan bo'shliqni ifodalash)

Foydalanuvchi tizimga kirishidan oldin uning holatini \`null\` qilamiz. Bu "foydalanuvchi hali aniqlanmagan" degan ma'noni anglatadi.

\`\`\`javascript
// Foydalanuvchi hali tizimga kirmagan
let currentUser = null; 

function loginUser(user) {
  currentUser = user;
}

console.log(currentUser); // null

loginUser({ name: "Jasur", role: "Admin" });
console.log(currentUser); // { name: "Jasur", role: "Admin" }
\`\`\`

### 2. Symbol bilan ishlash (Noyob kalitlar yaratish)

\`\`\`javascript
const userIdSymbol = Symbol('userId');

const employee = {
  name: "Kamola",
  department: "HR",
  [userIdSymbol]: "EMP-9082" // Symbol yordamida yaratilgan xossa
};

// Xossaga murojaat qilish
console.log(employee[userIdSymbol]); // "EMP-9082"

// Symbol kalitlari oddiy kalitlar ro'yxatida ko'rinmaydi
console.log(Object.keys(employee)); // ["name", "department"]
console.log(JSON.stringify(employee)); // '{"name":"Kamola","department":"HR"}'
\`\`\`

### 3. BigInt bilan ishlash (Katta sonlar ustida amallar)

\`\`\`javascript
// Standart Number xatosi (2^53 - 1 limitidan oshganda):
const maxNum = Number.MAX_SAFE_INTEGER; // 9007199254740991
console.log(maxNum + 1 === maxNum + 2); // true (Bu xato! Lekin JS shunday hisoblaydi)

// BigInt yordamida to'g'ri hisoblash:
const bigNum1 = 9007199254740991n; // Oxiriga 'n' qo'shiladi
const bigNum2 = BigInt("9007199254740993");

const sum = bigNum1 + bigNum2;
console.log(sum); // 18014398509481984n
console.log(bigNum1 + 1n === bigNum1 + 2n); // false (To'g'ri hisob-kitob)
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Null nimaga kerak? Undefined bilan farqi nima?
\`undefined\` — bu o'zgaruvchi e'lon qilingan, lekin unga hali **hech qanday qiymat berilmaganligini** bildiradi. \`null\` esa dasturchi tomonidan ataylab **"bu yerda qiymat yo'q"** deb qo'yilgan qiymatdir. \`null\` xotirani bo'shatish uchun ham ishlatiladi.

### Symbol qaysi muammoni hal qiladi?
Agar siz yirik loyihalarda kutubxonalar (libraries) bilan ishlasangiz, ulardan keladigan obyektlarga qo'shimcha xossa qo'shganda, kutubxonaning ichki xossasi bilan to'qnashib (naming collision) qolmasligi uchun \`Symbol\` ishlatiladi.

### BigInt nima uchun muhim?
Bugungi kunda katta ma'lumotlar bazasi ID-lari (64-bitli ID-lar), blokcheyn tranzaksiyalari kabi hollarda \`Number\` turi (53 bitli o'lchov) aniqlikni yo'qotadi. BigInt esa istalgancha uzunlikdagi butun sonlarni xatosiz hisoblashga imkon beradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`typeof null\` natijasini noto'g'ri tekshirish
\`typeof null\` har doim \`"object"\` qaytaradi.
🔴 **YOMON:**
\`\`\`javascript
if (typeof value === "null") { ... } // Bu shart hech qachon ishlamaydi!
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
if (value === null) { ... } // To'g'ridan-to'g'ri qiymatni solishtirish kerak
\`\`\`

### 2. BigInt va Number turlarini aralashtirish
🔴 **YOMON:**
\`\`\`javascript
const total = 100n + 10; // TypeError: Cannot mix BigInt and other types
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
const total = 100n + BigInt(10); // 110n
\`\`\`

### 3. Symbol kalitlarini oddiy sikl bilan o'qishga urinish
🔴 **YOMON:**
\`\`\`javascript
const mySym = Symbol("key");
const obj = { [mySym]: "data" };
for (let key in obj) {
  console.log(key); // Symbol kalitlari ko'rinmaydi!
}
\`\`\`

🟢 **YAXSHI:**
\`\`\`javascript
const symbols = Object.getOwnPropertySymbols(obj);
console.log(symbols[0]); // Symbol(key)
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior darajasi (1-4)
1. **Savol:** \`null\` va \`undefined\` farqi nimada?
   * **Javob:** \`undefined\` — qiymat berilmaganligini anglatadi. \`null\` — dasturchi tomonidan qasddan belgilangan bo'sh qiymat.
2. **Savol:** \`typeof null\` va \`typeof undefined\` nima qaytaradi?
   * **Javob:** \`typeof null\` -> \`"object"\`. \`typeof undefined\` -> \`"undefined"\`.
3. **Savol:** Symbol qanday yaratiladi va uning xususiyati nima?
   * **Javob:** \`Symbol()\` funksiyasi orqali. Uning asosiy xususiyati mutlaqo noyobligidadir.
4. **Savol:** BigInt sonini oddiy Number sonidan qanday ajratish mumkin?
   * **Javob:** BigInt sonining oxirida \`n\` harfi bo'ladi va \`typeof\` qiymati \`"bigint"\` dir.

### Middle darajasi (5-8)
5. **Savol:** \`null == undefined\` va \`null === undefined\` natijasi nima?
   * **Javob:** \`==\` da \`true\` (tiplar avtomatik moslashtiriladi). \`===\` da \`false\` (tiplari har xil).
6. **Savol:** \`Symbol.for()\` va oddiy \`Symbol()\` farqi nimada?
   * **Javob:** \`Symbol()\` doim yangi yaratadi. \`Symbol.for(key)\` esa global reyestrdan izlaydi, topsa o'shani qaytaradi.
7. **Savol:** BigInt bilan \`Math\` obyektining metodlarini ishlatsa bo'ladimi?
   * **Javob:** Yo'q, xatolik beradi (\`TypeError\`).
8. **Savol:** Obyektdagi barcha Symbol kalitlarini qanday olish mumkin?
   * **Javob:** \`Object.getOwnPropertySymbols(obj)\` yoki \`Reflect.ownKeys(obj)\` orqali.

### Senior darajasi (9-12)
9. **Savol:** \`Symbol.iterator\` nima?
   * **Javob:** Bu tizimli Symbol bo'lib, obyektlarga \`for...of\` sikli bilan aylanish imkonini beruvchi iteratorni belgilaydi.
10. **Savol:** Nima uchun BigInt-dan ehtiyotkorlik bilan foydalanish kerak?
    * **Javob:** U protsessor emas, balki dasturiy yo'l bilan hisoblanganligi sababli sekinroq ishlaydi.
11. **Savol:** BigInt obyektini to'g'ridan-to'g'ri \`JSON.stringify\` qilib bo'ladimi?
    * **Javob:** Yo'q, xato beradi. Replacer funksiyasi yordamida stringga o'girib yuborish kerak.
12. **Savol:** Symbol bilan yaratilgan xossalar haqiqatan ham private hisoblanadimi?
    * **Javob:** Haqiqiy private emas, chunki ularga ma'lum metodlar bilan kirish mumkin. Bu asosan tasodifiy o'zgartirishlardan va nomlar to'qnashuvidan saqlaydi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyidagi sxemada oddiy va Symbol kalitlarning farqi vizual ko'rsatilgan:

\`\`\`mermaid
graph TD
    subgraph Object: user
        Prop1["user.name = 'Jasur' (String Key)"]
        Prop2["user[Symbol('secret')] = 'Pass123' (Symbol Key)"]
    end

    NormalQuery["Object.keys(user)"] -->|Sees| Prop1
    NormalQuery -.->|Cannot See| Prop2

    SymbolQuery["Object.getOwnPropertySymbols(user)"] -->|Sees| Prop2
    SymbolQuery -.->|Cannot See| Prop1

    ReflectQuery["Reflect.ownKeys(user)"] -->|Sees Both| Prop1
    ReflectQuery -->|Sees Both| Prop2
\`\`\`

---

## 7. 📝 12 ta Mini Test

Mini testlar orqali ushbu noyob ma'lumot turlarini qanchalik to'g'ri o'zlashtirganingizni sinab ko'ring.

---

## 8. 🎯 Real Project Case Study

### 64-bitli ID-lar (Snowflake ID) va BigInt
Katta tizimlarda (Twitter, Discord) identifikator sifatida 64-bitli sonlar ishlatiladi. Buni JSON parse qilganda Number turi 53-bitgacha bo'lgan sonni o'qib qolganini buzishi mumkin.
\`\`\`javascript
const rawApiResponse = '{"postId": "18451874981728374912", "likes": 250}';

const postData = JSON.parse(rawApiResponse, (key, value) => {
  if (key === 'postId') {
    return BigInt(value);
  }
  return value;
});

console.log(postData.postId); // 18451874981728374912n
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **BigInt Matematikasi:** BigInt ustida amallar Number amallariga qaraganda sekinroq. Shuning uchun faqat juda katta raqamlardagina ishlatish o'rinlidir.
* **Null tekshiruvi:** \`value === null\` JS engine larda eng tez ishlaydigan tekshiruv turlaridan biridir.
`,
  exercises: [
    {
      id: 1,
      title: "BigInt bilan Katta Sonlarni Qo'shish",
      instruction: "Katta butun sonlar (satr ko'rinishida) beriladi. `addLargeNumbers(str1, str2)` yozing va bu ikkisini BigInt ga o'girib, yig'indisini BigInt sifatida qaytaring.",
      startingCode: "function addLargeNumbers(str1, str2) {\n  // Kodni yozing\n}\n",
      hint: "BigInt(str1) + BigInt(str2)",
      test: "const fn = new Function(code + '; return addLargeNumbers;')(); const res = fn('9007199254740991', '12345678901234567890'); if (typeof res === 'bigint' && res === 12345687908433822881n) return null; return 'Xato';"
    },
    {
      id: 2,
      title: "Symbol Yordamida Maxfiy Xossa",
      instruction: "`addSecretProperty(obj, secretValue)` berilgan `obj` obyektiga yangi `Symbol` kaliti ochib, `secretValue` ni shu kalitga yozsin va yaratilgan `Symbol`ni qaytarsin.",
      startingCode: "function addSecretProperty(obj, secretValue) {\n  // Kodni yozing\n}\n",
      hint: "const key = Symbol(); obj[key] = secretValue; return key;",
      test: "const fn = new Function(code + '; return addSecretProperty;')(); const obj = {a:1}; const sym = fn(obj, 'sir'); if(typeof sym !== 'symbol' || obj[sym] !== 'sir' || Object.keys(obj).includes(sym)) return 'Xato'; return null;"
    },
    {
      id: 3,
      title: "Null/Undefined ni tekshirish",
      instruction: "`validateSession(session)`: agar `session` `null` yoki `undefined` bo'lsa `'No active session'` qaytarsin. Agar mavjud bo'lsa `session.username` ni, agar u ham bo'lmasa `'Anonymous'` ni qaytarsin.",
      startingCode: "function validateSession(session) {\n  // Kodni yozing\n}\n",
      hint: "if(session == null) ishlatishingiz mumkin.",
      test: "const fn = new Function(code + '; return validateSession;')(); if (fn(null) !== 'No active session' || fn({age: 2}) !== 'Anonymous' || fn({username:'Ali'}) !== 'Ali') return 'Xato'; return null;"
    },
    {
      id: 4,
      title: "Global Symbol qaytarish",
      instruction: "`getGlobalSymbol(keyStr)` funksiyasini yozing, u global Symbol reyestridan (`Symbol.for()`) berilgan `keyStr` yordamida Symbol topib (yoki yaratib) qaytarsin.",
      startingCode: "function getGlobalSymbol(keyStr) {\n  // Kodni yozing\n}\n",
      hint: "return Symbol.for(keyStr);",
      test: "const fn = new Function(code + '; return getGlobalSymbol;')(); if(fn('test') !== Symbol.for('test')) return 'Global symbol emas'; return null;"
    },
    {
      id: 5,
      title: "BigInt-larni ko'paytirish",
      instruction: "`multiplyBig(n1, n2)` oddiy Number qabul qiladi. Ularni BigInt ga o'tkazib ko'paytiring va natijani **string** sifatida qaytaring (`toString()` yordamida).",
      startingCode: "function multiplyBig(n1, n2) {\n  // Kodni yozing\n}\n",
      hint: "(BigInt(n1) * BigInt(n2)).toString()",
      test: "const fn = new Function(code + '; return multiplyBig;')(); if(fn(100,200) !== '20000') return 'Xato'; return null;"
    },
    {
      id: 6,
      title: "JSON BigInt xatoligini chetlab o'tish",
      instruction: "`stringifyBigInt(obj)` funksiyasi ichida BigInt bor obyektni string ga o'girishi kerak. Buning uchun `JSON.stringify` ichida replacer (2-chi argument) dan foydalaning, tipi bigint bo'lsa uni string ga aylantiring.",
      startingCode: "function stringifyBigInt(obj) {\n  // Kodni yozing\n}\n",
      hint: "JSON.stringify(obj, (key, val) => typeof val === 'bigint' ? val.toString() : val)",
      test: "const fn = new Function(code + '; return stringifyBigInt;')(); const res = fn({a: 10n}); if(res !== '{\"a\":\"10\"}') return 'Xato stringify qilingan'; return null;"
    },
    {
      id: 7,
      title: "Objectdagi barcha Symbollarni olish",
      instruction: "Obyekt qabul qilib, uning ichidagi barcha **Symbol kalitlari massivini** qaytaruvchi `getSymbols(obj)` yozing.",
      startingCode: "function getSymbols(obj) {\n  // Kodni yozing\n}\n",
      hint: "Object.getOwnPropertySymbols(obj) ni qaytaring.",
      test: "const fn = new Function(code + '; return getSymbols;')(); const obj = {[Symbol('a')]: 1, [Symbol('b')]: 2}; if(fn(obj).length !== 2) return 'Xato'; return null;"
    },
    {
      id: 8,
      title: "Nullni Obyektdan tozalash",
      instruction: "Faqat qiymati `null` bo'lgan xossalarni obyektdan o'chirib tashlaydigan va yangi obyekt qaytaradigan `removeNulls(obj)` yozing.",
      startingCode: "function removeNulls(obj) {\n  // Kodni yozing\n}\n",
      hint: "Obyekt kalitlarini aylanib chiqib obj[key] === null bo'lsa uni olmang.",
      test: "const fn = new Function(code + '; return removeNulls;')(); const res = fn({a: 1, b: null, c: 3}); if(res.b !== undefined || res.a !== 1) return 'Xato'; return null;"
    },
    {
      id: 9,
      title: "BigInt kattaligini tekshirish",
      instruction: "Ikki son (Number turi) berilgan: ularni BigInt ga o'tkazib qaysi biri kattaligini tekshiring. 1-si katta bo'lsa `true`, aks holda `false` qaytsin: `isFirstBig(n1, n2)`.",
      startingCode: "function isFirstBig(n1, n2) {\n  // Kodni yozing\n}\n",
      hint: "BigInt(n1) > BigInt(n2)",
      test: "const fn = new Function(code + '; return isFirstBig;')(); if(fn(10, 5) !== true || fn(3,4) !== false) return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "Numberni tekshirish xatoligi",
      instruction: "Bir xil musbat `Number.MAX_SAFE_INTEGER` ga 1 va 2 qo'shib ularni BigIntlarsiz taqqoslaydigan (standard ishlamasligini ko'rsatadigan) `unsafeCompare()` yozing. U shunchaki `(Number.MAX_SAFE_INTEGER + 1) === (Number.MAX_SAFE_INTEGER + 2)` natijasini qaytarsin.",
      startingCode: "function unsafeCompare() {\n  // Kodni yozing\n}\n",
      hint: "Yozilgan ifodani return qiling.",
      test: "const fn = new Function(code + '; return unsafeCompare;')(); if(fn() !== true) return 'true qaytishi kerak edi'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`null` nima?",
      options: [
        "Qiymat berilmagan o'zgaruvchi holati",
        "Dasturchi tomonidan qasddan belgilangan bo'sh yoki mavjud bo'lmagan qiymat",
        "Xatolik yuz berganda qaytadigan maxsus obyekt",
        "O'zgarmas kalit"
      ],
      correctAnswer: 1,
      explanation: "null ataylab bo'sh qiymat berish uchun ishlatiladi."
    },
    {
      id: 2,
      question: "`typeof null` JavaScript-da nima qaytaradi?",
      options: [
        "\"null\"",
        "\"undefined\"",
        "\"object\"",
        "\"symbol\""
      ],
      correctAnswer: 2,
      explanation: "Bu JavaScript ning mashhur tarixiy bug-i, `typeof null === 'object'` qaytadi."
    },
    {
      id: 3,
      question: "`null == undefined` va `null === undefined` natijalari qanday bo'ladi?",
      options: [
        "`true` va `false`",
        "`false` va `true`",
        "`true` va `true`",
        "`false` va `false`"
      ],
      correctAnswer: 0,
      explanation: "Nomuhim tenglik (==) true beradi, qat'iy tenglik (===) tiplari xar xil bo'lgani uchun false beradi."
    },
    {
      id: 4,
      question: "`Symbol`ning eng asosiy xususiyati nimadan iborat?",
      options: [
        "U sonlarni butun songa o'tkazadi",
        "U mutlaqo noyob (unique) va o'zgarmas qiymat hisoblanadi",
        "Faqat satrlar bilan ishlaydi",
        "Xotirani avtomatik tozalaydi"
      ],
      correctAnswer: 1,
      explanation: "Symbol() har gal yangi va mutlaqo noyob ID (barmoq izi) qaytaradi."
    },
    {
      id: 5,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconst sym1 = Symbol('maxfiy');\nconst sym2 = Symbol('maxfiy');\nconsole.log(sym1 === sym2);\n```",
      options: [
        "`true`",
        "`false`",
        "`undefined`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "Tavsifi bir xil bo'lsa ham ularning o'zi xotirada noyobdir, shuning uchun false chiqadi."
    },
    {
      id: 6,
      question: "Obyekt kaliti sifatida Symbol ishlatilganda, uni oddiy `for...in` sikli yordamida o'qish mumkinmi?",
      options: [
        "Ha, barchasi bir xil o'qiladi",
        "Yo'q, Symbol kalitlari yashirin qoladi",
        "Faqat `Symbol.for()` orqali yaratilgan bo'lsa",
        "Faqat 'use strict' bo'lmasa o'qiladi"
      ],
      correctAnswer: 1,
      explanation: "Symbol kalitlar Object.keys va for...in kabi standart sikllardan yashirin hisoblanadi."
    },
    {
      id: 7,
      question: "Global darajada ro'yxatdan o'tgan Symbol yaratadigan metod qaysi?",
      options: [
        "`Symbol.create()`",
        "`Symbol.for()`",
        "`Symbol.keyFor()`",
        "`Symbol.global()`"
      ],
      correctAnswer: 1,
      explanation: "`Symbol.for(key)` orqali global reyestrdan qidiriladi, topilmasa yaratiladi."
    },
    {
      id: 8,
      question: "BigInt nima uchun ishlatiladi?",
      options: [
        "Mikroskopik kasr sonlar bilan ishlash uchun",
        "Standart `Number` turi sig'dira olmaydigan juda katta butun sonlar uchun",
        "Obyektni klonlash uchun",
        "16-lik sanoq tizimiga o'girish uchun"
      ],
      correctAnswer: 1,
      explanation: "64 bitdan katta butun sonlar bilan ishlash va ma'lumotlar yo'qolmasligi uchun."
    },
    {
      id: 9,
      question: "Quyidagi kod natijasi?\n```javascript\nconst result = 10n + 5;\n```",
      options: [
        "`15n`",
        "`15`",
        "`TypeError`",
        "`NaN`"
      ],
      correctAnswer: 2,
      explanation: "BigInt va Number tiplarini to'g'ridan-to'g'ri qo'shish mumkin emas."
    },
    {
      id: 10,
      question: "BigInt qiymatini qanday e'lon qilish mumkin?",
      options: [
        "Son oxiriga `b` harfini qo'shish orqali",
        "Son oxiriga `n` harfini qo'shish yoki `BigInt()` orqali",
        "Son boshiga `#` qo'yib",
        "`new BigInt()` orqali"
      ],
      correctAnswer: 1,
      explanation: "Masalan `10n` yoki `BigInt(10)` orqali yoziladi."
    },
    {
      id: 11,
      question: "BigInt bilan qaysi metodlarni ishlatib bo'lmaydi?",
      options: [
        "`console.log()`",
        "`.toString()`",
        "`Math` obyektining metodlarini",
        "Solishtirish operatorlarini (`>`, `<`)"
      ],
      correctAnswer: 2,
      explanation: "`Math` metodlari BigInt qiymatlar bilan ishlay olmaydi."
    },
    {
      id: 12,
      question: "Nima uchun BigInt ni to'g'ridan-to'g'ri `JSON.stringify()` qilib bo'lmaydi?",
      options: [
        "JSON standarti BigInt ni qo'llab-quvvatlamaydi",
        "U faqat brauzerda ishlaydi",
        "JSON faqat obyektlar bilan ishlaydi",
        "BigInt tez o'zgaruvchan qiymat bo'lgani uchun"
      ],
      correctAnswer: 0,
      explanation: "JSON standarti faqat Number tipiga ega. Shuning uchun string ga o'girish kerak."
    }
  ]
};
