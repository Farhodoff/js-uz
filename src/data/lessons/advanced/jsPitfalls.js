export const jsPitfalls = {
  id: "jsPitfalls",
  title: "JS Pitfalls: Ko'p uchraydigan xatolar va tuzoqlar",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### JS Pitfalls (JavaScript Tuzoqlari) nima?
* **JS Pitfalls:** JavaScript dasturlash tilining tabiati, uning dinamik tiplanishi, tarixiy rivojlanishi va orqaga mos keluvchanlikni (backward compatibility) saqlash majburiyati tufayli kelib chiqqan g'alati, kutilmagan va chalkashtiruvchi xususiyatlaridir.
* Bular xatolar emas, balki tilning o'ziga xos ishlash mexanizmlari bo'lib, ular haqida bilmagan dasturchilar osongina tuzoqqa tushib, qiyin topiladigan xatolarga (bugs) uchrashadi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **yo'l harakati qoidalariga rioya qilib mashina haydayapsiz**:
* Ko'pgina mamlakatlarda yo'lning o'ng tarafidan harakatlaniladi.
* Lekin birdaniga yo'lda hech qanday ogohlantirishsiz **boshqa qoidalar ishlaydigan hududga** kirib qoldingiz (masalan, chorrahada o'ng tomondan kelgan mashina emas, chap tomondagi ustuvorlikka ega bo'ldi yoki chap tomondan haydash boshlandi). Agar siz bu mahalliy qoidalarni ("tuzoqlarni") bilmasangiz, qoidani buzmagan holda ham avariyaga uchraysiz.
* JavaScript-dagi tuzoqlar ham xuddi shunday: kod sintaktik jihatdan to'g'ri bo'lsa-da, til ichki qoidalari tufayli mutlaqo kutilmagan natija beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Turlarning avtomatik o'zgarishi / Coercion)
Silliq va ko'rinmas tur o'zgarishlari mantiqiy xatolarga olib kelishi:
\`\`\`javascript
const x = "5";
const y = 2;

console.log(x + y); // "52" (satrga aylantirib birlashtiradi)
console.log(x - y); // 3 (songa aylantirib ayiradi!)
console.log(x * y); // 10 (ko'paytiradi)
\`\`\`

### 2. Intermediate Example (Floating Point / Suzuvchi nuqta muammosi)
Matematik jihatdan to'g'ri bo'lgan tenglik JavaScript-da xato bo'lishi:
\`\`\`javascript
const a = 0.1;
const b = 0.2;

if (a + b === 0.3) {
  console.log("Teng!");
} else {
  console.log("Teng emas!"); // Ekranga chiqadi!
  console.log(a + b); // 0.30000000000000004
}

// Tuzatish: Yaxlitlab olish
const preciseSum = parseFloat((a + b).toFixed(12));
console.log(preciseSum === 0.3); // true
\`\`\`

### 3. Advanced Example (Object Key Coercion / Obyekt kalitlarining o'zgarishi)
Obyekt kalitlari har doim satrga (string) aylantirilishi tufayli yuzaga keladigan chalkashlik:
\`\`\`javascript
const obj = {};
const key1 = { name: "Ali" };
const key2 = { name: "Vali" };

obj[key1] = 123; // key1.toString() -> "[object Object]"
obj[key2] = 456; // key2.toString() -> "[object Object]" (oldindagining ustiga yozadi!)

console.log(obj[key1]); // 456! (123 yo'qolib ketdi)
console.log(obj); // { "[object Object]": 456 }

// Tuzatish: Murakkab kalitlar uchun Map obyektidan foydalaning
const myMap = new Map();
myMap.set(key1, 123);
myMap.set(key2, 456);
console.log(myMap.get(key1)); // 123
\`\`\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi

### Qaysi muammoni hal qiladi?
1. **Dasturdagi qiyin topiladigan yashirin xatolarni oldini olish:** JS-dagi suzuvchi nuqta (0.1 + 0.2) xatosi moliyaviy dasturlarda pullarni noto'g'ri hisoblashga olib kelishi mumkin.
2. **Kodni xavfsizroq yozish:** JavaScript juda moslashuvchan til bo'lgani uchun, u ko'p xatolarda dasturni to'xtatmaydi, balki \`NaN\` yoki \`undefined\` bilan ishlashni davom ettiradi. Dasturchi tuzoqlarni bilsagina, kodni kutilmagan to'xtashlarsiz toza yozadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`==\` (kuchsiz tenglik) operatorini ishlatish
Kuchsiz tenglik o'zgaruvchilar turini yashirin o'zgartiradi.
#### Xato:
\`\`\`javascript
console.log("" == 0); // true (bo'sh satr 0 ga aylanib ketadi)
console.log(false == "0"); // true
console.log(null == undefined); // true
\`\`\`
#### Tuzatish:
Har doim qiymat va turini bir xilda tekshiradigan \`===\` (qat'iy tenglik) dan foydalaning.
\`\`\`javascript
console.log("" === 0); // false
console.log(false === "0"); // false
console.log(null === undefined); // false
\`\`\`

### 2. Obyektlarni nusxalashda referensial bog'liqlik
Obyekt yoki massivni shunchaki boshqa o'zgaruvchiga tenglash yangi nusxa yaratmaydi.
#### Xato:
\`\`\`javascript
const original = { score: 10 };
const copy = original;
copy.score = 20;

console.log(original.score); // 20! (original ham o'zgarib ketdi)
\`\`\`
#### Tuzatish:
Sayoz nusxa (shallow copy) uchun spread operator \`...\`, chuqur nusxa (deep copy) uchun esa \`structuredClone\` yoki \`JSON\` metodlaridan foydalaning:
\`\`\`javascript
const copy = { ...original }; // Sayoz nusxa
// Yoki
const deepCopy = structuredClone(original); // Chuqur nusxa
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** \`NaN\` nima va u bilan bog'liq eng katta tuzoq qaysi?
   * **Javob:** \`NaN\` (Not-a-Number) raqamli xatoliklarni bildiradi. Uning asosiy tuzog'i - u o'z-o'ziga ham teng emas (\`NaN === NaN\` -> \`false\`). Uni tekshirish uchun \`Number.isNaN()\` ishlatiladi.
2. **Savol:** \`typeof null\` nima uchun \`'object'\` qaytaradi?
   * **Javob:** Bu JavaScript tilining ilk versiyasidan qolgan tarixiy xato bo'lib, orqaga mos keluvchanlik buzilmasligi uchun tuzatilmagan.
3. **Savol:** \`==\` va \`===\` operatorlarining farqi nimada?
   * **Javob:** \`==\` taqqoslashdan oldin qiymatlarni bitta turga o'giradi (coercion), \`===\` esa turlarni o'zgartirmasdan, ham qiymatni, ham turni tekshiradi.
4. **Savol:** \`const\` bilan e'lon qilingan massiv elementlarini o'zgartirsa bo'ladimi?
   * **Javob:** Ha, bo'ladi. \`const\` faqat o'zgaruvchiga yangi xotira manzili (reference) yuklashni taqiqlaydi. Massiv ichidagi elementlarni o'zgartirish (masalan \`push\`) taqiqlanmaydi.

### Middle (5–8)
5. **Savol:** \`parseInt('0.0000005')\` nima uchun \`5\` qaytaradi?
   * **Javob:** \`parseInt\` o'z argumentini string-ga o'giradi. \`0.0000005\` string bo'lganda \`'5e-7'\` (ilmiy format) ko'rinishiga o'tadi. \`parseInt\` birinchi belgini (\`'5'\`) o'qib, uni son sifatida qaytaradi.
6. **Savol:** Automatic Semicolon Insertion (ASI) bilan bog'liq \`return\` tuzog'ini tushuntiring.
   * **Javob:** Agar \`return\`dan keyin yangi satr boshlansa, JS avtomatik ravishda \`return;\` deb nuqtali vergul qo'yadi. Natijada funksiya quyidagi kodni bajarmay \`undefined\` qaytaradi.
7. **Savol:** \`1 < 2 < 3\` va \`3 > 2 > 1\` ifodalari natijasi qanday bo'ladi?
   * **Javob:** \`1 < 2 < 3\` -> \`true < 3\` -> \`1 < 3\` -> \`true\`. \`3 > 2 > 1\` -> \`true > 1\` -> \`1 > 1\` -> \`false\`.
8. **Savol:** Massivdagi empty slotlar (masalan \`Array(3)\` yaratganda) va \`undefined\` qiymatli elementlar farqi nimada?
   * **Javob:** Empty slotlar massivda mavjud bo'lmagan indekslardir. \`.map()\`, \`.forEach()\` kabi iteratorlar empty slotlarni o'tkazib yuboradi, lekin \`undefined\` qiymatli elementlarni qayta ishlaydi.

### Senior (9–12)
9. **Savol:** \`Math.min() > Math.max()\` nima uchun \`true\` qaytaradi?
   * **Javob:** Argumentsiz chaqirilganda \`Math.min()\` taqqoslashni boshlash uchun eng katta son bo'lgan \`Infinity\`ni, \`Math.max()\` esa eng kichik son \`-Infinity\`ni qaytaradi. \`Infinity > -Infinity\` sharti esa \`true\` bo'ladi.
10. **Savol:** \`this\` kalit so'zi yo'qolishi (loss of this) qachon yuz beradi va qanday oldi olinadi?
    * **Javob:** Obyekt metodi callback sifatida boshqa funksiyaga (masalan \`setTimeout\`) uzatilganda \`this\` konteksti global obyektga (yoki strict mode-da \`undefined\`ga) o'zgarib qoladi. Buning oldini olish uchun arrow funksiyalar yoki \`.bind(obj)\` ishlatiladi.
11. **Savol:** JavaScript-da obyektdan nusxa olishda \`structuredClone\` ning \`JSON.parse(JSON.stringify(obj))\` dan afzalliklari nimada?
    * **Javob:** \`JSON\` metodlari \`Date\`, \`RegExp\`, \`Map\`, \`Set\` kabi maxsus obyektlarni, funksiyalarni va siklik havolalarni (circular references) nusxalay olmaydi (ma'lumot yo'qoladi). \`structuredClone\` esa ularni to'g'ri nusxalay oladi.
12. **Savol:** Temporal Dead Zone (TDZ) nima va u \`var\` hamda \`let\`/\`const\` farqlariga qanday bog'liq?
    * **Javob:** TDZ - bu o'zgaruvchi e'lon qilingan qatorgacha bo'lgan hudud. \`var\` o'zgaruvchilar hoisting bo'lganda \`undefined\` qiymatini oladi, \`let\` va \`const\` esa hoisting bo'lsa-da, e'lon qilinmaguncha ularni o'qib bo'lmaydi (TDZ zonada bo'ladi) va murojaat qilinganda \`ReferenceError\` tashlanadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Mashqlar maxsus test tizimi orqali tekshiriladi.

---

## 7. 📝 12 ta Mini Test

Dars oxirida testlar taqdim etiladi.

---

## 8. 🎯 Real Project Case Study

### Moliyaviy tizimlarda tranzaksiyalarni hisoblash xavfsizligi
Moliyaviy ilovalarda suzuvchi nuqta tuzog'iga tushmaslik uchun barcha hisob-kitoblarni tiyinlarda (butun sonlarda) bajarib, faqat ko'rsatish paytida so'm/dollarga o'tkazish eng xavfsiz yechim hisoblanadi.

\`\`\`javascript
// Noto'g'ri (Tuzoqqa tushish):
function calculateTotalDirect(prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}
console.log(calculateTotalDirect([19.99, 9.99, 0.02])); // 30.000000000000004

// To'g'ri (Butun sonlarga o'tib hisoblash):
function calculateTotalSafe(prices) {
  // Qiymatlarni 100 ga ko'paytirib (tiyinlarga o'tib) butun son qilamiz
  const totalCents = prices.reduce((sum, price) => {
    return sum + Math.round(price * 100);
  }, 0);
  
  // Natijani yana 100 ga bo'lamiz
  return totalCents / 100;
}
console.log(calculateTotalSafe([19.99, 9.99, 0.02])); // 30.00 (Aniq!)
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **\`===\` ni odat qiling:** \`===\` operatori turlarni tekshirib o'tirmasdan, turli xil bo'lsa zudlik bilan \`false\` qaytargani uchun \`==\` operatoriga qaraganda tezroq ishlaydi.
* **Obyektlarni nusxalashda ehtiyot bo'ling:** \`JSON.parse(JSON.stringify())\` juda og'ir operatsiya bo'lib, katta obyektlarda ishlash tezligini keskin tushirib yuboradi. Agar faqat sayoz nusxa kifoya bo'lsa, spread operator (\`{...}\`) yoki \`Object.assign()\` dan foydalaning.

---

## 10. 📌 Cheat Sheet

| Tuzoq / Amaliyot | Natija / Muammo | Yechim |
| :--- | :--- | :--- |
| \`0.1 + 0.2\` | \`0.30000000000000004\` | \`.toFixed(12)\` va \`parseFloat()\` |
| \`typeof null\` | \`'object'\` | \`val === null\` orqali tekshirish |
| \`NaN === NaN\` | \`false\` | \`Number.isNaN(val)\` |
| \`"" == 0\` | \`true\` | \`===\` qat'iy tenglikdan foydalanish |
| \`[1, 2] + [3, 4]\` | \`'1,23,4'\` (string concatenation) | \`.concat()\` yoki spread operator |
| \`Object\` kaliti | Obyektlar satrga o'tadi (\`[object Object]\`) | \`Map\` obyektidan foydalanish |
| construct \`Array(3)\` | Bo'sh slotlar yaratiladi | \`Array.from({ length: 3 })\` yoki \`.fill()\` |
`,
  exercises: [
    {
      id: 1,
      title: "Strict Equality",
      instruction: "Taqqoslash algoritmini qat'iy tenglik (strict equality) ishlatadigan qilib to'g'rilang, toki u noo'rin coercion (tip o'zgarishi) ga yo'l qo'ymasin.",
      startingCode: "function isEqual(a, b) {\n  return a == b;\n}\n",
      hint: "=== operatorini ishlating.",
      test: "if (!code.includes('==') && code.includes('===')) return null; return 'Kat\\'iy tenglikdan foydalaning!';"
    },
    {
      id: 2,
      title: "Safe typeof null",
      instruction: "Foydalanuvchi bergan qiymat haqiqatan ham 'object' ekanini tekshiruvchi va null bo'lsa false qaytaruvchi xavfsiz funksiya yozing.",
      startingCode: "function isRealObject(val) {\n  // Kodni shu yerga yozing\n}\n",
      hint: "typeof val === 'object' && val !== null",
      test: "if (isRealObject(null) === false && isRealObject({}) === true) return null; return 'Null qiymat ob\\'yekt emas deb topilishi kerak!';"
    },
    {
      id: 3,
      title: "forEach Async Tuzog'i",
      instruction: "forEach asinxron ishlamasligini bilgan holda, berilgan urls massividagi har bir manzilni ketma-ket (sequential) fetch qiluvchi sequentialFetch funksiyasini for...of yordamida yozing.",
      startingCode: "async function sequentialFetch(urls, fetcher) {\n  // Kodni for...of yordamida yozing\n}\n",
      hint: "for (const url of urls) { await fetcher(url); }",
      test: "if (code.includes('for') && code.includes('await')) return null; return 'for...of va await ishlating';"
    },
    {
      id: 4,
      title: "Nested Object Copy (Shallow vs Deep)",
      instruction: "JSON.parse/JSON.stringify yoki boshqa deep copy usuli yordamida nested obyektni to'liq nusxalang, toki uning ichki qismini o'zgartirganda original o'zgarmasin.",
      startingCode: "function deepCopy(obj) {\n  // Kodni yozing\n}\n",
      hint: "return JSON.parse(JSON.stringify(obj));",
      test: "const orig = { a: { b: 1 } }; const cp = deepCopy(orig); cp.a.b = 2; if (orig.a.b === 1) return null; return 'Deep copy to\\'g\\'ri amalga oshmadi';"
    },
    {
      id: 5,
      title: "Massiv Mutation-siz Saralash",
      instruction: "Massivni o'zgartirmasdan, uning elementlarini o'sib borish tartibida saralangan yangi nusxasini qaytaruvchi safeSort funksiyasini yozing.",
      startingCode: "function safeSort(arr) {\n  // Kodni yozing\n}\n",
      hint: "return [...arr].sort((a,b) => a-b);",
      test: "const a = [3, 1, 2]; const res = safeSort(a); if (a[0] === 3 && res[0] === 1) return null; return 'Original massiv o\\'zgarmasligi shart';"
    },
    {
      id: 6,
      title: "Immutable Update",
      instruction: "User obyektini o'zgartirmagan holda, uning ichidagi 'role' qiymatini 'moderator' qilib yangilovchi va yangi obyekt qaytaruvchi updateUser funksiyasini yozing.",
      startingCode: "function updateUser(user) {\n  // Kodni yozing\n}\n",
      hint: "return { ...user, role: 'moderator' };",
      test: "const u = { name: 'Ali', role: 'user' }; const updated = updateUser(u); if (u.role === 'user' && updated.role === 'moderator') return null; return 'User ob\\'yekti o\\'zgarib ketdi yoki role yangilanmadi';"
    },
    {
      id: 7,
      title: "Closure in Loop (let fix)",
      instruction: "Berilgan loop-da var o'rniga let ishlatib, callbacks massividagi funksiyalar chaqirilganda har bir i qiymatini (0, 1, 2) to'g'ri qaytarishini ta'minlang.",
      startingCode: "function createCallbacks() {\n  const callbacks = [];\n  for (var i = 0; i < 3; i++) {\n    callbacks.push(function() {\n      return i;\n    });\n  }\n  return callbacks;\n}\n",
      hint: "var i o'rniga let i ishlating.",
      test: "const fns = createCallbacks(); if (fns[0]() === 0 && fns[2]() === 2) return null; return 'Loopda closure xato ishlayapti';"
    },
    {
      id: 8,
      title: "Safe NaN Check",
      instruction: "Berilgan qiymat NaN ekanini aniqlaydigan xavfsiz isItNaN funksiyasini yozing (NaN === NaN ishlamasligini yodda tuting).",
      startingCode: "function isItNaN(val) {\n  // Kodni yozing\n}\n",
      hint: "Number.isNaN(val)",
      test: "if (isItNaN(NaN) === true && isItNaN(5) === false) return null; return 'NaN qiymatni to\\'g\\'ri aniqlang';"
    },
    {
      id: 9,
      title: "this context binding",
      instruction: "Obyekt metodini callback qilib uzatganda this yo'qolishining oldini olish uchun greet metodini person obyektiga bind qiling.",
      startingCode: "const person = {\n  name: 'Ali',\n  greet() {\n    return 'Salom ' + this.name;\n  }\n};\nconst unboundGreet = person.greet;\n// bind yordamida bog'lang\nconst boundGreet = unboundGreet; \n",
      hint: "unboundGreet.bind(person)",
      test: "if (code.includes('bind') || (typeof boundGreet === 'function' && boundGreet() === 'Salom Ali')) return null; return 'greet metodini bind orqali bog\\'lang';"
    },
    {
      id: 10,
      title: "Fix Arrow Function this",
      instruction: "Quyidagi obyektda user.getName() ishlashi uchun uning arrow funksiya bo'lgan metodini oddiy funksiyaga o'zgartiring (Arrow funksiyalarda dynamic this yo'qligi sababli).",
      startingCode: "const user = {\n  name: 'Vali',\n  getName: () => {\n    return this.name;\n  }\n};\n",
      hint: "getName() { return this.name; } ko'rinishida yozing.",
      test: "if (!code.includes('=>')) return null; return 'Metodda arrow funksiyadan voz keching';"
    },
    {
      id: 11,
      title: "Array clear mutation danger",
      instruction: "Massivni yangi massivga bog'lamagan holda (chunki boshqa reference-lar bo'lishi mumkin), uning ichidagi barcha elementlarni xavfsiz va to'liq o'chirib tashlang.",
      startingCode: "function clearArray(arr) {\n  // Kodni yozing\n}\n",
      hint: "arr.length = 0;",
      test: "const list = [1, 2, 3]; const ref = list; clearArray(list); if (list.length === 0 && ref.length === 0) return null; return 'Massiv toliq tozalanmadi yoki reference buzildi';"
    },
    {
      id: 12,
      title: "Stale closure fix via object ref",
      instruction: "Callback ichida state o'zgaruvchisining eng yangi qiymatini o'qish uchun uni ref.current kabi obyekt ichida saqlang va callback ichida shu obyekt orqali o'qing.",
      startingCode: "function setupCallback(refObj) {\n  return function() {\n    // refObj.current ni qaytaring\n  };\n}\n",
      hint: "return refObj.current;",
      test: "const ref = { current: 1 }; const fn = setupCallback(ref); ref.current = 2; if (fn() === 2) return null; return 'Eski qiymat qaytarilmoqda, reference-dan o\\'qing';"
    },
    {
      id: 13,
      title: "Floating-point xatolarini to'g'rilash",
      instruction: "JavaScriptda floating-point sonlarni qo'shishda kelib chiqadigan xatolarni (masalan, `0.1 + 0.2` natijasi `0.30000000000000004` bo'lishini) bartaraf etuvchi va aniq yig'indini qaytaruvchi `safeAdd(a, b)` funksiyasini yozing.",
      startingCode: "function safeAdd(a, b) {\n  // a va b yig'indisini floating-point xatolarisiz qaytaring\n}",
      hint: "return parseFloat((a + b).toFixed(12));",
      test: "if (safeAdd(0.1, 0.2) === 0.3 && safeAdd(0.1, 0.7) === 0.8) return null;\nreturn 'safeAdd funksiyasi to\\'g\\'ri yig\\'indi qaytarmadi';"
    },
    {
      id: 14,
      title: "Obyektni chuqur muzlatish (Deep Freeze)",
      instruction: "Berilgan obyektni va uning barcha ichki nested obyektlarini rekursiv tarzda to'liq muzlatib (immutable), o'zgartirishlardan saqlovchi va xavfsiz qiluvchi `deepFreeze(obj)` funksiyasini yozing.",
      startingCode: "function deepFreeze(obj) {\n  // Obyekt va uning ichidagi barcha obyektlarni muzlating\n}",
      hint: "Object.freeze(obj);\nObject.keys(obj).forEach(key => {\n  if (typeof obj[key] === 'object' && obj[key] !== null) {\n    deepFreeze(obj[key]);\n  }\n});\nreturn obj;",
      test: "const o = { a: { b: 1 } };\ndeepFreeze(o);\nif (Object.isFrozen(o) && Object.isFrozen(o.a)) return null;\nreturn 'deepFreeze funksiyasi obyektni chuqur muzlatmadi';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da `0.1 + 0.2 === 0.3` ifodasi nima qaytaradi va nega?",
    "options": [
      "`true` qaytaradi, chunki matematik jihatdan bu teng",
      "`false` qaytaradi, chunki sonlar ikkilik tizimda (IEEE 754 standarti) saqlanganda suzuvchi nuqtali hisob-kitoblarda kichik xatolik yuzaga keladi (`0.30000000000000004`)",
      "`undefined` qaytaradi, chunki bu turdagi qo'shish taqiqlangan",
      "`TypeError` xatoligini beradi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript sonlarni IEEE 754 64-bit suzuvchi nuqta ko'rinishida saqlaydi. 0.1 va 0.2 ni ikkilik kasr ko'rinishida cheksiz hisoblash natijasida xatolik yig'ilib, yig'indi 0.30000000000000004 ga teng bo'ladi."
  },
  {
    "id": 2,
    "question": "JavaScript-dagi tarixiy xatolik (bug) tufayli `typeof null` nima qaytaradi?",
    "options": [
      "`'null'`",
      "`'undefined'`",
      "`'object'`",
      "`'boolean'`"
    ],
    "correctAnswer": 2,
    "explanation": "JavaScript yaratilgan dastlabki versiyalarda qiymatlar turlari tag (belgi) yordamida aniqlangan. Obyektlar uchun tag `000` bo'lgan, `null` ham xotirada hammasi nollardan tashkil topganligi sababli u xato ravishda obyekt deb hisoblangan. Bu xato saqlab qolingan."
  },
  {
    "id": 3,
    "question": "JavaScript-da `typeof NaN` (Not-a-Number) nima qaytaradi?",
    "options": [
      "`'nan'`",
      "`'number'`",
      "`'undefined'`",
      "`'string'`"
    ],
    "correctAnswer": 1,
    "explanation": "NaN - garchi nomi 'Son emas' deb tarjima qilinsa ham, u raqamli hisob-kitoblardagi xatolik natijasini anglatuvchi maxsus numeric (raqamli) qiymatdir, shuning uchun turi 'number' hisoblanadi."
  },
  {
    "id": 4,
    "question": "Quyidagi ifoda bajarilganda qanday natija hosil bo'ladi?\n```javascript\n[] + []\n```",
    "options": [
      "`[]` (bo'sh massiv)",
      "`\"\"` (bo'sh satr)",
      "`undefined`",
      "`[object Object]`"
    ],
    "correctAnswer": 1,
    "explanation": "Massivlarni `+` operatori bilan qo'shganda, JavaScript ularni satrga (string) aylantiradi. Bo'sh massiv `\"\"` ga aylanadi, natijada `\"\" + \"\" = \"\"` (bo'sh satr) bo'ladi."
  },
  {
    "id": 5,
    "question": "Quyidagi ifoda bajarilganda qanday natija olinadi?\n```javascript\n[] + {}\n```",
    "options": [
      "`\"\"` (bo'sh satr)",
      "`\"[object Object]\"`",
      "`NaN`",
      "`TypeError`"
    ],
    "correctAnswer": 1,
    "explanation": "`+` operatori tufayli massiv ham, obyekt ham satrga o'giriladi: `[]` bo'sh satrga `\"\"`, `{}` esa `\"[object Object]\"` ga o'zgaradi. Ikkovini qo'shganda `\"[object Object]\"` hosil bo'ladi."
  },
  {
    "id": 6,
    "question": "Quyidagi funksiya chaqirilganda nima qaytaradi va bunga nima sabab bo'ladi?\n```javascript\nfunction test() {\n  return\n  {\n    name: 'Ali'\n  };\n}\n```",
    "options": [
      "`{ name: 'Ali' }` obyektini",
      "`undefined` qaytaradi, chunki Automatic Semicolon Insertion (ASI) `return`dan keyin yangi satr bo'lgani uchun nuqtali vergul qo'yib yuboradi",
      "`null` qaytaradi",
      "`SyntaxError` tashlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript avtomatik ravishda nuqtali vergul qo'yish (ASI) qoidasiga ega. `return` so'zidan keyin yangi qatorga o'tilsa, u `return;` deb hisoblanadi va keyingi qatordagi kod o'qilmaydi, funksiya `undefined` qaytaradi."
  },
  {
    "id": 7,
    "question": "JavaScript-da `3 > 2 > 1` ifodasi nima qaytaradi?",
    "options": [
      "`true`",
      "`false`",
      "`1`",
      "`NaN`"
    ],
    "correctAnswer": 1,
    "explanation": "Taqqoslash chapdan o'ngga bajariladi. Dastlab `3 > 2` tekshiriladi va `true` qaytadi. So'ngra `true > 1` bajariladi. `true` son turiga o'tganda `1` bo'ladi, `1 > 1` esa `false` qaytaradi."
  },
  {
    "id": 8,
    "question": "Kuchli bo'lmagan tenglik `==` ishlatilganda `\"\" == 0` nima qaytaradi?",
    "options": [
      "`true`, chunki ikkala qiymat ham taqqoslashda 0 (yoki falsey) songa o'zgartiriladi",
      "`false`, chunki biri string, biri son",
      "`undefined`",
      "`TypeError`"
    ],
    "correctAnswer": 0,
    "explanation": "`==` ishlatilganda turlarni avtomatik o'zgartirish (coercion) yuz beradi. Bo'sh satr `\"\"` son turiga o'tganda `0` ga aylanadi. Natijada `0 == 0` bo'lib, `true` qaytadi. Shuning uchun har doim `===` (qatiy tenglik) ishlatish tavsiya etiladi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod bajarilgandan keyin `a` massivining qiymati qanday bo'ladi?\n```javascript\nconst a = [1, 2];\nconst b = a;\nb.push(3);\n```",
    "options": [
      "`[1, 2]`",
      "`[1, 2, 3]`",
      "`[3]`",
      "`TypeError: const o'zgaruvchini o'zgartirib bo'lmaydi`"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da massivlar va obyektlar havola (reference) orqali saqlanadi. `const b = a` yozilganda `b` ham `a` ko'rsatib turgan xotira manziliga bog'lanadi. Shuning uchun `b` orqali kiritilgan o'zgarish `a` da ham aks etadi."
  },
  {
    "id": 10,
    "question": "Quyidagi kod bajarilganda qanday natija chiqadi?\n```javascript\nparseInt('0.0000005')\n```",
    "options": [
      "`0`",
      "`5`",
      "`NaN`",
      "`null`"
    ],
    "correctAnswer": 1,
    "explanation": "`parseInt` o'ziga kelgan birinchi argumentni string-ga o'giradi. `0.0000005` soni string bo'lganda ilmiy ko'rinishga o'tadi: `'5e-7'`. `parseInt` esa ushbu satr boshidagi `'5'` raqamini ajratib olib, 5 sonini qaytaradi."
  },
  {
    "id": 11,
    "question": "JavaScript-da `Array(3).map(() => 1)` metodi qanday massiv qaytaradi?",
    "options": [
      "`[1, 1, 1]`",
      "`[empty × 3]` (bo'sh slotli massiv)",
      "`[undefined, undefined, undefined]`",
      "`[1]`"
    ],
    "correctAnswer": 1,
    "explanation": "`Array(3)` faqatgina massiv uzunligini (length) belgilaydi, lekin xotirada haqiqiy elementlarni yaratmaydi (ular empty slots yoki bo'sh kataklar deyiladi). `map()` kabi metodlar esa bo'sh slotlarni sakrab o'tadi va ularni qayta ishlamaydi."
  },
  {
    "id": 12,
    "question": "JavaScript-da argumentsiz chaqirilgan `Math.min() > Math.max()` sharti nima qaytaradi?",
    "options": [
      "`false`",
      "`true`, chunki Math.min() default qiymati Infinity, Math.max() niki esa -Infinity",
      "`NaN`",
      "`TypeError`"
    ],
    "correctAnswer": 1,
    "explanation": "`Math.min()` argumentsiz chaqirilganda qiyoslanadigan eng katta sonni qaytarishi kerak, shuning uchun u `Infinity` beradi. `Math.max()` esa mos ravishda `-Infinity` beradi. Natijada `Infinity > -Infinity` sharti bajarilib `true` qaytadi."
  }
]

};
