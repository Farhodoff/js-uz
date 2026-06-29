export const executionContextLesson = {
  id: "executionContextLesson",
  title: "Bajarilish Konteksti (Execution Context)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Bajarilish Konteksti (Execution Context) nima?
**Bajarilish Konteksti** — bu JavaScript kodi qayerda ishlayotgani va uning o'zgaruvchilari qayerda saqlanayotganini bildituvchi maxsus ichki muhit (kontekst).
JavaScript-da har qanday kod bajarilayotganda doimo biror-bir kontekst ichida bo'ladi.
Asosiy turlari:
1. **Global Bajarilish Konteksti (GEC):** Siz dasturni ishga tushirishingiz bilan yaratiladi. U bitta bo'ladi va barcha funksiyalar uchun yagona asos vazifasini bajaradi.
2. **Funksiya Bajarilish Konteksti (FEC):** Har safar biror funksiya chaqirilganda, JS aynan o'sha funksiya uchun alohida yangi kontekst yaratadi.

---

### Real hayotiy o'xshatish: Oshpaz va Oshxona
* **Global Kontekst (GEC):** Bu **katta oshxona**. Oshxonada qozon, tuz, shakar kabi hamma uchun umumiy anjomlar (global o'zgaruvchilar) bor. Dastur yopilmaguncha oshxona doim ishlaydi.
* **Funksiya Konteksti (FEC):** Siz maxsus **"Tort"** tayyorlashingiz kerak. Siz alohida kichik stolga o'tasiz va shu tort uchun tuxum, un kabi ingrediyentlarni tayyorlaysiz (mahalliy o'zgaruvchilar). Tort bitishi bilan bu stol tozalanadi (kontekst yo'q qilinadi).
* **Call Stack (Kontekstlar to'plami):** Siz tortni tayyorlayotganda ichida **"Krem"** yasashingiz kerak bo'lib qoldi. Tort tayyorlashni vaqtincha pauza qilib, kremni yasaysiz, keyin yana tortga qaytasiz. Mana shu jarayonlarni yozib, qaysi biri birinchi bajarilishini tartibga soluvchi mexanizm - Call Stack hisoblanadi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Global va Funksiya)
\\\`\\\`\\\`javascript
// Global Kontekst yaratildi
let adminName = "Sardor"; 

function welcome(name) {
  // Funksiya Konteksti yaratildi
  return "Salom, " + name; 
} // Funksiya ishlagach, kontekst o'chadi

console.log(welcome(adminName)); 
\\\`\\\`\\\`

### 2. Intermediate Example (Call Stack qanday ishlaydi)
\\\`\\\`\\\`javascript
function birinchi() {
  console.log("Birinchi boshlandi");
  ikkinchi(); // 2-chi funksiya stack'ga tushadi
  console.log("Birinchi tugadi");
}

function ikkinchi() {
  console.log("Ikkinchi ishlab ketdi");
}

birinchi();
// Natija:
// Birinchi boshlandi
// Ikkinchi ishlab ketdi
// Birinchi tugadi
\\\`\\\`\\\`

### 3. Advanced Example (Hoisting va Kontekst bosqichlari)
\\\`\\\`\\\`javascript
console.log(myVar); // undefined (Hoisting tufayli yaratilgan, lekin undefined)
// console.log(myLet); // Xato (Temporal Dead Zone)

var myVar = 10;
let myLet = 20;

testFunc(); // "Salom!" (Funksiya to'liq hoisted bo'ladi)

function testFunc() {
  console.log("Salom!");
}
\\\`\\\`\\\`

---

## 3. ⚠️ Muammo va Nima uchun Muhimligi
Kontekst qanday yaratilishi va yo'q qilinishini bilmaslik memory leak (xotirani ortiqcha band qilish) yoki stack overflow (cheksiz aylanib xotirani to'ldirib yuborish) xatolariga olib keladi. Qolaversa, "hoisting" (o'zgaruvchilarni ko'tarilishi) ni tushunish, kodda noto'g'ri o'zgaruvchilarni e'lon qilinmasidan avval ishlatib qo'yishning oldini oladi.

---

## 4. ❌ YOMON va ✅ YAXSHI Misollar (Ko'p Uchraydigan Xatolar)

### 1. Cheksiz rekursiya (Stack Overflow)
❌ **YOMON:**
\\\`\\\`\\\`javascript
function cheksiz() {
  cheksiz(); // Hech qachon to'xtamaydi
}
cheksiz(); 
// JS xato beradi: Maximum call stack size exceeded
\\\`\\\`\\\`

✅ **YAXSHI:**
\\\`\\\`\\\`javascript
function xavfsiz(limit) {
  if (limit <= 0) return; // To'xtash sharti (Base Case)
  xavfsiz(limit - 1);
}
xavfsiz(5);
\\\`\\\`\\\`

### 2. Temporal Dead Zone (TDZ)
❌ **YOMON:**
\\\`\\\`\\\`javascript
function printName() {
  console.log(name); // ReferenceError beradi
  let name = "Ali";
}
\\\`\\\`\\\`

✅ **YAXSHI:**
\\\`\\\`\\\`javascript
function printName() {
  let name = "Ali";
  console.log(name); // Oldin qiymat berilib, keyin ishlatilishi kerak
}
\\\`\\\`\\\`

---

## 5. 📊 Mermaid Diagrammasi

JS da Call Stack ishlash printsipi (LIFO - Oxirgi kirgan birinchi chiqadi):

\\\`\\\`\\\`mermaid
graph TD
    subgraph Call Stack (LIFO)
        direction TB
        S1["[ Bo'sh ]"]
        S2["[ Global Kontekst ]"]
        S3["[ birinchi() ]<br>[ Global Kontekst ]"]
        S4["[ ikkinchi() ]<br>[ birinchi() ]<br>[ Global Kontekst ]"]
        
        S1 -->|"Dastur ishga tushdi"| S2
        S2 -->|"birinchi() chaqirildi (Push)"| S3
        S3 -->|"ikkinchi() chaqirildi (Push)"| S4
        S4 -.->|"ikkinchi() tugadi (Pop)"| S3
        S3 -.->|"birinchi() tugadi (Pop)"| S2
        S2 -.->|"Dastur tugadi (Pop)"| S1
    end
\\\`\\\`\\\`

---

## 6. 💬 12 ta Intervyu Savollari

### Junior (1–4)
1. **Savol:** Bajarilish Konteksti (Execution Context) nima?
   **Javob:** Bu JavaScript kodi ishlaydigan muhit. U funksiya o'zgaruvchilarini, scope chain'ni saqlaydi.
2. **Savol:** Call Stack qanday ishlaydi?
   **Javob:** Call stack - LIFO (Oxirgi kirgan, birinchi chiqadi) mexanizmi asosida funksiyalar ketma-ketligini boshqaradi.
3. **Savol:** GEC (Global Execution Context) necha marta yaratiladi?
   **Javob:** Dastur ishlaganda faqat 1 marta yaratiladi.
4. **Savol:** Hoisting nima?
   **Javob:** O'zgaruvchi va funksiya e'lonlarining xotiraga yozilishi (ular kodda yozilishidan avvalroq engine tomonidan bilib olinadi).

### Middle (5–8)
5. **Savol:** Creation Phase va Execution Phase nima?
   **Javob:** Creation phase - JS muhitni tuzib, xotiradan joy oladi. Execution phase - kodni qatorma-qator o'qib ishga tushiradi.
6. **Savol:** Nega \`var\` undefined qaytaradi, \`let\` esa xatolik?
   **Javob:** \`var\` creation bosqichida undefined bilan to'ldiriladi. \`let\` esa qiymat o'qilishidan avval bloklangan holatda TDZ da turadi.
7. **Savol:** Variable Environment va Lexical Environment ni farqi nima?
   **Javob:** Variable env. - \`var\` o'zgaruvchilarini saqlaydi. Lexical env. - \`let\`, \`const\`, va funksiyalarni saqlaydi.
8. **Savol:** Stack Overflow nima degani?
   **Javob:** O'z-o'zini to'xtovsiz chaqiraveradigan rekursiya oqibatida Call Stack to'lib portlab ketishi (limitdan oshishi).

### Senior (9–12)
9. **Savol:** Funksiya ichida qaytarilgan Closure xotirada qanday saqlanadi?
   **Javob:** Closure qaytargan Leksik muhit Garbage Collector tomonidan o'chirilmaydi, chunki unga qaratilgan havola tirik qolgan bo'ladi.
10. **Savol:** JavaScript asinxron amallarni (setTimeout) Qanday qilib Call Stack'da boshqaradi?
    **Javob:** Ularni Web API orqali fonda ishlatib, so'ngra Event Queue ga uzatadi. Event Loop stack bo'shagandan so'ng ularni bajaradi.
11. **Savol:** "this" kalit so'zi Execution Context bilan qanday bog'liq?
    **Javob:** \`this\` faqatgina funksiyaning execution bosqichida funksiya qay usulda chaqirilganiga ko'ra (dot notation, bind va h.k.) kontekstga dinamik tarzda bog'lanadi.
12. **Savol:** Block Scope yangi Execution Context yaratadimi?
    **Javob:** Yo'q. Block (\`{ ... }\`) faqat yangi Lexical Environment yaratadi xolos, to'liq kontekst (FEC) faqat funksiya chaqirilganda yasaladi.
`,
  exercises: [
    {
      "id": 1,
      "title": "Global o'zgaruvchi yaratish",
      "instruction": "`appVersion` nomli o'zgaruvchi e'lon qiling va unga `\"1.0.0\"` qiymatini biriktiring.",
      "startingCode": "let appVersion = ;",
      "hint": "\"1.0.0\"",
      "test": "const sandbox = new Function(code + '; let appVersion = \"1.0.0\"; return appVersion === \"1.0.0\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 2,
      "title": "Local o'zgaruvchi funksiya ichida",
      "instruction": "`getName` funksiyasi ichida `name` nomli mahalliy (local) o'zgaruvchi yaratib, unga `\"Sardor\"` biriktiring va qaytaring.",
      "startingCode": "function getName() {\n  // local let name yarating\n  return name;\n}",
      "hint": "let name = \"Sardor\";",
      "test": "const sandbox = new Function(code + '; function getName(){ let name = \"Sardor\"; return name; } return getName() === \"Sardor\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 3,
      "title": "Block scope",
      "instruction": "Biror if blogi ichida `const` dan foydalanib `blockVar` deb nomlangan o'zgaruvchiga 5 sonini yuklang.",
      "startingCode": "if(true){\n  // const blockVar yarating\n}",
      "hint": "const blockVar = 5;",
      "test": "const sandbox = new Function(code + '; if(true){ const blockVar = 5; if(blockVar!==5) throw new Error(\"xato\"); } return true;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 4,
      "title": "Rekursiya to'xtash sharti (Base Case)",
      "instruction": "`countdown(n)` funksiyasida shunday shart qo'shingki, agar `n <= 0` bo'lsa darhol `return` qilsin. Aks holda o'zini chaqirsin.",
      "startingCode": "function countdown(n) {\n  // shu yerga if shartini yozing\n  countdown(n - 1);\n}",
      "hint": "if (n <= 0) return;",
      "test": "const sandbox = new Function(code + '; function countdown(n){ if(n<=0) return \"done\"; return countdown(n-1); } return countdown(3) === \"done\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 5,
      "title": "Var hoisting xatosi",
      "instruction": "`hoistedVar` o'zgaruvchisini `var` yordamida qiymatini lentalab 10 deb pastda qoldiring. Uni qanday qilib `undefined` berishini eslang. Siz shunchaki e'lonni yozib qo'ying.",
      "startingCode": "console.log(hoistedVar);\n// var bilan hoistedVar ni 10 ga tenglashtiring\n",
      "hint": "var hoistedVar = 10;",
      "test": "const sandbox = new Function(code + '; var hoistedVar = 10; return hoistedVar === 10;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 6,
      "title": "Let (TDZ) xatosi tasavvuri",
      "instruction": "Kodni to'g'irlang. `console.log(x); let x = 5;` xato (TDZ) beradi. Buni to'g'irlash uchun log'ni e'londan pastga tushiring.",
      "startingCode": "console.log(x);\nlet x = 5;",
      "hint": "let x = 5; console.log(x);",
      "test": "const sandbox = new Function(code + '; let x = 5; let r = x; return r===5;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 7,
      "title": "Nested funksiya chaqiruvi",
      "instruction": "`first()` funksiyasi ichidan `second()` funksiyasini chaqiring, shunda u stakka tushadi.",
      "startingCode": "function second() { return 2; }\nfunction first() {\n  // second() ni qaytaring\n}",
      "hint": "return second();",
      "test": "const sandbox = new Function(code + '; function second(){return 2;} function first(){return second();} return first()===2;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 8,
      "title": "Funksiya deklaratsiyasi hoisting'i",
      "instruction": "Tepa qismda ishlatilgan bo'lishiga qaramay, pastda `hello()` degan oddiy funksiya yozib, ichida `\"Hi\"` qaytaradigan qiling.",
      "startingCode": "const x = hello();\n// hello() funksiyasini shu yerga yozing",
      "hint": "function hello() { return 'Hi'; }",
      "test": "const sandbox = new Function(code + '; function hello(){return \"Hi\";} return hello() === \"Hi\";');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 9,
      "title": "Closure yordamida Scope'ni saqlash",
      "instruction": "Tashqi funksiya \`outer()\` ichida `count` ni e'lon qilib, uning ichida qiymatni oshiradigan ichki funksiya qaytaring.",
      "startingCode": "function outer() {\n  let count = 0;\n  return function() {\n    // count ni oshiring va qaytaring\n  }\n}",
      "hint": "count++; return count;",
      "test": "const sandbox = new Function(code + '; function outer(){let count = 0; return function(){count++; return count;}} let c = outer(); return c()===1;');\nreturn sandbox() ? null : 'Xato';"
    },
    {
      "id": 10,
      "title": "Limit qo'shish orqali rekursiyani himoyalash",
      "instruction": "`factorial(n)` funksiyasida `n === 0` sharti uchun `1` qaytarilishini (base case) yozing.",
      "startingCode": "function factorial(n) {\n  // agar n === 0 bo'lsa return 1;\n  return n * factorial(n - 1);\n}",
      "hint": "if (n === 0) return 1;",
      "test": "const sandbox = new Function(code + '; function factorial(n){ if(n===0) return 1; return n*factorial(n-1); } return factorial(3)===6;');\nreturn sandbox() ? null : 'Xato';"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "JavaScript kodida funksiya o'z ishini tugatganda nima bo'ladi?",
      "options": [
        "Call Stack dan o'chirilib (pop qilinib) kontekst yo'qoladi",
        "Stack tagiga tushiriladi",
        "U cheksiz xotirada qoladi",
        "Funksiyalar o'chirilmaydi"
      ],
      "correctAnswer": 0,
      "explanation": "Funksiya tugashi bilan uning FEC (Function Execution Context) qismi Call Stack dan pop qilinadi va xotira tozalanadi."
    },
    {
      "id": 2,
      "question": "JavaScript Call Stack qaysi tamoyil asosida ishlaydi?",
      "options": ["LIFO (Oxirgi kirdi, Birinchi chiqdi)", "FIFO (Birinchi kirdi, Birinchi chiqdi)", "Random", "Eng tez ishlaydigani oldin"],
      "correctAnswer": 0,
      "explanation": "Call stack LIFO (Last In First Out) prinsipi orqali oxirgi chaqirilgan funksiyani birinchi bo'lib o'qiydi."
    },
    {
      "id": 3,
      "question": "JavaScript-dagi o'zgaruvchi va funksiyalarning deklaratsiya qilinishidan avval ham mavjud bo'lib turishi nima deb ataladi?",
      "options": ["Hoisting", "Lexical Scoping", "Execution", "Stacking"],
      "correctAnswer": 0,
      "explanation": "Dvigatel creation fazasida e'lonlarni oldindan xotiraga yuklab olishi Hoisting deb ataladi."
    },
    {
      "id": 4,
      "question": "Var va Let hoisting jihatdan qanday farq qiladi?",
      "options": [
        "Faqat var hoisting bo'ladi",
        "Var ga undefined qiymati beriladi, Let esa Temporal Dead Zone'da qolib ketadi",
        "Hech qanday farqi yo'q",
        "Let to'liq hoisting bo'ladi, var esa bo'lmaydi"
      ],
      "correctAnswer": 1,
      "explanation": "Ikkisi ham hoisting bo'ladi, biroq var ga engine undefined beradi. Let esa TDZ da ushlanib o'qishga ruxsat etilmaydi."
    },
    {
      "id": 5,
      "question": "Global Bajarilish Konteksti qachon yaratiladi?",
      "options": ["Funksiya chaqirilganda", "Kod yuklanib eng birinchi ishga tushganda", "Xatolik bo'lganda", "API dan malumot kelganda"],
      "correctAnswer": 1,
      "explanation": "GEC JS dagi asosiy baza hisoblanadi va fayl ishga tushishi bilan bir marta yaratiladi."
    },
    {
      "id": 6,
      "question": "Lexical Environment o'z ichiga nimalarni oladi?",
      "options": [
        "Faqat var o'zgaruvchilarni",
        "Funksiya, o'zgaruvchilar va ularning tashqi qobiq (outer scope) ga bo'lgan havolasini",
        "Tarmoq ma'lumotlarini",
        "Faqat HTML dom-ni"
      ],
      "correctAnswer": 1,
      "explanation": "Lexical Environment bu scope'lar zanjirini tuzuvchi mexanizm bo'lib o'zgaruvchilar va parent scope referenceni ushlab turadi."
    },
    {
      "id": 7,
      "question": "Stack Overflow nima sababdan sodir bo'ladi?",
      "options": [
        "Xotira yetishmovchiligidan",
        "Ko'p o'zgaruvchi elon qilingandan",
        "Rekursiya sharti noto'g'ri yozilib funksiyalar Call Stack-ga to'xtovsiz qo'shilaverganda",
        "Tarmoq uzilib qolganda"
      ],
      "correctAnswer": 2,
      "explanation": "Rekursiya bazaviy cheklovga (base case) ega bo'lmasa cheksiz ishga tushib stack to'lib ketishiga olib keladi."
    },
    {
      "id": 8,
      "question": "Tashqi funksiyadagi local o'zgaruvchining ichki (nested) funksiya orqali xotirada qulflanib qolishi nima deyiladi?",
      "options": ["Closure (Yopilma)", "Hoisting", "Context", "Execution"],
      "correctAnswer": 0,
      "explanation": "Closure tufayli, ota funksiya tugagan taqdirda ham uning Lexical Environment'ini ichki funksiya ushlab tura oladi."
    },
    {
      "id": 9,
      "question": "Bajarilish Kontekstining ikkita bosqichi qaysi?",
      "options": [
        "Loading va Saving",
        "Creation (Yaratish) va Execution (Bajarish)",
        "Compiling va Rendering",
        "Pushing va Popping"
      ],
      "correctAnswer": 1,
      "explanation": "Har bir kontekst oldin yaratiladi (Creation) va keyin u yerdagi kod bajariladi (Execution)."
    },
    {
      "id": 10,
      "question": "this qiymati qachon aniqlanadi?",
      "options": [
        "Kod yozilayotgan paytda yozilgan joyiga (scope) ko'ra",
        "Funksiya chaqirilgan usuliga va Kontekst bosqichiga qarab dinamik tarzda",
        "Faqat o'zgaruvchi ishlatilganda",
        "Ixtiyoriy o'zgaradi"
      ],
      "correctAnswer": 1,
      "explanation": "this doimo execution kontekstiga moslashadi, ya'ni qanday ob'yekt orqali yoki qayerda chaqirilganligiga qarab uning qiymati belgilanadi."
    },
    {
      "id": 11,
      "question": "Asinxron kodlar qayerda navbat kutadi?",
      "options": ["Call Stack'da kutib o'tiradi", "Event Queue (yoki Callback Queue) va Microtask Queue'da", "Global scope'da", "Xotira keshida"],
      "correctAnswer": 1,
      "explanation": "Asinxron kod Call stack ni band qilmaydi. Web API ishlab bo'lgach Queue'ga tushadi, va Call Stack bo'shaganda Event loop uni ichkariga kiritadi."
    },
    {
      "id": 12,
      "question": "{...} kabi if yoki for bloklari alohida Kontekst (FEC) yaratadimi?",
      "options": [
        "Ha, har bir qavs alohida FEC",
        "Yo'q, FEC faqat funksiyalar uchun yaratiladi. Ular faqat Lexical Environment ni hosil qiladi xolos.",
        "Yo'q, ularni scope'i yo'q",
        "Ha, Globalni to'xtatadi"
      ],
      "correctAnswer": 1,
      "explanation": "Bloklar alohida Context (Execution Context) yaratmaydi, ular shunchaki o'zining Lexical scope block'iga ega bo'lishadi."
    }
  ]
};
