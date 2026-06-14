export const functions = {
  id: "functions",
  title: "Funksiyalar va Scope",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Funksiya va Scope nima?
* **Funksiya (Function):** Bu dasturning biror-bir muayyan vazifani bajarishga mo'ljallangan, qayta-qayta ishlatilishi mumkin bo'lgan kod blokidir. Siz unga ma'lumot uzatasiz (argumentlar), u ma'lumotlarni qayta ishlaydi va natijani qaytaradi (return).
* **Scope (Qamrov doirasi):** Bu o'zgaruvchilar va funksiyalarning koddagi "ko'rinish" yoki ularga kirish huquqining doirasidir. Ya'ni, o'zgaruvchini qayerda e'lon qilganingizga qarab, uni kodning qaysi qismlarida ishlatish mumkinligi aniqlanadi.

### Real hayotiy o'xshatish
Tasavvur qiling, sizda **oshxona va taom tayyorlash mashinasi** bor:
* **Funksiya:** Bu mikser yoki oshxona kombaynidir. Siz unga **masalliqlarni solasiz** (parametrlar/argumentlar), u ularni **aralashtiradi** (kod bajarilishi) va sizga **sharbatsiz tayyor mahsulotni qaytaradi** (return).
* **Scope (Global va Local):** 
  * **Global Scope:** Sizning butun uyingiz. Uy ichidagi muzlatgichdagi mevalarni xohlagan xonangizda yoki mikser ichida ishlata olasiz.
  * **Local Scope (Oshxona/Mikser ichi):** Mikserning ichidagi pichoqlar yoki mikser idishiga solingan suv faqat o'sha mikser ichida mavjud. Siz mehmonxonada turib mikser ichidagi suvni to'g'ridan-to'g'ri ololmaysiz. Mikser yopilib, ishini tugatgandan so'ng u yerdagi lokal narsalar yo'qoladi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Oddiy Funksiya e'loni va return)
