export const modulesLesson = {
  id: "modules",
  title: "Modules va ES6 Import/Export: Kod Tashkilashishi",
  level: "Murakkab",
  description: "Modullar, Named/Default exports, Import patterns, va Kod strukturasi.",
  theory: `## 1. NEGA kerak?
Loyihalar kattalashgani sari barcha kodlarni bitta faylda saqlash imkonsiz bo'lib qoladi. Kodlarimizni mantiqiy bo'laklarga ajratish, har bir faylni o'z vazifasi bilan cheklash, global nomlar to'qnashuvini (scope conflict) oldini olish va kodni qayta ishlatish uchun **Modules (Modullar)** tizimi kerak. Statik tahlil imkoniyati orqali keraksiz kodlarni o'chirib yuborish (Tree-shaking) ham modullarning katta afzalligi hisoblanadi.

---

## 2. SODDALIK (Analogiya)
Buni **Lego konstruktori** deb tasavvur qiling:
- Har bir Lego bo'lagi — bu alohida modul. Ularning har biri o'z shakli va vazifasiga ega.
- Siz bu bo'laklarni alohida qutidan olasiz (\`import\`), birlashtirasiz va katta "bino" (loyiha) qurasiz.
- Agar biror bo'lak buzilsa, butun binoni buzish shart emas, faqat o'sha Lego bo'lagini almashtirish yetarli.

---

## 3. STRUKTURA VA CHUQUR TUSHUNCHALAR

### A. CommonJS vs ES Modules (ESM)
JavaScript-da ikkita asosiy modul tizimi mavjud:
1. **CommonJS (CJS):** Node.js muhiti uchun yaratilgan eski tizim. Eksport qilishda \`module.exports\`, import qilishda esa \`require()\` ishlatiladi. Bu tizim dinamik ravishda runtime-da ishlaydi (sinxron yuklanadi).
2. **ES Modules (ESM):** JS standartining rasmiy moduli. Eksport qilishda \`export\`, importda esa \`import\` ishlatiladi. Bu tizim **statik** tahlil qilinadi, loyiha ishga tushishidan avval parsing qilinadi.

| Xususiyat | CommonJS (CJS) | ES Modules (ESM) |
| :--- | :--- | :--- |
| **Sintaksis** | \`require()\` / \`module.exports\` | \`import\` / \`export\` |
| **Yuklanish turi** | Sinxron / Dinamik (Runtime) | Asinxron / Statik (Parse-time) |
| **Fayl darajasida \`this\`** | \`exports\` obyektiga teng | \`undefined\` (Strict mode) |
| **Tree-shaking** | Qo'llab-quvvatlanmaydi | To'liq qo'llab-quvvatlanadi |
| **Top-level Await** | Yo'q | Ha |

### B. ESM yuklanish bosqichlari
ESM modul yuklagich (loader) modulni yuklashda 3 ta bosqichdan o'tadi:
1. **Construction (Yaratish):** Barcha import qilinishi kerak bo'lgan fayllarni topadi, yuklab oladi va parse qiladi (modul rekursiv daraxti tuziladi).
2. **Instantiation (Xotira ajratish):** Eksport qilinadigan va import qilinadigan o'zgaruvchilar uchun xotiradan joy ajratadi (lekin ularga qiymat bermaydi). Bunda **live bindings** (jonli bog'lanishlar) o'rnatiladi.
3. **Evaluation (Bajarish):** Kodni qator-baqator ishga tushiradi va xotiradagi o'zgaruvchilarga haqiqiy qiymatlarni beradi.

\`\`\`mermaid
sequenceDiagram
    participant B as Browser/Node
    participant C as Construction (Parsing)
    participant I as Instantiation (Link)
    participant E as Evaluation (Run)
    B->>C: index.js yuklanadi va parse qilinadi
    C-->>B: Modullar daraxti (AST) hosil bo'ladi
    B->>I: Eksportlar va importlar bog'lanadi (Live Bindings)
    B->>E: Kod ishga tushiriladi (Evaluation)
\`\`\`

### C. Circular Dependencies (Aylanma bog'liqliklar)
Aylanma bog'liqlik — A moduli B-ni, B moduli esa A-ni import qilganda yuzaga keladi.
* **CommonJS-da:** \`require()\` sinxron yuklagani uchun circular dependency bo'lganda, chala yuklangan (chala obyekt) holat qaytadi va kutilmagan xatolar (masalan, undefined metodlar) paydo bo'lishi mumkin.
* **ESM-da:** Live bindings (jonli bog'lanishlar) yordamida o'zgaruvchilar oldindan bir-biriga bog'lanadi (TDZ - Temporal Dead Zone qoidalari amal qiladi). Agar evaluation jarayonida hali qiymat berilmagan o'zgaruvchiga murojaat qilsak, **ReferenceError** otiladi, bu chala obyekt bilan jimgina ishlashdan ko'ra ancha xavfsizroq.

\`\`\`mermaid
graph LR
    A[modulA.js] -->|import| B[modulB.js]
    B -->|import| A
    style A fill:#1a237e,stroke:#3949ab,stroke-width:2px,color:#fff
    style B fill:#1a237e,stroke:#3949ab,stroke-width:2px,color:#fff
\`\`\`

---

## 4. XATOLAR (Common Mistakes)
1. **Live Bindings mutatsiyasi:** Import qilingan o'zgaruvchini import qilgan fayl ichida o'zgartirishga urinish. Ular faqat o'qish uchun (read-only bindings) mo'ljallangan. Uni faqat eksport qilgan modulning o'zi o'zgartira oladi.
2. **Dynamic import-ni keraksiz ishlatish:** Dinamik import har doim Promise qaytargani sababli, oddiy yuklanishi kerak bo'lgan modullarni dinamik import qilish asinxronlikni oshirib, kodni chigallashtiradi. Faqat conditional yoki lazy loading zarur bo'lgandagina foydalanish kerak.

---

## 5. SAVOLLAR VA JAVOBLAR
**1. ESM va CommonJS farqi nima?**
ESM (import/export) statik tahlil qilinadi va brauzer/loyihalarda Tree-shaking imkonini beradi. CommonJS (require/module.exports) esa asosan Node.js muhitida dinamik ishlaydigan eski tizimdir.

**2. Tree-shaking nima?**
Loyiha yig'ilayotganda (build jarayonida) modullardan import qilinmagan va umuman ishlatilmagan ortiqcha kodlarni olib tashlash orqali fayl hajmini kamaytirish usuli.

**3. Re-export nima?**
Boshqa fayldan kelayotgan eksportlarni o'zimizda import qilmasdan, to'g'ridan-to'g'ri tashqariga qayta eksport qilish (\`export * from './file.js'\`).`,
  exercises: [
    {
      id: 1,
      title: "Named Export",
      instruction: "math.js faylidan PI ni export qiling.",
      startingCode: "const PI = 3.14;\n// Bu yerga yozing",
      hint: "export { PI };",
      test: "if (code.includes('export')) return null; return 'export kalit so\\'zidan foydalaning';"
    },
    {
      id: 2,
      title: "Default Export",
      instruction: "logger.js faylidan log funksiyasini default export qiling.",
      startingCode: "function log(msg) { console.log(msg); }\n// Default export qiling\n",
      hint: "export default log;",
      test: "if (code.includes('export default')) return null; return 'export default kalit so\\'zidan foydalaning';"
    },
    {
      id: 3,
      title: "Named Import",
      instruction: "math.js faylidan add va subtract funksiyalarini import qiling.",
      startingCode: "// Bu yerda import yozing\n",
      hint: "import { add, subtract } from './math.js';",
      test: "if (code.includes('import') && code.includes('add') && code.includes('subtract') && code.includes('./math.js')) return null; return 'import { add, subtract } from \\'./math.js\\' yozing';"
    },
    {
      id: 4,
      title: "Import Renaming (as)",
      instruction: "utils.js faylidan formatDate funksiyasini format nomi bilan import qiling.",
      startingCode: "// Bu yerda import yozing\n",
      hint: "import { formatDate as format } from './utils.js';",
      test: "if (code.includes('import') && code.includes('formatDate as format') && code.includes('./utils.js')) return null; return 'formatDate as format dan foydalanib import qiling';"
    },
    {
      id: 5,
      title: "Namespace Import (*)",
      instruction: "db.js faylidagi barcha eksportlarni db obyekti sifatida import qiling.",
      startingCode: "// Bu yerda import yozing\n",
      hint: "import * as db from './db.js';",
      test: "if (code.includes('import * as db') && code.includes('./db.js')) return null; return 'import * as db from \\'./db.js\\' ko\\'rinishida yozing';"
    },
    {
      id: 6,
      title: "Re-exporting",
      instruction: "Boshqa joydan import qilmasdan, math.js faylidagi barcha nomli eksportlarni joriy fayldan to'g'ridan-to'g'ri re-export qiling.",
      startingCode: "// Bu yerga yozing\n",
      hint: "export * from './math.js';",
      test: "if (code.includes('export * from') && code.includes('./math.js')) return null; return 'export * from \\'./math.js\\' ko\\'rinishida re-export qiling';"
    },
    {
      id: 7,
      title: "Re-export Default",
      instruction: "auth.js faylining default eksportini joriy fayldan defaultAuth nomi ostida nomli eksport qilib yuboring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "export { default as defaultAuth } from './auth.js';",
      test: "if (code.includes('export') && code.includes('default as defaultAuth') && code.includes('./auth.js')) return null; return 'export { default as defaultAuth } from \\'./auth.js\\' yozing';"
    },
    {
      id: 8,
      title: "Dynamic Import",
      instruction: "Dynamic import yordamida runtime-da './analytics.js' modulini yuklang va resolved bo'lgan modulni qaytaring.",
      startingCode: "function loadAnalytics() {\n  // Dinamik import ishlatib modulni qaytaring (Promise)\n}",
      hint: "return import('./analytics.js');",
      test: "if (code.includes('import(') && code.includes('./analytics.js')) return null; return 'import(\\'./analytics.js\\') funksiyasini chaqiring';"
    },
    {
      id: 9,
      title: "Inline Named Export",
      instruction: "double funksiyasini e'lon qilish paytidayoq eksport qiling (inline export).",
      startingCode: "// Funksiyani e'lon qilishda to'g'ridan-to'g'ri eksport qiling\nfunction double(x) { return x * 2; }",
      hint: "export function double(x) { return x * 2; }",
      test: "if (code.includes('export function double')) return null; return 'Funksiyani inline export qiling (export function double)';"
    },
    {
      id: 10,
      title: "Exporting Multiple Variables",
      instruction: "let x = 1 va let y = 2 o'zgaruvchilarini bitta blokda eksport qiling.",
      startingCode: "let x = 1;\nlet y = 2;\n// Blokda eksport qiling\n",
      hint: "export { x, y };",
      test: "if (code.includes('export {') && code.includes('x') && code.includes('y')) return null; return 'export { x, y } yordamida eksport qiling';"
    },
    {
      id: 11,
      title: "Default Exporting Class",
      instruction: "User klassini default export qiling.",
      startingCode: "class User {}\n// Default export qiling\n",
      hint: "export default class User {} yoki export default User;",
      test: "if (code.includes('export default class User') || code.includes('export default User')) return null; return 'User klassini default export qiling';"
    },
    {
      id: 12,
      title: "Aggregating Imports",
      instruction: "'./config.js' faylidan faqat url va port xossalarini nomli import qiling.",
      startingCode: "// Bu yerga yozing\n",
      hint: "import { url, port } from './config.js';",
      test: "if (code.includes('import') && code.includes('url') && code.includes('port') && code.includes('./config.js')) return null; return 'url va port ni import qiling';"
    },
    {
      id: 13,
      title: "1️⃣3️⃣ Dinamik Modul Yuklovchi (dynamicImportLoader)",
      instruction: "Dinamik ravishda `import()` yordamida modul yuklashni simulyatsiya qiluvchi va uning default yoki ma'lum bir nomli eksportini asinxron qaytaruvchi `dynamicImportLoader(modulePromise, exportName)` funksiyasini yozing. `modulePromise` — bu import natijasi kabi resolve bo'ladigan Promise obyekti bo'lib, uning ichida moduldagi eksportlar saqlanadi. Agar `exportName` berilmasa, default eksport qaytarilsin.",
      startingCode: "async function dynamicImportLoader(modulePromise, exportName) {\n  // Kodni shu yerdan yozing\n}",
      hint: "const module = await modulePromise; return exportName ? module[exportName] : module.default;",
      test: "if (typeof dynamicImportLoader !== 'function') return 'dynamicImportLoader funksiya emas';\nconst mockModule = { default: 'DefaultValue', named: 'NamedValue' };\nconst promise = Promise.resolve(mockModule);\nreturn new Promise(resolve => {\n  dynamicImportLoader(promise, 'named').then(val1 => {\n    if (val1 !== 'NamedValue') return resolve('Nomli eksport yuklanmadi');\n    dynamicImportLoader(promise).then(val2 => {\n      if (val2 !== 'DefaultValue') return resolve('Default eksport yuklanmadi');\n      resolve(null);\n    });\n  });\n});"
    },
    {
      id: 14,
      title: "1️⃣4️⃣ Eksport Nomlarini Ajratuvchi (extractExportNames)",
      instruction: "Matn (string) ko'rinishida berilgan sodda JavaScript kodidan named exports (nomli eksportlar) ro'yxatini ajratib oluvchi `extractExportNames(code)` funksiyasini yozing. Funksiya faqat `export const name = ...`, `export let name = ...` yoki `export function name(...)` formatidagi eksportlarni topib, ularning nomlarini massiv ko'rinishida qaytarsin.",
      startingCode: "function extractExportNames(code) {\n  // Kodni shu yerdan yozing\n}",
      hint: "const regex = /export\\s+(const|let|function)\\s+([a-zA-Z0-9_$]+)/g; const names = []; let match; while ((match = regex.exec(code)) !== null) { names.push(match[2]); } return names;",
      test: "if (typeof extractExportNames !== 'function') return 'extractExportNames funksiya emas';\nconst sampleCode = 'export const PI = 3.14;\\nexport function add(a, b) { return a+b; }\\nexport let counter = 0;\\nconst localVal = 100;';\nconst res = extractExportNames(sampleCode);\nif (res && res.includes('PI') && res.includes('add') && res.includes('counter') && res.length === 3) return null;\nreturn 'Eksport nomlarini ajratish xato: ' + JSON.stringify(res);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "ES Modules va CommonJS o'rtasidagi asosiy farq nima?",
      options: [
        "CommonJS faqat Node-da, ESM esa barcha joyda",
        "ESM statik va import/export ishlatadi, CommonJS dinamik va require ishlatadi",
        "ESM sekinroq",
        "Hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "ESM statik tahlil qilinadi, bu esa Tree-shaking kabi optimallashtirish imkonini beradi."
    },
    {
      id: 2,
      question: "Bitta faylda nechta `default export` bo'lishi mumkin?",
      options: ["1 ta", "2 ta", "Cheksiz", "0 ta"],
      correctAnswer: 0,
      explanation: "JavaScript qoidasiga ko'ra default eksport faqat bitta bo'lishi shart."
    },
    {
      id: 3,
      question: "Nomli (Named) exportlar qanday import qilinadi?",
      options: [
        "Qavssiz, istalgan nom bilan",
        "Gullik qavslar `{}` ichida eksport qilingan nomlar bilan",
        "Faqat `require` kalit so'zi yordamida",
        "Ular avtomatik ravishda global o'zgaruvchiga aylanadi"
      ],
      correctAnswer: 1,
      explanation: "Nomli (Named) eksportlarni import qilish uchun gullik qavslar `{}` va eksport qilingan paytdagi nomlardan foydalanish shart."
    },
    {
      id: 4,
      question: "Default export-ni import qilganda qanday qoida amal qiladi?",
      options: [
        "Faqat eksport qilingan nom bilan import qilish kerak",
        "Uni xohlagan nom bilan, gullik qavslarsiz import qilish mumkin",
        "Uni import qilish uchun `as` kalit so'zi shart",
        "Default exportni import qilib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Default eksport bitta bo'lgani uchun, import qiluvchi fayl unga o'zi xohlagan ixtiyoriy nomni berishi mumkin va u gullik qavslarga olinmaydi."
    },
    {
      id: 5,
      question: "ES Modules tizimida `this` qiymati eng yuqori darajada (fayl darajasida) nimaga teng bo'ladi?",
      options: [
        "window (yoki global)",
        "undefined",
        "null",
        "Modul obyektiga"
      ],
      correctAnswer: 1,
      explanation: "ES modullari har doim strict mode-da ishlaydi, va modul fayli darajasidagi `this` qiymati global obyekt emas, balki `undefined` bo'ladi."
    },
    {
      id: 6,
      question: "Dinamik import `import(path)` qanday qiymat qaytaradi?",
      options: [
        "Sinxron yuklangan modul obyektini",
        "Promise obyektini, u resolved bo'lganda modul eksportlarini beradi",
        "Callback funksiyani",
        "HTML script elementini"
      ],
      correctAnswer: 1,
      explanation: "import() dinamik ravishda modul yuklash uchun ishlatiladi va har doim Promise qaytaradi. Bu esa asinxron yuklash va code-splitting qilish imkonini beradi."
    },
    {
      id: 7,
      question: "Brauzerda ES Modules faylini to'g'ri ulash uchun script tegiga qaysi atribut berilishi shart?",
      options: [
        "type=\"javascript\"",
        "type=\"module\"",
        "async",
        "defer"
      ],
      correctAnswer: 1,
      explanation: "Brauzerda import/export ishlatadigan JavaScript faylini ulash uchun <script type=\"module\" src=\"...\"></script> ko'rinishida yozish kerak."
    },
    {
      id: 8,
      question: "Bitta faylda ham `default export`, ham bir nechta `named export` ishlatish mumkinmi?",
      options: [
        "Yo'q, faqat bittasini tanlash kerak",
        "Ha, ikkalasini ham bir vaqtda ishlatish mumkin",
        "Faqat node.js muhitida mumkin",
        "Faqat strict mode o'chirilgan bo'lsa mumkin"
      ],
      correctAnswer: 1,
      explanation: "JavaScript ES Modules tizimida bitta fayldan bitta default export va cheksiz miqdorda named exportlarni baravariga eksport qilish to'liq qo'llab-quvvatlanadi."
    },
    {
      id: 9,
      question: "CommonJS modul tizimidan ES Modules tizimiga o'tishning asosiy afzalligi nima?",
      options: [
        "ES Modules tezroq bajariladi",
        "Statik import tufayli bundlerlar Tree-shaking (keraksiz kodni o'chirish) qila oladi",
        "ES Modules sinxron yuklanadi",
        "Eski brauzerlarda to'g'ridan-to'g'ri ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "ES Modules statik tuzilishga ega bo'lgani uchun, kodni kompilyatsiya va yig'ish (build) bosqichida qaysi modullar ishlatilmayotganini aniqlab, ularni o'chirib yuborish (Tree-shaking) osonlashadi."
    },
    {
      id: 10,
      question: "export * from './module.js' ifodasi nima qiladi?",
      options: [
        "'module.js' ichidagi barcha o'zgaruvchilarni o'chirib tashlaydi",
        "'module.js' ichidagi barcha nomli eksportlarni import qilmasdan to'g'ridan-to'g'ri qayta eksport (re-export) qiladi",
        "Barcha eksportlarni konsolga yozadi",
        "Fayl ichidagi default export-ni eksport qiladi"
      ],
      correctAnswer: 1,
      explanation: "Bu re-exporting (qayta eksport) deyiladi. U boshqa modulning barcha nomli eksportlarini joriy fayl eksporti sifatida tashqariga uzatadi (default eksport bundan mustasno)."
    },
    {
      id: 11,
      question: "Nima uchun modullar ichidagi o'zgaruvchilar global scope-ga aralashib ketmaydi?",
      options: [
        "Chunki ular avtomatik o'chiriladi",
        "Chunki har bir modul o'zining alohida yopiq scope-iga ega",
        "Chunki brauzer ularni cheklaydi",
        "Chunki ular faqat funksiya ichida yoziladi"
      ],
      correctAnswer: 1,
      explanation: "Modullar global scope ifloslanishini oldini oladi. Har bir modul o'zining alohida yopiq scope-ida ishlaydi va faqat export qilingan narsalargina tashqariga ko'rinadi."
    },
    {
      id: 12,
      question: "import operatori yordamida import qilingan o'zgaruvchining qiymatini modul ichida to'g'ridan-to'g'ri o'zgartirish (reassign) mumkinmi?",
      options: [
        "Ha, oddiy o'zgaruvchidek o'zgartirsa bo'ladi",
        "Yo'q, import qilingan o'zgaruvchilar faqat o'qiladigan (read-only bindings) hisoblanadi",
        "Faqat let bilan eksport qilingan bo'lsa mumkin",
        "Faqat dynamic import bo'lsa mumkin"
      ],
      correctAnswer: 1,
      explanation: "Import qilingan o'zgaruvchilar 'live read-only bindings' hisoblanadi. Siz ularni import qilgan fayl ichida qayta yozib o'zgartira olmaysiz, lekin eksport qilgan modul o'zgartirsa, sizda ham yangilanadi."
    },
    {
      id: 13,
      question: "Circular dependency (aylanma bog'liqlik) holatida ES Modules CommonJS-dan qanday farq qiladi?",
      options: [
        "ESM live bindings tufayli ReferenceError bera oladi (yoki to'g'ri ishlaydi), CommonJS esa to'liq tugallanmagan (incomplete) eksport obyektini qaytaradi",
        "CommonJS ReferenceError tashlaydi, ESM esa hech qachon xato bermaydi",
        "Hech qanday farq yo'q, ikkalasi ham bir xil ishlaydi",
        "ESM dynamic import talab qiladi"
      ],
      correctAnswer: 0,
      explanation: "CommonJS-da circular dependency bo'lganda require chala obyekt qaytaradi va bu runtime'da kutilmagan undefined xatolarga olib kelishi mumkin. ESM esa live bindings-ni xotira bog'lanishida TDZ qoidalari bilan boshqarib, ReferenceError orqali xavfsizroq ogohlantiradi."
    },
    {
      id: 14,
      question: "ES Modules-dagi import-lar loyiha ishga tushishidan oldin (statik tahlil) tekshiriladi, bu nima deb ataladi?",
      options: [
        "Static Parsing / Compilation phase",
        "Dynamic Evaluation / Runtime interpretation",
        "Thread-safe execution",
        "Code splitting"
      ],
      correctAnswer: 0,
      explanation: "ESM modullari statik tuzilishga ega bo'lib, uning barcha import/export-lari kod bajarilishidan oldin parsing (statik tahlil) bosqichida tekshiriladi va bog'lanadi."
    }
  ]
};
