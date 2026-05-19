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

## 6. SAVOLLAR (12 ta)
1. Arrow function qachon paydo bo'lgan?
2. Arrow function va oddiy funksiyaning sintaksis farqi nima?
3. Implicit return nima?
4. Arrow funksiyada qachon \`return\` yozish shart?
5. \`this\` kalit so'zi arrow funksiyada qanday ishlaydi?
6. Bitta parametr bo'lsa qavslarni yozish shartmi?
7. Arrow funksiyani \`new\` bilan ishlatish mumkinmi?
8. \`arguments\` obyekti arrow funksiyada bormi?
9. Callback sifatida nima uchun arrow funksiya tavsiya etiladi?
10. Obyekt qaytarishda arrow funksiya sintaksisi qanday bo'ladi?
11. Hoisting arrow funksiyalarda qanday ishlaydi?
12. Qachon arrow funksiyadan ko'ra oddiy funksiya yaxshiroq?`,
  exercises: [
    {
      id: 1,
      title: "Arrow Multiply",
      instruction: "Ikkita sonni ko'paytiradigan arrow funksiya yozing (bitta qatorda).",
      startingCode: "const multiply = \n\nconsole.log(multiply(3, 4));",
      hint: "const multiply = (a, b) => a * b;",
      test: "if (multiply(3, 4) === 12) return null; return 'Ko\\'paytirish noto\\'g\\'ri';"
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
