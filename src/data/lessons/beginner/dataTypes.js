export const dataTypesLesson = {
  id: "dataTypesLesson",
  title: "Ma'lumotlar Turlari (Data Types)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Ma'lumotlar turlari (Data Types) nima?
JavaScript-da har bir o'zgaruvchi ma'lum bir qiymatni o'zida saqlaydi va bu qiymat o'ziga xos turga (tardagi ma'lumotga) ega bo'ladi. JavaScript-da ma'lumotlar turlari ikki guruhga bo'linadi:
1. **Primitive (Oddiy) turlar:** Qiymatlari oddiy va o'zgarmas (immutable) bo'lgan turlardir. Ular xotiraning **Stack** qismida saqlanadi.
2. **Reference (Havola) turlar:** Murakkabroq ma'lumotlar (obyektlar, massivlar, funksiyalar) bo'lib, ularning hajmi va tarkibi o'zgarishi mumkin (mutable). Ular xotiraning **Heap** qismida saqlanadi, Stack-da esa faqat ularga ko'rsatib turuvchi havola (manzil) joylashadi.

---

### Real hayotiy o'xshatish

* **Primitive type (Qiymat bo'yicha nusxalash) — Naqd pul:**
  Tasavvur qiling, sizda 100 ming so'mlik banknota bor (\`let a = 100000\`). Siz do'stingizga xuddi shunday 100 ming so'mlik boshqa banknotani berdingiz (\`let b = a\`). Endi do'stingiz o'zidagi pulni sarflasa yoki ustiga yozsa ham, sizning hamyoningizdagi banknota o'zgarmaydi. Ular bir-biridan mustaqil (copy by value).

* **Reference type (Havola bo'yicha nusxalash) — Seyf kaliti:**
  Tasavvur qiling, sizda qimmatbaho buyumlar saqlanadigan bitta seyf (Heap-dagi obyekt) bor va uning kaliti sizda turibdi (\`let key1 = '#123'\`). Siz do'stingizga xuddi shu kalitning nusxasini berdingiz (\`let key2 = key1\`). Endi do'stingiz o'z kaliti bilan seyfni ochib, ichidagi narsalarni o'zgartirsa (masalan, pul qo'shsa yoki olsa), siz o'z kalitingiz bilan ochganingizda ham o'sha o'zgarishlarni ko'rasiz, chunki seyf bitta, unga olib boruvchi kalitlar (havolalar) esa ikkita.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Primitive turlar — Qiymat bo'yicha nusxalash)
\\\`\\\`\\\`javascript
let num1 = 50;
let num2 = num1; // Qiymat nusxalandi (50 alohida joyga yozildi)

num2 = 100; // num2 o'zgardi, num1 ga ta'siri yo'q

console.log(num1); // 50
console.log(num2); // 100
\\\`\\\`\\\`

### 2. Intermediate Example (Reference turlar — Havola bo'yicha nusxalash)
\\\`\\\`\\\`javascript
const user1 = { name: "Sardor", age: 22 };
const user2 = user1; // Obyekt emas, uning xotiradagi manzili nusxalandi

user2.name = "Rustam"; // user2 orqali obyekt ichidagi qiymat o'zgartirildi

console.log(user1.name); // "Rustam" (user1 ham o'zgardi!)
console.log(user1 === user2); // true (ikkalasi ham bitta obyektga ko'rsatmoqda)
\\\`\\\`\\\`

### 3. Advanced Example (Symbol va BigInt)
* **Symbol** — mutlaqo unikal kalitlar yaratish uchun ishlatiladi:
\\\`\\\`\\\`javascript
const id1 = Symbol("user_id");
const id2 = Symbol("user_id");

console.log(id1 === id2); // false (tavsifi bir xil bo'lsa ham, ular mutlaqo boshqa-boshqa)

const appUser = {
  [id1]: 101, // obyektning yashirin/unikal xususiyati sifatida
  name: "Jasur"
};
console.log(appUser[id1]); // 101
\\\`\\\`\\\`

* **BigInt** — xavfsiz butun son chegarasidan (\`Number.MAX_SAFE_INTEGER\`) katta sonlar uchun:
\\\`\\\`\\\`javascript
const normalNumber = 9007199254740991; // Chegara son
console.log(normalNumber + 1); // 9007199254740992
console.log(normalNumber + 2); // 9007199254740992 (Xato! Aniqlik yo'qoldi)

// BigInt ishlatilishi:
const bigIntNum = 9007199254740991n; // oxiriga 'n' qo'yiladi
console.log(bigIntNum + 1n); // 9007199254740992n
console.log(bigIntNum + 2n); // 9007199254740993n (Aniq va to'g'ri!)
\\\`\\\`\\\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi va nima uchun buni bilish shart?
1. **Unutilmagan mutatsiyalar (Bugs):** Agar reference turlarning nusxalanish mexanizmini tushunmasangiz, React yoki Redux kabi holat (state) boshqaruv tizimlarida kutilmagan xatolarga duch kelasiz. Masalan, obyektni to'g'ridan-to'g'ri o'zgartirsangiz, React state o'zgarganini sezmaydi (chunki havola manzili o'zgarmagan bo'ladi) va sahifani qayta render qilmaydi.
2. **Xotirani samarali boshqarish:** Stack va Heap xotiralarining ishlash tezligi har xil. Stack xotirasi juda tez ishlaydi va uning o'lchami cheklangan. Heap esa katta hajmdagi dinamik ma'lumotlarni saqlaydi. Dasturingiz xotiradan to'g'ri foydalanishi va "memory leak" (xotira oqib ketishi) sodir bo'lmasligi uchun havolalarni vaqtida o'chirish muhimdir.

---

## 4. ❌ YOMON va ✅ YAXSHI Misollar (Ko'p Uchraydigan Xatolar)

### 1. Obyektlarni shunchaki \`=\` yordamida nusxalash
❌ **YOMON (Original ham o'zgaradi):**
\\\`\\\`\\\`javascript
const original = { score: 10 };
const copy = original;
copy.score = 99; // Xato! original.score ham 99 bo'lib qoladi
\\\`\\\`\\\`

✅ **YAXSHI (Sayoz nusxa - Shallow copy olish):**
\\\`\\\`\\\`javascript
const original = { score: 10 };
const copy = { ...original }; // Spread operator yordamida yangi obyekt yaratish
copy.score = 99; // Endi original o'zgarmaydi
\\\`\\\`\\\`

### 2. \`null\` qiymatining turini tekshirish
❌ **YOMON:**
\\\`\\\`\\\`javascript
let value = null;
if (typeof value === "object") {
  // typeof null qadimgi xato sababli "object" qaytaradi
  // Bu yerga null bo'lsa ham kirib ketadi!
  console.log(value.name); // Xatolik! TypeError!
}
\\\`\\\`\\\`

✅ **YAXSHI:**
\\\`\\\`\\\`javascript
let value = null;
if (value !== null && typeof value === "object") {
  console.log(value.name); // Xavfsiz
}
\\\`\\\`\\\`

---

## 5. 📊 Mermaid Diagrammasi

Primitive va Reference turlar xotirada qanday joylashishini quyidagi sxemada ko'rib chiqing:

\\\`\\\`\\\`mermaid
graph TD
    subgraph Stack [Stack Memory - Tezkor va Cheklangan]
        style Stack fill:#e6f7ff,stroke:#1890ff,stroke-width:2px
        numA["let a = 10 (Primitive)"]
        numB["let b = a (Qiymat nusxalandi: 10)"]
        refObj1["let obj1 = #500 (Havola)"]
        refObj2["let obj2 = obj1 (Havola nusxalandi: #500)"]
    end

    subgraph Heap [Heap Memory - Dinamik va Katta]
        style Heap fill:#fff7e6,stroke:#ffa940,stroke-width:2px
        heapData["Manzil #500: { name: 'Ali' }"]
    end

    refObj1 -.->|Ko'rsatadi| heapData
    refObj2 -.->|Ko'rsatadi| heapData
\\\`\\\`\\\`

---

## 6. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** JavaScript-da nechta ma'lumot turi bor?
   **Javob:** 8 ta: String, Number, Boolean, Null, Undefined, Symbol, BigInt (bular primitive) va Object (reference).
2. **Savol:** Primitive va Reference turlarning farqi nimada?
   **Javob:** Primitive turlar qiymat bo'yicha nusxalanadi va Stack-da saqlanadi (o'zgarmas). Reference turlar esa havola (manzil) bo'yicha nusxalanadi va Heap xotirada saqlanadi (mutable).
3. **Savol:** Nima uchun \`typeof null\` natijasi \`'object'\` chiqadi?
   **Javob:** Bu JavaScript tilining birinchi versiyalaridan qolib ketgan tarixiy xato (bug) bo'lib, orqaga moslik buzilmasligi uchun tuzatilmagan.
4. **Savol:** \`undefined\` va \`null\` orasidagi farq nima?
   **Javob:** \`undefined\` - o'zgaruvchi e'lon qilingan ammo qiymat berilmaganligini anglatadi. \`null\` esa ataylab qiymat yo'qligini bildirish uchun beriladi.

### Middle (5–8)
5. **Savol:** \`Symbol\` nima va u qayerda qo'llaniladi?
   **Javob:** Symbol mutlaqo takrorlanmas unikal identifikator yaratadi. U obyektlarda nomlar to'qnashuvining oldini olish uchun yashirin kalitlar sifatida ishlatiladi.
6. **Savol:** \`Number\` turi bilan qanday muammo bor va \`BigInt\` uni qanday hal qiladi?
   **Javob:** \`Number\` 64-bitli float bo'lgani uchun 2^53 - 1 dan katta sonlarda aniqlikni yo'qotadi. \`BigInt\` esa xohlagancha katta butun sonlar ustida to'g'ri ishlashni ta'minlaydi.
7. **Savol:** Obyektlarni chuqur nusxalash (Deep Copy) uchun qaysi zamonaviy usuldan foydalanamiz?
   **Javob:** Zamonaviy JavaScript-da \`structuredClone(obj)\` funksiyasi ishlatiladi.
8. **Savol:** \`Object.freeze()\` qilingan obyekt mutlaqo o'zgarmasmi?
   **Javob:** Faqat birinchi qavati o'zgarmas (shallow freeze). Ichki obyektlar hamon o'zgartirilishi mumkin.

### Senior (9–12)
9. **Savol:** JS dvigateli (V8) Stack va Heap xotirani qanday tozalaydi?
   **Javob:** Stack qat'iy doirada tezda avtomatik tozalanadi. Heap xotira esa faqat barcha havolalar (references) uzilgandan keyin Garbage Collector (Axlat yig'uvchi) tomonidan tozalanadi.
10. **Savol:** Nima uchun \`const arr = []\` massiviga qiyomat qo'shish mumkin, lekin \`const x = 5\` ni o'zgartirib bo'lmaydi?
    **Javob:** \`const\` o'zgaruvchi manziliga yangi havola/qiymat biriktirilishini taqiqlaydi. Massiv xotirada joylashgan joyi o'zgarmagani uchun uni mutate qilish mumkin. Primitivni o'zgartirish yangi xotira talab qiladi.
11. **Savol:** Primitiv turlarda qanday qilib metodlar (\`str.toUpperCase()\`) ishlashi mumkin?
    **Javob:** Autoboxing mexanizmi orqali JS dvigateli vaqtincha Wrapper Object (String, Number) yaratadi va metod ishlagach, uni darhol yo'q qiladi.
12. **Savol:** Memory Leak nima va qanday hollarda yuz beradi?
    **Javob:** Keraksiz ma'lumotlar xotirada yig'ilib borishi. Bu odatda yopilmalar (closures), o'chirilmagan \`setInterval\`, yoki DOM elementlarga JS-dagi unutilgan havolalar (detached DOM) orqali kelib chiqadi.
`,
  exercises: [
    {
      "id": 1,
      "title": "Primitive qiymat yaratish (String)",
      "instruction": "`name` o'zgaruvchisini yarating va unga o'z ismingizni biriktiring.",
      "startingCode": "let name = ",
      "hint": "Qo'shtirnoq yoki yakkalik qo'shtirnoq ('...') ishlating.",
      "test": "const sandbox = new Function('let name = \"JS\"; ' + code + '; return name;');\nconst res = sandbox();\nif (typeof res !== 'string') return 'Natija string emas';\nreturn null;"
    },
    {
      "id": 2,
      "title": "Number turi",
      "instruction": "`age` o'zgaruvchisiga o'zingiz xohlagan butun sonni biriktiring.",
      "startingCode": "let age = ",
      "hint": "Sonni qo'shtirnoqsiz yozing.",
      "test": "const sandbox = new Function('let age = 1; ' + code + '; return age;');\nconst res = sandbox();\nif (typeof res !== 'number') return 'Natija number emas';\nreturn null;"
    },
    {
      "id": 3,
      "title": "Boolean turi",
      "instruction": "`isStudent` o'zgaruvchisini mantiqiy rost (`true`) qilib belgilang.",
      "startingCode": "let isStudent = ",
      "hint": "Mantiqiy qiymat true ni yozing.",
      "test": "const sandbox = new Function('let isStudent = true; ' + code + '; return isStudent;');\nconst res = sandbox();\nif (res !== true) return 'isStudent true emas';\nreturn null;"
    },
    {
      "id": 4,
      "title": "Undefined nima?",
      "instruction": "Hech qanday qiymat bermasdan `emptyVar` nomli o'zgaruvchi e'lon qiling.",
      "startingCode": "",
      "hint": "Faqat let emptyVar; deb yozib qo'ying.",
      "test": "const sandbox = new Function(code + '; return emptyVar;');\nconst res = sandbox();\nif (res !== undefined) return 'emptyVar undefined bo\\'lishi kerak';\nreturn null;"
    },
    {
      "id": 5,
      "title": "Null ishlatish",
      "instruction": "`emptyBox` o'zgaruvchisiga ataylab bo'sh ekanligini bildiruvchi qiymat bering.",
      "startingCode": "let emptyBox = ",
      "hint": "null so'zidan foydalaning.",
      "test": "const sandbox = new Function('let emptyBox = null; ' + code + '; return emptyBox;');\nconst res = sandbox();\nif (res !== null) return 'emptyBox null bo\\'lishi kerak';\nreturn null;"
    },
    {
      "id": 6,
      "title": "Obyekt yaratish (Reference turi)",
      "instruction": "`user` nomli obyekt yarating va unga `name` va `age` kalitlarini bering.",
      "startingCode": "let user = { };",
      "hint": "let user = { name: 'Ali', age: 20 };",
      "test": "const sandbox = new Function('let user = {}; ' + code + '; return user;');\nconst res = sandbox();\nif (typeof res !== 'object' || !res.name || !res.age) return 'Obyekt to\\'g\\'ri yozilmadi';\nreturn null;"
    },
    {
      "id": 7,
      "title": "BigInt turi bilan ishlash",
      "instruction": "`bigNumber` o'zgaruvchisiga 9007199254740991n qiymatini biriktiring.",
      "startingCode": "let bigNumber = ",
      "hint": "Son oxiriga 'n' harfini qo'ying.",
      "test": "const sandbox = new Function('let bigNumber = 1n; ' + code + '; return typeof bigNumber;');\nconst res = sandbox();\nif (res !== 'bigint') return 'Natija bigint turida emas';\nreturn null;"
    },
    {
      "id": 8,
      "title": "Symbol turi",
      "instruction": "`mySymbol` o'zgaruvchisini Symbol tipida yarating.",
      "startingCode": "let mySymbol = ",
      "hint": "Symbol('id') tarzida chaqiring.",
      "test": "const sandbox = new Function('let mySymbol = Symbol(); ' + code + '; return typeof mySymbol;');\nconst res = sandbox();\nif (res !== 'symbol') return 'Natija symbol emas';\nreturn null;"
    },
    {
      "id": 9,
      "title": "Shallow Copy (Yuzaki nusxalash)",
      "instruction": "Foydalanuvchi obyekti (`user`) dan spread operatori (...) yordamida `userCopy` ga yangi nusxa oling.",
      "startingCode": "let user = { name: 'Sardor' };\nlet userCopy = ",
      "hint": "{ ...user } dan foydalaning.",
      "test": "const sandbox = new Function(code + '; return { user, userCopy };');\nconst { user, userCopy } = sandbox();\nif (user === userCopy || userCopy.name !== 'Sardor') return 'Spread operator to\\'g\\'ri ishlatilmadi';\nreturn null;"
    },
    {
      "id": 10,
      "title": "Typeof xatoligi",
      "instruction": "`typeof null` qiymatini `nullType` o'zgaruvchisiga saqlang.",
      "startingCode": "let nullType = ",
      "hint": "typeof null",
      "test": "const sandbox = new Function(code + '; return nullType;');\nconst res = sandbox();\nif (res !== 'object') return 'nullType object bo\\'lishi kerak';\nreturn null;"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "JavaScript'da nechta asosiy (primitive) ma'lumot turi mavjud?",
      "options": ["5", "6", "7", "8"],
      "correctAnswer": 2,
      "explanation": "JS da 7 ta primitive tur mavjud: String, Number, Boolean, Undefined, Null, Symbol, BigInt."
    },
    {
      "id": 2,
      "question": "typeof null natijasi nima bo'ladi?",
      "options": ["'null'", "'undefined'", "'object'", "'number'"],
      "correctAnswer": 2,
      "explanation": "typeof null har doim 'object' qaytaradi. Bu JavaScriptning tarixiy xatosi hisoblanadi."
    },
    {
      "id": 3,
      "question": "JavaScript'da murakkab (non-primitive) ma'lumot turi qaysi?",
      "options": ["String", "Number", "Object", "Boolean"],
      "correctAnswer": 2,
      "explanation": "Object - bu reference (murakkab) tip bo'lib, unga Array va Function ham kiradi."
    },
    {
      "id": 4,
      "question": "undefined va null o'rtasidagi asosiy farq nima?",
      "options": [
        "Ular butunlay bir xil",
        "undefined o'zgaruvchi e'lon qilinib qiymat berilmaganda, null esa qasddan bo'sh qilinganda ishlatiladi",
        "null faqat obyektlar uchun",
        "Hech qanday farqi yo'q"
      ],
      "correctAnswer": 1,
      "explanation": "undefined tizim tomonidan o'z-o'zidan belgilanadi, null esa dasturchi tomonidan atayin bo'sh qiymat berish uchun ishlatiladi."
    },
    {
      "id": 5,
      "question": "BigInt turi qachon ishlatiladi?",
      "options": [
        "Satrlarni saqlash uchun",
        "Juda kichik raqamlarda",
        "Xavfsiz butun son (Number.MAX_SAFE_INTEGER) dan katta sonlarni ifodalash uchun",
        "Massivni sanash uchun"
      ],
      "correctAnswer": 2,
      "explanation": "BigInt xavfsiz butun son (2^53 - 1) dan kattaroq butun sonlar bilan ishlash uchun mo'ljallangan."
    },
    {
      "id": 6,
      "question": "Symbol turining asosiy xususiyati nima?",
      "options": [
        "O'zgartirilishi mumkin bo'lgan qiymat",
        "Har doim bir xil natija beradi",
        "Mutlaqo noyob va o'zgarmas (unique and immutable) identifikator yaratadi",
        "Faqat raqamlarni ifodalaydi"
      ],
      "correctAnswer": 2,
      "explanation": "Symbol har doim unikal qiymat yaratadi, turli joyda yozilgan bir xil nomli symbol'lar ham o'zaro teng bo'lmaydi."
    },
    {
      "id": 7,
      "question": "Reference (murakkab) turlar xotirada qanday saqlanadi?",
      "options": [
        "Stack xotirada faqat qiymat",
        "Heap xotirada qiymat saqlanib, Stack xotirada uning manzili (havola) turadi",
        "Vaqtinchalik cach-da",
        "Qattiq diskda"
      ],
      "correctAnswer": 1,
      "explanation": "Murakkab turlar Heap xotirada dinamik yaratiladi va ularning reference (manzili) Stack o'zgaruvchisida saqlanadi."
    },
    {
      "id": 8,
      "question": "Qaysi biri primitiv tip Emas?",
      "options": ["Symbol", "Array", "String", "Boolean"],
      "correctAnswer": 1,
      "explanation": "Array bu primitiv emas, u Object ning maxsus turidir."
    },
    {
      "id": 9,
      "question": "Ikkita turli e'lon qilingan bo'sh obyekt o'zaro tengmi? (let a = {}; let b = {}; a === b)",
      "options": ["Ha", "Yo'q", "Ba'zan", "Doim qanday solishtirishga bog'liq"],
      "correctAnswer": 1,
      "explanation": "Object'lar reference orqali solishtiriladi. Ikkita alohida yaratilgan obyekt xotirada turli manzillarga ega, shu sababli ular teng emas."
    },
    {
      "id": 10,
      "question": "Quyidagilardan qaysi biri typeof natijasi sifatida xato keltirilgan?",
      "options": [
        "typeof undefined === 'undefined'",
        "typeof function(){} === 'function'",
        "typeof [] === 'array'",
        "typeof NaN === 'number'"
      ],
      "correctAnswer": 2,
      "explanation": "typeof [] aslida 'object' qaytaradi. typeof massiv ekanini aniqlash uchu Array.isArray([]) ishlatiladi."
    },
    {
      "id": 11,
      "question": "Qaysi turdagi ma'lumotlarni o'zgartirib bo'lmaydi (immutable)?",
      "options": [
        "Object",
        "Array",
        "Barcha primitiv turlarni",
        "Function"
      ],
      "correctAnswer": 2,
      "explanation": "Barcha primitiv ma'lumot turlari immutable hisoblanadi. Qiymat o'zgartirilsa aslida yangisi yasaladi."
    },
    {
      "id": 12,
      "question": "typeof (typeof 1) nimani qaytaradi?",
      "options": ["'number'", "'string'", "'object'", "'undefined'"],
      "correctAnswer": 1,
      "explanation": "typeof 1 natijasi 'number' (satr ko'rinishida) bo'ladi. Keyin typeof 'number' (satrdan) so'ralsa 'string' qaytadi."
    }
  ]
};
