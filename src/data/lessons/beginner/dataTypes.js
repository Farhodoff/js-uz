export const dataTypesLesson = {
  id: "data-types",
  title: "Ma'lumotlar Turlari (Data Types)",
  theory: `## 1. NEGA kerak?
Kompyuter adashib ketmasligi uchun biz unga qaysi turdagi ma'lumot bilan ishlayotganimizni aytishimiz kerak. Masalan, sonlar bilan hisob-kitob qilinadi, matnlar bilan esa qidiruv yoki tahrirlash amallari bajariladi.

## 2. SODDALIK (Analogiya)
Buni **oshxona idishlari** deb tasavvur qiling:
- **String (Matn):** Choynak, ichiga faqat harflar quyiladi.
- **Number (Son):** Likopcha, unga faqat sonlar qo'yiladi.
- **Boolean:** Chiroq yoqgichi, yoki yoniq (\`true\`), yoki o'chiq (\`false\`).

## 3. STRUKTURA

### A. Primitiv turlar (Oddiy)
1. **Number:** Hamma sonlar (5, 3.14, -10). Maxsus qiymatlar: \`Infinity\`, \`-Infinity\`, \`NaN\`.
2. **String:** Qo'shtirnoq ichidagi matnlar (\`"Salom"\`, \`'JS'\`, \` \`Backtick\` \`).
3. **Boolean:** Faqat \`true\` yoki \`false\`.
4. **Undefined:** O'zgaruvchi e'lon qilingan, lekin qiymat berilmagan.
5. **Null:** Ataylab "bo'sh" qilib qo'yilgan qiymat.
6. **Symbol:** Unikal identifikatorlar uchun.
7. **BigInt:** Juda katta sonlar uchun.

### B. typeof operatori (Detektor)
O'zgaruvchining turini aniqlash uchun ishlatiladi.
\`\`\`javascript
console.log(typeof 42);         // "number"
console.log(typeof "JS");       // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (Bug! ⚠️)
console.log(typeof NaN);        // "number" (G'alati! ⚠️)
\`\`\`

## 4. AMALIYOT (Mashqlar pastda)

## 5. XATOLAR (Common mistakes)
1. **typeof null:** JSda \`typeof null\` natijasi \`"object"\` chiqadi. Bu JS yaratilgandagi xato bo'lib, hozirda uni tuzatib bo'lmaydi.
2. **NaN (Not a Number):** Matematik xatolar natijasi (masalan, \`"abc" / 2\`). Uning turi **number** hisoblanadi.
3. **Qo'shtirnoqlarni adashtirish:** \`"Salom'\` (boshida qo'sh, oxirida bittalik) xatoga olib keladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Ma'lumot turi nima?**
Qiymatning qaysi turga (son, matn va h.k.) tegishli ekanligini belgilovchi belgi.

**2. JavaScriptda nechta primitiv ma'lumot turi bor?**
7 ta: String, Number, Boolean, Undefined, Null, Symbol, BigInt.

**3. typeof operatori nima qaytaradi?**
Ma'lumot turining nomini matn (string) ko'rinishida qaytaradi.

**4. undefined va null farqi nima?**
\`undefined\` — qiymat hali berilmaganligini anglatadi. \`null\` — qiymat ataylab bo'sh qilib qo'yilganini bildiradi.

**5. NaN nima degani?**
"Not a Number" (Son emas). Matematik xato yuz berganda qaytadigan maxsus qiymat.

**6. typeof null natijasi nima va nima uchun?**
\`"object"\`. Bu JSning tarixiy xatosi hisoblanadi.

**7. BigInt nima uchun kerak?**
Standart \`Number\` turi sig'dira olmaydigan juda katta butun sonlar bilan ishlash uchun.

**8. String yaratishning 3 xil usuli qaysi?**
Bittalik qo'shtirnoq (\`'\`), qo'sh qo'shtirnoq (\`"\`) va backtick (\` \` \`).

**9. Booleanning qanday qiymatlari bor?**
Faqat ikkita: \`true\` va \`false\`.

**10. typeof NaN natijasi nima?**
\`"number"\`.

**11. Primitiv va Reference (Object) turlar farqi nima?**
Primitiv turlar qiymatni o'zida saqlaydi, Reference turlar esa xotiradagi manzilni (link) saqlaydi.

**12. Symbol nima uchun ishlatiladi?**
Obyektlar uchun takrorlanmas, unikal kalitlar yaratish uchun.
`,
  exercises: [
    {
      id: 1,
      title: "Turini aniqlang",
      instruction: "'age' o'zgaruvchisining turini konsolga chiqaring.",
      startingCode: "let age = 20;\n// Bu yerga yozing\n",
      hint: "console.log(typeof age);",
      test: "if (logs.includes('number')) return null; return 'typeof ishlatilmadi!';"
    },
    {
      id: 2,
      title: "G'alati holat",
      instruction: "null qiymatining turini (typeof) konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(typeof null);",
      test: "if (logs.includes('object')) return null; return 'null turi object chiqishi kerak!';"
    },
    {
      id: 3,
      title: "Matn uzunligi",
      instruction: "'text' o'zgaruvchisining uzunligini (length) konsolga chiqaring.",
      startingCode: "const text = 'JavaScript';\n// Bu yerga yozing\n",
      hint: "console.log(text.length);",
      test: "if (logs.includes('10')) return null; return 'Matn uzunligini to\\'g\\'ri chiqaring';"
    },
    {
      id: 4,
      title: "NaN hosil qilish",
      instruction: "Matnni songa bo'lish orqali NaN qiymatini hisoblang va uning turini (typeof) konsolga chiqaring.",
      startingCode: "const val = 'salom' / 2;\n// Bu yerga yozing\n",
      hint: "console.log(typeof val);",
      test: "if (logs.includes('number')) return null; return 'NaN ning turi number bo\\'lishi kerak';"
    },
    {
      id: 5,
      title: "Boolean qiymat",
      instruction: "'isLogged' nomli o'zgaruvchiga true qiymatini bering va uni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let isLogged = true;\nconsole.log(isLogged);",
      test: "if (logs.includes('true') || logs.includes(true)) return null; return 'Boolean qiymatni to\\'g\\'ri chiqaring';"
    },
    {
      id: 6,
      title: "BigInt yaratish",
      instruction: "100 sonidan BigInt hosil qiling (oxiriga n qo'shish orqali) va uning turini konsolga chiqaring.",
      startingCode: "const value = 100n;\n// Bu yerga yozing\n",
      hint: "console.log(typeof value);",
      test: "if (logs.includes('bigint')) return null; return 'BigInt turini aniqlang';"
    },
    {
      id: 7,
      title: "Symbol yaratish",
      instruction: "'mySym' nomli Symbol yarating (tavsifi 'id' bo'lsin) va uning turini konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "const mySym = Symbol('id');\nconsole.log(typeof mySym);",
      test: "if (logs.includes('symbol')) return null; return 'Symbol yarating va turini konsolga chiqaring';"
    },
    {
      id: 8,
      title: "Undefined qiymat e'lon qilish",
      instruction: "'status' nomli o'zgaruvchiga undefined qiymat berib uni konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "let status = undefined;\nconsole.log(status);",
      test: "if (logs.includes('undefined')) return null; return 'status o\\'zgaruvchisiga undefined qiymatini bering';"
    },
    {
      id: 9,
      title: "Obyekt turini aniqlash",
      instruction: "Bo'sh obyekt yarating va uning turini (typeof) konsolga chiqaring.",
      startingCode: "const obj = {};\n// Bu yerga yozing\n",
      hint: "console.log(typeof obj);",
      test: "if (logs.includes('object')) return null; return 'Obyekt turi object chiqishi kerak';"
    },
    {
      id: 10,
      title: "Massiv turini aniqlash",
      instruction: "Bo'sh massiv yarating va uning turini (typeof) konsolga chiqaring.",
      startingCode: "const list = [];\n// Bu yerga yozing\n",
      hint: "console.log(typeof list);",
      test: "if (logs.includes('object')) return null; return 'Massiv turi ham object chiqishi kerak';"
    },
    {
      id: 11,
      title: "Infinity hosil qilish",
      instruction: "Sonni nolga bo'lish orqali Infinity hosil qiling va natijani konsolga chiqaring.",
      startingCode: "// Bu yerga yozing\n",
      hint: "console.log(10 / 0);",
      test: "if (logs.includes('Infinity') || logs.includes(Infinity)) return null; return 'Infinity qiymatini chiqaring';"
    },
    {
      id: 12,
      title: "Songa o'tkazish",
      instruction: "Matnli '123' sonini Number() orqali songa o'tkazing va uning turini konsolga chiqaring.",
      startingCode: "const str = '123';\n// Bu yerga yozing\n",
      hint: "const num = Number(str);\nconsole.log(typeof num);",
      test: "if (logs.includes('number')) return null; return 'Songa o\\'tkazilgandan keyingi turni aniqlang';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da primitiv (oddiy) ma'lumot turlari nechta?",
      options: [
        "5 ta",
        "7 ta (String, Number, Boolean, Undefined, Null, Symbol, BigInt)",
        "3 ta (String, Number, Boolean)",
        "10 ta"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da jami 7 ta primitiv ma'lumot turi mavjud. Obyektlar (Objects) esa murakkab (reference) turga kiradi."
    },
    {
      id: 2,
      question: "Quyidagi kodlardan qaysi biri bajarilganda `NaN` (Not a Number) qiymati kelib chiqadi?",
      options: [
        "`10 / 2`",
        "`\"Hello\" / 2`",
        "`\"5\" - 2`",
        "`typeof NaN`"
      ],
      correctAnswer: 1,
      explanation: "Raqam bo'lmagan matnni (`\"Hello\"`) songa bo'lishga urinilganda JavaScript buni hisoblay olmaydi va `NaN` (Not a Number - son emas) qiymatini qaytaradi."
    },
    {
      id: 3,
      question: "O'zgaruvchi e'lon qilingan, lekin unga hech qanday qiymat berilmagan bo'lsa, uning qiymati va turi nima bo'ladi?",
      options: [
        "`null`",
        "`undefined`",
        "`\"empty\"`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "E'lon qilingan lekin qiymat o'zlashtirilmagan o'zgaruvchining qiymati ham, turi ham default holatda `undefined` hisoblanadi."
    },
    {
      id: 4,
      question: "JavaScript-da `typeof null` nima qaytaradi va buning sababi nimada?",
      options: [
        "`\"null\"`",
        "`\"object\"` (Bu til yaratilgandagi tarixiy xatodir)",
        "`\"undefined\"`",
        "`\"error\"`"
      ],
      correctAnswer: 1,
      explanation: "`typeof null` qiymati `\"object\"` qaytaradi. Bu tilning birinchi versiyalaridagi xatolik bo'lib, keyinchalik uni o'zgartirish mavjud veb-saytlar ishini buzmasligi uchun shundayligicha qoldirilgan."
    },
    {
      id: 5,
      question: "`typeof NaN` natijasi nima bo'ladi?",
      options: [
        "`\"NaN\"`",
        "`\"number\"`",
        "`\"undefined\"`",
        "`\"string\"`"
      ],
      correctAnswer: 1,
      explanation: "`NaN` qisqartmasi 'Not a Number' (son emas) degan ma'noni bildirsa ham, uning texnik turi baribir `number` (son) hisoblanadi."
    },
    {
      id: 6,
      question: "BigInt ma'lumot turiga tegishli sonlarni e'lon qilishda sonning oxiriga qaysi harf yoziladi?",
      options: [
        "`b` harfi",
        "`n` harfi (masalan: `9007199254740991n`)",
        "`g` harfi",
        "`L` harfi"
      ],
      correctAnswer: 1,
      explanation: "JavaScript-da BigInt sonlarining oxiriga kichik `n` harfi yoziladi yoki `BigInt()` funksiyasidan foydalaniladi."
    },
    {
      id: 7,
      question: "Quyidagilardan qaysi biri reference (murakkab/havola) ma'lumot turiga kiradi?",
      options: [
        "Symbol",
        "BigInt",
        "Object (Obyektlar, massivlar va funksiyalar)",
        "Undefined"
      ],
      correctAnswer: 2,
      explanation: "JavaScript-da yagona reference (murakkab) ma'lumot turi bu Object (Obyekt) dir. Massivlar va funksiyalar ham obyektlarning maxsus turlari hisoblanadi."
    },
    {
      id: 8,
      question: "Symbol ma'lumot turi asosan nima maqsadda ishlatiladi?",
      options: [
        "Katta matematik hisob-kitoblar uchun",
        "Obyektlar uchun butunlay unikal (takrorlanmas) va yashirin kalitlar yaratish uchun",
        "Matnlarni formatlash uchun",
        "Sikllarni tezlashtirish uchun"
      ],
      correctAnswer: 1,
      explanation: "Symbol primitiv ma'lumot turi bo'lib, uning yordamida yaratilgan har bir qiymat butunlay unikal hisoblanadi. U obyektlarda nomlar to'qnashuvini oldini olish uchun kalit sifatida ishlatiladi."
    },
    {
      id: 9,
      question: "JavaScript-da `Infinity` va `-Infinity` qiymatlari qaysi ma'lumot turiga tegishli?",
      options: [
        "String",
        "Number (chunki ular maxsus sonli qiymatlar hisoblanadi)",
        "Boolean",
        "Object"
      ],
      correctAnswer: 1,
      explanation: "Infinity (cheksizlik) va -Infinity maxsus sonli qiymatlar bo'lib, ular `number` ma'lumot turiga kiradi."
    },
    {
      id: 10,
      question: "Quyidagi kod bajarilganda konsolga nima chiqadi?\n```javascript\nconsole.log(typeof typeof 42);\n```",
      options: [
        "`\"number\"`",
        "`\"string\"` (chunki birinchi typeof `\"number\"` matnini qaytaradi, ikkinchi typeof esa o'sha matnning turini string deb topadi)",
        "`\"undefined\"`",
        "`\"object\"`"
      ],
      correctAnswer: 1,
      explanation: "`typeof 42` ifodasi `\"number\"` stringini qaytaradi. Keyin `typeof \"number\"` bajariladi va u string ma'lumot turi bo'lganligi sababli `\"string\"` qaytadi."
    },
    {
      id: 11,
      question: "Primitiv (oddiy) va reference (murakkab) ma'lumot turlari o'rtasidagi eng muhim farq nimada?",
      options: [
        "Primitiv turlar faqat sonlar bilan ishlaydi",
        "Primitiv turlar o'z qiymatini xotirada bevosita saqlaydi; reference turlar esa xotiradagi manzilga (havolaga) ishora qiladi",
        "Reference turlar tezroq ishlaydi",
        "Hech qanday farq yo'q"
      ],
      correctAnswer: 1,
      explanation: "Primitiv qiymatlar o'zgaruvchi joylashgan xotira katakchasida saqlanadi. Obyektlar esa heap xotirada saqlanib, o'zgaruvchida faqat ularning manzili saqlanadi."
    },
    {
      id: 12,
      question: "Quyidagi ifoda nimani qaytaradi?\n```javascript\ntypeof function() {};\n```",
      options: [
        "`\"object\"`",
        "`\"function\"` (chunki funksiya maxsus obyekt turi bo'lsa-da, typeof unga alohida nom qaytaradi)",
        "`\"undefined\"`",
        "`\"method\"`"
      ],
      correctAnswer: 1,
      explanation: "Funksiyalar JavaScript-da obyekt turiga kirsalar ham, typeof operatori qulaylik uchun ularni `\"function\"` deb qaytaradi."
    }
  ]
};
