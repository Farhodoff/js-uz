export const typeConversionLesson = {
  id: "typeConversionLesson",
  title: "Type Conversion (Turlarni O'zgartirish)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Type Conversion (Turlarni O'zgartirish) nima?
JavaScript **dinamik tiplangan** (dynamically typed) tildir. Bu shuni anglatadiki, o'zgaruvchilar ma'lum bir ma'lumot turi (datatype) bilan cheklanib qolmaydi. Turlarni o'zgartirish ikki xil ko'rinishda bo'ladi:
* **Explicit Conversion (Aniq o'zgartirish):** Dasturchi kod orqali qiymat turini aniq o'zgartirishi (\`Number()\`, \`String()\`).
* **Implicit Coercion (Yashirin o'zgartirish):** JavaScript dvigateli amallarni bajarish paytida qiymat turini avtomatik boshqa turga o'tkazishi (\`5 + '5'\`).

### Real hayotiy o'xshatish
Tasavvur qiling, siz **chet elga sayohatga chiqdingiz**:
* **Explicit Conversion:** Bankka borib, Dollaringizni aniq kurs bo'yicha So'mga almashtirasiz. Siz jarayonni to'liq nazorat qilasiz.
* **Implicit Coercion:** Kafeda xalqaro plastik kartangiz orqali to'lov qilasiz. Terminal orqa fonda avtomatik ravishda pulni mahalliy valyutaga o'zgartirib to'lovni amalga oshiradi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Aniq o'zgartirish)
\`\`\`javascript
const age = 25;
const ageAsString = String(age); 
console.log(typeof ageAsString); // "string"

const price = "199.99";
const priceAsNumber = Number(price);
console.log(typeof priceAsNumber); // "number"
\`\`\`

### 2. Intermediate Example (Yashirin o'zgartirish)
\`\`\`javascript
console.log("Qimmat: " + 100); // "Qimmat: 100" (Raqam stringga aylandi)
console.log("5" * "3");        // 15 (Ikkala string ham raqamga aylandi)
console.log("abc" - 2);        // NaN (Matnni raqamga o'girib bo'lmagani uchun)
\`\`\`

---

## 3. ❌ YOMON va ✅ YAXSHI Misollar

❌ YOMON (Implicit coercion orqali chalkashlik):
\`\`\`javascript
const input = "0";
if (input == false) { // true qaytaradi, chunki "0" avval 0 ga aylanadi, false ham 0 ga aylanadi.
  console.log("Bu juda xavfli!"); 
}
\`\`\`

✅ YAXSHI (Explicit conversion va Strict equality):
\`\`\`javascript
const input = "0";
if (Number(input) === 0) { // Aniq tekshirish
  console.log("Xavfsiz va aniq ishlaydi.");
}
\`\`\`

---

## 4. ⚙️ Mermaid Diagrammasi

\`\`\`mermaid
graph TD
    Start[Original Value] --> Explicit[Aniq O'zgartirish]
    Start --> Implicit[Yashirin O'zgartirish]
    
    Explicit --> NumFunc["Number(x)"]
    Explicit --> StrFunc["String(x)"]
    
    Implicit --> MathOps["Matematik: +, -, *, /"]
    Implicit --> LooseEq["Loose Equality: ==, !="]
    
    NumFunc --> NumOut[Number / NaN]
    MathOps --> NumOut
    StrFunc --> StrOut[String]
\`\`\`

---

## 5. 💬 Intervyu Savollari

1. **Savol:** JavaScriptda yashirin (implicit) va aniq (explicit) tur o'zgartirish nima?
   * **Javob:** Aniq o'zgartirish dasturchi tomonidan \`Number()\` yoki \`String()\` yordamida qasddan yoziladi. Yashirin o'zgartirish esa dastur ishlashi paytida (masalan, \`+\` operatori) JS dvigateli tomonidan avtomatik qilinadi.
2. **Savol:** Qaysi qiymatlar falsy (yolg'on) deb hisoblanadi?
   * **Javob:** Faqat 8 ta: \`false\`, \`0\`, \`-0\`, \`0n\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`. Boshqa hamma narsa truthy.
3. **Savol:** \`Number("10px")\` va \`parseInt("10px")\` farqi nimada?
   * **Javob:** \`Number\` qat'iy bo'lib \`NaN\` qaytaradi, \`parseInt\` esa boshidagi raqamni ajratib \`10\` qaytaradi.
4. **Savol:** Nima uchun \`[] == false\` natijasi \`true\` bo'ladi?
   * **Javob:** Bo'sh massiv stringga aylanib \`""\` bo'ladi. \`==\` false ni raqamga (\`0\`) va \`""\` ni raqamga (\`0\`) aylantirib, \`0 == 0\` bo'lib \`true\` qaytadi.
`,
  exercises: [
    {
      id: 1,
      title: "Raqamga O'zgartirish",
      instruction: "Foydalanuvchidan olingan qiymatni aniq raqamga aylantiruvchi `toNumber(val)` funksiyasini yozing. Agar qabul qilingan qiymat raqamga aylanmasa (NaN), u `0` qaytarsin.",
      startingCode: "function toNumber(val) {\n  // Code\n}",
      hint: "Number() va isNaN() ishlating.",
      test: "const fn = new Function(code + '; return toNumber;')(); return fn('42') === 42 && fn('abc') === 0 && fn(null) === 0;"
    },
    {
      id: 2,
      title: "Stringga O'zgartirish",
      instruction: "Raqamni stringga o'tkazuvchi `toStringValue(num)` funksiyasini yozing.",
      startingCode: "function toStringValue(num) {\n  // Code\n}",
      hint: "String(num) yoki num.toString() ishlatish mumkin.",
      test: "const fn = new Function(code + '; return toStringValue;')(); return fn(123) === '123' && typeof fn(123) === 'string';"
    },
    {
      id: 3,
      title: "Falsy tekshirish",
      instruction: "Qiymat falsy ekanligini tekshiruvchi `isFalsy(val)` funksiyasini yozing. Falsy bo'lsa `true`, truthy bo'lsa `false` qaytarsin.",
      startingCode: "function isFalsy(val) {\n  // Code\n}",
      hint: "!val ishlating",
      test: "const fn = new Function(code + '; return isFalsy;')(); return fn(0) === true && fn('') === true && fn('hi') === false;"
    },
    {
      id: 4,
      title: "Bo'sh massiv boolean qiymati",
      instruction: "Massivlar boolean kontekstda har doim nima bo'lishini ko'rsatish uchun `checkArrayTruthiness()` funksiyasi `true` qaytarishi kerak. Uni faqat `Boolean([])` dan qaytarib yozing.",
      startingCode: "function checkArrayTruthiness() {\n  // Code\n}",
      hint: "return Boolean([]);",
      test: "const fn = new Function(code + '; return checkArrayTruthiness;')(); return fn() === true;"
    },
    {
      id: 5,
      title: "Matematik Coercion",
      instruction: "`multiplyStrings(a, b)` funksiyasi ikkita string shaklidagi raqamlarni olib, ularning ko'paytmasini (Number) qaytarishi kerak.",
      startingCode: "function multiplyStrings(a, b) {\n  // Code\n}",
      hint: "Shunchaki a * b qilish kifoya, JS o'zi o'zgartiradi",
      test: "const fn = new Function(code + '; return multiplyStrings;')(); return fn('5', '3') === 15;"
    },
    {
      id: 6,
      title: "Qo'shish muammosi",
      instruction: "`addStringsSafely(a, b)` funksiyasini yozing. Agar stringlar shunchaki `+` qilinsa ulanib ketadi. Siz ularni matematik raqam sifatida qo'shishingiz kerak.",
      startingCode: "function addStringsSafely(a, b) {\n  // Code\n}",
      hint: "Number(a) + Number(b) ishlating.",
      test: "const fn = new Function(code + '; return addStringsSafely;')(); return fn('5', '3') === 8;"
    },
    {
      id: 7,
      title: "parseInt ishlatish",
      instruction: "`extractNumber(str)` funksiyasini yozing. U matn ichidan (masalan, '120px') faqat raqam qismini olib, number qaytarsin.",
      startingCode: "function extractNumber(str) {\n  // Code\n}",
      hint: "parseInt() dan foydalaning.",
      test: "const fn = new Function(code + '; return extractNumber;')(); return fn('120px') === 120;"
    },
    {
      id: 8,
      title: "parseFloat ishlatish",
      instruction: "`extractFloatNumber(str)` funksiyasini yozing. Masalan '12.5em' dan 12.5 (number) qaytarsin.",
      startingCode: "function extractFloatNumber(str) {\n  // Code\n}",
      hint: "parseFloat() dan foydalaning.",
      test: "const fn = new Function(code + '; return extractFloatNumber;')(); return fn('12.5em') === 12.5;"
    },
    {
      id: 9,
      title: "Loose Equality vs Strict",
      instruction: "`isStrictEqual(a, b)` funksiyasi ikkita argument oladi. Faqat qat'iy (strict) teng bo'lsagina `true` qaytarsin.",
      startingCode: "function isStrictEqual(a, b) {\n  // Code\n}",
      hint: "=== ishlating.",
      test: "const fn = new Function(code + '; return isStrictEqual;')(); return fn('5', 5) === false && fn(5, 5) === true;"
    },
    {
      id: 10,
      title: "NaN ni tekshirish",
      instruction: "`checkIfNaN(val)` funksiyasi qiymat NaN bo'lsa `true` qaytarsin, aks holda `false`.",
      startingCode: "function checkIfNaN(val) {\n  // Code\n}",
      hint: "Number.isNaN() ishlating.",
      test: "const fn = new Function(code + '; return checkIfNaN;')(); return fn(NaN) === true && fn(5) === false;"
    }
  ],
  quizzes: [
    {
      question: "\`console.log(typeof (\"5\" - 3))\` natijasi nima bo'ladi?",
      options: ["\"string\"", "\"number\"", "\"NaN\"", "\"undefined\""],
      correctAnswer: 1,
      explanation: "Ayirish '-' operatori doim raqamga o'giradi. Natija 2, uning turi 'number'."
    },
    {
      question: "\`console.log(\"5\" + 3)\` natijasi nima bo'ladi?",
      options: ["8", "\"53\"", "NaN", "TypeError"],
      correctAnswer: 1,
      explanation: "Qo'shish operatori '+' da string bor bo'lsa concatenation (ulash) bo'ladi."
    },
    {
      question: "Qaysi biri falsy qiymat hisoblanadi?",
      options: ["\" \" (bo'sh joyli string)", "[] (bo'sh massiv)", "0", "{}"],
      correctAnswer: 2,
      explanation: "Faqat 0 falsy. Bo'sh massiv, bo'sh obyekt va bo'sh joyli string truthy."
    },
    {
      question: "\`Number(null)\` nima qaytaradi?",
      options: ["NaN", "0", "null", "undefined"],
      correctAnswer: 1,
      explanation: "JavaScriptda null qiymati raqamga o'girilganda 0 ga teng bo'ladi."
    },
    {
      question: "\`Number(undefined)\` nima qaytaradi?",
      options: ["NaN", "0", "undefined", "1"],
      correctAnswer: 0,
      explanation: "undefined qiymatini raqamga o'girib bo'lmaydi, natija NaN (Not a Number)."
    },
    {
      question: "\`console.log(true + false)\` nima natija beradi?",
      options: ["true", "false", "1", "NaN"],
      correctAnswer: 2,
      explanation: "true = 1, false = 0. Ularning yig'indisi 1 ga teng."
    },
    {
      question: "\`console.log(1 + 2 + \"3\")\` natijasi qanday?",
      options: ["\"123\"", "\"33\"", "6", "NaN"],
      correctAnswer: 1,
      explanation: "1+2 = 3 bo'ladi, keyin string bilan qo'shilganda ulanadi '33'."
    },
    {
      question: "\`NaN == NaN\` natijasi nima?",
      options: ["true", "false", "undefined", "SyntaxError"],
      correctAnswer: 1,
      explanation: "NaN hech narsaga, hatto o'ziga ham teng emas."
    },
    {
      question: "\`console.log(!!\"hello\")\` nima qaytaradi?",
      options: ["true", "false", "\"hello\"", "NaN"],
      correctAnswer: 0,
      explanation: "Ikkita inkor belgisi (!!) qiymatni to'g'ridan-to'g'ri boolean turiga o'giradi. Bo'sh bo'lmagan string truthy."
    },
    {
      question: "\`[] == false\` nega true beradi?",
      options: ["Massivlar false ga teng.", "Massiv stringga (''), keyin raqamga (0) o'giriladi.", "Bu xatolik.", "Ikkalasi null ga teng."],
      correctAnswer: 1,
      explanation: "JavaScript bo'sh massivni avval bo'sh stringga, so'ng 0 ga o'giradi. false ham 0. Natija 0 == 0 -> true."
    },
    {
      question: "\`parseInt(\"10.5px\")\` nimani qaytaradi?",
      options: ["10.5", "10", "NaN", "\"10.5px\""],
      correctAnswer: 1,
      explanation: "parseInt matn boshidagi butun raqamni oladi, nuqta va harflarni tashlab yuboradi."
    },
    {
      question: "Implicit Coercion degani nima?",
      options: ["Dasturchi tomonidan qilingan aniq o'zgartirish.", "JavaScript dvigateli tomonidan qilingan yashirin o'zgartirish.", "Faqat arraylar bilan ishlaydigan jarayon.", "Hech biri."],
      correctAnswer: 1,
      explanation: "Implicit Coercion bu JavaScript amallar davomida turlarni o'zi avtomatik tarzda moslashtirishidir."
    }
  ]
};
