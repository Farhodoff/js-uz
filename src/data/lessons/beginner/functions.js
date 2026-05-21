export const functions = {
  id: "functions",
  title: "Funksiyalar: Kodni qayta ishlatish va modulyar dasturlash",
  level: "Boshlang'ich",
  description: "Funksiyalar orqali kodni qayta ishlatish, parametrlar, qaytarish qiymatlari, va scope haqida.",
  theory: `## 1. NEGA kerak?

Tasavvur qiling, sizga 10 joyda ikki sonni qo'shish kerak. Agar funksiya bo'lmasa, har safar qo'shish kodini yozasiz:
\`\`\`javascript
// Yomon usul - takrorlash!
console.log(5 + 3);
console.log(10 + 7);
console.log(20 + 15);
// ... 10 joyda yana shu kodlar
\`\`\`

Xato bo'lsa, 10 joyni tuzatishga majbursiz. **Funksiya** bo'lsa, bir marta yozasiz va hamma joyda ishlatasiz:
\`\`\`javascript
function qosh(a, b) {
  return a + b;
}

console.log(qosh(5, 3));   // 8
console.log(qosh(10, 7));  // 17
console.log(qosh(20, 15)); // 35
\`\`\`

## 2. SODDALIK (Analogiya)

Funksiyani **oshxona kombayni** deb tasavvur qiling:
- Siz unga narsalar (parametrlar) solasiz (masalan, mevalar).
- U ichida ish bajaradi (maydalaydi).
- Va sizga natija (return) qaytaradi (sharbat).

## 3. STRUKTURA

### A. Funksiya Deklaratsiyasi (Declaration)

Bu eng standart usul. **Hoisting** tufayli uni e'lon qilishdan oldin ham chaqirsa bo'ladi:
\`\`\`javascript
function salomBer(ism = "Mehmon") { // ism - parametr, "Mehmon" - default qiymat
  return "Salom, " + ism; // Natija qaytarish
}

console.log(salomBer("Ali"));      // "Salom, Ali"
console.log(salomBer());           // "Salom, Mehmon" (default qiymat)
\`\`\`

**Muhim:** Declaration'ni e'lon qilishdan **oldin** chaqirsa ham ishlaydi (Hoisting xususiyati tufayli funksiya deklaratsiyasi xotiraga oldindan yuklanadi):
\`\`\`javascript
console.log(sola(5, 3));  // 8 (ishlaydi!)

function sola(a, b) {
  return a + b;
}
\`\`\`

### B. Funksiya Ifodasi (Expression)

Funksiyani o'zgaruvchiga saqlash. Bu usulda **hoisting ishlamaydi**, ya'ni funksiyani faqat u e'lon qilingan qatordan keyin chaqira olasiz:
\`\`\`javascript
const xayrlesh = function() {
  console.log("Xayr!");
};

xayrlesh();
\`\`\`

**XATO bo'ladi:**
\`\`\`javascript
xayrlesh();  // TypeError: xayrlesh is not a function (chunki hoisting bo'lmaydi)

const xayrlesh = function() {
  console.log("Xayr!");
};
\`\`\`

### C. Arrow Funksiyalar (ES6)

Qisqaroq sintaksis va lexical \`this\` bog'lanishiga ega zamonaviy funksiya turi:
\`\`\`javascript
const qosh = (a, b) => {
  return a + b;
};

// Bitta qator bo'lsa, jingalak qavslar va return kerak emas (implicit return):
const qoshQisqa = (a, b) => a + b;

// Bitta parametr bo'lsa, qavslar kerak emas:
const kvadrat = x => x * x;

// Parametr yo'q bo'lsa, bo'sh qavslar qo'yiladi:
const salom = () => "Salom!";
\`\`\`

**Muhim farqi:** Arrow funksiyalar o'zining shaxsiy \`this\` kontekstiga ega emas. Ular \`this\` qiymatini o'zini o'rab turgan tashqi muhitdan (lexical scope) oladi. Bu xususiyat obyektlar va callbacklar bilan ishlashda chalkashliklarning oldini oladi.

### D. Parametrlar va Argumentlar

- **Parametr** — funksiya yozilganda (ta'riflanayotganda) berilgan vaqtinchalik o'zgaruvchi nomi.
- **Argument** — funksiya chaqirilganda parametrlar o'rniga uzatiladigan haqiqiy qiymatlar.

\`\`\`javascript
function salom(ism, familiya) {  // ism, familiya - parametrlar
  console.log(ism + " " + familiya);
}

salom("Ali", "Karimov");  // "Ali", "Karimov" - argumentlar
\`\`\`

### E. Default Parametrlar

Agar argument berilmasa yoki \`undefined\` berilsa, default qiymat ishlatiladi. E'tibor bering, agar \`null\` berilsa, u default qiymatni faollashtirmaydi (qiymat \`null\` bo'lib qolaveradi):
\`\`\`javascript
function chap(text = "Salom", soni = 1) {
  for (let i = 0; i < soni; i++) {
    console.log(text);
  }
}

chap();                    // "Salom" (1 marta)
chap("Hello");             // "Hello" (1 marta)
chap("Hi", 3);             // "Hi" (3 marta)
chap(undefined, 2);        // "Salom" (2 marta - default ishlaydi)
chap(null, 2);             // null (2 marta - null qiymati saqlanadi)
\`\`\`

### F. Return qiymati

Agar funksiyada \`return\` yozilmasa, u avtomatik ravishda \`undefined\` qaytaradi. \`return\` funksiya ijrosini o'sha zahoti to'xtatadi va boshqa kodlar bajarilmaydi:

\`\`\`javascript
function hisoblash(x) {
  if (x < 0) {
    return "Musbat son kiritish kerak"; // Shu yerda funksiya tugaydi
  }
  const natija = Math.sqrt(x);
  return natija; // Faqat x >= 0 bo'lgandagina bu yerga yetadi
}
\`\`\`

### G. Rest Parametrlar (...)

Noma'lum sondagi argumentlarni bitta massiv (array) shaklida yig'ib olish uchun ishlatiladi. Rest parametri har doim parametrlarning eng oxirida turishi shart:
\`\`\`javascript
function qoshHammasi(...raqamlar) { // raqamlar - haqiqiy massivdir
  return raqamlar.reduce((jami, raqam) => jami + raqam, 0);
}

console.log(qoshHammasi(1, 2, 3));       // 6
console.log(qoshHammasi(5, 10, 15, 20)); // 50
\`\`\`

### H. Scope (Ko'rinish diapazoni)

O'zgaruvchining kodning qaysi qismida ko'rinishi yoki ishlatilishi mumkinligini belgilaydi.
1. **Global Scope:** Hamma joydan murojaat qilish mumkin bo'lgan tashqi soha.
2. **Function (Local) Scope:** Faqat funksiya ichida yaratilgan va tashqaridan ko'rinmaydigan soha.
3. **Block Scope:** Jingalak qavslar \`{}\` (masalan, \`if\`, \`for\`) ichida \`let\` va \`const\` bilan yaratilgan, tashqaridan ko'rinmaydigan soha.

\`\`\`javascript
const globalVar = "Global"; // Global Scope

function testScope() {
  const functionVar = "Lokal Funksiya"; // Function Scope
  if (true) {
    const blockVar = "Blok ichidagi"; // Block Scope
    var varVariable = "Var bilan yozilgan"; // Function scope-ga ega!
    console.log(blockVar); // Ishlaydi
  }
  console.log(varVariable); // Ishlaydi! Chunki 'var' block scope tan olmaydi.
  // console.log(blockVar); // ReferenceError! Block scope tashqarisida ishlamaydi.
}
\`\`\`

### I. Callback Funksiyalar

Funksiyani boshqa funksiyaga argument sifatida berish va kerakli vaqtda uni chaqirish patternidir. Bu asinxronlikni va modulyarlikni ta'minlaydi:
\`\`\`javascript
function operatsiya(a, b, callback) {
  return callback(a, b);
}

const qosh = (x, y) => x + y;
const kopaytir = (x, y) => x * y;

console.log(operatsiya(5, 3, qosh));    // 8
console.log(operatsiya(5, 3, kopaytir)); // 15
\`\`\`

## 4. XATOLAR (Common Mistakes)

1. **Return ni unutish:**
   \`\`\`javascript
   // XATO:
   function add(a, b) {
     a + b;  // Natija qaytmaydi, funksiya undefined qaytaradi!
   }

   // TO'G'RI:
   function add(a, b) {
     return a + b;
   }
   \`\`\`

2. **Funksiyani chaqirmasdan (nomini o'zini) ishlatish:**
   \`\`\`javascript
   const myFunc = () => "Salom";
   console.log(myFunc);   // [Function: myFunc] (kodning o'zini qaytaradi)
   console.log(myFunc()); // "Salom" (natijani qaytaradi)
   \`\`\`

3. **Arrow funksiyada implicit return chalkashligi:**
   \`\`\`javascript
   // XATO:
   const add = (a, b) => { a + b }; // Jingalak qavs ochilsa, return yozish majburiy! Natija: undefined
   
   // TO'G'RI:
   const add1 = (a, b) => a + b; // Qavssiz bir qatorli yozuv
   const add2 = (a, b) => { return a + b; }; // Qavs bilan return majburiy
   \`\`\`

4. **Rest parametridan keyin yana parametr yozish:**
   \`\`\`javascript
   // XATO:
   function x(...a, b) {} // SyntaxError: Rest parameter must be last formal parameter
   \`\`\`

## 5. AMALIYOT (Mashqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

**1. Funksiya nima?**
Ma'lum bir vazifani bajaradigan va qayta-qayta ishlatilishi mumkin bo'lgan kodlar bloki.

**2. Funksiya deklaratsiyasi (Declaration) va ifodasi (Expression) farqi nima?**
Declaration hoisting qilinadi (e'lon qilishdan oldin ham chaqirish mumkin). Expression esa hoisting bo'lmaydi va faqat e'lon qilingandan keyin ishlaydi.

**3. Parametr va Argumentning farqi nimada?**
Parametr funksiya ta'rifidagi o'zgaruvchi nomi (masalan, \`x\`), argument esa funksiya chaqirilganda uzatilgan haqiqiy qiymat (masalan, \`5\`).

**4. Return kalit so'zi nima vazifani bajaradi?**
Funksiya natijasini qaytaradi va funksiyaning bajarilishini o'sha zahoti yakunlaydi.

**5. Default parametrlar qachon ishga tushadi?**
Uzatilgan argument \`undefined\` bo'lsa yoki umuman argument uzatilmagan bo'lsa ishlaydi. \`null\` uzatilganda esa default qiymat ishlamaydi.

**6. Rest operatori (...) nima qiladi?**
Uzatilgan cheksiz sondagi argumentlarni bitta massiv (array) qilib yig'adi. Har doim oxirgi parametr bo'lishi shart.

**7. Scope nima?**
O'zgaruvchilarning kod bo'ylab ko'rinish va foydalanilish diapazoni (doirasi).

**8. Block scope qaysi o'zgaruvchilarga tegishli?**
Jingalak qavslar ichida e'lon qilingan \`let\` va \`const\` o'zgaruvchilariga tegishli. \`var\` o'zgaruvchisi block scope-ni tan olmaydi.

**9. Callback funksiya nima?**
Boshqa funksiyaga argument sifatida uzatilgan va ma'lum bir amal bajarilgandan keyin chaqiriladigan funksiya.

**10. Arrow funksiya oddiy funksiyadan nimasi bilan farq qiladi?**
Qisqaroq yozilishi va o'zining shaxsiy \`this\` kontekstiga ega emasligi bilan farq qiladi. \`this\`ni o'zini o'rab turgan tashqi scope-dan oladi.

**11. Nomsiz (Anonymous) funksiya nima va u qayerda ishlatiladi?**
Nomi bo'lmagan funksiya. Odatda callback sifatida yoki o'zgaruvchiga qiymat qilib berilganda (Function Expression) ishlatiladi.

**12. Arrow funksiyada bitta parametr bo'lsa qavslarni yozish shartmi?**
Yo'q, bitta parametr bo'lsa qavslarni yozmaslik mumkin (masalan: \`x => x * x\`). Agar parametrlar soni 0 yoki birdan ortiq bo'lsa, qavslar shart.
`,
  exercises: [
    {
      id: 1,
      title: "Oddiy funksiya - Ikkita sonni qo'shish",
      instruction: "'add' funksiyasini yarating. Ikkita sonni qabul qilsin va ularning yig'indisini qaytarsin.",
      startingCode: "// add funksiyasini yozing\n\n// Tekshirish:\nconsole.log(add(5, 3));\nconsole.log(add(10, 20));\n",
      hint: "function add(a, b) { return a + b; }",
      test: "if (typeof add !== 'function') return 'add funksiyasi topilmadi'; if (add(5, 3) === 8 && add(10, 20) === 30) return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "Sonning kvadratini hisoblash",
      instruction: "'square' funksiyasini yarating. Sonni qabul qilsin va uning kvadratini qaytarsin.",
      startingCode: "// square funksiyasini yozing\n\n// Tekshirish:\nconsole.log(square(4));\nconsole.log(square(5));\n",
      hint: "function square(n) { return n * n; }",
      test: "if (typeof square !== 'function') return 'square funksiyasi topilmadi'; if (square(4) === 16 && square(5) === 25) return null; return 'Kvadrat noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 3,
      title: "Shartli return - Salomlashish",
      instruction: "'greet' funksiyasini yarating. Ismni qabul qilsin. Agar ism 'Ali' bo'lsa 'Ali! Sening do\\'stingman' qaytarsin, aks holda 'Salom, [ism]' qaytarsin.",
      startingCode: "// greet funksiyasini yozing\n\n// Tekshirish:\nconsole.log(greet('Ali'));\nconsole.log(greet('Bobur'));\n",
      hint: "function greet(name) { if (name === 'Ali') return 'Ali! Sening do\\'stingman'; return 'Salom, ' + name; }",
      test: "if (typeof greet !== 'function') return 'greet funksiyasi topilmadi'; if (greet('Ali') === 'Ali! Sening do\\'stingman' && greet('Bobur') === 'Salom, Bobur') return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 4,
      title: "Default parametrlar",
      instruction: "'sayHi' funksiyasini yarating. Default ismni 'Mehmon' qilib qo'ying. 'Salom, [ism]!' qaytarsin.",
      startingCode: "// sayHi funksiyasini yozing (default parametr bilan)\n\n// Tekshirish:\nconsole.log(sayHi());\nconsole.log(sayHi('Farhod'));\n",
      hint: "function sayHi(name = 'Mehmon') { return 'Salom, ' + name + '!'; }",
      test: "if (typeof sayHi !== 'function') return 'sayHi funksiyasi topilmadi'; if (sayHi() === 'Salom, Mehmon!' && sayHi('Farhod') === 'Salom, Farhod!') return null; return 'Natija noto\\'g\\'ri';"
    },
    {
      id: 5,
      title: "Arrow funksiya - Tomonlama hisoblash",
      instruction: "'rectArea' arrow funksiyasini yarating. Eni va bo'yini qabul qilsin, tomonlamani qaytarsin.",
      startingCode: "// rectArea arrow funksiyasini yozing\n\n// Tekshirish:\nconsole.log(rectArea(5, 10));\nconsole.log(rectArea(3, 7));\n",
      hint: "const rectArea = (width, height) => width * height;",
      test: "if (typeof rectArea !== 'function') return 'rectArea funksiyasi topilmadi'; if (rectArea(5, 10) === 50 && rectArea(3, 7) === 21) return null; return 'Tomonlama noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 6,
      title: "Rest parametrlar - Hammasi bo'yicha yig'indi",
      instruction: "'sumAll' funksiyasini yarating. Istalgan sondagi raqamlarni qabul qilsin va ularning yig'indisini qaytarsin. Rest parametrlarni (...) ishlatsin.",
      startingCode: "// sumAll funksiyasini yozing (rest parametrlar)\n\n// Tekshirish:\nconsole.log(sumAll(1, 2, 3));\nconsole.log(sumAll(5, 10, 15, 20));\n",
      hint: "function sumAll(...numbers) { return numbers.reduce((a, b) => a + b, 0); }",
      test: "if (typeof sumAll !== 'function') return 'sumAll funksiyasi topilmadi'; if (sumAll(1, 2, 3) === 6 && sumAll(5, 10, 15, 20) === 50) return null; return 'Yig\\'indi noto\\'g\\'ri hisoblandi';"
    },
    {
      id: 7,
      title: "Multiple return qiymatlari",
      instruction: "'getGrade' funksiyasini yarating. Baho (0-100) qabul qilsin. Agar >= 90 bo'lsa 'A', >= 80 bo'lsa 'B', >= 70 bo'lsa 'C', aks holda 'F' qaytarsin.",
      startingCode: "// getGrade funksiyasini yozing\n\n// Tekshirish:\nconsole.log(getGrade(95));\nconsole.log(getGrade(85));\nconsole.log(getGrade(65));\n",
      hint: "function getGrade(score) { if (score >= 90) return 'A'; if (score >= 80) return 'B'; if (score >= 70) return 'C'; return 'F'; }",
      test: "if (typeof getGrade !== 'function') return 'getGrade funksiyasi topilmadi'; if (getGrade(95) === 'A' && getGrade(85) === 'B' && getGrade(65) === 'F') return null; return 'Baho noto\\'g\\'ri';"
    },
    {
      id: 8,
      title: "Callback funksiya",
      instruction: "'applyOperation' funksiyasini yarating. Ikkita son va operatsiyani (funksiyani) qabul qilsin. Operatsiyani qo'llsin va natijasini qaytarsin.",
      startingCode: "// applyOperation funksiyasini yozing\nconst add = (a, b) => a + b;\nconst multiply = (a, b) => a * b;\n\n// Tekshirish:\nconsole.log(applyOperation(5, 3, add));\nconsole.log(applyOperation(5, 3, multiply));\n",
      hint: "function applyOperation(a, b, operation) { return operation(a, b); }",
      test: "if (typeof applyOperation !== 'function') return 'applyOperation funksiyasi topilmadi'; if (applyOperation(5, 3, add) === 8 && applyOperation(5, 3, multiply) === 15) return null; return 'Operatsiya noto\\'g\\'ri';"
    },
    {
      id: 9,
      title: "Funksiya Expression",
      instruction: "'getDayName' funksiyasini Expression shaklida yarating. 1 = \"Dushanba\", 2 = \"Seshanba\" va h.k.",
      startingCode: "// getDayName funksiyasini expression shaklida yozing\n\n// Tekshirish:\nconsole.log(getDayName(1));\nconsole.log(getDayName(3));\n",
      hint: "const getDayName = function(day) { const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba']; return days[day - 1]; };",
      test: "if (typeof getDayName !== 'function') return 'getDayName funksiyasi topilmadi'; if (getDayName(1) === 'Dushanba' && getDayName(3) === 'Chorshanba') return null; return 'Kun nomi noto\\'g\\'ri';"
    },
    {
      id: 10,
      title: "Scope - Global va Local",
      instruction: "Global o'zgaruvchi 'globalMsg' yarating. Funksiya yarating, ichida 'localMsg' o'zgaruvchi bo'lsin. Ikkalasini console.log() qiling.",
      startingCode: "// Global o'zgaruvchi\nconst globalMsg = 'Global';\n\n// Funksiya yarating\nfunction showMessages() {\n  // Bu yerga yozing\n}\n\nshowMessages();\n",
      hint: "function showMessages() { const localMsg = 'Lokal'; console.log(globalMsg); console.log(localMsg); }",
      test: "if (logs.includes('Global') && logs.includes('Lokal')) return null; return 'Scope noto\\'g\\'ri';"
    },
    {
      id: 11,
      title: "Funksiya ichida boshqa funksiya",
      instruction: "'outer' funksiyasini yarating. Ichida 'inner' funksiyasini e'lon qiling. Inner 'Ichka' chiqarsin. Outer chaqirganda inner chaqirilsin.",
      startingCode: "// outer funksiyasini yozing\n\n// Tekshirish:\nouter();\n",
      hint: "function outer() { function inner() { console.log('Ichka'); } inner(); }",
      test: "if (logs.includes('Ichka')) return null; return 'Nested funksiya noto\\'g\\'ri';"
    },
    {
      id: 12,
      title: "Kompleks - Parametrlarni validatsiya qilish",
      instruction: "O'quvchi yoshini validatsiya qiladigan funksiya yozing.",
      startingCode: "// validateAge funksiyasini yozing\n\n// Tekshirish:\nconsole.log(validateAge(25));\nconsole.log(validateAge(-5));\nconsole.log(validateAge(150));\n",
      hint: "function validateAge(age) { return age >= 0 && age <= 100; }",
      test: "if (typeof validateAge !== 'function') return 'validateAge funksiyasi topilmadi'; if (validateAge(25) === true && validateAge(-5) === false && validateAge(150) === false) return null; return 'Validatsiya noto\\'g\\'ri';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da funksiya deklaratsiyasi (Function Declaration) va funksiya ifodasi (Function Expression) o'rtasidagi eng katta amaliy farq nima?",
      options: [
        "Deklaratsiyada parametrlar ishlatilmaydi",
        "Declaration hoisting-ga bo'ysunadi (uni e'lon qilishdan oldin ham chaqirsa bo'ladi); Expression-da esa hoisting ishlamaydi va uni faqat e'lon qilingandan keyin chaqirish mumkin",
        "Expression har doim return qaytaradi, Declaration esa yo'q",
        "Ular o'rtasida hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "Function Declaration brauzer tomonidan kod bajarilishidan oldin yuklanadi (hoisting). Function Expression esa oddiy o'zgaruvchi kabi faqat kod o'sha qatorga yetib kelgandagina yaratiladi."
    },
    {
      id: 2,
      question: "Funksiya chaqirilganda qavslar ichida beriladigan haqiqiy qiymatlar nima deyiladi va funksiya ta'riflangan (yozilgan) vaqtda qabul qilinadigan o'zgaruvchi nomlari nima deyiladi?",
      options: [
        "Ikkalasi ham Parametrlar deyiladi",
        "Haqiqiy qiymatlar - Argumentlar, o'zgaruvchi nomlari - Parametrlar deyiladi",
        "Haqiqiy qiymatlar - Parametrlar, o'zgaruvchi nomlari - Argumentlar deyiladi",
        "Ikkalasi ham Argumentlar deyiladi"
      ],
      correctAnswer: 1,
      explanation: "Parametr — bu funksiya e'lon qilinayotganda qavs ichiga yoziladigan vaqtinchalik o'zgaruvchi nomi. Argument esa funksiya chaqirilayotganda o'sha parametrga beriladigan haqiqiy qiymatdir."
    },
    {
      id: 3,
      question: "Agar funksiya tanasi ichida `return` kalit so'zi yozilmasa yoki shunchaki bo'sh `return;` yozib qo'yilsa, u holda ushbu funksiyadan qanday qiymat qaytadi?",
      options: [
        "`null`",
        "`undefined` (chunki JS-da hech narsa qaytarmaydigan funksiyalar sukut bo'yicha undefined qaytaradi)",
        "`0`",
        "`false`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da agar funksiyadan aniq qiymat `return` orqali qaytarilmasa, u sukut bo'yicha (by default) `undefined` qiymat qaytaradi."
    },
    {
      id: 4,
      question: "Noma'lum sondagi barcha kiruvchi argumentlarni bitta o'zgaruvchiga massiv (array) ko'rinishida yig'ib olish uchun qaysi sintaksisdan (Rest parameters) foydalaniladi?",
      options: [
        "`function sum(args)`",
        "`function sum(...numbers)` (uchta nuqta bilan belgilangan rest operatori yordamida)",
        "`function sum(numbers...)`",
        "`function sum(numbers[])`"
      ],
      correctAnswer: 1,
      explanation: "Rest parametrlari (`...`) funksiyaga uzatilgan cheksiz miqdordagi argumentlarni massivga birlashtirish imkonini beradi."
    },
    {
      id: 5,
      question: "Arrow (o'qsimon) funksiyalarning qaysi xususiyati ularni oddiy funksiyalardan ajratib turadi?",
      options: [
        "Ular qisqa sintaksisga ega va o'zlarining shaxsiy `this` kontekstiga ega bo'lmaydi (lexical `this` ga ega)",
        "Ularda `return` ishlatib bo'lmaydi",
        "Ular doimo hoisting qilinadi",
        "Ular obyektdagi metodlar bo'la olmaydi"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiyalar qisqaroq yozilishidan tashqari, o'zining shaxsiy `this` bog'lanishiga ega bo'lmaydi, balki tashqi (o'rab turgan) scope'dagi `this` ni o'zlashtiradi."
    },
    {
      id: 6,
      question: "Funksiya ichida e'lon qilingan o'zgaruvchiga funksiya tashqarisidan murojaat qilinganda qanday holat yuz beradi?",
      options: [
        "O'zgaruvchi qiymati undefined bo'ladi",
        "ReferenceError yuz beradi (chunki o'zgaruvchi lokal scope-da joylashgan)",
        "O'zgaruvchi global scope-ga o'tadi",
        "Dastur xatosiz o'tib ketadi va hech narsa ko'rsatmaydi"
      ],
      correctAnswer: 1,
      explanation: "Lokal scope-da e'lon qilingan o'zgaruvchilar o'sha funksiyaning o'zigagina tegishli va tashqaridan ularga kirish imkoni yo'q. Shuning uchun ReferenceError tashlanadi."
    },
    {
      id: 7,
      question: "Blok scope (Block Scope) tushunchasiga ko'ra, ifoda yoki tsikl `{}` qavslari ichida e'lon qilingan qaysi o'zgaruvchilar blok tashqarisidan ko'rinmaydi?",
      options: [
        "Faqat `var` bilan e'lon qilingan o'zgaruvchilar",
        "Faqat `let` va `const` bilan e'lon qilingan o'zgaruvchilar",
        "Barcha o'zgaruvchilar (var, let, const)",
        "Hech biri ko'rinmaydi"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` o'zgaruvchilari blok scope doirasiga ega. `var` esa blok doirasini tan olmaydi va blokdan tashqarida ham ko'rinadi."
    },
    {
      id: 8,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nmyFunc();\nconst myFunc = () => console.log('Salom');\n```",
      options: [
        "'Salom' yozuvi",
        "ReferenceError (chunki `const` o'zgaruvchisi e'lon qilinishidan oldin ishlatilmoqda - TDZ)",
        "undefined",
        "TypeError: myFunc is not a function"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar `const` yoki `let` o'zgaruvchilariga saqlanadi va hoisting bo'lmaydi (aniqrog'i temporal dead zone tufayli ularga e'londan oldin kirish mumkin emas). Shuning uchun ReferenceError beradi."
    },
    {
      id: 9,
      question: "Callback funksiya nima?",
      options: [
        "Hech qachon qaytib chaqirib bo'lmaydigan funksiya",
        "Boshqa funksiyaga argument sifatida uzatiladigan va keyinroq chaqiriladigan funksiya",
        "Faqat serverdan javob kelganda ishlaydigan tayyor kutubxona metodi",
        "Boshqa funksiya ichida e'lon qilingan oddiy o'zgaruvchi"
      ],
      correctAnswer: 1,
      explanation: "Callback (qayta chaqiruv) funksiyasi — boshqa funksiyaga argument ko'rinishida berib yuboriladigan va o'sha qabul qilgan funksiya ichida kerakli amal tugagach ishga tushadigan funksiyadir."
    },
    {
      id: 10,
      question: "Agar funksiya default parametri `x = 10` bo'lsa va funksiyaga argument sifatida `null` uzatilsa, `x` o'zgaruvchisi qanday qiymatga ega bo'ladi?",
      options: [
        "`10` (default qiymat ishga tushadi)",
        "`null` (chunki null qiymati default parametrni faollashtirmaydi, faqat undefined faollashtiradi)",
        "`undefined`",
        "`TypeError` xatosi yuz beradi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da default parametrlar faqat parametrga qiymat berilmaganda yoki `undefined` berilganda ishlaydi. `null` bu aniq berilgan qiymat hisoblanib, u default qiymatning ustidan yoziladi."
    },
    {
      id: 11,
      question: "JavaScript-da funksiyalar chaqirilishi va ularning bajarilish tartibini kuzatish uchun qaysi mexanizmdan foydalaniladi?",
      options: [
        "Callback Queue",
        "Call Stack (bajarilayotgan funksiyalarni LIFO tartibida saqlaydi)",
        "Memory Heap",
        "Event Loop"
      ],
      correctAnswer: 1,
      explanation: "Call Stack (chaqiriqlar steki) dasturdagi funksiyalar zanjirini kuzatib boradi. Funksiya chaqirilganda stekning tepasiga qo'shiladi va tugagach stekdan o'chiriladi."
    },
    {
      id: 12,
      question: "Quyidagi kodda `obj.greet()` chaqirilganda konsolga nima chiqadi?\n```javascript\nconst obj = {\n  name: 'Ali',\n  greet: () => {\n    console.log(this.name);\n  }\n};\n```",
      options: [
        "'Ali'",
        "undefined (yoki global kontekst xususiyati, chunki arrow funksiya o'zining shaxsiy 'this' kontekstiga ega emas)",
        "TypeError xatosi",
        "ReferenceError"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar o'zining shaxsiy `this` kontekstiga ega bo'lmagani sababli, `this.name` obyektdan emas, balki tashqi (odatda global/window yoki undefined) scoperdan izlanadi va ko'pincha `undefined` qaytaradi."
    }
  ]
};