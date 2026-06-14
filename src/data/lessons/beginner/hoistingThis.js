export const hoistingThisLesson = {
  id: "hoistingThisLesson",
  title: "Hoisting",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish

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
* **Noto'g'ri:**
  \`\`\`javascript
  const result = calculate(5); // ReferenceError!
  const calculate = (num) => num * 2;
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  const calculate = (num) => num * 2;
  const result = calculate(5); // To'g'ri tartib
  \`\`\`

### 2. TDZ hududida o'zgaruvchidan foydalanishga urinish
* **Noto'g'ri:**
  \`\`\`javascript
  function showUser() {
    console.log(role); // ReferenceError
    let role = "admin";
  }
  showUser();
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  function showUser() {
    let role = "admin";
    console.log(role); // To'g'ri
  }
  showUser();
  \`\`\`

### 3. Tashqi o'zgaruvchini var yordamida ichkarida xatolik bilan soyalash (Shadowing Bug)
* **Noto'g'ri:**
  \`\`\`javascript
  var theme = "dark";
  function applyTheme() {
    // Tashqi theme ishlatiladi deb o'ylaymiz, lekin pastdagi 'var theme' hoisting tufayli bu yerda undefined beradi
    if (!theme) { 
      console.log("Mavzu aniqlanmadi!"); // Bu ishlaydi!
    }
    var theme = "light";
  }
  applyTheme();
  \`\`\`
* **To'g'ri:**
  \`\`\`javascript
  let theme = "dark";
  function applyTheme() {
    // let yoki const ishlatib o'zgaruvchi nomini to'qnashishdan saqlaymiz
    let localTheme = "light";
    console.log(theme); // "dark" (global)
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
   * **Javob:** Function Declaration to'liq hoist bo'ladi (tanasi bilan birga). Function Expression esa o'zgaruvchiga tenglangani uchun, u e'lon qilingan o'zgaruvchi kabi (masalan, \`var\` bo'lsa \`undefined\`, \`let\` bo'lsa TDZ) hoist bo'ladi.
4. **Savol:** Temporal Dead Zone (TDZ) nima?
   * **Javob:** TDZ — blokning boshlanishidan to \`let\` yoki \`const\` o'zgaruvchisi e'lon qilingan qatorgacha bo'lgan vaqt oralig'idir. Bu hududda o'zgaruvchiga kirish taqiqlanadi.

### Middle Savollar
5. **Savol:** Nima uchun quyidagi kod \`TypeError\` beradi, \`ReferenceError\` emas?
   \`\`\`javascript
   test();
   var test = function() {};
   \`\`\`
   * **Javob:** Chunki \`var test\` hoisting bo'lib, \`undefined\` qiymatini oladi (\`ReferenceError\` chiqmaydi). So'ngra \`undefined\`ni funksiya sifatida chaqirishga harakat qilganimiz uchun \`TypeError\` xatosi yuz beradi.
6. **Savol:** Class-lar hoisting bo'ladimi?
   * **Javob:** Ha, klasslar ham orqada hoisting bo'ladi. Ammo ular ham \`let\` va \`const\` kabi TDZ da qoladi. E'londan oldin klassdan obyekt olishga urinsangiz, \`ReferenceError\` xatosini olasiz.
7. **Savol:** Quyidagi kod bajarilganda konsolga nima chiqadi?
   \`\`\`javascript
   var a = 1;
   function b() {
     a = 10;
     return;
     function a() {}
   }
   b();
   console.log(a);
   \`\`\`
   * **Javob:** \`1\` chiqadi. Chunki \`b\` funksiyasi ichida \`function a() {}\` hoisting bo'lib local o'zgaruvchiga aylanadi. \`a = 10\` amali local \`a\` ni o'zgartiradi. Tashqi global \`a\` esa o'zgarishsiz qoladi.
8. **Savol:** Blok ichidagi funksiya e'lonlari (block-scoped functions) qanday ko'tariladi?
   * **Javob:** ES6 bo'yicha blok ichidagi funksiyalar faqat o'sha blok ichida amal qiladi. Biroq eski brauzerlar va strict mode ishlatilmagan holatlarda ular blokdan tashqarida ham \`undefined\` bo'lib ko'rinishi mumkin (brauzerga bog'liq). Shuning uchun blok ichida har doim function expression ishlatish tavsiya etiladi.

### Senior Savollar
9. **Savol:** JavaScript dvigateli (V8) xotirani boshqarishda hoisting jarayonini qanday optimallashtiradi?
   * **Javob:** V8 kompilyatsiya bosqichida barcha scope va o'zgaruvchilar joylashuvini aniqlab oladi. \`const\` o'zgaruvchilarga qiymat faqat bir marta yozilishini bilgani uchun, ularni "inline cache" va boshqa tezkor optimallashtirish usullari bilan tezroq bajaradi.
10. **Savol:** Funksiya parametrlarida TDZ qanday yuzaga kelishi mumkin?
    * **Javob:** Agar funksiyaning default parametrlari bir-biriga murojaat qilsa va bunda tartib buzilsa TDZ yuz beradi:
      \`\`\`javascript
      function foo(a = b, b = 2) {}
      foo(); // ReferenceError: Cannot access 'b' before initialization
      \`\`\`
11. **Savol:** ES6 module import-lari qanday hoisting bo'ladi?
    * **Javob:** ES6 module import-lari to'liq hoisting bo'ladi. Ular modul ichidagi har qanday kod bajarilishidan oldin yuklanadi va ishga tushadi. Shuning uchun faylning istalgan joyida \`import\` yozish mumkin, garchi qoida tariqasida eng tepada yozish lozim bo'lsa ham.
12. **Savol:** Quyidagi kodni tahlil qiling. Nima uchun xato beradi?
    \`\`\`javascript
    let x = x;
    \`\`\`
    * **Javob:** Bu kod \`ReferenceError: Cannot access 'x' before initialization\` xatosini beradi. Chunki o'ng tomondagi \`x\` qiymati o'qilayotgan vaqtda chap tomondagi \`x\` hali to'liq e'lon qilinmagan va u TDZ ichida bo'ladi.

---

## 6. 🛠️ Amaliy Topshiriqlar

Amaliy topshiriqlar va mashqlar \`/Users/farhod/Desktop/github/js-uz/scratch/hoistingThisLesson_exercises.json\` faylida berilgan.

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
    E --> E1[Xotiradan joy ajratiladi] --> E2[Boshlang'ich qiymat: Yo'q - Uninitialized] --> E3[Temporal Dead Zone - TDZ boshlanishi]

    style C2 fill:#ffeb3b,stroke:#333,stroke-width:1px
    style D2 fill:#8bc34a,stroke:#333,stroke-width:1px
    style E3 fill:#f44336,stroke:#333,stroke-width:1px
\`\`\`

---

## 7. 📝 12 ta Mini Test

Bilimingizni sinash uchun 12 ta test savoli \`/Users/farhod/Desktop/github/js-uz/scratch/hoistingThisLesson_quizzes.json\` faylida tayyorlangan. Darsni tamomlagandan so'ng testlarni yechishni unutmang.

---

## 8. 🎯 Real Project Case Study

### Kodni Strukturasi (Clean Code) va Hoisting
Real loyihalarda hoisting dasturchilarga kodni yanada o'qishli va chiroyli tartiblashga yordam beradi.

#### Stepdown Rule (Pastga qarab o'qish qoidasi)
Clean Code (Robert Martin) kitobida yozilishicha, yuqori darajadagi mantiqiy funksiyalar faylning yuqori qismida, ularga yordam beruvchi kichik funksiyalar (utility helpers) esa pastda bo'lishi kerak. Bu kitobxon kabi kodni yuqoridan pastga oson o'qish imkonini beradi. Function declaration hoisting bizga aynan shunday kod yozish imkonini beradi:

\`\`\`javascript
// REAL PROJECT CASE: Foydalanuvchi ma'lumotlarini yuklash va qayta ishlash
export function handleUserProfile(userId) {
  // Asosiy mantiq tepada - nima ish bajarilayotgani darhol ko'rinadi
  const rawData = fetchUserData(userId);
  const validated = validateData(rawData);
  return formatOutput(validated);
}

// Yordamchi funksiyalar pastda joylashgan (hoisting yordamida ishlaydi)
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
Agar biz yuqoridagi kodda \`const fetchUserData = (id) => { ... }\` kabi arrow funksiyalardan foydalanganimizda, barcha yordamchi funksiyalarni asosiy mantiqdan yuqorida e'lon qilishga majbur bo'lar edik. Bu esa fayl ochilganda asosiy mantiqni topishni qiyinlashtiradi.

---

## 9. 🚀 Performance va Optimization

### 1. V8 Scope Analysis
JavaScript dvigateli (masalan, Chrome va Node.js dagi V8) kodni ishga tushirishdan oldin lisoniy tahlil (Scope Analysis) o'tkazadi. \`var\` o'zgaruvchilarni topganda, u stack-dan joy ajratib \`undefined\` yozadi. \`let\` va \`const\` uchun esa u xotira uyalarini belgilaydi, lekin qiymat yozmaydi. Dvigatel darajasida bu xavfsizlik va optimallashtirish uchun juda muhimdir.

### 2. Static Optimization
\`const\` o'zgaruvchilarni V8 dvigateli "static pointer" sifatida taniydi. O'zgaruvchi qiymati o'zgarmasligini bilish kompilyatorga kodni optimallashtirish va xotiradan yuklashni tezlashtirish imkonini beradi. Shuning uchun loyihada imkon qadar ko'proq \`const\` ishlatish tavsiya etiladi.

---

## 10. 📌 Cheat Sheet

| Xususiyat | \`var\` | \`let\` / \`const\` | Function Declaration | Function Expression (\`const\`/\`let\`) | Class Declaration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hoisting bo'ladimi?** | Ha | Ha (TDZ bilan) | Ha (To'liq) | Ha (TDZ bilan) | Ha (TDZ bilan) |
| **Boshlang'ich Qiymati** | \`undefined\` | Uninitialized | Funksiya tanasi | Uninitialized | Uninitialized |
| **E'londan oldin chaqirish** | \`undefined\` qaytaradi | \`ReferenceError\` beradi | Muvaffaqiyatli ishlaydi | \`ReferenceError\` beradi | \`ReferenceError\` beradi |
| **Doirasi (Scope)** | Function Scope | Block Scope | Block/Function | Block Scope | Block Scope |
| **Qayta e'lon qilish** | Mumkin | Taqiqlangan | Mumkin (oxirgisi olinadi) | Taqiqlangan | Taqiqlangan |
`,
  exercises: [
    {
      id: 1,
      title: "Hoisting testi",
      instruction: "Funksiyani e'lon qilinishidan oldin chaqiring.",
      startingCode: "// Bu yerda chaqiring\n\nfunction salom() {\n  console.log('Salom');\n}",
      hint: "salom(); deb yozing.",
      test: "if (logs.includes('Salom')) return null; return 'Funksiya chaqirilmadi';"
    },
    {
      id: 2,
      title: "var Hoisting va Undefined",
      instruction: "var myVar = 'test' o'zgaruvchisini e'lon qilishdan oldin console.log yordamida uning qiymatini konsolga chiqaring (u undefined bo'lishi kerak).",
      startingCode: "// Murojaat qiling va var bilan e'lon qiling\n",
      hint: "console.log(myVar);\nvar myVar = 'test';",
      test: "if (code.includes('console.log(myVar)') && code.includes('var myVar') && logs.includes('undefined')) return null; return 'var o\\'zgaruvchisini e\\'lon qilishdan oldin log qilib undefined oling!';"
    },
    {
      id: 3,
      title: "const va TDZ xatosi",
      instruction: "try-catch bloki ichida const yordamida e'lon qilingan x o'zgaruvchisini u yaratilishidan oldin o'qib, ReferenceError xatosini ushlang va konsolga chiqaring.",
      startingCode: "try {\n  // E'londan oldin murojaat qiling\n  console.log(x);\n} catch (e) {\n  console.log(e.name);\n}\n// const x ni e'lon qiling\n",
      hint: "const x = 5;",
      test: "if (logs.includes('ReferenceError') && code.includes('const x')) return null; return 'const x e\\'lon qilib TDZ orqali ReferenceError ni ushlang!';"
    },
    {
      id: 4,
      title: "let Function Expression va Hoisting",
      instruction: "try-catch ichida let bilan e'lon qilingan myFunc funksiyasini e'lon qilishdan oldin chaqiring va ReferenceError xatosini konsolga chiqaring.",
      startingCode: "try {\n  myFunc();\n} catch (e) {\n  console.log(e.name);\n}\n// let myFunc funksiyasini yozing\n",
      hint: "let myFunc = () => {};",
      test: "if (logs.includes('ReferenceError') && code.includes('let myFunc')) return null; return 'let bilan e\\'lon qilingan funksiya ReferenceError berishini tekshiring!';"
    },
    {
      id: 5,
      title: "var Function Expression va TypeError",
      instruction: "try-catch ichida var bilan e'lon qilingan myArrow funksiyasini e'lon qilishdan oldin chaqiring va TypeError xatosini konsolga chiqaring.",
      startingCode: "try {\n  myArrow();\n} catch (e) {\n  console.log(e.name);\n}\n// var myArrow funksiyasini yozing\n",
      hint: "var myArrow = () => {};",
      test: "if (logs.includes('TypeError') && code.includes('var myArrow')) return null; return 'var bilan e\\'lon qilingan funksiya TypeError berishini tekshiring!';"
    },
    {
      id: 6,
      title: "Scope ichidagi Local Hoisting",
      instruction: "Globalda var x = 10 e'lon qilingan. test() funksiyasi yaratib, uning ichida avval console.log(x) qiling, so'ngra var x = 20 e'lon qiling. Funksiya chaqirilganda local hoisting sababli undefined chiqishini ko'ring.",
      startingCode: "var x = 10;\nfunction test() {\n  // Bu yerda local var e'lon qiling va e'londan oldin konsolga chiqaring\n}\ntest();\n",
      hint: "console.log(x);\nvar x = 20;",
      test: "if (logs.includes('undefined') && code.includes('var x = 20')) return null; return 'Funksiya ichida local hoisting yuz berishi kerak!';"
    },
    {
      id: 7,
      title: "Ikkita Function Declaration to'qnashuvi",
      instruction: "Uchta bir xil nomli function declaration yozilsa, eng oxirgisi amalda bo'ladi. check() funksiyasini e'lon qilishdan oldin chaqiring. Bitta check funksiyasi 'Bir', keyingisi 'Ikki' chiqarsin. Konsolda faqat 'Ikki' chiqishini ta'minlang.",
      startingCode: "check();\n// check funksiyalarini e'lon qiling\n",
      hint: "function check() { console.log('Bir'); }\nfunction check() { console.log('Ikki'); }",
      test: "if (logs.includes('Ikki') && !logs.includes('Bir')) return null; return 'Oxirgi function declaration ustun kelishi kerak!';"
    },
    {
      id: 8,
      title: "Blok ichidagi funksiyalar va strict mode",
      instruction: "Blok ({}) ichida e'lon qilingan function declaration blok tashqarisida ReferenceError beradi. Try-catch ichida blok tashqarisidan testBlock() ni chaqiring va xatoni konsolga chiqaring.",
      startingCode: "{\n  function testBlock() { console.log('Blok'); }\n}\ntry {\n  // Blok tashqarisida chaqiring\n} catch (e) {\n  console.log(e.name);\n}\n",
      hint: "testBlock();",
      test: "if (logs.includes('ReferenceError')) return null; return 'Blok ichidagi funksiya tashqarida ReferenceError berishi kerak!';"
    },
    {
      id: 9,
      title: "Klaslarda Hoisting va TDZ",
      instruction: "Try-catch ichida new MyClass() yarating, klasni esa let kabi pastda e'lon qiling. ReferenceError xatosini ushlab konsolga chiqaring.",
      startingCode: "try {\n  const obj = new MyClass();\n} catch (e) {\n  console.log(e.name);\n}\n// class MyClass e'lon qiling\n",
      hint: "class MyClass {}",
      test: "if (logs.includes('ReferenceError') && code.includes('class MyClass')) return null; return 'Class e\\'lon qilinishidan oldin ReferenceError berishi kerak!';"
    },
    {
      id: 10,
      title: "Parametr va let to'qnashuvi (SyntaxError)",
      instruction: "Funksiya parametrlari scope-da yaratiladi. new Function('a', 'let a = 5;')() yordamida bir xil nomli let e'lon qilinganda yuz beradigan SyntaxError ni try-catch ichida ushlab, konsolga chiqaring.",
      startingCode: "try {\n  // Bu yerda dynamic function bilan SyntaxError chiqaring\n} catch (e) {\n  console.log(e.name);\n}\n",
      hint: "new Function('a', 'let a = 5;')();",
      test: "if (logs.includes('SyntaxError')) return null; return 'Parametr va let to\\'qnashuvi tufayli SyntaxError-ni ushlang!';"
    },
    {
      id: 11,
      title: "Var shadowing va local hoisting",
      instruction: "Globalda var name = 'global'. printName() funksiyasini yarating, unda console.log(name) qiling va keyingi qatorda var name = 'local' deb e'lon qiling. Funksiyani chaqiring. undefined chiqishini ko'ring.",
      startingCode: "var name = 'global';\nfunction printName() {\n  // Bu yerga yozing\n}\nprintName();\n",
      hint: "console.log(name);\nvar name = 'local';",
      test: "if (logs.includes('undefined') && code.includes('var name =')) return null; return 'Local var name hoisting sababli undefined chiqishi kerak!';"
    },
    {
      id: 12,
      title: "Hoisting-ning yakuniy tekshiruvi",
      instruction: "a (var) va b (let) o'zgaruvchilarini e'lon qilishdan oldin chaqiring. b ni try-catch ichida chaqirib ReferenceError log qiling. a ning undefined bo'lishini ko'rsating.",
      startingCode: "// a ga murojaat qiling va b ni try-catch ichida chaqiring\n\n// var a va let b o'zgaruvchilarini e'lon qiling\n",
      hint: "console.log(a);\ntry { console.log(b); } catch(e) { console.log(e.name); }\nvar a = 1; let b = 2;",
      test: "if (logs.includes('undefined') && logs.includes('ReferenceError') && code.includes('var a') && code.includes('let b')) return null; return 'var va let hoisting farqlarini ko\\'rsating!';"
    }
  ],
  quizzes: [
  {
    "id": 1,
    "question": "JavaScript-da hoisting (ko'tarilish) nima?",
    "options": [
      "Kod bajarilayotganda barcha o'zgaruvchilar va funksiyalarni global window obyektiga o'tkazish",
      "Kod bajarilishidan oldin (kompilyatsiya bosqichida) o'zgaruvchilar va funksiya e'lonlarining xotiraga joylashtirilishi",
      "Sikl ichidagi o'zgaruvchilarning tashqi doiraga sizib chiqishi",
      "O'zgaruvchilar qiymatlarini avtomatik ravishda o'chirib tashlash mexanizmi"
    ],
    "correctAnswer": 1,
    "explanation": "Hoisting — bu JavaScript dvigateli kodni bajarishdan oldin (kompilyatsiya bosqichida) o'zgaruvchilar va funksiya deklaratsiyalarini o'z doirasining (scope) yuqori qismiga ko'tarib, ularga xotiradan joy ajratish xususiyatidir."
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
    "question": "Quyidagi kod ishga tushirilganda konsolga nima chiqadi?\n```javascript\nconsole.log(myVar);\nvar myVar = 10;\n```",
    "options": [
      "10",
      "undefined",
      "ReferenceError: myVar is not defined",
      "TypeError: myVar is not a function"
    ],
    "correctAnswer": 1,
    "explanation": "var myVar hoisting bo'ladi va funksiya yoki global doiraning tepasiga 'undefined' bo'lib ko'tariladi, ammo qiymat berilishi (myVar = 10) o'z joyida qoladi."
  },
  {
    "id": 4,
    "question": "Quyidagi kod ishga tushirilganda nima sodir bo'ladi?\n```javascript\nconsole.log(myLet);\nlet myLet = 20;\n```",
    "options": [
      "undefined chiqadi",
      "20 chiqadi",
      "ReferenceError: Cannot access 'myLet' before initialization",
      "TypeError: myLet is not a constant"
    ],
    "correctAnswer": 2,
    "explanation": "let va const o'zgaruvchilari hoisting bo'ladi, lekin ularga boshlang'ich qiymat berilmaguncha TDZ (Temporal Dead Zone) da qoladi. E'londan oldin kirish ReferenceError ga olib keladi."
  },
  {
    "id": 5,
    "question": "Temporal Dead Zone (Vaqtinchalik O'lik Hudud) nima?",
    "options": [
      "O'zgaruvchilar Garbage Collector tomonidan o'chiriladigan xotira qismi",
      "Blok boshlanishidan to o'zgaruvchi (let/const) e'lon qilingan qatorgacha bo'lgan, o'zgaruvchiga murojaat qilib bo'lmaydigan hudud",
      "Asinxron kodlar (masalan, setTimeout) bajarilishini kutadigan vaqt oralig'i",
      "Sikl tugagandan keyin o'zgaruvchilar blokda qoladigan vaqt"
    ],
    "correctAnswer": 1,
    "explanation": "TDZ — bu let va const e'lon qilingan blokning boshidan boshlab, o'zgaruvchiga qiymat yuklanadigan qatorgacha bo'lgan oraliqdir. Bu hududda o'zgaruvchiga murojaat qilish ReferenceError xatosini beradi."
  },
  {
    "id": 6,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\ngreet();\nfunction greet() {\n  console.log(\"Salom!\");\n}\n```",
    "options": [
      "Salom!",
      "TypeError: greet is not a function",
      "ReferenceError: greet is not defined",
      "undefined"
    ],
    "correctAnswer": 0,
    "explanation": "Function declaration (funksiya e'loni) to'liq hoisting bo'ladi, ya'ni uning ham tanasi, ham nomi xotiraga yoziladi va uni deklaratsiyadan oldin ham xavfsiz chaqirish mumkin."
  },
  {
    "id": 7,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\ngreet();\nvar greet = function() {\n  console.log(\"Salom!\");\n};\n```",
    "options": [
      "Salom! chiqadi",
      "TypeError: greet is not a function",
      "ReferenceError: greet is not defined",
      "undefined chiqadi va kod to'xtaydi"
    ],
    "correctAnswer": 1,
    "explanation": "var greet hoisting bo'lganda 'undefined' qiymatini oladi. Uni funksiya sifatida chaqirish (greet()) 'TypeError: greet is not a function' xatosiga olib keladi, chunki undefined funksiya emas."
  },
  {
    "id": 8,
    "question": "Quyidagi kod bajarilganda nima sodir bo'ladi?\n```javascript\ngreet();\nconst greet = () => {\n  console.log(\"Salom!\");\n};\n```",
    "options": [
      "Salom! chiqadi",
      "TypeError: greet is not a function",
      "ReferenceError: Cannot access 'greet' before initialization",
      "undefined chiqadi va xatolik bo'lmaydi"
    ],
    "correctAnswer": 2,
    "explanation": "const greet o'zgaruvchi ifodasi bo'lgani sababli TDZ da bo'ladi. Uni e'lon qilinishidan oldin chaqirish ReferenceError xatosini beradi."
  },
  {
    "id": 9,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nvar a = 1;\nfunction test() {\n  console.log(a);\n  var a = 2;\n}\ntest();\n```",
    "options": [
      "1",
      "2",
      "undefined",
      "ReferenceError: a is not defined"
    ],
    "correctAnswer": 2,
    "explanation": "test() funksiyasi ichida yangi 'var a' e'lon qilingan. U funksiya doirasida hoisting bo'lib, tashqi global 'a' o'zgaruvchisini soyalaydi (shadowing). Shuning uchun console.log(a) ishlagan vaqtda ichki 'a' mavjud lekin unga hali 2 qiymati yuklanmagan (ya'ni undefined)."
  },
  {
    "id": 10,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nvar x = 5;\nfunction x() {}\nconsole.log(typeof x);\n```",
    "options": [
      "\"function\"",
      "\"number\"",
      "\"undefined\"",
      "SyntaxError: Identifier 'x' has already been declared"
    ],
    "correctAnswer": 1,
    "explanation": "Hoisting bosqichida function declaration xotiraga birinchi bo'lib yoziladi. Keyin var x ro'yxatga olinadi (lekin qayta yozilmaydi). Biroq, kod bajarilish bosqichida `x = 5` qiymat berish amali bajarilganda `x` ning qiymati raqamga aylanadi. Shuning uchun `typeof x` natijasi 'number' bo'ladi."
  },
  {
    "id": 11,
    "question": "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet y = 10;\nfunction test() {\n  let y = 20;\n  console.log(y);\n}\ntest();\n```",
    "options": [
      "SyntaxError: Identifier 'y' has already been declared",
      "10",
      "20",
      "undefined"
    ],
    "correctAnswer": 2,
    "explanation": "Bunda hech qanday xatolik yuz bermaydi, chunki global doiradagi `y` va funksiya ichidagi `let y` har xil doiralarda (scopes) e'lon qilingan. Funksiya ichidagi `y` tashqi `y` ni soyalaydi va 20 chiqadi."
  },
  {
    "id": 12,
    "question": "Klass (Class) e'lonlarining hoisting bo'lishi haqida qaysi tasdiq to'g'ri?",
    "options": [
      "Klasslar funksiyalar kabi to'liq hoisting bo'ladi va e'londan oldin yangi obyekt yaratish mumkin",
      "Klasslar mutlaqo hoisting bo'lmaydi va xotiradan joy ajratilmaydi",
      "Klasslar ham let/const kabi hoisting bo'ladi, lekin e'lon qilinmaguncha TDZ da bo'ladi va e'londan oldin chaqirish ReferenceError beradi",
      "Klasslar hoisting bo'ladi va e'londan oldin chaqirilganda undefined qiymatini qaytaradi"
    ],
    "correctAnswer": 2,
    "explanation": "Klass e'lonlari (Class declarations) ham JavaScript-da hoisting bo'ladi, lekin ular ham let/const kabi TDZ (vaqtincha o'lik hudud) da bo'ladi. E'londan oldin klassdan yangi nusxa (instance) olish ReferenceError xatosini beradi."
  }
]

};
