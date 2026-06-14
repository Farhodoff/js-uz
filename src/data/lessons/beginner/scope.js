export const scopeLesson = {
  id: "scopeLesson",
  title: "Scope (Ko'rinish Sohalari)",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

### Scope (Ko'rinish Sohasi) nima?
* **Scope (Ko'rinish sohasi):** Bu JavaScript-da o'zgaruvchilar, funksiyalar va obyektlarning kodimizning qaysi qismlarida "ko'rinishi" (ya'ni ularga murojaat qilish imkoniyati borligi) va ularning xotiradagi yashash muddatini belgilaydigan qoidalar to'plamidir.
* **Lexical Scope (Leksik qamrov):** JavaScript o'zgaruvchilarning ko'rinish sohasini dinamik tarzda emas, balki kod yozilayotgan (e'lon qilinayotgan) vaqtdagi joylashuviga qarab belgilaydi. Ichki doiradagi kod har doim o'zidan tashqaridagi muhit o'zgaruvchilarini ko'ra oladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz bir **ofis binosida** ishlayapsiz:
* **Global Scope (Umumiy bino):** Binoning hovlisi yoki kirish zali. Hovlidagi ma'lumot taxtasini binodagi barcha xodimlar, qaysi xonada bo'lishidan qat'i nazar, ko'ra oladi.
* **Function Scope (Alohida bo'lim xonasi):** Faqat buxgalteriya bo'limi xonasi. Ushbu xona ichidagi hujjatlarni faqat buxgalteriya xodimlari ko'ra oladi. Tashqaridagilar (masalan, hovlidagilar) xona ichidagi ma'lumotlarni ko'ra olmaydi.
* **Block Scope (Xona ichidagi qulflangan seyf):** Buxgalteriya xonasi ichidagi bitta seyf \`{}\`. Seyf ichidagi hujjatlar faqat seyf ochilgandagina (blok bajarilayotganda) ko'rinadi va foydalaniladi, seyf yopilgach ularga kirib bo'lmaydi.

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example (Global va Function Scope farqi)
Mahalliy (local) va umumiy (global) o'zgaruvchilar bilan ishlash:
\`\`\`javascript
let globalName = "Jasur"; // Global scope - hamma joyda ko'rinadi

function greetUser() {
  let localMessage = "Salom"; // Function scope - faqat funksiya ichida ko'rinadi
  console.log(\`\${localMessage}, \${globalName}!\`); // Global o'zgaruvchidan foydalanish
}

greetUser(); // Konsolga: "Salom, Jasur!"
// console.log(localMessage); // Xato! localMessage funksiyadan tashqarida ko'rinmaydi (ReferenceError)
\`\`\`

### 2. Intermediate Example (Block Scope: let/const va var farqi)
\`if\` va \`for\` kabi bloklar ichida o'zgaruvchi e'lon qilish:
\`\`\`javascript
if (true) {
  var varVariable = "Men block scope-ga ega emasman";
  let letVariable = "Men faqat shu blok ichida ko'rinaman";
  const constVariable = "Men ham faqat shu blok ichida ko'rinaman";
}

console.log(varVariable); // Konsolga: "Men block scope-ga ega emasman" (Chunki var block scope-ni bilmaydi)
// console.log(letVariable); // Xato: ReferenceError (Blokdan tashqarida kirish taqiqlangan)
// console.log(constVariable); // Xato: ReferenceError
\`\`\`

### 3. Advanced Example (Variable Shadowing - Soyalanish va Nested Scope)
Ichki qamrovda tashqi qamrovdagi o'zgaruvchi bilan bir xil nomdagi o'zgaruvchi e'lon qilinganda:
\`\`\`javascript
let theme = "light"; // Global o'zgaruvchi

function configureApp() {
  let theme = "dark"; // Shadowing: Global "theme" o'zgaruvchisini vaqtincha to'sib qo'yadi
  console.log(\`Lokal sozlama: \${theme}\`); // Konsolga: "Lokal sozlama: dark"
  
  if (true) {
    let theme = "neon"; // Block-level Shadowing: configureApp-dagi "theme"ni soyalaydi
    console.log(\`Blok ichidagi sozlama: \${theme}\`); // Konsolga: "Blok ichidagi sozlama: neon"
  }
}

configureApp();
console.log(\`Global sozlama o'zgarmadi: \${theme}\`); // Konsolga: "Global sozlama o'zgarmadi: light"
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

### 1. Leksik Atrof-muhit (Lexical Environment)
JavaScript dvigateli kodni bajarishdan oldin uni tahlil qiladi (compile). Har bir bajarilish muhiti (global, funksiya yoki blok) uchun **Lexical Environment** deb nomlanuvchi maxsus xotira tuzilmasini yaratadi. U ikki qismdan iborat:
1. **Environment Record:** Hozirgi scope-ga tegishli barcha lokal o'zgaruvchilar, funksiyalar va parametrlarni saqlaydigan xarita (map).
2. **Outer Reference (Tashqi havola):** Kodning yozilish joyiga ko'ra o'zidan bitta yuqori turgan (tashqi) Leksik Atrof-muhitga bo'lgan havola (ko'rsatkich). Global scope uchun tashqi havola \`null\` ga teng.

### 2. Qidirish Zanjiri (Scope Chain Lookup)
Qachonki kodda o'zgaruvchiga murojaat qilinsa:
1. JavaScript dvigateli o'zgaruvchini avval joriy (lokal) \`Environment Record\` ichidan qidiradi.
2. Agar u yerda topilmasa, \`Outer Reference\` orqali tashqi Leksik Atrof-muhitga o'tadi va o'sha yerdan qidiradi.
3. Bu jarayon global atrof-muhitgacha (\`null\` ga yetguncha) davom etadi.
4. Agar eng oxirgi global scope-dan ham o'zgaruvchi topilmasa va Strict Mode yoqilgan bo'lsa, \`ReferenceError\` xatosi qaytariladi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. \`var\` block scope-ga ega deb o'ylash (Loop muammolari)
Junior dasturchilar ko'pincha \`for\` sikli ichida \`var\` ishlatib, uni blokdan tashqarida ko'rinmaydi deb o'ylashadi.
#### Xato kod:
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  // amallar...
}
console.log(i); // Konsolga: 3! (i o'zgaruvchisi global scope-ga sizib chiqdi)
\`\`\`
#### To'g'ri yechim:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  // amallar...
}
// console.log(i); // To'g'ri: ReferenceError: i is not defined. i o'zgaruvchisi faqat loop bloki ichida mavjud edi.
\`\`\`

### 2. Bexosdan Global o'zgaruvchi yaratish (Global Scope Pollution)
O'zgaruvchini e'lon qilishda \`let\`, \`const\` yoki \`var\` kalit so'zlarini unutib qoldirish.
#### Xato kod:
\`\`\`javascript
function calculateArea(r) {
  pi = 3.14; // Kalit so'zsiz yozilgani uchun avtomatik global o'zgaruvchiga aylanadi
  return pi * r * r;
}
calculateArea(5);
console.log(pi); // Konsolga: 3.14 (Global scope ifloslandi va boshqa fayllar bilan to'qnashishi mumkin)
\`\`\`
#### To'g'ri yechim:
\`\`\`javascript
"use strict"; // Qat'iy rejimni yoqish
function calculateArea(r) {
  const pi = 3.14; // To'g'ri e'lon qilish
  return pi * r * r;
}
\`\`\`

### 3. Temporal Dead Zone (TDZ - Vaqtinchalik o'lik hudud)
\`let\` va \`const\` o'zgaruvchilari hoisting (tepaga ko'tarilish) bo'lsa-da, ular e'lon qilinmaguncha ularga murojaat qilib bo'lmaydi. Bu oraliq TDZ deyiladi.
#### Xato kod:
\`\`\`javascript
console.log(myNumber); // Xato! ReferenceError: Cannot access 'myNumber' before initialization
let myNumber = 42;
\`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior
1. **Savol:** Scope nima va u nima uchun kerak?
   * **Javob:** Scope — o'zgaruvchi va funksiyalarning kodning qaysi qismlarida ko'rinishi va ishlash doirasidir. U kodni tartibga solish, xavfsizlikni ta'minlash va nomlar to'qnashuvining oldini olish uchun kerak.
2. **Savol:** \`let\`, \`const\` va \`var\` o'rtasidagi asosiy scope farqi nimada?
   * **Javob:** \`let\` va \`const\` block scope-ga ega (faqat \`{}\` blok ichida ko'rinadi). \`var\` esa function scope-ga ega (faqat funksiya ichida cheklanadi, oddiy bloklardan tashqariga sizib chiqadi).
3. **Savol:** Global Scope nima?
   * **Javob:** Dasturdagi barcha funksiyalar va bloklardan tashqarida joylashgan eng yuqori doira. Global scope-dagi o'zgaruvchilar kodning istalgan joyidan foydalanish mumkin bo'ladi.
4. **Savol:** Quyidagi kod nima chiqaradi? \`if (true) { var user = "Ali"; } console.log(user);\`
   * **Javob:** \`"Ali"\` chiqadi, chunki \`var\` block scope-ga ega emas va u global scope-ga tegishli bo'lib qoladi.

### Middle
5. **Savol:** Leksik qamrov (Lexical Scope) va Dinamik qamrov (Dynamic Scope) farqi nimada?
   * **Javob:** Leksik qamrovda o'zgaruvchi qidirish tartibi kodning yozilgan (e'lon qilingan) joyiga ko'ra belgilanadi (JavaScript-da shunday). Dinamik qamrovda esa funksiya qayerda va qachon chaqirilganiga qarab aniqlanadi.
6. **Savol:** Scope Chain qanday ishlaydi?
   * **Javob:** JavaScript dvigateli o'zgaruvchini joriy lokal scope-dan qidiradi. Topolmasa, zanjir bo'ylab yuqoridagi tashqi leksik muhitlarga chiqadi va global scope-gacha boradi.
7. **Savol:** Variable Shadowing (Soyalash) nima va u qanday yuz beradi?
   * **Javob:** Ichki scope ichida tashqi scope-dagi o'zgaruvchi bilan bir xil nomda yangi o'zgaruvchi e'lon qilinsa, ichki o'zgaruvchi tashqarisidagisini to'sib qo'yadi. Bu variable shadowing deyiladi.
8. **Savol:** Strict mode (\`"use strict"\`) scope ifloslanishini qanday oldini oladi?
   * **Javob:** Strict mode e'lon qilinmagan o'zgaruvchiga qiymat berishga ruxsat bermaydi (ReferenceError beradi) va avtomatik ravishda tasodifiy global o'zgaruvchilar yaratilishini taqiqlaydi.

### Senior
9. **Savol:** JavaScript-da Module Scope nima va u global scope pollution-ni qanday hal qiladi?
   * **Javob:** ES modullarda (\`import/export\` ishlatilganda) har bir fayl o'zining shaxsiy scope-iga ega bo'ladi. Fayl ichidagi o'zgaruvchilar boshqa fayllarga sizib chiqmaydi, faqat \`export\` orqali ruxsat berilganlarigagina kirish mumkin bo'ladi.
10. **Savol:** V8 dvigateli Scope va xotira boshqaruvini qanday optimallashtiradi?
    * **Javob:** V8 dvigateli kodni tahlil qilib, yopilishlar (closures) yoki ichki funksiyalar tomonidan ishlatilmaydigan tashqi o'zgaruvchilarni leksik muhit xotirasidan o'chirib yuboradi (Garbage Collection-ga yordam beradi).
11. **Savol:** Global obyekt (\`window\` yoki \`globalThis\`) va Global scope o'rtasida qanday farq bor?
    * **Javob:** Global scope eng yuqori qamrovdir. Global obyekt esa global scope-dagi ayrim o'zgaruvchilar va brauzer API-larini o'zida saqlovchi obyektdir. Masalan, global scope-da \`let\` yoki \`const\` bilan e'lon qilingan o'zgaruvchilar global obyekt (\`window\`) tarkibiga kirmaydi, lekin \`var\` yoki to'g'ridan-to'g'ri e'lon qilinganlar kiradi.
12. **Savol:** Shadowing bilan hoisting o'rtasidagi bog'liqlikni tushuntiring.
    * **Javob:** Agar ichki blokda \`let\` yordamida o'zgaruvchi soyalansa, u blokning boshidan boshlab hoisting tufayli TDZ (Temporal Dead Zone) hosil qiladi. Hatto tashqi qamrovda shu nomli o'zgaruvchi bo'lsa ham, blok boshida unga murojaat qilish ReferenceError-ga olib keladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Bu bo'limda siz blok qamrovlari, global o'zgaruvchilar bilan ishlash va ichma-ich joylashgan statik leksik qamrov zanjirini mashq qilasiz.

### Scope Chain bo'ylab o'zgaruvchini qidirish zanjiri (Variable Lookup via Scope Chain):

\`\`\`mermaid
graph LR
    subgraph Scope Chain Zanjiri
        Local[Lokal Scope <br> masalan: inner()] -->|Leksik havola| Outer[Tashqi Scope <br> masalan: outer()]
        Outer -->|Leksik havola| Global[Global Scope]
    end
    
    Lookup[O'zgaruvchini qidirish oqimi] -.-> Local
    Local -.->|Topilmasa| Outer
    Outer -.->|Topilmasa| Global
    Global -.->|Topilmasa| RefErr[ReferenceError]
\`\`\`

---

## 7. 📝 12 ta Mini Test

Dars yakunida olingan bilimlaringizni mustahkamlash va tekshirish uchun tayyorlangan 12 ta test savollari.

---

## 8. 🎯 Real Project Case Study

### Modul Pattern yordamida Ma'lumotlarni Izolyatsiya qilish (State Registry)
Katta loyihalarda global scope-ning ifloslanishini oldini olish va maxfiy ma'lumotlarni himoya qilish uchun funksiya scope va block scope-dan foydalaniladi (Module Pattern). Quyidagi misolda xavfsiz tizim konfiguratsiyasi yaratilgan:

\`\`\`javascript
// Immediately Invoked Function Expression (IIFE) va Scope yordamida yopiq muhit yaratish
const AppConfig = (function() {
  // Ushbu o'zgaruvchi global scope-dan butunlay yashiringan (private)
  const systemSettings = {
    apiKey: "SECURE_12345_API_KEY",
    apiBaseUrl: "https://api.myproject.com/v1",
    maxConnections: 5
  };

  // Faqat ruxsat berilgan amallarnigina tashqariga obyekt sifatida chiqaramiz
  return {
    getSetting(key) {
      // Tizim ichki konfiguratsiyasini o'qish (Leksik qamrov orqali kirish)
      if (key in systemSettings) {
        return systemSettings[key];
      }
      return null;
    },
    updateConnectionLimit(newLimit) {
      if (typeof newLimit === "number" && newLimit > 0) {
        systemSettings.maxConnections = newLimit;
        console.log(\`Ulanishlar soni yangilandi: \${systemSettings.maxConnections}\`);
      } else {
        console.error("Noto'g'ri qiymat kiritildi!");
      }
    }
  };
})();

// Foydalanish:
console.log(AppConfig.getSetting("apiBaseUrl")); // "https://api.myproject.com/v1"
AppConfig.updateConnectionLimit(10); // "Ulanishlar soni yangilandi: 10"

// Global scope-dan to'g'ridan-to'g'ri systemSettings obyektiga kirib bo'lmaydi:
console.log(typeof systemSettings); // "undefined"
console.log(AppConfig.systemSettings); // undefined
\`\`\`

---

## 9. 🚀 Performance va Optimization

* **Global qamrovdan kamroq foydalaning:** Global o'zgaruvchilarni o'qish va yozish nisbatan sekinroq kechadi, chunki dvigatel zanjirning eng oxirigacha borishi kerak. Ko'p ishlatiladigan global qiymatlarni lokal o'zgaruvchilarga keshlab oling.
* **Xotira oqishini (Memory Leak) nazorat qiling:** Keraksiz bo'lgan global o'zgaruvchilar sahifa yopilguncha xotirada qoladi. Ularni \`null\` ga tenglash orqali Garbage Collector-ga yordam bering.
* **\`with\` va \`eval\` operatorlaridan voz keching:** Ushbu operatorlar dinamik scope yaratadi. Bu esa JavaScript dvigatellarining JIT (Just-In-Time) optimallashtirish jarayonlarini butunlay buzadi va kod ishlashini sezilarli darajada sekinlashtiradi.

---

## 10. 📌 Cheat Sheet

| Qamrov Turi | Qayerda e'lon qilinadi | Qayerda amal qiladi | Kalit So'zlar |
| :--- | :--- | :--- | :--- |
| **Global Scope** | Har qanday funksiya yoki blokdan tashqarida | Butun dastur davomida istalgan joyda | \`let\`, \`const\`, \`var\` |
| **Function Scope** | Funksiya bloki \`{}\` ichida | Faqat shu funksiya ichida | \`let\`, \`const\`, \`var\` |
| **Block Scope** | Oddiy bloklar \`{}\` (if, for, while) ichida | Faqat shu blok ichida | \`let\`, \`const\` |
| **Shadowing** | Ichki qamrovda tashqi qamrovdagi nom bilan | Faqat ichki qamrov doirasida | Yangi e'lon qilish orqali |
| **Scope Chain** | Ichma-ich qamrovlarda | Lokal -> Tashqi -> Global | Qidiruv mexanizmi |
`,
  exercises: [
    {
      id: 1,
      title: "Global o'zgaruvchi",
      instruction: "globalVar nomli global o'zgaruvchi yarating va uni 'salom' qiymati bilan e'lon qiling. Keyin printVar() funksiyasi ichida uni konsolga chiqaring.",
      startingCode: "let globalVar = 'salom';\nfunction printVar() {\n  // Bu yerga yozing\n}",
      hint: "console.log(globalVar);",
      test: "if (code.includes('console.log(globalVar)')) return null; return 'globalVar ni konsolga chiqaring!';"
    },
    {
      id: 2,
      title: "Function scope",
      instruction: "testScope funksiyasi ichida localVar nomli o'zgaruvchini 'local' qiymati bilan e'lon qiling va uni konsolga chiqaring.",
      startingCode: "function testScope() {\n  // Bu yerga yozing\n}",
      hint: "let localVar = 'local'; console.log(localVar);",
      test: "if (code.includes('let localVar') && code.includes('console.log(localVar)')) return null; return 'localVar o\\'zgaruvchisini local sohada e\\'lon qiling va chop eting!';"
    },
    {
      id: 3,
      title: "Block scope",
      instruction: "if bloki ichida let yordamida blockVar o'zgaruvchisini 'block' qiymati bilan yarating.",
      startingCode: "if (true) {\n  // Bu yerga yozing\n}",
      hint: "let blockVar = 'block';",
      test: "if (code.includes('let blockVar')) return null; return 'if bloki ichida blockVar e\\'lon qiling!';"
    },
    {
      id: 4,
      title: "Block scope const",
      instruction: "if bloki ichida const yordamida blockConst o'zgaruvchisini 'const' qiymati bilan e'lon qiling.",
      startingCode: "if (true) {\n  // Bu yerga yozing\n}",
      hint: "const blockConst = 'const';",
      test: "if (code.includes('const blockConst')) return null; return 'if ichida blockConst e\\'lon qiling!';"
    },
    {
      id: 5,
      title: "var block scope testi",
      instruction: "if bloki ichida var yordamida varVar o'zgaruvchisini 'var' qiymati bilan yarating (u blockdan tashqarida ham ko'rinadi).",
      startingCode: "if (true) {\n  // Bu yerga yozing\n}\nconsole.log(varVar);",
      hint: "var varVar = 'var';",
      test: "if (code.includes('var varVar') && logs.includes('var')) return null; return 'if ichida varVar o\\'zgaruvchisini var yordamida yarating!';"
    },
    {
      id: 6,
      title: "Variable shadowing",
      instruction: "Globalda name = 'Ali' bor. shadow() funksiyasi ichida yana name nomli local o'zgaruvchi yaratib qiymatini 'Vali' qiling va uni konsolga chiqaring.",
      startingCode: "let name = 'Ali';\nfunction shadow() {\n  // Bu yerga yozing\n}",
      hint: "let name = 'Vali'; console.log(name);",
      test: "if (code.includes('let name = \\'Vali\\'') && code.includes('console.log(name)')) return null; return 'Funksiya ichida name ni o\\'zgartirib chiqaring!';"
    },
    {
      id: 7,
      title: "Lexical scope",
      instruction: "outer funksiyasi ichida x = 10 o'zgaruvchisi bor. Ichki inner funksiyasi ichida ushbu x o'zgaruvchisini konsolga chiqaring.",
      startingCode: "function outer() {\n  let x = 10;\n  function inner() {\n    // Bu yerga yozing\n  }\n  inner();\n}",
      hint: "console.log(x);",
      test: "if (code.includes('console.log(x)')) return null; return 'inner funksiyasi ichida x ni konsolga chiqaring!';"
    },
    {
      id: 8,
      title: "Sikl block scope",
      instruction: "for sikli ichida let yordamida 0 dan 3 gacha aylanuvchi i o'zgaruvchisini e'lon qiling.",
      startingCode: "// Bu yerga yozing\nfor (...) {\n  console.log(i);\n}",
      hint: "for (let i = 0; i < 3; i++) {",
      test: "if (code.includes('let i = 0') && logs.includes(2)) return null; return 'for sikli shartini to\\'g\\'ri yozing!';"
    },
    {
      id: 9,
      title: "Mustaqil blok",
      instruction: "Mustaqil block scope { } yaratib, uning ichida let a = 100 o'zgaruvchisini e'lon qiling.",
      startingCode: "// Bu yerga yozing\n",
      hint: "{\n  let a = 100;\n}",
      test: "if (code.includes('{') && code.includes('let a = 100') && code.includes('}')) return null; return 'Jingalak qavslar bilan mustaqil block scope yarating!';"
    },
    {
      id: 10,
      title: "Scope chain qidiruvi",
      instruction: "Tashqi f1 funksiyasida yozilgan x o'zgaruvchisini eng ichki f2 funksiyasida konsolga chiqarish orqali scope chainni ishlating.",
      startingCode: "function f1() {\n  let x = 'chain';\n  function f2() {\n    // Bu yerga yozing\n  }\n  f2();\n}",
      hint: "console.log(x);",
      test: "if (code.includes('console.log(x)')) return null; return 'f2 ichida x ni chop eting!';"
    },
    {
      id: 11,
      title: "Tashqi o'zgaruvchini yangilash",
      instruction: "update() funksiyasi ichidan turib tashqi count o'zgaruvchisini e'lon qilmasdan, to'g'ridan-to'g'ri 10 ga tenglang.",
      startingCode: "let count = 0;\nfunction update() {\n  // Bu yerga yozing\n}\nupdate();",
      hint: "count = 10;",
      test: "if (count === 10 && !code.includes('let count = 10') && !code.includes('const count = 10')) return null; return 'count qiymatini funksiya ichida 10 ga o\\'zgartiring!';"
    },
    {
      id: 12,
      title: "Lexical Scope qaytishi",
      instruction: "greet funksiyasidan ichki funksiyani return qiling, u ichki funksiya greet funksiyasidagi word o'zgaruvchisini konsolga chiqarsin.",
      startingCode: "function greet() {\n  let word = 'Salom';\n  // Bu yerga yozing\n}",
      hint: "return function() { console.log(word); };",
      test: "if (code.includes('return') && code.includes('word')) return null; return 'greet funksiyasidan word ni chop qiluvchi funksiyani return qiling!';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da \"Scope\" (Ko'rinish sohasi) nima?",
    "options": [
      "Dasturning bajarilish tezligini o'lchaydigan maxsus vaqt birligi",
      "O'zgaruvchilar va funksiyalarning kodning qaysi qismlarida ko'rinishi (kirish mumkinligi) va ularning ishlash muddati",
      "Brauzer oynasining o'lchamlarini aniqlaydigan xossa",
      "Faqat server qismida ishlaydigan xavfsizlik protokoli"
    ],
    "correctAnswer": 1,
    "explanation": "Scope o'zgaruvchilar va funksiyalarning kodning qaysi qismlarida ko'rinishi va ularga kirish huquqini belgilaydi."
  },
  {
    "id": 2,
    "question": "JavaScript-da qaysi turdagi ko'rinish sohalari mavjud?",
    "options": [
      "Faqat Global va Local scope",
      "Global, Function va Block scope",
      "Window, Document va Element scope",
      "Static, Dynamic va Virtual scope"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript-da global scope (barcha joyda ko'rinadigan), function scope (funksiya ichida ko'rinadigan) va block scope (let va const bilan blok `{}` ichida cheklangan) mavjud."
  },
  {
    "id": 3,
    "question": "Quyidagi o'zgaruvchi e'lon qilish kalit so'zlaridan qaysilari \"Block Scope\" (blok qamrovi)ga ega?",
    "options": [
      "Faqat `var`",
      "`let` va `const`",
      "`var` va `let`",
      "Barcha o'zgaruvchilar (`var`, `let`, `const`)"
    ],
    "correctAnswer": 1,
    "explanation": "`let` va `const` faqat e'lon qilingan blok `{}` ichida amal qiladi. `var` esa block scope-ni tan olmaydi va u e'lon qilingan funksiyaga (yoki global doiraga) tegishli bo'ladi."
  },
  {
    "id": 4,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nif (true) {\n  var x = 5;\n  let y = 10;\n}\nconsole.log(x);\n```",
    "options": [
      "`ReferenceError: x is not defined`",
      "`5`",
      "`undefined`",
      "`null`"
    ],
    "correctAnswer": 1,
    "explanation": "`var` block scope-ga ega bo'lmagani uchun `x` blokdan tashqarida ham mavjud bo'ladi va uning qiymati 5 ga teng."
  },
  {
    "id": 5,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nif (true) {\n  let y = 10;\n}\nconsole.log(y);\n```",
    "options": [
      "`10`",
      "`undefined`",
      "`ReferenceError: y is not defined`",
      "`null`"
    ],
    "correctAnswer": 2,
    "explanation": "`let` yordamida e'lon qilingan o'zgaruvchi faqat o'sha `if` blokining ichida ko'rinadi. Blokdan tashqarida unga murojaat qilinsa, `ReferenceError` xatosi yuz beradi."
  },
  {
    "id": 6,
    "question": "JavaScript leksik qamrov (Lexical Scope)ga ega deganda nima tushuniladi?",
    "options": [
      "O'zgaruvchilar qamrovi funksiya chaqirilgan joyga qarab dinamik ravishda aniqlanadi",
      "O'zgaruvchilar qamrovi kodning yozilish (e'lon qilinish) vaqtidagi jismoniy joylashuviga ko'ra statik tarzda aniqlanadi",
      "Kodni faqat qat'iy rejimda (`use strict`) yozish majburiyati",
      "O'zgaruvchilar faqat harflardan iborat bo'lishi kerakligi qoidasi"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript statik yoki leksik qamrovdan foydalanadi. Bu degani, funksiya o'zgaruvchilarini qidirishda funksiya qayerda chaqirilganiga emas, balki kodda qayerda e'lon qilinganiga qaraydi."
  },
  {
    "id": 7,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet name = \"Anvar\";\nfunction greet() {\n  console.log(name);\n}\nfunction test() {\n  let name = \"Sardor\";\n  greet();\n}\ntest();\n```",
    "options": [
      "\"Sardor\"",
      "\"Anvar\"",
      "`undefined`",
      "`ReferenceError`"
    ],
    "correctAnswer": 1,
    "explanation": "`greet` funksiyasi global doirada e'lon qilingan. Leksik qamrov qoidasiga ko'ra, u o'zining e'lon qilingan joyidagi tashqi doiraga qaraydi, u yerda `name = \"Anvar\"`. `test` ichidagi `name` unga ta'sir qilmaydi."
  },
  {
    "id": 8,
    "question": "Scope Chain (Qamrovlar Zanjiri) nima?",
    "options": [
      "JavaScript-dagi funksiyalarni ketma-ket ulash protokoli",
      "O'zgaruvchi qidirilayotganda joriy qamrovdan boshlab, to global qamrovgacha bo'lgan tashqi leksik qamrovlar zanjiri bo'yicha yuqoriga qarab qidirish mexanizmi",
      "DOM elementlarini bir-biriga bog'lash usuli",
      "Massivlarni birlashtirish zanjiri"
    ],
    "correctAnswer": 1,
    "explanation": "JavaScript o'zgaruvchini avval joriy (lokal) scope-dan qidiradi. Topa olmasa, bitta tashqi scope-ga chiqadi va bu jarayon global scope-gacha davom etadi. Bu Scope Chain deyiladi."
  },
  {
    "id": 9,
    "question": "Variable Shadowing (O'zgaruvchilar soyalanishi) deganda nima tushuniladi?",
    "options": [
      "O'zgaruvchini xotiradan butunlay o'chirib tashlash",
      "Ichki qamrovdagi (masalan, funksiya ichidagi) o'zgaruvchining tashqi qamrovdagi xuddi shu nomli o'zgaruvchini vaqtincha \"to'sib\" (soyalab) qo'yishi",
      "O'zgaruvchini faqat soya (kulrang) rangda konsolga chiqarish",
      "Bir nechta o'zgaruvchini bitta qiymatga bog'lash"
    ],
    "correctAnswer": 1,
    "explanation": "Agar ichki qamrovda tashqi qamrovdagi o'zgaruvchi bilan bir xil nomli o'zgaruvchi e'lon qilinsa, ichki qamrov ichida faqat lokal o'zgaruvchi ishlaydi va u tashqi o'zgaruvchini soyalaydi (shadowing)."
  },
  {
    "id": 10,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet a = 1;\nfunction shadow() {\n  let a = 2;\n  console.log(a);\n}\nshadow();\nconsole.log(a);\n```",
    "options": [
      "`2` keyin `2`",
      "`1` keyin `2`",
      "`2` keyin `1`",
      "`undefined` keyin `1`"
    ],
    "correctAnswer": 2,
    "explanation": "`shadow()` ichida lokal `a = 2` e'lon qilinib, global `a` ni soyalaydi va konsolga `2` chiqadi. Funksiyadan tashqarida esa global `a` o'zining dastlabki `1` qiymatini saqlab qolgan, shuning uchun `1` chiqadi."
  },
  {
    "id": 11,
    "question": "JavaScript-da \"Global Scope Pollution\" (Global qamrovning ifloslanishi) nima?",
    "options": [
      "Global o'zgaruvchilarning juda ko'p xotira egallashi va o'chib ketmasligi",
      "Juda ko'p global o'zgaruvchilar e'lon qilish natijasida nomlar to'qnashuvi (naming collisions) va kutilmagan xatolar yuzaga kelishi",
      "Brauzer keshining ortiqcha ma'lumotlar bilan to'lib ketishi",
      "Kodda juda ko'p izohlar yozish"
    ],
    "correctAnswer": 1,
    "explanation": "Agar juda ko'p o'zgaruvchilar global qamrovda e'lon qilinsa, loyihaning boshqa qismlari yoki kutubxonalar o'sha nomlarni tasodifan o'zgartirib yuborishi mumkin. Bu nomlar to'qnashuvi va kutilmagan xatolarga sabab bo'ladi."
  },
  {
    "id": 12,
    "question": "Strict Mode (`\"use strict\"`) yoqilganda, e'lon qilinmagan o'zgaruvchiga qiymat yuklash nima bilan yakunlanadi?",
    "options": [
      "U avtomatik ravishda global o'zgaruvchiga aylanadi",
      "Kod xatosiz ishlayveradi va hech narsa bo'lmaydi",
      "`ReferenceError` xatosi yuz beradi",
      "O'zgaruvchi faqat o'sha fayl ichida local bo'lib qoladi"
    ],
    "correctAnswer": 2,
    "explanation": "Strict Mode-da e'lon qilinmagan o'zgaruvchiga qiymat berish taqiqlanadi va u global o'zgaruvchi yaratish o'rniga `ReferenceError` chiqaradi. Bu global scope-ning bexosdan ifloslanishining oldini oladi."
  }
]

};
