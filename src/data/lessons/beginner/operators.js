export const operators = {
  id: "operators",
  title: "Operatorlar: Taqqoslash va Mantiqiy",
  level: "Beginner",
  description: "JavaScriptda arifmetik amallar, taqqoslash va mantiqiy operatorlar bilan ishlash qoidalari.",
  theory: `## 1. NEGA kerak?
Hech bir dastur hisob-kitobsiz yoki solishtirishlarsiz ishlamaydi. Masalan, foydalanuvchining puli mahsulot narxidan ko'p yoki teng bo'lsagina sotib olishga ruxsat berish shart. Buni amalga oshirish uchun bizga taqqoslash operatorlari (\`>=\`) va qaror qabul qiluvchi mantiqiy operatorlar kerak bo'ladi.

## 2. SODDALIK (Analogiya)
Operatorlarni **asboblar qutisi** deb tasavvur qiling. Bolg'a (qo'shish \`+\`) bilan ma'lumotlarni birlashtiramiz, tarozi (solishtirish \`===\`) bilan qiymatlarni taqqoslaymiz, kalit (mantiqiy \`&&\`) bilan ikkita shart bajarilgandagina eshikni ochamiz.

## 3. STRUKTURA (Asosiy operatorlar)

### A. Arifmetik operatorlar
\`\`\`javascript
5 + 2; // 7 (qo'shish)
5 - 2; // 3 (ayirish)
5 * 2; // 10 (ko'paytirish)
5 / 2; // 2.5 (bo'lish)
5 % 2; // 1 (qoldiqni olish / modulo)
5 ** 2; // 25 (darajaga ko'tarish, 5 ning 2-darajasi)
\`\`\`

### B. Solishtirish operatorlari
Bu operatorlar solishtirish natijasi sifatida har doim \`true\` yoki \`false\` qiymat qaytaradi:
\`\`\`javascript
5 > 2;  // true
5 < 2;  // false
5 >= 5; // true (katta yoki teng)
5 === 5; // true (qat'iy tenglik - qiymati va turi ham teng)
5 !== 3; // true (qat'iy teng emaslik)
\`\`\`

### C. Mantiqiy operatorlar
- **&& (VA):** Ikkala tomondagi shart ham \`true\` bo'lishi kerak.
- **|| (YOKI):** Kamida bitta shart \`true\` bo'lishi yetarli.
- **! (EMAS / Inkor):** Mantiqiy qiymatni teskarisiga o'zgartiradi (\`!true\` -> \`false\`).

## 4. AMALIYOT (Mashqlar pastda)
Mantiqiy operatorlarni birlashtirish:
\`\`\`javascript
let yosh = 20;
let chiptaBor = true;
let ruxsat = (yosh >= 18) && chiptaBor;
console.log(ruxsat); // true
\`\`\`

## 5. XATOLAR (Common mistakes)
1. **= va === operatorlarini adashtirish:** \`=\` operatori o'zgaruvchiga qiymat berish (o'zlashtirish) uchun ishlatiladi. \`===\` esa qiymatlarni solishtirish uchun ishlatiladi.
2. **Modulo (%) foiz hisoblash emas:** \`10 % 3\` — bu 10 sonini 3 ga bo'lgandagi matematik qoldiq (\`1\`) degani, foiz chiqarish emas.
3. **Mantiqiy ustuvorlik (precedence):** \`&&\` operatori \`||\` operatoriga qaraganda yuqori ustuvorlikka ega, ya'ni oldin bajariladi.

## 6. SAVOLLAR VA JAVOBLAR
**1. Operator nima?**
Qiymatlar ustida matematik, solishtirish yoki mantiqiy amallarni bajaruvchi maxsus belgilar.

**2. Arifmetik operatorlarni sanang.**
Qo'shish (\`+\`), ayirish (\`-\`), ko'paytirish (\`*\`), bo'lish (\`/\`), qoldiq (\`%\`), daraja (\`**\`).

**3. % operatori nima qiladi?**
Bo'lish amolidan qolgan butun qoldiqni topib beradi.

**4. Solishtirish operatorlarining javobi qanday turda bo'ladi?**
Doim mantiqiy (\`boolean\`) turda (\`true\` yoki \`false\`) bo'ladi.

**5. == va === farqi nimada?**
\`==\` qiymatlarning turini avtomatik moslashtirib solishtiradi. \`===\` esa turini o'zgartirmasdan, qiymat va ma'lumot turini qat'iy solishtiradi.

**6. && operatori qachon true qaytaradi?**
Faqat unga ulangan barcha mantiqiy shartlar \`true\` bo'lganda.

**7. || operatori qachon true qaytaradi?**
Shartlardan kamida bittasi \`true\` bo'lsa.

**8. ! operatori nima qiladi?**
Qiymatni teskarisiga o'zgartiradi (\`true\` -> \`false\`, \`false\` -> \`true\`).

**9. 5 ** 3 natijasi nima?**
\`125\` (5 * 5 * 5 = 125, ya'ni 5 ning uchinchi darajasi).

**10. "5" + 5 natijasi nima va nima uchun?**
\`"55"\` bo'ladi, chunki string bilan kelganda \`+\` operatori matnlarni birlashtiradi.

**11. "5" - 5 natijasi nima?**
\`0\` bo'ladi. Ayirish operatori matnni avtomatik songa aylantirib hisoblaydi.

**12. Increment (++) va Decrement (--) farqi nima?**
\`++\` o'zgaruvchi qiymatini 1 taga oshiradi, \`--\` esa 1 taga kamaytiradi.
`,
  exercises: [
    {
      id: 1,
      title: "Qoldiq operatori",
      instruction: "10 ni 3 ga bo'lgandagi qoldiqni toping va uni rem o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet rem = ",
      hint: "let rem = 10 % 3;",
      test: "if (rem === 1) return null; return 'Qoldiq 1 bo\\'lishi kerak!';"
    },
    {
      id: 2,
      title: "Darajaga ko'tarish",
      instruction: "2 ning 5-darajasini darajaga ko'tarish operatori (**) yordamida hisoblab, power o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet power = ",
      hint: "let power = 2 ** 5;",
      test: "if (power === 32) return null; return 'Natija 32 chiqishi kerak!';"
    },
    {
      id: 3,
      title: "Oddiy tenglik",
      instruction: "5 sonini va '5' stringini oddiy tenglik (==) operatori orqali solishtirib, natijani check o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet check = ",
      hint: "let check = (5 == '5');",
      test: "if (check === true) return null; return 'check o\\'zgaruvchisi true bo\\'lishi kerak!';"
    },
    {
      id: 4,
      title: "Qat'iy tenglik",
      instruction: "5 sonini va '5' stringini qat'iy tenglik (===) operatori orqali solishtirib, natijani strictCheck o'zgaruvchisiga saqlang.",
      startingCode: "// Bu yerga yozing\nlet strictCheck = ",
      hint: "let strictCheck = (5 === '5');",
      test: "if (strictCheck === false) return null; return 'strictCheck o\\'zgaruvchisi false bo\\'lishi kerak!';"
    },
    {
      id: 5,
      title: "Mantiqiy VA",
      instruction: "isAdult va hasTicket shartlarining mantiqiy VA (&&) natijasini canEnter o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let isAdult = true;\nlet hasTicket = true;\n// Bu yerga yozing\nlet canEnter = ",
      hint: "let canEnter = isAdult && hasTicket;",
      test: "if (canEnter === true) return null; return 'canEnter true bo\\'lishi kerak!';"
    },
    {
      id: 6,
      title: "Mantiqiy YOKI",
      instruction: "isWeekend va isHoliday shartlaridan kamida biri true bo'lganda ishlaydigan mantiqiy YOKI (||) amali natijasini freeTime o'zgaruvchisiga saqlang.",
      startingCode: "let isWeekend = true;\nlet isHoliday = false;\n// Bu yerga yozing\nlet freeTime = ",
      hint: "let freeTime = isWeekend || isHoliday;",
      test: "if (freeTime === true) return null; return 'freeTime true bo\\'lishi kerak!';"
    },
    {
      id: 7,
      title: "Mantiqiy inkor",
      instruction: "isRaining qiymatining teskarisini mantiqiy inkor (!) operatori orqali topib, goWalk o'zgaruvchisiga o'zlashtiring.",
      startingCode: "let isRaining = false;\n// Bu yerga yozing\nlet goWalk = ",
      hint: "let goWalk = !isRaining;",
      test: "if (goWalk === true) return null; return 'goWalk true bo\\'lishi kerak!';"
    },
    {
      id: 8,
      title: "Increment",
      instruction: "count o'zgaruvchisini postfix increment (++) operatori yordamida 1 taga oshiring.",
      startingCode: "let count = 5;\n// Bu yerga yozing\n",
      hint: "count++;",
      test: "if (count === 6) return null; return 'count qiymati 6 bo\\'lishi kerak!';"
    },
    {
      id: 9,
      title: "Decrement",
      instruction: "count o'zgaruvchisini postfix decrement (--) operatori yordamida 1 taga kamaytiring.",
      startingCode: "let count = 10;\n// Bu yerga yozing\n",
      hint: "count--;",
      test: "if (count === 9) return null; return 'count qiymati 9 bo\\'lishi kerak!';"
    },
    {
      id: 10,
      title: "Stringlarni birlashtirish",
      instruction: "name1 va name2 stringlarini qo'shish (+) yordamida oralarida bitta bo'sh joy bilan birlashtiring va fullName o'zgaruvchisiga saqlang.",
      startingCode: "let name1 = 'Ali';\nlet name2 = 'Valiyev';\n// Bu yerga yozing\nlet fullName = ",
      hint: "let fullName = name1 + ' ' + name2;",
      test: "if (fullName === 'Ali Valiyev') return null; return 'fullName\\'Ali Valiyev\\' bo\\'lishi kerak!';"
    },
    {
      id: 11,
      title: "Qisqartirilgan qo'shish",
      instruction: "x o'zgaruvchisining qiymatiga qo'shimcha 5 sonini qisqartirilgan (+=) operator yordamida qo'shing.",
      startingCode: "let x = 10;\n// Bu yerga yozing\n",
      hint: "x += 5;",
      test: "if (x === 15) return null; return 'x qiymati 15 bo\\'lishi kerak!';"
    },
    {
      id: 12,
      title: "Qat'iy teng emaslik",
      instruction: "10 soni 20 soniga qat'iy teng emasligini (!==) tekshiring va natijani notEqual o'zgaruvchisiga o'zlashtiring.",
      startingCode: "// Bu yerga yozing\nlet notEqual = ",
      hint: "let notEqual = (10 !== 20);",
      test: "if (notEqual === true) return null; return 'notEqual o\\'zgaruvchisi true bo\\'lishi kerak!';"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "JavaScript-da `===` (qat'iy tenglik) va `==` (oddiy tenglik) operatorlarining asosiy farqi nimada?",
      options: [
        "`==` faqat sonlarni solishtiradi, `===` esa faqat matnlarni solishtiradi",
        "`===` qiymatlarni ham, ularning ma'lumot turlarini ham qat'iy solishtiradi; `==` esa solishtirishdan oldin turlarni avtomatik o'zgartiradi (coercion)",
        "Ular o'rtasida hech qanday farq yo'q",
        "`===` faqat obyektlarni solishtirish uchun ishlatiladi"
      ],
      correctAnswer: 1,
      explanation: "`===` operatori qiymat va tipni bir vaqtda tekshiradi. `==` esa tiplarni o'zgartirib taqqoslagani uchun `5 == '5'` true bersa, `5 === '5'` false beradi."
    },
    {
      id: 2,
      question: "Quyidagi ifodaning natijasi nima bo'ladi?\n`\"10\" - 2 + \"5\"`",
      options: [
        "`\"13\"`",
        "`\"85\"` (chunki \"10\" - 2 sonli ayirish bajarilib 8 bo'ladi, keyin unga + \"5\" satri qo'shilib matnli birlashish yuz beradi)",
        "`13`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "Ayirish `-` operatori faqat raqamlar bilan ishlaganligi uchun `\"10\"` matnini 10 soniga o'tkazadi va `10 - 2 = 8` bo'ladi. Qo'shish `+` operatori satr ishtirok etganda konkatensiya (birlashish) qiladi: `8 + \"5\" = \"85\"`."
    },
    {
      id: 3,
      question: "`&&` (Mantiqiy VA) operatori qanday holatda `true` qiymat qaytaradi?",
      options: [
        "Kamida bitta tomoni `true` bo'lsa",
        "Ikkala tomoni ham (barcha shartlar) `true` bo'lsagina",
        "Ikkala tomoni ham `false` bo'lsa",
        "Faqat chap tomoni `true` bo'lsa"
      ],
      correctAnswer: 1,
      explanation: "`&&` (AND) mantiqiy operatori barcha berilgan shartlar to'liq `true` bo'lgandagina yakuniy `true` qiymatni beradi."
    },
    {
      id: 4,
      question: "`5 % 2` amali nimani qaytaradi?",
      options: [
        "`2.5`",
        "`1` (chunki 5 ni 2 ga bo'lgandagi qoldiq 1 dir)",
        "`2`",
        "`0`"
      ],
      correctAnswer: 1,
      explanation: "`%` operatori (modulo) bo'lishdan hosil bo'lgan butun qoldiqni qaytaradi. 5 ni 2 ga bo'lganda 2 tadan tegib, 1 qoldiq qoladi."
    },
    {
      id: 5,
      question: "`!true && (false || !false)` ifodasidan qanday mantiqiy natija chiqadi?",
      options: [
        "`true`",
        "`false` (chunki birinchi qism `!true` bo'lgani sababli u `false` bo'ladi va `&&` operatori zanjirni darhol false qiladi)",
        "`undefined`",
        "`NaN`"
      ],
      correctAnswer: 1,
      explanation: "`!true` bizga `false` ni beradi. `false && (istalgan narsa)` ifodasining natijasi doimo `false` bo'ladi, chunki VA operatorida bitta false bu zanjirni false qiladi."
    },
    {
      id: 6,
      question: "`null == undefined` va `null === undefined` natijalari qanday?",
      options: [
        "`false` va `true`",
        "`true` va `false` (chunki == turlarni avtomatik moslashtiradi, === esa ularning tiplari mos kelmagani uchun false beradi)",
        "Ikkalasi ham `true`",
        "Ikkalasi ham `false`"
      ],
      correctAnswer: 1,
      explanation: "`==` qiymatning mantiqiy ma'nosini tenglashtiradi, natija `true`. `===` esa `null` (object) va `undefined` (undefined) tiplari har xilligi sababli `false` qaytaradi."
    },
    {
      id: 7,
      question: "`let x = 5; let y = x++;` bajarilgandan keyin x va y qiymatlari nima bo'ladi?",
      options: [
        "x = 6, y = 6",
        "x = 6, y = 5 (chunki postfix increment avval joriy qiymatni qaytaradi, so'ngra o'zgaruvchini oshiradi)",
        "x = 5, y = 6",
        "x = 5, y = 5"
      ],
      correctAnswer: 1,
      explanation: "Postfix `x++` operatorida `y` ga `x` ning joriy qiymati (5) yuklanadi, shundan so'ng `x` ning qiymati 1 taga oshib 6 bo'ladi."
    },
    {
      id: 8,
      question: "JavaScriptda darajaga ko'tarish operatori qaysi?",
      options: [
        "`^` operatori",
        "`**` operatori (masalan: `2 ** 3 = 8`)",
        "`pow` kalit so'zi",
        "`^^` operatori"
      ],
      correctAnswer: 1,
      explanation: "JavaScriptda (ES6 dan boshlab) x ning y-darajasini topish uchun `x ** y` operatori joriy etilgan."
    },
    {
      id: 9,
      question: "`\"Hello\" && \"World\"` mantiqiy ifodasi nima qaytaradi?",
      options: [
        "`true`",
        "`\"Hello\"`",
        "`\"World\"` (chunki ikkala matn ham truthy va && operatori barcha shartlar rost bo'lsa, oxirgi rost qiymatni qaytaradi)",
        "`false`"
      ],
      correctAnswer: 2,
      explanation: "JavaScriptda `&&` operatori agar barcha qiymatlar truthy (rost ma'nodagi qiymatlar) bo'lsa, oxirgi qiymatni o'zini qaytaradi."
    },
    {
      id: 10,
      question: "`0 || \"Salom\"` mantiqiy ifodasi nima qaytaradi?",
      options: [
        "`0`",
        "`\"Salom\"` (chunki 0 falsy bo'lgani sababli || birinchi truthy qiymat bo'lgan 'Salom'ni qaytaradi)",
        "`true`",
        "`false`"
      ],
      correctAnswer: 1,
      explanation: "`||` (YOKI) operatori chap tomondan boshlab birinchi uchragan truthy qiymatni qaytaradi. 0 soni falsy hisoblangani uchun, keyingi qiymat ya'ni `\"Salom\"` qaytadi."
    },
    {
      id: 11,
      question: "`true || false && false` ifodasi bajarilganda qanday ustuvorlik qoidasi ishlaydi?",
      options: [
        "Mantiqiy `&&` operatori `||` operatoridan yuqori ustuvorlikka ega, shuning uchun oldin AND bajarilib, natija `true` bo'ladi",
        "Chapdan o'ngga tartibda bajarilib, natija `false` bo'ladi",
        "Qavslar bo'lmagani uchun xato beradi",
        "Natija `false` bo'ladi, chunki zanjirda false bor"
      ],
      correctAnswer: 0,
      explanation: "`&&` operatorining ustuvorligi `||` dan yuqori. Shuning uchun birinchi `false && false` bajarilib `false` chiqadi. Keyin `true || false` bajarilib yakuniy natija `true` chiqadi."
    },
    {
      id: 12,
      question: "`5 !== \"5\"` ifodasining natijasi nima bo'ladi?",
      options: [
        "`false`",
        "`true` (chunki son va string turlari har xil va qat'iy teng emaslik operatori ishlatilgan)",
        "`undefined`",
        "`TypeError`"
      ],
      correctAnswer: 1,
      explanation: "`!==` (qat'iy teng emaslik) operatori qiymat yoki turni solishtiradi. 5 soni '5' stringiga qat'iy teng emas, shuning uchun ifoda rost (`true`) natija beradi."
    }
  ]
};