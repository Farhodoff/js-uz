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

**Muhim:** Declaration'ni e'lon qilishdan **oldin** chaqirsa ham ishlaydi:
\`\`\`javascript
console.log(sola(5, 3));  // 8 (ishlaydi!)

function sola(a, b) {
  return a + b;
}
\`\`\`

### B. Funksiya Ifodasi (Expression)

Funksiyani o'zgaruvchiga saqlash. **Hoisting ishlamaydi**:
\`\`\`javascript
const xayrlesh = function() {
  console.log("Xayr!");
};

xayrlesh();
\`\`\`

**XATO bo'ladi:**
\`\`\`javascript
xayrlesh();  // TypeError! xayrlesh hali ta'rif qilinmadi

const xayrlesh = function() {
  console.log("Xayr!");
};
\`\`\`

### C. Arrow Funksiyalar (ES6)

Qisqaroq sintaksis:
\`\`\`javascript
const qosh = (a, b) => {
  return a + b;
};

// Bitta qator bo'lsa, qavslar va return kerak emas:
const qosh = (a, b) => a + b;

// Bitta parametr bo'lsa, qavslar kerak emas:
const kvadrat = x => x * x;

// Parametr yo'q bo'lsa, bo'sh qavslar kerak:
const salom = () => "Salom!";
\`\`\`

**Muhim:** Arrow funksiyada \`this\` boshqacha ishlaydi (lexical this).

### D. Parametrlar va Argumentlar

- **Parametr** — funksiya yozilganda berilgan o'zgaruvchi nomi
- **Argument** — funksiya chaqirilganda berilgan haqiqiy qiymat

\`\`\`javascript
function salom(ism, familiya) {  // ism, familiya - parametrlar
  console.log(ism + " " + familiya);
}

salom("Ali", "Karimov");  // "Ali", "Karimov" - argumentlar
\`\`\`

### E. Default Parametrlar

Agar argument berilmasa, default qiymat ishlatiladi:
\`\`\`javascript
function chap(text = "Salom", soni = 1) {
  for (let i = 0; i < soni; i++) {
    console.log(text);
  }
}

chap();                    // "Salom" (1 marta)
chap("Hello");             // "Hello" (1 marta)
chap("Hi", 3);             // "Hi" (3 marta)
\`\`\`

### F. Return qiymati

Agar funksiyada \`return\` yozilmasa, u avtomatik ravishda \`undefined\` qaytaradi. \`return\` funksiyani o'sha zahoti to'xtatadi:

\`\`\`javascript
function hisoblash(x) {
  if (x < 0) {
    return "Musbat son kiritish kerak"; // Bu yerda to'xtaydi
  }
  const natija = Math.sqrt(x);
  return natija; // Faqat bu yerga yetadi
}

console.log(hisoblash(9));  // 3
console.log(hisoblash(-5)); // "Musbat son kiritish kerak"
\`\`\`

**Bitta funksiyada bir nechta return bo'lishi mumkin:**
\`\`\`javascript
function tekshir(age) {
  if (age < 0) return "Age manfi bo'lmasligi kerak";
  if (age < 18) return "Voyaga yetmagansiz";
  if (age > 100) return "Shu qadar yosh bo'lmasligi kerak";
  return "Siz voyaga yetgan";
}
\`\`\`

### G. Rest Parametrlar (...)

Noma'lum sondagi argumentlarni qabul qilish:
\`\`\`javascript
function qosh_hammasi(...raqamlar) {
  let jami = 0;
  for (let raqam of raqamlar) {
    jami += raqam;
  }
  return jami;
}

console.log(qosh_hammasi(1, 2, 3));       // 6
console.log(qosh_hammasi(5, 10, 15, 20)); // 50
\`\`\`

### H. Funksiyani chaqirish (Invoke)

Funksiyani chaqirish uchun nomi va qavslar kerak:
\`\`\`javascript
function salom() {
  console.log("Salom!");
}

salom;        // Funksiya o'zini (kodni chaqirmaydi)
salom();      // Funksiyani chaqirish - "Salom!" konsolga chiqadi
\`\`\`

### I. Hoisting

**Declaration** hoisting yo'q:
\`\`\`javascript
console.log(myFunc());  // Ishlaydi! "Natija"

function myFunc() {
  return "Natija";
}
\`\`\`

**Expression** hoisting bo'lmaydi:
\`\`\`javascript
console.log(myFunc());  // TypeError!

const myFunc = () => "Natija";
\`\`\`

### J. Scope (Ko'rinish diapazona)

Funksiya ichida tashqarida e'lon qilingan o'zgaruvchiga o'z ichida murojaat qilish mumkin:
\`\`\`javascript
const global_var = "Global";

function test() {
  const local_var = "Lokal";
  console.log(global_var);  // "Global" - ishlaydi
  console.log(local_var);   // "Lokal" - ishlaydi
}

test();
console.log(local_var);     // ReferenceError! Lokal scope'da emas
\`\`\`

### K. Callback Funksiyalar

Funksiyani boshqa funksiyaga argument sifatida berish:
\`\`\`javascript
function operatsiya(a, b, callback) {
  const natija = callback(a, b);
  return natija;
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
     a + b;  // undefined qaytaradi!
   }

   // TO'G'RI:
   function add(a, b) {
     return a + b;
   }
   \`\`\`

2. **Parametr va Argument adashtirish:**
   \`\`\`javascript
   function greet(name) { // name - parametr
     console.log(name);
   }
   greet("Ali");  // "Ali" - argument
   \`\`\`

3. **Funksiyani chaqirmasdan ishlatish:**
   \`\`\`javascript
   const myFunc = () => "Salom";
   console.log(myFunc);   // [Function] (kodi chiqadi)
   console.log(myFunc()); // "Salom" (natija chiqadi)
   \`\`\`

4. **Arrow funksiyada qavslarni unutish:**
   \`\`\`javascript
   // XATO:
   const add = (a, b) => a + b;  // OK, bir qator
   const add = (a, b) => { a + b; } // XATO! qavsda return kerak

   // TO'G'RI:
   const add = (a, b) => { return a + b; }
   \`\`\`

## 5. AMALIYOT (Mushqlar pastda)

## 6. SAVOLLAR VA JAVOBLAR

<details>
<summary>1. Funksiya nima?</summary>
Ma'lum bir vazifani bajaradigan kod bo'lagi. Bir marta yoziladi va istalgancha chaqiriladi.
</details>

<details>
<summary>2. Funksiya deklaratsiyasi va ifodasi (expression) farqi nima?</summary>
Deklaratsiya e'lon qilishdan oldin chaqirilishi mumkin (hoisting), expression esa chaqira olmaydi.
</details>

<details>
<summary>3. Parametr nima?</summary>
Funksiya yozilganda qavslarda berilgan o'zgaruvchi nomi. Masalan: \`function add(a, b)\` da \`a\` va \`b\` parametrlar.
</details>

<details>
<summary>4. Argument nima?</summary>
Funksiya chaqirilganda qavslarda berilgan haqiqiy qiymat. Masalan: \`add(5, 3)\` da \`5\` va \`3\` argumentlar.
</details>

<details>
<summary>5. Return kalit so'zi nima vazifani bajaradi?</summary>
Funksiyaning natijasini qaytaradi va funksiyani o'sha zahoti tugatadi.
</details>

<details>
<summary>6. Default parametr nima uchun kerak?</summary>
Agar argument berilmasa, standart qiymatni ishlatish. Masalan: \`function greet(name = "Mehmon")\`.
</details>

<details>
<summary>7. Funksiya ichida return'dan keyin kod yozsa u ishlayadimi?</summary>
Yo'q, return'dan keyin kod bajarilmaydi.
</details>

<details>
<summary>8. Funksiyani chaqirish (call/invoke) qanday bo'ladi?</summary>
Funksiya nomini yozib, qavslar qo'yish. Masalan: \`myFunc()\`.
</details>

<details>
<summary>9. Hoisting funksiyalarga qanday ta'sir qiladi?</summary>
Funksiya declaration'lar e'lon qilishdan oldin chaqirilishi mumkin. Expression'lar esa kerak emas.
</details>

<details>
<summary>10. Anonymous (nomsiz) funksiya nima?</summary>
Nomi bo'lmagan funksiya. Odatda o'zgaruvchiga saqlansa yoki callback sifatida ishlatilsa.
</details>

<details>
<summary>11. Bitta funksiyada bir nechta return bo'lishi mumkinmi?</summary>
Ha, masalan shartlar bilan. Lekin Return funksiyani to'xtatgani uchun, faqat bittasi bajariladi.
</details>

<details>
<summary>12. Funksiya ichida boshqa funksiyani chaqirish mumkinmi?</summary>
Ha, mutlaqo. Masalan callback pattern'lari, higher-order functions, va boshqalar.
</details>`,
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
      title: "Shunga o'xshash - Sonning kvadratini hisoblash",
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
      test: "if (typeof sumAll !== 'function') return 'sumAll funksiyasi topilmadi'; if (sumAll(1, 2, 3) === 6 && sumAll(5, 10, 15, 20) === 50) return null; return 'Yig'indi noto\\'g\\'ri hisoblandi';"
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
        "Expression har doim `return` qaytaradi, Declaration esa yo'q",
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
    }
  ]
};
