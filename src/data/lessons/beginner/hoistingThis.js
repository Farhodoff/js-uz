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

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Hoisting nima?**
Hoisting (Ko'tarilish) — bu JavaScript kodni ishga tushirishdan oldin e'lon qilingan o'zgaruvchilar va funksiyalarni kodning eng tepasiga "ko'chirish" jarayonidir.


**2. JavaScript kodni o'qishdan oldin necha marta ko'z yugurtiradi?**
JavaScript kodi bajarilishidan oldin 2 ta asosiy bosqichdan o'tadi: **Kompilyatsiya (Compilation)** (bu bosqichda kodga bir marta to'liq ko'z yugurtirib, scope va xotirani tayyorlaydi) va keyin **Bajarilish (Execution)** bosqichi.


**3. var o'zgaruvchisi hoist bo'lganda qiymati nima bo'ladi?**
\`var\` o'zgaruvchisi ko'tarilganda uning qiymati avtomatik ravishda \`undefined\` qilib sozlanadi.


**4. let va const hoist bo'ladimi?**
Ha, \`let\` va \`const\` o'zgaruvchilari ham hoist bo'ladi, lekin ular xotirada yaratilsa-da, qiymat berilmaguncha ularga kirish taqiqlanadi (TDZ).


**5. Temporal Dead Zone (TDZ) nima?**
Temporal Dead Zone (Vaqtinchalik O'lik Hudud) — o'zgaruvchining scope doirasida ko'tarilgan (hoist) qismidan boshlab, to u kodda haqiqiy e'lon qilingan qatorgacha bo'lgan oraliqdir. Bu oraliqda o'zgaruvchini ishlatish \`ReferenceError\` beradi.


**6. Qaysi turdagi funksiyalar to'liq hoist bo'ladi?**
Faqat **Function Declaration** (oddiy \`function name() {}\` ko'rinishidagi) funksiyalar to'liq ko'tariladi, ya'ni ularni e'lon qilinishidan oldin ham chaqirish mumkin.


**7. Funksiya expression (o'zgaruvchiga saqlangan funksiya) hoist bo'ladimi?**
O'zgaruvchining turi \`var\` bo'lsa, u \`undefined\` bo'lib ko'tariladi va uni funksiya sifatida chaqirish \`TypeError\` xatosini veradi. \`let\` yoki \`const\` bo'lsa, TDZ sababli \`ReferenceError\` beradi.


**8. undefined va ReferenceError farqi nimada (hoisting misolida)?**
\`undefined\` — o'zgaruvchi xotirada borligini, lekin qiymat berilmaganligini bildiradi (masalan, e'londan oldin chaqirilgan \`var\`). \`ReferenceError\` — o'zgaruvchining o'zi umuman topilmaganini yoki unga TDZ ichida murojaat qilinganini bildiradi.


**9. Hoisting JS tilining xatosimi yoki xususiyatimi?**
Bu JS dvigatelining (V8) kodni ikki bosqichda qayta ishlashining tabiiy natijasidir. Garchi u kutilmagan holatlarga olib kelsa-da, u tilning o'ziga xos xususiyati hisoblanadi.


**10. Nima uchun var o'rniga let ishlatish tavsiya etiladi (hoisting sababli)?**
Chunki \`let\` hoisting paytidagi chalkashliklarni (e'lon qilinmasdan oldin \`undefined\` qaytarishni) oldini oladi va e'lon qilishdan oldin ishlatilganda xatolik (\`ReferenceError\`) chiqarib xavfsizroq ishlashni ta'minlaydi.


**11. Hoisting faqat global scope'da bo'ladimi?**
Yo'q, hoisting har qanday scope ichida (funksiya yoki blok) sodir bo'ladi va o'zgaruvchilar o'zi joylashgan scopening eng tepasiga ko'tariladi.


**12. Klaslar (Classes) hoist bo'ladimi?**
Ha, JavaScript-da klaslar ham e'lon qilinganda hoist bo'ladi, lekin \`let\` va \`const\` kabi TDZ ichida joylashadi, shuning uchun e'lon qilishdan oldin klasdan obyekt olinsa \`ReferenceError\` beradi.
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
      explanation: "`let` va `const` o'zgaruvchilari ham hoist bo'ladi, lekin uzoq vaqt e'lon qilinmaguncha TDZ (Temporal Dead Zone) ichida bo'ladi. ReferenceError xatoligi tashlanadi."
    },
    {
      id: 3,
      question: "Ushbu kodni tahlil qilib natijasini ayting:\n```javascript\ngreet();\nfunction greet() {\n  console.log(\"Salom\");\n}\n```",
      options: ["\"Salom\"", "TypeError: greet is not a function", "ReferenceError", "undefined"],
      correctAnswer: 0,
      explanation: "Function Declarations to'liq (tanasi bilan birga) tepaga ko'tariladi. Shuning uchun ularni e'lon qilinishidan oldin ham bemalol chaqirish mumkin."
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
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nvar x = 1;\nfunction test() {\n  console.log(x);\n  var x = 2;\n}\ntest();\n```",
      options: ["1", "2", "undefined", "ReferenceError"],
      correctAnswer: 2,
      explanation: "Funksiya ichidagi `var x` local scope doirasida yuqoriga hoist bo'lib global `x` ni shadow qiladi. E'lon qilinishidan oldin chaqirilgan local `x` qiymati `undefined` bo'ladi."
    },
    {
      id: 7,
      question: "Agar `const` o'zgaruvchisi o'zidan oldin chaqirilsa, qanday xatolik yuz beradi?",
      options: ["TypeError", "ReferenceError", "SyntaxError", "Xatolik bo'lmaydi, undefined chiqadi"],
      correctAnswer: 1,
      explanation: "`const` o'zgaruvchisi hoist bo'ladi, lekin e'lon qilinmaguncha TDZ (Vaqtinchalik O'lik Hudud)da bo'ladi va unga murojaat qilish `ReferenceError` xatosini beradi."
    },
    {
      id: 8,
      question: "Quyidagi kod qanday natija beradi?\n```javascript\nfunc();\nvar func = function() {\n  console.log(\"OK\");\n};\n```",
      options: ["\"OK\"", "TypeError: func is not a function", "ReferenceError", "undefined"],
      correctAnswer: 1,
      explanation: "`var func` o'zgaruvchisi ko'tariladi va boshlang'ich qiymati `undefined` bo'ladi. `undefined` ni funksiya sifatida chaqirish esa `TypeError` beradi."
    },
    {
      id: 9,
      question: "Quyidagi kod bajarilganda konsolda nima ko'rinadi?\n```javascript\nfunction parent() {\n  var x = 'tashqi';\n  function child() {\n    console.log(x);\n    var x = 'ichki';\n  }\n  child();\n}\nparent();\n```",
      options: ["\"tashqi\"", "\"ichki\"", "undefined", "ReferenceError"],
      correctAnswer: 2,
      explanation: "`child` funksiyasi ichidagi `var x` o'zining local scopesida hoist bo'lib, `parent` funksiyasidagi `x` ni to'sib qo'yadi. E'lon qilinishidan oldin log etilayotgani uchun `undefined` chiqadi."
    },
    {
      id: 10,
      question: "JavaScript-da class e'lonlari (declarations) hoist bo'ladimi?",
      options: ["Yo'q, mutlaqo ko'tarilmaydi", "Ha, ko'tariladi va xuddi var kabi undefined qiymat oladi", "Ha, ko'tariladi lekin let/const kabi TDZ ichida bo'ladi va ReferenceError beradi", "Faqat strict mode yopiq bo'lganda ko'tariladi"],
      correctAnswer: 2,
      explanation: "Klaslar (classes) ham hoisting qoidasiga bo'ysunadi, lekin ularga e'londan oldin murojaat etilsa `ReferenceError` xatoligi tashlanadi."
    },
    {
      id: 11,
      question: "Strict mode ostida, biror blok (masalan `if` bloki) ichida e'lon qilingan function declaration blok tashqarisida ko'rinadimi?",
      options: ["Ha, oddiy funksiyalar har doim global bo'ladi", "Yo'q, strict mode'da funksiyalar block scope-ga ega bo'ladi va ReferenceError beradi", "Ha, lekin undefined qiymat oladi", "Faqat var bilan e'lon qilingan bo'lsa ko'rinadi"],
      correctAnswer: 1,
      explanation: "Strict rejimda blok `{}` ichida yozilgan function declaration o'sha blok doirasida cheklanadi (block scope) va tashqarida unga murojaat qilib bo'lmaydi."
    },
    {
      id: 12,
      question: "Temporal Dead Zone (TDZ) qachon tugaydi?",
      options: ["O'zgaruvchi joylashgan funksiya tugaganda", "O'zgaruvchi e'lon qilingan va qiymat tayinlangan qator bajarilganda", "Global kontekst yaratilganda", "Hech qachon tugamaydi, har doim o'lik bo'ladi"],
      correctAnswer: 1,
      explanation: "TDZ o'zgaruvchi e'lon qilingan va qiymat yuklangan qatorga kelib bajarilgandan so'ng rasman tugaydi va o'zgaruvchidan bemalol foydalanish mumkin bo'ladi."
    }
  ]
};
