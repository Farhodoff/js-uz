export const typeofLesson = {
  id: "typeof",
  title: "typeof operatori",
  level: "Beginner",
  description: "JavaScriptda qiymat yoki o'zgaruvchilarning ma'lumot turini aniqlash qoidalari va uning o'ziga xos xususiyatlari.",
  theory: `## 1. NEGA kerak?
JavaScript dinamik tiplashuvchi til bo'lib, o'zgaruvchilarning turlari dastur davomida o'zgarishi mumkin. Tashqaridan (masalan, foydalanuvchidan yoki serverdan) kelgan ma'lumotning turini aniqlash va shunga qarab tegishli amallarni xavfsiz bajarish uchun typeof operatori yordamga keladi.

## 2. SODDALIK (Analogiya)
Buni maxsus detektorga yoki tovar skaneriga o'xshatish mumkin. Siz skanerga istalgan narsani qo'yasiz va u sizga "Bu oziq-ovqat", "Bu kiyim" yoki "Bu elektronika" deb turini aytib beradi. typeof operatori ham qiymatning turini skanerlab, nomini qaytaradi.

## 3. STRUKTURA
typeof operatorining umumiy natijalari quyidagicha:
- \`typeof 42\` -> "number"
- \`typeof "Salom"\` -> "string"
- \`typeof true\` -> "boolean"
- \`typeof undefined\` -> "undefined"
- \`typeof null\` -> "object" (JavaScriptdagi tarixiy bug/xatolik)
- \`typeof {}\` -> "object"
- \`typeof []\` -> "object"
- \`typeof function(){}\` -> "function"
- \`typeof NaN\` -> "number"

typeof operator bo'lganligi sababli uni qavssiz yozish tavsiya etiladi (masalan: \`typeof x\`), lekin qavs bilan ham ishlashi mumkin (\`typeof(x)\`).

## 4. AMALIYOT (Mashqlar pastda)
\`\`\`javascript
let x = "JS";
console.log(typeof x); // "string"

console.log(typeof (5 + 5)); // "number"
console.log(typeof true);    // "boolean"
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **Double typeof ishlatish:** \`typeof typeof 100\` har doim \`"string"\` qaytaradi. Chunki birinchi typeof \`"number"\` (matn) qaytaradi, ikkinchi typeof esa matnning turini \`string\` deb topadi.
2. **Massivlarni farqlay olmaslik:** Massivlar uchun ham typeof "object" qaytaradi. Massivni aniqlash uchun \`Array.isArray(arr)\` dan foydalanish kerak.

## 6. SAVOLLAR VA JAVOBLAR
**1. typeof operatori nima qaytaradi?**
Tekshirilayotgan qiymat yoki o'zgaruvchining ma'lumot turini bildiruvchi matn (string) qaytaradi.

**2. typeof natijasi qaysi ma'lumot turida bo'ladi?**
Natija har doim string (matn) turida bo'ladi (masalan, "number" yoki "string").

**3. Nima uchun typeof null "object" chiqadi?**
Bug - bu JavaScriptning birinchi versiyasidan qolgan tarixiy xatolik bo'lib, orqaga moslikni saqlash uchun o'zgartirilmagan.

**4. Massivning turini typeof orqali aniqlab bo'ladimi?**
Yo'q, massivlar uchun typeof "object" qaytaradi. Massiv ekanini aniqlash uchun Array.isArray() ishlatiladi.

**5. typeof NaN natijasi nima?**
"number" qaytaradi, chunki NaN sonlar oilasiga kiruvchi maxsus matematik qiymatdir.

**6. typeof 10 + " apples" natijasi nima bo'ladi?**
"number apples" bo'ladi. Chunki typeof 10 birinchi bo'lib bajarilib "number" qaytaradi va unga " apples" qo'shiladi.

**7. typeof (10 + " apples") natijasi nima?**
"string" bo'ladi, chunki qavs ichidagi amal "10 apples" matnini hosil qiladi va typeof uning turini aniqlaydi.

**8. typeof undefined natijasi nima?**
"undefined" matni chiqadi.

**9. Funksiyalarning turi nima deb chiqadi?**
"function" deb chiqadi.

**10. typeof true === "boolean" natijasi nima bo'ladi?**
true bo'ladi, chunki typeof true qiymati "boolean" stringidir va u "boolean" bilan tengdir.

**11. typeof typeof 42 natijasi nima?**
"string" bo'ladi. Birinchi typeof 42 -> "number" (string), ikkinchi typeof "number" -> "string".

**12. E'lon qilinmagan o'zgaruvchiga typeof ishlatsa xato beradimi?**
Yo'q, xavfsiz tarzda "undefined" matnini qaytaradi.
`,
  exercises: [
    {
      id: 1,
      title: "Turini tekshiring",
      instruction: "100 sonining turini typeof orqali aniqlang va konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(typeof 100);",
      test: "if (logs.includes('number')) return null; return 'Xato chiqdi!';"
    },
    {
      id: 2,
      title: "Matn turini aniqlash",
      instruction: "word o'zgaruvchisining turini typeof yordamida aniqlang va natijani res o'zgaruvchisiga saqlang.",
      startingCode: "let word = 'Salom';\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof word;",
      test: "if (res === 'string') return null; return 'res \"string\" bo\\'lishi kerak!';"
    },
    {
      id: 3,
      title: "Boolean turini aniqlash",
      instruction: "isTrue o'zgaruvchisining turini typeof orqali aniqlab res o'zgaruvchisiga yozing.",
      startingCode: "let isTrue = false;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof isTrue;",
      test: "if (res === 'boolean') return null; return 'res \"boolean\" bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "null qiymatning turini tekshirish",
      instruction: "null qiymatining turini typeof orqali aniqlang va res o'zgaruvchisiga yozing.",
      startingCode: "let val = null;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof val;",
      test: "if (res === 'object') return null; return 'res \"object\" bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "NaN turini tekshirish",
      instruction: "NaN qiymatining turini typeof orqali aniqlang va res o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let val = NaN;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof val;",
      test: "if (res === 'number') return null; return 'res \"number\" bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Obyekt turini aniqlash",
      instruction: "Obyekt ({}) turini typeof orqali aniqlang va res o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let obj = {};\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof obj;",
      test: "if (res === 'object') return null; return 'res \"object\" bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "Massiv turini aniqlash",
      instruction: "Massiv ([]) turini typeof orqali aniqlab res o'zgaruvchisiga yozing.",
      startingCode: "let arr = [];\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof arr;",
      test: "if (res === 'object') return null; return 'res \"object\" bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Funksiya turini aniqlash",
      instruction: "myFn funksiyasining turini typeof orqali aniqlang va res o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let myFn = function() {};\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof myFn;",
      test: "if (res === 'function') return null; return 'res \"function\" bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Double typeof",
      instruction: "typeof typeof 123 ifodasining natijasini res o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof typeof 123;",
      test: "if (res === 'string') return null; return 'res \"string\" bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Undefined turini aniqlash",
      instruction: "val o'zgaruvchisining turini typeof orqali aniqlab res o'zgaruvchisiga saqlang.",
      startingCode: "let val = undefined;\n// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof val;",
      test: "if (res === 'undefined') return null; return 'res \"undefined\" bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Amal natijasining turi",
      instruction: "5 * '10' ko'paytirish amali natijasining turini typeof orqali aniqlang va res o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof (5 * '10');",
      test: "if (res === 'number') return null; return 'res \"number\" bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Taqqoslash natijasining turi",
      instruction: "typeof 5 === 'number' mantiqiy ifodasining turini typeof orqali aniqlang va res o'zgaruvchisiga yozing.",
      startingCode: "// Bu yerga yozing\nlet res = ",
      hint: "let res = typeof (typeof 5 === 'number');",
      test: "if (res === 'boolean') return null; return 'res \"boolean\" bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "`typeof` operatori qaytaradigan qiymat har doim qaysi ma'lumot turida (data type) bo'ladi?",
      options: [
        "Number",
        "String (ya'ni matn ko'rinishida, masalan: \"number\", \"string\")",
        "Boolean",
        "Object"
      ],
      correctAnswer: 1,
      explanation: "`typeof` har doim aniqlangan turning nomini satr (string) ko'rinishida qaytaradi (masalan, `\"number\"`, `\"boolean\"`, `\"undefined\"`)."
    },
    {
      id: 2,
      question: "Quyidagi kodlardan qaysi biri JavaScript-ning dastlabki yaratilishidagi tarixiy xatolik (bug) hisoblanadi va unga ko'ra primitiv ma'lumot turi bo'lsa-da, javob `\"object\"` deb qaytadi?",
      options: [
        "`typeof undefined`",
        "`typeof null`",
        "`typeof NaN`",
        "`typeof []`"
      ],
      correctAnswer: 1,
      explanation: "`typeof null` ning `\"object\"` qaytarishi JSning birinchi versiyalaridan qolib ketgan mashhur xatolikdir. `null` aslida primitiv tur hisoblanadi."
    },
    {
      id: 3,
      question: "`typeof typeof 99` ifodasi bajarilganda qanday natija qaytadi?",
      options: [
        "`\"number\"`",
        "`\"string\"` (chunki birinchi `typeof 99` bizga \"number\" stringini qaytaradi, ikkinchi typeof esa uning turini string deb topadi)",
        "`\"object\"`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "`typeof 99` bizga `\"number\"` satrini beradi. Satrning ma'lumot turi esa `string` bo'lgani sababli `typeof \"number\"` natijasini `string` deb topadi."
    },
    {
      id: 4,
      question: "JavaScript-da massiv (array) va obyekt (object) ustida alohida `typeof` ishlatilganda, ularning ikkalasidan ham qanday natija qaytadi?",
      options: [
        "`\"array\"` va `\"object\"`",
        "`\"object\"` va `\"object\"` (chunki JS-da massivlar ham mohiyatan obyektdir, massivni farqlash uchun Array.isArray() ishlatiladi)",
        "`\"list\"` va `\"dict\"`",
        "`\"collection\"` va `\"object\"`"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da massivlar (arrays) alohida ma'lumot turi emas, ular obyektlarning bir ko'rinishidir. Shuning uchun `typeof []` ham `\"object\"` beradi."
    },
    {
      id: 5,
      question: "`typeof NaN` natijasi nima bo'ladi?",
      options: [
        "`\"NaN\"`",
        "`\"number\"` (chunki NaN (Not a Number) son bo'lmasa ham, sonli amallar natijasida chiqadigan qiymat sifatida sonlar oilasiga kiradi)",
        "`\"undefined\"`",
        "`TypeError` xatosi"
      ],
      correctAnswer: 1,
      explanation: "`NaN` — bu maxsus matematik qiymat bo'lib, 'Raqam Emas' (Not a Number) degan ma'noni beradi. Biroq, u raqamli tiplar doirasida ishlatilgani uchun uning turi `\"number\"` hisoblanadi."
    },
    {
      id: 6,
      question: "`typeof 10 + \" apples\"` kodi ishga tushirilganda nima qaytaradi?",
      options: [
        "`\"10 apples\"`",
        "`\"number apples\"` (chunki operator ustuvorligi sababli typeof 10 birinchi bajarilib \"number\" beradi, keyin unga \" apples\" matni qo'shiladi)",
        "`\"string\"`",
        "`TypeError` xatosi"
      ],
      correctAnswer: 1,
      explanation: "`typeof` operatori qo'shish `+` operatoridan ustunroqdir. Shuning uchun birinchi navbatda `typeof 10` bajarilib `\"number\"` hosil bo'ladi va unga `\" apples\"` birlashadi."
    },
    {
      id: 7,
      question: "`typeof (10 + \" apples\")` kodi nima qaytaradi?",
      options: [
        "`\"number apples\"`",
        "`\"string\"` (chunki qavs ichidagi amal birinchi bajariladi va natija string bo'lganligi sababli uning turi string chiqadi)",
        "`\"number\"`",
        "`\"object\"`"
      ],
      correctAnswer: 1,
      explanation: "Qavs ichidagi `10 + \" apples\"` ifodasi birinchi bo'lib satrga aylanadi (`\"10 apples\"`). Skaner ya'ni `typeof` esa bu qiymatni string deb aniqlaydi."
    },
    {
      id: 8,
      question: "E'lon qilinmagan (mavjud bo'lmagan) o'zgaruvchi ustida `typeof` ishlatilganda nima sodir bo'ladi?",
      options: [
        "`ReferenceError` xatoligi yuz beradi",
        "Xavfsiz tarzda `\"undefined\"` qiymati qaytadi",
        "Dastur ishdan to'xtaydi",
        "`\"null\"` qaytadi"
      ],
      correctAnswer: 1,
      explanation: "`typeof` operatori JavaScriptda e'lon qilinmagan o'zgaruvchilarda xato bermaydi, u har doim xavfsiz tarzda `\"undefined\"` deb javob beradi."
    },
    {
      id: 9,
      question: "Quyidagi kodning natijasi nima bo'ladi: `typeof Symbol(\"id\")`?",
      options: [
        "`\"string\"`",
        "`\"symbol\"` (chunki Symbol ES6 da qo'shilgan primitiv ma'lumot turidir)",
        "`\"object\"`",
        "`\"undefined\"`"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda `Symbol` — bu o'ziga xos noyob identifikatordir va uning turi `\"symbol\"` deb qaytariladi."
    },
    {
      id: 10,
      question: "`typeof function(){}` kodi nima qaytaradi?",
      options: [
        "`\"object\"`",
        "`\"function\"` (chunki JSda funksiyalar chaqiriluvchi obyektlar bo'lsa-da, typeof ularni alohida \"function\" turi sifatida aniqlaydi)",
        "`\"array\"`",
        "`\"undefined\"`"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda funksiyalar aslida obyektdir, lekin typeof ularni oson ajratish uchun maxsus `\"function\"` qiymatini qaytaradi."
    },
    {
      id: 11,
      question: "Quyidagi kod natijasi nima bo'ladi:\n```javascript\nlet y = null;\nconsole.log(typeof typeof y);\n```",
      options: [
        "`\"object\"`",
        "`\"string\"` (chunki birinchi typeof y -> \"object\" (string) beradi, ikkinchi typeof esa uning turini string deb topadi)",
        "`\"null\"`",
        "`undefined`"
      ],
      correctAnswer: 1,
      explanation: "`typeof y` bizga `\"object\"` matnini beradi, chunki `y` ning qiymati `null`. Undan keyingi `typeof \"object\"` esa matnning turi bo'lganligi sababli `\"string\"` natijasini beradi."
    },
    {
      id: 12,
      question: "Quyidagi qaysi qiymatning turi `\"undefined\"` deb qaytadi?",
      options: [
        "`null`",
        "Qiymat berilmagan, faqat e'lon qilingan o'zgaruvchi (masalan: `let age;`)",
        "`\"\"` (bo'sh string)",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "E'lon qilingan lekin qiymat o'zlashtirilmagan o'zgaruvchilarning qiymati `undefined` bo'ladi, typeof esa uning turini `\"undefined\"` deb qaytaradi."
    }
  ]
};
