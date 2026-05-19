export const arrowFunctions = {
  id: "arrow-functions",
  title: "Arrow Functions (Arrow funksiyalar)",
  level: "Intermediate",
  description: "Funksiyalarni yozishning zamonaviy, qisqa va qulay usuli.",
  theory: `
# Arrow Functions – Bu nima va nima uchun kerak?

**Arrow Functions** (Ko'rsatkichli funksiyalar) — bu ES6 versiyasida qo'shilgan, funksiyalarni yozishning yangicha sintaksisi.

## 1. NEGA kerak?
Kodning qisqaligi va o'qishga osonligi uchun. Ayniqsa, callback funksiyalarda (massiv metodlarida) arrow funksiyalar kodni 3-4 barobar qisqartiradi. Shuningdek, \`this\` konteksti bilan ishlashda ham o'ziga xos qulayligi bor.

## 2. SODDALIK (Analogiya)
Buni **SMS tili** deb tasavvur qiling. "Assalomu alaykum" deyish o'rniga "ASAL" yoki "Salom" deyish kabi. Ma'no bir xil, lekin yozish tezroq.

## 3. STRUKTURA

### A. Sintaksis farqi
\`\`\`javascript
// Eski usul
const kvadrat = function(n) {
  return n * n;
};

// Yangi usul (Arrow)
const kvadrat = (n) => n * n; // Qavslar va return shart emas!
\`\`\`

### B. Implicit Return (Avtomatik qaytarish)
Agar funksiya faqat bitta qatordan iborat bo'sa, jingalak qavs \`{ }\` va \`return\` so'zi yozilmasa ham bo'ladi. JS natijani avtomatik qaytaradi.

### C. this konteksti
**Muhim!** Arrow funksiyalarda o'zining \`this\`i yo'q. U \`this\`ni o'zi yozilgan joydan meros oladi.

## 4. AMALIYOT (Mashq)
\`\`\`javascript
const sonlar = [1, 2, 3, 4];
const ikkiBarobar = sonlar.map(n => n * 2);
console.log(ikkiBarobar); // [2, 4, 6, 8]
\`\`\`

## 5. XATOLAR (Common mistakes)
1.  **Obyekt qaytarishda xato:** \`const getObj = () => { name: "Ali" }\` — bu xato beradi! Obyektni qaytarish uchun uni qavsga olish shart: \`const getObj = () => ({ name: "Ali" })\`.
2.  **Konstruktor sifatida ishlatish:** Arrow funksiyalarni \`new\` kalit so'zi bilan ishlatib bo'lmaydi.

<details>
<summary><b>1. Arrow function qachon paydo bo'lgan?</b></summary>
U ES6 (ECMAScript 2015) versiyasida JavaScript-ga kiritilgan.
</details>

<details>
<summary><b>2. Arrow function va oddiy funksiyaning sintaksis farqi nima?</b></summary>
\`function\` kalit so'zi yo'q qilinib, parametrlar va funksiya tanasi o'rtasida \`=>\` (fat arrow) belgisi yoziladi.
</details>

<details>
<summary><b>3. Implicit return nima?</b></summary>
Funksiya atigi bitta qatordan iborat bo'lsa, \`{}\` qavslar va \`return\` so'zini yozmasdan turib natijani avtomatik qaytarish xususiyati.
</details>

<details>
<summary><b>4. Arrow funksiyada qachon \`return\` yozish shart?</b></summary>
Agar siz jingalak qavslarni \`{}\` ochsangiz (funksiya tanasi bir nechta qator bo'lsa), unda natijani qaytarish uchun \`return\` yozish majburiy.
</details>

<details>
<summary><b>5. \`this\` kalit so'zi arrow funksiyada qanday ishlaydi?</b></summary>
Arrow funksiyada o'zining shaxsiy \`this\`i bo'lmaydi. U o'zi e'lon qilingan muhitdagi (lexical scope) \`this\`ni oladi va uni \`bind\`, \`call\` bilan o'zgartirib bo'lmaydi.
</details>

<details>
<summary><b>6. Bitta parametr bo'lsa qavslarni yozish shartmi?</b></summary>
Yo'q, agar parametr atigi bitta bo'lsa, qavslarsiz \`x => x * 2\` shaklida yozish mumkin. Lekin parametr bo'lmasa yoki bittadan ko'p bo'lsa, qavs majburiy.
</details>

<details>
<summary><b>7. Arrow funksiyani \`new\` bilan ishlatish mumkinmi?</b></summary>
Yo'q. Arrow funksiyalarda \`[[Construct]]\` metodi yo'q, shuning uchun ularni konstruktor sifatida \`new\` kalit so'zi bilan chaqirib bo'lmaydi.
</details>

<details>
<summary><b>8. \`arguments\` obyekti arrow funksiyada bormi?</b></summary>
Yo'q, oddiy funksiyalardagi kabi \`arguments\` obyekti arrow funksiyada mavjud emas. Uning o'rniga rest parametridan (\`...args\`) foydalanish kerak.
</details>

<details>
<summary><b>9. Callback sifatida nima uchun arrow funksiya tavsiya etiladi?</b></summary>
Chunki sintaksisi qisqa, toza ko'rinadi va eng asosiysi, \`this\` kontekstini chalkashtirib (yo'qotib) qo'ymaydi.
</details>

<details>
<summary><b>10. Obyekt qaytarishda arrow funksiya sintaksisi qanday bo'ladi?</b></summary>
Bitta qatorda obyekt qaytarmoqchi bo'lsangiz, obyekt qavslarini oddiy qavslarga o'rashingiz shart: \`id => ({ id: id })\`. Aks holda \`{}\` ni funksiya bloki deb o'ylaydi.
</details>

<details>
<summary><b>11. Hoisting arrow funksiyalarda qanday ishlaydi?</b></summary>
Arrow funksiyalar \`const\` yoki \`let\` yordamida o'zgaruvchiga yuklangani sababli, ular hoisting qilinmaydi (yoki TDZga tushadi). Ularni faqat e'lon qilingandan keyingina chaqirish mumkin.
</details>

<details>
<summary><b>12. Qachon arrow funksiyadan ko'ra oddiy funksiya yaxshiroq?</b></summary>
Obyekt ichida dinamik metodlar (masalan \`obj.sayHi()\`) yaratishda \`this\` obj'ga teng bo'lishi kerak bo'lganda va Event Listener'larda \`this = event.target\` kerak bo'lganda.
</details>`,
  exercises: [
    {
      id: 1,
      title: "1️⃣ Arrow Yig'indi",
      instruction: "Ikkita sonni qo'shadigan 'add' arrow funksiyasini yozing.",
      startingCode: "// add funksiyasini yozing\n\nconsole.log(add(5, 3));",
      hint: "const add = (a, b) => a + b;",
      test: "if (add(5, 3) === 8) return null; return 'Qo\\'shish noto\\'g\\'ri';"
    },
    {
      id: 2,
      title: "2️⃣ Implicit Return",
      instruction: "Sonning kvadratini topadigan 'square' arrow funksiyasini (bitta qatorda, return so'ziziz) yozing.",
      startingCode: "// square funksiyasini yozing\n\nconsole.log(square(4));",
      hint: "const square = n => n * n;",
      test: "if (square(4) === 16 && !code.includes('return')) return null; return 'Implicit return ishlatilmadi';"
    },
    {
      id: 3,
      title: "3️⃣ Bitta Parametrli Arrow",
      instruction: "Faqat bitta 'son' parametrini oladigan va uni musbat bo'lsa true, manfiy bo'lsa false qaytaradigan 'isPositive' funksiyasini yozing. Qavssiz ishlating.",
      startingCode: "// isPositive funksiyasini yozing\n\nconsole.log(isPositive(10));",
      hint: "const isPositive = son => son > 0;",
      test: "if (isPositive(10) === true && isPositive(-5) === false) return null; return 'Funksiya noto\\'g\\'ri ishlayapti';"
    },
    {
      id: 4,
      title: "4️⃣ Obyekt Qaytarish",
      instruction: "ism va yosh qabul qilib, obyekt qaytaradigan 'createProfile' arrow funksiyasini yozing. Yodda tuting: ({...})",
      startingCode: "// createProfile funksiyasini yozing\n\nconsole.log(createProfile('Ali', 20));",
      hint: "const createProfile = (ism, yosh) => ({ ism, yosh });",
      test: "if (createProfile('Ali', 20).ism === 'Ali') return null; return 'Obyekt to\\'g\\'ri qaytarilmadi';"
    },
    {
      id: 5,
      title: "5️⃣ Map bilan qisqa yozish",
      instruction: "'nums' massividagi har bir sonni 2 ga ko'paytiring. Map metodining ichiga qisqa arrow function yozing.",
      startingCode: "const nums = [1, 2, 3];\n// Bu yerga yozing\nconst doubled = nums.map( /* shu yerga yozing */ );\nconsole.log(doubled);",
      hint: "nums.map(n => n * 2)",
      test: "if (doubled[2] === 6) return null; return 'Map ichida xatolik';"
    },
    {
      id: 6,
      title: "6️⃣ Filter bilan qisqa yozish",
      instruction: "Massivdan faqat toq sonlarni filter orqali qaytarib oling.",
      startingCode: "const nums = [1, 2, 3, 4, 5];\n// Bu yerga yozing\nconst odds = nums.filter( /* shu yerga yozing */ );\nconsole.log(odds);",
      hint: "nums.filter(n => n % 2 !== 0)",
      test: "if (odds.length === 3 && odds[1] === 3) return null; return 'Filter ichida xatolik';"
    },
    {
      id: 7,
      title: "7️⃣ setTimeout va Arrow",
      instruction: "setTimeout ichida anonim arrow function yozib, 10ms dan so'ng 'Salom' deb chiqaring.",
      startingCode: "// setTimeout ichiga arrow function yozing\nsetTimeout(  , 10);",
      hint: "setTimeout(() => console.log('Salom'), 10)",
      test: "if (code.includes('=>') && code.includes('setTimeout')) return null; return 'setTimeout da arrow function yo\\'q';"
    },
    {
      id: 8,
      title: "8️⃣ Lexical This (Obyekt ichida)",
      instruction: "'user' obyektining 'greet' metodida setTimeout bor. Ichidagi funksiyani arrow ga o'zgartiringki, 'this.name' topilsin.",
      startingCode: "const user = {\n  name: 'Bobur',\n  greet() {\n    // Buni arrow ga aylantiring\n    setTimeout(function() {\n      console.log('Salom, ' + this.name);\n    }, 10);\n  }\n};\nuser.greet();",
      hint: "setTimeout(() => { ... })",
      test: "if (code.includes('=>') && !code.includes('function()')) return null; return 'Arrow ga aylantirilmadi';"
    },
    {
      id: 9,
      title: "9️⃣ Rest parametr va Arrow",
      instruction: "Rest parametr (...args) yordamida uzatilgan barcha sonlarning uzunligini qaytaradigan funksiya yozing.",
      startingCode: "// countArgs funksiyasi\n\nconsole.log(countArgs(1, 2, 3, 4)); // 4 chiqishi kerak",
      hint: "const countArgs = (...args) => args.length;",
      test: "if (countArgs(1,2,3,4) === 4) return null; return 'Uzunlik qaytarilmadi';"
    },
    {
      id: 10,
      title: "🔟 Reduce va Arrow",
      instruction: "reduce() metodi yordamida massivdagi barcha sonlar yig'indisini arrow funksiya yordamida hisoblang.",
      startingCode: "const nums = [10, 20, 30];\n// Bu yerga yozing\nconst sum = nums.reduce( /* shu yerga yozing */ );\nconsole.log(sum);",
      hint: "nums.reduce((acc, curr) => acc + curr, 0)",
      test: "if (sum === 60) return null; return 'Reduce hisoblashi xato';"
    },
    {
      id: 11,
      title: "1️⃣1️⃣ String interpolatsiyasi (Template literal)",
      instruction: "Ismni parametr sifatida qabul qilib, 'Salom, [ism]!' matnini qaytaradigan arrow funksiya yozing.",
      startingCode: "// sayHello funksiyasi\n\nconsole.log(sayHello('Zuhra'));",
      hint: "const sayHello = name => `Salom, ${name}!`;",
      test: "if (sayHello('Zuhra') === 'Salom, Zuhra!') return null; return 'Matn xato';"
    },
    {
      id: 12,
      title: "1️⃣2️⃣ Currying (Eng Qiyin)",
      instruction: "Bitta son qabul qilib, yana bitta son qabul qiladigan arrow funksiya qaytaradigan (currying) yozuv. Natijada ularning yig'indisi hisoblansin.",
      startingCode: "// add funksiyasini yozing: add(a)(b)\n\nconsole.log(add(5)(3)); // 8",
      hint: "const add = a => b => a + b;",
      test: "if (add(5)(3) === 8) return null; return 'Currying qilinmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Arrow funksiyalarning an'anaviy `function` kalit so'zi yordamida yaratilgan funksiyalardan asosiy farqi nimada?",
      options: [
        "Arrow funksiyalarda o'zining shaxsiy `this` bog'lanishi (binding) mavjud emas, u `this`ni tashqi lexical doiradan meros oladi",
        "Arrow funksiyalar sekinroq ishlaydi",
        "Arrow funksiyalarni faqat serverda ishlatish mumkin",
        "Arrow funksiyalar faqat musbat sonlarni qaytara oladi"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiyalar o'zining `this` qiymatiga ega emas. Ular `this` ni o'zlarini o'rab turgan tashqi (lexical) kontekstdan qabul qilishadi."
    },
    {
      id: 2,
      question: "Arrow funksiya yordamida bitta qatorda obyekt qaytarmoqchi bo'lsak, qaysi sintaksis to'g'ri hisoblanadi?",
      options: [
        "`const user = () => { name: 'Ali' };`",
        "`const user = () => ({ name: 'Ali' });`",
        "`const user = () => return { name: 'Ali' };`",
        "`const user = () => [ name: 'Ali' ];`"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar `{}` funksiya tanasini (block) anglatgani uchun, obyekt literali qaytarilayotganda chalkashlik yuzaga kelmasligi uchun obyekt qavslar ichiga `({ ... })` olinishi shart."
    },
    {
      id: 3,
      question: "Arrow funksiyada `arguments` obyekti mavjudmi?",
      options: [
        "Ha, u oddiy funksiyadagi kabi to'liq ishlaydi",
        "Yo'q, arrow funksiyalarda `arguments` obyekti yo'q. Buning o'rniga rest parametrlardan (`...args`) foydalanish kerak",
        "Ha, lekin faqat massiv ko'rinishida bo'ladi",
        "Faqat `strict mode` yoqilganda mavjud bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalarda `arguments` maxsus o'zgaruvchisi yo'q. Agar kiruvchi argumentlar oqimini olish kerak bo'lsa, rest `...args` parametrlaridan foydalanish zarur."
    },
    {
      id: 4,
      question: "Arrow funksiyani `new` kalit so'zi yordamida konstruktor sifatida chaqirsa nima sodir bo'ladi?",
      options: [
        "Yangi obyekt muvaffaqiyatli yaratiladi",
        "TypeError: [FunctionName] is not a constructor xatosi yuz beradi",
        "Funksiya oddiy funksiya kabi bajariladi, lekin obyekt qaytarmaydi",
        "Sahifa avtomatik qayta yuklanadi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar `prototype` xususiyatiga ega emas, shu sababli ularni `new` kalit so'zi orqali konstruktor sifatida ishlatib bo'lmaydi va xatolik beradi."
    },
    {
      id: 5,
      question: "Arrow funksiyalar qachon \"hoisted\" bo'ladi (kodning yuqorisiga ko'tariladi)?",
      options: [
        "Har doim, chunki them funksiya hisoblanadi",
        "Ular e'lon qilinish shakliga (masalan, const/let o'zgaruvchisiga biriktirilganiga) bog'liq. Ular hoisted bo'lmaydi va Temporal Dead Zone (TDZ) ga bo'ysunadi",
        "Faqat var bilan e'lon qilinganda funksiya sifatida hoisted bo'ladi",
        "Faqat brauzer o'chib yonganda hoisted bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Arrow funksiyalar ifoda (Expression) sifatida e'lon qilinadi (odatda `const` yoki `let` bilan). Shuning uchun o'zgaruvchilar kabi ular ham hoisted bo'lmaydi va e'lon qilinishidan oldin ishlatib bo'lmaydi."
    }
  ]
};
