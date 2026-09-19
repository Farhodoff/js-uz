export const thisKeyword = {
  id: "thisKeyword",
  title: "This Kalit So'zi: JavaScriptdagi 'Men'",
  language: "javascript",
  theory: `# This Kalit So'zi (Context)

JavaScript tilida eng ko'p asabga tegadigan, tushunishga qiyin va suhbatlarda eng ko'p so'raladigan mavzulardan biri — bu **\`this\`** kalit so'zidir. Ammo havotir olmang, biz buni chuqur o'rganamiz!

## Part 1: Beginner Analogy

Tasavvur qiling, "this" - bu JavaScript olamidagi xameleon. U qayerda ekanligiga qarab emas, qanday chaqirilganiga qarab o'zgaradi. Yana bir oddiy hayotiy misol: tasavvur qiling, siz do'stingiz bilan suhbatlashyapsiz. Agar siz "Men och qoldim" desangiz, "Men" o'zgaruvchisi sizga (ya'ni gapirayotgan odamga) ishora qiladi. Agar do'stingiz xuddi shu gapni "Men och qoldim" deb takrorlasa, endi "Men" so'zi do'stingizni bildiradi.

JavaScript-da ham xuddi shunday: funksiya qaysi ob'yekt tomonidan chaqirilsa, \`this\` o'sha ob'yektni bildiradi.

\`\`\`javascript
const person1 = {
  name: "Ali",
  sayHi() {
    console.log("Salom, men " + this.name);
  }
};

const person2 = {
  name: "Vali"
};

// Ali o'zi gapirmoqda:
person1.sayHi(); // "Salom, men Ali"

// Endi Vali Alining gapini olib gapirmoqda:
person2.sayHi = person1.sayHi;
person2.sayHi(); // "Salom, men Vali"
\`\`\`

Ko'rib turganingizdek, \`sayHi\` funksiyasi bitta bo'lsa ham, nuqtadan oldin kim tursa, \`this\` shunga teng bo'ldi.

## Part 2: Deep Dive (Under the hood, memory, V8 engine, performance)

Keling, kapot ostiga qaraymiz. V8 dvigateli \`this\` ni qanday ishlaydi?
JavaScript-da har qanday funksiya bajarilayotganda o'zining "Execution Context" (Bajarilish Konteksti) ni yaratadi. Bu kontekst 3 ta muhim qismdan iborat:
1. Variable Environment (O'zgaruvchilar muhiti)
2. Lexical Environment (Leksik muhit)
3. This Binding (This bog'lanishi)

\`This Binding\` ning aniqlanishi (Runtime) jarayonida yuz beradi, ya'ni kod ishlayotgan paytda. V8 bu qanday ekanligini Call Stack (Chaqiruvlar Steki) ni tekshirish orqali bilib oladi.

Agar obyekt metodi sifatida chaqirilsa (\`obj.method()\`), yashirin ravishda parametr sifatida \`obj\` yuboriladi va \`this\` ga o'zlashtiriladi. Xotira optimizatsiyasi (Memory Performance) nuqtai nazaridan qarasak, hamma obyektlar uchun alohida nusxa metod yaratish o'rniga, prototype ga bitta metodni saqlash va \`this\` yordamida qaysi obyekt unga murojaat qilayotganini aniqlash katta yutuqdir.

\`\`\`javascript
function User(name) {
  this.name = name;
}
User.prototype.sayHi = function() {
  console.log(this.name);
};
// Ikkala user uchun ham xotirada faqat bitta sayHi() saqlanadi
const u1 = new User("A");
const u2 = new User("B");
\`\`\`

## Part 3: Edge Cases and Senior Interview Questions

Senior darajasidagi suhbatlarda eng ko'p qo'yiladigan "tuzoq" savollar asosan \`this\` ning yo'qolishiga qaratiladi.

**Edge Case 1: this yo'qolishi**
\`\`\`javascript
const obj = {
  name: "Senior",
  getName() { return this.name; }
};
const func = obj.getName;
console.log(func()); // Qat'iy bo'lmagan rejimda window, qat'iyda undefined
\`\`\`
Tuzatish: \`bind()\` yordamida \`const func = obj.getName.bind(obj);\`

**Edge Case 2: setTimeout ichida yo'qolish**
Oddiy callback ichida \`this\` global ob'yekt bo'lib qoladi, chunki setTimeout uni ob'ektsiz chaqiradi.
Tuzatish: Arrow function (=>) ishlatish. Arrow function'lar o'zlarining \`this\` muhitini yaratmaydi, ular tashqaridagi muhitni (Lexical this) olishadi.

**Edge Case 3: Event Listeners**
DOM elementiga event qo'shganda, oddiy funksiya ishlatsak \`this\` bosilgan elementga teng bo'ladi. Lekin React kabi framework'larda yoki class ichida xato bo'ladi. U yerda ham arrow function yoki bind afzal ko'riladi.

## Mermaid Diagramma

\`\`\`mermaid
flowchart TD
    Start((This aniqlash))
    Start --> A[Funksiya qanday chaqirildi?]
    A -- new bilan --> B[Yangi obyektga ishora]
    A -- Nuqta orqali obj.func --> C[obj ga ishora]
    A -- bind call apply --> D[Biz ko'rsatgan obyekt]
    A -- Oddiy holatda --> E[Arrow functionmi?]
    E -- Ha --> F[Tashqaridagi This ni oladi]
    E -- Yo'q --> G[Window yoki Undefined]
\`\`\`
`,
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
      title: "Boshqa obyektga bog'lash",
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
      test: "if(box.getColor() !== 'blue') throw new Error('Arrow function bilan this ishlamaydi, uni oddiy funksiyaga o\\'tkazing');"
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
      title: "Class va This",
      instruction: "Person nomli Class bor. Constructor ichida ismni qabul qilib, uni 'this.name' ga tenglashtiring. Keyin 'let p = new Person(\"Aziz\");' yarating.",
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
      question: "Agar sayHi funksiyasini hech qanday obyektsiz oddiy 'sayHi()' deb chaqirsak ('use strict' yozilmagan bo'lsa), 'this' nima bo'ladi?",
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
        "call parametrlarini ketma-ket qabul qiladi, apply esa massiv qabul qiladi",
        "apply tezroq ishlaydi",
        "call ob'ekt qaytaradi, apply array"
      ],
      correctAnswer: 1,
      explanation: "a - array, c - comma. Apply massiv oladi, Call ketma-ketlik."
    },
    {
      id: 10,
      question: "Metodlarni zanjir qilib ulab ishlash uchun metod nima qaytarishi kerak?",
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
        "Dynamic binding (Runtime context)",
        "Lexical error",
        "Compiler bind"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda this dinamik ravishda (runtime da) kim chaqirganiga qarab bog'lanadi."
    }
  ]
};
