export const jsGotchas = {
  id: "jsGotchas",
  title: "JavaScript Gotchas (Tuzoqlar)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### JavaScript "Tuzoqlari" (Gotchas) nima?
JavaScript tezda (atigi 10 kunda) yaratilgan til bo'lganligi sababli, unda o'ziga xos qoidalar (tarixiy baglar yoki dizayn qarorlari) bor. Ular ko'pincha "Gotchas" (Tuzoqlar) deb ataladi. Ular tilning rasmiy qoidalari, lekin odatdagi inson mantig'ini chalg'itishi mumkin.

### Real hayotiy o'xshatish
Tasavvur qiling, siz supermarketda **ikkita bo'sh savatni** birlashtirsangiz, u havoga aylanadi. Yoki taroziga **olmani** qo'ysangiz, u sizga "Bu meva emas, obyektdir" deydi. JavaScript-dagi avtomatik tip o'zgarishlari (coercion) aynan shunga o'xshaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Type Coercion (Avtomatik tip o'zgarishi)
\`\`\`javascript
console.log([] + []); // "" (Bo'sh satrlar birlashadi)
console.log([] + {}); // "[object Object]"
console.log(1 < 2 < 3); // true (1<2 -> true; true<3 -> 1<3 -> true)
console.log(3 > 2 > 1); // false (3>2 -> true; true>1 -> 1>1 -> false)
\`\`\`

### 2. NaN (Not-a-Number) injiqliklari
\`\`\`javascript
console.log(typeof NaN); // "number" (Garchi nomi "Son emas" bo'lsa ham!)
console.log(NaN === NaN); // false (JS-da o'z-o'ziga teng emas)
console.log(Number.isNaN("salom")); // false (Qat'iy tekshiruv)
console.log(isNaN("salom")); // true (Eski usul, stringni NaN deb oladi)
\`\`\`

### 3. null va 0 ning o'zaro munosabati
\`\`\`javascript
console.log(null > 0);  // false 
console.log(null == 0); // false (null faqat undefined bilan teng)
console.log(null >= 0); // true  (Taqqoslash null ni 0 ga aylantiradi)
\`\`\`

### 4. Floating Point xatosi
\`\`\`javascript
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004
\`\`\`

### 5. Automatic Semicolon Insertion (ASI)
\`\`\`javascript
function getObject() {
  return 
  {
    status: "ok"
  };
}
console.log(getObject()); // undefined (return yoniga ; tushgan)
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)
1. JavaScript qat'iy tipli emas, u imkoni boricha hamma narsani string, son yoki boolean ga avtomatik (implicit) tarzda o'girishga urinadi. Bu algoritmlar "ToPrimitive", "ToString", "ToNumber" deb ataladi.
2. IEEE-754 standarti tufayli suzuvchi nuqtali sonlarda mantiqiy xatolar bor.
3. typeof null === "object" xatosi tarixiy qoldiqdir va eski saytlar buzilmasligi uchun to'g'irlanmagan.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (YOMON / YAXSHI)

### 1. \`==\` noqattiq tenglik ishlati
🔴 **YOMON:** 
\`\`\`javascript
if (0 == false) { ... } // true, lekin xavfli 
\`\`\`
🟢 **YAXSHI:** (Qat'iy tenglik \`===\`)
\`\`\`javascript
if (0 === false) { ... } // false, tiplar ham solishtiriladi
\`\`\`

### 2. \`typeof null\` ga ishonish
🔴 **YOMON:** 
\`\`\`javascript
if (typeof obj === "object") { // null ham shu blokga tushib ketadi }
\`\`\`
🟢 **YAXSHI:** 
\`\`\`javascript
if (obj !== null && typeof obj === "object") { // endi xavfsiz }
\`\`\`

### 3. ASI va \`return\` xatosi
🔴 **YOMON:**
\`\`\`javascript
return
  { id: 1 }; // undefined
\`\`\`
🟢 **YAXSHI:**
\`\`\`javascript
return { 
  id: 1 
}; 
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

1. **Savol:** \`0.1 + 0.2 === 0.3\` nima qaytaradi va nega?
   * **Javob:** \`false\`. Ikkilik (binary) kasrlarda cheksizlik yuz bergani sababli IEEE-754 xatosi.
2. **Savol:** \`typeof null\` nimaga teng?
   * **Javob:** \`"object"\` qaytaradi, bu dastlabki JS versiyalaridagi qolgan bug.
3. **Savol:** \`NaN === NaN\` natijasi nima?
   * **Javob:** \`false\`. Uni tekshirish uchun \`Number.isNaN()\` kerak.
4. **Savol:** \`[] + []\` natijasi nima?
   * **Javob:** \`""\` (bo'sh satr).
5. **Savol:** \`null >= 0\` va \`null == 0\` farqi?
   * **Javob:** \`null >= 0\` true qaytaradi chunki relatsion operatorlar nullni 0 qiladi. \`null == 0\` esa false.
6. **Savol:** \`[] + {}\` natijasi nima?
   * **Javob:** \`"[object Object]"\`.
7. **Savol:** ASI nima?
   * **Javob:** Automatic Semicolon Insertion - JavaScript qator oxiriga o'zi nuqtali vergul qistiradi.
8. **Savol:** \`3 > 2 > 1\` natijasi?
   * **Javob:** \`false\`. (\`true > 1\` -> \`1 > 1\` -> \`false\`).
9. **Savol:** Obyekt deb ishonishdan oldin null ni qanday ajratasiz?
   * **Javob:** \`val !== null && typeof val === 'object'\`.
10. **Savol:** \`Array(3)\` qanday massiv yaratadi?
    * **Javob:** Bo'sh slotlarga ega massiv (sparse array). Metodlar ularni hisobga olmaydi.
11. **Savol:** \`Object.is()\` nima?
    * **Javob:** Bu yanada aniq tenglik tekshiruvi. Masalan \`Object.is(NaN, NaN)\` true beradi.
12. **Savol:** Sof tiplarni solishtirish uchun qaysi vositalar kerak?
    * **Javob:** \`===\`, \`Number.isNaN()\`, yoki maxsus tiplash metodlari.

---

## 6. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    A[JS Tuzoqlari] --> B[Coercion]
    A --> C[NaN]
    A --> D[ASI]

    B --> B1["[] + [] -> ''"]
    B --> B2["null >= 0 -> true"]
    C --> C1["NaN === NaN -> false"]
    D --> D1["return (newline) {} -> undefined"]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxirida mini-testlarni tekshirib chiqing.

---

## 8. 🎯 Real Project Case Study

E-commerce loyihalarida summa:
\`\`\`javascript
const price = 0.10;
const tax = 0.20;
// Yomon usul
const total = price + tax; // 0.300000000004
// Yaxshi usul (Cents / Tiyinlarda)
const finalTotal = ((price * 100) + (tax * 100)) / 100; // 0.3
\`\`\`

---

## 9. 🚀 Performance va Optimization

* Tiplar tekshiruvini qattiq (\`===\`) qiling. V8 kabi dvigatellar buni oson optimallashtiradi.
* Moliya bilan ishlayotganda JS standart arifmetikasiga ishonmang. Tiynlarda ishlang yoki decimal.js dan foydalaning.

---

## 10. 📌 Cheat Sheet

| Amal | Natija | Sababi |
| :--- | :--- | :--- |
| \`0.1 + 0.2\` | \`0.300...4\` | IEEE 754 float xatosi |
| \`typeof null\` | \`"object"\` | Tarixiy bug |
| \`NaN === NaN\` | \`false\` | O'ziga o'zi teng emas |
| \`[] + []\` | \`""\` | Massivlar stringga o'tadi |
| \`null >= 0\` | \`true\` | Null son sifatida 0 deb olinadi |
`,
  exercises: [
    {
      id: 1,
      title: "Suzuvchi nuqta qo'shilishi",
      instruction: "`safeAdd(a, b)` a va b ni qo'shib uning `toFixed(12)` dan o'tkazilgan `Number` variantini qaytarsin.",
      startingCode: "function safeAdd(a, b) {\n  \n}",
      hint: "return Number((a+b).toFixed(12));",
      test: "const fn = new Function(code + '; return safeAdd;')(); if(fn(0.1, 0.2)!==0.3) return 'Xato'; return null;"
    },
    {
      id: 2,
      title: "Haqiqiy NaN",
      instruction: "`isExactlyNaN(val)` agar aynan NaN bo'lsa true qaytarsin (`Number.isNaN()` ni ishlatish mumkin).",
      startingCode: "function isExactlyNaN(val) {\n  \n}",
      hint: "return Number.isNaN(val);",
      test: "const fn = new Function(code + '; return isExactlyNaN;')(); if(fn(NaN)!==true || fn('123')!==false) return 'Xato'; return null;"
    },
    {
      id: 3,
      title: "ASI dan qochish",
      instruction: "Quyidagi `getObj()` da xato bor, `return` dan keyin obyekt tushib qolgan. Shuni tuzatingki u to'g'ri qaytarsin.",
      startingCode: "function getObj() {\n  return \n  {\n    name: \"JS\"\n  };\n}",
      hint: "return { ni bir qatorda yozing.",
      test: "const fn = new Function(code + '; return getObj;')(); if(fn() && fn().name === 'JS') return null; return 'ASI xatosi saqlanib qoldi';"
    },
    {
      id: 4,
      title: "null tekshiruvi",
      instruction: "`isObject(val)` yozing. U agar val obyekt bo'lsa va null bo'lmasa true qaytarsin.",
      startingCode: "function isObject(val) {\n  \n}",
      hint: "return val !== null && typeof val === 'object';",
      test: "const fn = new Function(code + '; return isObject;')(); if(fn(null)!==false || fn({})!==true) return 'Xato'; return null;"
    },
    {
      id: 5,
      title: "[] + []",
      instruction: "`concatArrays()` shunchaki `[] + []` ifodasi natijasini string sifatida qaytarsin.",
      startingCode: "function concatArrays() {\n  \n}",
      hint: "return [] + [];",
      test: "const fn = new Function(code + '; return concatArrays;')(); if(fn()!=='') return 'Xato'; return null;"
    },
    {
      id: 6,
      title: "null >= 0 qizig'i",
      instruction: "`nullCompare()` yozing, u massivda uchta natijani qaytarsin: `[null>0, null>=0, null==0]`.",
      startingCode: "function nullCompare() {\n  \n}",
      hint: "return [null>0, null>=0, null==0];",
      test: "const fn = new Function(code + '; return nullCompare;')(); const res=fn(); if(res[0]!==false || res[1]!==true || res[2]!==false) return 'Xato'; return null;"
    },
    {
      id: 7,
      title: "3 > 2 > 1",
      instruction: "`weirdCompare()` 3 > 2 > 1 ifodasi qiymatini qaytarsin.",
      startingCode: "function weirdCompare() {\n  \n}",
      hint: "return 3 > 2 > 1;",
      test: "const fn = new Function(code + '; return weirdCompare;')(); if(fn()!==false) return 'Xato'; return null;"
    },
    {
      id: 8,
      title: "Sparse Array muammosi",
      instruction: "`Array(3)` yaratib ichini to'ldirish kerak, toki map ishlasin. Buning uchun `Array(3).fill(0)` yordamida `[0,0,0]` qilib qaytaruvchi `getFilled()` yozing.",
      startingCode: "function getFilled() {\n  \n}",
      hint: "return Array(3).fill(0);",
      test: "const fn = new Function(code + '; return getFilled;')(); const r = fn(); if(r.length!==3 || r[0]!==0) return 'Xato'; return null;"
    },
    {
      id: 9,
      title: "== va ===",
      instruction: "`compareStrings(a, b)` yozing, `a==b` ni qaytarsin. Agar \"\" va 0 ni bersak true qaytishi kerak.",
      startingCode: "function compareStrings(a, b) {\n  \n}",
      hint: "return a == b;",
      test: "const fn = new Function(code + '; return compareStrings;')(); if(fn(\"\", 0)!==true) return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "Object.is ishlatilishi",
      instruction: "`checkSame(a, b)` yozing, agar aynan bir xil (Object.is bo'yicha) bo'lsa true, aks holda false.",
      startingCode: "function checkSame(a, b) {\n  \n}",
      hint: "return Object.is(a, b);",
      test: "const fn = new Function(code + '; return checkSame;')(); if(fn(NaN,NaN)!==true || fn(-0, 0)!==false) return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "0.1 + 0.2 nima uchun 0.3 emas?",
      options: [
        "Ikkilik sanoq tizimidagi (IEEE 754) float xatosi tufayli",
        "JS xato qilingani uchun",
        "Bu xususiyat emas, brauzer buggi",
        "Faqat 0.2+0.1 ishlagani uchun"
      ],
      correctAnswer: 0,
      explanation: "Kompyuter o'nlik kasrlarni ikkilikka o'tkazganda aniqlikni yo'qotadi."
    },
    {
      id: 2,
      question: "typeof null natijasi?",
      options: ["'null'", "'undefined'", "'object'", "Error"],
      correctAnswer: 2,
      explanation: "Tarixiy bug sababli 'object' qaytadi."
    },
    {
      id: 3,
      question: "NaN === NaN ?",
      options: ["true", "false", "ReferenceError", "undefined"],
      correctAnswer: 1,
      explanation: "NaN o'ziga o'zi teng emas."
    },
    {
      id: 4,
      question: "[] + [] ?",
      options: ["[]", "'[object Object]'", "'' (bo'sh satr)", "TypeError"],
      correctAnswer: 2,
      explanation: "Ikkita massiv ham bo'sh stringga o'tadi va qo'shiladi."
    },
    {
      id: 5,
      question: "[] + {} ?",
      options: ["'['", "''", "'[object Object]'", "TypeError"],
      correctAnswer: 2,
      explanation: "Obyekt '[object Object]' ga o'girilib, qo'shiladi."
    },
    {
      id: 6,
      question: "null >= 0 va null == 0 mos ravishda qanday?",
      options: ["true va true", "true va false", "false va true", "false va false"],
      correctAnswer: 1,
      explanation: ">= operatori null ni 0 qilib ko'radi. == esa faqat undefined bilan tenglaydi."
    },
    {
      id: 7,
      question: "3 > 2 > 1 qanday ishlaydi?",
      options: ["true", "false", "Error", "NaN"],
      correctAnswer: 1,
      explanation: "3>2 (true). Keyin true>1, bu 1>1 bo'ladi (false)."
    },
    {
      id: 8,
      question: "ASI nima?",
      options: [
        "Advanced Semicolon Integration",
        "Automatic Semicolon Insertion",
        "Abstract String Interface",
        "Array System Index"
      ],
      correctAnswer: 1,
      explanation: "O'zidan o'zi qator oxiriga ';' nuqtali vergul qo'yish."
    },
    {
      id: 9,
      question: "Object.is(NaN, NaN) natijasi?",
      options: ["false", "true", "undefined", "Null"],
      correctAnswer: 1,
      explanation: "Object.is === dan aniqroq tekshiradi, shu jumladan NaN larni ham."
    },
    {
      id: 10,
      question: "Array(5) nega map ni to'g'ri ishlata olmaydi?",
      options: [
        "JS arrayni qo'llab quvvatlamaydi",
        "Massiv uzunligi 5, lekin ichi ochiq (sparse) qolib ketgan",
        "Array is not defined",
        "Bu ob'yekt"
      ],
      correctAnswer: 1,
      explanation: "Bo'sh slotlarga tsikl va map ta'sir qilmaydi."
    },
    {
      id: 11,
      question: "Nega typeof array 'object'?",
      options: [
        "Array bu obyekt hisoblanadi (kalitlari sonli)",
        "Bu xato",
        "String qilish imkoni yo'q",
        "Obyekt bo'lmagani uchun"
      ],
      correctAnswer: 0,
      explanation: "JS-da array - bu Array prototype idan nasl olgan obyekt."
    },
    {
      id: 12,
      question: "E-commerce do'konda pul summasini qanday hisoblash afzal?",
      options: [
        "Faqat Float da saqlash",
        "Stringda saqlash",
        "Yuz baravar ko'paytirib butun son (cents) qilib saqlash",
        "Hexadecimalda saqlash"
      ],
      correctAnswer: 2,
      explanation: "Butun sonlar tiynlarda bo'lsa suzuvchi nuqta muammosi bo'lmaydi."
    }
  ]
};
