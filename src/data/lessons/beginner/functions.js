export const functions = {
  id: "functions",
  title: "Funksiya Turlari: Declaration, Expression, Arrow",
  language: "javascript",
  theory: `# Funksiyalar (Functions)

JavaScriptda funksiyalar kodning eng asosiy "ishchi kuchi" hisoblanadi. 

Tasavvur qiling, funksiya — bu **Retsept bo'yicha ishlaydigan Oshpaz Robot**. 
Siz unga masalliqlarni berasiz (parametrlar), u ichkarida nimanidir pishiradi (kod bajarilishi) va sizga tayyor ovqatni qaytaradi (return). 

Eng qizig'i, siz bu robotni turli yo'llar bilan sotib olishingiz yoki yasashingiz mumkin. Keling, JavaScriptdagi 3 xil "robot yasash" (funksiya yaratish) turlarini ko'rib chiqamiz.

---

## 1. Function Declaration (E'lon qilish)

Bu eng an'anaviy va klassik usuldir. Xuddi davlat ro'yxatidan o'tgan zavod kabi.

\`\`\`javascript
function pishir(ovqat) {
  return ovqat + " tayyor!";
}

console.log( pishir("Palov") ); // Palov tayyor!
\`\`\`

### Qoidasi: Hoisting (Yuqoriga ko'tarilish)
Bu funksiya turining o'ziga xosligi shundaki, uni koddagi **istalgan joydan** chaqirishingiz mumkin. Hatto uni yaratishdan oldin ham! JavaScript faylni o'qishni boshlaganda hamma "Function Declaration" larni yig'ib faylning eng tepasiga ko'tarib (hoist qilib) qo'yadi.

✅ **YAXSHI:**
\`\`\`javascript
sayHello(); // Dastur xato bermaydi, "Salom" chiqadi.

function sayHello() {
  console.log("Salom");
}
\`\`\`

---

## 2. Function Expression (Ifodali funksiya)

Bu usulda biz robotga nom bermaymiz, aksincha uni shunchaki bitta "qutiga" (o'zgaruvchiga) solib qo'yamiz. Bu oddiy qiymat kabi ishlaydi.

\`\`\`javascript
let pishir = function(ovqat) {
  return ovqat + " tayyor!";
}; // Oxirida nuqtali vergul (;) qo'yish tavsiya qilinadi
\`\`\`

### Qoidasi: Yo'q Hoisting!
Chunki bu o'zgaruvchi! Dastur o'zgaruvchilarning nomini bilishi mumkin, lekin kod o'sha qatorga kelmaguncha ichidagi funksiya yaratilmaydi.

❌ **YOMON:**
\`\`\`javascript
sayHi(); // ERROR! Cannot access 'sayHi' before initialization

let sayHi = function() {
  console.log("Salom");
};
\`\`\`

**Qachon ishlatamiz?** Agar funksiyani boshqa bir funksiyaga argument sifatida (callback) berish kerak bo'lsa yoki shartga qarab har xil funksiya yaratish kerak bo'lsa.

---

## 3. Arrow Function (Yo'naltiruvchi funksiya)

Bu ES6 (2015-yil) da chiqqan eng zamonaviy, eng qisqa va qulay usul. \`function\` degan uzun so'zni yozib o'tirmaymiz. O'rniga \`=>\` (o'q) belgisidan foydalanamiz.

\`\`\`javascript
const pishir = (ovqat) => {
  return ovqat + " tayyor!";
};
\`\`\`

**Super qisqarish qoidalari:**
1. Agar faqat 1 ta parametr bo'lsa, qavslarni \`()\` olib tashlash mumkin: \`ovqat => ...\`
2. Agar ichida faqat 1 qator kod (return) bo'lsa, jingalak qavs \`{}\` va \`return\` so'zini olib tashlash mumkin!

✅ **ENGI ZO'R (Eng qisqa) USUL:**
\`\`\`javascript
const qisqaPishir = ovqat => ovqat + " tayyor!";

console.log( qisqaPishir("Shashlik") ); // Shashlik tayyor!
\`\`\`

### Muhim farqi: This yo'q!
Arrow funksiyaning eng yirik texnik farqi shundaki, o'zining mutlaqo **\`this\`** (kontekst) so'zi yo'q. U obyekt ichida "mening xususiyatlarim" deb ishlay olmaydi. Shu sababli massiv metodlarida (\`map\`, \`filter\`) va \`setTimeout\` larda ishlatish uchun ideal!

---

## Qaysi birini qachon ishlatish kerak?

* **Arrow Function (=>):** Har doim birinchi tanlovingiz bo'lsin! U qisqa, tushunarli va kontekst (this) bilan bog'liq boshog'riqlarsiz. Ko'pchilik zamonaviy loyihalar (React, Node.js) to'liq Arrow function larda yoziladi.
* **Function Declaration:** Agar siz kodning tuzilishi (arxitektura) nuqtai nazaridan yordamchi funksiyalarni faylning eng pastida saqlab, ularni yuqorida erkin ishlatmoqchi bo'lsangiz (Hoisting uchun) ishlating.
* **Function Expression:** Hozirgi kunda kamdan-kam alohida ishlatiladi (o'rnini Arrow egallagan), faqat ba'zi eskirgan kodlarda (legacy) ko'rishingiz mumkin.

---

## Mermaid Diagramma (Farqlari)

Quyida 3 xil funksiya o'rtasidagi asosiy farqlarni ko'ramiz:

\`\`\`mermaid
flowchart TD
    A[Funksiya Yaratish] --> B[Function Declaration]
    A --> C[Function Expression]
    A --> D[Arrow Function]
    
    B -->|function myFunc()| B1{Hoisting ishlaydimi?}
    B1 -- Ha --> B2[Koddagi istalgan joydan chaqirish mumkin]
    
    C -->|let func = function()| C1{Hoisting ishlaydimi?}
    C1 -- Yo'q --> C2[Faqat e'lon qilingandan keyin ishlaydi]
    
    D -->|const func = () =>| D1{This ga egami?}
    D1 -- Yo'q --> D2[Tashqaridagi this ni ishlatadi, Hoisting ishlamaydi]
\`\`\`

---

## 🎙 Intervyu savollari

**1. Function Declaration va Expression orasidagi farq nima?**
**Javob:** Eng katta farqi — bu **Hoisting**. Declaration dastur ishga tushishidan oldin to'liq yuqoriga ko'tariladi va uni istalgan joydan chaqirish mumkin. Expression esa oddiy o'zgaruvchi kabi ishlaydi, u o'qilmaguncha chaqirib bo'lmaydi.

**2. Arrow Function larni qanday yutuqlari va kamchiliklari bor?**
**Javob:** Yutug'i: Sintaksisi juda qisqa va o'zining \`this\` iga ega bo'lmagani uchun ichki funksiyalarda (masalan callbacks) kontekst yo'qolishining oldini oladi. Kamchiligi: O'zining \`this\` iga ega emasligi uchun obyektlarning ichidagi oddiy metod (masalan \`user.sayHi()\`) sifatida ishlatib bo'lmaydi va \`new\` kalit so'zi orqali Constructor sifatida ham ishlatib bo'lmaydi.

**3. "First-class citizens" (Birinchi darajali fuqarolar) deganda JS-da nima tushuniladi?**
**Javob:** JavaScriptda funksiyalar qiymat hisoblanadi! Boshqa raqamlar yoki stringlar kabi. Funksiyani o'zgaruvchiga tenglash, boshqa funksiyaga argument sifatida berish (callback) yoki return qilib yuborish mumkinligi ularni First-class objects qilib belgilaydi.`,
  exercises: [
    {
      id: 1,
      title: "Function Declaration",
      instruction: "'multiply' nomli funksiyani Declaration usulida yarating (function ...). U ikkita argument (a va b) qabul qilib, ularning ko'paytmasini qaytarsin (return).",
      startingCode: "// multiply funksiyasini yozing",
      hint: "function multiply(a, b) { return a * b; }",
      test: "if (typeof multiply !== 'function' || multiply(2, 3) !== 6) throw new Error('Declaration usulida yaratilmadi yoki xato ishladi');"
    },
    {
      id: 2,
      title: "Hoisting Testi",
      instruction: "'greet' funksiyasi yaratilishidan oldin 'let res = greet(\\'Ali\\');' deb yozing. Keyin pastda 'greet' funksiyasini Declaration orqali yarating, u 'Salom ' + ism qaytarsin.",
      startingCode: "// shu yerda res ga tenglashtiring\n\n// pastda funksiyani yozing",
      hint: "let res = greet('Ali'); function greet(ism) { return 'Salom ' + ism; }",
      test: "if (typeof res === 'undefined' || res !== 'Salom Ali') throw new Error('Hoisting xato ishladi');"
    },
    {
      id: 3,
      title: "Function Expression",
      instruction: "'subtract' nomli o'zgaruvchiga Function Expression orqali ikkita sonning ayirmasini (a - b) hisoblovchi anonim funksiyani tenglashtiring.",
      startingCode: "let subtract = // funksiyani yozing",
      hint: "function(a, b) { return a - b; }",
      test: "if (typeof subtract !== 'function' || subtract(5, 2) !== 3) throw new Error('Expression xato yozildi');"
    },
    {
      id: 4,
      title: "Expression va Hoisting",
      instruction: "'calc' degan funksiyani Expression (let calc = function...) orqali yozing. Lekin undan tepada chaqirishga urinib ko'ring (try catch ichida berilgan). Buni shunchaki ishga tushiring.",
      startingCode: "let errorMsg = '';\ntry {\n  calc(5);\n} catch(e) {\n  errorMsg = e.name;\n}\nlet calc = function(x) { return x * 2; };",
      hint: "Shunchaki koddagi calc = function qismini to'g'ri yozilganiga ishonch hosil qilib yuboring.",
      test: "if(errorMsg !== 'ReferenceError') throw new Error('Expression hoisting qilinmasligi kerak edi');"
    },
    {
      id: 5,
      title: "Arrow Function (Oddiy)",
      instruction: "'divide' o'zgaruvchisiga Arrow Function (=>) orqali a va b ning bo'linmasini (a / b) hisoblaydigan funksiya yozing.",
      startingCode: "const divide = // arrow function yozing",
      hint: "const divide = (a, b) => { return a / b; };",
      test: "if (typeof divide !== 'function' || divide(10, 2) !== 5) throw new Error('Arrow function xato yozildi');"
    },
    {
      id: 6,
      title: "Arrow Function (Qisqa sintaksis)",
      instruction: "'square' o'zgaruvchisiga faqat 1 ta x ni qabul qilib uning kvadratini (x*x) qaytaradigan Arrow Function ni eng qisqa usulda (qavslar va return so'zlarisiz) yozing.",
      startingCode: "const square = // eng qisqa arrow",
      hint: "x => x * x",
      test: "const ast = arguments[0]; if(ast.includes('return') || ast.includes('{')) throw new Error('Eng qisqa sintaksis ishlatilmadi'); if(square(4)!==16) throw new Error('Xato xisobladi');"
    },
    {
      id: 7,
      title: "Array bilan qisqa Arrow",
      instruction: "Sizga arr = [1, 2, 3] massivi berilgan. 'arr.map()' ichida arrow funksiya yordamida har bir elementni 10 ga ko'paytirib, natijani 'resArr' ga tenglang.",
      startingCode: "let arr = [1, 2, 3];\nlet resArr = arr.map( /* shu yerga yozing */ );",
      hint: "num => num * 10",
      test: "if (!resArr || resArr.join() !== '10,20,30') throw new Error('Map ichida xato arrow function');"
    },
    {
      id: 8,
      title: "Qavssiz lekin qavsli param (Object qaytarish)",
      instruction: "Arrow funksiyada faqat bitta obyekti return qilsak, jingalak qavsni function bloki deb o'ylamasligi uchun uni ( { } ) qavsga olamiz. 'getUser(ism)' => ({ name: ism }) ko'rinishida eng qisqa funksiyani yozing.",
      startingCode: "const getUser = // ...",
      hint: "ism => ({ name: ism });",
      test: "if(typeof getUser !== 'function' || getUser('Ali').name !== 'Ali') throw new Error('Obyekt qaytarishda qavs (parentheses) unutilgan');"
    },
    {
      id: 9,
      title: "Funksiya ichida Funksiya (Callback)",
      instruction: "'doMath(a, b, callback)' nomli funksiya yozilgan. Uni chaqirganda 5, 3 va yig'indini (x+y) topuvchi Arrow Function'ni uchinchi parametr qilib jo'nating.",
      startingCode: "function doMath(a, b, fn) { return fn(a, b); }\nlet res = doMath( /* shu yerga argumentlarni yozing */ );",
      hint: "5, 3, (x, y) => x + y",
      test: "if(res !== 8) throw new Error('Callback argument noto\'g\'ri yozilgan');"
    },
    {
      id: 10,
      title: "This va Arrow (Farqni ko'rish)",
      instruction: "Obyekt ichida oddiy va arrow metod yozilgan. Ikkalasini ham chaqirib natijani (res1 va res2) ga saqlang. 'getNormalThis' ismini topadi, 'getArrowThis' esa undefined qaytarishini ko'rasiz.",
      startingCode: "let obj = {\n  name: 'Bob',\n  getNormalThis() { return this.name; },\n  getArrowThis: () => this.name\n};\nlet res1 = // getNormalThis;\nlet res2 = // getArrowThis;",
      hint: "obj.getNormalThis(), obj.getArrowThis()",
      test: "if(res1 !== 'Bob' || res2 !== undefined) throw new Error('This bo\'yicha farq xato tushunildi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScriptda funksiya nima?",
      options: [
        "Faqat raqamlarni hisoblovchi matematik tushuncha",
        "HTML teglarini yaratish vositasi",
        "Muayyan vazifani qayta-qayta bajaradigan (o'zini ichiga olgan) kod bloki",
        "Faqat server bilan ishlash uchun kutubxona"
      ],
      correctAnswer: 2,
      explanation: "Funksiyalar kodni qayta ishlatish (reusability) va tartibga solish uchun ishlatiladigan bloklardir."
    },
    {
      id: 2,
      question: "Function Declaration (function sayHello() {}) ning eng katta texnik ustunligi nimada?",
      options: [
        "U tezroq ishlaydi",
        "U Hoisting qilinadi, ya'ni koddagi e'lon qilingan qatordan yuqorida turib ham chaqirish mumkin",
        "U qisqaroq yoziladi",
        "Unda this yo'q"
      ],
      correctAnswer: 1,
      explanation: "Declaration dastur boshlanmasidan oldin xotiraga yuklanadi (Hoisting), shuning uchun faylning boshida chaqirilsa ham ishlayveradi."
    },
    {
      id: 3,
      question: "Function Expression (let fn = function() {}) ga nisbatan Hoisting ishlaydimi?",
      options: [
        "Ha, xuddi declaration kabi to'liq ko'tariladi",
        "Faqat var bilan e'lon qilingan bo'lsa qisman ko'tariladi (lekin undefined bo'lib), let/const da esa mutlaqo ishlamaydi va ERROR beradi",
        "Ha, lekin faqat strict rejimida",
        "Hoisting faqat raqamlarga ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Expression o'zgaruvchining qiymati sifatida beriladi, shuning uchun kod u yerga yetib kelmaguncha funksiya mavjud bo'lmaydi."
    },
    {
      id: 4,
      question: "Arrow Function ning to'g'ri sintaksisini belgilang:",
      options: [
        "function => () {}",
        "let fn = () -> {}",
        "const fn = () => {}",
        "arrow function() {}"
      ],
      correctAnswer: 2,
      explanation: "Arrow Function parametr qavslaridan keyin => belgisini va jingalak qavsni talab qiladi (yoki 1 qatorlik returnda qavssiz ham bo'ladi)."
    },
    {
      id: 5,
      question: "Arrow funksiyada agar faqat Bitta parametr bo'lsa, nimani olib tashlash mumkin?",
      options: [
        "return so'zini",
        "jingalak qavslarni {}",
        "=> belgisini",
        "Parametr atrofidagi dumaloq qavslarni ()"
      ],
      correctAnswer: 3,
      explanation: "Agar yagona parametr (masalan 'x') bo'lsa, 'x => x * 2' ko'rinishida dumaloq qavslarni ham olib tashlash JS da ruxsat etilgan qoidadir."
    },
    {
      id: 6,
      question: "Arrow funksiyada 'jingalak qavslar' {} yozilmasa u qanday ishlaydi?",
      options: [
        "Kod xato beradi",
        "Koddagi ifodani hisoblaydi, va 'return' so'zisiz o'zi natijani qaytaradi (Implicit return)",
        "Obyekt yaratadi",
        "Hech qanday farqi yo'q, default void qaytaradi"
      ],
      correctAnswer: 1,
      explanation: "Masalan 'a => a + 1' degani shundoq ham 'return a + 1' bilan barobar."
    },
    {
      id: 7,
      question: "Nega Arrow function ni Obyekt obyekti Metodi sifatida ishlatish yomon (masalan const user = { sayHi: () => this.name }) ?",
      options: [
        "Chunki arrow function sekin",
        "Chunki Arrow function da o'zining 'this' i yo'q, u obyektni tanimay global 'window' ga ulanib ketadi",
        "Bunday qilib yozib bo'lmaydi, Syntax error beradi",
        "Aslida eng yaxshi usul shu"
      ],
      correctAnswer: 1,
      explanation: "Metodlar uchun har doim odatiy function() yoki qisqartirilgan 'sayHi() {}' metod sintaksisi ishlatilishi shart."
    },
    {
      id: 8,
      question: "JavaScriptda funksiyalar 'First-class objects' (qiymat) deyilishining ma'nosi nima?",
      options: [
        "Barcha obyektlar funksiya ekanligini bildiradi",
        "Funksiyalarni boshqa funksiyalarga parametr sifatida berish, ularni return orqali qaytarish va oddiy o'zgaruvchiga tenglash mumkinligini",
        "Funksiyalar RAM dagi eng katta xotirani oladi degani",
        "Classdan ko'ra sekin ishlashini"
      ],
      correctAnswer: 1,
      explanation: "Funksiya oddiy ma'lumot (string yoki raqam) bilan aynan bir xil huquqqa ega bo'lib, ular ustida har qanday amaliyot o'tkazish imkoni mavjud."
    },
    {
      id: 9,
      question: "Kodni ko'ring: 'const getObj = () => { key: \\'value\\' }'. Bu nega 'undefined' qaytaradi?",
      options: [
        "Chunki arrow funksiyalarda obyekt qaytarib bo'lmaydi",
        "Chunki JavaScript {} qavsni obyekt emas, balki oddiy funksiya tanasi (block) deb o'ylaydi va ichida return yozilmagani uchun hech narsa qaytmaydi",
        "Syntax error bo'lgani uchun",
        "Value string bo'lgani uchun"
      ],
      correctAnswer: 1,
      explanation: "Obyektni bitta qatorda arrow orqali return qilish uchun uni dumaloq qavsga olish shart: () => ({ key: 'value' })"
    },
    {
      id: 10,
      question: "Quyidagilardan qaysi biri Callback funksiya yozish uchun eng qulay format hisoblanadi (masalan array.map ichida)?",
      options: [
        "Function Declaration",
        "Klassik if statements",
        "Arrow Function",
        "Constructor Function"
      ],
      correctAnswer: 2,
      explanation: "Sintaksisi kichik va bir qatorga bemalol yozilishi hamda 'this' kontekstni o'zgartirmasligi uchun array metodlarida doim Arrow Functions ishlatiladi."
    },
    {
      id: 11,
      question: "Anonymous (Anonim) funksiyalar deb nimaga aytiladi?",
      options: [
        "Faqat tunda ishlaydigan xakerlik funksiyalari",
        "Nomi yo'q (ismi e'lon qilinmagan) funksiyalarga, masalan: function() {...} yoki () => {...}",
        "Global window dagi funksiyalarga",
        "Xatolik chiqaradigan metodlar"
      ],
      correctAnswer: 1,
      explanation: "Agar function kalit so'zidan keyin uning nomi ko'rsatilmagan bo'lsa, bu anonim funksiya deyiladi."
    },
    {
      id: 12,
      question: "Zamonaviy loyihalarda eng ko'p ishlatiladigan tavsiya bo'yicha...",
      options: [
        "Hech qachon Arrow function ishlatmang",
        "Mumkin qadar doim Arrow Function dan foydalaning, agar chindan ham Hoisting yoki Object Methods (this kerak bo'lgan vaziyatlar) kerak bo'lib qolmasa",
        "Doim qoida tariqasida Function Declaration ishlating",
        "Faqat Function Expression ishlating"
      ],
      correctAnswer: 1,
      explanation: "Zamonaviy JS (ayniqsa React, Vue) dagi asosiy uslub deyarli 95% holatda Arrow function larni yozish hisoblanadi."
    }
  ]
};
