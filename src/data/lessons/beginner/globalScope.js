export const globalScopeLesson = {
  id: "globalScopeLesson",
  title: "Global Scope",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy: O'xshatish va Sodda Tushuntirish

### Global Scope (Global qamrov) nima?
* **Global Scope:** Bu JavaScript dasturining eng tashqi doirasi (miqyosi) hisoblanadi. Har qanday funksiya yoki blok (\\\`{}\\\`) tashqarisida e'lon qilingan barcha o'zgaruvchilar va funksiyalar global qamrovga tegishli.
* **Kirish:** Global o'zgaruvchilar dasturning istalgan joyidan (istalgan funksiya yoki blok ichidan) ko'rinadi va ularni o'qish/o'zgartirish mumkin.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **shahar markaziy maydonidasiz**:
* **Global o'zgaruvchi — Markaziy e'lonlar taxtasi:** Bu taxtani shahardagi hamma ko'ra oladi va o'qiy oladi. Lekin u yerga hamma yoza olgani uchun tezda chalkashlik (pollution) kelib chiqadi.
* **Lokal o'zgaruvchi — Shaxsiy xonadon:** Uydagi e'lonni faqat uydagilar ko'radi, shahar ahli bilmaydi.

---

## 2. ⚙️ Deep Dive (Under the hood, Memory, V8 Engine, Performance)

### Qanday ishlaydi?
V8 Engine va JavaScript kodni ishlashni boshlaganda **Global Execution Context (Global Bajarilish Muhiti)** yaratiladi. Bu muhit o'zining **Global Lexical Environment (Global Leksik Muhit)** iga ega bo'lib, u ikki qismdan iborat:

1. **Object Environment Record:** \\\`var\\\` bilan e'lon qilingan o'zgaruvchilar va standart funksiya e'lonlarini o'z ichiga oladi. Bular global ob'ektning (brauzerda \\\`window\\\`, Node.js-da \\\`global\\\`, universal \\\`globalThis\\\`) xususiyatlariga aylanadi.
2. **Declarative Environment Record:** \\\`let\\\`, \\\`const\\\` va \\\`class\\\` bilan e'lon qilingan o'zgaruvchilarni saqlaydi. Bular global ob'ektda to'g'ridan-to'g'ri ko'rinmaydi.

### Performance va Optimization
* **Scope Chain Qidiruvi:** JavaScript dvigateli o'zgaruvchini topmaguncha doiralarni (scope larni) yuqoriga qarab izlaydi. Global o'zgaruvchini qidirish har doim eng uzoq vaqt oladi, chunki u zanjirning oxirida joylashgan. Shuning uchun, loop (sikl) ichida global o'zgaruvchiga murojaat qilish o'rniga, uni vaqtinchalik lokal o'zgaruvchiga kesh qilish (saqlash) afzalroq.
* **Memory Leak (Xotira Oqishi):** Global o'zgaruvchilar dastur yopilguniga qadar xotirada qoladi (Garbage Collector ularni tozalamaydi). Ularni keragidan ortiq ishlatish ilova ishini sekinlashtiradi.

---

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Implicit Global (Yashirin Global)
Agar siz qat'iy rejimdan (\\\`"use strict"\\\`) foydalanmasangiz va o'zgaruvchini \\\`var\\\`, \\\`let\\\` yoki \\\`const\\\` so'zlarisiz e'lon qilsangiz, JavaScript dvigateli uni avtomatik ravishda global qamrovda yaratadi:

\\\`\\\`\\\`javascript
function createYashirinGlobal() {
  yashirin = "Men globalman!"; // Implicit global yuz beradi
}
createYashirinGlobal();
console.log(globalThis.yashirin); // "Men globalman!"
\\\`\\\`\\\`
> Edge Case: \\\`"use strict"\\\` ishlatilsa, bunday holatda ReferenceError qaytadi.

### Hoisting bilan kutilmagan holatlar
\\\`var\\\` global ob'ekt ustiga yoziladi. Agar global ob'ektdagi tayyor property bilan bir xil nom bersangiz muammo kelib chiqishi mumkin:
\\\`\\\`\\\`javascript
var name = "Vali";
console.log(window.name); // Vali
\\\`\\\`\\\`

### Senior Interview Questions
1. **Global ob'ektlarni ifloslantirishdan (Global Pollution) qanday saqlanish mumkin?**
   Javob: Modullar, IIFE (Immediately Invoked Function Expressions) yordamida izolyatsiya qilish yoki \\\`let\\\`/\\\`const\\\` orqali scope-ni boshqarish bilan.
2. **Global Environment va Global Execution Context farqi nima?**
   Javob: Global Execution Context bu ishlash maydoni (Stack'dagi yozuv), Global Environment esa o'zgaruvchi va xotiralarni xaritasidir (Memory heap/Record).

---

## 4. 📊 Arxitektura: Mermaid Diagrammasi

\\\`\\\`\\\`mermaid
graph TD
    A[Global Execution Context] --> B[Global Lexical Environment]
    B --> C[Object Environment Record]
    B --> D[Declarative Environment Record]
    C -. window/globalThis .-> E(var variables, function declarations)
    D -. Isolated .-> F(let, const, class)
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Global o'zgaruvchi yaratish",
      instruction: "Global qamrovda `websiteName = \"JavaScript Mastery\"` e'lon qiling va uni qaytaradigan `getWebsite()` funksiyasini yozing.",
      startingCode: "const websiteName = \"JavaScript Mastery\";\nfunction getWebsite() {\n  \n}",
      hint: "Shunchaki websiteName ni return qiling.",
      test: "const obj = new Function(code + '; return { getWebsite, websiteName };')(); if(obj.getWebsite() !== 'JavaScript Mastery') return 'Xato'; return null;"
    },
    {
      id: 2,
      title: "Implicit Global xatosi",
      instruction: "Qat'iy rejim ('use strict') yoqilgan `strictFunction` funksiyasida `x = 10` yozing va qanday xato chiqishini tekshiring.",
      startingCode: "function strictFunction() {\n  \n}",
      hint: "\"use strict\"; ni yozing va x = 10 deb qo'ying.",
      test: "const fn = new Function(code + '; return strictFunction;')(); try { fn(); return 'Xato bermadi'; } catch(e) { return e instanceof ReferenceError ? null : 'Boshqa xato'; }"
    },
    {
      id: 3,
      title: "globalThis orqali biriktirish",
      instruction: "`setAppVersion` funksiyasi ichida `globalThis.version = \"1.0.0\"` ni yozib, global obyektni o'zgartiring.",
      startingCode: "function setAppVersion() {\n  \n}",
      hint: "globalThis.version = \"1.0.0\";",
      test: "const fn = new Function(code + '; return setAppVersion;')(); delete globalThis.version; fn(); const val = globalThis.version; delete globalThis.version; return val === '1.0.0' ? null : 'Xato';"
    },
    {
      id: 4,
      title: "let globalga bog'lanmaydi",
      instruction: "Tashqarida `let myScore = 100` e'lon qilingan. Funksiya ichida typeof globalThis.myScore ni tekshiring va uni qaytaring.",
      startingCode: "let myScore = 100;\nfunction checkGlobalLet() {\n  \n}",
      hint: "return typeof globalThis.myScore;",
      test: "const fn = new Function(code + '; return checkGlobalLet;')(); return fn() === 'undefined' ? null : 'Xato';"
    },
    {
      id: 5,
      title: "Shadowing yuz berishi",
      instruction: "Global qamrovda `let theme = \"dark\"`. `getTheme` funksiyasi ichida xuddi shu nom bilan `let theme = \"light\"` qiling va uni return qiling.",
      startingCode: "let theme = \"dark\";\nfunction getTheme() {\n  \n}",
      hint: "Funksiya ichida let theme = \"light\" ni saqlab return qiling.",
      test: "const obj = new Function(code + '; return { getTheme, theme };')(); if(obj.getTheme() !== 'light') return 'light bo\\'lishi kerak'; if(obj.theme !== 'dark') return 'Global o\\'zgardi'; return null;"
    },
    {
      id: 6,
      title: "Globalni o'qish (window / globalThis)",
      instruction: "`readGlobal()` funksiyasi `globalThis.secretKey` ni qaytarishi kerak. Uni global obyekt orqali olib qaytaring.",
      startingCode: "function readGlobal() {\n  \n}",
      hint: "return globalThis.secretKey;",
      test: "globalThis.secretKey = 'ab12'; const fn = new Function(code + '; return readGlobal;')(); const res = fn(); delete globalThis.secretKey; return res === 'ab12' ? null : 'Xato';"
    },
    {
      id: 7,
      title: "Vaqtinchalik lokal kesh",
      instruction: "Performance uchun global o'zgaruvchi `globalCount` ni ishlatish o'rniga, uni `optimizeTest()` ichida lokal o'zgaruvchiga nusxalab olib shu lokal o'zgaruvchini qaytaring.",
      startingCode: "const globalCount = 500;\nfunction optimizeTest() {\n  \n}",
      hint: "const localCount = globalCount; return localCount;",
      test: "const obj = new Function(code + '; return { optimizeTest };')(); return obj.optimizeTest() === 500 ? null : 'Xato';"
    },
    {
      id: 8,
      title: "Global namespace bilan obyektlar",
      instruction: "`globalThis.MyFramework = { version: '2' }` ni e'lon qilib global ob'ektni ifloslantiring va yozing.",
      startingCode: "function createFramework() {\n  \n}",
      hint: "globalThis.MyFramework = { version: '2' };",
      test: "const fn = new Function(code + '; return createFramework;')(); fn(); const res = globalThis.MyFramework?.version; delete globalThis.MyFramework; return res === '2' ? null : 'Xato';"
    },
    {
      id: 9,
      title: "Ko'p ishlatiladigan globallarni return qilish",
      instruction: "`var1 = 10` va `var2 = 20`. Ularning ko'paytmasini return qiluvchi `multiplyGlobals()` yozing.",
      startingCode: "let var1 = 10;\nlet var2 = 20;\nfunction multiplyGlobals() {\n  \n}",
      hint: "return var1 * var2;",
      test: "const obj = new Function(code + '; return { multiplyGlobals };')(); return obj.multiplyGlobals() === 200 ? null : 'Xato';"
    },
    {
      id: 10,
      title: "delete orqali globallarni tozalash",
      instruction: "Agar biz globalThis ga xususiyat biriktirsak uni o'chira olamiz. `delete globalThis.testVar` qilib `true`/`false` qiymatini qaytaring.",
      startingCode: "globalThis.testVar = \"hello\";\nfunction cleanGlobal() {\n  \n}",
      hint: "return delete globalThis.testVar;",
      test: "globalThis.testVar = 'hello'; const fn = new Function(code + '; return cleanGlobal;')(); const res = fn(); return (res === true && globalThis.testVar === undefined) ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Global Scope qayerda tugaydi?",
      options: [
        "Hech qayerda, u eng tashqi miqyos bo'lib barcha kodlarni qamrab oladi",
        "Funksiyaning oxirida",
        "Klasslarning ichida",
        "Faylning oxirida doim o'chadi"
      ],
      correctAnswer: 0,
      explanation: "Global scope butun ishlash muhitining eng yuqori doirasi bo'lib hamma joyga kirish imkonini beradi."
    },
    {
      id: 2,
      question: "var yordamida yaratilgan o'zgaruvchi xotiraning qaysi qismiga tushadi?",
      options: [
        "Declarative Environment Record",
        "Object Environment Record (global ob'ektga xususiyat sifatida)",
        "Call Stack ning o'rtasiga",
        "Microtask Queue"
      ],
      correctAnswer: 1,
      explanation: "var va funksiya e'lonlari global darajada Object Environment Record (masalan window) ga birikadi."
    },
    {
      id: 3,
      question: "let yoki const yordamida e'lon qilingan o'zgaruvchilar nega window ga ulanmaydi?",
      options: [
        "Ular Declarative Environment Record ichida qattiq izolyatsiya qilinadi",
        "Ular window ni bilmaydi",
        "Ularni faqat funksiya ichida ishlatish mumkin",
        "Chunki ular o'zgaruvchan emas"
      ],
      correctAnswer: 0,
      explanation: "ES6 da ularni window dan izolyatsiya qilish uchun alohida e'lonlar xotirasi (Declarative Environment) kiritilgan."
    },
    {
      id: 4,
      question: "Barcha muhitlar uchun yagona va rasmiy global ob'ekt nima?",
      options: ["window", "global", "globalThis", "this"],
      correctAnswer: 2,
      explanation: "globalThis orqali Node js, Browser va Worker larda bir xil o'qish mumkin."
    },
    {
      id: 5,
      question: "Implicit Global (yashirin global) ning zarari nima?",
      options: [
        "Foydasi ko'p tezroq ishlaydi",
        "Kodda sezilarli xato bermasa ham xotirani ifloslantiradi va buglarga sabab bo'ladi",
        "Dasturni to'xtatib qo'yadi",
        "Qattiq turdagi xatolarni beradi"
      ],
      correctAnswer: 1,
      explanation: "Kalit so'zsiz globalga chiqishi xotirada qoluvchi iz va to'qnashuvlar yaratadi."
    },
    {
      id: 6,
      question: "Garbage Collector qachon Global ob'ektlarni tozalaydi?",
      options: [
        "Har 1 soniyada",
        "Sahifa yopilganda yoki dastur ishi to'liq tugaganda",
        "O'zgaruvchi oxirgi marta ishlatilgandan so'ng darhol",
        "Hech qachon"
      ],
      correctAnswer: 1,
      explanation: "Globallar doim 'reachable' hisoblanadi, shuning uchun dastur davomida yashaydi."
    },
    {
      id: 7,
      question: "Nega Performance nuqtai nazaridan scope zanjirida globalda o'zgaruvchi qidirish og'ir bo'lishi mumkin?",
      options: [
        "Qidiruv Scope Chain ning eng pastki bosqichidan to Global gacha boradi",
        "Global o'zgaruvchi shifrlangan bo'ladi",
        "Global xotirada internet talab qiladi",
        "Bunday qoida yo'q"
      ],
      correctAnswer: 0,
      explanation: "Javascript o'zgaruvchini avval local, keyin parent local, oxirida esa Global qamrovdan izlaydi."
    },
    {
      id: 8,
      question: "Node.js fayllarida eng yuqori qatlamda e'lon qilingan xususiyat Globalga tegishlimi?",
      options: [
        "Ha, Node brauzer bilan bir xil",
        "Yo'q, Node.js har bir faylni module wrapper ichiga o'rab kompile qiladi",
        "Yo'q, chunki globalThis u yerda yo'q",
        "Faqat const uchun shunday"
      ],
      correctAnswer: 1,
      explanation: "NodeJS barcha kodni (function(exports, require, module, __filename, __dirname) {}) deb o'raydi."
    },
    {
      id: 9,
      question: "Global muhitni ifloslantirishni qanday qilib kamaytirish mumkin?",
      options: [
        "IIFE (Immediately Invoked Function Expression) va Modullar yordamida",
        "Faqat var orqali",
        "Xotirani o'chirish orqali",
        "Barcha o'zgaruvchilarni if/else ga o'rash orqali"
      ],
      correctAnswer: 0,
      explanation: "IIFE va Modullar o'z local qamrovini yaratib tashqariga ma'lumot sizib ketishini oldini oladi."
    },
    {
      id: 10,
      question: "Shadowing natijasida nima sodir bo'ladi?",
      options: [
        "Ichki scope tashqi scope o'zgaruvchisini soya qilib yashirib qo'yadi",
        "O'zgaruvchi soya ostida to'xtaydi",
        "Qora rangga kiradi",
        "Hech narsa"
      ],
      correctAnswer: 0,
      explanation: "Agar block ichida va tashqarida bir xil nom bo'lsa, engine eng yaqin o'zgaruvchini oladi va tashqaridagini soya qiladi."
    },
    {
      id: 11,
      question: "Strict Mode (Qat'iy Rejim) Implicit Globalni qanday hal qiladi?",
      options: [
        "ReferenceError beradi",
        "SyntaxError beradi",
        "IndataError beradi",
        "To'g'rilab ketadi"
      ],
      correctAnswer: 0,
      explanation: "Strict Mode kalit so'zsiz o'zgaruvchilarni e'lon qilinmagan deb hisoblab ReferenceError beradi."
    },
    {
      id: 12,
      question: "var bn let qamrovda yana nima farqi bor?",
      options: [
        "var blok (block scope) darajasida yashirinmaydi, faqat funksiya darajasida. let esa blokka tegishli.",
        "let funksiya darajasida, var blok",
        "Farqi yo'q ikkalasi ham bir xil",
        "Bunday qoida mavjud emas"
      ],
      correctAnswer: 0,
      explanation: "var funksiya doirasiga ega, lekin let blok (block {}) doirasiga ega."
    }
  ]
};
