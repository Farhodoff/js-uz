export const es6Features = {
  id: "es6Features",
  title: "ES6+ Yangi Xususiyatlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### ES6+ Yangi Xususiyatlari nima?
**ES6+ (ECMAScript 2015 va undan keyingi versiyalar)** — bu JavaScript dasturlash tilining rivojlanish jarayonida qo'shilgan eng zamonaviy, qulay va qisqa sintaktik imkoniyatlaridir. Ular kod hajmini sezilarli darajada qisqartirib, xavfsiz va oson o'qiladigan dasturlar yozishga yordam beradi.

### Real hayotiy analogiya
Tasavvur qiling, siz **eski mexanik velosiped haydayapsiz**:
* Har safar tepalikka chiqishda juda ko'p kuch (ortiqcha kod) sarflaysiz.
* **ES6+ (Aqlli elektr velosiped):** Endi sizda tepalikka chiqish uchun yordamchi motor (arrow funksiyalar), yiqilishdan asraydigan sensorli tormoz (optional chaining \`?.\`), va avtomatik chiroqlar (template literals) bor. Siz kamroq jismoniy kuch sarflaysiz, lekin tezroq va xavfsizroq yurasiz.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Object Property Shorthand va Template Literals)
\`\`\`javascript
const name = "Ali";
const age = 25;

// Eski usul:
// const user = { name: name, age: age };
// const info = "Ismi: " + name + ", Yoshi: " + age;

// ES6+ usuli:
const user = { name, age }; // Shorthand
const info = \`Ismi: \${name}, Yoshi: \${age}\`; // Template Literal
\`\`\`

### 2. Intermediate Example (Logical Assignment Operators: \`||=\`, \`&&=\`, \`??=\`)
Qiymatlarni shartli tekshirib o'zlashtirishni juda qisqa yozish:
\`\`\`javascript
const config = { theme: "dark" };

// Agar count mavjud bo'lmasa yoki nullish bo'lsa, default 10 beraiz:
config.count ??= 10; 

// Agar theme bor bo'lsa, uni log qilamiz (&&=)
config.theme &&= "light"; 
\`\`\`

### 3. Advanced Example (Array findLast va Object.fromEntries)
ES2022+ va ES2019+ yordamida obyektlar va massivlarni professional boshqarish:
\`\`\`javascript
const records = [10, 5, 8, 20, 15];

// Massiv oxiridan shartga mos birinchi elementni topish (findLast)
const lastLarge = records.findLast(x => x > 10); // 15

// Key-value juftliklar massivini obyektga o'girish
const entries = [["name", "Bobur"], ["role", "admin"]];
const obj = Object.fromEntries(entries); // { name: "Bobur", role: "admin" }
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Syntactic Sugar va TC39 Komiteti
JavaScript-ga har yili qo'shiladigan yangi imkoniyatlar **TC39** (Ecma International texnik komiteti) tomonidan 4 bosqichli sinovdan o'tkazilib, standartga kiritiladi. Bu yangi sintaksislar brauzer dvigatelida (masalan, V8) optimallashtirilgan C++ funksiyalariga tarjima qilinadi.
* **Transpiling (Babel):** Eski brauzerlar tushunishi uchun yangi ES6+ kodlari odatda **Babel** yordamida ES5 (eski JS) formatiga o'giriladi (masalan, \`let/const\` -> \`var\`).

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### API response'dan kelgan ma'lumotlarni zamonaviy formatlash
Keling, bir nechta ES6+ imkoniyatlarini birlashtirib, ma'lumotlarni tozalaymiz.

\`\`\`javascript
const rawUser = {
  id: 101,
  details: {
    first_name: "Farhod",
    last_name: "Umarov"
  },
  roles: null
};

// 1. Destructuring va Default qiymat
const { details: { first_name: firstName }, roles } = rawUser;

// 2. Nullish Coalescing
const activeRoles = roles ?? ["guest"];

// 3. String interpolatsiyasi
const welcomeMessage = \`Salom, \${firstName}! Roli: \${activeRoles.join(", ")}\`;

console.log(welcomeMessage); // "Salom, Farhod! Roli: guest"
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. \`??\` o'rniga \`||\` ishlatish xavfi
* **Noto'g'ri:**
  \`\`\`javascript
  const volume = 0;
  const finalVolume = volume || 50; // 50 (chunki 0 falsy. Lekin foydalanuvchi ovozni o'chirgan edi!)
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const volume = 0;
  const finalVolume = volume ?? 50; // 0 (chunki 0 null/undefined emas, u saqlab qolinadi)
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Xususiyati | Sintaksis | Vazifasi | Qo'shilgan yili |
| :--- | :--- | :--- | :--- |
| **Object property shorthand** | \`{ name }\` | Kalit va qiymat nomi bir xil bo'lsa qisqartirish | ES6 (2015) |
| **Template Literals** | \`\` \`Hello \${name}\` \`\` | Matn va o'zgaruvchilarni dinamik ulash | ES6 (2015) |
| **Logical Assignment** | \`a ??= b\` | Faqat nullish bo'lsa o'zlashtirish | ES2021 |
| **Object.fromEntries** | \`Object.fromEntries(arr)\` | Array-entry formatni obyektga o'girish | ES2019 |
| **Array findLast** | \`arr.findLast(fn)\` | Oxiridan boshlab qidirish | ES2023 |

---

## 7. ❓ Savollar va Javoblar

### 1. Nega ES6 JavaScript tarixidagi eng muhim yangilanish hisoblanadi?
Chunki ES6 da tilga butunlay yangi arxitekturalar: \`let/const\`, Arrow funksiyalar, Klasslar, Modullar, Promise-lar, Destructuring va Spread/Rest kabi fundamental mexanizmlar olib kirildi.

### 2. \`let/const\` va \`var\` farqi nimada?
\`var\` funksiyaviy scope (scope)ga ega va hoisted bo'ladi. \`let/const\` esa bloki doirasida (block scope) ishlaydi, hoisted bo'lmaydi (TDZda bo'ladi) va qayta e'lon qilishni taqiqlaydi.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`??=\` operatori qachon o'zlashtirish bajaradi?
2. \`[...arr]\` spread operatori qaysi yili standartga kirgan? (ES6 - 2015, obyekt spread esa ES2018 da).
3. JavaScript-dagi yangi xususiyatlar taklifini qaysi komitet boshqaradi? (TC39 komiteti).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi testlar va mashqlar yordamida modern JavaScript imkoniyatlaridan foydalanish bo'yicha ko'nikmalaringizni tekshiring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Object Property Shorthand va Template Literals",
    "instruction": "Taqdim etilgan 'name' va 'age' o'zgaruvchilaridan foydalanib, Object Property Shorthand orqali 'user' obyektini yarating. So'ngra template literals yordamida 'Ism: [name], Yosh: [age]' matnini 'info' o'zgaruvchisiga saqlang.",
    "startingCode": "const name = 'Ali';\nconst age = 25;\n\n// Kodni shu yerda yozing\n",
    "hint": "const user = { name, age }; const info = `Ism: ${name}, Yosh: ${age}`;",
    "test": "if (code.includes('name: name')) return 'Object property shorthand ishlatilmadi';\nif (!code.includes('`')) return 'Template literal (backtick) ishlatilmadi';\nconst sandbox = new Function(code + '; return {user, info};');\nconst res = sandbox();\nif (res.user.name === 'Ali' && res.info === 'Ism: Ali, Yosh: 25') return null;\nreturn 'Natija noto\\'g\\'ri';"
  },
  {
    "id": 2,
    "title": "Logical Nullish Assignment (??=)",
    "instruction": "'config' obyektidagi 'theme' va 'volume' parametrlarini tekshiring. Agar 'volume' mavjud bo'lmasa yoki nullish bo'lsa, '??=' yordamida unga 50 qiymatini default qilib o'rnating.",
    "startingCode": "const config = { theme: 'dark', volume: null };\n\n// Kodni shu yerda yozing\n",
    "hint": "config.volume ??= 50;",
    "test": "if (!code.includes('??=')) return 'Logical Nullish Assignment (??=) operatori ishlatilmadi';\nconst sandbox = new Function('config', code + '; return config;');\nconst conf = { theme: 'dark', volume: null };\nsandbox(conf);\nif (conf.volume === 50) return null;\nreturn 'volume qiymati noto\\'g\\'ri belgilandi';"
  },
  {
    "id": 3,
    "title": "Object.fromEntries yordamida Obyekt Yaratish",
    "instruction": "Taqdim etilgan kalit-qiymat juftliklaridan iborat 'entries' massivini 'Object.fromEntries' yordamida obyektga aylantiring va natijani 'userObj' o'zgaruvchisiga saqlang.",
    "startingCode": "const entries = [['username', 'ali12'], ['role', 'user']];\n\n// Kodni shu yerda yozing\n",
    "hint": "const userObj = Object.fromEntries(entries);",
    "test": "if (!code.includes('Object.fromEntries')) return 'Object.fromEntries ishlatilmadi';\nconst sandbox = new Function('entries', code + '; return userObj;');\nconst res = sandbox([['username', 'ali12'], ['role', 'user']]);\nif (res && res.username === 'ali12' && res.role === 'user') return null;\nreturn 'userObj obyekti noto\\'g\\'ri yaratildi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "Object Property Shorthand (ES6) yordamida obyekt yaratishda kalit va o'zgaruvchi nomi bir xil bo'lsa qanday yoziladi?",
    "options": [
      "`const user = { name: name };`",
      "`const user = { name };`",
      "`const user = { name = name };`",
      "`const user = { ism: name };`"
    ],
    "correctAnswer": 1,
    "explanation": "ES6-da, agar obyekt kaliti va unga beriladigan qiymat o'zgaruvchisining nomi bir xil bo'lsa, shunchaki `{ name }` deb qisqartirib yozish mumkin."
  },
  {
    "id": 2,
    "question": "Template Literals (ES6) da matn ichida dinamik ifodalarni joylashtirish qaysi qavslar yordamida amalga oshiriladi?",
    "options": [
      "`${expression}`",
      "`#{expression}`",
      "`{{expression}}`",
      "`[expression]`"
    ],
    "correctAnswer": 0,
    "explanation": "Template literals (backticks `` ` ``) ichida dinamik o'zgaruvchilar yoki ifodalarni kiritish uchun `${...}` sintaksisi qo'llaniladi."
  },
  {
    "id": 3,
    "question": "Logical Nullish Assignment (`??=`) operatori qachon o'zlashtirishni (assignment) amalga oshiradi?",
    "options": [
      "Chap tomondagi qiymat har qanday Falsy qiymat bo'lsa",
      "Chap tomondagi qiymat faqat `null` yoki `undefined` bo'lsa",
      "Chap tomondagi qiymat faqat `false` bo'lsa",
      "Har doim o'zlashtiradi"
    ],
    "correctAnswer": 1,
    "explanation": "`??=` operatori faqatgina chap tomondagi o'zgaruvchi qiymati nullish (ya'ni `null` yoki `undefined`) bo'lgandagina o'ng tomondagi qiymatni o'zlashtiradi."
  },
  {
    "id": 4,
    "question": "Quyidagi kod bajarilgandan keyin `config.volume` qiymati nima bo'ladi?\n```javascript\nconst config = { volume: 0 };\nconfig.volume ??= 100;\n```",
    "options": [
      "`100`",
      "`0` (chunki 0 null yoki undefined emas)",
      "`undefined`",
      "`TypeError` xatosi"
    ],
    "correctAnswer": 1,
    "explanation": "`0` - nullish qiymat emas. Shu sababli `??=` operatori o'zlashtirishni bajarmaydi va original `0` qiymatini qoldiradi."
  },
  {
    "id": 5,
    "question": "Key-value juftliklaridan iborat massivni (entries) qaytadan obyektga o'girish uchun qaysi metod ishlatiladi?",
    "options": [
      "`Object.entries()`",
      "`Object.fromEntries()`",
      "`Object.toObject()`",
      "`JSON.parse()`"
    ],
    "correctAnswer": 1,
    "explanation": "`Object.fromEntries()` metodi `[key, value]` ko'rinishidagi massiv yoki iterablarni qabul qilib, ularni oddiy obyektga aylantiradi."
  },
  {
    "id": 6,
    "question": "Quyidagi koddan keyin `lastEven` o'zgaruvchisi qiymati nima bo'ladi (ES2023)?\n```javascript\nconst nums = [1, 2, 3, 4, 5];\nconst lastEven = nums.findLast(x => x % 2 === 0);\n```",
    "options": [
      "`2`",
      "`4` (oxirgi juft son)",
      "`undefined`",
      "`5`"
    ],
    "correctAnswer": 1,
    "explanation": "`findLast()` metodi massivning oxiridan boshlab qidiradi va shartga mos keladigan birinchi elementni (ya'ni oxirgi juft son - 4 ni) qaytaradi."
  },
  {
    "id": 7,
    "question": "JavaScript ES6 (2015) versiyasigacha o'zgaruvchilar yaratish uchun qaysi kalit so'zi ishlatilgan?",
    "options": [
      "`let`",
      "`const`",
      "`var`",
      "`def`"
    ],
    "correctAnswer": 2,
    "explanation": "ES6 versiyasigacha JavaScript-da faqat `var` kalit so'zi yordamida o'zgaruvchilar e'lon qilingan. ES6 da `let` va `const` qo'shildi."
  },
  {
    "id": 8,
    "question": "ES2020 da qo'shilgan String.prototype.matchAll() metodi qanday natija qaytaradi?",
    "options": [
      "Barcha mos kelgan natijalar massivini (Array)",
      "RegEx guruhlari bo'yicha barcha mosliklarning iteratorini (Iterator)",
      "Faqat birinchi mos kelgan satrni",
      "Muvaffaqiyatli bo'lsa true, bo'lmasa false"
    ],
    "correctAnswer": 1,
    "explanation": "`matchAll()` regex mosliklari bo'yicha guruhlar va indekslarni o'z ichiga olgan to'liq iterator (iterable) qaytaradi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod bajarilganda `userRole` qiymati nima bo'ladi?\n```javascript\nlet user = { role: 'user' };\nuser.role &&= 'admin';\n```",
    "options": [
      "`'admin'` (chunki 'user' truthy qiymat)",
      "`'user'`",
      "`true`",
      "`undefined`"
    ],
    "correctAnswer": 0,
    "explanation": "`&&=` operatori chap tomon truthy bo'lgandagina o'ng tomondagi qiymatni o'zlashtiradi. `user.role` ('user') truthy bo'lgani uchun unga 'admin' yoziladi."
  },
  {
    "id": 10,
    "question": "Logical OR Assignment (`||=`) operatori qachon o'zlashtiradi?",
    "options": [
      "Chap tomondagi o'zgaruvchi har qanday Falsy qiymat (0, null, undefined, '', false) bo'lsa",
      "Faqat undefined bo'lsa",
      "Faqat true bo'lsa",
      "Faqat son bo'lsa"
    ],
    "correctAnswer": 0,
    "explanation": "`||=` operatori chap tomondagi qiymat har qanday falsy bo'lsa (jumladan `0`, `\"\"`, `false` va h.k.) o'ng tomondagiga o'zgartiradi."
  },
  {
    "id": 11,
    "question": "ES2022-da massivlar uchun kiritilgan `.at()` metodining oddiy kvadrat qavslardan (`arr[index]`) farqi nimada?",
    "options": [
      "U faqat musbat indekslar bilan ishlaydi",
      "U manfiy indekslarni ham qo'llab-quvvatlaydi (masalan, `arr.at(-1)` massivning oxirgi elementini beradi)",
      "U elementni o'chirib yuboradi",
      "U faqat stringlar bilan ishlaydi"
    ],
    "correctAnswer": 1,
    "explanation": "`.at(-1)` massiv oxiridan boshlab elementlarni oson o'qish imkonini beradi. Oddiy qavslarda `arr[-1]` xato yoki `undefined` beradi."
  },
  {
    "id": 12,
    "question": "JavaScript standartlarini yangilab boruvchi va TC39 komiteti tomonidan boshqariladigan texnik hujjat qanday nomlanadi?",
    "options": [
      "ECMAScript (ES)",
      "JavaSpec",
      "Web API Specification",
      "TypeScript Spec"
    ],
    "correctAnswer": 0,
    "explanation": "JavaScript tili ECMAScript standarti (qisqacha ES) asosida standartlashtiriladi va rivojlantiriladi."
  }
]

};
