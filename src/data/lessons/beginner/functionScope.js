export const functionScopeLesson = {
  id: "functionScopeLesson",
  title: "Function Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Funksiya Qamrovi (Function Scope) nima?
JavaScript-da har safar yangi funksiya yaratganingizda, u o'ziga xos **yopiq hudud** (qamrov yoki scope) yaratadi. 
* Funksiya ichida e'lon qilingan o'zgaruvchilar (xoh \`var\`, xoh \`let\` yoki \`const\` bo'lsin) va funksiyaga uzatilgan argumentlar faqat shu funksiyaning **ichida** ishlaydi.
* Tashqi dunyo (ya'ni funksiya tashqarisidagi kodlar) bu o'zgaruvchilarni ko'ra olmaydi va ularga to'g'ridan-to'g'ri murojaat qila olmaydi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **shaxsiy xonadonsiz**:
* **Global Scope (Ko'cha):** Hamma uchun ochiq joy. Bu yerda turgan e'lonlar taxtasini ko'chada yurgan har bir kishi o'qishi mumkin.
* **Function Scope (Xonadon):** Sizning uyingiz. Uyingiz ichidagi jihozlar, masalan, stol ustidagi shaxsiy kundalik faqat uydagilarga (funksiya ichiga) ko'rinadi. Ko'chadan turib (tashqi global scope-dan) hech kim sizning uyingiz ichidagi narsalarni ko'ra olmaydi.
* **Argument Isolation (Eshikdagi pochta qutisi):** Har bir xonadonning o'z pochta qutisi bor. Unga kelgan xatlar faqat shu xonadon a'zolari uchun va boshqa qo'shnilar (boshqa funksiya chaqiriqlari) ularni o'qiy olmaydi.

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

// Tashqaridan murojaat qilib ko'ramiz:
console.log(secretCode); 
// Xatolik: ReferenceError: secretCode is not defined
\`\`\`

### 2. Intermediate Example (Ichma-ich Funksiyalar va Scope Chain)
Ichki funksiyalar tashqi funksiya qamrovidagi o'zgaruvchilarga kira oladi, lekin teskarisi ishlamaydi:
\`\`\`javascript
function parentFunction() {
  let parentVar = "Men otaman";

  function childFunction() {
    let childVar = "Men bolaman";
    // Ichki funksiya tashqi funksiyaning o'zgaruvchisini ko'ra oladi
    console.log("Child ichida parentVar:", parentVar); 
  }

  childFunction();

  // Tashqi funksiya ichki funksiyaning o'zgaruvchisini KO'RA OLMAYDI
  console.log(childVar); 
  // Xatolik: ReferenceError: childVar is not defined
}

parentFunction();
\`\`\`

### 3. Advanced Example (Variable Shadowing va Parameter Isolation)
Agar bir xil nomli o'zgaruvchi globalda va lokalda bo'lsa, lokal o'zgaruvchi globalni yopib qo'yadi (Shadowing):
\`\`\`javascript
let username = "GlobalJasur"; // Global o'zgaruvchi

function greet(username) {
  // Parametrdagi username global username-ni shadow (soyada qoldirish) qiladi
  console.log("Salom, " + username); 
}

greet("Lola"); // "Salom, Lola" chiqadi (Lokal parametr ustun)
console.log(username); // "GlobalJasur" chiqadi (Global o'zgaruvchi o'zgarmadi)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Execution Context va Call Stack
JavaScript dvigateli kodni bajarayotganda har bir funksiya chaqiruvi uchun **Execution Context (Bajarilish Muhiti)** yaratadi:
1. Funksiya chaqirilganda, uning bajarilish muhiti **Call Stack**-ga yuklanadi.
2. Bu muhit o'zining **Lexical Environment (Leksik Muhit)** obyektiga ega bo'ladi. Leksik muhitda funksiya parametrlari va lokal o'zgaruvchilar saqlanadigan **Environment Record** bo'ladi.
3. Shuningdek, u o'zining **Outer Reference** (tashqi muhit ko'rsatkichi) orqali o'zidan tepada turgan ota qamrovga bog'lanadi. Buni **Scope Chain (Qamrovlar Zanjiri)** deyiladi.
4. Funksiya bajarilib bo'lingach, uning execution context-i Call Stack-dan o'chiriladi (pop qilinadi) va xotira bo'shatiladi (Garbage Collection).

> [!IMPORTANT]
> Funksiya e'lon qilingan paytning o'zida uning tashqi muhitga bo'lgan havolasi (Lexical Environment) biriktiriladi. Funksiya qayerdan chaqirilganidan qat'i nazar, u o'zi yaratilgan joydagi scope zanjiri bo'yicha o'zgaruvchilarni qidiradi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Lokal o'zgaruvchini global deb o'ylash
#### Xato:
\`\`\`javascript
function calculateSum(a, b) {
  let result = a + b;
}
calculateSum(5, 10);
console.log(result); // ReferenceError: result is not defined
\`\`\`
#### To'g'ri usul:
Qiymatni tashqariga chiqarish uchun \`return\` kalit so'zidan foydalanish lozim:
\`\`\`javascript
function calculateSum(a, b) {
  return a + b;
}
let result = calculateSum(5, 10);
console.log(result); // 15
\`\`\`

### 2. Kalit so'zsiz e'lon qilish orqali Global Scope-ni ifloslantirish (Pollution)
#### Xato:
\`strict mode\` yoqilmagan holatda \`var\`, \`let\` yoki \`const\` ishlatmaslik o'zgaruvchini avtomatik global qilib qo'yadi.
\`\`\`javascript
function initializeScore() {
  score = 100; // Kalit so'z yo'q!
}
initializeScore();
console.log(window.score); // 100 (Global ifloslandi)
\`\`\`
#### To'g'ri usul:
Har doim o'zgaruvchilarni e'lon qilishda \`let\` yoki \`const\` represents ishlating va \`"use strict";\` rejimini yoqing.
\`\`\`javascript
"use strict";
function initializeScore() {
  let score = 100; // Xavfsiz lokal o'zgaruvchi
}
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Function scope nima?
   * **Javob:** Funksiya ichida e'lon qilingan o'zgaruvchilar va parametrlarning faqat shu funksiya ichida ishlatilishi va tashqaridan yopiq bo'lishi.
2. **Savol:** Funksiya parametrlari qayerda saqlanadi?
   * **Javob:** Ular funksiyaning lokal qamrovida (Environment Record) saqlanadi va lokal o'zgaruvchi kabi ishlaydi.
3. **Savol:** Variable Shadowing nima?
   * **Javob:** Ichki scope-da tashqi scope-dagi o'zgaruvchi bilan bir xil nomli o'zgaruvchi yaratilganda, ichki o'zgaruvchi tashqi o'zgaruvchini to'sib (yashirib) qo'yishidir.
4. **Savol:** Qamrov zanjiri (Scope Chain) qanday ishlaydi?
   * **Javob:** JS dvigateli o'zgaruvchini dastlab lokal qamrovdan qidiradi, topolmasa ota qamrovga va eng oxirida global qamrovga murojaat qiladi.

### Middle
5. **Savol:** \`let\`/\`const\` va \`var\` o'rtasidagi qamrov bo'yicha farq nima?
   * **Javob:** \`var\` funksiya qamroviga ega (function-scoped), ya'ni u faqat funksiya ichida cheklanadi. \`let\` va \`const\` esa blok qamroviga ega (block-scoped), ya'ni ular istalgan \`{}\` bloklari ichida lokal bo'ladi.
6. **Savol:** Funksiya bajarilib bo'lingach, uning lokal o'zgaruvchilari nima bo'ladi?
   * **Javob:** Ularning bajarilish konteksti call stack-dan o'chiriladi va yopilishlar (closures) mavjud bo'lmasa, Garbage Collector ularni xotiradan tozalaydi.
7. **Savol:** \`use strict\` rejimi funksiya scope-dagi xatolarni qanday oldini oladi?
   * **Javob:** U kalit so'zsiz o'zgaruvchilarni e'lon qilishni taqiqlaydi va bunday holatda ReferenceError beradi.
8. **Savol:** Agar funksiya ichida \`var x = 5\` deb e'lon qilsak va keyin \`if\` bloki ichida \`var x = 10\` deb o'zgartirsak nima bo'ladi?
   * **Javob:** \`var\` block scope-ga ega emasligi sababli, u bitta umumiy lokal \`x\` bo'lib qoladi va qiymati 10 ga o'zgaradi.

### Senior
9. **Savol:** Lexical Environment obyektining tarkibiy qismlari nimalardan iborat?
   * **Javob:** Environment Record (lokal identifikatorlar xaritasi) va Outer Lexical Environment Reference (ota qamrovga havola).
10. **Savol:** \`new Function('a', 'return a')\` qamrovi qanday ishlaydi?
    * **Javob:** \`new Function\` yordamida yaratilgan funksiyalar doimo global qamrovga outer reference bog'laydi, ya'ni ular e'lon qilingan joyidagi leksik qamrovni ko'rmaydi.
11. **Savol:** Dynamic Scope va Lexical Scope farqi nima? JS qaysi biridan foydalanadi?
    * **Javob:** Lexical Scope o'zgaruvchilarning kod yozilgan paytdagi joylashuviga qarab scope-ni belgilaydi. Dynamic Scope esa chaqirilish vaqtiga qarab belgilaydi. JavaScript faqat Lexical Scope-dan foydalanadi.
12. **Savol:** Argument izolyatsiyasi nima uchun JavaScript-dagi funksional dasturlashda juda muhim?
    * **Javob:** Funksiya chaqirilganda uzatilgan argumentlar har bir chaqiruv uchun alohida execution context yaratgani sababli, bir chaqiruvdagi ma'lumotlar ikkinchi parallel chaqiruvga ta'sir qilmaydi (Side effects oldi olinadi).

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz funksiya qamrovi, argument shadowing va ichma-ich funksiyalar bilan ishlovchi 3 ta amaliy topshiriqni bajarasiz (Mashqlar alohida faylda keltirilgan).

Quyida nested funksiya e'lonlari va argument izolyatsiyasi qoidalarini tasvirlovchi diagramma berilgan:

\`\`\`mermaid
graph TD
    subgraph GlobalScope["Global Scope (Ko'cha)"]
        globalVar["let globalVar = 'Global'"]
        
        subgraph OuterScope["outerFunction Scope (Uy)"]
            outerVar["let outerVar = 'Outer'"]
            outerParam["Parameter: outerParam (Argument Izolyatsiyasi)"]
            
            subgraph InnerScope["innerFunction Scope (Xona)"]
                innerVar["let innerVar = 'Inner'"]
                shadowVar["let outerVar = 'Shadowed' (Shadowing)"]
            end
        end
    end
    
    %% O'qish huquqi (Scope Chain)
    InnerScope -->|1. Lokal topilmasa, ota qamrovdan izlaydi| OuterScope
    OuterScope -->|2. U yerda ham bo'lmasa, globaldan izlaydi| GlobalScope
    
    %% Izolyatsiya to'siqlari
    GlobalScope -.->|Tashqaridan ichkariga kirish TAQIQLANADI| OuterScope
    OuterScope -.->|Tashqaridan ichkariga kirish TAQIQLANADI| InnerScope
\`\`\`

---

## 7. 📝 12 ta Mini Test

Ushbu darsning yakunida bilimlarni mustahkamlash uchun 12 ta multiple-choice interaktiv testlar mavjud bo'lib, ular JSON faylida joylashtirilgan.

---

## 8. 🎯 Real Project Case Study

### Widget / Uchinchi tomon kutubxonalari uchun scope izolyatsiyasi
Eski JS loyihalarda ES modullar yo'q paytda, bir nechta kutubxonalar global scope-dagi o'zgaruvchilarni to'qnashtirib yubormasligi uchun **IIFE (Immediately Invoked Function Expression)** yordamida funksiya qamrovi yaratilgan.

\`\`\`javascript
// Analytics widget kodi boshqa skriptlardan alohida xavfsiz qamrovda ishlaydi:
(function() {
  // Bu o'zgaruvchilar faqat ushbu IIFE ichida mavjud
  let requestCounter = 0;
  const apiKey = "ANALYTICS_KEY_999";
  
  function sendLog(data) {
    requestCounter++;
    console.log(\`Log yuborildi. Jami: \${requestCounter}\`);
  }
  
  // Faqat kerakli metodni globalga xavfsiz chiqaramiz:
  window.myAnalytics = {
    trackEvent: function(event) {
      sendLog(event);
    }
  };
})();

// Global scope-da requestCounter yoki apiKey ga to'g'ridan-to'g'ri kirib bo'lmaydi:
console.log(window.requestCounter); // undefined
\`\`\`

---

## 9. 🚀 Performance va Optimization

### 1. Funksiya ichida funksiya yaratishdan ehtiyot bo'ling (Loop ichida)
Agar sikl (loop) ichida doimiy ravishda funksiya e'lon qilinsa, har safar yangi funksiya obyekti va yangi qamrov yaratiladi. Bu xotira sarfini ko'paytiradi.
#### Yomon performance:
\`\`\`javascript
for (let i = 0; i < 1000; i++) {
  // Har safar yangi funksiya obyekti yaratiladi
  const process = (num) => num * 2;
  console.log(process(i));
}
\`\`\`
#### Yaxshi performance:
\`\`\`javascript
const process = (num) => num * 2; // Funksiya bir marta tashqarida yaratiladi
for (let i = 0; i < 1000; i++) {
  console.log(process(i));
}
\`\`\`

---

## 10. 📌 Cheat Sheet

| Qamrov (Scope) turi | E'lon qilingan joyi | Tashqaridan kirish | Ta'rifi |
| :--- | :--- | :--- | :--- |
| **Global Scope** | Funksiyalardan tashqarida | Ha (hamma joydan) | Eng yuqori darajadagi umumiy scope |
| **Function Scope** | Funksiya bloki \`{}\` ichida | Yo'q | Faqat funksiya ichidagilar kira oladi |
| **Argument Isolation** | Funksiya parametrlari | Yo'q | Har bir chaqiruv uchun mustaqil argumentlar |
| **Shadowing** | Ichki qamrovda e'lon | Yo'q | Bir xil nomli tashqi o'zgaruvchini to'sib qo'yish |
`,
  exercises: [
    {
      id: 1,
      title: "Scope mashqi",
      instruction: "Funksiya ichida 'msg' o'zgaruvchisini yarating va uni faqat funksiya ichida chiqaring.",
      startingCode: "function show() {\n  // Bu yerda yarating\n}\nshow();",
      hint: "let msg = 'Salom';",
      test: "if (code.includes('msg')) return null; return 'O\\'zgaruvchi yaratilmadi!';"
    },
    {
      id: 2,
      title: "Variable Shadowing",
      instruction: "Global doirada let user = 'Ali' bor. greet() funksiyasi ichida lokal let user = 'Vali' yarating va uni konsolga chiqaring. Global user o'zgarmasligi kerak.",
      startingCode: "let user = 'Ali';\nfunction greet() {\n  // Bu yerda local user yarating va console.log qiling\n}\ngreet();",
      hint: "let user = 'Vali';\nconsole.log(user);",
      test: "if (logs.includes('Vali') && code.includes('let user =') && code.match(/let\\s+user\\s*=\\s*['\"]Vali['\"]/)) return null; return 'greet funksiyasi ichida let user = \"Vali\" yaratib, log qiling!';"
    },
    {
      id: 3,
      title: "Lokal var o'zgaruvchisi",
      instruction: "Funksiya ichidagi var o'zgaruvchisi ham tashqaridan ko'rinmaydi. testVar() funksiyasi ichida var secret = 99 yarating va konsolga chiqaring. Tashqarida chaqirmang.",
      startingCode: "function testVar() {\n  // var secret yarating va console.log(secret) qiling\n}\ntestVar();",
      hint: "var secret = 99;\nconsole.log(secret);",
      test: "if (code.includes('var secret') && logs.includes(99)) return null; return 'var secret = 99 yarating va console.log qiling!';"
    },
    {
      id: 4,
      title: "Kalit so'zsiz o'zgaruvchi (leak)",
      instruction: "Funksiya ichida kalit so'zsiz (let/const/var siz) leakedGlobal = 'leaked' yozing. Uni chaqirgandan keyin globalda qolishini ko'rish uchun tashqarida console.log(leakedGlobal) qiling.",
      startingCode: "function leak() {\n  // leakedGlobal = 'leaked' yozing\n}\nleak();\n// globalda leakedGlobal ni log qiling",
      hint: "leakedGlobal = 'leaked';\nconsole.log(leakedGlobal);",
      test: "if (logs.includes('leaked') && !code.includes('let leakedGlobal') && !code.includes('var leakedGlobal') && !code.includes('const leakedGlobal')) return null; return 'leakedGlobal-ni kalit so\\'zsiz yarating va tashqarida log qiling!';"
    },
    {
      id: 5,
      title: "Parametr doirasi (Parameter Scope)",
      instruction: "Funksiya parametrlari ham lokal o'zgaruvchi hisoblanadi. doubleNum(num) funksiyasi berilgan parametrni 2 ga ko'paytirib konsolga chiqarsin. Tashqaridan doubleNum(5) qilib chaqiring.",
      startingCode: "function doubleNum(num) {\n  // num parametridan foydalanib uni 2 ga ko'paytirib log qiling\n}\n// Chaqiring",
      hint: "function doubleNum(num) { console.log(num * 2); }\ndoubleNum(5);",
      test: "if (logs.includes(10) && code.includes('doubleNum(5)')) return null; return 'doubleNum funksiyasini yozib, 5 qiymati bilan chaqiring!';"
    },
    {
      id: 6,
      title: "Ichma-ich funksiyalar (Nested Scope)",
      instruction: "outer() funksiyasi ichida let x = 10 bor. Uning ichida inner() funksiyasini yarating va u x ni konsolga chiqarsin. outer oxirida inner() ni chaqiring.",
      startingCode: "function outer() {\n  let x = 10;\n  // inner funksiyasini yarating va uni chaqiring\n}\nouter();",
      hint: "function inner() { console.log(x); }\ninner();",
      test: "if (logs.includes(10) && code.includes('inner') && code.includes('outer')) return null; return 'inner funksiyasi outer ichidagi x-ni log qilishi kerak!';"
    },
    {
      id: 7,
      title: "Lokal o'zgaruvchini yangilash",
      instruction: "counter() funksiyasi ichida let count = 0 yarating. Ichki increment() funksiyasi uni 1 ga oshirsin. counter ichida increment() ni 2 marta chaqiring va yakuniy count ni log qiling.",
      startingCode: "function counter() {\n  let count = 0;\n  // increment funksiyasini yozib 2 marta chaqiring va count-ni log qiling\n}\ncounter();",
      hint: "function increment() { count++; }\nincrement(); increment(); console.log(count);",
      test: "if (logs.includes(2) && code.includes('count++')) return null; return 'increment funksiyasi orqali count-ni 2 marta oshiring!';"
    },
    {
      id: 8,
      title: "Scope zanjiri (Scope Chain)",
      instruction: "Globalda let a = 1. level1() ichida let b = 2. level2() ichida let c = 3 bo'lsin. level2 ichida console.log(a + b + c) qiling. level1 ichida level2() chaqirilsin, globalda esa level1() chaqirilsin.",
      startingCode: "let a = 1;\nfunction level1() {\n  let b = 2;\n  // level2 ni yozing va chaqiring\n}\nlevel1();",
      hint: "function level2() { let c = 3; console.log(a + b + c); }\nlevel2();",
      test: "if (logs.includes(6) && code.includes('level2')) return null; return 'level2 ichida a + b + c yig\\'indisini (6) log qiling!';"
    },
    {
      id: 9,
      title: "Shadowing parametrlari",
      instruction: "Global let name = 'Botir' bor. greet(name) funksiyasida parametr sifatida name qabul qilinadi. greet('Sardor') deb chaqirilganda konsolga name ni chiqaring (Sardor chiqishi kerak).",
      startingCode: "let name = 'Botir';\nfunction greet(name) {\n  // name-ni log qiling\n}\ngreet('Sardor');",
      hint: "function greet(name) { console.log(name); }",
      test: "if (logs.includes('Sardor') && !logs.includes('Botir')) return null; return 'greet funksiyasi parametr name-ni chop etishi kerak!';"
    },
    {
      id: 10,
      title: "Lokal const massivi",
      instruction: "manageList() funksiyasi ichida const items = [] yarating. Uni ichki funksiya orqali to'ldirib, yakuniy natijani log qiling.",
      startingCode: "function manageList() {\n  const items = [];\n  function add(val) {\n    // items-ga val qo'shing\n  }\n  add('Olma');\n  add('Anor');\n  console.log(items);\n}\nmanageList();",
      hint: "function add(val) { items.push(val); }",
      test: "if (logs.includes('Olma') && logs.includes('Anor') && code.includes('push')) return null; return 'items massiviga push orqali elementlarni qo\\'shing!';"
    },
    {
      id: 11,
      title: "IIFE funksiya scope",
      instruction: "IIFE yordamida funksiya scope yarating va ichida let iifeVar = 'IIFE' e'lon qilib log qiling.",
      startingCode: "// IIFE yozing (function() { ... })()",
      hint: "(function() { let iifeVar = 'IIFE'; console.log(iifeVar); })();",
      test: "if (logs.includes('IIFE') && code.match(/\\(\\s*function/)) return null; return 'IIFE shaklida funksiya scope yarating!';"
    },
    {
      id: 12,
      title: "Recursion Scope",
      instruction: "factorial(n) funksiyasini yozing, u n-ning faktorialini hisoblasin va qaytarsin. console.log(factorial(5)) (120 bo'lishi kerak).",
      startingCode: "function factorial(n) {\n  // n-faktorialni rekursiv hisoblang\n}\nconsole.log(factorial(5));",
      hint: "if (n <= 1) return 1; return n * factorial(n - 1);",
      test: "if (logs.includes(120) && code.includes('factorial')) return null; return 'Faktorial hisoblaydigan rekursiv funksiyani yozing!';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da funksiya qamrovi (Function Scope) nima?",
    "options": [
      "Funksiya ichida e'lon qilingan o'zgaruvchilar faqat o'sha funksiya ichida va undan ichki bo'lgan qamrovlarda mavjud bo'lishi va tashqaridan ularga kirib bo'lmasligi",
      "Faqat `const` va `let` bilan yaratilgan va butun blokdan tashqarida ishlaydigan o'zgaruvchilar",
      "Brauzer yoki server o'chirilguncha xotirada saqlanadigan global o'zgaruvchilar",
      "Dasturdagi barcha funksiyalar bir-birining o'zgaruvchilarini erkin o'qishi"
    ],
    "correctAnswer": 0,
    "explanation": "Funksiya qamrovi — funksiya ichida yaratilgan har qanday o'zgaruvchi (var, let, const) va parametrlarning faqat shu funksiya ichida ishlashi hamda tashqaridan ko'rinmasligini anglatadi."
  },
  {
    "id": 2,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nfunction testScope() {\n  var message = \"Salom\";\n}\ntestScope();\nconsole.log(message);\n```",
    "options": [
      "\"Salom\"",
      "ReferenceError: message is not defined",
      "undefined",
      "null"
    ],
    "correctAnswer": 1,
    "explanation": "`message` o'zgaruvchisi `testScope` funksiyasining lokal qamrovida yaratilgan. Uni funksiyadan tashqarida (global scope-da) chaqirish ReferenceError xatoligini beradi."
  },
  {
    "id": 3,
    "question": "Variable Shadowing (O'zgaruvchini yashirish) deganda nima tushuniladi?",
    "options": [
      "Global o'zgaruvchi nomi bilan bir xil bo'lgan o'zgaruvchini funksiya yoki blok ichida qaytadan e'lon qilish va u orqali o'sha hududda global o'zgaruvchini 'yopib qo'yish'",
      "O'zgaruvchilarni butunlay o'chirib tashlash va xotiradan joy bo'shatish",
      "O'zgaruvchilarni faqat `setTimeout` ichida ishlatish",
      "Barcha lokal o'zgaruvchilarni global obyektdan yashirib qo'yish"
    ],
    "correctAnswer": 0,
    "explanation": "Variable Shadowing — funksiya yoki blok ichidagi o'zgaruvchi nomi ota qamrovdagi o'zgaruvchi nomi bilan bir xil bo'lganda, ichki qamrovdagi o'zgaruvchi ustunlikka ega bo'lib, ota qamrovdagisini vaqtincha yopib turishidir."
  },
  {
    "id": 4,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nlet name = \"Anvar\";\nfunction changeName() {\n  let name = \"Dilshod\";\n}\nchangeName();\nconsole.log(name);\n```",
    "options": [
      "\"Dilshod\"",
      "\"Anvar\"",
      "ReferenceError: name is not defined",
      "\"Global\""
    ],
    "correctAnswer": 1,
    "explanation": "`changeName` funksiyasi ichida `let name` orqali yangi lokal o'zgaruvchi yaratilgan (shadowing). U global `name` qiymatiga ta'sir qilmaydi, shuning uchun global scope-da `name` hanuz \"Anvar\" bo'lib qoladi."
  },
  {
    "id": 5,
    "question": "Funksiya parametrlari (argumentlari) qaysi qamrovga (scope) tegishli bo'ladi?",
    "options": [
      "Global qamrovga, chunki ularni funksiyadan tashqarida ham o'zgartirish mumkin",
      "Faqat o'sha funksiyaning lokal qamroviga, ya'ni ulardan faqat funksiya ichida foydalanish mumkin",
      "Block scope-ga, faqat `if` sharti bajarilganda yaratiladi",
      "Ota qamrovga, chunki ular tashqaridan uzatiladi"
    ],
    "correctAnswer": 1,
    "explanation": "Funksiyaning argumentlari va parametrlari faqatgina shu funksiya ichida ishlovchi lokal o'zgaruvchilar hisoblanadi va ulardan tashqarida foydalanib bo'lmaydi."
  },
  {
    "id": 6,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nfunction outer() {\n  let count = 10;\n  function inner() {\n    console.log(count);\n  }\n  inner();\n}\nouter();\n```",
    "options": [
      "10",
      "ReferenceError: count is not defined",
      "undefined",
      "null"
    ],
    "correctAnswer": 0,
    "explanation": "Ichki funksiya (`inner`) Lexical Scope qoidasiga ko'ra o'zining tashqarisidagi funksiya (`outer`) qamrovidagi o'zgaruvchilarga erkin kira oladi."
  },
  {
    "id": 7,
    "question": "JavaScript-da Scope Chain (Qamrovlar zanjiri) deganda nima tushuniladi?",
    "options": [
      "Brauzerda barcha skriptlarni yuklash ketma-ketligi",
      "O'zgaruvchi qidirilayotganda joriy qamrovdan boshlab, to global qamrovgacha bosqichma-bosqich tashqariga qarab qidirilish jarayoni",
      "Call stack-dagi funksiyalarning bir-birini chaqirish tartibi",
      "Xatoliklarni `try-catch` bloklari yordamida uzatish zanjiri"
    ],
    "correctAnswer": 1,
    "explanation": "Scope Chain — o'zgaruvchini qidirishda JS dvigatelining lokal qamrovdan boshlab, ota qamrovlarga o'tib, eng oxirida global qamrovdan qidirish zanjiridir."
  },
  {
    "id": 8,
    "question": "Quyidagi kodda nima sodir bo'ladi? (Strict mode yoqilmagan deb hisoblang)\n```javascript\nfunction setScore() {\n  score = 100;\n}\nsetScore();\nconsole.log(score);\n```",
    "options": [
      "ReferenceError xatosi chiqadi",
      "Konsolga 100 chiqadi, chunki kalit so'zsiz e'lon qilingan score o'zgaruvchisi avtomatik globalga aylanib qoladi",
      "Konsolga undefined chiqadi",
      "Dastur cheksiz siklga tushadi"
    ],
    "correctAnswer": 1,
    "explanation": "Agar qat'iy rejim ('use strict') bo'lmasa, funksiya ichida kalit so'zsiz (var, let, const-siz) o'zgaruvchiga qiymat berish uni global obyektga (window yoki global) xossa sifatida qo'shib qo'yadi. Bu global scope ifloslanishi deb ataladi."
  },
  {
    "id": 9,
    "question": "Qat'iy rejimda (`\"use strict\";`) quyidagi kod nima qaytaradi?\n```javascript\n\"use strict\";\nfunction setScore() {\n  score = 100;\n}\nsetScore();\n```",
    "options": [
      "Xatosiz bajariladi va score global bo'lib qoladi",
      "ReferenceError: score is not defined xatoligini beradi",
      "TypeError: score is read-only xatoligini beradi",
      "undefined"
    ],
    "correctAnswer": 1,
    "explanation": "Qat'iy rejimda (use strict) e'lon qilinmagan o'zgaruvchiga qiymat yuklash taqiqlanadi va ReferenceError xatoligi yuz beradi."
  },
  {
    "id": 10,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nlet x = 5;\nfunction shadow(x) {\n  x = x + 2;\n}\nshadow(x);\nconsole.log(x);\n```",
    "options": [
      "7",
      "5",
      "undefined",
      "ReferenceError"
    ],
    "correctAnswer": 1,
    "explanation": "Funksiya parametri `x` global `x` ni shadow qiladi va funksiya ichidagi `x = x + 2` faqat lokal parametrning qiymatini o'zgartiradi. Global `x` ning qiymati 5 ligicha qoladi."
  },
  {
    "id": 11,
    "question": "Block Scope (`let`/`const`) va Function Scope (`var`) o'rtasidagi asosiy farq nima?",
    "options": [
      "`var` bilan e'lon qilingan o'zgaruvchilar bloklar (if, for) ichida ham blokdan tashqarida ko'rinadi (lekin funksiya ichida cheklanadi), `let`/`const` esa faqat blok ichida ishlaydi",
      "Hech qanday farqi yo'q, barchasi global scope-da ishlaydi",
      "`var` faqat brauzerda ishlaydi, `let` esa faqat Node.js-da",
      "`let` funksiya ichida ishlamaydi, `var` esa ishlaydi"
    ],
    "correctAnswer": 0,
    "explanation": "`var` funksiya qamroviga ega, ya'ni funksiya ichida cheklanadi, ammo `if` yoki `for` kabi bloklar ichida cheklanmaydi. `let` va `const` esa blok qamroviga (block scope) ega bo'lib, har qanday `{}` qavslar ichida lokal bo'ladi."
  },
  {
    "id": 12,
    "question": "Quyidagi kod bajarilganda konsolga nima yoziladi?\n```javascript\nfunction main() {\n  if (true) {\n    var a = \"varVariable\";\n    let b = \"letVariable\";\n  }\n  console.log(a);\n  console.log(b);\n}\nmain();\n```",
    "options": [
      "Avval \"varVariable\", keyin \"letVariable\" chiqadi",
      "\"varVariable\" chiqadi, so'ng ReferenceError: b is not defined xatosi chiqadi",
      "ReferenceError: a is not defined xatosi chiqadi",
      "\"letVariable\" chiqadi, so'ng \"varVariable\" chiqadi"
    ],
    "correctAnswer": 1,
    "explanation": "`var` funksiya qamroviga ega bo'lgani uchun `if` blokidan tashqarida ham, lekin `main()` ichida mavjud bo'ladi va chop etiladi. `let` esa block-scoped bo'lgani uchun faqat `if` bloki ichida ishlaydi, shuning uchun block-dan tashqarida unga murojaat qilish ReferenceError xatoligini beradi."
  }
]

};
