export const higherOrderFunctions = {
  id: "higherOrderFunctions",
  title: "Higher-Order Functions va Currying",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va Analogiya

### Higher-Order Functions va Currying nima?
* **Higher-Order Functions (HOF - Oliy tartibli funksiyalar):** Argument sifatida boshqa funksiyani qabul qiladigan yoki o'zidan yangi funksiya qaytaradigan funksiyadir. JavaScript-da funksiyalar "birinchi darajali obyektlar" (First-Class Citizens) bo'lgani uchun ularni o'zgaruvchidek boshqarish mumkin.
* **Currying (Karring):** Bir nechta argument oladigan funksiyani faqat bittadan argument qabul qiladigan zanjirli funksiyalar ketma-ketligiga aylantirish usulidir.

### Real hayotiy analogiya
* **Higher-Order Function (Ish boshqaruvchi):** Tashkilot direktori o'zi jismoniy ish qilmaydi. U bir ishchini (funksiyani) chaqirib unga topshiriq beradi (callback qabul qiladi) yoki yangi bo'lim boshlig'ini (funksiya) tayinlaydi (qaytaradi).
* **Currying (Muddatli to'lov):** Siz do'kondan qimmatbaho noutbuk sotib olmoqchisiz. Hamma summani birdaniga to'lash o'rniga, har oy ma'lum bir qismini to'laysiz (birinchi oy \`a\`, keyingi oy \`b\` argumentlarini berasiz) va to'liq to'lab bo'lingach, noutbuk sizniki bo'ladi (yakuniy natija qaytadi).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Funksiya qabul qiluvchi HOF)
\`\`\`javascript
// Boshqa funksiyani qabul qiluvchi oddiy HOF
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i); 
  }
}

repeat(3, (index) => console.log(\`Qadam: \${index}\`)); 
// Qadam: 0
// Qadam: 1
// Qadam: 2
\`\`\`

### 2. Intermediate Example (Funksiya qaytaruvchi HOF va Currying)
\`\`\`javascript
// O'zidan funksiya qaytaruvchi HOF:
function multiplyCreator(multiplier) {
  return function(num) {
    return num * multiplier;
  };
}

const double = multiplyCreator(2);
console.log(double(5)); // 10

// Arrow syntax yordamida Currying:
const add = a => b => a + b;
console.log(add(5)(3)); // 8
\`\`\`

### 3. Advanced Example (Funksiyalar kompozitsiyasi - Pipe)
Bir nechta funksiyalarni ketma-ket zanjir qilib ulash (konveyer kabi):
\`\`\`javascript
const lowercase = str => str.toLowerCase();
const shout = str => \`\${str}!\`;
const repeatTwo = str => \`\${str} \${str}\`;

// Oliy tartibli compose funksiyasi:
const pipe = (...funcs) => (val) => funks.reduce((acc, fn) => fn(acc), val);

const formatText = pipe(lowercase, shout, repeatTwo);
console.log(formatText("HELLO")); // "hello! hello!"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### First-Class Functions va Closures (Yopilishlar)
* **First-Class Functions:** JavaScript dvigateli funksiyalarni obyektlar kabi xotiraning **Heap** qismida saqlaydi va ularning reference-larini uzatishga yo'l qo'yadi.
* **Closures (Yopilishlar):** Funksiya qaytarilganda, u o'zi yaratilgan tashqi muhitdagi o'zgaruvchilarni (masalan, \`multiplier\` yoki \`a\`) xotirada saqlab qoladi. Currying to'liq closures imkoniyatlariga tayanib ishlaydi.

---

## 4. 🧪 Bosqichma-bosqich Amaliy Mashq

### Logging tizimi uchun dinamik funksiya yaratish
Turli xil log darajalari (INFO, ERROR, WARN) uchun oldindan sozlangan funksiyalar yaratamiz.

\`\`\`javascript
// HOF yordamida log yaratuvchi:
const logger = level => message => \`[\${level.toUpperCase()}] \${message}\`;

// Karring yordamida ixtisoslashgan funksiyalarni olamiz:
const infoLog = logger("info");
const errorLog = logger("error");

console.log(infoLog("Tizim ishga tushdi")); // "[INFO] Tizim ishga tushdi"
console.log(errorLog("Ulanishda xatolik"));  // "[ERROR] Ulanishda xatolik"
\`\`\`

---

## 5. ⚠️ Ko'p Uchraydigan Xatolar va Ularni Tuzatish

### 1. Zanjirli chaqiriq (Currying) qavslarini unutish
* **Noto'g'ri:**
  \`\`\`javascript
  const add = a => b => a + b;
  console.log(add(5, 3)); // b => a + b funksiyasini qaytaradi (xato!)
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  console.log(add(5)(3)); // 8
  \`\`\`

---

## 6. 📝 Qisqacha Xulosa (Cheat Sheet)

| Tushuncha | Ta'rifi | Misol |
| :--- | :--- | :--- |
| **HOF (Callback qabul qiluvchi)** | Callback olib ishlatadigan funksiya | \`arr.map(x => x * 2)\` |
| **HOF (Funksiya qaytaruvchi)** | Ichki funksiyani qaytaradi | \`const f = () => () => 5\` |
| **Currying (Karring)** | \`f(a, b)\` ni \`f(a)(b)\` ga o'girish | \`const add = a => b => a + b\` |
| **Partial Application** | Argumentlarning bir qismini oldindan bog'lash | \`const addFive = add(5)\` |

---

## 7. ❓ Savollar va Javoblar

### 1. Currying nima uchun kerak?
U kodni qayta ishlatish (reusability) va argumentlarni oldindan sozlab qo'yish (partial application) uchun juda qulay. Masalan, bir xil birinchi argumentli chaqiriqlarni qayta-qayta yozishni oldini oladi.

### 2. Har qanday funksiyani karring qilsa bo'ladimi?
Ha, buning uchun yordamchi \`curry\` funksiyalarini yozish yoki Lodash kutubxonasining \`_.curry\` metodidan foydalanish mumkin.

---

## 8. 🧠 O'z-o'zini Tekshirish

1. \`arr.filter()\` funksiyasi Higher-Order Function hisoblanadimi? (Ha, chunki u argument sifatida boshqa funksiyani qabul qiladi).
2. Currying qanday qilib yopilishlar (closures) orqali ishlaydi?
3. Partial Application va Currying farqi nima? (Currying funksiyani faqat bittadan argument oladigan zanjirga aylantiradi, Partial Application esa bir nechta argumentni birdaniga bog'lab qo'ya oladi).

---

## 9. 🚀 Amaliy Topsiriq

Quyidagi amaliy mashqlar va testlar yordamida funksiyalar bilan ishlash ko'nikmalaringizni tekshiring.
`,
  exercises: [
  {
    "id": 1,
    "title": "Funksiya Qabul Qiluvchi HOF",
    "instruction": "Argument sifatida funksiya ('callback') qabul qilib, uni ikki marta ketma-ket chaqiruvchi 'runTwice(callback)' nomli oliy tartibli funksiyani yozing.",
    "startingCode": "function runTwice(callback) {\n  // Kodni shu yerda yozing\n}\n",
    "hint": "callback(); callback();",
    "test": "const sandbox = new Function(code + '; return runTwice;');\nconst fn = sandbox();\nlet count = 0;\nfn(() => count++);\nif (count === 2) return null;\nreturn 'callback funksiyasi 2 marta chaqirilmadi';"
  },
  {
    "id": 2,
    "title": "Currying yordamida Ko'paytirish",
    "instruction": "Karring (Currying) uslubida ikkita sonni ko'paytiradigan 'multiply(a)(b)' funksiyasini yozing (arrow funksiya orqali yozishingiz mumkin).",
    "startingCode": "// Kodni shu yerda yozing\n",
    "hint": "const multiply = a => b => a * b;",
    "test": "if (!code.includes('=>')) return 'Arrow funksiya ko\\'rinishida karring ishlatilmadi';\nconst sandbox = new Function(code + '; return multiply;');\nconst fn = sandbox();\nif (typeof fn === 'function' && fn(3)(4) === 12) return null;\nreturn 'Karring funksiyasi noto\\'g\\'ri ko\\'paytirmoqda';"
  },
  {
    "id": 3,
    "title": "Partial Application (Qisman Qo'llash)",
    "instruction": "Avval yozilgan karring funksiyadan ('multiply') foydalanib, berilgan sonni 10 ga ko'paytiradigan 'multiplyByTen' nomli yangi partial funksiyani hosil qiling.",
    "startingCode": "const multiply = a => b => a * b;\n\n// Kodni shu yerda yozing\n",
    "hint": "const multiplyByTen = multiply(10);",
    "test": "if (!code.includes('multiply(10)')) return 'multiply(10) orqali partial application hosil qilinmadi';\nconst sandbox = new Function(code + '; return multiplyByTen;');\nconst fn = sandbox();\nif (typeof fn === 'function' && fn(5) === 50) return null;\nreturn 'multiplyByTen to\\'g\\'ri ishlamadi';"
  }
]
,
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript funksiyalarining \"Birinchi darajali obyektlar\" (First-Class Citizens) ekanligi nimani anglatadi?",
    "options": [
      "Ularni o'zgaruvchilarga o'zlashtirish, boshqa funksiyalarga parametr qilib uzatish va qiymat qilib qaytarish mumkinligini",
      "Ular faqat birinchi sahifada ishga tushishini",
      "Ular har doim boshqa funksiyalardan tezroq ishlashini",
      "Ularni klasslar ichida ishlatib bo'lmasligini"
    ],
    "correctAnswer": 0,
    "explanation": "Birinchi darajali obyektlar (First-Class Citizens) qoidasiga ko'ra, funksiyalar JavaScript-da boshqa har qanday oddiy qiymat (masalan, son yoki matn) kabi erkin boshqariladi."
  },
  {
    "id": 2,
    "question": "Higher-Order Function (Oliy tartibli funksiya) deb qanday funksiyaga aytiladi?",
    "options": [
      "Faqat `async/await` bilan ishlaydigan funksiyaga",
      "Parametr sifatida boshqa funksiyani qabul qiladigan yoki o'zidan funksiya qaytaradigan funksiyaga",
      "Faqat klass ichida e'lon qilingan static metodlarga",
      "Hech qanday argument qabul qilmaydigan funksiyaga"
    ],
    "correctAnswer": 1,
    "explanation": "Argument sifatida boshqa funksiyani (callback) qabul qiladigan yoki o'zidan funksiya (closure) qaytaradigan funksiyalar oliy tartibli funksiyalar deb nomlanadi."
  },
  {
    "id": 3,
    "question": "Karring (Currying) jarayonining asosiy mohiyati nimada?",
    "options": [
      "Funksiyalarni asinxron rejimga o'tkazish",
      "Bir nechta argument oladigan bitta funksiyani faqat bittadan argument oladigan zanjirli funksiyalar ketma-ketligiga aylantirish",
      "Obyekt qiymatlarini butunlay o'chirish",
      "Koddagi barcha xatolarni o'z-o'zidan tuzatish"
    ],
    "correctAnswer": 1,
    "explanation": "Currying `f(a, b, c)` ko'rinishidagi funksiyani `f(a)(b)(c)` ko'rinishida bittadan argument oladigan zanjirli zanjirli funksiyaga aylantirishdir."
  },
  {
    "id": 4,
    "question": "Quyidagi karring funksiya chaqirilganda konsolga nima chiqadi?\n```javascript\nconst add = a => b => a + b;\nconsole.log(add(5)(3));\n```",
    "options": [
      "`8`",
      "`undefined`",
      "`[Function]`",
      "`TypeError`"
    ],
    "correctAnswer": 0,
    "explanation": "`add(5)` dastlab `b => 5 + b` funksiyasini qaytaradi, so'ngra u `(3)` bilan chaqirilib, natijada 5 + 3 = 8 chiqadi."
  },
  {
    "id": 5,
    "question": "Partial Application (Qisman qo'llash) nima?",
    "options": [
      "Funksiyaning faqat bir qismini serverga yuborish",
      "Funksiya argumentlarining ma'lum bir qismini oldindan biriktirib (sozlab), kamroq argument oladigan yangi funksiya hosil qilish",
      "Dasturning faqat ba'zi brauzerlarda ishlashi",
      "Faqat default parametrlardan foydalanish"
    ],
    "correctAnswer": 1,
    "explanation": "Partial Application biror ko'p argumentli funksiyani ba'zi argumentlarini oldindan bog'lab, qolgan argumentlarni keyinchalik kutadigan soddaroq funksiyaga keltirishdir."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilgandan keyin `multiplyByFive(3)` nimani qaytaradi?\n```javascript\nconst multiply = a => b => a * b;\nconst multiplyByFive = multiply(5);\n```",
    "options": [
      "`15`",
      "`8`",
      "`multiply` funksiyasini",
      "`undefined`"
    ],
    "correctAnswer": 0,
    "explanation": "`multiply(5)` orqali biz `multiplyByFive` partial funksiyasini oldik (u `b => 5 * b` ga teng). Uni `(3)` bilan chaqirsak 5 * 3 = 15 bo'ladi."
  },
  {
    "id": 7,
    "question": "JavaScript-dagi qaysi o'rnatilgan massiv metodi Higher-Order Function hisoblanadi?",
    "options": [
      "`.map()`",
      "`.filter()`",
      "`.reduce()`",
      "Barcha ko'rsatilgan metodlar"
    ],
    "correctAnswer": 3,
    "explanation": "Ushbu metodlarning barchasi argument sifatida callback funksiyani qabul qilgani sababli Higher-Order Function (oliy tartibli funksiya) hisoblanadi."
  },
  {
    "id": 8,
    "question": "Funksiyalar kompozitsiyasi (Function Composition) deganda nima tushuniladi?",
    "options": [
      "Bir nechta funksiyalarni birlashtirib, birining natijasi keyingisiga kirish argumenti bo'ladigan zanjir (konveyer) hosil qilish",
      "Funksiyalarni alfavit bo'yicha tartiblash",
      "Klass konstruktorlari ichida funksiya yozish",
      "Funksiya nomini o'zgartirish"
    ],
    "correctAnswer": 0,
    "explanation": "Function Composition matematikadagi `f(g(x))` kabi bo'lib, bir nechta sodda funksiyani zanjir qilib ulab, murakkabroq jarayonni hosil qilishdir."
  },
  {
    "id": 9,
    "question": "Quyidagi kodda `sayHi('Lola')` chaqirilganda nima chiqadi?\n```javascript\nfunction greet(type) {\n  return function(name) {\n    return type + ' ' + name;\n  };\n}\nconst sayHi = greet('Salom');\n```",
    "options": [
      "`\"Salom Lola\"`",
      "`\"Salom\"`",
      "`undefined`",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "`greet('Salom')` funksiyasi ichki funksiyani qaytaradi. U `type` ('Salom') qiymatini yopilish (closure) orqali saqlab qoladi. `sayHi('Lola')` chaqirilganda `'Salom Lola'` qaytadi."
  },
  {
    "id": 10,
    "question": "Currying qaysi JavaScript mexanizmiga tayanib ishlaydi?",
    "options": [
      "Closures (Yopilishlar)",
      "Prototip zanjiri",
      "Event Loop",
      "Destructuring"
    ],
    "correctAnswer": 0,
    "explanation": "Karring zanjirdagi ichki funksiyalar tashqi funksiya argumentlarini xotirada saqlab qolishi uchun Closures (Yopilishlar) mexanizmidan foydalanadi."
  },
  {
    "id": 11,
    "question": "Currying yordamida yozilgan `const f = a => b => c => a + b + c;` funksiyasi qanday chaqiriladi?",
    "options": [
      "`f(1, 2, 3)`",
      "`f(1)(2)(3)`",
      "`f[1][2][3]`",
      "`f(1, 2)(3)`"
    ],
    "correctAnswer": 1,
    "explanation": "Funksiya bittadan argument oladigan 3 ta zanjirli funksiyadan iborat bo'lgani uchun uni `f(1)(2)(3)` ko'rinishida chaqirish kerak."
  },
  {
    "id": 12,
    "question": "Higher-Order funksiyalardan foydalanishning asosiy afzalligi nimada?",
    "options": [
      "Kodning modulliligini, tozaligini va qayta ishlatilishini (DRY) oshirish",
      "Dasturning xotira hajmini kamaytirish",
      "Sinxron kodni asinxron qilish",
      "CSS stillarini avtomatik ulash"
    ],
    "correctAnswer": 0,
    "explanation": "HOF kod takrorlanishini oldini olib, logikani kichik, mustaqil va qayta ishlatiladigan funksiyalar shaklida ajratishga yordam beradi."
  }
]

};
