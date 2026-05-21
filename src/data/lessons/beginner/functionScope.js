export const functionScopeLesson = {
  id: "function-scope",
  title: "Function Scope: Xona sirlari",
  theory: `## 1. KIRISH
Tasavvur qiling, har bir funksiya — bu bitta alohida **xona**. Xona ichida nima sodir bo'layotganini tashqaridagilar ko'rmaydi. Bu o'zgaruvchilarni xavfsiz saqlashning eng oson usuli.

**Function Scope** — bu o'zgaruvchining faqat funksiya ichida "yashashi" va ishlatilishidir. Funksiya tugashi bilan uning ichidagi hamma o'zgaruvchilar o'chib ketadi.

## 1. NEGA kerak?
Tasavvur qiling, har bir funksiyada bir xil nomli o'zgaruvchi (\`count\`) ishlatmoqchisiz. Agar "funksiya doirasi" bo'lmaganda edi, barcha funksiyalar bir-birining o'zgaruvchisini o'zgartirib yuborar edi. Scope bizga har bir funksiya uchun "shaxsiy hudud" yaratadi va dasturimizni chalkashib ketishdan asraydi.

## 2. SODDALIK (Analogiya)
Funksiyani alohida bir **xona** deb tasavvur qiling. Xona ichida nima sodir bo'layotganini ko'chada (globalda) turganlar ko'rmaydi. Xona ichidagi shaxsiy kundalikni (o'zgaruvchini) faqat o'sha xonaga kirganlar o'qiy oladi. Tashqaridagilar esa xonaning ichini umuman ko'ra olmaydi.

## 3. STRUKTURA

### A. Funksiya ichidagi o'zgaruvchi
\`\`\`javascript
function xona() {
  let sir = "Maxfiy";
  console.log(sir); // Xona ichida ko'rinadi ✅
}
xona();
console.log(sir); // Xato! ❌ (Xonadan tashqarida ko'rinmaydi)
\`\`\`

### B. var, let va const farqi
Funksiya ichida e'lon qilingan bo'lsa, uchalasi ham tashqariga chiqolmaydi (ya'ni function scope-ga to'liq amal qiladi):
\`\`\`javascript
function test() {
  var a = 1;
  let b = 2;
  const c = 3;
}
// a, b, c - hech biri tashqarida yo'q!
\`\`\`

## 4. AMALIYOT (Mashq)
\`\`\`javascript
let ism = "Ali"; // Global

function salom() {
  let ism = "Vali"; // Local (shaxsiy) - Variable Shadowing
  console.log("Salom, " + ism);
}

salom(); // Salom, Vali
console.log(ism); // Ali (Global ism o'zgarmadi!)
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Kalit so'zsiz o'zgaruvchi:** Funksiya ichida \`let/const\` ishlatmasdan o'zgaruvchi yaratsangiz (\`x = 10\`), u avtomatik ravishda **Global** bo'lib qoladi (strict mode bo'lmaganda) va boshqa joylarga xalaqit beradi. Doim \`let\` yoki \`const\` ishlating!
2. **Variable Shadowing chalkashligi:** Ichki scopedagi o'zgaruvchini tashqi scope bilan chalkashtirib yuborish. Local o'zgaruvchini o'zgartirish global o'zgaruvchiga ta'sir qilmaydi (agar \`let/const\` bilan e'lon qilingan bo'lsa).

## 6. SAVOLLAR VA JAVOBLAR (12 ta)

**1. Function Scope nima?**
Function Scope — funksiya ichida e'lon qilingan o'zgaruvchi va funksiyalarning faqat shu funksiya ichida mavjud bo'lishi va tashqaridan unga kirib bo'lmasligidir.

**2. O'zgaruvchi funksiya ichida yaratilsa nima deyiladi?**
Lokal o'zgaruvchi (Local variable) deyiladi.

**3. Nima uchun funksiya ichidagi o'zgaruvchi tashqarida ko'rinmaydi?**
Chunki JavaScript xavfsizlik va ma'lumotlarni yashirish (encapsulation) uchun funksiyalar atrofida ko'rinish chegaralarini (scope) o'rnatadi.

**4. Funksiya ichida var ishlatsa u tashqarida ko'rinadimi?**
Yo'q, \`var\` block scope-ni tan olmasa ham, function scope-ga to'liq bo'ysunadi. Funksiya ichidagi \`var\` o'zgaruvchisi tashqaridan ko'rinmaydi.

**5. Funksiya tugaganidan keyin uning ichidagi o'zgaruvchilar nima bo'ladi?**
Ular xotirani bo'shatish uchun axlat yig'uvchi (Garbage Collector) tomonidan avtomatik ravishda o'chirib tashlanadi.

**6. Global scope va Local scope farqi nima?**
Global scope-dagi o'zgaruvchilar butun kod davomida ochiq bo'ladi. Local scope o'zgaruvchilari esa faqat ma'lum bir funksiya yoki blok ichida yashaydi.

**7. "Lexical Scope" nima degani?**
Lexical Scope — o'zgaruvchilarning ko'rinish sohasi ular kodning qayerida yozilganiga qarab belgilanishidir (funksiya chaqirilgan joyga qarab emas, balki yaratilgan joyiga qarab).

**8. Funksiya ichida let ishlatishning afzalligi nimada?**
\`let\` o'zgaruvchilari hoisting paytida TDZ (Temporal Dead Zone) ga tushadi va ularni e'lon qilishdan oldin ishlatish xavfini oldini oladi hamda block scope-ga rioya qiladi.

**9. Nima uchun global va local o'zgaruvchilar nomi bir xil bo'lsa, local ustuvor bo'ladi?**
Buni "Variable Shadowing" (to'sish) deyiladi, joriy scopedagi o'zgaruvchi tashqi scopedagisini soya ostida qoldiradi.

**10. Kalit so'zsiz (let/const/var) o'zgaruvchi yaratilsa nima bo'ladi?**
Agar funksiya ichida kalit so'zsiz o'zgaruvchi e'lon qilinsa (masalan \`x = 10\`), u avtomatik ravishda global o'zgaruvchiga aylanadi (qavslar tashqarisida ham ko'rinadi).

**11. Funksiya ichidagi funksiya (nested) tashqi funksiya o'zgaruvchisini ko'radimi?**
Ha, Scope Chain zanjiri bo'yicha ichki funksiya tashqi funksiyaning o'zgaruvchilari va parametrlaridan foydalanishi mumkin (bu closure hosil qiladi).

**12. "Namespace pollution" nima va scope uni qanday hal qiladi?**
Namespace pollution — global sohada o'zgaruvchilarning ko'payib ketishi va bir xil nomlarning to'qnashishidir. Local scope o'zgaruvchilarni alohida hududlarda saqlash orqali bu muammoni hal qiladi.
`,
  exercises: [
    {
      id: 1,
      title: "Scope mashqi",
      instruction: "Funksiya ichida 'msg' o'zgaruvchisini yarating va uni faqat funksiya ichida chiqaring.",
      startingCode: "function show() {\n  // Bu yerda yarating\n}\nshow();",
      hint: "let msg = 'Salom';",
      test: "if (code.includes('msg')) return null; return 'O\\'zgaruvchi yaratilmadi!';"
    },
    {
      id: 2,
      title: "Variable Shadowing",
      instruction: "Global doirada let user = 'Ali' bor. greet() funksiyasi ichida lokal let user = 'Vali' yarating va uni konsolga chiqaring. Global user o'zgarmasligi kerak.",
      startingCode: "let user = 'Ali';\nfunction greet() {\n  // Bu yerda local user yarating va console.log qiling\n}\ngreet();",
      hint: "let user = 'Vali';\nconsole.log(user);",
      test: "if (logs.includes('Vali') && code.includes('let user =') && code.match(/let\\s+user\\s*=\\s*['\"]Vali['\"]/)) return null; return 'greet funksiyasi ichida let user = \"Vali\" yaratib, log qiling!';"
    },
    {
      id: 3,
      title: "Lokal var o'zgaruvchisi",
      instruction: "Funksiya ichidagi var o'zgaruvchisi ham tashqaridan ko'rinmaydi. testVar() funksiyasi ichida var secret = 99 yarating va konsolga chiqaring. Tashqarida chaqirmang.",
      startingCode: "function testVar() {\n  // var secret yarating va console.log(secret) qiling\n}\ntestVar();",
      hint: "var secret = 99;\nconsole.log(secret);",
      test: "if (code.includes('var secret') && logs.includes(99)) return null; return 'var secret = 99 yarating va console.log qiling!';"
    },
    {
      id: 4,
      title: "Kalit so'zsiz o'zgaruvchi (leak)",
      instruction: "Funksiya ichida kalit so'zsiz (let/const/var siz) leakedGlobal = 'leaked' yozing. Uni chaqirgandan keyin globalda qolishini ko'rish uchun tashqarida console.log(leakedGlobal) qiling.",
      startingCode: "function leak() {\n  // leakedGlobal = 'leaked' yozing\n}\nleak();\n// globalda leakedGlobal ni log qiling",
      hint: "leakedGlobal = 'leaked';\nconsole.log(leakedGlobal);",
      test: "if (logs.includes('leaked') && !code.includes('let leakedGlobal') && !code.includes('var leakedGlobal') && !code.includes('const leakedGlobal')) return null; return 'leakedGlobal-ni kalit so\\'zsiz yarating va tashqarida log qiling!';"
    },
    {
      id: 5,
      title: "Parametr doirasi (Parameter Scope)",
      instruction: "Funksiya parametrlari ham lokal o'zgaruvchi hisoblanadi. doubleNum(num) funksiyasi berilgan parametrni 2 ga ko'paytirib konsolga chiqarsin. Tashqaridan doubleNum(5) qilib chaqiring.",
      startingCode: "function doubleNum(num) {\n  // num parametridan foydalanib uni 2 ga ko'paytirib log qiling\n}\n// Chaqiring",
      hint: "function doubleNum(num) { console.log(num * 2); }\ndoubleNum(5);",
      test: "if (logs.includes(10) && code.includes('doubleNum(5)')) return null; return 'doubleNum funksiyasini yozib, 5 qiymati bilan chaqiring!';"
    },
    {
      id: 6,
      title: "Ichma-ich funksiyalar (Nested Scope)",
      instruction: "outer() funksiyasi ichida let x = 10 bor. Uning ichida inner() funksiyasini yarating va u x ni konsolga chiqarsin. outer oxirida inner() ni chaqiring.",
      startingCode: "function outer() {\n  let x = 10;\n  // inner funksiyasini yarating va uni chaqiring\n}\nouter();",
      hint: "function inner() { console.log(x); }\ninner();",
      test: "if (logs.includes(10) && code.includes('inner') && code.includes('outer')) return null; return 'inner funksiyasi outer ichidagi x-ni log qilishi kerak!';"
    },
    {
      id: 7,
      title: "Lokal o'zgaruvchini yangilash",
      instruction: "counter() funksiyasi ichida let count = 0 yarating. Ichki increment() funksiyasi uni 1 ga oshirsin. counter ichida increment() ni 2 marta chaqiring va yakuniy count ni log qiling.",
      startingCode: "function counter() {\n  let count = 0;\n  // increment funksiyasini yozib 2 marta chaqiring va count-ni log qiling\n}\ncounter();",
      hint: "function increment() { count++; }\nincrement(); increment(); console.log(count);",
      test: "if (logs.includes(2) && code.includes('count++')) return null; return 'increment funksiyasi orqali count-ni 2 marta oshiring!';"
    },
    {
      id: 8,
      title: "Scope zanjiri (Scope Chain)",
      instruction: "Globalda let a = 1. level1() ichida let b = 2. level2() ichida let c = 3 bo'lsin. level2 ichida console.log(a + b + c) qiling. level1 ichida level2() chaqirilsin, globalda esa level1() chaqirilsin.",
      startingCode: "let a = 1;\nfunction level1() {\n  let b = 2;\n  // level2 ni yozing va chaqiring\n}\nlevel1();",
      hint: "function level2() { let c = 3; console.log(a + b + c); }\nlevel2();",
      test: "if (logs.includes(6) && code.includes('level2')) return null; return 'level2 ichida a + b + c yig\\'indisini (6) log qiling!';"
    },
    {
      id: 9,
      title: "Shadowing parametrlari",
      instruction: "Global let name = 'Botir' bor. greet(name) funksiyasida parametr sifatida name qabul qilinadi. greet('Sardor') deb chaqirilganda konsolga name ni chiqaring (Sardor chiqishi kerak).",
      startingCode: "let name = 'Botir';\nfunction greet(name) {\n  // name-ni log qiling\n}\ngreet('Sardor');",
      hint: "function greet(name) { console.log(name); }",
      test: "if (logs.includes('Sardor') && !logs.includes('Botir')) return null; return 'greet funksiyasi parametr name-ni chop etishi kerak!';"
    },
    {
      id: 10,
      title: "Lokal const massivi",
      instruction: "manageList() funksiyasi ichida const items = [] yarating. Uni ichki funksiya orqali to'ldirib, yakuniy natijani log qiling.",
      startingCode: "function manageList() {\n  const items = [];\n  function add(val) {\n    // items-ga val qo'shing\n  }\n  add('Olma');\n  add('Anor');\n  console.log(items);\n}\nmanageList();",
      hint: "function add(val) { items.push(val); }",
      test: "if (logs.includes('Olma') && logs.includes('Anor') && code.includes('push')) return null; return 'items massiviga push orqali elementlarni qo\\'shing!';"
    },
    {
      id: 11,
      title: "IIFE funksiya scope",
      instruction: "IIFE yordamida funksiya scope yarating va ichida let iifeVar = 'IIFE' e'lon qilib log qiling.",
      startingCode: "// IIFE yozing (function() { ... })()",
      hint: "(function() { let iifeVar = 'IIFE'; console.log(iifeVar); })();",
      test: "if (logs.includes('IIFE') && code.match(/\\(\\s*function/)) return null; return 'IIFE shaklida funksiya scope yarating!';"
    },
    {
      id: 12,
      title: "Recursion Scope",
      instruction: "factorial(n) funksiyasini yozing, u n-ning faktorialini hisoblasin va qaytarsin. console.log(factorial(5)) (120 bo'lishi kerak).",
      startingCode: "function factorial(n) {\n  // n-faktorialni rekursiv hisoblang\n}\nconsole.log(factorial(5));",
      hint: "if (n <= 1) return 1; return n * factorial(n - 1);",
      test: "if (logs.includes(120) && code.includes('factorial')) return null; return 'Faktorial hisoblaydigan rekursiv funksiyani yozing!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Funksiya ichida e'lon qilingan har qanday o'zgaruvchining hayot davri (lifetime) qachon tugaydi?",
      options: [
        "Brauzer yopilganda",
        "Funksiya o'z ishini bajarib bo'lganidan so'ng (funksiya tugashi bilan uning ichidagi barcha o'zgaruvchilar xotiradan o'chiriladi)",
        "Hech qachon o'chmaydi",
        "Faqat sahifa yangilanganda"
      ],
      correctAnswer: 1,
      explanation: "Funksiya chaqirilganda uning lokal o'zgaruvchilari yaratiladi va funksiya o'z ishini tugatishi (return bo'lishi) bilan bu o'zgaruvchilar xotirani band qilmasligi uchun avtomatik ravishda yo'q qilinadi."
    },
    {
      id: 2,
      question: "Funksiya ichida e'lon qilingan `var`, `let` va `const` o'zgaruvchilaridan qaysi birlarini funksiya tashqarisidan turib chaqirish (ishlatish) mumkin?",
      options: [
        "Faqat `var` yordamida yaratilganini",
        "Faqat `let` va `const` yordamida yaratilganini",
        "Hech birini (funksiya ichida e'lon qilingan har qanday o'zgaruvchi tashqaridan mutlaqo yopiq bo'ladi)",
        "Barchasini ishlatish mumkin"
      ],
      correctAnswer: 2,
      explanation: "Qaysi kalit so'z ishlatilishidan qat'iy nazar (`var`, `let`, yoki `const`), funksiya doirasida (Function Scope) yaratilgan o'zgaruvchilar tashqi dunyodan mutlaqo himoyalangan va faqat o'sha funksiya ichida amal qiladi."
    },
    {
      id: 3,
      question: "Agar funksiya ichida o'zgaruvchi e'lon qilinayotganda hech qanday kalit so'z (`var`, `let` yoki `const`) ishlatilmasdan qiymat berilsa (masalan: `x = 10;`), bu qanday oqibatga olib keladi?",
      options: [
        "Bu xatolik (Error) beradi va dastur to'xtaydi",
        "Ushbu o'zgaruvchi avtomatik ravishda Global Scope-ga qo'shiladi va butun kod bo'ylab o'zgaradi, bu esa namespace pollution xavfini keltirib chiqaradi",
        "U faqat funksiya ichida block scope bo'ladi",
        "U o'zgarmas `const` ga aylanadi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da kalit so'zsiz o'zgaruvchi e'lon qilinganda (strict mode bo'lmagan holatlarda) u global `window` yoki `global` obyektiga biriktirib qo'yiladi. Bu esa xavfli hisoblanadi."
    },
    {
      id: 4,
      question: "Agar bir xil nomli ham global o'zgaruvchi, ham funksiya ichida lokal o'zgaruvchi mavjud bo'lsa, funksiya ichida o'sha nom chaqirilganda qaysi biri ustuvor bo'ladi (Variable Shadowing)?",
      options: [
        "Global o'zgaruvchi ustuvor bo'ladi",
        "Lokal o'zgaruvchi (chunki JS birinchi bo'lib o'zining ichki ko'rinish sohasini (local scope) tekshiradi)",
        "Ikkalasi ham qo'shilib ketadi",
        "Dastur xatolik beradi"
      ],
      correctAnswer: 1,
      explanation: "Buni \"Variable Shadowing\" deb atashadi. Lokal o'zgaruvchi o'sha funksiya ichida tashqaridagi global o'zgaruvchining ko'rinishini to'sib qo'yadi."
    },
    {
      id: 5,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet data = \"A\";\nfunction change() {\n  let data = \"B\";\n}\nchange();\nconsole.log(data);\n```",
      options: [
        "`\"B\"`",
        "`\"A\"` (chunki funksiya ichidagi data o'zgaruvchisi faqat lokal hududda yashaydi va tashqaridagi global data qiymatini o'zgartira olmaydi)",
        "`undefined`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "`change()` funksiyasi ichida `let data` yordamida mutlaqo yangi lokal o'zgaruvchi yaratildi. Tashqaridagi global `data` o'zgarishsiz `\"A\"` holida qoladi."
    },
    {
      id: 6,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nfunction parent() {\n  let parentVar = \"ota\";\n  function child() {\n    console.log(parentVar);\n  }\n  child();\n}\nparent();\n```",
      options: [
        "\"ota\"",
        "ReferenceError",
        "undefined",
        "\"child\""
      ],
      correctAnswer: 0,
      explanation: "JavaScript lexical scoping orqali ichki funksiya tashqi funksiyaning o'zgaruvchilariga kirish huquqiga ega."
    },
    {
      id: 7,
      question: "Funksiya ichida e'lon qilingan `var` kalit so'zi blok ({}) ichida bo'lsa, uning scope-i qanday bo'ladi?",
      options: [
        "Blok scope-da qoladi",
        "Global scope-ga o'tadi",
        "Baribir function scope bo'lib qoladi (chunki var block scope-ga bo'ysunmaydi, faqat function scope-ga bo'ysunadi)",
        "Ushbu kod ishlamaydi"
      ],
      correctAnswer: 2,
      explanation: "var block scope-ni tan olmaydi, lekin function scope-ga to'liq bo'ysunadi. Funksiya ichidagi har qanday blok ({}) ichida var yozilsa ham, u butun funksiya bo'ylab lokal bo'lib qoladi."
    },
    {
      id: 8,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nfunction test() {\n  console.log(x);\n  var x = 10;\n}\ntest();\n```",
      options: [
        "10",
        "ReferenceError",
        "undefined",
        "TypeError"
      ],
      correctAnswer: 2,
      explanation: "var e'lon qilinishi (hoisting) funksiya tepasiga ko'tariladi, lekin qiymat yuklash o'z joyida qoladi. Shuning uchun e'londan oldin chaqirilganda undefined beradi."
    },
    {
      id: 9,
      question: "Quyidagi kod nima natija beradi?\n```javascript\nfunction test() {\n  console.log(y);\n  let y = 10;\n}\ntest();\n```",
      options: [
        "10",
        "ReferenceError (Temporal Dead Zone tufayli)",
        "undefined",
        "SyntaxError"
      ],
      correctAnswer: 1,
      explanation: "let va const o'zgaruvchilari hoisting bo'ladi, lekin e'lon qilinmaguncha TDZ (Temporal Dead Zone) ichida bo'ladi. E'londan oldin chaqirish ReferenceError beradi."
    },
    {
      id: 10,
      question: "\"Lexical Scope\" (yoki Statik Scope) deganda nima tushuniladi?",
      options: [
        "Funksiya chaqirilayotgan muhitga qarab scope belgilanishi",
        "Funksiya yozilgan (kodda joylashgan) o'rniga qarab scope belgilanishi",
        "Faqat const o'zgaruvchilarga tegishli qoida",
        "Dinamik ravishda o'zgaradigan scope"
      ],
      correctAnswer: 1,
      explanation: "JavaScript lexical (static) scope-dan foydalanadi, ya'ni o'zgaruvchilarning ko'rinish sohasi ular kodda qayerda e'lon qilinganligi bilan aniqlanadi, chaqirilgan joyi bilan emas."
    },
    {
      id: 11,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nlet a = 5;\nfunction first() {\n  console.log(a);\n}\nfunction second() {\n  let a = 10;\n  first();\n}\nsecond();\n```",
      options: [
        "10",
        "5",
        "undefined",
        "ReferenceError"
      ],
      correctAnswer: 1,
      explanation: "Lexical scope-ga ko'ra, first() funksiyasi global doirada yozilgan. Shuning uchun u o'zining tashqi doirasi sifatida global doirani ko'radi va global a = 5 qiymatini oladi. second() ichidagi local a unga ta'sir qilmaydi."
    },
    {
      id: 12,
      question: "Quyidagi koddan so'ng xotirada nima sodir bo'ladi?\n```javascript\nfunction process() {\n  let largeArray = new Array(1000000);\n}\nprocess();\n```",
      options: [
        "largeArray xotirada global bo'lib qoladi",
        "Funksiya tugagach, largeArray axlat yig'uvchi (Garbage Collector) tomonidan o'chiriladi",
        "Xotira to'lib qoladi va brauzer qotadi",
        "Faqat largeArray o'zgarmas bo'ladi"
      ],
      correctAnswer: 1,
      explanation: "Funksiya ichidagi lokal o'zgaruvchilarga funksiya tugaganidan so'ng boshqa murojaat qilib bo'lmaydi. Shuning uchun garbage collector ularni avtomatik tarzda xotiradan tozalaydi."
    }
  ]
};
