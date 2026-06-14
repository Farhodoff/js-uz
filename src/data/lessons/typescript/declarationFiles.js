export const declarationFiles = {
  id: "declarationFiles",
  title: "TypeScript Declaration Files (.d.ts)",
  language: "typescript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Declaration Files (.d.ts) nima?
TypeScript-da yozilmagan, lekin oddiy JavaScript kutubxonalari (masalan, eski npm paketlar) uchun tiplash qoidalari va deklaratsiyalarini saqlovchi maxsus fayllar **Declaration Files (Deklaratsiya fayllari / \\\`.d.ts\\\` fayllar)** deb ataladi.
Ular xuddi **dorilar qutisidagi yo'riqnomaga** o'xshaydi: qutining ichida haqiqiy dori (JavaScript kodi) bor, lekin uning qanday ishlashi, qanday dozalarda ichilishi haqidagi ma'lumot qog'ozda (yo'riqnomada / \\\`.d.ts\\\` faylda) yozilgan. Brauzer dorini (kodni) qabul qiladi, IDE va kompilyator esa yo'riqnomani (tiplarni) o'qib, sizga yordam beradi.

---

## 2. 💻 Real Kod Misollari

### 1. Global o'zgaruvchini e'lon qilish (declare)
Agar HTML faylingizda tashqi skript orqali global o'zgaruvchi (masalan, \\\`Kakao\\\` yoki \\\`analytics\\\`) qo'shilgan bo'lsa, TypeScript-ga bu haqda e'lon qilishingiz shart:
\\\`\\\`\\\`typescript
// src/global.d.ts fayli ichida:
declare const analytics: {
  trackEvent: (name: string, data?: object) => void;
};

// Endi istalgan TS faylida bemalol ishlatiladi:
analytics.trackEvent("user_login", { method: "google" });
\\\`\\\`\\\`

### 2. JavaScript Modulini tiplash
Agar sizda tiplari bo'lmagan oddiy \\\`math-utils.js\\\` fayli bo'lsa, unga xuddi shu nomdagi \\\`math-utils.d.ts\\\` faylini yaratib, tiplash kiritishingiz mumkin:
\\\`\\\`\\\`typescript
// src/utils/math-utils.d.ts fayli ichida:
declare module "math-utils" {
  export function add(a: number, b: number): number;
  export function subtract(a: number, b: number): number;
}
\\\`\\\`\\\`

### 3. Window obyektini kengaytirish
Window global obyektiga yangi xususiyat qo'shganda, uni TS tushunishi uchun interfeyslarni birlashtiramiz:
\\\`\\\`\\\`typescript
// global.d.ts ichida:
interface Window {
  myCustomConfig?: {
    apiKey: string;
    theme: "light" | "dark";
  };
}

// Kod ichida:
window.myCustomConfig = { apiKey: "key123", theme: "dark" };
\\\`\\\`\\\`

---

## 3. 🎨 Tiplar Qayerdan Keladi? (Definitely Typed)

TypeScript-da uchinchi tomon JavaScript kutubxonalarining tiplarini qanday yuklash sxemasi:

\`\`\`mermaid
graph TD
    JS[npm install lodash - Faqat JS kod]
    JS -->|TS compiler error: No types found| InstallTypes[npm install @types/lodash - devDependency]
    InstallTypes -->|Types linked| IDE[TypeScript + VS Code: Autocomplete va Type checking ishlaydi]
\`\`\`

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. .d.ts fayli ichida haqiqiy JS kodini yozish (Implementatsiya)
Deklaratsiya fayllari faqat va faqat **tiplarni e'lon qilish** uchun mo'ljallangan. Ular ichida haqiqiy funksiya tanasi yoki o'zgaruvchi qiymati yozilmasligi kerak.
* **Noto'g'ri:** \\\`declare function greet() { return "hello"; }\\\`
* **To'g'ri:** \\\`declare function greet(): string;\\\`

### 2. declare kalit so'zini import/export bilan noto'g'ri ishlatish
Agar \\\`.d.ts\\\` faylida \\\`import\\\` yoki \\\`export\\\` yozilsa, u avtomatik ravishda tashqi modulga aylanadi va global doiradan chiqib ketadi. Bunga e'tibor berish shart.

---

## 5. 💬 12 ta Intervyu Savollari (Junior/Middle)

### Junior
1. **Savol:** \`.d.ts\` kengaytmasidagi fayllar nima?
   * **Javob:** Faqat tiplar va deklaratsiyalarni saqlaydigan, ichida hech qanday bajariladigan JavaScript kodi bo'lmagan TypeScript fayllaridir.
2. **Savol:** Ular kompilyatsiyadan keyin nima bo'ladi?
   * **Javob:** TypeScript tiplarni olib tashlagani (Type Erasure) kabi, \\\`.d.ts\\\` fayllari ham yakuniy JS buildidan butunlay o'chiriladi va hech qanday kod hosil qilmaydi.
3. **Savol:** Definitely Typed nima?
   * **Javob:** TypeScript hamjamiyati tomonidan JavaScript kutubxonalari uchun yozilgan tiplar to'plamidir (ular npm-ga \\\`@types/kutubxonaNomi\\\` shaklida yuklanadi).
4. **Savol:** \`declare\` kalit so'zi nima uchun ishlatiladi?
   * **Javob:** Runtimeda mavjud bo'lgan, lekin TypeScript hozircha bilmaydigan o'zgaruvchi yoki modul borligini kompilyatorga bildirish uchun.

### Middle
5. **Savol:** Nima uchun \`window\` obyektiga yangi xossa qo'shganda TS xato beradi va u qanday hal qilinadi?
   * **Javob:** Chunki global \\\`Window\\\` interfeysida u xossa mavjud emas. Hal qilish uchun global d.ts faylida \\\`interface Window\\\` e'lon qilinib, kerakli xossa qo'shib qo'yiladi (Interface Merging).
6. **Savol:** Tashqi JS faylini tiplash uchun \`.d.ts\` faylini qayerga va qanday nom bilan joylashtirish kerak?
   * **Javob:** JS fayli bilan bir xil papkaga va xuddi shu nom ostida joylashtiriladi (masalan, \\\`helper.js\\\` va \\\`helper.d.ts\\\`).
7. **Savol:** Ambient Declarations nima?
   * **Javob:** Koddan tashqarida (global skriptlarda yoki boshqa muhitda) mavjud bo'lgan o'zgaruvchilar, classlar yoki modullarning tiplarini \\\`declare\\\` yordamida e'lon qilishdir.
8. **Savol:** \`declare module "nom"\` qachon ishlatiladi?
   * **Javob:** Tiplari bo'lmagan uchinchi tomon kutubxonasiga vaqtinchalik tip berish yoki uni to'liq tiplash uchun.

### Senior
9. **Savol:** Triple-slash directive (\`/// <reference path="..." />\`) nima vazifani bajaradi?
   * **Javob:** Deklaratsiya fayllari o'rtasidagi bog'liqlikni (dependency) ko'rsatish uchun ishlatiladigan eski, lekin hali ham qo'llaniladigan XML ko'rinishidagi yo'riqnomadir.
10. **Savol:** \`.d.ts\` fayllarini global qilish va modul qilish o'rtasidagi farq nima?
    * **Javob:** Fayl ichida hech qanday top-level \\\`import\\\` yoki \\\`export\\\` bo'lmasa, u global hisoblanadi. Agar bitta \\\`import\\\` yoki \\\`export\\\` yozilsa, u modulga aylanadi va uni global ishlatish uchun \\\`declare global { ... }\\\` blokidan foydalanish kerak bo'ladi.
11. **Savol:** Nima uchun npm-ga kutubxona yuklaganda deklaratsiyalarni \\\`@types\\\` orqali emas, paket tarkibida tarqatish yaxshi hisoblanadi?
    * **Javob:** Chunki tiplar kod bilan birga sinxron yangilanadi va foydalanuvchi alohida \\\`@types\\\` paketini o'rnatishi shart bo'lmaydi. tsconfig-dagi \\\`types\\\` yoki \\\`typings\\\` xossasi orqali paket entry-pointi ko'rsatiladi.
12. **Savol:** \`declare global\` bloki qachon ishlatiladi va uning vazifasi nima?
    * **Javob:** Modul fayl (import/export-i bor) ichidan turib global doiradagi (global scope) tiplarni, window obyektini yoki global o'zgaruvchilarni kengaytirish uchun ishlatiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Global o'zgaruvchi e'lon qilish",
      instruction: "Runtimeda mavjud bo'lgan global `API_VERSION` nomli o'zgarmas son (const number) mavjudligini TypeScript kompilyatoriga bildiring.",
      startingCode: "// API_VERSION o'zgaruvchisini declare qiling\n",
      hint: "declare const API_VERSION: number;",
      test: "if (!code.includes('declare const API_VERSION')) return 'declare const API_VERSION dan foydalaning';\nif (!code.includes('number')) return 'Tipini number qilib belgilang';"
    },
    {
      id: 2,
      title: "Tashqi modulni declare qilish",
      instruction: "\"my-custom-slider\" nomli tashqi modulni TypeScript import qila olishi uchun uni declare qiling.",
      startingCode: "// Modulni declare qiling\n",
      hint: "declare module 'my-custom-slider';",
      test: "if (!code.includes('declare module')) return 'declare module kalit so\\'zini ishlating';\nif (!code.includes('my-custom-slider')) return 'Modul nomini to\\'g\\'ri yozing';"
    },
    {
      id: 3,
      title: "Window interfeysini kengaytirish",
      instruction: "Global `window` obyektiga `appTheme` (string) ixtiyoriy xossasini interfeyslarni birlashtirish orqali qo'shing.",
      startingCode: "interface Window {\n  // appTheme maydonini qo'shing\n}\n",
      hint: "appTheme?: string;",
      test: "if (!code.includes('appTheme')) return 'appTheme maydonini qo\\'shing';\nif (!code.includes('string')) return 'Unga string tipini bering';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "TypeScript-da .d.ts fayllarining asosiy vazifasi nima?",
      options: [
        "Loyiha uchun CSS stillarini saqlash",
        "JavaScript kodlarining tiplarini (deklaratsiyalarini) saqlash",
        "Ma'lumotlar bazasi so'rovlarini optimallashtirish",
        "Kodni siqib berish (minifikatsiya)"
      ],
      correctAnswer: 1,
      explanation: "Deklaratsiya fayllari (.d.ts) JavaScript kodining tiplari va e'lonlarini saqlaydi, lekin bajariladigan kod saqlamaydi."
    },
    {
      id: 2,
      question: "npm-da tiplarsiz kutubxonalar (masalan lodash) tiplari Definitely Typed-dan qanday o'rnatiladi?",
      options: [
        "npm install types-lodash",
        "npm install @types/lodash --save-dev",
        "npm install lodash-ts",
        "Tiplarni o'rnatib bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Uchinchi tomon kutubxonalari tiplari hamjamiyat tomonidan @types/kutubxonaNomi nomi ostida devDependency sifatida o'rnatiladi."
    },
    {
      id: 3,
      question: "d.ts fayllari ichida quyidagi amallardan qaysi birini bajarish mumkin emas?",
      options: [
        "Funksiya tiplarini e'lon qilish",
        "Haqiqiy funksiya tanasini yozish (implementatsiya)",
        "Interfeyslarni e'lon qilish",
        "Modul strukturalarini yozish"
      ],
      correctAnswer: 1,
      explanation: "d.ts fayllarida faqat deklaratsiyalar yoziladi, haqiqiy JS bajariladigan kodini yozish taqiqlanadi (xato beradi)."
    },
    {
      id: 4,
      question: "declare kalit so'zi nima vazifani bajaradi?",
      options: [
        "Yangi ma'lumotlar ombori yaratadi",
        "Kompilyatorga tashqarida/runtimeda mavjud bo'lgan o'zgaruvchi borligini bildiradi",
        "O'zgaruvchini localstorage-ga saqlaydi",
        "Kodni serverga yuklaydi"
      ],
      correctAnswer: 1,
      explanation: "declare o'zgaruvchining haqiqiy qiymatni yaratmasdan, uning runtimeda borligini e'lon qiladi."
    },
    {
      id: 5,
      question: "Window global obyektini kengaytirish uchun qaysi TypeScript mexanizmi ishlatiladi?",
      options: [
        "Interface Merging (Interfeyslarni birlashtirish)",
        "Type Alias",
        "Inheritance (Merosxo'rlik)",
        "Generics"
      ],
      correctAnswer: 0,
      explanation: "Bir xil nomli interfeyslar (masalan Window) avtomatik tarzda birlashadi va yangi xossalar global window-ga qo'shiladi."
    },
    {
      id: 6,
      question: "Triple-slash directives (/// <reference ... />) qaysi formatda yoziladi?",
      options: [
        "Component izohi",
        "XML shaklidagi izoh yo'riqnomasi",
        "JSON formatida",
        "YAML formatida"
      ],
      correctAnswer: 1,
      explanation: "Triple-slash yo'riqnomalari XML formatidagi bir qatorli izohlardir (/// <reference path='...' />)."
    },
    {
      id: 7,
      question: ".d.ts fayli tarkibida import/export kalit so'zi yozilsa u nima deb hisoblanadi?",
      options: [
        "Global deklaratsiya fayli",
        "Modul deklaratsiya fayli",
        "JSON konfiguratsiyasi",
        "Standard .ts fayli"
      ],
      correctAnswer: 1,
      explanation: "Faylda import yoki export ishtirok etsa, u modul deb hisoblanadi va global scope-dan ajraladi."
    },
    {
      id: 8,
      question: "Modul bo'lgan .d.ts fayli ichidan global doirani (scope) kengaytirish uchun qaysi blok ishlatiladi?",
      options: [
        "declare global",
        "global scope",
        "declare module",
        "export global"
      ],
      correctAnswer: 0,
      explanation: "Modul ichida turib global tiplarni kengaytirish uchun declare global { ... } blokidan foydalaniladi."
    },
    {
      id: 9,
      question: "Kutubxona yaratib uni npm-ga chiqarayotganda tiplarni ulash uchun package.json faylining qaysi maydoni ishlatiladi?",
      options: [
        "types (yoki typings)",
        "main",
        "module",
        "dependencies"
      ],
      correctAnswer: 0,
      explanation: "package.json-dagi 'types' (yoki 'typings') maydoni loyiha deklaratsiyalari kirish nuqtasini ko'rsatadi."
    },
    {
      id: 10,
      question: "declare function log(message: string): void; kodi kompilyatsiyadan keyin qanday JS kodini hosil qiladi?",
      options: [
        "function log(message) {}",
        "Hech qanday kod hosil qilmaydi (o'chib ketadi)",
        "console.log(message);",
        "Xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Kompilyatsiya vaqtida barcha declare e'lonlari o'chirib yuboriladi, chunki runtimeda bu narsa tashqi muhitda allaqachon mavjud deb hisoblanadi."
    },
    {
      id: 11,
      question: "Qaysi variantda declare to'g'ri qo'llanilgan?",
      options: [
        "declare var x = 10;",
        "declare var x: number;",
        "declare function f() { return 1; }",
        "declare class C { x = 2; }"
      ],
      correctAnswer: 1,
      explanation: "declare ishlatilganda qiymatlar yoki funksiya tanalari (implementatsiya) yozilmaydi, faqat tiplar e'lon qilinadi."
    },
    {
      id: 12,
      question: "TS config-dagi skippedLibCheck uchinchi tomon tiplarini qayerdan skip qiladi?",
      options: [
        "node_modules ichidagi .d.ts fayllardan",
        "src ichidagi fayllardan",
        "Faqat JSON fayllardan",
        "Faqat HTML fayllardan"
      ],
      correctAnswer: 0,
      explanation: "skipLibCheck node_modules ichida keladigan kutubxonalarning tip fayllarini tekshirishdan qochib, tezlikni oshiradi."
    }
  ]
};
