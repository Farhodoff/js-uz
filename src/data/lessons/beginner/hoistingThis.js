export const hoistingThisLesson = {
  id: "hoistingThisLesson",
  title: "Hoisting",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish va O'xshatish

### Hoisting nima?
**Hoisting (Ko'tarilish)** — bu JavaScript dvigatelining (masalan, V8) kodni bajarishdan oldin uning tarkibidagi o'zgaruvchilar va funksiya e'lonlarini xotirada ro'yxatga olish jarayonidir. Kod yozilishida o'zgaruvchilar pastki qatorda e'lon qilingan bo'lsa-da, JavaScript ularni o'z doirasining (scope) eng yuqori qismiga "ko'tarilgandek" tasavvur qiladi. 

Muhim jihati shundaki, kodning o'zi jismonan fayl ichida yuqoriga ko'chmaydi. Shunchaki, kod bajarilishidan oldingi **kompilyatsiya fazasida** xotiradan joy ajratiladi.

### Real hayotiy o'xshatish
Tasavvur qiling, siz **konferensiya tashkilotchisiz**:
* **Funksiya e'lonlari (Function Declarations) — Tayyor ma'ruzachilar:** Siz sahna orqasiga kirganingizda, ba'zi taniqli ma'ruzachilar allaqachon nutqlarining matni bilan tayyor turishibdi. Siz ularni istalgan paytda, hatto rasmiy ochilishdan oldin ham sahna olib chiqib so'zga chorlay olasiz (to'liq hoisting bo'ladi).
* **\`var\` o'zgaruvchilari — Nomsiz stullar:** Zalda stullar qo'yilgan, lekin ularda kim o'tirishi hali yozilmagan. Ular mavjud, lekin ularga qarasangiz faqat bo'sh joyni ko'rasiz (\`undefined\` qiymatini oladi).
* **\`let\` va \`const\` o'zgaruvchilari — Kechikayotgan maxsus mehmonlar (TDZ):** Ro'yxatda ularning ismlari bor (xotirada ro'yxatga olingan), lekin ular hali zaldagi o'z joylariga kelib o'tirishmagan. Ular o'z o'rindiqlariga kelib joylashmaguncha (e'lon qilingan qatorga yetib kelguncha) ularning nomini aytib chaqira olmaysiz. Agar chaqirsangiz, tartib qo'riqchisi sizni to'xtatadi (\`ReferenceError\` xatoligi).

---

## 2. 💻 Real Kod Misollari

### 1. Basic Example: \`var\` va \`let\` o'rtasidagi hoisting farqi
\`var\` deklaratsiyadan oldin chaqirilganda xatolik bermaydi, \`let\` esa xatolikka sabab bo'ladi:
\`\`\`javascript
// var bilan:
console.log(username); // undefined
var username = "Farhod";
console.log(username); // "Farhod"

// let bilan:
try {
  console.log(age); // ReferenceError: Cannot access 'age' before initialization
} catch (error) {
  console.error(error.message);
}
let age = 25;
\`\`\`

### 2. Intermediate Example: Function Declaration vs Function Expression
Function Declaration to'liq ko'tariladi, lekin o'zgaruvchiga yuklangan funksiya ifodasi (Function Expression) o'sha o'zgaruvchining turiga qarab ishlaydi:
\`\`\`javascript
// 1. Function Declaration (To'liq ko'tariladi)
sayHello(); // "Salom!" chiqadi

function sayHello() {
  console.log("Salom!");
}

// 2. Function Expression (var bilan)
try {
  sayGoodbye(); // TypeError: sayGoodbye is not a function
} catch (error) {
  console.error("Xato:", error.message); // sayGoodbye undefined bo'lgani uchun uni funksiya kabi chaqirib bo'lmaydi
}

var sayGoodbye = function() {
  console.log("Xayr!");
};

// 3. Function Expression (const/let bilan)
try {
  sayGoodNight(); // ReferenceError: Cannot access 'sayGoodNight' before initialization
} catch (error) {
  console.error("Xato:", error.message);
}

const sayGoodNight = () => {
  console.log("Xayrli tun!");
};
\`\`\`

### 3. Advanced Example: Hoisting-da Funksiya va var Ustuvorligi
Agar bir xil nomda ham funksiya, ham \`var\` o'zgaruvchisi e'lon qilinsa, hoisting bosqichida funksiya ustuvor bo'ladi, lekin bajarilish bosqichida o'zgaruvchi qiymati uni qayta yozib yuboradi:
\`\`\`javascript
console.log(typeof test); // "function" - chunki funksiya birinchi ko'tariladi

var test = "Men matnman";
function test() {
  return "Men funksiyaman";
}

console.log(typeof test); // "string" - chunki kod bajarilish bosqichida 'test'ga matn yuklandi
\`\`\`

---

## 3. ⚙️ Qanday Ishlaydi (Under the Hood)

JavaScript dvigateli kodni ikki bosqichda bajaradi:
1. **Kompilyatsiya fazasi (Compilation Phase):** Dvigatel kodni o'qib chiqadi va barcha deklaratsiyalarni (o'zgaruvchilar, funksiyalar, klasslar) aniqlaydi. Ular uchun xotiradan (Memory Heap) joy ajratadi va ularni mos keladigan **Leksik Muhitga (Lexical Environment)** yozadi.
2. **Bajarilish fazasi (Execution Phase):** Kod yuqoridan pastga qarab qatorma-qator bajariladi. O'zgaruvchilarga haqiqiy qiymatlar aynan shu bosqichda yuklanadi.

### Variable Environment va Lexical Environment
* **Variable Environment:** Faqat \`var\` kalit so'zi bilan e'lon qilingan o'zgaruvchilarni saqlaydi va ularga kompilyatsiya bosqichida avtomatik ravishda \`undefined\` qiymatini biriktiradi.
* **Lexical Environment:** \`let\`, \`const\` o'zgaruvchilar hamda klasslarni saqlaydi. Dvigatel ularni xotirada ro'yxatdan o'tkazadi, ammo ularga hech qanday qiymat biriktirmaydi (ular *uninitialized* holatda qoladi). Ular o'z e'lon qilingan qatorga yetib kelmaguncha kirish taqiqlangan hududda — **Temporal Dead Zone (TDZ)** da bo'lishadi.

---

## 4. ❌ Ko'p Uchraydigan Xatolar (Junior Mistakes)

### 1. Arrow funksiyalarni e'lon qilishdan oldin chaqirish
Junior dasturchilar ko'pincha barcha funksiyalarni e'londan oldin chaqirish mumkin deb o'ylashadi.
* **YOMON:**
  \`\`\`javascript
  const result = calculate(5); // ReferenceError!
  const calculate = (num) => num * 2;
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  const calculate = (num) => num * 2;
  const result = calculate(5);
  \`\`\`

### 2. TDZ hududida o'zgaruvchidan foydalanishga urinish
* **YOMON:**
  \`\`\`javascript
  function showUser() {
    console.log(role); // ReferenceError
    let role = "admin";
  }
  showUser();
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  function showUser() {
    let role = "admin";
    console.log(role);
  }
  showUser();
  \`\`\`

### 3. Tashqi o'zgaruvchini var yordamida ichkarida xatolik bilan soyalash (Shadowing Bug)
* **YOMON:**
  \`\`\`javascript
  var theme = "dark";
  function applyTheme() {
    if (!theme) { 
      console.log("Mavzu aniqlanmadi!"); 
    }
    var theme = "light";
  }
  applyTheme();
  \`\`\`
* **YAXSHI:**
  \`\`\`javascript
  let theme = "dark";
  function applyTheme() {
    let localTheme = "light";
    console.log(theme); // "dark"
    console.log(localTheme); // "light"
  }
  applyTheme();
  \`\`\`

---

## 5. 💬 12 ta Intervyu Savollari

### Junior Savollar
1. **Savol:** JavaScript-da Hoisting nima?
   * **Javob:** Hoisting — bu JavaScript dvigateli kodni bajarishdan oldin o'zgaruvchilar va funksiya e'lonlarini xotirada ro'yxatdan o'tkazishi va ularga xotiradan joy ajratish jarayonidir.
2. **Savol:** \`var\` va \`let\` o'rtasidagi hoisting farqi nimada?
   * **Javob:** \`var\` hoisting bo'lganda unga \`undefined\` qiymati beriladi va e'londan oldin murojaat qilganda xato bermaydi. \`let\` esa e'londan oldin TDZ da bo'ladi va murojaat qilinganda \`ReferenceError\` beradi.
3. **Savol:** Function Declaration va Function Expression hoisting-da qanday farq qiladi?
   * **Javob:** Function Declaration to'liq hoist bo'ladi. Function Expression esa o'zgaruvchiga tenglangani uchun, u e'lon qilingan o'zgaruvchi kabi (masalan, \`var\` bo'lsa \`undefined\`) hoist bo'ladi.
4. **Savol:** Temporal Dead Zone (TDZ) nima?
   * **Javob:** TDZ — blokning boshlanishidan to \`let\` yoki \`const\` o'zgaruvchisi e'lon qilingan qatorgacha bo'lgan vaqt oralig'idir. Bu hududda o'zgaruvchiga kirish taqiqlanadi.

### Middle Savollar
5. **Savol:** Nima uchun quyidagi kod \`TypeError\` beradi, \`ReferenceError\` emas?
   \`\`\`javascript
   test();
   var test = function() {};
   \`\`\`
   * **Javob:** Chunki \`var test\` hoisting bo'lib, \`undefined\` qiymatini oladi. \`undefined\`ni funksiya sifatida chaqirishga harakat qilganimiz uchun \`TypeError\` xatosi yuz beradi.
6. **Savol:** Class-lar hoisting bo'ladimi?
   * **Javob:** Ha, klasslar ham hoisting bo'ladi. Ammo ular ham \`let\` kabi TDZ da qoladi va ularni e'londan oldin chaqirish xato.
7. **Savol:** Blok ichidagi funksiya e'lonlari (block-scoped functions) qanday ko'tariladi?
   * **Javob:** ES6 bo'yicha blok ichidagi funksiyalar faqat o'sha blok ichida amal qiladi. Lekin eski brauzerlarda tashqariga ham sizishi mumkin.
8. **Savol:** \`var\` o'zgaruvchilari global scope'da nimaga aylanadi?
   * **Javob:** \`var\` bilan e'lon qilingan global o'zgaruvchilar \`window\` obyektining xususiyatiga (property) aylanadi.

### Senior Savollar
9. **Savol:** JavaScript dvigateli (V8) xotirani boshqarishda hoisting jarayonini qanday optimallashtiradi?
   * **Javob:** V8 kompilyatsiya bosqichida barcha scope va o'zgaruvchilar joylashuvini aniqlab oladi. \`const\` o'zgaruvchilarga "inline cache" ishlatadi.
10. **Savol:** Funksiya parametrlarida TDZ qanday yuzaga kelishi mumkin?
    * **Javob:** Agar funksiyaning default parametrlari bir-biriga murojaat qilsa va tartib buzilsa: \`function foo(a = b, b = 2) {}\`.
11. **Savol:** ES6 module import-lari qanday hoisting bo'ladi?
    * **Javob:** ES6 module import-lari to'liq hoisting bo'ladi. Ular modul ichidagi har qanday kod bajarilishidan oldin yuklanadi.
12. **Savol:** Quyidagi kodni tahlil qiling. Nima uchun xato beradi? \`let x = x;\`
    * **Javob:** Bu kod \`ReferenceError\` beradi. Chap tomondagi \`x\` e'lon qilinishi TDZ da bo'lganligi sababli unga qiymat sifatida yana o'zini berish xatodir.

---

## 6. 🛠️ Amaliy Topshiriqlar

### Xotira ajratilishi (Hoisting) va TDZ diagrammasi:

Quyidagi diagrammada kompilyatsiya jarayonida turli e'lonlar uchun xotira ajratilishi va ularning Temporal Dead Zone (TDZ) bilan bog'liqligi ko'rsatilgan:

\`\`\`mermaid
graph TD
    A[JavaScript Dvigateli: Kompilyatsiya Fazasi] --> B{Deklaratsiya turi qanday?}
    B -->|var| C[var x]
    B -->|function declaration| D[function greet()]
    B -->|let / const| E[let y / const z]
    
    C --> C1[Xotiradan joy ajratiladi] --> C2[Boshlang'ich qiymat: undefined]
    D --> D1[Xotiradan joy ajratiladi] --> D2[Funksiya tanasi to'liq yuklanadi]
    E --> E1[Xotiradan joy ajratiladi] --> E2[Boshlang'ich qiymat: Uninitialized] --> E3[Temporal Dead Zone - TDZ boshlanishi]

    style C2 fill:#ffeb3b,stroke:#333,stroke-width:1px
    style D2 fill:#8bc34a,stroke:#333,stroke-width:1px
    style E3 fill:#f44336,stroke:#333,stroke-width:1px
\`\`\`

---

## 7. 📝 12 ta Mini Test

Testlar dars yakunida taqdim etilgan.

---

## 8. 🎯 Real Project Case Study

### Kodni Strukturasi (Clean Code) va Hoisting
Real loyihalarda hoisting dasturchilarga kodni yanada o'qishli va chiroyli tartiblashga yordam beradi.

#### Stepdown Rule (Pastga qarab o'qish qoidasi)
Clean Code (Robert Martin) kitobida yozilishicha, yuqori darajadagi mantiqiy funksiyalar faylning yuqori qismida, yordamchi funksiyalar pastda bo'lishi kerak. Function declaration hoisting bizga aynan shunday kod yozish imkonini beradi:

\`\`\`javascript
export function handleUserProfile(userId) {
  const rawData = fetchUserData(userId);
  const validated = validateData(rawData);
  return formatOutput(validated);
}

function fetchUserData(id) {
  return { id, name: "Ali", email: "ali@gmail.com", status: "active" };
}

function validateData(user) {
  if (!user.email.includes("@")) throw new Error("Noto'g'ri email");
  return user;
}

function formatOutput(user) {
  return {
    displayName: user.name.toUpperCase(),
    contact: user.email
  };
}
\`\`\`

---

## 9. 🚀 Performance va Optimization

### 1. V8 Scope Analysis
JavaScript dvigateli kodni ishga tushirishdan oldin lisoniy tahlil (Scope Analysis) o'tkazadi. \`var\` o'zgaruvchilarni topganda \`undefined\` yozadi. \`let\` va \`const\` uchun xotira uyalarini belgilaydi, lekin qiymat yozmaydi.

### 2. Static Optimization
\`const\` o'zgaruvchilarni V8 dvigateli "static pointer" sifatida taniydi. O'zgaruvchi qiymati o'zgarmasligini bilish kompilyatorga kodni optimallashtirish imkonini beradi. Shuning uchun iloji boricha ko'proq \`const\` ishlatish tavsiya etiladi.

---

## 10. 📌 Cheat Sheet

| Xususiyat | \`var\` | \`let\` / \`const\` | Function Declaration | Function Expression | Class Declaration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hoisting?** | Ha | Ha (TDZ) | Ha (To'liq) | Ha (TDZ yoki undefined) | Ha (TDZ) |
| **Boshlang'ich Qiymati** | \`undefined\` | Uninitialized | Funksiya tanasi | Uninitialized/\`undefined\` | Uninitialized |
| **E'londan oldin chaqirish** | \`undefined\` qaytaradi | \`ReferenceError\` | Ishlaydi | Xato beradi | \`ReferenceError\` |
| **Doirasi (Scope)** | Function Scope | Block Scope | Block/Function | Block Scope | Block Scope |
| **Qayta e'lon qilish** | Mumkin | Taqiqlangan | Mumkin | Taqiqlangan | Taqiqlangan |
`,
  exercises: [
    {
      "id": 1,
      "title": "Funksiya Ifodasining Hoisting Muammosi",
      "instruction": "Quyidagi kodda `sayGoodbye` o'zgaruvchiga yuklanganligi sababli chaqirishda `ReferenceError` xatosi chiqmoqda. Kodni to'g'irlab, `sayGoodbye` chaqirilishidan oldin e'lon qilinishini ta'minlang.",
      "startingCode": "function greetUsers() {\n  const hello = sayHello();\n  const goodbye = sayGoodbye();\n\n  function sayHello() {\n    return \"Salom\";\n  }\n\n  const sayGoodbye = function() {\n    return \"Xayr\";\n  };\n\n  return hello + \" va \" + goodbye;\n}\n",
      "hint": "sayGoodbye o'zgaruvchisini uni ishlatishdan oldinga ko'chiring.",
      "test": "try { const fn = new Function(code + '; return greetUsers;')(); const res = fn(); if (res !== 'Salom va Xayr') return 'Natija xato'; return null; } catch (err) { return err.message; }"
    },
    {
      "id": 2,
      "title": "var Hoisting va Soyalash (Shadowing)",
      "instruction": "Funksiya ichidagi `var score = 3` global o'zgaruvchini soyalab (shadowing) qo'ydi va xato ishlashiga olib keldi. Funksiya ichidagi o'zgaruvchini `let localScore = 3` shaklida almashtiring.",
      "startingCode": "var score = 10;\n\nfunction play() {\n  if (score > 5) {\n    return \"Yutdingiz\";\n  }\n  var score = 3;\n  return \"Yutqazdingiz\";\n}\n",
      "hint": "Funksiya ichidagi var score e'lonini o'chirib, let localScore ishlating.",
      "test": "try { const fn = new Function(code + '; return play;')(); if (fn() !== 'Yutdingiz') return 'Xato'; return null; } catch (err) { return err.message; }"
    },
    {
      "id": 3,
      "title": "Temporal Dead Zone (TDZ) va let/const",
      "instruction": "O'zgaruvchilar tartibini to'g'rilab, `message` e'lonini `console.log` dan oldinga ko'chiring.",
      "startingCode": "function formatMessage() {\n  console.log(message);\n  let message = \"Salom Dunyo!\";\n  return message;\n}\n",
      "hint": "message o'zgaruvchisini console.log dan yuqorida e'lon qiling.",
      "test": "try { const fn = new Function(code + '; return formatMessage;')(); if (fn() !== 'Salom Dunyo!') return 'Xato'; return null; } catch (err) { return err.message; }"
    },
    {
      "id": 4,
      "title": "let orqali Loop Scope muammosi",
      "instruction": "`var i` bilan yozilgan for sikli setTimeout ichida doim oxirgi qiymatni chiqaradi. Koddagi `var` o'rniga `let` ishlating.",
      "startingCode": "function runLoop() {\n  var result = [];\n  for (var i = 0; i < 3; i++) {\n    result.push(() => i);\n  }\n  return result[0]() + result[1]() + result[2]();\n}",
      "hint": "for (let i = 0; ...) qilib o'zgartiring.",
      "test": "try { const fn = new Function(code + '; return runLoop;')(); if (fn() !== 3) return 'Xato'; return null; } catch(err) { return err.message; }"
    },
    {
      "id": 5,
      "title": "Klass e'loni va Hoisting",
      "instruction": "Klasslar ham hoisting bo'ladi, lekin TDZ ga ega. `new User()` chaqiruvini klass e'lonidan keyinga ko'chiring.",
      "startingCode": "function makeUser() {\n  const user1 = new User(\"Ali\");\n  class User {\n    constructor(name) { this.name = name; }\n  }\n  return user1.name;\n}",
      "hint": "const user1... qismini class e'lonidan pastga olib tushing.",
      "test": "try { const fn = new Function(code + '; return makeUser;')(); if (fn() !== 'Ali') return 'Xato'; return null; } catch(err) { return err.message; }"
    },
    {
      "id": 6,
      "title": "Const va Hoisting",
      "instruction": "Xuddi `let` kabi `const` ham TDZ ga tushadi. Koddagi xatoni tuzating (tartibni to'g'rilang).",
      "startingCode": "function getPI() {\n  const p = PI;\n  const PI = 3.14;\n  return p;\n}",
      "hint": "PI ni p dan oldin e'lon qiling.",
      "test": "try { const fn = new Function(code + '; return getPI;')(); if (fn() !== 3.14) return 'Xato'; return null; } catch(err) { return err.message; }"
    },
    {
      "id": 7,
      "title": "var va window obyekti",
      "instruction": "Global doirada `var` ishlatsangiz u `window` ga qo'shiladi, lekin `let` emas. Funksiyani shunday o'zgartiringki, u faqat `let` ishlatsin.",
      "startingCode": "function createVars() {\n  var a = 1;\n  var b = 2;\n  return a + b;\n}",
      "hint": "var a = 1 o'rniga let a = 1 va let b = 2.",
      "test": "if (code.includes('var ')) return 'var ishlatmang'; try { const fn = new Function(code + '; return createVars;')(); if(fn()!==3) return 'xato'; return null; } catch(err){ return err.message; }"
    },
    {
      "id": 8,
      "title": "Standart parametrda TDZ",
      "instruction": "Parametrlarda `(a = b, b = 2)` qilsak, xato yuz beradi. Buni `(b = 2, a = b)` qilib to'g'rilang.",
      "startingCode": "function defaultParams(a = b, b = 2) {\n  return a + b;\n}",
      "hint": "O'zgaruvchilarni parametrlarda to'g'ri ketma-ketlikda yozing.",
      "test": "try { const fn = new Function(code + '; return defaultParams;')(); if (fn() !== 4) return 'Xato'; return null; } catch(err) { return err.message; }"
    },
    {
      "id": 9,
      "title": "Strict Mode da xato",
      "instruction": "O'zgaruvchini e'lon qilmasdan yozish xato. Koddagi o'zgaruvchiga e'lon qo'shing (`let` yoki `const`).",
      "startingCode": "function implicitVar() {\n  myStr = \"test\";\n  return myStr;\n}",
      "hint": "let myStr = 'test';",
      "test": "if (!code.includes('let ') && !code.includes('const ') && !code.includes('var ')) return 'E\\'lon qilish kalit so\\'zidan foydalaning'; return null;"
    },
    {
      "id": 10,
      "title": "Qayta e'lon qilish",
      "instruction": "`var` ni qayta e'lon qilish mumkin, lekin `let` ni emas. Ikkita bir xil nomli `let` bor, birini olib tashlang yoki nomini o'zgartiring.",
      "startingCode": "function declareTwice() {\n  let x = 5;\n  let x = 10;\n  return x;\n}",
      "hint": "Bitta x qolsin (masalan, x = 10 e'lonsiz berilsin).",
      "test": "try { const fn = new Function(code + '; return declareTwice;')(); if (fn() !== 10) return 'Xato'; return null; } catch(err){ return err.message; }"
    }
  ],
  quizzes: [
    {
      "id": 1,
      "question": "JavaScript-da hoisting (ko'tarilish) nima?",
      "options": [
        "Kod bajarilayotganda barcha o'zgaruvchilar va funksiyalarni global window obyektiga o'tkazish",
        "Kod bajarilishidan oldin o'zgaruvchilar va funksiya e'lonlarining xotiraga joylashtirilishi",
        "Sikl ichidagi o'zgaruvchilarning tashqi doiraga sizib chiqishi",
        "O'zgaruvchilar qiymatlarini avtomatik ravishda o'chirib tashlash mexanizmi"
      ],
      "correctAnswer": 1,
      "explanation": "Hoisting — bu JavaScript dvigateli kodni bajarishdan oldin o'zgaruvchilar va funksiya deklaratsiyalarini o'z doirasining (scope) yuqori qismiga ko'tarib, xotiradan joy ajratish xususiyatidir."
    },
    {
      "id": 2,
      "question": "var kalit so'zi bilan e'lon qilingan o'zgaruvchi hoisting jarayonida qanday boshlang'ich qiymatga ega bo'ladi?",
      "options": [
        "null",
        "Boshlang'ich qiymatga ega bo'lmaydi va ReferenceError beradi",
        "0",
        "undefined"
      ],
      "correctAnswer": 3,
      "explanation": "var o'zgaruvchilari hoisting paytida xotirada yaratiladi va ularga avtomatik ravishda undefined boshlang'ich qiymati biriktiriladi."
    },
    {
      "id": 3,
      "question": "Quyidagi kod ishga tushirilganda konsolga nima chiqadi?\\n```javascript\\nconsole.log(myVar);\\nvar myVar = 10;\\n```",
      "options": [
        "10",
        "undefined",
        "ReferenceError: myVar is not defined",
        "TypeError"
      ],
      "correctAnswer": 1,
      "explanation": "var myVar hoisting bo'ladi va 'undefined' oladi."
    },
    {
      "id": 4,
      "question": "Quyidagi kod ishga tushirilganda nima sodir bo'ladi?\\n```javascript\\nconsole.log(myLet);\\nlet myLet = 20;\\n```",
      "options": [
        "undefined chiqadi",
        "20 chiqadi",
        "ReferenceError: Cannot access 'myLet' before initialization",
        "TypeError"
      ],
      "correctAnswer": 2,
      "explanation": "let o'zgaruvchisi hoisting bo'ladi, lekin TDZ da bo'ladi."
    },
    {
      "id": 5,
      "question": "Temporal Dead Zone (Vaqtinchalik O'lik Hudud) nima?",
      "options": [
        "Xotira qismi",
        "Blok boshlanishidan to o'zgaruvchi e'lon qilingan qatorgacha bo'lgan, murojaat qilib bo'lmaydigan hudud",
        "Asinxron kodlar bajarilishini kutadigan vaqt oralig'i",
        "Sikl tugagandan keyin blokda qoladigan vaqt"
      ],
      "correctAnswer": 1,
      "explanation": "TDZ bu oraliqdir."
    },
    {
      "id": 6,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\ngreet();\\nfunction greet() {\\n  console.log('Salom!');\\n}\\n```",
      "options": [
        "Salom!",
        "TypeError",
        "ReferenceError",
        "undefined"
      ],
      "correctAnswer": 0,
      "explanation": "Function declaration to'liq hoisting bo'ladi."
    },
    {
      "id": 7,
      "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\\n```javascript\\ngreet();\\nvar greet = function() {\\n  console.log('Salom!');\\n};\\n```",
      "options": [
        "Salom!",
        "TypeError: greet is not a function",
        "ReferenceError",
        "undefined"
      ],
      "correctAnswer": 1,
      "explanation": "greet bu yerda var bilan undefined bo'ladi."
    },
    {
      "id": 8,
      "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\\n```javascript\\ngreet();\\nconst greet = () => {\\n  console.log('Salom!');\\n};\\n```",
      "options": [
        "Salom!",
        "TypeError",
        "ReferenceError",
        "undefined"
      ],
      "correctAnswer": 2,
      "explanation": "const ham TDZ da bo'ladi."
    },
    {
      "id": 9,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nvar a = 1;\\nfunction test() {\\n  console.log(a);\\n  var a = 2;\\n}\\ntest();\\n```",
      "options": [
        "1",
        "2",
        "undefined",
        "ReferenceError"
      ],
      "correctAnswer": 2,
      "explanation": "test() ichidagi var a hoisting bo'lib local o'zgaruvchiga aylanadi."
    },
    {
      "id": 10,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nvar x = 5;\\nfunction x() {}\\nconsole.log(typeof x);\\n```",
      "options": [
        "function",
        "number",
        "undefined",
        "SyntaxError"
      ],
      "correctAnswer": 1,
      "explanation": "Function declaration oldin hoisting bo'ladi, keyin unga 5 qiymati beriladi."
    },
    {
      "id": 11,
      "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\\n```javascript\\nlet y = 10;\\nfunction test() {\\n  let y = 20;\\n  console.log(y);\\n}\\ntest();\\n```",
      "options": [
        "SyntaxError",
        "10",
        "20",
        "undefined"
      ],
      "correctAnswer": 2,
      "explanation": "Local let tashqi y ni shadow qiladi."
    },
    {
      "id": 12,
      "question": "Klass (Class) e'lonlarining hoisting bo'lishi haqida qaysi tasdiq to'g'ri?",
      "options": [
        "Klasslar funksiyalar kabi to'liq hoisting bo'ladi",
        "Klasslar mutlaqo hoisting bo'lmaydi",
        "Klasslar let kabi hoisting bo'ladi, lekin TDZ da bo'ladi",
        "Klasslar undefined qaytaradi"
      ],
      "correctAnswer": 2,
      "explanation": "Klasslar let kabi ishlaydi."
    }
  ]
};
