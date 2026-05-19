export const hoistingThisLesson = {
  id: "hoisting",
  title: "Hoisting (Ko'tarilish)",
  level: "Beginner",
  description: "JavaScript kodni o'qishdan oldin nimalarni 'tepaga ko'tarib' qo'yishi haqida sirlar.",
  theory: `
# Hoisting – Bu nima va nima uchun kerak?

**Hoisting** (Ko'tarilish) — bu JavaScript kodni ishga tushirishdan oldin e'lon qilingan o'zgaruvchilar va funksiyalarni kodning eng tepasiga "ko'chirish" jarayonidir.

## 1. NEGA kerak?
Aslida bu JS dvigatelining (engine) ishlash tabiati bilan bog'liq. U kodni o'qishdan oldin bir marta ko'z yugurtirib chiqadi va nimalar borligini xotiraga yozib oladi. Bu bizga ba'zi funksiyalarni ular e'lon qilinishidan oldin ham ishlatish imkonini beradi.

## 2. SODDALIK (Analogiya)
Buni kitobning **mundarijasi** deb tasavvur qiling. Siz kitobni o'qishni boshlamasangiz ham, mundarijaga qarab qaysi mavzu qayerda ekanligini bilib olasiz. JS ham kodni o'qishdan oldin "mundarija" (xotira xaritasi) tuzib oladi.

## 3. STRUKTURA

### A. var bilan Hoisting
\`var\` tepaga ko'tariladi, lekin uning qiymati \`undefined\` bo'lib turadi:
\`\`\`javascript
console.log(a); // undefined (xato bermaydi!)
var a = 10;
\`\`\`

### B. let va const bilan Hoisting
Bular ham ko'tariladi, lekin ularni e'lon qilingan qatorga yetmaguncha ishlatib bo'lmaydi. Bu hudud **TDZ** (Temporal Dead Zone) deyiladi.
\`\`\`javascript
console.log(b); // Xato! (ReferenceError)
let b = 20;
\`\`\`

### C. Funksiya Hoisting
Oddiy funksiyalar (declarations) to'liq ko'tariladi:
\`\`\`javascript
salom(); // "Salom!" (ishlaydi ✅)
function salom() { console.log("Salom!"); }
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
console.log(ism); // undefined
var ism = "Farhod";
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Hoistingga ishonib qolish:** Doim o'zgaruvchilarni ishlatishdan oldin e'lon qiling. Bu kodni o'qishni osonlashtiradi.
2. **Function Expressions:** \`var x = function() {}\` ko'rinishidagi funksiyalar to'liq ko'tarilmaydi, faqat o'zgaruvchi sifatida ko'tariladi.

## 6. SAVOLLAR (12 ta)
1. Hoisting nima?
2. JavaScript kodni o'qishdan oldin necha marta ko'z yugurtiradi?
3. \`var\` o'zgaruvchisi hoist bo'lganda qiymati nima bo'ladi?
4. \`let\` va \`const\` hoist bo'ladimi?
5. Temporal Dead Zone (TDZ) nima?
6. Qaysi turdagi funksiyalar to'liq hoist bo'ladi?
7. Funksiya expression (o'zgaruvchiga saqlangan funksiya) hoist bo'ladimi?
8. \`undefined\` va \`ReferenceError\` farqi nimada (hoisting misolida)?
9. Hoisting JS tilining xatosimi yoki xususiyatimi?
10. Nima uchun \`var\` o'rniga \`let\` ishlatish tavsiya etiladi (hoisting sababli)?
11. Hoisting faqat global scope'da bo'ladimi?
12. Klaslar (Classes) hoist bo'ladimi?`,
  exercises: [
    {
      id: 1,
      title: "Hoisting testi",
      instruction: "Funksiyani e'lon qilinishidan oldin chaqiring.",
      startingCode: "// Bu yerda chaqiring\n\nfunction salom() {\n  console.log('Salom');\n}",
      hint: "salom(); deb yozing.",
      test: "if (logs.includes('Salom')) return null; return 'Funksiya chaqirilmadi';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Quyidagi kod ishga tushganda nima chop etiladi?\n```javascript\nconsole.log(x);\nvar x = 5;\n```",
      options: ["5", "undefined", "ReferenceError", "TypeError"],
      correctAnswer: 1,
      explanation: "`var` yordamida e'lon qilingan o'zgaruvchilar o'zining scope doirasida ko'tariladi (hoisting), lekin ularning qiymat tayinlovi (initialization) joyida qoladi. Shuning uchun qiymat yuklanguniga qadar uning qiymati `undefined` bo'ladi."
    },
    {
      id: 2,
      question: "Quyidagi `let` o'zgaruvchisi bilan yozilgan kod nima natija beradi?\n```javascript\nconsole.log(y);\nlet y = 10;\n```",
      options: ["10", "undefined", "ReferenceError (Temporal Dead Zone)", "TypeError"],
      correctAnswer: 2,
      explanation: "`let` va `const` o'zgaruvchilari ham hoist bo'ladi, lekin ular TDZ (Temporal Dead Zone - Vaqtinchalik O'lik Hudud) doirasida bo'ladi. Ularga e'lon qilinishidan oldin murojaat qilinsa, `ReferenceError` xatoligi tashlanadi."
    },
    {
      id: 3,
      question: "Ushbu kodni tahlil qilib natijasini ayting:\n```javascript\ngreet();\nfunction greet() {\n  console.log(\"Salom\");\n}\n```",
      options: ["\"Salom\"", "TypeError: greet is not a function", "ReferenceError", "undefined"],
      correctAnswer: 0,
      explanation: "Function Declarations (oddiy e'lon qilingan funksiyalar) to'liq (tanasi bilan birga) tepaga ko'tariladi. Shuning uchun ularni e'lon qilinishidan oldin ham bemalol chaqirish mumkin."
    },
    {
      id: 4,
      question: "Function Expression (o'zgaruvchiga yuklangan funksiya) hoisting qoidasiga ko'ra nima natija beradi?\n```javascript\ngreet();\nvar greet = function() {\n  console.log(\"Salom\");\n};\n```",
      options: ["\"Salom\"", "TypeError: greet is not a function", "ReferenceError", "undefined"],
      correctAnswer: 1,
      explanation: "`var greet` o'zgaruvchi sifatida ko'tariladi va unga `undefined` qiymat beriladi. Hali funksiya yuklanmagani sababli, `undefined()` ko'rinishida chaqirilmoqda va bu `TypeError` (greet funksiya emas) xatosiga olib keladi."
    },
    {
      id: 5,
      question: "Parametr va var o'zgaruvchisi to'qnashuvida nima sodir bo'ladi?\n```javascript\nfunction test(x) {\n  console.log(x);\n  var x = 20;\n}\ntest(10);\n```",
      options: ["10", "20", "undefined", "ReferenceError"],
      correctAnswer: 0,
      explanation: "Funksiya parametrlari funksiya tanasidagi kod bajarilishidan oldin scope'da yaratiladi va qiymatlanadi. `var x` e'lon qilinganda, scope'da allaqachon `x` borligi uchun u shunchaki qayta e'lon qilinadi va qiymat `var x = 20` qatoriga yetib bormaguncha parametrning qiymati (`10`) o'zgarmasdan saqlanib turadi."
    }
  ]
};