\`\`\`javascript
// Funksiya e'lon qilish (Function Declaration)
function calculateArea(width, height) {
  // width va height - parametrlar
  const area = width * height; // lokal o'zgaruvchi
  return area; // natijani qaytarish
}

// Funksiyani chaqirish va argumentlar uzatish
const room1 = calculateArea(5, 4); // 5 va 4 - argumentlar
console.log(room1); // 20
\`\`\`

### 2. Intermediate Example (Scope farqi va Function Expression)
Global va Local scope o'rtasidagi bog'liqlik hamda funksiyani o'zgaruvchiga yuklash:
\`\`\`javascript
const globalName = "Sardor"; // Global o'zgaruvchi

// Function Expression (Funksiya ifodasi)
const introduce = function() {
  const localRole = "Dasturchi"; // Lokal o'zgaruvchi
  
  console.log(\`Mening ismim \${globalName}. Men \${localRole}man.\`);
};

introduce(); // "Mening ismim Sardor. Men Dasturchiman."
// console.log(localRole); // ReferenceError: localRole is not defined (chunki u lokal scope-da)
\`\`\`

### 3. Advanced Example (Arrow Function, Default Parameters, Rest Parameter)
Zamonaviy JavaScript (ES6+) imkoniyatlari:
\`\`\`javascript
// Default parameters (standart qiymat) va Arrow function (ko'rsatkichli funksiya)
const greet = (name = "Mehmon") => \`Salom, \${name}!\`;
console.log(greet()); // "Salom, Mehmon!"
console.log(greet("Lobar")); // "Salom, Lobar!"

// Rest Parameter (...args) - istalgancha argumentni massiv shaklida qabul qilish
const sumAll = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};

console.log(sumAll(10, 20, 30)); // 60
console.log(sumAll(1, 2, 3, 4, 5)); // 15
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### Execution Context va Call Stack
JavaScript dvigateli funksiyalarni bajarishda quyidagi bosqichlardan o'tadi:
1. **Creation Phase (Yaratilish bosqichi):** Dastur ishga tushganda yoki funksiya chaqirilganda, yangi **Execution Context** (Bajarilish muhiti) yaratiladi. JavaScript dvigateli o'zgaruvchilar va funksiyalarni aniqlab, xotiradan joy ajratadi (bu jarayon **Hoisting** deb ataladi).
2. **Execution Phase (Bajarilish bosqichi):** Kod satrma-satr bajariladi, o'zgaruvchilarga qiymat yuklanadi va funksiya ichidagi amallar bajariladi.

Funksiya chaqirilganda, u **Call Stack** (chaqiriqlar to'plami) tepasiga joylashtiriladi. Funksiya bajarilib, \`return\` kalit so'zi bilan natija qaytargach, u stack-dan olib tashlanadi (pop) va nazorat uni chaqirgan kodga qaytadi.

> [!IMPORTANT]
> \`let\` va \`const\` yordamida e'lon qilingan o'zgaruvchilar **Block Scope** (blok qamrovi) ga ega bo'lib, \`{}\` qavslar ichida yopiq bo'ladi. \`var\` esa **Function Scope** ga ega bo'lib, blok qavslarni chetlab o'tadi, lekin funksiya ichida cheklanadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`return\` yozishni unutish yoki noto'g'ri joylashtirish
#### Xato:
\`\`\`javascript
function double(num) {
  const result = num * 2;
  // return yo'q
}
console.log(double(5)); // undefined
\`\`\`
#### Tuzatish:
\`\`\`javascript
function double(num) {
  return num * 2;
}
console.log(double(5)); // 10
\`\`\`

### 2. Blok va Lokal scope o'zgaruvchilarini tashqaridan chaqirish
#### Xato:
\`\`\`javascript
if (true) {
  let blockVariable = "Faqat shu blokda";
}
console.log(blockVariable); // ReferenceError
\`\`\`
#### Tuzatish:
O'zgaruvchi qayerda ko'rinishi kerak bo'lsa, o'sha doirada (scope) yoki undan yuqoriroqda e'lon qiling:
\`\`\`javascript
let blockVariable;
if (true) {
  blockVariable = "Qiymat o'zgartirildi";
}
console.log(blockVariable); // "Qiymat o'zgartirildi"
\`\`\`

### 3. Parametr va Argumentlarni chalkashtirish
* **Parametr:** Funksiya e'lon qilinayotganda qavs ichida yoziladigan o'zgaruvchilar (masalan: \`function add(a, b)\` dagi \`a\` va \`b\`).
* **Argument:** Funksiya chaqirilganda parametrlar o'rniga uzatiladigan aniq qiymatlar (masalan: \`add(5, 10)\` dagi \`5\` va \`10\`).

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Function Declaration va Function Expression farqi nimada?
   * **Javob:** Function Declaration hoisting bo'ladi (uni e'londan oldin chaqirsa bo'ladi). Function Expression esa o'zgaruvchiga yuklanadi va hoisting bo'lmaydi.
2. **Savol:** Funksiyada default parametr nima va u qachon ishlatiladi?
   * **Javob:** Funksiya chaqirilganda argument berilmasa yoki \`undefined\` bo'lsa, parametrga avtomatik biriktiriladigan qiymatdir.
3. **Savol:** Funksiya ichida \`return\` kalit so'zidan keyin yozilgan kodlar ishlaydimi?
   * **Javob:** Yo'q, \`return\` funksiya bajarilishini darhol to'xtatadi va boshqa kodlarga o'tmaydi.
4. **Savol:** Global scope va Local scope nima?
   * **Javob:** Global scope - koddagi har qanday joydan kirish mumkin bo'lgan o'zgaruvchilar doirasi. Local scope esa faqat ma'lum bir funksiya yoki blok ichida ko'rinadigan doiradir.

### Middle
5. **Savol:** Rest parametr (\`...args\`) nima va u \`arguments\` obyektidan nimasi bilan farq qiladi?
   * **Javob:** Rest parameter haqiqiy massiv bo'lib, unga barcha massiv metodlarini (map, filter) qo'llash mumkin. \`arguments\` esa massivsimon obyekt bo'lib, massiv metodlariga ega emas va arrow funksiyalarda mavjud emas.
6. **Savol:** Shadowing (Soya solish) hodisasi nima?
   * **Javob:** Ichki (lokal) qamrovda e'lon qilingan o'zgaruvchining tashqi (global) qamrovdagi bir xil nomli o'zgaruvchini to'sib qo'yishidir.
7. **Savol:** Arrow funksiyaning an'anaviy funksiyalardan asosiy farqlari nimalar?
   * **Javob:** Arrow funksiyalar o'zining \`this\` va \`arguments\` obyektiga ega emas. Shuningdek ularni \`new\` kalit so'zi orqali constructor sifatida ishlatib bo'lmaydi.
8. **Savol:** Block Scope (\`let\`/\`const\`) va Function Scope (\`var\`) farqini tushuntiring.
   * **Javob:** \`let\` va \`const\` faqat jingalak qavslar \`{}\` ichida yashaydi. \`var\` esa faqat funksiya bilan chegaralanadi, oddiy \`if\` yoki \`for\` bloklaridan tashqariga chiqib keta oladi.

### Senior
9. **Savol:** JavaScript-da IIFE (Immediately Invoked Function Expression) nima va uning zamonaviy koddagi o'rni qanday?
   * **Javob:** IIFE e'lon qilingan zahoti darhol ishga tushadigan funksiyadir. Ilgari u global scope-ni ifloslantirmaslik va xususiy qamrov yaratish uchun ishlatilgan. Hozirgi kunda bu vazifani asosan ES modullar va blok qamrovlar (\`let\`/\`const\`) bajaradi.
10. **Savol:** Callback funksiya nima va u qanday ishlaydi?
    * **Javob:** Callback - parametr sifatida boshqa funksiyaga uzatib yuboriladigan va ma'lum bir amal yoki voqeadan keyin chaqiriladigan funksiyadir.
11. **Savol:** Pure Function (Sof funksiya) nima?
    * **Javob:** Bir xil argumentlar berilganda har doim bir xil natija qaytaradigan va tashqi muhitga hech qanday nojo'ya ta'sir (side effect) ko'rsatmaydigan funksiyadir.
12. **Savol:** Call Stack to'lib qolishi (Stack Overflow) qanday yuz beradi?
    * **Javob:** Rekursiv funksiya (o'z-o'zini chaqiruvchi) to'xtash shartisiz cheksiz marta chaqirilganda, Call Stack to'lib ketadi va dastur xatolik beradi (\`Maximum call stack size exceeded\`).

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz funksiyalarni amalda qo'llashni o'rganasiz. Quyidagi chizma funksiya chaqirilganda argumentlarning parametrlar bilan mos kelishi, lokal o'zgaruvchilar va natijaning qaytarilish zanjirini ko'rsatadi:

\`\`\`mermaid
graph TD
    Caller["Chaqiruvchi Kontekst (Caller Context)"] -->|Argumentlar: C = 20| FEC["Funksiya Execution Context"]
    subgraph FEC ["Funksiya Execution Context"]
        Params["Parametrlar (Parameters): celsius = 20"]
        LocalVars["Lokal Scope: let fahrenheit = celsius * 9/5 + 32"]
        ReturnStmt["Natija qaytarish: return fahrenheit"]
        Params --> LocalVars
        LocalVars --> ReturnStmt
    end
    ReturnStmt -->|Qaytgan qiymat: 68| Caller
\`\`\`

---

## 7. 📝 12 ta Mini Test

Bilimingizni sinash uchun \`functions_quizzes.json\` faylidagi 12 ta test savollarini javoblang. U yerda scope, parametrlar, arrow funksiyalar va return qiymatlari bo'yicha muhim savollar joy olgan.

---

## 8. 🎯 Real Project Case Study

### Savdo Savatchasi Hisoblagichi (Shopping Cart Calculator)
Haqiqiy loyihalarda mahsulotlar savatchasini hisoblash, chegirmalar va soliqlarni qo'llash uchun moslashuvchan funksiyalardan foydalaniladi. Quyidagi kodda biz funksiyalar yordamida savatchadagi umumiy summani hisoblaymiz:

\`\`\`javascript
// Har bir mahsulot summasini hisoblovchi funksiya
const calculateItemTotal = (price, quantity = 1) => price * quantity;

// Savatchadagi umumiy summani hisoblovchi asosiy funksiya
function calculateCartTotal(cartItems, discountPercent = 0, taxPercent = 12) {
  let subtotal = 0;

  // Har bir mahsulot ustidan aylanib chiqamiz
  for (const item of cartItems) {
    subtotal += calculateItemTotal(item.price, item.quantity);
  }

  // Chegirmani hisoblaymiz
  const discountAmount = subtotal * (discountPercent / 100);
  const totalAfterDiscount = subtotal - discountAmount;

  // Soliqni hisoblaymiz
  const taxAmount = totalAfterDiscount * (taxPercent / 100);
  const finalTotal = totalAfterDiscount + taxAmount;

  return {
    subtotal: subtotal,
    discountAmount: discountAmount,
    taxAmount: taxAmount,
    finalTotal: finalTotal
  };
}

// Chaqirishga misol:
const myCart = [
  { price: 15000, quantity: 2 }, // 30000 UZS
  { price: 50000, quantity: 1 }  // 50000 UZS
];

const bill = calculateCartTotal(myCart, 10, 12); // 10% chegirma, 12% soliq
console.log(bill);
/*
Natija:
{
  subtotal: 80000,
  discountAmount: 8000,
  taxAmount: 8640,
  finalTotal: 80640
}
*/
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Funksiyalarni sikl (loop) ichida yaratmang:** Sikl har safar aylanganda yangi funksiya obyekti yaratilishi xotira sarfini oshiradi. Funksiyani sikldan tashqarida e'lon qilib, ichida faqat chaqirish tavsiya etiladi.
* **Sof funksiyalar (Pure Functions) yozishga harakat qiling:** Sof funksiyalarni keshlashtirish (memoization) oson bo'ladi va ular dasturdagi boshqa o'zgaruvchilarni kutilmaganda o'zgartirib yubormaydi.
* **Kichik funksiyalar yarating:** Yagona mas'uliyat tamoyiliga (Single Responsibility Principle) muvofiq, bitta funksiya faqat bitta ishni mukammal darajada bajarishi lozim. Bu kodni testlash va o'qishni osonlashtiradi.

---

## 10. 📌 Cheat Sheet

| Funksiya turi | Sintaksis | Hoisting | \`this\` bog'lanishi | Qachon ishlatiladi |
| :--- | :--- | :--- | :--- | :--- |
| **Function Declaration** | \`function foo() {}\` | Ha | Dinamik (chaqirilgan joyga qarab) | Kodning istalgan joyidan chaqirish imkoni kerak bo'lganda |
| **Function Expression** | \`const foo = function() {}\` | Yo'q | Dinamik (chaqirilgan joyga qarab) | Funksiya faqat ma'lum shartdan keyin aniqlanishi kerak bo'lganda |
| **Arrow Function** | \`const foo = () => {}\` | Yo'q | Leksik (tashqi muhitdan oladi) | Callback-lar yozishda, qisqa bir qatorli amallarda, \`this\`ni yo'qotmaslik uchun |
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
    "id": 1,
    "question": "JavaScript-da funksiya e'lon qilishning (Function Declaration) asosiy sintaksisi qaysi?",
    "options": [
      "function myFunction() {}",
      "let myFunction = () => {}",
      "myFunction function() {}",
      "new Function(myFunction) {}"
    ],
    "correctAnswer": 0,
    "explanation": "`function myFunction() {}` bu klassik Function Declaration hisoblanadi."
  },
  {
    "id": 2,
    "question": "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nfunction sayHi() {\n  return;\n}\nconsole.log(sayHi());\n```",
    "options": [
      "null",
      "undefined",
      "\"\" (bo'sh satr)",
      "ReferenceError"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da return kalit so'zi qiymatsiz yozilsa yoki umuman yozilmasa, funksiya har doim `undefined` qaytaradi."
  },
  {
    "id": 3,
    "question": "Quyidagi kodda konsolga nima chiqadi?\n```javascript\nconst sum = (a = 2, b = 3) => a + b;\nconsole.log(sum(5));\n```",
    "options": [
      "5",
      "8",
      "NaN",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Chaqirilganda `a` ga 5 argumenti beriladi, `b` parametriga esa hech narsa berilmagani uchun u o'zining default qiymati 3 ni saqlab qoladi. Natija: 5 + 3 = 8."
  },
  {
    "id": 4,
    "question": "Function Declaration va Function Expression o'rtasidagi asosiy farq nima?",
    "options": [
      "Function Expression-larni e'lon qilishdan oldin chaqirib bo'lmaydi (hoisting bo'lmaydi), Function Declaration-larni esa bo'ladi",
      "Function Declaration parametr qabul qila olmaydi",
      "Function Expression doimo asinxron ishlaydi",
      "Ularning hech qanday farqi yo'q"
    ],
    "correctAnswer": 0,
    "explanation": "Function Declaration-lar hoisting (tepaga ko'tarilish) xususiyatiga ega, shuning uchun ularni koddagi e'lon qilingan joyidan yuqorida ham chaqirish mumkin. Function Expression-lar esa faqat e'lon qilingandan keyin ishlaydi."
  },
  {
    "id": 5,
    "question": "Block scope (blok qamrovi) deganda nima tushuniladi?",
    "options": [
      "Faqat funksiya ichida ko'rinadigan o'zgaruvchilar qamrovi",
      "Butun dastur davomida ko'rinadigan global o'zgaruvchilar qamrovi",
      "Jingalak qavslar `{}` ichida let va const yordamida e'lon qilingan o'zgaruvchilarning faqat shu blok ichida ko'rinishi",
      "Brauzer oynasi yopilganda o'chib ketadigan o'zgaruvchilar"
    ],
    "correctAnswer": 2,
    "explanation": "`let` va `const` yordamida har qanday block (masalan, `if`, `for` yoki oddiy `{}`) ichida e'lon qilingan o'zgaruvchilar blokdan tashqarida ko'rinmaydi."
  },
  {
    "id": 6,
    "question": "Quyidagi kodda qanday xatolik yuz beradi?\n```javascript\nfunction testScope() {\n  let message = \"Salom\";\n}\ntestScope();\nconsole.log(message);\n```",
    "options": [
      "TypeError",
      "SyntaxError",
      "ReferenceError",
      "Xatolik bo'lmaydi, konsolga \"Salom\" chiqadi"
    ],
    "correctAnswer": 2,
    "explanation": "`message` o'zgaruvchisi `testScope` funksiyasining lokal qamrovida (local scope) e'lon qilingan, shuning uchun tashqi (global) qamrovda unga kirishga urinilganda `ReferenceError` yuz beradi."
  },
  {
    "id": 7,
    "question": "Arrow funksiyalar (Arrow functions) haqidagi qaysi fikr to'g'ri?",
    "options": [
      "Ular o'zlarining shaxsiy `this` va `arguments` obyektiga ega emas",
      "Ular faqat bir qatordan iborat bo'lishi kerak",
      "Ularni constructor sifatida `new` kalit so'zi bilan ishlatish mumkin",
      "Ularni hoist qilib, e'lon qilishdan oldin ishlatish mumkin"
    ],
    "correctAnswer": 0,
    "explanation": "Arrow funksiyalar o'zining `this` kontekstiga va `arguments` massivsimon obyektiga ega bo'lmaydi, balki ularni tashqi qamrovdan leksik jihatdan meros qilib oladi."
  },
  {
    "id": 8,
    "question": "Rest parameter (`...args`) nima uchun ishlatiladi?",
    "options": [
      "Funksiyaning bajarilishini vaqtincha to'xtatib turish uchun",
      "Funksiyaga uzatilgan cheksiz yoki noma'lum miqdordagi argumentlarni haqiqiy massiv sifatida yig'ib olish uchun",
      "O'zgaruvchini global qamrovda e'lon qilish uchun",
      "Faqat oxirgi argumentni o'chirish uchun"
    ],
    "correctAnswer": 1,
    "explanation": "Rest parameter (uchta nuqta bilan boshlanadigan) funksiyaga uzatilgan qolgan barcha argumentlarni bitta haqiqiy massivga yig'adi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod konsolga nima chiqaradi?\n```javascript\nconst arrowFn = () => {\n  let a = 10;\n};\nconsole.log(arrowFn());\n```",
    "options": [
      "10",
      "undefined",
      "ReferenceError",
      "null"
    ],
    "correctAnswer": 1,
    "explanation": "Arrow funksiyada jingalak qavslar `{}` ishlatilsa, natija qaytishi uchun `return` so'zi yozilishi shart. Aks holda, funksiya `undefined` qaytaradi."
  },
  {
    "id": 10,
    "question": "Global scope-da yaratilgan o'zgaruvchi bilan lokal (funksiya) scope-da yaratilgan o'zgaruvchi nomi bir xil bo'lsa nima sodir bo'ladi?",
    "options": [
      "Shadowing (Soya qilish) yuz beradi - funksiya ichida lokal o'zgaruvchi ustun bo'lib, global o'zgaruvchini to'sib qo'yadi",
      "JavaScript syntax xatosi beradi",
      "Global o'zgaruvchi avtomatik o'chib ketadi",
      "Har doim global o'zgaruvchi ustun bo'ladi"
    ],
    "correctAnswer": 0,
    "explanation": "Shadowing hodisasi yuz berib, ichki scope-dagi o'zgaruvchi o'zidan yuqoridagi scope-dagi o'zgaruvchi nomini soya ostiga oladi va lokal muhitda o'z qiymatini ko'rsatadi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod natijasini aniqlang:\n```javascript\nfunction showDetails(name, ...info) {\n  console.log(info[0]);\n}\nshowDetails(\"Lola\", 25, \"Toshkent\", \"Dasturchi\");\n```",
    "options": [
      "\"Lola\"",
      "25",
      "\"Toshkent\"",
      "[\"Toshkent\", \"Dasturchi\"]"
    ],
    "correctAnswer": 1,
    "explanation": "`name` parametri \"Lola\" ni oladi. Qolgan barcha argumentlar `[25, \"Toshkent\", \"Dasturchi\"]` ko'rinishida `info` massiviga yig'iladi. `info[0]` esa 25 ga teng bo'ladi."
  },
  {
    "id": 12,
    "question": "JavaScript-da Call Stack funksiyalarni qanday tartibda boshqaradi?",
    "options": [
      "FIFO (First In, First Out) - Birinchi kirgan birinchi chiqadi",
      "LIFO (Last In, First Out) - Oxirgi kirgan birinchi chiqadi",
      "Tartibsiz ravishda",
      "Faqat o'lchamiga qarab"
    ],
    "correctAnswer": 1,
    "explanation": "Call Stack LIFO (Last In, First Out) tamoyili bo'yicha ishlaydi. Ya'ni oxirgi chaqirilgan funksiya birinchi bo'lib bajarilib tugaydi va stack-dan o'chiriladi."
  }
]

};
