export const nodejsModules = {
  id: 'nodejsModules',
  title: 'Node.js Modules (CommonJS vs ES Modules)',
  theory: `
# Node.js Modules: CommonJS and ECMAScript Modules

## Part 1: Beginner Analogy
Tasavvur qiling, siz katta bir shahar quryapsiz. Agar hamma narsani (uylar, yo'llar, do'konlar) bitta katta qutiga solib qo'ysangiz, kerakli narsani topish qiyin bo'ladi. Buning o'rniga siz shaharni tumanlarga, tumanlarni ko'chalarga ajratasiz. 
Dasturlashda ham xuddi shunday: kodimizni kichik, boshqariladigan va qayta ishlatiladigan qismlarga (modullarga) ajratamiz. Node.js'da har bir fayl o'z-o'zidan bir modul hisoblanadi.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, Libuv, performance)
Node.js'da modul tizimi asosan ikki turga bo'linadi: **CommonJS (CJS)** va **ECMAScript Modules (ESM)**.

### CommonJS (CJS) - Under the hood
CommonJS Node.js ning an'anaviy modul tizimi bo'lib, sinxron ishlaydi. 
CJS da har bir fayl \\\`module.wrapper\\\` deb nomlangan funksiya ichiga o'raladi (wrapped). 
V8 dvigateli kodingizni ishlashdan oldin uni quyidagicha o'rab chiqadi:
\\\`\\\`\\\`javascript
(function(exports, require, module, __filename, __dirname) {
  // Sizning kodingiz shu yerda ishlaydi
});
\\\`\\\`\\\`
Bu jarayon global scope ifloslanishining (pollution) oldini oladi. CJS modullari birinchi marta chaqirilganda keshlanadi (cached). Demak, xotirada faqat bitta nusxa saqlanadi. Agar bitta modulni 10 marta require qilsangiz ham, u faqat bir marta o'qiladi (I/O operatsiyasi) va qolgan 9 marta xotiradan olinadi. 

### ES Modules (ESM) - Performance and Memory
ESM asinxron va statik tahlil (static analysis) qilinadigan modul tizimidir. V8 kodingizni o'qiyotganda, ESM importlarini ijro etishdan (execution) oldin hal qiladi. Bu **Tree Shaking** kabi xotira va ishqalanishni (performance) optimallashtiruvchi texnikalar uchun juda foydali.
CJS dan farqli o'laroq, ESM da \\\`__dirname\\\` va \\\`__filename\\\` to'g'ridan-to'g'ri mavjud emas, ularni \\\`import.meta.url\\\` orqali olish kerak.

## Part 3: Edge Cases and Senior Interview Questions

**Savol: Nima uchun Node.js da aylanma qaramlik (Circular Dependency) muammosi CJS va ESM da turlicha yuz beradi?**
**Javob:** CJS da modul sinxron yuklanadi. Agar A modul B ni chaqirsa, va B modul A ni chaqirsa, Node.js cheksiz tsiklga tushib qolmaslik uchun A ning o'sha paytdagi chala (incomplete) obyektini B ga qaytaradi. Bu ko'pincha kutilmagan \\\`undefined\\\` qiymatlarga olib keladi.
ESM da esa bu statik tahlil qilingani uchun ko'proq xavfsizroq ishlaydi, biroq reference lar to'liq initsializatsiya qilinmagan bo'lsa \\\`ReferenceError\\\` berishi mumkin (Temporal Dead Zone).

**Savol: \\\`require\\\` qanday ishlaydi, Libuv ning bunda qanday roli bor?**
**Javob:** \\\`require\\\` chaqirilganda, Node.js modul keshida u borligini tekshiradi (Memory Mapped). Agar yo'q bo'lsa, fayl tizimidan o'qiydi (Sinxron I/O). Chunki \\\`require\\\` sinxron, shuning uchun bu operatsiya Libuv Thread Pool ga tushmaydi, balki Main Thread ni bloklaydi. Shuning uchun modulni faqat dastur boshida yuklash tavsiya etiladi.

## Mermaid Diagram
\\\`\\\`\\\`mermaid
graph TD
    A[Node.js Module System] --> B[CommonJS]
    A --> C[ES Modules]
    B --> D[Synchronous I/O]
    B --> E[Cached after first require]
    C --> F[Asynchronous Loading]
    C --> G[Static Analysis & Tree Shaking]
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "CommonJS Export",
      description: "Quyidagi faylda 'add' funksiyasini CommonJS yordamida eksport qiling.",
      codeTemplate: "const add = (a, b) => a + b;\n\n// Eksport qiling",
      expectedOutput: "module.exports = add;",
      testCode: "const test = require('./userCode'); console.log(test(2,3) === 5);"
    },
    {
      id: 2,
      title: "CommonJS Import",
      description: "'math.js' modulidan 'subtract' funksiyasini CommonJS yordamida import qiling.",
      codeTemplate: "// import qiling\n\nconst result = subtract(5, 3);",
      expectedOutput: "const subtract = require('./math');",
      testCode: "console.log(typeof require !== 'undefined');"
    },
    {
      id: 3,
      title: "ESM Default Export",
      description: "'multiply' funksiyasini ES Modules yordamida default eksport qiling.",
      codeTemplate: "const multiply = (a, b) => a * b;\n\n// Default eksport qiling",
      expectedOutput: "export default multiply;",
      testCode: "import multiply from './userCode.js';"
    },
    {
      id: 4,
      title: "ESM Named Export",
      description: "'divide' funksiyasini ES Modules yordamida named eksport qiling.",
      codeTemplate: "export const divide = (a, b) => a / b;",
      expectedOutput: "export const divide = (a, b) => a / b;",
      testCode: "import { divide } from './userCode.js';"
    },
    {
      id: 5,
      title: "ESM Import",
      description: "'utils.js' modulidan 'formatDate' funksiyasini ESM orqali import qiling.",
      codeTemplate: "// import qiling\n\nconst date = formatDate(new Date());",
      expectedOutput: "import { formatDate } from './utils.js';",
      testCode: ""
    },
    {
      id: 6,
      title: "CommonJS Multiple Exports",
      description: "CommonJS da 'foo' va 'bar' funksiyalarini bitta obyekt sifatida eksport qiling.",
      codeTemplate: "const foo = () => 'foo';\nconst bar = () => 'bar';\n\n// Eksport qiling",
      expectedOutput: "module.exports = { foo, bar };",
      testCode: ""
    },
    {
      id: 7,
      title: "ESM Import All as Alias",
      description: "'helpers.js' dan barcha funksiyalarni 'helpers' nomi bilan import qiling.",
      codeTemplate: "// Import all as helpers from './helpers.js'",
      expectedOutput: "import * as helpers from './helpers.js';",
      testCode: ""
    },
    {
      id: 8,
      title: "ESM Dynamic Import",
      description: "ESM yordamida 'config.js' modulini dinamik (asynchronous) tarzda import qiling.",
      codeTemplate: "async function loadConfig() {\n  // dinamik import qiling va config o'zgaruvchisiga saqlang\n}",
      expectedOutput: "const config = await import('./config.js');",
      testCode: ""
    },
    {
      id: 9,
      title: "CommonJS __dirname Equivalent in ESM",
      description: "ESM muhitida hozirgi papka manzilini ('__dirname') 'import.meta.url' yordamida oling. (Faqat urlni oling)",
      codeTemplate: "// joriy URL ni oling\nconst currentUrl = ???",
      expectedOutput: "const currentUrl = import.meta.url;",
      testCode: ""
    },
    {
      id: 10,
      title: "CommonJS module caching",
      description: "Keshni tozalash (delete module from cache) kodini yozing, agar modul yo'li './config.js' bo'lsa.",
      codeTemplate: "// Keshni o'chiring\n",
      expectedOutput: "delete require.cache[require.resolve('./config.js')];",
      testCode: ""
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Node.js da CommonJS modul tizimi qanday ishlaydi?",
      options: [
        "Sinxron ishlaydi, ya'ni fayl I/O bloki sodir bo'lishi mumkin",
        "Asinxron ishlaydi, V8 dvigateli parallel bajaradi",
        "Modul faqat funksiyalar uchun ishlaydi",
        "U brauzerda ham mahalliy ishlaydi"
      ],
      answer: "Sinxron ishlaydi, ya'ni fayl I/O bloki sodir bo'lishi mumkin"
    },
    {
      id: 2,
      question: "V8 Engine kodingizni CJS modulida ishlashidan oldin qanday o'rab oladi (wrap)?",
      options: [
        "IIFE yordamida, (function(exports, require, module, __filename, __dirname) { ... })",
        "Object orqali module.exports = { ... }",
        "Hech qanday o'rash bo'lmaydi",
        "import va export kalit so'zlari bilan"
      ],
      answer: "IIFE yordamida, (function(exports, require, module, __filename, __dirname) { ... })"
    },
    {
      id: 3,
      question: "CommonJS va ES Modules asosiy farqlaridan biri nima?",
      options: [
        "CommonJS sinxron, ESM asinxron va statik tahlil qilinadi",
        "ESM faqat Node.js uchun ishlab chiqilgan",
        "CommonJS faqat Frontend uchun ishlatiladi",
        "Ular mutlaqo bir xil texnologiya, nomlanishi boshqa xolos"
      ],
      answer: "CommonJS sinxron, ESM asinxron va statik tahlil qilinadi"
    },
    {
      id: 4,
      question: "ESM nima sababdan Tree Shaking uchun qulay hisoblanadi?",
      options: [
        "Chunki uning tuzilishi statik tahlil (static analysis) qilish imkonini beradi",
        "Sinxron ishlagani uchun",
        "Har doim keshni tozlab turgani uchun",
        "Tree Shaking qulayligi faqat CommonJS da mavjud"
      ],
      answer: "Chunki uning tuzilishi statik tahlil (static analysis) qilish imkonini beradi"
    },
    {
      id: 5,
      question: "Agar CommonJS orqali bir modul 5 marta require qilinsa, u diskdan necha marta o'qiladi?",
      options: [
        "1 marta o'qiladi va qolgan safar xotira keshidan qaytariladi",
        "5 marta",
        "Har bir chaqiriqda alohida Event Loop yoziladi",
        "0 marta"
      ],
      answer: "1 marta o'qiladi va qolgan safar xotira keshidan qaytariladi"
    },
    {
      id: 6,
      question: "ESM muhitida hozirgi fayl papkasini aniqlash uchun nima ishlatiladi?",
      options: [
        "import.meta.url",
        "__dirname",
        "path.resolve(__dirname)",
        "require.main.filename"
      ],
      answer: "import.meta.url"
    },
    {
      id: 7,
      question: "Circular dependency (aylanma qaramlik) sodir bo'lganda CommonJS da qanday xato yuzaga kelishi mumkin?",
      options: [
        "Modulning to'liq bo'lmagan qismi eksport qilinadi, shuning uchun ba'zi property lar undefined bo'lib qoladi",
        "Node.js cheksiz tsiklga tushib, xotira to'ladi va dastur qulaydi",
        "Hech qanday xato bermaydi, mukammal ishlaydi",
        "ReferenceError: Cannot access before initialization xatosi chiqadi"
      ],
      answer: "Modulning to'liq bo'lmagan qismi eksport qilinadi, shuning uchun ba'zi property lar undefined bo'lib qoladi"
    },
    {
      id: 8,
      question: "CommonJS modulidan hamma narsani obyekt sifatida emas, ma'lum funksiyalarni eksport qilish qanday bo'ladi?",
      options: [
        "module.exports = { fn1, fn2 }",
        "export default fn1",
        "import { fn1 } from 'module'",
        "exports default = { fn1, fn2 }"
      ],
      answer: "module.exports = { fn1, fn2 }"
    },
    {
      id: 9,
      question: "import() funksiyasi yordamida qilingan import nima deb ataladi va uning xususiyati nima?",
      options: [
        "Dinamik import deb ataladi va asinxron ishlaydi (Promise qaytaradi)",
        "Statik import bo'lib, darhol ishlaydi",
        "Sinxron import deyiladi, I/O ni bloklaydi",
        "Bunday funksiya ES Modules da mavjud emas"
      ],
      answer: "Dinamik import deb ataladi va asinxron ishlaydi (Promise qaytaradi)"
    },
    {
      id: 10,
      question: "__filename ni ESM da qanday taqlid qilib (simulate) olish mumkin?",
      options: [
        "url modulining fileURLToPath(import.meta.url) usuli orqali",
        "__dirname + filename",
        "global.__filename",
        "Hech qanday usuli yo'q, u butunlay bekor qilingan"
      ],
      answer: "url modulining fileURLToPath(import.meta.url) usuli orqali"
    },
    {
      id: 11,
      question: "Node.js da Libuv Thread Pool require chaqirig'ida ishtirok etadimi?",
      options: [
        "Yo'q, require Main Thread ni bloklaydigan sinxron C++ binding funksiyalari orqali ishlaydi",
        "Ha, modulni diskdan o'qish uchun alohida thread ajratiladi",
        "Faqat JSON fayllarni o'qiganda ishtirok etadi",
        "Ha, V8 o'zi CJS ni Libuv orqali optimallashtiradi"
      ],
      answer: "Yo'q, require Main Thread ni bloklaydigan sinxron C++ binding funksiyalari orqali ishlaydi"
    },
    {
      id: 12,
      question: "Qaysi xususiyat faqat ESM ga tegishli, CommonJS da mavjud emas?",
      options: [
        "Top-level await",
        "module.exports",
        "require.cache",
        "exports.method"
      ],
      answer: "Top-level await"
    }
  ]
};
