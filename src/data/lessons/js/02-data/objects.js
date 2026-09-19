export const objects = {
  id: "objects",
  title: "Obyektlar (Objects)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish (Beginner Analogy)

Tasavvur qiling, **Obyekt (Object)** xuddi hayotdagi haqiqiy narsaga, masalan mashinaga o'xshaydi.
Oddiy o'zgaruvchilar (masalan \\\`let color = "red"\\\`) bitta ma'lumotni saqlasa, obyektlar bitta narsaga tegishli bo'lgan **ko'plab ma'lumotlarni va harakatlarni** bitta joyda guruhlab saqlaydi.
Mashinaning **xususiyatlari** bor (rangi, yili, modeli) va uning **harakatlari** bor (haydash, to'xtash).
Dasturlashda bu xususiyatlar **properties** (kalit-qiymat), harakatlar esa **methods** deb ataladi.

❌ **YOMON (Tarqoq ma'lumotlar):**
\\\`\\\`\\\`javascript
const carBrand = "Toyota";
const carColor = "Oq";
const carYear = 2022;
\\\`\\\`\\\`

✅ **YAXSHI (Guruhlangan obyekt):**
\\\`\\\`\\\`javascript
const car = {
  brand: "Toyota",
  color: "Oq",
  year: 2022,
  drive: function() {
    console.log("Vroom!");
  }
};
console.log(car.brand); // "Toyota"
car.drive(); // "Vroom!"
\\\`\\\`\\\`

Obyekt yaratishni biz ko'pincha **Object Literal** (\\\`{}\\\`) orqali amalga oshiramiz.

---

## 2. 🚀 Chuqur O'rganish (Deep Dive: Under the Hood)

### Xotirada Qanday Saqlanadi? (Heap vs Stack)
Obyektlar Javascriptda **Reference (Havola)** tipidagi ma'lumotlardir.
Primitiv qiymatlar (string, number, boolean) kompyuter xotirasining **Stack** (tezkor va kichik) qismida saqlanadi. Ammo Obyektlar kabi kattaroq ma'lumotlar **Heap** (kattaroq va moslashuvchan) qismida saqlanadi. Stack'da esa faqat Heap'dagi o'sha obyekt qayerda joylashganligini ko'rsatuvchi **manzil (reference)** saqlanadi.

Shuning uchun ikkita obyektni to'g'ridan-to'g'ri tenglashtirganimizda:
\\\`\\\`\\\`javascript
const obj1 = { name: "Ali" };
const obj2 = obj1;
obj2.name = "Vali";
console.log(obj1.name); // "Vali" - chunki ikkalasi ham bitta xotira manziliga qarab turibdi!
\\\`\\\`\\\`

### V8 Dvigateli (Engine) va Hidden Classes
Google Chrome va Node.js dagi **V8 JavaScript dvigateli** obyektlarni qanday o'qiydi?
Aslida JavaScript obyektlari xuddi "Hash Table" (lug'at) kabi ishlaydi, ya'ni kalit orqali qiymat izlash bilan. Ammo V8 uni tezlashtirish uchun **Hidden Classes (Yashirin Sinf)** tushunchasidan foydalanadi.

Agar siz bir xil tuzilishga ega (bir xil ketma-ketlikdagi kalitlari bor) obyektlar yaratsangiz, V8 xuddi C++ yoki Java-dagi kabi qat'iy tuzilgan klasslardan orqada foydalanadi va bu kod ishlashini ancha tezlashtiradi (Optimization).
Buning uchun obyektga keyinchalik tinimsiz ravishda xossalar qo'shish va o'chirish (\\\`delete obj.key\\\`) unumdorlikni biroz pasaytiradi, chunki bu Hidden Class'larni buzib yuboradi.

---

## 3. ⚠️ Chekka Holatlar va Senior Intervyu Savollari (Edge Cases & Interview Questions)

1. **Object keys har doim String (yoki Symbol) ga o'girilishi haqida bilasizmi?**
   \\\`\\\`\\\`javascript
   const obj = {};
   obj[1] = "bir";
   obj[{}] = "obyekt";
   console.log(obj["1"]); // "bir"
   console.log(obj["[object Object]"]); // "obyekt"
   \\\`\\\`\\\`
   Obyekt kalitlariga Array, Obyekt yoki raqam bersangiz, JavaScript uni bilintirmasdan satrga (String'ga) o'giradi.

2. **Obyektni "chuqur nusxalash" (Deep Clone) bilan yuzaki nusxalash (Shallow Clone) o'rtasidagi farq nima?**
   \\\`{ ...obj }\\\` yoki \\\`Object.assign({}, obj)\\\` bu faqat **yuzaki nusxa (Shallow)** qiladi. Ichida yana obyekt bo'lsa, uni havolaligicha olib o'tadi.
   **Chuqur nusxalash (Deep)** uchun avval \\\`JSON.parse(JSON.stringify(obj))\\\` ishlatilgan bo'lsa, hozirgi zamonaviy JS da \\\`structuredClone(obj)\\\` funksiyasi mavjud!

3. **Maxsus (Computed) Properties nima?**
   Kalit nomini oldindan bilmasangiz, kvadrat qavsdan foydalanamiz:
   \\\`\\\`\\\`javascript
   const keyName = "status";
   const obj = {
     [keyName]: "active"
   };
   \\\`\\\`\\\`

4. **\\\`Object.freeze()\\\` va \\\`Object.seal()\\\` farqi?**
   - \\\`freeze(obj)\\\`: Umuman hech narsani o'zgartirib ham, qo'shib ham, o'chirib ham bo'lmaydi.
   - \\\`seal(obj)\\\`: Yangi xossa qo'shib bo'lmaydi, borini o'chirib bo'lmaydi, lekin mavjud xossalarni qiymatini o'zgartirish MUMKIN.

---

## 📊 Diagramma

\\\`\\\`\\\`mermaid
flowchart TD
    A[Obyekt yaratish] --> B(Object Literal)
    B --> C{{obj = { key: value }}}
    A --> D(New Keyword)
    D --> E{{obj = new Object}}
    
    C --> F[Memory Heap]
    F --> G[Reference saqlanadi]
    
    G --> H{Xossaga murojaat}
    H --> |Dot Notation| I(obj.key)
    H --> |Bracket Notation| J(obj[keyVar])
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Obyektni yaratish va o'zgartirish",
      instruction: "Berilgan `name`, `age` va `job` qiymatlaridan foydalanib yangi obyekt yarating. Keyin uning `age` xossasini 1 taga oshiring, yangi `isProgrammer` xossasini `true` qiymati bilan qo'shing va hosil bo'lgan obyektni qaytaradigan `updatePerson(name, age, job)` funksiyasini yozing.",
      startingCode: "function updatePerson(name, age, job) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Obyekt yaratish uchun {} dan foydalaning, keyin dot notation (.) orqali age va isProgrammer xossalarini boshqaring.",
      test: "const sandbox = new Function(code + '; return updatePerson;');\nconst fn = sandbox();\nconst obj = fn('Ali', 25, 'Dasturchi');\nif (obj && obj.name === 'Ali' && obj.age === 26 && obj.job === 'Dasturchi' && obj.isProgrammer === true) return null;\nreturn 'updatePerson funksiyasi obyektni to\\'g\\'ri yaratmadi yoki o\\'zgartirmadi';"
    },
    {
      id: 2,
      title: "Dinamik Kalitlar (Bracket Notation)",
      instruction: "Berilgan `obj` obyektining dinamik `key` kaliti qiymatini berilgan `value` ga o'zgartiruvchi (yoki yangi qo'shuvchi) va o'sha obyektni qaytaruvchi `updateDynamicProperty(obj, key, value)` funksiyasini yozing. Dinamik kalitlar bilan ishlash uchun qavsli yozuvdan (Bracket Notation) foydalaning.",
      startingCode: "function updateDynamicProperty(obj, key, value) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Dinamik kalit bilan ishlash uchun nuqta operatori o'rniga obj[key] = value; ko'rinishida yozing va obyektni return qiling.",
      test: "const sandbox = new Function(code + '; return updateDynamicProperty;');\nconst fn = sandbox();\nconst testObj = { brand: 'Apple' };\nconst res = fn(testObj, 'model', 'iPhone');\nif (res && res.brand === 'Apple' && res.model === 'iPhone') return null;\nreturn 'Dinamik xossa to\\'g\\'ri yangilanmadi';"
    },
    {
      id: 3,
      title: "Metodlar va `this` kalit so'zi",
      instruction: "Berilgan `brand` va boshlang'ich `speed` qiymatlariga ega bo'lgan mashina obyektini qaytaruvchi `createCar(brand, speed)` funksiyasini yozing. Obyekt tarkibida `accelerate(amount)` metodi bo'lsin. Bu metod chaqirilganda obyektning `speed` xossasini `amount` ga oshirsin va yangilangan `speed` qiymatini qaytarsin. Metod ichida `this` kalit so'zidan foydalaning.",
      startingCode: "function createCar(brand, speed) {\n  // Kodni shu yerda yozing\n}\n",
      hint: "Obyekt ichida accelerate(amount) { this.speed += amount; return this.speed; } metodini yarating.",
      test: "const sandbox = new Function(code + '; return createCar;');\nconst fn = sandbox();\nconst car = fn('Tesla', 50);\nif (!car || typeof car.accelerate !== 'function') return 'createCar to\\'g\\'ri metodga ega obyekt qaytarmadi';\nconst newSpeed = car.accelerate(30);\nif (newSpeed === 80 && car.speed === 80) return null;\nreturn 'accelerate metodi tezlikni to\\'g\\'ri oshirmadi yoki qaytarmadi';"
    },
    {
      id: 4,
      title: "Obyekt Qismi (Shorthand)",
      instruction: "Kiritilgan kalit va qiymatdan iborat yangi obyekt qaytaruvchi `makeObject(key, value)` yozing.",
      startingCode: "function makeObject(key, value) {\n  // Kodni yozing\n}",
      hint: "ES6 dagi qisqa yozish yoki Computed Property Names `{[key]: value}` ishlating.",
      test: "const fn = new Function(code + '; return makeObject;')(); const o = fn('name', 'Ali'); if(o.name !== 'Ali') return 'Xato'; return null;"
    },
    {
      id: 5,
      title: "Kalitlar Massivi",
      instruction: "Berilgan obyektning barcha kalitlarini massiv sifatida qaytaradigan `getKeys(obj)` yozing.",
      startingCode: "function getKeys(obj) {\n  // Kodni yozing\n}",
      hint: "Object.keys(obj) eng to'g'ri va oson usul.",
      test: "const fn = new Function(code + '; return getKeys;')(); if(fn({a:1, b:2}).join(',') !== 'a,b') return 'To\\'g\\'ri kalitlar olinmadi'; return null;"
    },
    {
      id: 6,
      title: "Qiymatlar Massivi",
      instruction: "Berilgan obyektning barcha qiymatlarini massiv sifatida qaytaruvchi `getValues(obj)` yozing.",
      startingCode: "function getValues(obj) {\n  // Kodni yozing\n}",
      hint: "Object.values(obj) orqali hal qiling.",
      test: "const fn = new Function(code + '; return getValues;')(); if(fn({a:10, b:20}).join(',') !== '10,20') return 'Xato'; return null;"
    },
    {
      id: 7,
      title: "Obyektda Kalitning Borligi",
      instruction: "Obyekt va kalit satri berilgan. Agar o'sha kalit obyektda bor bo'lsa `true`, aks holda `false` qaytaruvchi `hasKey(obj, key)` yozing.",
      startingCode: "function hasKey(obj, key) {\n  // Kodni yozing\n}",
      hint: "obj.hasOwnProperty(key) yoki key in obj ishlatsa bo'ladi.",
      test: "const fn = new Function(code + '; return hasKey;')(); if(fn({x:1}, 'x') !== true) return 'Bor'; if(fn({x:1}, 'y') !== false) return 'Yo\\'q'; return null;"
    },
    {
      id: 8,
      title: "Ikki Obyektni Birlashtirish",
      instruction: "Ikkita obyekt qabul qilib ularning xossalarini bitta yangi obyektga yig'ib qaytaradigan `mergeObjects(obj1, obj2)` yozing.",
      startingCode: "function mergeObjects(obj1, obj2) {\n  // Kodni yozing\n}",
      hint: "Spread operatori `{...obj1, ...obj2}` yoki Object.assign({}, obj1, obj2) ishlating.",
      test: "const fn = new Function(code + '; return mergeObjects;')(); const r = fn({a:1}, {b:2}); if(r.a !== 1 || r.b !== 2) return 'Xato'; return null;"
    },
    {
      id: 9,
      title: "Xossani O'chirish",
      instruction: "Berilgan obyektdan ko'rsatilgan kalitni o'chirib, obyektning o'zini qaytaruvchi `removeProperty(obj, key)` yozing.",
      startingCode: "function removeProperty(obj, key) {\n  // Kodni yozing\n}",
      hint: "delete obj[key] ishlatib keyin obj ni qaytaring.",
      test: "const fn = new Function(code + '; return removeProperty;')(); const r = fn({a:1, b:2}, 'a'); if(r.a !== undefined || r.b !== 2) return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "Bo'sh Obyektmi?",
      instruction: "Obyekt qabul qilib, agar uning ichida hech qanday xossa bo'lmasa `true` qaytaradigan `isEmptyObject(obj)` yozing.",
      startingCode: "function isEmptyObject(obj) {\n  // Kodni yozing\n}",
      hint: "Object.keys(obj).length === 0 ekanligini tekshiring.",
      test: "const fn = new Function(code + '; return isEmptyObject;')(); if(fn({}) !== true) return 'Bo\\'sh uchun true'; if(fn({a:1}) !== false) return 'To\\'la uchun false'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Obyekt literalini (object literal) yaratishning eng keng tarqalgan usuli qaysi?",
      options: [
        "let obj = [];",
        "let obj = {};",
        "let obj = Object.create();",
        "let obj = new Map();"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar `{}` yordamida obyekt yaratish 'object literal' deb ataladi."
    },
    {
      id: 2,
      question: "Obyekt xossasiga (property) qavsli yozuv (bracket notation) orqali murojaat qilishning nuqta (dot notation) yozuvidan asosiy afzalligi nimada?",
      options: [
        "Bu usul dot notationga qaraganda tezroq ishlaydi",
        "U faqat raqamli kalitlar bilan ishlashga ruxsat beradi",
        "Dinamik o'zgaruvchi qiymatini yoki maxsus belgili kalitlarni ishlatish imkonini beradi",
        "Xossalarni avtomatik ravishda muzlatib qo'yadi"
      ],
      correctAnswer: 2,
      explanation: "Qavsli yozuvda (`obj[variable]`) kalit sifatida o'zgaruvchidan foydalanish mumkin."
    },
    {
      id: 3,
      question: "Obyektdan ma'lum bir xossani butunlay o'chirib tashlash uchun qaysi so'z ishlatiladi?",
      options: [
        "remove",
        "clear",
        "delete",
        "exclude"
      ],
      correctAnswer: 2,
      explanation: "`delete` operatori ishlatiladi, masalan: `delete user.age;`."
    },
    {
      id: 4,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\nconst user = { name: 'Aziza' };\nconst admin = user;\nadmin.name = 'Madina';\nconsole.log(user.name);",
      options: [
        "'Aziza'",
        "'Madina'",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 1,
      explanation: "Obyektlar havola (reference) orqali uzatiladi, shuning uchun `admin` orqali qilingan o'zgarish `user` ga ham ta'sir qiladi."
    },
    {
      id: 5,
      question: "Obyektda ma'lum bir kalit bor yoki yo'qligini tekshirish uchun qaysi operator to'g'ri keladi?",
      options: [
        "key in obj",
        "obj.includes(key)",
        "obj.has(key)",
        "key of obj"
      ],
      correctAnswer: 0,
      explanation: "`'key' in obj` operatori obyektda xossa nomi borligini tekshiradi."
    },
    {
      id: 6,
      question: "Obyektdagi barcha kalitlarni massiv ko'rinishida olish uchun nima qilinadi?",
      options: [
        "Object.values(obj)",
        "Object.keys(obj)",
        "Object.entries(obj)",
        "obj.getKeys()"
      ],
      correctAnswer: 1,
      explanation: "`Object.keys(obj)` kalitlarni qaytaradi."
    },
    {
      id: 7,
      question: "Obyekt tarkibidagi metod ichida ishlatilgan `this` kalit so'zi nimaga ishora qiladi?",
      options: [
        "Global window obyektiga",
        "Metodni chaqirgan obyektning o'ziga",
        "Metodning parametrlariga",
        "undefined qiymatga"
      ],
      correctAnswer: 1,
      explanation: "`this` metodni qaysi obyekt chaqirgan bo'lsa o'shanga havola qiladi."
    },
    {
      id: 8,
      question: "Arrow funksiyalar metod sifatida ishlatilganda `this` nima bo'ladi?",
      options: [
        "U obyektga bog'lanadi",
        "Arrow funksiyaning o'z this konteksti bo'lmaydi va u tashqi muhitdan oladi",
        "U TypeError beradi",
        "U har doim null bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarda `this` kontekti yo'q, uni u yashab turgan eng yaqin funksiya scopesi qamrab oladi."
    },
    {
      id: 9,
      question: "Property Shorthand bo'yicha `const user = { name: name }` ni qanday qisqartirib yozsa bo'ladi?",
      options: [
        "const user = { name };",
        "const user = { name: :name };",
        "const user = { name = name };",
        "const user = { @name };"
      ],
      correctAnswer: 0,
      explanation: "Agar kalit va o'zgaruvchi bir xil nomda bo'lsa, `{ name }` yetarli."
    },
    {
      id: 10,
      question: "Obyektni yuzaki nusxalash (shallow copy) usuli qaysi?",
      options: [
        "JSON.parse(JSON.stringify(obj))",
        "{ ...obj }",
        "Object.create(obj)",
        "obj.clone()"
      ],
      correctAnswer: 1,
      explanation: "Spread operatori `{ ...obj }` yuzaki nusxa oladi."
    },
    {
      id: 11,
      question: "Object.assign(target, source) metodining vazifasi nima?",
      options: [
        "source obyektini target obyektiga ko'chiradi",
        "Ikkala obyektni o'chiradi",
        "Obyektni massivga aylantiradi",
        "Obyektga yangi xossa qo'shishni taqiqlaydi"
      ],
      correctAnswer: 0,
      explanation: "`Object.assign` manba obyektining barcha sanaladigan xossalarini nishon (target) obyektga nusxalaydi."
    },
    {
      id: 12,
      question: "Obyektni chuqur nusxalash (deep clone) uchun qaysi zamonaviy funksiya kiritilgan?",
      options: [
        "Object.cloneNode(obj)",
        "Object.deepAssign({}, obj)",
        "structuredClone(obj)",
        "obj.clone({deep: true})"
      ],
      correctAnswer: 2,
      explanation: "`structuredClone()` — bu JavaScript-ga chuqur nusxalash uchun qo'shilgan mahalliy va xavfsiz global funksiya."
    }
  ]
};