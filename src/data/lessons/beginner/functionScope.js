export const functionScopeLesson = {
  id: "functionScopeLesson",
  title: "Function Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Funksiya Qamrovi (Function Scope) nima?
JavaScript-da har safar yangi funksiya yaratganingizda, u o'ziga xos **yopiq hudud** (qamrov yoki scope) yaratadi. 
* Funksiya ichida e'lon qilingan o'zgaruvchilar (xoh \`var\`, xoh \`let\` yoki \`const\` bo'lsin) va funksiyaga uzatilgan argumentlar faqat shu funksiyaning **ichida** ishlaydi.
* Tashqi dunyo (ya'ni funksiya tashqarisidagi kodlar) bu o'zgaruvchilarni ko'ra olmaydi va ularga to'g'ridan-to'g'ri murojaat qila olmaydi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **shaxsiy xonadonsiz**:
* **Global Scope (Ko'cha):** Hamma uchun ochiq joy.
* **Function Scope (Xonadon):** Sizning uyingiz. Uyingiz ichidagi jihozlar faqat uydagilarga ko'rinadi. Ko'chadan turib hech kim sizning uyingiz ichidagi narsalarni ko'ra olmaydi.
* **Argument Isolation (Eshikdagi pochta qutisi):** Har bir xonadonning o'z pochta qutisi bor. Unga kelgan xatlar faqat shu xonadon a'zolari uchundir.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Sodda Lokal O'zgaruvchi)
Funksiya ichida e'lon qilingan o'zgaruvchining tashqaridan yopiqligi:
\`\`\`javascript
function showLocalSecret() {
  const secretCode = "JS-SCOPE-2026"; // Lokal o'zgaruvchi
  console.log("Funksiya ichida:", secretCode); // Ishlaydi
}

showLocalSecret();
// console.log(secretCode); // ReferenceError: secretCode is not defined
\`\`\`

### 2. Intermediate Example (Ichma-ich Funksiyalar va Scope Chain)
Ichki funksiyalar tashqi funksiya qamrovidagi o'zgaruvchilarga kira oladi:
\`\`\`javascript
function parentFunction() {
  let parentVar = "Men otaman";

  function childFunction() {
    let childVar = "Men bolaman";
    console.log("Child ichida parentVar:", parentVar); 
  }

  childFunction();
  // console.log(childVar); // ReferenceError: childVar is not defined
}

parentFunction();
\`\`\`

### 3. Advanced Example (Variable Shadowing)
Agar bir xil nomli o'zgaruvchi globalda va lokalda bo'lsa, lokal o'zgaruvchi globalni yopib qo'yadi (Shadowing):
\`\`\`javascript
let username = "GlobalJasur"; 

function greet(username) {
  // Parametrdagi username globalni shadow (soya) qiladi
  console.log("Salom, " + username); 
}

greet("Lola"); // "Salom, Lola" (Lokal ustun)
console.log(username); // "GlobalJasur" (Global o'zgarmadi)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Execution Context va Call Stack
1. Funksiya chaqirilganda, uning bajarilish muhiti (Execution Context) **Call Stack**-ga yuklanadi.
2. Bu muhit o'zining **Lexical Environment (Leksik Muhit)** obyektiga ega bo'ladi.
3. U o'zining **Outer Reference** (tashqi muhit ko'rsatkichi) orqali o'zidan tepada turgan ota qamrovga bog'lanadi (Scope Chain).
4. Funksiya bajarilib bo'lingach, uning context-i Call Stack-dan o'chiriladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (YOMON / YAXSHI)

### 1. Lokal o'zgaruvchini global deb o'ylash
🔴 **YOMON:** (Lokal o'zgaruvchiga tashqaridan murojaat qilish)
\`\`\`javascript
function calculateSum(a, b) {
  let result = a + b;
}
calculateSum(5, 10);
console.log(result); // ReferenceError: result is not defined
\`\`\`

🟢 **YAXSHI:** (Qiymatni qaytarish)
\`\`\`javascript
function calculateSum(a, b) {
  return a + b;
}
let result = calculateSum(5, 10);
console.log(result); // 15
\`\`\`

### 2. Kalit so'zsiz e'lon orqali Global ifloslanish
🔴 **YOMON:** (Global ifloslanish)
\`\`\`javascript
function initializeScore() {
  score = 100; // var, let yoki const yo'q!
}
initializeScore();
console.log(window.score); // 100 
\`\`\`

🟢 **YAXSHI:** (Xavfsiz yondashuv)
\`\`\`javascript
"use strict";
function initializeScore() {
  let score = 100; // Xavfsiz lokal o'zgaruvchi
}
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **Savol:** Function scope nima?
   * **Javob:** Funksiya ichida e'lon qilingan o'zgaruvchilar va parametrlarning faqat shu funksiya ichida ishlatilishi va tashqaridan yopiq bo'lishi.
2. **Savol:** Funksiya parametrlari qayerda saqlanadi?
   * **Javob:** Ular funksiyaning lokal qamrovida saqlanadi.
3. **Savol:** Variable Shadowing nima?
   * **Javob:** Ichki scope-da tashqi scope-dagi o'zgaruvchi bilan bir xil nomli o'zgaruvchi yaratilganda, ichki o'zgaruvchi tashqi o'zgaruvchini to'sib qo'yishi.
4. **Savol:** Qamrov zanjiri (Scope Chain) qanday ishlaydi?
   * **Javob:** Dvigatel o'zgaruvchini joriy qamrovdan izlaydi, topmasa tashqi qamrovlarga chiqib ketadi va globalgacha boradi.
5. **Savol:** \`let\`/\`const\` va \`var\` o'rtasidagi qamrov farqi?
   * **Javob:** \`var\` function-scoped, \`let\`/\`const\` block-scoped.
6. **Savol:** Funksiya bajarilib bo'lingach, uning lokal o'zgaruvchilari nima bo'ladi?
   * **Javob:** Ular Garbage Collector tomonidan tozalanadi (agar closure bo'lmasa).
7. **Savol:** \`use strict\` scope bo'yicha qanday yordam beradi?
   * **Javob:** U e'lon qilinmagan o'zgaruvchini implicit global qilishni oldini oladi va xato beradi.
8. **Savol:** Lexical Environment obyektining qismlari?
   * **Javob:** Environment Record va Outer Lexical Environment Reference.
9. **Savol:** \`new Function()\` qamrovi qanday?
   * **Javob:** Ular har doim global qamrovga outer reference bog'laydi.
10. **Savol:** Dynamic Scope va Lexical Scope farqi?
    * **Javob:** Lexical kod yozilgan joyga, Dynamic esa chaqirilgan joyga asoslanadi. JS lexical scope ishlatadi.
11. **Savol:** Argument izolyatsiyasi nima?
    * **Javob:** Har bir chaqiruv o'z argumentlar to'plamiga ega bo'lib, ular boshqa chaqiruvlarga ta'sir qilmaydi.
12. **Savol:** \`var\` nega globalni ifloslantirishi osonroq?
    * **Javob:** Chunki \`var\` if/for bloklarida chegaralanmaydi va darhol tashqi qamrovga o'tib ketadi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Quyida nested funksiya e'lonlari tasvirlovchi diagramma:
\`\`\`mermaid
graph TD
    subgraph GlobalScope["Global Scope (Ko'cha)"]
        globalVar["let globalVar = 'Global'"]
        subgraph OuterScope["outerFunction Scope (Uy)"]
            outerVar["let outerVar = 'Outer'"]
            subgraph InnerScope["innerFunction Scope (Xona)"]
                innerVar["let innerVar = 'Inner'"]
            end
        end
    end
    InnerScope -->|1. Lokal| OuterScope
    OuterScope -->|2. Outer| GlobalScope
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi testlarni yechishni unutmang.

---

## 8. 🎯 Real Project Case Study

### Widget izolyatsiyasi
Eski loyihalarda IIFE orqali izolyatsiya qilingan:
\`\`\`javascript
(function() {
  let requestCounter = 0;
  window.myAnalytics = {
    track: () => { requestCounter++; }
  };
})();
\`\`\`

---

## 9. 🚀 Performance va Optimization

* Loop ichida funksiya e'lon qilmang, u qayta-qayta yangi qamrov yaratib xotirani yeydi.
* Sof funksiyalar (Pure functions) va lokal o'zgaruvchilarni afzal ko'ring.

---

## 10. 📌 Cheat Sheet

| Qamrov turi | E'lon qilingan joyi | Tashqaridan kirish | Ta'rifi |
| :--- | :--- | :--- | :--- |
| **Function Scope** | \`{}\` ichida | Yo'q | Faqat funksiya ichidagilar kira oladi |
| **Argument Isolation** | Parametrlar | Yo'q | Mustaqil argumentlar |
| **Shadowing** | Ichki qamrovda e'lon | Yo'q | Ota qamrovdagini to'sib qo'yish |
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
      instruction: "`createCounter()` yozing, u o'zining ichida `count = 0` saqlasin va uni 1 ga oshiruvchi hamda qaytaruvchi anonim funksiya qaytarsin (closure).",
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
      instruction: "`addToList(val)` funksiyasi lokal massiv emas, balki qanday saqlaydi? Yo'q, `getArray()` yozing, u ichida `const arr = []` e'lon qilib, ichiga 1 solib qaytarsin. Uni necha marta chaqirsak ham faqat `[1]` bo'ladi.",
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
