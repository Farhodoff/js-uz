export const declarationFiles = {
  id: "ts-declaration-files",
  title: "Declaration Files (.d.ts)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish
TypeScript'da **Declaration Files** (Ta'riflash fayllari) — bu kengaytmasi \`.d.ts\` bo'lgan maxsus fayllardir. Ularning yagona maqsadi — TypeScript ga mavjud JavaScript kodining **turlari (types)** haqida ma'lumot berish.
Tasavvur qiling, siz toza JavaScript da yozilgan kutubxonani (masalan, jQuery yoki Lodash) TypeScript loyihangizda ishlatmoqchisiz. TypeScript ularning ichida qanday funksiyalar borligini bilmaydi. Shunda siz yoki tayyor \`.d.ts\` faylini yuklab olasiz, yoki o'zingiz "Bu yerda shunday funksiya bor va u raqam qaytaradi" deb yozib qo'yasiz.

Asosiy kalit so'z — \`declare\`. U TypeScript ga: "Menga ishon, dastur ishlaganda shu narsa albatta mavjud bo'ladi" deydi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON Yondashuv (Xavfsizliksiz any):**
\`\`\`typescript
// tashqi JS fayldagi noma'lum o'zgaruvchi
const lodash: any = require('lodash'); 
// hech qanday yordam (autocomplete) va xato tekshiruvi yo'q!
lodash.chunk([1,2,3]);
\`\`\`

✅ **YAXSHI Yondashuv (Ta'riflash fayli bilan):**
\`\`\`typescript
// custom.d.ts fayli ichida yozamiz:
declare module "lodash" {
  export function chunk<T>(array: T[], size?: number): T[][];
}

// app.ts ichida endi autocomplete va tiplar ishlaydi
import { chunk } from 'lodash';
chunk([1, 2, 3, 4], 2);
\`\`\`

## 🎤 Intervyu Savollari
1. **\`.d.ts\` va \`.ts\` fayllarning farqi nima?**
   - Javob: \`.ts\` faylida amaliy kod va mantiq yoziladi va u oxirida JS ga kompilyatsiya bo'ladi. \`.d.ts\` faylida esa faqat turlar e'lon qilinadi (declare), unda mantiq bo'lmaydi va u JS faylga o'girilmaydi.
2. **\`declare module\` nima uchun kerak?**
   - Javob: TypeScript tanimaydigan JavaScript kutubxonalari (npm paketlar) uchun maxsus modul ekanligini va uning ichida qanday metodlar borligini ko'rsatish uchun.
3. **\`@types/...\` nima?**
   - Javob: Mashhur JavaScript kutubxonalarining (masalan \`@types/node\`, \`@types/react\`) jamoat tomonidan yozib qo'yilgan \`.d.ts\` fayllari to'plami (DefinitelyTyped).

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD;
    JS[Lodash.js] --> TSCode[TypeScript kodi];
    DTS[lodash.d.ts] -.->|Turlar ta'rifi| TSCode;
    TSCode --> Compiler[TS Compiler];
    Compiler -->|Faqat JS kompilyatsiya bo'ladi| JSFinal[Natijaviy JS];
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Global o'zgaruvchi",
      instruction: "Loyiha bo'ylab HTML ichidan keladigan `PI` degan global o'zgaruvchi mavjudligini TypeScript ga tanitish uchun uni `number` sifatida e'lon qiling (`declare var`).",
      startingCode: "// PI ni e'lon qiling\n",
      hint: "declare var PI: number; yozing.",
      solution: "declare var PI: number;",
      test: "return /declare\\s+var\\s+PI\\s*:\\s*number/.test(code);"
    },
    {
      id: 2,
      title: "Global funksiya",
      instruction: "`showAlert` nomli global funksiya mavjud bo'lib, u `msg: string` parametr oladi va hech narsa qaytarmaydi. Buni e'lon qiling.",
      startingCode: "// showAlert funksiyasini ta'riflang\n",
      hint: "declare function showAlert(msg: string): void;",
      solution: "declare function showAlert(msg: string): void;",
      test: "return /declare\\s+function\\s+showAlert\\s*\\(\\s*msg\\s*:\\s*string\\s*\\)\\s*:\\s*void/.test(code);"
    },
    {
      id: 3,
      title: "Modul ta'rifi",
      instruction: "`\"my-lib\"` nomli tashqi kutubxona uchun modul e'lon qiling. Modul ichida bo'sh tana `{}` qo'ying.",
      startingCode: "// my-lib modulini declare qiling\n",
      hint: "declare module \"my-lib\" { }",
      solution: "declare module \"my-lib\" {\n\n}",
      test: "return /declare\\s+module\\s+['\"]my-lib['\"]\\s*\\{/.test(code);"
    },
    {
      id: 4,
      title: "Window interfeysini kengaytirish",
      instruction: "Brauzerning `Window` obyektiga `myPlugin` obyekti qo'shilgan. TypeScript xato bermasligi uchun `Window` interfeysini kengaytirib unga `myPlugin: any` xususiyatini yozing.",
      startingCode: "interface Window {\n  // shu yerga yozing\n}",
      hint: "myPlugin: any; kiriting.",
      solution: "interface Window {\n  myPlugin: any;\n}",
      test: "return /interface\\s+Window\\s*\\{\\s*myPlugin\\s*:\\s*any\\s*;?\\s*\\}/.test(code);"
    },
    {
      id: 5,
      title: "Global class",
      instruction: "`Logger` nomli global klass borligini ta'riflang. Uning ichida `log(message: string): void` metodi bo'lsin.",
      startingCode: "// Logger classini e'lon qiling\n",
      hint: "declare class Logger { ... }",
      solution: "declare class Logger {\n  log(message: string): void;\n}",
      test: "return /declare\\s+class\\s+Logger\\s*\\{\\s*log\\s*\\(\\s*message\\s*:\\s*string\\s*\\)\\s*:\\s*void\\s*;?\\s*\\}/.test(code);"
    },
    {
      id: 6,
      title: "Rasm fayllari uchun modul",
      instruction: "TypeScript da `.png` rasm fayllarini import qilganda xato chiqmasligi uchun `\"*.png\"` modulini ta'riflang va undan `any` qiymat export bo'lishini ko'rsating.",
      startingCode: "declare module \"*.png\" {\n  const value: any;\n  // shu yerdan value ni export qiling (export default value)\n}",
      hint: "export default value; yozing.",
      solution: "declare module \"*.png\" {\n  const value: any;\n  export default value;\n}",
      test: "return /declare\\s+module\\s+['\"]\\*\\.png['\"]\\s*\\{[^}]*export\\s+default\\s+value/.test(code);"
    },
    {
      id: 7,
      title: "Namespace",
      instruction: "`MathLib` degan global obyekt (namespace) ichida `add(a: number, b: number): number` funksiyasi bor. Buni `declare namespace` orqali ta'riflang.",
      startingCode: "// MathLib ni e'lon qiling\n",
      hint: "declare namespace MathLib { export function add(...) }",
      solution: "declare namespace MathLib {\n  export function add(a: number, b: number): number;\n}",
      test: "return /declare\\s+namespace\\s+MathLib\\s*\\{[^}]*export\\s+function\\s+add\\s*\\(\\s*[ab]\\s*:\\s*number\\s*,\\s*[ab]\\s*:\\s*number\\s*\\)\\s*:\\s*number/.test(code);"
    },
    {
      id: 8,
      title: "Global o'zgarmas (const)",
      instruction: "Webpack yoki Vite kabi bundler'lar orqali keladigan `VERSION` nomli global konstantani `string` sifatida declare qiling.",
      startingCode: "// VERSION ni declare qiling\n",
      hint: "declare const VERSION: string;",
      solution: "declare const VERSION: string;",
      test: "return /declare\\s+const\\s+VERSION\\s*:\\s*string/.test(code);"
    },
    {
      id: 9,
      title: "Turlarni export qilish",
      instruction: "Boshqa fayllarda ishlatish uchun `User` nomli interfeysni (`id: number`) to'g'ridan-to'g'ri `export` kalit so'zi bilan e'lon qiling.",
      startingCode: "// User interfeysini e'lon qilib export qiling\n",
      hint: "export interface User { id: number; }",
      solution: "export interface User {\n  id: number;\n}",
      test: "return /export\\s+interface\\s+User\\s*\\{\\s*id\\s*:\\s*number\\s*;?\\s*\\}/.test(code);"
    },
    {
      id: 10,
      title: "NodeJS Environment",
      instruction: "`process.env.PORT` uchun TypeScript yordam berishi maqsadida, `NodeJS` nomli namespace ichida `ProcessEnv` interfeysini e'lon qilib `PORT: string` qo'shing.",
      startingCode: "declare namespace NodeJS {\n  // ProcessEnv interfeysini yarating\n}",
      hint: "interface ProcessEnv { PORT: string; }",
      solution: "declare namespace NodeJS {\n  interface ProcessEnv {\n    PORT: string;\n  }\n}",
      test: "return /declare\\s+namespace\\s+NodeJS\\s*\\{\\s*interface\\s+ProcessEnv\\s*\\{\\s*PORT\\s*:\\s*string\\s*;?\\s*\\}\\s*\\}/.test(code);"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Ta'riflash (.d.ts) faylining asosiy maqsadi nima?",
      options: [
        "Loyiha tezligini oshirish",
        "TypeScript ga JavaScript kodining turlari haqida ma'lumot berish",
        "React komponentlarini render qilish",
        "Ma'lumotlar bazasiga ulanish"
      ],
      correctAnswer: 1,
      explanation: "TypeScript faqat .ts fayllarni tekshira oladi. JS kodlar uchun unga ularning 'shablonlari' (.d.ts) kerak bo'ladi."
    },
    {
      id: 2,
      question: "declare kalit so'zi qanday ma'noni beradi?",
      options: [
        "Yangi fayl yaratish",
        "O'zgaruvchini avtomatik o'chirish",
        "O'zgaruvchi yoki funksiya dastur ishlaganda qayerdandir aniq kelishini kompilyatorga aytish",
        "Class dan nusxa olish"
      ],
      correctAnswer: 2,
      explanation: "declare orqali TS ga xato bermaslik kerakligi, chunki amaliyotda bu narsa global obyektlarda borligi tushuntiriladi."
    },
    {
      id: 3,
      question: ".d.ts fayllari oxirida JS kodiga kompilyatsiya qilinadimi?",
      options: [
        "Ha, har doim",
        "Faqat ichida funksiya yozilgan bo'lsa",
        "Yo'q, ular faqat TS tekshiruvi uchun ishlatilib, kompilyatsiya qilinmaydi",
        "Ular CSS ga aylanadi"
      ],
      correctAnswer: 2,
      explanation: "Declaration fayllari butunlay 'xayoliy' bo'lib, JS dagi ko'rinishi mavjud bo'lmaydi."
    },
    {
      id: 4,
      question: "Tashqi JavaScript kutubxona uchun TS ko'rsatmalarini qayerdan topamiz?",
      options: [
        "Kutubxonani JS kodini o'qib",
        "DefinitelyTyped hamjamiyati yaratgan @types/paket-nomi paketlaridan",
        "Uni qilib bo'lmaydi",
        "tsconfig.json dan"
      ],
      correctAnswer: 1,
      explanation: "Mashhur kutubxonalarning turlari npm da @types/... ko'rinishida saqlanadi (masalan, @types/react)."
    },
    {
      id: 5,
      question: "Kutubxonani @types/ versiyasi bo'lmasa nima qilish kerak?",
      options: [
        "U kutubxonadan foydalana olmaymiz",
        "JS kutubxonani o'chirib TS da noldan yozamiz",
        "O'zimiz loyihada maxsus 'declare module' orqali yozib qo'yamiz",
        "Brauzerni o'zgartiramiz"
      ],
      correctAnswer: 2,
      explanation: "Shunday holatlarda 'declare module \"kutubxona-nomi\"' yozib custom declaration qilsak muammo hal bo'ladi."
    },
    {
      id: 6,
      question: "Rasm, CSS yoki JSON fayllarni TS da import qilganda xato bermasligi uchun qaysi sintaksis ishlatiladi?",
      options: [
        "declare file '*.css'",
        "declare module '*.css'",
        "import as '*'",
        "ignore file"
      ],
      correctAnswer: 1,
      explanation: "TS ga modullarni import qilish xavfsiz ekanini bildirish uchun 'declare module \"*.kengaytma\"' qilinadi."
    },
    {
      id: 7,
      question: "interface Window { ... } yordamida nima qilish mumkin?",
      options: [
        "Ekranda oyna ochish",
        "Mavjud global Window ob'ektiga o'zimizning qo'shimcha turlarimizni qo'shib qo'yish (Declaration Merging)",
        "React ilovasini yopish",
        "Serverga murojaat qilish"
      ],
      correctAnswer: 1,
      explanation: "TypeScript da bir xil nomdagi Interfeyslar birlashib ketadi (Merging), bu global ob'ektlarni o'zgartirishga juda qulay."
    },
    {
      id: 8,
      question: ".d.ts fayli ichida amaliy mantiq (masalan console.log('salom')) yozish mumkinmi?",
      options: [
        "Ha, mumkin",
        "Mumkin emas, .d.ts fayllarida faqat type e'lonlari (declarations) bo'lishi shart",
        "Faqat function tana qismida",
        "Ha, agar export bo'lsa"
      ],
      correctAnswer: 1,
      explanation: ".d.ts faqat turlarni ta'riflaydi, kodning qanday ishlashi (implementation) u yerga yozilmaydi."
    },
    {
      id: 9,
      question: "declare namespace nima uchun ishlatiladi?",
      options: [
        "HTML nomlarini guruhlash",
        "Global obyektning xususiyatlarini va funksiyalarini tartibli guruhlash uchun (masalan, jQuery ning '$' obyekti kabi)",
        "Kodni xavfsiz qilish uchun",
        "Hech qanday ma'nosi yo'q"
      ],
      correctAnswer: 1,
      explanation: "Bir qancha metodlarni o'zida jamlagan global o'zgaruvchilarni (masalan, Math) yozishda namespace qulay."
    },
    {
      id: 10,
      question: "declare var va declare let / const o'rtasida katta farq bormi?",
      options: [
        "Umuman farqi yo'q",
        "TypeScript da turlarni e'lon qilishda barchasi qabul qilinadi, lekin const bilan qilingani faqat o'qish uchun (readonly) ekanligini ham bildiradi",
        "declare var xato hisoblanadi",
        "let har doim number qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "declare const TS ga bu global o'zgaruvchini qayta o'zgartirib bo'lmasligini oldindan bildiradi."
    },
    {
      id: 11,
      question: "Muhit o'zgaruvchilari (process.env) turlarini qo'shish qanday qilinadi?",
      options: [
        "declare module 'env'",
        "declare namespace NodeJS qilib uning ichidagi ProcessEnv interfeysini kengaytirib",
        "process.ts fayl ochish orqali",
        "React dagi props kabi"
      ],
      correctAnswer: 1,
      explanation: "Node muhitida ishlaydigan TS da, aynan NodeJS namespace'ini va uning ProcessEnv'ini kengaytiramiz."
    },
    {
      id: 12,
      question: "Nima sababdan ba'zan biz o'zimiz .d.ts fayl yaratmaymiz?",
      options: [
        "Chunki ular zararli",
        "Agar biz TS da kod yozib komplyatsiya qilsak (declaration: true bilan), u avtomatik ravishda d.ts faylini yaratib beradi",
        "Chunki JS yetarli",
        "TS tezligini pasaytiradi"
      ],
      correctAnswer: 1,
      explanation: "tsconfig.json da 'declaration: true' qilinganda TS har bir .ts fayl uchun tayyor .d.ts generatsiya qilib beradi."
    }
  ]
};
