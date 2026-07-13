export const thisKeyword = {
  id: "thisKeyword",
  title: "This Kalit So'zi: JavaScriptdagi 'Men'",
  language: "javascript",
  theory: `# This Kalit So'zi (Context)

JavaScript tilida eng ko'p asabga tegadigan, tushunishga qiyin va suhbatlarda eng ko'p so'raladigan mavzulardan biri — bu **\`this\`** kalit so'zidir. Ammo havotir olmang, biz buni noldan boshlab o'rganamiz!

## 🎩 Hayotiy O'xshatish (Analogy)

\`this\` so'zini inson tilidagi **"Men"** (yoki "Mening") so'ziga o'xshatish mumkin.

Tasavvur qiling, ikki do'st suhbatlashyapti:
- **Ali** deydi: "Men och qoldim." (Bu yerda "Men" = Ali)
- **Vali** deydi: "Men ham och qoldim." (Bu yerda "Men" = Vali)

E'tibor berdingizmi? Ikkalasi ham aynan bitta "Men" so'zini ishlatyapti, lekin uning ma'nosi (konteksti) gapirayotgan odamga qarab o'zgaradi. 

JavaScriptda ham xuddi shunday: **\`this\` — funksiya yozilgan joyiga emas, u qanday chaqirilayotganiga qarab kimni nazarda tutayotgani o'zgaradi.** Odatda \`this\` — funksiyani kim chaqirgan bo'lsa o'sha obyektga aylanadi.

---

## 🏗 This Qanday Ishlaydi? (Noldan boshlaymiz)

JavaScriptda \`this\` qiymati qanday holatda chaqirilganiga ko'ra turlicha bo'ladi.

### 1. Obyekt ichidagi Metodda (Method Context)
Eng ko'p ishlatiladigan holat: Agar funksiya obyektning ichida yozilgan bo'lsa va u orqali chaqirilsa, \`this\` o'sha obyektning o'ziga teng bo'ladi. Ya'ni nuqtadan oldingi narsaga!

\`\`\`javascript
let user = {
  name: "Ali",
  sayHi: function() {
    alert("Salom, mening ismim " + this.name);
  }
};

user.sayHi(); // "Salom, mening ismim Ali"
\`\`\`
Bu yerda \`user.sayHi()\` deb chaqirdik. Nuqtadan oldin \`user\` turibdi. Demak, \`this = user\`.

### ❌ YOMON: This yo'qolishi (Losing this)
Agar biz funksiyani obyektdan uzib olib, oddiy o'zgaruvchiga tenglasak, \`this\` yo'qoladi!

\`\`\`javascript
let user = {
  name: "Vali",
  sayHi: function() {
    console.log("Salom, " + this.name);
  }
};

let myFunction = user.sayHi; // Funksiyani uzib oldik
myFunction(); // undefined! Chunki nuqtasi yo'q, this = window/undefined.
\`\`\`

✅ **YAXSHI: Call, Apply yoki Bind ishlating**
Yo'qolgan \`this\` ni qaytarish uchun \`.bind()\` orqali uni kuch bilan bog'lashimiz mumkin:
\`\`\`javascript
let boundFunction = user.sayHi.bind(user);
boundFunction(); // Salom, Vali!
\`\`\`

### 2. Oddiy Funksiyada (Regular Function)
Agar funksiya obyektga tegishli bo'lmasa, uni oddiygina \`sayHi()\` deb chaqirsak, \`this\` qanday bo'ladi?
- Qat'iy bo'lmagan (non-strict) rejimda: \`this\` global obyektga (brauzerda \`window\`) teng bo'ladi.
- Qat'iy (\`"use strict"\`) rejimda: \`this\` **undefined** bo'ladi. Bu JS xatolarining oldini olish uchun ataylab shunday qilingan.

\`\`\`javascript
"use strict";
function showThis() {
  console.log(this);
}
showThis(); // undefined
\`\`\`

### 3. Arrow Function'da (Yo'naltiruvchi Funksiya)
Eng zo'r qismi: **Arrow function (=>) larning o'zining \`this\` i yo'q!** 
Ular "Men" degan tushunchani bilishmaydi. Agar ularning ichida \`this\` ishlatsangiz, u tashqaridagi odamning "Men"ini (ya'ni o'zidan tashqaridagi \`this\` ni) olib ishlatadi. Bu Lexical Scoping deyiladi.

\`\`\`javascript
let group = {
  title: "Guruh 1",
  students: ["Ali", "Vali"],
  showList() {
    this.students.forEach(student => {
      // Arrow function o'zining this'ini yaratmaydi,
      // shuning uchun u showList'ning this'ini (group'ni) ishlatadi.
      console.log(this.title + ": " + student);
    });
  }
};

group.showList();
// Guruh 1: Ali
// Guruh 1: Vali
\`\`\`
Agar \`forEach\` ichida oddiy funksiya (\`function() {}\`) yozganimizda edi, uning \`this\` i \`undefined\` bo'lib qolar va xatolik berar edi! Shuning uchun array metodlarida doim Arrow Function ishlating.

---

## Mermaid Diagramma (This yo'nalishlari)

\`\`\`mermaid
flowchart TD
    Start((This Kalit So'zi))
    
    Start --> A[Nuqtadan oldin chaqirildimi?]
    A -- Ha (user.sayHi) --> B{This = Nuqtadan oldingi obyekt}
    
    A -- Yo'q (sayHi) --> C[Arrow Functionmi?]
    C -- Ha --> D{This = Tashqaridagi this ni oladi}
    C -- Yo'q --> E{This = window yoxud undefined}
\`\`\`

---

## 🎙 Intervyu savollari

**1. \`this\` ning qiymati JavaScriptda qachon hal bo'ladi?**
**Javob:** \`this\` ning qiymati funksiya e'lon qilingan vaqtda emas, balki funksiya chaqirilgan vaqtda (runtime) hal qilinadi. U funksiyani kim chaqirganiga qarab o'zgarib turadi. Faqatgina Arrow Functionlar bundan mustasno (ular yozilgan joyiga, ya'ni leksik muhitga bog'lanadi).

**2. Obyekt metodini oddiy o'zgaruvchiga olib chaqirganda nima uchun \`this\` yo'qoladi va qanday tuzatamiz?**
**Javob:** Chunki oddiy o'zgaruvchidan chaqirilganda funksiya oldida nuqta bo'lmaydi va obyektsiz oddiy funksiya sifatida chaqiriladi. Oqibatda \`this\` global obyektga (window) yoki \`undefined\` ga tushib qoladi. Buni tuzatish uchun \`.bind(obyekt)\` ishlatib funksiyaga kerakli kontekstni bog'lashimiz (hard-binding) mumkin yoki arrow function ishlatish kerak.

**3. Arrow Function nima uchun event listener yoki metod sifatida ishlatilganda xatolikka olib kelishi mumkin?**
**Javob:** Chunki Arrow Function o'zining \`this\` iga ega emas. Agar obyekt ob'ekti metodini arrow function qilib yozsak, u holda obyektning ichiga emas, balki global muhitga (window ga) bog'lanib qoladi va natijada ob'ekt property larini taniy olmay \`undefined\` qaytaradi.`,
  exercises: [
    {
      id: 1,
      title: "Obyekt va This",
      instruction: "Bir 'car' nomli obyekt yarating. Uning 'brand' (masalan: 'BMW') degan kaliti va 'getBrand' nomli metodi bo'lsin. Metod 'this.brand' orqali brendni qaytarsin.",
      startingCode: "let car = {\n  brand: 'BMW',\n  // getBrand metodini yozing\n};",
      hint: "getBrand: function() { return this.brand; } yoki getBrand() { return this.brand; } yozing.",
      test: "if(!car || typeof car.getBrand !== 'function' || car.getBrand() !== 'BMW') throw new Error('Metod xato yozilgan yoki this dan foydalanilmagan');"
    },
    {
      id: 2,
      title: "This ning yo'qolishi",
      instruction: "'user' obyektida 'name: Olim' va 'getName' metodi bor. Bu metodni uzib olib, unga 'call' metodi orqali 'user' kontekstini bering va chaqirib 'res' ga tenglang.",
      startingCode: "let user = { name: 'Olim', getName() { return this.name; } };\nlet func = user.getName;\n// func ni chaqirib 'res' ga tenglang (call ishlating)\n",
      hint: "let res = func.call(user);",
      test: "if(typeof res === 'undefined' || res !== 'Olim') throw new Error('res ga call qilinmagan');"
    },
    {
      id: 3,
      title: "This va Arrow Function",
      instruction: "Sizga 'robot' obyekti berilgan. Unda 'name' bor. Ammo 'greet' metodi ichidagi setTimeout da oddiy funksiya ishlatilgani uchun xato. Uni Arrow Function (=>) ga aylantirib to'g'irlang, to 'result' ga robot nomi tushsin.",
      startingCode: "let result = '';\nlet robot = {\n  name: 'Robo',\n  greet() {\n    setTimeout(function() {\n      result = this.name;\n    }, 10);\n  }\n};\nrobot.greet();",
      hint: "function() ni () => qilib o'zgartiring.",
      test: "const ast = arguments[0]; if(!ast.includes('() =>') && !ast.includes('=>')) throw new Error('Arrow function ishlatilmagan');"
    },
    {
      id: 4,
      title: "Bind ishlating",
      instruction: "'dog' obyekti (name: 'Rex') berilgan. Bizda global 'bark' funksiyasi bor (this.name + ' barks' qaytaradi). 'bark' ni 'dog' ga bind qilib, natijani 'boundBark' o'zgaruvchisiga oling va uni ishga tushirib 'res' ga saqlang.",
      startingCode: "let dog = { name: 'Rex' };\nfunction bark() { return this.name + ' barks'; }\n// boundBark ni yarating va chaqirib res ga tenglang",
      hint: "let boundBark = bark.bind(dog); let res = boundBark();",
      test: "if(typeof res === 'undefined' || res !== 'Rex barks') throw new Error('bind xato ishlangan');"
    },
    {
      id: 5,
      title: "Apply yordamida ishlash",
      instruction: "Math.max ga massiv ichidan eng kattasini topishni o'rgating. apply ishlating: Math.max.apply(null, arr). Natijani 'max' ga saqlang.",
      startingCode: "let arr = [1, 5, 2];\n// max ni e'lon qiling",
      hint: "let max = Math.max.apply(null, arr);",
      test: "if(typeof max === 'undefined' || max !== 5) throw new Error('apply ishlashida xatolik');"
    },
    {
      id: 6,
      title: "Nuqtadan oldingi obyekt",
      instruction: "'player.score' = 10, 'player.addScore()' deb metod yozing, u o'zining score sini 1 ga oshirsin. Funksiyani oxirida 'player.addScore()' deb chaqiring.",
      startingCode: "let player = {\n  score: 10,\n  // addScore metodini yozing\n};\n",
      hint: "addScore() { this.score++; }",
      test: "if(!player || player.score !== 11) throw new Error('score oshirilmadi yoki this ishlashida xato');"
    },
    {
      id: 7,
      title: "Bir xil metod boshqa obyektda",
      instruction: "'sayHello' funksiyasi e'lon qilingan. Ikkita obyekt: 'obj1' (name:'A') va 'obj2' (name:'B'). 'sayHello' ni ikkala obyekt ichiga kalit qilib (speak) qo'ying va 'res1 = obj1.speak()', 'res2 = obj2.speak()' qiling.",
      startingCode: "function sayHello() { return this.name; }\nlet obj1 = { name: 'A', speak: sayHello };\nlet obj2 = { name: 'B', speak: sayHello };\n// res1 va res2 yarating",
      hint: "let res1 = obj1.speak(); let res2 = obj2.speak();",
      test: "if(typeof res1 === 'undefined' || typeof res2 === 'undefined' || res1 !== 'A' || res2 !== 'B') throw new Error('Obyekt thislari adashib ketdi');"
    },
    {
      id: 8,
      title: "Arrow metod xatosi",
      instruction: "Quyidagi obyekt metodini arrow funksiya qilib yozilgan. U 'undefined' qaytaradi. Buni tuzatib, oddiy funksiya holatiga o'tkazing.",
      startingCode: "let box = {\n  color: 'blue',\n  getColor: () => { return this.color; }\n};\n// getColor ni to'g'irlang",
      hint: "getColor() { return this.color; } qilib yozing.",
      test: "if(box.getColor() !== 'blue') throw new Error('Arrow function bilan this ishlamaydi, uni oddiy funksiyaga o\'tkazing');"
    },
    {
      id: 9,
      title: "Metod zanjirlari (Chaining)",
      instruction: "Ladder (narvon) obyektida 'up()' va 'down()' va 'showStep()' metodlari bor. Ular zanjirli tarzda 'ladder.up().up().showStep()' ishlashi uchun har bir metod oxirida 'this' ni qaytarish (return this;) kerak.",
      startingCode: "let ladder = {\n  step: 0,\n  up() { this.step++; /* nimanidir qaytarish kerak */ },\n  down() { this.step--; /* nimanidir qaytarish kerak */ },\n  showStep() { return this.step; }\n};",
      hint: "up va down metodlari ichida oxirida 'return this;' yozing.",
      test: "if(ladder.up().up().down().showStep() !== 1) throw new Error('return this yozilmagan');"
    },
    {
      id: 10,
      title: "This va Class konstruktorlari",
      instruction: "Person nomli Class bor. Constructor ichida ismni qabul qilib, uni 'this.name' ga tenglashtiring. Keyin 'let p = new Person(\\'Aziz\\');' yarating.",
      startingCode: "class Person {\n  constructor(name) {\n    // ismni this.name ga bering\n  }\n}\n// p obyekti yarating",
      hint: "this.name = name; yozing, va let p = new Person('Aziz');",
      test: "if(typeof p === 'undefined' || p.name !== 'Aziz') throw new Error('Class constructor da this ishlatishda xato');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScriptda 'this' kalit so'zi umuman olganda nimani bildiradi?",
      options: [
        "Joriy HTML faylini",
        "Eng yaqin if/else blokini",
        "Dastur ishlayotgan qattiq disk joylashuvini",
        "Joriy funksiya qaysi kontekst (obyekt) tomonidan chaqirilganligini"
      ],
      correctAnswer: 3,
      explanation: "This so'zi funksiya kim tomonidan chaqirilayotgan bo'lsa (kontekst) shunga teng bo'ladi."
    },
    {
      id: 2,
      question: "user.sayHi() deb chaqirilganda, sayHi funksiyasi ichida 'this' nimaga teng bo'ladi?",
      options: [
        "window obyekti",
        "user obyekti",
        "sayHi funksiyasiga",
        "undefined"
      ],
      correctAnswer: 1,
      explanation: "Nuqtadan oldin user bo'lgani uchun this=user hisoblanadi."
    },
    {
      id: 3,
      question: "Agar sayHi funksiyasini hech qanday obyektsiz oddiy 'sayHi()' deb chaqirsak ('use strict' yozilmagan), 'this' nima bo'ladi?",
      options: [
        "null",
        "undefined",
        "Global obyekt (window)",
        "Xatolik (Error) kelib chiqadi"
      ],
      correctAnswer: 2,
      explanation: "Strict mode yo'q holatda brauzer global window ob'ektini this qilib beradi."
    },
    {
      id: 4,
      question: "Qat'iy ('use strict') rejimda oddiy funksiya ichida 'this' nimaga teng bo'ladi?",
      options: [
        "window",
        "undefined",
        "Error",
        "null"
      ],
      correctAnswer: 1,
      explanation: "Qat'iy rejimda tasodifan window xossalarini o'zgartirib yubormaslik uchun this undefined ga aylanadi."
    },
    {
      id: 5,
      question: "Arrow function (yo'naltiruvchi funksiya) ichida 'this' nimaga teng bo'ladi?",
      options: [
        "Doim window",
        "O'zini o'rab turgan eng yaqin oddiy funksiya yoki muhitning 'this' iga",
        "O'zining qattiq this obyektiga",
        "Doim undefined"
      ],
      correctAnswer: 1,
      explanation: "Arrow function larning o'zining thisi yo'q. Ular this ni tashqi scope dan olishadi (Lexical scoping)."
    },
    {
      id: 6,
      question: "Obyekt ichida metodni qanday funksiya sifatida e'lon qilish asosan *yomonroq* (xato) hisoblanadi (this jihatidan)?",
      options: [
        "Oddiy function(){} yordamida",
        "Qisqacha method() {} yordamida",
        "Arrow function () => {} yordamida",
        "Hech qaysi, hammasi to'g'ri ishlaydi"
      ],
      correctAnswer: 2,
      explanation: "Arrow function obyektdagi metod uchun yozilsa, uning thisi global bo'lib qoladi va this propertylarni topa olmaydi."
    },
    {
      id: 7,
      question: "Qaysi metod yordamida funksiyaga o'zimiz majburan 'this' ni bog'lab (hard-bind) qo'ya olamiz?",
      options: [
        "link()",
        "bind()",
        "join()",
        "attach()"
      ],
      correctAnswer: 1,
      explanation: "bind(obj) orqali biz yangi funksiya qaytaramiz va uning bu holatdagi this si majburan obj ga tushadi."
    },
    {
      id: 8,
      question: "call() va apply() ning bind() dan asosiy farqi nimada?",
      options: [
        "call/apply funksiyani o'sha zahoti chaqiradi, bind esa yangi funksiya yaratadi va kutadi",
        "Hamma hollarda uchalasi ham aynan bir xil ishlaydi",
        "bind brauzerni qotirib qo'yadi",
        "call faqat Node.js uchun"
      ],
      correctAnswer: 0,
      explanation: "bind faqat funksiyani bog'lab saqlab qoladi. call va apply esa bog'lash bilan birga uni zudlik bilan bajarib yuboradi."
    },
    {
      id: 9,
      question: "call() bilan apply() ning o'zaro farqi nimada?",
      options: [
        "Farqi yo'q, shunchaki sinonimlar",
        "call parametrlarini ketma-ket qabul qiladi (func.call(this, a, b)), apply esa massiv qabul qiladi (func.apply(this, [a, b]))",
        "apply tezroq ishlaydi",
        "call ob'ekt qaytaradi, apply array"
      ],
      correctAnswer: 1,
      explanation: "a - array, c - comma. Apply massiv oladi, Call ketma-ketlik."
    },
    {
      id: 10,
      question: "Metodlarni zanjir qilib ulab ishlash uchun (masalan obj.up().down().show()) metod nima qaytarishi kerak?",
      options: [
        "return true;",
        "return null;",
        "Hech narsa qaytarmasligi kerak",
        "return this;"
      ],
      correctAnswer: 3,
      explanation: "Agar obyekt o'zining reference'ini (this) qaytarsa, davomidan yana o'sha obyektning boshqa metodini yozish imkoni bo'ladi."
    },
    {
      id: 11,
      question: "Nega 'setTimeout' ichida oddiy funksiya ishlatsak obyekt metodlarida 'this' undefined yoki window bo'lib qoladi?",
      options: [
        "Chunki setTimeout uni Global scope da oddiy funksiya sifatida obyektdan uzib chaqiradi",
        "Chunki setTimeout eskirgan funksiya",
        "Brauzer virusdan himoya qiladi",
        "Chunki setTimeout 1000ms dan koproq kuttiradi"
      ],
      correctAnswer: 0,
      explanation: "setTimeout funksiyani xuddi func() ko'rinishida argument sifatida olib boshqa joydan chaqiradi, shuning uchun nuqtadan oldingi obyekt yo'qoladi."
    },
    {
      id: 12,
      question: "'this' ning qaysi til qoidasiga ko'ra hal bo'lishi asosan qanday ataladi?",
      options: [
        "Static scoping",
        "Dynamic scoping (Runtime context)",
        "Lexical error",
        "Compiler bind"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda this dinamik ravishda (runtime da) kim chaqirganiga qarab bog'lanadi."
    }
  ]
};
