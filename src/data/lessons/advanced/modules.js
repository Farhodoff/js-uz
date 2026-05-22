export const modulesLesson = {
  id: "modules",
  title: "Modules va ES6 Import/Export: Kod Tashkilashishi",
  level: "Murakkab",
  description: "Modullar, Named/Default exports, Import patterns, va Kod strukturasi.",
  theory: `## 1. NEGA kerak?
Loyihalar kattalashgani sari barcha kodlarni bitta faylda saqlash imkonsiz bo'lib qoladi. Kodlarimizni mantiqiy bo'laklarga ajratish, har bir faylni o'z vazifasi bilan cheklash, global nomlar to'qnashuvini (scope conflict) oldini olish va kodni qayta ishlatish uchun **Modules (Modullar)** tizimi kerak.

## 2. SODDALIK (Analogiya)
Buni **Lego konstruktori** deb tasavvur qiling:
- Har bir Lego bo'lagi — bu alohida modul. Ularning har biri o'z shakli va vazifasiga ega.
- Siz bu bo'laklarni alohida qutidan olasiz (\`import\`), birlashtirasiz va katta "bino" (loyiha) qurasiz.
- Agar biror bo'lak buzilsa, butun binoni buzish shart emas, faqat o'sha Lego bo'lagini almashtirish yetarli.

## 3. STRUKTURA
ES6 modullarida ikkita asosiy eksport turi mavjud:
1. **Named Export (Nomli eksport):** Bitta moduldan bir nechta o'zgaruvchi yoki funksiyalarni nomi bilan eksport qilish. Import qilishda ham aynan shu nom ishlatilishi shart.
   \`\`\`javascript
   // math.js
   export const PI = 3.14;
   export function add(a, b) { return a + b; }
   \`\`\`
2. **Default Export:** Har bir fayldan faqat bitta bo'lishi mumkin bo'lgan asosiy eksport. Import qiluvchi ixtiyoriy nom berishi mumkin.
   \`\`\`javascript
   // logger.js
   export default function log(message) { console.log(message); }
   \`\`\`

## 4. AMALIYOT (Mashqlar pastda)
Modullarni qayta nomlash (aliasing) va hammasini birdaniga import qilish namunalari:
\`\`\`javascript
// 1. Nomni o'zgartirib import qilish (as)
import { add as sum } from './math.js';
console.log(sum(5, 10)); // 15

// 2. Hammasini bitta obyekt qilib import qilish (*)
import * as MathUtils from './math.js';
console.log(MathUtils.PI); // 3.14

// 3. Dinamik import (asinxron yuklash)
import('./analytics.js').then(module => {
  module.trackEvent('page_view');
});
\`\`\`

## 5. XATOLAR (Common mistakes)
- **Named export-ni qavssiz import qilish:** \`import PI from './math.js'\` xato (chunki PI named export). To'g'risi: \`import { PI } from './math.js'\`.
- **Default export-ni {} ichiga olish:** \`import { logger } from './logger.js'\` xato (agar u default bo'lsa). To'g'risi: \`import logger from './logger.js'\`.
- **Modulda 'this'dan foydalanish:** ES Modules fayl darajasida \`this\` doimo \`undefined\` bo'ladi, u \`window\` yoki global obyektga teng bo'lmaydi.

## 6. SAVOLLAR VA JAVOBLAR
**1. ESM va CommonJS farqi nima?**
ESM (\`import/export\`) statik tahlil qilinadi va brauzer/loyihalarda Tree-shaking imkonini beradi. CommonJS (\`require/module.exports\`) esa asosan Node.js muhitida dinamik ishlaydigan eski tizimdir.

**2. Tree-shaking nima?**
Loyiha yig'ilayotganda (build jarayonida) modullardan import qilinmagan va umuman ishlatilmagan ortiqcha kodlarni olib tashlash orqali fayl hajmini kamaytirish usuli.

**3. Re-export nima?**
Boshqa fayldan kelayotgan eksportlarni o'zimizda import qilmasdan, to'g'ridan-to'g'ri tashqariga qayta eksport qilish (\`export * from './file.js'\`).
`,
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
        "`window` (yoki global)",
        "`undefined`",
        "`null`",
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
      explanation: "`import()` dinamik ravishda modul yuklash uchun ishlatiladi va har doim Promise qaytaradi. Bu esa asinxron yuklash va code-splitting qilish imkonini beradi."
    },
    {
      id: 7,
      question: "Brauzerda ES Modules faylini to'g'ri ulash uchun script tegiga qaysi atribut berilishi shart?",
      options: [
        "`type=\"javascript\"`",
        "`type=\"module\"`",
        "`async`",
        "`defer`"
      ],
      correctAnswer: 1,
      explanation: "Brauzerda import/export ishlatadigan JavaScript faylini ulash uchun `<script type=\"module\" src=\"...\"></script>` ko'rinishida yozish kerak."
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
      question: "`export * from './module.js'` ifodasi nima qiladi?",
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
        "Chunki har bir modul o'zining shaxsiy (fayl darajasidagi) yopiq scope-iga ega",
        "Chunki brauzer ularni cheklaydi",
        "Chunki ular faqat funksiya ichida yoziladi"
      ],
      correctAnswer: 1,
      explanation: "Modullar global scope ifloslanishini oldini oladi. Har bir modul o'zining alohida yopiq scope-ida ishlaydi va faqat `export` qilingan narsalargina tashqariga ko'rinadi."
    },
    {
      id: 12,
      question: "`import` operatori yordamida import qilingan o'zgaruvchining qiymatini modul ichida to'g'ridan-to'g'ri o'zgartirish (reassign) mumkinmi?",
      options: [
        "Ha, oddiy o'zgaruvchidek o'zgartirsa bo'ladi",
        "Yo'q, import qilingan o'zgaruvchilar faqat o'qiladigan (read-only bindings) hisoblanadi",
        "Faqat `let` bilan eksport qilingan bo'lsa mumkin",
        "Faqat dynamic import bo'lsa mumkin"
      ],
      correctAnswer: 1,
      explanation: "Import qilingan o'zgaruvchilar 'live read-only bindings' hisoblanadi. Siz ularni import qilgan fayl ichida qayta yozib o'zgartira olmaysiz, lekin eksport qilgan modul o'zgartirsa, sizda ham yangilanadi."
    }
  ]
};