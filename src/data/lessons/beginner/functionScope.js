export const functionScopeLesson = {
  id: "functionScopeLesson",
  title: "Function Scope",
  language: "javascript",
  theory: `## 1. 💡 Beginner Analogy (Sodda Tushuntirish va O'xshatish)

### Funksiya Qamrovi (Function Scope) nima?
Tasavvur qiling, sizning uyingiz — bu funksiya. Uyingiz ichida nimalar borligini (divan, televizor) ko'chadan o'tayotgan odamlar ko'ra olmaydi. Uyingiz ichidagi narsalar faqat siz (va oilangiz) uchun mavjud.
JavaScript-da ham xuddi shunday: funksiya ichida e'lon qilingan o'zgaruvchilar (xoh \`var\`, xoh \`let\` yoki \`const\` bo'lsin) faqat o'sha funksiyaning ichida "yashaydi". Tashqi dunyo (boshqa funksiyalar yoki global qamrov) ularni ko'ra olmaydi.

### Misol:
\`\`\`javascript
function uydagiSir() {
  const sir = "Men bugun kechqurun shokolad yedim";
  console.log(sir); // Ichkarida ishlaydi
}

uydagiSir();
// console.log(sir); // XATO! Tashqaridan ko'rinmaydi. ReferenceError: sir is not defined
\`\`\`

## 2. 🔬 Deep Dive (Under the Hood, Memory, V8 Engine, Performance)

### Execution Context (Bajarilish Muhiti)
V8 engine qanday ishlaydi? Qachonki siz funksiyani chaqirsangiz (invoke qilsangiz), V8 engine darhol **Execution Context** yaratadi. Bu context Call Stack-ga yuklanadi.
Ushbu Execution Context o'zining **Lexical Environment**-iga ega bo'lib, uning ichida ikkita muhim narsa bor:
1. **Environment Record:** Funksiya ichida e'lon qilingan barcha lokal o'zgaruvchilar va argumentlar saqlanadigan joy.
2. **Outer Lexical Environment Reference:** Tashqi qamrovga yo'llanma.

### Xotira va Garbage Collection
Funksiya ishlab bo'lgach (ya'ni uning ishi tugab, Call Stack-dan o'chirilgach), uning barcha lokal o'zgaruvchilari **Garbage Collector (Axlat yig'uvchi)** tomonidan xotiradan tozalanadi. Bu degani siz funksiya ichida yuzlab o'zgaruvchilar yaratsangiz ham, funksiya o'z ishini tugatgach ular tizim xotirasini band qilib turmaydi (agar ular closure tomonidan ushlab turilmasa).

### Performance Optimization
* Funksiya ichida juda katta massivlar yoki obyektlar yaratsangiz, bilingki, funksiya tugagach ular tezda xotiradan tozalanadi.
* **Tavsiya:** Doimo global o'zgaruvchilardan ko'ra, funksiya ichidagi lokal o'zgaruvchilarni afzal ko'ring. Sababi, lokal o'zgaruvchilarga murojaat qilish ancha tezroq bo'ladi (chunki V8 ularni to'g'ridan-to'g'ri CPU registrlarida yoki stekda saqlashga harakat qiladi).

## 3. ⚠️ Edge Cases va Senior Interview Questions

### Edge Case 1: Parametr va o'zgaruvchi to'qnashuvi (Variable Shadowing)
Agar funksiya parametri bilan bir xil nomdagi lokal o'zgaruvchini \`var\` bilan e'lon qilsangiz nima bo'ladi?
\`\`\`javascript
function test(a) {
  var a = 20; // Parametrni ustidan yozib yuboradi
  console.log(a); // 20
}
test(10);
\`\`\`
Lekin \`let\` yoki \`const\` bilan qilsangiz, SyntaxError olasiz!
\`\`\`javascript
function test(a) {
  let a = 20; // SyntaxError: Identifier 'a' has already been declared
}
\`\`\`

### Senior Interview Savollari
1. **Savol:** Function scope nima?
   **Javob:** Funksiya yaratilganda hosil bo'ladigan izolyatsiya qilingan hudud bo'lib, o'zgaruvchilar faqat funksiya ichida ko'rinadi.
2. **Savol:** \`var\` ning block scope-ni teshish xususiyati nima?
   **Javob:** \`var\` faqat function scope ni taniydi. \`if\` yoki \`for\` kabi bloklarni e'tiborga olmaydi. Shuning uchun blok ichida \`var\` orqali ochilgan o'zgaruvchi blokdan tashqariga chiqib ketadi (agar ular funksiya ichida bo'lmasa, globalga aylanadi).
3. **Savol:** Scope Chain qanday ishlaydi?
   **Javob:** O'zgaruvchi ishlatilganda, Engine avval uni lokal Environment Record-dan izlaydi. Agar topmasa, Outer Reference orqali ota funksiyaga o'tadi va to global muhitgacha shunday davom etadi.
4. **Savol:** Garbage Collector funksiya o'zgaruvchilarini qachon tozalaydi?
   **Javob:** Funksiyaning Execution Context-i Call Stack-dan pop bo'lgandan so'ng, agar hech qanday Closure bu o'zgaruvchilarga havola (reference) ushlab turmasa.
5. **Savol:** Kalit so'zsiz o'zgaruvchi e'lon qilish (Implicit Global) nimaga olib keladi?
   **Javob:** "Strict Mode" ishlatilmasa, u to'g'ridan-to'g'ri global obyektga (masalan, \`window\` ga) biriktiriladi. "Strict mode"da esa ReferenceError beradi.

## 4. 📊 Mermaid Diagram: Scope Chain and Execution Context

\`\`\`mermaid
graph TD
    A[Global Execution Context] -->|Outer Reference| Null
    A -->|Contains| GV[Global Variables: let a = 10]
    
    B[Parent Function Context] -->|Outer Reference| A
    B -->|Contains| PV[Local Variables: let b = 20]
    
    C[Child Function Context] -->|Outer Reference| B
    C -->|Contains| CV[Local Variables: let c = 30]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bfb,stroke:#333,stroke-width:2px
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Lokal o'zgaruvchi",
      instruction: "`calculateArea(width, height)` funksiyasi ichida `area` nomli lokal o'zgaruvchi e'lon qilib, yuzani hisoblab return qiling.",
      startingCode: "function calculateArea(width, height) {\n  // area o'zgaruvchisini ishlating\n}",
      hint: "`const area = width * height; return area;`",
      test: "const fn = new Function(code + '; return calculateArea;')(); if(typeof area !== 'undefined') return 'Global area topildi'; if(fn(5, 10) !== 50) return 'Natija 50 emas'; return code.includes('area') ? null : 'area ishlatilmadi';"
    },
    {
      id: 2,
      title: "Shadowing (Soya qilish)",
      instruction: "Global `name = \"Global\"` bor. `greetUser(name)` funksiyasi globalga teginmasdan `\"Salom, \" + name` qaytarsin.",
      startingCode: "let name = \"Global\";\nfunction greetUser(name) {\n  \n}",
      hint: "return 'Salom, ' + name;",
      test: "const obj = new Function(code + '; return { greetUser, name };')(); if(obj.greetUser('Ali') !== 'Salom, Ali' && obj.greetUser('Ali') !== 'Salom, Ali!') return 'Xato'; if(obj.name !== 'Global') return 'Global o\\'zgardi'; return null;"
    },
    {
      id: 3,
      title: "Nested Scopes",
      instruction: "`outerContainer()` yozing, uning ichida `x=100`. Yana `innerContainer()` degan ichki funksiya e'lon qilib, u `x*2` qaytarsin. `outerContainer` esa `innerContainer()` natijasini qaytarsin.",
      startingCode: "function outerContainer() {\n  \n}",
      hint: "x=100; function innerContainer(){ return x*2; } return innerContainer();",
      test: "const fn = new Function(code + '; return outerContainer;')(); if(fn() !== 200) return 'Xato 200 chiqishi kerak'; return null;"
    },
    {
      id: 4,
      title: "Parametrlarni o'zgartirish izolyatsiyasi",
      instruction: "`updatePrice(price)` funksiyasini yarating, parametrga 100 qo'shib uni qaytarsin. Parametrdagi o'zgarishlar globaldagi o'zgaruvchiga ta'sir qilmaydi.",
      startingCode: "let myPrice = 50;\nfunction updatePrice(price) {\n  \n}",
      hint: "price += 100; return price;",
      test: "const obj = new Function(code + '; return { updatePrice, myPrice };')(); if(obj.updatePrice(10) !== 110) return 'Xato'; return obj.myPrice === 50 ? null : 'myPrice o\\'zgarib ketdi';"
    },
    {
      id: 5,
      title: "Global ifloslanishning oldini olish",
      instruction: "`setScore()` ichida lokal `score = 5` yarating va qaytaring, kalit so'zni unutmang (`let` yoki `const`).",
      startingCode: "function setScore() {\n  \n}",
      hint: "let score = 5; return score;",
      test: "const fn = new Function(code + '; return setScore;')(); if(fn() !== 5) return 'Natija 5 bo\\'lishi kerak'; if(!code.includes('let score') && !code.includes('const score') && !code.includes('var score')) return 'Kalit so\\'z ishlatilmadi'; return null;"
    },
    {
      id: 6,
      title: "Closure va Scope",
      instruction: "`createCounter()` yozing, u o'zining ichida `count = 0` saqlasin va uni 1 ga oshiruvchi hamda qaytuvchi anonim funksiya qaytarsin (closure).",
      startingCode: "function createCounter() {\n  \n}",
      hint: "let count = 0; return function() { return ++count; }",
      test: "const fn = new Function(code + '; return createCounter;')()(); if(fn() !== 1 || fn() !== 2) return 'Counter ishlamadi'; return null;"
    },
    {
      id: 7,
      title: "Tashqi va ichki o'zgaruvchilar to'qnashuvi",
      instruction: "`varCheck()` funksiyasida `let msg = \"Hello\";` yarating. Ichida `if(true)` blokida `let msg = \"Bye\";` qiling va `msg`ni qaytaring, lekin blokdan tashqarida qaytaring! Qaysi biri qaytishini ko'ring.",
      startingCode: "function varCheck() {\n  let msg = \"Hello\";\n  if (true) {\n    let msg = \"Bye\";\n  }\n  // msg ni return qiling\n}",
      hint: "return msg; (Hello qaytadi chunki let blokda qoladi)",
      test: "const fn = new Function(code + '; return varCheck;')(); if(fn() !== 'Hello') return 'Hello qaytishi kerak'; return null;"
    },
    {
      id: 8,
      title: "Ikkita parametr shadowing",
      instruction: "`multiply(a, b)` funksiyasi o'zining parametrlaridan foydalanib ko'paytmani qaytarsin, xuddi shu nomdagi global `a=10`, `b=20` mavjudligiga qaramay.",
      startingCode: "let a = 10, b = 20;\nfunction multiply(a, b) {\n  \n}",
      hint: "return a * b;",
      test: "const obj = new Function(code + '; return { multiply, a, b };')(); if(obj.multiply(3,4)!==12) return 'Xato'; return null;"
    },
    {
      id: 9,
      title: "Function Scope ichida IIFE",
      instruction: "`wrapper()` funksiyasi ichida darhol ishlovchi funksiya (IIFE) yarating, u `\"IIFE\"` so'zini qaytarsin va wrapper ham shuni qaytarsin.",
      startingCode: "function wrapper() {\n  \n}",
      hint: "return (function() { return \"IIFE\"; })();",
      test: "const fn = new Function(code + '; return wrapper;')(); if(fn() !== 'IIFE') return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "Ko'p funksiya chaqiruvlari izolyatsiyasi",
      instruction: "`getArray()` yozing, u ichida `const arr = []` e'lon qilib, ichiga 1 solib qaytarsin. Uni necha marta chaqirsak ham faqat `[1]` bo'ladi.",
      startingCode: "function getArray() {\n  \n}",
      hint: "const arr = []; arr.push(1); return arr;",
      test: "const fn = new Function(code + '; return getArray;')(); if(fn().length !== 1 || fn().length !== 1) return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da funksiya qamrovi (Function Scope) nima?",
      options: [
        "Funksiya ichida e'lon qilingan o'zgaruvchilar faqat o'sha funksiya ichida va undan ichki bo'lgan qamrovlarda mavjud bo'lishi",
        "Faqat `const` va `let` bilan yaratilgan o'zgaruvchilar",
        "Server o'chirilguncha xotirada saqlanadigan global o'zgaruvchilar",
        "Barcha funksiyalar bir-birining o'zgaruvchilarini erkin o'qishi"
      ],
      correctAnswer: 0,
      explanation: "Funksiya qamrovi — funksiya ichida yaratilgan o'zgaruvchilarning faqat shu funksiya ichida ishlashidir."
    },
    {
      id: 2,
      question: "Quyidagi kod natijasi?\n```javascript\nfunction testScope() { var msg = \"Salom\"; }\ntestScope(); console.log(msg);\n```",
      options: [
        "\"Salom\"",
        "ReferenceError: msg is not defined",
        "undefined",
        "null"
      ],
      correctAnswer: 1,
      explanation: "msg funksiya lokal qamrovida yaratilgan. Uni tashqarida chaqirib bo'lmaydi."
    },
    {
      id: 3,
      question: "Variable Shadowing nima?",
      options: [
        "Ichki qamrovda ota qamrovdagi o'zgaruvchi bilan bir xil nomli o'zgaruvchi yaratib, otadagisini 'yopib qo'yish'",
        "O'zgaruvchilarni butunlay o'chirib tashlash",
        "O'zgaruvchilarni faqat asinxron ishlatish",
        "Lokal o'zgaruvchilarni globallashtirish"
      ],
      correctAnswer: 0,
      explanation: "Ichki scope'dagi o'zgaruvchi ota scope'dagi xuddi shu nomdagi o'zgaruvchiga ustunlik qiladi."
    },
    {
      id: 4,
      question: "Quyidagi kodda nima chiqadi?\n```javascript\nlet name = \"Anvar\";\nfunction change() { let name = \"Dilshod\"; }\nchange(); console.log(name);\n```",
      options: [
        "\"Dilshod\"",
        "\"Anvar\"",
        "ReferenceError",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Funksiya ichida name yangidan e'lon qilingan, bu globalga ta'sir qilmaydi."
    },
    {
      id: 5,
      question: "Funksiya parametrlari qaysi qamrovga tegishli?",
      options: [
        "Global qamrovga",
        "Faqat o'sha funksiyaning lokal qamroviga",
        "Block scope-ga",
        "Ota qamrovga"
      ],
      correctAnswer: 1,
      explanation: "Parametrlar funksiyaning lokal o'zgaruvchilari hisoblanadi."
    },
    {
      id: 6,
      question: "Quyidagi kod natijasi?\n```javascript\nfunction outer() {\n  let c = 10;\n  function inner() { console.log(c); }\n  inner();\n}\nouter();\n```",
      options: [
        "10",
        "ReferenceError",
        "undefined",
        "null"
      ],
      correctAnswer: 0,
      explanation: "Lexical Scope qoidasiga ko'ra ichki funksiya o'zining tashqi funksiyasi o'zgaruvchilariga kirishi mumkin."
    },
    {
      id: 7,
      question: "Scope Chain deganda nima tushuniladi?",
      options: [
        "Barcha skriptlarni yuklash tartibi",
        "O'zgaruvchini joriy qamrovdan boshlab to globalgacha qidirish jarayoni",
        "Chaqirilishlar zanjiri",
        "Xatoliklarni uzatish zanjiri"
      ],
      correctAnswer: 1,
      explanation: "Scope Chain — o'zgaruvchini avval lokaldan, keyin otasidan, keyin globaldan izlash mexanizmi."
    },
    {
      id: 8,
      question: "Strict mode YO'Q bo'lganda quyidagi nima qiladi?\n```javascript\nfunction s() { score = 100; }\ns(); console.log(score);\n```",
      options: [
        "ReferenceError",
        "100",
        "undefined",
        "Dastur yopilib qoladi"
      ],
      correctAnswer: 1,
      explanation: "Kalit so'zsiz e'lon qilingan o'zgaruvchi global obyektga qo'shilib ketadi (Implicit Global)."
    },
    {
      id: 9,
      question: "\"use strict\" rejimida `score = 100;` qilsak nima bo'ladi?",
      options: [
        "Global bo'lib qoladi",
        "ReferenceError beradi",
        "TypeError beradi",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Qat'iy rejim implicit global o'zgaruvchilarga yo'l qo'ymaydi va xato beradi."
    },
    {
      id: 10,
      question: "Shadowing qachon global o'zgaruvchini o'zgartiradi?",
      options: [
        "O'zgaruvchi nomlari har xil bo'lganda",
        "Shadowing global o'zgaruvchini o'zgartirmaydi",
        "Faqat const ishlatilganda",
        "Faqat if ichida"
      ],
      correctAnswer: 1,
      explanation: "Shadowing bu shunchaki ota qamrovdagi nomni to'sib qo'yishdir, uni asl qiymatini o'zgartirmaydi."
    },
    {
      id: 11,
      question: "Function Scope va Block Scope farqi?",
      options: [
        "`var` blokni chetlab o'tib funksiyagacha boradi, `let` esa blok ichida qamaladi",
        "Hech qanday",
        "`var` brauzerda, `let` Node.js da",
        "`let` funksiya ichida ishlamaydi"
      ],
      correctAnswer: 0,
      explanation: "`var` funksiya chegarasini taniydi, if/for bloklarini mensimaydi. `let`/`const` esa blok qamrovlidir."
    },
    {
      id: 12,
      question: "Quyidagi kod natijasi?\n```javascript\nif(true){ var a=1; let b=2; }\nconsole.log(a);\nconsole.log(b);\n```",
      options: [
        "1 va 2",
        "1 va ReferenceError (b is not defined)",
        "ReferenceError a is not defined",
        "2 va 1"
      ],
      correctAnswer: 1,
      explanation: "a var bo'lgani uchun if dan chiqib ketadi. b let bo'lgani uchun if ichida qoladi."
    }
  ]
};
