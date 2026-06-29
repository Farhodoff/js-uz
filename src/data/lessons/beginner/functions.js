export const functions = {
  id: "functions",
  title: "Funksiyalar va Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Funksiya va Scope nima?
* **Funksiya (Function):** Bu dasturning biror-bir muayyan vazifani bajarishga mo'ljallangan, qayta-qayta ishlatilishi mumkin bo'lgan kod blokidir.
* **Scope (Qamrov doirasi):** Bu o'zgaruvchilar va funksiyalarning koddagi "ko'rinish" yoki ularga kirish huquqining doirasidir.

### Real hayotiy o'xshatish
Tasavvur qiling, sizda **oshxona va taom tayyorlash mashinasi** bor:
* **Funksiya:** Bu mikser. Siz unga masalliqlarni solasiz (parametrlar), u ularni aralashtiradi (kod bajarilishi) va sizga tayyor mahsulotni qaytaradi (return).
* **Scope (Global va Local):** 
  * **Global Scope:** Sizning butun uyingiz. 
  * **Local Scope (Mikser ichi):** Mikserning ichidagi pichoqlar faqat o'sha mikser ichida mavjud.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy Funksiya e'loni)
\`\`\`javascript
function calculateArea(width, height) {
  const area = width * height;
  return area; 
}
console.log(calculateArea(5, 4)); // 20
\`\`\`

### 2. Intermediate Example (Scope farqi)
\`\`\`javascript
const globalName = "Sardor"; 

const introduce = function() {
  const localRole = "Dasturchi"; 
  console.log(\`Mening ismim \${globalName}. Men \${localRole}man.\`);
};

introduce(); // "Mening ismim Sardor. Men Dasturchiman."
// console.log(localRole); // ReferenceError
\`\`\`

### 3. Advanced Example (Arrow Function, Rest Parameter)
\`\`\`javascript
const greet = (name = "Mehmon") => \`Salom, \${name}!\`;
console.log(greet("Lobar")); // "Salom, Lobar!"

const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sumAll(10, 20, 30)); // 60
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Execution Context va Call Stack
1. **Creation Phase:** Funksiya chaqirilganda, yangi Execution Context yaratiladi. O'zgaruvchilar xotiradan joy oladi (Hoisting).
2. **Execution Phase:** Kod satrma-satr bajariladi.
Funksiya chaqirilganda u **Call Stack** ga yuklanadi va tugagach, undan olib tashlanadi (pop).

---

## 4. ❌ Ko'p Uchraydigan Xatolar (YOMON / YAXSHI)

### 1. \`return\` yozishni unutish
🔴 **YOMON:** 
\`\`\`javascript
function double(num) {
  const result = num * 2;
  // return yo'q
}
console.log(double(5)); // undefined
\`\`\`
🟢 **YAXSHI:**
\`\`\`javascript
function double(num) {
  return num * 2;
}
console.log(double(5)); // 10
\`\`\`

### 2. Parametr va Argumentlarni chalkashtirish
🔴 **YOMON:** (Tushunchani chalkashtirish)
Odamlar ko'pincha "argument" deb funksiya e'lonidagi o'zgaruvchilarni aytishadi.
🟢 **YAXSHI:**
* **Parametr:** Funksiya e'lonidagi o'zgaruvchilar \`function add(a, b)\`.
* **Argument:** Funksiyani chaqirishda berilgan aniq qiymatlar \`add(5, 10)\`.

---

## 5. 💬 12 ta Intervyu Savollari

1. **Savol:** Function Declaration va Function Expression farqi?
   * **Javob:** Declaration hoisting bo'ladi, Expression esa o'zgaruvchiga yuklanadi va hoisting bo'lmaydi.
2. **Savol:** Default parametr nima?
   * **Javob:** Argument berilmaganda ishlatiladigan standart qiymat.
3. **Savol:** \`return\` dan keyingi kod ishlaydimi?
   * **Javob:** Yo'q, u funksiyani darhol to'xtatadi.
4. **Savol:** Global va Local scope nima?
   * **Javob:** Global barchaga ko'rinadi, Local faqat funksiya yoki blok ichida.
5. **Savol:** Rest parametr (\`...args\`) va \`arguments\` farqi?
   * **Javob:** Rest - haqiqiy massiv, \`arguments\` esa massivsimon obyekt (arrow funksiyalarda yo'q).
6. **Savol:** Shadowing nima?
   * **Javob:** Lokal o'zgaruvchi global o'zgaruvchi bilan bir xil nomda bo'lib uni to'sib qo'yishi.
7. **Savol:** Arrow funksiyaning xususiyatlari?
   * **Javob:** O'zining \`this\` va \`arguments\`iga ega emas.
8. **Savol:** Block Scope va Function Scope farqi?
   * **Javob:** \`let\`/\`const\` blok ichida yashaydi, \`var\` funksiya ichida.
9. **Savol:** IIFE nima?
   * **Javob:** Darhol ishga tushuvchi funksiya bo'lib, lokal scope yaratish uchun xizmat qiladi.
10. **Savol:** Callback funksiya nima?
    * **Javob:** Boshqa funksiyaga argument sifatida beriladigan funksiya.
11. **Savol:** Pure Function nima?
    * **Javob:** Bir xil argumentga doim bir xil natija qaytaradigan va nojo'ya ta'siri yo'q funksiya.
12. **Savol:** Stack Overflow nima?
    * **Javob:** Call stack to'lib ketishi, ko'pincha to'xtovsiz rekursiya sababli.

---

## 6. 🛠️ Amaliy Topshiriqlar

\`\`\`mermaid
graph TD
    Caller["Chaqiruvchi Kontekst"] -->|C = 20| FEC["Funksiya Execution Context"]
    subgraph FEC ["Funksiya Execution Context"]
        Params["celsius = 20"]
        LocalVars["fahrenheit = celsius * 9/5 + 32"]
        ReturnStmt["return fahrenheit"]
        Params --> LocalVars
        LocalVars --> ReturnStmt
    end
    ReturnStmt -->|68| Caller
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars oxiridagi testlarni yechishni unutmang.

---

## 8. 🎯 Real Project Case Study

### Savdo Savatchasi
\`\`\`javascript
const calculateItem = (price, qty = 1) => price * qty;

function getCartTotal(items) {
  let total = 0;
  for (const item of items) {
    total += calculateItem(item.price, item.qty);
  }
  return total;
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

* Funksiyalarni sikl ichida yaratmang.
* Sof (pure) funksiyalar yarating.
* Yagona mas'uliyat tamoyiliga (SRP) qat'iy amal qiling.

---

## 10. 📌 Cheat Sheet

| Turi | Sintaksis | Hoisting | \`this\` |
| :--- | :--- | :--- | :--- |
| **Declaration** | \`function foo(){}\` | Ha | Dinamik |
| **Expression** | \`const foo = function(){}\` | Yo'q | Dinamik |
| **Arrow** | \`const foo = () => {}\` | Yo'q | Leksik |
`,
  exercises: [
    {
      id: 1,
      title: "Selsiyni Farengeytga O'tkazish",
      instruction: "`celsiusToFahrenheit(celsius)` funksiyasini yozing. Formula: `F = C * 9/5 + 32`.",
      startingCode: "function celsiusToFahrenheit(celsius) {\n  \n}",
      hint: "return celsius * 9/5 + 32;",
      test: "const fn = new Function(code + '; return celsiusToFahrenheit;')(); if(fn(0)!==32) return 'Xato'; return null;"
    },
    {
      id: 2,
      title: "O'rtacha Qiymat",
      instruction: "`calculateAverage(...numbers)` yarating, sonlarning o'rtachasini qaytarsin. Agar bomb'sh bo'lsa 0 qaytsin.",
      startingCode: "function calculateAverage(...numbers) {\n  \n}",
      hint: "if(!numbers.length) return 0; return numbers.reduce((a,b)=>a+b)/numbers.length;",
      test: "const fn = new Function(code + '; return calculateAverage;')(); if(fn(10,20)!==15) return 'Xato'; if(fn()!==0) return '0 qaytishi kerak'; return null;"
    },
    {
      id: 3,
      title: "Unli Tovushlar Soni",
      instruction: "`countVowels(str)` yozing, faqat `a,e,i,o,u` sonini qaytarsin.",
      startingCode: "function countVowels(str) {\n  \n}",
      hint: "str.match(/[aeiou]/gi)?.length || 0 ishlatishingiz mumkin.",
      test: "const fn = new Function(code + '; return countVowels;')(); if(fn('hello')!==2) return 'Xato'; return null;"
    },
    {
      id: 4,
      title: "Sonning Kvadrati",
      instruction: "`square(n)` n*n ni qaytarsin.",
      startingCode: "function square(n) {\n  \n}",
      hint: "return n*n;",
      test: "const fn = new Function(code + '; return square;')(); if(fn(5)!==25) return 'Xato'; return null;"
    },
    {
      id: 5,
      title: "Salomlashish Funksiyasi",
      instruction: "`greet(name)` 'Salom, [name]!' qaytarsin.",
      startingCode: "function greet(name) {\n  \n}",
      hint: "return `Salom, ${name}!`;",
      test: "const fn = new Function(code + '; return greet;')(); if(fn('Ali')!=='Salom, Ali!') return 'Xato'; return null;"
    },
    {
      id: 6,
      title: "Eng Katta Sonni Topish",
      instruction: "`getMax(a, b)` kattasini qaytarsin.",
      startingCode: "function getMax(a, b) {\n  \n}",
      hint: "return Math.max(a, b);",
      test: "const fn = new Function(code + '; return getMax;')(); if(fn(10,5)!==10) return 'Xato'; return null;"
    },
    {
      id: 7,
      title: "Juft yoki Toq",
      instruction: "`isEven(n)` juft bo'lsa true, toq bo'lsa false.",
      startingCode: "function isEven(n) {\n  \n}",
      hint: "return n % 2 === 0;",
      test: "const fn = new Function(code + '; return isEven;')(); if(fn(4)!==true) return 'Xato'; return null;"
    },
    {
      id: 8,
      title: "To'rtburchak Yuzi",
      instruction: "`getArea(w, h)` ni hisoblang.",
      startingCode: "function getArea(w, h) {\n  \n}",
      hint: "return w * h;",
      test: "const fn = new Function(code + '; return getArea;')(); if(fn(5,2)!==10) return 'Xato'; return null;"
    },
    {
      id: 9,
      title: "Yoshni Tekshirish",
      instruction: "`isAdult(age)` 18+ bo'lsa true qaytarsin.",
      startingCode: "function isAdult(age) {\n  \n}",
      hint: "return age >= 18;",
      test: "const fn = new Function(code + '; return isAdult;')(); if(fn(19)!==true) return 'Xato'; return null;"
    },
    {
      id: 10,
      title: "Kalkulyator",
      instruction: "`calc(a, b, op)` agar '+' bo'lsa a+b ni qaytarsin. '-' da ayirsin, '*' va '/'.",
      startingCode: "function calc(a, b, op) {\n  \n}",
      hint: "switch(op) ishlatish",
      test: "const fn = new Function(code + '; return calc;')(); if(fn(5,3,'+')!==8) return 'Xato'; if(fn(10,2,'/')!==5) return 'Xato'; return null;"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da Function Declaration sintaksisi?",
      options: [
        "function myFunction() {}",
        "let myFunction = () => {}",
        "myFunction function() {}",
        "new Function(myFunction) {}"
      ],
      correctAnswer: 0,
      explanation: "`function myFunction() {}` bu klassik Function Declaration."
    },
    {
      id: 2,
      question: "return yozilmagan funksiya nima qaytaradi?",
      options: ["null", "undefined", "\"\"", "ReferenceError"],
      correctAnswer: 1,
      explanation: "Funksiya har doim undefined qaytaradi agar return qilinmasa."
    },
    {
      id: 3,
      question: "Default parametr qanday ishlaydi?",
      options: [
        "Faqat argument null bo'lsa ishlaydi",
        "Argument undefined yoki uzatilmasa ishlaydi",
        "Har doim ishlaydi",
        "Faqat stringlarda ishlaydi"
      ],
      correctAnswer: 1,
      explanation: "Default qiymatlar argument undefined bo'lsa o'rnini to'ldiradi."
    },
    {
      id: 4,
      question: "Declaration va Expression asosiy farqi?",
      options: [
        "Declaration hoisting bo'ladi, Expression esa yo'q",
        "Declaration parametr qabul qilmaydi",
        "Expression asinxron ishlaydi",
        "Farqi yo'q"
      ],
      correctAnswer: 0,
      explanation: "Declaration larni fayl boshida ishlatish mumkin."
    },
    {
      id: 5,
      question: "Block scope nima?",
      options: [
        "Faqat funksiya ichida ishlaydi",
        "Global o'zgaruvchilar",
        "{} qavslar ichida let va const bilan yopiq muhit",
        "Maxsus blok"
      ],
      correctAnswer: 2,
      explanation: "let/const jingalak qavslardan tashqariga chiqmaydi."
    },
    {
      id: 6,
      question: "Funksiya lokal qamrovidagi o'zgaruvchini tashqaridan o'qish mumkinmi?",
      options: ["Ha", "Yo'q (ReferenceError beradi)", "Yo'q (undefined qaytaradi)", "Ha (ammo null bo'lib)"],
      correctAnswer: 1,
      explanation: "Lokal o'zgaruvchilar tashqi scope uchun yo'q (ReferenceError)."
    },
    {
      id: 7,
      question: "Arrow funksiyalarning an'anaviydan farqi?",
      options: [
        "O'zining this obyekti mavjud emas",
        "Ko'p qatordan iborat bo'la olmaydi",
        "Constructor bo'la oladi",
        "Faqat default parametr oladi"
      ],
      correctAnswer: 0,
      explanation: "Arrow funksiyalar this va arguments ga ega emas."
    },
    {
      id: 8,
      question: "Rest parameter (...args) vazifasi?",
      options: [
        "Massivni yoyish",
        "Qolgan argumentlarni massiv ko'rinishida bitta o'zgaruvchiga to'plash",
        "Funksiyani to'xtatish",
        "Hech qanday argument olmaslik"
      ],
      correctAnswer: 1,
      explanation: "Rest - qolgan hamma argumentlarni haqiqiy arrayga yig'adi."
    },
    {
      id: 9,
      question: "Arrow funksiya `{}` ichida return yozilmasa nima bo'ladi?",
      options: ["10", "undefined", "ReferenceError", "null"],
      correctAnswer: 1,
      explanation: "Jingalak qavslar qo'yilsa, avtomatik return bekor qilinadi va explicit return kutadi."
    },
    {
      id: 10,
      question: "Shadowing yuz bersa nima bo'ladi?",
      options: [
        "Ichki o'zgaruvchi globalni vaqtincha to'sib qo'yadi",
        "Xato beradi",
        "Global o'chib ketadi",
        "Tashqi ustun bo'ladi"
      ],
      correctAnswer: 0,
      explanation: "Shadowing - bu aynan ota scope dagi nomni soya qilishdir."
    },
    {
      id: 11,
      question: "Call Stack qanday tartibda ishlaydi?",
      options: ["FIFO", "LIFO", "Tartibsiz", "Kattaligiga qarab"],
      correctAnswer: 1,
      explanation: "LIFO (Oxirgi kirgan, birinchi chiqadi) tamoyili asosida ishlaydi."
    },
    {
      id: 12,
      question: "Pure Function xususiyati?",
      options: [
        "Bir xil kiruvchiga har doim har xil chiquvchi",
        "Bir xil argumentga bir xil natija + side effects yo'qligi",
        "Internetdan tez ishlaydi",
        "Xatosiz funksiya"
      ],
      correctAnswer: 1,
      explanation: "Sof funksiyalar kutilgan va mutlaq aniq natijalar beradi."
    }
  ]
};
