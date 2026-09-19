export const propertyDescriptors = {
  id: "property-descriptors",
  title: "Property Descriptors (Xususiyatlarni sozlash)",
  theory: `
### 1. Beginner Analogy: Uyning kalitlari va xonalar

Tasavvur qiling, sizda katta uy bor (bu obyekt). Uyning ichida turli xonalar bor (bular xususiyatlar, ya'ni property-lar). Odatda, uyingizga kelgan mehmon har qanday xonaga kirishi, narsalarni o'zgartirishi yoki hatto xonani buzib tashlashi mumkin (oddiy obyekt xususiyati).

Lekin, xavfsizlik nuqtai nazaridan, har bir xona uchun maxsus **qoidalar (descriptors)** o'rnatishingiz mumkin:
- **Writable (Yoziladigan):** Bu xonadagi narsalarni o'zgartirish mumkinmi? (Agar false bo'lsa, xona muzeyga aylanadi – faqat tomosha qilish mumkin, tegish taqiqlanadi).
- **Enumerable (Sanaladigan):** Mehmonlar uyni ko'zdan kechirganda (for...in bilan) bu xonani ko'rishadimi? (Agar false bo'lsa, bu xona "yashirin xona" ga aylanadi).
- **Configurable (Sozlanadigan):** Bu xonani umuman buzib tashlash (delete) yoki uning qoidalarini kelajakda o'zgartirish mumkinmi?

JavaScript-da Object Property Descriptors xuddi shu "xona qoidalari" rolini bajaradi.

---

### 2. Deep Dive: Under the Hood

JavaScript-da obyektdagi har bir kalit-qiymat (key-value) faqat oddiy o'zgaruvchi emas. Uning ortida "Property Descriptor" deb ataluvchi yashirin sozlamalar (metadata) yotadi. 

V8 dvigateli (Node.js va Chrome'ning yuragi) obyektlarni xotirada saqlash uchun **Hidden Classes (Yashirin sinflar)** dan foydalanadi. Qachonki siz obyektga yangi xususiyat qo'shsangiz yoki descriptor'ni o'zgartirsangiz, V8 yangi Hidden Class yaratishi mumkin. Bu obyektga kirish tezligiga ta'sir qiladi.

Xususiyatlar ikki turga bo'linadi:
1. **Data Properties (Ma'lumot xususiyatlari):** Qiymatni o'zida saqlaydi (\`value\`).
2. **Accessor Properties (Kirish xususiyatlari):** Qiymatni hisoblaydi yoki oladi (\`get\` va \`set\` funksiyalari orqali).

Ushbu sozlamalarni o'qish uchun quyidagi metoddan foydalanamiz:
\`\`\`javascript
const user = { name: "Ali" };
const descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);
// Natija:
// {
//   value: "Ali",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
\`\`\`

Yangi xususiyatni maxsus sozlamalar bilan qo'shish yoki mavjudini o'zgartirish uchun **\`Object.defineProperty\`** va **\`Object.defineProperties\`** ishlatiladi.

\`\`\`javascript
const car = {};

Object.defineProperty(car, "brand", {
  value: "Tesla",
  writable: false,      // O'zgartirib bo'lmaydi
  enumerable: false,    // tsiklda ko'rinmaydi
  configurable: false   // o'chirib yoki qayta sozlab bo'lmaydi
});

car.brand = "BMW"; // Xato tashlaydi (Strict mode'da) yoki e'tiborsiz qoldiriladi
console.log(car.brand); // "Tesla"
\`\`\`

> **Diqqat!** Agar siz yangi xususiyatni \`Object.defineProperty\` orqali qo'shsangiz va descriptor bayroqlarini yozmasangiz, ular avtomatik ravishda **\`false\`** bo'ladi! Ammo oddiy usulda (\`obj.key = value\`) qo'shsangiz, ular **\`true\`** bo'ladi.

---

### 3. Edge Cases va Senior Interview Savollari

Property Descriptors bo'yicha senior suhbatlarda ko'p uchraydigan holatlar (edge cases):

**1-savol: \`configurable: false\` bo'lganda nimalarni o'zgartirish mumkin?**
- Agar \`configurable: false\` bo'lsa, siz xususiyatni o'chira olmaysiz (\`delete obj.prop\`).
- Siz \`enumerable\` ni o'zgartira olmaysiz.
- Siz Accessor property ni Data property ga (yoki teskarisi) o'zgartira olmaysiz.
- **Ammo**, agar \`writable: true\` bo'lsa, siz uning qiymatini (\`value\`) o'zgartirishingiz mumkin va \`writable\` ni \`false\` ga o'zgartirishingiz mumkin! (Lekin \`false\` dan yana \`true\` ga qaytara olmaysiz).

**2-savol: \`Object.freeze()\` va \`Object.seal()\` larning Property Descriptor'ga qanday aloqasi bor?**
- \`Object.preventExtensions(obj)\`: Yangi xususiyatlar qo'shishni taqiqlaydi.
- \`Object.seal(obj)\`: preventExtensions ishini qiladi + barcha mavjud xususiyatlarni \`configurable: false\` qiladi (endi o'chirib bo'lmaydi).
- \`Object.freeze(obj)\`: seal ishini qiladi + barcha xususiyatlarni \`writable: false\` qiladi (faqat o'qish uchun).

**3-savol: Getter va Setter'larda \`writable\` ishlatsa bo'ladimi?**
- Yo'q! Agar siz \`get\` yoki \`set\` dan foydalansangiz, bu Accessor Property hisoblanadi. Descriptor ichida \`value\` yoki \`writable\` ko'rsatish TypeError keltirib chiqaradi.

---

### Mermaid Diagram

Quyida Data Property va Accessor Property descriptorlarining tuzilishi ko'rsatilgan:

\`\`\`mermaid
graph TD;
    A[Property Descriptor] --> B[Data Property];
    A --> C[Accessor Property];
    
    B --> D[value];
    B --> E[writable];
    B --> F[enumerable];
    B --> G[configurable];
    
    C --> H[get];
    C --> I[set];
    C --> J[enumerable];
    C --> K[configurable];
\`\`\`
`,
  exercises: [
    {
      id: "ex-1",
      title: "Read-only property (Writable: false)",
      description: "Funksiya obyekt va kalit/qiymat qabul qiladi. Shu kalit bilan obyektga qiymatni qo'shing, lekin uni keyinchalik o'zgartirib bo'lmaydigan (read-only) qilib sozlang.",
      initialCode: "function addReadOnly(obj, key, value) {\n  // Object.defineProperty dan foydalaning\n}",
      solution: "function addReadOnly(obj, key, value) {\n  Object.defineProperty(obj, key, {\n    value: value,\n    writable: false,\n    enumerable: true,\n    configurable: true\n  });\n}",
      tests: [
        {
          test: "const o = {}; addReadOnly(o, 'id', 123); const d = Object.getOwnPropertyDescriptor(o, 'id'); return d.value === 123 && d.writable === false && d.enumerable === true;",
          description: "Obyektda writable: false bo'lgan xususiyat qo'shilishi kerak"
        }
      ]
    },
    {
      id: "ex-2",
      title: "Yashirin property (Enumerable: false)",
      description: "Berilgan obyektga 'secret' nomli va qiymati 'hidden' bo'lgan xususiyat qo'shing. Bu xususiyat for...in tsiklida va Object.keys() da ko'rinmasligi kerak.",
      initialCode: "function addSecret(obj) {\n  \n}",
      solution: "function addSecret(obj) {\n  Object.defineProperty(obj, 'secret', {\n    value: 'hidden',\n    enumerable: false,\n    writable: true,\n    configurable: true\n  });\n}",
      tests: [
        {
          test: "const o = {}; addSecret(o); return o.secret === 'hidden' && Object.keys(o).length === 0;",
          description: "'secret' xususiyati qatorlarga qo'shilmasligi (enumerable: false) kerak"
        }
      ]
    },
    {
      id: "ex-3",
      title: "O'chirilmas property (Configurable: false)",
      description: "Obyektga 'core' nomli qiymati 42 bo'lgan xususiyat qo'shing. U o'chirilmaydigan bo'lishi kerak.",
      initialCode: "function addCore(obj) {\n  \n}",
      solution: "function addCore(obj) {\n  Object.defineProperty(obj, 'core', {\n    value: 42,\n    configurable: false,\n    writable: true,\n    enumerable: true\n  });\n}",
      tests: [
        {
          test: "const o = {}; addCore(o); const d = Object.getOwnPropertyDescriptor(o, 'core'); return d.configurable === false && d.value === 42;",
          description: "'core' xususiyati configurable: false bo'lishi kerak"
        }
      ]
    },
    {
      id: "ex-4",
      title: "Define Multiple Properties",
      description: "Object.defineProperties yordamida obyektga 2 ta xususiyat qo'shing: 'name' (writable: true) va 'id' (read-only, writable: false).",
      initialCode: "function addMultiple(obj, nameVal, idVal) {\n  \n}",
      solution: "function addMultiple(obj, nameVal, idVal) {\n  Object.defineProperties(obj, {\n    name: {\n      value: nameVal,\n      writable: true,\n      enumerable: true,\n      configurable: true\n    },\n    id: {\n      value: idVal,\n      writable: false,\n      enumerable: true,\n      configurable: true\n    }\n  });\n}",
      tests: [
        {
          test: "const o = {}; addMultiple(o, 'Ali', 99); const dn = Object.getOwnPropertyDescriptor(o, 'name'); const di = Object.getOwnPropertyDescriptor(o, 'id'); return dn.writable === true && di.writable === false;",
          description: "Ikki xususiyat to'g'ri sozlamalar bilan qo'shilishi kerak"
        }
      ]
    },
    {
      id: "ex-5",
      title: "Getter va Setter yaratish",
      description: "Obyektga 'firstName' va 'lastName' berilgan. Ular asosida ishlaydigan 'fullName' (get va set) xususiyatini Object.defineProperty orqali qo'shing.",
      initialCode: "function addFullName(obj) {\n  // obj.firstName va obj.lastName mavjud\n  \n}",
      solution: "function addFullName(obj) {\n  Object.defineProperty(obj, 'fullName', {\n    get() {\n      return obj.firstName + ' ' + obj.lastName;\n    },\n    set(val) {\n      const parts = val.split(' ');\n      obj.firstName = parts[0];\n      obj.lastName = parts[1];\n    },\n    enumerable: true,\n    configurable: true\n  });\n}",
      tests: [
        {
          test: "const o = {firstName: 'A', lastName: 'B'}; addFullName(o); o.fullName = 'C D'; return o.firstName === 'C' && o.lastName === 'D';",
          description: "fullName getter va setter to'g'ri ishlashi kerak"
        }
      ]
    },
    {
      id: "ex-6",
      title: "Get property descriptor",
      description: "Funksiya obyekt va kalitni qabul qiladi. U xususiyatning 'writable' qiymatini qaytarishi kerak. Agar xususiyat mavjud bo'lmasa, undefined qaytarsin.",
      initialCode: "function getWritableFlag(obj, key) {\n  \n}",
      solution: "function getWritableFlag(obj, key) {\n  const desc = Object.getOwnPropertyDescriptor(obj, key);\n  return desc ? desc.writable : undefined;\n}",
      tests: [
        {
          test: "const o = {}; Object.defineProperty(o, 'x', {value: 1, writable: false}); return getWritableFlag(o, 'x') === false;",
          description: "writable bayrog'ini to'g'ri o'qib olishi kerak"
        }
      ]
    },
    {
      id: "ex-7",
      title: "Make completely sealed manual",
      description: "Obyektdagi berilgan kalitning hamma bayroqlarini false qilib qo'yadigan funksiya yozing (value saqlanib qolishi kerak).",
      initialCode: "function lockProperty(obj, key) {\n  \n}",
      solution: "function lockProperty(obj, key) {\n  const desc = Object.getOwnPropertyDescriptor(obj, key);\n  if (desc) {\n    Object.defineProperty(obj, key, {\n      writable: false,\n      enumerable: false,\n      configurable: false\n    });\n  }\n}",
      tests: [
        {
          test: "const o = {x: 10}; lockProperty(o, 'x'); const d = Object.getOwnPropertyDescriptor(o, 'x'); return d.writable === false && d.enumerable === false && d.configurable === false && d.value === 10;",
          description: "Barcha bayroqlar false bo'lishi kerak"
        }
      ]
    },
    {
      id: "ex-8",
      title: "O'chirilmas, lekin o'zgaradigan xususiyat",
      description: "Obyektga qiymati t bo'lgan 'timer' xususiyatini shunday qo'shingki, uni qayta yozish (writable) va tsikllarda ko'rish mumkin bo'lsin, lekin delete bilan o'chirib bo'lmasin.",
      initialCode: "function addTimer(obj, t) {\n  \n}",
      solution: "function addTimer(obj, t) {\n  Object.defineProperty(obj, 'timer', {\n    value: t,\n    writable: true,\n    enumerable: true,\n    configurable: false\n  });\n}",
      tests: [
        {
          test: "const o = {}; addTimer(o, 100); const d = Object.getOwnPropertyDescriptor(o, 'timer'); return d.configurable === false && d.writable === true && d.enumerable === true;",
          description: "Faqat configurable: false bo'lishi kerak"
        }
      ]
    },
    {
      id: "ex-9",
      title: "Object properties to array",
      description: "Funksiya obyekt qabul qiladi va barcha enumerable=false bo'lgan xususiyatlar kalitlarini massiv sifatida qaytaradi. Object.getOwnPropertyNames() ishlating.",
      initialCode: "function getHiddenKeys(obj) {\n  \n}",
      solution: "function getHiddenKeys(obj) {\n  return Object.getOwnPropertyNames(obj).filter(key => {\n    return !Object.getOwnPropertyDescriptor(obj, key).enumerable;\n  });\n}",
      tests: [
        {
          test: "const o = {a: 1}; Object.defineProperty(o, 'b', {value: 2, enumerable: false}); return getHiddenKeys(o).includes('b') && !getHiddenKeys(o).includes('a');",
          description: "Faqat enumerable: false bo'lgan kalitlar topilishi kerak"
        }
      ]
    },
    {
      id: "ex-10",
      title: "Yangi obyektda default false xususiyati",
      description: "Obyektga 'token' xususiyatini qiymati 'abc' bilan Object.defineProperty orqali qo'shing. Uchinchi parametr sifatida faqat {value: 'abc'} bering. Shunda default holat ishlashini tekshiramiz.",
      initialCode: "function addToken(obj) {\n  \n}",
      solution: "function addToken(obj) {\n  Object.defineProperty(obj, 'token', {\n    value: 'abc'\n  });\n}",
      tests: [
        {
          test: "const o = {}; addToken(o); const d = Object.getOwnPropertyDescriptor(o, 'token'); return d.writable === false && d.enumerable === false && d.configurable === false;",
          description: "Faqat value berilganda boshqa barcha xususiyatlar avtomatik false bo'lishi kerak"
        }
      ]
    }
  ],
  quizzes: [
    {
      id: "q-1",
      question: "Qaysi metod yordamida obyektdagi barcha Property Descriptor'larni ko'rish mumkin?",
      options: [
        "Object.getDescriptors()",
        "Object.getOwnPropertyDescriptors()",
        "Object.keys()",
        "Object.getProperties()"
      ],
      correctAnswer: 1,
      explanation: "Object.getOwnPropertyDescriptors(obj) obyektdagi barcha kalitlarning descriptorlarini qaytaradi."
    },
    {
      id: "q-2",
      question: "for...in tsiklida va Object.keys() da kalit ko'rinmasligi uchun qaysi bayroqcha false bo'lishi kerak?",
      options: [
        "writable",
        "configurable",
        "enumerable",
        "visible"
      ],
      correctAnswer: 2,
      explanation: "enumerable: false qilinganda xususiyat tsikllarda ko'rinmaydi (yashirin bo'ladi)."
    },
    {
      id: "q-3",
      question: "Agar xususiyat configurable: false bo'lsa, quyidagilardan qaysi birini qilish MUMKIN EMAS?",
      options: [
        "Qiymatini o'zgartirish (agar writable: true bo'lsa)",
        "Xususiyatni delete bilan o'chirib tashlash",
        "Writable ni false ga o'zgartirish",
        "Obyektga yangi xususiyat qo'shish"
      ],
      correctAnswer: 1,
      explanation: "configurable: false bo'lsa, xususiyatni o'chirib (delete) yoki uning turini o'zgartirib bo'lmaydi."
    },
    {
      id: "q-4",
      question: "Object.defineProperty bilan xususiyat qo'shganda, agar enumerable, writable va configurable ko'rsatilmasa, ularning default (standart) qiymati qanday bo'ladi?",
      options: [
        "Barchasi true",
        "Barchasi false",
        "writable true, qolgani false",
        "undefined bo'lib qoladi"
      ],
      correctAnswer: 1,
      explanation: "Object.defineProperty bilan yangi xususiyat qo'shilganda, ko'rsatilmagan barcha bayroqchalar avtomatik ravishda false deb qabul qilinadi."
    },
    {
      id: "q-5",
      question: "Accessor property (get/set) yaratishda quyidagilardan qaysi biri descriptor ichida bo'lishi mumkin EMAS?",
      options: [
        "enumerable",
        "configurable",
        "value",
        "get"
      ],
      correctAnswer: 2,
      explanation: "get yoki set ishlatsangiz, value va writable ishlata olmaysiz. Ular o'rnini get/set egallaydi."
    },
    {
      id: "q-6",
      question: "Qaysi metod obyektdagi barcha xususiyatlarni writable: false qiladi?",
      options: [
        "Object.seal(obj)",
        "Object.freeze(obj)",
        "Object.preventExtensions(obj)",
        "Object.lock(obj)"
      ],
      correctAnswer: 1,
      explanation: "Object.freeze() obyektga yangi xususiyat qo'shishni, eskilarini o'chirishni taqiqlaydi va barchasini writable: false qiladi."
    },
    {
      id: "q-7",
      question: "Object.seal(obj) qanday ishlaydi?",
      options: [
        "Yangi xususiyat qo'shishni cheklaydi va barchasini configurable: false qiladi",
        "Barcha xususiyatlarni writable: false qiladi",
        "Barcha xususiyatlarni enumerable: false qiladi",
        "Obyektni butunlay yashirin qiladi"
      ],
      correctAnswer: 0,
      explanation: "Object.seal(obj) mavjud xususiyatlarni o'chirishga (configurable: false) yo'l qo'ymaydi, lekin agar writable: true bo'lsa, ularni o'zgartirish mumkin bo'lib qoladi."
    },
    {
      id: "q-8",
      question: "Agar xususiyat writable: false bo'lsa va siz uning qiymatini o'zgartirishga urinsangiz qanday oqibat bo'ladi?",
      options: [
        "Qiymat baribir o'zgaradi",
        "TypeError tashlanadi (strict mode da) yoki e'tiborsiz qoldiriladi (non-strict)",
        "Obyekt o'chib ketadi",
        "V8 dvigateli crash beradi"
      ],
      correctAnswer: 1,
      explanation: "Strict rejimda TypeError beradi, oddiy rejimda esa shunchaki ishlamaydi (jim xato)."
    },
    {
      id: "q-9",
      question: "Qaysi bayroqcha o'zgartirilganda V8 dvigateli yangi Hidden Class yaratishi ehtimoli bor?",
      options: [
        "Faqat yangi xususiyat qo'shilganda yoki uning konfiguratsiyasi o'zgarganda",
        "Har safar value o'zgarganda",
        "Hech qachon",
        "Faqat enumerable true bo'lsa"
      ],
      correctAnswer: 0,
      explanation: "V8 Hidden Class larni Property layout lari orqali shakllantiradi. Yangi field qo'shish, o'chirish yoki descriptor xususiyatini o'zgartirish Hidden Class o'zgarishiga olib kelishi mumkin."
    },
    {
      id: "q-10",
      question: "Bir paytning o'zida ham value, ham get qoidasini bitta descriptorda ishlatish mumkinmi?",
      options: [
        "Ha, value birlamchi qiymat bo'ladi",
        "Yo'q, bu xatoga olib keladi",
        "Ha, lekin faqat strict rejimda emas",
        "Faqat enumerable: false bo'lganda"
      ],
      correctAnswer: 1,
      explanation: "Bir vaqtning o'zida Data property (value, writable) va Accessor property (get, set) ishlatib bo'lmaydi. Bu TypeError ga sabab bo'ladi."
    },
    {
      id: "q-11",
      question: "Oddiy tarzda obj.name = 'Ali' orqali qo'shilgan xususiyatning descriptor bayroqlari qanday qiymatlarga ega bo'ladi?",
      options: [
        "writable: true, enumerable: true, configurable: true",
        "writable: false, enumerable: false, configurable: false",
        "Faqat writable: true bo'ladi",
        "Bunday holatda descriptor bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "Obyektga oddiy yo'l bilan o'zgaruvchi qo'shganda barcha (writable, enumerable, configurable) avtomatik ravishda true bo'ladi."
    },
    {
      id: "q-12",
      question: "configurable: false, lekin writable: true bo'lgan holatda qaysi amalni bajarish MUMKIN?",
      options: [
        "delete obj.prop",
        "Object.defineProperty orqali enumerable'ni o'zgartirish",
        "Object.defineProperty orqali writable'ni false qilish",
        "Data property'ni Accessor property ga o'zgartirish"
      ],
      correctAnswer: 2,
      explanation: "Garchi configurable: false bo'lsa ham, bitta istisno mavjud: writable ni true dan false ga o'zgartirish mumkin."
    }
  ]
};
