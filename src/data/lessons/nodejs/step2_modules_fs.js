export const step2_modules_fs = {
  theory: "\n# Node.js Modules va File System (FS) - Haqiqiy Backender bo'lish vaqti keldi! 🚀\n\nSalom qahramon! Node.js ga xush kelibsiz. Endi front-end dagi qulay va erkin hayotingiz tugadi (hazil). Endi siz bevosita operatsion tizim, fayllar va turli xil modullar bilan ishlashni o'rganasiz.  \nBiz bu darsda asosan 2 ta katta narsani ko'ramiz:\n1. **Modules**: Kodimizni qanday qilib qismlarga (modullarga) bo'lish. (CommonJS vs ESM)\n2. **File System (fs)**: Kompyuterdagi fayllarni qanday qilib o'qish, yozish va o'chirish.\n\n---\n\n## 1. Modules (Modullar) - CommonJS vs ESM\n\nQadim zamonlarda (Node.js ning ilk davrlarida) JS da modullar yo'q edi. Hamma narsa bitta faylda yozilardi... Va u `app.js` 10 000 qatorgacha yetib borardi 😱. Buni to'g'irlash uchun **CommonJS** o'ylab topildi. Keyin esa standart sifatida **ES Modules (ESM)** keldi.\n\n### ❌ YOMON: Hamma narsani bitta faylga tiqish\nTasavvur qiling, log in, register, db ulanish, va hamma logika `index.js` da:\n```javascript\n// index.js (10 000 qator)\nfunction login() { /* ... */ }\nfunction register() { /* ... */ }\nfunction connectDB() { /* ... */ }\n// Miyangiz portlashi aniq 🤯\n```\n\n### ✅ YAXSHI: Modullarga bo'lish (CommonJS usuli)\nNode.js default holatda CommonJS ishlatadi (`require` va `module.exports`).\n```javascript\n// math.js\nconst add = (a, b) => a + b;\nmodule.exports = { add };\n\n// app.js\nconst math = require('./math.js');\nconsole.log(math.add(5, 5)); // 10\n```\n\n### ✅ YANA YAXSHIROQ: ESM usuli (Modern JavaScript)\nHozirda `import` va `export` standart bo'lib ulgurgan. React yoki Vue da qanday ishlatsangiz xuddi shunday. (Buning uchun `package.json` da `\"type\": \"module\"` bo'lishi yoki fayl kengaytmasi `.mjs` bo'lishi kerak).\n```javascript\n// math.mjs\nexport const add = (a, b) => a + b;\n\n// app.mjs\nimport { add } from './math.mjs';\nconsole.log(add(5, 5)); // 10\n```\n\n---\n\n## 2. File System (fs) moduli\n\nNode.js o'zining ichki `fs` moduli orqali kompyuteringizdagi fayllar bilan bemalol gaplashadi. U xuddi papkalar ichiga kirib chiqib yuruvchi kichkina gnome'ga o'xshaydi 🧝‍♂️.\n\n**fs** ning 3 xil usuli bor:\n1. **Callbacks** - Qadimgi, Callback Hell ga olib boruvchi usul.\n2. **Synchronous** - Kod ishlashini to'xtatib turib faylni o'qiydi (faqat dastur boshlanishida ishlatish mumkin).\n3. **Promises / Async-Await** - Eng toza va zamonaviy usul. Biz shuni ishlatamiz!\n\n### Faylga yozish va o'qish (fs/promises)\n```javascript\nimport fs from 'fs/promises';\n\n// Yozish\nawait fs.writeFile('salom.txt', 'Salom Node.js olami!');\n\n// O'qish\nconst data = await fs.readFile('salom.txt', 'utf8');\nconsole.log(data); // \"Salom Node.js olami!\"\n```\n\n---\n\n## Modul va FS ishlash jarayoni (Sequence Diagram)\nQuyida `app.js` fayli boshqa moduldan yordam so'rab, keyin FS orqali fayl yaratishini ko'rishingiz mumkin:\n\n```mermaid\nsequenceDiagram\n    participant App as app.js\n    participant Math as math.js\n    participant OS as File System (OS)\n    \n    App->>Math: require('./math.js')\n    Math-->>App: Object { add: [Function] }\n    App->>App: let res = math.add(2, 3)\n    App->>OS: fs.writeFile('result.txt', res)\n    OS-->>App: Fayl muvaffaqiyatli saqlandi!\n```\n\n---\n\n## Intervyu Savollari (Tayyorlanib oling!)\n\n1. **Savol:** CommonJS va ESM (ES Modules) o'rtasidagi asosiy farqlar nimada?\n   **Javob:** CommonJS sinxron yuklanadi, `require()` va `module.exports` ishlatadi hamda Node.js ning original modul tizimi hisoblanadi. ESM asinxron yuklanadi, `import` va `export` sintaksisini ishlatadi hamda brauzerlarda ham, Node.js da ham ishlovchi universal ECMAScript standartidir. Bundan tashqari ESM dagi `import` faqat fayl boshida chaqirilishi mumkin (top-level), `require()` ni esa xohlagan joyda chaqirish mumkin (shartlar ichida ham).\n\n2. **Savol:** `fs.readFile` va `fs.readFileSync` o'rtasidagi farq nima? Qachon qaysi birini ishlatish kerak?\n   **Javob:** `fs.readFile` asinxron ishlaydi (Non-blocking), ya'ni fayl o'qilayotganda dasturning boshqa qismlari ishlashda davom etadi (Event Loop band qilinmaydi). `fs.readFileSync` esa sinxron (Blocking), fayl o'qilib bo'lgunicha butun Node.js jarayoni to'xtab turadi. `readFileSync` ni faqat dastur ishga tushayotganda initsializatsiya (masalan, config fayllarni o'qish) vaqtida ishlatish mumkin, lekin server ishlab turgan (Request kelib turgan) vaqtda UMUMAN ishlatish mumkin emas.\n\n3. **Savol:** Node.js da `package.json` da `\"type\": \"module\"` yozilsa nima o'zgaradi?\n   **Javob:** Agar `package.json` da `\"type\": \"module\"` ko'rsatilsa, Node.js barcha `.js` fayllarni avtomatik tarzda ES Modules sifatida qabul qiladi. Bu shuni anglatadiki, siz barcha kodlarda CommonJS ning `require()` o'rniga zamonaviy `import / export` ishlatishingiz mumkin bo'ladi. Agar sizga shu loyiha doirasida hamon CommonJS kerak bo'lsa, bunday fayllar kengaytmasini `.cjs` ga o'zgartirishingizga to'g'ri keladi.\n",
  exercises: [
  {
    "id": 1,
    "title": "Oddiy qo'shish moduli (CommonJS)",
    "instruction": "math.js fayli tasavvurida yozamiz. Ikkita sonni qo'shuvchi 'add' funksiyasini yozing va uni module.exports orqali eksport qiling. \n\nDiqqat: Sinov uchun faqat 'module.exports = { add };' dan foydalaning.",
    "startingCode": "function add(a, b) {\n  // kodingiz bu yerda\n}\n\nmodule.exports = {};",
    "hint": "module.exports obyektiga add funksiyasini bering.",
    "test": "const math = module.exports; if(typeof math.add !== 'function') throw new Error('add funksiyasi eksport qilinmadi'); if(math.add(2, 3) !== 5) throw new Error('add noto\\'g\\'ri hisobladi');"
  },
  {
    "id": 2,
    "title": "Xabar generatsiyasi (ESM uslubi)",
    "instruction": "Zamonaviy ES Modules orqali 'greet' funksiyasini eksport qiling. Funksiya ismni qabul qilib, 'Salom, ISMon!' degan string qaytarsin. \n\nDiqqat: Sinovda ishlay olishi uchun faqat 'export const greet = ...' dan foydalaning (mock qilingan ESM).",
    "startingCode": "export const greet = (name) => {\n  // kodingiz bu yerda\n};",
    "hint": "Backtick (``) ishlatsangiz osonroq bo'ladi.",
    "test": "if(typeof greet !== 'function') throw new Error('greet topilmadi'); if(greet('Ali') !== 'Salom, Ali!') throw new Error('Noto\\'g\\'ri xabar qaytdi');"
  },
  {
    "id": 3,
    "title": "Modullarni chaqirish (require)",
    "instruction": "Tasavvur qiling bizda './config.js' moduli bor va u { port: 3000 } obyektini qaytaradi. Shu modulni 'require' yordamida 'config' o'zgaruvchisiga oling va port qiymatini console.log da chiqaring.",
    "startingCode": "// './config.js' faylini require qiling\n\nconsole.log(config.port);",
    "hint": "const config = require('./config.js');",
    "test": "if (typeof config === 'undefined') throw new Error('config o\\'zgaruvchisi yo\\'q'); if (config.port !== 3000) throw new Error('config port noto\\'g\\'ri');"
  },
  {
    "id": 4,
    "title": "Modullarni chaqirish (import)",
    "instruction": "Tasavvur qiling bizda './utils.mjs' faylida 'formatDate' nomli funksiya bor. Uni ESM yordamida import qiling va 'now' o'zgaruvchisiga o'zlashtirib foydalaning (dastlabki kodga qarang).",
    "startingCode": "// import qiling:\n\nconst now = formatDate(new Date());",
    "hint": "import { formatDate } from './utils.mjs';",
    "test": "if (typeof formatDate === 'undefined') throw new Error('formatDate import qilinmadi'); if (!now) throw new Error('now o\\'rnatilmadi');"
  },
  {
    "id": 5,
    "title": "File System: Fayl yozish (Sinxron)",
    "instruction": "'fs' modulini ishlatib 'hello.txt' fayliga 'Salom Node' matnini yozing. Buning uchun fs.writeFileSync ishlating.",
    "startingCode": "const fs = require('fs');\n\n// hello.txt fayliga yozing",
    "hint": "fs.writeFileSync('hello.txt', 'Salom Node');",
    "test": "if (!fs.existsSync('hello.txt')) throw new Error('Fayl yaratilmadi'); const d = fs.readFileSync('hello.txt', 'utf8'); if(d !== 'Salom Node') throw new Error('Fayl ichi noto\\'g\\'ri');"
  },
  {
    "id": 6,
    "title": "File System: Fayl o'qish (Sinxron)",
    "instruction": "fs.readFileSync yordamida 'info.txt' faylidan ma'lumotni 'utf8' formatida o'qib 'content' o'zgaruvchisiga saqlang.",
    "startingCode": "const fs = require('fs');\nfs.writeFileSync('info.txt', 'Sirli malumot'); // bu fayl bor deb faraz qilamiz\n\nconst content = null; // o'qish kodi bu yerda",
    "hint": "const content = fs.readFileSync('info.txt', 'utf8');",
    "test": "if (content !== 'Sirli malumot') throw new Error('Fayl to\\'g\\'ri o\\'qilmadi yoki encoding xato');"
  },
  {
    "id": 7,
    "title": "File System: Asinxron yozish (fs/promises)",
    "instruction": "'fs/promises' dan writeFile funksiyasini oling. log.txt fayliga 'Hello Async' deb yozuvchi asinxron 'writeLog' funksiyasini yozing.",
    "startingCode": "const fs = require('fs/promises');\n\nasync function writeLog() {\n  // yozing\n}",
    "hint": "await fs.writeFile('log.txt', 'Hello Async');",
    "test": "writeLog().then(() => { const { readFileSync } = require('fs'); if(readFileSync('log.txt','utf8') !== 'Hello Async') throw new Error('Xato matn'); }).catch(e => { throw e; })"
  },
  {
    "id": 8,
    "title": "Fayl mavjudligini tekshirish",
    "instruction": "Sinxron fs modulidagi qaysi metod yordamida fayl bor-yo'qligini bilish mumkin? 'test.txt' bor-yo'qligini tekshirib 'isExist' o'zgaruvchisiga saqlang.",
    "startingCode": "const fs = require('fs');\nfs.writeFileSync('test.txt', 'OK');\n\nconst isExist = false; // kodingiz",
    "hint": "fs.existsSync ishlatiladi.",
    "test": "if(isExist !== true) throw new Error('existsSync dan foydalaning va to\\'g\\'ri o\\'zgaruvchiga oling');"
  },
  {
    "id": 9,
    "title": "Papkalar yaratish",
    "instruction": "Node.js da fs.mkdirSync yordamida papka yaratish mumkin. 'my-folder' nomli papka yarating.",
    "startingCode": "const fs = require('fs');\n\n// papka yarating",
    "hint": "fs.mkdirSync('my-folder');",
    "test": "if(!fs.existsSync('my-folder')) throw new Error('my-folder topilmadi');"
  },
  {
    "id": 10,
    "title": "JSON faylni o'qish va parse qilish",
    "instruction": "data.json faylida '{\"name\":\"Node\"}' yozilgan. fs.readFileSync orqali uni o'qing va JSON.parse qilib 'obj' o'zgaruvchisiga oling.",
    "startingCode": "const fs = require('fs');\nfs.writeFileSync('data.json', '{\"name\":\"Node\"}');\n\n// obj o'zgaruvchisini hosil qiling\nconst obj = null;",
    "hint": "JSON.parse(fs.readFileSync('data.json', 'utf8'))",
    "test": "if(!obj || obj.name !== 'Node') throw new Error('JSON to\\'g\\'ri o\\'qilmadi yoki parse qilinmadi');"
  }
],
  quizzes: [
  {
    "id": 1,
    "question": "CommonJS modullarida fayldan nimanidir eksport qilish uchun qaysi sintaksis ishlatiladi?",
    "options": [
      "export default {}",
      "module.exports = {}",
      "exports -> {}",
      "module.send = {}"
    ],
    "correctAnswer": 1,
    "explanation": "Node.js da (CommonJS) module.exports obyektiga qiymat biriktirish orqali eksport qilinadi."
  },
  {
    "id": 2,
    "question": "ESM (ES Modules) da bitta asosiy (default) qiymatni eksport qilish uchun nima ishlatiladi?",
    "options": [
      "module.exports.default = ...",
      "export main ...",
      "export default ...",
      "export-base ..."
    ],
    "correctAnswer": 2,
    "explanation": "ESM da bitta fayldan asosiy qiymatni chiqarish uchun 'export default' ishlatiladi."
  },
  {
    "id": 3,
    "question": "Boshqa CommonJS modulini faylga olib kirish uchun qaysi funksiyadan foydalaniladi?",
    "options": [
      "include()",
      "import()",
      "require()",
      "fetch()"
    ],
    "correctAnswer": 2,
    "explanation": "CommonJS da modullar 'require()' yordamida import qilinadi."
  },
  {
    "id": 4,
    "question": "Agar fs.readFile ni Callback versiyasida ishlatsak, callback funksiyaning birinchi parametri nima bo'ladi?",
    "options": [
      "data",
      "error",
      "success",
      "fayl nomi"
    ],
    "correctAnswer": 1,
    "explanation": "Node.js da deyarli barcha asinxron callback'larning birinchi argumenti 'error' (yoki null) hisoblanadi (Error-first callback)."
  },
  {
    "id": 5,
    "question": "Dastur ishlashini davom ettirmasdan turib, ma'lum bir fayl o'qib bo'lingunicha kutib turadigan 'fs' funksiyasi qaysi?",
    "options": [
      "fs.readFile()",
      "fs.readAsync()",
      "fs.readFileSync()",
      "fs.waitFile()"
    ],
    "correctAnswer": 2,
    "explanation": "Sinxron funksiyalar (Sync bilan tugaydigan) Event Loop'ni to'sib qo'yadi va to'liq bajarilmaguncha keyingi kodga o'tmaydi."
  },
  {
    "id": 6,
    "question": "Faylni asinxron tarzda o'qish (Promise qaytaradigan usul) uchun nimani import qilish tavsiya etiladi?",
    "options": [
      "require('fs/promises')",
      "require('fs/async')",
      "require('promise-fs')",
      "require('fs').promisesAsync"
    ],
    "correctAnswer": 0,
    "explanation": "Node.js da barcha Promise-based fs metodlari 'fs/promises' modulining ichida joylashgan."
  },
  {
    "id": 7,
    "question": "Fayl yaratish yoki uning ichidagi matnni to'liq yangisiga almashtirish uchun fs ni qaysi metodi ishlatiladi?",
    "options": [
      "fs.appendFile",
      "fs.updateFile",
      "fs.writeFile",
      "fs.create"
    ],
    "correctAnswer": 2,
    "explanation": "writeFile ko'rsatilgan faylga matn yozadi. Agar fayl bo'lmasa yaratadi, bor bo'lsa oldingi matnni butunlay o'chirib yangisini yozadi."
  },
  {
    "id": 8,
    "question": "Oldingi matnni o'chirmasdan, uning davomidan yangi matn qo'shish uchun qaysi fs metodi ishlatiladi?",
    "options": [
      "fs.writeFile",
      "fs.concatFile",
      "fs.appendFile",
      "fs.insertFile"
    ],
    "correctAnswer": 2,
    "explanation": "appendFile faylning oxiriga ma'lumotni qo'shadi."
  },
  {
    "id": 9,
    "question": "Loyiha papkasida package.json faylidagi qaysi qator barcha JS fayllarni ES Modules sifatida qabul qilinishiga olib keladi?",
    "options": [
      "\"module\": \"es6\"",
      "\"type\": \"module\"",
      "\"esm\": true",
      "\"export\": \"all\""
    ],
    "correctAnswer": 1,
    "explanation": "\"type\": \"module\" qatori orqali loyihada default CommonJS o'rniga zamonaviy ESM moduli ishga tushadi."
  },
  {
    "id": 10,
    "question": "fs modulida papkalarni ro'yxatga olish (papkadagi fayllar nomini o'qish) uchun qaysi metod ishlatiladi?",
    "options": [
      "fs.readFolder",
      "fs.listDir",
      "fs.readdir",
      "fs.showFiles"
    ],
    "correctAnswer": 2,
    "explanation": "fs.readdir (yoki sinxron ko'rinishi readdirSync) ko'rsatilgan yo'ldagi barcha fayl va papkalar nomini array ko'rinishida qaytaradi."
  },
  {
    "id": 11,
    "question": "Faylni yoki papkani o'chirish uchun qaysi asinxron fs metodi xavfsiz va zamonaviy hisoblanadi (fs/promises ishlatganda)?",
    "options": [
      "fs.delete()",
      "fs.remove()",
      "fs.rm() yoki fs.unlink()",
      "fs.trash()"
    ],
    "correctAnswer": 2,
    "explanation": "Faylni o'chirish uchun unlink(), papkalarni (va umuman fayllarni ham) o'chirish uchun rm() ishlatiladi."
  },
  {
    "id": 12,
    "question": "Agar fs.readFile da encoding ('utf8') parametrsiz chaqirilsa, nima qaytariladi?",
    "options": [
      "String qaytariladi (xato matn shaklida)",
      "Buffer obyekti qaytariladi",
      "Undefined qaytariladi",
      "Xatolik (Error) tashlanadi"
    ],
    "correctAnswer": 1,
    "explanation": "Agar format ko'rsatilmasa, Node.js xom byte ma'lumotlarini Buffer obyekti ko'rinishida qaytaradi. Matnga aylantirish uchun d.toString() yoki boshidan 'utf8' berish kerak."
  }
]
};
