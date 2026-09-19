export const es6Features = {
  id: "es6Features",
  title: "ES6+ Yangi Imkoniyatlari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish (Beginner Analogy)

Tasavvur qiling, siz **eski mexanik yozuv mashinkasidan** (eski JS - ES5) zamonaviy **smartfon yoki noutbukka** (ES6+) o'tdingiz. Eski yozuv mashinkasida biror xato qilsangiz yoki matnni nusxalamoqchi bo'lsangiz, hammasini boshidan yozishga majbur edingiz (ortiqcha kodlar, uzun sintaksislar, \\\`var\\\` dagi muammolar).

Smartfonda esa avtomatik to'ldirish (Arrow funksiyalar), nusxalash/joylash tugmalari (Spread/Rest operatori), tayyor andozalar (Template Literals) va ma'lumotlarni oson ajratish (Destructuring) kabi qulayliklar bor. Ishingiz ancha osonlashdi va vaqtingiz tejaldi. Xuddi shunday, ES6+ bizga kodni qisqa, tushunarli va kuchli qilib yozish vositalarini taqdim etadi.

---

## 2. 🧠 Deep Dive (Under the hood, memory, V8 engine, performance)

### 2.1 Leksik muhit va \\\`let\\\` / \\\`const\\\`
ES6+ gacha faqat \\\`var\\\` mavjud edi. \\\`var\\\` funksiya darajasidagi ko'lamga (Function Scope) ega va \\\`Hoisting\\\` tufayli kutilmagan xatoliklarga olib kelar edi. V8 engine \\\`let\\\` va \\\`const\\\` ni blok darajasida (Block Scope) saqlaydi. 
Lexical Environment (Leksik Muhit) ichida \\\`let\\\` va \\\`const\\\` o'zgaruvchilari uchun xotira ajratiladi, biroq ular e'lon qilinishigacha ularga murojaat qilish imkonsiz: bu **Temporal Dead Zone (TDZ)** deyiladi.

\\\`\\\`\\\`javascript
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
\\\`\\\`\\\`

### 2.2 Arrow Functions va Context (\\\`this\\\`)
Oddiy funksiyalar o'zining shaxsiy \\\`this\\\` obyekti bilan chaqiriladi. V8 engine har bir an'anaviy funksiya chaqirilganda Execution Context uchun yangi \\\`this\\\` ulaydi. 
**Arrow function** esa shaxsiy \\\`this\\\` yaratmaydi. U o'zini o'rab turgan leksik muhitdagi (Lexical Scope) \\\`this\\\` ni meros qilib oladi. Bu xotirani optimallashtiradi va "binding" muammolarini yo'q qiladi.

\\\`\\\`\\\`javascript
const obj = {
  value: 42,
  regularFunc: function() {
    setTimeout(function() {
      console.log(this.value); // undefined (this = window/global)
    }, 100);
  },
  arrowFunc: function() {
    setTimeout(() => {
      console.log(this.value); // 42 (Lexical this)
    }, 100);
  }
};
\\\`\\\`\\\`

### 2.3 Spread/Rest operatori va xotira boshqaruvi
\\\`[...arr]\\\` yoki \\\`{...obj}\\\` orqali spread amalga oshirilganda, dvigatel xotiraning Heap qismida yangi obyekt/massiv uchun joy ajratadi (Shallow copy). 

---

## 3. ⚠️ Edge Cases va Senior Interview Savollari

### 3.1 Edge Case: \\\`const\\\` bilan e'lon qilingan obyektlar
\\\`const\\\` o'zgaruvchi qayta o'zlashtirilishi mumkin emas, biroq uni obyekt yoki massivning xususiyatlarini o'zgartirish taqiqlanmagan, chunki \\\`const\\\` faqat "reference"ni (havolani) o'zgarmas qiladi, uning ichidagi ma'lumotlarni emas.

### 3.2 Senior Interview Questions
1. **TDZ (Temporal Dead Zone) mexanizmini V8 qanday bajaradi?**
   V8 parsing bosqichida blok ichidagi barcha \\\`let\\\` va \\\`const\\\` larni ro'yxatga oladi. Ammo "initialization" bosqichiga qadar (ya'ni qator bajarilmaguncha) bu o'zgaruvchilarni flag orqali (masalan, \\\`uninitialized\\\`) belgilaydi. TDZ ga kirish ReferenceError otadi.
2. **Arrow funksiyani \\\`bind\\\`, \\\`call\\\` yoki \\\`apply\\\` yordamida kontekstini o'zgartirsa bo'ladimi?**
   Yo'q. Arrow funksiyaning \\\`this\\\` konteksti qattiq bog'langan (hard-bound) hisoblanadi. Siz unga boshqa kontekst uzatsangiz ham, u o'zining leksik muhitidagi \\\`this\\\` ni ishlataveradi.
3. **\\\`Object.assign\\\` va Spread Operator (\\\`...\\\`) orasidagi farq nima?**
   Ikkalasi ham shallow copy (sayoz nusxa) yaratadi, ammo Spread Operator obyektdagi accessor'larni (getter/setter) chaqirmaydi va o'zlashtiriladigan natijada yangi qiymat sifatida tushadi, Object.assign esa target obyektdagi setterlarni chaqirishi mumkin.

---

## 4. 📊 Diagramma: ES6+ Imkoniyatlari Xaritasi

\\\`\\\`\\\`mermaid
graph TD
    A[ES6+ Features] --> B[Variables]
    A --> C[Functions]
    A --> D[Objects and Arrays]
    B --> B1[let: Block Scoped]
    B --> B2[const: Immutable Reference]
    C --> C1[Arrow Functions]
    C --> C2[Default Parameters]
    D --> D1[Destructuring]
    D --> D2[Spread and Rest]
    D --> D3[Template Literals]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Object Property Shorthand va Template Literals",
      instruction: "Taqdim etilgan 'name' va 'age' o'zgaruvchilaridan foydalanib, Object Property Shorthand orqali 'user' obyektini yarating. So'ngra template literals yordamida 'Ism: [name], Yosh: [age]' matnini 'info' o'zgaruvchisiga saqlang.",
      startingCode: "const name = 'Ali';\nconst age = 25;\n\n// Kodni shu yerda yozing\n",
      hint: "const user = { name, age }; const info = `Ism: ${name}, Yosh: ${age}`;",
      test: "if (code.includes('name: name')) return 'Object property shorthand ishlatilmadi';\nif (!code.includes('`')) return 'Template literal (backtick) ishlatilmadi';\nconst sandbox = new Function(code + '; return {user, info};');\nconst res = sandbox();\nif (res && res.user && res.user.name === 'Ali' && res.info === 'Ism: Ali, Yosh: 25') return null;\nreturn 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Logical Nullish Assignment (??=)",
      instruction: "'config' obyektidagi 'theme' va 'volume' parametrlarini tekshiring. Agar 'volume' mavjud bo'lmasa yoki nullish bo'lsa, '??=' yordamida unga 50 qiymatini default qilib o'rnating.",
      startingCode: "const config = { theme: 'dark', volume: null };\n\n// Kodni shu yerda yozing\n",
      hint: "config.volume ??= 50;",
      test: "if (!code.includes('??=')) return 'Logical Nullish Assignment (??=) operatori ishlatilmadi';\nconst sandbox = new Function(code + '; return config;');\nconst res = sandbox();\nif (res && res.volume === 50) return null;\nreturn 'volume qiymati noto\\'g\\'ri belgilandi';"
    },
    {
      id: 3,
      title: "Object.fromEntries yordamida Obyekt Yaratish",
      instruction: "Taqdim etilgan kalit-qiymat juftliklaridan iborat 'entries' massivini 'Object.fromEntries' yordamida obyektga aylantiring va natijani 'userObj' o'zgaruvchisiga saqlang.",
      startingCode: "const entries = [['username', 'ali12'], ['role', 'user']];\n\n// Kodni shu yerda yozing\n",
      hint: "const userObj = Object.fromEntries(entries);",
      test: "if (!code.includes('Object.fromEntries')) return 'Object.fromEntries ishlatilmadi';\nconst sandbox = new Function(code + '; return userObj;');\nconst res = sandbox();\nif (res && res.username === 'ali12' && res.role === 'user') return null;\nreturn 'userObj obyekti noto\\'g\\'ri yaratildi';"
    },
    {
      id: 4,
      title: "Arrow Function yordamida massiv filtrlash",
      instruction: "Arrow function yordamida 'numbers' massividan faqat juft sonlarni ajratib oladigan 'evenNumbers' o'zgaruvchisini yarating. filter() metodidan foydalaning.",
      startingCode: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Kodni shu yerda yozing\n",
      hint: "const evenNumbers = numbers.filter(n => n % 2 === 0);",
      test: "if (!code.includes('=>')) return 'Arrow function ishlatilmadi';\nif (!code.includes('filter')) return 'filter() metodi ishlatilmadi';\nconst sandbox = new Function(code + '; return evenNumbers;');\nconst res = sandbox();\nif (res && JSON.stringify(res) === '[2,4,6,8,10]') return null;\nreturn 'evenNumbers massivi noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Obyekt Destructuring va Default Qiymat",
      instruction: "Berilgan 'product' obyektidan destructuring yordamida 'name', 'price' va 'currency' o'zgaruvchilarini ajrating. Agar 'currency' mavjud bo'lmasa, unga 'UZS' default qiymatini bering.",
      startingCode: "const product = { name: 'Telefon', price: 5000000 };\n\n// Kodni shu yerda yozing\n",
      hint: "const { name, price, currency = 'UZS' } = product;",
      test: "if (!code.includes('{') || !code.includes('}')) return 'Destructuring ishlatilmadi';\nconst sandbox = new Function(code + '; return { name, price, currency };');\nconst res = sandbox();\nif (res && res.name === 'Telefon' && res.price === 5000000 && res.currency === 'UZS') return null;\nreturn 'Destructuring noto\\'g\\'ri bajarildi';"
    },
    {
      id: 6,
      title: "Rest Operatori bilan Funksiya Yaratish",
      instruction: "Rest operatori (...) yordamida istalgan sondagi argumentlarni qabul qilib, ularning o'rtacha qiymatini (average) qaytaradigan 'average' funksiyasini yozing.",
      startingCode: "// Kodni shu yerda yozing\n// Masalan: average(10, 20, 30) => 20\n",
      hint: "const average = (...nums) => nums.reduce((a, b) => a + b, 0) / nums.length;",
      test: "if (!code.includes('...')) return 'Rest operatori (...) ishlatilmadi';\nconst sandbox = new Function(code + '; return [average(10, 20, 30), average(4, 8), average(100)];');\nconst res = sandbox();\nif (res && res[0] === 20 && res[1] === 6 && res[2] === 100) return null;\nreturn 'average funksiyasi noto\\'g\\'ri ishlayapti';"
    },
    {
      id: 7,
      title: "Spread Operatori bilan Massivlarni Birlashtirish",
      instruction: "Spread operatori yordamida 'fruits' va 'vegetables' massivlarini birlashtirib, yangi 'allProducts' massivini yarating. Massiv boshiga 'Non' va oxiriga 'Suv' elementlarini ham qo'shing.",
      startingCode: "const fruits = ['Olma', 'Nok'];\nconst vegetables = ['Sabzi', 'Kartoshka'];\n\n// Kodni shu yerda yozing\n",
      hint: "const allProducts = ['Non', ...fruits, ...vegetables, 'Suv'];",
      test: "if (!code.includes('...')) return 'Spread operatori (...) ishlatilmadi';\nconst sandbox = new Function(code + '; return allProducts;');\nconst res = sandbox();\nif (res && res[0] === 'Non' && res[1] === 'Olma' && res[2] === 'Nok' && res[3] === 'Sabzi' && res[4] === 'Kartoshka' && res[5] === 'Suv' && res.length === 6) return null;\nreturn 'allProducts massivi noto\\'g\\'ri tuzildi';"
    },
    {
      id: 8,
      title: "Array.findLast() yordamida Oxirgi Elementni Topish",
      instruction: "'students' massividan 'findLast' metodi yordamida bahosi 90 dan yuqori bo'lgan oxirgi talabani toping va natijani 'topStudent' o'zgaruvchisiga saqlang.",
      startingCode: "const students = [\n  { name: 'Ali', score: 95 },\n  { name: 'Vali', score: 78 },\n  { name: 'Hasan', score: 92 },\n  { name: 'Husan', score: 88 }\n];\n\n// Kodni shu yerda yozing\n",
      hint: "const topStudent = students.findLast(s => s.score > 90);",
      test: "if (!code.includes('findLast')) return 'findLast() metodi ishlatilmadi';\nconst sandbox = new Function(code + '; return topStudent;');\nconst res = sandbox();\nif (res && res.name === 'Hasan' && res.score === 92) return null;\nreturn 'topStudent noto\\'g\\'ri topildi';"
    },
    {
      id: 9,
      title: "Ko'p Qatorli Template Literals va Hisoblash",
      instruction: "Template literal yordamida ko'p qatorli 'receipt' (chek) matni yarating. Matnda mahsulot nomi, narxi va miqdori ko'rsatilsin, hamda jami summa hisoblansin. Format: 'Mahsulot: [name]\\nNarx: [price] so\\'m\\nMiqdor: [qty] ta\\nJami: [price*qty] so\\'m'",
      startingCode: "const itemName = 'Kitob';\nconst price = 45000;\nconst qty = 3;\n\n// Kodni shu yerda yozing\n",
      hint: "const receipt = `Mahsulot: ${itemName}\\nNarx: ${price} so'm\\nMiqdor: ${qty} ta\\nJami: ${price * qty} so'm`;",
      test: "if (!code.includes('`')) return 'Template literal (backtick) ishlatilmadi';\nif (!code.includes('${')) return 'Template literal interpolatsiya (${}) ishlatilmadi';\nconst sandbox = new Function(code + '; return receipt;');\nconst res = sandbox();\nif (res && res.includes('Kitob') && res.includes('45000') && res.includes('135000')) return null;\nreturn 'receipt matni noto\\'g\\'ri tuzildi';"
    },
    {
      id: 10,
      title: "ES6 Class va Extends (Merosxo'rlik)",
      instruction: "'Animal' klassini yarating: constructor 'name' va 'sound' qabul qilsin, 'speak()' metodi '[name] [sound] deydi' matnini qaytarsin. Keyin 'Dog' klassini 'Animal' dan meros oling va uning constructorida 'name' qabul qilib, 'sound' ni 'Vov-vov' qilib superlarga uzating.",
      startingCode: "// Kodni shu yerda yozing\n// Masalan: const dog = new Dog('Toshboy');\n// dog.speak() => 'Toshboy Vov-vov deydi'\n",
      hint: "class Animal { constructor(name, sound) { this.name = name; this.sound = sound; } speak() { return `${this.name} ${this.sound} deydi`; } } class Dog extends Animal { constructor(name) { super(name, 'Vov-vov'); } }",
      test: "if (!code.includes('class')) return 'class kalit so\\'zi ishlatilmadi';\nif (!code.includes('extends')) return 'extends (merosxo\\'rlik) ishlatilmadi';\nif (!code.includes('super')) return 'super() chaqiruvi ishlatilmadi';\nconst sandbox = new Function(code + '; const d = new Dog(\"Toshboy\"); return d.speak();');\nconst res = sandbox();\nif (res === 'Toshboy Vov-vov deydi') return null;\nreturn 'speak() metodi noto\\'g\\'ri natija qaytardi: ' + res;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Object Property Shorthand (ES6) yordamida obyekt yaratishda kalit va o'zgaruvchi nomi bir xil bo'lsa qanday yoziladi?",
      options: [
        "`const user = { name: name };`",
        "`const user = { name };`",
        "`const user = { name = name };`",
        "`const user = { ism: name };`"
      ],
      correctAnswer: 1,
      explanation: "ES6-da, agar obyekt kaliti va unga beriladigan qiymat o'zgaruvchisining nomi bir xil bo'lsa, shunchaki `{ name }` deb qisqartirib yozish mumkin."
    },
    {
      id: 2,
      question: "Template Literals (ES6) da matn ichida dinamik ifodalarni joylashtirish qaysi qavslar yordamida amalga oshiriladi?",
      options: [
        "`${expression}`",
        "`#{expression}`",
        "`{{expression}}`",
        "`[expression]`"
      ],
      correctAnswer: 0,
      explanation: "Template literals (backticks) ichida dinamik o'zgaruvchilar yoki ifodalarni kiritish uchun `${...}` sintaksisi qo'llaniladi."
    },
    {
      id: 3,
      question: "Logical Nullish Assignment (`??=`) operatori qachon o'zlashtirishni (assignment) amalga oshiradi?",
      options: [
        "Chap tomondagi qiymat har qanday Falsy qiymat bo'lsa",
        "Chap tomondagi qiymat faqat `null` yoki `undefined` bo'lsa",
        "Chap tomondagi qiymat faqat `false` bo'lsa",
        "Har doim o'zlashtiradi"
      ],
      correctAnswer: 1,
      explanation: "`??=` operatori faqatgina chap tomondagi o'zgaruvchi qiymati nullish (ya'ni `null` yoki `undefined`) bo'lgandagina o'ng tomondagi qiymatni o'zlashtiradi."
    },
    {
      id: 4,
      question: "Quyidagi kod bajarilgandan keyin `config.volume` qiymati nima bo'ladi?\n```javascript\nconst config = { volume: 0 };\nconfig.volume ??= 100;\n```",
      options: [
        "`100`",
        "`0` (chunki 0 null yoki undefined emas)",
        "`undefined`",
        "`TypeError` xatosi"
      ],
      correctAnswer: 1,
      explanation: "`0` - nullish qiymat emas. Shu sababli `??=` operatori o'zlashtirishni bajarmaydi va original `0` qiymatini qoldiradi."
    },
    {
      id: 5,
      question: "Key-value juftliklaridan iborat massivni (entries) qaytadan obyektga o'girish uchun qaysi metod ishlatiladi?",
      options: [
        "`Object.entries()`",
        "`Object.fromEntries()`",
        "`Object.toObject()`",
        "`JSON.parse()`"
      ],
      correctAnswer: 1,
      explanation: "`Object.fromEntries()` metodi `[key, value]` ko'rinishidagi massiv yoki iterablarni qabul qilib, ularni oddiy obyektga aylantiradi."
    },
    {
      id: 6,
      question: "Quyidagi koddan keyin `lastEven` o'zgaruvchisi qiymati nima bo'ladi (ES2023)?\n```javascript\nconst nums = [1, 2, 3, 4, 5];\nconst lastEven = nums.findLast(x => x % 2 === 0);\n```",
      options: [
        "`2`",
        "`4` (oxirgi juft son)",
        "`undefined`",
        "`5`"
      ],
      correctAnswer: 1,
      explanation: "`findLast()` metodi massivning oxiridan boshlab qidiradi va shartga mos keladigan birinchi elementni (ya'ni oxirgi juft son - 4 ni) qaytaradi."
    },
    {
      id: 7,
      question: "JavaScript ES6 (2015) versiyasigacha o'zgaruvchilar yaratish uchun qaysi kalit so'zi ishlatilgan?",
      options: [
        "`let`",
        "`const`",
        "`var`",
        "`def`"
      ],
      correctAnswer: 2,
      explanation: "ES6 versiyasigacha JavaScript-da faqat `var` kalit so'zi yordamida o'zgaruvchilar e'lon qilingan. ES6 da `let` va `const` qo'shildi."
    },
    {
      id: 8,
      question: "ES2020 da qo'shilgan String.prototype.matchAll() metodi qanday natija qaytaradi?",
      options: [
        "Barcha mos kelgan natijalar massivini (Array)",
        "RegEx guruhlari bo'yicha barcha mosliklarning iteratorini (Iterator)",
        "Faqat birinchi mos kelgan satrni",
        "Muvaffaqiyatli bo'lsa true, bo'lmasa false"
      ],
      correctAnswer: 1,
      explanation: "`matchAll()` regex mosliklari bo'yicha guruhlar va indekslarni o'z ichiga olgan to'liq iterator (iterable) qaytaradi."
    },
    {
      id: 9,
      question: "Quyidagi kod bajarilganda `user.role` qiymati nima bo'ladi?\n```javascript\nlet user = { role: 'user' };\nuser.role &&= 'admin';\n```",
      options: [
        "`'admin'` (chunki 'user' truthy qiymat)",
        "`'user'`",
        "`true`",
        "`undefined`"
      ],
      correctAnswer: 0,
      explanation: "`&&=` operatori chap tomon truthy bo'lgandagina o'ng tomondagi qiymatni o'zlashtiradi. `user.role` ('user') truthy bo'lgani uchun unga 'admin' yoziladi."
    },
    {
      id: 10,
      question: "Logical OR Assignment (`||=`) operatori qachon o'zlashtiradi?",
      options: [
        "Chap tomondagi o'zgaruvchi har qanday Falsy qiymat (0, null, undefined, '', false) bo'lsa",
        "Faqat undefined bo'lsa",
        "Faqat true bo'lsa",
        "Faqat son bo'lsa"
      ],
      correctAnswer: 0,
      explanation: "`||=` operatori chap tomondagi qiymat har qanday falsy bo'lsa (jumladan `0`, `\"\"`, `false` va h.k.) o'ng tomondagiga o'zgartiradi."
    },
    {
      id: 11,
      question: "ES2022-da massivlar uchun kiritilgan `.at()` metodining oddiy kvadrat qavslardan (`arr[index]`) farqi nimada?",
      options: [
        "U faqat musbat indekslar bilan ishlaydi",
        "U manfiy indekslarni ham qo'llab-quvvatlaydi (masalan, `arr.at(-1)` massivning oxirgi elementini beradi)",
        "U elementni o'chirib yuboradi",
        "U faqat stringlar bilan ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "`.at(-1)` massiv oxiridan boshlab elementlarni oson o'qish imkonini beradi. Oddiy qavslarda `arr[-1]` xato yoki `undefined` beradi."
    },
    {
      id: 12,
      question: "JavaScript standartlarini yangilab boruvchi va TC39 komiteti tomonidan boshqariladigan texnik hujjat qanday nomlanadi?",
      options: [
        "ECMAScript (ES)",
        "JavaSpec",
        "Web API Specification",
        "TypeScript Spec"
      ],
      correctAnswer: 0,
      explanation: "JavaScript tili ECMAScript standarti (qisqacha ES) asosida standartlashtiriladi va rivojlantiriladi."
    }
  ]
};
