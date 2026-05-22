export const scopeLesson = {
  id: "scope",
  title: "Scope (Ko'rinish sohasi)",
  level: "Beginner",
  description: "JavaScriptda o'zgaruvchilar va funksiyalarning koddagi ko'rinish va yashash doiralari: Global, Local va Block scope.",
  theory: `## 1. NEGA kerak?
Tasavvur qiling, dasturdagi barcha o'zgaruvchilar "global" (hamma joydan ko'rinadigan) bo'lsa, kod tezda chalkashib ketadi. Biror funksiya ichidagi o'zgaruvchi boshqa joydagi o'zgaruvchi bilan to'qnashib, uning qiymatini tasodifan o'zgartirib yuborishi mumkin. Scope (ko'rinish sohasi) bizga kodda "xavfsiz hududlar" yaratish va o'zgaruvchilarni chegaralash imkonini beradi.

## 2. SODDALIK (Analogiya)
Buni uyingizdagi xonalar va hovli deb tasavvur qiling:
- **Global Scope (Hovli):** Hovlidagi daraxtni uydagi barcha xonalardan turib ko'rish mumkin.
- **Function/Block Scope (Yotoqxona):** Bu xonadagi shaxsiy narsalarni faqat xona ichidagilar ko'ra oladi. Tashqarida (hovlida) turgan odam yotoqxona ichidagi narsalarni ko'ra olmaydi.

## 3. STRUKTURA

### A. Global Scope
Faylning eng yuqori qismida, hech qanday funksiya yoki blok ichida bo'lmagan soha. Hamma joyda ishlaydi:
\`\`\`javascript
let hovli = "Daraxt";
function xona() {
  console.log(hovli); // global o'zgaruvchi ko'rinadi ✅
}
\`\`\`

### B. Function Scope
Faqat e'lon qilingan funksiya ichidagina amal qiladigan o'zgaruvchilar doirasi:
\`\`\`javascript
function xona() {
  let shaxsiy = "Kravat";
}
console.log(shaxsiy); // Xato! (ReferenceError) ❌
\`\`\`

### C. Block Scope
\`if\`, \`for\` yoki shunchaki \`{ }\` bloklari ichidagi soha. Faqat \`let\` va \`const\` o'zgaruvchilari bo'ysunadi (\`var\` esa bo'ysunmaydi):
\`\`\`javascript
if (true) {
  let maxfiy = "Parol";
  var umumiy = "Salom";
}
console.log(umumiy); // "Salom" (var block'dan tashqariga chiqadi) ✅
console.log(maxfiy); // Xato! (let block'dan tashqarida ko'rinmaydi) ❌
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)
Lexical scope qoidasiga ko'ra, ichki funksiya har doim o'zidan tashqaridagi funksiyaning o'zgaruvchilarini ko'ra oladi:
\`\`\`javascript
function ota() {
  let pul = 100;
  function bola() {
    console.log(pul); // ota scopesidagi o'zgaruvchini ishlatadi ✅
  }
  bola();
}
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Global ifloslanish:** Keraksiz o'zgaruvchilarni global scope-da yarataverish nomlar to'qnashuviga olib keladi.
2. **var block scope tan olmasligi:** Ko'pchilik \`if\` yoki \`for\` ichida \`var\` ishlatsam u tashqarida o'chadi deb o'ylaydi. Yo'q, \`var\` faqat funksiya ichidagina chegaralanadi.
3. **Lexical Scope tushunmaslik:** O'zgaruvchi funksiya chaqirilgan joyda emas, balki kodda yozilgan (e'lon qilingan) joyida qidiriladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Scope nima?**
O'zgaruvchi va funksiyalarning kodingizda qayerda ishlatilishi va ko'rinishi mumkinligini belgilovchi hudud.

**2. Global scope nima?**
Kodning eng yuqori qismi bo'lib, u yerdagi o'zgaruvchilar dasturning istalgan joyidan foydalanish uchun ochiq.

**3. Local (Function) scope nima?**
Faqat ma'lum bir funksiya ichida ko'rinadigan va uning tashqarisidan murojaat qilib bo'lmaydigan doira.

**4. Block scope nima?**
Jingalak qavslar \`{ }\` ichidagi hudud. Faqat \`let\` va \`const\` bunga bo'ysunadi.

**5. var, let va const'ning scope bo'yicha farqi nima?**
\`let\` va \`const\` block scope-ga ega, \`var\` esa function scope-ga ega (bloklarni tan olmaydi).

**6. Scope Chain nima?**
O'zgaruvchi joriy scopedan topilmaganda, JS uni tashqi bosqichma-bosqich scopelardan izlab borish zanjiri.

**7. Nima uchun global o'zgaruvchilarni ko'p ishlatmaslik kerak?**
Nomlar to'qnashuvi va kutilmagan yonaki ta'sirlarning (side effects) oldini olish uchun.

**8. Ichki va tashqi o'zgaruvchining nomi bir xil bo'lsa nima bo'ladi?**
Ichki local o'zgaruvchi tashqi o'zgaruvchini vaqtincha to'sib qo'yadi (Variable Shadowing).

**9. Lexical scope nima degani?**
O'zgaruvchining ko'rinish sohasi u dasturning qaysi joyida yozilganiga qarab belgilanishi.

**10. O'zgaruvchi topilmasa qanday xato chiqadi?**
Tizim \`ReferenceError\` xatosini qaytaradi.

**11. Mustaqil block yaratish mumkinmi?**
Ha, shunchaki \`{ let x = 1; }\` deb istalgan joyda mustaqil block scope ochish mumkin.

**12. Ichki scope tashqi scopeni o'zgartira oladimi?**
Ha, agar ichkarida yangi o'zgaruvchi e'lon qilinmasdan tashqi o'zgaruvchiga to'g'ridan-to'g'ri murojaat etilsa, uning qiymati o'zgartiriladi.
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
      id: 1,
      question: "JavaScript-da scope (ko'rinish sohasi) nima?",
      options: [
        "Kodni tezlashtiruvchi maxsus rejim",
        "O'zgaruvchi va funksiyalarning kodingizda qayerda 'yashashi' (ko'rinishi va ishlatilishi mumkinligi)ni belgilovchi hudud",
        "Faqat server bilan bog'lanish uchun xizmat qiladigan vosita",
        "Obyektlar ichidagi metodlar to'plami"
      ],
      correctAnswer: 1,
      explanation: "Scope o'zgaruvchi va funksiyalarning kod hududlaridagi ko'rinish va foydalanish chegaralarini aniqlab beruvchi mantiqiy qobiqdir."
    },
    {
      id: 2,
      question: "Funksiya yoki block `{}` tashqarisida, ya'ni kodning eng yuqori qismida e'lon qilingan o'zgaruvchi qaysi scope doirasiga kiradi?",
      options: [
        "Function Scope",
        "Block Scope",
        "Global Scope (u kodning istalgan joyidan, jumladan funksiyalar ichidan ham ko'rinadi)",
        "Lexical Scope"
      ],
      correctAnswer: 2,
      explanation: "Kodning eng yuqori qismida, hech qanday funksiya yoki blok ichida bo'lmagan o'zgaruvchilar Global Scope-ga tegishli bo'lib, butun dastur bo'yicha ko'rinadi."
    },
    {
      id: 3,
      question: "`if` sharti yoki `for` sikli bloklari `{}` ichida `let` yoki `const` yordamida yaratilgan o'zgaruvchilarning ko'rinish sohasi qanday bo'ladi?",
      options: [
        "Ular butun fayl bo'ylab (global) ko'rinadi",
        "Ular faqat o'sha jingalak qavslar `{}` ichida ko'rinadi (Block Scope)",
        "Ular faqat funksiyalar ichida ko'rinadi",
        "Ular umuman ishlamaydi"
      ],
      correctAnswer: 1,
      explanation: "`let` va `const` o'zgaruvchilari Block Scope (blok ko'rinish sohasi) qoidalariga bo'ysunadi, ya'ni faqat o'zlari e'lon qilingan jingalak qavslar `{}` blokida ishlaydi."
    },
    {
      id: 4,
      question: "Nima uchun JavaScript-da global scope-da juda ko'p o'zgaruvchilar yaratish (\"Global Namespace Pollution\") tavsiya etilmaydi?",
      options: [
        "Chunki global o'zgaruvchilar dasturning xotira sarfini kamaytiradi",
        "Kodni o'qish qiyinlashadi va nomlar to'qnashuvi (collision) tufayli kutilmagan xatoliklar (bug) yuz berishi mumkin",
        "Chunki brauzer global o'zgaruvchilar bilan ishlay olmadi",
        "Bunday cheklov mavjud emas"
      ],
      correctAnswer: 1,
      explanation: "Agar ko'p global o'zgaruvchilar bo'lsa, kodni boshqarish qiyinlashadi, shuningdek, turli kutubxonalar yoki funksiyalar bir xil nomdagi o'zgaruvchilarni tasodifan o'zgartirib yuborishi (naming collision) mumkin."
    },
    {
      id: 5,
      question: "Quyidagi kodda `console.log(b)` chaqirilganda qanday natija olinadi?\n```javascript\nif (true) {\n  var a = 5;\n  let b = 10;\n}\nconsole.log(a);\nconsole.log(b);\n```",
      options: [
        "Ikkalasi ham xato beradi",
        "5 va 10 chiqadi",
        "a uchun `5` chiqadi, lekin b uchun `ReferenceError` xatosi beradi (chunki var block scope-ni tan olmaydi, let esa block scope-ga ega)",
        "a uchun `ReferenceError` beradi, b uchun 10 chiqadi"
      ],
      correctAnswer: 2,
      explanation: "`var` kalit so'zi bilan yaratilgan o'zgaruvchilar block scope-ga ega bo'lmaydi, shuning uchun `if` tashqarisida ham ko'rinadi. `let` esa blok sohasi bilan cheklanganligi uchun, block tashqarisida `ReferenceError` beradi."
    },
    {
      id: 6,
      question: "JavaScriptda \"Lexical Scope\" (statik scope) nima degani?",
      options: [
        "O'zgaruvchining ko'rinish sohasi u funksiya qayerda chaqirilganiga qarab dinamik ravishda belgilanishi",
        "O'zgaruvchining ko'rinish sohasi u kodning qayerida yozilganiga (e'lon qilinganiga) qarab statik ravishda belgilanishi",
        "O'zgaruvchilarning faqat string tipida bo'lishi",
        "Window obyektiga o'zgaruvchilarni majburiy qo'shish"
      ],
      correctAnswer: 1,
      explanation: "Lexical scope degani, funksiya o'zgaruvchining qiymatini o'zi chaqirilgan joydan emas, balki kodda yozilgan/yaratilgan joyidagi doiradan qidirishini anglatadi."
    },
    {
      id: 7,
      question: "O'zgaruvchi biror funksiya ichida `var` yordamida e'lon qilinsa, uning scope doirasi qanday bo'ladi?",
      options: [
        "Global Scope",
        "Function Scope (faqat o'sha funksiya ichidagina ko'rinadi)",
        "Block Scope",
        "Lexical Scope"
      ],
      correctAnswer: 1,
      explanation: "`var` o'zgaruvchisi funksiya ichida e'lon qilinadigan bo'lsa, u funksiya doirasi (Function Scope) bilan chegaralanadi va tashqi tomondan ko'rinmaydi."
    },
    {
      id: 8,
      question: "\"Variable Shadowing\" nima?",
      options: [
        "O'zgaruvchini o'chirib tashlash",
        "O'zgaruvchini faqat var bilan yaratish",
        "Ichki scopedagi o'zgaruvchi nomi tashqi scopedagi o'zgaruvchi bilan bir xil bo'lib, tashqisini vaqtincha to'sib (ko'rinmas qilib) qo'yilishi",
        "O'zgaruvchilarni faqat global qilish"
      ],
      correctAnswer: 2,
      explanation: "Variable shadowing - joriy scope ichida tashqi scopedagi o'zgaruvchi bilan bir xil nomda yangi o'zgaruvchi e'lon qilinganda yuz beradigan holat bo'lib, ichki o'zgaruvchi ustuvorlikka ega bo'ladi."
    },
    {
      id: 9,
      question: "JavaScriptda Scope Chain (ko'rinish sohalari zanjiri) qanday ishlaydi?",
      options: [
        "Tashqaridan ichkariga qarab o'zgaruvchi qidiriladi",
        "O'zgaruvchini topish uchun faqat global scope tekshiriladi",
        "O'zgaruvchi joriy scopedan boshlab, bosqichma-bosqich tashqariga qarab, eng yuqori global scopegacha qidiriladi",
        "Faqat window obyekti tekshiriladi"
      ],
      correctAnswer: 2,
      explanation: "Dvigatel biror o'zgaruvchini qidirganda, avvalo joriy local/block scopedan boshlaydi, agar topilmasa, tashqi o'rab turuvchi doiraga o'tadi va bu jarayon global doiragacha davom etadi."
    },
    {
      id: 10,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet x = 10;\n{\n  let x = 20;\n}\nconsole.log(x);\n```",
      options: [
        "`20`",
        "`10` (chunki blok ichidagi `let` block scope bo'lgani uchun, u tashqi `x` ga ta'sir qilmaydi)",
        "`ReferenceError`",
        "`undefined`"
      ],
      correctAnswer: 1,
      explanation: "Jingalak qavslar `{ }` let uchun alohida block scope yaratadi. Blok ichidagi `x` faqat ichkarida yashaydi va tashqaridagi global `x = 10` qiymatiga daxl qilmaydi."
    },
    {
      id: 11,
      question: "Strict mode yoqilgan holatda `let/const/var` kalit so'zlarisiz o'zgaruvchi e'lon qilinsa (`x = 5`), nima sodir bo'ladi?",
      options: [
        "U avtomatik global o'zgaruvchiga aylanadi",
        "ReferenceError xatosi kelib chiqadi",
        "U block scopega ega bo'ladi",
        "Hech narsa sodir bo'lmaydi"
      ],
      correctAnswer: 1,
      explanation: "Strict mode ('use strict') xatoliklarni oldini olish uchun yoziladi va u kalit so'zsiz o'zgaruvchi yaratib, global doirani ifloslantirishni taqiqlaydi va `ReferenceError` beradi."
    },
    {
      id: 12,
      question: "Funksiya parametrlari (arguments) qaysi scope doirasiga kiradi?",
      options: [
        "Global Scope",
        "Faqat o'sha funksiyaning local scope doirasiga",
        "Block Scope",
        "Ular scopedan mustasno"
      ],
      correctAnswer: 1,
      explanation: "Funksiyaning qavslari ichida e'lon qilingan argumentlar/parametrlar faqat o'sha funksiyaning ichki local doirasi bilan cheklanadi."
    }
  ]
};
