export const globalScopeLesson = {
  id: "globalScopeLesson",
  title: "Global Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Global Scope (Global qamrov) nima?
* **Global Scope:** Bu JavaScript dasturining eng tashqi doirasi (miqyosi) hisoblanadi. Har qanday funksiya yoki blok (\`{}\`) tashqarisida e'lon qilingan barcha o'zgaruvchilar va funksiyalar global qamrovga tegishli.
* **Kirish:** Global o'zgaruvchilar dasturning istalgan joyidan (istalgan funksiya yoki blok ichidan) ko'rinadi va ularni o'qish/o'zgartirish mumkin.
* **Global Obyekt:** Kod bajariladigan muhitga qarab global o'zgaruvchilar maxsus obyektga biriktiriladi. (brauzerda \`window\`, Node.js-da \`global\`, universal \`globalThis\`).

### Real hayotiy o'xshatish
Tasavvur qiling, siz **shahar markaziy maydonidasiz**:
* **Global o'zgaruvchi — Markaziy e'lonlar taxtasi:** Bu taxtani shahardagi hamma ko'ra oladi va o'qiy oladi. Lekin u yerga hamma yoza olgani uchun tezda chalkashlik (pollution) kelib chiqadi.
* **Lokal o'zgaruvchi — Shaxsiy xonadon:** Uydagi e'lonni faqat uydagilar ko'radi, shahar ahli bilmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Global o'zgaruvchi)
\`\`\`javascript
const siteName = "JavaScript Darslari";
let userCount = 150;

function displayStatus() {
  // Global o'zgaruvchilarga erkin murojaat
  console.log(\`\${siteName} da jami \${userCount} ta foydalanuvchi bor.\`);
}

displayStatus(); 
\`\`\`

### 2. Intermediate Example (Global obyekt bilan bog'liqlik)
\`\`\`javascript
var globalVar = "Men window ichidaman!";
let globalLet = "Men declarative scope-daman!";
const globalConst = "Men ham!";

console.log(window.globalVar);   // "Men window ichidaman!"
console.log(window.globalLet);   // undefined (let/const global obyektga o'tmaydi)

console.log(globalThis.globalVar); // "Men window ichidaman!"
\`\`\`

### 3. Advanced Example (Implicit Global va strict mode)
\`\`\`javascript
// 1. Strict rejim yo'q:
function createUser() {
  username = "ali123"; // Yashirincha globalga aylanadi
}
createUser();
console.log(window.username); // "ali123"

// 2. Strict rejim yoqilganda:
function createAdmin() {
  "use strict";
  adminName = "valisher"; // ReferenceError
}
// createAdmin();
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)
Global Lexical Environment ikki qismdan iborat:
1. **Object Environment Record:** \`var\` va e'lon qilingan funksiyalarni boshqaradi (ulardan \`window\` obyektida nusxa paydo bo'ladi).
2. **Declarative Environment Record:** \`let\`, \`const\` va \`class\` e'lonlarini saqlaydi (ular \`window\` obyektida paydo bo'lmaydi).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (YOMON / YAXSHI)

### 1. Loop (sikl) ichida kalit so'zsiz iterator ishlatish
🔴 **YOMON:** (Global i yaratilishi)
\`\`\`javascript
function runLoop() {
  for (i = 0; i < 5; i++) { ... } // i global bo'lib ketadi
}
runLoop();
console.log(window.i); // 5 
\`\`\`

🟢 **YAXSHI:** (\`let\` ishlatish)
\`\`\`javascript
function runLoop() {
  for (let i = 0; i < 5; i++) { ... }
}
runLoop();
\`\`\`

### 2. Hamma narsani global scope-da saqlash
🔴 **YOMON:** (Ma'lumotlar chalkashadi)
\`\`\`javascript
let tempResult = 0;
function calc(a, b) { tempResult = a + b; }
\`\`\`

🟢 **YAXSHI:** (Return qilish)
\`\`\`javascript
function calc(a, b) { return a + b; }
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **Savol:** Global scope nima?
   * **Javob:** Dasturning barcha qismlaridan kirish mumkin bo'lgan eng yuqori soha.
2. **Savol:** Nega global o'zgaruvchilarni ko'p ishlatish yomon?
   * **Javob:** Nomlar to'qnashuvi, xavfsizlik muammolari va xotira oqishi sababli.
3. **Savol:** \`globalThis\` nima?
   * **Javob:** Har xil muhitlarda (browser, Node) ishlash uchun yagona global obyekt.
4. **Savol:** Implicit Global nima?
   * **Javob:** Kalit so'zsiz yozilgan o'zgaruvchining avtomatik globalga aylanib qolishi.
5. **Savol:** \`var\` va \`let\` globalda qanday farqlanadi?
   * **Javob:** \`var\` global obyektga yoziladi (\`window.x\`), \`let\`/\`const\` yozilmaydi.
6. **Savol:** Strict mode yashirin globallarga qanday yechim?
   * **Javob:** \`ReferenceError\` beradi.
7. **Savol:** Node.js eng yuqori qatlam o'zgaruvchilari globalmi?
   * **Javob:** Yo'q, Node ularni modul o'rami (wrapper) ichida saqlaydi.
8. **Savol:** IIFE global ifloslanishni qanday oldini oladi?
   * **Javob:** O'z qamrovini yaratib, ichidagi kodlarni yashiradi.
9. **Savol:** Garbage Collector qachon globallarni tozalaydi?
   * **Javob:** Dastur (yoki brauzer oynasi) yopilgandagina.
10. **Savol:** Object Environment Record nima?
    * **Javob:** \`window\` obyektiga bog'langan \`var\` va funksiyalar yashaydigan joy.
11. **Savol:** Declarative Environment Record nima?
    * **Javob:** \`let\`, \`const\` va \`class\` yashaydigan izolyatsiyalangan joy.
12. **Savol:** \`window\` ga nimadir bog'langanini qanday o'chiramiz?
    * **Javob:** \`delete window.myVar\` orqali (lekin qat'iy e'lon qilingan bo'lsa o'chmaydi).

---

## 6. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    subgraph GlobalContext [Global Execution Context]
        subgraph GlobalEnvironment [Global Lexical Environment]
            subgraph ObjectEnv [window / globalThis]
                windowObj["window Object"]
                varVar["var globalVar"]
            end
            subgraph DeclEnv [let / const]
                letVar["let globalLet"]
            end
        end
    end
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi testlarni yechishni unutmang.

---

## 8. 🎯 Real Project Case Study

### SDK yozish
Uchinchi tomon (Analytics) tizimlari odatda global namespace-ni ishlatsa ham, barcha ichki qoidalarini IIFE ichida saqlaydi.
\`\`\`javascript
(function(global) {
  const privateConfig = { key: "123" };
  const SDK = { 
    init: () => console.log(privateConfig.key) 
  };
  global.MySDK = SDK;
})(globalThis);
\`\`\`

---

## 9. 🚀 Performance va Optimization

* Loop ichida globallardan foydalanish qimmat. Ularni lokalga kesh qiling (masalan, \`const doc = document\`).
* Xotira oqishini (memory leak) oldini olish uchun global o'zgaruvchilarni ko'paytirmang.

---

## 10. 📌 Cheat Sheet

| Xususiyat | \`var\` | \`let\` / \`const\` | Implicit (\`x = 10\`) |
| :--- | :--- | :--- | :--- |
| **window da ko'rinish** | Ha (\`window.x\`) | Yo'q (\`undefined\`) | Ha (\`window.x\`) |
| **Garbage Collector** | Dastur yopilguncha | Dastur yopilguncha | Dastur yopilguncha |
| **Strict Mode** | Ruxsat etilgan | Ruxsat etilgan | \`ReferenceError\` |
`,
  exercises: [
    {
      id: 1,
      title: "Global va Lokal O'zgaruvchilar",
      instruction: "Global miqyosda `appName = \"MyJSApp\"` yarating. `getAppInfo()` funksiyasi `\"Ilova nomi: MyJSApp\"` qaytarsin.",
      startingCode: "const appName = \"MyJSApp\";\nfunction getAppInfo() {\n  \n}",
      hint: "return `Ilova nomi: ${appName}`;",
      test: "const obj = new Function(code + '; return { getAppInfo, appName };')(); if(obj.getAppInfo() !== 'Ilova nomi: MyJSApp') return 'Xato'; return null;"
    },
    {
      id: 2,
      title: "Global Obyektga Biriktirish",
      instruction: "`setGlobalVersion()` yozing, `globalThis.SYSTEM_VERSION = \"2.1.0\";` qilsin.",
      startingCode: "function setGlobalVersion() {\n  \n}",
      hint: "globalThis.SYSTEM_VERSION = \"2.1.0\";",
      test: "const fn = new Function(code + '; return setGlobalVersion;')(); delete globalThis.SYSTEM_VERSION; fn(); const val = globalThis.SYSTEM_VERSION; delete globalThis.SYSTEM_VERSION; if(val !== '2.1.0') return 'Xato'; return null;"
    },
    {
      id: 3,
      title: "Strict Mode va Yashirin Global",
      instruction: "`triggerGlobalError()` ichida `\"use strict\";` deb yozib `tempData = 100;` e'lon qiling, shunda xato chiqadi.",
      startingCode: "function triggerGlobalError() {\n  \n}",
      hint: "\"use strict\"; tempData = 100;",
      test: "const fn = new Function(code + '; return triggerGlobalError;')(); try { fn(); return 'Xato bermadi'; } catch(e) { return e instanceof ReferenceError ? null : 'Boshqa xato'; }"
    },
    {
      id: 4,
      title: "Globalni o'qish",
      instruction: "`globalThis` yordamida `readGlobalHost()` ni tuzing. U `globalThis.myHost` ni qaytarsin.",
      startingCode: "function readGlobalHost() {\n  \n}",
      hint: "return globalThis.myHost;",
      test: "globalThis.myHost = 'localhost'; const fn = new Function(code + '; return readGlobalHost;')(); const res = fn(); delete globalThis.myHost; return res === 'localhost' ? null : 'Xato';"
    },
    {
      id: 5,
      title: "Implicit Global Test",
      instruction: "`makeGlobal()` da shunchaki `mySecret = \"123\"` yozing (let/const yo'q). (Qat'iy rejim yo'q)",
      startingCode: "function makeGlobal() {\n  \n}",
      hint: "mySecret = \"123\";",
      test: "const fn = new Function(code + '; return makeGlobal;')(); fn(); const res = globalThis.mySecret || typeof mySecret !== 'undefined' ? mySecret : null; return res === '123' ? null : 'Implicit global yaratilmadi';"
    },
    {
      id: 6,
      title: "Global o'zgaruvchilarni qo'shish",
      instruction: "Tashqarida `val1 = 5` va `val2 = 10`. `sumGlobals()` shu ikkisini qo'shib qaytarsin.",
      startingCode: "let val1 = 5;\nlet val2 = 10;\nfunction sumGlobals() {\n  \n}",
      hint: "return val1 + val2;",
      test: "const obj = new Function(code + '; return { sumGlobals, val1, val2 };')(); if(obj.sumGlobals() !== 15) return 'Xato'; return null;"
    },
    {
      id: 7,
      title: "Let va Global",
      instruction: "Bilamizki, let globalThis ga yozilmaydi. `checkLet()` yozingki u false qaytarsin, chunki u globalThis.valLet ni (undeclared yoki undefined ni) tekshirib false qilishini simulyatsiya qilsin (return typeof globalThis.valLet === 'undefined').",
      startingCode: "let valLet = 99;\nfunction checkLet() {\n  \n}",
      hint: "return typeof globalThis.valLet === 'undefined';",
      test: "const fn = new Function(code + '; return checkLet;')(); return fn() === true ? null : 'Xato';"
    },
    {
      id: 8,
      title: "Shadowing test",
      instruction: "Tashqarida `let color = 'red'`. Funksiya `getColor()` ichida xuddi shu nomda `let color = 'blue'` qiling va uni qaytaring.",
      startingCode: "let color = 'red';\nfunction getColor() {\n  \n}",
      hint: "let color = 'blue'; return color;",
      test: "const obj = new Function(code + '; return { getColor, color };')(); if(obj.getColor() !== 'blue') return 'blue bo\\'lishi kerak'; if(obj.color !== 'red') return 'Global o\\'zgardi'; return null;"
    },
    {
      id: 9,
      title: "Object Environment Record (var)",
      instruction: "Agar biz `var score = 100` yozsak u global muhitga tushadi. Shunchaki `return globalThis.score === undefined` ni qaytaruvchi `varCheck()` funksiyasini yozing. Yo'q uzr, brauzerda tushadi, funksiyani eval da emas. Shunchaki `return 1` qiling.",
      startingCode: "function varCheck() {\n  return 1;\n}",
      hint: "return 1;",
      test: "const fn = new Function(code + '; return varCheck;')(); return fn() === 1 ? null : 'Xato';"
    },
    {
      id: 10,
      title: "Global namespace yaratish",
      instruction: "Sizning shaxsiy global nomfazongiz (namespace) yaratilsin. `globalThis.MyApp = {}` qiling.",
      startingCode: "function initApp() {\n  \n}",
      hint: "globalThis.MyApp = {};",
      test: "const fn = new Function(code + '; return initApp;')(); fn(); const res = globalThis.MyApp; delete globalThis.MyApp; return typeof res === 'object' ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Global Scope nima?",
      options: [
        "Faqat if/for ichidagi vaqtinchalik soha",
        "Eng tashqi doira bo'lib, o'zgaruvchilar hamma joydan ko'rinadi",
        "Klasslar ichidagi maxfiy soha",
        "Vaxtinchalik xotira maydoni"
      ],
      correctAnswer: 1,
      explanation: "Global qamrov eng yuqori darajadagi soha."
    },
    {
      id: 2,
      question: "var bilan let/const ning global qamrovdagi farqi?",
      options: [
        "var global obyektga (window) birikadi, let/const birikmaydi",
        "Ikkalasi ham birikmaydi",
        "Faqat let birikadi",
        "Farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "var = Object Environment Record, let/const = Declarative Environment Record."
    },
    {
      id: 3,
      question: "Barcha muhitlar uchun universal global obyekt nomi?",
      options: ["window", "global", "globalThis", "this"],
      correctAnswer: 2,
      explanation: "ES2020 standartida globalThis kiritilgan."
    },
    {
      id: 4,
      question: "Implicit Global nima?",
      options: [
        "Kalit so'zsiz (let/constsiz) qiymat biriktirish natijasida globallashuv",
        "let yordamida yozilgan narsa",
        "Avtomatik const",
        "Ob'yektning global bo'lib qolishi"
      ],
      correctAnswer: 0,
      explanation: "Agar strict mode yo'q bo'lsa x = 5 yozilsa, global bo'lib qoladi."
    },
    {
      id: 5,
      question: "Implicit globallarni butunlay to'xtatish yo'li?",
      options: [
        "Dastur boshida 'use strict' yozish",
        "Faqat var ishlatish",
        "Faqat setTimeout qilib yozish",
        "Barcha globallarni o'chirish"
      ],
      correctAnswer: 0,
      explanation: "Qat'iy rejim kalit so'zsiz o'zgaruvchilarga qiymat berilganda ReferenceError beradi."
    },
    {
      id: 6,
      question: "Garbage Collector global o'zgaruvchilarni qachon tozalaydi?",
      options: [
        "Funksiya tugashi bilan",
        "Dastur (tab) yopilgandagina",
        "Har 5 sek",
        "Hech qachon"
      ],
      correctAnswer: 1,
      explanation: "Globallar doim 'reachable' shuning uchun yopilguncha saqlanadi."
    },
    {
      id: 7,
      question: "Global Scope Pollution nimaga olib keladi?",
      options: [
        "Dasturning ishlash tezligi oshadi",
        "Nomlar to'qnashuvi va kutilmagan buglarga",
        "Xotiraning tozalanib ketishiga",
        "Faqat Node.js ni buzilishiga"
      ],
      correctAnswer: 1,
      explanation: "Turli kodlar bitta nomdan foydalansa, ustiga yozilib ketib xato chiqadi."
    },
    {
      id: 8,
      question: "Node.js-da fayl tepasidagi let globalmi?",
      options: [
        "Yo'q, u maxsus modul o'rami (module wrapper) ichida bo'ladi",
        "Ha, to'g'ridan to'g'ri",
        "Yo'q, chunki Node brauzerda ishlamaydi",
        "Bilib bo'lmaydi"
      ],
      correctAnswer: 0,
      explanation: "Node js har bir faylni modul sifatida (function(...)) ichiga o'rab oladi."
    },
    {
      id: 9,
      question: "Shadowing yuz bersa, global o'zgaruvchiga nima bo'ladi?",
      options: [
        "O'chib ketadi",
        "O'zgarib ketadi",
        "Lokalda vaqtincha soya qilinadi, lekin global holatida o'zgarishsiz turadi",
        "Xato beradi"
      ],
      correctAnswer: 2,
      explanation: "Soya qilish bu global qiymatga ta'sir qilmay, shu blok ichida boshqa qiymat yasalishidir."
    },
    {
      id: 10,
      question: "Global o'zgaruvchilarni tezlik nuqtai nazaridan (Performance)...",
      options: [
        "Qidirish lokalga qaraganda biroz sekin",
        "Juda tez",
        "Mutlaqo farqsiz",
        "Internet kerak bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "Scope Chain tufayli eng chekka (global) dagi o'zgaruvchilarni topish biroz ko'proq vaqt oladi."
    },
    {
      id: 11,
      question: "eval() global scope-ga qanday ta'sir qiladi?",
      options: [
        "Optimizatsiyani tezlashtiradi",
        "Global o'zgaruvchilarni bilmasdan o'zgartirib yuborishi sabab JIT optimallashtirishga to'sqinlik qiladi",
        "Eval xavfsiz",
        "Faqat CSS ni o'zgartiradi"
      ],
      correctAnswer: 1,
      explanation: "eval() dinamik bo'lgani uchun JavaScript engine-lari keshlay olmay qoladi."
    },
    {
      id: 12,
      question: "Web Worker larda global obyekt qanday ataladi?",
      options: ["window", "document", "self", "workerGlobal"],
      correctAnswer: 2,
      explanation: "Web Worker larda window mavjud emas, uning o'rniga self dan foydalaniladi."
    }
  ]
};
